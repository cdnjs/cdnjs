/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, undef:true, curly:true, browser:true, jquery:true */
/*
 * jQuery MultiSelect UI Widget Filtering Plugin 3.0.0
 * Copyright (c) 2012 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery UI MultiSelect widget
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
(function($) {
  var rEscape = /[\-\[\]{}()*+?.,\\\^$|#\s]/g;

  // "{{term}}" is a placeholder below for where the search term
  // would be inserted in the resulting regular expression.
  filterRules = {
      'contains': '{{term}}',
      'beginsWith':  '^{{term}}',
      'endsWith':  '{{term}}$',
      'exactMatch':  '^{{term}}$',
      'containsNumber':  '\d',
      'isNumeric':  '^\d+$',
      'isNonNumeric':  '^\D+$'
  };

  //Courtesy of underscore.js
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  $.widget('ech.multiselectfilter', {

    options: {
      label: 'Filter:',                // (string) The label to show with the input
      placeholder: 'Enter keywords',   // (string) The placeholder text to show in the input
      filterRule: 'contains',          // (string) Either a named filter rule from above or a regular expression containing {{term}} as a placeholder
      searchGroups: false,             // (true | false) If true, search option group labels and show an entire group on a match.
      autoReset: false,                // (true | false) If true, clear the filter each time the widget menu is closed.
      width: null,                     // (number) Override default width set in css file (px). null will inherit
      debounceMS: 250                  // (number) Number of milleseconds to wait between running the search handler.
    },

   /**
    * Performs widget creation
    * Widget API has already set this.element and this.options for us
    *   - Find the multiselect widget.
    *   - Create the filter input
    *   - Set up event handlers
    *   - Insert in header
    * - Create text cache
    *   - Override toggleState
    */
    _create: function() {
      var opts = this.options;
      var $element = this.element;

      // get the multiselect instance -- instance() method no longer supported -- use data()
      this.instance = $element.multiselect().data('ech-multiselect');

      // store header; add filter class so the close/check all/uncheck all links can be positioned correctly
      this.$header = this.instance.$menu.find('.ui-multiselect-header').addClass('ui-multiselect-hasfilter');

      // wrapper $element
      this.$input = $(document.createElement('input'))
        .attr({
          placeholder: opts.placeholder,
          type: "search"
        })
        .css({  width: (/\d/.test(opts.width) ? opts.width + 'px' : null) })
        .on({
        keydown: function(e) {
          // prevent the enter key from submitting the form / closing the widget
          if(e.which === 13)
            e.preventDefault();
          else if(e.which === 27) {
            $element.multiselect('close');
            e.preventDefault();
          }
          else if(e.which === 9 && e.shiftKey) {
            $element.multiselect('close');
            e.preventDefault();
          }
          else if(e.altKey) {
            switch(e.which) {
              case 82:
                e.preventDefault();
                $(this).val('').trigger('input', '');
                break;
              case 65:
                $element.multiselect('checkAll');
                break;
              case 85:
                $element.multiselect('uncheckAll');
                break;
              case 70:
                $element.multiselect('flipAll');
                break;
              case 76:
                $element.multiselect('instance').$labels.first().trigger("mouseenter");
                break;
            }
          }
        },
        input: $.proxy(debounce(this._handler, opts.debounceMS), this),
        search: $.proxy(this._handler, this)
      });

      // automatically reset the widget on close?
      if (this.options.autoReset)
        $element.on('multiselectclose', $.proxy(this._reset, this));

      var $label = $(document.createElement('label')).text(opts.label).append(this.$input);
      this.$wrapper = $(document.createElement('div'))
                                 .addClass(' ui-multiselect-filter')
                                 .append($label)
                                 .prependTo(this.$header);

      // If menu already opened, have to reset menu height since
      // addition of the filter input changes the header height calc.
      if (!!this.instance._isOpen) {
         this.instance._setMenuHeight(true);
      }

      // cache input values for searching
      this.updateCache();

      // Change the normal _toggleChecked fxn behavior so that when checkAll/uncheckAll
      // is fired, only the currently displayed filtered inputs are checked if filter entered.
      var instance = this.instance;
      var filter = this.$input[0];
      instance._oldToggleChecked = instance._toggleChecked;
      instance._toggleChecked = function(flag, group) {
         instance._oldToggleChecked(flag, group, !!filter.value);
      };

    },

   /**
    * Handles searches as text is entered in the filter box.
    * Uses a text cache to speed up searching.
    * Debouncing is done to limit how often this is ran.
    * Alternate filter rules can be used.
    * Option group labels may be searched, also.
    * @param (object) event object from original event.
    */
    _handler: function(e) {
      var term = this.$input[0].value.toLowerCase().replace(/^\s+|\s+$/g,'');
      var filterRule = this.options.filterRule || 'contains';
      var regex = new RegExp( ( filterRules[filterRule] || filterRule ).replace('{{term}}', term.replace(rEscape, "\\$&")), 'i');
      var searchGroups = !!this.options.searchGroups;
      var $checkboxes = this.instance.$checkboxes;
      var cache = this.cache;   // Cached text() object
      var optgroupClass = "ui-multiselect-optgroup";
      var hiddenClass = 'ui-multiselect-excluded';

      this.$rows.toggleClass(hiddenClass, !!term);
      var filteredInputs = $checkboxes.children().map(function(x) {
        var $this = $(this);
        var $groupItems = $this;
        var groupShown = false;

         // Account for optgroups
         // If we are searching in option group labels and we match an optgroup label,
         // then show all its children and return all its inputs also.
        if ($this.hasClass(optgroupClass)) {
          var $groupItems = $this.find('li');
          if (searchGroups && regex.test( cache[x] ) ) {
             $this.removeClass(hiddenClass);
             $groupItems.removeClass(hiddenClass);
             return $groupItems.find('input').get();
          }
        }

        return $groupItems.map(function(y) {
          var $listItem = $(this);
          if ( regex.test( cache[x + '.' + y] ) ) {
            // Show the opt group heading if needed
            if (!groupShown) {
               $this.removeClass(hiddenClass);
               groupShown = true;
            }
            $listItem.removeClass(hiddenClass);
            return this.getElementsByTagName('input')[0];
          }
          return null;
        });

      });
      if (term) {
         this._trigger('filter', e, filteredInputs);
      }
      if (!this.instance.options.listbox) {
         this.instance._setMenuHeight(true);
      }
      return;
    },

    _reset: function() {
      this.$input.val('').trigger('input', '');
    },

   /**
    * Creates a text cache object from the widget options' text.
    * @param (boolean) alsoRefresh causes the displayed search results to refresh.
    */
    updateCache: function(alsoRefresh) {
      var cache = {};  // keys are like 0, 0.1, 1, 1.0, 1.1 etc.
      this.instance.$checkboxes.children().each(function(x) {
         var $element = $(this);
         // Account for optgroups
         if ($element.hasClass('ui-multiselect-optgroup')) {
            // Single number keys are the option labels
            cache[x] = $element.children('a').text();
            $element = $element.find('li');
         }
         $element.each(function(y) {
            cache[x + '.' + y] = $(this).text();
         });
      });
      this.cache = cache;
      this.$rows = this.instance.$checkboxes.find('li');
      if (!!alsoRefresh) {
         this._handler();
      }
    },

   /**
    * Returns the input wrapper div
    */
    widget: function() {
      return this.$wrapper;
    },

   /**
    * Destroys this widget
    */
    destroy: function() {
      $.Widget.prototype.destroy.call(this);
      this.$input.val('').trigger("keyup").off('keydown input search');
      this.instance.$menu.find('.ui-multiselect-header').removeClass('ui-multiselect-hasfilter');
      this.$wrapper.remove();
    }
  });

})(jQuery);
