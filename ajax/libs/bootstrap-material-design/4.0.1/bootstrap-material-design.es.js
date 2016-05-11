/*!
  * Bootstrap Material Design v4.0.0 (https://github.com/FezVrasta/bootstrap-material-design)
  * Copyright 2014-2016 Federico Zivolo
  * Licensed under MIT (https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE)
  */
import 'babel-polyfill/dist/polyfill';
import 'bootstrap';

const Util = (() => {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  let transitionEnd = false
  let transitionEndSelector = ''

  const TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false
    }

    let el = document.createElement('mdb')

    for (let name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return TransitionEndEvent[name] // { end: TransitionEndEvent[name] }
      }
    }

    return false
  }

  function setTransitionEndSupport() {
    transitionEnd = transitionEndTest()

    // generate a concatenated transition end event selector
    for (let name in TransitionEndEvent) {
      transitionEndSelector += ` ${TransitionEndEvent[name]}`
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  let Util = {

    transitionEndSupported() {
      return transitionEnd
    },

    transitionEndSelector()  {
      return transitionEndSelector
    },

    isChar(event) {
      if (typeof event.which === 'undefined') {
        return true
      } else if (typeof event.which === 'number' && event.which > 0) {
        return (
          !event.ctrlKey
          && !event.metaKey
          && !event.altKey
          && event.which !== 8  // backspace
          && event.which !== 9  // tab
          && event.which !== 13 // enter
          && event.which !== 16 // shift
          && event.which !== 17 // ctrl
          && event.which !== 20 // caps lock
          && event.which !== 27 // escape
        )
      }
      return false
    },

    assert($element, invalidTest, message) {
      if (invalidTest) {
        if (!$element === undefined) {
          $element.css('border', '1px solid red')
        }
        console.error(message, $element) // eslint-disable-line no-console
        throw message
      }
    },

    describe($element) {
      if ($element === undefined) {
        return 'undefined'
      } else if ($element.length === 0) {
        return '(no matching elements)'
      }
      return `${$element[0].outerHTML.split('>')[0]}>`
    }
  }

  setTransitionEndSupport()
  return Util

})(jQuery)

