console.warn('From Onsen UI 2.11.0, the AngularJS binding will no longer be part of the core package. You will need to install the new angularjs-onsenui package. See https://onsen.io/v2/guide/angular1/#migrating-to-angularjs-onsenui-package for more details.');

/* angularjs-onsenui v1.0.0 - 2018-10-05 */

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

            var isIE = /*@cc_on!@*/!!document.documentMode; // At least IE6
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmpzLW9uc2VudWkuanMiLCJzb3VyY2VzIjpbIi4uL3ZlbmRvci9jbGFzcy5qcyIsIi4uL2pzL29uc2VuLmpzIiwiLi4vdmlld3MvYWN0aW9uU2hlZXQuanMiLCIuLi92aWV3cy9hbGVydERpYWxvZy5qcyIsIi4uL3ZpZXdzL2Nhcm91c2VsLmpzIiwiLi4vdmlld3MvZGlhbG9nLmpzIiwiLi4vdmlld3MvZmFiLmpzIiwiLi4vdmlld3MvZ2VuZXJpYy5qcyIsIi4uL3ZpZXdzL2xhenlSZXBlYXREZWxlZ2F0ZS5qcyIsIi4uL3ZpZXdzL2xhenlSZXBlYXQuanMiLCIuLi92aWV3cy9tb2RhbC5qcyIsIi4uL3ZpZXdzL25hdmlnYXRvci5qcyIsIi4uL3ZpZXdzL3BhZ2UuanMiLCIuLi92aWV3cy9wb3BvdmVyLmpzIiwiLi4vdmlld3MvcHVsbEhvb2suanMiLCIuLi92aWV3cy9zcGVlZERpYWwuanMiLCIuLi92aWV3cy9zcGxpdHRlckNvbnRlbnQuanMiLCIuLi92aWV3cy9zcGxpdHRlclNpZGUuanMiLCIuLi92aWV3cy9zcGxpdHRlci5qcyIsIi4uL3ZpZXdzL3N3aXRjaC5qcyIsIi4uL3ZpZXdzL3RhYmJhci5qcyIsIi4uL3ZpZXdzL3RvYXN0LmpzIiwiLi4vZGlyZWN0aXZlcy9hY3Rpb25TaGVldEJ1dHRvbi5qcyIsIi4uL2RpcmVjdGl2ZXMvYWN0aW9uU2hlZXQuanMiLCIuLi9kaXJlY3RpdmVzL2FsZXJ0RGlhbG9nLmpzIiwiLi4vZGlyZWN0aXZlcy9iYWNrQnV0dG9uLmpzIiwiLi4vZGlyZWN0aXZlcy9ib3R0b21Ub29sYmFyLmpzIiwiLi4vZGlyZWN0aXZlcy9idXR0b24uanMiLCIuLi9kaXJlY3RpdmVzL2NhcmQuanMiLCIuLi9kaXJlY3RpdmVzL2Nhcm91c2VsLmpzIiwiLi4vZGlyZWN0aXZlcy9jaGVja2JveC5qcyIsIi4uL2RpcmVjdGl2ZXMvZGlhbG9nLmpzIiwiLi4vZGlyZWN0aXZlcy9kdW1teUZvckluaXQuanMiLCIuLi9kaXJlY3RpdmVzL2ZhYi5qcyIsIi4uL2RpcmVjdGl2ZXMvZ2VzdHVyZURldGVjdG9yLmpzIiwiLi4vZGlyZWN0aXZlcy9pY29uLmpzIiwiLi4vZGlyZWN0aXZlcy9pZk9yaWVudGF0aW9uLmpzIiwiLi4vZGlyZWN0aXZlcy9pZlBsYXRmb3JtLmpzIiwiLi4vZGlyZWN0aXZlcy9pbnB1dC5qcyIsIi4uL2RpcmVjdGl2ZXMva2V5Ym9hcmQuanMiLCIuLi9kaXJlY3RpdmVzL2xhenlSZXBlYXQuanMiLCIuLi9kaXJlY3RpdmVzL2xpc3RIZWFkZXIuanMiLCIuLi9kaXJlY3RpdmVzL2xpc3RJdGVtLmpzIiwiLi4vZGlyZWN0aXZlcy9saXN0LmpzIiwiLi4vZGlyZWN0aXZlcy9saXN0VGl0bGUuanMiLCIuLi9kaXJlY3RpdmVzL2xvYWRpbmdQbGFjZWhvbGRlci5qcyIsIi4uL2RpcmVjdGl2ZXMvbW9kYWwuanMiLCIuLi9kaXJlY3RpdmVzL25hdmlnYXRvci5qcyIsIi4uL2RpcmVjdGl2ZXMvcGFnZS5qcyIsIi4uL2RpcmVjdGl2ZXMvcG9wb3Zlci5qcyIsIi4uL2RpcmVjdGl2ZXMvcHVsbEhvb2suanMiLCIuLi9kaXJlY3RpdmVzL3JhZGlvLmpzIiwiLi4vZGlyZWN0aXZlcy9yYW5nZS5qcyIsIi4uL2RpcmVjdGl2ZXMvcmlwcGxlLmpzIiwiLi4vZGlyZWN0aXZlcy9zY29wZS5qcyIsIi4uL2RpcmVjdGl2ZXMvc2VhcmNoSW5wdXQuanMiLCIuLi9kaXJlY3RpdmVzL3NlZ21lbnQuanMiLCIuLi9kaXJlY3RpdmVzL3NlbGVjdC5qcyIsIi4uL2RpcmVjdGl2ZXMvc3BlZWREaWFsLmpzIiwiLi4vZGlyZWN0aXZlcy9zcGxpdHRlckNvbnRlbnQuanMiLCIuLi9kaXJlY3RpdmVzL3NwbGl0dGVyU2lkZS5qcyIsIi4uL2RpcmVjdGl2ZXMvc3BsaXR0ZXIuanMiLCIuLi9kaXJlY3RpdmVzL3N3aXRjaC5qcyIsIi4uL2RpcmVjdGl2ZXMvdGFiYmFyLmpzIiwiLi4vZGlyZWN0aXZlcy90YWIuanMiLCIuLi9kaXJlY3RpdmVzL3RlbXBsYXRlLmpzIiwiLi4vZGlyZWN0aXZlcy90b2FzdC5qcyIsIi4uL2RpcmVjdGl2ZXMvdG9vbGJhckJ1dHRvbi5qcyIsIi4uL2RpcmVjdGl2ZXMvdG9vbGJhci5qcyIsIi4uL3NlcnZpY2VzL29uc2VuLmpzIiwiLi4vc2VydmljZXMvY29tcG9uZW50Q2xlYW5lci5qcyIsIi4uL2pzL3NldHVwLmpzIiwiLi4vanMvbm90aWZpY2F0aW9uLmpzIiwiLi4vanMvdGVtcGxhdGVMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogU2ltcGxlIEphdmFTY3JpcHQgSW5oZXJpdGFuY2UgZm9yIEVTIDUuMVxuICogYmFzZWQgb24gaHR0cDovL2Vqb2huLm9yZy9ibG9nL3NpbXBsZS1qYXZhc2NyaXB0LWluaGVyaXRhbmNlL1xuICogIChpbnNwaXJlZCBieSBiYXNlMiBhbmQgUHJvdG90eXBlKVxuICogTUlUIExpY2Vuc2VkLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgZm5UZXN0ID0gL3h5ei8udGVzdChmdW5jdGlvbigpe3h5ejt9KSA/IC9cXGJfc3VwZXJcXGIvIDogLy4qLztcblxuICAvLyBUaGUgYmFzZSBDbGFzcyBpbXBsZW1lbnRhdGlvbiAoZG9lcyBub3RoaW5nKVxuICBmdW5jdGlvbiBCYXNlQ2xhc3MoKXt9XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IENsYXNzIHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIGNsYXNzXG4gIEJhc2VDbGFzcy5leHRlbmQgPSBmdW5jdGlvbihwcm9wcykge1xuICAgIHZhciBfc3VwZXIgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIC8vIFNldCB1cCB0aGUgcHJvdG90eXBlIHRvIGluaGVyaXQgZnJvbSB0aGUgYmFzZSBjbGFzc1xuICAgIC8vIChidXQgd2l0aG91dCBydW5uaW5nIHRoZSBpbml0IGNvbnN0cnVjdG9yKVxuICAgIHZhciBwcm90byA9IE9iamVjdC5jcmVhdGUoX3N1cGVyKTtcblxuICAgIC8vIENvcHkgdGhlIHByb3BlcnRpZXMgb3ZlciBvbnRvIHRoZSBuZXcgcHJvdG90eXBlXG4gICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wcykge1xuICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgb3ZlcndyaXRpbmcgYW4gZXhpc3RpbmcgZnVuY3Rpb25cbiAgICAgIHByb3RvW25hbWVdID0gdHlwZW9mIHByb3BzW25hbWVdID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIF9zdXBlcltuYW1lXSA9PSBcImZ1bmN0aW9uXCIgJiYgZm5UZXN0LnRlc3QocHJvcHNbbmFtZV0pXG4gICAgICAgID8gKGZ1bmN0aW9uKG5hbWUsIGZuKXtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIHRtcCA9IHRoaXMuX3N1cGVyO1xuXG4gICAgICAgICAgICAgIC8vIEFkZCBhIG5ldyAuX3N1cGVyKCkgbWV0aG9kIHRoYXQgaXMgdGhlIHNhbWUgbWV0aG9kXG4gICAgICAgICAgICAgIC8vIGJ1dCBvbiB0aGUgc3VwZXItY2xhc3NcbiAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBfc3VwZXJbbmFtZV07XG5cbiAgICAgICAgICAgICAgLy8gVGhlIG1ldGhvZCBvbmx5IG5lZWQgdG8gYmUgYm91bmQgdGVtcG9yYXJpbHksIHNvIHdlXG4gICAgICAgICAgICAgIC8vIHJlbW92ZSBpdCB3aGVuIHdlJ3JlIGRvbmUgZXhlY3V0aW5nXG4gICAgICAgICAgICAgIHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IHRtcDtcblxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KShuYW1lLCBwcm9wc1tuYW1lXSlcbiAgICAgICAgOiBwcm9wc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGUgbmV3IGNvbnN0cnVjdG9yXG4gICAgdmFyIG5ld0NsYXNzID0gdHlwZW9mIHByb3RvLmluaXQgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBwcm90by5oYXNPd25Qcm9wZXJ0eShcImluaXRcIilcbiAgICAgICAgPyBwcm90by5pbml0IC8vIEFsbCBjb25zdHJ1Y3Rpb24gaXMgYWN0dWFsbHkgZG9uZSBpbiB0aGUgaW5pdCBtZXRob2RcbiAgICAgICAgOiBmdW5jdGlvbiBTdWJDbGFzcygpeyBfc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG4gICAgICA6IGZ1bmN0aW9uIEVtcHR5Q2xhc3MoKXt9O1xuXG4gICAgLy8gUG9wdWxhdGUgb3VyIGNvbnN0cnVjdGVkIHByb3RvdHlwZSBvYmplY3RcbiAgICBuZXdDbGFzcy5wcm90b3R5cGUgPSBwcm90bztcblxuICAgIC8vIEVuZm9yY2UgdGhlIGNvbnN0cnVjdG9yIHRvIGJlIHdoYXQgd2UgZXhwZWN0XG4gICAgcHJvdG8uY29uc3RydWN0b3IgPSBuZXdDbGFzcztcblxuICAgIC8vIEFuZCBtYWtlIHRoaXMgY2xhc3MgZXh0ZW5kYWJsZVxuICAgIG5ld0NsYXNzLmV4dGVuZCA9IEJhc2VDbGFzcy5leHRlbmQ7XG5cbiAgICByZXR1cm4gbmV3Q2xhc3M7XG4gIH07XG5cbiAgLy8gZXhwb3J0XG4gIHdpbmRvdy5DbGFzcyA9IEJhc2VDbGFzcztcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4vKipcbiAqIEBvYmplY3Qgb25zXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2phXU9uc2VuIFVJ44Gn5Yip55So44Gn44GN44KL44Kw44Ot44O844OQ44Or44Gq44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CC44GT44Gu44Kq44OW44K444Kn44Kv44OI44Gv44CBQW5ndWxhckpT44Gu44K544Kz44O844OX44GL44KJ5Y+C54Wn44GZ44KL44GT44Go44GM44Gn44GN44G+44GZ44CCIFsvamFdXG4gKiAgIFtlbl1BIGdsb2JhbCBvYmplY3QgdGhhdCdzIHVzZWQgaW4gT25zZW4gVUkuIFRoaXMgb2JqZWN0IGNhbiBiZSByZWFjaGVkIGZyb20gdGhlIEFuZ3VsYXJKUyBzY29wZS5bL2VuXVxuICovXG5cbihmdW5jdGlvbihvbnMpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicsIFtdKTtcbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuLmRpcmVjdGl2ZXMnLCBbJ29uc2VuJ10pOyAvLyBmb3IgQkNcblxuICAvLyBKUyBHbG9iYWwgZmFjYWRlIGZvciBPbnNlbiBVSS5cbiAgaW5pdE9uc2VuRmFjYWRlKCk7XG4gIHdhaXRPbnNlblVJTG9hZCgpO1xuICBpbml0QW5ndWxhck1vZHVsZSgpO1xuICBpbml0VGVtcGxhdGVDYWNoZSgpO1xuXG4gIGZ1bmN0aW9uIHdhaXRPbnNlblVJTG9hZCgpIHtcbiAgICB2YXIgdW5sb2NrT25zZW5VSSA9IG9ucy5fcmVhZHlMb2NrLmxvY2soKTtcbiAgICBtb2R1bGUucnVuKGZ1bmN0aW9uKCRjb21waWxlLCAkcm9vdFNjb3BlKSB7XG4gICAgICAvLyBmb3IgaW5pdGlhbGl6YXRpb24gaG9vay5cbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSAndW5pbml0aWFsaXplZCcpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29ucy1kdW1teS1mb3ItaW5pdCcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbnMtZHVtbXktZm9yLWluaXQnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW5pdGlhbGl6YXRpb24gc3RhdGUuJyk7XG4gICAgICB9XG5cbiAgICAgICRyb290U2NvcGUuJG9uKCckb25zLXJlYWR5JywgdW5sb2NrT25zZW5VSSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0QW5ndWxhck1vZHVsZSgpIHtcbiAgICBtb2R1bGUudmFsdWUoJyRvbnNHbG9iYWwnLCBvbnMpO1xuICAgIG1vZHVsZS5ydW4oZnVuY3Rpb24oJGNvbXBpbGUsICRyb290U2NvcGUsICRvbnNlbiwgJHEpIHtcbiAgICAgIG9ucy5fb25zZW5TZXJ2aWNlID0gJG9uc2VuO1xuICAgICAgb25zLl9xU2VydmljZSA9ICRxO1xuXG4gICAgICAkcm9vdFNjb3BlLm9ucyA9IHdpbmRvdy5vbnM7XG4gICAgICAkcm9vdFNjb3BlLmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbiAgICAgICRyb290U2NvcGUuYWxlcnQgPSB3aW5kb3cuYWxlcnQ7XG5cbiAgICAgIG9ucy4kY29tcGlsZSA9ICRjb21waWxlO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFRlbXBsYXRlQ2FjaGUoKSB7XG4gICAgbW9kdWxlLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgY29uc3QgdG1wID0gb25zLl9pbnRlcm5hbC5nZXRUZW1wbGF0ZUhUTUxBc3luYztcblxuICAgICAgb25zLl9pbnRlcm5hbC5nZXRUZW1wbGF0ZUhUTUxBc3luYyA9IChwYWdlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhY2hlID0gJHRlbXBsYXRlQ2FjaGUuZ2V0KHBhZ2UpO1xuXG4gICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0bXAocGFnZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0T25zZW5GYWNhZGUoKSB7XG4gICAgb25zLl9vbnNlblNlcnZpY2UgPSBudWxsO1xuXG4gICAgLy8gT2JqZWN0IHRvIGF0dGFjaCBjb21wb25lbnQgdmFyaWFibGVzIHRvIHdoZW4gdXNpbmcgdGhlIHZhcj1cIi4uLlwiIGF0dHJpYnV0ZS5cbiAgICAvLyBDYW4gYmUgc2V0IHRvIG51bGwgdG8gYXZvaWQgcG9sbHV0aW5nIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgb25zLmNvbXBvbmVudEJhc2UgPSB3aW5kb3c7XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGJvb3RzdHJhcFxuICAgICAqIEBzaWduYXR1cmUgYm9vdHN0cmFwKFttb2R1bGVOYW1lLCBbZGVwZW5kZW5jaWVzXV0pXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogICBbamFdT25zZW4gVUnjga7liJ3mnJ/ljJbjgpLooYzjgYTjgb7jgZnjgIJBbmd1bGFyLmpz44GubmctYXBw5bGe5oCn44KS5Yip55So44GZ44KL44GT44Go54Sh44GX44GrT25zZW4gVUnjgpLoqq3jgb/ovrzjgpPjgafliJ3mnJ/ljJbjgZfjgabjgY/jgozjgb7jgZnjgIJbL2phXVxuICAgICAqICAgW2VuXUluaXRpYWxpemUgT25zZW4gVUkuIENhbiBiZSB1c2VkIHRvIGxvYWQgT25zZW4gVUkgd2l0aG91dCB1c2luZyB0aGUgPGNvZGU+bmctYXBwPC9jb2RlPiBhdHRyaWJ1dGUgZnJvbSBBbmd1bGFySlMuWy9lbl1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW21vZHVsZU5hbWVdXG4gICAgICogICBbZW5dQW5ndWxhckpTIG1vZHVsZSBuYW1lLlsvZW5dXG4gICAgICogICBbamFdQW5ndWxhci5qc+OBp+OBruODouOCuOODpeODvOODq+WQjVsvamFdXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2RlcGVuZGVuY2llc11cbiAgICAgKiAgIFtlbl1MaXN0IG9mIEFuZ3VsYXJKUyBtb2R1bGUgZGVwZW5kZW5jaWVzLlsvZW5dXG4gICAgICogICBbamFd5L6d5a2Y44GZ44KLQW5ndWxhci5qc+OBruODouOCuOODpeODvOODq+WQjeOBrumFjeWIl1svamFdXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqICAgW2VuXUFuIEFuZ3VsYXJKUyBtb2R1bGUgb2JqZWN0LlsvZW5dXG4gICAgICogICBbamFdQW5ndWxhckpT44GuTW9kdWxl44Kq44OW44K444Kn44Kv44OI44KS6KGo44GX44G+44GZ44CCWy9qYV1cbiAgICAgKi9cbiAgICBvbnMuYm9vdHN0cmFwID0gZnVuY3Rpb24obmFtZSwgZGVwcykge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShuYW1lKSkge1xuICAgICAgICBkZXBzID0gbmFtZTtcbiAgICAgICAgbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIG5hbWUgPSAnbXlPbnNlbkFwcCc7XG4gICAgICB9XG5cbiAgICAgIGRlcHMgPSBbJ29uc2VuJ10uY29uY2F0KGFuZ3VsYXIuaXNBcnJheShkZXBzKSA/IGRlcHMgOiBbXSk7XG4gICAgICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmFtZSwgZGVwcyk7XG5cbiAgICAgIHZhciBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2xvYWRpbmcnIHx8IGRvYy5yZWFkeVN0YXRlID09ICd1bmluaXRpYWxpemVkJyB8fCBkb2MucmVhZHlTdGF0ZSA9PSAnaW50ZXJhY3RpdmUnKSB7XG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYW5ndWxhci5ib290c3RyYXAoZG9jLmRvY3VtZW50RWxlbWVudCwgW25hbWVdKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmIChkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvYy5kb2N1bWVudEVsZW1lbnQsIFtuYW1lXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RhdGUnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1vZHVsZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBmaW5kUGFyZW50Q29tcG9uZW50VW50aWxcbiAgICAgKiBAc2lnbmF0dXJlIGZpbmRQYXJlbnRDb21wb25lbnRVbnRpbChuYW1lLCBbZG9tXSlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqICAgW2VuXU5hbWUgb2YgY29tcG9uZW50LCBpLmUuICdvbnMtcGFnZScuWy9lbl1cbiAgICAgKiAgIFtqYV3jgrPjg7Pjg53jg7zjg43jg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgILkvovjgYjjgbBvbnMtcGFnZeOBquOBqeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3QvanFMaXRlL0hUTUxFbGVtZW50fSBbZG9tXVxuICAgICAqICAgW2VuXSRldmVudCwganFMaXRlIG9yIEhUTUxFbGVtZW50IG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXSRldmVudOOCquODluOCuOOCp+OCr+ODiOOAgWpxTGl0ZeOCquODluOCuOOCp+OCr+ODiOOAgUhUTUxFbGVtZW5044Kq44OW44K444Kn44Kv44OI44Gu44GE44Ga44KM44GL44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogICBbZW5dQ29tcG9uZW50IG9iamVjdC4gV2lsbCByZXR1cm4gbnVsbCBpZiBubyBjb21wb25lbnQgd2FzIGZvdW5kLlsvZW5dXG4gICAgICogICBbamFd44Kz44Oz44Od44O844ON44Oz44OI44Gu44Kq44OW44K444Kn44Kv44OI44KS6L+U44GX44G+44GZ44CC44KC44GX44Kz44Oz44Od44O844ON44Oz44OI44GM6KaL44Gk44GL44KJ44Gq44GL44Gj44Gf5aC05ZCI44Gr44GvbnVsbOOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogICBbZW5dRmluZCBwYXJlbnQgY29tcG9uZW50IG9iamVjdCBvZiA8Y29kZT5kb208L2NvZGU+IGVsZW1lbnQuWy9lbl1cbiAgICAgKiAgIFtqYV3mjIflrprjgZXjgozjgZ9kb23lvJXmlbDjga7opqropoHntKDjgpLjgZ/jganjgaPjgabjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLmpJzntKLjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqL1xuICAgIG9ucy5maW5kUGFyZW50Q29tcG9uZW50VW50aWwgPSBmdW5jdGlvbihuYW1lLCBkb20pIHtcbiAgICAgIHZhciBlbGVtZW50O1xuICAgICAgaWYgKGRvbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZG9tKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9tIGluc3RhbmNlb2YgYW5ndWxhci5lbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgPSBkb207XG4gICAgICB9IGVsc2UgaWYgKGRvbS50YXJnZXQpIHtcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkb20udGFyZ2V0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsZW1lbnQuaW5oZXJpdGVkRGF0YShuYW1lKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBmaW5kQ29tcG9uZW50XG4gICAgICogQHNpZ25hdHVyZSBmaW5kQ29tcG9uZW50KHNlbGVjdG9yLCBbZG9tXSlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiAgIFtlbl1DU1Mgc2VsZWN0b3JbL2VuXVxuICAgICAqICAgW2phXUNTU+OCu+ODrOOCr+OCv+ODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgKiAgIFtlbl1ET00gZWxlbWVudCB0byBzZWFyY2ggZnJvbS5bL2VuXVxuICAgICAqICAgW2phXeaknOe0ouWvvuixoeOBqOOBmeOCi0RPTeimgee0oOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gICAgICogQHJldHVybiB7T2JqZWN0L251bGx9XG4gICAgICogICBbZW5dQ29tcG9uZW50IG9iamVjdC4gV2lsbCByZXR1cm4gbnVsbCBpZiBubyBjb21wb25lbnQgd2FzIGZvdW5kLlsvZW5dXG4gICAgICogICBbamFd44Kz44Oz44Od44O844ON44Oz44OI44Gu44Kq44OW44K444Kn44Kv44OI44KS6L+U44GX44G+44GZ44CC44KC44GX44Kz44Oz44Od44O844ON44Oz44OI44GM6KaL44Gk44GL44KJ44Gq44GL44Gj44Gf5aC05ZCI44Gr44GvbnVsbOOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogICBbZW5dRmluZCBjb21wb25lbnQgb2JqZWN0IHVzaW5nIENTUyBzZWxlY3Rvci5bL2VuXVxuICAgICAqICAgW2phXUNTU+OCu+ODrOOCr+OCv+OCkuS9v+OBo+OBpuOCs+ODs+ODneODvOODjeODs+ODiOOBruOCquODluOCuOOCp+OCr+ODiOOCkuaknOe0ouOBl+OBvuOBmeOAglsvamFdXG4gICAgICovXG4gICAgb25zLmZpbmRDb21wb25lbnQgPSBmdW5jdGlvbihzZWxlY3RvciwgZG9tKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gKGRvbSA/IGRvbSA6IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIHJldHVybiB0YXJnZXQgPyBhbmd1bGFyLmVsZW1lbnQodGFyZ2V0KS5kYXRhKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsIDogbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjb21waWxlXG4gICAgICogQHNpZ25hdHVyZSBjb21waWxlKGRvbSlcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21cbiAgICAgKiAgIFtlbl1FbGVtZW50IHRvIGNvbXBpbGUuWy9lbl1cbiAgICAgKiAgIFtqYV3jgrPjg7Pjg5HjgqTjg6vjgZnjgovopoHntKDjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUNvbXBpbGUgT25zZW4gVUkgY29tcG9uZW50cy5bL2VuXVxuICAgICAqICAgW2phXemAmuW4uOOBrkhUTUzjga7opoHntKDjgpJPbnNlbiBVSeOBruOCs+ODs+ODneODvOODjeODs+ODiOOBq+OCs+ODs+ODkeOCpOODq+OBl+OBvuOBmeOAglsvamFdXG4gICAgICovXG4gICAgb25zLmNvbXBpbGUgPSBmdW5jdGlvbihkb20pIHtcbiAgICAgIGlmICghb25zLiRjb21waWxlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb25zLiRjb21waWxlKCkgaXMgbm90IHJlYWR5LiBXYWl0IGZvciBpbml0aWFsaXphdGlvbiB3aXRoIG9ucy5yZWFkeSgpLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShkb20gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIEhUTUxFbGVtZW50LicpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2NvcGUgPSBhbmd1bGFyLmVsZW1lbnQoZG9tKS5zY29wZSgpO1xuICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXJKUyBTY29wZSBpcyBudWxsLiBBcmd1bWVudCBET00gZWxlbWVudCBtdXN0IGJlIGF0dGFjaGVkIGluIERPTSBkb2N1bWVudC4nKTtcbiAgICAgIH1cblxuICAgICAgb25zLiRjb21waWxlKGRvbSkoc2NvcGUpO1xuICAgIH07XG5cbiAgICBvbnMuX2dldE9uc2VuU2VydmljZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLl9vbnNlblNlcnZpY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCckb25zZW4gaXMgbm90IGxvYWRlZCwgd2FpdCBmb3Igb25zLnJlYWR5KCkuJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9vbnNlblNlcnZpY2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbGVtZW50TmFtZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxhc3RSZWFkeVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgIG9ucy5fd2FpdERpcmV0aXZlSW5pdCA9IGZ1bmN0aW9uKGVsZW1lbnROYW1lLCBsYXN0UmVhZHkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoZWxlbWVudE5hbWUpKSB7XG4gICAgICAgICAgbGFzdFJlYWR5KGVsZW1lbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbGlzdGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsYXN0UmVhZHkoZWxlbWVudCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGVsZW1lbnROYW1lICsgJzppbml0JywgbGlzdGVuLCBmYWxzZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudE5hbWUgKyAnOmluaXQnLCBsaXN0ZW4sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjcmVhdGVFbGVtZW50XG4gICAgICogQHNpZ25hdHVyZSBjcmVhdGVFbGVtZW50KHRlbXBsYXRlLCBbb3B0aW9uc10pXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlXG4gICAgICogICBbZW5dRWl0aGVyIGFuIEhUTUwgZmlsZSBwYXRoLCBhbiBgPG9ucy10ZW1wbGF0ZT5gIGlkIG9yIGFuIEhUTUwgc3RyaW5nIHN1Y2ggYXMgYCc8ZGl2IGlkPVwiZm9vXCI+aG9nZTwvZGl2PidgLlsvZW5dXG4gICAgICogICBbamFdWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gICAgICogQHBhcmFtIHtCb29sZWFufEhUTUxFbGVtZW50fSBbb3B0aW9ucy5hcHBlbmRdXG4gICAgICogICBbZW5dV2hldGhlciBvciBub3QgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgYXBwZW5kZWQgdG8gdGhlIERPTS4gIERlZmF1bHRzIHRvIGBmYWxzZWAuIElmIGB0cnVlYCB2YWx1ZSBpcyBnaXZlbiwgYGRvY3VtZW50LmJvZHlgIHdpbGwgYmUgdXNlZCBhcyB0aGUgdGFyZ2V0LlsvZW5dXG4gICAgICogICBbamFdWy9qYV1cbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0aW9ucy5pbnNlcnRCZWZvcmVdXG4gICAgICogICBbZW5dUmVmZXJlbmNlIG5vZGUgdGhhdCBiZWNvbWVzIHRoZSBuZXh0IHNpYmxpbmcgb2YgdGhlIG5ldyBub2RlIChgb3B0aW9ucy5hcHBlbmRgIGVsZW1lbnQpLlsvZW5dXG4gICAgICogICBbamFdWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucGFyZW50U2NvcGVdXG4gICAgICogICBbZW5dUGFyZW50IHNjb3BlIG9mIHRoZSBlbGVtZW50LiBVc2VkIHRvIGJpbmQgbW9kZWxzIGFuZCBhY2Nlc3Mgc2NvcGUgbWV0aG9kcyBmcm9tIHRoZSBlbGVtZW50LiBSZXF1aXJlcyBhcHBlbmQgb3B0aW9uLlsvZW5dXG4gICAgICogICBbamFdWy9qYV1cbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudHxQcm9taXNlfVxuICAgICAqICAgW2VuXUlmIHRoZSBwcm92aWRlZCB0ZW1wbGF0ZSB3YXMgYW4gaW5saW5lIEhUTUwgc3RyaW5nLCBpdCByZXR1cm5zIHRoZSBuZXcgZWxlbWVudC4gT3RoZXJ3aXNlLCBpdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBuZXcgZWxlbWVudC5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogICBbZW5dQ3JlYXRlIGEgbmV3IGVsZW1lbnQgZnJvbSBhIHRlbXBsYXRlLiBCb3RoIGlubGluZSBIVE1MIGFuZCBleHRlcm5hbCBmaWxlcyBhcmUgc3VwcG9ydGVkIGFsdGhvdWdoIHRoZSByZXR1cm4gdmFsdWUgZGlmZmVycy4gSWYgdGhlIGVsZW1lbnQgaXMgYXBwZW5kZWQgaXQgd2lsbCBhbHNvIGJlIGNvbXBpbGVkIGJ5IEFuZ3VsYXJKUyAob3RoZXJ3aXNlLCBgb25zLmNvbXBpbGVgIHNob3VsZCBiZSBtYW51YWxseSB1c2VkKS5bL2VuXVxuICAgICAqICAgW2phXVsvamFdXG4gICAgICovXG4gICAgY29uc3QgY3JlYXRlRWxlbWVudE9yaWdpbmFsID0gb25zLmNyZWF0ZUVsZW1lbnQ7XG4gICAgb25zLmNyZWF0ZUVsZW1lbnQgPSAodGVtcGxhdGUsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgY29uc3QgbGluayA9IGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucy5wYXJlbnRTY29wZSkge1xuICAgICAgICAgIG9ucy4kY29tcGlsZShhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkpKG9wdGlvbnMucGFyZW50U2NvcGUuJG5ldygpKTtcbiAgICAgICAgICBvcHRpb25zLnBhcmVudFNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbnMuY29tcGlsZShlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgZ2V0U2NvcGUgPSBlID0+IGFuZ3VsYXIuZWxlbWVudChlKS5kYXRhKGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBlO1xuICAgICAgY29uc3QgcmVzdWx0ID0gY3JlYXRlRWxlbWVudE9yaWdpbmFsKHRlbXBsYXRlLCB7IGFwcGVuZDogISFvcHRpb25zLnBhcmVudFNjb3BlLCBsaW5rLCAuLi5vcHRpb25zIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSA/IHJlc3VsdC50aGVuKGdldFNjb3BlKSA6IGdldFNjb3BlKHJlc3VsdCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY3JlYXRlQWxlcnREaWFsb2dcbiAgICAgKiBAc2lnbmF0dXJlIGNyZWF0ZUFsZXJ0RGlhbG9nKHBhZ2UsIFtvcHRpb25zXSlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAqICAgW2VuXVBhZ2UgbmFtZS4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGZpbGUgb3IgYW4gPG9ucy10ZW1wbGF0ZT4gY29udGFpbmluZyBhIDxvbnMtYWxlcnQtZGlhbG9nPiBjb21wb25lbnQuWy9lbl1cbiAgICAgKiAgIFtqYV1wYWdl44GuVVJM44GL44CB44KC44GX44GP44Gvb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gICAgICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucGFyZW50U2NvcGVdXG4gICAgICogICBbZW5dUGFyZW50IHNjb3BlIG9mIHRoZSBkaWFsb2cuIFVzZWQgdG8gYmluZCBtb2RlbHMgYW5kIGFjY2VzcyBzY29wZSBtZXRob2RzIGZyb20gdGhlIGRpYWxvZy5bL2VuXVxuICAgICAqICAgW2phXeODgOOCpOOCouODreOCsOWGheOBp+WIqeeUqOOBmeOCi+imquOCueOCs+ODvOODl+OCkuaMh+WumuOBl+OBvuOBmeOAguODgOOCpOOCouODreOCsOOBi+OCieODouODh+ODq+OChOOCueOCs+ODvOODl+OBruODoeOCveODg+ODieOBq+OCouOCr+OCu+OCueOBmeOCi+OBruOBq+S9v+OBhOOBvuOBmeOAguOBk+OBruODkeODqeODoeODvOOCv+OBr0FuZ3VsYXJKU+ODkOOCpOODs+ODh+OCo+ODs+OCsOOBp+OBruOBv+WIqeeUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKiAgIFtlbl1Qcm9taXNlIG9iamVjdCB0aGF0IHJlc29sdmVzIHRvIHRoZSBhbGVydCBkaWFsb2cgY29tcG9uZW50IG9iamVjdC5bL2VuXVxuICAgICAqICAgW2phXeODgOOCpOOCouODreOCsOOBruOCs+ODs+ODneODvOODjeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOCkuino+axuuOBmeOCi1Byb21pc2Xjgqrjg5bjgrjjgqfjgq/jg4jjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqICAgW2VuXUNyZWF0ZSBhIGFsZXJ0IGRpYWxvZyBpbnN0YW5jZSBmcm9tIGEgdGVtcGxhdGUuIFRoaXMgbWV0aG9kIHdpbGwgYmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgb25zLmNyZWF0ZUVsZW1lbnRgLlsvZW5dXG4gICAgICogICBbamFd44OG44Oz44OX44Os44O844OI44GL44KJ44Ki44Op44O844OI44OA44Kk44Ki44Ot44Kw44Gu44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCWy9qYV1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY3JlYXRlRGlhbG9nXG4gICAgICogQHNpZ25hdHVyZSBjcmVhdGVEaWFsb2cocGFnZSwgW29wdGlvbnNdKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlXG4gICAgICogICBbZW5dUGFnZSBuYW1lLiBDYW4gYmUgZWl0aGVyIGFuIEhUTUwgZmlsZSBvciBhbiA8b25zLXRlbXBsYXRlPiBjb250YWluaW5nIGEgPG9ucy1kaWFsb2c+IGNvbXBvbmVudC5bL2VuXVxuICAgICAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIHjgoLjgZfjgY/jga9vbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAgICAgKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5wYXJlbnRTY29wZV1cbiAgICAgKiAgIFtlbl1QYXJlbnQgc2NvcGUgb2YgdGhlIGRpYWxvZy4gVXNlZCB0byBiaW5kIG1vZGVscyBhbmQgYWNjZXNzIHNjb3BlIG1ldGhvZHMgZnJvbSB0aGUgZGlhbG9nLlsvZW5dXG4gICAgICogICBbamFd44OA44Kk44Ki44Ot44Kw5YaF44Gn5Yip55So44GZ44KL6Kaq44K544Kz44O844OX44KS5oyH5a6a44GX44G+44GZ44CC44OA44Kk44Ki44Ot44Kw44GL44KJ44Oi44OH44Or44KE44K544Kz44O844OX44Gu44Oh44K944OD44OJ44Gr44Ki44Kv44K744K544GZ44KL44Gu44Gr5L2/44GE44G+44GZ44CC44GT44Gu44OR44Op44Oh44O844K/44GvQW5ndWxhckpT44OQ44Kk44Oz44OH44Kj44Oz44Kw44Gn44Gu44G/5Yip55So44Gn44GN44G+44GZ44CCWy9qYV1cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqICAgW2VuXVByb21pc2Ugb2JqZWN0IHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGRpYWxvZyBjb21wb25lbnQgb2JqZWN0LlsvZW5dXG4gICAgICogICBbamFd44OA44Kk44Ki44Ot44Kw44Gu44Kz44Oz44Od44O844ON44Oz44OI44Kq44OW44K444Kn44Kv44OI44KS6Kej5rG644GZ44KLUHJvbWlzZeOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogICBbZW5dQ3JlYXRlIGEgZGlhbG9nIGluc3RhbmNlIGZyb20gYSB0ZW1wbGF0ZS4gVGhpcyBtZXRob2Qgd2lsbCBiZSBkZXByZWNhdGVkIGluIGZhdm9yIG9mIGBvbnMuY3JlYXRlRWxlbWVudGAuWy9lbl1cbiAgICAgKiAgIFtqYV3jg4bjg7Pjg5fjg6zjg7zjg4jjgYvjgonjg4DjgqTjgqLjg63jgrDjga7jgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjcmVhdGVQb3BvdmVyXG4gICAgICogQHNpZ25hdHVyZSBjcmVhdGVQb3BvdmVyKHBhZ2UsIFtvcHRpb25zXSlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAqICAgW2VuXVBhZ2UgbmFtZS4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGZpbGUgb3IgYW4gPG9ucy10ZW1wbGF0ZT4gY29udGFpbmluZyBhIDxvbnMtZGlhbG9nPiBjb21wb25lbnQuWy9lbl1cbiAgICAgKiAgIFtqYV1wYWdl44GuVVJM44GL44CB44KC44GX44GP44Gvb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gICAgICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucGFyZW50U2NvcGVdXG4gICAgICogICBbZW5dUGFyZW50IHNjb3BlIG9mIHRoZSBkaWFsb2cuIFVzZWQgdG8gYmluZCBtb2RlbHMgYW5kIGFjY2VzcyBzY29wZSBtZXRob2RzIGZyb20gdGhlIGRpYWxvZy5bL2VuXVxuICAgICAqICAgW2phXeODgOOCpOOCouODreOCsOWGheOBp+WIqeeUqOOBmeOCi+imquOCueOCs+ODvOODl+OCkuaMh+WumuOBl+OBvuOBmeOAguODgOOCpOOCouODreOCsOOBi+OCieODouODh+ODq+OChOOCueOCs+ODvOODl+OBruODoeOCveODg+ODieOBq+OCouOCr+OCu+OCueOBmeOCi+OBruOBq+S9v+OBhOOBvuOBmeOAguOBk+OBruODkeODqeODoeODvOOCv+OBr0FuZ3VsYXJKU+ODkOOCpOODs+ODh+OCo+ODs+OCsOOBp+OBruOBv+WIqeeUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKiAgIFtlbl1Qcm9taXNlIG9iamVjdCB0aGF0IHJlc29sdmVzIHRvIHRoZSBwb3BvdmVyIGNvbXBvbmVudCBvYmplY3QuWy9lbl1cbiAgICAgKiAgIFtqYV3jg53jg4Pjg5fjgqrjg7zjg5Djg7zjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgpLop6PmsbrjgZnjgotQcm9taXNl44Kq44OW44K444Kn44Kv44OI44KS6L+U44GX44G+44GZ44CCWy9qYV1cbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiAgIFtlbl1DcmVhdGUgYSBwb3BvdmVyIGluc3RhbmNlIGZyb20gYSB0ZW1wbGF0ZS4gVGhpcyBtZXRob2Qgd2lsbCBiZSBkZXByZWNhdGVkIGluIGZhdm9yIG9mIGBvbnMuY3JlYXRlRWxlbWVudGAuWy9lbl1cbiAgICAgKiAgIFtqYV3jg4bjg7Pjg5fjg6zjg7zjg4jjgYvjgonjg53jg4Pjg5fjgqrjg7zjg5Djg7zjga7jgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZnjgIJbL2phXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgKi9cbiAgICBjb25zdCByZXNvbHZlTG9hZGluZ1BsYWNlSG9sZGVyT3JpZ2luYWwgPSBvbnMucmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlcjtcbiAgICBvbnMucmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlciA9IHBhZ2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXJPcmlnaW5hbChwYWdlLCAoZWxlbWVudCwgZG9uZSkgPT4ge1xuICAgICAgICBvbnMuY29tcGlsZShlbGVtZW50KTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLnNjb3BlKCkuJGV2YWxBc3luYygoKSA9PiBzZXRJbW1lZGlhdGUoZG9uZSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIG9ucy5fc2V0dXBMb2FkaW5nUGxhY2VIb2xkZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBEbyBub3RoaW5nXG4gICAgfTtcbiAgfVxuXG59KSh3aW5kb3cub25zID0gd2luZG93Lm9ucyB8fCB7fSk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0FjdGlvblNoZWV0VmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIEFjdGlvblNoZWV0VmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnc2hvdycsICdoaWRlJywgJ3RvZ2dsZSdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdwcmVzaG93JywgJ3Bvc3RzaG93JywgJ3ByZWhpZGUnLCAncG9zdGhpZGUnLCAnY2FuY2VsJ1xuICAgICAgICBdLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLmFjdGlvblNoZWV0KSB7XG4gICAgICAgICAgICBkZXRhaWwuYWN0aW9uU2hlZXQgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKEFjdGlvblNoZWV0Vmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChBY3Rpb25TaGVldFZpZXcsIFsnZGlzYWJsZWQnLCAnY2FuY2VsYWJsZScsICd2aXNpYmxlJywgJ29uRGV2aWNlQmFja0J1dHRvbiddKTtcblxuICAgIHJldHVybiBBY3Rpb25TaGVldFZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnQWxlcnREaWFsb2dWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgQWxlcnREaWFsb2dWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzaG93JywgJ2hpZGUnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncHJlc2hvdycsXG4gICAgICAgICAgJ3Bvc3RzaG93JyxcbiAgICAgICAgICAncHJlaGlkZScsXG4gICAgICAgICAgJ3Bvc3RoaWRlJyxcbiAgICAgICAgICAnY2FuY2VsJ1xuICAgICAgICBdLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLmFsZXJ0RGlhbG9nKSB7XG4gICAgICAgICAgICBkZXRhaWwuYWxlcnREaWFsb2cgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oQWxlcnREaWFsb2dWaWV3KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KEFsZXJ0RGlhbG9nVmlldywgWydkaXNhYmxlZCcsICdjYW5jZWxhYmxlJywgJ3Zpc2libGUnLCAnb25EZXZpY2VCYWNrQnV0dG9uJ10pO1xuXG4gICAgcmV0dXJuIEFsZXJ0RGlhbG9nVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdDYXJvdXNlbFZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIC8qKlxuICAgICAqIEBjbGFzcyBDYXJvdXNlbFZpZXdcbiAgICAgKi9cbiAgICB2YXIgQ2Fyb3VzZWxWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVJbmRleCcsICdnZXRBY3RpdmVJbmRleCcsICduZXh0JywgJ3ByZXYnLCAncmVmcmVzaCcsICdmaXJzdCcsICdsYXN0J1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbJ3JlZnJlc2gnLCAncG9zdGNoYW5nZScsICdvdmVyc2Nyb2xsJ10sIGZ1bmN0aW9uKGRldGFpbCkge1xuICAgICAgICAgIGlmIChkZXRhaWwuY2Fyb3VzZWwpIHtcbiAgICAgICAgICAgIGRldGFpbC5jYXJvdXNlbCA9IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKENhcm91c2VsVmlldyk7XG5cbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KENhcm91c2VsVmlldywgW1xuICAgICAgJ2NlbnRlcmVkJywgJ292ZXJzY3JvbGxhYmxlJywgJ2Rpc2FibGVkJywgJ2F1dG9TY3JvbGwnLCAnc3dpcGVhYmxlJywgJ2F1dG9TY3JvbGxSYXRpbycsICdpdGVtQ291bnQnLCAnb25Td2lwZSdcbiAgICBdKTtcblxuICAgIHJldHVybiBDYXJvdXNlbFZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnRGlhbG9nVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIERpYWxvZ1ZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3Nob3cnLCAnaGlkZSdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdwcmVzaG93JyxcbiAgICAgICAgICAncG9zdHNob3cnLFxuICAgICAgICAgICdwcmVoaWRlJyxcbiAgICAgICAgICAncG9zdGhpZGUnLFxuICAgICAgICAgICdjYW5jZWwnXG4gICAgICAgIF0sIGZ1bmN0aW9uKGRldGFpbCkge1xuICAgICAgICAgIGlmIChkZXRhaWwuZGlhbG9nKSB7XG4gICAgICAgICAgICBkZXRhaWwuZGlhbG9nID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oRGlhbG9nVmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChEaWFsb2dWaWV3LCBbJ2Rpc2FibGVkJywgJ2NhbmNlbGFibGUnLCAndmlzaWJsZScsICdvbkRldmljZUJhY2tCdXR0b24nXSk7XG5cbiAgICByZXR1cm4gRGlhbG9nVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdGYWJWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgRmFiVmlld1xuICAgICAqL1xuICAgIHZhciBGYWJWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzaG93JywgJ2hpZGUnLCAndG9nZ2xlJ1xuICAgICAgICBdKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChGYWJWaWV3LCBbXG4gICAgICAnZGlzYWJsZWQnLCAndmlzaWJsZSdcbiAgICBdKTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oRmFiVmlldyk7XG5cbiAgICByZXR1cm4gRmFiVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIEdlbmVyaWNWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGlyZWN0aXZlT25seV1cbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRGVzdHJveV1cbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBvcHRpb25zID0ge307XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZGlyZWN0aXZlT25seSkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSBpcyB1bmRlZmluZWQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHModGhpcywgb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlLCBlbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGhpcywgZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHNlbGYpO1xuXG4gICAgICAgICAgaWYgKG9wdGlvbnMub25EZXN0cm95KSB7XG4gICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveShzZWxmKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzLFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2VsZiA9IGVsZW1lbnQgPSBzZWxmLl9lbGVtZW50ID0gc2VsZi5fc2NvcGUgPSBzY29wZSA9IHNlbGYuX2F0dHJzID0gYXR0cnMgPSBvcHRpb25zID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMudmlld0tleVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGlyZWN0aXZlT25seV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGVdXG4gICAgICovXG4gICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIgPSBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycywgb3B0aW9ucyk7XG5cbiAgICAgIGlmICghb3B0aW9ucy52aWV3S2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb3B0aW9ucy52aWV3S2V5IGlzIHJlcXVpcmVkLicpO1xuICAgICAgfVxuXG4gICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICBlbGVtZW50LmRhdGEob3B0aW9ucy52aWV3S2V5LCB2aWV3KTtcblxuICAgICAgdmFyIGRlc3Ryb3kgPSBvcHRpb25zLm9uRGVzdHJveSB8fCBhbmd1bGFyLm5vb3A7XG4gICAgICBvcHRpb25zLm9uRGVzdHJveSA9IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgZGVzdHJveSh2aWV3KTtcbiAgICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgbnVsbCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdmlldztcbiAgICB9O1xuXG4gICAgTWljcm9FdmVudC5taXhpbihHZW5lcmljVmlldyk7XG5cbiAgICByZXR1cm4gR2VuZXJpY1ZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZScsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG5cbiAgICBjb25zdCBkaXJlY3RpdmVBdHRyaWJ1dGVzID0gWydvbnMtbGF6eS1yZXBlYXQnLCAnb25zOmxhenk6cmVwZWF0JywgJ29uc19sYXp5X3JlcGVhdCcsICdkYXRhLW9ucy1sYXp5LXJlcGVhdCcsICd4LW9ucy1sYXp5LXJlcGVhdCddO1xuICAgIGNsYXNzIEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUgZXh0ZW5kcyBvbnMuX2ludGVybmFsLkxhenlSZXBlYXREZWxlZ2F0ZSB7XG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyRGVsZWdhdGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGVtcGxhdGVFbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge1Njb3BlfSBwYXJlbnRTY29wZVxuICAgICAgICovXG4gICAgICBjb25zdHJ1Y3Rvcih1c2VyRGVsZWdhdGUsIHRlbXBsYXRlRWxlbWVudCwgcGFyZW50U2NvcGUpIHtcbiAgICAgICAgc3VwZXIodXNlckRlbGVnYXRlLCB0ZW1wbGF0ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9wYXJlbnRTY29wZSA9IHBhcmVudFNjb3BlO1xuXG4gICAgICAgIGRpcmVjdGl2ZUF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyID0+IHRlbXBsYXRlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpO1xuICAgICAgICB0aGlzLl9saW5rZXIgPSAkY29tcGlsZSh0ZW1wbGF0ZUVsZW1lbnQgPyB0ZW1wbGF0ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIDogbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZShpdGVtLCBzY29wZSl7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKGl0ZW0sIHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkZXN0cm95SXRlbVNjb3BlKGl0ZW0sIGVsZW1lbnQpe1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmRlc3Ryb3lJdGVtU2NvcGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VzZXJEZWxlZ2F0ZS5kZXN0cm95SXRlbVNjb3BlKGl0ZW0sIGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF91c2luZ0JpbmRpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbGF6eS1yZXBlYXRgIGRlbGVnYXRlIG9iamVjdCBpcyB2YWd1ZS4nKTtcbiAgICAgIH1cblxuICAgICAgbG9hZEl0ZW1FbGVtZW50KGluZGV4LCBkb25lKSB7XG4gICAgICAgIHRoaXMuX3ByZXBhcmVJdGVtRWxlbWVudChpbmRleCwgKHtlbGVtZW50LCBzY29wZX0pID0+IHtcbiAgICAgICAgICBkb25lKHtlbGVtZW50LCBzY29wZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgX3ByZXBhcmVJdGVtRWxlbWVudChpbmRleCwgZG9uZSkge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuX3BhcmVudFNjb3BlLiRuZXcoKTtcbiAgICAgICAgdGhpcy5fYWRkU3BlY2lhbFByb3BlcnRpZXMoaW5kZXgsIHNjb3BlKTtcblxuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgc2NvcGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGlua2VyKHNjb3BlLCAoY2xvbmVkKSA9PiB7XG4gICAgICAgICAgbGV0IGVsZW1lbnQgPSBjbG9uZWRbMF07XG4gICAgICAgICAgaWYgKCF0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuX3VzZXJEZWxlZ2F0ZS5jcmVhdGVJdGVtQ29udGVudChpbmRleCwgZWxlbWVudCk7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KShzY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9uZSh7ZWxlbWVudCwgc2NvcGV9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqL1xuICAgICAgX2FkZFNwZWNpYWxQcm9wZXJ0aWVzKGksIHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmNvdW50SXRlbXMoKSAtIDE7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHNjb3BlLCB7XG4gICAgICAgICAgJGluZGV4OiBpLFxuICAgICAgICAgICRmaXJzdDogaSA9PT0gMCxcbiAgICAgICAgICAkbGFzdDogaSA9PT0gbGFzdCxcbiAgICAgICAgICAkbWlkZGxlOiBpICE9PSAwICYmIGkgIT09IGxhc3QsXG4gICAgICAgICAgJGV2ZW46IGkgJSAyID09PSAwLFxuICAgICAgICAgICRvZGQ6IGkgJSAyID09PSAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIGl0ZW0uc2NvcGUuJGV2YWxBc3luYygoKSA9PiB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0uc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gaXRlbS5lbGVtZW50XG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3lJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuZGVzdHJveUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIuZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0uZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5zY29wZS4kZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBkZXN0cm95KCkge1xuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlO1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0xhenlSZXBlYXRWaWV3JywgZnVuY3Rpb24oQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZSkge1xuXG4gICAgdmFyIExhenlSZXBlYXRWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBsaW5rZXIpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuX2xpbmtlciA9IGxpbmtlcjtcblxuICAgICAgICB2YXIgdXNlckRlbGVnYXRlID0gdGhpcy5fc2NvcGUuJGV2YWwodGhpcy5fYXR0cnMub25zTGF6eVJlcGVhdCk7XG5cbiAgICAgICAgdmFyIGludGVybmFsRGVsZWdhdGUgPSBuZXcgQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZSh1c2VyRGVsZWdhdGUsIGVsZW1lbnRbMF0sIHNjb3BlIHx8IGVsZW1lbnQuc2NvcGUoKSk7XG5cbiAgICAgICAgdGhpcy5fcHJvdmlkZXIgPSBuZXcgb25zLl9pbnRlcm5hbC5MYXp5UmVwZWF0UHJvdmlkZXIoZWxlbWVudFswXS5wYXJlbnROb2RlLCBpbnRlcm5hbERlbGVnYXRlKTtcblxuICAgICAgICAvLyBFeHBvc2UgcmVmcmVzaCBtZXRob2QgdG8gdXNlci5cbiAgICAgICAgdXNlckRlbGVnYXRlLnJlZnJlc2ggPSB0aGlzLl9wcm92aWRlci5yZWZyZXNoLmJpbmQodGhpcy5fcHJvdmlkZXIpO1xuXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gUmVuZGVyIHdoZW4gbnVtYmVyIG9mIGl0ZW1zIGNoYW5nZS5cbiAgICAgICAgdGhpcy5fc2NvcGUuJHdhdGNoKGludGVybmFsRGVsZWdhdGUuY291bnRJdGVtcy5iaW5kKGludGVybmFsRGVsZWdhdGUpLCB0aGlzLl9wcm92aWRlci5fb25DaGFuZ2UuYmluZCh0aGlzLl9wcm92aWRlcikpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLl9saW5rZXIgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBMYXp5UmVwZWF0VmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdNb2RhbFZpZXcnLCBmdW5jdGlvbigkb25zZW4sICRwYXJzZSkge1xuXG4gICAgdmFyIE1vZGFsVmlldyA9IENsYXNzLmV4dGVuZCh7XG4gICAgICBfZWxlbWVudDogdW5kZWZpbmVkLFxuICAgICAgX3Njb3BlOiB1bmRlZmluZWQsXG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5fc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbICdzaG93JywgJ2hpZGUnLCAndG9nZ2xlJyBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3ByZXNob3cnLCAncG9zdHNob3cnLCAncHJlaGlkZScsICdwb3N0aGlkZScsXG4gICAgICAgIF0sIGZ1bmN0aW9uKGRldGFpbCkge1xuICAgICAgICAgIGlmIChkZXRhaWwubW9kYWwpIHtcbiAgICAgICAgICAgIGRldGFpbC5tb2RhbCA9IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScsIHtwYWdlOiB0aGlzfSk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKE1vZGFsVmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChNb2RhbFZpZXcsIFsnb25EZXZpY2VCYWNrQnV0dG9uJywgJ3Zpc2libGUnXSk7XG5cblxuICAgIHJldHVybiBNb2RhbFZpZXc7XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdOYXZpZ2F0b3JWaWV3JywgZnVuY3Rpb24oJGNvbXBpbGUsICRvbnNlbikge1xuXG4gICAgLyoqXG4gICAgICogTWFuYWdlcyB0aGUgcGFnZSBuYXZpZ2F0aW9uIGJhY2tlZCBieSBwYWdlIHN0YWNrLlxuICAgICAqXG4gICAgICogQGNsYXNzIE5hdmlnYXRvclZpZXdcbiAgICAgKi9cbiAgICB2YXIgTmF2aWdhdG9yVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlciB7anFMaXRlfSBPYmplY3RcbiAgICAgICAqL1xuICAgICAgX2VsZW1lbnQ6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IE9iamVjdFxuICAgICAgICovXG4gICAgICBfYXR0cnM6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICAgKi9cbiAgICAgIF9zY29wZTogdW5kZWZpbmVkLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQganFMaXRlIE9iamVjdCB0byBtYW5hZ2Ugd2l0aCBuYXZpZ2F0b3JcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudCB8fCBhbmd1bGFyLmVsZW1lbnQod2luZG93LmRvY3VtZW50LmJvZHkpO1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlIHx8IHRoaXMuX2VsZW1lbnQuc2NvcGUoKTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQYWdlU2NvcGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2JvdW5kT25QcmVwb3AgPSB0aGlzLl9vblByZXBvcC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9lbGVtZW50Lm9uKCdwcmVwb3AnLCB0aGlzLl9ib3VuZE9uUHJlcG9wKTtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3ByZXB1c2gnLCAncG9zdHB1c2gnLCAncHJlcG9wJyxcbiAgICAgICAgICAncG9zdHBvcCcsICdpbml0JywgJ3Nob3cnLCAnaGlkZScsICdkZXN0cm95J1xuICAgICAgICBdLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLm5hdmlnYXRvcikge1xuICAgICAgICAgICAgZGV0YWlsLm5hdmlnYXRvciA9IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZXRhaWw7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ2luc2VydFBhZ2UnLFxuICAgICAgICAgICdyZW1vdmVQYWdlJyxcbiAgICAgICAgICAncHVzaFBhZ2UnLFxuICAgICAgICAgICdicmluZ1BhZ2VUb3AnLFxuICAgICAgICAgICdwb3BQYWdlJyxcbiAgICAgICAgICAncmVwbGFjZVBhZ2UnLFxuICAgICAgICAgICdyZXNldFRvUGFnZScsXG4gICAgICAgICAgJ2NhblBvcFBhZ2UnXG4gICAgICAgIF0pO1xuICAgICAgfSxcblxuICAgICAgX29uUHJlcG9wOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgcGFnZXMgPSBldmVudC5kZXRhaWwubmF2aWdhdG9yLnBhZ2VzO1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQocGFnZXNbcGFnZXMubGVuZ3RoIC0gMl0pLmRhdGEoJ19zY29wZScpLiRldmFsQXN5bmMoKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5vZmYoJ3ByZXBvcCcsIHRoaXMuX2JvdW5kT25QcmVwb3ApO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKE5hdmlnYXRvclZpZXcpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoTmF2aWdhdG9yVmlldywgWydwYWdlcycsICd0b3BQYWdlJywgJ29uU3dpcGUnLCAnb3B0aW9ucycsICdvbkRldmljZUJhY2tCdXR0b24nLCAncGFnZUxvYWRlciddKTtcblxuICAgIHJldHVybiBOYXZpZ2F0b3JWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1BhZ2VWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCAkcGFyc2UpIHtcblxuICAgIHZhciBQYWdlVmlldyA9IENsYXNzLmV4dGVuZCh7XG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJMaXN0ZW5lciA9IHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIGVsZW1lbnRbMF0sIFsnaW5pdCcsICdzaG93JywgJ2hpZGUnLCAnZGVzdHJveSddKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ29uRGV2aWNlQmFja0J1dHRvbicsIHtcbiAgICAgICAgICBnZXQ6ICgpID0+IHRoaXMuX2VsZW1lbnRbMF0ub25EZXZpY2VCYWNrQnV0dG9uLFxuICAgICAgICAgIHNldDogdmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl91c2VyQmFja0J1dHRvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlQmFja0J1dHRvbkhhbmRsZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3VzZXJCYWNrQnV0dG9uSGFuZGxlciA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2F0dHJzLm5nRGV2aWNlQmFja0J1dHRvbiB8fCB0aGlzLl9hdHRycy5vbkRldmljZUJhY2tCdXR0b24pIHtcbiAgICAgICAgICB0aGlzLl9lbmFibGVCYWNrQnV0dG9uSGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hdHRycy5uZ0luZmluaXRlU2Nyb2xsKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFswXS5vbkluZmluaXRlU2Nyb2xsID0gKGRvbmUpID0+IHtcbiAgICAgICAgICAgICRwYXJzZSh0aGlzLl9hdHRycy5uZ0luZmluaXRlU2Nyb2xsKSh0aGlzLl9zY29wZSkoZG9uZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgX2VuYWJsZUJhY2tCdXR0b25IYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fdXNlckJhY2tCdXR0b25IYW5kbGVyID0gYW5ndWxhci5ub29wO1xuICAgICAgICB0aGlzLl9lbGVtZW50WzBdLm9uRGV2aWNlQmFja0J1dHRvbiA9IHRoaXMuX29uRGV2aWNlQmFja0J1dHRvbi5iaW5kKHRoaXMpO1xuICAgICAgfSxcblxuICAgICAgX29uRGV2aWNlQmFja0J1dHRvbjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3VzZXJCYWNrQnV0dG9uSGFuZGxlcigkZXZlbnQpO1xuXG4gICAgICAgIC8vIG5nLWRldmljZS1iYWNrYnV0dG9uXG4gICAgICAgIGlmICh0aGlzLl9hdHRycy5uZ0RldmljZUJhY2tCdXR0b24pIHtcbiAgICAgICAgICAkcGFyc2UodGhpcy5fYXR0cnMubmdEZXZpY2VCYWNrQnV0dG9uKSh0aGlzLl9zY29wZSwgeyRldmVudDogJGV2ZW50fSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvbi1kZXZpY2UtYmFja2J1dHRvblxuICAgICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICAgIGlmICh0aGlzLl9hdHRycy5vbkRldmljZUJhY2tCdXR0b24pIHtcbiAgICAgICAgICB2YXIgbGFzdEV2ZW50ID0gd2luZG93LiRldmVudDtcbiAgICAgICAgICB3aW5kb3cuJGV2ZW50ID0gJGV2ZW50O1xuICAgICAgICAgIG5ldyBGdW5jdGlvbih0aGlzLl9hdHRycy5vbkRldmljZUJhY2tCdXR0b24pKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgICAgICB3aW5kb3cuJGV2ZW50ID0gbGFzdEV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyTGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBNaWNyb0V2ZW50Lm1peGluKFBhZ2VWaWV3KTtcblxuICAgIHJldHVybiBQYWdlVmlldztcbiAgfSk7XG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ1BvcG92ZXJWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgUG9wb3ZlclZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3Nob3cnLCAnaGlkZSdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdwcmVzaG93JyxcbiAgICAgICAgICAncG9zdHNob3cnLFxuICAgICAgICAgICdwcmVoaWRlJyxcbiAgICAgICAgICAncG9zdGhpZGUnXG4gICAgICAgIF0sIGZ1bmN0aW9uKGRldGFpbCkge1xuICAgICAgICAgIGlmIChkZXRhaWwucG9wb3Zlcikge1xuICAgICAgICAgICAgZGV0YWlsLnBvcG92ZXIgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihQb3BvdmVyVmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChQb3BvdmVyVmlldywgWydjYW5jZWxhYmxlJywgJ2Rpc2FibGVkJywgJ29uRGV2aWNlQmFja0J1dHRvbicsICd2aXNpYmxlJ10pO1xuXG5cbiAgICByZXR1cm4gUG9wb3ZlclZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnUHVsbEhvb2tWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCAkcGFyc2UpIHtcblxuICAgIHZhciBQdWxsSG9va1ZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdjaGFuZ2VzdGF0ZScsXG4gICAgICAgIF0sIGRldGFpbCA9PiB7XG4gICAgICAgICAgaWYgKGRldGFpbC5wdWxsSG9vaykge1xuICAgICAgICAgICAgZGV0YWlsLnB1bGxIb29rID0gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRldGFpbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignY2hhbmdlc3RhdGUnLCAoKSA9PiB0aGlzLl9zY29wZS4kZXZhbEFzeW5jKCkpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnRbMF0ub25BY3Rpb24gPSBkb25lID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fYXR0cnMubmdBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3Njb3BlLiRldmFsKHRoaXMuX2F0dHJzLm5nQWN0aW9uLCB7JGRvbmU6IGRvbmV9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkFjdGlvbiA/IHRoaXMub25BY3Rpb24oZG9uZSkgOiBkb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihQdWxsSG9va1ZpZXcpO1xuXG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChQdWxsSG9va1ZpZXcsIFsnc3RhdGUnLCAnb25QdWxsJywgJ3B1bGxEaXN0YW5jZScsICdoZWlnaHQnLCAndGhyZXNob2xkSGVpZ2h0JywgJ2Rpc2FibGVkJ10pO1xuXG4gICAgcmV0dXJuIFB1bGxIb29rVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdTcGVlZERpYWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgU3BlZWREaWFsVmlld1xuICAgICAqL1xuICAgIHZhciBTcGVlZERpYWxWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzaG93JywgJ2hpZGUnLCAnc2hvd0l0ZW1zJywgJ2hpZGVJdGVtcycsICdpc09wZW4nLCAndG9nZ2xlJywgJ3RvZ2dsZUl0ZW1zJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbJ29wZW4nLCAnY2xvc2UnXSkuYmluZCh0aGlzKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BlZWREaWFsVmlldyk7XG5cbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwZWVkRGlhbFZpZXcsIFtcbiAgICAgICdkaXNhYmxlZCcsICd2aXNpYmxlJywgJ2lubGluZSdcbiAgICBdKTtcblxuICAgIHJldHVybiBTcGVlZERpYWxWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJDb250ZW50JywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyQ29udGVudCA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLmxvYWQgPSB0aGlzLl9lbGVtZW50WzBdLmxvYWQuYmluZCh0aGlzLl9lbGVtZW50WzBdKTtcbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMubG9hZCA9IHRoaXMuX3BhZ2VTY29wZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyQ29udGVudCk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlckNvbnRlbnQsIFsncGFnZSddKTtcblxuICAgIHJldHVybiBTcGxpdHRlckNvbnRlbnQ7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlKSB7XG5cbiAgICB2YXIgU3BsaXR0ZXJTaWRlID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdvcGVuJywgJ2Nsb3NlJywgJ3RvZ2dsZScsICdsb2FkJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ21vZGVjaGFuZ2UnLCAncHJlb3BlbicsICdwcmVjbG9zZScsICdwb3N0b3BlbicsICdwb3N0Y2xvc2UnXG4gICAgICAgIF0sIGRldGFpbCA9PiBkZXRhaWwuc2lkZSA/IGFuZ3VsYXIuZXh0ZW5kKGRldGFpbCwge3NpZGU6IHRoaXN9KSA6IGRldGFpbCk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyU2lkZSk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlclNpZGUsIFsncGFnZScsICdtb2RlJywgJ2lzT3BlbicsICdvblN3aXBlJywgJ3BhZ2VMb2FkZXInXSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXJTaWRlO1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXInLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBTcGxpdHRlciA9IENsYXNzLmV4dGVuZCh7XG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihTcGxpdHRlcik7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlciwgWydvbkRldmljZUJhY2tCdXR0b24nXSk7XG5cbiAgICBbJ2xlZnQnLCAncmlnaHQnLCAnc2lkZScsICdjb250ZW50JywgJ21hc2snXS5mb3JFYWNoKChwcm9wLCBpKSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3BsaXR0ZXIucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB0YWdOYW1lID0gYG9ucy1zcGxpdHRlci0ke2kgPCAzID8gJ3NpZGUnIDogcHJvcH1gO1xuICAgICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQodGhpcy5fZWxlbWVudFswXVtwcm9wXSkuZGF0YSh0YWdOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXI7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3dpdGNoVmlldycsIGZ1bmN0aW9uKCRwYXJzZSwgJG9uc2VuKSB7XG5cbiAgICB2YXIgU3dpdGNoVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHNjb3BlLCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fY2hlY2tib3ggPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpKTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcblxuICAgICAgICB0aGlzLl9wcmVwYXJlTmdNb2RlbChlbGVtZW50LCBzY29wZSwgYXR0cnMpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2NoZWNrYm94ID0gdGhpcy5fc2NvcGUgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIF9wcmVwYXJlTmdNb2RlbDogZnVuY3Rpb24oZWxlbWVudCwgc2NvcGUsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgdmFyIHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiR3YXRjaChhdHRycy5uZ01vZGVsLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5vbignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgICAgICBzZXQoc2NvcGUuJHBhcmVudCwgdGhpcy5jaGVja2VkKTtcblxuICAgICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3dpdGNoVmlldyk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTd2l0Y2hWaWV3LCBbJ2Rpc2FibGVkJywgJ2NoZWNrZWQnLCAnY2hlY2tib3gnLCAndmFsdWUnXSk7XG5cbiAgICByZXR1cm4gU3dpdGNoVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdUYWJiYXJWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgdmFyIFRhYmJhclZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGVsZW1lbnRbMF0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ29ucy10YWJiYXInKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcImVsZW1lbnRcIiBwYXJhbWV0ZXIgbXVzdCBiZSBhIFwib25zLXRhYmJhclwiIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3JlYWN0aXZlJywgJ3Bvc3RjaGFuZ2UnLCAncHJlY2hhbmdlJywgJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVUYWInLFxuICAgICAgICAgICdzaG93JyxcbiAgICAgICAgICAnaGlkZScsXG4gICAgICAgICAgJ3NldFRhYmJhclZpc2liaWxpdHknLFxuICAgICAgICAgICdnZXRBY3RpdmVUYWJJbmRleCcsXG4gICAgICAgIF0pO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihUYWJiYXJWaWV3KTtcblxuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoVGFiYmFyVmlldywgWyd2aXNpYmxlJywgJ3N3aXBlYWJsZScsICdvblN3aXBlJ10pO1xuXG4gICAgcmV0dXJuIFRhYmJhclZpZXc7XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdUb2FzdFZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBUb2FzdFZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3Nob3cnLCAnaGlkZScsICd0b2dnbGUnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncHJlc2hvdycsXG4gICAgICAgICAgJ3Bvc3RzaG93JyxcbiAgICAgICAgICAncHJlaGlkZScsXG4gICAgICAgICAgJ3Bvc3RoaWRlJ1xuICAgICAgICBdLCBmdW5jdGlvbihkZXRhaWwpIHtcbiAgICAgICAgICBpZiAoZGV0YWlsLnRvYXN0KSB7XG4gICAgICAgICAgICBkZXRhaWwudG9hc3QgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGV0YWlsO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oVG9hc3RWaWV3KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFRvYXN0VmlldywgWyd2aXNpYmxlJywgJ29uRGV2aWNlQmFja0J1dHRvbiddKTtcblxuICAgIHJldHVybiBUb2FzdFZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQWN0aW9uU2hlZXRCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1hY3Rpb24tc2hlZXQtYnV0dG9uJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1hY3Rpb24tc2hlZXRcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGFjdGlvbiBzaGVldC5bL2VuXVxuICogIFtqYV3jgZPjga7jgqLjgq/jgrfjg6fjg7Pjgrfjg7zjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZdsaXN0ZW5lcuODkeODqeODoeODvOOCv+OBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOAgeOBneOBruOCpOODmeODs+ODiOOBruODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844Gu6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5rih44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogQWN0aW9uIHNoZWV0IGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQWN0aW9uU2hlZXQnLCBmdW5jdGlvbigkb25zZW4sIEFjdGlvblNoZWV0Vmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25TaGVldCA9IG5ldyBBY3Rpb25TaGVldFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGFjdGlvblNoZWV0KTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoYWN0aW9uU2hlZXQsICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGFjdGlvblNoZWV0LCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWN0aW9uLXNoZWV0JywgYWN0aW9uU2hlZXQpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGFjdGlvblNoZWV0Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYWN0aW9uU2hlZXQpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hY3Rpb24tc2hlZXQnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1hbGVydC1kaWFsb2dcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGFsZXJ0IGRpYWxvZy5bL2VuXVxuICogIFtqYV3jgZPjga7jgqLjg6njg7zjg4jjg4DjgqTjgqLjg63jgrDjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZdsaXN0ZW5lcuODkeODqeODoeODvOOCv+OBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOAgeOBneOBruOCpOODmeODs+ODiOOBruODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844Gu6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5rih44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogQWxlcnQgZGlhbG9nIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQWxlcnREaWFsb2cnLCBmdW5jdGlvbigkb25zZW4sIEFsZXJ0RGlhbG9nVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBhbGVydERpYWxvZyA9IG5ldyBBbGVydERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoYWxlcnREaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGFsZXJ0RGlhbG9nLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWxlcnQtZGlhbG9nJywgYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYWxlcnREaWFsb2cuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhhbGVydERpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFsZXJ0LWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNCYWNrQnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSwgR2VuZXJpY1ZpZXcsIENvbXBvbmVudENsZWFuZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBiYWNrQnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYmFjay1idXR0b24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGF0dHJzLm5nQ2xpY2spIHtcbiAgICAgICAgICAgICAgZWxlbWVudFswXS5vbkNsaWNrID0gYW5ndWxhci5ub29wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGJhY2tCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhiYWNrQnV0dG9uKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cnMpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNCb3R0b21Ub29sYmFyJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgdmlld0tleTogJ29ucy1ib3R0b21Ub29sYmFyJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWJ1dHRvblxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYnV0dG9uJ1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYnV0dG9uLCAnZGlzYWJsZWQnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZCA9IHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cblxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNDYXJkJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtY2FyZCd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtY2Fyb3VzZWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgqvjg6vjg7zjgrvjg6vjgpLooajnpLrjgafjgY3jgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgIJbL2phXVxuICogQGNvZGVwZW4geGJiek9RXG4gKiBAZ3VpZGUgVXNpbmdDYXJvdXNlbFxuICogICBbZW5dTGVhcm4gaG93IHRvIHVzZSB0aGUgY2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV1jYXJvdXNlbOOCs+ODs+ODneODvOODjeODs+ODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1jYXJvdXNlbCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDIwMHB4XCI+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqIDwvb25zLWNhcm91c2VsPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNhcm91c2VsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqvjg6vjg7zjgrvjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXJlZnJlc2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlZnJlc2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlZnJlc2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vdmVyc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvdmVyc2Nyb2xsXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvdmVyc2Nyb2xsXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWwnLCBmdW5jdGlvbigkb25zZW4sIENhcm91c2VsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIGNhcm91c2VsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoY2Fyb3VzZWwsICdwb3N0Y2hhbmdlIHJlZnJlc2ggb3ZlcnNjcm9sbCBkZXN0cm95Jyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGNhcm91c2VsKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhcm91c2VsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9KTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNDYXJvdXNlbEl0ZW0nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuJGxhc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcm91c2VsID0gJG9uc2VuLnV0aWwuZmluZFBhcmVudChlbGVtZW50WzBdLCAnb25zLWNhcm91c2VsJyk7XG4gICAgICAgICAgICBjYXJvdXNlbC5fc3dpcGVyLmluaXQoe1xuICAgICAgICAgICAgICBzd2lwZWFibGU6IGNhcm91c2VsLmhhc0F0dHJpYnV0ZSgnc3dpcGVhYmxlJyksXG4gICAgICAgICAgICAgIGF1dG9SZWZyZXNoOiBjYXJvdXNlbC5oYXNBdHRyaWJ1dGUoJ2F1dG8tcmVmcmVzaCcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWNoZWNrYm94XG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0NoZWNrYm94JywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRbMF07XG5cbiAgICAgICAgY29uc3Qgb25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbihzY29wZSwgZWwuY2hlY2tlZCk7XG4gICAgICAgICAgYXR0cnMubmdDaGFuZ2UgJiYgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsIHZhbHVlID0+IGVsLmNoZWNrZWQgPSB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5vbignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1kaWFsb2dcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGRpYWxvZy5bL2VuXVxuICogIFtqYV3jgZPjga7jg4DjgqTjgqLjg63jgrDjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zRGlhbG9nJywgZnVuY3Rpb24oJG9uc2VuLCBEaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICB2YXIgZGlhbG9nID0gbmV3IERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBkaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhkaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGRpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIGRpYWxvZyk7XG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGRpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0R1bW15Rm9ySW5pdCcsIGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICB2YXIgaXNSZWFkeSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgbGluazoge1xuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgIGlmICghaXNSZWFkeSkge1xuICAgICAgICAgICAgaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRvbnMtcmVhZHknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtZmFiXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoZSBmbG9hdGluZyBhY3Rpb24gYnV0dG9uLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5Xjg63jg7zjg4bjgqPjg7PjgrDjgqLjgq/jgrfjg6fjg7Pjg5zjgr/jg7PjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLjgZfjgabjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNGYWInLCBmdW5jdGlvbigkb25zZW4sIEZhYlZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBmYWIgPSBuZXcgRmFiVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZmFiJywgZmFiKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBmYWIpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZmFiJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgRVZFTlRTID1cbiAgICAoJ2RyYWcgZHJhZ2xlZnQgZHJhZ3JpZ2h0IGRyYWd1cCBkcmFnZG93biBob2xkIHJlbGVhc2Ugc3dpcGUgc3dpcGVsZWZ0IHN3aXBlcmlnaHQgJyArXG4gICAgICAnc3dpcGV1cCBzd2lwZWRvd24gdGFwIGRvdWJsZXRhcCB0b3VjaCB0cmFuc2Zvcm0gcGluY2ggcGluY2hpbiBwaW5jaG91dCByb3RhdGUnKS5zcGxpdCgvICsvKTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0dlc3R1cmVEZXRlY3RvcicsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIHNjb3BlRGVmID0gRVZFTlRTLnJlZHVjZShmdW5jdGlvbihkaWN0LCBuYW1lKSB7XG4gICAgICBkaWN0WyduZycgKyB0aXRsaXplKG5hbWUpXSA9ICcmJztcbiAgICAgIHJldHVybiBkaWN0O1xuICAgIH0sIHt9KTtcblxuICAgIGZ1bmN0aW9uIHRpdGxpemUoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHNjb3BlRGVmLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgXywgdHJhbnNjbHVkZSkge1xuXG4gICAgICAgICAgdHJhbnNjbHVkZShzY29wZS4kcGFyZW50LCBmdW5jdGlvbihjbG9uZWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgYXR0ciA9ICduZycgKyB0aXRsaXplKGV2ZW50LnR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoYXR0ciBpbiBzY29wZURlZikge1xuICAgICAgICAgICAgICBzY29wZVthdHRyXSh7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZ2VzdHVyZURldGVjdG9yO1xuXG4gICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yID0gZWxlbWVudFswXS5fZ2VzdHVyZURldGVjdG9yO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLm9uKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vZmYoRVZFTlRTLmpvaW4oJyAnKSwgaGFuZGxlcik7XG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3IuZWxlbWVudCA9IHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtaWNvblxuICovXG5cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNJY29uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5pY29uLmluZGV4T2YoJ3t7JykgIT09IC0xKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2ljb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gZWxlbWVudFswXS5fdXBkYXRlKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChzY29wZSwgZWxlbWVudCwgYXR0cnMpID0+IHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtaWNvbidcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG5cbiAgICAgIH1cblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1vcmllbnRhdGlvblxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUNvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiBzY3JlZW4gb3JpZW50YXRpb24uIFZhbGlkIHZhbHVlcyBhcmUgcG9ydHJhaXQgYW5kIGxhbmRzY2FwZS4gRGlmZmVyZW50IGZyb20gb3RoZXIgY29tcG9uZW50cywgdGhpcyBjb21wb25lbnQgaXMgdXNlZCBhcyBhdHRyaWJ1dGUgaW4gYW55IGVsZW1lbnQuWy9lbl1cbiAqICAgW2phXeeUu+mdouOBruWQkeOBjeOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuihjOOBhOOBvuOBmeOAgnBvcnRyYWl044KC44GX44GP44GvbGFuZHNjYXBl44KS5oyH5a6a44Gn44GN44G+44GZ44CC44GZ44G544Gm44Gu6KaB57Sg44Gu5bGe5oCn44Gr5L2/55So44Gn44GN44G+44GZ44CCWy9qYV1cbiAqIEBzZWVhbHNvIG9ucy1pZi1wbGF0Zm9ybSBbZW5db25zLWlmLXBsYXRmb3JtIGNvbXBvbmVudFsvZW5dW2phXW9ucy1pZi1wbGF0Zm9ybeOCs+ODs+ODneODvOODjeODs+ODiFsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMtaWYtb3JpZW50YXRpb249XCJwb3J0cmFpdFwiPlxuICogICA8cD5UaGlzIHdpbGwgb25seSBiZSB2aXNpYmxlIGluIHBvcnRyYWl0IG1vZGUuPC9wPlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pZi1vcmllbnRhdGlvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1FaXRoZXIgXCJwb3J0cmFpdFwiIG9yIFwibGFuZHNjYXBlXCIuWy9lbl1cbiAqICAgW2phXXBvcnRyYWl044KC44GX44GP44GvbGFuZHNjYXBl44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNJZk9yaWVudGF0aW9uJywgZnVuY3Rpb24oJG9uc2VuLCAkb25zR2xvYmFsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZPcmllbnRhdGlvbicsIHVwZGF0ZSk7XG4gICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vbignY2hhbmdlJywgdXBkYXRlKTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNHbG9iYWwub3JpZW50YXRpb24ub2ZmKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgdXNlck9yaWVudGF0aW9uID0gKCcnICsgYXR0cnMub25zSWZPcmllbnRhdGlvbikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBvcmllbnRhdGlvbiA9IGdldExhbmRzY2FwZU9yUG9ydHJhaXQoKTtcblxuICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyB8fCB1c2VyT3JpZW50YXRpb24gPT09ICdsYW5kc2NhcGUnKSB7XG4gICAgICAgICAgICAgIGlmICh1c2VyT3JpZW50YXRpb24gPT09IG9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpIHtcbiAgICAgICAgICAgIHJldHVybiAkb25zR2xvYmFsLm9yaWVudGF0aW9uLmlzUG9ydHJhaXQoKSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1wbGF0Zm9ybVxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIC8gYnJvd3Nlci4gVmFsaWQgdmFsdWVzIGFyZSBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgYW5kIFwid3BcIi5bL2VuXVxuICogICAgW2phXeODl+ODqeODg+ODiOODleOCqeODvOODoOOChOODluODqeOCpuOCtuODvOOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuOBiuOBk+OBquOBhOOBvuOBmeOAgm9wZXJhLCBmaXJlZm94LCBzYWZhcmksIGNocm9tZSwgaWUsIGVkZ2UsIGFuZHJvaWQsIGJsYWNrYmVycnksIGlvcywgd3Djga7jgYTjgZrjgozjgYvjga7lgKTjgpLnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLW9yaWVudGF0aW9uIFtlbl1vbnMtaWYtb3JpZW50YXRpb24gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLW9yaWVudGF0aW9u44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1wbGF0Zm9ybT1cImFuZHJvaWRcIj5cbiAqICAgLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLXBsYXRmb3JtXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU9uZSBvciBtdWx0aXBsZSBzcGFjZSBzZXBhcmF0ZWQgdmFsdWVzOiBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgb3IgXCJ3cFwiLlsvZW5dXG4gKiAgIFtqYV1cIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIsIFwid3BcIuOBruOBhOOBmuOCjOOBi+epuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmUGxhdGZvcm0nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgdmFyIHBsYXRmb3JtID0gZ2V0UGxhdGZvcm1TdHJpbmcoKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ29uc0lmUGxhdGZvcm0nLCBmdW5jdGlvbih1c2VyUGxhdGZvcm0pIHtcbiAgICAgICAgICAgIGlmICh1c2VyUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB1cGRhdGUoKTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgdXNlclBsYXRmb3JtcyA9IGF0dHJzLm9uc0lmUGxhdGZvcm0udG9Mb3dlckNhc2UoKS50cmltKCkuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgIGlmICh1c2VyUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0udG9Mb3dlckNhc2UoKSkgPj0gMCkge1xuICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRQbGF0Zm9ybVN0cmluZygpIHtcblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2FuZHJvaWQnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKSkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1JJTSBUYWJsZXQgT1MvaSkpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CQjEwL2kpKSkge1xuICAgICAgICAgICAgcmV0dXJuICdibGFja2JlcnJ5JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICdpb3MnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9XaW5kb3dzIFBob25lfElFTW9iaWxlfFdQRGVza3RvcC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICd3cCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gT3BlcmEgOC4wKyAoVUEgZGV0ZWN0aW9uIHRvIGRldGVjdCBCbGluay92OC1wb3dlcmVkIE9wZXJhKVxuICAgICAgICAgIHZhciBpc09wZXJhID0gISF3aW5kb3cub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgT1BSLycpID49IDA7XG4gICAgICAgICAgaWYgKGlzT3BlcmEpIHtcbiAgICAgICAgICAgIHJldHVybiAnb3BlcmEnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0ZpcmVmb3ggPSB0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnOyAgIC8vIEZpcmVmb3ggMS4wK1xuICAgICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIHJldHVybiAnZmlyZWZveCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzU2FmYXJpID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdpbmRvdy5IVE1MRWxlbWVudCkuaW5kZXhPZignQ29uc3RydWN0b3InKSA+IDA7XG4gICAgICAgICAgLy8gQXQgbGVhc3QgU2FmYXJpIDMrOiBcIltvYmplY3QgSFRNTEVsZW1lbnRDb25zdHJ1Y3Rvcl1cIlxuICAgICAgICAgIGlmIChpc1NhZmFyaSkge1xuICAgICAgICAgICAgcmV0dXJuICdzYWZhcmknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0VkZ2UgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBFZGdlLycpID49IDA7XG4gICAgICAgICAgaWYgKGlzRWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuICdlZGdlJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNDaHJvbWUgPSAhIXdpbmRvdy5jaHJvbWUgJiYgIWlzT3BlcmEgJiYgIWlzRWRnZTsgLy8gQ2hyb21lIDErXG4gICAgICAgICAgaWYgKGlzQ2hyb21lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzSUUgPSAvKkBjY19vbiFAKi9mYWxzZSB8fCAhIWRvY3VtZW50LmRvY3VtZW50TW9kZTsgLy8gQXQgbGVhc3QgSUU2XG4gICAgICAgICAgaWYgKGlzSUUpIHtcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pbnB1dFxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNJbnB1dCcsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbihzY29wZSwgZWwudHlwZSA9PT0gJ251bWJlcicgPyBOdW1iZXIoZWwudmFsdWUpIDogZWwudmFsdWUpO1xuICAgICAgICAgIGF0dHJzLm5nQ2hhbmdlICYmIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBlbC52YWx1ZSkge1xuICAgICAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBjYXRlZ29yeSBmb3JtXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIENvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiBpZiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgdmlzaWJsZSBvciBoaWRkZW4uXG4gKiAgICAgVGhpcyBjb21wb25lbnQgcmVxdWlyZXMgY29yZG92YSBhbmQgdGhhdCB0aGUgY29tLmlvbmljLmtleWJvYXJkIHBsdWdpbiBpcyBpbnN0YWxsZWQuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgabjgYTjgovjgYvjganjgYbjgYvjgafjgIHjgrPjg7Pjg4bjg7Pjg4TjgpLooajnpLrjgZnjgovjgYvjganjgYbjgYvjgpLliIfjgormm7/jgYjjgovjgZPjgajjgYzlh7rmnaXjgb7jgZnjgIJcbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjga/jgIFDb3Jkb3Zh44KEY29tLmlvbmljLmtleWJvYXJk44OX44Op44Kw44Kk44Oz44KS5b+F6KaB44Go44GX44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMta2V5Ym9hcmQtYWN0aXZlPlxuICogICBUaGlzIHdpbGwgb25seSBiZSBkaXNwbGF5ZWQgaWYgdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIG9wZW4uXG4gKiA8L2Rpdj5cbiAqIDxkaXYgb25zLWtleWJvYXJkLWluYWN0aXZlPlxuICogICBUaGVyZSBpcyBhbHNvIGEgY29tcG9uZW50IHRoYXQgZG9lcyB0aGUgb3Bwb3NpdGUuXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWtleWJvYXJkLWFjdGl2ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgY29udGVudCBvZiB0YWdzIHdpdGggdGhpcyBhdHRyaWJ1dGUgd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIG9wZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOihqOekuuOBleOCjOOBn+aZguOBq+WIneOCgeOBpuihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1pbmFjdGl2ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgY29udGVudCBvZiB0YWdzIHdpdGggdGhpcyBhdHRyaWJ1dGUgd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIGhpZGRlbi5bL2VuXVxuICogICBbamFd44GT44Gu5bGe5oCn44GM44Gk44GE44Gf6KaB57Sg44Gv44CB44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6Zqg44KM44Gm44GE44KL5pmC44Gu44G/6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIGNvbXBpbGVGdW5jdGlvbiA9IGZ1bmN0aW9uKHNob3csICRvbnNlbikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBkaXNwU2hvdyA9IHNob3cgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgZGlzcEhpZGUgPSBzaG93ID8gJ25vbmUnIDogJ2Jsb2NrJztcblxuICAgICAgICB2YXIgb25TaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCBkaXNwU2hvdyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9uSGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcEhpZGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkluaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUudmlzaWJsZSkge1xuICAgICAgICAgICAgb25TaG93KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignc2hvdycsIG9uU2hvdyk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdoaWRlJywgb25IaWRlKTtcbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ2luaXQnLCBvbkluaXQpO1xuXG4gICAgICAgIGlmIChvbnMuc29mdHdhcmVLZXlib2FyZC5fdmlzaWJsZSkge1xuICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNLZXlib2FyZEFjdGl2ZScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGNvbXBpbGU6IGNvbXBpbGVGdW5jdGlvbih0cnVlLCAkb25zZW4pXG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRJbmFjdGl2ZScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGNvbXBpbGU6IGNvbXBpbGVGdW5jdGlvbihmYWxzZSwgJG9uc2VuKVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWxhenktcmVwZWF0XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIFVzaW5nIHRoaXMgY29tcG9uZW50IGEgbGlzdCB3aXRoIG1pbGxpb25zIG9mIGl0ZW1zIGNhbiBiZSByZW5kZXJlZCB3aXRob3V0IGEgZHJvcCBpbiBwZXJmb3JtYW5jZS5cbiAqICAgICBJdCBkb2VzIHRoYXQgYnkgXCJsYXppbHlcIiBsb2FkaW5nIGVsZW1lbnRzIGludG8gdGhlIERPTSB3aGVuIHRoZXkgY29tZSBpbnRvIHZpZXcgYW5kXG4gKiAgICAgcmVtb3ZpbmcgaXRlbXMgZnJvbSB0aGUgRE9NIHdoZW4gdGhleSBhcmUgbm90IHZpc2libGUuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jlhoXjgafmj4/nlLvjgZXjgozjgovjgqLjgqTjg4bjg6Djga5ET03opoHntKDjga7oqq3jgb/ovrzjgb/jga/jgIHnlLvpnaLjgavopovjgYjjgZ3jgYbjgavjgarjgaPjgZ/mmYLjgb7jgafoh6rli5XnmoTjgavpgYXlu7bjgZXjgozjgIFcbiAqICAgICDnlLvpnaLjgYvjgonopovjgYjjgarjgY/jgarjgaPjgZ/loLTlkIjjgavjga/jgZ3jga7opoHntKDjga/li5XnmoTjgavjgqLjg7Pjg63jg7zjg4njgZXjgozjgb7jgZnjgIJcbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLkvb/jgYbjgZPjgajjgafjgIHjg5Hjg5Xjgqnjg7zjg57jg7PjgrnjgpLliqPljJbjgZXjgZvjgovjgZPjgajnhKHjgZfjgavlt6jlpKfjgarmlbDjga7opoHntKDjgpLmj4/nlLvjgafjgY3jgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqIEBjb2RlcGVuIFF3ckdCbVxuICogQGd1aWRlIFVzaW5nTGF6eVJlcGVhdFxuICogICBbZW5dSG93IHRvIHVzZSBMYXp5IFJlcGVhdFsvZW5dXG4gKiAgIFtqYV3jg6zjgqTjgrjjg7zjg6rjg5Tjg7zjg4jjga7kvb/jgYTmlrlbL2phXVxuICogQGV4YW1wbGVcbiAqIDxzY3JpcHQ+XG4gKiAgIG9ucy5ib290c3RyYXAoKVxuICpcbiAqICAgLmNvbnRyb2xsZXIoJ015Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuICogICAgICRzY29wZS5NeURlbGVnYXRlID0ge1xuICogICAgICAgY291bnRJdGVtczogZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgIC8vIFJldHVybiBudW1iZXIgb2YgaXRlbXMuXG4gKiAgICAgICAgIHJldHVybiAxMDAwMDAwO1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBjYWxjdWxhdGVJdGVtSGVpZ2h0OiBmdW5jdGlvbihpbmRleCkge1xuICogICAgICAgICAvLyBSZXR1cm4gdGhlIGhlaWdodCBvZiBhbiBpdGVtIGluIHBpeGVscy5cbiAqICAgICAgICAgcmV0dXJuIDQ1O1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBjb25maWd1cmVJdGVtU2NvcGU6IGZ1bmN0aW9uKGluZGV4LCBpdGVtU2NvcGUpIHtcbiAqICAgICAgICAgLy8gSW5pdGlhbGl6ZSBzY29wZVxuICogICAgICAgICBpdGVtU2NvcGUuaXRlbSA9ICdJdGVtICMnICsgKGluZGV4ICsgMSk7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGRlc3Ryb3lJdGVtU2NvcGU6IGZ1bmN0aW9uKGluZGV4LCBpdGVtU2NvcGUpIHtcbiAqICAgICAgICAgLy8gT3B0aW9uYWwgbWV0aG9kIHRoYXQgaXMgY2FsbGVkIHdoZW4gYW4gaXRlbSBpcyB1bmxvYWRlZC5cbiAqICAgICAgICAgY29uc29sZS5sb2coJ0Rlc3Ryb3llZCBpdGVtIHdpdGggaW5kZXg6ICcgKyBpbmRleCk7XG4gKiAgICAgICB9XG4gKiAgICAgfTtcbiAqICAgfSk7XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8b25zLWxpc3QgbmctY29udHJvbGxlcj1cIk15Q29udHJvbGxlclwiPlxuICogICA8b25zLWxpc3QtaXRlbSBvbnMtbGF6eS1yZXBlYXQ9XCJNeURlbGVnYXRlXCI+XG4gKiAgICAge3sgaXRlbSB9fVxuICogICA8L29ucy1saXN0LWl0ZW0+XG4gKiA8L29ucy1saXN0PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbGF6eS1yZXBlYXRcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQSBkZWxlZ2F0ZSBvYmplY3QsIGNhbiBiZSBlaXRoZXIgYW4gb2JqZWN0IGF0dGFjaGVkIHRvIHRoZSBzY29wZSAod2hlbiB1c2luZyBBbmd1bGFySlMpIG9yIGEgbm9ybWFsIEphdmFTY3JpcHQgdmFyaWFibGUuWy9lbl1cbiAqICBbamFd6KaB57Sg44Gu44Ot44O844OJ44CB44Ki44Oz44Ot44O844OJ44Gq44Gp44Gu5Yem55CG44KS5aeU6K2y44GZ44KL44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCQW5ndWxhckpT44Gu44K544Kz44O844OX44Gu5aSJ5pWw5ZCN44KE44CB6YCa5bi444GuSmF2YVNjcmlwdOOBruWkieaVsOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAcHJvcGVydHkgZGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZ1bmN0aW9uIHdoaWNoIHJlY2lldmVzIGFuIGluZGV4IGFuZCB0aGUgc2NvcGUgZm9yIHRoZSBpdGVtLiBDYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdmFsdWVzIGluIHRoZSBpdGVtIHNjb3BlLlsvZW5dXG4gKiAgIFtqYV1bL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICAvKipcbiAgICogTGF6eSByZXBlYXQgZGlyZWN0aXZlLlxuICAgKi9cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zTGF6eVJlcGVhdCcsIGZ1bmN0aW9uKCRvbnNlbiwgTGF6eVJlcGVhdFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgICB0ZXJtaW5hbDogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBsYXp5UmVwZWF0ID0gbmV3IExhenlSZXBlYXRWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGxhenlSZXBlYXQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0SGVhZGVyJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC1oZWFkZXInfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdEl0ZW0nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0LWl0ZW0nfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3QnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0J30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RUaXRsZScsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QtdGl0bGUnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWxvYWRpbmctcGxhY2Vob2xkZXJcbiAqIEBjYXRlZ29yeSB1dGlsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXURpc3BsYXkgYSBwbGFjZWhvbGRlciB3aGlsZSB0aGUgY29udGVudCBpcyBsb2FkaW5nLlsvZW5dXG4gKiAgIFtqYV1PbnNlbiBVSeOBjOiqreOBv+i+vOOBvuOCjOOCi+OBvuOBp+OBq+ihqOekuuOBmeOCi+ODl+ODrOODvOOCueODm+ODq+ODgOODvOOCkuihqOePvuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMtbG9hZGluZy1wbGFjZWhvbGRlcj1cInBhZ2UuaHRtbFwiPlxuICogICBMb2FkaW5nLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWxvYWRpbmctcGxhY2Vob2xkZXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgcGFnZSB0byBsb2FkLlsvZW5dXG4gKiAgIFtqYV3oqq3jgb/ovrzjgoDjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMb2FkaW5nUGxhY2Vob2xkZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoYXR0cnMub25zTG9hZGluZ1BsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgb25zLl9yZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyKGVsZW1lbnRbMF0sIGF0dHJzLm9uc0xvYWRpbmdQbGFjZWhvbGRlciwgZnVuY3Rpb24oY29udGVudEVsZW1lbnQsIGRvbmUpIHtcbiAgICAgICAgICAgIG9ucy5jb21waWxlKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNldEltbWVkaWF0ZShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbW9kYWxcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBtb2RhbC5bL2VuXVxuICogICBbamFd44GT44Gu44Oi44O844OA44Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBNb2RhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc01vZGFsJywgZnVuY3Rpb24oJG9uc2VuLCBNb2RhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogKGVsZW1lbnQsIGF0dHJzKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKG1vZGFsLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIG1vZGFsKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMobW9kYWwsICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbW9kYWwnLCBtb2RhbCk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhtb2RhbCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgbW9kYWwgPSBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbmF2aWdhdG9yXG4gKiBAZXhhbXBsZVxuICogPG9ucy1uYXZpZ2F0b3IgYW5pbWF0aW9uPVwic2xpZGVcIiB2YXI9XCJhcHAubmF2aVwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICAgPG9ucy10b29sYmFyPlxuICogICAgICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlRpdGxlPC9kaXY+XG4gKiAgICAgPC9vbnMtdG9vbGJhcj5cbiAqXG4gKiAgICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgIDxvbnMtYnV0dG9uIG1vZGlmaWVyPVwibGlnaHRcIiBuZy1jbGljaz1cImFwcC5uYXZpLnB1c2hQYWdlKCdwYWdlLmh0bWwnKTtcIj5QdXNoPC9vbnMtYnV0dG9uPlxuICogICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLW5hdmlnYXRvcj5cbiAqXG4gKiA8b25zLXRlbXBsYXRlIGlkPVwicGFnZS5odG1sXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8b25zLXRvb2xiYXI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+VGl0bGU8L2Rpdj5cbiAqICAgICA8L29ucy10b29sYmFyPlxuICpcbiAqICAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICAgPG9ucy1idXR0b24gbW9kaWZpZXI9XCJsaWdodFwiIG5nLWNsaWNrPVwiYXBwLm5hdmkucG9wUGFnZSgpO1wiPlBvcDwvb25zLWJ1dHRvbj5cbiAqICAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy10ZW1wbGF0ZT5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG5hdmlnYXRvci5bL2VuXVxuICogIFtqYV3jgZPjga7jg4rjg5PjgrLjg7zjgr/jg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlcHVzaFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlcHVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlcHVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXBvcFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlcG9wXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVwb3BcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0cHVzaFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHB1c2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RwdXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHBvcFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHBvcFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHBvcFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWluaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5lbGVtZW50cy5OYXZpZ2F0b3IucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuZWxlbWVudHMuTmF2aWdhdG9yLnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtbmF2aWdhdG9yJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc05hdmlnYXRvcicsIGZ1bmN0aW9uKE5hdmlnYXRvclZpZXcsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgTmF2aWdhdG9yVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdwcmVwdXNoIHByZXBvcCBwb3N0cHVzaCBwb3N0cG9wIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbmF2aWdhdG9yJywgdmlldyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbmF2aWdhdG9yJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcGFnZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHBhZ2UuWy9lbl1cbiAqICAgW2phXeOBk+OBruODmuODvOOCuOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWluZmluaXRlLXNjcm9sbFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1QYXRoIG9mIHRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiBpbmZpbml0ZSBzY3JvbGxpbmcuIFRoZSBwYXRoIGlzIHJlbGF0aXZlIHRvICRzY29wZS4gVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIGEgZG9uZSBjYWxsYmFjayB0aGF0IG11c3QgYmUgY2FsbGVkIHdoZW4gaXQncyBmaW5pc2hlZC5bL2VuXVxuICogICBbamFdWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb24tZGV2aWNlLWJhY2stYnV0dG9uXG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkLlsvZW5dXG4gKiAgIFtqYV3jg4fjg5DjgqTjgrnjga7jg5Djg4Pjgq/jg5zjgr/jg7PjgYzmirzjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLoqK3lrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1kZXZpY2UtYmFjay1idXR0b25cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2l0aCBhbiBBbmd1bGFySlMgZXhwcmVzc2lvbiB3aGVuIHRoZSBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkLlsvZW5dXG4gKiAgIFtqYV3jg4fjg5DjgqTjgrnjga7jg5Djg4Pjgq/jg5zjgr/jg7PjgYzmirzjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLoqK3lrprjgafjgY3jgb7jgZnjgIJBbmd1bGFySlPjga5leHByZXNzaW9u44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWluaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1BhZ2UnLCBmdW5jdGlvbigkb25zZW4sIFBhZ2VWaWV3KSB7XG5cbiAgICBmdW5jdGlvbiBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgZGlydHkgZml4XG4gICAgICB2YXIgaSA9IDAsIGYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGkrKyA8IDE1KSAge1xuICAgICAgICAgIGlmIChpc0F0dGFjaGVkKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnQsICdpbml0Jyk7XG4gICAgICAgICAgICBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGkgPiAxMCkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBmaXJlIFwicGFnZWluaXRcIiBldmVudC4gQXR0YWNoIFwib25zLXBhZ2VcIiBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBhZnRlciBpbml0aWFsaXphdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50KGVsZW1lbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldmVudC5pbml0RXZlbnQoJ3BhZ2Vpbml0JywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXR0YWNoZWQoZWxlbWVudCkge1xuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgPyBpc0F0dGFjaGVkKGVsZW1lbnQucGFyZW50Tm9kZSkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBuZXcgUGFnZVZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwYWdlLCAnaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgcGFnZSk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocGFnZSwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwYWdlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocGFnZSk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBhZ2UnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGZpcmVQYWdlSW5pdEV2ZW50KGVsZW1lbnRbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wb3BvdmVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBwb3BvdmVyLlsvZW5dXG4gKiAgW2phXeOBk+OBruODneODg+ODl+OCquODvOODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNQb3BvdmVyJywgZnVuY3Rpb24oJG9uc2VuLCBQb3BvdmVyVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgICAgdmFyIHBvcG92ZXIgPSBuZXcgUG9wb3ZlclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBvcG92ZXIpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwb3BvdmVyLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhwb3BvdmVyLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcG9wb3ZlcicsIHBvcG92ZXIpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHBvcG92ZXIuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhwb3BvdmVyKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcG9wb3ZlcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcHVsbC1ob29rXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCkge1xuICogICAgICRzY29wZS5pdGVtcyA9IFszLCAyICwxXTtcbiAqXG4gKiAgICAgJHNjb3BlLmxvYWQgPSBmdW5jdGlvbigkZG9uZSkge1xuICogICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgICRzY29wZS5pdGVtcy51bnNoaWZ0KCRzY29wZS5pdGVtcy5sZW5ndGggKyAxKTtcbiAqICAgICAgICAgJGRvbmUoKTtcbiAqICAgICAgIH0sIDEwMDApO1xuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1wYWdlIG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1wdWxsLWhvb2sgdmFyPVwibG9hZGVyXCIgbmctYWN0aW9uPVwibG9hZCgkZG9uZSlcIj5cbiAqICAgICA8c3BhbiBuZy1zd2l0Y2g9XCJsb2FkZXIuc3RhdGVcIj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiaW5pdGlhbFwiPlB1bGwgZG93biB0byByZWZyZXNoPC9zcGFuPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJwcmVhY3Rpb25cIj5SZWxlYXNlIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cImFjdGlvblwiPkxvYWRpbmcgZGF0YS4gUGxlYXNlIHdhaXQuLi48L3NwYW4+XG4gKiAgICAgPC9zcGFuPlxuICogICA8L29ucy1wdWxsLWhvb2s+XG4gKiAgIDxvbnMtbGlzdD5cbiAqICAgICA8b25zLWxpc3QtaXRlbSBuZy1yZXBlYXQ9XCJpdGVtIGluIGl0ZW1zXCI+XG4gKiAgICAgICBJdGVtICN7eyBpdGVtIH19XG4gKiAgICAgPC9vbnMtbGlzdC1pdGVtPlxuICogICA8L29ucy1saXN0PlxuICogPC9vbnMtcGFnZT5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWFjdGlvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVXNlIHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIHBhZ2UgaXMgcHVsbGVkIGRvd24uIEEgPGNvZGU+JGRvbmU8L2NvZGU+IGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSB0byB0ZWxsIHRoZSBjb21wb25lbnQgdGhhdCB0aGUgYWN0aW9uIGlzIGNvbXBsZXRlZC5bL2VuXVxuICogICBbamFdcHVsbCBkb3du44GX44Gf44Go44GN44Gu5oyv44KL6Iie44GE44KS5oyH5a6a44GX44G+44GZ44CC44Ki44Kv44K344On44Oz44GM5a6M5LqG44GX44Gf5pmC44Gr44GvPGNvZGU+JGRvbmU8L2NvZGU+6Zai5pWw44KS5ZG844Gz5Ye644GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWNoYW5nZXN0YXRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJjaGFuZ2VzdGF0ZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiY2hhbmdlc3RhdGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIFB1bGwgaG9vayBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1B1bGxIb29rJywgZnVuY3Rpb24oJG9uc2VuLCBQdWxsSG9va1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwdWxsSG9vayA9IG5ldyBQdWxsSG9va1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHB1bGxIb29rKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocHVsbEhvb2ssICdjaGFuZ2VzdGF0ZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCBwdWxsSG9vayk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHVsbEhvb2suX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcHVsbC1ob29rJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXJhZGlvXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JhZGlvJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRbMF07XG5cbiAgICAgICAgY29uc3Qgb25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbihzY29wZSwgZWwudmFsdWUpO1xuICAgICAgICAgIGF0dHJzLm5nQ2hhbmdlICYmIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCB2YWx1ZSA9PiBlbC5jaGVja2VkID0gdmFsdWUgPT09IGVsLnZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50Lm9uKCdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBlbCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSYW5nZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIHNldChzY29wZSwgZWxlbWVudFswXS52YWx1ZSk7XG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JpcHBsZScsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXJpcHBsZSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNjb3BlXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGwgY2hpbGQgZWxlbWVudHMgdXNpbmcgdGhlIFwidmFyXCIgYXR0cmlidXRlIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIHNjb3BlIG9mIHRoaXMgZWxlbWVudC5bL2VuXVxuICogICBbamFdXCJ2YXJcIuWxnuaAp+OCkuS9v+OBo+OBpuOBhOOCi+WFqOOBpuOBruWtkOimgee0oOOBrnZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjga/jgIHjgZPjga7opoHntKDjga5Bbmd1bGFySlPjgrnjgrPjg7zjg5fjgavov73liqDjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtbGlzdD5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLXNjb3BlIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICA8b25zLWNhcm91c2VsIHZhcj1cImNhcm91c2VsXCI+XG4gKiAgICAgICA8b25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5uZXh0KClcIj5cbiAqICAgICAgICAge3sgaXRlbSB9fVxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5wcmV2KClcIj5cbiAqICAgICAgICAgLi4uXG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgIDwvb25zLWNhcm91c2VsPlxuICogICA8L29ucy1saXN0LWl0ZW0+XG4gKiA8L29ucy1saXN0PlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTY29wZScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2VhcmNoLWlucHV0XG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NlYXJjaElucHV0JywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRbMF07XG5cbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduKHNjb3BlLCBlbC50eXBlID09PSAnbnVtYmVyJyA/IE51bWJlcihlbC52YWx1ZSkgOiBlbC52YWx1ZSk7XG4gICAgICAgICAgYXR0cnMubmdDaGFuZ2UgJiYgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IGVsLnZhbHVlKSB7XG4gICAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBlbCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNlZ21lbnRcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzZWdtZW50LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgr/jg5bjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NlZ21lbnQnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXNlZ21lbnQnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh2aWV3LCAncG9zdGNoYW5nZScpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2VsZWN0XG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC5kaXJlY3RpdmUoJ29uc1NlbGVjdCcsIGZ1bmN0aW9uICgkcGFyc2UsICRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIHNldChzY29wZSwgZWxlbWVudFswXS52YWx1ZSk7XG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHsgdmlld0tleTogJ29ucy1zZWxlY3QnIH0pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSlcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGVlZC1kaWFsXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoZSBzcGVlZCBkaWFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5Tjg7zjg4njg4DjgqTjgqLjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLjgZfjgabjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwib3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwib3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NwZWVkRGlhbCcsIGZ1bmN0aW9uKCRvbnNlbiwgU3BlZWREaWFsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIHNwZWVkRGlhbCA9IG5ldyBTcGVlZERpYWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGVlZC1kaWFsJywgc3BlZWREaWFsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BlZWREaWFsLCAnb3BlbiBjbG9zZScpO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGVlZERpYWwpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BlZWREaWFsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGVlZC1kaWFsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlci1jb250ZW50XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXR0ZXIgY29udGVudC5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44K/44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLmVsZW1lbnRzLlNwbGl0dGVyQ29udGVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5lbGVtZW50cy5TcGxpdHRlckNvbnRlbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1jb250ZW50JywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyQ29udGVudCcsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlckNvbnRlbnQsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyQ29udGVudChzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB2aWV3KTtcblxuICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItY29udGVudCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItc2lkZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNwbGl0dGVyIHNpZGUuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODl+ODquODg+OCv+ODvOOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlb3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlb3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0b3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdG9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW1vZGVjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm1vZGVjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm1vZGVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLmVsZW1lbnRzLlNwbGl0dGVyU2lkZS5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5lbGVtZW50cy5TcGxpdHRlclNpZGUucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1zaWRlJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyU2lkZScsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlclNpZGUsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyU2lkZShzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3kgcHJlb3BlbiBwcmVjbG9zZSBwb3N0b3BlbiBwb3N0Y2xvc2UgbW9kZWNoYW5nZScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItc2lkZScsIHZpZXcpO1xuXG4gICAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNwbGl0dGVyLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5fjg6rjg4Pjgr/jg7zjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBTcGxpdHRlcihzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwbGl0dGVyKTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwbGl0dGVyLCAnZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCBzcGxpdHRlcik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGxpdHRlci5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXN3aXRjaFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHN3aXRjaC5bL2VuXVxuICogICBbamFdSmF2YVNjcmlwdOOBi+OCieWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1N3aXRjaCcsIGZ1bmN0aW9uKCRvbnNlbiwgU3dpdGNoVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nQ29udHJvbGxlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBlbGVtZW50IGNhblxcJ3QgYWNjZXB0IG5nLWNvbnRyb2xsZXIgZGlyZWN0aXZlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN3aXRjaFZpZXcgPSBuZXcgU3dpdGNoVmlldyhlbGVtZW50LCBzY29wZSwgYXR0cnMpO1xuICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoc3dpdGNoVmlldywgZWxlbWVudCk7XG5cbiAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHN3aXRjaFZpZXcpO1xuICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zd2l0Y2gnLCBzd2l0Y2hWaWV3KTtcblxuICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN3aXRjaFZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHN3aXRjaFZpZXcpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXN3aXRjaCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBlbGVtZW50ID0gYXR0cnMgPSBzY29wZSA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10YWJiYXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0YWIgYmFyLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgr/jg5bjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVhY3RpdmVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlYWN0aXZlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWFjdGl2ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuZWxlbWVudHMuVGFiYmFyLnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLmVsZW1lbnRzLlRhYmJhci5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLXRhYmJhcicsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUYWJiYXInLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCAkcGFyc2UsIFRhYmJhclZpZXcpIHtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIHRhYmJhclZpZXcgPSBuZXcgVGFiYmFyVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGFiYmFyVmlldywgZWxlbWVudCk7XG5cbiAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh0YWJiYXJWaWV3LCAncmVhY3RpdmUgcHJlY2hhbmdlIHBvc3RjaGFuZ2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHRhYmJhclZpZXcpO1xuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdGFiYmFyVmlldyk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRhYmJhclZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRhYmJhclZpZXcpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYicsIHRhYilcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWJiYXJJdGVtJywgdGFiKTsgLy8gZm9yIEJDXG5cbiAgZnVuY3Rpb24gdGFiKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgdmlldyA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtdGFiJ30pO1xuICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUZW1wbGF0ZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBlbGVtZW50WzBdLnRlbXBsYXRlIHx8IGVsZW1lbnQuaHRtbCgpO1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoZWxlbWVudC5hdHRyKCdpZCcpLCBjb250ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b2FzdFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdG9hc3QgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiOODvOOCueODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBUb2FzdCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RvYXN0JywgZnVuY3Rpb24oJG9uc2VuLCBUb2FzdFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdG9hc3QgPSBuZXcgVG9hc3RWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB0b2FzdCk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHRvYXN0LCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0b2FzdCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvYXN0JywgdG9hc3QpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdG9hc3QuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0b2FzdCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvYXN0JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhci1idXR0b25cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBidXR0b24uWy9lbl1cbiAqICAgW2phXeOBk+OBruODnOOCv+ODs+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNUb29sYmFyQnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciB0b29sYmFyQnV0dG9uID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9vbGJhci1idXR0b24nLCB0b29sYmFyQnV0dG9uKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdG9vbGJhckJ1dHRvbik7XG5cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModG9vbGJhckJ1dHRvbiwgZWxlbWVudCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG9vbGJhckJ1dHRvbi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0b29sYmFyQnV0dG9uKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b29sYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0b29sYmFyLlsvZW5dXG4gKiAgW2phXeOBk+OBruODhOODvOODq+ODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVG9vbGJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgZGlydHkgZml4IVxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbMF0ubm9kZU5hbWUgPT09ICdvbnMtdG9vbGJhcicpIHtcbiAgICAgICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy10b29sYmFyJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHNlcnZpY2UgY2xhc3MgZm9yIGZyYW1ld29yayBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCckb25zZW4nLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkd2luZG93LCAkY2FjaGVGYWN0b3J5LCAkZG9jdW1lbnQsICR0ZW1wbGF0ZUNhY2hlLCAkaHR0cCwgJHEsICRjb21waWxlLCAkb25zR2xvYmFsLCBDb21wb25lbnRDbGVhbmVyKSB7XG5cbiAgICB2YXIgJG9uc2VuID0gY3JlYXRlT25zZW5TZXJ2aWNlKCk7XG4gICAgdmFyIE1vZGlmaWVyVXRpbCA9ICRvbnNHbG9iYWwuX2ludGVybmFsLk1vZGlmaWVyVXRpbDtcblxuICAgIHJldHVybiAkb25zZW47XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVPbnNlblNlcnZpY2UoKSB7XG4gICAgICByZXR1cm4ge1xuXG4gICAgICAgIERJUkVDVElWRV9URU1QTEFURV9VUkw6ICd0ZW1wbGF0ZXMnLFxuXG4gICAgICAgIGNsZWFuZXI6IENvbXBvbmVudENsZWFuZXIsXG5cbiAgICAgICAgdXRpbDogJG9uc0dsb2JhbC5fdXRpbCxcblxuICAgICAgICBEZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5faW50ZXJuYWwuZGJiRGlzcGF0Y2hlcixcblxuICAgICAgICBfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyOiAkb25zR2xvYmFsLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldERlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1ldGhvZE5hbWVzXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZGlzcG9zZSBhbGwgZHJpdmluZyBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlTWV0aG9kczogZnVuY3Rpb24odmlldywgZWxlbWVudCwgbWV0aG9kTmFtZXMpIHtcbiAgICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRbbWV0aG9kTmFtZV0uYXBwbHkoZWxlbWVudCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZpZXcgPSBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0NsYXNzfSBrbGFzc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQ6IGZ1bmN0aW9uKGtsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoa2xhc3MucHJvdG90eXBlLCBwcm9wZXJ0eSwge1xuICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXVtwcm9wZXJ0eV0gPSB2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXR1cm4tYXNzaWduXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnROYW1lc1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbbWFwXVxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGNsZWFyIGFsbCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZUV2ZW50czogZnVuY3Rpb24odmlldywgZWxlbWVudCwgZXZlbnROYW1lcywgbWFwKSB7XG4gICAgICAgICAgbWFwID0gbWFwIHx8IGZ1bmN0aW9uKGRldGFpbCkgeyByZXR1cm4gZGV0YWlsOyB9O1xuICAgICAgICAgIGV2ZW50TmFtZXMgPSBbXS5jb25jYXQoZXZlbnROYW1lcyk7XG4gICAgICAgICAgdmFyIGxpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgbWFwKGV2ZW50LmRldGFpbCB8fCB7fSk7XG4gICAgICAgICAgICAgIHZpZXcuZW1pdChldmVudE5hbWUsIGV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJzW2luZGV4XSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IGxpc3RlbmVycyA9IG1hcCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzRW5hYmxlZEF1dG9TdGF0dXNCYXJGaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISEkb25zR2xvYmFsLl9jb25maWcuYXV0b1N0YXR1c0JhckZpbGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRGaWxsU3RhdHVzQmFyOiAkb25zR2xvYmFsLnNob3VsZEZpbGxTdGF0dXNCYXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b1N0YXR1c0JhckZpbGw6ICRvbnNHbG9iYWwuYXV0b1N0YXR1c0JhckZpbGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkaXJlY3RpdmVcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFnZUVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICovXG4gICAgICAgIGNvbXBpbGVBbmRMaW5rOiBmdW5jdGlvbih2aWV3LCBwYWdlRWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgICBjb25zdCBsaW5rID0gJGNvbXBpbGUocGFnZUVsZW1lbnQpO1xuICAgICAgICAgIGNvbnN0IHBhZ2VTY29wZSA9IHZpZXcuX3Njb3BlLiRuZXcoKTtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIE92ZXJ3cml0ZSBwYWdlIHNjb3BlLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChwYWdlRWxlbWVudCkuZGF0YSgnX3Njb3BlJywgcGFnZVNjb3BlKTtcblxuICAgICAgICAgIHBhZ2VTY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2socGFnZUVsZW1lbnQpOyAvLyBBdHRhY2ggYW5kIHByZXBhcmVcbiAgICAgICAgICAgIGxpbmsocGFnZVNjb3BlKTsgLy8gUnVuIHRoZSBjb250cm9sbGVyXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFnZUxvYWRlclxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlUGFnZUxvYWRlcjogZnVuY3Rpb24odmlldykge1xuICAgICAgICAgIHJldHVybiBuZXcgJG9uc0dsb2JhbC5QYWdlTG9hZGVyKFxuICAgICAgICAgICAgKHtwYWdlLCBwYXJlbnR9LCBkb25lKSA9PiB7XG4gICAgICAgICAgICAgICRvbnNHbG9iYWwuX2ludGVybmFsLmdldFBhZ2VIVE1MQXN5bmMocGFnZSkudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBpbGVBbmRMaW5rKFxuICAgICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICAgICRvbnNHbG9iYWwuX3V0aWwuY3JlYXRlRWxlbWVudChodG1sKSxcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPT4gZG9uZShwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuX2Rlc3Ryb3koKTtcbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKCdfc2NvcGUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge1Njb3BlfSBbcGFyYW1zLnNjb3BlXVxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gW3BhcmFtcy5lbGVtZW50XVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zLmVsZW1lbnRzXVxuICAgICAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IFtwYXJhbXMuYXR0cnNdXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhckNvbXBvbmVudDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5zY29wZSkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUocGFyYW1zLnNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmF0dHJzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKHBhcmFtcy5hdHRycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KHBhcmFtcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmaW5kRWxlbWVudGVPYmplY3Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5pbmhlcml0ZWREYXRhKG5hbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UGFnZUhUTUxBc3luYzogZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgIHZhciBjYWNoZSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChwYWdlKTtcblxuICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0eXBlb2YgY2FjaGUgPT09ICdzdHJpbmcnID8gY2FjaGUgOiBjYWNoZVsxXTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5ub3JtYWxpemVQYWdlSFRNTChodG1sKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgIHVybDogcGFnZSxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB2YXIgaHRtbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbm9ybWFsaXplUGFnZUhUTUw6IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBodG1sID0gKCcnICsgaHRtbCkudHJpbSgpO1xuXG4gICAgICAgICAgaWYgKCFodG1sLm1hdGNoKC9ePG9ucy1wYWdlLykpIHtcbiAgICAgICAgICAgIGh0bWwgPSAnPG9ucy1wYWdlIF9tdXRlZD4nICsgaHRtbCArICc8L29ucy1wYWdlPic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBtb2RpZmllciB0ZW1wbGF0ZXIgZnVuY3Rpb24uIFRoZSBtb2RpZmllciB0ZW1wbGF0ZXIgZ2VuZXJhdGUgY3NzIGNsYXNzZXMgYm91bmQgbW9kaWZpZXIgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFttb2RpZmllcnNdIGFuIGFycmF5IG9mIGFwcGVuZGl4IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2VuZXJhdGVNb2RpZmllclRlbXBsYXRlcjogZnVuY3Rpb24oYXR0cnMsIG1vZGlmaWVycykge1xuICAgICAgICAgIHZhciBhdHRyTW9kaWZpZXJzID0gYXR0cnMgJiYgdHlwZW9mIGF0dHJzLm1vZGlmaWVyID09PSAnc3RyaW5nJyA/IGF0dHJzLm1vZGlmaWVyLnRyaW0oKS5zcGxpdCgvICsvKSA6IFtdO1xuICAgICAgICAgIG1vZGlmaWVycyA9IGFuZ3VsYXIuaXNBcnJheShtb2RpZmllcnMpID8gYXR0ck1vZGlmaWVycy5jb25jYXQobW9kaWZpZXJzKSA6IGF0dHJNb2RpZmllcnM7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlIGVnLiAnb25zLWJ1dHRvbi0tKicsICdvbnMtYnV0dG9uLS0qX19pdGVtJ1xuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RpZmllcnMubWFwKGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSkuam9pbignICcpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0IGZvciBjdXN0b20gZWxlbWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgdmFyIHRva2VucyA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpO1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJVdGlsLnNwbGl0KG5lZWRsZSkuc29tZShmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLmluZGV4T2YobmVlZGxlKSAhPSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IHR5cGVvZiBuZWVkbGUgPT09ICdzdHJpbmcnID8gbmVlZGxlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgICAgIHZhciBtb2RpZmllciA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpLmZpbHRlcihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiAhPT0gbmVlZGxlO1xuICAgICAgICAgICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFkZE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgZWxlbWVudC5hdHRyKCdtb2RpZmllcicpICsgJyAnICsgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0TW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzTW9kaWZpZXIobW9kaWZpZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2RdID0gbWV0aG9kc1ttZXRob2RdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1vZGlmaWVyIG1ldGhvZHMgdG8gdmlldyBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kczogZnVuY3Rpb24odmlldywgdGVtcGxhdGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgX3RyID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZm5zID0ge1xuICAgICAgICAgICAgaGFzTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50Lmhhc0NsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuYXR0cignY2xhc3MnKS5zcGxpdCgvXFxzKy8pLFxuICAgICAgICAgICAgICAgICAgcGF0dCA9IHRlbXBsYXRlLnJlcGxhY2UoJyonLCAnLicpO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjbHMgPSBjbGFzc2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNscy5tYXRjaChwYXR0KSkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNscyA9IF90cihtb2RpZmllcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKGNscykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNscyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbihvbGRGbiwgbmV3Rm4pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB8fCBuZXdGbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld0ZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gYXBwZW5kKHZpZXcuaGFzTW9kaWZpZXIsIGZucy5oYXNNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5yZW1vdmVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnJlbW92ZU1vZGlmaWVyLCBmbnMucmVtb3ZlTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcuYWRkTW9kaWZpZXIgPSBhcHBlbmQodmlldy5hZGRNb2RpZmllciwgZm5zLmFkZE1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnNldE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuc2V0TW9kaWZpZXIsIGZucy5zZXRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnRvZ2dsZU1vZGlmaWVyLCBmbnMudG9nZ2xlTW9kaWZpZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbW9kaWZpZXIgbWV0aG9kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gdmlldy5yZW1vdmVNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gdmlldy5zZXRNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LnRvZ2dsZU1vZGlmaWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlIGFzICd2YXInIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZGVjbGFyZVZhckF0dHJpYnV0ZTogZnVuY3Rpb24oYXR0cnMsIG9iamVjdCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXR0cnMudmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHZhck5hbWUgPSBhdHRycy52YXI7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVWYXIodmFyTmFtZSwgb2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlZ2lzdGVyRXZlbnRIYW5kbGVyOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZSkge1xuICAgICAgICAgIHZhciBjYXBpdGFsaXplZEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGV2ZW50TmFtZS5zbGljZSgxKTtcblxuICAgICAgICAgIGNvbXBvbmVudC5vbihldmVudE5hbWUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGNvbXBvbmVudC5fZWxlbWVudFswXSwgZXZlbnROYW1lLCBldmVudCAmJiBldmVudC5kZXRhaWwpO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGNvbXBvbmVudC5fYXR0cnNbJ29ucycgKyBjYXBpdGFsaXplZEV2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsKGhhbmRsZXIsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVycyBmb3IgYXR0cmlidXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBldmVudE5hbWVzID0gZXZlbnROYW1lcy50cmltKCkuc3BsaXQoL1xccysvKTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnROYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudE5hbWVzW2ldO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudEhhbmRsZXIoY29tcG9uZW50LCBldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzQW5kcm9pZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9hbmRyb2lkL2kpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNJT1M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhISR3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlwYWR8aXBob25lfGlwb2QgdG91Y2gpL2kpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNXZWJWaWV3OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJG9uc0dsb2JhbC5pc1dlYlZpZXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzSU9TN2Fib3ZlOiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHVhID0gJHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCB0b3VjaCk7LipDUFUuKk9TIChcXGQrKV8oXFxkKykvaSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzJdICsgJy4nICsgbWF0Y2hbM10pID49IDcgOiBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZSBhIG5hbWVkIGV2ZW50IGZvciBhIGNvbXBvbmVudC4gVGhlIHZpZXcgb2JqZWN0LCBpZiBpdCBleGlzdHMsIGlzIGF0dGFjaGVkIHRvIGV2ZW50LmNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpcmVDb21wb25lbnRFdmVudDogZnVuY3Rpb24oZG9tLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBldmVudFtrZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LmNvbXBvbmVudCA9IGRvbSA/XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9tKS5kYXRhKGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgICBldmVudC5pbml0RXZlbnQoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnOicgKyBldmVudE5hbWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZG9tLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vJywgJ2Zvby12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vIGFuZCAkc2NvcGUuZm9vIGlzIG5vdyAnZm9vLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vLmJhcicsICdmb28tYmFyLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28uYmFyIGFuZCAkc2NvcGUuZm9vLmJhciBpcyBub3cgJ2Zvby1iYXItdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZpbmVWYXI6IGZ1bmN0aW9uKG5hbWUsIG9iamVjdCkge1xuICAgICAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoL1xcLi8pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0KGNvbnRhaW5lciwgbmFtZXMsIG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZV0gPT09IHVuZGVmaW5lZCB8fCBjb250YWluZXJbbmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJbbmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dICE9PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHZhcj1cIicgKyBvYmplY3QuX2F0dHJzLnZhciArICdcIiBiZWNhdXNlIGl0IHdpbGwgb3ZlcndyaXRlIGEgcmVhZC1vbmx5IHZhcmlhYmxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvbnMuY29tcG9uZW50QmFzZSkge1xuICAgICAgICAgICAgc2V0KG9ucy5jb21wb25lbnRCYXNlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZ2V0U2NvcGUgPSBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChlbCkuZGF0YSgnX3Njb3BlJyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBlbGVtZW50ID0gb2JqZWN0Ll9lbGVtZW50WzBdO1xuXG4gICAgICAgICAgLy8gQ3VycmVudCBlbGVtZW50IG1pZ2h0IG5vdCBoYXZlIGRhdGEoJ19zY29wZScpXG4gICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdvbnMtc2NvcGUnKSkge1xuICAgICAgICAgICAgc2V0KGdldFNjb3BlKGVsZW1lbnQpIHx8IG9iamVjdC5fc2NvcGUsIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQW5jZXN0b3JzXG4gICAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnb25zLXNjb3BlJykpIHtcbiAgICAgICAgICAgICAgc2V0KGdldFNjb3BlKGVsZW1lbnQpLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgIC8vIElmIG5vIG9ucy1zY29wZSBlbGVtZW50IHdhcyBmb3VuZCwgYXR0YWNoIHRvICRyb290U2NvcGUuXG4gICAgICAgICAgc2V0KCRyb290U2NvcGUsIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICB2YXIgQ29tcG9uZW50Q2xlYW5lciA9IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqL1xuICAgIGRlY29tcG9zZU5vZGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW1lbnQucmVtb3ZlKCkuY2hpbGRyZW4oKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZWNvbXBvc2VOb2RlKGFuZ3VsYXIuZWxlbWVudChjaGlsZHJlbltpXSkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IGF0dHJzXG4gICAgICovXG4gICAgZGVzdHJveUF0dHJpYnV0ZXM6IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgICBhdHRycy4kJGVsZW1lbnQgPSBudWxsO1xuICAgICAgYXR0cnMuJCRvYnNlcnZlcnMgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqL1xuICAgIGRlc3Ryb3lFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Njb3BlfSBzY29wZVxuICAgICAqL1xuICAgIGRlc3Ryb3lTY29wZTogZnVuY3Rpb24oc2NvcGUpIHtcbiAgICAgIHNjb3BlLiQkbGlzdGVuZXJzID0ge307XG4gICAgICBzY29wZS4kJHdhdGNoZXJzID0gbnVsbDtcbiAgICAgIHNjb3BlID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqL1xuICAgIG9uRGVzdHJveTogZnVuY3Rpb24oc2NvcGUsIGZuKSB7XG4gICAgICB2YXIgY2xlYXIgPSBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyKCk7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0NvbXBvbmVudENsZWFuZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQ29tcG9uZW50Q2xlYW5lcjtcbiAgfSk7XG5cbiAgLy8gb3ZlcnJpZGUgYnVpbHRpbiBuZy0oZXZlbnRuYW1lKSBkaXJlY3RpdmVzXG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgbmdFdmVudERpcmVjdGl2ZXMgPSB7fTtcbiAgICAnY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlbW92ZSBtb3VzZWVudGVyIG1vdXNlbGVhdmUga2V5ZG93biBrZXl1cCBrZXlwcmVzcyBzdWJtaXQgZm9jdXMgYmx1ciBjb3B5IGN1dCBwYXN0ZScuc3BsaXQoJyAnKS5mb3JFYWNoKFxuICAgICAgZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlTmFtZSA9IGRpcmVjdGl2ZU5vcm1hbGl6ZSgnbmctJyArIG5hbWUpO1xuICAgICAgICBuZ0V2ZW50RGlyZWN0aXZlc1tkaXJlY3RpdmVOYW1lXSA9IFsnJHBhcnNlJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKCRlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgICAgIHZhciBmbiA9ICRwYXJzZShhdHRyW2RpcmVjdGl2ZU5hbWVdKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm4oc2NvcGUsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGVsZW1lbnQub24obmFtZSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgIHNjb3BlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhhdHRyKTtcbiAgICAgICAgICAgICAgICAgIGF0dHIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1dO1xuXG4gICAgICAgIGZ1bmN0aW9uIGRpcmVjdGl2ZU5vcm1hbGl6ZShuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24obWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgbW9kdWxlLmNvbmZpZyhmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgdmFyIHNoaWZ0ID0gZnVuY3Rpb24oJGRlbGVnYXRlKSB7XG4gICAgICAgICRkZWxlZ2F0ZS5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gJGRlbGVnYXRlO1xuICAgICAgfTtcbiAgICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKGRpcmVjdGl2ZU5hbWUgKyAnRGlyZWN0aXZlJywgWyckZGVsZWdhdGUnLCBzaGlmdF0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMobmdFdmVudERpcmVjdGl2ZXMpLmZvckVhY2goZnVuY3Rpb24oZGlyZWN0aXZlTmFtZSkge1xuICAgICAgbW9kdWxlLmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBuZ0V2ZW50RGlyZWN0aXZlc1tkaXJlY3RpdmVOYW1lXSk7XG4gICAgfSk7XG4gIH0pKCk7XG59KSgpO1xuIiwiLy8gY29uZmlybSB0byB1c2UganFMaXRlXG5pZiAod2luZG93LmpRdWVyeSAmJiBhbmd1bGFyLmVsZW1lbnQgPT09IHdpbmRvdy5qUXVlcnkpIHtcbiAgY29uc29sZS53YXJuKCdPbnNlbiBVSSByZXF1aXJlIGpxTGl0ZS4gTG9hZCBqUXVlcnkgYWZ0ZXIgbG9hZGluZyBBbmd1bGFySlMgdG8gZml4IHRoaXMgZXJyb3IuIGpRdWVyeSBtYXkgYnJlYWsgT25zZW4gVUkgYmVoYXZpb3IuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxufVxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuT2JqZWN0LmtleXMob25zLm5vdGlmaWNhdGlvbikuZmlsdGVyKG5hbWUgPT4gIS9eXy8udGVzdChuYW1lKSkuZm9yRWFjaChuYW1lID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxOb3RpZmljYXRpb24gPSBvbnMubm90aWZpY2F0aW9uW25hbWVdO1xuXG4gIG9ucy5ub3RpZmljYXRpb25bbmFtZV0gPSAobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnID8gKG9wdGlvbnMubWVzc2FnZSA9IG1lc3NhZ2UpIDogKG9wdGlvbnMgPSBtZXNzYWdlKTtcblxuICAgIGNvbnN0IGNvbXBpbGUgPSBvcHRpb25zLmNvbXBpbGU7XG4gICAgbGV0ICRlbGVtZW50O1xuXG4gICAgb3B0aW9ucy5jb21waWxlID0gZWxlbWVudCA9PiB7XG4gICAgICAkZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjb21waWxlID8gY29tcGlsZShlbGVtZW50KSA6IGVsZW1lbnQpO1xuICAgICAgcmV0dXJuIG9ucy4kY29tcGlsZSgkZWxlbWVudCkoJGVsZW1lbnQuaW5qZWN0b3IoKS5nZXQoJyRyb290U2NvcGUnKSk7XG4gICAgfTtcblxuICAgIG9wdGlvbnMuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICRlbGVtZW50LmRhdGEoJ19zY29wZScpLiRkZXN0cm95KCk7XG4gICAgICAkZWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiBvcmlnaW5hbE5vdGlmaWNhdGlvbihvcHRpb25zKTtcbiAgfTtcbn0pO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICB2YXIgdGVtcGxhdGVzID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9vbnMtdGVtcGxhdGVcIl0nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGVzW2ldKTtcbiAgICAgIHZhciBpZCA9IHRlbXBsYXRlLmF0dHIoJ2lkJyk7XG4gICAgICBpZiAodHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoaWQsIHRlbXBsYXRlLnRleHQoKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxufSkoKTtcbiJdLCJuYW1lcyI6WyJmblRlc3QiLCJ0ZXN0IiwieHl6IiwiQmFzZUNsYXNzIiwiZXh0ZW5kIiwicHJvcHMiLCJfc3VwZXIiLCJwcm90b3R5cGUiLCJwcm90byIsIk9iamVjdCIsImNyZWF0ZSIsIm5hbWUiLCJmbiIsInRtcCIsInJldCIsImFwcGx5IiwiYXJndW1lbnRzIiwibmV3Q2xhc3MiLCJpbml0IiwiaGFzT3duUHJvcGVydHkiLCJTdWJDbGFzcyIsIkVtcHR5Q2xhc3MiLCJjb25zdHJ1Y3RvciIsIndpbmRvdyIsIkNsYXNzIiwib25zIiwibW9kdWxlIiwiYW5ndWxhciIsImluaXRPbnNlbkZhY2FkZSIsIndhaXRPbnNlblVJTG9hZCIsImluaXRBbmd1bGFyTW9kdWxlIiwiaW5pdFRlbXBsYXRlQ2FjaGUiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCJydW4iLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwidmFsdWUiLCIkb25zZW4iLCIkcSIsIl9vbnNlblNlcnZpY2UiLCJfcVNlcnZpY2UiLCJjb25zb2xlIiwiYWxlcnQiLCIkdGVtcGxhdGVDYWNoZSIsIl9pbnRlcm5hbCIsImdldFRlbXBsYXRlSFRNTEFzeW5jIiwicGFnZSIsImNhY2hlIiwiZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb21wb25lbnRCYXNlIiwiYm9vdHN0cmFwIiwiZGVwcyIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJjb25jYXQiLCJkb2MiLCJkb2N1bWVudEVsZW1lbnQiLCJmaW5kUGFyZW50Q29tcG9uZW50VW50aWwiLCJkb20iLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJ0YXJnZXQiLCJpbmhlcml0ZWREYXRhIiwiZmluZENvbXBvbmVudCIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsImRhdGEiLCJub2RlTmFtZSIsInRvTG93ZXJDYXNlIiwiY29tcGlsZSIsInNjb3BlIiwiX2dldE9uc2VuU2VydmljZSIsIl93YWl0RGlyZXRpdmVJbml0IiwiZWxlbWVudE5hbWUiLCJsYXN0UmVhZHkiLCJjYWxsYmFjayIsImxpc3RlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjcmVhdGVFbGVtZW50T3JpZ2luYWwiLCJ0ZW1wbGF0ZSIsIm9wdGlvbnMiLCJsaW5rIiwicGFyZW50U2NvcGUiLCIkbmV3IiwiJGV2YWxBc3luYyIsImdldFNjb3BlIiwiZSIsInRhZ05hbWUiLCJyZXN1bHQiLCJhcHBlbmQiLCJ0aGVuIiwicmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlck9yaWdpbmFsIiwicmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlciIsInJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJyZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyT3JpZ2luYWwiLCJkb25lIiwic2V0SW1tZWRpYXRlIiwiX3NldHVwTG9hZGluZ1BsYWNlSG9sZGVycyIsImZhY3RvcnkiLCJBY3Rpb25TaGVldFZpZXciLCJhdHRycyIsIl9zY29wZSIsIl9lbGVtZW50IiwiX2F0dHJzIiwiX2NsZWFyRGVyaXZpbmdNZXRob2RzIiwiZGVyaXZlTWV0aG9kcyIsIl9jbGVhckRlcml2aW5nRXZlbnRzIiwiZGVyaXZlRXZlbnRzIiwiZGV0YWlsIiwiYWN0aW9uU2hlZXQiLCJiaW5kIiwiX2Rlc3Ryb3kiLCJlbWl0IiwicmVtb3ZlIiwiTWljcm9FdmVudCIsIm1peGluIiwiZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50IiwiQWxlcnREaWFsb2dWaWV3IiwiYWxlcnREaWFsb2ciLCJDYXJvdXNlbFZpZXciLCJjYXJvdXNlbCIsIkRpYWxvZ1ZpZXciLCJkaWFsb2ciLCJGYWJWaWV3IiwiR2VuZXJpY1ZpZXciLCJzZWxmIiwiZGlyZWN0aXZlT25seSIsIm1vZGlmaWVyVGVtcGxhdGUiLCJhZGRNb2RpZmllck1ldGhvZHMiLCJhZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyIsImNsZWFuZXIiLCJvbkRlc3Ryb3kiLCJfZXZlbnRzIiwicmVtb3ZlTW9kaWZpZXJNZXRob2RzIiwiY2xlYXJDb21wb25lbnQiLCJyZWdpc3RlciIsInZpZXciLCJ2aWV3S2V5IiwiZGVjbGFyZVZhckF0dHJpYnV0ZSIsImRlc3Ryb3kiLCJub29wIiwiZGlyZWN0aXZlQXR0cmlidXRlcyIsIkFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUiLCJ1c2VyRGVsZWdhdGUiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJfcGFyZW50U2NvcGUiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ciIsIl9saW5rZXIiLCJjbG9uZU5vZGUiLCJpdGVtIiwiX3VzZXJEZWxlZ2F0ZSIsImNvbmZpZ3VyZUl0ZW1TY29wZSIsIkZ1bmN0aW9uIiwiZGVzdHJveUl0ZW1TY29wZSIsImNyZWF0ZUl0ZW1Db250ZW50IiwiaW5kZXgiLCJfcHJlcGFyZUl0ZW1FbGVtZW50IiwiX2FkZFNwZWNpYWxQcm9wZXJ0aWVzIiwiX3VzaW5nQmluZGluZyIsImNsb25lZCIsImkiLCJsYXN0IiwiY291bnRJdGVtcyIsIiRpbmRleCIsIiRmaXJzdCIsIiRsYXN0IiwiJG1pZGRsZSIsIiRldmVuIiwiJG9kZCIsIiRkZXN0cm95IiwiTGF6eVJlcGVhdERlbGVnYXRlIiwiTGF6eVJlcGVhdFZpZXciLCJsaW5rZXIiLCIkZXZhbCIsIm9uc0xhenlSZXBlYXQiLCJpbnRlcm5hbERlbGVnYXRlIiwiX3Byb3ZpZGVyIiwiTGF6eVJlcGVhdFByb3ZpZGVyIiwicGFyZW50Tm9kZSIsInJlZnJlc2giLCIkd2F0Y2giLCJfb25DaGFuZ2UiLCIkcGFyc2UiLCJNb2RhbFZpZXciLCJtb2RhbCIsIk5hdmlnYXRvclZpZXciLCJfcHJldmlvdXNQYWdlU2NvcGUiLCJfYm91bmRPblByZXBvcCIsIl9vblByZXBvcCIsIm9uIiwibmF2aWdhdG9yIiwiZXZlbnQiLCJwYWdlcyIsImxlbmd0aCIsIm9mZiIsIlBhZ2VWaWV3IiwiX2NsZWFyTGlzdGVuZXIiLCJkZWZpbmVQcm9wZXJ0eSIsIm9uRGV2aWNlQmFja0J1dHRvbiIsInNldCIsIl91c2VyQmFja0J1dHRvbkhhbmRsZXIiLCJfZW5hYmxlQmFja0J1dHRvbkhhbmRsZXIiLCJuZ0RldmljZUJhY2tCdXR0b24iLCJuZ0luZmluaXRlU2Nyb2xsIiwib25JbmZpbml0ZVNjcm9sbCIsIl9vbkRldmljZUJhY2tCdXR0b24iLCIkZXZlbnQiLCJsYXN0RXZlbnQiLCJQb3BvdmVyVmlldyIsInBvcG92ZXIiLCJQdWxsSG9va1ZpZXciLCJwdWxsSG9vayIsIm9uQWN0aW9uIiwibmdBY3Rpb24iLCIkZG9uZSIsIlNwZWVkRGlhbFZpZXciLCJTcGxpdHRlckNvbnRlbnQiLCJsb2FkIiwiX3BhZ2VTY29wZSIsIlNwbGl0dGVyU2lkZSIsInNpZGUiLCJTcGxpdHRlciIsInByb3AiLCJTd2l0Y2hWaWV3IiwiX2NoZWNrYm94IiwiX3ByZXBhcmVOZ01vZGVsIiwibmdNb2RlbCIsImFzc2lnbiIsIiRwYXJlbnQiLCJjaGVja2VkIiwibmdDaGFuZ2UiLCJUYWJiYXJWaWV3IiwiVG9hc3RWaWV3IiwidG9hc3QiLCJkaXJlY3RpdmUiLCJyZXN0cmljdCIsImZpcmVDb21wb25lbnRFdmVudCIsInJlcGxhY2UiLCJ0cmFuc2NsdWRlIiwicHJlIiwicmVnaXN0ZXJFdmVudEhhbmRsZXJzIiwicG9zdCIsIkNvbXBvbmVudENsZWFuZXIiLCJjb250cm9sbGVyIiwiYmFja0J1dHRvbiIsIm5nQ2xpY2siLCJvbkNsaWNrIiwiZGVzdHJveVNjb3BlIiwiZGVzdHJveUF0dHJpYnV0ZXMiLCJidXR0b24iLCJkaXNhYmxlZCIsInV0aWwiLCJmaW5kUGFyZW50IiwiX3N3aXBlciIsInN3aXBlYWJsZSIsImhhc0F0dHJpYnV0ZSIsImF1dG9SZWZyZXNoIiwiZWwiLCJvbkNoYW5nZSIsImlzUmVhZHkiLCIkYnJvYWRjYXN0IiwiZmFiIiwiRVZFTlRTIiwic3BsaXQiLCJzY29wZURlZiIsInJlZHVjZSIsImRpY3QiLCJ0aXRsaXplIiwic3RyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsIl8iLCJoYW5kbGVyIiwidHlwZSIsImdlc3R1cmVEZXRlY3RvciIsIl9nZXN0dXJlRGV0ZWN0b3IiLCJqb2luIiwiaWNvbiIsImluZGV4T2YiLCIkb2JzZXJ2ZSIsIl91cGRhdGUiLCIkb25zR2xvYmFsIiwiY3NzIiwidXBkYXRlIiwib3JpZW50YXRpb24iLCJ1c2VyT3JpZW50YXRpb24iLCJvbnNJZk9yaWVudGF0aW9uIiwiZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCIsImlzUG9ydHJhaXQiLCJwbGF0Zm9ybSIsImdldFBsYXRmb3JtU3RyaW5nIiwidXNlclBsYXRmb3JtIiwidXNlclBsYXRmb3JtcyIsIm9uc0lmUGxhdGZvcm0iLCJ0cmltIiwidXNlckFnZW50IiwibWF0Y2giLCJpc09wZXJhIiwib3BlcmEiLCJpc0ZpcmVmb3giLCJJbnN0YWxsVHJpZ2dlciIsImlzU2FmYXJpIiwidG9TdHJpbmciLCJjYWxsIiwiaXNFZGdlIiwiaXNDaHJvbWUiLCJjaHJvbWUiLCJpc0lFIiwiZG9jdW1lbnRNb2RlIiwib25JbnB1dCIsIk51bWJlciIsImNvbXBpbGVGdW5jdGlvbiIsInNob3ciLCJkaXNwU2hvdyIsImRpc3BIaWRlIiwib25TaG93Iiwib25IaWRlIiwib25Jbml0IiwidmlzaWJsZSIsInNvZnR3YXJlS2V5Ym9hcmQiLCJfdmlzaWJsZSIsInByaW9yaXR5IiwidGVybWluYWwiLCJsYXp5UmVwZWF0Iiwib25zTG9hZGluZ1BsYWNlaG9sZGVyIiwiX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJjb250ZW50RWxlbWVudCIsImVsZW1lbnRzIiwiTmF2aWdhdG9yIiwicmV3cml0YWJsZXMiLCJyZWFkeSIsInBhZ2VMb2FkZXIiLCJjcmVhdGVQYWdlTG9hZGVyIiwiZmlyZVBhZ2VJbml0RXZlbnQiLCJmIiwiaXNBdHRhY2hlZCIsImZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50Iiwic2V0VGltZW91dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInBvc3RMaW5rIiwic3BlZWREaWFsIiwic3BsaXR0ZXIiLCJuZ0NvbnRyb2xsZXIiLCJzd2l0Y2hWaWV3IiwiVGFiYmFyIiwidGFiYmFyVmlldyIsInRhYiIsImNvbnRlbnQiLCJodG1sIiwicHV0IiwidG9vbGJhckJ1dHRvbiIsIiR3aW5kb3ciLCIkY2FjaGVGYWN0b3J5IiwiJGRvY3VtZW50IiwiJGh0dHAiLCJjcmVhdGVPbnNlblNlcnZpY2UiLCJNb2RpZmllclV0aWwiLCJESVJFQ1RJVkVfVEVNUExBVEVfVVJMIiwiX3V0aWwiLCJEZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsImRiYkRpc3BhdGNoZXIiLCJfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiZ2V0RGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwibWV0aG9kTmFtZXMiLCJtZXRob2ROYW1lIiwia2xhc3MiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHkiLCJldmVudE5hbWVzIiwibWFwIiwibGlzdGVuZXJzIiwiZXZlbnROYW1lIiwibGlzdGVuZXIiLCJwdXNoIiwiaXNFbmFibGVkQXV0b1N0YXR1c0JhckZpbGwiLCJfY29uZmlnIiwiYXV0b1N0YXR1c0JhckZpbGwiLCJzaG91bGRGaWxsU3RhdHVzQmFyIiwiY29tcGlsZUFuZExpbmsiLCJwYWdlRWxlbWVudCIsInBhZ2VTY29wZSIsIlBhZ2VMb2FkZXIiLCJwYXJlbnQiLCJnZXRQYWdlSFRNTEFzeW5jIiwicGFyYW1zIiwiZGVzdHJveUVsZW1lbnQiLCJmaW5kRWxlbWVudGVPYmplY3QiLCJkZWZlcnJlZCIsImRlZmVyIiwibm9ybWFsaXplUGFnZUhUTUwiLCJwcm9taXNlIiwidXJsIiwibWV0aG9kIiwicmVzcG9uc2UiLCJnZW5lcmF0ZU1vZGlmaWVyVGVtcGxhdGVyIiwibW9kaWZpZXJzIiwiYXR0ck1vZGlmaWVycyIsIm1vZGlmaWVyIiwibWV0aG9kcyIsImhhc01vZGlmaWVyIiwibmVlZGxlIiwidG9rZW5zIiwic29tZSIsInJlbW92ZU1vZGlmaWVyIiwiZmlsdGVyIiwidG9rZW4iLCJhZGRNb2RpZmllciIsInNldE1vZGlmaWVyIiwidG9nZ2xlTW9kaWZpZXIiLCJfdHIiLCJmbnMiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjbGFzc2VzIiwicGF0dCIsImNscyIsIm9sZEZuIiwibmV3Rm4iLCJvYmplY3QiLCJ2YXIiLCJ2YXJOYW1lIiwiX2RlZmluZVZhciIsIl9yZWdpc3RlckV2ZW50SGFuZGxlciIsImNvbXBvbmVudCIsImNhcGl0YWxpemVkRXZlbnROYW1lIiwibCIsImlzQW5kcm9pZCIsImlzSU9TIiwiaXNXZWJWaWV3IiwiaXNJT1M3YWJvdmUiLCJ1YSIsInBhcnNlRmxvYXQiLCJrZXkiLCJuYW1lcyIsImNvbnRhaW5lciIsInBhcmVudEVsZW1lbnQiLCJkZWNvbXBvc2VOb2RlIiwiY2hpbGRyZW4iLCIkJGVsZW1lbnQiLCIkJG9ic2VydmVycyIsIiQkbGlzdGVuZXJzIiwiJCR3YXRjaGVycyIsImNsZWFyIiwibmdFdmVudERpcmVjdGl2ZXMiLCJkaXJlY3RpdmVOYW1lIiwiZGlyZWN0aXZlTm9ybWFsaXplIiwiJGVsZW1lbnQiLCIkYXBwbHkiLCJtYXRjaGVzIiwiY29uZmlnIiwiJHByb3ZpZGUiLCJzaGlmdCIsIiRkZWxlZ2F0ZSIsImtleXMiLCJkZWNvcmF0b3IiLCJqUXVlcnkiLCJ3YXJuIiwibm90aWZpY2F0aW9uIiwib3JpZ2luYWxOb3RpZmljYXRpb24iLCJtZXNzYWdlIiwiaW5qZWN0b3IiLCJ0ZW1wbGF0ZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWQiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztFQUFBOzs7OztFQUtBLENBQUMsWUFBVztBQUNWO0VBQ0EsTUFBSUEsU0FBUyxNQUFNQyxJQUFOLENBQVcsWUFBVTtBQUFDQyxFQUFLLEdBQTNCLElBQStCLFlBQS9CLEdBQThDLElBQTNEOztFQUVBO0VBQ0EsV0FBU0MsU0FBVCxHQUFvQjs7RUFFcEI7RUFDQUEsWUFBVUMsTUFBVixHQUFtQixVQUFTQyxLQUFULEVBQWdCO0VBQ2pDLFFBQUlDLFNBQVMsS0FBS0MsU0FBbEI7O0VBRUE7RUFDQTtFQUNBLFFBQUlDLFFBQVFDLE9BQU9DLE1BQVAsQ0FBY0osTUFBZCxDQUFaOztFQUVBO0VBQ0EsU0FBSyxJQUFJSyxJQUFULElBQWlCTixLQUFqQixFQUF3QjtFQUN0QjtFQUNBRyxZQUFNRyxJQUFOLElBQWMsT0FBT04sTUFBTU0sSUFBTixDQUFQLEtBQXVCLFVBQXZCLElBQ1osT0FBT0wsT0FBT0ssSUFBUCxDQUFQLElBQXVCLFVBRFgsSUFDeUJYLE9BQU9DLElBQVAsQ0FBWUksTUFBTU0sSUFBTixDQUFaLENBRHpCLEdBRVQsVUFBU0EsSUFBVCxFQUFlQyxFQUFmLEVBQWtCO0VBQ2pCLGVBQU8sWUFBVztFQUNoQixjQUFJQyxNQUFNLEtBQUtQLE1BQWY7O0VBRUE7RUFDQTtFQUNBLGVBQUtBLE1BQUwsR0FBY0EsT0FBT0ssSUFBUCxDQUFkOztFQUVBO0VBQ0E7RUFDQSxjQUFJRyxNQUFNRixHQUFHRyxLQUFILENBQVMsSUFBVCxFQUFlQyxTQUFmLENBQVY7RUFDQSxlQUFLVixNQUFMLEdBQWNPLEdBQWQ7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
