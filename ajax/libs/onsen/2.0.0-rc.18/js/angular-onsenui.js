/*! angular-onsenui.js for onsenui - v2.0.0-rc.18 - 2016-09-07 */
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
      prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? function (name, fn) {
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
      }(name, prop[name]) : prop[name];
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

    DialogView.registerAnimator = function (name, Animator) {
      return window.ons.DialogElement.registerAnimator(name, Animator);
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

    var AngularLazyRepeatDelegate = function (_ons$_internal$LazyRe) {
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
        value: function loadItemElement(index, parent, done) {
          this._prepareItemElement(index, function (_ref) {
            var element = _ref.element;
            var scope = _ref.scope;

            parent.appendChild(element);
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
    }(ons._internal.LazyRepeatDelegate);

    return AngularLazyRepeatDelegate;
  }]);
})();
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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
      return window.ons.ModalElement.registerAnimator(name, Animator);
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

babelHelpers.createClass = function () {
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
}();

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

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['prepush', 'postpush', 'prepop', 'postpop', 'init', 'show', 'hide', 'destroy'], function (detail) {
          if (detail.navigator) {
            detail.navigator = this;
          }
          return detail;
        }.bind(this));

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

        setTimeout(function () {

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
        }.bind(this), 1000 / 60);
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

        setTimeout(function () {

          animit(this._mainPage[0]).wait(delay).queue(mainPageStyle, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            this._menuPage.css('display', 'none');
            callback();
            done();
          }.bind(this)).play();

          animit(this._menuPage[0]).wait(delay).queue(menuPageStyle, {
            duration: duration,
            timing: this.timing
          }).play();
        }.bind(this), 1000 / 60);
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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

        setTimeout(function () {

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
        }.bind(this), 1000 / 60);
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

        setTimeout(function () {

          animit(this._mainPage[0]).wait(delay).queue({
            transform: aboveTransform
          }, {
            duration: duration,
            timing: this.timing
          }).queue({
            transform: 'translate3d(0, 0, 0)'
          }).queue(function (done) {
            this._menuPage.css('display', 'none');
            callback();
            done();
          }.bind(this)).play();

          animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            done();
          }).play();
        }.bind(this), 1000 / 60);
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

babelHelpers.createClass = function () {
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
}();

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

        setTimeout(function () {

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
        }.bind(this), 1000 / 60);
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

        setTimeout(function () {

          animit(this._mainPage[0]).wait(delay).queue({
            transform: aboveTransform
          }, {
            duration: duration,
            timing: this.timing
          }).queue({
            transform: 'translate3d(0, 0, 0)'
          }).queue(function (done) {
            this._menuPage.css('display', 'none');
            callback();
            done();
          }.bind(this)).play();

          animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            done();
          }).play();
        }.bind(this), 1000 / 60);
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

