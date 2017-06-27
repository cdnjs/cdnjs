/*! angular-onsenui.js for onsenui - v2.0.5 - 2016-12-19 */
"use strict";

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
"use strict";

//HEAD 
(function (app) {
    try {
        app = angular.module("templates-main");
    } catch (err) {
        app = angular.module("templates-main", []);
    }
    app.run(["$templateCache", function ($templateCache) {
        "use strict";

        $templateCache.put("templates/sliding_menu.tpl", "<div class=\"onsen-sliding-menu__menu\"></div>\n" + "<div class=\"onsen-sliding-menu__main\"></div>\n" + "");

        $templateCache.put("templates/split_view.tpl", "<div class=\"onsen-split-view__secondary full-screen\"></div>\n" + "<div class=\"onsen-split-view__main full-screen\"></div>\n" + "");
    }]);
})();
'use strict';

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
          options.parentScope.$evalAsync();
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
          options.parentScope.$evalAsync();
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
          options.parentScope.$evalAsync();
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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
        value: function loadItemElement(index, parent, done) {
          this._prepareItemElement(index, function (_ref) {
            var element = _ref.element,
                scope = _ref.scope;

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
'use strict';

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
'use strict';

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

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['insertPage', 'pushPage', 'bringPageTop', 'popPage', 'replacePage', 'resetToPage', 'canPopPage']);
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
'use strict';

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
'use strict';

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
          ons.animit(this._menuPage[0]).queue(menuStyle).play();
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

          ons.animit(this._mainPage[0]).wait(delay).queue(mainPageStyle, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            callback();
            done();
          }).play();

          ons.animit(this._menuPage[0]).wait(delay).queue(menuStyle, {
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

          ons.animit(this._mainPage[0]).wait(delay).queue(mainPageStyle, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            this._menuPage.css('display', 'none');
            callback();
            done();
          }.bind(this)).play();

          ons.animit(this._menuPage[0]).wait(delay).queue(menuPageStyle, {
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

        ons.animit(this._menuPage[0]).queue(menuPageStyle).play();

        if (Object.keys(mainPageStyle).length > 0) {
          ons.animit(this._mainPage[0]).queue(mainPageStyle).play();
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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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

          ons.animit(this._mainPage[0]).queue({ transform: mainPageTransform }).play();
          ons.animit(this._menuPage[0]).queue(menuPageStyle).play();
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

          ons.animit(this._mainPage[0]).wait(delay).queue({
            transform: aboveTransform
          }, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            callback();
            done();
          }).play();

          ons.animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
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

          ons.animit(this._mainPage[0]).wait(delay).queue({
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

          ons.animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
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

        ons.animit(this._mainPage[0]).queue({ transform: aboveTransform }).play();

        ons.animit(this._menuPage[0]).queue(behindStyle).play();
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
'use strict';

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
        ons.animit(mainPage[0]).queue({ transform: 'translate3d(0, 0, 0)' }).play();
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

          ons.animit(this._mainPage[0]).queue({ transform: aboveTransform }).play();
          ons.animit(this._menuPage[0]).queue(behindStyle).play();
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

          ons.animit(this._mainPage[0]).wait(delay).queue({
            transform: aboveTransform
          }, {
            duration: duration,
            timing: this.timing
          }).queue(function (done) {
            callback();
            done();
          }).play();

          ons.animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
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

          ons.animit(this._mainPage[0]).wait(delay).queue({
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

          ons.animit(this._menuPage[0]).wait(delay).queue(behindStyle, {
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

        ons.animit(this._mainPage[0]).queue({ transform: aboveTransform }).play();

        ons.animit(this._menuPage[0]).queue(behindStyle).play();
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
'use strict';

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
        var _this = this;

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

        setImmediate(function () {
          _this._currentPageElement[0]._show();
        });
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
'use strict';

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
'use strict';

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
'use strict';

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
        var _this = this;

        var pageScope = this._scope.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._mainPage.append(pageContent);

        if (this._currentPage) {
          this._currentPageScope.$destroy();
        }

        this._currentPage = pageContent;
        this._currentPageScope = pageScope;

        setImmediate(function () {
          _this._currentPage[0]._show();
        });
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
'use strict';

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

        this.load = this._element[0].load;
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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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

  module.factory('TabbarView', ['$onsen', function ($onsen) {
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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
"use strict";
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

/**
 * @element ons-sliding-menu
 * @category menu
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
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__menu'));
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__main'));

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
'use strict';

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
'use strict';

/**
 * @element ons-split-view
 * @category control
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
          element.append(angular.element('<div></div>').addClass('onsen-split-view__secondary full-screen'));
          element.append(angular.element('<div></div>').addClass('onsen-split-view__main full-screen'));

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
'use strict';

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
'use strict';

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
'use strict';

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

  var lastReady = window.ons.SplitterSideElement.rewritables.ready;
  window.ons.SplitterSideElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-side', lastReady);

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
'use strict';

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
'use strict';

(function () {
  'use strict';

  tab.$inject = ['$onsen', 'GenericView'];
  angular.module('onsen').directive('onsTab', tab).directive('onsTabbarItem', tab); // for BC

  function tab($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        var view = new GenericView(scope, element, attrs);
        element[0].pageLoader = $onsen.createPageLoader(view);

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }
})();
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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
'use strict';

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

          link(pageScope);

          /**
           * Overwrite page scope.
           */
          angular.element(pageElement).data('_scope', pageScope);

          pageScope.$evalAsync(function () {
            callback(pageElement);
          });
        },

        /**
         * @param {Object} view
         * @return {Object} pageLoader
         */
        createPageLoader: function createPageLoader(view) {
          var _this = this;

          return new window.ons.PageLoader(function (_ref, done) {
            var page = _ref.page,
                parent = _ref.parent;

            window.ons._internal.getPageHTMLAsync(page).then(function (html) {
              _this.compileAndLink(view, window.ons._util.createElement(html.trim()), function (element) {
                parent.appendChild(element);
                done(element);
              });
            });
          }, function (element) {
            angular.element(element).data('_scope').$destroy();
            element.remove();
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
'use strict';

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
'use strict';

// confirm to use jqLite
if (window.jQuery && angular.element === window.jQuery) {
  console.warn('Onsen UI require jqLite. Load jQuery after loading AngularJS to fix this error. jQuery may break Onsen UI behavior.'); // eslint-disable-line no-console
}
'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIiwidGVtcGxhdGVzLmpzIiwib25zZW4uanMiLCJhbGVydERpYWxvZy5qcyIsImFsZXJ0RGlhbG9nQW5pbWF0b3IuanMiLCJhbmltYXRpb25DaG9vc2VyLmpzIiwiY2Fyb3VzZWwuanMiLCJkaWFsb2cuanMiLCJkaWFsb2dBbmltYXRvci5qcyIsImZhYi5qcyIsImdlbmVyaWMuanMiLCJsYXp5UmVwZWF0LmpzIiwibGF6eVJlcGVhdERlbGVnYXRlLmpzIiwibW9kYWwuanMiLCJuYXZpZ2F0b3IuanMiLCJuYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IuanMiLCJvdmVybGF5U2xpZGluZ01lbnVBbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJwdXNoU2xpZGluZ01lbnVBbmltYXRvci5qcyIsInJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzbGlkaW5nTWVudS5qcyIsInNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzcGVlZERpYWwuanMiLCJzcGxpdFZpZXcuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsImJhY2tCdXR0b24uanMiLCJib3R0b21Ub29sYmFyLmpzIiwiYnV0dG9uLmpzIiwiZHVtbXlGb3JJbml0LmpzIiwiZ2VzdHVyZURldGVjdG9yLmpzIiwiaWNvbi5qcyIsImlmT3JpZW50YXRpb24uanMiLCJpZlBsYXRmb3JtLmpzIiwiaW5wdXQuanMiLCJrZXlib2FyZC5qcyIsImxpc3QuanMiLCJsaXN0SGVhZGVyLmpzIiwibGlzdEl0ZW0uanMiLCJsb2FkaW5nUGxhY2Vob2xkZXIuanMiLCJwcm9ncmVzc0Jhci5qcyIsInJhbmdlLmpzIiwicmlwcGxlLmpzIiwic2NvcGUuanMiLCJzcGxpdHRlckNvbnRlbnQuanMiLCJzcGxpdHRlclNpZGUuanMiLCJ0YWIuanMiLCJ0YWJCYXIuanMiLCJ0ZW1wbGF0ZS5qcyIsInRvb2xiYXIuanMiLCJ0b29sYmFyQnV0dG9uLmpzIiwiY29tcG9uZW50Q2xlYW5lci5qcyIsIm5vdGlmaWNhdGlvbi5qcyIsInNldHVwLmpzIiwidGVtcGxhdGVMb2FkZXIuanMiXSwibmFtZXMiOlsiZm5UZXN0IiwidGVzdCIsInh5eiIsIkJhc2VDbGFzcyIsImV4dGVuZCIsInByb3BzIiwiX3N1cGVyIiwicHJvdG90eXBlIiwicHJvdG8iLCJPYmplY3QiLCJjcmVhdGUiLCJuYW1lIiwiZm4iLCJ0bXAiLCJyZXQiLCJhcHBseSIsImFyZ3VtZW50cyIsIm5ld0NsYXNzIiwiaW5pdCIsImhhc093blByb3BlcnR5IiwiU3ViQ2xhc3MiLCJFbXB0eUNsYXNzIiwiY29uc3RydWN0b3IiLCJ3aW5kb3ciLCJDbGFzcyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJlcnIiLCJydW4iLCIkdGVtcGxhdGVDYWNoZSIsInB1dCIsIm9ucyIsImluaXRPbnNlbkZhY2FkZSIsIndhaXRPbnNlblVJTG9hZCIsImluaXRBbmd1bGFyTW9kdWxlIiwiaW5pdFRlbXBsYXRlQ2FjaGUiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwidmFsdWUiLCIkb25zZW4iLCIkcSIsIl9vbnNlblNlcnZpY2UiLCJfcVNlcnZpY2UiLCJjb25zb2xlIiwiYWxlcnQiLCJfaW50ZXJuYWwiLCJnZXRUZW1wbGF0ZUhUTUxBc3luYyIsInBhZ2UiLCJjYWNoZSIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29tcG9uZW50QmFzZSIsImJvb3RzdHJhcCIsImRlcHMiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiY29uY2F0IiwiZG9jIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZFBhcmVudENvbXBvbmVudFVudGlsIiwiZG9tIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwidGFyZ2V0IiwiaW5oZXJpdGVkRGF0YSIsImZpbmRDb21wb25lbnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbXBpbGUiLCJzY29wZSIsIl9nZXRPbnNlblNlcnZpY2UiLCJfd2FpdERpcmV0aXZlSW5pdCIsImVsZW1lbnROYW1lIiwibGFzdFJlYWR5IiwiY2FsbGJhY2siLCJsaXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlQWxlcnREaWFsb2ciLCJvcHRpb25zIiwibGluayIsInBhcmVudFNjb3BlIiwiJG5ldyIsIiRldmFsQXN5bmMiLCJfY3JlYXRlQWxlcnREaWFsb2dPcmlnaW5hbCIsInRoZW4iLCJhbGVydERpYWxvZyIsImNyZWF0ZURpYWxvZyIsIl9jcmVhdGVEaWFsb2dPcmlnaW5hbCIsImRpYWxvZyIsImNyZWF0ZVBvcG92ZXIiLCJfY3JlYXRlUG9wb3Zlck9yaWdpbmFsIiwicG9wb3ZlciIsInJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJfcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlck9yaWdpbmFsIiwiZG9uZSIsInNldEltbWVkaWF0ZSIsIl9zZXR1cExvYWRpbmdQbGFjZUhvbGRlcnMiLCJmYWN0b3J5IiwiQWxlcnREaWFsb2dWaWV3IiwiYXR0cnMiLCJfc2NvcGUiLCJfZWxlbWVudCIsIl9hdHRycyIsIl9jbGVhckRlcml2aW5nTWV0aG9kcyIsImRlcml2ZU1ldGhvZHMiLCJfY2xlYXJEZXJpdmluZ0V2ZW50cyIsImRlcml2ZUV2ZW50cyIsImRldGFpbCIsImJpbmQiLCJfZGVzdHJveSIsImVtaXQiLCJyZW1vdmUiLCJNaWNyb0V2ZW50IiwibWl4aW4iLCJkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQiLCJBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3IiLCJJT1NBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5pbWF0b3JGYWN0b3J5IiwiQ2Fyb3VzZWxWaWV3IiwiY2Fyb3VzZWwiLCJEaWFsb2dWaWV3IiwicmVnaXN0ZXJBbmltYXRvciIsIkFuaW1hdG9yIiwiRGlhbG9nRWxlbWVudCIsIkRpYWxvZ0FuaW1hdG9yIiwiSU9TRGlhbG9nQW5pbWF0b3IiLCJBbmRyb2lkRGlhbG9nQW5pbWF0b3IiLCJTbGlkZURpYWxvZ0FuaW1hdG9yIiwiRmFiVmlldyIsIkdlbmVyaWNWaWV3Iiwic2VsZiIsImRpcmVjdGl2ZU9ubHkiLCJtb2RpZmllclRlbXBsYXRlIiwiYWRkTW9kaWZpZXJNZXRob2RzIiwiYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMiLCJjbGVhbmVyIiwib25EZXN0cm95IiwiX2V2ZW50cyIsInJlbW92ZU1vZGlmaWVyTWV0aG9kcyIsImNsZWFyQ29tcG9uZW50IiwicmVnaXN0ZXIiLCJ2aWV3Iiwidmlld0tleSIsImRlY2xhcmVWYXJBdHRyaWJ1dGUiLCJkZXN0cm95Iiwibm9vcCIsIkFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUiLCJMYXp5UmVwZWF0VmlldyIsImxpbmtlciIsIl9saW5rZXIiLCJfdXRpbCIsInVwZGF0ZVBhcmVudFBvc2l0aW9uIiwidXNlckRlbGVnYXRlIiwiJGV2YWwiLCJvbnNMYXp5UmVwZWF0IiwiaW50ZXJuYWxEZWxlZ2F0ZSIsIl9wcm92aWRlciIsIkxhenlSZXBlYXRQcm92aWRlciIsInBhcmVudE5vZGUiLCJyZWZyZXNoIiwiJHdhdGNoIiwiY291bnRJdGVtcyIsIl9vbkNoYW5nZSIsImRpcmVjdGl2ZUF0dHJpYnV0ZXMiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJfcGFyZW50U2NvcGUiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ciIsImNsb25lTm9kZSIsIml0ZW0iLCJfdXNlckRlbGVnYXRlIiwiY29uZmlndXJlSXRlbVNjb3BlIiwiRnVuY3Rpb24iLCJkZXN0cm95SXRlbVNjb3BlIiwiY3JlYXRlSXRlbUNvbnRlbnQiLCJpbmRleCIsInBhcmVudCIsIl9wcmVwYXJlSXRlbUVsZW1lbnQiLCJfYWRkU3BlY2lhbFByb3BlcnRpZXMiLCJfdXNpbmdCaW5kaW5nIiwiY2xvbmVkIiwiaSIsImxhc3QiLCIkaW5kZXgiLCIkZmlyc3QiLCIkbGFzdCIsIiRtaWRkbGUiLCIkZXZlbiIsIiRvZGQiLCIkZGVzdHJveSIsIkxhenlSZXBlYXREZWxlZ2F0ZSIsIk1vZGFsQW5pbWF0b3IiLCJGYWRlTW9kYWxBbmltYXRvciIsIiRwYXJzZSIsIk1vZGFsVmlldyIsIl9hbmltYXRvckZhY3RvcnkiLCJzZXRBbmltYXRpb25PcHRpb25zIiwiYW5pbWF0aW9uT3B0aW9ucyIsInNob3ciLCJoaWRlIiwidG9nZ2xlIiwiTW9kYWxFbGVtZW50IiwiTmF2aWdhdG9yVmlldyIsIl9wcmV2aW91c1BhZ2VTY29wZSIsIl9ib3VuZE9uUHJlcG9wIiwiX29uUHJlcG9wIiwib24iLCJuYXZpZ2F0b3IiLCJldmVudCIsInBhZ2VzIiwibGVuZ3RoIiwib2ZmIiwiTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiRmFkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvciIsIklPU1NsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiTGlmdE5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvciIsIlNpbXBsZVNsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiU2xpZGluZ01lbnVBbmltYXRvciIsIk92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yIiwiX2JsYWNrTWFzayIsIl9pc1JpZ2h0IiwiX21lbnVQYWdlIiwiX21haW5QYWdlIiwiX3dpZHRoIiwic2V0dXAiLCJtYWluUGFnZSIsIm1lbnVQYWdlIiwid2lkdGgiLCJpc1JpZ2h0IiwiY3NzIiwiZGlzcGxheSIsInpJbmRleCIsInJpZ2h0IiwibGVmdCIsImJhY2tncm91bmRDb2xvciIsInRvcCIsImJvdHRvbSIsInBvc2l0aW9uIiwicHJlcGVuZCIsIm9uUmVzaXplZCIsImlzT3BlbmVkIiwibWF4IiwiY2xpZW50V2lkdGgiLCJtZW51U3R5bGUiLCJfZ2VuZXJhdGVNZW51UGFnZVN0eWxlIiwiYW5pbWl0IiwicXVldWUiLCJwbGF5IiwicmVtb3ZlQXR0ciIsIm9wZW5NZW51IiwiaW5zdGFudCIsImR1cmF0aW9uIiwiZGVsYXkiLCJtYWluUGFnZVN0eWxlIiwiX2dlbmVyYXRlTWFpblBhZ2VTdHlsZSIsInNldFRpbWVvdXQiLCJ3YWl0IiwidGltaW5nIiwiY2xvc2VNZW51IiwibWVudVBhZ2VTdHlsZSIsInRyYW5zbGF0ZU1lbnUiLCJNYXRoIiwibWluIiwibWF4RGlzdGFuY2UiLCJkaXN0YW5jZSIsIm9wYWNpdHkiLCJrZXlzIiwieCIsInRyYW5zZm9ybSIsImNvcHkiLCJQYWdlVmlldyIsIl9jbGVhckxpc3RlbmVyIiwiZGVmaW5lUHJvcGVydHkiLCJvbkRldmljZUJhY2tCdXR0b24iLCJzZXQiLCJfdXNlckJhY2tCdXR0b25IYW5kbGVyIiwiX2VuYWJsZUJhY2tCdXR0b25IYW5kbGVyIiwibmdEZXZpY2VCYWNrQnV0dG9uIiwibmdJbmZpbml0ZVNjcm9sbCIsIm9uSW5maW5pdGVTY3JvbGwiLCJfb25EZXZpY2VCYWNrQnV0dG9uIiwiJGV2ZW50IiwibGFzdEV2ZW50IiwiUG9wb3ZlclZpZXciLCJQb3BvdmVyQW5pbWF0b3IiLCJGYWRlUG9wb3ZlckFuaW1hdG9yIiwiUHVsbEhvb2tWaWV3IiwicHVsbEhvb2siLCJvbkFjdGlvbiIsIm5nQWN0aW9uIiwiJGRvbmUiLCJQdXNoU2xpZGluZ01lbnVBbmltYXRvciIsIm1haW5QYWdlVHJhbnNmb3JtIiwiX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtIiwiX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlIiwiYWJvdmVUcmFuc2Zvcm0iLCJiZWhpbmRTdHlsZSIsImJlaGluZFgiLCJiZWhpbmRUcmFuc2Zvcm0iLCJSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yIiwiYm94U2hhZG93IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYmVoaW5kRGlzdGFuY2UiLCJpc05hTiIsIlNsaWRpbmdNZW51Vmlld01vZGVsIiwiX2Rpc3RhbmNlIiwiX21heERpc3RhbmNlIiwiaXNOdW1iZXIiLCJzZXRNYXhEaXN0YW5jZSIsInNob3VsZE9wZW4iLCJzaG91bGRDbG9zZSIsImlzQ2xvc2VkIiwib3Blbk9yQ2xvc2UiLCJvcGVuIiwiY2xvc2UiLCJnZXRYIiwiZ2V0TWF4RGlzdGFuY2UiLCJ0cmFuc2xhdGUiLCJBbmltYXRpb25DaG9vc2VyIiwiU2xpZGluZ01lbnVWaWV3IiwiX2Rvb3JMb2NrIiwiX2lzUmlnaHRNZW51IiwiX0Rvb3JMb2NrIiwic2lkZSIsIl9tYWluUGFnZUdlc3R1cmVEZXRlY3RvciIsIkdlc3R1cmVEZXRlY3RvciIsIl9ib3VuZE9uVGFwIiwiX29uVGFwIiwiX25vcm1hbGl6ZU1heFNsaWRlRGlzdGFuY2VBdHRyIiwiX2xvZ2ljIiwiX3RyYW5zbGF0ZSIsIl9vcGVuIiwiX2Nsb3NlIiwiJG9ic2VydmUiLCJfb25NYXhTbGlkZURpc3RhbmNlQ2hhbmdlZCIsIl9vblN3aXBlYWJsZUNoYW5nZWQiLCJfYm91bmRPbldpbmRvd1Jlc2l6ZSIsIl9vbldpbmRvd1Jlc2l6ZSIsIl9ib3VuZEhhbmRsZUV2ZW50IiwiX2hhbmRsZUV2ZW50IiwiX2JpbmRFdmVudHMiLCJzZXRNYWluUGFnZSIsInNldE1lbnVQYWdlIiwiX2RldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiX2RldmljZUJhY2tCdXR0b25EaXNwYXRjaGVyIiwiY3JlYXRlSGFuZGxlciIsInVubG9jayIsImFuaW1hdGlvbkNob29zZXIiLCJhbmltYXRvcnMiLCJfYW5pbWF0b3JEaWN0IiwiYmFzZUNsYXNzIiwiYmFzZUNsYXNzTmFtZSIsImRlZmF1bHRBbmltYXRpb24iLCJ0eXBlIiwiZGVmYXVsdEFuaW1hdGlvbk9wdGlvbnMiLCJfYW5pbWF0b3IiLCJuZXdBbmltYXRvciIsIm1heFNsaWRlRGlzdGFuY2UiLCJzd2lwZWFibGUiLCJzZXRTd2lwZWFibGUiLCJnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsImlzTWVudU9wZW5lZCIsImNhbGxQYXJlbnRIYW5kbGVyIiwiX3JlZnJlc2hNZW51UGFnZVdpZHRoIiwiZW5hYmxlZCIsIl9hY3RpdmF0ZUdlc3R1cmVEZXRlY3RvciIsIl9kZWFjdGl2YXRlR2VzdHVyZURldGVjdG9yIiwiX3JlY2FsY3VsYXRlTUFYIiwiaW5kZXhPZiIsInBhcnNlSW50IiwicmVwbGFjZSIsInBhcnNlRmxvYXQiLCJfZ2VzdHVyZURldGVjdG9yIiwiZHJhZ01pbkRpc3RhbmNlIiwiX2FwcGVuZE1haW5QYWdlIiwicGFnZVVybCIsInRlbXBsYXRlSFRNTCIsInBhZ2VTY29wZSIsInBhZ2VDb250ZW50IiwiYXBwZW5kIiwiX2N1cnJlbnRQYWdlRWxlbWVudCIsIl9jdXJyZW50UGFnZVNjb3BlIiwiX2N1cnJlbnRQYWdlVXJsIiwiX3Nob3ciLCJfYXBwZW5kTWVudVBhZ2UiLCJfY3VycmVudE1lbnVQYWdlU2NvcGUiLCJfY3VycmVudE1lbnVQYWdlRWxlbWVudCIsImdldFBhZ2VIVE1MQXN5bmMiLCJodG1sIiwiaXNMb2NrZWQiLCJfaXNJbnNpZGVJZ25vcmVkRWxlbWVudCIsIl9pc0luc2lkZVN3aXBlVGFyZ2V0QXJlYSIsImdlc3R1cmUiLCJwcmV2ZW50RGVmYXVsdCIsImRlbHRhWCIsImRlbHRhRGlzdGFuY2UiLCJzdGFydEV2ZW50Iiwic3RvcERldGVjdCIsIl9sYXN0RGlzdGFuY2UiLCJnZXRBdHRyaWJ1dGUiLCJjZW50ZXIiLCJwYWdlWCIsIl9zd2lwZVRhcmdldFdpZHRoIiwiX2dldFN3aXBlVGFyZ2V0V2lkdGgiLCJ0YXJnZXRXaWR0aCIsInN3aXBlVGFyZ2V0V2lkdGgiLCJzbGlkaW5nTWVudSIsIndhaXRVbmxvY2siLCJhbmltYXRpb24iLCJjaGlsZHJlbiIsInRvZ2dsZU1lbnUiLCJjbG9zZUNsb3NlIiwiU3BlZWREaWFsVmlldyIsIiRvbnNHbG9iYWwiLCJTUExJVF9NT0RFIiwiQ09MTEFQU0VfTU9ERSIsIk1BSU5fUEFHRV9SQVRJTyIsIlNwbGl0VmlldyIsImFkZENsYXNzIiwiX3NlY29uZGFyeVBhZ2UiLCJfbWF4IiwiX21vZGUiLCJfZG9TcGxpdCIsIl9kb0NvbGxhcHNlIiwib3JpZW50YXRpb24iLCJfb25SZXNpemUiLCJzZWNvbmRhcnlQYWdlIiwic2V0U2Vjb25kYXJ5UGFnZSIsIl9jb25zaWRlckNoYW5naW5nQ29sbGFwc2UiLCJfc2V0U2l6ZSIsIl9hcHBlbmRTZWNvbmRQYWdlIiwiX2N1cnJlbnRTZWNvbmRhcnlQYWdlRWxlbWVudCIsIl9jdXJyZW50U2Vjb25kYXJ5UGFnZVNjb3BlIiwiX2N1cnJlbnRQYWdlIiwidHJpbSIsImxhc3RNb2RlIiwic2hvdWxkIiwiX3Nob3VsZENvbGxhcHNlIiwiX2ZpcmVVcGRhdGVFdmVudCIsIl9hY3RpdmF0ZVNwbGl0TW9kZSIsIl9hY3RpdmF0ZUNvbGxhcHNlTW9kZSIsInVwZGF0ZSIsIl9nZXRPcmllbnRhdGlvbiIsImlzUG9ydHJhaXQiLCJnZXRDdXJyZW50TW9kZSIsImMiLCJjb2xsYXBzZSIsImlzTGFuZHNjYXBlIiwic3Vic3RyIiwibnVtIiwic3BsaXQiLCJpbm5lcldpZHRoIiwibXEiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIm1haW5QYWdlV2lkdGgiLCJzZWNvbmRhcnlTaXplIiwiX2ZpcmVFdmVudCIsInNwbGl0VmlldyIsInRoYXQiLCJzaG91bGRDb2xsYXBzZSIsImN1cnJlbnRNb2RlIiwibiIsImlzRmluaXRlIiwiU3BsaXR0ZXJDb250ZW50IiwibG9hZCIsIl9wYWdlU2NvcGUiLCJTcGxpdHRlclNpZGUiLCJTcGxpdHRlciIsInByb3AiLCJ0YWdOYW1lIiwiU3dpdGNoVmlldyIsIl9jaGVja2JveCIsIl9wcmVwYXJlTmdNb2RlbCIsIm5nTW9kZWwiLCJhc3NpZ24iLCIkcGFyZW50IiwiY2hlY2tlZCIsIm5nQ2hhbmdlIiwiVGFiYmFyTm9uZUFuaW1hdG9yIiwiVGFiYmFyRmFkZUFuaW1hdG9yIiwiVGFiYmFyU2xpZGVBbmltYXRvciIsIlRhYmJhclZpZXciLCJfbGFzdFBhZ2VFbGVtZW50IiwiX2xhc3RQYWdlU2NvcGUiLCJUYWJiYXJFbGVtZW50IiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJ0cmFuc2NsdWRlIiwicHJlIiwicmVnaXN0ZXJFdmVudEhhbmRsZXJzIiwicG9zdCIsImZpcmVDb21wb25lbnRFdmVudCIsIkNvbXBvbmVudENsZWFuZXIiLCJjb250cm9sbGVyIiwiYmFja0J1dHRvbiIsImRlc3Ryb3lTY29wZSIsImRlc3Ryb3lBdHRyaWJ1dGVzIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJwYXJlbnRFbGVtZW50IiwiX3NldHVwIiwiX3NldHVwSW5pdGlhbEluZGV4IiwiX3NhdmVMYXN0U3RhdGUiLCJpc1JlYWR5IiwiJGJyb2FkY2FzdCIsImZhYiIsIkVWRU5UUyIsInNjb3BlRGVmIiwicmVkdWNlIiwiZGljdCIsInRpdGxpemUiLCJzdHIiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiXyIsImhhbmRsZXIiLCJnZXN0dXJlRGV0ZWN0b3IiLCJqb2luIiwiaWNvbiIsIl91cGRhdGUiLCJ1c2VyT3JpZW50YXRpb24iLCJvbnNJZk9yaWVudGF0aW9uIiwiZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCIsInBsYXRmb3JtIiwiZ2V0UGxhdGZvcm1TdHJpbmciLCJ1c2VyUGxhdGZvcm0iLCJ1c2VyUGxhdGZvcm1zIiwib25zSWZQbGF0Zm9ybSIsInVzZXJBZ2VudCIsIm1hdGNoIiwiaXNPcGVyYSIsIm9wZXJhIiwiaXNGaXJlZm94IiwiSW5zdGFsbFRyaWdnZXIiLCJpc1NhZmFyaSIsInRvU3RyaW5nIiwiY2FsbCIsImlzRWRnZSIsImlzQ2hyb21lIiwiY2hyb21lIiwiaXNJRSIsImRvY3VtZW50TW9kZSIsImVsIiwib25JbnB1dCIsIl9pc1RleHRJbnB1dCIsImNvbXBpbGVGdW5jdGlvbiIsImRpc3BTaG93IiwiZGlzcEhpZGUiLCJvblNob3ciLCJvbkhpZGUiLCJvbkluaXQiLCJlIiwidmlzaWJsZSIsInNvZnR3YXJlS2V5Ym9hcmQiLCJfdmlzaWJsZSIsInByaW9yaXR5IiwidGVybWluYWwiLCJsYXp5UmVwZWF0Iiwib25zTG9hZGluZ1BsYWNlaG9sZGVyIiwiX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJjb250ZW50RWxlbWVudCIsIm1vZGFsIiwiTmF2aWdhdG9yRWxlbWVudCIsInJld3JpdGFibGVzIiwicmVhZHkiLCJwYWdlTG9hZGVyIiwiY3JlYXRlUGFnZUxvYWRlciIsImZpcmVQYWdlSW5pdEV2ZW50IiwiZiIsImlzQXR0YWNoZWQiLCJmaXJlQWN0dWFsUGFnZUluaXRFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInBvc3RMaW5rIiwibWFpbiIsIm1lbnUiLCJtYWluSHRtbCIsIm1lbnVIdG1sIiwic3BlZWREaWFsIiwic2Vjb25kYXJ5SHRtbCIsInNwbGl0dGVyIiwiU3BsaXR0ZXJDb250ZW50RWxlbWVudCIsIlNwbGl0dGVyU2lkZUVsZW1lbnQiLCJuZ0NvbnRyb2xsZXIiLCJzd2l0Y2hWaWV3IiwidGFiIiwiJGluamVjdCIsImhpZGVUYWJzIiwic2V0VGFiYmFyVmlzaWJpbGl0eSIsInRhYmJhclZpZXciLCJjb250ZW50IiwidGVtcGxhdGUiLCJ0b29sYmFyQnV0dG9uIiwiZGVjb21wb3NlTm9kZSIsIiQkZWxlbWVudCIsIiQkb2JzZXJ2ZXJzIiwiZGVzdHJveUVsZW1lbnQiLCIkJGxpc3RlbmVycyIsIiQkd2F0Y2hlcnMiLCJjbGVhciIsIm5nRXZlbnREaXJlY3RpdmVzIiwiZGlyZWN0aXZlTmFtZSIsImRpcmVjdGl2ZU5vcm1hbGl6ZSIsIiRlbGVtZW50IiwibGlzdGVuZXIiLCIkYXBwbHkiLCJjb25maWciLCIkcHJvdmlkZSIsInNoaWZ0IiwiJGRlbGVnYXRlIiwiZGVjb3JhdG9yIiwiJHdpbmRvdyIsIiRjYWNoZUZhY3RvcnkiLCIkZG9jdW1lbnQiLCIkaHR0cCIsImNyZWF0ZU9uc2VuU2VydmljZSIsIk1vZGlmaWVyVXRpbCIsIkRJUkVDVElWRV9URU1QTEFURV9VUkwiLCJEZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsIl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJtZXRob2ROYW1lcyIsIm1ldGhvZE5hbWUiLCJrbGFzcyIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImV2ZW50TmFtZXMiLCJtYXAiLCJsaXN0ZW5lcnMiLCJldmVudE5hbWUiLCJwdXNoIiwiaXNFbmFibGVkQXV0b1N0YXR1c0JhckZpbGwiLCJfY29uZmlnIiwiYXV0b1N0YXR1c0JhckZpbGwiLCJzaG91bGRGaWxsU3RhdHVzQmFyIiwiY29tcGlsZUFuZExpbmsiLCJwYWdlRWxlbWVudCIsIlBhZ2VMb2FkZXIiLCJwYXJhbXMiLCJlbGVtZW50cyIsImZpbmRFbGVtZW50ZU9iamVjdCIsImRlZmVycmVkIiwiZGVmZXIiLCJub3JtYWxpemVQYWdlSFRNTCIsInByb21pc2UiLCJ1cmwiLCJtZXRob2QiLCJyZXNwb25zZSIsImdlbmVyYXRlTW9kaWZpZXJUZW1wbGF0ZXIiLCJtb2RpZmllcnMiLCJhdHRyTW9kaWZpZXJzIiwibW9kaWZpZXIiLCJtZXRob2RzIiwiaGFzTW9kaWZpZXIiLCJuZWVkbGUiLCJ0b2tlbnMiLCJzb21lIiwicmVtb3ZlTW9kaWZpZXIiLCJmaWx0ZXIiLCJ0b2tlbiIsImFkZE1vZGlmaWVyIiwic2V0TW9kaWZpZXIiLCJ0b2dnbGVNb2RpZmllciIsIl90ciIsImZucyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGFzc2VzIiwicGF0dCIsImNscyIsIm9sZEZuIiwibmV3Rm4iLCJvYmplY3QiLCJ2YXIiLCJ2YXJOYW1lIiwiX2RlZmluZVZhciIsIl9yZWdpc3RlckV2ZW50SGFuZGxlciIsImNvbXBvbmVudCIsImNhcGl0YWxpemVkRXZlbnROYW1lIiwibCIsImlzQW5kcm9pZCIsImlzSU9TIiwiaXNXZWJWaWV3IiwiaXNJT1M3YWJvdmUiLCJ1YSIsInJlc3VsdCIsImtleSIsIm5hbWVzIiwiY29udGFpbmVyIiwiaGFzQXR0cmlidXRlIiwib3JpZ2luYWxOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJtZXNzYWdlIiwiaW5qZWN0b3IiLCJqUXVlcnkiLCJ3YXJuIiwidGVtcGxhdGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0FBS0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSUEsU0FBUyxNQUFNQyxJQUFOLENBQVcsWUFBVTtBQUFDQztBQUFLLEdBQTNCLElBQStCLFlBQS9CLEdBQThDLElBQTNEOztBQUVBO0FBQ0EsV0FBU0MsU0FBVCxHQUFvQixDQUFFOztBQUV0QjtBQUNBQSxZQUFVQyxNQUFWLEdBQW1CLFVBQVNDLEtBQVQsRUFBZ0I7QUFDakMsUUFBSUMsU0FBUyxLQUFLQyxTQUFsQjs7QUFFQTtBQUNBO0FBQ0EsUUFBSUMsUUFBUUMsT0FBT0MsTUFBUCxDQUFjSixNQUFkLENBQVo7O0FBRUE7QUFDQSxTQUFLLElBQUlLLElBQVQsSUFBaUJOLEtBQWpCLEVBQXdCO0FBQ3RCO0FBQ0FHLFlBQU1HLElBQU4sSUFBYyxPQUFPTixNQUFNTSxJQUFOLENBQVAsS0FBdUIsVUFBdkIsSUFDWixPQUFPTCxPQUFPSyxJQUFQLENBQVAsSUFBdUIsVUFEWCxJQUN5QlgsT0FBT0MsSUFBUCxDQUFZSSxNQUFNTSxJQUFOLENBQVosQ0FEekIsR0FFVCxVQUFTQSxJQUFULEVBQWVDLEVBQWYsRUFBa0I7QUFDakIsZUFBTyxZQUFXO0FBQ2hCLGNBQUlDLE1BQU0sS0FBS1AsTUFBZjs7QUFFQTtBQUNBO0FBQ0EsZUFBS0EsTUFBTCxHQUFjQSxPQUFPSyxJQUFQLENBQWQ7O0FBRUE7QUFDQTtBQUNBLGNBQUlHLE1BQU1GLEdBQUdHLEtBQUgsQ0FBUyxJQUFULEVBQWVDLFNBQWYsQ0FBVjtBQUNBLGVBQUtWLE1BQUwsR0FBY08sR0FBZDs7QUFFQSxpQkFBT0MsR0FBUDtBQUNELFNBYkQ7QUFjRCxPQWZELENBZUdILElBZkgsRUFlU04sTUFBTU0sSUFBTixDQWZULENBRlUsR0FrQlZOLE1BQU1NLElBQU4sQ0FsQko7QUFtQkQ7O0FBRUQ7QUFDQSxRQUFJTSxXQUFXLE9BQU9ULE1BQU1VLElBQWIsS0FBc0IsVUFBdEIsR0FDWFYsTUFBTVcsY0FBTixDQUFxQixNQUFyQixJQUNFWCxNQUFNVSxJQURSLENBQ2E7QUFEYixNQUVFLFNBQVNFLFFBQVQsR0FBbUI7QUFBRWQsYUFBT1ksSUFBUCxDQUFZSCxLQUFaLENBQWtCLElBQWxCLEVBQXdCQyxTQUF4QjtBQUFxQyxLQUhqRCxHQUlYLFNBQVNLLFVBQVQsR0FBcUIsQ0FBRSxDQUozQjs7QUFNQTtBQUNBSixhQUFTVixTQUFULEdBQXFCQyxLQUFyQjs7QUFFQTtBQUNBQSxVQUFNYyxXQUFOLEdBQW9CTCxRQUFwQjs7QUFFQTtBQUNBQSxhQUFTYixNQUFULEdBQWtCRCxVQUFVQyxNQUE1Qjs7QUFFQSxXQUFPYSxRQUFQO0FBQ0QsR0FoREQ7O0FBa0RBO0FBQ0FNLFNBQU9DLEtBQVAsR0FBZXJCLFNBQWY7QUFDRCxDQTVERDs7O0FDTEE7QUFDQSxDQUFDLFVBQVNzQixHQUFULEVBQWM7QUFDZixRQUFJO0FBQUVBLGNBQU1DLFFBQVFDLE1BQVIsQ0FBZSxnQkFBZixDQUFOO0FBQXlDLEtBQS9DLENBQ0EsT0FBTUMsR0FBTixFQUFXO0FBQUVILGNBQU1DLFFBQVFDLE1BQVIsQ0FBZSxnQkFBZixFQUFpQyxFQUFqQyxDQUFOO0FBQTZDO0FBQzFERixRQUFJSSxHQUFKLENBQVEsQ0FBQyxnQkFBRCxFQUFtQixVQUFTQyxjQUFULEVBQXlCO0FBQ3BEOztBQUVBQSx1QkFBZUMsR0FBZixDQUFtQiw0QkFBbkIsRUFBZ0QscURBQzVDLGtEQUQ0QyxHQUU1QyxFQUZKOztBQUlBRCx1QkFBZUMsR0FBZixDQUFtQiwwQkFBbkIsRUFBOEMsb0VBQzFDLDREQUQwQyxHQUUxQyxFQUZKO0FBR0MsS0FWTyxDQUFSO0FBV0MsQ0FkRDs7O0FDREE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBOzs7Ozs7O0FBT0EsQ0FBQyxVQUFTQyxHQUFULEVBQWE7QUFDWjs7QUFFQSxNQUFJTCxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QixDQUFDLGdCQUFELENBQXhCLENBQWI7QUFDQUQsVUFBUUMsTUFBUixDQUFlLGtCQUFmLEVBQW1DLENBQUMsT0FBRCxDQUFuQyxFQUpZLENBSW1DOztBQUUvQztBQUNBTTtBQUNBQztBQUNBQztBQUNBQzs7QUFFQSxXQUFTRixlQUFULEdBQTJCO0FBQ3pCLFFBQUlHLGdCQUFnQkwsSUFBSU0sVUFBSixDQUFlQyxJQUFmLEVBQXBCO0FBQ0FaLFdBQU9FLEdBQVAsQ0FBVyxDQUFDLFVBQUQsRUFBYSxZQUFiLEVBQTJCLFVBQVNXLFFBQVQsRUFBbUJDLFVBQW5CLEVBQStCO0FBQ25FO0FBQ0EsVUFBSUMsU0FBU0MsVUFBVCxLQUF3QixTQUF4QixJQUFxQ0QsU0FBU0MsVUFBVCxJQUF1QixlQUFoRSxFQUFpRjtBQUMvRXBCLGVBQU9xQixnQkFBUCxDQUF3QixrQkFBeEIsRUFBNEMsWUFBVztBQUNyREYsbUJBQVNHLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkosU0FBU0ssYUFBVCxDQUF1QixvQkFBdkIsQ0FBMUI7QUFDRCxTQUZEO0FBR0QsT0FKRCxNQUlPLElBQUlMLFNBQVNHLElBQWIsRUFBbUI7QUFDeEJILGlCQUFTRyxJQUFULENBQWNDLFdBQWQsQ0FBMEJKLFNBQVNLLGFBQVQsQ0FBdUIsb0JBQXZCLENBQTFCO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsY0FBTSxJQUFJQyxLQUFKLENBQVUsK0JBQVYsQ0FBTjtBQUNEOztBQUVEUCxpQkFBV1EsR0FBWCxDQUFlLFlBQWYsRUFBNkJaLGFBQTdCO0FBQ0QsS0FiVSxDQUFYO0FBY0Q7O0FBRUQsV0FBU0YsaUJBQVQsR0FBNkI7QUFDM0JSLFdBQU91QixLQUFQLENBQWEsWUFBYixFQUEyQmxCLEdBQTNCO0FBQ0FMLFdBQU9FLEdBQVAsQ0FBVyxDQUFDLFVBQUQsRUFBYSxZQUFiLEVBQTJCLFFBQTNCLEVBQXFDLElBQXJDLEVBQTJDLFVBQVNXLFFBQVQsRUFBbUJDLFVBQW5CLEVBQStCVSxNQUEvQixFQUF1Q0MsRUFBdkMsRUFBMkM7QUFDL0ZwQixVQUFJcUIsYUFBSixHQUFvQkYsTUFBcEI7QUFDQW5CLFVBQUlzQixTQUFKLEdBQWdCRixFQUFoQjs7QUFFQVgsaUJBQVdULEdBQVgsR0FBaUJULE9BQU9TLEdBQXhCO0FBQ0FTLGlCQUFXYyxPQUFYLEdBQXFCaEMsT0FBT2dDLE9BQTVCO0FBQ0FkLGlCQUFXZSxLQUFYLEdBQW1CakMsT0FBT2lDLEtBQTFCOztBQUVBeEIsVUFBSVEsUUFBSixHQUFlQSxRQUFmO0FBQ0QsS0FUVSxDQUFYO0FBVUQ7O0FBRUQsV0FBU0osaUJBQVQsR0FBNkI7QUFDM0JULFdBQU9FLEdBQVAsQ0FBVyxDQUFDLGdCQUFELEVBQW1CLFVBQVNDLGNBQVQsRUFBeUI7QUFDckQsVUFBTWpCLE1BQU1tQixJQUFJeUIsU0FBSixDQUFjQyxvQkFBMUI7O0FBRUExQixVQUFJeUIsU0FBSixDQUFjQyxvQkFBZCxHQUFxQyxVQUFDQyxJQUFELEVBQVU7QUFDN0MsWUFBTUMsUUFBUTlCLGVBQWUrQixHQUFmLENBQW1CRixJQUFuQixDQUFkOztBQUVBLFlBQUlDLEtBQUosRUFBVztBQUNULGlCQUFPRSxRQUFRQyxPQUFSLENBQWdCSCxLQUFoQixDQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8vQyxJQUFJOEMsSUFBSixDQUFQO0FBQ0Q7QUFDRixPQVJEO0FBU0QsS0FaVSxDQUFYO0FBYUQ7O0FBRUQsV0FBUzFCLGVBQVQsR0FBMkI7QUFDekJELFFBQUlxQixhQUFKLEdBQW9CLElBQXBCOztBQUVBO0FBQ0E7QUFDQXJCLFFBQUlnQyxhQUFKLEdBQW9CekMsTUFBcEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkFTLFFBQUlpQyxTQUFKLEdBQWdCLFVBQVN0RCxJQUFULEVBQWV1RCxJQUFmLEVBQXFCO0FBQ25DLFVBQUl4QyxRQUFReUMsT0FBUixDQUFnQnhELElBQWhCLENBQUosRUFBMkI7QUFDekJ1RCxlQUFPdkQsSUFBUDtBQUNBQSxlQUFPeUQsU0FBUDtBQUNEOztBQUVELFVBQUksQ0FBQ3pELElBQUwsRUFBVztBQUNUQSxlQUFPLFlBQVA7QUFDRDs7QUFFRHVELGFBQU8sQ0FBQyxPQUFELEVBQVVHLE1BQVYsQ0FBaUIzQyxRQUFReUMsT0FBUixDQUFnQkQsSUFBaEIsSUFBd0JBLElBQXhCLEdBQStCLEVBQWhELENBQVA7QUFDQSxVQUFJdkMsU0FBU0QsUUFBUUMsTUFBUixDQUFlaEIsSUFBZixFQUFxQnVELElBQXJCLENBQWI7O0FBRUEsVUFBSUksTUFBTS9DLE9BQU9tQixRQUFqQjtBQUNBLFVBQUk0QixJQUFJM0IsVUFBSixJQUFrQixTQUFsQixJQUErQjJCLElBQUkzQixVQUFKLElBQWtCLGVBQWpELElBQW9FMkIsSUFBSTNCLFVBQUosSUFBa0IsYUFBMUYsRUFBeUc7QUFDdkcyQixZQUFJMUIsZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDLFlBQVc7QUFDbERsQixrQkFBUXVDLFNBQVIsQ0FBa0JLLElBQUlDLGVBQXRCLEVBQXVDLENBQUM1RCxJQUFELENBQXZDO0FBQ0QsU0FGRCxFQUVHLEtBRkg7QUFHRCxPQUpELE1BSU8sSUFBSTJELElBQUlDLGVBQVIsRUFBeUI7QUFDOUI3QyxnQkFBUXVDLFNBQVIsQ0FBa0JLLElBQUlDLGVBQXRCLEVBQXVDLENBQUM1RCxJQUFELENBQXZDO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsY0FBTSxJQUFJcUMsS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNEOztBQUVELGFBQU9yQixNQUFQO0FBQ0QsS0F6QkQ7O0FBMkJBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBSyxRQUFJd0Msd0JBQUosR0FBK0IsVUFBUzdELElBQVQsRUFBZThELEdBQWYsRUFBb0I7QUFDakQsVUFBSUMsT0FBSjtBQUNBLFVBQUlELGVBQWVFLFdBQW5CLEVBQWdDO0FBQzlCRCxrQkFBVWhELFFBQVFnRCxPQUFSLENBQWdCRCxHQUFoQixDQUFWO0FBQ0QsT0FGRCxNQUVPLElBQUlBLGVBQWUvQyxRQUFRZ0QsT0FBM0IsRUFBb0M7QUFDekNBLGtCQUFVRCxHQUFWO0FBQ0QsT0FGTSxNQUVBLElBQUlBLElBQUlHLE1BQVIsRUFBZ0I7QUFDckJGLGtCQUFVaEQsUUFBUWdELE9BQVIsQ0FBZ0JELElBQUlHLE1BQXBCLENBQVY7QUFDRDs7QUFFRCxhQUFPRixRQUFRRyxhQUFSLENBQXNCbEUsSUFBdEIsQ0FBUDtBQUNELEtBWEQ7O0FBYUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkFxQixRQUFJOEMsYUFBSixHQUFvQixVQUFTQyxRQUFULEVBQW1CTixHQUFuQixFQUF3QjtBQUMxQyxVQUFJRyxTQUFTLENBQUNILE1BQU1BLEdBQU4sR0FBWS9CLFFBQWIsRUFBdUJzQyxhQUF2QixDQUFxQ0QsUUFBckMsQ0FBYjtBQUNBLGFBQU9ILFNBQVNsRCxRQUFRZ0QsT0FBUixDQUFnQkUsTUFBaEIsRUFBd0JLLElBQXhCLENBQTZCTCxPQUFPTSxRQUFQLENBQWdCQyxXQUFoQixFQUE3QixLQUErRCxJQUF4RSxHQUErRSxJQUF0RjtBQUNELEtBSEQ7O0FBS0E7Ozs7Ozs7Ozs7QUFVQW5ELFFBQUlvRCxPQUFKLEdBQWMsVUFBU1gsR0FBVCxFQUFjO0FBQzFCLFVBQUksQ0FBQ3pDLElBQUlRLFFBQVQsRUFBbUI7QUFDakIsY0FBTSxJQUFJUSxLQUFKLENBQVUsd0VBQVYsQ0FBTjtBQUNEOztBQUVELFVBQUksRUFBRXlCLGVBQWVFLFdBQWpCLENBQUosRUFBbUM7QUFDakMsY0FBTSxJQUFJM0IsS0FBSixDQUFVLG9EQUFWLENBQU47QUFDRDs7QUFFRCxVQUFJcUMsUUFBUTNELFFBQVFnRCxPQUFSLENBQWdCRCxHQUFoQixFQUFxQlksS0FBckIsRUFBWjtBQUNBLFVBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1YsY0FBTSxJQUFJckMsS0FBSixDQUFVLGlGQUFWLENBQU47QUFDRDs7QUFFRGhCLFVBQUlRLFFBQUosQ0FBYWlDLEdBQWIsRUFBa0JZLEtBQWxCO0FBQ0QsS0FmRDs7QUFpQkFyRCxRQUFJc0QsZ0JBQUosR0FBdUIsWUFBVztBQUNoQyxVQUFJLENBQUMsS0FBS2pDLGFBQVYsRUFBeUI7QUFDdkIsY0FBTSxJQUFJTCxLQUFKLENBQVUsNkNBQVYsQ0FBTjtBQUNEOztBQUVELGFBQU8sS0FBS0ssYUFBWjtBQUNELEtBTkQ7O0FBUUE7Ozs7O0FBS0FyQixRQUFJdUQsaUJBQUosR0FBd0IsVUFBU0MsV0FBVCxFQUFzQkMsU0FBdEIsRUFBaUM7QUFDdkQsYUFBTyxVQUFTZixPQUFULEVBQWtCZ0IsUUFBbEIsRUFBNEI7QUFDakMsWUFBSWhFLFFBQVFnRCxPQUFSLENBQWdCQSxPQUFoQixFQUF5Qk8sSUFBekIsQ0FBOEJPLFdBQTlCLENBQUosRUFBZ0Q7QUFDOUNDLG9CQUFVZixPQUFWLEVBQW1CZ0IsUUFBbkI7QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJQyxTQUFTLFNBQVRBLE1BQVMsR0FBVztBQUN0QkYsc0JBQVVmLE9BQVYsRUFBbUJnQixRQUFuQjtBQUNBaEIsb0JBQVFrQixtQkFBUixDQUE0QkosY0FBYyxPQUExQyxFQUFtREcsTUFBbkQsRUFBMkQsS0FBM0Q7QUFDRCxXQUhEO0FBSUFqQixrQkFBUTlCLGdCQUFSLENBQXlCNEMsY0FBYyxPQUF2QyxFQUFnREcsTUFBaEQsRUFBd0QsS0FBeEQ7QUFDRDtBQUNGLE9BVkQ7QUFXRCxLQVpEOztBQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBM0QsUUFBSTZELGlCQUFKLEdBQXdCLFVBQVNsQyxJQUFULEVBQWVtQyxPQUFmLEVBQXdCO0FBQzlDQSxnQkFBVUEsV0FBVyxFQUFyQjs7QUFFQUEsY0FBUUMsSUFBUixHQUFlLFVBQVNyQixPQUFULEVBQWtCO0FBQy9CLFlBQUlvQixRQUFRRSxXQUFaLEVBQXlCO0FBQ3ZCaEUsY0FBSVEsUUFBSixDQUFhZCxRQUFRZ0QsT0FBUixDQUFnQkEsT0FBaEIsQ0FBYixFQUF1Q29CLFFBQVFFLFdBQVIsQ0FBb0JDLElBQXBCLEVBQXZDO0FBQ0FILGtCQUFRRSxXQUFSLENBQW9CRSxVQUFwQjtBQUNELFNBSEQsTUFHTztBQUNMbEUsY0FBSW9ELE9BQUosQ0FBWVYsT0FBWjtBQUNEO0FBQ0YsT0FQRDs7QUFTQSxhQUFPMUMsSUFBSW1FLDBCQUFKLENBQStCeEMsSUFBL0IsRUFBcUNtQyxPQUFyQyxFQUE4Q00sSUFBOUMsQ0FBbUQsVUFBU0MsV0FBVCxFQUFzQjtBQUM5RSxlQUFPM0UsUUFBUWdELE9BQVIsQ0FBZ0IyQixXQUFoQixFQUE2QnBCLElBQTdCLENBQWtDLGtCQUFsQyxDQUFQO0FBQ0QsT0FGTSxDQUFQO0FBR0QsS0FmRDs7QUFpQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkFqRCxRQUFJc0UsWUFBSixHQUFtQixVQUFTM0MsSUFBVCxFQUFlbUMsT0FBZixFQUF3QjtBQUN6Q0EsZ0JBQVVBLFdBQVcsRUFBckI7O0FBRUFBLGNBQVFDLElBQVIsR0FBZSxVQUFTckIsT0FBVCxFQUFrQjtBQUMvQixZQUFJb0IsUUFBUUUsV0FBWixFQUF5QjtBQUN2QmhFLGNBQUlRLFFBQUosQ0FBYWQsUUFBUWdELE9BQVIsQ0FBZ0JBLE9BQWhCLENBQWIsRUFBdUNvQixRQUFRRSxXQUFSLENBQW9CQyxJQUFwQixFQUF2QztBQUNBSCxrQkFBUUUsV0FBUixDQUFvQkUsVUFBcEI7QUFDRCxTQUhELE1BR087QUFDTGxFLGNBQUlvRCxPQUFKLENBQVlWLE9BQVo7QUFDRDtBQUNGLE9BUEQ7O0FBU0EsYUFBTzFDLElBQUl1RSxxQkFBSixDQUEwQjVDLElBQTFCLEVBQWdDbUMsT0FBaEMsRUFBeUNNLElBQXpDLENBQThDLFVBQVNJLE1BQVQsRUFBaUI7QUFDcEUsZUFBTzlFLFFBQVFnRCxPQUFSLENBQWdCOEIsTUFBaEIsRUFBd0J2QixJQUF4QixDQUE2QixZQUE3QixDQUFQO0FBQ0QsT0FGTSxDQUFQO0FBR0QsS0FmRDs7QUFpQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkFqRCxRQUFJeUUsYUFBSixHQUFvQixVQUFTOUMsSUFBVCxFQUFlbUMsT0FBZixFQUF3QjtBQUMxQ0EsZ0JBQVVBLFdBQVcsRUFBckI7O0FBRUFBLGNBQVFDLElBQVIsR0FBZSxVQUFTckIsT0FBVCxFQUFrQjtBQUMvQixZQUFJb0IsUUFBUUUsV0FBWixFQUF5QjtBQUN2QmhFLGNBQUlRLFFBQUosQ0FBYWQsUUFBUWdELE9BQVIsQ0FBZ0JBLE9BQWhCLENBQWIsRUFBdUNvQixRQUFRRSxXQUFSLENBQW9CQyxJQUFwQixFQUF2QztBQUNBSCxrQkFBUUUsV0FBUixDQUFvQkUsVUFBcEI7QUFDRCxTQUhELE1BR087QUFDTGxFLGNBQUlvRCxPQUFKLENBQVlWLE9BQVo7QUFDRDtBQUNGLE9BUEQ7O0FBU0EsYUFBTzFDLElBQUkwRSxzQkFBSixDQUEyQi9DLElBQTNCLEVBQWlDbUMsT0FBakMsRUFBMENNLElBQTFDLENBQStDLFVBQVNPLE9BQVQsRUFBa0I7QUFDdEUsZUFBT2pGLFFBQVFnRCxPQUFSLENBQWdCaUMsT0FBaEIsRUFBeUIxQixJQUF6QixDQUE4QixhQUE5QixDQUFQO0FBQ0QsT0FGTSxDQUFQO0FBR0QsS0FmRDs7QUFpQkE7OztBQUdBakQsUUFBSTRFLHlCQUFKLEdBQWdDLFVBQVNqRCxJQUFULEVBQWU7QUFDN0MsYUFBTzNCLElBQUk2RSxrQ0FBSixDQUF1Q2xELElBQXZDLEVBQTZDLFVBQVNlLE9BQVQsRUFBa0JvQyxJQUFsQixFQUF3QjtBQUMxRTlFLFlBQUlvRCxPQUFKLENBQVlWLE9BQVo7QUFDQWhELGdCQUFRZ0QsT0FBUixDQUFnQkEsT0FBaEIsRUFBeUJXLEtBQXpCLEdBQWlDYSxVQUFqQyxDQUE0QyxZQUFXO0FBQ3JEYSx1QkFBYUQsSUFBYjtBQUNELFNBRkQ7QUFHRCxPQUxNLENBQVA7QUFNRCxLQVBEOztBQVNBOUUsUUFBSWdGLHlCQUFKLEdBQWdDLFlBQVc7QUFDekM7QUFDRCxLQUZEO0FBR0Q7QUFFRixDQW5WRCxFQW1WR3pGLE9BQU9TLEdBQVAsR0FBYVQsT0FBT1MsR0FBUCxJQUFjLEVBblY5Qjs7O0FDeEJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJTCxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLGlCQUFmLEVBQWtDLENBQUMsUUFBRCxFQUFXLFVBQVM5RCxNQUFULEVBQWlCOztBQUU1RCxRQUFJK0Qsa0JBQWtCMUYsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFakM7Ozs7O0FBS0FjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsYUFBS0MsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtnQyxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLNEMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtJLHFCQUFMLEdBQTZCcEUsT0FBT3FFLGFBQVAsQ0FBcUIsSUFBckIsRUFBMkIsS0FBS0gsUUFBTCxDQUFjLENBQWQsQ0FBM0IsRUFBNkMsQ0FDeEUsTUFEd0UsRUFDaEUsTUFEZ0UsQ0FBN0MsQ0FBN0I7O0FBSUEsYUFBS0ksb0JBQUwsR0FBNEJ0RSxPQUFPdUUsWUFBUCxDQUFvQixJQUFwQixFQUEwQixLQUFLTCxRQUFMLENBQWMsQ0FBZCxDQUExQixFQUE0QyxDQUN0RSxTQURzRSxFQUV0RSxVQUZzRSxFQUd0RSxTQUhzRSxFQUl0RSxVQUpzRSxFQUt0RSxRQUxzRSxDQUE1QyxFQU16QixVQUFTTSxNQUFULEVBQWlCO0FBQ2xCLGNBQUlBLE9BQU90QixXQUFYLEVBQXdCO0FBQ3RCc0IsbUJBQU90QixXQUFQLEdBQXFCLElBQXJCO0FBQ0Q7QUFDRCxpQkFBT3NCLE1BQVA7QUFDRCxTQUxFLENBS0RDLElBTEMsQ0FLSSxJQUxKLENBTnlCLENBQTVCOztBQWFBLGFBQUtSLE1BQUwsQ0FBWW5FLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsS0FBSzRFLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixJQUFuQixDQUE1QjtBQUNELE9BOUJnQzs7QUFnQ2pDQyxnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjs7QUFFQSxhQUFLVCxRQUFMLENBQWNVLE1BQWQ7O0FBRUEsYUFBS1IscUJBQUw7QUFDQSxhQUFLRSxvQkFBTDs7QUFFQSxhQUFLTCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLEtBQUtELFFBQUwsR0FBZ0IsSUFBNUM7QUFDRDs7QUF6Q2dDLEtBQWIsQ0FBdEI7O0FBNkNBVyxlQUFXQyxLQUFYLENBQWlCZixlQUFqQjtBQUNBL0QsV0FBTytFLDJCQUFQLENBQW1DaEIsZUFBbkMsRUFBb0QsQ0FBQyxVQUFELEVBQWEsWUFBYixFQUEyQixTQUEzQixFQUFzQyxvQkFBdEMsQ0FBcEQ7O0FBRUEsV0FBT0EsZUFBUDtBQUNELEdBbkRpQyxDQUFsQztBQW9ERCxDQXpERDs7O0FDaEJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQXhGLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQ0d1QixLQURILENBQ1MscUJBRFQsRUFDZ0NsQixJQUFJeUIsU0FBSixDQUFjMEUsbUJBRDlDLEVBRUdqRixLQUZILENBRVMsNEJBRlQsRUFFdUNsQixJQUFJeUIsU0FBSixDQUFjMkUsMEJBRnJELEVBR0dsRixLQUhILENBR1Msd0JBSFQsRUFHbUNsQixJQUFJeUIsU0FBSixDQUFjNEUsc0JBSGpEOzs7QUNsQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBM0csUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0J1QixLQUF4QixDQUE4QixrQkFBOUIsRUFBa0RsQixJQUFJeUIsU0FBSixDQUFjNkUsZUFBaEU7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSTNHLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsY0FBZixFQUErQixDQUFDLFFBQUQsRUFBVyxVQUFTOUQsTUFBVCxFQUFpQjs7QUFFekQ7OztBQUdBLFFBQUlvRixlQUFlL0csTUFBTXBCLE1BQU4sQ0FBYTs7QUFFOUI7Ozs7O0FBS0FjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtDLE1BQUwsQ0FBWW5FLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsS0FBSzRFLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixJQUFuQixDQUE1Qjs7QUFFQSxhQUFLTCxxQkFBTCxHQUE2QnBFLE9BQU9xRSxhQUFQLENBQXFCLElBQXJCLEVBQTJCOUMsUUFBUSxDQUFSLENBQTNCLEVBQXVDLENBQ2xFLGdCQURrRSxFQUNoRCxnQkFEZ0QsRUFDOUIsTUFEOEIsRUFDdEIsTUFEc0IsRUFDZCxTQURjLEVBQ0gsT0FERyxFQUNNLE1BRE4sQ0FBdkMsQ0FBN0I7O0FBSUEsYUFBSytDLG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEJoRCxRQUFRLENBQVIsQ0FBMUIsRUFBc0MsQ0FBQyxTQUFELEVBQVksWUFBWixFQUEwQixZQUExQixDQUF0QyxFQUErRSxVQUFTaUQsTUFBVCxFQUFpQjtBQUMxSCxjQUFJQSxPQUFPYSxRQUFYLEVBQXFCO0FBQ25CYixtQkFBT2EsUUFBUCxHQUFrQixJQUFsQjtBQUNEO0FBQ0QsaUJBQU9iLE1BQVA7QUFDRCxTQUwwRyxDQUt6R0MsSUFMeUcsQ0FLcEcsSUFMb0csQ0FBL0UsQ0FBNUI7QUFNRCxPQXhCNkI7O0FBMEI5QkMsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7O0FBRUEsYUFBS0wsb0JBQUw7QUFDQSxhQUFLRixxQkFBTDs7QUFFQSxhQUFLRixRQUFMLEdBQWdCLEtBQUtELE1BQUwsR0FBYyxLQUFLRSxNQUFMLEdBQWMsSUFBNUM7QUFDRDtBQWpDNkIsS0FBYixDQUFuQjs7QUFvQ0FVLGVBQVdDLEtBQVgsQ0FBaUJNLFlBQWpCOztBQUVBcEYsV0FBTytFLDJCQUFQLENBQW1DSyxZQUFuQyxFQUFpRCxDQUMvQyxVQUQrQyxFQUNuQyxnQkFEbUMsRUFDakIsVUFEaUIsRUFDTCxZQURLLEVBQ1MsV0FEVCxFQUNzQixpQkFEdEIsRUFDeUMsV0FEekMsQ0FBakQ7O0FBSUEsV0FBT0EsWUFBUDtBQUNELEdBaEQ4QixDQUEvQjtBQWlERCxDQXRERDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJNUcsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBT3NGLE9BQVAsQ0FBZSxZQUFmLEVBQTZCLENBQUMsUUFBRCxFQUFXLFVBQVM5RCxNQUFULEVBQWlCOztBQUV2RCxRQUFJc0YsYUFBYWpILE1BQU1wQixNQUFOLENBQWE7O0FBRTVCYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLZ0MsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzRDLE1BQUwsR0FBY0gsS0FBZDs7QUFFQSxhQUFLSSxxQkFBTCxHQUE2QnBFLE9BQU9xRSxhQUFQLENBQXFCLElBQXJCLEVBQTJCLEtBQUtILFFBQUwsQ0FBYyxDQUFkLENBQTNCLEVBQTZDLENBQ3hFLE1BRHdFLEVBQ2hFLE1BRGdFLENBQTdDLENBQTdCOztBQUlBLGFBQUtJLG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEIsS0FBS0wsUUFBTCxDQUFjLENBQWQsQ0FBMUIsRUFBNEMsQ0FDdEUsU0FEc0UsRUFFdEUsVUFGc0UsRUFHdEUsU0FIc0UsRUFJdEUsVUFKc0UsRUFLdEUsUUFMc0UsQ0FBNUMsRUFNekIsVUFBU00sTUFBVCxFQUFpQjtBQUNsQixjQUFJQSxPQUFPbkIsTUFBWCxFQUFtQjtBQUNqQm1CLG1CQUFPbkIsTUFBUCxHQUFnQixJQUFoQjtBQUNEO0FBQ0QsaUJBQU9tQixNQUFQO0FBQ0QsU0FMRSxDQUtEQyxJQUxDLENBS0ksSUFMSixDQU55QixDQUE1Qjs7QUFhQSxhQUFLUixNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7QUFDRCxPQXpCMkI7O0FBMkI1QkMsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7O0FBRUEsYUFBS1QsUUFBTCxDQUFjVSxNQUFkO0FBQ0EsYUFBS1IscUJBQUw7QUFDQSxhQUFLRSxvQkFBTDs7QUFFQSxhQUFLTCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLEtBQUtELFFBQUwsR0FBZ0IsSUFBNUM7QUFDRDtBQW5DMkIsS0FBYixDQUFqQjs7QUFzQ0FvQixlQUFXQyxnQkFBWCxHQUE4QixVQUFTL0gsSUFBVCxFQUFlZ0ksUUFBZixFQUF5QjtBQUNyRCxhQUFPcEgsT0FBT1MsR0FBUCxDQUFXNEcsYUFBWCxDQUF5QkYsZ0JBQXpCLENBQTBDL0gsSUFBMUMsRUFBZ0RnSSxRQUFoRCxDQUFQO0FBQ0QsS0FGRDs7QUFJQVgsZUFBV0MsS0FBWCxDQUFpQlEsVUFBakI7QUFDQXRGLFdBQU8rRSwyQkFBUCxDQUFtQ08sVUFBbkMsRUFBK0MsQ0FBQyxVQUFELEVBQWEsWUFBYixFQUEyQixTQUEzQixFQUFzQyxvQkFBdEMsQ0FBL0M7O0FBRUEsV0FBT0EsVUFBUDtBQUNELEdBaEQ0QixDQUE3QjtBQWlERCxDQXRERDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQS9HLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQ0d1QixLQURILENBQ1MsZ0JBRFQsRUFDMkJsQixJQUFJeUIsU0FBSixDQUFjb0YsY0FEekMsRUFFRzNGLEtBRkgsQ0FFUyxtQkFGVCxFQUU4QmxCLElBQUl5QixTQUFKLENBQWNxRixpQkFGNUMsRUFHRzVGLEtBSEgsQ0FHUyx1QkFIVCxFQUdrQ2xCLElBQUl5QixTQUFKLENBQWNzRixxQkFIaEQsRUFJRzdGLEtBSkgsQ0FJUyxxQkFKVCxFQUlnQ2xCLElBQUl5QixTQUFKLENBQWN1RixtQkFKOUM7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSXJILFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsU0FBZixFQUEwQixDQUFDLFFBQUQsRUFBVyxVQUFTOUQsTUFBVCxFQUFpQjs7QUFFcEQ7OztBQUdBLFFBQUk4RixVQUFVekgsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFekI7Ozs7O0FBS0FjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtDLE1BQUwsQ0FBWW5FLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsS0FBSzRFLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixJQUFuQixDQUE1Qjs7QUFFQSxhQUFLTCxxQkFBTCxHQUE2QnBFLE9BQU9xRSxhQUFQLENBQXFCLElBQXJCLEVBQTJCOUMsUUFBUSxDQUFSLENBQTNCLEVBQXVDLENBQ2xFLE1BRGtFLEVBQzFELE1BRDBELEVBQ2xELFFBRGtELENBQXZDLENBQTdCO0FBR0QsT0FqQndCOztBQW1CekJtRCxnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjtBQUNBLGFBQUtQLHFCQUFMOztBQUVBLGFBQUtGLFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxJQUE1QztBQUNEO0FBeEJ3QixLQUFiLENBQWQ7O0FBMkJBbkUsV0FBTytFLDJCQUFQLENBQW1DZSxPQUFuQyxFQUE0QyxDQUMxQyxVQUQwQyxFQUM5QixTQUQ4QixDQUE1Qzs7QUFJQWpCLGVBQVdDLEtBQVgsQ0FBaUJnQixPQUFqQjs7QUFFQSxXQUFPQSxPQUFQO0FBQ0QsR0F2Q3lCLENBQTFCO0FBd0NELENBN0NEOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVTtBQUNUOztBQUVBdkgsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JzRixPQUF4QixDQUFnQyxhQUFoQyxFQUErQyxDQUFDLFFBQUQsRUFBVyxVQUFTOUQsTUFBVCxFQUFpQjs7QUFFekUsUUFBSStGLGNBQWMxSCxNQUFNcEIsTUFBTixDQUFhOztBQUU3Qjs7Ozs7Ozs7O0FBU0FjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0NyQixPQUFoQyxFQUF5QztBQUM3QyxZQUFJcUQsT0FBTyxJQUFYO0FBQ0FyRCxrQkFBVSxFQUFWOztBQUVBLGFBQUt1QixRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLMEMsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtpQyxNQUFMLEdBQWNILEtBQWQ7O0FBRUEsWUFBSXJCLFFBQVFzRCxhQUFaLEVBQTJCO0FBQ3pCLGNBQUksQ0FBQ3RELFFBQVF1RCxnQkFBYixFQUErQjtBQUM3QixrQkFBTSxJQUFJckcsS0FBSixDQUFVLHdDQUFWLENBQU47QUFDRDtBQUNERyxpQkFBT21HLGtCQUFQLENBQTBCLElBQTFCLEVBQWdDeEQsUUFBUXVELGdCQUF4QyxFQUEwRDNFLE9BQTFEO0FBQ0QsU0FMRCxNQUtPO0FBQ0x2QixpQkFBT29HLG1DQUFQLENBQTJDLElBQTNDLEVBQWlEN0UsT0FBakQ7QUFDRDs7QUFFRHZCLGVBQU9xRyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJwRSxLQUF6QixFQUFnQyxZQUFXO0FBQ3pDOEQsZUFBS08sT0FBTCxHQUFldEYsU0FBZjtBQUNBakIsaUJBQU93RyxxQkFBUCxDQUE2QlIsSUFBN0I7O0FBRUEsY0FBSXJELFFBQVEyRCxTQUFaLEVBQXVCO0FBQ3JCM0Qsb0JBQVEyRCxTQUFSLENBQWtCTixJQUFsQjtBQUNEOztBQUVEaEcsaUJBQU95RyxjQUFQLENBQXNCO0FBQ3BCdkUsbUJBQU9BLEtBRGE7QUFFcEI4QixtQkFBT0EsS0FGYTtBQUdwQnpDLHFCQUFTQTtBQUhXLFdBQXRCOztBQU1BeUUsaUJBQU96RSxVQUFVeUUsS0FBSzlCLFFBQUwsR0FBZ0I4QixLQUFLL0IsTUFBTCxHQUFjL0IsUUFBUThELEtBQUs3QixNQUFMLEdBQWNILFFBQVFyQixVQUFVLElBQXZGO0FBQ0QsU0FmRDtBQWdCRDtBQTVDNEIsS0FBYixDQUFsQjs7QUErQ0E7Ozs7Ozs7Ozs7QUFVQW9ELGdCQUFZVyxRQUFaLEdBQXVCLFVBQVN4RSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDckIsT0FBaEMsRUFBeUM7QUFDOUQsVUFBSWdFLE9BQU8sSUFBSVosV0FBSixDQUFnQjdELEtBQWhCLEVBQXVCWCxPQUF2QixFQUFnQ3lDLEtBQWhDLEVBQXVDckIsT0FBdkMsQ0FBWDs7QUFFQSxVQUFJLENBQUNBLFFBQVFpRSxPQUFiLEVBQXNCO0FBQ3BCLGNBQU0sSUFBSS9HLEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBQ0Q7O0FBRURHLGFBQU82RyxtQkFBUCxDQUEyQjdDLEtBQTNCLEVBQWtDMkMsSUFBbEM7QUFDQXBGLGNBQVFPLElBQVIsQ0FBYWEsUUFBUWlFLE9BQXJCLEVBQThCRCxJQUE5Qjs7QUFFQSxVQUFJRyxVQUFVbkUsUUFBUTJELFNBQVIsSUFBcUIvSCxRQUFRd0ksSUFBM0M7QUFDQXBFLGNBQVEyRCxTQUFSLEdBQW9CLFVBQVNLLElBQVQsRUFBZTtBQUNqQ0csZ0JBQVFILElBQVI7QUFDQXBGLGdCQUFRTyxJQUFSLENBQWFhLFFBQVFpRSxPQUFyQixFQUE4QixJQUE5QjtBQUNELE9BSEQ7O0FBS0EsYUFBT0QsSUFBUDtBQUNELEtBakJEOztBQW1CQTlCLGVBQVdDLEtBQVgsQ0FBaUJpQixXQUFqQjs7QUFFQSxXQUFPQSxXQUFQO0FBQ0QsR0FqRjhDLENBQS9DO0FBa0ZELENBckZEOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVTtBQUNUOztBQUNBLE1BQUl2SCxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLGdCQUFmLEVBQWlDLENBQUMsMkJBQUQsRUFBOEIsVUFBU2tELHlCQUFULEVBQW9DOztBQUVqRyxRQUFJQyxpQkFBaUI1SSxNQUFNcEIsTUFBTixDQUFhOztBQUVoQzs7Ozs7QUFLQWMsWUFBTSxjQUFTbUUsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQ2tELE1BQWhDLEVBQXdDO0FBQUE7O0FBQzVDLGFBQUtoRCxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLMEMsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtpQyxNQUFMLEdBQWNILEtBQWQ7QUFDQSxhQUFLbUQsT0FBTCxHQUFlRCxNQUFmOztBQUVBckksWUFBSXVJLEtBQUosQ0FBVUMsb0JBQVYsQ0FBK0I5RixRQUFRLENBQVIsQ0FBL0I7O0FBRUEsWUFBSStGLGVBQWUsS0FBS3JELE1BQUwsQ0FBWXNELEtBQVosQ0FBa0IsS0FBS3BELE1BQUwsQ0FBWXFELGFBQTlCLENBQW5COztBQUdBLFlBQUlDLG1CQUFtQixJQUFJVCx5QkFBSixDQUE4Qk0sWUFBOUIsRUFBNEMvRixRQUFRLENBQVIsQ0FBNUMsRUFBd0RBLFFBQVFXLEtBQVIsRUFBeEQsQ0FBdkI7O0FBRUEsYUFBS3dGLFNBQUwsR0FBaUIsSUFBSTdJLElBQUl5QixTQUFKLENBQWNxSCxrQkFBbEIsQ0FBcUNwRyxRQUFRLENBQVIsRUFBV3FHLFVBQWhELEVBQTRESCxnQkFBNUQsQ0FBakI7O0FBRUE7QUFDQUgscUJBQWFPLE9BQWIsR0FBdUIsS0FBS0gsU0FBTCxDQUFlRyxPQUFmLENBQXVCcEQsSUFBdkIsQ0FBNEIsS0FBS2lELFNBQWpDLENBQXZCOztBQUVBbkcsZ0JBQVFxRCxNQUFSOztBQUVBO0FBQ0EsYUFBS1gsTUFBTCxDQUFZNkQsTUFBWixDQUFtQkwsaUJBQWlCTSxVQUFqQixDQUE0QnRELElBQTVCLENBQWlDZ0QsZ0JBQWpDLENBQW5CLEVBQXVFLEtBQUtDLFNBQUwsQ0FBZU0sU0FBZixDQUF5QnZELElBQXpCLENBQThCLEtBQUtpRCxTQUFuQyxDQUF2RTs7QUFFQSxhQUFLekQsTUFBTCxDQUFZbkUsR0FBWixDQUFnQixVQUFoQixFQUE0QixZQUFNO0FBQ2hDLGdCQUFLb0UsUUFBTCxHQUFnQixNQUFLRCxNQUFMLEdBQWMsTUFBS0UsTUFBTCxHQUFjLE1BQUtnRCxPQUFMLEdBQWUsSUFBM0Q7QUFDRCxTQUZEO0FBR0Q7QUFqQytCLEtBQWIsQ0FBckI7O0FBb0NBLFdBQU9GLGNBQVA7QUFDRCxHQXZDZ0MsQ0FBakM7QUF3Q0QsQ0E1Q0Q7Ozs7Ozs7Ozs7Ozs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVTtBQUNUOztBQUVBMUksVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JzRixPQUF4QixDQUFnQywyQkFBaEMsRUFBNkQsQ0FBQyxVQUFELEVBQWEsVUFBU3pFLFFBQVQsRUFBbUI7O0FBRTNGLFFBQU00SSxzQkFBc0IsQ0FBQyxpQkFBRCxFQUFvQixpQkFBcEIsRUFBdUMsaUJBQXZDLEVBQTBELHNCQUExRCxFQUFrRixtQkFBbEYsQ0FBNUI7O0FBRjJGLFFBR3JGakIseUJBSHFGO0FBQUE7O0FBSXpGOzs7OztBQUtBLHlDQUFZTSxZQUFaLEVBQTBCWSxlQUExQixFQUEyQ3JGLFdBQTNDLEVBQXdEO0FBQUE7O0FBQUEsMEpBQ2hEeUUsWUFEZ0QsRUFDbENZLGVBRGtDOztBQUV0RCxjQUFLQyxZQUFMLEdBQW9CdEYsV0FBcEI7O0FBRUFvRiw0QkFBb0JHLE9BQXBCLENBQTRCO0FBQUEsaUJBQVFGLGdCQUFnQkcsZUFBaEIsQ0FBZ0NDLElBQWhDLENBQVI7QUFBQSxTQUE1QjtBQUNBLGNBQUtuQixPQUFMLEdBQWU5SCxTQUFTNkksa0JBQWtCQSxnQkFBZ0JLLFNBQWhCLENBQTBCLElBQTFCLENBQWxCLEdBQW9ELElBQTdELENBQWY7QUFMc0Q7QUFNdkQ7O0FBZndGO0FBQUE7QUFBQSwyQ0FpQnRFQyxJQWpCc0UsRUFpQmhFdEcsS0FqQmdFLEVBaUIxRDtBQUM3QixjQUFJLEtBQUt1RyxhQUFMLENBQW1CQyxrQkFBbkIsWUFBaURDLFFBQXJELEVBQStEO0FBQzdELGlCQUFLRixhQUFMLENBQW1CQyxrQkFBbkIsQ0FBc0NGLElBQXRDLEVBQTRDdEcsS0FBNUM7QUFDRDtBQUNGO0FBckJ3RjtBQUFBO0FBQUEseUNBdUJ4RXNHLElBdkJ3RSxFQXVCbEVqSCxPQXZCa0UsRUF1QjFEO0FBQzdCLGNBQUksS0FBS2tILGFBQUwsQ0FBbUJHLGdCQUFuQixZQUErQ0QsUUFBbkQsRUFBNkQ7QUFDM0QsaUJBQUtGLGFBQUwsQ0FBbUJHLGdCQUFuQixDQUFvQ0osSUFBcEMsRUFBMENqSCxPQUExQztBQUNEO0FBQ0Y7QUEzQndGO0FBQUE7QUFBQSx3Q0E2QnpFO0FBQ2QsY0FBSSxLQUFLa0gsYUFBTCxDQUFtQkMsa0JBQXZCLEVBQTJDO0FBQ3pDLG1CQUFPLElBQVA7QUFDRDs7QUFFRCxjQUFJLEtBQUtELGFBQUwsQ0FBbUJJLGlCQUF2QixFQUEwQztBQUN4QyxtQkFBTyxLQUFQO0FBQ0Q7O0FBRUQsZ0JBQU0sSUFBSWhKLEtBQUosQ0FBVSx5Q0FBVixDQUFOO0FBQ0Q7QUF2Q3dGO0FBQUE7QUFBQSx3Q0F5Q3pFaUosS0F6Q3lFLEVBeUNsRUMsTUF6Q2tFLEVBeUMxRHBGLElBekMwRCxFQXlDcEQ7QUFDbkMsZUFBS3FGLG1CQUFMLENBQXlCRixLQUF6QixFQUFnQyxnQkFBc0I7QUFBQSxnQkFBcEJ2SCxPQUFvQixRQUFwQkEsT0FBb0I7QUFBQSxnQkFBWFcsS0FBVyxRQUFYQSxLQUFXOztBQUNwRDZHLG1CQUFPcEosV0FBUCxDQUFtQjRCLE9BQW5CO0FBQ0FvQyxpQkFBSyxFQUFDcEMsZ0JBQUQsRUFBVVcsWUFBVixFQUFMO0FBQ0QsV0FIRDtBQUlEO0FBOUN3RjtBQUFBO0FBQUEsNENBZ0RyRTRHLEtBaERxRSxFQWdEOURuRixJQWhEOEQsRUFnRHhEO0FBQUE7O0FBQy9CLGNBQU16QixRQUFRLEtBQUtpRyxZQUFMLENBQWtCckYsSUFBbEIsRUFBZDtBQUNBLGVBQUttRyxxQkFBTCxDQUEyQkgsS0FBM0IsRUFBa0M1RyxLQUFsQzs7QUFFQSxjQUFJLEtBQUtnSCxhQUFMLEVBQUosRUFBMEI7QUFDeEIsaUJBQUtSLGtCQUFMLENBQXdCSSxLQUF4QixFQUErQjVHLEtBQS9CO0FBQ0Q7O0FBRUQsZUFBS2lGLE9BQUwsQ0FBYWpGLEtBQWIsRUFBb0IsVUFBQ2lILE1BQUQsRUFBWTtBQUM5QixnQkFBSTVILFVBQVU0SCxPQUFPLENBQVAsQ0FBZDtBQUNBLGdCQUFJLENBQUMsT0FBS0QsYUFBTCxFQUFMLEVBQTJCO0FBQ3pCM0gsd0JBQVUsT0FBS2tILGFBQUwsQ0FBbUJJLGlCQUFuQixDQUFxQ0MsS0FBckMsRUFBNEN2SCxPQUE1QyxDQUFWO0FBQ0FsQyx1QkFBU2tDLE9BQVQsRUFBa0JXLEtBQWxCO0FBQ0Q7O0FBRUR5QixpQkFBSyxFQUFDcEMsZ0JBQUQsRUFBVVcsWUFBVixFQUFMO0FBQ0QsV0FSRDtBQVNEOztBQUVEOzs7OztBQW5FeUY7QUFBQTtBQUFBLDhDQXVFbkVrSCxDQXZFbUUsRUF1RWhFbEgsS0F2RWdFLEVBdUV6RDtBQUM5QixjQUFNbUgsT0FBTyxLQUFLdEIsVUFBTCxLQUFvQixDQUFqQztBQUNBeEosa0JBQVF0QixNQUFSLENBQWVpRixLQUFmLEVBQXNCO0FBQ3BCb0gsb0JBQVFGLENBRFk7QUFFcEJHLG9CQUFRSCxNQUFNLENBRk07QUFHcEJJLG1CQUFPSixNQUFNQyxJQUhPO0FBSXBCSSxxQkFBU0wsTUFBTSxDQUFOLElBQVdBLE1BQU1DLElBSk47QUFLcEJLLG1CQUFPTixJQUFJLENBQUosS0FBVSxDQUxHO0FBTXBCTyxrQkFBTVAsSUFBSSxDQUFKLEtBQVU7QUFOSSxXQUF0QjtBQVFEO0FBakZ3RjtBQUFBO0FBQUEsbUNBbUY5RU4sS0FuRjhFLEVBbUZ2RU4sSUFuRnVFLEVBbUZqRTtBQUFBOztBQUN0QixjQUFJLEtBQUtVLGFBQUwsRUFBSixFQUEwQjtBQUN4QlYsaUJBQUt0RyxLQUFMLENBQVdhLFVBQVgsQ0FBc0I7QUFBQSxxQkFBTSxPQUFLMkYsa0JBQUwsQ0FBd0JJLEtBQXhCLEVBQStCTixLQUFLdEcsS0FBcEMsQ0FBTjtBQUFBLGFBQXRCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsNkpBQWlCNEcsS0FBakIsRUFBd0JOLElBQXhCO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OztBQTNGeUY7QUFBQTtBQUFBLG9DQWlHN0VNLEtBakc2RSxFQWlHdEVOLElBakdzRSxFQWlHaEU7QUFDdkIsY0FBSSxLQUFLVSxhQUFMLEVBQUosRUFBMEI7QUFDeEIsaUJBQUtOLGdCQUFMLENBQXNCRSxLQUF0QixFQUE2Qk4sS0FBS3RHLEtBQWxDO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsOEpBQWtCNEcsS0FBbEIsRUFBeUJOLEtBQUtqSCxPQUE5QjtBQUNEO0FBQ0RpSCxlQUFLdEcsS0FBTCxDQUFXMEgsUUFBWDtBQUNEO0FBeEd3RjtBQUFBO0FBQUEsa0NBMEcvRTtBQUNSO0FBQ0EsZUFBSzNGLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUE3R3dGOztBQUFBO0FBQUEsTUFHbkRwRixJQUFJeUIsU0FBSixDQUFjdUosa0JBSHFDOztBQWlIM0YsV0FBTzdDLHlCQUFQO0FBQ0QsR0FsSDRELENBQTdEO0FBbUhELENBdEhEOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUl4SSxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPdUIsS0FBUCxDQUFhLGVBQWIsRUFBOEJsQixJQUFJeUIsU0FBSixDQUFjd0osYUFBNUM7QUFDQXRMLFNBQU91QixLQUFQLENBQWEsbUJBQWIsRUFBa0NsQixJQUFJeUIsU0FBSixDQUFjeUosaUJBQWhEOztBQUVBdkwsU0FBT3NGLE9BQVAsQ0FBZSxXQUFmLEVBQTRCLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsVUFBUzlELE1BQVQsRUFBaUJnSyxNQUFqQixFQUF5Qjs7QUFFeEUsUUFBSUMsWUFBWTVMLE1BQU1wQixNQUFOLENBQWE7QUFDM0JpSCxnQkFBVWpELFNBRGlCO0FBRTNCZ0QsY0FBUWhELFNBRm1COztBQUkzQmxELFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsYUFBS0MsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtnQyxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLMEMsTUFBTCxDQUFZbkUsR0FBWixDQUFnQixVQUFoQixFQUE0QixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQTVCOztBQUVBbEQsZ0JBQVEsQ0FBUixFQUFXMkksZ0JBQVgsQ0FBNEJDLG1CQUE1QixDQUFnREgsT0FBT2hHLE1BQU1vRyxnQkFBYixHQUFoRDtBQUNELE9BVjBCOztBQVkzQkMsWUFBTSxjQUFTMUgsT0FBVCxFQUFrQjtBQUN0QixlQUFPLEtBQUt1QixRQUFMLENBQWMsQ0FBZCxFQUFpQm1HLElBQWpCLENBQXNCMUgsT0FBdEIsQ0FBUDtBQUNELE9BZDBCOztBQWdCM0IySCxZQUFNLGNBQVMzSCxPQUFULEVBQWtCO0FBQ3RCLGVBQU8sS0FBS3VCLFFBQUwsQ0FBYyxDQUFkLEVBQWlCb0csSUFBakIsQ0FBc0IzSCxPQUF0QixDQUFQO0FBQ0QsT0FsQjBCOztBQW9CM0I0SCxjQUFRLGdCQUFTNUgsT0FBVCxFQUFrQjtBQUN4QixlQUFPLEtBQUt1QixRQUFMLENBQWMsQ0FBZCxFQUFpQnFHLE1BQWpCLENBQXdCNUgsT0FBeEIsQ0FBUDtBQUNELE9BdEIwQjs7QUF3QjNCK0IsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVYsRUFBcUIsRUFBQ25FLE1BQU0sSUFBUCxFQUFyQjs7QUFFQSxhQUFLK0YsT0FBTCxHQUFlLEtBQUtyQyxRQUFMLEdBQWdCLEtBQUtELE1BQUwsR0FBYyxJQUE3QztBQUNEO0FBNUIwQixLQUFiLENBQWhCOztBQStCQWdHLGNBQVUxRSxnQkFBVixHQUE2QixVQUFTL0gsSUFBVCxFQUFlZ0ksUUFBZixFQUF5QjtBQUNwRCxhQUFPcEgsT0FBT1MsR0FBUCxDQUFXMkwsWUFBWCxDQUF3QmpGLGdCQUF4QixDQUF5Qy9ILElBQXpDLEVBQStDZ0ksUUFBL0MsQ0FBUDtBQUNELEtBRkQ7O0FBSUFYLGVBQVdDLEtBQVgsQ0FBaUJtRixTQUFqQjtBQUNBakssV0FBTytFLDJCQUFQLENBQW1Da0YsU0FBbkMsRUFBOEMsQ0FBQyxvQkFBRCxDQUE5Qzs7QUFHQSxXQUFPQSxTQUFQO0FBQ0QsR0ExQzJCLENBQTVCO0FBNENELENBcEREOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUl6TCxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLGVBQWYsRUFBZ0MsQ0FBQyxVQUFELEVBQWEsUUFBYixFQUF1QixVQUFTekUsUUFBVCxFQUFtQlcsTUFBbkIsRUFBMkI7O0FBRWhGOzs7OztBQUtBLFFBQUl5SyxnQkFBZ0JwTSxNQUFNcEIsTUFBTixDQUFhOztBQUUvQjs7O0FBR0FpSCxnQkFBVWpELFNBTHFCOztBQU8vQjs7O0FBR0FrRCxjQUFRbEQsU0FWdUI7O0FBWS9COzs7QUFHQWdELGNBQVFoRCxTQWZ1Qjs7QUFpQi9COzs7OztBQUtBbEQsWUFBTSxjQUFTbUUsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQzs7QUFFcEMsYUFBS0UsUUFBTCxHQUFnQjNDLFdBQVdoRCxRQUFRZ0QsT0FBUixDQUFnQm5ELE9BQU9tQixRQUFQLENBQWdCRyxJQUFoQyxDQUEzQjtBQUNBLGFBQUt1RSxNQUFMLEdBQWMvQixTQUFTLEtBQUtnQyxRQUFMLENBQWNoQyxLQUFkLEVBQXZCO0FBQ0EsYUFBS2lDLE1BQUwsR0FBY0gsS0FBZDtBQUNBLGFBQUswRyxrQkFBTCxHQUEwQixJQUExQjs7QUFFQSxhQUFLQyxjQUFMLEdBQXNCLEtBQUtDLFNBQUwsQ0FBZW5HLElBQWYsQ0FBb0IsSUFBcEIsQ0FBdEI7QUFDQSxhQUFLUCxRQUFMLENBQWMyRyxFQUFkLENBQWlCLFFBQWpCLEVBQTJCLEtBQUtGLGNBQWhDOztBQUVBLGFBQUsxRyxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7O0FBRUEsYUFBS0gsb0JBQUwsR0FBNEJ0RSxPQUFPdUUsWUFBUCxDQUFvQixJQUFwQixFQUEwQmhELFFBQVEsQ0FBUixDQUExQixFQUFzQyxDQUNoRSxTQURnRSxFQUNyRCxVQURxRCxFQUN6QyxRQUR5QyxFQUVoRSxTQUZnRSxFQUVyRCxNQUZxRCxFQUU3QyxNQUY2QyxFQUVyQyxNQUZxQyxFQUU3QixTQUY2QixDQUF0QyxFQUd6QixVQUFTaUQsTUFBVCxFQUFpQjtBQUNsQixjQUFJQSxPQUFPc0csU0FBWCxFQUFzQjtBQUNwQnRHLG1CQUFPc0csU0FBUCxHQUFtQixJQUFuQjtBQUNEO0FBQ0QsaUJBQU90RyxNQUFQO0FBQ0QsU0FMRSxDQUtEQyxJQUxDLENBS0ksSUFMSixDQUh5QixDQUE1Qjs7QUFVQSxhQUFLTCxxQkFBTCxHQUE2QnBFLE9BQU9xRSxhQUFQLENBQXFCLElBQXJCLEVBQTJCOUMsUUFBUSxDQUFSLENBQTNCLEVBQXVDLENBQ2xFLFlBRGtFLEVBRWxFLFVBRmtFLEVBR2xFLGNBSGtFLEVBSWxFLFNBSmtFLEVBS2xFLGFBTGtFLEVBTWxFLGFBTmtFLEVBT2xFLFlBUGtFLENBQXZDLENBQTdCO0FBU0QsT0FyRDhCOztBQXVEL0JxSixpQkFBVyxtQkFBU0csS0FBVCxFQUFnQjtBQUN6QixZQUFJQyxRQUFRRCxNQUFNdkcsTUFBTixDQUFhc0csU0FBYixDQUF1QkUsS0FBbkM7QUFDQXpNLGdCQUFRZ0QsT0FBUixDQUFnQnlKLE1BQU1BLE1BQU1DLE1BQU4sR0FBZSxDQUFyQixDQUFoQixFQUF5Q25KLElBQXpDLENBQThDLFFBQTlDLEVBQXdEaUIsVUFBeEQ7QUFDRCxPQTFEOEI7O0FBNEQvQjJCLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWO0FBQ0EsYUFBS0wsb0JBQUw7QUFDQSxhQUFLRixxQkFBTDtBQUNBLGFBQUtGLFFBQUwsQ0FBY2dILEdBQWQsQ0FBa0IsUUFBbEIsRUFBNEIsS0FBS1AsY0FBakM7QUFDQSxhQUFLekcsUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLElBQTVDO0FBQ0Q7QUFsRThCLEtBQWIsQ0FBcEI7O0FBcUVBVSxlQUFXQyxLQUFYLENBQWlCMkYsYUFBakI7QUFDQXpLLFdBQU8rRSwyQkFBUCxDQUFtQzBGLGFBQW5DLEVBQWtELENBQUMsT0FBRCxFQUFVLFNBQVYsQ0FBbEQ7O0FBRUEsV0FBT0EsYUFBUDtBQUNELEdBaEYrQixDQUFoQztBQWlGRCxDQXRGRDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQWxNLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQ0d1QixLQURILENBQ1MsNkJBRFQsRUFDd0NsQixJQUFJeUIsU0FBSixDQUFjNkssMkJBRHRELEVBRUdwTCxLQUZILENBRVMsd0JBRlQsRUFFbUNsQixJQUFJeUIsU0FBSixDQUFjOEssK0JBRmpELEVBR0dyTCxLQUhILENBR1MsNEJBSFQsRUFHdUNsQixJQUFJeUIsU0FBSixDQUFjK0ssbUNBSHJELEVBSUd0TCxLQUpILENBSVMsd0JBSlQsRUFJbUNsQixJQUFJeUIsU0FBSixDQUFjZ0wsK0JBSmpELEVBS0d2TCxLQUxILENBS1Msd0JBTFQsRUFLbUNsQixJQUFJeUIsU0FBSixDQUFjNkssMkJBTGpELEVBTUdwTCxLQU5ILENBTVMsK0JBTlQsRUFNMENsQixJQUFJeUIsU0FBSixDQUFjaUwsc0NBTnhEOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUNBLE1BQUkvTSxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLDRCQUFmLEVBQTZDLENBQUMscUJBQUQsRUFBd0IsVUFBUzBILG1CQUFULEVBQThCOztBQUVqRyxRQUFJQyw2QkFBNkJELG9CQUFvQnZPLE1BQXBCLENBQTJCOztBQUUxRHlPLGtCQUFZekssU0FGOEM7O0FBSTFEMEssZ0JBQVUsS0FKZ0Q7QUFLMUR6SCxnQkFBVSxLQUxnRDtBQU0xRDBILGlCQUFXLEtBTitDO0FBTzFEQyxpQkFBVyxLQVArQztBQVExREMsY0FBUSxLQVJrRDs7QUFVMUQ7Ozs7Ozs7O0FBUUFDLGFBQU8sZUFBU3hLLE9BQVQsRUFBa0J5SyxRQUFsQixFQUE0QkMsUUFBNUIsRUFBc0N0SixPQUF0QyxFQUErQztBQUNwREEsa0JBQVVBLFdBQVcsRUFBckI7QUFDQSxhQUFLbUosTUFBTCxHQUFjbkosUUFBUXVKLEtBQVIsSUFBaUIsS0FBL0I7QUFDQSxhQUFLUCxRQUFMLEdBQWdCLENBQUMsQ0FBQ2hKLFFBQVF3SixPQUExQjtBQUNBLGFBQUtqSSxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLc0ssU0FBTCxHQUFpQkcsUUFBakI7QUFDQSxhQUFLSixTQUFMLEdBQWlCSyxRQUFqQjs7QUFFQUEsaUJBQVNHLEdBQVQsQ0FBYSxZQUFiLEVBQTJCLG1DQUEzQjtBQUNBSCxpQkFBU0csR0FBVCxDQUFhO0FBQ1hGLGlCQUFPdkosUUFBUXVKLEtBREo7QUFFWEcsbUJBQVMsTUFGRTtBQUdYQyxrQkFBUTtBQUhHLFNBQWI7O0FBTUE7QUFDQUwsaUJBQVNHLEdBQVQsQ0FBYSxtQkFBYixFQUFrQyw0QkFBbEM7O0FBRUFKLGlCQUFTSSxHQUFULENBQWEsRUFBQ0UsUUFBUSxDQUFULEVBQWI7O0FBRUEsWUFBSSxLQUFLWCxRQUFULEVBQW1CO0FBQ2pCTSxtQkFBU0csR0FBVCxDQUFhO0FBQ1hHLG1CQUFPLE1BQU01SixRQUFRdUosS0FEVjtBQUVYTSxrQkFBTTtBQUZLLFdBQWI7QUFJRCxTQUxELE1BS087QUFDTFAsbUJBQVNHLEdBQVQsQ0FBYTtBQUNYRyxtQkFBTyxNQURJO0FBRVhDLGtCQUFNLE1BQU03SixRQUFRdUo7QUFGVCxXQUFiO0FBSUQ7O0FBRUQsYUFBS1IsVUFBTCxHQUFrQm5OLFFBQVFnRCxPQUFSLENBQWdCLGFBQWhCLEVBQStCNkssR0FBL0IsQ0FBbUM7QUFDbkRLLDJCQUFpQixPQURrQztBQUVuREMsZUFBSyxLQUY4QztBQUduREYsZ0JBQU0sS0FINkM7QUFJbkRELGlCQUFPLEtBSjRDO0FBS25ESSxrQkFBUSxLQUwyQztBQU1uREMsb0JBQVUsVUFOeUM7QUFPbkRQLG1CQUFTLE1BUDBDO0FBUW5EQyxrQkFBUTtBQVIyQyxTQUFuQyxDQUFsQjs7QUFXQS9LLGdCQUFRc0wsT0FBUixDQUFnQixLQUFLbkIsVUFBckI7QUFDRCxPQTlEeUQ7O0FBZ0UxRDs7OztBQUlBb0IsaUJBQVcsbUJBQVNuSyxPQUFULEVBQWtCO0FBQzNCLGFBQUtpSixTQUFMLENBQWVRLEdBQWYsQ0FBbUIsT0FBbkIsRUFBNEJ6SixRQUFRdUosS0FBcEM7O0FBRUEsWUFBSSxLQUFLUCxRQUFULEVBQW1CO0FBQ2pCLGVBQUtDLFNBQUwsQ0FBZVEsR0FBZixDQUFtQjtBQUNqQkcsbUJBQU8sTUFBTTVKLFFBQVF1SixLQURKO0FBRWpCTSxrQkFBTTtBQUZXLFdBQW5CO0FBSUQsU0FMRCxNQUtPO0FBQ0wsZUFBS1osU0FBTCxDQUFlUSxHQUFmLENBQW1CO0FBQ2pCRyxtQkFBTyxNQURVO0FBRWpCQyxrQkFBTSxNQUFNN0osUUFBUXVKO0FBRkgsV0FBbkI7QUFJRDs7QUFFRCxZQUFJdkosUUFBUW9LLFFBQVosRUFBc0I7QUFDcEIsY0FBSUMsTUFBTSxLQUFLcEIsU0FBTCxDQUFlLENBQWYsRUFBa0JxQixXQUE1QjtBQUNBLGNBQUlDLFlBQVksS0FBS0Msc0JBQUwsQ0FBNEJILEdBQTVCLENBQWhCO0FBQ0FuTyxjQUFJdU8sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQThCeUIsS0FBOUIsQ0FBb0NILFNBQXBDLEVBQStDSSxJQUEvQztBQUNEO0FBQ0YsT0F4RnlEOztBQTBGMUQ7O0FBRUF4RyxlQUFTLG1CQUFXO0FBQ2xCLFlBQUksS0FBSzRFLFVBQVQsRUFBcUI7QUFDbkIsZUFBS0EsVUFBTCxDQUFnQjlHLE1BQWhCO0FBQ0EsZUFBSzhHLFVBQUwsR0FBa0IsSUFBbEI7QUFDRDs7QUFFRCxhQUFLRyxTQUFMLENBQWUwQixVQUFmLENBQTBCLE9BQTFCO0FBQ0EsYUFBSzNCLFNBQUwsQ0FBZTJCLFVBQWYsQ0FBMEIsT0FBMUI7O0FBRUEsYUFBS3JKLFFBQUwsR0FBZ0IsS0FBSzJILFNBQUwsR0FBaUIsS0FBS0QsU0FBTCxHQUFpQixJQUFsRDtBQUNELE9BdEd5RDs7QUF3RzFEOzs7O0FBSUE0QixnQkFBVSxrQkFBU2pMLFFBQVQsRUFBbUJrTCxPQUFuQixFQUE0QjtBQUNwQyxZQUFJQyxXQUFXRCxZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0MsUUFBN0M7QUFDQSxZQUFJQyxRQUFRRixZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0UsS0FBMUM7O0FBRUEsYUFBSy9CLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixTQUFuQixFQUE4QixPQUE5QjtBQUNBLGFBQUtWLFVBQUwsQ0FBZ0JVLEdBQWhCLENBQW9CLFNBQXBCLEVBQStCLE9BQS9COztBQUVBLFlBQUlZLE1BQU0sS0FBS3BCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCcUIsV0FBNUI7QUFDQSxZQUFJQyxZQUFZLEtBQUtDLHNCQUFMLENBQTRCSCxHQUE1QixDQUFoQjtBQUNBLFlBQUlZLGdCQUFnQixLQUFLQyxzQkFBTCxDQUE0QmIsR0FBNUIsQ0FBcEI7O0FBRUFjLG1CQUFXLFlBQVc7O0FBRXBCalAsY0FBSXVPLE1BQUosQ0FBVyxLQUFLdkIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHa0MsSUFESCxDQUNRSixLQURSLEVBRUdOLEtBRkgsQ0FFU08sYUFGVCxFQUV3QjtBQUNwQkYsc0JBQVVBLFFBRFU7QUFFcEJNLG9CQUFRLEtBQUtBO0FBRk8sV0FGeEIsRUFNR1gsS0FOSCxDQU1TLFVBQVMxSixJQUFULEVBQWU7QUFDcEJwQjtBQUNBb0I7QUFDRCxXQVRILEVBVUcySixJQVZIOztBQVlBek8sY0FBSXVPLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHbUMsSUFESCxDQUNRSixLQURSLEVBRUdOLEtBRkgsQ0FFU0gsU0FGVCxFQUVvQjtBQUNoQlEsc0JBQVVBLFFBRE07QUFFaEJNLG9CQUFRLEtBQUtBO0FBRkcsV0FGcEIsRUFNR1YsSUFOSDtBQVFELFNBdEJVLENBc0JUN0ksSUF0QlMsQ0FzQkosSUF0QkksQ0FBWCxFQXNCYyxPQUFPLEVBdEJyQjtBQXVCRCxPQTlJeUQ7O0FBZ0oxRDs7OztBQUlBd0osaUJBQVcsbUJBQVMxTCxRQUFULEVBQW1Ca0wsT0FBbkIsRUFBNEI7QUFDckMsWUFBSUMsV0FBV0QsWUFBWSxJQUFaLEdBQW1CLEdBQW5CLEdBQXlCLEtBQUtDLFFBQTdDO0FBQ0EsWUFBSUMsUUFBUUYsWUFBWSxJQUFaLEdBQW1CLEdBQW5CLEdBQXlCLEtBQUtFLEtBQTFDOztBQUVBLGFBQUtqQyxVQUFMLENBQWdCVSxHQUFoQixDQUFvQixFQUFDQyxTQUFTLE9BQVYsRUFBcEI7O0FBRUEsWUFBSTZCLGdCQUFnQixLQUFLZixzQkFBTCxDQUE0QixDQUE1QixDQUFwQjtBQUNBLFlBQUlTLGdCQUFnQixLQUFLQyxzQkFBTCxDQUE0QixDQUE1QixDQUFwQjs7QUFFQUMsbUJBQVcsWUFBVzs7QUFFcEJqUCxjQUFJdU8sTUFBSixDQUFXLEtBQUt2QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0drQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTTyxhQUZULEVBRXdCO0FBQ3BCRixzQkFBVUEsUUFEVTtBQUVwQk0sb0JBQVEsS0FBS0E7QUFGTyxXQUZ4QixFQU1HWCxLQU5ILENBTVMsVUFBUzFKLElBQVQsRUFBZTtBQUNwQixpQkFBS2lJLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixTQUFuQixFQUE4QixNQUE5QjtBQUNBN0o7QUFDQW9CO0FBQ0QsV0FKTSxDQUlMYyxJQUpLLENBSUEsSUFKQSxDQU5ULEVBV0c2SSxJQVhIOztBQWFBek8sY0FBSXVPLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHbUMsSUFESCxDQUNRSixLQURSLEVBRUdOLEtBRkgsQ0FFU2EsYUFGVCxFQUV3QjtBQUNwQlIsc0JBQVVBLFFBRFU7QUFFcEJNLG9CQUFRLEtBQUtBO0FBRk8sV0FGeEIsRUFNR1YsSUFOSDtBQVFELFNBdkJVLENBdUJUN0ksSUF2QlMsQ0F1QkosSUF2QkksQ0FBWCxFQXVCYyxPQUFPLEVBdkJyQjtBQXdCRCxPQXJMeUQ7O0FBdUwxRDs7Ozs7QUFLQTBKLHFCQUFlLHVCQUFTeEwsT0FBVCxFQUFrQjs7QUFFL0IsYUFBS2lKLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixTQUFuQixFQUE4QixPQUE5QjtBQUNBLGFBQUtWLFVBQUwsQ0FBZ0JVLEdBQWhCLENBQW9CLEVBQUNDLFNBQVMsT0FBVixFQUFwQjs7QUFFQSxZQUFJNkIsZ0JBQWdCLEtBQUtmLHNCQUFMLENBQTRCaUIsS0FBS0MsR0FBTCxDQUFTMUwsUUFBUTJMLFdBQWpCLEVBQThCM0wsUUFBUTRMLFFBQXRDLENBQTVCLENBQXBCO0FBQ0EsWUFBSVgsZ0JBQWdCLEtBQUtDLHNCQUFMLENBQTRCTyxLQUFLQyxHQUFMLENBQVMxTCxRQUFRMkwsV0FBakIsRUFBOEIzTCxRQUFRNEwsUUFBdEMsQ0FBNUIsQ0FBcEI7QUFDQSxlQUFPWCxjQUFjWSxPQUFyQjs7QUFFQTNQLFlBQUl1TyxNQUFKLENBQVcsS0FBS3hCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR3lCLEtBREgsQ0FDU2EsYUFEVCxFQUVHWixJQUZIOztBQUlBLFlBQUloUSxPQUFPbVIsSUFBUCxDQUFZYixhQUFaLEVBQTJCM0MsTUFBM0IsR0FBb0MsQ0FBeEMsRUFBMkM7QUFDekNwTSxjQUFJdU8sTUFBSixDQUFXLEtBQUt2QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0d3QixLQURILENBQ1NPLGFBRFQsRUFFR04sSUFGSDtBQUdEO0FBQ0YsT0E5TXlEOztBQWdOMURILDhCQUF3QixnQ0FBU29CLFFBQVQsRUFBbUI7QUFDekMsWUFBSUcsSUFBSSxLQUFLL0MsUUFBTCxHQUFnQixDQUFDNEMsUUFBakIsR0FBNEJBLFFBQXBDO0FBQ0EsWUFBSUksWUFBWSxpQkFBaUJELENBQWpCLEdBQXFCLFdBQXJDOztBQUVBLGVBQU87QUFDTEMscUJBQVdBLFNBRE47QUFFTCx3QkFBY0osYUFBYSxDQUFiLEdBQWlCLE1BQWpCLEdBQTBCO0FBRm5DLFNBQVA7QUFJRCxPQXhOeUQ7O0FBME4xRFYsOEJBQXdCLGdDQUFTVSxRQUFULEVBQW1CO0FBQ3pDLFlBQUl2QixNQUFNLEtBQUtwQixTQUFMLENBQWUsQ0FBZixFQUFrQnFCLFdBQTVCO0FBQ0EsWUFBSXVCLFVBQVUsSUFBSyxNQUFNRCxRQUFOLEdBQWlCdkIsR0FBcEM7O0FBRUEsZUFBTztBQUNMd0IsbUJBQVNBO0FBREosU0FBUDtBQUdELE9Bak95RDs7QUFtTzFESSxZQUFNLGdCQUFXO0FBQ2YsZUFBTyxJQUFJbkQsMEJBQUosRUFBUDtBQUNEO0FBck95RCxLQUEzQixDQUFqQzs7QUF3T0EsV0FBT0EsMEJBQVA7QUFDRCxHQTNPNEMsQ0FBN0M7QUE2T0QsQ0FqUEQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSWpOLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsVUFBZixFQUEyQixDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFVBQVM5RCxNQUFULEVBQWlCZ0ssTUFBakIsRUFBeUI7O0FBRXZFLFFBQUk2RSxXQUFXeFEsTUFBTXBCLE1BQU4sQ0FBYTtBQUMxQmMsWUFBTSxjQUFTbUUsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUFBOztBQUNwQyxhQUFLQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2dDLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUs0QyxNQUFMLEdBQWNILEtBQWQ7O0FBRUEsYUFBSzhLLGNBQUwsR0FBc0I1TSxNQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsS0FBSzRFLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixJQUFuQixDQUF0QixDQUF0Qjs7QUFFQSxhQUFLSCxvQkFBTCxHQUE0QnRFLE9BQU91RSxZQUFQLENBQW9CLElBQXBCLEVBQTBCaEQsUUFBUSxDQUFSLENBQTFCLEVBQXNDLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsTUFBakIsRUFBeUIsU0FBekIsQ0FBdEMsQ0FBNUI7O0FBRUFqRSxlQUFPeVIsY0FBUCxDQUFzQixJQUF0QixFQUE0QixvQkFBNUIsRUFBa0Q7QUFDaERyTyxlQUFLO0FBQUEsbUJBQU0sTUFBS3dELFFBQUwsQ0FBYyxDQUFkLEVBQWlCOEssa0JBQXZCO0FBQUEsV0FEMkM7QUFFaERDLGVBQUssb0JBQVM7QUFDWixnQkFBSSxDQUFDLE1BQUtDLHNCQUFWLEVBQWtDO0FBQ2hDLG9CQUFLQyx3QkFBTDtBQUNEO0FBQ0Qsa0JBQUtELHNCQUFMLEdBQThCblAsS0FBOUI7QUFDRDtBQVArQyxTQUFsRDs7QUFVQSxZQUFJLEtBQUtvRSxNQUFMLENBQVlpTCxrQkFBWixJQUFrQyxLQUFLakwsTUFBTCxDQUFZNkssa0JBQWxELEVBQXNFO0FBQ3BFLGVBQUtHLHdCQUFMO0FBQ0Q7QUFDRCxZQUFJLEtBQUtoTCxNQUFMLENBQVlrTCxnQkFBaEIsRUFBa0M7QUFDaEMsZUFBS25MLFFBQUwsQ0FBYyxDQUFkLEVBQWlCb0wsZ0JBQWpCLEdBQW9DLFVBQUMzTCxJQUFELEVBQVU7QUFDNUNxRyxtQkFBTyxNQUFLN0YsTUFBTCxDQUFZa0wsZ0JBQW5CLEVBQXFDLE1BQUtwTCxNQUExQyxFQUFrRE4sSUFBbEQ7QUFDRCxXQUZEO0FBR0Q7QUFDRixPQTVCeUI7O0FBOEIxQndMLGdDQUEwQixvQ0FBVztBQUNuQyxhQUFLRCxzQkFBTCxHQUE4QjNRLFFBQVF3SSxJQUF0QztBQUNBLGFBQUs3QyxRQUFMLENBQWMsQ0FBZCxFQUFpQjhLLGtCQUFqQixHQUFzQyxLQUFLTyxtQkFBTCxDQUF5QjlLLElBQXpCLENBQThCLElBQTlCLENBQXRDO0FBQ0QsT0FqQ3lCOztBQW1DMUI4SywyQkFBcUIsNkJBQVNDLE1BQVQsRUFBaUI7QUFDcEMsYUFBS04sc0JBQUwsQ0FBNEJNLE1BQTVCOztBQUVBO0FBQ0EsWUFBSSxLQUFLckwsTUFBTCxDQUFZaUwsa0JBQWhCLEVBQW9DO0FBQ2xDcEYsaUJBQU8sS0FBSzdGLE1BQUwsQ0FBWWlMLGtCQUFuQixFQUF1QyxLQUFLbkwsTUFBNUMsRUFBb0QsRUFBQ3VMLFFBQVFBLE1BQVQsRUFBcEQ7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsWUFBSSxLQUFLckwsTUFBTCxDQUFZNkssa0JBQWhCLEVBQW9DO0FBQ2xDLGNBQUlTLFlBQVlyUixPQUFPb1IsTUFBdkI7QUFDQXBSLGlCQUFPb1IsTUFBUCxHQUFnQkEsTUFBaEI7QUFDQSxjQUFJN0csUUFBSixDQUFhLEtBQUt4RSxNQUFMLENBQVk2SyxrQkFBekIsSUFIa0MsQ0FHYztBQUNoRDVRLGlCQUFPb1IsTUFBUCxHQUFnQkMsU0FBaEI7QUFDRDtBQUNEO0FBQ0QsT0FwRHlCOztBQXNEMUIvSyxnQkFBVSxvQkFBVztBQUNuQixhQUFLSixvQkFBTDs7QUFFQSxhQUFLSixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS0QsTUFBTCxHQUFjLElBQWQ7O0FBRUEsYUFBSzZLLGNBQUw7QUFDRDtBQTdEeUIsS0FBYixDQUFmO0FBK0RBakssZUFBV0MsS0FBWCxDQUFpQitKLFFBQWpCOztBQUVBLFdBQU9BLFFBQVA7QUFDRCxHQXBFMEIsQ0FBM0I7QUFxRUQsQ0ExRUQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFVO0FBQ1Q7O0FBRUF0USxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QnNGLE9BQXhCLENBQWdDLGFBQWhDLEVBQStDLENBQUMsUUFBRCxFQUFXLFVBQVM5RCxNQUFULEVBQWlCOztBQUV6RSxRQUFJMFAsY0FBY3JSLE1BQU1wQixNQUFOLENBQWE7O0FBRTdCOzs7OztBQUtBYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtFLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUswQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2lDLE1BQUwsR0FBY0gsS0FBZDs7QUFFQSxhQUFLQyxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7O0FBRUEsYUFBS0wscUJBQUwsR0FBNkJwRSxPQUFPcUUsYUFBUCxDQUFxQixJQUFyQixFQUEyQixLQUFLSCxRQUFMLENBQWMsQ0FBZCxDQUEzQixFQUE2QyxDQUN4RSxNQUR3RSxFQUNoRSxNQURnRSxDQUE3QyxDQUE3Qjs7QUFJQSxhQUFLSSxvQkFBTCxHQUE0QnRFLE9BQU91RSxZQUFQLENBQW9CLElBQXBCLEVBQTBCLEtBQUtMLFFBQUwsQ0FBYyxDQUFkLENBQTFCLEVBQTRDLENBQ3RFLFNBRHNFLEVBRXRFLFVBRnNFLEVBR3RFLFNBSHNFLEVBSXRFLFVBSnNFLENBQTVDLEVBS3pCLFVBQVNNLE1BQVQsRUFBaUI7QUFDbEIsY0FBSUEsT0FBT2hCLE9BQVgsRUFBb0I7QUFDbEJnQixtQkFBT2hCLE9BQVAsR0FBaUIsSUFBakI7QUFDRDtBQUNELGlCQUFPZ0IsTUFBUDtBQUNELFNBTEUsQ0FLREMsSUFMQyxDQUtJLElBTEosQ0FMeUIsQ0FBNUI7QUFXRCxPQTdCNEI7O0FBK0I3QkMsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7O0FBRUEsYUFBS1AscUJBQUw7QUFDQSxhQUFLRSxvQkFBTDs7QUFFQSxhQUFLSixRQUFMLENBQWNVLE1BQWQ7O0FBRUEsYUFBS1YsUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsSUFBOUI7QUFDRDtBQXhDNEIsS0FBYixDQUFsQjs7QUEyQ0FZLGVBQVdDLEtBQVgsQ0FBaUI0SyxXQUFqQjtBQUNBMVAsV0FBTytFLDJCQUFQLENBQW1DMkssV0FBbkMsRUFBZ0QsQ0FBQyxZQUFELEVBQWUsVUFBZixFQUEyQixvQkFBM0IsQ0FBaEQ7O0FBR0EsV0FBT0EsV0FBUDtBQUNELEdBbEQ4QyxDQUEvQztBQW1ERCxDQXRERDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQW5SLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQ0d1QixLQURILENBQ1MsaUJBRFQsRUFDNEJsQixJQUFJeUIsU0FBSixDQUFjcVAsZUFEMUMsRUFFRzVQLEtBRkgsQ0FFUyxxQkFGVCxFQUVnQ2xCLElBQUl5QixTQUFKLENBQWNzUCxtQkFGOUM7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFVO0FBQ1Q7O0FBQ0EsTUFBSXBSLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsY0FBZixFQUErQixDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFVBQVM5RCxNQUFULEVBQWlCZ0ssTUFBakIsRUFBeUI7O0FBRTNFLFFBQUk2RixlQUFleFIsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFOUJjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFBQTs7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtNLG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEIsS0FBS0wsUUFBTCxDQUFjLENBQWQsQ0FBMUIsRUFBNEMsQ0FDdEUsYUFEc0UsQ0FBNUMsRUFFekIsa0JBQVU7QUFDWCxjQUFJTSxPQUFPc0wsUUFBWCxFQUFxQjtBQUNuQnRMLG1CQUFPc0wsUUFBUDtBQUNEO0FBQ0QsaUJBQU90TCxNQUFQO0FBQ0QsU0FQMkIsQ0FBNUI7O0FBU0EsYUFBS3FHLEVBQUwsQ0FBUSxhQUFSLEVBQXVCO0FBQUEsaUJBQU0sTUFBSzVHLE1BQUwsQ0FBWWxCLFVBQVosRUFBTjtBQUFBLFNBQXZCOztBQUVBLGFBQUttQixRQUFMLENBQWMsQ0FBZCxFQUFpQjZMLFFBQWpCLEdBQTRCLGdCQUFRO0FBQ2xDLGNBQUksTUFBSzVMLE1BQUwsQ0FBWTZMLFFBQWhCLEVBQTBCO0FBQ3hCLGtCQUFLL0wsTUFBTCxDQUFZc0QsS0FBWixDQUFrQixNQUFLcEQsTUFBTCxDQUFZNkwsUUFBOUIsRUFBd0MsRUFBQ0MsT0FBT3RNLElBQVIsRUFBeEM7QUFDRCxXQUZELE1BRU87QUFDTCxrQkFBS29NLFFBQUwsR0FBZ0IsTUFBS0EsUUFBTCxDQUFjcE0sSUFBZCxDQUFoQixHQUFzQ0EsTUFBdEM7QUFDRDtBQUNGLFNBTkQ7O0FBUUEsYUFBS00sTUFBTCxDQUFZbkUsR0FBWixDQUFnQixVQUFoQixFQUE0QixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQTVCO0FBQ0QsT0EzQjZCOztBQTZCOUJDLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWOztBQUVBLGFBQUtMLG9CQUFMOztBQUVBLGFBQUtKLFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxJQUE1QztBQUNEO0FBbkM2QixLQUFiLENBQW5COztBQXNDQVUsZUFBV0MsS0FBWCxDQUFpQitLLFlBQWpCO0FBQ0E3UCxXQUFPK0UsMkJBQVAsQ0FBbUM4SyxZQUFuQyxFQUFpRCxDQUFDLE9BQUQsRUFBVSxjQUFWLEVBQTBCLFFBQTFCLEVBQW9DLGlCQUFwQyxFQUF1RCxVQUF2RCxDQUFqRDs7QUFFQSxXQUFPQSxZQUFQO0FBQ0QsR0E1QzhCLENBQS9CO0FBNkNELENBakREOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUNBLE1BQUlyUixTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLHlCQUFmLEVBQTBDLENBQUMscUJBQUQsRUFBd0IsVUFBUzBILG1CQUFULEVBQThCOztBQUU5RixRQUFJMEUsMEJBQTBCMUUsb0JBQW9Cdk8sTUFBcEIsQ0FBMkI7O0FBRXZEME8sZ0JBQVUsS0FGNkM7QUFHdkR6SCxnQkFBVWpELFNBSDZDO0FBSXZEMkssaUJBQVczSyxTQUo0QztBQUt2RDRLLGlCQUFXNUssU0FMNEM7QUFNdkQ2SyxjQUFRN0ssU0FOK0M7O0FBUXZEOzs7Ozs7OztBQVFBOEssYUFBTyxlQUFTeEssT0FBVCxFQUFrQnlLLFFBQWxCLEVBQTRCQyxRQUE1QixFQUFzQ3RKLE9BQXRDLEVBQStDO0FBQ3BEQSxrQkFBVUEsV0FBVyxFQUFyQjs7QUFFQSxhQUFLdUIsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBS3NLLFNBQUwsR0FBaUJHLFFBQWpCO0FBQ0EsYUFBS0osU0FBTCxHQUFpQkssUUFBakI7O0FBRUEsYUFBS04sUUFBTCxHQUFnQixDQUFDLENBQUNoSixRQUFRd0osT0FBMUI7QUFDQSxhQUFLTCxNQUFMLEdBQWNuSixRQUFRdUosS0FBUixJQUFpQixLQUEvQjs7QUFFQUQsaUJBQVNHLEdBQVQsQ0FBYTtBQUNYRixpQkFBT3ZKLFFBQVF1SixLQURKO0FBRVhHLG1CQUFTO0FBRkUsU0FBYjs7QUFLQSxZQUFJLEtBQUtWLFFBQVQsRUFBbUI7QUFDakJNLG1CQUFTRyxHQUFULENBQWE7QUFDWEcsbUJBQU8sTUFBTTVKLFFBQVF1SixLQURWO0FBRVhNLGtCQUFNO0FBRkssV0FBYjtBQUlELFNBTEQsTUFLTztBQUNMUCxtQkFBU0csR0FBVCxDQUFhO0FBQ1hHLG1CQUFPLE1BREk7QUFFWEMsa0JBQU0sTUFBTTdKLFFBQVF1SjtBQUZULFdBQWI7QUFJRDtBQUNGLE9BMUNzRDs7QUE0Q3ZEOzs7OztBQUtBWSxpQkFBVyxtQkFBU25LLE9BQVQsRUFBa0I7QUFDM0IsYUFBS2lKLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixPQUFuQixFQUE0QnpKLFFBQVF1SixLQUFwQzs7QUFFQSxZQUFJLEtBQUtQLFFBQVQsRUFBbUI7QUFDakIsZUFBS0MsU0FBTCxDQUFlUSxHQUFmLENBQW1CO0FBQ2pCRyxtQkFBTyxNQUFNNUosUUFBUXVKLEtBREo7QUFFakJNLGtCQUFNO0FBRlcsV0FBbkI7QUFJRCxTQUxELE1BS087QUFDTCxlQUFLWixTQUFMLENBQWVRLEdBQWYsQ0FBbUI7QUFDakJHLG1CQUFPLE1BRFU7QUFFakJDLGtCQUFNLE1BQU03SixRQUFRdUo7QUFGSCxXQUFuQjtBQUlEOztBQUVELFlBQUl2SixRQUFRb0ssUUFBWixFQUFzQjtBQUNwQixjQUFJQyxNQUFNLEtBQUtwQixTQUFMLENBQWUsQ0FBZixFQUFrQnFCLFdBQTVCO0FBQ0EsY0FBSWtELG9CQUFvQixLQUFLQywyQkFBTCxDQUFpQ3BELEdBQWpDLENBQXhCO0FBQ0EsY0FBSWtCLGdCQUFnQixLQUFLbUMsd0JBQUwsQ0FBOEJyRCxHQUE5QixDQUFwQjs7QUFFQW5PLGNBQUl1TyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFBOEJ3QixLQUE5QixDQUFvQyxFQUFDc0IsV0FBV3dCLGlCQUFaLEVBQXBDLEVBQW9FN0MsSUFBcEU7QUFDQXpPLGNBQUl1TyxNQUFKLENBQVcsS0FBS3hCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFBOEJ5QixLQUE5QixDQUFvQ2EsYUFBcEMsRUFBbURaLElBQW5EO0FBQ0Q7QUFDRixPQXhFc0Q7O0FBMEV2RDs7QUFFQXhHLGVBQVMsbUJBQVc7QUFDbEIsYUFBSytFLFNBQUwsQ0FBZTBCLFVBQWYsQ0FBMEIsT0FBMUI7QUFDQSxhQUFLM0IsU0FBTCxDQUFlMkIsVUFBZixDQUEwQixPQUExQjs7QUFFQSxhQUFLckosUUFBTCxHQUFnQixLQUFLMkgsU0FBTCxHQUFpQixLQUFLRCxTQUFMLEdBQWlCLElBQWxEO0FBQ0QsT0FqRnNEOztBQW1GdkQ7Ozs7QUFJQTRCLGdCQUFVLGtCQUFTakwsUUFBVCxFQUFtQmtMLE9BQW5CLEVBQTRCO0FBQ3BDLFlBQUlDLFdBQVdELFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLQyxRQUE3QztBQUNBLFlBQUlDLFFBQVFGLFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLRSxLQUExQzs7QUFFQSxhQUFLL0IsU0FBTCxDQUFlUSxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE9BQTlCOztBQUVBLFlBQUlZLE1BQU0sS0FBS3BCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCcUIsV0FBNUI7O0FBRUEsWUFBSXFELGlCQUFpQixLQUFLRiwyQkFBTCxDQUFpQ3BELEdBQWpDLENBQXJCO0FBQ0EsWUFBSXVELGNBQWMsS0FBS0Ysd0JBQUwsQ0FBOEJyRCxHQUE5QixDQUFsQjs7QUFFQWMsbUJBQVcsWUFBVzs7QUFFcEJqUCxjQUFJdU8sTUFBSixDQUFXLEtBQUt2QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0drQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTO0FBQ0xzQix1QkFBVzJCO0FBRE4sV0FGVCxFQUlLO0FBQ0Q1QyxzQkFBVUEsUUFEVDtBQUVETSxvQkFBUSxLQUFLQTtBQUZaLFdBSkwsRUFRR1gsS0FSSCxDQVFTLFVBQVMxSixJQUFULEVBQWU7QUFDcEJwQjtBQUNBb0I7QUFDRCxXQVhILEVBWUcySixJQVpIOztBQWNBek8sY0FBSXVPLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHbUMsSUFESCxDQUNRSixLQURSLEVBRUdOLEtBRkgsQ0FFU2tELFdBRlQsRUFFc0I7QUFDbEI3QyxzQkFBVUEsUUFEUTtBQUVsQk0sb0JBQVEsS0FBS0E7QUFGSyxXQUZ0QixFQU1HVixJQU5IO0FBUUQsU0F4QlUsQ0F3QlQ3SSxJQXhCUyxDQXdCSixJQXhCSSxDQUFYLEVBd0JjLE9BQU8sRUF4QnJCO0FBeUJELE9BM0hzRDs7QUE2SHZEOzs7O0FBSUF3SixpQkFBVyxtQkFBUzFMLFFBQVQsRUFBbUJrTCxPQUFuQixFQUE0QjtBQUNyQyxZQUFJQyxXQUFXRCxZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0MsUUFBN0M7QUFDQSxZQUFJQyxRQUFRRixZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0UsS0FBMUM7O0FBRUEsWUFBSTJDLGlCQUFpQixLQUFLRiwyQkFBTCxDQUFpQyxDQUFqQyxDQUFyQjtBQUNBLFlBQUlHLGNBQWMsS0FBS0Ysd0JBQUwsQ0FBOEIsQ0FBOUIsQ0FBbEI7O0FBRUF2QyxtQkFBVyxZQUFXOztBQUVwQmpQLGNBQUl1TyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR2tDLElBREgsQ0FDUUosS0FEUixFQUVHTixLQUZILENBRVM7QUFDTHNCLHVCQUFXMkI7QUFETixXQUZULEVBSUs7QUFDRDVDLHNCQUFVQSxRQURUO0FBRURNLG9CQUFRLEtBQUtBO0FBRlosV0FKTCxFQVFHWCxLQVJILENBUVM7QUFDTHNCLHVCQUFXO0FBRE4sV0FSVCxFQVdHdEIsS0FYSCxDQVdTLFVBQVMxSixJQUFULEVBQWU7QUFDcEIsaUJBQUtpSSxTQUFMLENBQWVRLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEIsTUFBOUI7QUFDQTdKO0FBQ0FvQjtBQUNELFdBSk0sQ0FJTGMsSUFKSyxDQUlBLElBSkEsQ0FYVCxFQWdCRzZJLElBaEJIOztBQWtCQXpPLGNBQUl1TyxNQUFKLENBQVcsS0FBS3hCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR21DLElBREgsQ0FDUUosS0FEUixFQUVHTixLQUZILENBRVNrRCxXQUZULEVBRXNCO0FBQ2xCN0Msc0JBQVVBLFFBRFE7QUFFbEJNLG9CQUFRLEtBQUtBO0FBRkssV0FGdEIsRUFNR1gsS0FOSCxDQU1TLFVBQVMxSixJQUFULEVBQWU7QUFDcEJBO0FBQ0QsV0FSSCxFQVNHMkosSUFUSDtBQVdELFNBL0JVLENBK0JUN0ksSUEvQlMsQ0ErQkosSUEvQkksQ0FBWCxFQStCYyxPQUFPLEVBL0JyQjtBQWdDRCxPQXhLc0Q7O0FBMEt2RDs7Ozs7QUFLQTBKLHFCQUFlLHVCQUFTeEwsT0FBVCxFQUFrQjs7QUFFL0IsYUFBS2lKLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixTQUFuQixFQUE4QixPQUE5Qjs7QUFFQSxZQUFJa0UsaUJBQWlCLEtBQUtGLDJCQUFMLENBQWlDaEMsS0FBS0MsR0FBTCxDQUFTMUwsUUFBUTJMLFdBQWpCLEVBQThCM0wsUUFBUTRMLFFBQXRDLENBQWpDLENBQXJCO0FBQ0EsWUFBSWdDLGNBQWMsS0FBS0Ysd0JBQUwsQ0FBOEJqQyxLQUFLQyxHQUFMLENBQVMxTCxRQUFRMkwsV0FBakIsRUFBOEIzTCxRQUFRNEwsUUFBdEMsQ0FBOUIsQ0FBbEI7O0FBRUExUCxZQUFJdU8sTUFBSixDQUFXLEtBQUt2QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0d3QixLQURILENBQ1MsRUFBQ3NCLFdBQVcyQixjQUFaLEVBRFQsRUFFR2hELElBRkg7O0FBSUF6TyxZQUFJdU8sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0d5QixLQURILENBQ1NrRCxXQURULEVBRUdqRCxJQUZIO0FBR0QsT0E3THNEOztBQStMdkQ4QyxtQ0FBNkIscUNBQVM3QixRQUFULEVBQW1CO0FBQzlDLFlBQUlHLElBQUksS0FBSy9DLFFBQUwsR0FBZ0IsQ0FBQzRDLFFBQWpCLEdBQTRCQSxRQUFwQztBQUNBLFlBQUkrQixpQkFBaUIsaUJBQWlCNUIsQ0FBakIsR0FBcUIsV0FBMUM7O0FBRUEsZUFBTzRCLGNBQVA7QUFDRCxPQXBNc0Q7O0FBc012REQsZ0NBQTBCLGtDQUFTOUIsUUFBVCxFQUFtQjtBQUMzQyxZQUFJaUMsVUFBVSxLQUFLN0UsUUFBTCxHQUFnQixDQUFDNEMsUUFBakIsR0FBNEJBLFFBQTFDO0FBQ0EsWUFBSWtDLGtCQUFrQixpQkFBaUJELE9BQWpCLEdBQTJCLFdBQWpEOztBQUVBLGVBQU87QUFDTDdCLHFCQUFXOEI7QUFETixTQUFQO0FBR0QsT0E3TXNEOztBQStNdkQ3QixZQUFNLGdCQUFXO0FBQ2YsZUFBTyxJQUFJc0IsdUJBQUosRUFBUDtBQUNEO0FBak5zRCxLQUEzQixDQUE5Qjs7QUFvTkEsV0FBT0EsdUJBQVA7QUFDRCxHQXZOeUMsQ0FBMUM7QUF5TkQsQ0E3TkQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSTFSLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsMkJBQWYsRUFBNEMsQ0FBQyxxQkFBRCxFQUF3QixVQUFTMEgsbUJBQVQsRUFBOEI7O0FBRWhHLFFBQUlrRiw0QkFBNEJsRixvQkFBb0J2TyxNQUFwQixDQUEyQjs7QUFFekR5TyxrQkFBWXpLLFNBRjZDOztBQUl6RDBLLGdCQUFVLEtBSitDOztBQU16REMsaUJBQVczSyxTQU44QztBQU96RGlELGdCQUFVakQsU0FQK0M7QUFRekQ0SyxpQkFBVzVLLFNBUjhDOztBQVV6RDs7Ozs7Ozs7QUFRQThLLGFBQU8sZUFBU3hLLE9BQVQsRUFBa0J5SyxRQUFsQixFQUE0QkMsUUFBNUIsRUFBc0N0SixPQUF0QyxFQUErQztBQUNwRCxhQUFLdUIsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBS3FLLFNBQUwsR0FBaUJLLFFBQWpCO0FBQ0EsYUFBS0osU0FBTCxHQUFpQkcsUUFBakI7QUFDQSxhQUFLTCxRQUFMLEdBQWdCLENBQUMsQ0FBQ2hKLFFBQVF3SixPQUExQjtBQUNBLGFBQUtMLE1BQUwsR0FBY25KLFFBQVF1SixLQUFSLElBQWlCLEtBQS9COztBQUVBRixpQkFBU0ksR0FBVCxDQUFhO0FBQ1h1RSxxQkFBVztBQURBLFNBQWI7O0FBSUExRSxpQkFBU0csR0FBVCxDQUFhO0FBQ1hGLGlCQUFPdkosUUFBUXVKLEtBREo7QUFFWHNDLG1CQUFTLEdBRkU7QUFHWG5DLG1CQUFTO0FBSEUsU0FBYjs7QUFNQSxZQUFJLEtBQUtWLFFBQVQsRUFBbUI7QUFDakJNLG1CQUFTRyxHQUFULENBQWE7QUFDWEcsbUJBQU8sS0FESTtBQUVYQyxrQkFBTTtBQUZLLFdBQWI7QUFJRCxTQUxELE1BS087QUFDTFAsbUJBQVNHLEdBQVQsQ0FBYTtBQUNYRyxtQkFBTyxNQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlEOztBQUVELGFBQUtkLFVBQUwsR0FBa0JuTixRQUFRZ0QsT0FBUixDQUFnQixhQUFoQixFQUErQjZLLEdBQS9CLENBQW1DO0FBQ25ESywyQkFBaUIsT0FEa0M7QUFFbkRDLGVBQUssS0FGOEM7QUFHbkRGLGdCQUFNLEtBSDZDO0FBSW5ERCxpQkFBTyxLQUo0QztBQUtuREksa0JBQVEsS0FMMkM7QUFNbkRDLG9CQUFVLFVBTnlDO0FBT25EUCxtQkFBUztBQVAwQyxTQUFuQyxDQUFsQjs7QUFVQTlLLGdCQUFRc0wsT0FBUixDQUFnQixLQUFLbkIsVUFBckI7O0FBRUE7QUFDQTdNLFlBQUl1TyxNQUFKLENBQVdwQixTQUFTLENBQVQsQ0FBWCxFQUF3QnFCLEtBQXhCLENBQThCLEVBQUNzQixXQUFXLHNCQUFaLEVBQTlCLEVBQW1FckIsSUFBbkU7QUFDRCxPQTdEd0Q7O0FBK0R6RDs7Ozs7QUFLQVIsaUJBQVcsbUJBQVNuSyxPQUFULEVBQWtCO0FBQzNCLGFBQUttSixNQUFMLEdBQWNuSixRQUFRdUosS0FBdEI7QUFDQSxhQUFLTixTQUFMLENBQWVRLEdBQWYsQ0FBbUIsT0FBbkIsRUFBNEIsS0FBS04sTUFBakM7O0FBRUEsWUFBSW5KLFFBQVFvSyxRQUFaLEVBQXNCO0FBQ3BCLGNBQUlDLE1BQU0sS0FBS3BCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCcUIsV0FBNUI7O0FBRUEsY0FBSXFELGlCQUFpQixLQUFLRiwyQkFBTCxDQUFpQ3BELEdBQWpDLENBQXJCO0FBQ0EsY0FBSXVELGNBQWMsS0FBS0Ysd0JBQUwsQ0FBOEJyRCxHQUE5QixDQUFsQjs7QUFFQW5PLGNBQUl1TyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFBOEJ3QixLQUE5QixDQUFvQyxFQUFDc0IsV0FBVzJCLGNBQVosRUFBcEMsRUFBaUVoRCxJQUFqRTtBQUNBek8sY0FBSXVPLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUE4QnlCLEtBQTlCLENBQW9Da0QsV0FBcEMsRUFBaURqRCxJQUFqRDtBQUNEO0FBQ0YsT0FqRndEOztBQW1GekQ7Ozs7O0FBS0F4RyxlQUFTLG1CQUFXO0FBQ2xCLFlBQUksS0FBSzRFLFVBQVQsRUFBcUI7QUFDbkIsZUFBS0EsVUFBTCxDQUFnQjlHLE1BQWhCO0FBQ0EsZUFBSzhHLFVBQUwsR0FBa0IsSUFBbEI7QUFDRDs7QUFFRCxZQUFJLEtBQUtHLFNBQVQsRUFBb0I7QUFDbEIsZUFBS0EsU0FBTCxDQUFldkQsSUFBZixDQUFvQixPQUFwQixFQUE2QixFQUE3QjtBQUNEOztBQUVELFlBQUksS0FBS3NELFNBQVQsRUFBb0I7QUFDbEIsZUFBS0EsU0FBTCxDQUFldEQsSUFBZixDQUFvQixPQUFwQixFQUE2QixFQUE3QjtBQUNEOztBQUVELGFBQUt1RCxTQUFMLEdBQWlCLEtBQUtELFNBQUwsR0FBaUIsS0FBSzFILFFBQUwsR0FBZ0JqRCxTQUFsRDtBQUNELE9Bdkd3RDs7QUF5R3pEOzs7O0FBSUF1TSxnQkFBVSxrQkFBU2pMLFFBQVQsRUFBbUJrTCxPQUFuQixFQUE0QjtBQUNwQyxZQUFJQyxXQUFXRCxZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0MsUUFBN0M7QUFDQSxZQUFJQyxRQUFRRixZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0UsS0FBMUM7O0FBRUEsYUFBSy9CLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixTQUFuQixFQUE4QixPQUE5QjtBQUNBLGFBQUtWLFVBQUwsQ0FBZ0JVLEdBQWhCLENBQW9CLFNBQXBCLEVBQStCLE9BQS9COztBQUVBLFlBQUlZLE1BQU0sS0FBS3BCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCcUIsV0FBNUI7O0FBRUEsWUFBSXFELGlCQUFpQixLQUFLRiwyQkFBTCxDQUFpQ3BELEdBQWpDLENBQXJCO0FBQ0EsWUFBSXVELGNBQWMsS0FBS0Ysd0JBQUwsQ0FBOEJyRCxHQUE5QixDQUFsQjs7QUFFQWMsbUJBQVcsWUFBVzs7QUFFcEJqUCxjQUFJdU8sTUFBSixDQUFXLEtBQUt2QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0drQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTO0FBQ0xzQix1QkFBVzJCO0FBRE4sV0FGVCxFQUlLO0FBQ0Q1QyxzQkFBVUEsUUFEVDtBQUVETSxvQkFBUSxLQUFLQTtBQUZaLFdBSkwsRUFRR1gsS0FSSCxDQVFTLFVBQVMxSixJQUFULEVBQWU7QUFDcEJwQjtBQUNBb0I7QUFDRCxXQVhILEVBWUcySixJQVpIOztBQWNBek8sY0FBSXVPLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHbUMsSUFESCxDQUNRSixLQURSLEVBRUdOLEtBRkgsQ0FFU2tELFdBRlQsRUFFc0I7QUFDbEI3QyxzQkFBVUEsUUFEUTtBQUVsQk0sb0JBQVEsS0FBS0E7QUFGSyxXQUZ0QixFQU1HVixJQU5IO0FBUUQsU0F4QlUsQ0F3QlQ3SSxJQXhCUyxDQXdCSixJQXhCSSxDQUFYLEVBd0JjLE9BQU8sRUF4QnJCO0FBeUJELE9BbEp3RDs7QUFvSnpEOzs7O0FBSUF3SixpQkFBVyxtQkFBUzFMLFFBQVQsRUFBbUJrTCxPQUFuQixFQUE0QjtBQUNyQyxZQUFJQyxXQUFXRCxZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0MsUUFBN0M7QUFDQSxZQUFJQyxRQUFRRixZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0UsS0FBMUM7O0FBRUEsYUFBS2pDLFVBQUwsQ0FBZ0JVLEdBQWhCLENBQW9CLFNBQXBCLEVBQStCLE9BQS9COztBQUVBLFlBQUlrRSxpQkFBaUIsS0FBS0YsMkJBQUwsQ0FBaUMsQ0FBakMsQ0FBckI7QUFDQSxZQUFJRyxjQUFjLEtBQUtGLHdCQUFMLENBQThCLENBQTlCLENBQWxCOztBQUVBdkMsbUJBQVcsWUFBVzs7QUFFcEJqUCxjQUFJdU8sTUFBSixDQUFXLEtBQUt2QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0drQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTO0FBQ0xzQix1QkFBVzJCO0FBRE4sV0FGVCxFQUlLO0FBQ0Q1QyxzQkFBVUEsUUFEVDtBQUVETSxvQkFBUSxLQUFLQTtBQUZaLFdBSkwsRUFRR1gsS0FSSCxDQVFTO0FBQ0xzQix1QkFBVztBQUROLFdBUlQsRUFXR3RCLEtBWEgsQ0FXUyxVQUFTMUosSUFBVCxFQUFlO0FBQ3BCLGlCQUFLaUksU0FBTCxDQUFlUSxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE1BQTlCO0FBQ0E3SjtBQUNBb0I7QUFDRCxXQUpNLENBSUxjLElBSkssQ0FJQSxJQUpBLENBWFQsRUFnQkc2SSxJQWhCSDs7QUFrQkF6TyxjQUFJdU8sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0dtQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTa0QsV0FGVCxFQUVzQjtBQUNsQjdDLHNCQUFVQSxRQURRO0FBRWxCTSxvQkFBUSxLQUFLQTtBQUZLLFdBRnRCLEVBTUdYLEtBTkgsQ0FNUyxVQUFTMUosSUFBVCxFQUFlO0FBQ3BCQTtBQUNELFdBUkgsRUFTRzJKLElBVEg7QUFXRCxTQS9CVSxDQStCVDdJLElBL0JTLENBK0JKLElBL0JJLENBQVgsRUErQmMsT0FBTyxFQS9CckI7QUFnQ0QsT0FqTXdEOztBQW1NekQ7Ozs7O0FBS0EwSixxQkFBZSx1QkFBU3hMLE9BQVQsRUFBa0I7O0FBRS9CLGFBQUtpSixTQUFMLENBQWVRLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEIsT0FBOUI7QUFDQSxhQUFLVixVQUFMLENBQWdCVSxHQUFoQixDQUFvQixTQUFwQixFQUErQixPQUEvQjs7QUFFQSxZQUFJa0UsaUJBQWlCLEtBQUtGLDJCQUFMLENBQWlDaEMsS0FBS0MsR0FBTCxDQUFTMUwsUUFBUTJMLFdBQWpCLEVBQThCM0wsUUFBUTRMLFFBQXRDLENBQWpDLENBQXJCO0FBQ0EsWUFBSWdDLGNBQWMsS0FBS0Ysd0JBQUwsQ0FBOEJqQyxLQUFLQyxHQUFMLENBQVMxTCxRQUFRMkwsV0FBakIsRUFBOEIzTCxRQUFRNEwsUUFBdEMsQ0FBOUIsQ0FBbEI7QUFDQSxlQUFPZ0MsWUFBWS9CLE9BQW5COztBQUVBM1AsWUFBSXVPLE1BQUosQ0FBVyxLQUFLdkIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHd0IsS0FESCxDQUNTLEVBQUNzQixXQUFXMkIsY0FBWixFQURULEVBRUdoRCxJQUZIOztBQUlBek8sWUFBSXVPLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHeUIsS0FESCxDQUNTa0QsV0FEVCxFQUVHakQsSUFGSDtBQUdELE9BeE53RDs7QUEwTnpEOEMsbUNBQTZCLHFDQUFTN0IsUUFBVCxFQUFtQjtBQUM5QyxZQUFJRyxJQUFJLEtBQUsvQyxRQUFMLEdBQWdCLENBQUM0QyxRQUFqQixHQUE0QkEsUUFBcEM7QUFDQSxZQUFJK0IsaUJBQWlCLGlCQUFpQjVCLENBQWpCLEdBQXFCLFdBQTFDOztBQUVBLGVBQU80QixjQUFQO0FBQ0QsT0EvTndEOztBQWlPekRELGdDQUEwQixrQ0FBUzlCLFFBQVQsRUFBbUI7QUFDM0MsWUFBSXZCLE1BQU0sS0FBS3BCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCZ0YscUJBQWxCLEdBQTBDMUUsS0FBcEQ7O0FBRUEsWUFBSTJFLGlCQUFpQixDQUFDdEMsV0FBV3ZCLEdBQVosSUFBbUJBLEdBQW5CLEdBQXlCLEVBQTlDO0FBQ0E2RCx5QkFBaUJDLE1BQU1ELGNBQU4sSUFBd0IsQ0FBeEIsR0FBNEJ6QyxLQUFLcEIsR0FBTCxDQUFTb0IsS0FBS0MsR0FBTCxDQUFTd0MsY0FBVCxFQUF5QixDQUF6QixDQUFULEVBQXNDLENBQUMsRUFBdkMsQ0FBN0M7O0FBRUEsWUFBSUwsVUFBVSxLQUFLN0UsUUFBTCxHQUFnQixDQUFDa0YsY0FBakIsR0FBa0NBLGNBQWhEO0FBQ0EsWUFBSUosa0JBQWtCLGlCQUFpQkQsT0FBakIsR0FBMkIsVUFBakQ7QUFDQSxZQUFJaEMsVUFBVSxJQUFJcUMsaUJBQWlCLEdBQW5DOztBQUVBLGVBQU87QUFDTGxDLHFCQUFXOEIsZUFETjtBQUVMakMsbUJBQVNBO0FBRkosU0FBUDtBQUlELE9BL093RDs7QUFpUHpESSxZQUFNLGdCQUFXO0FBQ2YsZUFBTyxJQUFJOEIseUJBQUosRUFBUDtBQUNEO0FBblB3RCxLQUEzQixDQUFoQzs7QUFzUEEsV0FBT0EseUJBQVA7QUFDRCxHQXpQMkMsQ0FBNUM7QUEyUEQsQ0EvUEQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSWxTLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUEsTUFBSXVTLHVCQUF1QjFTLE1BQU1wQixNQUFOLENBQWE7O0FBRXRDOzs7QUFHQStULGVBQVcsQ0FMMkI7O0FBT3RDOzs7QUFHQUMsa0JBQWNoUSxTQVZ3Qjs7QUFZdEM7Ozs7QUFJQWxELFVBQU0sY0FBUzRFLE9BQVQsRUFBa0I7QUFDdEIsVUFBSSxDQUFDcEUsUUFBUTJTLFFBQVIsQ0FBaUJ2TyxRQUFRMkwsV0FBekIsQ0FBTCxFQUE0QztBQUMxQyxjQUFNLElBQUl6TyxLQUFKLENBQVUsb0NBQVYsQ0FBTjtBQUNEOztBQUVELFdBQUtzUixjQUFMLENBQW9CeE8sUUFBUTJMLFdBQTVCO0FBQ0QsS0F0QnFDOztBQXdCdEM7OztBQUdBNkMsb0JBQWdCLHdCQUFTN0MsV0FBVCxFQUFzQjtBQUNwQyxVQUFJQSxlQUFlLENBQW5CLEVBQXNCO0FBQ3BCLGNBQU0sSUFBSXpPLEtBQUosQ0FBVSx3Q0FBVixDQUFOO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLa04sUUFBTCxFQUFKLEVBQXFCO0FBQ25CLGFBQUtpRSxTQUFMLEdBQWlCMUMsV0FBakI7QUFDRDtBQUNELFdBQUsyQyxZQUFMLEdBQW9CM0MsV0FBcEI7QUFDRCxLQXBDcUM7O0FBc0N0Qzs7O0FBR0E4QyxnQkFBWSxzQkFBVztBQUNyQixhQUFPLENBQUMsS0FBS3JFLFFBQUwsRUFBRCxJQUFvQixLQUFLaUUsU0FBTCxJQUFrQixLQUFLQyxZQUFMLEdBQW9CLENBQWpFO0FBQ0QsS0EzQ3FDOztBQTZDdEM7OztBQUdBSSxpQkFBYSx1QkFBVztBQUN0QixhQUFPLENBQUMsS0FBS0MsUUFBTCxFQUFELElBQW9CLEtBQUtOLFNBQUwsR0FBaUIsS0FBS0MsWUFBTCxHQUFvQixDQUFoRTtBQUNELEtBbERxQzs7QUFvRHRDTSxpQkFBYSxxQkFBUzVPLE9BQVQsRUFBa0I7QUFDN0IsVUFBSSxLQUFLeU8sVUFBTCxFQUFKLEVBQXVCO0FBQ3JCLGFBQUtJLElBQUwsQ0FBVTdPLE9BQVY7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLME8sV0FBTCxFQUFKLEVBQXdCO0FBQzdCLGFBQUtJLEtBQUwsQ0FBVzlPLE9BQVg7QUFDRDtBQUNGLEtBMURxQzs7QUE0RHRDOE8sV0FBTyxlQUFTOU8sT0FBVCxFQUFrQjtBQUN2QixVQUFJSixXQUFXSSxRQUFRSixRQUFSLElBQW9CLFlBQVcsQ0FBRSxDQUFoRDs7QUFFQSxVQUFJLENBQUMsS0FBSytPLFFBQUwsRUFBTCxFQUFzQjtBQUNwQixhQUFLTixTQUFMLEdBQWlCLENBQWpCO0FBQ0EsYUFBS3JNLElBQUwsQ0FBVSxPQUFWLEVBQW1CaEMsT0FBbkI7QUFDRCxPQUhELE1BR087QUFDTEo7QUFDRDtBQUNGLEtBckVxQzs7QUF1RXRDaVAsVUFBTSxjQUFTN08sT0FBVCxFQUFrQjtBQUN0QixVQUFJSixXQUFXSSxRQUFRSixRQUFSLElBQW9CLFlBQVcsQ0FBRSxDQUFoRDs7QUFFQSxVQUFJLENBQUMsS0FBS3dLLFFBQUwsRUFBTCxFQUFzQjtBQUNwQixhQUFLaUUsU0FBTCxHQUFpQixLQUFLQyxZQUF0QjtBQUNBLGFBQUt0TSxJQUFMLENBQVUsTUFBVixFQUFrQmhDLE9BQWxCO0FBQ0QsT0FIRCxNQUdPO0FBQ0xKO0FBQ0Q7QUFDRixLQWhGcUM7O0FBa0Z0Qzs7O0FBR0ErTyxjQUFVLG9CQUFXO0FBQ25CLGFBQU8sS0FBS04sU0FBTCxLQUFtQixDQUExQjtBQUNELEtBdkZxQzs7QUF5RnRDOzs7QUFHQWpFLGNBQVUsb0JBQVc7QUFDbkIsYUFBTyxLQUFLaUUsU0FBTCxLQUFtQixLQUFLQyxZQUEvQjtBQUNELEtBOUZxQzs7QUFnR3RDOzs7QUFHQVMsVUFBTSxnQkFBVztBQUNmLGFBQU8sS0FBS1YsU0FBWjtBQUNELEtBckdxQzs7QUF1R3RDOzs7QUFHQVcsb0JBQWdCLDBCQUFXO0FBQ3pCLGFBQU8sS0FBS1YsWUFBWjtBQUNELEtBNUdxQzs7QUE4R3RDOzs7QUFHQVcsZUFBVyxtQkFBU2xELENBQVQsRUFBWTtBQUNyQixXQUFLc0MsU0FBTCxHQUFpQjVDLEtBQUtwQixHQUFMLENBQVMsQ0FBVCxFQUFZb0IsS0FBS0MsR0FBTCxDQUFTLEtBQUs0QyxZQUFMLEdBQW9CLENBQTdCLEVBQWdDdkMsQ0FBaEMsQ0FBWixDQUFqQjs7QUFFQSxVQUFJL0wsVUFBVTtBQUNaNEwsa0JBQVUsS0FBS3lDLFNBREg7QUFFWjFDLHFCQUFhLEtBQUsyQztBQUZOLE9BQWQ7O0FBS0EsV0FBS3RNLElBQUwsQ0FBVSxXQUFWLEVBQXVCaEMsT0FBdkI7QUFDRCxLQTFIcUM7O0FBNEh0QzRILFlBQVEsa0JBQVc7QUFDakIsVUFBSSxLQUFLK0csUUFBTCxFQUFKLEVBQXFCO0FBQ25CLGFBQUtFLElBQUw7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLQyxLQUFMO0FBQ0Q7QUFDRjtBQWxJcUMsR0FBYixDQUEzQjtBQW9JQTVNLGFBQVdDLEtBQVgsQ0FBaUJpTSxvQkFBakI7O0FBRUF2UyxTQUFPc0YsT0FBUCxDQUFlLGlCQUFmLEVBQWtDLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsUUFBdkIsRUFBaUMsa0JBQWpDLEVBQXFELHFCQUFyRCxFQUE0RSwyQkFBNUUsRUFBeUcseUJBQXpHLEVBQW9JLDRCQUFwSSxFQUFrSyxVQUFTOUQsTUFBVCxFQUFpQlgsUUFBakIsRUFBMkIySyxNQUEzQixFQUFtQzZILGdCQUFuQyxFQUFxRHJHLG1CQUFyRCxFQUEwRWtGLHlCQUExRSxFQUN6SlIsdUJBRHlKLEVBQ2hJekUsMEJBRGdJLEVBQ3BHOztBQUU5RixRQUFJcUcsa0JBQWtCelQsTUFBTXBCLE1BQU4sQ0FBYTtBQUNqQ2dILGNBQVFoRCxTQUR5QjtBQUVqQ2tELGNBQVFsRCxTQUZ5Qjs7QUFJakNpRCxnQkFBVWpELFNBSnVCO0FBS2pDMkssaUJBQVczSyxTQUxzQjtBQU1qQzRLLGlCQUFXNUssU0FOc0I7O0FBUWpDOFEsaUJBQVc5USxTQVJzQjs7QUFVakMrUSxvQkFBYyxLQVZtQjs7QUFZakNqVSxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkO0FBQ0EsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCOztBQUVBLGFBQUtxSyxTQUFMLEdBQWlCck4sUUFBUWdELE9BQVIsQ0FBZ0JBLFFBQVEsQ0FBUixFQUFXTSxhQUFYLENBQXlCLDJCQUF6QixDQUFoQixDQUFqQjtBQUNBLGFBQUtnSyxTQUFMLEdBQWlCdE4sUUFBUWdELE9BQVIsQ0FBZ0JBLFFBQVEsQ0FBUixFQUFXTSxhQUFYLENBQXlCLDJCQUF6QixDQUFoQixDQUFqQjs7QUFFQSxhQUFLa1EsU0FBTCxHQUFpQixJQUFJbFQsSUFBSW9ULFNBQVIsRUFBakI7O0FBRUEsYUFBS0QsWUFBTCxHQUFvQmhPLE1BQU1rTyxJQUFOLEtBQWUsT0FBbkM7O0FBRUE7QUFDQSxhQUFLQyx3QkFBTCxHQUFnQyxJQUFJdFQsSUFBSXVULGVBQVIsQ0FBd0IsS0FBS3ZHLFNBQUwsQ0FBZSxDQUFmLENBQXhCLENBQWhDO0FBQ0EsYUFBS3dHLFdBQUwsR0FBbUIsS0FBS0MsTUFBTCxDQUFZN04sSUFBWixDQUFpQixJQUFqQixDQUFuQjs7QUFFQSxZQUFJNkosY0FBYyxLQUFLaUUsOEJBQUwsRUFBbEI7QUFDQSxhQUFLQyxNQUFMLEdBQWMsSUFBSXpCLG9CQUFKLENBQXlCLEVBQUN6QyxhQUFhRixLQUFLcEIsR0FBTCxDQUFTc0IsV0FBVCxFQUFzQixDQUF0QixDQUFkLEVBQXpCLENBQWQ7QUFDQSxhQUFLa0UsTUFBTCxDQUFZM0gsRUFBWixDQUFlLFdBQWYsRUFBNEIsS0FBSzRILFVBQUwsQ0FBZ0JoTyxJQUFoQixDQUFxQixJQUFyQixDQUE1QjtBQUNBLGFBQUsrTixNQUFMLENBQVkzSCxFQUFaLENBQWUsTUFBZixFQUF1QixVQUFTbEksT0FBVCxFQUFrQjtBQUN2QyxlQUFLK1AsS0FBTCxDQUFXL1AsT0FBWDtBQUNELFNBRnNCLENBRXJCOEIsSUFGcUIsQ0FFaEIsSUFGZ0IsQ0FBdkI7QUFHQSxhQUFLK04sTUFBTCxDQUFZM0gsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBU2xJLE9BQVQsRUFBa0I7QUFDeEMsZUFBS2dRLE1BQUwsQ0FBWWhRLE9BQVo7QUFDRCxTQUZ1QixDQUV0QjhCLElBRnNCLENBRWpCLElBRmlCLENBQXhCOztBQUlBVCxjQUFNNE8sUUFBTixDQUFlLGtCQUFmLEVBQW1DLEtBQUtDLDBCQUFMLENBQWdDcE8sSUFBaEMsQ0FBcUMsSUFBckMsQ0FBbkM7QUFDQVQsY0FBTTRPLFFBQU4sQ0FBZSxXQUFmLEVBQTRCLEtBQUtFLG1CQUFMLENBQXlCck8sSUFBekIsQ0FBOEIsSUFBOUIsQ0FBNUI7O0FBRUEsYUFBS3NPLG9CQUFMLEdBQTRCLEtBQUtDLGVBQUwsQ0FBcUJ2TyxJQUFyQixDQUEwQixJQUExQixDQUE1QjtBQUNBckcsZUFBT3FCLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUtzVCxvQkFBdkM7O0FBRUEsYUFBS0UsaUJBQUwsR0FBeUIsS0FBS0MsWUFBTCxDQUFrQnpPLElBQWxCLENBQXVCLElBQXZCLENBQXpCO0FBQ0EsYUFBSzBPLFdBQUw7O0FBRUEsWUFBSW5QLE1BQU1nSSxRQUFWLEVBQW9CO0FBQ2xCLGVBQUtvSCxXQUFMLENBQWlCcFAsTUFBTWdJLFFBQXZCO0FBQ0Q7O0FBRUQsWUFBSWhJLE1BQU1pSSxRQUFWLEVBQW9CO0FBQ2xCLGVBQUtvSCxXQUFMLENBQWlCclAsTUFBTWlJLFFBQXZCO0FBQ0Q7O0FBRUQsYUFBS3FILHdCQUFMLEdBQWdDelUsSUFBSTBVLDJCQUFKLENBQWdDQyxhQUFoQyxDQUE4QyxLQUFLdFAsUUFBTCxDQUFjLENBQWQsQ0FBOUMsRUFBZ0UsS0FBS3FMLG1CQUFMLENBQXlCOUssSUFBekIsQ0FBOEIsSUFBOUIsQ0FBaEUsQ0FBaEM7O0FBRUEsWUFBSWdQLFNBQVMsS0FBSzFCLFNBQUwsQ0FBZTNTLElBQWYsRUFBYjs7QUFFQWhCLGVBQU8wUCxVQUFQLENBQWtCLFlBQVc7QUFDM0IsY0FBSVEsY0FBYyxLQUFLaUUsOEJBQUwsRUFBbEI7QUFDQSxlQUFLQyxNQUFMLENBQVlyQixjQUFaLENBQTJCN0MsV0FBM0I7O0FBRUEsZUFBSzFDLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixFQUFDb0MsU0FBUyxDQUFWLEVBQW5COztBQUVBLGNBQUlrRixtQkFBbUIsSUFBSTdCLGdCQUFKLENBQXFCO0FBQzFDOEIsdUJBQVc3QixnQkFBZ0I4QixhQURlO0FBRTFDQyx1QkFBV3JJLG1CQUYrQjtBQUcxQ3NJLDJCQUFlLHFCQUgyQjtBQUkxQ0MsOEJBQWtCL1AsTUFBTWdRLElBSmtCO0FBSzFDQyxxQ0FBeUJqSyxPQUFPaEcsTUFBTW9HLGdCQUFiO0FBTGlCLFdBQXJCLENBQXZCO0FBT0EsZUFBSzhKLFNBQUwsR0FBaUJSLGlCQUFpQlMsV0FBakIsRUFBakI7QUFDQSxlQUFLRCxTQUFMLENBQWVuSSxLQUFmLENBQ0UsS0FBSzdILFFBRFAsRUFFRSxLQUFLMkgsU0FGUCxFQUdFLEtBQUtELFNBSFAsRUFJRTtBQUNFTyxxQkFBUyxLQUFLNkYsWUFEaEI7QUFFRTlGLG1CQUFPLEtBQUsvSCxNQUFMLENBQVlpUSxnQkFBWixJQUFnQztBQUZ6QyxXQUpGOztBQVVBWDtBQUNELFNBekJpQixDQXlCaEJoUCxJQXpCZ0IsQ0F5QlgsSUF6QlcsQ0FBbEIsRUF5QmMsR0F6QmQ7O0FBMkJBdkMsY0FBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBdEI7O0FBRUEsYUFBS0gsb0JBQUwsR0FBNEJ0RSxPQUFPdUUsWUFBUCxDQUFvQixJQUFwQixFQUEwQmhELFFBQVEsQ0FBUixDQUExQixFQUFzQyxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLE1BQWpCLEVBQXlCLFNBQXpCLENBQXRDLENBQTVCOztBQUVBLFlBQUksQ0FBQ3lDLE1BQU1xUSxTQUFYLEVBQXNCO0FBQ3BCLGVBQUtDLFlBQUwsQ0FBa0IsSUFBbEI7QUFDRDtBQUNGLE9BN0ZnQzs7QUErRmpDQyxrQ0FBNEIsc0NBQVc7QUFDckMsZUFBTyxLQUFLakIsd0JBQVo7QUFDRCxPQWpHZ0M7O0FBbUdqQy9ELDJCQUFxQiw2QkFBU3hFLEtBQVQsRUFBZ0I7QUFDbkMsWUFBSSxLQUFLeUosWUFBTCxFQUFKLEVBQXlCO0FBQ3ZCLGVBQUt2RyxTQUFMO0FBQ0QsU0FGRCxNQUVPO0FBQ0xsRCxnQkFBTTBKLGlCQUFOO0FBQ0Q7QUFDRixPQXpHZ0M7O0FBMkdqQ25DLGNBQVEsa0JBQVc7QUFDakIsWUFBSSxLQUFLa0MsWUFBTCxFQUFKLEVBQXlCO0FBQ3ZCLGVBQUt2RyxTQUFMO0FBQ0Q7QUFDRixPQS9HZ0M7O0FBaUhqQ3lHLDZCQUF1QixpQ0FBVztBQUNoQyxZQUFJeEksUUFBUyxzQkFBc0IsS0FBSy9ILE1BQTVCLEdBQXNDLEtBQUtBLE1BQUwsQ0FBWWlRLGdCQUFsRCxHQUFxRSxLQUFqRjs7QUFFQSxZQUFJLEtBQUtGLFNBQVQsRUFBb0I7QUFDbEIsZUFBS0EsU0FBTCxDQUFlcEgsU0FBZixDQUF5QjtBQUN2QkMsc0JBQVUsS0FBS3lGLE1BQUwsQ0FBWXpGLFFBQVosRUFEYTtBQUV2QmIsbUJBQU9BO0FBRmdCLFdBQXpCO0FBSUQ7QUFDRixPQTFIZ0M7O0FBNEhqQ3hILGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWOztBQUVBLGFBQUtMLG9CQUFMOztBQUVBLGFBQUtnUCx3QkFBTCxDQUE4QnhNLE9BQTlCO0FBQ0ExSSxlQUFPcUUsbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBS3NRLG9CQUExQzs7QUFFQSxhQUFLWix3QkFBTCxDQUE4QmpILEdBQTlCLENBQWtDLEtBQWxDLEVBQXlDLEtBQUttSCxXQUE5QztBQUNBLGFBQUtuTyxRQUFMLEdBQWdCLEtBQUtELE1BQUwsR0FBYyxLQUFLRSxNQUFMLEdBQWMsSUFBNUM7QUFDRCxPQXRJZ0M7O0FBd0lqQzJPLDJCQUFxQiw2QkFBU3VCLFNBQVQsRUFBb0I7QUFDdkNBLG9CQUFZQSxjQUFjLEVBQWQsSUFBb0JBLGNBQWNwVCxTQUFsQyxJQUErQ29ULGFBQWEsTUFBeEU7O0FBRUEsYUFBS0MsWUFBTCxDQUFrQkQsU0FBbEI7QUFDRCxPQTVJZ0M7O0FBOElqQzs7O0FBR0FDLG9CQUFjLHNCQUFTSyxPQUFULEVBQWtCO0FBQzlCLFlBQUlBLE9BQUosRUFBYTtBQUNYLGVBQUtDLHdCQUFMO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS0MsMEJBQUw7QUFDRDtBQUNGLE9BdkpnQzs7QUF5SmpDN0IsdUJBQWlCLDJCQUFXO0FBQzFCLGFBQUs4QixlQUFMO0FBQ0EsYUFBS0oscUJBQUw7QUFDRCxPQTVKZ0M7O0FBOEpqQzdCLGtDQUE0QixzQ0FBVztBQUNyQyxhQUFLaUMsZUFBTDtBQUNBLGFBQUtKLHFCQUFMO0FBQ0QsT0FqS2dDOztBQW1LakM7OztBQUdBbkMsc0NBQWdDLDBDQUFXO0FBQ3pDLFlBQUlqRSxjQUFjLEtBQUtuSyxNQUFMLENBQVlpUSxnQkFBOUI7O0FBRUEsWUFBSSxFQUFFLHNCQUFzQixLQUFLalEsTUFBN0IsQ0FBSixFQUEwQztBQUN4Q21LLHdCQUFjLE1BQU0sS0FBS3pDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCb0IsV0FBdEM7QUFDRCxTQUZELE1BRU8sSUFBSSxPQUFPcUIsV0FBUCxJQUFzQixRQUExQixFQUFvQztBQUN6QyxjQUFJQSxZQUFZeUcsT0FBWixDQUFvQixJQUFwQixFQUEwQnpHLFlBQVlyRCxNQUFaLEdBQXFCLENBQS9DLE1BQXNELENBQUMsQ0FBM0QsRUFBOEQ7QUFDNURxRCwwQkFBYzBHLFNBQVMxRyxZQUFZMkcsT0FBWixDQUFvQixJQUFwQixFQUEwQixFQUExQixDQUFULEVBQXdDLEVBQXhDLENBQWQ7QUFDRCxXQUZELE1BRU8sSUFBSTNHLFlBQVl5RyxPQUFaLENBQW9CLEdBQXBCLEVBQXlCekcsWUFBWXJELE1BQVosR0FBcUIsQ0FBOUMsSUFBbUQsQ0FBdkQsRUFBMEQ7QUFDL0RxRCwwQkFBY0EsWUFBWTJHLE9BQVosQ0FBb0IsR0FBcEIsRUFBeUIsRUFBekIsQ0FBZDtBQUNBM0csMEJBQWM0RyxXQUFXNUcsV0FBWCxJQUEwQixHQUExQixHQUFnQyxLQUFLekMsU0FBTCxDQUFlLENBQWYsRUFBa0JvQixXQUFoRTtBQUNEO0FBQ0YsU0FQTSxNQU9BO0FBQ0wsZ0JBQU0sSUFBSXBOLEtBQUosQ0FBVSxlQUFWLENBQU47QUFDRDs7QUFFRCxlQUFPeU8sV0FBUDtBQUNELE9BdkxnQzs7QUF5TGpDd0csdUJBQWlCLDJCQUFXO0FBQzFCLFlBQUl4RyxjQUFjLEtBQUtpRSw4QkFBTCxFQUFsQjs7QUFFQSxZQUFJakUsV0FBSixFQUFpQjtBQUNmLGVBQUtrRSxNQUFMLENBQVlyQixjQUFaLENBQTJCNkQsU0FBUzFHLFdBQVQsRUFBc0IsRUFBdEIsQ0FBM0I7QUFDRDtBQUNGLE9BL0xnQzs7QUFpTWpDc0csZ0NBQTBCLG9DQUFVO0FBQ2xDLGFBQUtPLGdCQUFMLENBQXNCdEssRUFBdEIsQ0FBeUIsdURBQXpCLEVBQWtGLEtBQUtvSSxpQkFBdkY7QUFDRCxPQW5NZ0M7O0FBcU1qQzRCLGtDQUE0QixzQ0FBVTtBQUNwQyxhQUFLTSxnQkFBTCxDQUFzQmpLLEdBQXRCLENBQTBCLHVEQUExQixFQUFtRixLQUFLK0gsaUJBQXhGO0FBQ0QsT0F2TWdDOztBQXlNakNFLG1CQUFhLHVCQUFXO0FBQ3RCLGFBQUtnQyxnQkFBTCxHQUF3QixJQUFJdFcsSUFBSXVULGVBQVIsQ0FBd0IsS0FBS2xPLFFBQUwsQ0FBYyxDQUFkLENBQXhCLEVBQTBDO0FBQ2hFa1IsMkJBQWlCO0FBRCtDLFNBQTFDLENBQXhCO0FBR0QsT0E3TWdDOztBQStNakNDLHVCQUFpQix5QkFBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0M7QUFBQTs7QUFDL0MsWUFBSUMsWUFBWSxLQUFLdlIsTUFBTCxDQUFZbkIsSUFBWixFQUFoQjtBQUNBLFlBQUkyUyxjQUFjbFgsUUFBUWdELE9BQVIsQ0FBZ0JnVSxZQUFoQixDQUFsQjtBQUNBLFlBQUkzUyxPQUFPdkQsU0FBU29XLFdBQVQsQ0FBWDs7QUFFQSxhQUFLNUosU0FBTCxDQUFlNkosTUFBZixDQUFzQkQsV0FBdEI7O0FBRUEsWUFBSSxLQUFLRSxtQkFBVCxFQUE4QjtBQUM1QixlQUFLQSxtQkFBTCxDQUF5Qi9RLE1BQXpCO0FBQ0EsZUFBS2dSLGlCQUFMLENBQXVCaE0sUUFBdkI7QUFDRDs7QUFFRGhILGFBQUs0UyxTQUFMOztBQUVBLGFBQUtHLG1CQUFMLEdBQTJCRixXQUEzQjtBQUNBLGFBQUtHLGlCQUFMLEdBQXlCSixTQUF6QjtBQUNBLGFBQUtLLGVBQUwsR0FBdUJQLE9BQXZCOztBQUVBMVIscUJBQWEsWUFBTTtBQUNqQixnQkFBSytSLG1CQUFMLENBQXlCLENBQXpCLEVBQTRCRyxLQUE1QjtBQUNELFNBRkQ7QUFHRCxPQXBPZ0M7O0FBc09qQzs7O0FBR0FDLHVCQUFpQix5QkFBU1IsWUFBVCxFQUF1QjtBQUN0QyxZQUFJQyxZQUFZLEtBQUt2UixNQUFMLENBQVluQixJQUFaLEVBQWhCO0FBQ0EsWUFBSTJTLGNBQWNsWCxRQUFRZ0QsT0FBUixDQUFnQmdVLFlBQWhCLENBQWxCO0FBQ0EsWUFBSTNTLE9BQU92RCxTQUFTb1csV0FBVCxDQUFYOztBQUVBLGFBQUs3SixTQUFMLENBQWU4SixNQUFmLENBQXNCRCxXQUF0Qjs7QUFFQSxZQUFJLEtBQUtPLHFCQUFULEVBQWdDO0FBQzlCLGVBQUtBLHFCQUFMLENBQTJCcE0sUUFBM0I7QUFDQSxlQUFLcU0sdUJBQUwsQ0FBNkJyUixNQUE3QjtBQUNEOztBQUVEaEMsYUFBSzRTLFNBQUw7O0FBRUEsYUFBS1MsdUJBQUwsR0FBK0JSLFdBQS9CO0FBQ0EsYUFBS08scUJBQUwsR0FBNkJSLFNBQTdCO0FBQ0QsT0F6UGdDOztBQTJQakM7Ozs7OztBQU1BbkMsbUJBQWEscUJBQVM3UyxJQUFULEVBQWVtQyxPQUFmLEVBQXdCO0FBQ25DLFlBQUluQyxJQUFKLEVBQVU7QUFDUm1DLG9CQUFVQSxXQUFXLEVBQXJCO0FBQ0FBLGtCQUFRSixRQUFSLEdBQW1CSSxRQUFRSixRQUFSLElBQW9CLFlBQVcsQ0FBRSxDQUFwRDs7QUFFQSxjQUFJeUQsT0FBTyxJQUFYO0FBQ0FoRyxpQkFBT2tXLGdCQUFQLENBQXdCMVYsSUFBeEIsRUFBOEJ5QyxJQUE5QixDQUFtQyxVQUFTa1QsSUFBVCxFQUFlO0FBQ2hEblEsaUJBQUsrUCxlQUFMLENBQXFCeFgsUUFBUWdELE9BQVIsQ0FBZ0I0VSxJQUFoQixDQUFyQjtBQUNBLGdCQUFJeFQsUUFBUXNMLFNBQVosRUFBdUI7QUFDckJqSSxtQkFBS3lMLEtBQUw7QUFDRDtBQUNEOU8sb0JBQVFKLFFBQVI7QUFDRCxXQU5ELEVBTUcsWUFBVztBQUNaLGtCQUFNLElBQUkxQyxLQUFKLENBQVUsd0JBQXdCVyxJQUFsQyxDQUFOO0FBQ0QsV0FSRDtBQVNELFNBZEQsTUFjTztBQUNMLGdCQUFNLElBQUlYLEtBQUosQ0FBVSwyQkFBVixDQUFOO0FBQ0Q7QUFDRixPQW5SZ0M7O0FBcVJqQzs7Ozs7O0FBTUF1VCxtQkFBYSxxQkFBU2tDLE9BQVQsRUFBa0IzUyxPQUFsQixFQUEyQjtBQUN0Q0Esa0JBQVVBLFdBQVcsRUFBckI7QUFDQUEsZ0JBQVFKLFFBQVIsR0FBbUJJLFFBQVFKLFFBQVIsSUFBb0IsWUFBVyxDQUFFLENBQXBEOztBQUVBLFlBQUlvQixPQUFPLFlBQVc7QUFDcEIsY0FBSWhCLFFBQVFzTCxTQUFaLEVBQXVCO0FBQ3JCLGlCQUFLd0QsS0FBTDtBQUNEO0FBQ0Q5TyxrQkFBUUosUUFBUjtBQUNELFNBTFUsQ0FLVGtDLElBTFMsQ0FLSixJQUxJLENBQVg7O0FBT0EsWUFBSSxLQUFLb1IsZUFBTCxLQUF5QlAsT0FBN0IsRUFBc0M7QUFDcEMzUjtBQUNBO0FBQ0Q7O0FBRUQsWUFBSTJSLE9BQUosRUFBYTtBQUNYLGNBQUl0UCxPQUFPLElBQVg7QUFDQWhHLGlCQUFPa1csZ0JBQVAsQ0FBd0JaLE9BQXhCLEVBQWlDclMsSUFBakMsQ0FBc0MsVUFBU2tULElBQVQsRUFBZTtBQUNuRG5RLGlCQUFLcVAsZUFBTCxDQUFxQkMsT0FBckIsRUFBOEJhLElBQTlCO0FBQ0F4UztBQUNELFdBSEQsRUFHRyxZQUFXO0FBQ1osa0JBQU0sSUFBSTlELEtBQUosQ0FBVSx3QkFBd0JXLElBQWxDLENBQU47QUFDRCxXQUxEO0FBTUQsU0FSRCxNQVFPO0FBQ0wsZ0JBQU0sSUFBSVgsS0FBSixDQUFVLDJCQUFWLENBQU47QUFDRDtBQUNGLE9BdFRnQzs7QUF3VGpDcVQsb0JBQWMsc0JBQVNuSSxLQUFULEVBQWdCOztBQUU1QixZQUFJLEtBQUtnSCxTQUFMLENBQWVxRSxRQUFmLEVBQUosRUFBK0I7QUFDN0I7QUFDRDs7QUFFRCxZQUFJLEtBQUtDLHVCQUFMLENBQTZCdEwsTUFBTXRKLE1BQW5DLENBQUosRUFBK0M7QUFDN0MsZUFBS29ULDBCQUFMO0FBQ0Q7O0FBRUQsZ0JBQVE5SixNQUFNaUosSUFBZDtBQUNFLGVBQUssVUFBTDtBQUNBLGVBQUssV0FBTDs7QUFFRSxnQkFBSSxLQUFLeEIsTUFBTCxDQUFZbEIsUUFBWixNQUEwQixDQUFDLEtBQUtnRix3QkFBTCxDQUE4QnZMLEtBQTlCLENBQS9CLEVBQXFFO0FBQ25FO0FBQ0Q7O0FBRURBLGtCQUFNd0wsT0FBTixDQUFjQyxjQUFkOztBQUVBLGdCQUFJQyxTQUFTMUwsTUFBTXdMLE9BQU4sQ0FBY0UsTUFBM0I7QUFDQSxnQkFBSUMsZ0JBQWdCLEtBQUsxRSxZQUFMLEdBQW9CLENBQUN5RSxNQUFyQixHQUE4QkEsTUFBbEQ7O0FBRUEsZ0JBQUlFLGFBQWE1TCxNQUFNd0wsT0FBTixDQUFjSSxVQUEvQjs7QUFFQSxnQkFBSSxFQUFFLGNBQWNBLFVBQWhCLENBQUosRUFBaUM7QUFDL0JBLHlCQUFXNUosUUFBWCxHQUFzQixLQUFLeUYsTUFBTCxDQUFZekYsUUFBWixFQUF0QjtBQUNEOztBQUVELGdCQUFJMkosZ0JBQWdCLENBQWhCLElBQXFCLEtBQUtsRSxNQUFMLENBQVlsQixRQUFaLEVBQXpCLEVBQWlEO0FBQy9DO0FBQ0Q7O0FBRUQsZ0JBQUlvRixnQkFBZ0IsQ0FBaEIsSUFBcUIsS0FBS2xFLE1BQUwsQ0FBWXpGLFFBQVosRUFBekIsRUFBaUQ7QUFDL0M7QUFDRDs7QUFFRCxnQkFBSXdCLFdBQVdvSSxXQUFXNUosUUFBWCxHQUNiMkosZ0JBQWdCLEtBQUtsRSxNQUFMLENBQVliLGNBQVosRUFESCxHQUNrQytFLGFBRGpEOztBQUdBLGlCQUFLbEUsTUFBTCxDQUFZWixTQUFaLENBQXNCckQsUUFBdEI7O0FBRUE7O0FBRUYsZUFBSyxXQUFMO0FBQ0V4RCxrQkFBTXdMLE9BQU4sQ0FBY0MsY0FBZDs7QUFFQSxnQkFBSSxLQUFLaEUsTUFBTCxDQUFZbEIsUUFBWixNQUEwQixDQUFDLEtBQUtnRix3QkFBTCxDQUE4QnZMLEtBQTlCLENBQS9CLEVBQXFFO0FBQ25FO0FBQ0Q7O0FBRUQsZ0JBQUksS0FBS2lILFlBQVQsRUFBdUI7QUFDckIsbUJBQUtSLElBQUw7QUFDRCxhQUZELE1BRU87QUFDTCxtQkFBS0MsS0FBTDtBQUNEOztBQUVEMUcsa0JBQU13TCxPQUFOLENBQWNLLFVBQWQ7QUFDQTs7QUFFRixlQUFLLFlBQUw7QUFDRTdMLGtCQUFNd0wsT0FBTixDQUFjQyxjQUFkOztBQUVBLGdCQUFJLEtBQUtoRSxNQUFMLENBQVlsQixRQUFaLE1BQTBCLENBQUMsS0FBS2dGLHdCQUFMLENBQThCdkwsS0FBOUIsQ0FBL0IsRUFBcUU7QUFDbkU7QUFDRDs7QUFFRCxnQkFBSSxLQUFLaUgsWUFBVCxFQUF1QjtBQUNyQixtQkFBS1AsS0FBTDtBQUNELGFBRkQsTUFFTztBQUNMLG1CQUFLRCxJQUFMO0FBQ0Q7O0FBRUR6RyxrQkFBTXdMLE9BQU4sQ0FBY0ssVUFBZDtBQUNBOztBQUVGLGVBQUssU0FBTDtBQUNFLGlCQUFLQyxhQUFMLEdBQXFCLElBQXJCOztBQUVBLGdCQUFJLEtBQUtyRSxNQUFMLENBQVlwQixVQUFaLEVBQUosRUFBOEI7QUFDNUIsbUJBQUtJLElBQUw7QUFDRCxhQUZELE1BRU8sSUFBSSxLQUFLZ0IsTUFBTCxDQUFZbkIsV0FBWixFQUFKLEVBQStCO0FBQ3BDLG1CQUFLSSxLQUFMO0FBQ0Q7O0FBRUQ7QUEzRUo7QUE2RUQsT0EvWWdDOztBQWlaakM7Ozs7QUFJQTRFLCtCQUF5QixpQ0FBUzlVLE9BQVQsRUFBa0I7QUFDekMsV0FBRztBQUNELGNBQUlBLFFBQVF1VixZQUFSLElBQXdCdlYsUUFBUXVWLFlBQVIsQ0FBcUIscUJBQXJCLENBQTVCLEVBQXlFO0FBQ3ZFLG1CQUFPLElBQVA7QUFDRDtBQUNEdlYsb0JBQVVBLFFBQVFxRyxVQUFsQjtBQUNELFNBTEQsUUFLU3JHLE9BTFQ7O0FBT0EsZUFBTyxLQUFQO0FBQ0QsT0E5WmdDOztBQWdhakMrVSxnQ0FBMEIsa0NBQVN2TCxLQUFULEVBQWdCO0FBQ3hDLFlBQUkyRCxJQUFJM0QsTUFBTXdMLE9BQU4sQ0FBY1EsTUFBZCxDQUFxQkMsS0FBN0I7O0FBRUEsWUFBSSxFQUFFLHVCQUF1QmpNLE1BQU13TCxPQUFOLENBQWNJLFVBQXZDLENBQUosRUFBd0Q7QUFDdEQ1TCxnQkFBTXdMLE9BQU4sQ0FBY0ksVUFBZCxDQUF5Qk0saUJBQXpCLEdBQTZDLEtBQUtDLG9CQUFMLEVBQTdDO0FBQ0Q7O0FBRUQsWUFBSUMsY0FBY3BNLE1BQU13TCxPQUFOLENBQWNJLFVBQWQsQ0FBeUJNLGlCQUEzQztBQUNBLGVBQU8sS0FBS2pGLFlBQUwsR0FBb0IsS0FBS25HLFNBQUwsQ0FBZSxDQUFmLEVBQWtCb0IsV0FBbEIsR0FBZ0N5QixDQUFoQyxHQUFvQ3lJLFdBQXhELEdBQXNFekksSUFBSXlJLFdBQWpGO0FBQ0QsT0F6YWdDOztBQTJhakNELDRCQUFzQixnQ0FBVztBQUMvQixZQUFJQyxjQUFjLEtBQUtoVCxNQUFMLENBQVlpVCxnQkFBOUI7O0FBRUEsWUFBSSxPQUFPRCxXQUFQLElBQXNCLFFBQTFCLEVBQW9DO0FBQ2xDQSx3QkFBY0EsWUFBWWxDLE9BQVosQ0FBb0IsSUFBcEIsRUFBMEIsRUFBMUIsQ0FBZDtBQUNEOztBQUVELFlBQUkvSSxRQUFROEksU0FBU21DLFdBQVQsRUFBc0IsRUFBdEIsQ0FBWjtBQUNBLFlBQUlqTCxRQUFRLENBQVIsSUFBYSxDQUFDaUwsV0FBbEIsRUFBK0I7QUFDN0IsaUJBQU8sS0FBS3RMLFNBQUwsQ0FBZSxDQUFmLEVBQWtCb0IsV0FBekI7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBT2YsS0FBUDtBQUNEO0FBQ0YsT0F4YmdDOztBQTBiakMrQixpQkFBVyxxQkFBVztBQUNwQixlQUFPLEtBQUt3RCxLQUFMLENBQVc3VCxLQUFYLENBQWlCLElBQWpCLEVBQXVCQyxTQUF2QixDQUFQO0FBQ0QsT0E1YmdDOztBQThiakM7Ozs7O0FBS0E0VCxhQUFPLGVBQVM5TyxPQUFULEVBQWtCO0FBQ3ZCQSxrQkFBVUEsV0FBVyxFQUFyQjtBQUNBQSxrQkFBVSxPQUFPQSxPQUFQLElBQWtCLFVBQWxCLEdBQStCLEVBQUNKLFVBQVVJLE9BQVgsRUFBL0IsR0FBcURBLE9BQS9EOztBQUVBLFlBQUksQ0FBQyxLQUFLNlAsTUFBTCxDQUFZbEIsUUFBWixFQUFMLEVBQTZCO0FBQzNCLGVBQUszTSxJQUFMLENBQVUsVUFBVixFQUFzQjtBQUNwQjBTLHlCQUFhO0FBRE8sV0FBdEI7O0FBSUEsZUFBS3RGLFNBQUwsQ0FBZXVGLFVBQWYsQ0FBMEIsWUFBVztBQUNuQyxpQkFBSzlFLE1BQUwsQ0FBWWYsS0FBWixDQUFrQjlPLE9BQWxCO0FBQ0QsV0FGeUIsQ0FFeEI4QixJQUZ3QixDQUVuQixJQUZtQixDQUExQjtBQUdEO0FBQ0YsT0FoZGdDOztBQWtkakNrTyxjQUFRLGdCQUFTaFEsT0FBVCxFQUFrQjtBQUN4QixZQUFJSixXQUFXSSxRQUFRSixRQUFSLElBQW9CLFlBQVcsQ0FBRSxDQUFoRDtBQUFBLFlBQ0lrUixTQUFTLEtBQUsxQixTQUFMLENBQWUzUyxJQUFmLEVBRGI7QUFBQSxZQUVJcU8sVUFBVTlLLFFBQVE0VSxTQUFSLElBQXFCLE1BRm5DOztBQUlBLGFBQUtyRCxTQUFMLENBQWVqRyxTQUFmLENBQXlCLFlBQVc7QUFDbEN3Rjs7QUFFQSxlQUFLNUgsU0FBTCxDQUFlMkwsUUFBZixHQUEwQnBMLEdBQTFCLENBQThCLGdCQUE5QixFQUFnRCxFQUFoRDtBQUNBLGVBQUsrRix3QkFBTCxDQUE4QmpILEdBQTlCLENBQWtDLEtBQWxDLEVBQXlDLEtBQUttSCxXQUE5Qzs7QUFFQSxlQUFLMU4sSUFBTCxDQUFVLFdBQVYsRUFBdUI7QUFDckIwUyx5QkFBYTtBQURRLFdBQXZCOztBQUlBOVU7QUFDRCxTQVh3QixDQVd2QmtDLElBWHVCLENBV2xCLElBWGtCLENBQXpCLEVBV2NnSixPQVhkO0FBWUQsT0FuZWdDOztBQXFlakM7Ozs7OztBQU1BRCxnQkFBVSxvQkFBVztBQUNuQixlQUFPLEtBQUtnRSxJQUFMLENBQVU1VCxLQUFWLENBQWdCLElBQWhCLEVBQXNCQyxTQUF0QixDQUFQO0FBQ0QsT0E3ZWdDOztBQStlakM7Ozs7OztBQU1BMlQsWUFBTSxjQUFTN08sT0FBVCxFQUFrQjtBQUN0QkEsa0JBQVVBLFdBQVcsRUFBckI7QUFDQUEsa0JBQVUsT0FBT0EsT0FBUCxJQUFrQixVQUFsQixHQUErQixFQUFDSixVQUFVSSxPQUFYLEVBQS9CLEdBQXFEQSxPQUEvRDs7QUFFQSxhQUFLZ0MsSUFBTCxDQUFVLFNBQVYsRUFBcUI7QUFDbkIwUyx1QkFBYTtBQURNLFNBQXJCOztBQUlBLGFBQUt0RixTQUFMLENBQWV1RixVQUFmLENBQTBCLFlBQVc7QUFDbkMsZUFBSzlFLE1BQUwsQ0FBWWhCLElBQVosQ0FBaUI3TyxPQUFqQjtBQUNELFNBRnlCLENBRXhCOEIsSUFGd0IsQ0FFbkIsSUFGbUIsQ0FBMUI7QUFHRCxPQWhnQmdDOztBQWtnQmpDaU8sYUFBTyxlQUFTL1AsT0FBVCxFQUFrQjtBQUN2QixZQUFJSixXQUFXSSxRQUFRSixRQUFSLElBQW9CLFlBQVcsQ0FBRSxDQUFoRDtBQUFBLFlBQ0lrUixTQUFTLEtBQUsxQixTQUFMLENBQWUzUyxJQUFmLEVBRGI7QUFBQSxZQUVJcU8sVUFBVTlLLFFBQVE0VSxTQUFSLElBQXFCLE1BRm5DOztBQUlBLGFBQUtyRCxTQUFMLENBQWUxRyxRQUFmLENBQXdCLFlBQVc7QUFDakNpRzs7QUFFQSxlQUFLNUgsU0FBTCxDQUFlMkwsUUFBZixHQUEwQnBMLEdBQTFCLENBQThCLGdCQUE5QixFQUFnRCxNQUFoRDtBQUNBLGVBQUsrRix3QkFBTCxDQUE4QnRILEVBQTlCLENBQWlDLEtBQWpDLEVBQXdDLEtBQUt3SCxXQUE3Qzs7QUFFQSxlQUFLMU4sSUFBTCxDQUFVLFVBQVYsRUFBc0I7QUFDcEIwUyx5QkFBYTtBQURPLFdBQXRCOztBQUlBOVU7QUFDRCxTQVh1QixDQVd0QmtDLElBWHNCLENBV2pCLElBWGlCLENBQXhCLEVBV2NnSixPQVhkO0FBWUQsT0FuaEJnQzs7QUFxaEJqQzs7Ozs7QUFLQWxELGNBQVEsZ0JBQVM1SCxPQUFULEVBQWtCO0FBQ3hCLFlBQUksS0FBSzZQLE1BQUwsQ0FBWWxCLFFBQVosRUFBSixFQUE0QjtBQUMxQixlQUFLRSxJQUFMLENBQVU3TyxPQUFWO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBSzhPLEtBQUwsQ0FBVzlPLE9BQVg7QUFDRDtBQUNGLE9BaGlCZ0M7O0FBa2lCakM7OztBQUdBOFUsa0JBQVksc0JBQVc7QUFDckIsZUFBTyxLQUFLbE4sTUFBTCxDQUFZM00sS0FBWixDQUFrQixJQUFsQixFQUF3QkMsU0FBeEIsQ0FBUDtBQUNELE9BdmlCZ0M7O0FBeWlCakM7OztBQUdBMlcsb0JBQWMsd0JBQVc7QUFDdkIsZUFBTyxLQUFLaEMsTUFBTCxDQUFZekYsUUFBWixFQUFQO0FBQ0QsT0E5aUJnQzs7QUFnakJqQzs7O0FBR0EwRixrQkFBWSxvQkFBUzFILEtBQVQsRUFBZ0I7QUFDMUIsYUFBS21KLFNBQUwsQ0FBZS9GLGFBQWYsQ0FBNkJwRCxLQUE3QjtBQUNEO0FBcmpCZ0MsS0FBYixDQUF0Qjs7QUF3akJBO0FBQ0ErRyxvQkFBZ0I4QixhQUFoQixHQUFnQztBQUM5QixpQkFBV2xELHlCQURtQjtBQUU5QixpQkFBV2pGLDBCQUZtQjtBQUc5QixnQkFBVWlGLHlCQUhvQjtBQUk5QixjQUFRUjtBQUpzQixLQUFoQzs7QUFPQTs7OztBQUlBNEIsb0JBQWdCdk0sZ0JBQWhCLEdBQW1DLFVBQVMvSCxJQUFULEVBQWVnSSxRQUFmLEVBQXlCO0FBQzFELFVBQUksRUFBRUEsU0FBU3BJLFNBQVQsWUFBOEJvTyxtQkFBaEMsQ0FBSixFQUEwRDtBQUN4RCxjQUFNLElBQUkzTCxLQUFKLENBQVUsbURBQVYsQ0FBTjtBQUNEOztBQUVELFdBQUsrVCxhQUFMLENBQW1CcFcsSUFBbkIsSUFBMkJnSSxRQUEzQjtBQUNELEtBTkQ7O0FBUUFYLGVBQVdDLEtBQVgsQ0FBaUJnTixlQUFqQjs7QUFFQSxXQUFPQSxlQUFQO0FBQ0QsR0FsbEJpQyxDQUFsQztBQW1sQkQsQ0E3dEJEOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUNBLE1BQUl0VCxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLHFCQUFmLEVBQXNDLFlBQVc7QUFDL0MsV0FBT3pGLE1BQU1wQixNQUFOLENBQWE7O0FBRWxCMFEsYUFBTyxDQUZXO0FBR2xCRCxnQkFBVSxHQUhRO0FBSWxCTSxjQUFRLDZCQUpVOztBQU1sQjs7Ozs7O0FBTUFqUSxZQUFNLGNBQVM0RSxPQUFULEVBQWtCO0FBQ3RCQSxrQkFBVUEsV0FBVyxFQUFyQjs7QUFFQSxhQUFLcUwsTUFBTCxHQUFjckwsUUFBUXFMLE1BQVIsSUFBa0IsS0FBS0EsTUFBckM7QUFDQSxhQUFLTixRQUFMLEdBQWdCL0ssUUFBUStLLFFBQVIsS0FBcUJ6TSxTQUFyQixHQUFpQzBCLFFBQVErSyxRQUF6QyxHQUFvRCxLQUFLQSxRQUF6RTtBQUNBLGFBQUtDLEtBQUwsR0FBYWhMLFFBQVFnTCxLQUFSLEtBQWtCMU0sU0FBbEIsR0FBOEIwQixRQUFRZ0wsS0FBdEMsR0FBOEMsS0FBS0EsS0FBaEU7QUFDRCxPQWxCaUI7O0FBb0JsQjs7Ozs7Ozs7QUFRQTVCLGFBQU8sZUFBU3hLLE9BQVQsRUFBa0J5SyxRQUFsQixFQUE0QkMsUUFBNUIsRUFBc0N0SixPQUF0QyxFQUErQyxDQUNyRCxDQTdCaUI7O0FBK0JsQjs7Ozs7O0FBTUFtSyxpQkFBVyxtQkFBU25LLE9BQVQsRUFBa0IsQ0FDNUIsQ0F0Q2lCOztBQXdDbEI7OztBQUdBNkssZ0JBQVUsa0JBQVNqTCxRQUFULEVBQW1CLENBQzVCLENBNUNpQjs7QUE4Q2xCOzs7QUFHQW1WLGtCQUFZLG9CQUFTblYsUUFBVCxFQUFtQixDQUM5QixDQWxEaUI7O0FBb0RsQjs7QUFFQXVFLGVBQVMsbUJBQVcsQ0FDbkIsQ0F2RGlCOztBQXlEbEI7Ozs7O0FBS0FxSCxxQkFBZSx1QkFBU25DLFFBQVQsRUFBbUJDLFFBQW5CLEVBQTZCdEosT0FBN0IsRUFBc0MsQ0FDcEQsQ0EvRGlCOztBQWlFbEI7OztBQUdBaU0sWUFBTSxnQkFBVztBQUNmLGNBQU0sSUFBSS9PLEtBQUosQ0FBVSx1QkFBVixDQUFOO0FBQ0Q7QUF0RWlCLEtBQWIsQ0FBUDtBQXdFRCxHQXpFRDtBQTBFRCxDQTlFRDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJckIsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBT3NGLE9BQVAsQ0FBZSxlQUFmLEVBQWdDLENBQUMsUUFBRCxFQUFXLFVBQVM5RCxNQUFULEVBQWlCOztBQUUxRDs7O0FBR0EsUUFBSTJYLGdCQUFnQnRaLE1BQU1wQixNQUFOLENBQWE7O0FBRS9COzs7OztBQUtBYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtFLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUswQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2lDLE1BQUwsR0FBY0gsS0FBZDs7QUFFQSxhQUFLQyxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7O0FBRUEsYUFBS0wscUJBQUwsR0FBNkJwRSxPQUFPcUUsYUFBUCxDQUFxQixJQUFyQixFQUEyQjlDLFFBQVEsQ0FBUixDQUEzQixFQUF1QyxDQUNsRSxNQURrRSxFQUMxRCxNQUQwRCxFQUNsRCxXQURrRCxFQUNyQyxXQURxQyxFQUN4QixRQUR3QixFQUNkLFFBRGMsRUFDSixhQURJLENBQXZDLENBQTdCOztBQUlBLGFBQUsrQyxvQkFBTCxHQUE0QnRFLE9BQU91RSxZQUFQLENBQW9CLElBQXBCLEVBQTBCaEQsUUFBUSxDQUFSLENBQTFCLEVBQXNDLENBQUMsTUFBRCxFQUFTLE9BQVQsQ0FBdEMsRUFBeURrRCxJQUF6RCxDQUE4RCxJQUE5RCxDQUE1QjtBQUNELE9BbkI4Qjs7QUFxQi9CQyxnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjs7QUFFQSxhQUFLTCxvQkFBTDtBQUNBLGFBQUtGLHFCQUFMOztBQUVBLGFBQUtGLFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxJQUE1QztBQUNEO0FBNUI4QixLQUFiLENBQXBCOztBQStCQVUsZUFBV0MsS0FBWCxDQUFpQjZTLGFBQWpCOztBQUVBM1gsV0FBTytFLDJCQUFQLENBQW1DNFMsYUFBbkMsRUFBa0QsQ0FDaEQsVUFEZ0QsRUFDcEMsU0FEb0MsRUFDekIsUUFEeUIsQ0FBbEQ7O0FBSUEsV0FBT0EsYUFBUDtBQUNELEdBM0MrQixDQUFoQztBQTRDRCxDQWpERDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLENBQUMsWUFBVztBQUNWOztBQUNBLE1BQUluWixTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLFdBQWYsRUFBNEIsQ0FBQyxVQUFELEVBQWEsMkJBQWIsRUFBMEMsUUFBMUMsRUFBb0QsWUFBcEQsRUFBa0UsVUFBU3pFLFFBQVQsRUFBbUJxUix5QkFBbkIsRUFBOEMxUSxNQUE5QyxFQUFzRDRYLFVBQXRELEVBQWtFO0FBQzlKLFFBQUlDLGFBQWEsQ0FBakI7QUFDQSxRQUFJQyxnQkFBZ0IsQ0FBcEI7QUFDQSxRQUFJQyxrQkFBa0IsR0FBdEI7O0FBRUEsUUFBSUMsWUFBWTNaLE1BQU1wQixNQUFOLENBQWE7O0FBRTNCYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDekMsZ0JBQVEwVyxRQUFSLENBQWlCLG9CQUFqQjs7QUFFQSxhQUFLL1QsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUs2SCxTQUFMLEdBQWlCdE4sUUFBUWdELE9BQVIsQ0FBZ0JBLFFBQVEsQ0FBUixFQUFXTSxhQUFYLENBQXlCLHlCQUF6QixDQUFoQixDQUFqQjtBQUNBLGFBQUtxVyxjQUFMLEdBQXNCM1osUUFBUWdELE9BQVIsQ0FBZ0JBLFFBQVEsQ0FBUixFQUFXTSxhQUFYLENBQXlCLDhCQUF6QixDQUFoQixDQUF0Qjs7QUFFQSxhQUFLc1csSUFBTCxHQUFZLEtBQUt0TSxTQUFMLENBQWUsQ0FBZixFQUFrQm9CLFdBQWxCLEdBQWdDOEssZUFBNUM7QUFDQSxhQUFLSyxLQUFMLEdBQWFQLFVBQWI7QUFDQSxhQUFLOUYsU0FBTCxHQUFpQixJQUFJbFQsSUFBSW9ULFNBQVIsRUFBakI7O0FBRUEsYUFBS29HLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEtBQW5COztBQUVBVixtQkFBV1csV0FBWCxDQUF1QjFOLEVBQXZCLENBQTBCLFFBQTFCLEVBQW9DLEtBQUsyTixTQUFMLENBQWUvVCxJQUFmLENBQW9CLElBQXBCLENBQXBDOztBQUVBLGFBQUt5UCxTQUFMLEdBQWlCLElBQUl4RCx5QkFBSixFQUFqQjs7QUFFQSxhQUFLeE0sUUFBTCxDQUFja0ksR0FBZCxDQUFrQixTQUFsQixFQUE2QixNQUE3Qjs7QUFFQSxZQUFJcEksTUFBTWdJLFFBQVYsRUFBb0I7QUFDbEIsZUFBS29ILFdBQUwsQ0FBaUJwUCxNQUFNZ0ksUUFBdkI7QUFDRDs7QUFFRCxZQUFJaEksTUFBTXlVLGFBQVYsRUFBeUI7QUFDdkIsZUFBS0MsZ0JBQUwsQ0FBc0IxVSxNQUFNeVUsYUFBNUI7QUFDRDs7QUFFRCxZQUFJaEYsU0FBUyxLQUFLMUIsU0FBTCxDQUFlM1MsSUFBZixFQUFiOztBQUVBLGFBQUt1Wix5QkFBTDtBQUNBLGFBQUtDLFFBQUw7O0FBRUE5SyxtQkFBVyxZQUFXO0FBQ3BCLGVBQUs1SixRQUFMLENBQWNrSSxHQUFkLENBQWtCLFNBQWxCLEVBQTZCLE9BQTdCO0FBQ0FxSDtBQUNELFNBSFUsQ0FHVGhQLElBSFMsQ0FHSixJQUhJLENBQVgsRUFHYyxPQUFPLEVBQVAsR0FBWSxDQUgxQjs7QUFLQXZDLGNBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQXRCOztBQUVBLGFBQUtILG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEJoRCxRQUFRLENBQVIsQ0FBMUIsRUFBc0MsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixNQUFqQixFQUF5QixTQUF6QixDQUF0QyxDQUE1QjtBQUNELE9BOUMwQjs7QUFnRDNCOzs7QUFHQXNYLHlCQUFtQiwyQkFBU3RELFlBQVQsRUFBdUI7QUFDeEMsWUFBSUMsWUFBWSxLQUFLdlIsTUFBTCxDQUFZbkIsSUFBWixFQUFoQjtBQUNBLFlBQUkyUyxjQUFjcFcsU0FBU2tXLFlBQVQsRUFBdUJDLFNBQXZCLENBQWxCOztBQUVBLGFBQUswQyxjQUFMLENBQW9CeEMsTUFBcEIsQ0FBMkJELFdBQTNCOztBQUVBLFlBQUksS0FBS3FELDRCQUFULEVBQXVDO0FBQ3JDLGVBQUtBLDRCQUFMLENBQWtDbFUsTUFBbEM7QUFDQSxlQUFLbVUsMEJBQUwsQ0FBZ0NuUCxRQUFoQztBQUNEOztBQUVELGFBQUtrUCw0QkFBTCxHQUFvQ3JELFdBQXBDO0FBQ0EsYUFBS3NELDBCQUFMLEdBQWtDdkQsU0FBbEM7QUFDRCxPQWhFMEI7O0FBa0UzQjs7O0FBR0FILHVCQUFpQix5QkFBU0UsWUFBVCxFQUF1QjtBQUFBOztBQUN0QyxZQUFJQyxZQUFZLEtBQUt2UixNQUFMLENBQVluQixJQUFaLEVBQWhCO0FBQ0EsWUFBSTJTLGNBQWNwVyxTQUFTa1csWUFBVCxFQUF1QkMsU0FBdkIsQ0FBbEI7O0FBRUEsYUFBSzNKLFNBQUwsQ0FBZTZKLE1BQWYsQ0FBc0JELFdBQXRCOztBQUVBLFlBQUksS0FBS3VELFlBQVQsRUFBdUI7QUFDckIsZUFBS3BELGlCQUFMLENBQXVCaE0sUUFBdkI7QUFDRDs7QUFFRCxhQUFLb1AsWUFBTCxHQUFvQnZELFdBQXBCO0FBQ0EsYUFBS0csaUJBQUwsR0FBeUJKLFNBQXpCOztBQUVBNVIscUJBQWEsWUFBTTtBQUNqQixnQkFBS29WLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUJsRCxLQUFyQjtBQUNELFNBRkQ7QUFHRCxPQXJGMEI7O0FBdUYzQjs7O0FBR0E0Qyx3QkFBa0IsMEJBQVNsWSxJQUFULEVBQWU7QUFDL0IsWUFBSUEsSUFBSixFQUFVO0FBQ1JSLGlCQUFPa1csZ0JBQVAsQ0FBd0IxVixJQUF4QixFQUE4QnlDLElBQTlCLENBQW1DLFVBQVNrVCxJQUFULEVBQWU7QUFDaEQsaUJBQUswQyxpQkFBTCxDQUF1QnRhLFFBQVFnRCxPQUFSLENBQWdCNFUsS0FBSzhDLElBQUwsRUFBaEIsQ0FBdkI7QUFDRCxXQUZrQyxDQUVqQ3hVLElBRmlDLENBRTVCLElBRjRCLENBQW5DLEVBRWMsWUFBVztBQUN2QixrQkFBTSxJQUFJNUUsS0FBSixDQUFVLHdCQUF3QlcsSUFBbEMsQ0FBTjtBQUNELFdBSkQ7QUFLRCxTQU5ELE1BTU87QUFDTCxnQkFBTSxJQUFJWCxLQUFKLENBQVUsMkJBQVYsQ0FBTjtBQUNEO0FBQ0YsT0FwRzBCOztBQXNHM0I7OztBQUdBdVQsbUJBQWEscUJBQVM1UyxJQUFULEVBQWU7QUFDMUIsWUFBSUEsSUFBSixFQUFVO0FBQ1JSLGlCQUFPa1csZ0JBQVAsQ0FBd0IxVixJQUF4QixFQUE4QnlDLElBQTlCLENBQW1DLFVBQVNrVCxJQUFULEVBQWU7QUFDaEQsaUJBQUtkLGVBQUwsQ0FBcUI5VyxRQUFRZ0QsT0FBUixDQUFnQjRVLEtBQUs4QyxJQUFMLEVBQWhCLENBQXJCO0FBQ0QsV0FGa0MsQ0FFakN4VSxJQUZpQyxDQUU1QixJQUY0QixDQUFuQyxFQUVjLFlBQVc7QUFDdkIsa0JBQU0sSUFBSTVFLEtBQUosQ0FBVSx3QkFBd0JXLElBQWxDLENBQU47QUFDRCxXQUpEO0FBS0QsU0FORCxNQU1PO0FBQ0wsZ0JBQU0sSUFBSVgsS0FBSixDQUFVLDJCQUFWLENBQU47QUFDRDtBQUNGLE9BbkgwQjs7QUFxSDNCMlksaUJBQVcscUJBQVc7QUFDcEIsWUFBSVUsV0FBVyxLQUFLZCxLQUFwQjs7QUFFQSxhQUFLTyx5QkFBTDs7QUFFQSxZQUFJTyxhQUFhcEIsYUFBYixJQUE4QixLQUFLTSxLQUFMLEtBQWVOLGFBQWpELEVBQWdFO0FBQzlELGVBQUs1RCxTQUFMLENBQWVwSCxTQUFmLENBQXlCO0FBQ3ZCQyxzQkFBVSxLQURhO0FBRXZCYixtQkFBTztBQUZnQixXQUF6QjtBQUlEOztBQUVELGFBQUtpTSxJQUFMLEdBQVksS0FBS3RNLFNBQUwsQ0FBZSxDQUFmLEVBQWtCb0IsV0FBbEIsR0FBZ0M4SyxlQUE1QztBQUNELE9BbEkwQjs7QUFvSTNCWSxpQ0FBMkIscUNBQVc7QUFDcEMsWUFBSVEsU0FBUyxLQUFLQyxlQUFMLEVBQWI7O0FBRUEsWUFBSUQsVUFBVSxLQUFLZixLQUFMLEtBQWVOLGFBQTdCLEVBQTRDO0FBQzFDLGVBQUt1QixnQkFBTDtBQUNBLGNBQUksS0FBS2hCLFFBQVQsRUFBbUI7QUFDakIsaUJBQUtpQixrQkFBTDtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLQyxxQkFBTDtBQUNEO0FBQ0YsU0FQRCxNQU9PLElBQUksQ0FBQ0osTUFBRCxJQUFXLEtBQUtmLEtBQUwsS0FBZU4sYUFBOUIsRUFBNkM7QUFDbEQsZUFBS3VCLGdCQUFMO0FBQ0EsY0FBSSxLQUFLZixXQUFULEVBQXNCO0FBQ3BCLGlCQUFLaUIscUJBQUw7QUFDRCxXQUZELE1BRU87QUFDTCxpQkFBS0Qsa0JBQUw7QUFDRDtBQUNGOztBQUVELGFBQUtoQixXQUFMLEdBQW1CLEtBQUtELFFBQUwsR0FBZ0IsS0FBbkM7QUFDRCxPQXhKMEI7O0FBMEozQm1CLGNBQVEsa0JBQVc7QUFDakIsYUFBS0gsZ0JBQUw7O0FBRUEsWUFBSUYsU0FBUyxLQUFLQyxlQUFMLEVBQWI7O0FBRUEsWUFBSSxLQUFLZixRQUFULEVBQW1CO0FBQ2pCLGVBQUtpQixrQkFBTDtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtoQixXQUFULEVBQXNCO0FBQzNCLGVBQUtpQixxQkFBTDtBQUNELFNBRk0sTUFFQSxJQUFJSixNQUFKLEVBQVk7QUFDakIsZUFBS0kscUJBQUw7QUFDRCxTQUZNLE1BRUEsSUFBSSxDQUFDSixNQUFMLEVBQWE7QUFDbEIsZUFBS0csa0JBQUw7QUFDRDs7QUFFRCxhQUFLakIsUUFBTCxHQUFnQixLQUFLQyxXQUFMLEdBQW1CLEtBQW5DO0FBQ0QsT0ExSzBCOztBQTRLM0JtQix1QkFBaUIsMkJBQVc7QUFDMUIsWUFBSTdCLFdBQVdXLFdBQVgsQ0FBdUJtQixVQUF2QixFQUFKLEVBQXlDO0FBQ3ZDLGlCQUFPLFVBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxXQUFQO0FBQ0Q7QUFDRixPQWxMMEI7O0FBb0wzQkMsc0JBQWdCLDBCQUFXO0FBQ3pCLFlBQUksS0FBS3ZCLEtBQUwsS0FBZU4sYUFBbkIsRUFBa0M7QUFDaEMsaUJBQU8sVUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLE9BQVA7QUFDRDtBQUNGLE9BMUwwQjs7QUE0TDNCc0IsdUJBQWlCLDJCQUFXO0FBQzFCLFlBQUlRLElBQUksVUFBUjtBQUNBLFlBQUksT0FBTyxLQUFLelYsTUFBTCxDQUFZMFYsUUFBbkIsS0FBZ0MsUUFBcEMsRUFBOEM7QUFDNUNELGNBQUksS0FBS3pWLE1BQUwsQ0FBWTBWLFFBQVosQ0FBcUJaLElBQXJCLEVBQUo7QUFDRDs7QUFFRCxZQUFJVyxLQUFLLFVBQVQsRUFBcUI7QUFDbkIsaUJBQU9oQyxXQUFXVyxXQUFYLENBQXVCbUIsVUFBdkIsRUFBUDtBQUNELFNBRkQsTUFFTyxJQUFJRSxLQUFLLFdBQVQsRUFBc0I7QUFDM0IsaUJBQU9oQyxXQUFXVyxXQUFYLENBQXVCdUIsV0FBdkIsRUFBUDtBQUNELFNBRk0sTUFFQSxJQUFJRixFQUFFRyxNQUFGLENBQVMsQ0FBVCxFQUFZLENBQVosS0FBa0IsT0FBdEIsRUFBK0I7QUFDcEMsY0FBSUMsTUFBTUosRUFBRUssS0FBRixDQUFRLEdBQVIsRUFBYSxDQUFiLENBQVY7QUFDQSxjQUFJRCxJQUFJakYsT0FBSixDQUFZLElBQVosS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUJpRixrQkFBTUEsSUFBSUQsTUFBSixDQUFXLENBQVgsRUFBY0MsSUFBSS9PLE1BQUosR0FBYSxDQUEzQixDQUFOO0FBQ0Q7O0FBRUQsY0FBSWlCLFFBQVE5TixPQUFPOGIsVUFBbkI7O0FBRUEsaUJBQU9oSixTQUFTOEksR0FBVCxLQUFpQjlOLFFBQVE4TixHQUFoQztBQUNELFNBVE0sTUFTQTtBQUNMLGNBQUlHLEtBQUsvYixPQUFPZ2MsVUFBUCxDQUFrQlIsQ0FBbEIsQ0FBVDtBQUNBLGlCQUFPTyxHQUFHRSxPQUFWO0FBQ0Q7QUFDRixPQW5OMEI7O0FBcU4zQnpCLGdCQUFVLG9CQUFXO0FBQ25CLFlBQUksS0FBS1IsS0FBTCxLQUFlUCxVQUFuQixFQUErQjtBQUM3QixjQUFJLENBQUMsS0FBSzFULE1BQUwsQ0FBWW1XLGFBQWpCLEVBQWdDO0FBQzlCLGlCQUFLblcsTUFBTCxDQUFZbVcsYUFBWixHQUE0QixJQUE1QjtBQUNEOztBQUVELGNBQUlDLGdCQUFnQixNQUFNLEtBQUtwVyxNQUFMLENBQVltVyxhQUFaLENBQTBCckYsT0FBMUIsQ0FBa0MsR0FBbEMsRUFBdUMsRUFBdkMsQ0FBMUI7QUFDQSxlQUFLaUQsY0FBTCxDQUFvQjlMLEdBQXBCLENBQXdCO0FBQ3RCRixtQkFBT3FPLGdCQUFnQixHQUREO0FBRXRCL0wscUJBQVM7QUFGYSxXQUF4Qjs7QUFLQSxlQUFLM0MsU0FBTCxDQUFlTyxHQUFmLENBQW1CO0FBQ2pCRixtQkFBTyxLQUFLL0gsTUFBTCxDQUFZbVcsYUFBWixHQUE0QjtBQURsQixXQUFuQjs7QUFJQSxlQUFLek8sU0FBTCxDQUFlTyxHQUFmLENBQW1CLE1BQW5CLEVBQTJCbU8sZ0JBQWdCLEdBQTNDO0FBQ0Q7QUFDRixPQXZPMEI7O0FBeU8zQkMsa0JBQVksb0JBQVNoZCxJQUFULEVBQWU7QUFDekIsYUFBS21ILElBQUwsQ0FBVW5ILElBQVYsRUFBZ0I7QUFDZGlkLHFCQUFXLElBREc7QUFFZHZPLGlCQUFPOU4sT0FBTzhiLFVBRkE7QUFHZDNCLHVCQUFhLEtBQUtrQixlQUFMO0FBSEMsU0FBaEI7QUFLRCxPQS9PMEI7O0FBaVAzQkosd0JBQWtCLDRCQUFXO0FBQzNCLFlBQUlxQixPQUFPLElBQVg7O0FBRUEsYUFBSy9WLElBQUwsQ0FBVSxRQUFWLEVBQW9CO0FBQ2xCOFYscUJBQVcsSUFETztBQUVsQkUsMEJBQWdCLEtBQUt2QixlQUFMLEVBRkU7QUFHbEJ3Qix1QkFBYSxLQUFLakIsY0FBTCxFQUhLO0FBSWxCTSxpQkFBTyxpQkFBVztBQUNoQlMsaUJBQUtyQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0FxQyxpQkFBS3BDLFdBQUwsR0FBbUIsS0FBbkI7QUFDRCxXQVBpQjtBQVFsQnVCLG9CQUFVLG9CQUFXO0FBQ25CYSxpQkFBS3JDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQXFDLGlCQUFLcEMsV0FBTCxHQUFtQixJQUFuQjtBQUNELFdBWGlCO0FBWWxCcE0saUJBQU85TixPQUFPOGIsVUFaSTtBQWFsQjNCLHVCQUFhLEtBQUtrQixlQUFMO0FBYkssU0FBcEI7QUFlRCxPQW5RMEI7O0FBcVEzQkYsNkJBQXVCLGlDQUFXO0FBQ2hDLFlBQUksS0FBS25CLEtBQUwsS0FBZU4sYUFBbkIsRUFBa0M7QUFDaEMsZUFBSzBDLFVBQUwsQ0FBZ0IsYUFBaEI7QUFDQSxlQUFLdEMsY0FBTCxDQUFvQjVQLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLEVBQWxDO0FBQ0EsZUFBS3VELFNBQUwsQ0FBZXZELElBQWYsQ0FBb0IsT0FBcEIsRUFBNkIsRUFBN0I7O0FBRUEsZUFBSzhQLEtBQUwsR0FBYU4sYUFBYjs7QUFFQSxlQUFLNUQsU0FBTCxDQUFlbkksS0FBZixDQUNFLEtBQUs3SCxRQURQLEVBRUUsS0FBSzJILFNBRlAsRUFHRSxLQUFLcU0sY0FIUCxFQUlFLEVBQUMvTCxTQUFTLEtBQVYsRUFBaUJELE9BQU8sS0FBeEIsRUFKRjs7QUFPQSxlQUFLc08sVUFBTCxDQUFnQixjQUFoQjtBQUNEO0FBQ0YsT0F0UjBCOztBQXdSM0JsQiwwQkFBb0IsOEJBQVc7QUFDN0IsWUFBSSxLQUFLbEIsS0FBTCxLQUFlUCxVQUFuQixFQUErQjtBQUM3QixlQUFLMkMsVUFBTCxDQUFnQixVQUFoQjs7QUFFQSxlQUFLdEcsU0FBTCxDQUFlcE4sT0FBZjs7QUFFQSxlQUFLb1IsY0FBTCxDQUFvQjVQLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLEVBQWxDO0FBQ0EsZUFBS3VELFNBQUwsQ0FBZXZELElBQWYsQ0FBb0IsT0FBcEIsRUFBNkIsRUFBN0I7O0FBRUEsZUFBSzhQLEtBQUwsR0FBYVAsVUFBYjtBQUNBLGVBQUtlLFFBQUw7O0FBRUEsZUFBSzRCLFVBQUwsQ0FBZ0IsV0FBaEI7QUFDRDtBQUNGLE9BdFMwQjs7QUF3UzNCOVYsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7O0FBRUEsYUFBS0wsb0JBQUw7O0FBRUEsYUFBS0osUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtELE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUEvUzBCLEtBQWIsQ0FBaEI7O0FBa1RBLGFBQVNpTixRQUFULENBQWtCMkosQ0FBbEIsRUFBcUI7QUFDbkIsYUFBTyxDQUFDL0osTUFBTW9FLFdBQVcyRixDQUFYLENBQU4sQ0FBRCxJQUF5QkMsU0FBU0QsQ0FBVCxDQUFoQztBQUNEOztBQUVEaFcsZUFBV0MsS0FBWCxDQUFpQmtULFNBQWpCOztBQUVBLFdBQU9BLFNBQVA7QUFDRCxHQTlUMkIsQ0FBNUI7QUErVEQsQ0FuVUQ7OztBQ2hCQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxDQUFDLFlBQVc7QUFDVjs7QUFFQXpaLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCc0YsT0FBeEIsQ0FBZ0MsaUJBQWhDLEVBQW1ELENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsVUFBUzlELE1BQVQsRUFBaUJYLFFBQWpCLEVBQTJCOztBQUVuRyxRQUFJMGIsa0JBQWtCMWMsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFakNjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtnWCxJQUFMLEdBQVksS0FBSzlXLFFBQUwsQ0FBYyxDQUFkLEVBQWlCOFcsSUFBN0I7QUFDQTlZLGNBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQXRCO0FBQ0QsT0FUZ0M7O0FBV2pDQyxnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjtBQUNBLGFBQUtULFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxLQUFLNlcsSUFBTCxHQUFZLEtBQUtDLFVBQUwsR0FBa0IsSUFBMUU7QUFDRDtBQWRnQyxLQUFiLENBQXRCOztBQWlCQXBXLGVBQVdDLEtBQVgsQ0FBaUJpVyxlQUFqQjtBQUNBL2EsV0FBTytFLDJCQUFQLENBQW1DZ1csZUFBbkMsRUFBb0QsQ0FBQyxNQUFELENBQXBEOztBQUVBLFdBQU9BLGVBQVA7QUFDRCxHQXZCa0QsQ0FBbkQ7QUF3QkQsQ0EzQkQ7OztBQ2hCQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxDQUFDLFlBQVc7QUFDVjs7QUFFQXhjLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCc0YsT0FBeEIsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixVQUFTOUQsTUFBVCxFQUFpQlgsUUFBakIsRUFBMkI7O0FBRWhHLFFBQUk2YixlQUFlN2MsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFOUJjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFBQTs7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtJLHFCQUFMLEdBQTZCcEUsT0FBT3FFLGFBQVAsQ0FBcUIsSUFBckIsRUFBMkIsS0FBS0gsUUFBTCxDQUFjLENBQWQsQ0FBM0IsRUFBNkMsQ0FDeEUsTUFEd0UsRUFDaEUsT0FEZ0UsRUFDdkQsUUFEdUQsRUFDN0MsTUFENkMsQ0FBN0MsQ0FBN0I7O0FBSUEsYUFBS0ksb0JBQUwsR0FBNEJ0RSxPQUFPdUUsWUFBUCxDQUFvQixJQUFwQixFQUEwQmhELFFBQVEsQ0FBUixDQUExQixFQUFzQyxDQUNoRSxZQURnRSxFQUNsRCxTQURrRCxFQUN2QyxVQUR1QyxFQUMzQixVQUQyQixFQUNmLFdBRGUsQ0FBdEMsRUFFekI7QUFBQSxpQkFBVWlELE9BQU8wTixJQUFQLEdBQWMzVCxRQUFRdEIsTUFBUixDQUFldUgsTUFBZixFQUF1QixFQUFDME4sV0FBRCxFQUF2QixDQUFkLEdBQXFEMU4sTUFBL0Q7QUFBQSxTQUZ5QixDQUE1Qjs7QUFJQXRDLGNBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQXRCO0FBQ0QsT0FoQjZCOztBQWtCOUJDLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWOztBQUVBLGFBQUtQLHFCQUFMO0FBQ0EsYUFBS0Usb0JBQUw7O0FBRUEsYUFBS0osUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLElBQTVDO0FBQ0Q7QUF6QjZCLEtBQWIsQ0FBbkI7O0FBNEJBVSxlQUFXQyxLQUFYLENBQWlCb1csWUFBakI7QUFDQWxiLFdBQU8rRSwyQkFBUCxDQUFtQ21XLFlBQW5DLEVBQWlELENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsUUFBakIsQ0FBakQ7O0FBRUEsV0FBT0EsWUFBUDtBQUNELEdBbEMrQyxDQUFoRDtBQW1DRCxDQXRDRDs7O0FDaEJBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLENBQUMsWUFBVztBQUNWOztBQUVBM2MsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JzRixPQUF4QixDQUFnQyxVQUFoQyxFQUE0QyxDQUFDLFFBQUQsRUFBVyxVQUFTOUQsTUFBVCxFQUFpQjs7QUFFdEUsUUFBSW1iLFdBQVc5YyxNQUFNcEIsTUFBTixDQUFhO0FBQzFCYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtFLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUswQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2lDLE1BQUwsR0FBY0gsS0FBZDtBQUNBOUIsY0FBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBdEI7QUFDRCxPQU55Qjs7QUFRMUJDLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWO0FBQ0EsYUFBS1QsUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLElBQTVDO0FBQ0Q7QUFYeUIsS0FBYixDQUFmOztBQWNBVSxlQUFXQyxLQUFYLENBQWlCcVcsUUFBakI7QUFDQW5iLFdBQU8rRSwyQkFBUCxDQUFtQ29XLFFBQW5DLEVBQTZDLENBQUMsb0JBQUQsQ0FBN0M7O0FBRUEsS0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixTQUFsQixFQUE2QixNQUE3QixFQUFxQy9TLE9BQXJDLENBQTZDLFVBQUNnVCxJQUFELEVBQU9oUyxDQUFQLEVBQWE7QUFDeEQ5TCxhQUFPeVIsY0FBUCxDQUFzQm9NLFNBQVMvZCxTQUEvQixFQUEwQ2dlLElBQTFDLEVBQWdEO0FBQzlDMWEsYUFBSyxlQUFZO0FBQ2YsY0FBSTJhLDZCQUEwQmpTLElBQUksQ0FBSixHQUFRLE1BQVIsR0FBaUJnUyxJQUEzQyxDQUFKO0FBQ0EsaUJBQU83YyxRQUFRZ0QsT0FBUixDQUFnQixLQUFLMkMsUUFBTCxDQUFjLENBQWQsRUFBaUJrWCxJQUFqQixDQUFoQixFQUF3Q3RaLElBQXhDLENBQTZDdVosT0FBN0MsQ0FBUDtBQUNEO0FBSjZDLE9BQWhEO0FBTUQsS0FQRDs7QUFTQSxXQUFPRixRQUFQO0FBQ0QsR0E3QjJDLENBQTVDO0FBOEJELENBakNEOzs7QUNoQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVTtBQUNUOztBQUVBNWMsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JzRixPQUF4QixDQUFnQyxZQUFoQyxFQUE4QyxDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFVBQVNrRyxNQUFULEVBQWlCaEssTUFBakIsRUFBeUI7O0FBRTFGLFFBQUlzYixhQUFhamQsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFNUI7Ozs7O0FBS0FjLFlBQU0sY0FBU3dELE9BQVQsRUFBa0JXLEtBQWxCLEVBQXlCOEIsS0FBekIsRUFBZ0M7QUFBQTs7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBS2dhLFNBQUwsR0FBaUJoZCxRQUFRZ0QsT0FBUixDQUFnQkEsUUFBUSxDQUFSLEVBQVdNLGFBQVgsQ0FBeUIsc0JBQXpCLENBQWhCLENBQWpCO0FBQ0EsYUFBS29DLE1BQUwsR0FBYy9CLEtBQWQ7O0FBRUEsYUFBS3NaLGVBQUwsQ0FBcUJqYSxPQUFyQixFQUE4QlcsS0FBOUIsRUFBcUM4QixLQUFyQzs7QUFFQSxhQUFLQyxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLFlBQU07QUFDaEMsZ0JBQUs2RSxJQUFMLENBQVUsU0FBVjtBQUNBLGdCQUFLVCxRQUFMLEdBQWdCLE1BQUtxWCxTQUFMLEdBQWlCLE1BQUt0WCxNQUFMLEdBQWMsSUFBL0M7QUFDRCxTQUhEO0FBSUQsT0FsQjJCOztBQW9CNUJ1WCx1QkFBaUIseUJBQVNqYSxPQUFULEVBQWtCVyxLQUFsQixFQUF5QjhCLEtBQXpCLEVBQWdDO0FBQUE7O0FBQy9DLFlBQUlBLE1BQU15WCxPQUFWLEVBQW1CO0FBQ2pCLGNBQUl4TSxNQUFNakYsT0FBT2hHLE1BQU15WCxPQUFiLEVBQXNCQyxNQUFoQzs7QUFFQXhaLGdCQUFNeVosT0FBTixDQUFjN1QsTUFBZCxDQUFxQjlELE1BQU15WCxPQUEzQixFQUFvQyxpQkFBUztBQUMzQyxtQkFBS0csT0FBTCxHQUFlLENBQUMsQ0FBQzdiLEtBQWpCO0FBQ0QsV0FGRDs7QUFJQSxlQUFLbUUsUUFBTCxDQUFjMkcsRUFBZCxDQUFpQixRQUFqQixFQUEyQixhQUFLO0FBQzlCb0UsZ0JBQUkvTSxNQUFNeVosT0FBVixFQUFtQixPQUFLQyxPQUF4Qjs7QUFFQSxnQkFBSTVYLE1BQU02WCxRQUFWLEVBQW9CO0FBQ2xCM1osb0JBQU1xRixLQUFOLENBQVl2RCxNQUFNNlgsUUFBbEI7QUFDRDs7QUFFRDNaLGtCQUFNeVosT0FBTixDQUFjNVksVUFBZDtBQUNELFdBUkQ7QUFTRDtBQUNGO0FBdEMyQixLQUFiLENBQWpCOztBQXlDQThCLGVBQVdDLEtBQVgsQ0FBaUJ3VyxVQUFqQjtBQUNBdGIsV0FBTytFLDJCQUFQLENBQW1DdVcsVUFBbkMsRUFBK0MsQ0FBQyxVQUFELEVBQWEsU0FBYixFQUF3QixVQUF4QixDQUEvQzs7QUFFQSxXQUFPQSxVQUFQO0FBQ0QsR0EvQzZDLENBQTlDO0FBZ0RELENBbkREOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUk5YyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPdUIsS0FBUCxDQUFhLG9CQUFiLEVBQW1DbEIsSUFBSXlCLFNBQUosQ0FBY3diLGtCQUFqRDtBQUNBdGQsU0FBT3VCLEtBQVAsQ0FBYSxvQkFBYixFQUFtQ2xCLElBQUl5QixTQUFKLENBQWN5YixrQkFBakQ7QUFDQXZkLFNBQU91QixLQUFQLENBQWEscUJBQWIsRUFBb0NsQixJQUFJeUIsU0FBSixDQUFjMGIsbUJBQWxEOztBQUVBeGQsU0FBT3NGLE9BQVAsQ0FBZSxZQUFmLEVBQTZCLENBQUMsUUFBRCxFQUFXLFVBQVM5RCxNQUFULEVBQWlCO0FBQ3ZELFFBQUlpYyxhQUFhNWQsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFNUJjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsWUFBSXpDLFFBQVEsQ0FBUixFQUFXUSxRQUFYLENBQW9CQyxXQUFwQixPQUFzQyxZQUExQyxFQUF3RDtBQUN0RCxnQkFBTSxJQUFJbkMsS0FBSixDQUFVLHFEQUFWLENBQU47QUFDRDs7QUFFRCxhQUFLb0UsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtnQyxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLNEMsTUFBTCxHQUFjSCxLQUFkO0FBQ0EsYUFBS2tZLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQixJQUF0Qjs7QUFFQSxhQUFLbFksTUFBTCxDQUFZbkUsR0FBWixDQUFnQixVQUFoQixFQUE0QixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQTVCOztBQUVBLGFBQUtILG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEJoRCxRQUFRLENBQVIsQ0FBMUIsRUFBc0MsQ0FDaEUsVUFEZ0UsRUFDcEQsWUFEb0QsRUFDdEMsV0FEc0MsRUFDekIsTUFEeUIsRUFDakIsTUFEaUIsRUFDVCxNQURTLEVBQ0QsU0FEQyxDQUF0QyxDQUE1Qjs7QUFJQSxhQUFLNkMscUJBQUwsR0FBNkJwRSxPQUFPcUUsYUFBUCxDQUFxQixJQUFyQixFQUEyQjlDLFFBQVEsQ0FBUixDQUEzQixFQUF1QyxDQUNsRSxjQURrRSxFQUVsRSxxQkFGa0UsRUFHbEUsbUJBSGtFLEVBSWxFLFVBSmtFLENBQXZDLENBQTdCO0FBTUQsT0F6QjJCOztBQTJCNUJtRCxnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjs7QUFFQSxhQUFLTCxvQkFBTDtBQUNBLGFBQUtGLHFCQUFMOztBQUVBLGFBQUtGLFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxJQUE1QztBQUNEO0FBbEMyQixLQUFiLENBQWpCO0FBb0NBVSxlQUFXQyxLQUFYLENBQWlCbVgsVUFBakI7O0FBRUFBLGVBQVcxVyxnQkFBWCxHQUE4QixVQUFTL0gsSUFBVCxFQUFlZ0ksUUFBZixFQUF5QjtBQUNyRCxhQUFPcEgsT0FBT1MsR0FBUCxDQUFXdWQsYUFBWCxDQUF5QjdXLGdCQUF6QixDQUEwQy9ILElBQTFDLEVBQWdEZ0ksUUFBaEQsQ0FBUDtBQUNELEtBRkQ7O0FBSUEsV0FBT3lXLFVBQVA7QUFDRCxHQTVDNEIsQ0FBN0I7QUE4Q0QsQ0F2REQ7OztBNUJqQkE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQTs7OztBQUdBMWQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxnQkFBbEMsRUFBb0QsQ0FBQyxRQUFELEVBQVcsaUJBQVgsRUFBOEIsVUFBU3JjLE1BQVQsRUFBaUIrRCxlQUFqQixFQUFrQztBQUNsSCxXQUFPO0FBQ0x1WSxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTC9TLGFBQU8sSUFIRjtBQUlMcWEsa0JBQVksS0FKUDs7QUFNTHRhLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5Qjs7QUFFaEMsZUFBTztBQUNMd1ksZUFBSyxhQUFTdGEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNuQyxnQkFBSWQsY0FBYyxJQUFJYSxlQUFKLENBQW9CN0IsS0FBcEIsRUFBMkJYLE9BQTNCLEVBQW9DeUMsS0FBcEMsQ0FBbEI7O0FBRUFoRSxtQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NkLFdBQWxDO0FBQ0FsRCxtQkFBT3ljLHFCQUFQLENBQTZCdlosV0FBN0IsRUFBMEMsMkNBQTFDO0FBQ0FsRCxtQkFBT29HLG1DQUFQLENBQTJDbEQsV0FBM0MsRUFBd0QzQixPQUF4RDs7QUFFQUEsb0JBQVFPLElBQVIsQ0FBYSxrQkFBYixFQUFpQ29CLFdBQWpDO0FBQ0EzQixvQkFBUU8sSUFBUixDQUFhLFFBQWIsRUFBdUJJLEtBQXZCOztBQUVBQSxrQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0JvRCwwQkFBWXFELE9BQVosR0FBc0J0RixTQUF0QjtBQUNBakIscUJBQU93RyxxQkFBUCxDQUE2QnRELFdBQTdCO0FBQ0EzQixzQkFBUU8sSUFBUixDQUFhLGtCQUFiLEVBQWlDYixTQUFqQztBQUNBTSx3QkFBVSxJQUFWO0FBQ0QsYUFMRDtBQU1ELFdBakJJO0FBa0JMbWIsZ0JBQU0sY0FBU3hhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCO0FBQzdCdkIsbUJBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBcEJJLFNBQVA7QUFzQkQ7QUE5QkksS0FBUDtBQWdDRCxHQWpDbUQsQ0FBcEQ7QUFtQ0QsQ0F6Q0Q7OztBNkJwR0EsQ0FBQyxZQUFVO0FBQ1Q7O0FBQ0EsTUFBSS9DLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU82ZCxTQUFQLENBQWlCLGVBQWpCLEVBQWtDLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsYUFBdkIsRUFBc0Msa0JBQXRDLEVBQTBELFVBQVNyYyxNQUFULEVBQWlCWCxRQUFqQixFQUEyQjBHLFdBQTNCLEVBQXdDNlcsZ0JBQXhDLEVBQTBEO0FBQ3BKLFdBQU87QUFDTE4sZ0JBQVUsR0FETDtBQUVMckgsZUFBUyxLQUZKOztBQUlMaFQsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPO0FBQ0x3WSxlQUFLLGFBQVN0YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDNlksVUFBaEMsRUFBNENOLFVBQTVDLEVBQXdEO0FBQzNELGdCQUFJTyxhQUFhL1csWUFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDO0FBQzNENEMsdUJBQVM7QUFEa0QsYUFBNUMsQ0FBakI7O0FBSUExRSxrQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0JnZCx5QkFBV3ZXLE9BQVgsR0FBcUJ0RixTQUFyQjtBQUNBakIscUJBQU93RyxxQkFBUCxDQUE2QnNXLFVBQTdCO0FBQ0F2Yix3QkFBVSxJQUFWO0FBQ0QsYUFKRDs7QUFNQXFiLDZCQUFpQnRXLFNBQWpCLENBQTJCcEUsS0FBM0IsRUFBa0MsWUFBVztBQUMzQzBhLCtCQUFpQkcsWUFBakIsQ0FBOEI3YSxLQUE5QjtBQUNBMGEsK0JBQWlCSSxpQkFBakIsQ0FBbUNoWixLQUFuQztBQUNBekMsd0JBQVVXLFFBQVE4QixRQUFRLElBQTFCO0FBQ0QsYUFKRDtBQUtELFdBakJJO0FBa0JMMFksZ0JBQU0sY0FBU3hhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCO0FBQzdCdkIsbUJBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBcEJJLFNBQVA7QUFzQkQ7QUE1QkksS0FBUDtBQThCRCxHQS9CaUMsQ0FBbEM7QUFnQ0QsQ0FwQ0Q7OztBQ0FBLENBQUMsWUFBVTtBQUNUOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxrQkFBbEMsRUFBc0QsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixVQUFTcmMsTUFBVCxFQUFpQitGLFdBQWpCLEVBQThCO0FBQzVHLFdBQU87QUFDTHVXLGdCQUFVLEdBREw7QUFFTDFaLFlBQU07QUFDSjRaLGFBQUssYUFBU3RhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDbkMrQixzQkFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDO0FBQzFDNEMscUJBQVM7QUFEaUMsV0FBNUM7QUFHRCxTQUxHOztBQU9KOFYsY0FBTSxjQUFTeGEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQ2hFLGlCQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQVRHO0FBRkQsS0FBUDtBQWNELEdBZnFELENBQXREO0FBaUJELENBcEJEOzs7QUNDQTs7OztBQUlBLENBQUMsWUFBVTtBQUNUOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxXQUFsQyxFQUErQyxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNyYyxNQUFULEVBQWlCK0YsV0FBakIsRUFBOEI7QUFDckcsV0FBTztBQUNMdVcsZ0JBQVUsR0FETDtBQUVMMVosWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLFlBQUlpWixTQUFTbFgsWUFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDO0FBQ3ZENEMsbUJBQVM7QUFEOEMsU0FBNUMsQ0FBYjs7QUFJQXRKLGVBQU95UixjQUFQLENBQXNCa08sTUFBdEIsRUFBOEIsVUFBOUIsRUFBMEM7QUFDeEN2YyxlQUFLLGVBQVk7QUFDZixtQkFBTyxLQUFLd0QsUUFBTCxDQUFjLENBQWQsRUFBaUJnWixRQUF4QjtBQUNELFdBSHVDO0FBSXhDak8sZUFBSyxhQUFTbFAsS0FBVCxFQUFnQjtBQUNuQixtQkFBUSxLQUFLbUUsUUFBTCxDQUFjLENBQWQsRUFBaUJnWixRQUFqQixHQUE0Qm5kLEtBQXBDO0FBQ0Q7QUFOdUMsU0FBMUM7QUFRQUMsZUFBTzJjLGtCQUFQLENBQTBCcGIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFoQkksS0FBUDtBQWtCRCxHQW5COEMsQ0FBL0M7QUF1QkQsQ0ExQkQ7OztBNUJMQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzZkLFNBQVAsQ0FBaUIsYUFBakIsRUFBZ0MsQ0FBQyxRQUFELEVBQVcsY0FBWCxFQUEyQixVQUFTcmMsTUFBVCxFQUFpQm9GLFlBQWpCLEVBQStCO0FBQ3hGLFdBQU87QUFDTGtYLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjs7QUFJTDtBQUNBO0FBQ0EvUyxhQUFPLEtBTkY7QUFPTHFhLGtCQUFZLEtBUFA7O0FBU0x0YSxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7O0FBRWhDLGVBQU8sVUFBUzlCLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDckMsY0FBSXFCLFdBQVcsSUFBSUQsWUFBSixDQUFpQmxELEtBQWpCLEVBQXdCWCxPQUF4QixFQUFpQ3lDLEtBQWpDLENBQWY7O0FBRUF6QyxrQkFBUU8sSUFBUixDQUFhLGNBQWIsRUFBNkJ1RCxRQUE3Qjs7QUFFQXJGLGlCQUFPeWMscUJBQVAsQ0FBNkJwWCxRQUE3QixFQUF1Qyx1Q0FBdkM7QUFDQXJGLGlCQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQ3FCLFFBQWxDOztBQUVBbkQsZ0JBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFXO0FBQy9CdUYscUJBQVNrQixPQUFULEdBQW1CdEYsU0FBbkI7QUFDQU0sb0JBQVFPLElBQVIsQ0FBYSxjQUFiLEVBQTZCYixTQUE3QjtBQUNBTSxzQkFBVSxJQUFWO0FBQ0QsV0FKRDs7QUFNQXZCLGlCQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRCxTQWZEO0FBZ0JEOztBQTNCSSxLQUFQO0FBOEJELEdBL0IrQixDQUFoQzs7QUFpQ0EvQyxTQUFPNmQsU0FBUCxDQUFpQixpQkFBakIsRUFBb0MsWUFBVztBQUM3QyxXQUFPO0FBQ0xDLGdCQUFVLEdBREw7QUFFTHJhLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5QjtBQUNoQyxlQUFPLFVBQVM5QixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3JDLGNBQUk5QixNQUFNc0gsS0FBVixFQUFpQjtBQUNmakksb0JBQVEsQ0FBUixFQUFXNGIsYUFBWCxDQUF5QkMsTUFBekI7QUFDQTdiLG9CQUFRLENBQVIsRUFBVzRiLGFBQVgsQ0FBeUJFLGtCQUF6QjtBQUNBOWIsb0JBQVEsQ0FBUixFQUFXNGIsYUFBWCxDQUF5QkcsY0FBekI7QUFDRDtBQUNGLFNBTkQ7QUFPRDtBQVZJLEtBQVA7QUFZRCxHQWJEO0FBZUQsQ0FyREQ7OztBQzNHQTs7OztBQUlBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7O0FBYUEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEvZSxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZkLFNBQXhCLENBQWtDLFdBQWxDLEVBQStDLENBQUMsUUFBRCxFQUFXLFlBQVgsRUFBeUIsVUFBU3JjLE1BQVQsRUFBaUJzRixVQUFqQixFQUE2QjtBQUNuRyxXQUFPO0FBQ0xnWCxnQkFBVSxHQURMO0FBRUxwYSxhQUFPLElBRkY7QUFHTEQsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPO0FBQ0x3WSxlQUFLLGFBQVN0YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDOztBQUVuQyxnQkFBSVgsU0FBUyxJQUFJaUMsVUFBSixDQUFlcEQsS0FBZixFQUFzQlgsT0FBdEIsRUFBK0J5QyxLQUEvQixDQUFiO0FBQ0FoRSxtQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NYLE1BQWxDO0FBQ0FyRCxtQkFBT3ljLHFCQUFQLENBQTZCcFosTUFBN0IsRUFBcUMsMkNBQXJDO0FBQ0FyRCxtQkFBT29HLG1DQUFQLENBQTJDL0MsTUFBM0MsRUFBbUQ5QixPQUFuRDs7QUFFQUEsb0JBQVFPLElBQVIsQ0FBYSxZQUFiLEVBQTJCdUIsTUFBM0I7QUFDQW5CLGtCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQnVELHFCQUFPa0QsT0FBUCxHQUFpQnRGLFNBQWpCO0FBQ0FqQixxQkFBT3dHLHFCQUFQLENBQTZCbkQsTUFBN0I7QUFDQTlCLHNCQUFRTyxJQUFSLENBQWEsWUFBYixFQUEyQmIsU0FBM0I7QUFDQU0sd0JBQVUsSUFBVjtBQUNELGFBTEQ7QUFNRCxXQWZJOztBQWlCTG1iLGdCQUFNLGNBQVN4YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QjtBQUM3QnZCLG1CQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQW5CSSxTQUFQO0FBcUJEO0FBMUJJLEtBQVA7QUE0QkQsR0E3QjhDLENBQS9DO0FBK0JELENBbENEOzs7QTRCbkdBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUkvQyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPNmQsU0FBUCxDQUFpQixpQkFBakIsRUFBb0MsQ0FBQyxZQUFELEVBQWUsVUFBUy9jLFVBQVQsRUFBcUI7QUFDdEUsUUFBSWllLFVBQVUsS0FBZDs7QUFFQSxXQUFPO0FBQ0xqQixnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7O0FBSUxyUyxZQUFNO0FBQ0o4WixjQUFNLGNBQVN4YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QjtBQUM3QixjQUFJLENBQUNnYyxPQUFMLEVBQWM7QUFDWkEsc0JBQVUsSUFBVjtBQUNBamUsdUJBQVdrZSxVQUFYLENBQXNCLFlBQXRCO0FBQ0Q7QUFDRGpjLGtCQUFRcUQsTUFBUjtBQUNEO0FBUEc7QUFKRCxLQUFQO0FBY0QsR0FqQm1DLENBQXBDO0FBbUJELENBeEJEOzs7QTFCQUE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSXBHLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU82ZCxTQUFQLENBQWlCLFFBQWpCLEVBQTJCLENBQUMsUUFBRCxFQUFXLFNBQVgsRUFBc0IsVUFBU3JjLE1BQVQsRUFBaUI4RixPQUFqQixFQUEwQjtBQUN6RSxXQUFPO0FBQ0x3VyxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTC9TLGFBQU8sS0FIRjtBQUlMcWEsa0JBQVksS0FKUDs7QUFNTHRhLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5Qjs7QUFFaEMsZUFBTyxVQUFTOUIsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNyQyxjQUFJeVosTUFBTSxJQUFJM1gsT0FBSixDQUFZNUQsS0FBWixFQUFtQlgsT0FBbkIsRUFBNEJ5QyxLQUE1QixDQUFWOztBQUVBekMsa0JBQVFPLElBQVIsQ0FBYSxTQUFiLEVBQXdCMmIsR0FBeEI7O0FBRUF6ZCxpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0N5WixHQUFsQzs7QUFFQXZiLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQnlCLG9CQUFRTyxJQUFSLENBQWEsU0FBYixFQUF3QmIsU0FBeEI7QUFDQU0sc0JBQVUsSUFBVjtBQUNELFdBSEQ7O0FBS0F2QixpQkFBTzJjLGtCQUFQLENBQTBCcGIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0QsU0FiRDtBQWNEOztBQXRCSSxLQUFQO0FBeUJELEdBMUIwQixDQUEzQjtBQTRCRCxDQWpDRDs7O0EyQmJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUltYyxTQUNGLENBQUMscUZBQ0MsK0VBREYsRUFDbUZ6RCxLQURuRixDQUN5RixJQUR6RixDQURGOztBQUlBMWIsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxvQkFBbEMsRUFBd0QsQ0FBQyxRQUFELEVBQVcsVUFBU3JjLE1BQVQsRUFBaUI7O0FBRWxGLFFBQUkyZCxXQUFXRCxPQUFPRSxNQUFQLENBQWMsVUFBU0MsSUFBVCxFQUFlcmdCLElBQWYsRUFBcUI7QUFDaERxZ0IsV0FBSyxPQUFPQyxRQUFRdGdCLElBQVIsQ0FBWixJQUE2QixHQUE3QjtBQUNBLGFBQU9xZ0IsSUFBUDtBQUNELEtBSGMsRUFHWixFQUhZLENBQWY7O0FBS0EsYUFBU0MsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0I7QUFDcEIsYUFBT0EsSUFBSUMsTUFBSixDQUFXLENBQVgsRUFBY0MsV0FBZCxLQUE4QkYsSUFBSUcsS0FBSixDQUFVLENBQVYsQ0FBckM7QUFDRDs7QUFFRCxXQUFPO0FBQ0w1QixnQkFBVSxHQURMO0FBRUxwYSxhQUFPeWIsUUFGRjs7QUFJTDtBQUNBO0FBQ0ExSSxlQUFTLEtBTko7QUFPTHNILGtCQUFZLElBUFA7O0FBU0x0YSxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7QUFDaEMsZUFBTyxTQUFTcEIsSUFBVCxDQUFjVixLQUFkLEVBQXFCWCxPQUFyQixFQUE4QnlDLEtBQTlCLEVBQXFDbWEsQ0FBckMsRUFBd0M1QixVQUF4QyxFQUFvRDs7QUFFekRBLHFCQUFXcmEsTUFBTXlaLE9BQWpCLEVBQTBCLFVBQVN4UyxNQUFULEVBQWlCO0FBQ3pDNUgsb0JBQVFtVSxNQUFSLENBQWV2TSxNQUFmO0FBQ0QsV0FGRDs7QUFJQSxjQUFJaVYsVUFBVSxTQUFWQSxPQUFVLENBQVNyVCxLQUFULEVBQWdCO0FBQzVCLGdCQUFJekMsT0FBTyxPQUFPd1YsUUFBUS9TLE1BQU1pSixJQUFkLENBQWxCOztBQUVBLGdCQUFJMUwsUUFBUXFWLFFBQVosRUFBc0I7QUFDcEJ6YixvQkFBTW9HLElBQU4sRUFBWSxFQUFDa0gsUUFBUXpFLEtBQVQsRUFBWjtBQUNEO0FBQ0YsV0FORDs7QUFRQSxjQUFJc1QsZUFBSjs7QUFFQXphLHVCQUFhLFlBQVc7QUFDdEJ5YSw4QkFBa0I5YyxRQUFRLENBQVIsRUFBVzRULGdCQUE3QjtBQUNBa0osNEJBQWdCeFQsRUFBaEIsQ0FBbUI2UyxPQUFPWSxJQUFQLENBQVksR0FBWixDQUFuQixFQUFxQ0YsT0FBckM7QUFDRCxXQUhEOztBQUtBcGUsaUJBQU9xRyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJwRSxLQUF6QixFQUFnQyxZQUFXO0FBQ3pDbWMsNEJBQWdCblQsR0FBaEIsQ0FBb0J3UyxPQUFPWSxJQUFQLENBQVksR0FBWixDQUFwQixFQUFzQ0YsT0FBdEM7QUFDQXBlLG1CQUFPeUcsY0FBUCxDQUFzQjtBQUNwQnZFLHFCQUFPQSxLQURhO0FBRXBCWCx1QkFBU0EsT0FGVztBQUdwQnlDLHFCQUFPQTtBQUhhLGFBQXRCO0FBS0FxYSw0QkFBZ0I5YyxPQUFoQixHQUEwQlcsUUFBUVgsVUFBVXlDLFFBQVEsSUFBcEQ7QUFDRCxXQVJEOztBQVVBaEUsaUJBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNELFNBaENEO0FBaUNEO0FBM0NJLEtBQVA7QUE2Q0QsR0F4RHVELENBQXhEO0FBeURELENBaEVEOzs7QUNDQTs7OztBQUtBLENBQUMsWUFBVztBQUNWOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxTQUFsQyxFQUE2QyxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNyYyxNQUFULEVBQWlCK0YsV0FBakIsRUFBOEI7QUFDbkcsV0FBTztBQUNMdVcsZ0JBQVUsR0FETDs7QUFHTHJhLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5Qjs7QUFFaEMsWUFBSUEsTUFBTXVhLElBQU4sQ0FBV3hKLE9BQVgsQ0FBbUIsSUFBbkIsTUFBNkIsQ0FBQyxDQUFsQyxFQUFxQztBQUNuQy9RLGdCQUFNNE8sUUFBTixDQUFlLE1BQWYsRUFBdUIsWUFBTTtBQUMzQmhQLHlCQUFhO0FBQUEscUJBQU1yQyxRQUFRLENBQVIsRUFBV2lkLE9BQVgsRUFBTjtBQUFBLGFBQWI7QUFDRCxXQUZEO0FBR0Q7O0FBRUQsZUFBTyxVQUFDdGMsS0FBRCxFQUFRWCxPQUFSLEVBQWlCeUMsS0FBakIsRUFBMkI7QUFDaEMrQixzQkFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDO0FBQzFDNEMscUJBQVM7QUFEaUMsV0FBNUM7QUFHQTtBQUNELFNBTEQ7QUFPRDs7QUFsQkksS0FBUDtBQXFCRCxHQXRCNEMsQ0FBN0M7QUF3QkQsQ0EzQkQ7OztBQ05BOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7QUFTQSxDQUFDLFlBQVU7QUFDVDs7QUFFQSxNQUFJcEksU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzZkLFNBQVAsQ0FBaUIsa0JBQWpCLEVBQXFDLENBQUMsUUFBRCxFQUFXLFlBQVgsRUFBeUIsVUFBU3JjLE1BQVQsRUFBaUI0WCxVQUFqQixFQUE2QjtBQUN6RixXQUFPO0FBQ0wwRSxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7O0FBSUw7QUFDQTtBQUNBc0gsa0JBQVksS0FOUDtBQU9McmEsYUFBTyxLQVBGOztBQVNMRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCO0FBQ3pCQSxnQkFBUTZLLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCOztBQUVBLGVBQU8sVUFBU2xLLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDckNBLGdCQUFNNE8sUUFBTixDQUFlLGtCQUFmLEVBQW1DNEcsTUFBbkM7QUFDQTVCLHFCQUFXVyxXQUFYLENBQXVCMU4sRUFBdkIsQ0FBMEIsUUFBMUIsRUFBb0MyTyxNQUFwQzs7QUFFQUE7O0FBRUF4WixpQkFBT3FHLE9BQVAsQ0FBZUMsU0FBZixDQUF5QnBFLEtBQXpCLEVBQWdDLFlBQVc7QUFDekMwVix1QkFBV1csV0FBWCxDQUF1QnJOLEdBQXZCLENBQTJCLFFBQTNCLEVBQXFDc08sTUFBckM7O0FBRUF4WixtQkFBT3lHLGNBQVAsQ0FBc0I7QUFDcEJsRix1QkFBU0EsT0FEVztBQUVwQlcscUJBQU9BLEtBRmE7QUFHcEI4QixxQkFBT0E7QUFIYSxhQUF0QjtBQUtBekMsc0JBQVVXLFFBQVE4QixRQUFRLElBQTFCO0FBQ0QsV0FURDs7QUFXQSxtQkFBU3dWLE1BQVQsR0FBa0I7QUFDaEIsZ0JBQUlpRixrQkFBa0IsQ0FBQyxLQUFLemEsTUFBTTBhLGdCQUFaLEVBQThCMWMsV0FBOUIsRUFBdEI7QUFDQSxnQkFBSXVXLGNBQWNvRyx3QkFBbEI7O0FBRUEsZ0JBQUlGLG9CQUFvQixVQUFwQixJQUFrQ0Esb0JBQW9CLFdBQTFELEVBQXVFO0FBQ3JFLGtCQUFJQSxvQkFBb0JsRyxXQUF4QixFQUFxQztBQUNuQ2hYLHdCQUFRNkssR0FBUixDQUFZLFNBQVosRUFBdUIsRUFBdkI7QUFDRCxlQUZELE1BRU87QUFDTDdLLHdCQUFRNkssR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsbUJBQVN1UyxzQkFBVCxHQUFrQztBQUNoQyxtQkFBTy9HLFdBQVdXLFdBQVgsQ0FBdUJtQixVQUF2QixLQUFzQyxVQUF0QyxHQUFtRCxXQUExRDtBQUNEO0FBQ0YsU0FqQ0Q7QUFrQ0Q7QUE5Q0ksS0FBUDtBQWdERCxHQWpEb0MsQ0FBckM7QUFrREQsQ0F2REQ7OztBQ3ZCQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7O0FBU0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSWxiLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU82ZCxTQUFQLENBQWlCLGVBQWpCLEVBQWtDLENBQUMsUUFBRCxFQUFXLFVBQVNyYyxNQUFULEVBQWlCO0FBQzVELFdBQU87QUFDTHNjLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjs7QUFJTDtBQUNBO0FBQ0FzSCxrQkFBWSxLQU5QO0FBT0xyYSxhQUFPLEtBUEY7O0FBU0xELGVBQVMsaUJBQVNWLE9BQVQsRUFBa0I7QUFDekJBLGdCQUFRNkssR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7O0FBRUEsWUFBSXdTLFdBQVdDLG1CQUFmOztBQUVBLGVBQU8sVUFBUzNjLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDckNBLGdCQUFNNE8sUUFBTixDQUFlLGVBQWYsRUFBZ0MsVUFBU2tNLFlBQVQsRUFBdUI7QUFDckQsZ0JBQUlBLFlBQUosRUFBa0I7QUFDaEJ0RjtBQUNEO0FBQ0YsV0FKRDs7QUFNQUE7O0FBRUF4WixpQkFBT3FHLE9BQVAsQ0FBZUMsU0FBZixDQUF5QnBFLEtBQXpCLEVBQWdDLFlBQVc7QUFDekNsQyxtQkFBT3lHLGNBQVAsQ0FBc0I7QUFDcEJsRix1QkFBU0EsT0FEVztBQUVwQlcscUJBQU9BLEtBRmE7QUFHcEI4QixxQkFBT0E7QUFIYSxhQUF0QjtBQUtBekMsc0JBQVVXLFFBQVE4QixRQUFRLElBQTFCO0FBQ0QsV0FQRDs7QUFTQSxtQkFBU3dWLE1BQVQsR0FBa0I7QUFDaEIsZ0JBQUl1RixnQkFBZ0IvYSxNQUFNZ2IsYUFBTixDQUFvQmhkLFdBQXBCLEdBQWtDaVgsSUFBbEMsR0FBeUNnQixLQUF6QyxDQUErQyxLQUEvQyxDQUFwQjtBQUNBLGdCQUFJOEUsY0FBY2hLLE9BQWQsQ0FBc0I2SixTQUFTNWMsV0FBVCxFQUF0QixLQUFpRCxDQUFyRCxFQUF3RDtBQUN0RFQsc0JBQVE2SyxHQUFSLENBQVksU0FBWixFQUF1QixPQUF2QjtBQUNELGFBRkQsTUFFTztBQUNMN0ssc0JBQVE2SyxHQUFSLENBQVksU0FBWixFQUF1QixNQUF2QjtBQUNEO0FBQ0Y7QUFDRixTQTFCRDs7QUE0QkEsaUJBQVN5UyxpQkFBVCxHQUE2Qjs7QUFFM0IsY0FBSS9ULFVBQVVtVSxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixVQUExQixDQUFKLEVBQTJDO0FBQ3pDLG1CQUFPLFNBQVA7QUFDRDs7QUFFRCxjQUFLcFUsVUFBVW1VLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLGFBQTFCLENBQUQsSUFBK0NwVSxVQUFVbVUsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsZ0JBQTFCLENBQS9DLElBQWdHcFUsVUFBVW1VLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLE9BQTFCLENBQXBHLEVBQXlJO0FBQ3ZJLG1CQUFPLFlBQVA7QUFDRDs7QUFFRCxjQUFJcFUsVUFBVW1VLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLG1CQUExQixDQUFKLEVBQW9EO0FBQ2xELG1CQUFPLEtBQVA7QUFDRDs7QUFFRCxjQUFJcFUsVUFBVW1VLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLG1DQUExQixDQUFKLEVBQW9FO0FBQ2xFLG1CQUFPLElBQVA7QUFDRDs7QUFFRDtBQUNBLGNBQUlDLFVBQVUsQ0FBQyxDQUFDL2dCLE9BQU9naEIsS0FBVCxJQUFrQnRVLFVBQVVtVSxTQUFWLENBQW9CbEssT0FBcEIsQ0FBNEIsT0FBNUIsS0FBd0MsQ0FBeEU7QUFDQSxjQUFJb0ssT0FBSixFQUFhO0FBQ1gsbUJBQU8sT0FBUDtBQUNEOztBQUVELGNBQUlFLFlBQVksT0FBT0MsY0FBUCxLQUEwQixXQUExQyxDQXhCMkIsQ0F3QjhCO0FBQ3pELGNBQUlELFNBQUosRUFBZTtBQUNiLG1CQUFPLFNBQVA7QUFDRDs7QUFFRCxjQUFJRSxXQUFXamlCLE9BQU9GLFNBQVAsQ0FBaUJvaUIsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCcmhCLE9BQU9vRCxXQUF0QyxFQUFtRHVULE9BQW5ELENBQTJELGFBQTNELElBQTRFLENBQTNGO0FBQ0E7QUFDQSxjQUFJd0ssUUFBSixFQUFjO0FBQ1osbUJBQU8sUUFBUDtBQUNEOztBQUVELGNBQUlHLFNBQVM1VSxVQUFVbVUsU0FBVixDQUFvQmxLLE9BQXBCLENBQTRCLFFBQTVCLEtBQXlDLENBQXREO0FBQ0EsY0FBSTJLLE1BQUosRUFBWTtBQUNWLG1CQUFPLE1BQVA7QUFDRDs7QUFFRCxjQUFJQyxXQUFXLENBQUMsQ0FBQ3ZoQixPQUFPd2hCLE1BQVQsSUFBbUIsQ0FBQ1QsT0FBcEIsSUFBK0IsQ0FBQ08sTUFBL0MsQ0F4QzJCLENBd0M0QjtBQUN2RCxjQUFJQyxRQUFKLEVBQWM7QUFDWixtQkFBTyxRQUFQO0FBQ0Q7O0FBRUQsY0FBSUUsT0FBTyxZQUFZLFNBQVMsQ0FBQyxDQUFDdGdCLFNBQVN1Z0IsWUFBM0MsQ0E3QzJCLENBNkM4QjtBQUN6RCxjQUFJRCxJQUFKLEVBQVU7QUFDUixtQkFBTyxJQUFQO0FBQ0Q7O0FBRUQsaUJBQU8sU0FBUDtBQUNEO0FBQ0Y7QUE5RkksS0FBUDtBQWdHRCxHQWpHaUMsQ0FBbEM7QUFrR0QsQ0F2R0Q7OztBQ3ZCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7Ozs7OztBQVNBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0EsQ0FBQyxZQUFVO0FBQ1Q7O0FBRUF0aEIsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxVQUFsQyxFQUE4QyxDQUFDLFFBQUQsRUFBVyxVQUFTclMsTUFBVCxFQUFpQjtBQUN4RSxXQUFPO0FBQ0xzUyxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTC9TLGFBQU8sS0FIRjs7QUFLTFUsWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLFlBQUkrYixLQUFLeGUsUUFBUSxDQUFSLENBQVQ7O0FBRUEsWUFBTXllLFVBQVUsU0FBVkEsT0FBVSxHQUFNO0FBQ3BCLGNBQU0vUSxNQUFNakYsT0FBT2hHLE1BQU15WCxPQUFiLEVBQXNCQyxNQUFsQzs7QUFFQSxjQUFJcUUsR0FBR0UsWUFBUCxFQUFxQjtBQUNuQmhSLGdCQUFJL00sS0FBSixFQUFXNmQsR0FBR2hnQixLQUFkO0FBQ0QsV0FGRCxNQUdLLElBQUlnZ0IsR0FBRy9MLElBQUgsS0FBWSxPQUFaLElBQXVCK0wsR0FBR25FLE9BQTlCLEVBQXVDO0FBQzFDM00sZ0JBQUkvTSxLQUFKLEVBQVc2ZCxHQUFHaGdCLEtBQWQ7QUFDRCxXQUZJLE1BR0E7QUFDSGtQLGdCQUFJL00sS0FBSixFQUFXNmQsR0FBR25FLE9BQWQ7QUFDRDs7QUFFRCxjQUFJNVgsTUFBTTZYLFFBQVYsRUFBb0I7QUFDbEIzWixrQkFBTXFGLEtBQU4sQ0FBWXZELE1BQU02WCxRQUFsQjtBQUNEOztBQUVEM1osZ0JBQU15WixPQUFOLENBQWM1WSxVQUFkO0FBQ0QsU0FsQkQ7O0FBb0JBLFlBQUlpQixNQUFNeVgsT0FBVixFQUFtQjtBQUNqQnZaLGdCQUFNNEYsTUFBTixDQUFhOUQsTUFBTXlYLE9BQW5CLEVBQTRCLFVBQUMxYixLQUFELEVBQVc7QUFDckMsZ0JBQUlnZ0IsR0FBR0UsWUFBSCxJQUFtQixPQUFPbGdCLEtBQVAsS0FBaUIsV0FBeEMsRUFBcUQ7QUFDbkRnZ0IsaUJBQUdoZ0IsS0FBSCxHQUFXQSxLQUFYO0FBQ0QsYUFGRCxNQUdLLElBQUlnZ0IsR0FBRy9MLElBQUgsS0FBWSxPQUFoQixFQUF5QjtBQUM1QitMLGlCQUFHbkUsT0FBSCxHQUFhN2IsVUFBVWdnQixHQUFHaGdCLEtBQTFCO0FBQ0QsYUFGSSxNQUdBO0FBQ0hnZ0IsaUJBQUduRSxPQUFILEdBQWE3YixLQUFiO0FBQ0Q7QUFDRixXQVZEOztBQVlBZ2dCLGFBQUdFLFlBQUgsR0FDSTFlLFFBQVFzSixFQUFSLENBQVcsT0FBWCxFQUFvQm1WLE9BQXBCLENBREosR0FFSXplLFFBQVFzSixFQUFSLENBQVcsUUFBWCxFQUFxQm1WLE9BQXJCLENBRko7QUFHRDs7QUFFRDlkLGNBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFNO0FBQzFCaWdCLGFBQUdFLFlBQUgsR0FDSTFlLFFBQVEySixHQUFSLENBQVksT0FBWixFQUFxQjhVLE9BQXJCLENBREosR0FFSXplLFFBQVEySixHQUFSLENBQVksUUFBWixFQUFzQjhVLE9BQXRCLENBRko7O0FBSUE5ZCxrQkFBUVgsVUFBVXlDLFFBQVErYixLQUFLLElBQS9CO0FBQ0QsU0FORDtBQU9EO0FBckRJLEtBQVA7QUF1REQsR0F4RDZDLENBQTlDO0FBeURELENBNUREOzs7QUN2REE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7Ozs7OztBQU9BOzs7Ozs7O0FBT0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSXZoQixTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBLE1BQUkwaEIsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTN1YsSUFBVCxFQUFlckssTUFBZixFQUF1QjtBQUMzQyxXQUFPLFVBQVN1QixPQUFULEVBQWtCO0FBQ3ZCLGFBQU8sVUFBU1csS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNyQyxZQUFJbWMsV0FBVzlWLE9BQU8sT0FBUCxHQUFpQixNQUFoQztBQUFBLFlBQ0krVixXQUFXL1YsT0FBTyxNQUFQLEdBQWdCLE9BRC9COztBQUdBLFlBQUlnVyxTQUFTLFNBQVRBLE1BQVMsR0FBVztBQUN0QjllLGtCQUFRNkssR0FBUixDQUFZLFNBQVosRUFBdUIrVCxRQUF2QjtBQUNELFNBRkQ7O0FBSUEsWUFBSUcsU0FBUyxTQUFUQSxNQUFTLEdBQVc7QUFDdEIvZSxrQkFBUTZLLEdBQVIsQ0FBWSxTQUFaLEVBQXVCZ1UsUUFBdkI7QUFDRCxTQUZEOztBQUlBLFlBQUlHLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxDQUFULEVBQVk7QUFDdkIsY0FBSUEsRUFBRUMsT0FBTixFQUFlO0FBQ2JKO0FBQ0QsV0FGRCxNQUVPO0FBQ0xDO0FBQ0Q7QUFDRixTQU5EOztBQVFBemhCLFlBQUk2aEIsZ0JBQUosQ0FBcUI3VixFQUFyQixDQUF3QixNQUF4QixFQUFnQ3dWLE1BQWhDO0FBQ0F4aEIsWUFBSTZoQixnQkFBSixDQUFxQjdWLEVBQXJCLENBQXdCLE1BQXhCLEVBQWdDeVYsTUFBaEM7QUFDQXpoQixZQUFJNmhCLGdCQUFKLENBQXFCN1YsRUFBckIsQ0FBd0IsTUFBeEIsRUFBZ0MwVixNQUFoQzs7QUFFQSxZQUFJMWhCLElBQUk2aEIsZ0JBQUosQ0FBcUJDLFFBQXpCLEVBQW1DO0FBQ2pDTjtBQUNELFNBRkQsTUFFTztBQUNMQztBQUNEOztBQUVEdGdCLGVBQU9xRyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJwRSxLQUF6QixFQUFnQyxZQUFXO0FBQ3pDckQsY0FBSTZoQixnQkFBSixDQUFxQnhWLEdBQXJCLENBQXlCLE1BQXpCLEVBQWlDbVYsTUFBakM7QUFDQXhoQixjQUFJNmhCLGdCQUFKLENBQXFCeFYsR0FBckIsQ0FBeUIsTUFBekIsRUFBaUNvVixNQUFqQztBQUNBemhCLGNBQUk2aEIsZ0JBQUosQ0FBcUJ4VixHQUFyQixDQUF5QixNQUF6QixFQUFpQ3FWLE1BQWpDOztBQUVBdmdCLGlCQUFPeUcsY0FBUCxDQUFzQjtBQUNwQmxGLHFCQUFTQSxPQURXO0FBRXBCVyxtQkFBT0EsS0FGYTtBQUdwQjhCLG1CQUFPQTtBQUhhLFdBQXRCO0FBS0F6QyxvQkFBVVcsUUFBUThCLFFBQVEsSUFBMUI7QUFDRCxTQVhEO0FBWUQsT0ExQ0Q7QUEyQ0QsS0E1Q0Q7QUE2Q0QsR0E5Q0Q7O0FBZ0RBeEYsU0FBTzZkLFNBQVAsQ0FBaUIsbUJBQWpCLEVBQXNDLENBQUMsUUFBRCxFQUFXLFVBQVNyYyxNQUFULEVBQWlCO0FBQ2hFLFdBQU87QUFDTHNjLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMc0gsa0JBQVksS0FIUDtBQUlMcmEsYUFBTyxLQUpGO0FBS0xELGVBQVNpZSxnQkFBZ0IsSUFBaEIsRUFBc0JsZ0IsTUFBdEI7QUFMSixLQUFQO0FBT0QsR0FScUMsQ0FBdEM7O0FBVUF4QixTQUFPNmQsU0FBUCxDQUFpQixxQkFBakIsRUFBd0MsQ0FBQyxRQUFELEVBQVcsVUFBU3JjLE1BQVQsRUFBaUI7QUFDbEUsV0FBTztBQUNMc2MsZ0JBQVUsR0FETDtBQUVMckgsZUFBUyxLQUZKO0FBR0xzSCxrQkFBWSxLQUhQO0FBSUxyYSxhQUFPLEtBSkY7QUFLTEQsZUFBU2llLGdCQUFnQixLQUFoQixFQUF1QmxnQixNQUF2QjtBQUxKLEtBQVA7QUFPRCxHQVJ1QyxDQUF4QztBQVNELENBeEVEOzs7QTlCdENBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFEQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBUUEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSXhCLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUE7OztBQUdBQSxTQUFPNmQsU0FBUCxDQUFpQixlQUFqQixFQUFrQyxDQUFDLFFBQUQsRUFBVyxnQkFBWCxFQUE2QixVQUFTcmMsTUFBVCxFQUFpQmlILGNBQWpCLEVBQWlDO0FBQzlGLFdBQU87QUFDTHFWLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMMkwsZ0JBQVUsSUFITDtBQUlMQyxnQkFBVSxJQUpMOztBQU1MNWUsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCO0FBQ2hDLGVBQU8sVUFBUzlCLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDckMsY0FBSThjLGFBQWEsSUFBSTdaLGNBQUosQ0FBbUIvRSxLQUFuQixFQUEwQlgsT0FBMUIsRUFBbUN5QyxLQUFuQyxDQUFqQjs7QUFFQTlCLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQm9DLG9CQUFRWCxVQUFVeUMsUUFBUThjLGFBQWEsSUFBdkM7QUFDRCxXQUZEO0FBR0QsU0FORDtBQU9EO0FBZEksS0FBUDtBQWdCRCxHQWpCaUMsQ0FBbEM7QUFtQkQsQ0EzQkQ7OztBK0J0RUEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUF2aUIsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxTQUFsQyxFQUE2QyxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNyYyxNQUFULEVBQWlCK0YsV0FBakIsRUFBOEI7QUFDbkcsV0FBTztBQUNMdVcsZ0JBQVUsR0FETDtBQUVMMVosWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDK0Isb0JBQVlXLFFBQVosQ0FBcUJ4RSxLQUFyQixFQUE0QlgsT0FBNUIsRUFBcUN5QyxLQUFyQyxFQUE0QyxFQUFDNEMsU0FBUyxVQUFWLEVBQTVDO0FBQ0E1RyxlQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQUxJLEtBQVA7QUFPRCxHQVI0QyxDQUE3QztBQVVELENBYkQ7OztBQ0FBLENBQUMsWUFBVztBQUNWOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxlQUFsQyxFQUFtRCxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNyYyxNQUFULEVBQWlCK0YsV0FBakIsRUFBOEI7QUFDekcsV0FBTztBQUNMdVcsZ0JBQVUsR0FETDtBQUVMMVosWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDK0Isb0JBQVlXLFFBQVosQ0FBcUJ4RSxLQUFyQixFQUE0QlgsT0FBNUIsRUFBcUN5QyxLQUFyQyxFQUE0QyxFQUFDNEMsU0FBUyxnQkFBVixFQUE1QztBQUNBNUcsZUFBTzJjLGtCQUFQLENBQTBCcGIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFMSSxLQUFQO0FBT0QsR0FSa0QsQ0FBbkQ7QUFVRCxDQWJEOzs7QUNBQSxDQUFDLFlBQVc7QUFDVjs7QUFFQWhELFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCNmQsU0FBeEIsQ0FBa0MsYUFBbEMsRUFBaUQsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixVQUFTcmMsTUFBVCxFQUFpQitGLFdBQWpCLEVBQThCO0FBQ3ZHLFdBQU87QUFDTHVXLGdCQUFVLEdBREw7QUFFTDFaLFlBQU0sY0FBU1YsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQytCLG9CQUFZVyxRQUFaLENBQXFCeEUsS0FBckIsRUFBNEJYLE9BQTVCLEVBQXFDeUMsS0FBckMsRUFBNEMsRUFBQzRDLFNBQVMsZUFBVixFQUE1QztBQUNBNUcsZUFBTzJjLGtCQUFQLENBQTBCcGIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFMSSxLQUFQO0FBT0QsR0FSZ0QsQ0FBakQ7QUFTRCxDQVpEOzs7QUNBQTs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7QUFTQSxDQUFDLFlBQVU7QUFDVDs7QUFFQWhELFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCNmQsU0FBeEIsQ0FBa0MsdUJBQWxDLEVBQTJELFlBQVc7QUFDcEUsV0FBTztBQUNMQyxnQkFBVSxHQURMO0FBRUwxWixZQUFNLGNBQVNWLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsWUFBSUEsTUFBTStjLHFCQUFWLEVBQWlDO0FBQy9CbGlCLGNBQUltaUIsMEJBQUosQ0FBK0J6ZixRQUFRLENBQVIsQ0FBL0IsRUFBMkN5QyxNQUFNK2MscUJBQWpELEVBQXdFLFVBQVNFLGNBQVQsRUFBeUJ0ZCxJQUF6QixFQUErQjtBQUNyRzlFLGdCQUFJb0QsT0FBSixDQUFZZ2YsY0FBWjtBQUNBL2Usa0JBQU1hLFVBQU4sQ0FBaUIsWUFBVztBQUMxQmEsMkJBQWFELElBQWI7QUFDRCxhQUZEO0FBR0QsV0FMRDtBQU1EO0FBQ0Y7QUFYSSxLQUFQO0FBYUQsR0FkRDtBQWVELENBbEJEOzs7QWhDdEJBOzs7O0FBSUE7Ozs7Ozs7OztBQVNBLENBQUMsWUFBVztBQUNWOztBQUVBOzs7O0FBR0FwRixVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZkLFNBQXhCLENBQWtDLFVBQWxDLEVBQThDLENBQUMsUUFBRCxFQUFXLFdBQVgsRUFBd0IsVUFBU3JjLE1BQVQsRUFBaUJpSyxTQUFqQixFQUE0QjtBQUNoRyxXQUFPO0FBQ0xxUyxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7O0FBSUw7QUFDQTtBQUNBL1MsYUFBTyxLQU5GO0FBT0xxYSxrQkFBWSxLQVBQOztBQVNMdGEsZUFBUyxpQkFBQ1YsT0FBRCxFQUFVeUMsS0FBVixFQUFvQjs7QUFFM0IsZUFBTztBQUNMd1ksZUFBSyxhQUFTdGEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNuQyxnQkFBSWtkLFFBQVEsSUFBSWpYLFNBQUosQ0FBYy9ILEtBQWQsRUFBcUJYLE9BQXJCLEVBQThCeUMsS0FBOUIsQ0FBWjtBQUNBaEUsbUJBQU9vRyxtQ0FBUCxDQUEyQzhhLEtBQTNDLEVBQWtEM2YsT0FBbEQ7O0FBRUF2QixtQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NrZCxLQUFsQztBQUNBM2Ysb0JBQVFPLElBQVIsQ0FBYSxXQUFiLEVBQTBCb2YsS0FBMUI7O0FBRUFoZixrQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0JFLHFCQUFPd0cscUJBQVAsQ0FBNkIwYSxLQUE3QjtBQUNBM2Ysc0JBQVFPLElBQVIsQ0FBYSxXQUFiLEVBQTBCYixTQUExQjtBQUNBaWdCLHNCQUFRM2YsVUFBVVcsUUFBUThCLFFBQVEsSUFBbEM7QUFDRCxhQUpEO0FBS0QsV0FiSTs7QUFlTDBZLGdCQUFNLGNBQVN4YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QjtBQUM3QnZCLG1CQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQWpCSSxTQUFQO0FBbUJEO0FBOUJJLEtBQVA7QUFnQ0QsR0FqQzZDLENBQTlDO0FBa0NELENBeENEOzs7QUNiQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJZSxZQUFZbEUsT0FBT1MsR0FBUCxDQUFXc2lCLGdCQUFYLENBQTRCQyxXQUE1QixDQUF3Q0MsS0FBeEQ7QUFDQWpqQixTQUFPUyxHQUFQLENBQVdzaUIsZ0JBQVgsQ0FBNEJDLFdBQTVCLENBQXdDQyxLQUF4QyxHQUFnRHhpQixJQUFJdUQsaUJBQUosQ0FBc0IsZUFBdEIsRUFBdUNFLFNBQXZDLENBQWhEOztBQUVBL0QsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxjQUFsQyxFQUFrRCxDQUFDLGVBQUQsRUFBa0IsUUFBbEIsRUFBNEIsVUFBUzVSLGFBQVQsRUFBd0J6SyxNQUF4QixFQUFnQztBQUM1RyxXQUFPO0FBQ0xzYyxnQkFBVSxHQURMOztBQUdMO0FBQ0E7QUFDQUMsa0JBQVksS0FMUDtBQU1McmEsYUFBTyxJQU5GOztBQVFMRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCOztBQUV6QixlQUFPO0FBQ0xpYixlQUFLLGFBQVN0YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDNlksVUFBaEMsRUFBNEM7QUFDL0MsZ0JBQUlsVyxPQUFPLElBQUk4RCxhQUFKLENBQWtCdkksS0FBbEIsRUFBeUJYLE9BQXpCLEVBQWtDeUMsS0FBbEMsQ0FBWDs7QUFFQWhFLG1CQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQzJDLElBQWxDO0FBQ0EzRyxtQkFBT3ljLHFCQUFQLENBQTZCOVYsSUFBN0IsRUFBbUMsd0RBQW5DOztBQUVBcEYsb0JBQVFPLElBQVIsQ0FBYSxlQUFiLEVBQThCNkUsSUFBOUI7O0FBRUFwRixvQkFBUSxDQUFSLEVBQVcrZixVQUFYLEdBQXdCdGhCLE9BQU91aEIsZ0JBQVAsQ0FBd0I1YSxJQUF4QixDQUF4Qjs7QUFFQXpFLGtCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQjZHLG1CQUFLSixPQUFMLEdBQWV0RixTQUFmO0FBQ0FNLHNCQUFRTyxJQUFSLENBQWEsZUFBYixFQUE4QmIsU0FBOUI7QUFDQWlCLHNCQUFRWCxVQUFVLElBQWxCO0FBQ0QsYUFKRDtBQU1ELFdBakJJO0FBa0JMbWIsZ0JBQU0sY0FBU3hhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcENoRSxtQkFBTzJjLGtCQUFQLENBQTBCcGIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFwQkksU0FBUDtBQXNCRDtBQWhDSSxLQUFQO0FBa0NELEdBbkNpRCxDQUFsRDtBQW9DRCxDQTFDRDs7O0FHdkpBOzs7O0FBSUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUkvQyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPNmQsU0FBUCxDQUFpQixTQUFqQixFQUE0QixDQUFDLFFBQUQsRUFBVyxVQUFYLEVBQXVCLFVBQVNyYyxNQUFULEVBQWlCNk8sUUFBakIsRUFBMkI7O0FBRTVFLGFBQVMyUyxpQkFBVCxDQUEyQmpnQixPQUEzQixFQUFvQztBQUNsQztBQUNBLFVBQUk2SCxJQUFJLENBQVI7QUFBQSxVQUFXcVksSUFBSSxTQUFKQSxDQUFJLEdBQVc7QUFDeEIsWUFBSXJZLE1BQU0sRUFBVixFQUFlO0FBQ2IsY0FBSXNZLFdBQVduZ0IsT0FBWCxDQUFKLEVBQXlCO0FBQ3ZCdkIsbUJBQU8yYyxrQkFBUCxDQUEwQnBiLE9BQTFCLEVBQW1DLE1BQW5DO0FBQ0FvZ0Isb0NBQXdCcGdCLE9BQXhCO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsZ0JBQUk2SCxJQUFJLEVBQVIsRUFBWTtBQUNWMEUseUJBQVcyVCxDQUFYLEVBQWMsT0FBTyxFQUFyQjtBQUNELGFBRkQsTUFFTztBQUNMN2QsMkJBQWE2ZCxDQUFiO0FBQ0Q7QUFDRjtBQUNGLFNBWEQsTUFXTztBQUNMLGdCQUFNLElBQUk1aEIsS0FBSixDQUFVLGdHQUFWLENBQU47QUFDRDtBQUNGLE9BZkQ7O0FBaUJBNGhCO0FBQ0Q7O0FBRUQsYUFBU0UsdUJBQVQsQ0FBaUNwZ0IsT0FBakMsRUFBMEM7QUFDeEMsVUFBSXdKLFFBQVF4TCxTQUFTcWlCLFdBQVQsQ0FBcUIsWUFBckIsQ0FBWjtBQUNBN1csWUFBTThXLFNBQU4sQ0FBZ0IsVUFBaEIsRUFBNEIsSUFBNUIsRUFBa0MsSUFBbEM7QUFDQXRnQixjQUFRdWdCLGFBQVIsQ0FBc0IvVyxLQUF0QjtBQUNEOztBQUVELGFBQVMyVyxVQUFULENBQW9CbmdCLE9BQXBCLEVBQTZCO0FBQzNCLFVBQUloQyxTQUFTNkIsZUFBVCxLQUE2QkcsT0FBakMsRUFBMEM7QUFDeEMsZUFBTyxJQUFQO0FBQ0Q7QUFDRCxhQUFPQSxRQUFRcUcsVUFBUixHQUFxQjhaLFdBQVduZ0IsUUFBUXFHLFVBQW5CLENBQXJCLEdBQXNELEtBQTdEO0FBQ0Q7O0FBRUQsV0FBTztBQUNMMFUsZ0JBQVUsR0FETDs7QUFHTDtBQUNBO0FBQ0FDLGtCQUFZLEtBTFA7QUFNTHJhLGFBQU8sSUFORjs7QUFRTEQsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCO0FBQ2hDLGVBQU87QUFDTHdZLGVBQUssYUFBU3RhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDbkMsZ0JBQUl4RCxPQUFPLElBQUlxTyxRQUFKLENBQWEzTSxLQUFiLEVBQW9CWCxPQUFwQixFQUE2QnlDLEtBQTdCLENBQVg7O0FBRUFoRSxtQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0N4RCxJQUFsQztBQUNBUixtQkFBT3ljLHFCQUFQLENBQTZCamMsSUFBN0IsRUFBbUMsd0JBQW5DOztBQUVBZSxvQkFBUU8sSUFBUixDQUFhLFVBQWIsRUFBeUJ0QixJQUF6QjtBQUNBUixtQkFBT29HLG1DQUFQLENBQTJDNUYsSUFBM0MsRUFBaURlLE9BQWpEOztBQUVBQSxvQkFBUU8sSUFBUixDQUFhLFFBQWIsRUFBdUJJLEtBQXZCOztBQUVBbEMsbUJBQU9xRyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJwRSxLQUF6QixFQUFnQyxZQUFXO0FBQ3pDMUIsbUJBQUsrRixPQUFMLEdBQWV0RixTQUFmO0FBQ0FqQixxQkFBT3dHLHFCQUFQLENBQTZCaEcsSUFBN0I7QUFDQWUsc0JBQVFPLElBQVIsQ0FBYSxVQUFiLEVBQXlCYixTQUF6QjtBQUNBTSxzQkFBUU8sSUFBUixDQUFhLFFBQWIsRUFBdUJiLFNBQXZCOztBQUVBakIscUJBQU95RyxjQUFQLENBQXNCO0FBQ3BCbEYseUJBQVNBLE9BRFc7QUFFcEJXLHVCQUFPQSxLQUZhO0FBR3BCOEIsdUJBQU9BO0FBSGEsZUFBdEI7QUFLQTlCLHNCQUFRWCxVQUFVeUMsUUFBUSxJQUExQjtBQUNELGFBWkQ7QUFhRCxXQXpCSTs7QUEyQkwwWSxnQkFBTSxTQUFTcUYsUUFBVCxDQUFrQjdmLEtBQWxCLEVBQXlCWCxPQUF6QixFQUFrQ3lDLEtBQWxDLEVBQXlDO0FBQzdDd2QsOEJBQWtCamdCLFFBQVEsQ0FBUixDQUFsQjtBQUNEO0FBN0JJLFNBQVA7QUErQkQ7QUF4Q0ksS0FBUDtBQTBDRCxHQS9FMkIsQ0FBNUI7QUFnRkQsQ0FyRkQ7OztBQzNFQTs7OztBQUlBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBLENBQUMsWUFBVTtBQUNUOztBQUVBLE1BQUkvQyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPNmQsU0FBUCxDQUFpQixZQUFqQixFQUErQixDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNyYyxNQUFULEVBQWlCMFAsV0FBakIsRUFBOEI7QUFDckYsV0FBTztBQUNMNE0sZ0JBQVUsR0FETDtBQUVMckgsZUFBUyxLQUZKO0FBR0wvUyxhQUFPLElBSEY7QUFJTEQsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCO0FBQ2hDLGVBQU87QUFDTHdZLGVBQUssYUFBU3RhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7O0FBRW5DLGdCQUFJUixVQUFVLElBQUlrTSxXQUFKLENBQWdCeE4sS0FBaEIsRUFBdUJYLE9BQXZCLEVBQWdDeUMsS0FBaEMsQ0FBZDs7QUFFQWhFLG1CQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQ1IsT0FBbEM7QUFDQXhELG1CQUFPeWMscUJBQVAsQ0FBNkJqWixPQUE3QixFQUFzQywyQ0FBdEM7QUFDQXhELG1CQUFPb0csbUNBQVAsQ0FBMkM1QyxPQUEzQyxFQUFvRGpDLE9BQXBEOztBQUVBQSxvQkFBUU8sSUFBUixDQUFhLGFBQWIsRUFBNEIwQixPQUE1Qjs7QUFFQXRCLGtCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQjBELHNCQUFRK0MsT0FBUixHQUFrQnRGLFNBQWxCO0FBQ0FqQixxQkFBT3dHLHFCQUFQLENBQTZCaEQsT0FBN0I7QUFDQWpDLHNCQUFRTyxJQUFSLENBQWEsYUFBYixFQUE0QmIsU0FBNUI7QUFDQU0sd0JBQVUsSUFBVjtBQUNELGFBTEQ7QUFNRCxXQWpCSTs7QUFtQkxtYixnQkFBTSxjQUFTeGEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUI7QUFDN0J2QixtQkFBTzJjLGtCQUFQLENBQTBCcGIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFyQkksU0FBUDtBQXVCRDtBQTVCSSxLQUFQO0FBOEJELEdBL0I4QixDQUEvQjtBQWdDRCxDQXJDRDtBNEJwR0E7OztBMUJBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtDQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQTs7OztBQUdBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxhQUFsQyxFQUFpRCxDQUFDLFFBQUQsRUFBVyxjQUFYLEVBQTJCLFVBQVNyYyxNQUFULEVBQWlCNlAsWUFBakIsRUFBK0I7QUFDekcsV0FBTztBQUNMeU0sZ0JBQVUsR0FETDtBQUVMckgsZUFBUyxLQUZKO0FBR0wvUyxhQUFPLElBSEY7O0FBS0xELGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5QjtBQUNoQyxlQUFPO0FBQ0x3WSxlQUFLLGFBQVN0YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ25DLGdCQUFJOEwsV0FBVyxJQUFJRCxZQUFKLENBQWlCM04sS0FBakIsRUFBd0JYLE9BQXhCLEVBQWlDeUMsS0FBakMsQ0FBZjs7QUFFQWhFLG1CQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQzhMLFFBQWxDO0FBQ0E5UCxtQkFBT3ljLHFCQUFQLENBQTZCM00sUUFBN0IsRUFBdUMscUJBQXZDO0FBQ0F2TyxvQkFBUU8sSUFBUixDQUFhLGVBQWIsRUFBOEJnTyxRQUE5Qjs7QUFFQTVOLGtCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQmdRLHVCQUFTdkosT0FBVCxHQUFtQnRGLFNBQW5CO0FBQ0FNLHNCQUFRTyxJQUFSLENBQWEsZUFBYixFQUE4QmIsU0FBOUI7QUFDQWlCLHNCQUFRWCxVQUFVeUMsUUFBUSxJQUExQjtBQUNELGFBSkQ7QUFLRCxXQWJJO0FBY0wwWSxnQkFBTSxjQUFTeGEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUI7QUFDN0J2QixtQkFBTzJjLGtCQUFQLENBQTBCcGIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFoQkksU0FBUDtBQWtCRDtBQXhCSSxLQUFQO0FBMEJELEdBM0JnRCxDQUFqRDtBQTZCRCxDQW5DRDs7O0EyQnZHQSxDQUFDLFlBQVU7QUFDVDs7QUFFQWhELFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCNmQsU0FBeEIsQ0FBa0MsVUFBbEMsRUFBOEMsQ0FBQyxRQUFELEVBQVcsVUFBU3JTLE1BQVQsRUFBaUI7QUFDeEUsV0FBTztBQUNMc1MsZ0JBQVUsR0FETDtBQUVMckgsZUFBUyxLQUZKO0FBR0wvUyxhQUFPLEtBSEY7O0FBS0xVLFlBQU0sY0FBU1YsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQzs7QUFFcEMsWUFBTWdjLFVBQVUsU0FBVkEsT0FBVSxHQUFNO0FBQ3BCLGNBQU0vUSxNQUFNakYsT0FBT2hHLE1BQU15WCxPQUFiLEVBQXNCQyxNQUFsQzs7QUFFQXpNLGNBQUkvTSxLQUFKLEVBQVdYLFFBQVEsQ0FBUixFQUFXeEIsS0FBdEI7QUFDQSxjQUFJaUUsTUFBTTZYLFFBQVYsRUFBb0I7QUFDbEIzWixrQkFBTXFGLEtBQU4sQ0FBWXZELE1BQU02WCxRQUFsQjtBQUNEO0FBQ0QzWixnQkFBTXlaLE9BQU4sQ0FBYzVZLFVBQWQ7QUFDRCxTQVJEOztBQVVBLFlBQUlpQixNQUFNeVgsT0FBVixFQUFtQjtBQUNqQnZaLGdCQUFNNEYsTUFBTixDQUFhOUQsTUFBTXlYLE9BQW5CLEVBQTRCLFVBQUMxYixLQUFELEVBQVc7QUFDckN3QixvQkFBUSxDQUFSLEVBQVd4QixLQUFYLEdBQW1CQSxLQUFuQjtBQUNELFdBRkQ7O0FBSUF3QixrQkFBUXNKLEVBQVIsQ0FBVyxPQUFYLEVBQW9CbVYsT0FBcEI7QUFDRDs7QUFFRDlkLGNBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFNO0FBQzFCeUIsa0JBQVEySixHQUFSLENBQVksT0FBWixFQUFxQjhVLE9BQXJCO0FBQ0E5ZCxrQkFBUVgsVUFBVXlDLFFBQVEsSUFBMUI7QUFDRCxTQUhEO0FBSUQ7QUE3QkksS0FBUDtBQStCRCxHQWhDNkMsQ0FBOUM7QUFpQ0QsQ0FwQ0Q7OztBQ0FBLENBQUMsWUFBVztBQUNWOztBQUVBekYsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxXQUFsQyxFQUErQyxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNyYyxNQUFULEVBQWlCK0YsV0FBakIsRUFBOEI7QUFDckcsV0FBTztBQUNMdVcsZ0JBQVUsR0FETDtBQUVMMVosWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDK0Isb0JBQVlXLFFBQVosQ0FBcUJ4RSxLQUFyQixFQUE0QlgsT0FBNUIsRUFBcUN5QyxLQUFyQyxFQUE0QyxFQUFDNEMsU0FBUyxZQUFWLEVBQTVDO0FBQ0E1RyxlQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQUxJLEtBQVA7QUFPRCxHQVI4QyxDQUEvQztBQVNELENBWkQ7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSS9DLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU82ZCxTQUFQLENBQWlCLFVBQWpCLEVBQTZCLENBQUMsUUFBRCxFQUFXLFVBQVNyYyxNQUFULEVBQWlCO0FBQ3ZELFdBQU87QUFDTHNjLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMc0gsa0JBQVksS0FIUDtBQUlMcmEsYUFBTyxLQUpGOztBQU1MVSxZQUFNLGNBQVNWLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCO0FBQzdCQSxnQkFBUU8sSUFBUixDQUFhLFFBQWIsRUFBdUJJLEtBQXZCOztBQUVBQSxjQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQnlCLGtCQUFRTyxJQUFSLENBQWEsUUFBYixFQUF1QmIsU0FBdkI7QUFDRCxTQUZEO0FBR0Q7QUFaSSxLQUFQO0FBY0QsR0FmNEIsQ0FBN0I7QUFnQkQsQ0FyQkQ7OztBMUJyQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDQTs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7Ozs7Ozs7Ozs7QUFhQTs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBLENBQUMsWUFBVztBQUNWOztBQUNBLE1BQUl6QyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPNmQsU0FBUCxDQUFpQixnQkFBakIsRUFBbUMsQ0FBQyxVQUFELEVBQWEsaUJBQWIsRUFBZ0MsUUFBaEMsRUFBMEMsVUFBU2hkLFFBQVQsRUFBbUJ5UyxlQUFuQixFQUFvQzlSLE1BQXBDLEVBQTRDO0FBQ3ZILFdBQU87QUFDTHNjLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjs7QUFJTDtBQUNBO0FBQ0FzSCxrQkFBWSxLQU5QO0FBT0xyYSxhQUFPLElBUEY7O0FBU0xELGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5QjtBQUNoQyxZQUFJZ2UsT0FBT3pnQixRQUFRLENBQVIsRUFBV00sYUFBWCxDQUF5QixPQUF6QixDQUFYO0FBQUEsWUFDSW9nQixPQUFPMWdCLFFBQVEsQ0FBUixFQUFXTSxhQUFYLENBQXlCLE9BQXpCLENBRFg7O0FBR0EsWUFBSW1nQixJQUFKLEVBQVU7QUFDUixjQUFJRSxXQUFXM2pCLFFBQVFnRCxPQUFSLENBQWdCeWdCLElBQWhCLEVBQXNCcGQsTUFBdEIsR0FBK0J1UixJQUEvQixHQUFzQzhDLElBQXRDLEVBQWY7QUFDRDs7QUFFRCxZQUFJZ0osSUFBSixFQUFVO0FBQ1IsY0FBSUUsV0FBVzVqQixRQUFRZ0QsT0FBUixDQUFnQjBnQixJQUFoQixFQUFzQnJkLE1BQXRCLEdBQStCdVIsSUFBL0IsR0FBc0M4QyxJQUF0QyxFQUFmO0FBQ0Q7O0FBRUQsZUFBTyxVQUFTL1csS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNyQ3pDLGtCQUFRbVUsTUFBUixDQUFlblgsUUFBUWdELE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0IwVyxRQUEvQixDQUF3QywwQkFBeEMsQ0FBZjtBQUNBMVcsa0JBQVFtVSxNQUFSLENBQWVuWCxRQUFRZ0QsT0FBUixDQUFnQixhQUFoQixFQUErQjBXLFFBQS9CLENBQXdDLDBCQUF4QyxDQUFmOztBQUVBLGNBQUlaLGNBQWMsSUFBSXZGLGVBQUosQ0FBb0I1UCxLQUFwQixFQUEyQlgsT0FBM0IsRUFBb0N5QyxLQUFwQyxDQUFsQjs7QUFFQWhFLGlCQUFPeWMscUJBQVAsQ0FBNkJwRixXQUE3QixFQUEwQyw0REFBMUM7O0FBRUEsY0FBSTZLLFlBQVksQ0FBQ2xlLE1BQU1nSSxRQUF2QixFQUFpQztBQUMvQnFMLHdCQUFZaEMsZUFBWixDQUE0QixJQUE1QixFQUFrQzZNLFFBQWxDO0FBQ0Q7O0FBRUQsY0FBSUMsWUFBWSxDQUFDbmUsTUFBTWlJLFFBQXZCLEVBQWlDO0FBQy9Cb0wsd0JBQVl0QixlQUFaLENBQTRCb00sUUFBNUI7QUFDRDs7QUFFRG5pQixpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NxVCxXQUFsQztBQUNBOVYsa0JBQVFPLElBQVIsQ0FBYSxrQkFBYixFQUFpQ3VWLFdBQWpDOztBQUVBblYsZ0JBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFVO0FBQzlCdVgsd0JBQVk5USxPQUFaLEdBQXNCdEYsU0FBdEI7QUFDQU0sb0JBQVFPLElBQVIsQ0FBYSxrQkFBYixFQUFpQ2IsU0FBakM7QUFDRCxXQUhEOztBQUtBakIsaUJBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNELFNBekJEO0FBMEJEO0FBL0NJLEtBQVA7QUFpREQsR0FsRGtDLENBQW5DO0FBbURELENBdkREOzs7QUUzWUE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzZkLFNBQVAsQ0FBaUIsY0FBakIsRUFBaUMsQ0FBQyxRQUFELEVBQVcsZUFBWCxFQUE0QixVQUFTcmMsTUFBVCxFQUFpQjJYLGFBQWpCLEVBQWdDO0FBQzNGLFdBQU87QUFDTDJFLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdML1MsYUFBTyxLQUhGO0FBSUxxYSxrQkFBWSxLQUpQOztBQU1MdGEsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPLFVBQVM5QixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3JDLGNBQUlvZSxZQUFZLElBQUl6SyxhQUFKLENBQWtCelYsS0FBbEIsRUFBeUJYLE9BQXpCLEVBQWtDeUMsS0FBbEMsQ0FBaEI7O0FBRUF6QyxrQkFBUU8sSUFBUixDQUFhLGdCQUFiLEVBQStCc2dCLFNBQS9COztBQUVBcGlCLGlCQUFPeWMscUJBQVAsQ0FBNkIyRixTQUE3QixFQUF3QyxZQUF4QztBQUNBcGlCLGlCQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQ29lLFNBQWxDOztBQUVBbGdCLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQnNpQixzQkFBVTdiLE9BQVYsR0FBb0J0RixTQUFwQjtBQUNBTSxvQkFBUU8sSUFBUixDQUFhLGdCQUFiLEVBQStCYixTQUEvQjtBQUNBTSxzQkFBVSxJQUFWO0FBQ0QsV0FKRDs7QUFNQXZCLGlCQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRCxTQWZEO0FBZ0JEOztBQXhCSSxLQUFQO0FBMkJELEdBNUJnQyxDQUFqQztBQThCRCxDQW5DRDs7O0FDekVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFDQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzZkLFNBQVAsQ0FBaUIsY0FBakIsRUFBaUMsQ0FBQyxVQUFELEVBQWEsV0FBYixFQUEwQixRQUExQixFQUFvQyxVQUFTaGQsUUFBVCxFQUFtQjJZLFNBQW5CLEVBQThCaFksTUFBOUIsRUFBc0M7O0FBRXpHLFdBQU87QUFDTHNjLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMc0gsa0JBQVksS0FIUDtBQUlMcmEsYUFBTyxJQUpGOztBQU1MRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7QUFDaEMsWUFBSWdJLFdBQVd6SyxRQUFRLENBQVIsRUFBV00sYUFBWCxDQUF5QixZQUF6QixDQUFmO0FBQUEsWUFDSTRXLGdCQUFnQmxYLFFBQVEsQ0FBUixFQUFXTSxhQUFYLENBQXlCLGlCQUF6QixDQURwQjs7QUFHQSxZQUFJbUssUUFBSixFQUFjO0FBQ1osY0FBSWtXLFdBQVczakIsUUFBUWdELE9BQVIsQ0FBZ0J5SyxRQUFoQixFQUEwQnBILE1BQTFCLEdBQW1DdVIsSUFBbkMsR0FBMEM4QyxJQUExQyxFQUFmO0FBQ0Q7O0FBRUQsWUFBSVIsYUFBSixFQUFtQjtBQUNqQixjQUFJNEosZ0JBQWdCOWpCLFFBQVFnRCxPQUFSLENBQWdCa1gsYUFBaEIsRUFBK0I3VCxNQUEvQixHQUF3Q3VSLElBQXhDLEdBQStDOEMsSUFBL0MsRUFBcEI7QUFDRDs7QUFFRCxlQUFPLFVBQVMvVyxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3JDekMsa0JBQVFtVSxNQUFSLENBQWVuWCxRQUFRZ0QsT0FBUixDQUFnQixhQUFoQixFQUErQjBXLFFBQS9CLENBQXdDLHlDQUF4QyxDQUFmO0FBQ0ExVyxrQkFBUW1VLE1BQVIsQ0FBZW5YLFFBQVFnRCxPQUFSLENBQWdCLGFBQWhCLEVBQStCMFcsUUFBL0IsQ0FBd0Msb0NBQXhDLENBQWY7O0FBRUEsY0FBSXdDLFlBQVksSUFBSXpDLFNBQUosQ0FBYzlWLEtBQWQsRUFBcUJYLE9BQXJCLEVBQThCeUMsS0FBOUIsQ0FBaEI7O0FBRUEsY0FBSWtlLFlBQVksQ0FBQ2xlLE1BQU1nSSxRQUF2QixFQUFpQztBQUMvQnlPLHNCQUFVcEYsZUFBVixDQUEwQjZNLFFBQTFCO0FBQ0Q7O0FBRUQsY0FBSUcsaUJBQWlCLENBQUNyZSxNQUFNeVUsYUFBNUIsRUFBMkM7QUFDekNnQyxzQkFBVTVCLGlCQUFWLENBQTRCd0osYUFBNUI7QUFDRDs7QUFFRHJpQixpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0N5VyxTQUFsQztBQUNBemEsaUJBQU95YyxxQkFBUCxDQUE2QmhDLFNBQTdCLEVBQXdDLDJFQUF4Qzs7QUFFQWxaLGtCQUFRTyxJQUFSLENBQWEsZ0JBQWIsRUFBK0IyWSxTQUEvQjs7QUFFQXZZLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQjJhLHNCQUFVbFUsT0FBVixHQUFvQnRGLFNBQXBCO0FBQ0FNLG9CQUFRTyxJQUFSLENBQWEsZ0JBQWIsRUFBK0JiLFNBQS9CO0FBQ0QsV0FIRDs7QUFLQWpCLGlCQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRCxTQXpCRDtBQTBCRDtBQTVDSSxLQUFQO0FBOENELEdBaERnQyxDQUFqQztBQWlERCxDQXJERDs7O0FHalZBOzs7O0FBSUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQWhELFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCNmQsU0FBeEIsQ0FBa0MsYUFBbEMsRUFBaUQsQ0FBQyxVQUFELEVBQWEsVUFBYixFQUF5QixRQUF6QixFQUFtQyxVQUFTaGQsUUFBVCxFQUFtQjhiLFFBQW5CLEVBQTZCbmIsTUFBN0IsRUFBcUM7QUFDdkgsV0FBTztBQUNMc2MsZ0JBQVUsR0FETDtBQUVMcGEsYUFBTyxJQUZGOztBQUlMRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7O0FBRWhDLGVBQU8sVUFBUzlCLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7O0FBRXJDLGNBQUlzZSxXQUFXLElBQUluSCxRQUFKLENBQWFqWixLQUFiLEVBQW9CWCxPQUFwQixFQUE2QnlDLEtBQTdCLENBQWY7O0FBRUFoRSxpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NzZSxRQUFsQztBQUNBdGlCLGlCQUFPeWMscUJBQVAsQ0FBNkI2RixRQUE3QixFQUF1QyxTQUF2Qzs7QUFFQS9nQixrQkFBUU8sSUFBUixDQUFhLGNBQWIsRUFBNkJ3Z0IsUUFBN0I7O0FBRUFwZ0IsZ0JBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFXO0FBQy9Cd2lCLHFCQUFTL2IsT0FBVCxHQUFtQnRGLFNBQW5CO0FBQ0FNLG9CQUFRTyxJQUFSLENBQWEsY0FBYixFQUE2QmIsU0FBN0I7QUFDRCxXQUhEOztBQUtBakIsaUJBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNELFNBZkQ7QUFnQkQ7QUF0QkksS0FBUDtBQXdCRCxHQXpCZ0QsQ0FBakQ7QUEwQkQsQ0E3QkQ7OztBcUJoRUE7Ozs7QUFJQTs7Ozs7Ozs7QUFRQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJZSxZQUFZbEUsT0FBT1MsR0FBUCxDQUFXMGpCLHNCQUFYLENBQWtDbkIsV0FBbEMsQ0FBOENDLEtBQTlEO0FBQ0FqakIsU0FBT1MsR0FBUCxDQUFXMGpCLHNCQUFYLENBQWtDbkIsV0FBbEMsQ0FBOENDLEtBQTlDLEdBQXNEeGlCLElBQUl1RCxpQkFBSixDQUFzQixzQkFBdEIsRUFBOENFLFNBQTlDLENBQXREOztBQUVBL0QsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxvQkFBbEMsRUFBd0QsQ0FBQyxVQUFELEVBQWEsaUJBQWIsRUFBZ0MsUUFBaEMsRUFBMEMsVUFBU2hkLFFBQVQsRUFBbUIwYixlQUFuQixFQUFvQy9hLE1BQXBDLEVBQTRDO0FBQzVJLFdBQU87QUFDTHNjLGdCQUFVLEdBREw7O0FBR0xyYSxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7O0FBRWhDLGVBQU8sVUFBUzlCLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7O0FBRXJDLGNBQUkyQyxPQUFPLElBQUlvVSxlQUFKLENBQW9CN1ksS0FBcEIsRUFBMkJYLE9BQTNCLEVBQW9DeUMsS0FBcEMsQ0FBWDs7QUFFQWhFLGlCQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQzJDLElBQWxDO0FBQ0EzRyxpQkFBT3ljLHFCQUFQLENBQTZCOVYsSUFBN0IsRUFBbUMsU0FBbkM7O0FBRUFwRixrQkFBUU8sSUFBUixDQUFhLHNCQUFiLEVBQXFDNkUsSUFBckM7O0FBRUFwRixrQkFBUSxDQUFSLEVBQVcrZixVQUFYLEdBQXdCdGhCLE9BQU91aEIsZ0JBQVAsQ0FBd0I1YSxJQUF4QixDQUF4Qjs7QUFFQXpFLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQjZHLGlCQUFLSixPQUFMLEdBQWV0RixTQUFmO0FBQ0FNLG9CQUFRTyxJQUFSLENBQWEsc0JBQWIsRUFBcUNiLFNBQXJDO0FBQ0QsV0FIRDs7QUFLQWpCLGlCQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRCxTQWpCRDtBQWtCRDtBQXZCSSxLQUFQO0FBeUJELEdBMUJ1RCxDQUF4RDtBQTJCRCxDQWpDRDs7O0FDWkE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7OztBQVFBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUllLFlBQVlsRSxPQUFPUyxHQUFQLENBQVcyakIsbUJBQVgsQ0FBK0JwQixXQUEvQixDQUEyQ0MsS0FBM0Q7QUFDQWpqQixTQUFPUyxHQUFQLENBQVcyakIsbUJBQVgsQ0FBK0JwQixXQUEvQixDQUEyQ0MsS0FBM0MsR0FBbUR4aUIsSUFBSXVELGlCQUFKLENBQXNCLG1CQUF0QixFQUEyQ0UsU0FBM0MsQ0FBbkQ7O0FBRUEvRCxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZkLFNBQXhCLENBQWtDLGlCQUFsQyxFQUFxRCxDQUFDLFVBQUQsRUFBYSxjQUFiLEVBQTZCLFFBQTdCLEVBQXVDLFVBQVNoZCxRQUFULEVBQW1CNmIsWUFBbkIsRUFBaUNsYixNQUFqQyxFQUF5QztBQUNuSSxXQUFPO0FBQ0xzYyxnQkFBVSxHQURMOztBQUdMcmEsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPLFVBQVM5QixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDOztBQUVyQyxjQUFJMkMsT0FBTyxJQUFJdVUsWUFBSixDQUFpQmhaLEtBQWpCLEVBQXdCWCxPQUF4QixFQUFpQ3lDLEtBQWpDLENBQVg7O0FBRUFoRSxpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0MyQyxJQUFsQztBQUNBM0csaUJBQU95YyxxQkFBUCxDQUE2QjlWLElBQTdCLEVBQW1DLHdEQUFuQzs7QUFFQXBGLGtCQUFRTyxJQUFSLENBQWEsbUJBQWIsRUFBa0M2RSxJQUFsQzs7QUFFQXBGLGtCQUFRLENBQVIsRUFBVytmLFVBQVgsR0FBd0J0aEIsT0FBT3VoQixnQkFBUCxDQUF3QjVhLElBQXhCLENBQXhCOztBQUVBekUsZ0JBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFXO0FBQy9CNkcsaUJBQUtKLE9BQUwsR0FBZXRGLFNBQWY7QUFDQU0sb0JBQVFPLElBQVIsQ0FBYSxtQkFBYixFQUFrQ2IsU0FBbEM7QUFDRCxXQUhEOztBQUtBakIsaUJBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNELFNBakJEO0FBa0JEO0FBdkJJLEtBQVA7QUF5QkQsR0ExQm9ELENBQXJEO0FBMkJELENBakNEOzs7QXJCekRBOzs7O0FBSUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBLENBQUMsWUFBVTtBQUNUOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0I2ZCxTQUF4QixDQUFrQyxXQUFsQyxFQUErQyxDQUFDLFFBQUQsRUFBVyxZQUFYLEVBQXlCLFVBQVNyYyxNQUFULEVBQWlCc2IsVUFBakIsRUFBNkI7QUFDbkcsV0FBTztBQUNMZ0IsZ0JBQVUsR0FETDtBQUVMckgsZUFBUyxLQUZKO0FBR0wvUyxhQUFPLElBSEY7O0FBS0xVLFlBQU0sY0FBU1YsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQzs7QUFFcEMsWUFBSUEsTUFBTXllLFlBQVYsRUFBd0I7QUFDdEIsZ0JBQU0sSUFBSTVpQixLQUFKLENBQVUscURBQVYsQ0FBTjtBQUNEOztBQUVELFlBQUk2aUIsYUFBYSxJQUFJcEgsVUFBSixDQUFlL1osT0FBZixFQUF3QlcsS0FBeEIsRUFBK0I4QixLQUEvQixDQUFqQjtBQUNBaEUsZUFBT29HLG1DQUFQLENBQTJDc2MsVUFBM0MsRUFBdURuaEIsT0FBdkQ7O0FBRUF2QixlQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQzBlLFVBQWxDO0FBQ0FuaEIsZ0JBQVFPLElBQVIsQ0FBYSxZQUFiLEVBQTJCNGdCLFVBQTNCOztBQUVBMWlCLGVBQU9xRyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJwRSxLQUF6QixFQUFnQyxZQUFXO0FBQ3pDd2dCLHFCQUFXbmMsT0FBWCxHQUFxQnRGLFNBQXJCO0FBQ0FqQixpQkFBT3dHLHFCQUFQLENBQTZCa2MsVUFBN0I7QUFDQW5oQixrQkFBUU8sSUFBUixDQUFhLFlBQWIsRUFBMkJiLFNBQTNCO0FBQ0FqQixpQkFBT3lHLGNBQVAsQ0FBc0I7QUFDcEJsRixxQkFBU0EsT0FEVztBQUVwQlcsbUJBQU9BLEtBRmE7QUFHcEI4QixtQkFBT0E7QUFIYSxXQUF0QjtBQUtBekMsb0JBQVV5QyxRQUFROUIsUUFBUSxJQUExQjtBQUNELFNBVkQ7O0FBWUFsQyxlQUFPMmMsa0JBQVAsQ0FBMEJwYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQTlCSSxLQUFQO0FBZ0NELEdBakM4QyxDQUEvQztBQWtDRCxDQXJDRDs7O0FzQnZEQSxDQUFDLFlBQVc7QUFDVjs7QUFFQW9oQixNQUFJQyxPQUFKLEdBQWMsQ0FBQyxRQUFELEVBQVcsYUFBWCxDQUFkO0FBQ0Fya0IsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFDRzZkLFNBREgsQ0FDYSxRQURiLEVBQ3VCc0csR0FEdkIsRUFFR3RHLFNBRkgsQ0FFYSxlQUZiLEVBRThCc0csR0FGOUIsRUFKVSxDQU0wQjs7QUFFcEMsV0FBU0EsR0FBVCxDQUFhM2lCLE1BQWIsRUFBcUIrRixXQUFyQixFQUFrQztBQUNoQyxXQUFPO0FBQ0x1VyxnQkFBVSxHQURMO0FBRUwxWixZQUFNLGNBQVNWLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsWUFBSTJDLE9BQU8sSUFBSVosV0FBSixDQUFnQjdELEtBQWhCLEVBQXVCWCxPQUF2QixFQUFnQ3lDLEtBQWhDLENBQVg7QUFDQXpDLGdCQUFRLENBQVIsRUFBVytmLFVBQVgsR0FBd0J0aEIsT0FBT3VoQixnQkFBUCxDQUF3QjVhLElBQXhCLENBQXhCOztBQUVBM0csZUFBTzJjLGtCQUFQLENBQTBCcGIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFQSSxLQUFQO0FBU0Q7QUFDRixDQW5CRDs7O0FDQUE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7Ozs7Ozs7Ozs7O0FBY0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSWUsWUFBWWxFLE9BQU9TLEdBQVAsQ0FBV3VkLGFBQVgsQ0FBeUJnRixXQUF6QixDQUFxQ0MsS0FBckQ7QUFDQWpqQixTQUFPUyxHQUFQLENBQVd1ZCxhQUFYLENBQXlCZ0YsV0FBekIsQ0FBcUNDLEtBQXJDLEdBQTZDeGlCLElBQUl1RCxpQkFBSixDQUFzQixZQUF0QixFQUFvQ0UsU0FBcEMsQ0FBN0M7O0FBRUEvRCxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZkLFNBQXhCLENBQWtDLFdBQWxDLEVBQStDLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsUUFBdkIsRUFBaUMsWUFBakMsRUFBK0MsVUFBU3JjLE1BQVQsRUFBaUJYLFFBQWpCLEVBQTJCMkssTUFBM0IsRUFBbUNpUyxVQUFuQyxFQUErQzs7QUFFM0ksV0FBTztBQUNMSyxnQkFBVSxHQURMOztBQUdMckgsZUFBUyxLQUhKO0FBSUwvUyxhQUFPLElBSkY7O0FBTUxVLFlBQU0sY0FBU1YsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQzZZLFVBQWhDLEVBQTRDOztBQUdoRDNhLGNBQU00RixNQUFOLENBQWE5RCxNQUFNNmUsUUFBbkIsRUFBNkIsVUFBU3ZZLElBQVQsRUFBZTtBQUMxQyxjQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJBLG1CQUFPQSxTQUFTLE1BQWhCO0FBQ0Q7QUFDRC9JLGtCQUFRLENBQVIsRUFBV3VoQixtQkFBWCxDQUErQixDQUFDeFksSUFBaEM7QUFDRCxTQUxEOztBQU9BLFlBQUl5WSxhQUFhLElBQUk5RyxVQUFKLENBQWUvWixLQUFmLEVBQXNCWCxPQUF0QixFQUErQnlDLEtBQS9CLENBQWpCO0FBQ0FoRSxlQUFPb0csbUNBQVAsQ0FBMkMyYyxVQUEzQyxFQUF1RHhoQixPQUF2RDs7QUFFQXZCLGVBQU95YyxxQkFBUCxDQUE2QnNHLFVBQTdCLEVBQXlDLHNEQUF6Qzs7QUFFQXhoQixnQkFBUU8sSUFBUixDQUFhLFlBQWIsRUFBMkJpaEIsVUFBM0I7QUFDQS9pQixlQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQytlLFVBQWxDOztBQUVBN2dCLGNBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFXO0FBQy9CaWpCLHFCQUFXeGMsT0FBWCxHQUFxQnRGLFNBQXJCO0FBQ0FqQixpQkFBT3dHLHFCQUFQLENBQTZCdWMsVUFBN0I7QUFDQXhoQixrQkFBUU8sSUFBUixDQUFhLFlBQWIsRUFBMkJiLFNBQTNCO0FBQ0QsU0FKRDs7QUFNQWpCLGVBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBL0JJLEtBQVA7QUFpQ0QsR0FuQzhDLENBQS9DO0FBb0NELENBMUNEOzs7QUNqSUEsQ0FBQyxZQUFVO0FBQ1Q7O0FBRUFoRCxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZkLFNBQXhCLENBQWtDLGFBQWxDLEVBQWlELENBQUMsZ0JBQUQsRUFBbUIsVUFBUzFkLGNBQVQsRUFBeUI7QUFDM0YsV0FBTztBQUNMMmQsZ0JBQVUsR0FETDtBQUVMdUUsZ0JBQVUsSUFGTDtBQUdMNWUsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQjtBQUN6QixZQUFJeWhCLFVBQVV6aEIsUUFBUSxDQUFSLEVBQVcwaEIsUUFBWCxJQUF1QjFoQixRQUFRNFUsSUFBUixFQUFyQztBQUNBeFgsdUJBQWVDLEdBQWYsQ0FBbUIyQyxRQUFRK0csSUFBUixDQUFhLElBQWIsQ0FBbkIsRUFBdUMwYSxPQUF2QztBQUNEO0FBTkksS0FBUDtBQVFELEdBVGdELENBQWpEO0FBVUQsQ0FiRDs7O0FDQUE7Ozs7QUFJQTs7Ozs7Ozs7QUFRQSxDQUFDLFlBQVc7QUFDVjs7QUFFQXprQixVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjZkLFNBQXhCLENBQWtDLFlBQWxDLEVBQWdELENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsVUFBU3JjLE1BQVQsRUFBaUIrRixXQUFqQixFQUE4QjtBQUN0RyxXQUFPO0FBQ0x1VyxnQkFBVSxHQURMOztBQUdMO0FBQ0E7QUFDQXBhLGFBQU8sS0FMRjtBQU1McWEsa0JBQVksS0FOUDs7QUFRTHRhLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0I7QUFDekIsZUFBTztBQUNMaWIsZUFBSyxhQUFTdGEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNuQztBQUNBLGdCQUFJekMsUUFBUSxDQUFSLEVBQVdRLFFBQVgsS0FBd0IsYUFBNUIsRUFBMkM7QUFDekNnRSwwQkFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDLEVBQUM0QyxTQUFTLGFBQVYsRUFBNUM7QUFDRDtBQUNGLFdBTkk7QUFPTDhWLGdCQUFNLGNBQVN4YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDaEUsbUJBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBVEksU0FBUDtBQVdEO0FBcEJJLEtBQVA7QUFzQkQsR0F2QitDLENBQWhEO0FBeUJELENBNUJEOzs7QUNaQTs7OztBQUlBOzs7Ozs7OztBQVFBLENBQUMsWUFBVTtBQUNUOztBQUNBLE1BQUkvQyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPNmQsU0FBUCxDQUFpQixrQkFBakIsRUFBcUMsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixVQUFTcmMsTUFBVCxFQUFpQitGLFdBQWpCLEVBQThCO0FBQzNGLFdBQU87QUFDTHVXLGdCQUFVLEdBREw7QUFFTHBhLGFBQU8sS0FGRjtBQUdMVSxZQUFNO0FBQ0o0WixhQUFLLGFBQVN0YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ25DLGNBQUlrZixnQkFBZ0IsSUFBSW5kLFdBQUosQ0FBZ0I3RCxLQUFoQixFQUF1QlgsT0FBdkIsRUFBZ0N5QyxLQUFoQyxDQUFwQjtBQUNBekMsa0JBQVFPLElBQVIsQ0FBYSxvQkFBYixFQUFtQ29oQixhQUFuQztBQUNBbGpCLGlCQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQ2tmLGFBQWxDOztBQUVBbGpCLGlCQUFPb0csbUNBQVAsQ0FBMkM4YyxhQUEzQyxFQUEwRDNoQixPQUExRDs7QUFFQXZCLGlCQUFPcUcsT0FBUCxDQUFlQyxTQUFmLENBQXlCcEUsS0FBekIsRUFBZ0MsWUFBVztBQUN6Q2doQiwwQkFBYzNjLE9BQWQsR0FBd0J0RixTQUF4QjtBQUNBakIsbUJBQU93RyxxQkFBUCxDQUE2QjBjLGFBQTdCO0FBQ0EzaEIsb0JBQVFPLElBQVIsQ0FBYSxvQkFBYixFQUFtQ2IsU0FBbkM7QUFDQU0sc0JBQVUsSUFBVjs7QUFFQXZCLG1CQUFPeUcsY0FBUCxDQUFzQjtBQUNwQnZFLHFCQUFPQSxLQURhO0FBRXBCOEIscUJBQU9BLEtBRmE7QUFHcEJ6Qyx1QkFBU0E7QUFIVyxhQUF0QjtBQUtBVyxvQkFBUVgsVUFBVXlDLFFBQVEsSUFBMUI7QUFDRCxXQVpEO0FBYUQsU0FyQkc7QUFzQkowWSxjQUFNLGNBQVN4YSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDaEUsaUJBQU8yYyxrQkFBUCxDQUEwQnBiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBeEJHO0FBSEQsS0FBUDtBQThCRCxHQS9Cb0MsQ0FBckM7QUFnQ0QsQ0FwQ0Q7OztBQ1pBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFFQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQSxNQUFJb2UsbUJBQW1CO0FBQ3JCOzs7QUFHQXVHLG1CQUFlLHVCQUFTNWhCLE9BQVQsRUFBa0I7QUFDL0IsVUFBSWlXLFdBQVdqVyxRQUFRcUQsTUFBUixHQUFpQjRTLFFBQWpCLEVBQWY7QUFDQSxXQUFLLElBQUlwTyxJQUFJLENBQWIsRUFBZ0JBLElBQUlvTyxTQUFTdk0sTUFBN0IsRUFBcUM3QixHQUFyQyxFQUEwQztBQUN4Q3dULHlCQUFpQnVHLGFBQWpCLENBQStCNWtCLFFBQVFnRCxPQUFSLENBQWdCaVcsU0FBU3BPLENBQVQsQ0FBaEIsQ0FBL0I7QUFDRDtBQUNGLEtBVG9COztBQVdyQjs7O0FBR0E0VCx1QkFBbUIsMkJBQVNoWixLQUFULEVBQWdCO0FBQ2pDQSxZQUFNb2YsU0FBTixHQUFrQixJQUFsQjtBQUNBcGYsWUFBTXFmLFdBQU4sR0FBb0IsSUFBcEI7QUFDRCxLQWpCb0I7O0FBbUJyQjs7O0FBR0FDLG9CQUFnQix3QkFBUy9oQixPQUFULEVBQWtCO0FBQ2hDQSxjQUFRcUQsTUFBUjtBQUNELEtBeEJvQjs7QUEwQnJCOzs7QUFHQW1ZLGtCQUFjLHNCQUFTN2EsS0FBVCxFQUFnQjtBQUM1QkEsWUFBTXFoQixXQUFOLEdBQW9CLEVBQXBCO0FBQ0FyaEIsWUFBTXNoQixVQUFOLEdBQW1CLElBQW5CO0FBQ0F0aEIsY0FBUSxJQUFSO0FBQ0QsS0FqQ29COztBQW1DckI7Ozs7QUFJQW9FLGVBQVcsbUJBQVNwRSxLQUFULEVBQWdCekUsRUFBaEIsRUFBb0I7QUFDN0IsVUFBSWdtQixRQUFRdmhCLE1BQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFXO0FBQzNDMmpCO0FBQ0FobUIsV0FBR0csS0FBSCxDQUFTLElBQVQsRUFBZUMsU0FBZjtBQUNELE9BSFcsQ0FBWjtBQUlEO0FBNUNvQixHQUF2Qjs7QUErQ0FXLFNBQU9zRixPQUFQLENBQWUsa0JBQWYsRUFBbUMsWUFBVztBQUM1QyxXQUFPOFksZ0JBQVA7QUFDRCxHQUZEOztBQUlBO0FBQ0EsR0FBQyxZQUFXO0FBQ1YsUUFBSThHLG9CQUFvQixFQUF4QjtBQUNBLGtKQUE4SXpKLEtBQTlJLENBQW9KLEdBQXBKLEVBQXlKN1IsT0FBekosQ0FDRSxVQUFTNUssSUFBVCxFQUFlO0FBQ2IsVUFBSW1tQixnQkFBZ0JDLG1CQUFtQixRQUFRcG1CLElBQTNCLENBQXBCO0FBQ0FrbUIsd0JBQWtCQyxhQUFsQixJQUFtQyxDQUFDLFFBQUQsRUFBVyxVQUFTM1osTUFBVCxFQUFpQjtBQUM3RCxlQUFPO0FBQ0wvSCxtQkFBUyxpQkFBUzRoQixRQUFULEVBQW1CdmIsSUFBbkIsRUFBeUI7QUFDaEMsZ0JBQUk3SyxLQUFLdU0sT0FBTzFCLEtBQUtxYixhQUFMLENBQVAsQ0FBVDtBQUNBLG1CQUFPLFVBQVN6aEIsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUIrRyxJQUF6QixFQUErQjtBQUNwQyxrQkFBSXdiLFdBQVcsU0FBWEEsUUFBVyxDQUFTL1ksS0FBVCxFQUFnQjtBQUM3QjdJLHNCQUFNNmhCLE1BQU4sQ0FBYSxZQUFXO0FBQ3RCdG1CLHFCQUFHeUUsS0FBSCxFQUFVLEVBQUNzTixRQUFRekUsS0FBVCxFQUFWO0FBQ0QsaUJBRkQ7QUFHRCxlQUpEO0FBS0F4SixzQkFBUXNKLEVBQVIsQ0FBV3JOLElBQVgsRUFBaUJzbUIsUUFBakI7O0FBRUFsSCwrQkFBaUJ0VyxTQUFqQixDQUEyQnBFLEtBQTNCLEVBQWtDLFlBQVc7QUFDM0NYLHdCQUFRMkosR0FBUixDQUFZMU4sSUFBWixFQUFrQnNtQixRQUFsQjtBQUNBdmlCLDBCQUFVLElBQVY7O0FBRUFxYixpQ0FBaUJHLFlBQWpCLENBQThCN2EsS0FBOUI7QUFDQUEsd0JBQVEsSUFBUjs7QUFFQTBhLGlDQUFpQkksaUJBQWpCLENBQW1DMVUsSUFBbkM7QUFDQUEsdUJBQU8sSUFBUDtBQUNELGVBVEQ7QUFVRCxhQWxCRDtBQW1CRDtBQXRCSSxTQUFQO0FBd0JELE9BekJrQyxDQUFuQzs7QUEyQkEsZUFBU3NiLGtCQUFULENBQTRCcG1CLElBQTVCLEVBQWtDO0FBQ2hDLGVBQU9BLEtBQUt5WCxPQUFMLENBQWEsV0FBYixFQUEwQixVQUFTb0YsT0FBVCxFQUFrQjtBQUNqRCxpQkFBT0EsUUFBUSxDQUFSLEVBQVc0RCxXQUFYLEVBQVA7QUFDRCxTQUZNLENBQVA7QUFHRDtBQUNGLEtBbkNIO0FBcUNBemYsV0FBT3dsQixNQUFQLENBQWMsQ0FBQyxVQUFELEVBQWEsVUFBU0MsUUFBVCxFQUFtQjtBQUM1QyxVQUFJQyxRQUFRLFNBQVJBLEtBQVEsQ0FBU0MsU0FBVCxFQUFvQjtBQUM5QkEsa0JBQVVELEtBQVY7QUFDQSxlQUFPQyxTQUFQO0FBQ0QsT0FIRDtBQUlBN21CLGFBQU9tUixJQUFQLENBQVlpVixpQkFBWixFQUErQnRiLE9BQS9CLENBQXVDLFVBQVN1YixhQUFULEVBQXdCO0FBQzdETSxpQkFBU0csU0FBVCxDQUFtQlQsZ0JBQWdCLFdBQW5DLEVBQWdELENBQUMsV0FBRCxFQUFjTyxLQUFkLENBQWhEO0FBQ0QsT0FGRDtBQUdELEtBUmEsQ0FBZDtBQVNBNW1CLFdBQU9tUixJQUFQLENBQVlpVixpQkFBWixFQUErQnRiLE9BQS9CLENBQXVDLFVBQVN1YixhQUFULEVBQXdCO0FBQzdEbmxCLGFBQU82ZCxTQUFQLENBQWlCc0gsYUFBakIsRUFBZ0NELGtCQUFrQkMsYUFBbEIsQ0FBaEM7QUFDRCxLQUZEO0FBR0QsR0FuREQ7QUFvREQsQ0E3R0Q7OztBdkRqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVTtBQUNUOztBQUVBLE1BQUlubEIsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQTs7O0FBR0FBLFNBQU9zRixPQUFQLENBQWUsUUFBZixFQUF5QixDQUFDLFlBQUQsRUFBZSxTQUFmLEVBQTBCLGVBQTFCLEVBQTJDLFdBQTNDLEVBQXdELGdCQUF4RCxFQUEwRSxPQUExRSxFQUFtRixJQUFuRixFQUF5RixVQUF6RixFQUFxRyxZQUFyRyxFQUFtSCxrQkFBbkgsRUFBdUksVUFBU3hFLFVBQVQsRUFBcUIra0IsT0FBckIsRUFBOEJDLGFBQTlCLEVBQTZDQyxTQUE3QyxFQUF3RDVsQixjQUF4RCxFQUF3RTZsQixLQUF4RSxFQUErRXZrQixFQUEvRSxFQUFtRlosUUFBbkYsRUFBNkZ1WSxVQUE3RixFQUF5R2dGLGdCQUF6RyxFQUEySDs7QUFFelIsUUFBSTVjLFNBQVN5a0Isb0JBQWI7QUFDQSxRQUFJQyxlQUFlOU0sV0FBV3RYLFNBQVgsQ0FBcUJva0IsWUFBeEM7O0FBRUEsV0FBTzFrQixNQUFQOztBQUVBLGFBQVN5a0Isa0JBQVQsR0FBOEI7QUFDNUIsYUFBTzs7QUFFTEUsZ0NBQXdCLFdBRm5COztBQUlMdGUsaUJBQVN1VyxnQkFKSjs7QUFNTGdJLGlDQUF5QmhOLFdBQVdyRSwyQkFOL0I7O0FBUUxzUix5Q0FBaUNqTixXQUFXaU4sK0JBUnZDOztBQVVMOzs7QUFHQUMsMkNBQW1DLDZDQUFXO0FBQzVDLGlCQUFPLEtBQUtELCtCQUFaO0FBQ0QsU0FmSTs7QUFpQkw7Ozs7OztBQU1BeGdCLHVCQUFlLHVCQUFTc0MsSUFBVCxFQUFlcEYsT0FBZixFQUF3QndqQixXQUF4QixFQUFxQztBQUNsREEsc0JBQVkzYyxPQUFaLENBQW9CLFVBQVM0YyxVQUFULEVBQXFCO0FBQ3ZDcmUsaUJBQUtxZSxVQUFMLElBQW1CLFlBQVc7QUFDNUIscUJBQU96akIsUUFBUXlqQixVQUFSLEVBQW9CcG5CLEtBQXBCLENBQTBCMkQsT0FBMUIsRUFBbUMxRCxTQUFuQyxDQUFQO0FBQ0QsYUFGRDtBQUdELFdBSkQ7O0FBTUEsaUJBQU8sWUFBVztBQUNoQmtuQix3QkFBWTNjLE9BQVosQ0FBb0IsVUFBUzRjLFVBQVQsRUFBcUI7QUFDdkNyZSxtQkFBS3FlLFVBQUwsSUFBbUIsSUFBbkI7QUFDRCxhQUZEO0FBR0FyZSxtQkFBT3BGLFVBQVUsSUFBakI7QUFDRCxXQUxEO0FBTUQsU0FwQ0k7O0FBc0NMOzs7O0FBSUF3RCxxQ0FBNkIscUNBQVNrZ0IsS0FBVCxFQUFnQkMsVUFBaEIsRUFBNEI7QUFDdkRBLHFCQUFXOWMsT0FBWCxDQUFtQixVQUFTK2MsUUFBVCxFQUFtQjtBQUNwQzduQixtQkFBT3lSLGNBQVAsQ0FBc0JrVyxNQUFNN25CLFNBQTVCLEVBQXVDK25CLFFBQXZDLEVBQWlEO0FBQy9DemtCLG1CQUFLLGVBQVk7QUFDZix1QkFBTyxLQUFLd0QsUUFBTCxDQUFjLENBQWQsRUFBaUJpaEIsUUFBakIsQ0FBUDtBQUNELGVBSDhDO0FBSS9DbFcsbUJBQUssYUFBU2xQLEtBQVQsRUFBZ0I7QUFDbkIsdUJBQU8sS0FBS21FLFFBQUwsQ0FBYyxDQUFkLEVBQWlCaWhCLFFBQWpCLElBQTZCcGxCLEtBQXBDLENBRG1CLENBQ3dCO0FBQzVDO0FBTjhDLGFBQWpEO0FBUUQsV0FURDtBQVVELFNBckRJOztBQXVETDs7Ozs7OztBQU9Bd0Usc0JBQWMsc0JBQVNvQyxJQUFULEVBQWVwRixPQUFmLEVBQXdCNmpCLFVBQXhCLEVBQW9DQyxHQUFwQyxFQUF5QztBQUNyREEsZ0JBQU1BLE9BQU8sVUFBUzdnQixNQUFULEVBQWlCO0FBQUUsbUJBQU9BLE1BQVA7QUFBZ0IsV0FBaEQ7QUFDQTRnQix1QkFBYSxHQUFHbGtCLE1BQUgsQ0FBVWtrQixVQUFWLENBQWI7QUFDQSxjQUFJRSxZQUFZLEVBQWhCOztBQUVBRixxQkFBV2hkLE9BQVgsQ0FBbUIsVUFBU21kLFNBQVQsRUFBb0I7QUFDckMsZ0JBQUl6QixXQUFXLFNBQVhBLFFBQVcsQ0FBUy9ZLEtBQVQsRUFBZ0I7QUFDN0JzYSxrQkFBSXRhLE1BQU12RyxNQUFOLElBQWdCLEVBQXBCO0FBQ0FtQyxtQkFBS2hDLElBQUwsQ0FBVTRnQixTQUFWLEVBQXFCeGEsS0FBckI7QUFDRCxhQUhEO0FBSUF1YSxzQkFBVUUsSUFBVixDQUFlMUIsUUFBZjtBQUNBdmlCLG9CQUFROUIsZ0JBQVIsQ0FBeUI4bEIsU0FBekIsRUFBb0N6QixRQUFwQyxFQUE4QyxLQUE5QztBQUNELFdBUEQ7O0FBU0EsaUJBQU8sWUFBVztBQUNoQnNCLHVCQUFXaGQsT0FBWCxDQUFtQixVQUFTbWQsU0FBVCxFQUFvQnpjLEtBQXBCLEVBQTJCO0FBQzVDdkgsc0JBQVFrQixtQkFBUixDQUE0QjhpQixTQUE1QixFQUF1Q0QsVUFBVXhjLEtBQVYsQ0FBdkMsRUFBeUQsS0FBekQ7QUFDRCxhQUZEO0FBR0FuQyxtQkFBT3BGLFVBQVUrakIsWUFBWUQsTUFBTSxJQUFuQztBQUNELFdBTEQ7QUFNRCxTQWxGSTs7QUFvRkw7OztBQUdBSSxvQ0FBNEIsc0NBQVc7QUFDckMsaUJBQU8sQ0FBQyxDQUFDN04sV0FBVzhOLE9BQVgsQ0FBbUJDLGlCQUE1QjtBQUNELFNBekZJOztBQTJGTDs7O0FBR0FDLDZCQUFxQmhPLFdBQVdnTyxtQkE5RjNCOztBQWdHTDs7O0FBR0FELDJCQUFtQi9OLFdBQVcrTixpQkFuR3pCOztBQXFHTDs7Ozs7QUFLQUUsd0JBQWdCLHdCQUFTbGYsSUFBVCxFQUFlbWYsV0FBZixFQUE0QnZqQixRQUE1QixFQUFzQztBQUNwRCxjQUFJSyxPQUFPdkQsU0FBU3ltQixXQUFULENBQVg7QUFDQSxjQUFJdFEsWUFBWTdPLEtBQUsxQyxNQUFMLENBQVluQixJQUFaLEVBQWhCOztBQUVBRixlQUFLNFMsU0FBTDs7QUFFQTs7O0FBR0FqWCxrQkFBUWdELE9BQVIsQ0FBZ0J1a0IsV0FBaEIsRUFBNkJoa0IsSUFBN0IsQ0FBa0MsUUFBbEMsRUFBNEMwVCxTQUE1Qzs7QUFFQUEsb0JBQVV6UyxVQUFWLENBQXFCLFlBQVc7QUFDOUJSLHFCQUFTdWpCLFdBQVQ7QUFDRCxXQUZEO0FBR0QsU0F4SEk7O0FBMEhMOzs7O0FBSUF2RSwwQkFBa0IsMEJBQVM1YSxJQUFULEVBQWU7QUFBQTs7QUFDL0IsaUJBQU8sSUFBSXZJLE9BQU9TLEdBQVAsQ0FBV2tuQixVQUFmLENBQ0wsZ0JBQWlCcGlCLElBQWpCLEVBQTBCO0FBQUEsZ0JBQXhCbkQsSUFBd0IsUUFBeEJBLElBQXdCO0FBQUEsZ0JBQWxCdUksTUFBa0IsUUFBbEJBLE1BQWtCOztBQUN4QjNLLG1CQUFPUyxHQUFQLENBQVd5QixTQUFYLENBQXFCNFYsZ0JBQXJCLENBQXNDMVYsSUFBdEMsRUFBNEN5QyxJQUE1QyxDQUFpRCxnQkFBUTtBQUN2RCxvQkFBSzRpQixjQUFMLENBQ0VsZixJQURGLEVBRUV2SSxPQUFPUyxHQUFQLENBQVd1SSxLQUFYLENBQWlCeEgsYUFBakIsQ0FBK0J1VyxLQUFLOEMsSUFBTCxFQUEvQixDQUZGLEVBR0UsbUJBQVc7QUFDVGxRLHVCQUFPcEosV0FBUCxDQUFtQjRCLE9BQW5CO0FBQ0FvQyxxQkFBS3BDLE9BQUw7QUFDRCxlQU5IO0FBUUQsYUFURDtBQVVELFdBWkksRUFhTCxtQkFBVztBQUNUaEQsb0JBQVFnRCxPQUFSLENBQWdCQSxPQUFoQixFQUF5Qk8sSUFBekIsQ0FBOEIsUUFBOUIsRUFBd0M4SCxRQUF4QztBQUNBckksb0JBQVFxRCxNQUFSO0FBQ0QsV0FoQkksQ0FBUDtBQWtCRCxTQWpKSTs7QUFtSkw7Ozs7Ozs7QUFPQTZCLHdCQUFnQix3QkFBU3VmLE1BQVQsRUFBaUI7QUFDL0IsY0FBSUEsT0FBTzlqQixLQUFYLEVBQWtCO0FBQ2hCMGEsNkJBQWlCRyxZQUFqQixDQUE4QmlKLE9BQU85akIsS0FBckM7QUFDRDs7QUFFRCxjQUFJOGpCLE9BQU9oaUIsS0FBWCxFQUFrQjtBQUNoQjRZLDZCQUFpQkksaUJBQWpCLENBQW1DZ0osT0FBT2hpQixLQUExQztBQUNEOztBQUVELGNBQUlnaUIsT0FBT3prQixPQUFYLEVBQW9CO0FBQ2xCcWIsNkJBQWlCMEcsY0FBakIsQ0FBZ0MwQyxPQUFPemtCLE9BQXZDO0FBQ0Q7O0FBRUQsY0FBSXlrQixPQUFPQyxRQUFYLEVBQXFCO0FBQ25CRCxtQkFBT0MsUUFBUCxDQUFnQjdkLE9BQWhCLENBQXdCLFVBQVM3RyxPQUFULEVBQWtCO0FBQ3hDcWIsK0JBQWlCMEcsY0FBakIsQ0FBZ0MvaEIsT0FBaEM7QUFDRCxhQUZEO0FBR0Q7QUFDRixTQTVLSTs7QUE4S0w7Ozs7QUFJQTJrQiw0QkFBb0IsNEJBQVMza0IsT0FBVCxFQUFrQi9ELElBQWxCLEVBQXdCO0FBQzFDLGlCQUFPK0QsUUFBUUcsYUFBUixDQUFzQmxFLElBQXRCLENBQVA7QUFDRCxTQXBMSTs7QUFzTEw7Ozs7QUFJQTBZLDBCQUFrQiwwQkFBUzFWLElBQVQsRUFBZTtBQUMvQixjQUFJQyxRQUFROUIsZUFBZStCLEdBQWYsQ0FBbUJGLElBQW5CLENBQVo7O0FBRUEsY0FBSUMsS0FBSixFQUFXO0FBQ1QsZ0JBQUkwbEIsV0FBV2xtQixHQUFHbW1CLEtBQUgsRUFBZjs7QUFFQSxnQkFBSWpRLE9BQU8sT0FBTzFWLEtBQVAsS0FBaUIsUUFBakIsR0FBNEJBLEtBQTVCLEdBQW9DQSxNQUFNLENBQU4sQ0FBL0M7QUFDQTBsQixxQkFBU3ZsQixPQUFULENBQWlCLEtBQUt5bEIsaUJBQUwsQ0FBdUJsUSxJQUF2QixDQUFqQjs7QUFFQSxtQkFBT2dRLFNBQVNHLE9BQWhCO0FBRUQsV0FSRCxNQVFPO0FBQ0wsbUJBQU85QixNQUFNO0FBQ1grQixtQkFBSy9sQixJQURNO0FBRVhnbUIsc0JBQVE7QUFGRyxhQUFOLEVBR0p2akIsSUFISSxDQUdDLFVBQVN3akIsUUFBVCxFQUFtQjtBQUN6QixrQkFBSXRRLE9BQU9zUSxTQUFTM2tCLElBQXBCOztBQUVBLHFCQUFPLEtBQUt1a0IsaUJBQUwsQ0FBdUJsUSxJQUF2QixDQUFQO0FBQ0QsYUFKTyxDQUlOMVIsSUFKTSxDQUlELElBSkMsQ0FIRCxDQUFQO0FBUUQ7QUFDRixTQS9NSTs7QUFpTkw7Ozs7QUFJQTRoQiwyQkFBbUIsMkJBQVNsUSxJQUFULEVBQWU7QUFDaENBLGlCQUFPLENBQUMsS0FBS0EsSUFBTixFQUFZOEMsSUFBWixFQUFQOztBQUVBLGNBQUksQ0FBQzlDLEtBQUsrSSxLQUFMLENBQVcsWUFBWCxDQUFMLEVBQStCO0FBQzdCL0ksbUJBQU8sc0JBQXNCQSxJQUF0QixHQUE2QixhQUFwQztBQUNEOztBQUVELGlCQUFPQSxJQUFQO0FBQ0QsU0E3Tkk7O0FBK05MOzs7Ozs7O0FBT0F1USxtQ0FBMkIsbUNBQVMxaUIsS0FBVCxFQUFnQjJpQixTQUFoQixFQUEyQjtBQUNwRCxjQUFJQyxnQkFBZ0I1aUIsU0FBUyxPQUFPQSxNQUFNNmlCLFFBQWIsS0FBMEIsUUFBbkMsR0FBOEM3aUIsTUFBTTZpQixRQUFOLENBQWU1TixJQUFmLEdBQXNCZ0IsS0FBdEIsQ0FBNEIsSUFBNUIsQ0FBOUMsR0FBa0YsRUFBdEc7QUFDQTBNLHNCQUFZcG9CLFFBQVF5QyxPQUFSLENBQWdCMmxCLFNBQWhCLElBQTZCQyxjQUFjMWxCLE1BQWQsQ0FBcUJ5bEIsU0FBckIsQ0FBN0IsR0FBK0RDLGFBQTNFOztBQUVBOzs7O0FBSUEsaUJBQU8sVUFBUzNELFFBQVQsRUFBbUI7QUFDeEIsbUJBQU8wRCxVQUFVdEIsR0FBVixDQUFjLFVBQVN3QixRQUFULEVBQW1CO0FBQ3RDLHFCQUFPNUQsU0FBU2hPLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0I0UixRQUF0QixDQUFQO0FBQ0QsYUFGTSxFQUVKdkksSUFGSSxDQUVDLEdBRkQsQ0FBUDtBQUdELFdBSkQ7QUFLRCxTQW5QSTs7QUFxUEw7Ozs7OztBQU1BbFksNkNBQXFDLDZDQUFTTyxJQUFULEVBQWVwRixPQUFmLEVBQXdCO0FBQzNELGNBQUl1bEIsVUFBVTtBQUNaQyx5QkFBYSxxQkFBU0MsTUFBVCxFQUFpQjtBQUM1QixrQkFBSUMsU0FBU3ZDLGFBQWF6SyxLQUFiLENBQW1CMVksUUFBUStHLElBQVIsQ0FBYSxVQUFiLENBQW5CLENBQWI7QUFDQTBlLHVCQUFTLE9BQU9BLE1BQVAsS0FBa0IsUUFBbEIsR0FBNkJBLE9BQU8vTixJQUFQLEVBQTdCLEdBQTZDLEVBQXREOztBQUVBLHFCQUFPeUwsYUFBYXpLLEtBQWIsQ0FBbUIrTSxNQUFuQixFQUEyQkUsSUFBM0IsQ0FBZ0MsVUFBU0YsTUFBVCxFQUFpQjtBQUN0RCx1QkFBT0MsT0FBT2xTLE9BQVAsQ0FBZWlTLE1BQWYsS0FBMEIsQ0FBQyxDQUFsQztBQUNELGVBRk0sQ0FBUDtBQUdELGFBUlc7O0FBVVpHLDRCQUFnQix3QkFBU0gsTUFBVCxFQUFpQjtBQUMvQkEsdUJBQVMsT0FBT0EsTUFBUCxLQUFrQixRQUFsQixHQUE2QkEsT0FBTy9OLElBQVAsRUFBN0IsR0FBNkMsRUFBdEQ7O0FBRUEsa0JBQUk0TixXQUFXbkMsYUFBYXpLLEtBQWIsQ0FBbUIxWSxRQUFRK0csSUFBUixDQUFhLFVBQWIsQ0FBbkIsRUFBNkM4ZSxNQUE3QyxDQUFvRCxVQUFTQyxLQUFULEVBQWdCO0FBQ2pGLHVCQUFPQSxVQUFVTCxNQUFqQjtBQUNELGVBRmMsRUFFWjFJLElBRlksQ0FFUCxHQUZPLENBQWY7O0FBSUEvYyxzQkFBUStHLElBQVIsQ0FBYSxVQUFiLEVBQXlCdWUsUUFBekI7QUFDRCxhQWxCVzs7QUFvQlpTLHlCQUFhLHFCQUFTVCxRQUFULEVBQW1CO0FBQzlCdGxCLHNCQUFRK0csSUFBUixDQUFhLFVBQWIsRUFBeUIvRyxRQUFRK0csSUFBUixDQUFhLFVBQWIsSUFBMkIsR0FBM0IsR0FBaUN1ZSxRQUExRDtBQUNELGFBdEJXOztBQXdCWlUseUJBQWEscUJBQVNWLFFBQVQsRUFBbUI7QUFDOUJ0bEIsc0JBQVErRyxJQUFSLENBQWEsVUFBYixFQUF5QnVlLFFBQXpCO0FBQ0QsYUExQlc7O0FBNEJaVyw0QkFBZ0Isd0JBQVNYLFFBQVQsRUFBbUI7QUFDakMsa0JBQUksS0FBS0UsV0FBTCxDQUFpQkYsUUFBakIsQ0FBSixFQUFnQztBQUM5QixxQkFBS00sY0FBTCxDQUFvQk4sUUFBcEI7QUFDRCxlQUZELE1BRU87QUFDTCxxQkFBS1MsV0FBTCxDQUFpQlQsUUFBakI7QUFDRDtBQUNGO0FBbENXLFdBQWQ7O0FBcUNBLGVBQUssSUFBSUwsTUFBVCxJQUFtQk0sT0FBbkIsRUFBNEI7QUFDMUIsZ0JBQUlBLFFBQVE5b0IsY0FBUixDQUF1QndvQixNQUF2QixDQUFKLEVBQW9DO0FBQ2xDN2YsbUJBQUs2ZixNQUFMLElBQWVNLFFBQVFOLE1BQVIsQ0FBZjtBQUNEO0FBQ0Y7QUFDRixTQXRTSTs7QUF3U0w7Ozs7Ozs7QUFPQXJnQiw0QkFBb0IsNEJBQVNRLElBQVQsRUFBZXNjLFFBQWYsRUFBeUIxaEIsT0FBekIsRUFBa0M7QUFDcEQsY0FBSWttQixNQUFNLFNBQU5BLEdBQU0sQ0FBU1osUUFBVCxFQUFtQjtBQUMzQixtQkFBTzVELFNBQVNoTyxPQUFULENBQWlCLEdBQWpCLEVBQXNCNFIsUUFBdEIsQ0FBUDtBQUNELFdBRkQ7O0FBSUEsY0FBSWEsTUFBTTtBQUNSWCx5QkFBYSxxQkFBU0YsUUFBVCxFQUFtQjtBQUM5QixxQkFBT3RsQixRQUFRb21CLFFBQVIsQ0FBaUJGLElBQUlaLFFBQUosQ0FBakIsQ0FBUDtBQUNELGFBSE87O0FBS1JNLDRCQUFnQix3QkFBU04sUUFBVCxFQUFtQjtBQUNqQ3RsQixzQkFBUXFtQixXQUFSLENBQW9CSCxJQUFJWixRQUFKLENBQXBCO0FBQ0QsYUFQTzs7QUFTUlMseUJBQWEscUJBQVNULFFBQVQsRUFBbUI7QUFDOUJ0bEIsc0JBQVEwVyxRQUFSLENBQWlCd1AsSUFBSVosUUFBSixDQUFqQjtBQUNELGFBWE87O0FBYVJVLHlCQUFhLHFCQUFTVixRQUFULEVBQW1CO0FBQzlCLGtCQUFJZ0IsVUFBVXRtQixRQUFRK0csSUFBUixDQUFhLE9BQWIsRUFBc0IyUixLQUF0QixDQUE0QixLQUE1QixDQUFkO0FBQUEsa0JBQ0k2TixPQUFPN0UsU0FBU2hPLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsR0FBdEIsQ0FEWDs7QUFHQSxtQkFBSyxJQUFJN0wsSUFBSSxDQUFiLEVBQWdCQSxJQUFJeWUsUUFBUTVjLE1BQTVCLEVBQW9DN0IsR0FBcEMsRUFBeUM7QUFDdkMsb0JBQUkyZSxNQUFNRixRQUFRemUsQ0FBUixDQUFWOztBQUVBLG9CQUFJMmUsSUFBSTdJLEtBQUosQ0FBVTRJLElBQVYsQ0FBSixFQUFxQjtBQUNuQnZtQiwwQkFBUXFtQixXQUFSLENBQW9CRyxHQUFwQjtBQUNEO0FBQ0Y7O0FBRUR4bUIsc0JBQVEwVyxRQUFSLENBQWlCd1AsSUFBSVosUUFBSixDQUFqQjtBQUNELGFBMUJPOztBQTRCUlcsNEJBQWdCLHdCQUFTWCxRQUFULEVBQW1CO0FBQ2pDLGtCQUFJa0IsTUFBTU4sSUFBSVosUUFBSixDQUFWO0FBQ0Esa0JBQUl0bEIsUUFBUW9tQixRQUFSLENBQWlCSSxHQUFqQixDQUFKLEVBQTJCO0FBQ3pCeG1CLHdCQUFRcW1CLFdBQVIsQ0FBb0JHLEdBQXBCO0FBQ0QsZUFGRCxNQUVPO0FBQ0x4bUIsd0JBQVEwVyxRQUFSLENBQWlCOFAsR0FBakI7QUFDRDtBQUNGO0FBbkNPLFdBQVY7O0FBc0NBLGNBQUlyUyxTQUFTLFNBQVRBLE1BQVMsQ0FBU3NTLEtBQVQsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQ2xDLGdCQUFJLE9BQU9ELEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDaEMscUJBQU8sWUFBVztBQUNoQix1QkFBT0EsTUFBTXBxQixLQUFOLENBQVksSUFBWixFQUFrQkMsU0FBbEIsS0FBZ0NvcUIsTUFBTXJxQixLQUFOLENBQVksSUFBWixFQUFrQkMsU0FBbEIsQ0FBdkM7QUFDRCxlQUZEO0FBR0QsYUFKRCxNQUlPO0FBQ0wscUJBQU9vcUIsS0FBUDtBQUNEO0FBQ0YsV0FSRDs7QUFVQXRoQixlQUFLb2dCLFdBQUwsR0FBbUJyUixPQUFPL08sS0FBS29nQixXQUFaLEVBQXlCVyxJQUFJWCxXQUE3QixDQUFuQjtBQUNBcGdCLGVBQUt3Z0IsY0FBTCxHQUFzQnpSLE9BQU8vTyxLQUFLd2dCLGNBQVosRUFBNEJPLElBQUlQLGNBQWhDLENBQXRCO0FBQ0F4Z0IsZUFBSzJnQixXQUFMLEdBQW1CNVIsT0FBTy9PLEtBQUsyZ0IsV0FBWixFQUF5QkksSUFBSUosV0FBN0IsQ0FBbkI7QUFDQTNnQixlQUFLNGdCLFdBQUwsR0FBbUI3UixPQUFPL08sS0FBSzRnQixXQUFaLEVBQXlCRyxJQUFJSCxXQUE3QixDQUFuQjtBQUNBNWdCLGVBQUs2Z0IsY0FBTCxHQUFzQjlSLE9BQU8vTyxLQUFLNmdCLGNBQVosRUFBNEJFLElBQUlGLGNBQWhDLENBQXRCO0FBQ0QsU0F6V0k7O0FBMldMOzs7OztBQUtBaGhCLCtCQUF1QiwrQkFBU0csSUFBVCxFQUFlO0FBQ3BDQSxlQUFLb2dCLFdBQUwsR0FBbUJwZ0IsS0FBS3dnQixjQUFMLEdBQ2pCeGdCLEtBQUsyZ0IsV0FBTCxHQUFtQjNnQixLQUFLNGdCLFdBQUwsR0FDbkI1Z0IsS0FBSzZnQixjQUFMLEdBQXNCdm1CLFNBRnhCO0FBR0QsU0FwWEk7O0FBc1hMOzs7Ozs7QUFNQTRGLDZCQUFxQiw2QkFBUzdDLEtBQVQsRUFBZ0Jra0IsTUFBaEIsRUFBd0I7QUFDM0MsY0FBSSxPQUFPbGtCLE1BQU1ta0IsR0FBYixLQUFxQixRQUF6QixFQUFtQztBQUNqQyxnQkFBSUMsVUFBVXBrQixNQUFNbWtCLEdBQXBCO0FBQ0EsaUJBQUtFLFVBQUwsQ0FBZ0JELE9BQWhCLEVBQXlCRixNQUF6QjtBQUNEO0FBQ0YsU0FqWUk7O0FBbVlMSSwrQkFBdUIsK0JBQVNDLFNBQVQsRUFBb0JoRCxTQUFwQixFQUErQjtBQUNwRCxjQUFJaUQsdUJBQXVCakQsVUFBVXZILE1BQVYsQ0FBaUIsQ0FBakIsRUFBb0JDLFdBQXBCLEtBQW9Dc0gsVUFBVXJILEtBQVYsQ0FBZ0IsQ0FBaEIsQ0FBL0Q7O0FBRUFxSyxvQkFBVTFkLEVBQVYsQ0FBYTBhLFNBQWIsRUFBd0IsVUFBU3hhLEtBQVQsRUFBZ0I7QUFDdEMvSyxtQkFBTzJjLGtCQUFQLENBQTBCNEwsVUFBVXJrQixRQUFWLENBQW1CLENBQW5CLENBQTFCLEVBQWlEcWhCLFNBQWpELEVBQTREeGEsU0FBU0EsTUFBTXZHLE1BQTNFOztBQUVBLGdCQUFJNFosVUFBVW1LLFVBQVVwa0IsTUFBVixDQUFpQixRQUFRcWtCLG9CQUF6QixDQUFkO0FBQ0EsZ0JBQUlwSyxPQUFKLEVBQWE7QUFDWG1LLHdCQUFVdGtCLE1BQVYsQ0FBaUJzRCxLQUFqQixDQUF1QjZXLE9BQXZCLEVBQWdDLEVBQUM1TyxRQUFRekUsS0FBVCxFQUFoQztBQUNBd2Qsd0JBQVV0a0IsTUFBVixDQUFpQmxCLFVBQWpCO0FBQ0Q7QUFDRixXQVJEO0FBU0QsU0EvWUk7O0FBaVpMOzs7Ozs7QUFNQTBaLCtCQUF1QiwrQkFBUzhMLFNBQVQsRUFBb0JuRCxVQUFwQixFQUFnQztBQUNyREEsdUJBQWFBLFdBQVduTSxJQUFYLEdBQWtCZ0IsS0FBbEIsQ0FBd0IsS0FBeEIsQ0FBYjs7QUFFQSxlQUFLLElBQUk3USxJQUFJLENBQVIsRUFBV3FmLElBQUlyRCxXQUFXbmEsTUFBL0IsRUFBdUM3QixJQUFJcWYsQ0FBM0MsRUFBOENyZixHQUE5QyxFQUFtRDtBQUNqRCxnQkFBSW1jLFlBQVlILFdBQVdoYyxDQUFYLENBQWhCO0FBQ0EsaUJBQUtrZixxQkFBTCxDQUEyQkMsU0FBM0IsRUFBc0NoRCxTQUF0QztBQUNEO0FBQ0YsU0E5Wkk7O0FBZ2FMOzs7QUFHQW1ELG1CQUFXLHFCQUFXO0FBQ3BCLGlCQUFPLENBQUMsQ0FBQ3RxQixPQUFPME0sU0FBUCxDQUFpQm1VLFNBQWpCLENBQTJCQyxLQUEzQixDQUFpQyxVQUFqQyxDQUFUO0FBQ0QsU0FyYUk7O0FBdWFMOzs7QUFHQXlKLGVBQU8saUJBQVc7QUFDaEIsaUJBQU8sQ0FBQyxDQUFDdnFCLE9BQU8wTSxTQUFQLENBQWlCbVUsU0FBakIsQ0FBMkJDLEtBQTNCLENBQWlDLDJCQUFqQyxDQUFUO0FBQ0QsU0E1YUk7O0FBOGFMOzs7QUFHQTBKLG1CQUFXLHFCQUFXO0FBQ3BCLGlCQUFPeHFCLE9BQU9TLEdBQVAsQ0FBVytwQixTQUFYLEVBQVA7QUFDRCxTQW5iSTs7QUFxYkw7OztBQUdBQyxxQkFBYyxZQUFXO0FBQ3ZCLGNBQUlDLEtBQUsxcUIsT0FBTzBNLFNBQVAsQ0FBaUJtVSxTQUExQjtBQUNBLGNBQUlDLFFBQVE0SixHQUFHNUosS0FBSCxDQUFTLGlEQUFULENBQVo7O0FBRUEsY0FBSTZKLFNBQVM3SixRQUFRaEssV0FBV2dLLE1BQU0sQ0FBTixJQUFXLEdBQVgsR0FBaUJBLE1BQU0sQ0FBTixDQUE1QixLQUF5QyxDQUFqRCxHQUFxRCxLQUFsRTs7QUFFQSxpQkFBTyxZQUFXO0FBQ2hCLG1CQUFPNkosTUFBUDtBQUNELFdBRkQ7QUFHRCxTQVRZLEVBeGJSOztBQW1jTDs7Ozs7O0FBTUFwTSw0QkFBb0IsNEJBQVNyYixHQUFULEVBQWNpa0IsU0FBZCxFQUF5QnpqQixJQUF6QixFQUErQjtBQUNqREEsaUJBQU9BLFFBQVEsRUFBZjs7QUFFQSxjQUFJaUosUUFBUXhMLFNBQVNxaUIsV0FBVCxDQUFxQixZQUFyQixDQUFaOztBQUVBLGVBQUssSUFBSW9ILEdBQVQsSUFBZ0JsbkIsSUFBaEIsRUFBc0I7QUFDcEIsZ0JBQUlBLEtBQUs5RCxjQUFMLENBQW9CZ3JCLEdBQXBCLENBQUosRUFBOEI7QUFDNUJqZSxvQkFBTWllLEdBQU4sSUFBYWxuQixLQUFLa25CLEdBQUwsQ0FBYjtBQUNEO0FBQ0Y7O0FBRURqZSxnQkFBTXdkLFNBQU4sR0FBa0JqbkIsTUFDaEIvQyxRQUFRZ0QsT0FBUixDQUFnQkQsR0FBaEIsRUFBcUJRLElBQXJCLENBQTBCUixJQUFJUyxRQUFKLENBQWFDLFdBQWIsRUFBMUIsS0FBeUQsSUFEekMsR0FDZ0QsSUFEbEU7QUFFQStJLGdCQUFNOFcsU0FBTixDQUFnQnZnQixJQUFJUyxRQUFKLENBQWFDLFdBQWIsS0FBNkIsR0FBN0IsR0FBbUN1akIsU0FBbkQsRUFBOEQsSUFBOUQsRUFBb0UsSUFBcEU7O0FBRUFqa0IsY0FBSXdnQixhQUFKLENBQWtCL1csS0FBbEI7QUFDRCxTQXpkSTs7QUEyZEw7Ozs7Ozs7Ozs7OztBQVlBc2Qsb0JBQVksb0JBQVM3cUIsSUFBVCxFQUFlMHFCLE1BQWYsRUFBdUI7QUFDakMsY0FBSWUsUUFBUXpyQixLQUFLeWMsS0FBTCxDQUFXLElBQVgsQ0FBWjs7QUFFQSxtQkFBU2hMLEdBQVQsQ0FBYWlhLFNBQWIsRUFBd0JELEtBQXhCLEVBQStCZixNQUEvQixFQUF1QztBQUNyQyxnQkFBSTFxQixJQUFKO0FBQ0EsaUJBQUssSUFBSTRMLElBQUksQ0FBYixFQUFnQkEsSUFBSTZmLE1BQU1oZSxNQUFOLEdBQWUsQ0FBbkMsRUFBc0M3QixHQUF0QyxFQUEyQztBQUN6QzVMLHFCQUFPeXJCLE1BQU03ZixDQUFOLENBQVA7QUFDQSxrQkFBSThmLFVBQVUxckIsSUFBVixNQUFvQnlELFNBQXBCLElBQWlDaW9CLFVBQVUxckIsSUFBVixNQUFvQixJQUF6RCxFQUErRDtBQUM3RDByQiwwQkFBVTFyQixJQUFWLElBQWtCLEVBQWxCO0FBQ0Q7QUFDRDByQiwwQkFBWUEsVUFBVTFyQixJQUFWLENBQVo7QUFDRDs7QUFFRDByQixzQkFBVUQsTUFBTUEsTUFBTWhlLE1BQU4sR0FBZSxDQUFyQixDQUFWLElBQXFDaWQsTUFBckM7O0FBRUEsZ0JBQUlnQixVQUFVRCxNQUFNQSxNQUFNaGUsTUFBTixHQUFlLENBQXJCLENBQVYsTUFBdUNpZCxNQUEzQyxFQUFtRDtBQUNqRCxvQkFBTSxJQUFJcm9CLEtBQUosQ0FBVSxxQkFBcUJxb0IsT0FBTy9qQixNQUFQLENBQWNna0IsR0FBbkMsR0FBeUMsbURBQW5ELENBQU47QUFDRDtBQUNGOztBQUVELGNBQUl0cEIsSUFBSWdDLGFBQVIsRUFBdUI7QUFDckJvTyxnQkFBSXBRLElBQUlnQyxhQUFSLEVBQXVCb29CLEtBQXZCLEVBQThCZixNQUE5QjtBQUNEOztBQUVEO0FBQ0EsY0FBSTNtQixVQUFVMm1CLE9BQU9oa0IsUUFBUCxDQUFnQixDQUFoQixDQUFkOztBQUVBLGlCQUFPM0MsUUFBUXFHLFVBQWYsRUFBMkI7QUFDekIsZ0JBQUlyRyxRQUFRNG5CLFlBQVIsQ0FBcUIsV0FBckIsQ0FBSixFQUF1QztBQUNyQ2xhLGtCQUFJMVEsUUFBUWdELE9BQVIsQ0FBZ0JBLE9BQWhCLEVBQXlCTyxJQUF6QixDQUE4QixRQUE5QixDQUFKLEVBQTZDbW5CLEtBQTdDLEVBQW9EZixNQUFwRDtBQUNBM21CLHdCQUFVLElBQVY7QUFDQTtBQUNEOztBQUVEQSxzQkFBVUEsUUFBUXFHLFVBQWxCO0FBQ0Q7QUFDRHJHLG9CQUFVLElBQVY7O0FBRUE7QUFDQTBOLGNBQUkzUCxVQUFKLEVBQWdCMnBCLEtBQWhCLEVBQXVCZixNQUF2QjtBQUNEO0FBL2dCSSxPQUFQO0FBaWhCRDtBQUVGLEdBM2hCd0IsQ0FBekI7QUE0aEJELENBcGlCRDs7O0F3RGpCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxPQUFELEVBQVUsU0FBVixFQUFxQixRQUFyQixFQUErQjlmLE9BQS9CLENBQXVDLGdCQUFRO0FBQzdDLE1BQU1naEIsdUJBQXVCdnFCLElBQUl3cUIsWUFBSixDQUFpQjdyQixJQUFqQixDQUE3Qjs7QUFFQXFCLE1BQUl3cUIsWUFBSixDQUFpQjdyQixJQUFqQixJQUF5QixVQUFDOHJCLE9BQUQsRUFBMkI7QUFBQSxRQUFqQjNtQixPQUFpQix1RUFBUCxFQUFPOztBQUNsRCxXQUFPMm1CLE9BQVAsS0FBbUIsUUFBbkIsR0FBK0IzbUIsUUFBUTJtQixPQUFSLEdBQWtCQSxPQUFqRCxHQUE2RDNtQixVQUFVMm1CLE9BQXZFOztBQUVBLFFBQU1ybkIsVUFBVVUsUUFBUVYsT0FBeEI7QUFDQSxRQUFJNGhCLGlCQUFKOztBQUVBbGhCLFlBQVFWLE9BQVIsR0FBa0IsbUJBQVc7QUFDM0I0aEIsaUJBQVd0bEIsUUFBUWdELE9BQVIsQ0FBZ0JVLFVBQVVBLFFBQVFWLE9BQVIsQ0FBVixHQUE2QkEsT0FBN0MsQ0FBWDtBQUNBLGFBQU8xQyxJQUFJUSxRQUFKLENBQWF3a0IsUUFBYixFQUF1QkEsU0FBUzBGLFFBQVQsR0FBb0I3b0IsR0FBcEIsQ0FBd0IsWUFBeEIsQ0FBdkIsQ0FBUDtBQUNELEtBSEQ7O0FBS0FpQyxZQUFRbUUsT0FBUixHQUFrQixZQUFNO0FBQ3RCK2MsZUFBUy9oQixJQUFULENBQWMsUUFBZCxFQUF3QjhILFFBQXhCO0FBQ0FpYSxpQkFBVyxJQUFYO0FBQ0QsS0FIRDs7QUFLQSxXQUFPdUYscUJBQXFCem1CLE9BQXJCLENBQVA7QUFDRCxHQWpCRDtBQWtCRCxDQXJCRDs7O0FDakJBO0FBQ0EsSUFBSXZFLE9BQU9vckIsTUFBUCxJQUFpQmpyQixRQUFRZ0QsT0FBUixLQUFvQm5ELE9BQU9vckIsTUFBaEQsRUFBd0Q7QUFDdERwcEIsVUFBUXFwQixJQUFSLENBQWEscUhBQWIsRUFEc0QsQ0FDK0U7QUFDdEk7OztBQ0hEOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFFQWxyQixVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QkUsR0FBeEIsQ0FBNEIsQ0FBQyxnQkFBRCxFQUFtQixVQUFTQyxjQUFULEVBQXlCO0FBQ3RFLFFBQUkrcUIsWUFBWXRyQixPQUFPbUIsUUFBUCxDQUFnQm9xQixnQkFBaEIsQ0FBaUMsa0NBQWpDLENBQWhCOztBQUVBLFNBQUssSUFBSXZnQixJQUFJLENBQWIsRUFBZ0JBLElBQUlzZ0IsVUFBVXplLE1BQTlCLEVBQXNDN0IsR0FBdEMsRUFBMkM7QUFDekMsVUFBSTZaLFdBQVcxa0IsUUFBUWdELE9BQVIsQ0FBZ0Jtb0IsVUFBVXRnQixDQUFWLENBQWhCLENBQWY7QUFDQSxVQUFJd2dCLEtBQUszRyxTQUFTM2EsSUFBVCxDQUFjLElBQWQsQ0FBVDtBQUNBLFVBQUksT0FBT3NoQixFQUFQLEtBQWMsUUFBbEIsRUFBNEI7QUFDMUJqckIsdUJBQWVDLEdBQWYsQ0FBbUJnckIsRUFBbkIsRUFBdUIzRyxTQUFTNEcsSUFBVCxFQUF2QjtBQUNEO0FBQ0Y7QUFDRixHQVYyQixDQUE1QjtBQVlELENBZkQiLCJmaWxlIjoiYW5ndWxhci1vbnNlbnVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogU2ltcGxlIEphdmFTY3JpcHQgSW5oZXJpdGFuY2UgZm9yIEVTIDUuMVxuICogYmFzZWQgb24gaHR0cDovL2Vqb2huLm9yZy9ibG9nL3NpbXBsZS1qYXZhc2NyaXB0LWluaGVyaXRhbmNlL1xuICogIChpbnNwaXJlZCBieSBiYXNlMiBhbmQgUHJvdG90eXBlKVxuICogTUlUIExpY2Vuc2VkLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgZm5UZXN0ID0gL3h5ei8udGVzdChmdW5jdGlvbigpe3h5ejt9KSA/IC9cXGJfc3VwZXJcXGIvIDogLy4qLztcblxuICAvLyBUaGUgYmFzZSBDbGFzcyBpbXBsZW1lbnRhdGlvbiAoZG9lcyBub3RoaW5nKVxuICBmdW5jdGlvbiBCYXNlQ2xhc3MoKXt9XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IENsYXNzIHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIGNsYXNzXG4gIEJhc2VDbGFzcy5leHRlbmQgPSBmdW5jdGlvbihwcm9wcykge1xuICAgIHZhciBfc3VwZXIgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIC8vIFNldCB1cCB0aGUgcHJvdG90eXBlIHRvIGluaGVyaXQgZnJvbSB0aGUgYmFzZSBjbGFzc1xuICAgIC8vIChidXQgd2l0aG91dCBydW5uaW5nIHRoZSBpbml0IGNvbnN0cnVjdG9yKVxuICAgIHZhciBwcm90byA9IE9iamVjdC5jcmVhdGUoX3N1cGVyKTtcblxuICAgIC8vIENvcHkgdGhlIHByb3BlcnRpZXMgb3ZlciBvbnRvIHRoZSBuZXcgcHJvdG90eXBlXG4gICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wcykge1xuICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgb3ZlcndyaXRpbmcgYW4gZXhpc3RpbmcgZnVuY3Rpb25cbiAgICAgIHByb3RvW25hbWVdID0gdHlwZW9mIHByb3BzW25hbWVdID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIF9zdXBlcltuYW1lXSA9PSBcImZ1bmN0aW9uXCIgJiYgZm5UZXN0LnRlc3QocHJvcHNbbmFtZV0pXG4gICAgICAgID8gKGZ1bmN0aW9uKG5hbWUsIGZuKXtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIHRtcCA9IHRoaXMuX3N1cGVyO1xuXG4gICAgICAgICAgICAgIC8vIEFkZCBhIG5ldyAuX3N1cGVyKCkgbWV0aG9kIHRoYXQgaXMgdGhlIHNhbWUgbWV0aG9kXG4gICAgICAgICAgICAgIC8vIGJ1dCBvbiB0aGUgc3VwZXItY2xhc3NcbiAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBfc3VwZXJbbmFtZV07XG5cbiAgICAgICAgICAgICAgLy8gVGhlIG1ldGhvZCBvbmx5IG5lZWQgdG8gYmUgYm91bmQgdGVtcG9yYXJpbHksIHNvIHdlXG4gICAgICAgICAgICAgIC8vIHJlbW92ZSBpdCB3aGVuIHdlJ3JlIGRvbmUgZXhlY3V0aW5nXG4gICAgICAgICAgICAgIHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IHRtcDtcblxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KShuYW1lLCBwcm9wc1tuYW1lXSlcbiAgICAgICAgOiBwcm9wc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGUgbmV3IGNvbnN0cnVjdG9yXG4gICAgdmFyIG5ld0NsYXNzID0gdHlwZW9mIHByb3RvLmluaXQgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBwcm90by5oYXNPd25Qcm9wZXJ0eShcImluaXRcIilcbiAgICAgICAgPyBwcm90by5pbml0IC8vIEFsbCBjb25zdHJ1Y3Rpb24gaXMgYWN0dWFsbHkgZG9uZSBpbiB0aGUgaW5pdCBtZXRob2RcbiAgICAgICAgOiBmdW5jdGlvbiBTdWJDbGFzcygpeyBfc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG4gICAgICA6IGZ1bmN0aW9uIEVtcHR5Q2xhc3MoKXt9O1xuXG4gICAgLy8gUG9wdWxhdGUgb3VyIGNvbnN0cnVjdGVkIHByb3RvdHlwZSBvYmplY3RcbiAgICBuZXdDbGFzcy5wcm90b3R5cGUgPSBwcm90bztcblxuICAgIC8vIEVuZm9yY2UgdGhlIGNvbnN0cnVjdG9yIHRvIGJlIHdoYXQgd2UgZXhwZWN0XG4gICAgcHJvdG8uY29uc3RydWN0b3IgPSBuZXdDbGFzcztcblxuICAgIC8vIEFuZCBtYWtlIHRoaXMgY2xhc3MgZXh0ZW5kYWJsZVxuICAgIG5ld0NsYXNzLmV4dGVuZCA9IEJhc2VDbGFzcy5leHRlbmQ7XG5cbiAgICByZXR1cm4gbmV3Q2xhc3M7XG4gIH07XG5cbiAgLy8gZXhwb3J0XG4gIHdpbmRvdy5DbGFzcyA9IEJhc2VDbGFzcztcbn0pKCk7XG4iLCIvL0hFQUQgXG4oZnVuY3Rpb24oYXBwKSB7XG50cnkgeyBhcHAgPSBhbmd1bGFyLm1vZHVsZShcInRlbXBsYXRlcy1tYWluXCIpOyB9XG5jYXRjaChlcnIpIHsgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJ0ZW1wbGF0ZXMtbWFpblwiLCBbXSk7IH1cbmFwcC5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcblwidXNlIHN0cmljdFwiO1xuXG4kdGVtcGxhdGVDYWNoZS5wdXQoXCJ0ZW1wbGF0ZXMvc2xpZGluZ19tZW51LnRwbFwiLFwiPGRpdiBjbGFzcz1cXFwib25zZW4tc2xpZGluZy1tZW51X19tZW51XFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCI8ZGl2IGNsYXNzPVxcXCJvbnNlbi1zbGlkaW5nLW1lbnVfX21haW5cXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIlwiKVxuXG4kdGVtcGxhdGVDYWNoZS5wdXQoXCJ0ZW1wbGF0ZXMvc3BsaXRfdmlldy50cGxcIixcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNwbGl0LXZpZXdfX3NlY29uZGFyeSBmdWxsLXNjcmVlblxcXCI+PC9kaXY+XFxuXCIgK1xuICAgIFwiPGRpdiBjbGFzcz1cXFwib25zZW4tc3BsaXQtdmlld19fbWFpbiBmdWxsLXNjcmVlblxcXCI+PC9kaXY+XFxuXCIgK1xuICAgIFwiXCIpXG59XSk7XG59KSgpOyIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBzZXJ2aWNlIGNsYXNzIGZvciBmcmFtZXdvcmsgaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBtb2R1bGUuZmFjdG9yeSgnJG9uc2VuJywgWyckcm9vdFNjb3BlJywgJyR3aW5kb3cnLCAnJGNhY2hlRmFjdG9yeScsICckZG9jdW1lbnQnLCAnJHRlbXBsYXRlQ2FjaGUnLCAnJGh0dHAnLCAnJHEnLCAnJGNvbXBpbGUnLCAnJG9uc0dsb2JhbCcsICdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHdpbmRvdywgJGNhY2hlRmFjdG9yeSwgJGRvY3VtZW50LCAkdGVtcGxhdGVDYWNoZSwgJGh0dHAsICRxLCAkY29tcGlsZSwgJG9uc0dsb2JhbCwgQ29tcG9uZW50Q2xlYW5lcikge1xuXG4gICAgdmFyICRvbnNlbiA9IGNyZWF0ZU9uc2VuU2VydmljZSgpO1xuICAgIHZhciBNb2RpZmllclV0aWwgPSAkb25zR2xvYmFsLl9pbnRlcm5hbC5Nb2RpZmllclV0aWw7XG5cbiAgICByZXR1cm4gJG9uc2VuO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlT25zZW5TZXJ2aWNlKCkge1xuICAgICAgcmV0dXJuIHtcblxuICAgICAgICBESVJFQ1RJVkVfVEVNUExBVEVfVVJMOiAndGVtcGxhdGVzJyxcblxuICAgICAgICBjbGVhbmVyOiBDb21wb25lbnRDbGVhbmVyLFxuXG4gICAgICAgIERldmljZUJhY2tCdXR0b25IYW5kbGVyOiAkb25zR2xvYmFsLl9kZXZpY2VCYWNrQnV0dG9uRGlzcGF0Y2hlcixcblxuICAgICAgICBfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyOiAkb25zR2xvYmFsLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldERlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1ldGhvZE5hbWVzXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZGlzcG9zZSBhbGwgZHJpdmluZyBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlTWV0aG9kczogZnVuY3Rpb24odmlldywgZWxlbWVudCwgbWV0aG9kTmFtZXMpIHtcbiAgICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRbbWV0aG9kTmFtZV0uYXBwbHkoZWxlbWVudCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZpZXcgPSBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0NsYXNzfSBrbGFzc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQ6IGZ1bmN0aW9uKGtsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoa2xhc3MucHJvdG90eXBlLCBwcm9wZXJ0eSwge1xuICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXVtwcm9wZXJ0eV0gPSB2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXR1cm4tYXNzaWduXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnROYW1lc1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbbWFwXVxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGNsZWFyIGFsbCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZUV2ZW50czogZnVuY3Rpb24odmlldywgZWxlbWVudCwgZXZlbnROYW1lcywgbWFwKSB7XG4gICAgICAgICAgbWFwID0gbWFwIHx8IGZ1bmN0aW9uKGRldGFpbCkgeyByZXR1cm4gZGV0YWlsOyB9O1xuICAgICAgICAgIGV2ZW50TmFtZXMgPSBbXS5jb25jYXQoZXZlbnROYW1lcyk7XG4gICAgICAgICAgdmFyIGxpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgbWFwKGV2ZW50LmRldGFpbCB8fCB7fSk7XG4gICAgICAgICAgICAgIHZpZXcuZW1pdChldmVudE5hbWUsIGV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJzW2luZGV4XSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IGxpc3RlbmVycyA9IG1hcCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzRW5hYmxlZEF1dG9TdGF0dXNCYXJGaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISEkb25zR2xvYmFsLl9jb25maWcuYXV0b1N0YXR1c0JhckZpbGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRGaWxsU3RhdHVzQmFyOiAkb25zR2xvYmFsLnNob3VsZEZpbGxTdGF0dXNCYXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b1N0YXR1c0JhckZpbGw6ICRvbnNHbG9iYWwuYXV0b1N0YXR1c0JhckZpbGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkaXJlY3RpdmVcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFnZUVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICovXG4gICAgICAgIGNvbXBpbGVBbmRMaW5rOiBmdW5jdGlvbih2aWV3LCBwYWdlRWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgbGluayA9ICRjb21waWxlKHBhZ2VFbGVtZW50KTtcbiAgICAgICAgICB2YXIgcGFnZVNjb3BlID0gdmlldy5fc2NvcGUuJG5ldygpO1xuXG4gICAgICAgICAgbGluayhwYWdlU2NvcGUpO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogT3ZlcndyaXRlIHBhZ2Ugc2NvcGUuXG4gICAgICAgICAgICovXG4gICAgICAgICAgYW5ndWxhci5lbGVtZW50KHBhZ2VFbGVtZW50KS5kYXRhKCdfc2NvcGUnLCBwYWdlU2NvcGUpO1xuXG4gICAgICAgICAgcGFnZVNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhwYWdlRWxlbWVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFnZUxvYWRlclxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlUGFnZUxvYWRlcjogZnVuY3Rpb24odmlldykge1xuICAgICAgICAgIHJldHVybiBuZXcgd2luZG93Lm9ucy5QYWdlTG9hZGVyKFxuICAgICAgICAgICAgKHtwYWdlLCBwYXJlbnR9LCBkb25lKSA9PiB7XG4gICAgICAgICAgICAgIHdpbmRvdy5vbnMuX2ludGVybmFsLmdldFBhZ2VIVE1MQXN5bmMocGFnZSkudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBpbGVBbmRMaW5rKFxuICAgICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5vbnMuX3V0aWwuY3JlYXRlRWxlbWVudChodG1sLnRyaW0oKSksXG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnX3Njb3BlJykuJGRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICAgICAqIEBwYXJhbSB7U2NvcGV9IFtwYXJhbXMuc2NvcGVdXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBbcGFyYW1zLmVsZW1lbnRdXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFtwYXJhbXMuZWxlbWVudHNdXG4gICAgICAgICAqIEBwYXJhbSB7QXR0cmlidXRlc30gW3BhcmFtcy5hdHRyc11cbiAgICAgICAgICovXG4gICAgICAgIGNsZWFyQ29tcG9uZW50OiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLnNjb3BlKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShwYXJhbXMuc2NvcGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuYXR0cnMpIHtcbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMocGFyYW1zLmF0dHJzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUVsZW1lbnQocGFyYW1zLmVsZW1lbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpbmRFbGVtZW50ZU9iamVjdDogZnVuY3Rpb24oZWxlbWVudCwgbmFtZSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50LmluaGVyaXRlZERhdGEobmFtZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlXG4gICAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQYWdlSFRNTEFzeW5jOiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgICAgdmFyIGNhY2hlID0gJHRlbXBsYXRlQ2FjaGUuZ2V0KHBhZ2UpO1xuXG4gICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICB2YXIgaHRtbCA9IHR5cGVvZiBjYWNoZSA9PT0gJ3N0cmluZycgPyBjYWNoZSA6IGNhY2hlWzFdO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzLm5vcm1hbGl6ZVBhZ2VIVE1MKGh0bWwpKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgdXJsOiBwYWdlLFxuICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHZhciBodG1sID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVQYWdlSFRNTChodG1sKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBub3JtYWxpemVQYWdlSFRNTDogZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICAgIGh0bWwgPSAoJycgKyBodG1sKS50cmltKCk7XG5cbiAgICAgICAgICBpZiAoIWh0bWwubWF0Y2goL148b25zLXBhZ2UvKSkge1xuICAgICAgICAgICAgaHRtbCA9ICc8b25zLXBhZ2UgX211dGVkPicgKyBodG1sICsgJzwvb25zLXBhZ2U+JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIG1vZGlmaWVyIHRlbXBsYXRlciBmdW5jdGlvbi4gVGhlIG1vZGlmaWVyIHRlbXBsYXRlciBnZW5lcmF0ZSBjc3MgY2xhc3NlcyBib3VuZCBtb2RpZmllciBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW21vZGlmaWVyc10gYW4gYXJyYXkgb2YgYXBwZW5kaXggbW9kaWZpZXJcbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZW5lcmF0ZU1vZGlmaWVyVGVtcGxhdGVyOiBmdW5jdGlvbihhdHRycywgbW9kaWZpZXJzKSB7XG4gICAgICAgICAgdmFyIGF0dHJNb2RpZmllcnMgPSBhdHRycyAmJiB0eXBlb2YgYXR0cnMubW9kaWZpZXIgPT09ICdzdHJpbmcnID8gYXR0cnMubW9kaWZpZXIudHJpbSgpLnNwbGl0KC8gKy8pIDogW107XG4gICAgICAgICAgbW9kaWZpZXJzID0gYW5ndWxhci5pc0FycmF5KG1vZGlmaWVycykgPyBhdHRyTW9kaWZpZXJzLmNvbmNhdChtb2RpZmllcnMpIDogYXR0ck1vZGlmaWVycztcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gdGVtcGxhdGUgZWcuICdvbnMtYnV0dG9uLS0qJywgJ29ucy1idXR0b24tLSpfX2l0ZW0nXG4gICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5tYXAoZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoJyonLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9KS5qb2luKCcgJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1vZGlmaWVyIG1ldGhvZHMgdG8gdmlldyBvYmplY3QgZm9yIGN1c3RvbSBlbGVtZW50cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBhZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50czogZnVuY3Rpb24odmlldywgZWxlbWVudCkge1xuICAgICAgICAgIHZhciBtZXRob2RzID0ge1xuICAgICAgICAgICAgaGFzTW9kaWZpZXI6IGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gTW9kaWZpZXJVdGlsLnNwbGl0KGVsZW1lbnQuYXR0cignbW9kaWZpZXInKSk7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IHR5cGVvZiBuZWVkbGUgPT09ICdzdHJpbmcnID8gbmVlZGxlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgICAgIHJldHVybiBNb2RpZmllclV0aWwuc3BsaXQobmVlZGxlKS5zb21lKGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnMuaW5kZXhPZihuZWVkbGUpICE9IC0xO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZU1vZGlmaWVyOiBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgbmVlZGxlID0gdHlwZW9mIG5lZWRsZSA9PT0gJ3N0cmluZycgPyBuZWVkbGUudHJpbSgpIDogJyc7XG5cbiAgICAgICAgICAgICAgdmFyIG1vZGlmaWVyID0gTW9kaWZpZXJVdGlsLnNwbGl0KGVsZW1lbnQuYXR0cignbW9kaWZpZXInKSkuZmlsdGVyKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuICE9PSBuZWVkbGU7XG4gICAgICAgICAgICAgIH0pLmpvaW4oJyAnKTtcblxuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYWRkTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykgKyAnICcgKyBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvZ2dsZU1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBpZiAodGhpcy5oYXNNb2RpZmllcihtb2RpZmllcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGlmaWVyKG1vZGlmaWVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE1vZGlmaWVyKG1vZGlmaWVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmb3IgKHZhciBtZXRob2QgaW4gbWV0aG9kcykge1xuICAgICAgICAgICAgaWYgKG1ldGhvZHMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgICB2aWV3W21ldGhvZF0gPSBtZXRob2RzW21ldGhvZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgbW9kaWZpZXIgbWV0aG9kcyB0byB2aWV3IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkTW9kaWZpZXJNZXRob2RzOiBmdW5jdGlvbih2aWV3LCB0ZW1wbGF0ZSwgZWxlbWVudCkge1xuICAgICAgICAgIHZhciBfdHIgPSBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoJyonLCBtb2RpZmllcik7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBmbnMgPSB7XG4gICAgICAgICAgICBoYXNNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaGFzQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFkZE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0TW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gZWxlbWVudC5hdHRyKCdjbGFzcycpLnNwbGl0KC9cXHMrLyksXG4gICAgICAgICAgICAgICAgICBwYXR0ID0gdGVtcGxhdGUucmVwbGFjZSgnKicsICcuJyk7XG5cbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNscyA9IGNsYXNzZXNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY2xzLm1hdGNoKHBhdHQpKSB7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNscyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvZ2dsZU1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICB2YXIgY2xzID0gX3RyKG1vZGlmaWVyKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoY2xzKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKGNscyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGFwcGVuZCA9IGZ1bmN0aW9uKG9sZEZuLCBuZXdGbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbGRGbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGRGbi5hcHBseShudWxsLCBhcmd1bWVudHMpIHx8IG5ld0ZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gbmV3Rm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZpZXcuaGFzTW9kaWZpZXIgPSBhcHBlbmQodmlldy5oYXNNb2RpZmllciwgZm5zLmhhc01vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnJlbW92ZU1vZGlmaWVyID0gYXBwZW5kKHZpZXcucmVtb3ZlTW9kaWZpZXIsIGZucy5yZW1vdmVNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5hZGRNb2RpZmllciA9IGFwcGVuZCh2aWV3LmFkZE1vZGlmaWVyLCBmbnMuYWRkTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcuc2V0TW9kaWZpZXIgPSBhcHBlbmQodmlldy5zZXRNb2RpZmllciwgZm5zLnNldE1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnRvZ2dsZU1vZGlmaWVyID0gYXBwZW5kKHZpZXcudG9nZ2xlTW9kaWZpZXIsIGZucy50b2dnbGVNb2RpZmllcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBtb2RpZmllciBtZXRob2RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZU1vZGlmaWVyTWV0aG9kczogZnVuY3Rpb24odmlldykge1xuICAgICAgICAgIHZpZXcuaGFzTW9kaWZpZXIgPSB2aWV3LnJlbW92ZU1vZGlmaWVyID1cbiAgICAgICAgICAgIHZpZXcuYWRkTW9kaWZpZXIgPSB2aWV3LnNldE1vZGlmaWVyID1cbiAgICAgICAgICAgIHZpZXcudG9nZ2xlTW9kaWZpZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSBhIHZhcmlhYmxlIHRvIEphdmFTY3JpcHQgZ2xvYmFsIHNjb3BlIGFuZCBBbmd1bGFySlMgc2NvcGUgYXMgJ3ZhcicgYXR0cmlidXRlIG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBkZWNsYXJlVmFyQXR0cmlidXRlOiBmdW5jdGlvbihhdHRycywgb2JqZWN0KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhdHRycy52YXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgdmFyTmFtZSA9IGF0dHJzLnZhcjtcbiAgICAgICAgICAgIHRoaXMuX2RlZmluZVZhcih2YXJOYW1lLCBvYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfcmVnaXN0ZXJFdmVudEhhbmRsZXI6IGZ1bmN0aW9uKGNvbXBvbmVudCwgZXZlbnROYW1lKSB7XG4gICAgICAgICAgdmFyIGNhcGl0YWxpemVkRXZlbnROYW1lID0gZXZlbnROYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZXZlbnROYW1lLnNsaWNlKDEpO1xuXG4gICAgICAgICAgY29tcG9uZW50Lm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoY29tcG9uZW50Ll9lbGVtZW50WzBdLCBldmVudE5hbWUsIGV2ZW50ICYmIGV2ZW50LmRldGFpbCk7XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0gY29tcG9uZW50Ll9hdHRyc1snb25zJyArIGNhcGl0YWxpemVkRXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWwoaGFuZGxlciwgeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgICAgY29tcG9uZW50Ll9zY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdGVyIGV2ZW50IGhhbmRsZXJzIGZvciBhdHRyaWJ1dGVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVzXG4gICAgICAgICAqL1xuICAgICAgICByZWdpc3RlckV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uKGNvbXBvbmVudCwgZXZlbnROYW1lcykge1xuICAgICAgICAgIGV2ZW50TmFtZXMgPSBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudE5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50TmFtZXNbaV07XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlckV2ZW50SGFuZGxlcihjb21wb25lbnQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNBbmRyb2lkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISF3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvYW5kcm9pZC9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzSU9TOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISF3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlwYWR8aXBob25lfGlwb2QgdG91Y2gpL2kpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNXZWJWaWV3OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gd2luZG93Lm9ucy5pc1dlYlZpZXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzSU9TN2Fib3ZlOiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgdmFyIG1hdGNoID0gdWEubWF0Y2goLyhpUGFkfGlQaG9uZXxpUG9kIHRvdWNoKTsuKkNQVS4qT1MgKFxcZCspXyhcXGQrKS9pKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBtYXRjaCA/IHBhcnNlRmxvYXQobWF0Y2hbMl0gKyAnLicgKyBtYXRjaFszXSkgPj0gNyA6IGZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlIGEgbmFtZWQgZXZlbnQgZm9yIGEgY29tcG9uZW50LiBUaGUgdmlldyBvYmplY3QsIGlmIGl0IGV4aXN0cywgaXMgYXR0YWNoZWQgdG8gZXZlbnQuY29tcG9uZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbZG9tXVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgZmlyZUNvbXBvbmVudEV2ZW50OiBmdW5jdGlvbihkb20sIGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuXG4gICAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcblxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIGV2ZW50W2tleV0gPSBkYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXZlbnQuY29tcG9uZW50ID0gZG9tID9cbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChkb20pLmRhdGEoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHx8IG51bGwgOiBudWxsO1xuICAgICAgICAgIGV2ZW50LmluaXRFdmVudChkb20ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSArICc6JyArIGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICBkb20uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSBhIHZhcmlhYmxlIHRvIEphdmFTY3JpcHQgZ2xvYmFsIHNjb3BlIGFuZCBBbmd1bGFySlMgc2NvcGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFV0aWwuZGVmaW5lVmFyKCdmb28nLCAnZm9vLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28gYW5kICRzY29wZS5mb28gaXMgbm93ICdmb28tdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIFV0aWwuZGVmaW5lVmFyKCdmb28uYmFyJywgJ2Zvby1iYXItdmFsdWUnKTtcbiAgICAgICAgICogLy8gPT4gd2luZG93LmZvby5iYXIgYW5kICRzY29wZS5mb28uYmFyIGlzIG5vdyAnZm9vLWJhci12YWx1ZSdcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgX2RlZmluZVZhcjogZnVuY3Rpb24obmFtZSwgb2JqZWN0KSB7XG4gICAgICAgICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdCgvXFwuLyk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXQoY29udGFpbmVyLCBuYW1lcywgb2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgbmFtZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcltuYW1lXSA9PT0gdW5kZWZpbmVkIHx8IGNvbnRhaW5lcltuYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lXSA9IHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lcltuYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGFpbmVyW25hbWVzW25hbWVzLmxlbmd0aCAtIDFdXSA9IG9iamVjdDtcblxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gIT09IG9iamVjdCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgdmFyPVwiJyArIG9iamVjdC5fYXR0cnMudmFyICsgJ1wiIGJlY2F1c2UgaXQgd2lsbCBvdmVyd3JpdGUgYSByZWFkLW9ubHkgdmFyaWFibGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9ucy5jb21wb25lbnRCYXNlKSB7XG4gICAgICAgICAgICBzZXQob25zLmNvbXBvbmVudEJhc2UsIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEF0dGFjaCB0byBhbmNlc3RvciB3aXRoIG9ucy1zY29wZSBhdHRyaWJ1dGUuXG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSBvYmplY3QuX2VsZW1lbnRbMF07XG5cbiAgICAgICAgICB3aGlsZSAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ29ucy1zY29wZScpKSB7XG4gICAgICAgICAgICAgIHNldChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnX3Njb3BlJyksIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgIC8vIElmIG5vIG9ucy1zY29wZSBlbGVtZW50IHdhcyBmb3VuZCwgYXR0YWNoIHRvICRyb290U2NvcGUuXG4gICAgICAgICAgc2V0KCRyb290U2NvcGUsIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtYWxlcnQtZGlhbG9nXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBhbGVydCBkaWFsb2cuWy9lbl1cbiAqICBbamFd44GT44Gu44Ki44Op44O844OI44OA44Kk44Ki44Ot44Kw44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GXbGlzdGVuZXLjg5Hjg6njg6Hjg7zjgr/jgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgIHjgZ3jga7jgqTjg5njg7Pjg4jjga7jg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBrumWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkua4oeOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIEFsZXJ0IGRpYWxvZyBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FsZXJ0RGlhbG9nJywgWyckb25zZW4nLCAnQWxlcnREaWFsb2dWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBBbGVydERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgYWxlcnREaWFsb2cgPSBuZXcgQWxlcnREaWFsb2dWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBhbGVydERpYWxvZyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGFsZXJ0RGlhbG9nLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhhbGVydERpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFsZXJ0LWRpYWxvZycsIGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGFsZXJ0RGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ0FsZXJ0RGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkFsZXJ0RGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkFuZHJvaWRBbGVydERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0lPU0FsZXJ0RGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLklPU0FsZXJ0RGlhbG9nQW5pbWF0b3IpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJykudmFsdWUoJ0FuaW1hdGlvbkNob29zZXInLCBvbnMuX2ludGVybmFsLkFuaW1hdG9yRmFjdG9yeSk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1jYXJvdXNlbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1DYXJvdXNlbCBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXeOCq+ODq+ODvOOCu+ODq+OCkuihqOekuuOBp+OBjeOCi+OCs+ODs+ODneODvOODjeODs+ODiOOAglsvamFdXG4gKiBAY29kZXBlbiB4YmJ6T1FcbiAqIEBndWlkZSBVc2luZ0Nhcm91c2VsXG4gKiAgIFtlbl1MZWFybiBob3cgdG8gdXNlIHRoZSBjYXJvdXNlbCBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXWNhcm91c2Vs44Kz44Oz44Od44O844ON44Oz44OI44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWNhcm91c2VsIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogMjAwcHhcIj5cbiAqICAgPG9ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgLi4uXG4gKiAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogPC9vbnMtY2Fyb3VzZWw+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgY2Fyb3VzZWwuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCq+ODq+ODvOOCu+ODq+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVmcmVzaFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicmVmcmVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicmVmcmVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW92ZXJzY3JvbGxcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm92ZXJzY3JvbGxcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm92ZXJzY3JvbGxcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNDYXJvdXNlbCcsIFsnJG9uc2VuJywgJ0Nhcm91c2VsVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgQ2Fyb3VzZWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWNhcm91c2VsJywgY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhjYXJvdXNlbCwgJ3Bvc3RjaGFuZ2UgcmVmcmVzaCBvdmVyc2Nyb2xsIGRlc3Ryb3knKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2Fyb3VzZWwuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWNhcm91c2VsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH1dKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNDYXJvdXNlbEl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuJGxhc3QpIHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0ucGFyZW50RWxlbWVudC5fc2V0dXAoKTtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0ucGFyZW50RWxlbWVudC5fc2V0dXBJbml0aWFsSW5kZXgoKTtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0ucGFyZW50RWxlbWVudC5fc2F2ZUxhc3RTdGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtZGlhbG9nXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBkaWFsb2cuWy9lbl1cbiAqICBbamFd44GT44Gu44OA44Kk44Ki44Ot44Kw44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0RpYWxvZycsIFsnJG9uc2VuJywgJ0RpYWxvZ1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBkaWFsb2cgPSBuZXcgRGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGRpYWxvZyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGRpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoZGlhbG9nLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgZGlhbG9nKTtcbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoZGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnSU9TRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLklPU0RpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0FuZHJvaWREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuQW5kcm9pZERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ1NsaWRlRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlNsaWRlRGlhbG9nQW5pbWF0b3IpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtZmFiXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoZSBmbG9hdGluZyBhY3Rpb24gYnV0dG9uLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5Xjg63jg7zjg4bjgqPjg7PjgrDjgqLjgq/jgrfjg6fjg7Pjg5zjgr/jg7PjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLjgZfjgabjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNGYWInLCBbJyRvbnNlbicsICdGYWJWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBGYWJWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgZmFiID0gbmV3IEZhYlZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWZhYicsIGZhYik7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgZmFiKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWZhYicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnR2VuZXJpY1ZpZXcnLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIEdlbmVyaWNWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGlyZWN0aXZlT25seV1cbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRGVzdHJveV1cbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBvcHRpb25zID0ge307XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZGlyZWN0aXZlT25seSkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSBpcyB1bmRlZmluZWQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHModGhpcywgb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlLCBlbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGhpcywgZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHNlbGYpO1xuXG4gICAgICAgICAgaWYgKG9wdGlvbnMub25EZXN0cm95KSB7XG4gICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveShzZWxmKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzLFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2VsZiA9IGVsZW1lbnQgPSBzZWxmLl9lbGVtZW50ID0gc2VsZi5fc2NvcGUgPSBzY29wZSA9IHNlbGYuX2F0dHJzID0gYXR0cnMgPSBvcHRpb25zID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMudmlld0tleVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZGlyZWN0aXZlT25seV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGVdXG4gICAgICovXG4gICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIgPSBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycywgb3B0aW9ucyk7XG5cbiAgICAgIGlmICghb3B0aW9ucy52aWV3S2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb3B0aW9ucy52aWV3S2V5IGlzIHJlcXVpcmVkLicpO1xuICAgICAgfVxuXG4gICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICBlbGVtZW50LmRhdGEob3B0aW9ucy52aWV3S2V5LCB2aWV3KTtcblxuICAgICAgdmFyIGRlc3Ryb3kgPSBvcHRpb25zLm9uRGVzdHJveSB8fCBhbmd1bGFyLm5vb3A7XG4gICAgICBvcHRpb25zLm9uRGVzdHJveSA9IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgZGVzdHJveSh2aWV3KTtcbiAgICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgbnVsbCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdmlldztcbiAgICB9O1xuXG4gICAgTWljcm9FdmVudC5taXhpbihHZW5lcmljVmlldyk7XG5cbiAgICByZXR1cm4gR2VuZXJpY1ZpZXc7XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sYXp5LXJlcGVhdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBVc2luZyB0aGlzIGNvbXBvbmVudCBhIGxpc3Qgd2l0aCBtaWxsaW9ucyBvZiBpdGVtcyBjYW4gYmUgcmVuZGVyZWQgd2l0aG91dCBhIGRyb3AgaW4gcGVyZm9ybWFuY2UuXG4gKiAgICAgSXQgZG9lcyB0aGF0IGJ5IFwibGF6aWx5XCIgbG9hZGluZyBlbGVtZW50cyBpbnRvIHRoZSBET00gd2hlbiB0aGV5IGNvbWUgaW50byB2aWV3IGFuZFxuICogICAgIHJlbW92aW5nIGl0ZW1zIGZyb20gdGhlIERPTSB3aGVuIHRoZXkgYXJlIG5vdCB2aXNpYmxlLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI5YaF44Gn5o+P55S744GV44KM44KL44Ki44Kk44OG44Og44GuRE9N6KaB57Sg44Gu6Kqt44G/6L6844G/44Gv44CB55S76Z2i44Gr6KaL44GI44Gd44GG44Gr44Gq44Gj44Gf5pmC44G+44Gn6Ieq5YuV55qE44Gr6YGF5bu244GV44KM44CBXG4gKiAgICAg55S76Z2i44GL44KJ6KaL44GI44Gq44GP44Gq44Gj44Gf5aC05ZCI44Gr44Gv44Gd44Gu6KaB57Sg44Gv5YuV55qE44Gr44Ki44Oz44Ot44O844OJ44GV44KM44G+44GZ44CCXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5L2/44GG44GT44Go44Gn44CB44OR44OV44Kp44O844Oe44Oz44K544KS5Yqj5YyW44GV44Gb44KL44GT44Go54Sh44GX44Gr5beo5aSn44Gq5pWw44Gu6KaB57Sg44KS5o+P55S744Gn44GN44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAY29kZXBlbiBRd3JHQm1cbiAqIEBndWlkZSBVc2luZ0xhenlSZXBlYXRcbiAqICAgW2VuXUhvdyB0byB1c2UgTGF6eSBSZXBlYXRbL2VuXVxuICogICBbamFd44Os44Kk44K444O844Oq44OU44O844OI44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAqICAgICAkc2NvcGUuTXlEZWxlZ2F0ZSA9IHtcbiAqICAgICAgIGNvdW50SXRlbXM6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAvLyBSZXR1cm4gbnVtYmVyIG9mIGl0ZW1zLlxuICogICAgICAgICByZXR1cm4gMTAwMDAwMDtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY2FsY3VsYXRlSXRlbUhlaWdodDogZnVuY3Rpb24oaW5kZXgpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIHRoZSBoZWlnaHQgb2YgYW4gaXRlbSBpbiBwaXhlbHMuXG4gKiAgICAgICAgIHJldHVybiA0NTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY29uZmlndXJlSXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIEluaXRpYWxpemUgc2NvcGVcbiAqICAgICAgICAgaXRlbVNjb3BlLml0ZW0gPSAnSXRlbSAjJyArIChpbmRleCArIDEpO1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBkZXN0cm95SXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIE9wdGlvbmFsIG1ldGhvZCB0aGF0IGlzIGNhbGxlZCB3aGVuIGFuIGl0ZW0gaXMgdW5sb2FkZWQuXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCdEZXN0cm95ZWQgaXRlbSB3aXRoIGluZGV4OiAnICsgaW5kZXgpO1xuICogICAgICAgfVxuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1saXN0IG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLWxhenktcmVwZWF0PVwiTXlEZWxlZ2F0ZVwiPlxuICogICAgIHt7IGl0ZW0gfX1cbiAqICAgPC9vbnMtbGlzdC1pdGVtPlxuICogPC9vbnMtbGlzdD5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWxhenktcmVwZWF0XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUEgZGVsZWdhdGUgb2JqZWN0LCBjYW4gYmUgZWl0aGVyIGFuIG9iamVjdCBhdHRhY2hlZCB0byB0aGUgc2NvcGUgKHdoZW4gdXNpbmcgQW5ndWxhckpTKSBvciBhIG5vcm1hbCBKYXZhU2NyaXB0IHZhcmlhYmxlLlsvZW5dXG4gKiAgW2phXeimgee0oOOBruODreODvOODieOAgeOCouODs+ODreODvOODieOBquOBqeOBruWHpueQhuOCkuWnlOitsuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAgkFuZ3VsYXJKU+OBruOCueOCs+ODvOODl+OBruWkieaVsOWQjeOChOOAgemAmuW4uOOBrkphdmFTY3JpcHTjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQHByb3BlcnR5IGRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GdW5jdGlvbiB3aGljaCByZWNpZXZlcyBhbiBpbmRleCBhbmQgdGhlIHNjb3BlIGZvciB0aGUgaXRlbS4gQ2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHZhbHVlcyBpbiB0aGUgaXRlbSBzY29wZS5bL2VuXVxuICogICBbamFdWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIExhenkgcmVwZWF0IGRpcmVjdGl2ZS5cbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0xhenlSZXBlYXQnLCBbJyRvbnNlbicsICdMYXp5UmVwZWF0VmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgTGF6eVJlcGVhdFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgICB0ZXJtaW5hbDogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBsYXp5UmVwZWF0ID0gbmV3IExhenlSZXBlYXRWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGxhenlSZXBlYXQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZScsIFsnJGNvbXBpbGUnLCBmdW5jdGlvbigkY29tcGlsZSkge1xuXG4gICAgY29uc3QgZGlyZWN0aXZlQXR0cmlidXRlcyA9IFsnb25zLWxhenktcmVwZWF0JywgJ29uczpsYXp5OnJlcGVhdCcsICdvbnNfbGF6eV9yZXBlYXQnLCAnZGF0YS1vbnMtbGF6eS1yZXBlYXQnLCAneC1vbnMtbGF6eS1yZXBlYXQnXTtcbiAgICBjbGFzcyBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlIGV4dGVuZHMgb25zLl9pbnRlcm5hbC5MYXp5UmVwZWF0RGVsZWdhdGUge1xuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gdXNlckRlbGVnYXRlXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAgICogQHBhcmFtIHtTY29wZX0gcGFyZW50U2NvcGVcbiAgICAgICAqL1xuICAgICAgY29uc3RydWN0b3IodXNlckRlbGVnYXRlLCB0ZW1wbGF0ZUVsZW1lbnQsIHBhcmVudFNjb3BlKSB7XG4gICAgICAgIHN1cGVyKHVzZXJEZWxlZ2F0ZSwgdGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fcGFyZW50U2NvcGUgPSBwYXJlbnRTY29wZTtcblxuICAgICAgICBkaXJlY3RpdmVBdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB0ZW1wbGF0ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIpKTtcbiAgICAgICAgdGhpcy5fbGlua2VyID0gJGNvbXBpbGUodGVtcGxhdGVFbGVtZW50ID8gdGVtcGxhdGVFbGVtZW50LmNsb25lTm9kZSh0cnVlKSA6IG51bGwpO1xuICAgICAgfVxuXG4gICAgICBjb25maWd1cmVJdGVtU2NvcGUoaXRlbSwgc2NvcGUpe1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZShpdGVtLCBzY29wZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGVzdHJveUl0ZW1TY29wZShpdGVtLCBlbGVtZW50KXtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5kZXN0cm95SXRlbVNjb3BlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl91c2VyRGVsZWdhdGUuZGVzdHJveUl0ZW1TY29wZShpdGVtLCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfdXNpbmdCaW5kaW5nKCkge1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jcmVhdGVJdGVtQ29udGVudCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYGxhenktcmVwZWF0YCBkZWxlZ2F0ZSBvYmplY3QgaXMgdmFndWUuJyk7XG4gICAgICB9XG5cbiAgICAgIGxvYWRJdGVtRWxlbWVudChpbmRleCwgcGFyZW50LCBkb25lKSB7XG4gICAgICAgIHRoaXMuX3ByZXBhcmVJdGVtRWxlbWVudChpbmRleCwgKHtlbGVtZW50LCBzY29wZX0pID0+IHtcbiAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgZG9uZSh7ZWxlbWVudCwgc2NvcGV9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIF9wcmVwYXJlSXRlbUVsZW1lbnQoaW5kZXgsIGRvbmUpIHtcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLl9wYXJlbnRTY29wZS4kbmV3KCk7XG4gICAgICAgIHRoaXMuX2FkZFNwZWNpYWxQcm9wZXJ0aWVzKGluZGV4LCBzY29wZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgdGhpcy5jb25maWd1cmVJdGVtU2NvcGUoaW5kZXgsIHNjb3BlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xpbmtlcihzY29wZSwgKGNsb25lZCkgPT4ge1xuICAgICAgICAgIGxldCBlbGVtZW50ID0gY2xvbmVkWzBdO1xuICAgICAgICAgIGlmICghdGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLl91c2VyRGVsZWdhdGUuY3JlYXRlSXRlbUNvbnRlbnQoaW5kZXgsIGVsZW1lbnQpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvbmUoe2VsZW1lbnQsIHNjb3BlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKi9cbiAgICAgIF9hZGRTcGVjaWFsUHJvcGVydGllcyhpLCBzY29wZSkge1xuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5jb3VudEl0ZW1zKCkgLSAxO1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChzY29wZSwge1xuICAgICAgICAgICRpbmRleDogaSxcbiAgICAgICAgICAkZmlyc3Q6IGkgPT09IDAsXG4gICAgICAgICAgJGxhc3Q6IGkgPT09IGxhc3QsXG4gICAgICAgICAgJG1pZGRsZTogaSAhPT0gMCAmJiBpICE9PSBsYXN0LFxuICAgICAgICAgICRldmVuOiBpICUgMiA9PT0gMCxcbiAgICAgICAgICAkb2RkOiBpICUgMiA9PT0gMVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlSXRlbShpbmRleCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICBpdGVtLnNjb3BlLiRldmFsQXN5bmMoKCkgPT4gdGhpcy5jb25maWd1cmVJdGVtU2NvcGUoaW5kZXgsIGl0ZW0uc2NvcGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBlci51cGRhdGVJdGVtKGluZGV4LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtLnNjb3BlXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGl0ZW0uZWxlbWVudFxuICAgICAgICovXG4gICAgICBkZXN0cm95SXRlbShpbmRleCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lJdGVtU2NvcGUoaW5kZXgsIGl0ZW0uc2NvcGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyLmRlc3Ryb3lJdGVtKGluZGV4LCBpdGVtLmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uc2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgIH1cblxuICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9zY29wZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLW1vZGFsXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQHR5cGUge1N0cmluZ31cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgbW9kYWwuWy9lbl1cbiAqICAgW2phXeOBk+OBruODouODvOODgOODq+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIE1vZGFsIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTW9kYWwnLCBbJyRvbnNlbicsICdNb2RhbFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIE1vZGFsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiAoZWxlbWVudCwgYXR0cnMpID0+IHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgbW9kYWwgPSBuZXcgTW9kYWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMobW9kYWwsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgbW9kYWwpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbW9kYWwnLCBtb2RhbCk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhtb2RhbCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgbW9kYWwgPSBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLW5hdmlnYXRvclxuICogQGV4YW1wbGVcbiAqIDxvbnMtbmF2aWdhdG9yIGFuaW1hdGlvbj1cInNsaWRlXCIgdmFyPVwiYXBwLm5hdmlcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wdXNoUGFnZSgncGFnZS5odG1sJyk7XCI+UHVzaDwvb25zLWJ1dHRvbj5cbiAqICAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy1uYXZpZ2F0b3I+XG4gKlxuICogPG9ucy10ZW1wbGF0ZSBpZD1cInBhZ2UuaHRtbFwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICAgPG9ucy10b29sYmFyPlxuICogICAgICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlRpdGxlPC9kaXY+XG4gKiAgICAgPC9vbnMtdG9vbGJhcj5cbiAqXG4gKiAgICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgIDxvbnMtYnV0dG9uIG1vZGlmaWVyPVwibGlnaHRcIiBuZy1jbGljaz1cImFwcC5uYXZpLnBvcFBhZ2UoKTtcIj5Qb3A8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBuYXZpZ2F0b3IuWy9lbl1cbiAqICBbamFd44GT44Gu44OK44OT44Ky44O844K/44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXB1c2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXBvcFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlcG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cHVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3Rwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3Rwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3Rwb3BcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5OYXZpZ2F0b3JFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtbmF2aWdhdG9yJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc05hdmlnYXRvcicsIFsnTmF2aWdhdG9yVmlldycsICckb25zZW4nLCBmdW5jdGlvbihOYXZpZ2F0b3JWaWV3LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IE5hdmlnYXRvclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh2aWV3LCAncHJlcHVzaCBwcmVwb3AgcG9zdHB1c2ggcG9zdHBvcCBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW5hdmlnYXRvcicsIHZpZXcpO1xuXG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW5hdmlnYXRvcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ05hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ0ZhZGVUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkZhZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnSU9TU2xpZGVUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLklPU1NsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ0xpZnRUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkxpZnROYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnTnVsbFRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ1NpbXBsZVNsaWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5TaW1wbGVTbGlkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcik7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvcicsIFsnU2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKFNsaWRpbmdNZW51QW5pbWF0b3IpIHtcblxuICAgIHZhciBPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvciA9IFNsaWRpbmdNZW51QW5pbWF0b3IuZXh0ZW5kKHtcblxuICAgICAgX2JsYWNrTWFzazogdW5kZWZpbmVkLFxuXG4gICAgICBfaXNSaWdodDogZmFsc2UsXG4gICAgICBfZWxlbWVudDogZmFsc2UsXG4gICAgICBfbWVudVBhZ2U6IGZhbHNlLFxuICAgICAgX21haW5QYWdlOiBmYWxzZSxcbiAgICAgIF93aWR0aDogZmFsc2UsXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGggXCJ3aWR0aFwiIHN0eWxlIHZhbHVlXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBzZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgbWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgJzkwJSc7XG4gICAgICAgIHRoaXMuX2lzUmlnaHQgPSAhIW9wdGlvbnMuaXNSaWdodDtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gbWFpblBhZ2U7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlID0gbWVudVBhZ2U7XG5cbiAgICAgICAgbWVudVBhZ2UuY3NzKCdib3gtc2hhZG93JywgJzBweCAwIDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKScpO1xuICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgICB6SW5kZXg6IDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRml4IGZvciB0cmFuc3BhcmVudCBtZW51IHBhZ2Ugb24gaU9TOC5cbiAgICAgICAgbWVudVBhZ2UuY3NzKCctd2Via2l0LXRyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KScpO1xuXG4gICAgICAgIG1haW5QYWdlLmNzcyh7ekluZGV4OiAxfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICctJyArIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICctJyArIG9wdGlvbnMud2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2JsYWNrTWFzayA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5jc3Moe1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgICAgICBib3R0b206ICcwcHgnLFxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgICB6SW5kZXg6IDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5wcmVwZW5kKHRoaXMuX2JsYWNrTWFzayk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCd3aWR0aCcsIG9wdGlvbnMud2lkdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnLScgKyBvcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnLScgKyBvcHRpb25zLndpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pc09wZW5lZCkge1xuICAgICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICB2YXIgbWVudVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNZW51UGFnZVN0eWxlKG1heCk7XG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSkucXVldWUobWVudVN0eWxlKS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICovXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JsYWNrTWFzaykge1xuICAgICAgICAgIHRoaXMuX2JsYWNrTWFzay5yZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbWFpblBhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fbWFpblBhZ2UgPSB0aGlzLl9tZW51UGFnZSA9IG51bGw7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgb3Blbk1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIG1lbnVTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWVudVBhZ2VTdHlsZShtYXgpO1xuICAgICAgICB2YXIgbWFpblBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWFpblBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWFpblBhZ2VTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtZW51U3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgY2xvc2VNZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcyh7ZGlzcGxheTogJ2Jsb2NrJ30pO1xuXG4gICAgICAgIHZhciBtZW51UGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNZW51UGFnZVN0eWxlKDApO1xuICAgICAgICB2YXIgbWFpblBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWFpblBhZ2VTdHlsZSgwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKG1haW5QYWdlU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtZW51UGFnZVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGlzdGFuY2VcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heERpc3RhbmNlXG4gICAgICAgKi9cbiAgICAgIHRyYW5zbGF0ZU1lbnU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcyh7ZGlzcGxheTogJ2Jsb2NrJ30pO1xuXG4gICAgICAgIHZhciBtZW51UGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNZW51UGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUoTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuICAgICAgICBkZWxldGUgbWFpblBhZ2VTdHlsZS5vcGFjaXR5O1xuXG4gICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKG1lbnVQYWdlU3R5bGUpXG4gICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobWFpblBhZ2VTdHlsZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAucXVldWUobWFpblBhZ2VTdHlsZSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZU1lbnVQYWdlU3R5bGU6IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAwLCAwKSc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAnYm94LXNoYWRvdyc6IGRpc3RhbmNlID09PSAwID8gJ25vbmUnIDogJzBweCAwIDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSdcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZU1haW5QYWdlU3R5bGU6IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIG9wYWNpdHkgPSAxIC0gKDAuMSAqIGRpc3RhbmNlIC8gbWF4KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHlcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IE92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT3ZlcmxheVNsaWRpbmdNZW51QW5pbWF0b3I7XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXBhZ2VcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBwYWdlLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5rjg7zjgrjjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1pbmZpbml0ZS1zY3JvbGxcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUGF0aCBvZiB0aGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb24gaW5maW5pdGUgc2Nyb2xsaW5nLiBUaGUgcGF0aCBpcyByZWxhdGl2ZSB0byAkc2NvcGUuIFRoZSBmdW5jdGlvbiByZWNlaXZlcyBhIGRvbmUgY2FsbGJhY2sgdGhhdCBtdXN0IGJlIGNhbGxlZCB3aGVuIGl0J3MgZmluaXNoZWQuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9uLWRldmljZS1iYWNrLWJ1dHRvblxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgYmFjayBidXR0b24gaXMgcHJlc3NlZC5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44GM5oq844GV44KM44Gf5pmC44Gu5oyZ5YuV44KS6Kit5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctZGV2aWNlLWJhY2stYnV0dG9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdpdGggYW4gQW5ndWxhckpTIGV4cHJlc3Npb24gd2hlbiB0aGUgYmFjayBidXR0b24gaXMgcHJlc3NlZC5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44GM5oq844GV44KM44Gf5pmC44Gu5oyZ5YuV44KS6Kit5a6a44Gn44GN44G+44GZ44CCQW5ndWxhckpT44GuZXhwcmVzc2lvbuOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNQYWdlJywgWyckb25zZW4nLCAnUGFnZVZpZXcnLCBmdW5jdGlvbigkb25zZW4sIFBhZ2VWaWV3KSB7XG5cbiAgICBmdW5jdGlvbiBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgZGlydHkgZml4XG4gICAgICB2YXIgaSA9IDAsIGYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGkrKyA8IDE1KSAge1xuICAgICAgICAgIGlmIChpc0F0dGFjaGVkKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnQsICdpbml0Jyk7XG4gICAgICAgICAgICBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGkgPiAxMCkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBmaXJlIFwicGFnZWluaXRcIiBldmVudC4gQXR0YWNoIFwib25zLXBhZ2VcIiBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBhZnRlciBpbml0aWFsaXphdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50KGVsZW1lbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldmVudC5pbml0RXZlbnQoJ3BhZ2Vpbml0JywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXR0YWNoZWQoZWxlbWVudCkge1xuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgPyBpc0F0dGFjaGVkKGVsZW1lbnQucGFyZW50Tm9kZSkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBuZXcgUGFnZVZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwYWdlLCAnaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgcGFnZSk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocGFnZSwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwYWdlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocGFnZSk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBhZ2UnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGZpcmVQYWdlSW5pdEV2ZW50KGVsZW1lbnRbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcG9wb3ZlclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcG9wb3Zlci5bL2VuXVxuICogIFtqYV3jgZPjga7jg53jg4Pjg5fjgqrjg7zjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUG9wb3ZlcicsIFsnJG9uc2VuJywgJ1BvcG92ZXJWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBQb3BvdmVyVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgICAgdmFyIHBvcG92ZXIgPSBuZXcgUG9wb3ZlclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBvcG92ZXIpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwb3BvdmVyLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhwb3BvdmVyLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcG9wb3ZlcicsIHBvcG92ZXIpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHBvcG92ZXIuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhwb3BvdmVyKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcG9wb3ZlcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnUG9wb3ZlckFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5Qb3BvdmVyQW5pbWF0b3IpXG4gIC52YWx1ZSgnRmFkZVBvcG92ZXJBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRmFkZVBvcG92ZXJBbmltYXRvcik7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wdWxsLWhvb2tcbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XG4gKiAgICAgJHNjb3BlLml0ZW1zID0gWzMsIDIgLDFdO1xuICpcbiAqICAgICAkc2NvcGUubG9hZCA9IGZ1bmN0aW9uKCRkb25lKSB7XG4gKiAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAqICAgICAgICAgJHNjb3BlLml0ZW1zLnVuc2hpZnQoJHNjb3BlLml0ZW1zLmxlbmd0aCArIDEpO1xuICogICAgICAgICAkZG9uZSgpO1xuICogICAgICAgfSwgMTAwMCk7XG4gKiAgICAgfTtcbiAqICAgfSk7XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8b25zLXBhZ2UgbmctY29udHJvbGxlcj1cIk15Q29udHJvbGxlclwiPlxuICogICA8b25zLXB1bGwtaG9vayB2YXI9XCJsb2FkZXJcIiBuZy1hY3Rpb249XCJsb2FkKCRkb25lKVwiPlxuICogICAgIDxzcGFuIG5nLXN3aXRjaD1cImxvYWRlci5zdGF0ZVwiPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJpbml0aWFsXCI+UHVsbCBkb3duIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInByZWFjdGlvblwiPlJlbGVhc2UgdG8gcmVmcmVzaDwvc3Bhbj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiYWN0aW9uXCI+TG9hZGluZyBkYXRhLiBQbGVhc2Ugd2FpdC4uLjwvc3Bhbj5cbiAqICAgICA8L3NwYW4+XG4gKiAgIDwvb25zLXB1bGwtaG9vaz5cbiAqICAgPG9ucy1saXN0PlxuICogICAgIDxvbnMtbGlzdC1pdGVtIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICAgIEl0ZW0gI3t7IGl0ZW0gfX1cbiAqICAgICA8L29ucy1saXN0LWl0ZW0+XG4gKiAgIDwvb25zLWxpc3Q+XG4gKiA8L29ucy1wYWdlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFd44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctYWN0aW9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Vc2UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgcGFnZSBpcyBwdWxsZWQgZG93bi4gQSA8Y29kZT4kZG9uZTwvY29kZT4gZnVuY3Rpb24gaXMgYXZhaWxhYmxlIHRvIHRlbGwgdGhlIGNvbXBvbmVudCB0aGF0IHRoZSBhY3Rpb24gaXMgY29tcGxldGVkLlsvZW5dXG4gKiAgIFtqYV1wdWxsIGRvd27jgZfjgZ/jgajjgY3jga7mjK/jgovoiJ7jgYTjgpLmjIflrprjgZfjgb7jgZnjgILjgqLjgq/jgrfjg6fjg7PjgYzlrozkuobjgZfjgZ/mmYLjgavjga88Y29kZT4kZG9uZTwvY29kZT7plqLmlbDjgpLlkbzjgbPlh7rjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtY2hhbmdlc3RhdGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImNoYW5nZXN0YXRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJjaGFuZ2VzdGF0ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogUHVsbCBob29rIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUHVsbEhvb2snLCBbJyRvbnNlbicsICdQdWxsSG9va1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIFB1bGxIb29rVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHB1bGxIb29rID0gbmV3IFB1bGxIb29rVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgcHVsbEhvb2spO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwdWxsSG9vaywgJ2NoYW5nZXN0YXRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXB1bGwtaG9vaycsIHB1bGxIb29rKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwdWxsSG9vay5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1B1c2hTbGlkaW5nTWVudUFuaW1hdG9yJywgWydTbGlkaW5nTWVudUFuaW1hdG9yJywgZnVuY3Rpb24oU2xpZGluZ01lbnVBbmltYXRvcikge1xuXG4gICAgdmFyIFB1c2hTbGlkaW5nTWVudUFuaW1hdG9yID0gU2xpZGluZ01lbnVBbmltYXRvci5leHRlbmQoe1xuXG4gICAgICBfaXNSaWdodDogZmFsc2UsXG4gICAgICBfZWxlbWVudDogdW5kZWZpbmVkLFxuICAgICAgX21lbnVQYWdlOiB1bmRlZmluZWQsXG4gICAgICBfbWFpblBhZ2U6IHVuZGVmaW5lZCxcbiAgICAgIF93aWR0aDogdW5kZWZpbmVkLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoIFwid2lkdGhcIiBzdHlsZSB2YWx1ZVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UgPSBtYWluUGFnZTtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UgPSBtZW51UGFnZTtcblxuICAgICAgICB0aGlzLl9pc1JpZ2h0ID0gISFvcHRpb25zLmlzUmlnaHQ7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAnOTAlJztcblxuICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCd3aWR0aCcsIG9wdGlvbnMud2lkdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnLScgKyBvcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnLScgKyBvcHRpb25zLndpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pc09wZW5lZCkge1xuICAgICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICB2YXIgbWFpblBhZ2VUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShtYXgpO1xuICAgICAgICAgIHZhciBtZW51UGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUobWF4KTtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pLnF1ZXVlKHt0cmFuc2Zvcm06IG1haW5QYWdlVHJhbnNmb3JtfSkucGxheSgpO1xuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pLnF1ZXVlKG1lbnVQYWdlU3R5bGUpLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9tYWluUGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9tYWluUGFnZSA9IHRoaXMuX21lbnVQYWdlID0gbnVsbDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBvcGVuTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShtYXgpO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIGNsb3NlTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKDApO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZSgwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0oTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG5cbiAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAucXVldWUoe3RyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm19KVxuICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUpXG4gICAgICAgICAgLnBsYXkoKTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLl9pc1JpZ2h0ID8gLWRpc3RhbmNlIDogZGlzdGFuY2U7XG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiBhYm92ZVRyYW5zZm9ybTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIGJlaGluZFggPSB0aGlzLl9pc1JpZ2h0ID8gLWRpc3RhbmNlIDogZGlzdGFuY2U7XG4gICAgICAgIHZhciBiZWhpbmRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGJlaGluZFggKyAncHgsIDAsIDApJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogYmVoaW5kVHJhbnNmb3JtXG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQdXNoU2xpZGluZ01lbnVBbmltYXRvcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFB1c2hTbGlkaW5nTWVudUFuaW1hdG9yO1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yJywgWydTbGlkaW5nTWVudUFuaW1hdG9yJywgZnVuY3Rpb24oU2xpZGluZ01lbnVBbmltYXRvcikge1xuXG4gICAgdmFyIFJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IgPSBTbGlkaW5nTWVudUFuaW1hdG9yLmV4dGVuZCh7XG5cbiAgICAgIF9ibGFja01hc2s6IHVuZGVmaW5lZCxcblxuICAgICAgX2lzUmlnaHQ6IGZhbHNlLFxuXG4gICAgICBfbWVudVBhZ2U6IHVuZGVmaW5lZCxcbiAgICAgIF9lbGVtZW50OiB1bmRlZmluZWQsXG4gICAgICBfbWFpblBhZ2U6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlID0gbWVudVBhZ2U7XG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gbWFpblBhZ2U7XG4gICAgICAgIHRoaXMuX2lzUmlnaHQgPSAhIW9wdGlvbnMuaXNSaWdodDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoIHx8ICc5MCUnO1xuXG4gICAgICAgIG1haW5QYWdlLmNzcyh7XG4gICAgICAgICAgYm94U2hhZG93OiAnMHB4IDAgMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpJ1xuICAgICAgICB9KTtcblxuICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnMHB4J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmNzcyh7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgICAgIGJvdHRvbTogJzBweCcsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZW1lbnQucHJlcGVuZCh0aGlzLl9ibGFja01hc2spO1xuXG4gICAgICAgIC8vIERpcnR5IGZpeCBmb3IgYnJva2VuIHJlbmRlcmluZyBidWcgb24gYW5kcm9pZCA0LnguXG4gICAgICAgIG9ucy5hbmltaXQobWFpblBhZ2VbMF0pLnF1ZXVlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKSd9KS5wbGF5KCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNPcGVuZWRcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoXG4gICAgICAgKi9cbiAgICAgIG9uUmVzaXplZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnd2lkdGgnLCB0aGlzLl93aWR0aCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNPcGVuZWQpIHtcbiAgICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG5cbiAgICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShtYXgpO1xuICAgICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKG1heCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybX0pLnBsYXkoKTtcbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKS5xdWV1ZShiZWhpbmRTdHlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICovXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JsYWNrTWFzaykge1xuICAgICAgICAgIHRoaXMuX2JsYWNrTWFzay5yZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21haW5QYWdlKSB7XG4gICAgICAgICAgdGhpcy5fbWFpblBhZ2UuYXR0cignc3R5bGUnLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbWVudVBhZ2UpIHtcbiAgICAgICAgICB0aGlzLl9tZW51UGFnZS5hdHRyKCdzdHlsZScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gdGhpcy5fbWVudVBhZ2UgPSB0aGlzLl9lbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBjbG9zZU1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0oMCk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGlzdGFuY2VcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heERpc3RhbmNlXG4gICAgICAgKi9cbiAgICAgIHRyYW5zbGF0ZU1lbnU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUoTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuICAgICAgICBkZWxldGUgYmVoaW5kU3R5bGUub3BhY2l0eTtcblxuICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZSh7dHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybX0pXG4gICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSlcbiAgICAgICAgICAucGxheSgpO1xuICAgICAgfSxcblxuICAgICAgX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMuX2lzUmlnaHQgPyAtZGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAwLCAwKSc7XG5cbiAgICAgICAgcmV0dXJuIGFib3ZlVHJhbnNmb3JtO1xuICAgICAgfSxcblxuICAgICAgX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgdmFyIGJlaGluZERpc3RhbmNlID0gKGRpc3RhbmNlIC0gbWF4KSAvIG1heCAqIDEwO1xuICAgICAgICBiZWhpbmREaXN0YW5jZSA9IGlzTmFOKGJlaGluZERpc3RhbmNlKSA/IDAgOiBNYXRoLm1heChNYXRoLm1pbihiZWhpbmREaXN0YW5jZSwgMCksIC0xMCk7XG5cbiAgICAgICAgdmFyIGJlaGluZFggPSB0aGlzLl9pc1JpZ2h0ID8gLWJlaGluZERpc3RhbmNlIDogYmVoaW5kRGlzdGFuY2U7XG4gICAgICAgIHZhciBiZWhpbmRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGJlaGluZFggKyAnJSwgMCwgMCknO1xuICAgICAgICB2YXIgb3BhY2l0eSA9IDEgKyBiZWhpbmREaXN0YW5jZSAvIDEwMDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogYmVoaW5kVHJhbnNmb3JtLFxuICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHlcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yO1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zbGlkaW5nLW1lbnVcbiAqIEBjYXRlZ29yeSBtZW51XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUNvbXBvbmVudCBmb3Igc2xpZGluZyBVSSB3aGVyZSBvbmUgcGFnZSBpcyBvdmVybGF5ZWQgb3ZlciBhbm90aGVyIHBhZ2UuIFRoZSBhYm92ZSBwYWdlIGNhbiBiZSBzbGlkZWQgYXNpZGUgdG8gcmV2ZWFsIHRoZSBwYWdlIGJlaGluZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844KS6KGo54++44GZ44KL44Gf44KB44Gu44Kz44Oz44Od44O844ON44Oz44OI44Gn44CB54mH5pa544Gu44Oa44O844K444GM5Yil44Gu44Oa44O844K444Gu5LiK44Gr44Kq44O844OQ44O844Os44Kk44Gn6KGo56S644GV44KM44G+44GZ44CCYWJvdmUtcGFnZeOBp+aMh+WumuOBleOCjOOBn+ODmuODvOOCuOOBr+OAgeaoquOBi+OCieOCueODqeOCpOODieOBl+OBpuihqOekuuOBl+OBvuOBmeOAglsvamFdXG4gKiBAY29kZXBlbiBJRHZGSlxuICogQHNlZWFsc28gb25zLXBhZ2VcbiAqICAgW2VuXW9ucy1wYWdlIGNvbXBvbmVudFsvZW5dXG4gKiAgIFtqYV1vbnMtcGFnZeOCs+ODs+ODneODvOODjeODs+ODiFsvamFdXG4gKiBAZ3VpZGUgVXNpbmdTbGlkaW5nTWVudVxuICogICBbZW5dVXNpbmcgc2xpZGluZyBtZW51Wy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOCkuS9v+OBhlsvamFdXG4gKiBAZ3VpZGUgRXZlbnRIYW5kbGluZ1xuICogICBbZW5dVXNpbmcgZXZlbnRzWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBruWIqeeUqFsvamFdXG4gKiBAZ3VpZGUgQ2FsbGluZ0NvbXBvbmVudEFQSXNmcm9tSmF2YVNjcmlwdFxuICogICBbZW5dVXNpbmcgbmF2aWdhdG9yIGZyb20gSmF2YVNjcmlwdFsvZW5dXG4gKiAgIFtqYV1KYXZhU2NyaXB044GL44KJ44Kz44Oz44Od44O844ON44Oz44OI44KS5ZG844Gz5Ye644GZWy9qYV1cbiAqIEBndWlkZSBEZWZpbmluZ011bHRpcGxlUGFnZXNpblNpbmdsZUhUTUxcbiAqICAgW2VuXURlZmluaW5nIG11bHRpcGxlIHBhZ2VzIGluIHNpbmdsZSBodG1sWy9lbl1cbiAqICAgW2phXeikh+aVsOOBruODmuODvOOCuOOCkjHjgaTjga5IVE1M44Gr6KiY6L+w44GZ44KLWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLXNsaWRpbmctbWVudSB2YXI9XCJhcHAubWVudVwiIG1haW4tcGFnZT1cInBhZ2UuaHRtbFwiIG1lbnUtcGFnZT1cIm1lbnUuaHRtbFwiIG1heC1zbGlkZS1kaXN0YW5jZT1cIjIwMHB4XCIgdHlwZT1cInJldmVhbFwiIHNpZGU9XCJsZWZ0XCI+XG4gKiA8L29ucy1zbGlkaW5nLW1lbnU+XG4gKlxuICogPG9ucy10ZW1wbGF0ZSBpZD1cInBhZ2UuaHRtbFwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICA8b25zLWJ1dHRvbiBuZy1jbGljaz1cImFwcC5tZW51LnRvZ2dsZU1lbnUoKVwiPlRvZ2dsZTwvb25zLWJ1dHRvbj5cbiAqICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJtZW51Lmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDwhLS0gbWVudSBwYWdlJ3MgY29udGVudHMgLS0+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy10ZW1wbGF0ZT5cbiAqXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcHJlb3BlblxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGJlZm9yZSB0aGUgc2xpZGluZyBtZW51IGlzIG9wZW5lZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaL44GP5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0b3BlblxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSBzbGlkaW5nIG1lbnUgaXMgb3BlbmVkLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgYzplovjgY3ntYLjgo/jgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc2xpZGluZ01lbnVcbiAqICAgW2VuXVNsaWRpbmcgbWVudSB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU2xpZGluZ01lbnXjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZWNsb3NlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYmVmb3JlIHRoZSBzbGlkaW5nIG1lbnUgaXMgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgYzplonjgZjjgovliY3jgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc2xpZGluZ01lbnVcbiAqICAgW2VuXVNsaWRpbmcgbWVudSB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU2xpZGluZ01lbnXjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3RjbG9zZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSBzbGlkaW5nIG1lbnUgaXMgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgYzplonjgZjntYLjgo/jgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc2xpZGluZ01lbnVcbiAqICAgW2VuXVNsaWRpbmcgbWVudSB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU2xpZGluZ01lbnXjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc2xpZGluZyBtZW51LlsvZW5dXG4gKiAgW2phXeOBk+OBruOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1lbnUtcGFnZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBtZW51IHBhZ2UuWy9lbl1cbiAqICAgW2phXeW3puOBq+S9jee9ruOBmeOCi+ODoeODi+ODpeODvOODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1haW4tcGFnZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBtYWluIHBhZ2UuWy9lbl1cbiAqICAgW2phXeWPs+OBq+S9jee9ruOBmeOCi+ODoeOCpOODs+ODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHN3aXBlYWJsZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dV2hldGhlciB0byBlbmFibGUgc3dpcGUgaW50ZXJhY3Rpb24uWy9lbl1cbiAqICAgW2phXeOCueODr+OCpOODl+aTjeS9nOOCkuacieWKueOBq+OBmeOCi+WgtOWQiOOBq+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHN3aXBlLXRhcmdldC13aWR0aFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgd2lkdGggb2Ygc3dpcGVhYmxlIGFyZWEgY2FsY3VsYXRlZCBmcm9tIHRoZSBsZWZ0IChpbiBwaXhlbHMpLiBVc2UgdGhpcyB0byBlbmFibGUgc3dpcGUgb25seSB3aGVuIHRoZSBmaW5nZXIgdG91Y2ggb24gdGhlIHNjcmVlbiBlZGdlLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fjga7liKTlrprpoJjln5/jgpLjg5Tjgq/jgrvjg6vljZjkvY3jgafmjIflrprjgZfjgb7jgZnjgILnlLvpnaLjga7nq6/jgYvjgonmjIflrprjgZfjgZ/ot53pm6LjgavpgZTjgZnjgovjgajjg5rjg7zjgrjjgYzooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtYXgtc2xpZGUtZGlzdGFuY2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dSG93IGZhciB0aGUgbWVudSBwYWdlIHdpbGwgc2xpZGUgb3Blbi4gQ2FuIHNwZWNpZnkgYm90aCBpbiBweCBhbmQgJS4gZWcuIDkwJSwgMjAwcHhbL2VuXVxuICogICBbamFdbWVudS1wYWdl44Gn5oyH5a6a44GV44KM44Gf44Oa44O844K444Gu6KGo56S65bmF44KS5oyH5a6a44GX44G+44GZ44CC44OU44Kv44K744Or44KC44GX44GP44GvJeOBruS4oeaWueOBp+aMh+WumuOBp+OBjeOBvuOBme+8iOS+izogOTAlLCAyMDBweO+8iVsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHNpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU3BlY2lmeSB3aGljaCBzaWRlIG9mIHRoZSBzY3JlZW4gdGhlIG1lbnUgcGFnZSBpcyBsb2NhdGVkIG9uLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwibGVmdFwiIGFuZCBcInJpZ2h0XCIuWy9lbl1cbiAqICAgW2phXW1lbnUtcGFnZeOBp+aMh+WumuOBleOCjOOBn+ODmuODvOOCuOOBjOeUu+mdouOBruOBqeOBoeOCieWBtOOBi+OCieihqOekuuOBleOCjOOCi+OBi+OCkuaMh+WumuOBl+OBvuOBmeOAgmxlZnTjgoLjgZfjgY/jga9yaWdodOOBruOBhOOBmuOCjOOBi+OCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHR5cGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGluZyBtZW51IGFuaW1hdG9yLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIHJldmVhbCAoZGVmYXVsdCksIHB1c2ggYW5kIG92ZXJsYXkuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOBruOCouODi+ODoeODvOOCt+ODp+ODs+OBp+OBmeOAglwicmV2ZWFsXCLvvIjjg4fjg5Xjgqnjg6vjg4jvvInjgIFcInB1c2hcIuOAgVwib3ZlcmxheVwi44Gu44GE44Ga44KM44GL44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZW9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZW9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdG9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0b3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldE1haW5QYWdlXG4gKiBAc2lnbmF0dXJlIHNldE1haW5QYWdlKHBhZ2VVcmwsIFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlVXJsXG4gKiAgIFtlbl1QYWdlIFVSTC4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGRvY3VtZW50IG9yIGFuIDxjb2RlPiZsdDtvbnMtdGVtcGxhdGUmZ3Q7PC9jb2RlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsb3NlTWVudV1cbiAqICAgW2VuXUlmIHRydWUgdGhlIG1lbnUgd2lsbCBiZSBjbG9zZWQuWy9lbl1cbiAqICAgW2phXXRydWXjgpLmjIflrprjgZnjgovjgajjgIHplovjgYTjgabjgYTjgovjg6Hjg4vjg6Xjg7zjgpLplonjgZjjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1GdW5jdGlvbiB0aGF0IGlzIGV4ZWN1dGVkIGFmdGVyIHRoZSBwYWdlIGhhcyBiZWVuIHNldC5bL2VuXVxuICogICBbamFd44Oa44O844K444GM6Kqt44G/6L6844G+44KM44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgbWFpbiBjb250ZW50cyBwYW5lLlsvZW5dXG4gKiAgIFtqYV3kuK3lpK7pg6jliIbjgavooajnpLrjgZXjgozjgovjg5rjg7zjgrjjgpJwYWdlVXJs44Gr5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0TWVudVBhZ2VcbiAqIEBzaWduYXR1cmUgc2V0TWVudVBhZ2UocGFnZVVybCwgW29wdGlvbnNdKVxuICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VVcmxcbiAqICAgW2VuXVBhZ2UgVVJMLiBDYW4gYmUgZWl0aGVyIGFuIEhUTUwgZG9jdW1lbnQgb3IgYW4gPGNvZGU+Jmx0O29ucy10ZW1wbGF0ZSZndDs8L2NvZGU+LlsvZW5dXG4gKiAgIFtqYV1wYWdl44GuVVJM44GL44CBb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xvc2VNZW51XVxuICogICBbZW5dSWYgdHJ1ZSB0aGUgbWVudSB3aWxsIGJlIGNsb3NlZCBhZnRlciB0aGUgbWVudSBwYWdlIGhhcyBiZWVuIHNldC5bL2VuXVxuICogICBbamFddHJ1ZeOCkuaMh+WumuOBmeOCi+OBqOOAgemWi+OBhOOBpuOBhOOCi+ODoeODi+ODpeODvOOCkumWieOBmOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXVRoaXMgZnVuY3Rpb24gd2lsbCBiZSBleGVjdXRlZCBhZnRlciB0aGUgbWVudSBwYWdlIGhhcyBiZWVuIHNldC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444GM6Kqt44G/6L6844G+44KM44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgc2lkZSBtZW51IHBhbmUuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOmDqOWIhuOBq+ihqOekuuOBleOCjOOCi+ODmuODvOOCuOOCknBhZ2VVcmzjgavmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvcGVuTWVudVxuICogQHNpZ25hdHVyZSBvcGVuTWVudShbb3B0aW9uc10pXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSBtZW51IGhhcyBiZWVuIG9wZW5lZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaL44GE44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGUgdGhlIGFib3ZlIGxheWVyIHRvIHJldmVhbCB0aGUgbGF5ZXIgYmVoaW5kLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgpLooajnpLrjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBjbG9zZU1lbnVcbiAqIEBzaWduYXR1cmUgY2xvc2VNZW51KFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXVRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIG1lbnUgaGFzIGJlZW4gY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjgYzplonjgZjjgonjgozjgZ/lvozjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TbGlkZSB0aGUgYWJvdmUgbGF5ZXIgdG8gaGlkZSB0aGUgbGF5ZXIgYmVoaW5kLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgpLpnZ7ooajnpLrjgavjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCB0b2dnbGVNZW51XG4gKiBAc2lnbmF0dXJlIHRvZ2dsZU1lbnUoW29wdGlvbnNdKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgbWVudSBoYXMgYmVlbiBvcGVuZWQgb3IgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjgYzplovjgY3ntYLjgo/jgaPjgZ/lvozjgYvjgIHplonjgZjntYLjgo/jgaPjgZ/lvozjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TbGlkZSB0aGUgYWJvdmUgbGF5ZXIgdG8gcmV2ZWFsIHRoZSBsYXllciBiZWhpbmQgaWYgaXQgaXMgY3VycmVudGx5IGhpZGRlbiwgb3RoZXJ3aXNlLCBoaWRlIHRoZSBsYXllciBiZWhpbmQuWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueKtuazgeOBq+WQiOOCj+OBm+OBpuOAgeODoeODi+ODpeODvOODmuODvOOCuOOCkuihqOekuuOCguOBl+OBj+OBr+mdnuihqOekuuOBq+OBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIGlzTWVudU9wZW5lZFxuICogQHNpZ25hdHVyZSBpc01lbnVPcGVuZWQoKVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqICAgW2VuXXRydWUgaWYgdGhlIG1lbnUgaXMgY3VycmVudGx5IG9wZW4uWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOOBjOmWi+OBhOOBpuOBhOOCjOOBsHRydWXjgajjgarjgorjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1SZXR1cm5zIHRydWUgaWYgdGhlIG1lbnUgcGFnZSBpcyBvcGVuLCBvdGhlcndpc2UgZmFsc2UuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOODmuODvOOCuOOBjOmWi+OBhOOBpuOBhOOCi+WgtOWQiOOBr3RydWXjgIHjgZ3jgYbjgafjgarjgYTloLTlkIjjga9mYWxzZeOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIGdldERldmljZUJhY2tCdXR0b25IYW5kbGVyXG4gKiBAc2lnbmF0dXJlIGdldERldmljZUJhY2tCdXR0b25IYW5kbGVyKClcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqICAgW2VuXURldmljZSBiYWNrIGJ1dHRvbiBoYW5kbGVyLlsvZW5dXG4gKiAgIFtqYV3jg4fjg5DjgqTjgrnjga7jg5Djg4Pjgq/jg5zjgr/jg7Pjg4/jg7Pjg4njg6njgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1SZXRyaWV2ZSB0aGUgYmFjay1idXR0b24gaGFuZGxlci5bL2VuXVxuICogICBbamFdb25zLXNsaWRpbmctbWVudeOBq+e0kOS7mOOBhOOBpuOBhOOCi+ODkOODg+OCr+ODnOOCv+ODs+ODj+ODs+ODieODqeOCkuWPluW+l+OBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldFN3aXBlYWJsZVxuICogQHNpZ25hdHVyZSBzZXRTd2lwZWFibGUoc3dpcGVhYmxlKVxuICogQHBhcmFtIHtCb29sZWFufSBzd2lwZWFibGVcbiAqICAgW2VuXUlmIHRydWUgdGhlIG1lbnUgd2lsbCBiZSBzd2lwZWFibGUuWy9lbl1cbiAqICAgW2phXeOCueODr+OCpOODl+OBp+mWi+mWieOBp+OBjeOCi+OCiOOBhuOBq+OBmeOCi+WgtOWQiOOBq+OBr3RydWXjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TcGVjaWZ5IGlmIHRoZSBtZW51IHNob3VsZCBiZSBzd2lwZWFibGUgb3Igbm90LlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fjgafplovplonjgZnjgovjgYvjganjgYbjgYvjgpLoqK3lrprjgZnjgovjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU2xpZGluZ01lbnUnLCBbJyRjb21waWxlJywgJ1NsaWRpbmdNZW51VmlldycsICckb25zZW4nLCBmdW5jdGlvbigkY29tcGlsZSwgU2xpZGluZ01lbnVWaWV3LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgbWFpbiA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1haW4nKSxcbiAgICAgICAgICAgIG1lbnUgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG5cbiAgICAgICAgaWYgKG1haW4pIHtcbiAgICAgICAgICB2YXIgbWFpbkh0bWwgPSBhbmd1bGFyLmVsZW1lbnQobWFpbikucmVtb3ZlKCkuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZW51KSB7XG4gICAgICAgICAgdmFyIG1lbnVIdG1sID0gYW5ndWxhci5lbGVtZW50KG1lbnUpLnJlbW92ZSgpLmh0bWwoKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQoYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdvbnNlbi1zbGlkaW5nLW1lbnVfX21lbnUnKSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQoYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdvbnNlbi1zbGlkaW5nLW1lbnVfX21haW4nKSk7XG5cbiAgICAgICAgICB2YXIgc2xpZGluZ01lbnUgPSBuZXcgU2xpZGluZ01lbnVWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNsaWRpbmdNZW51LCAncHJlb3BlbiBwcmVjbG9zZSBwb3N0b3BlbiBwb3N0Y2xvc2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgaWYgKG1haW5IdG1sICYmICFhdHRycy5tYWluUGFnZSkge1xuICAgICAgICAgICAgc2xpZGluZ01lbnUuX2FwcGVuZE1haW5QYWdlKG51bGwsIG1haW5IdG1sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobWVudUh0bWwgJiYgIWF0dHJzLm1lbnVQYWdlKSB7XG4gICAgICAgICAgICBzbGlkaW5nTWVudS5fYXBwZW5kTWVudVBhZ2UobWVudUh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzbGlkaW5nTWVudSk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc2xpZGluZy1tZW51Jywgc2xpZGluZ01lbnUpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzbGlkaW5nTWVudS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc2xpZGluZy1tZW51JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnU2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBkZWxheTogMCxcbiAgICAgIGR1cmF0aW9uOiAwLjQsXG4gICAgICB0aW1pbmc6ICdjdWJpYy1iZXppZXIoLjEsIC43LCAuMSwgMSknLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy50aW1pbmdcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmR1cmF0aW9uXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kZWxheVxuICAgICAgICovXG4gICAgICBpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHRoaXMudGltaW5nID0gb3B0aW9ucy50aW1pbmcgfHwgdGhpcy50aW1pbmc7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmR1cmF0aW9uIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdGhpcy5kZWxheSA9IG9wdGlvbnMuZGVsYXkgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZGVsYXkgOiB0aGlzLmRlbGF5O1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNPcGVuZWRcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoXG4gICAgICAgKi9cbiAgICAgIG9uUmVzaXplZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICBvcGVuTWVudTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqL1xuICAgICAgY2xvc2VDbG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICovXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHJldHVybiB7U2xpZGluZ01lbnVBbmltYXRvcn1cbiAgICAgICAqL1xuICAgICAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignT3ZlcnJpZGUgY29weSBtZXRob2QuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwZWVkLWRpYWxcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhlIHNwZWVkIGRpYWwuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODlOODvOODieODgOOCpOOCouODq+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuOBl+OBpuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtY2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU3BlZWREaWFsJywgWyckb25zZW4nLCAnU3BlZWREaWFsVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgU3BlZWREaWFsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIHNwZWVkRGlhbCA9IG5ldyBTcGVlZERpYWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGVlZC1kaWFsJywgc3BlZWREaWFsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BlZWREaWFsLCAnb3BlbiBjbG9zZScpO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGVlZERpYWwpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BlZWREaWFsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGVlZC1kaWFsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXQtdmlld1xuICogQGNhdGVnb3J5IGNvbnRyb2xcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1EaXZpZGVzIHRoZSBzY3JlZW4gaW50byBhIGxlZnQgYW5kIHJpZ2h0IHNlY3Rpb24uWy9lbl1cbiAqICBbamFd55S76Z2i44KS5bem5Y+z44Gr5YiG5Ymy44GZ44KL44Kz44Oz44Od44O844ON44Oz44OI44Gn44GZ44CCWy9qYV1cbiAqIEBjb2RlcGVuIG5LcWZ2IHt3aWRlfVxuICogQGd1aWRlIFVzaW5nb25zc3BsaXR2aWV3Y29tcG9uZW50XG4gKiAgIFtlbl1Vc2luZyBvbnMtc3BsaXQtdmlldy5bL2VuXVxuICogICBbamFdb25zLXNwbGl0LXZpZXfjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLkvb/jgYZbL2phXVxuICogQGd1aWRlIENhbGxpbmdDb21wb25lbnRBUElzZnJvbUphdmFTY3JpcHRcbiAqICAgW2VuXVVzaW5nIG5hdmlnYXRvciBmcm9tIEphdmFTY3JpcHRbL2VuXVxuICogICBbamFdSmF2YVNjcmlwdOOBi+OCieOCs+ODs+ODneODvOODjeODs+ODiOOCkuWRvOOBs+WHuuOBmVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1zcGxpdC12aWV3XG4gKiAgIHNlY29uZGFyeS1wYWdlPVwic2Vjb25kYXJ5Lmh0bWxcIlxuICogICBtYWluLXBhZ2U9XCJtYWluLmh0bWxcIlxuICogICBtYWluLXBhZ2Utd2lkdGg9XCI3MCVcIlxuICogICBjb2xsYXBzZT1cInBvcnRyYWl0XCI+XG4gKiA8L29ucy1zcGxpdC12aWV3PlxuICovXG5cbi8qKlxuICogQGV2ZW50IHVwZGF0ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCB3aGVuIHRoZSBzcGxpdCB2aWV3IGlzIHVwZGF0ZWQuWy9lbl1cbiAqICAgW2phXXNwbGl0IHZpZXfjga7nirbmhYvjgYzmm7TmlrDjgZXjgozjgZ/pmpvjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXZlbnQuc2hvdWxkQ29sbGFwc2VcbiAqICAgW2VuXVRydWUgaWYgdGhlIHZpZXcgc2hvdWxkIGNvbGxhcHNlLlsvZW5dXG4gKiAgIFtqYV1jb2xsYXBzZeeKtuaFi+OBruWgtOWQiOOBq3RydWXjgavjgarjgorjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50LmN1cnJlbnRNb2RlXG4gKiAgIFtlbl1DdXJyZW50IG1vZGUuWy9lbl1cbiAqICAgW2phXeePvuWcqOOBruODouODvOODieWQjeOCkui/lOOBl+OBvuOBmeOAglwiY29sbGFwc2VcIuOBi1wic3BsaXRcIuOBi+OBruOBhOOBmuOCjOOBi+OBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBldmVudC5zcGxpdFxuICogICBbZW5dQ2FsbCB0byBmb3JjZSBzcGxpdC5bL2VuXVxuICogICBbamFd44GT44Gu6Zai5pWw44KS5ZG844Gz5Ye644GZ44Go5by35Yi255qE44Grc3BsaXTjg6Ljg7zjg4njgavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXZlbnQuY29sbGFwc2VcbiAqICAgW2VuXUNhbGwgdG8gZm9yY2UgY29sbGFwc2UuWy9lbl1cbiAqICAgW2phXeOBk+OBrumWouaVsOOCkuWRvOOBs+WHuuOBmeOBqOW8t+WItueahOOBq2NvbGxhcHNl44Oi44O844OJ44Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV344Gu5bmF44KS6L+U44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5vcmllbnRhdGlvblxuICogICBbZW5dQ3VycmVudCBvcmllbnRhdGlvbi5bL2VuXVxuICogICBbamFd54++5Zyo44Gu55S76Z2i44Gu44Kq44Oq44Ko44Oz44OG44O844K344On44Oz44KS6L+U44GX44G+44GZ44CCXCJwb3J0cmFpdFwi44GL44KC44GX44GP44GvXCJsYW5kc2NhcGVcIuOBp+OBmeOAgiBbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZXNwbGl0XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYmVmb3JlIHRoZSB2aWV3IGlzIHNwbGl0LlsvZW5dXG4gKiAgIFtqYV1zcGxpdOeKtuaFi+OBq+OCi+WJjeOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXdu44Gu5bmF44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5vcmllbnRhdGlvblxuICogICBbZW5dQ3VycmVudCBvcmllbnRhdGlvbi5bL2VuXVxuICogICBbamFd54++5Zyo44Gu55S76Z2i44Gu44Kq44Oq44Ko44Oz44OG44O844K344On44Oz44KS6L+U44GX44G+44GZ44CCXCJwb3J0cmFpdFwi44KC44GX44GP44GvXCJsYW5kc2NhcGVcIuOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcG9zdHNwbGl0XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYWZ0ZXIgdGhlIHZpZXcgaXMgc3BsaXQuWy9lbl1cbiAqICAgW2phXXNwbGl054q25oWL44Gr44Gq44Gj44Gf5b6M44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNwbGl0Vmlld1xuICogICBbZW5dU3BsaXQgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NwbGl0Vmlld+OCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge051bWJlcn0gZXZlbnQud2lkdGhcbiAqICAgW2VuXUN1cnJlbnQgd2lkdGguWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrlNwbGl0Vmlld27jga7luYXjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwcmVjb2xsYXBzZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGJlZm9yZSB0aGUgdmlldyBpcyBjb2xsYXBzZWQuWy9lbl1cbiAqICAgW2phXWNvbGxhcHNl54q25oWL44Gr44Gq44KL5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNwbGl0Vmlld1xuICogICBbZW5dU3BsaXQgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NwbGl0Vmlld+OCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge051bWJlcn0gZXZlbnQud2lkdGhcbiAqICAgW2VuXUN1cnJlbnQgd2lkdGguWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrlNwbGl0Vmlld27jga7luYXjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0Y29sbGFwc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgdmlldyBpcyBjb2xsYXBzZWQuWy9lbl1cbiAqICAgW2phXWNvbGxhcHNl54q25oWL44Gr44Gq44Gj44Gf5b6M44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNwbGl0Vmlld1xuICogICBbZW5dU3BsaXQgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NwbGl0Vmlld+OCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge051bWJlcn0gZXZlbnQud2lkdGhcbiAqICAgW2VuXUN1cnJlbnQgd2lkdGguWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrlNwbGl0Vmlld27jga7luYXjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzcGxpdCB2aWV3LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5fjg6rjg4Pjg4jjg5Pjg6Xjg7zjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtYWluLXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgcGFnZSBvbiB0aGUgcmlnaHQuWy9lbl1cbiAqICAgW2phXeWPs+WBtOOBq+ihqOekuuOBmeOCi+ODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1haW4tcGFnZS13aWR0aFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7TnVtYmVyfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1NYWluIHBhZ2Ugd2lkdGggcGVyY2VudGFnZS4gVGhlIHNlY29uZGFyeSBwYWdlIHdpZHRoIHdpbGwgYmUgdGhlIHJlbWFpbmluZyBwZXJjZW50YWdlLlsvZW5dXG4gKiAgIFtqYV3lj7PlgbTjga7jg5rjg7zjgrjjga7luYXjgpLjg5Hjg7zjgrvjg7Pjg4jljZjkvY3jgafmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzZWNvbmRhcnktcGFnZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIG9uIHRoZSBsZWZ0LlsvZW5dXG4gKiAgIFtqYV3lt6blgbTjgavooajnpLrjgZnjgovjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBjb2xsYXBzZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBTcGVjaWZ5IHRoZSBjb2xsYXBzZSBiZWhhdmlvci4gVmFsaWQgdmFsdWVzIGFyZSBwb3J0cmFpdCwgbGFuZHNjYXBlLCB3aWR0aCAjcHggb3IgYSBtZWRpYSBxdWVyeS5cbiAqICAgICBcInBvcnRyYWl0XCIgb3IgXCJsYW5kc2NhcGVcIiBtZWFucyB0aGUgdmlldyB3aWxsIGNvbGxhcHNlIHdoZW4gZGV2aWNlIGlzIGluIGxhbmRzY2FwZSBvciBwb3J0cmFpdCBvcmllbnRhdGlvbi5cbiAqICAgICBcIndpZHRoICNweFwiIG1lYW5zIHRoZSB2aWV3IHdpbGwgY29sbGFwc2Ugd2hlbiB0aGUgd2luZG93IHdpZHRoIGlzIHNtYWxsZXIgdGhhbiB0aGUgc3BlY2lmaWVkICNweC5cbiAqICAgICBJZiB0aGUgdmFsdWUgaXMgYSBtZWRpYSBxdWVyeSwgdGhlIHZpZXcgd2lsbCBjb2xsYXBzZSB3aGVuIHRoZSBtZWRpYSBxdWVyeSBpcyB0cnVlLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg5bem5YG044Gu44Oa44O844K444KS6Z2e6KGo56S644Gr44GZ44KL5p2h5Lu244KS5oyH5a6a44GX44G+44GZ44CCcG9ydHJhaXQsIGxhbmRzY2FwZeOAgXdpZHRoICNweOOCguOBl+OBj+OBr+ODoeODh+OCo+OCouOCr+OCqOODquOBruaMh+WumuOBjOWPr+iDveOBp+OBmeOAglxuICogICAgIHBvcnRyYWl044KC44GX44GP44GvbGFuZHNjYXBl44KS5oyH5a6a44GZ44KL44Go44CB44OH44OQ44Kk44K544Gu55S76Z2i44GM57im5ZCR44GN44KC44GX44GP44Gv5qiq5ZCR44GN44Gr44Gq44Gj44Gf5pmC44Gr6YGp55So44GV44KM44G+44GZ44CCXG4gKiAgICAgd2lkdGggI3B444KS5oyH5a6a44GZ44KL44Go44CB55S76Z2i44GM5oyH5a6a44GX44Gf5qiq5bmF44KI44KK44KC55+t44GE5aC05ZCI44Gr6YGp55So44GV44KM44G+44GZ44CCXG4gKiAgICAg44Oh44OH44Kj44Ki44Kv44Ko44Oq44KS5oyH5a6a44GZ44KL44Go44CB5oyH5a6a44GX44Gf44Kv44Ko44Oq44Gr6YGp5ZCI44GX44Gm44GE44KL5aC05ZCI44Gr6YGp55So44GV44KM44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy11cGRhdGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInVwZGF0ZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwidXBkYXRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc3BsaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNwbGl0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzcGxpdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNvbGxhcHNlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjb2xsYXBzZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY29sbGFwc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c3BsaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzcGxpdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNwbGl0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNvbGxhcHNlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y29sbGFwc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3Rjb2xsYXBzZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWluaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0TWFpblBhZ2VcbiAqIEBzaWduYXR1cmUgc2V0TWFpblBhZ2UocGFnZVVybClcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlVXJsXG4gKiAgIFtlbl1QYWdlIFVSTC4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGRvY3VtZW50IG9yIGFuIDxvbnMtdGVtcGxhdGU+LlsvZW5dXG4gKiAgIFtqYV1wYWdl44GuVVJM44GL44CBb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TaG93IHRoZSBwYWdlIHNwZWNpZmllZCBpbiBwYWdlVXJsIGluIHRoZSByaWdodCBzZWN0aW9uWy9lbl1cbiAqICAgW2phXeaMh+WumuOBl+OBn1VSTOOCkuODoeOCpOODs+ODmuODvOOCuOOCkuiqreOBv+i+vOOBv+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldFNlY29uZGFyeVBhZ2VcbiAqIEBzaWduYXR1cmUgc2V0U2Vjb25kYXJ5UGFnZShwYWdlVXJsKVxuICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VVcmxcbiAqICAgW2VuXVBhZ2UgVVJMLiBDYW4gYmUgZWl0aGVyIGFuIEhUTUwgZG9jdW1lbnQgb3IgYW4gPG9ucy10ZW1wbGF0ZT4uWy9lbl1cbiAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIFvbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIGxlZnQgc2VjdGlvblsvZW5dXG4gKiAgIFtqYV3mjIflrprjgZfjgZ9VUkzjgpLlt6bjga7jg5rjg7zjgrjjga7oqq3jgb/ovrzjgb/jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCB1cGRhdGVcbiAqIEBzaWduYXR1cmUgdXBkYXRlKClcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVHJpZ2dlciBhbiAndXBkYXRlJyBldmVudCBhbmQgdHJ5IHRvIGRldGVybWluZSBpZiB0aGUgc3BsaXQgYmVoYXZpb3Igc2hvdWxkIGJlIGNoYW5nZWQuWy9lbl1cbiAqICAgW2phXXNwbGl044Oi44O844OJ44KS5aSJ44GI44KL44G544GN44GL44Gp44GG44GL44KS5Yik5pat44GZ44KL44Gf44KB44GuJ3VwZGF0ZSfjgqTjg5njg7Pjg4jjgpLnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU3BsaXRWaWV3JywgWyckY29tcGlsZScsICdTcGxpdFZpZXcnLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0VmlldywgJG9uc2VuKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIG1haW5QYWdlID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubWFpbi1wYWdlJyksXG4gICAgICAgICAgICBzZWNvbmRhcnlQYWdlID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuc2Vjb25kYXJ5LXBhZ2UnKTtcblxuICAgICAgICBpZiAobWFpblBhZ2UpIHtcbiAgICAgICAgICB2YXIgbWFpbkh0bWwgPSBhbmd1bGFyLmVsZW1lbnQobWFpblBhZ2UpLnJlbW92ZSgpLmh0bWwoKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kYXJ5UGFnZSkge1xuICAgICAgICAgIHZhciBzZWNvbmRhcnlIdG1sID0gYW5ndWxhci5lbGVtZW50KHNlY29uZGFyeVBhZ2UpLnJlbW92ZSgpLmh0bWwoKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQoYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdvbnNlbi1zcGxpdC12aWV3X19zZWNvbmRhcnkgZnVsbC1zY3JlZW4nKSk7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmQoYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdvbnNlbi1zcGxpdC12aWV3X19tYWluIGZ1bGwtc2NyZWVuJykpO1xuXG4gICAgICAgICAgdmFyIHNwbGl0VmlldyA9IG5ldyBTcGxpdFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGlmIChtYWluSHRtbCAmJiAhYXR0cnMubWFpblBhZ2UpIHtcbiAgICAgICAgICAgIHNwbGl0Vmlldy5fYXBwZW5kTWFpblBhZ2UobWFpbkh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWNvbmRhcnlIdG1sICYmICFhdHRycy5zZWNvbmRhcnlQYWdlKSB7XG4gICAgICAgICAgICBzcGxpdFZpZXcuX2FwcGVuZFNlY29uZFBhZ2Uoc2Vjb25kYXJ5SHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwbGl0Vmlldyk7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGxpdFZpZXcsICd1cGRhdGUgcHJlc3BsaXQgcHJlY29sbGFwc2UgcG9zdHNwbGl0IHBvc3Rjb2xsYXBzZSBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdC12aWV3Jywgc3BsaXRWaWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNwbGl0Vmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXQtdmlldycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlckNvbnRlbnQnLCBbJyRvbnNlbicsICckY29tcGlsZScsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUpIHtcblxuICAgIHZhciBTcGxpdHRlckNvbnRlbnQgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5sb2FkID0gdGhpcy5fZWxlbWVudFswXS5sb2FkO1xuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5sb2FkID0gdGhpcy5fcGFnZVNjb3BlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXJDb250ZW50KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyQ29udGVudCwgWydwYWdlJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyQ29udGVudDtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlclNpZGUnLCBbJyRvbnNlbicsICckY29tcGlsZScsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUpIHtcblxuICAgIHZhciBTcGxpdHRlclNpZGUgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ29wZW4nLCAnY2xvc2UnLCAndG9nZ2xlJywgJ2xvYWQnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnbW9kZWNoYW5nZScsICdwcmVvcGVuJywgJ3ByZWNsb3NlJywgJ3Bvc3RvcGVuJywgJ3Bvc3RjbG9zZSdcbiAgICAgICAgXSwgZGV0YWlsID0+IGRldGFpbC5zaWRlID8gYW5ndWxhci5leHRlbmQoZGV0YWlsLCB7c2lkZTogdGhpc30pIDogZGV0YWlsKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXJTaWRlKTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyU2lkZSwgWydwYWdlJywgJ21vZGUnLCAnaXNPcGVuJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyU2lkZTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXQgdmlldy5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44OI44OT44Ol44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlcicsIFsnJGNvbXBpbGUnLCAnU3BsaXR0ZXInLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBTcGxpdHRlcihzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwbGl0dGVyKTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwbGl0dGVyLCAnZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCBzcGxpdHRlcik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGxpdHRlci5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zd2l0Y2hcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzd2l0Y2guWy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTd2l0Y2gnLCBbJyRvbnNlbicsICdTd2l0Y2hWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBTd2l0Y2hWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBpZiAoYXR0cnMubmdDb250cm9sbGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGVsZW1lbnQgY2FuXFwndCBhY2NlcHQgbmctY29udHJvbGxlciBkaXJlY3RpdmUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3dpdGNoVmlldyA9IG5ldyBTd2l0Y2hWaWV3KGVsZW1lbnQsIHNjb3BlLCBhdHRycyk7XG4gICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhzd2l0Y2hWaWV3LCBlbGVtZW50KTtcblxuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3dpdGNoVmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXN3aXRjaCcsIHN3aXRjaFZpZXcpO1xuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3dpdGNoVmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoc3dpdGNoVmlldyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBhdHRycyA9IHNjb3BlID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJOb25lQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhck5vbmVBbmltYXRvcik7XG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyRmFkZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJGYWRlQW5pbWF0b3IpO1xuICBtb2R1bGUudmFsdWUoJ1RhYmJhclNsaWRlQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhclNsaWRlQW5pbWF0b3IpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdUYWJiYXJWaWV3JywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICB2YXIgVGFiYmFyVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnb25zLXRhYmJhcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiZWxlbWVudFwiIHBhcmFtZXRlciBtdXN0IGJlIGEgXCJvbnMtdGFiYmFyXCIgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZVNjb3BlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3JlYWN0aXZlJywgJ3Bvc3RjaGFuZ2UnLCAncHJlY2hhbmdlJywgJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVUYWInLFxuICAgICAgICAgICdzZXRUYWJiYXJWaXNpYmlsaXR5JyxcbiAgICAgICAgICAnZ2V0QWN0aXZlVGFiSW5kZXgnLFxuICAgICAgICAgICdsb2FkUGFnZSdcbiAgICAgICAgXSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgTWljcm9FdmVudC5taXhpbihUYWJiYXJWaWV3KTtcblxuICAgIFRhYmJhclZpZXcucmVnaXN0ZXJBbmltYXRvciA9IGZ1bmN0aW9uKG5hbWUsIEFuaW1hdG9yKSB7XG4gICAgICByZXR1cm4gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJlZ2lzdGVyQW5pbWF0b3IobmFtZSwgQW5pbWF0b3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gVGFiYmFyVmlldztcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0JhY2tCdXR0b24nLCBbJyRvbnNlbicsICckY29tcGlsZScsICdHZW5lcmljVmlldycsICdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSwgR2VuZXJpY1ZpZXcsIENvbXBvbmVudENsZWFuZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBiYWNrQnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYmFjay1idXR0b24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBiYWNrQnV0dG9uLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYmFja0J1dHRvbik7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUoc2NvcGUpO1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKGF0dHJzKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0JvdHRvbVRvb2xiYXInLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYm90dG9tVG9vbGJhcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtYnV0dG9uXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0J1dHRvbicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBidXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICB2aWV3S2V5OiAnb25zLWJ1dHRvbidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGJ1dHRvbiwgJ2Rpc2FibGVkJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF0uZGlzYWJsZWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX2VsZW1lbnRbMF0uZGlzYWJsZWQgPSB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRHVtbXlGb3JJbml0JywgWyckcm9vdFNjb3BlJywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgIHZhciBpc1JlYWR5ID0gZmFsc2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKCFpc1JlYWR5KSB7XG4gICAgICAgICAgICBpc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJG9ucy1yZWFkeScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEVWRU5UUyA9XG4gICAgKCdkcmFnIGRyYWdsZWZ0IGRyYWdyaWdodCBkcmFndXAgZHJhZ2Rvd24gaG9sZCByZWxlYXNlIHN3aXBlIHN3aXBlbGVmdCBzd2lwZXJpZ2h0ICcgK1xuICAgICAgJ3N3aXBldXAgc3dpcGVkb3duIHRhcCBkb3VibGV0YXAgdG91Y2ggdHJhbnNmb3JtIHBpbmNoIHBpbmNoaW4gcGluY2hvdXQgcm90YXRlJykuc3BsaXQoLyArLyk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNHZXN0dXJlRGV0ZWN0b3InLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIHNjb3BlRGVmID0gRVZFTlRTLnJlZHVjZShmdW5jdGlvbihkaWN0LCBuYW1lKSB7XG4gICAgICBkaWN0WyduZycgKyB0aXRsaXplKG5hbWUpXSA9ICcmJztcbiAgICAgIHJldHVybiBkaWN0O1xuICAgIH0sIHt9KTtcblxuICAgIGZ1bmN0aW9uIHRpdGxpemUoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHNjb3BlRGVmLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgXywgdHJhbnNjbHVkZSkge1xuXG4gICAgICAgICAgdHJhbnNjbHVkZShzY29wZS4kcGFyZW50LCBmdW5jdGlvbihjbG9uZWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgYXR0ciA9ICduZycgKyB0aXRsaXplKGV2ZW50LnR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoYXR0ciBpbiBzY29wZURlZikge1xuICAgICAgICAgICAgICBzY29wZVthdHRyXSh7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZ2VzdHVyZURldGVjdG9yO1xuXG4gICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yID0gZWxlbWVudFswXS5fZ2VzdHVyZURldGVjdG9yO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLm9uKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vZmYoRVZFTlRTLmpvaW4oJyAnKSwgaGFuZGxlcik7XG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3IuZWxlbWVudCA9IHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWljb25cbiAqL1xuXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSWNvbicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5pY29uLmluZGV4T2YoJ3t7JykgIT09IC0xKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2ljb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gZWxlbWVudFswXS5fdXBkYXRlKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChzY29wZSwgZWxlbWVudCwgYXR0cnMpID0+IHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtaWNvbidcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG5cbiAgICAgIH1cblxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gc2NyZWVuIG9yaWVudGF0aW9uLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0IGFuZCBsYW5kc2NhcGUuIERpZmZlcmVudCBmcm9tIG90aGVyIGNvbXBvbmVudHMsIHRoaXMgY29tcG9uZW50IGlzIHVzZWQgYXMgYXR0cmlidXRlIGluIGFueSBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV3nlLvpnaLjga7lkJHjgY3jgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLooYzjgYTjgb7jgZnjgIJwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAguOBmeOBueOBpuOBruimgee0oOOBruWxnuaAp+OBq+S9v+eUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtcGxhdGZvcm0gW2VuXW9ucy1pZi1wbGF0Zm9ybSBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtcGxhdGZvcm3jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLW9yaWVudGF0aW9uPVwicG9ydHJhaXRcIj5cbiAqICAgPHA+VGhpcyB3aWxsIG9ubHkgYmUgdmlzaWJsZSBpbiBwb3J0cmFpdCBtb2RlLjwvcD5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRWl0aGVyIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiLlsvZW5dXG4gKiAgIFtqYV1wb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZPcmllbnRhdGlvbicsIFsnJG9uc2VuJywgJyRvbnNHbG9iYWwnLCBmdW5jdGlvbigkb25zZW4sICRvbnNHbG9iYWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZk9yaWVudGF0aW9uJywgdXBkYXRlKTtcbiAgICAgICAgICAkb25zR2xvYmFsLm9yaWVudGF0aW9uLm9uKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vZmYoJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyT3JpZW50YXRpb24gPSAoJycgKyBhdHRycy5vbnNJZk9yaWVudGF0aW9uKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIG9yaWVudGF0aW9uID0gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpO1xuXG4gICAgICAgICAgICBpZiAodXNlck9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnIHx8IHVzZXJPcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZScpIHtcbiAgICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gb3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBnZXRMYW5kc2NhcGVPclBvcnRyYWl0KCkge1xuICAgICAgICAgICAgcmV0dXJuICRvbnNHbG9iYWwub3JpZW50YXRpb24uaXNQb3J0cmFpdCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1wbGF0Zm9ybVxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIC8gYnJvd3Nlci4gVmFsaWQgdmFsdWVzIGFyZSBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgYW5kIFwid3BcIi5bL2VuXVxuICogICAgW2phXeODl+ODqeODg+ODiOODleOCqeODvOODoOOChOODluODqeOCpuOCtuODvOOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuOBiuOBk+OBquOBhOOBvuOBmeOAgm9wZXJhLCBmaXJlZm94LCBzYWZhcmksIGNocm9tZSwgaWUsIGVkZ2UsIGFuZHJvaWQsIGJsYWNrYmVycnksIGlvcywgd3Djga7jgYTjgZrjgozjgYvjga7lgKTjgpLnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLW9yaWVudGF0aW9uIFtlbl1vbnMtaWYtb3JpZW50YXRpb24gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLW9yaWVudGF0aW9u44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1wbGF0Zm9ybT1cImFuZHJvaWRcIj5cbiAqICAgLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLXBsYXRmb3JtXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU9uZSBvciBtdWx0aXBsZSBzcGFjZSBzZXBhcmF0ZWQgdmFsdWVzOiBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgb3IgXCJ3cFwiLlsvZW5dXG4gKiAgIFtqYV1cIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIsIFwid3BcIuOBruOBhOOBmuOCjOOBi+epuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmUGxhdGZvcm0nLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICB2YXIgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybVN0cmluZygpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZQbGF0Zm9ybScsIGZ1bmN0aW9uKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyUGxhdGZvcm1zID0gYXR0cnMub25zSWZQbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFBsYXRmb3JtU3RyaW5nKCkge1xuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvUklNIFRhYmxldCBPUy9pKSkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JCMTAvaSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2JsYWNrYmVycnknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmV8SUVNb2JpbGV8V1BEZXNrdG9wL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3dwJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBPcGVyYSA4LjArIChVQSBkZXRlY3Rpb24gdG8gZGV0ZWN0IEJsaW5rL3Y4LXBvd2VyZWQgT3BlcmEpXG4gICAgICAgICAgdmFyIGlzT3BlcmEgPSAhIXdpbmRvdy5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNPcGVyYSkge1xuICAgICAgICAgICAgcmV0dXJuICdvcGVyYSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRmlyZWZveCA9IHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7ICAgLy8gRmlyZWZveCAxLjArXG4gICAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNTYWZhcmkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93LkhUTUxFbGVtZW50KS5pbmRleE9mKCdDb25zdHJ1Y3RvcicpID4gMDtcbiAgICAgICAgICAvLyBBdCBsZWFzdCBTYWZhcmkgMys6IFwiW29iamVjdCBIVE1MRWxlbWVudENvbnN0cnVjdG9yXVwiXG4gICAgICAgICAgaWYgKGlzU2FmYXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIEVkZ2UvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNFZGdlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2VkZ2UnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0Nocm9tZSA9ICEhd2luZG93LmNocm9tZSAmJiAhaXNPcGVyYSAmJiAhaXNFZGdlOyAvLyBDaHJvbWUgMStcbiAgICAgICAgICBpZiAoaXNDaHJvbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY2hyb21lJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNJRSA9IC8qQGNjX29uIUAqL2ZhbHNlIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlOyAvLyBBdCBsZWFzdCBJRTZcbiAgICAgICAgICBpZiAoaXNJRSkge1xuICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBpZCBpbnB1dFxuICogQG5hbWUgb25zLWlucHV0XG4gKiBAY2F0ZWdvcnkgZm9ybVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUlucHV0IGNvbXBvbmVudC5bL2VuXVxuICogIFtqYV1pbnB1dOOCs+ODs+ODneKAleODjeODs+ODiOOBp+OBmeOAglsvamFdXG4gKiBAY29kZXBlbiBvalF4TGpcbiAqIEBndWlkZSBVc2luZ0Zvcm1Db21wb25lbnRzXG4gKiAgIFtlbl1Vc2luZyBmb3JtIGNvbXBvbmVudHNbL2VuXVxuICogICBbamFd44OV44Kp44O844Og44KS5L2/44GGWy9qYV1cbiAqIEBndWlkZSBFdmVudEhhbmRsaW5nXG4gKiAgIFtlbl1FdmVudCBoYW5kbGluZyBkZXNjcmlwdGlvbnNbL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5Yem55CG44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWlucHV0Pjwvb25zLWlucHV0PlxuICogPG9ucy1pbnB1dCBtb2RpZmllcj1cIm1hdGVyaWFsXCIgbGFiZWw9XCJVc2VybmFtZVwiPjwvb25zLWlucHV0PlxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbGFiZWxcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRleHQgZm9yIGFuaW1hdGVkIGZsb2F0aW5nIGxhYmVsLlsvZW5dXG4gKiAgIFtqYV3jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgZXjgZvjgovjg5Xjg63jg7zjg4bjgqPjg7PjgrDjg6njg5njg6vjga7jg4bjgq3jgrnjg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgZmxvYXRcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1JZiB0aGlzIGF0dHJpYnV0ZSBpcyBwcmVzZW50LCB0aGUgbGFiZWwgd2lsbCBiZSBhbmltYXRlZC5bL2VuXVxuICogIFtqYV3jgZPjga7lsZ7mgKfjgYzoqK3lrprjgZXjgozjgZ/mmYLjgIHjg6njg5njg6vjga/jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgZnjgovjgojjgYbjgavjgarjgorjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbmctbW9kZWxcbiAqIEBleHRlbnNpb25PZiBhbmd1bGFyXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUJpbmQgdGhlIHZhbHVlIHRvIGEgbW9kZWwuIFdvcmtzIGp1c3QgbGlrZSBmb3Igbm9ybWFsIGlucHV0IGVsZW1lbnRzLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7opoHntKDjga7lgKTjgpLjg6Ljg4fjg6vjgavntJDku5jjgZHjgb7jgZnjgILpgJrluLjjga5pbnB1dOimgee0oOOBruanmOOBq+WLleS9nOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgYXR0cmlidXRlXG4gKiBAbmFtZSBuZy1jaGFuZ2VcbiAqIEBleHRlbnNpb25PZiBhbmd1bGFyXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUV4ZWN1dGVzIGFuIGV4cHJlc3Npb24gd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy4gV29ya3MganVzdCBsaWtlIGZvciBub3JtYWwgaW5wdXQgZWxlbWVudHMuWy9lbl1cbiAqICAgW2phXeWApOOBjOWkieOCj+OBo+OBn+aZguOBq+OBk+OBruWxnuaAp+OBp+aMh+WumuOBl+OBn2V4cHJlc3Npb27jgYzlrp/ooYzjgZXjgozjgb7jgZnjgILpgJrluLjjga5pbnB1dOimgee0oOOBruanmOOBq+WLleS9nOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0lucHV0JywgWyckcGFyc2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBpZiAoZWwuX2lzVGV4dElucHV0KSB7XG4gICAgICAgICAgICBzZXQoc2NvcGUsIGVsLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJyAmJiBlbC5jaGVja2VkKSB7XG4gICAgICAgICAgICBzZXQoc2NvcGUsIGVsLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXQoc2NvcGUsIGVsLmNoZWNrZWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsLl9pc1RleHRJbnB1dCAmJiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgIGVsLmNoZWNrZWQgPSB2YWx1ZSA9PT0gZWwudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWwuX2lzVGV4dElucHV0XG4gICAgICAgICAgICA/IGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgICAgIDogZWxlbWVudC5vbignY2hhbmdlJywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsLl9pc1RleHRJbnB1dFxuICAgICAgICAgICAgPyBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICAgICAgOiBlbGVtZW50Lm9mZignY2hhbmdlJywgb25JbnB1dCk7XG5cbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWtleWJvYXJkLWFjdGl2ZVxuICogQGNhdGVnb3J5IGZvcm1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgQ29uZGl0aW9uYWxseSBkaXNwbGF5IGNvbnRlbnQgZGVwZW5kaW5nIG9uIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyB2aXNpYmxlIG9yIGhpZGRlbi5cbiAqICAgICBUaGlzIGNvbXBvbmVudCByZXF1aXJlcyBjb3Jkb3ZhIGFuZCB0aGF0IHRoZSBjb20uaW9uaWMua2V5Ym9hcmQgcGx1Z2luIGlzIGluc3RhbGxlZC5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOihqOekuuOBleOCjOOBpuOBhOOCi+OBi+OBqeOBhuOBi+OBp+OAgeOCs+ODs+ODhuODs+ODhOOCkuihqOekuuOBmeOCi+OBi+OBqeOBhuOBi+OCkuWIh+OCiuabv+OBiOOCi+OBk+OBqOOBjOWHuuadpeOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOBr+OAgUNvcmRvdmHjgoRjb20uaW9uaWMua2V5Ym9hcmTjg5fjg6njgrDjgqTjg7PjgpLlv4XopoHjgajjgZfjgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJc1xuICogICBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1cbiAqICAgW2phXeS7luOBruODpuODvOODhuOCo+ODquODhuOCo0FQSVsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMta2V5Ym9hcmQtYWN0aXZlPlxuICogICBUaGlzIHdpbGwgb25seSBiZSBkaXNwbGF5ZWQgaWYgdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIG9wZW4uXG4gKiA8L2Rpdj5cbiAqIDxkaXYgb25zLWtleWJvYXJkLWluYWN0aXZlPlxuICogICBUaGVyZSBpcyBhbHNvIGEgY29tcG9uZW50IHRoYXQgZG9lcyB0aGUgb3Bwb3NpdGUuXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWtleWJvYXJkLWFjdGl2ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgY29udGVudCBvZiB0YWdzIHdpdGggdGhpcyBhdHRyaWJ1dGUgd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIG9wZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOihqOekuuOBleOCjOOBn+aZguOBq+WIneOCgeOBpuihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1pbmFjdGl2ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgY29udGVudCBvZiB0YWdzIHdpdGggdGhpcyBhdHRyaWJ1dGUgd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIGhpZGRlbi5bL2VuXVxuICogICBbamFd44GT44Gu5bGe5oCn44GM44Gk44GE44Gf6KaB57Sg44Gv44CB44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6Zqg44KM44Gm44GE44KL5pmC44Gu44G/6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIGNvbXBpbGVGdW5jdGlvbiA9IGZ1bmN0aW9uKHNob3csICRvbnNlbikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBkaXNwU2hvdyA9IHNob3cgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgZGlzcEhpZGUgPSBzaG93ID8gJ25vbmUnIDogJ2Jsb2NrJztcblxuICAgICAgICB2YXIgb25TaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCBkaXNwU2hvdyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9uSGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcEhpZGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkluaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUudmlzaWJsZSkge1xuICAgICAgICAgICAgb25TaG93KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignc2hvdycsIG9uU2hvdyk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdoaWRlJywgb25IaWRlKTtcbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ2luaXQnLCBvbkluaXQpO1xuXG4gICAgICAgIGlmIChvbnMuc29mdHdhcmVLZXlib2FyZC5fdmlzaWJsZSkge1xuICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNLZXlib2FyZEFjdGl2ZScsIFsnJG9uc2VuJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgY29tcGlsZTogY29tcGlsZUZ1bmN0aW9uKHRydWUsICRvbnNlbilcbiAgICB9O1xuICB9XSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRJbmFjdGl2ZScsIFsnJG9uc2VuJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgY29tcGlsZTogY29tcGlsZUZ1bmN0aW9uKGZhbHNlLCAkb25zZW4pXG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdCcsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdCd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdEhlYWRlcicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdEhlYWRlcid9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdEl0ZW0nLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QtaXRlbSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1EaXNwbGF5IGEgcGxhY2Vob2xkZXIgd2hpbGUgdGhlIGNvbnRlbnQgaXMgbG9hZGluZy5bL2VuXVxuICogICBbamFdT25zZW4gVUnjgYzoqq3jgb/ovrzjgb7jgozjgovjgb7jgafjgavooajnpLrjgZnjgovjg5fjg6zjg7zjgrnjg5vjg6vjg4Djg7zjgpLooajnj77jgZfjgb7jgZnjgIJbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWxvYWRpbmctcGxhY2Vob2xkZXI9XCJwYWdlLmh0bWxcIj5cbiAqICAgTG9hZGluZy4uLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2UgdG8gbG9hZC5bL2VuXVxuICogICBbamFd6Kqt44G/6L6844KA44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTG9hZGluZ1BsYWNlaG9sZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzLm9uc0xvYWRpbmdQbGFjZWhvbGRlcikge1xuICAgICAgICAgIG9ucy5fcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlcihlbGVtZW50WzBdLCBhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIsIGZ1bmN0aW9uKGNvbnRlbnRFbGVtZW50LCBkb25lKSB7XG4gICAgICAgICAgICBvbnMuY29tcGlsZShjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICBzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSYW5nZScsIFsnJHBhcnNlJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzZXQgPSAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduO1xuXG4gICAgICAgICAgc2V0KHNjb3BlLCBlbGVtZW50WzBdLnZhbHVlKTtcbiAgICAgICAgICBpZiAoYXR0cnMubmdDaGFuZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JpcHBsZScsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtcmlwcGxlJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNjb3BlXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGwgY2hpbGQgZWxlbWVudHMgdXNpbmcgdGhlIFwidmFyXCIgYXR0cmlidXRlIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIHNjb3BlIG9mIHRoaXMgZWxlbWVudC5bL2VuXVxuICogICBbamFdXCJ2YXJcIuWxnuaAp+OCkuS9v+OBo+OBpuOBhOOCi+WFqOOBpuOBruWtkOimgee0oOOBrnZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjga/jgIHjgZPjga7opoHntKDjga5Bbmd1bGFySlPjgrnjgrPjg7zjg5fjgavov73liqDjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtbGlzdD5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLXNjb3BlIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICA8b25zLWNhcm91c2VsIHZhcj1cImNhcm91c2VsXCI+XG4gKiAgICAgICA8b25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5uZXh0KClcIj5cbiAqICAgICAgICAge3sgaXRlbSB9fVxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5wcmV2KClcIj5cbiAqICAgICAgICAgLi4uXG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgIDwvb25zLWNhcm91c2VsPlxuICogICA8L29ucy1saXN0LWl0ZW0+XG4gKiA8L29ucy1saXN0PlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTY29wZScsIFsnJG9uc2VuJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItY29udGVudFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuU3BsaXR0ZXJDb250ZW50RWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItY29udGVudCcsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlckNvbnRlbnQnLCBbJyRjb21waWxlJywgJ1NwbGl0dGVyQ29udGVudCcsICckb25zZW4nLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJDb250ZW50LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlckNvbnRlbnQoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1jb250ZW50Jywgdmlldyk7XG5cbiAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlci1zaWRlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlb3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlb3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0b3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdG9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW1vZGVjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm1vZGVjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm1vZGVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLlNwbGl0dGVyU2lkZUVsZW1lbnQucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLXNwbGl0dGVyLXNpZGUnLCBsYXN0UmVhZHkpO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU3BsaXR0ZXJTaWRlJywgWyckY29tcGlsZScsICdTcGxpdHRlclNpZGUnLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyU2lkZSwgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgdmFyIHZpZXcgPSBuZXcgU3BsaXR0ZXJTaWRlKHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh2aWV3LCAnZGVzdHJveSBwcmVvcGVuIHByZWNsb3NlIHBvc3RvcGVuIHBvc3RjbG9zZSBtb2RlY2hhbmdlJyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdmlldyk7XG5cbiAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLXNpZGUnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0YWIuJGluamVjdCA9IFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3J107XG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gICAgLmRpcmVjdGl2ZSgnb25zVGFiJywgdGFiKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYmJhckl0ZW0nLCB0YWIpOyAvLyBmb3IgQkNcblxuICBmdW5jdGlvbiB0YWIoJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciB2aWV3ID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdGFiYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdGFiIGJhci5bL2VuXVxuICogICBbamFd44GT44Gu44K/44OW44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgaGlkZS10YWJzXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtCb29sZWFufVxuICogQGRlZmF1bHQgZmFsc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dV2hldGhlciB0byBoaWRlIHRoZSB0YWJzLiBWYWxpZCB2YWx1ZXMgYXJlIHRydWUvZmFsc2UuWy9lbl1cbiAqICAgW2phXeOCv+ODluOCkumdnuihqOekuuOBq+OBmeOCi+WgtOWQiOOBq+aMh+WumuOBl+OBvuOBmeOAgnRydWXjgoLjgZfjgY/jga9mYWxzZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1yZWFjdGl2ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicmVhY3RpdmVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlYWN0aXZlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy10YWJiYXInLCBsYXN0UmVhZHkpO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVGFiYmFyJywgWyckb25zZW4nLCAnJGNvbXBpbGUnLCAnJHBhcnNlJywgJ1RhYmJhclZpZXcnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCAkcGFyc2UsIFRhYmJhclZpZXcpIHtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcblxuXG4gICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5oaWRlVGFicywgZnVuY3Rpb24oaGlkZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgaGlkZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGhpZGUgPSBoaWRlID09PSAndHJ1ZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRbMF0uc2V0VGFiYmFyVmlzaWJpbGl0eSghaGlkZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB0YWJiYXJWaWV3ID0gbmV3IFRhYmJhclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRhYmJhclZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModGFiYmFyVmlldywgJ3JlYWN0aXZlIHByZWNoYW5nZSBwb3N0Y2hhbmdlIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10YWJiYXInLCB0YWJiYXJWaWV3KTtcbiAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRhYmJhclZpZXcpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0YWJiYXJWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0YWJiYXJWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10YWJiYXInLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUZW1wbGF0ZScsIFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVybWluYWw6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudFswXS50ZW1wbGF0ZSB8fCBlbGVtZW50Lmh0bWwoKTtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGVsZW1lbnQuYXR0cignaWQnKSwgY29udGVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvb2xiYXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHRvb2xiYXIuWy9lbl1cbiAqICBbamFd44GT44Gu44OE44O844Or44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUb29sYmFyJywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGRpcnR5IGZpeCFcbiAgICAgICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lID09PSAnb25zLXRvb2xiYXInKSB7XG4gICAgICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtdG9vbGJhcid9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b29sYmFyLWJ1dHRvblxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGJ1dHRvbi5bL2VuXVxuICogICBbamFd44GT44Gu44Oc44K/44Oz44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXJCdXR0b24nLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgdG9vbGJhckJ1dHRvbiA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRvb2xiYXJCdXR0b24pO1xuXG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRvb2xiYXJCdXR0b24sIGVsZW1lbnQpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRvb2xiYXJCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b29sYmFyLWJ1dHRvbicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBDb21wb25lbnRDbGVhbmVyID0ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICovXG4gICAgZGVjb21wb3NlTm9kZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gZWxlbWVudC5yZW1vdmUoKS5jaGlsZHJlbigpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlY29tcG9zZU5vZGUoYW5ndWxhci5lbGVtZW50KGNoaWxkcmVuW2ldKSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXR0cmlidXRlc30gYXR0cnNcbiAgICAgKi9cbiAgICBkZXN0cm95QXR0cmlidXRlczogZnVuY3Rpb24oYXR0cnMpIHtcbiAgICAgIGF0dHJzLiQkZWxlbWVudCA9IG51bGw7XG4gICAgICBhdHRycy4kJG9ic2VydmVycyA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICovXG4gICAgZGVzdHJveUVsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICovXG4gICAgZGVzdHJveVNjb3BlOiBmdW5jdGlvbihzY29wZSkge1xuICAgICAgc2NvcGUuJCRsaXN0ZW5lcnMgPSB7fTtcbiAgICAgIHNjb3BlLiQkd2F0Y2hlcnMgPSBudWxsO1xuICAgICAgc2NvcGUgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Njb3BlfSBzY29wZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICovXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbihzY29wZSwgZm4pIHtcbiAgICAgIHZhciBjbGVhciA9IHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXIoKTtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBtb2R1bGUuZmFjdG9yeSgnQ29tcG9uZW50Q2xlYW5lcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBDb21wb25lbnRDbGVhbmVyO1xuICB9KTtcblxuICAvLyBvdmVycmlkZSBidWlsdGluIG5nLShldmVudG5hbWUpIGRpcmVjdGl2ZXNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZ0V2ZW50RGlyZWN0aXZlcyA9IHt9O1xuICAgICdjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2Vtb3ZlIG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBrZXlkb3duIGtleXVwIGtleXByZXNzIHN1Ym1pdCBmb2N1cyBibHVyIGNvcHkgY3V0IHBhc3RlJy5zcGxpdCgnICcpLmZvckVhY2goXG4gICAgICBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmVOYW1lID0gZGlyZWN0aXZlTm9ybWFsaXplKCduZy0nICsgbmFtZSk7XG4gICAgICAgIG5nRXZlbnREaXJlY3RpdmVzW2RpcmVjdGl2ZU5hbWVdID0gWyckcGFyc2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGlsZTogZnVuY3Rpb24oJGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgICAgICAgdmFyIGZuID0gJHBhcnNlKGF0dHJbZGlyZWN0aXZlTmFtZV0pO1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmbihzY29wZSwgeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZWxlbWVudC5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50Lm9mZihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUoc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgc2NvcGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKGF0dHIpO1xuICAgICAgICAgICAgICAgICAgYXR0ciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfV07XG5cbiAgICAgICAgZnVuY3Rpb24gZGlyZWN0aXZlTm9ybWFsaXplKG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbihtYXRjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBtb2R1bGUuY29uZmlnKFsnJHByb3ZpZGUnLCBmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgdmFyIHNoaWZ0ID0gZnVuY3Rpb24oJGRlbGVnYXRlKSB7XG4gICAgICAgICRkZWxlZ2F0ZS5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gJGRlbGVnYXRlO1xuICAgICAgfTtcbiAgICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKGRpcmVjdGl2ZU5hbWUgKyAnRGlyZWN0aXZlJywgWyckZGVsZWdhdGUnLCBzaGlmdF0pO1xuICAgICAgfSk7XG4gICAgfV0pO1xuICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgIG1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0pO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cblsnYWxlcnQnLCAnY29uZmlybScsICdwcm9tcHQnXS5mb3JFYWNoKG5hbWUgPT4ge1xuICBjb25zdCBvcmlnaW5hbE5vdGlmaWNhdGlvbiA9IG9ucy5ub3RpZmljYXRpb25bbmFtZV07XG5cbiAgb25zLm5vdGlmaWNhdGlvbltuYW1lXSA9IChtZXNzYWdlLCBvcHRpb25zID0ge30pID0+IHtcbiAgICB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgPyAob3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZSkgOiAob3B0aW9ucyA9IG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgY29tcGlsZSA9IG9wdGlvbnMuY29tcGlsZTtcbiAgICBsZXQgJGVsZW1lbnQ7XG5cbiAgICBvcHRpb25zLmNvbXBpbGUgPSBlbGVtZW50ID0+IHtcbiAgICAgICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNvbXBpbGUgPyBjb21waWxlKGVsZW1lbnQpIDogZWxlbWVudCk7XG4gICAgICByZXR1cm4gb25zLiRjb21waWxlKCRlbGVtZW50KSgkZWxlbWVudC5pbmplY3RvcigpLmdldCgnJHJvb3RTY29wZScpKTtcbiAgICB9O1xuXG4gICAgb3B0aW9ucy5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgJGVsZW1lbnQuZGF0YSgnX3Njb3BlJykuJGRlc3Ryb3koKTtcbiAgICAgICRlbGVtZW50ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG9yaWdpbmFsTm90aWZpY2F0aW9uKG9wdGlvbnMpO1xuICB9O1xufSk7IiwiLy8gY29uZmlybSB0byB1c2UganFMaXRlXG5pZiAod2luZG93LmpRdWVyeSAmJiBhbmd1bGFyLmVsZW1lbnQgPT09IHdpbmRvdy5qUXVlcnkpIHtcbiAgY29uc29sZS53YXJuKCdPbnNlbiBVSSByZXF1aXJlIGpxTGl0ZS4gTG9hZCBqUXVlcnkgYWZ0ZXIgbG9hZGluZyBBbmd1bGFySlMgdG8gZml4IHRoaXMgZXJyb3IuIGpRdWVyeSBtYXkgYnJlYWsgT25zZW4gVUkgYmVoYXZpb3IuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxufVxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgdmFyIHRlbXBsYXRlcyA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb25zLXRlbXBsYXRlXCJdJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlc1tpXSk7XG4gICAgICB2YXIgaWQgPSB0ZW1wbGF0ZS5hdHRyKCdpZCcpO1xuICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGlkLCB0ZW1wbGF0ZS50ZXh0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG59KSgpO1xuIl19
