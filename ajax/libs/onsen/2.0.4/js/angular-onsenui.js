/*! angular-onsenui.js for onsenui - v2.0.4 - 2016-11-04 */
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
        this._boundOnPageDestroy = this._onPageDestroy.bind(this);
        this._element.on('prepop', this._boundOnPrepop);
        this._element.on('destroy', this._boundOnPageDestroy);

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

      _onPageDestroy: function _onPageDestroy(event) {
        var page = event.target;

        if (this._element[0] === page.parentNode) {
          var scope = angular.element(page).data('_scope');
          scope.$destroy();
        }
      },

      _compileAndLink: function _compileAndLink(pageElement, callback) {
        var link = $compile(pageElement);
        var pageScope = this._createPageScope();
        link(pageScope);

        /**
         * Overwrite page scope.
         */
        angular.element(pageElement).data('_scope', pageScope);

        pageScope.$evalAsync(function () {
          callback(pageElement);
        });
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._clearDerivingEvents();
        this._clearDerivingMethods();
        this._element.off('prepop', this._boundOnPrepop);
        this._element.off('destroy', this._boundOnPageDestroy);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIiwidGVtcGxhdGVzLmpzIiwib25zZW4uanMiLCJhbGVydERpYWxvZy5qcyIsImFsZXJ0RGlhbG9nQW5pbWF0b3IuanMiLCJhbmltYXRpb25DaG9vc2VyLmpzIiwiY2Fyb3VzZWwuanMiLCJkaWFsb2cuanMiLCJkaWFsb2dBbmltYXRvci5qcyIsImZhYi5qcyIsImdlbmVyaWMuanMiLCJsYXp5UmVwZWF0LmpzIiwibGF6eVJlcGVhdERlbGVnYXRlLmpzIiwibW9kYWwuanMiLCJuYXZpZ2F0b3IuanMiLCJuYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IuanMiLCJvdmVybGF5U2xpZGluZ01lbnVBbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJwdXNoU2xpZGluZ01lbnVBbmltYXRvci5qcyIsInJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzbGlkaW5nTWVudS5qcyIsInNsaWRpbmdNZW51QW5pbWF0b3IuanMiLCJzcGVlZERpYWwuanMiLCJzcGxpdFZpZXcuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsImJhY2tCdXR0b24uanMiLCJib3R0b21Ub29sYmFyLmpzIiwiYnV0dG9uLmpzIiwiZHVtbXlGb3JJbml0LmpzIiwiZ2VzdHVyZURldGVjdG9yLmpzIiwiaWNvbi5qcyIsImlmT3JpZW50YXRpb24uanMiLCJpZlBsYXRmb3JtLmpzIiwiaW5wdXQuanMiLCJrZXlib2FyZC5qcyIsImxpc3QuanMiLCJsaXN0SGVhZGVyLmpzIiwibGlzdEl0ZW0uanMiLCJsb2FkaW5nUGxhY2Vob2xkZXIuanMiLCJwcm9ncmVzc0Jhci5qcyIsInJhbmdlLmpzIiwicmlwcGxlLmpzIiwic2NvcGUuanMiLCJzcGxpdHRlckNvbnRlbnQuanMiLCJzcGxpdHRlclNpZGUuanMiLCJ0YWIuanMiLCJ0YWJCYXIuanMiLCJ0ZW1wbGF0ZS5qcyIsInRvb2xiYXIuanMiLCJ0b29sYmFyQnV0dG9uLmpzIiwiY29tcG9uZW50Q2xlYW5lci5qcyIsIm5vdGlmaWNhdGlvbi5qcyIsInNldHVwLmpzIiwidGVtcGxhdGVMb2FkZXIuanMiXSwibmFtZXMiOlsiZm5UZXN0IiwidGVzdCIsInh5eiIsIkJhc2VDbGFzcyIsImV4dGVuZCIsInByb3BzIiwiX3N1cGVyIiwicHJvdG90eXBlIiwicHJvdG8iLCJPYmplY3QiLCJjcmVhdGUiLCJuYW1lIiwiZm4iLCJ0bXAiLCJyZXQiLCJhcHBseSIsImFyZ3VtZW50cyIsIm5ld0NsYXNzIiwiaW5pdCIsImhhc093blByb3BlcnR5IiwiU3ViQ2xhc3MiLCJFbXB0eUNsYXNzIiwiY29uc3RydWN0b3IiLCJ3aW5kb3ciLCJDbGFzcyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJlcnIiLCJydW4iLCIkdGVtcGxhdGVDYWNoZSIsInB1dCIsIm9ucyIsImluaXRPbnNlbkZhY2FkZSIsIndhaXRPbnNlblVJTG9hZCIsImluaXRBbmd1bGFyTW9kdWxlIiwiaW5pdFRlbXBsYXRlQ2FjaGUiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwidmFsdWUiLCIkb25zZW4iLCIkcSIsIl9vbnNlblNlcnZpY2UiLCJfcVNlcnZpY2UiLCJjb25zb2xlIiwiYWxlcnQiLCJfaW50ZXJuYWwiLCJnZXRUZW1wbGF0ZUhUTUxBc3luYyIsInBhZ2UiLCJjYWNoZSIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29tcG9uZW50QmFzZSIsImJvb3RzdHJhcCIsImRlcHMiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiY29uY2F0IiwiZG9jIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZFBhcmVudENvbXBvbmVudFVudGlsIiwiZG9tIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwidGFyZ2V0IiwiaW5oZXJpdGVkRGF0YSIsImZpbmRDb21wb25lbnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbXBpbGUiLCJzY29wZSIsIl9nZXRPbnNlblNlcnZpY2UiLCJfd2FpdERpcmV0aXZlSW5pdCIsImVsZW1lbnROYW1lIiwibGFzdFJlYWR5IiwiY2FsbGJhY2siLCJsaXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlQWxlcnREaWFsb2ciLCJvcHRpb25zIiwibGluayIsInBhcmVudFNjb3BlIiwiJG5ldyIsIiRldmFsQXN5bmMiLCJfY3JlYXRlQWxlcnREaWFsb2dPcmlnaW5hbCIsInRoZW4iLCJhbGVydERpYWxvZyIsImNyZWF0ZURpYWxvZyIsIl9jcmVhdGVEaWFsb2dPcmlnaW5hbCIsImRpYWxvZyIsImNyZWF0ZVBvcG92ZXIiLCJfY3JlYXRlUG9wb3Zlck9yaWdpbmFsIiwicG9wb3ZlciIsInJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJfcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlck9yaWdpbmFsIiwiZG9uZSIsInNldEltbWVkaWF0ZSIsIl9zZXR1cExvYWRpbmdQbGFjZUhvbGRlcnMiLCJmYWN0b3J5IiwiQWxlcnREaWFsb2dWaWV3IiwiYXR0cnMiLCJfc2NvcGUiLCJfZWxlbWVudCIsIl9hdHRycyIsIl9jbGVhckRlcml2aW5nTWV0aG9kcyIsImRlcml2ZU1ldGhvZHMiLCJfY2xlYXJEZXJpdmluZ0V2ZW50cyIsImRlcml2ZUV2ZW50cyIsImRldGFpbCIsImJpbmQiLCJfZGVzdHJveSIsImVtaXQiLCJyZW1vdmUiLCJNaWNyb0V2ZW50IiwibWl4aW4iLCJkZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQiLCJBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3IiLCJJT1NBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5pbWF0b3JGYWN0b3J5IiwiQ2Fyb3VzZWxWaWV3IiwiY2Fyb3VzZWwiLCJEaWFsb2dWaWV3IiwicmVnaXN0ZXJBbmltYXRvciIsIkFuaW1hdG9yIiwiRGlhbG9nRWxlbWVudCIsIkRpYWxvZ0FuaW1hdG9yIiwiSU9TRGlhbG9nQW5pbWF0b3IiLCJBbmRyb2lkRGlhbG9nQW5pbWF0b3IiLCJTbGlkZURpYWxvZ0FuaW1hdG9yIiwiRmFiVmlldyIsIkdlbmVyaWNWaWV3Iiwic2VsZiIsImRpcmVjdGl2ZU9ubHkiLCJtb2RpZmllclRlbXBsYXRlIiwiYWRkTW9kaWZpZXJNZXRob2RzIiwiYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMiLCJjbGVhbmVyIiwib25EZXN0cm95IiwiX2V2ZW50cyIsInJlbW92ZU1vZGlmaWVyTWV0aG9kcyIsImNsZWFyQ29tcG9uZW50IiwicmVnaXN0ZXIiLCJ2aWV3Iiwidmlld0tleSIsImRlY2xhcmVWYXJBdHRyaWJ1dGUiLCJkZXN0cm95Iiwibm9vcCIsIkFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUiLCJMYXp5UmVwZWF0VmlldyIsImxpbmtlciIsIl9saW5rZXIiLCJfdXRpbCIsInVwZGF0ZVBhcmVudFBvc2l0aW9uIiwidXNlckRlbGVnYXRlIiwiJGV2YWwiLCJvbnNMYXp5UmVwZWF0IiwiaW50ZXJuYWxEZWxlZ2F0ZSIsIl9wcm92aWRlciIsIkxhenlSZXBlYXRQcm92aWRlciIsInBhcmVudE5vZGUiLCJyZWZyZXNoIiwiJHdhdGNoIiwiY291bnRJdGVtcyIsIl9vbkNoYW5nZSIsImRpcmVjdGl2ZUF0dHJpYnV0ZXMiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJfcGFyZW50U2NvcGUiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ciIsImNsb25lTm9kZSIsIml0ZW0iLCJfdXNlckRlbGVnYXRlIiwiY29uZmlndXJlSXRlbVNjb3BlIiwiRnVuY3Rpb24iLCJkZXN0cm95SXRlbVNjb3BlIiwiY3JlYXRlSXRlbUNvbnRlbnQiLCJpbmRleCIsInBhcmVudCIsIl9wcmVwYXJlSXRlbUVsZW1lbnQiLCJfYWRkU3BlY2lhbFByb3BlcnRpZXMiLCJfdXNpbmdCaW5kaW5nIiwiY2xvbmVkIiwiaSIsImxhc3QiLCIkaW5kZXgiLCIkZmlyc3QiLCIkbGFzdCIsIiRtaWRkbGUiLCIkZXZlbiIsIiRvZGQiLCIkZGVzdHJveSIsIkxhenlSZXBlYXREZWxlZ2F0ZSIsIk1vZGFsQW5pbWF0b3IiLCJGYWRlTW9kYWxBbmltYXRvciIsIiRwYXJzZSIsIk1vZGFsVmlldyIsIl9hbmltYXRvckZhY3RvcnkiLCJzZXRBbmltYXRpb25PcHRpb25zIiwiYW5pbWF0aW9uT3B0aW9ucyIsInNob3ciLCJoaWRlIiwidG9nZ2xlIiwiTW9kYWxFbGVtZW50IiwiTmF2aWdhdG9yVmlldyIsIl9wcmV2aW91c1BhZ2VTY29wZSIsIl9ib3VuZE9uUHJlcG9wIiwiX29uUHJlcG9wIiwiX2JvdW5kT25QYWdlRGVzdHJveSIsIl9vblBhZ2VEZXN0cm95Iiwib24iLCJuYXZpZ2F0b3IiLCJldmVudCIsInBhZ2VzIiwibGVuZ3RoIiwiX2NvbXBpbGVBbmRMaW5rIiwicGFnZUVsZW1lbnQiLCJwYWdlU2NvcGUiLCJfY3JlYXRlUGFnZVNjb3BlIiwib2ZmIiwiTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiRmFkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvciIsIklPU1NsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiTGlmdE5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvciIsIlNpbXBsZVNsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiU2xpZGluZ01lbnVBbmltYXRvciIsIk92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yIiwiX2JsYWNrTWFzayIsIl9pc1JpZ2h0IiwiX21lbnVQYWdlIiwiX21haW5QYWdlIiwiX3dpZHRoIiwic2V0dXAiLCJtYWluUGFnZSIsIm1lbnVQYWdlIiwid2lkdGgiLCJpc1JpZ2h0IiwiY3NzIiwiZGlzcGxheSIsInpJbmRleCIsInJpZ2h0IiwibGVmdCIsImJhY2tncm91bmRDb2xvciIsInRvcCIsImJvdHRvbSIsInBvc2l0aW9uIiwicHJlcGVuZCIsIm9uUmVzaXplZCIsImlzT3BlbmVkIiwibWF4IiwiY2xpZW50V2lkdGgiLCJtZW51U3R5bGUiLCJfZ2VuZXJhdGVNZW51UGFnZVN0eWxlIiwiYW5pbWl0IiwicXVldWUiLCJwbGF5IiwicmVtb3ZlQXR0ciIsIm9wZW5NZW51IiwiaW5zdGFudCIsImR1cmF0aW9uIiwiZGVsYXkiLCJtYWluUGFnZVN0eWxlIiwiX2dlbmVyYXRlTWFpblBhZ2VTdHlsZSIsInNldFRpbWVvdXQiLCJ3YWl0IiwidGltaW5nIiwiY2xvc2VNZW51IiwibWVudVBhZ2VTdHlsZSIsInRyYW5zbGF0ZU1lbnUiLCJNYXRoIiwibWluIiwibWF4RGlzdGFuY2UiLCJkaXN0YW5jZSIsIm9wYWNpdHkiLCJrZXlzIiwieCIsInRyYW5zZm9ybSIsImNvcHkiLCJQYWdlVmlldyIsIl9jbGVhckxpc3RlbmVyIiwiZGVmaW5lUHJvcGVydHkiLCJvbkRldmljZUJhY2tCdXR0b24iLCJzZXQiLCJfdXNlckJhY2tCdXR0b25IYW5kbGVyIiwiX2VuYWJsZUJhY2tCdXR0b25IYW5kbGVyIiwibmdEZXZpY2VCYWNrQnV0dG9uIiwibmdJbmZpbml0ZVNjcm9sbCIsIm9uSW5maW5pdGVTY3JvbGwiLCJfb25EZXZpY2VCYWNrQnV0dG9uIiwiJGV2ZW50IiwibGFzdEV2ZW50IiwiUG9wb3ZlclZpZXciLCJQb3BvdmVyQW5pbWF0b3IiLCJGYWRlUG9wb3ZlckFuaW1hdG9yIiwiUHVsbEhvb2tWaWV3IiwicHVsbEhvb2siLCJvbkFjdGlvbiIsIm5nQWN0aW9uIiwiJGRvbmUiLCJQdXNoU2xpZGluZ01lbnVBbmltYXRvciIsIm1haW5QYWdlVHJhbnNmb3JtIiwiX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtIiwiX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlIiwiYWJvdmVUcmFuc2Zvcm0iLCJiZWhpbmRTdHlsZSIsImJlaGluZFgiLCJiZWhpbmRUcmFuc2Zvcm0iLCJSZXZlYWxTbGlkaW5nTWVudUFuaW1hdG9yIiwiYm94U2hhZG93IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYmVoaW5kRGlzdGFuY2UiLCJpc05hTiIsIlNsaWRpbmdNZW51Vmlld01vZGVsIiwiX2Rpc3RhbmNlIiwiX21heERpc3RhbmNlIiwiaXNOdW1iZXIiLCJzZXRNYXhEaXN0YW5jZSIsInNob3VsZE9wZW4iLCJzaG91bGRDbG9zZSIsImlzQ2xvc2VkIiwib3Blbk9yQ2xvc2UiLCJvcGVuIiwiY2xvc2UiLCJnZXRYIiwiZ2V0TWF4RGlzdGFuY2UiLCJ0cmFuc2xhdGUiLCJBbmltYXRpb25DaG9vc2VyIiwiU2xpZGluZ01lbnVWaWV3IiwiX2Rvb3JMb2NrIiwiX2lzUmlnaHRNZW51IiwiX0Rvb3JMb2NrIiwic2lkZSIsIl9tYWluUGFnZUdlc3R1cmVEZXRlY3RvciIsIkdlc3R1cmVEZXRlY3RvciIsIl9ib3VuZE9uVGFwIiwiX29uVGFwIiwiX25vcm1hbGl6ZU1heFNsaWRlRGlzdGFuY2VBdHRyIiwiX2xvZ2ljIiwiX3RyYW5zbGF0ZSIsIl9vcGVuIiwiX2Nsb3NlIiwiJG9ic2VydmUiLCJfb25NYXhTbGlkZURpc3RhbmNlQ2hhbmdlZCIsIl9vblN3aXBlYWJsZUNoYW5nZWQiLCJfYm91bmRPbldpbmRvd1Jlc2l6ZSIsIl9vbldpbmRvd1Jlc2l6ZSIsIl9ib3VuZEhhbmRsZUV2ZW50IiwiX2hhbmRsZUV2ZW50IiwiX2JpbmRFdmVudHMiLCJzZXRNYWluUGFnZSIsInNldE1lbnVQYWdlIiwiX2RldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiX2RldmljZUJhY2tCdXR0b25EaXNwYXRjaGVyIiwiY3JlYXRlSGFuZGxlciIsInVubG9jayIsImFuaW1hdGlvbkNob29zZXIiLCJhbmltYXRvcnMiLCJfYW5pbWF0b3JEaWN0IiwiYmFzZUNsYXNzIiwiYmFzZUNsYXNzTmFtZSIsImRlZmF1bHRBbmltYXRpb24iLCJ0eXBlIiwiZGVmYXVsdEFuaW1hdGlvbk9wdGlvbnMiLCJfYW5pbWF0b3IiLCJuZXdBbmltYXRvciIsIm1heFNsaWRlRGlzdGFuY2UiLCJzd2lwZWFibGUiLCJzZXRTd2lwZWFibGUiLCJnZXREZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsImlzTWVudU9wZW5lZCIsImNhbGxQYXJlbnRIYW5kbGVyIiwiX3JlZnJlc2hNZW51UGFnZVdpZHRoIiwiZW5hYmxlZCIsIl9hY3RpdmF0ZUdlc3R1cmVEZXRlY3RvciIsIl9kZWFjdGl2YXRlR2VzdHVyZURldGVjdG9yIiwiX3JlY2FsY3VsYXRlTUFYIiwiaW5kZXhPZiIsInBhcnNlSW50IiwicmVwbGFjZSIsInBhcnNlRmxvYXQiLCJfZ2VzdHVyZURldGVjdG9yIiwiZHJhZ01pbkRpc3RhbmNlIiwiX2FwcGVuZE1haW5QYWdlIiwicGFnZVVybCIsInRlbXBsYXRlSFRNTCIsInBhZ2VDb250ZW50IiwiYXBwZW5kIiwiX2N1cnJlbnRQYWdlRWxlbWVudCIsIl9jdXJyZW50UGFnZVNjb3BlIiwiX2N1cnJlbnRQYWdlVXJsIiwiX3Nob3ciLCJfYXBwZW5kTWVudVBhZ2UiLCJfY3VycmVudE1lbnVQYWdlU2NvcGUiLCJfY3VycmVudE1lbnVQYWdlRWxlbWVudCIsImdldFBhZ2VIVE1MQXN5bmMiLCJodG1sIiwiaXNMb2NrZWQiLCJfaXNJbnNpZGVJZ25vcmVkRWxlbWVudCIsIl9pc0luc2lkZVN3aXBlVGFyZ2V0QXJlYSIsImdlc3R1cmUiLCJwcmV2ZW50RGVmYXVsdCIsImRlbHRhWCIsImRlbHRhRGlzdGFuY2UiLCJzdGFydEV2ZW50Iiwic3RvcERldGVjdCIsIl9sYXN0RGlzdGFuY2UiLCJnZXRBdHRyaWJ1dGUiLCJjZW50ZXIiLCJwYWdlWCIsIl9zd2lwZVRhcmdldFdpZHRoIiwiX2dldFN3aXBlVGFyZ2V0V2lkdGgiLCJ0YXJnZXRXaWR0aCIsInN3aXBlVGFyZ2V0V2lkdGgiLCJzbGlkaW5nTWVudSIsIndhaXRVbmxvY2siLCJhbmltYXRpb24iLCJjaGlsZHJlbiIsInRvZ2dsZU1lbnUiLCJjbG9zZUNsb3NlIiwiU3BlZWREaWFsVmlldyIsIiRvbnNHbG9iYWwiLCJTUExJVF9NT0RFIiwiQ09MTEFQU0VfTU9ERSIsIk1BSU5fUEFHRV9SQVRJTyIsIlNwbGl0VmlldyIsImFkZENsYXNzIiwiX3NlY29uZGFyeVBhZ2UiLCJfbWF4IiwiX21vZGUiLCJfZG9TcGxpdCIsIl9kb0NvbGxhcHNlIiwib3JpZW50YXRpb24iLCJfb25SZXNpemUiLCJzZWNvbmRhcnlQYWdlIiwic2V0U2Vjb25kYXJ5UGFnZSIsIl9jb25zaWRlckNoYW5naW5nQ29sbGFwc2UiLCJfc2V0U2l6ZSIsIl9hcHBlbmRTZWNvbmRQYWdlIiwiX2N1cnJlbnRTZWNvbmRhcnlQYWdlRWxlbWVudCIsIl9jdXJyZW50U2Vjb25kYXJ5UGFnZVNjb3BlIiwiX2N1cnJlbnRQYWdlIiwidHJpbSIsImxhc3RNb2RlIiwic2hvdWxkIiwiX3Nob3VsZENvbGxhcHNlIiwiX2ZpcmVVcGRhdGVFdmVudCIsIl9hY3RpdmF0ZVNwbGl0TW9kZSIsIl9hY3RpdmF0ZUNvbGxhcHNlTW9kZSIsInVwZGF0ZSIsIl9nZXRPcmllbnRhdGlvbiIsImlzUG9ydHJhaXQiLCJnZXRDdXJyZW50TW9kZSIsImMiLCJjb2xsYXBzZSIsImlzTGFuZHNjYXBlIiwic3Vic3RyIiwibnVtIiwic3BsaXQiLCJpbm5lcldpZHRoIiwibXEiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIm1haW5QYWdlV2lkdGgiLCJzZWNvbmRhcnlTaXplIiwiX2ZpcmVFdmVudCIsInNwbGl0VmlldyIsInRoYXQiLCJzaG91bGRDb2xsYXBzZSIsImN1cnJlbnRNb2RlIiwibiIsImlzRmluaXRlIiwiU3BsaXR0ZXJDb250ZW50IiwibG9hZCIsIl9wYWdlU2NvcGUiLCJfbGluayIsImZyYWdtZW50IiwiU3BsaXR0ZXJTaWRlIiwiU3BsaXR0ZXIiLCJwcm9wIiwidGFnTmFtZSIsIlN3aXRjaFZpZXciLCJfY2hlY2tib3giLCJfcHJlcGFyZU5nTW9kZWwiLCJuZ01vZGVsIiwiYXNzaWduIiwiJHBhcmVudCIsImNoZWNrZWQiLCJuZ0NoYW5nZSIsIlRhYmJhck5vbmVBbmltYXRvciIsIlRhYmJhckZhZGVBbmltYXRvciIsIlRhYmJhclNsaWRlQW5pbWF0b3IiLCJUYWJiYXJWaWV3IiwiX2xhc3RQYWdlRWxlbWVudCIsIl9sYXN0UGFnZVNjb3BlIiwiVGFiYmFyRWxlbWVudCIsImRpcmVjdGl2ZSIsInJlc3RyaWN0IiwidHJhbnNjbHVkZSIsInByZSIsInJlZ2lzdGVyRXZlbnRIYW5kbGVycyIsInBvc3QiLCJmaXJlQ29tcG9uZW50RXZlbnQiLCJDb21wb25lbnRDbGVhbmVyIiwiY29udHJvbGxlciIsImJhY2tCdXR0b24iLCJkZXN0cm95U2NvcGUiLCJkZXN0cm95QXR0cmlidXRlcyIsImJ1dHRvbiIsImRpc2FibGVkIiwicGFyZW50RWxlbWVudCIsIl9zZXR1cCIsIl9zZXR1cEluaXRpYWxJbmRleCIsIl9zYXZlTGFzdFN0YXRlIiwiaXNSZWFkeSIsIiRicm9hZGNhc3QiLCJmYWIiLCJFVkVOVFMiLCJzY29wZURlZiIsInJlZHVjZSIsImRpY3QiLCJ0aXRsaXplIiwic3RyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsIl8iLCJoYW5kbGVyIiwiZ2VzdHVyZURldGVjdG9yIiwiam9pbiIsImljb24iLCJfdXBkYXRlIiwidXNlck9yaWVudGF0aW9uIiwib25zSWZPcmllbnRhdGlvbiIsImdldExhbmRzY2FwZU9yUG9ydHJhaXQiLCJwbGF0Zm9ybSIsImdldFBsYXRmb3JtU3RyaW5nIiwidXNlclBsYXRmb3JtIiwidXNlclBsYXRmb3JtcyIsIm9uc0lmUGxhdGZvcm0iLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImlzT3BlcmEiLCJvcGVyYSIsImlzRmlyZWZveCIsIkluc3RhbGxUcmlnZ2VyIiwiaXNTYWZhcmkiLCJ0b1N0cmluZyIsImNhbGwiLCJpc0VkZ2UiLCJpc0Nocm9tZSIsImNocm9tZSIsImlzSUUiLCJkb2N1bWVudE1vZGUiLCJlbCIsIm9uSW5wdXQiLCJfaXNUZXh0SW5wdXQiLCJjb21waWxlRnVuY3Rpb24iLCJkaXNwU2hvdyIsImRpc3BIaWRlIiwib25TaG93Iiwib25IaWRlIiwib25Jbml0IiwiZSIsInZpc2libGUiLCJzb2Z0d2FyZUtleWJvYXJkIiwiX3Zpc2libGUiLCJwcmlvcml0eSIsInRlcm1pbmFsIiwibGF6eVJlcGVhdCIsIm9uc0xvYWRpbmdQbGFjZWhvbGRlciIsIl9yZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyIiwiY29udGVudEVsZW1lbnQiLCJtb2RhbCIsIk5hdmlnYXRvckVsZW1lbnQiLCJyZXdyaXRhYmxlcyIsInJlYWR5IiwibGFzdExpbmsiLCJuYXZpZ2F0b3JFbGVtZW50IiwiZmlyZVBhZ2VJbml0RXZlbnQiLCJmIiwiaXNBdHRhY2hlZCIsImZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwicG9zdExpbmsiLCJtYWluIiwibWVudSIsIm1haW5IdG1sIiwibWVudUh0bWwiLCJzcGVlZERpYWwiLCJzZWNvbmRhcnlIdG1sIiwic3BsaXR0ZXIiLCJTcGxpdHRlckNvbnRlbnRFbGVtZW50IiwiU3BsaXR0ZXJTaWRlRWxlbWVudCIsIm5nQ29udHJvbGxlciIsInN3aXRjaFZpZXciLCJ0YWIiLCIkaW5qZWN0IiwidGFiYmFyRWxlbWVudCIsImxhc3RVbmxpbmsiLCJ1bmxpbmsiLCJoaWRlVGFicyIsInNldFRhYmJhclZpc2liaWxpdHkiLCJ0YWJiYXJWaWV3IiwiY29udGVudCIsInRlbXBsYXRlIiwidG9vbGJhckJ1dHRvbiIsImRlY29tcG9zZU5vZGUiLCIkJGVsZW1lbnQiLCIkJG9ic2VydmVycyIsImRlc3Ryb3lFbGVtZW50IiwiJCRsaXN0ZW5lcnMiLCIkJHdhdGNoZXJzIiwiY2xlYXIiLCJuZ0V2ZW50RGlyZWN0aXZlcyIsImRpcmVjdGl2ZU5hbWUiLCJkaXJlY3RpdmVOb3JtYWxpemUiLCIkZWxlbWVudCIsImxpc3RlbmVyIiwiJGFwcGx5IiwiY29uZmlnIiwiJHByb3ZpZGUiLCJzaGlmdCIsIiRkZWxlZ2F0ZSIsImRlY29yYXRvciIsIiR3aW5kb3ciLCIkY2FjaGVGYWN0b3J5IiwiJGRvY3VtZW50IiwiJGh0dHAiLCJjcmVhdGVPbnNlblNlcnZpY2UiLCJNb2RpZmllclV0aWwiLCJESVJFQ1RJVkVfVEVNUExBVEVfVVJMIiwiRGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiZ2V0RGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwibWV0aG9kTmFtZXMiLCJtZXRob2ROYW1lIiwia2xhc3MiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHkiLCJldmVudE5hbWVzIiwibWFwIiwibGlzdGVuZXJzIiwiZXZlbnROYW1lIiwicHVzaCIsImlzRW5hYmxlZEF1dG9TdGF0dXNCYXJGaWxsIiwiX2NvbmZpZyIsImF1dG9TdGF0dXNCYXJGaWxsIiwic2hvdWxkRmlsbFN0YXR1c0JhciIsInBhcmFtcyIsImVsZW1lbnRzIiwiZmluZEVsZW1lbnRlT2JqZWN0IiwiZGVmZXJyZWQiLCJkZWZlciIsIm5vcm1hbGl6ZVBhZ2VIVE1MIiwicHJvbWlzZSIsInVybCIsIm1ldGhvZCIsInJlc3BvbnNlIiwiZ2VuZXJhdGVNb2RpZmllclRlbXBsYXRlciIsIm1vZGlmaWVycyIsImF0dHJNb2RpZmllcnMiLCJtb2RpZmllciIsIm1ldGhvZHMiLCJoYXNNb2RpZmllciIsIm5lZWRsZSIsInRva2VucyIsInNvbWUiLCJyZW1vdmVNb2RpZmllciIsImZpbHRlciIsInRva2VuIiwiYWRkTW9kaWZpZXIiLCJzZXRNb2RpZmllciIsInRvZ2dsZU1vZGlmaWVyIiwiX3RyIiwiZm5zIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsYXNzZXMiLCJwYXR0IiwiY2xzIiwib2xkRm4iLCJuZXdGbiIsIm9iamVjdCIsInZhciIsInZhck5hbWUiLCJfZGVmaW5lVmFyIiwiX3JlZ2lzdGVyRXZlbnRIYW5kbGVyIiwiY29tcG9uZW50IiwiY2FwaXRhbGl6ZWRFdmVudE5hbWUiLCJsIiwiaXNBbmRyb2lkIiwiaXNJT1MiLCJpc1dlYlZpZXciLCJpc0lPUzdhYm92ZSIsInVhIiwicmVzdWx0Iiwia2V5IiwibmFtZXMiLCJjb250YWluZXIiLCJoYXNBdHRyaWJ1dGUiLCJvcmlnaW5hbE5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbiIsIm1lc3NhZ2UiLCJpbmplY3RvciIsImpRdWVyeSIsIndhcm4iLCJ0ZW1wbGF0ZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWQiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7QUFLQSxDQUFDLFlBQVc7QUFDVjs7QUFDQSxNQUFJQSxTQUFTLE1BQU1DLElBQU4sQ0FBVyxZQUFVO0FBQUNDO0FBQUssR0FBM0IsSUFBK0IsWUFBL0IsR0FBOEMsSUFBM0Q7O0FBRUE7QUFDQSxXQUFTQyxTQUFULEdBQW9CLENBQUU7O0FBRXRCO0FBQ0FBLFlBQVVDLE1BQVYsR0FBbUIsVUFBU0MsS0FBVCxFQUFnQjtBQUNqQyxRQUFJQyxTQUFTLEtBQUtDLFNBQWxCOztBQUVBO0FBQ0E7QUFDQSxRQUFJQyxRQUFRQyxPQUFPQyxNQUFQLENBQWNKLE1BQWQsQ0FBWjs7QUFFQTtBQUNBLFNBQUssSUFBSUssSUFBVCxJQUFpQk4sS0FBakIsRUFBd0I7QUFDdEI7QUFDQUcsWUFBTUcsSUFBTixJQUFjLE9BQU9OLE1BQU1NLElBQU4sQ0FBUCxLQUF1QixVQUF2QixJQUNaLE9BQU9MLE9BQU9LLElBQVAsQ0FBUCxJQUF1QixVQURYLElBQ3lCWCxPQUFPQyxJQUFQLENBQVlJLE1BQU1NLElBQU4sQ0FBWixDQUR6QixHQUVULFVBQVNBLElBQVQsRUFBZUMsRUFBZixFQUFrQjtBQUNqQixlQUFPLFlBQVc7QUFDaEIsY0FBSUMsTUFBTSxLQUFLUCxNQUFmOztBQUVBO0FBQ0E7QUFDQSxlQUFLQSxNQUFMLEdBQWNBLE9BQU9LLElBQVAsQ0FBZDs7QUFFQTtBQUNBO0FBQ0EsY0FBSUcsTUFBTUYsR0FBR0csS0FB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N3JCLE9BQU9tQixRQUFQLENBQWdCMnFCLGdCQUFoQixDQUFpQyxrQ0FBakMsQ0FBaEI7O0FBRUEsU0FBSyxJQUFJOWdCLElBQUksQ0FBYixFQUFnQkEsSUFBSTZnQixVQUFVOWUsTUFBOUIsRUFBc0MvQixHQUF0QyxFQUEyQztBQUN6QyxVQUFJdWEsV0FBV3BsQixRQUFRZ0QsT0FBUixDQUFnQjBvQixVQUFVN2dCLENBQVYsQ0FBaEIsQ0FBZjtBQUNBLFVBQUkrZ0IsS0FBS3hHLFNBQVNyYixJQUFULENBQWMsSUFBZCxDQUFUO0FBQ0EsVUFBSSxPQUFPNmhCLEVBQVAsS0FBYyxRQUFsQixFQUE0QjtBQUMxQnhyQix1QkFBZUMsR0FBZixDQUFtQnVyQixFQUFuQixFQUF1QnhHLFNBQVN5RyxJQUFULEVBQXZCO0FBQ0Q7QUFDRjtBQUNGLEdBVjJCLENBQTVCO0FBWUQsQ0FmRCIsImZpbGUiOiJhbmd1bGFyLW9uc2VudWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBTaW1wbGUgSmF2YVNjcmlwdCBJbmhlcml0YW5jZSBmb3IgRVMgNS4xXG4gKiBiYXNlZCBvbiBodHRwOi8vZWpvaG4ub3JnL2Jsb2cvc2ltcGxlLWphdmFzY3JpcHQtaW5oZXJpdGFuY2UvXG4gKiAgKGluc3BpcmVkIGJ5IGJhc2UyIGFuZCBQcm90b3R5cGUpXG4gKiBNSVQgTGljZW5zZWQuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBmblRlc3QgPSAveHl6Ly50ZXN0KGZ1bmN0aW9uKCl7eHl6O30pID8gL1xcYl9zdXBlclxcYi8gOiAvLiovO1xuXG4gIC8vIFRoZSBiYXNlIENsYXNzIGltcGxlbWVudGF0aW9uIChkb2VzIG5vdGhpbmcpXG4gIGZ1bmN0aW9uIEJhc2VDbGFzcygpe31cblxuICAvLyBDcmVhdGUgYSBuZXcgQ2xhc3MgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgY2xhc3NcbiAgQmFzZUNsYXNzLmV4dGVuZCA9IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgdmFyIF9zdXBlciA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgLy8gU2V0IHVwIHRoZSBwcm90b3R5cGUgdG8gaW5oZXJpdCBmcm9tIHRoZSBiYXNlIGNsYXNzXG4gICAgLy8gKGJ1dCB3aXRob3V0IHJ1bm5pbmcgdGhlIGluaXQgY29uc3RydWN0b3IpXG4gICAgdmFyIHByb3RvID0gT2JqZWN0LmNyZWF0ZShfc3VwZXIpO1xuXG4gICAgLy8gQ29weSB0aGUgcHJvcGVydGllcyBvdmVyIG9udG8gdGhlIG5ldyBwcm90b3R5cGVcbiAgICBmb3IgKHZhciBuYW1lIGluIHByb3BzKSB7XG4gICAgICAvLyBDaGVjayBpZiB3ZSdyZSBvdmVyd3JpdGluZyBhbiBleGlzdGluZyBmdW5jdGlvblxuICAgICAgcHJvdG9bbmFtZV0gPSB0eXBlb2YgcHJvcHNbbmFtZV0gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICB0eXBlb2YgX3N1cGVyW25hbWVdID09IFwiZnVuY3Rpb25cIiAmJiBmblRlc3QudGVzdChwcm9wc1tuYW1lXSlcbiAgICAgICAgPyAoZnVuY3Rpb24obmFtZSwgZm4pe1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5fc3VwZXI7XG5cbiAgICAgICAgICAgICAgLy8gQWRkIGEgbmV3IC5fc3VwZXIoKSBtZXRob2QgdGhhdCBpcyB0aGUgc2FtZSBtZXRob2RcbiAgICAgICAgICAgICAgLy8gYnV0IG9uIHRoZSBzdXBlci1jbGFzc1xuICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IF9zdXBlcltuYW1lXTtcblxuICAgICAgICAgICAgICAvLyBUaGUgbWV0aG9kIG9ubHkgbmVlZCB0byBiZSBib3VuZCB0ZW1wb3JhcmlseSwgc28gd2VcbiAgICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IHdoZW4gd2UncmUgZG9uZSBleGVjdXRpbmdcbiAgICAgICAgICAgICAgdmFyIHJldCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gdG1wO1xuXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKG5hbWUsIHByb3BzW25hbWVdKVxuICAgICAgICA6IHByb3BzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIFRoZSBuZXcgY29uc3RydWN0b3JcbiAgICB2YXIgbmV3Q2xhc3MgPSB0eXBlb2YgcHJvdG8uaW5pdCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHByb3RvLmhhc093blByb3BlcnR5KFwiaW5pdFwiKVxuICAgICAgICA/IHByb3RvLmluaXQgLy8gQWxsIGNvbnN0cnVjdGlvbiBpcyBhY3R1YWxseSBkb25lIGluIHRoZSBpbml0IG1ldGhvZFxuICAgICAgICA6IGZ1bmN0aW9uIFN1YkNsYXNzKCl7IF9zdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cbiAgICAgIDogZnVuY3Rpb24gRW1wdHlDbGFzcygpe307XG5cbiAgICAvLyBQb3B1bGF0ZSBvdXIgY29uc3RydWN0ZWQgcHJvdG90eXBlIG9iamVjdFxuICAgIG5ld0NsYXNzLnByb3RvdHlwZSA9IHByb3RvO1xuXG4gICAgLy8gRW5mb3JjZSB0aGUgY29uc3RydWN0b3IgdG8gYmUgd2hhdCB3ZSBleHBlY3RcbiAgICBwcm90by5jb25zdHJ1Y3RvciA9IG5ld0NsYXNzO1xuXG4gICAgLy8gQW5kIG1ha2UgdGhpcyBjbGFzcyBleHRlbmRhYmxlXG4gICAgbmV3Q2xhc3MuZXh0ZW5kID0gQmFzZUNsYXNzLmV4dGVuZDtcblxuICAgIHJldHVybiBuZXdDbGFzcztcbiAgfTtcblxuICAvLyBleHBvcnRcbiAgd2luZG93LkNsYXNzID0gQmFzZUNsYXNzO1xufSkoKTtcbiIsIi8vSEVBRCBcbihmdW5jdGlvbihhcHApIHtcbnRyeSB7IGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwidGVtcGxhdGVzLW1haW5cIik7IH1cbmNhdGNoKGVycikgeyBhcHAgPSBhbmd1bGFyLm1vZHVsZShcInRlbXBsYXRlcy1tYWluXCIsIFtdKTsgfVxuYXBwLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbiR0ZW1wbGF0ZUNhY2hlLnB1dChcInRlbXBsYXRlcy9zbGlkaW5nX21lbnUudHBsXCIsXCI8ZGl2IGNsYXNzPVxcXCJvbnNlbi1zbGlkaW5nLW1lbnVfX21lbnVcXFwiPjwvZGl2PlxcblwiICtcbiAgICBcIjxkaXYgY2xhc3M9XFxcIm9uc2VuLXNsaWRpbmctbWVudV9fbWFpblxcXCI+PC9kaXY+XFxuXCIgK1xuICAgIFwiXCIpXG5cbiR0ZW1wbGF0ZUNhY2hlLnB1dChcInRlbXBsYXRlcy9zcGxpdF92aWV3LnRwbFwiLFwiPGRpdiBjbGFzcz1cXFwib25zZW4tc3BsaXQtdmlld19fc2Vjb25kYXJ5IGZ1bGwtc2NyZWVuXFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCI8ZGl2IGNsYXNzPVxcXCJvbnNlbi1zcGxpdC12aWV3X19tYWluIGZ1bGwtc2NyZWVuXFxcIj48L2Rpdj5cXG5cIiArXG4gICAgXCJcIilcbn1dKTtcbn0pKCk7IiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHNlcnZpY2UgY2xhc3MgZm9yIGZyYW1ld29yayBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCckb25zZW4nLCBbJyRyb290U2NvcGUnLCAnJHdpbmRvdycsICckY2FjaGVGYWN0b3J5JywgJyRkb2N1bWVudCcsICckdGVtcGxhdGVDYWNoZScsICckaHR0cCcsICckcScsICckb25zR2xvYmFsJywgJ0NvbXBvbmVudENsZWFuZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkd2luZG93LCAkY2FjaGVGYWN0b3J5LCAkZG9jdW1lbnQsICR0ZW1wbGF0ZUNhY2hlLCAkaHR0cCwgJHEsICRvbnNHbG9iYWwsIENvbXBvbmVudENsZWFuZXIpIHtcblxuICAgIHZhciAkb25zZW4gPSBjcmVhdGVPbnNlblNlcnZpY2UoKTtcbiAgICB2YXIgTW9kaWZpZXJVdGlsID0gJG9uc0dsb2JhbC5faW50ZXJuYWwuTW9kaWZpZXJVdGlsO1xuXG4gICAgcmV0dXJuICRvbnNlbjtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9uc2VuU2VydmljZSgpIHtcbiAgICAgIHJldHVybiB7XG5cbiAgICAgICAgRElSRUNUSVZFX1RFTVBMQVRFX1VSTDogJ3RlbXBsYXRlcycsXG5cbiAgICAgICAgY2xlYW5lcjogQ29tcG9uZW50Q2xlYW5lcixcblxuICAgICAgICBEZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGV2aWNlQmFja0J1dHRvbkRpc3BhdGNoZXIsXG5cbiAgICAgICAgX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtZXRob2ROYW1lc1xuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3Bvc2UgYWxsIGRyaXZpbmcgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZU1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIG1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2aWV3W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50W21ldGhvZE5hbWVdLmFwcGx5KGVsZW1lbnQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtDbGFzc30ga2xhc3NcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50OiBmdW5jdGlvbihrbGFzcywgcHJvcGVydGllcykge1xuICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtsYXNzLnByb3RvdHlwZSwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldID0gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50TmFtZXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW21hcF1cbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBjbGVhciBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVFdmVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIGV2ZW50TmFtZXMsIG1hcCkge1xuICAgICAgICAgIG1hcCA9IG1hcCB8fCBmdW5jdGlvbihkZXRhaWwpIHsgcmV0dXJuIGRldGFpbDsgfTtcbiAgICAgICAgICBldmVudE5hbWVzID0gW10uY29uY2F0KGV2ZW50TmFtZXMpO1xuICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHZpZXcuZW1pdChldmVudE5hbWUsIG1hcChPYmplY3QuY3JlYXRlKGV2ZW50LmRldGFpbCkpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJzW2luZGV4XSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IGxpc3RlbmVycyA9IG1hcCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzRW5hYmxlZEF1dG9TdGF0dXNCYXJGaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISEkb25zR2xvYmFsLl9jb25maWcuYXV0b1N0YXR1c0JhckZpbGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRGaWxsU3RhdHVzQmFyOiAkb25zR2xvYmFsLnNob3VsZEZpbGxTdGF0dXNCYXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b1N0YXR1c0JhckZpbGw6ICRvbnNHbG9iYWwuYXV0b1N0YXR1c0JhckZpbGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgICAgICogQHBhcmFtIHtTY29wZX0gW3BhcmFtcy5zY29wZV1cbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IFtwYXJhbXMuZWxlbWVudF1cbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW3BhcmFtcy5lbGVtZW50c11cbiAgICAgICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBbcGFyYW1zLmF0dHJzXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xlYXJDb21wb25lbnQ6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICAgIGlmIChwYXJhbXMuc2NvcGUpIHtcbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHBhcmFtcy5zY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5hdHRycykge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhwYXJhbXMuYXR0cnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuZWxlbWVudCkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95RWxlbWVudChwYXJhbXMuZWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50cykge1xuICAgICAgICAgICAgcGFyYW1zLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZEVsZW1lbnRlT2JqZWN0OiBmdW5jdGlvbihlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaW5oZXJpdGVkRGF0YShuYW1lKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBhZ2VIVE1MQXN5bmM6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICB2YXIgY2FjaGUgPSAkdGVtcGxhdGVDYWNoZS5nZXQocGFnZSk7XG5cbiAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIHZhciBodG1sID0gdHlwZW9mIGNhY2hlID09PSAnc3RyaW5nJyA/IGNhY2hlIDogY2FjaGVbMV07XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICB1cmw6IHBhZ2UsXG4gICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgdmFyIGh0bWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZVBhZ2VIVE1MKGh0bWwpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIG5vcm1hbGl6ZVBhZ2VIVE1MOiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaHRtbCA9ICgnJyArIGh0bWwpLnRyaW0oKTtcblxuICAgICAgICAgIGlmICghaHRtbC5tYXRjaCgvXjxvbnMtcGFnZS8pKSB7XG4gICAgICAgICAgICBodG1sID0gJzxvbnMtcGFnZSBfbXV0ZWQ+JyArIGh0bWwgKyAnPC9vbnMtcGFnZT4nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgbW9kaWZpZXIgdGVtcGxhdGVyIGZ1bmN0aW9uLiBUaGUgbW9kaWZpZXIgdGVtcGxhdGVyIGdlbmVyYXRlIGNzcyBjbGFzc2VzIGJvdW5kIG1vZGlmaWVyIG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbbW9kaWZpZXJzXSBhbiBhcnJheSBvZiBhcHBlbmRpeCBtb2RpZmllclxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdlbmVyYXRlTW9kaWZpZXJUZW1wbGF0ZXI6IGZ1bmN0aW9uKGF0dHJzLCBtb2RpZmllcnMpIHtcbiAgICAgICAgICB2YXIgYXR0ck1vZGlmaWVycyA9IGF0dHJzICYmIHR5cGVvZiBhdHRycy5tb2RpZmllciA9PT0gJ3N0cmluZycgPyBhdHRycy5tb2RpZmllci50cmltKCkuc3BsaXQoLyArLykgOiBbXTtcbiAgICAgICAgICBtb2RpZmllcnMgPSBhbmd1bGFyLmlzQXJyYXkobW9kaWZpZXJzKSA/IGF0dHJNb2RpZmllcnMuY29uY2F0KG1vZGlmaWVycykgOiBhdHRyTW9kaWZpZXJzO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSB0ZW1wbGF0ZSBlZy4gJ29ucy1idXR0b24tLSonLCAnb25zLWJ1dHRvbi0tKl9faXRlbSdcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kaWZpZXJzLm1hcChmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgnKicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgbW9kaWZpZXIgbWV0aG9kcyB0byB2aWV3IG9iamVjdCBmb3IgY3VzdG9tIGVsZW1lbnRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzOiBmdW5jdGlvbih2aWV3LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBoYXNNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBNb2RpZmllclV0aWwuc3BsaXQoZWxlbWVudC5hdHRyKCdtb2RpZmllcicpKTtcbiAgICAgICAgICAgICAgbmVlZGxlID0gdHlwZW9mIG5lZWRsZSA9PT0gJ3N0cmluZycgPyBuZWVkbGUudHJpbSgpIDogJyc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIE1vZGlmaWVyVXRpbC5zcGxpdChuZWVkbGUpLnNvbWUoZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2Vucy5pbmRleE9mKG5lZWRsZSkgIT0gLTE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICB2YXIgbW9kaWZpZXIgPSBNb2RpZmllclV0aWwuc3BsaXQoZWxlbWVudC5hdHRyKCdtb2RpZmllcicpKS5maWx0ZXIoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gIT09IG5lZWRsZTtcbiAgICAgICAgICAgICAgfSkuam9pbignICcpO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIGVsZW1lbnQuYXR0cignbW9kaWZpZXInKSArICcgJyArIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc01vZGlmaWVyKG1vZGlmaWVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kaWZpZXIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTW9kaWZpZXIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZvciAodmFyIG1ldGhvZCBpbiBtZXRob2RzKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kXSA9IG1ldGhvZHNbbWV0aG9kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBhZGRNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIHRlbXBsYXRlLCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIF90ciA9IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgnKicsIG1vZGlmaWVyKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGZucyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5oYXNDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZU1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYWRkTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmF0dHIoJ2NsYXNzJykuc3BsaXQoL1xccysvKSxcbiAgICAgICAgICAgICAgICAgIHBhdHQgPSB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgJy4nKTtcblxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gY2xhc3Nlc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChjbHMubWF0Y2gocGF0dCkpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHZhciBjbHMgPSBfdHIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcyhjbHMpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYXBwZW5kID0gZnVuY3Rpb24ob2xkRm4sIG5ld0ZuKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9sZEZuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZEZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfHwgbmV3Rm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXdGbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmlldy5oYXNNb2RpZmllciA9IGFwcGVuZCh2aWV3Lmhhc01vZGlmaWVyLCBmbnMuaGFzTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcucmVtb3ZlTW9kaWZpZXIgPSBhcHBlbmQodmlldy5yZW1vdmVNb2RpZmllciwgZm5zLnJlbW92ZU1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuYWRkTW9kaWZpZXIsIGZucy5hZGRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5zZXRNb2RpZmllciA9IGFwcGVuZCh2aWV3LnNldE1vZGlmaWVyLCBmbnMuc2V0TW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcudG9nZ2xlTW9kaWZpZXIgPSBhcHBlbmQodmlldy50b2dnbGVNb2RpZmllciwgZm5zLnRvZ2dsZU1vZGlmaWVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIG1vZGlmaWVyIG1ldGhvZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlTW9kaWZpZXJNZXRob2RzOiBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgICAgdmlldy5oYXNNb2RpZmllciA9IHZpZXcucmVtb3ZlTW9kaWZpZXIgPVxuICAgICAgICAgICAgdmlldy5hZGRNb2RpZmllciA9IHZpZXcuc2V0TW9kaWZpZXIgPVxuICAgICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdmFyaWFibGUgdG8gSmF2YVNjcmlwdCBnbG9iYWwgc2NvcGUgYW5kIEFuZ3VsYXJKUyBzY29wZSBhcyAndmFyJyBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGRlY2xhcmVWYXJBdHRyaWJ1dGU6IGZ1bmN0aW9uKGF0dHJzLCBvYmplY3QpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGF0dHJzLnZhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciB2YXJOYW1lID0gYXR0cnMudmFyO1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5lVmFyKHZhck5hbWUsIG9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZWdpc3RlckV2ZW50SGFuZGxlcjogZnVuY3Rpb24oY29tcG9uZW50LCBldmVudE5hbWUpIHtcbiAgICAgICAgICB2YXIgY2FwaXRhbGl6ZWRFdmVudE5hbWUgPSBldmVudE5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBldmVudE5hbWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICBjb21wb25lbnQub24oZXZlbnROYW1lLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChjb21wb25lbnQuX2VsZW1lbnRbMF0sIGV2ZW50TmFtZSwgZXZlbnQpO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGNvbXBvbmVudC5fYXR0cnNbJ29ucycgKyBjYXBpdGFsaXplZEV2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsKGhhbmRsZXIsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVycyBmb3IgYXR0cmlidXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBldmVudE5hbWVzID0gZXZlbnROYW1lcy50cmltKCkuc3BsaXQoL1xccysvKTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnROYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudE5hbWVzW2ldO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudEhhbmRsZXIoY29tcG9uZW50LCBldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzQW5kcm9pZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2FuZHJvaWQvaSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpcGFkfGlwaG9uZXxpcG9kIHRvdWNoKS9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzV2ViVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5vbnMuaXNXZWJWaWV3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzdhYm92ZTogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCB0b3VjaCk7LipDUFUuKk9TIChcXGQrKV8oXFxkKykvaSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzJdICsgJy4nICsgbWF0Y2hbM10pID49IDcgOiBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZSBhIG5hbWVkIGV2ZW50IGZvciBhIGNvbXBvbmVudC4gVGhlIHZpZXcgb2JqZWN0LCBpZiBpdCBleGlzdHMsIGlzIGF0dGFjaGVkIHRvIGV2ZW50LmNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpcmVDb21wb25lbnRFdmVudDogZnVuY3Rpb24oZG9tLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBldmVudFtrZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LmNvbXBvbmVudCA9IGRvbSA/XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9tKS5kYXRhKGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgICBldmVudC5pbml0RXZlbnQoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnOicgKyBldmVudE5hbWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZG9tLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vJywgJ2Zvby12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vIGFuZCAkc2NvcGUuZm9vIGlzIG5vdyAnZm9vLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vLmJhcicsICdmb28tYmFyLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28uYmFyIGFuZCAkc2NvcGUuZm9vLmJhciBpcyBub3cgJ2Zvby1iYXItdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZpbmVWYXI6IGZ1bmN0aW9uKG5hbWUsIG9iamVjdCkge1xuICAgICAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoL1xcLi8pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0KGNvbnRhaW5lciwgbmFtZXMsIG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZV0gPT09IHVuZGVmaW5lZCB8fCBjb250YWluZXJbbmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJbbmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dICE9PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHZhcj1cIicgKyBvYmplY3QuX2F0dHJzLnZhciArICdcIiBiZWNhdXNlIGl0IHdpbGwgb3ZlcndyaXRlIGEgcmVhZC1vbmx5IHZhcmlhYmxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvbnMuY29tcG9uZW50QmFzZSkge1xuICAgICAgICAgICAgc2V0KG9ucy5jb21wb25lbnRCYXNlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBdHRhY2ggdG8gYW5jZXN0b3Igd2l0aCBvbnMtc2NvcGUgYXR0cmlidXRlLlxuICAgICAgICAgIHZhciBlbGVtZW50ID0gb2JqZWN0Ll9lbGVtZW50WzBdO1xuXG4gICAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdvbnMtc2NvcGUnKSkge1xuICAgICAgICAgICAgICBzZXQoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAvLyBJZiBubyBvbnMtc2NvcGUgZWxlbWVudCB3YXMgZm91bmQsIGF0dGFjaCB0byAkcm9vdFNjb3BlLlxuICAgICAgICAgIHNldCgkcm9vdFNjb3BlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWFsZXJ0LWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYWxlcnQgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruOCouODqeODvOODiOODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBBbGVydCBkaWFsb2cgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBbGVydERpYWxvZycsIFsnJG9uc2VuJywgJ0FsZXJ0RGlhbG9nVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgQWxlcnREaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIGFsZXJ0RGlhbG9nID0gbmV3IEFsZXJ0RGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhhbGVydERpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoYWxlcnREaWFsb2csIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCBhbGVydERpYWxvZyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBhbGVydERpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWxlcnQtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIlxuLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbGVydERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0FuZHJvaWRBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbmRyb2lkQWxlcnREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdJT1NBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NBbGVydERpYWxvZ0FuaW1hdG9yKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLnZhbHVlKCdBbmltYXRpb25DaG9vc2VyJywgb25zLl9pbnRlcm5hbC5BbmltYXRvckZhY3RvcnkpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtY2Fyb3VzZWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgqvjg6vjg7zjgrvjg6vjgpLooajnpLrjgafjgY3jgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgIJbL2phXVxuICogQGNvZGVwZW4geGJiek9RXG4gKiBAZ3VpZGUgVXNpbmdDYXJvdXNlbFxuICogICBbZW5dTGVhcm4gaG93IHRvIHVzZSB0aGUgY2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV1jYXJvdXNlbOOCs+ODs+ODneODvOODjeODs+ODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1jYXJvdXNlbCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDIwMHB4XCI+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqIDwvb25zLWNhcm91c2VsPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNhcm91c2VsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqvjg6vjg7zjgrvjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXJlZnJlc2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlZnJlc2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlZnJlc2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vdmVyc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvdmVyc2Nyb2xsXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvdmVyc2Nyb2xsXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWwnLCBbJyRvbnNlbicsICdDYXJvdXNlbFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIENhcm91c2VsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIGNhcm91c2VsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoY2Fyb3VzZWwsICdwb3N0Y2hhbmdlIHJlZnJlc2ggb3ZlcnNjcm9sbCBkZXN0cm95Jyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGNhcm91c2VsKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhcm91c2VsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9XSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWxJdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLiRsYXN0KSB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwKCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwSW5pdGlhbEluZGV4KCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NhdmVMYXN0U3RhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNEaWFsb2cnLCBbJyRvbnNlbicsICdEaWFsb2dWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBEaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICB2YXIgZGlhbG9nID0gbmV3IERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBkaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhkaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGRpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIGRpYWxvZyk7XG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGRpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkRpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0lPU0RpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NEaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdBbmRyb2lkRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkFuZHJvaWREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdTbGlkZURpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5TbGlkZURpYWxvZ0FuaW1hdG9yKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWZhYlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbi5bL2VuXVxuICogICBbamFd44GT44Gu44OV44Ot44O844OG44Kj44Oz44Kw44Ki44Kv44K344On44Oz44Oc44K/44Oz44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS44GX44Gm44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRmFiJywgWyckb25zZW4nLCAnRmFiVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgRmFiVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGZhYiA9IG5ldyBGYWJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCBmYWIpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGZhYik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0dlbmVyaWNWaWV3JywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBHZW5lcmljVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGl2ZU9ubHkpIHtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzKHRoaXMsIG9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSwgZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRoaXMsIGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzZWxmKTtcblxuICAgICAgICAgIGlmIChvcHRpb25zLm9uRGVzdHJveSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3koc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNlbGYgPSBlbGVtZW50ID0gc2VsZi5fZWxlbWVudCA9IHNlbGYuX3Njb3BlID0gc2NvcGUgPSBzZWxmLl9hdHRycyA9IGF0dHJzID0gb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnZpZXdLZXlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAqL1xuICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyID0gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMudmlld0tleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMudmlld0tleSBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cblxuICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgdmlldyk7XG5cbiAgICAgIHZhciBkZXN0cm95ID0gb3B0aW9ucy5vbkRlc3Ryb3kgfHwgYW5ndWxhci5ub29wO1xuICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgIGRlc3Ryb3kodmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIG51bGwpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oR2VuZXJpY1ZpZXcpO1xuXG4gICAgcmV0dXJuIEdlbmVyaWNWaWV3O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbGF6eS1yZXBlYXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgVXNpbmcgdGhpcyBjb21wb25lbnQgYSBsaXN0IHdpdGggbWlsbGlvbnMgb2YgaXRlbXMgY2FuIGJlIHJlbmRlcmVkIHdpdGhvdXQgYSBkcm9wIGluIHBlcmZvcm1hbmNlLlxuICogICAgIEl0IGRvZXMgdGhhdCBieSBcImxhemlseVwiIGxvYWRpbmcgZWxlbWVudHMgaW50byB0aGUgRE9NIHdoZW4gdGhleSBjb21lIGludG8gdmlldyBhbmRcbiAqICAgICByZW1vdmluZyBpdGVtcyBmcm9tIHRoZSBET00gd2hlbiB0aGV5IGFyZSBub3QgdmlzaWJsZS5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOWGheOBp+aPj+eUu+OBleOCjOOCi+OCouOCpOODhuODoOOBrkRPTeimgee0oOOBruiqreOBv+i+vOOBv+OBr+OAgeeUu+mdouOBq+imi+OBiOOBneOBhuOBq+OBquOBo+OBn+aZguOBvuOBp+iHquWLleeahOOBq+mBheW7tuOBleOCjOOAgVxuICogICAgIOeUu+mdouOBi+OCieimi+OBiOOBquOBj+OBquOBo+OBn+WgtOWQiOOBq+OBr+OBneOBruimgee0oOOBr+WLleeahOOBq+OCouODs+ODreODvOODieOBleOCjOOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuS9v+OBhuOBk+OBqOOBp+OAgeODkeODleOCqeODvOODnuODs+OCueOCkuWKo+WMluOBleOBm+OCi+OBk+OBqOeEoeOBl+OBq+W3qOWkp+OBquaVsOOBruimgee0oOOCkuaPj+eUu+OBp+OBjeOBvuOBmeOAglxuICogICBbL2phXVxuICogQGNvZGVwZW4gUXdyR0JtXG4gKiBAZ3VpZGUgVXNpbmdMYXp5UmVwZWF0XG4gKiAgIFtlbl1Ib3cgdG8gdXNlIExhenkgUmVwZWF0Wy9lbl1cbiAqICAgW2phXeODrOOCpOOCuOODvOODquODlOODvOODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gKiAgICAgJHNjb3BlLk15RGVsZWdhdGUgPSB7XG4gKiAgICAgICBjb3VudEl0ZW1zOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIG51bWJlciBvZiBpdGVtcy5cbiAqICAgICAgICAgcmV0dXJuIDEwMDAwMDA7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNhbGN1bGF0ZUl0ZW1IZWlnaHQ6IGZ1bmN0aW9uKGluZGV4KSB7XG4gKiAgICAgICAgIC8vIFJldHVybiB0aGUgaGVpZ2h0IG9mIGFuIGl0ZW0gaW4gcGl4ZWxzLlxuICogICAgICAgICByZXR1cm4gNDU7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBJbml0aWFsaXplIHNjb3BlXG4gKiAgICAgICAgIGl0ZW1TY29wZS5pdGVtID0gJ0l0ZW0gIycgKyAoaW5kZXggKyAxKTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgZGVzdHJveUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBPcHRpb25hbCBtZXRob2QgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbiBpdGVtIGlzIHVubG9hZGVkLlxuICogICAgICAgICBjb25zb2xlLmxvZygnRGVzdHJveWVkIGl0ZW0gd2l0aCBpbmRleDogJyArIGluZGV4KTtcbiAqICAgICAgIH1cbiAqICAgICB9O1xuICogICB9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxvbnMtbGlzdCBuZy1jb250cm9sbGVyPVwiTXlDb250cm9sbGVyXCI+XG4gKiAgIDxvbnMtbGlzdC1pdGVtIG9ucy1sYXp5LXJlcGVhdD1cIk15RGVsZWdhdGVcIj5cbiAqICAgICB7eyBpdGVtIH19XG4gKiAgIDwvb25zLWxpc3QtaXRlbT5cbiAqIDwvb25zLWxpc3Q+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sYXp5LXJlcGVhdFxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BIGRlbGVnYXRlIG9iamVjdCwgY2FuIGJlIGVpdGhlciBhbiBvYmplY3QgYXR0YWNoZWQgdG8gdGhlIHNjb3BlICh3aGVuIHVzaW5nIEFuZ3VsYXJKUykgb3IgYSBub3JtYWwgSmF2YVNjcmlwdCB2YXJpYWJsZS5bL2VuXVxuICogIFtqYV3opoHntKDjga7jg63jg7zjg4njgIHjgqLjg7Pjg63jg7zjg4njgarjganjga7lh6bnkIbjgpLlp5TorbLjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJBbmd1bGFySlPjga7jgrnjgrPjg7zjg5fjga7lpInmlbDlkI3jgoTjgIHpgJrluLjjga5KYXZhU2NyaXB044Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBwcm9wZXJ0eSBkZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGVcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRnVuY3Rpb24gd2hpY2ggcmVjaWV2ZXMgYW4gaW5kZXggYW5kIHRoZSBzY29wZSBmb3IgdGhlIGl0ZW0uIENhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB2YWx1ZXMgaW4gdGhlIGl0ZW0gc2NvcGUuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIC8qKlxuICAgKiBMYXp5IHJlcGVhdCBkaXJlY3RpdmUuXG4gICAqL1xuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNMYXp5UmVwZWF0JywgWyckb25zZW4nLCAnTGF6eVJlcGVhdFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIExhenlSZXBlYXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgdGVybWluYWw6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgbGF6eVJlcGVhdCA9IG5ldyBMYXp5UmVwZWF0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBsYXp5UmVwZWF0ID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0FuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUnLCBbJyRjb21waWxlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICAgIGNvbnN0IGRpcmVjdGl2ZUF0dHJpYnV0ZXMgPSBbJ29ucy1sYXp5LXJlcGVhdCcsICdvbnM6bGF6eTpyZXBlYXQnLCAnb25zX2xhenlfcmVwZWF0JywgJ2RhdGEtb25zLWxhenktcmVwZWF0JywgJ3gtb25zLWxhenktcmVwZWF0J107XG4gICAgY2xhc3MgQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZSBleHRlbmRzIG9ucy5faW50ZXJuYWwuTGF6eVJlcGVhdERlbGVnYXRlIHtcbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHVzZXJEZWxlZ2F0ZVxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSB0ZW1wbGF0ZUVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7U2NvcGV9IHBhcmVudFNjb3BlXG4gICAgICAgKi9cbiAgICAgIGNvbnN0cnVjdG9yKHVzZXJEZWxlZ2F0ZSwgdGVtcGxhdGVFbGVtZW50LCBwYXJlbnRTY29wZSkge1xuICAgICAgICBzdXBlcih1c2VyRGVsZWdhdGUsIHRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3BhcmVudFNjb3BlID0gcGFyZW50U2NvcGU7XG5cbiAgICAgICAgZGlyZWN0aXZlQXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4gdGVtcGxhdGVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyKSk7XG4gICAgICAgIHRoaXMuX2xpbmtlciA9ICRjb21waWxlKHRlbXBsYXRlRWxlbWVudCA/IHRlbXBsYXRlRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsKTtcbiAgICAgIH1cblxuICAgICAgY29uZmlndXJlSXRlbVNjb3BlKGl0ZW0sIHNjb3BlKXtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUoaXRlbSwgc2NvcGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3lJdGVtU2NvcGUoaXRlbSwgZWxlbWVudCl7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuZGVzdHJveUl0ZW1TY29wZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fdXNlckRlbGVnYXRlLmRlc3Ryb3lJdGVtU2NvcGUoaXRlbSwgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX3VzaW5nQmluZGluZygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY3JlYXRlSXRlbUNvbnRlbnQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BsYXp5LXJlcGVhdGAgZGVsZWdhdGUgb2JqZWN0IGlzIHZhZ3VlLicpO1xuICAgICAgfVxuXG4gICAgICBsb2FkSXRlbUVsZW1lbnQoaW5kZXgsIHBhcmVudCwgZG9uZSkge1xuICAgICAgICB0aGlzLl9wcmVwYXJlSXRlbUVsZW1lbnQoaW5kZXgsICh7ZWxlbWVudCwgc2NvcGV9KSA9PiB7XG4gICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgIGRvbmUoe2VsZW1lbnQsIHNjb3BlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBfcHJlcGFyZUl0ZW1FbGVtZW50KGluZGV4LCBkb25lKSB7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcy5fcGFyZW50U2NvcGUuJG5ldygpO1xuICAgICAgICB0aGlzLl9hZGRTcGVjaWFsUHJvcGVydGllcyhpbmRleCwgc2NvcGUpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuY29uZmlndXJlSXRlbVNjb3BlKGluZGV4LCBzY29wZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9saW5rZXIoc2NvcGUsIChjbG9uZWQpID0+IHtcbiAgICAgICAgICBsZXQgZWxlbWVudCA9IGNsb25lZFswXTtcbiAgICAgICAgICBpZiAoIXRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KGluZGV4LCBlbGVtZW50KTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb25lKHtlbGVtZW50LCBzY29wZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICovXG4gICAgICBfYWRkU3BlY2lhbFByb3BlcnRpZXMoaSwgc2NvcGUpIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMuY291bnRJdGVtcygpIC0gMTtcbiAgICAgICAgYW5ndWxhci5leHRlbmQoc2NvcGUsIHtcbiAgICAgICAgICAkaW5kZXg6IGksXG4gICAgICAgICAgJGZpcnN0OiBpID09PSAwLFxuICAgICAgICAgICRsYXN0OiBpID09PSBsYXN0LFxuICAgICAgICAgICRtaWRkbGU6IGkgIT09IDAgJiYgaSAhPT0gbGFzdCxcbiAgICAgICAgICAkZXZlbjogaSAlIDIgPT09IDAsXG4gICAgICAgICAgJG9kZDogaSAlIDIgPT09IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgaXRlbS5zY29wZS4kZXZhbEFzeW5jKCgpID0+IHRoaXMuY29uZmlndXJlSXRlbVNjb3BlKGluZGV4LCBpdGVtLnNjb3BlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIudXBkYXRlSXRlbShpbmRleCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbS5zY29wZVxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBpdGVtLmVsZW1lbnRcbiAgICAgICAqL1xuICAgICAgZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgdGhpcy5kZXN0cm95SXRlbVNjb3BlKGluZGV4LCBpdGVtLnNjb3BlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBlci5kZXN0cm95SXRlbShpbmRleCwgaXRlbS5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLnNjb3BlLiRkZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGU7XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1tb2RhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG1vZGFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg6Ljg7zjg4Djg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBNb2RhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc01vZGFsJywgWyckb25zZW4nLCAnTW9kYWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBNb2RhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogKGVsZW1lbnQsIGF0dHJzKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKG1vZGFsLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIG1vZGFsKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgbW9kYWwpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMobW9kYWwpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIG1vZGFsID0gZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1uYXZpZ2F0b3JcbiAqIEBleGFtcGxlXG4gKiA8b25zLW5hdmlnYXRvciBhbmltYXRpb249XCJzbGlkZVwiIHZhcj1cImFwcC5uYXZpXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8b25zLXRvb2xiYXI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+VGl0bGU8L2Rpdj5cbiAqICAgICA8L29ucy10b29sYmFyPlxuICpcbiAqICAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICAgPG9ucy1idXR0b24gbW9kaWZpZXI9XCJsaWdodFwiIG5nLWNsaWNrPVwiYXBwLm5hdmkucHVzaFBhZ2UoJ3BhZ2UuaHRtbCcpO1wiPlB1c2g8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtbmF2aWdhdG9yPlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wb3BQYWdlKCk7XCI+UG9wPC9vbnMtYnV0dG9uPlxuICogICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgbmF2aWdhdG9yLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiuODk+OCsuODvOOCv+ODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVwdXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlcG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXBvcFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cHVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0cG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cG9wXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLk5hdmlnYXRvckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLW5hdmlnYXRvcicsIGxhc3RSZWFkeSk7XG5cbiAgdmFyIGxhc3RMaW5rID0gd2luZG93Lm9ucy5OYXZpZ2F0b3JFbGVtZW50LnJld3JpdGFibGVzLmxpbms7XG4gIHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5saW5rID0gZnVuY3Rpb24obmF2aWdhdG9yRWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciB2aWV3ID0gYW5ndWxhci5lbGVtZW50KG5hdmlnYXRvckVsZW1lbnQpLmRhdGEoJ29ucy1uYXZpZ2F0b3InKTtcbiAgICB2aWV3Ll9jb21waWxlQW5kTGluayh0YXJnZXQsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgbGFzdExpbmsobmF2aWdhdG9yRWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgfSk7XG4gIH07XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNOYXZpZ2F0b3InLCBbJ05hdmlnYXRvclZpZXcnLCAnJG9uc2VuJywgZnVuY3Rpb24oTmF2aWdhdG9yVmlldywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICB2YXIgbmF2aWdhdG9yID0gbmV3IE5hdmlnYXRvclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIG5hdmlnYXRvcik7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKG5hdmlnYXRvciwgJ3ByZXB1c2ggcHJlcG9wIHBvc3RwdXNoIHBvc3Rwb3AgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1uYXZpZ2F0b3InLCBuYXZpZ2F0b3IpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIG5hdmlnYXRvci5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1uYXZpZ2F0b3InLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5OYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnRmFkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRmFkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdJT1NTbGlkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuSU9TU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnTGlmdFRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuTGlmdE5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdOdWxsVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5OYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnU2ltcGxlU2xpZGVUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlNpbXBsZVNsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ092ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yJywgWydTbGlkaW5nTWVudUFuaW1hdG9yJywgZnVuY3Rpb24oU2xpZGluZ01lbnVBbmltYXRvcikge1xuXG4gICAgdmFyIE92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yID0gU2xpZGluZ01lbnVBbmltYXRvci5leHRlbmQoe1xuXG4gICAgICBfYmxhY2tNYXNrOiB1bmRlZmluZWQsXG5cbiAgICAgIF9pc1JpZ2h0OiBmYWxzZSxcbiAgICAgIF9lbGVtZW50OiBmYWxzZSxcbiAgICAgIF9tZW51UGFnZTogZmFsc2UsXG4gICAgICBfbWFpblBhZ2U6IGZhbHNlLFxuICAgICAgX3dpZHRoOiBmYWxzZSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAnOTAlJztcbiAgICAgICAgdGhpcy5faXNSaWdodCA9ICEhb3B0aW9ucy5pc1JpZ2h0O1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UgPSBtYWluUGFnZTtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UgPSBtZW51UGFnZTtcblxuICAgICAgICBtZW51UGFnZS5jc3MoJ2JveC1zaGFkb3cnLCAnMHB4IDAgMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpJyk7XG4gICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgIHpJbmRleDogMlxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBGaXggZm9yIHRyYW5zcGFyZW50IG1lbnUgcGFnZSBvbiBpT1M4LlxuICAgICAgICBtZW51UGFnZS5jc3MoJy13ZWJraXQtdHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpJyk7XG5cbiAgICAgICAgbWFpblBhZ2UuY3NzKHt6SW5kZXg6IDF9KTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PjwvZGl2PicpLmNzcyh7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgICAgIGJvdHRvbTogJzBweCcsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgIHpJbmRleDogMFxuICAgICAgICB9KTtcblxuICAgICAgICBlbGVtZW50LnByZXBlbmQodGhpcy5fYmxhY2tNYXNrKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoXG4gICAgICAgKi9cbiAgICAgIG9uUmVzaXplZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ3dpZHRoJywgb3B0aW9ucy53aWR0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICctJyArIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICctJyArIG9wdGlvbnMud2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzT3BlbmVkKSB7XG4gICAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICAgIHZhciBtZW51U3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUobWF4KTtcbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pLnF1ZXVlKG1lbnVTdHlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ibGFja01hc2spIHtcbiAgICAgICAgICB0aGlzLl9ibGFja01hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21haW5QYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX21haW5QYWdlID0gdGhpcy5fbWVudVBhZ2UgPSBudWxsO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBtZW51U3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUobWF4KTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUobWF4KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUobWFpblBhZ2VTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKG1lbnVTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBjbG9zZU1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKHtkaXNwbGF5OiAnYmxvY2snfSk7XG5cbiAgICAgICAgdmFyIG1lbnVQYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1lbnVQYWdlU3R5bGUoMCk7XG4gICAgICAgIHZhciBtYWluUGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNYWluUGFnZVN0eWxlKDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtYWluUGFnZVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShtZW51UGFnZVN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGlzdGFuY2VcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heERpc3RhbmNlXG4gICAgICAgKi9cbiAgICAgIHRyYW5zbGF0ZU1lbnU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcyh7ZGlzcGxheTogJ2Jsb2NrJ30pO1xuXG4gICAgICAgIHZhciBtZW51UGFnZVN0eWxlID0gdGhpcy5fZ2VuZXJhdGVNZW51UGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgdmFyIG1haW5QYWdlU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZU1haW5QYWdlU3R5bGUoTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuICAgICAgICBkZWxldGUgbWFpblBhZ2VTdHlsZS5vcGFjaXR5O1xuXG4gICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAucXVldWUobWVudVBhZ2VTdHlsZSlcbiAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhtYWluUGFnZVN0eWxlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLnF1ZXVlKG1haW5QYWdlU3R5bGUpXG4gICAgICAgICAgICAucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVNZW51UGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMuX2lzUmlnaHQgPyAtZGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgJ2JveC1zaGFkb3cnOiBkaXN0YW5jZSA9PT0gMCA/ICdub25lJyA6ICcwcHggMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiknXG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVNYWluUGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBvcGFjaXR5ID0gMSAtICgwLjEgKiBkaXN0YW5jZSAvIG1heCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPdmVybGF5U2xpZGluZ01lbnVBbmltYXRvcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE92ZXJsYXlTbGlkaW5nTWVudUFuaW1hdG9yO1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wYWdlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcGFnZS5bL2VuXVxuICogICBbamFd44GT44Gu44Oa44O844K444KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctaW5maW5pdGUtc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVBhdGggb2YgdGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIGluZmluaXRlIHNjcm9sbGluZy4gVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gJHNjb3BlLiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgYSBkb25lIGNhbGxiYWNrIHRoYXQgbXVzdCBiZSBjYWxsZWQgd2hlbiBpdCdzIGZpbmlzaGVkLlsvZW5dXG4gKiAgIFtqYV1bL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbi1kZXZpY2UtYmFjay1idXR0b25cbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWRldmljZS1iYWNrLWJ1dHRvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aXRoIGFuIEFuZ3VsYXJKUyBleHByZXNzaW9uIHdoZW4gdGhlIGJhY2sgYnV0dG9uIGlzIHByZXNzZWQuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+OBjOaKvOOBleOCjOOBn+aZguOBruaMmeWLleOCkuioreWumuOBp+OBjeOBvuOBmeOAgkFuZ3VsYXJKU+OBrmV4cHJlc3Npb27jgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUGFnZScsIFsnJG9uc2VuJywgJ1BhZ2VWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBQYWdlVmlldykge1xuXG4gICAgZnVuY3Rpb24gZmlyZVBhZ2VJbml0RXZlbnQoZWxlbWVudCkge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIGRpcnR5IGZpeFxuICAgICAgdmFyIGkgPSAwLCBmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpKysgPCAxNSkgIHtcbiAgICAgICAgICBpZiAoaXNBdHRhY2hlZChlbGVtZW50KSkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50LCAnaW5pdCcpO1xuICAgICAgICAgICAgZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQoZWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpID4gMTApIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZmlyZSBcInBhZ2Vpbml0XCIgZXZlbnQuIEF0dGFjaCBcIm9ucy1wYWdlXCIgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGYoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZlbnQuaW5pdEV2ZW50KCdwYWdlaW5pdCcsIHRydWUsIHRydWUpO1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0F0dGFjaGVkKGVsZW1lbnQpIHtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlID8gaXNBdHRhY2hlZChlbGVtZW50LnBhcmVudE5vZGUpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gbmV3IFBhZ2VWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwYWdlKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocGFnZSwgJ2luaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcGFnZScsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHBhZ2UsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcGFnZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHBhZ2UpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50WzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXBvcG92ZXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHBvcG92ZXIuWy9lbl1cbiAqICBbamFd44GT44Gu44Od44OD44OX44Kq44O844OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1BvcG92ZXInLCBbJyRvbnNlbicsICdQb3BvdmVyVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgUG9wb3ZlclZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwb3BvdmVyKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocG9wb3ZlciwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocG9wb3ZlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCBwb3BvdmVyKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwb3BvdmVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocG9wb3Zlcik7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ1BvcG92ZXJBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuUG9wb3ZlckFuaW1hdG9yKVxuICAudmFsdWUoJ0ZhZGVQb3BvdmVyQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkZhZGVQb3BvdmVyQW5pbWF0b3IpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcHVsbC1ob29rXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCkge1xuICogICAgICRzY29wZS5pdGVtcyA9IFszLCAyICwxXTtcbiAqXG4gKiAgICAgJHNjb3BlLmxvYWQgPSBmdW5jdGlvbigkZG9uZSkge1xuICogICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgICRzY29wZS5pdGVtcy51bnNoaWZ0KCRzY29wZS5pdGVtcy5sZW5ndGggKyAxKTtcbiAqICAgICAgICAgJGRvbmUoKTtcbiAqICAgICAgIH0sIDEwMDApO1xuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1wYWdlIG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1wdWxsLWhvb2sgdmFyPVwibG9hZGVyXCIgbmctYWN0aW9uPVwibG9hZCgkZG9uZSlcIj5cbiAqICAgICA8c3BhbiBuZy1zd2l0Y2g9XCJsb2FkZXIuc3RhdGVcIj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiaW5pdGlhbFwiPlB1bGwgZG93biB0byByZWZyZXNoPC9zcGFuPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJwcmVhY3Rpb25cIj5SZWxlYXNlIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cImFjdGlvblwiPkxvYWRpbmcgZGF0YS4gUGxlYXNlIHdhaXQuLi48L3NwYW4+XG4gKiAgICAgPC9zcGFuPlxuICogICA8L29ucy1wdWxsLWhvb2s+XG4gKiAgIDxvbnMtbGlzdD5cbiAqICAgICA8b25zLWxpc3QtaXRlbSBuZy1yZXBlYXQ9XCJpdGVtIGluIGl0ZW1zXCI+XG4gKiAgICAgICBJdGVtICN7eyBpdGVtIH19XG4gKiAgICAgPC9vbnMtbGlzdC1pdGVtPlxuICogICA8L29ucy1saXN0PlxuICogPC9vbnMtcGFnZT5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWFjdGlvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVXNlIHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIHBhZ2UgaXMgcHVsbGVkIGRvd24uIEEgPGNvZGU+JGRvbmU8L2NvZGU+IGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSB0byB0ZWxsIHRoZSBjb21wb25lbnQgdGhhdCB0aGUgYWN0aW9uIGlzIGNvbXBsZXRlZC5bL2VuXVxuICogICBbamFdcHVsbCBkb3du44GX44Gf44Go44GN44Gu5oyv44KL6Iie44GE44KS5oyH5a6a44GX44G+44GZ44CC44Ki44Kv44K344On44Oz44GM5a6M5LqG44GX44Gf5pmC44Gr44GvPGNvZGU+JGRvbmU8L2NvZGU+6Zai5pWw44KS5ZG844Gz5Ye644GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWNoYW5nZXN0YXRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJjaGFuZ2VzdGF0ZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiY2hhbmdlc3RhdGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIFB1bGwgaG9vayBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1B1bGxIb29rJywgWyckb25zZW4nLCAnUHVsbEhvb2tWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBQdWxsSG9va1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwdWxsSG9vayA9IG5ldyBQdWxsSG9va1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHB1bGxIb29rKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocHVsbEhvb2ssICdjaGFuZ2VzdGF0ZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCBwdWxsSG9vayk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHVsbEhvb2suX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcHVsbC1ob29rJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdQdXNoU2xpZGluZ01lbnVBbmltYXRvcicsIFsnU2xpZGluZ01lbnVBbmltYXRvcicsIGZ1bmN0aW9uKFNsaWRpbmdNZW51QW5pbWF0b3IpIHtcblxuICAgIHZhciBQdXNoU2xpZGluZ01lbnVBbmltYXRvciA9IFNsaWRpbmdNZW51QW5pbWF0b3IuZXh0ZW5kKHtcblxuICAgICAgX2lzUmlnaHQ6IGZhbHNlLFxuICAgICAgX2VsZW1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgIF9tZW51UGFnZTogdW5kZWZpbmVkLFxuICAgICAgX21haW5QYWdlOiB1bmRlZmluZWQsXG4gICAgICBfd2lkdGg6IHVuZGVmaW5lZCxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudCBcIm9ucy1zbGlkaW5nLW1lbnVcIiBvciBcIm9ucy1zcGxpdC12aWV3XCIgZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1haW5QYWdlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWVudVBhZ2VcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aCBcIndpZHRoXCIgc3R5bGUgdmFsdWVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc1JpZ2h0XG4gICAgICAgKi9cbiAgICAgIHNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBtYWluUGFnZSwgbWVudVBhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX21haW5QYWdlID0gbWFpblBhZ2U7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlID0gbWVudVBhZ2U7XG5cbiAgICAgICAgdGhpcy5faXNSaWdodCA9ICEhb3B0aW9ucy5pc1JpZ2h0O1xuICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgJzkwJSc7XG5cbiAgICAgICAgbWVudVBhZ2UuY3NzKHtcbiAgICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmlnaHQpIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICctJyArIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICctJyArIG9wdGlvbnMud2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGhcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgb25SZXNpemVkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnd2lkdGgnLCBvcHRpb25zLndpZHRoKTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJy0nICsgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgbGVmdDogJy0nICsgb3B0aW9ucy53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNPcGVuZWQpIHtcbiAgICAgICAgICB2YXIgbWF4ID0gdGhpcy5fbWVudVBhZ2VbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgdmFyIG1haW5QYWdlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgICB2YXIgbWVudVBhZ2VTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKG1heCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pLnF1ZXVlKHt0cmFuc2Zvcm06IG1haW5QYWdlVHJhbnNmb3JtfSkucGxheSgpO1xuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSkucXVldWUobWVudVBhZ2VTdHlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqL1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX21haW5QYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIHRoaXMuX21lbnVQYWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX21haW5QYWdlID0gdGhpcy5fbWVudVBhZ2UgPSBudWxsO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaywgaW5zdGFudCkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdmFyIGRlbGF5ID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZGVsYXk7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKG1heCk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKG1heCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpbnN0YW50XG4gICAgICAgKi9cbiAgICAgIGNsb3NlTWVudTogZnVuY3Rpb24oY2FsbGJhY2ssIGluc3RhbnQpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5zdGFudCA9PT0gdHJ1ZSA/IDAuMCA6IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHZhciBkZWxheSA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmRlbGF5O1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKDApO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZSgwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgICAgLndhaXQoZGVsYXkpXG4gICAgICAgICAgICAucXVldWUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGFib3ZlVHJhbnNmb3JtXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucXVldWUoZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5kaXN0YW5jZVxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4RGlzdGFuY2VcbiAgICAgICAqL1xuICAgICAgdHJhbnNsYXRlTWVudTogZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuX21lbnVQYWdlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBhYm92ZVRyYW5zZm9ybSA9IHRoaXMuX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgdmFyIGJlaGluZFN0eWxlID0gdGhpcy5fZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGUoTWF0aC5taW4ob3B0aW9ucy5tYXhEaXN0YW5jZSwgb3B0aW9ucy5kaXN0YW5jZSkpO1xuXG4gICAgICAgIGFuaW1pdCh0aGlzLl9tYWluUGFnZVswXSlcbiAgICAgICAgICAucXVldWUoe3RyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm19KVxuICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgYW5pbWl0KHRoaXMuX21lbnVQYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSlcbiAgICAgICAgICAucGxheSgpO1xuICAgICAgfSxcblxuICAgICAgX2dlbmVyYXRlQWJvdmVQYWdlVHJhbnNmb3JtOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMuX2lzUmlnaHQgPyAtZGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAwLCAwKSc7XG5cbiAgICAgICAgcmV0dXJuIGFib3ZlVHJhbnNmb3JtO1xuICAgICAgfSxcblxuICAgICAgX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlOiBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgYmVoaW5kWCA9IHRoaXMuX2lzUmlnaHQgPyAtZGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgdmFyIGJlaGluZFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgYmVoaW5kWCArICdweCwgMCwgMCknO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBiZWhpbmRUcmFuc2Zvcm1cbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFB1c2hTbGlkaW5nTWVudUFuaW1hdG9yKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHVzaFNsaWRpbmdNZW51QW5pbWF0b3I7XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1JldmVhbFNsaWRpbmdNZW51QW5pbWF0b3InLCBbJ1NsaWRpbmdNZW51QW5pbWF0b3InLCBmdW5jdGlvbihTbGlkaW5nTWVudUFuaW1hdG9yKSB7XG5cbiAgICB2YXIgUmV2ZWFsU2xpZGluZ01lbnVBbmltYXRvciA9IFNsaWRpbmdNZW51QW5pbWF0b3IuZXh0ZW5kKHtcblxuICAgICAgX2JsYWNrTWFzazogdW5kZWZpbmVkLFxuXG4gICAgICBfaXNSaWdodDogZmFsc2UsXG5cbiAgICAgIF9tZW51UGFnZTogdW5kZWZpbmVkLFxuICAgICAgX2VsZW1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgIF9tYWluUGFnZTogdW5kZWZpbmVkLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoIFwid2lkdGhcIiBzdHlsZSB2YWx1ZVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fbWVudVBhZ2UgPSBtZW51UGFnZTtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2UgPSBtYWluUGFnZTtcbiAgICAgICAgdGhpcy5faXNSaWdodCA9ICEhb3B0aW9ucy5pc1JpZ2h0O1xuICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgJzkwJSc7XG5cbiAgICAgICAgbWFpblBhZ2UuY3NzKHtcbiAgICAgICAgICBib3hTaGFkb3c6ICcwcHggMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMiknXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgb3BhY2l0eTogMC45LFxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5faXNSaWdodCkge1xuICAgICAgICAgIG1lbnVQYWdlLmNzcyh7XG4gICAgICAgICAgICByaWdodDogJzBweCcsXG4gICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZW51UGFnZS5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIGxlZnQ6ICcwcHgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ibGFja01hc2sgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuY3NzKHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICByaWdodDogJzBweCcsXG4gICAgICAgICAgYm90dG9tOiAnMHB4JyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5wcmVwZW5kKHRoaXMuX2JsYWNrTWFzayk7XG5cbiAgICAgICAgLy8gRGlydHkgZml4IGZvciBicm9rZW4gcmVuZGVyaW5nIGJ1ZyBvbiBhbmRyb2lkIDQueC5cbiAgICAgICAgYW5pbWl0KG1haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknfSkucGxheSgpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzT3BlbmVkXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy53aWR0aFxuICAgICAgICovXG4gICAgICBvblJlc2l6ZWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ3dpZHRoJywgdGhpcy5fd2lkdGgpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzT3BlbmVkKSB7XG4gICAgICAgICAgdmFyIG1heCA9IHRoaXMuX21lbnVQYWdlWzBdLmNsaWVudFdpZHRoO1xuXG4gICAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0obWF4KTtcbiAgICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKS5xdWV1ZSh7dHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybX0pLnBsYXkoKTtcbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pLnF1ZXVlKGJlaGluZFN0eWxlKS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnQgXCJvbnMtc2xpZGluZy1tZW51XCIgb3IgXCJvbnMtc3BsaXQtdmlld1wiIGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtYWluUGFnZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IG1lbnVQYWdlXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYmxhY2tNYXNrKSB7XG4gICAgICAgICAgdGhpcy5fYmxhY2tNYXNrLnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMuX2JsYWNrTWFzayA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbWFpblBhZ2UpIHtcbiAgICAgICAgICB0aGlzLl9tYWluUGFnZS5hdHRyKCdzdHlsZScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tZW51UGFnZSkge1xuICAgICAgICAgIHRoaXMuX21lbnVQYWdlLmF0dHIoJ3N0eWxlJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbWFpblBhZ2UgPSB0aGlzLl9tZW51UGFnZSA9IHRoaXMuX2VsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGluc3RhbnRcbiAgICAgICAqL1xuICAgICAgb3Blbk1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9tZW51UGFnZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgdGhpcy5fYmxhY2tNYXNrLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5jbGllbnRXaWR0aDtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShtYXgpO1xuICAgICAgICB2YXIgYmVoaW5kU3R5bGUgPSB0aGlzLl9nZW5lcmF0ZUJlaGluZFBhZ2VTdHlsZShtYXgpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5wbGF5KCk7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZShiZWhpbmRTdHlsZSwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5zdGFudFxuICAgICAgICovXG4gICAgICBjbG9zZU1lbnU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbnN0YW50KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGluc3RhbnQgPT09IHRydWUgPyAwLjAgOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB2YXIgZGVsYXkgPSBpbnN0YW50ID09PSB0cnVlID8gMC4wIDogdGhpcy5kZWxheTtcblxuICAgICAgICB0aGlzLl9ibGFja01hc2suY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgdmFyIGFib3ZlVHJhbnNmb3JtID0gdGhpcy5fZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm0oMCk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBhbmltaXQodGhpcy5fbWFpblBhZ2VbMF0pXG4gICAgICAgICAgICAud2FpdChkZWxheSlcbiAgICAgICAgICAgIC5xdWV1ZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYWJvdmVUcmFuc2Zvcm1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICAgIGFuaW1pdCh0aGlzLl9tZW51UGFnZVswXSlcbiAgICAgICAgICAgIC53YWl0KGRlbGF5KVxuICAgICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlLCB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nOiB0aGlzLnRpbWluZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5xdWV1ZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGxheSgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRpc3RhbmNlXG4gICAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhEaXN0YW5jZVxuICAgICAgICovXG4gICAgICB0cmFuc2xhdGVNZW51OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbWVudVBhZ2UuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX2JsYWNrTWFzay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSB0aGlzLl9nZW5lcmF0ZUFib3ZlUGFnZVRyYW5zZm9ybShNYXRoLm1pbihvcHRpb25zLm1heERpc3RhbmNlLCBvcHRpb25zLmRpc3RhbmNlKSk7XG4gICAgICAgIHZhciBiZWhpbmRTdHlsZSA9IHRoaXMuX2dlbmVyYXRlQmVoaW5kUGFnZVN0eWxlKE1hdGgubWluKG9wdGlvbnMubWF4RGlzdGFuY2UsIG9wdGlvbnMuZGlzdGFuY2UpKTtcbiAgICAgICAgZGVsZXRlIGJlaGluZFN0eWxlLm9wYWNpdHk7XG5cbiAgICAgICAgYW5pbWl0KHRoaXMuX21haW5QYWdlWzBdKVxuICAgICAgICAgIC5xdWV1ZSh7dHJhbnNmb3JtOiBhYm92ZVRyYW5zZm9ybX0pXG4gICAgICAgICAgLnBsYXkoKTtcblxuICAgICAgICBhbmltaXQodGhpcy5fbWVudVBhZ2VbMF0pXG4gICAgICAgICAgLnF1ZXVlKGJlaGluZFN0eWxlKVxuICAgICAgICAgIC5wbGF5KCk7XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVBYm92ZVBhZ2VUcmFuc2Zvcm06IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5faXNSaWdodCA/IC1kaXN0YW5jZSA6IGRpc3RhbmNlO1xuICAgICAgICB2YXIgYWJvdmVUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsIDAsIDApJztcblxuICAgICAgICByZXR1cm4gYWJvdmVUcmFuc2Zvcm07XG4gICAgICB9LFxuXG4gICAgICBfZ2VuZXJhdGVCZWhpbmRQYWdlU3R5bGU6IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciBtYXggPSB0aGlzLl9tZW51UGFnZVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICB2YXIgYmVoaW5kRGlzdGFuY2UgPSAoZGlzdGFuY2UgLSBtYXgpIC8gbWF4ICogMTA7XG4gICAgICAgIGJlaGluZERpc3RhbmNlID0gaXNOYU4oYmVoaW5kRGlzdGFuY2UpID8gMCA6IE1hdGgubWF4KE1hdGgubWluKGJlaGluZERpc3RhbmNlLCAwKSwgLTEwKTtcblxuICAgICAgICB2YXIgYmVoaW5kWCA9IHRoaXMuX2lzUmlnaHQgPyAtYmVoaW5kRGlzdGFuY2UgOiBiZWhpbmREaXN0YW5jZTtcbiAgICAgICAgdmFyIGJlaGluZFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgYmVoaW5kWCArICclLCAwLCAwKSc7XG4gICAgICAgIHZhciBvcGFjaXR5ID0gMSArIGJlaGluZERpc3RhbmNlIC8gMTAwO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBiZWhpbmRUcmFuc2Zvcm0sXG4gICAgICAgICAgb3BhY2l0eTogb3BhY2l0eVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmV2ZWFsU2xpZGluZ01lbnVBbmltYXRvcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFJldmVhbFNsaWRpbmdNZW51QW5pbWF0b3I7XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNsaWRpbmctbWVudVxuICogQGNhdGVnb3J5IG1lbnVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ29tcG9uZW50IGZvciBzbGlkaW5nIFVJIHdoZXJlIG9uZSBwYWdlIGlzIG92ZXJsYXllZCBvdmVyIGFub3RoZXIgcGFnZS4gVGhlIGFib3ZlIHBhZ2UgY2FuIGJlIHNsaWRlZCBhc2lkZSB0byByZXZlYWwgdGhlIHBhZ2UgYmVoaW5kLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgpLooajnj77jgZnjgovjgZ/jgoHjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgafjgIHniYfmlrnjga7jg5rjg7zjgrjjgYzliKXjga7jg5rjg7zjgrjjga7kuIrjgavjgqrjg7zjg5Djg7zjg6zjgqTjgafooajnpLrjgZXjgozjgb7jgZnjgIJhYm92ZS1wYWdl44Gn5oyH5a6a44GV44KM44Gf44Oa44O844K444Gv44CB5qiq44GL44KJ44K544Op44Kk44OJ44GX44Gm6KGo56S644GX44G+44GZ44CCWy9qYV1cbiAqIEBjb2RlcGVuIElEdkZKXG4gKiBAc2VlYWxzbyBvbnMtcGFnZVxuICogICBbZW5db25zLXBhZ2UgY29tcG9uZW50Wy9lbl1cbiAqICAgW2phXW9ucy1wYWdl44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBndWlkZSBVc2luZ1NsaWRpbmdNZW51XG4gKiAgIFtlbl1Vc2luZyBzbGlkaW5nIG1lbnVbL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844KS5L2/44GGWy9qYV1cbiAqIEBndWlkZSBFdmVudEhhbmRsaW5nXG4gKiAgIFtlbl1Vc2luZyBldmVudHNbL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Gu5Yip55SoWy9qYV1cbiAqIEBndWlkZSBDYWxsaW5nQ29tcG9uZW50QVBJc2Zyb21KYXZhU2NyaXB0XG4gKiAgIFtlbl1Vc2luZyBuYXZpZ2F0b3IgZnJvbSBKYXZhU2NyaXB0Wy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlkbzjgbPlh7rjgZlbL2phXVxuICogQGd1aWRlIERlZmluaW5nTXVsdGlwbGVQYWdlc2luU2luZ2xlSFRNTFxuICogICBbZW5dRGVmaW5pbmcgbXVsdGlwbGUgcGFnZXMgaW4gc2luZ2xlIGh0bWxbL2VuXVxuICogICBbamFd6KSH5pWw44Gu44Oa44O844K444KSMeOBpOOBrkhUTUzjgavoqJjov7DjgZnjgotbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtc2xpZGluZy1tZW51IHZhcj1cImFwcC5tZW51XCIgbWFpbi1wYWdlPVwicGFnZS5odG1sXCIgbWVudS1wYWdlPVwibWVudS5odG1sXCIgbWF4LXNsaWRlLWRpc3RhbmNlPVwiMjAwcHhcIiB0eXBlPVwicmV2ZWFsXCIgc2lkZT1cImxlZnRcIj5cbiAqIDwvb25zLXNsaWRpbmctbWVudT5cbiAqXG4gKiA8b25zLXRlbXBsYXRlIGlkPVwicGFnZS5odG1sXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgIDxvbnMtYnV0dG9uIG5nLWNsaWNrPVwiYXBwLm1lbnUudG9nZ2xlTWVudSgpXCI+VG9nZ2xlPC9vbnMtYnV0dG9uPlxuICogICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKlxuICogPG9ucy10ZW1wbGF0ZSBpZD1cIm1lbnUuaHRtbFwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICAgPCEtLSBtZW51IHBhZ2UncyBjb250ZW50cyAtLT5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICpcbiAqL1xuXG4vKipcbiAqIEBldmVudCBwcmVvcGVuXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYmVmb3JlIHRoZSBzbGlkaW5nIG1lbnUgaXMgb3BlbmVkLlsvZW5dXG4gKiAgIFtqYV3jgrnjg6njgqTjg4fjgqPjg7PjgrDjg6Hjg4vjg6Xjg7zjgYzplovjgY/liY3jgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc2xpZGluZ01lbnVcbiAqICAgW2VuXVNsaWRpbmcgbWVudSB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU2xpZGluZ01lbnXjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3RvcGVuXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYWZ0ZXIgdGhlIHNsaWRpbmcgbWVudSBpcyBvcGVuZWQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOBjOmWi+OBjee1guOCj+OBo+OBn+W+jOOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zbGlkaW5nTWVudVxuICogICBbZW5dU2xpZGluZyBtZW51IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TbGlkaW5nTWVudeOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcHJlY2xvc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHNsaWRpbmcgbWVudSBpcyBjbG9zZWQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOBjOmWieOBmOOCi+WJjeOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zbGlkaW5nTWVudVxuICogICBbZW5dU2xpZGluZyBtZW51IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TbGlkaW5nTWVudeOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcG9zdGNsb3NlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYWZ0ZXIgdGhlIHNsaWRpbmcgbWVudSBpcyBjbG9zZWQuWy9lbl1cbiAqICAgW2phXeOCueODqeOCpOODh+OCo+ODs+OCsOODoeODi+ODpeODvOOBjOmWieOBmOe1guOCj+OBo+OBn+W+jOOBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zbGlkaW5nTWVudVxuICogICBbZW5dU2xpZGluZyBtZW51IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TbGlkaW5nTWVudeOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzbGlkaW5nIG1lbnUuWy9lbl1cbiAqICBbamFd44GT44Gu44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWVudS1wYWdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIG1lbnUgcGFnZS5bL2VuXVxuICogICBbamFd5bem44Gr5L2N572u44GZ44KL44Oh44OL44Ol44O844Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWFpbi1wYWdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIG1haW4gcGFnZS5bL2VuXVxuICogICBbamFd5Y+z44Gr5L2N572u44GZ44KL44Oh44Kk44Oz44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgc3dpcGVhYmxlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtCb29sZWFufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1XaGV0aGVyIHRvIGVuYWJsZSBzd2lwZSBpbnRlcmFjdGlvbi5bL2VuXVxuICogICBbamFd44K544Ov44Kk44OX5pON5L2c44KS5pyJ5Yq544Gr44GZ44KL5aC05ZCI44Gr5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgc3dpcGUtdGFyZ2V0LXdpZHRoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB3aWR0aCBvZiBzd2lwZWFibGUgYXJlYSBjYWxjdWxhdGVkIGZyb20gdGhlIGxlZnQgKGluIHBpeGVscykuIFVzZSB0aGlzIHRvIGVuYWJsZSBzd2lwZSBvbmx5IHdoZW4gdGhlIGZpbmdlciB0b3VjaCBvbiB0aGUgc2NyZWVuIGVkZ2UuWy9lbl1cbiAqICAgW2phXeOCueODr+OCpOODl+OBruWIpOWumumgmOWfn+OCkuODlOOCr+OCu+ODq+WNmOS9jeOBp+aMh+WumuOBl+OBvuOBmeOAgueUu+mdouOBruerr+OBi+OCieaMh+WumuOBl+OBn+i3nembouOBq+mBlOOBmeOCi+OBqOODmuODvOOCuOOBjOihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1heC1zbGlkZS1kaXN0YW5jZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Ib3cgZmFyIHRoZSBtZW51IHBhZ2Ugd2lsbCBzbGlkZSBvcGVuLiBDYW4gc3BlY2lmeSBib3RoIGluIHB4IGFuZCAlLiBlZy4gOTAlLCAyMDBweFsvZW5dXG4gKiAgIFtqYV1tZW51LXBhZ2XjgafmjIflrprjgZXjgozjgZ/jg5rjg7zjgrjjga7ooajnpLrluYXjgpLmjIflrprjgZfjgb7jgZnjgILjg5Tjgq/jgrvjg6vjgoLjgZfjgY/jga8l44Gu5Lih5pa544Gn5oyH5a6a44Gn44GN44G+44GZ77yI5L6LOiA5MCUsIDIwMHB477yJWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgc2lkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TcGVjaWZ5IHdoaWNoIHNpZGUgb2YgdGhlIHNjcmVlbiB0aGUgbWVudSBwYWdlIGlzIGxvY2F0ZWQgb24uIFBvc3NpYmxlIHZhbHVlcyBhcmUgXCJsZWZ0XCIgYW5kIFwicmlnaHRcIi5bL2VuXVxuICogICBbamFdbWVudS1wYWdl44Gn5oyH5a6a44GV44KM44Gf44Oa44O844K444GM55S76Z2i44Gu44Gp44Gh44KJ5YG044GL44KJ6KGo56S644GV44KM44KL44GL44KS5oyH5a6a44GX44G+44GZ44CCbGVmdOOCguOBl+OBj+OBr3JpZ2h044Gu44GE44Ga44KM44GL44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdHlwZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TbGlkaW5nIG1lbnUgYW5pbWF0b3IuIFBvc3NpYmxlIHZhbHVlcyBhcmUgcmV2ZWFsIChkZWZhdWx0KSwgcHVzaCBhbmQgb3ZlcmxheS5bL2VuXVxuICogICBbamFd44K544Op44Kk44OH44Kj44Oz44Kw44Oh44OL44Ol44O844Gu44Ki44OL44Oh44O844K344On44Oz44Gn44GZ44CCXCJyZXZlYWxcIu+8iOODh+ODleOCqeODq+ODiO+8ieOAgVwicHVzaFwi44CBXCJvdmVybGF5XCLjga7jgYTjgZrjgozjgYvjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlb3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlb3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0b3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdG9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWluaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaW5pdFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaW5pdFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgcGFnZSdzIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXeODmuODvOOCuOOBrlwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0TWFpblBhZ2VcbiAqIEBzaWduYXR1cmUgc2V0TWFpblBhZ2UocGFnZVVybCwgW29wdGlvbnNdKVxuICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VVcmxcbiAqICAgW2VuXVBhZ2UgVVJMLiBDYW4gYmUgZWl0aGVyIGFuIEhUTUwgZG9jdW1lbnQgb3IgYW4gPGNvZGU+Jmx0O29ucy10ZW1wbGF0ZSZndDs8L2NvZGU+LlsvZW5dXG4gKiAgIFtqYV1wYWdl44GuVVJM44GL44CBb25zLXRlbXBsYXRl44Gn5a6j6KiA44GX44Gf44OG44Oz44OX44Os44O844OI44GuaWTlsZ7mgKfjga7lgKTjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xvc2VNZW51XVxuICogICBbZW5dSWYgdHJ1ZSB0aGUgbWVudSB3aWxsIGJlIGNsb3NlZC5bL2VuXVxuICogICBbamFddHJ1ZeOCkuaMh+WumuOBmeOCi+OBqOOAgemWi+OBhOOBpuOBhOOCi+ODoeODi+ODpeODvOOCkumWieOBmOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXUZ1bmN0aW9uIHRoYXQgaXMgZXhlY3V0ZWQgYWZ0ZXIgdGhlIHBhZ2UgaGFzIGJlZW4gc2V0LlsvZW5dXG4gKiAgIFtqYV3jg5rjg7zjgrjjgYzoqq3jgb/ovrzjgb7jgozjgZ/lvozjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TaG93IHRoZSBwYWdlIHNwZWNpZmllZCBpbiBwYWdlVXJsIGluIHRoZSBtYWluIGNvbnRlbnRzIHBhbmUuWy9lbl1cbiAqICAgW2phXeS4reWkrumDqOWIhuOBq+ihqOekuuOBleOCjOOCi+ODmuODvOOCuOOCknBhZ2VVcmzjgavmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRNZW51UGFnZVxuICogQHNpZ25hdHVyZSBzZXRNZW51UGFnZShwYWdlVXJsLCBbb3B0aW9uc10pXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8Y29kZT4mbHQ7b25zLXRlbXBsYXRlJmd0OzwvY29kZT4uWy9lbl1cbiAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIFvbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbG9zZU1lbnVdXG4gKiAgIFtlbl1JZiB0cnVlIHRoZSBtZW51IHdpbGwgYmUgY2xvc2VkIGFmdGVyIHRoZSBtZW51IHBhZ2UgaGFzIGJlZW4gc2V0LlsvZW5dXG4gKiAgIFtqYV10cnVl44KS5oyH5a6a44GZ44KL44Go44CB6ZaL44GE44Gm44GE44KL44Oh44OL44Ol44O844KS6ZaJ44GY44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIHRoZSBtZW51IHBhZ2UgaGFzIGJlZW4gc2V0LlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjg5rjg7zjgrjjgYzoqq3jgb/ovrzjgb7jgozjgZ/lvozjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TaG93IHRoZSBwYWdlIHNwZWNpZmllZCBpbiBwYWdlVXJsIGluIHRoZSBzaWRlIG1lbnUgcGFuZS5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O86YOo5YiG44Gr6KGo56S644GV44KM44KL44Oa44O844K444KScGFnZVVybOOBq+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9wZW5NZW51XG4gKiBAc2lnbmF0dXJlIG9wZW5NZW51KFtvcHRpb25zXSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqICAgW2VuXVBhcmFtZXRlciBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCquODl+OCt+ODp+ODs+OCkuaMh+WumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja11cbiAqICAgW2VuXVRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIG1lbnUgaGFzIGJlZW4gb3BlbmVkLlsvZW5dXG4gKiAgIFtqYV3jg6Hjg4vjg6Xjg7zjgYzplovjgYTjgZ/lvozjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1TbGlkZSB0aGUgYWJvdmUgbGF5ZXIgdG8gcmV2ZWFsIHRoZSBsYXllciBiZWhpbmQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOODmuODvOOCuOOCkuihqOekuuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIGNsb3NlTWVudVxuICogQHNpZ25hdHVyZSBjbG9zZU1lbnUoW29wdGlvbnNdKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogICBbZW5dUGFyYW1ldGVyIG9iamVjdC5bL2VuXVxuICogICBbamFd44Kq44OX44K344On44Oz44KS5oyH5a6a44GZ44KL44Kq44OW44K444Kn44Kv44OI44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXVxuICogICBbZW5dVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgbWVudSBoYXMgYmVlbiBjbG9zZWQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOOBjOmWieOBmOOCieOCjOOBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNsaWRlIHRoZSBhYm92ZSBsYXllciB0byBoaWRlIHRoZSBsYXllciBiZWhpbmQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOODmuODvOOCuOOCkumdnuihqOekuuOBq+OBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHRvZ2dsZU1lbnVcbiAqIEBzaWduYXR1cmUgdG9nZ2xlTWVudShbb3B0aW9uc10pXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiAgIFtlbl1QYXJhbWV0ZXIgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqrjg5fjgrfjg6fjg7PjgpLmjIflrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdXG4gKiAgIFtlbl1UaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSBtZW51IGhhcyBiZWVuIG9wZW5lZCBvciBjbG9zZWQuWy9lbl1cbiAqICAgW2phXeODoeODi+ODpeODvOOBjOmWi+OBjee1guOCj+OBo+OBn+W+jOOBi+OAgemWieOBmOe1guOCj+OBo+OBn+W+jOOBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNsaWRlIHRoZSBhYm92ZSBsYXllciB0byByZXZlYWwgdGhlIGxheWVyIGJlaGluZCBpZiBpdCBpcyBjdXJyZW50bHkgaGlkZGVuLCBvdGhlcndpc2UsIGhpZGUgdGhlIGxheWVyIGJlaGluZC5bL2VuXVxuICogICBbamFd54++5Zyo44Gu54q25rOB44Gr5ZCI44KP44Gb44Gm44CB44Oh44OL44Ol44O844Oa44O844K444KS6KGo56S644KC44GX44GP44Gv6Z2e6KGo56S644Gr44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgaXNNZW51T3BlbmVkXG4gKiBAc2lnbmF0dXJlIGlzTWVudU9wZW5lZCgpXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogICBbZW5ddHJ1ZSBpZiB0aGUgbWVudSBpcyBjdXJyZW50bHkgb3Blbi5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844GM6ZaL44GE44Gm44GE44KM44GwdHJ1ZeOBqOOBquOCiuOBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVJldHVybnMgdHJ1ZSBpZiB0aGUgbWVudSBwYWdlIGlzIG9wZW4sIG90aGVyd2lzZSBmYWxzZS5bL2VuXVxuICogICBbamFd44Oh44OL44Ol44O844Oa44O844K444GM6ZaL44GE44Gm44GE44KL5aC05ZCI44GvdHJ1ZeOAgeOBneOBhuOBp+OBquOBhOWgtOWQiOOBr2ZhbHNl44KS6L+U44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgZ2V0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXJcbiAqIEBzaWduYXR1cmUgZ2V0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIoKVxuICogQHJldHVybiB7T2JqZWN0fVxuICogICBbZW5dRGV2aWNlIGJhY2sgYnV0dG9uIGhhbmRsZXIuWy9lbl1cbiAqICAgW2phXeODh+ODkOOCpOOCueOBruODkOODg+OCr+ODnOOCv+ODs+ODj+ODs+ODieODqeOCkui/lOOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVJldHJpZXZlIHRoZSBiYWNrLWJ1dHRvbiBoYW5kbGVyLlsvZW5dXG4gKiAgIFtqYV1vbnMtc2xpZGluZy1tZW5144Gr57SQ5LuY44GE44Gm44GE44KL44OQ44OD44Kv44Oc44K/44Oz44OP44Oz44OJ44Op44KS5Y+W5b6X44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0U3dpcGVhYmxlXG4gKiBAc2lnbmF0dXJlIHNldFN3aXBlYWJsZShzd2lwZWFibGUpXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHN3aXBlYWJsZVxuICogICBbZW5dSWYgdHJ1ZSB0aGUgbWVudSB3aWxsIGJlIHN3aXBlYWJsZS5bL2VuXVxuICogICBbamFd44K544Ov44Kk44OX44Gn6ZaL6ZaJ44Gn44GN44KL44KI44GG44Gr44GZ44KL5aC05ZCI44Gr44GvdHJ1ZeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNwZWNpZnkgaWYgdGhlIG1lbnUgc2hvdWxkIGJlIHN3aXBlYWJsZSBvciBub3QuWy9lbl1cbiAqICAgW2phXeOCueODr+OCpOODl+OBp+mWi+mWieOBmeOCi+OBi+OBqeOBhuOBi+OCkuioreWumuOBmeOCi+OAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTbGlkaW5nTWVudScsIFsnJGNvbXBpbGUnLCAnU2xpZGluZ01lbnVWaWV3JywgJyRvbnNlbicsIGZ1bmN0aW9uKCRjb21waWxlLCBTbGlkaW5nTWVudVZpZXcsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBtYWluID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcubWFpbicpLFxuICAgICAgICAgICAgbWVudSA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcblxuICAgICAgICBpZiAobWFpbikge1xuICAgICAgICAgIHZhciBtYWluSHRtbCA9IGFuZ3VsYXIuZWxlbWVudChtYWluKS5yZW1vdmUoKS5odG1sKCkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lbnUpIHtcbiAgICAgICAgICB2YXIgbWVudUh0bWwgPSBhbmd1bGFyLmVsZW1lbnQobWVudSkucmVtb3ZlKCkuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNsaWRpbmctbWVudV9fbWVudScpKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNsaWRpbmctbWVudV9fbWFpbicpKTtcblxuICAgICAgICAgIHZhciBzbGlkaW5nTWVudSA9IG5ldyBTbGlkaW5nTWVudVZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc2xpZGluZ01lbnUsICdwcmVvcGVuIHByZWNsb3NlIHBvc3RvcGVuIHBvc3RjbG9zZSBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICBpZiAobWFpbkh0bWwgJiYgIWF0dHJzLm1haW5QYWdlKSB7XG4gICAgICAgICAgICBzbGlkaW5nTWVudS5fYXBwZW5kTWFpblBhZ2UobnVsbCwgbWFpbkh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtZW51SHRtbCAmJiAhYXR0cnMubWVudVBhZ2UpIHtcbiAgICAgICAgICAgIHNsaWRpbmdNZW51Ll9hcHBlbmRNZW51UGFnZShtZW51SHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNsaWRpbmdNZW51KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zbGlkaW5nLW1lbnUnLCBzbGlkaW5nTWVudSk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNsaWRpbmdNZW51Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zbGlkaW5nLW1lbnUnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdTbGlkaW5nTWVudUFuaW1hdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGRlbGF5OiAwLFxuICAgICAgZHVyYXRpb246IDAuNCxcbiAgICAgIHRpbWluZzogJ2N1YmljLWJlemllciguMSwgLjcsIC4xLCAxKScsXG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnRpbWluZ1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmRlbGF5XG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy50aW1pbmcgPSBvcHRpb25zLnRpbWluZyB8fCB0aGlzLnRpbWluZztcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZHVyYXRpb24gOiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB0aGlzLmRlbGF5ID0gb3B0aW9ucy5kZWxheSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5kZWxheSA6IHRoaXMuZGVsYXk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50IFwib25zLXNsaWRpbmctbWVudVwiIG9yIFwib25zLXNwbGl0LXZpZXdcIiBlbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gbWFpblBhZ2VcbiAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBtZW51UGFnZVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLndpZHRoIFwid2lkdGhcIiBzdHlsZSB2YWx1ZVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqL1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmlzUmlnaHRcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pc09wZW5lZFxuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMud2lkdGhcbiAgICAgICAqL1xuICAgICAgb25SZXNpemVkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgKi9cbiAgICAgIG9wZW5NZW51OiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICBjbG9zZUNsb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZGlzdGFuY2VcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heERpc3RhbmNlXG4gICAgICAgKi9cbiAgICAgIHRyYW5zbGF0ZU1lbnU6IGZ1bmN0aW9uKG1haW5QYWdlLCBtZW51UGFnZSwgb3B0aW9ucykge1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcmV0dXJuIHtTbGlkaW5nTWVudUFuaW1hdG9yfVxuICAgICAgICovXG4gICAgICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdmVycmlkZSBjb3B5IG1ldGhvZC4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BlZWQtZGlhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGUgc3BlZWQgZGlhbC5bL2VuXVxuICogICBbamFd44GT44Gu44K544OU44O844OJ44OA44Kk44Ki44Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS44GX44Gm44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1jbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTcGVlZERpYWwnLCBbJyRvbnNlbicsICdTcGVlZERpYWxWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBTcGVlZERpYWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgc3BlZWREaWFsID0gbmV3IFNwZWVkRGlhbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwZWVkLWRpYWwnLCBzcGVlZERpYWwpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGVlZERpYWwsICdvcGVuIGNsb3NlJyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHNwZWVkRGlhbCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcGVlZERpYWwuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwZWVkLWRpYWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdC12aWV3XG4gKiBAY2F0ZWdvcnkgY29udHJvbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXURpdmlkZXMgdGhlIHNjcmVlbiBpbnRvIGEgbGVmdCBhbmQgcmlnaHQgc2VjdGlvbi5bL2VuXVxuICogIFtqYV3nlLvpnaLjgpLlt6blj7PjgavliIblibLjgZnjgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgafjgZnjgIJbL2phXVxuICogQGNvZGVwZW4gbktxZnYge3dpZGV9XG4gKiBAZ3VpZGUgVXNpbmdvbnNzcGxpdHZpZXdjb21wb25lbnRcbiAqICAgW2VuXVVzaW5nIG9ucy1zcGxpdC12aWV3LlsvZW5dXG4gKiAgIFtqYV1vbnMtc3BsaXQtdmlld+OCs+ODs+ODneODvOODjeODs+ODiOOCkuS9v+OBhlsvamFdXG4gKiBAZ3VpZGUgQ2FsbGluZ0NvbXBvbmVudEFQSXNmcm9tSmF2YVNjcmlwdFxuICogICBbZW5dVXNpbmcgbmF2aWdhdG9yIGZyb20gSmF2YVNjcmlwdFsvZW5dXG4gKiAgIFtqYV1KYXZhU2NyaXB044GL44KJ44Kz44Oz44Od44O844ON44Oz44OI44KS5ZG844Gz5Ye644GZWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLXNwbGl0LXZpZXdcbiAqICAgc2Vjb25kYXJ5LXBhZ2U9XCJzZWNvbmRhcnkuaHRtbFwiXG4gKiAgIG1haW4tcGFnZT1cIm1haW4uaHRtbFwiXG4gKiAgIG1haW4tcGFnZS13aWR0aD1cIjcwJVwiXG4gKiAgIGNvbGxhcHNlPVwicG9ydHJhaXRcIj5cbiAqIDwvb25zLXNwbGl0LXZpZXc+XG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgdXBkYXRlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIHdoZW4gdGhlIHNwbGl0IHZpZXcgaXMgdXBkYXRlZC5bL2VuXVxuICogICBbamFdc3BsaXQgdmlld+OBrueKtuaFi+OBjOabtOaWsOOBleOCjOOBn+mam+OBq+eZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqICAgW2VuXUV2ZW50IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC5zcGxpdFZpZXdcbiAqICAgW2VuXVNwbGl0IHZpZXcgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ9TcGxpdFZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtCb29sZWFufSBldmVudC5zaG91bGRDb2xsYXBzZVxuICogICBbZW5dVHJ1ZSBpZiB0aGUgdmlldyBzaG91bGQgY29sbGFwc2UuWy9lbl1cbiAqICAgW2phXWNvbGxhcHNl54q25oWL44Gu5aC05ZCI44GrdHJ1ZeOBq+OBquOCiuOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQuY3VycmVudE1vZGVcbiAqICAgW2VuXUN1cnJlbnQgbW9kZS5bL2VuXVxuICogICBbamFd54++5Zyo44Gu44Oi44O844OJ5ZCN44KS6L+U44GX44G+44GZ44CCXCJjb2xsYXBzZVwi44GLXCJzcGxpdFwi44GL44Gu44GE44Ga44KM44GL44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV2ZW50LnNwbGl0XG4gKiAgIFtlbl1DYWxsIHRvIGZvcmNlIHNwbGl0LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7plqLmlbDjgpLlkbzjgbPlh7rjgZnjgajlvLfliLbnmoTjgatzcGxpdOODouODvOODieOBq+OBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBldmVudC5jb2xsYXBzZVxuICogICBbZW5dQ2FsbCB0byBmb3JjZSBjb2xsYXBzZS5bL2VuXVxuICogICBbamFd44GT44Gu6Zai5pWw44KS5ZG844Gz5Ye644GZ44Go5by35Yi255qE44GrY29sbGFwc2Xjg6Ljg7zjg4njgavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50LndpZHRoXG4gKiAgIFtlbl1DdXJyZW50IHdpZHRoLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga5TcGxpdFZpZXfjga7luYXjgpLov5TjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgYvjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCIFsvamFdXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgcHJlc3BsaXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBiZWZvcmUgdGhlIHZpZXcgaXMgc3BsaXQuWy9lbl1cbiAqICAgW2phXXNwbGl054q25oWL44Gr44KL5YmN44Gr55m654Gr44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICogICBbZW5dRXZlbnQgb2JqZWN0LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgqrjg5bjgrjjgqfjgq/jg4jjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnNwbGl0Vmlld1xuICogICBbZW5dU3BsaXQgdmlldyBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn1NwbGl0Vmlld+OCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge051bWJlcn0gZXZlbnQud2lkdGhcbiAqICAgW2VuXUN1cnJlbnQgd2lkdGguWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrlNwbGl0Vmlld27jga7luYXjgafjgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50Lm9yaWVudGF0aW9uXG4gKiAgIFtlbl1DdXJyZW50IG9yaWVudGF0aW9uLlsvZW5dXG4gKiAgIFtqYV3nj77lnKjjga7nlLvpnaLjga7jgqrjg6rjgqjjg7Pjg4bjg7zjgrfjg6fjg7PjgpLov5TjgZfjgb7jgZnjgIJcInBvcnRyYWl0XCLjgoLjgZfjgY/jga9cImxhbmRzY2FwZVwi44Gn44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBldmVudCBwb3N0c3BsaXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRmlyZWQganVzdCBhZnRlciB0aGUgdmlldyBpcyBzcGxpdC5bL2VuXVxuICogICBbamFdc3BsaXTnirbmhYvjgavjgarjgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZWNvbGxhcHNlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUZpcmVkIGp1c3QgYmVmb3JlIHRoZSB2aWV3IGlzIGNvbGxhcHNlZC5bL2VuXVxuICogICBbamFdY29sbGFwc2XnirbmhYvjgavjgarjgovliY3jgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3Rjb2xsYXBzZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GaXJlZCBqdXN0IGFmdGVyIHRoZSB2aWV3IGlzIGNvbGxhcHNlZC5bL2VuXVxuICogICBbamFdY29sbGFwc2XnirbmhYvjgavjgarjgaPjgZ/lvozjgavnmbrngavjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKiAgIFtlbl1FdmVudCBvYmplY3QuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOCquODluOCuOOCp+OCr+ODiOOAglsvamFdXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQuc3BsaXRWaWV3XG4gKiAgIFtlbl1TcGxpdCB2aWV3IG9iamVjdC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44GfU3BsaXRWaWV344Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBldmVudC53aWR0aFxuICogICBbZW5dQ3VycmVudCB3aWR0aC5bL2VuXVxuICogICBbamFd54++5Zyo44GuU3BsaXRWaWV3buOBruW5heOBp+OBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQub3JpZW50YXRpb25cbiAqICAgW2VuXUN1cnJlbnQgb3JpZW50YXRpb24uWy9lbl1cbiAqICAgW2phXeePvuWcqOOBrueUu+mdouOBruOCquODquOCqOODs+ODhuODvOOCt+ODp+ODs+OCkui/lOOBl+OBvuOBmeOAglwicG9ydHJhaXRcIuOCguOBl+OBj+OBr1wibGFuZHNjYXBlXCLjgafjgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNwbGl0IHZpZXcuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODl+ODquODg+ODiOODk+ODpeODvOOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG1haW4tcGFnZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIG9uIHRoZSByaWdodC5bL2VuXVxuICogICBbamFd5Y+z5YG044Gr6KGo56S644GZ44KL44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbWFpbi1wYWdlLXdpZHRoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU1haW4gcGFnZSB3aWR0aCBwZXJjZW50YWdlLiBUaGUgc2Vjb25kYXJ5IHBhZ2Ugd2lkdGggd2lsbCBiZSB0aGUgcmVtYWluaW5nIHBlcmNlbnRhZ2UuWy9lbl1cbiAqICAgW2phXeWPs+WBtOOBruODmuODvOOCuOOBruW5heOCkuODkeODvOOCu+ODs+ODiOWNmOS9jeOBp+aMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHNlY29uZGFyeS1wYWdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2Ugb24gdGhlIGxlZnQuWy9lbl1cbiAqICAgW2phXeW3puWBtOOBq+ihqOekuuOBmeOCi+ODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIGNvbGxhcHNlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIFNwZWNpZnkgdGhlIGNvbGxhcHNlIGJlaGF2aW9yLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0LCBsYW5kc2NhcGUsIHdpZHRoICNweCBvciBhIG1lZGlhIHF1ZXJ5LlxuICogICAgIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiIG1lYW5zIHRoZSB2aWV3IHdpbGwgY29sbGFwc2Ugd2hlbiBkZXZpY2UgaXMgaW4gbGFuZHNjYXBlIG9yIHBvcnRyYWl0IG9yaWVudGF0aW9uLlxuICogICAgIFwid2lkdGggI3B4XCIgbWVhbnMgdGhlIHZpZXcgd2lsbCBjb2xsYXBzZSB3aGVuIHRoZSB3aW5kb3cgd2lkdGggaXMgc21hbGxlciB0aGFuIHRoZSBzcGVjaWZpZWQgI3B4LlxuICogICAgIElmIHRoZSB2YWx1ZSBpcyBhIG1lZGlhIHF1ZXJ5LCB0aGUgdmlldyB3aWxsIGNvbGxhcHNlIHdoZW4gdGhlIG1lZGlhIHF1ZXJ5IGlzIHRydWUuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDlt6blgbTjga7jg5rjg7zjgrjjgpLpnZ7ooajnpLrjgavjgZnjgovmnaHku7bjgpLmjIflrprjgZfjgb7jgZnjgIJwb3J0cmFpdCwgbGFuZHNjYXBl44CBd2lkdGggI3B444KC44GX44GP44Gv44Oh44OH44Kj44Ki44Kv44Ko44Oq44Gu5oyH5a6a44GM5Y+v6IO944Gn44GZ44CCXG4gKiAgICAgcG9ydHJhaXTjgoLjgZfjgY/jga9sYW5kc2NhcGXjgpLmjIflrprjgZnjgovjgajjgIHjg4fjg5DjgqTjgrnjga7nlLvpnaLjgYznuKblkJHjgY3jgoLjgZfjgY/jga/mqKrlkJHjgY3jgavjgarjgaPjgZ/mmYLjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgICB3aWR0aCAjcHjjgpLmjIflrprjgZnjgovjgajjgIHnlLvpnaLjgYzmjIflrprjgZfjgZ/mqKrluYXjgojjgorjgoLnn63jgYTloLTlkIjjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgICDjg6Hjg4fjgqPjgqLjgq/jgqjjg6rjgpLmjIflrprjgZnjgovjgajjgIHmjIflrprjgZfjgZ/jgq/jgqjjg6rjgavpganlkIjjgZfjgabjgYTjgovloLTlkIjjgavpgannlKjjgZXjgozjgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXVwZGF0ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwidXBkYXRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJ1cGRhdGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzcGxpdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc3BsaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNwbGl0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY29sbGFwc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNvbGxhcHNlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjb2xsYXBzZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzcGxpdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNwbGl0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c3BsaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y29sbGFwc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3Rjb2xsYXBzZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNvbGxhcHNlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBzZXRNYWluUGFnZVxuICogQHNpZ25hdHVyZSBzZXRNYWluUGFnZShwYWdlVXJsKVxuICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VVcmxcbiAqICAgW2VuXVBhZ2UgVVJMLiBDYW4gYmUgZWl0aGVyIGFuIEhUTUwgZG9jdW1lbnQgb3IgYW4gPG9ucy10ZW1wbGF0ZT4uWy9lbl1cbiAqICAgW2phXXBhZ2Xjga5VUkzjgYvjgIFvbnMtdGVtcGxhdGXjgaflrqPoqIDjgZfjgZ/jg4bjg7Pjg5fjg6zjg7zjg4jjga5pZOWxnuaAp+OBruWApOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVNob3cgdGhlIHBhZ2Ugc3BlY2lmaWVkIGluIHBhZ2VVcmwgaW4gdGhlIHJpZ2h0IHNlY3Rpb25bL2VuXVxuICogICBbamFd5oyH5a6a44GX44GfVVJM44KS44Oh44Kk44Oz44Oa44O844K444KS6Kqt44G/6L6844G/44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0U2Vjb25kYXJ5UGFnZVxuICogQHNpZ25hdHVyZSBzZXRTZWNvbmRhcnlQYWdlKHBhZ2VVcmwpXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFnZVVybFxuICogICBbZW5dUGFnZSBVUkwuIENhbiBiZSBlaXRoZXIgYW4gSFRNTCBkb2N1bWVudCBvciBhbiA8b25zLXRlbXBsYXRlPi5bL2VuXVxuICogICBbamFdcGFnZeOBrlVSTOOBi+OAgW9ucy10ZW1wbGF0ZeOBp+Wuo+iogOOBl+OBn+ODhuODs+ODl+ODrOODvOODiOOBrmlk5bGe5oCn44Gu5YCk44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dU2hvdyB0aGUgcGFnZSBzcGVjaWZpZWQgaW4gcGFnZVVybCBpbiB0aGUgbGVmdCBzZWN0aW9uWy9lbl1cbiAqICAgW2phXeaMh+WumuOBl+OBn1VSTOOCkuW3puOBruODmuODvOOCuOOBruiqreOBv+i+vOOBv+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIHVwZGF0ZVxuICogQHNpZ25hdHVyZSB1cGRhdGUoKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UcmlnZ2VyIGFuICd1cGRhdGUnIGV2ZW50IGFuZCB0cnkgdG8gZGV0ZXJtaW5lIGlmIHRoZSBzcGxpdCBiZWhhdmlvciBzaG91bGQgYmUgY2hhbmdlZC5bL2VuXVxuICogICBbamFdc3BsaXTjg6Ljg7zjg4njgpLlpInjgYjjgovjgbnjgY3jgYvjganjgYbjgYvjgpLliKTmlq3jgZnjgovjgZ/jgoHjga4ndXBkYXRlJ+OCpOODmeODs+ODiOOCkueZuueBq+OBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTcGxpdFZpZXcnLCBbJyRjb21waWxlJywgJ1NwbGl0VmlldycsICckb25zZW4nLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXRWaWV3LCAkb25zZW4pIHtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgbWFpblBhZ2UgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXBhZ2UnKSxcbiAgICAgICAgICAgIHNlY29uZGFyeVBhZ2UgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmRhcnktcGFnZScpO1xuXG4gICAgICAgIGlmIChtYWluUGFnZSkge1xuICAgICAgICAgIHZhciBtYWluSHRtbCA9IGFuZ3VsYXIuZWxlbWVudChtYWluUGFnZSkucmVtb3ZlKCkuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNvbmRhcnlQYWdlKSB7XG4gICAgICAgICAgdmFyIHNlY29uZGFyeUh0bWwgPSBhbmd1bGFyLmVsZW1lbnQoc2Vjb25kYXJ5UGFnZSkucmVtb3ZlKCkuaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNwbGl0LXZpZXdfX3NlY29uZGFyeSBmdWxsLXNjcmVlbicpKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZChhbmd1bGFyLmVsZW1lbnQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ29uc2VuLXNwbGl0LXZpZXdfX21haW4gZnVsbC1zY3JlZW4nKSk7XG5cbiAgICAgICAgICB2YXIgc3BsaXRWaWV3ID0gbmV3IFNwbGl0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgaWYgKG1haW5IdG1sICYmICFhdHRycy5tYWluUGFnZSkge1xuICAgICAgICAgICAgc3BsaXRWaWV3Ll9hcHBlbmRNYWluUGFnZShtYWluSHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY29uZGFyeUh0bWwgJiYgIWF0dHJzLnNlY29uZGFyeVBhZ2UpIHtcbiAgICAgICAgICAgIHNwbGl0Vmlldy5fYXBwZW5kU2Vjb25kUGFnZShzZWNvbmRhcnlIdG1sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3BsaXRWaWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwbGl0VmlldywgJ3VwZGF0ZSBwcmVzcGxpdCBwcmVjb2xsYXBzZSBwb3N0c3BsaXQgcG9zdGNvbGxhcHNlIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0LXZpZXcnLCBzcGxpdFZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BsaXRWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdC12aWV3JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ1NwbGl0dGVyQ29udGVudCcsIFsnJG9uc2VuJywgJyRjb21waWxlJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyQ29udGVudCA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLmxvYWQgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHRoaXMuX3BhZ2VTY29wZSAmJiB0aGlzLl9wYWdlU2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXS5sb2FkKC4uLmFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9saW5rOiBmdW5jdGlvbihmcmFnbWVudCwgZG9uZSkge1xuICAgICAgICB0aGlzLl9wYWdlU2NvcGUgPSB0aGlzLl9zY29wZS4kbmV3KCk7XG4gICAgICAgICRjb21waWxlKGZyYWdtZW50KSh0aGlzLl9wYWdlU2NvcGUpO1xuXG4gICAgICAgIHRoaXMuX3BhZ2VTY29wZS4kZXZhbEFzeW5jKCgpID0+IGRvbmUoZnJhZ21lbnQpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gdGhpcy5sb2FkID0gdGhpcy5fcGFnZVNjb3BlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oU3BsaXR0ZXJDb250ZW50KTtcbiAgICAkb25zZW4uZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50KFNwbGl0dGVyQ29udGVudCwgWydwYWdlJ10pO1xuXG4gICAgcmV0dXJuIFNwbGl0dGVyQ29udGVudDtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlclNpZGUnLCBbJyRvbnNlbicsICckY29tcGlsZScsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUpIHtcblxuICAgIHZhciBTcGxpdHRlclNpZGUgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCB0aGlzLl9lbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ29wZW4nLCAnY2xvc2UnLCAndG9nZ2xlJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLmxvYWQgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHRoaXMuX3BhZ2VTY29wZSAmJiB0aGlzLl9wYWdlU2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXS5sb2FkKC4uLmFyZ3MpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnbW9kZWNoYW5nZScsICdwcmVvcGVuJywgJ3ByZWNsb3NlJywgJ3Bvc3RvcGVuJywgJ3Bvc3RjbG9zZSdcbiAgICAgICAgXSwgZGV0YWlsID0+IGRldGFpbC5zaWRlID8gYW5ndWxhci5leHRlbmQoZGV0YWlsLCB7c2lkZTogdGhpc30pIDogZGV0YWlsKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG5cbiAgICAgIF9saW5rOiBmdW5jdGlvbihmcmFnbWVudCwgZG9uZSkge1xuICAgICAgICB2YXIgbGluayA9ICRjb21waWxlKGZyYWdtZW50KTtcbiAgICAgICAgdGhpcy5fcGFnZVNjb3BlID0gdGhpcy5fc2NvcGUuJG5ldygpO1xuICAgICAgICBsaW5rKHRoaXMuX3BhZ2VTY29wZSk7XG5cbiAgICAgICAgdGhpcy5fcGFnZVNjb3BlLiRldmFsQXN5bmMoKCkgPT4gZG9uZShmcmFnbWVudCkpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLmxvYWQgPSB0aGlzLl9wYWdlU2NvcGUgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihTcGxpdHRlclNpZGUpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3BsaXR0ZXJTaWRlLCBbJ3BhZ2UnLCAnbW9kZScsICdpc09wZW4nXSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXJTaWRlO1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzcGxpdCB2aWV3LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5fjg6rjg4Pjg4jjg5Pjg6Xjg7zjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyJywgWyckY29tcGlsZScsICdTcGxpdHRlcicsICckb25zZW4nLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXIsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgdmFyIHNwbGl0dGVyID0gbmV3IFNwbGl0dGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3BsaXR0ZXIpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BsaXR0ZXIsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlcicsIHNwbGl0dGVyKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNwbGl0dGVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXN3aXRjaFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHN3aXRjaC5bL2VuXVxuICogICBbamFdSmF2YVNjcmlwdOOBi+OCieWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1N3aXRjaCcsIFsnJG9uc2VuJywgJ1N3aXRjaFZpZXcnLCBmdW5jdGlvbigkb25zZW4sIFN3aXRjaFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5uZ0NvbnRyb2xsZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgZWxlbWVudCBjYW5cXCd0IGFjY2VwdCBuZy1jb250cm9sbGVyIGRpcmVjdGl2ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzd2l0Y2hWaWV3ID0gbmV3IFN3aXRjaFZpZXcoZWxlbWVudCwgc2NvcGUsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHN3aXRjaFZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzd2l0Y2hWaWV3KTtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgc3dpdGNoVmlldyk7XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzd2l0Y2hWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzd2l0Y2hWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zd2l0Y2gnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IGF0dHJzID0gc2NvcGUgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUudmFsdWUoJ1RhYmJhck5vbmVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyTm9uZUFuaW1hdG9yKTtcbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJGYWRlQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhckZhZGVBbmltYXRvcik7XG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyU2xpZGVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyU2xpZGVBbmltYXRvcik7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1RhYmJhclZpZXcnLCBbJyRvbnNlbicsICckY29tcGlsZScsICckcGFyc2UnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCAkcGFyc2UpIHtcbiAgICB2YXIgVGFiYmFyVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnb25zLXRhYmJhcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiZWxlbWVudFwiIHBhcmFtZXRlciBtdXN0IGJlIGEgXCJvbnMtdGFiYmFyXCIgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZVNjb3BlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3JlYWN0aXZlJywgJ3Bvc3RjaGFuZ2UnLCAncHJlY2hhbmdlJywgJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVUYWInLFxuICAgICAgICAgICdzZXRUYWJiYXJWaXNpYmlsaXR5JyxcbiAgICAgICAgICAnZ2V0QWN0aXZlVGFiSW5kZXgnLFxuICAgICAgICAgICdsb2FkUGFnZSdcbiAgICAgICAgXSk7XG5cbiAgICAgIH0sXG5cbiAgICAgIF9jb21waWxlQW5kTGluazogZnVuY3Rpb24ocGFnZUVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBsaW5rID0gJGNvbXBpbGUocGFnZUVsZW1lbnQpO1xuICAgICAgICB2YXIgcGFnZVNjb3BlID0gdGhpcy5fc2NvcGUuJG5ldygpO1xuICAgICAgICBsaW5rKHBhZ2VTY29wZSk7XG5cbiAgICAgICAgcGFnZVNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2FsbGJhY2socGFnZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBNaWNyb0V2ZW50Lm1peGluKFRhYmJhclZpZXcpO1xuXG4gICAgVGFiYmFyVmlldy5yZWdpc3RlckFuaW1hdG9yID0gZnVuY3Rpb24obmFtZSwgQW5pbWF0b3IpIHtcbiAgICAgIHJldHVybiB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmVnaXN0ZXJBbmltYXRvcihuYW1lLCBBbmltYXRvcik7XG4gICAgfTtcblxuICAgIHJldHVybiBUYWJiYXJWaWV3O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQmFja0J1dHRvbicsIFsnJG9uc2VuJywgJyRjb21waWxlJywgJ0dlbmVyaWNWaWV3JywgJ0NvbXBvbmVudENsZWFuZXInLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCBHZW5lcmljVmlldywgQ29tcG9uZW50Q2xlYW5lcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIGJhY2tCdXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgICAgdmlld0tleTogJ29ucy1iYWNrLWJ1dHRvbidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGJhY2tCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhiYWNrQnV0dG9uKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cnMpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQm90dG9tVG9vbGJhcicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgdmlld0tleTogJ29ucy1ib3R0b21Ub29sYmFyJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcblxuIiwiXG4vKipcbiAqIEBlbGVtZW50IG9ucy1idXR0b25cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQnV0dG9uJywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYnV0dG9uJ1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYnV0dG9uLCAnZGlzYWJsZWQnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZCA9IHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG5cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNEdW1teUZvckluaXQnLCBbJyRyb290U2NvcGUnLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgdmFyIGlzUmVhZHkgPSBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IHtcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoIWlzUmVhZHkpIHtcbiAgICAgICAgICAgIGlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckb25zLXJlYWR5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgRVZFTlRTID1cbiAgICAoJ2RyYWcgZHJhZ2xlZnQgZHJhZ3JpZ2h0IGRyYWd1cCBkcmFnZG93biBob2xkIHJlbGVhc2Ugc3dpcGUgc3dpcGVsZWZ0IHN3aXBlcmlnaHQgJyArXG4gICAgICAnc3dpcGV1cCBzd2lwZWRvd24gdGFwIGRvdWJsZXRhcCB0b3VjaCB0cmFuc2Zvcm0gcGluY2ggcGluY2hpbiBwaW5jaG91dCByb3RhdGUnKS5zcGxpdCgvICsvKTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0dlc3R1cmVEZXRlY3RvcicsIFsnJG9uc2VuJywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgc2NvcGVEZWYgPSBFVkVOVFMucmVkdWNlKGZ1bmN0aW9uKGRpY3QsIG5hbWUpIHtcbiAgICAgIGRpY3RbJ25nJyArIHRpdGxpemUobmFtZSldID0gJyYnO1xuICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfSwge30pO1xuXG4gICAgZnVuY3Rpb24gdGl0bGl6ZShzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogc2NvcGVEZWYsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBfLCB0cmFuc2NsdWRlKSB7XG5cbiAgICAgICAgICB0cmFuc2NsdWRlKHNjb3BlLiRwYXJlbnQsIGZ1bmN0aW9uKGNsb25lZCkge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoY2xvbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBhdHRyID0gJ25nJyArIHRpdGxpemUoZXZlbnQudHlwZSk7XG5cbiAgICAgICAgICAgIGlmIChhdHRyIGluIHNjb3BlRGVmKSB7XG4gICAgICAgICAgICAgIHNjb3BlW2F0dHJdKHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBnZXN0dXJlRGV0ZWN0b3I7XG5cbiAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3IgPSBlbGVtZW50WzBdLl9nZXN0dXJlRGV0ZWN0b3I7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3Iub24oRVZFTlRTLmpvaW4oJyAnKSwgaGFuZGxlcik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLm9mZihFVkVOVFMuam9pbignICcpLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5lbGVtZW50ID0gc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtaWNvblxuICovXG5cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNJY29uJywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgaWYgKGF0dHJzLmljb24uaW5kZXhPZigne3snKSAhPT0gLTEpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnaWNvbicsICgpID0+IHtcbiAgICAgICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiBlbGVtZW50WzBdLl91cGRhdGUoKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHNjb3BlLCBlbGVtZW50LCBhdHRycykgPT4ge1xuICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgdmlld0tleTogJ29ucy1pY29uJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcblxuICAgICAgfVxuXG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1vcmllbnRhdGlvblxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUNvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiBzY3JlZW4gb3JpZW50YXRpb24uIFZhbGlkIHZhbHVlcyBhcmUgcG9ydHJhaXQgYW5kIGxhbmRzY2FwZS4gRGlmZmVyZW50IGZyb20gb3RoZXIgY29tcG9uZW50cywgdGhpcyBjb21wb25lbnQgaXMgdXNlZCBhcyBhdHRyaWJ1dGUgaW4gYW55IGVsZW1lbnQuWy9lbl1cbiAqICAgW2phXeeUu+mdouOBruWQkeOBjeOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuihjOOBhOOBvuOBmeOAgnBvcnRyYWl044KC44GX44GP44GvbGFuZHNjYXBl44KS5oyH5a6a44Gn44GN44G+44GZ44CC44GZ44G544Gm44Gu6KaB57Sg44Gu5bGe5oCn44Gr5L2/55So44Gn44GN44G+44GZ44CCWy9qYV1cbiAqIEBzZWVhbHNvIG9ucy1pZi1wbGF0Zm9ybSBbZW5db25zLWlmLXBsYXRmb3JtIGNvbXBvbmVudFsvZW5dW2phXW9ucy1pZi1wbGF0Zm9ybeOCs+ODs+ODneODvOODjeODs+ODiFsvamFdXG4gKiBAZ3VpZGUgVXRpbGl0eUFQSXMgW2VuXU90aGVyIHV0aWxpdHkgQVBJc1svZW5dW2phXeS7luOBruODpuODvOODhuOCo+ODquODhuOCo0FQSVsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMtaWYtb3JpZW50YXRpb249XCJwb3J0cmFpdFwiPlxuICogICA8cD5UaGlzIHdpbGwgb25seSBiZSB2aXNpYmxlIGluIHBvcnRyYWl0IG1vZGUuPC9wPlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pZi1vcmllbnRhdGlvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1FaXRoZXIgXCJwb3J0cmFpdFwiIG9yIFwibGFuZHNjYXBlXCIuWy9lbl1cbiAqICAgW2phXXBvcnRyYWl044KC44GX44GP44GvbGFuZHNjYXBl44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNJZk9yaWVudGF0aW9uJywgWyckb25zZW4nLCAnJG9uc0dsb2JhbCcsIGZ1bmN0aW9uKCRvbnNlbiwgJG9uc0dsb2JhbCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ29uc0lmT3JpZW50YXRpb24nLCB1cGRhdGUpO1xuICAgICAgICAgICRvbnNHbG9iYWwub3JpZW50YXRpb24ub24oJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICAgICAgICB1cGRhdGUoKTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkb25zR2xvYmFsLm9yaWVudGF0aW9uLm9mZignY2hhbmdlJywgdXBkYXRlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJPcmllbnRhdGlvbiA9ICgnJyArIGF0dHJzLm9uc0lmT3JpZW50YXRpb24pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB2YXIgb3JpZW50YXRpb24gPSBnZXRMYW5kc2NhcGVPclBvcnRyYWl0KCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgfHwgdXNlck9yaWVudGF0aW9uID09PSAnbGFuZHNjYXBlJykge1xuICAgICAgICAgICAgICBpZiAodXNlck9yaWVudGF0aW9uID09PSBvcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJycpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGdldExhbmRzY2FwZU9yUG9ydHJhaXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5pc1BvcnRyYWl0KCkgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWlmLXBsYXRmb3JtXG4gKiBAY2F0ZWdvcnkgY29uZGl0aW9uYWxcbiAqIEBkZXNjcmlwdGlvblxuICogICAgW2VuXUNvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiB0aGUgcGxhdGZvcm0gLyBicm93c2VyLiBWYWxpZCB2YWx1ZXMgYXJlIFwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiBhbmQgXCJ3cFwiLlsvZW5dXG4gKiAgICBbamFd44OX44Op44OD44OI44OV44Kp44O844Og44KE44OW44Op44Km44K244O844Gr5b+c44GY44Gm44Kz44Oz44OG44Oz44OE44Gu5Yi25b6h44KS44GK44GT44Gq44GE44G+44GZ44CCb3BlcmEsIGZpcmVmb3gsIHNhZmFyaSwgY2hyb21lLCBpZSwgZWRnZSwgYW5kcm9pZCwgYmxhY2tiZXJyeSwgaW9zLCB3cOOBruOBhOOBmuOCjOOBi+OBruWApOOCkuepuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtb3JpZW50YXRpb24gW2VuXW9ucy1pZi1vcmllbnRhdGlvbiBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtb3JpZW50YXRpb27jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLXBsYXRmb3JtPVwiYW5kcm9pZFwiPlxuICogICAuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtcGxhdGZvcm1cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dT25lIG9yIG11bHRpcGxlIHNwYWNlIHNlcGFyYXRlZCB2YWx1ZXM6IFwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiBvciBcIndwXCIuWy9lbl1cbiAqICAgW2phXVwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiwgXCJ3cFwi44Gu44GE44Ga44KM44GL56m655m95Yy65YiH44KK44Gn6KSH5pWw5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZQbGF0Zm9ybScsIFsnJG9uc2VuJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHZhciBwbGF0Zm9ybSA9IGdldFBsYXRmb3JtU3RyaW5nKCk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZlBsYXRmb3JtJywgZnVuY3Rpb24odXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJQbGF0Zm9ybXMgPSBhdHRycy5vbnNJZlBsYXRmb3JtLnRvTG93ZXJDYXNlKCkudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGxhdGZvcm1TdHJpbmcoKSB7XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSkpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9SSU0gVGFibGV0IE9TL2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQkIxMC9pKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYmxhY2tiZXJyeSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZXxpUGFkfGlQb2QvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW9zJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZXxJRU1vYmlsZXxXUERlc2t0b3AvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnd3AnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE9wZXJhIDguMCsgKFVBIGRldGVjdGlvbiB0byBkZXRlY3QgQmxpbmsvdjgtcG93ZXJlZCBPcGVyYSlcbiAgICAgICAgICB2YXIgaXNPcGVyYSA9ICEhd2luZG93Lm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc09wZXJhKSB7XG4gICAgICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJzsgICAvLyBGaXJlZm94IDEuMCtcbiAgICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc1NhZmFyaSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cuSFRNTEVsZW1lbnQpLmluZGV4T2YoJ0NvbnN0cnVjdG9yJykgPiAwO1xuICAgICAgICAgIC8vIEF0IGxlYXN0IFNhZmFyaSAzKzogXCJbb2JqZWN0IEhUTUxFbGVtZW50Q29uc3RydWN0b3JdXCJcbiAgICAgICAgICBpZiAoaXNTYWZhcmkpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNFZGdlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgRWRnZS8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc0VkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAnZWRnZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzQ2hyb21lID0gISF3aW5kb3cuY2hyb21lICYmICFpc09wZXJhICYmICFpc0VkZ2U7IC8vIENocm9tZSAxK1xuICAgICAgICAgIGlmIChpc0Nocm9tZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0lFID0gLypAY2Nfb24hQCovZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7IC8vIEF0IGxlYXN0IElFNlxuICAgICAgICAgIGlmIChpc0lFKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQGlkIGlucHV0XG4gKiBAbmFtZSBvbnMtaW5wdXRcbiAqIEBjYXRlZ29yeSBmb3JtXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dSW5wdXQgY29tcG9uZW50LlsvZW5dXG4gKiAgW2phXWlucHV044Kz44Oz44Od4oCV44ON44Oz44OI44Gn44GZ44CCWy9qYV1cbiAqIEBjb2RlcGVuIG9qUXhMalxuICogQGd1aWRlIFVzaW5nRm9ybUNvbXBvbmVudHNcbiAqICAgW2VuXVVzaW5nIGZvcm0gY29tcG9uZW50c1svZW5dXG4gKiAgIFtqYV3jg5Xjgqnjg7zjg6DjgpLkvb/jgYZbL2phXVxuICogQGd1aWRlIEV2ZW50SGFuZGxpbmdcbiAqICAgW2VuXUV2ZW50IGhhbmRsaW5nIGRlc2NyaXB0aW9uc1svZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlh6bnkIbjga7kvb/jgYTmlrlbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtaW5wdXQ+PC9vbnMtaW5wdXQ+XG4gKiA8b25zLWlucHV0IG1vZGlmaWVyPVwibWF0ZXJpYWxcIiBsYWJlbD1cIlVzZXJuYW1lXCI+PC9vbnMtaW5wdXQ+XG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgYXR0cmlidXRlXG4gKiBAbmFtZSBsYWJlbFxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGV4dCBmb3IgYW5pbWF0ZWQgZmxvYXRpbmcgbGFiZWwuWy9lbl1cbiAqICAgW2phXeOCouODi+ODoeODvOOCt+ODp+ODs+OBleOBm+OCi+ODleODreODvOODhuOCo+ODs+OCsOODqeODmeODq+OBruODhuOCreOCueODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgYXR0cmlidXRlXG4gKiBAbmFtZSBmbG9hdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUlmIHRoaXMgYXR0cmlidXRlIGlzIHByZXNlbnQsIHRoZSBsYWJlbCB3aWxsIGJlIGFuaW1hdGVkLlsvZW5dXG4gKiAgW2phXeOBk+OBruWxnuaAp+OBjOioreWumuOBleOCjOOBn+aZguOAgeODqeODmeODq+OBr+OCouODi+ODoeODvOOCt+ODp+ODs+OBmeOCi+OCiOOBhuOBq+OBquOCiuOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgYXR0cmlidXRlXG4gKiBAbmFtZSBuZy1tb2RlbFxuICogQGV4dGVuc2lvbk9mIGFuZ3VsYXJcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQmluZCB0aGUgdmFsdWUgdG8gYSBtb2RlbC4gV29ya3MganVzdCBsaWtlIGZvciBub3JtYWwgaW5wdXQgZWxlbWVudHMuWy9lbl1cbiAqICAgW2phXeOBk+OBruimgee0oOOBruWApOOCkuODouODh+ODq+OBq+e0kOS7mOOBkeOBvuOBmeOAgumAmuW4uOOBrmlucHV06KaB57Sg44Gu5qeY44Gr5YuV5L2c44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBhdHRyaWJ1dGVcbiAqIEBuYW1lIG5nLWNoYW5nZVxuICogQGV4dGVuc2lvbk9mIGFuZ3VsYXJcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRXhlY3V0ZXMgYW4gZXhwcmVzc2lvbiB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzLiBXb3JrcyBqdXN0IGxpa2UgZm9yIG5vcm1hbCBpbnB1dCBlbGVtZW50cy5bL2VuXVxuICogICBbamFd5YCk44GM5aSJ44KP44Gj44Gf5pmC44Gr44GT44Gu5bGe5oCn44Gn5oyH5a6a44GX44GfZXhwcmVzc2lvbuOBjOWun+ihjOOBleOCjOOBvuOBmeOAgumAmuW4uOOBrmlucHV06KaB57Sg44Gu5qeY44Gr5YuV5L2c44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSW5wdXQnLCBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIGlmIChlbC5faXNUZXh0SW5wdXQpIHtcbiAgICAgICAgICAgIHNldChzY29wZSwgZWwudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlbC50eXBlID09PSAncmFkaW8nICYmIGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHNldChzY29wZSwgZWwudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldChzY29wZSwgZWwuY2hlY2tlZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWwuX2lzVGV4dElucHV0ICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlID09PSBlbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbC5faXNUZXh0SW5wdXRcbiAgICAgICAgICAgID8gZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICAgICAgOiBlbGVtZW50Lm9uKCdjaGFuZ2UnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWwuX2lzVGV4dElucHV0XG4gICAgICAgICAgICA/IGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgICAgICA6IGVsZW1lbnQub2ZmKCdjaGFuZ2UnLCBvbklucHV0KTtcblxuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMta2V5Ym9hcmQtYWN0aXZlXG4gKiBAY2F0ZWdvcnkgZm9ybVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBDb25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gaWYgdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIHZpc2libGUgb3IgaGlkZGVuLlxuICogICAgIFRoaXMgY29tcG9uZW50IHJlcXVpcmVzIGNvcmRvdmEgYW5kIHRoYXQgdGhlIGNvbS5pb25pYy5rZXlib2FyZCBwbHVnaW4gaXMgaW5zdGFsbGVkLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6KGo56S644GV44KM44Gm44GE44KL44GL44Gp44GG44GL44Gn44CB44Kz44Oz44OG44Oz44OE44KS6KGo56S644GZ44KL44GL44Gp44GG44GL44KS5YiH44KK5pu/44GI44KL44GT44Go44GM5Ye65p2l44G+44GZ44CCXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44Gv44CBQ29yZG92YeOChGNvbS5pb25pYy5rZXlib2FyZOODl+ODqeOCsOOCpOODs+OCkuW/heimgeOBqOOBl+OBvuOBmeOAglxuICogICBbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzXG4gKiAgIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVxuICogICBbamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1rZXlib2FyZC1hY3RpdmU+XG4gKiAgIFRoaXMgd2lsbCBvbmx5IGJlIGRpc3BsYXllZCBpZiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgb3Blbi5cbiAqIDwvZGl2PlxuICogPGRpdiBvbnMta2V5Ym9hcmQtaW5hY3RpdmU+XG4gKiAgIFRoZXJlIGlzIGFsc28gYSBjb21wb25lbnQgdGhhdCBkb2VzIHRoZSBvcHBvc2l0ZS5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMta2V5Ym9hcmQtYWN0aXZlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSBjb250ZW50IG9mIHRhZ3Mgd2l0aCB0aGlzIGF0dHJpYnV0ZSB3aWxsIGJlIHZpc2libGUgd2hlbiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgb3Blbi5bL2VuXVxuICogICBbamFd44GT44Gu5bGe5oCn44GM44Gk44GE44Gf6KaB57Sg44Gv44CB44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6KGo56S644GV44KM44Gf5pmC44Gr5Yid44KB44Gm6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWtleWJvYXJkLWluYWN0aXZlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSBjb250ZW50IG9mIHRhZ3Mgd2l0aCB0aGlzIGF0dHJpYnV0ZSB3aWxsIGJlIHZpc2libGUgd2hlbiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgaGlkZGVuLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7lsZ7mgKfjgYzjgaTjgYTjgZ/opoHntKDjga/jgIHjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzpmqDjgozjgabjgYTjgovmmYLjga7jgb/ooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICB2YXIgY29tcGlsZUZ1bmN0aW9uID0gZnVuY3Rpb24oc2hvdywgJG9uc2VuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGRpc3BTaG93ID0gc2hvdyA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICAgICAgICBkaXNwSGlkZSA9IHNob3cgPyAnbm9uZScgOiAnYmxvY2snO1xuXG4gICAgICAgIHZhciBvblNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsIGRpc3BTaG93KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25IaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCBkaXNwSGlkZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9uSW5pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS52aXNpYmxlKSB7XG4gICAgICAgICAgICBvblNob3coKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25IaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdzaG93Jywgb25TaG93KTtcbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ2hpZGUnLCBvbkhpZGUpO1xuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignaW5pdCcsIG9uSW5pdCk7XG5cbiAgICAgICAgaWYgKG9ucy5zb2Z0d2FyZUtleWJvYXJkLl92aXNpYmxlKSB7XG4gICAgICAgICAgb25TaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25IaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignc2hvdycsIG9uU2hvdyk7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdoaWRlJywgb25IaWRlKTtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ2luaXQnLCBvbkluaXQpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0tleWJvYXJkQWN0aXZlJywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24odHJ1ZSwgJG9uc2VuKVxuICAgIH07XG4gIH1dKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNLZXlib2FyZEluYWN0aXZlJywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24oZmFsc2UsICRvbnNlbilcbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0JywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0J30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0SGVhZGVyJywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0SGVhZGVyJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0SXRlbScsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC1pdGVtJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWxvYWRpbmctcGxhY2Vob2xkZXJcbiAqIEBjYXRlZ29yeSB1dGlsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXURpc3BsYXkgYSBwbGFjZWhvbGRlciB3aGlsZSB0aGUgY29udGVudCBpcyBsb2FkaW5nLlsvZW5dXG4gKiAgIFtqYV1PbnNlbiBVSeOBjOiqreOBv+i+vOOBvuOCjOOCi+OBvuOBp+OBq+ihqOekuuOBmeOCi+ODl+ODrOODvOOCueODm+ODq+ODgOODvOOCkuihqOePvuOBl+OBvuOBmeOAglsvamFdXG4gKiBAZ3VpZGUgVXRpbGl0eUFQSXMgW2VuXU90aGVyIHV0aWxpdHkgQVBJc1svZW5dW2phXeS7luOBruODpuODvOODhuOCo+ODquODhuOCo0FQSVsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMtbG9hZGluZy1wbGFjZWhvbGRlcj1cInBhZ2UuaHRtbFwiPlxuICogICBMb2FkaW5nLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWxvYWRpbmctcGxhY2Vob2xkZXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIHVybCBvZiB0aGUgcGFnZSB0byBsb2FkLlsvZW5dXG4gKiAgIFtqYV3oqq3jgb/ovrzjgoDjg5rjg7zjgrjjga5VUkzjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMb2FkaW5nUGxhY2Vob2xkZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoYXR0cnMub25zTG9hZGluZ1BsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgb25zLl9yZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyKGVsZW1lbnRbMF0sIGF0dHJzLm9uc0xvYWRpbmdQbGFjZWhvbGRlciwgZnVuY3Rpb24oY29udGVudEVsZW1lbnQsIGRvbmUpIHtcbiAgICAgICAgICAgIG9ucy5jb21waWxlKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNldEltbWVkaWF0ZShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JhbmdlJywgWyckcGFyc2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzZXQoc2NvcGUsIGVsZW1lbnRbMF0udmFsdWUpO1xuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmlwcGxlJywgWyckb25zZW4nLCAnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1yaXBwbGUnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2NvcGVcbiAqIEBjYXRlZ29yeSB1dGlsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbCBjaGlsZCBlbGVtZW50cyB1c2luZyB0aGUgXCJ2YXJcIiBhdHRyaWJ1dGUgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgc2NvcGUgb2YgdGhpcyBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV1cInZhclwi5bGe5oCn44KS5L2/44Gj44Gm44GE44KL5YWo44Gm44Gu5a2Q6KaB57Sg44Gudmlld+OCquODluOCuOOCp+OCr+ODiOOBr+OAgeOBk+OBruimgee0oOOBrkFuZ3VsYXJKU+OCueOCs+ODvOODl+OBq+i/veWKoOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1saXN0PlxuICogICA8b25zLWxpc3QtaXRlbSBvbnMtc2NvcGUgbmctcmVwZWF0PVwiaXRlbSBpbiBpdGVtc1wiPlxuICogICAgIDxvbnMtY2Fyb3VzZWwgdmFyPVwiY2Fyb3VzZWxcIj5cbiAqICAgICAgIDxvbnMtY2Fyb3VzZWwtaXRlbSBuZy1jbGljaz1cImNhcm91c2VsLm5leHQoKVwiPlxuICogICAgICAgICB7eyBpdGVtIH19XG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbSBuZy1jbGljaz1cImNhcm91c2VsLnByZXYoKVwiPlxuICogICAgICAgICAuLi5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAgPC9vbnMtY2Fyb3VzZWw+XG4gKiAgIDwvb25zLWxpc3QtaXRlbT5cbiAqIDwvb25zLWxpc3Q+XG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1Njb3BlJywgWyckb25zZW4nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlci1jb250ZW50XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlNwbGl0dGVyQ29udGVudEVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1jb250ZW50JywgbGFzdFJlYWR5KTtcblxuICB2YXIgbGFzdExpbmsgPSB3aW5kb3cub25zLlNwbGl0dGVyQ29udGVudEVsZW1lbnQucmV3cml0YWJsZXMubGluaztcbiAgd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLmxpbmsgPSBmdW5jdGlvbihlbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHZpZXcgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnKTtcbiAgICBsYXN0TGluayhlbGVtZW50LCB0YXJnZXQsIG9wdGlvbnMsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgdmlldy5fbGluayh0YXJnZXQsIGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyQ29udGVudCcsIFsnJGNvbXBpbGUnLCAnU3BsaXR0ZXJDb250ZW50JywgJyRvbnNlbicsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlckNvbnRlbnQsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyQ29udGVudChzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB2aWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlci1zaWRlXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlb3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlb3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0b3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdG9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5TcGxpdHRlclNpZGVFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItc2lkZScsIGxhc3RSZWFkeSk7XG5cbiAgdmFyIGxhc3RMaW5rID0gd2luZG93Lm9ucy5TcGxpdHRlclNpZGVFbGVtZW50LnJld3JpdGFibGVzLmxpbms7XG4gIHdpbmRvdy5vbnMuU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5saW5rID0gZnVuY3Rpb24oZWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciB2aWV3ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJyk7XG4gICAgbGFzdExpbmsoZWxlbWVudCwgdGFyZ2V0LCBvcHRpb25zLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIHZpZXcuX2xpbmsodGFyZ2V0LCBjYWxsYmFjayk7XG4gICAgfSk7XG4gIH07XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlclNpZGUnLCBbJyRjb21waWxlJywgJ1NwbGl0dGVyU2lkZScsICckb25zZW4nLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJTaWRlLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlclNpZGUoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGFiLiRpbmplY3QgPSBbJyRvbnNlbiddO1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYicsIHRhYilcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWJiYXJJdGVtJywgdGFiKTsgLy8gZm9yIEJDXG5cbiAgZnVuY3Rpb24gdGFiKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdGFiYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdGFiIGJhci5bL2VuXVxuICogICBbamFd44GT44Gu44K/44OW44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgaGlkZS10YWJzXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtCb29sZWFufVxuICogQGRlZmF1bHQgZmFsc2VcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dV2hldGhlciB0byBoaWRlIHRoZSB0YWJzLiBWYWxpZCB2YWx1ZXMgYXJlIHRydWUvZmFsc2UuWy9lbl1cbiAqICAgW2phXeOCv+ODluOCkumdnuihqOekuuOBq+OBmeOCi+WgtOWQiOOBq+aMh+WumuOBl+OBvuOBmeOAgnRydWXjgoLjgZfjgY/jga9mYWxzZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1yZWFjdGl2ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicmVhY3RpdmVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlYWN0aXZlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy10YWJiYXInLCBsYXN0UmVhZHkpO1xuXG4gIHZhciBsYXN0TGluayA9IHdpbmRvdy5vbnMuVGFiYmFyRWxlbWVudC5yZXdyaXRhYmxlcy5saW5rO1xuICB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmV3cml0YWJsZXMubGluayA9IGZ1bmN0aW9uKHRhYmJhckVsZW1lbnQsIHRhcmdldCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgdmlldyA9IGFuZ3VsYXIuZWxlbWVudCh0YWJiYXJFbGVtZW50KS5kYXRhKCdvbnMtdGFiYmFyJyk7XG4gICAgdmlldy5fY29tcGlsZUFuZExpbmsodGFyZ2V0LCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIGxhc3RMaW5rKHRhYmJhckVsZW1lbnQsIHRhcmdldCwgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBsYXN0VW5saW5rID0gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnVubGluaztcbiAgd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnVubGluayA9IGZ1bmN0aW9uKHRhYmJhckVsZW1lbnQsIHRhcmdldCwgY2FsbGJhY2spIHtcbiAgICBhbmd1bGFyLmVsZW1lbnQodGFyZ2V0KS5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgIGxhc3RVbmxpbmsodGFiYmFyRWxlbWVudCwgdGFyZ2V0LCBjYWxsYmFjayk7XG4gIH07XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUYWJiYXInLCBbJyRvbnNlbicsICckY29tcGlsZScsICckcGFyc2UnLCAnVGFiYmFyVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUsICRwYXJzZSwgVGFiYmFyVmlldykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuXG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLmhpZGVUYWJzLCBmdW5jdGlvbihoaWRlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBoaWRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaGlkZSA9IGhpZGUgPT09ICd0cnVlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudFswXS5zZXRUYWJiYXJWaXNpYmlsaXR5KCFoaWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHRhYmJhclZpZXcgPSBuZXcgVGFiYmFyVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGFiYmFyVmlldywgZWxlbWVudCk7XG5cbiAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh0YWJiYXJWaWV3LCAncmVhY3RpdmUgcHJlY2hhbmdlIHBvc3RjaGFuZ2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHRhYmJhclZpZXcpO1xuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdGFiYmFyVmlldyk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRhYmJhclZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRhYmJhclZpZXcpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RlbXBsYXRlJywgWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBlbGVtZW50WzBdLnRlbXBsYXRlIHx8IGVsZW1lbnQuaHRtbCgpO1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoZWxlbWVudC5hdHRyKCdpZCcpLCBjb250ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdG9vbGJhci5bL2VuXVxuICogIFtqYV3jgZPjga7jg4Tjg7zjg6vjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXInLCBbJyRvbnNlbicsICdHZW5lcmljVmlldycsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgZGlydHkgZml4IVxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbMF0ubm9kZU5hbWUgPT09ICdvbnMtdG9vbGJhcicpIHtcbiAgICAgICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy10b29sYmFyJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvb2xiYXItYnV0dG9uXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYnV0dG9uLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5zjgr/jg7PjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zVG9vbGJhckJ1dHRvbicsIFsnJG9uc2VuJywgJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciB0b29sYmFyQnV0dG9uID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9vbGJhci1idXR0b24nLCB0b29sYmFyQnV0dG9uKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdG9vbGJhckJ1dHRvbik7XG5cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModG9vbGJhckJ1dHRvbiwgZWxlbWVudCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG9vbGJhckJ1dHRvbi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0b29sYmFyQnV0dG9uKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIENvbXBvbmVudENsZWFuZXIgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZWNvbXBvc2VOb2RlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50LnJlbW92ZSgpLmNoaWxkcmVuKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVjb21wb3NlTm9kZShhbmd1bGFyLmVsZW1lbnQoY2hpbGRyZW5baV0pKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBhdHRyc1xuICAgICAqL1xuICAgIGRlc3Ryb3lBdHRyaWJ1dGVzOiBmdW5jdGlvbihhdHRycykge1xuICAgICAgYXR0cnMuJCRlbGVtZW50ID0gbnVsbDtcbiAgICAgIGF0dHJzLiQkb2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZXN0cm95RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKi9cbiAgICBkZXN0cm95U2NvcGU6IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICBzY29wZS4kJGxpc3RlbmVycyA9IHt9O1xuICAgICAgc2NvcGUuJCR3YXRjaGVycyA9IG51bGw7XG4gICAgICBzY29wZSA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKHNjb3BlLCBmbikge1xuICAgICAgdmFyIGNsZWFyID0gc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhcigpO1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudENsZWFuZXI7XG4gIH0pO1xuXG4gIC8vIG92ZXJyaWRlIGJ1aWx0aW4gbmctKGV2ZW50bmFtZSkgZGlyZWN0aXZlc1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5nRXZlbnREaXJlY3RpdmVzID0ge307XG4gICAgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgbW91c2VlbnRlciBtb3VzZWxlYXZlIGtleWRvd24ga2V5dXAga2V5cHJlc3Mgc3VibWl0IGZvY3VzIGJsdXIgY29weSBjdXQgcGFzdGUnLnNwbGl0KCcgJykuZm9yRWFjaChcbiAgICAgIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmVOb3JtYWxpemUoJ25nLScgKyBuYW1lKTtcbiAgICAgICAgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0gPSBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlOiBmdW5jdGlvbigkZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICB2YXIgZm4gPSAkcGFyc2UoYXR0cltkaXJlY3RpdmVOYW1lXSk7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKHNjb3BlLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgICAgICBzY29wZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cik7XG4gICAgICAgICAgICAgICAgICBhdHRyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XTtcblxuICAgICAgICBmdW5jdGlvbiBkaXJlY3RpdmVOb3JtYWxpemUobmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIG1vZHVsZS5jb25maWcoWyckcHJvdmlkZScsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICB2YXIgc2hpZnQgPSBmdW5jdGlvbigkZGVsZWdhdGUpIHtcbiAgICAgICAgJGRlbGVnYXRlLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiAkZGVsZWdhdGU7XG4gICAgICB9O1xuICAgICAgT2JqZWN0LmtleXMobmdFdmVudERpcmVjdGl2ZXMpLmZvckVhY2goZnVuY3Rpb24oZGlyZWN0aXZlTmFtZSkge1xuICAgICAgICAkcHJvdmlkZS5kZWNvcmF0b3IoZGlyZWN0aXZlTmFtZSArICdEaXJlY3RpdmUnLCBbJyRkZWxlZ2F0ZScsIHNoaWZ0XSk7XG4gICAgICB9KTtcbiAgICB9XSk7XG4gICAgT2JqZWN0LmtleXMobmdFdmVudERpcmVjdGl2ZXMpLmZvckVhY2goZnVuY3Rpb24oZGlyZWN0aXZlTmFtZSkge1xuICAgICAgbW9kdWxlLmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBuZ0V2ZW50RGlyZWN0aXZlc1tkaXJlY3RpdmVOYW1lXSk7XG4gICAgfSk7XG4gIH0pKCk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuWydhbGVydCcsICdjb25maXJtJywgJ3Byb21wdCddLmZvckVhY2gobmFtZSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsTm90aWZpY2F0aW9uID0gb25zLm5vdGlmaWNhdGlvbltuYW1lXTtcblxuICBvbnMubm90aWZpY2F0aW9uW25hbWVdID0gKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJyA/IChvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlKSA6IChvcHRpb25zID0gbWVzc2FnZSk7XG5cbiAgICBjb25zdCBjb21waWxlID0gb3B0aW9ucy5jb21waWxlO1xuICAgIGxldCAkZWxlbWVudDtcblxuICAgIG9wdGlvbnMuY29tcGlsZSA9IGVsZW1lbnQgPT4ge1xuICAgICAgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY29tcGlsZSA/IGNvbXBpbGUoZWxlbWVudCkgOiBlbGVtZW50KTtcbiAgICAgIHJldHVybiBvbnMuJGNvbXBpbGUoJGVsZW1lbnQpKCRlbGVtZW50LmluamVjdG9yKCkuZ2V0KCckcm9vdFNjb3BlJykpO1xuICAgIH07XG5cbiAgICBvcHRpb25zLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAkZWxlbWVudC5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgICAgJGVsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gb3JpZ2luYWxOb3RpZmljYXRpb24ob3B0aW9ucyk7XG4gIH07XG59KTsiLCIvLyBjb25maXJtIHRvIHVzZSBqcUxpdGVcbmlmICh3aW5kb3cualF1ZXJ5ICYmIGFuZ3VsYXIuZWxlbWVudCA9PT0gd2luZG93LmpRdWVyeSkge1xuICBjb25zb2xlLndhcm4oJ09uc2VuIFVJIHJlcXVpcmUganFMaXRlLiBMb2FkIGpRdWVyeSBhZnRlciBsb2FkaW5nIEFuZ3VsYXJKUyB0byBmaXggdGhpcyBlcnJvci4galF1ZXJ5IG1heSBicmVhayBPbnNlbiBVSSBiZWhhdmlvci4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICB2YXIgdGVtcGxhdGVzID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9vbnMtdGVtcGxhdGVcIl0nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGVzW2ldKTtcbiAgICAgIHZhciBpZCA9IHRlbXBsYXRlLmF0dHIoJ2lkJyk7XG4gICAgICBpZiAodHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoaWQsIHRlbXBsYXRlLnRleHQoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbn0pKCk7XG4iXX0=
