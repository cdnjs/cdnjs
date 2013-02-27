/*!
 * FooTable - Awesome Responsive Tables
 * http://themergency.com/footable
 *
 * Requires jQuery - http://jquery.com/
 *
 * Copyright 2012 Steven Usher & Brad Vincent
 * Released under the MIT license
 * You are free to use FooTable in commercial projects as long as this copyright header is left intact.
 *
 * Date: 18 Nov 2012
 */
(function ($, w, undefined) {
  w.footable = {
    options: {
      delay: 100, // The number of millseconds to wait before triggering the react event
      breakpoints: { // The different screen resolution breakpoints
        phone: 480,
        tablet: 1024
      },
      parsers: {  // The default parser to parse the value out of a cell (values are used in building up row detail)
        alpha: function (cell) {
          return $(cell).data('value') || $.trim($(cell).text());
        }
      },
      toggleSelector: ' > tbody > tr:not(.footable-row-detail)', //the selector to show/hide the detail row
      createDetail: function (element, data) {
        /// <summary>This function is used by FooTable to generate the detail view seen when expanding a collapsed row.</summary>
        /// <param name="element">This is the div that contains all the detail row information, anything could be added to it.</param>
        /// <param name="data">
        ///  This is an array of objects containing the cell information for the current row.
        ///  These objects look like the below:
        ///    obj = {
        ///      'name': String, // The name of the column
        ///      'value': Object, // The value parsed from the cell using the parsers. This could be a string, a number or whatever the parser outputs.
        ///      'display': String, // This is the actual HTML from the cell, so if you have images etc you want moved this is the one to use and is the default value used.
        ///      'group': String, // This is the identifier used in the data-group attribute of the column.
        ///      'groupName': String // This is the actual name of the group the column belongs to.
        ///    }
        /// </param>
        
        var groups = { '_none': { 'name': null, 'data': [] } };
        for (var i = 0; i < data.length; i++) {
          var groupid = data[i].group;
          if (groupid != null) {
            if (!(groupid in groups))
              groups[groupid] = { 'name': data[i].groupName, 'data': [] };
            
            groups[groupid].data.push(data[i]);
          } else {
            groups._none.data.push(data[i]);
          }
        }
        
        for (var group in groups) {
          if (groups[group].data.length == 0) continue;
          if (group != '_none') element.append('<h4>' + groups[group].name + '</h4>');
          
          for (var j = 0; j < groups[group].data.length; j++) {
            element.append('<div><strong>' + groups[group].data[j].name + '</strong> : ' + groups[group].data[j].display + '</div>');
          }
        }
      },
      classes: {
        loading : 'footable-loading',
        loaded : 'footable-loaded',
        sorted : 'footable-sorted',
        descending : 'footable-sorted-desc',
        indicator : 'footable-sort-indicator'
      },
      debug: false // Whether or not to log information to the console.
    },

    version: {
      major: 0, minor: 1,
      toString: function () {
        return w.footable.version.major + '.' + w.footable.version.minor;
      },
      parse: function (str) {
        version = /(\d+)\.?(\d+)?\.?(\d+)?/.exec(str);
        return {
          major: parseInt(version[1]) || 0,
          minor: parseInt(version[2]) || 0,
          patch: parseInt(version[3]) || 0
        };
      }
    },

    plugins: {
      _validate: function (plugin) {
        ///<summary>Simple validation of the <paramref name="plugin"/> to make sure any members called by Foobox actually exist.</summary>
        ///<param name="plugin">The object defining the plugin, this should implement a string property called "name" and a function called "init".</param>

        if (typeof plugin['name'] !== 'string') {
          if (w.footable.options.debug == true) console.error('Validation failed, plugin does not implement a string property called "name".', plugin);
          return false;
        }
        if (!$.isFunction(plugin['init'])) {
          if (w.footable.options.debug == true) console.error('Validation failed, plugin "' + plugin['name'] + '" does not implement a function called "init".', plugin);
          return false;
        }
        if (w.footable.options.debug == true) console.log('Validation succeeded for plugin "' + plugin['name'] + '".', plugin);
        return true;
      },
      registered: [], // An array containing all registered plugins.
      register: function (plugin, options) {
        ///<summary>Registers a <paramref name="plugin"/> and its default <paramref name="options"/> with Foobox.</summary>
        ///<param name="plugin">The plugin that should implement a string property called "name" and a function called "init".</param>
        ///<param name="options">The default options to merge with the Foobox's base options.</param>

        if (w.footable.plugins._validate(plugin)) {
          w.footable.plugins.registered.push(plugin);
          if (options != undefined && typeof options === 'object') $.extend(true, w.footable.options, options);
          if (w.footable.options.debug == true) console.log('Plugin "' + plugin['name'] + '" has been registered with the Foobox.', plugin);
        }
      },
      init: function (instance) {
        ///<summary>Loops through all registered plugins and calls the "init" method supplying the current <paramref name="instance"/> of the Foobox as the first parameter.</summary>
        ///<param name="instance">The current instance of the Foobox that the plugin is being initialized for.</param>

        for(var i = 0; i < w.footable.plugins.registered.length; i++){
          try {
            w.footable.plugins.registered[i]['init'](instance);
          } catch(err) {
            if (w.footable.options.debug == true) console.error(err);
          }
        }
      }
    }
  };

  var instanceCount = 0;

  $.fn.footable = function(options) {
    ///<summary>The main constructor call to initialize the plugin using the supplied <paramref name="options"/>.</summary>
    ///<param name="options">
    ///<para>A JSON object containing user defined options for the plugin to use. Any options not supplied will have a default value assigned.</para>
    ///<para>Check the documentation or the default options object above for more information on available options.</para>
    ///</param>

    options=options||{};
    var o=$.extend(true,{},w.footable.options,options); //merge user and default options
    return this.each(function () {
      instanceCount++;
      this.footable = new Footable(this, o, instanceCount);
    });
  };

  //helper for using timeouts
  function Timer() {
    ///<summary>Simple timer object created around a timeout.</summary>
    var t=this;
    t.id=null;
    t.busy=false;
    t.start=function (code,milliseconds) {
      ///<summary>Starts the timer and waits the specified amount of <paramref name="milliseconds"/> before executing the supplied <paramref name="code"/>.</summary>
      ///<param name="code">The code to execute once the timer runs out.</param>
      ///<param name="milliseconds">The time in milliseconds to wait before executing the supplied <paramref name="code"/>.</param>

      if (t.busy) {return;}
      t.stop();
      t.id=setTimeout(function () {
        code();
        t.id=null;
        t.busy=false;
      },milliseconds);
      t.busy=true;
    };
    t.stop=function () {
      ///<summary>Stops the timer if its runnning and resets it back to its starting state.</summary>

      if(t.id!=null) {
        clearTimeout(t.id);
        t.id=null;
        t.busy=false;
      }
    };
  };

  function Footable(t, o, id) {
    ///<summary>Inits a new instance of the plugin.</summary>
    ///<param name="t">The main table element to apply this plugin to.</param>
    ///<param name="o">The options supplied to the plugin. Check the defaults object to see all available options.</param>
    ///<param name="id">The id to assign to this instance of the plugin.</param>

    var ft = this;
    ft.id = id;
    ft.table = t;
    ft.options = o;
    ft.breakpoints = [];
    ft.breakpointNames = '';
    ft.columns = {};
    
    var opt = ft.options;
    var cls = opt.classes;
    var indexOffset = 0;

    // This object simply houses all the timers used in the footable.
    ft.timers = {
      resize: new Timer(),
      register: function (name) {
        ft.timers[name] = new Timer();
        return ft.timers[name];
      }
    };

    w.footable.plugins.init(ft);

    ft.init = function() {
      var $window = $(w), $table = $(ft.table);

      if ($table.hasClass(cls.loaded)) {
        //already loaded FooTable for the table, so don't init again
        ft.raise('footable_already_initialized');
        return;
      }

      $table.addClass(cls.loading);

      // Get the column data once for the life time of the plugin
      $table.find('> thead > tr:last-child > th, > thead > tr:last-child > td').each(function() {
        var data = ft.getColumnData(this);
        ft.columns[data.index] = data;

        if (data.className != null) {
          var selector = '', first = true;
          $.each(data.matches, function(m, match) { //support for colspans
            if (!first) { selector += ', '; }
            selector += '> tbody > tr:not(.footable-row-detail) > td:nth-child(' + (parseInt(match) + 1) + ')';
            first = false;
          });
          //add the className to the cells specified by data-class="blah"
          $table.find(selector).not('.footable-cell-detail').addClass(data.className);
        }
      });

      // Create a nice friendly array to work with out of the breakpoints object.
      for(var name in opt.breakpoints) {
        ft.breakpoints.push({ 'name': name, 'width': opt.breakpoints[name] });
        ft.breakpointNames += (name + ' ');
      }

      // Sort the breakpoints so the smallest is checked first
      ft.breakpoints.sort(function(a, b) { return a['width'] - b['width']; });

      //bind the toggle selector click events
      ft.bindToggleSelectors();

      ft.raise('footable_initializing');

      $table.bind('footable_initialized', function () {
        //resize the footable onload
        ft.resize();

        //remove the loading class
        $table.removeClass(cls.loading);

        //hides all elements within the table that have the attribute data-hide="init"
        $table.find('[data-init="hide"]').hide();
        $table.find('[data-init="show"]').show();

        //add the loaded class
        $table.addClass(cls.loaded);
      });

      $window
        .bind('resize.footable', function () {
          ft.timers.resize.stop();
          ft.timers.resize.start(function() {
            ft.resize();
          }, opt.delay);
        });

      ft.raise('footable_initialized');
    };
    
    //moved this out into it's own function so that it can be called from other add-ons
    ft.bindToggleSelectors = function() {
      var $table = $(ft.table);
      $table.find(opt.toggleSelector).unbind('click.footable').bind('click.footable', function (e) {
        if ($table.is('.breakpoint') && $(e.target).is('td')) {
          var $row = $(this).is('tr') ? $(this) : $(this).parents('tr:first');
          ft.toggleDetail($row.get(0));
        }
      });      
    };

    ft.parse = function(cell, column) {
      var parser = opt.parsers[column.type] || opt.parsers.alpha;
      return parser(cell);
    };

    ft.getColumnData = function(th) {
      var $th = $(th), hide = $th.data('hide'), index = $th.index();
      hide = hide || '';
      hide = hide.split(',');
      var data = {
        'index': index,
        'hide': { },
        'type': $th.data('type') || 'alpha',
        'name': $th.data('name') || $.trim($th.text()),
        'ignore': $th.data('ignore') || false,
        'className': $th.data('class') || null,
        'matches': [],
        'names': { },
        'group': $th.data('group') || null,
        'groupName': null
      };
      
      if (data.group != null) {
        var $group = $(ft.table).find('> thead > tr.footable-group-row > th[data-group="' + data.group + '"], > thead > tr.footable-group-row > td[data-group="' + data.group + '"]').first();
        data.groupName = ft.parse($group, { 'type': 'alpha' });
      }

      var pcolspan = parseInt($th.prev().attr('colspan') || 0);
      indexOffset += pcolspan > 1 ? pcolspan - 1 : 0;
      var colspan = parseInt($th.attr('colspan') || 0), curindex = data.index + indexOffset;
      if (colspan > 0) {
        var names = $th.data('names');
        names = names || '';
        names = names.split(',');
        for (var i = 0; i < colspan; i++) {
          data.matches.push(i + curindex);
          if (i < names.length) data.names[i + curindex] = names[i];
        }
      } else {
        data.matches.push(curindex);
      }
      
      data.hide['default'] = ($th.data('hide')==="all") || ($.inArray('default', hide) >= 0);

      for(var name in opt.breakpoints) {
        data.hide[name] = ($th.data('hide')==="all") || ($.inArray(name, hide) >= 0);
      }
      var e = ft.raise('footable_column_data', { 'column': { 'data': data, 'th': th } });
      return e.column.data;
    };

    ft.getViewportWidth = function() {
      return window.innerWidth || (document.body ? document.body.offsetWidth : 0);
    };

    ft.getViewportHeight = function() {
      return window.innerHeight || (document.body ? document.body.offsetHeight : 0);
    };

    ft.hasBreakpointColumn = function(breakpoint) {
      for(var c in ft.columns) {
        if (ft.columns[c].hide[breakpoint]) {
          return true;
        }
      }
      return false;
    };

    ft.resize = function() {
      var $table = $(ft.table);
      var info = {
        'width': $table.width(),                  //the table width
        'height': $table.height(),                //the table height
        'viewportWidth': ft.getViewportWidth(),   //the width of the viewport
        'viewportHeight': ft.getViewportHeight(), //the width of the viewport
        'orientation': null
      };
      info.orientation = info.viewportWidth > info.viewportHeight ? 'landscape' : 'portrait';

      if (info.viewportWidth < info.width) info.width = info.viewportWidth;
      if (info.viewportHeight < info.height) info.height = info.viewportHeight;

      var pinfo = $table.data('footable_info');
      $table.data('footable_info', info);
      ft.raise('footable_resizing', { 'old': pinfo, 'info': info });

      // This (if) statement is here purely to make sure events aren't raised twice as mobile safari seems to do
      if (!pinfo || ((pinfo && pinfo.width && pinfo.width != info.width) || (pinfo && pinfo.height && pinfo.height != info.height))) {
        var current = null, breakpoint;
        for (var i = 0; i < ft.breakpoints.length; i++) {
          breakpoint = ft.breakpoints[i];
          if (breakpoint && breakpoint.width && info.width <= breakpoint.width) {
            current = breakpoint;
            break;
          }
        }

        var breakpointName = (current == null ? 'default' : current['name']);

        var hasBreakpointFired = ft.hasBreakpointColumn(breakpointName);

        $table
          .removeClass('default breakpoint').removeClass(ft.breakpointNames)
          .addClass(breakpointName + (hasBreakpointFired ? ' breakpoint' : ''))
          .find('> thead > tr:last-child > th')
            .each(function() {
              var data = ft.columns[$(this).index()], selector = '', first = true;
              $.each(data.matches, function(m, match) {
                if (!first) { selector += ', '; }
                var count = match + 1;
                selector += '> tbody > tr:not(.footable-row-detail) > td:nth-child(' + count + ')';
                selector += ', > tfoot > tr:not(.footable-row-detail) > td:nth-child(' + count + ')';
                selector += ', > colgroup > col:nth-child(' + count + ')';
                first = false;
              });
              
              selector += ', > thead > tr[data-group-row="true"] > th[data-group="'+data.group+'"]';
              var $column = $table.find(selector).add(this);
              if (data.hide[breakpointName] == false) $column.show();
              else $column.hide();

              if ($table.find('> thead > tr.footable-group-row').length == 1) {
                var $groupcols = $table.find('> thead > tr:last-child > th[data-group="' + data.group + '"]:visible, > thead > tr:last-child > th[data-group="' + data.group + '"]:visible'),
                  $group = $table.find('> thead > tr.footable-group-row > th[data-group="' + data.group + '"], > thead > tr.footable-group-row > td[data-group="' + data.group + '"]'),
                  groupspan = 0;

                $.each($groupcols, function() { groupspan += parseInt($(this).attr('colspan') || 1); });

                if (groupspan > 0) $group.attr('colspan', groupspan).show();
                else $group.hide();
              }
            })
          .end()
          .find('> tbody > tr.footable-detail-show').each(function() {
            ft.createOrUpdateDetailRow(this);
          });

        $table.find('> tbody > tr.footable-detail-show:visible').each(function() {
          var $next = $(this).next();
          if ($next.hasClass('footable-row-detail')) {
            if (breakpointName == 'default' && !hasBreakpointFired) $next.hide();
            else $next.show();
          }
        });
        
        // adding .footable-first-column and .footable-last-column to the first and last th and td of each row in order to allow 
        // for styling if the first or last column is hidden (which won't work using :first-child or :last-child)
        $table.find('> thead > tr > th.footable-last-column, > tbody > tr > td.footable-last-column').removeClass('footable-last-column');
        $table.find('> thead > tr > th.footable-first-column, > tbody > tr > td.footable-first-column').removeClass('footable-first-column');
        $table.find('> thead > tr, > tbody > tr')
          .find('> th:visible:last, > td:visible:last')
            .addClass('footable-last-column')
          .end()
          .find('> th:visible:first, > td:visible:first')
            .addClass('footable-first-column');
        
        ft.raise('footable_breakpoint_' + breakpointName, { 'info': info });
      }
      
      ft.raise('footable_resized', { 'old': pinfo, 'info': info });
    };

    ft.toggleDetail = function(actualRow) {
      var $row = $(actualRow),
          created = ft.createOrUpdateDetailRow($row.get(0)),
          $next = $row.next();

      if (!created && $next.is(':visible')) {
        $row.removeClass('footable-detail-show');
        //only hide the next row if it's a detail row
        if($next.hasClass('footable-row-detail')) $next.hide();
      } else {
        $row.addClass('footable-detail-show');
        $next.show();
      }
    };

    ft.getColumnFromTdIndex = function(index) {
      /// <summary>Returns the correct column data for the supplied index taking into account colspans.</summary>
      /// <param name="index">The index to retrieve the column data for.</param>
      /// <returns type="json">A JSON object containing the column data for the supplied index.</returns>
      var result = null;
      for (var column in ft.columns) {
        if ($.inArray(index, ft.columns[column].matches) >= 0) {
          result = ft.columns[column];
          break;
        }
      }
      return result;
    };

    ft.createOrUpdateDetailRow = function (actualRow) {
      var $row = $(actualRow), $next = $row.next(), $detail, values = [];
      if ($row.is(':hidden')) return false; //if the row is hidden for some readon (perhaps filtered) then get out of here
      $row.find('> td:hidden').each(function () {
        var index = $(this).index(), column = ft.getColumnFromTdIndex(index), name = column.name;
        if (column.ignore == true) return true;

        if (index in column.names) name = column.names[index];
        values.push({ 'name': name, 'value': ft.parse(this, column), 'display': $.trim($(this).html()), 'group': column.group, 'groupName': column.groupName });
        return true;
      });
      if(values.length == 0) return false; //return if we don't have any data to show
      var colspan = $row.find('> td:visible').length;
      var exists = $next.hasClass('footable-row-detail');
      if (!exists) { // Create
        $next = $('<tr class="footable-row-detail"><td class="footable-cell-detail"><div class="footable-row-detail-inner"></div></td></tr>');
        $row.after($next);
      }
      $next.find('> td:first').attr('colspan', colspan);
      $detail = $next.find('.footable-row-detail-inner').empty();
      opt.createDetail($detail, values);
      return !exists;
    };

    ft.raise = function(eventName, args) {
      args = args || { };
      var def = { 'ft': ft };
      $.extend(true, def, args);
      var e = $.Event(eventName, def);
      if (!e.ft) { $.extend(true, e, def); } //pre jQuery 1.6 which did not allow data to be passed to event object constructor
      $(ft.table).trigger(e);
      return e;
    };

    ft.init();
    return ft;
  };
})(jQuery, window);
