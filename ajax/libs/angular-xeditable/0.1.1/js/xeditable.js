/*!
angular-xeditable - 0.1.1
Edit-in-place for angular.js
Build date: 2013-09-19 
*/
/*
angular-xeditable module
*/
angular.module('xeditable', [])
.value('editableOptions', {
  theme: 'default' //bs2, bs3,
});


/*
EditableController: attached to editable element
TODO: this file should be refactored to works without closures!
*/
angular.module('xeditable').factory('editableController', function($q) { 
 
  //EditableController function
  EditableController.$invect = ['$scope', '$attrs', '$element', '$parse', 'editableThemes', 'editableOptions', '$rootScope', '$compile', '$q'];
  function EditableController($scope, $attrs, $element, $parse, editableThemes, editableOptions, $rootScope, $compile, $q) {
    var valueGetter;

    //if control is disabled - it does not participate in waiting process
    var inWaiting;

    var self = this;

    self.scope = $scope;
    self.elem = $element;
    self.attrs = $attrs;
    self.inputEl = null;
    self.editorEl = null;
    self.hasForm = false;
    self.error = '';
    self.theme =  editableThemes[editableOptions.theme] || editableThemes['default'];
    self.parent = {};
 
    //to be overwritten
    self.inputTpl = '';
    self.directiveName = '';

    //init
    self.init = function(hasForm) {
      self.hasForm = hasForm;

      self.name = $attrs.eName || $attrs[self.directiveName];
      /*
      if(!$attrs[directiveName] && !$attrs.eNgModel && ($attrs.eValue === undefined)) {
        throw 'You should provide value for `'+directiveName+'` or `e-value` in editable element!';
      }
      */
      if($attrs[self.directiveName]) {
        valueGetter = $parse($attrs[self.directiveName]);
      } else {
        throw 'You should provide value for `'+self.directiveName+'` in editable element!';
      }

      //build input
      /*
      if(hasForm) {
        self.valueString = '$form.$data["' + ($attrs.eName || $attrs[self.directiveName]) + '"]';
      } else {
        self.valueString = '$form.$data' + ($attrs.eName ? '.'+$attrs.eName : '');
      }
      */
      //self.valueString = '$form.$data' + ($attrs.eName ? '.'+$attrs.eName : '');

      // self.inputEl = angular.element(self.inputTpl);
 
      self.render();

      //if name defined --> watch changes and update $data in form
      if($attrs.eName) {
        self.scope.$watch('$data', function(newVal){
          self.scope.$form.$data[$attrs.eName] = newVal;
        });
      }

      //onshow
      if($attrs.onshow) {
        self.onshow = function() {
          return self.catchError($parse($attrs.onshow)($scope));
        };
      }

      //onbeforesave
      if ($attrs.onbeforesave) {
        self.onbeforesave = function() {
          return self.catchError($parse($attrs.onbeforesave)($scope));
        };
      }

      //onaftersave
      if ($attrs.onaftersave) {
        self.onaftersave = function() {
          return self.catchError($parse($attrs.onaftersave)($scope));
        };
      }
    };

    self.render = function() {
      var theme = self.theme;

      //build input
      self.inputEl = angular.element(self.inputTpl);

      //build controls
      self.controlsEl = angular.element(theme.controlsTpl);
      self.controlsEl.append(self.inputEl);

      //build buttons
      if(!self.hasForm) {
        self.buttonsEl = angular.element(theme.buttonsTpl);
        self.submitEl = angular.element(theme.submitTpl);
        self.cancelEl = angular.element(theme.cancelTpl);
        self.buttonsEl.append(self.submitEl).append(self.cancelEl);
        self.controlsEl.append(self.buttonsEl);
      }

      //build error
      self.errorEl = angular.element(theme.errorTpl);
      self.controlsEl.append(self.errorEl);

      //build editor
      self.editorEl = angular.element(self.hasForm ? theme.noformTpl : theme.formTpl);
      self.editorEl.append(self.controlsEl);

      //attach attributes:

      //transfer `e-*` attributes
      for(var k in $attrs.$attr) {
        if(k === 'eForm' || k === 'eNgSubmit') {
          continue;
        }
        if (k.substring(0, 1) === 'e' && k.substring(1, 2) === k.substring(1, 2).toUpperCase()) {
          //cut "e-"
          var v = $attrs.$attr[k].substring(2);
          //workaround for attributes without value (e.g. `multiple = "multiple"`)
          var attrValue = ($attrs[k] === '') ? v : $attrs[k];
          self.inputEl.attr(v, attrValue);
        }
      } 

      self.inputEl.attr('ng-model', '$data');

      if(!self.hasForm) {
        self.editorEl.attr('editable-form', '$form');
      }

      //apply `postrender` method of theme
      if(angular.isFunction(theme.postrender)) {
        theme.postrender.call(self);
      }
    };

    //show
    self.show = function() {
      //set value
      self.scope.$data = angular.copy(valueGetter($scope.$parent));

      //insert editor into DOM
      $element.after(self.editorEl);

      //compile needed to attach events (submit, keydown)
      $compile(self.editorEl)($scope);

      //hide element
      $element.addClass('editable-hide');

      //onshow
      return self.onshow();
    };

    //hide
    self.hide = function() {
      //console.log('editable hide', self.name);
      self.editorEl.remove();
      $element.removeClass('editable-hide');
    };

    //setWaiting
    self.setWaiting = function(value) {
      if (value) {
        //participate in waiting only if not disabled
        inWaiting = !self.inputEl.attr('disabled');
        if (inWaiting) {
          self.inputEl.attr('disabled', 'disabled');
          if(self.buttonsEl) {
            self.buttonsEl.find('button').attr('disabled', 'disabled');
          }
        }
      } else {
        if (inWaiting) {
          self.inputEl.removeAttr('disabled');
          if (self.buttonsEl) {
            self.buttonsEl.find('button').removeAttr('disabled');
          }
        }
      }
    };

    self.activate = function() {
      setTimeout(function() {
        self.inputEl[0].focus();
      }, 0);
    };

    self.setError = function(msg) {
      if(!angular.isObject(msg)) {
        $scope.$error = msg;
        self.error = msg;
      }
    };

    /*
    Checks that result is string or promise returned string and shows it as error message
    Applied to onshow, onbeforesave, onaftersave
    */
    self.catchError = function(result, noPromise) {
      if (angular.isObject(result) && noPromise !== true) {
        $q.when(result).then(
          //success anf fail handlers are equal
          angular.bind(this, function(r) {
            this.catchError(r, true);
          }),
          angular.bind(this, function(r) {
            this.catchError(r, true);
          })
        );
      //check $http error
      } else if (noPromise && angular.isObject(result) && result.status &&
        (result.status !== 200) && result.data && angular.isString(result.data)) {
        this.setError(result.data);
        //set result to string: to let form know that there was error
        result = result.data;
      } else if (angular.isString(result)) {
        this.setError(result);
      }
      return result;
    };

    self.save = function() {
      valueGetter.assign($scope.$parent, angular.copy(self.scope.$data));
    };

    self.onshow = angular.noop;
    self.onbeforesave = angular.noop;
    self.onaftersave = angular.noop;
  }

  return EditableController;
});

