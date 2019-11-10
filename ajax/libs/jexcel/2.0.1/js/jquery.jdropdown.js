/**
 * (c) 2013 jDropdown (jTools v1.1)
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Custom dropdown
 */

(function( $ ) {

    var methods = {

        init : function(options) {

            var defaults = {
                 data: [],
                 multiple: false,
                 autocomplete: false,
                 type:null,
                 width: 200,
                 opened:false,
                 onchange:null,
                 onblur:null,
                 value:null,
            };

            // Remove any content from the original element
            $(this).html('');

            // Main form HTML container element : track all form elements inside
            var main = $(this);

            // Default configuration
            var options =  $.extend(defaults, options);

            // Main object
            var id = $(this).prop('id');

            // Randon id
            if (! id) {
                id = 'jdropdown-' + Math.floor((Math.random() * 100) + 1);
                $(this).prop('id', id);
            }

            // Save configuration
            $.fn.jdropdown.configuration[id] = options;

            if (options.url) {
                $.ajax({
                    url: options.url,
                    type: 'GET',
                    dataType:'json',
                    success: function(data) {
                        $.fn.jdropdown.configuration[id].data = data;
                        // Create element
                        $(main).jdropdown('create');
                    }
                });
            } else {
                // Create element
                $(this).jdropdown('create');
            }
        },

        create : function() {
            // Main element
            var main = $(this);

            // Main object
            var id = $(this).prop('id');

            // Save configuration
            var options = $.fn.jdropdown.configuration[id];

            // Properties
            $(this).addClass('jdropdown');

            if (options.type == 'searchbar') {
                $(this).addClass('jdropdown-searchbar');
            } else if (options.type == 'list') {
                $(this).addClass('jdropdown-list');
            } else if (options.type == 'picker') {
                $(this).addClass('jdropdown-picker');
            } else {
                if ($(document).width() < 800) {
                    $(this).addClass('jdropdown-picker');
                } else {
                    $(this).css('width', options.width);
                    $(this).addClass('jdropdown-default');
                }
            }

            // Header container
            var containerHeader = document.createElement('div');
            $(containerHeader).prop('class', 'jdropdown-container-header');

            // Header
            var header = document.createElement('input');
            $(header).prop('class', 'jdropdown-header');

            // Container
            var container = document.createElement('div');
            $(container).prop('class', 'jdropdown-container');

            // Dropdown content
            var content = document.createElement('div');
            $(content).prop('class', 'jdropdown-content');

            // Close button
            var close  = document.createElement('div');
            $(close).prop('class', 'jdropdown-close');
            $(close).html('Done');

            // Create backdrop
            var backdrop  = document.createElement('div');
            $(backdrop).prop('class', 'jdropdown-backdrop');

            // Autocomplete
            if (options.autocomplete == true) {
                $(this).data('autocomplete', true);
                $(header).prop('placeholder', 'Search...');

                // Handler
                $(header).on('keyup', function(e) {
                    $(main).jdropdown('find', $(this).val());
                });
            } else {
                $(header).prop('readonly', 'readonly');
            }

            // Place holder
            if (options.placeholder) {
                $(header).prop('placeholder', options.placeholder);
            }

            // Append elements
            $(containerHeader).append(header);
            $(container).append(close);
            $(container).append(content);

            $(this).append(containerHeader);
            $(this).append(container);
            $(this).append(backdrop);

            // Set data
            $(this).jdropdown('setData');

            // Values
            if (options.value) {
                $(this).jdropdown('setValue', options.value);
            }

            // Fix width - Workaround important to get the correct width
            setTimeout(function() {
                if (options.type == 'default') {
	                // Width fix
	                $(container).css('min-width', $(header).outerWidth());
                }
                // Open 
                if (options.opened == true) {
                    $(main).jdropdown('open');
                }
            }, 0);

            // Onclick controls
            if (! $.fn.jdropdown.onclick) {
                $.fn.jdropdown.onclick = function(e) {
                    if ($(e.target).hasClass('jdropdown-header')) {
                        // Open if this is close
                        var dropdown = $(e.target).parent().parent().prop('id');
                        // If this is a different dropdown
                        if ($.fn.jdropdown.current) {
                            if ($.fn.jdropdown.current != dropdown) {
                                // Close current one
                                $('#' + $.fn.jdropdown.current).jdropdown('close');
                                // Open new one
                                $(e.target).parent().parent().jdropdown('open');
                            }
                        } else {
                            $(e.target).parent().parent().jdropdown('open');
                        }
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-container')) {
                        // Do nothing
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-container-header')) {
                        // Do nothing
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-content')) {
                        // Do nothing
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-group')) {
                        // Do nothing
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-group-name')) {
                        var items = $(e.target).parent().find('.jdropdown-item');
                        $.each(items, function(k, v) {
                            if ($(v).is(':visible')) {
                                $.fn.jdropdown('selectItem', $(v));
                            }
                        });
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-group-arrow')) {
                        if ($(e.target).hasClass('jdropdown-group-arrow-down')) {
                            $(e.target).removeClass('jdropdown-group-arrow-down');
                            $(e.target).addClass('jdropdown-group-arrow-up');
                            $(e.target).parent().next().hide();
                        } else {
                            $(e.target).removeClass('jdropdown-group-arrow-up');
                            $(e.target).addClass('jdropdown-group-arrow-down');
                            $(e.target).parent().next().show();
                        }
                    } else if ($(e.target).hasClass('jdropdown-group-itens')) {
                        // Do nothing
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-item')) {
                        $.fn.jdropdown('selectItem', $(e.target));
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-image')) {
                        // Select item
                        $('#' + $.fn.jdropdown.current).jdropdown('selectIndex', $(e.target).parent().data('index'));
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-title')) {
                        // Select item
                        $('#' + $.fn.jdropdown.current).jdropdown('selectIndex', $(e.target).parent().data('index'));
                        e.stopPropagation();
                        e.preventDefault();
                    } else if ($(e.target).hasClass('jdropdown-close') || $(e.target).hasClass('jdropdown-backdrop')) {
                        // Close
                        $('#' + $.fn.jdropdown.current).jdropdown('close');
                        e.stopPropagation();
                        e.preventDefault();
                    } else {
                        if ($.fn.jdropdown.current) {
                            $('#' + $.fn.jdropdown.current).jdropdown('close');
                        }
                    }
                }

                $(document).on('click', $.fn.jdropdown.onclick);

                // Keydown controls
                $.fn.jdropdown.onkeydown = function(e) {
                    if ($.fn.jdropdown.current) {
                        var index = $.fn.jdropdown.currentIndex;
                        if (e.which == 13 || e.which == 35 || e.which == 36 || e.which == 38 || e.which == 40) {
                            // Move cursor
                            if (e.which == 13) {
                                $('#' + $.fn.jdropdown.current).jdropdown('selectIndex', index)
                            } else if (e.which == 38) {
                                if (index == null) {
                                    $('#' + $.fn.jdropdown.current).jdropdown('updateCursorPosition', 0);
                                } else if (index > 0) {
                                    $('#' + $.fn.jdropdown.current).jdropdown('updateCursorPosition', 'prev');
                                }
                            } else if (e.which == 40) {
                                if (index == null) {
                                    $('#' + $.fn.jdropdown.current).jdropdown('updateCursorPosition', 0);
                                } else if (index + 1 < $($.fn.jdropdown.configuration[$.fn.jdropdown.current].data).length) {
                                    $('#' + $.fn.jdropdown.current).jdropdown('updateCursorPosition', 'next');
                                }
                            } else if (e.which == 36) {
                                $('#' + $.fn.jdropdown.current).jdropdown('updateCursorPosition', 'first');
                            } else if (e.which == 35) {
                                $('#' + $.fn.jdropdown.current).jdropdown('updateCursorPosition', 'last');
                            }

                            e.stopPropagation();
                            e.preventDefault();
                        }
                    }
                }

                $(document).on('keydown', $.fn.jdropdown.onkeydown);
            }
        },

        /**
         * Set the data for the jdropdown
         */
        setData : function(data)
        {
            // Main object
            var id = $(this).prop('id');

            if (data) {
                $.fn.jdropdown.configuration[id].data = data;
            } else {
                data = $.fn.jdropdown.configuration[id].data;
            }

            // Content container
            var content = $(this).find('.jdropdown-content');

            // Make sure the content container is blank
            $(content).html('');

            // Group holder
            var groups = {};

            // Foreach in the data to create all itens
            $.each(data, function(k, v) {
                // Compatibility
                if (typeof(v) != 'object') {
                    var value = v;
                    v = {}
                    v.id = value;
                    v.name = value;

                    // Fix array
                    $.fn.jdropdown.configuration[id].data[k] = v;
                }

                // Create item
                var item = document.createElement('div');
                $(item).prop('class', 'jdropdown-item');
                $(item).data('value', v.id);
                $(item).html(v.name);

                // Image
                if (v.image) {
                    var image = document.createElement('img');
                    $(image).prop('class', 'jdropdown-image');
                    $(image).prop('src', v.image);
                    $(item).prepend(image);
                }

                // Title
                if (v.title) {
                    var title = document.createElement('div');
                    $(title).prop('class', 'jdropdown-title');
                    $(title).html(v.title);
                    $(item).append(title);
                } else {
                    if (v.image) {
                        $(image).addClass('jdropdown-image-small');
                    }
                }

                // Append to the container
                if (v.group) {
                    if (! groups[v.group]) {
                        groups[v.group] = document.createElement('div');
                        $(groups[v.group]).prop('class', 'jdropdown-group-itens');
                    }
                    $(groups[v.group]).append(item);
                } else {
                    $(content).append(item);
                }
            });

            // Append groups in case exists
            if ($(groups).length > 0) {
                $.each(groups, function(k, v) {
                    var group = document.createElement('div');
                    $(group).prop('class', 'jdropdown-group');
                    $(group).html('<div class="jdropdown-group-name">' + k + '<i class="jdropdown-group-arrow jdropdown-group-arrow-down"></i></div>');
                    $(group).append(v)
                    $(content).append(group);
                });
            }

            // Create index data
            var items = $(content).find('.jdropdown-item');
            $.each(items, function(k, v) {
                $(v).data('index', k);
            });

            // Reset value
            $(this).jdropdown('setValue', '');
        },

        /**
         * Get value
         */
        getText : function(asArray) {
            // Get selected items
            var itens = $(this).find('.jdropdown-item.jdropdown-selected');
            // Result
            var result = [];
            // Append options
            $.each(itens, function(k, v) {
                result.push($(v).html());
            });
            
            if (asArray) {
                return result
            } else {
                return result.join(';');
            }
        },


        /**
         * Get value
         */
        getValue : function(asArray) {
            // Get selected items
            var itens = $(this).find('.jdropdown-item.jdropdown-selected');
            // Result
            var result = [];
            // Append options
            $.each(itens, function(k, v) {
                result.push($(v).data('value'));
            });
            
            if (asArray) {
                return result;
            } else {
                return result.join(';');
            }
        },

        // Highlight current item
        
        /**
         * Update scroll
         */
        updateCursorPosition : function(index) {
            if ($.fn.jdropdown.current) {
                // Get all itens
                var dropDownOptions = $('#' + $.fn.jdropdown.current).find('.jdropdown-item');
                // Next?
                if (index == 'next') {
                    var newIndex = null;
                    for (var i = $.fn.jdropdown.currentIndex + 1; i < $.fn.jdropdown.configuration[$.fn.jdropdown.current].data.length; i++) {
                        if ($(dropDownOptions[i]).css('display') != 'none') {
                            newIndex = i;
                            break;
                        }
                    }
                    if (newIndex == null) {
                        return false;
                    } else {
                        index = newIndex;
                    }
                // Prev?
                } else if (index == 'prev') {
                    var newIndex = null;
                    for (var i = $.fn.jdropdown.currentIndex - 1; i >= 0; i--) {
                        if ($(dropDownOptions[i]).css('display') != 'none') {
                            newIndex = i;
                            break;
                        }
                    }
                    if (newIndex == null) {
                        return false;
                    } else {
                        index = newIndex;
                    }
                } else if (index == 'last') {
                    var newIndex = null;
                    for (var i = $.fn.jdropdown.currentIndex + 1; i < $.fn.jdropdown.configuration[$.fn.jdropdown.current].data.length; i++) {
                        if ($(dropDownOptions[i]).css('display') != 'none') {
                            newIndex = i;
                        }
                    }
                    if (newIndex == null) {
                        return false;
                    } else {
                        index = newIndex;
                    }
                // Prev?
                } else if (index == 'first') {
                    var newIndex = null;
                    for (var i = $.fn.jdropdown.currentIndex - 1; i >= 0; i--) {
                        if ($(dropDownOptions[i]).css('display') != 'none') {
                            newIndex = i;
                        }
                    }
                    if (newIndex == null) {
                        return false;
                    } else {
                        index = newIndex;
                    }
                }
                // Update cursor
                $(dropDownOptions[$.fn.jdropdown.currentIndex]).removeClass('jdropdown-cursor');
                $(dropDownOptions[index]).addClass('jdropdown-cursor');
                // Update position
                $.fn.jdropdown.currentIndex = index;
                // Update scroll
                var container = $(this).find('.jdropdown-content').scrollTop();
                var element = $(dropDownOptions[$.fn.jdropdown.currentIndex]).position().top
                $(this).find('.jdropdown-content').scrollTop(container + element - 95);
            }
        },

        /**
         * Set value
         */
        setValue : function(value) {
            // Remove values
            var dropDownOptions = $(this).find('.jdropdown-selected').removeClass('jdropdown-selected');
            // Select items
            var dropDownOptions = $(this).find('.jdropdown-item');
            // Set values
            if (typeof(value.forEach) == 'function') {
                $.each(dropDownOptions, function(k, v) {
                    value.forEach(function(val) {
                        if ($(v).data('value') == val) {
                            $(v).addClass('jdropdown-selected');
                        }
                    });
                });
            } else {
                $.each(dropDownOptions, function(k, v) {
                    if ($(v).data('value') == value) {
                        $(v).addClass('jdropdown-selected');
                    }
                });
            }
            // Update labels
            $(this).jdropdown('updateLabel');
        },

        /**
         * Select an item
         */
        selectIndex : function(index) {
            // Current dropdown
            var currentDropdown = $.fn.jdropdown.current;
            // Get all options
            var dropDownOptions = $(this).find('.jdropdown-item');
            // Focus behaviour
            if (! $.fn.jdropdown.configuration[$.fn.jdropdown.current].multiple) {
                // Update selected item
                $(dropDownOptions).removeClass('jdropdown-selected');
                $(dropDownOptions[index]).addClass('jdropdown-selected');
                // Close
                $(this).jdropdown('close');
                // Cursor
                $(dropDownOptions).removeClass('jdropdown-cursor');
                $(dropDownOptions[index]).addClass('jdropdown-cursor');
            } else {
                // Toggle option
                if ($(dropDownOptions[index]).hasClass('jdropdown-selected')) {
                    $(dropDownOptions[index]).removeClass('jdropdown-selected');
                    $(dropDownOptions[index]).removeClass('jdropdown-cursor');
                } else {
                    $(dropDownOptions[index]).addClass('jdropdown-selected');
                    $(dropDownOptions).removeClass('jdropdown-cursor');
                    $(dropDownOptions[index]).addClass('jdropdown-cursor');
                }
                // Update cursor position
                $.fn.jdropdown.currentIndex = index;
                // Update labels for multiple dropdown
                if (! $(this).data('autocomplete')) {
                   $(this).jdropdown('updateLabel');
                }
            }

            // Events
            if (typeof($.fn.jdropdown.configuration[currentDropdown].onchange) == 'function') {
                var oldValue = $('#' + currentDropdown).jdropdown('getValue');
                var newValue = $(dropDownOptions[index]).data('value');
                $.fn.jdropdown.configuration[currentDropdown].onchange($('#' + currentDropdown), index, oldValue, newValue);
            }
        },

        /**
         * Select an item
         */
        selectItem : function(item)
        {
            if ($.fn.jdropdown.current) {
                // Select item
                $('#' + $.fn.jdropdown.current).jdropdown('selectIndex', $(item).data('index'));
            } else {
                var index = $(item).data('index');
                var dropdown = $(item).parents('.jdropdown');
                var dropdown_id = $(dropdown).prop('id');

                // List
                if ($.fn.jdropdown.configuration[dropdown_id].type == 'list') {
                    var dropDownOptions = $(dropdown).find('.jdropdown-item');
                    if (! $.fn.jdropdown.configuration[dropdown_id].multiple) {
                        // Update selected item
                        $(dropDownOptions).removeClass('jdropdown-selected');
                        $(dropDownOptions[index]).addClass('jdropdown-selected');
                        // Cursor
                        $(dropDownOptions).removeClass('jdropdown-cursor');
                        $(dropDownOptions[index]).addClass('jdropdown-cursor');
                    } else {
                        // Toggle option
                        if ($(dropDownOptions[index]).hasClass('jdropdown-selected')) {
                            $(dropDownOptions[index]).removeClass('jdropdown-selected');
                            $(dropDownOptions[index]).removeClass('jdropdown-cursor');
                        } else {
                            $(dropDownOptions[index]).addClass('jdropdown-selected');
                            $(dropDownOptions).removeClass('jdropdown-cursor');
                            $(dropDownOptions[index]).addClass('jdropdown-cursor');
                        }
                        // Update cursor position
                        $.fn.jdropdown.currentIndex = index;
                    }
                }
            }
        },

        /**
         * Autocomplete filter
         */
        find : function(str) {
            var itens = $(this).find('.jdropdown-item');

            // Append options
            $.each(itens, function(k, v) {
                if (str == null || $(v).hasClass('jdropdown-selected') || $(v).html().toLowerCase().indexOf(str.toLowerCase()) != -1) {
                    $(v).show();
                } else {
                    $(v).hide();
                }
            });

            // Hide groups
            var groups = $(this).find('.jdropdown-group');

            $.each(groups, function(k, v) {
                if ($(v).find('.jdropdown-item').filter(function() { return $(this).css("display") != "none" }).length > 0) {
                    $(v).find('.jdropdown-group-name').show();
                } else {
                    $(v).find('.jdropdown-group-name').hide();
                }
            });
        },

        /**
         * Update labels
         */
        updateLabel : function() {
            // Get id
            var id = $(this).prop('id');

            // Update label
            var selectedOptions = $(this).find('.jdropdown-selected');
            var label = '';
            $.each(selectedOptions, function(k, v) {
                var index = $(v).data('index');
                if (label) {
                    label += '; ';
                }
                if ($.fn.jdropdown.configuration[id].data[index]) {
                    label += $.fn.jdropdown.configuration[id].data[index].name;
                }
            });

            // Update label
            $(this).find('.jdropdown-header').val(label)
        },

        /**
         * Open dropdown
         */
        open : function() {
            if (! $.fn.jdropdown.current) {
                var main = $(this);

                // Prevent propagation of click
                setTimeout(function() {
                    // Current dropdown
                    $.fn.jdropdown.current = $(main).prop('id');

                    // Focus
                    if (! $(main).hasClass('jdropdown-focus')) {
                        // Add focus
                        $(main).addClass('jdropdown-focus');
                        // Animation
                        if ($(document).width() < 800) {
                            if ($.fn.jdropdown.configuration[$.fn.jdropdown.current].type == 'picker') {
                                // Animation
                                $(main).find('.jdropdown-container').addClass('slide-bottom-in');
                            }
                        }
                        // Filter
                        if ($(main).data('autocomplete') == true) {
                            // Redo search
                            $(main).jdropdown('find', null);
                            // Clear search field
                            $(main).find('.jdropdown-header').val('').focus();
                        }
                        // Selected
                        var selected = $(main).find('.jdropdown-selected');
                        // Update cursor position
                        if ($(selected).length > 0) {
                            $(main).jdropdown('updateCursorPosition', $(selected[0]).data('index'));
                        }
                    }

                    // Events
                    if (typeof($.fn.jdropdown.configuration[$.fn.jdropdown.current].onopen) == 'function') {
                        $.fn.jdropdown.configuration[$.fn.jdropdown.current].onopen($(main));
                    }
                }, 0);
            }
        },

        /**
         * Close dropdown
         */
        close : function() {
            if ($.fn.jdropdown.current) {
                // Remove focus
                $(this).removeClass('jdropdown-focus');
                // Remove cursor
                $(this).find('.jdropdown-cursor').removeClass('jdropdown-cursor');
                // Update labels
                $(this).jdropdown('updateLabel');
                // Events
                if (typeof($.fn.jdropdown.configuration[$.fn.jdropdown.current].onclose) == 'function') {
                    $.fn.jdropdown.configuration[$.fn.jdropdown.current].onclose($(this));
                }
                // Blur
                $(this).find('.jdropdown-header').blur();
                // Reset
                $.fn.jdropdown.current = null
                $.fn.jdropdown.currentIndex = null;
            }
        },

        /**
         * Reset dropdown
         */
        reset : function() {
            // Update options
            var selectedOptions = $(this).find('.jdropdown-selected').removeClass('.jdropdown-selected');
            // Update label
            $(this).find('.jdropdown-header').val('')
        }
    };

    $.fn.jdropdown = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }  
    };

    $.fn.jdropdown.configuration = {};
    $.fn.jdropdown.current = null;
    $.fn.jdropdown.currentIndex = null;

})( jQuery );