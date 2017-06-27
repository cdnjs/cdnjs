/*! angular-onsenui.js for onsenui - v2.1.0 - 2017-02-01 */
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIiwidGVtcGxhdGVzLmpzIiwib25zZW4uanMiLCJhbGVydERpYWxvZy5qcyIsImFsZXJ0RGlhbG9nQW5pbWF0b3IuanMiLCJhbmltYXRpb25DaG9vc2VyLmpzIiwiY2Fyb3VzZWwuanMiLCJkaWFsb2cuanMiLCJkaWFsb2dBbmltYXRvci5qcyIsImZhYi5qcyIsImdlbmVyaWMuanMiLCJsYXp5UmVwZWF0LmpzIiwibGF6eVJlcGVhdERlbGVnYXRlLmpzIiwibW9kYWwuanMiLCJuYXZpZ2F0b3IuanMiLCJuYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IuanMiLCJvdmVybGF5U2xpZGluZ01lbnVBbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJwdXNoU2xpZGluZ01lbnVBbmltYXRvci5qcyIsInJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzbGlkaW5nTWVudS5qcyIsInNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzcGVlZERpYWwuanMiLCJzcGxpdFZpZXcuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsImJhY2tCdXR0b24uanMiLCJib3R0b21Ub29sYmFyLmpzIiwiYnV0dG9uLmpzIiwiZHVtbXlGb3JJbml0LmpzIiwiZ2VzdHVyZURldGVjdG9yLmpzIiwiaWNvbi5qcyIsImlmT3JpZW50YXRpb24uanMiLCJpZlBsYXRmb3JtLmpzIiwiaW5wdXQuanMiLCJrZXlib2FyZC5qcyIsImxpc3QuanMiLCJsaXN0SGVhZGVyLmpzIiwibGlzdEl0ZW0uanMiLCJsb2FkaW5nUGxhY2Vob2xkZXIuanMiLCJwcm9ncmVzc0Jhci5qcyIsInJhbmdlLmpzIiwicmlwcGxlLmpzIiwic2NvcGUuanMiLCJzcGxpdHRlckNvbnRlbnQuanMiLCJzcGxpdHRlclNpZGUuanMiLCJ0YWIuanMiLCJ0YWJCYXIuanMiLCJ0ZW1wbGF0ZS5qcyIsInRvb2xiYXIuanMiLCJ0b29sYmFyQnV0dG9uLmpzIiwiY29tcG9uZW50Q2xlYW5lci5qcyIsIm5vdGlmaWNhdGlvbi5qcyIsInNldHVwLmpzIiwidGVtcGxhdGVMb2FkZXIuanMiXSwibmFtZXMiOlsiZm5UZXN0IiwidGVzdCIsInh5eiIsIkJhc2VDbGFzcyIsImV4dGVuZCIsInByb3BzIiwiX3N1cGVyIiwicHJvdG90eXBlIiwicHJvdG8iLCJPYmplY3QiLCJjcmVhdGUiLCJuYW1lIiwiZm4iLCJ0bXAiLCJyZXQiLCJhcHBseSIsImFyZ3VtZW50cyIsIm5ld0NsYXNzIiwiaW5pdCIsImhhc093blByb3BlcnR5IiwiU3ViQ2xhc3MiLCJFbXB0eUNsYXNzIiwiY29uc3RydWN0b3IiLCJ3aW5kb3ciLCJDbGFzcyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJlcnIiLCJydW4iLCIkdGVtcGxhdGVDYWNoZSIsInB1dCIsIm9ucyIsImluaXRPbnNlbkZhY2FkZSIsIndhaXRPbnNlblVJTG9hZCIsImluaXRBbmd1bGFyTW9kdWxlIiwiaW5pdFRlbXBsYXRlQ2FjaGUiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwidmFsdWUiLCIkb25zZW4iLCIkcSIsIl9vbnNlblNlcnZpY2UiLCJfcVNlcnZpY2UiLCJjb25zb2xlIiwiYWxlcnQiLCJfaW50ZXJuYWwiLCJnZXRUZW1wbGF0ZUhUTUxBc3luYyIsInBhZ2UiLCJjYWNoZSIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29tcG9uZW50QmFzZSIsImJvb3RzdHJhcCIsImRlcHMiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiY29uY2F0IiwiZG9jIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZFBhcmVudENvbXBvbmVudFVudGlsIiwiZG9tIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwidGFyZ2V0IiwiaW5oZXJpdGVkRGF0YSIsImZpbmRDb21wb25lbnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbXBpbGUiLCJzY29wZSIsIl9nZXRPbnNlblNlcnZpY2UiLCJfd2FpdERpcmV0aXZlSW5pdCIsImVsZW1lbnROYW1lIiwibGFzdFJlYWR5IiwiY2FsbGJhY2siLCJsaXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlQWxlcnREaWFsb2ciLCJvcHRpb25zIiwibGluayIsInBhcmVudFNjb3BlIiwiJG5ldyIsIiRldmFsQXN5bmMiLCJfY3JlYXRlQWxlcnREaWFsb2dPcmlnaW5hbCIsInRoZW4iLCJhbGVydERpYWxvZyIsImNyZWF0ZURpYWxvZyIsIl9jcmVhdGVEaWFsb2dPcmlnaW5hbCIsImRpYWxvZyIsImNyZWF0ZVBvcG92ZXIiLCJfY3JlYXRlUG9wb3Zlck9yaWdpbmFsIiwicG9wb3ZlciIsInJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJfcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlck9yaWdpbmFsIiwiZG9uZSIsInNldEltbWVkaWF0ZSIsIl9zZXR1cExvYWRpbmdQbGFjZUhvbGRlcnMiLCJmYWN0b3J5IiwiQWxlcnREaWFsb2dWaWV3IiwiYXR0cnMiLCJfc2NvcGUiLCJfZWxlbWVudCIsIl9hdHRycyIsIl9jbGVhckRlcml2aW5nTWV0aG9kcyIsImRlcml2ZU1ldGhvZHMiLCJfY2xlYXJEZXJpdmluZ0V2ZW50cyIsImRlcml2ZUV2ZW50cyIsImRldGFpbCIsImJpbmQiLCJfZGVzdHJveSIsImVtaXQiLCJyZW1vdmUiLCJNaWNyb0V2ZW50IiwibWl4aW4iLCJkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQiLCJBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3IiLCJJT1NBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5pbWF0b3JGYWN0b3J5IiwiQ2Fyb3VzZWxWaWV3IiwiY2Fyb3VzZWwiLCJEaWFsb2dWaWV3IiwicmVnaXN0ZXJBbmltYXRvciIsIkFuaW1hdG9yIiwiRGlhbG9nRWxlbWVudCIsIkRpYWxvZ0FuaW1hdG9yIiwiSU9TRGlhbG9nQW5pbWF0b3IiLCJBbmRyb2lkRGlhbG9nQW5pbWF0b3IiLCJTbGlkZURpYWxvZ0FuaW1hdG9yIiwiRmFiVmlldyIsIkdlbmVyaWNWaWV3Iiwic2VsZiIsImRpcmVjdGl2ZU9ubHkiLCJtb2RpZmllclRlbXBsYXRlIiwiYWRkTW9kaWZpZXJNZXRob2RzIiwiYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMiLCJjbGVhbmVyIiwib25EZXN0cm95IiwiX2V2ZW50cyIsInJlbW92ZU1vZGlmaWVyTWV0aG9kcyIsImNsZWFyQ29tcG9uZW50IiwicmVnaXN0ZXIiLCJ2aWV3Iiwidmlld0tleSIsImRlY2xhcmVWYXJBdHRyaWJ1dGUiLCJkZXN0cm95Iiwibm9vcCIsIkFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUiLCJMYXp5UmVwZWF0VmlldyIsImxpbmtlciIsIl9saW5rZXIiLCJfdXRpbCIsInVwZGF0ZVBhcmVudFBvc2l0aW9uIiwidXNlckRlbGVnYXRlIiwiJGV2YWwiLCJvbnNMYXp5UmVwZWF0IiwiaW50ZXJuYWxEZWxlZ2F0ZSIsIl9wcm92aWRlciIsIkxhenlSZXBlYXRQcm92aWRlciIsInBhcmVudE5vZGUiLCJyZWZyZXNoIiwiJHdhdGNoIiwiY291bnRJdGVtcyIsIl9vbkNoYW5nZSIsImRpcmVjdGl2ZUF0dHJpYnV0ZXMiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJfcGFyZW50U2NvcGUiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ciIsImNsb25lTm9kZSIsIml0ZW0iLCJfdXNlckRlbGVnYXRlIiwiY29uZmlndXJlSXRlbVNjb3BlIiwiRnVuY3Rpb24iLCJkZXN0cm95SXRlbVNjb3BlIiwiY3JlYXRlSXRlbUNvbnRlbnQiLCJpbmRleCIsInBhcmVudCIsIl9wcmVwYXJlSXRlbUVsZW1lbnQiLCJfYWRkU3BlY2lhbFByb3BlcnRpZXMiLCJfdXNpbmdCaW5kaW5nIiwiY2xvbmVkIiwiaSIsImxhc3QiLCIkaW5kZXgiLCIkZmlyc3QiLCIkbGFzdCIsIiRtaWRkbGUiLCIkZXZlbiIsIiRvZGQiLCIkZGVzdHJveSIsIkxhenlSZXBlYXREZWxlZ2F0ZSIsIk1vZGFsQW5pbWF0b3IiLCJGYWRlTW9kYWxBbmltYXRvciIsIiRwYXJzZSIsIk1vZGFsVmlldyIsIl9hbmltYXRvckZhY3RvcnkiLCJzZXRBbmltYXRpb25PcHRpb25zIiwiYW5pbWF0aW9uT3B0aW9ucyIsInNob3ciLCJoaWRlIiwidG9nZ2xlIiwiTW9kYWxFbGVtZW50IiwiTmF2aWdhdG9yVmlldyIsIl9wcmV2aW91c1BhZ2VTY29wZSIsIl9ib3VuZE9uUHJlcG9wIiwiX29uUHJlcG9wIiwib24iLCJuYXZpZ2F0b3IiLCJldmVudCIsInBhZ2VzIiwibGVuZ3RoIiwib2ZmIiwiTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiRmFkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvciIsIklPU1NsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiTGlmdE5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvciIsIlNpbXBsZVNsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiU2xpZGluZ01lbnVBbmltYXRvciIsIk92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yIiwiX2JsYWNrTWFzayIsIl9pc1JpZ2h0IiwiX21lbnVQYWdlIiwiX21haW5QYWdlIiwiX3dpZHRoIiwic2V0dXAiLCJtYWluUGFnZSIsIm1lbnVQYWdlIiwid2lkdGgiLCJpc1JpZ2h0IiwiY3NzIiwiZGlzcGxheSIsInpJbmRleCIsInJpZ2h0IiwibGVmdCIsImJhY2tncm91bmRDb2xvciIsInRvcCIsImJvdHRvbSIsInBvc2l0aW9uIiwicHJlcGVuZCIsIm9uUmVzaXplZCIsImlzT3BlbmVkIiwibWF4IiwiY2xpZW50V2lkdGgiLCJtZW51U3R5bGUiLCJfZ2VuZXJhdGVNZW51UGFnZVN0eWxlIiwiYW5pbWl0IiwicXVldWUiLCJwbGF5IiwicmVtb3ZlQXR0ciIsIm9wZW5NZW51IiwiaW5zdGFudCIsImR1cmF0aW9uIiwiZGVsYXkiLCJtYWluUGFnZVN0eWxlIiwiX2dlbmVyYXRlTWFpblBhZ2VTdHlsZSIsInNldFRpbWVvdXQiLCJ3YWl0IiwidGltaW5nIiwiY2xvc2VNZW51IiwibWVudVBhZ2VTdHlsZSIsInRyYW5zbGF0ZU1lbnUiLCJNYXRoIiwibWluIiwibWF4RGlzdGFuY2UiLCJkaXN0YW5jZSIsIm9wYWNpdHkiLCJrZXlzIiwieCIsInRyYW5zZm9ybSIsImNvcHkiLCJQYWdlVmlldyIsIl9jbGVhckxpc3RlbmVyIiwiZGVmaW5lUHJvcGVydHkiLCJvbkRldmljZUJhY2tCdXR0b24iLCJzZXQiLCJfdXNlckJhY2tCdXR0b25IYW5kbGVyIiwiX2VuYWJsZUJhY2tCdXR0b25IYW5kbGVyIiwibmdEZXZpY2VCYWNrQnV0dG9uIiwibmdJbmZpbml0ZVNjcm9sbCIsIm9uSW5maW5pdGVTY3JvbGwiLCJfb25EZXZpY2VCYWNrQnV0dG9uIiwiJGV2ZW50IiwibGFzdEV2ZW50IiwiUG9wb3ZlclZpZXciLCJQb3BvdmVyQW5pbWF0b3IiLCJGYWRlUG9wb3ZlckFuaW1hdG9yIiwiUHVsbEhvb2tWaWV3IiwicHVsbEhvb2siLCJvbkFjdGlvbiIsIm5nQWN0aW9uIiwiJGRvbmUiLCJQdXNoU2xpZGluZ01lbnVBbmltYXRvciIsIm1haW5QYWdlVHJhbnNmb3JtIiwiX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtIiwiX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlIiwiYWJvdmVUcmFuc2Zvcm0iLCJiZWhpbmRTdHlsZSIsImJlaGluZFgiLCJiZWhpbmRUcmFuc2Zvcm0iLCJSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yIiwiYm94U2hhZG93IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYmVoaW5kRGlzdGFuY2UiLCJpc05hTiIsIlNsaWRpbmdNZW51Vmlld01vZGVsIiwiX2Rpc3RhbmNlIiwiX21heERpc3RhbmNlIiwiaXNOdW1iZXIiLCJzZXRNYXhEaXN0YW5jZSIsInNob3VsZE9wZW4iLCJzaG91bGRDbG9zZSIsImlzQ2xvc2VkIiwib3Blbk9yQ2xvc2UiLCJvcGVuIiwiY2xvc2UiLCJnZXRYIiwiZ2V0TWF4RGlzdGFuY2UiLCJ0cmFuc2xhdGUiLCJBbmltYXRpb25DaG9vc2VyIiwiU2xpZGluZ01lbnVWaWV3IiwiX2Rvb3JMb2NrIiwiX2lzUmlnaHRNZW51IiwiX0Rvb3JMb2NrIiwic2lkZSIsIl9tYWluUGFnZUdlc3R1cmVEZXRlY3RvciIsIkdlc3R1cmVEZXRlY3RvciIsIl9ib3VuZE9uVGFwIiwiX29uVGFwIiwiX25vcm1hbGl6ZU1heFNsaWRlRGlzdGFuY2VBdHRyIiwiX2xvZ2ljIiwiX3RyYW5zbGF0ZSIsIl9vcGVuIiwiX2Nsb3NlIiwiJG9ic2VydmUiLCJfb25NYXhTbGlkZURpc3RhbmNlQ2hhbmdlZCIsIl9vblN3aXBlYWJsZUNoYW5nZWQiLCJfYm91bmRPbldpbmRvd1Jlc2l6ZSIsIl9vbldpbmRvd1Jlc2l6ZSIsIl9ib3VuZEhhbmRsZUV2ZW50IiwiX2hhbmRsZUV2ZW50IiwiX2JpbmRFdmVudHMiLCJzZXRNYWluUGFnZSIsInNldE1lbnVQYWdlIiwiX2RldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiX2RldmljZUJhY2tCdXR0b25EaXNwYXRjaGVyIiwiY3JlYXRlSGFuZGxlciIsInVubG9jayIsImFuaW1hdGlvbkNob29zZXIiLCJhbmltYXRvcnMiLCJfYW5pbWF0b3JEaWN0IiwiYmFzZUNsYXNzIiwiYmFzZUNsYXNzTmFtZSIsImRlZmF1bHRBbmltYXRpb24iLCJ0eXBlIiwiZGVmYXVsdEFuaW1hdGlvbk9wdGlvbnMiLCJfYW5pbWF0b3IiLCJuZXdBbmltYXRvciIsIm1heFNsaWRlRGlzdGFuY2UiLCJzd2lwZWFibGUiLCJzZXRTd2lwZWFibGUiLCJnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsImlzTWVudU9wZW5lZCIsImNhbGxQYXJlbnRIYW5kbGVyIiwiX3JlZnJlc2hNZW51UGFnZVdpZHRoIiwiZW5hYmxlZCIsIl9hY3RpdmF0ZUdlc3R1cmVEZXRlY3RvciIsIl9kZWFjdGl2YXRlR2VzdHVyZURldGVjdG9yIiwiX3JlY2FsY3VsYXRlTUFYIiwiaW5kZXhPZiIsInBhcnNlSW50IiwicmVwbGFjZSIsInBhcnNlRmxvYXQiLCJfZ2VzdHVyZURldGVjdG9yIiwiZHJhZ01pbkRpc3RhbmNlIiwiX2FwcGVuZE1haW5QYWdlIiwicGFnZVVybCIsInRlbXBsYXRlSFRNTCIsInBhZ2VTY29wZSIsInBhZ2VDb250ZW50IiwiYXBwZW5kIiwiX2N1cnJlbnRQYWdlRWxlbWVudCIsIl9jdXJyZW50UGFnZVNjb3BlIiwiX2N1cnJlbnRQYWdlVXJsIiwiX3Nob3ciLCJfYXBwZW5kTWVudVBhZ2UiLCJfY3VycmVudE1lbnVQYWdlU2NvcGUiLCJfY3VycmVudE1lbnVQYWdlRWxlbWVudCIsImdldFBhZ2VIVE1MQXN5bmMiLCJodG1sIiwiaXNMb2NrZWQiLCJfaXNJbnNpZGVJZ25vcmVkRWxlbWVudCIsIl9pc0luc2lkZVN3aXBlVGFyZ2V0QXJlYSIsImdlc3R1cmUiLCJwcmV2ZW50RGVmYXVsdCIsImRlbHRhWCIsImRlbHRhRGlzdGFuY2UiLCJzdGFydEV2ZW50Iiwic3RvcERldGVjdCIsIl9sYXN0RGlzdGFuY2UiLCJnZXRBdHRyaWJ1dGUiLCJjZW50ZXIiLCJwYWdlWCIsIl9zd2lwZVRhcmdldFdpZHRoIiwiX2dldFN3aXBlVGFyZ2V0V2lkdGgiLCJ0YXJnZXRXaWR0aCIsInN3aXBlVGFyZ2V0V2lkdGgiLCJzbGlkaW5nTWVudSIsIndhaXRVbmxvY2siLCJhbmltYXRpb24iLCJjaGlsZHJlbiIsInRvZ2dsZU1lbnUiLCJjbG9zZUNsb3NlIiwiU3BlZWREaWFsVmlldyIsIiRvbnNHbG9iYWwiLCJTUExJVF9NT0RFIiwiQ09MTEFQU0VfTU9ERSIsIk1BSU5fUEFHRV9SQVRJTyIsIlNwbGl0VmlldyIsImFkZENsYXNzIiwiX3NlY29uZGFyeVBhZ2UiLCJfbWF4IiwiX21vZGUiLCJfZG9TcGxpdCIsIl9kb0NvbGxhcHNlIiwib3JpZW50YXRpb24iLCJfb25SZXNpemUiLCJzZWNvbmRhcnlQYWdlIiwic2V0U2Vjb25kYXJ5UGFnZSIsIl9jb25zaWRlckNoYW5naW5nQ29sbGFwc2UiLCJfc2V0U2l6ZSIsIl9hcHBlbmRTZWNvbmRQYWdlIiwiX2N1cnJlbnRTZWNvbmRhcnlQYWdlRWxlbWVudCIsIl9jdXJyZW50U2Vjb25kYXJ5UGFnZVNjb3BlIiwiX2N1cnJlbnRQYWdlIiwidHJpbSIsImxhc3RNb2RlIiwic2hvdWxkIiwiX3Nob3VsZENvbGxhcHNlIiwiX2ZpcmVVcGRhdGVFdmVudCIsIl9hY3RpdmF0ZVNwbGl0TW9kZSIsIl9hY3RpdmF0ZUNvbGxhcHNlTW9kZSIsInVwZGF0ZSIsIl9nZXRPcmllbnRhdGlvbiIsImlzUG9ydHJhaXQiLCJnZXRDdXJyZW50TW9kZSIsImMiLCJjb2xsYXBzZSIsImlzTGFuZHNjYXBlIiwic3Vic3RyIiwibnVtIiwic3BsaXQiLCJpbm5lcldpZHRoIiwibXEiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIm1haW5QYWdlV2lkdGgiLCJzZWNvbmRhcnlTaXplIiwiX2ZpcmVFdmVudCIsInNwbGl0VmlldyIsInRoYXQiLCJzaG91bGRDb2xsYXBzZSIsImN1cnJlbnRNb2RlIiwibiIsImlzRmluaXRlIiwiU3BsaXR0ZXJDb250ZW50IiwibG9hZCIsIl9wYWdlU2NvcGUiLCJTcGxpdHRlclNpZGUiLCJTcGxpdHRlciIsInByb3AiLCJ0YWdOYW1lIiwiU3dpdGNoVmlldyIsIl9jaGVja2JveCIsIl9wcmVwYXJlTmdNb2RlbCIsIm5nTW9kZWwiLCJhc3NpZ24iLCIkcGFyZW50IiwiY2hlY2tlZCIsIm5nQ2hhbmdlIiwiVGFiYmFyTm9uZUFuaW1hdG9yIiwiVGFiYmFyRmFkZUFuaW1hdG9yIiwiVGFiYmFyU2xpZGVBbmltYXRvciIsIlRhYmJhclZpZXciLCJfbGFzdFBhZ2VFbGVtZW50IiwiX2xhc3RQYWdlU2NvcGUiLCJUYWJiYXJFbGVtZW50IiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJ0cmFuc2NsdWRlIiwicHJlIiwicmVnaXN0ZXJFdmVudEhhbmRsZXJzIiwicG9zdCIsImZpcmVDb21wb25lbnRFdmVudCIsIkNvbXBvbmVudENsZWFuZXIiLCJjb250cm9sbGVyIiwiYmFja0J1dHRvbiIsImRlc3Ryb3lTY29wZSIsImRlc3Ryb3lBdHRyaWJ1dGVzIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJwYXJlbnRFbGVtZW50IiwiX3NldHVwIiwiX3NldHVwSW5pdGlhbEluZGV4IiwiX3NhdmVMYXN0U3RhdGUiLCJpc1JlYWR5IiwiJGJyb2FkY2FzdCIsImZhYiIsIkVWRU5UUyIsInNjb3BlRGVmIiwicmVkdWNlIiwiZGljdCIsInRpdGxpemUiLCJzdHIiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiXyIsImhhbmRsZXIiLCJnZXN0dXJlRGV0ZWN0b3IiLCJqb2luIiwiaWNvbiIsIl91cGRhdGUiLCJ1c2VyT3JpZW50YXRpb24iLCJvbnNJZk9yaWVudGF0aW9uIiwiZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCIsInBsYXRmb3JtIiwiZ2V0UGxhdGZvcm1TdHJpbmciLCJ1c2VyUGxhdGZvcm0iLCJ1c2VyUGxhdGZvcm1zIiwib25zSWZQbGF0Zm9ybSIsInVzZXJBZ2VudCIsIm1hdGNoIiwiaXNPcGVyYSIsIm9wZXJhIiwiaXNGaXJlZm94IiwiSW5zdGFsbFRyaWdnZXIiLCJpc1NhZmFyaSIsInRvU3RyaW5nIiwiY2FsbCIsImlzRWRnZSIsImlzQ2hyb21lIiwiY2hyb21lIiwiaXNJRSIsImRvY3VtZW50TW9kZSIsImVsIiwib25JbnB1dCIsIl9pc1RleHRJbnB1dCIsImNvbXBpbGVGdW5jdGlvbiIsImRpc3BTaG93IiwiZGlzcEhpZGUiLCJvblNob3ciLCJvbkhpZGUiLCJvbkluaXQiLCJlIiwidmlzaWJsZSIsInNvZnR3YXJlS2V5Ym9hcmQiLCJfdmlzaWJsZSIsInByaW9yaXR5IiwidGVybWluYWwiLCJsYXp5UmVwZWF0Iiwib25zTG9hZGluZ1BsYWNlaG9sZGVyIiwiX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJjb250ZW50RWxlbWVudCIsIm1vZGFsIiwiTmF2aWdhdG9yRWxlbWVudCIsInJld3JpdGFibGVzIiwicmVhZHkiLCJwYWdlTG9hZGVyIiwiY3JlYXRlUGFnZUxvYWRlciIsImZpcmVQYWdlSW5pdEV2ZW50IiwiZiIsImlzQXR0YWNoZWQiLCJmaXJlQWN0dWFsUGFnZUluaXRFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInBvc3RMaW5rIiwibWFpbiIsIm1lbnUiLCJtYWluSHRtbCIsIm1lbnVIdG1sIiwic3BlZWREaWFsIiwic2Vjb25kYXJ5SHRtbCIsInNwbGl0dGVyIiwiU3BsaXR0ZXJDb250ZW50RWxlbWVudCIsIlNwbGl0dGVyU2lkZUVsZW1lbnQiLCJuZ0NvbnRyb2xsZXIiLCJzd2l0Y2hWaWV3IiwidGFiIiwiJGluamVjdCIsImhpZGVUYWJzIiwic2V0VGFiYmFyVmlzaWJpbGl0eSIsInRhYmJhclZpZXciLCJjb250ZW50IiwidGVtcGxhdGUiLCJ0b29sYmFyQnV0dG9uIiwiZGVjb21wb3NlTm9kZSIsIiQkZWxlbWVudCIsIiQkb2JzZXJ2ZXJzIiwiZGVzdHJveUVsZW1lbnQiLCIkJGxpc3RlbmVycyIsIiQkd2F0Y2hlcnMiLCJjbGVhciIsIm5nRXZlbnREaXJlY3RpdmVzIiwiZGlyZWN0aXZlTmFtZSIsImRpcmVjdGl2ZU5vcm1hbGl6ZSIsIiRlbGVtZW50IiwibGlzdGVuZXIiLCIkYXBwbHkiLCJjb25maWciLCIkcHJvdmlkZSIsInNoaWZ0IiwiJGRlbGVnYXRlIiwiZGVjb3JhdG9yIiwiJHdpbmRvdyIsIiRjYWNoZUZhY3RvcnkiLCIkZG9jdW1lbnQiLCIkaHR0cCIsImNyZWF0ZU9uc2VuU2VydmljZSIsIk1vZGlmaWVyVXRpbCIsIkRJUkVDVElWRV9URU1QTEFURV9VUkwiLCJEZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsIl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJtZXRob2ROYW1lcyIsIm1ldGhvZE5hbWUiLCJrbGFzcyIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImV2ZW50TmFtZXMiLCJtYXAiLCJsaXN0ZW5lcnMiLCJldmVudE5hbWUiLCJwdXNoIiwiaXNFbmFibGVkQXV0b1N0YXR1c0JhckZpbGwiLCJfY29uZmlnIiwiYXV0b1N0YXR1c0JhckZpbGwiLCJzaG91bGRGaWxsU3RhdHVzQmFyIiwiY29tcGlsZUFuZExpbmsiLCJwYWdlRWxlbWVudCIsIlBhZ2VMb2FkZXIiLCJwYXJhbXMiLCJlbGVtZW50cyIsImZpbmRFbGVtZW50ZU9iamVjdCIsImRlZmVycmVkIiwiZGVmZXIiLCJub3JtYWxpemVQYWdlSFRNTCIsInByb21pc2UiLCJ1cmwiLCJtZXRob2QiLCJyZXNwb25zZSIsImdlbmVyYXRlTW9kaWZpZXJUZW1wbGF0ZXIiLCJtb2RpZmllcnMiLCJhdHRyTW9kaWZpZXJzIiwibW9kaWZpZXIiLCJtZXRob2RzIiwiaGFzTW9kaWZpZXIiLCJuZWVkbGUiLCJ0b2tlbnMiLCJzb21lIiwicmVtb3ZlTW9kaWZpZXIiLCJmaWx0ZXIiLCJ0b2tlbiIsImFkZE1vZGlmaWVyIiwic2V0TW9kaWZpZXIiLCJ0b2dnbGVNb2RpZmllciIsIl90ciIsImZucyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGFzc2VzIiwicGF0dCIsImNscyIsIm9sZEZuIiwibmV3Rm4iLCJvYmplY3QiLCJ2YXIiLCJ2YXJOYW1lIiwiX2RlZmluZVZhciIsIl9yZWdpc3RlckV2ZW50SGFuZGxlciIsImNvbXBvbmVudCIsImNhcGl0YWxpemVkRXZlbnROYW1lIiwibCIsImlzQW5kcm9pZCIsImlzSU9TIiwiaXNXZWJWaWV3IiwiaXNJT1M3YWJvdmUiLCJ1YSIsInJlc3VsdCIsImtleSIsIm5hbWVzIiwiY29udGFpbmVyIiwiaGFzQXR0cmlidXRlIiwib3JpZ2luYWxOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJtZXNzYWdlIiwiaW5qZWN0b3IiLCJqUXVlcnkiLCJ3YXJuIiwidGVtcGxhdGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0FBS0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSUEsU0FBUyxNQUFNQyxJQUFOLENBQVcsWUFBVTtBQUFDQztBQUFLLEdBQTNCLElBQStCLFlBQS9CLEdBQThDLElBQTNEOztBQUVBO0FBQ0EsV0FBU0MsU0FBVCxHQUFvQixDQUFFOztBQUV0QjtBQUNBQSxZQUFVQyxNQUFWLEdBQW1CLFVBQVNDLEtBQVQsRUFBZ0I7QUFDakMsUUFBSUMsU0FBUyxLQUFLQyxTQUFsQjs7QUFFQTtBQUNBO0FBQ0EsUUFBSUMsUUFBUUMsT0FBT0MsTUFBUCxDQUFjSixNQUFkLENBQVo7O0FBRUE7QUFDQSxTQUFLLElBQUlLLElBQVQsSUFBaUJOLEtBQWpCLEVBQXdCO0FBQ3RCO0FBQ0FHLFlBQU1HLElBQU4sSUFBYyxPQUFPTixNQUFNTSxJQUFOLENBQVAsS0FBdUIsVUFBdkIsSUFDWixPQUFPTCxPQUFPSyxJQUFQLENBQVAsSUFBdUIsVUFEWCxJQUN5QlgsT0FBT0MsSUFBUCxDQUFZSSxNQUFNTSxJQUFOLENBQVosQ0FEekIsR0FFVCxVQUFTQSxJQUFULEVBQWVDLEVBQWYsRUFBa0I7QUFDakIsZUFBTyxZQUFXO0FBQ2hCLGNBQUlDLE1BQU0sS0FBS1AsTUFBZjs7QUFFQTtBQUNBO0FBQ0EsZUFBS0EsTUFBTCxHQUFjQSxPQUFPSyxJQUFQLENBQWQ7O0FBRUE7QUFDQTtBQUNBLGNBQUlHLE1BQU1GLEdBQUdHLEtBQUgsQ0FBUyxJQUFULEVBQWVDLFNBQWYsQ0FBVjtBQUNBLGVBQUtWLE1BQUwsR0FBY08sR0FBZDs7QUFFQSxpQkFBT0MsR0FBUDtBQUNELFNBYkQ7QUFjRCxPQWZELENBZUdILElB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IiwiZmlsZSI6ImFuZ3VsYXItb25zZW51aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFNpbXBsZSBKYXZhU2NyaXB0IEluaGVyaXRhbmNlIGZvciBFUyA1LjFcbiAqIGJhc2VkIG9uIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9zaW1wbGUtamF2YXNjcmlwdC1pbmhlcml0YW5jZS9cbiAqICAoaW5zcGlyZWQgYnkgYmFzZTIgYW5kIFByb3RvdHlwZSlcbiAqIE1JVCBMaWNlbnNlZC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIGZuVGVzdCA9IC94eXovLnRlc3QoZnVuY3Rpb24oKXt4eXo7fSkgPyAvXFxiX3N1cGVyXFxiLyA6IC8uKi87XG5cbiAgLy8gVGhlIGJhc2UgQ2xhc3MgaW1wbGVtZW50YXRpb24gKGRvZXMgbm90aGluZylcbiAgZnVuY3Rpb24gQmFzZUNsYXNzKCl7fVxuXG4gIC8vIENyZWF0ZSBhIG5ldyBDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBjbGFzc1xuICBCYXNlQ2xhc3MuZXh0ZW5kID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgICB2YXIgX3N1cGVyID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICAvLyBTZXQgdXAgdGhlIHByb3RvdHlwZSB0byBpbmhlcml0IGZyb20gdGhlIGJhc2UgY2xhc3NcbiAgICAvLyAoYnV0IHdpdGhvdXQgcnVubmluZyB0aGUgaW5pdCBjb25zdHJ1Y3RvcilcbiAgICB2YXIgcHJvdG8gPSBPYmplY3QuY3JlYXRlKF9zdXBlcik7XG5cbiAgICAvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG92ZXIgb250byB0aGUgbmV3IHByb3RvdHlwZVxuICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIG92ZXJ3cml0aW5nIGFuIGV4aXN0aW5nIGZ1bmN0aW9uXG4gICAgICBwcm90b1tuYW1lXSA9IHR5cGVvZiBwcm9wc1tuYW1lXSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIHR5cGVvZiBfc3VwZXJbbmFtZV0gPT0gXCJmdW5jdGlvblwiICYmIGZuVGVzdC50ZXN0KHByb3BzW25hbWVdKVxuICAgICAgICA/IChmdW5jdGlvbihuYW1lLCBmbil7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLl9zdXBlcjtcblxuICAgICAgICAgICAgICAvLyBBZGQgYSBuZXcgLl9zdXBlcigpIG1ldGhvZCB0aGF0IGlzIHRoZSBzYW1lIG1ldGhvZFxuICAgICAgICAgICAgICAvLyBidXQgb24gdGhlIHN1cGVyLWNsYXNzXG4gICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gX3N1cGVyW25hbWVdO1xuXG4gICAgICAgICAgICAgIC8vIFRoZSBtZXRob2Qgb25seSBuZWVkIHRvIGJlIGJvdW5kIHRlbXBvcmFyaWx5LCBzbyB3ZVxuICAgICAgICAgICAgICAvLyByZW1vdmUgaXQgd2hlbiB3ZSdyZSBkb25lIGV4ZWN1dGluZ1xuICAgICAgICAgICAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSB0bXA7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkobmFtZSwgcHJvcHNbbmFtZV0pXG4gICAgICAgIDogcHJvcHNbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gVGhlIG5ldyBjb25zdHJ1Y3RvclxuICAgIHZhciBuZXdDbGFzcyA9IHR5cGVvZiBwcm90by5pbml0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gcHJvdG8uaGFzT3duUHJvcGVydHkoXCJpbml0XCIpXG4gICAgICAgID8gcHJvdG8uaW5pdCAvLyBBbGwgY29uc3RydWN0aW9uIGlzIGFjdHVhbGx5IGRvbmUgaW4gdGhlIGluaXQgbWV0aG9kXG4gICAgICAgIDogZnVuY3Rpb24gU3ViQ2xhc3MoKXsgX3N1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuICAgICAgOiBmdW5jdGlvbiBFbXB0eUNsYXNzKCl7fTtcblxuICAgIC8vIFBvcHVsYXRlIG91ciBjb25zdHJ1Y3RlZCBwcm90b3R5cGUgb2JqZWN0XG4gICAgbmV3Q2xhc3MucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBFbmZvcmNlIHRoZSBjb25zdHJ1Y3RvciB0byBiZSB3aGF0IHdlIGV4cGVjdFxuICAgIHByb3RvLmNvbnN0cnVjdG9yID0gbmV3Q2xhc3M7XG5cbiAgICAvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcbiAgICBuZXdDbGFzcy5leHRlbmQgPSBCYXNlQ2xhc3MuZXh0ZW5kO1xuXG4gICAgcmV0dXJuIG5ld0NsYXNzO1xuICB9O1xuXG4gIC8vIGV4cG9ydFxuICB3aW5kb3cuQ2xhc3MgPSBCYXNlQ2xhc3M7XG59KSgpO1xuIiwiLy9IRUFEIFxuKGZ1bmN0aW9uKGFwcCkge1xudHJ5IHsgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJ0ZW1wbGF0ZXMtbWFpblwiKTsgfVxuY2F0Y2goZXJyKSB7IGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwidGVtcGxhdGVzLW1haW5cIiwgW10pOyB9XG5hcHAucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG5cInVzZSBzdHJpY3RcIjtcblxuJHRlbXBsYXRlQ2FjaGUucHV0KFwidGVtcGxhdGVzL3NsaWRpbmdfbWVudS50cGxcIixcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNsaWRpbmctbWVudV9fbWVudVxcXCI+PC9kaXY+XFxuXCIgK1xuICAgIFwiPGRpdiBjbGFzcz1cXFwib25zZW4tc2xpZGluZy1tZW51X19tYWluXFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCJcIilcblxuJHRlbXBsYXRlQ2FjaGUucHV0KFwidGVtcGxhdGVzL3NwbGl0X3ZpZXcudHBsXCIsXCI8ZGl2IGNsYXNzPVxcXCJvbnNlbi1zcGxpdC12aWV3X19zZWNvbmRhcnkgZnVsbC1zY3JlZW5cXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNwbGl0LXZpZXdfX21haW4gZnVsbC1zY3JlZW5cXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIlwiKVxufV0pO1xufSkoKTsiLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICAvKipcbiAgICogSW50ZXJuYWwgc2VydmljZSBjbGFzcyBmb3IgZnJhbWV3b3JrIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJyRvbnNlbicsIFsnJHJvb3RTY29wZScsICckd2luZG93JywgJyRjYWNoZUZhY3RvcnknLCAnJGRvY3VtZW50JywgJyR0ZW1wbGF0ZUNhY2hlJywgJyRodHRwJywgJyRxJywgJyRjb21waWxlJywgJyRvbnNHbG9iYWwnLCAnQ29tcG9uZW50Q2xlYW5lcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICR3aW5kb3csICRjYWNoZUZhY3RvcnksICRkb2N1bWVudCwgJHRlbXBsYXRlQ2FjaGUsICRodHRwLCAkcSwgJGNvbXBpbGUsICRvbnNHbG9iYWwsIENvbXBvbmVudENsZWFuZXIpIHtcblxuICAgIHZhciAkb25zZW4gPSBjcmVhdGVPbnNlblNlcnZpY2UoKTtcbiAgICB2YXIgTW9kaWZpZXJVdGlsID0gJG9uc0dsb2JhbC5faW50ZXJuYWwuTW9kaWZpZXJVdGlsO1xuXG4gICAgcmV0dXJuICRvbnNlbjtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9uc2VuU2VydmljZSgpIHtcbiAgICAgIHJldHVybiB7XG5cbiAgICAgICAgRElSRUNUSVZFX1RFTVBMQVRFX1VSTDogJ3RlbXBsYXRlcycsXG5cbiAgICAgICAgY2xlYW5lcjogQ29tcG9uZW50Q2xlYW5lcixcblxuICAgICAgICBEZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGV2aWNlQmFja0J1dHRvbkRpc3BhdGNoZXIsXG5cbiAgICAgICAgX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtZXRob2ROYW1lc1xuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3Bvc2UgYWxsIGRyaXZpbmcgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZU1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIG1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2aWV3W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50W21ldGhvZE5hbWVdLmFwcGx5KGVsZW1lbnQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtDbGFzc30ga2xhc3NcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50OiBmdW5jdGlvbihrbGFzcywgcHJvcGVydGllcykge1xuICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtsYXNzLnByb3RvdHlwZSwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldID0gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50TmFtZXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW21hcF1cbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBjbGVhciBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVFdmVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIGV2ZW50TmFtZXMsIG1hcCkge1xuICAgICAgICAgIG1hcCA9IG1hcCB8fCBmdW5jdGlvbihkZXRhaWwpIHsgcmV0dXJuIGRldGFpbDsgfTtcbiAgICAgICAgICBldmVudE5hbWVzID0gW10uY29uY2F0KGV2ZW50TmFtZXMpO1xuICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIG1hcChldmVudC5kZXRhaWwgfHwge30pO1xuICAgICAgICAgICAgICB2aWV3LmVtaXQoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUsIGluZGV4KSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyc1tpbmRleF0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmlldyA9IGVsZW1lbnQgPSBsaXN0ZW5lcnMgPSBtYXAgPSBudWxsO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0VuYWJsZWRBdXRvU3RhdHVzQmFyRmlsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJG9uc0dsb2JhbC5fY29uZmlnLmF1dG9TdGF0dXNCYXJGaWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvdWxkRmlsbFN0YXR1c0JhcjogJG9uc0dsb2JhbC5zaG91bGRGaWxsU3RhdHVzQmFyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGF1dG9TdGF0dXNCYXJGaWxsOiAkb25zR2xvYmFsLmF1dG9TdGF0dXNCYXJGaWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZGlyZWN0aXZlXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhZ2VFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqL1xuICAgICAgICBjb21waWxlQW5kTGluazogZnVuY3Rpb24odmlldywgcGFnZUVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgdmFyIGxpbmsgPSAkY29tcGlsZShwYWdlRWxlbWVudCk7XG4gICAgICAgICAgdmFyIHBhZ2VTY29wZSA9IHZpZXcuX3Njb3BlLiRuZXcoKTtcblxuICAgICAgICAgIGxpbmsocGFnZVNjb3BlKTtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIE92ZXJ3cml0ZSBwYWdlIHNjb3BlLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChwYWdlRWxlbWVudCkuZGF0YSgnX3Njb3BlJywgcGFnZVNjb3BlKTtcblxuICAgICAgICAgIHBhZ2VTY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2socGFnZUVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhZ2VMb2FkZXJcbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZVBhZ2VMb2FkZXI6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5vbnMuUGFnZUxvYWRlcihcbiAgICAgICAgICAgICh7cGFnZSwgcGFyZW50fSwgZG9uZSkgPT4ge1xuICAgICAgICAgICAgICB3aW5kb3cub25zLl9pbnRlcm5hbC5nZXRQYWdlSFRNTEFzeW5jKHBhZ2UpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21waWxlQW5kTGluayhcbiAgICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgICB3aW5kb3cub25zLl91dGlsLmNyZWF0ZUVsZW1lbnQoaHRtbC50cmltKCkpLFxuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLiRkZXN0cm95KCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge1Njb3BlfSBbcGFyYW1zLnNjb3BlXVxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gW3BhcmFtcy5lbGVtZW50XVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zLmVsZW1lbnRzXVxuICAgICAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IFtwYXJhbXMuYXR0cnNdXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhckNvbXBvbmVudDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5zY29wZSkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUocGFyYW1zLnNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmF0dHJzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKHBhcmFtcy5hdHRycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KHBhcmFtcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmaW5kRWxlbWVudGVPYmplY3Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5pbmhlcml0ZWREYXRhKG5hbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UGFnZUhUTUxBc3luYzogZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgIHZhciBjYWNoZSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChwYWdlKTtcblxuICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0eXBlb2YgY2FjaGUgPT09ICdzdHJpbmcnID8gY2FjaGUgOiBjYWNoZVsxXTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5ub3JtYWxpemVQYWdlSFRNTChodG1sKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgIHVybDogcGFnZSxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB2YXIgaHRtbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbm9ybWFsaXplUGFnZUhUTUw6IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBodG1sID0gKCcnICsgaHRtbCkudHJpbSgpO1xuXG4gICAgICAgICAgaWYgKCFodG1sLm1hdGNoKC9ePG9ucy1wYWdlLykpIHtcbiAgICAgICAgICAgIGh0bWwgPSAnPG9ucy1wYWdlIF9tdXRlZD4nICsgaHRtbCArICc8L29ucy1wYWdlPic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBtb2RpZmllciB0ZW1wbGF0ZXIgZnVuY3Rpb24uIFRoZSBtb2RpZmllciB0ZW1wbGF0ZXIgZ2VuZXJhdGUgY3NzIGNsYXNzZXMgYm91bmQgbW9kaWZpZXIgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFttb2RpZmllcnNdIGFuIGFycmF5IG9mIGFwcGVuZGl4IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2VuZXJhdGVNb2RpZmllclRlbXBsYXRlcjogZnVuY3Rpb24oYXR0cnMsIG1vZGlmaWVycykge1xuICAgICAgICAgIHZhciBhdHRyTW9kaWZpZXJzID0gYXR0cnMgJiYgdHlwZW9mIGF0dHJzLm1vZGlmaWVyID09PSAnc3RyaW5nJyA/IGF0dHJzLm1vZGlmaWVyLnRyaW0oKS5zcGxpdCgvICsvKSA6IFtdO1xuICAgICAgICAgIG1vZGlmaWVycyA9IGFuZ3VsYXIuaXNBcnJheShtb2RpZmllcnMpID8gYXR0ck1vZGlmaWVycy5jb25jYXQobW9kaWZpZXJzKSA6IGF0dHJNb2RpZmllcnM7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlIGVnLiAnb25zLWJ1dHRvbi0tKicsICdvbnMtYnV0dG9uLS0qX19pdGVtJ1xuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RpZmllcnMubWFwKGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSkuam9pbignICcpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0IGZvciBjdXN0b20gZWxlbWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgdmFyIHRva2VucyA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpO1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJVdGlsLnNwbGl0KG5lZWRsZSkuc29tZShmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLmluZGV4T2YobmVlZGxlKSAhPSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IHR5cGVvZiBuZWVkbGUgPT09ICdzdHJpbmcnID8gbmVlZGxlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgICAgIHZhciBtb2RpZmllciA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpLmZpbHRlcihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiAhPT0gbmVlZGxlO1xuICAgICAgICAgICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFkZE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgZWxlbWVudC5hdHRyKCdtb2RpZmllcicpICsgJyAnICsgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0TW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzTW9kaWZpZXIobW9kaWZpZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2RdID0gbWV0aG9kc1ttZXRob2RdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1vZGlmaWVyIG1ldGhvZHMgdG8gdmlldyBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kczogZnVuY3Rpb24odmlldywgdGVtcGxhdGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgX3RyID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZm5zID0ge1xuICAgICAgICAgICAgaGFzTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50Lmhhc0NsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuYXR0cignY2xhc3MnKS5zcGxpdCgvXFxzKy8pLFxuICAgICAgICAgICAgICAgICAgcGF0dCA9IHRlbXBsYXRlLnJlcGxhY2UoJyonLCAnLicpO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjbHMgPSBjbGFzc2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNscy5tYXRjaChwYXR0KSkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNscyA9IF90cihtb2RpZmllcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKGNscykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNscyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbihvbGRGbiwgbmV3Rm4pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB8fCBuZXdGbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld0ZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gYXBwZW5kKHZpZXcuaGFzTW9kaWZpZXIsIGZucy5oYXNNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5yZW1vdmVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnJlbW92ZU1vZGlmaWVyLCBmbnMucmVtb3ZlTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcuYWRkTW9kaWZpZXIgPSBhcHBlbmQodmlldy5hZGRNb2RpZmllciwgZm5zLmFkZE1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnNldE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuc2V0TW9kaWZpZXIsIGZucy5zZXRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnRvZ2dsZU1vZGlmaWVyLCBmbnMudG9nZ2xlTW9kaWZpZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbW9kaWZpZXIgbWV0aG9kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gdmlldy5yZW1vdmVNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gdmlldy5zZXRNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LnRvZ2dsZU1vZGlmaWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlIGFzICd2YXInIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZGVjbGFyZVZhckF0dHJpYnV0ZTogZnVuY3Rpb24oYXR0cnMsIG9iamVjdCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXR0cnMudmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHZhck5hbWUgPSBhdHRycy52YXI7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVWYXIodmFyTmFtZSwgb2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlZ2lzdGVyRXZlbnRIYW5kbGVyOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZSkge1xuICAgICAgICAgIHZhciBjYXBpdGFsaXplZEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGV2ZW50TmFtZS5zbGljZSgxKTtcblxuICAgICAgICAgIGNvbXBvbmVudC5vbihldmVudE5hbWUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGNvbXBvbmVudC5fZWxlbWVudFswXSwgZXZlbnROYW1lLCBldmVudCAmJiBldmVudC5kZXRhaWwpO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGNvbXBvbmVudC5fYXR0cnNbJ29ucycgKyBjYXBpdGFsaXplZEV2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsKGhhbmRsZXIsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVycyBmb3IgYXR0cmlidXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBldmVudE5hbWVzID0gZXZlbnROYW1lcy50cmltKCkuc3BsaXQoL1xccysvKTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnROYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudE5hbWVzW2ldO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudEhhbmRsZXIoY29tcG9uZW50LCBldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzQW5kcm9pZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2FuZHJvaWQvaSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpcGFkfGlwaG9uZXxpcG9kIHRvdWNoKS9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzV2ViVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5vbnMuaXNXZWJWaWV3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzdhYm92ZTogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCB0b3VjaCk7LipDUFUuKk9TIChcXGQrKV8oXFxkKykvaSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzJdICsgJy4nICsgbWF0Y2hbM10pID49IDcgOiBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZSBhIG5hbWVkIGV2ZW50IGZvciBhIGNvbXBvbmVudC4gVGhlIHZpZXcgb2JqZWN0LCBpZiBpdCBleGlzdHMsIGlzIGF0dGFjaGVkIHRvIGV2ZW50LmNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpcmVDb21wb25lbnRFdmVudDogZnVuY3Rpb24oZG9tLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBldmVudFtrZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LmNvbXBvbmVudCA9IGRvbSA/XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9tKS5kYXRhKGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgICBldmVudC5pbml0RXZlbnQoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnOicgKyBldmVudE5hbWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZG9tLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vJywgJ2Zvby12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vIGFuZCAkc2NvcGUuZm9vIGlzIG5vdyAnZm9vLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vLmJhcicsICdmb28tYmFyLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28uYmFyIGFuZCAkc2NvcGUuZm9vLmJhciBpcyBub3cgJ2Zvby1iYXItdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZpbmVWYXI6IGZ1bmN0aW9uKG5hbWUsIG9iamVjdCkge1xuICAgICAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoL1xcLi8pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0KGNvbnRhaW5lciwgbmFtZXMsIG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZV0gPT09IHVuZGVmaW5lZCB8fCBjb250YWluZXJbbmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJbbmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dICE9PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHZhcj1cIicgKyBvYmplY3QuX2F0dHJzLnZhciArICdcIiBiZWNhdXNlIGl0IHdpbGwgb3ZlcndyaXRlIGEgcmVhZC1vbmx5IHZhcmlhYmxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvbnMuY29tcG9uZW50QmFzZSkge1xuICAgICAgICAgICAgc2V0KG9ucy5jb21wb25lbnRCYXNlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBdHRhY2ggdG8gYW5jZXN0b3Igd2l0aCBvbnMtc2NvcGUgYXR0cmlidXRlLlxuICAgICAgICAgIHZhciBlbGVtZW50ID0gb2JqZWN0Ll9lbGVtZW50WzBdO1xuXG4gICAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdvbnMtc2NvcGUnKSkge1xuICAgICAgICAgICAgICBzZXQoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAvLyBJZiBubyBvbnMtc2NvcGUgZWxlbWVudCB3YXMgZm91bmQsIGF0dGFjaCB0byAkcm9vdFNjb3BlLlxuICAgICAgICAgIHNldCgkcm9vdFNjb3BlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWFsZXJ0LWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYWxlcnQgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruOCouODqeODvOODiOODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBBbGVydCBkaWFsb2cgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBbGVydERpYWxvZycsIFsnJG9uc2VuJywgJ0FsZXJ0RGlhbG9nVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgQWxlcnREaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIGFsZXJ0RGlhbG9nID0gbmV3IEFsZXJ0RGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhhbGVydERpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoYWxlcnREaWFsb2csIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCBhbGVydERpYWxvZyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBhbGVydERpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWxlcnQtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIlxuLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbGVydERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0FuZHJvaWRBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbmRyb2lkQWxlcnREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdJT1NBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NBbGVydERpYWxvZ0FuaW1hdG9yKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLnZhbHVlKCdBbmltYXRpb25DaG9vc2VyJywgb25zLl9pbnRlcm5hbC5BbmltYXRvckZhY3RvcnkpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtY2Fyb3VzZWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgqvjg6vjg7zjgrvjg6vjgpLooajnpLrjgafjgY3jgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgIJbL2phXVxuICogQGNvZGVwZW4geGJiek9RXG4gKiBAZ3VpZGUgVXNpbmdDYXJvdXNlbFxuICogICBbZW5dTGVhcm4gaG93IHRvIHVzZSB0aGUgY2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV1jYXJvdXNlbOOCs+ODs+ODneODvOODjeODs+ODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1jYXJvdXNlbCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDIwMHB4XCI+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqIDwvb25zLWNhcm91c2VsPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNhcm91c2VsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqvjg6vjg7zjgrvjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXJlZnJlc2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlZnJlc2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlZnJlc2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vdmVyc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvdmVyc2Nyb2xsXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvdmVyc2Nyb2xsXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWwnLCBbJyRvbnNlbicsICdDYXJvdXNlbFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIENhcm91c2VsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIGNhcm91c2VsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoY2Fyb3VzZWwsICdwb3N0Y2hhbmdlIHJlZnJlc2ggb3ZlcnNjcm9sbCBkZXN0cm95Jyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGNhcm91c2VsKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhcm91c2VsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9XSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWxJdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLiRsYXN0KSB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwKCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwSW5pdGlhbEluZGV4KCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NhdmVMYXN0U3RhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNEaWFsb2cnLCBbJyRvbnNlbicsICdEaWFsb2dWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBEaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICB2YXIgZGlhbG9nID0gbmV3IERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBkaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhkaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGRpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIGRpYWxvZyk7XG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGRpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkRpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0lPU0RpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NEaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdBbmRyb2lkRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkFuZHJvaWREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdTbGlkZURpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5TbGlkZURpYWxvZ0FuaW1hdG9yKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWZhYlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbi5bL2VuXVxuICogICBbamFd44GT44Gu44OV44Ot44O844OG44Kj44Oz44Kw44Ki44Kv44K344On44Oz44Oc44K/44Oz44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS44GX44Gm44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRmFiJywgWyckb25zZW4nLCAnRmFiVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgRmFiVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGZhYiA9IG5ldyBGYWJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCBmYWIpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGZhYik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0dlbmVyaWNWaWV3JywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBHZW5lcmljVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGl2ZU9ubHkpIHtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzKHRoaXMsIG9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSwgZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRoaXMsIGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzZWxmKTtcblxuICAgICAgICAgIGlmIChvcHRpb25zLm9uRGVzdHJveSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3koc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNlbGYgPSBlbGVtZW50ID0gc2VsZi5fZWxlbWVudCA9IHNlbGYuX3Njb3BlID0gc2NvcGUgPSBzZWxmLl9hdHRycyA9IGF0dHJzID0gb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnZpZXdLZXlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAqL1xuICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyID0gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMudmlld0tleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMudmlld0tleSBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cblxuICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgdmlldyk7XG5cbiAgICAgIHZhciBkZXN0cm95ID0gb3B0aW9ucy5vbkRlc3Ryb3kgfHwgYW5ndWxhci5ub29wO1xuICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgIGRlc3Ryb3kodmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIG51bGwpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oR2VuZXJpY1ZpZXcpO1xuXG4gICAgcmV0dXJuIEdlbmVyaWNWaWV3O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbGF6eS1yZXBlYXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgVXNpbmcgdGhpcyBjb21wb25lbnQgYSBsaXN0IHdpdGggbWlsbGlvbnMgb2YgaXRlbXMgY2FuIGJlIHJlbmRlcmVkIHdpdGhvdXQgYSBkcm9wIGluIHBlcmZvcm1hbmNlLlxuICogICAgIEl0IGRvZXMgdGhhdCBieSBcImxhemlseVwiIGxvYWRpbmcgZWxlbWVudHMgaW50byB0aGUgRE9NIHdoZW4gdGhleSBjb21lIGludG8gdmlldyBhbmRcbiAqICAgICByZW1vdmluZyBpdGVtcyBmcm9tIHRoZSBET00gd2hlbiB0aGV5IGFyZSBub3QgdmlzaWJsZS5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOWGheOBp+aPj+eUu+OBleOCjOOCi+OCouOCpOODhuODoOOBrkRPTeimgee0oOOBruiqreOBv+i+vOOBv+OBr+OAgeeUu+mdouOBq+imi+OBiOOBneOBhuOBq+OBquOBo+OBn+aZguOBvuOBp+iHquWLleeahOOBq+mBheW7tuOBleOCjOOAgVxuICogICAgIOeUu+mdouOBi+OCieimi+OBiOOBquOBj+OBquOBo+OBn+WgtOWQiOOBq+OBr+OBneOBruimgee0oOOBr+WLleeahOOBq+OCouODs+ODreODvOODieOBleOCjOOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuS9v+OBhuOBk+OBqOOBp+OAgeODkeODleOCqeODvOODnuODs+OCueOCkuWKo+WMluOBleOBm+OCi+OBk+OBqOeEoeOBl+OBq+W3qOWkp+OBquaVsOOBruimgee0oOOCkuaPj+eUu+OBp+OBjeOBvuOBmeOAglxuICogICBbL2phXVxuICogQGNvZGVwZW4gUXdyR0JtXG4gKiBAZ3VpZGUgVXNpbmdMYXp5UmVwZWF0XG4gKiAgIFtlbl1Ib3cgdG8gdXNlIExhenkgUmVwZWF0Wy9lbl1cbiAqICAgW2phXeODrOOCpOOCuOODvOODquODlOODvOODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gKiAgICAgJHNjb3BlLk15RGVsZWdhdGUgPSB7XG4gKiAgICAgICBjb3VudEl0ZW1zOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIG51bWJlciBvZiBpdGVtcy5cbiAqICAgICAgICAgcmV0dXJuIDEwMDAwMDA7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNhbGN1bGF0ZUl0ZW1IZWlnaHQ6IGZ1bmN0aW9uKGluZGV4KSB7XG4gKiAgICAgICAgIC8vIFJldHVybiB0aGUgaGVpZ2h0IG9mIGFuIGl0ZW0gaW4gcGl4ZWxzLlxuICogICAgICAgICByZXR1cm4gNDU7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBJbml0aWFsaXplIHNjb3BlXG4gKiAgICAgICAgIGl0ZW1TY29wZS5pdGVtID0gJ0l0ZW0gIycgKyAoaW5kZXggKyAxKTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgZGVzdHJveUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBPcHRpb25hbCBtZXRob2QgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbiBpdGVtIGlzIHVubG9hZGVkLlxuICogICAgICAgICBjb25zb2xlLmxvZygnRGVzdHJveWVkIGl0ZW0gd2l0aCBpbmRleDogJyArIGluZGV4KTtcbiAqICAgICAgIH1cbiAqICAgICB9O1xuICogICB9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxvbnMtbGlzdCBuZy1jb250cm9sbGVyPVwiTXlDb250cm9sbGVyXCI+XG4gKiAgIDxvbnMtbGlzdC1pdGVtIG9ucy1sYXp5LXJlcGVhdD1cIk15RGVsZWdhdGVcIj5cbiAqICAgICB7eyBpdGVtIH19XG4gKiAgIDwvb25zLWxpc3QtaXRlbT5cbiAqIDwvb25zLWxpc3Q+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sYXp5LXJlcGVhdFxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BIGRlbGVnYXRlIG9iamVjdCwgY2FuIGJlIGVpdGhlciBhbiBvYmplY3QgYXR0YWNoZWQgdG8gdGhlIHNjb3BlICh3aGVuIHVzaW5nIEFuZ3VsYXJKUykgb3IgYSBub3JtYWwgSmF2YVNjcmlwdCB2YXJpYWJsZS5bL2VuXVxuICogIFtqYV3opoHntKDjga7jg63jg7zjg4njgIHjgqLjg7Pjg63jg7zjg4njgarjganjga7lh6bnkIbjgpLlp5TorbLjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJBbmd1bGFySlPjga7jgrnjgrPjg7zjg5fjga7lpInmlbDlkI3jgoTjgIHpgJrluLjjga5KYXZhU2NyaXB044Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBwcm9wZXJ0eSBkZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGVcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRnVuY3Rpb24gd2hpY2ggcmVjaWV2ZXMgYW4gaW5kZXggYW5kIHRoZSBzY29wZSBmb3IgdGhlIGl0ZW0uIENhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB2YWx1ZXMgaW4gdGhlIGl0ZW0gc2NvcGUuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIC8qKlxuICAgKiBMYXp5IHJlcGVhdCBkaXJlY3RpdmUuXG4gICAqL1xuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNMYXp5UmVwZWF0JywgWyckb25zZW4nLCAnTGF6eVJlcGVhdFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIExhenlSZXBlYXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgdGVybWluYWw6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgbGF6eVJlcGVhdCA9IG5ldyBMYXp5UmVwZWF0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBsYXp5UmVwZWF0ID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0FuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUnLCBbJyRjb21waWxlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICAgIGNvbnN0IGRpcmVjdGl2ZUF0dHJpYnV0ZXMgPSBbJ29ucy1sYXp5LXJlcGVhdCcsICdvbnM6bGF6eTpyZXBlYXQnLCAnb25zX2xhenlfcmVwZWF0JywgJ2RhdGEtb25zLWxhenktcmVwZWF0JywgJ3gtb25zLWxhenktcmVwZWF0J107XG4gICAgY2xhc3MgQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZSBleHRlbmRzIG9ucy5faW50ZXJuYWwuTGF6eVJlcGVhdERlbGVnYXRlIHtcbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHVzZXJEZWxlZ2F0ZVxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSB0ZW1wbGF0ZUVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7U2NvcGV9IHBhcmVudFNjb3BlXG4gICAgICAgKi9cbiAgICAgIGNvbnN0cnVjdG9yKHVzZXJEZWxlZ2F0ZSwgdGVtcGxhdGVFbGVtZW50LCBwYXJlbnRTY29wZSkge1xuICAgICAgICBzdXBlcih1c2VyRGVsZWdhdGUsIHRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3BhcmVudFNjb3BlID0gcGFyZW50U2NvcGU7XG5cbiAgICAgICAgZGlyZWN0aXZlQXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4gdGVtcGxhdGVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyKSk7XG4gICAgICAgIHRoaXMuX2xpbmtlciA9ICRjb21waWxlKHRlbXBsYXRlRWxlbWVudCA/IHRlbXBsYXRlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsKTtcbiAgICAgIH1cblxuICAgICAgY29uZmlndXJlSXRlbVNjb3BlKGl0ZW0sIHNjb3BlKXtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUoaXRlbSwgc2NvcGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3lJdGVtU2NvcGUoaXRlbSwgZWxlbWVudCl7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuZGVzdHJveUl0ZW1TY29wZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fdXNlckRlbGVnYXRlLmRlc3Ryb3lJdGVtU2NvcGUoaXRlbSwgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX3VzaW5nQmluZGluZygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY3JlYXRlSXRlbUNvbnRlbnQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BsYXp5LXJlcGVhdGAgZGVsZWdhdGUgb2JqZWN0IGlzIHZhZ3VlLicpO1xuICAgICAgfVxuXG4gICAgICBsb2FkSXRlbUVsZW1lbnQoaW5kZXgsIHBhcmVudCwgZG9uZSkge1xuICAgICAgICB0aGlzLl9wcmVwYXJlSXRlbUVsZW1lbnQoaW5kZXgsICh7ZWxlbWVudCwgc2NvcGV9KSA9PiB7XG4gICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgIGRvbmUoe2VsZW1lbnQsIHNjb3BlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBfcHJlcGFyZUl0ZW1FbGVtZW50KGluZGV4LCBkb25lKSB7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcy5fcGFyZW50U2NvcGUuJG5ldygpO1xuICAgICAgICB0aGlzLl9hZGRTcGVjaWFsUHJvcGVydGllcyhpbmRleCwgc2NvcGUpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuY29uZmlndXJlSXRlbVNjb3BlKGluZGV4LCBzY29wZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9saW5rZXIoc2NvcGUsIChjbG9uZWQpID0+IHtcbiAgICAgICAgICBsZXQgZWxlbWVudCA9IGNsb25lZFswXTtcbiAgICAgICAgICBpZiAoIXRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KGluZGV4LCBlbGVtZW50KTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb25lKHtlbGVtZW50LCBzY29wZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICovXG4gICAgICBfYWRkU3BlY2lhbFByb3BlcnRpZXMoaSwgc2NvcGUpIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMuY291bnRJdGVtcygpIC0gMTtcbiAgICAgICAgYW5ndWxhci5leHRlbmQoc2NvcGUsIHtcbiAgICAgICAgICAkaW5kZXg6IGksXG4gICAgICAgICAgJGZpcnN0OiBpID09PSAwLFxuICAgICAgICAgICRsYXN0OiBpID09PSBsYXN0LFxuICAgICAgICAgICRtaWRkbGU6IGkgIT09IDAgJiYgaSAhPT0gbGFzdCxcbiAgICAgICAgICAkZXZlbjogaSAlIDIgPT09IDAsXG4gICAgICAgICAgJG9kZDogaSAlIDIgPT09IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgaXRlbS5zY29wZS4kZXZhbEFzeW5jKCgpID0+IHRoaXMuY29uZmlndXJlSXRlbVNjb3BlKGluZGV4LCBpdGVtLnNjb3BlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIudXBkYXRlSXRlbShpbmRleCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbS5zY29wZVxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBpdGVtLmVsZW1lbnRcbiAgICAgICAqL1xuICAgICAgZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgdGhpcy5kZXN0cm95SXRlbVNjb3BlKGluZGV4LCBpdGVtLnNjb3BlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBlci5kZXN0cm95SXRlbShpbmRleCwgaXRlbS5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLnNjb3BlLiRkZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGU7XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1tb2RhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG1vZGFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg6Ljg7zjg4Djg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBNb2RhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc01vZGFsJywgWyckb25zZW4nLCAnTW9kYWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBNb2RhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogKGVsZW1lbnQsIGF0dHJzKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKG1vZGFsLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIG1vZGFsKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgbW9kYWwpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMobW9kYWwpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIG1vZGFsID0gZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1uYXZpZ2F0b3JcbiAqIEBleGFtcGxlXG4gKiA8b25zLW5hdmlnYXRvciBhbmltYXRpb249XCJzbGlkZVwiIHZhcj1cImFwcC5uYXZpXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8b25zLXRvb2xiYXI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+VGl0bGU8L2Rpdj5cbiAqICAgICA8L29ucy10b29sYmFyPlxuICpcbiAqICAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICAgPG9ucy1idXR0b24gbW9kaWZpZXI9XCJsaWdodFwiIG5nLWNsaWNrPVwiYXBwLm5hdmkucHVzaFBhZ2UoJ3BhZ2UuaHRtbCcpO1wiPlB1c2g8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtbmF2aWdhdG9yPlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wb3BQYWdlKCk7XCI+UG9wPC9vbnMtYnV0dG9uPlxuICogICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgbmF2aWdhdG9yLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiuODk+OCsuODvOOCv+ODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVwdXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlcG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXBvcFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cHVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0cG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cG9wXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLk5hdmlnYXRvckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLW5hdmlnYXRvcicsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNOYXZpZ2F0b3InLCBbJ05hdmlnYXRvclZpZXcnLCAnJG9uc2VuJywgZnVuY3Rpb24oTmF2aWdhdG9yVmlldywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBOYXZpZ2F0b3JWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ3ByZXB1c2ggcHJlcG9wIHBvc3RwdXNoIHBvc3Rwb3AgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1uYXZpZ2F0b3InLCB2aWV3KTtcblxuICAgICAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1uYXZpZ2F0b3InLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLk5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdGYWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5GYWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ0lPU1NsaWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NTbGlkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdMaWZ0VHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5MaWZ0TmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ051bGxUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLk5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdTaW1wbGVTbGlkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuU2ltcGxlU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnT3ZlcmxheVNsaWRpbmdNZW51QW5pbWF0b3InLCBbJ1NsaWRpbmdNZW51QW5pbWF0b3InLCBmdW5jdGlvbihTbGlkaW5nTWVudUFuaW1hdG9yKSB7XG5cbiAgICB2YXIgT3ZlcmxheVNsaWRpbmdNZW51QW5pbWF0b3IgPSBTbGlkaW5nTWVudUFuaW1hdG9yLmV4dGVuZCh7XG5cbiAgICAgIF9ibGFja01hc2s6IHVuZGVmaW5lZCxcblxuICAgICAgX2lzUmlnaHQ6IGZhbHNlLFxuICAgICAgX2VsZW1lbnQ6IGZhbHNlLFxuICAgICAgX21lbnVQYWdlOiBmYWxzZSxcbiAgICAgIF9tYWluUGFnZTogZmFsc2UsXG4gICAgICBfd2lkdGg6IGZhbHNlLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoIFwid2lkdGhcIiBzdHlsZSB2YWx1ZVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoIHx8ICc5MCUnO1xuICAgICAgICB0aGlzLl9pc1JpZ2h0ID0gISFvcHRpb25zLmlzUmlnaHQ7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9tYWluUGFnZSA9IG1haW5QYWdlO1xuICAgICAgICB0aGlzLl9tZW51UGFnZSA9IG1lbnVQYWdlO1xuXG4gICAgICAgIG1lbnVQYWdlLmNzcygnYm94LXNoYWRvdycsICcwcHggMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiknKTtcbiAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICAgekluZGV4OiAyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZpeCBmb3IgdHJhbnNwYXJlbnQgbWVudSBwYWdlIG9uIGlPUzguXG4gICAgICAgIG1lbnVQYWdlLmNzcygnLXdlYmtpdC10cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCknKTtcblxuICAgICAgICBtYWluUGFnZS5jc3Moe3pJbmRleDogMX0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnLScgKyBvcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnLScgKyBvcHRpb25zLndpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ibGFja01hc2sgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuY3NzKHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICByaWdodDogJzBweCcsXG4gICAgICAgICAgYm90dG9tOiAnMHB4JyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICAgekluZGV4OiAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZW1lbnQucHJlcGVuZCh0aGlzLl9ibGFja01hc2spO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGhcbiAgICAgICAqL1xuICAgICAgb25SZXNpemVkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnd2lkdGgnLCBvcHRpb25zLndpZHRoKTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNPcGVuZWQpIHtcbiAgICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgdmFyIG1lbnVTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWVudVBhZ2VTdHlsZShtYXgpO1xuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pLnF1ZXVlKG1lbnVTdHlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ibGFja01hc2spIHtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21haW5QYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX21haW5QYWdlID0gdGhpcy5fbWVudVBhZ2UgPSBudWxsO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBtZW51U3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUobWF4KTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKG1haW5QYWdlU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWVudVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIGNsb3NlTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3Moe2Rpc3BsYXk6ICdibG9jayd9KTtcblxuICAgICAgICB2YXIgbWVudVBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWVudVBhZ2VTdHlsZSgwKTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUoMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtYWluUGFnZVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWVudVBhZ2VTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3Moe2Rpc3BsYXk6ICdibG9jayd9KTtcblxuICAgICAgICB2YXIgbWVudVBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWVudVBhZ2VTdHlsZShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIHZhciBtYWluUGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNYWluUGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgZGVsZXRlIG1haW5QYWdlU3R5bGUub3BhY2l0eTtcblxuICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZShtZW51UGFnZVN0eWxlKVxuICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1haW5QYWdlU3R5bGUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLnF1ZXVlKG1haW5QYWdlU3R5bGUpXG4gICAgICAgICAgICAucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVNZW51UGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMuX2lzUmlnaHQgPyAtZGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgJ2JveC1zaGFkb3cnOiBkaXN0YW5jZSA9PT0gMCA/ICdub25lJyA6ICcwcHggMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiknXG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVNYWluUGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBvcGFjaXR5ID0gMSAtICgwLjEgKiBkaXN0YW5jZSAvIG1heCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yO1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wYWdlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcGFnZS5bL2VuXVxuICogICBbamFd44GT44Gu44Oa44O844K444KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctaW5maW5pdGUtc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVBhdGggb2YgdGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIGluZmluaXRlIHNjcm9sbGluZy4gVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gJHNjb3BlLiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgYSBkb25lIGNhbGxiYWNrIHRoYXQgbXVzdCBiZSBjYWxsZWQgd2hlbiBpdCdzIGZpbmlzaGVkLlsvZW5dXG4gKiAgIFtqYV1bL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbi1kZXZpY2UtYmFjay1idXR0b25cbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWRldmljZS1iYWNrLWJ1dHRvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aXRoIGFuIEFuZ3VsYXJKUyBleHByZXNzaW9uIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAgkFuZ3VsYXJKU+OBrmV4cHJlc3Npb27jgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUGFnZScsIFsnJG9uc2VuJywgJ1BhZ2VWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBQYWdlVmlldykge1xuXG4gICAgZnVuY3Rpb24gZmlyZVBhZ2VJbml0RXZlbnQoZWxlbWVudCkge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIGRpcnR5IGZpeFxuICAgICAgdmFyIGkgPSAwLCBmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpKysgPCAxNSkgIHtcbiAgICAgICAgICBpZiAoaXNBdHRhY2hlZChlbGVtZW50KSkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50LCAnaW5pdCcpO1xuICAgICAgICAgICAgZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQoZWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpID4gMTApIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZmlyZSBcInBhZ2Vpbml0XCIgZXZlbnQuIEF0dGFjaCBcIm9ucy1wYWdlXCIgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGYoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZlbnQuaW5pdEV2ZW50KCdwYWdlaW5pdCcsIHRydWUsIHRydWUpO1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0F0dGFjaGVkKGVsZW1lbnQpIHtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlID8gaXNBdHRhY2hlZChlbGVtZW50LnBhcmVudE5vZGUpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gbmV3IFBhZ2VWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwYWdlKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocGFnZSwgJ2luaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcGFnZScsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHBhZ2UsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcGFnZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHBhZ2UpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50WzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXBvcG92ZXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHBvcG92ZXIuWy9lbl1cbiAqICBbamFd44GT44Gu44Od44OD44OX44Kq44O844OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1BvcG92ZXInLCBbJyRvbnNlbicsICdQb3BvdmVyVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgUG9wb3ZlclZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwb3BvdmVyKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocG9wb3ZlciwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocG9wb3ZlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCBwb3BvdmVyKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwb3BvdmVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocG9wb3Zlcik7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ1BvcG92ZXJBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuUG9wb3ZlckFuaW1hdG9yKVxuICAudmFsdWUoJ0ZhZGVQb3BvdmVyQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkZhZGVQb3BvdmVyQW5pbWF0b3IpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcHVsbC1ob29rXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCkge1xuICogICAgICRzY29wZS5pdGVtcyA9IFszLCAyICwxXTtcbiAqXG4gKiAgICAgJHNjb3BlLmxvYWQgPSBmdW5jdGlvbigkZG9uZSkge1xuICogICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgICRzY29wZS5pdGVtcy51bnNoaWZ0KCRzY29wZS5pdGVtcy5sZW5ndGggKyAxKTtcbiAqICAgICAgICAgJGRvbmUoKTtcbiAqICAgICAgIH0sIDEwMDApO1xuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1wYWdlIG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1wdWxsLWhvb2sgdmFyPVwibG9hZGVyXCIgbmctYWN0aW9uPVwibG9hZCgkZG9uZSlcIj5cbiAqICAgICA8c3BhbiBuZy1zd2l0Y2g9XCJsb2FkZXIuc3RhdGVcIj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiaW5pdGlhbFwiPlB1bGwgZG93biB0byByZWZyZXNoPC9zcGFuPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJwcmVhY3Rpb25cIj5SZWxlYXNlIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cImFjdGlvblwiPkxvYWRpbmcgZGF0YS4gUGxlYXNlIHdhaXQuLi48L3NwYW4+XG4gKiAgICAgPC9zcGFuPlxuICogICA8L29ucy1wdWxsLWhvb2s+XG4gKiAgIDxvbnMtbGlzdD5cbiAqICAgICA8b25zLWxpc3QtaXRlbSBuZy1yZXBlYXQ9XCJpdGVtIGluIGl0ZW1zXCI+XG4gKiAgICAgICBJdGVtICN7eyBpdGVtIH19XG4gKiAgICAgPC9vbnMtbGlzdC1pdGVtPlxuICogICA8L29ucy1saXN0PlxuICogPC9vbnMtcGFnZT5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWFjdGlvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVXNlIHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIHBhZ2UgaXMgcHVsbGVkIGRvd24uIEEgPGNvZGU+JGRvbmU8L2NvZGU+IGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSB0byB0ZWxsIHRoZSBjb21wb25lbnQgdGhhdCB0aGUgYWN0aW9uIGlzIGNvbXBsZXRlZC5bL2VuXVxuICogICBbamFdcHVsbCBkb3du44GX44Gf44Go44GN44Gu5oyv44KL6Iie44GE44KS5oyH5a6a44GX44G+44GZ44CC44Ki44Kv44K344On44Oz44GM5a6M5LqG44GX44Gf5pmC44Gr44GvPGNvZGU+JGRvbmU8L2NvZGU+6Zai5pWw44KS5ZG844Gz5Ye644GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWNoYW5nZXN0YXRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJjaGFuZ2VzdGF0ZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiY2hhbmdlc3RhdGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIFB1bGwgaG9vayBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1B1bGxIb29rJywgWyckb25zZW4nLCAnUHVsbEhvb2tWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBQdWxsSG9va1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwdWxsSG9vayA9IG5ldyBQdWxsSG9va1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHB1bGxIb29rKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocHVsbEhvb2ssICdjaGFuZ2VzdGF0ZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCBwdWxsSG9vayk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHVsbEhvb2suX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcHVsbC1ob29rJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdQdXNoU2xpZGluZ01lbnVBbmltYXRvcicsIFsnU2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKFNsaWRpbmdNZW51QW5pbWF0b3IpIHtcblxuICAgIHZhciBQdXNoU2xpZGluZ01lbnVBbmltYXRvciA9IFNsaWRpbmdNZW51QW5pbWF0b3IuZXh0ZW5kKHtcblxuICAgICAgX2lzUmlnaHQ6IGZhbHNlLFxuICAgICAgX2VsZW1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgIF9tZW51UGFnZTogdW5kZWZpbmVkLFxuICAgICAgX21haW5QYWdlOiB1bmRlZmluZWQsXG4gICAgICBfd2lkdGg6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gbWFpblBhZ2U7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlID0gbWVudVBhZ2U7XG5cbiAgICAgICAgdGhpcy5faXNSaWdodCA9ICEhb3B0aW9ucy5pc1JpZ2h0O1xuICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgJzkwJSc7XG5cbiAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICctJyArIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICctJyArIG9wdGlvbnMud2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgb25SZXNpemVkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnd2lkdGgnLCBvcHRpb25zLndpZHRoKTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNPcGVuZWQpIHtcbiAgICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgdmFyIG1haW5QYWdlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgICB2YXIgbWVudVBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKG1heCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiBtYWluUGFnZVRyYW5zZm9ybX0pLnBsYXkoKTtcbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKS5xdWV1ZShtZW51UGFnZVN0eWxlKS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICovXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fbWFpblBhZ2UgPSB0aGlzLl9tZW51UGFnZSA9IG51bGw7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgb3Blbk1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBjbG9zZU1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybSgwKTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUoMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kaXN0YW5jZVxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4RGlzdGFuY2VcbiAgICAgICAqL1xuICAgICAgdHJhbnNsYXRlTWVudTogZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUoTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuXG4gICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKHt0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtfSlcbiAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlKVxuICAgICAgICAgIC5wbGF5KCk7XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm06IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsIDAsIDApJztcblxuICAgICAgICByZXR1cm4gYWJvdmVUcmFuc2Zvcm07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGU6IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciBiZWhpbmRYID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgYmVoaW5kVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBiZWhpbmRYICsgJ3B4LCAwLCAwKSc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGJlaGluZFRyYW5zZm9ybVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHVzaFNsaWRpbmdNZW51QW5pbWF0b3IoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBQdXNoU2xpZGluZ01lbnVBbmltYXRvcjtcbiAgfV0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnUmV2ZWFsU2xpZGluZ01lbnVBbmltYXRvcicsIFsnU2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKFNsaWRpbmdNZW51QW5pbWF0b3IpIHtcblxuICAgIHZhciBSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yID0gU2xpZGluZ01lbnVBbmltYXRvci5leHRlbmQoe1xuXG4gICAgICBfYmxhY2tNYXNrOiB1bmRlZmluZWQsXG5cbiAgICAgIF9pc1JpZ2h0OiBmYWxzZSxcblxuICAgICAgX21lbnVQYWdlOiB1bmRlZmluZWQsXG4gICAgICBfZWxlbWVudDogdW5kZWZpbmVkLFxuICAgICAgX21haW5QYWdlOiB1bmRlZmluZWQsXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGggXCJ3aWR0aFwiIHN0eWxlIHZhbHVlXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBzZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgbWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9tZW51UGFnZSA9IG1lbnVQYWdlO1xuICAgICAgICB0aGlzLl9tYWluUGFnZSA9IG1haW5QYWdlO1xuICAgICAgICB0aGlzLl9pc1JpZ2h0ID0gISFvcHRpb25zLmlzUmlnaHQ7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAnOTAlJztcblxuICAgICAgICBtYWluUGFnZS5jc3Moe1xuICAgICAgICAgIGJveFNoYWRvdzogJzBweCAwIDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICBvcGFjaXR5OiAwLjksXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJzBweCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2JsYWNrTWFzayA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5jc3Moe1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgICAgICBib3R0b206ICcwcHgnLFxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGVtZW50LnByZXBlbmQodGhpcy5fYmxhY2tNYXNrKTtcblxuICAgICAgICAvLyBEaXJ0eSBmaXggZm9yIGJyb2tlbiByZW5kZXJpbmcgYnVnIG9uIGFuZHJvaWQgNC54LlxuICAgICAgICBvbnMuYW5pbWl0KG1haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknfSkucGxheSgpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzT3BlbmVkXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ3dpZHRoJywgdGhpcy5fd2lkdGgpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzT3BlbmVkKSB7XG4gICAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuXG4gICAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSkucXVldWUoe3RyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm19KS5wbGF5KCk7XG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSkucXVldWUoYmVoaW5kU3R5bGUpLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ibGFja01hc2spIHtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tYWluUGFnZSkge1xuICAgICAgICAgIHRoaXMuX21haW5QYWdlLmF0dHIoJ3N0eWxlJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21lbnVQYWdlKSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuYXR0cignc3R5bGUnLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYWluUGFnZSA9IHRoaXMuX21lbnVQYWdlID0gdGhpcy5fZWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBvcGVuTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKG1heCk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKG1heCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgY2xvc2VNZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKDApO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZSgwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgZGVsZXRlIGJlaGluZFN0eWxlLm9wYWNpdHk7XG5cbiAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAucXVldWUoe3RyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm19KVxuICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUpXG4gICAgICAgICAgLnBsYXkoKTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLl9pc1JpZ2h0ID8gLWRpc3RhbmNlIDogZGlzdGFuY2U7XG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiBhYm92ZVRyYW5zZm9ybTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAgIHZhciBiZWhpbmREaXN0YW5jZSA9IChkaXN0YW5jZSAtIG1heCkgLyBtYXggKiAxMDtcbiAgICAgICAgYmVoaW5kRGlzdGFuY2UgPSBpc05hTihiZWhpbmREaXN0YW5jZSkgPyAwIDogTWF0aC5tYXgoTWF0aC5taW4oYmVoaW5kRGlzdGFuY2UsIDApLCAtMTApO1xuXG4gICAgICAgIHZhciBiZWhpbmRYID0gdGhpcy5faXNSaWdodCA/IC1iZWhpbmREaXN0YW5jZSA6IGJlaGluZERpc3RhbmNlO1xuICAgICAgICB2YXIgYmVoaW5kVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBiZWhpbmRYICsgJyUsIDAsIDApJztcbiAgICAgICAgdmFyIG9wYWNpdHkgPSAxICsgYmVoaW5kRGlzdGFuY2UgLyAxMDA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGJlaGluZFRyYW5zZm9ybSxcbiAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUmV2ZWFsU2xpZGluZ01lbnVBbmltYXRvcjtcbiAgfV0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2xpZGluZy1tZW51XG4gKiBAY2F0ZWdvcnkgbWVudVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db21wb25lbnQgZm9yIHNsaWRpbmcgVUkgd2hlcmUgb25lIHBhZ2UgaXMgb3ZlcmxheWVkIG92ZXIgYW5vdGhlciBwYWdlLiBUaGUgYWJvdmUgcGFnZSBjYW4gYmUgc2xpZGVkIGFzaWRlIHRvIHJldmVhbCB0aGUgcGFnZSBiZWhpbmQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOCkuihqOePvuOBmeOCi+OBn+OCgeOBruOCs+ODs+ODneODvOODjeODs+ODiOOBp+OAgeeJh+aWueOBruODmuODvOOCuOOBjOWIpeOBruODmuODvOOCuOOBruS4iuOBq+OCquODvOODkOODvOODrOOCpOOBp+ihqOekuuOBleOCjOOBvuOBmeOAgmFib3ZlLXBhZ2XjgafmjIflrprjgZXjgozjgZ/jg5rjg7zjgrjjga/jgIHmqKrjgYvjgonjgrnjg6njgqTjg4njgZfjgabooajnpLrjgZfjgb7jgZnjgIJbL2phXVxuICogQGNvZGVwZW4gSUR2RkpcbiAqIEBzZWVhbHNvIG9ucy1wYWdlXG4gKiAgIFtlbl1vbnMtcGFnZSBjb21wb25lbnRbL2VuXVxuICogICBbamFdb25zLXBhZ2XjgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFVzaW5nU2xpZGluZ01lbnVcbiAqICAgW2VuXVVzaW5nIHNsaWRpbmcgbWVudVsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgpLkvb/jgYZbL2phXVxuICogQGd1aWRlIEV2ZW50SGFuZGxpbmdcbiAqICAgW2VuXVVzaW5nIGV2ZW50c1svZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjga7liKnnlKhbL2phXVxuICogQGd1aWRlIENhbGxpbmdDb21wb25lbnRBUElzZnJvbUphdmFTY3JpcHRcbiAqICAgW2VuXVVzaW5nIG5hdmlnYXRvciBmcm9tIEphdmFTY3JpcHRbL2VuXVxuICogICBbamFdSmF2YVNjcmlwdOOBi+OCieOCs+ODs+ODneODvOODjeODs+ODiOOCkuWRvOOBs+WHuuOBmVsvamFdXG4gKiBAZ3VpZGUgRGVmaW5pbmdNdWx0aXBsZVBhZ2VzaW5TaW5nbGVIVE1MXG4gKiAgIFtlbl1EZWZpbmluZyBtdWx0aXBsZSBwYWdlcyBpbiBzaW5nbGUgaHRtbFsvZW5dXG4gKiAgIFtqYV3opIfmlbDjga7jg5rjg7zjgrjjgpIx44Gk44GuSFRNTOOBq+iomOi/sOOBmeOCi1svamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1zbGlkaW5nLW1lbnUgdmFyPVwiYXBwLm1lbnVcIiBtYWluLXBhZ2U9XCJwYWdlLmh0bWxcIiBtZW51LXBhZ2U9XCJtZW51Lmh0bWxcIiBtYXgtc2xpZGUtZGlzdGFuY2U9XCIyMDBweFwiIHR5cGU9XCJyZXZlYWxcIiBzaWRlPVwibGVmdFwiPlxuICogPC9vbnMtc2xpZGluZy1tZW51PlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgPG9ucy1idXR0b24gbmctY2xpY2s9XCJhcHAubWVudS50b2dnbGVNZW51KClcIj5Ub2dnbGU8L29ucy1idXR0b24+XG4gKiAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy10ZW1wbGF0ZT5cbiAqXG4gKiA8b25zLXRlbXBsYXRlIGlkPVwibWVudS5odG1sXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8IS0tIG1lbnUgcGFnZSdzIGNvbnRlbnRzIC0tPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKlxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZW9wZW5cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHNsaWRpbmcgbWVudSBpcyBvcGVuZWQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOBjOmWi+OBj+WJjeOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zbGlkaW5nTWVudVxuICogICBbZW5dU2xpZGluZyBtZW51IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TbGlkaW5nTWVudeOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcG9zdG9wZW5cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgc2xpZGluZyBtZW51IGlzIG9wZW5lZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaL44GN57WC44KP44Gj44Gf5b6M44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwcmVjbG9zZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGJlZm9yZSB0aGUgc2xpZGluZyBtZW51IGlzIGNsb3NlZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaJ44GY44KL5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0Y2xvc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgc2xpZGluZyBtZW51IGlzIGNsb3NlZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaJ44GY57WC44KP44Gj44Gf5b6M44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNsaWRpbmcgbWVudS5bL2VuXVxuICogIFtqYV3jgZPjga7jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtZW51LXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgbWVudSBwYWdlLlsvZW5dXG4gKiAgIFtqYV3lt6bjgavkvY3nva7jgZnjgovjg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtYWluLXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgbWFpbiBwYWdlLlsvZW5dXG4gKiAgIFtqYV3lj7PjgavkvY3nva7jgZnjgovjg6HjgqTjg7Pjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzd2lwZWFibGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0Jvb2xlYW59XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVdoZXRoZXIgdG8gZW5hYmxlIHN3aXBlIGludGVyYWN0aW9uLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fmk43kvZzjgpLmnInlirnjgavjgZnjgovloLTlkIjjgavmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzd2lwZS10YXJnZXQtd2lkdGhcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHdpZHRoIG9mIHN3aXBlYWJsZSBhcmVhIGNhbGN1bGF0ZWQgZnJvbSB0aGUgbGVmdCAoaW4gcGl4ZWxzKS4gVXNlIHRoaXMgdG8gZW5hYmxlIHN3aXBlIG9ubHkgd2hlbiB0aGUgZmluZ2VyIHRvdWNoIG9uIHRoZSBzY3JlZW4gZWRnZS5bL2VuXVxuICogICBbamFd44K544Ov44Kk44OX44Gu5Yik5a6a6aCY5Z+f44KS44OU44Kv44K744Or5Y2Y5L2N44Gn5oyH5a6a44GX44G+44GZ44CC55S76Z2i44Gu56uv44GL44KJ5oyH5a6a44GX44Gf6Led6Zui44Gr6YGU44GZ44KL44Go44Oa44O844K444GM6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWF4LXNsaWRlLWRpc3RhbmNlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUhvdyBmYXIgdGhlIG1lbnUgcGFnZSB3aWxsIHNsaWRlIG9wZW4uIENhbiBzcGVjaWZ5IGJvdGggaW4gcHggYW5kICUuIGVnLiA5MCUsIDIwMHB4Wy9lbl1cbiAqICAgW2phXW1lbnUtcGFnZeOBp+aMh+WumuOBleOCjOOBn+ODmuODvOOCuOOBruihqOekuuW5heOCkuaMh+WumuOBl+OBvuOBmeOAguODlOOCr+OCu+ODq+OCguOBl+OBj+OBryXjga7kuKHmlrnjgafmjIflrprjgafjgY3jgb7jgZnvvIjkvos6IDkwJSwgMjAwcHjvvIlbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNwZWNpZnkgd2hpY2ggc2lkZSBvZiB0aGUgc2NyZWVuIHRoZSBtZW51IHBhZ2UgaXMgbG9jYXRlZCBvbi4gUG9zc2libGUgdmFsdWVzIGFyZSBcImxlZnRcIiBhbmQgXCJyaWdodFwiLlsvZW5dXG4gKiAgIFtqYV1tZW51LXBhZ2XjgafmjIflrprjgZXjgozjgZ/jg5rjg7zjgrjjgYznlLvpnaLjga7jganjgaHjgonlgbTjgYvjgonooajnpLrjgZXjgozjgovjgYvjgpLmjIflrprjgZfjgb7jgZnjgIJsZWZ044KC44GX44GP44GvcmlnaHTjga7jgYTjgZrjgozjgYvjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB0eXBlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNsaWRpbmcgbWVudSBhbmltYXRvci4gUG9zc2libGUgdmFsdWVzIGFyZSByZXZlYWwgKGRlZmF1bHQpLCBwdXNoIGFuZCBvdmVybGF5LlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgafjgZnjgIJcInJldmVhbFwi77yI44OH44OV44Kp44Or44OI77yJ44CBXCJwdXNoXCLjgIFcIm92ZXJsYXlcIuOBruOBhOOBmuOCjOOBi+OCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVvcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RvcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0b3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdG9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRNYWluUGFnZVxuICogQHNpZ25hdHVyZSBzZXRNYWluUGFnZShwYWdlVXJsLCBbb3B0aW9uc10pXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8Y29kZT4mbHQ7b25zLXRlbXBsYXRlJmd0OzwvY29kZT4uWy9lbl1cbiAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIFvbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbG9zZU1lbnVdXG4gKiAgIFtlbl1JZiB0cnVlIHRoZSBtZW51IHdpbGwgYmUgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV10cnVl44KS5oyH5a6a44GZ44KL44Go44CB6ZaL44GE44Gm44GE44KL44Oh44OL44Ol44O844KS6ZaJ44GY44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dRnVuY3Rpb24gdGhhdCBpcyBleGVjdXRlZCBhZnRlciB0aGUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXeODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIG1haW4gY29udGVudHMgcGFuZS5bL2VuXVxuICogICBbamFd5Lit5aSu6YOo5YiG44Gr6KGo56S644GV44KM44KL44Oa44O844K444KScGFnZVVybOOBq+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldE1lbnVQYWdlXG4gKiBAc2lnbmF0dXJlIHNldE1lbnVQYWdlKHBhZ2VVcmwsIFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlVXJsXG4gKiAgIFtlbl1QYWdlIFVSTC4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGRvY3VtZW50IG9yIGFuIDxjb2RlPiZsdDtvbnMtdGVtcGxhdGUmZ3Q7PC9jb2RlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsb3NlTWVudV1cbiAqICAgW2VuXUlmIHRydWUgdGhlIG1lbnUgd2lsbCBiZSBjbG9zZWQgYWZ0ZXIgdGhlIG1lbnUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXXRydWXjgpLmjIflrprjgZnjgovjgajjgIHplovjgYTjgabjgYTjgovjg6Hjg4vjg6Xjg7zjgpLplonjgZjjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgdGhlIG1lbnUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIHNpZGUgbWVudSBwYW5lLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zpg6jliIbjgavooajnpLrjgZXjgozjgovjg5rjg7zjgrjjgpJwYWdlVXJs44Gr5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb3Blbk1lbnVcbiAqIEBzaWduYXR1cmUgb3Blbk1lbnUoW29wdGlvbnNdKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgbWVudSBoYXMgYmVlbiBvcGVuZWQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOOBjOmWi+OBhOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNsaWRlIHRoZSBhYm92ZSBsYXllciB0byByZXZlYWwgdGhlIGxheWVyIGJlaGluZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444KS6KGo56S644GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgY2xvc2VNZW51XG4gKiBAc2lnbmF0dXJlIGNsb3NlTWVudShbb3B0aW9uc10pXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSBtZW51IGhhcyBiZWVuIGNsb3NlZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaJ44GY44KJ44KM44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGUgdGhlIGFib3ZlIGxheWVyIHRvIGhpZGUgdGhlIGxheWVyIGJlaGluZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444KS6Z2e6KGo56S644Gr44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgdG9nZ2xlTWVudVxuICogQHNpZ25hdHVyZSB0b2dnbGVNZW51KFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXVRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIG1lbnUgaGFzIGJlZW4gb3BlbmVkIG9yIGNsb3NlZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaL44GN57WC44KP44Gj44Gf5b6M44GL44CB6ZaJ44GY57WC44KP44Gj44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGUgdGhlIGFib3ZlIGxheWVyIHRvIHJldmVhbCB0aGUgbGF5ZXIgYmVoaW5kIGlmIGl0IGlzIGN1cnJlbnRseSBoaWRkZW4sIG90aGVyd2lzZSwgaGlkZSB0aGUgbGF5ZXIgYmVoaW5kLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nirbms4HjgavlkIjjgo/jgZvjgabjgIHjg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgpLooajnpLrjgoLjgZfjgY/jga/pnZ7ooajnpLrjgavjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBpc01lbnVPcGVuZWRcbiAqIEBzaWduYXR1cmUgaXNNZW51T3BlbmVkKClcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiAgIFtlbl10cnVlIGlmIHRoZSBtZW51IGlzIGN1cnJlbnRseSBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjgYzplovjgYTjgabjgYTjgozjgbB0cnVl44Go44Gq44KK44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUmV0dXJucyB0cnVlIGlmIHRoZSBtZW51IHBhZ2UgaXMgb3Blbiwgb3RoZXJ3aXNlIGZhbHNlLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgYzplovjgYTjgabjgYTjgovloLTlkIjjga90cnVl44CB44Gd44GG44Gn44Gq44GE5aC05ZCI44GvZmFsc2XjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlclxuICogQHNpZ25hdHVyZSBnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcigpXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiAgIFtlbl1EZXZpY2UgYmFjayBidXR0b24gaGFuZGxlci5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44OP44Oz44OJ44Op44KS6L+U44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUmV0cmlldmUgdGhlIGJhY2stYnV0dG9uIGhhbmRsZXIuWy9lbl1cbiAqICAgW2phXW9ucy1zbGlkaW5nLW1lbnXjgavntJDku5jjgYTjgabjgYTjgovjg5Djg4Pjgq/jg5zjgr/jg7Pjg4/jg7Pjg4njg6njgpLlj5blvpfjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRTd2lwZWFibGVcbiAqIEBzaWduYXR1cmUgc2V0U3dpcGVhYmxlKHN3aXBlYWJsZSlcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3dpcGVhYmxlXG4gKiAgIFtlbl1JZiB0cnVlIHRoZSBtZW51IHdpbGwgYmUgc3dpcGVhYmxlLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fjgafplovplonjgafjgY3jgovjgojjgYbjgavjgZnjgovloLTlkIjjgavjga90cnVl44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU3BlY2lmeSBpZiB0aGUgbWVudSBzaG91bGQgYmUgc3dpcGVhYmxlIG9yIG5vdC5bL2VuXVxuICogICBbamFd44K544Ov44Kk44OX44Gn6ZaL6ZaJ44GZ44KL44GL44Gp44GG44GL44KS6Kit5a6a44GZ44KL44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NsaWRpbmdNZW51JywgWyckY29tcGlsZScsICdTbGlkaW5nTWVudVZpZXcnLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNsaWRpbmdNZW51VmlldywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIG1haW4gPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyksXG4gICAgICAgICAgICBtZW51ID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gICAgICAgIGlmIChtYWluKSB7XG4gICAgICAgICAgdmFyIG1haW5IdG1sID0gYW5ndWxhci5lbGVtZW50KG1haW4pLnJlbW92ZSgpLmh0bWwoKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVudSkge1xuICAgICAgICAgIHZhciBtZW51SHRtbCA9IGFuZ3VsYXIuZWxlbWVudChtZW51KS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc2xpZGluZy1tZW51X19tZW51JykpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc2xpZGluZy1tZW51X19tYWluJykpO1xuXG4gICAgICAgICAgdmFyIHNsaWRpbmdNZW51ID0gbmV3IFNsaWRpbmdNZW51VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzbGlkaW5nTWVudSwgJ3ByZW9wZW4gcHJlY2xvc2UgcG9zdG9wZW4gcG9zdGNsb3NlIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgIGlmIChtYWluSHRtbCAmJiAhYXR0cnMubWFpblBhZ2UpIHtcbiAgICAgICAgICAgIHNsaWRpbmdNZW51Ll9hcHBlbmRNYWluUGFnZShudWxsLCBtYWluSHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG1lbnVIdG1sICYmICFhdHRycy5tZW51UGFnZSkge1xuICAgICAgICAgICAgc2xpZGluZ01lbnUuX2FwcGVuZE1lbnVQYWdlKG1lbnVIdG1sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc2xpZGluZ01lbnUpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNsaWRpbmctbWVudScsIHNsaWRpbmdNZW51KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2xpZGluZ01lbnUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNsaWRpbmctbWVudScsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1NsaWRpbmdNZW51QW5pbWF0b3InLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgZGVsYXk6IDAsXG4gICAgICBkdXJhdGlvbjogMC40LFxuICAgICAgdGltaW5nOiAnY3ViaWMtYmV6aWVyKC4xLCAuNywgLjEsIDEpJyxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMudGltaW5nXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kdXJhdGlvblxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGVsYXlcbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB0aGlzLnRpbWluZyA9IG9wdGlvbnMudGltaW5nIHx8IHRoaXMudGltaW5nO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5kdXJhdGlvbiA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHRoaXMuZGVsYXkgPSBvcHRpb25zLmRlbGF5ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmRlbGF5IDogdGhpcy5kZWxheTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGggXCJ3aWR0aFwiIHN0eWxlIHZhbHVlXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBzZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgbWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzT3BlbmVkXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqL1xuICAgICAgb3Blbk1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKi9cbiAgICAgIGNsb3NlQ2xvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kaXN0YW5jZVxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4RGlzdGFuY2VcbiAgICAgICAqL1xuICAgICAgdHJhbnNsYXRlTWVudTogZnVuY3Rpb24obWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEByZXR1cm4ge1NsaWRpbmdNZW51QW5pbWF0b3J9XG4gICAgICAgKi9cbiAgICAgIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJyaWRlIGNvcHkgbWV0aG9kLicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGVlZC1kaWFsXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoZSBzcGVlZCBkaWFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5Tjg7zjg4njg4DjgqTjgqLjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLjgZfjgabjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwib3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwib3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NwZWVkRGlhbCcsIFsnJG9uc2VuJywgJ1NwZWVkRGlhbFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIFNwZWVkRGlhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBzcGVlZERpYWwgPSBuZXcgU3BlZWREaWFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BlZWQtZGlhbCcsIHNwZWVkRGlhbCk7XG5cbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwZWVkRGlhbCwgJ29wZW4gY2xvc2UnKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3BlZWREaWFsKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNwZWVkRGlhbC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BlZWQtZGlhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0LXZpZXdcbiAqIEBjYXRlZ29yeSBjb250cm9sXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dRGl2aWRlcyB0aGUgc2NyZWVuIGludG8gYSBsZWZ0IGFuZCByaWdodCBzZWN0aW9uLlsvZW5dXG4gKiAgW2phXeeUu+mdouOCkuW3puWPs+OBq+WIhuWJsuOBmeOCi+OCs+ODs+ODneODvOODjeODs+ODiOOBp+OBmeOAglsvamFdXG4gKiBAY29kZXBlbiBuS3FmdiB7d2lkZX1cbiAqIEBndWlkZSBVc2luZ29uc3NwbGl0dmlld2NvbXBvbmVudFxuICogICBbZW5dVXNpbmcgb25zLXNwbGl0LXZpZXcuWy9lbl1cbiAqICAgW2phXW9ucy1zcGxpdC12aWV344Kz44Oz44Od44O844ON44Oz44OI44KS5L2/44GGWy9qYV1cbiAqIEBndWlkZSBDYWxsaW5nQ29tcG9uZW50QVBJc2Zyb21KYXZhU2NyaXB0XG4gKiAgIFtlbl1Vc2luZyBuYXZpZ2F0b3IgZnJvbSBKYXZhU2NyaXB0Wy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlkbzjgbPlh7rjgZlbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtc3BsaXQtdmlld1xuICogICBzZWNvbmRhcnktcGFnZT1cInNlY29uZGFyeS5odG1sXCJcbiAqICAgbWFpbi1wYWdlPVwibWFpbi5odG1sXCJcbiAqICAgbWFpbi1wYWdlLXdpZHRoPVwiNzAlXCJcbiAqICAgY29sbGFwc2U9XCJwb3J0cmFpdFwiPlxuICogPC9vbnMtc3BsaXQtdmlldz5cbiAqL1xuXG4vKipcbiAqIEBldmVudCB1cGRhdGVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQgd2hlbiB0aGUgc3BsaXQgdmlldyBpcyB1cGRhdGVkLlsvZW5dXG4gKiAgIFtqYV1zcGxpdCB2aWV344Gu54q25oWL44GM5pu05paw44GV44KM44Gf6Zqb44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNwbGl0Vmlld1xuICogICBbZW5dU3BsaXQgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NwbGl0Vmlld+OCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGV2ZW50LnNob3VsZENvbGxhcHNlXG4gKiAgIFtlbl1UcnVlIGlmIHRoZSB2aWV3IHNob3VsZCBjb2xsYXBzZS5bL2VuXVxuICogICBbamFdY29sbGFwc2XnirbmhYvjga7loLTlkIjjgat0cnVl44Gr44Gq44KK44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5jdXJyZW50TW9kZVxuICogICBbZW5dQ3VycmVudCBtb2RlLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7jg6Ljg7zjg4nlkI3jgpLov5TjgZfjgb7jgZnjgIJcImNvbGxhcHNlXCLjgYtcInNwbGl0XCLjgYvjga7jgYTjgZrjgozjgYvjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXZlbnQuc3BsaXRcbiAqICAgW2VuXUNhbGwgdG8gZm9yY2Ugc3BsaXQuWy9lbl1cbiAqICAgW2phXeOBk+OBrumWouaVsOOCkuWRvOOBs+WHuuOBmeOBqOW8t+WItueahOOBq3NwbGl044Oi44O844OJ44Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV2ZW50LmNvbGxhcHNlXG4gKiAgIFtlbl1DYWxsIHRvIGZvcmNlIGNvbGxhcHNlLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7plqLmlbDjgpLlkbzjgbPlh7rjgZnjgajlvLfliLbnmoTjgatjb2xsYXBzZeODouODvOODieOBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge051bWJlcn0gZXZlbnQud2lkdGhcbiAqICAgW2VuXUN1cnJlbnQgd2lkdGguWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrlNwbGl0Vmlld+OBruW5heOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOBi+OCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIIgWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwcmVzcGxpdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGJlZm9yZSB0aGUgdmlldyBpcyBzcGxpdC5bL2VuXVxuICogICBbamFdc3BsaXTnirbmhYvjgavjgovliY3jgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3RzcGxpdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSB2aWV3IGlzIHNwbGl0LlsvZW5dXG4gKiAgIFtqYV1zcGxpdOeKtuaFi+OBq+OBquOBo+OBn+W+jOOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXdu44Gu5bmF44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5vcmllbnRhdGlvblxuICogICBbZW5dQ3VycmVudCBvcmllbnRhdGlvbi5bL2VuXVxuICogICBbamFd54++5Zyo44Gu55S76Z2i44Gu44Kq44Oq44Ko44Oz44OG44O844K344On44Oz44KS6L+U44GX44G+44GZ44CCXCJwb3J0cmFpdFwi44KC44GX44GP44GvXCJsYW5kc2NhcGVcIuOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcHJlY29sbGFwc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHZpZXcgaXMgY29sbGFwc2VkLlsvZW5dXG4gKiAgIFtqYV1jb2xsYXBzZeeKtuaFi+OBq+OBquOCi+WJjeOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXdu44Gu5bmF44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5vcmllbnRhdGlvblxuICogICBbZW5dQ3VycmVudCBvcmllbnRhdGlvbi5bL2VuXVxuICogICBbamFd54++5Zyo44Gu55S76Z2i44Gu44Kq44Oq44Ko44Oz44OG44O844K344On44Oz44KS6L+U44GX44G+44GZ44CCXCJwb3J0cmFpdFwi44KC44GX44GP44GvXCJsYW5kc2NhcGVcIuOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcG9zdGNvbGxhcHNlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYWZ0ZXIgdGhlIHZpZXcgaXMgY29sbGFwc2VkLlsvZW5dXG4gKiAgIFtqYV1jb2xsYXBzZeeKtuaFi+OBq+OBquOBo+OBn+W+jOOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXdu44Gu5bmF44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudC5vcmllbnRhdGlvblxuICogICBbZW5dQ3VycmVudCBvcmllbnRhdGlvbi5bL2VuXVxuICogICBbamFd54++5Zyo44Gu55S76Z2i44Gu44Kq44Oq44Ko44Oz44OG44O844K344On44Oz44KS6L+U44GX44G+44GZ44CCXCJwb3J0cmFpdFwi44KC44GX44GP44GvXCJsYW5kc2NhcGVcIuOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXQgdmlldy5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44OI44OT44Ol44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWFpbi1wYWdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2Ugb24gdGhlIHJpZ2h0LlsvZW5dXG4gKiAgIFtqYV3lj7PlgbTjgavooajnpLrjgZnjgovjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtYWluLXBhZ2Utd2lkdGhcbiAqIEBpbml0b25seVxuICogQHR5cGUge051bWJlcn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dTWFpbiBwYWdlIHdpZHRoIHBlcmNlbnRhZ2UuIFRoZSBzZWNvbmRhcnkgcGFnZSB3aWR0aCB3aWxsIGJlIHRoZSByZW1haW5pbmcgcGVyY2VudGFnZS5bL2VuXVxuICogICBbamFd5Y+z5YG044Gu44Oa44O844K444Gu5bmF44KS44OR44O844K744Oz44OI5Y2Y5L2N44Gn5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgc2Vjb25kYXJ5LXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgcGFnZSBvbiB0aGUgbGVmdC5bL2VuXVxuICogICBbamFd5bem5YG044Gr6KGo56S644GZ44KL44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgY29sbGFwc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgU3BlY2lmeSB0aGUgY29sbGFwc2UgYmVoYXZpb3IuIFZhbGlkIHZhbHVlcyBhcmUgcG9ydHJhaXQsIGxhbmRzY2FwZSwgd2lkdGggI3B4IG9yIGEgbWVkaWEgcXVlcnkuXG4gKiAgICAgXCJwb3J0cmFpdFwiIG9yIFwibGFuZHNjYXBlXCIgbWVhbnMgdGhlIHZpZXcgd2lsbCBjb2xsYXBzZSB3aGVuIGRldmljZSBpcyBpbiBsYW5kc2NhcGUgb3IgcG9ydHJhaXQgb3JpZW50YXRpb24uXG4gKiAgICAgXCJ3aWR0aCAjcHhcIiBtZWFucyB0aGUgdmlldyB3aWxsIGNvbGxhcHNlIHdoZW4gdGhlIHdpbmRvdyB3aWR0aCBpcyBzbWFsbGVyIHRoYW4gdGhlIHNwZWNpZmllZCAjcHguXG4gKiAgICAgSWYgdGhlIHZhbHVlIGlzIGEgbWVkaWEgcXVlcnksIHRoZSB2aWV3IHdpbGwgY29sbGFwc2Ugd2hlbiB0aGUgbWVkaWEgcXVlcnkgaXMgdHJ1ZS5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOW3puWBtOOBruODmuODvOOCuOOCkumdnuihqOekuuOBq+OBmeOCi+adoeS7tuOCkuaMh+WumuOBl+OBvuOBmeOAgnBvcnRyYWl0LCBsYW5kc2NhcGXjgIF3aWR0aCAjcHjjgoLjgZfjgY/jga/jg6Hjg4fjgqPjgqLjgq/jgqjjg6rjga7mjIflrprjgYzlj6/og73jgafjgZnjgIJcbiAqICAgICBwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBmeOCi+OBqOOAgeODh+ODkOOCpOOCueOBrueUu+mdouOBjOe4puWQkeOBjeOCguOBl+OBj+OBr+aoquWQkeOBjeOBq+OBquOBo+OBn+aZguOBq+mBqeeUqOOBleOCjOOBvuOBmeOAglxuICogICAgIHdpZHRoICNweOOCkuaMh+WumuOBmeOCi+OBqOOAgeeUu+mdouOBjOaMh+WumuOBl+OBn+aoquW5heOCiOOCiuOCguefreOBhOWgtOWQiOOBq+mBqeeUqOOBleOCjOOBvuOBmeOAglxuICogICAgIOODoeODh+OCo+OCouOCr+OCqOODquOCkuaMh+WumuOBmeOCi+OBqOOAgeaMh+WumuOBl+OBn+OCr+OCqOODquOBq+mBqeWQiOOBl+OBpuOBhOOCi+WgtOWQiOOBq+mBqeeUqOOBleOCjOOBvuOBmeOAglxuICogICBbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtdXBkYXRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJ1cGRhdGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInVwZGF0ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNwbGl0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzcGxpdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc3BsaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjb2xsYXBzZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY29sbGFwc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNvbGxhcHNlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNwbGl0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c3BsaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzcGxpdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3Rjb2xsYXBzZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNvbGxhcHNlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y29sbGFwc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldE1haW5QYWdlXG4gKiBAc2lnbmF0dXJlIHNldE1haW5QYWdlKHBhZ2VVcmwpXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8b25zLXRlbXBsYXRlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgcmlnaHQgc2VjdGlvblsvZW5dXG4gKiAgIFtqYV3mjIflrprjgZfjgZ9VUkzjgpLjg6HjgqTjg7Pjg5rjg7zjgrjjgpLoqq3jgb/ovrzjgb/jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRTZWNvbmRhcnlQYWdlXG4gKiBAc2lnbmF0dXJlIHNldFNlY29uZGFyeVBhZ2UocGFnZVVybClcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlVXJsXG4gKiAgIFtlbl1QYWdlIFVSTC4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGRvY3VtZW50IG9yIGFuIDxvbnMtdGVtcGxhdGU+LlsvZW5dXG4gKiAgIFtqYV1wYWdl44GuVVJM44GL44CBb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TaG93IHRoZSBwYWdlIHNwZWNpZmllZCBpbiBwYWdlVXJsIGluIHRoZSBsZWZ0IHNlY3Rpb25bL2VuXVxuICogICBbamFd5oyH5a6a44GX44GfVVJM44KS5bem44Gu44Oa44O844K444Gu6Kqt44G/6L6844G/44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgdXBkYXRlXG4gKiBAc2lnbmF0dXJlIHVwZGF0ZSgpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRyaWdnZXIgYW4gJ3VwZGF0ZScgZXZlbnQgYW5kIHRyeSB0byBkZXRlcm1pbmUgaWYgdGhlIHNwbGl0IGJlaGF2aW9yIHNob3VsZCBiZSBjaGFuZ2VkLlsvZW5dXG4gKiAgIFtqYV1zcGxpdOODouODvOODieOCkuWkieOBiOOCi+OBueOBjeOBi+OBqeOBhuOBi+OCkuWIpOaWreOBmeOCi+OBn+OCgeOBrid1cGRhdGUn44Kk44OZ44Oz44OI44KS55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NwbGl0VmlldycsIFsnJGNvbXBpbGUnLCAnU3BsaXRWaWV3JywgJyRvbnNlbicsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdFZpZXcsICRvbnNlbikge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBtYWluUGFnZSA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1haW4tcGFnZScpLFxuICAgICAgICAgICAgc2Vjb25kYXJ5UGFnZSA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnNlY29uZGFyeS1wYWdlJyk7XG5cbiAgICAgICAgaWYgKG1haW5QYWdlKSB7XG4gICAgICAgICAgdmFyIG1haW5IdG1sID0gYW5ndWxhci5lbGVtZW50KG1haW5QYWdlKS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZGFyeVBhZ2UpIHtcbiAgICAgICAgICB2YXIgc2Vjb25kYXJ5SHRtbCA9IGFuZ3VsYXIuZWxlbWVudChzZWNvbmRhcnlQYWdlKS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc3BsaXQtdmlld19fc2Vjb25kYXJ5IGZ1bGwtc2NyZWVuJykpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc3BsaXQtdmlld19fbWFpbiBmdWxsLXNjcmVlbicpKTtcblxuICAgICAgICAgIHZhciBzcGxpdFZpZXcgPSBuZXcgU3BsaXRWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBpZiAobWFpbkh0bWwgJiYgIWF0dHJzLm1haW5QYWdlKSB7XG4gICAgICAgICAgICBzcGxpdFZpZXcuX2FwcGVuZE1haW5QYWdlKG1haW5IdG1sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2Vjb25kYXJ5SHRtbCAmJiAhYXR0cnMuc2Vjb25kYXJ5UGFnZSkge1xuICAgICAgICAgICAgc3BsaXRWaWV3Ll9hcHBlbmRTZWNvbmRQYWdlKHNlY29uZGFyeUh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGxpdFZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BsaXRWaWV3LCAndXBkYXRlIHByZXNwbGl0IHByZWNvbGxhcHNlIHBvc3RzcGxpdCBwb3N0Y29sbGFwc2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXQtdmlldycsIHNwbGl0Vmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGxpdFZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0LXZpZXcnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJDb250ZW50JywgWyckb25zZW4nLCAnJGNvbXBpbGUnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlKSB7XG5cbiAgICB2YXIgU3BsaXR0ZXJDb250ZW50ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMubG9hZCA9IHRoaXMuX2VsZW1lbnRbMF0ubG9hZC5iaW5kKHRoaXMuX2VsZW1lbnRbMF0pO1xuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5sb2FkID0gdGhpcy5fcGFnZVNjb3BlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXJDb250ZW50KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyQ29udGVudCwgWydwYWdlJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyQ29udGVudDtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlclNpZGUnLCBbJyRvbnNlbicsICckY29tcGlsZScsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUpIHtcblxuICAgIHZhciBTcGxpdHRlclNpZGUgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ29wZW4nLCAnY2xvc2UnLCAndG9nZ2xlJywgJ2xvYWQnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnbW9kZWNoYW5nZScsICdwcmVvcGVuJywgJ3ByZWNsb3NlJywgJ3Bvc3RvcGVuJywgJ3Bvc3RjbG9zZSdcbiAgICAgICAgXSwgZGV0YWlsID0+IGRldGFpbC5zaWRlID8gYW5ndWxhci5leHRlbmQoZGV0YWlsLCB7c2lkZTogdGhpc30pIDogZGV0YWlsKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXJTaWRlKTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyU2lkZSwgWydwYWdlJywgJ21vZGUnLCAnaXNPcGVuJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyU2lkZTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXQgdmlldy5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44OI44OT44Ol44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlcicsIFsnJGNvbXBpbGUnLCAnU3BsaXR0ZXInLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBTcGxpdHRlcihzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwbGl0dGVyKTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwbGl0dGVyLCAnZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCBzcGxpdHRlcik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGxpdHRlci5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zd2l0Y2hcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzd2l0Y2guWy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTd2l0Y2gnLCBbJyRvbnNlbicsICdTd2l0Y2hWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBTd2l0Y2hWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBpZiAoYXR0cnMubmdDb250cm9sbGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGVsZW1lbnQgY2FuXFwndCBhY2NlcHQgbmctY29udHJvbGxlciBkaXJlY3RpdmUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3dpdGNoVmlldyA9IG5ldyBTd2l0Y2hWaWV3KGVsZW1lbnQsIHNjb3BlLCBhdHRycyk7XG4gICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhzd2l0Y2hWaWV3LCBlbGVtZW50KTtcblxuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3dpdGNoVmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXN3aXRjaCcsIHN3aXRjaFZpZXcpO1xuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3dpdGNoVmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoc3dpdGNoVmlldyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBhdHRycyA9IHNjb3BlID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJOb25lQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhck5vbmVBbmltYXRvcik7XG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyRmFkZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJGYWRlQW5pbWF0b3IpO1xuICBtb2R1bGUudmFsdWUoJ1RhYmJhclNsaWRlQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhclNsaWRlQW5pbWF0b3IpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdUYWJiYXJWaWV3JywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICB2YXIgVGFiYmFyVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnb25zLXRhYmJhcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiZWxlbWVudFwiIHBhcmFtZXRlciBtdXN0IGJlIGEgXCJvbnMtdGFiYmFyXCIgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZVNjb3BlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3JlYWN0aXZlJywgJ3Bvc3RjaGFuZ2UnLCAncHJlY2hhbmdlJywgJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVUYWInLFxuICAgICAgICAgICdzZXRUYWJiYXJWaXNpYmlsaXR5JyxcbiAgICAgICAgICAnZ2V0QWN0aXZlVGFiSW5kZXgnLFxuICAgICAgICAgICdsb2FkUGFnZSdcbiAgICAgICAgXSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgTWljcm9FdmVudC5taXhpbihUYWJiYXJWaWV3KTtcblxuICAgIFRhYmJhclZpZXcucmVnaXN0ZXJBbmltYXRvciA9IGZ1bmN0aW9uKG5hbWUsIEFuaW1hdG9yKSB7XG4gICAgICByZXR1cm4gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJlZ2lzdGVyQW5pbWF0b3IobmFtZSwgQW5pbWF0b3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gVGFiYmFyVmlldztcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0JhY2tCdXR0b24nLCBbJyRvbnNlbicsICckY29tcGlsZScsICdHZW5lcmljVmlldycsICdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSwgR2VuZXJpY1ZpZXcsIENvbXBvbmVudENsZWFuZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBiYWNrQnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYmFjay1idXR0b24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBiYWNrQnV0dG9uLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYmFja0J1dHRvbik7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUoc2NvcGUpO1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKGF0dHJzKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0JvdHRvbVRvb2xiYXInLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYm90dG9tVG9vbGJhcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtYnV0dG9uXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0J1dHRvbicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBidXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICB2aWV3S2V5OiAnb25zLWJ1dHRvbidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGJ1dHRvbiwgJ2Rpc2FibGVkJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF0uZGlzYWJsZWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX2VsZW1lbnRbMF0uZGlzYWJsZWQgPSB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRHVtbXlGb3JJbml0JywgWyckcm9vdFNjb3BlJywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgIHZhciBpc1JlYWR5ID0gZmFsc2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKCFpc1JlYWR5KSB7XG4gICAgICAgICAgICBpc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJG9ucy1yZWFkeScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEVWRU5UUyA9XG4gICAgKCdkcmFnIGRyYWdsZWZ0IGRyYWdyaWdodCBkcmFndXAgZHJhZ2Rvd24gaG9sZCByZWxlYXNlIHN3aXBlIHN3aXBlbGVmdCBzd2lwZXJpZ2h0ICcgK1xuICAgICAgJ3N3aXBldXAgc3dpcGVkb3duIHRhcCBkb3VibGV0YXAgdG91Y2ggdHJhbnNmb3JtIHBpbmNoIHBpbmNoaW4gcGluY2hvdXQgcm90YXRlJykuc3BsaXQoLyArLyk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNHZXN0dXJlRGV0ZWN0b3InLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIHNjb3BlRGVmID0gRVZFTlRTLnJlZHVjZShmdW5jdGlvbihkaWN0LCBuYW1lKSB7XG4gICAgICBkaWN0WyduZycgKyB0aXRsaXplKG5hbWUpXSA9ICcmJztcbiAgICAgIHJldHVybiBkaWN0O1xuICAgIH0sIHt9KTtcblxuICAgIGZ1bmN0aW9uIHRpdGxpemUoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHNjb3BlRGVmLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgXywgdHJhbnNjbHVkZSkge1xuXG4gICAgICAgICAgdHJhbnNjbHVkZShzY29wZS4kcGFyZW50LCBmdW5jdGlvbihjbG9uZWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgYXR0ciA9ICduZycgKyB0aXRsaXplKGV2ZW50LnR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoYXR0ciBpbiBzY29wZURlZikge1xuICAgICAgICAgICAgICBzY29wZVthdHRyXSh7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZ2VzdHVyZURldGVjdG9yO1xuXG4gICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yID0gZWxlbWVudFswXS5fZ2VzdHVyZURldGVjdG9yO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLm9uKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vZmYoRVZFTlRTLmpvaW4oJyAnKSwgaGFuZGxlcik7XG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3IuZWxlbWVudCA9IHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWljb25cbiAqL1xuXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSWNvbicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5pY29uLmluZGV4T2YoJ3t7JykgIT09IC0xKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2ljb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gZWxlbWVudFswXS5fdXBkYXRlKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChzY29wZSwgZWxlbWVudCwgYXR0cnMpID0+IHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtaWNvbidcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG5cbiAgICAgIH1cblxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gc2NyZWVuIG9yaWVudGF0aW9uLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0IGFuZCBsYW5kc2NhcGUuIERpZmZlcmVudCBmcm9tIG90aGVyIGNvbXBvbmVudHMsIHRoaXMgY29tcG9uZW50IGlzIHVzZWQgYXMgYXR0cmlidXRlIGluIGFueSBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV3nlLvpnaLjga7lkJHjgY3jgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLooYzjgYTjgb7jgZnjgIJwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAguOBmeOBueOBpuOBruimgee0oOOBruWxnuaAp+OBq+S9v+eUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtcGxhdGZvcm0gW2VuXW9ucy1pZi1wbGF0Zm9ybSBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtcGxhdGZvcm3jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLW9yaWVudGF0aW9uPVwicG9ydHJhaXRcIj5cbiAqICAgPHA+VGhpcyB3aWxsIG9ubHkgYmUgdmlzaWJsZSBpbiBwb3J0cmFpdCBtb2RlLjwvcD5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRWl0aGVyIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiLlsvZW5dXG4gKiAgIFtqYV1wb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZPcmllbnRhdGlvbicsIFsnJG9uc2VuJywgJyRvbnNHbG9iYWwnLCBmdW5jdGlvbigkb25zZW4sICRvbnNHbG9iYWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZk9yaWVudGF0aW9uJywgdXBkYXRlKTtcbiAgICAgICAgICAkb25zR2xvYmFsLm9yaWVudGF0aW9uLm9uKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vZmYoJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyT3JpZW50YXRpb24gPSAoJycgKyBhdHRycy5vbnNJZk9yaWVudGF0aW9uKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIG9yaWVudGF0aW9uID0gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpO1xuXG4gICAgICAgICAgICBpZiAodXNlck9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnIHx8IHVzZXJPcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZScpIHtcbiAgICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gb3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBnZXRMYW5kc2NhcGVPclBvcnRyYWl0KCkge1xuICAgICAgICAgICAgcmV0dXJuICRvbnNHbG9iYWwub3JpZW50YXRpb24uaXNQb3J0cmFpdCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1wbGF0Zm9ybVxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIC8gYnJvd3Nlci4gVmFsaWQgdmFsdWVzIGFyZSBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgYW5kIFwid3BcIi5bL2VuXVxuICogICAgW2phXeODl+ODqeODg+ODiOODleOCqeODvOODoOOChOODluODqeOCpuOCtuODvOOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuOBiuOBk+OBquOBhOOBvuOBmeOAgm9wZXJhLCBmaXJlZm94LCBzYWZhcmksIGNocm9tZSwgaWUsIGVkZ2UsIGFuZHJvaWQsIGJsYWNrYmVycnksIGlvcywgd3Djga7jgYTjgZrjgozjgYvjga7lgKTjgpLnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLW9yaWVudGF0aW9uIFtlbl1vbnMtaWYtb3JpZW50YXRpb24gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLW9yaWVudGF0aW9u44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1wbGF0Zm9ybT1cImFuZHJvaWRcIj5cbiAqICAgLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLXBsYXRmb3JtXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU9uZSBvciBtdWx0aXBsZSBzcGFjZSBzZXBhcmF0ZWQgdmFsdWVzOiBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgb3IgXCJ3cFwiLlsvZW5dXG4gKiAgIFtqYV1cIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIsIFwid3BcIuOBruOBhOOBmuOCjOOBi+epuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmUGxhdGZvcm0nLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICB2YXIgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybVN0cmluZygpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZQbGF0Zm9ybScsIGZ1bmN0aW9uKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyUGxhdGZvcm1zID0gYXR0cnMub25zSWZQbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFBsYXRmb3JtU3RyaW5nKCkge1xuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvUklNIFRhYmxldCBPUy9pKSkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JCMTAvaSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2JsYWNrYmVycnknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmV8SUVNb2JpbGV8V1BEZXNrdG9wL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3dwJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBPcGVyYSA4LjArIChVQSBkZXRlY3Rpb24gdG8gZGV0ZWN0IEJsaW5rL3Y4LXBvd2VyZWQgT3BlcmEpXG4gICAgICAgICAgdmFyIGlzT3BlcmEgPSAhIXdpbmRvdy5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNPcGVyYSkge1xuICAgICAgICAgICAgcmV0dXJuICdvcGVyYSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRmlyZWZveCA9IHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7ICAgLy8gRmlyZWZveCAxLjArXG4gICAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNTYWZhcmkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93LkhUTUxFbGVtZW50KS5pbmRleE9mKCdDb25zdHJ1Y3RvcicpID4gMDtcbiAgICAgICAgICAvLyBBdCBsZWFzdCBTYWZhcmkgMys6IFwiW29iamVjdCBIVE1MRWxlbWVudENvbnN0cnVjdG9yXVwiXG4gICAgICAgICAgaWYgKGlzU2FmYXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIEVkZ2UvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNFZGdlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2VkZ2UnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0Nocm9tZSA9ICEhd2luZG93LmNocm9tZSAmJiAhaXNPcGVyYSAmJiAhaXNFZGdlOyAvLyBDaHJvbWUgMStcbiAgICAgICAgICBpZiAoaXNDaHJvbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY2hyb21lJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNJRSA9IC8qQGNjX29uIUAqL2ZhbHNlIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlOyAvLyBBdCBsZWFzdCBJRTZcbiAgICAgICAgICBpZiAoaXNJRSkge1xuICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBpZCBpbnB1dFxuICogQG5hbWUgb25zLWlucHV0XG4gKiBAY2F0ZWdvcnkgZm9ybVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUlucHV0IGNvbXBvbmVudC5bL2VuXVxuICogIFtqYV1pbnB1dOOCs+ODs+ODneKAleODjeODs+ODiOOBp+OBmeOAglsvamFdXG4gKiBAY29kZXBlbiBvalF4TGpcbiAqIEBndWlkZSBVc2luZ0Zvcm1Db21wb25lbnRzXG4gKiAgIFtlbl1Vc2luZyBmb3JtIGNvbXBvbmVudHNbL2VuXVxuICogICBbamFd44OV44Kp44O844Og44KS5L2/44GGWy9qYV1cbiAqIEBndWlkZSBFdmVudEhhbmRsaW5nXG4gKiAgIFtlbl1FdmVudCBoYW5kbGluZyBkZXNjcmlwdGlvbnNbL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5Yem55CG44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWlucHV0Pjwvb25zLWlucHV0PlxuICogPG9ucy1pbnB1dCBtb2RpZmllcj1cIm1hdGVyaWFsXCIgbGFiZWw9XCJVc2VybmFtZVwiPjwvb25zLWlucHV0PlxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbGFiZWxcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRleHQgZm9yIGFuaW1hdGVkIGZsb2F0aW5nIGxhYmVsLlsvZW5dXG4gKiAgIFtqYV3jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgZXjgZvjgovjg5Xjg63jg7zjg4bjgqPjg7PjgrDjg6njg5njg6vjga7jg4bjgq3jgrnjg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgZmxvYXRcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1JZiB0aGlzIGF0dHJpYnV0ZSBpcyBwcmVzZW50LCB0aGUgbGFiZWwgd2lsbCBiZSBhbmltYXRlZC5bL2VuXVxuICogIFtqYV3jgZPjga7lsZ7mgKfjgYzoqK3lrprjgZXjgozjgZ/mmYLjgIHjg6njg5njg6vjga/jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgZnjgovjgojjgYbjgavjgarjgorjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbmctbW9kZWxcbiAqIEBleHRlbnNpb25PZiBhbmd1bGFyXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUJpbmQgdGhlIHZhbHVlIHRvIGEgbW9kZWwuIFdvcmtzIGp1c3QgbGlrZSBmb3Igbm9ybWFsIGlucHV0IGVsZW1lbnRzLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7opoHntKDjga7lgKTjgpLjg6Ljg4fjg6vjgavntJDku5jjgZHjgb7jgZnjgILpgJrluLjjga5pbnB1dOimgee0oOOBruanmOOBq+WLleS9nOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgYXR0cmlidXRlXG4gKiBAbmFtZSBuZy1jaGFuZ2VcbiAqIEBleHRlbnNpb25PZiBhbmd1bGFyXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUV4ZWN1dGVzIGFuIGV4cHJlc3Npb24gd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy4gV29ya3MganVzdCBsaWtlIGZvciBub3JtYWwgaW5wdXQgZWxlbWVudHMuWy9lbl1cbiAqICAgW2phXeWApOOBjOWkieOCj+OBo+OBn+aZguOBq+OBk+OBruWxnuaAp+OBp+aMh+WumuOBl+OBn2V4cHJlc3Npb27jgYzlrp/ooYzjgZXjgozjgb7jgZnjgILpgJrluLjjga5pbnB1dOimgee0oOOBruanmOOBq+WLleS9nOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0lucHV0JywgWyckcGFyc2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBpZiAoZWwuX2lzVGV4dElucHV0KSB7XG4gICAgICAgICAgICBzZXQoc2NvcGUsIGVsLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJyAmJiBlbC5jaGVja2VkKSB7XG4gICAgICAgICAgICBzZXQoc2NvcGUsIGVsLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXQoc2NvcGUsIGVsLmNoZWNrZWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsLl9pc1RleHRJbnB1dCAmJiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgIGVsLmNoZWNrZWQgPSB2YWx1ZSA9PT0gZWwudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWwuX2lzVGV4dElucHV0XG4gICAgICAgICAgICA/IGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgICAgIDogZWxlbWVudC5vbignY2hhbmdlJywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsLl9pc1RleHRJbnB1dFxuICAgICAgICAgICAgPyBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICAgICAgOiBlbGVtZW50Lm9mZignY2hhbmdlJywgb25JbnB1dCk7XG5cbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWtleWJvYXJkLWFjdGl2ZVxuICogQGNhdGVnb3J5IGZvcm1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgQ29uZGl0aW9uYWxseSBkaXNwbGF5IGNvbnRlbnQgZGVwZW5kaW5nIG9uIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyB2aXNpYmxlIG9yIGhpZGRlbi5cbiAqICAgICBUaGlzIGNvbXBvbmVudCByZXF1aXJlcyBjb3Jkb3ZhIGFuZCB0aGF0IHRoZSBjb20uaW9uaWMua2V5Ym9hcmQgcGx1Z2luIGlzIGluc3RhbGxlZC5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOihqOekuuOBleOCjOOBpuOBhOOCi+OBi+OBqeOBhuOBi+OBp+OAgeOCs+ODs+ODhuODs+ODhOOCkuihqOekuuOBmeOCi+OBi+OBqeOBhuOBi+OCkuWIh+OCiuabv+OBiOOCi+OBk+OBqOOBjOWHuuadpeOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOBr+OAgUNvcmRvdmHjgoRjb20uaW9uaWMua2V5Ym9hcmTjg5fjg6njgrDjgqTjg7PjgpLlv4XopoHjgajjgZfjgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJc1xuICogICBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1cbiAqICAgW2phXeS7luOBruODpuODvOODhuOCo+ODquODhuOCo0FQSVsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMta2V5Ym9hcmQtYWN0aXZlPlxuICogICBUaGlzIHdpbGwgb25seSBiZSBkaXNwbGF5ZWQgaWYgdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIG9wZW4uXG4gKiA8L2Rpdj5cbiAqIDxkaXYgb25zLWtleWJvYXJkLWluYWN0aXZlPlxuICogICBUaGVyZSBpcyBhbHNvIGEgY29tcG9uZW50IHRoYXQgZG9lcyB0aGUgb3Bwb3NpdGUuXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWtleWJvYXJkLWFjdGl2ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgY29udGVudCBvZiB0YWdzIHdpdGggdGhpcyBhdHRyaWJ1dGUgd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIG9wZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOihqOekuuOBleOCjOOBn+aZguOBq+WIneOCgeOBpuihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1pbmFjdGl2ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgY29udGVudCBvZiB0YWdzIHdpdGggdGhpcyBhdHRyaWJ1dGUgd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIGhpZGRlbi5bL2VuXVxuICogICBbamFd44GT44Gu5bGe5oCn44GM44Gk44GE44Gf6KaB57Sg44Gv44CB44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6Zqg44KM44Gm44GE44KL5pmC44Gu44G/6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIGNvbXBpbGVGdW5jdGlvbiA9IGZ1bmN0aW9uKHNob3csICRvbnNlbikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBkaXNwU2hvdyA9IHNob3cgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgZGlzcEhpZGUgPSBzaG93ID8gJ25vbmUnIDogJ2Jsb2NrJztcblxuICAgICAgICB2YXIgb25TaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCBkaXNwU2hvdyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9uSGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcEhpZGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkluaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUudmlzaWJsZSkge1xuICAgICAgICAgICAgb25TaG93KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignc2hvdycsIG9uU2hvdyk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdoaWRlJywgb25IaWRlKTtcbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ2luaXQnLCBvbkluaXQpO1xuXG4gICAgICAgIGlmIChvbnMuc29mdHdhcmVLZXlib2FyZC5fdmlzaWJsZSkge1xuICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNLZXlib2FyZEFjdGl2ZScsIFsnJG9uc2VuJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgY29tcGlsZTogY29tcGlsZUZ1bmN0aW9uKHRydWUsICRvbnNlbilcbiAgICB9O1xuICB9XSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRJbmFjdGl2ZScsIFsnJG9uc2VuJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgY29tcGlsZTogY29tcGlsZUZ1bmN0aW9uKGZhbHNlLCAkb25zZW4pXG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdCcsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdCd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdEhlYWRlcicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdEhlYWRlcid9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdEl0ZW0nLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QtaXRlbSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1EaXNwbGF5IGEgcGxhY2Vob2xkZXIgd2hpbGUgdGhlIGNvbnRlbnQgaXMgbG9hZGluZy5bL2VuXVxuICogICBbamFdT25zZW4gVUnjgYzoqq3jgb/ovrzjgb7jgozjgovjgb7jgafjgavooajnpLrjgZnjgovjg5fjg6zjg7zjgrnjg5vjg6vjg4Djg7zjgpLooajnj77jgZfjgb7jgZnjgIJbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWxvYWRpbmctcGxhY2Vob2xkZXI9XCJwYWdlLmh0bWxcIj5cbiAqICAgTG9hZGluZy4uLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2UgdG8gbG9hZC5bL2VuXVxuICogICBbamFd6Kqt44G/6L6844KA44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTG9hZGluZ1BsYWNlaG9sZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzLm9uc0xvYWRpbmdQbGFjZWhvbGRlcikge1xuICAgICAgICAgIG9ucy5fcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlcihlbGVtZW50WzBdLCBhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIsIGZ1bmN0aW9uKGNvbnRlbnRFbGVtZW50LCBkb25lKSB7XG4gICAgICAgICAgICBvbnMuY29tcGlsZShjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICBzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSYW5nZScsIFsnJHBhcnNlJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzZXQgPSAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduO1xuXG4gICAgICAgICAgc2V0KHNjb3BlLCBlbGVtZW50WzBdLnZhbHVlKTtcbiAgICAgICAgICBpZiAoYXR0cnMubmdDaGFuZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JpcHBsZScsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtcmlwcGxlJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNjb3BlXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGwgY2hpbGQgZWxlbWVudHMgdXNpbmcgdGhlIFwidmFyXCIgYXR0cmlidXRlIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIHNjb3BlIG9mIHRoaXMgZWxlbWVudC5bL2VuXVxuICogICBbamFdXCJ2YXJcIuWxnuaAp+OCkuS9v+OBo+OBpuOBhOOCi+WFqOOBpuOBruWtkOimgee0oOOBrnZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjga/jgIHjgZPjga7opoHntKDjga5Bbmd1bGFySlPjgrnjgrPjg7zjg5fjgavov73liqDjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtbGlzdD5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLXNjb3BlIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICA8b25zLWNhcm91c2VsIHZhcj1cImNhcm91c2VsXCI+XG4gKiAgICAgICA8b25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5uZXh0KClcIj5cbiAqICAgICAgICAge3sgaXRlbSB9fVxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5wcmV2KClcIj5cbiAqICAgICAgICAgLi4uXG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgIDwvb25zLWNhcm91c2VsPlxuICogICA8L29ucy1saXN0LWl0ZW0+XG4gKiA8L29ucy1saXN0PlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTY29wZScsIFsnJG9uc2VuJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItY29udGVudFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuU3BsaXR0ZXJDb250ZW50RWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItY29udGVudCcsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlckNvbnRlbnQnLCBbJyRjb21waWxlJywgJ1NwbGl0dGVyQ29udGVudCcsICckb25zZW4nLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJDb250ZW50LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlckNvbnRlbnQoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1jb250ZW50Jywgdmlldyk7XG5cbiAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlci1zaWRlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlb3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlb3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0b3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdG9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW1vZGVjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm1vZGVjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm1vZGVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLlNwbGl0dGVyU2lkZUVsZW1lbnQucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLXNwbGl0dGVyLXNpZGUnLCBsYXN0UmVhZHkpO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU3BsaXR0ZXJTaWRlJywgWyckY29tcGlsZScsICdTcGxpdHRlclNpZGUnLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyU2lkZSwgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgdmFyIHZpZXcgPSBuZXcgU3BsaXR0ZXJTaWRlKHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh2aWV3LCAnZGVzdHJveSBwcmVvcGVuIHByZWNsb3NlIHBvc3RvcGVuIHBvc3RjbG9zZSBtb2RlY2hhbmdlJyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdmlldyk7XG5cbiAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLXNpZGUnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0YWIuJGluamVjdCA9IFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3J107XG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gICAgLmRpcmVjdGl2ZSgnb25zVGFiJywgdGFiKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYmJhckl0ZW0nLCB0YWIpOyAvLyBmb3IgQkNcblxuICBmdW5jdGlvbiB0YWIoJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciB2aWV3ID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdGFiYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdGFiIGJhci5bL2VuXVxuICogICBbamFd44GT44Gu44K/44OW44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgaGlkZS10YWJzXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtCb29sZWFufVxuICogQGRlZmF1bHQgZmFsc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dV2hldGhlciB0byBoaWRlIHRoZSB0YWJzLiBWYWxpZCB2YWx1ZXMgYXJlIHRydWUvZmFsc2UuWy9lbl1cbiAqICAgW2phXeOCv+ODluOCkumdnuihqOekuuOBq+OBmeOCi+WgtOWQiOOBq+aMh+WumuOBl+OBvuOBmeOAgnRydWXjgoLjgZfjgY/jga9mYWxzZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1yZWFjdGl2ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicmVhY3RpdmVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlYWN0aXZlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy10YWJiYXInLCBsYXN0UmVhZHkpO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVGFiYmFyJywgWyckb25zZW4nLCAnJGNvbXBpbGUnLCAnJHBhcnNlJywgJ1RhYmJhclZpZXcnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCAkcGFyc2UsIFRhYmJhclZpZXcpIHtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcblxuXG4gICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5oaWRlVGFicywgZnVuY3Rpb24oaGlkZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgaGlkZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGhpZGUgPSBoaWRlID09PSAndHJ1ZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRbMF0uc2V0VGFiYmFyVmlzaWJpbGl0eSghaGlkZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB0YWJiYXJWaWV3ID0gbmV3IFRhYmJhclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRhYmJhclZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModGFiYmFyVmlldywgJ3JlYWN0aXZlIHByZWNoYW5nZSBwb3N0Y2hhbmdlIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10YWJiYXInLCB0YWJiYXJWaWV3KTtcbiAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRhYmJhclZpZXcpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0YWJiYXJWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0YWJiYXJWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10YWJiYXInLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUZW1wbGF0ZScsIFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVybWluYWw6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudFswXS50ZW1wbGF0ZSB8fCBlbGVtZW50Lmh0bWwoKTtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGVsZW1lbnQuYXR0cignaWQnKSwgY29udGVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvb2xiYXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHRvb2xiYXIuWy9lbl1cbiAqICBbamFd44GT44Gu44OE44O844Or44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUb29sYmFyJywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGRpcnR5IGZpeCFcbiAgICAgICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lID09PSAnb25zLXRvb2xiYXInKSB7XG4gICAgICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtdG9vbGJhcid9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b29sYmFyLWJ1dHRvblxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGJ1dHRvbi5bL2VuXVxuICogICBbamFd44GT44Gu44Oc44K/44Oz44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXJCdXR0b24nLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgdG9vbGJhckJ1dHRvbiA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRvb2xiYXJCdXR0b24pO1xuXG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRvb2xiYXJCdXR0b24sIGVsZW1lbnQpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRvb2xiYXJCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b29sYmFyLWJ1dHRvbicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBDb21wb25lbnRDbGVhbmVyID0ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICovXG4gICAgZGVjb21wb3NlTm9kZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gZWxlbWVudC5yZW1vdmUoKS5jaGlsZHJlbigpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlY29tcG9zZU5vZGUoYW5ndWxhci5lbGVtZW50KGNoaWxkcmVuW2ldKSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXR0cmlidXRlc30gYXR0cnNcbiAgICAgKi9cbiAgICBkZXN0cm95QXR0cmlidXRlczogZnVuY3Rpb24oYXR0cnMpIHtcbiAgICAgIGF0dHJzLiQkZWxlbWVudCA9IG51bGw7XG4gICAgICBhdHRycy4kJG9ic2VydmVycyA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICovXG4gICAgZGVzdHJveUVsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICovXG4gICAgZGVzdHJveVNjb3BlOiBmdW5jdGlvbihzY29wZSkge1xuICAgICAgc2NvcGUuJCRsaXN0ZW5lcnMgPSB7fTtcbiAgICAgIHNjb3BlLiQkd2F0Y2hlcnMgPSBudWxsO1xuICAgICAgc2NvcGUgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Njb3BlfSBzY29wZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICovXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbihzY29wZSwgZm4pIHtcbiAgICAgIHZhciBjbGVhciA9IHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXIoKTtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBtb2R1bGUuZmFjdG9yeSgnQ29tcG9uZW50Q2xlYW5lcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBDb21wb25lbnRDbGVhbmVyO1xuICB9KTtcblxuICAvLyBvdmVycmlkZSBidWlsdGluIG5nLShldmVudG5hbWUpIGRpcmVjdGl2ZXNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZ0V2ZW50RGlyZWN0aXZlcyA9IHt9O1xuICAgICdjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2Vtb3ZlIG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBrZXlkb3duIGtleXVwIGtleXByZXNzIHN1Ym1pdCBmb2N1cyBibHVyIGNvcHkgY3V0IHBhc3RlJy5zcGxpdCgnICcpLmZvckVhY2goXG4gICAgICBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmVOYW1lID0gZGlyZWN0aXZlTm9ybWFsaXplKCduZy0nICsgbmFtZSk7XG4gICAgICAgIG5nRXZlbnREaXJlY3RpdmVzW2RpcmVjdGl2ZU5hbWVdID0gWyckcGFyc2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGlsZTogZnVuY3Rpb24oJGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgICAgICAgdmFyIGZuID0gJHBhcnNlKGF0dHJbZGlyZWN0aXZlTmFtZV0pO1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmbihzY29wZSwgeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZWxlbWVudC5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50Lm9mZihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUoc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgc2NvcGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKGF0dHIpO1xuICAgICAgICAgICAgICAgICAgYXR0ciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfV07XG5cbiAgICAgICAgZnVuY3Rpb24gZGlyZWN0aXZlTm9ybWFsaXplKG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbihtYXRjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBtb2R1bGUuY29uZmlnKFsnJHByb3ZpZGUnLCBmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgdmFyIHNoaWZ0ID0gZnVuY3Rpb24oJGRlbGVnYXRlKSB7XG4gICAgICAgICRkZWxlZ2F0ZS5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gJGRlbGVnYXRlO1xuICAgICAgfTtcbiAgICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKGRpcmVjdGl2ZU5hbWUgKyAnRGlyZWN0aXZlJywgWyckZGVsZWdhdGUnLCBzaGlmdF0pO1xuICAgICAgfSk7XG4gICAgfV0pO1xuICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgIG1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0pO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cblsnYWxlcnQnLCAnY29uZmlybScsICdwcm9tcHQnXS5mb3JFYWNoKG5hbWUgPT4ge1xuICBjb25zdCBvcmlnaW5hbE5vdGlmaWNhdGlvbiA9IG9ucy5ub3RpZmljYXRpb25bbmFtZV07XG5cbiAgb25zLm5vdGlmaWNhdGlvbltuYW1lXSA9IChtZXNzYWdlLCBvcHRpb25zID0ge30pID0+IHtcbiAgICB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgPyAob3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZSkgOiAob3B0aW9ucyA9IG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgY29tcGlsZSA9IG9wdGlvbnMuY29tcGlsZTtcbiAgICBsZXQgJGVsZW1lbnQ7XG5cbiAgICBvcHRpb25zLmNvbXBpbGUgPSBlbGVtZW50ID0+IHtcbiAgICAgICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNvbXBpbGUgPyBjb21waWxlKGVsZW1lbnQpIDogZWxlbWVudCk7XG4gICAgICByZXR1cm4gb25zLiRjb21waWxlKCRlbGVtZW50KSgkZWxlbWVudC5pbmplY3RvcigpLmdldCgnJHJvb3RTY29wZScpKTtcbiAgICB9O1xuXG4gICAgb3B0aW9ucy5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgJGVsZW1lbnQuZGF0YSgnX3Njb3BlJykuJGRlc3Ryb3koKTtcbiAgICAgICRlbGVtZW50ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG9yaWdpbmFsTm90aWZpY2F0aW9uKG9wdGlvbnMpO1xuICB9O1xufSk7IiwiLy8gY29uZmlybSB0byB1c2UganFMaXRlXG5pZiAod2luZG93LmpRdWVyeSAmJiBhbmd1bGFyLmVsZW1lbnQgPT09IHdpbmRvdy5qUXVlcnkpIHtcbiAgY29uc29sZS53YXJuKCdPbnNlbiBVSSByZXF1aXJlIGpxTGl0ZS4gTG9hZCBqUXVlcnkgYWZ0ZXIgbG9hZGluZyBBbmd1bGFySlMgdG8gZml4IHRoaXMgZXJyb3IuIGpRdWVyeSBtYXkgYnJlYWsgT25zZW4gVUkgYmVoYXZpb3IuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxufVxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgdmFyIHRlbXBsYXRlcyA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb25zLXRlbXBsYXRlXCJdJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlc1tpXSk7XG4gICAgICB2YXIgaWQgPSB0ZW1wbGF0ZS5hdHRyKCdpZCcpO1xuICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGlkLCB0ZW1wbGF0ZS50ZXh0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG59KSgpO1xuIl19
