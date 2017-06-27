/*!
	fancyInput v1
	(c) 2013 Yair Even Or <http://dropthebit.com>
	
	MIT-style license.
*/

(function($){
	"use strict";
	
	$.fn.fancyInput = function(){
		init( this );
		return this;
	}
	
	var fancyInput = {
		classToggler : 'state1',

		keypress : function(e){
			var charString = String.fromCharCode(e.charCode),
				textCont = this.nextElementSibling,
				appendIndex = this.selectionEnd;
				
			if( (this.selectionEnd - this.selectionStart) > 0 && e.charCode && !e.ctrlKey ){
				var rangeToDel = [this.selectionStart, this.selectionEnd];
				appendIndex = this.selectionStart;
				
				if( charDir.lastDir == 'rtl' ){ // BIDI support
					rangeToDel = [this.value.length - this.selectionEnd, this.value.length - this.selectionStart + 1];
					//appendIndex = this.value.length;
				}

				fancyInput.removeChars(textCont, rangeToDel);
			}

			if( e.charCode && !e.ctrlKey ){
				var dir = charDir.check(charString); // BIDI support
				if( dir == 'rtl' || (dir == '' && charDir.lastDir == 'rtl' ) )
					appendIndex = this.value.length - this.selectionStart;
				fancyInput.writer(charString, this, appendIndex);
			}
		},

		writer : function(charString, input, appendIndex){
			var s = charString,
				chars = $(input.nextElementSibling).find('span');

			if( s == ' ' ) // space
				s = '&nbsp;';

			var newCharElm = document.createElement('span');
			newCharElm.innerHTML = s;
			this.classToggler = this.classToggler == 'state2' ? 'state1' : 'state2';
			newCharElm.className = this.classToggler;
			
			if( chars.length ){
				if( appendIndex == 0 ) 
					$(input.nextElementSibling).prepend(newCharElm);
				else
					chars.eq(--appendIndex).after(newCharElm);
			}
			else
				input.nextElementSibling.appendChild(newCharElm);

			setTimeout(function(){
				newCharElm.removeAttribute("class");
			},20);
		},

		clear : function(textCont){
			var caret = $(textCont.parentNode).find('.caret')[0];
			textCont.parentNode.appendChild( caret );
			textCont.innerHTML = '';
		},
		
		fillText : function(text, input){
			var charsCont = input.nextElementSibling, 
				newCharElm,
				frag = document.createDocumentFragment();

			fancyInput.clear( input.nextElementSibling );

			setTimeout( function(){
				var length = text.length;
				for( var i=0; i < length; i++ ){
					//fancyInput.writer( text[i], input, i);
					newCharElm = document.createElement('span');
					newCharElm.innerHTML = (text[i] == ' ') ? '&nbsp;' : text[i];
					frag.appendChild(newCharElm);
				}
				charsCont.appendChild(frag);
			},0);
		},
		
		removeChars : function(el, range){
			var chars = $(el).find('span');
			if( range[0] == range[1] )
				range[0]--;
			chars.slice(range[0], range[1]).remove();
		},
		
		keydown : function(e){
			var charString = String.fromCharCode(e.charCode),
				textCont = this.nextElementSibling,
				appendIndex = this.selectionEnd,
				undo = e.ctrlKey && e.keyCode == 90,
				selectAll = e.ctrlKey && e.keyCode == 65;
				
			fancyInput.setCarrot(this);

			if( selectAll )
				return true;

			if( undo ){
				// give the undo time actually remove the text from the DOM
				setTimeout( function(){
					fancyInput.fillText(e.target.value, e.target);
				}, 50);
				return true;
			}
			// if a key was pressed while ALL the text was selected..delete everything
			if( (this.selectionEnd - this.selectionStart) == this.value.length && this.value.length )
				fancyInput.clear(textCont);
				
			if( e.keyCode == 8 ){
				var rangeToDel = [this.selectionStart, this.selectionEnd];

				if( charDir.lastDir == 'rtl' ) // BIDI support
					rangeToDel = [this.value.length - this.selectionEnd, this.value.length - this.selectionStart + 1];

				fancyInput.removeChars(textCont, rangeToDel);
			}

			return true;
		},
		
		allEvents : function(e){
			fancyInput.setCarrot(this);

			if( e.type == 'paste' ){
				setTimeout(function(){
					fancyInput.fillText(e.target.value, e.target);
				},100);
			}
			if( e.type == 'cut' ){
				fancyInput.removeChars(this.nextElementSibling, [this.selectionStart, this.selectionEnd]);
			}
			
			if( e.type == 'select' ){
				console.log(1);
			}
		},
		
		setCarrot : function(input){
			var caret = $(input.parentNode).find('.caret'),
				pos = fancyInput.getCaretPosition(input);
				
				if( charDir.lastDir == 'rtl' ) // BIDI support
					pos = input.value.length - pos;

			var	insertPos = $(input.nextElementSibling).find('span').eq(pos);
				
			if(pos == input.value.length )
				caret.insertAfter(input.nextElementSibling);
			else
				caret.insertBefore( insertPos );
		},
		
		getCaretPosition : function(input){
			var caretPos, direction = getSelectionDirection.direction || 'right';
			if( input.selectionStart || input.selectionStart == '0' )
				caretPos = direction == 'left' ? input.selectionStart : input.selectionEnd;

			return caretPos || 0;
		}
	},

	getSelectionDirection = {
		direction : null,
		lastOffset : null,
		set : function(e){
			var d;
			if( e.shiftKey && e.keyCode == 37 )
				d = 'left';
			else if( e.shiftKey && e.keyCode == 39 )
				d = 'right';
			if( e.type == 'mousedown' )
				getSelectionDirection.lastOffset = e.clientX;
			else if( e.type == 'mouseup' )
				d = e.clientX < getSelectionDirection.lastOffset ? 'left' : 'right';
				
			getSelectionDirection.direction = d;
		}
	}, 

	charDir = {
		lastDir : null,
		check : function(s){
			var ltrChars        = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
				rtlChars        = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
				ltrDirCheck     = new RegExp('^[^'+rtlChars+']*['+ltrChars+']'),
				rtlDirCheck     = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');

			var dir = rtlDirCheck.test(s) ? 'rtl' : (ltrDirCheck.test(s) ? 'ltr' : '');
			if( dir ) this.lastDir = dir;
			return dir;
		}
	}

	function init(inputs){
		var selector = inputs.selector;

		inputs.each(function(){
			// add need DOM for the plugin to work
			$(this).after('<div></div>', '<b class="caret"></b>');
			// populate the fake field if there was any text in the real input
			fancyInput.fillText(this.value, this);
		});
		
		// bind all the events to simulate an input type text (yes, alot)
		$(document)
			.on('keypress.fi', selector, fancyInput.keypress)
			.on('keyup.fi select.fi mouseup.fi cut.fi paste.fi',selector, fancyInput.allEvents)
			.on('mousedown.fi mouseup.fi keydown.fi',selector , getSelectionDirection.set)
			.on('keydown.fi', selector , fancyInput.keydown);
			
	}

	window.fancyInput = fancyInput;
})(jQuery);