babelHelpers.createClass = function () {
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
}();

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
        this._logic.on('open', function (options) {
          this._open(options);
        }.bind(this));
        this._logic.on('close', function (options) {
          this._close(options);
        }.bind(this));

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

        window.setTimeout(function () {
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
        }.bind(this), 400);

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

        var done = function () {
          if (options.closeMenu) {
            this.close();
          }
          options.callback();
        }.bind(this);

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

          this._doorLock.waitUnlock(function () {
            this._logic.close(options);
          }.bind(this));
        }
      },

      _close: function _close(options) {
        var callback = options.callback || function () {},
            unlock = this._doorLock.lock(),
            instant = options.animation == 'none';

        this._animator.closeMenu(function () {
          unlock();

          this._mainPage.children().css('pointer-events', '');
          this._mainPageGestureDetector.off('tap', this._boundOnTap);

          this.emit('postclose', {
            slidingMenu: this
          });

          callback();
        }.bind(this), instant);
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

        this._doorLock.waitUnlock(function () {
          this._logic.open(options);
        }.bind(this));
      },

      _open: function _open(options) {
        var callback = options.callback || function () {},
            unlock = this._doorLock.lock(),
            instant = options.animation == 'none';

        this._animator.openMenu(function () {
          unlock();

          this._mainPage.children().css('pointer-events', 'none');
          this._mainPageGestureDetector.on('tap', this._boundOnTap);

          this.emit('postopen', {
            slidingMenu: this
          });

          callback();
        }.bind(this), instant);
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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

        setTimeout(function () {
          this._element.css('display', 'block');
          unlock();
        }.bind(this), 1000 / 60 * 2);

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
          $onsen.getPageHTMLAsync(page).then(function (html) {
            this._appendSecondPage(angular.element(html.trim()));
          }.bind(this), function () {
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
          $onsen.getPageHTMLAsync(page).then(function (html) {
            this._appendMainPage(angular.element(html.trim()));
          }.bind(this), function () {
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

babelHelpers.createClass = function () {
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
}();

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
          return (_element$ = _this._element[0]).load.apply(_element$, arguments);
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

babelHelpers.createClass = function () {
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
}();

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
          return (_element$ = _this._element[0]).load.apply(_element$, arguments);
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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
      return window.ons.TabbarElement.registerAnimator(name, Animator);
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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

        return {
          pre: function pre(scope, element, attrs, controller, transclude) {
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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

  module.directive('onsCarouselItem', function () {
    return {
      restrict: 'E',
      compile: function compile(element, attrs) {
        return function (scope, element, attrs) {
          if (scope.$last) {
            element[0].parentElement._setup();
            element[0].parentElement._setupInitialIndex();
            element[0].parentElement._saveLastState();
          }
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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

  angular.module('onsen').directive('onsInput', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onInput = function onInput() {
          var set = $parse(attrs.ngModel).assign;

          if (el._isTextInput) {
            set(scope, el.value);
          } else if (el.type === 'radio' && el.checked) {
            set(scope, el.value);
          } else {
            set(scope, el.checked);
          }

          if (attrs.ngChange) {
            scope.$eval(attrs.ngChange);
          }

          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            if (el._isTextInput && typeof value !== 'undefined') {
              el.value = value;
            } else if (el.type === 'radio') {
              el.checked = value === el.value;
            } else {
              el.checked = value;
            }
          });

          el._isTextInput ? element.on('input', onInput) : element.on('change', onInput);
        }

        scope.$on('$destroy', function () {
          el._isTextInput ? element.off('input', onInput) : element.off('change', onInput);

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

  var lastReady = window.ons.NavigatorElement.rewritables.ready;
  window.ons.NavigatorElement.rewritables.ready = ons._waitDiretiveInit('ons-navigator', lastReady);

  var lastLink = window.ons.NavigatorElement.rewritables.link;
  window.ons.NavigatorElement.rewritables.link = function (navigatorElement, target, options, callback) {
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

        return {
          pre: function pre(scope, element, attrs, controller) {
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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

  var lastReady = window.ons.SplitterContentElement.rewritables.ready;
  window.ons.SplitterContentElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-content', lastReady);

  var lastLink = window.ons.SplitterContentElement.rewritables.link;
  window.ons.SplitterContentElement.rewritables.link = function (element, target, options, callback) {
    var view = angular.element(element).data('ons-splitter-content');
    lastLink(element, target, options, function (target) {
      view._link(target, callback);
    });
  };

  angular.module('onsen').directive('onsSplitterContent', ['$compile', 'SplitterContent', '$onsen', function ($compile, SplitterContent, $onsen) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {

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

babelHelpers.createClass = function () {
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
}();

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

  var lastReady = window.ons.SplitterSideElement.rewritables.ready;
  window.ons.SplitterSideElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-side', lastReady);

  var lastLink = window.ons.SplitterSideElement.rewritables.link;
  window.ons.SplitterSideElement.rewritables.link = function (element, target, options, callback) {
    var view = angular.element(element).data('ons-splitter-side');
    lastLink(element, target, options, function (target) {
      view._link(target, callback);
    });
  };

  angular.module('onsen').directive('onsSplitterSide', ['$compile', 'SplitterSide', '$onsen', function ($compile, SplitterSide, $onsen) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

  var lastReady = window.ons.TabbarElement.rewritables.ready;
  window.ons.TabbarElement.rewritables.ready = ons._waitDiretiveInit('ons-tabbar', lastReady);

  var lastLink = window.ons.TabbarElement.rewritables.link;
  window.ons.TabbarElement.rewritables.link = function (tabbarElement, target, options, callback) {
    var view = angular.element(tabbarElement).data('ons-tabbar');
    view._compileAndLink(target, function (target) {
      lastLink(tabbarElement, target, options, callback);
    });
  };

  var lastUnlink = window.ons.TabbarElement.rewritables.unlink;
  window.ons.TabbarElement.rewritables.unlink = function (tabbarElement, target, callback) {
    angular.element(target).data('_scope').$destroy();
    lastUnlink(tabbarElement, target, callback);
  };

  angular.module('onsen').directive('onsTabbar', ['$onsen', '$compile', '$parse', 'TabbarView', function ($onsen, $compile, $parse, TabbarView) {

    return {
      restrict: 'E',

      replace: false,
      scope: true,

      link: function link(scope, element, attrs, controller) {

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
        isIOS7above: function () {
          var ua = window.navigator.userAgent;
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
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

['alert', 'confirm', 'prompt'].forEach(function (name) {
  ons.notification[name] = function (message) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    typeof message === 'string' ? options.message = message : options = message;

    var compile = options.compile;

    options.compile = function (element) {
      var $element = angular.element(compile ? compile(element) : element);
      return ons.$compile($element)($element.injector().get('$rootScope'));
    };

    return ons.notification['_' + name + 'Original'](options);
  };
});
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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
}();

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

babelHelpers.createClass = function () {
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
}();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIiwidGVtcGxhdGVzLmpzIiwib25zZW4uanMiLCJhbGVydERpYWxvZy5qcyIsImFsZXJ0RGlhbG9nQW5pbWF0b3IuanMiLCJhbmltYXRpb25DaG9vc2VyLmpzIiwiY2Fyb3VzZWwuanMiLCJkaWFsb2cuanMiLCJkaWFsb2dBbmltYXRvci5qcyIsImZhYi5qcyIsImdlbmVyaWMuanMiLCJsYXp5UmVwZWF0LmpzIiwibGF6eVJlcGVhdERlbGVnYXRlLmpzIiwibW9kYWwuanMiLCJuYXZpZ2F0b3IuanMiLCJuYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IuanMiLCJvdmVybGF5U2xpZGluZ01lbnVBbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJwdXNoU2xpZGluZ01lbnVBbmltYXRvci5qcyIsInJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzbGlkaW5nTWVudS5qcyIsInNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzcGVlZERpYWwuanMiLCJzcGxpdFZpZXcuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsImJhY2tCdXR0b24uanMiLCJib3R0b21Ub29sYmFyLmpzIiwiYnV0dG9uLmpzIiwiZHVtbXlGb3JJbml0LmpzIiwiZ2VzdHVyZURldGVjdG9yLmpzIiwiaWNvbi5qcyIsImlmT3JpZW50YXRpb24uanMiLCJpZlBsYXRmb3JtLmpzIiwiaW5wdXQuanMiLCJrZXlib2FyZC5qcyIsImxpc3QuanMiLCJsaXN0SGVhZGVyLmpzIiwibGlzdEl0ZW0uanMiLCJsb2FkaW5nUGxhY2Vob2xkZXIuanMiLCJwcm9ncmVzc0Jhci5qcyIsInJhbmdlLmpzIiwicmlwcGxlLmpzIiwic2NvcGUuanMiLCJzcGxpdHRlckNvbnRlbnQuanMiLCJzcGxpdHRlclNpZGUuanMiLCJ0YWIuanMiLCJ0YWJCYXIuanMiLCJ0ZW1wbGF0ZS5qcyIsInRvb2xiYXIuanMiLCJ0b29sYmFyQnV0dG9uLmpzIiwiY29tcG9uZW50Q2xlYW5lci5qcyIsIm5vdGlmaWNhdGlvbi5qcyIsInNldHVwLmpzIiwidGVtcGxhdGVMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztBQUtBLENBQUMsWUFBVTtFQUNULElBQUksZUFBZTtNQUFPLFNBQVMsTUFBTSxLQUFLLFlBQVU7SUFFdEQ7T0FGZ0UsZUFBZTs7O0VBTWpGLEtBSEssUUFBUSxZQUFVOzs7RUFNdkIsTUFITSxTQUFTLFVBQVMsTUFBTTtJQUk1QixJQUhJLFNBQVMsS0FBSzs7OztJQU9sQixlQUhlO0lBSWYsSUFISSxZQUFZLElBQUk7SUFJcEIsZUFIZTs7O0lBTWYsS0FISyxJQUFJLFFBQVEsTUFBTTs7TUFLckIsVUFIVSxRQUFRLE9BQU8sS0FBSyxTQUFTLGNBQ3JDLE9BQU8sT0FBTyxTQUFTLGNBQWMsT0FBTyxLQUFLLEtBQUssU0FDckQsVUFBUyxNQUFNLElBQUc7UUFFbkIsT0FEUyxZQUFXO1VBRWxCLElBRE0sTUFBTSxLQUFLOzs7O1VBS2pCLEtBRE8sU0FBUyxPQUFPOzs7O1VBS3ZCLElBRE0sTUFBTSxHQUFHLE1BQU0sTUFBTTtVQUUzQixLQURPLFNBQVM7O1VBR2hCLE9BRFM7O1FBRVIsTUFBTSxLQUFLLFNBQ2QsS0FBSzs7OztJQUlULFNBQVMsUUFBUTs7TUFFZixJQUFLLENBQUMsZ0JBQWdCLEtBQUssTUFDekIsS0FBSyxLQUFLLE1BQU0sTUFBTTs7OztJQUcxQixNQUNNLFlBQVk7OztJQUVsQixNQUNNLFVBQVUsY0FBYzs7O0lBRTlCLE1BQ00sU0FBUyxVQUFVOztJQUN6QixPQUNPOztLQXhEWDtBQ0xBO0FBQ0EsQ0FBQyxVQUFTLEtBQUs7SUFDWCxJQUFBO1FBQ0ksTUFESSxRQUFRLE9BQU87TUFDM0IsT0FBTSxLQUFLO1FBRUgsTUFGVyxRQUFRLE9BQU8sa0JBQWtCOztJQUloRCxJ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O0lBQ0wsSUFBSSxTQUFTLEtBQUs7O0lBRWxCLElBQUksV0FBVyxXQUFXO01BQ3hCLE9BQU87OztJQUdULE9BQU8sT0FBTyxLQUFLOzs7O0FBSXZCLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWTtFQUN0RCxJQUFJLE9BQU8sZUFBZSxjQUFjLGVBQWUsTUFBTTtJQUMzRCxNQUFNLElBQUksVUFBVSw2REFBNkQsT0FBTzs7O0VBRzFGLFNBQVMsWUFBWSxPQUFPLE9BQU8sY0FBYyxXQUFXLFdBQVc7SUFDckUsYUFBYTtNQUNYLE9BQU87TUFDUCxZQUFZO01BQ1osVUFBVTtNQUNWLGNBQWM7OztFQUdsQixJQUFJLFlBQVksT0FBTyxpQkFBaUIsT0FBTyxlQUFlLFVBQVUsY0FBYyxTQUFTLFlBQVk7OztBQUc3RyxhQUFhLDRCQUE0QixVQUFVLE1BQU0sTUFBTTtFQUM3RCxJQUFJLENBQUMsTUFBTTtJQUNULE1BQU0sSUFBSSxlQUFlOzs7RUFHM0IsT0FBTyxTQUFTLE9BQU8sU0FBUyxZQUFZLE9BQU8sU0FBUyxjQUFjLE9BQU87OztBQUduRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTFEQSxDQUFDLFlBQVU7RUE4RVQ7O0VBRUEsUUE3RVEsT0FBTyxTQUFTLHVCQUFJLFVBQVMsZ0JBQWdCO0lBOEVuRCxJQTdFSSxZQUFZLE9BQU8sU0FBUyxpQkFBaUI7O0lBK0VqRCxLQTdFSyxJQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO01BOEV6QyxJQTdFSSxXQUFXLFFBQVEsUUFBUSxVQUFVO01BOEV6QyxJQTdFSSxLQUFLLFNBQVMsS0FBSztNQThFdkIsSUE3RUksT0FBTyxPQUFPLFVBQVU7UUE4RTFCLGVBN0VlLElBQUksSUFBSSxTQUFTOzs7O0tBVnhDIiwiZmlsZSI6ImFuZ3VsYXItb25zZW51aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFNpbXBsZSBKYXZhU2NyaXB0IEluaGVyaXRhbmNlXG4gKiBCeSBKb2huIFJlc2lnIGh0dHA6Ly9lam9obi5vcmcvXG4gKiBNSVQgTGljZW5zZWQuXG4gKi9cbi8vIEluc3BpcmVkIGJ5IGJhc2UyIGFuZCBQcm90b3R5cGVcbihmdW5jdGlvbigpe1xuICB2YXIgaW5pdGlhbGl6aW5nID0gZmFsc2UsIGZuVGVzdCA9IC94eXovLnRlc3QoZnVuY3Rpb24oKXt4eXo7fSkgPyAvXFxiX3N1cGVyXFxiLyA6IC8uKi87XG4gXG4gIC8vIFRoZSBiYXNlIENsYXNzIGltcGxlbWVudGF0aW9uIChkb2VzIG5vdGhpbmcpXG4gIHRoaXMuQ2xhc3MgPSBmdW5jdGlvbigpe307XG4gXG4gIC8vIENyZWF0ZSBhIG5ldyBDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBjbGFzc1xuICBDbGFzcy5leHRlbmQgPSBmdW5jdGlvbihwcm9wKSB7XG4gICAgdmFyIF9zdXBlciA9IHRoaXMucHJvdG90eXBlO1xuICAgXG4gICAgLy8gSW5zdGFudGlhdGUgYSBiYXNlIGNsYXNzIChidXQgb25seSBjcmVhdGUgdGhlIGluc3RhbmNlLFxuICAgIC8vIGRvbid0IHJ1biB0aGUgaW5pdCBjb25zdHJ1Y3RvcilcbiAgICBpbml0aWFsaXppbmcgPSB0cnVlO1xuICAgIHZhciBwcm90b3R5cGUgPSBuZXcgdGhpcygpO1xuICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgXG4gICAgLy8gQ29weSB0aGUgcHJvcGVydGllcyBvdmVyIG9udG8gdGhlIG5ldyBwcm90b3R5cGVcbiAgICBmb3IgKHZhciBuYW1lIGluIHByb3ApIHtcbiAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIG92ZXJ3cml0aW5nIGFuIGV4aXN0aW5nIGZ1bmN0aW9uXG4gICAgICBwcm90b3R5cGVbbmFtZV0gPSB0eXBlb2YgcHJvcFtuYW1lXSA9PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIF9zdXBlcltuYW1lXSA9PSBcImZ1bmN0aW9uXCIgJiYgZm5UZXN0LnRlc3QocHJvcFtuYW1lXSkgP1xuICAgICAgICAoZnVuY3Rpb24obmFtZSwgZm4pe1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLl9zdXBlcjtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBZGQgYSBuZXcgLl9zdXBlcigpIG1ldGhvZCB0aGF0IGlzIHRoZSBzYW1lIG1ldGhvZFxuICAgICAgICAgICAgLy8gYnV0IG9uIHRoZSBzdXBlci1jbGFzc1xuICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBfc3VwZXJbbmFtZV07XG4gICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVGhlIG1ldGhvZCBvbmx5IG5lZWQgdG8gYmUgYm91bmQgdGVtcG9yYXJpbHksIHNvIHdlXG4gICAgICAgICAgICAvLyByZW1vdmUgaXQgd2hlbiB3ZSdyZSBkb25lIGV4ZWN1dGluZ1xuICAgICAgICAgICAgdmFyIHJldCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7ICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gdG1wO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkobmFtZSwgcHJvcFtuYW1lXSkgOlxuICAgICAgICBwcm9wW25hbWVdO1xuICAgIH1cbiAgIFxuICAgIC8vIFRoZSBkdW1teSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgIGZ1bmN0aW9uIENsYXNzKCkge1xuICAgICAgLy8gQWxsIGNvbnN0cnVjdGlvbiBpcyBhY3R1YWxseSBkb25lIGluIHRoZSBpbml0IG1ldGhvZFxuICAgICAgaWYgKCAhaW5pdGlhbGl6aW5nICYmIHRoaXMuaW5pdCApXG4gICAgICAgIHRoaXMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgIFxuICAgIC8vIFBvcHVsYXRlIG91ciBjb25zdHJ1Y3RlZCBwcm90b3R5cGUgb2JqZWN0XG4gICAgQ2xhc3MucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICAgXG4gICAgLy8gRW5mb3JjZSB0aGUgY29uc3RydWN0b3IgdG8gYmUgd2hhdCB3ZSBleHBlY3RcbiAgICBDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDbGFzcztcbiBcbiAgICAvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcbiAgICBDbGFzcy5leHRlbmQgPSBhcmd1bWVudHMuY2FsbGVlO1xuICAgXG4gICAgcmV0dXJuIENsYXNzO1xuICB9O1xufSkoKTsiLCIvL0hFQUQgXG4oZnVuY3Rpb24oYXBwKSB7XG50cnkgeyBhcHAgPSBhbmd1bGFyLm1vZHVsZShcInRlbXBsYXRlcy1tYWluXCIpOyB9XG5jYXRjaChlcnIpIHsgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJ0ZW1wbGF0ZXMtbWFpblwiLCBbXSk7IH1cbmFwcC5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcblwidXNlIHN0cmljdFwiO1xuXG4kdGVtcGxhdGVDYWNoZS5wdXQoXCJ0ZW1wbGF0ZXMvc2xpZGluZ19tZW51LnRwbFwiLFwiPGRpdiBjbGFzcz1cXFwib25zZW4tc2xpZGluZy1tZW51X19tZW51IG9ucy1zbGlkaW5nLW1lbnUtaW5uZXJcXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNsaWRpbmctbWVudV9fbWFpbiBvbnMtc2xpZGluZy1tZW51LWlubmVyXFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCJcIilcblxuJHRlbXBsYXRlQ2FjaGUucHV0KFwidGVtcGxhdGVzL3NwbGl0X3ZpZXcudHBsXCIsXCI8ZGl2IGNsYXNzPVxcXCJvbnNlbi1zcGxpdC12aWV3X19zZWNvbmRhcnkgZnVsbC1zY3JlZW4gb25zLXNwbGl0LXZpZXctaW5uZXJcXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNwbGl0LXZpZXdfX21haW4gZnVsbC1zY3JlZW4gb25zLXNwbGl0LXZpZXctaW5uZXJcXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIlwiKVxufV0pO1xufSkoKTsiLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICAvKipcbiAgICogSW50ZXJuYWwgc2VydmljZSBjbGFzcyBmb3IgZnJhbWV3b3JrIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJyRvbnNlbicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICR3aW5kb3csICRjYWNoZUZhY3RvcnksICRkb2N1bWVudCwgJHRlbXBsYXRlQ2FjaGUsICRodHRwLCAkcSwgJG9uc0dsb2JhbCwgQ29tcG9uZW50Q2xlYW5lcikge1xuXG4gICAgdmFyICRvbnNlbiA9IGNyZWF0ZU9uc2VuU2VydmljZSgpO1xuICAgIHZhciBNb2RpZmllclV0aWwgPSAkb25zR2xvYmFsLl9pbnRlcm5hbC5Nb2RpZmllclV0aWw7XG5cbiAgICByZXR1cm4gJG9uc2VuO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlT25zZW5TZXJ2aWNlKCkge1xuICAgICAgcmV0dXJuIHtcblxuICAgICAgICBESVJFQ1RJVkVfVEVNUExBVEVfVVJMOiAndGVtcGxhdGVzJyxcblxuICAgICAgICBjbGVhbmVyOiBDb21wb25lbnRDbGVhbmVyLFxuXG4gICAgICAgIERldmljZUJhY2tCdXR0b25IYW5kbGVyOiAkb25zR2xvYmFsLl9kZXZpY2VCYWNrQnV0dG9uRGlzcGF0Y2hlcixcblxuICAgICAgICBfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyOiAkb25zR2xvYmFsLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldERlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1ldGhvZE5hbWVzXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZGlzcG9zZSBhbGwgZHJpdmluZyBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlTWV0aG9kczogZnVuY3Rpb24odmlldywgZWxlbWVudCwgbWV0aG9kTmFtZXMpIHtcbiAgICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRbbWV0aG9kTmFtZV0uYXBwbHkoZWxlbWVudCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZpZXcgPSBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0NsYXNzfSBrbGFzc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQ6IGZ1bmN0aW9uKGtsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoa2xhc3MucHJvdG90eXBlLCBwcm9wZXJ0eSwge1xuICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXVtwcm9wZXJ0eV0gPSB2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXR1cm4tYXNzaWduXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnROYW1lc1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbbWFwXVxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGNsZWFyIGFsbCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZUV2ZW50czogZnVuY3Rpb24odmlldywgZWxlbWVudCwgZXZlbnROYW1lcywgbWFwKSB7XG4gICAgICAgICAgbWFwID0gbWFwIHx8IGZ1bmN0aW9uKGRldGFpbCkgeyByZXR1cm4gZGV0YWlsOyB9O1xuICAgICAgICAgIGV2ZW50TmFtZXMgPSBbXS5jb25jYXQoZXZlbnROYW1lcyk7XG4gICAgICAgICAgdmFyIGxpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgdmlldy5lbWl0KGV2ZW50TmFtZSwgbWFwKE9iamVjdC5jcmVhdGUoZXZlbnQuZGV0YWlsKSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZnVuY3Rpb24oZXZlbnROYW1lLCBpbmRleCkge1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lcnNbaW5kZXhdLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZpZXcgPSBlbGVtZW50ID0gbGlzdGVuZXJzID0gbWFwID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNFbmFibGVkQXV0b1N0YXR1c0JhckZpbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhISRvbnNHbG9iYWwuX2NvbmZpZy5hdXRvU3RhdHVzQmFyRmlsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHNob3VsZEZpbGxTdGF0dXNCYXI6ICRvbnNHbG9iYWwuc2hvdWxkRmlsbFN0YXR1c0JhcixcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBhdXRvU3RhdHVzQmFyRmlsbDogJG9uc0dsb2JhbC5hdXRvU3RhdHVzQmFyRmlsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge1Njb3BlfSBbcGFyYW1zLnNjb3BlXVxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gW3BhcmFtcy5lbGVtZW50XVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zLmVsZW1lbnRzXVxuICAgICAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IFtwYXJhbXMuYXR0cnNdXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhckNvbXBvbmVudDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5zY29wZSkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUocGFyYW1zLnNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmF0dHJzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKHBhcmFtcy5hdHRycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KHBhcmFtcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmaW5kRWxlbWVudGVPYmplY3Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5pbmhlcml0ZWREYXRhKG5hbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UGFnZUhUTUxBc3luYzogZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgIHZhciBjYWNoZSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChwYWdlKTtcblxuICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0eXBlb2YgY2FjaGUgPT09ICdzdHJpbmcnID8gY2FjaGUgOiBjYWNoZVsxXTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5ub3JtYWxpemVQYWdlSFRNTChodG1sKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgIHVybDogcGFnZSxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB2YXIgaHRtbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbm9ybWFsaXplUGFnZUhUTUw6IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBodG1sID0gKCcnICsgaHRtbCkudHJpbSgpO1xuXG4gICAgICAgICAgaWYgKCFodG1sLm1hdGNoKC9ePG9ucy1wYWdlLykpIHtcbiAgICAgICAgICAgIGh0bWwgPSAnPG9ucy1wYWdlIF9tdXRlZD4nICsgaHRtbCArICc8L29ucy1wYWdlPic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBtb2RpZmllciB0ZW1wbGF0ZXIgZnVuY3Rpb24uIFRoZSBtb2RpZmllciB0ZW1wbGF0ZXIgZ2VuZXJhdGUgY3NzIGNsYXNzZXMgYm91bmQgbW9kaWZpZXIgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFttb2RpZmllcnNdIGFuIGFycmF5IG9mIGFwcGVuZGl4IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2VuZXJhdGVNb2RpZmllclRlbXBsYXRlcjogZnVuY3Rpb24oYXR0cnMsIG1vZGlmaWVycykge1xuICAgICAgICAgIHZhciBhdHRyTW9kaWZpZXJzID0gYXR0cnMgJiYgdHlwZW9mIGF0dHJzLm1vZGlmaWVyID09PSAnc3RyaW5nJyA/IGF0dHJzLm1vZGlmaWVyLnRyaW0oKS5zcGxpdCgvICsvKSA6IFtdO1xuICAgICAgICAgIG1vZGlmaWVycyA9IGFuZ3VsYXIuaXNBcnJheShtb2RpZmllcnMpID8gYXR0ck1vZGlmaWVycy5jb25jYXQobW9kaWZpZXJzKSA6IGF0dHJNb2RpZmllcnM7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlIGVnLiAnb25zLWJ1dHRvbi0tKicsICdvbnMtYnV0dG9uLS0qX19pdGVtJ1xuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RpZmllcnMubWFwKGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSkuam9pbignICcpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0IGZvciBjdXN0b20gZWxlbWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgdmFyIHRva2VucyA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpO1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJVdGlsLnNwbGl0KG5lZWRsZSkuc29tZShmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLmluZGV4T2YobmVlZGxlKSAhPSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IHR5cGVvZiBuZWVkbGUgPT09ICdzdHJpbmcnID8gbmVlZGxlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgICAgIHZhciBtb2RpZmllciA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpLmZpbHRlcihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiAhPT0gbmVlZGxlO1xuICAgICAgICAgICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFkZE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgZWxlbWVudC5hdHRyKCdtb2RpZmllcicpICsgJyAnICsgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0TW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzTW9kaWZpZXIobW9kaWZpZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2RdID0gbWV0aG9kc1ttZXRob2RdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1vZGlmaWVyIG1ldGhvZHMgdG8gdmlldyBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kczogZnVuY3Rpb24odmlldywgdGVtcGxhdGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgX3RyID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZm5zID0ge1xuICAgICAgICAgICAgaGFzTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50Lmhhc0NsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuYXR0cignY2xhc3MnKS5zcGxpdCgvXFxzKy8pLFxuICAgICAgICAgICAgICAgICAgcGF0dCA9IHRlbXBsYXRlLnJlcGxhY2UoJyonLCAnLicpO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjbHMgPSBjbGFzc2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNscy5tYXRjaChwYXR0KSkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNscyA9IF90cihtb2RpZmllcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKGNscykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNscyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbihvbGRGbiwgbmV3Rm4pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB8fCBuZXdGbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld0ZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gYXBwZW5kKHZpZXcuaGFzTW9kaWZpZXIsIGZucy5oYXNNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5yZW1vdmVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnJlbW92ZU1vZGlmaWVyLCBmbnMucmVtb3ZlTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcuYWRkTW9kaWZpZXIgPSBhcHBlbmQodmlldy5hZGRNb2RpZmllciwgZm5zLmFkZE1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnNldE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuc2V0TW9kaWZpZXIsIGZucy5zZXRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnRvZ2dsZU1vZGlmaWVyLCBmbnMudG9nZ2xlTW9kaWZpZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbW9kaWZpZXIgbWV0aG9kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gdmlldy5yZW1vdmVNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gdmlldy5zZXRNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LnRvZ2dsZU1vZGlmaWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlIGFzICd2YXInIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZGVjbGFyZVZhckF0dHJpYnV0ZTogZnVuY3Rpb24oYXR0cnMsIG9iamVjdCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXR0cnMudmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHZhck5hbWUgPSBhdHRycy52YXI7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVWYXIodmFyTmFtZSwgb2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlZ2lzdGVyRXZlbnRIYW5kbGVyOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZSkge1xuICAgICAgICAgIHZhciBjYXBpdGFsaXplZEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGV2ZW50TmFtZS5zbGljZSgxKTtcblxuICAgICAgICAgIGNvbXBvbmVudC5vbihldmVudE5hbWUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGNvbXBvbmVudC5fZWxlbWVudFswXSwgZXZlbnROYW1lLCBldmVudCk7XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0gY29tcG9uZW50Ll9hdHRyc1snb25zJyArIGNhcGl0YWxpemVkRXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWwoaGFuZGxlciwgeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgICAgY29tcG9uZW50Ll9zY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdGVyIGV2ZW50IGhhbmRsZXJzIGZvciBhdHRyaWJ1dGVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVzXG4gICAgICAgICAqL1xuICAgICAgICByZWdpc3RlckV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uKGNvbXBvbmVudCwgZXZlbnROYW1lcykge1xuICAgICAgICAgIGV2ZW50TmFtZXMgPSBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudE5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50TmFtZXNbaV07XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlckV2ZW50SGFuZGxlcihjb21wb25lbnQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNBbmRyb2lkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISF3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvYW5kcm9pZC9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzSU9TOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISF3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlwYWR8aXBob25lfGlwb2QgdG91Y2gpL2kpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNXZWJWaWV3OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gd2luZG93Lm9ucy5pc1dlYlZpZXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzSU9TN2Fib3ZlOiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgdmFyIG1hdGNoID0gdWEubWF0Y2goLyhpUGFkfGlQaG9uZXxpUG9kIHRvdWNoKTsuKkNQVS4qT1MgKFxcZCspXyhcXGQrKS9pKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBtYXRjaCA/IHBhcnNlRmxvYXQobWF0Y2hbMl0gKyAnLicgKyBtYXRjaFszXSkgPj0gNyA6IGZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlIGEgbmFtZWQgZXZlbnQgZm9yIGEgY29tcG9uZW50LiBUaGUgdmlldyBvYmplY3QsIGlmIGl0IGV4aXN0cywgaXMgYXR0YWNoZWQgdG8gZXZlbnQuY29tcG9uZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbZG9tXVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgZmlyZUNvbXBvbmVudEV2ZW50OiBmdW5jdGlvbihkb20sIGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuXG4gICAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcblxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIGV2ZW50W2tleV0gPSBkYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXZlbnQuY29tcG9uZW50ID0gZG9tID9cbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChkb20pLmRhdGEoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHx8IG51bGwgOiBudWxsO1xuICAgICAgICAgIGV2ZW50LmluaXRFdmVudChkb20ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSArICc6JyArIGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICBkb20uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSBhIHZhcmlhYmxlIHRvIEphdmFTY3JpcHQgZ2xvYmFsIHNjb3BlIGFuZCBBbmd1bGFySlMgc2NvcGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFV0aWwuZGVmaW5lVmFyKCdmb28nLCAnZm9vLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28gYW5kICRzY29wZS5mb28gaXMgbm93ICdmb28tdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIFV0aWwuZGVmaW5lVmFyKCdmb28uYmFyJywgJ2Zvby1iYXItdmFsdWUnKTtcbiAgICAgICAgICogLy8gPT4gd2luZG93LmZvby5iYXIgYW5kICRzY29wZS5mb28uYmFyIGlzIG5vdyAnZm9vLWJhci12YWx1ZSdcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgX2RlZmluZVZhcjogZnVuY3Rpb24obmFtZSwgb2JqZWN0KSB7XG4gICAgICAgICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdCgvXFwuLyk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXQoY29udGFpbmVyLCBuYW1lcywgb2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgbmFtZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcltuYW1lXSA9PT0gdW5kZWZpbmVkIHx8IGNvbnRhaW5lcltuYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lXSA9IHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lcltuYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGFpbmVyW25hbWVzW25hbWVzLmxlbmd0aCAtIDFdXSA9IG9iamVjdDtcblxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gIT09IG9iamVjdCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgdmFyPVwiJyArIG9iamVjdC5fYXR0cnMudmFyICsgJ1wiIGJlY2F1c2UgaXQgd2lsbCBvdmVyd3JpdGUgYSByZWFkLW9ubHkgdmFyaWFibGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9ucy5jb21wb25lbnRCYXNlKSB7XG4gICAgICAgICAgICBzZXQob25zLmNvbXBvbmVudEJhc2UsIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEF0dGFjaCB0byBhbmNlc3RvciB3aXRoIG9ucy1zY29wZSBhdHRyaWJ1dGUuXG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSBvYmplY3QuX2VsZW1lbnRbMF07XG5cbiAgICAgICAgICB3aGlsZSAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ29ucy1zY29wZScpKSB7XG4gICAgICAgICAgICAgIHNldChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnX3Njb3BlJyksIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgIC8vIElmIG5vIG9ucy1zY29wZSBlbGVtZW50IHdhcyBmb3VuZCwgYXR0YWNoIHRvICRyb290U2NvcGUuXG4gICAgICAgICAgc2V0KCRyb290U2NvcGUsIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1hbGVydC1kaWFsb2dcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGFsZXJ0IGRpYWxvZy5bL2VuXVxuICogIFtqYV3jgZPjga7jgqLjg6njg7zjg4jjg4DjgqTjgqLjg63jgrDjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZdsaXN0ZW5lcuODkeODqeODoeODvOOCv+OBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOAgeOBneOBruOCpOODmeODs+ODiOOBruODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844Gu6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5rih44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogQWxlcnQgZGlhbG9nIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQWxlcnREaWFsb2cnLCBmdW5jdGlvbigkb25zZW4sIEFsZXJ0RGlhbG9nVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBhbGVydERpYWxvZyA9IG5ldyBBbGVydERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoYWxlcnREaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGFsZXJ0RGlhbG9nLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWxlcnQtZGlhbG9nJywgYWxlcnREaWFsb2cpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGFsZXJ0RGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnQWxlcnREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuQWxlcnREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdBbmRyb2lkQWxlcnREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnSU9TQWxlcnREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuSU9TQWxlcnREaWFsb2dBbmltYXRvcik7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKS52YWx1ZSgnQW5pbWF0aW9uQ2hvb3NlcicsIG9ucy5faW50ZXJuYWwuQW5pbWF0b3JGYWN0b3J5KTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWNhcm91c2VsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUNhcm91c2VsIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFd44Kr44Or44O844K744Or44KS6KGo56S644Gn44GN44KL44Kz44Oz44Od44O844ON44Oz44OI44CCWy9qYV1cbiAqIEBjb2RlcGVuIHhiYnpPUVxuICogQGd1aWRlIFVzaW5nQ2Fyb3VzZWxcbiAqICAgW2VuXUxlYXJuIGhvdyB0byB1c2UgdGhlIGNhcm91c2VsIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFdY2Fyb3VzZWzjgrPjg7Pjg53jg7zjg43jg7Pjg4jjga7kvb/jgYTmlrlbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtY2Fyb3VzZWwgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAyMDBweFwiPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgPG9ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgLi4uXG4gKiAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiA8L29ucy1jYXJvdXNlbD5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBjYXJvdXNlbC5bL2VuXVxuICogICBbamFd44GT44Gu44Kr44Or44O844K744Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1yZWZyZXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJyZWZyZXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWZyZXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtb3ZlcnNjcm9sbFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwib3ZlcnNjcm9sbFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwib3ZlcnNjcm9sbFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0Nhcm91c2VsJywgZnVuY3Rpb24oJG9uc2VuLCBDYXJvdXNlbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGNhcm91c2VsID0gbmV3IENhcm91c2VsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtY2Fyb3VzZWwnLCBjYXJvdXNlbCk7XG5cbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGNhcm91c2VsLCAncG9zdGNoYW5nZSByZWZyZXNoIG92ZXJzY3JvbGwgZGVzdHJveScpO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBjYXJvdXNlbCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYXJvdXNlbC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtY2Fyb3VzZWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWxJdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLiRsYXN0KSB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwKCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwSW5pdGlhbEluZGV4KCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NhdmVMYXN0U3RhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNEaWFsb2cnLCBmdW5jdGlvbigkb25zZW4sIERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBkaWFsb2cgPSBuZXcgRGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGRpYWxvZyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGRpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoZGlhbG9nLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgZGlhbG9nKTtcbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoZGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ0RpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5EaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdJT1NEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuSU9TRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnQW5kcm9pZERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbmRyb2lkRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnU2xpZGVEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuU2xpZGVEaWFsb2dBbmltYXRvcik7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1mYWJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhlIGZsb2F0aW5nIGFjdGlvbiBidXR0b24uWy9lbl1cbiAqICAgW2phXeOBk+OBruODleODreODvOODhuOCo+ODs+OCsOOCouOCr+OCt+ODp+ODs+ODnOOCv+ODs+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuOBl+OBpuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0ZhYicsIGZ1bmN0aW9uKCRvbnNlbiwgRmFiVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGZhYiA9IG5ldyBGYWJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCBmYWIpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGZhYik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBHZW5lcmljVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGl2ZU9ubHkpIHtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzKHRoaXMsIG9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSwgZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRoaXMsIGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzZWxmKTtcblxuICAgICAgICAgIGlmIChvcHRpb25zLm9uRGVzdHJveSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3koc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNlbGYgPSBlbGVtZW50ID0gc2VsZi5fZWxlbWVudCA9IHNlbGYuX3Njb3BlID0gc2NvcGUgPSBzZWxmLl9hdHRycyA9IGF0dHJzID0gb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnZpZXdLZXlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAqL1xuICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyID0gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMudmlld0tleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMudmlld0tleSBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cblxuICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgdmlldyk7XG5cbiAgICAgIHZhciBkZXN0cm95ID0gb3B0aW9ucy5vbkRlc3Ryb3kgfHwgYW5ndWxhci5ub29wO1xuICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgIGRlc3Ryb3kodmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIG51bGwpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oR2VuZXJpY1ZpZXcpO1xuXG4gICAgcmV0dXJuIEdlbmVyaWNWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sYXp5LXJlcGVhdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBVc2luZyB0aGlzIGNvbXBvbmVudCBhIGxpc3Qgd2l0aCBtaWxsaW9ucyBvZiBpdGVtcyBjYW4gYmUgcmVuZGVyZWQgd2l0aG91dCBhIGRyb3AgaW4gcGVyZm9ybWFuY2UuXG4gKiAgICAgSXQgZG9lcyB0aGF0IGJ5IFwibGF6aWx5XCIgbG9hZGluZyBlbGVtZW50cyBpbnRvIHRoZSBET00gd2hlbiB0aGV5IGNvbWUgaW50byB2aWV3IGFuZFxuICogICAgIHJlbW92aW5nIGl0ZW1zIGZyb20gdGhlIERPTSB3aGVuIHRoZXkgYXJlIG5vdCB2aXNpYmxlLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI5YaF44Gn5o+P55S744GV44KM44KL44Ki44Kk44OG44Og44GuRE9N6KaB57Sg44Gu6Kqt44G/6L6844G/44Gv44CB55S76Z2i44Gr6KaL44GI44Gd44GG44Gr44Gq44Gj44Gf5pmC44G+44Gn6Ieq5YuV55qE44Gr6YGF5bu244GV44KM44CBXG4gKiAgICAg55S76Z2i44GL44KJ6KaL44GI44Gq44GP44Gq44Gj44Gf5aC05ZCI44Gr44Gv44Gd44Gu6KaB57Sg44Gv5YuV55qE44Gr44Ki44Oz44Ot44O844OJ44GV44KM44G+44GZ44CCXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5L2/44GG44GT44Go44Gn44CB44OR44OV44Kp44O844Oe44Oz44K544KS5Yqj5YyW44GV44Gb44KL44GT44Go54Sh44GX44Gr5beo5aSn44Gq5pWw44Gu6KaB57Sg44KS5o+P55S744Gn44GN44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAY29kZXBlbiBRd3JHQm1cbiAqIEBndWlkZSBVc2luZ0xhenlSZXBlYXRcbiAqICAgW2VuXUhvdyB0byB1c2UgTGF6eSBSZXBlYXRbL2VuXVxuICogICBbamFd44Os44Kk44K444O844Oq44OU44O844OI44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAqICAgICAkc2NvcGUuTXlEZWxlZ2F0ZSA9IHtcbiAqICAgICAgIGNvdW50SXRlbXM6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAvLyBSZXR1cm4gbnVtYmVyIG9mIGl0ZW1zLlxuICogICAgICAgICByZXR1cm4gMTAwMDAwMDtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY2FsY3VsYXRlSXRlbUhlaWdodDogZnVuY3Rpb24oaW5kZXgpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIHRoZSBoZWlnaHQgb2YgYW4gaXRlbSBpbiBwaXhlbHMuXG4gKiAgICAgICAgIHJldHVybiA0NTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY29uZmlndXJlSXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIEluaXRpYWxpemUgc2NvcGVcbiAqICAgICAgICAgaXRlbVNjb3BlLml0ZW0gPSAnSXRlbSAjJyArIChpbmRleCArIDEpO1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBkZXN0cm95SXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIE9wdGlvbmFsIG1ldGhvZCB0aGF0IGlzIGNhbGxlZCB3aGVuIGFuIGl0ZW0gaXMgdW5sb2FkZWQuXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCdEZXN0cm95ZWQgaXRlbSB3aXRoIGluZGV4OiAnICsgaW5kZXgpO1xuICogICAgICAgfVxuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1saXN0IG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLWxhenktcmVwZWF0PVwiTXlEZWxlZ2F0ZVwiPlxuICogICAgIHt7IGl0ZW0gfX1cbiAqICAgPC9vbnMtbGlzdC1pdGVtPlxuICogPC9vbnMtbGlzdD5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWxhenktcmVwZWF0XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUEgZGVsZWdhdGUgb2JqZWN0LCBjYW4gYmUgZWl0aGVyIGFuIG9iamVjdCBhdHRhY2hlZCB0byB0aGUgc2NvcGUgKHdoZW4gdXNpbmcgQW5ndWxhckpTKSBvciBhIG5vcm1hbCBKYXZhU2NyaXB0IHZhcmlhYmxlLlsvZW5dXG4gKiAgW2phXeimgee0oOOBruODreODvOODieOAgeOCouODs+ODreODvOODieOBquOBqeOBruWHpueQhuOCkuWnlOitsuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAgkFuZ3VsYXJKU+OBruOCueOCs+ODvOODl+OBruWkieaVsOWQjeOChOOAgemAmuW4uOOBrkphdmFTY3JpcHTjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQHByb3BlcnR5IGRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GdW5jdGlvbiB3aGljaCByZWNpZXZlcyBhbiBpbmRleCBhbmQgdGhlIHNjb3BlIGZvciB0aGUgaXRlbS4gQ2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHZhbHVlcyBpbiB0aGUgaXRlbSBzY29wZS5bL2VuXVxuICogICBbamFdWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIExhenkgcmVwZWF0IGRpcmVjdGl2ZS5cbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0xhenlSZXBlYXQnLCBmdW5jdGlvbigkb25zZW4sIExhenlSZXBlYXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgdGVybWluYWw6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgbGF6eVJlcGVhdCA9IG5ldyBMYXp5UmVwZWF0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBsYXp5UmVwZWF0ID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZScsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG5cbiAgICBjb25zdCBkaXJlY3RpdmVBdHRyaWJ1dGVzID0gWydvbnMtbGF6eS1yZXBlYXQnLCAnb25zOmxhenk6cmVwZWF0JywgJ29uc19sYXp5X3JlcGVhdCcsICdkYXRhLW9ucy1sYXp5LXJlcGVhdCcsICd4LW9ucy1sYXp5LXJlcGVhdCddO1xuICAgIGNsYXNzIEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUgZXh0ZW5kcyBvbnMuX2ludGVybmFsLkxhenlSZXBlYXREZWxlZ2F0ZSB7XG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyRGVsZWdhdGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGVtcGxhdGVFbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge1Njb3BlfSBwYXJlbnRTY29wZVxuICAgICAgICovXG4gICAgICBjb25zdHJ1Y3Rvcih1c2VyRGVsZWdhdGUsIHRlbXBsYXRlRWxlbWVudCwgcGFyZW50U2NvcGUpIHtcbiAgICAgICAgc3VwZXIodXNlckRlbGVnYXRlLCB0ZW1wbGF0ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9wYXJlbnRTY29wZSA9IHBhcmVudFNjb3BlO1xuXG4gICAgICAgIGRpcmVjdGl2ZUF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyID0+IHRlbXBsYXRlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpO1xuICAgICAgICB0aGlzLl9saW5rZXIgPSAkY29tcGlsZSh0ZW1wbGF0ZUVsZW1lbnQgPyB0ZW1wbGF0ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIDogbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZShpdGVtLCBzY29wZSl7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKGl0ZW0sIHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkZXN0cm95SXRlbVNjb3BlKGl0ZW0sIGVsZW1lbnQpe1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmRlc3Ryb3lJdGVtU2NvcGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VzZXJEZWxlZ2F0ZS5kZXN0cm95SXRlbVNjb3BlKGl0ZW0sIGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF91c2luZ0JpbmRpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbGF6eS1yZXBlYXRgIGRlbGVnYXRlIG9iamVjdCBpcyB2YWd1ZS4nKTtcbiAgICAgIH1cblxuICAgICAgbG9hZEl0ZW1FbGVtZW50KGluZGV4LCBwYXJlbnQsIGRvbmUpIHtcbiAgICAgICAgdGhpcy5fcHJlcGFyZUl0ZW1FbGVtZW50KGluZGV4LCAoe2VsZW1lbnQsIHNjb3BlfSkgPT4ge1xuICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICBkb25lKHtlbGVtZW50LCBzY29wZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgX3ByZXBhcmVJdGVtRWxlbWVudChpbmRleCwgZG9uZSkge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuX3BhcmVudFNjb3BlLiRuZXcoKTtcbiAgICAgICAgdGhpcy5fYWRkU3BlY2lhbFByb3BlcnRpZXMoaW5kZXgsIHNjb3BlKTtcblxuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgc2NvcGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGlua2VyKHNjb3BlLCAoY2xvbmVkKSA9PiB7XG4gICAgICAgICAgbGV0IGVsZW1lbnQgPSBjbG9uZWRbMF07XG4gICAgICAgICAgaWYgKCF0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuX3VzZXJEZWxlZ2F0ZS5jcmVhdGVJdGVtQ29udGVudChpbmRleCwgZWxlbWVudCk7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KShzY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9uZSh7ZWxlbWVudCwgc2NvcGV9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqL1xuICAgICAgX2FkZFNwZWNpYWxQcm9wZXJ0aWVzKGksIHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmNvdW50SXRlbXMoKSAtIDE7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHNjb3BlLCB7XG4gICAgICAgICAgJGluZGV4OiBpLFxuICAgICAgICAgICRmaXJzdDogaSA9PT0gMCxcbiAgICAgICAgICAkbGFzdDogaSA9PT0gbGFzdCxcbiAgICAgICAgICAkbWlkZGxlOiBpICE9PSAwICYmIGkgIT09IGxhc3QsXG4gICAgICAgICAgJGV2ZW46IGkgJSAyID09PSAwLFxuICAgICAgICAgICRvZGQ6IGkgJSAyID09PSAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIGl0ZW0uc2NvcGUuJGV2YWxBc3luYygoKSA9PiB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0uc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gaXRlbS5lbGVtZW50XG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3lJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuZGVzdHJveUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIuZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0uZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5zY29wZS4kZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBkZXN0cm95KCkge1xuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlO1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1tb2RhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG1vZGFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg6Ljg7zjg4Djg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBNb2RhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc01vZGFsJywgZnVuY3Rpb24oJG9uc2VuLCBNb2RhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogKGVsZW1lbnQsIGF0dHJzKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKG1vZGFsLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIG1vZGFsKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgbW9kYWwpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMobW9kYWwpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIG1vZGFsID0gZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLW5hdmlnYXRvclxuICogQGV4YW1wbGVcbiAqIDxvbnMtbmF2aWdhdG9yIGFuaW1hdGlvbj1cInNsaWRlXCIgdmFyPVwiYXBwLm5hdmlcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wdXNoUGFnZSgncGFnZS5odG1sJyk7XCI+UHVzaDwvb25zLWJ1dHRvbj5cbiAqICAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy1uYXZpZ2F0b3I+XG4gKlxuICogPG9ucy10ZW1wbGF0ZSBpZD1cInBhZ2UuaHRtbFwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICAgPG9ucy10b29sYmFyPlxuICogICAgICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlRpdGxlPC9kaXY+XG4gKiAgICAgPC9vbnMtdG9vbGJhcj5cbiAqXG4gKiAgICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgIDxvbnMtYnV0dG9uIG1vZGlmaWVyPVwibGlnaHRcIiBuZy1jbGljaz1cImFwcC5uYXZpLnBvcFBhZ2UoKTtcIj5Qb3A8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBuYXZpZ2F0b3IuWy9lbl1cbiAqICBbamFd44GT44Gu44OK44OT44Ky44O844K/44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXB1c2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXBvcFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlcG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cHVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3Rwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3Rwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3Rwb3BcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5OYXZpZ2F0b3JFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtbmF2aWdhdG9yJywgbGFzdFJlYWR5KTtcblxuICB2YXIgbGFzdExpbmsgPSB3aW5kb3cub25zLk5hdmlnYXRvckVsZW1lbnQucmV3cml0YWJsZXMubGluaztcbiAgd2luZG93Lm9ucy5OYXZpZ2F0b3JFbGVtZW50LnJld3JpdGFibGVzLmxpbmsgPSBmdW5jdGlvbihuYXZpZ2F0b3JFbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHZpZXcgPSBhbmd1bGFyLmVsZW1lbnQobmF2aWdhdG9yRWxlbWVudCkuZGF0YSgnb25zLW5hdmlnYXRvcicpO1xuICAgIHZpZXcuX2NvbXBpbGVBbmRMaW5rKHRhcmdldCwgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBsYXN0TGluayhuYXZpZ2F0b3JFbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc05hdmlnYXRvcicsIGZ1bmN0aW9uKE5hdmlnYXRvclZpZXcsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgICAgdmFyIG5hdmlnYXRvciA9IG5ldyBOYXZpZ2F0b3JWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBuYXZpZ2F0b3IpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhuYXZpZ2F0b3IsICdwcmVwdXNoIHByZXBvcCBwb3N0cHVzaCBwb3N0cG9wIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbmF2aWdhdG9yJywgbmF2aWdhdG9yKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBuYXZpZ2F0b3IuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbmF2aWdhdG9yJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5OYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnRmFkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRmFkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdJT1NTbGlkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuSU9TU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnTGlmdFRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuTGlmdE5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdOdWxsVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5OYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnU2ltcGxlU2xpZGVUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlNpbXBsZVNsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ092ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yJywgZnVuY3Rpb24oU2xpZGluZ01lbnVBbmltYXRvcikge1xuXG4gICAgdmFyIE92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yID0gU2xpZGluZ01lbnVBbmltYXRvci5leHRlbmQoe1xuXG4gICAgICBfYmxhY2tNYXNrOiB1bmRlZmluZWQsXG5cbiAgICAgIF9pc1JpZ2h0OiBmYWxzZSxcbiAgICAgIF9lbGVtZW50OiBmYWxzZSxcbiAgICAgIF9tZW51UGFnZTogZmFsc2UsXG4gICAgICBfbWFpblBhZ2U6IGZhbHNlLFxuICAgICAgX3dpZHRoOiBmYWxzZSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAnOTAlJztcbiAgICAgICAgdGhpcy5faXNSaWdodCA9ICEhb3B0aW9ucy5pc1JpZ2h0O1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UgPSBtYWluUGFnZTtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UgPSBtZW51UGFnZTtcblxuICAgICAgICBtZW51UGFnZS5jc3MoJ2JveC1zaGFkb3cnLCAnMHB4IDAgMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpJyk7XG4gICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgIHpJbmRleDogMlxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBGaXggZm9yIHRyYW5zcGFyZW50IG1lbnUgcGFnZSBvbiBpT1M4LlxuICAgICAgICBtZW51UGFnZS5jc3MoJy13ZWJraXQtdHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpJyk7XG5cbiAgICAgICAgbWFpblBhZ2UuY3NzKHt6SW5kZXg6IDF9KTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmNzcyh7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgICAgIGJvdHRvbTogJzBweCcsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgIHpJbmRleDogMFxuICAgICAgICB9KTtcblxuICAgICAgICBlbGVtZW50LnByZXBlbmQodGhpcy5fYmxhY2tNYXNrKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoXG4gICAgICAgKi9cbiAgICAgIG9uUmVzaXplZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ3dpZHRoJywgb3B0aW9ucy53aWR0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICctJyArIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICctJyArIG9wdGlvbnMud2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzT3BlbmVkKSB7XG4gICAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICAgIHZhciBtZW51U3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUobWF4KTtcbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pLnF1ZXVlKG1lbnVTdHlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ibGFja01hc2spIHtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21haW5QYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX21haW5QYWdlID0gdGhpcy5fbWVudVBhZ2UgPSBudWxsO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBtZW51U3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUobWF4KTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWFpblBhZ2VTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKG1lbnVTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBjbG9zZU1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKHtkaXNwbGF5OiAnYmxvY2snfSk7XG5cbiAgICAgICAgdmFyIG1lbnVQYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUoMCk7XG4gICAgICAgIHZhciBtYWluUGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNYWluUGFnZVN0eWxlKDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtYWluUGFnZVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtZW51UGFnZVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGlzdGFuY2VcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heERpc3RhbmNlXG4gICAgICAgKi9cbiAgICAgIHRyYW5zbGF0ZU1lbnU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcyh7ZGlzcGxheTogJ2Jsb2NrJ30pO1xuXG4gICAgICAgIHZhciBtZW51UGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNZW51UGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUoTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuICAgICAgICBkZWxldGUgbWFpblBhZ2VTdHlsZS5vcGFjaXR5O1xuXG4gICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAucXVldWUobWVudVBhZ2VTdHlsZSlcbiAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhtYWluUGFnZVN0eWxlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLnF1ZXVlKG1haW5QYWdlU3R5bGUpXG4gICAgICAgICAgICAucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVNZW51UGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMuX2lzUmlnaHQgPyAtZGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgJ2JveC1zaGFkb3cnOiBkaXN0YW5jZSA9PT0gMCA/ICdub25lJyA6ICcwcHggMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiknXG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVNYWluUGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBvcGFjaXR5ID0gMSAtICgwLjEgKiBkaXN0YW5jZSAvIG1heCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yO1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXBhZ2VcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBwYWdlLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5rjg7zjgrjjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1pbmZpbml0ZS1zY3JvbGxcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUGF0aCBvZiB0aGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb24gaW5maW5pdGUgc2Nyb2xsaW5nLiBUaGUgcGF0aCBpcyByZWxhdGl2ZSB0byAkc2NvcGUuIFRoZSBmdW5jdGlvbiByZWNlaXZlcyBhIGRvbmUgY2FsbGJhY2sgdGhhdCBtdXN0IGJlIGNhbGxlZCB3aGVuIGl0J3MgZmluaXNoZWQuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9uLWRldmljZS1iYWNrLWJ1dHRvblxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgYmFjayBidXR0b24gaXMgcHJlc3NlZC5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44GM5oq844GV44KM44Gf5pmC44Gu5oyZ5YuV44KS6Kit5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctZGV2aWNlLWJhY2stYnV0dG9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdpdGggYW4gQW5ndWxhckpTIGV4cHJlc3Npb24gd2hlbiB0aGUgYmFjayBidXR0b24gaXMgcHJlc3NlZC5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44GM5oq844GV44KM44Gf5pmC44Gu5oyZ5YuV44KS6Kit5a6a44Gn44GN44G+44GZ44CCQW5ndWxhckpT44GuZXhwcmVzc2lvbuOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNQYWdlJywgZnVuY3Rpb24oJG9uc2VuLCBQYWdlVmlldykge1xuXG4gICAgZnVuY3Rpb24gZmlyZVBhZ2VJbml0RXZlbnQoZWxlbWVudCkge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIGRpcnR5IGZpeFxuICAgICAgdmFyIGkgPSAwLCBmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpKysgPCAxNSkgIHtcbiAgICAgICAgICBpZiAoaXNBdHRhY2hlZChlbGVtZW50KSkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50LCAnaW5pdCcpO1xuICAgICAgICAgICAgZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQoZWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpID4gMTApIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZmlyZSBcInBhZ2Vpbml0XCIgZXZlbnQuIEF0dGFjaCBcIm9ucy1wYWdlXCIgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGYoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZlbnQuaW5pdEV2ZW50KCdwYWdlaW5pdCcsIHRydWUsIHRydWUpO1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0F0dGFjaGVkKGVsZW1lbnQpIHtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlID8gaXNBdHRhY2hlZChlbGVtZW50LnBhcmVudE5vZGUpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gbmV3IFBhZ2VWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwYWdlKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocGFnZSwgJ2luaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcGFnZScsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHBhZ2UsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcGFnZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHBhZ2UpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50WzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcG9wb3ZlclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcG9wb3Zlci5bL2VuXVxuICogIFtqYV3jgZPjga7jg53jg4Pjg5fjgqrjg7zjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUG9wb3ZlcicsIGZ1bmN0aW9uKCRvbnNlbiwgUG9wb3ZlclZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwb3BvdmVyKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocG9wb3ZlciwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocG9wb3ZlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCBwb3BvdmVyKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwb3BvdmVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocG9wb3Zlcik7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnUG9wb3ZlckFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5Qb3BvdmVyQW5pbWF0b3IpXG4gIC52YWx1ZSgnRmFkZVBvcG92ZXJBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRmFkZVBvcG92ZXJBbmltYXRvcik7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wdWxsLWhvb2tcbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XG4gKiAgICAgJHNjb3BlLml0ZW1zID0gWzMsIDIgLDFdO1xuICpcbiAqICAgICAkc2NvcGUubG9hZCA9IGZ1bmN0aW9uKCRkb25lKSB7XG4gKiAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAqICAgICAgICAgJHNjb3BlLml0ZW1zLnVuc2hpZnQoJHNjb3BlLml0ZW1zLmxlbmd0aCArIDEpO1xuICogICAgICAgICAkZG9uZSgpO1xuICogICAgICAgfSwgMTAwMCk7XG4gKiAgICAgfTtcbiAqICAgfSk7XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8b25zLXBhZ2UgbmctY29udHJvbGxlcj1cIk15Q29udHJvbGxlclwiPlxuICogICA8b25zLXB1bGwtaG9vayB2YXI9XCJsb2FkZXJcIiBuZy1hY3Rpb249XCJsb2FkKCRkb25lKVwiPlxuICogICAgIDxzcGFuIG5nLXN3aXRjaD1cImxvYWRlci5zdGF0ZVwiPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJpbml0aWFsXCI+UHVsbCBkb3duIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInByZWFjdGlvblwiPlJlbGVhc2UgdG8gcmVmcmVzaDwvc3Bhbj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiYWN0aW9uXCI+TG9hZGluZyBkYXRhLiBQbGVhc2Ugd2FpdC4uLjwvc3Bhbj5cbiAqICAgICA8L3NwYW4+XG4gKiAgIDwvb25zLXB1bGwtaG9vaz5cbiAqICAgPG9ucy1saXN0PlxuICogICAgIDxvbnMtbGlzdC1pdGVtIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICAgIEl0ZW0gI3t7IGl0ZW0gfX1cbiAqICAgICA8L29ucy1saXN0LWl0ZW0+XG4gKiAgIDwvb25zLWxpc3Q+XG4gKiA8L29ucy1wYWdlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFd44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctYWN0aW9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Vc2UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgcGFnZSBpcyBwdWxsZWQgZG93bi4gQSA8Y29kZT4kZG9uZTwvY29kZT4gZnVuY3Rpb24gaXMgYXZhaWxhYmxlIHRvIHRlbGwgdGhlIGNvbXBvbmVudCB0aGF0IHRoZSBhY3Rpb24gaXMgY29tcGxldGVkLlsvZW5dXG4gKiAgIFtqYV1wdWxsIGRvd27jgZfjgZ/jgajjgY3jga7mjK/jgovoiJ7jgYTjgpLmjIflrprjgZfjgb7jgZnjgILjgqLjgq/jgrfjg6fjg7PjgYzlrozkuobjgZfjgZ/mmYLjgavjga88Y29kZT4kZG9uZTwvY29kZT7plqLmlbDjgpLlkbzjgbPlh7rjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtY2hhbmdlc3RhdGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImNoYW5nZXN0YXRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJjaGFuZ2VzdGF0ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogUHVsbCBob29rIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUHVsbEhvb2snLCBmdW5jdGlvbigkb25zZW4sIFB1bGxIb29rVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHB1bGxIb29rID0gbmV3IFB1bGxIb29rVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgcHVsbEhvb2spO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwdWxsSG9vaywgJ2NoYW5nZXN0YXRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXB1bGwtaG9vaycsIHB1bGxIb29rKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwdWxsSG9vay5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnUHVzaFNsaWRpbmdNZW51QW5pbWF0b3InLCBmdW5jdGlvbihTbGlkaW5nTWVudUFuaW1hdG9yKSB7XG5cbiAgICB2YXIgUHVzaFNsaWRpbmdNZW51QW5pbWF0b3IgPSBTbGlkaW5nTWVudUFuaW1hdG9yLmV4dGVuZCh7XG5cbiAgICAgIF9pc1JpZ2h0OiBmYWxzZSxcbiAgICAgIF9lbGVtZW50OiB1bmRlZmluZWQsXG4gICAgICBfbWVudVBhZ2U6IHVuZGVmaW5lZCxcbiAgICAgIF9tYWluUGFnZTogdW5kZWZpbmVkLFxuICAgICAgX3dpZHRoOiB1bmRlZmluZWQsXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGggXCJ3aWR0aFwiIHN0eWxlIHZhbHVlXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBzZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgbWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9tYWluUGFnZSA9IG1haW5QYWdlO1xuICAgICAgICB0aGlzLl9tZW51UGFnZSA9IG1lbnVQYWdlO1xuXG4gICAgICAgIHRoaXMuX2lzUmlnaHQgPSAhIW9wdGlvbnMuaXNSaWdodDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoIHx8ICc5MCUnO1xuXG4gICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnLScgKyBvcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnLScgKyBvcHRpb25zLndpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIG9uUmVzaXplZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ3dpZHRoJywgb3B0aW9ucy53aWR0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICctJyArIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICctJyArIG9wdGlvbnMud2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzT3BlbmVkKSB7XG4gICAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICAgIHZhciBtYWluUGFnZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKG1heCk7XG4gICAgICAgICAgdmFyIG1lbnVQYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiBtYWluUGFnZVRyYW5zZm9ybX0pLnBsYXkoKTtcbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pLnF1ZXVlKG1lbnVQYWdlU3R5bGUpLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9tYWluUGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9tYWluUGFnZSA9IHRoaXMuX21lbnVQYWdlID0gbnVsbDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBvcGVuTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShtYXgpO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBjbG9zZU1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybSgwKTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUoMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGlzdGFuY2VcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heERpc3RhbmNlXG4gICAgICAgKi9cbiAgICAgIHRyYW5zbGF0ZU1lbnU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcblxuICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKHt0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtfSlcbiAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUpXG4gICAgICAgICAgLnBsYXkoKTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLl9pc1JpZ2h0ID8gLWRpc3RhbmNlIDogZGlzdGFuY2U7XG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiBhYm92ZVRyYW5zZm9ybTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIGJlaGluZFggPSB0aGlzLl9pc1JpZ2h0ID8gLWRpc3RhbmNlIDogZGlzdGFuY2U7XG4gICAgICAgIHZhciBiZWhpbmRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGJlaGluZFggKyAncHgsIDAsIDApJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogYmVoaW5kVHJhbnNmb3JtXG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQdXNoU2xpZGluZ01lbnVBbmltYXRvcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFB1c2hTbGlkaW5nTWVudUFuaW1hdG9yO1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1JldmVhbFNsaWRpbmdNZW51QW5pbWF0b3InLCBmdW5jdGlvbihTbGlkaW5nTWVudUFuaW1hdG9yKSB7XG5cbiAgICB2YXIgUmV2ZWFsU2xpZGluZ01lbnVBbmltYXRvciA9IFNsaWRpbmdNZW51QW5pbWF0b3IuZXh0ZW5kKHtcblxuICAgICAgX2JsYWNrTWFzazogdW5kZWZpbmVkLFxuXG4gICAgICBfaXNSaWdodDogZmFsc2UsXG5cbiAgICAgIF9tZW51UGFnZTogdW5kZWZpbmVkLFxuICAgICAgX2VsZW1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgIF9tYWluUGFnZTogdW5kZWZpbmVkLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoIFwid2lkdGhcIiBzdHlsZSB2YWx1ZVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UgPSBtZW51UGFnZTtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UgPSBtYWluUGFnZTtcbiAgICAgICAgdGhpcy5faXNSaWdodCA9ICEhb3B0aW9ucy5pc1JpZ2h0O1xuICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgJzkwJSc7XG5cbiAgICAgICAgbWFpblBhZ2UuY3NzKHtcbiAgICAgICAgICBib3hTaGFkb3c6ICcwcHggMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiknXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgb3BhY2l0eTogMC45LFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJzBweCcsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICcwcHgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ibGFja01hc2sgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuY3NzKHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICByaWdodDogJzBweCcsXG4gICAgICAgICAgYm90dG9tOiAnMHB4JyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5wcmVwZW5kKHRoaXMuX2JsYWNrTWFzayk7XG5cbiAgICAgICAgLy8gRGlydHkgZml4IGZvciBicm9rZW4gcmVuZGVyaW5nIGJ1ZyBvbiBhbmRyb2lkIDQueC5cbiAgICAgICAgYW5pbWl0KG1haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknfSkucGxheSgpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzT3BlbmVkXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ3dpZHRoJywgdGhpcy5fd2lkdGgpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzT3BlbmVkKSB7XG4gICAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuXG4gICAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybX0pLnBsYXkoKTtcbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pLnF1ZXVlKGJlaGluZFN0eWxlKS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYmxhY2tNYXNrKSB7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrLnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMuX2JsYWNrTWFzayA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbWFpblBhZ2UpIHtcbiAgICAgICAgICB0aGlzLl9tYWluUGFnZS5hdHRyKCdzdHlsZScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tZW51UGFnZSkge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmF0dHIoJ3N0eWxlJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbWFpblBhZ2UgPSB0aGlzLl9tZW51UGFnZSA9IHRoaXMuX2VsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgb3Blbk1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShtYXgpO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBjbG9zZU1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0oMCk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgZGVsZXRlIGJlaGluZFN0eWxlLm9wYWNpdHk7XG5cbiAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZSh7dHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybX0pXG4gICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlKVxuICAgICAgICAgIC5wbGF5KCk7XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm06IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsIDAsIDApJztcblxuICAgICAgICByZXR1cm4gYWJvdmVUcmFuc2Zvcm07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGU6IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICB2YXIgYmVoaW5kRGlzdGFuY2UgPSAoZGlzdGFuY2UgLSBtYXgpIC8gbWF4ICogMTA7XG4gICAgICAgIGJlaGluZERpc3RhbmNlID0gaXNOYU4oYmVoaW5kRGlzdGFuY2UpID8gMCA6IE1hdGgubWF4KE1hdGgubWluKGJlaGluZERpc3RhbmNlLCAwKSwgLTEwKTtcblxuICAgICAgICB2YXIgYmVoaW5kWCA9IHRoaXMuX2lzUmlnaHQgPyAtYmVoaW5kRGlzdGFuY2UgOiBiZWhpbmREaXN0YW5jZTtcbiAgICAgICAgdmFyIGJlaGluZFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgYmVoaW5kWCArICclLCAwLCAwKSc7XG4gICAgICAgIHZhciBvcGFjaXR5ID0gMSArIGJlaGluZERpc3RhbmNlIC8gMTAwO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBiZWhpbmRUcmFuc2Zvcm0sXG4gICAgICAgICAgb3BhY2l0eTogb3BhY2l0eVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmV2ZWFsU2xpZGluZ01lbnVBbmltYXRvcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3I7XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2xpZGluZy1tZW51XG4gKiBAY2F0ZWdvcnkgc2xpZGluZy1tZW51XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUNvbXBvbmVudCBmb3Igc2xpZGluZyBVSSB3aGVyZSBvbmUgcGFnZSBpcyBvdmVybGF5ZWQgb3ZlciBhbm90aGVyIHBhZ2UuIFRoZSBhYm92ZSBwYWdlIGNhbiBiZSBzbGlkZWQgYXNpZGUgdG8gcmV2ZWFsIHRoZSBwYWdlIGJlaGluZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844KS6KGo54++44GZ44KL44Gf44KB44Gu44Kz44Oz44Od44O844ON44Oz44OI44Gn44CB54mH5pa544Gu44Oa44O844K444GM5Yil44Gu44Oa44O844K444Gu5LiK44Gr44Kq44O844OQ44O844Os44Kk44Gn6KGo56S644GV44KM44G+44GZ44CCYWJvdmUtcGFnZeOBp+aMh+WumuOBleOCjOOBn+ODmuODvOOCuOOBr+OAgeaoquOBi+OCieOCueODqeOCpOODieOBl+OBpuihqOekuuOBl+OBvuOBmeOAglsvamFdXG4gKiBAY29kZXBlbiBJRHZGSlxuICogQHNlZWFsc28gb25zLXBhZ2VcbiAqICAgW2VuXW9ucy1wYWdlIGNvbXBvbmVudFsvZW5dXG4gKiAgIFtqYV1vbnMtcGFnZeOCs+ODs+ODneODvOODjeODs+ODiFsvamFdXG4gKiBAZ3VpZGUgVXNpbmdTbGlkaW5nTWVudVxuICogICBbZW5dVXNpbmcgc2xpZGluZyBtZW51Wy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOCkuS9v+OBhlsvamFdXG4gKiBAZ3VpZGUgRXZlbnRIYW5kbGluZ1xuICogICBbZW5dVXNpbmcgZXZlbnRzWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBruWIqeeUqFsvamFdXG4gKiBAZ3VpZGUgQ2FsbGluZ0NvbXBvbmVudEFQSXNmcm9tSmF2YVNjcmlwdFxuICogICBbZW5dVXNpbmcgbmF2aWdhdG9yIGZyb20gSmF2YVNjcmlwdFsvZW5dXG4gKiAgIFtqYV1KYXZhU2NyaXB044GL44KJ44Kz44Oz44Od44O844ON44Oz44OI44KS5ZG844Gz5Ye644GZWy9qYV1cbiAqIEBndWlkZSBEZWZpbmluZ011bHRpcGxlUGFnZXNpblNpbmdsZUhUTUxcbiAqICAgW2VuXURlZmluaW5nIG11bHRpcGxlIHBhZ2VzIGluIHNpbmdsZSBodG1sWy9lbl1cbiAqICAgW2phXeikh+aVsOOBruODmuODvOOCuOOCkjHjgaTjga5IVE1M44Gr6KiY6L+w44GZ44KLWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLXNsaWRpbmctbWVudSB2YXI9XCJhcHAubWVudVwiIG1haW4tcGFnZT1cInBhZ2UuaHRtbFwiIG1lbnUtcGFnZT1cIm1lbnUuaHRtbFwiIG1heC1zbGlkZS1kaXN0YW5jZT1cIjIwMHB4XCIgdHlwZT1cInJldmVhbFwiIHNpZGU9XCJsZWZ0XCI+XG4gKiA8L29ucy1zbGlkaW5nLW1lbnU+XG4gKlxuICogPG9ucy10ZW1wbGF0ZSBpZD1cInBhZ2UuaHRtbFwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICA8b25zLWJ1dHRvbiBuZy1jbGljaz1cImFwcC5tZW51LnRvZ2dsZU1lbnUoKVwiPlRvZ2dsZTwvb25zLWJ1dHRvbj5cbiAqICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJtZW51Lmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDwhLS0gbWVudSBwYWdlJ3MgY29udGVudHMgLS0+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy10ZW1wbGF0ZT5cbiAqXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcHJlb3BlblxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGJlZm9yZSB0aGUgc2xpZGluZyBtZW51IGlzIG9wZW5lZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaL44GP5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0b3BlblxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSBzbGlkaW5nIG1lbnUgaXMgb3BlbmVkLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgYzplovjgY3ntYLjgo/jgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc2xpZGluZ01lbnVcbiAqICAgW2VuXVNsaWRpbmcgbWVudSB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU2xpZGluZ01lbnXjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZWNsb3NlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYmVmb3JlIHRoZSBzbGlkaW5nIG1lbnUgaXMgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgYzplonjgZjjgovliY3jgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc2xpZGluZ01lbnVcbiAqICAgW2VuXVNsaWRpbmcgbWVudSB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU2xpZGluZ01lbnXjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3RjbG9zZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSBzbGlkaW5nIG1lbnUgaXMgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgYzplonjgZjntYLjgo/jgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc2xpZGluZ01lbnVcbiAqICAgW2VuXVNsaWRpbmcgbWVudSB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU2xpZGluZ01lbnXjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc2xpZGluZyBtZW51LlsvZW5dXG4gKiAgW2phXeOBk+OBruOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1lbnUtcGFnZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBtZW51IHBhZ2UuWy9lbl1cbiAqICAgW2phXeW3puOBq+S9jee9ruOBmeOCi+ODoeODi+ODpeODvOODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1haW4tcGFnZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBtYWluIHBhZ2UuWy9lbl1cbiAqICAgW2phXeWPs+OBq+S9jee9ruOBmeOCi+ODoeOCpOODs+ODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHN3aXBlYWJsZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dV2hldGhlciB0byBlbmFibGUgc3dpcGUgaW50ZXJhY3Rpb24uWy9lbl1cbiAqICAgW2phXeOCueODr+OCpOODl+aTjeS9nOOCkuacieWKueOBq+OBmeOCi+WgtOWQiOOBq+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHN3aXBlLXRhcmdldC13aWR0aFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgd2lkdGggb2Ygc3dpcGVhYmxlIGFyZWEgY2FsY3VsYXRlZCBmcm9tIHRoZSBsZWZ0IChpbiBwaXhlbHMpLiBVc2UgdGhpcyB0byBlbmFibGUgc3dpcGUgb25seSB3aGVuIHRoZSBmaW5nZXIgdG91Y2ggb24gdGhlIHNjcmVlbiBlZGdlLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fjga7liKTlrprpoJjln5/jgpLjg5Tjgq/jgrvjg6vljZjkvY3jgafmjIflrprjgZfjgb7jgZnjgILnlLvpnaLjga7nq6/jgYvjgonmjIflrprjgZfjgZ/ot53pm6LjgavpgZTjgZnjgovjgajjg5rjg7zjgrjjgYzooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtYXgtc2xpZGUtZGlzdGFuY2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dSG93IGZhciB0aGUgbWVudSBwYWdlIHdpbGwgc2xpZGUgb3Blbi4gQ2FuIHNwZWNpZnkgYm90aCBpbiBweCBhbmQgJS4gZWcuIDkwJSwgMjAwcHhbL2VuXVxuICogICBbamFdbWVudS1wYWdl44Gn5oyH5a6a44GV44KM44Gf44Oa44O844K444Gu6KGo56S65bmF44KS5oyH5a6a44GX44G+44GZ44CC44OU44Kv44K744Or44KC44GX44GP44GvJeOBruS4oeaWueOBp+aMh+WumuOBp+OBjeOBvuOBme+8iOS+izogOTAlLCAyMDBweO+8iVsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHNpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU3BlY2lmeSB3aGljaCBzaWRlIG9mIHRoZSBzY3JlZW4gdGhlIG1lbnUgcGFnZSBpcyBsb2NhdGVkIG9uLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwibGVmdFwiIGFuZCBcInJpZ2h0XCIuWy9lbl1cbiAqICAgW2phXW1lbnUtcGFnZeOBp+aMh+WumuOBleOCjOOBn+ODmuODvOOCuOOBjOeUu+mdouOBruOBqeOBoeOCieWBtOOBi+OCieihqOekuuOBleOCjOOCi+OBi+OCkuaMh+WumuOBl+OBvuOBmeOAgmxlZnTjgoLjgZfjgY/jga9yaWdodOOBruOBhOOBmuOCjOOBi+OCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHR5cGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGluZyBtZW51IGFuaW1hdG9yLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIHJldmVhbCAoZGVmYXVsdCksIHB1c2ggYW5kIG92ZXJsYXkuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOBruOCouODi+ODoeODvOOCt+ODp+ODs+OBp+OBmeOAglwicmV2ZWFsXCLvvIjjg4fjg5Xjgqnjg6vjg4jvvInjgIFcInB1c2hcIuOAgVwib3ZlcmxheVwi44Gu44GE44Ga44KM44GL44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZW9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZW9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdG9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0b3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldE1haW5QYWdlXG4gKiBAc2lnbmF0dXJlIHNldE1haW5QYWdlKHBhZ2VVcmwsIFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlVXJsXG4gKiAgIFtlbl1QYWdlIFVSTC4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGRvY3VtZW50IG9yIGFuIDxjb2RlPiZsdDtvbnMtdGVtcGxhdGUmZ3Q7PC9jb2RlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsb3NlTWVudV1cbiAqICAgW2VuXUlmIHRydWUgdGhlIG1lbnUgd2lsbCBiZSBjbG9zZWQuWy9lbl1cbiAqICAgW2phXXRydWXjgpLmjIflrprjgZnjgovjgajjgIHplovjgYTjgabjgYTjgovjg6Hjg4vjg6Xjg7zjgpLplonjgZjjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1GdW5jdGlvbiB0aGF0IGlzIGV4ZWN1dGVkIGFmdGVyIHRoZSBwYWdlIGhhcyBiZWVuIHNldC5bL2VuXVxuICogICBbamFd44Oa44O844K444GM6Kqt44G/6L6844G+44KM44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgbWFpbiBjb250ZW50cyBwYW5lLlsvZW5dXG4gKiAgIFtqYV3kuK3lpK7pg6jliIbjgavooajnpLrjgZXjgozjgovjg5rjg7zjgrjjgpJwYWdlVXJs44Gr5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0TWVudVBhZ2VcbiAqIEBzaWduYXR1cmUgc2V0TWVudVBhZ2UocGFnZVVybCwgW29wdGlvbnNdKVxuICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VVcmxcbiAqICAgW2VuXVBhZ2UgVVJMLiBDYW4gYmUgZWl0aGVyIGFuIEhUTUwgZG9jdW1lbnQgb3IgYW4gPGNvZGU+Jmx0O29ucy10ZW1wbGF0ZSZndDs8L2NvZGU+LlsvZW5dXG4gKiAgIFtqYV1wYWdl44GuVVJM44GL44CBb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xvc2VNZW51XVxuICogICBbZW5dSWYgdHJ1ZSB0aGUgbWVudSB3aWxsIGJlIGNsb3NlZCBhZnRlciB0aGUgbWVudSBwYWdlIGhhcyBiZWVuIHNldC5bL2VuXVxuICogICBbamFddHJ1ZeOCkuaMh+WumuOBmeOCi+OBqOOAgemWi+OBhOOBpuOBhOOCi+ODoeODi+ODpeODvOOCkumWieOBmOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXVRoaXMgZnVuY3Rpb24gd2lsbCBiZSBleGVjdXRlZCBhZnRlciB0aGUgbWVudSBwYWdlIGhhcyBiZWVuIHNldC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444GM6Kqt44G/6L6844G+44KM44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgc2lkZSBtZW51IHBhbmUuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOmDqOWIhuOBq+ihqOekuuOBleOCjOOCi+ODmuODvOOCuOOCknBhZ2VVcmzjgavmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvcGVuTWVudVxuICogQHNpZ25hdHVyZSBvcGVuTWVudShbb3B0aW9uc10pXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSBtZW51IGhhcyBiZWVuIG9wZW5lZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaL44GE44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGUgdGhlIGFib3ZlIGxheWVyIHRvIHJldmVhbCB0aGUgbGF5ZXIgYmVoaW5kLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgpLooajnpLrjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBjbG9zZU1lbnVcbiAqIEBzaWduYXR1cmUgY2xvc2VNZW51KFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXVRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIG1lbnUgaGFzIGJlZW4gY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjgYzplonjgZjjgonjgozjgZ/lvozjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TbGlkZSB0aGUgYWJvdmUgbGF5ZXIgdG8gaGlkZSB0aGUgbGF5ZXIgYmVoaW5kLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgpLpnZ7ooajnpLrjgavjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCB0b2dnbGVNZW51XG4gKiBAc2lnbmF0dXJlIHRvZ2dsZU1lbnUoW29wdGlvbnNdKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgbWVudSBoYXMgYmVlbiBvcGVuZWQgb3IgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjgYzplovjgY3ntYLjgo/jgaPjgZ/lvozjgYvjgIHplonjgZjntYLjgo/jgaPjgZ/lvozjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TbGlkZSB0aGUgYWJvdmUgbGF5ZXIgdG8gcmV2ZWFsIHRoZSBsYXllciBiZWhpbmQgaWYgaXQgaXMgY3VycmVudGx5IGhpZGRlbiwgb3RoZXJ3aXNlLCBoaWRlIHRoZSBsYXllciBiZWhpbmQuWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueKtuazgeOBq+WQiOOCj+OBm+OBpuOAgeODoeODi+ODpeODvOODmuODvOOCuOOCkuihqOekuuOCguOBl+OBj+OBr+mdnuihqOekuuOBq+OBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIGlzTWVudU9wZW5lZFxuICogQHNpZ25hdHVyZSBpc01lbnVPcGVuZWQoKVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqICAgW2VuXXRydWUgaWYgdGhlIG1lbnUgaXMgY3VycmVudGx5IG9wZW4uWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOOBjOmWi+OBhOOBpuOBhOOCjOOBsHRydWXjgajjgarjgorjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1SZXR1cm5zIHRydWUgaWYgdGhlIG1lbnUgcGFnZSBpcyBvcGVuLCBvdGhlcndpc2UgZmFsc2UuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOODmuODvOOCuOOBjOmWi+OBhOOBpuOBhOOCi+WgtOWQiOOBr3RydWXjgIHjgZ3jgYbjgafjgarjgYTloLTlkIjjga9mYWxzZeOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIGdldERldmljZUJhY2tCdXR0b25IYW5kbGVyXG4gKiBAc2lnbmF0dXJlIGdldERldmljZUJhY2tCdXR0b25IYW5kbGVyKClcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqICAgW2VuXURldmljZSBiYWNrIGJ1dHRvbiBoYW5kbGVyLlsvZW5dXG4gKiAgIFtqYV3jg4fjg5DjgqTjgrnjga7jg5Djg4Pjgq/jg5zjgr/jg7Pjg4/jg7Pjg4njg6njgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1SZXRyaWV2ZSB0aGUgYmFjay1idXR0b24gaGFuZGxlci5bL2VuXVxuICogICBbamFdb25zLXNsaWRpbmctbWVudeOBq+e0kOS7mOOBhOOBpuOBhOOCi+ODkOODg+OCr+ODnOOCv+ODs+ODj+ODs+ODieODqeOCkuWPluW+l+OBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldFN3aXBlYWJsZVxuICogQHNpZ25hdHVyZSBzZXRTd2lwZWFibGUoc3dpcGVhYmxlKVxuICogQHBhcmFtIHtCb29sZWFufSBzd2lwZWFibGVcbiAqICAgW2VuXUlmIHRydWUgdGhlIG1lbnUgd2lsbCBiZSBzd2lwZWFibGUuWy9lbl1cbiAqICAgW2phXeOCueODr+OCpOODl+OBp+mWi+mWieOBp+OBjeOCi+OCiOOBhuOBq+OBmeOCi+WgtOWQiOOBq+OBr3RydWXjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TcGVjaWZ5IGlmIHRoZSBtZW51IHNob3VsZCBiZSBzd2lwZWFibGUgb3Igbm90LlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fjgafplovplonjgZnjgovjgYvjganjgYbjgYvjgpLoqK3lrprjgZnjgovjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU2xpZGluZ01lbnUnLCBmdW5jdGlvbigkY29tcGlsZSwgU2xpZGluZ01lbnVWaWV3LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgbWFpbiA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1haW4nKSxcbiAgICAgICAgICAgIG1lbnUgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG5cbiAgICAgICAgaWYgKG1haW4pIHtcbiAgICAgICAgICB2YXIgbWFpbkh0bWwgPSBhbmd1bGFyLmVsZW1lbnQobWFpbikucmVtb3ZlKCkuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZW51KSB7XG4gICAgICAgICAgdmFyIG1lbnVIdG1sID0gYW5ndWxhci5lbGVtZW50KG1lbnUpLnJlbW92ZSgpLmh0bWwoKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQoYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdvbnNlbi1zbGlkaW5nLW1lbnVfX21lbnUgb25zLXNsaWRpbmctbWVudS1pbm5lcicpKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNsaWRpbmctbWVudV9fbWFpbiBvbnMtc2xpZGluZy1tZW51LWlubmVyJykpO1xuXG4gICAgICAgICAgdmFyIHNsaWRpbmdNZW51ID0gbmV3IFNsaWRpbmdNZW51VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzbGlkaW5nTWVudSwgJ3ByZW9wZW4gcHJlY2xvc2UgcG9zdG9wZW4gcG9zdGNsb3NlIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgIGlmIChtYWluSHRtbCAmJiAhYXR0cnMubWFpblBhZ2UpIHtcbiAgICAgICAgICAgIHNsaWRpbmdNZW51Ll9hcHBlbmRNYWluUGFnZShudWxsLCBtYWluSHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG1lbnVIdG1sICYmICFhdHRycy5tZW51UGFnZSkge1xuICAgICAgICAgICAgc2xpZGluZ01lbnUuX2FwcGVuZE1lbnVQYWdlKG1lbnVIdG1sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc2xpZGluZ01lbnUpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNsaWRpbmctbWVudScsIHNsaWRpbmdNZW51KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2xpZGluZ01lbnUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNsaWRpbmctbWVudScsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnU2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBkZWxheTogMCxcbiAgICAgIGR1cmF0aW9uOiAwLjQsXG4gICAgICB0aW1pbmc6ICdjdWJpYy1iZXppZXIoLjEsIC43LCAuMSwgMSknLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy50aW1pbmdcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmR1cmF0aW9uXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kZWxheVxuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHRoaXMudGltaW5nID0gb3B0aW9ucy50aW1pbmcgfHwgdGhpcy50aW1pbmc7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmR1cmF0aW9uIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdGhpcy5kZWxheSA9IG9wdGlvbnMuZGVsYXkgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZGVsYXkgOiB0aGlzLmRlbGF5O1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNPcGVuZWRcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoXG4gICAgICAgKi9cbiAgICAgIG9uUmVzaXplZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICBvcGVuTWVudTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqL1xuICAgICAgY2xvc2VDbG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICovXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHJldHVybiB7U2xpZGluZ01lbnVBbmltYXRvcn1cbiAgICAgICAqL1xuICAgICAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignT3ZlcnJpZGUgY29weSBtZXRob2QuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwZWVkLWRpYWxcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhlIHNwZWVkIGRpYWwuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODlOODvOODieODgOOCpOOCouODq+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuOBl+OBpuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtY2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU3BlZWREaWFsJywgZnVuY3Rpb24oJG9uc2VuLCBTcGVlZERpYWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgc3BlZWREaWFsID0gbmV3IFNwZWVkRGlhbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwZWVkLWRpYWwnLCBzcGVlZERpYWwpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGVlZERpYWwsICdvcGVuIGNsb3NlJyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwZWVkRGlhbCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGVlZERpYWwuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwZWVkLWRpYWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0LXZpZXdcbiAqIEBjYXRlZ29yeSBzcGxpdC12aWV3XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dRGl2aWRlcyB0aGUgc2NyZWVuIGludG8gYSBsZWZ0IGFuZCByaWdodCBzZWN0aW9uLlsvZW5dXG4gKiAgW2phXeeUu+mdouOCkuW3puWPs+OBq+WIhuWJsuOBmeOCi+OCs+ODs+ODneODvOODjeODs+ODiOOBp+OBmeOAglsvamFdXG4gKiBAY29kZXBlbiBuS3FmdiB7d2lkZX1cbiAqIEBndWlkZSBVc2luZ29uc3NwbGl0dmlld2NvbXBvbmVudFxuICogICBbZW5dVXNpbmcgb25zLXNwbGl0LXZpZXcuWy9lbl1cbiAqICAgW2phXW9ucy1zcGxpdC12aWV344Kz44Oz44Od44O844ON44Oz44OI44KS5L2/44GGWy9qYV1cbiAqIEBndWlkZSBDYWxsaW5nQ29tcG9uZW50QVBJc2Zyb21KYXZhU2NyaXB0XG4gKiAgIFtlbl1Vc2luZyBuYXZpZ2F0b3IgZnJvbSBKYXZhU2NyaXB0Wy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlkbzjgbPlh7rjgZlbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtc3BsaXQtdmlld1xuICogICBzZWNvbmRhcnktcGFnZT1cInNlY29uZGFyeS5odG1sXCJcbiAqICAgbWFpbi1wYWdlPVwibWFpbi5odG1sXCJcbiAqICAgbWFpbi1wYWdlLXdpZHRoPVwiNzAlXCJcbiAqICAgY29sbGFwc2U9XCJwb3J0cmFpdFwiPlxuICogPC9vbnMtc3BsaXQtdmlldz5cbiAqL1xuXG4vKipcbiAqIEBldmVudCB1cGRhdGVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQgd2hlbiB0aGUgc3BsaXQgdmlldyBpcyB1cGRhdGVkLlsvZW5dXG4gKiAgIFtqYV1zcGxpdCB2aWV344Gu54q25oWL44GM5pu05paw44GV44KM44Gf6Zqb44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNwbGl0Vmlld1xuICogICBbZW5dU3BsaXQgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NwbGl0Vmlld+OCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGV2ZW50LnNob3VsZENvbGxhcHNlXG4gKiAgIFtlbl1UcnVlIGlmIHRoZSB2aWV3IHNob3VsZCBjb2xsYXBzZS5bL2VuXVxuICogICBbamFdY29sbGFwc2XnirbmhYvjga7loLTlkIjjgat0cnVl44Gr44Gq44KK44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5jdXJyZW50TW9kZVxuICogICBbZW5dQ3VycmVudCBtb2RlLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7jg6Ljg7zjg4nlkI3jgpLov5TjgZfjgb7jgZnjgIJcImNvbGxhcHNlXCLjgYtcInNwbGl0XCLjgYvjga7jgYTjgZrjgozjgYvjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXZlbnQuc3BsaXRcbiAqICAgW2VuXUNhbGwgdG8gZm9yY2Ugc3BsaXQuWy9lbl1cbiAqICAgW2phXeOBk+OBrumWouaVsOOCkuWRvOOBs+WHuuOBmeOBqOW8t+WItueahOOBq3NwbGl044Oi44O844OJ44Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV2ZW50LmNvbGxhcHNlXG4gKiAgIFtlbl1DYWxsIHRvIGZvcmNlIGNvbGxhcHNlLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7plqLmlbDjgpLlkbzjgbPlh7rjgZnjgajlvLfliLbnmoTjgatjb2xsYXBzZeODouODvOODieOBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge051bWJlcn0gZXZlbnQud2lkdGhcbiAqICAgW2VuXUN1cnJlbnQgd2lkdGguWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrlNwbGl0Vmlld+OBruW5heOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOBi+OCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIIgWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwcmVzcGxpdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGJlZm9yZSB0aGUgdmlldyBpcyBzcGxpdC5bL2VuXVxuICogICBbamFdc3BsaXTnirbmhYvjgavjgovliY3jgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3RzcGxpdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSB2aWV3IGlzIHNwbGl0LlsvZW5dXG4gKiAgIFtqYV1zcGxpdOeKtuaFi+OBq+OBquOBo+OBn+W+jOOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXdu44Gu5bmF44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5vcmllbnRhdGlvblxuICogICBbZW5dQ3VycmVudCBvcmllbnRhdGlvbi5bL2VuXVxuICogICBbamFd54++5Zyo44Gu55S76Z2i44Gu44Kq44Oq44Ko44Oz44OG44O844K344On44Oz44KS6L+U44GX44G+44GZ44CCXCJwb3J0cmFpdFwi44KC44GX44GP44GvXCJsYW5kc2NhcGVcIuOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcHJlY29sbGFwc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHZpZXcgaXMgY29sbGFwc2VkLlsvZW5dXG4gKiAgIFtqYV1jb2xsYXBzZeeKtuaFi+OBq+OBquOCi+WJjeOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXdu44Gu5bmF44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5vcmllbnRhdGlvblxuICogICBbZW5dQ3VycmVudCBvcmllbnRhdGlvbi5bL2VuXVxuICogICBbamFd54++5Zyo44Gu55S76Z2i44Gu44Kq44Oq44Ko44Oz44OG44O844K344On44Oz44KS6L+U44GX44G+44GZ44CCXCJwb3J0cmFpdFwi44KC44GX44GP44GvXCJsYW5kc2NhcGVcIuOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcG9zdGNvbGxhcHNlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYWZ0ZXIgdGhlIHZpZXcgaXMgY29sbGFwc2VkLlsvZW5dXG4gKiAgIFtqYV1jb2xsYXBzZeeKtuaFi+OBq+OBquOBo+OBn+W+jOOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXdu44Gu5bmF44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5vcmllbnRhdGlvblxuICogICBbZW5dQ3VycmVudCBvcmllbnRhdGlvbi5bL2VuXVxuICogICBbamFd54++5Zyo44Gu55S76Z2i44Gu44Kq44Oq44Ko44Oz44OG44O844K344On44Oz44KS6L+U44GX44G+44GZ44CCXCJwb3J0cmFpdFwi44KC44GX44GP44GvXCJsYW5kc2NhcGVcIuOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXQgdmlldy5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44OI44OT44Ol44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWFpbi1wYWdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2Ugb24gdGhlIHJpZ2h0LlsvZW5dXG4gKiAgIFtqYV3lj7PlgbTjgavooajnpLrjgZnjgovjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtYWluLXBhZ2Utd2lkdGhcbiAqIEBpbml0b25seVxuICogQHR5cGUge051bWJlcn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dTWFpbiBwYWdlIHdpZHRoIHBlcmNlbnRhZ2UuIFRoZSBzZWNvbmRhcnkgcGFnZSB3aWR0aCB3aWxsIGJlIHRoZSByZW1haW5pbmcgcGVyY2VudGFnZS5bL2VuXVxuICogICBbamFd5Y+z5YG044Gu44Oa44O844K444Gu5bmF44KS44OR44O844K744Oz44OI5Y2Y5L2N44Gn5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgc2Vjb25kYXJ5LXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgcGFnZSBvbiB0aGUgbGVmdC5bL2VuXVxuICogICBbamFd5bem5YG044Gr6KGo56S644GZ44KL44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgY29sbGFwc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgU3BlY2lmeSB0aGUgY29sbGFwc2UgYmVoYXZpb3IuIFZhbGlkIHZhbHVlcyBhcmUgcG9ydHJhaXQsIGxhbmRzY2FwZSwgd2lkdGggI3B4IG9yIGEgbWVkaWEgcXVlcnkuXG4gKiAgICAgXCJwb3J0cmFpdFwiIG9yIFwibGFuZHNjYXBlXCIgbWVhbnMgdGhlIHZpZXcgd2lsbCBjb2xsYXBzZSB3aGVuIGRldmljZSBpcyBpbiBsYW5kc2NhcGUgb3IgcG9ydHJhaXQgb3JpZW50YXRpb24uXG4gKiAgICAgXCJ3aWR0aCAjcHhcIiBtZWFucyB0aGUgdmlldyB3aWxsIGNvbGxhcHNlIHdoZW4gdGhlIHdpbmRvdyB3aWR0aCBpcyBzbWFsbGVyIHRoYW4gdGhlIHNwZWNpZmllZCAjcHguXG4gKiAgICAgSWYgdGhlIHZhbHVlIGlzIGEgbWVkaWEgcXVlcnksIHRoZSB2aWV3IHdpbGwgY29sbGFwc2Ugd2hlbiB0aGUgbWVkaWEgcXVlcnkgaXMgdHJ1ZS5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOW3puWBtOOBruODmuODvOOCuOOCkumdnuihqOekuuOBq+OBmeOCi+adoeS7tuOCkuaMh+WumuOBl+OBvuOBmeOAgnBvcnRyYWl0LCBsYW5kc2NhcGXjgIF3aWR0aCAjcHjjgoLjgZfjgY/jga/jg6Hjg4fjgqPjgqLjgq/jgqjjg6rjga7mjIflrprjgYzlj6/og73jgafjgZnjgIJcbiAqICAgICBwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBmeOCi+OBqOOAgeODh+ODkOOCpOOCueOBrueUu+mdouOBjOe4puWQkeOBjeOCguOBl+OBj+OBr+aoquWQkeOBjeOBq+OBquOBo+OBn+aZguOBq+mBqeeUqOOBleOCjOOBvuOBmeOAglxuICogICAgIHdpZHRoICNweOOCkuaMh+WumuOBmeOCi+OBqOOAgeeUu+mdouOBjOaMh+WumuOBl+OBn+aoquW5heOCiOOCiuOCguefreOBhOWgtOWQiOOBq+mBqeeUqOOBleOCjOOBvuOBmeOAglxuICogICAgIOODoeODh+OCo+OCouOCr+OCqOODquOCkuaMh+WumuOBmeOCi+OBqOOAgeaMh+WumuOBl+OBn+OCr+OCqOODquOBq+mBqeWQiOOBl+OBpuOBhOOCi+WgtOWQiOOBq+mBqeeUqOOBleOCjOOBvuOBmeOAglxuICogICBbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtdXBkYXRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJ1cGRhdGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInVwZGF0ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNwbGl0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzcGxpdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc3BsaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjb2xsYXBzZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY29sbGFwc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNvbGxhcHNlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNwbGl0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c3BsaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzcGxpdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3Rjb2xsYXBzZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNvbGxhcHNlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y29sbGFwc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldE1haW5QYWdlXG4gKiBAc2lnbmF0dXJlIHNldE1haW5QYWdlKHBhZ2VVcmwpXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8b25zLXRlbXBsYXRlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgcmlnaHQgc2VjdGlvblsvZW5dXG4gKiAgIFtqYV3mjIflrprjgZfjgZ9VUkzjgpLjg6HjgqTjg7Pjg5rjg7zjgrjjgpLoqq3jgb/ovrzjgb/jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRTZWNvbmRhcnlQYWdlXG4gKiBAc2lnbmF0dXJlIHNldFNlY29uZGFyeVBhZ2UocGFnZVVybClcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlVXJsXG4gKiAgIFtlbl1QYWdlIFVSTC4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGRvY3VtZW50IG9yIGFuIDxvbnMtdGVtcGxhdGU+LlsvZW5dXG4gKiAgIFtqYV1wYWdl44GuVVJM44GL44CBb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TaG93IHRoZSBwYWdlIHNwZWNpZmllZCBpbiBwYWdlVXJsIGluIHRoZSBsZWZ0IHNlY3Rpb25bL2VuXVxuICogICBbamFd5oyH5a6a44GX44GfVVJM44KS5bem44Gu44Oa44O844K444Gu6Kqt44G/6L6844G/44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgdXBkYXRlXG4gKiBAc2lnbmF0dXJlIHVwZGF0ZSgpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRyaWdnZXIgYW4gJ3VwZGF0ZScgZXZlbnQgYW5kIHRyeSB0byBkZXRlcm1pbmUgaWYgdGhlIHNwbGl0IGJlaGF2aW9yIHNob3VsZCBiZSBjaGFuZ2VkLlsvZW5dXG4gKiAgIFtqYV1zcGxpdOODouODvOODieOCkuWkieOBiOOCi+OBueOBjeOBi+OBqeOBhuOBi+OCkuWIpOaWreOBmeOCi+OBn+OCgeOBrid1cGRhdGUn44Kk44OZ44Oz44OI44KS55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NwbGl0VmlldycsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdFZpZXcsICRvbnNlbikge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBtYWluUGFnZSA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1haW4tcGFnZScpLFxuICAgICAgICAgICAgc2Vjb25kYXJ5UGFnZSA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnNlY29uZGFyeS1wYWdlJyk7XG5cbiAgICAgICAgaWYgKG1haW5QYWdlKSB7XG4gICAgICAgICAgdmFyIG1haW5IdG1sID0gYW5ndWxhci5lbGVtZW50KG1haW5QYWdlKS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZGFyeVBhZ2UpIHtcbiAgICAgICAgICB2YXIgc2Vjb25kYXJ5SHRtbCA9IGFuZ3VsYXIuZWxlbWVudChzZWNvbmRhcnlQYWdlKS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc3BsaXQtdmlld19fc2Vjb25kYXJ5IGZ1bGwtc2NyZWVuIG9ucy1zcGxpdC12aWV3LWlubmVyJykpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc3BsaXQtdmlld19fbWFpbiBmdWxsLXNjcmVlbiBvbnMtc3BsaXQtdmlldy1pbm5lcicpKTtcblxuICAgICAgICAgIHZhciBzcGxpdFZpZXcgPSBuZXcgU3BsaXRWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBpZiAobWFpbkh0bWwgJiYgIWF0dHJzLm1haW5QYWdlKSB7XG4gICAgICAgICAgICBzcGxpdFZpZXcuX2FwcGVuZE1haW5QYWdlKG1haW5IdG1sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2Vjb25kYXJ5SHRtbCAmJiAhYXR0cnMuc2Vjb25kYXJ5UGFnZSkge1xuICAgICAgICAgICAgc3BsaXRWaWV3Ll9hcHBlbmRTZWNvbmRQYWdlKHNlY29uZGFyeUh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGxpdFZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BsaXRWaWV3LCAndXBkYXRlIHByZXNwbGl0IHByZWNvbGxhcHNlIHBvc3RzcGxpdCBwb3N0Y29sbGFwc2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXQtdmlldycsIHNwbGl0Vmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGxpdFZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0LXZpZXcnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlckNvbnRlbnQnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlKSB7XG5cbiAgICB2YXIgU3BsaXR0ZXJDb250ZW50ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMubG9hZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcGFnZVNjb3BlICYmIHRoaXMuX3BhZ2VTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdLmxvYWQoLi4uYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2xpbms6IGZ1bmN0aW9uKGZyYWdtZW50LCBkb25lKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VTY29wZSA9IHRoaXMuX3Njb3BlLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUoZnJhZ21lbnQpKHRoaXMuX3BhZ2VTY29wZSk7XG5cbiAgICAgICAgdGhpcy5fcGFnZVNjb3BlLiRldmFsQXN5bmMoKCkgPT4gZG9uZShmcmFnbWVudCkpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLmxvYWQgPSB0aGlzLl9wYWdlU2NvcGUgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihTcGxpdHRlckNvbnRlbnQpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3BsaXR0ZXJDb250ZW50LCBbJ3BhZ2UnXSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXJDb250ZW50O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJTaWRlJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyU2lkZSA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnb3BlbicsICdjbG9zZScsICd0b2dnbGUnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMubG9hZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcGFnZVNjb3BlICYmIHRoaXMuX3BhZ2VTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdLmxvYWQoLi4uYXJncyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdtb2RlY2hhbmdlJywgJ3ByZW9wZW4nLCAncHJlY2xvc2UnLCAncG9zdG9wZW4nLCAncG9zdGNsb3NlJ1xuICAgICAgICBdLCBkZXRhaWwgPT4gZGV0YWlsLnNpZGUgPyBhbmd1bGFyLmV4dGVuZChkZXRhaWwsIHtzaWRlOiB0aGlzfSkgOiBkZXRhaWwpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2xpbms6IGZ1bmN0aW9uKGZyYWdtZW50LCBkb25lKSB7XG4gICAgICAgIHZhciBsaW5rID0gJGNvbXBpbGUoZnJhZ21lbnQpO1xuICAgICAgICB0aGlzLl9wYWdlU2NvcGUgPSB0aGlzLl9zY29wZS4kbmV3KCk7XG4gICAgICAgIGxpbmsodGhpcy5fcGFnZVNjb3BlKTtcblxuICAgICAgICB0aGlzLl9wYWdlU2NvcGUuJGV2YWxBc3luYygoKSA9PiBkb25lKGZyYWdtZW50KSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMubG9hZCA9IHRoaXMuX3BhZ2VTY29wZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyU2lkZSk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlclNpZGUsIFsncGFnZScsICdtb2RlJywgJ2lzT3BlbiddKTtcblxuICAgIHJldHVybiBTcGxpdHRlclNpZGU7XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXQgdmlldy5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44OI44OT44Ol44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlcicsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlciwgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgc3BsaXR0ZXIgPSBuZXcgU3BsaXR0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGxpdHRlcik7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGxpdHRlciwgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyJywgc3BsaXR0ZXIpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BsaXR0ZXIuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zd2l0Y2hcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzd2l0Y2guWy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTd2l0Y2gnLCBmdW5jdGlvbigkb25zZW4sIFN3aXRjaFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5uZ0NvbnRyb2xsZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgZWxlbWVudCBjYW5cXCd0IGFjY2VwdCBuZy1jb250cm9sbGVyIGRpcmVjdGl2ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzd2l0Y2hWaWV3ID0gbmV3IFN3aXRjaFZpZXcoZWxlbWVudCwgc2NvcGUsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHN3aXRjaFZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzd2l0Y2hWaWV3KTtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgc3dpdGNoVmlldyk7XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzd2l0Y2hWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzd2l0Y2hWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zd2l0Y2gnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IGF0dHJzID0gc2NvcGUgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyTm9uZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJOb25lQW5pbWF0b3IpO1xuICBtb2R1bGUudmFsdWUoJ1RhYmJhckZhZGVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyRmFkZUFuaW1hdG9yKTtcbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJTbGlkZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJTbGlkZUFuaW1hdG9yKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnVGFiYmFyVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUsICRwYXJzZSkge1xuICAgIHZhciBUYWJiYXJWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdvbnMtdGFiYmFyJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJlbGVtZW50XCIgcGFyYW1ldGVyIG11c3QgYmUgYSBcIm9ucy10YWJiYXJcIiBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuX2xhc3RQYWdlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3RQYWdlU2NvcGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncmVhY3RpdmUnLCAncG9zdGNoYW5nZScsICdwcmVjaGFuZ2UnLCAnaW5pdCcsICdzaG93JywgJ2hpZGUnLCAnZGVzdHJveSdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3NldEFjdGl2ZVRhYicsXG4gICAgICAgICAgJ3NldFRhYmJhclZpc2liaWxpdHknLFxuICAgICAgICAgICdnZXRBY3RpdmVUYWJJbmRleCcsXG4gICAgICAgICAgJ2xvYWRQYWdlJ1xuICAgICAgICBdKTtcblxuICAgICAgfSxcblxuICAgICAgX2NvbXBpbGVBbmRMaW5rOiBmdW5jdGlvbihwYWdlRWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGxpbmsgPSAkY29tcGlsZShwYWdlRWxlbWVudCk7XG4gICAgICAgIHZhciBwYWdlU2NvcGUgPSB0aGlzLl9zY29wZS4kbmV3KCk7XG4gICAgICAgIGxpbmsocGFnZVNjb3BlKTtcblxuICAgICAgICBwYWdlU2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICBjYWxsYmFjayhwYWdlRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE1pY3JvRXZlbnQubWl4aW4oVGFiYmFyVmlldyk7XG5cbiAgICBUYWJiYXJWaWV3LnJlZ2lzdGVyQW5pbWF0b3IgPSBmdW5jdGlvbihuYW1lLCBBbmltYXRvcikge1xuICAgICAgcmV0dXJuIHdpbmRvdy5vbnMuVGFiYmFyRWxlbWVudC5yZWdpc3RlckFuaW1hdG9yKG5hbWUsIEFuaW1hdG9yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFRhYmJhclZpZXc7XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0JhY2tCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCBHZW5lcmljVmlldywgQ29tcG9uZW50Q2xlYW5lcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIGJhY2tCdXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgICAgdmlld0tleTogJ29ucy1iYWNrLWJ1dHRvbidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGJhY2tCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhiYWNrQnV0dG9uKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cnMpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNCb3R0b21Ub29sYmFyJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgdmlld0tleTogJ29ucy1ib3R0b21Ub29sYmFyJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWJ1dHRvblxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYnV0dG9uJ1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYnV0dG9uLCAnZGlzYWJsZWQnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZCA9IHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cblxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0R1bW15Rm9ySW5pdCcsIGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICB2YXIgaXNSZWFkeSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgbGluazoge1xuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgIGlmICghaXNSZWFkeSkge1xuICAgICAgICAgICAgaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRvbnMtcmVhZHknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEVWRU5UUyA9XG4gICAgKCdkcmFnIGRyYWdsZWZ0IGRyYWdyaWdodCBkcmFndXAgZHJhZ2Rvd24gaG9sZCByZWxlYXNlIHN3aXBlIHN3aXBlbGVmdCBzd2lwZXJpZ2h0ICcgK1xuICAgICAgJ3N3aXBldXAgc3dpcGVkb3duIHRhcCBkb3VibGV0YXAgdG91Y2ggdHJhbnNmb3JtIHBpbmNoIHBpbmNoaW4gcGluY2hvdXQgcm90YXRlJykuc3BsaXQoLyArLyk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNHZXN0dXJlRGV0ZWN0b3InLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBzY29wZURlZiA9IEVWRU5UUy5yZWR1Y2UoZnVuY3Rpb24oZGljdCwgbmFtZSkge1xuICAgICAgZGljdFsnbmcnICsgdGl0bGl6ZShuYW1lKV0gPSAnJic7XG4gICAgICByZXR1cm4gZGljdDtcbiAgICB9LCB7fSk7XG5cbiAgICBmdW5jdGlvbiB0aXRsaXplKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBzY29wZURlZixcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIF8sIHRyYW5zY2x1ZGUpIHtcblxuICAgICAgICAgIHRyYW5zY2x1ZGUoc2NvcGUuJHBhcmVudCwgZnVuY3Rpb24oY2xvbmVkKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGF0dHIgPSAnbmcnICsgdGl0bGl6ZShldmVudC50eXBlKTtcblxuICAgICAgICAgICAgaWYgKGF0dHIgaW4gc2NvcGVEZWYpIHtcbiAgICAgICAgICAgICAgc2NvcGVbYXR0cl0oeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGdlc3R1cmVEZXRlY3RvcjtcblxuICAgICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3RvciA9IGVsZW1lbnRbMF0uX2dlc3R1cmVEZXRlY3RvcjtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vbihFVkVOVFMuam9pbignICcpLCBoYW5kbGVyKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3Iub2ZmKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLmVsZW1lbnQgPSBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWljb25cbiAqL1xuXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSWNvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBpZiAoYXR0cnMuaWNvbi5pbmRleE9mKCd7eycpICE9PSAtMSkge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdpY29uJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IGVsZW1lbnRbMF0uX3VwZGF0ZSgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSA9PiB7XG4gICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICB2aWV3S2V5OiAnb25zLWljb24nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuXG4gICAgICB9XG5cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gc2NyZWVuIG9yaWVudGF0aW9uLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0IGFuZCBsYW5kc2NhcGUuIERpZmZlcmVudCBmcm9tIG90aGVyIGNvbXBvbmVudHMsIHRoaXMgY29tcG9uZW50IGlzIHVzZWQgYXMgYXR0cmlidXRlIGluIGFueSBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV3nlLvpnaLjga7lkJHjgY3jgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLooYzjgYTjgb7jgZnjgIJwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAguOBmeOBueOBpuOBruimgee0oOOBruWxnuaAp+OBq+S9v+eUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtcGxhdGZvcm0gW2VuXW9ucy1pZi1wbGF0Zm9ybSBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtcGxhdGZvcm3jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLW9yaWVudGF0aW9uPVwicG9ydHJhaXRcIj5cbiAqICAgPHA+VGhpcyB3aWxsIG9ubHkgYmUgdmlzaWJsZSBpbiBwb3J0cmFpdCBtb2RlLjwvcD5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRWl0aGVyIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiLlsvZW5dXG4gKiAgIFtqYV1wb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZPcmllbnRhdGlvbicsIGZ1bmN0aW9uKCRvbnNlbiwgJG9uc0dsb2JhbCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnb25zLWlmLW9yaWVudGF0aW9uLWlubmVyJyk7XG5cbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZPcmllbnRhdGlvbicsIHVwZGF0ZSk7XG4gICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vbignY2hhbmdlJywgdXBkYXRlKTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNHbG9iYWwub3JpZW50YXRpb24ub2ZmKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgdXNlck9yaWVudGF0aW9uID0gKCcnICsgYXR0cnMub25zSWZPcmllbnRhdGlvbikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBvcmllbnRhdGlvbiA9IGdldExhbmRzY2FwZU9yUG9ydHJhaXQoKTtcblxuICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyB8fCB1c2VyT3JpZW50YXRpb24gPT09ICdsYW5kc2NhcGUnKSB7XG4gICAgICAgICAgICAgIGlmICh1c2VyT3JpZW50YXRpb24gPT09IG9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpIHtcbiAgICAgICAgICAgIHJldHVybiAkb25zR2xvYmFsLm9yaWVudGF0aW9uLmlzUG9ydHJhaXQoKSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1wbGF0Zm9ybVxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIC8gYnJvd3Nlci4gVmFsaWQgdmFsdWVzIGFyZSBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgYW5kIFwid3BcIi5bL2VuXVxuICogICAgW2phXeODl+ODqeODg+ODiOODleOCqeODvOODoOOChOODluODqeOCpuOCtuODvOOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuOBiuOBk+OBquOBhOOBvuOBmeOAgm9wZXJhLCBmaXJlZm94LCBzYWZhcmksIGNocm9tZSwgaWUsIGVkZ2UsIGFuZHJvaWQsIGJsYWNrYmVycnksIGlvcywgd3Djga7jgYTjgZrjgozjgYvjga7lgKTjgpLnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLW9yaWVudGF0aW9uIFtlbl1vbnMtaWYtb3JpZW50YXRpb24gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLW9yaWVudGF0aW9u44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1wbGF0Zm9ybT1cImFuZHJvaWRcIj5cbiAqICAgLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLXBsYXRmb3JtXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU9uZSBvciBtdWx0aXBsZSBzcGFjZSBzZXBhcmF0ZWQgdmFsdWVzOiBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgb3IgXCJ3cFwiLlsvZW5dXG4gKiAgIFtqYV1cIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIsIFwid3BcIuOBruOBhOOBmuOCjOOBi+epuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmUGxhdGZvcm0nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdvbnMtaWYtcGxhdGZvcm0taW5uZXInKTtcbiAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHZhciBwbGF0Zm9ybSA9IGdldFBsYXRmb3JtU3RyaW5nKCk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZlBsYXRmb3JtJywgZnVuY3Rpb24odXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJQbGF0Zm9ybXMgPSBhdHRycy5vbnNJZlBsYXRmb3JtLnRvTG93ZXJDYXNlKCkudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGxhdGZvcm1TdHJpbmcoKSB7XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSkpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9SSU0gVGFibGV0IE9TL2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQkIxMC9pKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYmxhY2tiZXJyeSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZXxpUGFkfGlQb2QvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW9zJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZXxJRU1vYmlsZXxXUERlc2t0b3AvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnd3AnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE9wZXJhIDguMCsgKFVBIGRldGVjdGlvbiB0byBkZXRlY3QgQmxpbmsvdjgtcG93ZXJlZCBPcGVyYSlcbiAgICAgICAgICB2YXIgaXNPcGVyYSA9ICEhd2luZG93Lm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc09wZXJhKSB7XG4gICAgICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJzsgICAvLyBGaXJlZm94IDEuMCtcbiAgICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc1NhZmFyaSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cuSFRNTEVsZW1lbnQpLmluZGV4T2YoJ0NvbnN0cnVjdG9yJykgPiAwO1xuICAgICAgICAgIC8vIEF0IGxlYXN0IFNhZmFyaSAzKzogXCJbb2JqZWN0IEhUTUxFbGVtZW50Q29uc3RydWN0b3JdXCJcbiAgICAgICAgICBpZiAoaXNTYWZhcmkpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNFZGdlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgRWRnZS8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc0VkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAnZWRnZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzQ2hyb21lID0gISF3aW5kb3cuY2hyb21lICYmICFpc09wZXJhICYmICFpc0VkZ2U7IC8vIENocm9tZSAxK1xuICAgICAgICAgIGlmIChpc0Nocm9tZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0lFID0gLypAY2Nfb24hQCovZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7IC8vIEF0IGxlYXN0IElFNlxuICAgICAgICAgIGlmIChpc0lFKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAaWQgaW5wdXRcbiAqIEBuYW1lIG9ucy1pbnB1dFxuICogQGNhdGVnb3J5IGZvcm1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1JbnB1dCBjb21wb25lbnQuWy9lbl1cbiAqICBbamFdaW5wdXTjgrPjg7Pjg53igJXjg43jg7Pjg4jjgafjgZnjgIJbL2phXVxuICogQGNvZGVwZW4gb2pReExqXG4gKiBAZ3VpZGUgVXNpbmdGb3JtQ29tcG9uZW50c1xuICogICBbZW5dVXNpbmcgZm9ybSBjb21wb25lbnRzWy9lbl1cbiAqICAgW2phXeODleOCqeODvOODoOOCkuS9v+OBhlsvamFdXG4gKiBAZ3VpZGUgRXZlbnRIYW5kbGluZ1xuICogICBbZW5dRXZlbnQgaGFuZGxpbmcgZGVzY3JpcHRpb25zWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWHpueQhuOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1pbnB1dD48L29ucy1pbnB1dD5cbiAqIDxvbnMtaW5wdXQgbW9kaWZpZXI9XCJtYXRlcmlhbFwiIGxhYmVsPVwiVXNlcm5hbWVcIj48L29ucy1pbnB1dD5cbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBhdHRyaWJ1dGVcbiAqIEBuYW1lIGxhYmVsXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UZXh0IGZvciBhbmltYXRlZCBmbG9hdGluZyBsYWJlbC5bL2VuXVxuICogICBbamFd44Ki44OL44Oh44O844K344On44Oz44GV44Gb44KL44OV44Ot44O844OG44Kj44Oz44Kw44Op44OZ44Or44Gu44OG44Kt44K544OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBhdHRyaWJ1dGVcbiAqIEBuYW1lIGZsb2F0XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dSWYgdGhpcyBhdHRyaWJ1dGUgaXMgcHJlc2VudCwgdGhlIGxhYmVsIHdpbGwgYmUgYW5pbWF0ZWQuWy9lbl1cbiAqICBbamFd44GT44Gu5bGe5oCn44GM6Kit5a6a44GV44KM44Gf5pmC44CB44Op44OZ44Or44Gv44Ki44OL44Oh44O844K344On44Oz44GZ44KL44KI44GG44Gr44Gq44KK44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBhdHRyaWJ1dGVcbiAqIEBuYW1lIG5nLW1vZGVsXG4gKiBAZXh0ZW5zaW9uT2YgYW5ndWxhclxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1CaW5kIHRoZSB2YWx1ZSB0byBhIG1vZGVsLiBXb3JrcyBqdXN0IGxpa2UgZm9yIG5vcm1hbCBpbnB1dCBlbGVtZW50cy5bL2VuXVxuICogICBbamFd44GT44Gu6KaB57Sg44Gu5YCk44KS44Oi44OH44Or44Gr57SQ5LuY44GR44G+44GZ44CC6YCa5bi444GuaW5wdXTopoHntKDjga7mp5jjgavli5XkvZzjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbmctY2hhbmdlXG4gKiBAZXh0ZW5zaW9uT2YgYW5ndWxhclxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1FeGVjdXRlcyBhbiBleHByZXNzaW9uIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuIFdvcmtzIGp1c3QgbGlrZSBmb3Igbm9ybWFsIGlucHV0IGVsZW1lbnRzLlsvZW5dXG4gKiAgIFtqYV3lgKTjgYzlpInjgo/jgaPjgZ/mmYLjgavjgZPjga7lsZ7mgKfjgafmjIflrprjgZfjgZ9leHByZXNzaW9u44GM5a6f6KGM44GV44KM44G+44GZ44CC6YCa5bi444GuaW5wdXTopoHntKDjga7mp5jjgavli5XkvZzjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNJbnB1dCcsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIGlmIChlbC5faXNUZXh0SW5wdXQpIHtcbiAgICAgICAgICAgIHNldChzY29wZSwgZWwudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlbC50eXBlID09PSAncmFkaW8nICYmIGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHNldChzY29wZSwgZWwudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldChzY29wZSwgZWwuY2hlY2tlZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWwuX2lzVGV4dElucHV0ICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlID09PSBlbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbC5faXNUZXh0SW5wdXRcbiAgICAgICAgICAgID8gZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICAgICAgOiBlbGVtZW50Lm9uKCdjaGFuZ2UnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWwuX2lzVGV4dElucHV0XG4gICAgICAgICAgICA/IGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgICAgICA6IGVsZW1lbnQub2ZmKCdjaGFuZ2UnLCBvbklucHV0KTtcblxuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBjYXRlZ29yeSBmb3JtXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIENvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiBpZiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgdmlzaWJsZSBvciBoaWRkZW4uXG4gKiAgICAgVGhpcyBjb21wb25lbnQgcmVxdWlyZXMgY29yZG92YSBhbmQgdGhhdCB0aGUgY29tLmlvbmljLmtleWJvYXJkIHBsdWdpbiBpcyBpbnN0YWxsZWQuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgabjgYTjgovjgYvjganjgYbjgYvjgafjgIHjgrPjg7Pjg4bjg7Pjg4TjgpLooajnpLrjgZnjgovjgYvjganjgYbjgYvjgpLliIfjgormm7/jgYjjgovjgZPjgajjgYzlh7rmnaXjgb7jgZnjgIJcbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjga/jgIFDb3Jkb3Zh44KEY29tLmlvbmljLmtleWJvYXJk44OX44Op44Kw44Kk44Oz44KS5b+F6KaB44Go44GX44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAZ3VpZGUgVXRpbGl0eUFQSXNcbiAqICAgW2VuXU90aGVyIHV0aWxpdHkgQVBJc1svZW5dXG4gKiAgIFtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWtleWJvYXJkLWFjdGl2ZT5cbiAqICAgVGhpcyB3aWxsIG9ubHkgYmUgZGlzcGxheWVkIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlxuICogPC9kaXY+XG4gKiA8ZGl2IG9ucy1rZXlib2FyZC1pbmFjdGl2ZT5cbiAqICAgVGhlcmUgaXMgYWxzbyBhIGNvbXBvbmVudCB0aGF0IGRvZXMgdGhlIG9wcG9zaXRlLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7lsZ7mgKfjgYzjgaTjgYTjgZ/opoHntKDjga/jgIHjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgZ/mmYLjgavliJ3jgoHjgabooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMta2V5Ym9hcmQtaW5hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBoaWRkZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOmaoOOCjOOBpuOBhOOCi+aZguOBruOBv+ihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBjb21waWxlRnVuY3Rpb24gPSBmdW5jdGlvbihzaG93LCAkb25zZW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGlzcFNob3cgPSBzaG93ID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICAgIGRpc3BIaWRlID0gc2hvdyA/ICdub25lJyA6ICdibG9jayc7XG5cbiAgICAgICAgdmFyIG9uU2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcFNob3cpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsIGRpc3BIaWRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25Jbml0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnZpc2libGUpIHtcbiAgICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICBpZiAob25zLnNvZnR3YXJlS2V5Ym9hcmQuX3Zpc2libGUpIHtcbiAgICAgICAgICBvblNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdzaG93Jywgb25TaG93KTtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ2hpZGUnLCBvbkhpZGUpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaW5pdCcsIG9uSW5pdCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRBY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24odHJ1ZSwgJG9uc2VuKVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0tleWJvYXJkSW5hY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24oZmFsc2UsICRvbnNlbilcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3QnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0J30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RIZWFkZXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0SGVhZGVyJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RJdGVtJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC1pdGVtJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRGlzcGxheSBhIHBsYWNlaG9sZGVyIHdoaWxlIHRoZSBjb250ZW50IGlzIGxvYWRpbmcuWy9lbl1cbiAqICAgW2phXU9uc2VuIFVJ44GM6Kqt44G/6L6844G+44KM44KL44G+44Gn44Gr6KGo56S644GZ44KL44OX44Os44O844K544Ob44Or44OA44O844KS6KGo54++44GX44G+44GZ44CCWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyPVwicGFnZS5odG1sXCI+XG4gKiAgIExvYWRpbmcuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIHRvIGxvYWQuWy9lbl1cbiAqICAgW2phXeiqreOBv+i+vOOCgOODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xvYWRpbmdQbGFjZWhvbGRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICBvbnMuX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIoZWxlbWVudFswXSwgYXR0cnMub25zTG9hZGluZ1BsYWNlaG9sZGVyLCBmdW5jdGlvbihjb250ZW50RWxlbWVudCwgZG9uZSkge1xuICAgICAgICAgICAgb25zLmNvbXBpbGUoY29udGVudEVsZW1lbnQpO1xuICAgICAgICAgICAgc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCJ2YXIgYmFiZWxIZWxwZXJzID0ge307XG5cbmJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5iYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbmJhYmVsSGVscGVycy5nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICB9XG59O1xuXG5iYWJlbEhlbHBlcnMuaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5iYWJlbEhlbHBlcnMucG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuYmFiZWxIZWxwZXJzOyIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSYW5nZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIHNldChzY29wZSwgZWxlbWVudFswXS52YWx1ZSk7XG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JpcHBsZScsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXJpcHBsZSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNjb3BlXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGwgY2hpbGQgZWxlbWVudHMgdXNpbmcgdGhlIFwidmFyXCIgYXR0cmlidXRlIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIHNjb3BlIG9mIHRoaXMgZWxlbWVudC5bL2VuXVxuICogICBbamFdXCJ2YXJcIuWxnuaAp+OCkuS9v+OBo+OBpuOBhOOCi+WFqOOBpuOBruWtkOimgee0oOOBrnZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjga/jgIHjgZPjga7opoHntKDjga5Bbmd1bGFySlPjgrnjgrPjg7zjg5fjgavov73liqDjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtbGlzdD5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLXNjb3BlIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICA8b25zLWNhcm91c2VsIHZhcj1cImNhcm91c2VsXCI+XG4gKiAgICAgICA8b25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5uZXh0KClcIj5cbiAqICAgICAgICAge3sgaXRlbSB9fVxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5wcmV2KClcIj5cbiAqICAgICAgICAgLi4uXG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgIDwvb25zLWNhcm91c2VsPlxuICogICA8L29ucy1saXN0LWl0ZW0+XG4gKiA8L29ucy1saXN0PlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTY29wZScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItY29udGVudFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuU3BsaXR0ZXJDb250ZW50RWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItY29udGVudCcsIGxhc3RSZWFkeSk7XG5cbiAgdmFyIGxhc3RMaW5rID0gd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLmxpbms7XG4gIHdpbmRvdy5vbnMuU3BsaXR0ZXJDb250ZW50RWxlbWVudC5yZXdyaXRhYmxlcy5saW5rID0gZnVuY3Rpb24oZWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciB2aWV3ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ29ucy1zcGxpdHRlci1jb250ZW50Jyk7XG4gICAgbGFzdExpbmsoZWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIHZpZXcuX2xpbmsodGFyZ2V0LCBjYWxsYmFjayk7XG4gICAgfSk7XG4gIH07XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlckNvbnRlbnQnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJDb250ZW50LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlckNvbnRlbnQoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1jb250ZW50Jywgdmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1jb250ZW50JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlci1zaWRlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlb3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlb3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0b3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdG9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5TcGxpdHRlclNpZGVFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItc2lkZScsIGxhc3RSZWFkeSk7XG5cbiAgdmFyIGxhc3RMaW5rID0gd2luZG93Lm9ucy5TcGxpdHRlclNpZGVFbGVtZW50LnJld3JpdGFibGVzLmxpbms7XG4gIHdpbmRvdy5vbnMuU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5saW5rID0gZnVuY3Rpb24oZWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciB2aWV3ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJyk7XG4gICAgbGFzdExpbmsoZWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIHZpZXcuX2xpbmsodGFyZ2V0LCBjYWxsYmFjayk7XG4gICAgfSk7XG4gIH07XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJTaWRlLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlclNpZGUoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYicsIHRhYilcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWJiYXJJdGVtJywgdGFiKTsgLy8gZm9yIEJDXG5cbiAgZnVuY3Rpb24gdGFiKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdGFiYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdGFiIGJhci5bL2VuXVxuICogICBbamFd44GT44Gu44K/44OW44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgaGlkZS10YWJzXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtCb29sZWFufVxuICogQGRlZmF1bHQgZmFsc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dV2hldGhlciB0byBoaWRlIHRoZSB0YWJzLiBWYWxpZCB2YWx1ZXMgYXJlIHRydWUvZmFsc2UuWy9lbl1cbiAqICAgW2phXeOCv+ODluOCkumdnuihqOekuuOBq+OBmeOCi+WgtOWQiOOBq+aMh+WumuOBl+OBvuOBmeOAgnRydWXjgoLjgZfjgY/jga9mYWxzZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1yZWFjdGl2ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicmVhY3RpdmVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlYWN0aXZlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy10YWJiYXInLCBsYXN0UmVhZHkpO1xuXG4gIHZhciBsYXN0TGluayA9IHdpbmRvdy5vbnMuVGFiYmFyRWxlbWVudC5yZXdyaXRhYmxlcy5saW5rO1xuICB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmV3cml0YWJsZXMubGluayA9IGZ1bmN0aW9uKHRhYmJhckVsZW1lbnQsIHRhcmdldCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgdmlldyA9IGFuZ3VsYXIuZWxlbWVudCh0YWJiYXJFbGVtZW50KS5kYXRhKCdvbnMtdGFiYmFyJyk7XG4gICAgdmlldy5fY29tcGlsZUFuZExpbmsodGFyZ2V0LCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIGxhc3RMaW5rKHRhYmJhckVsZW1lbnQsIHRhcmdldCwgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBsYXN0VW5saW5rID0gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnVubGluaztcbiAgd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnVubGluayA9IGZ1bmN0aW9uKHRhYmJhckVsZW1lbnQsIHRhcmdldCwgY2FsbGJhY2spIHtcbiAgICBhbmd1bGFyLmVsZW1lbnQodGFyZ2V0KS5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgIGxhc3RVbmxpbmsodGFiYmFyRWxlbWVudCwgdGFyZ2V0LCBjYWxsYmFjayk7XG4gIH07XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUYWJiYXInLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCAkcGFyc2UsIFRhYmJhclZpZXcpIHtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcblxuXG4gICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5oaWRlVGFicywgZnVuY3Rpb24oaGlkZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgaGlkZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGhpZGUgPSBoaWRlID09PSAndHJ1ZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRbMF0uc2V0VGFiYmFyVmlzaWJpbGl0eSghaGlkZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB0YWJiYXJWaWV3ID0gbmV3IFRhYmJhclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRhYmJhclZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModGFiYmFyVmlldywgJ3JlYWN0aXZlIHByZWNoYW5nZSBwb3N0Y2hhbmdlIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10YWJiYXInLCB0YWJiYXJWaWV3KTtcbiAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRhYmJhclZpZXcpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0YWJiYXJWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0YWJiYXJWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10YWJiYXInLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RlbXBsYXRlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICB2YXIgY29udGVudCA9IGVsZW1lbnRbMF0udGVtcGxhdGUgfHwgZWxlbWVudC5odG1sKCk7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dChlbGVtZW50LmF0dHIoJ2lkJyksIGNvbnRlbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvb2xiYXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHRvb2xiYXIuWy9lbl1cbiAqICBbamFd44GT44Gu44OE44O844Or44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUb29sYmFyJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBkaXJ0eSBmaXghXG4gICAgICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlTmFtZSA9PT0gJ29ucy10b29sYmFyJykge1xuICAgICAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXRvb2xiYXInfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b29sYmFyLWJ1dHRvblxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGJ1dHRvbi5bL2VuXVxuICogICBbamFd44GT44Gu44Oc44K/44Oz44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXJCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIHRvb2xiYXJCdXR0b24gPSBuZXcgR2VuZXJpY1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b29sYmFyLWJ1dHRvbicsIHRvb2xiYXJCdXR0b24pO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB0b29sYmFyQnV0dG9uKTtcblxuICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0b29sYmFyQnV0dG9uLCBlbGVtZW50KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0b29sYmFyQnV0dG9uLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRvb2xiYXJCdXR0b24pO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9vbGJhci1idXR0b24nLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzLFxuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBDb21wb25lbnRDbGVhbmVyID0ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICovXG4gICAgZGVjb21wb3NlTm9kZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gZWxlbWVudC5yZW1vdmUoKS5jaGlsZHJlbigpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlY29tcG9zZU5vZGUoYW5ndWxhci5lbGVtZW50KGNoaWxkcmVuW2ldKSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXR0cmlidXRlc30gYXR0cnNcbiAgICAgKi9cbiAgICBkZXN0cm95QXR0cmlidXRlczogZnVuY3Rpb24oYXR0cnMpIHtcbiAgICAgIGF0dHJzLiQkZWxlbWVudCA9IG51bGw7XG4gICAgICBhdHRycy4kJG9ic2VydmVycyA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICovXG4gICAgZGVzdHJveUVsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICovXG4gICAgZGVzdHJveVNjb3BlOiBmdW5jdGlvbihzY29wZSkge1xuICAgICAgc2NvcGUuJCRsaXN0ZW5lcnMgPSB7fTtcbiAgICAgIHNjb3BlLiQkd2F0Y2hlcnMgPSBudWxsO1xuICAgICAgc2NvcGUgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Njb3BlfSBzY29wZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICovXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbihzY29wZSwgZm4pIHtcbiAgICAgIHZhciBjbGVhciA9IHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXIoKTtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBtb2R1bGUuZmFjdG9yeSgnQ29tcG9uZW50Q2xlYW5lcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBDb21wb25lbnRDbGVhbmVyO1xuICB9KTtcblxuICAvLyBvdmVycmlkZSBidWlsdGluIG5nLShldmVudG5hbWUpIGRpcmVjdGl2ZXNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZ0V2ZW50RGlyZWN0aXZlcyA9IHt9O1xuICAgICdjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2Vtb3ZlIG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBrZXlkb3duIGtleXVwIGtleXByZXNzIHN1Ym1pdCBmb2N1cyBibHVyIGNvcHkgY3V0IHBhc3RlJy5zcGxpdCgnICcpLmZvckVhY2goXG4gICAgICBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmVOYW1lID0gZGlyZWN0aXZlTm9ybWFsaXplKCduZy0nICsgbmFtZSk7XG4gICAgICAgIG5nRXZlbnREaXJlY3RpdmVzW2RpcmVjdGl2ZU5hbWVdID0gWyckcGFyc2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGlsZTogZnVuY3Rpb24oJGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgICAgICAgdmFyIGZuID0gJHBhcnNlKGF0dHJbZGlyZWN0aXZlTmFtZV0pO1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmbihzY29wZSwgeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZWxlbWVudC5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50Lm9mZihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUoc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgc2NvcGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKGF0dHIpO1xuICAgICAgICAgICAgICAgICAgYXR0ciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfV07XG5cbiAgICAgICAgZnVuY3Rpb24gZGlyZWN0aXZlTm9ybWFsaXplKG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbihtYXRjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBtb2R1bGUuY29uZmlnKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICB2YXIgc2hpZnQgPSBmdW5jdGlvbigkZGVsZWdhdGUpIHtcbiAgICAgICAgJGRlbGVnYXRlLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiAkZGVsZWdhdGU7XG4gICAgICB9O1xuICAgICAgT2JqZWN0LmtleXMobmdFdmVudERpcmVjdGl2ZXMpLmZvckVhY2goZnVuY3Rpb24oZGlyZWN0aXZlTmFtZSkge1xuICAgICAgICAkcHJvdmlkZS5kZWNvcmF0b3IoZGlyZWN0aXZlTmFtZSArICdEaXJlY3RpdmUnLCBbJyRkZWxlZ2F0ZScsIHNoaWZ0XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhuZ0V2ZW50RGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihkaXJlY3RpdmVOYW1lKSB7XG4gICAgICBtb2R1bGUuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIG5nRXZlbnREaXJlY3RpdmVzW2RpcmVjdGl2ZU5hbWVdKTtcbiAgICB9KTtcbiAgfSkoKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5bJ2FsZXJ0JywgJ2NvbmZpcm0nLCAncHJvbXB0J10uZm9yRWFjaChuYW1lID0+IHtcbiAgb25zLm5vdGlmaWNhdGlvbltuYW1lXSA9IChtZXNzYWdlLCBvcHRpb25zID0ge30pID0+IHtcbiAgICB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgPyAob3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZSkgOiAob3B0aW9ucyA9IG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgY29tcGlsZSA9IG9wdGlvbnMuY29tcGlsZTtcblxuICAgIG9wdGlvbnMuY29tcGlsZSA9IGVsZW1lbnQgPT4ge1xuICAgICAgY29uc3QgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY29tcGlsZSA/IGNvbXBpbGUoZWxlbWVudCkgOiBlbGVtZW50KTtcbiAgICAgIHJldHVybiBvbnMuJGNvbXBpbGUoJGVsZW1lbnQpKCRlbGVtZW50LmluamVjdG9yKCkuZ2V0KCckcm9vdFNjb3BlJykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gb25zLm5vdGlmaWNhdGlvbltgXyR7bmFtZX1PcmlnaW5hbGBdKG9wdGlvbnMpO1xuICB9O1xufSk7IiwiLy8gY29uZmlybSB0byB1c2UganFMaXRlXG5pZiAod2luZG93LmpRdWVyeSAmJiBhbmd1bGFyLmVsZW1lbnQgPT09IHdpbmRvdy5qUXVlcnkpIHtcbiAgY29uc29sZS53YXJuKCdPbnNlbiBVSSByZXF1aXJlIGpxTGl0ZS4gTG9hZCBqUXVlcnkgYWZ0ZXIgbG9hZGluZyBBbmd1bGFySlMgdG8gZml4IHRoaXMgZXJyb3IuIGpRdWVyeSBtYXkgYnJlYWsgT25zZW4gVUkgYmVoYXZpb3IuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxufVxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICB2YXIgdGVtcGxhdGVzID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9vbnMtdGVtcGxhdGVcIl0nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGVzW2ldKTtcbiAgICAgIHZhciBpZCA9IHRlbXBsYXRlLmF0dHIoJ2lkJyk7XG4gICAgICBpZiAodHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoaWQsIHRlbXBsYXRlLnRleHQoKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
