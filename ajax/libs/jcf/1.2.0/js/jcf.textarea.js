/*!
 * JavaScript Custom Forms : Textarea Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.0
 */
jcf.addModule(function($) {
	'use strict';

	return {
		name: 'Textarea',
		selector: 'textarea',
		options: {
			resize: true,
			resizerStructure: '<span class="jcf-resize"></span>',
			fakeStructure: '<span class="jcf-textarea"></span>'
		},
		matchElement: function(element) {
			return element.is('textarea');
		},
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function() {
			// prepare structure
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.resizer = $(this.options.resizerStructure).appendTo(this.fakeElement);

			// add custom scrollbar
			if (jcf.modules.Scrollable) {
				this.realElement.prependTo(this.fakeElement).addClass().css({
					overflow: 'hidden',
					resize: 'none'
				});

				this.scrollable = new jcf.modules.Scrollable({
					element: this.realElement,
					alwaysShowScrollbars: true
				});
				this.scrollable.setScrollBarEdge(this.resizer.outerHeight());
			}
		},
		attachEvents: function() {
			// add event handlers
			this.realElement.on({
				focus: this.onFocus,
				keyup: this.onChange,
				change: this.onChange
			});

			this.resizer.on('jcf-pointerdown', this.onResizePress);
		},
		onResizePress: function(e) {
			var resizerOffset = this.resizer.offset(),
				areaOffset = this.fakeElement.offset();

			e.preventDefault();
			this.dragData = {
				areaOffset: areaOffset,
				innerOffsetLeft: e.pageX - resizerOffset.left,
				innerOffsetTop: e.pageY - resizerOffset.top
			};
			this.doc.on({
				'jcf-pointermove': this.onResizeMove,
				'jcf-pointerup': this.onResizeRelease
			});

			// restore focus
			if (this.isFocused) {
				this.focusedDrag = true;
				this.realElement.focus();
			}
		},
		onResizeMove: function(e) {
			var newWidth = e.pageX + this.dragData.innerOffsetLeft - this.dragData.areaOffset.left,
				newHeight = e.pageY + this.dragData.innerOffsetTop - this.dragData.areaOffset.top,
				widthDiff = this.fakeElement.innerWidth() - this.realElement.innerWidth();

			// prevent text selection or page scroll on touch devices
			e.preventDefault();

			// resize textarea and refresh scrollbars
			this.realElement.innerWidth(newWidth - widthDiff).innerHeight(newHeight);

			if (this.scrollable) {
				this.scrollable.rebuildScrollbars();
			}

			// restore focus
			if (this.focusedDrag) {
				this.realElement.focus();
			}
		},
		onResizeRelease: function() {
			this.doc.off({
				'jcf-pointermove': this.onResizeMove,
				'jcf-pointerup': this.onResizeRelease
			});

			delete this.focusedDrag;
		},
		onFocus: function() {
			this.isFocused = true;
			this.fakeElement.addClass(this.options.focusClass);
			this.realElement.on('blur', this.onBlur);
		},
		onBlur: function() {
			this.isFocused = false;
			this.fakeElement.removeClass(this.options.focusClass);
			this.realElement.off('blur', this.onBlur);
		},
		onChange: function() {
			this.refreshCustomScrollbars();
		},
		refreshCustomScrollbars: function() {
			if (this.scrollable) {
				if (this.isFocused) {
					this.scrollable.redrawScrollbars();
				} else {
					this.scrollable.rebuildScrollbars();
				}
			}
		},
		refresh: function() {
			// refresh custom scroll position
			var isDisabled = this.realElement.is(':disabled');
			this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);
			this.refreshCustomScrollbars();
		},
		destroy: function() {
			// destroy custom scrollbar
			this.scrollable.destroy();

			// restore styles and remove event listeners
			this.realElement.css({
				overflow: '',
				resize: ''
			}).insertBefore(this.fakeElement).off({
				focus: this.onFocus,
				blur: this.onBlur
			});

			// remove scrollbar and fake wrapper
			this.fakeElement.remove();
		}
	};
});
