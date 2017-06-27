/*
 * Multiselect
 * http://crlcu.github.io/multiselect/
 *
 * Copyright (c) 2013 Adrian Crisan
 * Licensed under the MIT license.
 */
 ;(function (factory) {
   if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module depending on jQuery.
     define(['jquery'], factory);
   } else {
     // No AMD. Register plugin with global jQuery object.
     factory(jQuery);
   }
 }(function ($) {

 	var Multiselect = (function( $ ) {
		"use strict";
		
		/**
		Multiselect object constructor
		
		@class Multiselect
		@constructor
		**/
		function Multiselect( $select, settings ) {
			if ( typeof $ != 'function' ) {
				throw "$ is undefined or not a function";
			}
			
			var id = $select.attr('id');
			this.left = $select;
			this.right = $( settings.right ).length ? $( settings.right ) : $('#' + id + '_to');
			this.actions = {					
				leftAll: 		$( settings.leftAll ).length ? $( settings.leftAll ) : $('#' + id + '_leftAll'),
				rightAll: 		$( settings.rightAll ).length ? $( settings.rightAll ) : $('#' + id + '_rightAll'),
				leftSelected:	$( settings.leftSelected ).length ? $( settings.leftSelected ) : $('#' + id + '_leftSelected'),
				rightSelected:	$( settings.rightSelected ).length ? $( settings.rightSelected ) : $('#' + id + '_rightSelected')
			};
			
			delete settings.leftAll;
			delete settings.leftSelected;
			delete settings.right;
			delete settings.rightAll;
			delete settings.rightSelected;
			
			this.callbacks = settings;
			
			this.init();
		}
		
		Multiselect.prototype = {
			init: function() {
				var self = this;
				
				if ( typeof self.callbacks.startUp == 'function' ) {
					self.callbacks.startUp( self.left, self.right );
				}
				
				if ( typeof self.callbacks.sort == 'function' ) {
					self.left.find('option').sort(self.callbacks.sort).appendTo(self.left);
					self.right.find('option').sort(self.callbacks.sort).appendTo(self.right);
				}
				
				self.events( self.actions );
			},
			
			events: function( actions ) {
				var self = this;
				
				self.left.on('dblclick', 'option', function(e) {
					e.preventDefault();
					self.moveOneToRight(this);
				});
				
				self.right.on('dblclick', 'option', function(e) {
					e.preventDefault();
					self.moveOneToLeft(this);
				});
				
				// dblclick support for IE
				if ( navigator.userAgent.match(/MSIE/i) ) {
					self.left.dblclick(function(e){
						actions.rightSelected.trigger('click');
					});
					
					self.right.dblclick(function(e){
						actions.leftSelected.trigger('click');
					});
				}
				
				actions.rightSelected.on('click', function(e) {
					e.preventDefault();
					var option = self.left.find('option:selected');
					
					if ( option )
						self.moveOneToRight(option);
				});
				
				actions.leftSelected.on('click', function(e) {
					e.preventDefault();
					var option = self.right.find('option:selected');
					
					if ( option )
						self.moveOneToLeft(option);
				});
				
				actions.rightAll.on('click', function(e){
					e.preventDefault();
					var options = self.left.find('option');
					
					if ( options )
						self.moveAllToRight(options);
				});
				
				actions.leftAll.on('click', function(e){
					e.preventDefault();
					
					var options = self.right.find('option');
					
					if ( options )
						self.moveAllToLeft(options);
				});
			},
			
			moveOneToRight: function( option, silent ) {
				var self = this;
				
				if ( typeof self.callbacks.beforeMoveOneToRight == 'function' && !silent ) {
					if ( !self.callbacks.beforeMoveOneToRight( self.left, self.right, option ) )
						return false;
				}
				
				self.right.append(option);
				
				if ( typeof self.callbacks.sort == 'function' && !silent ) {
					self.right.find('option').sort(self.callbacks.sort).appendTo(self.right);		
				}
				
				if ( typeof self.callbacks.afterMoveOneToRight == 'function' && !silent ){
					self.callbacks.afterMoveOneToRight( self.left, self.right, option );
				}
				
				return self;
			},
			
			moveOneToLeft: function( option, silent ) {
				var self = this;
				
				if ( typeof self.callbacks.beforeMoveOneToLeft == 'function' && !silent ) {
					if ( !self.callbacks.beforeMoveOneToLeft( self.left, self.right, option ) )
						return false;
				}
					
				self.left.append(option);
				
				if ( typeof self.callbacks.sort == 'function' && !silent ) {
					self.left.find('option').sort(self.callbacks.sort).appendTo(self.left);		
				}
				
				if ( typeof self.callbacks.afterMoveOneToLeft == 'function' && !silent ) {
					self.callbacks.afterMoveOneToLeft( self.left, self.right, option );	
				}
				
				return self;
			},
			
			moveAllToRight: function( options ) {
				var self = this;
				
				if ( typeof self.callbacks.beforeMoveAllToRight == 'function' ) {
					if ( !self.callbacks.beforeMoveAllToRight( self.left, self.right, options ) )
						return false;
				}
				
				for ( var i = 0; options[i]; i++ ) {
					self.moveOneToRight(options[i], true);
				}
				
				if ( typeof self.callbacks.sort == 'function' ) {
					self.right.find('option').sort(self.callbacks.sort).appendTo(self.right);		
				}
				
				if ( typeof self.callbacks.afterMoveAllToRight == 'function' ){
					self.callbacks.afterMoveAllToRight( self.left, self.right, options );	
				}
				
				return self;
			},
			
			moveAllToLeft: function( options ) {
				var self = this;
				
				if ( typeof self.callbacks.beforeMoveAllToLeft == 'function' ) {
					if ( !self.callbacks.beforeMoveAllToLeft( self.left, self.right, options ) )
						return false;
				}
				
				for ( var i = 0; options[i]; i++ ) {
					self.moveOneToLeft(options[i], true);
				}
				
				if ( typeof self.callbacks.sort == 'function' ){
					self.left.find('option').sort(self.callbacks.sort).appendTo(self.left);		
				}
				
				if ( typeof self.callbacks.afterMoveAllToLeft == 'function' ){
					self.callbacks.afterMoveAllToLeft( self.left, self.right, options );	
				}
				
				return self;
			}
		}
		
		return Multiselect;
	})( jQuery );
	
	$.multiselect = {
		defaults : {
			/*
			 * will be executed once
			 * @method startUp
			**/
			startUp: function( $left, $right ) {
				$right.find('option').each(function(index, option){
					$left.find('option[value="' + option.value + '"]').remove();
				});
			},
			/*
			 *  will be executed each time before moving one option to right
			 *  IMPORTANT : this method must return boolean value
			 *      true    : continue to moveOneToRight method
			 *      false   : stop
			 * 
			 *  @method beforeMoveOneToRight
			 *  @attribute $left jQuery object
			 *  @attribute $right jQuery object
			 *  @attribute option HTML object (the option which was selected to be moved)
			 *  
			 *  @default true
			 *  @return {boolean}
			**/
			beforeMoveOneToRight: function($left, $right, option) { return true; },
			afterMoveOneToRight: function($left, $right, option){},
			beforeMoveAllToRight: function($left, $right, options){ return true; },
			afterMoveAllToRight: function($left, $right, options){},
			beforeMoveOneToLeft: function($left, $right, option){ return true; },
			afterMoveOneToLeft: function($left, $right, option){},
			beforeMoveAllToLeft: function($left, $right, options){ return true; },
			afterMoveAllToLeft: function($left, $right, options){},
			sort: function(a, b) {
				if (a.innerHTML == 'NA') {
					return 1;   
				} else if (b.innerHTML == 'NA') {
					return -1;   
				}
				
				return (a.innerHTML > b.innerHTML) ? 1 : -1;
			}
		},
		setup: {}
	}
    
    $.fn.multiselect = function( options ) {        
        return this.each(function() {	
			var $this = $(this),
				data = $this.data();
			
			var settings = $.extend({}, $.multiselect.defaults, $.multiselect.setup, data, options);
			
            return new Multiselect($(this), settings);
        });  
    };
 }));