const Base = (($) => {

  const ClassName = {
    MDB_FORM_GROUP: 'mdb-form-group',
    IS_FILLED: 'is-filled',
    IS_FOCUSED: 'is-focused'
  }

  const Selector = {
    MDB_FORM_GROUP: `.${ClassName.MDB_FORM_GROUP}`
  }

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Base {

    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    constructor($element, config, properties = {}) {
      this.$element = $element
      this.config = $.extend(true, {}, Default, config)

      // set properties for use in the constructor initialization
      for (let key in properties) {
        this[key] = properties[key]
      }
    }

    dispose(dataKey) {
      $.removeData(this.$element, dataKey)
      this.$element = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // protected

    addFormGroupFocus() {
      if (!this.$element.prop('disabled')) {
        this.$mdbFormGroup.addClass(ClassName.IS_FOCUSED)
      }
    }

    removeFormGroupFocus() {
      this.$mdbFormGroup.removeClass(ClassName.IS_FOCUSED)
    }

    removeIsFilled() {
      this.$mdbFormGroup.removeClass(ClassName.IS_FILLED)
    }

    addIsFilled() {
      this.$mdbFormGroup.addClass(ClassName.IS_FILLED)
    }

    // Find mdb-form-group
    findMdbFormGroup(raiseError = true) {
      let mfg = this.$element.closest(Selector.MDB_FORM_GROUP)
      if (mfg.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.MDB_FORM_GROUP} for ${Util.describe(this.$element)}`)
      }
      return mfg
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static

  }

  return Base

})(jQuery)

const BaseInput = (($) => {

  const ClassName = {
    FORM_GROUP: 'form-group',
    MDB_FORM_GROUP: 'mdb-form-group',
    MDB_LABEL: 'mdb-label',
    MDB_LABEL_STATIC: 'mdb-label-static',
    MDB_LABEL_PLACEHOLDER: 'mdb-label-placeholder',
    MDB_LABEL_FLOATING: 'mdb-label-floating',
    HAS_DANGER: 'has-danger',
    IS_FILLED: 'is-filled',
    IS_FOCUSED: 'is-focused'
  }

  const Selector = {
    FORM_GROUP: `.${ClassName.FORM_GROUP}`,
    MDB_FORM_GROUP: `.${ClassName.MDB_FORM_GROUP}`,
    MDB_LABEL_WILDCARD: `label[class^='${ClassName.MDB_LABEL}'], label[class*=' ${ClassName.MDB_LABEL}']` // match any label variant if specified
  }

  const Default = {
    validate: false,
    formGroup: {
      required: false
    },
    mdbFormGroup: {
      template: `<span class='${ClassName.MDB_FORM_GROUP}'></span>`,
      create: true, // create a wrapper if form-group not found
      required: true // not recommended to turn this off, only used for inline components
    },
    label: {
      required: false,

      // Prioritized find order for resolving the label to be used as an mdb-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $mdbFormGroup.find(selector)
      //
      // Note this only runs if $mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      selectors: [
        `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
        `> label` // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
      ],
      className: ClassName.MDB_LABEL_STATIC
    },
    requiredClasses: [],
    invalidComponentMatches: [],
    convertInputSizeVariations: true
  }

  const FormControlSizeMarkers = {
    'form-control-lg': 'mdb-form-group-lg',
    'form-control-sm': 'mdb-form-group-sm'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseInput extends Base {

    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    constructor($element, config, properties = {}) {
      super($element, $.extend(true, {}, Default, config), properties)

      // Enforce no overlap between components to prevent side effects
      this._rejectInvalidComponentMatches()

      // Enforce expected structure (if any)
      this.rejectWithoutRequiredStructure()

      // Enforce required classes for a consistent rendering
      this._rejectWithoutRequiredClasses()

      // Resolve the form-group first, it will be used for mdb-form-group if possible
      //   note: different components have different rules
      this.$formGroup = this.findFormGroup(this.config.formGroup.required)

      // Will add mdb-form-group to form-group or create an mdb-form-group
      //  Performance Note: for those forms that are really performance driven, create the markup with the .mdb-form-group to avoid
      //    rendering changes once added.
      this.$mdbFormGroup = this.resolveMdbFormGroup()

      // Resolve and mark the mdbLabel if necessary as defined by the config
      this.$mdbLabel = this.resolveMdbLabel()

      // Signal to the mdb-form-group that a form-control-* variation is being used
      this.resolveMdbFormGroupSizing()

      this.addFocusListener()
      this.addChangeListener()
    }

    dispose(dataKey) {
      super.dispose(dataKey)
      this.$mdbFormGroup = null
      this.$formGroup = null
    }

    // ------------------------------------------------------------------------
    // protected

    rejectWithoutRequiredStructure() {
      // implement
    }

    addFocusListener() {
      this.$element
        .on('focus', () => {
          this.addFormGroupFocus()
        })
        .on('blur', () => {
          this.removeFormGroupFocus()
        })
    }

    addChangeListener() {
      this.$element
        .on('keydown paste', (event) => {
          if (Util.isChar(event)) {
            this.addIsFilled()
          }
        })
        .on('keyup change', () => {

          // make sure empty is added back when there is a programmatic value change.
          //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
          if (this.isEmpty()) {
            this.removeIsFilled()
          } else {
            this.addIsFilled()
          }

          if (this.config.validate) {
            // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
            //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
            //  the form-group on change.
            //
            // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
            //        BUT, I've left it here for backwards compatibility.
            let isValid = (typeof this.$element[0].checkValidity === 'undefined' || this.$element[0].checkValidity())
            if (isValid) {
              this.removeHasDanger()
            } else {
              this.addHasDanger()
            }
          }
        })
    }

    addHasDanger() {
      this.$mdbFormGroup.addClass(ClassName.HAS_DANGER)
    }

    removeHasDanger() {
      this.$mdbFormGroup.removeClass(ClassName.HAS_DANGER)
    }

    isEmpty() {
      return (this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '')
    }

    // Will add mdb-form-group to form-group or create a mdb-form-group if necessary
    resolveMdbFormGroup() {
      let mfg = this.findMdbFormGroup(false)
      if (mfg === undefined || mfg.length === 0) {
        if (this.config.mdbFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
          // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
          //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.
          this.outerElement().wrap(this.config.mdbFormGroup.template)
        } else {
          // a form-group does exist, add our marker class to it
          this.$formGroup.addClass(ClassName.MDB_FORM_GROUP)

          // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
          // A form-group does exist, so add an mdb-form-group wrapping it's internal contents
          //fg.wrapInner(this.config.mdbFormGroup.template)
        }

        mfg = this.findMdbFormGroup(this.config.mdbFormGroup.required)
      }

      return mfg
    }

    // Demarcation element (e.g. first child of a form-group)
    //  Subclasses such as file inputs may have different structures
    outerElement() {
      return this.$element
    }

    // Will add mdb-label to mdb-form-group if not already specified
    resolveMdbLabel() {

      let label = this.$mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD)
      if (label === undefined || label.length === 0) {
        // we need to find it based on the configured selectors
        label = this.findMdbLabel(this.config.label.required)

        if (label === undefined || label.length === 0) {
          // no label found, and finder did not require one
        } else {
          // a candidate label was found, add the configured default class name
          label.addClass(this.config.label.className)
        }
      }

      return label
    }

    // Find mdb-label variant based on the config selectors
    findMdbLabel(raiseError = true) {
      let label = null

      // use the specified selector order
      for (let selector of this.config.label.selectors) {
        if ($.isFunction(selector)) {
          label = selector(this)
        } else {
          label = this.$mdbFormGroup.find(selector)
        }

        if (label !== undefined && label.length > 0) {
          break
        }
      }

      if (label.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.MDB_LABEL_WILDCARD} within form-group for ${Util.describe(this.$element)}`)
      }
      return label
    }

    // Find mdb-form-group
    findFormGroup(raiseError = true) {
      let fg = this.$element.closest(Selector.FORM_GROUP)
      if (fg.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.FORM_GROUP} for ${Util.describe(this.$element)}`)
      }
      return fg
    }

    // Due to the interconnected nature of labels/inputs/help-blocks, signal the mdb-form-group-* size variation based on
    //  a found form-control-* size
    resolveMdbFormGroupSizing() {
      if (!this.config.convertInputSizeVariations) {
        return
      }

      // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
      for (let inputSize in FormControlSizeMarkers) {
        if (this.$element.hasClass(inputSize)) {
          //this.$element.removeClass(inputSize)
          this.$mdbFormGroup.addClass(FormControlSizeMarkers[inputSize])
        }
      }
    }

    // ------------------------------------------------------------------------
    // private
    _rejectInvalidComponentMatches() {
      for (let otherComponent of this.config.invalidComponentMatches) {
        otherComponent.rejectMatch(this.constructor.name, this.$element)
      }
    }

    _rejectWithoutRequiredClasses() {
      for (let requiredClass of this.config.requiredClasses) {

        let found = false
        // allow one of several classes to be passed in x||y
        if (requiredClass.indexOf('||') !== -1) {
          let oneOf = requiredClass.split('||')
          for (let requiredClass of oneOf) {
            if (this.$element.hasClass(requiredClass)) {
              found = true
              break
            }
          }
        } else if (this.$element.hasClass(requiredClass)) {
          found = true
        }

        // error if not found
        if (!found) {
          $.error(`${this.constructor.name} element: ${Util.describe(this.$element)} requires class: ${requiredClass}`)
        }
      }
    }

    // ------------------------------------------------------------------------
    // static

  }

  return BaseInput

})(jQuery)

