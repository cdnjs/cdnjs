/*! jquery-cascading-dropdown 1.2.7 | (c) 2016 Dzulqarnain Nasir <dzul1983@gmail.com> | MIT */
(function ($, undefined) {
    'use strict';

    var defaultOptions = {
        usePost: false,
        useJson: false
    };

    // Constructor
    function Dropdown(options, parent) {
        this.el = $(options.selector, parent.el);
        this.parent = parent;
        this.options = $.extend({}, defaultOptions, options);
        this.name = this.options.paramName || this.el.attr('name');
        this.requiredDropdowns = options.requires && options.requires.length ? $(options.requires.join(','), parent.el) : null;
        this.isLoadingClassName = this.options.isLoadingClassName || parent.options.isLoadingClassName || 'cascading-dropdown-loading';
    }

    // Methods
    Dropdown.prototype = {
        _create: function() {
            var self = this;

            self.pending = 0;
            self.initialised = false;
            self.initialState = self.el.clone(true);
            self.el.data('plugin_cascadingDropdown', this);
            self.originalDropdownItems = self.el.children('option');

            // Init event handlers
            if(typeof self.options.onChange === 'function') {
                self.el.change(function(event) {
                    var requirementsMet = self._requirementsMet() && self.el[0].value;
                    self.options.onChange.call(self, event, self.el.val(), self.getRequiredValues(), requirementsMet);
                });
            }

            if(typeof self.options.onEnable === 'function') {
                self.el.on('enabled', function(event) {
                    self.options.onEnable.call(self, event, self.el.val());
                });
            }

            if(typeof self.options.onDisable === 'function') {
                self.el.on('disabled', function(event) {
                    self.options.onDisable.call(self, event, self.el.val());
                });
            }

            if(self.requiredDropdowns) {
                self.requiredDropdowns.change(function(event) {
                    self.update();
                });
            }

            // Init source
            self._initSource();

            // Call update
            self.update();
        },
        
        // Destroys the instance and reverts everything back to initial state
        _destroy: function() {
            this.el.replaceWith(this.initialState).removeData('plugin_cascadingDropdown');
        },

        // Enables the dropdown
        enable: function() {
            if(this.el.attr('disabled') === undefined) return;
            this.el.removeAttr('disabled').triggerHandler('enabled');
        },

        // Disables the dropdown
        disable: function() {
            if(this.el.attr('disabled') !== undefined) return;
            this.el.attr('disabled', 'disabled').triggerHandler('disabled');
        },

        // Checks if required dropdowns have value
        _requirementsMet: function() {
            var self = this;

            if(!self.requiredDropdowns) {
                return true;
            }

            if(self.options.requireAll) { // If requireAll is true, return true if all dropdowns have values
                return (self.requiredDropdowns.filter(function() {
                    return !!$(this).val();
                }).length == self.options.requires.length);
            } else { // Otherwise, return true if any one of the required dropdowns has value
                return (self.requiredDropdowns.filter(function() {
                    return !!$(this).val();
                }).length > 0);
            }
        },

        // Defines dropdown item list source - inspired by jQuery UI Autocomplete
        _initSource: function() {
            var self = this;

            if($.isArray(self.options.source)) {
                this.source = function(request, response) {
                    response($.map(self.options.source, function(item) {
                        return {
                            label: item.label || item.value || item,
                            value: item.value || item.label || item,
                            selected: item.selected
                        };
                    }));
                };
            } else if ( typeof self.options.source === 'string' ) {
                var url = self.options.source;

                this.source = function(request, response) {
                    if ( self.xhr ) {
                        self.xhr.abort();
                    }
                    self.xhr = $.ajax({
                        url: url,
                        data: self.options.useJson ? JSON.stringify(request) : request,
                        dataType: self.options.useJson ? 'json' : undefined,
                        type: self.options.usePost ? 'post' : 'get',
                        contentType: 'application/json; charset=utf-8',
                        success: function(data) {
                            response(data);
                        },
                        error: function() {
                            response([]);
                        }
                    });
                };
            } else {
                this.source = self.options.source;
            }
        },

        getRequiredValues: function() {
            var data = {};
            if(this.requiredDropdowns) {
                $.each(this.requiredDropdowns, function() {
                    var instance = $(this).data('plugin_cascadingDropdown');
                    if(instance.name) {
                        data[instance.name] = instance.el.val();
                    }
                });
            }

            return data;
        },

        // Update the dropdown
        update: function() {
            var self = this;

            // Disable it first
            self.disable();

            // If required dropdowns have no value, return
            if(!self._requirementsMet()) {
                self.setSelected(0);
                self._triggerReady();
                return self.el;
            }

            // If source isn't defined, it's most likely a static dropdown, so just enable it
            if(!self.source) {
                self.enable();
                self._triggerReady();
                return self.el;
            }

            // Reset the dropdown value so we don't trigger a false call
            self.el.val('').change();

            // Fetch data from required dropdowns
            var data = self.getRequiredValues();

            // Pass it to defined source for processing
            self.pending++;
            self.el.addClass(self.isLoadingClassName);
            self.source(data, self._response());

            return self.el;
        },

        _response: function(items) {
            var self = this;

            return function(items) {
                self._renderItems(items);

                self.pending--;
                if(!self.pending) {
                    self.el.removeClass(self.isLoadingClassName);
                }
            }
        },

        // Render the dropdown items
        _renderItems: function(items) {
            var self = this;

            // Remove all dropdown items and restore to initial state
            self.el.find('option, optgroup').remove();
            self.el.append(self.originalDropdownItems);

            if(!items) {
                self._triggerReady();
                return;
            }

            var selected = [];

            // Add all items as dropdown item
            var getOption = function(item) {
              var selectedAttr = '';
              if(item.selected) {
                selected.push(item.value.toString());
              }

              return '<option value="' + item.value + '"' + selectedAttr + '>' + item.label + '</option>';
            };

            if ($.isArray(items)) {
              $.each(items, function(index, item) {
                self.el.append(getOption(item));
              });
            } else {
              $.each(items, function(key, value) {
                var itemData = [];
                itemData.push('<optgroup label="' + key + '">');
                for (var i = 0; i < value.length; i++) {
                  var item = value[i];
                  itemData.push(getOption(item));
                }
                itemData.push('</optgroup>');
                self.el.append(itemData.join(''));
              });
            }

            // Enable the dropdown
            self.enable();

            // If a selected item exists, set it as default
            selected.length && self.setSelected(selected);

            self._triggerReady();
        },

        // Trigger the ready event when instance is initialised for the first time
        _triggerReady: function() {
            if(this.initialised) return;

            // Set selected dropdown item if defined
            this.options.selected && this.setSelected(this.options.selected);

            this.initialised = true;
            this.el.triggerHandler('ready');
        },

        // Sets the selected dropdown item
        setSelected: function(indexOrValue, triggerChange) {
            var self = this,
                dropdownItems = self.el.find('option');

            // Trigger change event by default
            if(typeof triggerChange === 'undefined') {
                triggerChange = true;
            }
            
            var selectedItems = [];
            
            // check if indexOrValue is an array
            if($.isArray(indexOrValue)) {
                selectedItems = indexOrValue;
            } else {
                selectedItems = selectedItems.concat(indexOrValue);
            }

            var selectedValue;
            if(self.el.is('[multiple]')) {
                selectedValue = selectedItems.map(function(item) {
                    if(typeof item === 'number'
                        && (item !== undefined 
                        && item > -1 
                        && item < dropdownItems.length)) {
                        return dropdownItems[item].value
                    }
                    
                    return item;
                });

            } else {
                selectedValue = selectedItems[0];

                // if selected item is a number, get the value for the item at that index
                if(typeof selectedItems[0] === 'number' 
                    && (selectedItems[0] !== undefined 
                    && selectedItems[0] > -1 
                    && selectedItems[0] < dropdownItems.length)) {
                    selectedValue = dropdownItems[selectedItems[0]].value;
                }
            }
            
            // Set the dropdown item
            self.el.val(selectedValue);

            // Trigger change event
            if(triggerChange) {
                self.el.change();
            }

            return self.el;
        }
    };

    function CascadingDropdown(element, options) {
        this.el = $(element);
        this.options = $.extend({ selectBoxes: [] }, options);
        this._init();
    }

    CascadingDropdown.prototype = {
        _init: function() {
            var self = this;

            self.pending = 0;

            // Instance array
            self.dropdowns = [];
            
            var dropdowns = $($.map(self.options.selectBoxes, function(item) {
                return item.selector;
            }).join(','), self.el);

            // Init event handlers
            var counter = 0;
            function readyEventHandler(event) {
                if(++counter == dropdowns.length) { // Once all dropdowns are ready, unbind the event handler, and execute onReady
                    dropdowns.unbind('ready', readyEventHandler);
                    self.options.onReady.call(self, event, self.getValues());
                }
            }

            function changeEventHandler(event) {
                self.options.onChange.call(self, event, self.getValues());
            }
            
            if(typeof self.options.onReady === 'function') {
                dropdowns.bind('ready', readyEventHandler);
            }

            if(typeof self.options.onChange === 'function') {
                dropdowns.bind('change', changeEventHandler);
            }

            // Init dropdowns
            $.each(self.options.selectBoxes, function(index, item) {
                // Create the instance
                var instance = new Dropdown(this, self);

                // Insert it into the dropdown instance array
                self.dropdowns.push(instance);

                // Call the create method
                instance._create();
            });
        },
        
        // Destroys the instance and reverts everything back to its initial state 
        destroy: function() {
            $.each(this.dropdowns, function(index, item){
                item._destroy();
            });
            this.el.removeData('plugin_cascadingDropdown');
            
            return this.el;
        },

        // Fetches the values from all dropdowns in this group
        getValues: function() {
            var values = {};

            // Build the object and insert values from instances with name
            $.each(this.dropdowns, function(index, instance) {
                if(instance.name) {
                    values[instance.name] = instance.el.val();
                }
            });

            return values;
        }
    }

    // jQuery plugin declaration
    $.fn.cascadingDropdown = function(methodOrOptions) {
        var $this = $(this),
            args = arguments,
            instance = $this.data('plugin_cascadingDropdown');

        if(typeof methodOrOptions === 'object' || !methodOrOptions) {
            return !instance && $this.data('plugin_cascadingDropdown', new CascadingDropdown(this, methodOrOptions));
        } else if(typeof methodOrOptions === 'string') {
            if(!instance) {
                $.error('Cannot call method ' + methodOrOptions + ' before init.');
            } else if(instance[methodOrOptions]) {
                return instance[methodOrOptions].apply(instance, Array.prototype.slice.call(args, 1))
            }
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist in jQuery.cascadingDropdown');
        }
    };
})(jQuery);
