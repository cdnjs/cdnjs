(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['angular', 'objectpath', 'tv4'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular'), require('objectpath'), require('tv4'));
  } else {
    root.schemaForm = factory(root.angular, root.objectpath, root.tv4);
  }
}(this, function(angular, objectpath, tv4) {
// Deps is sort of a problem for us, maybe in the future we will ask the user to depend
// on modules for add-ons

var deps = [];
try {
  //This throws an expection if module does not exist.
  angular.module('ngSanitize');
  deps.push('ngSanitize');
} catch (e) {}

try {
  //This throws an expection if module does not exist.
  angular.module('ui.sortable');
  deps.push('ui.sortable');
} catch (e) {}

try {
  //This throws an expection if module does not exist.
  angular.module('angularSpectrumColorpicker');
  deps.push('angularSpectrumColorpicker');
} catch (e) {}

var schemaForm = angular.module('schemaForm', deps);

angular.module('schemaForm').provider('sfPath',
[function() {

  // When building with browserify it's objectpath,
  // otherwise it's just objectpath.
  var ObjectPath = window.ObjectPath || objectpath;

  var sfPath = {parse: ObjectPath.parse};

  // if we're on Angular 1.2.x, we need to continue using dot notation
  if (angular.version.major === 1 && angular.version.minor < 3) {
    sfPath.stringify = function(arr) {
      return Array.isArray(arr) ? arr.join('.') : arr.toString();
    };
  } else {
    sfPath.stringify = ObjectPath.stringify;
  }

  // We want this to use whichever stringify method is defined above,
  // so we have to copy the code here.
  sfPath.normalize = function(data, quote) {
    return sfPath.stringify(Array.isArray(data) ? data : sfPath.parse(data), quote);
  };

  // expose the methods in sfPathProvider
  this.parse = sfPath.parse;
  this.stringify = sfPath.stringify;
  this.normalize = sfPath.normalize;

  this.$get = function() {
    return sfPath;
  };
}]);

/**
 * @ngdoc service
 * @name sfSelect
 * @kind function
 *
 */
angular.module('schemaForm').factory('sfSelect', ['sfPath', function(sfPath) {
  var numRe = /^\d+$/;

  /**
    * @description
    * Utility method to access deep properties without
    * throwing errors when things are not defined.
    * Can also set a value in a deep structure, creating objects when missing
    * ex.
    * var foo = Select('address.contact.name',obj)
    * Select('address.contact.name',obj,'Leeroy')
    *
    * @param {string} projection A dot path to the property you want to get/set
    * @param {object} obj   (optional) The object to project on, defaults to 'this'
    * @param {Any}    valueToSet (opional)  The value to set, if parts of the path of
    *                 the projection is missing empty objects will be created.
    * @returns {Any|undefined} returns the value at the end of the projection path
    *                          or undefined if there is none.
    */
  return function(projection, obj, valueToSet) {
    if (!obj) {
      obj = this;
    }
    //Support [] array syntax
    var parts = typeof projection === 'string' ? sfPath.parse(projection) : projection;

    if (typeof valueToSet !== 'undefined' && parts.length === 1) {
      //special case, just setting one variable
      obj[parts[0]] = valueToSet;
      return obj;
    }

    if (typeof valueToSet !== 'undefined' &&
        typeof obj[parts[0]] === 'undefined') {
       // We need to look ahead to check if array is appropriate
      obj[parts[0]] = parts.length > 2 && numRe.test(parts[1]) ? [] : {};
    }

    var value = obj[parts[0]];
    for (var i = 1; i < parts.length; i++) {
      // Special case: We allow JSON Form syntax for arrays using empty brackets
      // These will of course not work here so we exit if they are found.
      if (parts[i] === '') {
        return undefined;
      }
      if (typeof valueToSet !== 'undefined') {
        if (i === parts.length - 1) {
          //last step. Let's set the value
          value[parts[i]] = valueToSet;
          return valueToSet;
        } else {
          // Make sure to create new objects on the way if they are not there.
          // We need to look ahead to check if array is appropriate
          var tmp = value[parts[i]];
          if (typeof tmp === 'undefined' || tmp === null) {
            tmp = numRe.test(parts[i + 1]) ? [] : {};
            value[parts[i]] = tmp;
          }
          value = tmp;
        }
      } else if (value) {
        //Just get nex value.
        value = value[parts[i]];
      }
    }
    return value;
  };
}]);


// FIXME: type template (using custom builder)
angular.module('schemaForm').provider('sfBuilder', ['sfPathProvider', function(sfPathProvider) {

  var SNAKE_CASE_REGEXP = /[A-Z]/g;
  var snakeCase = function(name, separator) {
    separator = separator || '_';
    return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  };

  var builders = {
    ngModel: function(args) {
      if (!args.form.key) {
        return;
      }
      var key  = args.form.key;

      // Redact part of the key, used in arrays
      // KISS keyRedaction is a number.
      if (args.state.keyRedaction) {
        key = key.slice(args.state.keyRedaction);
      }

      // Stringify key.
      var modelValue;
      if (!args.state.modelValue) {
        var strKey = sfPathProvider.stringify(key).replace(/"/g, '&quot;');
        modelValue = (args.state.modelName || 'model');

        if (strKey) { // Sometimes, like with arrays directly in arrays strKey is nothing.
          modelValue += (strKey[0] !== '[' ? '.' : '') + strKey;
        }
      } else {
        // Another builder, i.e. array has overriden the modelValue
        modelValue = args.state.modelValue;
      }

      // Find all sf-field-value attributes.
      // No value means a add a ng-model.
      // sf-field-value="replaceAll", loop over attributes and replace $$value$$ in each.
      // sf-field-value="attrName", replace or set value of that attribute.
      var nodes = args.fieldFrag.querySelectorAll('[sf-field-model]');
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var conf = n.getAttribute('sf-field-model');
        if (!conf || conf === '') {
          n.setAttribute('ng-model', modelValue);
        } else if (conf === 'replaceAll') {
          var attributes = n.attributes;
          for (var j = 0; attributes.length; j++) {
            if (attributes[j].value && attributes[j].value.indexOf('$$value') !== -1) {
              attributes[j].value = attributes[j].value.replace(/\$\$value\$\$/g, modelValue);
            }
          }
        } else {
          var  val = n.getAttribute(conf);
          if (val && val.indexOf('$$value$$')) {
            n.setAttribute(conf, val.replace(/\$\$value\$\$/g, modelValue));
          } else {
            n.setAttribute(conf, modelValue);
          }
        }
      }
    },
    simpleTransclusion: function(args) {
      var children = args.build(args.form.items, args.path + '.items', args.state);
      args.fieldFrag.firstChild.appendChild(children);
    },

    // Patch on ngModelOptions, since it doesn't like waiting for its value.
    ngModelOptions: function(args) {
      if (args.form.ngModelOptions && Object.keys(args.form.ngModelOptions).length > 0) {
        args.fieldFrag.firstChild.setAttribute('ng-model-options', JSON.stringify(args.form.ngModelOptions));
      }
    },
    transclusion: function(args) {
      var transclusions = args.fieldFrag.querySelectorAll('[sf-field-transclude]');

      if (transclusions.length) {
        for (var i = 0; i < transclusions.length; i++) {
          var n = transclusions[i];

          // The sf-transclude attribute is not a directive, but has the name of what we're supposed to
          // traverse.
          var sub = args.form[n.getAttribute('sf-field-transclude')];
          if (sub) {
            sub = Array.isArray(sub) ? sub : [sub];
            var childFrag = args.build(sub, args.path + '.' + sub, args.state);
            n.appendChild(childFrag);
          }
        }
      }
    }
  };
  this.builders = builders;

  this.$get = ['$templateCache', 'schemaFormDecorators', 'sfPath', function($templateCache, schemaFormDecorators, sfPath) {


    var checkForSlot = function(form, slots) {
      // Finally append this field to the frag.
      // Check for slots
      if (form.key) {
        var slot = slots[sfPath.stringify(form.key)];
        if (slot) {
          while (slot.firstChild) {
            slot.removeChild(slot.firstChild);
          }
          return slot;
        }
      }
    };

    var build = function(items, decorator, templateFn, slots, path, state) {
      state = state || {};
      path = path || 'schemaForm.form';
      var container = document.createDocumentFragment();
      items.reduce(function(frag, f, index) {

        // Sanity check.
        if (!f.type) {
          return;
        }

        var field = decorator[f.type] || decorator['default'];
        if (!field.replace) {
          // Backwards compatability build
          var n = document.createElement(snakeCase(decorator.__name, '-'));
          n.setAttribute('form', path + '[' + index + ']');
          (checkForSlot(f, slots) || frag).appendChild(n);

        } else {
          var tmpl;

          // TODO: Create a couple fo testcases, small and large and
          //       measure optmization. A good start is probably a cache of DOM nodes for a particular
          //       template that can be cloned instead of using innerHTML
          var div = document.createElement('div');
          var template = templateFn(field.template) || templateFn([decorator['default'].template]);
          div.innerHTML = template;

          // Move node to a document fragment, we don't want the div.
          tmpl = document.createDocumentFragment();
          while (div.childNodes.length > 0) {
            tmpl.appendChild(div.childNodes[0]);
          }


          tmpl.firstChild.setAttribute('sf-field',path + '[' + index + ']');

          // Possible builder, often a noop
          var args = {
            fieldFrag: tmpl,
            form: f,
            state: state,
            path: path + '[' + index + ']',

            // Recursive build fn
            build: function(items, path, state) {
              return build(items, decorator, templateFn, slots, path, state);
            },

          };

          // Builders are either a function or a list of functions.
          if (typeof field.builder === 'function') {
            field.builder(args);
          } else {
            field.builder.forEach(function(fn) { fn(args); });
          }

          // Append
          (checkForSlot(f, slots) || frag).appendChild(tmpl);
        }
        return frag;
      }, container);

      return container;
    };

    return {
        /**
         * Builds a form from a canonical form definition
         */
        build: function(form, decorator, slots) {
          return build(form, decorator, function(url) {
            return $templateCache.get(url);
          }, slots);

        },
        builder: builders,
        internalBuild: build
    };
  }];

}]);

angular.module('schemaForm').provider('schemaFormDecorators',
['$compileProvider', 'sfPathProvider', function($compileProvider, sfPathProvider) {
  var defaultDecorator = '';
  var decorators = {};

  // Map template after decorator and type.
  var templateUrl = function(name, form) {
    //schemaDecorator is alias for whatever is set as default
    if (name === 'sfDecorator') {
      name = defaultDecorator;
    }

    var decorator = decorators[name];
    if (decorator[form.type]) {
      return decorator[form.type].template;
    }

    //try default
    return decorator['default'].template;
  };

  var createDirective = function(name) {
    $compileProvider.directive(name,
      ['$parse', '$compile', '$http', '$templateCache', '$interpolate', '$q', 'sfErrorMessage',
       'sfPath','sfSelect',
      function($parse,  $compile,  $http,  $templateCache, $interpolate, $q, sfErrorMessage,
               sfPath, sfSelect) {

        return {
          restrict: 'AE',
          replace: false,
          transclude: false,
          scope: true,
          require: '?^sfSchema',
          link: function(scope, element, attrs, sfSchema) {

            //The ngModelController is used in some templates and
            //is needed for error messages,
            scope.$on('schemaFormPropagateNgModelController', function(event, ngModel) {
              event.stopPropagation();
              event.preventDefault();
              scope.ngModel = ngModel;
            });

            //Keep error prone logic from the template
            scope.showTitle = function() {
              return scope.form && scope.form.notitle !== true && scope.form.title;
            };

            scope.listToCheckboxValues = function(list) {
              var values = {};
              angular.forEach(list, function(v) {
                values[v] = true;
              });
              return values;
            };

            scope.checkboxValuesToList = function(values) {
              var lst = [];
              angular.forEach(values, function(v, k) {
                if (v) {
                  lst.push(k);
                }
              });
              return lst;
            };

            scope.buttonClick = function($event, form) {
              if (angular.isFunction(form.onClick)) {
                form.onClick($event, form);
              } else if (angular.isString(form.onClick)) {
                if (sfSchema) {
                  //evaluating in scope outside of sfSchemas isolated scope
                  sfSchema.evalInParentScope(form.onClick, {'$event': $event, form: form});
                } else {
                  scope.$eval(form.onClick, {'$event': $event, form: form});
                }
              }
            };

            /**
             * Evaluate an expression, i.e. scope.$eval
             * but do it in sfSchemas parent scope sf-schema directive is used
             * @param {string} expression
             * @param {Object} locals (optional)
             * @return {Any} the result of the expression
             */
            scope.evalExpr = function(expression, locals) {
              if (sfSchema) {
                //evaluating in scope outside of sfSchemas isolated scope
                return sfSchema.evalInParentScope(expression, locals);
              }

              return scope.$eval(expression, locals);
            };

            /**
             * Evaluate an expression, i.e. scope.$eval
             * in this decorators scope
             * @param {string} expression
             * @param {Object} locals (optional)
             * @return {Any} the result of the expression
             */
            scope.evalInScope = function(expression, locals) {
              if (expression) {
                return scope.$eval(expression, locals);
              }
            };

            /**
             * Interpolate the expression.
             * Similar to `evalExpr()` and `evalInScope()`
             * but will not fail if the expression is
             * text that contains spaces.
             *
             * Use the Angular `{{ interpolation }}`
             * braces to access properties on `locals`.
             *
             * @param  {string} content The string to interpolate.
             * @param  {Object} locals (optional) Properties that may be accessed in the
             *                         `expression` string.
             * @return {Any} The result of the expression or `undefined`.
             */
            scope.interp = function(expression, locals) {
              return (expression && $interpolate(expression)(locals));
            };

            //This works since we ot the ngModel from the array or the schema-validate directive.
            scope.hasSuccess = function() {
              if (!scope.ngModel) {
                return false;
              }
              return scope.ngModel.$valid &&
                  (!scope.ngModel.$pristine || !scope.ngModel.$isEmpty(scope.ngModel.$modelValue));
            };

            scope.hasError = function() {
              if (!scope.ngModel) {
                return false;
              }
              return scope.ngModel.$invalid && !scope.ngModel.$pristine;
            };

            /**
             * DEPRECATED: use sf-messages instead.
             * Error message handler
             * An error can either be a schema validation message or a angular js validtion
             * error (i.e. required)
             */
            scope.errorMessage = function(schemaError) {
              return sfErrorMessage.interpolate(
                (schemaError && schemaError.code + '') || 'default',
                (scope.ngModel && scope.ngModel.$modelValue) || '',
                (scope.ngModel && scope.ngModel.$viewValue) || '',
                scope.form,
                scope.options && scope.options.validationMessage
              );
            };

            // Rebind our part of the form to the scope.
            var once = scope.$watch(attrs.form, function(form) {
              if (form) {
                // Workaround for 'updateOn' error from ngModelOptions
                // see https://github.com/Textalk/angular-schema-form/issues/255
                // and https://github.com/Textalk/angular-schema-form/issues/206
                form.ngModelOptions = form.ngModelOptions || {};
                scope.form  = form;

                //ok let's replace that template!
                //We do this manually since we need to bind ng-model properly and also
                //for fieldsets to recurse properly.
                var templatePromise;

                // type: "template" is a special case. It can contain a template inline or an url.
                // otherwise we find out the url to the template and load them.
                if (form.type === 'template' && form.template) {
                  templatePromise = $q.when(form.template);
                } else {
                  var url = form.type === 'template' ? form.templateUrl : templateUrl(name, form);
                  templatePromise = $http.get(url, {cache: $templateCache}).then(function(res) {
                                      return res.data;
                                    });
                }

                templatePromise.then(function(template) {
                  if (form.key) {
                    var key = form.key ?
                              sfPathProvider.stringify(form.key).replace(/"/g, '&quot;') : '';
                    template = template.replace(
                      /\$\$value\$\$/g,
                      'model' + (key[0] !== '[' ? '.' : '') + key
                    );
                  }
                  element.html(template);

                  // Do we have a condition? Then we slap on an ng-if on all children,
                  // but be nice to existing ng-if.
                  if (form.condition) {

                    var evalExpr = 'evalExpr(form.condition,{ model: model, "arrayIndex": arrayIndex})';
                    if (form.key) {
                      evalExpr = 'evalExpr(form.condition,{ model: model, "arrayIndex": arrayIndex, "modelValue": model' + sfPath.stringify(form.key) + '})';
                    }

                    angular.forEach(element.children(), function(child) {
                      var ngIf = child.getAttribute('ng-if');
                      child.setAttribute(
                        'ng-if',
                        ngIf ?
                        '(' + ngIf +
                        ') || (' + evalExpr +')'
                        : evalExpr
                      );
                    });
                  }
                  $compile(element.contents())(scope);
                });

                // Where there is a key there is probably a ngModel
                if (form.key) {
                  // It looks better with dot notation.
                  scope.$on(
                    'schemaForm.error.' + form.key.join('.'),
                    function(event, error, validationMessage, validity) {
                      if (validationMessage === true || validationMessage === false) {
                        validity = validationMessage;
                        validationMessage = undefined;
                      }

                      if (scope.ngModel && error) {
                        if (scope.ngModel.$setDirty) {
                          scope.ngModel.$setDirty();
                        } else {
                          // FIXME: Check that this actually works on 1.2
                          scope.ngModel.$dirty = true;
                          scope.ngModel.$pristine = false;
                        }

                        // Set the new validation message if one is supplied
                        // Does not work when validationMessage is just a string.
                        if (validationMessage) {
                          if (!form.validationMessage) {
                            form.validationMessage = {};
                          }
                          form.validationMessage[error] = validationMessage;
                        }

                        scope.ngModel.$setValidity(error, validity === true);

                        if (validity === true) {
                          // Setting or removing a validity can change the field to believe its valid
                          // but its not. So lets trigger its validation as well.
                          scope.$broadcast('schemaFormValidate');
                        }
                      }
                  });

                  // Clean up the model when the corresponding form field is $destroy-ed.
                  // Default behavior can be supplied as a globalOption, and behavior can be overridden in the form definition.
                  scope.$on('$destroy', function() {
                    // If the entire schema form is destroyed we don't touch the model
                    if (!scope.externalDestructionInProgress) {
                      var destroyStrategy = form.destroyStrategy ||
                                            (scope.options && scope.options.destroyStrategy) || 'remove';
                      // No key no model, and we might have strategy 'retain'
                      if (form.key && destroyStrategy !== 'retain') {

                        // Get the object that has the property we wan't to clear.
                        var obj = scope.model;
                        if (form.key.length > 1) {
                          obj = sfSelect(form.key.slice(0, form.key.length - 1), obj);
                        }

                        // We can get undefined here if the form hasn't been filled out entirely
                        if (obj === undefined) {
                          return;
                        }

                        // Type can also be a list in JSON Schema
                        var type = (form.schema && form.schema.type) || '';

                        // Empty means '',{} and [] for appropriate types and undefined for the rest
                        if (destroyStrategy === 'empty' && type.indexOf('string') !== -1) {
                          obj[form.key.slice(-1)] = '';
                        } else if (destroyStrategy === 'empty' && type.indexOf('object') !== -1) {
                          obj[form.key.slice(-1)] = {};
                        } else if (destroyStrategy === 'empty' && type.indexOf('array') !== -1) {
                          obj[form.key.slice(-1)] = [];
                        } else if (destroyStrategy === 'null') {
                          obj[form.key.slice(-1)] = null;
                        } else {
                          delete obj[form.key.slice(-1)];
                        }
                      }
                    }
                  });
                }

                once();
              }
            });
          }
        };
      }
    ]);
  };

  var createManualDirective = function(type, templateUrl, transclude) {
    transclude = angular.isDefined(transclude) ? transclude : false;
    $compileProvider.directive('sf' + angular.uppercase(type[0]) + type.substr(1), function() {
      return {
        restrict: 'EAC',
        scope: true,
        replace: true,
        transclude: transclude,
        template: '<sf-decorator form="form"></sf-decorator>',
        link: function(scope, element, attrs) {
          var watchThis = {
            'items': 'c',
            'titleMap': 'c',
            'schema': 'c'
          };
          var form = {type: type};
          var once = true;
          angular.forEach(attrs, function(value, name) {
            if (name[0] !== '$' && name.indexOf('ng') !== 0 && name !== 'sfField') {

              var updateForm = function(val) {
                if (angular.isDefined(val) && val !== form[name]) {
                  form[name] = val;

                  //when we have type, and if specified key we apply it on scope.
                  if (once && form.type && (form.key || angular.isUndefined(attrs.key))) {
                    scope.form = form;
                    once = false;
                  }
                }
              };

              if (name === 'model') {
                //"model" is bound to scope under the name "model" since this is what the decorators
                //know and love.
                scope.$watch(value, function(val) {
                  if (val && scope.model !== val) {
                    scope.model = val;
                  }
                });
              } else if (watchThis[name] === 'c') {
                //watch collection
                scope.$watchCollection(value, updateForm);
              } else {
                //$observe
                attrs.$observe(name, updateForm);
              }
            }
          });
        }
      };
    });
  };

  /**
   * DEPRECATED: use defineDecorator instead.
   * Create a decorator directive and its sibling "manual" use decorators.
   * The directive can be used to create form fields or other form entities.
   * It can be used in conjunction with <schema-form> directive in which case the decorator is
   * given it's configuration via a the "form" attribute.
   *
   * ex. Basic usage
   *   <sf-decorator form="myform"></sf-decorator>
   **
   * @param {string} name directive name (CamelCased)
   * @param {Object} templates, an object that maps "type" => "templateUrl"
   */
  this.createDecorator = function(name, templates) {
    //console.warn('schemaFormDecorators.createDecorator is DEPRECATED, use defineDecorator instead.');
    decorators[name] = {'__name': name};

    angular.forEach(templates, function(url, type) {
      decorators[name][type] = {template: url, replace: false, builder: []};
    });

    if (!decorators[defaultDecorator]) {
      defaultDecorator = name;
    }
    createDirective(name);
  };


  /**
   * Create a decorator directive and its sibling "manual" use decorators.
   * The directive can be used to create form fields or other form entities.
   * It can be used in conjunction with <schema-form> directive in which case the decorator is
   * given it's configuration via a the "form" attribute.
   *
   * ex. Basic usage
   *   <sf-decorator form="myform"></sf-decorator>
   **
   * @param {string} name directive name (CamelCased)
   * @param {Object} fields, an object that maps "type" => `{ template, builder, replace}`.
                     attributes `builder` and `replace` are optional, and replace defaults to true.
   */
  this.defineDecorator = function(name, fields) {
    decorators[name] = {'__name': name}; // TODO: this feels like a hack, come up with a better way.

    angular.forEach(fields, function(field, type) {
      field.builder = field.builder || [];
      field.replace = angular.isDefined(field.replace) ? field.replace : true;
      decorators[name][type] = field;
    });

    if (!decorators[defaultDecorator]) {
      defaultDecorator = name;
    }
    createDirective(name);
  };

  /**
   * Creates a directive of a decorator
   * Usable when you want to use the decorators without using <schema-form> directive.
   * Specifically when you need to reuse styling.
   *
   * ex. createDirective('text','...')
   *  <sf-text title="foobar" model="person" key="name" schema="schema"></sf-text>
   *
   * @param {string}  type The type of the directive, resulting directive will have sf- prefixed
   * @param {string}  templateUrl
   * @param {boolean} transclude (optional) sets transclude option of directive, defaults to false.
   */
  this.createDirective = createManualDirective;

  /**
   * Same as createDirective, but takes an object where key is 'type' and value is 'templateUrl'
   * Useful for batching.
   * @param {Object} templates
   */
  this.createDirectives = function(templates) {
    angular.forEach(templates, function(url, type) {
      createManualDirective(type, url);
    });
  };

  /**
   * Getter for decorator settings
   * @param {string} name (optional) defaults to defaultDecorator
   * @return {Object} rules and templates { rules: [],templates: {}}
   */
  this.decorator = function(name) {
    name = name || defaultDecorator;
    return decorators[name];
  };


  /**
   * Adds a mapping to an existing decorator.
   * @param {String} name Decorator name
   * @param {String} type Form type for the mapping
   * @param {String} url  The template url
   * @param {Function} builder (optional) builder function
   * @param {boolean} replace (optional) defaults to false. Replace decorator directive with template.
   */
  this.addMapping = function(name, type, url, builder, replace) {
    if (decorators[name]) {
      decorators[name][type] = {
        template: url,
        builder: builder,
        replace: !!replace
      };
    }
  };

  //Service is just a getter for directive templates and rules
  this.$get = function() {
    return {
      decorator: function(name) {
        return decorators[name] || decorators[defaultDecorator];
      },
      defaultDecorator: defaultDecorator
    };
  };

  //Create a default directive
  createDirective('sfDecorator');

}]);

angular.module('schemaForm').provider('sfErrorMessage', function() {

  // The codes are tv4 error codes.
  // Not all of these can actually happen in a field, but for
  // we never know when one might pop up so it's best to cover them all.

  // TODO: Humanize these.
  var defaultMessages = {
    'default': 'Field does not validate',
    0: 'Invalid type, expected {{schema.type}}',
    1: 'No enum match for: {{viewValue}}',
    10: 'Data does not match any schemas from "anyOf"',
    11: 'Data does not match any schemas from "oneOf"',
    12: 'Data is valid against more than one schema from "oneOf"',
    13: 'Data matches schema from "not"',
    // Numeric errors
    100: 'Value is not a multiple of {{schema.divisibleBy}}',
    101: '{{viewValue}} is less than the allowed minimum of {{schema.minimum}}',
    102: '{{viewValue}} is equal to the exclusive minimum {{schema.minimum}}',
    103: '{{viewValue}} is greater than the allowed maximum of {{schema.maximum}}',
    104: '{{viewValue}} is equal to the exclusive maximum {{schema.maximum}}',
    105: 'Value is not a valid number',
    // String errors
    200: 'String is too short ({{viewValue.length}} chars), minimum {{schema.minLength}}',
    201: 'String is too long ({{viewValue.length}} chars), maximum {{schema.maxLength}}',
    202: 'String does not match pattern: {{schema.pattern}}',
    // Object errors
    300: 'Too few properties defined, minimum {{schema.minProperties}}',
    301: 'Too many properties defined, maximum {{schema.maxProperties}}',
    302: 'Required',
    303: 'Additional properties not allowed',
    304: 'Dependency failed - key must exist',
    // Array errors
    400: 'Array is too short ({{value.length}}), minimum {{schema.minItems}}',
    401: 'Array is too long ({{value.length}}), maximum {{schema.maxItems}}',
    402: 'Array items are not unique',
    403: 'Additional items not allowed',
    // Format errors
    500: 'Format validation failed',
    501: 'Keyword failed: "{{title}}"',
    // Schema structure
    600: 'Circular $refs',
    // Non-standard validation options
    1000: 'Unknown property (not in schema)'
  };

  // In some cases we get hit with an angular validation error
  defaultMessages.number    = defaultMessages[105];
  defaultMessages.required  = defaultMessages[302];
  defaultMessages.min       = defaultMessages[101];
  defaultMessages.max       = defaultMessages[103];
  defaultMessages.maxlength = defaultMessages[201];
  defaultMessages.minlength = defaultMessages[200];
  defaultMessages.pattern   = defaultMessages[202];

  this.setDefaultMessages = function(messages) {
    defaultMessages = messages;
  };

  this.getDefaultMessages = function() {
    return defaultMessages;
  };

  this.setDefaultMessage = function(error, msg) {
    defaultMessages[error] = msg;
  };

  this.$get = ['$interpolate', function($interpolate) {

    var service = {};
    service.defaultMessages = defaultMessages;

    /**
     * Interpolate and return proper error for an eror code.
     * Validation message on form trumps global error messages.
     * and if the message is a function instead of a string that function will be called instead.
     * @param {string} error the error code, i.e. tv4-xxx for tv4 errors, otherwise it's whats on
     *                       ngModel.$error for custom errors.
     * @param {Any} value the actual model value.
     * @param {Any} viewValue the viewValue
     * @param {Object} form a form definition object for this field
     * @param  {Object} global the global validation messages object (even though its called global
     *                         its actually just shared in one instance of sf-schema)
     * @return {string} The error message.
     */
    service.interpolate = function(error, value, viewValue, form, global) {
      global = global || {};
      var validationMessage = form.validationMessage || {};

      // Drop tv4 prefix so only the code is left.
      if (error.indexOf('tv4-') === 0) {
        error = error.substring(4);
      }

      // First find apropriate message or function
      var message = validationMessage['default'] || global['default'] || '';

      [validationMessage, global, defaultMessages].some(function(val) {
        if (angular.isString(val) || angular.isFunction(val)) {
          message = val;
          return true;
        }
        if (val && val[error]) {
          message = val[error];
          return true;
        }
      });

      var context = {
        error: error,
        value: value,
        viewValue: viewValue,
        form: form,
        schema: form.schema,
        title: form.title || (form.schema && form.schema.title)
      };
      if (angular.isFunction(message)) {
        return message(context);
      } else {
        return $interpolate(message)(context);
      }
    };

    return service;
  }];

});

/**
 * Schema form service.
 * This service is not that useful outside of schema form directive
 * but makes the code more testable.
 */
angular.module('schemaForm').provider('schemaForm',
['sfPathProvider', function(sfPathProvider) {
  var stripNullType = function(type) {
    if (Array.isArray(type) && type.length == 2) {
      if (type[0] === 'null')
        return type[1];
      if (type[1] === 'null')
        return type[0];
    }
    return type;
  };

  //Creates an default titleMap list from an enum, i.e. a list of strings.
  var enumToTitleMap = function(enm) {
    var titleMap = []; //canonical titleMap format is a list.
    enm.forEach(function(name) {
      titleMap.push({name: name, value: name});
    });
    return titleMap;
  };

  // Takes a titleMap in either object or list format and returns one in
  // in the list format.
  var canonicalTitleMap = function(titleMap, originalEnum) {
    if (!angular.isArray(titleMap)) {
      var canonical = [];
      if (originalEnum) {
        angular.forEach(originalEnum, function(value, index) {
          canonical.push({name: titleMap[value], value: value});
        });
      } else {
        angular.forEach(titleMap, function(name, value) {
          canonical.push({name: name, value: value});
        });
      }
      return canonical;
    }
    return titleMap;
  };

  var defaultFormDefinition = function(name, schema, options) {
    var rules = defaults[stripNullType(schema.type)];
    if (rules) {
      var def;
      for (var i = 0; i < rules.length; i++) {
        def = rules[i](name, schema, options);

        //first handler in list that actually returns something is our handler!
        if (def) {

          // Do we have form defaults in the schema under the x-schema-form-attribute?
          if (def.schema['x-schema-form'] && angular.isObject(def.schema['x-schema-form'])) {
            def = angular.extend(def, def.schema['x-schema-form']);
          }

          return def;
        }
      }
    }
  };

  //Creates a form object with all common properties
  var stdFormObj = function(name, schema, options) {
    options = options || {};
    var f = options.global && options.global.formDefaults ?
            angular.copy(options.global.formDefaults) : {};
    if (options.global && options.global.supressPropertyTitles === true) {
      f.title = schema.title;
    } else {
      f.title = schema.title || name;
    }

    if (schema.description) { f.description = schema.description; }
    if (options.required === true || schema.required === true) { f.required = true; }
    if (schema.maxLength) { f.maxlength = schema.maxLength; }
    if (schema.minLength) { f.minlength = schema.maxLength; }
    if (schema.readOnly || schema.readonly) { f.readonly  = true; }
    if (schema.minimum) { f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0); }
    if (schema.maximum) { f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0); }

    // Non standard attributes (DONT USE DEPRECATED)
    // If you must set stuff like this in the schema use the x-schema-form attribute
    if (schema.validationMessage) { f.validationMessage = schema.validationMessage; }
    if (schema.enumNames) { f.titleMap = canonicalTitleMap(schema.enumNames, schema['enum']); }
    f.schema = schema;

    // Ng model options doesn't play nice with undefined, might be defined
    // globally though
    f.ngModelOptions = f.ngModelOptions || {};

    return f;
  };

  var text = function(name, schema, options) {
    if (stripNullType(schema.type) === 'string' && !schema['enum']) {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'text';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  //default in json form for number and integer is a text field
  //input type="number" would be more suitable don't ya think?
  var number = function(name, schema, options) {
    if (stripNullType(schema.type) === 'number') {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'number';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var integer = function(name, schema, options) {
    if (stripNullType(schema.type) === 'integer') {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'number';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var checkbox = function(name, schema, options) {
    if (stripNullType(schema.type) === 'boolean') {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'checkbox';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var select = function(name, schema, options) {
    if (stripNullType(schema.type) === 'string' && schema['enum']) {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'select';
      if (!f.titleMap) {
        f.titleMap = enumToTitleMap(schema['enum']);
      }
      f.trackBy = 'value';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var checkboxes = function(name, schema, options) {
    if (stripNullType(schema.type) === 'array' && schema.items && schema.items['enum']) {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'checkboxes';
      if (!f.titleMap) {
        f.titleMap = enumToTitleMap(schema.items['enum']);
      }
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var fieldset = function(name, schema, options) {
    if (stripNullType(schema.type) === 'object') {
      var f   = stdFormObj(name, schema, options);
      f.type  = 'fieldset';
      f.items = [];
      options.lookup[sfPathProvider.stringify(options.path)] = f;

      //recurse down into properties
      angular.forEach(schema.properties, function(v, k) {
        var path = options.path.slice();
        path.push(k);
        if (options.ignore[sfPathProvider.stringify(path)] !== true) {
          var required = schema.required && schema.required.indexOf(k) !== -1;

          var def = defaultFormDefinition(k, v, {
            path: path,
            required: required || false,
            lookup: options.lookup,
            ignore: options.ignore,
            global: options.global
          });
          if (def) {
            f.items.push(def);
          }
        }
      });

      return f;
    }

  };

  var array = function(name, schema, options) {

    if (stripNullType(schema.type) === 'array') {
      var f   = stdFormObj(name, schema, options);
      f.type  = 'array';
      f.key   = options.path;
      options.lookup[sfPathProvider.stringify(options.path)] = f;

      var required = schema.required &&
                     schema.required.indexOf(options.path[options.path.length - 1]) !== -1;

      // The default is to always just create one child. This works since if the
      // schemas items declaration is of type: "object" then we get a fieldset.
      // We also follow json form notatation, adding empty brackets "[]" to
      // signify arrays.

      var arrPath = options.path.slice();
      arrPath.push('');

      f.items = [defaultFormDefinition(name, schema.items, {
        path: arrPath,
        required: required || false,
        lookup: options.lookup,
        ignore: options.ignore,
        global: options.global
      })];

      return f;
    }

  };

  //First sorted by schema type then a list.
  //Order has importance. First handler returning an form snippet will be used.
  var defaults = {
    string:  [select, text],
    object:  [fieldset],
    number:  [number],
    integer: [integer],
    boolean: [checkbox],
    array:   [checkboxes, array]
  };

  var postProcessFn = function(form) { return form; };

  /**
   * Provider API
   */
  this.defaults              = defaults;
  this.stdFormObj            = stdFormObj;
  this.defaultFormDefinition = defaultFormDefinition;

  /**
   * Register a post process function.
   * This function is called with the fully merged
   * form definition (i.e. after merging with schema)
   * and whatever it returns is used as form.
   */
  this.postProcess = function(fn) {
    postProcessFn = fn;
  };

  /**
   * Append default form rule
   * @param {string}   type json schema type
   * @param {Function} rule a function(propertyName,propertySchema,options) that returns a form
   *                        definition or undefined
   */
  this.appendRule = function(type, rule) {
    if (!defaults[type]) {
      defaults[type] = [];
    }
    defaults[type].push(rule);
  };

  /**
   * Prepend default form rule
   * @param {string}   type json schema type
   * @param {Function} rule a function(propertyName,propertySchema,options) that returns a form
   *                        definition or undefined
   */
  this.prependRule = function(type, rule) {
    if (!defaults[type]) {
      defaults[type] = [];
    }
    defaults[type].unshift(rule);
  };

  /**
   * Utility function to create a standard form object.
   * This does *not* set the type of the form but rather all shared attributes.
   * You probably want to start your rule with creating the form with this method
   * then setting type and any other values you need.
   * @param {Object} schema
   * @param {Object} options
   * @return {Object} a form field defintion
   */
  this.createStandardForm = stdFormObj;
  /* End Provider API */

  this.$get = function() {

    var service = {};

    service.merge = function(schema, form, ignore, options, readonly) {
      form  = form || ['*'];
      options = options || {};

      // Get readonly from root object
      readonly = readonly || schema.readonly || schema.readOnly;

      var stdForm = service.defaults(schema, ignore, options);

      //simple case, we have a "*", just put the stdForm there
      var idx = form.indexOf('*');
      if (idx !== -1) {
        form  = form.slice(0, idx)
                    .concat(stdForm.form)
                    .concat(form.slice(idx + 1));
      }

      //ok let's merge!
      //We look at the supplied form and extend it with schema standards
      var lookup = stdForm.lookup;

      return postProcessFn(form.map(function(obj) {

        //handle the shortcut with just a name
        if (typeof obj === 'string') {
          obj = {key: obj};
        }

        if (obj.key) {
          if (typeof obj.key === 'string') {
            obj.key = sfPathProvider.parse(obj.key);
          }
        }

        //If it has a titleMap make sure it's a list
        if (obj.titleMap) {
          obj.titleMap = canonicalTitleMap(obj.titleMap);
        }

        if(obj.type === 'select') {
          obj.trackBy = obj.trackBy || 'value';
        }

        //
        if (obj.itemForm) {
          obj.items = [];
          var str = sfPathProvider.stringify(obj.key);
          var stdForm = lookup[str];
          angular.forEach(stdForm.items, function(item) {
            var o = angular.copy(obj.itemForm);
            o.key = item.key;
            obj.items.push(o);
          });
        }

        //extend with std form from schema.
        if (obj.key) {
          var strid = sfPathProvider.stringify(obj.key);
          if (lookup[strid]) {
            var schemaDefaults = lookup[strid];
            angular.forEach(schemaDefaults, function(value, attr) {
              if (obj[attr] === undefined) {
                obj[attr] = schemaDefaults[attr];
              }
            });
          }
        }

        // Are we inheriting readonly?
        if (readonly === true) { // Inheriting false is not cool.
          obj.readonly = true;
        }

        //if it's a type with items, merge 'em!
        if (obj.items) {
          obj.items = service.merge(schema, obj.items, ignore, options, obj.readonly);
        }

        //if its has tabs, merge them also!
        if (obj.tabs) {
          angular.forEach(obj.tabs, function(tab) {
            tab.items = service.merge(schema, tab.items, ignore, options, obj.readonly);
          });
        }

        // Special case: checkbox
        // Since have to ternary state we need a default
        if (obj.type === 'checkbox' && angular.isUndefined(obj.schema['default'])) {
          obj.schema['default'] = false;
        }

        return obj;
      }));
    };

    /**
     * Create form defaults from schema
     */
    service.defaults = function(schema, ignore, globalOptions) {
      var form   = [];
      var lookup = {}; //Map path => form obj for fast lookup in merging
      ignore = ignore || {};
      globalOptions = globalOptions || {};

      if (stripNullType(schema.type) === 'object') {
        angular.forEach(schema.properties, function(v, k) {
          if (ignore[k] !== true) {
            var required = schema.required && schema.required.indexOf(k) !== -1;
            var def = defaultFormDefinition(k, v, {
              path: [k],         // Path to this property in bracket notation.
              lookup: lookup,    // Extra map to register with. Optimization for merger.
              ignore: ignore,    // The ignore list of paths (sans root level name)
              required: required, // Is it required? (v4 json schema style)
              global: globalOptions // Global options, including form defaults
            });
            if (def) {
              form.push(def);
            }
          }
        });

      } else {
        throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
      }
      return {form: form, lookup: lookup};
    };

    //Utility functions
    /**
     * Traverse a schema, applying a function(schema,path) on every sub schema
     * i.e. every property of an object.
     */
    service.traverseSchema = function(schema, fn, path, ignoreArrays) {
      ignoreArrays = angular.isDefined(ignoreArrays) ? ignoreArrays : true;

      path = path || [];

      var traverse = function(schema, fn, path) {
        fn(schema, path);
        angular.forEach(schema.properties, function(prop, name) {
          var currentPath = path.slice();
          currentPath.push(name);
          traverse(prop, fn, currentPath);
        });

        //Only support type "array" which have a schema as "items".
        if (!ignoreArrays && schema.items) {
          var arrPath = path.slice(); arrPath.push('');
          traverse(schema.items, fn, arrPath);
        }
      };

      traverse(schema, fn, path || []);
    };

    service.traverseForm = function(form, fn) {
      fn(form);
      angular.forEach(form.items, function(f) {
        service.traverseForm(f, fn);
      });

      if (form.tabs) {
        angular.forEach(form.tabs, function(tab) {
          angular.forEach(tab.items, function(f) {
            service.traverseForm(f, fn);
          });
        });
      }
    };

    return service;
  };

}]);

/*  Common code for validating a value against its form and schema definition */
/* global tv4 */
angular.module('schemaForm').factory('sfValidator', [function() {

  var validator = {};

  /**
   * Validate a value against its form definition and schema.
   * The value should either be of proper type or a string, some type
   * coercion is applied.
   *
   * @param {Object} form A merged form definition, i.e. one with a schema.
   * @param {Any} value the value to validate.
   * @return a tv4js result object.
   */
  validator.validate = function(form, value) {
    if (!form) {
      return {valid: true};
    }
    var schema = form.schema;

    if (!schema) {
      return {valid: true};
    }

    // Input of type text and textareas will give us a viewValue of ''
    // when empty, this is a valid value in a schema and does not count as something
    // that breaks validation of 'required'. But for our own sanity an empty field should
    // not validate if it's required.
    if (value === '') {
      value = undefined;
    }

    // Numbers fields will give a null value, which also means empty field
    if (form.type === 'number' && value === null) {
      value = undefined;
    }

    // Version 4 of JSON Schema has the required property not on the
    // property itself but on the wrapping object. Since we like to test
    // only this property we wrap it in a fake object.
    var wrap = {type: 'object', 'properties': {}};
    var propName = form.key[form.key.length - 1];
    wrap.properties[propName] = schema;

    if (form.required) {
      wrap.required = [propName];
    }
    var valueWrap = {};
    if (angular.isDefined(value)) {
      valueWrap[propName] = value;
    }
    return tv4.validateResult(valueWrap, wrap);

  };

  return validator;
}]);

/**
 * Directive that handles the model arrays
 */
angular.module('schemaForm').directive('sfArray', ['sfSelect', 'schemaForm', 'sfValidator', 'sfPath',
  function(sfSelect, schemaForm, sfValidator, sfPath) {

    var setIndex = function(index) {
      return function(form) {
        if (form.key) {
          form.key[form.key.indexOf('')] = index;
        }
      };
    };

    return {
      restrict: 'A',
      scope: true,
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        var formDefCache = {};

        scope.validateArray = angular.noop;

        if (ngModel) {
          // We need the ngModelController on several places,
          // most notably for errors.
          // So we emit it up to the decorator directive so it can put it on scope.
          scope.$emit('schemaFormPropagateNgModelController', ngModel);
        }


        // Watch for the form definition and then rewrite it.
        // It's the (first) array part of the key, '[]' that needs a number
        // corresponding to an index of the form.
        var once = scope.$watch(attrs.sfArray, function(form) {

          // An array model always needs a key so we know what part of the model
          // to look at. This makes us a bit incompatible with JSON Form, on the
          // other hand it enables two way binding.
          var list = sfSelect(form.key, scope.model);

          // We only modify the same array instance but someone might change the array from
          // the outside so let's watch for that. We use an ordinary watch since the only case
          // we're really interested in is if its a new instance.
          scope.$watch('model' + sfPath.normalize(form.key), function(value) {
            list = scope.modelArray = value;
          });

          // Since ng-model happily creates objects in a deep path when setting a
          // a value but not arrays we need to create the array.
          if (angular.isUndefined(list)) {
            list = [];
            sfSelect(form.key, scope.model, list);
          }
          scope.modelArray = list;

          // Arrays with titleMaps, i.e. checkboxes doesn't have items.
          if (form.items) {

            // To be more compatible with JSON Form we support an array of items
            // in the form definition of "array" (the schema just a value).
            // for the subforms code to work this means we wrap everything in a
            // section. Unless there is just one.
            var subForm = form.items[0];
            if (form.items.length > 1) {
              subForm = {
                type: 'section',
                items: form.items.map(function(item) {
                  item.ngModelOptions = form.ngModelOptions;
                  if (angular.isUndefined(item.readonly)) {
                    item.readonly = form.readonly;
                  }
                  return item;
                })
              };
            }

          }

          // We ceate copies of the form on demand, caching them for
          // later requests
          scope.copyWithIndex = function(index) {
            if (!formDefCache[index]) {
              if (subForm) {
                var copy = angular.copy(subForm);
                copy.arrayIndex = index;
                schemaForm.traverseForm(copy, setIndex(index));
                formDefCache[index] = copy;
              }
            }
            return formDefCache[index];
          };

          scope.appendToArray = function() {
            var len = list.length;
            var copy = scope.copyWithIndex(len);
            schemaForm.traverseForm(copy, function(part) {

              if (part.key) {
                var def;
                if (angular.isDefined(part['default'])) {
                  def = part['default'];
                }
                if (angular.isDefined(part.schema) &&
                    angular.isDefined(part.schema['default'])) {
                  def = part.schema['default'];
                }

                if (angular.isDefined(def)) {
                  sfSelect(part.key, scope.model, def);
                }
              }
            });

            // If there are no defaults nothing is added so we need to initialize
            // the array. undefined for basic values, {} or [] for the others.
            if (len === list.length) {
              var type = sfSelect('schema.items.type', form);
              var dflt;
              if (type === 'object') {
                dflt = {};
              } else if (type === 'array') {
                dflt = [];
              }
              list.push(dflt);
            }

            // Trigger validation.
            scope.validateArray();
            return list;
          };

          scope.deleteFromArray = function(index) {
            list.splice(index, 1);

            // Trigger validation.
            scope.validateArray();

            // Angular 1.2 lacks setDirty
            if (ngModel && ngModel.$setDirty) {
              ngModel.$setDirty();
            }
            return list;
          };

          // Always start with one empty form unless configured otherwise.
          // Special case: don't do it if form has a titleMap
          if (!form.titleMap && form.startEmpty !== true && list.length === 0) {
            scope.appendToArray();
          }

          // Title Map handling
          // If form has a titleMap configured we'd like to enable looping over
          // titleMap instead of modelArray, this is used for intance in
          // checkboxes. So instead of variable number of things we like to create
          // a array value from a subset of values in the titleMap.
          // The problem here is that ng-model on a checkbox doesn't really map to
          // a list of values. This is here to fix that.
          if (form.titleMap && form.titleMap.length > 0) {
            scope.titleMapValues = [];

            // We watch the model for changes and the titleMapValues to reflect
            // the modelArray
            var updateTitleMapValues = function(arr) {
              scope.titleMapValues = [];
              arr = arr || [];

              form.titleMap.forEach(function(item) {
                scope.titleMapValues.push(arr.indexOf(item.value) !== -1);
              });
            };
            //Catch default values
            updateTitleMapValues(scope.modelArray);
            scope.$watchCollection('modelArray', updateTitleMapValues);

            //To get two way binding we also watch our titleMapValues
            scope.$watchCollection('titleMapValues', function(vals, old) {
              if (vals && vals !== old) {
                var arr = scope.modelArray;

                // Apparently the fastest way to clear an array, readable too.
                // http://jsperf.com/array-destroy/32
                while (arr.length > 0) {
                  arr.pop();
                }
                form.titleMap.forEach(function(item, index) {
                  if (vals[index]) {
                    arr.push(item.value);
                  }
                });

                // Time to validate the rebuilt array.
                scope.validateArray();
              }
            });
          }

          // If there is a ngModel present we need to validate when asked.
          if (ngModel) {
            var error;

            scope.validateArray = function() {
              // The actual content of the array is validated by each field
              // so we settle for checking validations specific to arrays

              // Since we prefill with empty arrays we can get the funny situation
              // where the array is required but empty in the gui but still validates.
              // Thats why we check the length.
              var result = sfValidator.validate(
                form,
                scope.modelArray.length > 0 ? scope.modelArray : undefined
              );

              // TODO: DRY this up, it has a lot of similarities with schema-validate
              // Since we might have different tv4 errors we must clear all
              // errors that start with tv4-
              Object.keys(ngModel.$error)
                    .filter(function(k) { return k.indexOf('tv4-') === 0; })
                    .forEach(function(k) { ngModel.$setValidity(k, true); });

              if (result.valid === false &&
                  result.error &&
                  (result.error.dataPath === '' ||
                  result.error.dataPath === '/' + form.key[form.key.length - 1])) {

                // Set viewValue to trigger $dirty on field. If someone knows a
                // a better way to do it please tell.
                ngModel.$setViewValue(scope.modelArray);
                error = result.error;
                ngModel.$setValidity('tv4-' + result.error.code, false);
              }
            };

            scope.$on('schemaFormValidate', scope.validateArray);

            scope.hasSuccess = function() {
              return ngModel.$valid && !ngModel.$pristine;
            };

            scope.hasError = function() {
              return ngModel.$invalid;
            };

            scope.schemaError = function() {
              return error;
            };

          }

          once();
        });
      }
    };
  }
]);

/**
 * A version of ng-changed that only listens if
 * there is actually a onChange defined on the form
 *
 * Takes the form definition as argument.
 * If the form definition has a "onChange" defined as either a function or
 */
angular.module('schemaForm').directive('sfChanged', function() {
  return {
    require: 'ngModel',
    restrict: 'AC',
    scope: false,
    link: function(scope, element, attrs, ctrl) {
      var form = scope.$eval(attrs.sfChanged);
      //"form" is really guaranteed to be here since the decorator directive
      //waits for it. But best be sure.
      if (form && form.onChange) {
        ctrl.$viewChangeListeners.push(function() {
          if (angular.isFunction(form.onChange)) {
            form.onChange(ctrl.$modelValue, form);
          } else {
            scope.evalExpr(form.onChange, {'modelValue': ctrl.$modelValue, form: form});
          }
        });
      }
    }
  };
});

angular.module('schemaForm').directive('sfField',
    ['$parse', '$compile', '$http', '$templateCache', '$interpolate', '$q', 'sfErrorMessage',
     'sfPath','sfSelect',
    function($parse,  $compile,  $http,  $templateCache, $interpolate, $q, sfErrorMessage,
             sfPath, sfSelect) {

      return {
        restrict: 'AE',
        replace: false,
        transclude: false,
        scope: true,
        require: '?^sfSchema',
        link: {
          pre: function(scope) {
            //The ngModelController is used in some templates and
            //is needed for error messages,
            scope.$on('schemaFormPropagateNgModelController', function(event, ngModel) {
              event.stopPropagation();
              event.preventDefault();
              scope.ngModel = ngModel;
            });

            //make sure to overwrite form here so that we don't inherit it by accident
            scope.form = null;
          },
          post: function(scope, element, attrs, sfSchema) {

            //Keep error prone logic from the template
            scope.showTitle = function() {
              return scope.form && scope.form.notitle !== true && scope.form.title;
            };

            scope.listToCheckboxValues = function(list) {
              var values = {};
              angular.forEach(list, function(v) {
                values[v] = true;
              });
              return values;
            };

            scope.checkboxValuesToList = function(values) {
              var lst = [];
              angular.forEach(values, function(v, k) {
                if (v) {
                  lst.push(k);
                }
              });
              return lst;
            };

            scope.buttonClick = function($event, form) {
              if (angular.isFunction(form.onClick)) {
                form.onClick($event, form);
              } else if (angular.isString(form.onClick)) {
                if (sfSchema) {
                  //evaluating in scope outside of sfSchemas isolated scope
                  sfSchema.evalInParentScope(form.onClick, {'$event': $event, form: form});
                } else {
                  scope.$eval(form.onClick, {'$event': $event, form: form});
                }
              }
            };

            /**
             * Evaluate an expression, i.e. scope.$eval
             * but do it in sfSchemas parent scope sf-schema directive is used
             * @param {string} expression
             * @param {Object} locals (optional)
             * @return {Any} the result of the expression
             */
            scope.evalExpr = function(expression, locals) {
              if (sfSchema) {
                //evaluating in scope outside of sfSchemas isolated scope
                return sfSchema.evalInParentScope(expression, locals);
              }

              return scope.$eval(expression, locals);
            };

            /**
             * Evaluate an expression, i.e. scope.$eval
             * in this decorators scope
             * @param {string} expression
             * @param {Object} locals (optional)
             * @return {Any} the result of the expression
             */
            scope.evalInScope = function(expression, locals) {
              if (expression) {
                return scope.$eval(expression, locals);
              }
            };

            /**
             * Interpolate the expression.
             * Similar to `evalExpr()` and `evalInScope()`
             * but will not fail if the expression is
             * text that contains spaces.
             *
             * Use the Angular `{{ interpolation }}`
             * braces to access properties on `locals`.
             *
             * @param  {string} content The string to interpolate.
             * @param  {Object} locals (optional) Properties that may be accessed in the
             *                         `expression` string.
             * @return {Any} The result of the expression or `undefined`.
             */
            scope.interp = function(expression, locals) {
              return (expression && $interpolate(expression)(locals));
            };

            //This works since we ot the ngModel from the array or the schema-validate directive.
            scope.hasSuccess = function() {
              if (!scope.ngModel) {
                return false;
              }
              return scope.ngModel.$valid &&
                  (!scope.ngModel.$pristine || !scope.ngModel.$isEmpty(scope.ngModel.$modelValue));
            };

            scope.hasError = function() {
              if (!scope.ngModel) {
                return false;
              }
              return scope.ngModel.$invalid && !scope.ngModel.$pristine;
            };

            /**
             * DEPRECATED: use sf-messages instead.
             * Error message handler
             * An error can either be a schema validation message or a angular js validtion
             * error (i.e. required)
             */
            scope.errorMessage = function(schemaError) {
              return sfErrorMessage.interpolate(
                (schemaError && schemaError.code + '') || 'default',
                (scope.ngModel && scope.ngModel.$modelValue) || '',
                (scope.ngModel && scope.ngModel.$viewValue) || '',
                scope.form,
                scope.options && scope.options.validationMessage
              );
            };

            // Rebind our part of the form to the scope.
            var once = scope.$watch(attrs.sfField, function(form) {
              if (form) {
                // Workaround for 'updateOn' error from ngModelOptions
                // see https://github.com/Textalk/angular-schema-form/issues/255
                // and https://github.com/Textalk/angular-schema-form/issues/206
                form.ngModelOptions = form.ngModelOptions || {};
                scope.form  = form;


                // Where there is a key there is probably a ngModel
                if (form.key) {
                  // It looks better with dot notation.
                  scope.$on(
                    'schemaForm.error.' + form.key.join('.'),
                    function(event, error, validationMessage, validity) {
                      if (validationMessage === true || validationMessage === false) {
                        validity = validationMessage;
                        validationMessage = undefined;
                      }

                      if (scope.ngModel && error) {
                        if (scope.ngModel.$setDirty) {
                          scope.ngModel.$setDirty();
                        } else {
                          // FIXME: Check that this actually works on 1.2
                          scope.ngModel.$dirty = true;
                          scope.ngModel.$pristine = false;
                        }

                        // Set the new validation message if one is supplied
                        // Does not work when validationMessage is just a string.
                        if (validationMessage) {
                          if (!form.validationMessage) {
                            form.validationMessage = {};
                          }
                          form.validationMessage[error] = validationMessage;
                        }

                        scope.ngModel.$setValidity(error, validity === true);

                        if (validity === true) {
                          // Setting or removing a validity can change the field to believe its valid
                          // but its not. So lets trigger its validation as well.
                          scope.$broadcast('schemaFormValidate');
                        }
                      }
                  });

                  // Clean up the model when the corresponding form field is $destroy-ed.
                  // Default behavior can be supplied as a globalOption, and behavior can be overridden in the form definition.
                  scope.$on('$destroy', function() {
                    // If the entire schema form is destroyed we don't touch the model
                    if (!scope.externalDestructionInProgress) {
                      var destroyStrategy = form.destroyStrategy ||
                                            (scope.options && scope.options.destroyStrategy) || 'remove';
                      // No key no model, and we might have strategy 'retain'
                      if (form.key && destroyStrategy !== 'retain') {

                        // Get the object that has the property we wan't to clear.
                        var obj = scope.model;
                        if (form.key.length > 1) {
                          obj = sfSelect(form.key.slice(0, form.key.length - 1), obj);
                        }

                        // We can get undefined here if the form hasn't been filled out entirely
                        if (obj === undefined) {
                          return;
                        }

                        // Type can also be a list in JSON Schema
                        var type = (form.schema && form.schema.type) || '';

                        // Empty means '',{} and [] for appropriate types and undefined for the rest
                        //console.log('destroy', destroyStrategy, form.key, type, obj);
                        if (destroyStrategy === 'empty' && type.indexOf('string') !== -1) {
                          obj[form.key.slice(-1)] = '';
                        } else if (destroyStrategy === 'empty' && type.indexOf('object') !== -1) {
                          obj[form.key.slice(-1)] = {};
                        } else if (destroyStrategy === 'empty' && type.indexOf('array') !== -1) {
                          obj[form.key.slice(-1)] = [];
                        } else if (destroyStrategy === 'null') {
                          obj[form.key.slice(-1)] = null;
                        } else {
                          delete obj[form.key.slice(-1)];
                        }
                      }
                    }
                  });
                }

                once();
              }
            });
          }
        }
      };
    }
  ]);

angular.module('schemaForm').directive('sfMessage',
['$injector', 'sfErrorMessage', function($injector, sfErrorMessage) {
  return {
    scope: false,
    restrict: 'EA',
    link: function(scope, element, attrs) {

      //Inject sanitizer if it exists
      var $sanitize = $injector.has('$sanitize') ?
                      $injector.get('$sanitize') : function(html) { return html; };

      var message = '';

      if (attrs.sfMessage) {
        scope.$watch(attrs.sfMessage, function(msg) {
          if (msg) {
            message = $sanitize(msg);
            if (scope.ngModel) {
              update(scope.ngModel.$valid);
            } else {
              update();
            }
          }
        });
      }

      var update = function(valid) {
        if (valid && !scope.hasError()) {
          element.html(message);
        } else {


          var errors = [];
          angular.forEach(((scope.ngModel && scope.ngModel.$error) || {}), function(status, code) {
            if (status) {
              // if true then there is an error
              // Angular 1.3 removes properties, so we will always just have errors.
              // Angular 1.2 sets them to false.
              errors.push(code);
            }
          });

          // In Angular 1.3 we use one $validator to stop the model value from getting updated.
          // this means that we always end up with a 'schemaForm' error.
          errors = errors.filter(function(e) { return e !== 'schemaForm'; });

          // We only show one error.
          // TODO: Make that optional
          var error = errors[0];
          if (error) {
            element.html(sfErrorMessage.interpolate(
              error,
              scope.ngModel.$modelValue,
              scope.ngModel.$viewValue,
              scope.form,
              scope.options && scope.options.validationMessage
            ));
          } else {
            element.html(message);
          }
        }
      };
      update();

      scope.$watchCollection('ngModel.$error', function() {
        if (scope.ngModel) {
          update(scope.ngModel.$valid);
        }
      });

    }
  };
}]);

/*
FIXME: real documentation
<form sf-form="form"  sf-schema="schema" sf-decorator="foobar"></form>
*/

angular.module('schemaForm')
       .directive('sfSchema',
['$compile', 'schemaForm', 'schemaFormDecorators', 'sfSelect', 'sfPath', 'sfBuilder',
  function($compile,  schemaForm,  schemaFormDecorators, sfSelect, sfPath, sfBuilder) {

    return {
      scope: {
        schema: '=sfSchema',
        initialForm: '=sfForm',
        model: '=sfModel',
        options: '=sfOptions'
      },
      controller: ['$scope', function($scope) {
        this.evalInParentScope = function(expr, locals) {
          return $scope.$parent.$eval(expr, locals);
        };
      }],
      replace: false,
      restrict: 'A',
      transclude: true,
      require: '?form',
      link: function(scope, element, attrs, formCtrl, transclude) {

        //expose form controller on scope so that we don't force authors to use name on form
        scope.formCtrl = formCtrl;

        //We'd like to handle existing markup,
        //besides using it in our template we also
        //check for ng-model and add that to an ignore list
        //i.e. even if form has a definition for it or form is ["*"]
        //we don't generate it.
        var ignore = {};
        transclude(scope, function(clone) {
          clone.addClass('schema-form-ignore');
          element.prepend(clone);

          if (element[0].querySelectorAll) {
            var models = element[0].querySelectorAll('[ng-model]');
            if (models) {
              for (var i = 0; i < models.length; i++) {
                var key = models[i].getAttribute('ng-model');
                //skip first part before .
                ignore[key.substring(key.indexOf('.') + 1)] = true;
              }
            }
          }
        });

        var lastDigest = {};
        var childScope;

        // Common renderer function, can either be triggered by a watch or by an event.
        var render = function(schema, form) {
          var merged = schemaForm.merge(schema, form, ignore, scope.options);

          // Create a new form and destroy the old one.
          // Not doing keeps old form elements hanging around after
          // they have been removed from the DOM
          // https://github.com/Textalk/angular-schema-form/issues/200
          if (childScope) {
            // Destroy strategy should not be acted upon
            scope.externalDestructionInProgress = true;
            childScope.$destroy();
            scope.externalDestructionInProgress = false;
          }
          childScope = scope.$new();

          //make the form available to decorators
          childScope.schemaForm  = {form:  merged, schema: schema};

          //clean all but pre existing html.
          element.children(':not(.schema-form-ignore)').remove();

          // Find all slots.
          var slots = {};
          var slotsFound = element[0].querySelectorAll('*[sf-insert-field]');

          for (var i = 0; i < slotsFound.length; i++) {
            slots[slotsFound[i].getAttribute('sf-insert-field')] = slotsFound[i];
          }

          // if sfUseDecorator is undefined the default decorator is used.
          var decorator = schemaFormDecorators.decorator(attrs.sfUseDecorator);

          // Use the builder to build it and append the result
          element[0].appendChild( sfBuilder.build(merged, decorator, slots) );

          //compile only children
          $compile(element.children())(childScope);

          //ok, now that that is done let's set any defaults
          if (!scope.options || scope.options.setSchemaDefaults !== false) {
            schemaForm.traverseSchema(schema, function(prop, path) {
              if (angular.isDefined(prop['default'])) {
                var val = sfSelect(path, scope.model);
                if (angular.isUndefined(val)) {
                  sfSelect(path, scope.model, prop['default']);
                }
              }
            });
          }

          scope.$emit('sf-render-finished', element);
        };

        //Since we are dependant on up to three
        //attributes we'll do a common watch
        scope.$watch(function() {

          var schema = scope.schema;
          var form   = scope.initialForm || ['*'];

          //The check for schema.type is to ensure that schema is not {}
          if (form && schema && schema.type &&
              (lastDigest.form !== form || lastDigest.schema !== schema) &&
              Object.keys(schema.properties).length > 0) {
            lastDigest.schema = schema;
            lastDigest.form = form;

            render(schema, form);
          }
        });

        // We also listen to the event schemaFormRedraw so you can manually trigger a change if
        // part of the form or schema is chnaged without it being a new instance.
        scope.$on('schemaFormRedraw', function() {
          var schema = scope.schema;
          var form   = scope.initialForm || ['*'];
          if (schema) {
            render(schema, form);
          }
        });

        scope.$on('$destroy', function() {
          // Each field listens to the $destroy event so that it can remove any value
          // from the model if that field is removed from the form. This is the default
          // destroy strategy. But if the entire form (or at least the part we're on)
          // gets removed, like when routing away to another page, then we definetly want to
          // keep the model intact. So therefore we set a flag to tell the others it's time to just
          // let it be.
          scope.externalDestructionInProgress = true;
        });
      }
    };
  }
]);

angular.module('schemaForm').directive('schemaValidate', ['sfValidator', '$parse', 'sfSelect',
  function(sfValidator, $parse, sfSelect) {

    return {
      restrict: 'A',
      scope: false,
      // We want the link function to be *after* the input directives link function so we get access
      // the parsed value, ex. a number instead of a string
      priority: 500,
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {

        // We need the ngModelController on several places,
        // most notably for errors.
        // So we emit it up to the decorator directive so it can put it on scope.
        scope.$emit('schemaFormPropagateNgModelController', ngModel);

        var error = null;

        // When using the new builder we might not have form just yet
        var once = scope.$watch(attrs.schemaValidate, function(form) {
          if (!form) {
            return;
          }

          if (form.copyValueTo) {
            ngModel.$viewChangeListeners.push(function() {
              var paths = form.copyValueTo;
              angular.forEach(paths, function(path) {
                sfSelect(path, scope.model, ngModel.$modelValue);
              });
            });
          }

          // Validate against the schema.

          var validate = function(viewValue) {
            //Still might be undefined
            if (!form) {
              return viewValue;
            }

            // Omit TV4 validation
            if (scope.options && scope.options.tv4Validation === false) {
              return viewValue;
            }

            var result =  sfValidator.validate(form, viewValue);


            // Since we might have different tv4 errors we must clear all
            // errors that start with tv4-
            Object.keys(ngModel.$error)
                .filter(function(k) { return k.indexOf('tv4-') === 0; })
                .forEach(function(k) { ngModel.$setValidity(k, true); });

            if (!result.valid) {
              // it is invalid, return undefined (no model update)
              ngModel.$setValidity('tv4-' + result.error.code, false);
              error = result.error;

              // In Angular 1.3+ return the viewValue, otherwise we inadvertenly
              // will trigger a 'parse' error.
              // we will stop the model value from updating with our own $validator
              // later.
              if (ngModel.$validators) {
                return viewValue;
              }
              // Angular 1.2 on the other hand lacks $validators and don't add a 'parse' error.
              return undefined;
            }
            return viewValue;
          };

          // Custom validators, parsers, formatters etc
          if (typeof form.ngModel === 'function') {
            form.ngModel(ngModel);
          }

          ['$parsers', '$viewChangeListeners', '$formatters'].forEach(function(attr) {
            if (form[attr] && ngModel[attr]) {
              form[attr].forEach(function(fn) {
                ngModel[attr].push(fn);
              });
            }
          });

          ['$validators', '$asyncValidators'].forEach(function(attr) {
            // Check if our version of angular has validators, i.e. 1.3+
            if (form[attr] && ngModel[attr]) {
              angular.forEach(form[attr], function(fn, name) {
                ngModel[attr][name] = fn;
              });
            }
          });

          // Get in last of the parses so the parsed value has the correct type.
          // We don't use $validators since we like to set different errors depending tv4 error codes
          ngModel.$parsers.push(validate);

          // But we do use one custom validator in the case of Angular 1.3 to stop the model from
          // updating if we've found an error.
          if (ngModel.$validators) {
            ngModel.$validators.schemaForm = function() {
              // Any error and we're out of here!
              return !Object.keys(ngModel.$error).some(function(e) { return e !== 'schemaForm'});
            }
          }

          // Listen to an event so we can validate the input on request
          scope.$on('schemaFormValidate', function() {

            // We set the viewValue to trigger parsers,
            // since modelValue might be empty and validating just that
            // might change an existing error to a "required" error message.
            if (ngModel.$setDirty) {

              // Angular 1.3+
              ngModel.$setDirty();
              ngModel.$setViewValue(ngModel.$viewValue);
              ngModel.$commitViewValue();

              // In Angular 1.3 setting undefined as a viewValue does not trigger parsers
              // so we need to do a special required check. Fortunately we have $isEmpty
              if (form.required && ngModel.$isEmpty(ngModel.$modelValue)) {
                ngModel.$setValidity('tv4-302', false);
              }

            } else {
              // Angular 1.2
              // In angular 1.2 setting a viewValue of undefined will trigger the parser.
              // hence required works.
              ngModel.$setViewValue(ngModel.$viewValue);
            }

          });

          scope.schemaError = function() {
            return error;
          };

          // Just watch once.
          once();
        });
      }
    };
  }]);

return schemaForm;
}));
