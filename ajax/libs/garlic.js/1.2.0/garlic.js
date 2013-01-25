/*
  Garlic.js allows you to automatically persist your forms' text field values locally,
  until the form is submitted. This way, your users don't lose any precious data if they
  accidentally close their tab or browser.

  author: Guillaume Potier - @guillaumepotier
*/

!function ($) {

  "use strict";
  /*global localStorage */
  /*global document */

  /* STORAGE PUBLIC CLASS DEFINITION
   * =============================== */
  var Storage = function ( options ) {
    this.defined = 'undefined' !== typeof localStorage;
  }

  Storage.prototype = {

    constructor: Storage

    , get: function ( key, placeholder ) {
      return localStorage.getItem( key ) ? localStorage.getItem( key ) : 'undefined' !== typeof placeholder ? placeholder : null;
    }

    , has: function ( key ) {
      return localStorage.getItem( key ) ? true : false;
    }

    , set: function ( key, value, fn ) {
      if ( 'string' === typeof value ) {

        // if value is null, remove storage if exists
        if ( '' === value ) {
          this.destroy( key );
        } else {
          localStorage.setItem( key , value );
        }
      }

      return 'function' === typeof fn ? fn() : true;
    }

    , destroy: function ( key, fn ) {
      localStorage.removeItem( key );
      return 'function' === typeof fn ? fn() : true;
    }

    , clean: function ( fn ) {
      for ( var i = localStorage.length - 1; i >= 0; i-- ) {
        if ( 'undefined' === typeof Array.indexOf && -1 !== localStorage.key(i).indexOf( 'garlic:' ) ) {
          localStorage.removeItem( localStorage.key(i) );
        }
      }

      return 'function' === typeof fn ? fn() : true;
    }

    , clear: function ( fn ) {
      localStorage.clear();
      return 'function' === typeof fn ? fn() : true;
    }
  }

 /* GARLIC PUBLIC CLASS DEFINITION
  * =============================== */

  var Garlic = function ( element, storage, options ) {
    this.init( 'garlic', element, storage, options );
  }

  Garlic.prototype = {

    constructor: Garlic

    /* init data, bind jQuery on() actions */
    , init: function ( type, element, storage, options ) {
      this.type = type;
      this.$element = $( element );
      this.options = this.getOptions( options );
      this.storage = storage;
      this.path = this.options.getPath( this.$element ) || this.getPath();
      this.parentForm = this.$element.closest( 'form' );
      this.$element.addClass('garlic-auto-save');
      this.expiresFlag = !this.options.expires ? false : ( this.$element.data( 'expires' ) ? this.path : this.getPath( this.parentForm ) ) + '_flag' ;

      // bind garlic events
      this.$element.on( this.options.events.join( '.' + this.type + ' ') , false, $.proxy( this.persist, this ) );

      if ( this.options.destroy ) {
        $( this.parentForm ).on( 'submit reset' , false, $.proxy( this.destroy, this ) );
      }

      // retrieve garlic persisted data
      this.retrieve();
    }

    , getOptions: function ( options ) {
      return $.extend( {}, $.fn[this.type].defaults, options, this.$element.data() );
    }

    /* temporary store data / state in localStorage */
    , persist: function () {

      // some binded events are redundant (change & paste for example), persist only once by field val
      if ( this.val === this.$element.val() ) {
        return;
      }

      this.val = this.$element.val();

      // if auto-expires is enabled, set the expiration date for future auto-deletion
      if ( this.options.expires ) {
        this.storage.set( this.expiresFlag , ( new Date().getTime() + this.options.expires * 1000 ).toString() );
      }

      // for checkboxes, we need to implement an unchecked / checked behavior
      if ( this.$element.is( 'input[type=checkbox]' ) ) {
        return this.storage.set( this.path , this.$element.attr( 'checked' ) ? 'checked' : 'unchecked' );
      }

      this.storage.set( this.path , this.$element.val() );
    }

    /* retrieve localStorage data / state and update elem accordingly */
    , retrieve: function () {
      if ( this.storage.has( this.path ) ) {

        // if data expired, destroy it!
        if ( this.options.expires ) {
          var date = new Date().getTime();
          if ( this.storage.get( this.expiresFlag ) < date.toString() ) {
            this.storage.destroy( this.path );
            return;
          } else {
            this.$element.attr( 'expires-in',  Math.floor( ( parseInt( this.storage.get( this.expiresFlag ) ) - date ) / 1000 ) );
          }
        }

        var storedValue = this.storage.get( this.path );

        // if conflictManager enabled, manage fields with already provided data, different from the one stored
        if ( this.options.conflictManager.enabled && this.detectConflict() ) {
          return this.conflictManager();
        }

        // input[type=checkbox] and input[type=radio] have a special checked / unchecked behavior
        if ( this.$element.is( 'input[type=radio], input[type=checkbox]' ) ) {

          // for checkboxes and radios
          if ( 'checked' === storedValue || this.$element.val() === storedValue ) {
            return this.$element.attr( 'checked', true );

          // only needed for checkboxes
          } else if ( 'unchecked' === storedValue ) {
            this.$element.attr( 'checked', false );
          }

          return;
        }

        // for input[type=text], select and textarea, just set val()
        this.$element.val( storedValue );

        // trigger custom user function when data is retrieved
        this.options.onRetrieve( this.$element, storedValue );

        return;
      }
    }

    /* there is a conflict when initial data / state differs from persisted data / state */
    , detectConflict: function() {
      var self = this;

      // radio buttons and checkboxes are yet not supported
      if ( this.$element.is( 'input[type=checkbox], input[type=radio]' ) ) {
        return false;
      }

      // there is a default not null value and we have a different one stored
      if ( this.$element.val() && this.storage.get( this.path ) !== this.$element.val() ) {

        // for select elements, we need to check if there is a default checked value
        if ( this.$element.is( 'select' ) ) {
          var selectConflictDetected = false;

          // foreach each options except first one, always considered as selected, seeking for a default selected one
          this.$element.find( 'option' ).each( function () {
            if ( $( this ).index() !== 0 && $( this ).attr( 'selected' ) && $( this ).val() !== self.storage.get( this.path ) ) {
              selectConflictDetected = true;
              return;
            }
          });

          return selectConflictDetected;
        }

        return true;
      }

      return false;
    }

    /* manage here the conflict, show default value depending on options.garlicPriority value */
    , conflictManager: function () {

      // user can define here a custom function that could stop Garlic default behavior, if returns false
      if ( 'function' === typeof this.options.conflictManager.onConflictDetected
        && !this.options.conflictManager.onConflictDetected( this.$element, this.storage.get( this.path ) ) ) {
        return false;
      }

      if ( this.options.conflictManager.garlicPriority ) {
        this.$element.data( 'swap-data', this.$element.val() );
        this.$element.data( 'swap-state', 'garlic' );
        this.$element.val( this.storage.get( this.path ) );
      } else {
        this.$element.data( 'swap-data', this.storage.get( this.path ) );
        this.$element.data( 'swap-state', 'default' );
      }

      this.swapHandler();
      this.$element.addClass( 'garlic-conflict-detected' );
      this.$element.closest( 'input[type=submit]' ).attr( 'disabled', true );
    }

    /* manage swap user interface */
    , swapHandler: function () {
      var swapChoiceElem = $( this.options.conflictManager.template );
      this.$element.after( swapChoiceElem.text( this.options.conflictManager.message ) );
      swapChoiceElem.on( 'click', false, $.proxy( this.swap, this ) );
    }

    /* swap data / states for conflicted elements */
    , swap: function () {
      var val = this.$element.data( 'swap-data' );
      this.$element.data( 'swap-state', 'garlic' === this.$element.data( 'swap-state' ) ? 'default' : 'garlic' );
      this.$element.data( 'swap-data', this.$element.val());
      $( this.$element ).val( val );
    }

    /* delete localStorage persistance only */
    , destroy: function () {
      this.storage.destroy( this.path );
    }

    /* remove data / reset state AND delete localStorage */
    , remove: function () {
      this.remove();

      if ( this.$element.is( 'input[type=radio], input[type=checkbox]' ) ) {
        $( this.$element ).attr( 'checked', false );
        return;
      }

      this.$element.val( '' );
    }

    /* retuns an unique identifier for form elements, depending on their behaviors:
       * radio buttons: domain > pathname > form.<attr.name>[:eq(x)] > input.<attr.name>
          no eq(); must be all stored under the same field name inside the same form

       * checkbokes: domain > pathname > form.<attr.name>[:eq(x)] > [fieldset, div, span..] > input.<attr.name>[:eq(y)]
          cuz' they have the same name, must detect their exact position in the form. detect the exact hierarchy in DOM elements

       * other inputs: domain > pathname > form.<attr.name>[:eq(x)] > input.<attr.name>[:eq(y)]
          we just need the element name / eq() inside a given form
    */
    , getPath: function ( elem ) {

      if ( 'undefined' === typeof elem ) {
        elem = this.$element;
      }

      if ( this.options.getPath( elem ) ) {
        return this.options.getPath( elem );
      }

      // Requires one element.
      if ( elem.length != 1 ) {
        return false;
      }

      var path = ''
        , fullPath = elem.is( 'input[type=checkbox]' )
        , node = elem;

      while ( node.length ) {
        var realNode = node[0]
          , name = realNode.nodeName;

        if ( !name ) {
          break;
        }

        name = name.toLowerCase();

        var parent = node.parent()
          , siblings = parent.children( name );

        // don't need to pollute path with select, fieldsets, divs and other noisy elements,
        // exept for checkboxes that need exact path, cuz have same name and sometimes same eq()!
        if ( !$( realNode ).is( 'form, input, select, textarea' ) && !fullPath ) {
          node = parent;
          continue;
        }

        // set input type as name + name attr if exists
        name += $( realNode ).attr( 'name' ) ? '.' + $( realNode ).attr( 'name' ) : '';

        // if has sibilings, get eq(), exept for radio buttons
        if ( siblings.length > 1 && !$( realNode ).is( 'input[type=radio]' ) ) {
          name += ':eq(' + siblings.index( realNode ) + ')';
        }

        path = name + ( path ? '>' + path : '' );

        // break once we came up to form:eq(x), no need to go further
        if ( 'form' == realNode.nodeName.toLowerCase() ) {
          break;
        }

        node = parent;
      }

      return 'garlic:' + document.domain + ( this.options.domain ? '*' : window.location.pathname ) + '>' + path;
    }

    , getStorage: function () {
      return this.storage;
    }
  }

  /* GARLIC PLUGIN DEFINITION
  * ========================= */

  $.fn.garlic = function ( option, fn ) {
    var options = $.extend(true, {}, $.fn.garlic.defaults, option, this.data() )
      , storage = new Storage()
      , returnValue = false;

    // this plugin heavily rely on local Storage. If there is no localStorage or data-storage=false, no need to go further
    if ( !storage.defined ) {
      return false;
    }

    function bind ( self ) {
      var $this = $( self )
        , data = $this.data( 'garlic' )
        , fieldOptions = $.extend( {}, options, $this.data() );

      // don't bind an elem with data-storage=false
      if ( 'undefined' !== typeof fieldOptions.storage && !fieldOptions.storage ) {
        return;
      }

      // don't bind a password type field
      if ( 'password' === $( self ).attr( 'type' ) ) {
        return;
      }

      // if data never binded, bind it right now!
      if ( !data ) {
        $this.data( 'garlic', ( data = new Garlic( self, storage, fieldOptions ) ) );
      }

      // here is our garlic public function accessor, currently does not support args
      if ( 'string' === typeof option && 'function' === typeof data[option] ) {
        return data[option]();
      }
    }

    // loop through every elemt we want to garlic
    this.each(function () {

      // if a form elem is given, bind all its input children
      if ( $( this ).is( 'form' ) ) {
        $( this ).find( options.inputs ).each( function () {
          returnValue = bind( $( this ) );
        });

      // if it is a Garlic supported single element, bind it too
      // add here a return instance, cuz' we could call public methods on single elems with data[option]() above
      } else if ( $( this ).is( options.inputs ) ) {
        returnValue = bind( $( this ) );
      }
    });

    return 'function' === typeof fn ? fn() : returnValue;
  }

  /* GARLIC CONFIGS & OPTIONS
  * ========================= */
  $.fn.garlic.Constructor = Garlic;

  $.fn.garlic.defaults = {
      destroy: true                                                                               // Remove or not localstorage on submit & clear
    , inputs: 'input, textarea, select'                                                           // Default supported inputs.
    , events: [ 'DOMAttrModified', 'textInput', 'input', 'change', 'keypress', 'paste', 'focus' ] // Events list that trigger a localStorage
    , domain: false                                                                               // Store et retrieve forms data accross all domain, not just on
    , expires: false                                                                              // false for no expiration, otherwise (int) in seconds for auto-expiration
    , conflictManager: {
        enabled: true                                                                             // Manage default data and persisted data. If false, persisted data will always replace default ones
      , garlicPriority: true                                                                      // If form have default data, garlic persisted data will be shown first
      , template: '<span class="garlic-swap"></span>'                                             // Template used to swap between values if conflict detected
      , message: 'This is your saved data. Click here to see default one'                         // Default message for swapping data / state
      , onConflictDetected: function ( $item, storedVal ) { return true; }                        // This function will be triggered if a conflict is detected on an item. Return true if you want Garlic behavior, return false if you want to override it
    }
   , getPath: function ( $item ) {}                                                               // Set your own key-storing strategy per field
   , onRetrieve: function ( $item, storedVal ) {}                                                 // This function will be triggered each time Garlic find an retrieve a local stored data for a field
  }

  /* GARLIC DATA-API
  * =============== */
  $( window ).on( 'load', function () {
    $( '[data-persist="garlic"]' ).each( function () {
      $(this).garlic();
    })
  });

// This plugin works with jQuery or Zepto (with data extension builded for Zepto. See changelog 0.0.6)
}(window.jQuery || window.Zepto);
