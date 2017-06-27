/*!
angular-xeditable - 0.1.9
Edit-in-place for angular.js
Build date: 2015-03-26 
*/
/**
 * Angular-xeditable module 
 *
 */
angular.module('xeditable', [])


/**
 * Default options. 
 *
 * @namespace editable-options
 */
//todo: maybe better have editableDefaults, not options...
.value('editableOptions', {
  /**
   * Theme. Possible values `bs3`, `bs2`, `default`.
   * 
   * @var {string} theme
   * @memberOf editable-options
   */  
  theme: 'default',
  /**
   * Icon Set. Possible values `font-awesome`, `default`.
   * 
   * @var {string} icon set
   * @memberOf editable-options
   */  
  icon_set: 'default',
  /**
   * Whether to show buttons for single editalbe element.  
   * Possible values `right` (default), `no`.
   * 
   * @var {string} buttons
   * @memberOf editable-options
   */    
  buttons: 'right',
  /**
   * Default value for `blur` attribute of single editable element.  
   * Can be `cancel|submit|ignore`.
   * 
   * @var {string} blurElem
   * @memberOf editable-options
   */
  blurElem: 'cancel',
  /**
   * Default value for `blur` attribute of editable form.  
   * Can be `cancel|submit|ignore`.
   * 
   * @var {string} blurForm
   * @memberOf editable-options
   */
  blurForm: 'ignore',
  /**
   * How input elements get activated. Possible values: `focus|select|none`.
   *
   * @var {string} activate
   * @memberOf editable-options
   */
  activate: 'focus',
  /**
   * Whether to disable x-editable. Can be overloaded on each element.
   *
   * @var {boolean} isDisabled
   * @memberOf editable-options
   */
   isDisabled: false,
  
  /**
   * Event, on which the edit mode gets activated. 
   * Can be any event.
   *
   * @var {string} activationEvent
   * @memberOf editable-options
   */
  activationEvent: 'click'

});

/*
Angular-ui bootstrap datepicker
http://angular-ui.github.io/bootstrap/#/datepicker
*/
angular.module('xeditable').directive('editableBsdate', ['editableDirectiveFactory',
	function(editableDirectiveFactory) {
		return editableDirectiveFactory({
			directiveName: 'editableBsdate',
			inputTpl: '<div></div>',
			render: function() {
				/** This basically renders a datepicker as in the example shown in 
				**  http://angular-ui.github.io/bootstrap/#/datepicker
				**  The attributes are all the same as in the bootstrap-ui datepicker with e- as prefix
				**/
				this.parent.render.call(this);

				var inputDatePicker = angular.element('<input type="text" class="form-control" ng-model="$data"/>');
				var buttonDatePicker = angular.element('<button type="button" class="btn btn-default"><i class="glyphicon glyphicon-calendar"></i></button>');
				var buttonWrapper = angular.element('<span class="input-group-btn"></span>');

				inputDatePicker.attr('datepicker-popup', this.attrs.eDatepickerPopupXEditable || 'yyyy/MM/dd' );
				inputDatePicker.attr('is-open', this.attrs.eIsOpen);
				inputDatePicker.attr('date-disabled', this.attrs.eDateDisabled);
				inputDatePicker.attr('datepicker-popup', this.attrs.eDatepickerPopup);
				inputDatePicker.attr('datepicker-mode', this.attrs.eDatepickerMode || 'day');
				inputDatePicker.attr('min-date', this.attrs.eMinDate);
				inputDatePicker.attr('max-date', this.attrs.eMaxDate);
				inputDatePicker.attr('show-weeks', this.attrs.eShowWeeks || true);
				inputDatePicker.attr('starting-day', this.attrs.eStartingDay || 0);
				inputDatePicker.attr('init-date', this.attrs.eInitDate || new Date());
				inputDatePicker.attr('min-mode', this.attrs.eMinMode || 'day');
				inputDatePicker.attr('max-mode', this.attrs.eMaxMode || 'year');
				inputDatePicker.attr('format-day', this.attrs.eFormatDay || 'dd');
				inputDatePicker.attr('format-month', this.attrs.eFormatMonth || 'MMMM');
				inputDatePicker.attr('format-year', this.attrs.eFormatYear || 'yyyy');
				inputDatePicker.attr('format-day-header', this.attrs.eFormatDayHeader || 'EEE');
				inputDatePicker.attr('format-day-title', this.attrs.eFormatDayTitle || 'MMMM yyyy');
				inputDatePicker.attr('format-month-title', this.attrs.eFormatMonthTitle || 'yyyy');
				inputDatePicker.attr('year-range', this.attrs.eYearRange || 20);
				inputDatePicker.attr('show-button-bar', this.attrs.eShowButtonBar || true);
				inputDatePicker.attr('current-text', this.attrs.eCurrentText || 'Today');
				inputDatePicker.attr('clear-text', this.attrs.eClearText || 'Clear');
				inputDatePicker.attr('close-text', this.attrs.eCloseText || 'Done');
				inputDatePicker.attr('close-on-date-selection', this.attrs.eCloseOnDateSelection || true);
				inputDatePicker.attr('date-picker-append-to-body', this.attrs.eDatePickerAppendToBody || false);
				inputDatePicker.attr('date-disabled', this.attrs.eDateDisabled);

				buttonDatePicker.attr('ng-click',this.attrs.eNgClick);

				buttonWrapper.append(buttonDatePicker);
				this.inputEl.prepend(inputDatePicker);
				this.inputEl.append(buttonWrapper);

				this.inputEl.removeAttr('class');
				this.inputEl.attr('class','input-group');

			}
    });
}]);
/*
Angular-ui bootstrap editable timepicker
http://angular-ui.github.io/bootstrap/#/timepicker
*/
angular.module('xeditable').directive('editableBstime', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableBstime',
      inputTpl: '<timepicker></timepicker>',
      render: function() {
        this.parent.render.call(this);

        // timepicker can't update model when ng-model set directly to it
        // see: https://github.com/angular-ui/bootstrap/issues/1141
        // so we wrap it into DIV
        var div = angular.element('<div class="well well-small" style="display:inline-block;"></div>');

        // move ng-model to wrapping div
        div.attr('ng-model', this.inputEl.attr('ng-model'));
        this.inputEl.removeAttr('ng-model');

        // move ng-change to wrapping div
        if(this.attrs.eNgChange) {
          div.attr('ng-change', this.inputEl.attr('ng-change'));
          this.inputEl.removeAttr('ng-change');
        }

        // wrap
        this.inputEl.wrap(div);
      }
    });
}]);
//checkbox
angular.module('xeditable').directive('editableCheckbox', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableCheckbox',
      inputTpl: '<input type="checkbox">',
      render: function() {
        this.parent.render.call(this);
        if(this.attrs.eTitle) {
          this.inputEl.wrap('<label></label>');
          this.inputEl.parent().append(this.attrs.eTitle);
        }
      },
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('change', function() {
          setTimeout(function() {
            self.scope.$apply(function() {
              self.scope.$form.$submit();
            });
          }, 500);
        });
      }
    });
}]);

