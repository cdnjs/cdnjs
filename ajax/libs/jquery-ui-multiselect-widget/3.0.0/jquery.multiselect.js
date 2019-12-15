/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, undef:true, curly:true, browser:true, jquery:true */
/*
 * jQuery UI MultiSelect Widget 3.0.0
 * Copyright (c) 2012 Eric Hynds
 *
 * Depends:
 *   - jQuery 1.8+                          (http://api.jquery.com/)
 *   - jQuery UI 1.11 widget factory   (http://api.jqueryui.com/jQuery.widget/)
 *
 * Optional:
 *   - jQuery UI effects
 *   - jQuery UI position utility
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
(function($, undefined) {
   // Counter used to prevent collisions
   var multiselectID = 0;

   // The following information can be overridden via the linkInfo option.
   // An $.extend is used to allow just specifying a partial object in linkInfo.
   var linkDefaults = {
      'open': {
         'class': 'ui-multiselect-open',
         'icon': '<span class="ui-icon ui-icon-triangle-1-s"></span',
         'title': 'Open'
      },
      'close': {
         'class': 'ui-multiselect-close',
         'icon': '<span class="ui-icon ui-icon-circle-close"></span>',
         'title': 'Close'
      },
      'checkAll': {
         'class': 'ui-multiselect-all',
         'icon': '<span class="ui-icon ui-icon-check"></span>',
         'text': 'Check all',
         'title': 'Check all'
      },
      'uncheckAll': {
         'class': 'ui-multiselect-none',
         'icon': '<span class="ui-icon ui-icon-closethick"></span>',
         'text': 'Uncheck all',
         'title': 'Uncheck all'
      },
      'flipAll': {
         'class': 'ui-multiselect-flip',
         'icon': '<span class="ui-icon ui-icon-arrowrefresh-1-w"></span>',
         'text': 'Flip all',
         'title': 'Flip all'
      },
      'collapse': {
         'icon': '<span class="ui-icon ui-icon-triangle-1-s"></span>',
         'title': 'Collapse'
      },
      'expand': {
         'icon': '<span class="ui-icon ui-icon-triangle-1-e"></span>',
         'title': 'Expand'
      },
      'collapseAll': {
         'class': 'ui-multiselect-collapseall',
         'icon': '<span class="ui-icon ui-icon-triangle-1-s"></span>',
         'text': 'Collapse all',
         'title': 'Collapse all'
      },
      'expandAll': {
         'class': 'ui-multiselect-expandall',
         'icon': '<span class="ui-icon ui-icon-triangle-1-e"></span>',
         'text': 'Expand all',
         'title': 'Expand all'
      }
   };

   $.widget("ech.multiselect", {

   // default options
   options: {
      buttonWidth: 225,                   // (integer | string | 'auto' | null) Sets the min/max/exact width of the button.
      menuWidth: null,                    // (integer | string | 'auto' | null) If a number is provided, sets the exact menu width.
      menuHeight: 200,                    // (integer | string | 'auto' | 'size') Sets the height of the menu or determines it using native select's size setting.
      resizableMenu: false,               // (true | false) Enables the use of jQuery UI resizable if it is loaded.
      appendTo: null,                     // (jQuery | DOM element | selector string)  If provided, this specifies what element to append the widget to in the DOM.
      position: {},                       // (object) A jQuery UI position object that constrains how the pop-up menu is positioned.
      zIndex: null,                       // (integer) Overrides the z-index set for the menu container.
      classes: '',                        // (string) Classes that you can provide to be applied to the elements making up the widget.
      header: ['checkAll','uncheckAll'],  // (false | string | array) False, custom string or array indicating which links to show in the header & in what order.
      linkInfo: null,                     // (object | null) Supply an obect of link information to use alternative icons, icon labels, or icon title text.  See linkDefaults above for object structure.
      noneSelectedText: 'Select options', // (string | null) The text to show in the button where nothing is selected.  Set to null to use the native select's placeholder text.
      selectedText: '# of # selected',    // (string) A "template" that indicates how to show the count of selections in the button.  The "#'s" are replaced by the selection count & option count.
      selectedList: 0,                    // (integer) The actual list selections will be shown in the button when the count of selections is <= than this number.
      selectedListSeparator: ', ',        // (string) This allows customization of the list separator.  Use ',<br/>' to make the button grow vertically showing 1 selection per line.
      maxSelected: null,                  // (integer | null)  If selected count > maxSelected, then message is displayed, and new selection is undone.
      openEffect: null,                   // (array) An array containing menu opening effect information.
      closeEffect: null,                  // (array) An array containing menu closing effect information.
      autoOpen: false,                    // (true | false) If true, then the menu will be opening immediately after initialization.
      htmlText: [],                       // (array) List of 'button' &/or 'options' indicating in which parts of the widget to treat text as html.
      wrapText: ['button','header','options'],  // (array) List of 'button', 'header', &/or 'options' indicating in which parts of the widget to wrap text.
      listbox: false,                     // (true | false) Omits the button and instead of a pop-up inserts the open menu directly after the native select as a list box.
      addInputNames: true,                // (true | false) If true, names are created for each option input in the multi-select.
      disableInputsOnToggle: true,        // (true | false)  If true, each individual checkbox input is also disabled when the widget is disabled.
      groupsSelectable: true,             // (true | false) Determines if clicking on an option group heading selects all of its options.
      groupsCollapsable: false,           // (true | false) Determines if option groups can be collapsed.
      groupColumns: false                 // (true | false)  Displays groups in a horizonal column layout.
    },

    /**
     * This method determines which DOM element to append the menu to.   Determination process:
     * 1. Look up the jQuery object, DOM element, or string selector provided in the options.
     * 2. If nothing provided in options or lookup in #1 failed, then look for .ui-front or dialog.  (dialog case)
     * 3. If still do not have a valid DOM element to append to, then append to the document body.
     *
     * NOTE:  this.element and this.document are jQuery objects per the jQuery UI widget API.
    * @returns {object} jQuery object for the DOM element to append to.
     */
    _getAppendEl: function() {
      var elem = this.options.appendTo;         // jQuery object or selector, DOM element or null.

      if (elem) {                               // NOTE: The find below handles the jQuery selector case
        elem = !!elem.jquery ? elem : ( !!elem.nodeType ? $(elem) : this.document.find(elem).eq(0) );
      }
      if (!elem || !elem[0]) {
        elem = this.element.closest('.ui-front, dialog');
      }
      if (!elem.length) {
        elem = $(document.body);                 // Position at end of body.  Note that this returns a DOM element.
      }
      return elem;
    },

   /**
    * Performs initial widget creation
    * Widget API has already set this.element and this.options for us
    * All inserts into the DOM are performed at the end to limit performance impact
    *   - Build header links based on options and linkInfo object
    *   - Set UI effect speeds
    *   - Sets the multiselect ID using the global counter
    *   - Creates the button, header, and menu
    *   - Binds events for the widget
    *   - Calls refresh to populate the menu
    */
   _create: function() {
      var $element = this.element;
      var elSelect = $element[0];
      var options = this.options;
      var classes = options.classes;

      // Do an extend here to address link info missing from options.linkInfo--missing info defaults to that in linkDefaults.
      var linkInfo = ( this.linkInfo = $.extend(true, {}, linkDefaults, options.linkInfo || {}) );

      // grab select width before hiding it
      this._selectWidth = this._getBCRWidth(elSelect);
      $element.hide();

      // Convert null/falsely option values to empty arrays for fewer problems
      options.htmlText = options.htmlText || [];
      var wrapText = ( options.wrapText = options.wrapText || [] );

      // default speed for effects
      this.speed = $.fx.speeds._default;
      this._isOpen = false;

      // Create a unique namespace for events that
      // the widget factory cannot unbind automatically.
      this._namespaceID = this.eventNamespace;
      // bump unique ID after assigning it to the widget instance
      this.multiselectID = multiselectID++;

      if (!options.listbox) {
         // The button that opens the widget menu.  Note that this is inserted later below.
         var $button = ( this.$button = $( document.createElement('button') ) )
               .addClass('ui-multiselect ui-widget ui-state-default ui-corner-all'
                           + (wrapText.indexOf('button') > -1 ? '' : ' ui-multiselect-nowrap' )
                           + (classes ? ' ' + classes : '')
                           )
               .attr({
                 'type': 'button',
                 'title': elSelect.title,
                 'tabIndex': elSelect.tabIndex,
                 'id': elSelect.id ? elSelect.id  + '_ms' : null
               })
               .prop('aria-haspopup', true)
               .html( this._linkHTML('<span class="{{class}}" title="{{title}}">{{icon}}</span>', 'open') );

         this.$buttonlabel = $( document.createElement('span') )
               .html(options.noneSelectedText || $element[0].placeholder)
               .appendTo( $button );
      }

      // Header controls will contain the links & ordering specified by the header option.
      // Depending on how the options are set, this may be empty or simply plain text
      var headerLinksHTML = '';
      if (!options.header) {}  // no-op for no header
      else if (typeof options.header === 'string') {
         headerLinksHTML = '<li>' + options.header + '</li>';
      }
      else if (options.header.constructor == Array) {
         for (var x = 0, len = options.header.length; x < len; x++) {
            var linkInfoKey = options.header[x];
            if ( linkInfoKey && linkInfoKey in this.linkInfo
               && !(options.maxSelected && linkInfoKey === 'checkAll')
               && ['open','close','collapse','expand'].indexOf(linkInfoKey) === -1 ) {
                  headerLinksHTML += this._linkHTML('<li><a class="{{class}}" title="{{title}}">{{icon}}<span>{{text}}</span></a></li>', linkInfoKey);
            }
         }
      }

      this.$headerLinkContainer = $( document.createElement('ul') )
            .addClass('ui-helper-reset')
            .html( headerLinksHTML
                  + ( !options.listbox
                     ? this._linkHTML('<li class="{{class}}"><a class="{{class}}" title="{{title}}">{{icon}}</a></li>', 'close')
                     : '' ) );

      // Menu header to hold controls for the menu
      var $header = ( this.$header = $( document.createElement('div') ) )
            .addClass('ui-multiselect-header ui-widget-header ui-corner-all ui-helper-clearfix')
            .append( this.$headerLinkContainer );

      // Holds the actual check boxes for inputs
      var $checkboxes = ( this.$checkboxes = $( document.createElement('ul') ) )
            .addClass('ui-multiselect-checkboxes ui-helper-reset' + (wrapText.indexOf('options') > -1 ? '' : ' ui-multiselect-nowrap'));

      // This is the menu container that will hold all the options added via refresh().
      var $menu = ( this.$menu = $( document.createElement('div') ) )
            .addClass('ui-multiselect-menu ui-widget ui-widget-content ui-corner-all'
                      + (elSelect.multiple ? '' : ' ui-multiselect-single')
                      + (!options.listbox ? '' : ' ui-multiselect-listbox')
                      + (classes ? ' ' + classes : ''))
            .append($header, $checkboxes);

      if (!options.listbox) {
         $button.insertAfter($element);
         var $appendEl = this._getAppendEl();
         $appendEl.append($menu);
         // Set z-index of menu appropriately when it is not appended to a dialog and no z-index specified.
         if ( !options.zIndex && !$appendEl.hasClass('ui-front') ) {
            var $uiFront = this.element.closest('.ui-front, dialog');
            options.zIndex = Math.max( $uiFront && parseInt($uiFront.css('z-index'), 10) + 1 || 0,
                                                   $appendEl && parseInt($appendEl.css('z-index'), 10) + 1 || 0);
         }

         if (options.zIndex) {
            $menu.css('z-index', options.zIndex);
         }
         // Use $.extend below since the "of" position property may not be able to be supplied via the option.
         options.position = $.extend({'my': 'left top', 'at': 'left bottom', 'of': $button}, options.position || {});
      }
      else {
         $menu.insertAfter($element);  // No button
      }

      this._bindEvents();

      // build menu
      this.refresh(true);
   },

    /**
     * Helper function used in _create()
    * @param {string} linkTemplate HTML link template string
    * @param {string} linkID key string to look up in linkInfo object.
    * @returns {object} link HTML
     */
   _linkHTML: function(linkTemplate, linkID) {
      var self = this;
      return linkTemplate.replace(/{{(.*?)}}/ig, function(m, p1){ return self.linkInfo[linkID][p1] } )
                                 .replace('<span></span>', '');
   },

    /**
     * https://api.jqueryui.com/jquery.widget/#method-_init
     * Performed every time the widget is instantiated, or called with only an options object
     *  - Set visibility of header links
     *  - Auto open menu if appropriate
     *  - Set disabled status
     */
    _init: function() {
      var elSelect = this.element[0];

      if (this.options.header !== false) {
         this.$headerLinkContainer
              .find('.ui-multiselect-all, .ui-multiselect-none, .ui-multiselect-flip')
              .toggle( !!elSelect.multiple );
      }
      else {
         this.$header.hide();
      }

      if (this.options.autoOpen && !this.options.listbox) {
        this.open();
      }

      if (elSelect.disabled) {
        this.disable();
      }
    },

    /**
    * Builds an option item for the menu.  (Mostly plain JS for speed.)
    * <li>
    *   <label>
    *     <input /> checkbox or radio depending on single/multiple select
    *     <span /> option text
    *   </label>
    * </li>
    * @param {node} option Option from select to be added to menu
    * @returns {object} jQuery object for menu option
    */
   _makeOption: function(option) {
      var self = this;
      var title = option.title || null;
      var elSelect = self.element.get(0);
      // Determine unique ID for the label & option tags
      var id = elSelect.id || self.multiselectID;
      var inputID = 'ui-multiselect-' + self.multiselectID + '-' + (option.id || id + '-option-' + self.inputIdCounter++);
      // Pick up the select type from the underlying element
      var isMultiple = elSelect.multiple;
      var isDisabled = option.disabled;
      var isSelected = option.selected;

      var input = document.createElement('input');
      var inputAttribs = {
        "type": isMultiple ? 'checkbox' : 'radio',
        "id": inputID,
        "title": title,
        "value": option.value,
        "name": self.options.addInputNames ? "multiselect_" + id : null,
        "checked": isSelected ? "checked" : null,
        "aria-selected": isSelected ? "true" : null,
        "disabled": isDisabled ? "disabled" : null,
        "aria-disabled": isDisabled ? "true" : null
      };
      for (var name in inputAttribs) {
        if (inputAttribs[name] !== null) {
          input.setAttribute(name,inputAttribs[name]);
        }
      }
      // Clone data attributes
      var optionAttribs = option.attributes;
      var len = optionAttribs.length;
      for (var x = 0; x < len; x++) {
        var attribute = optionAttribs[x];
        if ( /^data\-.+/.test(attribute.name) ) {
          input.setAttribute(attribute.name, attribute.value);
        }
      }

      // Option text or html
      var span = document.createElement('span');
      if ( self.options.htmlText.indexOf('options') > -1 ) {
        span.innerHTML = option.innerHTML;
      }
      else {
        span.textContent = option.textContent;
      }

      // Icon images for each item.
      var optionImageSrc = option.getAttribute('data-image-src');
      if (optionImageSrc) {
        var img = document.createElement('img');
        img.setAttribute('src', optionImageSrc);
        span.insertBefore(img, span.firstChild);
      }

      var label = document.createElement('label');
      label.setAttribute('for', inputID);
      if (title !== null) {
        label.setAttribute('title', title);
      }
      label.className += (isDisabled ? ' ui-state-disabled' : '')
                          + (isSelected && !isMultiple ? ' ui-state-active' : '')
                          + ' ui-corner-all';
      label.appendChild(input);
      label.appendChild(span);

      var item = document.createElement('li');
      item.className = (isDisabled ? 'ui-multiselect-disabled ' : '')
                        + (option.className || '');
      item.appendChild(label);

      return item;
    },

    /**
     * Processes option and optgroup tags from underlying select to construct the menu's option list
     * If groupsCollapsable option is set, adds collapse/expand buttons for each option group.
     * This replaces the current contents of this.$checkboxes
     * Defers to _makeOption to actually build the options
     * Resets the input ID counter
     */
    _buildOptionList: function() {
      var self = this;
      var list = [];

      this.inputIdCounter = 0;

      this.element.children().each( function() {
        var elem = this;

        if (elem.tagName.toUpperCase() === 'OPTGROUP') {
          var options = [];

          $(elem).children().each( function() {
            options.push(self._makeOption(this));
          });

          // Build the list section for this optgroup, complete w/ option inputs...
          var $collapseButton = !!self.options.groupsCollapsable
                                 ? $( document.createElement('button') )
                                    .attr({'title': self.linkInfo.collapse.title})
                                    .addClass('ui-state-default ui-corner-all ui-multiselect-collapser')
                                    .html(self.linkInfo.collapse.icon)
                                 : null;
          var $optGroupLabel = $( document.createElement('a') )
                                    .addClass('ui-multiselect-grouplabel')
                                    .html( elem.getAttribute('label') );
          var $optionGroup = $( document.createElement('ul') ).append(options);
          var $optGroupItem = $( document.createElement('li') )
                                 .addClass('ui-multiselect-optgroup'
                                    + (self.options.groupColumns ? ' ui-multiselect-columns' : '')
                                    + (elem.className ? ' ' + elem.className : ''))
                                 .append($collapseButton, $optGroupLabel, $optionGroup)
          list.push($optGroupItem);
        }
        else {
          list.push(self._makeOption(elem));
        }
      });

      this.$checkboxes.empty().append(list);
   },

    /**
     * Refreshes the widget's menu
     *  - Refresh header links if required
     *  - Rebuild option list
     *  - Update the cached values for height, width, and cached elements
     *  - If listbox option is set, shows the menu and sets menu size.
     * @param {boolean} init If false, broadcasts a refresh event
     */
    refresh: function(init) {
      var $element = this.element;

      // update header link container visibility if needed
      if (this.options.header !== false) {
         this.$headerLinkContainer
              .find('.ui-multiselect-all, .ui-multiselect-none, .ui-multiselect-flip')
              .toggle( !!$element[0].multiple );
      }

      this._buildOptionList();                                  // Clear and rebuild the menu.
      this._updateCache();                                      // cache some more useful elements

      if (!this.options.listbox) {
         this._setButtonWidth();
         this.update(true);
      }
      else {
         if (!this._isOpen) {
            this.$menu.show();
            this._isOpen = true;
         }
         this._setMenuWidth();
         this._setMenuHeight();
      }

      // broadcast refresh event; useful for widgets
      if (!init) {
        this._trigger('refresh');
      }
    },

    /**
     * Updates cached values used elsewhere in the widget
     * Causes the filter to also update its cache if the filter is loaded
     */
    _updateCache: function() {
      // Invalidate cached dimensions to force recalcs.
      this._savedButtonWidth = 0;
      this._savedMenuWidth = 0;
      this._savedMenuHeight = 0;

      // Recreate important cached jQuery objects
      this.$header = this.$menu.children('.ui-multiselect-header');
      this.$checkboxes = this.$menu.children('.ui-multiselect-checkboxes');

      // Update saved labels and inputs
      this.$labels = this.$menu.find('label');
      this.$inputs = this.$labels.children('input');

      // If the filter widget is in use, then also update its cache.
      if ( this.element.is(':data("ech-multiselectfilter")') ) {
            this.element.multiselectfilter('instance').updateCache(true);
      }
    },

    /**
     * Updates the widget checkboxes' checked states
     * from the native select options' selected states.
     * @param {boolean} skipDisabled If true, disabled options in either are skipped.
     */
    resync : function(skipDisabled) {
      var $inputs = this.$inputs;
      var $options = this.element.find('option');

      if ($inputs.length === $options.length) {
         var inputValues = {};
         $inputs.not(!!skipDisabled ? ':disabled' : '').each( function() {
            inputValues[this.value] = this;
         });
         $options.not(!!skipDisabled ? ':disabled' : '').each( function() {
            if (this.value in inputValues) {
               inputValues[this.value].checked = this.selected;
            }
         });
         this._trigger('resync');
         this.update();
      }
      else {
         this.refresh();
      }
    },

   /**
    * Updates the button text
    * If selectedText option is a function, simply call it
    * The selectedList option determines how many options to display
    *   before switching to # of # selected
    * @param {boolean} isDefault true if value is default value for the button
    */
    update: function(isDefault) {
      if (!!this.options.listbox) {
         return;
      }
      var self = this;
      var options = self.options;
      var selectedList = options.selectedList;
      var selectedText = options.selectedText;
      var $inputs = self.$inputs;
      var inputCount = $inputs.length;
      var $checked = $inputs.filter(':checked');
      var numChecked = $checked.length;
      var value;

      if (numChecked) {
        if (typeof selectedText === 'function') {
          value = selectedText.call(self, numChecked, inputCount, $checked.get());
        }
        else if (/\d/.test(selectedList) && selectedList > 0 && numChecked <= selectedList) {
          value = $checked.map(function() { return $(this).next().text() }).get().join(options.selectedListSeparator);
        }
        else {
          value = selectedText.replace('#', numChecked).replace('#', inputCount);
        }
      }
      else {
        value = options.noneSelectedText;
      }

      self._setButtonValue(value, isDefault);

      if ( options.wrapText.indexOf('button') === -1 ) {
         this._setButtonWidth(true);
      }

      // Check if the menu needs to be repositioned due to button height changing from adding/removing selections.
      if (self._isOpen && self._savedButtonHeight != self.$button.outerHeight(false)) {
         self.position();
      }
    },

    /**
     * Sets the button text
     * @param {string} value content to be assigned to the button
     * @param {boolean} isDefault true if value is default value for the button
     */
    _setButtonValue: function(value, isDefault) {
      this.$buttonlabel[this.options.htmlText.indexOf('button') > -1 ? 'html' : 'text'](value);

      if (!!isDefault) {
        this.$button[0].defaultValue = value;
      }
    },

    /**
     * Sets button events for mouse and keyboard interaction
     * Called by _bindEvents
     */
    _bindButtonEvents: function() {
      var self = this;
      var $button = this.$button;
      function clickHandler() {
         self[ self._isOpen ? 'close' : 'open' ]();
         return false;
      }

      $button
        .on({
          click: clickHandler,
          keydown: $.proxy(self._handleButtonKeyboardNav, self),
          mouseenter: function() {
            if (!this.classList.contains('ui-state-disabled')) {
              this.classList.add('ui-state-hover');
            }
          },
          mouseleave: function() {
            this.classList.remove('ui-state-hover');
          },
          focus: function() {
            if (!this.classList.contains('ui-state-disabled')) {
              this.classList.add('ui-state-focus');
            }
          },
          blur: function() {
            this.classList.remove('ui-state-focus');
          }
        })
        // webkit doesn't like it when you click on the span :(
        .find('span')
        .on('click.multiselect,click', clickHandler);
    },

    // Handle keyboard events for the multiselect button.
    _handleButtonKeyboardNav: function(e) {
       var self = this;

       // Change selection via up/down on a closed single select.
       if (!self._isOpen && !self.element[0].multiple && (e.which === 38 || e.which === 40) ) {
         var $inputs = self.$inputs;
         var index = $inputs.index( $inputs.filter(':checked') );
         if (e.which === 38 && index) {
            $inputs.eq(index - 1).trigger('click');
         }
         else if (e.which === 40 && index < $inputs.length - 1) {
            $inputs.eq(index + 1).trigger('click');
         }
         return;
      }

      switch(e.which) {
         case 27: // esc
         case 37: // left
         case 38: // up
            self.close();
            break;
         case 40: // down
         case 39: // right
            self.open();
            break;
      }
    },

    /**
     * Bind events to the checkboxes for options and option groups
     * Must be bound to the checkboxes container.
     * This method scopes actions to filtered options
     * Called by _bindEvents
     */
    _bindCheckboxEvents: function() {
      var self = this;

      // optgroup label toggle support
      self.$checkboxes.on('click.multiselect', '.ui-multiselect-grouplabel', function(e) {
        e.preventDefault();

        if (!self.options.groupsSelectable) {
           return false;
        }

        var $this = $(this);
        var $inputs = $this.next('ul').children(':not(.ui-multiselect-excluded)').find('input').not(':disabled');
        var nodes = $inputs.get();
        var label = this.textContent;

        // trigger before callback and bail if the return is false
        if (self._trigger('beforeoptgrouptoggle', e, { inputs:nodes, label:label }) === false) {
          return;
        }

        // if maxSelected is in use, cannot exceed it
        var maxSelected = self.options.maxSelected;
        if (maxSelected && (self.$inputs.filter(':checked').length + $inputs.length > maxSelected) ) {
          return;
        }

        // toggle inputs
        self._toggleChecked(
          $inputs.filter(':checked').length !== $inputs.length,
          $inputs
        );

        self._trigger('optgrouptoggle', e, {
          inputs: nodes,
          label: label,
          checked: nodes.length ? nodes[0].checked : null
        });
      })
      // collapse button
      .on('click.multiselect', '.ui-multiselect-collapser', function(e) {
        var $this = $(this),
              $parent = $this.parent(),
              optgroupLabel = $parent.find('.ui-multiselect-grouplabel').first().html(),
              linkInfo = self.linkInfo,
              collapsedClass = 'ui-multiselect-collapsed',
              isCollapsed = $parent.hasClass(collapsedClass);

        if (self._trigger('beforecollapsetoggle', e, { label: optgroupLabel , collapsed: isCollapsed }) === false) {
          return;
        }
        $parent.toggleClass(collapsedClass);

        $this.attr('title', isCollapsed ? linkInfo.collapse.title : linkInfo.expand.title)
               .html(isCollapsed ? linkInfo.collapse.icon : linkInfo.expand.icon );

        if (!self.options.listbox) {
           self._setMenuHeight(true);
        }

        self._trigger('collapsetoggle', e, { label: optgroupLabel, collapsed: !isCollapsed });
      })
      // collapse button
      .on('mouseenter.multiselect', '.ui-multiselect-collapser', function(e) {
         this.classList.add('ui-state-hover');
      })
      // collapse button
      .on('mouseleave.multiselect', '.ui-multiselect-collapser', function(e) {
         this.classList.remove('ui-state-hover');
      })
      // option label
      .on('mouseenter.multiselect', 'label', function() {
        if (!this.classList.contains('ui-state-disabled')) {
          self.$labels.removeClass('ui-state-hover');
          $(this).addClass('ui-state-hover').find('input').focus();
        }
      })
      // Keyboard navigation of the menu
      .on('keydown.multiselect', 'label', function(e) {
        // Don't capture function keys or 'r'
        if (e.which === 82) {
          return; // r
        }

        if (e.which > 111 && e.which < 124) {
          return; // Function keys.
        }

        e.preventDefault();
        switch(e.which) {
          case 9: // tab
            if (e.shiftKey) {
              self.$menu.find(".ui-state-hover").removeClass("ui-state-hover");
              self.$header.find("li").last().find("a").focus();
            }
            else {
              self.close();
            }
            break;
          case 27: // esc
            self.close();
            break;
          case 38: // up
          case 40: // down
          case 37: // left
          case 39: // right
            self._traverse(e.which, this);
            break;
          case 13: // enter
          case 32: // space
            $(this).find('input')[0].click();
            break;
          case 65:   // Alt-A
            if (e.altKey) {
              self.checkAll();
            }
            break;
          case 70:   // Alt-F
            if (e.altKey) {
              self.flipAll();
            }
            break;
          case 85:   // Alt-U
            if (e.altKey) {
              self.uncheckAll();
            }
            break;
        }
      })
      .on('click.multiselect', 'input', function(e) {
        // Reference to this checkbox / radio input
        var input = this;
        var $input = $(input);
        var val = input.value;
        var checked = input.checked;
        // self is cached from outer scope above
        var $element = self.element;
        var $tags = $element.find('option');
        var isMultiple = $element[0].multiple;
        var $allInputs = self.$inputs;
        var numChecked = $allInputs.filter(":checked").length;
        var options = self.options;
        var textFxn = options.htmlText.indexOf('options') > -1 ? 'html' : 'text';
        var optionText = $input.parent().find("span")[textFxn]();
        var maxSelected = options.maxSelected;

        // bail if this input is disabled or the event is cancelled
        if (input.disabled || self._trigger('click', e, { value: val, text: optionText, checked: checked }) === false) {
          e.preventDefault();
          return;
        }

        if ( maxSelected && checked && numChecked > maxSelected) {
         if ( self._trigger('maxselected', e, { labels: self.$labels, inputs: $allInputs }) !== false ) {
            self.buttonMessage("<center><b>LIMIT OF " + (numChecked - 1) + " REACHED!</b></center>");
         }
          input.checked = false;
          e.preventDefault();
          return false;
        }

        // make sure the input has focus. otherwise, the esc key
        // won't close the menu after clicking an item.
        input.focus();

        // toggle aria state
        $input.prop('aria-selected', checked);

        // change state on the original option tags
        $tags.each( function() {
          this.selected = (this.value === val ? checked : isMultiple && this.selected);
        });

        // some additional single select-specific logic
        if (!isMultiple) {
          self.$labels.removeClass('ui-state-active');
          $input.closest('label').toggleClass('ui-state-active', checked);

          // close menu
          self.close();
        }

        // fire change on the select box
        $element.trigger("change");

        // setTimeout is to fix multiselect issue #14 and #47. caused by jQuery issue #3827
        // http://bugs.jquery.com/ticket/3827
        setTimeout($.proxy(self.update, self), 10);
      });
    },

    /**
     * Binds keyboard and mouse events to the header
     * Called by _bindEvents
     */
    _bindHeaderEvents: function() {
      var self = this;

      // header links
      self.$header
      .on('click.multiselect', 'a', function(e) {
        var headerLinks = {
          'ui-multiselect-close' : 'close',
          'ui-multiselect-all' : 'checkAll',
          'ui-multiselect-none' : 'uncheckAll',
          'ui-multiselect-flip' : 'flipAll',
          'ui-multiselect-collapseall' : 'collapseAll',
          'ui-multiselect-expandall' : 'expandAll'
        };
        for (hdgClass in headerLinks) {
          if ( this.classList.contains(hdgClass) ) {
            // headerLinks[hdgClass] is the click handler name
              self[ headerLinks[hdgClass] ]();
              e.preventDefault();
              return false;
          }
        }
      }).
      on('keydown.multiselect', 'a', function(e) {
        switch(e.which) {
          case 27:
            self.close();
            break;
          case 9:
            var $target = $(e.target);
            if ((e.shiftKey
                && !$target.parent().prev().length
                && !self.$header.find(".ui-multiselect-filter").length)
               || (!$target.parent().next().length && !self.$labels.length && !e.shiftKey)) {
              self.close();
              e.preventDefault();
            }
            break;
        }
      });
    },

    /**
     * Binds all events used in the widget
     * This calls the menu, button, and header event binding methods
     */
    _bindEvents: function() {
      var self = this;

      if (!self.options.listbox) {
         self._bindButtonEvents();
      }
      self._bindHeaderEvents();
      self._bindCheckboxEvents();

      // Set up resizable if the option is enabled and resizable is loaded.
      if (!!self.options.resizableMenu && $.ui && 'resizable' in $.ui) {
         self.$menu.show();
         self.$menu.resizable({
            containment: 'parent',
            handles: 's',
            helper: 'ui-multiselect-resize',
            stop: function(e, ui) {
               // Force consistent width
               ui.size.width = ui.originalSize.width;
               $(this).outerWidth(ui.originalSize.width);
               if (self._trigger('resize', e, ui) !== false) {
                  self.options.menuHeight = ui.size.height;
               }
               self._setMenuHeight(true);
            }
         });
         self.$menu.hide();
      }

      // Close each widget when clicking on any other element/anywhere else on the page,
      // another widget instance, or when scrolling w/ the mouse wheel outside the menu button.
      self.document.on('mousedown' + self._namespaceID
                       + ' wheel' + self._namespaceID
                       + ' mousewheel' + self._namespaceID, function(event) {
        var target = event.target;

        if ( self._isOpen
            && (!!self.$button ? target !== self.$button[0] && !$.contains(self.$button[0], target) : true)
            && target !== self.$menu[0] && !$.contains(self.$menu[0], target) ) {
          self.close();
        }
      });

      // deal with form resets.  the problem here is that buttons aren't
      // restored to their defaultValue prop on form reset, and the reset
      // handler fires before the form is actually reset.  delaying it a bit
      // gives the form inputs time to clear.
      $(self.element[0].form).on('reset' + self._namespaceID, function() {
        setTimeout($.proxy(self.refresh, self), 10);
      });
    },

    /**
     * Converts dimensions specified in options to pixel values.
     * Determines if specified value is a minimum, maximum or exact value.
     * The value can be a number or a string with px, pts, ems, in, cm, mm, or % units.
     * Number/Numeric string treated as pixel measurements
     *  - 30
     *  - '30'
     *  - '>30px'
     *  - '1.3em'
     *  - '20 pt'
     *  - '30%'
     * @param {string} dimText Option text (or number) containing possibly < or >, number, and a unit.
     * @param {object} $elem jQuery object (or node) to reference for % calculations.
     * @param {boolean} isHeight T/F to change from using width in % calculations.
     * @returns {pixels, minimax} object containing pixels and -1/1/0 indicating min/max/exact.
     */
    _parse2px: function(dimText, $elem, isHeight) {
      if (typeof dimText !== 'string') {
         return {px: dimText, minimax: 0};
      }

      var parts = dimText.match(/([<>])?=?\s*([.\d]+)\s*([eimnptx%]*)s?/i);
      var minimax = parts[1];
      var value = parseFloat(parts[2]);
      var unit = parts[3].toLowerCase();
      var pixels = -1;
      switch (unit) {
         case 'pt':
         case 'in':
         case 'cm':
         case 'mm':
            pixels = {'pt': 4.0 / 3.0, 'in': 96.0, 'cm': 96.0 / 2.54, 'mm': 96.0 / 25.4}[unit] * value;
            break;
         case 'em':
            var bodyFontSize = ( window.getComputedStyle
                                          ? getComputedStyle(document.body).fontSize
                                          : document.body.currentStyle.fontSize ) || '16px';
            pixels = parseFloat(bodyFontSize) * value;
            break;
         case '%':
            if ( !!$elem ) {
               if (typeof $elem === 'string' || !$elem.jquery) {
                  $elem = $($elem);
               }
               pixels = ( !!isHeight ? $elem.parent().height() : $elem.parent().width() ) * (value / 100.0);
            } // else returns -1 default value from above.
            break;
         default:
            pixels = value;
      }
      // minimax:  -1 => minimum value, 1 => maximum value, 0 => exact value
      return {px: pixels, minimax: minimax == '>' ? -1 : ( minimax == '<' ? 1 : 0 ) };
    },

    /**
     * Sets and caches the width of the button
     * Can set a minimum value if less than calculated width of native select.
     * @param {boolean} recalc true if cached width needs to be re-calculated
     */
    _setButtonWidth: function(recalc) {
      if (this._savedButtonWidth && !recalc) {
         return;
      }

      // this._selectWidth set in _create() for native select element before hiding it.
      var width = this._selectWidth || this._getBCRWidth( this.element );
      var buttonWidth = this.options.buttonWidth || '';
      if (/\d/.test(buttonWidth)) {
         var parsed = this._parse2px(buttonWidth, this.element);
         var pixels = parsed.px;
         var minimax = parsed.minimax;
         width = minimax < 0 ? Math.max(width, pixels) : ( minimax > 0 ? Math.min(width, pixels) : pixels );
      }
      else  { // keywords
         buttonWidth = buttonWidth.toLowerCase();
      }

      // The button width is set to auto in the CSS,
      // so we only need to change it for a specific width.
      if (buttonWidth !== 'auto') {
         this.$button.outerWidth(width);
      }
      this._savedButtonWidth = width;
    },

    /**
     * Sets and caches the width of the menu
     * Will use the width in options if provided, otherwise matches the button
     * @param {boolean} recalc true if cached width needs to be re-calculated
     */
    _setMenuWidth: function(recalc) {
      if (this._savedMenuWidth && !recalc) {
         return;
      }

      // Note that it is assumed that the button width was set prior.
      var width = !!this.options.listbox ? this._selectWidth : (this._savedButtonWidth || this._getBCRWidth( this.$button ));

      var menuWidth = this.options.menuWidth || '';
      if ( /\d/.test(menuWidth) ) {
         var parsed = this._parse2px(menuWidth, this.element);
         var pixels = parsed.px;
         var minimax = parsed.minimax;
         width = minimax < 0 ? Math.max(width, pixels) : ( minimax > 0 ? Math.min(width, pixels) : pixels );
      }
      else { // keywords
         menuWidth = menuWidth.toLowerCase();
      }

      // Note that the menu width defaults to the button width if menuWidth option is null or blank.
      if (menuWidth !== 'auto') {
         this.$menu.outerWidth(width);
         this._savedMenuWidth = width;
         return;
      }

      // Auto width determination: get intrinsic / "shrink-wrapped" outer widths w/ margins by applying floats.
      // cbWidth includes the width of the vertical scrollbar & ui-hover-state width increase per the applied CSS.
      // Note that a correction is made for jQuery floating point round-off errors below.
      this.$menu.addClass('ui-multiselect-measure');
      var headerWidth = this.$header.outerWidth(true) + this._jqWidthFix(this.$header);
      var cbWidth = this.$checkboxes.outerWidth(true) + this._jqWidthFix(this.$checkboxes);
      this.$menu.removeClass('ui-multiselect-measure');

      var contentWidth = Math.max(this.options.wrapText.indexOf('header') > -1 ? 0 : headerWidth, cbWidth);

      // Use $().width() to set menu width not including padding or border.
      this.$menu.width(contentWidth);
      // Save width including padding and border (no margins) for consistency w/ normal width setting.
      this._savedMenuWidth = this.$menu.outerWidth(false);
    },

    /**
     * Sets and caches the height of the menu
     * Will use the height provided in the options unless using the select size
     *  option or the option exceeds the available height for the menu
     * Will set a scrollbar if the options can't all be visible at once
     * @param {boolean} recalc true if cached value needs to be re-calculated
     */
    _setMenuHeight: function(recalc) {
      var self = this;
      if (self._savedMenuHeight && !recalc) {
         return;
      }

      var maxHeight = $(window).height();
      var optionHeight = self.options.menuHeight || '';
      var useSelectSize = false;
      var elSelectSize = 4;

      if ( /\d/.test(optionHeight) ) {
         // Deduct height of header & border/padding to find height available for checkboxes.
         var $header = self.$header.filter(':visible');
         var headerHeight = $header.outerHeight(true) + self._jqHeightFix($header);
         var borderPaddingHt = this.$menu.outerHeight(false) - this.$menu.height();

         optionHeight = self._parse2px(optionHeight, self.element, true).px;
         maxHeight = Math.min(optionHeight, maxHeight) - headerHeight - borderPaddingHt;
      }
      else if (optionHeight.toLowerCase() === 'size') {
         // Overall height based on native select 'size' attribute
         useSelectSize = true;
         // Retrieves native select's size attribute or defaults to 4 (like native select).
         elSelectSize = self.element[0].size || elSelectSize;
      }

      var overflowSetting = 'hidden';
      var itemCount = 0;
      var ulHeight = 4;  // Adjustment for hover height included here.

      // The following adds up item heights.  If the height sum exceeds the option height or if the number
      //   of item heights summed equal or exceed the native select size attribute, the loop is aborted.
      // If the loop is aborted, this means that the menu must be scrolled to see all the items.
      self.$checkboxes.find('li:not(.ui-multiselect-optgroup),a').filter(':visible').each( function() {
        ulHeight += $(this).outerHeight(true) + self._jqHeightFix(this);
        if (useSelectSize && ++itemCount >= elSelectSize || ulHeight > maxHeight) {
          overflowSetting = 'auto';
          if (!useSelectSize) {
            ulHeight = maxHeight;
          }
          return false;
        }
      });

      // We actually only set the height of the checkboxes as the outer menu container is height:auto.
      // The _savedMenuHeight value below can be compared to optionHeight as an accuracy check.
      self.$checkboxes.css('overflow', overflowSetting).height(ulHeight);
      self._savedMenuHeight = this.$menu.outerHeight(false);
    },

    /**
     * Calculate accurate outerWidth(false) using getBoundingClientRect()
     * Note that this presumes that the element is visible in the layout.
     * @param {node} DOM node or jQuery equivalent to get width for.
     * @returns {float} Decimal floating point value for the width.
     */
   _getBCRWidth: function(elem) {
      if (!elem || !!elem.jquery && !elem[0]) {
         return null;
      }
      var domRect = !!elem.jquery ? elem[0].getBoundingClientRect() : elem.getBoundingClientRect();
      return domRect.right - domRect.left;
    },

    /**
     * Calculate accurate outerHeight(false) using getBoundingClientRect()
     * Note that this presumes that the element is visible in the layout.
     * @param {node} DOM node or jQuery equivalent to get height for.
     * @returns {float} Decimal floating point value for the height.
     */
   _getBCRHeight: function(elem) {
      if (!elem || !!elem.jquery && !elem[0]) {
         return null;
      }
      var domRect = !!elem.jquery ? elem[0].getBoundingClientRect() : elem.getBoundingClientRect();
      return domRect.bottom - domRect.top;
    },

    /**
     * Calculate jQuery width correction factor to fix floating point round-off errors.
     * Note that this presumes that the element is visible in the layout.
     * @param {node} DOM node or jQuery equivalent to get width for.
     * @returns {float} Correction value for the width--typically a decimal < 1.0
     */
    _jqWidthFix: function(elem) {
      if (!elem || !!elem.jquery && !elem[0]) {
         return null;
      }
      return !!elem.jquery
                  ? this._getBCRWidth(elem[0]) - elem.outerWidth(false)
                  :  this._getBCRWidth(elem) - $(elem).outerWidth(false);
    },

    /**
     * Calculate jQuery height correction factor to fix floating point round-off errors.
     * Note that this presumes that the element is visible in the layout.
     * @param {node} DOM node or jQuery equivalent to get height for.
     * @returns {float} Correction value for the height--typically a decimal < 1.0
     */
    _jqHeightFix: function(elem) {
      if (!elem || !!elem.jquery && !elem[0]) {
         return null;
      }
      return !!elem.jquery
                  ? this._getBCRHeight(elem[0]) - elem.outerHeight(false)
                  :  this._getBCRHeight(elem) - $(elem).outerHeight(false);
    },

    /**
     * Moves focus up or down the options list
     * @param {number} which key that triggered the traversal
     * @param {node} start element event was triggered from
     */
    _traverse: function(which, start) {
      var $start = $(start);
      var moveToLast = which === 38 || which === 37;

      // select the first li that isn't an optgroup label / disabled
      var $next = $start.parent()[moveToLast ? 'prevAll' : 'nextAll']('li:not(:disabled, .ui-multiselect-optgroup):visible').first();
      // we might have to jump to the next/previous option group
      if (!$next.length) {
        $next = $start.parents(".ui-multiselect-optgroup")[moveToLast ? "prev" : "next" ]();
      }

      // if at the first/last element
      if (!$next.length) {
        var $container = this.$menu.find('ul').last();

        // move to the first/last
        this.$menu.find('label').filter(':visible')[ moveToLast ? 'last' : 'first' ]().trigger('mouseover');

        // set scroll position
        $container.scrollTop(moveToLast ? $container.height() : 0);
      }
      else {
        $next.find('label').filter(':visible')[ moveToLast ? "last" : "first" ]().trigger('mouseover');
      }
    },

    /**
     * Internal function to toggle checked property and related attributes on a checkbox
     * The context of this function should be a checkbox; do not proxy it.
     * @param {string} prop Property being toggled on the checkbox
     * @param {string} flag Flag to set for the property
     */
    _toggleState: function(prop, flag) {
      return function() {
         var state = (flag === '!') ? !this[prop] : flag;

         if ( !this.disabled ) {
          this[ prop ] = state;
         }

        if (state) {
          this.setAttribute('aria-' + prop, true);
        }
        else {
          this.removeAttribute('aria-' + prop);
        }
      };
    },

    /**
     * Toggles the checked state on options within the menu
     * Potentially scoped down to visible elements from filteredInputs
     * @param {string} flag checked property to set
     * @param {object} group option group that was clicked, if any
     * @param {boolean} filteredInputs does not toggle hidden inputs if filtering.
     */
    _toggleChecked: function(flag, group, filteredInputs) {
      var self = this;
      var $element = self.element;
      var $inputs = (group && group.length) ? group : self.$inputs;

      if (filteredInputs) {
         $inputs = self._isOpen
                     ? $inputs.closest('li').not('.ui-multiselect-excluded').find('input').not(':disabled')
                     : $inputs.not(':disabled');
      }

      // toggle state on inputs
      $inputs.each(self._toggleState('checked', flag));

      // Give the first input focus
      $inputs.eq(0).focus();

      // update button text
      self.update();

      // Create a plain object of the values that actually changed
      var inputValues = {};
      $inputs.each( function() {
        inputValues[ this.value ] = true;
      });

      // toggle state on original option tags
      $element.find('option')
              .each( function() {
                if (!this.disabled && inputValues[this.value]) {
                  self._toggleState('selected', flag).call(this);
                }
              });

      // trigger the change event on the select
      if ($inputs.length) {
        $element.trigger("change");
      }
    },

   /**
    * Toggles disabled state on the widget and underlying select or for just one option group.
    * Will also disable all individual options if the disableInputsOnToggle option is set
    * @param {boolean} flag true if disabling widget
    * @param {number | string} groupID index or label of option group to disable
    */
    _toggleDisabled: function(flag, groupID) {
      var disabledClass = 'ui-state-disabled';  // used for styling only

      this.$button.prop({ 'disabled':flag, 'aria-disabled':flag })[ flag ? 'addClass' : 'removeClass' ](disabledClass);

      if (this.options.disableInputsOnToggle) {
         // Apply the ui-multiselect-disabled class name to identify which
         // input elements this widget disabled (not pre-disabled)
         // so that they can be restored if the widget is re-enabled.
         var $inputs = (typeof groupID === 'undefined') ? this.$inputs : this._multiselectOptgroupFilter(groupID).find('input'),
               msDisabledClass = 'ui-multiselect-disabled';
         if (flag) {
            var matchedInputs = $inputs.filter(':enabled').get();
            for (var x = 0, len = matchedInputs.length; x < len; x++) {
               matchedInputs[x].setAttribute('disabled', 'disabled');
               matchedInputs[x].setAttribute('aria-disabled', 'disabled');
               matchedInputs[x].classList.add(msDisabledClass);
               matchedInputs[x].parentNode.classList.add(disabledClass);
             }
         }
         else {
            var matchedInputs = $inputs.filter('.' + msDisabledClass + ':disabled').get();
            for (var x = 0, len = matchedInputs.length; x < len; x++) {
              matchedInputs[x].removeAttribute("disabled");
              matchedInputs[x].removeAttribute("aria-disabled");
              matchedInputs[x].classList.remove(msDisabledClass);
              matchedInputs[x].parentNode.classList.remove(disabledClass);
            }
         }
      }

      var $select = (typeof groupID === 'undefined') ? this.element : this._nativeOptgroupFilter(groupID).find('option');
      $select.prop({
        'disabled': flag,
        'aria-disabled': flag
      });
    },

    /**
     * Opens the menu, possibly with effects
     * Calls methods to set position and resize as well
     */
    open: function() {
      var $button = this.$button;

      // bail if the multiselect open event returns false, this widget is disabled, or is already open
      if (this._trigger('beforeopen') === false || $button.hasClass('ui-state-disabled') || this._isOpen || !!this.options.listbox) {
        return;
      }

      var $menu = this.$menu;
      var $header = this.$header;
      var $labels = this.$labels;
      var $inputs = this.$inputs.filter(':checked:not(.ui-state-disabled)');
      var speed = this.speed;
      var options = this.options;
      var effect = options.openEffect;

      // figure out opening effects/speeds
      if (effect && effect.constructor == Array) {
        speed = effect[1] || speed;
        effect = effect[0];
      }

      // set the scroll of the checkbox container
      this.$checkboxes.scrollTop(0);

      // show the menu, maybe with a speed/effect combo
      // if there's an effect, assume jQuery UI is in use
      if (effect) {
         $.fn.show.apply($menu, effect ? [ effect, speed ] : []);
      }
      else {
         $menu.css('display','block');
      }

      this._setMenuWidth();
      this._setMenuHeight();
      this.position();

      // focus the first not disabled option or filter input if available
      var filter = $header.find(".ui-multiselect-filter");
      if (filter.length) {
        filter.first().find('input').trigger('focus');
      }
      else if ($inputs.length) {
         $inputs.eq(0).trigger('focus').parent('label').eq(0).trigger('mouseover').trigger('mouseenter');
      }
      else if ($labels.length) {
        $labels.filter(':not(.ui-state-disabled)').eq(0).trigger('mouseover').trigger('mouseenter').find('input').trigger('focus');
      }
      else {
        $header.find('a').first().trigger('focus');
      }

      $button.addClass('ui-state-active');
      this._isOpen = true;
      this._trigger('open');
    },

    // Close the menu
    close: function() {
      var self = this;

      // bail if the multiselect close event returns false
      if (this._trigger('beforeclose') === false || !!this.options.listbox) {
        return;
      }

      var options = this.options;
      var effect = options.closeEffect;
      var speed = this.speed;
      var $button = this.$button;

      // figure out closing effects/speeds
      if (effect && effect.constructor == Array) {
        speed = effect[1] || speed;
        effect = effect[0];
      }

      // hide the menu, maybe with a speed/effect combo
      // if there's an effect, assume jQuery UI is in use
      if (effect) {
         $.fn.hide.apply(this.$menu, effect ? [ effect, speed ] : []);
      }
      else {
         this.$menu.css('display','none');
      }

      $button.removeClass('ui-state-active').trigger('blur').trigger('mouseleave');
      this._isOpen = false;
      this._trigger('close');
      $button.trigger('focus');
    },

    /**
     * Positions the menu relative to the button.
     */
    position: function() {
      var $button = this.$button;

      // Save the button height so that we can determine when it has changed due to adding/removing selections.
      this._savedButtonHeight = $button.outerHeight(false);

      if ($.ui && $.ui.position) {
        this.$menu.position(this.options.position);
      }
      else {
        var pos = $button.position();
        pos.top += this._savedButtonHeight;
        this.$menu.offset(pos);
      }
    },

    // Enable widget
    enable: function(groupID) {
      this._toggleDisabled(false, groupID);
    },

    // Disable widget
    disable: function(groupID) {
      this._toggleDisabled(true, groupID);
    },

    /**
    * Checks all options or those in an option group
    * Accounts for maxSelected possibly being set.
    * @param {number | string} groupID index or label of option group to check all for.
    */
    checkAll: function(groupID) {
      this._trigger('beforeCheckAll');

      if (this.options.maxSelected) {
         return;
      }

      if (typeof groupID === 'undefined') {  // groupID could be 0
         this._toggleChecked(true);
      }
      else {
         this._toggleChecked(true, this._multiselectOptgroupFilter(groupID).find('input'));
      }

      this._trigger('checkAll');
    },

    /**
    * Unchecks all options or those in an option group
    * @param {number | string} groupID index or label of option group to uncheck all for.
    */
    uncheckAll: function(groupID) {
      this._trigger('beforeUncheckAll');

      if (typeof groupID === 'undefined') {  // groupID could be 0
         this._toggleChecked(false);
      }
      else {
         this._toggleChecked(false, this._multiselectOptgroupFilter(groupID).find('input'));
      }
      if ( !this.element[0].multiple && !this.$inputs.filter(':checked').length) {
        // Forces the underlying single-select to have no options selected.
        this.element[0].selectedIndex = -1;
      }

      this._trigger('uncheckAll');
    },

    /**
    * Flips all options or those in an option group.
    * Accounts for maxSelected possibly being set.
    * @param {number | string} groupID index or label of option group to flip all for.
    */
    flipAll: function(groupID) {
      this._trigger('beforeFlipAll');

      var gotID = (typeof groupID !== 'undefined'),  // groupID could be 0
            maxSelected = this.options.maxSelected,
            inputCount = this.$inputs.length,
            checkedCount = this.$inputs.filter(':checked').length,
            $filteredOptgroupInputs = gotID ? this._multiselectOptgroupFilter(groupID).find('input') : null,
            gInputCount = gotID ? $filteredOptgroupInputs.length : 0,
            gCheckedCount = gotID ? $filteredOptgroupInputs.filter(':checked').length : 0;

      if (!maxSelected
          || maxSelected >= (gotID ? checkedCount - gCheckedCount + gInputCount - gCheckedCount : inputCount - checkedCount ) ) {
         if (gotID) {
            this._toggleChecked('!', $filteredOptgroupInputs);
         }
         else {
            this._toggleChecked('!');
         }
         this._trigger('flipAll');
      }
      else {
         this.buttonMessage("<center><b>Flip All Not Permitted.</b></center>");
      }
    },

    /**
    * Collapses all option groups or just the one specified.
    * @param {number | string} groupID index or label of option group to collapse.
    */
    collapseAll: function(groupID) {
      this._trigger('beforeCollapseAll');

      var $optgroups = (typeof groupID === 'undefined')  // groupID could be 0
                              ? this.$checkboxes.find('.ui-multiselect-optgroup')
                              : this._multiselectOptgroupFilter(groupID);

      $optgroups.addClass('ui-multiselect-collapsed')
                     .children('.ui-multiselect-collapser').attr('title', this.linkInfo.expand.title ).html( this.linkInfo.expand.icon );

      this._trigger('collapseAll');
    },

    /**
    * Expands all option groups or just the one specified.
    * @param {number | string} groupID index or label of option group to expand.
    */
    expandAll: function(groupID) {
      this._trigger('beforeExpandAll');

      var $optgroups = (typeof groupID === 'undefined')  // groupID could be 0
                              ? this.$checkboxes.find('.ui-multiselect-optgroup')
                              : this._multiselectOptgroupFilter(groupID);

      $optgroups.removeClass('ui-multiselect-collapsed')
                     .children('.ui-multiselect-collapser').attr('title', this.linkInfo.collapse.title ).html( this.linkInfo.collapse.icon );

      this._trigger('expandAll');
    },

    /**
     * Flashes a message in the button caption for 1 second.
     * Useful for very short warning messages to the user.
     * @param {string} HTML message to show in the button.
     */
    buttonMessage: function(message) {
       var self = this;
       self.$buttonlabel.html(message);
       setTimeout( function() {
         self.update();
       }, 1000 );
    },

    /**
     * Provides a list of all checked options
     * @returns {array} list of inputs
     */
    getChecked: function() {
      return this.$menu.find('input:checked');
    },

    /**
     * Provides a list of all options that are not checked
     * @returns {array} list of inputs
     */
    getUnchecked: function() {
      return this.$menu.find('input:not(:checked)');
    },

    /**
     * Destroys the widget instance
     * @returns {object} reference to widget
     */
    destroy: function() {
      // remove classes + data
      $.Widget.prototype.destroy.call(this);

      // unbind events
      this.document.off(this._namespaceID);
      $(this.element[0].form).off(this._namespaceID);

      if (!this.options.listbox) {
         this.$button.remove();
      }
      this.$menu.remove();
      this.element.show();

      return this;
    },

    /**
     * @returns {boolean} indicates whether the menu is open
     */
    isOpen: function() {
      return this._isOpen;
    },

    /**
     * @returns {object} jQuery object for menu
     */
    widget: function() {
      return this.$menu;
    },

    /**
     * @returns {string} namespaceID for use with external event handlers.
     */
    getNamespaceID: function() {
      return this._namespaceID;
    },

    /**
     * @returns {object} jQuery object for button
     */
    getButton: function() {
      return this.$button;
    },

    /**
     * Essentially an alias for widget
     * @returns {object} jQuery object for menu
     */
    getMenu: function() {
      return this.$menu;
    },

    /**
     * @returns {array} List of the option labels
     */
    getLabels: function() {
      return this.$labels;
    },

    /**
     * @returns {array} List of option groups that are collapsed
     */
    getCollapsed: function() {
       return this.$checkboxes.find('.ui-multiselect-optgroup');
    },

    /**
    * Sets the value of the underlying select then resyncs the menu.
    * @param {string | array} new value(s) to set the underlying select to.
     */
    value: function(newValue) {
      if (typeof newValue !== 'undefined') {
         this.element.val(newValue);
         this.resync();
         return this.element;
      }
      else {
         return this.element.val();
      }
    },

    /**
    * Adds an option to the widget and underlying select
    * @param {object} attributes hash to be added to the option
    * @param {string} text label for the option
    * @param {number | string} groupID index or label of option group to add the option to
    */
    addOption: function(attributes, text, groupID) {
      var self = this;
      var textFxn = self.options.htmlText.indexOf('options') > -1 ? 'html' : 'text';
      var $option = $( document.createElement('option') ).attr(attributes)[textFxn](text);
      var optionNode = $option.get(0);

      if (typeof groupID === 'undefined') {  // groupID could be 0
         self.element.append($option);
         self.$checkboxes.append(self._makeOption(optionNode));
      }
      else {
         self._nativeOptgroupFilter(groupID).append($option);
         self._multiselectOptgroupFilter(groupID).append(self._makeOption(optionNode));
      }

      self._updateCache();
    },

    /**
    * Finds an optgroup in the native select by index or label
    * @param {number | string} groupID index or label of option group to find
    */
    _nativeOptgroupFilter: function(groupID) {
       return this.element.children("OPTGROUP").filter( function(index) {
          return (typeof groupID === 'number' ? index === groupID : this.getAttribute('label') === groupID);
       });
    },

    /**
    * Finds an optgroup in the multiselect widget by index or label
    * @param {number | string} groupID index or label of option group to find
    */
    _multiselectOptgroupFilter: function(groupID) {
       return this.$menu.find(".ui-multiselect-optgroup").filter( function(index) {
          return (typeof groupID === 'number' ? index === groupID : this.getElementsByClassName('ui-multiselect-grouplabel')[0].textContent === groupID);
       });
    },

    /**
     * Removes an option from the widget and underlying select
     * @param {string} value attribute corresponding to option being removed
     */
    removeOption: function(value) {
      if (!value) {
        return;
      }
      this.element.find("option[value=" + value + "]").remove();
      this.$labels.find("input[value=" + value + "]").parents("li").remove();

      this._updateCache();
    },

    /**
     * Reacts to options being changed
     * Delegates to various handlers
     * @param {string} key into the options hash
     * @param {any} value to be assigned to that option
     */
    _setOption: function(key, value) {
      var $header = this.$header,
            $menu = this.$menu;

      switch(key) {
        case 'header':
          if (typeof value === 'boolean') {
            $header.toggle( value );
          }
          else if (typeof value === 'string') {
            this.$headerLinkContainer.children('li:not(:last-child)').remove();
            this.$headerLinkContainer.prepend('<li>' + value + '</li>');
          }
          break;
        case 'checkAllText':
        case 'uncheckAllText':
        case 'flipAllText':
        case 'collapseAllText':
        case 'expandAllText':
          if (key !== 'checkAllText' || !this.options.maxSelected) {
            // eq(-1) finds the last span
            $header.find('a.' + this.linkInfo[key.replace('Text','')].class + ' span').eq(-1).html(value);
          }
          break;
        case 'checkAllIcon':
        case 'uncheckAllIcon':
        case 'flipAllIcon':
        case 'collapseAllIcon':
        case 'expandAllIcon':
          if (key !== 'checkAllIcon' || !this.options.maxSelected) {
            // eq(0) finds the first span
            $header.find('a.' + this.linkInfo[key.replace('Icon','')].class + ' span').eq(0).replaceWith(value);
          }
          break;
        case 'openIcon':
          $menu.find('span.ui-multiselect-open').html(value);
          break;
        case 'closeIcon':
          $menu.find('a.ui-multiselect-close').html(value);
          break;
        case 'buttonWidth':
        case 'menuWidth':
          this.options[key] = value;
          this._setButtonWidth(true);        // true forces recalc of cached value.
          this._setMenuWidth(true);          // true forces recalc of cached value.
          break;
        case 'menuHeight':
          this.options[key] = value;
          this._setMenuHeight(true);         // true forces recalc of cached value.
          break;
        case 'selectedText':
        case 'selectedList':
        case 'maxSelected':
        case 'noneSelectedText':
        case 'selectedListSeparator':
          this.options[key] = value;            // these all need to update immediately for the update() call
          this.update(true);
          break;
        case 'classes':
          $menu.add(this.$button).removeClass(this.options.classes).addClass(value);
          break;
        case 'multiple':
          var $element = this.element;
          if (!!$element[0].multiple !== value) {
             $menu.toggleClass('ui-multiselect-multiple', value).toggleClass('ui-multiselect-single', !value);
             $element[0].multiple = value;
             this.uncheckAll();
             this.refresh();
          }
          break;
       case 'position':
         if (value !== null && !$.isEmptyObject(value) ) {
            this.options.position = value;
         }
         this.position();
         break;
       case 'zIndex':
         this.options.zIndex = value;
         this.$menu.css('z-index', value);
         break;
      default:
         this.options[key] = value;
     }
     $.Widget.prototype._setOption.apply(this, arguments);
   },

  });

   // Fix for jQuery UI modal dialogs
   // https://api.jqueryui.com/dialog/#method-_allowInteraction
   // https://learn.jquery.com/jquery-ui/widget-factory/extending-widgets/
   if ($.ui && 'dialog' in $.ui) {
      $.widget( "ui.dialog", $.ui.dialog, {
         _allowInteraction: function( event ) {
             if ( this._super( event ) || $( event.target ).closest('.ui-multiselect-menu' ).length ) {
               return true;
             }
         }
      });
   }

})(jQuery);