const BaseSelection = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const Default = {
    label: {
      required: false

      // Prioritized find order for resolving the label to be used as an mdb-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $mdbFormGroup.find(selector)
      //
      // Note this only runs if $mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      //selectors: [
      //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
      //  `> label` // usual case for text inputs
      //]
    }
  }

  const Selector = {
    LABEL: 'label'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseSelection extends BaseInput {

    constructor($element, config, properties) {
      // properties = {inputType: checkbox, outerClass: checkbox-inline}
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'

      super($element, $.extend(true, {}, Default, config), properties)
      this.decorateMarkup()
    }

    // ------------------------------------------------------------------------
    // protected

    decorateMarkup() {
      this.$element.after(this.config.template)
    }

    // Demarcation element (e.g. first child of a form-group)
    outerElement() {
      // .checkbox|switch|radio > label > input[type=checkbox|radio]
      // label.checkbox-inline > input[type=checkbox|radio]
      // .${this.outerClass} > label > input[type=${this.inputType}]
      return this.$element.parent().closest(`.${this.outerClass}`)
    }

    rejectWithoutRequiredStructure() {
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      Util.assert(this.$element, !this.$element.parent().prop('tagName') === 'label', `${this.constructor.name}'s ${Util.describe(this.$element)} parent element should be <label>.`)
      Util.assert(this.$element, !this.outerElement().hasClass(this.outerClass), `${this.constructor.name}'s ${Util.describe(this.$element)} outer element should have class ${this.outerClass}.`)
    }

    addFocusListener() {
      // checkboxes didn't appear to bubble to the document, so we'll bind these directly
      this.$element.closest(Selector.LABEL).hover(() => {
        this.addFormGroupFocus()
      }, () => {
        this.removeFormGroupFocus()
      })
    }

    addChangeListener() {
      this.$element.change(() => {
        this.$element.blur()
      })
    }

    // ------------------------------------------------------------------------
    // private
  }

  return BaseSelection

})(jQuery)

const Checkbox = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'checkbox'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    template: `<span class='checkbox-decorator'><span class='check'></span></span>`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Checkbox extends BaseSelection {

    constructor($element, config, properties = {inputType: NAME, outerClass: NAME}) {
      super($element, $.extend(true,
        //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
        Default, config), properties)
    }

    dispose(dataKey = DATA_KEY) {
      super.dispose(dataKey)
    }

    static matches($element) {
      // '.checkbox > label > input[type=checkbox]'
      if ($element.attr('type') === 'checkbox') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
    }

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Checkbox($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Checkbox._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Checkbox
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Checkbox._jQueryInterface
  }

  return Checkbox

})(jQuery)