// checklist
angular.module('xeditable').directive('editableChecklist', [
  'editableDirectiveFactory',
  'editableNgOptionsParser',
  function(editableDirectiveFactory, editableNgOptionsParser) {
    return editableDirectiveFactory({
      directiveName: 'editableChecklist',
      inputTpl: '<span></span>',
      useCopy: true,
      render: function() {
        this.parent.render.call(this);
        var parsed = editableNgOptionsParser(this.attrs.eNgOptions);
        var html = '<label ng-repeat="'+parsed.ngRepeat+'">'+
          '<input type="checkbox" checklist-model="$parent.$data" checklist-value="'+parsed.locals.valueFn+'">'+
          '<span ng-bind="'+parsed.locals.displayFn+'"></span></label>';

        this.inputEl.removeAttr('ng-model');
        this.inputEl.removeAttr('ng-options');
        this.inputEl.html(html);
      }
    });
}]);

angular.module('xeditable').directive('editableCombodate', ['editableDirectiveFactory', 'editableCombodate',
  function(editableDirectiveFactory, editableCombodate) {
    return editableDirectiveFactory({
      directiveName: 'editableCombodate',
      inputTpl: '<input type="text">',
      render: function() {
        this.parent.render.call(this);
        var combodate = editableCombodate.getInstance(this.inputEl, {value: new Date(this.scope.$data)});

        var self = this;
        combodate.$widget.find('select').bind('change', function(e) {
          self.scope.$data = (new Date(combodate.getValue())).toISOString();
        });
      }
    });
  }
]);
/*
Input types: text|email|tel|number|url|search|color|date|datetime|time|month|week
*/

(function() {

  var types = 'text|password|email|tel|number|url|search|color|date|datetime|time|month|week|file'.split('|');

  //todo: datalist
  
  // generate directives
  angular.forEach(types, function(type) {
    var directiveName = 'editable'+type.charAt(0).toUpperCase() + type.slice(1);
    angular.module('xeditable').directive(directiveName, ['editableDirectiveFactory',
      function(editableDirectiveFactory) {
        return editableDirectiveFactory({
          directiveName: directiveName,
          inputTpl: '<input type="'+type+'">'
        });
    }]);
  });

  //`range` is bit specific
  angular.module('xeditable').directive('editableRange', ['editableDirectiveFactory',
    function(editableDirectiveFactory) {
      return editableDirectiveFactory({
        directiveName: 'editableRange',
        inputTpl: '<input type="range" id="range" name="range">',
        render: function() {
          this.parent.render.call(this);
          this.inputEl.after('<output>{{$data}}</output>');
        }        
      });
  }]);

}());


// radiolist
angular.module('xeditable').directive('editableRadiolist', [
  'editableDirectiveFactory',
  'editableNgOptionsParser',
  function(editableDirectiveFactory, editableNgOptionsParser) {
    return editableDirectiveFactory({
      directiveName: 'editableRadiolist',
      inputTpl: '<span></span>',
      render: function() {
        this.parent.render.call(this);
        var parsed = editableNgOptionsParser(this.attrs.eNgOptions);
        var html = '<label ng-repeat="'+parsed.ngRepeat+'">'+
          '<input type="radio" ng-disabled="' + this.attrs.eNgDisabled + '" ng-model="$parent.$data" value="{{'+parsed.locals.valueFn+'}}">'+
          '<span ng-bind="'+parsed.locals.displayFn+'"></span></label>';

        this.inputEl.removeAttr('ng-model');
        this.inputEl.removeAttr('ng-options');
        this.inputEl.html(html);
      },
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('change', function() {
          setTimeout(function() {
            self.scope.$apply(function() {
              self.scope.$form.$submit();
            });
          }, 500);
        });
      }
    });
}]);

//select
angular.module('xeditable').directive('editableSelect', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableSelect',
      inputTpl: '<select></select>',
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('change', function() {
          self.scope.$apply(function() {
            self.scope.$form.$submit();
          });
        });
      }
    });
}]);
//textarea
angular.module('xeditable').directive('editableTextarea', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableTextarea',
      inputTpl: '<textarea></textarea>',
      addListeners: function() {
        var self = this;
        self.parent.addListeners.call(self);
        // submit textarea by ctrl+enter even with buttons
        if (self.single && self.buttons !== 'no') {
          self.autosubmit();
        }
      },
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('keydown', function(e) {
          if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13)) {
            self.scope.$apply(function() {
              self.scope.$form.$submit();
            });
          }
        });
      }
    });
}]);

/**
 * EditableController class. 
 * Attached to element with `editable-xxx` directive.
 *
 * @namespace editable-element
 */
