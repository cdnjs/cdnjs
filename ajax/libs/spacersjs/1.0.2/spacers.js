function spacers( options ) {

    let document = options.containedArea ? options.containedArea : window.document;
    let elements = document.querySelectorAll( options.element );
    let defaultSpacing = options.defaultSpacing ? options.defaultSpacing : '8';
    let spacingUnit = options.spacingUnit ? options.spacingUnit : "px";
    let enablePadding = options.padding == undefined || options.padding == true ? true : false;
    let showOnHover = options.showOnHover ? ' on-hover' : '';
    let enableMargin = options.margin ? true : false;
    let html, appendHtml;
    let margin, padding;
    let spacingProperties = [];
    enableMargin ? spacingProperties.push( 'margin' ) : '';
    enablePadding ? spacingProperties.push( 'padding' ) : '';
    let spacingDimensions = [ 'top', 'right', 'bottom', 'left' ];
    let hideSpacingValue = options.hideSpacingValue == true ? true : false;
    let showLabel = options.showLabel ? options.showLabel : '';

    margin = {
        top: options.defaultMargin ? options.defaultMargin.top : '',
        left: options.defaultMargin ? options.defaultMargin.left : '',
        bottom: options.defaultMargin ? options.defaultMargin.bottom : '',
        right: options.defaultMargin ? options.defaultMargin.right : ''
    };

    padding = {
        top: options.defaultPadding ? options.defaultPadding.top : '',
        left: options.defaultPadding ? options.defaultPadding.left : '',
        bottom: options.defaultPadding ? options.defaultPadding.bottom : '',
        right: options.defaultPadding ? options.defaultPadding.right : ''
    };

    // Location to append spacers
    switch( options.appendHtml ) {
        case 'begin': appendHtml = "afterbegin";
        break;
        case 'end' : appendHtml = "beforeend";
        break;
        default: appendHtml = 'afterbegin';
    }

    elements.forEach( (element) => {

        let spacerId = Array(6).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');

        element.classList.add( 'spacer-initialised' );

        // settings element's position relative
        element.style.position = "relative";

        let spacerSize, spacerDivs = '';
        let lockIcon = options.lockIcon ? options.lockIcon : '<span class="icon"></span>';
        let unlockIcon = options.unlockIcon ? options.unlockIcon : '<span class="icon"></span>';
        let spacerLock = options.enableLock ? '<span class="spacer-lock unlocked">' + unlockIcon + '</span>' : '';

        spacingProperties.forEach( property => {
            switch( property ) {
                case 'padding':
                    spacingDimensions.forEach( dim => {

                        spacerSize = ( padding[dim] == "" ? defaultSpacing : padding[dim] );

                        spacerDivs += '<div data-size="'+ spacerSize +'" data-type="'+ property +'" data-id="'+ spacerId +'" class="spacer spacer-' + spacerId + ' spacer-'+ dim +'" data-dragging="'+ getOppositeDimension(dim) +'" data-position="'+ dim +'"> <span class="spacer-indicator"> <span class="'+ ( hideSpacingValue ? 'display-none ' : '' ) +'spacer-size">'+ (spacerSize == '' ? '0' : spacerSize) +'</span>'+ showLabel + spacerLock + '</span> </div>';

                    });
                break;

                case 'margin':
                    spacingDimensions.forEach( dim => {

                        spacerSize = ( margin[dim] == "0" ? defaultSpacing : margin[dim] );

                        spacerDivs += '<div data-size="'+ spacerSize +'" data-type="'+ property +'" data-id="'+ spacerId +'" class="spacer spacer-' + spacerId + ' spacer-'+ dim +'" data-dragging="'+ getOppositeDimension(dim) +'" data-position="'+ dim +'"> <span class="spacer-indicator"> <span class="'+ ( hideSpacingValue ? 'display-none ' : '' ) +'spacer-size">'+ (spacerSize == '' ? '0' : spacerSize) +'</span>'+ showLabel + spacerLock + '</span> </div>';

                    });
                break;
            }
        });

        html = '<div class="spacer-wrapper' + showOnHover + '">' + spacerDivs + '</div>';

        element.insertAdjacentHTML( appendHtml, html );

        let spacers = Object.values( document.getElementsByClassName( 'spacer-' + spacerId ) );

        // Adding spacer functionality
        let startX, startY, startWidth, startHeight, position, dragSide;

        spacers.forEach(spacer => {
            
            // Adding default spacing
            document.documentElement.style.setProperty( '--spacer-size', defaultSpacing + spacingUnit );

            // Addding custom-defined classes
            if ( options.spacerClass ) {
                spacer.classList.add( ...options.spacerClass.split(' ') );
            }

            // Adding default spacing
            spacerValue = ( spacer.getAttribute('data-size') ? spacer.getAttribute('data-size') : defaultSpacing ) + spacingUnit;
            spacerPosition = spacer.getAttribute('data-position');

            if( spacerPosition == "top" || spacerPosition == "bottom" ) {
                spacer.style.height = spacerValue;
            }
            if( spacerPosition == "left" || spacerPosition == "right" ) {
                spacer.style.width = spacerValue;
            }

            spacer.addEventListener('mousedown', ( event ) => {
                // Starting height and width
                startHeight = spacer.offsetHeight;
                startWidth = spacer.offsetWidth;

                initDrag( event, spacer );
            });
        });

        function initDrag( event, spacer ) {
                    
            position = spacer.getAttribute( 'data-position' );
            dragSide = spacer.getAttribute( 'data-dragging' );

            startX = event.clientX;
            startY = event.clientY;

            currentSpacer = spacer;
            spacerType = currentSpacer.getAttribute("data-type");
            
            document.documentElement.addEventListener( 'mousemove', doDrag, false );
            document.documentElement.addEventListener( 'mouseup', stopDrag, false );
        }

        function doDrag( e ) {
            
            let spacingValue;
            if( position == 'top' || position == 'bottom' ) {
                spacingValue = (startHeight + e.clientY - startY);
            }

            if( position == 'left' || position == 'right' ) {
                spacingValue = ( dragSide == 'left' ? (startWidth - e.clientX + startX) : (startWidth + e.clientX - startX) );
            }

            // Setting Margin/Padding value
            setPropertyValue( spacerType, position, spacingValue );

            // updating data-size attribute and size value
            currentSpacer.setAttribute( 'data-size', spacingValue );
            currentSpacer.querySelector('.spacer-indicator .spacer-size').innerText = spacingValue;

            spacingValue += spacingUnit;

            // Checking for locked spacers
            if( currentSpacer.classList.contains('spacer-locked') ) {
                getOppositeSpacer( element, currentSpacer, spacingValue );
            }

            // Applying padding/margin
            oppositeProperty = spacerType + position.charAt(0).toUpperCase() + position.substring(1);
            if ( position == 'top' || position == 'bottom' ) {
                currentSpacer.style.height = spacingValue;
                element.style[oppositeProperty] = spacingValue;
            } else {
                currentSpacer.style.width = spacingValue;
                element.style[oppositeProperty] = spacingValue;
            }
        }

        function stopDrag( e ) {
            document.documentElement.removeEventListener( 'mousemove', doDrag, false );
            document.documentElement.removeEventListener( 'mouseup', stopDrag, false );

            // disabling active spacers
            if( document.querySelector( '.spacer-active' ) ) {
                document.querySelector( '.spacer-active' ).classList.remove( 'spacer-active' );
            }

            // Formatting data
            let  data = {};

            if( enablePadding ) {
                Object.assign( data, { 'padding': padding });
            }

            if( enableMargin ) {
                Object.assign( data, { 'margin': margin });
            }

            if( options.onDragEnd ) {
                options.onDragEnd(data);
            }
            
        }

        function getOppositeDimension( dimension ) {
            switch( dimension ) {
                case 'top': return 'bottom';
                case 'bottom': return 'top';
                case 'left': return 'right';
                case 'right': return 'left';
            }
        }

        function setPropertyValue( spacerType, position, spacingValue ) {
            // setting padding
            if ( spacerType == "padding" ) {
                padding[position] = spacingValue;
            }
            
            // setting margin
            if ( spacerType == "margin" ) {
                margin[position] = spacingValue;
            }
        }

        function getOppositeSpacer( element, spacer, spacerValue ) {

            let oppositeSpacerDim = getOppositeDimension( spacer.getAttribute( 'data-position' ) );
            let oppositeSpacerType = spacer.getAttribute( 'data-type' );
            let oppositeSpacerID = spacer.getAttribute( 'data-id' );
            let oppositeSpacer = document.querySelector( '.spacer-' + oppositeSpacerID + '[data-type="'+ oppositeSpacerType +'"][data-position="'+ oppositeSpacerDim +'"]' );

            // Adding active class
            oppositeSpacer.classList.add( 'spacer-active' );
            
            oppositeSpacer.setAttribute( 'data-size', parseInt( spacerValue, 10 ).toString() );
            oppositeSpacer.querySelector( '.spacer-indicator .spacer-size' ).innerText = parseInt( spacerValue, 10 ).toString();

            if( oppositeSpacerDim == 'top' || oppositeSpacerDim == 'bottom' ) {
                oppositeSpacer.style.height = spacerValue;
            }
            if( oppositeSpacerDim == 'left' || oppositeSpacerDim == 'right' ) {
                oppositeSpacer.style.width = spacerValue;
            }

            // Applying pseudo padding/margin for opposite spacer
            setPropertyValue( oppositeSpacerType, oppositeSpacerDim, parseInt( spacerValue, 10 ) );
            let oppositeProperty = oppositeSpacerType + oppositeSpacerDim.charAt(0).toUpperCase() + oppositeSpacerDim.substring(1);
            element.style[oppositeProperty] = spacerValue;
        }

        function stringToHtml( html ) {
            let temp = document.createElement( 'template' );
            html = html.trim(); // Never return a space text node as a result
            temp.innerHTML = html;
            return temp.content.firstChild;
        }

        // Click event on spacer lock
        let spacerLocks = document.querySelectorAll( '.spacer-lock' );

        spacerLocks.forEach( ( lock ) => {

            if( lock.classList.contains( 'lock-active' ) ) {
                return;
            }
        
            lock.classList.add( 'lock-active' );
            
            lock.addEventListener( 'mousedown', function() {
        
                let currentState = lock.classList;
                
                if ( currentState.contains( 'unlocked' ) ) {
                    // adding lock class
                    lock.closest( '.spacer' ).classList.add( 'spacer-locked' );
                    // swapping lock icon
                    lock.replaceChild( stringToHtml( lockIcon ), lock.childNodes[0] );
                    // Updating icon property
                    currentState.remove( 'unlocked' );
                    currentState.add( 'locked' );
                } else {
                    // adding lock class
                    lock.closest( '.spacer' ).classList.remove( 'spacer-locked' );
                    // swapping lock icon
                    lock.replaceChild( stringToHtml( unlockIcon ), lock.childNodes[0] );
                    // Updating icon property
                    currentState.remove( 'locked' );
                    currentState.add( 'unlocked' );
                }
        
            });
        });

    });

}