const CheckboxInline = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'checkboxInline'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    mdbFormGroup: {
      create: false, // no mdb-form-group creation if form-group not present. It messes with the layout.
      required: false
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class CheckboxInline extends Checkbox {

    constructor($element, config, properties = {inputType: 'checkbox', outerClass: 'checkbox-inline'}) {
      super($element, $.extend(true, {}, Default, config), properties)
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    //static matches($element) {
    //  // '.checkbox-inline > input[type=checkbox]'
    //  if ($element.attr('type') === 'checkbox') {
    //    return true
    //  }
    //  return false
    //}
    //
    //static rejectMatch(component, $element) {
    //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
    //}

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new CheckboxInline($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = CheckboxInline
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return CheckboxInline._jQueryInterface
  }

  return CheckboxInline

})(jQuery)

const CollapseInline = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'collapseInline'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Selector = {
    ANY_INPUT: 'input, select, textarea'
  }

  const ClassName = {
    IN: 'in',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed',
    WIDTH: 'width'
  }
  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class CollapseInline extends Base {

    // $element is expected to be the trigger
    //  i.e. <button class="btn mdb-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
    constructor($element, config) {
      super($element, $.extend(true, {}, Default, config))
      this.$mdbFormGroup = this.findMdbFormGroup(true)

      let collapseSelector = $element.data('target')
      this.$collapse = $(collapseSelector)

      Util.assert($element, this.$collapse.length === 0, `Cannot find collapse target for ${Util.describe($element)}`)
      Util.assert(this.$collapse, !this.$collapse.hasClass(ClassName.COLLAPSE), `${Util.describe(this.$collapse)} is expected to have the '${ClassName.COLLAPSE}' class.  It is being targeted by ${Util.describe($element)}`)

      // find the first input for focusing
      let $inputs = this.$mdbFormGroup.find(Selector.ANY_INPUT)
      if ($inputs.length > 0) {
        this.$input = $inputs.first()
      }

      // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten
      if (!this.$collapse.hasClass(ClassName.WIDTH)) {
        this.$collapse.addClass(ClassName.WIDTH)
      }

      if (this.$input) {
        // add a listener to set focus
        this.$collapse.on('shown.bs.collapse', () => {
          this.$input.focus()
        })

        // add a listener to collapse field
        this.$input.blur(() => {
          this.$collapse.collapse('hide')
        })
      }
    }

    dispose() {
      super.dispose(DATA_KEY)
      this.$mdbFormGroup = null
      this.$collapse = null
      this.$input = null
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new CollapseInline($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = CollapseInline._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = CollapseInline
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return CollapseInline._jQueryInterface
  }

  return CollapseInline

})(jQuery)

const File = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'file'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {}

  const ClassName = {
    FILE: NAME,
    IS_FILE: 'is-file'
  }

  const Selector = {
    FILENAMES: 'input.form-control[readonly]'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class File extends BaseInput {

    constructor($element, config) {
      super($element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
        Default, config))

      this.$mdbFormGroup.addClass(ClassName.IS_FILE)
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      if ($element.attr('type') === 'file') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='file'.`)
    }

    // ------------------------------------------------------------------------
    // protected

    // Demarcation element (e.g. first child of a form-group)
    outerElement() {
      // label.file > input[type=file]
      return this.$element.parent().closest(`.${ClassName.FILE}`)
    }

    rejectWithoutRequiredStructure() {
      // label.file > input[type=file]
      Util.assert(this.$element, !this.outerElement().prop('tagName') === 'label', `${this.constructor.name}'s ${Util.describe(this.$element)} parent element ${Util.describe(this.outerElement())} should be <label>.`)
      Util.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), `${this.constructor.name}'s ${Util.describe(this.$element)} parent element ${Util.describe(this.outerElement())} should have class .${ClassName.FILE}.`)
    }

    addFocusListener() {
      this.$mdbFormGroup
        .on('focus', () => {
          this.addFormGroupFocus()
        })
        .on('blur', () => {
          this.removeFormGroupFocus()
        })
    }

    addChangeListener() {
      // set the fileinput readonly field with the name of the file
      this.$element.on('change', () => {
        let value = ''
        $.each(this.$element.files, (i, file) => {
          value += `${file.name}  , `
        })
        value = value.substring(0, value.length - 2)
        if (value) {
          this.addIsFilled()
        } else {
          this.removeIsFilled()
        }
        this.$mdbFormGroup.find(Selector.FILENAMES).val(value)
      })
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new File($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = File._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = File
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return File._jQueryInterface
  }

  return File

})(jQuery)

