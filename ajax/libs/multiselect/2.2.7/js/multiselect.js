/*
 * @license
 *
 * Multiselect v2.2.7
 * http://crlcu.github.io/multiselect/
 *
 * Copyright (c) 2015 Adrian Crisan
 * Licensed under the MIT license (https://github.com/crlcu/multiselect/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
    throw new Error('multiselect requires jQuery');
}

;(function ($) {
    'use strict';

    var version = $.fn.jquery.split(' ')[0].split('.');
    
    if (version[0] < 2 && version[1] < 7) {
        throw new Error('multiselect requires jQuery version 1.7 or higher');
    }
})(jQuery);

;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var Multiselect = (function($) {
        /** Multiselect object constructor
         *
         *  @class Multiselect
         *  @constructor
        **/
        function Multiselect( $select, settings ) {
            var id = $select.prop('id');
            this.$left = $select;
            this.$right = $( settings.right ).length ? $( settings.right ) : $('#' + id + '_to');
            this.actions = {
                $leftAll:        $( settings.leftAll ).length ? $( settings.leftAll ) : $('#' + id + '_leftAll'),
                $rightAll:       $( settings.rightAll ).length ? $( settings.rightAll ) : $('#' + id + '_rightAll'),
                $leftSelected:   $( settings.leftSelected ).length ? $( settings.leftSelected ) : $('#' + id + '_leftSelected'),
                $rightSelected:  $( settings.rightSelected ).length ? $( settings.rightSelected ) : $('#' + id + '_rightSelected'),

                $undo:           $( settings.undo ).length ? $( settings.undo ) : $('#' + id + '_undo'),
                $redo:           $( settings.redo ).length ? $( settings.redo ) : $('#' + id + '_redo')
            };
            
            delete settings.leftAll;
            delete settings.leftSelected;
            delete settings.right;
            delete settings.rightAll;
            delete settings.rightSelected;

            this.options = {
                keepRenderingSort:  settings.keepRenderingSort,
                submitAllLeft:      settings.submitAllLeft !== undefined ? settings.submitAllLeft : true,
                submitAllRight:     settings.submitAllRight !== undefined ? settings.submitAllRight : true,
                search:             settings.search,
                ignoreDisabled:     settings.ignoreDisabled !== undefined ? settings.ignoreDisabled : false
            };

            delete settings.keepRenderingSort, settings.submitAllLeft, settings.submitAllRight, settings.search, settings.ignoreDisabled;

            this.callbacks = settings;
            
            this.init();
        }
        
        Multiselect.prototype = {
            // Vars
            undoStack: [],
            redoStack: [],

            // Functions
            init: function() {
                var self = this;

                // For the moment disable sort and search if there is a optgroup element
                if (self.$left.find('optgroup').length || self.$right.find('optgroup').length) {
                    self.callbacks.sort = false;
                    self.options.search = false;
                }

                if (self.options.keepRenderingSort) {
                    self.skipInitSort = true;

                    if (self.callbacks.sort !== false) {
                        self.callbacks.sort = function(a, b) {
                            return $(a).data('position') > $(b).data('position') ? 1 : -1;
                        };
                    }

                    self.$left.find('option').each(function(index, option) {
                        $(option).data('position', index);
                    });

                    self.$right.find('option').each(function(index, option) {
                        $(option).data('position', index);
                    });
                }

                if ( typeof self.callbacks.startUp == 'function' ) {
                    self.callbacks.startUp( self.$left, self.$right );
                }
                
                if ( !self.skipInitSort && typeof self.callbacks.sort == 'function' ) {
                    self.$left.mSort(self.callbacks.sort);
                    
                    self.$right.each(function(i, select) {
                        $(select).mSort(self.callbacks.sort);
                    });
                }

                // Append left filter
                if (self.options.search && self.options.search.left) {
                    self.options.search.$left = $(self.options.search.left);
                    self.$left.before(self.options.search.$left);
                }

                // Append right filter
                if (self.options.search && self.options.search.right) {
                    self.options.search.$right = $(self.options.search.right);
                    self.$right.before($(self.options.search.$right));
                }
                
                // Initialize events
                self.events();
            },
            
            events: function() {
                var self = this;

                // Attach event to left filter
                if (self.options.search && self.options.search.$left) {
                    self.options.search.$left.on('keyup', function(e) {
                        if (this.value) {
                            var $toShow = self.$left.find('option:search("' + this.value + '")').mShow();
                            var $toHide = self.$left.find('option:not(:search("' + this.value + '"))').mHide();
                        } else {
                            self.$left.find('option').mShow();
                        }
                    });
                }

                // Attach event to right filter
                if (self.options.search && self.options.search.$right) {
                    self.options.search.$right.on('keyup', function(e) {
                        if (this.value) {
                            var $toShow = self.$right.find('option:search("' + this.value + '")').mShow();
                            var $toHide = self.$right.find('option:not(:search("' + this.value + '"))').mHide();
                        } else {
                            self.$right.find('option').mShow();
                        }
                    });
                }

                // Select all the options from left and right side when submiting the parent form
                self.$right.closest('form').on('submit', function(e) {
                    self.$left.find('option').prop('selected', self.options.submitAllLeft);
                    self.$right.find('option').prop('selected', self.options.submitAllRight);
                });

                // Attach event for double clicking on options from left side
                self.$left.on('dblclick', 'option', function(e) {
                    e.preventDefault();
                    
                    var $options = self.$left.find('option:selected');
                    
                    if ( $options.length ) {
                        self.moveToRight($options, e);
                    }
                });
                
                // Attach event for double clicking on options from right side
                self.$right.on('dblclick', 'option', function(e) {
                    e.preventDefault();

                    var $options = self.$right.find('option:selected');
                    
                    if ( $options.length ) {
                        self.moveToLeft($options, e);
                    }
                });

                // dblclick support for IE
                if ( navigator.userAgent.match(/MSIE/i)  || navigator.userAgent.indexOf('Trident/') > 0 || navigator.userAgent.indexOf('Edge/') > 0) {
                    self.$left.dblclick(function(e) {
                        self.actions.$rightSelected.trigger('click');
                    });
                    
                    self.$right.dblclick(function(e) {
                        self.actions.$leftSelected.trigger('click');
                    });
                }
                
                self.actions.$rightSelected.on('click', function(e) {
                    e.preventDefault();

                    var $options = self.$left.find('option:selected');
                    
                    if ( $options.length ) {
                        self.moveToRight($options, e);
                    }

                    $(this).blur();
                });
                
                self.actions.$leftSelected.on('click', function(e) {
                    e.preventDefault();

                    var $options = self.$right.find('option:selected');

                    if ( $options.length ) {
                        self.moveToLeft($options, e);
                    }

                    $(this).blur();
                });
                
                self.actions.$rightAll.on('click', function(e) {
                    e.preventDefault();

                    var $options = self.$left.children(':not(span):not(.hidden)');

                    if ( $options.length ) {
                        self.moveToRight($options, e);
                    }

                    $(this).blur();
                });
                
                self.actions.$leftAll.on('click', function(e) {
                    e.preventDefault();
                    
                    var $options = self.$right.children(':not(span):not(.hidden)');
                    
                    if ( $options.length ) {
                        self.moveToLeft($options, e);
                    }

                    $(this).blur();
                });

                self.actions.$undo.on('click', function(e) {
                    e.preventDefault();

                    self.undo(e);
                });

                self.actions.$redo.on('click', function(e) {
                    e.preventDefault();

                    self.redo(e);
                });
            },
            
            moveToRight: function( $options, event, silent, skipStack ) {
                var self = this;

                if ( typeof self.callbacks.moveToRight == 'function' ) {
                    return self.callbacks.moveToRight( self, $options, event, silent, skipStack );
                } else {
                    if ( typeof self.callbacks.beforeMoveToRight == 'function' && !silent ) {
                        if ( !self.callbacks.beforeMoveToRight( self.$left, self.$right, $options ) ) {
                            return false;
                        }
                    }

                    $options.each(function(index, option) {
                        var $option = $(option);

                        if (self.options.ignoreDisabled && $option.is(':disabled')) {
                            return true;
                        }

                        if ($option.parent().is('optgroup')) {
                            var $leftGroup = $option.parent();
                            var $rightGroup = self.$right.find('optgroup[label="' + $leftGroup.prop('label') + '"]');

                            if (!$rightGroup.length) {
                                $rightGroup = $leftGroup.clone();
                                $rightGroup.children().remove();
                            }

                            $option = $rightGroup.append($option);

                            $leftGroup.removeIfEmpty();
                        }

                        self.$right.move($option);
                    });

                    if ( !skipStack ) {
                        self.undoStack.push(['right', $options ]);
                        self.redoStack = [];
                    }
                    
                    if ( typeof self.callbacks.sort == 'function' && !silent ) {
                        self.$right.mSort(self.callbacks.sort);
                    }
                    
                    if ( typeof self.callbacks.afterMoveToRight == 'function' && !silent ) {
                        self.callbacks.afterMoveToRight( self.$left, self.$right, $options );
                    }
                    
                    return self;
                }
            },
            
            moveToLeft: function( $options, event, silent, skipStack ) {
                var self = this;
                
                if ( typeof self.callbacks.moveToLeft == 'function' ) {
                    return self.callbacks.moveToLeft( self, $options, event, silent, skipStack );
                } else {
                    if ( typeof self.callbacks.beforeMoveToLeft == 'function' && !silent ) {
                        if ( !self.callbacks.beforeMoveToLeft( self.$left, self.$right, $options ) ) {
                            return false;
                        }
                    }

                    $options.each(function(index, option) {
                        var $option = $(option);

                        if ($option.is('optgroup') || $option.parent().is('optgroup')) {
                            var $rightGroup = $option.is('optgroup') ? $option : $option.parent();
                            var $leftGroup = self.$left.find('optgroup[label="' + $rightGroup.prop('label') + '"]');

                            if (!$leftGroup.length) {
                                $leftGroup = $rightGroup.clone();
                                $leftGroup.children().remove();
                            }

                            $option = $leftGroup.append($option.is('optgroup') ? $option.children() : $option );

                            $rightGroup.removeIfEmpty();
                        }

                        self.$left.move($option);
                    });
                    
                    if ( !skipStack ) {
                        self.undoStack.push(['left', $options ]);
                        self.redoStack = [];
                    }
                    
                    if ( typeof self.callbacks.sort == 'function' && !silent ) {
                        self.$left.mSort(self.callbacks.sort);
                    }
                    
                    if ( typeof self.callbacks.afterMoveToLeft == 'function' && !silent ) {
                        self.callbacks.afterMoveToLeft( self.$left, self.$right, $options );
                    }
                    
                    return self;
                }
            },

            undo: function(event) {
                var self = this;
                var last = self.undoStack.pop();

                if ( last ) {
                    self.redoStack.push(last);

                    switch(last[0]) {
                        case 'left':
                            self.moveToRight(last[1], event, false, true);
                            break;
                        case 'right':
                            self.moveToLeft(last[1], event, false, true);
                            break;
                    }
                }
            },
            redo: function(event) {
                var self = this;
                var last = self.redoStack.pop();

                if ( last ) {
                    self.undoStack.push(last);

                    switch(last[0]) {
                        case 'left':
                            self.moveToLeft(last[1], event, false, true);
                            break;
                        case 'right':
                            self.moveToRight(last[1], event, false, true);
                            break;
                    }
                }
            }
        }
        
        return Multiselect;
    })($);
    
    $.multiselect = {
        defaults: {
            /** will be executed once - remove from $left all options that are already in $right
             *
             *  @method startUp
             *  @attribute $left jQuery object
             *  @attribute $right jQuery object
            **/
            startUp: function( $left, $right ) {
                $right.find('option').each(function(index, option) {
                    var $option = $left.find('option[value="' + option.value + '"]');
                    var $parent = $option.parent();

                    $option.remove();

                    if ($parent.prop('tagName') == 'OPTGROUP') {
                        $parent.removeIfEmpty();
                    }
                });
            },

            /** will be executed each time before moving option[s] to right
             *  
             *  IMPORTANT : this method must return boolean value
             *      true    : continue to moveToRight method
             *      false   : stop
             * 
             *  @method beforeMoveToRight
             *  @attribute $left jQuery object
             *  @attribute $right jQuery object
             *  @attribute $options HTML object (the option[s] which was selected to be moved)
             *  
             *  @default true
             *  @return {boolean}
            **/
            beforeMoveToRight: function($left, $right, $options) { return true; },

            /*  will be executed each time after moving option[s] to right
             * 
             *  @method afterMoveToRight
             *  @attribute $left jQuery object
             *  @attribute $right jQuery object
             *  @attribute $options HTML object (the option[s] which was selected to be moved)
            **/
            afterMoveToRight: function($left, $right, $options) {},

            /** will be executed each time before moving option[s] to left
             *  
             *  IMPORTANT : this method must return boolean value
             *      true    : continue to moveToRight method
             *      false   : stop
             * 
             *  @method beforeMoveToLeft
             *  @attribute $left jQuery object
             *  @attribute $right jQuery object
             *  @attribute $options HTML object (the option[s] which was selected to be moved)
             *  
             *  @default true
             *  @return {boolean}
            **/
            beforeMoveToLeft: function($left, $right, $options) { return true; },

            /*  will be executed each time after moving option[s] to left
             * 
             *  @method afterMoveToLeft
             *  @attribute $left jQuery object
             *  @attribute $right jQuery object
             *  @attribute $options HTML object (the option[s] which was selected to be moved)
            **/
            afterMoveToLeft: function($left, $right, $options) {},

            /** sort options by option text
             * 
             *  @method sort
             *  @attribute a HTML option
             *  @attribute b HTML option
             *
             *  @return 1/-1
            **/
            sort: function(a, b) {
                if (a.innerHTML == 'NA') {
                    return 1;   
                } else if (b.innerHTML == 'NA') {
                    return -1;   
                }
                
                return (a.innerHTML > b.innerHTML) ? 1 : -1;
            }
        }
    };

    var ua = window.navigator.userAgent;
    var isIE = (ua.indexOf("MSIE ") + ua.indexOf("Trident/") + ua.indexOf("Edge/")) > -3;

    $.fn.multiselect = function( options ) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data();
            
            var settings = $.extend({}, $.multiselect.defaults, data, options);
            
            return new Multiselect($this, settings);
        });
    };

    // append options
    // then set the selected attribute to false
    $.fn.move = function( $options ) {
        this
            .append($options)
            .find('option')
            .prop('selected', false);

        return this;
    };

    $.fn.removeIfEmpty = function() {
        if (!this.children().length) {
            this.remove();
        }

        return this;
    };

    $.fn.mShow = function() {
        this.removeClass('hidden').show();

        if ( isIE ) {
            this.each(function(index, option) {
                // Remove <span> to make it compatible with IE
                if($(option).parent().is('span')) {
                    $(option).parent().replaceWith(option);
                }

                $(option).show();
            });
        }

        return this;
    };

    $.fn.mHide = function() {
        this.addClass('hidden').hide();

        if ( isIE ) {
            this.each(function(index, option) {
                // Wrap with <span> to make it compatible with IE
                if(!$(option).parent().is('span')) {
                    $(option).wrap('<span>').hide();
                }
            });
        }

        return this;
    };

    // sort options then reappend them to the select
    $.fn.mSort = function(callback) {
        this
            .find('option')
            .sort(callback)
            .appendTo(this);

        return this;
    };

    $.expr[":"].search = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });
}));
