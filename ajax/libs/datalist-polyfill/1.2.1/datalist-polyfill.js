/*
* datalist-polyfill.js - https://github.com/mfranzke/datalist-polyfill
* @license Copyright(c) 2017 by Maximilian Franzke
* Supported by Christian and Johannes - many thanks for that !
*//*
* A lightweight and library dependency free vanilla JavaScript datalist polyfill.
* Tests for native support of an inputs elements datalist functionality.
* Elsewhere the functionality gets emulated by a select element.
*/

( function() {
	'use strict';

	// feature detection
	var nativedatalist = !!( 'list' in document.createElement( 'input' ) ) && 
		!!( document.createElement( 'datalist' ) && window.HTMLDataListElement );

	// in case of that the feature doesn't exist, emulate it's functionality
	if ( !nativedatalist ) {
		
		// emulate the two properties regarding the datalist and input elements
		// list property / https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement
		( function( constructor ) {
		    if ( constructor &&
		         constructor.prototype &&
		         constructor.prototype.list === undefined ) {
			         Object.defineProperty( constructor.prototype, 'list', {
			            get: function() {
				            if ( typeof( this ) === 'object' && this instanceof constructor ) {
				            	var list = this.getAttribute( 'list' );
						
								return document.getElementById( list );
							}
							return null;
			            }
			        });
			    }
			})( window.HTMLInputElement );
		// options property / https://developer.mozilla.org/en/docs/Web/API/HTMLDataListElement
		( function( constructor ) {
		    if ( constructor &&
		         constructor.prototype &&
		         constructor.prototype.options === undefined ) {
			         Object.defineProperty( constructor.prototype, 'options', {
			            get: function() {
				            if ( typeof( this ) === 'object' && this instanceof constructor ) {
				            	return this.getElementsByTagName( 'option' );
							}
			            }
			        });
			    }
			})( window.HTMLElement );
		
		// function regarding the inputs interactions
		var inputInputList = function( event ) {

			var $eventTarget = event.target,
				eventTargetTagName = $eventTarget.tagName;

			// check for whether the events target was an input datalist
			if ( eventTargetTagName && eventTargetTagName.toLowerCase() === 'input' && $eventTarget.getAttribute('list') ) {

				var list = $eventTarget.getAttribute( 'list' ),
					$dataList = document.getElementById( list );

				// still check for an existing instance
				if ( $dataList !== null ) {

					var $dataListSelect = $dataList.getElementsByTagName('select')[0];

					// still check for an existing instance
					if ( $dataListSelect !== undefined ) {

						// on an ESC key press within the input, let's break here and hide the select
						if ( event.keyCode === 27 ) {
							$dataListSelect.classList.remove( 'visible' );
							$dataListSelect.setAttribute( 'aria-hidden', true );

							return;
						}

						var $dataListOptions = $dataList.querySelectorAll( 'option[value]' ),
							inputValue = $eventTarget.value,
							newSelectValues = document.createDocumentFragment(),
							disabledValues = document.createDocumentFragment(),
							visible = false;

						// if the input contains a value, than ...
						if ( inputValue !== '' ) {

							// ... create an array out of the options list
							var nodeArray = Array.prototype.slice.call( $dataListOptions );

							// ... sort all entries and
							nodeArray.sort( function( a, b ) {
							    return a.value.localeCompare( b.value );
							}).forEach( function( opt ) {
								var optionValue = opt.value;

								// ... put this option into the fragment that is meant to get inserted into the select
								// "Each option element that is a descendant of the datalist element, that is not disabled, and whose value is a string that isn't the empty string, represents a suggestion. Each suggestion has a value and a label." (W3C)
							    if ( optionValue !== '' && optionValue.toLowerCase().indexOf( inputValue.toLowerCase() ) !== -1 && opt.disabled === false ) {
								    opt.innerText = optionValue;
								    
								    newSelectValues.appendChild( opt );

								    // ... and set the state of the select to get displayed in that case
								    visible = true;
								} else {
									// ... or put this option that isn't relevant to the users into the fragment that is supposed to get inserted outside of the select
									disabledValues.appendChild( opt );
								}
							});

							// input the options fragment into the datalists select
							$dataListSelect.appendChild( newSelectValues );
							
							// preselect best fitting index
							$dataListSelect.selectedIndex = 0;

							// input the unused options as siblings next to the select
							$dataList.appendChild( disabledValues );
						}

						// toggle the visibility of the select according to previous checks
						$dataListSelect.classList.toggle( 'visible', visible );
						$dataListSelect.setAttribute( 'aria-hidden', !visible );

						// on arrow up or down keys, focus the select
						if ( event.keyCode === 38 || event.keyCode === 40 ) {

							$dataListSelect.focus();
						}
					}
				}
			}
		};

		// focus or blur events
		var changesInputList = function( event ) {

			var $eventTarget = event.target,
				eventTargetTagName = $eventTarget.tagName;

			// check for whether the events target was an input datalist
			if ( eventTargetTagName && eventTargetTagName.toLowerCase() === 'input' && $eventTarget.getAttribute('list') ) {

				var eventType = event.type,
					list = $eventTarget.getAttribute( 'list' ),
					$dataList = document.getElementById( list );

				// still check for an existing instance
				if ( $dataList !== null ) {

					var $dataListSelect = $dataList.getElementsByTagName('select')[0],
						// either have the select set to the state to get displayed in case of that it would have been focused or because it's the target on the inputs blur
						visible = ( ( eventType === 'focus' && event.target.value !== '' ) || ( event.relatedTarget && event.relatedTarget === $dataListSelect ) ),
						message = $dataList.title;

					// creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
					if ( $dataListSelect === undefined ) {
						var rects = $eventTarget.getClientRects(),
							$message = document.createElement('option');

						$dataListSelect = document.createElement( 'select' );
						
						// WAI ARIA attributes
						$dataListSelect.setAttribute( 'aria-hidden', true );
						$dataListSelect.setAttribute( 'aria-live', 'polite' );
						$dataListSelect.setAttribute( 'role', 'listbox' );

						// the select should get positioned underneath the input field ...
						$dataListSelect.style.marginLeft = '-' + rects[0].width + 'px';
						$dataListSelect.style.marginTop = rects[0].height + 'px';
						$dataListSelect.style.minWidth = rects[0].width + 'px';

						// ... and it's first entry should contain the localized message to select an entry
						$message.innerText = message;
						// ... and disable this option, as it shouldn't get selected by the user
						$message.disabled = true;
						// ... and finally insert it into the select
						$dataListSelect.appendChild( $message );

						// add select to datalist element ...
						$dataList.appendChild( $dataListSelect );

						// ... and our upfollowing function to the change event
						$dataListSelect.addEventListener( 'change', changeDataListSelect );
						$dataListSelect.addEventListener( 'blur', changeDataListSelect );
						$dataListSelect.addEventListener( 'keyup', changeDataListSelect );


						// plus we'd like to prevent autocomplete on the input datalist field
						$eventTarget.setAttribute( 'autocomplete', 'off' );
						
						// WAI ARIA attributes
						$eventTarget.setAttribute( 'role', 'textbox' );
						$eventTarget.setAttribute( 'aria-haspopup', 'true' );
						$eventTarget.setAttribute( 'aria-autocomplete', 'list' );
						$eventTarget.setAttribute( 'aria-owns', list );
					}

					// toggle the visibility of the select according to previous checks
					$dataListSelect.classList.toggle( 'visible', visible );
					$dataListSelect.setAttribute( 'aria-hidden', !visible );
					
					// bind the keyup event on the related dalalists input
					switch( eventType ) {
						case 'focus':
							$eventTarget.addEventListener( 'keyup', inputInputList );
							
							$eventTarget.addEventListener( 'blur', changesInputList, true );
						break;
						case 'blur':
							$eventTarget.removeEventListener( 'keyup', inputInputList );
							
							$eventTarget.removeEventListener( 'blur', changesInputList, true );
						break;
					}
				}
			}
		};

		// function regarding changes to the datalist polyfilling created select
		var changeDataListSelect = function( event ) {

			var $eventTarget = event.target,
				eventTargetTagName = $eventTarget.tagName,
				message = $eventTarget.parentNode.title;

			// check for whether the events target was a select
			if ( eventTargetTagName && eventTargetTagName.toLowerCase() === 'select' ) {

				var eventType = event.type,
					// ENTER and ESC keys
					visible = ( eventType === 'keyup' && ( event.keyCode !== 13 && event.keyCode !== 27 ) );
				
				// change event or enter key
				if ( eventType === 'change' || ( eventType === 'keyup' && event.keyCode === 13 ) ) {

					var list = $eventTarget.parentNode.id,
						$inputList = document.querySelector('input[list="' + list + '"]'),
						eventTargetValue = $eventTarget.value;

					// input the selects value into the input on a change within the list
					if ( $inputList !== null && eventTargetValue.length > 0 && eventTargetValue !== message ) {
						$inputList.value = eventTargetValue;
					}
				}

				// toggle the visibility of the select according to previous checks
				$eventTarget.classList.toggle( 'visible', visible );
				$eventTarget.setAttribute( 'aria-hidden', !visible );
			}
		};

		// binding the focus event - matching the input[list]s happens in the function afterwards
		document.addEventListener( 'focus', changesInputList, true );


	}
})();