const Radio = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'radio'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    template: `<span class='mdb-radio-outer-circle'></span><span class='mdb-radio-inner-circle'></span>`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Radio extends BaseSelection {

    constructor($element, config, properties = {inputType: NAME, outerClass: NAME}) {
      super($element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
        Default, config), properties)
    }

    dispose(dataKey = DATA_KEY) {
      super.dispose(dataKey)
    }

    static matches($element) {
      // '.radio > label > input[type=radio]'
      if ($element.attr('type') === 'radio') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='radio'.`)
    }

    // ------------------------------------------------------------------------
    // protected

    //decorateMarkup() {
    //  this.$element.after(this.config.template)
    //}


    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Radio($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Radio._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Radio
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Radio._jQueryInterface
  }

  return Radio

})(jQuery)

const RadioInline = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'radioInline'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    mdbFormGroup: {
      create: false, // no mdb-form-group creation if form-group not present. It messes with the layout.
      required: false
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class RadioInline extends Radio {

    constructor($element, config, properties = {inputType: 'radio', outerClass: 'radio-inline'}) {
      super($element, $.extend(true, {}, Default, config), properties)
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new RadioInline($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = RadioInline._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = RadioInline
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return RadioInline._jQueryInterface
  }

  return RadioInline

})(jQuery)

const BaseFormControl = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const Default = {
    requiredClasses: ['form-control']
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseFormControl extends BaseInput {

    constructor($element, config) {
      super($element, $.extend(true, Default, config))

      // Initially mark as empty
      if (this.isEmpty()) {
        this.removeIsFilled()
      }
    }
  }


  return BaseFormControl

})(jQuery)

const Select = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'select'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    requiredClasses: ['form-control||custom-select']
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Select extends BaseFormControl {

    constructor($element, config) {
      super($element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
        Default, config))

      // floating labels will cover the options, so trigger them to be above (if used)
      this.addIsFilled()
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      if ($element.prop('tagName') === 'select') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for <select>.`)
    }

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Select($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Select._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Select
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Select._jQueryInterface
  }

  return Select

})(jQuery)

const Switch = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'switch'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    template: `<span class='mdb-switch-track'></span>`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Switch extends Checkbox {

    constructor($element, config, properties = {inputType: 'checkbox', outerClass: 'switch'}) {
      super($element, $.extend(true, {}, Default, config), properties)
      // selector: '.switch > label > input[type=checkbox]'
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Switch($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Switch._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Switch
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Switch._jQueryInterface
  }

  return Switch

})(jQuery)

const Text = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'text'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Text extends BaseFormControl {

    constructor($element, config) {
      super($element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
        Default, config))
    }

    dispose(dataKey = DATA_KEY) {
      super.dispose(dataKey)
    }

    static matches($element) {
      if ($element.attr('type') === 'text') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='text'.`)
    }

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Text($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Text._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Text
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Text._jQueryInterface
  }

  return Text

})(jQuery)

const Textarea = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'textarea'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Textarea extends BaseFormControl {

    constructor($element, config) {
      super($element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
        Default, config))
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      if ($element.prop('tagName') === 'textarea') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for <textarea>.`)
    }

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Textarea($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Textarea._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Textarea
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Textarea._jQueryInterface
  }

  return Textarea

})(jQuery)