/*
editableFactory: 
- attaches editableController to element
- used to generate editable directives

Depends on: editableController, editableFormFactory 
*/
angular.module('xeditable').factory('editableDirectiveFactory', 
function($parse, $compile, editableThemes, $rootScope, $document, editableController, editableFormController) {

  //directive object
  return function(overwrites) {
    return { 
      restrict: 'A',
      scope: true,
      require: [overwrites.directiveName, '?^form'],
      controller: editableController,
      link: function(scope, elem, attrs, ctrl) {
        //console.log('link directive', attrs[overwrites.directiveName]);
        
        //editable controller
        var eCtrl = ctrl[0];

        //form controller        
        var eFormCtrl;
        var hasForm = false;

        //if not inside form, but we have `e-form`: 
        //check if form exists somewhere in scope. If exists - bind, otherwise create.
        if(ctrl[1]) {
          eFormCtrl = ctrl[1];
          hasForm = true;
        } else if(attrs.eForm) {
          var getter = $parse(attrs.eForm)(scope);
          if(getter) { //getter defined, form above
            eFormCtrl = getter;
            hasForm = true;
          } else { //form below or not exist: check document.forms
            for(var i=0; i<$document[0].forms.length;i++){
              if($document[0].forms[i].name === attrs.eForm) {
                //form is below and not processed yet
                eFormCtrl = null;
                hasForm = true; 
                break;
              }
            }
          }
        }

        /*
        if(hasForm && !attrs.eName) {
          throw 'You should provide `e-name` for editable element inside form!';
        }
        */

        //check for `editable-form` attr in form
        /*
        if(eFormCtrl && ) {
          throw 'You should provide `e-name` for editable element inside form!';
        }
        */

        //store original props before merge
        angular.forEach(overwrites, function(v, k) {
          if(eCtrl[k] !== undefined) {
            eCtrl.parent[k] = eCtrl[k];
          }
        });

        //merge overwrites to base editable controller
        angular.extend(eCtrl, overwrites);

        //init editable ctrl
        eCtrl.init(hasForm);

        //publich editable controller as `$editable` to be referenced in html
        scope.$editable = eCtrl;


        // hasForm
        if(hasForm) {
          if(eFormCtrl) {
            scope.$form = eFormCtrl;
            if(!scope.$form.$addEditable) {
              throw 'Form with editable elements should have `editable-form` attribute.';
            }
            scope.$form.$addEditable(eCtrl);
          } else {
            // future form (below): add editable controller to buffer
            $rootScope.$$editableBuffer = $rootScope.$$editableBuffer || {};
            $rootScope.$$editableBuffer[attrs.eForm] = $rootScope.$$editableBuffer[attrs.eForm] || [];
            $rootScope.$$editableBuffer[attrs.eForm].push(eCtrl);            
            scope.$form = null; //will be re-assigned later
          }
        // !hasForm  
        } else {

          //create editableform controller
          scope.$form = editableFormController();
          //add self
          scope.$form.$addEditable(eCtrl);

          //elem.after(self.editorEl);
        //console.log('w:', scope.$$watchers.length);
          //$compile(eCtrl.editorEl)(scope);
          //scope.$form.$addEditable(eCtrl);
        //console.log('w:', scope.$$watchers.length);
          //eCtrl.editorEl.remove();

          //if `e-form` provided, publish local $form in scope
          if(attrs.eForm) {
            scope.$parent[attrs.eForm] = scope.$form;
          } 

          //bind click - if no external form defined
          if(!attrs.eForm) {
            elem.addClass('editable-click');
            elem.bind('click', function(e) { 
              e.preventDefault();
              scope.$apply(function(){
                scope.$form.$show();
              });
            }); 
          }
        }

      }
    };
  };
});

