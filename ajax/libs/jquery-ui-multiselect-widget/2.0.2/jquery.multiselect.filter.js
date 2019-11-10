/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, undef:true, curly:true, browser:true, jquery:true */
/*
 * jQuery MultiSelect UI Widget Filtering Plugin 2.0.1
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
      label: 'Filter:',
      width: null, /* override default width set in css file (px). null will inherit */
      placeholder: 'Enter keywords',
      autoReset: false,
      debounceMS: 250
    },

    _create: function() {
      var opts = this.options;
      var elem = $(this.element);

      // get the multiselect instance
      this.instance = elem.multiselect('instance');

      // store header; add filter class so the close/check all/uncheck all links can be positioned correctly
      this.header = this.instance.menu.find('.ui-multiselect-header').addClass('ui-multiselect-hasfilter');

      // wrapper elem
      this.input = $("<input/>").attr({
          placeholder: opts.placeholder,
          type: "search"
        }).css({
          width: (/\d/.test(opts.width) ? opts.width + 'px' : null)
        }).bind({
        keydown: function(e) {
          // prevent the enter key from submitting the form / closing the widget
          if(e.which === 13) {
            e.preventDefault();
          } else if(e.which === 27) {
            elem.multiselect('close');
            e.preventDefault();
          } else if(e.which === 9 && e.shiftKey) {
            elem.multiselect('close');
            e.preventDefault();
          } else if(e.altKey) {
            switch(e.which) {
              case 82:
                e.preventDefault();
                $(this).val('').trigger('input', '');
                break;
              case 65:
                elem.multiselect('checkAll');
                break;
              case 85:
                elem.multiselect('uncheckAll');
                break;
              case 76:
                elem.multiselect('instance').labels.first().trigger("mouseenter");
                break;
            }
          }
        },
        input: $.proxy(debounce(this._handler, opts.debounceMS), this),
        search: $.proxy(this._handler, this)
      });
      // automatically reset the widget on close?
      if(this.options.autoReset) {
        elem.bind('multiselectclose', $.proxy(this._reset, this));
      }
      // rebuild cache when multiselect is updated
      elem.bind('multiselectrefresh', $.proxy(function() {
        this.updateCache();
        this._handler();
      }, this));
      this.wrapper = $("<div/>").addClass("ui-multiselect-filter").text(opts.label).append(this.input).prependTo(this.header);

      // reference to the actual inputs
      this.inputs = this.instance.menu.find('input[type="checkbox"], input[type="radio"]');

      // cache input values for searching
      this.updateCache();

      // rewrite internal _toggleChecked fn so that when checkAll/uncheckAll is fired,
      // only the currently filtered elements are checked
      this.instance._toggleChecked = function(flag, group) {
        var $inputs = (group && group.length) ?  group : this.labels.find('input');
        var _self = this;

        // do not include hidden elems if the menu isn't open.
        var selector = _self._isOpen ?  ':disabled, :hidden' : ':disabled';

        $inputs = $inputs
          .not(selector)
          .each(this._toggleState('checked', flag));

        // update text
        this.update();

        // gather an array of the values that actually changed
        var values = {};
        $inputs.each(function() {
          values[this.value] = true;
        });

        // select option tags
        this.element.find('option').filter(function() {
          if(!this.disabled && values[this.value]) {
            _self._toggleState('selected', flag).call(this);
          }
        });

        // trigger the change event on the select
        if($inputs.length) {
          this.element.trigger('change');
        }
      };
    },

    // thx for the logic here ben alman
    _handler: function(e) {
      var term = $.trim(this.input[0].value.toLowerCase()),

      // speed up lookups
      rows = this.rows, inputs = this.inputs, cache = this.cache;
      var $groups = this.instance.menu.find(".ui-multiselect-optgroup");
      $groups.show();
      if(!term) {
        rows.show();
      } else {
        rows.hide();

        var regex = new RegExp(term.replace(rEscape, "\\$&"), 'gi');

        this._trigger("filter", e, $.map(cache, function(v, i) {
          if(v.search(regex) !== -1) {
            rows.eq(i).show();
            return inputs.get(i);
          }

          return null;
        }));
      }

      // show/hide optgroups
      $groups.each(function() {
        var $this = $(this);
        // check with a function on display:none css instead of using :visible selector because newly created
        // (on refresh) items are by default not (yet) visible but not hidden on purpose with the display:none.
        if(!$this.children('li').filter(function () { return $.css(this, "display") !== 'none' }).length) {
          $this.hide();
        }
      });
      this.instance._setMenuHeight();
    },

    _reset: function() {
      this.input.val('').trigger('input', '');
    },

    updateCache: function() {
      // each list item
      this.rows = this.instance.labels.parent();

      // cache
      this.cache = this.element.children().map(function() {
        var elem = $(this);

        // account for optgroups
        if(this.tagName.toLowerCase() === "optgroup") {
          elem = elem.children();
        }

        return elem.map(function() {
          return this.innerHTML.toLowerCase();
        }).get();
      }).get();
    },

    widget: function() {
      return this.wrapper;
    },

    destroy: function() {
      $.Widget.prototype.destroy.call(this);
      this.input.val('').trigger("keyup");
      this.wrapper.remove();
    }
  });

})(jQuery);