const BaseLayout = (($) => {

  const ClassName = {
    CANVAS: 'mdb-layout-canvas',
    CONTAINER: 'mdb-layout-container',
    BACKDROP: `mdb-layout-backdrop`
  }

  const Selector = {
    CANVAS: `.${ClassName.CANVAS}`,
    CONTAINER: `.${ClassName.CONTAINER}`,
    BACKDROP: `.${ClassName.BACKDROP}`
  }

  const Default = {
    canvas: {
      create: true,
      required: true,
      template: `<div class="${ClassName.CANVAS}"></div>`
    },
    backdrop: {
      create: true,
      required: true,
      template: `<div class="${ClassName.BACKDROP}"></div>`
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseLayout extends Base {

    constructor($element, config, properties = {}) {
      super($element, $.extend(true, {}, Default, config), properties)

      this.$container = this.findContainer(true)
      this.$backdrop = this.resolveBackdrop()
      this.resolveCanvas();
    }

    dispose(dataKey) {
      super.dispose(dataKey)
      this.$container = null
      this.$backdrop = null
    }

    // ------------------------------------------------------------------------
    // protected

    // Will wrap container in mdb-layout-canvas if necessary
    resolveCanvas() {
      let bd = this.findCanvas(false)
      if (bd === undefined || bd.length === 0) {
        if (this.config.canvas.create) {
          this.$container.wrap(this.config.canvas.template)
        }

        bd = this.findCanvas(this.config.canvas.required)
      }

      return bd
    }

    // Find closest mdb-layout-container based on the given context
    findCanvas(raiseError = true, context = this.$container) {
      let canvas = context.closest(Selector.CANVAS)
      if (canvas.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.CANVAS} for ${Util.describe(context)}`)
      }
      return canvas
    }

    // Will add mdb-layout-backdrop to mdb-layout-container if necessary
    resolveBackdrop() {
      let bd = this.findBackdrop(false)
      if (bd === undefined || bd.length === 0) {
        if (this.config.backdrop.create) {
          this.$container.append(this.config.backdrop.template)
        }

        bd = this.findBackdrop(this.config.backdrop.required)
      }

      return bd
    }

    // Find closest mdb-layout-container based on the given context
    findBackdrop(raiseError = true, context = this.$container) {
      let backdrop = context.find(`> ${Selector.BACKDROP}`)
      if (backdrop.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.BACKDROP} for ${Util.describe(context)}`)
      }
      return backdrop
    }

    // Find closest mdb-layout-container based on the given context
    findContainer(raiseError = true, context = this.$element) {
      let container = context.closest(Selector.CONTAINER)
      if (container.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.CONTAINER} for ${Util.describe(context)}`)
      }
      return container
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static

  }

  return BaseLayout

})(jQuery)

const Drawer = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'drawer'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Keycodes = {
    ESCAPE: 27
    //ENTER: 13,
    //SPACE: 32
  }

  const ClassName = {
    IN: 'in',
    DRAWER_IN: `mdb-drawer-in`,
    DRAWER_OUT: `mdb-drawer-out`,
    DRAWER: 'mdb-layout-drawer',
    CONTAINER: 'mdb-layout-container'
  }

  const Default = {
    focusSelector: `a, button, input`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Drawer extends BaseLayout {

    // $element is expected to be the trigger
    //  i.e. <button class="btn mdb-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
    constructor($element, config) {
      super($element, $.extend(true, {}, Default, config))

      this.$toggles = $(`[data-toggle="drawer"][href="#${this.$element[0].id}"], [data-toggle="drawer"][data-target="#${this.$element[0].id}"]`)

      this._addAria()

      // click or escape on the backdrop closes the drawer
      this.$backdrop.keydown((ev) => {
        if (ev.which === Keycodes.ESCAPE) {
          this.hide()
        }
      }).click(() => {
        this.hide()
      })

      // escape on the drawer closes it
      this.$element.keydown((ev) => {
        if (ev.which === Keycodes.ESCAPE) {
          this.hide()
        }
      })

      // any toggle button clicks
      this.$toggles.click(() => {
        this.toggle()
      })
    }

    dispose() {
      super.dispose(DATA_KEY)
      this.$toggles = null
    }

    toggle() {
      if (this._isOpen()) {
        this.hide()
      } else {
        this.show()
      }
    }

    show() {
      if (this._isForcedClosed() || this._isOpen()) {
        return
      }

      this.$toggles.attr('aria-expanded', true)
      this.$element.attr('aria-expanded', true)
      this.$element.attr('aria-hidden', false)

      // focus on the first focusable item
      let $focusOn = this.$element.find(this.config.focusSelector)
      if ($focusOn.length > 0) {
        $focusOn.first().focus()
      }

      this.$container.addClass(ClassName.DRAWER_IN)
      // backdrop is responsively styled based on mdb-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.
      this.$backdrop.addClass(ClassName.IN)
    }

    hide() {
      if (!this._isOpen()) {
        return
      }

      this.$toggles.attr('aria-expanded', false)
      this.$element.attr('aria-expanded', false)
      this.$element.attr('aria-hidden', true)

      this.$container.removeClass(ClassName.DRAWER_IN)
      this.$backdrop.removeClass(ClassName.IN)
    }


    // ------------------------------------------------------------------------
    // private

    _isOpen() {
      return this.$container.hasClass(ClassName.DRAWER_IN)
    }

    _isForcedClosed() {
      return this.$container.hasClass(ClassName.DRAWER_OUT)
    }

    _addAria() {
      let isOpen = this._isOpen()
      this.$element.attr('aria-expanded', isOpen)
      this.$element.attr('aria-hidden', isOpen)

      if (this.$toggles.length) {
        this.$toggles.attr('aria-expanded', isOpen)
      }
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Drawer($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Drawer._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Drawer
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Drawer._jQueryInterface
  }

  return Drawer

})(jQuery)

const Ripples = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'ripples'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const ClassName = {
    CONTAINER: 'ripple-container',
    DECORATOR: 'ripple-decorator'
  }

  const Selector = {
    CONTAINER: `.${ClassName.CONTAINER}`,
    DECORATOR: `.${ClassName.DECORATOR}` //,
  }


  const Default = {
    container: {
      template: `<div class='${ClassName.CONTAINER}'></div>`
    },
    decorator: {
      template: `<div class='${ClassName.DECORATOR}'></div>`
    },
    trigger: {
      start: 'mousedown touchstart',
      end: 'mouseup mouseleave touchend'
    },
    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    duration: 500
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Ripples {

    constructor($element, config) {
      this.$element = $element

      //console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
      this.config = $.extend(true, {}, Default, config)

      // attach initial listener
      this.$element.on(this.config.trigger.start, (event) => {
        this._onStartRipple(event)
      })
    }


    dispose() {
      $.removeData(this.$element, DATA_KEY)
      this.$element = null
      this.$container = null
      this.$decorator = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _onStartRipple(event) {

      // Verify if the user is just touching on a device and return if so
      if (this._isTouch() && event.type === 'mousedown') {
        return
      }

      // Find or create the ripple container element
      this._findOrCreateContainer()

      // Get relY and relX positions of the container element
      let relY = this._getRelY(event)
      let relX = this._getRelX(event)

      // If relY and/or relX are false, return the event
      if (!relY && !relX) {
        return
      }

      // set the location and color each time (even if element is cached)
      this.$decorator.css({
        left: relX,
        top: relY,
        'background-color': this._getRipplesColor()
      })

      // Make sure the ripple has the styles applied (ugly hack but it works)
      this._forceStyleApplication()

      // Turn on the ripple animation
      this.rippleOn()

      // Call the rippleEnd function when the transition 'on' ends
      setTimeout(() => {
        this.rippleEnd()
      }, this.config.duration)

      // Detect when the user leaves the element to cleanup if not already done?
      this.$element.on(this.config.trigger.end, () => {
        if (this.$decorator) { // guard against race condition/mouse attack
          this.$decorator.data('mousedown', 'off')

          if (this.$decorator.data('animating') === 'off') {
            this.rippleOut()
          }
        }
      })
    }

    _findOrCreateContainer() {
      if (!this.$container || !this.$container.length > 0) {
        this.$element.append(this.config.container.template)
        this.$container = this.$element.find(Selector.CONTAINER)
      }

      // always add the rippleElement, it is always removed
      this.$container.append(this.config.decorator.template)
      this.$decorator = this.$container.find(Selector.DECORATOR)
    }

    // Make sure the ripple has the styles applied (ugly hack but it works)
    _forceStyleApplication() {
      return window.getComputedStyle(this.$decorator[0]).opacity
    }


    /**
     * Get the relX
     */
    _getRelX(event) {
      let wrapperOffset = this.$container.offset()

      let result = null
      if (!this._isTouch()) {
        // Get the mouse position relative to the ripple wrapper
        result = event.pageX - wrapperOffset.left
      } else {
        // Make sure the user is using only one finger and then get the touch
        //  position relative to the ripple wrapper
        event = event.originalEvent

        if (event.touches.length === 1) {
          result = event.touches[0].pageX - wrapperOffset.left
        } else {
          result = false
        }
      }

      return result
    }

    /**
     * Get the relY
     */
    _getRelY(event) {
      let containerOffset = this.$container.offset()
      let result = null

      if (!this._isTouch()) {
        /**
         * Get the mouse position relative to the ripple wrapper
         */
        result = event.pageY - containerOffset.top
      } else {
        /**
         * Make sure the user is using only one finger and then get the touch
         * position relative to the ripple wrapper
         */
        event = event.originalEvent

        if (event.touches.length === 1) {
          result = event.touches[0].pageY - containerOffset.top
        } else {
          result = false
        }
      }

      return result
    }

    /**
     * Get the ripple color
     */
    _getRipplesColor() {
      let color = this.$element.data('ripple-color') ? this.$element.data('ripple-color') : window.getComputedStyle(this.$element[0]).color
      return color
    }

    /**
     * Verify if the client is using a mobile device
     */
    _isTouch() {
      return this.config.touchUserAgentRegex.test(navigator.userAgent)
    }

    /**
     * End the animation of the ripple
     */
    rippleEnd() {
      if (this.$decorator) { // guard against race condition/mouse attack
        this.$decorator.data('animating', 'off')

        if (this.$decorator.data('mousedown') === 'off') {
          this.rippleOut(this.$decorator)
        }
      }
    }

    /**
     * Turn off the ripple effect
     */
    rippleOut() {
      this.$decorator.off()

      if (Util.transitionEndSupported()) {
        this.$decorator.addClass('ripple-out')
      } else {
        this.$decorator.animate({opacity: 0}, 100, () => {
          this.$decorator.trigger('transitionend')
        })
      }

      this.$decorator.on(Util.transitionEndSelector(), () => {
        if (this.$decorator) {
          this.$decorator.remove()
          this.$decorator = null
        }
      })
    }

    /**
     * Turn on the ripple effect
     */
    rippleOn() {
      let size = this._getNewSize()

      if (Util.transitionEndSupported()) {
        this.$decorator
          .css({
            '-ms-transform': `scale(${size})`,
            '-moz-transform': `scale(${size})`,
            '-webkit-transform': `scale(${size})`,
            transform: `scale(${size})`
          })
          .addClass('ripple-on')
          .data('animating', 'on')
          .data('mousedown', 'on')
      } else {
        this.$decorator.animate({
          width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
          height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
          'margin-left': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * (-1),
          'margin-top': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * (-1),
          opacity: 0.2
        }, this.config.duration, () => {
          this.$decorator.trigger('transitionend')
        })
      }
    }

    /**
     * Get the new size based on the element height/width and the ripple width
     */
    _getNewSize() {
      return (Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth()) * 2.5
    }

    // ------------------------------------------------------------------------
    // static

    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Ripples($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Ripples._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Ripples
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Ripples._jQueryInterface
  }

  return Ripples

})(jQuery)

const Autofill = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'autofill'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Autofill extends Base {

    constructor($element, config) {
      super($element, $.extend(true, {}, Default, config))

      this._watchLoading()
      this._attachEventHandlers()
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    // ------------------------------------------------------------------------
    // private

    _watchLoading() {
      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(() => {
        clearInterval(this._onLoading)
      }, 10000)
    }

    // This part of code will detect autofill when the page is loading (username and password inputs for example)
    _onLoading() {
      setInterval(() => {
        $('input[type!=checkbox]').each((index, element) => {
          let $element = $(element)
          if ($element.val() && $element.val() !== $element.attr('value')) {
            $element.trigger('change')
          }
        })
      }, 100)
    }

    _attachEventHandlers() {
      // Listen on inputs of the focused form
      //  (because user can select from the autofill dropdown only when the input has focus)
      let focused = null
      $(document)
        .on('focus', 'input', (event) => {
          let $inputs = $(event.currentTarget).closest('form').find('input').not('[type=file]')
          focused = setInterval(() => {
            $inputs.each((index, element) => {
              let $element = $(element)
              if ($element.val() !== $element.attr('value')) {
                $element.trigger('change')
              }
            })
          }, 100)
        })
        .on('blur', '.form-group input', () => {
          clearInterval(focused)
        })
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Autofill($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Autofill._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Autofill
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Autofill._jQueryInterface
  }

  return Autofill

})(jQuery)

/**
 * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
 *  used in Material Design for Bootstrap.  You may pass overrides to the configurations
 *  which will be passed into each component, or you may omit use of this class and
 *  configure each component separately.
 */
const BootstrapMaterialDesign = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'bootstrapMaterialDesign'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = NAME // retain this full name since it is long enough not to conflict
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  /**
   * Global configuration:
   *  The global configuration hash will be mixed in to each components' config.
   *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
   *
   *
   * Component configuration:
   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
   *
   *  @see each individual component for more configuration settings.
   */
  const Default = {
    global: {
      validate: false,
      label: {
        className: 'mdb-label-static' // default style of label to be used if not specified in the html markup
      }
    },
    autofill: {
      selector: 'body'
    },
    checkbox: {
      selector: '.checkbox > label > input[type=checkbox]'
    },
    checkboxInline: {
      selector: 'label.checkbox-inline > input[type=checkbox]'
    },
    collapseInline: {
      selector: '.mdb-collapse-inline [data-toggle="collapse"]'
    },
    drawer: {
      selector: '.mdb-layout-drawer'
    },
    file: {
      selector: 'input[type=file]'
    },
    radio: {
      selector: '.radio > label > input[type=radio]'
    },
    radioInline: {
      selector: 'label.radio-inline > input[type=radio]'
    },
    ripples: {
      //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
      selector: [
        '.btn:not(.btn-link):not(.ripple-none)',
        '.card-image:not(.ripple-none)',
        '.navbar a:not(.ripple-none)',
        '.dropdown-menu a:not(.ripple-none)',
        '.nav-tabs a:not(.ripple-none)',
        '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)',
        '.ripple' // generic marker class to add ripple to elements
      ]
    },
    select: {
      selector: ['select']
    },
    switch: {
      selector: '.switch > label > input[type=checkbox]'
    },
    text: {
      // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
      selector: [`input[type!='hidden'][type!='checkbox'][type!='radio'][type!='file'][type!='button'][type!='submit'][type!='reset']`]
    },
    textarea: {
      selector: ['textarea']
    },
    arrive: true,
    // create an ordered component list for instantiation
    instantiation: [
      'ripples',
      'checkbox',
      'checkboxInline',
      'collapseInline',
      'drawer',
      //'file',
      'radio',
      'radioInline',
      'switch',
      'text',
      'textarea',
      'select',
      'autofill'
    ]
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BootstrapMaterialDesign {

    constructor($element, config) {
      this.$element = $element
      this.config = $.extend(true, {}, Default, config)
      let $document = $(document)

      for (let component of this.config.instantiation) {

        // the component's config fragment is passed in directly, allowing users to override
        let componentConfig = this.config[component]

        // check to make sure component config is enabled (not `false`)
        if (componentConfig) {

          // assemble the selector as it may be an array
          let selector = this._resolveSelector(componentConfig)

          // mix in global options
          componentConfig = $.extend(true, {}, this.config.global, componentConfig)

          // create the jquery fn name e.g. 'mdbText' for 'text'
          let componentName = `${component.charAt(0).toUpperCase() + component.slice(1)}`
          let jqueryFn = `mdb${componentName}`

          try {
            // safely instantiate component on selector elements with config, report errors and move on.
            // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
            $(selector)[jqueryFn](componentConfig)

            // add to arrive if present and enabled
            if (document.arrive && this.config.arrive) {
              $document.arrive(selector, (element) => {  // eslint-disable-line no-loop-func
                $(element)[jqueryFn](componentConfig)
              })
            }
          } catch (e) {
            let message = `Failed to instantiate component: $('${selector}')[${jqueryFn}](${componentConfig})`
            console.error(message, e, `\nSelected elements: `, $(selector)) // eslint-disable-line no-console
            throw e
          }
        }
      }
    }

    dispose() {
      $.removeData(this.$element, DATA_KEY)
      this.$element = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _resolveSelector(componentConfig) {
      let selector = componentConfig.selector
      if (Array.isArray(selector)) {
        selector = selector.join(', ')
      }

      return selector
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new BootstrapMaterialDesign($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return BootstrapMaterialDesign._jQueryInterface
  }

  return BootstrapMaterialDesign

})(jQuery)
//# sourceMappingURL=bootstrap-material-design.es.js.map