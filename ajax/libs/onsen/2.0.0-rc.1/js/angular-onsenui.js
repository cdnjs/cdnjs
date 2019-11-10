/*! angular-onsenui.js for onsenui - v2.0.0-rc.1 - 2016-04-28 */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
  var initializing = false,
      fnTest = /xyz/.test(function () {
    xyz;
  }) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function () {};

  // Create a new Class that inherits from this class
  Class.extend = function (prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function (name, fn) {
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
      })(name, prop[name]) : prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init) this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();
//HEAD
(function (app) {
    try {
        app = angular.module("templates-main");
    } catch (err) {
        app = angular.module("templates-main", []);
    }
    app.run(["$templateCache", function ($templateCache) {
        "use strict";

        $templateCache.put("templates/sliding_menu.tpl", "<div class=\"onsen-sliding-menu__menu ons-sliding-menu-inner\"></div>\n" + "<div class=\"onsen-sliding-menu__main ons-sliding-menu-inner\"></div>\n" + "");

        $templateCache.put("templates/split_view.tpl", "<div class=\"onsen-split-view__secondary full-screen ons-split-view-inner\"></div>\n" + "<div class=\"onsen-split-view__main full-screen ons-split-view-inner\"></div>\n" + "");
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

/**
 * @object ons
 * @description
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。このオブジェクトは、AngularJSのスコープから参照することができます。 [/ja]
 *   [en]A global object that's used in Onsen UI. This object can be reached from the AngularJS scope.[/en]
 */

(function (ons) {
  'use strict';

  var module = angular.module('onsen', ['templates-main']);
  angular.module('onsen.directives', ['onsen']); // for BC

  // JS Global facade for Onsen UI.
  initOnsenFacade();
  waitOnsenUILoad();
  initAngularModule();

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
     *   [en]Create a alert dialog instance from a template.[/en]
     *   [ja]テンプレートからアラートダイアログのインスタンスを生成します。[/ja]
     */
    ons.createAlertDialog = function (page, options) {
      options = options || {};

      options.link = function (element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createAlertDialogOriginal(page, options).then(function (alertDialog) {
        return angular.element(alertDialog).data('ons-alert-dialog');
      });
    };

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
     *   [en]Create a dialog instance from a template.[/en]
     *   [ja]テンプレートからダイアログのインスタンスを生成します。[/ja]
     */
    ons.createDialog = function (page, options) {
      options = options || {};

      options.link = function (element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createDialogOriginal(page, options).then(function (dialog) {
        return angular.element(dialog).data('ons-dialog');
      });
    };

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
     *   [en]Create a popover instance from a template.[/en]
     *   [ja]テンプレートからポップオーバーのインスタンスを生成します。[/ja]
     */
    ons.createPopover = function (page, options) {
      options = options || {};

      options.link = function (element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createPopoverOriginal(page, options).then(function (popover) {
        return angular.element(popover).data('ons-popover');
      });
    };

    /**
     * @param {String} page
     */
    ons.resolveLoadingPlaceholder = function (page) {
      return ons._resolveLoadingPlaceholderOriginal(page, function (element, done) {
        ons.compile(element);
        angular.element(element).scope().$evalAsync(function () {
          setImmediate(done);
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

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide', 'cancel'], (function (detail) {
          if (detail.alertDialog) {
            detail.alertDialog = this;
          }
          return detail;
        }).bind(this));

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

angular.module('onsen').value('AlertDialogAnimator', ons._internal.AlertDialogAnimator).value('AndroidAlertDialogAnimator', ons._internal.AndroidAlertDialogAnimator).value('IOSAlertDialogAnimator', ons._internal.IOSAlertDialogAnimator);
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

angular.module('onsen').value('AnimationChooser', ons._internal.AnimatorFactory);
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

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['refresh', 'postchange', 'overscroll'], (function (detail) {
          if (detail.carousel) {
            detail.carousel = this;
          }
          return detail;
        }).bind(this));
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

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide', 'cancel'], (function (detail) {
          if (detail.dialog) {
            detail.dialog = this;
          }
          return detail;
        }).bind(this));

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

    DialogView.registerAnimator = function (name, Animator) {
      return window.OnsDialogElement.registerAnimator(name, Animator);
    };

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

angular.module('onsen').value('DialogAnimator', ons._internal.DialogAnimator).value('IOSDialogAnimator', ons._internal.IOSDialogAnimator).value('AndroidDialogAnimator', ons._internal.AndroidDialogAnimator).value('SlideDialogAnimator', ons._internal.SlideDialogAnimator);
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

        ons._util.updateParentPosition(element[0]);

        var userDelegate = this._scope.$eval(this._attrs.onsLazyRepeat);
        var internalDelegate = new AngularLazyRepeatDelegate(userDelegate, element[0], element.scope());

        this._provider = new ons._internal.LazyRepeatProvider(element[0].parentNode, internalDelegate);
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
    var scheme = {
      configureItemScope: { type: 'function', safeCall: true },
      destroyItemScope: { type: 'function', safeCall: true }
    };

    var AngularLazyRepeatDelegate = (function (_ons$_internal$LazyRe) {
      babelHelpers.inherits(AngularLazyRepeatDelegate, _ons$_internal$LazyRe);

      /**
       * @param {Object} userDelegate
       * @param {Element} templateElement
       * @param {Scope} parentScope
       */

      function AngularLazyRepeatDelegate(userDelegate, templateElement, parentScope) {
        babelHelpers.classCallCheck(this, AngularLazyRepeatDelegate);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AngularLazyRepeatDelegate).call(this, userDelegate, templateElement));

        _this._parentScope = parentScope;

        directiveAttributes.forEach(function (attr) {
          return templateElement.removeAttribute(attr);
        });
        _this._linker = $compile(templateElement ? templateElement.cloneNode(true) : null);
        return _this;
      }

      babelHelpers.createClass(AngularLazyRepeatDelegate, [{
        key: 'configureItemScope',
        value: function configureItemScope(item, scope) {
          return this._validated('configureItemScope', scheme)(item, scope);
        }
      }, {
        key: 'destroyItemScope',
        value: function destroyItemScope(item, element) {
          return this._validated('destroyItemScope', scheme)(item, element);
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
        key: 'prepareItem',
        value: function prepareItem(index, done) {
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
            babelHelpers.get(Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'updateItem', this).call(this, index, item);
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
            babelHelpers.get(Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'destroyItem', this).call(this, index, item.element);
          }
          item.scope.$destroy();
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          babelHelpers.get(Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'destroy', this).call(this);
          this._scope = null;
        }
      }]);
      return AngularLazyRepeatDelegate;
    })(ons._internal.LazyRepeatDelegate);

    return AngularLazyRepeatDelegate;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  module.value('ModalAnimator', ons._internal.ModalAnimator);
  module.value('FadeModalAnimator', ons._internal.FadeModalAnimator);

  module.factory('ModalView', ['$onsen', '$parse', function ($onsen, $parse) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._scope.$on('$destroy', this._destroy.bind(this));

        element[0]._animatorFactory.setAnimationOptions($parse(attrs.animationOptions)());
      },

      show: function show(options) {
        return this._element[0].show(options);
      },

      hide: function hide(options) {
        return this._element[0].hide(options);
      },

      toggle: function toggle(options) {
        return this._element[0].toggle(options);
      },

      _destroy: function _destroy() {
        this.emit('destroy', { page: this });

        this._events = this._element = this._scope = null;
      }
    });

    ModalView.registerAnimator = function (name, Animator) {
      return window.OnsModalElement.registerAnimator(name, Animator);
    };

    MicroEvent.mixin(ModalView);
    $onsen.derivePropertiesFromElement(ModalView, ['onDeviceBackButton']);

    return ModalView;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        this._boundOnPostpop = this._onPostpop.bind(this);
        this._element.on('prepop', this._boundOnPrepop);
        this._element.on('postpop', this._boundOnPostpop);

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['prepush', 'postpush', 'prepop', 'postpop', 'init', 'show', 'hide', 'destroy'], (function (detail) {
          if (detail.navigator) {
            detail.navigator = this;
          }
          return detail;
        }).bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['insertPage', 'pushPage', 'bringPageTop', 'popPage', 'replacePage', 'resetToPage', 'canPopPage']);
      },

      _onPrepop: function _onPrepop(event) {
        var pages = event.detail.navigator.pages;
        angular.element(pages[pages.length - 2]).data('_scope').$evalAsync();
        this._previousPageScope = angular.element(pages[pages.length - 1]).data('_scope');
      },

      _onPostpop: function _onPostpop(event) {
        this._previousPageScope.$destroy();
      },

      _compileAndLink: function _compileAndLink(pageElement, callback) {
        var link = $compile(pageElement);
        var pageScope = this._createPageScope();
        link(pageScope);

        pageScope.$evalAsync(function () {
          callback(pageElement);
        });
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._clearDerivingEvents();
        this._clearDerivingMethods();
        this._element.off('prepop', this._boundOnPrepop);
        this._element.off('postpop', this._boundOnPostpop);
        this._element = this._scope = this._attrs = null;
      },

      _createPageScope: function _createPageScope() {
        return this._scope.$new();
      }
    });

    MicroEvent.mixin(NavigatorView);
    $onsen.derivePropertiesFromElement(NavigatorView, ['pages', 'topPage']);

    return NavigatorView;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

angular.module('onsen').value('NavigatorTransitionAnimator', ons._internal.NavigatorTransitionAnimator).value('FadeTransitionAnimator', ons._internal.FadeNavigatorTransitionAnimator).value('IOSSlideTransitionAnimator', ons._internal.IOSSlideNavigatorTransitionAnimator).value('LiftTransitionAnimator', ons._internal.LiftNavigatorTransitionAnimator).value('NullTransitionAnimator', ons._internal.NavigatorTransitionAnimator).value('SimpleSlideTransitionAnimator', ons._internal.SimpleSlideNavigatorTransitionAnimator);
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  module.factory('OverlaySlidingMenuAnimator', ['SlidingMenuAnimator', function (SlidingMenuAnimator) {

    var OverlaySlidingMenuAnimator = SlidingMenuAnimator.extend({

      _blackMask: undefined,

      _isRight: false,
      _element: false,
      _menuPage: false,
      _mainPage: false,
      _width: false,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function setup(element, mainPage, menuPage, options) {
        options = options || {};
        this._width = options.width || '90%';
        this._isRight = !!options.isRight;
        this._element = element;
        this._mainPage = mainPage;
        this._menuPage = menuPage;

        menuPage.css('box-shadow', '0px 0 10px 0px rgba(0, 0, 0, 0.2)');
        menuPage.css({
          width: options.width,
          display: 'none',
          zIndex: 2
        });

        // Fix for transparent menu page on iOS8.
        menuPage.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');

        mainPage.css({ zIndex: 1 });

        if (this._isRight) {
          menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        this._blackMask = angular.element('<div></div>').css({
          backgroundColor: 'black',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          position: 'absolute',
          display: 'none',
          zIndex: 0
        });

        element.prepend(this._blackMask);
      },

      /**
       * @param {Object} options
       * @param {String} options.width
       */
      onResized: function onResized(options) {
        this._menuPage.css('width', options.width);

        if (this._isRight) {
          this._menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          this._menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;
          var menuStyle = this._generateMenuPageStyle(max);
          animit(this._menuPage[0]).queue(menuStyle).play();
        }
      },

      /**
       */
      destroy: function destroy() {
        if (this._blackMask) {
          this._blackMask.remove();
          this._blackMask = null;
        }

        this._mainPage.removeAttr('style');
        this._menuPage.removeAttr('style');

        this._element = this._mainPage = this._menuPage = null;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function openMenu(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var max = this._menuPage[0].clientWidth;
        var menuStyle = this._generateMenuPageStyle(max);
        var mainPageStyle = this._generateMainPageStyle(max);

        setTimeout((function () {

          animit(this._mainPage[0]).wait(delay).queue(mainPageStyle, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            callback();
            done();
          }).play();

          animit(this._menuPage[0]).wait(delay).queue(menuStyle, {
            duration: duration,
            timing: this.timing
          }).play();
        }).bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function closeMenu(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._blackMask.css({ display: 'block' });

        var menuPageStyle = this._generateMenuPageStyle(0);
        var mainPageStyle = this._generateMainPageStyle(0);

        setTimeout((function () {

          animit(this._mainPage[0]).wait(delay).queue(mainPageStyle, {
            duration: duration,
            timing: this.timing
          }).queue((function (done) {
            this._menuPage.css('display', 'none');
            callback();
            done();
          }).bind(this)).play();

          animit(this._menuPage[0]).wait(delay).queue(menuPageStyle, {
            duration: duration,
            timing: this.timing
          }).play();
        }).bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function translateMenu(options) {

        this._menuPage.css('display', 'block');
        this._blackMask.css({ display: 'block' });

        var menuPageStyle = this._generateMenuPageStyle(Math.min(options.maxDistance, options.distance));
        var mainPageStyle = this._generateMainPageStyle(Math.min(options.maxDistance, options.distance));
        delete mainPageStyle.opacity;

        animit(this._menuPage[0]).queue(menuPageStyle).play();

        if (Object.keys(mainPageStyle).length > 0) {
          animit(this._mainPage[0]).queue(mainPageStyle).play();
        }
      },

      _generateMenuPageStyle: function _generateMenuPageStyle(distance) {
        var x = this._isRight ? -distance : distance;
        var transform = 'translate3d(' + x + 'px, 0, 0)';

        return {
          transform: transform,
          'box-shadow': distance === 0 ? 'none' : '0px 0 10px 0px rgba(0, 0, 0, 0.2)'
        };
      },

      _generateMainPageStyle: function _generateMainPageStyle(distance) {
        var max = this._menuPage[0].clientWidth;
        var opacity = 1 - 0.1 * distance / max;

        return {
          opacity: opacity
        };
      },

      copy: function copy() {
        return new OverlaySlidingMenuAnimator();
      }
    });

    return OverlaySlidingMenuAnimator;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide'], (function (detail) {
          if (detail.popover) {
            detail.popover = this;
          }
          return detail;
        }).bind(this));
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

angular.module('onsen').value('PopoverAnimator', ons._internal.PopoverAnimator).value('FadePopoverAnimator', ons._internal.FadePopoverAnimator);
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  module.factory('PushSlidingMenuAnimator', ['SlidingMenuAnimator', function (SlidingMenuAnimator) {

    var PushSlidingMenuAnimator = SlidingMenuAnimator.extend({

      _isRight: false,
      _element: undefined,
      _menuPage: undefined,
      _mainPage: undefined,
      _width: undefined,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function setup(element, mainPage, menuPage, options) {
        options = options || {};

        this._element = element;
        this._mainPage = mainPage;
        this._menuPage = menuPage;

        this._isRight = !!options.isRight;
        this._width = options.width || '90%';

        menuPage.css({
          width: options.width,
          display: 'none'
        });

        if (this._isRight) {
          menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }
      },

      /**
       * @param {Object} options
       * @param {String} options.width
       * @param {Object} options.isRight
       */
      onResized: function onResized(options) {
        this._menuPage.css('width', options.width);

        if (this._isRight) {
          this._menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          this._menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;
          var mainPageTransform = this._generateAbovePageTransform(max);
          var menuPageStyle = this._generateBehindPageStyle(max);

          animit(this._mainPage[0]).queue({ transform: mainPageTransform }).play();
          animit(this._menuPage[0]).queue(menuPageStyle).play();
        }
      },

      /**
       */
      destroy: function destroy() {
        this._mainPage.removeAttr('style');
        this._menuPage.removeAttr('style');

        this._element = this._mainPage = this._menuPage = null;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function openMenu(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._menuPage.css('display', 'block');

        var max = this._menuPage[0].clientWidth;

        var aboveTransform = this._generateAbovePageTransform(max);
        var behindStyle = this._generateBehindPageStyle(max);

        setTimeout((function () {

          animit(this._mainPage[0]).wait(delay).queue({
            transform: aboveTransform
          }, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            callback();
            done();
          }).play();

          animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
            duration: duration,
            timing: this.timing
          }).play();
        }).bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function closeMenu(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        var aboveTransform = this._generateAbovePageTransform(0);
        var behindStyle = this._generateBehindPageStyle(0);

        setTimeout((function () {

          animit(this._mainPage[0]).wait(delay).queue({
            transform: aboveTransform
          }, {
            duration: duration,
            timing: this.timing
          }).queue({
            transform: 'translate3d(0, 0, 0)'
          }).queue((function (done) {
            this._menuPage.css('display', 'none');
            callback();
            done();
          }).bind(this)).play();

          animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            done();
          }).play();
        }).bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function translateMenu(options) {

        this._menuPage.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(Math.min(options.maxDistance, options.distance));
        var behindStyle = this._generateBehindPageStyle(Math.min(options.maxDistance, options.distance));

        animit(this._mainPage[0]).queue({ transform: aboveTransform }).play();

        animit(this._menuPage[0]).queue(behindStyle).play();
      },

      _generateAbovePageTransform: function _generateAbovePageTransform(distance) {
        var x = this._isRight ? -distance : distance;
        var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

        return aboveTransform;
      },

      _generateBehindPageStyle: function _generateBehindPageStyle(distance) {
        var behindX = this._isRight ? -distance : distance;
        var behindTransform = 'translate3d(' + behindX + 'px, 0, 0)';

        return {
          transform: behindTransform
        };
      },

      copy: function copy() {
        return new PushSlidingMenuAnimator();
      }
    });

    return PushSlidingMenuAnimator;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  module.factory('RevealSlidingMenuAnimator', ['SlidingMenuAnimator', function (SlidingMenuAnimator) {

    var RevealSlidingMenuAnimator = SlidingMenuAnimator.extend({

      _blackMask: undefined,

      _isRight: false,

      _menuPage: undefined,
      _element: undefined,
      _mainPage: undefined,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function setup(element, mainPage, menuPage, options) {
        this._element = element;
        this._menuPage = menuPage;
        this._mainPage = mainPage;
        this._isRight = !!options.isRight;
        this._width = options.width || '90%';

        mainPage.css({
          boxShadow: '0px 0 10px 0px rgba(0, 0, 0, 0.2)'
        });

        menuPage.css({
          width: options.width,
          opacity: 0.9,
          display: 'none'
        });

        if (this._isRight) {
          menuPage.css({
            right: '0px',
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '0px'
          });
        }

        this._blackMask = angular.element('<div></div>').css({
          backgroundColor: 'black',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          position: 'absolute',
          display: 'none'
        });

        element.prepend(this._blackMask);

        // Dirty fix for broken rendering bug on android 4.x.
        animit(mainPage[0]).queue({ transform: 'translate3d(0, 0, 0)' }).play();
      },

      /**
       * @param {Object} options
       * @param {Boolean} options.isOpened
       * @param {String} options.width
       */
      onResized: function onResized(options) {
        this._width = options.width;
        this._menuPage.css('width', this._width);

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;

          var aboveTransform = this._generateAbovePageTransform(max);
          var behindStyle = this._generateBehindPageStyle(max);

          animit(this._mainPage[0]).queue({ transform: aboveTransform }).play();
          animit(this._menuPage[0]).queue(behindStyle).play();
        }
      },

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       */
      destroy: function destroy() {
        if (this._blackMask) {
          this._blackMask.remove();
          this._blackMask = null;
        }

        if (this._mainPage) {
          this._mainPage.attr('style', '');
        }

        if (this._menuPage) {
          this._menuPage.attr('style', '');
        }

        this._mainPage = this._menuPage = this._element = undefined;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function openMenu(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var max = this._menuPage[0].clientWidth;

        var aboveTransform = this._generateAbovePageTransform(max);
        var behindStyle = this._generateBehindPageStyle(max);

        setTimeout((function () {

          animit(this._mainPage[0]).wait(delay).queue({
            transform: aboveTransform
          }, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            callback();
            done();
          }).play();

          animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
            duration: duration,
            timing: this.timing
          }).play();
        }).bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function closeMenu(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._blackMask.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(0);
        var behindStyle = this._generateBehindPageStyle(0);

        setTimeout((function () {

          animit(this._mainPage[0]).wait(delay).queue({
            transform: aboveTransform
          }, {
            duration: duration,
            timing: this.timing
          }).queue({
            transform: 'translate3d(0, 0, 0)'
          }).queue((function (done) {
            this._menuPage.css('display', 'none');
            callback();
            done();
          }).bind(this)).play();

          animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            done();
          }).play();
        }).bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function translateMenu(options) {

        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(Math.min(options.maxDistance, options.distance));
        var behindStyle = this._generateBehindPageStyle(Math.min(options.maxDistance, options.distance));
        delete behindStyle.opacity;

        animit(this._mainPage[0]).queue({ transform: aboveTransform }).play();

        animit(this._menuPage[0]).queue(behindStyle).play();
      },

      _generateAbovePageTransform: function _generateAbovePageTransform(distance) {
        var x = this._isRight ? -distance : distance;
        var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

        return aboveTransform;
      },

      _generateBehindPageStyle: function _generateBehindPageStyle(distance) {
        var max = this._menuPage[0].getBoundingClientRect().width;

        var behindDistance = (distance - max) / max * 10;
        behindDistance = isNaN(behindDistance) ? 0 : Math.max(Math.min(behindDistance, 0), -10);

        var behindX = this._isRight ? -behindDistance : behindDistance;
        var behindTransform = 'translate3d(' + behindX + '%, 0, 0)';
        var opacity = 1 + behindDistance / 100;

        return {
          transform: behindTransform,
          opacity: opacity
        };
      },

      copy: function copy() {
        return new RevealSlidingMenuAnimator();
      }
    });

    return RevealSlidingMenuAnimator;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  var SlidingMenuViewModel = Class.extend({

    /**
     * @member Number
     */
    _distance: 0,

    /**
     * @member Number
     */
    _maxDistance: undefined,

    /**
     * @param {Object} options
     * @param {Number} maxDistance
     */
    init: function init(options) {
      if (!angular.isNumber(options.maxDistance)) {
        throw new Error('options.maxDistance must be number');
      }

      this.setMaxDistance(options.maxDistance);
    },

    /**
     * @param {Number} maxDistance
     */
    setMaxDistance: function setMaxDistance(maxDistance) {
      if (maxDistance <= 0) {
        throw new Error('maxDistance must be greater then zero.');
      }

      if (this.isOpened()) {
        this._distance = maxDistance;
      }
      this._maxDistance = maxDistance;
    },

    /**
     * @return {Boolean}
     */
    shouldOpen: function shouldOpen() {
      return !this.isOpened() && this._distance >= this._maxDistance / 2;
    },

    /**
     * @return {Boolean}
     */
    shouldClose: function shouldClose() {
      return !this.isClosed() && this._distance < this._maxDistance / 2;
    },

    openOrClose: function openOrClose(options) {
      if (this.shouldOpen()) {
        this.open(options);
      } else if (this.shouldClose()) {
        this.close(options);
      }
    },

    close: function close(options) {
      var callback = options.callback || function () {};

      if (!this.isClosed()) {
        this._distance = 0;
        this.emit('close', options);
      } else {
        callback();
      }
    },

    open: function open(options) {
      var callback = options.callback || function () {};

      if (!this.isOpened()) {
        this._distance = this._maxDistance;
        this.emit('open', options);
      } else {
        callback();
      }
    },

    /**
     * @return {Boolean}
     */
    isClosed: function isClosed() {
      return this._distance === 0;
    },

    /**
     * @return {Boolean}
     */
    isOpened: function isOpened() {
      return this._distance === this._maxDistance;
    },

    /**
     * @return {Number}
     */
    getX: function getX() {
      return this._distance;
    },

    /**
     * @return {Number}
     */
    getMaxDistance: function getMaxDistance() {
      return this._maxDistance;
    },

    /**
     * @param {Number} x
     */
    translate: function translate(x) {
      this._distance = Math.max(1, Math.min(this._maxDistance - 1, x));

      var options = {
        distance: this._distance,
        maxDistance: this._maxDistance
      };

      this.emit('translate', options);
    },

    toggle: function toggle() {
      if (this.isClosed()) {
        this.open();
      } else {
        this.close();
      }
    }
  });
  MicroEvent.mixin(SlidingMenuViewModel);

  module.factory('SlidingMenuView', ['$onsen', '$compile', '$parse', 'AnimationChooser', 'SlidingMenuAnimator', 'RevealSlidingMenuAnimator', 'PushSlidingMenuAnimator', 'OverlaySlidingMenuAnimator', function ($onsen, $compile, $parse, AnimationChooser, SlidingMenuAnimator, RevealSlidingMenuAnimator, PushSlidingMenuAnimator, OverlaySlidingMenuAnimator) {

    var SlidingMenuView = Class.extend({
      _scope: undefined,
      _attrs: undefined,

      _element: undefined,
      _menuPage: undefined,
      _mainPage: undefined,

      _doorLock: undefined,

      _isRightMenu: false,

      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._attrs = attrs;
        this._element = element;

        this._menuPage = angular.element(element[0].querySelector('.onsen-sliding-menu__menu'));
        this._mainPage = angular.element(element[0].querySelector('.onsen-sliding-menu__main'));

        this._doorLock = new ons._DoorLock();

        this._isRightMenu = attrs.side === 'right';

        // Close menu on tap event.
        this._mainPageGestureDetector = new ons.GestureDetector(this._mainPage[0]);
        this._boundOnTap = this._onTap.bind(this);

        var maxDistance = this._normalizeMaxSlideDistanceAttr();
        this._logic = new SlidingMenuViewModel({ maxDistance: Math.max(maxDistance, 1) });
        this._logic.on('translate', this._translate.bind(this));
        this._logic.on('open', (function (options) {
          this._open(options);
        }).bind(this));
        this._logic.on('close', (function (options) {
          this._close(options);
        }).bind(this));

        attrs.$observe('maxSlideDistance', this._onMaxSlideDistanceChanged.bind(this));
        attrs.$observe('swipeable', this._onSwipeableChanged.bind(this));

        this._boundOnWindowResize = this._onWindowResize.bind(this);
        window.addEventListener('resize', this._boundOnWindowResize);

        this._boundHandleEvent = this._handleEvent.bind(this);
        this._bindEvents();

        if (attrs.mainPage) {
          this.setMainPage(attrs.mainPage);
        }

        if (attrs.menuPage) {
          this.setMenuPage(attrs.menuPage);
        }

        this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this._element[0], this._onDeviceBackButton.bind(this));

        var unlock = this._doorLock.lock();

        window.setTimeout((function () {
          var maxDistance = this._normalizeMaxSlideDistanceAttr();
          this._logic.setMaxDistance(maxDistance);

          this._menuPage.css({ opacity: 1 });

          var animationChooser = new AnimationChooser({
            animators: SlidingMenuView._animatorDict,
            baseClass: SlidingMenuAnimator,
            baseClassName: 'SlidingMenuAnimator',
            defaultAnimation: attrs.type,
            defaultAnimationOptions: $parse(attrs.animationOptions)()
          });
          this._animator = animationChooser.newAnimator();
          this._animator.setup(this._element, this._mainPage, this._menuPage, {
            isRight: this._isRightMenu,
            width: this._attrs.maxSlideDistance || '90%'
          });

          unlock();
        }).bind(this), 400);

        scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['init', 'show', 'hide', 'destroy']);

        if (!attrs.swipeable) {
          this.setSwipeable(true);
        }
      },

      getDeviceBackButtonHandler: function getDeviceBackButtonHandler() {
        return this._deviceBackButtonHandler;
      },

      _onDeviceBackButton: function _onDeviceBackButton(event) {
        if (this.isMenuOpened()) {
          this.closeMenu();
        } else {
          event.callParentHandler();
        }
      },

      _onTap: function _onTap() {
        if (this.isMenuOpened()) {
          this.closeMenu();
        }
      },

      _refreshMenuPageWidth: function _refreshMenuPageWidth() {
        var width = 'maxSlideDistance' in this._attrs ? this._attrs.maxSlideDistance : '90%';

        if (this._animator) {
          this._animator.onResized({
            isOpened: this._logic.isOpened(),
            width: width
          });
        }
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();

        this._deviceBackButtonHandler.destroy();
        window.removeEventListener('resize', this._boundOnWindowResize);

        this._mainPageGestureDetector.off('tap', this._boundOnTap);
        this._element = this._scope = this._attrs = null;
      },

      _onSwipeableChanged: function _onSwipeableChanged(swipeable) {
        swipeable = swipeable === '' || swipeable === undefined || swipeable == 'true';

        this.setSwipeable(swipeable);
      },

      /**
       * @param {Boolean} enabled
       */
      setSwipeable: function setSwipeable(enabled) {
        if (enabled) {
          this._activateGestureDetector();
        } else {
          this._deactivateGestureDetector();
        }
      },

      _onWindowResize: function _onWindowResize() {
        this._recalculateMAX();
        this._refreshMenuPageWidth();
      },

      _onMaxSlideDistanceChanged: function _onMaxSlideDistanceChanged() {
        this._recalculateMAX();
        this._refreshMenuPageWidth();
      },

      /**
       * @return {Number}
       */
      _normalizeMaxSlideDistanceAttr: function _normalizeMaxSlideDistanceAttr() {
        var maxDistance = this._attrs.maxSlideDistance;

        if (!('maxSlideDistance' in this._attrs)) {
          maxDistance = 0.9 * this._mainPage[0].clientWidth;
        } else if (typeof maxDistance == 'string') {
          if (maxDistance.indexOf('px', maxDistance.length - 2) !== -1) {
            maxDistance = parseInt(maxDistance.replace('px', ''), 10);
          } else if (maxDistance.indexOf('%', maxDistance.length - 1) > 0) {
            maxDistance = maxDistance.replace('%', '');
            maxDistance = parseFloat(maxDistance) / 100 * this._mainPage[0].clientWidth;
          }
        } else {
          throw new Error('invalid state');
        }

        return maxDistance;
      },

      _recalculateMAX: function _recalculateMAX() {
        var maxDistance = this._normalizeMaxSlideDistanceAttr();

        if (maxDistance) {
          this._logic.setMaxDistance(parseInt(maxDistance, 10));
        }
      },

      _activateGestureDetector: function _activateGestureDetector() {
        this._gestureDetector.on('touch dragleft dragright swipeleft swiperight release', this._boundHandleEvent);
      },

      _deactivateGestureDetector: function _deactivateGestureDetector() {
        this._gestureDetector.off('touch dragleft dragright swipeleft swiperight release', this._boundHandleEvent);
      },

      _bindEvents: function _bindEvents() {
        this._gestureDetector = new ons.GestureDetector(this._element[0], {
          dragMinDistance: 1
        });
      },

      _appendMainPage: function _appendMainPage(pageUrl, templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = angular.element(templateHTML);
        var link = $compile(pageContent);

        this._mainPage.append(pageContent);

        if (this._currentPageElement) {
          this._currentPageElement.remove();
          this._currentPageScope.$destroy();
        }

        link(pageScope);

        this._currentPageElement = pageContent;
        this._currentPageScope = pageScope;
        this._currentPageUrl = pageUrl;
        this._currentPageElement[0]._show();
      },

      /**
       * @param {String}
       */
      _appendMenuPage: function _appendMenuPage(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = angular.element(templateHTML);
        var link = $compile(pageContent);

        this._menuPage.append(pageContent);

        if (this._currentMenuPageScope) {
          this._currentMenuPageScope.$destroy();
          this._currentMenuPageElement.remove();
        }

        link(pageScope);

        this._currentMenuPageElement = pageContent;
        this._currentMenuPageScope = pageScope;
      },

      /**
       * @param {String} page
       * @param {Object} options
       * @param {Boolean} [options.closeMenu]
       * @param {Boolean} [options.callback]
       */
      setMenuPage: function setMenuPage(page, options) {
        if (page) {
          options = options || {};
          options.callback = options.callback || function () {};

          var self = this;
          $onsen.getPageHTMLAsync(page).then(function (html) {
            self._appendMenuPage(angular.element(html));
            if (options.closeMenu) {
              self.close();
            }
            options.callback();
          }, function () {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} pageUrl
       * @param {Object} options
       * @param {Boolean} [options.closeMenu]
       * @param {Boolean} [options.callback]
       */
      setMainPage: function setMainPage(pageUrl, options) {
        options = options || {};
        options.callback = options.callback || function () {};

        var done = (function () {
          if (options.closeMenu) {
            this.close();
          }
          options.callback();
        }).bind(this);

        if (this._currentPageUrl === pageUrl) {
          done();
          return;
        }

        if (pageUrl) {
          var self = this;
          $onsen.getPageHTMLAsync(pageUrl).then(function (html) {
            self._appendMainPage(pageUrl, html);
            done();
          }, function () {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      _handleEvent: function _handleEvent(event) {

        if (this._doorLock.isLocked()) {
          return;
        }

        if (this._isInsideIgnoredElement(event.target)) {
          this._deactivateGestureDetector();
        }

        switch (event.type) {
          case 'dragleft':
          case 'dragright':

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            event.gesture.preventDefault();

            var deltaX = event.gesture.deltaX;
            var deltaDistance = this._isRightMenu ? -deltaX : deltaX;

            var startEvent = event.gesture.startEvent;

            if (!('isOpened' in startEvent)) {
              startEvent.isOpened = this._logic.isOpened();
            }

            if (deltaDistance < 0 && this._logic.isClosed()) {
              break;
            }

            if (deltaDistance > 0 && this._logic.isOpened()) {
              break;
            }

            var distance = startEvent.isOpened ? deltaDistance + this._logic.getMaxDistance() : deltaDistance;

            this._logic.translate(distance);

            break;

          case 'swipeleft':
            event.gesture.preventDefault();

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            if (this._isRightMenu) {
              this.open();
            } else {
              this.close();
            }

            event.gesture.stopDetect();
            break;

          case 'swiperight':
            event.gesture.preventDefault();

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            if (this._isRightMenu) {
              this.close();
            } else {
              this.open();
            }

            event.gesture.stopDetect();
            break;

          case 'release':
            this._lastDistance = null;

            if (this._logic.shouldOpen()) {
              this.open();
            } else if (this._logic.shouldClose()) {
              this.close();
            }

            break;
        }
      },

      /**
       * @param {jqLite} element
       * @return {Boolean}
       */
      _isInsideIgnoredElement: function _isInsideIgnoredElement(element) {
        do {
          if (element.getAttribute && element.getAttribute('sliding-menu-ignore')) {
            return true;
          }
          element = element.parentNode;
        } while (element);

        return false;
      },

      _isInsideSwipeTargetArea: function _isInsideSwipeTargetArea(event) {
        var x = event.gesture.center.pageX;

        if (!('_swipeTargetWidth' in event.gesture.startEvent)) {
          event.gesture.startEvent._swipeTargetWidth = this._getSwipeTargetWidth();
        }

        var targetWidth = event.gesture.startEvent._swipeTargetWidth;
        return this._isRightMenu ? this._mainPage[0].clientWidth - x < targetWidth : x < targetWidth;
      },

      _getSwipeTargetWidth: function _getSwipeTargetWidth() {
        var targetWidth = this._attrs.swipeTargetWidth;

        if (typeof targetWidth == 'string') {
          targetWidth = targetWidth.replace('px', '');
        }

        var width = parseInt(targetWidth, 10);
        if (width < 0 || !targetWidth) {
          return this._mainPage[0].clientWidth;
        } else {
          return width;
        }
      },

      closeMenu: function closeMenu() {
        return this.close.apply(this, arguments);
      },

      /**
       * Close sliding-menu page.
       *
       * @param {Object} options
       */
      close: function close(options) {
        options = options || {};
        options = typeof options == 'function' ? { callback: options } : options;

        if (!this._logic.isClosed()) {
          this.emit('preclose', {
            slidingMenu: this
          });

          this._doorLock.waitUnlock((function () {
            this._logic.close(options);
          }).bind(this));
        }
      },

      _close: function _close(options) {
        var callback = options.callback || function () {},
            unlock = this._doorLock.lock(),
            instant = options.animation == 'none';

        this._animator.closeMenu((function () {
          unlock();

          this._mainPage.children().css('pointer-events', '');
          this._mainPageGestureDetector.off('tap', this._boundOnTap);

          this.emit('postclose', {
            slidingMenu: this
          });

          callback();
        }).bind(this), instant);
      },

      /**
       * Open sliding-menu page.
       *
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      openMenu: function openMenu() {
        return this.open.apply(this, arguments);
      },

      /**
       * Open sliding-menu page.
       *
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      open: function open(options) {
        options = options || {};
        options = typeof options == 'function' ? { callback: options } : options;

        this.emit('preopen', {
          slidingMenu: this
        });

        this._doorLock.waitUnlock((function () {
          this._logic.open(options);
        }).bind(this));
      },

      _open: function _open(options) {
        var callback = options.callback || function () {},
            unlock = this._doorLock.lock(),
            instant = options.animation == 'none';

        this._animator.openMenu((function () {
          unlock();

          this._mainPage.children().css('pointer-events', 'none');
          this._mainPageGestureDetector.on('tap', this._boundOnTap);

          this.emit('postopen', {
            slidingMenu: this
          });

          callback();
        }).bind(this), instant);
      },

      /**
       * Toggle sliding-menu page.
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      toggle: function toggle(options) {
        if (this._logic.isClosed()) {
          this.open(options);
        } else {
          this.close(options);
        }
      },

      /**
       * Toggle sliding-menu page.
       */
      toggleMenu: function toggleMenu() {
        return this.toggle.apply(this, arguments);
      },

      /**
       * @return {Boolean}
       */
      isMenuOpened: function isMenuOpened() {
        return this._logic.isOpened();
      },

      /**
       * @param {Object} event
       */
      _translate: function _translate(event) {
        this._animator.translateMenu(event);
      }
    });

    // Preset sliding menu animators.
    SlidingMenuView._animatorDict = {
      'default': RevealSlidingMenuAnimator,
      'overlay': OverlaySlidingMenuAnimator,
      'reveal': RevealSlidingMenuAnimator,
      'push': PushSlidingMenuAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    SlidingMenuView.registerAnimator = function (name, Animator) {
      if (!(Animator.prototype instanceof SlidingMenuAnimator)) {
        throw new Error('"Animator" param must inherit SlidingMenuAnimator');
      }

      this._animatorDict[name] = Animator;
    };

    MicroEvent.mixin(SlidingMenuView);

    return SlidingMenuView;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  module.factory('SlidingMenuAnimator', function () {
    return Class.extend({

      delay: 0,
      duration: 0.4,
      timing: 'cubic-bezier(.1, .7, .1, 1)',

      /**
       * @param {Object} options
       * @param {String} options.timing
       * @param {Number} options.duration
       * @param {Number} options.delay
       */
      init: function init(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
        this.delay = options.delay !== undefined ? options.delay : this.delay;
      },

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function setup(element, mainPage, menuPage, options) {},

      /**
       * @param {Object} options
       * @param {Boolean} options.isRight
       * @param {Boolean} options.isOpened
       * @param {String} options.width
       */
      onResized: function onResized(options) {},

      /**
       * @param {Function} callback
       */
      openMenu: function openMenu(callback) {},

      /**
       * @param {Function} callback
       */
      closeClose: function closeClose(callback) {},

      /**
       */
      destroy: function destroy() {},

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function translateMenu(mainPage, menuPage, options) {},

      /**
       * @return {SlidingMenuAnimator}
       */
      copy: function copy() {
        throw new Error('Override copy method.');
      }
    });
  });
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  module.factory('SplitView', ['$compile', 'RevealSlidingMenuAnimator', '$onsen', '$onsGlobal', function ($compile, RevealSlidingMenuAnimator, $onsen, $onsGlobal) {
    var SPLIT_MODE = 0;
    var COLLAPSE_MODE = 1;
    var MAIN_PAGE_RATIO = 0.9;

    var SplitView = Class.extend({

      init: function init(scope, element, attrs) {
        element.addClass('onsen-sliding-menu');

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._mainPage = angular.element(element[0].querySelector('.onsen-split-view__main'));
        this._secondaryPage = angular.element(element[0].querySelector('.onsen-split-view__secondary'));

        this._max = this._mainPage[0].clientWidth * MAIN_PAGE_RATIO;
        this._mode = SPLIT_MODE;
        this._doorLock = new ons._DoorLock();

        this._doSplit = false;
        this._doCollapse = false;

        $onsGlobal.orientation.on('change', this._onResize.bind(this));

        this._animator = new RevealSlidingMenuAnimator();

        this._element.css('display', 'none');

        if (attrs.mainPage) {
          this.setMainPage(attrs.mainPage);
        }

        if (attrs.secondaryPage) {
          this.setSecondaryPage(attrs.secondaryPage);
        }

        var unlock = this._doorLock.lock();

        this._considerChangingCollapse();
        this._setSize();

        setTimeout((function () {
          this._element.css('display', 'block');
          unlock();
        }).bind(this), 1000 / 60 * 2);

        scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['init', 'show', 'hide', 'destroy']);
      },

      /**
       * @param {String} templateHTML
       */
      _appendSecondPage: function _appendSecondPage(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._secondaryPage.append(pageContent);

        if (this._currentSecondaryPageElement) {
          this._currentSecondaryPageElement.remove();
          this._currentSecondaryPageScope.$destroy();
        }

        this._currentSecondaryPageElement = pageContent;
        this._currentSecondaryPageScope = pageScope;
      },

      /**
       * @param {String} templateHTML
       */
      _appendMainPage: function _appendMainPage(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._mainPage.append(pageContent);

        if (this._currentPage) {
          this._currentPageScope.$destroy();
        }

        this._currentPage = pageContent;
        this._currentPageScope = pageScope;
        this._currentPage[0]._show();
      },

      /**
       * @param {String} page
       */
      setSecondaryPage: function setSecondaryPage(page) {
        if (page) {
          $onsen.getPageHTMLAsync(page).then((function (html) {
            this._appendSecondPage(angular.element(html.trim()));
          }).bind(this), function () {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} page
       */
      setMainPage: function setMainPage(page) {
        if (page) {
          $onsen.getPageHTMLAsync(page).then((function (html) {
            this._appendMainPage(angular.element(html.trim()));
          }).bind(this), function () {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      _onResize: function _onResize() {
        var lastMode = this._mode;

        this._considerChangingCollapse();

        if (lastMode === COLLAPSE_MODE && this._mode === COLLAPSE_MODE) {
          this._animator.onResized({
            isOpened: false,
            width: '90%'
          });
        }

        this._max = this._mainPage[0].clientWidth * MAIN_PAGE_RATIO;
      },

      _considerChangingCollapse: function _considerChangingCollapse() {
        var should = this._shouldCollapse();

        if (should && this._mode !== COLLAPSE_MODE) {
          this._fireUpdateEvent();
          if (this._doSplit) {
            this._activateSplitMode();
          } else {
            this._activateCollapseMode();
          }
        } else if (!should && this._mode === COLLAPSE_MODE) {
          this._fireUpdateEvent();
          if (this._doCollapse) {
            this._activateCollapseMode();
          } else {
            this._activateSplitMode();
          }
        }

        this._doCollapse = this._doSplit = false;
      },

      update: function update() {
        this._fireUpdateEvent();

        var should = this._shouldCollapse();

        if (this._doSplit) {
          this._activateSplitMode();
        } else if (this._doCollapse) {
          this._activateCollapseMode();
        } else if (should) {
          this._activateCollapseMode();
        } else if (!should) {
          this._activateSplitMode();
        }

        this._doSplit = this._doCollapse = false;
      },

      _getOrientation: function _getOrientation() {
        if ($onsGlobal.orientation.isPortrait()) {
          return 'portrait';
        } else {
          return 'landscape';
        }
      },

      getCurrentMode: function getCurrentMode() {
        if (this._mode === COLLAPSE_MODE) {
          return 'collapse';
        } else {
          return 'split';
        }
      },

      _shouldCollapse: function _shouldCollapse() {
        var c = 'portrait';
        if (typeof this._attrs.collapse === 'string') {
          c = this._attrs.collapse.trim();
        }

        if (c == 'portrait') {
          return $onsGlobal.orientation.isPortrait();
        } else if (c == 'landscape') {
          return $onsGlobal.orientation.isLandscape();
        } else if (c.substr(0, 5) == 'width') {
          var num = c.split(' ')[1];
          if (num.indexOf('px') >= 0) {
            num = num.substr(0, num.length - 2);
          }

          var width = window.innerWidth;

          return isNumber(num) && width < num;
        } else {
          var mq = window.matchMedia(c);
          return mq.matches;
        }
      },

      _setSize: function _setSize() {
        if (this._mode === SPLIT_MODE) {
          if (!this._attrs.mainPageWidth) {
            this._attrs.mainPageWidth = '70';
          }

          var secondarySize = 100 - this._attrs.mainPageWidth.replace('%', '');
          this._secondaryPage.css({
            width: secondarySize + '%',
            opacity: 1
          });

          this._mainPage.css({
            width: this._attrs.mainPageWidth + '%'
          });

          this._mainPage.css('left', secondarySize + '%');
        }
      },

      _fireEvent: function _fireEvent(name) {
        this.emit(name, {
          splitView: this,
          width: window.innerWidth,
          orientation: this._getOrientation()
        });
      },

      _fireUpdateEvent: function _fireUpdateEvent() {
        var that = this;

        this.emit('update', {
          splitView: this,
          shouldCollapse: this._shouldCollapse(),
          currentMode: this.getCurrentMode(),
          split: function split() {
            that._doSplit = true;
            that._doCollapse = false;
          },
          collapse: function collapse() {
            that._doSplit = false;
            that._doCollapse = true;
          },
          width: window.innerWidth,
          orientation: this._getOrientation()
        });
      },

      _activateCollapseMode: function _activateCollapseMode() {
        if (this._mode !== COLLAPSE_MODE) {
          this._fireEvent('precollapse');
          this._secondaryPage.attr('style', '');
          this._mainPage.attr('style', '');

          this._mode = COLLAPSE_MODE;

          this._animator.setup(this._element, this._mainPage, this._secondaryPage, { isRight: false, width: '90%' });

          this._fireEvent('postcollapse');
        }
      },

      _activateSplitMode: function _activateSplitMode() {
        if (this._mode !== SPLIT_MODE) {
          this._fireEvent('presplit');

          this._animator.destroy();

          this._secondaryPage.attr('style', '');
          this._mainPage.attr('style', '');

          this._mode = SPLIT_MODE;
          this._setSize();

          this._fireEvent('postsplit');
        }
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();

        this._element = null;
        this._scope = null;
      }
    });

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    MicroEvent.mixin(SplitView);

    return SplitView;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        var _this = this;

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this.load = function () {
          var _element$;

          _this._pageScope && _this._pageScope.$destroy();
          (_element$ = _this._element[0]).load.apply(_element$, arguments);
        };
        scope.$on('$destroy', this._destroy.bind(this));
      },

      _link: function _link(fragment, done) {
        this._pageScope = this._scope.$new();
        $compile(fragment)(this._pageScope);

        this._pageScope.$evalAsync(function () {
          return done(fragment);
        });
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['open', 'close', 'toggle']);

        this.load = function () {
          var _element$;

          _this._pageScope && _this._pageScope.$destroy();
          (_element$ = _this._element[0]).load.apply(_element$, arguments);
        };

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['modechange', 'preopen', 'preclose', 'postopen', 'postclose'], function (detail) {
          return detail.side ? angular.extend(detail, { side: _this }) : detail;
        });

        scope.$on('$destroy', this._destroy.bind(this));
      },

      _link: function _link(fragment, done) {
        var link = $compile(fragment);
        this._pageScope = this._scope.$new();
        link(this._pageScope);

        this._pageScope.$evalAsync(function () {
          return done(fragment);
        });
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = this.load = this._pageScope = null;
      }
    });

    MicroEvent.mixin(SplitterSide);
    $onsen.derivePropertiesFromElement(SplitterSide, ['page', 'mode', 'isOpen']);

    return SplitterSide;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

        this._checkbox.on('change', function () {
          _this.emit('change', { 'switch': _this, value: _this._checkbox[0].checked, isInteractive: true });
        });

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

          this._checkbox.on('change', function (e) {
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  module.value('TabbarNoneAnimator', ons._internal.TabbarNoneAnimator);
  module.value('TabbarFadeAnimator', ons._internal.TabbarFadeAnimator);
  module.value('TabbarSlideAnimator', ons._internal.TabbarSlideAnimator);

  module.factory('TabbarView', ['$onsen', '$compile', '$parse', function ($onsen, $compile, $parse) {
    var TabbarView = Class.extend({

      init: function init(scope, element, attrs) {
        if (element[0].nodeName.toLowerCase() !== 'ons-tabbar') {
          throw new Error('"element" parameter must be a "ons-tabbar" element.');
        }

        this._scope = scope;
        this._element = element;
        this._attrs = attrs;
        this._lastPageElement = null;
        this._lastPageScope = null;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['reactive', 'postchange', 'prechange', 'init', 'show', 'hide', 'destroy']);

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['setActiveTab', 'setTabbarVisibility', 'getActiveTabIndex', 'loadPage']);
      },

      _compileAndLink: function _compileAndLink(pageElement, callback) {
        var link = $compile(pageElement);
        var pageScope = this._scope.$new();
        link(pageScope);

        pageScope.$evalAsync(function () {
          callback(pageElement);
        });
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });
    MicroEvent.mixin(TabbarView);

    TabbarView.registerAnimator = function (name, Animator) {
      return window.OnsTabbarElement.registerAnimator(name, Animator);
    };

    return TabbarView;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
  'use strict'

  /**
   * Alert dialog directive.
   */
  ;
  angular.module('onsen').directive('onsAlertDialog', ['$onsen', 'AlertDialogView', function ($onsen, AlertDialogView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function compile(element, attrs) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function pre(scope, element, attrs) {
            CustomElements.upgrade(element[0]);
            var alertDialog = new AlertDialogView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, alertDialog);
            $onsen.registerEventHandlers(alertDialog, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(alertDialog, element);

            element.data('ons-alert-dialog', alertDialog);

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsBackButton', ['$onsen', '$compile', 'GenericView', 'ComponentCleaner', function ($onsen, $compile, GenericView, ComponentCleaner) {
    return {
      restrict: 'E',
      replace: false,

      compile: function compile(element, attrs) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function pre(scope, element, attrs, controller, transclude) {
            CustomElements.upgrade(element[0]);
            var backButton = GenericView.register(scope, element, attrs, {
              viewKey: 'ons-back-button'
            });

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  angular.module('onsen').directive('onsBottomToolbar', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: {
        pre: function pre(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

/**
 * @element ons-button
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsButton', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        CustomElements.upgrade(element[0]);

        return function (scope, element, attrs) {
          CustomElements.upgrade(element[0]);
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

  module.directive('onsCarouselItem', function () {
    return {
      restrict: 'E',
      compile: function compile(element, attrs) {
        CustomElements.upgrade(element[0]);
        return function (scope, element, attrs) {
          CustomElements.upgrade(element[0]);
        };
      }
    };
  });
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        CustomElements.upgrade(element[0]);

        return {
          pre: function pre(scope, element, attrs) {
            CustomElements.upgrade(element[0]);

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

/**
 * @element ons-if-orientation
 * @category conditional
 * @description
 *   [en]Conditionally display content depending on screen orientation. Valid values are portrait and landscape. Different from other components, this component is used as attribute in any element.[/en]
 *   [ja]画面の向きに応じてコンテンツの制御を行います。portraitもしくはlandscapeを指定できます。すべての要素の属性に使用できます。[/ja]
 * @seealso ons-if-platform [en]ons-if-platform component[/en][ja]ons-if-platformコンポーネント[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
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
          element.addClass('ons-if-orientation-inner');

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

/**
 * @element ons-if-platform
 * @category conditional
 * @description
 *    [en]Conditionally display content depending on the platform / browser. Valid values are "opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios" and "wp".[/en]
 *    [ja]プラットフォームやブラウザーに応じてコンテンツの制御をおこないます。opera, firefox, safari, chrome, ie, edge, android, blackberry, ios, wpのいずれかの値を空白区切りで複数指定できます。[/ja]
 * @seealso ons-if-orientation [en]ons-if-orientation component[/en][ja]ons-if-orientationコンポーネント[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
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
        element.addClass('ons-if-platform-inner');
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

/**
 * @ngdoc directive
 * @id input
 * @name ons-input
 * @category form
 * @description
 *  [en]Input component.[/en]
 *  [ja]inputコンポ―ネントです。[/ja]
 * @codepen ojQxLj
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @example
 * <ons-input></ons-input>
 * <ons-input modifier="material" label="Username"></ons-input>
 */

/**
 * @ngdoc attribute
 * @name label
 * @type {String}
 * @description
 *   [en]Text for animated floating label.[/en]
 *   [ja]アニメーションさせるフローティングラベルのテキストを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name float
 * @description
 *  [en]If this attribute is present, the label will be animated.[/en]
 *  [ja]この属性が設定された時、ラベルはアニメーションするようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-model
 * @extensionOf angular
 * @description
 *   [en]Bind the value to a model. Works just like for normal input elements.[/en]
 *   [ja]この要素の値をモデルに紐付けます。通常のinput要素の様に動作します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-change
 * @extensionOf angular
 * @description
 *   [en]Executes an expression when the value changes. Works just like for normal input elements.[/en]
 *   [ja]値が変わった時にこの属性で指定したexpressionが実行されます。通常のinput要素の様に動作します。[/ja]
 */

(function () {
  'use strict';

  var ATTRS = ['ngModel', 'ngChange', 'ngRequired', 'ngMinlength', 'ngMaxlength', 'ngPattern', 'ngTrim', 'ngValue', 'ngTrueValue', 'ngFalseValue'];

  angular.module('onsen').directive('onsInput', ['$compile', function ($compile) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        CustomElements.upgrade(element[0]);

        var el = element[0];
        var type = el.getAttribute('type');

        ATTRS.forEach(function (attr) {
          var kebabCase = attr.replace(/[A-Z]/g, function (letter, pos) {
            return (pos ? '-' : '') + letter.toLowerCase();
          });

          if (attrs.hasOwnProperty(attr)) {
            el._input.setAttribute(kebabCase, attrs[attr]);
          }
        });

        $compile(el._input)(scope);

        if (el._isTextInput && attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            el._updateLabelClass();
          });
        }

        scope.$on('$destroy', function () {
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
 * @guide UtilityAPIs
 *   [en]Other utility APIs[/en]
 *   [ja]他のユーティリティAPI[/ja]
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  angular.module('onsen').directive('onsList', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  angular.module('onsen').directive('onsListHeader', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, { viewKey: 'ons-listHeader' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  angular.module('onsen').directive('onsListItem', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list-item' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

/**
 * @element ons-loading-placeholder
 * @category util
 * @description
 *   [en]Display a placeholder while the content is loading.[/en]
 *   [ja]Onsen UIが読み込まれるまでに表示するプレースホルダーを表現します。[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
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
        CustomElements.upgrade(element[0]);
        if (attrs.onsLoadingPlaceholder) {
          ons._resolveLoadingPlaceholder(element[0], attrs.onsLoadingPlaceholder, function (contentElement, done) {
            CustomElements.upgrade(contentElement);
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

(function () {
  'use strict'

  /**
   * Modal directive.
   */
  ;
  angular.module('onsen').directive('onsModal', ['$onsen', 'ModalView', function ($onsen, ModalView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      link: {
        pre: function pre(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          var modal = new ModalView(scope, element, attrs);
          $onsen.addModifierMethodsForCustomElements(modal, element);

          $onsen.declareVarAttribute(attrs, modal);
          element.data('ons-modal', modal);

          element[0]._ensureNodePosition();

          scope.$on('$destroy', function () {
            $onsen.removeModifierMethods(modal);
            element.data('ons-modal', undefined);
            modal = element = scope = attrs = null;
          });
        },

        post: function post(scope, element) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  var lastReady = window.OnsNavigatorElement.rewritables.ready;
  window.OnsNavigatorElement.rewritables.ready = ons._waitDiretiveInit('ons-navigator', lastReady);

  var lastLink = window.OnsNavigatorElement.rewritables.link;
  window.OnsNavigatorElement.rewritables.link = function (navigatorElement, target, options, callback) {
    var view = angular.element(navigatorElement).data('ons-navigator');
    view._compileAndLink(target, function (target) {
      lastLink(navigatorElement, target, options, callback);
    });
  };

  angular.module('onsen').directive('onsNavigator', ['NavigatorView', '$onsen', function (NavigatorView, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function compile(element) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function pre(scope, element, attrs, controller) {
            CustomElements.upgrade(element[0]);
            var navigator = new NavigatorView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, navigator);
            $onsen.registerEventHandlers(navigator, 'prepush prepop postpush postpop init show hide destroy');

            element.data('ons-navigator', navigator);

            scope.$on('$destroy', function () {
              navigator._events = undefined;
              element.data('ons-navigator', undefined);
              element = null;
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        CustomElements.upgrade(element[0]);
        return {
          pre: function pre(scope, element, attrs) {
            CustomElements.upgrade(element[0]);
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        CustomElements.upgrade(element[0]);
        return {
          pre: function pre(scope, element, attrs) {
            CustomElements.upgrade(element[0]);

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
 *     <span ng-switch="loader.getCurrentState()">
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
  'use strict'

  /**
   * Pull hook directive.
   */
  ;
  angular.module('onsen').directive('onsPullHook', ['$onsen', 'PullHookView', function ($onsen, PullHookView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      compile: function compile(element, attrs) {
        CustomElements.upgrade(element[0]);
        return {
          pre: function pre(scope, element, attrs) {
            CustomElements.upgrade(element[0]);
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  angular.module('onsen').directive('onsRange', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        CustomElements.upgrade(element[0]);

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
          scope = element = attrs;
        });
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  angular.module('onsen').directive('onsRipple', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, { viewKey: 'ons-ripple' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

/**
 * @element ons-sliding-menu
 * @category sliding-menu
 * @description
 *   [en]Component for sliding UI where one page is overlayed over another page. The above page can be slided aside to reveal the page behind.[/en]
 *   [ja]スライディングメニューを表現するためのコンポーネントで、片方のページが別のページの上にオーバーレイで表示されます。above-pageで指定されたページは、横からスライドして表示します。[/ja]
 * @codepen IDvFJ
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @guide UsingSlidingMenu
 *   [en]Using sliding menu[/en]
 *   [ja]スライディングメニューを使う[/ja]
 * @guide EventHandling
 *   [en]Using events[/en]
 *   [ja]イベントの利用[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-sliding-menu var="app.menu" main-page="page.html" menu-page="menu.html" max-slide-distance="200px" type="reveal" side="left">
 * </ons-sliding-menu>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *    <p style="text-align: center">
 *      <ons-button ng-click="app.menu.toggleMenu()">Toggle</ons-button>
 *    </p>
 *   </ons-page>
 * </ons-template>
 *
 * <ons-template id="menu.html">
 *   <ons-page>
 *     <!-- menu page's contents -->
 *   </ons-page>
 * </ons-template>
 *
 */

/**
 * @event preopen
 * @description
 *   [en]Fired just before the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開く前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @event postopen
 * @description
 *   [en]Fired just after the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開き終わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @event preclose
 * @description
 *   [en]Fired just before the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @event postclose
 * @description
 *   [en]Fired just after the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じ終わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this sliding menu.[/en]
 *  [ja]このスライディングメニューを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute menu-page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the menu page.[/en]
 *   [ja]左に位置するメニューページのURLを指定します。[/ja]
 */

/**
 * @attribute main-page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the main page.[/en]
 *   [ja]右に位置するメインページのURLを指定します。[/ja]
 */

/**
 * @attribute swipeable
 * @initonly
 * @type {Boolean}
 * @description
 *   [en]Whether to enable swipe interaction.[/en]
 *   [ja]スワイプ操作を有効にする場合に指定します。[/ja]
 */

/**
 * @attribute swipe-target-width
 * @initonly
 * @type {String}
 * @description
 *   [en]The width of swipeable area calculated from the left (in pixels). Use this to enable swipe only when the finger touch on the screen edge.[/en]
 *   [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
 */

/**
 * @attribute max-slide-distance
 * @initonly
 * @type {String}
 * @description
 *   [en]How far the menu page will slide open. Can specify both in px and %. eg. 90%, 200px[/en]
 *   [ja]menu-pageで指定されたページの表示幅を指定します。ピクセルもしくは%の両方で指定できます（例: 90%, 200px）[/ja]
 */

/**
 * @attribute side
 * @initonly
 * @type {String}
 * @description
 *   [en]Specify which side of the screen the menu page is located on. Possible values are "left" and "right".[/en]
 *   [ja]menu-pageで指定されたページが画面のどちら側から表示されるかを指定します。leftもしくはrightのいずれかを指定できます。[/ja]
 */

/**
 * @attribute type
 * @initonly
 * @type {String}
 * @description
 *   [en]Sliding menu animator. Possible values are reveal (default), push and overlay.[/en]
 *   [ja]スライディングメニューのアニメーションです。"reveal"（デフォルト）、"push"、"overlay"のいずれかを指定できます。[/ja]
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
 * @method setMainPage
 * @signature setMainPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.closeMenu]
 *   [en]If true the menu will be closed.[/en]
 *   [ja]trueを指定すると、開いているメニューを閉じます。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function that is executed after the page has been set.[/en]
 *   [ja]ページが読み込まれた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the main contents pane.[/en]
 *   [ja]中央部分に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @method setMenuPage
 * @signature setMenuPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.closeMenu]
 *   [en]If true the menu will be closed after the menu page has been set.[/en]
 *   [ja]trueを指定すると、開いているメニューを閉じます。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be executed after the menu page has been set.[/en]
 *   [ja]メニューページが読み込まれた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the side menu pane.[/en]
 *   [ja]メニュー部分に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @method openMenu
 * @signature openMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Slide the above layer to reveal the layer behind.[/en]
 *   [ja]メニューページを表示します。[/ja]
 */

/**
 * @method closeMenu
 * @signature closeMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じられた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Slide the above layer to hide the layer behind.[/en]
 *   [ja]メニューページを非表示にします。[/ja]
 */

/**
 * @method toggleMenu
 * @signature toggleMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened or closed.[/en]
 *   [ja]メニューが開き終わった後か、閉じ終わった後に呼び出される関数オブジェクトです。[/ja]
 * @description
 *   [en]Slide the above layer to reveal the layer behind if it is currently hidden, otherwise, hide the layer behind.[/en]
 *   [ja]現在の状況に合わせて、メニューページを表示もしくは非表示にします。[/ja]
 */

/**
 * @method isMenuOpened
 * @signature isMenuOpened()
 * @return {Boolean}
 *   [en]true if the menu is currently open.[/en]
 *   [ja]メニューが開いていればtrueとなります。[/ja]
 * @description
 *   [en]Returns true if the menu page is open, otherwise false.[/en]
 *   [ja]メニューページが開いている場合はtrue、そうでない場合はfalseを返します。[/ja]
 */

/**
 * @method getDeviceBackButtonHandler
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back-button handler.[/en]
 *   [ja]ons-sliding-menuに紐付いているバックボタンハンドラを取得します。[/ja]
 */

/**
 * @method setSwipeable
 * @signature setSwipeable(swipeable)
 * @param {Boolean} swipeable
 *   [en]If true the menu will be swipeable.[/en]
 *   [ja]スワイプで開閉できるようにする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Specify if the menu should be swipeable or not.[/en]
 *   [ja]スワイプで開閉するかどうかを設定する。[/ja]
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

  module.directive('onsSlidingMenu', ['$compile', 'SlidingMenuView', '$onsen', function ($compile, SlidingMenuView, $onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function compile(element, attrs) {
        var main = element[0].querySelector('.main'),
            menu = element[0].querySelector('.menu');

        if (main) {
          var mainHtml = angular.element(main).remove().html().trim();
        }

        if (menu) {
          var menuHtml = angular.element(menu).remove().html().trim();
        }

        return function (scope, element, attrs) {
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__menu ons-sliding-menu-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__main ons-sliding-menu-inner'));

          var slidingMenu = new SlidingMenuView(scope, element, attrs);

          $onsen.registerEventHandlers(slidingMenu, 'preopen preclose postopen postclose init show hide destroy');

          if (mainHtml && !attrs.mainPage) {
            slidingMenu._appendMainPage(null, mainHtml);
          }

          if (menuHtml && !attrs.menuPage) {
            slidingMenu._appendMenuPage(menuHtml);
          }

          $onsen.declareVarAttribute(attrs, slidingMenu);
          element.data('ons-sliding-menu', slidingMenu);

          scope.$on('$destroy', function () {
            slidingMenu._events = undefined;
            element.data('ons-sliding-menu', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

/**
 * @element ons-split-view
 * @category split-view
 * @description
 *  [en]Divides the screen into a left and right section.[/en]
 *  [ja]画面を左右に分割するコンポーネントです。[/ja]
 * @codepen nKqfv {wide}
 * @guide Usingonssplitviewcomponent
 *   [en]Using ons-split-view.[/en]
 *   [ja]ons-split-viewコンポーネントを使う[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-split-view
 *   secondary-page="secondary.html"
 *   main-page="main.html"
 *   main-page-width="70%"
 *   collapse="portrait">
 * </ons-split-view>
 */

/**
 * @event update
 * @description
 *   [en]Fired when the split view is updated.[/en]
 *   [ja]split viewの状態が更新された際に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Boolean} event.shouldCollapse
 *   [en]True if the view should collapse.[/en]
 *   [ja]collapse状態の場合にtrueになります。[/ja]
 * @param {String} event.currentMode
 *   [en]Current mode.[/en]
 *   [ja]現在のモード名を返します。"collapse"か"split"かのいずれかです。[/ja]
 * @param {Function} event.split
 *   [en]Call to force split.[/en]
 *   [ja]この関数を呼び出すと強制的にsplitモードにします。[/ja]
 * @param {Function} event.collapse
 *   [en]Call to force collapse.[/en]
 *   [ja]この関数を呼び出すと強制的にcollapseモードにします。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewの幅を返します。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"かもしくは"landscape"です。 [/ja]
 */

/**
 * @event presplit
 * @description
 *   [en]Fired just before the view is split.[/en]
 *   [ja]split状態にる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @event postsplit
 * @description
 *   [en]Fired just after the view is split.[/en]
 *   [ja]split状態になった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @event precollapse
 * @description
 *   [en]Fired just before the view is collapsed.[/en]
 *   [ja]collapse状態になる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @event postcollapse
 * @description
 *   [en]Fired just after the view is collapsed.[/en]
 *   [ja]collapse状態になった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
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
 * @attribute main-page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the page on the right.[/en]
 *   [ja]右側に表示するページのURLを指定します。[/ja]
 */

/**
 * @attribute main-page-width
 * @initonly
 * @type {Number}
 * @description
 *   [en]Main page width percentage. The secondary page width will be the remaining percentage.[/en]
 *   [ja]右側のページの幅をパーセント単位で指定します。[/ja]
 */

/**
 * @attribute secondary-page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the page on the left.[/en]
 *   [ja]左側に表示するページのURLを指定します。[/ja]
 */

/**
 * @attribute collapse
 * @initonly
 * @type {String}
 * @description
 *   [en]
 *     Specify the collapse behavior. Valid values are portrait, landscape, width #px or a media query.
 *     "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation.
 *     "width #px" means the view will collapse when the window width is smaller than the specified #px.
 *     If the value is a media query, the view will collapse when the media query is true.
 *   [/en]
 *   [ja]
 *     左側のページを非表示にする条件を指定します。portrait, landscape、width #pxもしくはメディアクエリの指定が可能です。
 *     portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。
 *     width #pxを指定すると、画面が指定した横幅よりも短い場合に適用されます。
 *     メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。
 *   [/ja]
 */

/**
 * @attribute ons-update
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "update" event is fired.[/en]
 *  [ja]"update"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-presplit
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "presplit" event is fired.[/en]
 *  [ja]"presplit"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-precollapse
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "precollapse" event is fired.[/en]
 *  [ja]"precollapse"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postsplit
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postsplit" event is fired.[/en]
 *  [ja]"postsplit"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postcollapse
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postcollapse" event is fired.[/en]
 *  [ja]"postcollapse"イベントが発火された時の挙動を独自に指定できます。[/ja]
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
 * @method setMainPage
 * @signature setMainPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the right section[/en]
 *   [ja]指定したURLをメインページを読み込みます。[/ja]
 */

/**
 * @method setSecondaryPage
 * @signature setSecondaryPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the left section[/en]
 *   [ja]指定したURLを左のページの読み込みます。[/ja]
 */

/**
 * @method update
 * @signature update()
 * @description
 *   [en]Trigger an 'update' event and try to determine if the split behavior should be changed.[/en]
 *   [ja]splitモードを変えるべきかどうかを判断するための'update'イベントを発火します。[/ja]
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

  module.directive('onsSplitView', ['$compile', 'SplitView', '$onsen', function ($compile, SplitView, $onsen) {

    return {
      restrict: 'E',
      replace: false,
      transclude: false,
      scope: true,

      compile: function compile(element, attrs) {
        var mainPage = element[0].querySelector('.main-page'),
            secondaryPage = element[0].querySelector('.secondary-page');

        if (mainPage) {
          var mainHtml = angular.element(mainPage).remove().html().trim();
        }

        if (secondaryPage) {
          var secondaryHtml = angular.element(secondaryPage).remove().html().trim();
        }

        return function (scope, element, attrs) {
          element.append(angular.element('<div></div>').addClass('onsen-split-view__secondary full-screen ons-split-view-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-split-view__main full-screen ons-split-view-inner'));

          var splitView = new SplitView(scope, element, attrs);

          if (mainHtml && !attrs.mainPage) {
            splitView._appendMainPage(mainHtml);
          }

          if (secondaryHtml && !attrs.secondaryPage) {
            splitView._appendSecondPage(secondaryHtml);
          }

          $onsen.declareVarAttribute(attrs, splitView);
          $onsen.registerEventHandlers(splitView, 'update presplit precollapse postsplit postcollapse init show hide destroy');

          element.data('ons-split-view', splitView);

          scope.$on('$destroy', function () {
            splitView._events = undefined;
            element.data('ons-split-view', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        CustomElements.upgrade(element[0]);

        return function (scope, element, attrs) {
          CustomElements.upgrade(element[0]);

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

  var lastReady = window.OnsSplitterContentElement.rewritables.ready;
  window.OnsSplitterContentElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-content', lastReady);

  var lastLink = window.OnsSplitterContentElement.rewritables.link;
  window.OnsSplitterContentElement.rewritables.link = function (element, target, options, callback) {
    var view = angular.element(element).data('ons-splitter-content');
    lastLink(element, target, options, function (target) {
      view._link(target, callback);
    });
  };

  angular.module('onsen').directive('onsSplitterContent', ['$compile', 'SplitterContent', '$onsen', function ($compile, SplitterContent, $onsen) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function (scope, element, attrs) {
          CustomElements.upgrade(element[0]);

          var view = new SplitterContent(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-content', view);

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
(function () {
  'use strict';

  var lastReady = window.OnsSplitterSideElement.rewritables.ready;
  window.OnsSplitterSideElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-side', lastReady);

  var lastLink = window.OnsSplitterSideElement.rewritables.link;
  window.OnsSplitterSideElement.rewritables.link = function (element, target, options, callback) {
    var view = angular.element(element).data('ons-splitter-side');
    lastLink(element, target, options, function (target) {
      view._link(target, callback);
    });
  };

  angular.module('onsen').directive('onsSplitterSide', ['$compile', 'SplitterSide', '$onsen', function ($compile, SplitterSide, $onsen) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function (scope, element, attrs) {
          CustomElements.upgrade(element[0]);

          var view = new SplitterSide(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-side', view);

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        CustomElements.upgrade(element[0]);

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  tab.$inject = ['$onsen'];
  angular.module('onsen').directive('onsTab', tab).directive('onsTabbarItem', tab); // for BC

  function tab($onsen) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
 * @attribute hide-tabs
 * @initonly
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Whether to hide the tabs. Valid values are true/false.[/en]
 *   [ja]タブを非表示にする場合に指定します。trueもしくはfalseを指定できます。[/ja]
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

  var lastReady = window.OnsTabbarElement.rewritables.ready;
  window.OnsTabbarElement.rewritables.ready = ons._waitDiretiveInit('ons-tabbar', lastReady);

  var lastLink = window.OnsTabbarElement.rewritables.link;
  window.OnsTabbarElement.rewritables.link = function (tabbarElement, target, options, callback) {
    var view = angular.element(tabbarElement).data('ons-tabbar');
    view._compileAndLink(target, function (target) {
      lastLink(tabbarElement, target, options, callback);
    });
  };

  var lastUnlink = window.OnsTabbarElement.rewritables.unlink;
  window.OnsTabbarElement.rewritables.unlink = function (tabbarElement, target, callback) {
    angular.element(target).data('_scope').$destroy();
    lastUnlink(tabbarElement, target, callback);
  };

  angular.module('onsen').directive('onsTabbar', ['$onsen', '$compile', '$parse', 'TabbarView', function ($onsen, $compile, $parse, TabbarView) {

    return {
      restrict: 'E',

      replace: false,
      scope: true,

      link: function link(scope, element, attrs, controller) {

        CustomElements.upgrade(element[0]);

        scope.$watch(attrs.hideTabs, function (hide) {
          if (typeof hide === 'string') {
            hide = hide === 'true';
          }
          element[0].setTabbarVisibility(!hide);
        });

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

(function () {
  'use strict';

  angular.module('onsen').directive('onsTemplate', ['$templateCache', function ($templateCache) {
    return {
      restrict: 'E',
      terminal: true,
      compile: function compile(element) {
        CustomElements.upgrade(element[0]);
        var content = element[0].template || element.html();
        $templateCache.put(element.attr('id'), content);
      }
    };
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
        CustomElements.upgrade(element[0]);
        return {
          pre: function pre(scope, element, attrs) {
            // TODO: Remove this dirty fix!
            if (element[0].nodeName === 'ons-toolbar') {
              CustomElements.upgrade(element[0]);
              GenericView.register(scope, element, attrs, { viewKey: 'ons-toolbar' });
              element[0]._ensureNodePosition();
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
          CustomElements.upgrade(element[0]);
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
  module.factory('$onsen', ['$rootScope', '$window', '$cacheFactory', '$document', '$templateCache', '$http', '$q', '$onsGlobal', 'ComponentCleaner', function ($rootScope, $window, $cacheFactory, $document, $templateCache, $http, $q, $onsGlobal, ComponentCleaner) {

    var $onsen = createOnsenService();
    var ModifierUtil = $onsGlobal._internal.ModifierUtil;

    return $onsen;

    function createOnsenService() {
      return {

        DIRECTIVE_TEMPLATE_URL: 'templates',

        cleaner: ComponentCleaner,

        DeviceBackButtonHandler: $onsGlobal._deviceBackButtonDispatcher,

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
              view.emit(eventName, map(Object.create(event.detail)));
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
            }).then((function (response) {
              var html = response.data;

              return this.normalizePageHTML(html);
            }).bind(this));
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
            $onsen.fireComponentEvent(component._element[0], eventName, event);

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
          return !!window.navigator.userAgent.match(/android/i);
        },

        /**
         * @return {Boolean}
         */
        isIOS: function isIOS() {
          return !!window.navigator.userAgent.match(/(ipad|iphone|ipod touch)/i);
        },

        /**
         * @return {Boolean}
         */
        isWebView: function isWebView() {
          return window.ons.isWebView();
        },

        /**
         * @return {Boolean}
         */
        isIOS7above: (function () {
          var ua = window.navigator.userAgent;
          var match = ua.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (\d+)_(\d+)/i);

          var result = match ? parseFloat(match[2] + '.' + match[3]) >= 7 : false;

          return function () {
            return result;
          };
        })(),

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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

ons.notification.alert = function (message) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  typeof message === 'string' ? options.message = message : options = message;

  var originalCompile = options.compile || function (element) {
    return element;
  };

  options.compile = function (element) {
    ons.compile(originalCompile(element));
  };

  return ons.notification._alertOriginal(options);
};

ons.notification.confirm = function (message) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  typeof message === 'string' ? options.message = message : options = message;

  var originalCompile = options.compile || function (element) {
    return element;
  };

  options.compile = function (element) {
    ons.compile(originalCompile(element));
  };

  return ons.notification._confirmOriginal(options);
};

ons.notification.prompt = function (message) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  typeof message === 'string' ? options.message = message : options = message;

  var originalCompile = options.compile || function (element) {
    return element;
  };

  options.compile = function (element) {
    ons.compile(originalCompile(element));
  };

  return ons.notification._promptOriginal(options);
};
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

// confirm to use jqLite
if (window.jQuery && angular.element === window.jQuery) {
  console.warn('Onsen UI require jqLite. Load jQuery after loading AngularJS to fix this error. jQuery may break Onsen UI behavior.'); // eslint-disable-line no-console
}
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXItb25zZW51aS5qcyIsImNsYXNzLmpzIiwidGVtcGxhdGVzLmpzIiwib25zZW4uanMiLCJhbGVydERpYWxvZy5qcyIsImFsZXJ0RGlhbG9nQW5pbWF0b3IuanMiLCJhbmltYXRpb25DaG9vc2VyLmpzIiwiY2Fyb3VzZWwuanMiLCJkaWFsb2cuanMiLCJkaWFsb2dBbmltYXRvci5qcyIsImdlbmVyaWMuanMiLCJsYXp5UmVwZWF0LmpzIiwibGF6eVJlcGVhdERlbGVnYXRlLmpzIiwibW9kYWwuanMiLCJuYXZpZ2F0b3IuanMiLCJuYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IuanMiLCJvdmVybGF5U2xpZGluZ01lbnVBbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJwdXNoU2xpZGluZ01lbnVBbmltYXRvci5qcyIsInJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzbGlkaW5nTWVudS5qcyIsInNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzcGxpdFZpZXcuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsImJhY2tCdXR0b24uanMiLCJib3R0b21Ub29sYmFyLmpzIiwiYnV0dG9uLmpzIiwiZHVtbXlGb3JJbml0LmpzIiwiZ2VzdHVyZURldGVjdG9yLmpzIiwiaWNvbi5qcyIsImlmT3JpZW50YXRpb24uanMiLCJpZlBsYXRmb3JtLmpzIiwiaW5wdXQuanMiLCJrZXlib2FyZC5qcyIsImxpc3QuanMiLCJsaXN0SGVhZGVyLmpzIiwibGlzdEl0ZW0uanMiLCJsb2FkaW5nUGxhY2Vob2xkZXIuanMiLCJwcm9ncmVzc0Jhci5qcyIsInJhbmdlLmpzIiwicmlwcGxlLmpzIiwic2NvcGUuanMiLCJzcGxpdHRlckNvbnRlbnQuanMiLCJzcGxpdHRlclNpZGUuanMiLCJ0YWIuanMiLCJ0YWJCYXIuanMiLCJ0ZW1wbGF0ZS5qcyIsInRvb2xiYXIuanMiLCJ0b29sYmFyQnV0dG9uLmpzIiwiY29tcG9uZW50Q2xlYW5lci5qcyIsIm5vdGlmaWNhdGlvbi5qcyIsInNldHVwLmpzIiwidGVtcGxhdGVMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxBQ0RBOzs7OztBQUtBLENBQUMsWUFBVTtFQUNULElBQUksZUFBZTtNQUFPLFNBQVMsTUFBTSxLQUFLLFlBQVU7SUFFdEQ7T0FGZ0UsZUFBZTs7O0VBTWpGLEtBSEssUUFBUSxZQUFVOzs7RUFNdkIsTUFITSxTQUFTLFVBQVMsTUFBTTtJQUk1QixJQUhJLFNBQVMsS0FBSzs7OztJQU9sQixlQUhlO0lBSWYsSUFISSxZQUFZLElBQUk7SUFJcEIsZUFIZTs7O0lBTWYsS0FISyxJQUFJLFFBQVEsTUFBTTs7TUFLckIsVUFIVSxRQUFRLE9BQU8sS0FBSyxTQUFTLGNBQ3JDLE9BQU8sT0FBTyxTQUFTLGNBQWMsT0FBTyxLQUFLLEtBQUssU0FDdEQsQ0FBQyxVQUFTLE1BQU0sSUFBRztRQUVuQixPQURTLFlBQVc7VUFFbEIsSUFETSxNQUFNLEtBQUs7Ozs7VUFLakIsS0FETyxTQUFTLE9BQU87Ozs7VUFLdkIsSUFETSxNQUFNLEdBQUcsTUFBTSxNQUFNO1VBRTNCLEtBRE8sU0FBUzs7VUFHaEIsT0FEUzs7U0FFUixNQUFNLEtBQUssU0FDZCxLQUFLOzs7O0lBSVQsU0FBUyxRQUFROztNQUVmLElBQUssQ0FBQyxnQkFBZ0IsS0FBSyxNQUN6QixLQUFLLEtBQUssTUFBTSxNQUFNOzs7O0lBRzFCLE1BQ00sWUFBWTs7O0lBRWxCLE1BQ00sVUFBVSxjQUFjOzs7SUFFOUIsTUFDTSxTQUFTLFVBQVU7O0lBQ3pCLE9BQ087O0tBRVA7QUMvREo7QUFDQSxDQUFDLFVBQVMsS0FBSztJQUNYLElBQUE7UUFDSSxNQURJLFFBQVEsT0FBTztNQUMzQixPQUFNLEtBQUs7UUFFSCxNQUZXLFFBQVEsT0FBTyxrQkFB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QUFPLGlCQUFpQixPQUFPLGVBQWUsVUFBVSxjQUFjLFNBQVMsWUFBWTs7O0FBRzdHLGFBQWEsNEJBQTRCLFVBQVUsTUFBTSxNQUFNO0VBQzdELElBQUksQ0FBQyxNQUFNO0lBQ1QsTUFBTSxJQUFJLGVBQWU7OztFQUczQixPQUFPLFNBQVMsT0FBTyxTQUFTLFlBQVksT0FBTyxTQUFTLGNBQWMsT0FBTzs7O0FBR25GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMURBLENBQUMsWUFBVTtFQThFVDs7RUFFQSxRQTdFUSxPQUFPLFNBQVMsdUJBQUksVUFBUyxnQkFBZ0I7SUE4RW5ELElBN0VJLFlBQVksT0FBTyxTQUFTLGlCQUFpQjs7SUErRWpELEtBN0VLLElBQUksSUFBSSxHQUFHLElBQUksVUFBVSxRQUFRLEtBQUs7TUE4RXpDLElBN0VJLFdBQVcsUUFBUSxRQUFRLFVBQVU7TUE4RXpDLElBN0VJLEtBQUssU0FBUyxLQUFLO01BOEV2QixJQTdFSSxPQUFPLE9BQU8sVUFBVTtRQThFMUIsZUE3RWUsSUFBSSxJQUFJLFNBQVM7Ozs7S0FLcEMiLCJmaWxlIjoiYW5ndWxhci1vbnNlbnVpLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsLCIvKiBTaW1wbGUgSmF2YVNjcmlwdCBJbmhlcml0YW5jZVxuICogQnkgSm9obiBSZXNpZyBodHRwOi8vZWpvaG4ub3JnL1xuICogTUlUIExpY2Vuc2VkLlxuICovXG4vLyBJbnNwaXJlZCBieSBiYXNlMiBhbmQgUHJvdG90eXBlXG4oZnVuY3Rpb24oKXtcbiAgdmFyIGluaXRpYWxpemluZyA9IGZhbHNlLCBmblRlc3QgPSAveHl6Ly50ZXN0KGZ1bmN0aW9uKCl7eHl6O30pID8gL1xcYl9zdXBlclxcYi8gOiAvLiovO1xuIFxuICAvLyBUaGUgYmFzZSBDbGFzcyBpbXBsZW1lbnRhdGlvbiAoZG9lcyBub3RoaW5nKVxuICB0aGlzLkNsYXNzID0gZnVuY3Rpb24oKXt9O1xuIFxuICAvLyBDcmVhdGUgYSBuZXcgQ2xhc3MgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgY2xhc3NcbiAgQ2xhc3MuZXh0ZW5kID0gZnVuY3Rpb24ocHJvcCkge1xuICAgIHZhciBfc3VwZXIgPSB0aGlzLnByb3RvdHlwZTtcbiAgIFxuICAgIC8vIEluc3RhbnRpYXRlIGEgYmFzZSBjbGFzcyAoYnV0IG9ubHkgY3JlYXRlIHRoZSBpbnN0YW5jZSxcbiAgICAvLyBkb24ndCBydW4gdGhlIGluaXQgY29uc3RydWN0b3IpXG4gICAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgICB2YXIgcHJvdG90eXBlID0gbmV3IHRoaXMoKTtcbiAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgIFxuICAgIC8vIENvcHkgdGhlIHByb3BlcnRpZXMgb3ZlciBvbnRvIHRoZSBuZXcgcHJvdG90eXBlXG4gICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wKSB7XG4gICAgICAvLyBDaGVjayBpZiB3ZSdyZSBvdmVyd3JpdGluZyBhbiBleGlzdGluZyBmdW5jdGlvblxuICAgICAgcHJvdG90eXBlW25hbWVdID0gdHlwZW9mIHByb3BbbmFtZV0gPT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIHR5cGVvZiBfc3VwZXJbbmFtZV0gPT0gXCJmdW5jdGlvblwiICYmIGZuVGVzdC50ZXN0KHByb3BbbmFtZV0pID9cbiAgICAgICAgKGZ1bmN0aW9uKG5hbWUsIGZuKXtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5fc3VwZXI7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWRkIGEgbmV3IC5fc3VwZXIoKSBtZXRob2QgdGhhdCBpcyB0aGUgc2FtZSBtZXRob2RcbiAgICAgICAgICAgIC8vIGJ1dCBvbiB0aGUgc3VwZXItY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gX3N1cGVyW25hbWVdO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRoZSBtZXRob2Qgb25seSBuZWVkIHRvIGJlIGJvdW5kIHRlbXBvcmFyaWx5LCBzbyB3ZVxuICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IHdoZW4gd2UncmUgZG9uZSBleGVjdXRpbmdcbiAgICAgICAgICAgIHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9zdXBlciA9IHRtcDtcbiAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKG5hbWUsIHByb3BbbmFtZV0pIDpcbiAgICAgICAgcHJvcFtuYW1lXTtcbiAgICB9XG4gICBcbiAgICAvLyBUaGUgZHVtbXkgY2xhc3MgY29uc3RydWN0b3JcbiAgICBmdW5jdGlvbiBDbGFzcygpIHtcbiAgICAgIC8vIEFsbCBjb25zdHJ1Y3Rpb24gaXMgYWN0dWFsbHkgZG9uZSBpbiB0aGUgaW5pdCBtZXRob2RcbiAgICAgIGlmICggIWluaXRpYWxpemluZyAmJiB0aGlzLmluaXQgKVxuICAgICAgICB0aGlzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICBcbiAgICAvLyBQb3B1bGF0ZSBvdXIgY29uc3RydWN0ZWQgcHJvdG90eXBlIG9iamVjdFxuICAgIENsYXNzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgIFxuICAgIC8vIEVuZm9yY2UgdGhlIGNvbnN0cnVjdG9yIHRvIGJlIHdoYXQgd2UgZXhwZWN0XG4gICAgQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2xhc3M7XG4gXG4gICAgLy8gQW5kIG1ha2UgdGhpcyBjbGFzcyBleHRlbmRhYmxlXG4gICAgQ2xhc3MuZXh0ZW5kID0gYXJndW1lbnRzLmNhbGxlZTtcbiAgIFxuICAgIHJldHVybiBDbGFzcztcbiAgfTtcbn0pKCk7IiwiLy9IRUFEIFxuKGZ1bmN0aW9uKGFwcCkge1xudHJ5IHsgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJ0ZW1wbGF0ZXMtbWFpblwiKTsgfVxuY2F0Y2goZXJyKSB7IGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwidGVtcGxhdGVzLW1haW5cIiwgW10pOyB9XG5hcHAucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG5cInVzZSBzdHJpY3RcIjtcblxuJHRlbXBsYXRlQ2FjaGUucHV0KFwidGVtcGxhdGVzL3NsaWRpbmdfbWVudS50cGxcIixcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNsaWRpbmctbWVudV9fbWVudSBvbnMtc2xpZGluZy1tZW51LWlubmVyXFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCI8ZGl2IGNsYXNzPVxcXCJvbnNlbi1zbGlkaW5nLW1lbnVfX21haW4gb25zLXNsaWRpbmctbWVudS1pbm5lclxcXCI+PC9kaXY+XFxuXCIgK1xuICAgIFwiXCIpXG5cbiR0ZW1wbGF0ZUNhY2hlLnB1dChcInRlbXBsYXRlcy9zcGxpdF92aWV3LnRwbFwiLFwiPGRpdiBjbGFzcz1cXFwib25zZW4tc3BsaXQtdmlld19fc2Vjb25kYXJ5IGZ1bGwtc2NyZWVuIG9ucy1zcGxpdC12aWV3LWlubmVyXFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCI8ZGl2IGNsYXNzPVxcXCJvbnNlbi1zcGxpdC12aWV3X19tYWluIGZ1bGwtc2NyZWVuIG9ucy1zcGxpdC12aWV3LWlubmVyXFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCJcIilcbn1dKTtcbn0pKCk7IiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHNlcnZpY2UgY2xhc3MgZm9yIGZyYW1ld29yayBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCckb25zZW4nLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkd2luZG93LCAkY2FjaGVGYWN0b3J5LCAkZG9jdW1lbnQsICR0ZW1wbGF0ZUNhY2hlLCAkaHR0cCwgJHEsICRvbnNHbG9iYWwsIENvbXBvbmVudENsZWFuZXIpIHtcblxuICAgIHZhciAkb25zZW4gPSBjcmVhdGVPbnNlblNlcnZpY2UoKTtcbiAgICB2YXIgTW9kaWZpZXJVdGlsID0gJG9uc0dsb2JhbC5faW50ZXJuYWwuTW9kaWZpZXJVdGlsO1xuXG4gICAgcmV0dXJuICRvbnNlbjtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9uc2VuU2VydmljZSgpIHtcbiAgICAgIHJldHVybiB7XG5cbiAgICAgICAgRElSRUNUSVZFX1RFTVBMQVRFX1VSTDogJ3RlbXBsYXRlcycsXG5cbiAgICAgICAgY2xlYW5lcjogQ29tcG9uZW50Q2xlYW5lcixcblxuICAgICAgICBEZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGV2aWNlQmFja0J1dHRvbkRpc3BhdGNoZXIsXG5cbiAgICAgICAgX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtZXRob2ROYW1lc1xuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3Bvc2UgYWxsIGRyaXZpbmcgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZU1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIG1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2aWV3W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50W21ldGhvZE5hbWVdLmFwcGx5KGVsZW1lbnQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtDbGFzc30ga2xhc3NcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50OiBmdW5jdGlvbihrbGFzcywgcHJvcGVydGllcykge1xuICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtsYXNzLnByb3RvdHlwZSwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldID0gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50TmFtZXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW21hcF1cbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBjbGVhciBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVFdmVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIGV2ZW50TmFtZXMsIG1hcCkge1xuICAgICAgICAgIG1hcCA9IG1hcCB8fCBmdW5jdGlvbihkZXRhaWwpIHsgcmV0dXJuIGRldGFpbDsgfTtcbiAgICAgICAgICBldmVudE5hbWVzID0gW10uY29uY2F0KGV2ZW50TmFtZXMpO1xuICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHZpZXcuZW1pdChldmVudE5hbWUsIG1hcChPYmplY3QuY3JlYXRlKGV2ZW50LmRldGFpbCkpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJzW2luZGV4XSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IGxpc3RlbmVycyA9IG1hcCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzRW5hYmxlZEF1dG9TdGF0dXNCYXJGaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISEkb25zR2xvYmFsLl9jb25maWcuYXV0b1N0YXR1c0JhckZpbGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRGaWxsU3RhdHVzQmFyOiAkb25zR2xvYmFsLnNob3VsZEZpbGxTdGF0dXNCYXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b1N0YXR1c0JhckZpbGw6ICRvbnNHbG9iYWwuYXV0b1N0YXR1c0JhckZpbGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgICAgICogQHBhcmFtIHtTY29wZX0gW3BhcmFtcy5zY29wZV1cbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IFtwYXJhbXMuZWxlbWVudF1cbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW3BhcmFtcy5lbGVtZW50c11cbiAgICAgICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBbcGFyYW1zLmF0dHJzXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xlYXJDb21wb25lbnQ6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICAgIGlmIChwYXJhbXMuc2NvcGUpIHtcbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHBhcmFtcy5zY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5hdHRycykge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhwYXJhbXMuYXR0cnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuZWxlbWVudCkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95RWxlbWVudChwYXJhbXMuZWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50cykge1xuICAgICAgICAgICAgcGFyYW1zLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZEVsZW1lbnRlT2JqZWN0OiBmdW5jdGlvbihlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaW5oZXJpdGVkRGF0YShuYW1lKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBhZ2VIVE1MQXN5bmM6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICB2YXIgY2FjaGUgPSAkdGVtcGxhdGVDYWNoZS5nZXQocGFnZSk7XG5cbiAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIHZhciBodG1sID0gdHlwZW9mIGNhY2hlID09PSAnc3RyaW5nJyA/IGNhY2hlIDogY2FjaGVbMV07XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICB1cmw6IHBhZ2UsXG4gICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgdmFyIGh0bWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZVBhZ2VIVE1MKGh0bWwpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIG5vcm1hbGl6ZVBhZ2VIVE1MOiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaHRtbCA9ICgnJyArIGh0bWwpLnRyaW0oKTtcblxuICAgICAgICAgIGlmICghaHRtbC5tYXRjaCgvXjxvbnMtcGFnZS8pKSB7XG4gICAgICAgICAgICBodG1sID0gJzxvbnMtcGFnZSBfbXV0ZWQ+JyArIGh0bWwgKyAnPC9vbnMtcGFnZT4nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgbW9kaWZpZXIgdGVtcGxhdGVyIGZ1bmN0aW9uLiBUaGUgbW9kaWZpZXIgdGVtcGxhdGVyIGdlbmVyYXRlIGNzcyBjbGFzc2VzIGJvdW5kIG1vZGlmaWVyIG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbbW9kaWZpZXJzXSBhbiBhcnJheSBvZiBhcHBlbmRpeCBtb2RpZmllclxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdlbmVyYXRlTW9kaWZpZXJUZW1wbGF0ZXI6IGZ1bmN0aW9uKGF0dHJzLCBtb2RpZmllcnMpIHtcbiAgICAgICAgICB2YXIgYXR0ck1vZGlmaWVycyA9IGF0dHJzICYmIHR5cGVvZiBhdHRycy5tb2RpZmllciA9PT0gJ3N0cmluZycgPyBhdHRycy5tb2RpZmllci50cmltKCkuc3BsaXQoLyArLykgOiBbXTtcbiAgICAgICAgICBtb2RpZmllcnMgPSBhbmd1bGFyLmlzQXJyYXkobW9kaWZpZXJzKSA/IGF0dHJNb2RpZmllcnMuY29uY2F0KG1vZGlmaWVycykgOiBhdHRyTW9kaWZpZXJzO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSB0ZW1wbGF0ZSBlZy4gJ29ucy1idXR0b24tLSonLCAnb25zLWJ1dHRvbi0tKl9faXRlbSdcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kaWZpZXJzLm1hcChmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgnKicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgbW9kaWZpZXIgbWV0aG9kcyB0byB2aWV3IG9iamVjdCBmb3IgY3VzdG9tIGVsZW1lbnRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzOiBmdW5jdGlvbih2aWV3LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBoYXNNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBNb2RpZmllclV0aWwuc3BsaXQoZWxlbWVudC5hdHRyKCdtb2RpZmllcicpKTtcbiAgICAgICAgICAgICAgbmVlZGxlID0gdHlwZW9mIG5lZWRsZSA9PT0gJ3N0cmluZycgPyBuZWVkbGUudHJpbSgpIDogJyc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIE1vZGlmaWVyVXRpbC5zcGxpdChuZWVkbGUpLnNvbWUoZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2Vucy5pbmRleE9mKG5lZWRsZSkgIT0gLTE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICB2YXIgbW9kaWZpZXIgPSBNb2RpZmllclV0aWwuc3BsaXQoZWxlbWVudC5hdHRyKCdtb2RpZmllcicpKS5maWx0ZXIoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gIT09IG5lZWRsZTtcbiAgICAgICAgICAgICAgfSkuam9pbignICcpO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIGVsZW1lbnQuYXR0cignbW9kaWZpZXInKSArICcgJyArIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc01vZGlmaWVyKG1vZGlmaWVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kaWZpZXIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTW9kaWZpZXIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZvciAodmFyIG1ldGhvZCBpbiBtZXRob2RzKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kXSA9IG1ldGhvZHNbbWV0aG9kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBhZGRNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIHRlbXBsYXRlLCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIF90ciA9IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgnKicsIG1vZGlmaWVyKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGZucyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5oYXNDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZU1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYWRkTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmF0dHIoJ2NsYXNzJykuc3BsaXQoL1xccysvKSxcbiAgICAgICAgICAgICAgICAgIHBhdHQgPSB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgJy4nKTtcblxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gY2xhc3Nlc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChjbHMubWF0Y2gocGF0dCkpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHZhciBjbHMgPSBfdHIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcyhjbHMpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYXBwZW5kID0gZnVuY3Rpb24ob2xkRm4sIG5ld0ZuKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9sZEZuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZEZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfHwgbmV3Rm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXdGbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmlldy5oYXNNb2RpZmllciA9IGFwcGVuZCh2aWV3Lmhhc01vZGlmaWVyLCBmbnMuaGFzTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcucmVtb3ZlTW9kaWZpZXIgPSBhcHBlbmQodmlldy5yZW1vdmVNb2RpZmllciwgZm5zLnJlbW92ZU1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuYWRkTW9kaWZpZXIsIGZucy5hZGRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5zZXRNb2RpZmllciA9IGFwcGVuZCh2aWV3LnNldE1vZGlmaWVyLCBmbnMuc2V0TW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcudG9nZ2xlTW9kaWZpZXIgPSBhcHBlbmQodmlldy50b2dnbGVNb2RpZmllciwgZm5zLnRvZ2dsZU1vZGlmaWVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIG1vZGlmaWVyIG1ldGhvZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlTW9kaWZpZXJNZXRob2RzOiBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgICAgdmlldy5oYXNNb2RpZmllciA9IHZpZXcucmVtb3ZlTW9kaWZpZXIgPVxuICAgICAgICAgICAgdmlldy5hZGRNb2RpZmllciA9IHZpZXcuc2V0TW9kaWZpZXIgPVxuICAgICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdmFyaWFibGUgdG8gSmF2YVNjcmlwdCBnbG9iYWwgc2NvcGUgYW5kIEFuZ3VsYXJKUyBzY29wZSBhcyAndmFyJyBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGRlY2xhcmVWYXJBdHRyaWJ1dGU6IGZ1bmN0aW9uKGF0dHJzLCBvYmplY3QpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGF0dHJzLnZhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciB2YXJOYW1lID0gYXR0cnMudmFyO1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5lVmFyKHZhck5hbWUsIG9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZWdpc3RlckV2ZW50SGFuZGxlcjogZnVuY3Rpb24oY29tcG9uZW50LCBldmVudE5hbWUpIHtcbiAgICAgICAgICB2YXIgY2FwaXRhbGl6ZWRFdmVudE5hbWUgPSBldmVudE5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBldmVudE5hbWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICBjb21wb25lbnQub24oZXZlbnROYW1lLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChjb21wb25lbnQuX2VsZW1lbnRbMF0sIGV2ZW50TmFtZSwgZXZlbnQpO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGNvbXBvbmVudC5fYXR0cnNbJ29ucycgKyBjYXBpdGFsaXplZEV2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsKGhhbmRsZXIsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVycyBmb3IgYXR0cmlidXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBldmVudE5hbWVzID0gZXZlbnROYW1lcy50cmltKCkuc3BsaXQoL1xccysvKTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnROYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudE5hbWVzW2ldO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudEhhbmRsZXIoY29tcG9uZW50LCBldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzQW5kcm9pZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2FuZHJvaWQvaSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpcGFkfGlwaG9uZXxpcG9kIHRvdWNoKS9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzV2ViVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5vbnMuaXNXZWJWaWV3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzdhYm92ZTogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCB0b3VjaCk7LipDUFUuKk9TIChcXGQrKV8oXFxkKykvaSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzJdICsgJy4nICsgbWF0Y2hbM10pID49IDcgOiBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZSBhIG5hbWVkIGV2ZW50IGZvciBhIGNvbXBvbmVudC4gVGhlIHZpZXcgb2JqZWN0LCBpZiBpdCBleGlzdHMsIGlzIGF0dGFjaGVkIHRvIGV2ZW50LmNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpcmVDb21wb25lbnRFdmVudDogZnVuY3Rpb24oZG9tLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBldmVudFtrZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LmNvbXBvbmVudCA9IGRvbSA/XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9tKS5kYXRhKGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgICBldmVudC5pbml0RXZlbnQoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnOicgKyBldmVudE5hbWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZG9tLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vJywgJ2Zvby12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vIGFuZCAkc2NvcGUuZm9vIGlzIG5vdyAnZm9vLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vLmJhcicsICdmb28tYmFyLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28uYmFyIGFuZCAkc2NvcGUuZm9vLmJhciBpcyBub3cgJ2Zvby1iYXItdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZpbmVWYXI6IGZ1bmN0aW9uKG5hbWUsIG9iamVjdCkge1xuICAgICAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoL1xcLi8pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0KGNvbnRhaW5lciwgbmFtZXMsIG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZV0gPT09IHVuZGVmaW5lZCB8fCBjb250YWluZXJbbmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJbbmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dICE9PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHZhcj1cIicgKyBvYmplY3QuX2F0dHJzLnZhciArICdcIiBiZWNhdXNlIGl0IHdpbGwgb3ZlcndyaXRlIGEgcmVhZC1vbmx5IHZhcmlhYmxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvbnMuY29tcG9uZW50QmFzZSkge1xuICAgICAgICAgICAgc2V0KG9ucy5jb21wb25lbnRCYXNlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBdHRhY2ggdG8gYW5jZXN0b3Igd2l0aCBvbnMtc2NvcGUgYXR0cmlidXRlLlxuICAgICAgICAgIHZhciBlbGVtZW50ID0gb2JqZWN0Ll9lbGVtZW50WzBdO1xuXG4gICAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdvbnMtc2NvcGUnKSkge1xuICAgICAgICAgICAgICBzZXQoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAvLyBJZiBubyBvbnMtc2NvcGUgZWxlbWVudCB3YXMgZm91bmQsIGF0dGFjaCB0byAkcm9vdFNjb3BlLlxuICAgICAgICAgIHNldCgkcm9vdFNjb3BlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtYWxlcnQtZGlhbG9nXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBhbGVydCBkaWFsb2cuWy9lbl1cbiAqICBbamFd44GT44Gu44Ki44Op44O844OI44OA44Kk44Ki44Ot44Kw44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GXbGlzdGVuZXLjg5Hjg6njg6Hjg7zjgr/jgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgIHjgZ3jga7jgqTjg5njg7Pjg4jjga7jg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBrumWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkua4oeOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIEFsZXJ0IGRpYWxvZyBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FsZXJ0RGlhbG9nJywgZnVuY3Rpb24oJG9uc2VuLCBBbGVydERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuICAgICAgICAgICAgdmFyIGFsZXJ0RGlhbG9nID0gbmV3IEFsZXJ0RGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhhbGVydERpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoYWxlcnREaWFsb2csIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCBhbGVydERpYWxvZyk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYWxlcnREaWFsb2cuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhhbGVydERpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFsZXJ0LWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIlxuLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbGVydERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0FuZHJvaWRBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbmRyb2lkQWxlcnREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdJT1NBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NBbGVydERpYWxvZ0FuaW1hdG9yKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLnZhbHVlKCdBbmltYXRpb25DaG9vc2VyJywgb25zLl9pbnRlcm5hbC5BbmltYXRvckZhY3RvcnkpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtY2Fyb3VzZWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgqvjg6vjg7zjgrvjg6vjgpLooajnpLrjgafjgY3jgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgIJbL2phXVxuICogQGNvZGVwZW4geGJiek9RXG4gKiBAZ3VpZGUgVXNpbmdDYXJvdXNlbFxuICogICBbZW5dTGVhcm4gaG93IHRvIHVzZSB0aGUgY2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV1jYXJvdXNlbOOCs+ODs+ODneODvOODjeODs+ODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1jYXJvdXNlbCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDIwMHB4XCI+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqIDwvb25zLWNhcm91c2VsPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNhcm91c2VsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqvjg6vjg7zjgrvjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXJlZnJlc2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlZnJlc2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlZnJlc2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vdmVyc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvdmVyc2Nyb2xsXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvdmVyc2Nyb2xsXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWwnLCBmdW5jdGlvbigkb25zZW4sIENhcm91c2VsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuICAgICAgICAgIHZhciBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWNhcm91c2VsJywgY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhjYXJvdXNlbCwgJ3Bvc3RjaGFuZ2UgcmVmcmVzaCBvdmVyc2Nyb2xsIGRlc3Ryb3knKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2Fyb3VzZWwuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWNhcm91c2VsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0Nhcm91c2VsSXRlbScsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNEaWFsb2cnLCBmdW5jdGlvbigkb25zZW4sIERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuXG4gICAgICAgICAgICB2YXIgZGlhbG9nID0gbmV3IERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBkaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhkaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGRpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIGRpYWxvZyk7XG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGRpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnSU9TRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLklPU0RpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0FuZHJvaWREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuQW5kcm9pZERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ1NsaWRlRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlNsaWRlRGlhbG9nQW5pbWF0b3IpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIEdlbmVyaWNWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGlyZWN0aXZlT25seV1cbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRGVzdHJveV1cbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBvcHRpb25zID0ge307XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZGlyZWN0aXZlT25seSkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSBpcyB1bmRlZmluZWQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHModGhpcywgb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlLCBlbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGhpcywgZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHNlbGYpO1xuXG4gICAgICAgICAgaWYgKG9wdGlvbnMub25EZXN0cm95KSB7XG4gICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveShzZWxmKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzLFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2VsZiA9IGVsZW1lbnQgPSBzZWxmLl9lbGVtZW50ID0gc2VsZi5fc2NvcGUgPSBzY29wZSA9IHNlbGYuX2F0dHJzID0gYXR0cnMgPSBvcHRpb25zID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMudmlld0tleVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGlyZWN0aXZlT25seV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGVdXG4gICAgICovXG4gICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIgPSBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycywgb3B0aW9ucyk7XG5cbiAgICAgIGlmICghb3B0aW9ucy52aWV3S2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb3B0aW9ucy52aWV3S2V5IGlzIHJlcXVpcmVkLicpO1xuICAgICAgfVxuXG4gICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICBlbGVtZW50LmRhdGEob3B0aW9ucy52aWV3S2V5LCB2aWV3KTtcblxuICAgICAgdmFyIGRlc3Ryb3kgPSBvcHRpb25zLm9uRGVzdHJveSB8fCBhbmd1bGFyLm5vb3A7XG4gICAgICBvcHRpb25zLm9uRGVzdHJveSA9IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgZGVzdHJveSh2aWV3KTtcbiAgICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgbnVsbCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdmlldztcbiAgICB9O1xuXG4gICAgTWljcm9FdmVudC5taXhpbihHZW5lcmljVmlldyk7XG5cbiAgICByZXR1cm4gR2VuZXJpY1ZpZXc7XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWxhenktcmVwZWF0XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIFVzaW5nIHRoaXMgY29tcG9uZW50IGEgbGlzdCB3aXRoIG1pbGxpb25zIG9mIGl0ZW1zIGNhbiBiZSByZW5kZXJlZCB3aXRob3V0IGEgZHJvcCBpbiBwZXJmb3JtYW5jZS5cbiAqICAgICBJdCBkb2VzIHRoYXQgYnkgXCJsYXppbHlcIiBsb2FkaW5nIGVsZW1lbnRzIGludG8gdGhlIERPTSB3aGVuIHRoZXkgY29tZSBpbnRvIHZpZXcgYW5kXG4gKiAgICAgcmVtb3ZpbmcgaXRlbXMgZnJvbSB0aGUgRE9NIHdoZW4gdGhleSBhcmUgbm90IHZpc2libGUuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jlhoXjgafmj4/nlLvjgZXjgozjgovjgqLjgqTjg4bjg6Djga5ET03opoHntKDjga7oqq3jgb/ovrzjgb/jga/jgIHnlLvpnaLjgavopovjgYjjgZ3jgYbjgavjgarjgaPjgZ/mmYLjgb7jgafoh6rli5XnmoTjgavpgYXlu7bjgZXjgozjgIFcbiAqICAgICDnlLvpnaLjgYvjgonopovjgYjjgarjgY/jgarjgaPjgZ/loLTlkIjjgavjga/jgZ3jga7opoHntKDjga/li5XnmoTjgavjgqLjg7Pjg63jg7zjg4njgZXjgozjgb7jgZnjgIJcbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLkvb/jgYbjgZPjgajjgafjgIHjg5Hjg5Xjgqnjg7zjg57jg7PjgrnjgpLliqPljJbjgZXjgZvjgovjgZPjgajnhKHjgZfjgavlt6jlpKfjgarmlbDjga7opoHntKDjgpLmj4/nlLvjgafjgY3jgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqIEBjb2RlcGVuIFF3ckdCbVxuICogQGd1aWRlIFVzaW5nTGF6eVJlcGVhdFxuICogICBbZW5dSG93IHRvIHVzZSBMYXp5IFJlcGVhdFsvZW5dXG4gKiAgIFtqYV3jg6zjgqTjgrjjg7zjg6rjg5Tjg7zjg4jjga7kvb/jgYTmlrlbL2phXVxuICogQGV4YW1wbGVcbiAqIDxzY3JpcHQ+XG4gKiAgIG9ucy5ib290c3RyYXAoKVxuICpcbiAqICAgLmNvbnRyb2xsZXIoJ015Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuICogICAgICRzY29wZS5NeURlbGVnYXRlID0ge1xuICogICAgICAgY291bnRJdGVtczogZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgIC8vIFJldHVybiBudW1iZXIgb2YgaXRlbXMuXG4gKiAgICAgICAgIHJldHVybiAxMDAwMDAwO1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBjYWxjdWxhdGVJdGVtSGVpZ2h0OiBmdW5jdGlvbihpbmRleCkge1xuICogICAgICAgICAvLyBSZXR1cm4gdGhlIGhlaWdodCBvZiBhbiBpdGVtIGluIHBpeGVscy5cbiAqICAgICAgICAgcmV0dXJuIDQ1O1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBjb25maWd1cmVJdGVtU2NvcGU6IGZ1bmN0aW9uKGluZGV4LCBpdGVtU2NvcGUpIHtcbiAqICAgICAgICAgLy8gSW5pdGlhbGl6ZSBzY29wZVxuICogICAgICAgICBpdGVtU2NvcGUuaXRlbSA9ICdJdGVtICMnICsgKGluZGV4ICsgMSk7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGRlc3Ryb3lJdGVtU2NvcGU6IGZ1bmN0aW9uKGluZGV4LCBpdGVtU2NvcGUpIHtcbiAqICAgICAgICAgLy8gT3B0aW9uYWwgbWV0aG9kIHRoYXQgaXMgY2FsbGVkIHdoZW4gYW4gaXRlbSBpcyB1bmxvYWRlZC5cbiAqICAgICAgICAgY29uc29sZS5sb2coJ0Rlc3Ryb3llZCBpdGVtIHdpdGggaW5kZXg6ICcgKyBpbmRleCk7XG4gKiAgICAgICB9XG4gKiAgICAgfTtcbiAqICAgfSk7XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8b25zLWxpc3QgbmctY29udHJvbGxlcj1cIk15Q29udHJvbGxlclwiPlxuICogICA8b25zLWxpc3QtaXRlbSBvbnMtbGF6eS1yZXBlYXQ9XCJNeURlbGVnYXRlXCI+XG4gKiAgICAge3sgaXRlbSB9fVxuICogICA8L29ucy1saXN0LWl0ZW0+XG4gKiA8L29ucy1saXN0PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbGF6eS1yZXBlYXRcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQSBkZWxlZ2F0ZSBvYmplY3QsIGNhbiBiZSBlaXRoZXIgYW4gb2JqZWN0IGF0dGFjaGVkIHRvIHRoZSBzY29wZSAod2hlbiB1c2luZyBBbmd1bGFySlMpIG9yIGEgbm9ybWFsIEphdmFTY3JpcHQgdmFyaWFibGUuWy9lbl1cbiAqICBbamFd6KaB57Sg44Gu44Ot44O844OJ44CB44Ki44Oz44Ot44O844OJ44Gq44Gp44Gu5Yem55CG44KS5aeU6K2y44GZ44KL44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCQW5ndWxhckpT44Gu44K544Kz44O844OX44Gu5aSJ5pWw5ZCN44KE44CB6YCa5bi444GuSmF2YVNjcmlwdOOBruWkieaVsOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAcHJvcGVydHkgZGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZ1bmN0aW9uIHdoaWNoIHJlY2lldmVzIGFuIGluZGV4IGFuZCB0aGUgc2NvcGUgZm9yIHRoZSBpdGVtLiBDYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdmFsdWVzIGluIHRoZSBpdGVtIHNjb3BlLlsvZW5dXG4gKiAgIFtqYV1bL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICAvKipcbiAgICogTGF6eSByZXBlYXQgZGlyZWN0aXZlLlxuICAgKi9cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zTGF6eVJlcGVhdCcsIGZ1bmN0aW9uKCRvbnNlbiwgTGF6eVJlcGVhdFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgICB0ZXJtaW5hbDogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBsYXp5UmVwZWF0ID0gbmV3IExhenlSZXBlYXRWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGxhenlSZXBlYXQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICAgIGNvbnN0IGRpcmVjdGl2ZUF0dHJpYnV0ZXMgPSBbJ29ucy1sYXp5LXJlcGVhdCcsICdvbnM6bGF6eTpyZXBlYXQnLCAnb25zX2xhenlfcmVwZWF0JywgJ2RhdGEtb25zLWxhenktcmVwZWF0JywgJ3gtb25zLWxhenktcmVwZWF0J107XG4gICAgY29uc3Qgc2NoZW1lID0ge1xuICAgICAgY29uZmlndXJlSXRlbVNjb3BlOiB7dHlwZTogJ2Z1bmN0aW9uJywgc2FmZUNhbGw6IHRydWV9LFxuICAgICAgZGVzdHJveUl0ZW1TY29wZToge3R5cGU6ICdmdW5jdGlvbicsIHNhZmVDYWxsOiB0cnVlfVxuICAgIH07XG5cbiAgICBjbGFzcyBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlIGV4dGVuZHMgb25zLl9pbnRlcm5hbC5MYXp5UmVwZWF0RGVsZWdhdGUge1xuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gdXNlckRlbGVnYXRlXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAgICogQHBhcmFtIHtTY29wZX0gcGFyZW50U2NvcGVcbiAgICAgICAqL1xuICAgICAgY29uc3RydWN0b3IodXNlckRlbGVnYXRlLCB0ZW1wbGF0ZUVsZW1lbnQsIHBhcmVudFNjb3BlKSB7XG4gICAgICAgIHN1cGVyKHVzZXJEZWxlZ2F0ZSwgdGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fcGFyZW50U2NvcGUgPSBwYXJlbnRTY29wZTtcblxuICAgICAgICBkaXJlY3RpdmVBdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB0ZW1wbGF0ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIpKTtcbiAgICAgICAgdGhpcy5fbGlua2VyID0gJGNvbXBpbGUodGVtcGxhdGVFbGVtZW50ID8gdGVtcGxhdGVFbGVtZW50LmNsb25lTm9kZSh0cnVlKSA6IG51bGwpO1xuICAgICAgfVxuXG4gICAgICBjb25maWd1cmVJdGVtU2NvcGUoaXRlbSwgc2NvcGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVkKCdjb25maWd1cmVJdGVtU2NvcGUnLCBzY2hlbWUpKGl0ZW0sIHNjb3BlKTtcbiAgICAgIH1cblxuICAgICAgZGVzdHJveUl0ZW1TY29wZShpdGVtLCBlbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlZCgnZGVzdHJveUl0ZW1TY29wZScsIHNjaGVtZSkoaXRlbSwgZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIF91c2luZ0JpbmRpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbGF6eS1yZXBlYXRgIGRlbGVnYXRlIG9iamVjdCBpcyB2YWd1ZS4nKTtcbiAgICAgIH1cblxuXG4gICAgICBwcmVwYXJlSXRlbShpbmRleCwgZG9uZSkge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuX3BhcmVudFNjb3BlLiRuZXcoKTtcbiAgICAgICAgdGhpcy5fYWRkU3BlY2lhbFByb3BlcnRpZXMoaW5kZXgsIHNjb3BlKTtcblxuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgc2NvcGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGlua2VyKHNjb3BlLCAoY2xvbmVkKSA9PiB7XG4gICAgICAgICAgbGV0IGVsZW1lbnQgPSBjbG9uZWRbMF07XG4gICAgICAgICAgaWYgKCF0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuX3VzZXJEZWxlZ2F0ZS5jcmVhdGVJdGVtQ29udGVudChpbmRleCwgZWxlbWVudCk7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KShzY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9uZSh7ZWxlbWVudCwgc2NvcGV9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqL1xuICAgICAgX2FkZFNwZWNpYWxQcm9wZXJ0aWVzKGksIHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmNvdW50SXRlbXMoKSAtIDE7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHNjb3BlLCB7XG4gICAgICAgICAgJGluZGV4OiBpLFxuICAgICAgICAgICRmaXJzdDogaSA9PT0gMCxcbiAgICAgICAgICAkbGFzdDogaSA9PT0gbGFzdCxcbiAgICAgICAgICAkbWlkZGxlOiBpICE9PSAwICYmIGkgIT09IGxhc3QsXG4gICAgICAgICAgJGV2ZW46IGkgJSAyID09PSAwLFxuICAgICAgICAgICRvZGQ6IGkgJSAyID09PSAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIGl0ZW0uc2NvcGUuJGV2YWxBc3luYygoKSA9PiB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0uc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gaXRlbS5lbGVtZW50XG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3lJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuZGVzdHJveUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIuZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0uZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5zY29wZS4kZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBkZXN0cm95KCkge1xuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlO1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1tb2RhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG1vZGFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg6Ljg7zjg4Djg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBNb2RhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc01vZGFsJywgZnVuY3Rpb24oJG9uc2VuLCBNb2RhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG4gICAgICAgICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhtb2RhbCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgbW9kYWwpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgbW9kYWwpO1xuXG4gICAgICAgICAgZWxlbWVudFswXS5fZW5zdXJlTm9kZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKG1vZGFsKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIG1vZGFsID0gZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1uYXZpZ2F0b3JcbiAqIEBleGFtcGxlXG4gKiA8b25zLW5hdmlnYXRvciBhbmltYXRpb249XCJzbGlkZVwiIHZhcj1cImFwcC5uYXZpXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8b25zLXRvb2xiYXI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+VGl0bGU8L2Rpdj5cbiAqICAgICA8L29ucy10b29sYmFyPlxuICpcbiAqICAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICAgPG9ucy1idXR0b24gbW9kaWZpZXI9XCJsaWdodFwiIG5nLWNsaWNrPVwiYXBwLm5hdmkucHVzaFBhZ2UoJ3BhZ2UuaHRtbCcpO1wiPlB1c2g8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtbmF2aWdhdG9yPlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wb3BQYWdlKCk7XCI+UG9wPC9vbnMtYnV0dG9uPlxuICogICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgbmF2aWdhdG9yLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiuODk+OCsuODvOOCv+ODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVwdXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlcG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXBvcFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cHVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0cG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cG9wXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cuT25zTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lk9uc05hdmlnYXRvckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1uYXZpZ2F0b3InLCBsYXN0UmVhZHkpO1xuXG4gIHZhciBsYXN0TGluayA9IHdpbmRvdy5PbnNOYXZpZ2F0b3JFbGVtZW50LnJld3JpdGFibGVzLmxpbms7XG4gIHdpbmRvdy5PbnNOYXZpZ2F0b3JFbGVtZW50LnJld3JpdGFibGVzLmxpbmsgPSBmdW5jdGlvbihuYXZpZ2F0b3JFbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHZpZXcgPSBhbmd1bGFyLmVsZW1lbnQobmF2aWdhdG9yRWxlbWVudCkuZGF0YSgnb25zLW5hdmlnYXRvcicpO1xuICAgIHZpZXcuX2NvbXBpbGVBbmRMaW5rKHRhcmdldCwgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBsYXN0TGluayhuYXZpZ2F0b3JFbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc05hdmlnYXRvcicsIGZ1bmN0aW9uKE5hdmlnYXRvclZpZXcsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgICAgIHZhciBuYXZpZ2F0b3IgPSBuZXcgTmF2aWdhdG9yVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgbmF2aWdhdG9yKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMobmF2aWdhdG9yLCAncHJlcHVzaCBwcmVwb3AgcG9zdHB1c2ggcG9zdHBvcCBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW5hdmlnYXRvcicsIG5hdmlnYXRvcik7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgbmF2aWdhdG9yLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW5hdmlnYXRvcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ05hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ0ZhZGVUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkZhZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnSU9TU2xpZGVUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLklPU1NsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ0xpZnRUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkxpZnROYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnTnVsbFRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ1NpbXBsZVNsaWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5TaW1wbGVTbGlkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcik7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKFNsaWRpbmdNZW51QW5pbWF0b3IpIHtcblxuICAgIHZhciBPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvciA9IFNsaWRpbmdNZW51QW5pbWF0b3IuZXh0ZW5kKHtcblxuICAgICAgX2JsYWNrTWFzazogdW5kZWZpbmVkLFxuXG4gICAgICBfaXNSaWdodDogZmFsc2UsXG4gICAgICBfZWxlbWVudDogZmFsc2UsXG4gICAgICBfbWVudVBhZ2U6IGZhbHNlLFxuICAgICAgX21haW5QYWdlOiBmYWxzZSxcbiAgICAgIF93aWR0aDogZmFsc2UsXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGggXCJ3aWR0aFwiIHN0eWxlIHZhbHVlXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBzZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgbWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgJzkwJSc7XG4gICAgICAgIHRoaXMuX2lzUmlnaHQgPSAhIW9wdGlvbnMuaXNSaWdodDtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gbWFpblBhZ2U7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlID0gbWVudVBhZ2U7XG5cbiAgICAgICAgbWVudVBhZ2UuY3NzKCdib3gtc2hhZG93JywgJzBweCAwIDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKScpO1xuICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgICB6SW5kZXg6IDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRml4IGZvciB0cmFuc3BhcmVudCBtZW51IHBhZ2Ugb24gaU9TOC5cbiAgICAgICAgbWVudVBhZ2UuY3NzKCctd2Via2l0LXRyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KScpO1xuXG4gICAgICAgIG1haW5QYWdlLmNzcyh7ekluZGV4OiAxfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICctJyArIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICctJyArIG9wdGlvbnMud2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2JsYWNrTWFzayA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5jc3Moe1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgICAgICBib3R0b206ICcwcHgnLFxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgICB6SW5kZXg6IDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5wcmVwZW5kKHRoaXMuX2JsYWNrTWFzayk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCd3aWR0aCcsIG9wdGlvbnMud2lkdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnLScgKyBvcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnLScgKyBvcHRpb25zLndpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pc09wZW5lZCkge1xuICAgICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICB2YXIgbWVudVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNZW51UGFnZVN0eWxlKG1heCk7XG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKS5xdWV1ZShtZW51U3R5bGUpLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYmxhY2tNYXNrKSB7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrLnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMuX2JsYWNrTWFzayA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYWluUGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9tYWluUGFnZSA9IHRoaXMuX21lbnVQYWdlID0gbnVsbDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBvcGVuTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgbWVudVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNZW51UGFnZVN0eWxlKG1heCk7XG4gICAgICAgIHZhciBtYWluUGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNYWluUGFnZVN0eWxlKG1heCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKG1haW5QYWdlU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtZW51U3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgY2xvc2VNZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcyh7ZGlzcGxheTogJ2Jsb2NrJ30pO1xuXG4gICAgICAgIHZhciBtZW51UGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNZW51UGFnZVN0eWxlKDApO1xuICAgICAgICB2YXIgbWFpblBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWFpblBhZ2VTdHlsZSgwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWFpblBhZ2VTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWVudVBhZ2VTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3Moe2Rpc3BsYXk6ICdibG9jayd9KTtcblxuICAgICAgICB2YXIgbWVudVBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWVudVBhZ2VTdHlsZShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIHZhciBtYWluUGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNYWluUGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgZGVsZXRlIG1haW5QYWdlU3R5bGUub3BhY2l0eTtcblxuICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKG1lbnVQYWdlU3R5bGUpXG4gICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobWFpblBhZ2VTdHlsZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC5xdWV1ZShtYWluUGFnZVN0eWxlKVxuICAgICAgICAgICAgLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgX2dlbmVyYXRlTWVudVBhZ2VTdHlsZTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLl9pc1JpZ2h0ID8gLWRpc3RhbmNlIDogZGlzdGFuY2U7XG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsIDAsIDApJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICAgICdib3gtc2hhZG93JzogZGlzdGFuY2UgPT09IDAgPyAnbm9uZScgOiAnMHB4IDAgMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpJ1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgX2dlbmVyYXRlTWFpblBhZ2VTdHlsZTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgb3BhY2l0eSA9IDEgLSAoMC4xICogZGlzdGFuY2UgLyBtYXgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb3BhY2l0eTogb3BhY2l0eVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgT3ZlcmxheVNsaWRpbmdNZW51QW5pbWF0b3IoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvcjtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wYWdlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcGFnZS5bL2VuXVxuICogICBbamFd44GT44Gu44Oa44O844K444KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctaW5maW5pdGUtc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVBhdGggb2YgdGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIGluZmluaXRlIHNjcm9sbGluZy4gVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gJHNjb3BlLiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgYSBkb25lIGNhbGxiYWNrIHRoYXQgbXVzdCBiZSBjYWxsZWQgd2hlbiBpdCdzIGZpbmlzaGVkLlsvZW5dXG4gKiAgIFtqYV1bL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbi1kZXZpY2UtYmFjay1idXR0b25cbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWRldmljZS1iYWNrLWJ1dHRvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aXRoIGFuIEFuZ3VsYXJKUyBleHByZXNzaW9uIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAgkFuZ3VsYXJKU+OBrmV4cHJlc3Npb27jgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUGFnZScsIGZ1bmN0aW9uKCRvbnNlbiwgUGFnZVZpZXcpIHtcblxuICAgIGZ1bmN0aW9uIGZpcmVQYWdlSW5pdEV2ZW50KGVsZW1lbnQpIHtcbiAgICAgIC8vIFRPRE86IHJlbW92ZSBkaXJ0eSBmaXhcbiAgICAgIHZhciBpID0gMCwgZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaSsrIDwgMTUpICB7XG4gICAgICAgICAgaWYgKGlzQXR0YWNoZWQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudCwgJ2luaXQnKTtcbiAgICAgICAgICAgIGZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50KGVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaSA+IDEwKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNldEltbWVkaWF0ZShmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsIHRvIGZpcmUgXCJwYWdlaW5pdFwiIGV2ZW50LiBBdHRhY2ggXCJvbnMtcGFnZVwiIGVsZW1lbnQgdG8gdGhlIGRvY3VtZW50IGFmdGVyIGluaXRpYWxpemF0aW9uLicpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQoZWxlbWVudCkge1xuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2ZW50LmluaXRFdmVudCgncGFnZWluaXQnLCB0cnVlLCB0cnVlKTtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBdHRhY2hlZChlbGVtZW50KSB7XG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZSA/IGlzQXR0YWNoZWQoZWxlbWVudC5wYXJlbnROb2RlKSA6IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBuZXcgUGFnZVZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwYWdlLCAnaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgcGFnZSk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocGFnZSwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwYWdlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocGFnZSk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBhZ2UnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGZpcmVQYWdlSW5pdEV2ZW50KGVsZW1lbnRbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wb3BvdmVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBwb3BvdmVyLlsvZW5dXG4gKiAgW2phXeOBk+OBruODneODg+ODl+OCquODvOODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNQb3BvdmVyJywgZnVuY3Rpb24oJG9uc2VuLCBQb3BvdmVyVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG5cbiAgICAgICAgICAgIHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwb3BvdmVyKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocG9wb3ZlciwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocG9wb3ZlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCBwb3BvdmVyKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwb3BvdmVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocG9wb3Zlcik7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnUG9wb3ZlckFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5Qb3BvdmVyQW5pbWF0b3IpXG4gIC52YWx1ZSgnRmFkZVBvcG92ZXJBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRmFkZVBvcG92ZXJBbmltYXRvcik7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wdWxsLWhvb2tcbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XG4gKiAgICAgJHNjb3BlLml0ZW1zID0gWzMsIDIgLDFdO1xuICpcbiAqICAgICAkc2NvcGUubG9hZCA9IGZ1bmN0aW9uKCRkb25lKSB7XG4gKiAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAqICAgICAgICAgJHNjb3BlLml0ZW1zLnVuc2hpZnQoJHNjb3BlLml0ZW1zLmxlbmd0aCArIDEpO1xuICogICAgICAgICAkZG9uZSgpO1xuICogICAgICAgfSwgMTAwMCk7XG4gKiAgICAgfTtcbiAqICAgfSk7XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8b25zLXBhZ2UgbmctY29udHJvbGxlcj1cIk15Q29udHJvbGxlclwiPlxuICogICA8b25zLXB1bGwtaG9vayB2YXI9XCJsb2FkZXJcIiBuZy1hY3Rpb249XCJsb2FkKCRkb25lKVwiPlxuICogICAgIDxzcGFuIG5nLXN3aXRjaD1cImxvYWRlci5nZXRDdXJyZW50U3RhdGUoKVwiPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJpbml0aWFsXCI+UHVsbCBkb3duIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInByZWFjdGlvblwiPlJlbGVhc2UgdG8gcmVmcmVzaDwvc3Bhbj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiYWN0aW9uXCI+TG9hZGluZyBkYXRhLiBQbGVhc2Ugd2FpdC4uLjwvc3Bhbj5cbiAqICAgICA8L3NwYW4+XG4gKiAgIDwvb25zLXB1bGwtaG9vaz5cbiAqICAgPG9ucy1saXN0PlxuICogICAgIDxvbnMtbGlzdC1pdGVtIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICAgIEl0ZW0gI3t7IGl0ZW0gfX1cbiAqICAgICA8L29ucy1saXN0LWl0ZW0+XG4gKiAgIDwvb25zLWxpc3Q+XG4gKiA8L29ucy1wYWdlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFd44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctYWN0aW9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Vc2UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgcGFnZSBpcyBwdWxsZWQgZG93bi4gQSA8Y29kZT4kZG9uZTwvY29kZT4gZnVuY3Rpb24gaXMgYXZhaWxhYmxlIHRvIHRlbGwgdGhlIGNvbXBvbmVudCB0aGF0IHRoZSBhY3Rpb24gaXMgY29tcGxldGVkLlsvZW5dXG4gKiAgIFtqYV1wdWxsIGRvd27jgZfjgZ/jgajjgY3jga7mjK/jgovoiJ7jgYTjgpLmjIflrprjgZfjgb7jgZnjgILjgqLjgq/jgrfjg6fjg7PjgYzlrozkuobjgZfjgZ/mmYLjgavjga88Y29kZT4kZG9uZTwvY29kZT7plqLmlbDjgpLlkbzjgbPlh7rjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtY2hhbmdlc3RhdGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImNoYW5nZXN0YXRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJjaGFuZ2VzdGF0ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogUHVsbCBob29rIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUHVsbEhvb2snLCBmdW5jdGlvbigkb25zZW4sIFB1bGxIb29rVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgICAgIHZhciBwdWxsSG9vayA9IG5ldyBQdWxsSG9va1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHB1bGxIb29rKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocHVsbEhvb2ssICdjaGFuZ2VzdGF0ZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCBwdWxsSG9vayk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHVsbEhvb2suX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcHVsbC1ob29rJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1B1c2hTbGlkaW5nTWVudUFuaW1hdG9yJywgZnVuY3Rpb24oU2xpZGluZ01lbnVBbmltYXRvcikge1xuXG4gICAgdmFyIFB1c2hTbGlkaW5nTWVudUFuaW1hdG9yID0gU2xpZGluZ01lbnVBbmltYXRvci5leHRlbmQoe1xuXG4gICAgICBfaXNSaWdodDogZmFsc2UsXG4gICAgICBfZWxlbWVudDogdW5kZWZpbmVkLFxuICAgICAgX21lbnVQYWdlOiB1bmRlZmluZWQsXG4gICAgICBfbWFpblBhZ2U6IHVuZGVmaW5lZCxcbiAgICAgIF93aWR0aDogdW5kZWZpbmVkLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoIFwid2lkdGhcIiBzdHlsZSB2YWx1ZVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UgPSBtYWluUGFnZTtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UgPSBtZW51UGFnZTtcblxuICAgICAgICB0aGlzLl9pc1JpZ2h0ID0gISFvcHRpb25zLmlzUmlnaHQ7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAnOTAlJztcblxuICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCd3aWR0aCcsIG9wdGlvbnMud2lkdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnLScgKyBvcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnLScgKyBvcHRpb25zLndpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pc09wZW5lZCkge1xuICAgICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICB2YXIgbWFpblBhZ2VUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShtYXgpO1xuICAgICAgICAgIHZhciBtZW51UGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUobWF4KTtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSkucXVldWUoe3RyYW5zZm9ybTogbWFpblBhZ2VUcmFuc2Zvcm19KS5wbGF5KCk7XG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKS5xdWV1ZShtZW51UGFnZVN0eWxlKS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICovXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fbWFpblBhZ2UgPSB0aGlzLl9tZW51UGFnZSA9IG51bGw7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgb3Blbk1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgY2xvc2VNZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0oMCk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0oTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG5cbiAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZSh7dHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybX0pXG4gICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlKVxuICAgICAgICAgIC5wbGF5KCk7XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm06IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsIDAsIDApJztcblxuICAgICAgICByZXR1cm4gYWJvdmVUcmFuc2Zvcm07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGU6IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciBiZWhpbmRYID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgYmVoaW5kVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBiZWhpbmRYICsgJ3B4LCAwLCAwKSc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGJlaGluZFRyYW5zZm9ybVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHVzaFNsaWRpbmdNZW51QW5pbWF0b3IoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBQdXNoU2xpZGluZ01lbnVBbmltYXRvcjtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yJywgZnVuY3Rpb24oU2xpZGluZ01lbnVBbmltYXRvcikge1xuXG4gICAgdmFyIFJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IgPSBTbGlkaW5nTWVudUFuaW1hdG9yLmV4dGVuZCh7XG5cbiAgICAgIF9ibGFja01hc2s6IHVuZGVmaW5lZCxcblxuICAgICAgX2lzUmlnaHQ6IGZhbHNlLFxuXG4gICAgICBfbWVudVBhZ2U6IHVuZGVmaW5lZCxcbiAgICAgIF9lbGVtZW50OiB1bmRlZmluZWQsXG4gICAgICBfbWFpblBhZ2U6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlID0gbWVudVBhZ2U7XG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gbWFpblBhZ2U7XG4gICAgICAgIHRoaXMuX2lzUmlnaHQgPSAhIW9wdGlvbnMuaXNSaWdodDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoIHx8ICc5MCUnO1xuXG4gICAgICAgIG1haW5QYWdlLmNzcyh7XG4gICAgICAgICAgYm94U2hhZG93OiAnMHB4IDAgMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpJ1xuICAgICAgICB9KTtcblxuICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnMHB4J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmNzcyh7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgICAgIGJvdHRvbTogJzBweCcsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZW1lbnQucHJlcGVuZCh0aGlzLl9ibGFja01hc2spO1xuXG4gICAgICAgIC8vIERpcnR5IGZpeCBmb3IgYnJva2VuIHJlbmRlcmluZyBidWcgb24gYW5kcm9pZCA0LnguXG4gICAgICAgIGFuaW1pdChtYWluUGFnZVswXSkucXVldWUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJ30pLnBsYXkoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc09wZW5lZFxuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGhcbiAgICAgICAqL1xuICAgICAgb25SZXNpemVkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCd3aWR0aCcsIHRoaXMuX3dpZHRoKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5pc09wZW5lZCkge1xuICAgICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcblxuICAgICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKG1heCk7XG4gICAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUobWF4KTtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSkucXVldWUoe3RyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm19KS5wbGF5KCk7XG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKS5xdWV1ZShiZWhpbmRTdHlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICovXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JsYWNrTWFzaykge1xuICAgICAgICAgIHRoaXMuX2JsYWNrTWFzay5yZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21haW5QYWdlKSB7XG4gICAgICAgICAgdGhpcy5fbWFpblBhZ2UuYXR0cignc3R5bGUnLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbWVudVBhZ2UpIHtcbiAgICAgICAgICB0aGlzLl9tZW51UGFnZS5hdHRyKCdzdHlsZScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gdGhpcy5fbWVudVBhZ2UgPSB0aGlzLl9lbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgY2xvc2VNZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKDApO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZSgwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kaXN0YW5jZVxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4RGlzdGFuY2VcbiAgICAgICAqL1xuICAgICAgdHJhbnNsYXRlTWVudTogZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0oTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIGRlbGV0ZSBiZWhpbmRTdHlsZS5vcGFjaXR5O1xuXG4gICAgICAgIGFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAucXVldWUoe3RyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm19KVxuICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSlcbiAgICAgICAgICAucGxheSgpO1xuICAgICAgfSxcblxuICAgICAgX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMuX2lzUmlnaHQgPyAtZGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAwLCAwKSc7XG5cbiAgICAgICAgcmV0dXJuIGFib3ZlVHJhbnNmb3JtO1xuICAgICAgfSxcblxuICAgICAgX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgdmFyIGJlaGluZERpc3RhbmNlID0gKGRpc3RhbmNlIC0gbWF4KSAvIG1heCAqIDEwO1xuICAgICAgICBiZWhpbmREaXN0YW5jZSA9IGlzTmFOKGJlaGluZERpc3RhbmNlKSA/IDAgOiBNYXRoLm1heChNYXRoLm1pbihiZWhpbmREaXN0YW5jZSwgMCksIC0xMCk7XG5cbiAgICAgICAgdmFyIGJlaGluZFggPSB0aGlzLl9pc1JpZ2h0ID8gLWJlaGluZERpc3RhbmNlIDogYmVoaW5kRGlzdGFuY2U7XG4gICAgICAgIHZhciBiZWhpbmRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGJlaGluZFggKyAnJSwgMCwgMCknO1xuICAgICAgICB2YXIgb3BhY2l0eSA9IDEgKyBiZWhpbmREaXN0YW5jZSAvIDEwMDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogYmVoaW5kVHJhbnNmb3JtLFxuICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHlcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yO1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNsaWRpbmctbWVudVxuICogQGNhdGVnb3J5IHNsaWRpbmctbWVudVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db21wb25lbnQgZm9yIHNsaWRpbmcgVUkgd2hlcmUgb25lIHBhZ2UgaXMgb3ZlcmxheWVkIG92ZXIgYW5vdGhlciBwYWdlLiBUaGUgYWJvdmUgcGFnZSBjYW4gYmUgc2xpZGVkIGFzaWRlIHRvIHJldmVhbCB0aGUgcGFnZSBiZWhpbmQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOCkuihqOePvuOBmeOCi+OBn+OCgeOBruOCs+ODs+ODneODvOODjeODs+ODiOOBp+OAgeeJh+aWueOBruODmuODvOOCuOOBjOWIpeOBruODmuODvOOCuOOBruS4iuOBq+OCquODvOODkOODvOODrOOCpOOBp+ihqOekuuOBleOCjOOBvuOBmeOAgmFib3ZlLXBhZ2XjgafmjIflrprjgZXjgozjgZ/jg5rjg7zjgrjjga/jgIHmqKrjgYvjgonjgrnjg6njgqTjg4njgZfjgabooajnpLrjgZfjgb7jgZnjgIJbL2phXVxuICogQGNvZGVwZW4gSUR2RkpcbiAqIEBzZWVhbHNvIG9ucy1wYWdlXG4gKiAgIFtlbl1vbnMtcGFnZSBjb21wb25lbnRbL2VuXVxuICogICBbamFdb25zLXBhZ2XjgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFVzaW5nU2xpZGluZ01lbnVcbiAqICAgW2VuXVVzaW5nIHNsaWRpbmcgbWVudVsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgpLkvb/jgYZbL2phXVxuICogQGd1aWRlIEV2ZW50SGFuZGxpbmdcbiAqICAgW2VuXVVzaW5nIGV2ZW50c1svZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjga7liKnnlKhbL2phXVxuICogQGd1aWRlIENhbGxpbmdDb21wb25lbnRBUElzZnJvbUphdmFTY3JpcHRcbiAqICAgW2VuXVVzaW5nIG5hdmlnYXRvciBmcm9tIEphdmFTY3JpcHRbL2VuXVxuICogICBbamFdSmF2YVNjcmlwdOOBi+OCieOCs+ODs+ODneODvOODjeODs+ODiOOCkuWRvOOBs+WHuuOBmVsvamFdXG4gKiBAZ3VpZGUgRGVmaW5pbmdNdWx0aXBsZVBhZ2VzaW5TaW5nbGVIVE1MXG4gKiAgIFtlbl1EZWZpbmluZyBtdWx0aXBsZSBwYWdlcyBpbiBzaW5nbGUgaHRtbFsvZW5dXG4gKiAgIFtqYV3opIfmlbDjga7jg5rjg7zjgrjjgpIx44Gk44GuSFRNTOOBq+iomOi/sOOBmeOCi1svamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1zbGlkaW5nLW1lbnUgdmFyPVwiYXBwLm1lbnVcIiBtYWluLXBhZ2U9XCJwYWdlLmh0bWxcIiBtZW51LXBhZ2U9XCJtZW51Lmh0bWxcIiBtYXgtc2xpZGUtZGlzdGFuY2U9XCIyMDBweFwiIHR5cGU9XCJyZXZlYWxcIiBzaWRlPVwibGVmdFwiPlxuICogPC9vbnMtc2xpZGluZy1tZW51PlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgPG9ucy1idXR0b24gbmctY2xpY2s9XCJhcHAubWVudS50b2dnbGVNZW51KClcIj5Ub2dnbGU8L29ucy1idXR0b24+XG4gKiAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy10ZW1wbGF0ZT5cbiAqXG4gKiA8b25zLXRlbXBsYXRlIGlkPVwibWVudS5odG1sXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8IS0tIG1lbnUgcGFnZSdzIGNvbnRlbnRzIC0tPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKlxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZW9wZW5cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHNsaWRpbmcgbWVudSBpcyBvcGVuZWQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOBjOmWi+OBj+WJjeOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zbGlkaW5nTWVudVxuICogICBbZW5dU2xpZGluZyBtZW51IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TbGlkaW5nTWVudeOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcG9zdG9wZW5cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgc2xpZGluZyBtZW51IGlzIG9wZW5lZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaL44GN57WC44KP44Gj44Gf5b6M44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwcmVjbG9zZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGJlZm9yZSB0aGUgc2xpZGluZyBtZW51IGlzIGNsb3NlZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaJ44GY44KL5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0Y2xvc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgc2xpZGluZyBtZW51IGlzIGNsb3NlZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaJ44GY57WC44KP44Gj44Gf5b6M44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNsaWRpbmcgbWVudS5bL2VuXVxuICogIFtqYV3jgZPjga7jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtZW51LXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgbWVudSBwYWdlLlsvZW5dXG4gKiAgIFtqYV3lt6bjgavkvY3nva7jgZnjgovjg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtYWluLXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgbWFpbiBwYWdlLlsvZW5dXG4gKiAgIFtqYV3lj7PjgavkvY3nva7jgZnjgovjg6HjgqTjg7Pjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzd2lwZWFibGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0Jvb2xlYW59XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVdoZXRoZXIgdG8gZW5hYmxlIHN3aXBlIGludGVyYWN0aW9uLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fmk43kvZzjgpLmnInlirnjgavjgZnjgovloLTlkIjjgavmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzd2lwZS10YXJnZXQtd2lkdGhcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHdpZHRoIG9mIHN3aXBlYWJsZSBhcmVhIGNhbGN1bGF0ZWQgZnJvbSB0aGUgbGVmdCAoaW4gcGl4ZWxzKS4gVXNlIHRoaXMgdG8gZW5hYmxlIHN3aXBlIG9ubHkgd2hlbiB0aGUgZmluZ2VyIHRvdWNoIG9uIHRoZSBzY3JlZW4gZWRnZS5bL2VuXVxuICogICBbamFd44K544Ov44Kk44OX44Gu5Yik5a6a6aCY5Z+f44KS44OU44Kv44K744Or5Y2Y5L2N44Gn5oyH5a6a44GX44G+44GZ44CC55S76Z2i44Gu56uv44GL44KJ5oyH5a6a44GX44Gf6Led6Zui44Gr6YGU44GZ44KL44Go44Oa44O844K444GM6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWF4LXNsaWRlLWRpc3RhbmNlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUhvdyBmYXIgdGhlIG1lbnUgcGFnZSB3aWxsIHNsaWRlIG9wZW4uIENhbiBzcGVjaWZ5IGJvdGggaW4gcHggYW5kICUuIGVnLiA5MCUsIDIwMHB4Wy9lbl1cbiAqICAgW2phXW1lbnUtcGFnZeOBp+aMh+WumuOBleOCjOOBn+ODmuODvOOCuOOBruihqOekuuW5heOCkuaMh+WumuOBl+OBvuOBmeOAguODlOOCr+OCu+ODq+OCguOBl+OBj+OBryXjga7kuKHmlrnjgafmjIflrprjgafjgY3jgb7jgZnvvIjkvos6IDkwJSwgMjAwcHjvvIlbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNwZWNpZnkgd2hpY2ggc2lkZSBvZiB0aGUgc2NyZWVuIHRoZSBtZW51IHBhZ2UgaXMgbG9jYXRlZCBvbi4gUG9zc2libGUgdmFsdWVzIGFyZSBcImxlZnRcIiBhbmQgXCJyaWdodFwiLlsvZW5dXG4gKiAgIFtqYV1tZW51LXBhZ2XjgafmjIflrprjgZXjgozjgZ/jg5rjg7zjgrjjgYznlLvpnaLjga7jganjgaHjgonlgbTjgYvjgonooajnpLrjgZXjgozjgovjgYvjgpLmjIflrprjgZfjgb7jgZnjgIJsZWZ044KC44GX44GP44GvcmlnaHTjga7jgYTjgZrjgozjgYvjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB0eXBlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNsaWRpbmcgbWVudSBhbmltYXRvci4gUG9zc2libGUgdmFsdWVzIGFyZSByZXZlYWwgKGRlZmF1bHQpLCBwdXNoIGFuZCBvdmVybGF5LlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgafjgZnjgIJcInJldmVhbFwi77yI44OH44OV44Kp44Or44OI77yJ44CBXCJwdXNoXCLjgIFcIm92ZXJsYXlcIuOBruOBhOOBmuOCjOOBi+OCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVvcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RvcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0b3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdG9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRNYWluUGFnZVxuICogQHNpZ25hdHVyZSBzZXRNYWluUGFnZShwYWdlVXJsLCBbb3B0aW9uc10pXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8Y29kZT4mbHQ7b25zLXRlbXBsYXRlJmd0OzwvY29kZT4uWy9lbl1cbiAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIFvbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbG9zZU1lbnVdXG4gKiAgIFtlbl1JZiB0cnVlIHRoZSBtZW51IHdpbGwgYmUgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV10cnVl44KS5oyH5a6a44GZ44KL44Go44CB6ZaL44GE44Gm44GE44KL44Oh44OL44Ol44O844KS6ZaJ44GY44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dRnVuY3Rpb24gdGhhdCBpcyBleGVjdXRlZCBhZnRlciB0aGUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXeODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIG1haW4gY29udGVudHMgcGFuZS5bL2VuXVxuICogICBbamFd5Lit5aSu6YOo5YiG44Gr6KGo56S644GV44KM44KL44Oa44O844K444KScGFnZVVybOOBq+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldE1lbnVQYWdlXG4gKiBAc2lnbmF0dXJlIHNldE1lbnVQYWdlKHBhZ2VVcmwsIFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlVXJsXG4gKiAgIFtlbl1QYWdlIFVSTC4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGRvY3VtZW50IG9yIGFuIDxjb2RlPiZsdDtvbnMtdGVtcGxhdGUmZ3Q7PC9jb2RlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsb3NlTWVudV1cbiAqICAgW2VuXUlmIHRydWUgdGhlIG1lbnUgd2lsbCBiZSBjbG9zZWQgYWZ0ZXIgdGhlIG1lbnUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXXRydWXjgpLmjIflrprjgZnjgovjgajjgIHplovjgYTjgabjgYTjgovjg6Hjg4vjg6Xjg7zjgpLplonjgZjjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgdGhlIG1lbnUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIHNpZGUgbWVudSBwYW5lLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zpg6jliIbjgavooajnpLrjgZXjgozjgovjg5rjg7zjgrjjgpJwYWdlVXJs44Gr5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb3Blbk1lbnVcbiAqIEBzaWduYXR1cmUgb3Blbk1lbnUoW29wdGlvbnNdKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgbWVudSBoYXMgYmVlbiBvcGVuZWQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOOBjOmWi+OBhOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNsaWRlIHRoZSBhYm92ZSBsYXllciB0byByZXZlYWwgdGhlIGxheWVyIGJlaGluZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444KS6KGo56S644GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgY2xvc2VNZW51XG4gKiBAc2lnbmF0dXJlIGNsb3NlTWVudShbb3B0aW9uc10pXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSBtZW51IGhhcyBiZWVuIGNsb3NlZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaJ44GY44KJ44KM44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGUgdGhlIGFib3ZlIGxheWVyIHRvIGhpZGUgdGhlIGxheWVyIGJlaGluZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444KS6Z2e6KGo56S644Gr44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgdG9nZ2xlTWVudVxuICogQHNpZ25hdHVyZSB0b2dnbGVNZW51KFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXVRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIG1lbnUgaGFzIGJlZW4gb3BlbmVkIG9yIGNsb3NlZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaL44GN57WC44KP44Gj44Gf5b6M44GL44CB6ZaJ44GY57WC44KP44Gj44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGUgdGhlIGFib3ZlIGxheWVyIHRvIHJldmVhbCB0aGUgbGF5ZXIgYmVoaW5kIGlmIGl0IGlzIGN1cnJlbnRseSBoaWRkZW4sIG90aGVyd2lzZSwgaGlkZSB0aGUgbGF5ZXIgYmVoaW5kLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nirbms4HjgavlkIjjgo/jgZvjgabjgIHjg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgpLooajnpLrjgoLjgZfjgY/jga/pnZ7ooajnpLrjgavjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBpc01lbnVPcGVuZWRcbiAqIEBzaWduYXR1cmUgaXNNZW51T3BlbmVkKClcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiAgIFtlbl10cnVlIGlmIHRoZSBtZW51IGlzIGN1cnJlbnRseSBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjgYzplovjgYTjgabjgYTjgozjgbB0cnVl44Go44Gq44KK44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUmV0dXJucyB0cnVlIGlmIHRoZSBtZW51IHBhZ2UgaXMgb3Blbiwgb3RoZXJ3aXNlIGZhbHNlLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgYzplovjgYTjgabjgYTjgovloLTlkIjjga90cnVl44CB44Gd44GG44Gn44Gq44GE5aC05ZCI44GvZmFsc2XjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlclxuICogQHNpZ25hdHVyZSBnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcigpXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiAgIFtlbl1EZXZpY2UgYmFjayBidXR0b24gaGFuZGxlci5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44OP44Oz44OJ44Op44KS6L+U44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUmV0cmlldmUgdGhlIGJhY2stYnV0dG9uIGhhbmRsZXIuWy9lbl1cbiAqICAgW2phXW9ucy1zbGlkaW5nLW1lbnXjgavntJDku5jjgYTjgabjgYTjgovjg5Djg4Pjgq/jg5zjgr/jg7Pjg4/jg7Pjg4njg6njgpLlj5blvpfjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRTd2lwZWFibGVcbiAqIEBzaWduYXR1cmUgc2V0U3dpcGVhYmxlKHN3aXBlYWJsZSlcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3dpcGVhYmxlXG4gKiAgIFtlbl1JZiB0cnVlIHRoZSBtZW51IHdpbGwgYmUgc3dpcGVhYmxlLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fjgafplovplonjgafjgY3jgovjgojjgYbjgavjgZnjgovloLTlkIjjgavjga90cnVl44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU3BlY2lmeSBpZiB0aGUgbWVudSBzaG91bGQgYmUgc3dpcGVhYmxlIG9yIG5vdC5bL2VuXVxuICogICBbamFd44K544Ov44Kk44OX44Gn6ZaL6ZaJ44GZ44KL44GL44Gp44GG44GL44KS6Kit5a6a44GZ44KL44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NsaWRpbmdNZW51JywgZnVuY3Rpb24oJGNvbXBpbGUsIFNsaWRpbmdNZW51VmlldywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIG1haW4gPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyksXG4gICAgICAgICAgICBtZW51ID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gICAgICAgIGlmIChtYWluKSB7XG4gICAgICAgICAgdmFyIG1haW5IdG1sID0gYW5ndWxhci5lbGVtZW50KG1haW4pLnJlbW92ZSgpLmh0bWwoKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVudSkge1xuICAgICAgICAgIHZhciBtZW51SHRtbCA9IGFuZ3VsYXIuZWxlbWVudChtZW51KS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc2xpZGluZy1tZW51X19tZW51IG9ucy1zbGlkaW5nLW1lbnUtaW5uZXInKSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQoYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdvbnNlbi1zbGlkaW5nLW1lbnVfX21haW4gb25zLXNsaWRpbmctbWVudS1pbm5lcicpKTtcblxuICAgICAgICAgIHZhciBzbGlkaW5nTWVudSA9IG5ldyBTbGlkaW5nTWVudVZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc2xpZGluZ01lbnUsICdwcmVvcGVuIHByZWNsb3NlIHBvc3RvcGVuIHBvc3RjbG9zZSBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICBpZiAobWFpbkh0bWwgJiYgIWF0dHJzLm1haW5QYWdlKSB7XG4gICAgICAgICAgICBzbGlkaW5nTWVudS5fYXBwZW5kTWFpblBhZ2UobnVsbCwgbWFpbkh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtZW51SHRtbCAmJiAhYXR0cnMubWVudVBhZ2UpIHtcbiAgICAgICAgICAgIHNsaWRpbmdNZW51Ll9hcHBlbmRNZW51UGFnZShtZW51SHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNsaWRpbmdNZW51KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zbGlkaW5nLW1lbnUnLCBzbGlkaW5nTWVudSk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNsaWRpbmdNZW51Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zbGlkaW5nLW1lbnUnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1NsaWRpbmdNZW51QW5pbWF0b3InLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgZGVsYXk6IDAsXG4gICAgICBkdXJhdGlvbjogMC40LFxuICAgICAgdGltaW5nOiAnY3ViaWMtYmV6aWVyKC4xLCAuNywgLjEsIDEpJyxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMudGltaW5nXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kdXJhdGlvblxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGVsYXlcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB0aGlzLnRpbWluZyA9IG9wdGlvbnMudGltaW5nIHx8IHRoaXMudGltaW5nO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5kdXJhdGlvbiA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHRoaXMuZGVsYXkgPSBvcHRpb25zLmRlbGF5ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmRlbGF5IDogdGhpcy5kZWxheTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGggXCJ3aWR0aFwiIHN0eWxlIHZhbHVlXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBzZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgbWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzT3BlbmVkXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqL1xuICAgICAgb3Blbk1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKi9cbiAgICAgIGNsb3NlQ2xvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kaXN0YW5jZVxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4RGlzdGFuY2VcbiAgICAgICAqL1xuICAgICAgdHJhbnNsYXRlTWVudTogZnVuY3Rpb24obWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEByZXR1cm4ge1NsaWRpbmdNZW51QW5pbWF0b3J9XG4gICAgICAgKi9cbiAgICAgIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJyaWRlIGNvcHkgbWV0aG9kLicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdC12aWV3XG4gKiBAY2F0ZWdvcnkgc3BsaXQtdmlld1xuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXURpdmlkZXMgdGhlIHNjcmVlbiBpbnRvIGEgbGVmdCBhbmQgcmlnaHQgc2VjdGlvbi5bL2VuXVxuICogIFtqYV3nlLvpnaLjgpLlt6blj7PjgavliIblibLjgZnjgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgafjgZnjgIJbL2phXVxuICogQGNvZGVwZW4gbktxZnYge3dpZGV9XG4gKiBAZ3VpZGUgVXNpbmdvbnNzcGxpdHZpZXdjb21wb25lbnRcbiAqICAgW2VuXVVzaW5nIG9ucy1zcGxpdC12aWV3LlsvZW5dXG4gKiAgIFtqYV1vbnMtc3BsaXQtdmlld+OCs+ODs+ODneODvOODjeODs+ODiOOCkuS9v+OBhlsvamFdXG4gKiBAZ3VpZGUgQ2FsbGluZ0NvbXBvbmVudEFQSXNmcm9tSmF2YVNjcmlwdFxuICogICBbZW5dVXNpbmcgbmF2aWdhdG9yIGZyb20gSmF2YVNjcmlwdFsvZW5dXG4gKiAgIFtqYV1KYXZhU2NyaXB044GL44KJ44Kz44Oz44Od44O844ON44Oz44OI44KS5ZG844Gz5Ye644GZWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLXNwbGl0LXZpZXdcbiAqICAgc2Vjb25kYXJ5LXBhZ2U9XCJzZWNvbmRhcnkuaHRtbFwiXG4gKiAgIG1haW4tcGFnZT1cIm1haW4uaHRtbFwiXG4gKiAgIG1haW4tcGFnZS13aWR0aD1cIjcwJVwiXG4gKiAgIGNvbGxhcHNlPVwicG9ydHJhaXRcIj5cbiAqIDwvb25zLXNwbGl0LXZpZXc+XG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgdXBkYXRlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIHdoZW4gdGhlIHNwbGl0IHZpZXcgaXMgdXBkYXRlZC5bL2VuXVxuICogICBbamFdc3BsaXQgdmlld+OBrueKtuaFi+OBjOabtOaWsOOBleOCjOOBn+mam+OBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtCb29sZWFufSBldmVudC5zaG91bGRDb2xsYXBzZVxuICogICBbZW5dVHJ1ZSBpZiB0aGUgdmlldyBzaG91bGQgY29sbGFwc2UuWy9lbl1cbiAqICAgW2phXWNvbGxhcHNl54q25oWL44Gu5aC05ZCI44GrdHJ1ZeOBq+OBquOCiuOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQuY3VycmVudE1vZGVcbiAqICAgW2VuXUN1cnJlbnQgbW9kZS5bL2VuXVxuICogICBbamFd54++5Zyo44Gu44Oi44O844OJ5ZCN44KS6L+U44GX44G+44GZ44CCXCJjb2xsYXBzZVwi44GLXCJzcGxpdFwi44GL44Gu44GE44Ga44KM44GL44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV2ZW50LnNwbGl0XG4gKiAgIFtlbl1DYWxsIHRvIGZvcmNlIHNwbGl0LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7plqLmlbDjgpLlkbzjgbPlh7rjgZnjgajlvLfliLbnmoTjgatzcGxpdOODouODvOODieOBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBldmVudC5jb2xsYXBzZVxuICogICBbZW5dQ2FsbCB0byBmb3JjZSBjb2xsYXBzZS5bL2VuXVxuICogICBbamFd44GT44Gu6Zai5pWw44KS5ZG844Gz5Ye644GZ44Go5by35Yi255qE44GrY29sbGFwc2Xjg6Ljg7zjg4njgavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXfjga7luYXjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgYvjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCIFsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcHJlc3BsaXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHZpZXcgaXMgc3BsaXQuWy9lbl1cbiAqICAgW2phXXNwbGl054q25oWL44Gr44KL5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNwbGl0Vmlld1xuICogICBbZW5dU3BsaXQgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NwbGl0Vmlld+OCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge051bWJlcn0gZXZlbnQud2lkdGhcbiAqICAgW2VuXUN1cnJlbnQgd2lkdGguWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrlNwbGl0Vmlld27jga7luYXjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0c3BsaXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgdmlldyBpcyBzcGxpdC5bL2VuXVxuICogICBbamFdc3BsaXTnirbmhYvjgavjgarjgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZWNvbGxhcHNlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYmVmb3JlIHRoZSB2aWV3IGlzIGNvbGxhcHNlZC5bL2VuXVxuICogICBbamFdY29sbGFwc2XnirbmhYvjgavjgarjgovliY3jgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3Rjb2xsYXBzZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSB2aWV3IGlzIGNvbGxhcHNlZC5bL2VuXVxuICogICBbamFdY29sbGFwc2XnirbmhYvjgavjgarjgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNwbGl0IHZpZXcuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODl+ODquODg+ODiOODk+ODpeODvOOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1haW4tcGFnZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIG9uIHRoZSByaWdodC5bL2VuXVxuICogICBbamFd5Y+z5YG044Gr6KGo56S644GZ44KL44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWFpbi1wYWdlLXdpZHRoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU1haW4gcGFnZSB3aWR0aCBwZXJjZW50YWdlLiBUaGUgc2Vjb25kYXJ5IHBhZ2Ugd2lkdGggd2lsbCBiZSB0aGUgcmVtYWluaW5nIHBlcmNlbnRhZ2UuWy9lbl1cbiAqICAgW2phXeWPs+WBtOOBruODmuODvOOCuOOBruW5heOCkuODkeODvOOCu+ODs+ODiOWNmOS9jeOBp+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHNlY29uZGFyeS1wYWdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2Ugb24gdGhlIGxlZnQuWy9lbl1cbiAqICAgW2phXeW3puWBtOOBq+ihqOekuuOBmeOCi+ODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIGNvbGxhcHNlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIFNwZWNpZnkgdGhlIGNvbGxhcHNlIGJlaGF2aW9yLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0LCBsYW5kc2NhcGUsIHdpZHRoICNweCBvciBhIG1lZGlhIHF1ZXJ5LlxuICogICAgIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiIG1lYW5zIHRoZSB2aWV3IHdpbGwgY29sbGFwc2Ugd2hlbiBkZXZpY2UgaXMgaW4gbGFuZHNjYXBlIG9yIHBvcnRyYWl0IG9yaWVudGF0aW9uLlxuICogICAgIFwid2lkdGggI3B4XCIgbWVhbnMgdGhlIHZpZXcgd2lsbCBjb2xsYXBzZSB3aGVuIHRoZSB3aW5kb3cgd2lkdGggaXMgc21hbGxlciB0aGFuIHRoZSBzcGVjaWZpZWQgI3B4LlxuICogICAgIElmIHRoZSB2YWx1ZSBpcyBhIG1lZGlhIHF1ZXJ5LCB0aGUgdmlldyB3aWxsIGNvbGxhcHNlIHdoZW4gdGhlIG1lZGlhIHF1ZXJ5IGlzIHRydWUuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDlt6blgbTjga7jg5rjg7zjgrjjgpLpnZ7ooajnpLrjgavjgZnjgovmnaHku7bjgpLmjIflrprjgZfjgb7jgZnjgIJwb3J0cmFpdCwgbGFuZHNjYXBl44CBd2lkdGggI3B444KC44GX44GP44Gv44Oh44OH44Kj44Ki44Kv44Ko44Oq44Gu5oyH5a6a44GM5Y+v6IO944Gn44GZ44CCXG4gKiAgICAgcG9ydHJhaXTjgoLjgZfjgY/jga9sYW5kc2NhcGXjgpLmjIflrprjgZnjgovjgajjgIHjg4fjg5DjgqTjgrnjga7nlLvpnaLjgYznuKblkJHjgY3jgoLjgZfjgY/jga/mqKrlkJHjgY3jgavjgarjgaPjgZ/mmYLjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgICB3aWR0aCAjcHjjgpLmjIflrprjgZnjgovjgajjgIHnlLvpnaLjgYzmjIflrprjgZfjgZ/mqKrluYXjgojjgorjgoLnn63jgYTloLTlkIjjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgICDjg6Hjg4fjgqPjgqLjgq/jgqjjg6rjgpLmjIflrprjgZnjgovjgajjgIHmjIflrprjgZfjgZ/jgq/jgqjjg6rjgavpganlkIjjgZfjgabjgYTjgovloLTlkIjjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXVwZGF0ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwidXBkYXRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJ1cGRhdGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzcGxpdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc3BsaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNwbGl0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY29sbGFwc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNvbGxhcHNlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjb2xsYXBzZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzcGxpdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNwbGl0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c3BsaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y29sbGFwc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3Rjb2xsYXBzZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNvbGxhcHNlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRNYWluUGFnZVxuICogQHNpZ25hdHVyZSBzZXRNYWluUGFnZShwYWdlVXJsKVxuICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VVcmxcbiAqICAgW2VuXVBhZ2UgVVJMLiBDYW4gYmUgZWl0aGVyIGFuIEhUTUwgZG9jdW1lbnQgb3IgYW4gPG9ucy10ZW1wbGF0ZT4uWy9lbl1cbiAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIFvbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIHJpZ2h0IHNlY3Rpb25bL2VuXVxuICogICBbamFd5oyH5a6a44GX44GfVVJM44KS44Oh44Kk44Oz44Oa44O844K444KS6Kqt44G/6L6844G/44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0U2Vjb25kYXJ5UGFnZVxuICogQHNpZ25hdHVyZSBzZXRTZWNvbmRhcnlQYWdlKHBhZ2VVcmwpXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8b25zLXRlbXBsYXRlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgbGVmdCBzZWN0aW9uWy9lbl1cbiAqICAgW2phXeaMh+WumuOBl+OBn1VSTOOCkuW3puOBruODmuODvOOCuOOBruiqreOBv+i+vOOBv+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHVwZGF0ZVxuICogQHNpZ25hdHVyZSB1cGRhdGUoKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UcmlnZ2VyIGFuICd1cGRhdGUnIGV2ZW50IGFuZCB0cnkgdG8gZGV0ZXJtaW5lIGlmIHRoZSBzcGxpdCBiZWhhdmlvciBzaG91bGQgYmUgY2hhbmdlZC5bL2VuXVxuICogICBbamFdc3BsaXTjg6Ljg7zjg4njgpLlpInjgYjjgovjgbnjgY3jgYvjganjgYbjgYvjgpLliKTmlq3jgZnjgovjgZ/jgoHjga4ndXBkYXRlJ+OCpOODmeODs+ODiOOCkueZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTcGxpdFZpZXcnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXRWaWV3LCAkb25zZW4pIHtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgbWFpblBhZ2UgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXBhZ2UnKSxcbiAgICAgICAgICAgIHNlY29uZGFyeVBhZ2UgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmRhcnktcGFnZScpO1xuXG4gICAgICAgIGlmIChtYWluUGFnZSkge1xuICAgICAgICAgIHZhciBtYWluSHRtbCA9IGFuZ3VsYXIuZWxlbWVudChtYWluUGFnZSkucmVtb3ZlKCkuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNvbmRhcnlQYWdlKSB7XG4gICAgICAgICAgdmFyIHNlY29uZGFyeUh0bWwgPSBhbmd1bGFyLmVsZW1lbnQoc2Vjb25kYXJ5UGFnZSkucmVtb3ZlKCkuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNwbGl0LXZpZXdfX3NlY29uZGFyeSBmdWxsLXNjcmVlbiBvbnMtc3BsaXQtdmlldy1pbm5lcicpKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNwbGl0LXZpZXdfX21haW4gZnVsbC1zY3JlZW4gb25zLXNwbGl0LXZpZXctaW5uZXInKSk7XG5cbiAgICAgICAgICB2YXIgc3BsaXRWaWV3ID0gbmV3IFNwbGl0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgaWYgKG1haW5IdG1sICYmICFhdHRycy5tYWluUGFnZSkge1xuICAgICAgICAgICAgc3BsaXRWaWV3Ll9hcHBlbmRNYWluUGFnZShtYWluSHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY29uZGFyeUh0bWwgJiYgIWF0dHJzLnNlY29uZGFyeVBhZ2UpIHtcbiAgICAgICAgICAgIHNwbGl0Vmlldy5fYXBwZW5kU2Vjb25kUGFnZShzZWNvbmRhcnlIdG1sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3BsaXRWaWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwbGl0VmlldywgJ3VwZGF0ZSBwcmVzcGxpdCBwcmVjb2xsYXBzZSBwb3N0c3BsaXQgcG9zdGNvbGxhcHNlIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0LXZpZXcnLCBzcGxpdFZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BsaXRWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdC12aWV3JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJDb250ZW50JywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyQ29udGVudCA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLmxvYWQgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHRoaXMuX3BhZ2VTY29wZSAmJiB0aGlzLl9wYWdlU2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50WzBdLmxvYWQoLi4uYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2xpbms6IGZ1bmN0aW9uKGZyYWdtZW50LCBkb25lKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VTY29wZSA9IHRoaXMuX3Njb3BlLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUoZnJhZ21lbnQpKHRoaXMuX3BhZ2VTY29wZSk7XG5cbiAgICAgICAgdGhpcy5fcGFnZVNjb3BlLiRldmFsQXN5bmMoKCkgPT4gZG9uZShmcmFnbWVudCkpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLmxvYWQgPSB0aGlzLl9wYWdlU2NvcGUgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihTcGxpdHRlckNvbnRlbnQpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3BsaXR0ZXJDb250ZW50LCBbJ3BhZ2UnXSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXJDb250ZW50O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJTaWRlJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyU2lkZSA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnb3BlbicsICdjbG9zZScsICd0b2dnbGUnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMubG9hZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcGFnZVNjb3BlICYmIHRoaXMuX3BhZ2VTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRbMF0ubG9hZCguLi5hcmdzKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ21vZGVjaGFuZ2UnLCAncHJlb3BlbicsICdwcmVjbG9zZScsICdwb3N0b3BlbicsICdwb3N0Y2xvc2UnXG4gICAgICAgIF0sIGRldGFpbCA9PiBkZXRhaWwuc2lkZSA/IGFuZ3VsYXIuZXh0ZW5kKGRldGFpbCwge3NpZGU6IHRoaXN9KSA6IGRldGFpbCk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfbGluazogZnVuY3Rpb24oZnJhZ21lbnQsIGRvbmUpIHtcbiAgICAgICAgdmFyIGxpbmsgPSAkY29tcGlsZShmcmFnbWVudCk7XG4gICAgICAgIHRoaXMuX3BhZ2VTY29wZSA9IHRoaXMuX3Njb3BlLiRuZXcoKTtcbiAgICAgICAgbGluayh0aGlzLl9wYWdlU2NvcGUpO1xuXG4gICAgICAgIHRoaXMuX3BhZ2VTY29wZS4kZXZhbEFzeW5jKCgpID0+IGRvbmUoZnJhZ21lbnQpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5sb2FkID0gdGhpcy5fcGFnZVNjb3BlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXJTaWRlKTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyU2lkZSwgWydwYWdlJywgJ21vZGUnLCAnaXNPcGVuJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyU2lkZTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzcGxpdCB2aWV3LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5fjg6rjg4Pjg4jjg5Pjg6Xjg7zjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuXG4gICAgICAgICAgdmFyIHNwbGl0dGVyID0gbmV3IFNwbGl0dGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3BsaXR0ZXIpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BsaXR0ZXIsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlcicsIHNwbGl0dGVyKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNwbGl0dGVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3dpdGNoXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3dpdGNoLlsvZW5dXG4gKiAgIFtqYV1KYXZhU2NyaXB044GL44KJ5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU3dpdGNoJywgZnVuY3Rpb24oJG9uc2VuLCBTd2l0Y2hWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcblxuICAgICAgICBpZiAoYXR0cnMubmdDb250cm9sbGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGVsZW1lbnQgY2FuXFwndCBhY2NlcHQgbmctY29udHJvbGxlciBkaXJlY3RpdmUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3dpdGNoVmlldyA9IG5ldyBTd2l0Y2hWaWV3KGVsZW1lbnQsIHNjb3BlLCBhdHRycyk7XG4gICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhzd2l0Y2hWaWV3LCBlbGVtZW50KTtcblxuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3dpdGNoVmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXN3aXRjaCcsIHN3aXRjaFZpZXcpO1xuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3dpdGNoVmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoc3dpdGNoVmlldyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBhdHRycyA9IHNjb3BlID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUudmFsdWUoJ1RhYmJhck5vbmVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyTm9uZUFuaW1hdG9yKTtcbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJGYWRlQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhckZhZGVBbmltYXRvcik7XG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyU2xpZGVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyU2xpZGVBbmltYXRvcik7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1RhYmJhclZpZXcnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCAkcGFyc2UpIHtcbiAgICB2YXIgVGFiYmFyVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnb25zLXRhYmJhcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiZWxlbWVudFwiIHBhcmFtZXRlciBtdXN0IGJlIGEgXCJvbnMtdGFiYmFyXCIgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZVNjb3BlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3JlYWN0aXZlJywgJ3Bvc3RjaGFuZ2UnLCAncHJlY2hhbmdlJywgJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVUYWInLFxuICAgICAgICAgICdzZXRUYWJiYXJWaXNpYmlsaXR5JyxcbiAgICAgICAgICAnZ2V0QWN0aXZlVGFiSW5kZXgnLFxuICAgICAgICAgICdsb2FkUGFnZSdcbiAgICAgICAgXSk7XG5cbiAgICAgIH0sXG5cbiAgICAgIF9jb21waWxlQW5kTGluazogZnVuY3Rpb24ocGFnZUVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBsaW5rID0gJGNvbXBpbGUocGFnZUVsZW1lbnQpO1xuICAgICAgICB2YXIgcGFnZVNjb3BlID0gdGhpcy5fc2NvcGUuJG5ldygpO1xuICAgICAgICBsaW5rKHBhZ2VTY29wZSk7XG5cbiAgICAgICAgcGFnZVNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2FsbGJhY2socGFnZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBNaWNyb0V2ZW50Lm1peGluKFRhYmJhclZpZXcpO1xuXG4gICAgVGFiYmFyVmlldy5yZWdpc3RlckFuaW1hdG9yID0gZnVuY3Rpb24obmFtZSwgQW5pbWF0b3IpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuT25zVGFiYmFyRWxlbWVudC5yZWdpc3RlckFuaW1hdG9yKG5hbWUsIEFuaW1hdG9yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFRhYmJhclZpZXc7XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0JhY2tCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCBHZW5lcmljVmlldywgQ29tcG9uZW50Q2xlYW5lcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgICAgIHZhciBiYWNrQnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYmFjay1idXR0b24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBiYWNrQnV0dG9uLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYmFja0J1dHRvbik7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUoc2NvcGUpO1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKGF0dHJzKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQm90dG9tVG9vbGJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgdmlld0tleTogJ29ucy1ib3R0b21Ub29sYmFyJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWJ1dHRvblxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgdmFyIGJ1dHRvbiA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYnV0dG9uJ1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYnV0dG9uLCAnZGlzYWJsZWQnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZCA9IHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cblxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0R1bW15Rm9ySW5pdCcsIGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICB2YXIgaXNSZWFkeSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgbGluazoge1xuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgIGlmICghaXNSZWFkeSkge1xuICAgICAgICAgICAgaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRvbnMtcmVhZHknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEVWRU5UUyA9XG4gICAgKCdkcmFnIGRyYWdsZWZ0IGRyYWdyaWdodCBkcmFndXAgZHJhZ2Rvd24gaG9sZCByZWxlYXNlIHN3aXBlIHN3aXBlbGVmdCBzd2lwZXJpZ2h0ICcgK1xuICAgICAgJ3N3aXBldXAgc3dpcGVkb3duIHRhcCBkb3VibGV0YXAgdG91Y2ggdHJhbnNmb3JtIHBpbmNoIHBpbmNoaW4gcGluY2hvdXQgcm90YXRlJykuc3BsaXQoLyArLyk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNHZXN0dXJlRGV0ZWN0b3InLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBzY29wZURlZiA9IEVWRU5UUy5yZWR1Y2UoZnVuY3Rpb24oZGljdCwgbmFtZSkge1xuICAgICAgZGljdFsnbmcnICsgdGl0bGl6ZShuYW1lKV0gPSAnJic7XG4gICAgICByZXR1cm4gZGljdDtcbiAgICB9LCB7fSk7XG5cbiAgICBmdW5jdGlvbiB0aXRsaXplKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBzY29wZURlZixcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIF8sIHRyYW5zY2x1ZGUpIHtcblxuICAgICAgICAgIHRyYW5zY2x1ZGUoc2NvcGUuJHBhcmVudCwgZnVuY3Rpb24oY2xvbmVkKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGF0dHIgPSAnbmcnICsgdGl0bGl6ZShldmVudC50eXBlKTtcblxuICAgICAgICAgICAgaWYgKGF0dHIgaW4gc2NvcGVEZWYpIHtcbiAgICAgICAgICAgICAgc2NvcGVbYXR0cl0oeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGdlc3R1cmVEZXRlY3RvcjtcblxuICAgICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3RvciA9IGVsZW1lbnRbMF0uX2dlc3R1cmVEZXRlY3RvcjtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vbihFVkVOVFMuam9pbignICcpLCBoYW5kbGVyKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3Iub2ZmKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLmVsZW1lbnQgPSBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCJ2YXIgYmFiZWxIZWxwZXJzID0ge307XG5cbmJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5iYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSkoKTtcblxuYmFiZWxIZWxwZXJzLmdldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O1xuXG4gICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gIH1cbn07XG5cbmJhYmVsSGVscGVycy5pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbmJhYmVsSGVscGVycy5wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5iYWJlbEhlbHBlcnM7IiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gc2NyZWVuIG9yaWVudGF0aW9uLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0IGFuZCBsYW5kc2NhcGUuIERpZmZlcmVudCBmcm9tIG90aGVyIGNvbXBvbmVudHMsIHRoaXMgY29tcG9uZW50IGlzIHVzZWQgYXMgYXR0cmlidXRlIGluIGFueSBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV3nlLvpnaLjga7lkJHjgY3jgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLooYzjgYTjgb7jgZnjgIJwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAguOBmeOBueOBpuOBruimgee0oOOBruWxnuaAp+OBq+S9v+eUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtcGxhdGZvcm0gW2VuXW9ucy1pZi1wbGF0Zm9ybSBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtcGxhdGZvcm3jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLW9yaWVudGF0aW9uPVwicG9ydHJhaXRcIj5cbiAqICAgPHA+VGhpcyB3aWxsIG9ubHkgYmUgdmlzaWJsZSBpbiBwb3J0cmFpdCBtb2RlLjwvcD5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRWl0aGVyIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiLlsvZW5dXG4gKiAgIFtqYV1wb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZPcmllbnRhdGlvbicsIGZ1bmN0aW9uKCRvbnNlbiwgJG9uc0dsb2JhbCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnb25zLWlmLW9yaWVudGF0aW9uLWlubmVyJyk7XG5cbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZPcmllbnRhdGlvbicsIHVwZGF0ZSk7XG4gICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vbignY2hhbmdlJywgdXBkYXRlKTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNHbG9iYWwub3JpZW50YXRpb24ub2ZmKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgdXNlck9yaWVudGF0aW9uID0gKCcnICsgYXR0cnMub25zSWZPcmllbnRhdGlvbikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBvcmllbnRhdGlvbiA9IGdldExhbmRzY2FwZU9yUG9ydHJhaXQoKTtcblxuICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyB8fCB1c2VyT3JpZW50YXRpb24gPT09ICdsYW5kc2NhcGUnKSB7XG4gICAgICAgICAgICAgIGlmICh1c2VyT3JpZW50YXRpb24gPT09IG9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpIHtcbiAgICAgICAgICAgIHJldHVybiAkb25zR2xvYmFsLm9yaWVudGF0aW9uLmlzUG9ydHJhaXQoKSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1wbGF0Zm9ybVxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIC8gYnJvd3Nlci4gVmFsaWQgdmFsdWVzIGFyZSBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgYW5kIFwid3BcIi5bL2VuXVxuICogICAgW2phXeODl+ODqeODg+ODiOODleOCqeODvOODoOOChOODluODqeOCpuOCtuODvOOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuOBiuOBk+OBquOBhOOBvuOBmeOAgm9wZXJhLCBmaXJlZm94LCBzYWZhcmksIGNocm9tZSwgaWUsIGVkZ2UsIGFuZHJvaWQsIGJsYWNrYmVycnksIGlvcywgd3Djga7jgYTjgZrjgozjgYvjga7lgKTjgpLnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLW9yaWVudGF0aW9uIFtlbl1vbnMtaWYtb3JpZW50YXRpb24gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLW9yaWVudGF0aW9u44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1wbGF0Zm9ybT1cImFuZHJvaWRcIj5cbiAqICAgLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLXBsYXRmb3JtXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU9uZSBvciBtdWx0aXBsZSBzcGFjZSBzZXBhcmF0ZWQgdmFsdWVzOiBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgb3IgXCJ3cFwiLlsvZW5dXG4gKiAgIFtqYV1cIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIsIFwid3BcIuOBruOBhOOBmuOCjOOBi+epuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmUGxhdGZvcm0nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdvbnMtaWYtcGxhdGZvcm0taW5uZXInKTtcbiAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHZhciBwbGF0Zm9ybSA9IGdldFBsYXRmb3JtU3RyaW5nKCk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZlBsYXRmb3JtJywgZnVuY3Rpb24odXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJQbGF0Zm9ybXMgPSBhdHRycy5vbnNJZlBsYXRmb3JtLnRvTG93ZXJDYXNlKCkudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGxhdGZvcm1TdHJpbmcoKSB7XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSkpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9SSU0gVGFibGV0IE9TL2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQkIxMC9pKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYmxhY2tiZXJyeSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZXxpUGFkfGlQb2QvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW9zJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZXxJRU1vYmlsZXxXUERlc2t0b3AvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnd3AnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE9wZXJhIDguMCsgKFVBIGRldGVjdGlvbiB0byBkZXRlY3QgQmxpbmsvdjgtcG93ZXJlZCBPcGVyYSlcbiAgICAgICAgICB2YXIgaXNPcGVyYSA9ICEhd2luZG93Lm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc09wZXJhKSB7XG4gICAgICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJzsgICAvLyBGaXJlZm94IDEuMCtcbiAgICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc1NhZmFyaSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cuSFRNTEVsZW1lbnQpLmluZGV4T2YoJ0NvbnN0cnVjdG9yJykgPiAwO1xuICAgICAgICAgIC8vIEF0IGxlYXN0IFNhZmFyaSAzKzogXCJbb2JqZWN0IEhUTUxFbGVtZW50Q29uc3RydWN0b3JdXCJcbiAgICAgICAgICBpZiAoaXNTYWZhcmkpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNFZGdlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgRWRnZS8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc0VkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAnZWRnZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzQ2hyb21lID0gISF3aW5kb3cuY2hyb21lICYmICFpc09wZXJhICYmICFpc0VkZ2U7IC8vIENocm9tZSAxK1xuICAgICAgICAgIGlmIChpc0Nocm9tZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0lFID0gLypAY2Nfb24hQCovZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7IC8vIEF0IGxlYXN0IElFNlxuICAgICAgICAgIGlmIChpc0lFKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAaWQgaW5wdXRcbiAqIEBuYW1lIG9ucy1pbnB1dFxuICogQGNhdGVnb3J5IGZvcm1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1JbnB1dCBjb21wb25lbnQuWy9lbl1cbiAqICBbamFdaW5wdXTjgrPjg7Pjg53igJXjg43jg7Pjg4jjgafjgZnjgIJbL2phXVxuICogQGNvZGVwZW4gb2pReExqXG4gKiBAZ3VpZGUgVXNpbmdGb3JtQ29tcG9uZW50c1xuICogICBbZW5dVXNpbmcgZm9ybSBjb21wb25lbnRzWy9lbl1cbiAqICAgW2phXeODleOCqeODvOODoOOCkuS9v+OBhlsvamFdXG4gKiBAZ3VpZGUgRXZlbnRIYW5kbGluZ1xuICogICBbZW5dRXZlbnQgaGFuZGxpbmcgZGVzY3JpcHRpb25zWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWHpueQhuOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1pbnB1dD48L29ucy1pbnB1dD5cbiAqIDxvbnMtaW5wdXQgbW9kaWZpZXI9XCJtYXRlcmlhbFwiIGxhYmVsPVwiVXNlcm5hbWVcIj48L29ucy1pbnB1dD5cbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBhdHRyaWJ1dGVcbiAqIEBuYW1lIGxhYmVsXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UZXh0IGZvciBhbmltYXRlZCBmbG9hdGluZyBsYWJlbC5bL2VuXVxuICogICBbamFd44Ki44OL44Oh44O844K344On44Oz44GV44Gb44KL44OV44Ot44O844OG44Kj44Oz44Kw44Op44OZ44Or44Gu44OG44Kt44K544OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBhdHRyaWJ1dGVcbiAqIEBuYW1lIGZsb2F0XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dSWYgdGhpcyBhdHRyaWJ1dGUgaXMgcHJlc2VudCwgdGhlIGxhYmVsIHdpbGwgYmUgYW5pbWF0ZWQuWy9lbl1cbiAqICBbamFd44GT44Gu5bGe5oCn44GM6Kit5a6a44GV44KM44Gf5pmC44CB44Op44OZ44Or44Gv44Ki44OL44Oh44O844K344On44Oz44GZ44KL44KI44GG44Gr44Gq44KK44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBhdHRyaWJ1dGVcbiAqIEBuYW1lIG5nLW1vZGVsXG4gKiBAZXh0ZW5zaW9uT2YgYW5ndWxhclxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1CaW5kIHRoZSB2YWx1ZSB0byBhIG1vZGVsLiBXb3JrcyBqdXN0IGxpa2UgZm9yIG5vcm1hbCBpbnB1dCBlbGVtZW50cy5bL2VuXVxuICogICBbamFd44GT44Gu6KaB57Sg44Gu5YCk44KS44Oi44OH44Or44Gr57SQ5LuY44GR44G+44GZ44CC6YCa5bi444GuaW5wdXTopoHntKDjga7mp5jjgavli5XkvZzjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbmctY2hhbmdlXG4gKiBAZXh0ZW5zaW9uT2YgYW5ndWxhclxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1FeGVjdXRlcyBhbiBleHByZXNzaW9uIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuIFdvcmtzIGp1c3QgbGlrZSBmb3Igbm9ybWFsIGlucHV0IGVsZW1lbnRzLlsvZW5dXG4gKiAgIFtqYV3lgKTjgYzlpInjgo/jgaPjgZ/mmYLjgavjgZPjga7lsZ7mgKfjgafmjIflrprjgZfjgZ9leHByZXNzaW9u44GM5a6f6KGM44GV44KM44G+44GZ44CC6YCa5bi444GuaW5wdXTopoHntKDjga7mp5jjgavli5XkvZzjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEFUVFJTID0gW1xuICAgICduZ01vZGVsJyxcbiAgICAnbmdDaGFuZ2UnLFxuICAgICduZ1JlcXVpcmVkJyxcbiAgICAnbmdNaW5sZW5ndGgnLFxuICAgICduZ01heGxlbmd0aCcsXG4gICAgJ25nUGF0dGVybicsXG4gICAgJ25nVHJpbScsXG4gICAgJ25nVmFsdWUnLFxuICAgICduZ1RydWVWYWx1ZScsXG4gICAgJ25nRmFsc2VWYWx1ZSdcbiAgXTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0lucHV0JywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcblxuICAgICAgICB2YXIgZWwgPSBlbGVtZW50WzBdO1xuICAgICAgICB2YXIgdHlwZSA9IGVsLmdldEF0dHJpYnV0ZSgndHlwZScpO1xuXG4gICAgICAgIEFUVFJTLmZvckVhY2goZnVuY3Rpb24oYXR0cikge1xuICAgICAgICAgIHZhciBrZWJhYkNhc2UgPSBhdHRyLnJlcGxhY2UoL1tBLVpdL2csIGZ1bmN0aW9uKGxldHRlciwgcG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gKHBvcyA/ICctJyA6ICcnKSArIGxldHRlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICAgICAgICBlbC5faW5wdXQuc2V0QXR0cmlidXRlKGtlYmFiQ2FzZSwgYXR0cnNbYXR0cl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNvbXBpbGUoZWwuX2lucHV0KShzY29wZSk7XG5cbiAgICAgICAgaWYgKGVsLl9pc1RleHRJbnB1dCAmJiBhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBlbC5fdXBkYXRlTGFiZWxDbGFzcygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBjYXRlZ29yeSBmb3JtXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIENvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiBpZiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgdmlzaWJsZSBvciBoaWRkZW4uXG4gKiAgICAgVGhpcyBjb21wb25lbnQgcmVxdWlyZXMgY29yZG92YSBhbmQgdGhhdCB0aGUgY29tLmlvbmljLmtleWJvYXJkIHBsdWdpbiBpcyBpbnN0YWxsZWQuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgabjgYTjgovjgYvjganjgYbjgYvjgafjgIHjgrPjg7Pjg4bjg7Pjg4TjgpLooajnpLrjgZnjgovjgYvjganjgYbjgYvjgpLliIfjgormm7/jgYjjgovjgZPjgajjgYzlh7rmnaXjgb7jgZnjgIJcbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjga/jgIFDb3Jkb3Zh44KEY29tLmlvbmljLmtleWJvYXJk44OX44Op44Kw44Kk44Oz44KS5b+F6KaB44Go44GX44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAZ3VpZGUgVXRpbGl0eUFQSXNcbiAqICAgW2VuXU90aGVyIHV0aWxpdHkgQVBJc1svZW5dXG4gKiAgIFtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWtleWJvYXJkLWFjdGl2ZT5cbiAqICAgVGhpcyB3aWxsIG9ubHkgYmUgZGlzcGxheWVkIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlxuICogPC9kaXY+XG4gKiA8ZGl2IG9ucy1rZXlib2FyZC1pbmFjdGl2ZT5cbiAqICAgVGhlcmUgaXMgYWxzbyBhIGNvbXBvbmVudCB0aGF0IGRvZXMgdGhlIG9wcG9zaXRlLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7lsZ7mgKfjgYzjgaTjgYTjgZ/opoHntKDjga/jgIHjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgZ/mmYLjgavliJ3jgoHjgabooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMta2V5Ym9hcmQtaW5hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBoaWRkZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOmaoOOCjOOBpuOBhOOCi+aZguOBruOBv+ihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBjb21waWxlRnVuY3Rpb24gPSBmdW5jdGlvbihzaG93LCAkb25zZW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGlzcFNob3cgPSBzaG93ID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICAgIGRpc3BIaWRlID0gc2hvdyA/ICdub25lJyA6ICdibG9jayc7XG5cbiAgICAgICAgdmFyIG9uU2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcFNob3cpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsIGRpc3BIaWRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25Jbml0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnZpc2libGUpIHtcbiAgICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICBpZiAob25zLnNvZnR3YXJlS2V5Ym9hcmQuX3Zpc2libGUpIHtcbiAgICAgICAgICBvblNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdzaG93Jywgb25TaG93KTtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ2hpZGUnLCBvbkhpZGUpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaW5pdCcsIG9uSW5pdCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRBY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24odHJ1ZSwgJG9uc2VuKVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0tleWJvYXJkSW5hY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24oZmFsc2UsICRvbnNlbilcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3QnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0J30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RIZWFkZXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0SGVhZGVyJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RJdGVtJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC1pdGVtJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRGlzcGxheSBhIHBsYWNlaG9sZGVyIHdoaWxlIHRoZSBjb250ZW50IGlzIGxvYWRpbmcuWy9lbl1cbiAqICAgW2phXU9uc2VuIFVJ44GM6Kqt44G/6L6844G+44KM44KL44G+44Gn44Gr6KGo56S644GZ44KL44OX44Os44O844K544Ob44Or44OA44O844KS6KGo54++44GX44G+44GZ44CCWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyPVwicGFnZS5odG1sXCI+XG4gKiAgIExvYWRpbmcuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIHRvIGxvYWQuWy9lbl1cbiAqICAgW2phXeiqreOBv+i+vOOCgOODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xvYWRpbmdQbGFjZWhvbGRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG4gICAgICAgIGlmIChhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICBvbnMuX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIoZWxlbWVudFswXSwgYXR0cnMub25zTG9hZGluZ1BsYWNlaG9sZGVyLCBmdW5jdGlvbihjb250ZW50RWxlbWVudCwgZG9uZSkge1xuICAgICAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICBvbnMuY29tcGlsZShjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICBzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsInZhciBiYWJlbEhlbHBlcnMgPSB7fTtcblxuYmFiZWxIZWxwZXJzLmNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbmJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KSgpO1xuXG5iYWJlbEhlbHBlcnMuZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7XG5cbiAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHtcbiAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7XG5cbiAgICBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgfVxufTtcblxuYmFiZWxIZWxwZXJzLmluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuYmFiZWxIZWxwZXJzLnBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbmJhYmVsSGVscGVyczsiLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmFuZ2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzZXQoc2NvcGUsIGVsZW1lbnRbMF0udmFsdWUpO1xuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JpcHBsZScsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXJpcHBsZSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNjb3BlXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGwgY2hpbGQgZWxlbWVudHMgdXNpbmcgdGhlIFwidmFyXCIgYXR0cmlidXRlIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIHNjb3BlIG9mIHRoaXMgZWxlbWVudC5bL2VuXVxuICogICBbamFdXCJ2YXJcIuWxnuaAp+OCkuS9v+OBo+OBpuOBhOOCi+WFqOOBpuOBruWtkOimgee0oOOBrnZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjga/jgIHjgZPjga7opoHntKDjga5Bbmd1bGFySlPjgrnjgrPjg7zjg5fjgavov73liqDjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtbGlzdD5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLXNjb3BlIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICA8b25zLWNhcm91c2VsIHZhcj1cImNhcm91c2VsXCI+XG4gKiAgICAgICA8b25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5uZXh0KClcIj5cbiAqICAgICAgICAge3sgaXRlbSB9fVxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5wcmV2KClcIj5cbiAqICAgICAgICAgLi4uXG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgIDwvb25zLWNhcm91c2VsPlxuICogICA8L29ucy1saXN0LWl0ZW0+XG4gKiA8L29ucy1saXN0PlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTY29wZScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItY29udGVudFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5PbnNTcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cuT25zU3BsaXR0ZXJDb250ZW50RWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCBsYXN0UmVhZHkpO1xuXG4gIHZhciBsYXN0TGluayA9IHdpbmRvdy5PbnNTcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLmxpbms7XG4gIHdpbmRvdy5PbnNTcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLmxpbmsgPSBmdW5jdGlvbihlbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHZpZXcgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnKTtcbiAgICBsYXN0TGluayhlbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgdmlldy5fbGluayh0YXJnZXQsIGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyQ29udGVudCcsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlckNvbnRlbnQsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBDdXN0b21FbGVtZW50cy51cGdyYWRlKGVsZW1lbnRbMF0pO1xuXG4gICAgICAgICAgdmFyIHZpZXcgPSBuZXcgU3BsaXR0ZXJDb250ZW50KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh2aWV3LCAnZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItY29udGVudCcsIHZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItY29udGVudCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItc2lkZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZW9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZW9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdG9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0b3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cuT25zU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lk9uc1NwbGl0dGVyU2lkZUVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1zaWRlJywgbGFzdFJlYWR5KTtcblxuICB2YXIgbGFzdExpbmsgPSB3aW5kb3cuT25zU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5saW5rO1xuICB3aW5kb3cuT25zU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5saW5rID0gZnVuY3Rpb24oZWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciB2aWV3ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJyk7XG4gICAgbGFzdExpbmsoZWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIHZpZXcuX2xpbmsodGFyZ2V0LCBjYWxsYmFjayk7XG4gICAgfSk7XG4gIH07XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJTaWRlLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyU2lkZShzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLXNpZGUnLCB2aWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLXNpZGUnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gICAgLmRpcmVjdGl2ZSgnb25zVGFiJywgdGFiKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYmJhckl0ZW0nLCB0YWIpOyAvLyBmb3IgQkNcblxuICBmdW5jdGlvbiB0YWIoJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10YWJiYXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0YWIgYmFyLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgr/jg5bjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBoaWRlLXRhYnNcbiAqIEBpbml0b25seVxuICogQHR5cGUge0Jvb2xlYW59XG4gKiBAZGVmYXVsdCBmYWxzZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1XaGV0aGVyIHRvIGhpZGUgdGhlIHRhYnMuIFZhbGlkIHZhbHVlcyBhcmUgdHJ1ZS9mYWxzZS5bL2VuXVxuICogICBbamFd44K/44OW44KS6Z2e6KGo56S644Gr44GZ44KL5aC05ZCI44Gr5oyH5a6a44GX44G+44GZ44CCdHJ1ZeOCguOBl+OBj+OBr2ZhbHNl44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXJlYWN0aXZlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJyZWFjdGl2ZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicmVhY3RpdmVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWluaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cuT25zVGFiYmFyRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lk9uc1RhYmJhckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy10YWJiYXInLCBsYXN0UmVhZHkpO1xuXG4gIHZhciBsYXN0TGluayA9IHdpbmRvdy5PbnNUYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLmxpbms7XG4gIHdpbmRvdy5PbnNUYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLmxpbmsgPSBmdW5jdGlvbih0YWJiYXJFbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHZpZXcgPSBhbmd1bGFyLmVsZW1lbnQodGFiYmFyRWxlbWVudCkuZGF0YSgnb25zLXRhYmJhcicpO1xuICAgIHZpZXcuX2NvbXBpbGVBbmRMaW5rKHRhcmdldCwgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBsYXN0TGluayh0YWJiYXJFbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgbGFzdFVubGluayA9IHdpbmRvdy5PbnNUYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnVubGluaztcbiAgd2luZG93Lk9uc1RhYmJhckVsZW1lbnQucmV3cml0YWJsZXMudW5saW5rID0gZnVuY3Rpb24odGFiYmFyRWxlbWVudCwgdGFyZ2V0LCBjYWxsYmFjaykge1xuICAgIGFuZ3VsYXIuZWxlbWVudCh0YXJnZXQpLmRhdGEoJ19zY29wZScpLiRkZXN0cm95KCk7XG4gICAgbGFzdFVubGluayh0YWJiYXJFbGVtZW50LCB0YXJnZXQsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RhYmJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUsICRwYXJzZSwgVGFiYmFyVmlldykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuXG4gICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLmhpZGVUYWJzLCBmdW5jdGlvbihoaWRlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBoaWRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaGlkZSA9IGhpZGUgPT09ICd0cnVlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudFswXS5zZXRUYWJiYXJWaXNpYmlsaXR5KCFoaWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHRhYmJhclZpZXcgPSBuZXcgVGFiYmFyVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGFiYmFyVmlldywgZWxlbWVudCk7XG5cbiAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh0YWJiYXJWaWV3LCAncmVhY3RpdmUgcHJlY2hhbmdlIHBvc3RjaGFuZ2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHRhYmJhclZpZXcpO1xuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdGFiYmFyVmlldyk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRhYmJhclZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRhYmJhclZpZXcpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVGVtcGxhdGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVybWluYWw6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG4gICAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudFswXS50ZW1wbGF0ZSB8fCBlbGVtZW50Lmh0bWwoKTtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGVsZW1lbnQuYXR0cignaWQnKSwgY29udGVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdG9vbGJhci5bL2VuXVxuICogIFtqYV3jgZPjga7jg4Tjg7zjg6vjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGRpcnR5IGZpeCFcbiAgICAgICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lID09PSAnb25zLXRvb2xiYXInKSB7XG4gICAgICAgICAgICAgIEN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZWxlbWVudFswXSk7XG4gICAgICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtdG9vbGJhcid9KTtcbiAgICAgICAgICAgICAgZWxlbWVudFswXS5fZW5zdXJlTm9kZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b29sYmFyLWJ1dHRvblxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGJ1dHRvbi5bL2VuXVxuICogICBbamFd44GT44Gu44Oc44K/44Oz44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXJCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgQ3VzdG9tRWxlbWVudHMudXBncmFkZShlbGVtZW50WzBdKTtcbiAgICAgICAgICB2YXIgdG9vbGJhckJ1dHRvbiA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRvb2xiYXJCdXR0b24pO1xuXG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRvb2xiYXJCdXR0b24sIGVsZW1lbnQpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRvb2xiYXJCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b29sYmFyLWJ1dHRvbicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIENvbXBvbmVudENsZWFuZXIgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZWNvbXBvc2VOb2RlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50LnJlbW92ZSgpLmNoaWxkcmVuKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVjb21wb3NlTm9kZShhbmd1bGFyLmVsZW1lbnQoY2hpbGRyZW5baV0pKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBhdHRyc1xuICAgICAqL1xuICAgIGRlc3Ryb3lBdHRyaWJ1dGVzOiBmdW5jdGlvbihhdHRycykge1xuICAgICAgYXR0cnMuJCRlbGVtZW50ID0gbnVsbDtcbiAgICAgIGF0dHJzLiQkb2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZXN0cm95RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKi9cbiAgICBkZXN0cm95U2NvcGU6IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICBzY29wZS4kJGxpc3RlbmVycyA9IHt9O1xuICAgICAgc2NvcGUuJCR3YXRjaGVycyA9IG51bGw7XG4gICAgICBzY29wZSA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKHNjb3BlLCBmbikge1xuICAgICAgdmFyIGNsZWFyID0gc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhcigpO1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudENsZWFuZXI7XG4gIH0pO1xuXG4gIC8vIG92ZXJyaWRlIGJ1aWx0aW4gbmctKGV2ZW50bmFtZSkgZGlyZWN0aXZlc1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5nRXZlbnREaXJlY3RpdmVzID0ge307XG4gICAgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgbW91c2VlbnRlciBtb3VzZWxlYXZlIGtleWRvd24ga2V5dXAga2V5cHJlc3Mgc3VibWl0IGZvY3VzIGJsdXIgY29weSBjdXQgcGFzdGUnLnNwbGl0KCcgJykuZm9yRWFjaChcbiAgICAgIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmVOb3JtYWxpemUoJ25nLScgKyBuYW1lKTtcbiAgICAgICAgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0gPSBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlOiBmdW5jdGlvbigkZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICB2YXIgZm4gPSAkcGFyc2UoYXR0cltkaXJlY3RpdmVOYW1lXSk7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKHNjb3BlLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgICAgICBzY29wZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cik7XG4gICAgICAgICAgICAgICAgICBhdHRyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XTtcblxuICAgICAgICBmdW5jdGlvbiBkaXJlY3RpdmVOb3JtYWxpemUobmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIG1vZHVsZS5jb25maWcoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgIHZhciBzaGlmdCA9IGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xuICAgICAgICAkZGVsZWdhdGUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcbiAgICAgIH07XG4gICAgICBPYmplY3Qua2V5cyhuZ0V2ZW50RGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihkaXJlY3RpdmVOYW1lKSB7XG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcihkaXJlY3RpdmVOYW1lICsgJ0RpcmVjdGl2ZScsIFsnJGRlbGVnYXRlJywgc2hpZnRdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgIG1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0pO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbm9ucy5ub3RpZmljYXRpb24uYWxlcnQgPSBmdW5jdGlvbihtZXNzYWdlLCBvcHRpb25zID0ge30pIHtcbiAgdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnID8gKG9wdGlvbnMubWVzc2FnZSA9IG1lc3NhZ2UpIDogKG9wdGlvbnMgPSBtZXNzYWdlKTtcblxuICB2YXIgb3JpZ2luYWxDb21waWxlID0gb3B0aW9ucy5jb21waWxlIHx8IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICBvcHRpb25zLmNvbXBpbGUgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgb25zLmNvbXBpbGUob3JpZ2luYWxDb21waWxlKGVsZW1lbnQpKTtcbiAgfTtcblxuICByZXR1cm4gb25zLm5vdGlmaWNhdGlvbi5fYWxlcnRPcmlnaW5hbChvcHRpb25zKTtcbn07XG5cbm9ucy5ub3RpZmljYXRpb24uY29uZmlybSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkge1xuICB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgPyAob3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZSkgOiAob3B0aW9ucyA9IG1lc3NhZ2UpO1xuXG4gIHZhciBvcmlnaW5hbENvbXBpbGUgPSBvcHRpb25zLmNvbXBpbGUgfHwgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIG9wdGlvbnMuY29tcGlsZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICBvbnMuY29tcGlsZShvcmlnaW5hbENvbXBpbGUoZWxlbWVudCkpO1xuICB9O1xuXG4gIHJldHVybiBvbnMubm90aWZpY2F0aW9uLl9jb25maXJtT3JpZ2luYWwob3B0aW9ucyk7XG59O1xuXG5vbnMubm90aWZpY2F0aW9uLnByb21wdCA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkge1xuICB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgPyAob3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZSkgOiAob3B0aW9ucyA9IG1lc3NhZ2UpO1xuXG4gIHZhciBvcmlnaW5hbENvbXBpbGUgPSBvcHRpb25zLmNvbXBpbGUgfHwgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIG9wdGlvbnMuY29tcGlsZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICBvbnMuY29tcGlsZShvcmlnaW5hbENvbXBpbGUoZWxlbWVudCkpO1xuICB9O1xuXG4gIHJldHVybiBvbnMubm90aWZpY2F0aW9uLl9wcm9tcHRPcmlnaW5hbChvcHRpb25zKTtcbn07XG4iLCIvLyBjb25maXJtIHRvIHVzZSBqcUxpdGVcbmlmICh3aW5kb3cualF1ZXJ5ICYmIGFuZ3VsYXIuZWxlbWVudCA9PT0gd2luZG93LmpRdWVyeSkge1xuICBjb25zb2xlLndhcm4oJ09uc2VuIFVJIHJlcXVpcmUganFMaXRlLiBMb2FkIGpRdWVyeSBhZnRlciBsb2FkaW5nIEFuZ3VsYXJKUyB0byBmaXggdGhpcyBlcnJvci4galF1ZXJ5IG1heSBicmVhayBPbnNlbiBVSSBiZWhhdmlvci4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgIHZhciB0ZW1wbGF0ZXMgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJ0ZXh0L29ucy10ZW1wbGF0ZVwiXScpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZXNbaV0pO1xuICAgICAgdmFyIGlkID0gdGVtcGxhdGUuYXR0cignaWQnKTtcbiAgICAgIGlmICh0eXBlb2YgaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dChpZCwgdGVtcGxhdGUudGV4dCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