/*
TODO: this file should be refactored to work more clear without closures!
*/
angular.module('xeditable').factory('editableController', 
  ['$q', 'editableUtils',
  function($q, editableUtils) {

  //EditableController function
  EditableController.$inject = ['$scope', '$attrs', '$element', '$parse', 'editableThemes', 'editableIcons', 'editableOptions', '$rootScope', '$compile', '$q'];
  function EditableController($scope, $attrs, $element, $parse, editableThemes, editableIcons, editableOptions, $rootScope, $compile, $q) {
    var valueGetter;

    //if control is disabled - it does not participate in waiting process
    var inWaiting;

    var self = this;

    self.scope = $scope;
    self.elem = $element;
    self.attrs = $attrs;
    self.inputEl = null;
    self.editorEl = null;
    self.single = true;
    self.error = '';
    self.theme =  editableThemes[editableOptions.theme] || editableThemes['default'];
    self.parent = {};

    //will be undefined if icon_set is default and theme is default
    self.icon_set = editableOptions.icon_set === 'default' ? editableIcons.default[editableOptions.theme] : editableIcons.external[editableOptions.icon_set];

    //to be overwritten by directive
    self.inputTpl = '';
    self.directiveName = '';

    // with majority of controls copy is not needed, but..
    // copy MUST NOT be used for `select-multiple` with objects as items
    // copy MUST be used for `checklist`
    self.useCopy = false;

    //runtime (defaults)
    self.single = null;

    /**
     * Attributes defined with `e-*` prefix automatically transfered from original element to
     * control.  
     * For example, if you set `<span editable-text="user.name" e-style="width: 100px"`>
     * then input will appear as `<input style="width: 100px">`.  
     * See [demo](#text-customize).
     * 
     * @var {any|attribute} e-*
     * @memberOf editable-element
     */ 

    /**
     * Whether to show ok/cancel buttons. Values: `right|no`.
     * If set to `no` control automatically submitted when value changed.  
     * If control is part of form buttons will never be shown. 
     * 
     * @var {string|attribute} buttons
     * @memberOf editable-element
     */    
    self.buttons = 'right'; 
    /**
     * Action when control losses focus. Values: `cancel|submit|ignore`.
     * Has sense only for single editable element.
     * Otherwise, if control is part of form - you should set `blur` of form, not of individual element.
     * 
     * @var {string|attribute} blur
     * @memberOf editable-element
     */     
    // no real `blur` property as it is transfered to editable form

    //init
    self.init = function(single) {
      self.single = single;

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

      // settings for single and non-single
      if (!self.single) {
        // hide buttons for non-single
        self.buttons = 'no';
      } else {
        self.buttons = self.attrs.buttons || editableOptions.buttons;
      }

      //if name defined --> watch changes and update $data in form
      if($attrs.eName) {
        self.scope.$watch('$data', function(newVal){
          self.scope.$form.$data[$attrs.eName] = newVal;
        });
      }

      /**
       * Called when control is shown.  
       * See [demo](#select-remote).
       * 
       * @var {method|attribute} onshow
       * @memberOf editable-element
       */
      if($attrs.onshow) {
        self.onshow = function() {
          return self.catchError($parse($attrs.onshow)($scope));
        };
      }

      /**
       * Called when control is hidden after both save or cancel.  
       * 
       * @var {method|attribute} onhide
       * @memberOf editable-element
       */
      if($attrs.onhide) {
        self.onhide = function() {
          return $parse($attrs.onhide)($scope);
        };
      }

      /**
       * Called when control is cancelled.  
       * 
       * @var {method|attribute} oncancel
       * @memberOf editable-element
       */
      if($attrs.oncancel) {
        self.oncancel = function() {
          return $parse($attrs.oncancel)($scope);
        };
      }          

      /**
       * Called during submit before value is saved to model.  
       * See [demo](#onbeforesave).
       * 
       * @var {method|attribute} onbeforesave
       * @memberOf editable-element
       */
      if ($attrs.onbeforesave) {
        self.onbeforesave = function() {
          return self.catchError($parse($attrs.onbeforesave)($scope));
        };
      }

      /**
       * Called during submit after value is saved to model.  
       * See [demo](#onaftersave).
       * 
       * @var {method|attribute} onaftersave
       * @memberOf editable-element
       */
      if ($attrs.onaftersave) {
        self.onaftersave = function() {
          return self.catchError($parse($attrs.onaftersave)($scope));
        };
      }

      // watch change of model to update editable element
      // now only add/remove `editable-empty` class.
      // Initially this method called with newVal = undefined, oldVal = undefined
      // so no need initially call handleEmpty() explicitly
      $scope.$parent.$watch($attrs[self.directiveName], function(newVal, oldVal) {
        self.setLocalValue();
        self.handleEmpty();
      });
    };

    self.render = function() {
      var theme = self.theme;

      //build input
      self.inputEl = angular.element(self.inputTpl);

      //build controls
      self.controlsEl = angular.element(theme.controlsTpl);
      self.controlsEl.append(self.inputEl);

      //build buttons
      if(self.buttons !== 'no') {
        self.buttonsEl = angular.element(theme.buttonsTpl);
        self.submitEl = angular.element(theme.submitTpl);
        self.cancelEl = angular.element(theme.cancelTpl);
        if(self.icon_set) {
          self.submitEl.find('span').addClass(self.icon_set.ok);
          self.cancelEl.find('span').addClass(self.icon_set.cancel);
        }
        self.buttonsEl.append(self.submitEl).append(self.cancelEl);
        self.controlsEl.append(self.buttonsEl);
        
        self.inputEl.addClass('editable-has-buttons');
      }

      //build error
      self.errorEl = angular.element(theme.errorTpl);
      self.controlsEl.append(self.errorEl);

      //build editor
      self.editorEl = angular.element(self.single ? theme.formTpl : theme.noformTpl);
      self.editorEl.append(self.controlsEl);

      // transfer `e-*|data-e-*|x-e-*` attributes
      for(var k in $attrs.$attr) {
        if(k.length <= 1) {
          continue;
        }
        var transferAttr = false;
        var nextLetter = k.substring(1, 2);

        // if starts with `e` + uppercase letter
        if(k.substring(0, 1) === 'e' && nextLetter === nextLetter.toUpperCase()) {
          transferAttr = k.substring(1); // cut `e`
        } else {
          continue;
        }
        
        // exclude `form` and `ng-submit`, 
        if(transferAttr === 'Form' || transferAttr === 'NgSubmit') {
          continue;
        }

        // convert back to lowercase style
        transferAttr = transferAttr.substring(0, 1).toLowerCase() + editableUtils.camelToDash(transferAttr.substring(1));  

        // workaround for attributes without value (e.g. `multiple = "multiple"`)
        // except for 'e-value'
        var attrValue = (transferAttr !== 'value' && $attrs[k] === '') ? transferAttr : $attrs[k];

        // set attributes to input
        self.inputEl.attr(transferAttr, attrValue);
      }

      self.inputEl.addClass('editable-input');
      self.inputEl.attr('ng-model', '$data');

      // add directiveName class to editor, e.g. `editable-text`
      self.editorEl.addClass(editableUtils.camelToDash(self.directiveName));

      if(self.single) {
        self.editorEl.attr('editable-form', '$form');
        // transfer `blur` to form
        self.editorEl.attr('blur', self.attrs.blur || (self.buttons === 'no' ? 'cancel' : editableOptions.blurElem));
      }

      //apply `postrender` method of theme
      if(angular.isFunction(theme.postrender)) {
        theme.postrender.call(self);
      }

    };

    // with majority of controls copy is not needed, but..
    // copy MUST NOT be used for `select-multiple` with objects as items
    // copy MUST be used for `checklist`
    self.setLocalValue = function() {
      self.scope.$data = self.useCopy ? 
        angular.copy(valueGetter($scope.$parent)) : 
        valueGetter($scope.$parent);
    };

    //show
    self.show = function() {
      // set value of scope.$data
      self.setLocalValue();

      /*
      Originally render() was inside init() method, but some directives polluting editorEl,
      so it is broken on second openning.
      Cloning is not a solution as jqLite can not clone with event handler's.
      */
      self.render();

      // insert into DOM
      $element.after(self.editorEl);

      // compile (needed to attach ng-* events from markup)
      $compile(self.editorEl)($scope);

      // attach listeners (`escape`, autosubmit, etc)
      self.addListeners();

      // hide element
      $element.addClass('editable-hide');

      // onshow
      return self.onshow();
    };

    //hide
    self.hide = function() {
      
      self.editorEl.remove();
      $element.removeClass('editable-hide');

      // onhide
      return self.onhide();
    };

    // cancel
    self.cancel = function() {
      // oncancel
      self.oncancel();
      // don't call hide() here as it called in form's code
    };

    /*
    Called after show to attach listeners
    */
    self.addListeners = function() {
      // bind keyup for `escape`
      self.inputEl.bind('keyup', function(e) {
          if(!self.single) {
            return;
          }

          // todo: move this to editable-form!
          switch(e.keyCode) {
            // hide on `escape` press
            case 27:
              self.scope.$apply(function() {
                self.scope.$form.$cancel();
              });
            break;
          }
      });

      // autosubmit when `no buttons`
      if (self.single && self.buttons === 'no') {
        self.autosubmit();
      }

      // click - mark element as clicked to exclude in document click handler
      self.editorEl.bind('click', function(e) {
        // ignore right/middle button click
        if (e.which && e.which !== 1) {
          return;
        }

        if (self.scope.$form.$visible) {
          self.scope.$form._clicked = true;
        }
      });
    };

    // setWaiting
    self.setWaiting = function(value) {
      if (value) {
        // participate in waiting only if not disabled
        inWaiting = !self.inputEl.attr('disabled') &&
                    !self.inputEl.attr('ng-disabled') &&
                    !self.inputEl.attr('ng-enabled');
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

    self.activate = function(start, end) {
      setTimeout(function() {
        var el = self.inputEl[0];
        if (editableOptions.activate === 'focus' && el.focus) {
          if(start){
            end = end || start;
            el.onfocus = function(){
              var that = this;
              setTimeout(function(){
                that.setSelectionRange(start,end);
              });
            };
          }
          el.focus();
        }
        if (editableOptions.activate === 'select' && el.select) {
          el.select();
        }
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
          //success and fail handlers are equal
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
      valueGetter.assign($scope.$parent,
          self.useCopy ? angular.copy(self.scope.$data) : self.scope.$data);

      // no need to call handleEmpty here as we are watching change of model value
      // self.handleEmpty();
    };

    /*
    attach/detach `editable-empty` class to element
    */
    self.handleEmpty = function() {
      var val = valueGetter($scope.$parent);
      var isEmpty = val === null || val === undefined || val === "" || (angular.isArray(val) && val.length === 0); 
      $element.toggleClass('editable-empty', isEmpty);
    };

    /*
    Called when `buttons = "no"` to submit automatically
    */
    self.autosubmit = angular.noop;

    self.onshow = angular.noop;
    self.onhide = angular.noop;
    self.oncancel = angular.noop;
    self.onbeforesave = angular.noop;
    self.onaftersave = angular.noop;
  }

  return EditableController;
}]);

/*
editableFactory is used to generate editable directives (see `/directives` folder)
Inside it does several things:
- detect form for editable element. Form may be one of three types:
  1. autogenerated form (for single editable elements)
  2. wrapper form (element wrapped by <form> tag)
  3. linked form (element has `e-form` attribute pointing to existing form)

- attach editableController to element

Depends on: editableController, editableFormFactory
*/
angular.module('xeditable').factory('editableDirectiveFactory',
['$parse', '$compile', 'editableThemes', '$rootScope', '$document', 'editableController', 'editableFormController', 'editableOptions',
function($parse, $compile, editableThemes, $rootScope, $document, editableController, editableFormController, editableOptions) {

  //directive object
  return function(overwrites) {
    return {
      restrict: 'A',
      scope: true,
      require: [overwrites.directiveName, '?^form'],
      controller: editableController,
      link: function(scope, elem, attrs, ctrl) {
        // editable controller
        var eCtrl = ctrl[0];

        // form controller
        var eFormCtrl;

        // this variable indicates is element is bound to some existing form, 
        // or it's single element who's form will be generated automatically
        // By default consider single element without any linked form.ß
        var hasForm = false;
     
        // element wrapped by form
        if(ctrl[1]) {
          eFormCtrl = ctrl[1];
          hasForm = true;
        } else if(attrs.eForm) { // element not wrapped by <form>, but we hane `e-form` attr
          var getter = $parse(attrs.eForm)(scope);
          if(getter) { // form exists in scope (above), e.g. editable column
            eFormCtrl = getter;
            hasForm = true;
          } else { // form exists below or not exist at all: check document.forms
            for(var i=0; i<$document[0].forms.length;i++){
              if($document[0].forms[i].name === attrs.eForm) {
                // form is below and not processed yet
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

        // store original props to `parent` before merge
        angular.forEach(overwrites, function(v, k) {
          if(eCtrl[k] !== undefined) {
            eCtrl.parent[k] = eCtrl[k];
          }
        });

        // merge overwrites to base editable controller
        angular.extend(eCtrl, overwrites);

        // x-editable can be disabled using editableOption or edit-disabled attribute
        var disabled = angular.isDefined(attrs.editDisabled) ?
          scope.$eval(attrs.editDisabled) :
          editableOptions.isDisabled;

        if (disabled) {
          return;
        }
        
        // init editable ctrl
        eCtrl.init(!hasForm);

        // publich editable controller as `$editable` to be referenced in html
        scope.$editable = eCtrl;

        // add `editable` class to element
        elem.addClass('editable');

        // hasForm
        if(hasForm) {
          if(eFormCtrl) {
            scope.$form = eFormCtrl;
            if(!scope.$form.$addEditable) {
              throw 'Form with editable elements should have `editable-form` attribute.';
            }
            scope.$form.$addEditable(eCtrl);
          } else {
            // future form (below): add editable controller to buffer and add to form later
            $rootScope.$$editableBuffer = $rootScope.$$editableBuffer || {};
            $rootScope.$$editableBuffer[attrs.eForm] = $rootScope.$$editableBuffer[attrs.eForm] || [];
            $rootScope.$$editableBuffer[attrs.eForm].push(eCtrl);
            scope.$form = null; //will be re-assigned later
          }
        // !hasForm
        } else {
          // create editableform controller
          scope.$form = editableFormController();
          // add self to editable controller
          scope.$form.$addEditable(eCtrl);

          // if `e-form` provided, publish local $form in scope
          if(attrs.eForm) {
            scope.$parent[attrs.eForm] = scope.$form;
          }

          // bind click - if no external form defined
          if(!attrs.eForm || attrs.eClickable) {
            elem.addClass('editable-click');
            elem.bind(editableOptions.activationEvent, function(e) {
              e.preventDefault();
              e.editable = eCtrl;
              scope.$apply(function(){
                scope.$form.$show();
              });
            });
          }
        }

      }
    };
  };
}]);

/*
Returns editableForm controller
*/
angular.module('xeditable').factory('editableFormController', 
  ['$parse', '$document', '$rootScope', 'editablePromiseCollection', 'editableUtils',
  function($parse, $document, $rootScope, editablePromiseCollection, editableUtils) {

  // array of opened editable forms
  var shown = [];

  //Check if the child element correspond or is a descendant of the parent element
  var isSelfOrDescendant = function (parent, child) {
    if (child == parent) {
      return true;
    }

    var node = child.parentNode;
    while (node !== null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };
  
  //Check if it is a real blur : if the click event appear on a shown editable elem, this is not a blur.
  var isBlur = function(shown, event) {
    var isBlur = true;

    var editables = shown.$editables;
    angular.forEach(editables, function(v){
      var element = v.editorEl[0];
      if (isSelfOrDescendant(element, event.target))
        isBlur = false;
      
    });
    return isBlur;
  };
  
  // bind click to body: cancel|submit|ignore forms
  $document.bind('click', function(e) {
    // ignore right/middle button click
    if ((e.which && e.which !== 1) || e.isDefaultPrevented()) {
      return;
    }

    var toCancel = [];
    var toSubmit = [];
    for (var i=0; i<shown.length; i++) {

      // exclude clicked
      if (shown[i]._clicked) {
        shown[i]._clicked = false;
        continue;
      }

      // exclude waiting
      if (shown[i].$waiting) {
        continue;
      }

      if (shown[i]._blur === 'cancel' && isBlur(shown[i], e)) {
        toCancel.push(shown[i]);
      }

      if (shown[i]._blur === 'submit' && isBlur(shown[i], e)) {
        toSubmit.push(shown[i]);
      }
    }

    if (toCancel.length || toSubmit.length) {
      $rootScope.$apply(function() {
        angular.forEach(toCancel, function(v){ v.$cancel(); });
        angular.forEach(toSubmit, function(v){ v.$submit(); });
      });
    }
  });
 

  var base = {
    $addEditable: function(editable) {
      //console.log('add editable', editable.elem, editable.elem.bind);
      this.$editables.push(editable);

      //'on' is not supported in angular 1.0.8
      editable.elem.bind('$destroy', angular.bind(this, this.$removeEditable, editable));

      //bind editable's local $form to self (if not bound yet, below form) 
      if (!editable.scope.$form) {
        editable.scope.$form = this;
      }

      //if form already shown - call show() of new editable
      if (this.$visible) {
        editable.catchError(editable.show());
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

    /**
     * Shows form with editable controls.
     * 
     * @method $show()
     * @memberOf editable-form
     */
    $show: function() {
      if (this.$visible) {
        return;
      }

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

      // add to internal list of shown forms
      // setTimeout needed to prevent closing right after opening (e.g. when trigger by button)
      setTimeout(angular.bind(this, function() {
        // clear `clicked` to get ready for clicks on visible form
        this._clicked = false;
        if(editableUtils.indexOf(shown, this) === -1) {
          shown.push(this);
        }
      }), 0);      
    },

    /**
     * Sets focus on form field specified by `name`.
     * 
     * @method $activate(name)
     * @param {string} name name of field
     * @memberOf editable-form
     */
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
        this.$editables[0].activate(this.$editables[0].elem[0].selectionStart, this.$editables[0].elem[0].selectionEnd);
      }
    },

    /**
     * Hides form with editable controls without saving.
     * 
     * @method $hide()
     * @memberOf editable-form
     */
    $hide: function() {
      if (!this.$visible) {
        return;
      }      
      this.$visible = false;
      // self hide
      this.$onhide();
      // children's hide
      angular.forEach(this.$editables, function(editable) {
        editable.hide();
      });

      // remove from internal list of shown forms
      editableUtils.arrayRemove(shown, this);
    },

    /**
     * Triggers `oncancel` event and calls `$hide()`.
     * 
     * @method $cancel()
     * @memberOf editable-form
     */
    $cancel: function() {
      if (!this.$visible) {
        return;
      }      
      // self cancel
      this.$oncancel();
      // children's cancel      
      angular.forEach(this.$editables, function(editable) {
        editable.cancel();
      });
      // self hide
      this.$hide();
    },    

    $setWaiting: function(value) {
      this.$waiting = !!value;
      // we can't just set $waiting variable and use it via ng-disabled in children
      // because in editable-row form is not accessible
      angular.forEach(this.$editables, function(editable) {
        editable.setWaiting(!!value);
      });
    },

    /**
     * Shows error message for particular field.
     * 
     * @method $setError(name, msg)
     * @param {string} name name of field
     * @param {string} msg error message
     * @memberOf editable-form
     */
    $setError: function(name, msg) {
      angular.forEach(this.$editables, function(editable) {
        if(!name || editable.name === name) {
          editable.setError(msg);
        }
      });
    },

    $submit: function() {
      if (this.$waiting) {
        return;
      } 

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
      // write model for each editable
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
    $oncancel: angular.noop,
    $onhide: angular.noop,
    $onbeforesave: angular.noop,
    $onaftersave: angular.noop
  };

  return function() {
    return angular.extend({
      $editables: [],
      /**
       * Form visibility flag.
       * 
       * @var {bool} $visible
       * @memberOf editable-form
       */
      $visible: false,
      /**
       * Form waiting flag. It becomes `true` when form is loading or saving data.
       * 
       * @var {bool} $waiting
       * @memberOf editable-form
       */
      $waiting: false,
      $data: {},
      _clicked: false,
      _blur: null
    }, base);
  };
}]);

/**
 * EditableForm directive. Should be defined in <form> containing editable controls.  
 * It add some usefull methods to form variable exposed to scope by `name="myform"` attribute.
 *
 * @namespace editable-form
 */
angular.module('xeditable').directive('editableForm',
  ['$rootScope', '$parse', 'editableFormController', 'editableOptions',
  function($rootScope, $parse, editableFormController, editableOptions) {
    return {
      restrict: 'A',
      require: ['form'],
      //require: ['form', 'editableForm'],
      //controller: EditableFormController,
      compile: function() {
        return {
          pre: function(scope, elem, attrs, ctrl) {
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
            var eForm;

            if(attrs.editableForm && scope[attrs.editableForm] && scope[attrs.editableForm].$show) {
              eForm = scope[attrs.editableForm];
            } else {
              eForm = ctrl[0];
            }

            /**
             * Called when form is shown.
             * 
             * @var {method|attribute} onshow 
             * @memberOf editable-form
             */
            if(attrs.onshow) {
              eForm.$onshow = angular.bind(eForm, $parse(attrs.onshow), scope);
            }

            /**
             * Called when form hides after both save or cancel.
             * 
             * @var {method|attribute} onhide 
             * @memberOf editable-form
             */
            if(attrs.onhide) {
              eForm.$onhide = angular.bind(eForm, $parse(attrs.onhide), scope);
            }

            /**
             * Called when form is cancelled.
             * 
             * @var {method|attribute} oncancel
             * @memberOf editable-form
             */
            if(attrs.oncancel) {
              eForm.$oncancel = angular.bind(eForm, $parse(attrs.oncancel), scope);
            }

            /**
             * Whether form initially rendered in shown state.
             *
             * @var {bool|attribute} shown
             * @memberOf editable-form
             */
            if(attrs.shown && $parse(attrs.shown)(scope)) {
              eForm.$show();
            }

            /**
             * Action when form losses focus. Values: `cancel|submit|ignore`.
             * Default is `ignore`.
             * 
             * @var {string|attribute} blur
             * @memberOf editable-form
             */
            eForm._blur = attrs.blur || editableOptions.blurForm;

            // onbeforesave, onaftersave
            if(!attrs.ngSubmit && !attrs.submit) {
              /**
               * Called after all children `onbeforesave` callbacks but before saving form values
               * to model.  
               * If at least one children callback returns `non-string` - it will not not be called.  
               * See [editable-form demo](#editable-form) for details.
               * 
               * @var {method|attribute} onbeforesave
               * @memberOf editable-form
               * 
               */
              if(attrs.onbeforesave) {
                eForm.$onbeforesave = function() {
                  return $parse(attrs.onbeforesave)(scope, {$data: eForm.$data});
                };
              }

              /**
               * Called when form values are saved to model.  
               * See [editable-form demo](#editable-form) for details.
               * 
               * @var {method|attribute} onaftersave 
               * @memberOf editable-form
               * 
               */
              if(attrs.onaftersave) {
                eForm.$onaftersave = function() {
                  return $parse(attrs.onaftersave)(scope, {$data: eForm.$data});
                };
              }

              elem.bind('submit', function(event) {
                event.preventDefault();
                scope.$apply(function() {
                  eForm.$submit();
                });
              });
            }


            // click - mark form as clicked to exclude in document click handler
            elem.bind('click', function(e) {
              // ignore right/middle button click
              if (e.which && e.which !== 1) {
                return;
              }

              if (eForm.$visible) {
                eForm._clicked = true;
              }
            });   

          }
        };
      }
    };
}]);
/**
 * editablePromiseCollection
 *  
 * Collect results of function calls. Shows waiting if there are promises. 
 * Finally, applies callbacks if:
 * - onTrue(): all results are true and all promises resolved to true
 * - onFalse(): at least one result is false or promise resolved to false
 * - onString(): at least one result is string or promise rejected or promise resolved to string
 */

angular.module('xeditable').factory('editablePromiseCollection', ['$q', function($q) { 

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

}]);

/**
 * editableUtils
 */
 angular.module('xeditable').factory('editableUtils', [function() {
  return {
    indexOf: function (array, obj) {
      if (array.indexOf) return array.indexOf(obj);

      for ( var i = 0; i < array.length; i++) {
        if (obj === array[i]) return i;
      }
      return -1;
    },

    arrayRemove: function (array, value) {
      var index = this.indexOf(array, value);
      if (index >= 0) {
        array.splice(index, 1);
      }
      return value;
    },

    // copy from https://github.com/angular/angular.js/blob/master/src/Angular.js
    camelToDash: function(str) {
      var SNAKE_CASE_REGEXP = /[A-Z]/g;
      return str.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
        return (pos ? '-' : '') + letter.toLowerCase();
      });
    },

    dashToCamel: function(str) {
      var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
      var MOZ_HACK_REGEXP = /^moz([A-Z])/;
      return str.
      replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
  };
}]);

/**
 * editableNgOptionsParser
 *
 * see: https://github.com/angular/angular.js/blob/master/src/ng/directive/select.js#L131
 */
 angular.module('xeditable').factory('editableNgOptionsParser', [function() {
  //0000111110000000000022220000000000000000000000333300000000000000444444444444444000000000555555555555555000000066666666666666600000000000000007777000000000000000000088888
  var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/;

  function parser(optionsExp) {
    var match;

    if (! (match = optionsExp.match(NG_OPTIONS_REGEXP))) {
      throw 'ng-options parse error';
    }

    var 
    displayFn = match[2] || match[1],
    valueName = match[4] || match[6],
    keyName = match[5],
    groupByFn = match[3] || '',
    valueFn = match[2] ? match[1] : valueName,
    valuesFn = match[7],
    track = match[8],
    trackFn = track ? match[8] : null;

    var ngRepeat;
    if (keyName === undefined) { // array
      ngRepeat = valueName + ' in ' + valuesFn;
      if (track !== undefined) {
        ngRepeat += ' track by '+trackFn;
      }
    } else { // object
      ngRepeat = '('+keyName+', '+valueName+') in '+valuesFn;
    }
    
    // group not supported yet
    return {
      ngRepeat: ngRepeat,
      locals: {
        valueName: valueName,
        keyName: keyName,
        valueFn: valueFn,
        displayFn: displayFn
      }
    };
  }

  return parser;
}]);

/**
 * editableCombodate
 *
 * angular version of https://github.com/vitalets/combodate
 */
angular.module('xeditable').factory('editableCombodate', [function() {
  function Combodate(element, options) {
    this.$element = angular.element(element);

    if(this.$element[0].nodeName != 'INPUT') {
      throw 'Combodate should be applied to INPUT element';
    }

    this.defaults = {
      //in this format value stored in original input
      format: 'YYYY-MM-DD HH:mm',
      //in this format items in dropdowns are displayed
      template: 'D / MMM / YYYY   H : mm',
      //initial value, can be `new Date()`
      value: null,
      minYear: 1970,
      maxYear: 2015,
      yearDescending: true,
      minuteStep: 5,
      secondStep: 1,
      firstItem: 'empty', //'name', 'empty', 'none'
      errorClass: null,
      customClass: '',
      roundTime: true, // whether to round minutes and seconds if step > 1
      smartDays: true // whether days in combo depend on selected month: 31, 30, 28
    };

    this.options = angular.extend({}, this.defaults, options);
    this.init();
  }

  Combodate.prototype = {
    constructor: Combodate,
    init: function () {
      this.map = {
        //key   regexp    moment.method
        day:    ['D',    'date'], 
        month:  ['M',    'month'], 
        year:   ['Y',    'year'], 
        hour:   ['[Hh]', 'hours'],
        minute: ['m',    'minutes'], 
        second: ['s',    'seconds'],
        ampm:   ['[Aa]', ''] 
      };
      
      this.$widget = angular.element('<span class="combodate"></span>').html(this.getTemplate());
      
      this.initCombos();
      
      if (this.options.smartDays) {
        var combo = this;
        this.$widget.find('select').bind('change', function(e) {
          // update days count if month or year changes
          if (angular.element(e.target).hasClass('month') || angular.element(e.target).hasClass('year')) {
            combo.fillCombo('day');
          }
        });        
      }

      this.$widget.find('select').css('width', 'auto');

      // hide original input and insert widget                                       
      this.$element.css('display', 'none').after(this.$widget);
      
      // set initial value
      this.setValue(this.$element.val() || this.options.value);
    },
    
    /*
     Replace tokens in template with <select> elements 
     */         
     getTemplate: function() {
      var tpl = this.options.template;
      var customClass = this.options.customClass;

      //first pass
      angular.forEach(this.map, function(v, k) {
        v = v[0]; 
        var r = new RegExp(v+'+');
        var token = v.length > 1 ? v.substring(1, 2) : v;
        
        tpl = tpl.replace(r, '{'+token+'}');
      });

      //replace spaces with &nbsp;
      tpl = tpl.replace(/ /g, '&nbsp;');

      //second pass
      angular.forEach(this.map, function(v, k) {
        v = v[0];
        var token = v.length > 1 ? v.substring(1, 2) : v;

        tpl = tpl.replace('{'+token+'}', '<select class="'+k+' '+customClass+'"></select>');
      });   

      return tpl;
    },
    
    /*
     Initialize combos that presents in template 
     */        
     initCombos: function() {
      for (var k in this.map) {
        var c = this.$widget[0].querySelectorAll('.'+k);
        // set properties like this.$day, this.$month etc.
        this['$'+k] = c.length ? angular.element(c) : null;
        // fill with items
        this.fillCombo(k);
      }
    },

    /*
     Fill combo with items 
     */        
     fillCombo: function(k) {
      var $combo = this['$'+k];
      if (!$combo) {
        return;
      }

      // define method name to fill items, e.g `fillDays`
      var f = 'fill' + k.charAt(0).toUpperCase() + k.slice(1); 
      var items = this[f]();
      var value = $combo.val();

      $combo.html('');
      for(var i=0; i<items.length; i++) {
        $combo.append('<option value="'+items[i][0]+'">'+items[i][1]+'</option>');
      }

      $combo.val(value);
    },

    /*
     Initialize items of combos. Handles `firstItem` option 
     */
     fillCommon: function(key) {
      var values = [], relTime;

      if(this.options.firstItem === 'name') {
        //need both to support moment ver < 2 and  >= 2
        relTime = moment.relativeTime || moment.langData()._relativeTime; 
        var header = typeof relTime[key] === 'function' ? relTime[key](1, true, key, false) : relTime[key];
        //take last entry (see momentjs lang files structure) 
        header = header.split(' ').reverse()[0];                
        values.push(['', header]);
      } else if(this.options.firstItem === 'empty') {
        values.push(['', '']);
      }
      return values;
    },  


    /*
    fill day
    */
    fillDay: function() {
      var items = this.fillCommon('d'), name, i,
      twoDigit = this.options.template.indexOf('DD') !== -1,
      daysCount = 31;

      // detect days count (depends on month and year)
      // originally https://github.com/vitalets/combodate/pull/7
      if (this.options.smartDays && this.$month && this.$year) {
        var month = parseInt(this.$month.val(), 10);
        var year = parseInt(this.$year.val(), 10);

        if (!isNaN(month) && !isNaN(year)) {
          daysCount = moment([year, month]).daysInMonth();
        }
      }

      for (i = 1; i <= daysCount; i++) {
        name = twoDigit ? this.leadZero(i) : i;
        items.push([i, name]);
      }
      return items;
    },
    
    /*
    fill month
    */
    fillMonth: function() {
      var items = this.fillCommon('M'), name, i, 
      longNames = this.options.template.indexOf('MMMM') !== -1,
      shortNames = this.options.template.indexOf('MMM') !== -1,
      twoDigit = this.options.template.indexOf('MM') !== -1;

      for(i=0; i<=11; i++) {
        if(longNames) {
          //see https://github.com/timrwood/momentjs.com/pull/36
          name = moment().date(1).month(i).format('MMMM');
        } else if(shortNames) {
          name = moment().date(1).month(i).format('MMM');
        } else if(twoDigit) {
          name = this.leadZero(i+1);
        } else {
          name = i+1;
        }
        items.push([i, name]);
      } 
      return items;
    },
    
    /*
    fill year
    */
    fillYear: function() {
      var items = [], name, i, 
      longNames = this.options.template.indexOf('YYYY') !== -1;

      for(i=this.options.maxYear; i>=this.options.minYear; i--) {
        name = longNames ? i : (i+'').substring(2);
        items[this.options.yearDescending ? 'push' : 'unshift']([i, name]);
      }
      
      items = this.fillCommon('y').concat(items);
      
      return items;
    },
    
    /*
    fill hour
    */
    fillHour: function() {
      var items = this.fillCommon('h'), name, i,
      h12 = this.options.template.indexOf('h') !== -1,
      h24 = this.options.template.indexOf('H') !== -1,
      twoDigit = this.options.template.toLowerCase().indexOf('hh') !== -1,
      min = h12 ? 1 : 0, 
      max = h12 ? 12 : 23;

      for(i=min; i<=max; i++) {
        name = twoDigit ? this.leadZero(i) : i;
        items.push([i, name]);
      } 
      return items;
    },

    /*
    fill minute
    */
    fillMinute: function() {
      var items = this.fillCommon('m'), name, i,
      twoDigit = this.options.template.indexOf('mm') !== -1;

      for(i=0; i<=59; i+= this.options.minuteStep) {
        name = twoDigit ? this.leadZero(i) : i;
        items.push([i, name]);
      }
      return items;
    },
    
    /*
    fill second
    */
    fillSecond: function() {
      var items = this.fillCommon('s'), name, i,
      twoDigit = this.options.template.indexOf('ss') !== -1;

      for(i=0; i<=59; i+= this.options.secondStep) {
        name = twoDigit ? this.leadZero(i) : i;
        items.push([i, name]);
      }    
      return items;
    },
    
    /*
    fill ampm
    */
    fillAmpm: function() {
      var ampmL = this.options.template.indexOf('a') !== -1,
      ampmU = this.options.template.indexOf('A') !== -1,            
      items = [
      ['am', ampmL ? 'am' : 'AM'],
      ['pm', ampmL ? 'pm' : 'PM']
      ];
      return items;
    },

    /*
     Returns current date value from combos. 
     If format not specified - `options.format` used.
     If format = `null` - Moment object returned.
     */
     getValue: function(format) {
      var dt, values = {}, 
      that = this,
      notSelected = false;

      //getting selected values    
      angular.forEach(this.map, function(v, k) {
        if(k === 'ampm') {
          return;
        }
        var def = k === 'day' ? 1 : 0;

        values[k] = that['$'+k] ? parseInt(that['$'+k].val(), 10) : def; 
        
        if(isNaN(values[k])) {
         notSelected = true;
         return false; 
       }
     });
      
      //if at least one visible combo not selected - return empty string
      if(notSelected) {
       return '';
     }

      //convert hours 12h --> 24h 
      if(this.$ampm) {
        //12:00 pm --> 12:00 (24-h format, midday), 12:00 am --> 00:00 (24-h format, midnight, start of day)
        if(values.hour === 12) {
          values.hour = this.$ampm.val() === 'am' ? 0 : 12;                    
        } else {
          values.hour = this.$ampm.val() === 'am' ? values.hour : values.hour+12;
        }
      }
      
      dt = moment([values.year, values.month, values.day, values.hour, values.minute, values.second]);
      
      //highlight invalid date
      this.highlight(dt);

      format = format === undefined ? this.options.format : format;
      if(format === null) {
       return dt.isValid() ? dt : null; 
     } else {
       return dt.isValid() ? dt.format(format) : ''; 
     }
   },

   setValue: function(value) {
    if(!value) {
      return;
    }

      // parse in strict mode (third param `true`)
      var dt = typeof value === 'string' ? moment(value, this.options.format, true) : moment(value),
      that = this,
      values = {};
      
      //function to find nearest value in select options
      function getNearest($select, value) {
        var delta = {};
        angular.forEach($select.children('option'), function(opt, i){
          var optValue = angular.element(opt).attr('value');

          if(optValue === '') return;
          var distance = Math.abs(optValue - value); 
          if(typeof delta.distance === 'undefined' || distance < delta.distance) {
            delta = {value: optValue, distance: distance};
          } 
        }); 
        return delta.value;
      }
      
      if(dt.isValid()) {
        //read values from date object
        angular.forEach(this.map, function(v, k) {
          if(k === 'ampm') {
            return; 
          }
          values[k] = dt[v[1]]();
        });

        if(this.$ampm) {
          //12:00 pm --> 12:00 (24-h format, midday), 12:00 am --> 00:00 (24-h format, midnight, start of day)
          if(values.hour >= 12) {
            values.ampm = 'pm';
            if(values.hour > 12) {
              values.hour -= 12;
            }
          } else {
            values.ampm = 'am';
            if(values.hour === 0) {
              values.hour = 12;
            }
          }
        }

        angular.forEach(values, function(v, k) {
          //call val() for each existing combo, e.g. this.$hour.val()
          if(that['$'+k]) {

            if(k === 'minute' && that.options.minuteStep > 1 && that.options.roundTime) {
             v = getNearest(that['$'+k], v);
           }
           
           if(k === 'second' && that.options.secondStep > 1 && that.options.roundTime) {
             v = getNearest(that['$'+k], v);
           }                       
           
           that['$'+k].val(v);
         }
       });

        // update days count
        if (this.options.smartDays) {
          this.fillCombo('day');
        }

        this.$element.val(dt.format(this.options.format)).triggerHandler('change');
      }
    },
    
    /*
     highlight combos if date is invalid
     */
     highlight: function(dt) {
      if(!dt.isValid()) {
        if(this.options.errorClass) {
          this.$widget.addClass(this.options.errorClass);
        } else {
          //store original border color
          if(!this.borderColor) {
            this.borderColor = this.$widget.find('select').css('border-color'); 
          }
          this.$widget.find('select').css('border-color', 'red');
        }
      } else {
        if(this.options.errorClass) {
          this.$widget.removeClass(this.options.errorClass);
        } else {
          this.$widget.find('select').css('border-color', this.borderColor);
        }  
      }
    },
    
    leadZero: function(v) {
      return v <= 9 ? '0' + v : v; 
    },
    
    destroy: function() {
      this.$widget.remove();
      this.$element.removeData('combodate').show();
    }

  };

  return {
    getInstance: function(element, options) {
      return new Combodate(element, options);
    }
  };
}]);

/*
Editable icons:
- default
- font-awesome

*/
angular.module('xeditable').factory('editableIcons', function() {

  var icons = {
    //Icon-set to use, defaults to bootstrap icons
    default: {
      'bs2': {
        ok: 'icon-ok icon-white',
        cancel: 'icon-remove'
      },
      'bs3': {
        ok: 'glyphicon glyphicon-ok',
        cancel: 'glyphicon glyphicon-remove'
      }
    },
    external: {
      'font-awesome': {
        ok: 'fa fa-check',
        cancel: 'fa fa-times'
      }
    }
  };

  return icons;
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
      errorTpl:     '<div class="editable-error" ng-show="$error" ng-bind="$error"></div>',
      buttonsTpl:   '<span class="editable-buttons"></span>',
      submitTpl:    '<button type="submit">save</button>',
      cancelTpl:    '<button type="button" ng-click="$form.$cancel()">cancel</button>'
    },

    //bs2
    'bs2': {
      formTpl:     '<form class="form-inline editable-wrap" role="form"></form>',
      noformTpl:   '<span class="editable-wrap"></span>',
      controlsTpl: '<div class="editable-controls controls control-group" ng-class="{\'error\': $error}"></div>',
      inputTpl:    '',
      errorTpl:    '<div class="editable-error help-block" ng-show="$error" ng-bind="$error"></div>',
      buttonsTpl:  '<span class="editable-buttons"></span>',
      submitTpl:   '<button type="submit" class="btn btn-primary"><span></span></button>',
      cancelTpl:   '<button type="button" class="btn" ng-click="$form.$cancel()">'+
                      '<span></span>'+
                   '</button>'

    },

    //bs3
    'bs3': {
      formTpl:     '<form class="form-inline editable-wrap" role="form"></form>',
      noformTpl:   '<span class="editable-wrap"></span>',
      controlsTpl: '<div class="editable-controls form-group" ng-class="{\'has-error\': $error}"></div>',
      inputTpl:    '',
      errorTpl:    '<div class="editable-error help-block" ng-show="$error" ng-bind="$error"></div>',
      buttonsTpl:  '<span class="editable-buttons"></span>',
      submitTpl:   '<button type="submit" class="btn btn-primary"><span></span></button>',
      cancelTpl:   '<button type="button" class="btn btn-default" ng-click="$form.$cancel()">'+
                     '<span></span>'+
                   '</button>',

      //bs3 specific prop to change buttons class: btn-sm, btn-lg
      buttonsClass: '',
      //bs3 specific prop to change standard inputs class: input-sm, input-lg
      inputClass: '',
      postrender: function() {
        //apply `form-control` class to std inputs
        switch(this.directiveName) {
          case 'editableText':
          case 'editableSelect':
          case 'editableTextarea':
          case 'editableEmail':
          case 'editableTel':
          case 'editableNumber':
          case 'editableUrl':
          case 'editableSearch':
          case 'editableDate':
          case 'editableDatetime':
          case 'editableBsdate':
          case 'editableTime':
          case 'editableMonth':
          case 'editableWeek':
            this.inputEl.addClass('form-control');
            if(this.theme.inputClass) {
              // don`t apply `input-sm` and `input-lg` to select multiple
              // should be fixed in bs itself!
              if(this.inputEl.attr('multiple') &&
                (this.theme.inputClass === 'input-sm' || this.theme.inputClass === 'input-lg')) {
                  break;
              }
              this.inputEl.addClass(this.theme.inputClass);
            }
          break;
          case 'editableCheckbox':
              this.editorEl.addClass('checkbox');
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
