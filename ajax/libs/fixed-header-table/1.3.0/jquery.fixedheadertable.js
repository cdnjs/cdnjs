/*!
 * jquery.fixedHeaderTable. The jQuery fixedHeaderTable plugin
 *
 * Copyright (c) 2013 Mark Malek
 * http://fixedheadertable.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * http://docs.jquery.com/Plugins/Authoring
 * jQuery authoring guidelines
 *
 * Launch  : October 2009
 * Version : 1.3
 * Released: May 9th, 2011
 *
 *
 * all CSS sizing (width,height) is done in pixels (px)
 */

(function ($) {

  $.fn.fixedHeaderTable = function (method) {

    // plugin's default options
    var defaults = {
      width:          '100%',
      height:         '100%',
      themeClass:     'fht-default',
      borderCollapse:  true,
      fixedColumns:    0, // fixed first columns
      fixedColumn:     false, // For backward-compatibility
      sortable:        false,
      autoShow:        true, // hide table after its created
      footer:          false, // show footer
      cloneHeadToFoot: false, // clone head and use as footer
      autoResize:      false, // resize table if its parent wrapper changes size
      create:          null // callback after plugin completes
    };

    var settings = {};

    // public methods
    var methods = {
      init: function (options) {
        settings = $.extend({}, defaults, options);

        // iterate through all the DOM elements we are attaching the plugin to
        return this.each(function () {
          var $self = $(this); // reference the jQuery version of the current DOM element

          if (helpers._isTable($self)) {
            methods.setup.apply(this, Array.prototype.slice.call(arguments, 1));
            $.isFunction(settings.create) && settings.create.call(this);
          } else {
            $.error('Invalid table mark-up');
          }
        });
      },

      /*
       * Setup table structure for fixed headers and optional footer
       */
      setup: function () {
        var $self       = $(this),
            self        = this,
            $thead      = $self.find('thead'),
            $tfoot      = $self.find('tfoot'),
            tfootHeight = 0,
            $wrapper,
            $divHead,
            $divBody,
            $fixedBody,
            widthMinusScrollbar;

        settings.originalTable = $(this).clone();
        settings.includePadding = helpers._isPaddingIncludedWithWidth();
        settings.scrollbarOffset = helpers._getScrollbarWidth();
        settings.themeClassName = settings.themeClass;

        if (settings.width.search('%') > -1) {
            widthMinusScrollbar = $self.parent().width() - settings.scrollbarOffset;
        } else {
            widthMinusScrollbar = settings.width - settings.scrollbarOffset;
        }

        $self.css({
          width: widthMinusScrollbar
        });


        if (!$self.closest('.fht-table-wrapper').length) {
          $self.addClass('fht-table');
          $self.wrap('<div class="fht-table-wrapper"></div>');
        }

        $wrapper = $self.closest('.fht-table-wrapper');

        if(settings.fixedColumn == true && settings.fixedColumns <= 0) {
          settings.fixedColumns = 1;
        }

        if (settings.fixedColumns > 0 && $wrapper.find('.fht-fixed-column').length == 0) {
          $self.wrap('<div class="fht-fixed-body"></div>');

          $('<div class="fht-fixed-column"></div>').prependTo($wrapper);

          $fixedBody    = $wrapper.find('.fht-fixed-body');
        }

        $wrapper.css({
          width: settings.width,
          height: settings.height
        })
          .addClass(settings.themeClassName);

        if (!$self.hasClass('fht-table-init')) {
          $self.wrap('<div class="fht-tbody"></div>');
        }

        $divBody = $self.closest('.fht-tbody');

        var tableProps = helpers._getTableProps($self);

        helpers._setupClone($divBody, tableProps.tbody);

        if (!$self.hasClass('fht-table-init')) {
          if (settings.fixedColumns > 0) {
            $divHead = $('<div class="fht-thead"><table class="fht-table"></table></div>').prependTo($fixedBody);
          } else {
            $divHead = $('<div class="fht-thead"><table class="fht-table"></table></div>').prependTo($wrapper);
          }

          $divHead.find('table.fht-table')
            .addClass(settings.originalTable.attr('class'))
            .attr('style', settings.originalTable.attr('style'));

          $thead.clone().appendTo($divHead.find('table'));
        } else {
          $divHead = $wrapper.find('div.fht-thead');
        }

        helpers._setupClone($divHead, tableProps.thead);

        $self.css({
          'margin-top': -$divHead.outerHeight(true)
        });

        /*
         * Check for footer
         * Setup footer if present
         */
        if (settings.footer == true) {
          helpers._setupTableFooter($self, self, tableProps);

          if (!$tfoot.length) {
            $tfoot = $wrapper.find('div.fht-tfoot table');
          }

          tfootHeight = $tfoot.outerHeight(true);
        }

        var tbodyHeight = $wrapper.height() - $thead.outerHeight(true) - tfootHeight - tableProps.border;

        $divBody.css({
          'height': tbodyHeight
        });

        $self.addClass('fht-table-init');

        if (typeof(settings.altClass) !== 'undefined') {
          methods.altRows.apply(self);
        }

        if (settings.fixedColumns > 0) {
          helpers._setupFixedColumn($self, self, tableProps);
        }

        if (!settings.autoShow) {
          $wrapper.hide();
        }

        helpers._bindScroll($divBody, tableProps);

        return self;
      },

      /*
       * Resize the table
       * Incomplete - not implemented yet
       */
      resize: function() {
        var self  = this;
        return self;
      },

      /*
       * Add CSS class to alternating rows
       */
      altRows: function(arg1) {
        var $self = $(this),
        altClass  = (typeof(arg1) !== 'undefined') ? arg1 : settings.altClass;

        $self.closest('.fht-table-wrapper')
          .find('tbody tr:odd:not(:hidden)')
          .addClass(altClass);
      },

      /*
       * Show a hidden fixedHeaderTable table
       */
      show: function(arg1, arg2, arg3) {
        var $self   = $(this),
            self      = this,
            $wrapper  = $self.closest('.fht-table-wrapper');

        // User provided show duration without a specific effect
        if (typeof(arg1) !== 'undefined' && typeof(arg1) === 'number') {
          $wrapper.show(arg1, function() {
            $.isFunction(arg2) && arg2.call(this);
          });

          return self;

        } else if (typeof(arg1) !== 'undefined' && typeof(arg1) === 'string' &&
          typeof(arg2) !== 'undefined' && typeof(arg2) === 'number') {
          // User provided show duration with an effect

          $wrapper.show(arg1, arg2, function() {
            $.isFunction(arg3) && arg3.call(this);
          });

          return self;

        }

        $self.closest('.fht-table-wrapper')
          .show();
        $.isFunction(arg1) && arg1.call(this);

        return self;
      },

      /*
       * Hide a fixedHeaderTable table
       */
      hide: function(arg1, arg2, arg3) {
        var $self     = $(this),
            self    = this,
            $wrapper  = $self.closest('.fht-table-wrapper');

        // User provided show duration without a specific effect
        if (typeof(arg1) !== 'undefined' && typeof(arg1) === 'number') {
          $wrapper.hide(arg1, function() {
            $.isFunction(arg3) && arg3.call(this);
          });

          return self;
        } else if (typeof(arg1) !== 'undefined' && typeof(arg1) === 'string' &&
          typeof(arg2) !== 'undefined' && typeof(arg2) === 'number') {

          $wrapper.hide(arg1, arg2, function() {
            $.isFunction(arg3) && arg3.call(this);
          });

          return self;
        }

        $self.closest('.fht-table-wrapper')
          .hide();

        $.isFunction(arg3) && arg3.call(this);



        return self;
      },

      /*
       * Destory fixedHeaderTable and return table to original state
       */
      destroy: function() {
        var $self    = $(this),
            self     = this,
            $wrapper = $self.closest('.fht-table-wrapper');

        $self.insertBefore($wrapper)
          .removeAttr('style')
          .append($wrapper.find('tfoot'))
          .removeClass('fht-table fht-table-init')
          .find('.fht-cell')
          .remove();

        $wrapper.remove();

        return self;
      }

    };

    // private methods
    var helpers = {

      /*
       * return boolean
       * True if a thead and tbody exist.
       */
      _isTable: function($obj) {
        var $self = $obj,
            hasTable = $self.is('table'),
            hasThead = $self.find('thead').length > 0,
            hasTbody = $self.find('tbody').length > 0;

        if (hasTable && hasThead && hasTbody) {
          return true;
        }

        return false;

      },

      /*
       * return void
       * bind scroll event
       */
      _bindScroll: function($obj) {
        var $self = $obj,
            $wrapper = $self.closest('.fht-table-wrapper'),
            $thead = $self.siblings('.fht-thead'),
            $tfoot = $self.siblings('.fht-tfoot');

        $self.bind('scroll', function() {
          if (settings.fixedColumns > 0) {
            var $fixedColumns = $wrapper.find('.fht-fixed-column');

            $fixedColumns.find('.fht-tbody table')
              .css({
                  'margin-top': -$self.scrollTop()
              });
          }

          $thead.find('table')
            .css({
              'margin-left': -this.scrollLeft
            });

          if (settings.footer || settings.cloneHeadToFoot) {
            $tfoot.find('table')
              .css({
                'margin-left': -this.scrollLeft
              });
          }
        });
      },

      /*
       * return void
       */
      _fixHeightWithCss: function ($obj, tableProps) {
        if (settings.includePadding) {
          $obj.css({
            'height': $obj.height() + tableProps.border
          });
        } else {
          $obj.css({
            'height': $obj.parent().height() + tableProps.border
          });
        }
      },

      /*
       * return void
       */
      _fixWidthWithCss: function($obj, tableProps, width) {
        if (settings.includePadding) {
          $obj.each(function() {
            $(this).css({
              'width': width == undefined ? $(this).width() + tableProps.border : width + tableProps.border
            });
          });
        } else {
          $obj.each(function() {
            $(this).css({
              'width': width == undefined ? $(this).parent().width() + tableProps.border : width + tableProps.border
            });
          });
        }

      },

      /*
       * return void
       */
      _setupFixedColumn: function ($obj, obj, tableProps) {
        var $self             = $obj,
            $wrapper          = $self.closest('.fht-table-wrapper'),
            $fixedBody        = $wrapper.find('.fht-fixed-body'),
            $fixedColumn      = $wrapper.find('.fht-fixed-column'),
            $thead            = $('<div class="fht-thead"><table class="fht-table"><thead><tr></tr></thead></table></div>'),
            $tbody            = $('<div class="fht-tbody"><table class="fht-table"><tbody></tbody></table></div>'),
            $tfoot            = $('<div class="fht-tfoot"><table class="fht-table"><tfoot><tr></tr></tfoot></table></div>'),
            fixedBodyWidth    = $wrapper.width(),
            fixedBodyHeight   = $fixedBody.find('.fht-tbody').height() - settings.scrollbarOffset,
            $firstThChildren,
            $firstTdChildren,
            fixedColumnWidth,
            $newRow,
            firstTdChildrenSelector;

        $thead.find('table.fht-table').addClass(settings.originalTable.attr('class'));
        $tbody.find('table.fht-table').addClass(settings.originalTable.attr('class'));
        $tfoot.find('table.fht-table').addClass(settings.originalTable.attr('class'));

        $firstThChildren = $fixedBody.find('.fht-thead thead tr > *:lt(' + settings.fixedColumns + ')');
        fixedColumnWidth = settings.fixedColumns * tableProps.border;
        $firstThChildren.each(function() {
          fixedColumnWidth += $(this).outerWidth(true);
        });

        // Fix cell heights
        helpers._fixHeightWithCss($firstThChildren, tableProps);
        helpers._fixWidthWithCss($firstThChildren, tableProps);

        var tdWidths = [];
        $firstThChildren.each(function() {
          tdWidths.push($(this).width());
        });

        firstTdChildrenSelector = 'tbody tr > *:not(:nth-child(n+' + (settings.fixedColumns + 1) + '))';
        $firstTdChildren = $fixedBody.find(firstTdChildrenSelector)
          .each(function(index) {
            helpers._fixHeightWithCss($(this), tableProps);
            helpers._fixWidthWithCss($(this), tableProps, tdWidths[index % settings.fixedColumns] );
          });

        // clone header
        $thead.appendTo($fixedColumn)
          .find('tr')
          .append($firstThChildren.clone());

        $tbody.appendTo($fixedColumn)
          .css({
            'margin-top': -1,
            'height': fixedBodyHeight + tableProps.border
          });

        $firstTdChildren.each(function(index) {
          if (index % settings.fixedColumns == 0) {
            $newRow = $('<tr></tr>').appendTo($tbody.find('tbody'));

            if (settings.altClass && $(this).parent().hasClass(settings.altClass)) {
              $newRow.addClass(settings.altClass);
            }
          }

          $(this).clone()
            .appendTo($newRow);
        });

        // set width of fixed column wrapper
        $fixedColumn.css({
          'height': 0,
          'width': fixedColumnWidth
        });


        // bind mousewheel events
        var maxTop = $fixedColumn.find('.fht-tbody .fht-table').height() - $fixedColumn.find('.fht-tbody').height();
        $fixedColumn.find('.fht-tbody .fht-table').bind('mousewheel', function(event, delta, deltaX, deltaY) {
          if (deltaY == 0) {
            return;
          }
          var top = parseInt($(this).css('marginTop'), 10) + (deltaY > 0 ? 120 : -120);
          if (top > 0) {
            top = 0;
          }
          if (top < -maxTop) {
            top = -maxTop;
          }
          $(this).css('marginTop', top);
          $fixedBody.find('.fht-tbody').scrollTop(-top).scroll();
          return false;
        });


        // set width of body table wrapper
        $fixedBody.css({
          'width': fixedBodyWidth
        });

        // setup clone footer with fixed column
        if (settings.footer == true || settings.cloneHeadToFoot == true) {
          var $firstTdFootChild = $fixedBody.find('.fht-tfoot tr > *:lt(' + settings.fixedColumns + ')'),
              footwidth;

          helpers._fixHeightWithCss($firstTdFootChild, tableProps);
          $tfoot.appendTo($fixedColumn)
            .find('tr')
            .append($firstTdFootChild.clone());
          // Set (view width) of $tfoot div to width of table (this accounts for footers with a colspan)
          footwidth = $tfoot.find('table').innerWidth();
          $tfoot.css({
            'top': settings.scrollbarOffset,
            'width': footwidth
          });
        }
      },

      /*
       * return void
       */
      _setupTableFooter: function ($obj, obj, tableProps) {
        var $self     = $obj,
            $wrapper  = $self.closest('.fht-table-wrapper'),
            $tfoot    = $self.find('tfoot'),
            $divFoot  = $wrapper.find('div.fht-tfoot');

        if (!$divFoot.length) {
          if (settings.fixedColumns > 0) {
            $divFoot = $('<div class="fht-tfoot"><table class="fht-table"></table></div>').appendTo($wrapper.find('.fht-fixed-body'));
          } else {
            $divFoot = $('<div class="fht-tfoot"><table class="fht-table"></table></div>').appendTo($wrapper);
          }
        }
        $divFoot.find('table.fht-table').addClass(settings.originalTable.attr('class'));

        switch (true) {
          case !$tfoot.length && settings.cloneHeadToFoot == true && settings.footer == true:

            var $divHead = $wrapper.find('div.fht-thead');

            $divFoot.empty();
            $divHead.find('table')
              .clone()
              .appendTo($divFoot);

            break;
          case $tfoot.length && settings.cloneHeadToFoot == false && settings.footer == true:

            $divFoot.find('table')
              .append($tfoot)
              .css({
                'margin-top': -tableProps.border
              });

            helpers._setupClone($divFoot, tableProps.tfoot);

            break;
        }

      },

      /*
       * return object
       * Widths of each thead cell and tbody cell for the first rows.
       * Used in fixing widths for the fixed header and optional footer.
       */
      _getTableProps: function($obj) {
        var tableProp = {
              thead: {},
              tbody: {},
              tfoot: {},
              border: 0
            },
            borderCollapse = 1;

        if (settings.borderCollapse == true) {
          borderCollapse = 2;
        }

        tableProp.border = ($obj.find('th:first-child').outerWidth() - $obj.find('th:first-child').innerWidth()) / borderCollapse;

        $obj.find('thead tr:first-child > *').each(function(index) {
          tableProp.thead[index] = $(this).width() + tableProp.border;
        });

        $obj.find('tfoot tr:first-child > *').each(function(index) {
          tableProp.tfoot[index] = $(this).width() + tableProp.border;
        });

        $obj.find('tbody tr:first-child > *').each(function(index) {
          tableProp.tbody[index] = $(this).width() + tableProp.border;
        });

        return tableProp;
      },

      /*
       * return void
       * Fix widths of each cell in the first row of obj.
       */
      _setupClone: function($obj, cellArray) {
        var $self    = $obj,
            selector = ($self.find('thead').length) ?
              'thead tr:first-child > *' :
              ($self.find('tfoot').length) ?
              'tfoot tr:first-child > *' :
              'tbody tr:first-child > *',
            $cell;

        $self.find(selector).each(function(index) {
          $cell = ($(this).find('div.fht-cell').length) ? $(this).find('div.fht-cell') : $('<div class="fht-cell"></div>').appendTo($(this));

          $cell.css({
            'width': parseInt(cellArray[index], 10)
          });

          /*
           * Fixed Header and Footer should extend the full width
           * to align with the scrollbar of the body
           */
          if (!$(this).closest('.fht-tbody').length && $(this).is(':last-child') && !$(this).closest('.fht-fixed-column').length) {
            var padding = Math.max((($(this).innerWidth() - $(this).width()) / 2), settings.scrollbarOffset);
            $(this).css({
              'padding-right': parseInt($(this).css('padding-right')) + padding + 'px'
            });
          }
        });
      },

      /*
       * return boolean
       * Determine how the browser calculates fixed widths with padding for tables
       * true if width = padding + width
       * false if width = width
       */
      _isPaddingIncludedWithWidth: function() {
        var $obj = $('<table class="fht-table"><tr><td style="padding: 10px; font-size: 10px;">test</td></tr></table>'),
            defaultHeight,
            newHeight;

        $obj.addClass(settings.originalTable.attr('class'));
        $obj.appendTo('body');

        defaultHeight = $obj.find('td').height();

        $obj.find('td')
          .css('height', $obj.find('tr').height());

        newHeight = $obj.find('td').height();
        $obj.remove();

        if (defaultHeight != newHeight) {
          return true;
        } else {
          return false;
        }

      },

      /*
       * return int
       * get the width of the browsers scroll bar
       */
      _getScrollbarWidth: function() {
        var scrollbarWidth = 0;

        if (!scrollbarWidth) {
          if (/msie/.test(navigator.userAgent.toLowerCase())) {
            var $textarea1 = $('<textarea cols="10" rows="2"></textarea>')
                  .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body'),
                $textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>')
                  .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body');

            scrollbarWidth = $textarea1.width() - $textarea2.width() + 2; // + 2 for border offset
            $textarea1.add($textarea2).remove();
          } else {
            var $div = $('<div />')
                  .css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 })
                  .prependTo('body').append('<div />').find('div')
                  .css({ width: '100%', height: 200 });

            scrollbarWidth = 100 - $div.width();
            $div.parent().remove();
          }
        }

        return scrollbarWidth;
      }

    };


    // if a method as the given argument exists
    if (methods[method]) {

      // call the respective method
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

      // if an object is given as method OR nothing is given as argument
    } else if (typeof method === 'object' || !method) {

      // call the initialization method
      return methods.init.apply(this, arguments);

      // otherwise
    } else {

      // trigger an error
      $.error('Method "' +  method + '" does not exist in fixedHeaderTable plugin!');

    }

  };

})(jQuery);