//text
angular.module('xeditable').directive('editableText', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableText',
    inputTpl: '<input type="text">'
  });
});

//select
angular.module('xeditable').directive('editableSelect', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableSelect',
    inputTpl: '<select></select>'
  });
});


//textarea
angular.module('xeditable').directive('editableTextarea', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableTextarea',
    inputTpl: '<textarea ng-keydown="$editable.keydown($event)"></textarea>',
    keydown: function(e) {
      if (e.ctrlKey && (e.keyCode === 13)) {
        this.scope.$form.$submit();
      }
    }
  });
});


//checkbox
angular.module('xeditable').directive('editableCheckbox', function(editableDirectiveFactory) {
  return editableDirectiveFactory({
    directiveName: 'editableCheckbox',
    inputTpl: '<input type="checkbox">',
    render: function() {
      this.parent.render.call(this);
      if(this.attrs.eTitle) {
        this.inputEl.wrap('<label></label>');
        this.inputEl.after(angular.element('<span></span>').text(' '+this.attrs.eTitle));
      }
    }
  });
});







/*
Returns editableForm controller
*/
angular.module('xeditable').factory('editableFormController', function($parse, editablePromiseCollection) {

  var base = {
    $addEditable: function(editable) {
      //console.log('add editable', editable.elem, editable.elem.bind);
      this.$editables.push(editable);
      //'on' is not supported in angular 1.0.8
      //editable.elem.on('$destroy', angular.bind(this, this.$removeEditable, editable));
      editable.elem.bind('$destroy', angular.bind(this, this.$removeEditable, editable));

      //bind editable's local $form to self (if not bound yet, below form) 
      if (!editable.scope.$form) {
        editable.scope.$form = this;
      }
    },

    $removeEditable: function(editable) {
      //arrayRemove
      for(var i=0; i < this.$editables.length; i++) {
        if(this.$editables[i] === editable) {
          this.$editables.splice(i, 1);
          return;
        }
      }
    },

    $show: function() {
      //console.log('eform show');

      this.$visible = true;

      var pc = editablePromiseCollection();

      //own show
      pc.when(this.$onshow());

      //clear errors
      this.$setError(null, '');

      //children show
      angular.forEach(this.$editables, function(editable) {
        pc.when(editable.show());
      });

      //wait promises and activate
      pc.then({
        onWait: angular.bind(this, this.$setWaiting), 
        onTrue: angular.bind(this, this.$activate), 
        onFalse: angular.bind(this, this.$activate), 
        onString: angular.bind(this, this.$activate)
      });
    },

    $activate: function(name) {
      var i;
      if (this.$editables.length) {
        //activate by name
        if (angular.isString(name)) {
          for(i=0; i<this.$editables.length; i++) {
            if (this.$editables[i].name === name) {
              this.$editables[i].activate();
              return;
            }
          }
        }

        //try activate error field
        for(i=0; i<this.$editables.length; i++) {
          if (this.$editables[i].error) {
            this.$editables[i].activate();
            return;
          }
        }

        //by default activate first field
        this.$editables[0].activate();
      }
    },

    $hide: function() {
      this.$visible = false;
      angular.forEach(this.$editables, function(editable) {
        editable.hide();
      });
    },

    $setWaiting: function(value) {
      this.$waiting = !!value;
      angular.forEach(this.$editables, function(editable) {
        editable.setWaiting(!!value);
      });
    },

    $setError: function(name, msg) {
      angular.forEach(this.$editables, function(editable) {
        if(!name || editable.name === name) {
          editable.setError(msg);
        }
      });
    },

    $submit: function() {
      //console.log('form submit');
      //clear errors
      this.$setError(null, '');

      //children onbeforesave
      var pc = editablePromiseCollection();
      angular.forEach(this.$editables, function(editable) {
        pc.when(editable.onbeforesave());
      });

      /*
      onbeforesave result:
      - true/undefined: save data and close form
      - false: close form without saving
      - string: keep form open and show error
      */
      pc.then({
        onWait: angular.bind(this, this.$setWaiting), 
        onTrue: angular.bind(this, checkSelf, true), 
        onFalse: angular.bind(this, checkSelf, false), 
        onString: angular.bind(this, this.$activate)
      });

      //save
      function checkSelf(childrenTrue){
        //console.log('childrenTrue', childrenTrue);
        var pc = editablePromiseCollection();
        pc.when(this.$onbeforesave());
        pc.then({
          onWait: angular.bind(this, this.$setWaiting), 
          onTrue: childrenTrue ? angular.bind(this, this.$save) : angular.bind(this, this.$hide), 
          onFalse: angular.bind(this, this.$hide), 
          onString: angular.bind(this, this.$activate)
        });
      }
    },

    $save: function() {
      //console.log('form save', this.$data);
      //save each editable
      angular.forEach(this.$editables, function(editable) {
        editable.save();
      });

      //call onaftersave of self and children
      var pc = editablePromiseCollection();
      pc.when(this.$onaftersave());
      angular.forEach(this.$editables, function(editable) {
        pc.when(editable.onaftersave());
      });

      /*
      onaftersave result:
      - true/undefined/false: just close form
      - string: keep form open and show error
      */
      pc.then({
        onWait: angular.bind(this, this.$setWaiting), 
        onTrue: angular.bind(this, this.$hide), 
        onFalse: angular.bind(this, this.$hide), 
        onString: angular.bind(this, this.$activate)
      });
    },

    $onshow: angular.noop,
    $onbeforesave: angular.noop,
    $onaftersave: angular.noop

  };

  return function() {
    return angular.extend({
      $editables: [],
      $visible: false,
      $waiting: false,
      $data: {}
    }, base);
  };
});

/*
EditableForm directive:
- wrap form into editable form: add `onshow` attribute, etc
- read buffered editables
*/
angular.module('xeditable').directive('editableForm', function($rootScope, $parse, editableFormController) {
  return { 
    restrict: 'A',
    require: ['form'],
    //require: ['form', 'editableForm'],
    //controller: EditableFormController,
    compile: function() {
      return {
        pre: function(scope, elem, attrs, ctrl) {
          //console.log('pre form', attrs.name);
          var form = ctrl[0];
          var eForm;

          //if `editableForm` has value - publish smartly under this value
          //this is required only for single editor form that is created and removed
          if(attrs.editableForm) {
            if(scope[attrs.editableForm] && scope[attrs.editableForm].$show) {
              eForm = scope[attrs.editableForm];
              angular.extend(form, eForm);
            } else {
              eForm = editableFormController();
              scope[attrs.editableForm] = eForm;
              angular.extend(eForm, form);
            }
          } else { //just merge to form and publish if form has name
            eForm = editableFormController();
            angular.extend(form, eForm);
          }

          //read editables from buffer (that appeared before FORM tag)
          var buf = $rootScope.$$editableBuffer;
          var name = form.$name;
          if(name && buf && buf[name]) {
            angular.forEach(buf[name], function(editable) {
              eForm.$addEditable(editable);
            });
            delete buf[name];
          }          
        },
        post: function(scope, elem, attrs, ctrl) {
          //console.log('post form', attrs.name);
          var eForm;

          if(attrs.editableForm && scope[attrs.editableForm] && scope[attrs.editableForm].$show) {
            eForm = scope[attrs.editableForm];
          } else {
            eForm = ctrl[0];
          }

          //onshow
          if(attrs.onshow) {
            eForm.$onshow = angular.bind(eForm, $parse(attrs.onshow), scope);
          }

          //onbeforesave, onaftersave
          if(!attrs.ngSubmit && !attrs.submit) {
            if(attrs.onbeforesave) { 
              eForm.$onbeforesave = function() {
                return $parse(attrs.onbeforesave)(scope, {$data: eForm.$data});
              };
            }
            if(attrs.onaftersave) { 
              eForm.$onaftersave = function() {
                return $parse(attrs.onaftersave)(scope, {$data: eForm.$data});
              };
            }
            //elem.on('submit', function(event) {
            elem.bind('submit', function(event) {
              event.preventDefault();
              scope.$apply(function() {
                eForm.$submit();
              });
            });
          }
        }
      };
    }
  };
});
/*
Helpers
*/

/*
Collect results of function calls. Shows waiting if there are promises. 
Finally, applies callbacks if:
- onTrue(): all results are true and all promises resolved to true
- onFalse(): at least one result is false or promise resolved to false
- onString(): at least one result is string or promise rejected or promise resolved to string
*/
angular.module('xeditable').factory('editablePromiseCollection', function($q) { 

  function promiseCollection() {
    return {
      promises: [],
      hasFalse: false,
      hasString: false,
      when: function(result, noPromise) {
        if (result === false) {
          this.hasFalse = true;
        } else if (!noPromise && angular.isObject(result)) {
          this.promises.push($q.when(result));
        } else if (angular.isString(result)){
          this.hasString = true;
        } else { //result === true || result === undefined || result === null
          return;
        }
      },
      //callbacks: onTrue, onFalse, onString
      then: function(callbacks) {
        callbacks = callbacks || {};
        var onTrue = callbacks.onTrue || angular.noop;
        var onFalse = callbacks.onFalse || angular.noop;
        var onString = callbacks.onString || angular.noop;
        var onWait = callbacks.onWait || angular.noop;

        var self = this;

        if (this.promises.length) {
          onWait(true);
          $q.all(this.promises).then(
            //all resolved       
            function(results) {
              onWait(false);
              //check all results via same `when` method (without checking promises)
              angular.forEach(results, function(result) {
                self.when(result, true);  
              });
              applyCallback();
            },
            //some rejected
            function(error) { 
              onWait(false);
              onString();
            }
          );
        } else {
          applyCallback();
        }

        function applyCallback() {
          if (!self.hasString && !self.hasFalse) {
            onTrue();
          } else if (!self.hasString && self.hasFalse) {
            onFalse();
          } else {
            onString();
          }
        }

      }
    };
  }

  return promiseCollection;

});
/*
Editable themes:
- default
- bootstrap 2
- bootstrap 3

Note: in postrender() `this` is instance of editableController
*/
angular.module('xeditable').factory('editableThemes', function() {
  var themes = {
    //default
    'default': {
      formTpl:      '<form class="editable-wrap"></form>',
      noformTpl:    '<span class="editable-wrap"></span>',
      controlsTpl:  '<span class="editable-controls"></span>',
      inputTpl:     '', 
      errorTpl:     '<div class="editable-error" ng-show="$error">{{$error}}</div>',
      buttonsTpl:   '<span class="editable-buttons"></span>',
      submitTpl:    '<button type="submit">save</button>',
      cancelTpl:    '<button type="button" ng-click="$form.$hide()">cancel</button>'
    },

    //bs2
    'bs2': {
      formTpl:     '<form class="form-inline editable-wrap" role="form"></form>',
      noformTpl:   '<span class="editable-wrap"></span>',
      controlsTpl: '<div class="editable-controls controls control-group" ng-class="{\'error\': $error}"></div>',
      inputTpl:    '', 
      errorTpl:    '<div class="editable-error help-block" ng-show="$error">{{$error}}</div>',
      buttonsTpl:  '<span class="editable-buttons"></span>',
      submitTpl:   '<button type="submit" class="btn btn-primary"><span class="icon-ok icon-white"></span></button>',
      cancelTpl:   '<button type="button" class="btn" ng-click="$form.$hide()">'+
                      '<span class="icon-remove"></span>'+
                   '</button>'

    },

    //bs3
    'bs3': {
      formTpl:     '<form class="form-inline editable-wrap" role="form"></form>',
      noformTpl:   '<span class="editable-wrap"></span>',
      controlsTpl: '<div class="editable-controls form-group" ng-class="{\'has-error\': $error}"></div>',
      inputTpl:    '', 
      errorTpl:    '<div class="editable-error help-block" ng-show="$error">{{$error}}</div>',
      buttonsTpl:  '<span class="editable-buttons"></span>',
      submitTpl:   '<button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span></button>',
      cancelTpl:   '<button type="button" class="btn btn-default" ng-click="$form.$hide()">'+
                     '<span class="glyphicon glyphicon-remove"></span>'+
                   '</button>',

      //bs3 specific props to change buttons class: btn-sm, btn-lg              
      buttonsClass: '',                 
      //bs3 specific props to change standard inputs class: input-sm, input-lg
      inputClass: '',                 
      postrender: function() {
        //apply `form-control` class to std inputs
        switch(this.directiveName) {
          case 'editableText':
          case 'editableSelect':
          case 'editableTextarea':
            this.inputEl.addClass('form-control');
            if(this.theme.inputClass) {
              this.inputEl.addClass(this.theme.inputClass);
            }
          break;
        }

        //apply buttonsClass (bs3 specific!)
        if(this.buttonsEl && this.theme.buttonsClass) {
          this.buttonsEl.find('button').addClass(this.theme.buttonsClass);
        }
      } 
    }
  };

  return themes;
});