/*! angular-onsenui.js for onsenui - v2.2.0 - 2017-03-14 */
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
            el.type === 'number' ? set(scope, Number(el.value)) : set(scope, el.value);
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
            if (el._isTextInput) {
              if (typeof value !== 'undefined' && value !== el.value) {
                el.value = value;
              }
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
        ons._util.warn('\'ons-sliding-menu\' component has been deprecated and will be removed in the next release. Please use \'ons-splitter\' instead.');

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
        ons._util.warn('\'ons-split-view\' component has been deprecated and will be removed in the next release. Please use \'ons-splitter\' instead.');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIiwidGVtcGxhdGVzLmpzIiwib25zZW4uanMiLCJhbGVydERpYWxvZy5qcyIsImFsZXJ0RGlhbG9nQW5pbWF0b3IuanMiLCJhbmltYXRpb25DaG9vc2VyLmpzIiwiY2Fyb3VzZWwuanMiLCJkaWFsb2cuanMiLCJkaWFsb2dBbmltYXRvci5qcyIsImZhYi5qcyIsImdlbmVyaWMuanMiLCJsYXp5UmVwZWF0LmpzIiwibGF6eVJlcGVhdERlbGVnYXRlLmpzIiwibW9kYWwuanMiLCJuYXZpZ2F0b3IuanMiLCJuYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IuanMiLCJvdmVybGF5U2xpZGluZ01lbnVBbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJwdXNoU2xpZGluZ01lbnVBbmltYXRvci5qcyIsInJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzbGlkaW5nTWVudS5qcyIsInNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzcGVlZERpYWwuanMiLCJzcGxpdFZpZXcuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsImJhY2tCdXR0b24uanMiLCJib3R0b21Ub29sYmFyLmpzIiwiYnV0dG9uLmpzIiwiZHVtbXlGb3JJbml0LmpzIiwiZ2VzdHVyZURldGVjdG9yLmpzIiwiaWNvbi5qcyIsImlmT3JpZW50YXRpb24uanMiLCJpZlBsYXRmb3JtLmpzIiwiaW5wdXQuanMiLCJrZXlib2FyZC5qcyIsImxpc3QuanMiLCJsaXN0SGVhZGVyLmpzIiwibGlzdEl0ZW0uanMiLCJsb2FkaW5nUGxhY2Vob2xkZXIuanMiLCJwcm9ncmVzc0Jhci5qcyIsInJhbmdlLmpzIiwicmlwcGxlLmpzIiwic2NvcGUuanMiLCJzZWxlY3QuanMiLCJzcGxpdHRlckNvbnRlbnQuanMiLCJzcGxpdHRlclNpZGUuanMiLCJ0YWIuanMiLCJ0YWJCYXIuanMiLCJ0ZW1wbGF0ZS5qcyIsInRvb2xiYXIuanMiLCJ0b29sYmFyQnV0dG9uLmpzIiwiY29tcG9uZW50Q2xlYW5lci5qcyIsIm5vdGlmaWNhdGlvbi5qcyIsInNldHVwLmpzIiwidGVtcGxhdGVMb2FkZXIuanMiXSwibmFtZXMiOlsiZm5UZXN0IiwidGVzdCIsInh5eiIsIkJhc2VDbGFzcyIsImV4dGVuZCIsInByb3BzIiwiX3N1cGVyIiwicHJvdG90eXBlIiwicHJvdG8iLCJPYmplY3QiLCJjcmVhdGUiLCJuYW1lIiwiZm4iLCJ0bXAiLCJyZXQiLCJhcHBseSIsImFyZ3VtZW50cyIsIm5ld0NsYXNzIiwiaW5pdCIsImhhc093blByb3BlcnR5IiwiU3ViQ2xhc3MiLCJFbXB0eUNsYXNzIiwiY29uc3RydWN0b3IiLCJ3aW5kb3ciLCJDbGFzcyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJlcnIiLCJydW4iLCIkdGVtcGxhdGVDYWNoZSIsInB1dCIsIm9ucyIsImluaXRPbnNlbkZhY2FkZSIsIndhaXRPbnNlblVJTG9hZCIsImluaXRBbmd1bGFyTW9kdWxlIiwiaW5pdFRlbXBsYXRlQ2FjaGUiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwidmFsdWUiLCIkb25zZW4iLCIkcSIsIl9vbnNlblNlcnZpY2UiLCJfcVNlcnZpY2UiLCJjb25zb2xlIiwiYWxlcnQiLCJfaW50ZXJuYWwiLCJnZXRUZW1wbGF0ZUhUTUxBc3luYyIsInBhZ2UiLCJjYWNoZSIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29tcG9uZW50QmFzZSIsImJvb3RzdHJhcCIsImRlcHMiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiY29uY2F0IiwiZG9jIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZFBhcmVudENvbXBvbmVudFVudGlsIiwiZG9tIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwidGFyZ2V0IiwiaW5oZXJpdGVkRGF0YSIsImZpbmRDb21wb25lbnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbXBpbGUiLCJzY29wZSIsIl9nZXRPbnNlblNlcnZpY2UiLCJfd2FpdERpcmV0aXZlSW5pdCIsImVsZW1lbnROYW1lIiwibGFzdFJlYWR5IiwiY2FsbGJhY2siLCJsaXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlQWxlcnREaWFsb2ciLCJvcHRpb25zIiwibGluayIsInBhcmVudFNjb3BlIiwiJG5ldyIsIiRldmFsQXN5bmMiLCJfY3JlYXRlQWxlcnREaWFsb2dPcmlnaW5hbCIsInRoZW4iLCJhbGVydERpYWxvZyIsImNyZWF0ZURpYWxvZyIsIl9jcmVhdGVEaWFsb2dPcmlnaW5hbCIsImRpYWxvZyIsImNyZWF0ZVBvcG92ZXIiLCJfY3JlYXRlUG9wb3Zlck9yaWdpbmFsIiwicG9wb3ZlciIsInJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJfcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlck9yaWdpbmFsIiwiZG9uZSIsInNldEltbWVkaWF0ZSIsIl9zZXR1cExvYWRpbmdQbGFjZUhvbGRlcnMiLCJmYWN0b3J5IiwiQWxlcnREaWFsb2dWaWV3IiwiYXR0cnMiLCJfc2NvcGUiLCJfZWxlbWVudCIsIl9hdHRycyIsIl9jbGVhckRlcml2aW5nTWV0aG9kcyIsImRlcml2ZU1ldGhvZHMiLCJfY2xlYXJEZXJpdmluZ0V2ZW50cyIsImRlcml2ZUV2ZW50cyIsImRldGFpbCIsImJpbmQiLCJfZGVzdHJveSIsImVtaXQiLCJyZW1vdmUiLCJNaWNyb0V2ZW50IiwibWl4aW4iLCJkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQiLCJBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3IiLCJJT1NBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5pbWF0b3JGYWN0b3J5IiwiQ2Fyb3VzZWxWaWV3IiwiY2Fyb3VzZWwiLCJEaWFsb2dWaWV3IiwicmVnaXN0ZXJBbmltYXRvciIsIkFuaW1hdG9yIiwiRGlhbG9nRWxlbWVudCIsIkRpYWxvZ0FuaW1hdG9yIiwiSU9TRGlhbG9nQW5pbWF0b3IiLCJBbmRyb2lkRGlhbG9nQW5pbWF0b3IiLCJTbGlkZURpYWxvZ0FuaW1hdG9yIiwiRmFiVmlldyIsIkdlbmVyaWNWaWV3Iiwic2VsZiIsImRpcmVjdGl2ZU9ubHkiLCJtb2RpZmllclRlbXBsYXRlIiwiYWRkTW9kaWZpZXJNZXRob2RzIiwiYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMiLCJjbGVhbmVyIiwib25EZXN0cm95IiwiX2V2ZW50cyIsInJlbW92ZU1vZGlmaWVyTWV0aG9kcyIsImNsZWFyQ29tcG9uZW50IiwicmVnaXN0ZXIiLCJ2aWV3Iiwidmlld0tleSIsImRlY2xhcmVWYXJBdHRyaWJ1dGUiLCJkZXN0cm95Iiwibm9vcCIsIkFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUiLCJMYXp5UmVwZWF0VmlldyIsImxpbmtlciIsIl9saW5rZXIiLCJ1c2VyRGVsZWdhdGUiLCIkZXZhbCIsIm9uc0xhenlSZXBlYXQiLCJpbnRlcm5hbERlbGVnYXRlIiwiX3Byb3ZpZGVyIiwiTGF6eVJlcGVhdFByb3ZpZGVyIiwicGFyZW50Tm9kZSIsInJlZnJlc2giLCIkd2F0Y2giLCJjb3VudEl0ZW1zIiwiX29uQ2hhbmdlIiwiZGlyZWN0aXZlQXR0cmlidXRlcyIsInRlbXBsYXRlRWxlbWVudCIsIl9wYXJlbnRTY29wZSIsImZvckVhY2giLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyIiwiY2xvbmVOb2RlIiwiaXRlbSIsIl91c2VyRGVsZWdhdGUiLCJjb25maWd1cmVJdGVtU2NvcGUiLCJGdW5jdGlvbiIsImRlc3Ryb3lJdGVtU2NvcGUiLCJjcmVhdGVJdGVtQ29udGVudCIsImluZGV4IiwiX3ByZXBhcmVJdGVtRWxlbWVudCIsIl9hZGRTcGVjaWFsUHJvcGVydGllcyIsIl91c2luZ0JpbmRpbmciLCJjbG9uZWQiLCJpIiwibGFzdCIsIiRpbmRleCIsIiRmaXJzdCIsIiRsYXN0IiwiJG1pZGRsZSIsIiRldmVuIiwiJG9kZCIsIiRkZXN0cm95IiwiTGF6eVJlcGVhdERlbGVnYXRlIiwiTW9kYWxBbmltYXRvciIsIkZhZGVNb2RhbEFuaW1hdG9yIiwiJHBhcnNlIiwiTW9kYWxWaWV3IiwiX2FuaW1hdG9yRmFjdG9yeSIsInNldEFuaW1hdGlvbk9wdGlvbnMiLCJhbmltYXRpb25PcHRpb25zIiwic2hvdyIsImhpZGUiLCJ0b2dnbGUiLCJNb2RhbEVsZW1lbnQiLCJOYXZpZ2F0b3JWaWV3IiwiX3ByZXZpb3VzUGFnZVNjb3BlIiwiX2JvdW5kT25QcmVwb3AiLCJfb25QcmVwb3AiLCJvbiIsIm5hdmlnYXRvciIsImV2ZW50IiwicGFnZXMiLCJsZW5ndGgiLCJvZmYiLCJOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJGYWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiSU9TU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJMaWZ0TmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiU2ltcGxlU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJTbGlkaW5nTWVudUFuaW1hdG9yIiwiT3ZlcmxheVNsaWRpbmdNZW51QW5pbWF0b3IiLCJfYmxhY2tNYXNrIiwiX2lzUmlnaHQiLCJfbWVudVBhZ2UiLCJfbWFpblBhZ2UiLCJfd2lkdGgiLCJzZXR1cCIsIm1haW5QYWdlIiwibWVudVBhZ2UiLCJ3aWR0aCIsImlzUmlnaHQiLCJjc3MiLCJkaXNwbGF5IiwiekluZGV4IiwicmlnaHQiLCJsZWZ0IiwiYmFja2dyb3VuZENvbG9yIiwidG9wIiwiYm90dG9tIiwicG9zaXRpb24iLCJwcmVwZW5kIiwib25SZXNpemVkIiwiaXNPcGVuZWQiLCJtYXgiLCJjbGllbnRXaWR0aCIsIm1lbnVTdHlsZSIsIl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUiLCJhbmltaXQiLCJxdWV1ZSIsInBsYXkiLCJyZW1vdmVBdHRyIiwib3Blbk1lbnUiLCJpbnN0YW50IiwiZHVyYXRpb24iLCJkZWxheSIsIm1haW5QYWdlU3R5bGUiLCJfZ2VuZXJhdGVNYWluUGFnZVN0eWxlIiwic2V0VGltZW91dCIsIndhaXQiLCJ0aW1pbmciLCJjbG9zZU1lbnUiLCJtZW51UGFnZVN0eWxlIiwidHJhbnNsYXRlTWVudSIsIk1hdGgiLCJtaW4iLCJtYXhEaXN0YW5jZSIsImRpc3RhbmNlIiwib3BhY2l0eSIsImtleXMiLCJ4IiwidHJhbnNmb3JtIiwiY29weSIsIlBhZ2VWaWV3IiwiX2NsZWFyTGlzdGVuZXIiLCJkZWZpbmVQcm9wZXJ0eSIsIm9uRGV2aWNlQmFja0J1dHRvbiIsInNldCIsIl91c2VyQmFja0J1dHRvbkhhbmRsZXIiLCJfZW5hYmxlQmFja0J1dHRvbkhhbmRsZXIiLCJuZ0RldmljZUJhY2tCdXR0b24iLCJuZ0luZmluaXRlU2Nyb2xsIiwib25JbmZpbml0ZVNjcm9sbCIsIl9vbkRldmljZUJhY2tCdXR0b24iLCIkZXZlbnQiLCJsYXN0RXZlbnQiLCJQb3BvdmVyVmlldyIsIlBvcG92ZXJBbmltYXRvciIsIkZhZGVQb3BvdmVyQW5pbWF0b3IiLCJQdWxsSG9va1ZpZXciLCJwdWxsSG9vayIsIm9uQWN0aW9uIiwibmdBY3Rpb24iLCIkZG9uZSIsIlB1c2hTbGlkaW5nTWVudUFuaW1hdG9yIiwibWFpblBhZ2VUcmFuc2Zvcm0iLCJfZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0iLCJfZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUiLCJhYm92ZVRyYW5zZm9ybSIsImJlaGluZFN0eWxlIiwiYmVoaW5kWCIsImJlaGluZFRyYW5zZm9ybSIsIlJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IiLCJib3hTaGFkb3ciLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJiZWhpbmREaXN0YW5jZSIsImlzTmFOIiwiU2xpZGluZ01lbnVWaWV3TW9kZWwiLCJfZGlzdGFuY2UiLCJfbWF4RGlzdGFuY2UiLCJpc051bWJlciIsInNldE1heERpc3RhbmNlIiwic2hvdWxkT3BlbiIsInNob3VsZENsb3NlIiwiaXNDbG9zZWQiLCJvcGVuT3JDbG9zZSIsIm9wZW4iLCJjbG9zZSIsImdldFgiLCJnZXRNYXhEaXN0YW5jZSIsInRyYW5zbGF0ZSIsIkFuaW1hdGlvbkNob29zZXIiLCJTbGlkaW5nTWVudVZpZXciLCJfZG9vckxvY2siLCJfaXNSaWdodE1lbnUiLCJfRG9vckxvY2siLCJzaWRlIiwiX21haW5QYWdlR2VzdHVyZURldGVjdG9yIiwiR2VzdHVyZURldGVjdG9yIiwiX2JvdW5kT25UYXAiLCJfb25UYXAiLCJfbm9ybWFsaXplTWF4U2xpZGVEaXN0YW5jZUF0dHIiLCJfbG9naWMiLCJfdHJhbnNsYXRlIiwiX29wZW4iLCJfY2xvc2UiLCIkb2JzZXJ2ZSIsIl9vbk1heFNsaWRlRGlzdGFuY2VDaGFuZ2VkIiwiX29uU3dpcGVhYmxlQ2hhbmdlZCIsIl9ib3VuZE9uV2luZG93UmVzaXplIiwiX29uV2luZG93UmVzaXplIiwiX2JvdW5kSGFuZGxlRXZlbnQiLCJfaGFuZGxlRXZlbnQiLCJfYmluZEV2ZW50cyIsInNldE1haW5QYWdlIiwic2V0TWVudVBhZ2UiLCJfZGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJfZGV2aWNlQmFja0J1dHRvbkRpc3BhdGNoZXIiLCJjcmVhdGVIYW5kbGVyIiwidW5sb2NrIiwiYW5pbWF0aW9uQ2hvb3NlciIsImFuaW1hdG9ycyIsIl9hbmltYXRvckRpY3QiLCJiYXNlQ2xhc3MiLCJiYXNlQ2xhc3NOYW1lIiwiZGVmYXVsdEFuaW1hdGlvbiIsInR5cGUiLCJkZWZhdWx0QW5pbWF0aW9uT3B0aW9ucyIsIl9hbmltYXRvciIsIm5ld0FuaW1hdG9yIiwibWF4U2xpZGVEaXN0YW5jZSIsInN3aXBlYWJsZSIsInNldFN3aXBlYWJsZSIsImdldERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiaXNNZW51T3BlbmVkIiwiY2FsbFBhcmVudEhhbmRsZXIiLCJfcmVmcmVzaE1lbnVQYWdlV2lkdGgiLCJlbmFibGVkIiwiX2FjdGl2YXRlR2VzdHVyZURldGVjdG9yIiwiX2RlYWN0aXZhdGVHZXN0dXJlRGV0ZWN0b3IiLCJfcmVjYWxjdWxhdGVNQVgiLCJpbmRleE9mIiwicGFyc2VJbnQiLCJyZXBsYWNlIiwicGFyc2VGbG9hdCIsIl9nZXN0dXJlRGV0ZWN0b3IiLCJkcmFnTWluRGlzdGFuY2UiLCJfYXBwZW5kTWFpblBhZ2UiLCJwYWdlVXJsIiwidGVtcGxhdGVIVE1MIiwicGFnZVNjb3BlIiwicGFnZUNvbnRlbnQiLCJhcHBlbmQiLCJfY3VycmVudFBhZ2VFbGVtZW50IiwiX2N1cnJlbnRQYWdlU2NvcGUiLCJfY3VycmVudFBhZ2VVcmwiLCJfc2hvdyIsIl9hcHBlbmRNZW51UGFnZSIsIl9jdXJyZW50TWVudVBhZ2VTY29wZSIsIl9jdXJyZW50TWVudVBhZ2VFbGVtZW50IiwiZ2V0UGFnZUhUTUxBc3luYyIsImh0bWwiLCJpc0xvY2tlZCIsIl9pc0luc2lkZUlnbm9yZWRFbGVtZW50IiwiX2lzSW5zaWRlU3dpcGVUYXJnZXRBcmVhIiwiZ2VzdHVyZSIsInByZXZlbnREZWZhdWx0IiwiZGVsdGFYIiwiZGVsdGFEaXN0YW5jZSIsInN0YXJ0RXZlbnQiLCJzdG9wRGV0ZWN0IiwiX2xhc3REaXN0YW5jZSIsImdldEF0dHJpYnV0ZSIsImNlbnRlciIsInBhZ2VYIiwiX3N3aXBlVGFyZ2V0V2lkdGgiLCJfZ2V0U3dpcGVUYXJnZXRXaWR0aCIsInRhcmdldFdpZHRoIiwic3dpcGVUYXJnZXRXaWR0aCIsInNsaWRpbmdNZW51Iiwid2FpdFVubG9jayIsImFuaW1hdGlvbiIsImNoaWxkcmVuIiwidG9nZ2xlTWVudSIsImNsb3NlQ2xvc2UiLCJTcGVlZERpYWxWaWV3IiwiJG9uc0dsb2JhbCIsIlNQTElUX01PREUiLCJDT0xMQVBTRV9NT0RFIiwiTUFJTl9QQUdFX1JBVElPIiwiU3BsaXRWaWV3IiwiYWRkQ2xhc3MiLCJfc2Vjb25kYXJ5UGFnZSIsIl9tYXgiLCJfbW9kZSIsIl9kb1NwbGl0IiwiX2RvQ29sbGFwc2UiLCJvcmllbnRhdGlvbiIsIl9vblJlc2l6ZSIsInNlY29uZGFyeVBhZ2UiLCJzZXRTZWNvbmRhcnlQYWdlIiwiX2NvbnNpZGVyQ2hhbmdpbmdDb2xsYXBzZSIsIl9zZXRTaXplIiwiX2FwcGVuZFNlY29uZFBhZ2UiLCJfY3VycmVudFNlY29uZGFyeVBhZ2VFbGVtZW50IiwiX2N1cnJlbnRTZWNvbmRhcnlQYWdlU2NvcGUiLCJfY3VycmVudFBhZ2UiLCJ0cmltIiwibGFzdE1vZGUiLCJzaG91bGQiLCJfc2hvdWxkQ29sbGFwc2UiLCJfZmlyZVVwZGF0ZUV2ZW50IiwiX2FjdGl2YXRlU3BsaXRNb2RlIiwiX2FjdGl2YXRlQ29sbGFwc2VNb2RlIiwidXBkYXRlIiwiX2dldE9yaWVudGF0aW9uIiwiaXNQb3J0cmFpdCIsImdldEN1cnJlbnRNb2RlIiwiYyIsImNvbGxhcHNlIiwiaXNMYW5kc2NhcGUiLCJzdWJzdHIiLCJudW0iLCJzcGxpdCIsImlubmVyV2lkdGgiLCJtcSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFpblBhZ2VXaWR0aCIsInNlY29uZGFyeVNpemUiLCJfZmlyZUV2ZW50Iiwic3BsaXRWaWV3IiwidGhhdCIsInNob3VsZENvbGxhcHNlIiwiY3VycmVudE1vZGUiLCJuIiwiaXNGaW5pdGUiLCJTcGxpdHRlckNvbnRlbnQiLCJsb2FkIiwiX3BhZ2VTY29wZSIsIlNwbGl0dGVyU2lkZSIsIlNwbGl0dGVyIiwicHJvcCIsInRhZ05hbWUiLCJTd2l0Y2hWaWV3IiwiX2NoZWNrYm94IiwiX3ByZXBhcmVOZ01vZGVsIiwibmdNb2RlbCIsImFzc2lnbiIsIiRwYXJlbnQiLCJjaGVja2VkIiwibmdDaGFuZ2UiLCJUYWJiYXJOb25lQW5pbWF0b3IiLCJUYWJiYXJGYWRlQW5pbWF0b3IiLCJUYWJiYXJTbGlkZUFuaW1hdG9yIiwiVGFiYmFyVmlldyIsIl9sYXN0UGFnZUVsZW1lbnQiLCJfbGFzdFBhZ2VTY29wZSIsIlRhYmJhckVsZW1lbnQiLCJkaXJlY3RpdmUiLCJyZXN0cmljdCIsInRyYW5zY2x1ZGUiLCJwcmUiLCJyZWdpc3RlckV2ZW50SGFuZGxlcnMiLCJwb3N0IiwiZmlyZUNvbXBvbmVudEV2ZW50IiwiQ29tcG9uZW50Q2xlYW5lciIsImNvbnRyb2xsZXIiLCJiYWNrQnV0dG9uIiwiZGVzdHJveVNjb3BlIiwiZGVzdHJveUF0dHJpYnV0ZXMiLCJidXR0b24iLCJkaXNhYmxlZCIsInBhcmVudEVsZW1lbnQiLCJfc2V0dXAiLCJfc2V0dXBJbml0aWFsSW5kZXgiLCJfc2F2ZUxhc3RTdGF0ZSIsImlzUmVhZHkiLCIkYnJvYWRjYXN0IiwiZmFiIiwiRVZFTlRTIiwic2NvcGVEZWYiLCJyZWR1Y2UiLCJkaWN0IiwidGl0bGl6ZSIsInN0ciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJfIiwiaGFuZGxlciIsImdlc3R1cmVEZXRlY3RvciIsImpvaW4iLCJpY29uIiwiX3VwZGF0ZSIsInVzZXJPcmllbnRhdGlvbiIsIm9uc0lmT3JpZW50YXRpb24iLCJnZXRMYW5kc2NhcGVPclBvcnRyYWl0IiwicGxhdGZvcm0iLCJnZXRQbGF0Zm9ybVN0cmluZyIsInVzZXJQbGF0Zm9ybSIsInVzZXJQbGF0Zm9ybXMiLCJvbnNJZlBsYXRmb3JtIiwidXNlckFnZW50IiwibWF0Y2giLCJpc09wZXJhIiwib3BlcmEiLCJpc0ZpcmVmb3giLCJJbnN0YWxsVHJpZ2dlciIsImlzU2FmYXJpIiwidG9TdHJpbmciLCJjYWxsIiwiaXNFZGdlIiwiaXNDaHJvbWUiLCJjaHJvbWUiLCJpc0lFIiwiZG9jdW1lbnRNb2RlIiwiZWwiLCJvbklucHV0IiwiX2lzVGV4dElucHV0IiwiTnVtYmVyIiwiY29tcGlsZUZ1bmN0aW9uIiwiZGlzcFNob3ciLCJkaXNwSGlkZSIsIm9uU2hvdyIsIm9uSGlkZSIsIm9uSW5pdCIsImUiLCJ2aXNpYmxlIiwic29mdHdhcmVLZXlib2FyZCIsIl92aXNpYmxlIiwicHJpb3JpdHkiLCJ0ZXJtaW5hbCIsImxhenlSZXBlYXQiLCJvbnNMb2FkaW5nUGxhY2Vob2xkZXIiLCJfcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlciIsImNvbnRlbnRFbGVtZW50IiwibW9kYWwiLCJOYXZpZ2F0b3JFbGVtZW50IiwicmV3cml0YWJsZXMiLCJyZWFkeSIsInBhZ2VMb2FkZXIiLCJjcmVhdGVQYWdlTG9hZGVyIiwiZmlyZVBhZ2VJbml0RXZlbnQiLCJmIiwiaXNBdHRhY2hlZCIsImZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwicG9zdExpbmsiLCJfdXRpbCIsIndhcm4iLCJtYWluIiwibWVudSIsIm1haW5IdG1sIiwibWVudUh0bWwiLCJzcGVlZERpYWwiLCJzZWNvbmRhcnlIdG1sIiwic3BsaXR0ZXIiLCJTcGxpdHRlckNvbnRlbnRFbGVtZW50IiwiU3BsaXR0ZXJTaWRlRWxlbWVudCIsIm5nQ29udHJvbGxlciIsInN3aXRjaFZpZXciLCJ0YWIiLCIkaW5qZWN0IiwiaGlkZVRhYnMiLCJzZXRUYWJiYXJWaXNpYmlsaXR5IiwidGFiYmFyVmlldyIsImNvbnRlbnQiLCJ0ZW1wbGF0ZSIsInRvb2xiYXJCdXR0b24iLCJkZWNvbXBvc2VOb2RlIiwiJCRlbGVtZW50IiwiJCRvYnNlcnZlcnMiLCJkZXN0cm95RWxlbWVudCIsIiQkbGlzdGVuZXJzIiwiJCR3YXRjaGVycyIsImNsZWFyIiwibmdFdmVudERpcmVjdGl2ZXMiLCJkaXJlY3RpdmVOYW1lIiwiZGlyZWN0aXZlTm9ybWFsaXplIiwiJGVsZW1lbnQiLCJsaXN0ZW5lciIsIiRhcHBseSIsImNvbmZpZyIsIiRwcm92aWRlIiwic2hpZnQiLCIkZGVsZWdhdGUiLCJkZWNvcmF0b3IiLCIkd2luZG93IiwiJGNhY2hlRmFjdG9yeSIsIiRkb2N1bWVudCIsIiRodHRwIiwiY3JlYXRlT25zZW5TZXJ2aWNlIiwiTW9kaWZpZXJVdGlsIiwiRElSRUNUSVZFX1RFTVBMQVRFX1VSTCIsIkRldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsImdldERlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsIm1ldGhvZE5hbWVzIiwibWV0aG9kTmFtZSIsImtsYXNzIiwicHJvcGVydGllcyIsInByb3BlcnR5IiwiZXZlbnROYW1lcyIsIm1hcCIsImxpc3RlbmVycyIsImV2ZW50TmFtZSIsInB1c2giLCJpc0VuYWJsZWRBdXRvU3RhdHVzQmFyRmlsbCIsIl9jb25maWciLCJhdXRvU3RhdHVzQmFyRmlsbCIsInNob3VsZEZpbGxTdGF0dXNCYXIiLCJjb21waWxlQW5kTGluayIsInBhZ2VFbGVtZW50IiwiUGFnZUxvYWRlciIsInBhcmVudCIsInBhcmFtcyIsImVsZW1lbnRzIiwiZmluZEVsZW1lbnRlT2JqZWN0IiwiZGVmZXJyZWQiLCJkZWZlciIsIm5vcm1hbGl6ZVBhZ2VIVE1MIiwicHJvbWlzZSIsInVybCIsIm1ldGhvZCIsInJlc3BvbnNlIiwiZ2VuZXJhdGVNb2RpZmllclRlbXBsYXRlciIsIm1vZGlmaWVycyIsImF0dHJNb2RpZmllcnMiLCJtb2RpZmllciIsIm1ldGhvZHMiLCJoYXNNb2RpZmllciIsIm5lZWRsZSIsInRva2VucyIsInNvbWUiLCJyZW1vdmVNb2RpZmllciIsImZpbHRlciIsInRva2VuIiwiYWRkTW9kaWZpZXIiLCJzZXRNb2RpZmllciIsInRvZ2dsZU1vZGlmaWVyIiwiX3RyIiwiZm5zIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsYXNzZXMiLCJwYXR0IiwiY2xzIiwib2xkRm4iLCJuZXdGbiIsIm9iamVjdCIsInZhciIsInZhck5hbWUiLCJfZGVmaW5lVmFyIiwiX3JlZ2lzdGVyRXZlbnRIYW5kbGVyIiwiY29tcG9uZW50IiwiY2FwaXRhbGl6ZWRFdmVudE5hbWUiLCJsIiwiaXNBbmRyb2lkIiwiaXNJT1MiLCJpc1dlYlZpZXciLCJpc0lPUzdhYm92ZSIsInVhIiwicmVzdWx0Iiwia2V5IiwibmFtZXMiLCJjb250YWluZXIiLCJoYXNBdHRyaWJ1dGUiLCJvcmlnaW5hbE5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbiIsIm1lc3NhZ2UiLCJpbmplY3RvciIsImpRdWVyeSIsInRlbXBsYXRlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpZCIsInRleHQiXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OztBQUtBLENBQUMsWUFBVztBQUNWOztBQUNBLE1BQUlBLFNBQVMsTUFBTUMsSUFBTixDQUFXLFlBQVU7QUFBQ0M7QUFBSyxHQUEzQixJQUErQixZQUEvQixHQUE4QyxJQUEzRDs7QUFFQTtBQUNBLFdBQVNDLFNBQVQsR0FBb0IsQ0FBRTs7QUFFdEI7QUFDQUEsWUFBVUMsTUFBVixHQUFtQixVQUFTQyxLQUFULEVBQWdCO0FBQ2pDLFFBQUlDLFNBQVMsS0FBS0MsU0FBbEI7O0FBRUE7QUFDQTtBQUNBLFFBQUlDLFFBQVFDLE9BQU9DLE1BQVAsQ0FBY0osTUFBZCxDQUFaOztBQUVBO0FBQ0EsU0FBSyxJQUFJSyxJQUFULElBQWlCTixLQUFqQixFQUF3QjtBQUN0QjtBQUNBRyxZQUFNRyxJQUFOLElBQWMsT0FBT04sTUFBTU0sSUFBTixDQUFQLEtBQXVCLFVBQXZCLElBQ1osT0FBT0wsT0FBT0ssSUFBUCxDQUFQLElBQXVCLFVBRFgsSUFDeUJYLE9BQU9DLElBQVAsQ0FBWUksTUFBTU0sSUFBTixDQUFaLENBRHpCLEdBRVQsVUFBU0EsSUFBVCxFQUFlQyxFQUFmLEVBQWtCO0FBQ2pCLGVBQU8sWUFBVztBQUNoQixjQUFJQyxNQUFNLEtBQUtQLE1BQWY7O0FBRUE7QUFDQTtBQUNBLGVBQUtBLE1BQUwsR0FBY0EsT0FBT0ssSUFBUCxDQUFkOztBQUVBO0FBQ0E7QUFDQSxjQUFJRyxNQUFNRixHQUFHRyxLQUFILENBQVMsSUFBVCxFQUFlQyxTQUFmLENBQVY7QUFDQSxlQUFLVixNQUFMLEdBQWNPLEdBQWQ7O0FBRUEsaUJBQU9DLEdBQVA7QUFDRCxTQWJEO0FBY0QsT0FmRCxDQWVHSCxJQWZILEVBZVNOLE1BQU1NLElBQU4sQ0FmVCxDQUZVLEdBa0JWTixNQUFNTSxJQUFOLENBbEJKO0FBbUJEOztBQUVEO0FBQ0EsUUFBSU0sV0FBVyxPQUFPVCxNQUFNVSxJQUFiLEtBQXNCLFVBQXRCLEdBQ1hWLE1BQU1XLGNBQU4sQ0FBcUIsTUFBckIsSUFDRVgsTUFBTVUsSUFEUixDQUNhO0FBRGIsTUFFRSxTQUFTRSxRQUFULEdBQW1CO0FBQUVkLGFBQU9ZLElBQVAsQ0FBWUgsS0FBWixDQUFrQixJQUFsQixFQUF3QkMsU0FBeEI7QUFBcUMsS0FIakQsR0FJWCxTQUFTSyxVQUFULEdBQXFCLENBQUUsQ0FKM0I7O0FBTUE7QUFDQUosYUFBU1YsU0FBVCxHQUFxQkMsS0FBckI7O0FBRUE7QUFDQUEsVUFBTWMsV0FBTixHQUFvQkwsUUFBcEI7O0FBRUE7QUFDQUEsYUFBU2IsTUFBVCxHQUFrQkQsVUFBVUMsTUFBNUI7O0FBRUEsV0FBT2EsUUFBUDtBQUNELEdBaEREOztBQWtEQTtBQUNBTSxTQUFPQyxLQUFQLEdBQWVyQixTQUFmO0FBQ0QsQ0E1REQ7OztBQ0xBO0FBQ0EsQ0FBQyxVQUFTc0IsR0FBVCxFQUFjO0FBQ2YsUUFBSTtBQUFFQSxjQUFNQyxRQUFRQyxNQUFSLENBQWUsZ0JBQWYsQ0FBTjtBQUF5QyxLQUEvQyxDQUNBLE9BQU1DLEdBQU4sRUFBVztBQUFFSCxjQUFNQyxRQUFRQyxNQUFSLENBQWUsZ0JBQWYsRUFBaUMsRUFBakMsQ0FBTjtBQUE2QztBQUMxREYsUUFBSUksR0FBSixDQUFRLENBQUMsZ0JBQUQsRUFBbUIsVUFBU0MsY0FBVCxFQUF5QjtBQUNwRDs7QUFFQUEsdUJBQWVDLEdBQWYsQ0FBbUIsNEJBQW5CLEVBQWdELHFEQUM1QyxrREFENEMsR0FFNUMsRUFGSjs7QUFJQUQsdUJBQWVDLEdBQWYsQ0FBbUIsMEJBQW5CLEVBQThDLG9FQUMxQyw0REFEMEMsR0FFMUMsRUFGSjtBQUdDLEtBVk8sQ0FBUjtBQVdDLENBZEQ7OztBQ0RBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTs7Ozs7OztBQU9BLENBQUMsVUFBU0MsR0FBVCxFQUFhO0FBQ1o7O0FBRUEsTUFBSUwsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IsQ0FBQyxnQkFBRCxDQUF4QixDQUFiO0FBQ0FELFVBQVFDLE1BQVIsQ0FBZSxrQkFBZixFQUFtQyxDQUFDLE9BQUQsQ0FBbkMsRUFKWSxDQUltQzs7QUFFL0M7QUFDQU07QUFDQUM7QUFDQUM7QUFDQUM7O0FBRUEsV0FBU0YsZUFBVCxHQUEyQjtBQUN6QixRQUFJRyxnQkFBZ0JMLElBQUlNLFVBQUosQ0FBZUMsSUFBZixFQUFwQjtBQUNBWixXQUFPRSxHQUFQLENBQVcsQ0FBQyxVQUFELEVBQWEsWUFBYixFQUEyQixVQUFTVyxRQUFULEVBQW1CQyxVQUFuQixFQUErQjtBQUNuRTtBQUNBLFVBQUlDLFNBQVNDLFVBQVQsS0FBd0IsU0FBeEIsSUFBcUNELFNBQVNDLFVBQVQsSUFBdUIsZUFBaEUsRUFBaUY7QUFDL0VwQixlQUFPcUIsZ0JBQVAsQ0FBd0Isa0JBQXhCLEVBQTRDLFlBQVc7QUFDckRGLG1CQUFTRyxJQUFULENBQWNDLFdBQWQsQ0FBMEJKLFNBQVNLLGFBQVQsQ0FBdUIsb0JBQXZCLENBQTFCO0FBQ0QsU0FGRDtBQUdELE9BSkQsTUFJTyxJQUFJTCxTQUFTRyxJQUFiLEVBQW1CO0FBQ3hCSCxpQkFBU0csSUFBVCxDQUFjQyxXQUFkLENBQTBCSixTQUFTSyxhQUFULENBQXVCLG9CQUF2QixDQUExQjtBQUNELE9BRk0sTUFFQTtBQUNMLGNBQU0sSUFBSUMsS0FBSixDQUFVLCtCQUFWLENBQU47QUFDRDs7QUFFRFAsaUJBQVdRLEdBQVgsQ0FBZSxZQUFmLEVBQTZCWixhQUE3QjtBQUNELEtBYlUsQ0FBWDtBQWNEOztBQUVELFdBQVNGLGlCQUFULEdBQTZCO0FBQzNCUixXQUFPdUIsS0FBUCxDQUFhLFlBQWIsRUFBMkJsQixHQUEzQjtBQUNBTCxXQUFPRSxHQUFQLENBQVcsQ0FBQyxVQUFELEVBQWEsWUFBYixFQUEyQixRQUEzQixFQUFxQyxJQUFyQyxFQUEyQyxVQUFTVyxRQUFULEVBQW1CQyxVQUFuQixFQUErQlUsTUFBL0IsRUFBdUNDLEVBQXZDLEVBQTJDO0FBQy9GcEIsVUFBSXFCLGFBQUosR0FBb0JGLE1BQXBCO0FBQ0FuQixVQUFJc0IsU0FBSixHQUFnQkYsRUFBaEI7O0FBRUFYLGlCQUFXVCxHQUFYLEdBQWlCVCxPQUFPUyxHQUF4QjtBQUNBUyxpQkFBV2MsT0FBWCxHQUFxQmhDLE9BQU9nQyxPQUE1QjtBQUNBZCxpQkFBV2UsS0FBWCxHQUFtQmpDLE9BQU9pQyxLQUExQjs7QUFFQXhCLFVBQUlRLFFBQUosR0FBZUEsUUFBZjtBQUNELEtBVFUsQ0FBWDtBQVVEOztBQUVELFdBQVNKLGlCQUFULEdBQTZCO0FBQzNCVCxXQUFPRSxHQUFQLENBQVcsQ0FBQyxnQkFBRCxFQUFtQixVQUFTQyxjQUFULEVBQXlCO0FBQ3JELFVBQU1qQixNQUFNbUIsSUFBSXlCLFNBQUosQ0FBY0Msb0JBQTFCOztBQUVBMUIsVUFBSXlCLFNBQUosQ0FBY0Msb0JBQWQsR0FBcUMsVUFBQ0MsSUFBRCxFQUFVO0FBQzdDLFlBQU1DLFFBQVE5QixlQUFlK0IsR0FBZixDQUFtQkYsSUFBbkIsQ0FBZDs7QUFFQSxZQUFJQyxLQUFKLEVBQVc7QUFDVCxpQkFBT0UsUUFBUUMsT0FBUixDQUFnQkgsS0FBaEIsQ0FBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPL0MsSUFBSThDLElBQUosQ0FBUDtBQUNEO0FBQ0YsT0FSRDtBQVNELEtBWlUsQ0FBWDtBQWFEOztBQUVELFdBQVMxQixlQUFULEdBQTJCO0FBQ3pCRCxRQUFJcUIsYUFBSixHQUFvQixJQUFwQjs7QUFFQTtBQUNBO0FBQ0FyQixRQUFJZ0MsYUFBSixHQUFvQnpDLE1BQXBCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBUyxRQUFJaUMsU0FBSixHQUFnQixVQUFTdEQsSUFBVCxFQUFldUQsSUFBZixFQUFxQjtBQUNuQyxVQUFJeEMsUUFBUXlDLE9BQVIsQ0FBZ0J4RCxJQUFoQixDQUFKLEVBQTJCO0FBQ3pCdUQsZUFBT3ZELElBQVA7QUFDQUEsZUFBT3lELFNBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUN6RCxJQUFMLEVBQVc7QUFDVEEsZUFBTyxZQUFQO0FBQ0Q7O0FBRUR1RCxhQUFPLENBQUMsT0FBRCxFQUFVRyxNQUFWLENBQWlCM0MsUUFBUXlDLE9BQVIsQ0FBZ0JELElBQWhCLElBQXdCQSxJQUF4QixHQUErQixFQUFoRCxDQUFQO0FBQ0EsVUFBSXZDLFNBQVNELFFBQVFDLE1BQVIsQ0FBZWhCLElBQWYsRUFBcUJ1RCxJQUFyQixDQUFiOztBQUVBLFVBQUlJLE1BQU0vQyxPQUFPbUIsUUFBakI7QUFDQSxVQUFJNEIsSUFBSTNCLFVBQUosSUFBa0IsU0FBbEIsSUFBK0IyQixJQUFJM0IsVUFBSixJQUFrQixlQUFqRCxJQUFvRTJCLElBQUkzQixVQUFKLElBQWtCLGFBQTFGLEVBQXlHO0FBQ3ZHMkIsWUFBSTFCLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxZQUFXO0FBQ2xEbEIsa0JBQVF1QyxTQUFSLENBQWtCSyxJQUFJQyxlQUF0QixFQUF1QyxDQUFDNUQsSUFBRCxDQUF2QztBQUNELFNBRkQsRUFFRyxLQUZIO0FBR0QsT0FKRCxNQUlPLElBQUkyRCxJQUFJQyxlQUFSLEVBQXlCO0FBQzlCN0MsZ0JBQVF1QyxTQUFSLENBQWtCSyxJQUFJQyxlQUF0QixFQUF1QyxDQUFDNUQsSUFBRCxDQUF2QztBQUNELE9BRk0sTUFFQTtBQUNMLGNBQU0sSUFBSXFDLEtBQUosQ0FBVSxlQUFWLENBQU47QUFDRDs7QUFFRCxhQUFPckIsTUFBUDtBQUNELEtBekJEOztBQTJCQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQUssUUFBSXdDLHdCQUFKLEdBQStCLFVBQVM3RCxJQUFULEVBQWU4RCxHQUFmLEVBQW9CO0FBQ2pELFVBQUlDLE9BQUo7QUFDQSxVQUFJRCxlQUFlRSxXQUFuQixFQUFnQztBQUM5QkQsa0JBQVVoRCxRQUFRZ0QsT0FBUixDQUFnQkQsR0FBaEIsQ0FBVjtBQUNELE9BRkQsTUFFTyxJQUFJQSxlQUFlL0MsUUFBUWdELE9BQTNCLEVBQW9DO0FBQ3pDQSxrQkFBVUQsR0FBVjtBQUNELE9BRk0sTUFFQSxJQUFJQSxJQUFJRyxNQUFSLEVBQWdCO0FBQ3JCRixrQkFBVWhELFFBQVFnRCxPQUFSLENBQWdCRCxJQUFJRyxNQUFwQixDQUFWO0FBQ0Q7O0FBRUQsYUFBT0YsUUFBUUcsYUFBUixDQUFzQmxFLElBQXRCLENBQVA7QUFDRCxLQVhEOztBQWFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBcUIsUUFBSThDLGFBQUosR0FBb0IsVUFBU0MsUUFBVCxFQUFtQk4sR0FBbkIsRUFBd0I7QUFDMUMsVUFBSUcsU0FBUyxDQUFDSCxNQUFNQSxHQUFOLEdBQVkvQixRQUFiLEVBQXVCc0MsYUFBdkIsQ0FBcUNELFFBQXJDLENBQWI7QUFDQSxhQUFPSCxTQUFTbEQsUUFBUWdELE9BQVIsQ0FBZ0JFLE1BQWhCLEVBQXdCSyxJQUF4QixDQUE2QkwsT0FBT00sUUFBUCxDQUFnQkMsV0FBaEIsRUFBN0IsS0FBK0QsSUFBeEUsR0FBK0UsSUFBdEY7QUFDRCxLQUhEOztBQUtBOzs7Ozs7Ozs7O0FBVUFuRCxRQUFJb0QsT0FBSixHQUFjLFVBQVNYLEdBQVQsRUFBYztBQUMxQixVQUFJLENBQUN6QyxJQUFJUSxRQUFULEVBQW1CO0FBQ2pCLGNBQU0sSUFBSVEsS0FBSixDQUFVLHdFQUFWLENBQU47QUFDRDs7QUFFRCxVQUFJLEVBQUV5QixlQUFlRSxXQUFqQixDQUFKLEVBQW1DO0FBQ2pDLGNBQU0sSUFBSTNCLEtBQUosQ0FBVSxvREFBVixDQUFOO0FBQ0Q7O0FBRUQsVUFBSXFDLFFBQVEzRCxRQUFRZ0QsT0FBUixDQUFnQkQsR0FBaEIsRUFBcUJZLEtBQXJCLEVBQVo7QUFDQSxVQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWLGNBQU0sSUFBSXJDLEtBQUosQ0FBVSxpRkFBVixDQUFOO0FBQ0Q7O0FBRURoQixVQUFJUSxRQUFKLENBQWFpQyxHQUFiLEVBQWtCWSxLQUFsQjtBQUNELEtBZkQ7O0FBaUJBckQsUUFBSXNELGdCQUFKLEdBQXVCLFlBQVc7QUFDaEMsVUFBSSxDQUFDLEtBQUtqQyxhQUFWLEVBQXlCO0FBQ3ZCLGNBQU0sSUFBSUwsS0FBSixDQUFVLDZDQUFWLENBQU47QUFDRDs7QUFFRCxhQUFPLEtBQUtLLGFBQVo7QUFDRCxLQU5EOztBQVFBOzs7OztBQUtBckIsUUFBSXVELGlCQUFKLEdBQXdCLFVBQVNDLFdBQVQsRUFBc0JDLFNBQXRCLEVBQWlDO0FBQ3ZELGFBQU8sVUFBU2YsT0FBVCxFQUFrQmdCLFFBQWxCLEVBQTRCO0FBQ2pDLFlBQUloRSxRQUFRZ0QsT0FBUixDQUFnQkEsT0FBaEIsRUFBeUJPLElBQXpCLENBQThCTyxXQUE5QixDQUFKLEVBQWdEO0FBQzlDQyxvQkFBVWYsT0FBVixFQUFtQmdCLFFBQW5CO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBSUMsU0FBUyxTQUFUQSxNQUFTLEdBQVc7QUFDdEJGLHNCQUFVZixPQUFWLEVBQW1CZ0IsUUFBbkI7QUFDQWhCLG9CQUFRa0IsbUJBQVIsQ0FBNEJKLGNBQWMsT0FBMUMsRUFBbURHLE1BQW5ELEVBQTJELEtBQTNEO0FBQ0QsV0FIRDtBQUlBakIsa0JBQVE5QixnQkFBUixDQUF5QjRDLGNBQWMsT0FBdkMsRUFBZ0RHLE1BQWhELEVBQXdELEtBQXhEO0FBQ0Q7QUFDRixPQVZEO0FBV0QsS0FaRDs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTNELFFBQUk2RCxpQkFBSixHQUF3QixVQUFTbEMsSUFBVCxFQUFlbUMsT0FBZixFQUF3QjtBQUM5Q0EsZ0JBQVVBLFdBQVcsRUFBckI7O0FBRUFBLGNBQVFDLElBQVIsR0FBZSxVQUFTckIsT0FBVCxFQUFrQjtBQUMvQixZQUFJb0IsUUFBUUUsV0FBWixFQUF5QjtBQUN2QmhFLGNBQUlRLFFBQUosQ0FBYWQsUUFBUWdELE9BQVIsQ0FBZ0JBLE9BQWhCLENBQWIsRUFBdUNvQixRQUFRRSxXQUFSLENBQW9CQyxJQUFwQixFQUF2QztBQUNBSCxrQkFBUUUsV0FBUixDQUFvQkUsVUFBcEI7QUFDRCxTQUhELE1BR087QUFDTGxFLGNBQUlvRCxPQUFKLENBQVlWLE9BQVo7QUFDRDtBQUNGLE9BUEQ7O0FBU0EsYUFBTzFDLElBQUltRSwwQkFBSixDQUErQnhDLElBQS9CLEVBQXFDbUMsT0FBckMsRUFBOENNLElBQTlDLENBQW1ELFVBQVNDLFdBQVQsRUFBc0I7QUFDOUUsZUFBTzNFLFFBQVFnRCxPQUFSLENBQWdCMkIsV0FBaEIsRUFBNkJwQixJQUE3QixDQUFrQyxrQkFBbEMsQ0FBUDtBQUNELE9BRk0sQ0FBUDtBQUdELEtBZkQ7O0FBaUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBakQsUUFBSXNFLFlBQUosR0FBbUIsVUFBUzNDLElBQVQsRUFBZW1DLE9BQWYsRUFBd0I7QUFDekNBLGdCQUFVQSxXQUFXLEVBQXJCOztBQUVBQSxjQUFRQyxJQUFSLEdBQWUsVUFBU3JCLE9BQVQsRUFBa0I7QUFDL0IsWUFBSW9CLFFBQVFFLFdBQVosRUFBeUI7QUFDdkJoRSxjQUFJUSxRQUFKLENBQWFkLFFBQVFnRCxPQUFSLENBQWdCQSxPQUFoQixDQUFiLEVBQXVDb0IsUUFBUUUsV0FBUixDQUFvQkMsSUFBcEIsRUFBdkM7QUFDQUgsa0JBQVFFLFdBQVIsQ0FBb0JFLFVBQXBCO0FBQ0QsU0FIRCxNQUdPO0FBQ0xsRSxjQUFJb0QsT0FBSixDQUFZVixPQUFaO0FBQ0Q7QUFDRixPQVBEOztBQVNBLGFBQU8xQyxJQUFJdUUscUJBQUosQ0FBMEI1QyxJQUExQixFQUFnQ21DLE9BQWhDLEVBQXlDTSxJQUF6QyxDQUE4QyxVQUFTSSxNQUFULEVBQWlCO0FBQ3BFLGVBQU85RSxRQUFRZ0QsT0FBUixDQUFnQjhCLE1BQWhCLEVBQXdCdkIsSUFBeEIsQ0FBNkIsWUFBN0IsQ0FBUDtBQUNELE9BRk0sQ0FBUDtBQUdELEtBZkQ7O0FBaUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBakQsUUFBSXlFLGFBQUosR0FBb0IsVUFBUzlDLElBQVQsRUFBZW1DLE9BQWYsRUFBd0I7QUFDMUNBLGdCQUFVQSxXQUFXLEVBQXJCOztBQUVBQSxjQUFRQyxJQUFSLEdBQWUsVUFBU3JCLE9BQVQsRUFBa0I7QUFDL0IsWUFBSW9CLFFBQVFFLFdBQVosRUFBeUI7QUFDdkJoRSxjQUFJUSxRQUFKLENBQWFkLFFBQVFnRCxPQUFSLENBQWdCQSxPQUFoQixDQUFiLEVBQXVDb0IsUUFBUUUsV0FBUixDQUFvQkMsSUFBcEIsRUFBdkM7QUFDQUgsa0JBQVFFLFdBQVIsQ0FBb0JFLFVBQXBCO0FBQ0QsU0FIRCxNQUdPO0FBQ0xsRSxjQUFJb0QsT0FBSixDQUFZVixPQUFaO0FBQ0Q7QUFDRixPQVBEOztBQVNBLGFBQU8xQyxJQUFJMEUsc0JBQUosQ0FBMkIvQyxJQUEzQixFQUFpQ21DLE9BQWpDLEVBQTBDTSxJQUExQyxDQUErQyxVQUFTTyxPQUFULEVBQWtCO0FBQ3RFLGVBQU9qRixRQUFRZ0QsT0FBUixDQUFnQmlDLE9BQWhCLEVBQXlCMUIsSUFBekIsQ0FBOEIsYUFBOUIsQ0FBUDtBQUNELE9BRk0sQ0FBUDtBQUdELEtBZkQ7O0FBaUJBOzs7QUFHQWpELFFBQUk0RSx5QkFBSixHQUFnQyxVQUFTakQsSUFBVCxFQUFlO0FBQzdDLGFBQU8zQixJQUFJNkUsa0NBQUosQ0FBdUNsRCxJQUF2QyxFQUE2QyxVQUFTZSxPQUFULEVBQWtCb0MsSUFBbEIsRUFBd0I7QUFDMUU5RSxZQUFJb0QsT0FBSixDQUFZVixPQUFaO0FBQ0FoRCxnQkFBUWdELE9BQVIsQ0FBZ0JBLE9BQWhCLEVBQXlCVyxLQUF6QixHQUFpQ2EsVUFBakMsQ0FBNEMsWUFBVztBQUNyRGEsdUJBQWFELElBQWI7QUFDRCxTQUZEO0FBR0QsT0FMTSxDQUFQO0FBTUQsS0FQRDs7QUFTQTlFLFFBQUlnRix5QkFBSixHQUFnQyxZQUFXO0FBQ3pDO0FBQ0QsS0FGRDtBQUdEO0FBRUYsQ0FuVkQsRUFtVkd6RixPQUFPUyxHQUFQLEdBQWFULE9BQU9TLEdBQVAsSUFBYyxFQW5WOUI7OztBQ3hCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSUwsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBT3NGLE9BQVAsQ0FBZSxpQkFBZixFQUFrQyxDQUFDLFFBQUQsRUFBVyxVQUFTOUQsTUFBVCxFQUFpQjs7QUFFNUQsUUFBSStELGtCQUFrQjFGLE1BQU1wQixNQUFOLENBQWE7O0FBRWpDOzs7OztBQUtBYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLZ0MsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzRDLE1BQUwsR0FBY0gsS0FBZDs7QUFFQSxhQUFLSSxxQkFBTCxHQUE2QnBFLE9BQU9xRSxhQUFQLENBQXFCLElBQXJCLEVBQTJCLEtBQUtILFFBQUwsQ0FBYyxDQUFkLENBQTNCLEVBQTZDLENBQ3hFLE1BRHdFLEVBQ2hFLE1BRGdFLENBQTdDLENBQTdCOztBQUlBLGFBQUtJLG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEIsS0FBS0wsUUFBTCxDQUFjLENBQWQsQ0FBMUIsRUFBNEMsQ0FDdEUsU0FEc0UsRUFFdEUsVUFGc0UsRUFHdEUsU0FIc0UsRUFJdEUsVUFKc0UsRUFLdEUsUUFMc0UsQ0FBNUMsRUFNekIsVUFBU00sTUFBVCxFQUFpQjtBQUNsQixjQUFJQSxPQUFPdEIsV0FBWCxFQUF3QjtBQUN0QnNCLG1CQUFPdEIsV0FBUCxHQUFxQixJQUFyQjtBQUNEO0FBQ0QsaUJBQU9zQixNQUFQO0FBQ0QsU0FMRSxDQUtEQyxJQUxDLENBS0ksSUFMSixDQU55QixDQUE1Qjs7QUFhQSxhQUFLUixNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7QUFDRCxPQTlCZ0M7O0FBZ0NqQ0MsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7O0FBRUEsYUFBS1QsUUFBTCxDQUFjVSxNQUFkOztBQUVBLGFBQUtSLHFCQUFMO0FBQ0EsYUFBS0Usb0JBQUw7O0FBRUEsYUFBS0wsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxLQUFLRCxRQUFMLEdBQWdCLElBQTVDO0FBQ0Q7O0FBekNnQyxLQUFiLENBQXRCOztBQTZDQVcsZUFBV0MsS0FBWCxDQUFpQmYsZUFBakI7QUFDQS9ELFdBQU8rRSwyQkFBUCxDQUFtQ2hCLGVBQW5DLEVBQW9ELENBQUMsVUFBRCxFQUFhLFlBQWIsRUFBMkIsU0FBM0IsRUFBc0Msb0JBQXRDLENBQXBEOztBQUVBLFdBQU9BLGVBQVA7QUFDRCxHQW5EaUMsQ0FBbEM7QUFvREQsQ0F6REQ7OztBQ2hCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkF4RixRQUFRQyxNQUFSLENBQWUsT0FBZixFQUNHdUIsS0FESCxDQUNTLHFCQURULEVBQ2dDbEIsSUFBSXlCLFNBQUosQ0FBYzBFLG1CQUQ5QyxFQUVHakYsS0FGSCxDQUVTLDRCQUZULEVBRXVDbEIsSUFBSXlCLFNBQUosQ0FBYzJFLDBCQUZyRCxFQUdHbEYsS0FISCxDQUdTLHdCQUhULEVBR21DbEIsSUFBSXlCLFNBQUosQ0FBYzRFLHNCQUhqRDs7O0FDbEJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTNHLFFBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCdUIsS0FBeEIsQ0FBOEIsa0JBQTlCLEVBQWtEbEIsSUFBSXlCLFNBQUosQ0FBYzZFLGVBQWhFOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUkzRyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLGNBQWYsRUFBK0IsQ0FBQyxRQUFELEVBQVcsVUFBUzlELE1BQVQsRUFBaUI7O0FBRXpEOzs7QUFHQSxRQUFJb0YsZUFBZS9HLE1BQU1wQixNQUFOLENBQWE7O0FBRTlCOzs7OztBQUtBYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtFLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUswQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2lDLE1BQUwsR0FBY0gsS0FBZDs7QUFFQSxhQUFLQyxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7O0FBRUEsYUFBS0wscUJBQUwsR0FBNkJwRSxPQUFPcUUsYUFBUCxDQUFxQixJQUFyQixFQUEyQjlDLFFBQVEsQ0FBUixDQUEzQixFQUF1QyxDQUNsRSxnQkFEa0UsRUFDaEQsZ0JBRGdELEVBQzlCLE1BRDhCLEVBQ3RCLE1BRHNCLEVBQ2QsU0FEYyxFQUNILE9BREcsRUFDTSxNQUROLENBQXZDLENBQTdCOztBQUlBLGFBQUsrQyxvQkFBTCxHQUE0QnRFLE9BQU91RSxZQUFQLENBQW9CLElBQXBCLEVBQTBCaEQsUUFBUSxDQUFSLENBQTFCLEVBQXNDLENBQUMsU0FBRCxFQUFZLFlBQVosRUFBMEIsWUFBMUIsQ0FBdEMsRUFBK0UsVUFBU2lELE1BQVQsRUFBaUI7QUFDMUgsY0FBSUEsT0FBT2EsUUFBWCxFQUFxQjtBQUNuQmIsbUJBQU9hLFFBQVAsR0FBa0IsSUFBbEI7QUFDRDtBQUNELGlCQUFPYixNQUFQO0FBQ0QsU0FMMEcsQ0FLekdDLElBTHlHLENBS3BHLElBTG9HLENBQS9FLENBQTVCO0FBTUQsT0F4QjZCOztBQTBCOUJDLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWOztBQUVBLGFBQUtMLG9CQUFMO0FBQ0EsYUFBS0YscUJBQUw7O0FBRUEsYUFBS0YsUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLElBQTVDO0FBQ0Q7QUFqQzZCLEtBQWIsQ0FBbkI7O0FBb0NBVSxlQUFXQyxLQUFYLENBQWlCTSxZQUFqQjs7QUFFQXBGLFdBQU8rRSwyQkFBUCxDQUFtQ0ssWUFBbkMsRUFBaUQsQ0FDL0MsVUFEK0MsRUFDbkMsZ0JBRG1DLEVBQ2pCLFVBRGlCLEVBQ0wsWUFESyxFQUNTLFdBRFQsRUFDc0IsaUJBRHRCLEVBQ3lDLFdBRHpDLENBQWpEOztBQUlBLFdBQU9BLFlBQVA7QUFDRCxHQWhEOEIsQ0FBL0I7QUFpREQsQ0F0REQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSTVHLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsWUFBZixFQUE2QixDQUFDLFFBQUQsRUFBVyxVQUFTOUQsTUFBVCxFQUFpQjs7QUFFdkQsUUFBSXNGLGFBQWFqSCxNQUFNcEIsTUFBTixDQUFhOztBQUU1QmMsWUFBTSxjQUFTbUUsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQyxhQUFLQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2dDLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUs0QyxNQUFMLEdBQWNILEtBQWQ7O0FBRUEsYUFBS0kscUJBQUwsR0FBNkJwRSxPQUFPcUUsYUFBUCxDQUFxQixJQUFyQixFQUEyQixLQUFLSCxRQUFMLENBQWMsQ0FBZCxDQUEzQixFQUE2QyxDQUN4RSxNQUR3RSxFQUNoRSxNQURnRSxDQUE3QyxDQUE3Qjs7QUFJQSxhQUFLSSxvQkFBTCxHQUE0QnRFLE9BQU91RSxZQUFQLENBQW9CLElBQXBCLEVBQTBCLEtBQUtMLFFBQUwsQ0FBYyxDQUFkLENBQTFCLEVBQTRDLENBQ3RFLFNBRHNFLEVBRXRFLFVBRnNFLEVBR3RFLFNBSHNFLEVBSXRFLFVBSnNFLEVBS3RFLFFBTHNFLENBQTVDLEVBTXpCLFVBQVNNLE1BQVQsRUFBaUI7QUFDbEIsY0FBSUEsT0FBT25CLE1BQVgsRUFBbUI7QUFDakJtQixtQkFBT25CLE1BQVAsR0FBZ0IsSUFBaEI7QUFDRDtBQUNELGlCQUFPbUIsTUFBUDtBQUNELFNBTEUsQ0FLREMsSUFMQyxDQUtJLElBTEosQ0FOeUIsQ0FBNUI7O0FBYUEsYUFBS1IsTUFBTCxDQUFZbkUsR0FBWixDQUFnQixVQUFoQixFQUE0QixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQTVCO0FBQ0QsT0F6QjJCOztBQTJCNUJDLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWOztBQUVBLGFBQUtULFFBQUwsQ0FBY1UsTUFBZDtBQUNBLGFBQUtSLHFCQUFMO0FBQ0EsYUFBS0Usb0JBQUw7O0FBRUEsYUFBS0wsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxLQUFLRCxRQUFMLEdBQWdCLElBQTVDO0FBQ0Q7QUFuQzJCLEtBQWIsQ0FBakI7O0FBc0NBb0IsZUFBV0MsZ0JBQVgsR0FBOEIsVUFBUy9ILElBQVQsRUFBZWdJLFFBQWYsRUFBeUI7QUFDckQsYUFBT3BILE9BQU9TLEdBQVAsQ0FBVzRHLGFBQVgsQ0FBeUJGLGdCQUF6QixDQUEwQy9ILElBQTFDLEVBQWdEZ0ksUUFBaEQsQ0FBUDtBQUNELEtBRkQ7O0FBSUFYLGVBQVdDLEtBQVgsQ0FBaUJRLFVBQWpCO0FBQ0F0RixXQUFPK0UsMkJBQVAsQ0FBbUNPLFVBQW5DLEVBQStDLENBQUMsVUFBRCxFQUFhLFlBQWIsRUFBMkIsU0FBM0IsRUFBc0Msb0JBQXRDLENBQS9DOztBQUVBLFdBQU9BLFVBQVA7QUFDRCxHQWhENEIsQ0FBN0I7QUFpREQsQ0F0REQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEvRyxRQUFRQyxNQUFSLENBQWUsT0FBZixFQUNHdUIsS0FESCxDQUNTLGdCQURULEVBQzJCbEIsSUFBSXlCLFNBQUosQ0FBY29GLGNBRHpDLEVBRUczRixLQUZILENBRVMsbUJBRlQsRUFFOEJsQixJQUFJeUIsU0FBSixDQUFjcUYsaUJBRjVDLEVBR0c1RixLQUhILENBR1MsdUJBSFQsRUFHa0NsQixJQUFJeUIsU0FBSixDQUFjc0YscUJBSGhELEVBSUc3RixLQUpILENBSVMscUJBSlQsRUFJZ0NsQixJQUFJeUIsU0FBSixDQUFjdUYsbUJBSjlDOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUlySCxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLFNBQWYsRUFBMEIsQ0FBQyxRQUFELEVBQVcsVUFBUzlELE1BQVQsRUFBaUI7O0FBRXBEOzs7QUFHQSxRQUFJOEYsVUFBVXpILE1BQU1wQixNQUFOLENBQWE7O0FBRXpCOzs7OztBQUtBYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtFLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUswQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2lDLE1BQUwsR0FBY0gsS0FBZDs7QUFFQSxhQUFLQyxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7O0FBRUEsYUFBS0wscUJBQUwsR0FBNkJwRSxPQUFPcUUsYUFBUCxDQUFxQixJQUFyQixFQUEyQjlDLFFBQVEsQ0FBUixDQUEzQixFQUF1QyxDQUNsRSxNQURrRSxFQUMxRCxNQUQwRCxFQUNsRCxRQURrRCxDQUF2QyxDQUE3QjtBQUdELE9BakJ3Qjs7QUFtQnpCbUQsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7QUFDQSxhQUFLUCxxQkFBTDs7QUFFQSxhQUFLRixRQUFMLEdBQWdCLEtBQUtELE1BQUwsR0FBYyxLQUFLRSxNQUFMLEdBQWMsSUFBNUM7QUFDRDtBQXhCd0IsS0FBYixDQUFkOztBQTJCQW5FLFdBQU8rRSwyQkFBUCxDQUFtQ2UsT0FBbkMsRUFBNEMsQ0FDMUMsVUFEMEMsRUFDOUIsU0FEOEIsQ0FBNUM7O0FBSUFqQixlQUFXQyxLQUFYLENBQWlCZ0IsT0FBakI7O0FBRUEsV0FBT0EsT0FBUDtBQUNELEdBdkN5QixDQUExQjtBQXdDRCxDQTdDRDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFFQXZILFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCc0YsT0FBeEIsQ0FBZ0MsYUFBaEMsRUFBK0MsQ0FBQyxRQUFELEVBQVcsVUFBUzlELE1BQVQsRUFBaUI7O0FBRXpFLFFBQUkrRixjQUFjMUgsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFN0I7Ozs7Ozs7OztBQVNBYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDckIsT0FBaEMsRUFBeUM7QUFDN0MsWUFBSXFELE9BQU8sSUFBWDtBQUNBckQsa0JBQVUsRUFBVjs7QUFFQSxhQUFLdUIsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLFlBQUlyQixRQUFRc0QsYUFBWixFQUEyQjtBQUN6QixjQUFJLENBQUN0RCxRQUFRdUQsZ0JBQWIsRUFBK0I7QUFDN0Isa0JBQU0sSUFBSXJHLEtBQUosQ0FBVSx3Q0FBVixDQUFOO0FBQ0Q7QUFDREcsaUJBQU9tRyxrQkFBUCxDQUEwQixJQUExQixFQUFnQ3hELFFBQVF1RCxnQkFBeEMsRUFBMEQzRSxPQUExRDtBQUNELFNBTEQsTUFLTztBQUNMdkIsaUJBQU9vRyxtQ0FBUCxDQUEyQyxJQUEzQyxFQUFpRDdFLE9BQWpEO0FBQ0Q7O0FBRUR2QixlQUFPcUcsT0FBUCxDQUFlQyxTQUFmLENBQXlCcEUsS0FBekIsRUFBZ0MsWUFBVztBQUN6QzhELGVBQUtPLE9BQUwsR0FBZXRGLFNBQWY7QUFDQWpCLGlCQUFPd0cscUJBQVAsQ0FBNkJSLElBQTdCOztBQUVBLGNBQUlyRCxRQUFRMkQsU0FBWixFQUF1QjtBQUNyQjNELG9CQUFRMkQsU0FBUixDQUFrQk4sSUFBbEI7QUFDRDs7QUFFRGhHLGlCQUFPeUcsY0FBUCxDQUFzQjtBQUNwQnZFLG1CQUFPQSxLQURhO0FBRXBCOEIsbUJBQU9BLEtBRmE7QUFHcEJ6QyxxQkFBU0E7QUFIVyxXQUF0Qjs7QUFNQXlFLGlCQUFPekUsVUFBVXlFLEtBQUs5QixRQUFMLEdBQWdCOEIsS0FBSy9CLE1BQUwsR0FBYy9CLFFBQVE4RCxLQUFLN0IsTUFBTCxHQUFjSCxRQUFRckIsVUFBVSxJQUF2RjtBQUNELFNBZkQ7QUFnQkQ7QUE1QzRCLEtBQWIsQ0FBbEI7O0FBK0NBOzs7Ozs7Ozs7O0FBVUFvRCxnQkFBWVcsUUFBWixHQUF1QixVQUFTeEUsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQ3JCLE9BQWhDLEVBQXlDO0FBQzlELFVBQUlnRSxPQUFPLElBQUlaLFdBQUosQ0FBZ0I3RCxLQUFoQixFQUF1QlgsT0FBdkIsRUFBZ0N5QyxLQUFoQyxFQUF1Q3JCLE9BQXZDLENBQVg7O0FBRUEsVUFBSSxDQUFDQSxRQUFRaUUsT0FBYixFQUFzQjtBQUNwQixjQUFNLElBQUkvRyxLQUFKLENBQVUsOEJBQVYsQ0FBTjtBQUNEOztBQUVERyxhQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQzJDLElBQWxDO0FBQ0FwRixjQUFRTyxJQUFSLENBQWFhLFFBQVFpRSxPQUFyQixFQUE4QkQsSUFBOUI7O0FBRUEsVUFBSUcsVUFBVW5FLFFBQVEyRCxTQUFSLElBQXFCL0gsUUFBUXdJLElBQTNDO0FBQ0FwRSxjQUFRMkQsU0FBUixHQUFvQixVQUFTSyxJQUFULEVBQWU7QUFDakNHLGdCQUFRSCxJQUFSO0FBQ0FwRixnQkFBUU8sSUFBUixDQUFhYSxRQUFRaUUsT0FBckIsRUFBOEIsSUFBOUI7QUFDRCxPQUhEOztBQUtBLGFBQU9ELElBQVA7QUFDRCxLQWpCRDs7QUFtQkE5QixlQUFXQyxLQUFYLENBQWlCaUIsV0FBakI7O0FBRUEsV0FBT0EsV0FBUDtBQUNELEdBakY4QyxDQUEvQztBQWtGRCxDQXJGRDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFDQSxNQUFJdkgsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBT3NGLE9BQVAsQ0FBZSxnQkFBZixFQUFpQyxDQUFDLDJCQUFELEVBQThCLFVBQVNrRCx5QkFBVCxFQUFvQzs7QUFFakcsUUFBSUMsaUJBQWlCNUksTUFBTXBCLE1BQU4sQ0FBYTs7QUFFaEM7Ozs7O0FBS0FjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0NrRCxNQUFoQyxFQUF3QztBQUFBOztBQUM1QyxhQUFLaEQsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkO0FBQ0EsYUFBS21ELE9BQUwsR0FBZUQsTUFBZjs7QUFFQSxZQUFJRSxlQUFlLEtBQUtuRCxNQUFMLENBQVlvRCxLQUFaLENBQWtCLEtBQUtsRCxNQUFMLENBQVltRCxhQUE5QixDQUFuQjs7QUFFQSxZQUFJQyxtQkFBbUIsSUFBSVAseUJBQUosQ0FBOEJJLFlBQTlCLEVBQTRDN0YsUUFBUSxDQUFSLENBQTVDLEVBQXdEQSxRQUFRVyxLQUFSLEVBQXhELENBQXZCOztBQUVBLGFBQUtzRixTQUFMLEdBQWlCLElBQUkzSSxJQUFJeUIsU0FBSixDQUFjbUgsa0JBQWxCLENBQXFDbEcsUUFBUSxDQUFSLEVBQVdtRyxVQUFoRCxFQUE0REgsZ0JBQTVELENBQWpCOztBQUVBO0FBQ0FILHFCQUFhTyxPQUFiLEdBQXVCLEtBQUtILFNBQUwsQ0FBZUcsT0FBZixDQUF1QmxELElBQXZCLENBQTRCLEtBQUsrQyxTQUFqQyxDQUF2Qjs7QUFFQWpHLGdCQUFRcUQsTUFBUjs7QUFFQTtBQUNBLGFBQUtYLE1BQUwsQ0FBWTJELE1BQVosQ0FBbUJMLGlCQUFpQk0sVUFBakIsQ0FBNEJwRCxJQUE1QixDQUFpQzhDLGdCQUFqQyxDQUFuQixFQUF1RSxLQUFLQyxTQUFMLENBQWVNLFNBQWYsQ0FBeUJyRCxJQUF6QixDQUE4QixLQUFLK0MsU0FBbkMsQ0FBdkU7O0FBRUEsYUFBS3ZELE1BQUwsQ0FBWW5FLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsWUFBTTtBQUNoQyxnQkFBS29FLFFBQUwsR0FBZ0IsTUFBS0QsTUFBTCxHQUFjLE1BQUtFLE1BQUwsR0FBYyxNQUFLZ0QsT0FBTCxHQUFlLElBQTNEO0FBQ0QsU0FGRDtBQUdEO0FBOUIrQixLQUFiLENBQXJCOztBQWlDQSxXQUFPRixjQUFQO0FBQ0QsR0FwQ2dDLENBQWpDO0FBcUNELENBekNEOzs7Ozs7Ozs7Ozs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFFQTFJLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCc0YsT0FBeEIsQ0FBZ0MsMkJBQWhDLEVBQTZELENBQUMsVUFBRCxFQUFhLFVBQVN6RSxRQUFULEVBQW1COztBQUUzRixRQUFNMEksc0JBQXNCLENBQUMsaUJBQUQsRUFBb0IsaUJBQXBCLEVBQXVDLGlCQUF2QyxFQUEwRCxzQkFBMUQsRUFBa0YsbUJBQWxGLENBQTVCOztBQUYyRixRQUdyRmYseUJBSHFGO0FBQUE7O0FBSXpGOzs7OztBQUtBLHlDQUFZSSxZQUFaLEVBQTBCWSxlQUExQixFQUEyQ25GLFdBQTNDLEVBQXdEO0FBQUE7O0FBQUEsMEpBQ2hEdUUsWUFEZ0QsRUFDbENZLGVBRGtDOztBQUV0RCxjQUFLQyxZQUFMLEdBQW9CcEYsV0FBcEI7O0FBRUFrRiw0QkFBb0JHLE9BQXBCLENBQTRCO0FBQUEsaUJBQVFGLGdCQUFnQkcsZUFBaEIsQ0FBZ0NDLElBQWhDLENBQVI7QUFBQSxTQUE1QjtBQUNBLGNBQUtqQixPQUFMLEdBQWU5SCxTQUFTMkksa0JBQWtCQSxnQkFBZ0JLLFNBQWhCLENBQTBCLElBQTFCLENBQWxCLEdBQW9ELElBQTdELENBQWY7QUFMc0Q7QUFNdkQ7O0FBZndGO0FBQUE7QUFBQSwyQ0FpQnRFQyxJQWpCc0UsRUFpQmhFcEcsS0FqQmdFLEVBaUIxRDtBQUM3QixjQUFJLEtBQUtxRyxhQUFMLENBQW1CQyxrQkFBbkIsWUFBaURDLFFBQXJELEVBQStEO0FBQzdELGlCQUFLRixhQUFMLENBQW1CQyxrQkFBbkIsQ0FBc0NGLElBQXRDLEVBQTRDcEcsS0FBNUM7QUFDRDtBQUNGO0FBckJ3RjtBQUFBO0FBQUEseUNBdUJ4RW9HLElBdkJ3RSxFQXVCbEUvRyxPQXZCa0UsRUF1QjFEO0FBQzdCLGNBQUksS0FBS2dILGFBQUwsQ0FBbUJHLGdCQUFuQixZQUErQ0QsUUFBbkQsRUFBNkQ7QUFDM0QsaUJBQUtGLGFBQUwsQ0FBbUJHLGdCQUFuQixDQUFvQ0osSUFBcEMsRUFBMEMvRyxPQUExQztBQUNEO0FBQ0Y7QUEzQndGO0FBQUE7QUFBQSx3Q0E2QnpFO0FBQ2QsY0FBSSxLQUFLZ0gsYUFBTCxDQUFtQkMsa0JBQXZCLEVBQTJDO0FBQ3pDLG1CQUFPLElBQVA7QUFDRDs7QUFFRCxjQUFJLEtBQUtELGFBQUwsQ0FBbUJJLGlCQUF2QixFQUEwQztBQUN4QyxtQkFBTyxLQUFQO0FBQ0Q7O0FBRUQsZ0JBQU0sSUFBSTlJLEtBQUosQ0FBVSx5Q0FBVixDQUFOO0FBQ0Q7QUF2Q3dGO0FBQUE7QUFBQSx3Q0F5Q3pFK0ksS0F6Q3lFLEVBeUNsRWpGLElBekNrRSxFQXlDNUQ7QUFDM0IsZUFBS2tGLG1CQUFMLENBQXlCRCxLQUF6QixFQUFnQyxnQkFBc0I7QUFBQSxnQkFBcEJySCxPQUFvQixRQUFwQkEsT0FBb0I7QUFBQSxnQkFBWFcsS0FBVyxRQUFYQSxLQUFXOztBQUNwRHlCLGlCQUFLLEVBQUNwQyxnQkFBRCxFQUFVVyxZQUFWLEVBQUw7QUFDRCxXQUZEO0FBR0Q7QUE3Q3dGO0FBQUE7QUFBQSw0Q0ErQ3JFMEcsS0EvQ3FFLEVBK0M5RGpGLElBL0M4RCxFQStDeEQ7QUFBQTs7QUFDL0IsY0FBTXpCLFFBQVEsS0FBSytGLFlBQUwsQ0FBa0JuRixJQUFsQixFQUFkO0FBQ0EsZUFBS2dHLHFCQUFMLENBQTJCRixLQUEzQixFQUFrQzFHLEtBQWxDOztBQUVBLGNBQUksS0FBSzZHLGFBQUwsRUFBSixFQUEwQjtBQUN4QixpQkFBS1Asa0JBQUwsQ0FBd0JJLEtBQXhCLEVBQStCMUcsS0FBL0I7QUFDRDs7QUFFRCxlQUFLaUYsT0FBTCxDQUFhakYsS0FBYixFQUFvQixVQUFDOEcsTUFBRCxFQUFZO0FBQzlCLGdCQUFJekgsVUFBVXlILE9BQU8sQ0FBUCxDQUFkO0FBQ0EsZ0JBQUksQ0FBQyxPQUFLRCxhQUFMLEVBQUwsRUFBMkI7QUFDekJ4SCx3QkFBVSxPQUFLZ0gsYUFBTCxDQUFtQkksaUJBQW5CLENBQXFDQyxLQUFyQyxFQUE0Q3JILE9BQTVDLENBQVY7QUFDQWxDLHVCQUFTa0MsT0FBVCxFQUFrQlcsS0FBbEI7QUFDRDs7QUFFRHlCLGlCQUFLLEVBQUNwQyxnQkFBRCxFQUFVVyxZQUFWLEVBQUw7QUFDRCxXQVJEO0FBU0Q7O0FBRUQ7Ozs7O0FBbEV5RjtBQUFBO0FBQUEsOENBc0VuRStHLENBdEVtRSxFQXNFaEUvRyxLQXRFZ0UsRUFzRXpEO0FBQzlCLGNBQU1nSCxPQUFPLEtBQUtyQixVQUFMLEtBQW9CLENBQWpDO0FBQ0F0SixrQkFBUXRCLE1BQVIsQ0FBZWlGLEtBQWYsRUFBc0I7QUFDcEJpSCxvQkFBUUYsQ0FEWTtBQUVwQkcsb0JBQVFILE1BQU0sQ0FGTTtBQUdwQkksbUJBQU9KLE1BQU1DLElBSE87QUFJcEJJLHFCQUFTTCxNQUFNLENBQU4sSUFBV0EsTUFBTUMsSUFKTjtBQUtwQkssbUJBQU9OLElBQUksQ0FBSixLQUFVLENBTEc7QUFNcEJPLGtCQUFNUCxJQUFJLENBQUosS0FBVTtBQU5JLFdBQXRCO0FBUUQ7QUFoRndGO0FBQUE7QUFBQSxtQ0FrRjlFTCxLQWxGOEUsRUFrRnZFTixJQWxGdUUsRUFrRmpFO0FBQUE7O0FBQ3RCLGNBQUksS0FBS1MsYUFBTCxFQUFKLEVBQTBCO0FBQ3hCVCxpQkFBS3BHLEtBQUwsQ0FBV2EsVUFBWCxDQUFzQjtBQUFBLHFCQUFNLE9BQUt5RixrQkFBTCxDQUF3QkksS0FBeEIsRUFBK0JOLEtBQUtwRyxLQUFwQyxDQUFOO0FBQUEsYUFBdEI7QUFDRCxXQUZELE1BRU87QUFDTCw2SkFBaUIwRyxLQUFqQixFQUF3Qk4sSUFBeEI7QUFDRDtBQUNGOztBQUVEOzs7Ozs7O0FBMUZ5RjtBQUFBO0FBQUEsb0NBZ0c3RU0sS0FoRzZFLEVBZ0d0RU4sSUFoR3NFLEVBZ0doRTtBQUN2QixjQUFJLEtBQUtTLGFBQUwsRUFBSixFQUEwQjtBQUN4QixpQkFBS0wsZ0JBQUwsQ0FBc0JFLEtBQXRCLEVBQTZCTixLQUFLcEcsS0FBbEM7QUFDRCxXQUZELE1BRU87QUFDTCw4SkFBa0IwRyxLQUFsQixFQUF5Qk4sS0FBSy9HLE9BQTlCO0FBQ0Q7QUFDRCtHLGVBQUtwRyxLQUFMLENBQVd1SCxRQUFYO0FBQ0Q7QUF2R3dGO0FBQUE7QUFBQSxrQ0F5Ry9FO0FBQ1I7QUFDQSxlQUFLeEYsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQTVHd0Y7O0FBQUE7QUFBQSxNQUduRHBGLElBQUl5QixTQUFKLENBQWNvSixrQkFIcUM7O0FBZ0gzRixXQUFPMUMseUJBQVA7QUFDRCxHQWpINEQsQ0FBN0Q7QUFrSEQsQ0FySEQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSXhJLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU91QixLQUFQLENBQWEsZUFBYixFQUE4QmxCLElBQUl5QixTQUFKLENBQWNxSixhQUE1QztBQUNBbkwsU0FBT3VCLEtBQVAsQ0FBYSxtQkFBYixFQUFrQ2xCLElBQUl5QixTQUFKLENBQWNzSixpQkFBaEQ7O0FBRUFwTCxTQUFPc0YsT0FBUCxDQUFlLFdBQWYsRUFBNEIsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixVQUFTOUQsTUFBVCxFQUFpQjZKLE1BQWpCLEVBQXlCOztBQUV4RSxRQUFJQyxZQUFZekwsTUFBTXBCLE1BQU4sQ0FBYTtBQUMzQmlILGdCQUFVakQsU0FEaUI7QUFFM0JnRCxjQUFRaEQsU0FGbUI7O0FBSTNCbEQsWUFBTSxjQUFTbUUsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQyxhQUFLQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2dDLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUswQyxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7O0FBRUFsRCxnQkFBUSxDQUFSLEVBQVd3SSxnQkFBWCxDQUE0QkMsbUJBQTVCLENBQWdESCxPQUFPN0YsTUFBTWlHLGdCQUFiLEdBQWhEO0FBQ0QsT0FWMEI7O0FBWTNCQyxZQUFNLGNBQVN2SCxPQUFULEVBQWtCO0FBQ3RCLGVBQU8sS0FBS3VCLFFBQUwsQ0FBYyxDQUFkLEVBQWlCZ0csSUFBakIsQ0FBc0J2SCxPQUF0QixDQUFQO0FBQ0QsT0FkMEI7O0FBZ0IzQndILFlBQU0sY0FBU3hILE9BQVQsRUFBa0I7QUFDdEIsZUFBTyxLQUFLdUIsUUFBTCxDQUFjLENBQWQsRUFBaUJpRyxJQUFqQixDQUFzQnhILE9BQXRCLENBQVA7QUFDRCxPQWxCMEI7O0FBb0IzQnlILGNBQVEsZ0JBQVN6SCxPQUFULEVBQWtCO0FBQ3hCLGVBQU8sS0FBS3VCLFFBQUwsQ0FBYyxDQUFkLEVBQWlCa0csTUFBakIsQ0FBd0J6SCxPQUF4QixDQUFQO0FBQ0QsT0F0QjBCOztBQXdCM0IrQixnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVixFQUFxQixFQUFDbkUsTUFBTSxJQUFQLEVBQXJCOztBQUVBLGFBQUsrRixPQUFMLEdBQWUsS0FBS3JDLFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLElBQTdDO0FBQ0Q7QUE1QjBCLEtBQWIsQ0FBaEI7O0FBK0JBNkYsY0FBVXZFLGdCQUFWLEdBQTZCLFVBQVMvSCxJQUFULEVBQWVnSSxRQUFmLEVBQXlCO0FBQ3BELGFBQU9wSCxPQUFPUyxHQUFQLENBQVd3TCxZQUFYLENBQXdCOUUsZ0JBQXhCLENBQXlDL0gsSUFBekMsRUFBK0NnSSxRQUEvQyxDQUFQO0FBQ0QsS0FGRDs7QUFJQVgsZUFBV0MsS0FBWCxDQUFpQmdGLFNBQWpCO0FBQ0E5SixXQUFPK0UsMkJBQVAsQ0FBbUMrRSxTQUFuQyxFQUE4QyxDQUFDLG9CQUFELENBQTlDOztBQUdBLFdBQU9BLFNBQVA7QUFDRCxHQTFDMkIsQ0FBNUI7QUE0Q0QsQ0FwREQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSXRMLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsZUFBZixFQUFnQyxDQUFDLFVBQUQsRUFBYSxRQUFiLEVBQXVCLFVBQVN6RSxRQUFULEVBQW1CVyxNQUFuQixFQUEyQjs7QUFFaEY7Ozs7O0FBS0EsUUFBSXNLLGdCQUFnQmpNLE1BQU1wQixNQUFOLENBQWE7O0FBRS9COzs7QUFHQWlILGdCQUFVakQsU0FMcUI7O0FBTy9COzs7QUFHQWtELGNBQVFsRCxTQVZ1Qjs7QUFZL0I7OztBQUdBZ0QsY0FBUWhELFNBZnVCOztBQWlCL0I7Ozs7O0FBS0FsRCxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDOztBQUVwQyxhQUFLRSxRQUFMLEdBQWdCM0MsV0FBV2hELFFBQVFnRCxPQUFSLENBQWdCbkQsT0FBT21CLFFBQVAsQ0FBZ0JHLElBQWhDLENBQTNCO0FBQ0EsYUFBS3VFLE1BQUwsR0FBYy9CLFNBQVMsS0FBS2dDLFFBQUwsQ0FBY2hDLEtBQWQsRUFBdkI7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkO0FBQ0EsYUFBS3VHLGtCQUFMLEdBQTBCLElBQTFCOztBQUVBLGFBQUtDLGNBQUwsR0FBc0IsS0FBS0MsU0FBTCxDQUFlaEcsSUFBZixDQUFvQixJQUFwQixDQUF0QjtBQUNBLGFBQUtQLFFBQUwsQ0FBY3dHLEVBQWQsQ0FBaUIsUUFBakIsRUFBMkIsS0FBS0YsY0FBaEM7O0FBRUEsYUFBS3ZHLE1BQUwsQ0FBWW5FLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsS0FBSzRFLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixJQUFuQixDQUE1Qjs7QUFFQSxhQUFLSCxvQkFBTCxHQUE0QnRFLE9BQU91RSxZQUFQLENBQW9CLElBQXBCLEVBQTBCaEQsUUFBUSxDQUFSLENBQTFCLEVBQXNDLENBQ2hFLFNBRGdFLEVBQ3JELFVBRHFELEVBQ3pDLFFBRHlDLEVBRWhFLFNBRmdFLEVBRXJELE1BRnFELEVBRTdDLE1BRjZDLEVBRXJDLE1BRnFDLEVBRTdCLFNBRjZCLENBQXRDLEVBR3pCLFVBQVNpRCxNQUFULEVBQWlCO0FBQ2xCLGNBQUlBLE9BQU9tRyxTQUFYLEVBQXNCO0FBQ3BCbkcsbUJBQU9tRyxTQUFQLEdBQW1CLElBQW5CO0FBQ0Q7QUFDRCxpQkFBT25HLE1BQVA7QUFDRCxTQUxFLENBS0RDLElBTEMsQ0FLSSxJQUxKLENBSHlCLENBQTVCOztBQVVBLGFBQUtMLHFCQUFMLEdBQTZCcEUsT0FBT3FFLGFBQVAsQ0FBcUIsSUFBckIsRUFBMkI5QyxRQUFRLENBQVIsQ0FBM0IsRUFBdUMsQ0FDbEUsWUFEa0UsRUFFbEUsVUFGa0UsRUFHbEUsY0FIa0UsRUFJbEUsU0FKa0UsRUFLbEUsYUFMa0UsRUFNbEUsYUFOa0UsRUFPbEUsWUFQa0UsQ0FBdkMsQ0FBN0I7QUFTRCxPQXJEOEI7O0FBdUQvQmtKLGlCQUFXLG1CQUFTRyxLQUFULEVBQWdCO0FBQ3pCLFlBQUlDLFFBQVFELE1BQU1wRyxNQUFOLENBQWFtRyxTQUFiLENBQXVCRSxLQUFuQztBQUNBdE0sZ0JBQVFnRCxPQUFSLENBQWdCc0osTUFBTUEsTUFBTUMsTUFBTixHQUFlLENBQXJCLENBQWhCLEVBQXlDaEosSUFBekMsQ0FBOEMsUUFBOUMsRUFBd0RpQixVQUF4RDtBQUNELE9BMUQ4Qjs7QUE0RC9CMkIsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7QUFDQSxhQUFLTCxvQkFBTDtBQUNBLGFBQUtGLHFCQUFMO0FBQ0EsYUFBS0YsUUFBTCxDQUFjNkcsR0FBZCxDQUFrQixRQUFsQixFQUE0QixLQUFLUCxjQUFqQztBQUNBLGFBQUt0RyxRQUFMLEdBQWdCLEtBQUtELE1BQUwsR0FBYyxLQUFLRSxNQUFMLEdBQWMsSUFBNUM7QUFDRDtBQWxFOEIsS0FBYixDQUFwQjs7QUFxRUFVLGVBQVdDLEtBQVgsQ0FBaUJ3RixhQUFqQjtBQUNBdEssV0FBTytFLDJCQUFQLENBQW1DdUYsYUFBbkMsRUFBa0QsQ0FBQyxPQUFELEVBQVUsU0FBVixDQUFsRDs7QUFFQSxXQUFPQSxhQUFQO0FBQ0QsR0FoRitCLENBQWhDO0FBaUZELENBdEZEOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBL0wsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFDR3VCLEtBREgsQ0FDUyw2QkFEVCxFQUN3Q2xCLElBQUl5QixTQUFKLENBQWMwSywyQkFEdEQsRUFFR2pMLEtBRkgsQ0FFUyx3QkFGVCxFQUVtQ2xCLElBQUl5QixTQUFKLENBQWMySywrQkFGakQsRUFHR2xMLEtBSEgsQ0FHUyw0QkFIVCxFQUd1Q2xCLElBQUl5QixTQUFKLENBQWM0SyxtQ0FIckQsRUFJR25MLEtBSkgsQ0FJUyx3QkFKVCxFQUltQ2xCLElBQUl5QixTQUFKLENBQWM2SywrQkFKakQsRUFLR3BMLEtBTEgsQ0FLUyx3QkFMVCxFQUttQ2xCLElBQUl5QixTQUFKLENBQWMwSywyQkFMakQsRUFNR2pMLEtBTkgsQ0FNUywrQkFOVCxFQU0wQ2xCLElBQUl5QixTQUFKLENBQWM4SyxzQ0FOeEQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSTVNLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsNEJBQWYsRUFBNkMsQ0FBQyxxQkFBRCxFQUF3QixVQUFTdUgsbUJBQVQsRUFBOEI7O0FBRWpHLFFBQUlDLDZCQUE2QkQsb0JBQW9CcE8sTUFBcEIsQ0FBMkI7O0FBRTFEc08sa0JBQVl0SyxTQUY4Qzs7QUFJMUR1SyxnQkFBVSxLQUpnRDtBQUsxRHRILGdCQUFVLEtBTGdEO0FBTTFEdUgsaUJBQVcsS0FOK0M7QUFPMURDLGlCQUFXLEtBUCtDO0FBUTFEQyxjQUFRLEtBUmtEOztBQVUxRDs7Ozs7Ozs7QUFRQUMsYUFBTyxlQUFTckssT0FBVCxFQUFrQnNLLFFBQWxCLEVBQTRCQyxRQUE1QixFQUFzQ25KLE9BQXRDLEVBQStDO0FBQ3BEQSxrQkFBVUEsV0FBVyxFQUFyQjtBQUNBLGFBQUtnSixNQUFMLEdBQWNoSixRQUFRb0osS0FBUixJQUFpQixLQUEvQjtBQUNBLGFBQUtQLFFBQUwsR0FBZ0IsQ0FBQyxDQUFDN0ksUUFBUXFKLE9BQTFCO0FBQ0EsYUFBSzlILFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUttSyxTQUFMLEdBQWlCRyxRQUFqQjtBQUNBLGFBQUtKLFNBQUwsR0FBaUJLLFFBQWpCOztBQUVBQSxpQkFBU0csR0FBVCxDQUFhLFlBQWIsRUFBMkIsbUNBQTNCO0FBQ0FILGlCQUFTRyxHQUFULENBQWE7QUFDWEYsaUJBQU9wSixRQUFRb0osS0FESjtBQUVYRyxtQkFBUyxNQUZFO0FBR1hDLGtCQUFRO0FBSEcsU0FBYjs7QUFNQTtBQUNBTCxpQkFBU0csR0FBVCxDQUFhLG1CQUFiLEVBQWtDLDRCQUFsQzs7QUFFQUosaUJBQVNJLEdBQVQsQ0FBYSxFQUFDRSxRQUFRLENBQVQsRUFBYjs7QUFFQSxZQUFJLEtBQUtYLFFBQVQsRUFBbUI7QUFDakJNLG1CQUFTRyxHQUFULENBQWE7QUFDWEcsbUJBQU8sTUFBTXpKLFFBQVFvSixLQURWO0FBRVhNLGtCQUFNO0FBRkssV0FBYjtBQUlELFNBTEQsTUFLTztBQUNMUCxtQkFBU0csR0FBVCxDQUFhO0FBQ1hHLG1CQUFPLE1BREk7QUFFWEMsa0JBQU0sTUFBTTFKLFFBQVFvSjtBQUZULFdBQWI7QUFJRDs7QUFFRCxhQUFLUixVQUFMLEdBQWtCaE4sUUFBUWdELE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0IwSyxHQUEvQixDQUFtQztBQUNuREssMkJBQWlCLE9BRGtDO0FBRW5EQyxlQUFLLEtBRjhDO0FBR25ERixnQkFBTSxLQUg2QztBQUluREQsaUJBQU8sS0FKNEM7QUFLbkRJLGtCQUFRLEtBTDJDO0FBTW5EQyxvQkFBVSxVQU55QztBQU9uRFAsbUJBQVMsTUFQMEM7QUFRbkRDLGtCQUFRO0FBUjJDLFNBQW5DLENBQWxCOztBQVdBNUssZ0JBQVFtTCxPQUFSLENBQWdCLEtBQUtuQixVQUFyQjtBQUNELE9BOUR5RDs7QUFnRTFEOzs7O0FBSUFvQixpQkFBVyxtQkFBU2hLLE9BQVQsRUFBa0I7QUFDM0IsYUFBSzhJLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixPQUFuQixFQUE0QnRKLFFBQVFvSixLQUFwQzs7QUFFQSxZQUFJLEtBQUtQLFFBQVQsRUFBbUI7QUFDakIsZUFBS0MsU0FBTCxDQUFlUSxHQUFmLENBQW1CO0FBQ2pCRyxtQkFBTyxNQUFNekosUUFBUW9KLEtBREo7QUFFakJNLGtCQUFNO0FBRlcsV0FBbkI7QUFJRCxTQUxELE1BS087QUFDTCxlQUFLWixTQUFMLENBQWVRLEdBQWYsQ0FBbUI7QUFDakJHLG1CQUFPLE1BRFU7QUFFakJDLGtCQUFNLE1BQU0xSixRQUFRb0o7QUFGSCxXQUFuQjtBQUlEOztBQUVELFlBQUlwSixRQUFRaUssUUFBWixFQUFzQjtBQUNwQixjQUFJQyxNQUFNLEtBQUtwQixTQUFMLENBQWUsQ0FBZixFQUFrQnFCLFdBQTVCO0FBQ0EsY0FBSUMsWUFBWSxLQUFLQyxzQkFBTCxDQUE0QkgsR0FBNUIsQ0FBaEI7QUFDQWhPLGNBQUlvTyxNQUFKLENBQVcsS0FBS3hCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFBOEJ5QixLQUE5QixDQUFvQ0gsU0FBcEMsRUFBK0NJLElBQS9DO0FBQ0Q7QUFDRixPQXhGeUQ7O0FBMEYxRDs7QUFFQXJHLGVBQVMsbUJBQVc7QUFDbEIsWUFBSSxLQUFLeUUsVUFBVCxFQUFxQjtBQUNuQixlQUFLQSxVQUFMLENBQWdCM0csTUFBaEI7QUFDQSxlQUFLMkcsVUFBTCxHQUFrQixJQUFsQjtBQUNEOztBQUVELGFBQUtHLFNBQUwsQ0FBZTBCLFVBQWYsQ0FBMEIsT0FBMUI7QUFDQSxhQUFLM0IsU0FBTCxDQUFlMkIsVUFBZixDQUEwQixPQUExQjs7QUFFQSxhQUFLbEosUUFBTCxHQUFnQixLQUFLd0gsU0FBTCxHQUFpQixLQUFLRCxTQUFMLEdBQWlCLElBQWxEO0FBQ0QsT0F0R3lEOztBQXdHMUQ7Ozs7QUFJQTRCLGdCQUFVLGtCQUFTOUssUUFBVCxFQUFtQitLLE9BQW5CLEVBQTRCO0FBQ3BDLFlBQUlDLFdBQVdELFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLQyxRQUE3QztBQUNBLFlBQUlDLFFBQVFGLFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLRSxLQUExQzs7QUFFQSxhQUFLL0IsU0FBTCxDQUFlUSxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE9BQTlCO0FBQ0EsYUFBS1YsVUFBTCxDQUFnQlUsR0FBaEIsQ0FBb0IsU0FBcEIsRUFBK0IsT0FBL0I7O0FBRUEsWUFBSVksTUFBTSxLQUFLcEIsU0FBTCxDQUFlLENBQWYsRUFBa0JxQixXQUE1QjtBQUNBLFlBQUlDLFlBQVksS0FBS0Msc0JBQUwsQ0FBNEJILEdBQTVCLENBQWhCO0FBQ0EsWUFBSVksZ0JBQWdCLEtBQUtDLHNCQUFMLENBQTRCYixHQUE1QixDQUFwQjs7QUFFQWMsbUJBQVcsWUFBVzs7QUFFcEI5TyxjQUFJb08sTUFBSixDQUFXLEtBQUt2QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0drQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTTyxhQUZULEVBRXdCO0FBQ3BCRixzQkFBVUEsUUFEVTtBQUVwQk0sb0JBQVEsS0FBS0E7QUFGTyxXQUZ4QixFQU1HWCxLQU5ILENBTVMsVUFBU3ZKLElBQVQsRUFBZTtBQUNwQnBCO0FBQ0FvQjtBQUNELFdBVEgsRUFVR3dKLElBVkg7O0FBWUF0TyxjQUFJb08sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0dtQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTSCxTQUZULEVBRW9CO0FBQ2hCUSxzQkFBVUEsUUFETTtBQUVoQk0sb0JBQVEsS0FBS0E7QUFGRyxXQUZwQixFQU1HVixJQU5IO0FBUUQsU0F0QlUsQ0FzQlQxSSxJQXRCUyxDQXNCSixJQXRCSSxDQUFYLEVBc0JjLE9BQU8sRUF0QnJCO0FBdUJELE9BOUl5RDs7QUFnSjFEOzs7O0FBSUFxSixpQkFBVyxtQkFBU3ZMLFFBQVQsRUFBbUIrSyxPQUFuQixFQUE0QjtBQUNyQyxZQUFJQyxXQUFXRCxZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0MsUUFBN0M7QUFDQSxZQUFJQyxRQUFRRixZQUFZLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsS0FBS0UsS0FBMUM7O0FBRUEsYUFBS2pDLFVBQUwsQ0FBZ0JVLEdBQWhCLENBQW9CLEVBQUNDLFNBQVMsT0FBVixFQUFwQjs7QUFFQSxZQUFJNkIsZ0JBQWdCLEtBQUtmLHNCQUFMLENBQTRCLENBQTVCLENBQXBCO0FBQ0EsWUFBSVMsZ0JBQWdCLEtBQUtDLHNCQUFMLENBQTRCLENBQTVCLENBQXBCOztBQUVBQyxtQkFBVyxZQUFXOztBQUVwQjlPLGNBQUlvTyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR2tDLElBREgsQ0FDUUosS0FEUixFQUVHTixLQUZILENBRVNPLGFBRlQsRUFFd0I7QUFDcEJGLHNCQUFVQSxRQURVO0FBRXBCTSxvQkFBUSxLQUFLQTtBQUZPLFdBRnhCLEVBTUdYLEtBTkgsQ0FNUyxVQUFTdkosSUFBVCxFQUFlO0FBQ3BCLGlCQUFLOEgsU0FBTCxDQUFlUSxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE1BQTlCO0FBQ0ExSjtBQUNBb0I7QUFDRCxXQUpNLENBSUxjLElBSkssQ0FJQSxJQUpBLENBTlQsRUFXRzBJLElBWEg7O0FBYUF0TyxjQUFJb08sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0dtQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTYSxhQUZULEVBRXdCO0FBQ3BCUixzQkFBVUEsUUFEVTtBQUVwQk0sb0JBQVEsS0FBS0E7QUFGTyxXQUZ4QixFQU1HVixJQU5IO0FBUUQsU0F2QlUsQ0F1QlQxSSxJQXZCUyxDQXVCSixJQXZCSSxDQUFYLEVBdUJjLE9BQU8sRUF2QnJCO0FBd0JELE9Bckx5RDs7QUF1TDFEOzs7OztBQUtBdUoscUJBQWUsdUJBQVNyTCxPQUFULEVBQWtCOztBQUUvQixhQUFLOEksU0FBTCxDQUFlUSxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE9BQTlCO0FBQ0EsYUFBS1YsVUFBTCxDQUFnQlUsR0FBaEIsQ0FBb0IsRUFBQ0MsU0FBUyxPQUFWLEVBQXBCOztBQUVBLFlBQUk2QixnQkFBZ0IsS0FBS2Ysc0JBQUwsQ0FBNEJpQixLQUFLQyxHQUFMLENBQVN2TCxRQUFRd0wsV0FBakIsRUFBOEJ4TCxRQUFReUwsUUFBdEMsQ0FBNUIsQ0FBcEI7QUFDQSxZQUFJWCxnQkFBZ0IsS0FBS0Msc0JBQUwsQ0FBNEJPLEtBQUtDLEdBQUwsQ0FBU3ZMLFFBQVF3TCxXQUFqQixFQUE4QnhMLFFBQVF5TCxRQUF0QyxDQUE1QixDQUFwQjtBQUNBLGVBQU9YLGNBQWNZLE9BQXJCOztBQUVBeFAsWUFBSW9PLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHeUIsS0FESCxDQUNTYSxhQURULEVBRUdaLElBRkg7O0FBSUEsWUFBSTdQLE9BQU9nUixJQUFQLENBQVliLGFBQVosRUFBMkIzQyxNQUEzQixHQUFvQyxDQUF4QyxFQUEyQztBQUN6Q2pNLGNBQUlvTyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR3dCLEtBREgsQ0FDU08sYUFEVCxFQUVHTixJQUZIO0FBR0Q7QUFDRixPQTlNeUQ7O0FBZ04xREgsOEJBQXdCLGdDQUFTb0IsUUFBVCxFQUFtQjtBQUN6QyxZQUFJRyxJQUFJLEtBQUsvQyxRQUFMLEdBQWdCLENBQUM0QyxRQUFqQixHQUE0QkEsUUFBcEM7QUFDQSxZQUFJSSxZQUFZLGlCQUFpQkQsQ0FBakIsR0FBcUIsV0FBckM7O0FBRUEsZUFBTztBQUNMQyxxQkFBV0EsU0FETjtBQUVMLHdCQUFjSixhQUFhLENBQWIsR0FBaUIsTUFBakIsR0FBMEI7QUFGbkMsU0FBUDtBQUlELE9BeE55RDs7QUEwTjFEViw4QkFBd0IsZ0NBQVNVLFFBQVQsRUFBbUI7QUFDekMsWUFBSXZCLE1BQU0sS0FBS3BCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCcUIsV0FBNUI7QUFDQSxZQUFJdUIsVUFBVSxJQUFLLE1BQU1ELFFBQU4sR0FBaUJ2QixHQUFwQzs7QUFFQSxlQUFPO0FBQ0x3QixtQkFBU0E7QUFESixTQUFQO0FBR0QsT0FqT3lEOztBQW1PMURJLFlBQU0sZ0JBQVc7QUFDZixlQUFPLElBQUluRCwwQkFBSixFQUFQO0FBQ0Q7QUFyT3lELEtBQTNCLENBQWpDOztBQXdPQSxXQUFPQSwwQkFBUDtBQUNELEdBM080QyxDQUE3QztBQTZPRCxDQWpQRDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJOU0sU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBT3NGLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsVUFBUzlELE1BQVQsRUFBaUI2SixNQUFqQixFQUF5Qjs7QUFFdkUsUUFBSTZFLFdBQVdyUSxNQUFNcEIsTUFBTixDQUFhO0FBQzFCYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQUE7O0FBQ3BDLGFBQUtDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLZ0MsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzRDLE1BQUwsR0FBY0gsS0FBZDs7QUFFQSxhQUFLMkssY0FBTCxHQUFzQnpNLE1BQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQXRCLENBQXRCOztBQUVBLGFBQUtILG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEJoRCxRQUFRLENBQVIsQ0FBMUIsRUFBc0MsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixNQUFqQixFQUF5QixTQUF6QixDQUF0QyxDQUE1Qjs7QUFFQWpFLGVBQU9zUixjQUFQLENBQXNCLElBQXRCLEVBQTRCLG9CQUE1QixFQUFrRDtBQUNoRGxPLGVBQUs7QUFBQSxtQkFBTSxNQUFLd0QsUUFBTCxDQUFjLENBQWQsRUFBaUIySyxrQkFBdkI7QUFBQSxXQUQyQztBQUVoREMsZUFBSyxvQkFBUztBQUNaLGdCQUFJLENBQUMsTUFBS0Msc0JBQVYsRUFBa0M7QUFDaEMsb0JBQUtDLHdCQUFMO0FBQ0Q7QUFDRCxrQkFBS0Qsc0JBQUwsR0FBOEJoUCxLQUE5QjtBQUNEO0FBUCtDLFNBQWxEOztBQVVBLFlBQUksS0FBS29FLE1BQUwsQ0FBWThLLGtCQUFaLElBQWtDLEtBQUs5SyxNQUFMLENBQVkwSyxrQkFBbEQsRUFBc0U7QUFDcEUsZUFBS0csd0JBQUw7QUFDRDtBQUNELFlBQUksS0FBSzdLLE1BQUwsQ0FBWStLLGdCQUFoQixFQUFrQztBQUNoQyxlQUFLaEwsUUFBTCxDQUFjLENBQWQsRUFBaUJpTCxnQkFBakIsR0FBb0MsVUFBQ3hMLElBQUQsRUFBVTtBQUM1Q2tHLG1CQUFPLE1BQUsxRixNQUFMLENBQVkrSyxnQkFBbkIsRUFBcUMsTUFBS2pMLE1BQTFDLEVBQWtETixJQUFsRDtBQUNELFdBRkQ7QUFHRDtBQUNGLE9BNUJ5Qjs7QUE4QjFCcUwsZ0NBQTBCLG9DQUFXO0FBQ25DLGFBQUtELHNCQUFMLEdBQThCeFEsUUFBUXdJLElBQXRDO0FBQ0EsYUFBSzdDLFFBQUwsQ0FBYyxDQUFkLEVBQWlCMkssa0JBQWpCLEdBQXNDLEtBQUtPLG1CQUFMLENBQXlCM0ssSUFBekIsQ0FBOEIsSUFBOUIsQ0FBdEM7QUFDRCxPQWpDeUI7O0FBbUMxQjJLLDJCQUFxQiw2QkFBU0MsTUFBVCxFQUFpQjtBQUNwQyxhQUFLTixzQkFBTCxDQUE0Qk0sTUFBNUI7O0FBRUE7QUFDQSxZQUFJLEtBQUtsTCxNQUFMLENBQVk4SyxrQkFBaEIsRUFBb0M7QUFDbENwRixpQkFBTyxLQUFLMUYsTUFBTCxDQUFZOEssa0JBQW5CLEVBQXVDLEtBQUtoTCxNQUE1QyxFQUFvRCxFQUFDb0wsUUFBUUEsTUFBVCxFQUFwRDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxZQUFJLEtBQUtsTCxNQUFMLENBQVkwSyxrQkFBaEIsRUFBb0M7QUFDbEMsY0FBSVMsWUFBWWxSLE9BQU9pUixNQUF2QjtBQUNBalIsaUJBQU9pUixNQUFQLEdBQWdCQSxNQUFoQjtBQUNBLGNBQUk1RyxRQUFKLENBQWEsS0FBS3RFLE1BQUwsQ0FBWTBLLGtCQUF6QixJQUhrQyxDQUdjO0FBQ2hEelEsaUJBQU9pUixNQUFQLEdBQWdCQyxTQUFoQjtBQUNEO0FBQ0Q7QUFDRCxPQXBEeUI7O0FBc0QxQjVLLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtKLG9CQUFMOztBQUVBLGFBQUtKLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxhQUFLRCxNQUFMLEdBQWMsSUFBZDs7QUFFQSxhQUFLMEssY0FBTDtBQUNEO0FBN0R5QixLQUFiLENBQWY7QUErREE5SixlQUFXQyxLQUFYLENBQWlCNEosUUFBakI7O0FBRUEsV0FBT0EsUUFBUDtBQUNELEdBcEUwQixDQUEzQjtBQXFFRCxDQTFFRDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFFQW5RLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCc0YsT0FBeEIsQ0FBZ0MsYUFBaEMsRUFBK0MsQ0FBQyxRQUFELEVBQVcsVUFBUzlELE1BQVQsRUFBaUI7O0FBRXpFLFFBQUl1UCxjQUFjbFIsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFN0I7Ozs7O0FBS0FjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtDLE1BQUwsQ0FBWW5FLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsS0FBSzRFLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixJQUFuQixDQUE1Qjs7QUFFQSxhQUFLTCxxQkFBTCxHQUE2QnBFLE9BQU9xRSxhQUFQLENBQXFCLElBQXJCLEVBQTJCLEtBQUtILFFBQUwsQ0FBYyxDQUFkLENBQTNCLEVBQTZDLENBQ3hFLE1BRHdFLEVBQ2hFLE1BRGdFLENBQTdDLENBQTdCOztBQUlBLGFBQUtJLG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEIsS0FBS0wsUUFBTCxDQUFjLENBQWQsQ0FBMUIsRUFBNEMsQ0FDdEUsU0FEc0UsRUFFdEUsVUFGc0UsRUFHdEUsU0FIc0UsRUFJdEUsVUFKc0UsQ0FBNUMsRUFLekIsVUFBU00sTUFBVCxFQUFpQjtBQUNsQixjQUFJQSxPQUFPaEIsT0FBWCxFQUFvQjtBQUNsQmdCLG1CQUFPaEIsT0FBUCxHQUFpQixJQUFqQjtBQUNEO0FBQ0QsaUJBQU9nQixNQUFQO0FBQ0QsU0FMRSxDQUtEQyxJQUxDLENBS0ksSUFMSixDQUx5QixDQUE1QjtBQVdELE9BN0I0Qjs7QUErQjdCQyxnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjs7QUFFQSxhQUFLUCxxQkFBTDtBQUNBLGFBQUtFLG9CQUFMOztBQUVBLGFBQUtKLFFBQUwsQ0FBY1UsTUFBZDs7QUFFQSxhQUFLVixRQUFMLEdBQWdCLEtBQUtELE1BQUwsR0FBYyxJQUE5QjtBQUNEO0FBeEM0QixLQUFiLENBQWxCOztBQTJDQVksZUFBV0MsS0FBWCxDQUFpQnlLLFdBQWpCO0FBQ0F2UCxXQUFPK0UsMkJBQVAsQ0FBbUN3SyxXQUFuQyxFQUFnRCxDQUFDLFlBQUQsRUFBZSxVQUFmLEVBQTJCLG9CQUEzQixDQUFoRDs7QUFHQSxXQUFPQSxXQUFQO0FBQ0QsR0FsRDhDLENBQS9DO0FBbURELENBdEREOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBaFIsUUFBUUMsTUFBUixDQUFlLE9BQWYsRUFDR3VCLEtBREgsQ0FDUyxpQkFEVCxFQUM0QmxCLElBQUl5QixTQUFKLENBQWNrUCxlQUQxQyxFQUVHelAsS0FGSCxDQUVTLHFCQUZULEVBRWdDbEIsSUFBSXlCLFNBQUosQ0FBY21QLG1CQUY5Qzs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFDQSxNQUFJalIsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBT3NGLE9BQVAsQ0FBZSxjQUFmLEVBQStCLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsVUFBUzlELE1BQVQsRUFBaUI2SixNQUFqQixFQUF5Qjs7QUFFM0UsUUFBSTZGLGVBQWVyUixNQUFNcEIsTUFBTixDQUFhOztBQUU5QmMsWUFBTSxjQUFTbUUsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUFBOztBQUNwQyxhQUFLRSxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLMEMsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtpQyxNQUFMLEdBQWNILEtBQWQ7O0FBRUEsYUFBS00sb0JBQUwsR0FBNEJ0RSxPQUFPdUUsWUFBUCxDQUFvQixJQUFwQixFQUEwQixLQUFLTCxRQUFMLENBQWMsQ0FBZCxDQUExQixFQUE0QyxDQUN0RSxhQURzRSxDQUE1QyxFQUV6QixrQkFBVTtBQUNYLGNBQUlNLE9BQU9tTCxRQUFYLEVBQXFCO0FBQ25CbkwsbUJBQU9tTCxRQUFQO0FBQ0Q7QUFDRCxpQkFBT25MLE1BQVA7QUFDRCxTQVAyQixDQUE1Qjs7QUFTQSxhQUFLa0csRUFBTCxDQUFRLGFBQVIsRUFBdUI7QUFBQSxpQkFBTSxNQUFLekcsTUFBTCxDQUFZbEIsVUFBWixFQUFOO0FBQUEsU0FBdkI7O0FBRUEsYUFBS21CLFFBQUwsQ0FBYyxDQUFkLEVBQWlCMEwsUUFBakIsR0FBNEIsZ0JBQVE7QUFDbEMsY0FBSSxNQUFLekwsTUFBTCxDQUFZMEwsUUFBaEIsRUFBMEI7QUFDeEIsa0JBQUs1TCxNQUFMLENBQVlvRCxLQUFaLENBQWtCLE1BQUtsRCxNQUFMLENBQVkwTCxRQUE5QixFQUF3QyxFQUFDQyxPQUFPbk0sSUFBUixFQUF4QztBQUNELFdBRkQsTUFFTztBQUNMLGtCQUFLaU0sUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNqTSxJQUFkLENBQWhCLEdBQXNDQSxNQUF0QztBQUNEO0FBQ0YsU0FORDs7QUFRQSxhQUFLTSxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7QUFDRCxPQTNCNkI7O0FBNkI5QkMsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7O0FBRUEsYUFBS0wsb0JBQUw7O0FBRUEsYUFBS0osUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLElBQTVDO0FBQ0Q7QUFuQzZCLEtBQWIsQ0FBbkI7O0FBc0NBVSxlQUFXQyxLQUFYLENBQWlCNEssWUFBakI7QUFDQTFQLFdBQU8rRSwyQkFBUCxDQUFtQzJLLFlBQW5DLEVBQWlELENBQUMsT0FBRCxFQUFVLGNBQVYsRUFBMEIsUUFBMUIsRUFBb0MsaUJBQXBDLEVBQXVELFVBQXZELENBQWpEOztBQUVBLFdBQU9BLFlBQVA7QUFDRCxHQTVDOEIsQ0FBL0I7QUE2Q0QsQ0FqREQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSWxSLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUseUJBQWYsRUFBMEMsQ0FBQyxxQkFBRCxFQUF3QixVQUFTdUgsbUJBQVQsRUFBOEI7O0FBRTlGLFFBQUkwRSwwQkFBMEIxRSxvQkFBb0JwTyxNQUFwQixDQUEyQjs7QUFFdkR1TyxnQkFBVSxLQUY2QztBQUd2RHRILGdCQUFVakQsU0FINkM7QUFJdkR3SyxpQkFBV3hLLFNBSjRDO0FBS3ZEeUssaUJBQVd6SyxTQUw0QztBQU12RDBLLGNBQVExSyxTQU4rQzs7QUFRdkQ7Ozs7Ozs7O0FBUUEySyxhQUFPLGVBQVNySyxPQUFULEVBQWtCc0ssUUFBbEIsRUFBNEJDLFFBQTVCLEVBQXNDbkosT0FBdEMsRUFBK0M7QUFDcERBLGtCQUFVQSxXQUFXLEVBQXJCOztBQUVBLGFBQUt1QixRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLbUssU0FBTCxHQUFpQkcsUUFBakI7QUFDQSxhQUFLSixTQUFMLEdBQWlCSyxRQUFqQjs7QUFFQSxhQUFLTixRQUFMLEdBQWdCLENBQUMsQ0FBQzdJLFFBQVFxSixPQUExQjtBQUNBLGFBQUtMLE1BQUwsR0FBY2hKLFFBQVFvSixLQUFSLElBQWlCLEtBQS9COztBQUVBRCxpQkFBU0csR0FBVCxDQUFhO0FBQ1hGLGlCQUFPcEosUUFBUW9KLEtBREo7QUFFWEcsbUJBQVM7QUFGRSxTQUFiOztBQUtBLFlBQUksS0FBS1YsUUFBVCxFQUFtQjtBQUNqQk0sbUJBQVNHLEdBQVQsQ0FBYTtBQUNYRyxtQkFBTyxNQUFNekosUUFBUW9KLEtBRFY7QUFFWE0sa0JBQU07QUFGSyxXQUFiO0FBSUQsU0FMRCxNQUtPO0FBQ0xQLG1CQUFTRyxHQUFULENBQWE7QUFDWEcsbUJBQU8sTUFESTtBQUVYQyxrQkFBTSxNQUFNMUosUUFBUW9KO0FBRlQsV0FBYjtBQUlEO0FBQ0YsT0ExQ3NEOztBQTRDdkQ7Ozs7O0FBS0FZLGlCQUFXLG1CQUFTaEssT0FBVCxFQUFrQjtBQUMzQixhQUFLOEksU0FBTCxDQUFlUSxHQUFmLENBQW1CLE9BQW5CLEVBQTRCdEosUUFBUW9KLEtBQXBDOztBQUVBLFlBQUksS0FBS1AsUUFBVCxFQUFtQjtBQUNqQixlQUFLQyxTQUFMLENBQWVRLEdBQWYsQ0FBbUI7QUFDakJHLG1CQUFPLE1BQU16SixRQUFRb0osS0FESjtBQUVqQk0sa0JBQU07QUFGVyxXQUFuQjtBQUlELFNBTEQsTUFLTztBQUNMLGVBQUtaLFNBQUwsQ0FBZVEsR0FBZixDQUFtQjtBQUNqQkcsbUJBQU8sTUFEVTtBQUVqQkMsa0JBQU0sTUFBTTFKLFFBQVFvSjtBQUZILFdBQW5CO0FBSUQ7O0FBRUQsWUFBSXBKLFFBQVFpSyxRQUFaLEVBQXNCO0FBQ3BCLGNBQUlDLE1BQU0sS0FBS3BCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCcUIsV0FBNUI7QUFDQSxjQUFJa0Qsb0JBQW9CLEtBQUtDLDJCQUFMLENBQWlDcEQsR0FBakMsQ0FBeEI7QUFDQSxjQUFJa0IsZ0JBQWdCLEtBQUttQyx3QkFBTCxDQUE4QnJELEdBQTlCLENBQXBCOztBQUVBaE8sY0FBSW9PLE1BQUosQ0FBVyxLQUFLdkIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUE4QndCLEtBQTlCLENBQW9DLEVBQUNzQixXQUFXd0IsaUJBQVosRUFBcEMsRUFBb0U3QyxJQUFwRTtBQUNBdE8sY0FBSW9PLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUE4QnlCLEtBQTlCLENBQW9DYSxhQUFwQyxFQUFtRFosSUFBbkQ7QUFDRDtBQUNGLE9BeEVzRDs7QUEwRXZEOztBQUVBckcsZUFBUyxtQkFBVztBQUNsQixhQUFLNEUsU0FBTCxDQUFlMEIsVUFBZixDQUEwQixPQUExQjtBQUNBLGFBQUszQixTQUFMLENBQWUyQixVQUFmLENBQTBCLE9BQTFCOztBQUVBLGFBQUtsSixRQUFMLEdBQWdCLEtBQUt3SCxTQUFMLEdBQWlCLEtBQUtELFNBQUwsR0FBaUIsSUFBbEQ7QUFDRCxPQWpGc0Q7O0FBbUZ2RDs7OztBQUlBNEIsZ0JBQVUsa0JBQVM5SyxRQUFULEVBQW1CK0ssT0FBbkIsRUFBNEI7QUFDcEMsWUFBSUMsV0FBV0QsWUFBWSxJQUFaLEdBQW1CLEdBQW5CLEdBQXlCLEtBQUtDLFFBQTdDO0FBQ0EsWUFBSUMsUUFBUUYsWUFBWSxJQUFaLEdBQW1CLEdBQW5CLEdBQXlCLEtBQUtFLEtBQTFDOztBQUVBLGFBQUsvQixTQUFMLENBQWVRLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEIsT0FBOUI7O0FBRUEsWUFBSVksTUFBTSxLQUFLcEIsU0FBTCxDQUFlLENBQWYsRUFBa0JxQixXQUE1Qjs7QUFFQSxZQUFJcUQsaUJBQWlCLEtBQUtGLDJCQUFMLENBQWlDcEQsR0FBakMsQ0FBckI7QUFDQSxZQUFJdUQsY0FBYyxLQUFLRix3QkFBTCxDQUE4QnJELEdBQTlCLENBQWxCOztBQUVBYyxtQkFBVyxZQUFXOztBQUVwQjlPLGNBQUlvTyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR2tDLElBREgsQ0FDUUosS0FEUixFQUVHTixLQUZILENBRVM7QUFDTHNCLHVCQUFXMkI7QUFETixXQUZULEVBSUs7QUFDRDVDLHNCQUFVQSxRQURUO0FBRURNLG9CQUFRLEtBQUtBO0FBRlosV0FKTCxFQVFHWCxLQVJILENBUVMsVUFBU3ZKLElBQVQsRUFBZTtBQUNwQnBCO0FBQ0FvQjtBQUNELFdBWEgsRUFZR3dKLElBWkg7O0FBY0F0TyxjQUFJb08sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0dtQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTa0QsV0FGVCxFQUVzQjtBQUNsQjdDLHNCQUFVQSxRQURRO0FBRWxCTSxvQkFBUSxLQUFLQTtBQUZLLFdBRnRCLEVBTUdWLElBTkg7QUFRRCxTQXhCVSxDQXdCVDFJLElBeEJTLENBd0JKLElBeEJJLENBQVgsRUF3QmMsT0FBTyxFQXhCckI7QUF5QkQsT0EzSHNEOztBQTZIdkQ7Ozs7QUFJQXFKLGlCQUFXLG1CQUFTdkwsUUFBVCxFQUFtQitLLE9BQW5CLEVBQTRCO0FBQ3JDLFlBQUlDLFdBQVdELFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLQyxRQUE3QztBQUNBLFlBQUlDLFFBQVFGLFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLRSxLQUExQzs7QUFFQSxZQUFJMkMsaUJBQWlCLEtBQUtGLDJCQUFMLENBQWlDLENBQWpDLENBQXJCO0FBQ0EsWUFBSUcsY0FBYyxLQUFLRix3QkFBTCxDQUE4QixDQUE5QixDQUFsQjs7QUFFQXZDLG1CQUFXLFlBQVc7O0FBRXBCOU8sY0FBSW9PLE1BQUosQ0FBVyxLQUFLdkIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHa0MsSUFESCxDQUNRSixLQURSLEVBRUdOLEtBRkgsQ0FFUztBQUNMc0IsdUJBQVcyQjtBQUROLFdBRlQsRUFJSztBQUNENUMsc0JBQVVBLFFBRFQ7QUFFRE0sb0JBQVEsS0FBS0E7QUFGWixXQUpMLEVBUUdYLEtBUkgsQ0FRUztBQUNMc0IsdUJBQVc7QUFETixXQVJULEVBV0d0QixLQVhILENBV1MsVUFBU3ZKLElBQVQsRUFBZTtBQUNwQixpQkFBSzhILFNBQUwsQ0FBZVEsR0FBZixDQUFtQixTQUFuQixFQUE4QixNQUE5QjtBQUNBMUo7QUFDQW9CO0FBQ0QsV0FKTSxDQUlMYyxJQUpLLENBSUEsSUFKQSxDQVhULEVBZ0JHMEksSUFoQkg7O0FBa0JBdE8sY0FBSW9PLE1BQUosQ0FBVyxLQUFLeEIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUNHbUMsSUFESCxDQUNRSixLQURSLEVBRUdOLEtBRkgsQ0FFU2tELFdBRlQsRUFFc0I7QUFDbEI3QyxzQkFBVUEsUUFEUTtBQUVsQk0sb0JBQVEsS0FBS0E7QUFGSyxXQUZ0QixFQU1HWCxLQU5ILENBTVMsVUFBU3ZKLElBQVQsRUFBZTtBQUNwQkE7QUFDRCxXQVJILEVBU0d3SixJQVRIO0FBV0QsU0EvQlUsQ0ErQlQxSSxJQS9CUyxDQStCSixJQS9CSSxDQUFYLEVBK0JjLE9BQU8sRUEvQnJCO0FBZ0NELE9BeEtzRDs7QUEwS3ZEOzs7OztBQUtBdUoscUJBQWUsdUJBQVNyTCxPQUFULEVBQWtCOztBQUUvQixhQUFLOEksU0FBTCxDQUFlUSxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE9BQTlCOztBQUVBLFlBQUlrRSxpQkFBaUIsS0FBS0YsMkJBQUwsQ0FBaUNoQyxLQUFLQyxHQUFMLENBQVN2TCxRQUFRd0wsV0FBakIsRUFBOEJ4TCxRQUFReUwsUUFBdEMsQ0FBakMsQ0FBckI7QUFDQSxZQUFJZ0MsY0FBYyxLQUFLRix3QkFBTCxDQUE4QmpDLEtBQUtDLEdBQUwsQ0FBU3ZMLFFBQVF3TCxXQUFqQixFQUE4QnhMLFFBQVF5TCxRQUF0QyxDQUE5QixDQUFsQjs7QUFFQXZQLFlBQUlvTyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR3dCLEtBREgsQ0FDUyxFQUFDc0IsV0FBVzJCLGNBQVosRUFEVCxFQUVHaEQsSUFGSDs7QUFJQXRPLFlBQUlvTyxNQUFKLENBQVcsS0FBS3hCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR3lCLEtBREgsQ0FDU2tELFdBRFQsRUFFR2pELElBRkg7QUFHRCxPQTdMc0Q7O0FBK0x2RDhDLG1DQUE2QixxQ0FBUzdCLFFBQVQsRUFBbUI7QUFDOUMsWUFBSUcsSUFBSSxLQUFLL0MsUUFBTCxHQUFnQixDQUFDNEMsUUFBakIsR0FBNEJBLFFBQXBDO0FBQ0EsWUFBSStCLGlCQUFpQixpQkFBaUI1QixDQUFqQixHQUFxQixXQUExQzs7QUFFQSxlQUFPNEIsY0FBUDtBQUNELE9BcE1zRDs7QUFzTXZERCxnQ0FBMEIsa0NBQVM5QixRQUFULEVBQW1CO0FBQzNDLFlBQUlpQyxVQUFVLEtBQUs3RSxRQUFMLEdBQWdCLENBQUM0QyxRQUFqQixHQUE0QkEsUUFBMUM7QUFDQSxZQUFJa0Msa0JBQWtCLGlCQUFpQkQsT0FBakIsR0FBMkIsV0FBakQ7O0FBRUEsZUFBTztBQUNMN0IscUJBQVc4QjtBQUROLFNBQVA7QUFHRCxPQTdNc0Q7O0FBK012RDdCLFlBQU0sZ0JBQVc7QUFDZixlQUFPLElBQUlzQix1QkFBSixFQUFQO0FBQ0Q7QUFqTnNELEtBQTNCLENBQTlCOztBQW9OQSxXQUFPQSx1QkFBUDtBQUNELEdBdk55QyxDQUExQztBQXlORCxDQTdORDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVc7QUFDVjs7QUFDQSxNQUFJdlIsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBT3NGLE9BQVAsQ0FBZSwyQkFBZixFQUE0QyxDQUFDLHFCQUFELEVBQXdCLFVBQVN1SCxtQkFBVCxFQUE4Qjs7QUFFaEcsUUFBSWtGLDRCQUE0QmxGLG9CQUFvQnBPLE1BQXBCLENBQTJCOztBQUV6RHNPLGtCQUFZdEssU0FGNkM7O0FBSXpEdUssZ0JBQVUsS0FKK0M7O0FBTXpEQyxpQkFBV3hLLFNBTjhDO0FBT3pEaUQsZ0JBQVVqRCxTQVArQztBQVF6RHlLLGlCQUFXekssU0FSOEM7O0FBVXpEOzs7Ozs7OztBQVFBMkssYUFBTyxlQUFTckssT0FBVCxFQUFrQnNLLFFBQWxCLEVBQTRCQyxRQUE1QixFQUFzQ25KLE9BQXRDLEVBQStDO0FBQ3BELGFBQUt1QixRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLa0ssU0FBTCxHQUFpQkssUUFBakI7QUFDQSxhQUFLSixTQUFMLEdBQWlCRyxRQUFqQjtBQUNBLGFBQUtMLFFBQUwsR0FBZ0IsQ0FBQyxDQUFDN0ksUUFBUXFKLE9BQTFCO0FBQ0EsYUFBS0wsTUFBTCxHQUFjaEosUUFBUW9KLEtBQVIsSUFBaUIsS0FBL0I7O0FBRUFGLGlCQUFTSSxHQUFULENBQWE7QUFDWHVFLHFCQUFXO0FBREEsU0FBYjs7QUFJQTFFLGlCQUFTRyxHQUFULENBQWE7QUFDWEYsaUJBQU9wSixRQUFRb0osS0FESjtBQUVYc0MsbUJBQVMsR0FGRTtBQUdYbkMsbUJBQVM7QUFIRSxTQUFiOztBQU1BLFlBQUksS0FBS1YsUUFBVCxFQUFtQjtBQUNqQk0sbUJBQVNHLEdBQVQsQ0FBYTtBQUNYRyxtQkFBTyxLQURJO0FBRVhDLGtCQUFNO0FBRkssV0FBYjtBQUlELFNBTEQsTUFLTztBQUNMUCxtQkFBU0csR0FBVCxDQUFhO0FBQ1hHLG1CQUFPLE1BREk7QUFFWEMsa0JBQU07QUFGSyxXQUFiO0FBSUQ7O0FBRUQsYUFBS2QsVUFBTCxHQUFrQmhOLFFBQVFnRCxPQUFSLENBQWdCLGFBQWhCLEVBQStCMEssR0FBL0IsQ0FBbUM7QUFDbkRLLDJCQUFpQixPQURrQztBQUVuREMsZUFBSyxLQUY4QztBQUduREYsZ0JBQU0sS0FINkM7QUFJbkRELGlCQUFPLEtBSjRDO0FBS25ESSxrQkFBUSxLQUwyQztBQU1uREMsb0JBQVUsVUFOeUM7QUFPbkRQLG1CQUFTO0FBUDBDLFNBQW5DLENBQWxCOztBQVVBM0ssZ0JBQVFtTCxPQUFSLENBQWdCLEtBQUtuQixVQUFyQjs7QUFFQTtBQUNBMU0sWUFBSW9PLE1BQUosQ0FBV3BCLFNBQVMsQ0FBVCxDQUFYLEVBQXdCcUIsS0FBeEIsQ0FBOEIsRUFBQ3NCLFdBQVcsc0JBQVosRUFBOUIsRUFBbUVyQixJQUFuRTtBQUNELE9BN0R3RDs7QUErRHpEOzs7OztBQUtBUixpQkFBVyxtQkFBU2hLLE9BQVQsRUFBa0I7QUFDM0IsYUFBS2dKLE1BQUwsR0FBY2hKLFFBQVFvSixLQUF0QjtBQUNBLGFBQUtOLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixPQUFuQixFQUE0QixLQUFLTixNQUFqQzs7QUFFQSxZQUFJaEosUUFBUWlLLFFBQVosRUFBc0I7QUFDcEIsY0FBSUMsTUFBTSxLQUFLcEIsU0FBTCxDQUFlLENBQWYsRUFBa0JxQixXQUE1Qjs7QUFFQSxjQUFJcUQsaUJBQWlCLEtBQUtGLDJCQUFMLENBQWlDcEQsR0FBakMsQ0FBckI7QUFDQSxjQUFJdUQsY0FBYyxLQUFLRix3QkFBTCxDQUE4QnJELEdBQTlCLENBQWxCOztBQUVBaE8sY0FBSW9PLE1BQUosQ0FBVyxLQUFLdkIsU0FBTCxDQUFlLENBQWYsQ0FBWCxFQUE4QndCLEtBQTlCLENBQW9DLEVBQUNzQixXQUFXMkIsY0FBWixFQUFwQyxFQUFpRWhELElBQWpFO0FBQ0F0TyxjQUFJb08sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQThCeUIsS0FBOUIsQ0FBb0NrRCxXQUFwQyxFQUFpRGpELElBQWpEO0FBQ0Q7QUFDRixPQWpGd0Q7O0FBbUZ6RDs7Ozs7QUFLQXJHLGVBQVMsbUJBQVc7QUFDbEIsWUFBSSxLQUFLeUUsVUFBVCxFQUFxQjtBQUNuQixlQUFLQSxVQUFMLENBQWdCM0csTUFBaEI7QUFDQSxlQUFLMkcsVUFBTCxHQUFrQixJQUFsQjtBQUNEOztBQUVELFlBQUksS0FBS0csU0FBVCxFQUFvQjtBQUNsQixlQUFLQSxTQUFMLENBQWV0RCxJQUFmLENBQW9CLE9BQXBCLEVBQTZCLEVBQTdCO0FBQ0Q7O0FBRUQsWUFBSSxLQUFLcUQsU0FBVCxFQUFvQjtBQUNsQixlQUFLQSxTQUFMLENBQWVyRCxJQUFmLENBQW9CLE9BQXBCLEVBQTZCLEVBQTdCO0FBQ0Q7O0FBRUQsYUFBS3NELFNBQUwsR0FBaUIsS0FBS0QsU0FBTCxHQUFpQixLQUFLdkgsUUFBTCxHQUFnQmpELFNBQWxEO0FBQ0QsT0F2R3dEOztBQXlHekQ7Ozs7QUFJQW9NLGdCQUFVLGtCQUFTOUssUUFBVCxFQUFtQitLLE9BQW5CLEVBQTRCO0FBQ3BDLFlBQUlDLFdBQVdELFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLQyxRQUE3QztBQUNBLFlBQUlDLFFBQVFGLFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLRSxLQUExQzs7QUFFQSxhQUFLL0IsU0FBTCxDQUFlUSxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE9BQTlCO0FBQ0EsYUFBS1YsVUFBTCxDQUFnQlUsR0FBaEIsQ0FBb0IsU0FBcEIsRUFBK0IsT0FBL0I7O0FBRUEsWUFBSVksTUFBTSxLQUFLcEIsU0FBTCxDQUFlLENBQWYsRUFBa0JxQixXQUE1Qjs7QUFFQSxZQUFJcUQsaUJBQWlCLEtBQUtGLDJCQUFMLENBQWlDcEQsR0FBakMsQ0FBckI7QUFDQSxZQUFJdUQsY0FBYyxLQUFLRix3QkFBTCxDQUE4QnJELEdBQTlCLENBQWxCOztBQUVBYyxtQkFBVyxZQUFXOztBQUVwQjlPLGNBQUlvTyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR2tDLElBREgsQ0FDUUosS0FEUixFQUVHTixLQUZILENBRVM7QUFDTHNCLHVCQUFXMkI7QUFETixXQUZULEVBSUs7QUFDRDVDLHNCQUFVQSxRQURUO0FBRURNLG9CQUFRLEtBQUtBO0FBRlosV0FKTCxFQVFHWCxLQVJILENBUVMsVUFBU3ZKLElBQVQsRUFBZTtBQUNwQnBCO0FBQ0FvQjtBQUNELFdBWEgsRUFZR3dKLElBWkg7O0FBY0F0TyxjQUFJb08sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0dtQyxJQURILENBQ1FKLEtBRFIsRUFFR04sS0FGSCxDQUVTa0QsV0FGVCxFQUVzQjtBQUNsQjdDLHNCQUFVQSxRQURRO0FBRWxCTSxvQkFBUSxLQUFLQTtBQUZLLFdBRnRCLEVBTUdWLElBTkg7QUFRRCxTQXhCVSxDQXdCVDFJLElBeEJTLENBd0JKLElBeEJJLENBQVgsRUF3QmMsT0FBTyxFQXhCckI7QUF5QkQsT0FsSndEOztBQW9KekQ7Ozs7QUFJQXFKLGlCQUFXLG1CQUFTdkwsUUFBVCxFQUFtQitLLE9BQW5CLEVBQTRCO0FBQ3JDLFlBQUlDLFdBQVdELFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLQyxRQUE3QztBQUNBLFlBQUlDLFFBQVFGLFlBQVksSUFBWixHQUFtQixHQUFuQixHQUF5QixLQUFLRSxLQUExQzs7QUFFQSxhQUFLakMsVUFBTCxDQUFnQlUsR0FBaEIsQ0FBb0IsU0FBcEIsRUFBK0IsT0FBL0I7O0FBRUEsWUFBSWtFLGlCQUFpQixLQUFLRiwyQkFBTCxDQUFpQyxDQUFqQyxDQUFyQjtBQUNBLFlBQUlHLGNBQWMsS0FBS0Ysd0JBQUwsQ0FBOEIsQ0FBOUIsQ0FBbEI7O0FBRUF2QyxtQkFBVyxZQUFXOztBQUVwQjlPLGNBQUlvTyxNQUFKLENBQVcsS0FBS3ZCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR2tDLElBREgsQ0FDUUosS0FEUixFQUVHTixLQUZILENBRVM7QUFDTHNCLHVCQUFXMkI7QUFETixXQUZULEVBSUs7QUFDRDVDLHNCQUFVQSxRQURUO0FBRURNLG9CQUFRLEtBQUtBO0FBRlosV0FKTCxFQVFHWCxLQVJILENBUVM7QUFDTHNCLHVCQUFXO0FBRE4sV0FSVCxFQVdHdEIsS0FYSCxDQVdTLFVBQVN2SixJQUFULEVBQWU7QUFDcEIsaUJBQUs4SCxTQUFMLENBQWVRLEdBQWYsQ0FBbUIsU0FBbkIsRUFBOEIsTUFBOUI7QUFDQTFKO0FBQ0FvQjtBQUNELFdBSk0sQ0FJTGMsSUFKSyxDQUlBLElBSkEsQ0FYVCxFQWdCRzBJLElBaEJIOztBQWtCQXRPLGNBQUlvTyxNQUFKLENBQVcsS0FBS3hCLFNBQUwsQ0FBZSxDQUFmLENBQVgsRUFDR21DLElBREgsQ0FDUUosS0FEUixFQUVHTixLQUZILENBRVNrRCxXQUZULEVBRXNCO0FBQ2xCN0Msc0JBQVVBLFFBRFE7QUFFbEJNLG9CQUFRLEtBQUtBO0FBRkssV0FGdEIsRUFNR1gsS0FOSCxDQU1TLFVBQVN2SixJQUFULEVBQWU7QUFDcEJBO0FBQ0QsV0FSSCxFQVNHd0osSUFUSDtBQVdELFNBL0JVLENBK0JUMUksSUEvQlMsQ0ErQkosSUEvQkksQ0FBWCxFQStCYyxPQUFPLEVBL0JyQjtBQWdDRCxPQWpNd0Q7O0FBbU16RDs7Ozs7QUFLQXVKLHFCQUFlLHVCQUFTckwsT0FBVCxFQUFrQjs7QUFFL0IsYUFBSzhJLFNBQUwsQ0FBZVEsR0FBZixDQUFtQixTQUFuQixFQUE4QixPQUE5QjtBQUNBLGFBQUtWLFVBQUwsQ0FBZ0JVLEdBQWhCLENBQW9CLFNBQXBCLEVBQStCLE9BQS9COztBQUVBLFlBQUlrRSxpQkFBaUIsS0FBS0YsMkJBQUwsQ0FBaUNoQyxLQUFLQyxHQUFMLENBQVN2TCxRQUFRd0wsV0FBakIsRUFBOEJ4TCxRQUFReUwsUUFBdEMsQ0FBakMsQ0FBckI7QUFDQSxZQUFJZ0MsY0FBYyxLQUFLRix3QkFBTCxDQUE4QmpDLEtBQUtDLEdBQUwsQ0FBU3ZMLFFBQVF3TCxXQUFqQixFQUE4QnhMLFFBQVF5TCxRQUF0QyxDQUE5QixDQUFsQjtBQUNBLGVBQU9nQyxZQUFZL0IsT0FBbkI7O0FBRUF4UCxZQUFJb08sTUFBSixDQUFXLEtBQUt2QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0d3QixLQURILENBQ1MsRUFBQ3NCLFdBQVcyQixjQUFaLEVBRFQsRUFFR2hELElBRkg7O0FBSUF0TyxZQUFJb08sTUFBSixDQUFXLEtBQUt4QixTQUFMLENBQWUsQ0FBZixDQUFYLEVBQ0d5QixLQURILENBQ1NrRCxXQURULEVBRUdqRCxJQUZIO0FBR0QsT0F4TndEOztBQTBOekQ4QyxtQ0FBNkIscUNBQVM3QixRQUFULEVBQW1CO0FBQzlDLFlBQUlHLElBQUksS0FBSy9DLFFBQUwsR0FBZ0IsQ0FBQzRDLFFBQWpCLEdBQTRCQSxRQUFwQztBQUNBLFlBQUkrQixpQkFBaUIsaUJBQWlCNUIsQ0FBakIsR0FBcUIsV0FBMUM7O0FBRUEsZUFBTzRCLGNBQVA7QUFDRCxPQS9Od0Q7O0FBaU96REQsZ0NBQTBCLGtDQUFTOUIsUUFBVCxFQUFtQjtBQUMzQyxZQUFJdkIsTUFBTSxLQUFLcEIsU0FBTCxDQUFlLENBQWYsRUFBa0JnRixxQkFBbEIsR0FBMEMxRSxLQUFwRDs7QUFFQSxZQUFJMkUsaUJBQWlCLENBQUN0QyxXQUFXdkIsR0FBWixJQUFtQkEsR0FBbkIsR0FBeUIsRUFBOUM7QUFDQTZELHlCQUFpQkMsTUFBTUQsY0FBTixJQUF3QixDQUF4QixHQUE0QnpDLEtBQUtwQixHQUFMLENBQVNvQixLQUFLQyxHQUFMLENBQVN3QyxjQUFULEVBQXlCLENBQXpCLENBQVQsRUFBc0MsQ0FBQyxFQUF2QyxDQUE3Qzs7QUFFQSxZQUFJTCxVQUFVLEtBQUs3RSxRQUFMLEdBQWdCLENBQUNrRixjQUFqQixHQUFrQ0EsY0FBaEQ7QUFDQSxZQUFJSixrQkFBa0IsaUJBQWlCRCxPQUFqQixHQUEyQixVQUFqRDtBQUNBLFlBQUloQyxVQUFVLElBQUlxQyxpQkFBaUIsR0FBbkM7O0FBRUEsZUFBTztBQUNMbEMscUJBQVc4QixlQUROO0FBRUxqQyxtQkFBU0E7QUFGSixTQUFQO0FBSUQsT0EvT3dEOztBQWlQekRJLFlBQU0sZ0JBQVc7QUFDZixlQUFPLElBQUk4Qix5QkFBSixFQUFQO0FBQ0Q7QUFuUHdELEtBQTNCLENBQWhDOztBQXNQQSxXQUFPQSx5QkFBUDtBQUNELEdBelAyQyxDQUE1QztBQTJQRCxDQS9QRDs7O0FDakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVc7QUFDVjs7QUFDQSxNQUFJL1IsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQSxNQUFJb1MsdUJBQXVCdlMsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFdEM7OztBQUdBNFQsZUFBVyxDQUwyQjs7QUFPdEM7OztBQUdBQyxrQkFBYzdQLFNBVndCOztBQVl0Qzs7OztBQUlBbEQsVUFBTSxjQUFTNEUsT0FBVCxFQUFrQjtBQUN0QixVQUFJLENBQUNwRSxRQUFRd1MsUUFBUixDQUFpQnBPLFFBQVF3TCxXQUF6QixDQUFMLEVBQTRDO0FBQzFDLGNBQU0sSUFBSXRPLEtBQUosQ0FBVSxvQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsV0FBS21SLGNBQUwsQ0FBb0JyTyxRQUFRd0wsV0FBNUI7QUFDRCxLQXRCcUM7O0FBd0J0Qzs7O0FBR0E2QyxvQkFBZ0Isd0JBQVM3QyxXQUFULEVBQXNCO0FBQ3BDLFVBQUlBLGVBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsY0FBTSxJQUFJdE8sS0FBSixDQUFVLHdDQUFWLENBQU47QUFDRDs7QUFFRCxVQUFJLEtBQUsrTSxRQUFMLEVBQUosRUFBcUI7QUFDbkIsYUFBS2lFLFNBQUwsR0FBaUIxQyxXQUFqQjtBQUNEO0FBQ0QsV0FBSzJDLFlBQUwsR0FBb0IzQyxXQUFwQjtBQUNELEtBcENxQzs7QUFzQ3RDOzs7QUFHQThDLGdCQUFZLHNCQUFXO0FBQ3JCLGFBQU8sQ0FBQyxLQUFLckUsUUFBTCxFQUFELElBQW9CLEtBQUtpRSxTQUFMLElBQWtCLEtBQUtDLFlBQUwsR0FBb0IsQ0FBakU7QUFDRCxLQTNDcUM7O0FBNkN0Qzs7O0FBR0FJLGlCQUFhLHVCQUFXO0FBQ3RCLGFBQU8sQ0FBQyxLQUFLQyxRQUFMLEVBQUQsSUFBb0IsS0FBS04sU0FBTCxHQUFpQixLQUFLQyxZQUFMLEdBQW9CLENBQWhFO0FBQ0QsS0FsRHFDOztBQW9EdENNLGlCQUFhLHFCQUFTek8sT0FBVCxFQUFrQjtBQUM3QixVQUFJLEtBQUtzTyxVQUFMLEVBQUosRUFBdUI7QUFDckIsYUFBS0ksSUFBTCxDQUFVMU8sT0FBVjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUt1TyxXQUFMLEVBQUosRUFBd0I7QUFDN0IsYUFBS0ksS0FBTCxDQUFXM08sT0FBWDtBQUNEO0FBQ0YsS0ExRHFDOztBQTREdEMyTyxXQUFPLGVBQVMzTyxPQUFULEVBQWtCO0FBQ3ZCLFVBQUlKLFdBQVdJLFFBQVFKLFFBQVIsSUFBb0IsWUFBVyxDQUFFLENBQWhEOztBQUVBLFVBQUksQ0FBQyxLQUFLNE8sUUFBTCxFQUFMLEVBQXNCO0FBQ3BCLGFBQUtOLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxhQUFLbE0sSUFBTCxDQUFVLE9BQVYsRUFBbUJoQyxPQUFuQjtBQUNELE9BSEQsTUFHTztBQUNMSjtBQUNEO0FBQ0YsS0FyRXFDOztBQXVFdEM4TyxVQUFNLGNBQVMxTyxPQUFULEVBQWtCO0FBQ3RCLFVBQUlKLFdBQVdJLFFBQVFKLFFBQVIsSUFBb0IsWUFBVyxDQUFFLENBQWhEOztBQUVBLFVBQUksQ0FBQyxLQUFLcUssUUFBTCxFQUFMLEVBQXNCO0FBQ3BCLGFBQUtpRSxTQUFMLEdBQWlCLEtBQUtDLFlBQXRCO0FBQ0EsYUFBS25NLElBQUwsQ0FBVSxNQUFWLEVBQWtCaEMsT0FBbEI7QUFDRCxPQUhELE1BR087QUFDTEo7QUFDRDtBQUNGLEtBaEZxQzs7QUFrRnRDOzs7QUFHQTRPLGNBQVUsb0JBQVc7QUFDbkIsYUFBTyxLQUFLTixTQUFMLEtBQW1CLENBQTFCO0FBQ0QsS0F2RnFDOztBQXlGdEM7OztBQUdBakUsY0FBVSxvQkFBVztBQUNuQixhQUFPLEtBQUtpRSxTQUFMLEtBQW1CLEtBQUtDLFlBQS9CO0FBQ0QsS0E5RnFDOztBQWdHdEM7OztBQUdBUyxVQUFNLGdCQUFXO0FBQ2YsYUFBTyxLQUFLVixTQUFaO0FBQ0QsS0FyR3FDOztBQXVHdEM7OztBQUdBVyxvQkFBZ0IsMEJBQVc7QUFDekIsYUFBTyxLQUFLVixZQUFaO0FBQ0QsS0E1R3FDOztBQThHdEM7OztBQUdBVyxlQUFXLG1CQUFTbEQsQ0FBVCxFQUFZO0FBQ3JCLFdBQUtzQyxTQUFMLEdBQWlCNUMsS0FBS3BCLEdBQUwsQ0FBUyxDQUFULEVBQVlvQixLQUFLQyxHQUFMLENBQVMsS0FBSzRDLFlBQUwsR0FBb0IsQ0FBN0IsRUFBZ0N2QyxDQUFoQyxDQUFaLENBQWpCOztBQUVBLFVBQUk1TCxVQUFVO0FBQ1p5TCxrQkFBVSxLQUFLeUMsU0FESDtBQUVaMUMscUJBQWEsS0FBSzJDO0FBRk4sT0FBZDs7QUFLQSxXQUFLbk0sSUFBTCxDQUFVLFdBQVYsRUFBdUJoQyxPQUF2QjtBQUNELEtBMUhxQzs7QUE0SHRDeUgsWUFBUSxrQkFBVztBQUNqQixVQUFJLEtBQUsrRyxRQUFMLEVBQUosRUFBcUI7QUFDbkIsYUFBS0UsSUFBTDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtDLEtBQUw7QUFDRDtBQUNGO0FBbElxQyxHQUFiLENBQTNCO0FBb0lBek0sYUFBV0MsS0FBWCxDQUFpQjhMLG9CQUFqQjs7QUFFQXBTLFNBQU9zRixPQUFQLENBQWUsaUJBQWYsRUFBa0MsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixRQUF2QixFQUFpQyxrQkFBakMsRUFBcUQscUJBQXJELEVBQTRFLDJCQUE1RSxFQUF5Ryx5QkFBekcsRUFBb0ksNEJBQXBJLEVBQWtLLFVBQVM5RCxNQUFULEVBQWlCWCxRQUFqQixFQUEyQndLLE1BQTNCLEVBQW1DNkgsZ0JBQW5DLEVBQXFEckcsbUJBQXJELEVBQTBFa0YseUJBQTFFLEVBQ3pKUix1QkFEeUosRUFDaEl6RSwwQkFEZ0ksRUFDcEc7O0FBRTlGLFFBQUlxRyxrQkFBa0J0VCxNQUFNcEIsTUFBTixDQUFhO0FBQ2pDZ0gsY0FBUWhELFNBRHlCO0FBRWpDa0QsY0FBUWxELFNBRnlCOztBQUlqQ2lELGdCQUFVakQsU0FKdUI7QUFLakN3SyxpQkFBV3hLLFNBTHNCO0FBTWpDeUssaUJBQVd6SyxTQU5zQjs7QUFRakMyUSxpQkFBVzNRLFNBUnNCOztBQVVqQzRRLG9CQUFjLEtBVm1COztBQVlqQzlULFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsYUFBS0MsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtpQyxNQUFMLEdBQWNILEtBQWQ7QUFDQSxhQUFLRSxRQUFMLEdBQWdCM0MsT0FBaEI7O0FBRUEsYUFBS2tLLFNBQUwsR0FBaUJsTixRQUFRZ0QsT0FBUixDQUFnQkEsUUFBUSxDQUFSLEVBQVdNLGFBQVgsQ0FBeUIsMkJBQXpCLENBQWhCLENBQWpCO0FBQ0EsYUFBSzZKLFNBQUwsR0FBaUJuTixRQUFRZ0QsT0FBUixDQUFnQkEsUUFBUSxDQUFSLEVBQVdNLGFBQVgsQ0FBeUIsMkJBQXpCLENBQWhCLENBQWpCOztBQUVBLGFBQUsrUCxTQUFMLEdBQWlCLElBQUkvUyxJQUFJaVQsU0FBUixFQUFqQjs7QUFFQSxhQUFLRCxZQUFMLEdBQW9CN04sTUFBTStOLElBQU4sS0FBZSxPQUFuQzs7QUFFQTtBQUNBLGFBQUtDLHdCQUFMLEdBQWdDLElBQUluVCxJQUFJb1QsZUFBUixDQUF3QixLQUFLdkcsU0FBTCxDQUFlLENBQWYsQ0FBeEIsQ0FBaEM7QUFDQSxhQUFLd0csV0FBTCxHQUFtQixLQUFLQyxNQUFMLENBQVkxTixJQUFaLENBQWlCLElBQWpCLENBQW5COztBQUVBLFlBQUkwSixjQUFjLEtBQUtpRSw4QkFBTCxFQUFsQjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxJQUFJekIsb0JBQUosQ0FBeUIsRUFBQ3pDLGFBQWFGLEtBQUtwQixHQUFMLENBQVNzQixXQUFULEVBQXNCLENBQXRCLENBQWQsRUFBekIsQ0FBZDtBQUNBLGFBQUtrRSxNQUFMLENBQVkzSCxFQUFaLENBQWUsV0FBZixFQUE0QixLQUFLNEgsVUFBTCxDQUFnQjdOLElBQWhCLENBQXFCLElBQXJCLENBQTVCO0FBQ0EsYUFBSzROLE1BQUwsQ0FBWTNILEVBQVosQ0FBZSxNQUFmLEVBQXVCLFVBQVMvSCxPQUFULEVBQWtCO0FBQ3ZDLGVBQUs0UCxLQUFMLENBQVc1UCxPQUFYO0FBQ0QsU0FGc0IsQ0FFckI4QixJQUZxQixDQUVoQixJQUZnQixDQUF2QjtBQUdBLGFBQUs0TixNQUFMLENBQVkzSCxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFTL0gsT0FBVCxFQUFrQjtBQUN4QyxlQUFLNlAsTUFBTCxDQUFZN1AsT0FBWjtBQUNELFNBRnVCLENBRXRCOEIsSUFGc0IsQ0FFakIsSUFGaUIsQ0FBeEI7O0FBSUFULGNBQU15TyxRQUFOLENBQWUsa0JBQWYsRUFBbUMsS0FBS0MsMEJBQUwsQ0FBZ0NqTyxJQUFoQyxDQUFxQyxJQUFyQyxDQUFuQztBQUNBVCxjQUFNeU8sUUFBTixDQUFlLFdBQWYsRUFBNEIsS0FBS0UsbUJBQUwsQ0FBeUJsTyxJQUF6QixDQUE4QixJQUE5QixDQUE1Qjs7QUFFQSxhQUFLbU8sb0JBQUwsR0FBNEIsS0FBS0MsZUFBTCxDQUFxQnBPLElBQXJCLENBQTBCLElBQTFCLENBQTVCO0FBQ0FyRyxlQUFPcUIsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS21ULG9CQUF2Qzs7QUFFQSxhQUFLRSxpQkFBTCxHQUF5QixLQUFLQyxZQUFMLENBQWtCdE8sSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBekI7QUFDQSxhQUFLdU8sV0FBTDs7QUFFQSxZQUFJaFAsTUFBTTZILFFBQVYsRUFBb0I7QUFDbEIsZUFBS29ILFdBQUwsQ0FBaUJqUCxNQUFNNkgsUUFBdkI7QUFDRDs7QUFFRCxZQUFJN0gsTUFBTThILFFBQVYsRUFBb0I7QUFDbEIsZUFBS29ILFdBQUwsQ0FBaUJsUCxNQUFNOEgsUUFBdkI7QUFDRDs7QUFFRCxhQUFLcUgsd0JBQUwsR0FBZ0N0VSxJQUFJdVUsMkJBQUosQ0FBZ0NDLGFBQWhDLENBQThDLEtBQUtuUCxRQUFMLENBQWMsQ0FBZCxDQUE5QyxFQUFnRSxLQUFLa0wsbUJBQUwsQ0FBeUIzSyxJQUF6QixDQUE4QixJQUE5QixDQUFoRSxDQUFoQzs7QUFFQSxZQUFJNk8sU0FBUyxLQUFLMUIsU0FBTCxDQUFleFMsSUFBZixFQUFiOztBQUVBaEIsZUFBT3VQLFVBQVAsQ0FBa0IsWUFBVztBQUMzQixjQUFJUSxjQUFjLEtBQUtpRSw4QkFBTCxFQUFsQjtBQUNBLGVBQUtDLE1BQUwsQ0FBWXJCLGNBQVosQ0FBMkI3QyxXQUEzQjs7QUFFQSxlQUFLMUMsU0FBTCxDQUFlUSxHQUFmLENBQW1CLEVBQUNvQyxTQUFTLENBQVYsRUFBbkI7O0FBRUEsY0FBSWtGLG1CQUFtQixJQUFJN0IsZ0JBQUosQ0FBcUI7QUFDMUM4Qix1QkFBVzdCLGdCQUFnQjhCLGFBRGU7QUFFMUNDLHVCQUFXckksbUJBRitCO0FBRzFDc0ksMkJBQWUscUJBSDJCO0FBSTFDQyw4QkFBa0I1UCxNQUFNNlAsSUFKa0I7QUFLMUNDLHFDQUF5QmpLLE9BQU83RixNQUFNaUcsZ0JBQWI7QUFMaUIsV0FBckIsQ0FBdkI7QUFPQSxlQUFLOEosU0FBTCxHQUFpQlIsaUJBQWlCUyxXQUFqQixFQUFqQjtBQUNBLGVBQUtELFNBQUwsQ0FBZW5JLEtBQWYsQ0FDRSxLQUFLMUgsUUFEUCxFQUVFLEtBQUt3SCxTQUZQLEVBR0UsS0FBS0QsU0FIUCxFQUlFO0FBQ0VPLHFCQUFTLEtBQUs2RixZQURoQjtBQUVFOUYsbUJBQU8sS0FBSzVILE1BQUwsQ0FBWThQLGdCQUFaLElBQWdDO0FBRnpDLFdBSkY7O0FBVUFYO0FBQ0QsU0F6QmlCLENBeUJoQjdPLElBekJnQixDQXlCWCxJQXpCVyxDQUFsQixFQXlCYyxHQXpCZDs7QUEyQkF2QyxjQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsS0FBSzRFLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixJQUFuQixDQUF0Qjs7QUFFQSxhQUFLSCxvQkFBTCxHQUE0QnRFLE9BQU91RSxZQUFQLENBQW9CLElBQXBCLEVBQTBCaEQsUUFBUSxDQUFSLENBQTFCLEVBQXNDLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsTUFBakIsRUFBeUIsU0FBekIsQ0FBdEMsQ0FBNUI7O0FBRUEsWUFBSSxDQUFDeUMsTUFBTWtRLFNBQVgsRUFBc0I7QUFDcEIsZUFBS0MsWUFBTCxDQUFrQixJQUFsQjtBQUNEO0FBQ0YsT0E3RmdDOztBQStGakNDLGtDQUE0QixzQ0FBVztBQUNyQyxlQUFPLEtBQUtqQix3QkFBWjtBQUNELE9BakdnQzs7QUFtR2pDL0QsMkJBQXFCLDZCQUFTeEUsS0FBVCxFQUFnQjtBQUNuQyxZQUFJLEtBQUt5SixZQUFMLEVBQUosRUFBeUI7QUFDdkIsZUFBS3ZHLFNBQUw7QUFDRCxTQUZELE1BRU87QUFDTGxELGdCQUFNMEosaUJBQU47QUFDRDtBQUNGLE9BekdnQzs7QUEyR2pDbkMsY0FBUSxrQkFBVztBQUNqQixZQUFJLEtBQUtrQyxZQUFMLEVBQUosRUFBeUI7QUFDdkIsZUFBS3ZHLFNBQUw7QUFDRDtBQUNGLE9BL0dnQzs7QUFpSGpDeUcsNkJBQXVCLGlDQUFXO0FBQ2hDLFlBQUl4SSxRQUFTLHNCQUFzQixLQUFLNUgsTUFBNUIsR0FBc0MsS0FBS0EsTUFBTCxDQUFZOFAsZ0JBQWxELEdBQXFFLEtBQWpGOztBQUVBLFlBQUksS0FBS0YsU0FBVCxFQUFvQjtBQUNsQixlQUFLQSxTQUFMLENBQWVwSCxTQUFmLENBQXlCO0FBQ3ZCQyxzQkFBVSxLQUFLeUYsTUFBTCxDQUFZekYsUUFBWixFQURhO0FBRXZCYixtQkFBT0E7QUFGZ0IsV0FBekI7QUFJRDtBQUNGLE9BMUhnQzs7QUE0SGpDckgsZ0JBQVUsb0JBQVc7QUFDbkIsYUFBS0MsSUFBTCxDQUFVLFNBQVY7O0FBRUEsYUFBS0wsb0JBQUw7O0FBRUEsYUFBSzZPLHdCQUFMLENBQThCck0sT0FBOUI7QUFDQTFJLGVBQU9xRSxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxLQUFLbVEsb0JBQTFDOztBQUVBLGFBQUtaLHdCQUFMLENBQThCakgsR0FBOUIsQ0FBa0MsS0FBbEMsRUFBeUMsS0FBS21ILFdBQTlDO0FBQ0EsYUFBS2hPLFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxJQUE1QztBQUNELE9BdElnQzs7QUF3SWpDd08sMkJBQXFCLDZCQUFTdUIsU0FBVCxFQUFvQjtBQUN2Q0Esb0JBQVlBLGNBQWMsRUFBZCxJQUFvQkEsY0FBY2pULFNBQWxDLElBQStDaVQsYUFBYSxNQUF4RTs7QUFFQSxhQUFLQyxZQUFMLENBQWtCRCxTQUFsQjtBQUNELE9BNUlnQzs7QUE4SWpDOzs7QUFHQUMsb0JBQWMsc0JBQVNLLE9BQVQsRUFBa0I7QUFDOUIsWUFBSUEsT0FBSixFQUFhO0FBQ1gsZUFBS0Msd0JBQUw7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLQywwQkFBTDtBQUNEO0FBQ0YsT0F2SmdDOztBQXlKakM3Qix1QkFBaUIsMkJBQVc7QUFDMUIsYUFBSzhCLGVBQUw7QUFDQSxhQUFLSixxQkFBTDtBQUNELE9BNUpnQzs7QUE4SmpDN0Isa0NBQTRCLHNDQUFXO0FBQ3JDLGFBQUtpQyxlQUFMO0FBQ0EsYUFBS0oscUJBQUw7QUFDRCxPQWpLZ0M7O0FBbUtqQzs7O0FBR0FuQyxzQ0FBZ0MsMENBQVc7QUFDekMsWUFBSWpFLGNBQWMsS0FBS2hLLE1BQUwsQ0FBWThQLGdCQUE5Qjs7QUFFQSxZQUFJLEVBQUUsc0JBQXNCLEtBQUs5UCxNQUE3QixDQUFKLEVBQTBDO0FBQ3hDZ0ssd0JBQWMsTUFBTSxLQUFLekMsU0FBTCxDQUFlLENBQWYsRUFBa0JvQixXQUF0QztBQUNELFNBRkQsTUFFTyxJQUFJLE9BQU9xQixXQUFQLElBQXNCLFFBQTFCLEVBQW9DO0FBQ3pDLGNBQUlBLFlBQVl5RyxPQUFaLENBQW9CLElBQXBCLEVBQTBCekcsWUFBWXJELE1BQVosR0FBcUIsQ0FBL0MsTUFBc0QsQ0FBQyxDQUEzRCxFQUE4RDtBQUM1RHFELDBCQUFjMEcsU0FBUzFHLFlBQVkyRyxPQUFaLENBQW9CLElBQXBCLEVBQTBCLEVBQTFCLENBQVQsRUFBd0MsRUFBeEMsQ0FBZDtBQUNELFdBRkQsTUFFTyxJQUFJM0csWUFBWXlHLE9BQVosQ0FBb0IsR0FBcEIsRUFBeUJ6RyxZQUFZckQsTUFBWixHQUFxQixDQUE5QyxJQUFtRCxDQUF2RCxFQUEwRDtBQUMvRHFELDBCQUFjQSxZQUFZMkcsT0FBWixDQUFvQixHQUFwQixFQUF5QixFQUF6QixDQUFkO0FBQ0EzRywwQkFBYzRHLFdBQVc1RyxXQUFYLElBQTBCLEdBQTFCLEdBQWdDLEtBQUt6QyxTQUFMLENBQWUsQ0FBZixFQUFrQm9CLFdBQWhFO0FBQ0Q7QUFDRixTQVBNLE1BT0E7QUFDTCxnQkFBTSxJQUFJak4sS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNEOztBQUVELGVBQU9zTyxXQUFQO0FBQ0QsT0F2TGdDOztBQXlMakN3Ryx1QkFBaUIsMkJBQVc7QUFDMUIsWUFBSXhHLGNBQWMsS0FBS2lFLDhCQUFMLEVBQWxCOztBQUVBLFlBQUlqRSxXQUFKLEVBQWlCO0FBQ2YsZUFBS2tFLE1BQUwsQ0FBWXJCLGNBQVosQ0FBMkI2RCxTQUFTMUcsV0FBVCxFQUFzQixFQUF0QixDQUEzQjtBQUNEO0FBQ0YsT0EvTGdDOztBQWlNakNzRyxnQ0FBMEIsb0NBQVU7QUFDbEMsYUFBS08sZ0JBQUwsQ0FBc0J0SyxFQUF0QixDQUF5Qix1REFBekIsRUFBa0YsS0FBS29JLGlCQUF2RjtBQUNELE9Bbk1nQzs7QUFxTWpDNEIsa0NBQTRCLHNDQUFVO0FBQ3BDLGFBQUtNLGdCQUFMLENBQXNCakssR0FBdEIsQ0FBMEIsdURBQTFCLEVBQW1GLEtBQUsrSCxpQkFBeEY7QUFDRCxPQXZNZ0M7O0FBeU1qQ0UsbUJBQWEsdUJBQVc7QUFDdEIsYUFBS2dDLGdCQUFMLEdBQXdCLElBQUluVyxJQUFJb1QsZUFBUixDQUF3QixLQUFLL04sUUFBTCxDQUFjLENBQWQsQ0FBeEIsRUFBMEM7QUFDaEUrUSwyQkFBaUI7QUFEK0MsU0FBMUMsQ0FBeEI7QUFHRCxPQTdNZ0M7O0FBK01qQ0MsdUJBQWlCLHlCQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQztBQUFBOztBQUMvQyxZQUFJQyxZQUFZLEtBQUtwUixNQUFMLENBQVluQixJQUFaLEVBQWhCO0FBQ0EsWUFBSXdTLGNBQWMvVyxRQUFRZ0QsT0FBUixDQUFnQjZULFlBQWhCLENBQWxCO0FBQ0EsWUFBSXhTLE9BQU92RCxTQUFTaVcsV0FBVCxDQUFYOztBQUVBLGFBQUs1SixTQUFMLENBQWU2SixNQUFmLENBQXNCRCxXQUF0Qjs7QUFFQSxZQUFJLEtBQUtFLG1CQUFULEVBQThCO0FBQzVCLGVBQUtBLG1CQUFMLENBQXlCNVEsTUFBekI7QUFDQSxlQUFLNlEsaUJBQUwsQ0FBdUJoTSxRQUF2QjtBQUNEOztBQUVEN0csYUFBS3lTLFNBQUw7O0FBRUEsYUFBS0csbUJBQUwsR0FBMkJGLFdBQTNCO0FBQ0EsYUFBS0csaUJBQUwsR0FBeUJKLFNBQXpCO0FBQ0EsYUFBS0ssZUFBTCxHQUF1QlAsT0FBdkI7O0FBRUF2UixxQkFBYSxZQUFNO0FBQ2pCLGdCQUFLNFIsbUJBQUwsQ0FBeUIsQ0FBekIsRUFBNEJHLEtBQTVCO0FBQ0QsU0FGRDtBQUdELE9BcE9nQzs7QUFzT2pDOzs7QUFHQUMsdUJBQWlCLHlCQUFTUixZQUFULEVBQXVCO0FBQ3RDLFlBQUlDLFlBQVksS0FBS3BSLE1BQUwsQ0FBWW5CLElBQVosRUFBaEI7QUFDQSxZQUFJd1MsY0FBYy9XLFFBQVFnRCxPQUFSLENBQWdCNlQsWUFBaEIsQ0FBbEI7QUFDQSxZQUFJeFMsT0FBT3ZELFNBQVNpVyxXQUFULENBQVg7O0FBRUEsYUFBSzdKLFNBQUwsQ0FBZThKLE1BQWYsQ0FBc0JELFdBQXRCOztBQUVBLFlBQUksS0FBS08scUJBQVQsRUFBZ0M7QUFDOUIsZUFBS0EscUJBQUwsQ0FBMkJwTSxRQUEzQjtBQUNBLGVBQUtxTSx1QkFBTCxDQUE2QmxSLE1BQTdCO0FBQ0Q7O0FBRURoQyxhQUFLeVMsU0FBTDs7QUFFQSxhQUFLUyx1QkFBTCxHQUErQlIsV0FBL0I7QUFDQSxhQUFLTyxxQkFBTCxHQUE2QlIsU0FBN0I7QUFDRCxPQXpQZ0M7O0FBMlBqQzs7Ozs7O0FBTUFuQyxtQkFBYSxxQkFBUzFTLElBQVQsRUFBZW1DLE9BQWYsRUFBd0I7QUFDbkMsWUFBSW5DLElBQUosRUFBVTtBQUNSbUMsb0JBQVVBLFdBQVcsRUFBckI7QUFDQUEsa0JBQVFKLFFBQVIsR0FBbUJJLFFBQVFKLFFBQVIsSUFBb0IsWUFBVyxDQUFFLENBQXBEOztBQUVBLGNBQUl5RCxPQUFPLElBQVg7QUFDQWhHLGlCQUFPK1YsZ0JBQVAsQ0FBd0J2VixJQUF4QixFQUE4QnlDLElBQTlCLENBQW1DLFVBQVMrUyxJQUFULEVBQWU7QUFDaERoUSxpQkFBSzRQLGVBQUwsQ0FBcUJyWCxRQUFRZ0QsT0FBUixDQUFnQnlVLElBQWhCLENBQXJCO0FBQ0EsZ0JBQUlyVCxRQUFRbUwsU0FBWixFQUF1QjtBQUNyQjlILG1CQUFLc0wsS0FBTDtBQUNEO0FBQ0QzTyxvQkFBUUosUUFBUjtBQUNELFdBTkQsRUFNRyxZQUFXO0FBQ1osa0JBQU0sSUFBSTFDLEtBQUosQ0FBVSx3QkFBd0JXLElBQWxDLENBQU47QUFDRCxXQVJEO0FBU0QsU0FkRCxNQWNPO0FBQ0wsZ0JBQU0sSUFBSVgsS0FBSixDQUFVLDJCQUFWLENBQU47QUFDRDtBQUNGLE9BblJnQzs7QUFxUmpDOzs7Ozs7QUFNQW9ULG1CQUFhLHFCQUFTa0MsT0FBVCxFQUFrQnhTLE9BQWxCLEVBQTJCO0FBQ3RDQSxrQkFBVUEsV0FBVyxFQUFyQjtBQUNBQSxnQkFBUUosUUFBUixHQUFtQkksUUFBUUosUUFBUixJQUFvQixZQUFXLENBQUUsQ0FBcEQ7O0FBRUEsWUFBSW9CLE9BQU8sWUFBVztBQUNwQixjQUFJaEIsUUFBUW1MLFNBQVosRUFBdUI7QUFDckIsaUJBQUt3RCxLQUFMO0FBQ0Q7QUFDRDNPLGtCQUFRSixRQUFSO0FBQ0QsU0FMVSxDQUtUa0MsSUFMUyxDQUtKLElBTEksQ0FBWDs7QUFPQSxZQUFJLEtBQUtpUixlQUFMLEtBQXlCUCxPQUE3QixFQUFzQztBQUNwQ3hSO0FBQ0E7QUFDRDs7QUFFRCxZQUFJd1IsT0FBSixFQUFhO0FBQ1gsY0FBSW5QLE9BQU8sSUFBWDtBQUNBaEcsaUJBQU8rVixnQkFBUCxDQUF3QlosT0FBeEIsRUFBaUNsUyxJQUFqQyxDQUFzQyxVQUFTK1MsSUFBVCxFQUFlO0FBQ25EaFEsaUJBQUtrUCxlQUFMLENBQXFCQyxPQUFyQixFQUE4QmEsSUFBOUI7QUFDQXJTO0FBQ0QsV0FIRCxFQUdHLFlBQVc7QUFDWixrQkFBTSxJQUFJOUQsS0FBSixDQUFVLHdCQUF3QlcsSUFBbEMsQ0FBTjtBQUNELFdBTEQ7QUFNRCxTQVJELE1BUU87QUFDTCxnQkFBTSxJQUFJWCxLQUFKLENBQVUsMkJBQVYsQ0FBTjtBQUNEO0FBQ0YsT0F0VGdDOztBQXdUakNrVCxvQkFBYyxzQkFBU25JLEtBQVQsRUFBZ0I7O0FBRTVCLFlBQUksS0FBS2dILFNBQUwsQ0FBZXFFLFFBQWYsRUFBSixFQUErQjtBQUM3QjtBQUNEOztBQUVELFlBQUksS0FBS0MsdUJBQUwsQ0FBNkJ0TCxNQUFNbkosTUFBbkMsQ0FBSixFQUErQztBQUM3QyxlQUFLaVQsMEJBQUw7QUFDRDs7QUFFRCxnQkFBUTlKLE1BQU1pSixJQUFkO0FBQ0UsZUFBSyxVQUFMO0FBQ0EsZUFBSyxXQUFMOztBQUVFLGdCQUFJLEtBQUt4QixNQUFMLENBQVlsQixRQUFaLE1BQTBCLENBQUMsS0FBS2dGLHdCQUFMLENBQThCdkwsS0FBOUIsQ0FBL0IsRUFBcUU7QUFDbkU7QUFDRDs7QUFFREEsa0JBQU13TCxPQUFOLENBQWNDLGNBQWQ7O0FBRUEsZ0JBQUlDLFNBQVMxTCxNQUFNd0wsT0FBTixDQUFjRSxNQUEzQjtBQUNBLGdCQUFJQyxnQkFBZ0IsS0FBSzFFLFlBQUwsR0FBb0IsQ0FBQ3lFLE1BQXJCLEdBQThCQSxNQUFsRDs7QUFFQSxnQkFBSUUsYUFBYTVMLE1BQU13TCxPQUFOLENBQWNJLFVBQS9COztBQUVBLGdCQUFJLEVBQUUsY0FBY0EsVUFBaEIsQ0FBSixFQUFpQztBQUMvQkEseUJBQVc1SixRQUFYLEdBQXNCLEtBQUt5RixNQUFMLENBQVl6RixRQUFaLEVBQXRCO0FBQ0Q7O0FBRUQsZ0JBQUkySixnQkFBZ0IsQ0FBaEIsSUFBcUIsS0FBS2xFLE1BQUwsQ0FBWWxCLFFBQVosRUFBekIsRUFBaUQ7QUFDL0M7QUFDRDs7QUFFRCxnQkFBSW9GLGdCQUFnQixDQUFoQixJQUFxQixLQUFLbEUsTUFBTCxDQUFZekYsUUFBWixFQUF6QixFQUFpRDtBQUMvQztBQUNEOztBQUVELGdCQUFJd0IsV0FBV29JLFdBQVc1SixRQUFYLEdBQ2IySixnQkFBZ0IsS0FBS2xFLE1BQUwsQ0FBWWIsY0FBWixFQURILEdBQ2tDK0UsYUFEakQ7O0FBR0EsaUJBQUtsRSxNQUFMLENBQVlaLFNBQVosQ0FBc0JyRCxRQUF0Qjs7QUFFQTs7QUFFRixlQUFLLFdBQUw7QUFDRXhELGtCQUFNd0wsT0FBTixDQUFjQyxjQUFkOztBQUVBLGdCQUFJLEtBQUtoRSxNQUFMLENBQVlsQixRQUFaLE1BQTBCLENBQUMsS0FBS2dGLHdCQUFMLENBQThCdkwsS0FBOUIsQ0FBL0IsRUFBcUU7QUFDbkU7QUFDRDs7QUFFRCxnQkFBSSxLQUFLaUgsWUFBVCxFQUF1QjtBQUNyQixtQkFBS1IsSUFBTDtBQUNELGFBRkQsTUFFTztBQUNMLG1CQUFLQyxLQUFMO0FBQ0Q7O0FBRUQxRyxrQkFBTXdMLE9BQU4sQ0FBY0ssVUFBZDtBQUNBOztBQUVGLGVBQUssWUFBTDtBQUNFN0wsa0JBQU13TCxPQUFOLENBQWNDLGNBQWQ7O0FBRUEsZ0JBQUksS0FBS2hFLE1BQUwsQ0FBWWxCLFFBQVosTUFBMEIsQ0FBQyxLQUFLZ0Ysd0JBQUwsQ0FBOEJ2TCxLQUE5QixDQUEvQixFQUFxRTtBQUNuRTtBQUNEOztBQUVELGdCQUFJLEtBQUtpSCxZQUFULEVBQXVCO0FBQ3JCLG1CQUFLUCxLQUFMO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsbUJBQUtELElBQUw7QUFDRDs7QUFFRHpHLGtCQUFNd0wsT0FBTixDQUFjSyxVQUFkO0FBQ0E7O0FBRUYsZUFBSyxTQUFMO0FBQ0UsaUJBQUtDLGFBQUwsR0FBcUIsSUFBckI7O0FBRUEsZ0JBQUksS0FBS3JFLE1BQUwsQ0FBWXBCLFVBQVosRUFBSixFQUE4QjtBQUM1QixtQkFBS0ksSUFBTDtBQUNELGFBRkQsTUFFTyxJQUFJLEtBQUtnQixNQUFMLENBQVluQixXQUFaLEVBQUosRUFBK0I7QUFDcEMsbUJBQUtJLEtBQUw7QUFDRDs7QUFFRDtBQTNFSjtBQTZFRCxPQS9ZZ0M7O0FBaVpqQzs7OztBQUlBNEUsK0JBQXlCLGlDQUFTM1UsT0FBVCxFQUFrQjtBQUN6QyxXQUFHO0FBQ0QsY0FBSUEsUUFBUW9WLFlBQVIsSUFBd0JwVixRQUFRb1YsWUFBUixDQUFxQixxQkFBckIsQ0FBNUIsRUFBeUU7QUFDdkUsbUJBQU8sSUFBUDtBQUNEO0FBQ0RwVixvQkFBVUEsUUFBUW1HLFVBQWxCO0FBQ0QsU0FMRCxRQUtTbkcsT0FMVDs7QUFPQSxlQUFPLEtBQVA7QUFDRCxPQTlaZ0M7O0FBZ2FqQzRVLGdDQUEwQixrQ0FBU3ZMLEtBQVQsRUFBZ0I7QUFDeEMsWUFBSTJELElBQUkzRCxNQUFNd0wsT0FBTixDQUFjUSxNQUFkLENBQXFCQyxLQUE3Qjs7QUFFQSxZQUFJLEVBQUUsdUJBQXVCak0sTUFBTXdMLE9BQU4sQ0FBY0ksVUFBdkMsQ0FBSixFQUF3RDtBQUN0RDVMLGdCQUFNd0wsT0FBTixDQUFjSSxVQUFkLENBQXlCTSxpQkFBekIsR0FBNkMsS0FBS0Msb0JBQUwsRUFBN0M7QUFDRDs7QUFFRCxZQUFJQyxjQUFjcE0sTUFBTXdMLE9BQU4sQ0FBY0ksVUFBZCxDQUF5Qk0saUJBQTNDO0FBQ0EsZUFBTyxLQUFLakYsWUFBTCxHQUFvQixLQUFLbkcsU0FBTCxDQUFlLENBQWYsRUFBa0JvQixXQUFsQixHQUFnQ3lCLENBQWhDLEdBQW9DeUksV0FBeEQsR0FBc0V6SSxJQUFJeUksV0FBakY7QUFDRCxPQXphZ0M7O0FBMmFqQ0QsNEJBQXNCLGdDQUFXO0FBQy9CLFlBQUlDLGNBQWMsS0FBSzdTLE1BQUwsQ0FBWThTLGdCQUE5Qjs7QUFFQSxZQUFJLE9BQU9ELFdBQVAsSUFBc0IsUUFBMUIsRUFBb0M7QUFDbENBLHdCQUFjQSxZQUFZbEMsT0FBWixDQUFvQixJQUFwQixFQUEwQixFQUExQixDQUFkO0FBQ0Q7O0FBRUQsWUFBSS9JLFFBQVE4SSxTQUFTbUMsV0FBVCxFQUFzQixFQUF0QixDQUFaO0FBQ0EsWUFBSWpMLFFBQVEsQ0FBUixJQUFhLENBQUNpTCxXQUFsQixFQUErQjtBQUM3QixpQkFBTyxLQUFLdEwsU0FBTCxDQUFlLENBQWYsRUFBa0JvQixXQUF6QjtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPZixLQUFQO0FBQ0Q7QUFDRixPQXhiZ0M7O0FBMGJqQytCLGlCQUFXLHFCQUFXO0FBQ3BCLGVBQU8sS0FBS3dELEtBQUwsQ0FBVzFULEtBQVgsQ0FBaUIsSUFBakIsRUFBdUJDLFNBQXZCLENBQVA7QUFDRCxPQTViZ0M7O0FBOGJqQzs7Ozs7QUFLQXlULGFBQU8sZUFBUzNPLE9BQVQsRUFBa0I7QUFDdkJBLGtCQUFVQSxXQUFXLEVBQXJCO0FBQ0FBLGtCQUFVLE9BQU9BLE9BQVAsSUFBa0IsVUFBbEIsR0FBK0IsRUFBQ0osVUFBVUksT0FBWCxFQUEvQixHQUFxREEsT0FBL0Q7O0FBRUEsWUFBSSxDQUFDLEtBQUswUCxNQUFMLENBQVlsQixRQUFaLEVBQUwsRUFBNkI7QUFDM0IsZUFBS3hNLElBQUwsQ0FBVSxVQUFWLEVBQXNCO0FBQ3BCdVMseUJBQWE7QUFETyxXQUF0Qjs7QUFJQSxlQUFLdEYsU0FBTCxDQUFldUYsVUFBZixDQUEwQixZQUFXO0FBQ25DLGlCQUFLOUUsTUFBTCxDQUFZZixLQUFaLENBQWtCM08sT0FBbEI7QUFDRCxXQUZ5QixDQUV4QjhCLElBRndCLENBRW5CLElBRm1CLENBQTFCO0FBR0Q7QUFDRixPQWhkZ0M7O0FBa2RqQytOLGNBQVEsZ0JBQVM3UCxPQUFULEVBQWtCO0FBQ3hCLFlBQUlKLFdBQVdJLFFBQVFKLFFBQVIsSUFBb0IsWUFBVyxDQUFFLENBQWhEO0FBQUEsWUFDSStRLFNBQVMsS0FBSzFCLFNBQUwsQ0FBZXhTLElBQWYsRUFEYjtBQUFBLFlBRUlrTyxVQUFVM0ssUUFBUXlVLFNBQVIsSUFBcUIsTUFGbkM7O0FBSUEsYUFBS3JELFNBQUwsQ0FBZWpHLFNBQWYsQ0FBeUIsWUFBVztBQUNsQ3dGOztBQUVBLGVBQUs1SCxTQUFMLENBQWUyTCxRQUFmLEdBQTBCcEwsR0FBMUIsQ0FBOEIsZ0JBQTlCLEVBQWdELEVBQWhEO0FBQ0EsZUFBSytGLHdCQUFMLENBQThCakgsR0FBOUIsQ0FBa0MsS0FBbEMsRUFBeUMsS0FBS21ILFdBQTlDOztBQUVBLGVBQUt2TixJQUFMLENBQVUsV0FBVixFQUF1QjtBQUNyQnVTLHlCQUFhO0FBRFEsV0FBdkI7O0FBSUEzVTtBQUNELFNBWHdCLENBV3ZCa0MsSUFYdUIsQ0FXbEIsSUFYa0IsQ0FBekIsRUFXYzZJLE9BWGQ7QUFZRCxPQW5lZ0M7O0FBcWVqQzs7Ozs7O0FBTUFELGdCQUFVLG9CQUFXO0FBQ25CLGVBQU8sS0FBS2dFLElBQUwsQ0FBVXpULEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0JDLFNBQXRCLENBQVA7QUFDRCxPQTdlZ0M7O0FBK2VqQzs7Ozs7O0FBTUF3VCxZQUFNLGNBQVMxTyxPQUFULEVBQWtCO0FBQ3RCQSxrQkFBVUEsV0FBVyxFQUFyQjtBQUNBQSxrQkFBVSxPQUFPQSxPQUFQLElBQWtCLFVBQWxCLEdBQStCLEVBQUNKLFVBQVVJLE9BQVgsRUFBL0IsR0FBcURBLE9BQS9EOztBQUVBLGFBQUtnQyxJQUFMLENBQVUsU0FBVixFQUFxQjtBQUNuQnVTLHVCQUFhO0FBRE0sU0FBckI7O0FBSUEsYUFBS3RGLFNBQUwsQ0FBZXVGLFVBQWYsQ0FBMEIsWUFBVztBQUNuQyxlQUFLOUUsTUFBTCxDQUFZaEIsSUFBWixDQUFpQjFPLE9BQWpCO0FBQ0QsU0FGeUIsQ0FFeEI4QixJQUZ3QixDQUVuQixJQUZtQixDQUExQjtBQUdELE9BaGdCZ0M7O0FBa2dCakM4TixhQUFPLGVBQVM1UCxPQUFULEVBQWtCO0FBQ3ZCLFlBQUlKLFdBQVdJLFFBQVFKLFFBQVIsSUFBb0IsWUFBVyxDQUFFLENBQWhEO0FBQUEsWUFDSStRLFNBQVMsS0FBSzFCLFNBQUwsQ0FBZXhTLElBQWYsRUFEYjtBQUFBLFlBRUlrTyxVQUFVM0ssUUFBUXlVLFNBQVIsSUFBcUIsTUFGbkM7O0FBSUEsYUFBS3JELFNBQUwsQ0FBZTFHLFFBQWYsQ0FBd0IsWUFBVztBQUNqQ2lHOztBQUVBLGVBQUs1SCxTQUFMLENBQWUyTCxRQUFmLEdBQTBCcEwsR0FBMUIsQ0FBOEIsZ0JBQTlCLEVBQWdELE1BQWhEO0FBQ0EsZUFBSytGLHdCQUFMLENBQThCdEgsRUFBOUIsQ0FBaUMsS0FBakMsRUFBd0MsS0FBS3dILFdBQTdDOztBQUVBLGVBQUt2TixJQUFMLENBQVUsVUFBVixFQUFzQjtBQUNwQnVTLHlCQUFhO0FBRE8sV0FBdEI7O0FBSUEzVTtBQUNELFNBWHVCLENBV3RCa0MsSUFYc0IsQ0FXakIsSUFYaUIsQ0FBeEIsRUFXYzZJLE9BWGQ7QUFZRCxPQW5oQmdDOztBQXFoQmpDOzs7OztBQUtBbEQsY0FBUSxnQkFBU3pILE9BQVQsRUFBa0I7QUFDeEIsWUFBSSxLQUFLMFAsTUFBTCxDQUFZbEIsUUFBWixFQUFKLEVBQTRCO0FBQzFCLGVBQUtFLElBQUwsQ0FBVTFPLE9BQVY7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLMk8sS0FBTCxDQUFXM08sT0FBWDtBQUNEO0FBQ0YsT0FoaUJnQzs7QUFraUJqQzs7O0FBR0EyVSxrQkFBWSxzQkFBVztBQUNyQixlQUFPLEtBQUtsTixNQUFMLENBQVl4TSxLQUFaLENBQWtCLElBQWxCLEVBQXdCQyxTQUF4QixDQUFQO0FBQ0QsT0F2aUJnQzs7QUF5aUJqQzs7O0FBR0F3VyxvQkFBYyx3QkFBVztBQUN2QixlQUFPLEtBQUtoQyxNQUFMLENBQVl6RixRQUFaLEVBQVA7QUFDRCxPQTlpQmdDOztBQWdqQmpDOzs7QUFHQTBGLGtCQUFZLG9CQUFTMUgsS0FBVCxFQUFnQjtBQUMxQixhQUFLbUosU0FBTCxDQUFlL0YsYUFBZixDQUE2QnBELEtBQTdCO0FBQ0Q7QUFyakJnQyxLQUFiLENBQXRCOztBQXdqQkE7QUFDQStHLG9CQUFnQjhCLGFBQWhCLEdBQWdDO0FBQzlCLGlCQUFXbEQseUJBRG1CO0FBRTlCLGlCQUFXakYsMEJBRm1CO0FBRzlCLGdCQUFVaUYseUJBSG9CO0FBSTlCLGNBQVFSO0FBSnNCLEtBQWhDOztBQU9BOzs7O0FBSUE0QixvQkFBZ0JwTSxnQkFBaEIsR0FBbUMsVUFBUy9ILElBQVQsRUFBZWdJLFFBQWYsRUFBeUI7QUFDMUQsVUFBSSxFQUFFQSxTQUFTcEksU0FBVCxZQUE4QmlPLG1CQUFoQyxDQUFKLEVBQTBEO0FBQ3hELGNBQU0sSUFBSXhMLEtBQUosQ0FBVSxtREFBVixDQUFOO0FBQ0Q7O0FBRUQsV0FBSzRULGFBQUwsQ0FBbUJqVyxJQUFuQixJQUEyQmdJLFFBQTNCO0FBQ0QsS0FORDs7QUFRQVgsZUFBV0MsS0FBWCxDQUFpQjZNLGVBQWpCOztBQUVBLFdBQU9BLGVBQVA7QUFDRCxHQWxsQmlDLENBQWxDO0FBbWxCRCxDQTd0QkQ7OztBQ2pCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSW5ULFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUscUJBQWYsRUFBc0MsWUFBVztBQUMvQyxXQUFPekYsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFbEJ1USxhQUFPLENBRlc7QUFHbEJELGdCQUFVLEdBSFE7QUFJbEJNLGNBQVEsNkJBSlU7O0FBTWxCOzs7Ozs7QUFNQTlQLFlBQU0sY0FBUzRFLE9BQVQsRUFBa0I7QUFDdEJBLGtCQUFVQSxXQUFXLEVBQXJCOztBQUVBLGFBQUtrTCxNQUFMLEdBQWNsTCxRQUFRa0wsTUFBUixJQUFrQixLQUFLQSxNQUFyQztBQUNBLGFBQUtOLFFBQUwsR0FBZ0I1SyxRQUFRNEssUUFBUixLQUFxQnRNLFNBQXJCLEdBQWlDMEIsUUFBUTRLLFFBQXpDLEdBQW9ELEtBQUtBLFFBQXpFO0FBQ0EsYUFBS0MsS0FBTCxHQUFhN0ssUUFBUTZLLEtBQVIsS0FBa0J2TSxTQUFsQixHQUE4QjBCLFFBQVE2SyxLQUF0QyxHQUE4QyxLQUFLQSxLQUFoRTtBQUNELE9BbEJpQjs7QUFvQmxCOzs7Ozs7OztBQVFBNUIsYUFBTyxlQUFTckssT0FBVCxFQUFrQnNLLFFBQWxCLEVBQTRCQyxRQUE1QixFQUFzQ25KLE9BQXRDLEVBQStDLENBQ3JELENBN0JpQjs7QUErQmxCOzs7Ozs7QUFNQWdLLGlCQUFXLG1CQUFTaEssT0FBVCxFQUFrQixDQUM1QixDQXRDaUI7O0FBd0NsQjs7O0FBR0EwSyxnQkFBVSxrQkFBUzlLLFFBQVQsRUFBbUIsQ0FDNUIsQ0E1Q2lCOztBQThDbEI7OztBQUdBZ1Ysa0JBQVksb0JBQVNoVixRQUFULEVBQW1CLENBQzlCLENBbERpQjs7QUFvRGxCOztBQUVBdUUsZUFBUyxtQkFBVyxDQUNuQixDQXZEaUI7O0FBeURsQjs7Ozs7QUFLQWtILHFCQUFlLHVCQUFTbkMsUUFBVCxFQUFtQkMsUUFBbkIsRUFBNkJuSixPQUE3QixFQUFzQyxDQUNwRCxDQS9EaUI7O0FBaUVsQjs7O0FBR0E4TCxZQUFNLGdCQUFXO0FBQ2YsY0FBTSxJQUFJNU8sS0FBSixDQUFVLHVCQUFWLENBQU47QUFDRDtBQXRFaUIsS0FBYixDQUFQO0FBd0VELEdBekVEO0FBMEVELENBOUVEOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUlyQixTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPc0YsT0FBUCxDQUFlLGVBQWYsRUFBZ0MsQ0FBQyxRQUFELEVBQVcsVUFBUzlELE1BQVQsRUFBaUI7O0FBRTFEOzs7QUFHQSxRQUFJd1gsZ0JBQWdCblosTUFBTXBCLE1BQU4sQ0FBYTs7QUFFL0I7Ozs7O0FBS0FjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtDLE1BQUwsQ0FBWW5FLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsS0FBSzRFLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixJQUFuQixDQUE1Qjs7QUFFQSxhQUFLTCxxQkFBTCxHQUE2QnBFLE9BQU9xRSxhQUFQLENBQXFCLElBQXJCLEVBQTJCOUMsUUFBUSxDQUFSLENBQTNCLEVBQXVDLENBQ2xFLE1BRGtFLEVBQzFELE1BRDBELEVBQ2xELFdBRGtELEVBQ3JDLFdBRHFDLEVBQ3hCLFFBRHdCLEVBQ2QsUUFEYyxFQUNKLGFBREksQ0FBdkMsQ0FBN0I7O0FBSUEsYUFBSytDLG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEJoRCxRQUFRLENBQVIsQ0FBMUIsRUFBc0MsQ0FBQyxNQUFELEVBQVMsT0FBVCxDQUF0QyxFQUF5RGtELElBQXpELENBQThELElBQTlELENBQTVCO0FBQ0QsT0FuQjhCOztBQXFCL0JDLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWOztBQUVBLGFBQUtMLG9CQUFMO0FBQ0EsYUFBS0YscUJBQUw7O0FBRUEsYUFBS0YsUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLElBQTVDO0FBQ0Q7QUE1QjhCLEtBQWIsQ0FBcEI7O0FBK0JBVSxlQUFXQyxLQUFYLENBQWlCMFMsYUFBakI7O0FBRUF4WCxXQUFPK0UsMkJBQVAsQ0FBbUN5UyxhQUFuQyxFQUFrRCxDQUNoRCxVQURnRCxFQUNwQyxTQURvQyxFQUN6QixRQUR5QixDQUFsRDs7QUFJQSxXQUFPQSxhQUFQO0FBQ0QsR0EzQytCLENBQWhDO0FBNENELENBakREOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSWhaLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU9zRixPQUFQLENBQWUsV0FBZixFQUE0QixDQUFDLFVBQUQsRUFBYSwyQkFBYixFQUEwQyxRQUExQyxFQUFvRCxZQUFwRCxFQUFrRSxVQUFTekUsUUFBVCxFQUFtQmtSLHlCQUFuQixFQUE4Q3ZRLE1BQTlDLEVBQXNEeVgsVUFBdEQsRUFBa0U7QUFDOUosUUFBSUMsYUFBYSxDQUFqQjtBQUNBLFFBQUlDLGdCQUFnQixDQUFwQjtBQUNBLFFBQUlDLGtCQUFrQixHQUF0Qjs7QUFFQSxRQUFJQyxZQUFZeFosTUFBTXBCLE1BQU4sQ0FBYTs7QUFFM0JjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEN6QyxnQkFBUXVXLFFBQVIsQ0FBaUIsb0JBQWpCOztBQUVBLGFBQUs1VCxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLMEMsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtpQyxNQUFMLEdBQWNILEtBQWQ7O0FBRUEsYUFBSzBILFNBQUwsR0FBaUJuTixRQUFRZ0QsT0FBUixDQUFnQkEsUUFBUSxDQUFSLEVBQVdNLGFBQVgsQ0FBeUIseUJBQXpCLENBQWhCLENBQWpCO0FBQ0EsYUFBS2tXLGNBQUwsR0FBc0J4WixRQUFRZ0QsT0FBUixDQUFnQkEsUUFBUSxDQUFSLEVBQVdNLGFBQVgsQ0FBeUIsOEJBQXpCLENBQWhCLENBQXRCOztBQUVBLGFBQUttVyxJQUFMLEdBQVksS0FBS3RNLFNBQUwsQ0FBZSxDQUFmLEVBQWtCb0IsV0FBbEIsR0FBZ0M4SyxlQUE1QztBQUNBLGFBQUtLLEtBQUwsR0FBYVAsVUFBYjtBQUNBLGFBQUs5RixTQUFMLEdBQWlCLElBQUkvUyxJQUFJaVQsU0FBUixFQUFqQjs7QUFFQSxhQUFLb0csUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsS0FBbkI7O0FBRUFWLG1CQUFXVyxXQUFYLENBQXVCMU4sRUFBdkIsQ0FBMEIsUUFBMUIsRUFBb0MsS0FBSzJOLFNBQUwsQ0FBZTVULElBQWYsQ0FBb0IsSUFBcEIsQ0FBcEM7O0FBRUEsYUFBS3NQLFNBQUwsR0FBaUIsSUFBSXhELHlCQUFKLEVBQWpCOztBQUVBLGFBQUtyTSxRQUFMLENBQWMrSCxHQUFkLENBQWtCLFNBQWxCLEVBQTZCLE1BQTdCOztBQUVBLFlBQUlqSSxNQUFNNkgsUUFBVixFQUFvQjtBQUNsQixlQUFLb0gsV0FBTCxDQUFpQmpQLE1BQU02SCxRQUF2QjtBQUNEOztBQUVELFlBQUk3SCxNQUFNc1UsYUFBVixFQUF5QjtBQUN2QixlQUFLQyxnQkFBTCxDQUFzQnZVLE1BQU1zVSxhQUE1QjtBQUNEOztBQUVELFlBQUloRixTQUFTLEtBQUsxQixTQUFMLENBQWV4UyxJQUFmLEVBQWI7O0FBRUEsYUFBS29aLHlCQUFMO0FBQ0EsYUFBS0MsUUFBTDs7QUFFQTlLLG1CQUFXLFlBQVc7QUFDcEIsZUFBS3pKLFFBQUwsQ0FBYytILEdBQWQsQ0FBa0IsU0FBbEIsRUFBNkIsT0FBN0I7QUFDQXFIO0FBQ0QsU0FIVSxDQUdUN08sSUFIUyxDQUdKLElBSEksQ0FBWCxFQUdjLE9BQU8sRUFBUCxHQUFZLENBSDFCOztBQUtBdkMsY0FBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBdEI7O0FBRUEsYUFBS0gsb0JBQUwsR0FBNEJ0RSxPQUFPdUUsWUFBUCxDQUFvQixJQUFwQixFQUEwQmhELFFBQVEsQ0FBUixDQUExQixFQUFzQyxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLE1BQWpCLEVBQXlCLFNBQXpCLENBQXRDLENBQTVCO0FBQ0QsT0E5QzBCOztBQWdEM0I7OztBQUdBbVgseUJBQW1CLDJCQUFTdEQsWUFBVCxFQUF1QjtBQUN4QyxZQUFJQyxZQUFZLEtBQUtwUixNQUFMLENBQVluQixJQUFaLEVBQWhCO0FBQ0EsWUFBSXdTLGNBQWNqVyxTQUFTK1YsWUFBVCxFQUF1QkMsU0FBdkIsQ0FBbEI7O0FBRUEsYUFBSzBDLGNBQUwsQ0FBb0J4QyxNQUFwQixDQUEyQkQsV0FBM0I7O0FBRUEsWUFBSSxLQUFLcUQsNEJBQVQsRUFBdUM7QUFDckMsZUFBS0EsNEJBQUwsQ0FBa0MvVCxNQUFsQztBQUNBLGVBQUtnVSwwQkFBTCxDQUFnQ25QLFFBQWhDO0FBQ0Q7O0FBRUQsYUFBS2tQLDRCQUFMLEdBQW9DckQsV0FBcEM7QUFDQSxhQUFLc0QsMEJBQUwsR0FBa0N2RCxTQUFsQztBQUNELE9BaEUwQjs7QUFrRTNCOzs7QUFHQUgsdUJBQWlCLHlCQUFTRSxZQUFULEVBQXVCO0FBQUE7O0FBQ3RDLFlBQUlDLFlBQVksS0FBS3BSLE1BQUwsQ0FBWW5CLElBQVosRUFBaEI7QUFDQSxZQUFJd1MsY0FBY2pXLFNBQVMrVixZQUFULEVBQXVCQyxTQUF2QixDQUFsQjs7QUFFQSxhQUFLM0osU0FBTCxDQUFlNkosTUFBZixDQUFzQkQsV0FBdEI7O0FBRUEsWUFBSSxLQUFLdUQsWUFBVCxFQUF1QjtBQUNyQixlQUFLcEQsaUJBQUwsQ0FBdUJoTSxRQUF2QjtBQUNEOztBQUVELGFBQUtvUCxZQUFMLEdBQW9CdkQsV0FBcEI7QUFDQSxhQUFLRyxpQkFBTCxHQUF5QkosU0FBekI7O0FBRUF6UixxQkFBYSxZQUFNO0FBQ2pCLGdCQUFLaVYsWUFBTCxDQUFrQixDQUFsQixFQUFxQmxELEtBQXJCO0FBQ0QsU0FGRDtBQUdELE9BckYwQjs7QUF1RjNCOzs7QUFHQTRDLHdCQUFrQiwwQkFBUy9YLElBQVQsRUFBZTtBQUMvQixZQUFJQSxJQUFKLEVBQVU7QUFDUlIsaUJBQU8rVixnQkFBUCxDQUF3QnZWLElBQXhCLEVBQThCeUMsSUFBOUIsQ0FBbUMsVUFBUytTLElBQVQsRUFBZTtBQUNoRCxpQkFBSzBDLGlCQUFMLENBQXVCbmEsUUFBUWdELE9BQVIsQ0FBZ0J5VSxLQUFLOEMsSUFBTCxFQUFoQixDQUF2QjtBQUNELFdBRmtDLENBRWpDclUsSUFGaUMsQ0FFNUIsSUFGNEIsQ0FBbkMsRUFFYyxZQUFXO0FBQ3ZCLGtCQUFNLElBQUk1RSxLQUFKLENBQVUsd0JBQXdCVyxJQUFsQyxDQUFOO0FBQ0QsV0FKRDtBQUtELFNBTkQsTUFNTztBQUNMLGdCQUFNLElBQUlYLEtBQUosQ0FBVSwyQkFBVixDQUFOO0FBQ0Q7QUFDRixPQXBHMEI7O0FBc0czQjs7O0FBR0FvVCxtQkFBYSxxQkFBU3pTLElBQVQsRUFBZTtBQUMxQixZQUFJQSxJQUFKLEVBQVU7QUFDUlIsaUJBQU8rVixnQkFBUCxDQUF3QnZWLElBQXhCLEVBQThCeUMsSUFBOUIsQ0FBbUMsVUFBUytTLElBQVQsRUFBZTtBQUNoRCxpQkFBS2QsZUFBTCxDQUFxQjNXLFFBQVFnRCxPQUFSLENBQWdCeVUsS0FBSzhDLElBQUwsRUFBaEIsQ0FBckI7QUFDRCxXQUZrQyxDQUVqQ3JVLElBRmlDLENBRTVCLElBRjRCLENBQW5DLEVBRWMsWUFBVztBQUN2QixrQkFBTSxJQUFJNUUsS0FBSixDQUFVLHdCQUF3QlcsSUFBbEMsQ0FBTjtBQUNELFdBSkQ7QUFLRCxTQU5ELE1BTU87QUFDTCxnQkFBTSxJQUFJWCxLQUFKLENBQVUsMkJBQVYsQ0FBTjtBQUNEO0FBQ0YsT0FuSDBCOztBQXFIM0J3WSxpQkFBVyxxQkFBVztBQUNwQixZQUFJVSxXQUFXLEtBQUtkLEtBQXBCOztBQUVBLGFBQUtPLHlCQUFMOztBQUVBLFlBQUlPLGFBQWFwQixhQUFiLElBQThCLEtBQUtNLEtBQUwsS0FBZU4sYUFBakQsRUFBZ0U7QUFDOUQsZUFBSzVELFNBQUwsQ0FBZXBILFNBQWYsQ0FBeUI7QUFDdkJDLHNCQUFVLEtBRGE7QUFFdkJiLG1CQUFPO0FBRmdCLFdBQXpCO0FBSUQ7O0FBRUQsYUFBS2lNLElBQUwsR0FBWSxLQUFLdE0sU0FBTCxDQUFlLENBQWYsRUFBa0JvQixXQUFsQixHQUFnQzhLLGVBQTVDO0FBQ0QsT0FsSTBCOztBQW9JM0JZLGlDQUEyQixxQ0FBVztBQUNwQyxZQUFJUSxTQUFTLEtBQUtDLGVBQUwsRUFBYjs7QUFFQSxZQUFJRCxVQUFVLEtBQUtmLEtBQUwsS0FBZU4sYUFBN0IsRUFBNEM7QUFDMUMsZUFBS3VCLGdCQUFMO0FBQ0EsY0FBSSxLQUFLaEIsUUFBVCxFQUFtQjtBQUNqQixpQkFBS2lCLGtCQUFMO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUtDLHFCQUFMO0FBQ0Q7QUFDRixTQVBELE1BT08sSUFBSSxDQUFDSixNQUFELElBQVcsS0FBS2YsS0FBTCxLQUFlTixhQUE5QixFQUE2QztBQUNsRCxlQUFLdUIsZ0JBQUw7QUFDQSxjQUFJLEtBQUtmLFdBQVQsRUFBc0I7QUFDcEIsaUJBQUtpQixxQkFBTDtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLRCxrQkFBTDtBQUNEO0FBQ0Y7O0FBRUQsYUFBS2hCLFdBQUwsR0FBbUIsS0FBS0QsUUFBTCxHQUFnQixLQUFuQztBQUNELE9BeEowQjs7QUEwSjNCbUIsY0FBUSxrQkFBVztBQUNqQixhQUFLSCxnQkFBTDs7QUFFQSxZQUFJRixTQUFTLEtBQUtDLGVBQUwsRUFBYjs7QUFFQSxZQUFJLEtBQUtmLFFBQVQsRUFBbUI7QUFDakIsZUFBS2lCLGtCQUFMO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS2hCLFdBQVQsRUFBc0I7QUFDM0IsZUFBS2lCLHFCQUFMO0FBQ0QsU0FGTSxNQUVBLElBQUlKLE1BQUosRUFBWTtBQUNqQixlQUFLSSxxQkFBTDtBQUNELFNBRk0sTUFFQSxJQUFJLENBQUNKLE1BQUwsRUFBYTtBQUNsQixlQUFLRyxrQkFBTDtBQUNEOztBQUVELGFBQUtqQixRQUFMLEdBQWdCLEtBQUtDLFdBQUwsR0FBbUIsS0FBbkM7QUFDRCxPQTFLMEI7O0FBNEszQm1CLHVCQUFpQiwyQkFBVztBQUMxQixZQUFJN0IsV0FBV1csV0FBWCxDQUF1Qm1CLFVBQXZCLEVBQUosRUFBeUM7QUFDdkMsaUJBQU8sVUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLFdBQVA7QUFDRDtBQUNGLE9BbEwwQjs7QUFvTDNCQyxzQkFBZ0IsMEJBQVc7QUFDekIsWUFBSSxLQUFLdkIsS0FBTCxLQUFlTixhQUFuQixFQUFrQztBQUNoQyxpQkFBTyxVQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sT0FBUDtBQUNEO0FBQ0YsT0ExTDBCOztBQTRMM0JzQix1QkFBaUIsMkJBQVc7QUFDMUIsWUFBSVEsSUFBSSxVQUFSO0FBQ0EsWUFBSSxPQUFPLEtBQUt0VixNQUFMLENBQVl1VixRQUFuQixLQUFnQyxRQUFwQyxFQUE4QztBQUM1Q0QsY0FBSSxLQUFLdFYsTUFBTCxDQUFZdVYsUUFBWixDQUFxQlosSUFBckIsRUFBSjtBQUNEOztBQUVELFlBQUlXLEtBQUssVUFBVCxFQUFxQjtBQUNuQixpQkFBT2hDLFdBQVdXLFdBQVgsQ0FBdUJtQixVQUF2QixFQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUlFLEtBQUssV0FBVCxFQUFzQjtBQUMzQixpQkFBT2hDLFdBQVdXLFdBQVgsQ0FBdUJ1QixXQUF2QixFQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUlGLEVBQUVHLE1BQUYsQ0FBUyxDQUFULEVBQVksQ0FBWixLQUFrQixPQUF0QixFQUErQjtBQUNwQyxjQUFJQyxNQUFNSixFQUFFSyxLQUFGLENBQVEsR0FBUixFQUFhLENBQWIsQ0FBVjtBQUNBLGNBQUlELElBQUlqRixPQUFKLENBQVksSUFBWixLQUFxQixDQUF6QixFQUE0QjtBQUMxQmlGLGtCQUFNQSxJQUFJRCxNQUFKLENBQVcsQ0FBWCxFQUFjQyxJQUFJL08sTUFBSixHQUFhLENBQTNCLENBQU47QUFDRDs7QUFFRCxjQUFJaUIsUUFBUTNOLE9BQU8yYixVQUFuQjs7QUFFQSxpQkFBT2hKLFNBQVM4SSxHQUFULEtBQWlCOU4sUUFBUThOLEdBQWhDO0FBQ0QsU0FUTSxNQVNBO0FBQ0wsY0FBSUcsS0FBSzViLE9BQU82YixVQUFQLENBQWtCUixDQUFsQixDQUFUO0FBQ0EsaUJBQU9PLEdBQUdFLE9BQVY7QUFDRDtBQUNGLE9Bbk4wQjs7QUFxTjNCekIsZ0JBQVUsb0JBQVc7QUFDbkIsWUFBSSxLQUFLUixLQUFMLEtBQWVQLFVBQW5CLEVBQStCO0FBQzdCLGNBQUksQ0FBQyxLQUFLdlQsTUFBTCxDQUFZZ1csYUFBakIsRUFBZ0M7QUFDOUIsaUJBQUtoVyxNQUFMLENBQVlnVyxhQUFaLEdBQTRCLElBQTVCO0FBQ0Q7O0FBRUQsY0FBSUMsZ0JBQWdCLE1BQU0sS0FBS2pXLE1BQUwsQ0FBWWdXLGFBQVosQ0FBMEJyRixPQUExQixDQUFrQyxHQUFsQyxFQUF1QyxFQUF2QyxDQUExQjtBQUNBLGVBQUtpRCxjQUFMLENBQW9COUwsR0FBcEIsQ0FBd0I7QUFDdEJGLG1CQUFPcU8sZ0JBQWdCLEdBREQ7QUFFdEIvTCxxQkFBUztBQUZhLFdBQXhCOztBQUtBLGVBQUszQyxTQUFMLENBQWVPLEdBQWYsQ0FBbUI7QUFDakJGLG1CQUFPLEtBQUs1SCxNQUFMLENBQVlnVyxhQUFaLEdBQTRCO0FBRGxCLFdBQW5COztBQUlBLGVBQUt6TyxTQUFMLENBQWVPLEdBQWYsQ0FBbUIsTUFBbkIsRUFBMkJtTyxnQkFBZ0IsR0FBM0M7QUFDRDtBQUNGLE9Bdk8wQjs7QUF5TzNCQyxrQkFBWSxvQkFBUzdjLElBQVQsRUFBZTtBQUN6QixhQUFLbUgsSUFBTCxDQUFVbkgsSUFBVixFQUFnQjtBQUNkOGMscUJBQVcsSUFERztBQUVkdk8saUJBQU8zTixPQUFPMmIsVUFGQTtBQUdkM0IsdUJBQWEsS0FBS2tCLGVBQUw7QUFIQyxTQUFoQjtBQUtELE9BL08wQjs7QUFpUDNCSix3QkFBa0IsNEJBQVc7QUFDM0IsWUFBSXFCLE9BQU8sSUFBWDs7QUFFQSxhQUFLNVYsSUFBTCxDQUFVLFFBQVYsRUFBb0I7QUFDbEIyVixxQkFBVyxJQURPO0FBRWxCRSwwQkFBZ0IsS0FBS3ZCLGVBQUwsRUFGRTtBQUdsQndCLHVCQUFhLEtBQUtqQixjQUFMLEVBSEs7QUFJbEJNLGlCQUFPLGlCQUFXO0FBQ2hCUyxpQkFBS3JDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQXFDLGlCQUFLcEMsV0FBTCxHQUFtQixLQUFuQjtBQUNELFdBUGlCO0FBUWxCdUIsb0JBQVUsb0JBQVc7QUFDbkJhLGlCQUFLckMsUUFBTCxHQUFnQixLQUFoQjtBQUNBcUMsaUJBQUtwQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0QsV0FYaUI7QUFZbEJwTSxpQkFBTzNOLE9BQU8yYixVQVpJO0FBYWxCM0IsdUJBQWEsS0FBS2tCLGVBQUw7QUFiSyxTQUFwQjtBQWVELE9BblEwQjs7QUFxUTNCRiw2QkFBdUIsaUNBQVc7QUFDaEMsWUFBSSxLQUFLbkIsS0FBTCxLQUFlTixhQUFuQixFQUFrQztBQUNoQyxlQUFLMEMsVUFBTCxDQUFnQixhQUFoQjtBQUNBLGVBQUt0QyxjQUFMLENBQW9CM1AsSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0MsRUFBbEM7QUFDQSxlQUFLc0QsU0FBTCxDQUFldEQsSUFBZixDQUFvQixPQUFwQixFQUE2QixFQUE3Qjs7QUFFQSxlQUFLNlAsS0FBTCxHQUFhTixhQUFiOztBQUVBLGVBQUs1RCxTQUFMLENBQWVuSSxLQUFmLENBQ0UsS0FBSzFILFFBRFAsRUFFRSxLQUFLd0gsU0FGUCxFQUdFLEtBQUtxTSxjQUhQLEVBSUUsRUFBQy9MLFNBQVMsS0FBVixFQUFpQkQsT0FBTyxLQUF4QixFQUpGOztBQU9BLGVBQUtzTyxVQUFMLENBQWdCLGNBQWhCO0FBQ0Q7QUFDRixPQXRSMEI7O0FBd1IzQmxCLDBCQUFvQiw4QkFBVztBQUM3QixZQUFJLEtBQUtsQixLQUFMLEtBQWVQLFVBQW5CLEVBQStCO0FBQzdCLGVBQUsyQyxVQUFMLENBQWdCLFVBQWhCOztBQUVBLGVBQUt0RyxTQUFMLENBQWVqTixPQUFmOztBQUVBLGVBQUtpUixjQUFMLENBQW9CM1AsSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0MsRUFBbEM7QUFDQSxlQUFLc0QsU0FBTCxDQUFldEQsSUFBZixDQUFvQixPQUFwQixFQUE2QixFQUE3Qjs7QUFFQSxlQUFLNlAsS0FBTCxHQUFhUCxVQUFiO0FBQ0EsZUFBS2UsUUFBTDs7QUFFQSxlQUFLNEIsVUFBTCxDQUFnQixXQUFoQjtBQUNEO0FBQ0YsT0F0UzBCOztBQXdTM0IzVixnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjs7QUFFQSxhQUFLTCxvQkFBTDs7QUFFQSxhQUFLSixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS0QsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQS9TMEIsS0FBYixDQUFoQjs7QUFrVEEsYUFBUzhNLFFBQVQsQ0FBa0IySixDQUFsQixFQUFxQjtBQUNuQixhQUFPLENBQUMvSixNQUFNb0UsV0FBVzJGLENBQVgsQ0FBTixDQUFELElBQXlCQyxTQUFTRCxDQUFULENBQWhDO0FBQ0Q7O0FBRUQ3VixlQUFXQyxLQUFYLENBQWlCK1MsU0FBakI7O0FBRUEsV0FBT0EsU0FBUDtBQUNELEdBOVQyQixDQUE1QjtBQStURCxDQW5VRDs7O0FDaEJBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLENBQUMsWUFBVztBQUNWOztBQUVBdFosVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JzRixPQUF4QixDQUFnQyxpQkFBaEMsRUFBbUQsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixVQUFTOUQsTUFBVCxFQUFpQlgsUUFBakIsRUFBMkI7O0FBRW5HLFFBQUl1YixrQkFBa0J2YyxNQUFNcEIsTUFBTixDQUFhOztBQUVqQ2MsWUFBTSxjQUFTbUUsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQyxhQUFLRSxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLMEMsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtpQyxNQUFMLEdBQWNILEtBQWQ7O0FBRUEsYUFBSzZXLElBQUwsR0FBWSxLQUFLM1csUUFBTCxDQUFjLENBQWQsRUFBaUIyVyxJQUFqQixDQUFzQnBXLElBQXRCLENBQTJCLEtBQUtQLFFBQUwsQ0FBYyxDQUFkLENBQTNCLENBQVo7QUFDQWhDLGNBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQXRCO0FBQ0QsT0FUZ0M7O0FBV2pDQyxnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjtBQUNBLGFBQUtULFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxLQUFLMFcsSUFBTCxHQUFZLEtBQUtDLFVBQUwsR0FBa0IsSUFBMUU7QUFDRDtBQWRnQyxLQUFiLENBQXRCOztBQWlCQWpXLGVBQVdDLEtBQVgsQ0FBaUI4VixlQUFqQjtBQUNBNWEsV0FBTytFLDJCQUFQLENBQW1DNlYsZUFBbkMsRUFBb0QsQ0FBQyxNQUFELENBQXBEOztBQUVBLFdBQU9BLGVBQVA7QUFDRCxHQXZCa0QsQ0FBbkQ7QUF3QkQsQ0EzQkQ7OztBQ2hCQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxDQUFDLFlBQVc7QUFDVjs7QUFFQXJjLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCc0YsT0FBeEIsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixVQUFTOUQsTUFBVCxFQUFpQlgsUUFBakIsRUFBMkI7O0FBRWhHLFFBQUkwYixlQUFlMWMsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFOUJjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFBQTs7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzBDLE1BQUwsR0FBYy9CLEtBQWQ7QUFDQSxhQUFLaUMsTUFBTCxHQUFjSCxLQUFkOztBQUVBLGFBQUtJLHFCQUFMLEdBQTZCcEUsT0FBT3FFLGFBQVAsQ0FBcUIsSUFBckIsRUFBMkIsS0FBS0gsUUFBTCxDQUFjLENBQWQsQ0FBM0IsRUFBNkMsQ0FDeEUsTUFEd0UsRUFDaEUsT0FEZ0UsRUFDdkQsUUFEdUQsRUFDN0MsTUFENkMsQ0FBN0MsQ0FBN0I7O0FBSUEsYUFBS0ksb0JBQUwsR0FBNEJ0RSxPQUFPdUUsWUFBUCxDQUFvQixJQUFwQixFQUEwQmhELFFBQVEsQ0FBUixDQUExQixFQUFzQyxDQUNoRSxZQURnRSxFQUNsRCxTQURrRCxFQUN2QyxVQUR1QyxFQUMzQixVQUQyQixFQUNmLFdBRGUsQ0FBdEMsRUFFekI7QUFBQSxpQkFBVWlELE9BQU91TixJQUFQLEdBQWN4VCxRQUFRdEIsTUFBUixDQUFldUgsTUFBZixFQUF1QixFQUFDdU4sV0FBRCxFQUF2QixDQUFkLEdBQXFEdk4sTUFBL0Q7QUFBQSxTQUZ5QixDQUE1Qjs7QUFJQXRDLGNBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQXRCO0FBQ0QsT0FoQjZCOztBQWtCOUJDLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWOztBQUVBLGFBQUtQLHFCQUFMO0FBQ0EsYUFBS0Usb0JBQUw7O0FBRUEsYUFBS0osUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLElBQTVDO0FBQ0Q7QUF6QjZCLEtBQWIsQ0FBbkI7O0FBNEJBVSxlQUFXQyxLQUFYLENBQWlCaVcsWUFBakI7QUFDQS9hLFdBQU8rRSwyQkFBUCxDQUFtQ2dXLFlBQW5DLEVBQWlELENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsUUFBakIsQ0FBakQ7O0FBRUEsV0FBT0EsWUFBUDtBQUNELEdBbEMrQyxDQUFoRDtBQW1DRCxDQXRDRDs7O0FDaEJBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLENBQUMsWUFBVztBQUNWOztBQUVBeGMsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JzRixPQUF4QixDQUFnQyxVQUFoQyxFQUE0QyxDQUFDLFFBQUQsRUFBVyxVQUFTOUQsTUFBVCxFQUFpQjs7QUFFdEUsUUFBSWdiLFdBQVczYyxNQUFNcEIsTUFBTixDQUFhO0FBQzFCYyxZQUFNLGNBQVNtRSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLGFBQUtFLFFBQUwsR0FBZ0IzQyxPQUFoQjtBQUNBLGFBQUswQyxNQUFMLEdBQWMvQixLQUFkO0FBQ0EsYUFBS2lDLE1BQUwsR0FBY0gsS0FBZDtBQUNBOUIsY0FBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLEtBQUs0RSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBdEI7QUFDRCxPQU55Qjs7QUFRMUJDLGdCQUFVLG9CQUFXO0FBQ25CLGFBQUtDLElBQUwsQ0FBVSxTQUFWO0FBQ0EsYUFBS1QsUUFBTCxHQUFnQixLQUFLRCxNQUFMLEdBQWMsS0FBS0UsTUFBTCxHQUFjLElBQTVDO0FBQ0Q7QUFYeUIsS0FBYixDQUFmOztBQWNBVSxlQUFXQyxLQUFYLENBQWlCa1csUUFBakI7QUFDQWhiLFdBQU8rRSwyQkFBUCxDQUFtQ2lXLFFBQW5DLEVBQTZDLENBQUMsb0JBQUQsQ0FBN0M7O0FBRUEsS0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixTQUFsQixFQUE2QixNQUE3QixFQUFxQzlTLE9BQXJDLENBQTZDLFVBQUMrUyxJQUFELEVBQU9oUyxDQUFQLEVBQWE7QUFDeEQzTCxhQUFPc1IsY0FBUCxDQUFzQm9NLFNBQVM1ZCxTQUEvQixFQUEwQzZkLElBQTFDLEVBQWdEO0FBQzlDdmEsYUFBSyxlQUFZO0FBQ2YsY0FBSXdhLDZCQUEwQmpTLElBQUksQ0FBSixHQUFRLE1BQVIsR0FBaUJnUyxJQUEzQyxDQUFKO0FBQ0EsaUJBQU8xYyxRQUFRZ0QsT0FBUixDQUFnQixLQUFLMkMsUUFBTCxDQUFjLENBQWQsRUFBaUIrVyxJQUFqQixDQUFoQixFQUF3Q25aLElBQXhDLENBQTZDb1osT0FBN0MsQ0FBUDtBQUNEO0FBSjZDLE9BQWhEO0FBTUQsS0FQRDs7QUFTQSxXQUFPRixRQUFQO0FBQ0QsR0E3QjJDLENBQTVDO0FBOEJELENBakNEOzs7QUNoQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVTtBQUNUOztBQUVBemMsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JzRixPQUF4QixDQUFnQyxZQUFoQyxFQUE4QyxDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFVBQVMrRixNQUFULEVBQWlCN0osTUFBakIsRUFBeUI7O0FBRTFGLFFBQUltYixhQUFhOWMsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFNUI7Ozs7O0FBS0FjLFlBQU0sY0FBU3dELE9BQVQsRUFBa0JXLEtBQWxCLEVBQXlCOEIsS0FBekIsRUFBZ0M7QUFBQTs7QUFDcEMsYUFBS0UsUUFBTCxHQUFnQjNDLE9BQWhCO0FBQ0EsYUFBSzZaLFNBQUwsR0FBaUI3YyxRQUFRZ0QsT0FBUixDQUFnQkEsUUFBUSxDQUFSLEVBQVdNLGFBQVgsQ0FBeUIsc0JBQXpCLENBQWhCLENBQWpCO0FBQ0EsYUFBS29DLE1BQUwsR0FBYy9CLEtBQWQ7O0FBRUEsYUFBS21aLGVBQUwsQ0FBcUI5WixPQUFyQixFQUE4QlcsS0FBOUIsRUFBcUM4QixLQUFyQzs7QUFFQSxhQUFLQyxNQUFMLENBQVluRSxHQUFaLENBQWdCLFVBQWhCLEVBQTRCLFlBQU07QUFDaEMsZ0JBQUs2RSxJQUFMLENBQVUsU0FBVjtBQUNBLGdCQUFLVCxRQUFMLEdBQWdCLE1BQUtrWCxTQUFMLEdBQWlCLE1BQUtuWCxNQUFMLEdBQWMsSUFBL0M7QUFDRCxTQUhEO0FBSUQsT0FsQjJCOztBQW9CNUJvWCx1QkFBaUIseUJBQVM5WixPQUFULEVBQWtCVyxLQUFsQixFQUF5QjhCLEtBQXpCLEVBQWdDO0FBQUE7O0FBQy9DLFlBQUlBLE1BQU1zWCxPQUFWLEVBQW1CO0FBQ2pCLGNBQUl4TSxNQUFNakYsT0FBTzdGLE1BQU1zWCxPQUFiLEVBQXNCQyxNQUFoQzs7QUFFQXJaLGdCQUFNc1osT0FBTixDQUFjNVQsTUFBZCxDQUFxQjVELE1BQU1zWCxPQUEzQixFQUFvQyxpQkFBUztBQUMzQyxtQkFBS0csT0FBTCxHQUFlLENBQUMsQ0FBQzFiLEtBQWpCO0FBQ0QsV0FGRDs7QUFJQSxlQUFLbUUsUUFBTCxDQUFjd0csRUFBZCxDQUFpQixRQUFqQixFQUEyQixhQUFLO0FBQzlCb0UsZ0JBQUk1TSxNQUFNc1osT0FBVixFQUFtQixPQUFLQyxPQUF4Qjs7QUFFQSxnQkFBSXpYLE1BQU0wWCxRQUFWLEVBQW9CO0FBQ2xCeFosb0JBQU1tRixLQUFOLENBQVlyRCxNQUFNMFgsUUFBbEI7QUFDRDs7QUFFRHhaLGtCQUFNc1osT0FBTixDQUFjelksVUFBZDtBQUNELFdBUkQ7QUFTRDtBQUNGO0FBdEMyQixLQUFiLENBQWpCOztBQXlDQThCLGVBQVdDLEtBQVgsQ0FBaUJxVyxVQUFqQjtBQUNBbmIsV0FBTytFLDJCQUFQLENBQW1Db1csVUFBbkMsRUFBK0MsQ0FBQyxVQUFELEVBQWEsU0FBYixFQUF3QixVQUF4QixDQUEvQzs7QUFFQSxXQUFPQSxVQUFQO0FBQ0QsR0EvQzZDLENBQTlDO0FBZ0RELENBbkREOzs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUkzYyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPdUIsS0FBUCxDQUFhLG9CQUFiLEVBQW1DbEIsSUFBSXlCLFNBQUosQ0FBY3FiLGtCQUFqRDtBQUNBbmQsU0FBT3VCLEtBQVAsQ0FBYSxvQkFBYixFQUFtQ2xCLElBQUl5QixTQUFKLENBQWNzYixrQkFBakQ7QUFDQXBkLFNBQU91QixLQUFQLENBQWEscUJBQWIsRUFBb0NsQixJQUFJeUIsU0FBSixDQUFjdWIsbUJBQWxEOztBQUVBcmQsU0FBT3NGLE9BQVAsQ0FBZSxZQUFmLEVBQTZCLENBQUMsUUFBRCxFQUFXLFVBQVM5RCxNQUFULEVBQWlCO0FBQ3ZELFFBQUk4YixhQUFhemQsTUFBTXBCLE1BQU4sQ0FBYTs7QUFFNUJjLFlBQU0sY0FBU21FLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMsWUFBSXpDLFFBQVEsQ0FBUixFQUFXUSxRQUFYLENBQW9CQyxXQUFwQixPQUFzQyxZQUExQyxFQUF3RDtBQUN0RCxnQkFBTSxJQUFJbkMsS0FBSixDQUFVLHFEQUFWLENBQU47QUFDRDs7QUFFRCxhQUFLb0UsTUFBTCxHQUFjL0IsS0FBZDtBQUNBLGFBQUtnQyxRQUFMLEdBQWdCM0MsT0FBaEI7QUFDQSxhQUFLNEMsTUFBTCxHQUFjSCxLQUFkO0FBQ0EsYUFBSytYLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQixJQUF0Qjs7QUFFQSxhQUFLL1gsTUFBTCxDQUFZbkUsR0FBWixDQUFnQixVQUFoQixFQUE0QixLQUFLNEUsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQTVCOztBQUVBLGFBQUtILG9CQUFMLEdBQTRCdEUsT0FBT3VFLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEJoRCxRQUFRLENBQVIsQ0FBMUIsRUFBc0MsQ0FDaEUsVUFEZ0UsRUFDcEQsWUFEb0QsRUFDdEMsV0FEc0MsRUFDekIsTUFEeUIsRUFDakIsTUFEaUIsRUFDVCxNQURTLEVBQ0QsU0FEQyxDQUF0QyxDQUE1Qjs7QUFJQSxhQUFLNkMscUJBQUwsR0FBNkJwRSxPQUFPcUUsYUFBUCxDQUFxQixJQUFyQixFQUEyQjlDLFFBQVEsQ0FBUixDQUEzQixFQUF1QyxDQUNsRSxjQURrRSxFQUVsRSxxQkFGa0UsRUFHbEUsbUJBSGtFLEVBSWxFLFVBSmtFLENBQXZDLENBQTdCO0FBTUQsT0F6QjJCOztBQTJCNUJtRCxnQkFBVSxvQkFBVztBQUNuQixhQUFLQyxJQUFMLENBQVUsU0FBVjs7QUFFQSxhQUFLTCxvQkFBTDtBQUNBLGFBQUtGLHFCQUFMOztBQUVBLGFBQUtGLFFBQUwsR0FBZ0IsS0FBS0QsTUFBTCxHQUFjLEtBQUtFLE1BQUwsR0FBYyxJQUE1QztBQUNEO0FBbEMyQixLQUFiLENBQWpCO0FBb0NBVSxlQUFXQyxLQUFYLENBQWlCZ1gsVUFBakI7O0FBRUFBLGVBQVd2VyxnQkFBWCxHQUE4QixVQUFTL0gsSUFBVCxFQUFlZ0ksUUFBZixFQUF5QjtBQUNyRCxhQUFPcEgsT0FBT1MsR0FBUCxDQUFXb2QsYUFBWCxDQUF5QjFXLGdCQUF6QixDQUEwQy9ILElBQTFDLEVBQWdEZ0ksUUFBaEQsQ0FBUDtBQUNELEtBRkQ7O0FBSUEsV0FBT3NXLFVBQVA7QUFDRCxHQTVDNEIsQ0FBN0I7QUE4Q0QsQ0F2REQ7OztBNUJqQkE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQTs7OztBQUdBdmQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxnQkFBbEMsRUFBb0QsQ0FBQyxRQUFELEVBQVcsaUJBQVgsRUFBOEIsVUFBU2xjLE1BQVQsRUFBaUIrRCxlQUFqQixFQUFrQztBQUNsSCxXQUFPO0FBQ0xvWSxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTDVTLGFBQU8sSUFIRjtBQUlMa2Esa0JBQVksS0FKUDs7QUFNTG5hLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5Qjs7QUFFaEMsZUFBTztBQUNMcVksZUFBSyxhQUFTbmEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNuQyxnQkFBSWQsY0FBYyxJQUFJYSxlQUFKLENBQW9CN0IsS0FBcEIsRUFBMkJYLE9BQTNCLEVBQW9DeUMsS0FBcEMsQ0FBbEI7O0FBRUFoRSxtQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NkLFdBQWxDO0FBQ0FsRCxtQkFBT3NjLHFCQUFQLENBQTZCcFosV0FBN0IsRUFBMEMsMkNBQTFDO0FBQ0FsRCxtQkFBT29HLG1DQUFQLENBQTJDbEQsV0FBM0MsRUFBd0QzQixPQUF4RDs7QUFFQUEsb0JBQVFPLElBQVIsQ0FBYSxrQkFBYixFQUFpQ29CLFdBQWpDO0FBQ0EzQixvQkFBUU8sSUFBUixDQUFhLFFBQWIsRUFBdUJJLEtBQXZCOztBQUVBQSxrQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0JvRCwwQkFBWXFELE9BQVosR0FBc0J0RixTQUF0QjtBQUNBakIscUJBQU93RyxxQkFBUCxDQUE2QnRELFdBQTdCO0FBQ0EzQixzQkFBUU8sSUFBUixDQUFhLGtCQUFiLEVBQWlDYixTQUFqQztBQUNBTSx3QkFBVSxJQUFWO0FBQ0QsYUFMRDtBQU1ELFdBakJJO0FBa0JMZ2IsZ0JBQU0sY0FBU3JhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCO0FBQzdCdkIsbUJBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBcEJJLFNBQVA7QUFzQkQ7QUE5QkksS0FBUDtBQWdDRCxHQWpDbUQsQ0FBcEQ7QUFtQ0QsQ0F6Q0Q7OztBNkJwR0EsQ0FBQyxZQUFVO0FBQ1Q7O0FBQ0EsTUFBSS9DLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU8wZCxTQUFQLENBQWlCLGVBQWpCLEVBQWtDLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsYUFBdkIsRUFBc0Msa0JBQXRDLEVBQTBELFVBQVNsYyxNQUFULEVBQWlCWCxRQUFqQixFQUEyQjBHLFdBQTNCLEVBQXdDMFcsZ0JBQXhDLEVBQTBEO0FBQ3BKLFdBQU87QUFDTE4sZ0JBQVUsR0FETDtBQUVMckgsZUFBUyxLQUZKOztBQUlMN1MsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPO0FBQ0xxWSxlQUFLLGFBQVNuYSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDMFksVUFBaEMsRUFBNENOLFVBQTVDLEVBQXdEO0FBQzNELGdCQUFJTyxhQUFhNVcsWUFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDO0FBQzNENEMsdUJBQVM7QUFEa0QsYUFBNUMsQ0FBakI7O0FBSUExRSxrQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0I2Yyx5QkFBV3BXLE9BQVgsR0FBcUJ0RixTQUFyQjtBQUNBakIscUJBQU93RyxxQkFBUCxDQUE2Qm1XLFVBQTdCO0FBQ0FwYix3QkFBVSxJQUFWO0FBQ0QsYUFKRDs7QUFNQWtiLDZCQUFpQm5XLFNBQWpCLENBQTJCcEUsS0FBM0IsRUFBa0MsWUFBVztBQUMzQ3VhLCtCQUFpQkcsWUFBakIsQ0FBOEIxYSxLQUE5QjtBQUNBdWEsK0JBQWlCSSxpQkFBakIsQ0FBbUM3WSxLQUFuQztBQUNBekMsd0JBQVVXLFFBQVE4QixRQUFRLElBQTFCO0FBQ0QsYUFKRDtBQUtELFdBakJJO0FBa0JMdVksZ0JBQU0sY0FBU3JhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCO0FBQzdCdkIsbUJBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBcEJJLFNBQVA7QUFzQkQ7QUE1QkksS0FBUDtBQThCRCxHQS9CaUMsQ0FBbEM7QUFnQ0QsQ0FwQ0Q7OztBQ0FBLENBQUMsWUFBVTtBQUNUOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxrQkFBbEMsRUFBc0QsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixVQUFTbGMsTUFBVCxFQUFpQitGLFdBQWpCLEVBQThCO0FBQzVHLFdBQU87QUFDTG9XLGdCQUFVLEdBREw7QUFFTHZaLFlBQU07QUFDSnlaLGFBQUssYUFBU25hLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDbkMrQixzQkFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDO0FBQzFDNEMscUJBQVM7QUFEaUMsV0FBNUM7QUFHRCxTQUxHOztBQU9KMlYsY0FBTSxjQUFTcmEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQ2hFLGlCQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQVRHO0FBRkQsS0FBUDtBQWNELEdBZnFELENBQXREO0FBaUJELENBcEJEOzs7QUNDQTs7OztBQUlBLENBQUMsWUFBVTtBQUNUOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxXQUFsQyxFQUErQyxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNsYyxNQUFULEVBQWlCK0YsV0FBakIsRUFBOEI7QUFDckcsV0FBTztBQUNMb1csZ0JBQVUsR0FETDtBQUVMdlosWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLFlBQUk4WSxTQUFTL1csWUFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDO0FBQ3ZENEMsbUJBQVM7QUFEOEMsU0FBNUMsQ0FBYjs7QUFJQXRKLGVBQU9zUixjQUFQLENBQXNCa08sTUFBdEIsRUFBOEIsVUFBOUIsRUFBMEM7QUFDeENwYyxlQUFLLGVBQVk7QUFDZixtQkFBTyxLQUFLd0QsUUFBTCxDQUFjLENBQWQsRUFBaUI2WSxRQUF4QjtBQUNELFdBSHVDO0FBSXhDak8sZUFBSyxhQUFTL08sS0FBVCxFQUFnQjtBQUNuQixtQkFBUSxLQUFLbUUsUUFBTCxDQUFjLENBQWQsRUFBaUI2WSxRQUFqQixHQUE0QmhkLEtBQXBDO0FBQ0Q7QUFOdUMsU0FBMUM7QUFRQUMsZUFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFoQkksS0FBUDtBQWtCRCxHQW5COEMsQ0FBL0M7QUF1QkQsQ0ExQkQ7OztBNUJMQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzBkLFNBQVAsQ0FBaUIsYUFBakIsRUFBZ0MsQ0FBQyxRQUFELEVBQVcsY0FBWCxFQUEyQixVQUFTbGMsTUFBVCxFQUFpQm9GLFlBQWpCLEVBQStCO0FBQ3hGLFdBQU87QUFDTCtXLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjs7QUFJTDtBQUNBO0FBQ0E1UyxhQUFPLEtBTkY7QUFPTGthLGtCQUFZLEtBUFA7O0FBU0xuYSxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7O0FBRWhDLGVBQU8sVUFBUzlCLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDckMsY0FBSXFCLFdBQVcsSUFBSUQsWUFBSixDQUFpQmxELEtBQWpCLEVBQXdCWCxPQUF4QixFQUFpQ3lDLEtBQWpDLENBQWY7O0FBRUF6QyxrQkFBUU8sSUFBUixDQUFhLGNBQWIsRUFBNkJ1RCxRQUE3Qjs7QUFFQXJGLGlCQUFPc2MscUJBQVAsQ0FBNkJqWCxRQUE3QixFQUF1Qyx1Q0FBdkM7QUFDQXJGLGlCQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQ3FCLFFBQWxDOztBQUVBbkQsZ0JBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFXO0FBQy9CdUYscUJBQVNrQixPQUFULEdBQW1CdEYsU0FBbkI7QUFDQU0sb0JBQVFPLElBQVIsQ0FBYSxjQUFiLEVBQTZCYixTQUE3QjtBQUNBTSxzQkFBVSxJQUFWO0FBQ0QsV0FKRDs7QUFNQXZCLGlCQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRCxTQWZEO0FBZ0JEOztBQTNCSSxLQUFQO0FBOEJELEdBL0IrQixDQUFoQzs7QUFpQ0EvQyxTQUFPMGQsU0FBUCxDQUFpQixpQkFBakIsRUFBb0MsWUFBVztBQUM3QyxXQUFPO0FBQ0xDLGdCQUFVLEdBREw7QUFFTGxhLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5QjtBQUNoQyxlQUFPLFVBQVM5QixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3JDLGNBQUk5QixNQUFNbUgsS0FBVixFQUFpQjtBQUNmOUgsb0JBQVEsQ0FBUixFQUFXeWIsYUFBWCxDQUF5QkMsTUFBekI7QUFDQTFiLG9CQUFRLENBQVIsRUFBV3liLGFBQVgsQ0FBeUJFLGtCQUF6QjtBQUNBM2Isb0JBQVEsQ0FBUixFQUFXeWIsYUFBWCxDQUF5QkcsY0FBekI7QUFDRDtBQUNGLFNBTkQ7QUFPRDtBQVZJLEtBQVA7QUFZRCxHQWJEO0FBZUQsQ0FyREQ7OztBQzNHQTs7OztBQUlBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7O0FBYUEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUE1ZSxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjBkLFNBQXhCLENBQWtDLFdBQWxDLEVBQStDLENBQUMsUUFBRCxFQUFXLFlBQVgsRUFBeUIsVUFBU2xjLE1BQVQsRUFBaUJzRixVQUFqQixFQUE2QjtBQUNuRyxXQUFPO0FBQ0w2VyxnQkFBVSxHQURMO0FBRUxqYSxhQUFPLElBRkY7QUFHTEQsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPO0FBQ0xxWSxlQUFLLGFBQVNuYSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDOztBQUVuQyxnQkFBSVgsU0FBUyxJQUFJaUMsVUFBSixDQUFlcEQsS0FBZixFQUFzQlgsT0FBdEIsRUFBK0J5QyxLQUEvQixDQUFiO0FBQ0FoRSxtQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NYLE1BQWxDO0FBQ0FyRCxtQkFBT3NjLHFCQUFQLENBQTZCalosTUFBN0IsRUFBcUMsMkNBQXJDO0FBQ0FyRCxtQkFBT29HLG1DQUFQLENBQTJDL0MsTUFBM0MsRUFBbUQ5QixPQUFuRDs7QUFFQUEsb0JBQVFPLElBQVIsQ0FBYSxZQUFiLEVBQTJCdUIsTUFBM0I7QUFDQW5CLGtCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQnVELHFCQUFPa0QsT0FBUCxHQUFpQnRGLFNBQWpCO0FBQ0FqQixxQkFBT3dHLHFCQUFQLENBQTZCbkQsTUFBN0I7QUFDQTlCLHNCQUFRTyxJQUFSLENBQWEsWUFBYixFQUEyQmIsU0FBM0I7QUFDQU0sd0JBQVUsSUFBVjtBQUNELGFBTEQ7QUFNRCxXQWZJOztBQWlCTGdiLGdCQUFNLGNBQVNyYSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QjtBQUM3QnZCLG1CQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQW5CSSxTQUFQO0FBcUJEO0FBMUJJLEtBQVA7QUE0QkQsR0E3QjhDLENBQS9DO0FBK0JELENBbENEOzs7QTRCbkdBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUkvQyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPMGQsU0FBUCxDQUFpQixpQkFBakIsRUFBb0MsQ0FBQyxZQUFELEVBQWUsVUFBUzVjLFVBQVQsRUFBcUI7QUFDdEUsUUFBSThkLFVBQVUsS0FBZDs7QUFFQSxXQUFPO0FBQ0xqQixnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7O0FBSUxsUyxZQUFNO0FBQ0oyWixjQUFNLGNBQVNyYSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QjtBQUM3QixjQUFJLENBQUM2YixPQUFMLEVBQWM7QUFDWkEsc0JBQVUsSUFBVjtBQUNBOWQsdUJBQVcrZCxVQUFYLENBQXNCLFlBQXRCO0FBQ0Q7QUFDRDliLGtCQUFRcUQsTUFBUjtBQUNEO0FBUEc7QUFKRCxLQUFQO0FBY0QsR0FqQm1DLENBQXBDO0FBbUJELENBeEJEOzs7QTFCQUE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSXBHLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU8wZCxTQUFQLENBQWlCLFFBQWpCLEVBQTJCLENBQUMsUUFBRCxFQUFXLFNBQVgsRUFBc0IsVUFBU2xjLE1BQVQsRUFBaUI4RixPQUFqQixFQUEwQjtBQUN6RSxXQUFPO0FBQ0xxVyxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTDVTLGFBQU8sS0FIRjtBQUlMa2Esa0JBQVksS0FKUDs7QUFNTG5hLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5Qjs7QUFFaEMsZUFBTyxVQUFTOUIsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNyQyxjQUFJc1osTUFBTSxJQUFJeFgsT0FBSixDQUFZNUQsS0FBWixFQUFtQlgsT0FBbkIsRUFBNEJ5QyxLQUE1QixDQUFWOztBQUVBekMsa0JBQVFPLElBQVIsQ0FBYSxTQUFiLEVBQXdCd2IsR0FBeEI7O0FBRUF0ZCxpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NzWixHQUFsQzs7QUFFQXBiLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQnlCLG9CQUFRTyxJQUFSLENBQWEsU0FBYixFQUF3QmIsU0FBeEI7QUFDQU0sc0JBQVUsSUFBVjtBQUNELFdBSEQ7O0FBS0F2QixpQkFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0QsU0FiRDtBQWNEOztBQXRCSSxLQUFQO0FBeUJELEdBMUIwQixDQUEzQjtBQTRCRCxDQWpDRDs7O0EyQmJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUlnYyxTQUNGLENBQUMscUZBQ0MsK0VBREYsRUFDbUZ6RCxLQURuRixDQUN5RixJQUR6RixDQURGOztBQUlBdmIsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxvQkFBbEMsRUFBd0QsQ0FBQyxRQUFELEVBQVcsVUFBU2xjLE1BQVQsRUFBaUI7O0FBRWxGLFFBQUl3ZCxXQUFXRCxPQUFPRSxNQUFQLENBQWMsVUFBU0MsSUFBVCxFQUFlbGdCLElBQWYsRUFBcUI7QUFDaERrZ0IsV0FBSyxPQUFPQyxRQUFRbmdCLElBQVIsQ0FBWixJQUE2QixHQUE3QjtBQUNBLGFBQU9rZ0IsSUFBUDtBQUNELEtBSGMsRUFHWixFQUhZLENBQWY7O0FBS0EsYUFBU0MsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0I7QUFDcEIsYUFBT0EsSUFBSUMsTUFBSixDQUFXLENBQVgsRUFBY0MsV0FBZCxLQUE4QkYsSUFBSUcsS0FBSixDQUFVLENBQVYsQ0FBckM7QUFDRDs7QUFFRCxXQUFPO0FBQ0w1QixnQkFBVSxHQURMO0FBRUxqYSxhQUFPc2IsUUFGRjs7QUFJTDtBQUNBO0FBQ0ExSSxlQUFTLEtBTko7QUFPTHNILGtCQUFZLElBUFA7O0FBU0xuYSxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7QUFDaEMsZUFBTyxTQUFTcEIsSUFBVCxDQUFjVixLQUFkLEVBQXFCWCxPQUFyQixFQUE4QnlDLEtBQTlCLEVBQXFDZ2EsQ0FBckMsRUFBd0M1QixVQUF4QyxFQUFvRDs7QUFFekRBLHFCQUFXbGEsTUFBTXNaLE9BQWpCLEVBQTBCLFVBQVN4UyxNQUFULEVBQWlCO0FBQ3pDekgsb0JBQVFnVSxNQUFSLENBQWV2TSxNQUFmO0FBQ0QsV0FGRDs7QUFJQSxjQUFJaVYsVUFBVSxTQUFWQSxPQUFVLENBQVNyVCxLQUFULEVBQWdCO0FBQzVCLGdCQUFJeEMsT0FBTyxPQUFPdVYsUUFBUS9TLE1BQU1pSixJQUFkLENBQWxCOztBQUVBLGdCQUFJekwsUUFBUW9WLFFBQVosRUFBc0I7QUFDcEJ0YixvQkFBTWtHLElBQU4sRUFBWSxFQUFDaUgsUUFBUXpFLEtBQVQsRUFBWjtBQUNEO0FBQ0YsV0FORDs7QUFRQSxjQUFJc1QsZUFBSjs7QUFFQXRhLHVCQUFhLFlBQVc7QUFDdEJzYSw4QkFBa0IzYyxRQUFRLENBQVIsRUFBV3lULGdCQUE3QjtBQUNBa0osNEJBQWdCeFQsRUFBaEIsQ0FBbUI2UyxPQUFPWSxJQUFQLENBQVksR0FBWixDQUFuQixFQUFxQ0YsT0FBckM7QUFDRCxXQUhEOztBQUtBamUsaUJBQU9xRyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJwRSxLQUF6QixFQUFnQyxZQUFXO0FBQ3pDZ2MsNEJBQWdCblQsR0FBaEIsQ0FBb0J3UyxPQUFPWSxJQUFQLENBQVksR0FBWixDQUFwQixFQUFzQ0YsT0FBdEM7QUFDQWplLG1CQUFPeUcsY0FBUCxDQUFzQjtBQUNwQnZFLHFCQUFPQSxLQURhO0FBRXBCWCx1QkFBU0EsT0FGVztBQUdwQnlDLHFCQUFPQTtBQUhhLGFBQXRCO0FBS0FrYSw0QkFBZ0IzYyxPQUFoQixHQUEwQlcsUUFBUVgsVUFBVXlDLFFBQVEsSUFBcEQ7QUFDRCxXQVJEOztBQVVBaEUsaUJBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNELFNBaENEO0FBaUNEO0FBM0NJLEtBQVA7QUE2Q0QsR0F4RHVELENBQXhEO0FBeURELENBaEVEOzs7QUNDQTs7OztBQUtBLENBQUMsWUFBVztBQUNWOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxTQUFsQyxFQUE2QyxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNsYyxNQUFULEVBQWlCK0YsV0FBakIsRUFBOEI7QUFDbkcsV0FBTztBQUNMb1csZ0JBQVUsR0FETDs7QUFHTGxhLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5Qjs7QUFFaEMsWUFBSUEsTUFBTW9hLElBQU4sQ0FBV3hKLE9BQVgsQ0FBbUIsSUFBbkIsTUFBNkIsQ0FBQyxDQUFsQyxFQUFxQztBQUNuQzVRLGdCQUFNeU8sUUFBTixDQUFlLE1BQWYsRUFBdUIsWUFBTTtBQUMzQjdPLHlCQUFhO0FBQUEscUJBQU1yQyxRQUFRLENBQVIsRUFBVzhjLE9BQVgsRUFBTjtBQUFBLGFBQWI7QUFDRCxXQUZEO0FBR0Q7O0FBRUQsZUFBTyxVQUFDbmMsS0FBRCxFQUFRWCxPQUFSLEVBQWlCeUMsS0FBakIsRUFBMkI7QUFDaEMrQixzQkFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDO0FBQzFDNEMscUJBQVM7QUFEaUMsV0FBNUM7QUFHQTtBQUNELFNBTEQ7QUFPRDs7QUFsQkksS0FBUDtBQXFCRCxHQXRCNEMsQ0FBN0M7QUF3QkQsQ0EzQkQ7OztBQ05BOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7QUFTQSxDQUFDLFlBQVU7QUFDVDs7QUFFQSxNQUFJcEksU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzBkLFNBQVAsQ0FBaUIsa0JBQWpCLEVBQXFDLENBQUMsUUFBRCxFQUFXLFlBQVgsRUFBeUIsVUFBU2xjLE1BQVQsRUFBaUJ5WCxVQUFqQixFQUE2QjtBQUN6RixXQUFPO0FBQ0wwRSxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7O0FBSUw7QUFDQTtBQUNBc0gsa0JBQVksS0FOUDtBQU9MbGEsYUFBTyxLQVBGOztBQVNMRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCO0FBQ3pCQSxnQkFBUTBLLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCOztBQUVBLGVBQU8sVUFBUy9KLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDckNBLGdCQUFNeU8sUUFBTixDQUFlLGtCQUFmLEVBQW1DNEcsTUFBbkM7QUFDQTVCLHFCQUFXVyxXQUFYLENBQXVCMU4sRUFBdkIsQ0FBMEIsUUFBMUIsRUFBb0MyTyxNQUFwQzs7QUFFQUE7O0FBRUFyWixpQkFBT3FHLE9BQVAsQ0FBZUMsU0FBZixDQUF5QnBFLEtBQXpCLEVBQWdDLFlBQVc7QUFDekN1Vix1QkFBV1csV0FBWCxDQUF1QnJOLEdBQXZCLENBQTJCLFFBQTNCLEVBQXFDc08sTUFBckM7O0FBRUFyWixtQkFBT3lHLGNBQVAsQ0FBc0I7QUFDcEJsRix1QkFBU0EsT0FEVztBQUVwQlcscUJBQU9BLEtBRmE7QUFHcEI4QixxQkFBT0E7QUFIYSxhQUF0QjtBQUtBekMsc0JBQVVXLFFBQVE4QixRQUFRLElBQTFCO0FBQ0QsV0FURDs7QUFXQSxtQkFBU3FWLE1BQVQsR0FBa0I7QUFDaEIsZ0JBQUlpRixrQkFBa0IsQ0FBQyxLQUFLdGEsTUFBTXVhLGdCQUFaLEVBQThCdmMsV0FBOUIsRUFBdEI7QUFDQSxnQkFBSW9XLGNBQWNvRyx3QkFBbEI7O0FBRUEsZ0JBQUlGLG9CQUFvQixVQUFwQixJQUFrQ0Esb0JBQW9CLFdBQTFELEVBQXVFO0FBQ3JFLGtCQUFJQSxvQkFBb0JsRyxXQUF4QixFQUFxQztBQUNuQzdXLHdCQUFRMEssR0FBUixDQUFZLFNBQVosRUFBdUIsRUFBdkI7QUFDRCxlQUZELE1BRU87QUFDTDFLLHdCQUFRMEssR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsbUJBQVN1UyxzQkFBVCxHQUFrQztBQUNoQyxtQkFBTy9HLFdBQVdXLFdBQVgsQ0FBdUJtQixVQUF2QixLQUFzQyxVQUF0QyxHQUFtRCxXQUExRDtBQUNEO0FBQ0YsU0FqQ0Q7QUFrQ0Q7QUE5Q0ksS0FBUDtBQWdERCxHQWpEb0MsQ0FBckM7QUFrREQsQ0F2REQ7OztBQ3ZCQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7O0FBU0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSS9hLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUFBLFNBQU8wZCxTQUFQLENBQWlCLGVBQWpCLEVBQWtDLENBQUMsUUFBRCxFQUFXLFVBQVNsYyxNQUFULEVBQWlCO0FBQzVELFdBQU87QUFDTG1jLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjs7QUFJTDtBQUNBO0FBQ0FzSCxrQkFBWSxLQU5QO0FBT0xsYSxhQUFPLEtBUEY7O0FBU0xELGVBQVMsaUJBQVNWLE9BQVQsRUFBa0I7QUFDekJBLGdCQUFRMEssR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7O0FBRUEsWUFBSXdTLFdBQVdDLG1CQUFmOztBQUVBLGVBQU8sVUFBU3hjLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDckNBLGdCQUFNeU8sUUFBTixDQUFlLGVBQWYsRUFBZ0MsVUFBU2tNLFlBQVQsRUFBdUI7QUFDckQsZ0JBQUlBLFlBQUosRUFBa0I7QUFDaEJ0RjtBQUNEO0FBQ0YsV0FKRDs7QUFNQUE7O0FBRUFyWixpQkFBT3FHLE9BQVAsQ0FBZUMsU0FBZixDQUF5QnBFLEtBQXpCLEVBQWdDLFlBQVc7QUFDekNsQyxtQkFBT3lHLGNBQVAsQ0FBc0I7QUFDcEJsRix1QkFBU0EsT0FEVztBQUVwQlcscUJBQU9BLEtBRmE7QUFHcEI4QixxQkFBT0E7QUFIYSxhQUF0QjtBQUtBekMsc0JBQVVXLFFBQVE4QixRQUFRLElBQTFCO0FBQ0QsV0FQRDs7QUFTQSxtQkFBU3FWLE1BQVQsR0FBa0I7QUFDaEIsZ0JBQUl1RixnQkFBZ0I1YSxNQUFNNmEsYUFBTixDQUFvQjdjLFdBQXBCLEdBQWtDOFcsSUFBbEMsR0FBeUNnQixLQUF6QyxDQUErQyxLQUEvQyxDQUFwQjtBQUNBLGdCQUFJOEUsY0FBY2hLLE9BQWQsQ0FBc0I2SixTQUFTemMsV0FBVCxFQUF0QixLQUFpRCxDQUFyRCxFQUF3RDtBQUN0RFQsc0JBQVEwSyxHQUFSLENBQVksU0FBWixFQUF1QixPQUF2QjtBQUNELGFBRkQsTUFFTztBQUNMMUssc0JBQVEwSyxHQUFSLENBQVksU0FBWixFQUF1QixNQUF2QjtBQUNEO0FBQ0Y7QUFDRixTQTFCRDs7QUE0QkEsaUJBQVN5UyxpQkFBVCxHQUE2Qjs7QUFFM0IsY0FBSS9ULFVBQVVtVSxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixVQUExQixDQUFKLEVBQTJDO0FBQ3pDLG1CQUFPLFNBQVA7QUFDRDs7QUFFRCxjQUFLcFUsVUFBVW1VLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLGFBQTFCLENBQUQsSUFBK0NwVSxVQUFVbVUsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsZ0JBQTFCLENBQS9DLElBQWdHcFUsVUFBVW1VLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLE9BQTFCLENBQXBHLEVBQXlJO0FBQ3ZJLG1CQUFPLFlBQVA7QUFDRDs7QUFFRCxjQUFJcFUsVUFBVW1VLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLG1CQUExQixDQUFKLEVBQW9EO0FBQ2xELG1CQUFPLEtBQVA7QUFDRDs7QUFFRCxjQUFJcFUsVUFBVW1VLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLG1DQUExQixDQUFKLEVBQW9FO0FBQ2xFLG1CQUFPLElBQVA7QUFDRDs7QUFFRDtBQUNBLGNBQUlDLFVBQVUsQ0FBQyxDQUFDNWdCLE9BQU82Z0IsS0FBVCxJQUFrQnRVLFVBQVVtVSxTQUFWLENBQW9CbEssT0FBcEIsQ0FBNEIsT0FBNUIsS0FBd0MsQ0FBeEU7QUFDQSxjQUFJb0ssT0FBSixFQUFhO0FBQ1gsbUJBQU8sT0FBUDtBQUNEOztBQUVELGNBQUlFLFlBQVksT0FBT0MsY0FBUCxLQUEwQixXQUExQyxDQXhCMkIsQ0F3QjhCO0FBQ3pELGNBQUlELFNBQUosRUFBZTtBQUNiLG1CQUFPLFNBQVA7QUFDRDs7QUFFRCxjQUFJRSxXQUFXOWhCLE9BQU9GLFNBQVAsQ0FBaUJpaUIsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCbGhCLE9BQU9vRCxXQUF0QyxFQUFtRG9ULE9BQW5ELENBQTJELGFBQTNELElBQTRFLENBQTNGO0FBQ0E7QUFDQSxjQUFJd0ssUUFBSixFQUFjO0FBQ1osbUJBQU8sUUFBUDtBQUNEOztBQUVELGNBQUlHLFNBQVM1VSxVQUFVbVUsU0FBVixDQUFvQmxLLE9BQXBCLENBQTRCLFFBQTVCLEtBQXlDLENBQXREO0FBQ0EsY0FBSTJLLE1BQUosRUFBWTtBQUNWLG1CQUFPLE1BQVA7QUFDRDs7QUFFRCxjQUFJQyxXQUFXLENBQUMsQ0FBQ3BoQixPQUFPcWhCLE1BQVQsSUFBbUIsQ0FBQ1QsT0FBcEIsSUFBK0IsQ0FBQ08sTUFBL0MsQ0F4QzJCLENBd0M0QjtBQUN2RCxjQUFJQyxRQUFKLEVBQWM7QUFDWixtQkFBTyxRQUFQO0FBQ0Q7O0FBRUQsY0FBSUUsT0FBTyxZQUFZLFNBQVMsQ0FBQyxDQUFDbmdCLFNBQVNvZ0IsWUFBM0MsQ0E3QzJCLENBNkM4QjtBQUN6RCxjQUFJRCxJQUFKLEVBQVU7QUFDUixtQkFBTyxJQUFQO0FBQ0Q7O0FBRUQsaUJBQU8sU0FBUDtBQUNEO0FBQ0Y7QUE5RkksS0FBUDtBQWdHRCxHQWpHaUMsQ0FBbEM7QUFrR0QsQ0F2R0Q7OztBQ3ZCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7Ozs7OztBQVNBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0EsQ0FBQyxZQUFVO0FBQ1Q7O0FBRUFuaEIsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxVQUFsQyxFQUE4QyxDQUFDLFFBQUQsRUFBVyxVQUFTclMsTUFBVCxFQUFpQjtBQUN4RSxXQUFPO0FBQ0xzUyxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTDVTLGFBQU8sS0FIRjs7QUFLTFUsWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLFlBQUk0YixLQUFLcmUsUUFBUSxDQUFSLENBQVQ7O0FBRUEsWUFBTXNlLFVBQVUsU0FBVkEsT0FBVSxHQUFNO0FBQ3BCLGNBQU0vUSxNQUFNakYsT0FBTzdGLE1BQU1zWCxPQUFiLEVBQXNCQyxNQUFsQzs7QUFFQSxjQUFJcUUsR0FBR0UsWUFBUCxFQUFxQjtBQUNuQkYsZUFBRy9MLElBQUgsS0FBWSxRQUFaLEdBQXVCL0UsSUFBSTVNLEtBQUosRUFBVzZkLE9BQU9ILEdBQUc3ZixLQUFWLENBQVgsQ0FBdkIsR0FBc0QrTyxJQUFJNU0sS0FBSixFQUFXMGQsR0FBRzdmLEtBQWQsQ0FBdEQ7QUFDRCxXQUZELE1BR0ssSUFBSTZmLEdBQUcvTCxJQUFILEtBQVksT0FBWixJQUF1QitMLEdBQUduRSxPQUE5QixFQUF1QztBQUMxQzNNLGdCQUFJNU0sS0FBSixFQUFXMGQsR0FBRzdmLEtBQWQ7QUFDRCxXQUZJLE1BR0E7QUFDSCtPLGdCQUFJNU0sS0FBSixFQUFXMGQsR0FBR25FLE9BQWQ7QUFDRDs7QUFFRCxjQUFJelgsTUFBTTBYLFFBQVYsRUFBb0I7QUFDbEJ4WixrQkFBTW1GLEtBQU4sQ0FBWXJELE1BQU0wWCxRQUFsQjtBQUNEOztBQUVEeFosZ0JBQU1zWixPQUFOLENBQWN6WSxVQUFkO0FBQ0QsU0FsQkQ7O0FBb0JBLFlBQUlpQixNQUFNc1gsT0FBVixFQUFtQjtBQUNqQnBaLGdCQUFNMEYsTUFBTixDQUFhNUQsTUFBTXNYLE9BQW5CLEVBQTRCLFVBQUN2YixLQUFELEVBQVc7QUFDckMsZ0JBQUk2ZixHQUFHRSxZQUFQLEVBQXFCO0FBQ25CLGtCQUFJLE9BQU8vZixLQUFQLEtBQWlCLFdBQWpCLElBQWdDQSxVQUFVNmYsR0FBRzdmLEtBQWpELEVBQXdEO0FBQ3RENmYsbUJBQUc3ZixLQUFILEdBQVdBLEtBQVg7QUFDRDtBQUNGLGFBSkQsTUFJTyxJQUFJNmYsR0FBRy9MLElBQUgsS0FBWSxPQUFoQixFQUF5QjtBQUM5QitMLGlCQUFHbkUsT0FBSCxHQUFhMWIsVUFBVTZmLEdBQUc3ZixLQUExQjtBQUNELGFBRk0sTUFFQTtBQUNMNmYsaUJBQUduRSxPQUFILEdBQWExYixLQUFiO0FBQ0Q7QUFDRixXQVZEOztBQVlBNmYsYUFBR0UsWUFBSCxHQUNJdmUsUUFBUW1KLEVBQVIsQ0FBVyxPQUFYLEVBQW9CbVYsT0FBcEIsQ0FESixHQUVJdGUsUUFBUW1KLEVBQVIsQ0FBVyxRQUFYLEVBQXFCbVYsT0FBckIsQ0FGSjtBQUdEOztBQUVEM2QsY0FBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQU07QUFDMUI4ZixhQUFHRSxZQUFILEdBQ0l2ZSxRQUFRd0osR0FBUixDQUFZLE9BQVosRUFBcUI4VSxPQUFyQixDQURKLEdBRUl0ZSxRQUFRd0osR0FBUixDQUFZLFFBQVosRUFBc0I4VSxPQUF0QixDQUZKOztBQUlBM2Qsa0JBQVFYLFVBQVV5QyxRQUFRNGIsS0FBSyxJQUEvQjtBQUNELFNBTkQ7QUFPRDtBQXJESSxLQUFQO0FBdURELEdBeEQ2QyxDQUE5QztBQXlERCxDQTVERDs7O0FDdkRBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUlwaEIsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQSxNQUFJd2hCLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBUzlWLElBQVQsRUFBZWxLLE1BQWYsRUFBdUI7QUFDM0MsV0FBTyxVQUFTdUIsT0FBVCxFQUFrQjtBQUN2QixhQUFPLFVBQVNXLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDckMsWUFBSWljLFdBQVcvVixPQUFPLE9BQVAsR0FBaUIsTUFBaEM7QUFBQSxZQUNJZ1csV0FBV2hXLE9BQU8sTUFBUCxHQUFnQixPQUQvQjs7QUFHQSxZQUFJaVcsU0FBUyxTQUFUQSxNQUFTLEdBQVc7QUFDdEI1ZSxrQkFBUTBLLEdBQVIsQ0FBWSxTQUFaLEVBQXVCZ1UsUUFBdkI7QUFDRCxTQUZEOztBQUlBLFlBQUlHLFNBQVMsU0FBVEEsTUFBUyxHQUFXO0FBQ3RCN2Usa0JBQVEwSyxHQUFSLENBQVksU0FBWixFQUF1QmlVLFFBQXZCO0FBQ0QsU0FGRDs7QUFJQSxZQUFJRyxTQUFTLFNBQVRBLE1BQVMsQ0FBU0MsQ0FBVCxFQUFZO0FBQ3ZCLGNBQUlBLEVBQUVDLE9BQU4sRUFBZTtBQUNiSjtBQUNELFdBRkQsTUFFTztBQUNMQztBQUNEO0FBQ0YsU0FORDs7QUFRQXZoQixZQUFJMmhCLGdCQUFKLENBQXFCOVYsRUFBckIsQ0FBd0IsTUFBeEIsRUFBZ0N5VixNQUFoQztBQUNBdGhCLFlBQUkyaEIsZ0JBQUosQ0FBcUI5VixFQUFyQixDQUF3QixNQUF4QixFQUFnQzBWLE1BQWhDO0FBQ0F2aEIsWUFBSTJoQixnQkFBSixDQUFxQjlWLEVBQXJCLENBQXdCLE1BQXhCLEVBQWdDMlYsTUFBaEM7O0FBRUEsWUFBSXhoQixJQUFJMmhCLGdCQUFKLENBQXFCQyxRQUF6QixFQUFtQztBQUNqQ047QUFDRCxTQUZELE1BRU87QUFDTEM7QUFDRDs7QUFFRHBnQixlQUFPcUcsT0FBUCxDQUFlQyxTQUFmLENBQXlCcEUsS0FBekIsRUFBZ0MsWUFBVztBQUN6Q3JELGNBQUkyaEIsZ0JBQUosQ0FBcUJ6VixHQUFyQixDQUF5QixNQUF6QixFQUFpQ29WLE1BQWpDO0FBQ0F0aEIsY0FBSTJoQixnQkFBSixDQUFxQnpWLEdBQXJCLENBQXlCLE1BQXpCLEVBQWlDcVYsTUFBakM7QUFDQXZoQixjQUFJMmhCLGdCQUFKLENBQXFCelYsR0FBckIsQ0FBeUIsTUFBekIsRUFBaUNzVixNQUFqQzs7QUFFQXJnQixpQkFBT3lHLGNBQVAsQ0FBc0I7QUFDcEJsRixxQkFBU0EsT0FEVztBQUVwQlcsbUJBQU9BLEtBRmE7QUFHcEI4QixtQkFBT0E7QUFIYSxXQUF0QjtBQUtBekMsb0JBQVVXLFFBQVE4QixRQUFRLElBQTFCO0FBQ0QsU0FYRDtBQVlELE9BMUNEO0FBMkNELEtBNUNEO0FBNkNELEdBOUNEOztBQWdEQXhGLFNBQU8wZCxTQUFQLENBQWlCLG1CQUFqQixFQUFzQyxDQUFDLFFBQUQsRUFBVyxVQUFTbGMsTUFBVCxFQUFpQjtBQUNoRSxXQUFPO0FBQ0xtYyxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTHNILGtCQUFZLEtBSFA7QUFJTGxhLGFBQU8sS0FKRjtBQUtMRCxlQUFTK2QsZ0JBQWdCLElBQWhCLEVBQXNCaGdCLE1BQXRCO0FBTEosS0FBUDtBQU9ELEdBUnFDLENBQXRDOztBQVVBeEIsU0FBTzBkLFNBQVAsQ0FBaUIscUJBQWpCLEVBQXdDLENBQUMsUUFBRCxFQUFXLFVBQVNsYyxNQUFULEVBQWlCO0FBQ2xFLFdBQU87QUFDTG1jLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMc0gsa0JBQVksS0FIUDtBQUlMbGEsYUFBTyxLQUpGO0FBS0xELGVBQVMrZCxnQkFBZ0IsS0FBaEIsRUFBdUJoZ0IsTUFBdkI7QUFMSixLQUFQO0FBT0QsR0FSdUMsQ0FBeEM7QUFTRCxDQXhFRDs7O0E5QnRDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxREE7Ozs7Ozs7OztBQVNBOzs7Ozs7OztBQVFBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUl4QixTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBOzs7QUFHQUEsU0FBTzBkLFNBQVAsQ0FBaUIsZUFBakIsRUFBa0MsQ0FBQyxRQUFELEVBQVcsZ0JBQVgsRUFBNkIsVUFBU2xjLE1BQVQsRUFBaUJpSCxjQUFqQixFQUFpQztBQUM5RixXQUFPO0FBQ0xrVixnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTDRMLGdCQUFVLElBSEw7QUFJTEMsZ0JBQVUsSUFKTDs7QUFNTDFlLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5QjtBQUNoQyxlQUFPLFVBQVM5QixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3JDLGNBQUk0YyxhQUFhLElBQUkzWixjQUFKLENBQW1CL0UsS0FBbkIsRUFBMEJYLE9BQTFCLEVBQW1DeUMsS0FBbkMsQ0FBakI7O0FBRUE5QixnQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0JvQyxvQkFBUVgsVUFBVXlDLFFBQVE0YyxhQUFhLElBQXZDO0FBQ0QsV0FGRDtBQUdELFNBTkQ7QUFPRDtBQWRJLEtBQVA7QUFnQkQsR0FqQmlDLENBQWxDO0FBbUJELENBM0JEOzs7QStCdEVBLENBQUMsWUFBVztBQUNWOztBQUVBcmlCLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCMGQsU0FBeEIsQ0FBa0MsU0FBbEMsRUFBNkMsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixVQUFTbGMsTUFBVCxFQUFpQitGLFdBQWpCLEVBQThCO0FBQ25HLFdBQU87QUFDTG9XLGdCQUFVLEdBREw7QUFFTHZaLFlBQU0sY0FBU1YsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQytCLG9CQUFZVyxRQUFaLENBQXFCeEUsS0FBckIsRUFBNEJYLE9BQTVCLEVBQXFDeUMsS0FBckMsRUFBNEMsRUFBQzRDLFNBQVMsVUFBVixFQUE1QztBQUNBNUcsZUFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFMSSxLQUFQO0FBT0QsR0FSNEMsQ0FBN0M7QUFVRCxDQWJEOzs7QUNBQSxDQUFDLFlBQVc7QUFDVjs7QUFFQWhELFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCMGQsU0FBeEIsQ0FBa0MsZUFBbEMsRUFBbUQsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixVQUFTbGMsTUFBVCxFQUFpQitGLFdBQWpCLEVBQThCO0FBQ3pHLFdBQU87QUFDTG9XLGdCQUFVLEdBREw7QUFFTHZaLFlBQU0sY0FBU1YsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQytCLG9CQUFZVyxRQUFaLENBQXFCeEUsS0FBckIsRUFBNEJYLE9BQTVCLEVBQXFDeUMsS0FBckMsRUFBNEMsRUFBQzRDLFNBQVMsZ0JBQVYsRUFBNUM7QUFDQTVHLGVBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBTEksS0FBUDtBQU9ELEdBUmtELENBQW5EO0FBVUQsQ0FiRDs7O0FDQUEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUFoRCxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjBkLFNBQXhCLENBQWtDLGFBQWxDLEVBQWlELENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsVUFBU2xjLE1BQVQsRUFBaUIrRixXQUFqQixFQUE4QjtBQUN2RyxXQUFPO0FBQ0xvVyxnQkFBVSxHQURMO0FBRUx2WixZQUFNLGNBQVNWLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcEMrQixvQkFBWVcsUUFBWixDQUFxQnhFLEtBQXJCLEVBQTRCWCxPQUE1QixFQUFxQ3lDLEtBQXJDLEVBQTRDLEVBQUM0QyxTQUFTLGVBQVYsRUFBNUM7QUFDQTVHLGVBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBTEksS0FBUDtBQU9ELEdBUmdELENBQWpEO0FBU0QsQ0FaRDs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7QUFhQTs7Ozs7Ozs7O0FBU0EsQ0FBQyxZQUFVO0FBQ1Q7O0FBRUFoRCxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjBkLFNBQXhCLENBQWtDLHVCQUFsQyxFQUEyRCxZQUFXO0FBQ3BFLFdBQU87QUFDTEMsZ0JBQVUsR0FETDtBQUVMdlosWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLFlBQUlBLE1BQU02YyxxQkFBVixFQUFpQztBQUMvQmhpQixjQUFJaWlCLDBCQUFKLENBQStCdmYsUUFBUSxDQUFSLENBQS9CLEVBQTJDeUMsTUFBTTZjLHFCQUFqRCxFQUF3RSxVQUFTRSxjQUFULEVBQXlCcGQsSUFBekIsRUFBK0I7QUFDckc5RSxnQkFBSW9ELE9BQUosQ0FBWThlLGNBQVo7QUFDQTdlLGtCQUFNYSxVQUFOLENBQWlCLFlBQVc7QUFDMUJhLDJCQUFhRCxJQUFiO0FBQ0QsYUFGRDtBQUdELFdBTEQ7QUFNRDtBQUNGO0FBWEksS0FBUDtBQWFELEdBZEQ7QUFlRCxDQWxCRDs7O0FoQ3RCQTs7OztBQUlBOzs7Ozs7Ozs7QUFTQSxDQUFDLFlBQVc7QUFDVjs7QUFFQTs7OztBQUdBcEYsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxVQUFsQyxFQUE4QyxDQUFDLFFBQUQsRUFBVyxXQUFYLEVBQXdCLFVBQVNsYyxNQUFULEVBQWlCOEosU0FBakIsRUFBNEI7QUFDaEcsV0FBTztBQUNMcVMsZ0JBQVUsR0FETDtBQUVMckgsZUFBUyxLQUZKOztBQUlMO0FBQ0E7QUFDQTVTLGFBQU8sS0FORjtBQU9Ma2Esa0JBQVksS0FQUDs7QUFTTG5hLGVBQVMsaUJBQUNWLE9BQUQsRUFBVXlDLEtBQVYsRUFBb0I7O0FBRTNCLGVBQU87QUFDTHFZLGVBQUssYUFBU25hLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDbkMsZ0JBQUlnZCxRQUFRLElBQUlsWCxTQUFKLENBQWM1SCxLQUFkLEVBQXFCWCxPQUFyQixFQUE4QnlDLEtBQTlCLENBQVo7QUFDQWhFLG1CQUFPb0csbUNBQVAsQ0FBMkM0YSxLQUEzQyxFQUFrRHpmLE9BQWxEOztBQUVBdkIsbUJBQU82RyxtQkFBUCxDQUEyQjdDLEtBQTNCLEVBQWtDZ2QsS0FBbEM7QUFDQXpmLG9CQUFRTyxJQUFSLENBQWEsV0FBYixFQUEwQmtmLEtBQTFCOztBQUVBOWUsa0JBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFXO0FBQy9CRSxxQkFBT3dHLHFCQUFQLENBQTZCd2EsS0FBN0I7QUFDQXpmLHNCQUFRTyxJQUFSLENBQWEsV0FBYixFQUEwQmIsU0FBMUI7QUFDQStmLHNCQUFRemYsVUFBVVcsUUFBUThCLFFBQVEsSUFBbEM7QUFDRCxhQUpEO0FBS0QsV0FiSTs7QUFlTHVZLGdCQUFNLGNBQVNyYSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QjtBQUM3QnZCLG1CQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQWpCSSxTQUFQO0FBbUJEO0FBOUJJLEtBQVA7QUFnQ0QsR0FqQzZDLENBQTlDO0FBa0NELENBeENEOzs7QUNiQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJZSxZQUFZbEUsT0FBT1MsR0FBUCxDQUFXb2lCLGdCQUFYLENBQTRCQyxXQUE1QixDQUF3Q0MsS0FBeEQ7QUFDQS9pQixTQUFPUyxHQUFQLENBQVdvaUIsZ0JBQVgsQ0FBNEJDLFdBQTVCLENBQXdDQyxLQUF4QyxHQUFnRHRpQixJQUFJdUQsaUJBQUosQ0FBc0IsZUFBdEIsRUFBdUNFLFNBQXZDLENBQWhEOztBQUVBL0QsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxjQUFsQyxFQUFrRCxDQUFDLGVBQUQsRUFBa0IsUUFBbEIsRUFBNEIsVUFBUzVSLGFBQVQsRUFBd0J0SyxNQUF4QixFQUFnQztBQUM1RyxXQUFPO0FBQ0xtYyxnQkFBVSxHQURMOztBQUdMO0FBQ0E7QUFDQUMsa0JBQVksS0FMUDtBQU1MbGEsYUFBTyxJQU5GOztBQVFMRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCOztBQUV6QixlQUFPO0FBQ0w4YSxlQUFLLGFBQVNuYSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDMFksVUFBaEMsRUFBNEM7QUFDL0MsZ0JBQUkvVixPQUFPLElBQUkyRCxhQUFKLENBQWtCcEksS0FBbEIsRUFBeUJYLE9BQXpCLEVBQWtDeUMsS0FBbEMsQ0FBWDs7QUFFQWhFLG1CQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQzJDLElBQWxDO0FBQ0EzRyxtQkFBT3NjLHFCQUFQLENBQTZCM1YsSUFBN0IsRUFBbUMsd0RBQW5DOztBQUVBcEYsb0JBQVFPLElBQVIsQ0FBYSxlQUFiLEVBQThCNkUsSUFBOUI7O0FBRUFwRixvQkFBUSxDQUFSLEVBQVc2ZixVQUFYLEdBQXdCcGhCLE9BQU9xaEIsZ0JBQVAsQ0FBd0IxYSxJQUF4QixDQUF4Qjs7QUFFQXpFLGtCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQjZHLG1CQUFLSixPQUFMLEdBQWV0RixTQUFmO0FBQ0FNLHNCQUFRTyxJQUFSLENBQWEsZUFBYixFQUE4QmIsU0FBOUI7QUFDQWlCLHNCQUFRWCxVQUFVLElBQWxCO0FBQ0QsYUFKRDtBQU1ELFdBakJJO0FBa0JMZ2IsZ0JBQU0sY0FBU3JhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDcENoRSxtQkFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFwQkksU0FBUDtBQXNCRDtBQWhDSSxLQUFQO0FBa0NELEdBbkNpRCxDQUFsRDtBQW9DRCxDQTFDRDs7O0FHdkpBOzs7O0FBSUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUkvQyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPMGQsU0FBUCxDQUFpQixTQUFqQixFQUE0QixDQUFDLFFBQUQsRUFBVyxVQUFYLEVBQXVCLFVBQVNsYyxNQUFULEVBQWlCME8sUUFBakIsRUFBMkI7O0FBRTVFLGFBQVM0UyxpQkFBVCxDQUEyQi9mLE9BQTNCLEVBQW9DO0FBQ2xDO0FBQ0EsVUFBSTBILElBQUksQ0FBUjtBQUFBLFVBQVdzWSxJQUFJLFNBQUpBLENBQUksR0FBVztBQUN4QixZQUFJdFksTUFBTSxFQUFWLEVBQWU7QUFDYixjQUFJdVksV0FBV2pnQixPQUFYLENBQUosRUFBeUI7QUFDdkJ2QixtQkFBT3djLGtCQUFQLENBQTBCamIsT0FBMUIsRUFBbUMsTUFBbkM7QUFDQWtnQixvQ0FBd0JsZ0IsT0FBeEI7QUFDRCxXQUhELE1BR087QUFDTCxnQkFBSTBILElBQUksRUFBUixFQUFZO0FBQ1YwRSx5QkFBVzRULENBQVgsRUFBYyxPQUFPLEVBQXJCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wzZCwyQkFBYTJkLENBQWI7QUFDRDtBQUNGO0FBQ0YsU0FYRCxNQVdPO0FBQ0wsZ0JBQU0sSUFBSTFoQixLQUFKLENBQVUsZ0dBQVYsQ0FBTjtBQUNEO0FBQ0YsT0FmRDs7QUFpQkEwaEI7QUFDRDs7QUFFRCxhQUFTRSx1QkFBVCxDQUFpQ2xnQixPQUFqQyxFQUEwQztBQUN4QyxVQUFJcUosUUFBUXJMLFNBQVNtaUIsV0FBVCxDQUFxQixZQUFyQixDQUFaO0FBQ0E5VyxZQUFNK1csU0FBTixDQUFnQixVQUFoQixFQUE0QixJQUE1QixFQUFrQyxJQUFsQztBQUNBcGdCLGNBQVFxZ0IsYUFBUixDQUFzQmhYLEtBQXRCO0FBQ0Q7O0FBRUQsYUFBUzRXLFVBQVQsQ0FBb0JqZ0IsT0FBcEIsRUFBNkI7QUFDM0IsVUFBSWhDLFNBQVM2QixlQUFULEtBQTZCRyxPQUFqQyxFQUEwQztBQUN4QyxlQUFPLElBQVA7QUFDRDtBQUNELGFBQU9BLFFBQVFtRyxVQUFSLEdBQXFCOFosV0FBV2pnQixRQUFRbUcsVUFBbkIsQ0FBckIsR0FBc0QsS0FBN0Q7QUFDRDs7QUFFRCxXQUFPO0FBQ0x5VSxnQkFBVSxHQURMOztBQUdMO0FBQ0E7QUFDQUMsa0JBQVksS0FMUDtBQU1MbGEsYUFBTyxJQU5GOztBQVFMRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7QUFDaEMsZUFBTztBQUNMcVksZUFBSyxhQUFTbmEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNuQyxnQkFBSXhELE9BQU8sSUFBSWtPLFFBQUosQ0FBYXhNLEtBQWIsRUFBb0JYLE9BQXBCLEVBQTZCeUMsS0FBN0IsQ0FBWDs7QUFFQWhFLG1CQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQ3hELElBQWxDO0FBQ0FSLG1CQUFPc2MscUJBQVAsQ0FBNkI5YixJQUE3QixFQUFtQyx3QkFBbkM7O0FBRUFlLG9CQUFRTyxJQUFSLENBQWEsVUFBYixFQUF5QnRCLElBQXpCO0FBQ0FSLG1CQUFPb0csbUNBQVAsQ0FBMkM1RixJQUEzQyxFQUFpRGUsT0FBakQ7O0FBRUFBLG9CQUFRTyxJQUFSLENBQWEsUUFBYixFQUF1QkksS0FBdkI7O0FBRUFsQyxtQkFBT3FHLE9BQVAsQ0FBZUMsU0FBZixDQUF5QnBFLEtBQXpCLEVBQWdDLFlBQVc7QUFDekMxQixtQkFBSytGLE9BQUwsR0FBZXRGLFNBQWY7QUFDQWpCLHFCQUFPd0cscUJBQVAsQ0FBNkJoRyxJQUE3QjtBQUNBZSxzQkFBUU8sSUFBUixDQUFhLFVBQWIsRUFBeUJiLFNBQXpCO0FBQ0FNLHNCQUFRTyxJQUFSLENBQWEsUUFBYixFQUF1QmIsU0FBdkI7O0FBRUFqQixxQkFBT3lHLGNBQVAsQ0FBc0I7QUFDcEJsRix5QkFBU0EsT0FEVztBQUVwQlcsdUJBQU9BLEtBRmE7QUFHcEI4Qix1QkFBT0E7QUFIYSxlQUF0QjtBQUtBOUIsc0JBQVFYLFVBQVV5QyxRQUFRLElBQTFCO0FBQ0QsYUFaRDtBQWFELFdBekJJOztBQTJCTHVZLGdCQUFNLFNBQVNzRixRQUFULENBQWtCM2YsS0FBbEIsRUFBeUJYLE9BQXpCLEVBQWtDeUMsS0FBbEMsRUFBeUM7QUFDN0NzZCw4QkFBa0IvZixRQUFRLENBQVIsQ0FBbEI7QUFDRDtBQTdCSSxTQUFQO0FBK0JEO0FBeENJLEtBQVA7QUEwQ0QsR0EvRTJCLENBQTVCO0FBZ0ZELENBckZEOzs7QUMzRUE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVU7QUFDVDs7QUFFQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzBkLFNBQVAsQ0FBaUIsWUFBakIsRUFBK0IsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixVQUFTbGMsTUFBVCxFQUFpQnVQLFdBQWpCLEVBQThCO0FBQ3JGLFdBQU87QUFDTDRNLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMNVMsYUFBTyxJQUhGO0FBSUxELGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5QjtBQUNoQyxlQUFPO0FBQ0xxWSxlQUFLLGFBQVNuYSxLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDOztBQUVuQyxnQkFBSVIsVUFBVSxJQUFJK0wsV0FBSixDQUFnQnJOLEtBQWhCLEVBQXVCWCxPQUF2QixFQUFnQ3lDLEtBQWhDLENBQWQ7O0FBRUFoRSxtQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NSLE9BQWxDO0FBQ0F4RCxtQkFBT3NjLHFCQUFQLENBQTZCOVksT0FBN0IsRUFBc0MsMkNBQXRDO0FBQ0F4RCxtQkFBT29HLG1DQUFQLENBQTJDNUMsT0FBM0MsRUFBb0RqQyxPQUFwRDs7QUFFQUEsb0JBQVFPLElBQVIsQ0FBYSxhQUFiLEVBQTRCMEIsT0FBNUI7O0FBRUF0QixrQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0IwRCxzQkFBUStDLE9BQVIsR0FBa0J0RixTQUFsQjtBQUNBakIscUJBQU93RyxxQkFBUCxDQUE2QmhELE9BQTdCO0FBQ0FqQyxzQkFBUU8sSUFBUixDQUFhLGFBQWIsRUFBNEJiLFNBQTVCO0FBQ0FNLHdCQUFVLElBQVY7QUFDRCxhQUxEO0FBTUQsV0FqQkk7O0FBbUJMZ2IsZ0JBQU0sY0FBU3JhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCO0FBQzdCdkIsbUJBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBckJJLFNBQVA7QUF1QkQ7QUE1QkksS0FBUDtBQThCRCxHQS9COEIsQ0FBL0I7QUFnQ0QsQ0FyQ0Q7QTRCcEdBOzs7QTFCQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7Ozs7Ozs7Ozs7O0FBY0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUE7Ozs7QUFHQWhELFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCMGQsU0FBeEIsQ0FBa0MsYUFBbEMsRUFBaUQsQ0FBQyxRQUFELEVBQVcsY0FBWCxFQUEyQixVQUFTbGMsTUFBVCxFQUFpQjBQLFlBQWpCLEVBQStCO0FBQ3pHLFdBQU87QUFDTHlNLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMNVMsYUFBTyxJQUhGOztBQUtMRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7QUFDaEMsZUFBTztBQUNMcVksZUFBSyxhQUFTbmEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNuQyxnQkFBSTJMLFdBQVcsSUFBSUQsWUFBSixDQUFpQnhOLEtBQWpCLEVBQXdCWCxPQUF4QixFQUFpQ3lDLEtBQWpDLENBQWY7O0FBRUFoRSxtQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0MyTCxRQUFsQztBQUNBM1AsbUJBQU9zYyxxQkFBUCxDQUE2QjNNLFFBQTdCLEVBQXVDLHFCQUF2QztBQUNBcE8sb0JBQVFPLElBQVIsQ0FBYSxlQUFiLEVBQThCNk4sUUFBOUI7O0FBRUF6TixrQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0I2UCx1QkFBU3BKLE9BQVQsR0FBbUJ0RixTQUFuQjtBQUNBTSxzQkFBUU8sSUFBUixDQUFhLGVBQWIsRUFBOEJiLFNBQTlCO0FBQ0FpQixzQkFBUVgsVUFBVXlDLFFBQVEsSUFBMUI7QUFDRCxhQUpEO0FBS0QsV0FiSTtBQWNMdVksZ0JBQU0sY0FBU3JhLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCO0FBQzdCdkIsbUJBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBaEJJLFNBQVA7QUFrQkQ7QUF4QkksS0FBUDtBQTBCRCxHQTNCZ0QsQ0FBakQ7QUE2QkQsQ0FuQ0Q7OztBMkJ2R0EsQ0FBQyxZQUFVO0FBQ1Q7O0FBRUFoRCxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjBkLFNBQXhCLENBQWtDLFVBQWxDLEVBQThDLENBQUMsUUFBRCxFQUFXLFVBQVNyUyxNQUFULEVBQWlCO0FBQ3hFLFdBQU87QUFDTHNTLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMNVMsYUFBTyxLQUhGOztBQUtMVSxZQUFNLGNBQVNWLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7O0FBRXBDLFlBQU02YixVQUFVLFNBQVZBLE9BQVUsR0FBTTtBQUNwQixjQUFNL1EsTUFBTWpGLE9BQU83RixNQUFNc1gsT0FBYixFQUFzQkMsTUFBbEM7O0FBRUF6TSxjQUFJNU0sS0FBSixFQUFXWCxRQUFRLENBQVIsRUFBV3hCLEtBQXRCO0FBQ0EsY0FBSWlFLE1BQU0wWCxRQUFWLEVBQW9CO0FBQ2xCeFosa0JBQU1tRixLQUFOLENBQVlyRCxNQUFNMFgsUUFBbEI7QUFDRDtBQUNEeFosZ0JBQU1zWixPQUFOLENBQWN6WSxVQUFkO0FBQ0QsU0FSRDs7QUFVQSxZQUFJaUIsTUFBTXNYLE9BQVYsRUFBbUI7QUFDakJwWixnQkFBTTBGLE1BQU4sQ0FBYTVELE1BQU1zWCxPQUFuQixFQUE0QixVQUFDdmIsS0FBRCxFQUFXO0FBQ3JDd0Isb0JBQVEsQ0FBUixFQUFXeEIsS0FBWCxHQUFtQkEsS0FBbkI7QUFDRCxXQUZEOztBQUlBd0Isa0JBQVFtSixFQUFSLENBQVcsT0FBWCxFQUFvQm1WLE9BQXBCO0FBQ0Q7O0FBRUQzZCxjQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBTTtBQUMxQnlCLGtCQUFRd0osR0FBUixDQUFZLE9BQVosRUFBcUI4VSxPQUFyQjtBQUNBM2Qsa0JBQVFYLFVBQVV5QyxRQUFRLElBQTFCO0FBQ0QsU0FIRDtBQUlEO0FBN0JJLEtBQVA7QUErQkQsR0FoQzZDLENBQTlDO0FBaUNELENBcENEOzs7QUNBQSxDQUFDLFlBQVc7QUFDVjs7QUFFQXpGLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCMGQsU0FBeEIsQ0FBa0MsV0FBbEMsRUFBK0MsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixVQUFTbGMsTUFBVCxFQUFpQitGLFdBQWpCLEVBQThCO0FBQ3JHLFdBQU87QUFDTG9XLGdCQUFVLEdBREw7QUFFTHZaLFlBQU0sY0FBU1YsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQytCLG9CQUFZVyxRQUFaLENBQXFCeEUsS0FBckIsRUFBNEJYLE9BQTVCLEVBQXFDeUMsS0FBckMsRUFBNEMsRUFBQzRDLFNBQVMsWUFBVixFQUE1QztBQUNBNUcsZUFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUFMSSxLQUFQO0FBT0QsR0FSOEMsQ0FBL0M7QUFTRCxDQVpEOzs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUkvQyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPMGQsU0FBUCxDQUFpQixVQUFqQixFQUE2QixDQUFDLFFBQUQsRUFBVyxVQUFTbGMsTUFBVCxFQUFpQjtBQUN2RCxXQUFPO0FBQ0xtYyxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTHNILGtCQUFZLEtBSFA7QUFJTGxhLGFBQU8sS0FKRjs7QUFNTFUsWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QjtBQUM3QkEsZ0JBQVFPLElBQVIsQ0FBYSxRQUFiLEVBQXVCSSxLQUF2Qjs7QUFFQUEsY0FBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0J5QixrQkFBUU8sSUFBUixDQUFhLFFBQWIsRUFBdUJiLFNBQXZCO0FBQ0QsU0FGRDtBQUdEO0FBWkksS0FBUDtBQWNELEdBZjRCLENBQTdCO0FBZ0JELENBckJEOzs7QUNyQkE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVk7QUFDWDs7QUFFQTFDLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQ0MwZCxTQURELENBQ1csV0FEWCxFQUN3QixDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLGFBQXJCLEVBQW9DLFVBQVVyUyxNQUFWLEVBQWtCN0osTUFBbEIsRUFBMEIrRixXQUExQixFQUF1QztBQUNqRyxXQUFPO0FBQ0xvVyxnQkFBVSxHQURMO0FBRUxySCxlQUFTLEtBRko7QUFHTDVTLGFBQU8sS0FIRjs7QUFLTFUsWUFBTSxjQUFVVixLQUFWLEVBQWlCWCxPQUFqQixFQUEwQnlDLEtBQTFCLEVBQWlDO0FBQ3JDLFlBQU02YixVQUFVLFNBQVZBLE9BQVUsR0FBTTtBQUNwQixjQUFNL1EsTUFBTWpGLE9BQU83RixNQUFNc1gsT0FBYixFQUFzQkMsTUFBbEM7O0FBRUF6TSxjQUFJNU0sS0FBSixFQUFXWCxRQUFRLENBQVIsRUFBV3hCLEtBQXRCO0FBQ0EsY0FBSWlFLE1BQU0wWCxRQUFWLEVBQW9CO0FBQ2xCeFosa0JBQU1tRixLQUFOLENBQVlyRCxNQUFNMFgsUUFBbEI7QUFDRDtBQUNEeFosZ0JBQU1zWixPQUFOLENBQWN6WSxVQUFkO0FBQ0QsU0FSRDs7QUFVQSxZQUFJaUIsTUFBTXNYLE9BQVYsRUFBbUI7QUFDakJwWixnQkFBTTBGLE1BQU4sQ0FBYTVELE1BQU1zWCxPQUFuQixFQUE0QixVQUFDdmIsS0FBRCxFQUFXO0FBQ3JDd0Isb0JBQVEsQ0FBUixFQUFXeEIsS0FBWCxHQUFtQkEsS0FBbkI7QUFDRCxXQUZEOztBQUlBd0Isa0JBQVFtSixFQUFSLENBQVcsT0FBWCxFQUFvQm1WLE9BQXBCO0FBQ0Q7O0FBRUQzZCxjQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBTTtBQUMxQnlCLGtCQUFRd0osR0FBUixDQUFZLE9BQVosRUFBcUI4VSxPQUFyQjtBQUNBM2Qsa0JBQVFYLFVBQVV5QyxRQUFRLElBQTFCO0FBQ0QsU0FIRDs7QUFLQStCLG9CQUFZVyxRQUFaLENBQXFCeEUsS0FBckIsRUFBNEJYLE9BQTVCLEVBQXFDeUMsS0FBckMsRUFBNEMsRUFBRTRDLFNBQVMsWUFBWCxFQUE1QztBQUNBNUcsZUFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUEvQkksS0FBUDtBQWlDRCxHQWxDdUIsQ0FEeEI7QUFvQ0QsQ0F2Q0Q7OztBM0I5Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDQTs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7Ozs7Ozs7Ozs7QUFhQTs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBLENBQUMsWUFBVztBQUNWOztBQUNBLE1BQUkvQyxTQUFTRCxRQUFRQyxNQUFSLENBQWUsT0FBZixDQUFiOztBQUVBQSxTQUFPMGQsU0FBUCxDQUFpQixnQkFBakIsRUFBbUMsQ0FBQyxVQUFELEVBQWEsaUJBQWIsRUFBZ0MsUUFBaEMsRUFBMEMsVUFBUzdjLFFBQVQsRUFBbUJzUyxlQUFuQixFQUFvQzNSLE1BQXBDLEVBQTRDO0FBQ3ZILFdBQU87QUFDTG1jLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjs7QUFJTDtBQUNBO0FBQ0FzSCxrQkFBWSxLQU5QO0FBT0xsYSxhQUFPLElBUEY7O0FBU0xELGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5QjtBQUNoQ25GLFlBQUlpakIsS0FBSixDQUFVQyxJQUFWLENBQWUsa0lBQWY7O0FBRUEsWUFBSUMsT0FBT3pnQixRQUFRLENBQVIsRUFBV00sYUFBWCxDQUF5QixPQUF6QixDQUFYO0FBQUEsWUFDSW9nQixPQUFPMWdCLFFBQVEsQ0FBUixFQUFXTSxhQUFYLENBQXlCLE9BQXpCLENBRFg7O0FBR0EsWUFBSW1nQixJQUFKLEVBQVU7QUFDUixjQUFJRSxXQUFXM2pCLFFBQVFnRCxPQUFSLENBQWdCeWdCLElBQWhCLEVBQXNCcGQsTUFBdEIsR0FBK0JvUixJQUEvQixHQUFzQzhDLElBQXRDLEVBQWY7QUFDRDs7QUFFRCxZQUFJbUosSUFBSixFQUFVO0FBQ1IsY0FBSUUsV0FBVzVqQixRQUFRZ0QsT0FBUixDQUFnQjBnQixJQUFoQixFQUFzQnJkLE1BQXRCLEdBQStCb1IsSUFBL0IsR0FBc0M4QyxJQUF0QyxFQUFmO0FBQ0Q7O0FBRUQsZUFBTyxVQUFTNVcsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNyQ3pDLGtCQUFRZ1UsTUFBUixDQUFlaFgsUUFBUWdELE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0J1VyxRQUEvQixDQUF3QywwQkFBeEMsQ0FBZjtBQUNBdlcsa0JBQVFnVSxNQUFSLENBQWVoWCxRQUFRZ0QsT0FBUixDQUFnQixhQUFoQixFQUErQnVXLFFBQS9CLENBQXdDLDBCQUF4QyxDQUFmOztBQUVBLGNBQUlaLGNBQWMsSUFBSXZGLGVBQUosQ0FBb0J6UCxLQUFwQixFQUEyQlgsT0FBM0IsRUFBb0N5QyxLQUFwQyxDQUFsQjs7QUFFQWhFLGlCQUFPc2MscUJBQVAsQ0FBNkJwRixXQUE3QixFQUEwQyw0REFBMUM7O0FBRUEsY0FBSWdMLFlBQVksQ0FBQ2xlLE1BQU02SCxRQUF2QixFQUFpQztBQUMvQnFMLHdCQUFZaEMsZUFBWixDQUE0QixJQUE1QixFQUFrQ2dOLFFBQWxDO0FBQ0Q7O0FBRUQsY0FBSUMsWUFBWSxDQUFDbmUsTUFBTThILFFBQXZCLEVBQWlDO0FBQy9Cb0wsd0JBQVl0QixlQUFaLENBQTRCdU0sUUFBNUI7QUFDRDs7QUFFRG5pQixpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NrVCxXQUFsQztBQUNBM1Ysa0JBQVFPLElBQVIsQ0FBYSxrQkFBYixFQUFpQ29WLFdBQWpDOztBQUVBaFYsZ0JBQU1wQyxHQUFOLENBQVUsVUFBVixFQUFzQixZQUFVO0FBQzlCb1gsd0JBQVkzUSxPQUFaLEdBQXNCdEYsU0FBdEI7QUFDQU0sb0JBQVFPLElBQVIsQ0FBYSxrQkFBYixFQUFpQ2IsU0FBakM7QUFDRCxXQUhEOztBQUtBakIsaUJBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNELFNBekJEO0FBMEJEO0FBakRJLEtBQVA7QUFtREQsR0FwRGtDLENBQW5DO0FBcURELENBekREOzs7QUUzWUE7Ozs7QUFJQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzBkLFNBQVAsQ0FBaUIsY0FBakIsRUFBaUMsQ0FBQyxRQUFELEVBQVcsZUFBWCxFQUE0QixVQUFTbGMsTUFBVCxFQUFpQndYLGFBQWpCLEVBQWdDO0FBQzNGLFdBQU87QUFDTDJFLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMNVMsYUFBTyxLQUhGO0FBSUxrYSxrQkFBWSxLQUpQOztBQU1MbmEsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPLFVBQVM5QixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3JDLGNBQUlvZSxZQUFZLElBQUk1SyxhQUFKLENBQWtCdFYsS0FBbEIsRUFBeUJYLE9BQXpCLEVBQWtDeUMsS0FBbEMsQ0FBaEI7O0FBRUF6QyxrQkFBUU8sSUFBUixDQUFhLGdCQUFiLEVBQStCc2dCLFNBQS9COztBQUVBcGlCLGlCQUFPc2MscUJBQVAsQ0FBNkI4RixTQUE3QixFQUF3QyxZQUF4QztBQUNBcGlCLGlCQUFPNkcsbUJBQVAsQ0FBMkI3QyxLQUEzQixFQUFrQ29lLFNBQWxDOztBQUVBbGdCLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQnNpQixzQkFBVTdiLE9BQVYsR0FBb0J0RixTQUFwQjtBQUNBTSxvQkFBUU8sSUFBUixDQUFhLGdCQUFiLEVBQStCYixTQUEvQjtBQUNBTSxzQkFBVSxJQUFWO0FBQ0QsV0FKRDs7QUFNQXZCLGlCQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRCxTQWZEO0FBZ0JEOztBQXhCSSxLQUFQO0FBMkJELEdBNUJnQyxDQUFqQztBQThCRCxDQW5DRDs7O0FDekVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVc7QUFDVjs7QUFDQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzBkLFNBQVAsQ0FBaUIsY0FBakIsRUFBaUMsQ0FBQyxVQUFELEVBQWEsV0FBYixFQUEwQixRQUExQixFQUFvQyxVQUFTN2MsUUFBVCxFQUFtQndZLFNBQW5CLEVBQThCN1gsTUFBOUIsRUFBc0M7O0FBRXpHLFdBQU87QUFDTG1jLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMc0gsa0JBQVksS0FIUDtBQUlMbGEsYUFBTyxJQUpGOztBQU1MRCxlQUFTLGlCQUFTVixPQUFULEVBQWtCeUMsS0FBbEIsRUFBeUI7QUFDaENuRixZQUFJaWpCLEtBQUosQ0FBVUMsSUFBVixDQUFlLGdJQUFmOztBQUVBLFlBQUlsVyxXQUFXdEssUUFBUSxDQUFSLEVBQVdNLGFBQVgsQ0FBeUIsWUFBekIsQ0FBZjtBQUFBLFlBQ0l5VyxnQkFBZ0IvVyxRQUFRLENBQVIsRUFBV00sYUFBWCxDQUF5QixpQkFBekIsQ0FEcEI7O0FBR0EsWUFBSWdLLFFBQUosRUFBYztBQUNaLGNBQUlxVyxXQUFXM2pCLFFBQVFnRCxPQUFSLENBQWdCc0ssUUFBaEIsRUFBMEJqSCxNQUExQixHQUFtQ29SLElBQW5DLEdBQTBDOEMsSUFBMUMsRUFBZjtBQUNEOztBQUVELFlBQUlSLGFBQUosRUFBbUI7QUFDakIsY0FBSStKLGdCQUFnQjlqQixRQUFRZ0QsT0FBUixDQUFnQitXLGFBQWhCLEVBQStCMVQsTUFBL0IsR0FBd0NvUixJQUF4QyxHQUErQzhDLElBQS9DLEVBQXBCO0FBQ0Q7O0FBRUQsZUFBTyxVQUFTNVcsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNyQ3pDLGtCQUFRZ1UsTUFBUixDQUFlaFgsUUFBUWdELE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0J1VyxRQUEvQixDQUF3Qyx5Q0FBeEMsQ0FBZjtBQUNBdlcsa0JBQVFnVSxNQUFSLENBQWVoWCxRQUFRZ0QsT0FBUixDQUFnQixhQUFoQixFQUErQnVXLFFBQS9CLENBQXdDLG9DQUF4QyxDQUFmOztBQUVBLGNBQUl3QyxZQUFZLElBQUl6QyxTQUFKLENBQWMzVixLQUFkLEVBQXFCWCxPQUFyQixFQUE4QnlDLEtBQTlCLENBQWhCOztBQUVBLGNBQUlrZSxZQUFZLENBQUNsZSxNQUFNNkgsUUFBdkIsRUFBaUM7QUFDL0J5TyxzQkFBVXBGLGVBQVYsQ0FBMEJnTixRQUExQjtBQUNEOztBQUVELGNBQUlHLGlCQUFpQixDQUFDcmUsTUFBTXNVLGFBQTVCLEVBQTJDO0FBQ3pDZ0Msc0JBQVU1QixpQkFBVixDQUE0QjJKLGFBQTVCO0FBQ0Q7O0FBRURyaUIsaUJBQU82RyxtQkFBUCxDQUEyQjdDLEtBQTNCLEVBQWtDc1csU0FBbEM7QUFDQXRhLGlCQUFPc2MscUJBQVAsQ0FBNkJoQyxTQUE3QixFQUF3QywyRUFBeEM7O0FBRUEvWSxrQkFBUU8sSUFBUixDQUFhLGdCQUFiLEVBQStCd1ksU0FBL0I7O0FBRUFwWSxnQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0J3YSxzQkFBVS9ULE9BQVYsR0FBb0J0RixTQUFwQjtBQUNBTSxvQkFBUU8sSUFBUixDQUFhLGdCQUFiLEVBQStCYixTQUEvQjtBQUNELFdBSEQ7O0FBS0FqQixpQkFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0QsU0F6QkQ7QUEwQkQ7QUE5Q0ksS0FBUDtBQWdERCxHQWxEZ0MsQ0FBakM7QUFtREQsQ0F2REQ7OztBR2pWQTs7OztBQUlBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7Ozs7Ozs7Ozs7O0FBY0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUFoRCxVQUFRQyxNQUFSLENBQWUsT0FBZixFQUF3QjBkLFNBQXhCLENBQWtDLGFBQWxDLEVBQWlELENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsUUFBekIsRUFBbUMsVUFBUzdjLFFBQVQsRUFBbUIyYixRQUFuQixFQUE2QmhiLE1BQTdCLEVBQXFDO0FBQ3ZILFdBQU87QUFDTG1jLGdCQUFVLEdBREw7QUFFTGphLGFBQU8sSUFGRjs7QUFJTEQsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPLFVBQVM5QixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDOztBQUVyQyxjQUFJc2UsV0FBVyxJQUFJdEgsUUFBSixDQUFhOVksS0FBYixFQUFvQlgsT0FBcEIsRUFBNkJ5QyxLQUE3QixDQUFmOztBQUVBaEUsaUJBQU82RyxtQkFBUCxDQUEyQjdDLEtBQTNCLEVBQWtDc2UsUUFBbEM7QUFDQXRpQixpQkFBT3NjLHFCQUFQLENBQTZCZ0csUUFBN0IsRUFBdUMsU0FBdkM7O0FBRUEvZ0Isa0JBQVFPLElBQVIsQ0FBYSxjQUFiLEVBQTZCd2dCLFFBQTdCOztBQUVBcGdCLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQndpQixxQkFBUy9iLE9BQVQsR0FBbUJ0RixTQUFuQjtBQUNBTSxvQkFBUU8sSUFBUixDQUFhLGNBQWIsRUFBNkJiLFNBQTdCO0FBQ0QsV0FIRDs7QUFLQWpCLGlCQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRCxTQWZEO0FBZ0JEO0FBdEJJLEtBQVA7QUF3QkQsR0F6QmdELENBQWpEO0FBMEJELENBN0JEOzs7QXNCaEVBOzs7O0FBSUE7Ozs7Ozs7O0FBUUEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUEsTUFBSWUsWUFBWWxFLE9BQU9TLEdBQVAsQ0FBVzBqQixzQkFBWCxDQUFrQ3JCLFdBQWxDLENBQThDQyxLQUE5RDtBQUNBL2lCLFNBQU9TLEdBQVAsQ0FBVzBqQixzQkFBWCxDQUFrQ3JCLFdBQWxDLENBQThDQyxLQUE5QyxHQUFzRHRpQixJQUFJdUQsaUJBQUosQ0FBc0Isc0JBQXRCLEVBQThDRSxTQUE5QyxDQUF0RDs7QUFFQS9ELFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCMGQsU0FBeEIsQ0FBa0Msb0JBQWxDLEVBQXdELENBQUMsVUFBRCxFQUFhLGlCQUFiLEVBQWdDLFFBQWhDLEVBQTBDLFVBQVM3YyxRQUFULEVBQW1CdWIsZUFBbkIsRUFBb0M1YSxNQUFwQyxFQUE0QztBQUM1SSxXQUFPO0FBQ0xtYyxnQkFBVSxHQURMOztBQUdMbGEsZUFBUyxpQkFBU1YsT0FBVCxFQUFrQnlDLEtBQWxCLEVBQXlCOztBQUVoQyxlQUFPLFVBQVM5QixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDOztBQUVyQyxjQUFJMkMsT0FBTyxJQUFJaVUsZUFBSixDQUFvQjFZLEtBQXBCLEVBQTJCWCxPQUEzQixFQUFvQ3lDLEtBQXBDLENBQVg7O0FBRUFoRSxpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0MyQyxJQUFsQztBQUNBM0csaUJBQU9zYyxxQkFBUCxDQUE2QjNWLElBQTdCLEVBQW1DLFNBQW5DOztBQUVBcEYsa0JBQVFPLElBQVIsQ0FBYSxzQkFBYixFQUFxQzZFLElBQXJDOztBQUVBcEYsa0JBQVEsQ0FBUixFQUFXNmYsVUFBWCxHQUF3QnBoQixPQUFPcWhCLGdCQUFQLENBQXdCMWEsSUFBeEIsQ0FBeEI7O0FBRUF6RSxnQkFBTXBDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFlBQVc7QUFDL0I2RyxpQkFBS0osT0FBTCxHQUFldEYsU0FBZjtBQUNBTSxvQkFBUU8sSUFBUixDQUFhLHNCQUFiLEVBQXFDYixTQUFyQztBQUNELFdBSEQ7O0FBS0FqQixpQkFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0QsU0FqQkQ7QUFrQkQ7QUF2QkksS0FBUDtBQXlCRCxHQTFCdUQsQ0FBeEQ7QUEyQkQsQ0FqQ0Q7OztBQ1pBOzs7O0FBSUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFRQSxDQUFDLFlBQVc7QUFDVjs7QUFFQSxNQUFJZSxZQUFZbEUsT0FBT1MsR0FBUCxDQUFXMmpCLG1CQUFYLENBQStCdEIsV0FBL0IsQ0FBMkNDLEtBQTNEO0FBQ0EvaUIsU0FBT1MsR0FBUCxDQUFXMmpCLG1CQUFYLENBQStCdEIsV0FBL0IsQ0FBMkNDLEtBQTNDLEdBQW1EdGlCLElBQUl1RCxpQkFBSixDQUFzQixtQkFBdEIsRUFBMkNFLFNBQTNDLENBQW5EOztBQUVBL0QsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxpQkFBbEMsRUFBcUQsQ0FBQyxVQUFELEVBQWEsY0FBYixFQUE2QixRQUE3QixFQUF1QyxVQUFTN2MsUUFBVCxFQUFtQjBiLFlBQW5CLEVBQWlDL2EsTUFBakMsRUFBeUM7QUFDbkksV0FBTztBQUNMbWMsZ0JBQVUsR0FETDs7QUFHTGxhLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0J5QyxLQUFsQixFQUF5Qjs7QUFFaEMsZUFBTyxVQUFTOUIsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQzs7QUFFckMsY0FBSTJDLE9BQU8sSUFBSW9VLFlBQUosQ0FBaUI3WSxLQUFqQixFQUF3QlgsT0FBeEIsRUFBaUN5QyxLQUFqQyxDQUFYOztBQUVBaEUsaUJBQU82RyxtQkFBUCxDQUEyQjdDLEtBQTNCLEVBQWtDMkMsSUFBbEM7QUFDQTNHLGlCQUFPc2MscUJBQVAsQ0FBNkIzVixJQUE3QixFQUFtQyx3REFBbkM7O0FBRUFwRixrQkFBUU8sSUFBUixDQUFhLG1CQUFiLEVBQWtDNkUsSUFBbEM7O0FBRUFwRixrQkFBUSxDQUFSLEVBQVc2ZixVQUFYLEdBQXdCcGhCLE9BQU9xaEIsZ0JBQVAsQ0FBd0IxYSxJQUF4QixDQUF4Qjs7QUFFQXpFLGdCQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQjZHLGlCQUFLSixPQUFMLEdBQWV0RixTQUFmO0FBQ0FNLG9CQUFRTyxJQUFSLENBQWEsbUJBQWIsRUFBa0NiLFNBQWxDO0FBQ0QsV0FIRDs7QUFLQWpCLGlCQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRCxTQWpCRDtBQWtCRDtBQXZCSSxLQUFQO0FBeUJELEdBMUJvRCxDQUFyRDtBQTJCRCxDQWpDRDs7O0F0QnpEQTs7OztBQUlBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxDQUFDLFlBQVU7QUFDVDs7QUFFQWhELFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQXdCMGQsU0FBeEIsQ0FBa0MsV0FBbEMsRUFBK0MsQ0FBQyxRQUFELEVBQVcsWUFBWCxFQUF5QixVQUFTbGMsTUFBVCxFQUFpQm1iLFVBQWpCLEVBQTZCO0FBQ25HLFdBQU87QUFDTGdCLGdCQUFVLEdBREw7QUFFTHJILGVBQVMsS0FGSjtBQUdMNVMsYUFBTyxJQUhGOztBQUtMVSxZQUFNLGNBQVNWLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7O0FBRXBDLFlBQUlBLE1BQU15ZSxZQUFWLEVBQXdCO0FBQ3RCLGdCQUFNLElBQUk1aUIsS0FBSixDQUFVLHFEQUFWLENBQU47QUFDRDs7QUFFRCxZQUFJNmlCLGFBQWEsSUFBSXZILFVBQUosQ0FBZTVaLE9BQWYsRUFBd0JXLEtBQXhCLEVBQStCOEIsS0FBL0IsQ0FBakI7QUFDQWhFLGVBQU9vRyxtQ0FBUCxDQUEyQ3NjLFVBQTNDLEVBQXVEbmhCLE9BQXZEOztBQUVBdkIsZUFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0MwZSxVQUFsQztBQUNBbmhCLGdCQUFRTyxJQUFSLENBQWEsWUFBYixFQUEyQjRnQixVQUEzQjs7QUFFQTFpQixlQUFPcUcsT0FBUCxDQUFlQyxTQUFmLENBQXlCcEUsS0FBekIsRUFBZ0MsWUFBVztBQUN6Q3dnQixxQkFBV25jLE9BQVgsR0FBcUJ0RixTQUFyQjtBQUNBakIsaUJBQU93RyxxQkFBUCxDQUE2QmtjLFVBQTdCO0FBQ0FuaEIsa0JBQVFPLElBQVIsQ0FBYSxZQUFiLEVBQTJCYixTQUEzQjtBQUNBakIsaUJBQU95RyxjQUFQLENBQXNCO0FBQ3BCbEYscUJBQVNBLE9BRFc7QUFFcEJXLG1CQUFPQSxLQUZhO0FBR3BCOEIsbUJBQU9BO0FBSGEsV0FBdEI7QUFLQXpDLG9CQUFVeUMsUUFBUTlCLFFBQVEsSUFBMUI7QUFDRCxTQVZEOztBQVlBbEMsZUFBT3djLGtCQUFQLENBQTBCamIsUUFBUSxDQUFSLENBQTFCLEVBQXNDLE1BQXRDO0FBQ0Q7QUE5QkksS0FBUDtBQWdDRCxHQWpDOEMsQ0FBL0M7QUFrQ0QsQ0FyQ0Q7OztBdUJ2REEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUFvaEIsTUFBSUMsT0FBSixHQUFjLENBQUMsUUFBRCxFQUFXLGFBQVgsQ0FBZDtBQUNBcmtCLFVBQVFDLE1BQVIsQ0FBZSxPQUFmLEVBQ0cwZCxTQURILENBQ2EsUUFEYixFQUN1QnlHLEdBRHZCLEVBRUd6RyxTQUZILENBRWEsZUFGYixFQUU4QnlHLEdBRjlCLEVBSlUsQ0FNMEI7O0FBRXBDLFdBQVNBLEdBQVQsQ0FBYTNpQixNQUFiLEVBQXFCK0YsV0FBckIsRUFBa0M7QUFDaEMsV0FBTztBQUNMb1csZ0JBQVUsR0FETDtBQUVMdlosWUFBTSxjQUFTVixLQUFULEVBQWdCWCxPQUFoQixFQUF5QnlDLEtBQXpCLEVBQWdDO0FBQ3BDLFlBQUkyQyxPQUFPLElBQUlaLFdBQUosQ0FBZ0I3RCxLQUFoQixFQUF1QlgsT0FBdkIsRUFBZ0N5QyxLQUFoQyxDQUFYO0FBQ0F6QyxnQkFBUSxDQUFSLEVBQVc2ZixVQUFYLEdBQXdCcGhCLE9BQU9xaEIsZ0JBQVAsQ0FBd0IxYSxJQUF4QixDQUF4Qjs7QUFFQTNHLGVBQU93YyxrQkFBUCxDQUEwQmpiLFFBQVEsQ0FBUixDQUExQixFQUFzQyxNQUF0QztBQUNEO0FBUEksS0FBUDtBQVNEO0FBQ0YsQ0FuQkQ7OztBQ0FBOzs7O0FBSUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7Ozs7Ozs7OztBQWNBLENBQUMsWUFBVztBQUNWOztBQUVBLE1BQUllLFlBQVlsRSxPQUFPUyxHQUFQLENBQVdvZCxhQUFYLENBQXlCaUYsV0FBekIsQ0FBcUNDLEtBQXJEO0FBQ0EvaUIsU0FBT1MsR0FBUCxDQUFXb2QsYUFBWCxDQUF5QmlGLFdBQXpCLENBQXFDQyxLQUFyQyxHQUE2Q3RpQixJQUFJdUQsaUJBQUosQ0FBc0IsWUFBdEIsRUFBb0NFLFNBQXBDLENBQTdDOztBQUVBL0QsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxXQUFsQyxFQUErQyxDQUFDLFFBQUQsRUFBVyxVQUFYLEVBQXVCLFFBQXZCLEVBQWlDLFlBQWpDLEVBQStDLFVBQVNsYyxNQUFULEVBQWlCWCxRQUFqQixFQUEyQndLLE1BQTNCLEVBQW1DaVMsVUFBbkMsRUFBK0M7O0FBRTNJLFdBQU87QUFDTEssZ0JBQVUsR0FETDs7QUFHTHJILGVBQVMsS0FISjtBQUlMNVMsYUFBTyxJQUpGOztBQU1MVSxZQUFNLGNBQVNWLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0MwWSxVQUFoQyxFQUE0Qzs7QUFHaER4YSxjQUFNMEYsTUFBTixDQUFhNUQsTUFBTTZlLFFBQW5CLEVBQTZCLFVBQVMxWSxJQUFULEVBQWU7QUFDMUMsY0FBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCQSxtQkFBT0EsU0FBUyxNQUFoQjtBQUNEO0FBQ0Q1SSxrQkFBUSxDQUFSLEVBQVd1aEIsbUJBQVgsQ0FBK0IsQ0FBQzNZLElBQWhDO0FBQ0QsU0FMRDs7QUFPQSxZQUFJNFksYUFBYSxJQUFJakgsVUFBSixDQUFlNVosS0FBZixFQUFzQlgsT0FBdEIsRUFBK0J5QyxLQUEvQixDQUFqQjtBQUNBaEUsZUFBT29HLG1DQUFQLENBQTJDMmMsVUFBM0MsRUFBdUR4aEIsT0FBdkQ7O0FBRUF2QixlQUFPc2MscUJBQVAsQ0FBNkJ5RyxVQUE3QixFQUF5QyxzREFBekM7O0FBRUF4aEIsZ0JBQVFPLElBQVIsQ0FBYSxZQUFiLEVBQTJCaWhCLFVBQTNCO0FBQ0EvaUIsZUFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0MrZSxVQUFsQzs7QUFFQTdnQixjQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMvQmlqQixxQkFBV3hjLE9BQVgsR0FBcUJ0RixTQUFyQjtBQUNBakIsaUJBQU93RyxxQkFBUCxDQUE2QnVjLFVBQTdCO0FBQ0F4aEIsa0JBQVFPLElBQVIsQ0FBYSxZQUFiLEVBQTJCYixTQUEzQjtBQUNELFNBSkQ7O0FBTUFqQixlQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQS9CSSxLQUFQO0FBaUNELEdBbkM4QyxDQUEvQztBQW9DRCxDQTFDRDs7O0FDaklBLENBQUMsWUFBVTtBQUNUOztBQUVBaEQsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxhQUFsQyxFQUFpRCxDQUFDLGdCQUFELEVBQW1CLFVBQVN2ZCxjQUFULEVBQXlCO0FBQzNGLFdBQU87QUFDTHdkLGdCQUFVLEdBREw7QUFFTHdFLGdCQUFVLElBRkw7QUFHTDFlLGVBQVMsaUJBQVNWLE9BQVQsRUFBa0I7QUFDekIsWUFBSXloQixVQUFVemhCLFFBQVEsQ0FBUixFQUFXMGhCLFFBQVgsSUFBdUIxaEIsUUFBUXlVLElBQVIsRUFBckM7QUFDQXJYLHVCQUFlQyxHQUFmLENBQW1CMkMsUUFBUTZHLElBQVIsQ0FBYSxJQUFiLENBQW5CLEVBQXVDNGEsT0FBdkM7QUFDRDtBQU5JLEtBQVA7QUFRRCxHQVRnRCxDQUFqRDtBQVVELENBYkQ7OztBQ0FBOzs7O0FBSUE7Ozs7Ozs7O0FBUUEsQ0FBQyxZQUFXO0FBQ1Y7O0FBRUF6a0IsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0IwZCxTQUF4QixDQUFrQyxZQUFsQyxFQUFnRCxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQVNsYyxNQUFULEVBQWlCK0YsV0FBakIsRUFBOEI7QUFDdEcsV0FBTztBQUNMb1csZ0JBQVUsR0FETDs7QUFHTDtBQUNBO0FBQ0FqYSxhQUFPLEtBTEY7QUFNTGthLGtCQUFZLEtBTlA7O0FBUUxuYSxlQUFTLGlCQUFTVixPQUFULEVBQWtCO0FBQ3pCLGVBQU87QUFDTDhhLGVBQUssYUFBU25hLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCeUMsS0FBekIsRUFBZ0M7QUFDbkM7QUFDQSxnQkFBSXpDLFFBQVEsQ0FBUixFQUFXUSxRQUFYLEtBQXdCLGFBQTVCLEVBQTJDO0FBQ3pDZ0UsMEJBQVlXLFFBQVosQ0FBcUJ4RSxLQUFyQixFQUE0QlgsT0FBNUIsRUFBcUN5QyxLQUFyQyxFQUE0QyxFQUFDNEMsU0FBUyxhQUFWLEVBQTVDO0FBQ0Q7QUFDRixXQU5JO0FBT0wyVixnQkFBTSxjQUFTcmEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQ2hFLG1CQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQVRJLFNBQVA7QUFXRDtBQXBCSSxLQUFQO0FBc0JELEdBdkIrQyxDQUFoRDtBQXlCRCxDQTVCRDs7O0FDWkE7Ozs7QUFJQTs7Ozs7Ozs7QUFRQSxDQUFDLFlBQVU7QUFDVDs7QUFDQSxNQUFJL0MsU0FBU0QsUUFBUUMsTUFBUixDQUFlLE9BQWYsQ0FBYjs7QUFFQUEsU0FBTzBkLFNBQVAsQ0FBaUIsa0JBQWpCLEVBQXFDLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsVUFBU2xjLE1BQVQsRUFBaUIrRixXQUFqQixFQUE4QjtBQUMzRixXQUFPO0FBQ0xvVyxnQkFBVSxHQURMO0FBRUxqYSxhQUFPLEtBRkY7QUFHTFUsWUFBTTtBQUNKeVosYUFBSyxhQUFTbmEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNuQyxjQUFJa2YsZ0JBQWdCLElBQUluZCxXQUFKLENBQWdCN0QsS0FBaEIsRUFBdUJYLE9BQXZCLEVBQWdDeUMsS0FBaEMsQ0FBcEI7QUFDQXpDLGtCQUFRTyxJQUFSLENBQWEsb0JBQWIsRUFBbUNvaEIsYUFBbkM7QUFDQWxqQixpQkFBTzZHLG1CQUFQLENBQTJCN0MsS0FBM0IsRUFBa0NrZixhQUFsQzs7QUFFQWxqQixpQkFBT29HLG1DQUFQLENBQTJDOGMsYUFBM0MsRUFBMEQzaEIsT0FBMUQ7O0FBRUF2QixpQkFBT3FHLE9BQVAsQ0FBZUMsU0FBZixDQUF5QnBFLEtBQXpCLEVBQWdDLFlBQVc7QUFDekNnaEIsMEJBQWMzYyxPQUFkLEdBQXdCdEYsU0FBeEI7QUFDQWpCLG1CQUFPd0cscUJBQVAsQ0FBNkIwYyxhQUE3QjtBQUNBM2hCLG9CQUFRTyxJQUFSLENBQWEsb0JBQWIsRUFBbUNiLFNBQW5DO0FBQ0FNLHNCQUFVLElBQVY7O0FBRUF2QixtQkFBT3lHLGNBQVAsQ0FBc0I7QUFDcEJ2RSxxQkFBT0EsS0FEYTtBQUVwQjhCLHFCQUFPQSxLQUZhO0FBR3BCekMsdUJBQVNBO0FBSFcsYUFBdEI7QUFLQVcsb0JBQVFYLFVBQVV5QyxRQUFRLElBQTFCO0FBQ0QsV0FaRDtBQWFELFNBckJHO0FBc0JKdVksY0FBTSxjQUFTcmEsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUJ5QyxLQUF6QixFQUFnQztBQUNwQ2hFLGlCQUFPd2Msa0JBQVAsQ0FBMEJqYixRQUFRLENBQVIsQ0FBMUIsRUFBc0MsTUFBdEM7QUFDRDtBQXhCRztBQUhELEtBQVA7QUE4QkQsR0EvQm9DLENBQXJDO0FBZ0NELENBcENEOzs7QUNaQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFVO0FBQ1Q7O0FBRUEsTUFBSS9DLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUEsTUFBSWllLG1CQUFtQjtBQUNyQjs7O0FBR0EwRyxtQkFBZSx1QkFBUzVoQixPQUFULEVBQWtCO0FBQy9CLFVBQUk4VixXQUFXOVYsUUFBUXFELE1BQVIsR0FBaUJ5UyxRQUFqQixFQUFmO0FBQ0EsV0FBSyxJQUFJcE8sSUFBSSxDQUFiLEVBQWdCQSxJQUFJb08sU0FBU3ZNLE1BQTdCLEVBQXFDN0IsR0FBckMsRUFBMEM7QUFDeEN3VCx5QkFBaUIwRyxhQUFqQixDQUErQjVrQixRQUFRZ0QsT0FBUixDQUFnQjhWLFNBQVNwTyxDQUFULENBQWhCLENBQS9CO0FBQ0Q7QUFDRixLQVRvQjs7QUFXckI7OztBQUdBNFQsdUJBQW1CLDJCQUFTN1ksS0FBVCxFQUFnQjtBQUNqQ0EsWUFBTW9mLFNBQU4sR0FBa0IsSUFBbEI7QUFDQXBmLFlBQU1xZixXQUFOLEdBQW9CLElBQXBCO0FBQ0QsS0FqQm9COztBQW1CckI7OztBQUdBQyxvQkFBZ0Isd0JBQVMvaEIsT0FBVCxFQUFrQjtBQUNoQ0EsY0FBUXFELE1BQVI7QUFDRCxLQXhCb0I7O0FBMEJyQjs7O0FBR0FnWSxrQkFBYyxzQkFBUzFhLEtBQVQsRUFBZ0I7QUFDNUJBLFlBQU1xaEIsV0FBTixHQUFvQixFQUFwQjtBQUNBcmhCLFlBQU1zaEIsVUFBTixHQUFtQixJQUFuQjtBQUNBdGhCLGNBQVEsSUFBUjtBQUNELEtBakNvQjs7QUFtQ3JCOzs7O0FBSUFvRSxlQUFXLG1CQUFTcEUsS0FBVCxFQUFnQnpFLEVBQWhCLEVBQW9CO0FBQzdCLFVBQUlnbUIsUUFBUXZoQixNQUFNcEMsR0FBTixDQUFVLFVBQVYsRUFBc0IsWUFBVztBQUMzQzJqQjtBQUNBaG1CLFdBQUdHLEtBQUgsQ0FBUyxJQUFULEVBQWVDLFNBQWY7QUFDRCxPQUhXLENBQVo7QUFJRDtBQTVDb0IsR0FBdkI7O0FBK0NBVyxTQUFPc0YsT0FBUCxDQUFlLGtCQUFmLEVBQW1DLFlBQVc7QUFDNUMsV0FBTzJZLGdCQUFQO0FBQ0QsR0FGRDs7QUFJQTtBQUNBLEdBQUMsWUFBVztBQUNWLFFBQUlpSCxvQkFBb0IsRUFBeEI7QUFDQSxrSkFBOEk1SixLQUE5SSxDQUFvSixHQUFwSixFQUF5SjVSLE9BQXpKLENBQ0UsVUFBUzFLLElBQVQsRUFBZTtBQUNiLFVBQUltbUIsZ0JBQWdCQyxtQkFBbUIsUUFBUXBtQixJQUEzQixDQUFwQjtBQUNBa21CLHdCQUFrQkMsYUFBbEIsSUFBbUMsQ0FBQyxRQUFELEVBQVcsVUFBUzlaLE1BQVQsRUFBaUI7QUFDN0QsZUFBTztBQUNMNUgsbUJBQVMsaUJBQVM0aEIsUUFBVCxFQUFtQnpiLElBQW5CLEVBQXlCO0FBQ2hDLGdCQUFJM0ssS0FBS29NLE9BQU96QixLQUFLdWIsYUFBTCxDQUFQLENBQVQ7QUFDQSxtQkFBTyxVQUFTemhCLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCNkcsSUFBekIsRUFBK0I7QUFDcEMsa0JBQUkwYixXQUFXLFNBQVhBLFFBQVcsQ0FBU2xaLEtBQVQsRUFBZ0I7QUFDN0IxSSxzQkFBTTZoQixNQUFOLENBQWEsWUFBVztBQUN0QnRtQixxQkFBR3lFLEtBQUgsRUFBVSxFQUFDbU4sUUFBUXpFLEtBQVQsRUFBVjtBQUNELGlCQUZEO0FBR0QsZUFKRDtBQUtBckosc0JBQVFtSixFQUFSLENBQVdsTixJQUFYLEVBQWlCc21CLFFBQWpCOztBQUVBckgsK0JBQWlCblcsU0FBakIsQ0FBMkJwRSxLQUEzQixFQUFrQyxZQUFXO0FBQzNDWCx3QkFBUXdKLEdBQVIsQ0FBWXZOLElBQVosRUFBa0JzbUIsUUFBbEI7QUFDQXZpQiwwQkFBVSxJQUFWOztBQUVBa2IsaUNBQWlCRyxZQUFqQixDQUE4QjFhLEtBQTlCO0FBQ0FBLHdCQUFRLElBQVI7O0FBRUF1YSxpQ0FBaUJJLGlCQUFqQixDQUFtQ3pVLElBQW5DO0FBQ0FBLHVCQUFPLElBQVA7QUFDRCxlQVREO0FBVUQsYUFsQkQ7QUFtQkQ7QUF0QkksU0FBUDtBQXdCRCxPQXpCa0MsQ0FBbkM7O0FBMkJBLGVBQVN3YixrQkFBVCxDQUE0QnBtQixJQUE1QixFQUFrQztBQUNoQyxlQUFPQSxLQUFLc1gsT0FBTCxDQUFhLFdBQWIsRUFBMEIsVUFBU29GLE9BQVQsRUFBa0I7QUFDakQsaUJBQU9BLFFBQVEsQ0FBUixFQUFXNEQsV0FBWCxFQUFQO0FBQ0QsU0FGTSxDQUFQO0FBR0Q7QUFDRixLQW5DSDtBQXFDQXRmLFdBQU93bEIsTUFBUCxDQUFjLENBQUMsVUFBRCxFQUFhLFVBQVNDLFFBQVQsRUFBbUI7QUFDNUMsVUFBSUMsUUFBUSxTQUFSQSxLQUFRLENBQVNDLFNBQVQsRUFBb0I7QUFDOUJBLGtCQUFVRCxLQUFWO0FBQ0EsZUFBT0MsU0FBUDtBQUNELE9BSEQ7QUFJQTdtQixhQUFPZ1IsSUFBUCxDQUFZb1YsaUJBQVosRUFBK0J4YixPQUEvQixDQUF1QyxVQUFTeWIsYUFBVCxFQUF3QjtBQUM3RE0saUJBQVNHLFNBQVQsQ0FBbUJULGdCQUFnQixXQUFuQyxFQUFnRCxDQUFDLFdBQUQsRUFBY08sS0FBZCxDQUFoRDtBQUNELE9BRkQ7QUFHRCxLQVJhLENBQWQ7QUFTQTVtQixXQUFPZ1IsSUFBUCxDQUFZb1YsaUJBQVosRUFBK0J4YixPQUEvQixDQUF1QyxVQUFTeWIsYUFBVCxFQUF3QjtBQUM3RG5sQixhQUFPMGQsU0FBUCxDQUFpQnlILGFBQWpCLEVBQWdDRCxrQkFBa0JDLGFBQWxCLENBQWhDO0FBQ0QsS0FGRDtBQUdELEdBbkREO0FBb0RELENBN0dEOzs7QXhEakJBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFFQSxNQUFJbmxCLFNBQVNELFFBQVFDLE1BQVIsQ0FBZSxPQUFmLENBQWI7O0FBRUE7OztBQUdBQSxTQUFPc0YsT0FBUCxDQUFlLFFBQWYsRUFBeUIsQ0FBQyxZQUFELEVBQWUsU0FBZixFQUEwQixlQUExQixFQUEyQyxXQUEzQyxFQUF3RCxnQkFBeEQsRUFBMEUsT0FBMUUsRUFBbUYsSUFBbkYsRUFBeUYsVUFBekYsRUFBcUcsWUFBckcsRUFBbUgsa0JBQW5ILEVBQXVJLFVBQVN4RSxVQUFULEVBQXFCK2tCLE9BQXJCLEVBQThCQyxhQUE5QixFQUE2Q0MsU0FBN0MsRUFBd0Q1bEIsY0FBeEQsRUFBd0U2bEIsS0FBeEUsRUFBK0V2a0IsRUFBL0UsRUFBbUZaLFFBQW5GLEVBQTZGb1ksVUFBN0YsRUFBeUdnRixnQkFBekcsRUFBMkg7O0FBRXpSLFFBQUl6YyxTQUFTeWtCLG9CQUFiO0FBQ0EsUUFBSUMsZUFBZWpOLFdBQVduWCxTQUFYLENBQXFCb2tCLFlBQXhDOztBQUVBLFdBQU8xa0IsTUFBUDs7QUFFQSxhQUFTeWtCLGtCQUFULEdBQThCO0FBQzVCLGFBQU87O0FBRUxFLGdDQUF3QixXQUZuQjs7QUFJTHRlLGlCQUFTb1csZ0JBSko7O0FBTUxtSSxpQ0FBeUJuTixXQUFXckUsMkJBTi9COztBQVFMeVIseUNBQWlDcE4sV0FBV29OLCtCQVJ2Qzs7QUFVTDs7O0FBR0FDLDJDQUFtQyw2Q0FBVztBQUM1QyxpQkFBTyxLQUFLRCwrQkFBWjtBQUNELFNBZkk7O0FBaUJMOzs7Ozs7QUFNQXhnQix1QkFBZSx1QkFBU3NDLElBQVQsRUFBZXBGLE9BQWYsRUFBd0J3akIsV0FBeEIsRUFBcUM7QUFDbERBLHNCQUFZN2MsT0FBWixDQUFvQixVQUFTOGMsVUFBVCxFQUFxQjtBQUN2Q3JlLGlCQUFLcWUsVUFBTCxJQUFtQixZQUFXO0FBQzVCLHFCQUFPempCLFFBQVF5akIsVUFBUixFQUFvQnBuQixLQUFwQixDQUEwQjJELE9BQTFCLEVBQW1DMUQsU0FBbkMsQ0FBUDtBQUNELGFBRkQ7QUFHRCxXQUpEOztBQU1BLGlCQUFPLFlBQVc7QUFDaEJrbkIsd0JBQVk3YyxPQUFaLENBQW9CLFVBQVM4YyxVQUFULEVBQXFCO0FBQ3ZDcmUsbUJBQUtxZSxVQUFMLElBQW1CLElBQW5CO0FBQ0QsYUFGRDtBQUdBcmUsbUJBQU9wRixVQUFVLElBQWpCO0FBQ0QsV0FMRDtBQU1ELFNBcENJOztBQXNDTDs7OztBQUlBd0QscUNBQTZCLHFDQUFTa2dCLEtBQVQsRUFBZ0JDLFVBQWhCLEVBQTRCO0FBQ3ZEQSxxQkFBV2hkLE9BQVgsQ0FBbUIsVUFBU2lkLFFBQVQsRUFBbUI7QUFDcEM3bkIsbUJBQU9zUixjQUFQLENBQXNCcVcsTUFBTTduQixTQUE1QixFQUF1QytuQixRQUF2QyxFQUFpRDtBQUMvQ3prQixtQkFBSyxlQUFZO0FBQ2YsdUJBQU8sS0FBS3dELFFBQUwsQ0FBYyxDQUFkLEVBQWlCaWhCLFFBQWpCLENBQVA7QUFDRCxlQUg4QztBQUkvQ3JXLG1CQUFLLGFBQVMvTyxLQUFULEVBQWdCO0FBQ25CLHVCQUFPLEtBQUttRSxRQUFMLENBQWMsQ0FBZCxFQUFpQmloQixRQUFqQixJQUE2QnBsQixLQUFwQyxDQURtQixDQUN3QjtBQUM1QztBQU44QyxhQUFqRDtBQVFELFdBVEQ7QUFVRCxTQXJESTs7QUF1REw7Ozs7Ozs7QUFPQXdFLHNCQUFjLHNCQUFTb0MsSUFBVCxFQUFlcEYsT0FBZixFQUF3QjZqQixVQUF4QixFQUFvQ0MsR0FBcEMsRUFBeUM7QUFDckRBLGdCQUFNQSxPQUFPLFVBQVM3Z0IsTUFBVCxFQUFpQjtBQUFFLG1CQUFPQSxNQUFQO0FBQWdCLFdBQWhEO0FBQ0E0Z0IsdUJBQWEsR0FBR2xrQixNQUFILENBQVVra0IsVUFBVixDQUFiO0FBQ0EsY0FBSUUsWUFBWSxFQUFoQjs7QUFFQUYscUJBQVdsZCxPQUFYLENBQW1CLFVBQVNxZCxTQUFULEVBQW9CO0FBQ3JDLGdCQUFJekIsV0FBVyxTQUFYQSxRQUFXLENBQVNsWixLQUFULEVBQWdCO0FBQzdCeWEsa0JBQUl6YSxNQUFNcEcsTUFBTixJQUFnQixFQUFwQjtBQUNBbUMsbUJBQUtoQyxJQUFMLENBQVU0Z0IsU0FBVixFQUFxQjNhLEtBQXJCO0FBQ0QsYUFIRDtBQUlBMGEsc0JBQVVFLElBQVYsQ0FBZTFCLFFBQWY7QUFDQXZpQixvQkFBUTlCLGdCQUFSLENBQXlCOGxCLFNBQXpCLEVBQW9DekIsUUFBcEMsRUFBOEMsS0FBOUM7QUFDRCxXQVBEOztBQVNBLGlCQUFPLFlBQVc7QUFDaEJzQix1QkFBV2xkLE9BQVgsQ0FBbUIsVUFBU3FkLFNBQVQsRUFBb0IzYyxLQUFwQixFQUEyQjtBQUM1Q3JILHNCQUFRa0IsbUJBQVIsQ0FBNEI4aUIsU0FBNUIsRUFBdUNELFVBQVUxYyxLQUFWLENBQXZDLEVBQXlELEtBQXpEO0FBQ0QsYUFGRDtBQUdBakMsbUJBQU9wRixVQUFVK2pCLFlBQVlELE1BQU0sSUFBbkM7QUFDRCxXQUxEO0FBTUQsU0FsRkk7O0FBb0ZMOzs7QUFHQUksb0NBQTRCLHNDQUFXO0FBQ3JDLGlCQUFPLENBQUMsQ0FBQ2hPLFdBQVdpTyxPQUFYLENBQW1CQyxpQkFBNUI7QUFDRCxTQXpGSTs7QUEyRkw7OztBQUdBQyw2QkFBcUJuTyxXQUFXbU8sbUJBOUYzQjs7QUFnR0w7OztBQUdBRCwyQkFBbUJsTyxXQUFXa08saUJBbkd6Qjs7QUFxR0w7Ozs7O0FBS0FFLHdCQUFnQix3QkFBU2xmLElBQVQsRUFBZW1mLFdBQWYsRUFBNEJ2akIsUUFBNUIsRUFBc0M7QUFDcEQsY0FBSUssT0FBT3ZELFNBQVN5bUIsV0FBVCxDQUFYO0FBQ0EsY0FBSXpRLFlBQVkxTyxLQUFLMUMsTUFBTCxDQUFZbkIsSUFBWixFQUFoQjs7QUFFQUYsZUFBS3lTLFNBQUw7O0FBRUE7OztBQUdBOVcsa0JBQVFnRCxPQUFSLENBQWdCdWtCLFdBQWhCLEVBQTZCaGtCLElBQTdCLENBQWtDLFFBQWxDLEVBQTRDdVQsU0FBNUM7O0FBRUFBLG9CQUFVdFMsVUFBVixDQUFxQixZQUFXO0FBQzlCUixxQkFBU3VqQixXQUFUO0FBQ0QsV0FGRDtBQUdELFNBeEhJOztBQTBITDs7OztBQUlBekUsMEJBQWtCLDBCQUFTMWEsSUFBVCxFQUFlO0FBQUE7O0FBQy9CLGlCQUFPLElBQUl2SSxPQUFPUyxHQUFQLENBQVdrbkIsVUFBZixDQUNMLGdCQUFpQnBpQixJQUFqQixFQUEwQjtBQUFBLGdCQUF4Qm5ELElBQXdCLFFBQXhCQSxJQUF3QjtBQUFBLGdCQUFsQndsQixNQUFrQixRQUFsQkEsTUFBa0I7O0FBQ3hCNW5CLG1CQUFPUyxHQUFQLENBQVd5QixTQUFYLENBQXFCeVYsZ0JBQXJCLENBQXNDdlYsSUFBdEMsRUFBNEN5QyxJQUE1QyxDQUFpRCxnQkFBUTtBQUN2RCxvQkFBSzRpQixjQUFMLENBQ0VsZixJQURGLEVBRUV2SSxPQUFPUyxHQUFQLENBQVdpakIsS0FBWCxDQUFpQmxpQixhQUFqQixDQUErQm9XLEtBQUs4QyxJQUFMLEVBQS9CLENBRkYsRUFHRSxtQkFBVztBQUNUa04sdUJBQU9ybUIsV0FBUCxDQUFtQjRCLE9BQW5CO0FBQ0FvQyxxQkFBS3BDLE9BQUw7QUFDRCxlQU5IO0FBUUQsYUFURDtBQVVELFdBWkksRUFhTCxtQkFBVztBQUNUaEQsb0JBQVFnRCxPQUFSLENBQWdCQSxPQUFoQixFQUF5Qk8sSUFBekIsQ0FBOEIsUUFBOUIsRUFBd0MySCxRQUF4QztBQUNBbEksb0JBQVFxRCxNQUFSO0FBQ0QsV0FoQkksQ0FBUDtBQWtCRCxTQWpKSTs7QUFtSkw7Ozs7Ozs7QUFPQTZCLHdCQUFnQix3QkFBU3dmLE1BQVQsRUFBaUI7QUFDL0IsY0FBSUEsT0FBTy9qQixLQUFYLEVBQWtCO0FBQ2hCdWEsNkJBQWlCRyxZQUFqQixDQUE4QnFKLE9BQU8vakIsS0FBckM7QUFDRDs7QUFFRCxjQUFJK2pCLE9BQU9qaUIsS0FBWCxFQUFrQjtBQUNoQnlZLDZCQUFpQkksaUJBQWpCLENBQW1Db0osT0FBT2ppQixLQUExQztBQUNEOztBQUVELGNBQUlpaUIsT0FBTzFrQixPQUFYLEVBQW9CO0FBQ2xCa2IsNkJBQWlCNkcsY0FBakIsQ0FBZ0MyQyxPQUFPMWtCLE9BQXZDO0FBQ0Q7O0FBRUQsY0FBSTBrQixPQUFPQyxRQUFYLEVBQXFCO0FBQ25CRCxtQkFBT0MsUUFBUCxDQUFnQmhlLE9BQWhCLENBQXdCLFVBQVMzRyxPQUFULEVBQWtCO0FBQ3hDa2IsK0JBQWlCNkcsY0FBakIsQ0FBZ0MvaEIsT0FBaEM7QUFDRCxhQUZEO0FBR0Q7QUFDRixTQTVLSTs7QUE4S0w7Ozs7QUFJQTRrQiw0QkFBb0IsNEJBQVM1a0IsT0FBVCxFQUFrQi9ELElBQWxCLEVBQXdCO0FBQzFDLGlCQUFPK0QsUUFBUUcsYUFBUixDQUFzQmxFLElBQXRCLENBQVA7QUFDRCxTQXBMSTs7QUFzTEw7Ozs7QUFJQXVZLDBCQUFrQiwwQkFBU3ZWLElBQVQsRUFBZTtBQUMvQixjQUFJQyxRQUFROUIsZUFBZStCLEdBQWYsQ0FBbUJGLElBQW5CLENBQVo7O0FBRUEsY0FBSUMsS0FBSixFQUFXO0FBQ1QsZ0JBQUkybEIsV0FBV25tQixHQUFHb21CLEtBQUgsRUFBZjs7QUFFQSxnQkFBSXJRLE9BQU8sT0FBT3ZWLEtBQVAsS0FBaUIsUUFBakIsR0FBNEJBLEtBQTVCLEdBQW9DQSxNQUFNLENBQU4sQ0FBL0M7QUFDQTJsQixxQkFBU3hsQixPQUFULENBQWlCLEtBQUswbEIsaUJBQUwsQ0FBdUJ0USxJQUF2QixDQUFqQjs7QUFFQSxtQkFBT29RLFNBQVNHLE9BQWhCO0FBRUQsV0FSRCxNQVFPO0FBQ0wsbUJBQU8vQixNQUFNO0FBQ1hnQyxtQkFBS2htQixJQURNO0FBRVhpbUIsc0JBQVE7QUFGRyxhQUFOLEVBR0p4akIsSUFISSxDQUdDLFVBQVN5akIsUUFBVCxFQUFtQjtBQUN6QixrQkFBSTFRLE9BQU8wUSxTQUFTNWtCLElBQXBCOztBQUVBLHFCQUFPLEtBQUt3a0IsaUJBQUwsQ0FBdUJ0USxJQUF2QixDQUFQO0FBQ0QsYUFKTyxDQUlOdlIsSUFKTSxDQUlELElBSkMsQ0FIRCxDQUFQO0FBUUQ7QUFDRixTQS9NSTs7QUFpTkw7Ozs7QUFJQTZoQiwyQkFBbUIsMkJBQVN0USxJQUFULEVBQWU7QUFDaENBLGlCQUFPLENBQUMsS0FBS0EsSUFBTixFQUFZOEMsSUFBWixFQUFQOztBQUVBLGNBQUksQ0FBQzlDLEtBQUsrSSxLQUFMLENBQVcsWUFBWCxDQUFMLEVBQStCO0FBQzdCL0ksbUJBQU8sc0JBQXNCQSxJQUF0QixHQUE2QixhQUFwQztBQUNEOztBQUVELGlCQUFPQSxJQUFQO0FBQ0QsU0E3Tkk7O0FBK05MOzs7Ozs7O0FBT0EyUSxtQ0FBMkIsbUNBQVMzaUIsS0FBVCxFQUFnQjRpQixTQUFoQixFQUEyQjtBQUNwRCxjQUFJQyxnQkFBZ0I3aUIsU0FBUyxPQUFPQSxNQUFNOGlCLFFBQWIsS0FBMEIsUUFBbkMsR0FBOEM5aUIsTUFBTThpQixRQUFOLENBQWVoTyxJQUFmLEdBQXNCZ0IsS0FBdEIsQ0FBNEIsSUFBNUIsQ0FBOUMsR0FBa0YsRUFBdEc7QUFDQThNLHNCQUFZcm9CLFFBQVF5QyxPQUFSLENBQWdCNGxCLFNBQWhCLElBQTZCQyxjQUFjM2xCLE1BQWQsQ0FBcUIwbEIsU0FBckIsQ0FBN0IsR0FBK0RDLGFBQTNFOztBQUVBOzs7O0FBSUEsaUJBQU8sVUFBUzVELFFBQVQsRUFBbUI7QUFDeEIsbUJBQU8yRCxVQUFVdkIsR0FBVixDQUFjLFVBQVN5QixRQUFULEVBQW1CO0FBQ3RDLHFCQUFPN0QsU0FBU25PLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0JnUyxRQUF0QixDQUFQO0FBQ0QsYUFGTSxFQUVKM0ksSUFGSSxDQUVDLEdBRkQsQ0FBUDtBQUdELFdBSkQ7QUFLRCxTQW5QSTs7QUFxUEw7Ozs7OztBQU1BL1gsNkNBQXFDLDZDQUFTTyxJQUFULEVBQWVwRixPQUFmLEVBQXdCO0FBQzNELGNBQUl3bEIsVUFBVTtBQUNaQyx5QkFBYSxxQkFBU0MsTUFBVCxFQUFpQjtBQUM1QixrQkFBSUMsU0FBU3hDLGFBQWE1SyxLQUFiLENBQW1CdlksUUFBUTZHLElBQVIsQ0FBYSxVQUFiLENBQW5CLENBQWI7QUFDQTZlLHVCQUFTLE9BQU9BLE1BQVAsS0FBa0IsUUFBbEIsR0FBNkJBLE9BQU9uTyxJQUFQLEVBQTdCLEdBQTZDLEVBQXREOztBQUVBLHFCQUFPNEwsYUFBYTVLLEtBQWIsQ0FBbUJtTixNQUFuQixFQUEyQkUsSUFBM0IsQ0FBZ0MsVUFBU0YsTUFBVCxFQUFpQjtBQUN0RCx1QkFBT0MsT0FBT3RTLE9BQVAsQ0FBZXFTLE1BQWYsS0FBMEIsQ0FBQyxDQUFsQztBQUNELGVBRk0sQ0FBUDtBQUdELGFBUlc7O0FBVVpHLDRCQUFnQix3QkFBU0gsTUFBVCxFQUFpQjtBQUMvQkEsdUJBQVMsT0FBT0EsTUFBUCxLQUFrQixRQUFsQixHQUE2QkEsT0FBT25PLElBQVAsRUFBN0IsR0FBNkMsRUFBdEQ7O0FBRUEsa0JBQUlnTyxXQUFXcEMsYUFBYTVLLEtBQWIsQ0FBbUJ2WSxRQUFRNkcsSUFBUixDQUFhLFVBQWIsQ0FBbkIsRUFBNkNpZixNQUE3QyxDQUFvRCxVQUFTQyxLQUFULEVBQWdCO0FBQ2pGLHVCQUFPQSxVQUFVTCxNQUFqQjtBQUNELGVBRmMsRUFFWjlJLElBRlksQ0FFUCxHQUZPLENBQWY7O0FBSUE1YyxzQkFBUTZHLElBQVIsQ0FBYSxVQUFiLEVBQXlCMGUsUUFBekI7QUFDRCxhQWxCVzs7QUFvQlpTLHlCQUFhLHFCQUFTVCxRQUFULEVBQW1CO0FBQzlCdmxCLHNCQUFRNkcsSUFBUixDQUFhLFVBQWIsRUFBeUI3RyxRQUFRNkcsSUFBUixDQUFhLFVBQWIsSUFBMkIsR0FBM0IsR0FBaUMwZSxRQUExRDtBQUNELGFBdEJXOztBQXdCWlUseUJBQWEscUJBQVNWLFFBQVQsRUFBbUI7QUFDOUJ2bEIsc0JBQVE2RyxJQUFSLENBQWEsVUFBYixFQUF5QjBlLFFBQXpCO0FBQ0QsYUExQlc7O0FBNEJaVyw0QkFBZ0Isd0JBQVNYLFFBQVQsRUFBbUI7QUFDakMsa0JBQUksS0FBS0UsV0FBTCxDQUFpQkYsUUFBakIsQ0FBSixFQUFnQztBQUM5QixxQkFBS00sY0FBTCxDQUFvQk4sUUFBcEI7QUFDRCxlQUZELE1BRU87QUFDTCxxQkFBS1MsV0FBTCxDQUFpQlQsUUFBakI7QUFDRDtBQUNGO0FBbENXLFdBQWQ7O0FBcUNBLGVBQUssSUFBSUwsTUFBVCxJQUFtQk0sT0FBbkIsRUFBNEI7QUFDMUIsZ0JBQUlBLFFBQVEvb0IsY0FBUixDQUF1QnlvQixNQUF2QixDQUFKLEVBQW9DO0FBQ2xDOWYsbUJBQUs4ZixNQUFMLElBQWVNLFFBQVFOLE1BQVIsQ0FBZjtBQUNEO0FBQ0Y7QUFDRixTQXRTSTs7QUF3U0w7Ozs7Ozs7QUFPQXRnQiw0QkFBb0IsNEJBQVNRLElBQVQsRUFBZXNjLFFBQWYsRUFBeUIxaEIsT0FBekIsRUFBa0M7QUFDcEQsY0FBSW1tQixNQUFNLFNBQU5BLEdBQU0sQ0FBU1osUUFBVCxFQUFtQjtBQUMzQixtQkFBTzdELFNBQVNuTyxPQUFULENBQWlCLEdBQWpCLEVBQXNCZ1MsUUFBdEIsQ0FBUDtBQUNELFdBRkQ7O0FBSUEsY0FBSWEsTUFBTTtBQUNSWCx5QkFBYSxxQkFBU0YsUUFBVCxFQUFtQjtBQUM5QixxQkFBT3ZsQixRQUFRcW1CLFFBQVIsQ0FBaUJGLElBQUlaLFFBQUosQ0FBakIsQ0FBUDtBQUNELGFBSE87O0FBS1JNLDRCQUFnQix3QkFBU04sUUFBVCxFQUFtQjtBQUNqQ3ZsQixzQkFBUXNtQixXQUFSLENBQW9CSCxJQUFJWixRQUFKLENBQXBCO0FBQ0QsYUFQTzs7QUFTUlMseUJBQWEscUJBQVNULFFBQVQsRUFBbUI7QUFDOUJ2bEIsc0JBQVF1VyxRQUFSLENBQWlCNFAsSUFBSVosUUFBSixDQUFqQjtBQUNELGFBWE87O0FBYVJVLHlCQUFhLHFCQUFTVixRQUFULEVBQW1CO0FBQzlCLGtCQUFJZ0IsVUFBVXZtQixRQUFRNkcsSUFBUixDQUFhLE9BQWIsRUFBc0IwUixLQUF0QixDQUE0QixLQUE1QixDQUFkO0FBQUEsa0JBQ0lpTyxPQUFPOUUsU0FBU25PLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsR0FBdEIsQ0FEWDs7QUFHQSxtQkFBSyxJQUFJN0wsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNmUsUUFBUWhkLE1BQTVCLEVBQW9DN0IsR0FBcEMsRUFBeUM7QUFDdkMsb0JBQUkrZSxNQUFNRixRQUFRN2UsQ0FBUixDQUFWOztBQUVBLG9CQUFJK2UsSUFBSWpKLEtBQUosQ0FBVWdKLElBQVYsQ0FBSixFQUFxQjtBQUNuQnhtQiwwQkFBUXNtQixXQUFSLENBQW9CRyxHQUFwQjtBQUNEO0FBQ0Y7O0FBRUR6bUIsc0JBQVF1VyxRQUFSLENBQWlCNFAsSUFBSVosUUFBSixDQUFqQjtBQUNELGFBMUJPOztBQTRCUlcsNEJBQWdCLHdCQUFTWCxRQUFULEVBQW1CO0FBQ2pDLGtCQUFJa0IsTUFBTU4sSUFBSVosUUFBSixDQUFWO0FBQ0Esa0JBQUl2bEIsUUFBUXFtQixRQUFSLENBQWlCSSxHQUFqQixDQUFKLEVBQTJCO0FBQ3pCem1CLHdCQUFRc21CLFdBQVIsQ0FBb0JHLEdBQXBCO0FBQ0QsZUFGRCxNQUVPO0FBQ0x6bUIsd0JBQVF1VyxRQUFSLENBQWlCa1EsR0FBakI7QUFDRDtBQUNGO0FBbkNPLFdBQVY7O0FBc0NBLGNBQUl6UyxTQUFTLFNBQVRBLE1BQVMsQ0FBUzBTLEtBQVQsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQ2xDLGdCQUFJLE9BQU9ELEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDaEMscUJBQU8sWUFBVztBQUNoQix1QkFBT0EsTUFBTXJxQixLQUFOLENBQVksSUFBWixFQUFrQkMsU0FBbEIsS0FBZ0NxcUIsTUFBTXRxQixLQUFOLENBQVksSUFBWixFQUFrQkMsU0FBbEIsQ0FBdkM7QUFDRCxlQUZEO0FBR0QsYUFKRCxNQUlPO0FBQ0wscUJBQU9xcUIsS0FBUDtBQUNEO0FBQ0YsV0FSRDs7QUFVQXZoQixlQUFLcWdCLFdBQUwsR0FBbUJ6UixPQUFPNU8sS0FBS3FnQixXQUFaLEVBQXlCVyxJQUFJWCxXQUE3QixDQUFuQjtBQUNBcmdCLGVBQUt5Z0IsY0FBTCxHQUFzQjdSLE9BQU81TyxLQUFLeWdCLGNBQVosRUFBNEJPLElBQUlQLGNBQWhDLENBQXRCO0FBQ0F6Z0IsZUFBSzRnQixXQUFMLEdBQW1CaFMsT0FBTzVPLEtBQUs0Z0IsV0FBWixFQUF5QkksSUFBSUosV0FBN0IsQ0FBbkI7QUFDQTVnQixlQUFLNmdCLFdBQUwsR0FBbUJqUyxPQUFPNU8sS0FBSzZnQixXQUFaLEVBQXlCRyxJQUFJSCxXQUE3QixDQUFuQjtBQUNBN2dCLGVBQUs4Z0IsY0FBTCxHQUFzQmxTLE9BQU81TyxLQUFLOGdCLGNBQVosRUFBNEJFLElBQUlGLGNBQWhDLENBQXRCO0FBQ0QsU0F6V0k7O0FBMldMOzs7OztBQUtBamhCLCtCQUF1QiwrQkFBU0csSUFBVCxFQUFlO0FBQ3BDQSxlQUFLcWdCLFdBQUwsR0FBbUJyZ0IsS0FBS3lnQixjQUFMLEdBQ2pCemdCLEtBQUs0Z0IsV0FBTCxHQUFtQjVnQixLQUFLNmdCLFdBQUwsR0FDbkI3Z0IsS0FBSzhnQixjQUFMLEdBQXNCeG1CLFNBRnhCO0FBR0QsU0FwWEk7O0FBc1hMOzs7Ozs7QUFNQTRGLDZCQUFxQiw2QkFBUzdDLEtBQVQsRUFBZ0Jta0IsTUFBaEIsRUFBd0I7QUFDM0MsY0FBSSxPQUFPbmtCLE1BQU1va0IsR0FBYixLQUFxQixRQUF6QixFQUFtQztBQUNqQyxnQkFBSUMsVUFBVXJrQixNQUFNb2tCLEdBQXBCO0FBQ0EsaUJBQUtFLFVBQUwsQ0FBZ0JELE9BQWhCLEVBQXlCRixNQUF6QjtBQUNEO0FBQ0YsU0FqWUk7O0FBbVlMSSwrQkFBdUIsK0JBQVNDLFNBQVQsRUFBb0JqRCxTQUFwQixFQUErQjtBQUNwRCxjQUFJa0QsdUJBQXVCbEQsVUFBVTFILE1BQVYsQ0FBaUIsQ0FBakIsRUFBb0JDLFdBQXBCLEtBQW9DeUgsVUFBVXhILEtBQVYsQ0FBZ0IsQ0FBaEIsQ0FBL0Q7O0FBRUF5SyxvQkFBVTlkLEVBQVYsQ0FBYTZhLFNBQWIsRUFBd0IsVUFBUzNhLEtBQVQsRUFBZ0I7QUFDdEM1SyxtQkFBT3djLGtCQUFQLENBQTBCZ00sVUFBVXRrQixRQUFWLENBQW1CLENBQW5CLENBQTFCLEVBQWlEcWhCLFNBQWpELEVBQTREM2EsU0FBU0EsTUFBTXBHLE1BQTNFOztBQUVBLGdCQUFJeVosVUFBVXVLLFVBQVVya0IsTUFBVixDQUFpQixRQUFRc2tCLG9CQUF6QixDQUFkO0FBQ0EsZ0JBQUl4SyxPQUFKLEVBQWE7QUFDWHVLLHdCQUFVdmtCLE1BQVYsQ0FBaUJvRCxLQUFqQixDQUF1QjRXLE9BQXZCLEVBQWdDLEVBQUM1TyxRQUFRekUsS0FBVCxFQUFoQztBQUNBNGQsd0JBQVV2a0IsTUFBVixDQUFpQmxCLFVBQWpCO0FBQ0Q7QUFDRixXQVJEO0FBU0QsU0EvWUk7O0FBaVpMOzs7Ozs7QUFNQXVaLCtCQUF1QiwrQkFBU2tNLFNBQVQsRUFBb0JwRCxVQUFwQixFQUFnQztBQUNyREEsdUJBQWFBLFdBQVd0TSxJQUFYLEdBQWtCZ0IsS0FBbEIsQ0FBd0IsS0FBeEIsQ0FBYjs7QUFFQSxlQUFLLElBQUk3USxJQUFJLENBQVIsRUFBV3lmLElBQUl0RCxXQUFXdGEsTUFBL0IsRUFBdUM3QixJQUFJeWYsQ0FBM0MsRUFBOEN6ZixHQUE5QyxFQUFtRDtBQUNqRCxnQkFBSXNjLFlBQVlILFdBQVduYyxDQUFYLENBQWhCO0FBQ0EsaUJBQUtzZixxQkFBTCxDQUEyQkMsU0FBM0IsRUFBc0NqRCxTQUF0QztBQUNEO0FBQ0YsU0E5Wkk7O0FBZ2FMOzs7QUFHQW9ELG1CQUFXLHFCQUFXO0FBQ3BCLGlCQUFPLENBQUMsQ0FBQ3ZxQixPQUFPdU0sU0FBUCxDQUFpQm1VLFNBQWpCLENBQTJCQyxLQUEzQixDQUFpQyxVQUFqQyxDQUFUO0FBQ0QsU0FyYUk7O0FBdWFMOzs7QUFHQTZKLGVBQU8saUJBQVc7QUFDaEIsaUJBQU8sQ0FBQyxDQUFDeHFCLE9BQU91TSxTQUFQLENBQWlCbVUsU0FBakIsQ0FBMkJDLEtBQTNCLENBQWlDLDJCQUFqQyxDQUFUO0FBQ0QsU0E1YUk7O0FBOGFMOzs7QUFHQThKLG1CQUFXLHFCQUFXO0FBQ3BCLGlCQUFPenFCLE9BQU9TLEdBQVAsQ0FBV2dxQixTQUFYLEVBQVA7QUFDRCxTQW5iSTs7QUFxYkw7OztBQUdBQyxxQkFBYyxZQUFXO0FBQ3ZCLGNBQUlDLEtBQUszcUIsT0FBT3VNLFNBQVAsQ0FBaUJtVSxTQUExQjtBQUNBLGNBQUlDLFFBQVFnSyxHQUFHaEssS0FBSCxDQUFTLGlEQUFULENBQVo7O0FBRUEsY0FBSWlLLFNBQVNqSyxRQUFRaEssV0FBV2dLLE1BQU0sQ0FBTixJQUFXLEdBQVgsR0FBaUJBLE1BQU0sQ0FBTixDQUE1QixLQUF5QyxDQUFqRCxHQUFxRCxLQUFsRTs7QUFFQSxpQkFBTyxZQUFXO0FBQ2hCLG1CQUFPaUssTUFBUDtBQUNELFdBRkQ7QUFHRCxTQVRZLEVBeGJSOztBQW1jTDs7Ozs7O0FBTUF4TSw0QkFBb0IsNEJBQVNsYixHQUFULEVBQWNpa0IsU0FBZCxFQUF5QnpqQixJQUF6QixFQUErQjtBQUNqREEsaUJBQU9BLFFBQVEsRUFBZjs7QUFFQSxjQUFJOEksUUFBUXJMLFNBQVNtaUIsV0FBVCxDQUFxQixZQUFyQixDQUFaOztBQUVBLGVBQUssSUFBSXVILEdBQVQsSUFBZ0JubkIsSUFBaEIsRUFBc0I7QUFDcEIsZ0JBQUlBLEtBQUs5RCxjQUFMLENBQW9CaXJCLEdBQXBCLENBQUosRUFBOEI7QUFDNUJyZSxvQkFBTXFlLEdBQU4sSUFBYW5uQixLQUFLbW5CLEdBQUwsQ0FBYjtBQUNEO0FBQ0Y7O0FBRURyZSxnQkFBTTRkLFNBQU4sR0FBa0JsbkIsTUFDaEIvQyxRQUFRZ0QsT0FBUixDQUFnQkQsR0FBaEIsRUFBcUJRLElBQXJCLENBQTBCUixJQUFJUyxRQUFKLENBQWFDLFdBQWIsRUFBMUIsS0FBeUQsSUFEekMsR0FDZ0QsSUFEbEU7QUFFQTRJLGdCQUFNK1csU0FBTixDQUFnQnJnQixJQUFJUyxRQUFKLENBQWFDLFdBQWIsS0FBNkIsR0FBN0IsR0FBbUN1akIsU0FBbkQsRUFBOEQsSUFBOUQsRUFBb0UsSUFBcEU7O0FBRUFqa0IsY0FBSXNnQixhQUFKLENBQWtCaFgsS0FBbEI7QUFDRCxTQXpkSTs7QUEyZEw7Ozs7Ozs7Ozs7OztBQVlBMGQsb0JBQVksb0JBQVM5cUIsSUFBVCxFQUFlMnFCLE1BQWYsRUFBdUI7QUFDakMsY0FBSWUsUUFBUTFyQixLQUFLc2MsS0FBTCxDQUFXLElBQVgsQ0FBWjs7QUFFQSxtQkFBU2hMLEdBQVQsQ0FBYXFhLFNBQWIsRUFBd0JELEtBQXhCLEVBQStCZixNQUEvQixFQUF1QztBQUNyQyxnQkFBSTNxQixJQUFKO0FBQ0EsaUJBQUssSUFBSXlMLElBQUksQ0FBYixFQUFnQkEsSUFBSWlnQixNQUFNcGUsTUFBTixHQUFlLENBQW5DLEVBQXNDN0IsR0FBdEMsRUFBMkM7QUFDekN6TCxxQkFBTzByQixNQUFNamdCLENBQU4sQ0FBUDtBQUNBLGtCQUFJa2dCLFVBQVUzckIsSUFBVixNQUFvQnlELFNBQXBCLElBQWlDa29CLFVBQVUzckIsSUFBVixNQUFvQixJQUF6RCxFQUErRDtBQUM3RDJyQiwwQkFBVTNyQixJQUFWLElBQWtCLEVBQWxCO0FBQ0Q7QUFDRDJyQiwwQkFBWUEsVUFBVTNyQixJQUFWLENBQVo7QUFDRDs7QUFFRDJyQixzQkFBVUQsTUFBTUEsTUFBTXBlLE1BQU4sR0FBZSxDQUFyQixDQUFWLElBQXFDcWQsTUFBckM7O0FBRUEsZ0JBQUlnQixVQUFVRCxNQUFNQSxNQUFNcGUsTUFBTixHQUFlLENBQXJCLENBQVYsTUFBdUNxZCxNQUEzQyxFQUFtRDtBQUNqRCxvQkFBTSxJQUFJdG9CLEtBQUosQ0FBVSxxQkFBcUJzb0IsT0FBT2hrQixNQUFQLENBQWNpa0IsR0FBbkMsR0FBeUMsbURBQW5ELENBQU47QUFDRDtBQUNGOztBQUVELGNBQUl2cEIsSUFBSWdDLGFBQVIsRUFBdUI7QUFDckJpTyxnQkFBSWpRLElBQUlnQyxhQUFSLEVBQXVCcW9CLEtBQXZCLEVBQThCZixNQUE5QjtBQUNEOztBQUVEO0FBQ0EsY0FBSTVtQixVQUFVNG1CLE9BQU9qa0IsUUFBUCxDQUFnQixDQUFoQixDQUFkOztBQUVBLGlCQUFPM0MsUUFBUW1HLFVBQWYsRUFBMkI7QUFDekIsZ0JBQUluRyxRQUFRNm5CLFlBQVIsQ0FBcUIsV0FBckIsQ0FBSixFQUF1QztBQUNyQ3RhLGtCQUFJdlEsUUFBUWdELE9BQVIsQ0FBZ0JBLE9BQWhCLEVBQXlCTyxJQUF6QixDQUE4QixRQUE5QixDQUFKLEVBQTZDb25CLEtBQTdDLEVBQW9EZixNQUFwRDtBQUNBNW1CLHdCQUFVLElBQVY7QUFDQTtBQUNEOztBQUVEQSxzQkFBVUEsUUFBUW1HLFVBQWxCO0FBQ0Q7QUFDRG5HLG9CQUFVLElBQVY7O0FBRUE7QUFDQXVOLGNBQUl4UCxVQUFKLEVBQWdCNHBCLEtBQWhCLEVBQXVCZixNQUF2QjtBQUNEO0FBL2dCSSxPQUFQO0FBaWhCRDtBQUVGLEdBM2hCd0IsQ0FBekI7QUE0aEJELENBcGlCRDs7O0F5RGpCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxPQUFELEVBQVUsU0FBVixFQUFxQixRQUFyQixFQUErQmpnQixPQUEvQixDQUF1QyxnQkFBUTtBQUM3QyxNQUFNbWhCLHVCQUF1QnhxQixJQUFJeXFCLFlBQUosQ0FBaUI5ckIsSUFBakIsQ0FBN0I7O0FBRUFxQixNQUFJeXFCLFlBQUosQ0FBaUI5ckIsSUFBakIsSUFBeUIsVUFBQytyQixPQUFELEVBQTJCO0FBQUEsUUFBakI1bUIsT0FBaUIsdUVBQVAsRUFBTzs7QUFDbEQsV0FBTzRtQixPQUFQLEtBQW1CLFFBQW5CLEdBQStCNW1CLFFBQVE0bUIsT0FBUixHQUFrQkEsT0FBakQsR0FBNkQ1bUIsVUFBVTRtQixPQUF2RTs7QUFFQSxRQUFNdG5CLFVBQVVVLFFBQVFWLE9BQXhCO0FBQ0EsUUFBSTRoQixpQkFBSjs7QUFFQWxoQixZQUFRVixPQUFSLEdBQWtCLG1CQUFXO0FBQzNCNGhCLGlCQUFXdGxCLFFBQVFnRCxPQUFSLENBQWdCVSxVQUFVQSxRQUFRVixPQUFSLENBQVYsR0FBNkJBLE9BQTdDLENBQVg7QUFDQSxhQUFPMUMsSUFBSVEsUUFBSixDQUFhd2tCLFFBQWIsRUFBdUJBLFNBQVMyRixRQUFULEdBQW9COW9CLEdBQXBCLENBQXdCLFlBQXhCLENBQXZCLENBQVA7QUFDRCxLQUhEOztBQUtBaUMsWUFBUW1FLE9BQVIsR0FBa0IsWUFBTTtBQUN0QitjLGVBQVMvaEIsSUFBVCxDQUFjLFFBQWQsRUFBd0IySCxRQUF4QjtBQUNBb2EsaUJBQVcsSUFBWDtBQUNELEtBSEQ7O0FBS0EsV0FBT3dGLHFCQUFxQjFtQixPQUFyQixDQUFQO0FBQ0QsR0FqQkQ7QUFrQkQsQ0FyQkQ7OztBQ2pCQTtBQUNBLElBQUl2RSxPQUFPcXJCLE1BQVAsSUFBaUJsckIsUUFBUWdELE9BQVIsS0FBb0JuRCxPQUFPcXJCLE1BQWhELEVBQXdEO0FBQ3REcnBCLFVBQVEyaEIsSUFBUixDQUFhLHFIQUFiLEVBRHNELENBQytFO0FBQ3RJOzs7QUNIRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsQ0FBQyxZQUFVO0FBQ1Q7O0FBRUF4akIsVUFBUUMsTUFBUixDQUFlLE9BQWYsRUFBd0JFLEdBQXhCLENBQTRCLENBQUMsZ0JBQUQsRUFBbUIsVUFBU0MsY0FBVCxFQUF5QjtBQUN0RSxRQUFJK3FCLFlBQVl0ckIsT0FBT21CLFFBQVAsQ0FBZ0JvcUIsZ0JBQWhCLENBQWlDLGtDQUFqQyxDQUFoQjs7QUFFQSxTQUFLLElBQUkxZ0IsSUFBSSxDQUFiLEVBQWdCQSxJQUFJeWdCLFVBQVU1ZSxNQUE5QixFQUFzQzdCLEdBQXRDLEVBQTJDO0FBQ3pDLFVBQUlnYSxXQUFXMWtCLFFBQVFnRCxPQUFSLENBQWdCbW9CLFVBQVV6Z0IsQ0FBVixDQUFoQixDQUFmO0FBQ0EsVUFBSTJnQixLQUFLM0csU0FBUzdhLElBQVQsQ0FBYyxJQUFkLENBQVQ7QUFDQSxVQUFJLE9BQU93aEIsRUFBUCxLQUFjLFFBQWxCLEVBQTRCO0FBQzFCanJCLHVCQUFlQyxHQUFmLENBQW1CZ3JCLEVBQW5CLEVBQXVCM0csU0FBUzRHLElBQVQsRUFBdkI7QUFDRDtBQUNGO0FBQ0YsR0FWMkIsQ0FBNUI7QUFZRCxDQWZEIiwiZmlsZSI6ImFuZ3VsYXItb25zZW51aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFNpbXBsZSBKYXZhU2NyaXB0IEluaGVyaXRhbmNlIGZvciBFUyA1LjFcbiAqIGJhc2VkIG9uIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9zaW1wbGUtamF2YXNjcmlwdC1pbmhlcml0YW5jZS9cbiAqICAoaW5zcGlyZWQgYnkgYmFzZTIgYW5kIFByb3RvdHlwZSlcbiAqIE1JVCBMaWNlbnNlZC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIGZuVGVzdCA9IC94eXovLnRlc3QoZnVuY3Rpb24oKXt4eXo7fSkgPyAvXFxiX3N1cGVyXFxiLyA6IC8uKi87XG5cbiAgLy8gVGhlIGJhc2UgQ2xhc3MgaW1wbGVtZW50YXRpb24gKGRvZXMgbm90aGluZylcbiAgZnVuY3Rpb24gQmFzZUNsYXNzKCl7fVxuXG4gIC8vIENyZWF0ZSBhIG5ldyBDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBjbGFzc1xuICBCYXNlQ2xhc3MuZXh0ZW5kID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgICB2YXIgX3N1cGVyID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICAvLyBTZXQgdXAgdGhlIHByb3RvdHlwZSB0byBpbmhlcml0IGZyb20gdGhlIGJhc2UgY2xhc3NcbiAgICAvLyAoYnV0IHdpdGhvdXQgcnVubmluZyB0aGUgaW5pdCBjb25zdHJ1Y3RvcilcbiAgICB2YXIgcHJvdG8gPSBPYmplY3QuY3JlYXRlKF9zdXBlcik7XG5cbiAgICAvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG92ZXIgb250byB0aGUgbmV3IHByb3RvdHlwZVxuICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIG92ZXJ3cml0aW5nIGFuIGV4aXN0aW5nIGZ1bmN0aW9uXG4gICAgICBwcm90b1tuYW1lXSA9IHR5cGVvZiBwcm9wc1tuYW1lXSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIHR5cGVvZiBfc3VwZXJbbmFtZV0gPT0gXCJmdW5jdGlvblwiICYmIGZuVGVzdC50ZXN0KHByb3BzW25hbWVdKVxuICAgICAgICA/IChmdW5jdGlvbihuYW1lLCBmbil7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLl9zdXBlcjtcblxuICAgICAgICAgICAgICAvLyBBZGQgYSBuZXcgLl9zdXBlcigpIG1ldGhvZCB0aGF0IGlzIHRoZSBzYW1lIG1ldGhvZFxuICAgICAgICAgICAgICAvLyBidXQgb24gdGhlIHN1cGVyLWNsYXNzXG4gICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gX3N1cGVyW25hbWVdO1xuXG4gICAgICAgICAgICAgIC8vIFRoZSBtZXRob2Qgb25seSBuZWVkIHRvIGJlIGJvdW5kIHRlbXBvcmFyaWx5LCBzbyB3ZVxuICAgICAgICAgICAgICAvLyByZW1vdmUgaXQgd2hlbiB3ZSdyZSBkb25lIGV4ZWN1dGluZ1xuICAgICAgICAgICAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSB0bXA7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkobmFtZSwgcHJvcHNbbmFtZV0pXG4gICAgICAgIDogcHJvcHNbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gVGhlIG5ldyBjb25zdHJ1Y3RvclxuICAgIHZhciBuZXdDbGFzcyA9IHR5cGVvZiBwcm90by5pbml0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gcHJvdG8uaGFzT3duUHJvcGVydHkoXCJpbml0XCIpXG4gICAgICAgID8gcHJvdG8uaW5pdCAvLyBBbGwgY29uc3RydWN0aW9uIGlzIGFjdHVhbGx5IGRvbmUgaW4gdGhlIGluaXQgbWV0aG9kXG4gICAgICAgIDogZnVuY3Rpb24gU3ViQ2xhc3MoKXsgX3N1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuICAgICAgOiBmdW5jdGlvbiBFbXB0eUNsYXNzKCl7fTtcblxuICAgIC8vIFBvcHVsYXRlIG91ciBjb25zdHJ1Y3RlZCBwcm90b3R5cGUgb2JqZWN0XG4gICAgbmV3Q2xhc3MucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBFbmZvcmNlIHRoZSBjb25zdHJ1Y3RvciB0byBiZSB3aGF0IHdlIGV4cGVjdFxuICAgIHByb3RvLmNvbnN0cnVjdG9yID0gbmV3Q2xhc3M7XG5cbiAgICAvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcbiAgICBuZXdDbGFzcy5leHRlbmQgPSBCYXNlQ2xhc3MuZXh0ZW5kO1xuXG4gICAgcmV0dXJuIG5ld0NsYXNzO1xuICB9O1xuXG4gIC8vIGV4cG9ydFxuICB3aW5kb3cuQ2xhc3MgPSBCYXNlQ2xhc3M7XG59KSgpO1xuIiwiLy9IRUFEIFxuKGZ1bmN0aW9uKGFwcCkge1xudHJ5IHsgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJ0ZW1wbGF0ZXMtbWFpblwiKTsgfVxuY2F0Y2goZXJyKSB7IGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwidGVtcGxhdGVzLW1haW5cIiwgW10pOyB9XG5hcHAucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG5cInVzZSBzdHJpY3RcIjtcblxuJHRlbXBsYXRlQ2FjaGUucHV0KFwidGVtcGxhdGVzL3NsaWRpbmdfbWVudS50cGxcIixcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNsaWRpbmctbWVudV9fbWVudVxcXCI+PC9kaXY+XFxuXCIgK1xuICAgIFwiPGRpdiBjbGFzcz1cXFwib25zZW4tc2xpZGluZy1tZW51X19tYWluXFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCJcIilcblxuJHRlbXBsYXRlQ2FjaGUucHV0KFwidGVtcGxhdGVzL3NwbGl0X3ZpZXcudHBsXCIsXCI8ZGl2IGNsYXNzPVxcXCJvbnNlbi1zcGxpdC12aWV3X19zZWNvbmRhcnkgZnVsbC1zY3JlZW5cXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNwbGl0LXZpZXdfX21haW4gZnVsbC1zY3JlZW5cXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIlwiKVxufV0pO1xufSkoKTsiLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICAvKipcbiAgICogSW50ZXJuYWwgc2VydmljZSBjbGFzcyBmb3IgZnJhbWV3b3JrIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJyRvbnNlbicsIFsnJHJvb3RTY29wZScsICckd2luZG93JywgJyRjYWNoZUZhY3RvcnknLCAnJGRvY3VtZW50JywgJyR0ZW1wbGF0ZUNhY2hlJywgJyRodHRwJywgJyRxJywgJyRjb21waWxlJywgJyRvbnNHbG9iYWwnLCAnQ29tcG9uZW50Q2xlYW5lcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICR3aW5kb3csICRjYWNoZUZhY3RvcnksICRkb2N1bWVudCwgJHRlbXBsYXRlQ2FjaGUsICRodHRwLCAkcSwgJGNvbXBpbGUsICRvbnNHbG9iYWwsIENvbXBvbmVudENsZWFuZXIpIHtcblxuICAgIHZhciAkb25zZW4gPSBjcmVhdGVPbnNlblNlcnZpY2UoKTtcbiAgICB2YXIgTW9kaWZpZXJVdGlsID0gJG9uc0dsb2JhbC5faW50ZXJuYWwuTW9kaWZpZXJVdGlsO1xuXG4gICAgcmV0dXJuICRvbnNlbjtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9uc2VuU2VydmljZSgpIHtcbiAgICAgIHJldHVybiB7XG5cbiAgICAgICAgRElSRUNUSVZFX1RFTVBMQVRFX1VSTDogJ3RlbXBsYXRlcycsXG5cbiAgICAgICAgY2xlYW5lcjogQ29tcG9uZW50Q2xlYW5lcixcblxuICAgICAgICBEZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGV2aWNlQmFja0J1dHRvbkRpc3BhdGNoZXIsXG5cbiAgICAgICAgX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtZXRob2ROYW1lc1xuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3Bvc2UgYWxsIGRyaXZpbmcgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZU1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIG1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2aWV3W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50W21ldGhvZE5hbWVdLmFwcGx5KGVsZW1lbnQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtDbGFzc30ga2xhc3NcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50OiBmdW5jdGlvbihrbGFzcywgcHJvcGVydGllcykge1xuICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtsYXNzLnByb3RvdHlwZSwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldID0gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50TmFtZXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW21hcF1cbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBjbGVhciBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVFdmVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIGV2ZW50TmFtZXMsIG1hcCkge1xuICAgICAgICAgIG1hcCA9IG1hcCB8fCBmdW5jdGlvbihkZXRhaWwpIHsgcmV0dXJuIGRldGFpbDsgfTtcbiAgICAgICAgICBldmVudE5hbWVzID0gW10uY29uY2F0KGV2ZW50TmFtZXMpO1xuICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIG1hcChldmVudC5kZXRhaWwgfHwge30pO1xuICAgICAgICAgICAgICB2aWV3LmVtaXQoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUsIGluZGV4KSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyc1tpbmRleF0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmlldyA9IGVsZW1lbnQgPSBsaXN0ZW5lcnMgPSBtYXAgPSBudWxsO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0VuYWJsZWRBdXRvU3RhdHVzQmFyRmlsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJG9uc0dsb2JhbC5fY29uZmlnLmF1dG9TdGF0dXNCYXJGaWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvdWxkRmlsbFN0YXR1c0JhcjogJG9uc0dsb2JhbC5zaG91bGRGaWxsU3RhdHVzQmFyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGF1dG9TdGF0dXNCYXJGaWxsOiAkb25zR2xvYmFsLmF1dG9TdGF0dXNCYXJGaWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZGlyZWN0aXZlXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhZ2VFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqL1xuICAgICAgICBjb21waWxlQW5kTGluazogZnVuY3Rpb24odmlldywgcGFnZUVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgdmFyIGxpbmsgPSAkY29tcGlsZShwYWdlRWxlbWVudCk7XG4gICAgICAgICAgdmFyIHBhZ2VTY29wZSA9IHZpZXcuX3Njb3BlLiRuZXcoKTtcblxuICAgICAgICAgIGxpbmsocGFnZVNjb3BlKTtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIE92ZXJ3cml0ZSBwYWdlIHNjb3BlLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChwYWdlRWxlbWVudCkuZGF0YSgnX3Njb3BlJywgcGFnZVNjb3BlKTtcblxuICAgICAgICAgIHBhZ2VTY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2socGFnZUVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhZ2VMb2FkZXJcbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZVBhZ2VMb2FkZXI6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5vbnMuUGFnZUxvYWRlcihcbiAgICAgICAgICAgICh7cGFnZSwgcGFyZW50fSwgZG9uZSkgPT4ge1xuICAgICAgICAgICAgICB3aW5kb3cub25zLl9pbnRlcm5hbC5nZXRQYWdlSFRNTEFzeW5jKHBhZ2UpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21waWxlQW5kTGluayhcbiAgICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgICB3aW5kb3cub25zLl91dGlsLmNyZWF0ZUVsZW1lbnQoaHRtbC50cmltKCkpLFxuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLiRkZXN0cm95KCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge1Njb3BlfSBbcGFyYW1zLnNjb3BlXVxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gW3BhcmFtcy5lbGVtZW50XVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zLmVsZW1lbnRzXVxuICAgICAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IFtwYXJhbXMuYXR0cnNdXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhckNvbXBvbmVudDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5zY29wZSkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUocGFyYW1zLnNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmF0dHJzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKHBhcmFtcy5hdHRycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KHBhcmFtcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmaW5kRWxlbWVudGVPYmplY3Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5pbmhlcml0ZWREYXRhKG5hbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UGFnZUhUTUxBc3luYzogZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgIHZhciBjYWNoZSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChwYWdlKTtcblxuICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0eXBlb2YgY2FjaGUgPT09ICdzdHJpbmcnID8gY2FjaGUgOiBjYWNoZVsxXTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5ub3JtYWxpemVQYWdlSFRNTChodG1sKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgIHVybDogcGFnZSxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB2YXIgaHRtbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbm9ybWFsaXplUGFnZUhUTUw6IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBodG1sID0gKCcnICsgaHRtbCkudHJpbSgpO1xuXG4gICAgICAgICAgaWYgKCFodG1sLm1hdGNoKC9ePG9ucy1wYWdlLykpIHtcbiAgICAgICAgICAgIGh0bWwgPSAnPG9ucy1wYWdlIF9tdXRlZD4nICsgaHRtbCArICc8L29ucy1wYWdlPic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBtb2RpZmllciB0ZW1wbGF0ZXIgZnVuY3Rpb24uIFRoZSBtb2RpZmllciB0ZW1wbGF0ZXIgZ2VuZXJhdGUgY3NzIGNsYXNzZXMgYm91bmQgbW9kaWZpZXIgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFttb2RpZmllcnNdIGFuIGFycmF5IG9mIGFwcGVuZGl4IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2VuZXJhdGVNb2RpZmllclRlbXBsYXRlcjogZnVuY3Rpb24oYXR0cnMsIG1vZGlmaWVycykge1xuICAgICAgICAgIHZhciBhdHRyTW9kaWZpZXJzID0gYXR0cnMgJiYgdHlwZW9mIGF0dHJzLm1vZGlmaWVyID09PSAnc3RyaW5nJyA/IGF0dHJzLm1vZGlmaWVyLnRyaW0oKS5zcGxpdCgvICsvKSA6IFtdO1xuICAgICAgICAgIG1vZGlmaWVycyA9IGFuZ3VsYXIuaXNBcnJheShtb2RpZmllcnMpID8gYXR0ck1vZGlmaWVycy5jb25jYXQobW9kaWZpZXJzKSA6IGF0dHJNb2RpZmllcnM7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlIGVnLiAnb25zLWJ1dHRvbi0tKicsICdvbnMtYnV0dG9uLS0qX19pdGVtJ1xuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RpZmllcnMubWFwKGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSkuam9pbignICcpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0IGZvciBjdXN0b20gZWxlbWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgdmFyIHRva2VucyA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpO1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJVdGlsLnNwbGl0KG5lZWRsZSkuc29tZShmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLmluZGV4T2YobmVlZGxlKSAhPSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IHR5cGVvZiBuZWVkbGUgPT09ICdzdHJpbmcnID8gbmVlZGxlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgICAgIHZhciBtb2RpZmllciA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpLmZpbHRlcihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiAhPT0gbmVlZGxlO1xuICAgICAgICAgICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFkZE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgZWxlbWVudC5hdHRyKCdtb2RpZmllcicpICsgJyAnICsgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0TW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzTW9kaWZpZXIobW9kaWZpZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2RdID0gbWV0aG9kc1ttZXRob2RdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1vZGlmaWVyIG1ldGhvZHMgdG8gdmlldyBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kczogZnVuY3Rpb24odmlldywgdGVtcGxhdGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgX3RyID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZm5zID0ge1xuICAgICAgICAgICAgaGFzTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50Lmhhc0NsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuYXR0cignY2xhc3MnKS5zcGxpdCgvXFxzKy8pLFxuICAgICAgICAgICAgICAgICAgcGF0dCA9IHRlbXBsYXRlLnJlcGxhY2UoJyonLCAnLicpO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjbHMgPSBjbGFzc2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNscy5tYXRjaChwYXR0KSkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNscyA9IF90cihtb2RpZmllcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKGNscykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNscyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbihvbGRGbiwgbmV3Rm4pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB8fCBuZXdGbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld0ZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gYXBwZW5kKHZpZXcuaGFzTW9kaWZpZXIsIGZucy5oYXNNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5yZW1vdmVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnJlbW92ZU1vZGlmaWVyLCBmbnMucmVtb3ZlTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcuYWRkTW9kaWZpZXIgPSBhcHBlbmQodmlldy5hZGRNb2RpZmllciwgZm5zLmFkZE1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnNldE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuc2V0TW9kaWZpZXIsIGZucy5zZXRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnRvZ2dsZU1vZGlmaWVyLCBmbnMudG9nZ2xlTW9kaWZpZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbW9kaWZpZXIgbWV0aG9kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gdmlldy5yZW1vdmVNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gdmlldy5zZXRNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LnRvZ2dsZU1vZGlmaWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlIGFzICd2YXInIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZGVjbGFyZVZhckF0dHJpYnV0ZTogZnVuY3Rpb24oYXR0cnMsIG9iamVjdCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXR0cnMudmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHZhck5hbWUgPSBhdHRycy52YXI7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVWYXIodmFyTmFtZSwgb2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlZ2lzdGVyRXZlbnRIYW5kbGVyOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZSkge1xuICAgICAgICAgIHZhciBjYXBpdGFsaXplZEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGV2ZW50TmFtZS5zbGljZSgxKTtcblxuICAgICAgICAgIGNvbXBvbmVudC5vbihldmVudE5hbWUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGNvbXBvbmVudC5fZWxlbWVudFswXSwgZXZlbnROYW1lLCBldmVudCAmJiBldmVudC5kZXRhaWwpO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGNvbXBvbmVudC5fYXR0cnNbJ29ucycgKyBjYXBpdGFsaXplZEV2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsKGhhbmRsZXIsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVycyBmb3IgYXR0cmlidXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBldmVudE5hbWVzID0gZXZlbnROYW1lcy50cmltKCkuc3BsaXQoL1xccysvKTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnROYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudE5hbWVzW2ldO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudEhhbmRsZXIoY29tcG9uZW50LCBldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzQW5kcm9pZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2FuZHJvaWQvaSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpcGFkfGlwaG9uZXxpcG9kIHRvdWNoKS9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzV2ViVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5vbnMuaXNXZWJWaWV3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzdhYm92ZTogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCB0b3VjaCk7LipDUFUuKk9TIChcXGQrKV8oXFxkKykvaSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzJdICsgJy4nICsgbWF0Y2hbM10pID49IDcgOiBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZSBhIG5hbWVkIGV2ZW50IGZvciBhIGNvbXBvbmVudC4gVGhlIHZpZXcgb2JqZWN0LCBpZiBpdCBleGlzdHMsIGlzIGF0dGFjaGVkIHRvIGV2ZW50LmNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpcmVDb21wb25lbnRFdmVudDogZnVuY3Rpb24oZG9tLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBldmVudFtrZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LmNvbXBvbmVudCA9IGRvbSA/XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9tKS5kYXRhKGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgICBldmVudC5pbml0RXZlbnQoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnOicgKyBldmVudE5hbWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZG9tLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vJywgJ2Zvby12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vIGFuZCAkc2NvcGUuZm9vIGlzIG5vdyAnZm9vLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vLmJhcicsICdmb28tYmFyLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28uYmFyIGFuZCAkc2NvcGUuZm9vLmJhciBpcyBub3cgJ2Zvby1iYXItdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZpbmVWYXI6IGZ1bmN0aW9uKG5hbWUsIG9iamVjdCkge1xuICAgICAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoL1xcLi8pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0KGNvbnRhaW5lciwgbmFtZXMsIG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZV0gPT09IHVuZGVmaW5lZCB8fCBjb250YWluZXJbbmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJbbmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dICE9PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHZhcj1cIicgKyBvYmplY3QuX2F0dHJzLnZhciArICdcIiBiZWNhdXNlIGl0IHdpbGwgb3ZlcndyaXRlIGEgcmVhZC1vbmx5IHZhcmlhYmxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvbnMuY29tcG9uZW50QmFzZSkge1xuICAgICAgICAgICAgc2V0KG9ucy5jb21wb25lbnRCYXNlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBdHRhY2ggdG8gYW5jZXN0b3Igd2l0aCBvbnMtc2NvcGUgYXR0cmlidXRlLlxuICAgICAgICAgIHZhciBlbGVtZW50ID0gb2JqZWN0Ll9lbGVtZW50WzBdO1xuXG4gICAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdvbnMtc2NvcGUnKSkge1xuICAgICAgICAgICAgICBzZXQoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAvLyBJZiBubyBvbnMtc2NvcGUgZWxlbWVudCB3YXMgZm91bmQsIGF0dGFjaCB0byAkcm9vdFNjb3BlLlxuICAgICAgICAgIHNldCgkcm9vdFNjb3BlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWFsZXJ0LWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYWxlcnQgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruOCouODqeODvOODiOODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBBbGVydCBkaWFsb2cgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBbGVydERpYWxvZycsIFsnJG9uc2VuJywgJ0FsZXJ0RGlhbG9nVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgQWxlcnREaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIGFsZXJ0RGlhbG9nID0gbmV3IEFsZXJ0RGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhhbGVydERpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoYWxlcnREaWFsb2csIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCBhbGVydERpYWxvZyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBhbGVydERpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWxlcnQtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIlxuLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbGVydERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0FuZHJvaWRBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbmRyb2lkQWxlcnREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdJT1NBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NBbGVydERpYWxvZ0FuaW1hdG9yKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLnZhbHVlKCdBbmltYXRpb25DaG9vc2VyJywgb25zLl9pbnRlcm5hbC5BbmltYXRvckZhY3RvcnkpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtY2Fyb3VzZWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgqvjg6vjg7zjgrvjg6vjgpLooajnpLrjgafjgY3jgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgIJbL2phXVxuICogQGNvZGVwZW4geGJiek9RXG4gKiBAZ3VpZGUgVXNpbmdDYXJvdXNlbFxuICogICBbZW5dTGVhcm4gaG93IHRvIHVzZSB0aGUgY2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV1jYXJvdXNlbOOCs+ODs+ODneODvOODjeODs+ODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1jYXJvdXNlbCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDIwMHB4XCI+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqIDwvb25zLWNhcm91c2VsPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNhcm91c2VsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqvjg6vjg7zjgrvjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXJlZnJlc2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlZnJlc2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlZnJlc2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vdmVyc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvdmVyc2Nyb2xsXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvdmVyc2Nyb2xsXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWwnLCBbJyRvbnNlbicsICdDYXJvdXNlbFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIENhcm91c2VsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIGNhcm91c2VsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoY2Fyb3VzZWwsICdwb3N0Y2hhbmdlIHJlZnJlc2ggb3ZlcnNjcm9sbCBkZXN0cm95Jyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGNhcm91c2VsKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhcm91c2VsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9XSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWxJdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLiRsYXN0KSB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwKCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwSW5pdGlhbEluZGV4KCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NhdmVMYXN0U3RhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNEaWFsb2cnLCBbJyRvbnNlbicsICdEaWFsb2dWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBEaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICB2YXIgZGlhbG9nID0gbmV3IERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBkaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhkaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGRpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIGRpYWxvZyk7XG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGRpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkRpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0lPU0RpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NEaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdBbmRyb2lkRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkFuZHJvaWREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdTbGlkZURpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5TbGlkZURpYWxvZ0FuaW1hdG9yKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWZhYlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbi5bL2VuXVxuICogICBbamFd44GT44Gu44OV44Ot44O844OG44Kj44Oz44Kw44Ki44Kv44K344On44Oz44Oc44K/44Oz44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS44GX44Gm44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRmFiJywgWyckb25zZW4nLCAnRmFiVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgRmFiVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGZhYiA9IG5ldyBGYWJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCBmYWIpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGZhYik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0dlbmVyaWNWaWV3JywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBHZW5lcmljVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGl2ZU9ubHkpIHtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzKHRoaXMsIG9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSwgZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRoaXMsIGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzZWxmKTtcblxuICAgICAgICAgIGlmIChvcHRpb25zLm9uRGVzdHJveSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3koc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNlbGYgPSBlbGVtZW50ID0gc2VsZi5fZWxlbWVudCA9IHNlbGYuX3Njb3BlID0gc2NvcGUgPSBzZWxmLl9hdHRycyA9IGF0dHJzID0gb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnZpZXdLZXlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAqL1xuICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyID0gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMudmlld0tleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMudmlld0tleSBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cblxuICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgdmlldyk7XG5cbiAgICAgIHZhciBkZXN0cm95ID0gb3B0aW9ucy5vbkRlc3Ryb3kgfHwgYW5ndWxhci5ub29wO1xuICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgIGRlc3Ryb3kodmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIG51bGwpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oR2VuZXJpY1ZpZXcpO1xuXG4gICAgcmV0dXJuIEdlbmVyaWNWaWV3O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbGF6eS1yZXBlYXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgVXNpbmcgdGhpcyBjb21wb25lbnQgYSBsaXN0IHdpdGggbWlsbGlvbnMgb2YgaXRlbXMgY2FuIGJlIHJlbmRlcmVkIHdpdGhvdXQgYSBkcm9wIGluIHBlcmZvcm1hbmNlLlxuICogICAgIEl0IGRvZXMgdGhhdCBieSBcImxhemlseVwiIGxvYWRpbmcgZWxlbWVudHMgaW50byB0aGUgRE9NIHdoZW4gdGhleSBjb21lIGludG8gdmlldyBhbmRcbiAqICAgICByZW1vdmluZyBpdGVtcyBmcm9tIHRoZSBET00gd2hlbiB0aGV5IGFyZSBub3QgdmlzaWJsZS5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOWGheOBp+aPj+eUu+OBleOCjOOCi+OCouOCpOODhuODoOOBrkRPTeimgee0oOOBruiqreOBv+i+vOOBv+OBr+OAgeeUu+mdouOBq+imi+OBiOOBneOBhuOBq+OBquOBo+OBn+aZguOBvuOBp+iHquWLleeahOOBq+mBheW7tuOBleOCjOOAgVxuICogICAgIOeUu+mdouOBi+OCieimi+OBiOOBquOBj+OBquOBo+OBn+WgtOWQiOOBq+OBr+OBneOBruimgee0oOOBr+WLleeahOOBq+OCouODs+ODreODvOODieOBleOCjOOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuS9v+OBhuOBk+OBqOOBp+OAgeODkeODleOCqeODvOODnuODs+OCueOCkuWKo+WMluOBleOBm+OCi+OBk+OBqOeEoeOBl+OBq+W3qOWkp+OBquaVsOOBruimgee0oOOCkuaPj+eUu+OBp+OBjeOBvuOBmeOAglxuICogICBbL2phXVxuICogQGNvZGVwZW4gUXdyR0JtXG4gKiBAZ3VpZGUgVXNpbmdMYXp5UmVwZWF0XG4gKiAgIFtlbl1Ib3cgdG8gdXNlIExhenkgUmVwZWF0Wy9lbl1cbiAqICAgW2phXeODrOOCpOOCuOODvOODquODlOODvOODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gKiAgICAgJHNjb3BlLk15RGVsZWdhdGUgPSB7XG4gKiAgICAgICBjb3VudEl0ZW1zOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIG51bWJlciBvZiBpdGVtcy5cbiAqICAgICAgICAgcmV0dXJuIDEwMDAwMDA7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNhbGN1bGF0ZUl0ZW1IZWlnaHQ6IGZ1bmN0aW9uKGluZGV4KSB7XG4gKiAgICAgICAgIC8vIFJldHVybiB0aGUgaGVpZ2h0IG9mIGFuIGl0ZW0gaW4gcGl4ZWxzLlxuICogICAgICAgICByZXR1cm4gNDU7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBJbml0aWFsaXplIHNjb3BlXG4gKiAgICAgICAgIGl0ZW1TY29wZS5pdGVtID0gJ0l0ZW0gIycgKyAoaW5kZXggKyAxKTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgZGVzdHJveUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBPcHRpb25hbCBtZXRob2QgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbiBpdGVtIGlzIHVubG9hZGVkLlxuICogICAgICAgICBjb25zb2xlLmxvZygnRGVzdHJveWVkIGl0ZW0gd2l0aCBpbmRleDogJyArIGluZGV4KTtcbiAqICAgICAgIH1cbiAqICAgICB9O1xuICogICB9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxvbnMtbGlzdCBuZy1jb250cm9sbGVyPVwiTXlDb250cm9sbGVyXCI+XG4gKiAgIDxvbnMtbGlzdC1pdGVtIG9ucy1sYXp5LXJlcGVhdD1cIk15RGVsZWdhdGVcIj5cbiAqICAgICB7eyBpdGVtIH19XG4gKiAgIDwvb25zLWxpc3QtaXRlbT5cbiAqIDwvb25zLWxpc3Q+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sYXp5LXJlcGVhdFxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BIGRlbGVnYXRlIG9iamVjdCwgY2FuIGJlIGVpdGhlciBhbiBvYmplY3QgYXR0YWNoZWQgdG8gdGhlIHNjb3BlICh3aGVuIHVzaW5nIEFuZ3VsYXJKUykgb3IgYSBub3JtYWwgSmF2YVNjcmlwdCB2YXJpYWJsZS5bL2VuXVxuICogIFtqYV3opoHntKDjga7jg63jg7zjg4njgIHjgqLjg7Pjg63jg7zjg4njgarjganjga7lh6bnkIbjgpLlp5TorbLjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJBbmd1bGFySlPjga7jgrnjgrPjg7zjg5fjga7lpInmlbDlkI3jgoTjgIHpgJrluLjjga5KYXZhU2NyaXB044Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBwcm9wZXJ0eSBkZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGVcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRnVuY3Rpb24gd2hpY2ggcmVjaWV2ZXMgYW4gaW5kZXggYW5kIHRoZSBzY29wZSBmb3IgdGhlIGl0ZW0uIENhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB2YWx1ZXMgaW4gdGhlIGl0ZW0gc2NvcGUuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIC8qKlxuICAgKiBMYXp5IHJlcGVhdCBkaXJlY3RpdmUuXG4gICAqL1xuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNMYXp5UmVwZWF0JywgWyckb25zZW4nLCAnTGF6eVJlcGVhdFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIExhenlSZXBlYXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgdGVybWluYWw6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgbGF6eVJlcGVhdCA9IG5ldyBMYXp5UmVwZWF0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBsYXp5UmVwZWF0ID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0FuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUnLCBbJyRjb21waWxlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICAgIGNvbnN0IGRpcmVjdGl2ZUF0dHJpYnV0ZXMgPSBbJ29ucy1sYXp5LXJlcGVhdCcsICdvbnM6bGF6eTpyZXBlYXQnLCAnb25zX2xhenlfcmVwZWF0JywgJ2RhdGEtb25zLWxhenktcmVwZWF0JywgJ3gtb25zLWxhenktcmVwZWF0J107XG4gICAgY2xhc3MgQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZSBleHRlbmRzIG9ucy5faW50ZXJuYWwuTGF6eVJlcGVhdERlbGVnYXRlIHtcbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHVzZXJEZWxlZ2F0ZVxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSB0ZW1wbGF0ZUVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7U2NvcGV9IHBhcmVudFNjb3BlXG4gICAgICAgKi9cbiAgICAgIGNvbnN0cnVjdG9yKHVzZXJEZWxlZ2F0ZSwgdGVtcGxhdGVFbGVtZW50LCBwYXJlbnRTY29wZSkge1xuICAgICAgICBzdXBlcih1c2VyRGVsZWdhdGUsIHRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3BhcmVudFNjb3BlID0gcGFyZW50U2NvcGU7XG5cbiAgICAgICAgZGlyZWN0aXZlQXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4gdGVtcGxhdGVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyKSk7XG4gICAgICAgIHRoaXMuX2xpbmtlciA9ICRjb21waWxlKHRlbXBsYXRlRWxlbWVudCA/IHRlbXBsYXRlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsKTtcbiAgICAgIH1cblxuICAgICAgY29uZmlndXJlSXRlbVNjb3BlKGl0ZW0sIHNjb3BlKXtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUoaXRlbSwgc2NvcGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3lJdGVtU2NvcGUoaXRlbSwgZWxlbWVudCl7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuZGVzdHJveUl0ZW1TY29wZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fdXNlckRlbGVnYXRlLmRlc3Ryb3lJdGVtU2NvcGUoaXRlbSwgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX3VzaW5nQmluZGluZygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY3JlYXRlSXRlbUNvbnRlbnQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BsYXp5LXJlcGVhdGAgZGVsZWdhdGUgb2JqZWN0IGlzIHZhZ3VlLicpO1xuICAgICAgfVxuXG4gICAgICBsb2FkSXRlbUVsZW1lbnQoaW5kZXgsIGRvbmUpIHtcbiAgICAgICAgdGhpcy5fcHJlcGFyZUl0ZW1FbGVtZW50KGluZGV4LCAoe2VsZW1lbnQsIHNjb3BlfSkgPT4ge1xuICAgICAgICAgIGRvbmUoe2VsZW1lbnQsIHNjb3BlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBfcHJlcGFyZUl0ZW1FbGVtZW50KGluZGV4LCBkb25lKSB7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcy5fcGFyZW50U2NvcGUuJG5ldygpO1xuICAgICAgICB0aGlzLl9hZGRTcGVjaWFsUHJvcGVydGllcyhpbmRleCwgc2NvcGUpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuY29uZmlndXJlSXRlbVNjb3BlKGluZGV4LCBzY29wZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9saW5rZXIoc2NvcGUsIChjbG9uZWQpID0+IHtcbiAgICAgICAgICBsZXQgZWxlbWVudCA9IGNsb25lZFswXTtcbiAgICAgICAgICBpZiAoIXRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KGluZGV4LCBlbGVtZW50KTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb25lKHtlbGVtZW50LCBzY29wZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICovXG4gICAgICBfYWRkU3BlY2lhbFByb3BlcnRpZXMoaSwgc2NvcGUpIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMuY291bnRJdGVtcygpIC0gMTtcbiAgICAgICAgYW5ndWxhci5leHRlbmQoc2NvcGUsIHtcbiAgICAgICAgICAkaW5kZXg6IGksXG4gICAgICAgICAgJGZpcnN0OiBpID09PSAwLFxuICAgICAgICAgICRsYXN0OiBpID09PSBsYXN0LFxuICAgICAgICAgICRtaWRkbGU6IGkgIT09IDAgJiYgaSAhPT0gbGFzdCxcbiAgICAgICAgICAkZXZlbjogaSAlIDIgPT09IDAsXG4gICAgICAgICAgJG9kZDogaSAlIDIgPT09IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgaXRlbS5zY29wZS4kZXZhbEFzeW5jKCgpID0+IHRoaXMuY29uZmlndXJlSXRlbVNjb3BlKGluZGV4LCBpdGVtLnNjb3BlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIudXBkYXRlSXRlbShpbmRleCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbS5zY29wZVxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBpdGVtLmVsZW1lbnRcbiAgICAgICAqL1xuICAgICAgZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgdGhpcy5kZXN0cm95SXRlbVNjb3BlKGluZGV4LCBpdGVtLnNjb3BlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBlci5kZXN0cm95SXRlbShpbmRleCwgaXRlbS5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLnNjb3BlLiRkZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGU7XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1tb2RhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG1vZGFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg6Ljg7zjg4Djg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBNb2RhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc01vZGFsJywgWyckb25zZW4nLCAnTW9kYWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBNb2RhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogKGVsZW1lbnQsIGF0dHJzKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKG1vZGFsLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIG1vZGFsKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgbW9kYWwpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMobW9kYWwpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIG1vZGFsID0gZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1uYXZpZ2F0b3JcbiAqIEBleGFtcGxlXG4gKiA8b25zLW5hdmlnYXRvciBhbmltYXRpb249XCJzbGlkZVwiIHZhcj1cImFwcC5uYXZpXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8b25zLXRvb2xiYXI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+VGl0bGU8L2Rpdj5cbiAqICAgICA8L29ucy10b29sYmFyPlxuICpcbiAqICAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICAgPG9ucy1idXR0b24gbW9kaWZpZXI9XCJsaWdodFwiIG5nLWNsaWNrPVwiYXBwLm5hdmkucHVzaFBhZ2UoJ3BhZ2UuaHRtbCcpO1wiPlB1c2g8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtbmF2aWdhdG9yPlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wb3BQYWdlKCk7XCI+UG9wPC9vbnMtYnV0dG9uPlxuICogICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgbmF2aWdhdG9yLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiuODk+OCsuODvOOCv+ODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVwdXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlcG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXBvcFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cHVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0cG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cG9wXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLk5hdmlnYXRvckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLW5hdmlnYXRvcicsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNOYXZpZ2F0b3InLCBbJ05hdmlnYXRvclZpZXcnLCAnJG9uc2VuJywgZnVuY3Rpb24oTmF2aWdhdG9yVmlldywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBOYXZpZ2F0b3JWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ3ByZXB1c2ggcHJlcG9wIHBvc3RwdXNoIHBvc3Rwb3AgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1uYXZpZ2F0b3InLCB2aWV3KTtcblxuICAgICAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1uYXZpZ2F0b3InLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLk5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdGYWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5GYWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ0lPU1NsaWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NTbGlkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdMaWZ0VHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5MaWZ0TmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ051bGxUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLk5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdTaW1wbGVTbGlkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuU2ltcGxlU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnT3ZlcmxheVNsaWRpbmdNZW51QW5pbWF0b3InLCBbJ1NsaWRpbmdNZW51QW5pbWF0b3InLCBmdW5jdGlvbihTbGlkaW5nTWVudUFuaW1hdG9yKSB7XG5cbiAgICB2YXIgT3ZlcmxheVNsaWRpbmdNZW51QW5pbWF0b3IgPSBTbGlkaW5nTWVudUFuaW1hdG9yLmV4dGVuZCh7XG5cbiAgICAgIF9ibGFja01hc2s6IHVuZGVmaW5lZCxcblxuICAgICAgX2lzUmlnaHQ6IGZhbHNlLFxuICAgICAgX2VsZW1lbnQ6IGZhbHNlLFxuICAgICAgX21lbnVQYWdlOiBmYWxzZSxcbiAgICAgIF9tYWluUGFnZTogZmFsc2UsXG4gICAgICBfd2lkdGg6IGZhbHNlLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoIFwid2lkdGhcIiBzdHlsZSB2YWx1ZVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoIHx8ICc5MCUnO1xuICAgICAgICB0aGlzLl9pc1JpZ2h0ID0gISFvcHRpb25zLmlzUmlnaHQ7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9tYWluUGFnZSA9IG1haW5QYWdlO1xuICAgICAgICB0aGlzLl9tZW51UGFnZSA9IG1lbnVQYWdlO1xuXG4gICAgICAgIG1lbnVQYWdlLmNzcygnYm94LXNoYWRvdycsICcwcHggMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiknKTtcbiAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICAgekluZGV4OiAyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZpeCBmb3IgdHJhbnNwYXJlbnQgbWVudSBwYWdlIG9uIGlPUzguXG4gICAgICAgIG1lbnVQYWdlLmNzcygnLXdlYmtpdC10cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCknKTtcblxuICAgICAgICBtYWluUGFnZS5jc3Moe3pJbmRleDogMX0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnLScgKyBvcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICBsZWZ0OiAnLScgKyBvcHRpb25zLndpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ibGFja01hc2sgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuY3NzKHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICByaWdodDogJzBweCcsXG4gICAgICAgICAgYm90dG9tOiAnMHB4JyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICAgekluZGV4OiAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZW1lbnQucHJlcGVuZCh0aGlzLl9ibGFja01hc2spO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGhcbiAgICAgICAqL1xuICAgICAgb25SZXNpemVkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnd2lkdGgnLCBvcHRpb25zLndpZHRoKTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNPcGVuZWQpIHtcbiAgICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgdmFyIG1lbnVTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWVudVBhZ2VTdHlsZShtYXgpO1xuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pLnF1ZXVlKG1lbnVTdHlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ibGFja01hc2spIHtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21haW5QYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX21haW5QYWdlID0gdGhpcy5fbWVudVBhZ2UgPSBudWxsO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBtZW51U3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUobWF4KTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKG1haW5QYWdlU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWVudVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIGNsb3NlTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3Moe2Rpc3BsYXk6ICdibG9jayd9KTtcblxuICAgICAgICB2YXIgbWVudVBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWVudVBhZ2VTdHlsZSgwKTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUoMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtYWluUGFnZVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWVudVBhZ2VTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3Moe2Rpc3BsYXk6ICdibG9jayd9KTtcblxuICAgICAgICB2YXIgbWVudVBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlTWVudVBhZ2VTdHlsZShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIHZhciBtYWluUGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNYWluUGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgZGVsZXRlIG1haW5QYWdlU3R5bGUub3BhY2l0eTtcblxuICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZShtZW51UGFnZVN0eWxlKVxuICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1haW5QYWdlU3R5bGUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLnF1ZXVlKG1haW5QYWdlU3R5bGUpXG4gICAgICAgICAgICAucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVNZW51UGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMuX2lzUmlnaHQgPyAtZGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgJ2JveC1zaGFkb3cnOiBkaXN0YW5jZSA9PT0gMCA/ICdub25lJyA6ICcwcHggMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiknXG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVNYWluUGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBvcGFjaXR5ID0gMSAtICgwLjEgKiBkaXN0YW5jZSAvIG1heCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yO1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wYWdlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcGFnZS5bL2VuXVxuICogICBbamFd44GT44Gu44Oa44O844K444KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctaW5maW5pdGUtc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVBhdGggb2YgdGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIGluZmluaXRlIHNjcm9sbGluZy4gVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gJHNjb3BlLiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgYSBkb25lIGNhbGxiYWNrIHRoYXQgbXVzdCBiZSBjYWxsZWQgd2hlbiBpdCdzIGZpbmlzaGVkLlsvZW5dXG4gKiAgIFtqYV1bL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbi1kZXZpY2UtYmFjay1idXR0b25cbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWRldmljZS1iYWNrLWJ1dHRvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aXRoIGFuIEFuZ3VsYXJKUyBleHByZXNzaW9uIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAgkFuZ3VsYXJKU+OBrmV4cHJlc3Npb27jgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUGFnZScsIFsnJG9uc2VuJywgJ1BhZ2VWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBQYWdlVmlldykge1xuXG4gICAgZnVuY3Rpb24gZmlyZVBhZ2VJbml0RXZlbnQoZWxlbWVudCkge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIGRpcnR5IGZpeFxuICAgICAgdmFyIGkgPSAwLCBmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpKysgPCAxNSkgIHtcbiAgICAgICAgICBpZiAoaXNBdHRhY2hlZChlbGVtZW50KSkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50LCAnaW5pdCcpO1xuICAgICAgICAgICAgZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQoZWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpID4gMTApIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZmlyZSBcInBhZ2Vpbml0XCIgZXZlbnQuIEF0dGFjaCBcIm9ucy1wYWdlXCIgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGYoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZlbnQuaW5pdEV2ZW50KCdwYWdlaW5pdCcsIHRydWUsIHRydWUpO1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0F0dGFjaGVkKGVsZW1lbnQpIHtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlID8gaXNBdHRhY2hlZChlbGVtZW50LnBhcmVudE5vZGUpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gbmV3IFBhZ2VWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwYWdlKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocGFnZSwgJ2luaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcGFnZScsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHBhZ2UsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcGFnZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHBhZ2UpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50WzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXBvcG92ZXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHBvcG92ZXIuWy9lbl1cbiAqICBbamFd44GT44Gu44Od44OD44OX44Kq44O844OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1BvcG92ZXInLCBbJyRvbnNlbicsICdQb3BvdmVyVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgUG9wb3ZlclZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwb3BvdmVyKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocG9wb3ZlciwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocG9wb3ZlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCBwb3BvdmVyKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwb3BvdmVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocG9wb3Zlcik7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ1BvcG92ZXJBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuUG9wb3ZlckFuaW1hdG9yKVxuICAudmFsdWUoJ0ZhZGVQb3BvdmVyQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkZhZGVQb3BvdmVyQW5pbWF0b3IpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcHVsbC1ob29rXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCkge1xuICogICAgICRzY29wZS5pdGVtcyA9IFszLCAyICwxXTtcbiAqXG4gKiAgICAgJHNjb3BlLmxvYWQgPSBmdW5jdGlvbigkZG9uZSkge1xuICogICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgICRzY29wZS5pdGVtcy51bnNoaWZ0KCRzY29wZS5pdGVtcy5sZW5ndGggKyAxKTtcbiAqICAgICAgICAgJGRvbmUoKTtcbiAqICAgICAgIH0sIDEwMDApO1xuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1wYWdlIG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1wdWxsLWhvb2sgdmFyPVwibG9hZGVyXCIgbmctYWN0aW9uPVwibG9hZCgkZG9uZSlcIj5cbiAqICAgICA8c3BhbiBuZy1zd2l0Y2g9XCJsb2FkZXIuc3RhdGVcIj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiaW5pdGlhbFwiPlB1bGwgZG93biB0byByZWZyZXNoPC9zcGFuPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJwcmVhY3Rpb25cIj5SZWxlYXNlIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cImFjdGlvblwiPkxvYWRpbmcgZGF0YS4gUGxlYXNlIHdhaXQuLi48L3NwYW4+XG4gKiAgICAgPC9zcGFuPlxuICogICA8L29ucy1wdWxsLWhvb2s+XG4gKiAgIDxvbnMtbGlzdD5cbiAqICAgICA8b25zLWxpc3QtaXRlbSBuZy1yZXBlYXQ9XCJpdGVtIGluIGl0ZW1zXCI+XG4gKiAgICAgICBJdGVtICN7eyBpdGVtIH19XG4gKiAgICAgPC9vbnMtbGlzdC1pdGVtPlxuICogICA8L29ucy1saXN0PlxuICogPC9vbnMtcGFnZT5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWFjdGlvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVXNlIHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIHBhZ2UgaXMgcHVsbGVkIGRvd24uIEEgPGNvZGU+JGRvbmU8L2NvZGU+IGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSB0byB0ZWxsIHRoZSBjb21wb25lbnQgdGhhdCB0aGUgYWN0aW9uIGlzIGNvbXBsZXRlZC5bL2VuXVxuICogICBbamFdcHVsbCBkb3du44GX44Gf44Go44GN44Gu5oyv44KL6Iie44GE44KS5oyH5a6a44GX44G+44GZ44CC44Ki44Kv44K344On44Oz44GM5a6M5LqG44GX44Gf5pmC44Gr44GvPGNvZGU+JGRvbmU8L2NvZGU+6Zai5pWw44KS5ZG844Gz5Ye644GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWNoYW5nZXN0YXRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJjaGFuZ2VzdGF0ZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiY2hhbmdlc3RhdGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIFB1bGwgaG9vayBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1B1bGxIb29rJywgWyckb25zZW4nLCAnUHVsbEhvb2tWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBQdWxsSG9va1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwdWxsSG9vayA9IG5ldyBQdWxsSG9va1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHB1bGxIb29rKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocHVsbEhvb2ssICdjaGFuZ2VzdGF0ZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCBwdWxsSG9vayk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHVsbEhvb2suX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcHVsbC1ob29rJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdQdXNoU2xpZGluZ01lbnVBbmltYXRvcicsIFsnU2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKFNsaWRpbmdNZW51QW5pbWF0b3IpIHtcblxuICAgIHZhciBQdXNoU2xpZGluZ01lbnVBbmltYXRvciA9IFNsaWRpbmdNZW51QW5pbWF0b3IuZXh0ZW5kKHtcblxuICAgICAgX2lzUmlnaHQ6IGZhbHNlLFxuICAgICAgX2VsZW1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgIF9tZW51UGFnZTogdW5kZWZpbmVkLFxuICAgICAgX21haW5QYWdlOiB1bmRlZmluZWQsXG4gICAgICBfd2lkdGg6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gbWFpblBhZ2U7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlID0gbWVudVBhZ2U7XG5cbiAgICAgICAgdGhpcy5faXNSaWdodCA9ICEhb3B0aW9ucy5pc1JpZ2h0O1xuICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgJzkwJSc7XG5cbiAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICctJyArIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICctJyArIG9wdGlvbnMud2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgb25SZXNpemVkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnd2lkdGgnLCBvcHRpb25zLndpZHRoKTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNPcGVuZWQpIHtcbiAgICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgdmFyIG1haW5QYWdlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgICB2YXIgbWVudVBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKG1heCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiBtYWluUGFnZVRyYW5zZm9ybX0pLnBsYXkoKTtcbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKS5xdWV1ZShtZW51UGFnZVN0eWxlKS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICovXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fbWFpblBhZ2UgPSB0aGlzLl9tZW51UGFnZSA9IG51bGw7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgb3Blbk1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBjbG9zZU1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybSgwKTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUoMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kaXN0YW5jZVxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4RGlzdGFuY2VcbiAgICAgICAqL1xuICAgICAgdHJhbnNsYXRlTWVudTogZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUoTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuXG4gICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKHt0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtfSlcbiAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlKVxuICAgICAgICAgIC5wbGF5KCk7XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm06IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsIDAsIDApJztcblxuICAgICAgICByZXR1cm4gYWJvdmVUcmFuc2Zvcm07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGU6IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciBiZWhpbmRYID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgYmVoaW5kVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBiZWhpbmRYICsgJ3B4LCAwLCAwKSc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGJlaGluZFRyYW5zZm9ybVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHVzaFNsaWRpbmdNZW51QW5pbWF0b3IoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBQdXNoU2xpZGluZ01lbnVBbmltYXRvcjtcbiAgfV0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnUmV2ZWFsU2xpZGluZ01lbnVBbmltYXRvcicsIFsnU2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKFNsaWRpbmdNZW51QW5pbWF0b3IpIHtcblxuICAgIHZhciBSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yID0gU2xpZGluZ01lbnVBbmltYXRvci5leHRlbmQoe1xuXG4gICAgICBfYmxhY2tNYXNrOiB1bmRlZmluZWQsXG5cbiAgICAgIF9pc1JpZ2h0OiBmYWxzZSxcblxuICAgICAgX21lbnVQYWdlOiB1bmRlZmluZWQsXG4gICAgICBfZWxlbWVudDogdW5kZWZpbmVkLFxuICAgICAgX21haW5QYWdlOiB1bmRlZmluZWQsXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGggXCJ3aWR0aFwiIHN0eWxlIHZhbHVlXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaXNSaWdodFxuICAgICAgICovXG4gICAgICBzZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgbWFpblBhZ2UsIG1lbnVQYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9tZW51UGFnZSA9IG1lbnVQYWdlO1xuICAgICAgICB0aGlzLl9tYWluUGFnZSA9IG1haW5QYWdlO1xuICAgICAgICB0aGlzLl9pc1JpZ2h0ID0gISFvcHRpb25zLmlzUmlnaHQ7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAnOTAlJztcblxuICAgICAgICBtYWluUGFnZS5jc3Moe1xuICAgICAgICAgIGJveFNoYWRvdzogJzBweCAwIDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICBvcGFjaXR5OiAwLjksXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1JpZ2h0KSB7XG4gICAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJzBweCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2JsYWNrTWFzayA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5jc3Moe1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgICAgICBib3R0b206ICcwcHgnLFxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGVtZW50LnByZXBlbmQodGhpcy5fYmxhY2tNYXNrKTtcblxuICAgICAgICAvLyBEaXJ0eSBmaXggZm9yIGJyb2tlbiByZW5kZXJpbmcgYnVnIG9uIGFuZHJvaWQgNC54LlxuICAgICAgICBvbnMuYW5pbWl0KG1haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknfSkucGxheSgpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzT3BlbmVkXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ3dpZHRoJywgdGhpcy5fd2lkdGgpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzT3BlbmVkKSB7XG4gICAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuXG4gICAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSkucXVldWUoe3RyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm19KS5wbGF5KCk7XG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSkucXVldWUoYmVoaW5kU3R5bGUpLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ibGFja01hc2spIHtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tYWluUGFnZSkge1xuICAgICAgICAgIHRoaXMuX21haW5QYWdlLmF0dHIoJ3N0eWxlJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21lbnVQYWdlKSB7XG4gICAgICAgICAgdGhpcy5fbWVudVBhZ2UuYXR0cignc3R5bGUnLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYWluUGFnZSA9IHRoaXMuX21lbnVQYWdlID0gdGhpcy5fZWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBvcGVuTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKG1heCk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKG1heCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIG9ucy5hbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBvbnMuYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUsIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgY2xvc2VNZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKDApO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZSgwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgZGVsZXRlIGJlaGluZFN0eWxlLm9wYWNpdHk7XG5cbiAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAucXVldWUoe3RyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm19KVxuICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgb25zLmFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAucXVldWUoYmVoaW5kU3R5bGUpXG4gICAgICAgICAgLnBsYXkoKTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLl9pc1JpZ2h0ID8gLWRpc3RhbmNlIDogZGlzdGFuY2U7XG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiBhYm92ZVRyYW5zZm9ybTtcbiAgICAgIH0sXG5cbiAgICAgIF9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZTogZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAgIHZhciBiZWhpbmREaXN0YW5jZSA9IChkaXN0YW5jZSAtIG1heCkgLyBtYXggKiAxMDtcbiAgICAgICAgYmVoaW5kRGlzdGFuY2UgPSBpc05hTihiZWhpbmREaXN0YW5jZSkgPyAwIDogTWF0aC5tYXgoTWF0aC5taW4oYmVoaW5kRGlzdGFuY2UsIDApLCAtMTApO1xuXG4gICAgICAgIHZhciBiZWhpbmRYID0gdGhpcy5faXNSaWdodCA/IC1iZWhpbmREaXN0YW5jZSA6IGJlaGluZERpc3RhbmNlO1xuICAgICAgICB2YXIgYmVoaW5kVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBiZWhpbmRYICsgJyUsIDAsIDApJztcbiAgICAgICAgdmFyIG9wYWNpdHkgPSAxICsgYmVoaW5kRGlzdGFuY2UgLyAxMDA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGJlaGluZFRyYW5zZm9ybSxcbiAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUmV2ZWFsU2xpZGluZ01lbnVBbmltYXRvcjtcbiAgfV0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2xpZGluZy1tZW51XG4gKiBAY2F0ZWdvcnkgbWVudVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db21wb25lbnQgZm9yIHNsaWRpbmcgVUkgd2hlcmUgb25lIHBhZ2UgaXMgb3ZlcmxheWVkIG92ZXIgYW5vdGhlciBwYWdlLiBUaGUgYWJvdmUgcGFnZSBjYW4gYmUgc2xpZGVkIGFzaWRlIHRvIHJldmVhbCB0aGUgcGFnZSBiZWhpbmQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOCkuihqOePvuOBmeOCi+OBn+OCgeOBruOCs+ODs+ODneODvOODjeODs+ODiOOBp+OAgeeJh+aWueOBruODmuODvOOCuOOBjOWIpeOBruODmuODvOOCuOOBruS4iuOBq+OCquODvOODkOODvOODrOOCpOOBp+ihqOekuuOBleOCjOOBvuOBmeOAgmFib3ZlLXBhZ2XjgafmjIflrprjgZXjgozjgZ/jg5rjg7zjgrjjga/jgIHmqKrjgYvjgonjgrnjg6njgqTjg4njgZfjgabooajnpLrjgZfjgb7jgZnjgIJbL2phXVxuICogQGNvZGVwZW4gSUR2RkpcbiAqIEBzZWVhbHNvIG9ucy1wYWdlXG4gKiAgIFtlbl1vbnMtcGFnZSBjb21wb25lbnRbL2VuXVxuICogICBbamFdb25zLXBhZ2XjgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFVzaW5nU2xpZGluZ01lbnVcbiAqICAgW2VuXVVzaW5nIHNsaWRpbmcgbWVudVsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgpLkvb/jgYZbL2phXVxuICogQGd1aWRlIEV2ZW50SGFuZGxpbmdcbiAqICAgW2VuXVVzaW5nIGV2ZW50c1svZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjga7liKnnlKhbL2phXVxuICogQGd1aWRlIENhbGxpbmdDb21wb25lbnRBUElzZnJvbUphdmFTY3JpcHRcbiAqICAgW2VuXVVzaW5nIG5hdmlnYXRvciBmcm9tIEphdmFTY3JpcHRbL2VuXVxuICogICBbamFdSmF2YVNjcmlwdOOBi+OCieOCs+ODs+ODneODvOODjeODs+ODiOOCkuWRvOOBs+WHuuOBmVsvamFdXG4gKiBAZ3VpZGUgRGVmaW5pbmdNdWx0aXBsZVBhZ2VzaW5TaW5nbGVIVE1MXG4gKiAgIFtlbl1EZWZpbmluZyBtdWx0aXBsZSBwYWdlcyBpbiBzaW5nbGUgaHRtbFsvZW5dXG4gKiAgIFtqYV3opIfmlbDjga7jg5rjg7zjgrjjgpIx44Gk44GuSFRNTOOBq+iomOi/sOOBmeOCi1svamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1zbGlkaW5nLW1lbnUgdmFyPVwiYXBwLm1lbnVcIiBtYWluLXBhZ2U9XCJwYWdlLmh0bWxcIiBtZW51LXBhZ2U9XCJtZW51Lmh0bWxcIiBtYXgtc2xpZGUtZGlzdGFuY2U9XCIyMDBweFwiIHR5cGU9XCJyZXZlYWxcIiBzaWRlPVwibGVmdFwiPlxuICogPC9vbnMtc2xpZGluZy1tZW51PlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgPG9ucy1idXR0b24gbmctY2xpY2s9XCJhcHAubWVudS50b2dnbGVNZW51KClcIj5Ub2dnbGU8L29ucy1idXR0b24+XG4gKiAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy10ZW1wbGF0ZT5cbiAqXG4gKiA8b25zLXRlbXBsYXRlIGlkPVwibWVudS5odG1sXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8IS0tIG1lbnUgcGFnZSdzIGNvbnRlbnRzIC0tPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKlxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZW9wZW5cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHNsaWRpbmcgbWVudSBpcyBvcGVuZWQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOBjOmWi+OBj+WJjeOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zbGlkaW5nTWVudVxuICogICBbZW5dU2xpZGluZyBtZW51IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TbGlkaW5nTWVudeOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcG9zdG9wZW5cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgc2xpZGluZyBtZW51IGlzIG9wZW5lZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaL44GN57WC44KP44Gj44Gf5b6M44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwcmVjbG9zZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGJlZm9yZSB0aGUgc2xpZGluZyBtZW51IGlzIGNsb3NlZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaJ44GY44KL5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0Y2xvc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgc2xpZGluZyBtZW51IGlzIGNsb3NlZC5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844GM6ZaJ44GY57WC44KP44Gj44Gf5b6M44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNsaWRpbmdNZW51XG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NsaWRpbmdNZW5144Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNsaWRpbmcgbWVudS5bL2VuXVxuICogIFtqYV3jgZPjga7jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtZW51LXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgbWVudSBwYWdlLlsvZW5dXG4gKiAgIFtqYV3lt6bjgavkvY3nva7jgZnjgovjg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBtYWluLXBhZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgbWFpbiBwYWdlLlsvZW5dXG4gKiAgIFtqYV3lj7PjgavkvY3nva7jgZnjgovjg6HjgqTjg7Pjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzd2lwZWFibGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0Jvb2xlYW59XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVdoZXRoZXIgdG8gZW5hYmxlIHN3aXBlIGludGVyYWN0aW9uLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fmk43kvZzjgpLmnInlirnjgavjgZnjgovloLTlkIjjgavmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzd2lwZS10YXJnZXQtd2lkdGhcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHdpZHRoIG9mIHN3aXBlYWJsZSBhcmVhIGNhbGN1bGF0ZWQgZnJvbSB0aGUgbGVmdCAoaW4gcGl4ZWxzKS4gVXNlIHRoaXMgdG8gZW5hYmxlIHN3aXBlIG9ubHkgd2hlbiB0aGUgZmluZ2VyIHRvdWNoIG9uIHRoZSBzY3JlZW4gZWRnZS5bL2VuXVxuICogICBbamFd44K544Ov44Kk44OX44Gu5Yik5a6a6aCY5Z+f44KS44OU44Kv44K744Or5Y2Y5L2N44Gn5oyH5a6a44GX44G+44GZ44CC55S76Z2i44Gu56uv44GL44KJ5oyH5a6a44GX44Gf6Led6Zui44Gr6YGU44GZ44KL44Go44Oa44O844K444GM6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWF4LXNsaWRlLWRpc3RhbmNlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUhvdyBmYXIgdGhlIG1lbnUgcGFnZSB3aWxsIHNsaWRlIG9wZW4uIENhbiBzcGVjaWZ5IGJvdGggaW4gcHggYW5kICUuIGVnLiA5MCUsIDIwMHB4Wy9lbl1cbiAqICAgW2phXW1lbnUtcGFnZeOBp+aMh+WumuOBleOCjOOBn+ODmuODvOOCuOOBruihqOekuuW5heOCkuaMh+WumuOBl+OBvuOBmeOAguODlOOCr+OCu+ODq+OCguOBl+OBj+OBryXjga7kuKHmlrnjgafmjIflrprjgafjgY3jgb7jgZnvvIjkvos6IDkwJSwgMjAwcHjvvIlbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBzaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNwZWNpZnkgd2hpY2ggc2lkZSBvZiB0aGUgc2NyZWVuIHRoZSBtZW51IHBhZ2UgaXMgbG9jYXRlZCBvbi4gUG9zc2libGUgdmFsdWVzIGFyZSBcImxlZnRcIiBhbmQgXCJyaWdodFwiLlsvZW5dXG4gKiAgIFtqYV1tZW51LXBhZ2XjgafmjIflrprjgZXjgozjgZ/jg5rjg7zjgrjjgYznlLvpnaLjga7jganjgaHjgonlgbTjgYvjgonooajnpLrjgZXjgozjgovjgYvjgpLmjIflrprjgZfjgb7jgZnjgIJsZWZ044KC44GX44GP44GvcmlnaHTjga7jgYTjgZrjgozjgYvjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB0eXBlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNsaWRpbmcgbWVudSBhbmltYXRvci4gUG9zc2libGUgdmFsdWVzIGFyZSByZXZlYWwgKGRlZmF1bHQpLCBwdXNoIGFuZCBvdmVybGF5LlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgafjgZnjgIJcInJldmVhbFwi77yI44OH44OV44Kp44Or44OI77yJ44CBXCJwdXNoXCLjgIFcIm92ZXJsYXlcIuOBruOBhOOBmuOCjOOBi+OCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVvcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RvcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0b3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdG9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRNYWluUGFnZVxuICogQHNpZ25hdHVyZSBzZXRNYWluUGFnZShwYWdlVXJsLCBbb3B0aW9uc10pXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8Y29kZT4mbHQ7b25zLXRlbXBsYXRlJmd0OzwvY29kZT4uWy9lbl1cbiAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIFvbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbG9zZU1lbnVdXG4gKiAgIFtlbl1JZiB0cnVlIHRoZSBtZW51IHdpbGwgYmUgY2xvc2VkLlsvZW5dXG4gKiAgIFtqYV10cnVl44KS5oyH5a6a44GZ44KL44Go44CB6ZaL44GE44Gm44GE44KL44Oh44OL44Ol44O844KS6ZaJ44GY44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dRnVuY3Rpb24gdGhhdCBpcyBleGVjdXRlZCBhZnRlciB0aGUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXeODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIG1haW4gY29udGVudHMgcGFuZS5bL2VuXVxuICogICBbamFd5Lit5aSu6YOo5YiG44Gr6KGo56S644GV44KM44KL44Oa44O844K444KScGFnZVVybOOBq+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHNldE1lbnVQYWdlXG4gKiBAc2lnbmF0dXJlIHNldE1lbnVQYWdlKHBhZ2VVcmwsIFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlVXJsXG4gKiAgIFtlbl1QYWdlIFVSTC4gQ2FuIGJlIGVpdGhlciBhbiBIVE1MIGRvY3VtZW50IG9yIGFuIDxjb2RlPiZsdDtvbnMtdGVtcGxhdGUmZ3Q7PC9jb2RlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNsb3NlTWVudV1cbiAqICAgW2VuXUlmIHRydWUgdGhlIG1lbnUgd2lsbCBiZSBjbG9zZWQgYWZ0ZXIgdGhlIG1lbnUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXXRydWXjgpLmjIflrprjgZnjgovjgajjgIHplovjgYTjgabjgYTjgovjg6Hjg4vjg6Xjg7zjgpLplonjgZjjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgdGhlIG1lbnUgcGFnZSBoYXMgYmVlbiBzZXQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOODmuODvOOCuOOBjOiqreOBv+i+vOOBvuOCjOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIHNpZGUgbWVudSBwYW5lLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zpg6jliIbjgavooajnpLrjgZXjgozjgovjg5rjg7zjgrjjgpJwYWdlVXJs44Gr5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb3Blbk1lbnVcbiAqIEBzaWduYXR1cmUgb3Blbk1lbnUoW29wdGlvbnNdKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgbWVudSBoYXMgYmVlbiBvcGVuZWQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOOBjOmWi+OBhOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNsaWRlIHRoZSBhYm92ZSBsYXllciB0byByZXZlYWwgdGhlIGxheWVyIGJlaGluZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444KS6KGo56S644GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgY2xvc2VNZW51XG4gKiBAc2lnbmF0dXJlIGNsb3NlTWVudShbb3B0aW9uc10pXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSBtZW51IGhhcyBiZWVuIGNsb3NlZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaJ44GY44KJ44KM44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGUgdGhlIGFib3ZlIGxheWVyIHRvIGhpZGUgdGhlIGxheWVyIGJlaGluZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444KS6Z2e6KGo56S644Gr44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgdG9nZ2xlTWVudVxuICogQHNpZ25hdHVyZSB0b2dnbGVNZW51KFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXVRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIG1lbnUgaGFzIGJlZW4gb3BlbmVkIG9yIGNsb3NlZC5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaL44GN57WC44KP44Gj44Gf5b6M44GL44CB6ZaJ44GY57WC44KP44Gj44Gf5b6M44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2xpZGUgdGhlIGFib3ZlIGxheWVyIHRvIHJldmVhbCB0aGUgbGF5ZXIgYmVoaW5kIGlmIGl0IGlzIGN1cnJlbnRseSBoaWRkZW4sIG90aGVyd2lzZSwgaGlkZSB0aGUgbGF5ZXIgYmVoaW5kLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nirbms4HjgavlkIjjgo/jgZvjgabjgIHjg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgpLooajnpLrjgoLjgZfjgY/jga/pnZ7ooajnpLrjgavjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBpc01lbnVPcGVuZWRcbiAqIEBzaWduYXR1cmUgaXNNZW51T3BlbmVkKClcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiAgIFtlbl10cnVlIGlmIHRoZSBtZW51IGlzIGN1cnJlbnRseSBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjgYzplovjgYTjgabjgYTjgozjgbB0cnVl44Go44Gq44KK44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUmV0dXJucyB0cnVlIGlmIHRoZSBtZW51IHBhZ2UgaXMgb3Blbiwgb3RoZXJ3aXNlIGZhbHNlLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgYzplovjgYTjgabjgYTjgovloLTlkIjjga90cnVl44CB44Gd44GG44Gn44Gq44GE5aC05ZCI44GvZmFsc2XjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlclxuICogQHNpZ25hdHVyZSBnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcigpXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiAgIFtlbl1EZXZpY2UgYmFjayBidXR0b24gaGFuZGxlci5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44OP44Oz44OJ44Op44KS6L+U44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUmV0cmlldmUgdGhlIGJhY2stYnV0dG9uIGhhbmRsZXIuWy9lbl1cbiAqICAgW2phXW9ucy1zbGlkaW5nLW1lbnXjgavntJDku5jjgYTjgabjgYTjgovjg5Djg4Pjgq/jg5zjgr/jg7Pjg4/jg7Pjg4njg6njgpLlj5blvpfjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRTd2lwZWFibGVcbiAqIEBzaWduYXR1cmUgc2V0U3dpcGVhYmxlKHN3aXBlYWJsZSlcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3dpcGVhYmxlXG4gKiAgIFtlbl1JZiB0cnVlIHRoZSBtZW51IHdpbGwgYmUgc3dpcGVhYmxlLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6/jgqTjg5fjgafplovplonjgafjgY3jgovjgojjgYbjgavjgZnjgovloLTlkIjjgavjga90cnVl44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU3BlY2lmeSBpZiB0aGUgbWVudSBzaG91bGQgYmUgc3dpcGVhYmxlIG9yIG5vdC5bL2VuXVxuICogICBbamFd44K544Ov44Kk44OX44Gn6ZaL6ZaJ44GZ44KL44GL44Gp44GG44GL44KS6Kit5a6a44GZ44KL44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NsaWRpbmdNZW51JywgWyckY29tcGlsZScsICdTbGlkaW5nTWVudVZpZXcnLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNsaWRpbmdNZW51VmlldywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgb25zLl91dGlsLndhcm4oJ1xcJ29ucy1zbGlkaW5nLW1lbnVcXCcgY29tcG9uZW50IGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCByZWxlYXNlLiBQbGVhc2UgdXNlIFxcJ29ucy1zcGxpdHRlclxcJyBpbnN0ZWFkLicpO1xuXG4gICAgICAgIHZhciBtYWluID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubWFpbicpLFxuICAgICAgICAgICAgbWVudSA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcblxuICAgICAgICBpZiAobWFpbikge1xuICAgICAgICAgIHZhciBtYWluSHRtbCA9IGFuZ3VsYXIuZWxlbWVudChtYWluKS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lbnUpIHtcbiAgICAgICAgICB2YXIgbWVudUh0bWwgPSBhbmd1bGFyLmVsZW1lbnQobWVudSkucmVtb3ZlKCkuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNsaWRpbmctbWVudV9fbWVudScpKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNsaWRpbmctbWVudV9fbWFpbicpKTtcblxuICAgICAgICAgIHZhciBzbGlkaW5nTWVudSA9IG5ldyBTbGlkaW5nTWVudVZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc2xpZGluZ01lbnUsICdwcmVvcGVuIHByZWNsb3NlIHBvc3RvcGVuIHBvc3RjbG9zZSBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICBpZiAobWFpbkh0bWwgJiYgIWF0dHJzLm1haW5QYWdlKSB7XG4gICAgICAgICAgICBzbGlkaW5nTWVudS5fYXBwZW5kTWFpblBhZ2UobnVsbCwgbWFpbkh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtZW51SHRtbCAmJiAhYXR0cnMubWVudVBhZ2UpIHtcbiAgICAgICAgICAgIHNsaWRpbmdNZW51Ll9hcHBlbmRNZW51UGFnZShtZW51SHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNsaWRpbmdNZW51KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zbGlkaW5nLW1lbnUnLCBzbGlkaW5nTWVudSk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNsaWRpbmdNZW51Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zbGlkaW5nLW1lbnUnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdTbGlkaW5nTWVudUFuaW1hdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGRlbGF5OiAwLFxuICAgICAgZHVyYXRpb246IDAuNCxcbiAgICAgIHRpbWluZzogJ2N1YmljLWJlemllciguMSwgLjcsIC4xLCAxKScsXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnRpbWluZ1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRlbGF5XG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy50aW1pbmcgPSBvcHRpb25zLnRpbWluZyB8fCB0aGlzLnRpbWluZztcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZHVyYXRpb24gOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB0aGlzLmRlbGF5ID0gb3B0aW9ucy5kZWxheSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5kZWxheSA6IHRoaXMuZGVsYXk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoIFwid2lkdGhcIiBzdHlsZSB2YWx1ZVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc09wZW5lZFxuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGhcbiAgICAgICAqL1xuICAgICAgb25SZXNpemVkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICBjbG9zZUNsb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGlzdGFuY2VcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heERpc3RhbmNlXG4gICAgICAgKi9cbiAgICAgIHRyYW5zbGF0ZU1lbnU6IGZ1bmN0aW9uKG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcmV0dXJuIHtTbGlkaW5nTWVudUFuaW1hdG9yfVxuICAgICAgICovXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdmVycmlkZSBjb3B5IG1ldGhvZC4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BlZWQtZGlhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGUgc3BlZWQgZGlhbC5bL2VuXVxuICogICBbamFd44GT44Gu44K544OU44O844OJ44OA44Kk44Ki44Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS44GX44Gm44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1jbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTcGVlZERpYWwnLCBbJyRvbnNlbicsICdTcGVlZERpYWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBTcGVlZERpYWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgc3BlZWREaWFsID0gbmV3IFNwZWVkRGlhbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwZWVkLWRpYWwnLCBzcGVlZERpYWwpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGVlZERpYWwsICdvcGVuIGNsb3NlJyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwZWVkRGlhbCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGVlZERpYWwuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwZWVkLWRpYWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdC12aWV3XG4gKiBAY2F0ZWdvcnkgY29udHJvbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXURpdmlkZXMgdGhlIHNjcmVlbiBpbnRvIGEgbGVmdCBhbmQgcmlnaHQgc2VjdGlvbi5bL2VuXVxuICogIFtqYV3nlLvpnaLjgpLlt6blj7PjgavliIblibLjgZnjgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgafjgZnjgIJbL2phXVxuICogQGNvZGVwZW4gbktxZnYge3dpZGV9XG4gKiBAZ3VpZGUgVXNpbmdvbnNzcGxpdHZpZXdjb21wb25lbnRcbiAqICAgW2VuXVVzaW5nIG9ucy1zcGxpdC12aWV3LlsvZW5dXG4gKiAgIFtqYV1vbnMtc3BsaXQtdmlld+OCs+ODs+ODneODvOODjeODs+ODiOOCkuS9v+OBhlsvamFdXG4gKiBAZ3VpZGUgQ2FsbGluZ0NvbXBvbmVudEFQSXNmcm9tSmF2YVNjcmlwdFxuICogICBbZW5dVXNpbmcgbmF2aWdhdG9yIGZyb20gSmF2YVNjcmlwdFsvZW5dXG4gKiAgIFtqYV1KYXZhU2NyaXB044GL44KJ44Kz44Oz44Od44O844ON44Oz44OI44KS5ZG844Gz5Ye644GZWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLXNwbGl0LXZpZXdcbiAqICAgc2Vjb25kYXJ5LXBhZ2U9XCJzZWNvbmRhcnkuaHRtbFwiXG4gKiAgIG1haW4tcGFnZT1cIm1haW4uaHRtbFwiXG4gKiAgIG1haW4tcGFnZS13aWR0aD1cIjcwJVwiXG4gKiAgIGNvbGxhcHNlPVwicG9ydHJhaXRcIj5cbiAqIDwvb25zLXNwbGl0LXZpZXc+XG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgdXBkYXRlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIHdoZW4gdGhlIHNwbGl0IHZpZXcgaXMgdXBkYXRlZC5bL2VuXVxuICogICBbamFdc3BsaXQgdmlld+OBrueKtuaFi+OBjOabtOaWsOOBleOCjOOBn+mam+OBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtCb29sZWFufSBldmVudC5zaG91bGRDb2xsYXBzZVxuICogICBbZW5dVHJ1ZSBpZiB0aGUgdmlldyBzaG91bGQgY29sbGFwc2UuWy9lbl1cbiAqICAgW2phXWNvbGxhcHNl54q25oWL44Gu5aC05ZCI44GrdHJ1ZeOBq+OBquOCiuOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQuY3VycmVudE1vZGVcbiAqICAgW2VuXUN1cnJlbnQgbW9kZS5bL2VuXVxuICogICBbamFd54++5Zyo44Gu44Oi44O844OJ5ZCN44KS6L+U44GX44G+44GZ44CCXCJjb2xsYXBzZVwi44GLXCJzcGxpdFwi44GL44Gu44GE44Ga44KM44GL44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV2ZW50LnNwbGl0XG4gKiAgIFtlbl1DYWxsIHRvIGZvcmNlIHNwbGl0LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7plqLmlbDjgpLlkbzjgbPlh7rjgZnjgajlvLfliLbnmoTjgatzcGxpdOODouODvOODieOBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBldmVudC5jb2xsYXBzZVxuICogICBbZW5dQ2FsbCB0byBmb3JjZSBjb2xsYXBzZS5bL2VuXVxuICogICBbamFd44GT44Gu6Zai5pWw44KS5ZG844Gz5Ye644GZ44Go5by35Yi255qE44GrY29sbGFwc2Xjg6Ljg7zjg4njgavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXfjga7luYXjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgYvjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCIFsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcHJlc3BsaXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHZpZXcgaXMgc3BsaXQuWy9lbl1cbiAqICAgW2phXXNwbGl054q25oWL44Gr44KL5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNwbGl0Vmlld1xuICogICBbZW5dU3BsaXQgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NwbGl0Vmlld+OCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge051bWJlcn0gZXZlbnQud2lkdGhcbiAqICAgW2VuXUN1cnJlbnQgd2lkdGguWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrlNwbGl0Vmlld27jga7luYXjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0c3BsaXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgdmlldyBpcyBzcGxpdC5bL2VuXVxuICogICBbamFdc3BsaXTnirbmhYvjgavjgarjgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZWNvbGxhcHNlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYmVmb3JlIHRoZSB2aWV3IGlzIGNvbGxhcHNlZC5bL2VuXVxuICogICBbamFdY29sbGFwc2XnirbmhYvjgavjgarjgovliY3jgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3Rjb2xsYXBzZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSB2aWV3IGlzIGNvbGxhcHNlZC5bL2VuXVxuICogICBbamFdY29sbGFwc2XnirbmhYvjgavjgarjgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNwbGl0IHZpZXcuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODl+ODquODg+ODiOODk+ODpeODvOOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1haW4tcGFnZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIG9uIHRoZSByaWdodC5bL2VuXVxuICogICBbamFd5Y+z5YG044Gr6KGo56S644GZ44KL44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWFpbi1wYWdlLXdpZHRoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU1haW4gcGFnZSB3aWR0aCBwZXJjZW50YWdlLiBUaGUgc2Vjb25kYXJ5IHBhZ2Ugd2lkdGggd2lsbCBiZSB0aGUgcmVtYWluaW5nIHBlcmNlbnRhZ2UuWy9lbl1cbiAqICAgW2phXeWPs+WBtOOBruODmuODvOOCuOOBruW5heOCkuODkeODvOOCu+ODs+ODiOWNmOS9jeOBp+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHNlY29uZGFyeS1wYWdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2Ugb24gdGhlIGxlZnQuWy9lbl1cbiAqICAgW2phXeW3puWBtOOBq+ihqOekuuOBmeOCi+ODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIGNvbGxhcHNlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIFNwZWNpZnkgdGhlIGNvbGxhcHNlIGJlaGF2aW9yLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0LCBsYW5kc2NhcGUsIHdpZHRoICNweCBvciBhIG1lZGlhIHF1ZXJ5LlxuICogICAgIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiIG1lYW5zIHRoZSB2aWV3IHdpbGwgY29sbGFwc2Ugd2hlbiBkZXZpY2UgaXMgaW4gbGFuZHNjYXBlIG9yIHBvcnRyYWl0IG9yaWVudGF0aW9uLlxuICogICAgIFwid2lkdGggI3B4XCIgbWVhbnMgdGhlIHZpZXcgd2lsbCBjb2xsYXBzZSB3aGVuIHRoZSB3aW5kb3cgd2lkdGggaXMgc21hbGxlciB0aGFuIHRoZSBzcGVjaWZpZWQgI3B4LlxuICogICAgIElmIHRoZSB2YWx1ZSBpcyBhIG1lZGlhIHF1ZXJ5LCB0aGUgdmlldyB3aWxsIGNvbGxhcHNlIHdoZW4gdGhlIG1lZGlhIHF1ZXJ5IGlzIHRydWUuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDlt6blgbTjga7jg5rjg7zjgrjjgpLpnZ7ooajnpLrjgavjgZnjgovmnaHku7bjgpLmjIflrprjgZfjgb7jgZnjgIJwb3J0cmFpdCwgbGFuZHNjYXBl44CBd2lkdGggI3B444KC44GX44GP44Gv44Oh44OH44Kj44Ki44Kv44Ko44Oq44Gu5oyH5a6a44GM5Y+v6IO944Gn44GZ44CCXG4gKiAgICAgcG9ydHJhaXTjgoLjgZfjgY/jga9sYW5kc2NhcGXjgpLmjIflrprjgZnjgovjgajjgIHjg4fjg5DjgqTjgrnjga7nlLvpnaLjgYznuKblkJHjgY3jgoLjgZfjgY/jga/mqKrlkJHjgY3jgavjgarjgaPjgZ/mmYLjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgICB3aWR0aCAjcHjjgpLmjIflrprjgZnjgovjgajjgIHnlLvpnaLjgYzmjIflrprjgZfjgZ/mqKrluYXjgojjgorjgoLnn63jgYTloLTlkIjjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgICDjg6Hjg4fjgqPjgqLjgq/jgqjjg6rjgpLmjIflrprjgZnjgovjgajjgIHmjIflrprjgZfjgZ/jgq/jgqjjg6rjgavpganlkIjjgZfjgabjgYTjgovloLTlkIjjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXVwZGF0ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwidXBkYXRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJ1cGRhdGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzcGxpdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc3BsaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNwbGl0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY29sbGFwc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNvbGxhcHNlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjb2xsYXBzZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzcGxpdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNwbGl0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c3BsaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y29sbGFwc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3Rjb2xsYXBzZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNvbGxhcHNlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRNYWluUGFnZVxuICogQHNpZ25hdHVyZSBzZXRNYWluUGFnZShwYWdlVXJsKVxuICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VVcmxcbiAqICAgW2VuXVBhZ2UgVVJMLiBDYW4gYmUgZWl0aGVyIGFuIEhUTUwgZG9jdW1lbnQgb3IgYW4gPG9ucy10ZW1wbGF0ZT4uWy9lbl1cbiAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIFvbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIHJpZ2h0IHNlY3Rpb25bL2VuXVxuICogICBbamFd5oyH5a6a44GX44GfVVJM44KS44Oh44Kk44Oz44Oa44O844K444KS6Kqt44G/6L6844G/44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0U2Vjb25kYXJ5UGFnZVxuICogQHNpZ25hdHVyZSBzZXRTZWNvbmRhcnlQYWdlKHBhZ2VVcmwpXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8b25zLXRlbXBsYXRlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgbGVmdCBzZWN0aW9uWy9lbl1cbiAqICAgW2phXeaMh+WumuOBl+OBn1VSTOOCkuW3puOBruODmuODvOOCuOOBruiqreOBv+i+vOOBv+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHVwZGF0ZVxuICogQHNpZ25hdHVyZSB1cGRhdGUoKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UcmlnZ2VyIGFuICd1cGRhdGUnIGV2ZW50IGFuZCB0cnkgdG8gZGV0ZXJtaW5lIGlmIHRoZSBzcGxpdCBiZWhhdmlvciBzaG91bGQgYmUgY2hhbmdlZC5bL2VuXVxuICogICBbamFdc3BsaXTjg6Ljg7zjg4njgpLlpInjgYjjgovjgbnjgY3jgYvjganjgYbjgYvjgpLliKTmlq3jgZnjgovjgZ/jgoHjga4ndXBkYXRlJ+OCpOODmeODs+ODiOOCkueZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTcGxpdFZpZXcnLCBbJyRjb21waWxlJywgJ1NwbGl0VmlldycsICckb25zZW4nLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXRWaWV3LCAkb25zZW4pIHtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICBvbnMuX3V0aWwud2FybignXFwnb25zLXNwbGl0LXZpZXdcXCcgY29tcG9uZW50IGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCByZWxlYXNlLiBQbGVhc2UgdXNlIFxcJ29ucy1zcGxpdHRlclxcJyBpbnN0ZWFkLicpO1xuXG4gICAgICAgIHZhciBtYWluUGFnZSA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1haW4tcGFnZScpLFxuICAgICAgICAgICAgc2Vjb25kYXJ5UGFnZSA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnNlY29uZGFyeS1wYWdlJyk7XG5cbiAgICAgICAgaWYgKG1haW5QYWdlKSB7XG4gICAgICAgICAgdmFyIG1haW5IdG1sID0gYW5ndWxhci5lbGVtZW50KG1haW5QYWdlKS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZGFyeVBhZ2UpIHtcbiAgICAgICAgICB2YXIgc2Vjb25kYXJ5SHRtbCA9IGFuZ3VsYXIuZWxlbWVudChzZWNvbmRhcnlQYWdlKS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc3BsaXQtdmlld19fc2Vjb25kYXJ5IGZ1bGwtc2NyZWVuJykpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGFuZ3VsYXIuZWxlbWVudCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnb25zZW4tc3BsaXQtdmlld19fbWFpbiBmdWxsLXNjcmVlbicpKTtcblxuICAgICAgICAgIHZhciBzcGxpdFZpZXcgPSBuZXcgU3BsaXRWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBpZiAobWFpbkh0bWwgJiYgIWF0dHJzLm1haW5QYWdlKSB7XG4gICAgICAgICAgICBzcGxpdFZpZXcuX2FwcGVuZE1haW5QYWdlKG1haW5IdG1sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2Vjb25kYXJ5SHRtbCAmJiAhYXR0cnMuc2Vjb25kYXJ5UGFnZSkge1xuICAgICAgICAgICAgc3BsaXRWaWV3Ll9hcHBlbmRTZWNvbmRQYWdlKHNlY29uZGFyeUh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGxpdFZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BsaXRWaWV3LCAndXBkYXRlIHByZXNwbGl0IHByZWNvbGxhcHNlIHBvc3RzcGxpdCBwb3N0Y29sbGFwc2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXQtdmlldycsIHNwbGl0Vmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGxpdFZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0LXZpZXcnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJDb250ZW50JywgWyckb25zZW4nLCAnJGNvbXBpbGUnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlKSB7XG5cbiAgICB2YXIgU3BsaXR0ZXJDb250ZW50ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMubG9hZCA9IHRoaXMuX2VsZW1lbnRbMF0ubG9hZC5iaW5kKHRoaXMuX2VsZW1lbnRbMF0pO1xuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5sb2FkID0gdGhpcy5fcGFnZVNjb3BlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXJDb250ZW50KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyQ29udGVudCwgWydwYWdlJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyQ29udGVudDtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlclNpZGUnLCBbJyRvbnNlbicsICckY29tcGlsZScsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUpIHtcblxuICAgIHZhciBTcGxpdHRlclNpZGUgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ29wZW4nLCAnY2xvc2UnLCAndG9nZ2xlJywgJ2xvYWQnXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnbW9kZWNoYW5nZScsICdwcmVvcGVuJywgJ3ByZWNsb3NlJywgJ3Bvc3RvcGVuJywgJ3Bvc3RjbG9zZSdcbiAgICAgICAgXSwgZGV0YWlsID0+IGRldGFpbC5zaWRlID8gYW5ndWxhci5leHRlbmQoZGV0YWlsLCB7c2lkZTogdGhpc30pIDogZGV0YWlsKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXJTaWRlKTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyU2lkZSwgWydwYWdlJywgJ21vZGUnLCAnaXNPcGVuJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyU2lkZTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXQgdmlldy5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44OI44OT44Ol44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlcicsIFsnJGNvbXBpbGUnLCAnU3BsaXR0ZXInLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBTcGxpdHRlcihzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwbGl0dGVyKTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwbGl0dGVyLCAnZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCBzcGxpdHRlcik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGxpdHRlci5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zd2l0Y2hcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzd2l0Y2guWy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTd2l0Y2gnLCBbJyRvbnNlbicsICdTd2l0Y2hWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBTd2l0Y2hWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBpZiAoYXR0cnMubmdDb250cm9sbGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGVsZW1lbnQgY2FuXFwndCBhY2NlcHQgbmctY29udHJvbGxlciBkaXJlY3RpdmUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3dpdGNoVmlldyA9IG5ldyBTd2l0Y2hWaWV3KGVsZW1lbnQsIHNjb3BlLCBhdHRycyk7XG4gICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhzd2l0Y2hWaWV3LCBlbGVtZW50KTtcblxuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3dpdGNoVmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXN3aXRjaCcsIHN3aXRjaFZpZXcpO1xuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3dpdGNoVmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoc3dpdGNoVmlldyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBhdHRycyA9IHNjb3BlID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJOb25lQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhck5vbmVBbmltYXRvcik7XG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyRmFkZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJGYWRlQW5pbWF0b3IpO1xuICBtb2R1bGUudmFsdWUoJ1RhYmJhclNsaWRlQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhclNsaWRlQW5pbWF0b3IpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdUYWJiYXJWaWV3JywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICB2YXIgVGFiYmFyVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnb25zLXRhYmJhcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiZWxlbWVudFwiIHBhcmFtZXRlciBtdXN0IGJlIGEgXCJvbnMtdGFiYmFyXCIgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZVNjb3BlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3JlYWN0aXZlJywgJ3Bvc3RjaGFuZ2UnLCAncHJlY2hhbmdlJywgJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVUYWInLFxuICAgICAgICAgICdzZXRUYWJiYXJWaXNpYmlsaXR5JyxcbiAgICAgICAgICAnZ2V0QWN0aXZlVGFiSW5kZXgnLFxuICAgICAgICAgICdsb2FkUGFnZSdcbiAgICAgICAgXSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgTWljcm9FdmVudC5taXhpbihUYWJiYXJWaWV3KTtcblxuICAgIFRhYmJhclZpZXcucmVnaXN0ZXJBbmltYXRvciA9IGZ1bmN0aW9uKG5hbWUsIEFuaW1hdG9yKSB7XG4gICAgICByZXR1cm4gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJlZ2lzdGVyQW5pbWF0b3IobmFtZSwgQW5pbWF0b3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gVGFiYmFyVmlldztcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0JhY2tCdXR0b24nLCBbJyRvbnNlbicsICckY29tcGlsZScsICdHZW5lcmljVmlldycsICdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSwgR2VuZXJpY1ZpZXcsIENvbXBvbmVudENsZWFuZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBiYWNrQnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYmFjay1idXR0b24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBiYWNrQnV0dG9uLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYmFja0J1dHRvbik7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUoc2NvcGUpO1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKGF0dHJzKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0JvdHRvbVRvb2xiYXInLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYm90dG9tVG9vbGJhcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtYnV0dG9uXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0J1dHRvbicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBidXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICB2aWV3S2V5OiAnb25zLWJ1dHRvbidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGJ1dHRvbiwgJ2Rpc2FibGVkJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF0uZGlzYWJsZWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX2VsZW1lbnRbMF0uZGlzYWJsZWQgPSB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRHVtbXlGb3JJbml0JywgWyckcm9vdFNjb3BlJywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgIHZhciBpc1JlYWR5ID0gZmFsc2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKCFpc1JlYWR5KSB7XG4gICAgICAgICAgICBpc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJG9ucy1yZWFkeScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEVWRU5UUyA9XG4gICAgKCdkcmFnIGRyYWdsZWZ0IGRyYWdyaWdodCBkcmFndXAgZHJhZ2Rvd24gaG9sZCByZWxlYXNlIHN3aXBlIHN3aXBlbGVmdCBzd2lwZXJpZ2h0ICcgK1xuICAgICAgJ3N3aXBldXAgc3dpcGVkb3duIHRhcCBkb3VibGV0YXAgdG91Y2ggdHJhbnNmb3JtIHBpbmNoIHBpbmNoaW4gcGluY2hvdXQgcm90YXRlJykuc3BsaXQoLyArLyk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNHZXN0dXJlRGV0ZWN0b3InLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIHNjb3BlRGVmID0gRVZFTlRTLnJlZHVjZShmdW5jdGlvbihkaWN0LCBuYW1lKSB7XG4gICAgICBkaWN0WyduZycgKyB0aXRsaXplKG5hbWUpXSA9ICcmJztcbiAgICAgIHJldHVybiBkaWN0O1xuICAgIH0sIHt9KTtcblxuICAgIGZ1bmN0aW9uIHRpdGxpemUoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHNjb3BlRGVmLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgXywgdHJhbnNjbHVkZSkge1xuXG4gICAgICAgICAgdHJhbnNjbHVkZShzY29wZS4kcGFyZW50LCBmdW5jdGlvbihjbG9uZWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgYXR0ciA9ICduZycgKyB0aXRsaXplKGV2ZW50LnR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoYXR0ciBpbiBzY29wZURlZikge1xuICAgICAgICAgICAgICBzY29wZVthdHRyXSh7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZ2VzdHVyZURldGVjdG9yO1xuXG4gICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yID0gZWxlbWVudFswXS5fZ2VzdHVyZURldGVjdG9yO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLm9uKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vZmYoRVZFTlRTLmpvaW4oJyAnKSwgaGFuZGxlcik7XG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3IuZWxlbWVudCA9IHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWljb25cbiAqL1xuXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSWNvbicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5pY29uLmluZGV4T2YoJ3t7JykgIT09IC0xKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2ljb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gZWxlbWVudFswXS5fdXBkYXRlKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChzY29wZSwgZWxlbWVudCwgYXR0cnMpID0+IHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtaWNvbidcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG5cbiAgICAgIH1cblxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gc2NyZWVuIG9yaWVudGF0aW9uLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0IGFuZCBsYW5kc2NhcGUuIERpZmZlcmVudCBmcm9tIG90aGVyIGNvbXBvbmVudHMsIHRoaXMgY29tcG9uZW50IGlzIHVzZWQgYXMgYXR0cmlidXRlIGluIGFueSBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV3nlLvpnaLjga7lkJHjgY3jgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLooYzjgYTjgb7jgZnjgIJwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAguOBmeOBueOBpuOBruimgee0oOOBruWxnuaAp+OBq+S9v+eUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtcGxhdGZvcm0gW2VuXW9ucy1pZi1wbGF0Zm9ybSBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtcGxhdGZvcm3jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLW9yaWVudGF0aW9uPVwicG9ydHJhaXRcIj5cbiAqICAgPHA+VGhpcyB3aWxsIG9ubHkgYmUgdmlzaWJsZSBpbiBwb3J0cmFpdCBtb2RlLjwvcD5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRWl0aGVyIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiLlsvZW5dXG4gKiAgIFtqYV1wb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZPcmllbnRhdGlvbicsIFsnJG9uc2VuJywgJyRvbnNHbG9iYWwnLCBmdW5jdGlvbigkb25zZW4sICRvbnNHbG9iYWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZk9yaWVudGF0aW9uJywgdXBkYXRlKTtcbiAgICAgICAgICAkb25zR2xvYmFsLm9yaWVudGF0aW9uLm9uKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vZmYoJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyT3JpZW50YXRpb24gPSAoJycgKyBhdHRycy5vbnNJZk9yaWVudGF0aW9uKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIG9yaWVudGF0aW9uID0gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpO1xuXG4gICAgICAgICAgICBpZiAodXNlck9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnIHx8IHVzZXJPcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZScpIHtcbiAgICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gb3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBnZXRMYW5kc2NhcGVPclBvcnRyYWl0KCkge1xuICAgICAgICAgICAgcmV0dXJuICRvbnNHbG9iYWwub3JpZW50YXRpb24uaXNQb3J0cmFpdCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1wbGF0Zm9ybVxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIC8gYnJvd3Nlci4gVmFsaWQgdmFsdWVzIGFyZSBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgYW5kIFwid3BcIi5bL2VuXVxuICogICAgW2phXeODl+ODqeODg+ODiOODleOCqeODvOODoOOChOODluODqeOCpuOCtuODvOOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuOBiuOBk+OBquOBhOOBvuOBmeOAgm9wZXJhLCBmaXJlZm94LCBzYWZhcmksIGNocm9tZSwgaWUsIGVkZ2UsIGFuZHJvaWQsIGJsYWNrYmVycnksIGlvcywgd3Djga7jgYTjgZrjgozjgYvjga7lgKTjgpLnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLW9yaWVudGF0aW9uIFtlbl1vbnMtaWYtb3JpZW50YXRpb24gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLW9yaWVudGF0aW9u44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1wbGF0Zm9ybT1cImFuZHJvaWRcIj5cbiAqICAgLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLXBsYXRmb3JtXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU9uZSBvciBtdWx0aXBsZSBzcGFjZSBzZXBhcmF0ZWQgdmFsdWVzOiBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgb3IgXCJ3cFwiLlsvZW5dXG4gKiAgIFtqYV1cIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIsIFwid3BcIuOBruOBhOOBmuOCjOOBi+epuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmUGxhdGZvcm0nLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICB2YXIgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybVN0cmluZygpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZQbGF0Zm9ybScsIGZ1bmN0aW9uKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyUGxhdGZvcm1zID0gYXR0cnMub25zSWZQbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFBsYXRmb3JtU3RyaW5nKCkge1xuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvUklNIFRhYmxldCBPUy9pKSkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JCMTAvaSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2JsYWNrYmVycnknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmV8SUVNb2JpbGV8V1BEZXNrdG9wL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3dwJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBPcGVyYSA4LjArIChVQSBkZXRlY3Rpb24gdG8gZGV0ZWN0IEJsaW5rL3Y4LXBvd2VyZWQgT3BlcmEpXG4gICAgICAgICAgdmFyIGlzT3BlcmEgPSAhIXdpbmRvdy5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNPcGVyYSkge1xuICAgICAgICAgICAgcmV0dXJuICdvcGVyYSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRmlyZWZveCA9IHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7ICAgLy8gRmlyZWZveCAxLjArXG4gICAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNTYWZhcmkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93LkhUTUxFbGVtZW50KS5pbmRleE9mKCdDb25zdHJ1Y3RvcicpID4gMDtcbiAgICAgICAgICAvLyBBdCBsZWFzdCBTYWZhcmkgMys6IFwiW29iamVjdCBIVE1MRWxlbWVudENvbnN0cnVjdG9yXVwiXG4gICAgICAgICAgaWYgKGlzU2FmYXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIEVkZ2UvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNFZGdlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2VkZ2UnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0Nocm9tZSA9ICEhd2luZG93LmNocm9tZSAmJiAhaXNPcGVyYSAmJiAhaXNFZGdlOyAvLyBDaHJvbWUgMStcbiAgICAgICAgICBpZiAoaXNDaHJvbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY2hyb21lJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNJRSA9IC8qQGNjX29uIUAqL2ZhbHNlIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlOyAvLyBBdCBsZWFzdCBJRTZcbiAgICAgICAgICBpZiAoaXNJRSkge1xuICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBpZCBpbnB1dFxuICogQG5hbWUgb25zLWlucHV0XG4gKiBAY2F0ZWdvcnkgZm9ybVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUlucHV0IGNvbXBvbmVudC5bL2VuXVxuICogIFtqYV1pbnB1dOOCs+ODs+ODneKAleODjeODs+ODiOOBp+OBmeOAglsvamFdXG4gKiBAY29kZXBlbiBvalF4TGpcbiAqIEBndWlkZSBVc2luZ0Zvcm1Db21wb25lbnRzXG4gKiAgIFtlbl1Vc2luZyBmb3JtIGNvbXBvbmVudHNbL2VuXVxuICogICBbamFd44OV44Kp44O844Og44KS5L2/44GGWy9qYV1cbiAqIEBndWlkZSBFdmVudEhhbmRsaW5nXG4gKiAgIFtlbl1FdmVudCBoYW5kbGluZyBkZXNjcmlwdGlvbnNbL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5Yem55CG44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWlucHV0Pjwvb25zLWlucHV0PlxuICogPG9ucy1pbnB1dCBtb2RpZmllcj1cIm1hdGVyaWFsXCIgbGFiZWw9XCJVc2VybmFtZVwiPjwvb25zLWlucHV0PlxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbGFiZWxcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRleHQgZm9yIGFuaW1hdGVkIGZsb2F0aW5nIGxhYmVsLlsvZW5dXG4gKiAgIFtqYV3jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgZXjgZvjgovjg5Xjg63jg7zjg4bjgqPjg7PjgrDjg6njg5njg6vjga7jg4bjgq3jgrnjg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgZmxvYXRcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1JZiB0aGlzIGF0dHJpYnV0ZSBpcyBwcmVzZW50LCB0aGUgbGFiZWwgd2lsbCBiZSBhbmltYXRlZC5bL2VuXVxuICogIFtqYV3jgZPjga7lsZ7mgKfjgYzoqK3lrprjgZXjgozjgZ/mmYLjgIHjg6njg5njg6vjga/jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgZnjgovjgojjgYbjgavjgarjgorjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbmctbW9kZWxcbiAqIEBleHRlbnNpb25PZiBhbmd1bGFyXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUJpbmQgdGhlIHZhbHVlIHRvIGEgbW9kZWwuIFdvcmtzIGp1c3QgbGlrZSBmb3Igbm9ybWFsIGlucHV0IGVsZW1lbnRzLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7opoHntKDjga7lgKTjgpLjg6Ljg4fjg6vjgavntJDku5jjgZHjgb7jgZnjgILpgJrluLjjga5pbnB1dOimgee0oOOBruanmOOBq+WLleS9nOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgYXR0cmlidXRlXG4gKiBAbmFtZSBuZy1jaGFuZ2VcbiAqIEBleHRlbnNpb25PZiBhbmd1bGFyXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUV4ZWN1dGVzIGFuIGV4cHJlc3Npb24gd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy4gV29ya3MganVzdCBsaWtlIGZvciBub3JtYWwgaW5wdXQgZWxlbWVudHMuWy9lbl1cbiAqICAgW2phXeWApOOBjOWkieOCj+OBo+OBn+aZguOBq+OBk+OBruWxnuaAp+OBp+aMh+WumuOBl+OBn2V4cHJlc3Npb27jgYzlrp/ooYzjgZXjgozjgb7jgZnjgILpgJrluLjjga5pbnB1dOimgee0oOOBruanmOOBq+WLleS9nOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0lucHV0JywgWyckcGFyc2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBpZiAoZWwuX2lzVGV4dElucHV0KSB7XG4gICAgICAgICAgICBlbC50eXBlID09PSAnbnVtYmVyJyA/IHNldChzY29wZSwgTnVtYmVyKGVsLnZhbHVlKSkgOiBzZXQoc2NvcGUsIGVsLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJyAmJiBlbC5jaGVja2VkKSB7XG4gICAgICAgICAgICBzZXQoc2NvcGUsIGVsLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXQoc2NvcGUsIGVsLmNoZWNrZWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsLl9pc1RleHRJbnB1dCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gZWwudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlID09PSBlbC52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsLl9pc1RleHRJbnB1dFxuICAgICAgICAgICAgPyBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgICAgICA6IGVsZW1lbnQub24oJ2NoYW5nZScsIG9uSW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbC5faXNUZXh0SW5wdXRcbiAgICAgICAgICAgID8gZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgICAgIDogZWxlbWVudC5vZmYoJ2NoYW5nZScsIG9uSW5wdXQpO1xuXG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBlbCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBjYXRlZ29yeSBmb3JtXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIENvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiBpZiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgdmlzaWJsZSBvciBoaWRkZW4uXG4gKiAgICAgVGhpcyBjb21wb25lbnQgcmVxdWlyZXMgY29yZG92YSBhbmQgdGhhdCB0aGUgY29tLmlvbmljLmtleWJvYXJkIHBsdWdpbiBpcyBpbnN0YWxsZWQuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgabjgYTjgovjgYvjganjgYbjgYvjgafjgIHjgrPjg7Pjg4bjg7Pjg4TjgpLooajnpLrjgZnjgovjgYvjganjgYbjgYvjgpLliIfjgormm7/jgYjjgovjgZPjgajjgYzlh7rmnaXjgb7jgZnjgIJcbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjga/jgIFDb3Jkb3Zh44KEY29tLmlvbmljLmtleWJvYXJk44OX44Op44Kw44Kk44Oz44KS5b+F6KaB44Go44GX44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAZ3VpZGUgVXRpbGl0eUFQSXNcbiAqICAgW2VuXU90aGVyIHV0aWxpdHkgQVBJc1svZW5dXG4gKiAgIFtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWtleWJvYXJkLWFjdGl2ZT5cbiAqICAgVGhpcyB3aWxsIG9ubHkgYmUgZGlzcGxheWVkIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlxuICogPC9kaXY+XG4gKiA8ZGl2IG9ucy1rZXlib2FyZC1pbmFjdGl2ZT5cbiAqICAgVGhlcmUgaXMgYWxzbyBhIGNvbXBvbmVudCB0aGF0IGRvZXMgdGhlIG9wcG9zaXRlLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7lsZ7mgKfjgYzjgaTjgYTjgZ/opoHntKDjga/jgIHjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgZ/mmYLjgavliJ3jgoHjgabooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMta2V5Ym9hcmQtaW5hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBoaWRkZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOmaoOOCjOOBpuOBhOOCi+aZguOBruOBv+ihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBjb21waWxlRnVuY3Rpb24gPSBmdW5jdGlvbihzaG93LCAkb25zZW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGlzcFNob3cgPSBzaG93ID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICAgIGRpc3BIaWRlID0gc2hvdyA/ICdub25lJyA6ICdibG9jayc7XG5cbiAgICAgICAgdmFyIG9uU2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcFNob3cpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsIGRpc3BIaWRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25Jbml0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnZpc2libGUpIHtcbiAgICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICBpZiAob25zLnNvZnR3YXJlS2V5Ym9hcmQuX3Zpc2libGUpIHtcbiAgICAgICAgICBvblNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdzaG93Jywgb25TaG93KTtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ2hpZGUnLCBvbkhpZGUpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaW5pdCcsIG9uSW5pdCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRBY3RpdmUnLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGNvbXBpbGU6IGNvbXBpbGVGdW5jdGlvbih0cnVlLCAkb25zZW4pXG4gICAgfTtcbiAgfV0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0tleWJvYXJkSW5hY3RpdmUnLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGNvbXBpbGU6IGNvbXBpbGVGdW5jdGlvbihmYWxzZSwgJG9uc2VuKVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3QnLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RIZWFkZXInLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3RIZWFkZXInfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RJdGVtJywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0LWl0ZW0nfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRGlzcGxheSBhIHBsYWNlaG9sZGVyIHdoaWxlIHRoZSBjb250ZW50IGlzIGxvYWRpbmcuWy9lbl1cbiAqICAgW2phXU9uc2VuIFVJ44GM6Kqt44G/6L6844G+44KM44KL44G+44Gn44Gr6KGo56S644GZ44KL44OX44Os44O844K544Ob44Or44OA44O844KS6KGo54++44GX44G+44GZ44CCWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyPVwicGFnZS5odG1sXCI+XG4gKiAgIExvYWRpbmcuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIHRvIGxvYWQuWy9lbl1cbiAqICAgW2phXeiqreOBv+i+vOOCgOODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xvYWRpbmdQbGFjZWhvbGRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICBvbnMuX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIoZWxlbWVudFswXSwgYXR0cnMub25zTG9hZGluZ1BsYWNlaG9sZGVyLCBmdW5jdGlvbihjb250ZW50RWxlbWVudCwgZG9uZSkge1xuICAgICAgICAgICAgb25zLmNvbXBpbGUoY29udGVudEVsZW1lbnQpO1xuICAgICAgICAgICAgc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIiLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmFuZ2UnLCBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIHNldChzY29wZSwgZWxlbWVudFswXS52YWx1ZSk7XG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSaXBwbGUnLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXJpcHBsZSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zY29wZVxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsIGNoaWxkIGVsZW1lbnRzIHVzaW5nIHRoZSBcInZhclwiIGF0dHJpYnV0ZSB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBzY29wZSBvZiB0aGlzIGVsZW1lbnQuWy9lbl1cbiAqICAgW2phXVwidmFyXCLlsZ7mgKfjgpLkvb/jgaPjgabjgYTjgovlhajjgabjga7lrZDopoHntKDjga52aWV344Kq44OW44K444Kn44Kv44OI44Gv44CB44GT44Gu6KaB57Sg44GuQW5ndWxhckpT44K544Kz44O844OX44Gr6L+95Yqg44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWxpc3Q+XG4gKiAgIDxvbnMtbGlzdC1pdGVtIG9ucy1zY29wZSBuZy1yZXBlYXQ9XCJpdGVtIGluIGl0ZW1zXCI+XG4gKiAgICAgPG9ucy1jYXJvdXNlbCB2YXI9XCJjYXJvdXNlbFwiPlxuICogICAgICAgPG9ucy1jYXJvdXNlbC1pdGVtIG5nLWNsaWNrPVwiY2Fyb3VzZWwubmV4dCgpXCI+XG4gKiAgICAgICAgIHt7IGl0ZW0gfX1cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtIG5nLWNsaWNrPVwiY2Fyb3VzZWwucHJldigpXCI+XG4gKiAgICAgICAgIC4uLlxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICA8L29ucy1jYXJvdXNlbD5cbiAqICAgPC9vbnMtbGlzdC1pdGVtPlxuICogPC9vbnMtbGlzdD5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU2NvcGUnLCBbJyRvbnNlbicsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNlbGVjdFxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAuZGlyZWN0aXZlKCdvbnNTZWxlY3QnLCBbJyRwYXJzZScsICckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbiAoJHBhcnNlLCAkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzZXQoc2NvcGUsIGVsZW1lbnRbMF0udmFsdWUpO1xuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7IHZpZXdLZXk6ICdvbnMtc2VsZWN0JyB9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKVxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyLWNvbnRlbnRcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLlNwbGl0dGVyQ29udGVudEVsZW1lbnQucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuU3BsaXR0ZXJDb250ZW50RWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCBsYXN0UmVhZHkpO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU3BsaXR0ZXJDb250ZW50JywgWyckY29tcGlsZScsICdTcGxpdHRlckNvbnRlbnQnLCAnJG9uc2VuJywgZnVuY3Rpb24oJGNvbXBpbGUsIFNwbGl0dGVyQ29udGVudCwgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgdmFyIHZpZXcgPSBuZXcgU3BsaXR0ZXJDb250ZW50KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh2aWV3LCAnZGVzdHJveScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItY29udGVudCcsIHZpZXcpO1xuXG4gICAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1jb250ZW50JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItc2lkZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZW9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZW9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdG9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0b3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1tb2RlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJtb2RlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJtb2RlY2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5TcGxpdHRlclNpZGVFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlNwbGl0dGVyU2lkZUVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1zaWRlJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyU2lkZScsIFsnJGNvbXBpbGUnLCAnU3BsaXR0ZXJTaWRlJywgJyRvbnNlbicsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlclNpZGUsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyU2lkZShzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3kgcHJlb3BlbiBwcmVjbG9zZSBwb3N0b3BlbiBwb3N0Y2xvc2UgbW9kZWNoYW5nZScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItc2lkZScsIHZpZXcpO1xuXG4gICAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGFiLiRpbmplY3QgPSBbJyRvbnNlbicsICdHZW5lcmljVmlldyddO1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYicsIHRhYilcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWJiYXJJdGVtJywgdGFiKTsgLy8gZm9yIEJDXG5cbiAgZnVuY3Rpb24gdGFiKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRhYmJhclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHRhYiBiYXIuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCv+ODluODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIGhpZGUtdGFic1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqIEBkZWZhdWx0IGZhbHNlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVdoZXRoZXIgdG8gaGlkZSB0aGUgdGFicy4gVmFsaWQgdmFsdWVzIGFyZSB0cnVlL2ZhbHNlLlsvZW5dXG4gKiAgIFtqYV3jgr/jg5bjgpLpnZ7ooajnpLrjgavjgZnjgovloLTlkIjjgavmjIflrprjgZfjgb7jgZnjgIJ0cnVl44KC44GX44GP44GvZmFsc2XjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVhY3RpdmVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlYWN0aXZlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWFjdGl2ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuVGFiYmFyRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtdGFiYmFyJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RhYmJhcicsIFsnJG9uc2VuJywgJyRjb21waWxlJywgJyRwYXJzZScsICdUYWJiYXJWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSwgJHBhcnNlLCBUYWJiYXJWaWV3KSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG5cblxuICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMuaGlkZVRhYnMsIGZ1bmN0aW9uKGhpZGUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGhpZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBoaWRlID0gaGlkZSA9PT0gJ3RydWUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50WzBdLnNldFRhYmJhclZpc2liaWxpdHkoIWhpZGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdGFiYmFyVmlldyA9IG5ldyBUYWJiYXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0YWJiYXJWaWV3LCBlbGVtZW50KTtcblxuICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHRhYmJhclZpZXcsICdyZWFjdGl2ZSBwcmVjaGFuZ2UgcG9zdGNoYW5nZSBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdGFiYmFyJywgdGFiYmFyVmlldyk7XG4gICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB0YWJiYXJWaWV3KTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGFiYmFyVmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModGFiYmFyVmlldyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdGFiYmFyJywgdW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVGVtcGxhdGUnLCBbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICB2YXIgY29udGVudCA9IGVsZW1lbnRbMF0udGVtcGxhdGUgfHwgZWxlbWVudC5odG1sKCk7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dChlbGVtZW50LmF0dHIoJ2lkJyksIGNvbnRlbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b29sYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0b29sYmFyLlsvZW5dXG4gKiAgW2phXeOBk+OBruODhOODvOODq+ODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVG9vbGJhcicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBkaXJ0eSBmaXghXG4gICAgICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlTmFtZSA9PT0gJ29ucy10b29sYmFyJykge1xuICAgICAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXRvb2xiYXInfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhci1idXR0b25cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBidXR0b24uWy9lbl1cbiAqICAgW2phXeOBk+OBruODnOOCv+ODs+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNUb29sYmFyQnV0dG9uJywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIHRvb2xiYXJCdXR0b24gPSBuZXcgR2VuZXJpY1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b29sYmFyLWJ1dHRvbicsIHRvb2xiYXJCdXR0b24pO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB0b29sYmFyQnV0dG9uKTtcblxuICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0b29sYmFyQnV0dG9uLCBlbGVtZW50KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0b29sYmFyQnV0dG9uLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRvb2xiYXJCdXR0b24pO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9vbGJhci1idXR0b24nLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzLFxuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICB2YXIgQ29tcG9uZW50Q2xlYW5lciA9IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqL1xuICAgIGRlY29tcG9zZU5vZGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW1lbnQucmVtb3ZlKCkuY2hpbGRyZW4oKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZWNvbXBvc2VOb2RlKGFuZ3VsYXIuZWxlbWVudChjaGlsZHJlbltpXSkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IGF0dHJzXG4gICAgICovXG4gICAgZGVzdHJveUF0dHJpYnV0ZXM6IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgICBhdHRycy4kJGVsZW1lbnQgPSBudWxsO1xuICAgICAgYXR0cnMuJCRvYnNlcnZlcnMgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqL1xuICAgIGRlc3Ryb3lFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Njb3BlfSBzY29wZVxuICAgICAqL1xuICAgIGRlc3Ryb3lTY29wZTogZnVuY3Rpb24oc2NvcGUpIHtcbiAgICAgIHNjb3BlLiQkbGlzdGVuZXJzID0ge307XG4gICAgICBzY29wZS4kJHdhdGNoZXJzID0gbnVsbDtcbiAgICAgIHNjb3BlID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqL1xuICAgIG9uRGVzdHJveTogZnVuY3Rpb24oc2NvcGUsIGZuKSB7XG4gICAgICB2YXIgY2xlYXIgPSBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyKCk7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0NvbXBvbmVudENsZWFuZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQ29tcG9uZW50Q2xlYW5lcjtcbiAgfSk7XG5cbiAgLy8gb3ZlcnJpZGUgYnVpbHRpbiBuZy0oZXZlbnRuYW1lKSBkaXJlY3RpdmVzXG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgbmdFdmVudERpcmVjdGl2ZXMgPSB7fTtcbiAgICAnY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlbW92ZSBtb3VzZWVudGVyIG1vdXNlbGVhdmUga2V5ZG93biBrZXl1cCBrZXlwcmVzcyBzdWJtaXQgZm9jdXMgYmx1ciBjb3B5IGN1dCBwYXN0ZScuc3BsaXQoJyAnKS5mb3JFYWNoKFxuICAgICAgZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlTmFtZSA9IGRpcmVjdGl2ZU5vcm1hbGl6ZSgnbmctJyArIG5hbWUpO1xuICAgICAgICBuZ0V2ZW50RGlyZWN0aXZlc1tkaXJlY3RpdmVOYW1lXSA9IFsnJHBhcnNlJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKCRlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgICAgIHZhciBmbiA9ICRwYXJzZShhdHRyW2RpcmVjdGl2ZU5hbWVdKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm4oc2NvcGUsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGVsZW1lbnQub24obmFtZSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgIHNjb3BlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhhdHRyKTtcbiAgICAgICAgICAgICAgICAgIGF0dHIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1dO1xuXG4gICAgICAgIGZ1bmN0aW9uIGRpcmVjdGl2ZU5vcm1hbGl6ZShuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24obWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgbW9kdWxlLmNvbmZpZyhbJyRwcm92aWRlJywgZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgIHZhciBzaGlmdCA9IGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xuICAgICAgICAkZGVsZWdhdGUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcbiAgICAgIH07XG4gICAgICBPYmplY3Qua2V5cyhuZ0V2ZW50RGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihkaXJlY3RpdmVOYW1lKSB7XG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcihkaXJlY3RpdmVOYW1lICsgJ0RpcmVjdGl2ZScsIFsnJGRlbGVnYXRlJywgc2hpZnRdKTtcbiAgICAgIH0pO1xuICAgIH1dKTtcbiAgICBPYmplY3Qua2V5cyhuZ0V2ZW50RGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihkaXJlY3RpdmVOYW1lKSB7XG4gICAgICBtb2R1bGUuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIG5nRXZlbnREaXJlY3RpdmVzW2RpcmVjdGl2ZU5hbWVdKTtcbiAgICB9KTtcbiAgfSkoKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5bJ2FsZXJ0JywgJ2NvbmZpcm0nLCAncHJvbXB0J10uZm9yRWFjaChuYW1lID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxOb3RpZmljYXRpb24gPSBvbnMubm90aWZpY2F0aW9uW25hbWVdO1xuXG4gIG9ucy5ub3RpZmljYXRpb25bbmFtZV0gPSAobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnID8gKG9wdGlvbnMubWVzc2FnZSA9IG1lc3NhZ2UpIDogKG9wdGlvbnMgPSBtZXNzYWdlKTtcblxuICAgIGNvbnN0IGNvbXBpbGUgPSBvcHRpb25zLmNvbXBpbGU7XG4gICAgbGV0ICRlbGVtZW50O1xuXG4gICAgb3B0aW9ucy5jb21waWxlID0gZWxlbWVudCA9PiB7XG4gICAgICAkZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjb21waWxlID8gY29tcGlsZShlbGVtZW50KSA6IGVsZW1lbnQpO1xuICAgICAgcmV0dXJuIG9ucy4kY29tcGlsZSgkZWxlbWVudCkoJGVsZW1lbnQuaW5qZWN0b3IoKS5nZXQoJyRyb290U2NvcGUnKSk7XG4gICAgfTtcblxuICAgIG9wdGlvbnMuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICRlbGVtZW50LmRhdGEoJ19zY29wZScpLiRkZXN0cm95KCk7XG4gICAgICAkZWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiBvcmlnaW5hbE5vdGlmaWNhdGlvbihvcHRpb25zKTtcbiAgfTtcbn0pOyIsIi8vIGNvbmZpcm0gdG8gdXNlIGpxTGl0ZVxuaWYgKHdpbmRvdy5qUXVlcnkgJiYgYW5ndWxhci5lbGVtZW50ID09PSB3aW5kb3cualF1ZXJ5KSB7XG4gIGNvbnNvbGUud2FybignT25zZW4gVUkgcmVxdWlyZSBqcUxpdGUuIExvYWQgalF1ZXJ5IGFmdGVyIGxvYWRpbmcgQW5ndWxhckpTIHRvIGZpeCB0aGlzIGVycm9yLiBqUXVlcnkgbWF5IGJyZWFrIE9uc2VuIFVJIGJlaGF2aW9yLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgIHZhciB0ZW1wbGF0ZXMgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJ0ZXh0L29ucy10ZW1wbGF0ZVwiXScpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZXNbaV0pO1xuICAgICAgdmFyIGlkID0gdGVtcGxhdGUuYXR0cignaWQnKTtcbiAgICAgIGlmICh0eXBlb2YgaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dChpZCwgdGVtcGxhdGUudGV4dCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxufSkoKTtcbiJdfQ==
