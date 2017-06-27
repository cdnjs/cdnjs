/*! angular-onsenui.js for onsenui - v2.4.2 - 2017-06-21 */
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
'use strict';

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

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide']);

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

    ActionSheetView.registerAnimator = function (name, Animator) {
      return window.ons.ActionSheetElement.registerAnimator(name, Animator);
    };

    MicroEvent.mixin(ActionSheetView);
    $onsen.derivePropertiesFromElement(ActionSheetView, ['disabled', 'cancelable', 'visible', 'onDeviceBackButton']);

    return ActionSheetView;
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

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
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
'use strict';

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
'use strict';

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
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list-header' });
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

          return new window.ons.PageLoader(function (_ref, done) {
            var page = _ref.page,
                parent = _ref.parent;

            window.ons._internal.getPageHTMLAsync(page).then(function (html) {
              _this.compileAndLink(view, window.ons._util.createElement(html), function (element) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIiwib25zZW4uanMiLCJhY3Rpb25TaGVldC5qcyIsImFsZXJ0RGlhbG9nLmpzIiwiYWxlcnREaWFsb2dBbmltYXRvci5qcyIsImFuaW1hdGlvbkNob29zZXIuanMiLCJjYXJvdXNlbC5qcyIsImRpYWxvZy5qcyIsImRpYWxvZ0FuaW1hdG9yLmpzIiwiZmFiLmpzIiwiZ2VuZXJpYy5qcyIsImxhenlSZXBlYXQuanMiLCJsYXp5UmVwZWF0RGVsZWdhdGUuanMiLCJtb2RhbC5qcyIsIm5hdmlnYXRvci5qcyIsIm5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJzcGVlZERpYWwuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsInRvYXN0LmpzIiwiYWN0aW9uU2hlZXRCdXR0b24uanMiLCJiYWNrQnV0dG9uLmpzIiwiYm90dG9tVG9vbGJhci5qcyIsImJ1dHRvbi5qcyIsImNhcmQuanMiLCJjaGVja2JveC5qcyIsImR1bW15Rm9ySW5pdC5qcyIsImdlc3R1cmVEZXRlY3Rvci5qcyIsImljb24uanMiLCJpZk9yaWVudGF0aW9uLmpzIiwiaWZQbGF0Zm9ybS5qcyIsImlucHV0LmpzIiwia2V5Ym9hcmQuanMiLCJsaXN0LmpzIiwibGlzdEhlYWRlci5qcyIsImxpc3RJdGVtLmpzIiwibGlzdFRpdGxlLmpzIiwibG9hZGluZ1BsYWNlaG9sZGVyLmpzIiwicHJvZ3Jlc3NCYXIuanMiLCJyYWRpby5qcyIsInJhbmdlLmpzIiwicmlwcGxlLmpzIiwic2NvcGUuanMiLCJzZWFyY2hJbnB1dC5qcyIsInNlbGVjdC5qcyIsInNwbGl0dGVyQ29udGVudC5qcyIsInNwbGl0dGVyU2lkZS5qcyIsInRhYi5qcyIsInRhYkJhci5qcyIsInRlbXBsYXRlLmpzIiwidG9vbGJhci5qcyIsInRvb2xiYXJCdXR0b24uanMiLCJjb21wb25lbnRDbGVhbmVyLmpzIiwibm90aWZpY2F0aW9uLmpzIiwic2V0dXAuanMiLCJ0ZW1wbGF0ZUxvYWRlci5qcyJdLCJuYW1lcyI6WyJmblRlc3QiLCJ0ZXN0IiwieHl6IiwiQmFzZUNsYXNzIiwiZXh0ZW5kIiwicHJvcHMiLCJfc3VwZXIiLCJwcm90b3R5cGUiLCJwcm90byIsIk9iamVjdCIsImNyZWF0ZSIsIm5hbWUiLCJmbiIsInRtcCIsInJldCIsImFwcGx5IiwiYXJndW1lbnRzIiwibmV3Q2xhc3MiLCJpbml0IiwiaGFzT3duUHJvcGVydHkiLCJTdWJDbGFzcyIsIkVtcHR5Q2xhc3MiLCJjb25zdHJ1Y3RvciIsIndpbmRvdyIsIkNsYXNzIiwib25zIiwibW9kdWxlIiwiYW5ndWxhciIsImluaXRPbnNlbkZhY2FkZSIsIndhaXRPbnNlblVJTG9hZCIsImluaXRBbmd1bGFyTW9kdWxlIiwiaW5pdFRlbXBsYXRlQ2FjaGUiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCJydW4iLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwidmFsdWUiLCIkb25zZW4iLCIkcSIsIl9vbnNlblNlcnZpY2UiLCJfcVNlcnZpY2UiLCJjb25zb2xlIiwiYWxlcnQiLCIkdGVtcGxhdGVDYWNoZSIsIl9pbnRlcm5hbCIsImdldFRlbXBsYXRlSFRNTEFzeW5jIiwicGFnZSIsImNhY2hlIiwiZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb21wb25lbnRCYXNlIiwiYm9vdHN0cmFwIiwiZGVwcyIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJjb25jYXQiLCJkb2MiLCJkb2N1bWVudEVsZW1lbnQiLCJmaW5kUGFyZW50Q29tcG9uZW50VW50aWwiLCJkb20iLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJ0YXJnZXQiLCJpbmhlcml0ZWREYXRhIiwiZmluZENvbXBvbmVudCIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsImRhdGEiLCJub2RlTmFtZSIsInRvTG93ZXJDYXNlIiwiY29tcGlsZSIsInNjb3BlIiwiX2dldE9uc2VuU2VydmljZSIsIl93YWl0RGlyZXRpdmVJbml0IiwiZWxlbWVudE5hbWUiLCJsYXN0UmVhZHkiLCJjYWxsYmFjayIsImxpc3RlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjcmVhdGVFbGVtZW50T3JpZ2luYWwiLCJ0ZW1wbGF0ZSIsIm9wdGlvbnMiLCJsaW5rIiwicGFyZW50U2NvcGUiLCIkbmV3IiwiJGV2YWxBc3luYyIsImdldFNjb3BlIiwiZSIsInRhZ05hbWUiLCJyZXN1bHQiLCJhcHBlbmQiLCJ0aGVuIiwicmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlck9yaWdpbmFsIiwicmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlciIsInJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJyZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyT3JpZ2luYWwiLCJkb25lIiwic2V0SW1tZWRpYXRlIiwiX3NldHVwTG9hZGluZ1BsYWNlSG9sZGVycyIsImZhY3RvcnkiLCJBY3Rpb25TaGVldFZpZXciLCJhdHRycyIsIl9zY29wZSIsIl9lbGVtZW50IiwiX2F0dHJzIiwiX2NsZWFyRGVyaXZpbmdNZXRob2RzIiwiZGVyaXZlTWV0aG9kcyIsIl9jbGVhckRlcml2aW5nRXZlbnRzIiwiZGVyaXZlRXZlbnRzIiwiZGV0YWlsIiwiYWN0aW9uU2hlZXQiLCJiaW5kIiwiX2Rlc3Ryb3kiLCJlbWl0IiwicmVtb3ZlIiwicmVnaXN0ZXJBbmltYXRvciIsIkFuaW1hdG9yIiwiQWN0aW9uU2hlZXRFbGVtZW50IiwiTWljcm9FdmVudCIsIm1peGluIiwiZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50IiwiQWxlcnREaWFsb2dWaWV3IiwiYWxlcnREaWFsb2ciLCJBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3IiLCJJT1NBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5pbWF0b3JGYWN0b3J5IiwiQ2Fyb3VzZWxWaWV3IiwiY2Fyb3VzZWwiLCJEaWFsb2dWaWV3IiwiZGlhbG9nIiwiRGlhbG9nRWxlbWVudCIsIkRpYWxvZ0FuaW1hdG9yIiwiSU9TRGlhbG9nQW5pbWF0b3IiLCJBbmRyb2lkRGlhbG9nQW5pbWF0b3IiLCJTbGlkZURpYWxvZ0FuaW1hdG9yIiwiRmFiVmlldyIsIkdlbmVyaWNWaWV3Iiwic2VsZiIsImRpcmVjdGl2ZU9ubHkiLCJtb2RpZmllclRlbXBsYXRlIiwiYWRkTW9kaWZpZXJNZXRob2RzIiwiYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMiLCJjbGVhbmVyIiwib25EZXN0cm95IiwiX2V2ZW50cyIsInJlbW92ZU1vZGlmaWVyTWV0aG9kcyIsImNsZWFyQ29tcG9uZW50IiwicmVnaXN0ZXIiLCJ2aWV3Iiwidmlld0tleSIsImRlY2xhcmVWYXJBdHRyaWJ1dGUiLCJkZXN0cm95Iiwibm9vcCIsIkFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUiLCJMYXp5UmVwZWF0VmlldyIsImxpbmtlciIsIl9saW5rZXIiLCJ1c2VyRGVsZWdhdGUiLCIkZXZhbCIsIm9uc0xhenlSZXBlYXQiLCJpbnRlcm5hbERlbGVnYXRlIiwiX3Byb3ZpZGVyIiwiTGF6eVJlcGVhdFByb3ZpZGVyIiwicGFyZW50Tm9kZSIsInJlZnJlc2giLCIkd2F0Y2giLCJjb3VudEl0ZW1zIiwiX29uQ2hhbmdlIiwiZGlyZWN0aXZlQXR0cmlidXRlcyIsInRlbXBsYXRlRWxlbWVudCIsIl9wYXJlbnRTY29wZSIsImZvckVhY2giLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyIiwiY2xvbmVOb2RlIiwiaXRlbSIsIl91c2VyRGVsZWdhdGUiLCJjb25maWd1cmVJdGVtU2NvcGUiLCJGdW5jdGlvbiIsImRlc3Ryb3lJdGVtU2NvcGUiLCJjcmVhdGVJdGVtQ29udGVudCIsImluZGV4IiwiX3ByZXBhcmVJdGVtRWxlbWVudCIsIl9hZGRTcGVjaWFsUHJvcGVydGllcyIsIl91c2luZ0JpbmRpbmciLCJjbG9uZWQiLCJpIiwibGFzdCIsIiRpbmRleCIsIiRmaXJzdCIsIiRsYXN0IiwiJG1pZGRsZSIsIiRldmVuIiwiJG9kZCIsIiRkZXN0cm95IiwiTGF6eVJlcGVhdERlbGVnYXRlIiwiTW9kYWxBbmltYXRvciIsIkZhZGVNb2RhbEFuaW1hdG9yIiwiJHBhcnNlIiwiTW9kYWxWaWV3IiwiX2FuaW1hdG9yRmFjdG9yeSIsInNldEFuaW1hdGlvbk9wdGlvbnMiLCJhbmltYXRpb25PcHRpb25zIiwic2hvdyIsImhpZGUiLCJ0b2dnbGUiLCJNb2RhbEVsZW1lbnQiLCJOYXZpZ2F0b3JWaWV3IiwiX3ByZXZpb3VzUGFnZVNjb3BlIiwiX2JvdW5kT25QcmVwb3AiLCJfb25QcmVwb3AiLCJvbiIsIm5hdmlnYXRvciIsImV2ZW50IiwicGFnZXMiLCJsZW5ndGgiLCJvZmYiLCJOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJGYWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiSU9TU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJMaWZ0TmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiU2ltcGxlU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJQYWdlVmlldyIsIl9jbGVhckxpc3RlbmVyIiwiZGVmaW5lUHJvcGVydHkiLCJvbkRldmljZUJhY2tCdXR0b24iLCJzZXQiLCJfdXNlckJhY2tCdXR0b25IYW5kbGVyIiwiX2VuYWJsZUJhY2tCdXR0b25IYW5kbGVyIiwibmdEZXZpY2VCYWNrQnV0dG9uIiwibmdJbmZpbml0ZVNjcm9sbCIsIm9uSW5maW5pdGVTY3JvbGwiLCJfb25EZXZpY2VCYWNrQnV0dG9uIiwiJGV2ZW50IiwibGFzdEV2ZW50IiwiUG9wb3ZlclZpZXciLCJwb3BvdmVyIiwiUG9wb3ZlckFuaW1hdG9yIiwiRmFkZVBvcG92ZXJBbmltYXRvciIsIlB1bGxIb29rVmlldyIsInB1bGxIb29rIiwib25BY3Rpb24iLCJuZ0FjdGlvbiIsIiRkb25lIiwiU3BlZWREaWFsVmlldyIsIlNwbGl0dGVyQ29udGVudCIsImxvYWQiLCJfcGFnZVNjb3BlIiwiU3BsaXR0ZXJTaWRlIiwic2lkZSIsIlNwbGl0dGVyIiwicHJvcCIsIlN3aXRjaFZpZXciLCJfY2hlY2tib3giLCJfcHJlcGFyZU5nTW9kZWwiLCJuZ01vZGVsIiwiYXNzaWduIiwiJHBhcmVudCIsImNoZWNrZWQiLCJuZ0NoYW5nZSIsIlRhYmJhck5vbmVBbmltYXRvciIsIlRhYmJhckZhZGVBbmltYXRvciIsIlRhYmJhclNsaWRlQW5pbWF0b3IiLCJUYWJiYXJWaWV3IiwiX2xhc3RQYWdlRWxlbWVudCIsIl9sYXN0UGFnZVNjb3BlIiwiVGFiYmFyRWxlbWVudCIsIlRvYXN0VmlldyIsInRvYXN0IiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJyZXBsYWNlIiwidHJhbnNjbHVkZSIsInByZSIsInJlZ2lzdGVyRXZlbnRIYW5kbGVycyIsInBvc3QiLCJmaXJlQ29tcG9uZW50RXZlbnQiLCJDb21wb25lbnRDbGVhbmVyIiwiY29udHJvbGxlciIsImJhY2tCdXR0b24iLCJuZ0NsaWNrIiwib25DbGljayIsImRlc3Ryb3lTY29wZSIsImRlc3Ryb3lBdHRyaWJ1dGVzIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJwYXJlbnRFbGVtZW50IiwiX3NldHVwIiwiX3NldHVwSW5pdGlhbEluZGV4IiwiX3NhdmVMYXN0U3RhdGUiLCJlbCIsIm9uQ2hhbmdlIiwiaXNSZWFkeSIsIiRicm9hZGNhc3QiLCJmYWIiLCJFVkVOVFMiLCJzcGxpdCIsInNjb3BlRGVmIiwicmVkdWNlIiwiZGljdCIsInRpdGxpemUiLCJzdHIiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiXyIsImhhbmRsZXIiLCJ0eXBlIiwiZ2VzdHVyZURldGVjdG9yIiwiX2dlc3R1cmVEZXRlY3RvciIsImpvaW4iLCJpY29uIiwiaW5kZXhPZiIsIiRvYnNlcnZlIiwiX3VwZGF0ZSIsIiRvbnNHbG9iYWwiLCJjc3MiLCJ1cGRhdGUiLCJvcmllbnRhdGlvbiIsInVzZXJPcmllbnRhdGlvbiIsIm9uc0lmT3JpZW50YXRpb24iLCJnZXRMYW5kc2NhcGVPclBvcnRyYWl0IiwiaXNQb3J0cmFpdCIsInBsYXRmb3JtIiwiZ2V0UGxhdGZvcm1TdHJpbmciLCJ1c2VyUGxhdGZvcm0iLCJ1c2VyUGxhdGZvcm1zIiwib25zSWZQbGF0Zm9ybSIsInRyaW0iLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImlzT3BlcmEiLCJvcGVyYSIsImlzRmlyZWZveCIsIkluc3RhbGxUcmlnZ2VyIiwiaXNTYWZhcmkiLCJ0b1N0cmluZyIsImNhbGwiLCJpc0VkZ2UiLCJpc0Nocm9tZSIsImNocm9tZSIsImlzSUUiLCJkb2N1bWVudE1vZGUiLCJvbklucHV0IiwiTnVtYmVyIiwiY29tcGlsZUZ1bmN0aW9uIiwiZGlzcFNob3ciLCJkaXNwSGlkZSIsIm9uU2hvdyIsIm9uSGlkZSIsIm9uSW5pdCIsInZpc2libGUiLCJzb2Z0d2FyZUtleWJvYXJkIiwiX3Zpc2libGUiLCJwcmlvcml0eSIsInRlcm1pbmFsIiwibGF6eVJlcGVhdCIsIm9uc0xvYWRpbmdQbGFjZWhvbGRlciIsIl9yZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyIiwiY29udGVudEVsZW1lbnQiLCJtb2RhbCIsIk5hdmlnYXRvckVsZW1lbnQiLCJyZXdyaXRhYmxlcyIsInJlYWR5IiwicGFnZUxvYWRlciIsImNyZWF0ZVBhZ2VMb2FkZXIiLCJmaXJlUGFnZUluaXRFdmVudCIsImYiLCJpc0F0dGFjaGVkIiwiZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQiLCJzZXRUaW1lb3V0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwicG9zdExpbmsiLCJzcGVlZERpYWwiLCJzcGxpdHRlciIsIlNwbGl0dGVyQ29udGVudEVsZW1lbnQiLCJTcGxpdHRlclNpZGVFbGVtZW50IiwibmdDb250cm9sbGVyIiwic3dpdGNoVmlldyIsInRhYiIsImhpZGVUYWJzIiwic2V0VGFiYmFyVmlzaWJpbGl0eSIsInRhYmJhclZpZXciLCJjb250ZW50IiwiaHRtbCIsInB1dCIsInRvb2xiYXJCdXR0b24iLCJkZWNvbXBvc2VOb2RlIiwiY2hpbGRyZW4iLCIkJGVsZW1lbnQiLCIkJG9ic2VydmVycyIsImRlc3Ryb3lFbGVtZW50IiwiJCRsaXN0ZW5lcnMiLCIkJHdhdGNoZXJzIiwiY2xlYXIiLCJuZ0V2ZW50RGlyZWN0aXZlcyIsImRpcmVjdGl2ZU5hbWUiLCJkaXJlY3RpdmVOb3JtYWxpemUiLCIkZWxlbWVudCIsImxpc3RlbmVyIiwiJGFwcGx5IiwibWF0Y2hlcyIsImNvbmZpZyIsIiRwcm92aWRlIiwic2hpZnQiLCIkZGVsZWdhdGUiLCJrZXlzIiwiZGVjb3JhdG9yIiwiJHdpbmRvdyIsIiRjYWNoZUZhY3RvcnkiLCIkZG9jdW1lbnQiLCIkaHR0cCIsImNyZWF0ZU9uc2VuU2VydmljZSIsIk1vZGlmaWVyVXRpbCIsIkRJUkVDVElWRV9URU1QTEFURV9VUkwiLCJEZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsIl9kZXZpY2VCYWNrQnV0dG9uRGlzcGF0Y2hlciIsIl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJtZXRob2ROYW1lcyIsIm1ldGhvZE5hbWUiLCJrbGFzcyIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImV2ZW50TmFtZXMiLCJtYXAiLCJsaXN0ZW5lcnMiLCJldmVudE5hbWUiLCJwdXNoIiwiaXNFbmFibGVkQXV0b1N0YXR1c0JhckZpbGwiLCJfY29uZmlnIiwiYXV0b1N0YXR1c0JhckZpbGwiLCJzaG91bGRGaWxsU3RhdHVzQmFyIiwiY29tcGlsZUFuZExpbmsiLCJwYWdlRWxlbWVudCIsInBhZ2VTY29wZSIsIlBhZ2VMb2FkZXIiLCJwYXJlbnQiLCJnZXRQYWdlSFRNTEFzeW5jIiwiX3V0aWwiLCJwYXJhbXMiLCJlbGVtZW50cyIsImZpbmRFbGVtZW50ZU9iamVjdCIsImRlZmVycmVkIiwiZGVmZXIiLCJub3JtYWxpemVQYWdlSFRNTCIsInByb21pc2UiLCJ1cmwiLCJtZXRob2QiLCJyZXNwb25zZSIsImdlbmVyYXRlTW9kaWZpZXJUZW1wbGF0ZXIiLCJtb2RpZmllcnMiLCJhdHRyTW9kaWZpZXJzIiwibW9kaWZpZXIiLCJtZXRob2RzIiwiaGFzTW9kaWZpZXIiLCJuZWVkbGUiLCJ0b2tlbnMiLCJzb21lIiwicmVtb3ZlTW9kaWZpZXIiLCJmaWx0ZXIiLCJ0b2tlbiIsImFkZE1vZGlmaWVyIiwic2V0TW9kaWZpZXIiLCJ0b2dnbGVNb2RpZmllciIsIl90ciIsImZucyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImNsYXNzZXMiLCJwYXR0IiwiY2xzIiwib2xkRm4iLCJuZXdGbiIsIm9iamVjdCIsInZhciIsInZhck5hbWUiLCJfZGVmaW5lVmFyIiwiX3JlZ2lzdGVyRXZlbnRIYW5kbGVyIiwiY29tcG9uZW50IiwiY2FwaXRhbGl6ZWRFdmVudE5hbWUiLCJsIiwiaXNBbmRyb2lkIiwiaXNJT1MiLCJpc1dlYlZpZXciLCJpc0lPUzdhYm92ZSIsInVhIiwicGFyc2VGbG9hdCIsImtleSIsIm5hbWVzIiwiY29udGFpbmVyIiwiaGFzQXR0cmlidXRlIiwibm90aWZpY2F0aW9uIiwib3JpZ2luYWxOb3RpZmljYXRpb24iLCJtZXNzYWdlIiwiaW5qZWN0b3IiLCJqUXVlcnkiLCJ3YXJuIiwidGVtcGxhdGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0FBS0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSUEsU0FBUyxNQUFNQyxJQUFOLENBQVcsWUFBVTtBQUFDQztBQUFLLEdBQTNCLElBQStCLFlBQS9CLEdBQThDLElBQTNEOztBQUVBO0FBQ0EsV0FBU0MsU0FBVCxHQUFvQixDQUFFOztBQUV0QjtBQUNBQSxZQUFVQyxNQUFWLEdBQW1C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Q0FBYyxRQUFkLEVBQXdCZ0ksUUFBeEI7QUFDQThNLGlCQUFXLElBQVg7QUFDRCxLQUhEOztBQUtBLFdBQU9nRyxxQkFBcUJoYSxPQUFyQixDQUFQO0FBQ0QsR0FqQkQ7QUFrQkQsQ0FyQkQ7OztBQ2pCQTtBQUNBLElBQUlyRSxPQUFPd2UsTUFBUCxJQUFpQnBlLFFBQVE0QyxPQUFSLEtBQW9CaEQsT0FBT3dlLE1BQWhELEVBQXdEO0FBQ3RENWMsVUFBUTZjLElBQVIsQ0FBYSxxSEFBYixFQURzRCxDQUMrRTtBQUN0STs7O0FDSEQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVTtBQUNUOztBQUVBcmUsVUFBUUQsTUFBUixDQUFlLE9BQWYsRUFBd0JTLEdBQXhCLG9CQUE0QixVQUFTa0IsY0FBVCxFQUF5QjtBQUNuRCxRQUFJNGMsWUFBWTFlLE9BQU9lLFFBQVAsQ0FBZ0I0ZCxnQkFBaEIsQ0FBaUMsa0NBQWpDLENBQWhCOztBQUVBLFNBQUssSUFBSTVULElBQUksQ0FBYixFQUFnQkEsSUFBSTJULFVBQVU5UixNQUE5QixFQUFzQzdCLEdBQXRDLEVBQTJDO0FBQ3pDLFVBQUkzRyxXQUFXaEUsUUFBUTRDLE9BQVIsQ0FBZ0IwYixVQUFVM1QsQ0FBVixDQUFoQixDQUFmO0FBQ0EsVUFBSTZULEtBQUt4YSxTQUFTOEYsSUFBVCxDQUFjLElBQWQsQ0FBVDtBQUNBLFVBQUksT0FBTzBVLEVBQVAsS0FBYyxRQUFsQixFQUE0QjtBQUMxQjljLHVCQUFlMFYsR0FBZixDQUFtQm9ILEVBQW5CLEVBQXVCeGEsU0FBU3lhLElBQVQsRUFBdkI7QUFDRDtBQUNGO0FBQ0YsR0FWRDtBQVlELENBZkQiLCJmaWxlIjoiYW5ndWxhci1vbnNlbnVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogU2ltcGxlIEphdmFTY3JpcHQgSW5oZXJpdGFuY2UgZm9yIEVTIDUuMVxuICogYmFzZWQgb24gaHR0cDovL2Vqb2huLm9yZy9ibG9nL3NpbXBsZS1qYXZhc2NyaXB0LWluaGVyaXRhbmNlL1xuICogIChpbnNwaXJlZCBieSBiYXNlMiBhbmQgUHJvdG90eXBlKVxuICogTUlUIExpY2Vuc2VkLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgZm5UZXN0ID0gL3h5ei8udGVzdChmdW5jdGlvbigpe3h5ejt9KSA/IC9cXGJfc3VwZXJcXGIvIDogLy4qLztcblxuICAvLyBUaGUgYmFzZSBDbGFzcyBpbXBsZW1lbnRhdGlvbiAoZG9lcyBub3RoaW5nKVxuICBmdW5jdGlvbiBCYXNlQ2xhc3MoKXt9XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IENsYXNzIHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIGNsYXNzXG4gIEJhc2VDbGFzcy5leHRlbmQgPSBmdW5jdGlvbihwcm9wcykge1xuICAgIHZhciBfc3VwZXIgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIC8vIFNldCB1cCB0aGUgcHJvdG90eXBlIHRvIGluaGVyaXQgZnJvbSB0aGUgYmFzZSBjbGFzc1xuICAgIC8vIChidXQgd2l0aG91dCBydW5uaW5nIHRoZSBpbml0IGNvbnN0cnVjdG9yKVxuICAgIHZhciBwcm90byA9IE9iamVjdC5jcmVhdGUoX3N1cGVyKTtcblxuICAgIC8vIENvcHkgdGhlIHByb3BlcnRpZXMgb3ZlciBvbnRvIHRoZSBuZXcgcHJvdG90eXBlXG4gICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wcykge1xuICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgb3ZlcndyaXRpbmcgYW4gZXhpc3RpbmcgZnVuY3Rpb25cbiAgICAgIHByb3RvW25hbWVdID0gdHlwZW9mIHByb3BzW25hbWVdID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIF9zdXBlcltuYW1lXSA9PSBcImZ1bmN0aW9uXCIgJiYgZm5UZXN0LnRlc3QocHJvcHNbbmFtZV0pXG4gICAgICAgID8gKGZ1bmN0aW9uKG5hbWUsIGZuKXtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIHRtcCA9IHRoaXMuX3N1cGVyO1xuXG4gICAgICAgICAgICAgIC8vIEFkZCBhIG5ldyAuX3N1cGVyKCkgbWV0aG9kIHRoYXQgaXMgdGhlIHNhbWUgbWV0aG9kXG4gICAgICAgICAgICAgIC8vIGJ1dCBvbiB0aGUgc3VwZXItY2xhc3NcbiAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBfc3VwZXJbbmFtZV07XG5cbiAgICAgICAgICAgICAgLy8gVGhlIG1ldGhvZCBvbmx5IG5lZWQgdG8gYmUgYm91bmQgdGVtcG9yYXJpbHksIHNvIHdlXG4gICAgICAgICAgICAgIC8vIHJlbW92ZSBpdCB3aGVuIHdlJ3JlIGRvbmUgZXhlY3V0aW5nXG4gICAgICAgICAgICAgIHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IHRtcDtcblxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KShuYW1lLCBwcm9wc1tuYW1lXSlcbiAgICAgICAgOiBwcm9wc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGUgbmV3IGNvbnN0cnVjdG9yXG4gICAgdmFyIG5ld0NsYXNzID0gdHlwZW9mIHByb3RvLmluaXQgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBwcm90by5oYXNPd25Qcm9wZXJ0eShcImluaXRcIilcbiAgICAgICAgPyBwcm90by5pbml0IC8vIEFsbCBjb25zdHJ1Y3Rpb24gaXMgYWN0dWFsbHkgZG9uZSBpbiB0aGUgaW5pdCBtZXRob2RcbiAgICAgICAgOiBmdW5jdGlvbiBTdWJDbGFzcygpeyBfc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG4gICAgICA6IGZ1bmN0aW9uIEVtcHR5Q2xhc3MoKXt9O1xuXG4gICAgLy8gUG9wdWxhdGUgb3VyIGNvbnN0cnVjdGVkIHByb3RvdHlwZSBvYmplY3RcbiAgICBuZXdDbGFzcy5wcm90b3R5cGUgPSBwcm90bztcblxuICAgIC8vIEVuZm9yY2UgdGhlIGNvbnN0cnVjdG9yIHRvIGJlIHdoYXQgd2UgZXhwZWN0XG4gICAgcHJvdG8uY29uc3RydWN0b3IgPSBuZXdDbGFzcztcblxuICAgIC8vIEFuZCBtYWtlIHRoaXMgY2xhc3MgZXh0ZW5kYWJsZVxuICAgIG5ld0NsYXNzLmV4dGVuZCA9IEJhc2VDbGFzcy5leHRlbmQ7XG5cbiAgICByZXR1cm4gbmV3Q2xhc3M7XG4gIH07XG5cbiAgLy8gZXhwb3J0XG4gIHdpbmRvdy5DbGFzcyA9IEJhc2VDbGFzcztcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICAvKipcbiAgICogSW50ZXJuYWwgc2VydmljZSBjbGFzcyBmb3IgZnJhbWV3b3JrIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJyRvbnNlbicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICR3aW5kb3csICRjYWNoZUZhY3RvcnksICRkb2N1bWVudCwgJHRlbXBsYXRlQ2FjaGUsICRodHRwLCAkcSwgJGNvbXBpbGUsICRvbnNHbG9iYWwsIENvbXBvbmVudENsZWFuZXIpIHtcblxuICAgIHZhciAkb25zZW4gPSBjcmVhdGVPbnNlblNlcnZpY2UoKTtcbiAgICB2YXIgTW9kaWZpZXJVdGlsID0gJG9uc0dsb2JhbC5faW50ZXJuYWwuTW9kaWZpZXJVdGlsO1xuXG4gICAgcmV0dXJuICRvbnNlbjtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9uc2VuU2VydmljZSgpIHtcbiAgICAgIHJldHVybiB7XG5cbiAgICAgICAgRElSRUNUSVZFX1RFTVBMQVRFX1VSTDogJ3RlbXBsYXRlcycsXG5cbiAgICAgICAgY2xlYW5lcjogQ29tcG9uZW50Q2xlYW5lcixcblxuICAgICAgICBEZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGV2aWNlQmFja0J1dHRvbkRpc3BhdGNoZXIsXG5cbiAgICAgICAgX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcjogJG9uc0dsb2JhbC5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXREZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtZXRob2ROYW1lc1xuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3Bvc2UgYWxsIGRyaXZpbmcgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZU1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIG1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2aWV3W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50W21ldGhvZE5hbWVdLmFwcGx5KGVsZW1lbnQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kTmFtZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2aWV3ID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtDbGFzc30ga2xhc3NcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50OiBmdW5jdGlvbihrbGFzcywgcHJvcGVydGllcykge1xuICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtsYXNzLnByb3RvdHlwZSwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRbMF1bcHJvcGVydHldID0gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGV2ZW50TmFtZXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW21hcF1cbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBjbGVhciBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVFdmVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQsIGV2ZW50TmFtZXMsIG1hcCkge1xuICAgICAgICAgIG1hcCA9IG1hcCB8fCBmdW5jdGlvbihkZXRhaWwpIHsgcmV0dXJuIGRldGFpbDsgfTtcbiAgICAgICAgICBldmVudE5hbWVzID0gW10uY29uY2F0KGV2ZW50TmFtZXMpO1xuICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIG1hcChldmVudC5kZXRhaWwgfHwge30pO1xuICAgICAgICAgICAgICB2aWV3LmVtaXQoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUsIGluZGV4KSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyc1tpbmRleF0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmlldyA9IGVsZW1lbnQgPSBsaXN0ZW5lcnMgPSBtYXAgPSBudWxsO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0VuYWJsZWRBdXRvU3RhdHVzQmFyRmlsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJG9uc0dsb2JhbC5fY29uZmlnLmF1dG9TdGF0dXNCYXJGaWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvdWxkRmlsbFN0YXR1c0JhcjogJG9uc0dsb2JhbC5zaG91bGRGaWxsU3RhdHVzQmFyLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGF1dG9TdGF0dXNCYXJGaWxsOiAkb25zR2xvYmFsLmF1dG9TdGF0dXNCYXJGaWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZGlyZWN0aXZlXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhZ2VFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqL1xuICAgICAgICBjb21waWxlQW5kTGluazogZnVuY3Rpb24odmlldywgcGFnZUVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgY29uc3QgbGluayA9ICRjb21waWxlKHBhZ2VFbGVtZW50KTtcbiAgICAgICAgICBjb25zdCBwYWdlU2NvcGUgPSB2aWV3Ll9zY29wZS4kbmV3KCk7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBPdmVyd3JpdGUgcGFnZSBzY29wZS5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQocGFnZUVsZW1lbnQpLmRhdGEoJ19zY29wZScsIHBhZ2VTY29wZSk7XG5cbiAgICAgICAgICBwYWdlU2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHBhZ2VFbGVtZW50KTsgLy8gQXR0YWNoIGFuZCBwcmVwYXJlXG4gICAgICAgICAgICBsaW5rKHBhZ2VTY29wZSk7IC8vIFJ1biB0aGUgY29udHJvbGxlclxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhZ2VMb2FkZXJcbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZVBhZ2VMb2FkZXI6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5vbnMuUGFnZUxvYWRlcihcbiAgICAgICAgICAgICh7cGFnZSwgcGFyZW50fSwgZG9uZSkgPT4ge1xuICAgICAgICAgICAgICB3aW5kb3cub25zLl9pbnRlcm5hbC5nZXRQYWdlSFRNTEFzeW5jKHBhZ2UpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21waWxlQW5kTGluayhcbiAgICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgICB3aW5kb3cub25zLl91dGlsLmNyZWF0ZUVsZW1lbnQoaHRtbCksXG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0+IGRvbmUocGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50Ll9kZXN0cm95KCk7XG4gICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnX3Njb3BlJykpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnX3Njb3BlJykuJGRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgICAgICogQHBhcmFtIHtTY29wZX0gW3BhcmFtcy5zY29wZV1cbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IFtwYXJhbXMuZWxlbWVudF1cbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW3BhcmFtcy5lbGVtZW50c11cbiAgICAgICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBbcGFyYW1zLmF0dHJzXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xlYXJDb21wb25lbnQ6IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgICAgIGlmIChwYXJhbXMuc2NvcGUpIHtcbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHBhcmFtcy5zY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5hdHRycykge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhwYXJhbXMuYXR0cnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuZWxlbWVudCkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95RWxlbWVudChwYXJhbXMuZWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50cykge1xuICAgICAgICAgICAgcGFyYW1zLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZEVsZW1lbnRlT2JqZWN0OiBmdW5jdGlvbihlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaW5oZXJpdGVkRGF0YShuYW1lKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhZ2VcbiAgICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAgICovXG4gICAgICAgIGdldFBhZ2VIVE1MQXN5bmM6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICB2YXIgY2FjaGUgPSAkdGVtcGxhdGVDYWNoZS5nZXQocGFnZSk7XG5cbiAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIHZhciBodG1sID0gdHlwZW9mIGNhY2hlID09PSAnc3RyaW5nJyA/IGNhY2hlIDogY2FjaGVbMV07XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICB1cmw6IHBhZ2UsXG4gICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgdmFyIGh0bWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZVBhZ2VIVE1MKGh0bWwpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIG5vcm1hbGl6ZVBhZ2VIVE1MOiBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaHRtbCA9ICgnJyArIGh0bWwpLnRyaW0oKTtcblxuICAgICAgICAgIGlmICghaHRtbC5tYXRjaCgvXjxvbnMtcGFnZS8pKSB7XG4gICAgICAgICAgICBodG1sID0gJzxvbnMtcGFnZSBfbXV0ZWQ+JyArIGh0bWwgKyAnPC9vbnMtcGFnZT4nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgbW9kaWZpZXIgdGVtcGxhdGVyIGZ1bmN0aW9uLiBUaGUgbW9kaWZpZXIgdGVtcGxhdGVyIGdlbmVyYXRlIGNzcyBjbGFzc2VzIGJvdW5kIG1vZGlmaWVyIG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbbW9kaWZpZXJzXSBhbiBhcnJheSBvZiBhcHBlbmRpeCBtb2RpZmllclxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIGdlbmVyYXRlTW9kaWZpZXJUZW1wbGF0ZXI6IGZ1bmN0aW9uKGF0dHJzLCBtb2RpZmllcnMpIHtcbiAgICAgICAgICB2YXIgYXR0ck1vZGlmaWVycyA9IGF0dHJzICYmIHR5cGVvZiBhdHRycy5tb2RpZmllciA9PT0gJ3N0cmluZycgPyBhdHRycy5tb2RpZmllci50cmltKCkuc3BsaXQoLyArLykgOiBbXTtcbiAgICAgICAgICBtb2RpZmllcnMgPSBhbmd1bGFyLmlzQXJyYXkobW9kaWZpZXJzKSA/IGF0dHJNb2RpZmllcnMuY29uY2F0KG1vZGlmaWVycykgOiBhdHRyTW9kaWZpZXJzO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSB0ZW1wbGF0ZSBlZy4gJ29ucy1idXR0b24tLSonLCAnb25zLWJ1dHRvbi0tKl9faXRlbSdcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kaWZpZXJzLm1hcChmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgnKicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgbW9kaWZpZXIgbWV0aG9kcyB0byB2aWV3IG9iamVjdCBmb3IgY3VzdG9tIGVsZW1lbnRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzOiBmdW5jdGlvbih2aWV3LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBoYXNNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBNb2RpZmllclV0aWwuc3BsaXQoZWxlbWVudC5hdHRyKCdtb2RpZmllcicpKTtcbiAgICAgICAgICAgICAgbmVlZGxlID0gdHlwZW9mIG5lZWRsZSA9PT0gJ3N0cmluZycgPyBuZWVkbGUudHJpbSgpIDogJyc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIE1vZGlmaWVyVXRpbC5zcGxpdChuZWVkbGUpLnNvbWUoZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2Vucy5pbmRleE9mKG5lZWRsZSkgIT0gLTE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICB2YXIgbW9kaWZpZXIgPSBNb2RpZmllclV0aWwuc3BsaXQoZWxlbWVudC5hdHRyKCdtb2RpZmllcicpKS5maWx0ZXIoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gIT09IG5lZWRsZTtcbiAgICAgICAgICAgICAgfSkuam9pbignICcpO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIGVsZW1lbnQuYXR0cignbW9kaWZpZXInKSArICcgJyArIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc01vZGlmaWVyKG1vZGlmaWVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTW9kaWZpZXIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTW9kaWZpZXIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZvciAodmFyIG1ldGhvZCBpbiBtZXRob2RzKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICAgIHZpZXdbbWV0aG9kXSA9IG1ldGhvZHNbbWV0aG9kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBhZGRNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcsIHRlbXBsYXRlLCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIF90ciA9IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgnKicsIG1vZGlmaWVyKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGZucyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5oYXNDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZU1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYWRkTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmF0dHIoJ2NsYXNzJykuc3BsaXQoL1xccysvKSxcbiAgICAgICAgICAgICAgICAgIHBhdHQgPSB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgJy4nKTtcblxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gY2xhc3Nlc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChjbHMubWF0Y2gocGF0dCkpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHZhciBjbHMgPSBfdHIobW9kaWZpZXIpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNDbGFzcyhjbHMpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYXBwZW5kID0gZnVuY3Rpb24ob2xkRm4sIG5ld0ZuKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9sZEZuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZEZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfHwgbmV3Rm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXdGbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmlldy5oYXNNb2RpZmllciA9IGFwcGVuZCh2aWV3Lmhhc01vZGlmaWVyLCBmbnMuaGFzTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcucmVtb3ZlTW9kaWZpZXIgPSBhcHBlbmQodmlldy5yZW1vdmVNb2RpZmllciwgZm5zLnJlbW92ZU1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuYWRkTW9kaWZpZXIsIGZucy5hZGRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5zZXRNb2RpZmllciA9IGFwcGVuZCh2aWV3LnNldE1vZGlmaWVyLCBmbnMuc2V0TW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcudG9nZ2xlTW9kaWZpZXIgPSBhcHBlbmQodmlldy50b2dnbGVNb2RpZmllciwgZm5zLnRvZ2dsZU1vZGlmaWVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIG1vZGlmaWVyIG1ldGhvZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlTW9kaWZpZXJNZXRob2RzOiBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgICAgdmlldy5oYXNNb2RpZmllciA9IHZpZXcucmVtb3ZlTW9kaWZpZXIgPVxuICAgICAgICAgICAgdmlldy5hZGRNb2RpZmllciA9IHZpZXcuc2V0TW9kaWZpZXIgPVxuICAgICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdmFyaWFibGUgdG8gSmF2YVNjcmlwdCBnbG9iYWwgc2NvcGUgYW5kIEFuZ3VsYXJKUyBzY29wZSBhcyAndmFyJyBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGRlY2xhcmVWYXJBdHRyaWJ1dGU6IGZ1bmN0aW9uKGF0dHJzLCBvYmplY3QpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGF0dHJzLnZhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciB2YXJOYW1lID0gYXR0cnMudmFyO1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5lVmFyKHZhck5hbWUsIG9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZWdpc3RlckV2ZW50SGFuZGxlcjogZnVuY3Rpb24oY29tcG9uZW50LCBldmVudE5hbWUpIHtcbiAgICAgICAgICB2YXIgY2FwaXRhbGl6ZWRFdmVudE5hbWUgPSBldmVudE5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBldmVudE5hbWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICBjb21wb25lbnQub24oZXZlbnROYW1lLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChjb21wb25lbnQuX2VsZW1lbnRbMF0sIGV2ZW50TmFtZSwgZXZlbnQgJiYgZXZlbnQuZGV0YWlsKTtcblxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBjb21wb25lbnQuX2F0dHJzWydvbnMnICsgY2FwaXRhbGl6ZWRFdmVudE5hbWVdO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgY29tcG9uZW50Ll9zY29wZS4kZXZhbChoYW5kbGVyLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXIgZXZlbnQgaGFuZGxlcnMgZm9yIGF0dHJpYnV0ZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnRcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZXNcbiAgICAgICAgICovXG4gICAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyczogZnVuY3Rpb24oY29tcG9uZW50LCBldmVudE5hbWVzKSB7XG4gICAgICAgICAgZXZlbnROYW1lcyA9IGV2ZW50TmFtZXMudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGV2ZW50TmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnROYW1lc1tpXTtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRIYW5kbGVyKGNvbXBvbmVudCwgZXZlbnROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0FuZHJvaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhIXdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9hbmRyb2lkL2kpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNJT1M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhIXdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaXBhZHxpcGhvbmV8aXBvZCB0b3VjaCkvaSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc1dlYlZpZXc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cub25zLmlzV2ViVmlldygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNJT1M3YWJvdmU6IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSB1YS5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QgdG91Y2gpOy4qQ1BVLipPUyAoXFxkKylfKFxcZCspL2kpO1xuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IG1hdGNoID8gcGFyc2VGbG9hdChtYXRjaFsyXSArICcuJyArIG1hdGNoWzNdKSA+PSA3IDogZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKCksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpcmUgYSBuYW1lZCBldmVudCBmb3IgYSBjb21wb25lbnQuIFRoZSB2aWV3IG9iamVjdCwgaWYgaXQgZXhpc3RzLCBpcyBhdHRhY2hlZCB0byBldmVudC5jb21wb25lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtkb21dXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmaXJlQ29tcG9uZW50RXZlbnQ6IGZ1bmN0aW9uKGRvbSwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG5cbiAgICAgICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgZXZlbnRba2V5XSA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBldmVudC5jb21wb25lbnQgPSBkb20gP1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvbSkuZGF0YShkb20ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgfHwgbnVsbCA6IG51bGw7XG4gICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICsgJzonICsgZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICAgIGRvbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdmFyaWFibGUgdG8gSmF2YVNjcmlwdCBnbG9iYWwgc2NvcGUgYW5kIEFuZ3VsYXJKUyBzY29wZS5cbiAgICAgICAgICpcbiAgICAgICAgICogVXRpbC5kZWZpbmVWYXIoJ2ZvbycsICdmb28tdmFsdWUnKTtcbiAgICAgICAgICogLy8gPT4gd2luZG93LmZvbyBhbmQgJHNjb3BlLmZvbyBpcyBub3cgJ2Zvby12YWx1ZSdcbiAgICAgICAgICpcbiAgICAgICAgICogVXRpbC5kZWZpbmVWYXIoJ2Zvby5iYXInLCAnZm9vLWJhci12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vLmJhciBhbmQgJHNjb3BlLmZvby5iYXIgaXMgbm93ICdmb28tYmFyLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBfZGVmaW5lVmFyOiBmdW5jdGlvbihuYW1lLCBvYmplY3QpIHtcbiAgICAgICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KC9cXC4vKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHNldChjb250YWluZXIsIG5hbWVzLCBvYmplY3QpIHtcbiAgICAgICAgICAgIHZhciBuYW1lO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgICBpZiAoY29udGFpbmVyW25hbWVdID09PSB1bmRlZmluZWQgfHwgY29udGFpbmVyW25hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyW25hbWVdID0ge307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyW25hbWVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dID0gb2JqZWN0O1xuXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyW25hbWVzW25hbWVzLmxlbmd0aCAtIDFdXSAhPT0gb2JqZWN0KSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNldCB2YXI9XCInICsgb2JqZWN0Ll9hdHRycy52YXIgKyAnXCIgYmVjYXVzZSBpdCB3aWxsIG92ZXJ3cml0ZSBhIHJlYWQtb25seSB2YXJpYWJsZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob25zLmNvbXBvbmVudEJhc2UpIHtcbiAgICAgICAgICAgIHNldChvbnMuY29tcG9uZW50QmFzZSwgbmFtZXMsIG9iamVjdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQXR0YWNoIHRvIGFuY2VzdG9yIHdpdGggb25zLXNjb3BlIGF0dHJpYnV0ZS5cbiAgICAgICAgICB2YXIgZWxlbWVudCA9IG9iamVjdC5fZWxlbWVudFswXTtcblxuICAgICAgICAgIHdoaWxlIChlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnb25zLXNjb3BlJykpIHtcbiAgICAgICAgICAgICAgc2V0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKCdfc2NvcGUnKSwgbmFtZXMsIG9iamVjdCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgLy8gSWYgbm8gb25zLXNjb3BlIGVsZW1lbnQgd2FzIGZvdW5kLCBhdHRhY2ggdG8gJHJvb3RTY29wZS5cbiAgICAgICAgICBzZXQoJHJvb3RTY29wZSwgbmFtZXMsIG9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWFjdGlvbi1zaGVldFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYWN0aW9uIHNoZWV0LlsvZW5dXG4gKiAgW2phXeOBk+OBruOCouOCr+OCt+ODp+ODs+OCt+ODvOODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBBY3Rpb24gc2hlZXQgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBY3Rpb25TaGVldCcsIGZ1bmN0aW9uKCRvbnNlbiwgQWN0aW9uU2hlZXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIGFjdGlvblNoZWV0ID0gbmV3IEFjdGlvblNoZWV0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgYWN0aW9uU2hlZXQpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhhY3Rpb25TaGVldCwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoYWN0aW9uU2hlZXQsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hY3Rpb24tc2hlZXQnLCBhY3Rpb25TaGVldCk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYWN0aW9uU2hlZXQuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhhY3Rpb25TaGVldCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFjdGlvbi1zaGVldCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWFsZXJ0LWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYWxlcnQgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruOCouODqeODvOODiOODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBBbGVydCBkaWFsb2cgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBbGVydERpYWxvZycsIGZ1bmN0aW9uKCRvbnNlbiwgQWxlcnREaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIGFsZXJ0RGlhbG9nID0gbmV3IEFsZXJ0RGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhhbGVydERpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoYWxlcnREaWFsb2csIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCBhbGVydERpYWxvZyk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBhbGVydERpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWxlcnQtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ0FsZXJ0RGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkFsZXJ0RGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLkFuZHJvaWRBbGVydERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0lPU0FsZXJ0RGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLklPU0FsZXJ0RGlhbG9nQW5pbWF0b3IpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJykudmFsdWUoJ0FuaW1hdGlvbkNob29zZXInLCBvbnMuX2ludGVybmFsLkFuaW1hdG9yRmFjdG9yeSk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1jYXJvdXNlbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1DYXJvdXNlbCBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXeOCq+ODq+ODvOOCu+ODq+OCkuihqOekuuOBp+OBjeOCi+OCs+ODs+ODneODvOODjeODs+ODiOOAglsvamFdXG4gKiBAY29kZXBlbiB4YmJ6T1FcbiAqIEBndWlkZSBVc2luZ0Nhcm91c2VsXG4gKiAgIFtlbl1MZWFybiBob3cgdG8gdXNlIHRoZSBjYXJvdXNlbCBjb21wb25lbnQuWy9lbl1cbiAqICAgW2phXWNhcm91c2Vs44Kz44Oz44Od44O844ON44Oz44OI44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWNhcm91c2VsIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogMjAwcHhcIj5cbiAqICAgPG9ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgLi4uXG4gKiAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogPC9vbnMtY2Fyb3VzZWw+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgY2Fyb3VzZWwuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCq+ODq+ODvOOCu+ODq+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVmcmVzaFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicmVmcmVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicmVmcmVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW92ZXJzY3JvbGxcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm92ZXJzY3JvbGxcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm92ZXJzY3JvbGxcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNDYXJvdXNlbCcsIGZ1bmN0aW9uKCRvbnNlbiwgQ2Fyb3VzZWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWNhcm91c2VsJywgY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhjYXJvdXNlbCwgJ3Bvc3RjaGFuZ2UgcmVmcmVzaCBvdmVyc2Nyb2xsIGRlc3Ryb3knKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgY2Fyb3VzZWwpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2Fyb3VzZWwuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWNhcm91c2VsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0Nhcm91c2VsSXRlbScsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGlmIChzY29wZS4kbGFzdCkge1xuICAgICAgICAgICAgZWxlbWVudFswXS5wYXJlbnRFbGVtZW50Ll9zZXR1cCgpO1xuICAgICAgICAgICAgZWxlbWVudFswXS5wYXJlbnRFbGVtZW50Ll9zZXR1cEluaXRpYWxJbmRleCgpO1xuICAgICAgICAgICAgZWxlbWVudFswXS5wYXJlbnRFbGVtZW50Ll9zYXZlTGFzdFN0YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1kaWFsb2dcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGRpYWxvZy5bL2VuXVxuICogIFtqYV3jgZPjga7jg4DjgqTjgqLjg63jgrDjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zRGlhbG9nJywgZnVuY3Rpb24oJG9uc2VuLCBEaWFsb2dWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICB2YXIgZGlhbG9nID0gbmV3IERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBkaWFsb2cpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhkaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGRpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIGRpYWxvZyk7XG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRpYWxvZy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGRpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnSU9TRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLklPU0RpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0FuZHJvaWREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuQW5kcm9pZERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ1NsaWRlRGlhbG9nQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlNsaWRlRGlhbG9nQW5pbWF0b3IpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtZmFiXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoZSBmbG9hdGluZyBhY3Rpb24gYnV0dG9uLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5Xjg63jg7zjg4bjgqPjg7PjgrDjgqLjgq/jgrfjg6fjg7Pjg5zjgr/jg7PjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLjgZfjgabjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNGYWInLCBmdW5jdGlvbigkb25zZW4sIEZhYlZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBmYWIgPSBuZXcgRmFiVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZmFiJywgZmFiKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBmYWIpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZmFiJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0dlbmVyaWNWaWV3JywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgR2VuZXJpY1ZpZXcgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kaXJlY3RpdmVPbmx5XVxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGVdXG4gICAgICAgKi9cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgb3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3RpdmVPbmx5KSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlIGlzIHVuZGVmaW5lZC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kcyh0aGlzLCBvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUsIGVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0aGlzLCBlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoc2VsZik7XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy5vbkRlc3Ryb3kpIHtcbiAgICAgICAgICAgIG9wdGlvbnMub25EZXN0cm95KHNlbGYpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzZWxmID0gZWxlbWVudCA9IHNlbGYuX2VsZW1lbnQgPSBzZWxmLl9zY29wZSA9IHNjb3BlID0gc2VsZi5fYXR0cnMgPSBhdHRycyA9IG9wdGlvbnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy52aWV3S2V5XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kaXJlY3RpdmVPbmx5XVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRGVzdHJveV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgKi9cbiAgICBHZW5lcmljVmlldy5yZWdpc3RlciA9IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgb3B0aW9ucykge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgR2VuZXJpY1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKTtcblxuICAgICAgaWYgKCFvcHRpb25zLnZpZXdLZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLnZpZXdLZXkgaXMgcmVxdWlyZWQuJyk7XG4gICAgICB9XG5cbiAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIHZpZXcpO1xuXG4gICAgICB2YXIgZGVzdHJveSA9IG9wdGlvbnMub25EZXN0cm95IHx8IGFuZ3VsYXIubm9vcDtcbiAgICAgIG9wdGlvbnMub25EZXN0cm95ID0gZnVuY3Rpb24odmlldykge1xuICAgICAgICBkZXN0cm95KHZpZXcpO1xuICAgICAgICBlbGVtZW50LmRhdGEob3B0aW9ucy52aWV3S2V5LCBudWxsKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB2aWV3O1xuICAgIH07XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKEdlbmVyaWNWaWV3KTtcblxuICAgIHJldHVybiBHZW5lcmljVmlldztcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbGF6eS1yZXBlYXRcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgVXNpbmcgdGhpcyBjb21wb25lbnQgYSBsaXN0IHdpdGggbWlsbGlvbnMgb2YgaXRlbXMgY2FuIGJlIHJlbmRlcmVkIHdpdGhvdXQgYSBkcm9wIGluIHBlcmZvcm1hbmNlLlxuICogICAgIEl0IGRvZXMgdGhhdCBieSBcImxhemlseVwiIGxvYWRpbmcgZWxlbWVudHMgaW50byB0aGUgRE9NIHdoZW4gdGhleSBjb21lIGludG8gdmlldyBhbmRcbiAqICAgICByZW1vdmluZyBpdGVtcyBmcm9tIHRoZSBET00gd2hlbiB0aGV5IGFyZSBub3QgdmlzaWJsZS5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOWGheOBp+aPj+eUu+OBleOCjOOCi+OCouOCpOODhuODoOOBrkRPTeimgee0oOOBruiqreOBv+i+vOOBv+OBr+OAgeeUu+mdouOBq+imi+OBiOOBneOBhuOBq+OBquOBo+OBn+aZguOBvuOBp+iHquWLleeahOOBq+mBheW7tuOBleOCjOOAgVxuICogICAgIOeUu+mdouOBi+OCieimi+OBiOOBquOBj+OBquOBo+OBn+WgtOWQiOOBq+OBr+OBneOBruimgee0oOOBr+WLleeahOOBq+OCouODs+ODreODvOODieOBleOCjOOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOCkuS9v+OBhuOBk+OBqOOBp+OAgeODkeODleOCqeODvOODnuODs+OCueOCkuWKo+WMluOBleOBm+OCi+OBk+OBqOeEoeOBl+OBq+W3qOWkp+OBquaVsOOBruimgee0oOOCkuaPj+eUu+OBp+OBjeOBvuOBmeOAglxuICogICBbL2phXVxuICogQGNvZGVwZW4gUXdyR0JtXG4gKiBAZ3VpZGUgVXNpbmdMYXp5UmVwZWF0XG4gKiAgIFtlbl1Ib3cgdG8gdXNlIExhenkgUmVwZWF0Wy9lbl1cbiAqICAgW2phXeODrOOCpOOCuOODvOODquODlOODvOODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPHNjcmlwdD5cbiAqICAgb25zLmJvb3RzdHJhcCgpXG4gKlxuICogICAuY29udHJvbGxlcignTXlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gKiAgICAgJHNjb3BlLk15RGVsZWdhdGUgPSB7XG4gKiAgICAgICBjb3VudEl0ZW1zOiBmdW5jdGlvbigpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIG51bWJlciBvZiBpdGVtcy5cbiAqICAgICAgICAgcmV0dXJuIDEwMDAwMDA7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNhbGN1bGF0ZUl0ZW1IZWlnaHQ6IGZ1bmN0aW9uKGluZGV4KSB7XG4gKiAgICAgICAgIC8vIFJldHVybiB0aGUgaGVpZ2h0IG9mIGFuIGl0ZW0gaW4gcGl4ZWxzLlxuICogICAgICAgICByZXR1cm4gNDU7XG4gKiAgICAgICB9LFxuICpcbiAqICAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBJbml0aWFsaXplIHNjb3BlXG4gKiAgICAgICAgIGl0ZW1TY29wZS5pdGVtID0gJ0l0ZW0gIycgKyAoaW5kZXggKyAxKTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgZGVzdHJveUl0ZW1TY29wZTogZnVuY3Rpb24oaW5kZXgsIGl0ZW1TY29wZSkge1xuICogICAgICAgICAvLyBPcHRpb25hbCBtZXRob2QgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbiBpdGVtIGlzIHVubG9hZGVkLlxuICogICAgICAgICBjb25zb2xlLmxvZygnRGVzdHJveWVkIGl0ZW0gd2l0aCBpbmRleDogJyArIGluZGV4KTtcbiAqICAgICAgIH1cbiAqICAgICB9O1xuICogICB9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxvbnMtbGlzdCBuZy1jb250cm9sbGVyPVwiTXlDb250cm9sbGVyXCI+XG4gKiAgIDxvbnMtbGlzdC1pdGVtIG9ucy1sYXp5LXJlcGVhdD1cIk15RGVsZWdhdGVcIj5cbiAqICAgICB7eyBpdGVtIH19XG4gKiAgIDwvb25zLWxpc3QtaXRlbT5cbiAqIDwvb25zLWxpc3Q+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sYXp5LXJlcGVhdFxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BIGRlbGVnYXRlIG9iamVjdCwgY2FuIGJlIGVpdGhlciBhbiBvYmplY3QgYXR0YWNoZWQgdG8gdGhlIHNjb3BlICh3aGVuIHVzaW5nIEFuZ3VsYXJKUykgb3IgYSBub3JtYWwgSmF2YVNjcmlwdCB2YXJpYWJsZS5bL2VuXVxuICogIFtqYV3opoHntKDjga7jg63jg7zjg4njgIHjgqLjg7Pjg63jg7zjg4njgarjganjga7lh6bnkIbjgpLlp5TorbLjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJBbmd1bGFySlPjga7jgrnjgrPjg7zjg5fjga7lpInmlbDlkI3jgoTjgIHpgJrluLjjga5KYXZhU2NyaXB044Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBwcm9wZXJ0eSBkZWxlZ2F0ZS5jb25maWd1cmVJdGVtU2NvcGVcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRnVuY3Rpb24gd2hpY2ggcmVjaWV2ZXMgYW4gaW5kZXggYW5kIHRoZSBzY29wZSBmb3IgdGhlIGl0ZW0uIENhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB2YWx1ZXMgaW4gdGhlIGl0ZW0gc2NvcGUuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIC8qKlxuICAgKiBMYXp5IHJlcGVhdCBkaXJlY3RpdmUuXG4gICAqL1xuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNMYXp5UmVwZWF0JywgZnVuY3Rpb24oJG9uc2VuLCBMYXp5UmVwZWF0Vmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBwcmlvcml0eTogMTAwMCxcbiAgICAgIHRlcm1pbmFsOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGxhenlSZXBlYXQgPSBuZXcgTGF6eVJlcGVhdFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbGF6eVJlcGVhdCA9IG51bGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ0FuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUnLCBmdW5jdGlvbigkY29tcGlsZSkge1xuXG4gICAgY29uc3QgZGlyZWN0aXZlQXR0cmlidXRlcyA9IFsnb25zLWxhenktcmVwZWF0JywgJ29uczpsYXp5OnJlcGVhdCcsICdvbnNfbGF6eV9yZXBlYXQnLCAnZGF0YS1vbnMtbGF6eS1yZXBlYXQnLCAneC1vbnMtbGF6eS1yZXBlYXQnXTtcbiAgICBjbGFzcyBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlIGV4dGVuZHMgb25zLl9pbnRlcm5hbC5MYXp5UmVwZWF0RGVsZWdhdGUge1xuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gdXNlckRlbGVnYXRlXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAgICogQHBhcmFtIHtTY29wZX0gcGFyZW50U2NvcGVcbiAgICAgICAqL1xuICAgICAgY29uc3RydWN0b3IodXNlckRlbGVnYXRlLCB0ZW1wbGF0ZUVsZW1lbnQsIHBhcmVudFNjb3BlKSB7XG4gICAgICAgIHN1cGVyKHVzZXJEZWxlZ2F0ZSwgdGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fcGFyZW50U2NvcGUgPSBwYXJlbnRTY29wZTtcblxuICAgICAgICBkaXJlY3RpdmVBdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB0ZW1wbGF0ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHIpKTtcbiAgICAgICAgdGhpcy5fbGlua2VyID0gJGNvbXBpbGUodGVtcGxhdGVFbGVtZW50ID8gdGVtcGxhdGVFbGVtZW50LmNsb25lTm9kZSh0cnVlKSA6IG51bGwpO1xuICAgICAgfVxuXG4gICAgICBjb25maWd1cmVJdGVtU2NvcGUoaXRlbSwgc2NvcGUpe1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZShpdGVtLCBzY29wZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGVzdHJveUl0ZW1TY29wZShpdGVtLCBlbGVtZW50KXtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5kZXN0cm95SXRlbVNjb3BlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl91c2VyRGVsZWdhdGUuZGVzdHJveUl0ZW1TY29wZShpdGVtLCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfdXNpbmdCaW5kaW5nKCkge1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3VzZXJEZWxlZ2F0ZS5jcmVhdGVJdGVtQ29udGVudCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYGxhenktcmVwZWF0YCBkZWxlZ2F0ZSBvYmplY3QgaXMgdmFndWUuJyk7XG4gICAgICB9XG5cbiAgICAgIGxvYWRJdGVtRWxlbWVudChpbmRleCwgZG9uZSkge1xuICAgICAgICB0aGlzLl9wcmVwYXJlSXRlbUVsZW1lbnQoaW5kZXgsICh7ZWxlbWVudCwgc2NvcGV9KSA9PiB7XG4gICAgICAgICAgZG9uZSh7ZWxlbWVudCwgc2NvcGV9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIF9wcmVwYXJlSXRlbUVsZW1lbnQoaW5kZXgsIGRvbmUpIHtcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLl9wYXJlbnRTY29wZS4kbmV3KCk7XG4gICAgICAgIHRoaXMuX2FkZFNwZWNpYWxQcm9wZXJ0aWVzKGluZGV4LCBzY29wZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3VzaW5nQmluZGluZygpKSB7XG4gICAgICAgICAgdGhpcy5jb25maWd1cmVJdGVtU2NvcGUoaW5kZXgsIHNjb3BlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xpbmtlcihzY29wZSwgKGNsb25lZCkgPT4ge1xuICAgICAgICAgIGxldCBlbGVtZW50ID0gY2xvbmVkWzBdO1xuICAgICAgICAgIGlmICghdGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLl91c2VyRGVsZWdhdGUuY3JlYXRlSXRlbUNvbnRlbnQoaW5kZXgsIGVsZW1lbnQpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvbmUoe2VsZW1lbnQsIHNjb3BlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKi9cbiAgICAgIF9hZGRTcGVjaWFsUHJvcGVydGllcyhpLCBzY29wZSkge1xuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5jb3VudEl0ZW1zKCkgLSAxO1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChzY29wZSwge1xuICAgICAgICAgICRpbmRleDogaSxcbiAgICAgICAgICAkZmlyc3Q6IGkgPT09IDAsXG4gICAgICAgICAgJGxhc3Q6IGkgPT09IGxhc3QsXG4gICAgICAgICAgJG1pZGRsZTogaSAhPT0gMCAmJiBpICE9PSBsYXN0LFxuICAgICAgICAgICRldmVuOiBpICUgMiA9PT0gMCxcbiAgICAgICAgICAkb2RkOiBpICUgMiA9PT0gMVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlSXRlbShpbmRleCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICBpdGVtLnNjb3BlLiRldmFsQXN5bmMoKCkgPT4gdGhpcy5jb25maWd1cmVJdGVtU2NvcGUoaW5kZXgsIGl0ZW0uc2NvcGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBlci51cGRhdGVJdGVtKGluZGV4LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtLnNjb3BlXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGl0ZW0uZWxlbWVudFxuICAgICAgICovXG4gICAgICBkZXN0cm95SXRlbShpbmRleCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lJdGVtU2NvcGUoaW5kZXgsIGl0ZW0uc2NvcGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyLmRlc3Ryb3lJdGVtKGluZGV4LCBpdGVtLmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uc2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgIH1cblxuICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9zY29wZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbW9kYWxcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBtb2RhbC5bL2VuXVxuICogICBbamFd44GT44Gu44Oi44O844OA44Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogTW9kYWwgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNNb2RhbCcsIGZ1bmN0aW9uKCRvbnNlbiwgTW9kYWxWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IChlbGVtZW50LCBhdHRycykgPT4ge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBtb2RhbCA9IG5ldyBNb2RhbFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhtb2RhbCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBtb2RhbCk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIG1vZGFsKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKG1vZGFsKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbW9kYWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBtb2RhbCA9IGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1uYXZpZ2F0b3JcbiAqIEBleGFtcGxlXG4gKiA8b25zLW5hdmlnYXRvciBhbmltYXRpb249XCJzbGlkZVwiIHZhcj1cImFwcC5uYXZpXCI+XG4gKiAgIDxvbnMtcGFnZT5cbiAqICAgICA8b25zLXRvb2xiYXI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+VGl0bGU8L2Rpdj5cbiAqICAgICA8L29ucy10b29sYmFyPlxuICpcbiAqICAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPlxuICogICAgICAgPG9ucy1idXR0b24gbW9kaWZpZXI9XCJsaWdodFwiIG5nLWNsaWNrPVwiYXBwLm5hdmkucHVzaFBhZ2UoJ3BhZ2UuaHRtbCcpO1wiPlB1c2g8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtbmF2aWdhdG9yPlxuICpcbiAqIDxvbnMtdGVtcGxhdGUgaWQ9XCJwYWdlLmh0bWxcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wb3BQYWdlKCk7XCI+UG9wPC9vbnMtYnV0dG9uPlxuICogICAgIDwvcD5cbiAqICAgPC9vbnMtcGFnZT5cbiAqIDwvb25zLXRlbXBsYXRlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgbmF2aWdhdG9yLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiuODk+OCsuODvOOCv+ODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVwdXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlcG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXBvcFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RwdXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cHVzaFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0cG9wXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0cG9wXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsYXN0UmVhZHkgPSB3aW5kb3cub25zLk5hdmlnYXRvckVsZW1lbnQucmV3cml0YWJsZXMucmVhZHk7XG4gIHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeSA9IG9ucy5fd2FpdERpcmV0aXZlSW5pdCgnb25zLW5hdmlnYXRvcicsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNOYXZpZ2F0b3InLCBmdW5jdGlvbihOYXZpZ2F0b3JWaWV3LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IE5hdmlnYXRvclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh2aWV3LCAncHJlcHVzaCBwcmVwb3AgcG9zdHB1c2ggcG9zdHBvcCBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW5hdmlnYXRvcicsIHZpZXcpO1xuXG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW5hdmlnYXRvcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5OYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnRmFkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRmFkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdJT1NTbGlkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuSU9TU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnTGlmdFRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuTGlmdE5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdOdWxsVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5OYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpXG4gIC52YWx1ZSgnU2ltcGxlU2xpZGVUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlNpbXBsZVNsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXBhZ2VcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBwYWdlLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5rjg7zjgrjjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1pbmZpbml0ZS1zY3JvbGxcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dUGF0aCBvZiB0aGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb24gaW5maW5pdGUgc2Nyb2xsaW5nLiBUaGUgcGF0aCBpcyByZWxhdGl2ZSB0byAkc2NvcGUuIFRoZSBmdW5jdGlvbiByZWNlaXZlcyBhIGRvbmUgY2FsbGJhY2sgdGhhdCBtdXN0IGJlIGNhbGxlZCB3aGVuIGl0J3MgZmluaXNoZWQuWy9lbl1cbiAqICAgW2phXVsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9uLWRldmljZS1iYWNrLWJ1dHRvblxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgYmFjayBidXR0b24gaXMgcHJlc3NlZC5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44GM5oq844GV44KM44Gf5pmC44Gu5oyZ5YuV44KS6Kit5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctZGV2aWNlLWJhY2stYnV0dG9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdpdGggYW4gQW5ndWxhckpTIGV4cHJlc3Npb24gd2hlbiB0aGUgYmFjayBidXR0b24gaXMgcHJlc3NlZC5bL2VuXVxuICogICBbamFd44OH44OQ44Kk44K544Gu44OQ44OD44Kv44Oc44K/44Oz44GM5oq844GV44KM44Gf5pmC44Gu5oyZ5YuV44KS6Kit5a6a44Gn44GN44G+44GZ44CCQW5ndWxhckpT44GuZXhwcmVzc2lvbuOCkuaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwic2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwic2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNQYWdlJywgZnVuY3Rpb24oJG9uc2VuLCBQYWdlVmlldykge1xuXG4gICAgZnVuY3Rpb24gZmlyZVBhZ2VJbml0RXZlbnQoZWxlbWVudCkge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIGRpcnR5IGZpeFxuICAgICAgdmFyIGkgPSAwLCBmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpKysgPCAxNSkgIHtcbiAgICAgICAgICBpZiAoaXNBdHRhY2hlZChlbGVtZW50KSkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50LCAnaW5pdCcpO1xuICAgICAgICAgICAgZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQoZWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpID4gMTApIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZmlyZSBcInBhZ2Vpbml0XCIgZXZlbnQuIEF0dGFjaCBcIm9ucy1wYWdlXCIgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGYoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZlbnQuaW5pdEV2ZW50KCdwYWdlaW5pdCcsIHRydWUsIHRydWUpO1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0F0dGFjaGVkKGVsZW1lbnQpIHtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlID8gaXNBdHRhY2hlZChlbGVtZW50LnBhcmVudE5vZGUpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gbmV3IFBhZ2VWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwYWdlKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocGFnZSwgJ2luaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcGFnZScsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHBhZ2UsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcGFnZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHBhZ2UpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50WzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcG9wb3ZlclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgcG9wb3Zlci5bL2VuXVxuICogIFtqYV3jgZPjga7jg53jg4Pjg5fjgqrjg7zjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zUG9wb3ZlcicsIGZ1bmN0aW9uKCRvbnNlbiwgUG9wb3ZlclZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBwb3BvdmVyID0gbmV3IFBvcG92ZXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwb3BvdmVyKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMocG9wb3ZlciwgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocG9wb3ZlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCBwb3BvdmVyKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwb3BvdmVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocG9wb3Zlcik7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBvcG92ZXInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnUG9wb3ZlckFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5Qb3BvdmVyQW5pbWF0b3IpXG4gIC52YWx1ZSgnRmFkZVBvcG92ZXJBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuRmFkZVBvcG92ZXJBbmltYXRvcik7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wdWxsLWhvb2tcbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XG4gKiAgICAgJHNjb3BlLml0ZW1zID0gWzMsIDIgLDFdO1xuICpcbiAqICAgICAkc2NvcGUubG9hZCA9IGZ1bmN0aW9uKCRkb25lKSB7XG4gKiAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAqICAgICAgICAgJHNjb3BlLml0ZW1zLnVuc2hpZnQoJHNjb3BlLml0ZW1zLmxlbmd0aCArIDEpO1xuICogICAgICAgICAkZG9uZSgpO1xuICogICAgICAgfSwgMTAwMCk7XG4gKiAgICAgfTtcbiAqICAgfSk7XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8b25zLXBhZ2UgbmctY29udHJvbGxlcj1cIk15Q29udHJvbGxlclwiPlxuICogICA8b25zLXB1bGwtaG9vayB2YXI9XCJsb2FkZXJcIiBuZy1hY3Rpb249XCJsb2FkKCRkb25lKVwiPlxuICogICAgIDxzcGFuIG5nLXN3aXRjaD1cImxvYWRlci5zdGF0ZVwiPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJpbml0aWFsXCI+UHVsbCBkb3duIHRvIHJlZnJlc2g8L3NwYW4+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInByZWFjdGlvblwiPlJlbGVhc2UgdG8gcmVmcmVzaDwvc3Bhbj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwiYWN0aW9uXCI+TG9hZGluZyBkYXRhLiBQbGVhc2Ugd2FpdC4uLjwvc3Bhbj5cbiAqICAgICA8L3NwYW4+XG4gKiAgIDwvb25zLXB1bGwtaG9vaz5cbiAqICAgPG9ucy1saXN0PlxuICogICAgIDxvbnMtbGlzdC1pdGVtIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICAgIEl0ZW0gI3t7IGl0ZW0gfX1cbiAqICAgICA8L29ucy1saXN0LWl0ZW0+XG4gKiAgIDwvb25zLWxpc3Q+XG4gKiA8L29ucy1wYWdlPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFd44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgbmctYWN0aW9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Vc2UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgcGFnZSBpcyBwdWxsZWQgZG93bi4gQSA8Y29kZT4kZG9uZTwvY29kZT4gZnVuY3Rpb24gaXMgYXZhaWxhYmxlIHRvIHRlbGwgdGhlIGNvbXBvbmVudCB0aGF0IHRoZSBhY3Rpb24gaXMgY29tcGxldGVkLlsvZW5dXG4gKiAgIFtqYV1wdWxsIGRvd27jgZfjgZ/jgajjgY3jga7mjK/jgovoiJ7jgYTjgpLmjIflrprjgZfjgb7jgZnjgILjgqLjgq/jgrfjg6fjg7PjgYzlrozkuobjgZfjgZ/mmYLjgavjga88Y29kZT4kZG9uZTwvY29kZT7plqLmlbDjgpLlkbzjgbPlh7rjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtY2hhbmdlc3RhdGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImNoYW5nZXN0YXRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJjaGFuZ2VzdGF0ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogUHVsbCBob29rIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUHVsbEhvb2snLCBmdW5jdGlvbigkb25zZW4sIFB1bGxIb29rVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHB1bGxIb29rID0gbmV3IFB1bGxIb29rVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgcHVsbEhvb2spO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwdWxsSG9vaywgJ2NoYW5nZXN0YXRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXB1bGwtaG9vaycsIHB1bGxIb29rKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwdWxsSG9vay5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wdWxsLWhvb2snLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BlZWQtZGlhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGUgc3BlZWQgZGlhbC5bL2VuXVxuICogICBbamFd44GT44Gu44K544OU44O844OJ44OA44Kk44Ki44Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS44GX44Gm44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcIm9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cIm9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1jbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTcGVlZERpYWwnLCBmdW5jdGlvbigkb25zZW4sIFNwZWVkRGlhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBzcGVlZERpYWwgPSBuZXcgU3BlZWREaWFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BlZWQtZGlhbCcsIHNwZWVkRGlhbCk7XG5cbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHNwZWVkRGlhbCwgJ29wZW4gY2xvc2UnKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3BlZWREaWFsKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNwZWVkRGlhbC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BlZWQtZGlhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmZhY3RvcnkoJ1NwbGl0dGVyQ29udGVudCcsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUpIHtcblxuICAgIHZhciBTcGxpdHRlckNvbnRlbnQgPSBDbGFzcy5leHRlbmQoe1xuXG4gICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG5cbiAgICAgICAgdGhpcy5sb2FkID0gdGhpcy5fZWxlbWVudFswXS5sb2FkLmJpbmQodGhpcy5fZWxlbWVudFswXSk7XG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSB0aGlzLmxvYWQgPSB0aGlzLl9wYWdlU2NvcGUgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihTcGxpdHRlckNvbnRlbnQpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3BsaXR0ZXJDb250ZW50LCBbJ3BhZ2UnXSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXJDb250ZW50O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJTaWRlJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyU2lkZSA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcyA9ICRvbnNlbi5kZXJpdmVNZXRob2RzKHRoaXMsIHRoaXMuX2VsZW1lbnRbMF0sIFtcbiAgICAgICAgICAnb3BlbicsICdjbG9zZScsICd0b2dnbGUnLCAnbG9hZCdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cyA9ICRvbnNlbi5kZXJpdmVFdmVudHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdtb2RlY2hhbmdlJywgJ3ByZW9wZW4nLCAncHJlY2xvc2UnLCAncG9zdG9wZW4nLCAncG9zdGNsb3NlJ1xuICAgICAgICBdLCBkZXRhaWwgPT4gZGV0YWlsLnNpZGUgPyBhbmd1bGFyLmV4dGVuZChkZXRhaWwsIHtzaWRlOiB0aGlzfSkgOiBkZXRhaWwpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuICAgICAgfSxcblxuICAgICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX3Njb3BlID0gdGhpcy5fYXR0cnMgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTWljcm9FdmVudC5taXhpbihTcGxpdHRlclNpZGUpO1xuICAgICRvbnNlbi5kZXJpdmVQcm9wZXJ0aWVzRnJvbUVsZW1lbnQoU3BsaXR0ZXJTaWRlLCBbJ3BhZ2UnLCAnbW9kZScsICdpc09wZW4nXSk7XG5cbiAgICByZXR1cm4gU3BsaXR0ZXJTaWRlO1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHNwbGl0IHZpZXcuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCueODl+ODquODg+ODiOODk+ODpeODvOOCs+ODs+ODneODvOODjeODs+ODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU3BsaXR0ZXInLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXIsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgdmFyIHNwbGl0dGVyID0gbmV3IFNwbGl0dGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3BsaXR0ZXIpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BsaXR0ZXIsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlcicsIHNwbGl0dGVyKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNwbGl0dGVyLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3dpdGNoXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3dpdGNoLlsvZW5dXG4gKiAgIFtqYV1KYXZhU2NyaXB044GL44KJ5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU3dpdGNoJywgZnVuY3Rpb24oJG9uc2VuLCBTd2l0Y2hWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBpZiAoYXR0cnMubmdDb250cm9sbGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGVsZW1lbnQgY2FuXFwndCBhY2NlcHQgbmctY29udHJvbGxlciBkaXJlY3RpdmUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3dpdGNoVmlldyA9IG5ldyBTd2l0Y2hWaWV3KGVsZW1lbnQsIHNjb3BlLCBhdHRycyk7XG4gICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhzd2l0Y2hWaWV3LCBlbGVtZW50KTtcblxuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgc3dpdGNoVmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXN3aXRjaCcsIHN3aXRjaFZpZXcpO1xuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3dpdGNoVmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoc3dpdGNoVmlldyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBhdHRycyA9IHNjb3BlID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUudmFsdWUoJ1RhYmJhck5vbmVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyTm9uZUFuaW1hdG9yKTtcbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJGYWRlQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlRhYmJhckZhZGVBbmltYXRvcik7XG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyU2xpZGVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyU2xpZGVBbmltYXRvcik7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ1RhYmJhclZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICB2YXIgVGFiYmFyVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnb25zLXRhYmJhcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiZWxlbWVudFwiIHBhcmFtZXRlciBtdXN0IGJlIGEgXCJvbnMtdGFiYmFyXCIgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0UGFnZVNjb3BlID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zY29wZS4kb24oJyRkZXN0cm95JywgdGhpcy5fZGVzdHJveS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3JlYWN0aXZlJywgJ3Bvc3RjaGFuZ2UnLCAncHJlY2hhbmdlJywgJ2luaXQnLCAnc2hvdycsICdoaWRlJywgJ2Rlc3Ryb3knXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgZWxlbWVudFswXSwgW1xuICAgICAgICAgICdzZXRBY3RpdmVUYWInLFxuICAgICAgICAgICdzZXRUYWJiYXJWaXNpYmlsaXR5JyxcbiAgICAgICAgICAnZ2V0QWN0aXZlVGFiSW5kZXgnLFxuICAgICAgICAgICdsb2FkUGFnZSdcbiAgICAgICAgXSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgTWljcm9FdmVudC5taXhpbihUYWJiYXJWaWV3KTtcblxuICAgIFRhYmJhclZpZXcucmVnaXN0ZXJBbmltYXRvciA9IGZ1bmN0aW9uKG5hbWUsIEFuaW1hdG9yKSB7XG4gICAgICByZXR1cm4gd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJlZ2lzdGVyQW5pbWF0b3IobmFtZSwgQW5pbWF0b3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gVGFiYmFyVmlldztcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b2FzdFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdG9hc3QgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODiOODvOOCueODiOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+OCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl2xpc3RlbmVy44OR44Op44Oh44O844K/44GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44CB44Gd44Gu44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjga7plqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmuKHjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBUb2FzdCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RvYXN0JywgZnVuY3Rpb24oJG9uc2VuLCBUb2FzdFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgdG9hc3QgPSBuZXcgVG9hc3RWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB0b2FzdCk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHRvYXN0LCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0b2FzdCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvYXN0JywgdG9hc3QpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdG9hc3QuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0b2FzdCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvYXN0JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNBY3Rpb25TaGVldEJ1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWFjdGlvbi1zaGVldC1idXR0b24nfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNCYWNrQnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSwgR2VuZXJpY1ZpZXcsIENvbXBvbmVudENsZWFuZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIsIHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgICAgIHZhciBiYWNrQnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYmFjay1idXR0b24nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGF0dHJzLm5nQ2xpY2spIHtcbiAgICAgICAgICAgICAgZWxlbWVudFswXS5vbkNsaWNrID0gYW5ndWxhci5ub29wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGJhY2tCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhiYWNrQnV0dG9uKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cnMpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNCb3R0b21Ub29sYmFyJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgdmlld0tleTogJ29ucy1ib3R0b21Ub29sYmFyJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWJ1dHRvblxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9IEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgIHZpZXdLZXk6ICdvbnMtYnV0dG9uJ1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYnV0dG9uLCAnZGlzYWJsZWQnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fZWxlbWVudFswXS5kaXNhYmxlZCA9IHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cblxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNDYXJkJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtY2FyZCd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtY2hlY2tib3hcbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQ2hlY2tib3gnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbkNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduKHNjb3BlLCBlbC5jaGVja2VkKTtcbiAgICAgICAgICBhdHRycy5uZ0NoYW5nZSAmJiBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgdmFsdWUgPT4gZWwuY2hlY2tlZCA9IHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50Lm9uKCdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBlbCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNEdW1teUZvckluaXQnLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgdmFyIGlzUmVhZHkgPSBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IHtcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoIWlzUmVhZHkpIHtcbiAgICAgICAgICAgIGlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckb25zLXJlYWR5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBFVkVOVFMgPVxuICAgICgnZHJhZyBkcmFnbGVmdCBkcmFncmlnaHQgZHJhZ3VwIGRyYWdkb3duIGhvbGQgcmVsZWFzZSBzd2lwZSBzd2lwZWxlZnQgc3dpcGVyaWdodCAnICtcbiAgICAgICdzd2lwZXVwIHN3aXBlZG93biB0YXAgZG91YmxldGFwIHRvdWNoIHRyYW5zZm9ybSBwaW5jaCBwaW5jaGluIHBpbmNob3V0IHJvdGF0ZScpLnNwbGl0KC8gKy8pO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zR2VzdHVyZURldGVjdG9yJywgZnVuY3Rpb24oJG9uc2VuKSB7XG5cbiAgICB2YXIgc2NvcGVEZWYgPSBFVkVOVFMucmVkdWNlKGZ1bmN0aW9uKGRpY3QsIG5hbWUpIHtcbiAgICAgIGRpY3RbJ25nJyArIHRpdGxpemUobmFtZSldID0gJyYnO1xuICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfSwge30pO1xuXG4gICAgZnVuY3Rpb24gdGl0bGl6ZShzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogc2NvcGVEZWYsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBfLCB0cmFuc2NsdWRlKSB7XG5cbiAgICAgICAgICB0cmFuc2NsdWRlKHNjb3BlLiRwYXJlbnQsIGZ1bmN0aW9uKGNsb25lZCkge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoY2xvbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBhdHRyID0gJ25nJyArIHRpdGxpemUoZXZlbnQudHlwZSk7XG5cbiAgICAgICAgICAgIGlmIChhdHRyIGluIHNjb3BlRGVmKSB7XG4gICAgICAgICAgICAgIHNjb3BlW2F0dHJdKHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBnZXN0dXJlRGV0ZWN0b3I7XG5cbiAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3IgPSBlbGVtZW50WzBdLl9nZXN0dXJlRGV0ZWN0b3I7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3Iub24oRVZFTlRTLmpvaW4oJyAnKSwgaGFuZGxlcik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLm9mZihFVkVOVFMuam9pbignICcpLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5lbGVtZW50ID0gc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcblxuIiwiXG4vKipcbiAqIEBlbGVtZW50IG9ucy1pY29uXG4gKi9cblxuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0ljb24nLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgaWYgKGF0dHJzLmljb24uaW5kZXhPZigne3snKSAhPT0gLTEpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnaWNvbicsICgpID0+IHtcbiAgICAgICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiBlbGVtZW50WzBdLl91cGRhdGUoKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHNjb3BlLCBlbGVtZW50LCBhdHRycykgPT4ge1xuICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge1xuICAgICAgICAgICAgdmlld0tleTogJ29ucy1pY29uJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcblxuICAgICAgfVxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWlmLW9yaWVudGF0aW9uXG4gKiBAY2F0ZWdvcnkgY29uZGl0aW9uYWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ29uZGl0aW9uYWxseSBkaXNwbGF5IGNvbnRlbnQgZGVwZW5kaW5nIG9uIHNjcmVlbiBvcmllbnRhdGlvbi4gVmFsaWQgdmFsdWVzIGFyZSBwb3J0cmFpdCBhbmQgbGFuZHNjYXBlLiBEaWZmZXJlbnQgZnJvbSBvdGhlciBjb21wb25lbnRzLCB0aGlzIGNvbXBvbmVudCBpcyB1c2VkIGFzIGF0dHJpYnV0ZSBpbiBhbnkgZWxlbWVudC5bL2VuXVxuICogICBbamFd55S76Z2i44Gu5ZCR44GN44Gr5b+c44GY44Gm44Kz44Oz44OG44Oz44OE44Gu5Yi25b6h44KS6KGM44GE44G+44GZ44CCcG9ydHJhaXTjgoLjgZfjgY/jga9sYW5kc2NhcGXjgpLmjIflrprjgafjgY3jgb7jgZnjgILjgZnjgbnjgabjga7opoHntKDjga7lsZ7mgKfjgavkvb/nlKjjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLXBsYXRmb3JtIFtlbl1vbnMtaWYtcGxhdGZvcm0gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLXBsYXRmb3Jt44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1vcmllbnRhdGlvbj1cInBvcnRyYWl0XCI+XG4gKiAgIDxwPlRoaXMgd2lsbCBvbmx5IGJlIHZpc2libGUgaW4gcG9ydHJhaXQgbW9kZS48L3A+XG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLW9yaWVudGF0aW9uXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUVpdGhlciBcInBvcnRyYWl0XCIgb3IgXCJsYW5kc2NhcGVcIi5bL2VuXVxuICogICBbamFdcG9ydHJhaXTjgoLjgZfjgY/jga9sYW5kc2NhcGXjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmT3JpZW50YXRpb24nLCBmdW5jdGlvbigkb25zZW4sICRvbnNHbG9iYWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZk9yaWVudGF0aW9uJywgdXBkYXRlKTtcbiAgICAgICAgICAkb25zR2xvYmFsLm9yaWVudGF0aW9uLm9uKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vZmYoJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyT3JpZW50YXRpb24gPSAoJycgKyBhdHRycy5vbnNJZk9yaWVudGF0aW9uKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIG9yaWVudGF0aW9uID0gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpO1xuXG4gICAgICAgICAgICBpZiAodXNlck9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnIHx8IHVzZXJPcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZScpIHtcbiAgICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gb3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBnZXRMYW5kc2NhcGVPclBvcnRyYWl0KCkge1xuICAgICAgICAgICAgcmV0dXJuICRvbnNHbG9iYWwub3JpZW50YXRpb24uaXNQb3J0cmFpdCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWlmLXBsYXRmb3JtXG4gKiBAY2F0ZWdvcnkgY29uZGl0aW9uYWxcbiAqIEBkZXNjcmlwdGlvblxuICogICAgW2VuXUNvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiB0aGUgcGxhdGZvcm0gLyBicm93c2VyLiBWYWxpZCB2YWx1ZXMgYXJlIFwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiBhbmQgXCJ3cFwiLlsvZW5dXG4gKiAgICBbamFd44OX44Op44OD44OI44OV44Kp44O844Og44KE44OW44Op44Km44K244O844Gr5b+c44GY44Gm44Kz44Oz44OG44Oz44OE44Gu5Yi25b6h44KS44GK44GT44Gq44GE44G+44GZ44CCb3BlcmEsIGZpcmVmb3gsIHNhZmFyaSwgY2hyb21lLCBpZSwgZWRnZSwgYW5kcm9pZCwgYmxhY2tiZXJyeSwgaW9zLCB3cOOBruOBhOOBmuOCjOOBi+OBruWApOOCkuepuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtb3JpZW50YXRpb24gW2VuXW9ucy1pZi1vcmllbnRhdGlvbiBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtb3JpZW50YXRpb27jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLXBsYXRmb3JtPVwiYW5kcm9pZFwiPlxuICogICAuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtcGxhdGZvcm1cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dT25lIG9yIG11bHRpcGxlIHNwYWNlIHNlcGFyYXRlZCB2YWx1ZXM6IFwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiBvciBcIndwXCIuWy9lbl1cbiAqICAgW2phXVwib3BlcmFcIiwgXCJmaXJlZm94XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiaWVcIiwgXCJlZGdlXCIsIFwiYW5kcm9pZFwiLCBcImJsYWNrYmVycnlcIiwgXCJpb3NcIiwgXCJ3cFwi44Gu44GE44Ga44KM44GL56m655m95Yy65YiH44KK44Gn6KSH5pWw5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZQbGF0Zm9ybScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICB2YXIgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybVN0cmluZygpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZQbGF0Zm9ybScsIGZ1bmN0aW9uKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybSkge1xuICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyUGxhdGZvcm1zID0gYXR0cnMub25zSWZQbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgaWYgKHVzZXJQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFBsYXRmb3JtU3RyaW5nKCkge1xuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvUklNIFRhYmxldCBPUy9pKSkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JCMTAvaSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2JsYWNrYmVycnknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmV8SUVNb2JpbGV8V1BEZXNrdG9wL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3dwJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBPcGVyYSA4LjArIChVQSBkZXRlY3Rpb24gdG8gZGV0ZWN0IEJsaW5rL3Y4LXBvd2VyZWQgT3BlcmEpXG4gICAgICAgICAgdmFyIGlzT3BlcmEgPSAhIXdpbmRvdy5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNPcGVyYSkge1xuICAgICAgICAgICAgcmV0dXJuICdvcGVyYSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRmlyZWZveCA9IHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7ICAgLy8gRmlyZWZveCAxLjArXG4gICAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNTYWZhcmkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93LkhUTUxFbGVtZW50KS5pbmRleE9mKCdDb25zdHJ1Y3RvcicpID4gMDtcbiAgICAgICAgICAvLyBBdCBsZWFzdCBTYWZhcmkgMys6IFwiW29iamVjdCBIVE1MRWxlbWVudENvbnN0cnVjdG9yXVwiXG4gICAgICAgICAgaWYgKGlzU2FmYXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIEVkZ2UvJykgPj0gMDtcbiAgICAgICAgICBpZiAoaXNFZGdlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2VkZ2UnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0Nocm9tZSA9ICEhd2luZG93LmNocm9tZSAmJiAhaXNPcGVyYSAmJiAhaXNFZGdlOyAvLyBDaHJvbWUgMStcbiAgICAgICAgICBpZiAoaXNDaHJvbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY2hyb21lJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNJRSA9IC8qQGNjX29uIUAqL2ZhbHNlIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlOyAvLyBBdCBsZWFzdCBJRTZcbiAgICAgICAgICBpZiAoaXNJRSkge1xuICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWlucHV0XG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0lucHV0JywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRbMF07XG5cbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduKHNjb3BlLCBlbC50eXBlID09PSAnbnVtYmVyJyA/IE51bWJlcihlbC52YWx1ZSkgOiBlbC52YWx1ZSk7XG4gICAgICAgICAgYXR0cnMubmdDaGFuZ2UgJiYgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IGVsLnZhbHVlKSB7XG4gICAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBlbCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWtleWJvYXJkLWFjdGl2ZVxuICogQGNhdGVnb3J5IGZvcm1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dXG4gKiAgICAgQ29uZGl0aW9uYWxseSBkaXNwbGF5IGNvbnRlbnQgZGVwZW5kaW5nIG9uIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyB2aXNpYmxlIG9yIGhpZGRlbi5cbiAqICAgICBUaGlzIGNvbXBvbmVudCByZXF1aXJlcyBjb3Jkb3ZhIGFuZCB0aGF0IHRoZSBjb20uaW9uaWMua2V5Ym9hcmQgcGx1Z2luIGlzIGluc3RhbGxlZC5cbiAqICAgWy9lbl1cbiAqICAgW2phXVxuICogICAgIOOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOihqOekuuOBleOCjOOBpuOBhOOCi+OBi+OBqeOBhuOBi+OBp+OAgeOCs+ODs+ODhuODs+ODhOOCkuihqOekuuOBmeOCi+OBi+OBqeOBhuOBi+OCkuWIh+OCiuabv+OBiOOCi+OBk+OBqOOBjOWHuuadpeOBvuOBmeOAglxuICogICAgIOOBk+OBruOCs+ODs+ODneODvOODjeODs+ODiOOBr+OAgUNvcmRvdmHjgoRjb20uaW9uaWMua2V5Ym9hcmTjg5fjg6njgrDjgqTjg7PjgpLlv4XopoHjgajjgZfjgb7jgZnjgIJcbiAqICAgWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJc1xuICogICBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1cbiAqICAgW2phXeS7luOBruODpuODvOODhuOCo+ODquODhuOCo0FQSVsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMta2V5Ym9hcmQtYWN0aXZlPlxuICogICBUaGlzIHdpbGwgb25seSBiZSBkaXNwbGF5ZWQgaWYgdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIG9wZW4uXG4gKiA8L2Rpdj5cbiAqIDxkaXYgb25zLWtleWJvYXJkLWluYWN0aXZlPlxuICogICBUaGVyZSBpcyBhbHNvIGEgY29tcG9uZW50IHRoYXQgZG9lcyB0aGUgb3Bwb3NpdGUuXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWtleWJvYXJkLWFjdGl2ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgY29udGVudCBvZiB0YWdzIHdpdGggdGhpcyBhdHRyaWJ1dGUgd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIG9wZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOihqOekuuOBleOCjOOBn+aZguOBq+WIneOCgeOBpuihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1pbmFjdGl2ZVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgY29udGVudCBvZiB0YWdzIHdpdGggdGhpcyBhdHRyaWJ1dGUgd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIGhpZGRlbi5bL2VuXVxuICogICBbamFd44GT44Gu5bGe5oCn44GM44Gk44GE44Gf6KaB57Sg44Gv44CB44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6Zqg44KM44Gm44GE44KL5pmC44Gu44G/6KGo56S644GV44KM44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIGNvbXBpbGVGdW5jdGlvbiA9IGZ1bmN0aW9uKHNob3csICRvbnNlbikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBkaXNwU2hvdyA9IHNob3cgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgZGlzcEhpZGUgPSBzaG93ID8gJ25vbmUnIDogJ2Jsb2NrJztcblxuICAgICAgICB2YXIgb25TaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCBkaXNwU2hvdyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9uSGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcEhpZGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkluaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUudmlzaWJsZSkge1xuICAgICAgICAgICAgb25TaG93KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignc2hvdycsIG9uU2hvdyk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdoaWRlJywgb25IaWRlKTtcbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ2luaXQnLCBvbkluaXQpO1xuXG4gICAgICAgIGlmIChvbnMuc29mdHdhcmVLZXlib2FyZC5fdmlzaWJsZSkge1xuICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNLZXlib2FyZEFjdGl2ZScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGNvbXBpbGU6IGNvbXBpbGVGdW5jdGlvbih0cnVlLCAkb25zZW4pXG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRJbmFjdGl2ZScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGNvbXBpbGU6IGNvbXBpbGVGdW5jdGlvbihmYWxzZSwgJG9uc2VuKVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdCcsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdEhlYWRlcicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QtaGVhZGVyJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RJdGVtJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC1pdGVtJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0VGl0bGUnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0LXRpdGxlJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1EaXNwbGF5IGEgcGxhY2Vob2xkZXIgd2hpbGUgdGhlIGNvbnRlbnQgaXMgbG9hZGluZy5bL2VuXVxuICogICBbamFdT25zZW4gVUnjgYzoqq3jgb/ovrzjgb7jgozjgovjgb7jgafjgavooajnpLrjgZnjgovjg5fjg6zjg7zjgrnjg5vjg6vjg4Djg7zjgpLooajnj77jgZfjgb7jgZnjgIJbL2phXVxuICogQGd1aWRlIFV0aWxpdHlBUElzIFtlbl1PdGhlciB1dGlsaXR5IEFQSXNbL2VuXVtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWxvYWRpbmctcGxhY2Vob2xkZXI9XCJwYWdlLmh0bWxcIj5cbiAqICAgTG9hZGluZy4uLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRoZSB1cmwgb2YgdGhlIHBhZ2UgdG8gbG9hZC5bL2VuXVxuICogICBbamFd6Kqt44G/6L6844KA44Oa44O844K444GuVVJM44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTG9hZGluZ1BsYWNlaG9sZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzLm9uc0xvYWRpbmdQbGFjZWhvbGRlcikge1xuICAgICAgICAgIG9ucy5fcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlcihlbGVtZW50WzBdLCBhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIsIGZ1bmN0aW9uKGNvbnRlbnRFbGVtZW50LCBkb25lKSB7XG4gICAgICAgICAgICBvbnMuY29tcGlsZShjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICBzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsbnVsbCwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcmFkaW9cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmFkaW8nLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbkNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduKHNjb3BlLCBlbC52YWx1ZSk7XG4gICAgICAgICAgYXR0cnMubmdDaGFuZ2UgJiYgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsIHZhbHVlID0+IGVsLmNoZWNrZWQgPSB2YWx1ZSA9PT0gZWwudmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQub24oJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JhbmdlJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzZXQgPSAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduO1xuXG4gICAgICAgICAgc2V0KHNjb3BlLCBlbGVtZW50WzBdLnZhbHVlKTtcbiAgICAgICAgICBpZiAoYXR0cnMubmdDaGFuZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmlwcGxlJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtcmlwcGxlJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2NvcGVcbiAqIEBjYXRlZ29yeSB1dGlsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbCBjaGlsZCBlbGVtZW50cyB1c2luZyB0aGUgXCJ2YXJcIiBhdHRyaWJ1dGUgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgc2NvcGUgb2YgdGhpcyBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV1cInZhclwi5bGe5oCn44KS5L2/44Gj44Gm44GE44KL5YWo44Gm44Gu5a2Q6KaB57Sg44Gudmlld+OCquODluOCuOOCp+OCr+ODiOOBr+OAgeOBk+OBruimgee0oOOBrkFuZ3VsYXJKU+OCueOCs+ODvOODl+OBq+i/veWKoOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1saXN0PlxuICogICA8b25zLWxpc3QtaXRlbSBvbnMtc2NvcGUgbmctcmVwZWF0PVwiaXRlbSBpbiBpdGVtc1wiPlxuICogICAgIDxvbnMtY2Fyb3VzZWwgdmFyPVwiY2Fyb3VzZWxcIj5cbiAqICAgICAgIDxvbnMtY2Fyb3VzZWwtaXRlbSBuZy1jbGljaz1cImNhcm91c2VsLm5leHQoKVwiPlxuICogICAgICAgICB7eyBpdGVtIH19XG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbSBuZy1jbGljaz1cImNhcm91c2VsLnByZXYoKVwiPlxuICogICAgICAgICAuLi5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAgPC9vbnMtY2Fyb3VzZWw+XG4gKiAgIDwvb25zLWxpc3QtaXRlbT5cbiAqIDwvb25zLWxpc3Q+XG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1Njb3BlJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zZWFyY2gtaW5wdXRcbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zU2VhcmNoSW5wdXQnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIGVsLnR5cGUgPT09ICdudW1iZXInID8gTnVtYmVyKGVsLnZhbHVlKSA6IGVsLnZhbHVlKTtcbiAgICAgICAgICBhdHRycy5uZ0NoYW5nZSAmJiBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gZWwudmFsdWUpIHtcbiAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2VsZWN0XG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC5kaXJlY3RpdmUoJ29uc1NlbGVjdCcsIGZ1bmN0aW9uICgkcGFyc2UsICRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIHNldChzY29wZSwgZWxlbWVudFswXS52YWx1ZSk7XG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHsgdmlld0tleTogJ29ucy1zZWxlY3QnIH0pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSlcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlci1jb250ZW50XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlNwbGl0dGVyQ29udGVudEVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1jb250ZW50JywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyQ29udGVudCcsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlckNvbnRlbnQsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyQ29udGVudChzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB2aWV3KTtcblxuICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItY29udGVudCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItc2lkZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZW9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZW9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdG9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0b3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1tb2RlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJtb2RlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJtb2RlY2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5TcGxpdHRlclNpZGVFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlNwbGl0dGVyU2lkZUVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1zaWRlJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyU2lkZScsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlclNpZGUsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyU2lkZShzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3kgcHJlb3BlbiBwcmVjbG9zZSBwb3N0b3BlbiBwb3N0Y2xvc2UgbW9kZWNoYW5nZScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItc2lkZScsIHZpZXcpO1xuXG4gICAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYicsIHRhYilcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWJiYXJJdGVtJywgdGFiKTsgLy8gZm9yIEJDXG5cbiAgZnVuY3Rpb24gdGFiKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRhYmJhclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHRhYiBiYXIuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCv+ODluODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIGhpZGUtdGFic1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqIEBkZWZhdWx0IGZhbHNlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVdoZXRoZXIgdG8gaGlkZSB0aGUgdGFicy4gVmFsaWQgdmFsdWVzIGFyZSB0cnVlL2ZhbHNlLlsvZW5dXG4gKiAgIFtqYV3jgr/jg5bjgpLpnZ7ooajnpLrjgavjgZnjgovloLTlkIjjgavmjIflrprjgZfjgb7jgZnjgIJ0cnVl44KC44GX44GP44GvZmFsc2XjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVhY3RpdmVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlYWN0aXZlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWFjdGl2ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuVGFiYmFyRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtdGFiYmFyJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RhYmJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUsICRwYXJzZSwgVGFiYmFyVmlldykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuXG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLmhpZGVUYWJzLCBmdW5jdGlvbihoaWRlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBoaWRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaGlkZSA9IGhpZGUgPT09ICd0cnVlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudFswXS5zZXRUYWJiYXJWaXNpYmlsaXR5KCFoaWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHRhYmJhclZpZXcgPSBuZXcgVGFiYmFyVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGFiYmFyVmlldywgZWxlbWVudCk7XG5cbiAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh0YWJiYXJWaWV3LCAncmVhY3RpdmUgcHJlY2hhbmdlIHBvc3RjaGFuZ2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHRhYmJhclZpZXcpO1xuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdGFiYmFyVmlldyk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRhYmJhclZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRhYmJhclZpZXcpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVGVtcGxhdGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVybWluYWw6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudFswXS50ZW1wbGF0ZSB8fCBlbGVtZW50Lmh0bWwoKTtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGVsZW1lbnQuYXR0cignaWQnKSwgY29udGVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdG9vbGJhci5bL2VuXVxuICogIFtqYV3jgZPjga7jg4Tjg7zjg6vjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGRpcnR5IGZpeCFcbiAgICAgICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lID09PSAnb25zLXRvb2xiYXInKSB7XG4gICAgICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtdG9vbGJhcid9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvb2xiYXItYnV0dG9uXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYnV0dG9uLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5zjgr/jg7PjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zVG9vbGJhckJ1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgdG9vbGJhckJ1dHRvbiA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRvb2xiYXJCdXR0b24pO1xuXG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRvb2xiYXJCdXR0b24sIGVsZW1lbnQpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRvb2xiYXJCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b29sYmFyLWJ1dHRvbicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIENvbXBvbmVudENsZWFuZXIgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZWNvbXBvc2VOb2RlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50LnJlbW92ZSgpLmNoaWxkcmVuKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVjb21wb3NlTm9kZShhbmd1bGFyLmVsZW1lbnQoY2hpbGRyZW5baV0pKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBhdHRyc1xuICAgICAqL1xuICAgIGRlc3Ryb3lBdHRyaWJ1dGVzOiBmdW5jdGlvbihhdHRycykge1xuICAgICAgYXR0cnMuJCRlbGVtZW50ID0gbnVsbDtcbiAgICAgIGF0dHJzLiQkb2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZXN0cm95RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKi9cbiAgICBkZXN0cm95U2NvcGU6IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICBzY29wZS4kJGxpc3RlbmVycyA9IHt9O1xuICAgICAgc2NvcGUuJCR3YXRjaGVycyA9IG51bGw7XG4gICAgICBzY29wZSA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKHNjb3BlLCBmbikge1xuICAgICAgdmFyIGNsZWFyID0gc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhcigpO1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudENsZWFuZXI7XG4gIH0pO1xuXG4gIC8vIG92ZXJyaWRlIGJ1aWx0aW4gbmctKGV2ZW50bmFtZSkgZGlyZWN0aXZlc1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5nRXZlbnREaXJlY3RpdmVzID0ge307XG4gICAgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgbW91c2VlbnRlciBtb3VzZWxlYXZlIGtleWRvd24ga2V5dXAga2V5cHJlc3Mgc3VibWl0IGZvY3VzIGJsdXIgY29weSBjdXQgcGFzdGUnLnNwbGl0KCcgJykuZm9yRWFjaChcbiAgICAgIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmVOb3JtYWxpemUoJ25nLScgKyBuYW1lKTtcbiAgICAgICAgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0gPSBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlOiBmdW5jdGlvbigkZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICB2YXIgZm4gPSAkcGFyc2UoYXR0cltkaXJlY3RpdmVOYW1lXSk7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKHNjb3BlLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgICAgICBzY29wZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cik7XG4gICAgICAgICAgICAgICAgICBhdHRyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XTtcblxuICAgICAgICBmdW5jdGlvbiBkaXJlY3RpdmVOb3JtYWxpemUobmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIG1vZHVsZS5jb25maWcoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgIHZhciBzaGlmdCA9IGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xuICAgICAgICAkZGVsZWdhdGUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcbiAgICAgIH07XG4gICAgICBPYmplY3Qua2V5cyhuZ0V2ZW50RGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihkaXJlY3RpdmVOYW1lKSB7XG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcihkaXJlY3RpdmVOYW1lICsgJ0RpcmVjdGl2ZScsIFsnJGRlbGVnYXRlJywgc2hpZnRdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgIG1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0pO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbk9iamVjdC5rZXlzKG9ucy5ub3RpZmljYXRpb24pLmZpbHRlcihuYW1lID0+ICEvXl8vLnRlc3QobmFtZSkpLmZvckVhY2gobmFtZSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsTm90aWZpY2F0aW9uID0gb25zLm5vdGlmaWNhdGlvbltuYW1lXTtcblxuICBvbnMubm90aWZpY2F0aW9uW25hbWVdID0gKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJyA/IChvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlKSA6IChvcHRpb25zID0gbWVzc2FnZSk7XG5cbiAgICBjb25zdCBjb21waWxlID0gb3B0aW9ucy5jb21waWxlO1xuICAgIGxldCAkZWxlbWVudDtcblxuICAgIG9wdGlvbnMuY29tcGlsZSA9IGVsZW1lbnQgPT4ge1xuICAgICAgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY29tcGlsZSA/IGNvbXBpbGUoZWxlbWVudCkgOiBlbGVtZW50KTtcbiAgICAgIHJldHVybiBvbnMuJGNvbXBpbGUoJGVsZW1lbnQpKCRlbGVtZW50LmluamVjdG9yKCkuZ2V0KCckcm9vdFNjb3BlJykpO1xuICAgIH07XG5cbiAgICBvcHRpb25zLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAkZWxlbWVudC5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgICAgJGVsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gb3JpZ2luYWxOb3RpZmljYXRpb24ob3B0aW9ucyk7XG4gIH07XG59KTtcbiIsIi8vIGNvbmZpcm0gdG8gdXNlIGpxTGl0ZVxuaWYgKHdpbmRvdy5qUXVlcnkgJiYgYW5ndWxhci5lbGVtZW50ID09PSB3aW5kb3cualF1ZXJ5KSB7XG4gIGNvbnNvbGUud2FybignT25zZW4gVUkgcmVxdWlyZSBqcUxpdGUuIExvYWQgalF1ZXJ5IGFmdGVyIGxvYWRpbmcgQW5ndWxhckpTIHRvIGZpeCB0aGlzIGVycm9yLiBqUXVlcnkgbWF5IGJyZWFrIE9uc2VuIFVJIGJlaGF2aW9yLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgdmFyIHRlbXBsYXRlcyA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb25zLXRlbXBsYXRlXCJdJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlc1tpXSk7XG4gICAgICB2YXIgaWQgPSB0ZW1wbGF0ZS5hdHRyKCdpZCcpO1xuICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGlkLCB0ZW1wbGF0ZS50ZXh0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbn0pKCk7XG4iXX0=
