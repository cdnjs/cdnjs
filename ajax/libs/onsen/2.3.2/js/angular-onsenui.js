/*! angular-onsenui.js for onsenui - v2.3.2 - 2017-05-31 */
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
              _this.compileAndLink(view, window.ons._util.createElement(html.trim()), function (element) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIiwib25zZW4uanMiLCJhY3Rpb25TaGVldC5qcyIsImFsZXJ0RGlhbG9nLmpzIiwiYWxlcnREaWFsb2dBbmltYXRvci5qcyIsImFuaW1hdGlvbkNob29zZXIuanMiLCJjYXJvdXNlbC5qcyIsImRpYWxvZy5qcyIsImRpYWxvZ0FuaW1hdG9yLmpzIiwiZmFiLmpzIiwiZ2VuZXJpYy5qcyIsImxhenlSZXBlYXQuanMiLCJsYXp5UmVwZWF0RGVsZWdhdGUuanMiLCJtb2RhbC5qcyIsIm5hdmlnYXRvci5qcyIsIm5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJzcGVlZERpYWwuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsInRvYXN0LmpzIiwiYWN0aW9uU2hlZXRCdXR0b24uanMiLCJiYWNrQnV0dG9uLmpzIiwiYm90dG9tVG9vbGJhci5qcyIsImJ1dHRvbi5qcyIsImNhcmQuanMiLCJkdW1teUZvckluaXQuanMiLCJnZXN0dXJlRGV0ZWN0b3IuanMiLCJpY29uLmpzIiwiaWZPcmllbnRhdGlvbi5qcyIsImlmUGxhdGZvcm0uanMiLCJpbnB1dC5qcyIsImtleWJvYXJkLmpzIiwibGlzdC5qcyIsImxpc3RIZWFkZXIuanMiLCJsaXN0SXRlbS5qcyIsImxpc3RUaXRsZS5qcyIsImxvYWRpbmdQbGFjZWhvbGRlci5qcyIsInByb2dyZXNzQmFyLmpzIiwicmFuZ2UuanMiLCJyaXBwbGUuanMiLCJzY29wZS5qcyIsInNlbGVjdC5qcyIsInNwbGl0dGVyQ29udGVudC5qcyIsInNwbGl0dGVyU2lkZS5qcyIsInRhYi5qcyIsInRhYkJhci5qcyIsInRlbXBsYXRlLmpzIiwidG9vbGJhci5qcyIsInRvb2xiYXJCdXR0b24uanMiLCJjb21wb25lbnRDbGVhbmVyLmpzIiwibm90aWZpY2F0aW9uLmpzIiwic2V0dXAuanMiLCJ0ZW1wbGF0ZUxvYWRlci5qcyJdLCJuYW1lcyI6WyJmblRlc3QiLCJ0ZXN0IiwieHl6IiwiQmFzZUNsYXNzIiwiZXh0ZW5kIiwicHJvcHMiLCJfc3VwZXIiLCJwcm90b3R5cGUiLCJwcm90byIsIk9iamVjdCIsImNyZWF0ZSIsIm5hbWUiLCJmbiIsInRtcCIsInJldCIsImFwcGx5IiwiYXJndW1lbnRzIiwibmV3Q2xhc3MiLCJpbml0IiwiaGFzT3duUHJvcGVydHkiLCJTdWJDbGFzcyIsIkVtcHR5Q2xhc3MiLCJjb25zdHJ1Y3RvciIsIndpbmRvdyIsIkNsYXNzIiwib25zIiwibW9kdWxlIiwiYW5ndWxhciIsImluaXRPbnNlbkZhY2FkZSIsIndhaXRPbnNlblVJTG9hZCIsImluaXRBbmd1bGFyTW9kdWxlIiwiaW5pdFRlbXBsYXRlQ2FjaGUiLCJ1bmxvY2tPbnNlblVJIiwiX3JlYWR5TG9jayIsImxvY2siLCJydW4iLCIkY29tcGlsZSIsIiRyb290U2NvcGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3JlYXRlRWxlbWVudCIsIkVycm9yIiwiJG9uIiwidmFsdWUiLCIkb25zZW4iLCIkcSIsIl9vbnNlblNlcnZpY2UiLCJfcVNlcnZpY2UiLCJjb25zb2xlIiwiYWxlcnQiLCIkdGVtcGxhdGVDYWNoZSIsIl9pbnRlcm5hbCIsImdldFRlbXBsYXRlSFRNTEFzeW5jIiwicGFnZSIsImNhY2hlIiwiZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb21wb25lbnRCYXNlIiwiYm9vdHN0cmFwIiwiZGVwcyIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJjb25jYXQiLCJkb2MiLCJkb2N1bWVudEVsZW1lbnQiLCJmaW5kUGFyZW50Q29tcG9uZW50VW50aWwiLCJkb20iLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJ0YXJnZXQiLCJpbmhlcml0ZWREYXRhIiwiZmluZENvbXBvbmVudCIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsImRhdGEiLCJub2RlTmFtZSIsInRvTG93ZXJDYXNlIiwiY29tcGlsZSIsInNjb3BlIiwiX2dldE9uc2VuU2VydmljZSIsIl93YWl0RGlyZXRpdmVJbml0IiwiZWxlbWVudE5hbWUiLCJsYXN0UmVhZHkiLCJjYWxsYmFjayIsImxpc3RlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjcmVhdGVFbGVtZW50T3JpZ2luYWwiLCJ0ZW1wbGF0ZSIsIm9wdGlvbnMiLCJsaW5rIiwicGFyZW50U2NvcGUiLCIkbmV3IiwiJGV2YWxBc3luYyIsImdldFNjb3BlIiwiZSIsInRhZ05hbWUiLCJyZXN1bHQiLCJhcHBlbmQiLCJ0aGVuIiwicmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlck9yaWdpbmFsIiwicmVzb2x2ZUxvYWRpbmdQbGFjZUhvbGRlciIsInJlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIiLCJyZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyT3JpZ2luYWwiLCJkb25lIiwic2V0SW1tZWRpYXRlIiwiX3NldHVwTG9hZGluZ1BsYWNlSG9sZGVycyIsImZhY3RvcnkiLCJBY3Rpb25TaGVldFZpZXciLCJhdHRycyIsIl9zY29wZSIsIl9lbGVtZW50IiwiX2F0dHJzIiwiX2NsZWFyRGVyaXZpbmdNZXRob2RzIiwiZGVyaXZlTWV0aG9kcyIsIl9jbGVhckRlcml2aW5nRXZlbnRzIiwiZGVyaXZlRXZlbnRzIiwiZGV0YWlsIiwiYWN0aW9uU2hlZXQiLCJiaW5kIiwiX2Rlc3Ryb3kiLCJlbWl0IiwicmVtb3ZlIiwicmVnaXN0ZXJBbmltYXRvciIsIkFuaW1hdG9yIiwiQWN0aW9uU2hlZXRFbGVtZW50IiwiTWljcm9FdmVudCIsIm1peGluIiwiZGVyaXZlUHJvcGVydGllc0Zyb21FbGVtZW50IiwiQWxlcnREaWFsb2dWaWV3IiwiYWxlcnREaWFsb2ciLCJBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3IiLCJJT1NBbGVydERpYWxvZ0FuaW1hdG9yIiwiQW5pbWF0b3JGYWN0b3J5IiwiQ2Fyb3VzZWxWaWV3IiwiY2Fyb3VzZWwiLCJEaWFsb2dWaWV3IiwiZGlhbG9nIiwiRGlhbG9nRWxlbWVudCIsIkRpYWxvZ0FuaW1hdG9yIiwiSU9TRGlhbG9nQW5pbWF0b3IiLCJBbmRyb2lkRGlhbG9nQW5pbWF0b3IiLCJTbGlkZURpYWxvZ0FuaW1hdG9yIiwiRmFiVmlldyIsIkdlbmVyaWNWaWV3Iiwic2VsZiIsImRpcmVjdGl2ZU9ubHkiLCJtb2RpZmllclRlbXBsYXRlIiwiYWRkTW9kaWZpZXJNZXRob2RzIiwiYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMiLCJjbGVhbmVyIiwib25EZXN0cm95IiwiX2V2ZW50cyIsInJlbW92ZU1vZGlmaWVyTWV0aG9kcyIsImNsZWFyQ29tcG9uZW50IiwicmVnaXN0ZXIiLCJ2aWV3Iiwidmlld0tleSIsImRlY2xhcmVWYXJBdHRyaWJ1dGUiLCJkZXN0cm95Iiwibm9vcCIsIkFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUiLCJMYXp5UmVwZWF0VmlldyIsImxpbmtlciIsIl9saW5rZXIiLCJ1c2VyRGVsZWdhdGUiLCIkZXZhbCIsIm9uc0xhenlSZXBlYXQiLCJpbnRlcm5hbERlbGVnYXRlIiwiX3Byb3ZpZGVyIiwiTGF6eVJlcGVhdFByb3ZpZGVyIiwicGFyZW50Tm9kZSIsInJlZnJlc2giLCIkd2F0Y2giLCJjb3VudEl0ZW1zIiwiX29uQ2hhbmdlIiwiZGlyZWN0aXZlQXR0cmlidXRlcyIsInRlbXBsYXRlRWxlbWVudCIsIl9wYXJlbnRTY29wZSIsImZvckVhY2giLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyIiwiY2xvbmVOb2RlIiwiaXRlbSIsIl91c2VyRGVsZWdhdGUiLCJjb25maWd1cmVJdGVtU2NvcGUiLCJGdW5jdGlvbiIsImRlc3Ryb3lJdGVtU2NvcGUiLCJjcmVhdGVJdGVtQ29udGVudCIsImluZGV4IiwiX3ByZXBhcmVJdGVtRWxlbWVudCIsIl9hZGRTcGVjaWFsUHJvcGVydGllcyIsIl91c2luZ0JpbmRpbmciLCJjbG9uZWQiLCJpIiwibGFzdCIsIiRpbmRleCIsIiRmaXJzdCIsIiRsYXN0IiwiJG1pZGRsZSIsIiRldmVuIiwiJG9kZCIsIiRkZXN0cm95IiwiTGF6eVJlcGVhdERlbGVnYXRlIiwiTW9kYWxBbmltYXRvciIsIkZhZGVNb2RhbEFuaW1hdG9yIiwiJHBhcnNlIiwiTW9kYWxWaWV3IiwiX2FuaW1hdG9yRmFjdG9yeSIsInNldEFuaW1hdGlvbk9wdGlvbnMiLCJhbmltYXRpb25PcHRpb25zIiwic2hvdyIsImhpZGUiLCJ0b2dnbGUiLCJNb2RhbEVsZW1lbnQiLCJOYXZpZ2F0b3JWaWV3IiwiX3ByZXZpb3VzUGFnZVNjb3BlIiwiX2JvdW5kT25QcmVwb3AiLCJfb25QcmVwb3AiLCJvbiIsIm5hdmlnYXRvciIsImV2ZW50IiwicGFnZXMiLCJsZW5ndGgiLCJvZmYiLCJOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJGYWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiSU9TU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJMaWZ0TmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiU2ltcGxlU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IiLCJQYWdlVmlldyIsIl9jbGVhckxpc3RlbmVyIiwiZGVmaW5lUHJvcGVydHkiLCJvbkRldmljZUJhY2tCdXR0b24iLCJzZXQiLCJfdXNlckJhY2tCdXR0b25IYW5kbGVyIiwiX2VuYWJsZUJhY2tCdXR0b25IYW5kbGVyIiwibmdEZXZpY2VCYWNrQnV0dG9uIiwibmdJbmZpbml0ZVNjcm9sbCIsIm9uSW5maW5pdGVTY3JvbGwiLCJfb25EZXZpY2VCYWNrQnV0dG9uIiwiJGV2ZW50IiwibGFzdEV2ZW50IiwiUG9wb3ZlclZpZXciLCJwb3BvdmVyIiwiUG9wb3ZlckFuaW1hdG9yIiwiRmFkZVBvcG92ZXJBbmltYXRvciIsIlB1bGxIb29rVmlldyIsInB1bGxIb29rIiwib25BY3Rpb24iLCJuZ0FjdGlvbiIsIiRkb25lIiwiU3BlZWREaWFsVmlldyIsIlNwbGl0dGVyQ29udGVudCIsImxvYWQiLCJfcGFnZVNjb3BlIiwiU3BsaXR0ZXJTaWRlIiwic2lkZSIsIlNwbGl0dGVyIiwicHJvcCIsIlN3aXRjaFZpZXciLCJfY2hlY2tib3giLCJfcHJlcGFyZU5nTW9kZWwiLCJuZ01vZGVsIiwiYXNzaWduIiwiJHBhcmVudCIsImNoZWNrZWQiLCJuZ0NoYW5nZSIsIlRhYmJhck5vbmVBbmltYXRvciIsIlRhYmJhckZhZGVBbmltYXRvciIsIlRhYmJhclNsaWRlQW5pbWF0b3IiLCJUYWJiYXJWaWV3IiwiX2xhc3RQYWdlRWxlbWVudCIsIl9sYXN0UGFnZVNjb3BlIiwiVGFiYmFyRWxlbWVudCIsIlRvYXN0VmlldyIsInRvYXN0IiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJyZXBsYWNlIiwidHJhbnNjbHVkZSIsInByZSIsInJlZ2lzdGVyRXZlbnRIYW5kbGVycyIsInBvc3QiLCJmaXJlQ29tcG9uZW50RXZlbnQiLCJDb21wb25lbnRDbGVhbmVyIiwiY29udHJvbGxlciIsImJhY2tCdXR0b24iLCJuZ0NsaWNrIiwib25DbGljayIsImRlc3Ryb3lTY29wZSIsImRlc3Ryb3lBdHRyaWJ1dGVzIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJwYXJlbnRFbGVtZW50IiwiX3NldHVwIiwiX3NldHVwSW5pdGlhbEluZGV4IiwiX3NhdmVMYXN0U3RhdGUiLCJpc1JlYWR5IiwiJGJyb2FkY2FzdCIsImZhYiIsIkVWRU5UUyIsInNwbGl0Iiwic2NvcGVEZWYiLCJyZWR1Y2UiLCJkaWN0IiwidGl0bGl6ZSIsInN0ciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJfIiwiaGFuZGxlciIsInR5cGUiLCJnZXN0dXJlRGV0ZWN0b3IiLCJfZ2VzdHVyZURldGVjdG9yIiwiam9pbiIsImljb24iLCJpbmRleE9mIiwiJG9ic2VydmUiLCJfdXBkYXRlIiwiJG9uc0dsb2JhbCIsImNzcyIsInVwZGF0ZSIsIm9yaWVudGF0aW9uIiwidXNlck9yaWVudGF0aW9uIiwib25zSWZPcmllbnRhdGlvbiIsImdldExhbmRzY2FwZU9yUG9ydHJhaXQiLCJpc1BvcnRyYWl0IiwicGxhdGZvcm0iLCJnZXRQbGF0Zm9ybVN0cmluZyIsInVzZXJQbGF0Zm9ybSIsInVzZXJQbGF0Zm9ybXMiLCJvbnNJZlBsYXRmb3JtIiwidHJpbSIsInVzZXJBZ2VudCIsIm1hdGNoIiwiaXNPcGVyYSIsIm9wZXJhIiwiaXNGaXJlZm94IiwiSW5zdGFsbFRyaWdnZXIiLCJpc1NhZmFyaSIsInRvU3RyaW5nIiwiY2FsbCIsImlzRWRnZSIsImlzQ2hyb21lIiwiY2hyb21lIiwiaXNJRSIsImRvY3VtZW50TW9kZSIsImVsIiwib25JbnB1dCIsIl9pc1RleHRJbnB1dCIsIk51bWJlciIsImNvbXBpbGVGdW5jdGlvbiIsImRpc3BTaG93IiwiZGlzcEhpZGUiLCJvblNob3ciLCJvbkhpZGUiLCJvbkluaXQiLCJ2aXNpYmxlIiwic29mdHdhcmVLZXlib2FyZCIsIl92aXNpYmxlIiwicHJpb3JpdHkiLCJ0ZXJtaW5hbCIsImxhenlSZXBlYXQiLCJvbnNMb2FkaW5nUGxhY2Vob2xkZXIiLCJfcmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlciIsImNvbnRlbnRFbGVtZW50IiwibW9kYWwiLCJOYXZpZ2F0b3JFbGVtZW50IiwicmV3cml0YWJsZXMiLCJyZWFkeSIsInBhZ2VMb2FkZXIiLCJjcmVhdGVQYWdlTG9hZGVyIiwiZmlyZVBhZ2VJbml0RXZlbnQiLCJmIiwiaXNBdHRhY2hlZCIsImZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50Iiwic2V0VGltZW91dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInBvc3RMaW5rIiwic3BlZWREaWFsIiwic3BsaXR0ZXIiLCJTcGxpdHRlckNvbnRlbnRFbGVtZW50IiwiU3BsaXR0ZXJTaWRlRWxlbWVudCIsIm5nQ29udHJvbGxlciIsInN3aXRjaFZpZXciLCJ0YWIiLCJoaWRlVGFicyIsInNldFRhYmJhclZpc2liaWxpdHkiLCJ0YWJiYXJWaWV3IiwiY29udGVudCIsImh0bWwiLCJwdXQiLCJ0b29sYmFyQnV0dG9uIiwiZGVjb21wb3NlTm9kZSIsImNoaWxkcmVuIiwiJCRlbGVtZW50IiwiJCRvYnNlcnZlcnMiLCJkZXN0cm95RWxlbWVudCIsIiQkbGlzdGVuZXJzIiwiJCR3YXRjaGVycyIsImNsZWFyIiwibmdFdmVudERpcmVjdGl2ZXMiLCJkaXJlY3RpdmVOYW1lIiwiZGlyZWN0aXZlTm9ybWFsaXplIiwiJGVsZW1lbnQiLCJsaXN0ZW5lciIsIiRhcHBseSIsIm1hdGNoZXMiLCJjb25maWciLCIkcHJvdmlkZSIsInNoaWZ0IiwiJGRlbGVnYXRlIiwia2V5cyIsImRlY29yYXRvciIsIiR3aW5kb3ciLCIkY2FjaGVGYWN0b3J5IiwiJGRvY3VtZW50IiwiJGh0dHAiLCJjcmVhdGVPbnNlblNlcnZpY2UiLCJNb2RpZmllclV0aWwiLCJESVJFQ1RJVkVfVEVNUExBVEVfVVJMIiwiRGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJfZGV2aWNlQmFja0J1dHRvbkRpc3BhdGNoZXIiLCJfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiZ2V0RGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwibWV0aG9kTmFtZXMiLCJtZXRob2ROYW1lIiwia2xhc3MiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHkiLCJldmVudE5hbWVzIiwibWFwIiwibGlzdGVuZXJzIiwiZXZlbnROYW1lIiwicHVzaCIsImlzRW5hYmxlZEF1dG9TdGF0dXNCYXJGaWxsIiwiX2NvbmZpZyIsImF1dG9TdGF0dXNCYXJGaWxsIiwic2hvdWxkRmlsbFN0YXR1c0JhciIsImNvbXBpbGVBbmRMaW5rIiwicGFnZUVsZW1lbnQiLCJwYWdlU2NvcGUiLCJQYWdlTG9hZGVyIiwicGFyZW50IiwiZ2V0UGFnZUhUTUxBc3luYyIsIl91dGlsIiwicGFyYW1zIiwiZWxlbWVudHMiLCJmaW5kRWxlbWVudGVPYmplY3QiLCJkZWZlcnJlZCIsImRlZmVyIiwibm9ybWFsaXplUGFnZUhUTUwiLCJwcm9taXNlIiwidXJsIiwibWV0aG9kIiwicmVzcG9uc2UiLCJnZW5lcmF0ZU1vZGlmaWVyVGVtcGxhdGVyIiwibW9kaWZpZXJzIiwiYXR0ck1vZGlmaWVycyIsIm1vZGlmaWVyIiwibWV0aG9kcyIsImhhc01vZGlmaWVyIiwibmVlZGxlIiwidG9rZW5zIiwic29tZSIsInJlbW92ZU1vZGlmaWVyIiwiZmlsdGVyIiwidG9rZW4iLCJhZGRNb2RpZmllciIsInNldE1vZGlmaWVyIiwidG9nZ2xlTW9kaWZpZXIiLCJfdHIiLCJmbnMiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjbGFzc2VzIiwicGF0dCIsImNscyIsIm9sZEZuIiwibmV3Rm4iLCJvYmplY3QiLCJ2YXIiLCJ2YXJOYW1lIiwiX2RlZmluZVZhciIsIl9yZWdpc3RlckV2ZW50SGFuZGxlciIsImNvbXBvbmVudCIsImNhcGl0YWxpemVkRXZlbnROYW1lIiwibCIsImlzQW5kcm9pZCIsImlzSU9TIiwiaXNXZWJWaWV3IiwiaXNJT1M3YWJvdmUiLCJ1YSIsInBhcnNlRmxvYXQiLCJrZXkiLCJuYW1lcyIsImNvbnRhaW5lciIsImhhc0F0dHJpYnV0ZSIsIm5vdGlmaWNhdGlvbiIsIm9yaWdpbmFsTm90aWZpY2F0aW9uIiwibWVzc2FnZSIsImluamVjdG9yIiwialF1ZXJ5Iiwid2FybiIsInRlbXBsYXRlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpZCIsInRleHQiXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OztBQUtBLENBQUMsWUFBVztBQUNWOztBQUNBLE1BQUlBLFNBQVMsTUFBTUMsSUFBTixDQUFXLFlBQVU7QUFBQ0M7QUFBSyxHQUEzQixJQUErQixZQUEvQixHQUE4QyxJQUEzRDs7QUFFQTtBQUNBLFdBQVNDLFNBQVQsR0FBb0IsQ0FBRTs7QUFFdEI7QUFDQUEsWUFBVUMsTUFBVixHQUFtQixVQUFTQyxLQUFULEVBQWdCO0FBQ2pDLFFBQUlDLFNBQVMsS0FB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dEk7OztBQ0hEOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxDQUFDLFlBQVU7QUFDVDs7QUFFQXJlLFVBQVFELE1BQVIsQ0FBZSxPQUFmLEVBQXdCUyxHQUF4QixvQkFBNEIsVUFBU2tCLGNBQVQsRUFBeUI7QUFDbkQsUUFBSTRjLFlBQVkxZSxPQUFPZSxRQUFQLENBQWdCNGQsZ0JBQWhCLENBQWlDLGtDQUFqQyxDQUFoQjs7QUFFQSxTQUFLLElBQUk1VCxJQUFJLENBQWIsRUFBZ0JBLElBQUkyVCxVQUFVOVIsTUFBOUIsRUFBc0M3QixHQUF0QyxFQUEyQztBQUN6QyxVQUFJM0csV0FBV2hFLFFBQVE0QyxPQUFSLENBQWdCMGIsVUFBVTNULENBQVYsQ0FBaEIsQ0FBZjtBQUNBLFVBQUk2VCxLQUFLeGEsU0FBUzhGLElBQVQsQ0FBYyxJQUFkLENBQVQ7QUFDQSxVQUFJLE9BQU8wVSxFQUFQLEtBQWMsUUFBbEIsRUFBNEI7QUFDMUI5Yyx1QkFBZTBWLEdBQWYsQ0FBbUJvSCxFQUFuQixFQUF1QnhhLFNBQVN5YSxJQUFULEVBQXZCO0FBQ0Q7QUFDRjtBQUNGLEdBVkQ7QUFZRCxDQWZEIiwiZmlsZSI6ImFuZ3VsYXItb25zZW51aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFNpbXBsZSBKYXZhU2NyaXB0IEluaGVyaXRhbmNlIGZvciBFUyA1LjFcbiAqIGJhc2VkIG9uIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9zaW1wbGUtamF2YXNjcmlwdC1pbmhlcml0YW5jZS9cbiAqICAoaW5zcGlyZWQgYnkgYmFzZTIgYW5kIFByb3RvdHlwZSlcbiAqIE1JVCBMaWNlbnNlZC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIGZuVGVzdCA9IC94eXovLnRlc3QoZnVuY3Rpb24oKXt4eXo7fSkgPyAvXFxiX3N1cGVyXFxiLyA6IC8uKi87XG5cbiAgLy8gVGhlIGJhc2UgQ2xhc3MgaW1wbGVtZW50YXRpb24gKGRvZXMgbm90aGluZylcbiAgZnVuY3Rpb24gQmFzZUNsYXNzKCl7fVxuXG4gIC8vIENyZWF0ZSBhIG5ldyBDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBjbGFzc1xuICBCYXNlQ2xhc3MuZXh0ZW5kID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgICB2YXIgX3N1cGVyID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICAvLyBTZXQgdXAgdGhlIHByb3RvdHlwZSB0byBpbmhlcml0IGZyb20gdGhlIGJhc2UgY2xhc3NcbiAgICAvLyAoYnV0IHdpdGhvdXQgcnVubmluZyB0aGUgaW5pdCBjb25zdHJ1Y3RvcilcbiAgICB2YXIgcHJvdG8gPSBPYmplY3QuY3JlYXRlKF9zdXBlcik7XG5cbiAgICAvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG92ZXIgb250byB0aGUgbmV3IHByb3RvdHlwZVxuICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIG92ZXJ3cml0aW5nIGFuIGV4aXN0aW5nIGZ1bmN0aW9uXG4gICAgICBwcm90b1tuYW1lXSA9IHR5cGVvZiBwcm9wc1tuYW1lXSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIHR5cGVvZiBfc3VwZXJbbmFtZV0gPT0gXCJmdW5jdGlvblwiICYmIGZuVGVzdC50ZXN0KHByb3BzW25hbWVdKVxuICAgICAgICA/IChmdW5jdGlvbihuYW1lLCBmbil7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLl9zdXBlcjtcblxuICAgICAgICAgICAgICAvLyBBZGQgYSBuZXcgLl9zdXBlcigpIG1ldGhvZCB0aGF0IGlzIHRoZSBzYW1lIG1ldGhvZFxuICAgICAgICAgICAgICAvLyBidXQgb24gdGhlIHN1cGVyLWNsYXNzXG4gICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gX3N1cGVyW25hbWVdO1xuXG4gICAgICAgICAgICAgIC8vIFRoZSBtZXRob2Qgb25seSBuZWVkIHRvIGJlIGJvdW5kIHRlbXBvcmFyaWx5LCBzbyB3ZVxuICAgICAgICAgICAgICAvLyByZW1vdmUgaXQgd2hlbiB3ZSdyZSBkb25lIGV4ZWN1dGluZ1xuICAgICAgICAgICAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSB0bXA7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkobmFtZSwgcHJvcHNbbmFtZV0pXG4gICAgICAgIDogcHJvcHNbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gVGhlIG5ldyBjb25zdHJ1Y3RvclxuICAgIHZhciBuZXdDbGFzcyA9IHR5cGVvZiBwcm90by5pbml0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gcHJvdG8uaGFzT3duUHJvcGVydHkoXCJpbml0XCIpXG4gICAgICAgID8gcHJvdG8uaW5pdCAvLyBBbGwgY29uc3RydWN0aW9uIGlzIGFjdHVhbGx5IGRvbmUgaW4gdGhlIGluaXQgbWV0aG9kXG4gICAgICAgIDogZnVuY3Rpb24gU3ViQ2xhc3MoKXsgX3N1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuICAgICAgOiBmdW5jdGlvbiBFbXB0eUNsYXNzKCl7fTtcblxuICAgIC8vIFBvcHVsYXRlIG91ciBjb25zdHJ1Y3RlZCBwcm90b3R5cGUgb2JqZWN0XG4gICAgbmV3Q2xhc3MucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBFbmZvcmNlIHRoZSBjb25zdHJ1Y3RvciB0byBiZSB3aGF0IHdlIGV4cGVjdFxuICAgIHByb3RvLmNvbnN0cnVjdG9yID0gbmV3Q2xhc3M7XG5cbiAgICAvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcbiAgICBuZXdDbGFzcy5leHRlbmQgPSBCYXNlQ2xhc3MuZXh0ZW5kO1xuXG4gICAgcmV0dXJuIG5ld0NsYXNzO1xuICB9O1xuXG4gIC8vIGV4cG9ydFxuICB3aW5kb3cuQ2xhc3MgPSBCYXNlQ2xhc3M7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHNlcnZpY2UgY2xhc3MgZm9yIGZyYW1ld29yayBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCckb25zZW4nLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkd2luZG93LCAkY2FjaGVGYWN0b3J5LCAkZG9jdW1lbnQsICR0ZW1wbGF0ZUNhY2hlLCAkaHR0cCwgJHEsICRjb21waWxlLCAkb25zR2xvYmFsLCBDb21wb25lbnRDbGVhbmVyKSB7XG5cbiAgICB2YXIgJG9uc2VuID0gY3JlYXRlT25zZW5TZXJ2aWNlKCk7XG4gICAgdmFyIE1vZGlmaWVyVXRpbCA9ICRvbnNHbG9iYWwuX2ludGVybmFsLk1vZGlmaWVyVXRpbDtcblxuICAgIHJldHVybiAkb25zZW47XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVPbnNlblNlcnZpY2UoKSB7XG4gICAgICByZXR1cm4ge1xuXG4gICAgICAgIERJUkVDVElWRV9URU1QTEFURV9VUkw6ICd0ZW1wbGF0ZXMnLFxuXG4gICAgICAgIGNsZWFuZXI6IENvbXBvbmVudENsZWFuZXIsXG5cbiAgICAgICAgRGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6ICRvbnNHbG9iYWwuX2RldmljZUJhY2tCdXR0b25EaXNwYXRjaGVyLFxuXG4gICAgICAgIF9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6ICRvbnNHbG9iYWwuX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcixcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbWV0aG9kTmFtZXNcbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBkaXNwb3NlIGFsbCBkcml2aW5nIG1ldGhvZHMuXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVNZXRob2RzOiBmdW5jdGlvbih2aWV3LCBlbGVtZW50LCBtZXRob2ROYW1lcykge1xuICAgICAgICAgIG1ldGhvZE5hbWVzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgdmlld1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFttZXRob2ROYW1lXS5hcHBseShlbGVtZW50LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1ldGhvZE5hbWVzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgICB2aWV3W21ldGhvZE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmlldyA9IGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7Q2xhc3N9IGtsYXNzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudDogZnVuY3Rpb24oa2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrbGFzcy5wcm90b3R5cGUsIHByb3BlcnR5LCB7XG4gICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdW3Byb3BlcnR5XSA9IHZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJldHVybi1hc3NpZ25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudE5hbWVzXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFttYXBdXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgY2xlYXIgYWxsIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlRXZlbnRzOiBmdW5jdGlvbih2aWV3LCBlbGVtZW50LCBldmVudE5hbWVzLCBtYXApIHtcbiAgICAgICAgICBtYXAgPSBtYXAgfHwgZnVuY3Rpb24oZGV0YWlsKSB7IHJldHVybiBkZXRhaWw7IH07XG4gICAgICAgICAgZXZlbnROYW1lcyA9IFtdLmNvbmNhdChldmVudE5hbWVzKTtcbiAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZnVuY3Rpb24oZXZlbnROYW1lKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICBtYXAoZXZlbnQuZGV0YWlsIHx8IHt9KTtcbiAgICAgICAgICAgICAgdmlldy5lbWl0KGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZnVuY3Rpb24oZXZlbnROYW1lLCBpbmRleCkge1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lcnNbaW5kZXhdLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZpZXcgPSBlbGVtZW50ID0gbGlzdGVuZXJzID0gbWFwID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNFbmFibGVkQXV0b1N0YXR1c0JhckZpbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhISRvbnNHbG9iYWwuX2NvbmZpZy5hdXRvU3RhdHVzQmFyRmlsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHNob3VsZEZpbGxTdGF0dXNCYXI6ICRvbnNHbG9iYWwuc2hvdWxkRmlsbFN0YXR1c0JhcixcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBhdXRvU3RhdHVzQmFyRmlsbDogJG9uc0dsb2JhbC5hdXRvU3RhdHVzQmFyRmlsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRpcmVjdGl2ZVxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYWdlRWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKi9cbiAgICAgICAgY29tcGlsZUFuZExpbms6IGZ1bmN0aW9uKHZpZXcsIHBhZ2VFbGVtZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgIGNvbnN0IGxpbmsgPSAkY29tcGlsZShwYWdlRWxlbWVudCk7XG4gICAgICAgICAgY29uc3QgcGFnZVNjb3BlID0gdmlldy5fc2NvcGUuJG5ldygpO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogT3ZlcndyaXRlIHBhZ2Ugc2NvcGUuXG4gICAgICAgICAgICovXG4gICAgICAgICAgYW5ndWxhci5lbGVtZW50KHBhZ2VFbGVtZW50KS5kYXRhKCdfc2NvcGUnLCBwYWdlU2NvcGUpO1xuXG4gICAgICAgICAgcGFnZVNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhwYWdlRWxlbWVudCk7IC8vIEF0dGFjaCBhbmQgcHJlcGFyZVxuICAgICAgICAgICAgbGluayhwYWdlU2NvcGUpOyAvLyBSdW4gdGhlIGNvbnRyb2xsZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBwYWdlTG9hZGVyXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVQYWdlTG9hZGVyOiBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cub25zLlBhZ2VMb2FkZXIoXG4gICAgICAgICAgICAoe3BhZ2UsIHBhcmVudH0sIGRvbmUpID0+IHtcbiAgICAgICAgICAgICAgd2luZG93Lm9ucy5faW50ZXJuYWwuZ2V0UGFnZUhUTUxBc3luYyhwYWdlKS50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZUFuZExpbmsoXG4gICAgICAgICAgICAgICAgICB2aWV3LFxuICAgICAgICAgICAgICAgICAgd2luZG93Lm9ucy5fdXRpbC5jcmVhdGVFbGVtZW50KGh0bWwudHJpbSgpKSxcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPT4gZG9uZShwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuX2Rlc3Ryb3koKTtcbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKCdfc2NvcGUnKSkge1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge1Njb3BlfSBbcGFyYW1zLnNjb3BlXVxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gW3BhcmFtcy5lbGVtZW50XVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zLmVsZW1lbnRzXVxuICAgICAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IFtwYXJhbXMuYXR0cnNdXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhckNvbXBvbmVudDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5zY29wZSkge1xuICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95U2NvcGUocGFyYW1zLnNjb3BlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmF0dHJzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lBdHRyaWJ1dGVzKHBhcmFtcy5hdHRycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5lbGVtZW50KSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lFbGVtZW50KHBhcmFtcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmaW5kRWxlbWVudGVPYmplY3Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5pbmhlcml0ZWREYXRhKG5hbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UGFnZUhUTUxBc3luYzogZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgIHZhciBjYWNoZSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChwYWdlKTtcblxuICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0eXBlb2YgY2FjaGUgPT09ICdzdHJpbmcnID8gY2FjaGUgOiBjYWNoZVsxXTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5ub3JtYWxpemVQYWdlSFRNTChodG1sKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgIHVybDogcGFnZSxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB2YXIgaHRtbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplUGFnZUhUTUwoaHRtbCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbm9ybWFsaXplUGFnZUhUTUw6IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBodG1sID0gKCcnICsgaHRtbCkudHJpbSgpO1xuXG4gICAgICAgICAgaWYgKCFodG1sLm1hdGNoKC9ePG9ucy1wYWdlLykpIHtcbiAgICAgICAgICAgIGh0bWwgPSAnPG9ucy1wYWdlIF9tdXRlZD4nICsgaHRtbCArICc8L29ucy1wYWdlPic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBtb2RpZmllciB0ZW1wbGF0ZXIgZnVuY3Rpb24uIFRoZSBtb2RpZmllciB0ZW1wbGF0ZXIgZ2VuZXJhdGUgY3NzIGNsYXNzZXMgYm91bmQgbW9kaWZpZXIgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFttb2RpZmllcnNdIGFuIGFycmF5IG9mIGFwcGVuZGl4IG1vZGlmaWVyXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2VuZXJhdGVNb2RpZmllclRlbXBsYXRlcjogZnVuY3Rpb24oYXR0cnMsIG1vZGlmaWVycykge1xuICAgICAgICAgIHZhciBhdHRyTW9kaWZpZXJzID0gYXR0cnMgJiYgdHlwZW9mIGF0dHJzLm1vZGlmaWVyID09PSAnc3RyaW5nJyA/IGF0dHJzLm1vZGlmaWVyLnRyaW0oKS5zcGxpdCgvICsvKSA6IFtdO1xuICAgICAgICAgIG1vZGlmaWVycyA9IGFuZ3VsYXIuaXNBcnJheShtb2RpZmllcnMpID8gYXR0ck1vZGlmaWVycy5jb25jYXQobW9kaWZpZXJzKSA6IGF0dHJNb2RpZmllcnM7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlIGVnLiAnb25zLWJ1dHRvbi0tKicsICdvbnMtYnV0dG9uLS0qX19pdGVtJ1xuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RpZmllcnMubWFwKGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSkuam9pbignICcpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtb2RpZmllciBtZXRob2RzIHRvIHZpZXcgb2JqZWN0IGZvciBjdXN0b20gZWxlbWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHM6IGZ1bmN0aW9uKHZpZXcsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGhhc01vZGlmaWVyOiBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgdmFyIHRva2VucyA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpO1xuICAgICAgICAgICAgICBuZWVkbGUgPSB0eXBlb2YgbmVlZGxlID09PSAnc3RyaW5nJyA/IG5lZWRsZS50cmltKCkgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gTW9kaWZpZXJVdGlsLnNwbGl0KG5lZWRsZSkuc29tZShmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLmluZGV4T2YobmVlZGxlKSAhPSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVNb2RpZmllcjogZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IHR5cGVvZiBuZWVkbGUgPT09ICdzdHJpbmcnID8gbmVlZGxlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgICAgIHZhciBtb2RpZmllciA9IE1vZGlmaWVyVXRpbC5zcGxpdChlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykpLmZpbHRlcihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiAhPT0gbmVlZGxlO1xuICAgICAgICAgICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFkZE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgZWxlbWVudC5hdHRyKCdtb2RpZmllcicpICsgJyAnICsgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0TW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzTW9kaWZpZXIobW9kaWZpZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgdmlld1ttZXRob2RdID0gbWV0aG9kc1ttZXRob2RdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1vZGlmaWVyIG1ldGhvZHMgdG8gdmlldyBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGFkZE1vZGlmaWVyTWV0aG9kczogZnVuY3Rpb24odmlldywgdGVtcGxhdGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgX3RyID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcqJywgbW9kaWZpZXIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZm5zID0ge1xuICAgICAgICAgICAgaGFzTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50Lmhhc0NsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuYXR0cignY2xhc3MnKS5zcGxpdCgvXFxzKy8pLFxuICAgICAgICAgICAgICAgICAgcGF0dCA9IHRlbXBsYXRlLnJlcGxhY2UoJyonLCAnLicpO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjbHMgPSBjbGFzc2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNscy5tYXRjaChwYXR0KSkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNscyA9IF90cihtb2RpZmllcik7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKGNscykpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNscyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbihvbGRGbiwgbmV3Rm4pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB8fCBuZXdGbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld0ZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gYXBwZW5kKHZpZXcuaGFzTW9kaWZpZXIsIGZucy5oYXNNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5yZW1vdmVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnJlbW92ZU1vZGlmaWVyLCBmbnMucmVtb3ZlTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcuYWRkTW9kaWZpZXIgPSBhcHBlbmQodmlldy5hZGRNb2RpZmllciwgZm5zLmFkZE1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnNldE1vZGlmaWVyID0gYXBwZW5kKHZpZXcuc2V0TW9kaWZpZXIsIGZucy5zZXRNb2RpZmllcik7XG4gICAgICAgICAgdmlldy50b2dnbGVNb2RpZmllciA9IGFwcGVuZCh2aWV3LnRvZ2dsZU1vZGlmaWVyLCBmbnMudG9nZ2xlTW9kaWZpZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbW9kaWZpZXIgbWV0aG9kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVNb2RpZmllck1ldGhvZHM6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgICB2aWV3Lmhhc01vZGlmaWVyID0gdmlldy5yZW1vdmVNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LmFkZE1vZGlmaWVyID0gdmlldy5zZXRNb2RpZmllciA9XG4gICAgICAgICAgICB2aWV3LnRvZ2dsZU1vZGlmaWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlIGFzICd2YXInIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZGVjbGFyZVZhckF0dHJpYnV0ZTogZnVuY3Rpb24oYXR0cnMsIG9iamVjdCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXR0cnMudmFyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHZhck5hbWUgPSBhdHRycy52YXI7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVWYXIodmFyTmFtZSwgb2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlZ2lzdGVyRXZlbnRIYW5kbGVyOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZSkge1xuICAgICAgICAgIHZhciBjYXBpdGFsaXplZEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGV2ZW50TmFtZS5zbGljZSgxKTtcblxuICAgICAgICAgIGNvbXBvbmVudC5vbihldmVudE5hbWUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGNvbXBvbmVudC5fZWxlbWVudFswXSwgZXZlbnROYW1lLCBldmVudCAmJiBldmVudC5kZXRhaWwpO1xuXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGNvbXBvbmVudC5fYXR0cnNbJ29ucycgKyBjYXBpdGFsaXplZEV2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICBjb21wb25lbnQuX3Njb3BlLiRldmFsKGhhbmRsZXIsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVycyBmb3IgYXR0cmlidXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbihjb21wb25lbnQsIGV2ZW50TmFtZXMpIHtcbiAgICAgICAgICBldmVudE5hbWVzID0gZXZlbnROYW1lcy50cmltKCkuc3BsaXQoL1xccysvKTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnROYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudE5hbWVzW2ldO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudEhhbmRsZXIoY29tcG9uZW50LCBldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzQW5kcm9pZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2FuZHJvaWQvaSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpcGFkfGlwaG9uZXxpcG9kIHRvdWNoKS9pKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzV2ViVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5vbnMuaXNXZWJWaWV3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzdhYm92ZTogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCB0b3VjaCk7LipDUFUuKk9TIChcXGQrKV8oXFxkKykvaSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gbWF0Y2ggPyBwYXJzZUZsb2F0KG1hdGNoWzJdICsgJy4nICsgbWF0Y2hbM10pID49IDcgOiBmYWxzZTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZSBhIG5hbWVkIGV2ZW50IGZvciBhIGNvbXBvbmVudC4gVGhlIHZpZXcgb2JqZWN0LCBpZiBpdCBleGlzdHMsIGlzIGF0dGFjaGVkIHRvIGV2ZW50LmNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2RvbV1cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpcmVDb21wb25lbnRFdmVudDogZnVuY3Rpb24oZG9tLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBldmVudFtrZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LmNvbXBvbmVudCA9IGRvbSA/XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9tKS5kYXRhKGRvbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgICBldmVudC5pbml0RXZlbnQoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnOicgKyBldmVudE5hbWUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgZG9tLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmUgYSB2YXJpYWJsZSB0byBKYXZhU2NyaXB0IGdsb2JhbCBzY29wZSBhbmQgQW5ndWxhckpTIHNjb3BlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vJywgJ2Zvby12YWx1ZScpO1xuICAgICAgICAgKiAvLyA9PiB3aW5kb3cuZm9vIGFuZCAkc2NvcGUuZm9vIGlzIG5vdyAnZm9vLXZhbHVlJ1xuICAgICAgICAgKlxuICAgICAgICAgKiBVdGlsLmRlZmluZVZhcignZm9vLmJhcicsICdmb28tYmFyLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28uYmFyIGFuZCAkc2NvcGUuZm9vLmJhciBpcyBub3cgJ2Zvby1iYXItdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZpbmVWYXI6IGZ1bmN0aW9uKG5hbWUsIG9iamVjdCkge1xuICAgICAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoL1xcLi8pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0KGNvbnRhaW5lciwgbmFtZXMsIG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZV0gPT09IHVuZGVmaW5lZCB8fCBjb250YWluZXJbbmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJbbmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGlmIChjb250YWluZXJbbmFtZXNbbmFtZXMubGVuZ3RoIC0gMV1dICE9PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHZhcj1cIicgKyBvYmplY3QuX2F0dHJzLnZhciArICdcIiBiZWNhdXNlIGl0IHdpbGwgb3ZlcndyaXRlIGEgcmVhZC1vbmx5IHZhcmlhYmxlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvbnMuY29tcG9uZW50QmFzZSkge1xuICAgICAgICAgICAgc2V0KG9ucy5jb21wb25lbnRCYXNlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBdHRhY2ggdG8gYW5jZXN0b3Igd2l0aCBvbnMtc2NvcGUgYXR0cmlidXRlLlxuICAgICAgICAgIHZhciBlbGVtZW50ID0gb2JqZWN0Ll9lbGVtZW50WzBdO1xuXG4gICAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdvbnMtc2NvcGUnKSkge1xuICAgICAgICAgICAgICBzZXQoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAvLyBJZiBubyBvbnMtc2NvcGUgZWxlbWVudCB3YXMgZm91bmQsIGF0dGFjaCB0byAkcm9vdFNjb3BlLlxuICAgICAgICAgIHNldCgkcm9vdFNjb3BlLCBuYW1lcywgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtYWN0aW9uLXNoZWV0XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBhY3Rpb24gc2hlZXQuWy9lbl1cbiAqICBbamFd44GT44Gu44Ki44Kv44K344On44Oz44K344O844OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GXbGlzdGVuZXLjg5Hjg6njg6Hjg7zjgr/jgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgIHjgZ3jga7jgqTjg5njg7Pjg4jjga7jg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBrumWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkua4oeOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIEFjdGlvbiBzaGVldCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FjdGlvblNoZWV0JywgZnVuY3Rpb24oJG9uc2VuLCBBY3Rpb25TaGVldFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgYWN0aW9uU2hlZXQgPSBuZXcgQWN0aW9uU2hlZXRWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBhY3Rpb25TaGVldCk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGFjdGlvblNoZWV0LCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhhY3Rpb25TaGVldCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFjdGlvbi1zaGVldCcsIGFjdGlvblNoZWV0KTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBhY3Rpb25TaGVldC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGFjdGlvblNoZWV0KTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWN0aW9uLXNoZWV0JywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtYWxlcnQtZGlhbG9nXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBhbGVydCBkaWFsb2cuWy9lbl1cbiAqICBbamFd44GT44Gu44Ki44Op44O844OI44OA44Kk44Ki44Ot44Kw44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GXbGlzdGVuZXLjg5Hjg6njg6Hjg7zjgr/jgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgIHjgZ3jga7jgqTjg5njg7Pjg4jjga7jg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBrumWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkua4oeOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIEFsZXJ0IGRpYWxvZyBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FsZXJ0RGlhbG9nJywgZnVuY3Rpb24oJG9uc2VuLCBBbGVydERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgYWxlcnREaWFsb2cgPSBuZXcgQWxlcnREaWFsb2dWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBhbGVydERpYWxvZyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGFsZXJ0RGlhbG9nLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhhbGVydERpYWxvZywgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFsZXJ0LWRpYWxvZycsIGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGFsZXJ0RGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hbGVydC1kaWFsb2cnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC52YWx1ZSgnQWxlcnREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuQWxlcnREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdBbmRyb2lkQWxlcnREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuQW5kcm9pZEFsZXJ0RGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnSU9TQWxlcnREaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuSU9TQWxlcnREaWFsb2dBbmltYXRvcik7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKS52YWx1ZSgnQW5pbWF0aW9uQ2hvb3NlcicsIG9ucy5faW50ZXJuYWwuQW5pbWF0b3JGYWN0b3J5KTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWNhcm91c2VsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUNhcm91c2VsIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFd44Kr44Or44O844K744Or44KS6KGo56S644Gn44GN44KL44Kz44Oz44Od44O844ON44Oz44OI44CCWy9qYV1cbiAqIEBjb2RlcGVuIHhiYnpPUVxuICogQGd1aWRlIFVzaW5nQ2Fyb3VzZWxcbiAqICAgW2VuXUxlYXJuIGhvdyB0byB1c2UgdGhlIGNhcm91c2VsIGNvbXBvbmVudC5bL2VuXVxuICogICBbamFdY2Fyb3VzZWzjgrPjg7Pjg53jg7zjg43jg7Pjg4jjga7kvb/jgYTmlrlbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtY2Fyb3VzZWwgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAyMDBweFwiPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgPG9ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgLi4uXG4gKiAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiA8L29ucy1jYXJvdXNlbD5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBjYXJvdXNlbC5bL2VuXVxuICogICBbamFd44GT44Gu44Kr44Or44O844K744Or44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5aSJ5pWw5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1yZWZyZXNoXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJyZWZyZXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWZyZXNoXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtb3ZlcnNjcm9sbFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwib3ZlcnNjcm9sbFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwib3ZlcnNjcm9sbFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0Nhcm91c2VsJywgZnVuY3Rpb24oJG9uc2VuLCBDYXJvdXNlbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGNhcm91c2VsID0gbmV3IENhcm91c2VsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtY2Fyb3VzZWwnLCBjYXJvdXNlbCk7XG5cbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGNhcm91c2VsLCAncG9zdGNoYW5nZSByZWZyZXNoIG92ZXJzY3JvbGwgZGVzdHJveScpO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBjYXJvdXNlbCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYXJvdXNlbC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtY2Fyb3VzZWwnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWxJdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLiRsYXN0KSB7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwKCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NldHVwSW5pdGlhbEluZGV4KCk7XG4gICAgICAgICAgICBlbGVtZW50WzBdLnBhcmVudEVsZW1lbnQuX3NhdmVMYXN0U3RhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNEaWFsb2cnLCBmdW5jdGlvbigkb25zZW4sIERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBkaWFsb2cgPSBuZXcgRGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGRpYWxvZyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGRpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoZGlhbG9nLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgZGlhbG9nKTtcbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoZGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ0RpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5EaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdJT1NEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuSU9TRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnQW5kcm9pZERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbmRyb2lkRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnU2xpZGVEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuU2xpZGVEaWFsb2dBbmltYXRvcik7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1mYWJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhlIGZsb2F0aW5nIGFjdGlvbiBidXR0b24uWy9lbl1cbiAqICAgW2phXeOBk+OBruODleODreODvOODhuOCo+ODs+OCsOOCouOCr+OCt+ODp+ODs+ODnOOCv+ODs+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuOBl+OBpuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0ZhYicsIGZ1bmN0aW9uKCRvbnNlbiwgRmFiVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGZhYiA9IG5ldyBGYWJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCBmYWIpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGZhYik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBHZW5lcmljVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGl2ZU9ubHkpIHtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzKHRoaXMsIG9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSwgZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRoaXMsIGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzZWxmKTtcblxuICAgICAgICAgIGlmIChvcHRpb25zLm9uRGVzdHJveSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3koc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNlbGYgPSBlbGVtZW50ID0gc2VsZi5fZWxlbWVudCA9IHNlbGYuX3Njb3BlID0gc2NvcGUgPSBzZWxmLl9hdHRycyA9IGF0dHJzID0gb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnZpZXdLZXlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAqL1xuICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyID0gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMudmlld0tleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMudmlld0tleSBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cblxuICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgdmlldyk7XG5cbiAgICAgIHZhciBkZXN0cm95ID0gb3B0aW9ucy5vbkRlc3Ryb3kgfHwgYW5ndWxhci5ub29wO1xuICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgIGRlc3Ryb3kodmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIG51bGwpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oR2VuZXJpY1ZpZXcpO1xuXG4gICAgcmV0dXJuIEdlbmVyaWNWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sYXp5LXJlcGVhdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBVc2luZyB0aGlzIGNvbXBvbmVudCBhIGxpc3Qgd2l0aCBtaWxsaW9ucyBvZiBpdGVtcyBjYW4gYmUgcmVuZGVyZWQgd2l0aG91dCBhIGRyb3AgaW4gcGVyZm9ybWFuY2UuXG4gKiAgICAgSXQgZG9lcyB0aGF0IGJ5IFwibGF6aWx5XCIgbG9hZGluZyBlbGVtZW50cyBpbnRvIHRoZSBET00gd2hlbiB0aGV5IGNvbWUgaW50byB2aWV3IGFuZFxuICogICAgIHJlbW92aW5nIGl0ZW1zIGZyb20gdGhlIERPTSB3aGVuIHRoZXkgYXJlIG5vdCB2aXNpYmxlLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI5YaF44Gn5o+P55S744GV44KM44KL44Ki44Kk44OG44Og44GuRE9N6KaB57Sg44Gu6Kqt44G/6L6844G/44Gv44CB55S76Z2i44Gr6KaL44GI44Gd44GG44Gr44Gq44Gj44Gf5pmC44G+44Gn6Ieq5YuV55qE44Gr6YGF5bu244GV44KM44CBXG4gKiAgICAg55S76Z2i44GL44KJ6KaL44GI44Gq44GP44Gq44Gj44Gf5aC05ZCI44Gr44Gv44Gd44Gu6KaB57Sg44Gv5YuV55qE44Gr44Ki44Oz44Ot44O844OJ44GV44KM44G+44GZ44CCXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5L2/44GG44GT44Go44Gn44CB44OR44OV44Kp44O844Oe44Oz44K544KS5Yqj5YyW44GV44Gb44KL44GT44Go54Sh44GX44Gr5beo5aSn44Gq5pWw44Gu6KaB57Sg44KS5o+P55S744Gn44GN44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAY29kZXBlbiBRd3JHQm1cbiAqIEBndWlkZSBVc2luZ0xhenlSZXBlYXRcbiAqICAgW2VuXUhvdyB0byB1c2UgTGF6eSBSZXBlYXRbL2VuXVxuICogICBbamFd44Os44Kk44K444O844Oq44OU44O844OI44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAqICAgICAkc2NvcGUuTXlEZWxlZ2F0ZSA9IHtcbiAqICAgICAgIGNvdW50SXRlbXM6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAvLyBSZXR1cm4gbnVtYmVyIG9mIGl0ZW1zLlxuICogICAgICAgICByZXR1cm4gMTAwMDAwMDtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY2FsY3VsYXRlSXRlbUhlaWdodDogZnVuY3Rpb24oaW5kZXgpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIHRoZSBoZWlnaHQgb2YgYW4gaXRlbSBpbiBwaXhlbHMuXG4gKiAgICAgICAgIHJldHVybiA0NTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY29uZmlndXJlSXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIEluaXRpYWxpemUgc2NvcGVcbiAqICAgICAgICAgaXRlbVNjb3BlLml0ZW0gPSAnSXRlbSAjJyArIChpbmRleCArIDEpO1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBkZXN0cm95SXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIE9wdGlvbmFsIG1ldGhvZCB0aGF0IGlzIGNhbGxlZCB3aGVuIGFuIGl0ZW0gaXMgdW5sb2FkZWQuXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCdEZXN0cm95ZWQgaXRlbSB3aXRoIGluZGV4OiAnICsgaW5kZXgpO1xuICogICAgICAgfVxuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1saXN0IG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLWxhenktcmVwZWF0PVwiTXlEZWxlZ2F0ZVwiPlxuICogICAgIHt7IGl0ZW0gfX1cbiAqICAgPC9vbnMtbGlzdC1pdGVtPlxuICogPC9vbnMtbGlzdD5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWxhenktcmVwZWF0XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUEgZGVsZWdhdGUgb2JqZWN0LCBjYW4gYmUgZWl0aGVyIGFuIG9iamVjdCBhdHRhY2hlZCB0byB0aGUgc2NvcGUgKHdoZW4gdXNpbmcgQW5ndWxhckpTKSBvciBhIG5vcm1hbCBKYXZhU2NyaXB0IHZhcmlhYmxlLlsvZW5dXG4gKiAgW2phXeimgee0oOOBruODreODvOODieOAgeOCouODs+ODreODvOODieOBquOBqeOBruWHpueQhuOCkuWnlOitsuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAgkFuZ3VsYXJKU+OBruOCueOCs+ODvOODl+OBruWkieaVsOWQjeOChOOAgemAmuW4uOOBrkphdmFTY3JpcHTjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQHByb3BlcnR5IGRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GdW5jdGlvbiB3aGljaCByZWNpZXZlcyBhbiBpbmRleCBhbmQgdGhlIHNjb3BlIGZvciB0aGUgaXRlbS4gQ2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHZhbHVlcyBpbiB0aGUgaXRlbSBzY29wZS5bL2VuXVxuICogICBbamFdWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIExhenkgcmVwZWF0IGRpcmVjdGl2ZS5cbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0xhenlSZXBlYXQnLCBmdW5jdGlvbigkb25zZW4sIExhenlSZXBlYXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgdGVybWluYWw6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgbGF6eVJlcGVhdCA9IG5ldyBMYXp5UmVwZWF0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBsYXp5UmVwZWF0ID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZScsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG5cbiAgICBjb25zdCBkaXJlY3RpdmVBdHRyaWJ1dGVzID0gWydvbnMtbGF6eS1yZXBlYXQnLCAnb25zOmxhenk6cmVwZWF0JywgJ29uc19sYXp5X3JlcGVhdCcsICdkYXRhLW9ucy1sYXp5LXJlcGVhdCcsICd4LW9ucy1sYXp5LXJlcGVhdCddO1xuICAgIGNsYXNzIEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUgZXh0ZW5kcyBvbnMuX2ludGVybmFsLkxhenlSZXBlYXREZWxlZ2F0ZSB7XG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyRGVsZWdhdGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGVtcGxhdGVFbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge1Njb3BlfSBwYXJlbnRTY29wZVxuICAgICAgICovXG4gICAgICBjb25zdHJ1Y3Rvcih1c2VyRGVsZWdhdGUsIHRlbXBsYXRlRWxlbWVudCwgcGFyZW50U2NvcGUpIHtcbiAgICAgICAgc3VwZXIodXNlckRlbGVnYXRlLCB0ZW1wbGF0ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9wYXJlbnRTY29wZSA9IHBhcmVudFNjb3BlO1xuXG4gICAgICAgIGRpcmVjdGl2ZUF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyID0+IHRlbXBsYXRlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpO1xuICAgICAgICB0aGlzLl9saW5rZXIgPSAkY29tcGlsZSh0ZW1wbGF0ZUVsZW1lbnQgPyB0ZW1wbGF0ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIDogbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZShpdGVtLCBzY29wZSl7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKGl0ZW0sIHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkZXN0cm95SXRlbVNjb3BlKGl0ZW0sIGVsZW1lbnQpe1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmRlc3Ryb3lJdGVtU2NvcGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VzZXJEZWxlZ2F0ZS5kZXN0cm95SXRlbVNjb3BlKGl0ZW0sIGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF91c2luZ0JpbmRpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbGF6eS1yZXBlYXRgIGRlbGVnYXRlIG9iamVjdCBpcyB2YWd1ZS4nKTtcbiAgICAgIH1cblxuICAgICAgbG9hZEl0ZW1FbGVtZW50KGluZGV4LCBkb25lKSB7XG4gICAgICAgIHRoaXMuX3ByZXBhcmVJdGVtRWxlbWVudChpbmRleCwgKHtlbGVtZW50LCBzY29wZX0pID0+IHtcbiAgICAgICAgICBkb25lKHtlbGVtZW50LCBzY29wZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgX3ByZXBhcmVJdGVtRWxlbWVudChpbmRleCwgZG9uZSkge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuX3BhcmVudFNjb3BlLiRuZXcoKTtcbiAgICAgICAgdGhpcy5fYWRkU3BlY2lhbFByb3BlcnRpZXMoaW5kZXgsIHNjb3BlKTtcblxuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgc2NvcGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGlua2VyKHNjb3BlLCAoY2xvbmVkKSA9PiB7XG4gICAgICAgICAgbGV0IGVsZW1lbnQgPSBjbG9uZWRbMF07XG4gICAgICAgICAgaWYgKCF0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuX3VzZXJEZWxlZ2F0ZS5jcmVhdGVJdGVtQ29udGVudChpbmRleCwgZWxlbWVudCk7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KShzY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9uZSh7ZWxlbWVudCwgc2NvcGV9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqL1xuICAgICAgX2FkZFNwZWNpYWxQcm9wZXJ0aWVzKGksIHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmNvdW50SXRlbXMoKSAtIDE7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHNjb3BlLCB7XG4gICAgICAgICAgJGluZGV4OiBpLFxuICAgICAgICAgICRmaXJzdDogaSA9PT0gMCxcbiAgICAgICAgICAkbGFzdDogaSA9PT0gbGFzdCxcbiAgICAgICAgICAkbWlkZGxlOiBpICE9PSAwICYmIGkgIT09IGxhc3QsXG4gICAgICAgICAgJGV2ZW46IGkgJSAyID09PSAwLFxuICAgICAgICAgICRvZGQ6IGkgJSAyID09PSAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIGl0ZW0uc2NvcGUuJGV2YWxBc3luYygoKSA9PiB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0uc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gaXRlbS5lbGVtZW50XG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3lJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuZGVzdHJveUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIuZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0uZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5zY29wZS4kZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBkZXN0cm95KCkge1xuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlO1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1tb2RhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG1vZGFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg6Ljg7zjg4Djg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBNb2RhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc01vZGFsJywgZnVuY3Rpb24oJG9uc2VuLCBNb2RhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogKGVsZW1lbnQsIGF0dHJzKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKG1vZGFsLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIG1vZGFsKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgbW9kYWwpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMobW9kYWwpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIG1vZGFsID0gZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLW5hdmlnYXRvclxuICogQGV4YW1wbGVcbiAqIDxvbnMtbmF2aWdhdG9yIGFuaW1hdGlvbj1cInNsaWRlXCIgdmFyPVwiYXBwLm5hdmlcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wdXNoUGFnZSgncGFnZS5odG1sJyk7XCI+UHVzaDwvb25zLWJ1dHRvbj5cbiAqICAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy1uYXZpZ2F0b3I+XG4gKlxuICogPG9ucy10ZW1wbGF0ZSBpZD1cInBhZ2UuaHRtbFwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICAgPG9ucy10b29sYmFyPlxuICogICAgICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlRpdGxlPC9kaXY+XG4gKiAgICAgPC9vbnMtdG9vbGJhcj5cbiAqXG4gKiAgICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgIDxvbnMtYnV0dG9uIG1vZGlmaWVyPVwibGlnaHRcIiBuZy1jbGljaz1cImFwcC5uYXZpLnBvcFBhZ2UoKTtcIj5Qb3A8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBuYXZpZ2F0b3IuWy9lbl1cbiAqICBbamFd44GT44Gu44OK44OT44Ky44O844K/44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXB1c2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXBvcFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlcG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cHVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3Rwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3Rwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3Rwb3BcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5OYXZpZ2F0b3JFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtbmF2aWdhdG9yJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc05hdmlnYXRvcicsIGZ1bmN0aW9uKE5hdmlnYXRvclZpZXcsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgTmF2aWdhdG9yVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdwcmVwdXNoIHByZXBvcCBwb3N0cHVzaCBwb3N0cG9wIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbmF2aWdhdG9yJywgdmlldyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbmF2aWdhdG9yJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLk5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdGYWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5GYWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ0lPU1NsaWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NTbGlkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdMaWZ0VHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5MaWZ0TmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ051bGxUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLk5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdTaW1wbGVTbGlkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuU2ltcGxlU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcGFnZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHBhZ2UuWy9lbl1cbiAqICAgW2phXeOBk+OBruODmuODvOOCuOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWluZmluaXRlLXNjcm9sbFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1QYXRoIG9mIHRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiBpbmZpbml0ZSBzY3JvbGxpbmcuIFRoZSBwYXRoIGlzIHJlbGF0aXZlIHRvICRzY29wZS4gVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIGEgZG9uZSBjYWxsYmFjayB0aGF0IG11c3QgYmUgY2FsbGVkIHdoZW4gaXQncyBmaW5pc2hlZC5bL2VuXVxuICogICBbamFdWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb24tZGV2aWNlLWJhY2stYnV0dG9uXG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkLlsvZW5dXG4gKiAgIFtqYV3jg4fjg5DjgqTjgrnjga7jg5Djg4Pjgq/jg5zjgr/jg7PjgYzmirzjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLoqK3lrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1kZXZpY2UtYmFjay1idXR0b25cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2l0aCBhbiBBbmd1bGFySlMgZXhwcmVzc2lvbiB3aGVuIHRoZSBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkLlsvZW5dXG4gKiAgIFtqYV3jg4fjg5DjgqTjgrnjga7jg5Djg4Pjgq/jg5zjgr/jg7PjgYzmirzjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLoqK3lrprjgafjgY3jgb7jgZnjgIJBbmd1bGFySlPjga5leHByZXNzaW9u44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWluaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1BhZ2UnLCBmdW5jdGlvbigkb25zZW4sIFBhZ2VWaWV3KSB7XG5cbiAgICBmdW5jdGlvbiBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgZGlydHkgZml4XG4gICAgICB2YXIgaSA9IDAsIGYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGkrKyA8IDE1KSAge1xuICAgICAgICAgIGlmIChpc0F0dGFjaGVkKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnQsICdpbml0Jyk7XG4gICAgICAgICAgICBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGkgPiAxMCkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBmaXJlIFwicGFnZWluaXRcIiBldmVudC4gQXR0YWNoIFwib25zLXBhZ2VcIiBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBhZnRlciBpbml0aWFsaXphdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50KGVsZW1lbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldmVudC5pbml0RXZlbnQoJ3BhZ2Vpbml0JywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXR0YWNoZWQoZWxlbWVudCkge1xuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgPyBpc0F0dGFjaGVkKGVsZW1lbnQucGFyZW50Tm9kZSkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBuZXcgUGFnZVZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwYWdlLCAnaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgcGFnZSk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocGFnZSwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwYWdlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocGFnZSk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBhZ2UnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGZpcmVQYWdlSW5pdEV2ZW50KGVsZW1lbnRbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wb3BvdmVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBwb3BvdmVyLlsvZW5dXG4gKiAgW2phXeOBk+OBruODneODg+ODl+OCquODvOODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNQb3BvdmVyJywgZnVuY3Rpb24oJG9uc2VuLCBQb3BvdmVyVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgICAgdmFyIHBvcG92ZXIgPSBuZXcgUG9wb3ZlclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBvcG92ZXIpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwb3BvdmVyLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhwb3BvdmVyLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcG9wb3ZlcicsIHBvcG92ZXIpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHBvcG92ZXIuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhwb3BvdmVyKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcG9wb3ZlcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcblxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdQb3BvdmVyQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlBvcG92ZXJBbmltYXRvcilcbiAgLnZhbHVlKCdGYWRlUG9wb3ZlckFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5GYWRlUG9wb3ZlckFuaW1hdG9yKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXB1bGwtaG9va1xuICogQGV4YW1wbGVcbiAqIDxzY3JpcHQ+XG4gKiAgIG9ucy5ib290c3RyYXAoKVxuICpcbiAqICAgLmNvbnRyb2xsZXIoJ015Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQpIHtcbiAqICAgICAkc2NvcGUuaXRlbXMgPSBbMywgMiAsMV07XG4gKlxuICogICAgICRzY29wZS5sb2FkID0gZnVuY3Rpb24oJGRvbmUpIHtcbiAqICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICogICAgICAgICAkc2NvcGUuaXRlbXMudW5zaGlmdCgkc2NvcGUuaXRlbXMubGVuZ3RoICsgMSk7XG4gKiAgICAgICAgICRkb25lKCk7XG4gKiAgICAgICB9LCAxMDAwKTtcbiAqICAgICB9O1xuICogICB9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxvbnMtcGFnZSBuZy1jb250cm9sbGVyPVwiTXlDb250cm9sbGVyXCI+XG4gKiAgIDxvbnMtcHVsbC1ob29rIHZhcj1cImxvYWRlclwiIG5nLWFjdGlvbj1cImxvYWQoJGRvbmUpXCI+XG4gKiAgICAgPHNwYW4gbmctc3dpdGNoPVwibG9hZGVyLnN0YXRlXCI+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cImluaXRpYWxcIj5QdWxsIGRvd24gdG8gcmVmcmVzaDwvc3Bhbj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwicHJlYWN0aW9uXCI+UmVsZWFzZSB0byByZWZyZXNoPC9zcGFuPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJhY3Rpb25cIj5Mb2FkaW5nIGRhdGEuIFBsZWFzZSB3YWl0Li4uPC9zcGFuPlxuICogICAgIDwvc3Bhbj5cbiAqICAgPC9vbnMtcHVsbC1ob29rPlxuICogICA8b25zLWxpc3Q+XG4gKiAgICAgPG9ucy1saXN0LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiBpdGVtc1wiPlxuICogICAgICAgSXRlbSAje3sgaXRlbSB9fVxuICogICAgIDwvb25zLWxpc3QtaXRlbT5cbiAqICAgPC9vbnMtbGlzdD5cbiAqIDwvb25zLXBhZ2U+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1hY3Rpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVVzZSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBwYWdlIGlzIHB1bGxlZCBkb3duLiBBIDxjb2RlPiRkb25lPC9jb2RlPiBmdW5jdGlvbiBpcyBhdmFpbGFibGUgdG8gdGVsbCB0aGUgY29tcG9uZW50IHRoYXQgdGhlIGFjdGlvbiBpcyBjb21wbGV0ZWQuWy9lbl1cbiAqICAgW2phXXB1bGwgZG93buOBl+OBn+OBqOOBjeOBruaMr+OCi+iInuOBhOOCkuaMh+WumuOBl+OBvuOBmeOAguOCouOCr+OCt+ODp+ODs+OBjOWujOS6huOBl+OBn+aZguOBq+OBrzxjb2RlPiRkb25lPC9jb2RlPumWouaVsOOCkuWRvOOBs+WHuuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1jaGFuZ2VzdGF0ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiY2hhbmdlc3RhdGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImNoYW5nZXN0YXRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBQdWxsIGhvb2sgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNQdWxsSG9vaycsIGZ1bmN0aW9uKCRvbnNlbiwgUHVsbEhvb2tWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgcHVsbEhvb2sgPSBuZXcgUHVsbEhvb2tWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwdWxsSG9vayk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHB1bGxIb29rLCAnY2hhbmdlc3RhdGUgZGVzdHJveScpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcHVsbC1ob29rJywgcHVsbEhvb2spO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHB1bGxIb29rLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXB1bGwtaG9vaycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGVlZC1kaWFsXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoZSBzcGVlZCBkaWFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5Tjg7zjg4njg4DjgqTjgqLjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLjgZfjgabjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwib3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwib3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NwZWVkRGlhbCcsIGZ1bmN0aW9uKCRvbnNlbiwgU3BlZWREaWFsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIHNwZWVkRGlhbCA9IG5ldyBTcGVlZERpYWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGVlZC1kaWFsJywgc3BlZWREaWFsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BlZWREaWFsLCAnb3BlbiBjbG9zZScpO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGVlZERpYWwpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BlZWREaWFsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGVlZC1kaWFsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJDb250ZW50JywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyQ29udGVudCA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLmxvYWQgPSB0aGlzLl9lbGVtZW50WzBdLmxvYWQuYmluZCh0aGlzLl9lbGVtZW50WzBdKTtcbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMubG9hZCA9IHRoaXMuX3BhZ2VTY29wZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyQ29udGVudCk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlckNvbnRlbnQsIFsncGFnZSddKTtcblxuICAgIHJldHVybiBTcGxpdHRlckNvbnRlbnQ7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlKSB7XG5cbiAgICB2YXIgU3BsaXR0ZXJTaWRlID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdvcGVuJywgJ2Nsb3NlJywgJ3RvZ2dsZScsICdsb2FkJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ21vZGVjaGFuZ2UnLCAncHJlb3BlbicsICdwcmVjbG9zZScsICdwb3N0b3BlbicsICdwb3N0Y2xvc2UnXG4gICAgICAgIF0sIGRldGFpbCA9PiBkZXRhaWwuc2lkZSA/IGFuZ3VsYXIuZXh0ZW5kKGRldGFpbCwge3NpZGU6IHRoaXN9KSA6IGRldGFpbCk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyU2lkZSk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlclNpZGUsIFsncGFnZScsICdtb2RlJywgJ2lzT3BlbiddKTtcblxuICAgIHJldHVybiBTcGxpdHRlclNpZGU7XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXQgdmlldy5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44OI44OT44Ol44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlcicsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlciwgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgc3BsaXR0ZXIgPSBuZXcgU3BsaXR0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGxpdHRlcik7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGxpdHRlciwgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyJywgc3BsaXR0ZXIpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BsaXR0ZXIuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zd2l0Y2hcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzd2l0Y2guWy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTd2l0Y2gnLCBmdW5jdGlvbigkb25zZW4sIFN3aXRjaFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5uZ0NvbnRyb2xsZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgZWxlbWVudCBjYW5cXCd0IGFjY2VwdCBuZy1jb250cm9sbGVyIGRpcmVjdGl2ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzd2l0Y2hWaWV3ID0gbmV3IFN3aXRjaFZpZXcoZWxlbWVudCwgc2NvcGUsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHN3aXRjaFZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzd2l0Y2hWaWV3KTtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgc3dpdGNoVmlldyk7XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzd2l0Y2hWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzd2l0Y2hWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zd2l0Y2gnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IGF0dHJzID0gc2NvcGUgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyTm9uZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJOb25lQW5pbWF0b3IpO1xuICBtb2R1bGUudmFsdWUoJ1RhYmJhckZhZGVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyRmFkZUFuaW1hdG9yKTtcbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJTbGlkZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJTbGlkZUFuaW1hdG9yKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnVGFiYmFyVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHZhciBUYWJiYXJWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdvbnMtdGFiYmFyJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJlbGVtZW50XCIgcGFyYW1ldGVyIG11c3QgYmUgYSBcIm9ucy10YWJiYXJcIiBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuX2xhc3RQYWdlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3RQYWdlU2NvcGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncmVhY3RpdmUnLCAncG9zdGNoYW5nZScsICdwcmVjaGFuZ2UnLCAnaW5pdCcsICdzaG93JywgJ2hpZGUnLCAnZGVzdHJveSdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3NldEFjdGl2ZVRhYicsXG4gICAgICAgICAgJ3NldFRhYmJhclZpc2liaWxpdHknLFxuICAgICAgICAgICdnZXRBY3RpdmVUYWJJbmRleCcsXG4gICAgICAgICAgJ2xvYWRQYWdlJ1xuICAgICAgICBdKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBNaWNyb0V2ZW50Lm1peGluKFRhYmJhclZpZXcpO1xuXG4gICAgVGFiYmFyVmlldy5yZWdpc3RlckFuaW1hdG9yID0gZnVuY3Rpb24obmFtZSwgQW5pbWF0b3IpIHtcbiAgICAgIHJldHVybiB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmVnaXN0ZXJBbmltYXRvcihuYW1lLCBBbmltYXRvcik7XG4gICAgfTtcblxuICAgIHJldHVybiBUYWJiYXJWaWV3O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvYXN0XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0b2FzdCBkaWFsb2cuWy9lbl1cbiAqICBbamFd44GT44Gu44OI44O844K544OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GXbGlzdGVuZXLjg5Hjg6njg6Hjg7zjgr/jgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgIHjgZ3jga7jgqTjg5njg7Pjg4jjga7jg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBrumWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkua4oeOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIFRvYXN0IGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVG9hc3QnLCBmdW5jdGlvbigkb25zZW4sIFRvYXN0Vmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0b2FzdCA9IG5ldyBUb2FzdFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRvYXN0KTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModG9hc3QsICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRvYXN0LCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9hc3QnLCB0b2FzdCk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB0b2FzdC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRvYXN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9hc3QnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FjdGlvblNoZWV0QnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtYWN0aW9uLXNoZWV0LWJ1dHRvbid9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0JhY2tCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCBHZW5lcmljVmlldywgQ29tcG9uZW50Q2xlYW5lcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIGJhY2tCdXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgICAgdmlld0tleTogJ29ucy1iYWNrLWJ1dHRvbidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYXR0cnMubmdDbGljaykge1xuICAgICAgICAgICAgICBlbGVtZW50WzBdLm9uQ2xpY2sgPSBhbmd1bGFyLm5vb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYmFja0J1dHRvbi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGJhY2tCdXR0b24pO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHNjb3BlKTtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhhdHRycyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0JvdHRvbVRvb2xiYXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICB2aWV3S2V5OiAnb25zLWJvdHRvbVRvb2xiYXInXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtYnV0dG9uXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0J1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgYnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgdmlld0tleTogJ29ucy1idXR0b24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShidXR0b24sICdkaXNhYmxlZCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdLmRpc2FibGVkO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9lbGVtZW50WzBdLmRpc2FibGVkID0gdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0NhcmQnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1jYXJkJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zRHVtbXlGb3JJbml0JywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgIHZhciBpc1JlYWR5ID0gZmFsc2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKCFpc1JlYWR5KSB7XG4gICAgICAgICAgICBpc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJG9ucy1yZWFkeScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgRVZFTlRTID1cbiAgICAoJ2RyYWcgZHJhZ2xlZnQgZHJhZ3JpZ2h0IGRyYWd1cCBkcmFnZG93biBob2xkIHJlbGVhc2Ugc3dpcGUgc3dpcGVsZWZ0IHN3aXBlcmlnaHQgJyArXG4gICAgICAnc3dpcGV1cCBzd2lwZWRvd24gdGFwIGRvdWJsZXRhcCB0b3VjaCB0cmFuc2Zvcm0gcGluY2ggcGluY2hpbiBwaW5jaG91dCByb3RhdGUnKS5zcGxpdCgvICsvKTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0dlc3R1cmVEZXRlY3RvcicsIGZ1bmN0aW9uKCRvbnNlbikge1xuXG4gICAgdmFyIHNjb3BlRGVmID0gRVZFTlRTLnJlZHVjZShmdW5jdGlvbihkaWN0LCBuYW1lKSB7XG4gICAgICBkaWN0WyduZycgKyB0aXRsaXplKG5hbWUpXSA9ICcmJztcbiAgICAgIHJldHVybiBkaWN0O1xuICAgIH0sIHt9KTtcblxuICAgIGZ1bmN0aW9uIHRpdGxpemUoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHNjb3BlRGVmLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgXywgdHJhbnNjbHVkZSkge1xuXG4gICAgICAgICAgdHJhbnNjbHVkZShzY29wZS4kcGFyZW50LCBmdW5jdGlvbihjbG9uZWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgYXR0ciA9ICduZycgKyB0aXRsaXplKGV2ZW50LnR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoYXR0ciBpbiBzY29wZURlZikge1xuICAgICAgICAgICAgICBzY29wZVthdHRyXSh7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZ2VzdHVyZURldGVjdG9yO1xuXG4gICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yID0gZWxlbWVudFswXS5fZ2VzdHVyZURldGVjdG9yO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLm9uKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vZmYoRVZFTlRTLmpvaW4oJyAnKSwgaGFuZGxlcik7XG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3IuZWxlbWVudCA9IHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtaWNvblxuICovXG5cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNJY29uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5pY29uLmluZGV4T2YoJ3t7JykgIT09IC0xKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2ljb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gZWxlbWVudFswXS5fdXBkYXRlKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChzY29wZSwgZWxlbWVudCwgYXR0cnMpID0+IHtcbiAgICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgIHZpZXdLZXk6ICdvbnMtaWNvbidcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG5cbiAgICAgIH1cblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1vcmllbnRhdGlvblxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUNvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiBzY3JlZW4gb3JpZW50YXRpb24uIFZhbGlkIHZhbHVlcyBhcmUgcG9ydHJhaXQgYW5kIGxhbmRzY2FwZS4gRGlmZmVyZW50IGZyb20gb3RoZXIgY29tcG9uZW50cywgdGhpcyBjb21wb25lbnQgaXMgdXNlZCBhcyBhdHRyaWJ1dGUgaW4gYW55IGVsZW1lbnQuWy9lbl1cbiAqICAgW2phXeeUu+mdouOBruWQkeOBjeOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuihjOOBhOOBvuOBmeOAgnBvcnRyYWl044KC44GX44GP44GvbGFuZHNjYXBl44KS5oyH5a6a44Gn44GN44G+44GZ44CC44GZ44G544Gm44Gu6KaB57Sg44Gu5bGe5oCn44Gr5L2/55So44Gn44GN44G+44GZ44CCWy9qYV1cbiAqIEBzZWVhbHNvIG9ucy1pZi1wbGF0Zm9ybSBbZW5db25zLWlmLXBsYXRmb3JtIGNvbXBvbmVudFsvZW5dW2phXW9ucy1pZi1wbGF0Zm9ybeOCs+ODs+ODneODvOODjeODs+ODiFsvamFdXG4gKiBAZ3VpZGUgVXRpbGl0eUFQSXMgW2VuXU90aGVyIHV0aWxpdHkgQVBJc1svZW5dW2phXeS7luOBruODpuODvOODhuOCo+ODquODhuOCo0FQSVsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMtaWYtb3JpZW50YXRpb249XCJwb3J0cmFpdFwiPlxuICogICA8cD5UaGlzIHdpbGwgb25seSBiZSB2aXNpYmxlIGluIHBvcnRyYWl0IG1vZGUuPC9wPlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pZi1vcmllbnRhdGlvblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1FaXRoZXIgXCJwb3J0cmFpdFwiIG9yIFwibGFuZHNjYXBlXCIuWy9lbl1cbiAqICAgW2phXXBvcnRyYWl044KC44GX44GP44GvbGFuZHNjYXBl44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNJZk9yaWVudGF0aW9uJywgZnVuY3Rpb24oJG9uc2VuLCAkb25zR2xvYmFsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnb25zSWZPcmllbnRhdGlvbicsIHVwZGF0ZSk7XG4gICAgICAgICAgJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5vbignY2hhbmdlJywgdXBkYXRlKTtcblxuICAgICAgICAgIHVwZGF0ZSgpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvbnNHbG9iYWwub3JpZW50YXRpb24ub2ZmKCdjaGFuZ2UnLCB1cGRhdGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgdXNlck9yaWVudGF0aW9uID0gKCcnICsgYXR0cnMub25zSWZPcmllbnRhdGlvbikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBvcmllbnRhdGlvbiA9IGdldExhbmRzY2FwZU9yUG9ydHJhaXQoKTtcblxuICAgICAgICAgICAgaWYgKHVzZXJPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyB8fCB1c2VyT3JpZW50YXRpb24gPT09ICdsYW5kc2NhcGUnKSB7XG4gICAgICAgICAgICAgIGlmICh1c2VyT3JpZW50YXRpb24gPT09IG9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gZ2V0TGFuZHNjYXBlT3JQb3J0cmFpdCgpIHtcbiAgICAgICAgICAgIHJldHVybiAkb25zR2xvYmFsLm9yaWVudGF0aW9uLmlzUG9ydHJhaXQoKSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1pZi1wbGF0Zm9ybVxuICogQGNhdGVnb3J5IGNvbmRpdGlvbmFsXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIC8gYnJvd3Nlci4gVmFsaWQgdmFsdWVzIGFyZSBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgYW5kIFwid3BcIi5bL2VuXVxuICogICAgW2phXeODl+ODqeODg+ODiOODleOCqeODvOODoOOChOODluODqeOCpuOCtuODvOOBq+W/nOOBmOOBpuOCs+ODs+ODhuODs+ODhOOBruWItuW+oeOCkuOBiuOBk+OBquOBhOOBvuOBmeOAgm9wZXJhLCBmaXJlZm94LCBzYWZhcmksIGNocm9tZSwgaWUsIGVkZ2UsIGFuZHJvaWQsIGJsYWNrYmVycnksIGlvcywgd3Djga7jgYTjgZrjgozjgYvjga7lgKTjgpLnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICogQHNlZWFsc28gb25zLWlmLW9yaWVudGF0aW9uIFtlbl1vbnMtaWYtb3JpZW50YXRpb24gY29tcG9uZW50Wy9lbl1bamFdb25zLWlmLW9yaWVudGF0aW9u44Kz44Oz44Od44O844ON44Oz44OIWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1pZi1wbGF0Zm9ybT1cImFuZHJvaWRcIj5cbiAqICAgLi4uXG4gKiA8L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWlmLXBsYXRmb3JtXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGluaXRvbmx5XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXU9uZSBvciBtdWx0aXBsZSBzcGFjZSBzZXBhcmF0ZWQgdmFsdWVzOiBcIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIgb3IgXCJ3cFwiLlsvZW5dXG4gKiAgIFtqYV1cIm9wZXJhXCIsIFwiZmlyZWZveFwiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImllXCIsIFwiZWRnZVwiLCBcImFuZHJvaWRcIiwgXCJibGFja2JlcnJ5XCIsIFwiaW9zXCIsIFwid3BcIuOBruOBhOOBmuOCjOOBi+epuueZveWMuuWIh+OCiuOBp+ikh+aVsOaMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0lmUGxhdGZvcm0nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgdmFyIHBsYXRmb3JtID0gZ2V0UGxhdGZvcm1TdHJpbmcoKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ29uc0lmUGxhdGZvcm0nLCBmdW5jdGlvbih1c2VyUGxhdGZvcm0pIHtcbiAgICAgICAgICAgIGlmICh1c2VyUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB1cGRhdGUoKTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gc2NvcGUgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgdXNlclBsYXRmb3JtcyA9IGF0dHJzLm9uc0lmUGxhdGZvcm0udG9Mb3dlckNhc2UoKS50cmltKCkuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgIGlmICh1c2VyUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0udG9Mb3dlckNhc2UoKSkgPj0gMCkge1xuICAgICAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRQbGF0Zm9ybVN0cmluZygpIHtcblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2FuZHJvaWQnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKSkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1JJTSBUYWJsZXQgT1MvaSkpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CQjEwL2kpKSkge1xuICAgICAgICAgICAgcmV0dXJuICdibGFja2JlcnJ5JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICdpb3MnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9XaW5kb3dzIFBob25lfElFTW9iaWxlfFdQRGVza3RvcC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICd3cCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gT3BlcmEgOC4wKyAoVUEgZGV0ZWN0aW9uIHRvIGRldGVjdCBCbGluay92OC1wb3dlcmVkIE9wZXJhKVxuICAgICAgICAgIHZhciBpc09wZXJhID0gISF3aW5kb3cub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgT1BSLycpID49IDA7XG4gICAgICAgICAgaWYgKGlzT3BlcmEpIHtcbiAgICAgICAgICAgIHJldHVybiAnb3BlcmEnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0ZpcmVmb3ggPSB0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnOyAgIC8vIEZpcmVmb3ggMS4wK1xuICAgICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIHJldHVybiAnZmlyZWZveCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzU2FmYXJpID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdpbmRvdy5IVE1MRWxlbWVudCkuaW5kZXhPZignQ29uc3RydWN0b3InKSA+IDA7XG4gICAgICAgICAgLy8gQXQgbGVhc3QgU2FmYXJpIDMrOiBcIltvYmplY3QgSFRNTEVsZW1lbnRDb25zdHJ1Y3Rvcl1cIlxuICAgICAgICAgIGlmIChpc1NhZmFyaSkge1xuICAgICAgICAgICAgcmV0dXJuICdzYWZhcmknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0VkZ2UgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBFZGdlLycpID49IDA7XG4gICAgICAgICAgaWYgKGlzRWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuICdlZGdlJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNDaHJvbWUgPSAhIXdpbmRvdy5jaHJvbWUgJiYgIWlzT3BlcmEgJiYgIWlzRWRnZTsgLy8gQ2hyb21lIDErXG4gICAgICAgICAgaWYgKGlzQ2hyb21lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzSUUgPSAvKkBjY19vbiFAKi9mYWxzZSB8fCAhIWRvY3VtZW50LmRvY3VtZW50TW9kZTsgLy8gQXQgbGVhc3QgSUU2XG4gICAgICAgICAgaWYgKGlzSUUpIHtcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBpZCBpbnB1dFxuICogQG5hbWUgb25zLWlucHV0XG4gKiBAY2F0ZWdvcnkgZm9ybVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUlucHV0IGNvbXBvbmVudC5bL2VuXVxuICogIFtqYV1pbnB1dOOCs+ODs+ODneKAleODjeODs+ODiOOBp+OBmeOAglsvamFdXG4gKiBAY29kZXBlbiBvalF4TGpcbiAqIEBndWlkZSBVc2luZ0Zvcm1Db21wb25lbnRzXG4gKiAgIFtlbl1Vc2luZyBmb3JtIGNvbXBvbmVudHNbL2VuXVxuICogICBbamFd44OV44Kp44O844Og44KS5L2/44GGWy9qYV1cbiAqIEBndWlkZSBFdmVudEhhbmRsaW5nXG4gKiAgIFtlbl1FdmVudCBoYW5kbGluZyBkZXNjcmlwdGlvbnNbL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5Yem55CG44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWlucHV0Pjwvb25zLWlucHV0PlxuICogPG9ucy1pbnB1dCBtb2RpZmllcj1cIm1hdGVyaWFsXCIgbGFiZWw9XCJVc2VybmFtZVwiPjwvb25zLWlucHV0PlxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbGFiZWxcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVRleHQgZm9yIGFuaW1hdGVkIGZsb2F0aW5nIGxhYmVsLlsvZW5dXG4gKiAgIFtqYV3jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgZXjgZvjgovjg5Xjg63jg7zjg4bjgqPjg7PjgrDjg6njg5njg6vjga7jg4bjgq3jgrnjg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgZmxvYXRcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1JZiB0aGlzIGF0dHJpYnV0ZSBpcyBwcmVzZW50LCB0aGUgbGFiZWwgd2lsbCBiZSBhbmltYXRlZC5bL2VuXVxuICogIFtqYV3jgZPjga7lsZ7mgKfjgYzoqK3lrprjgZXjgozjgZ/mmYLjgIHjg6njg5njg6vjga/jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgZnjgovjgojjgYbjgavjgarjgorjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG5nZG9jIGF0dHJpYnV0ZVxuICogQG5hbWUgbmctbW9kZWxcbiAqIEBleHRlbnNpb25PZiBhbmd1bGFyXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUJpbmQgdGhlIHZhbHVlIHRvIGEgbW9kZWwuIFdvcmtzIGp1c3QgbGlrZSBmb3Igbm9ybWFsIGlucHV0IGVsZW1lbnRzLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7opoHntKDjga7lgKTjgpLjg6Ljg4fjg6vjgavntJDku5jjgZHjgb7jgZnjgILpgJrluLjjga5pbnB1dOimgee0oOOBruanmOOBq+WLleS9nOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgYXR0cmlidXRlXG4gKiBAbmFtZSBuZy1jaGFuZ2VcbiAqIEBleHRlbnNpb25PZiBhbmd1bGFyXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUV4ZWN1dGVzIGFuIGV4cHJlc3Npb24gd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy4gV29ya3MganVzdCBsaWtlIGZvciBub3JtYWwgaW5wdXQgZWxlbWVudHMuWy9lbl1cbiAqICAgW2phXeWApOOBjOWkieOCj+OBo+OBn+aZguOBq+OBk+OBruWxnuaAp+OBp+aMh+WumuOBl+OBn2V4cHJlc3Npb27jgYzlrp/ooYzjgZXjgozjgb7jgZnjgILpgJrluLjjga5pbnB1dOimgee0oOOBruanmOOBq+WLleS9nOOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0lucHV0JywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnRbMF07XG5cbiAgICAgICAgY29uc3Qgb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzZXQgPSAkcGFyc2UoYXR0cnMubmdNb2RlbCkuYXNzaWduO1xuXG4gICAgICAgICAgaWYgKGVsLl9pc1RleHRJbnB1dCkge1xuICAgICAgICAgICAgZWwudHlwZSA9PT0gJ251bWJlcicgPyBzZXQoc2NvcGUsIE51bWJlcihlbC52YWx1ZSkpIDogc2V0KHNjb3BlLCBlbC52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycgJiYgZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgc2V0KHNjb3BlLCBlbC52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0KHNjb3BlLCBlbC5jaGVja2VkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cnMubmdDaGFuZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChlbC5faXNUZXh0SW5wdXQpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IGVsLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgIGVsLmNoZWNrZWQgPSB2YWx1ZSA9PT0gZWwudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbC5faXNUZXh0SW5wdXRcbiAgICAgICAgICAgID8gZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICAgICAgOiBlbGVtZW50Lm9uKCdjaGFuZ2UnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWwuX2lzVGV4dElucHV0XG4gICAgICAgICAgICA/IGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpXG4gICAgICAgICAgICA6IGVsZW1lbnQub2ZmKCdjaGFuZ2UnLCBvbklucHV0KTtcblxuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBjYXRlZ29yeSBmb3JtXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVxuICogICAgIENvbmRpdGlvbmFsbHkgZGlzcGxheSBjb250ZW50IGRlcGVuZGluZyBvbiBpZiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgaXMgdmlzaWJsZSBvciBoaWRkZW4uXG4gKiAgICAgVGhpcyBjb21wb25lbnQgcmVxdWlyZXMgY29yZG92YSBhbmQgdGhhdCB0aGUgY29tLmlvbmljLmtleWJvYXJkIHBsdWdpbiBpcyBpbnN0YWxsZWQuXG4gKiAgIFsvZW5dXG4gKiAgIFtqYV1cbiAqICAgICDjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgabjgYTjgovjgYvjganjgYbjgYvjgafjgIHjgrPjg7Pjg4bjg7Pjg4TjgpLooajnpLrjgZnjgovjgYvjganjgYbjgYvjgpLliIfjgormm7/jgYjjgovjgZPjgajjgYzlh7rmnaXjgb7jgZnjgIJcbiAqICAgICDjgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjga/jgIFDb3Jkb3Zh44KEY29tLmlvbmljLmtleWJvYXJk44OX44Op44Kw44Kk44Oz44KS5b+F6KaB44Go44GX44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAZ3VpZGUgVXRpbGl0eUFQSXNcbiAqICAgW2VuXU90aGVyIHV0aWxpdHkgQVBJc1svZW5dXG4gKiAgIFtqYV3ku5bjga7jg6bjg7zjg4bjgqPjg6rjg4bjgqNBUElbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWtleWJvYXJkLWFjdGl2ZT5cbiAqICAgVGhpcyB3aWxsIG9ubHkgYmUgZGlzcGxheWVkIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlxuICogPC9kaXY+XG4gKiA8ZGl2IG9ucy1rZXlib2FyZC1pbmFjdGl2ZT5cbiAqICAgVGhlcmUgaXMgYWxzbyBhIGNvbXBvbmVudCB0aGF0IGRvZXMgdGhlIG9wcG9zaXRlLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7lsZ7mgKfjgYzjgaTjgYTjgZ/opoHntKDjga/jgIHjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgZ/mmYLjgavliJ3jgoHjgabooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMta2V5Ym9hcmQtaW5hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBoaWRkZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOmaoOOCjOOBpuOBhOOCi+aZguOBruOBv+ihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBjb21waWxlRnVuY3Rpb24gPSBmdW5jdGlvbihzaG93LCAkb25zZW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGlzcFNob3cgPSBzaG93ID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICAgIGRpc3BIaWRlID0gc2hvdyA/ICdub25lJyA6ICdibG9jayc7XG5cbiAgICAgICAgdmFyIG9uU2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcFNob3cpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsIGRpc3BIaWRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25Jbml0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnZpc2libGUpIHtcbiAgICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICBpZiAob25zLnNvZnR3YXJlS2V5Ym9hcmQuX3Zpc2libGUpIHtcbiAgICAgICAgICBvblNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdzaG93Jywgb25TaG93KTtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ2hpZGUnLCBvbkhpZGUpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaW5pdCcsIG9uSW5pdCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRBY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24odHJ1ZSwgJG9uc2VuKVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0tleWJvYXJkSW5hY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24oZmFsc2UsICRvbnNlbilcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3QnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0J30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RIZWFkZXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0LWhlYWRlcid9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0SXRlbScsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QtaXRlbSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdFRpdGxlJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC10aXRsZSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRGlzcGxheSBhIHBsYWNlaG9sZGVyIHdoaWxlIHRoZSBjb250ZW50IGlzIGxvYWRpbmcuWy9lbl1cbiAqICAgW2phXU9uc2VuIFVJ44GM6Kqt44G/6L6844G+44KM44KL44G+44Gn44Gr6KGo56S644GZ44KL44OX44Os44O844K544Ob44Or44OA44O844KS6KGo54++44GX44G+44GZ44CCWy9qYV1cbiAqIEBndWlkZSBVdGlsaXR5QVBJcyBbZW5dT3RoZXIgdXRpbGl0eSBBUElzWy9lbl1bamFd5LuW44Gu44Om44O844OG44Kj44Oq44OG44KjQVBJWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyPVwicGFnZS5odG1sXCI+XG4gKiAgIExvYWRpbmcuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIHRvIGxvYWQuWy9lbl1cbiAqICAgW2phXeiqreOBv+i+vOOCgOODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xvYWRpbmdQbGFjZWhvbGRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICBvbnMuX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIoZWxlbWVudFswXSwgYXR0cnMub25zTG9hZGluZ1BsYWNlaG9sZGVyLCBmdW5jdGlvbihjb250ZW50RWxlbWVudCwgZG9uZSkge1xuICAgICAgICAgICAgb25zLmNvbXBpbGUoY29udGVudEVsZW1lbnQpO1xuICAgICAgICAgICAgc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLG51bGwsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSYW5nZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIHNldChzY29wZSwgZWxlbWVudFswXS52YWx1ZSk7XG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1JpcHBsZScsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXJpcHBsZSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNjb3BlXG4gKiBAY2F0ZWdvcnkgdXRpbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BbGwgY2hpbGQgZWxlbWVudHMgdXNpbmcgdGhlIFwidmFyXCIgYXR0cmlidXRlIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIHNjb3BlIG9mIHRoaXMgZWxlbWVudC5bL2VuXVxuICogICBbamFdXCJ2YXJcIuWxnuaAp+OCkuS9v+OBo+OBpuOBhOOCi+WFqOOBpuOBruWtkOimgee0oOOBrnZpZXfjgqrjg5bjgrjjgqfjgq/jg4jjga/jgIHjgZPjga7opoHntKDjga5Bbmd1bGFySlPjgrnjgrPjg7zjg5fjgavov73liqDjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQGV4YW1wbGVcbiAqIDxvbnMtbGlzdD5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLXNjb3BlIG5nLXJlcGVhdD1cIml0ZW0gaW4gaXRlbXNcIj5cbiAqICAgICA8b25zLWNhcm91c2VsIHZhcj1cImNhcm91c2VsXCI+XG4gKiAgICAgICA8b25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5uZXh0KClcIj5cbiAqICAgICAgICAge3sgaXRlbSB9fVxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0gbmctY2xpY2s9XCJjYXJvdXNlbC5wcmV2KClcIj5cbiAqICAgICAgICAgLi4uXG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICAgIDwvb25zLWNhcm91c2VsPlxuICogICA8L29ucy1saXN0LWl0ZW0+XG4gKiA8L29ucy1saXN0PlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNTY29wZScsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc2VsZWN0XG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpXG4gIC5kaXJlY3RpdmUoJ29uc1NlbGVjdCcsIGZ1bmN0aW9uICgkcGFyc2UsICRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0ID0gJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbjtcblxuICAgICAgICAgIHNldChzY29wZSwgZWxlbWVudFswXS52YWx1ZSk7XG4gICAgICAgICAgaWYgKGF0dHJzLm5nQ2hhbmdlKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJGV2YWxBc3luYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhdHRycy5uZ01vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5nTW9kZWwsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFswXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHsgdmlld0tleTogJ29ucy1zZWxlY3QnIH0pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSlcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGxpdHRlci1jb250ZW50XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlNwbGl0dGVyQ29udGVudEVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1jb250ZW50JywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyQ29udGVudCcsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlckNvbnRlbnQsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyQ29udGVudChzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB2aWV3KTtcblxuICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItY29udGVudCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItc2lkZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZW9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZW9wZW5cIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZW9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2xvc2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdG9wZW5cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0b3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjbG9zZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1tb2RlY2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJtb2RlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJtb2RlY2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFzdFJlYWR5ID0gd2luZG93Lm9ucy5TcGxpdHRlclNpZGVFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5O1xuICB3aW5kb3cub25zLlNwbGl0dGVyU2lkZUVsZW1lbnQucmV3cml0YWJsZXMucmVhZHkgPSBvbnMuX3dhaXREaXJldGl2ZUluaXQoJ29ucy1zcGxpdHRlci1zaWRlJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1NwbGl0dGVyU2lkZScsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlclNpZGUsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFNwbGl0dGVyU2lkZShzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ2Rlc3Ryb3kgcHJlb3BlbiBwcmVjbG9zZSBwb3N0b3BlbiBwb3N0Y2xvc2UgbW9kZWNoYW5nZScpO1xuXG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItc2lkZScsIHZpZXcpO1xuXG4gICAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2aWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1zaWRlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAgIC5kaXJlY3RpdmUoJ29uc1RhYicsIHRhYilcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWJiYXJJdGVtJywgdGFiKTsgLy8gZm9yIEJDXG5cbiAgZnVuY3Rpb24gdGFiKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRhYmJhclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHRhYiBiYXIuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCv+ODluODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIGhpZGUtdGFic1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqIEBkZWZhdWx0IGZhbHNlXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVdoZXRoZXIgdG8gaGlkZSB0aGUgdGFicy4gVmFsaWQgdmFsdWVzIGFyZSB0cnVlL2ZhbHNlLlsvZW5dXG4gKiAgIFtqYV3jgr/jg5bjgpLpnZ7ooajnpLrjgavjgZnjgovloLTlkIjjgavmjIflrprjgZfjgb7jgZnjgIJ0cnVl44KC44GX44GP44GvZmFsc2XjgpLmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVhY3RpdmVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlYWN0aXZlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWFjdGl2ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuVGFiYmFyRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtdGFiYmFyJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RhYmJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUsICRwYXJzZSwgVGFiYmFyVmlldykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuXG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLmhpZGVUYWJzLCBmdW5jdGlvbihoaWRlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBoaWRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaGlkZSA9IGhpZGUgPT09ICd0cnVlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudFswXS5zZXRUYWJiYXJWaXNpYmlsaXR5KCFoaWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHRhYmJhclZpZXcgPSBuZXcgVGFiYmFyVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModGFiYmFyVmlldywgZWxlbWVudCk7XG5cbiAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyh0YWJiYXJWaWV3LCAncmVhY3RpdmUgcHJlY2hhbmdlIHBvc3RjaGFuZ2UgaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHRhYmJhclZpZXcpO1xuICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdGFiYmFyVmlldyk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRhYmJhclZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRhYmJhclZpZXcpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRhYmJhcicsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVGVtcGxhdGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVybWluYWw6IHRydWUsXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudFswXS50ZW1wbGF0ZSB8fCBlbGVtZW50Lmh0bWwoKTtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGVsZW1lbnQuYXR0cignaWQnKSwgY29udGVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhclxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgdG9vbGJhci5bL2VuXVxuICogIFtqYV3jgZPjga7jg4Tjg7zjg6vjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1Rvb2xiYXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGRpcnR5IGZpeCFcbiAgICAgICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lID09PSAnb25zLXRvb2xiYXInKSB7XG4gICAgICAgICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtdG9vbGJhcid9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvb2xiYXItYnV0dG9uXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgYnV0dG9uLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg5zjgr/jg7PjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zVG9vbGJhckJ1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGxpbms6IHtcbiAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgdG9vbGJhckJ1dHRvbiA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRvb2xiYXJCdXR0b24pO1xuXG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRvb2xiYXJCdXR0b24sIGVsZW1lbnQpO1xuXG4gICAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRvb2xiYXJCdXR0b24uX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModG9vbGJhckJ1dHRvbik7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy10b29sYmFyLWJ1dHRvbicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgdmFyIENvbXBvbmVudENsZWFuZXIgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZWNvbXBvc2VOb2RlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50LnJlbW92ZSgpLmNoaWxkcmVuKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVjb21wb3NlTm9kZShhbmd1bGFyLmVsZW1lbnQoY2hpbGRyZW5baV0pKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBdHRyaWJ1dGVzfSBhdHRyc1xuICAgICAqL1xuICAgIGRlc3Ryb3lBdHRyaWJ1dGVzOiBmdW5jdGlvbihhdHRycykge1xuICAgICAgYXR0cnMuJCRlbGVtZW50ID0gbnVsbDtcbiAgICAgIGF0dHJzLiQkb2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZXN0cm95RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKi9cbiAgICBkZXN0cm95U2NvcGU6IGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICBzY29wZS4kJGxpc3RlbmVycyA9IHt9O1xuICAgICAgc2NvcGUuJCR3YXRjaGVycyA9IG51bGw7XG4gICAgICBzY29wZSA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2NvcGV9IHNjb3BlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKi9cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKHNjb3BlLCBmbikge1xuICAgICAgdmFyIGNsZWFyID0gc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhcigpO1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdDb21wb25lbnRDbGVhbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudENsZWFuZXI7XG4gIH0pO1xuXG4gIC8vIG92ZXJyaWRlIGJ1aWx0aW4gbmctKGV2ZW50bmFtZSkgZGlyZWN0aXZlc1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5nRXZlbnREaXJlY3RpdmVzID0ge307XG4gICAgJ2NsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgbW91c2VlbnRlciBtb3VzZWxlYXZlIGtleWRvd24ga2V5dXAga2V5cHJlc3Mgc3VibWl0IGZvY3VzIGJsdXIgY29weSBjdXQgcGFzdGUnLnNwbGl0KCcgJykuZm9yRWFjaChcbiAgICAgIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmVOb3JtYWxpemUoJ25nLScgKyBuYW1lKTtcbiAgICAgICAgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0gPSBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlOiBmdW5jdGlvbigkZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICB2YXIgZm4gPSAkcGFyc2UoYXR0cltkaXJlY3RpdmVOYW1lXSk7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKHNjb3BlLCB7JGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShzY29wZSk7XG4gICAgICAgICAgICAgICAgICBzY29wZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMoYXR0cik7XG4gICAgICAgICAgICAgICAgICBhdHRyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XTtcblxuICAgICAgICBmdW5jdGlvbiBkaXJlY3RpdmVOb3JtYWxpemUobmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIG1vZHVsZS5jb25maWcoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgIHZhciBzaGlmdCA9IGZ1bmN0aW9uKCRkZWxlZ2F0ZSkge1xuICAgICAgICAkZGVsZWdhdGUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcbiAgICAgIH07XG4gICAgICBPYmplY3Qua2V5cyhuZ0V2ZW50RGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihkaXJlY3RpdmVOYW1lKSB7XG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcihkaXJlY3RpdmVOYW1lICsgJ0RpcmVjdGl2ZScsIFsnJGRlbGVnYXRlJywgc2hpZnRdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgIG1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgbmdFdmVudERpcmVjdGl2ZXNbZGlyZWN0aXZlTmFtZV0pO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbk9iamVjdC5rZXlzKG9ucy5ub3RpZmljYXRpb24pLmZpbHRlcihuYW1lID0+ICEvXl8vLnRlc3QobmFtZSkpLmZvckVhY2gobmFtZSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsTm90aWZpY2F0aW9uID0gb25zLm5vdGlmaWNhdGlvbltuYW1lXTtcblxuICBvbnMubm90aWZpY2F0aW9uW25hbWVdID0gKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJyA/IChvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlKSA6IChvcHRpb25zID0gbWVzc2FnZSk7XG5cbiAgICBjb25zdCBjb21waWxlID0gb3B0aW9ucy5jb21waWxlO1xuICAgIGxldCAkZWxlbWVudDtcblxuICAgIG9wdGlvbnMuY29tcGlsZSA9IGVsZW1lbnQgPT4ge1xuICAgICAgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY29tcGlsZSA/IGNvbXBpbGUoZWxlbWVudCkgOiBlbGVtZW50KTtcbiAgICAgIHJldHVybiBvbnMuJGNvbXBpbGUoJGVsZW1lbnQpKCRlbGVtZW50LmluamVjdG9yKCkuZ2V0KCckcm9vdFNjb3BlJykpO1xuICAgIH07XG5cbiAgICBvcHRpb25zLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAkZWxlbWVudC5kYXRhKCdfc2NvcGUnKS4kZGVzdHJveSgpO1xuICAgICAgJGVsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gb3JpZ2luYWxOb3RpZmljYXRpb24ob3B0aW9ucyk7XG4gIH07XG59KTtcbiIsIi8vIGNvbmZpcm0gdG8gdXNlIGpxTGl0ZVxuaWYgKHdpbmRvdy5qUXVlcnkgJiYgYW5ndWxhci5lbGVtZW50ID09PSB3aW5kb3cualF1ZXJ5KSB7XG4gIGNvbnNvbGUud2FybignT25zZW4gVUkgcmVxdWlyZSBqcUxpdGUuIExvYWQgalF1ZXJ5IGFmdGVyIGxvYWRpbmcgQW5ndWxhckpTIHRvIGZpeCB0aGlzIGVycm9yLiBqUXVlcnkgbWF5IGJyZWFrIE9uc2VuIFVJIGJlaGF2aW9yLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgdmFyIHRlbXBsYXRlcyA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb25zLXRlbXBsYXRlXCJdJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlc1tpXSk7XG4gICAgICB2YXIgaWQgPSB0ZW1wbGF0ZS5hdHRyKCdpZCcpO1xuICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KGlkLCB0ZW1wbGF0ZS50ZXh0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbn0pKCk7XG4iXX0=
