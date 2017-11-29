/**
 * multi.js
 * A user-friendly replacement for select boxes with multiple attribute enabled.
 *
 * Author: Fabian Lindfors
 * License: MIT
 */
var multi = (function() {

    // Helper function to trigger an event on an element
    var trigger_event = function( type, el ) {
        var e = document.createEvent( 'HTMLEvents' );
        e.initEvent( type, false, true );
        el.dispatchEvent( e );
    };

    // Toggles the target option on the select
    var toggle_option = function ( select, event ) {
        var option = select.options[ event.target.getAttribute( 'multi-index' ) ];

        if ( option.disabled ) {
          return;
        }

        option.selected = !option.selected;
        trigger_event( 'change', select );
    };

    // Refreshes an already constructed multi.js instance
    var refresh_select = function( select, settings ) {

        // Clear columns
        select.wrapper.selected.innerHTML = '';
        select.wrapper.non_selected.innerHTML = '';

        // Get search value
        if ( select.wrapper.search ) {
            var query = select.wrapper.search.value;
        }

        // Loop over select options and add to the non-selected and selected columns
        for ( var i = 0; i < select.options.length; i++ ) {

            var option = select.options[i];

            var value = option.value;
            var label = option.textContent || option.innerText;

            var row = document.createElement( 'a' );
            row.tabIndex = 0;
            row.className = 'item';
            row.innerHTML = label;
            row.setAttribute( 'role', 'button' );
            row.setAttribute( 'data-value', value );
            row.setAttribute( 'multi-index', i );

            if ( option.disabled ) {
              row.className += ' disabled';
            }

            // Add row to selected column if option selected
            if ( option.selected ) {

                row.className += ' selected';
                var clone = row.cloneNode( true );
                select.wrapper.selected.appendChild( clone );

            }

            // Apply search filtering
            if ( !query || query && label.toLowerCase().indexOf( query.toLowerCase() ) > -1 ) {
                select.wrapper.non_selected.appendChild( row );
            }

        }

    };


    // Intializes and constructs an multi.js instance
    var init = function( select, settings ) {

        /**
         * Set up settings (optional parameter) and its default values
         *
         * Default values:
         * enable_search : true
         * search_placeholder : 'Search...'
         */
        settings = typeof settings !== 'undefined' ? settings : {};

        settings['enable_search'] = typeof settings['enable_search'] !== 'undefined' ? settings['enable_search'] : true;
        settings['search_placeholder'] = typeof settings['search_placeholder'] !== 'undefined' ? settings['search_placeholder'] : 'Search...';


        // Check if already initalized
        if ( select.dataset.multijs != null ) {
            return;
        }

        // Make sure element is select and multiple is enabled
        if ( select.nodeName != 'SELECT' || ! select.multiple ) {
            return;
        }

        // Hide select
        select.style.display = 'none';
        select.setAttribute( 'data-multijs', true );

        // Start constructing selector
        var wrapper = document.createElement( 'div' );
        wrapper.className = 'multi-wrapper';


        // Add search bar
        if ( settings.enable_search ) {
            var search = document.createElement( 'input' );
            search.className = 'search-input';
            search.type = 'text';
            search.setAttribute( 'placeholder', settings.search_placeholder );

            search.addEventListener( 'input', function() {
                refresh_select( select, settings );
            });

            wrapper.appendChild( search );
            wrapper.search = search;
        }


        // Add columns for selected and non-selected
        var non_selected = document.createElement( 'div' );
        non_selected.className = 'non-selected-wrapper';

        var selected = document.createElement( 'div' );
        selected.className = 'selected-wrapper';


        // Add click handler to toggle the selected status
        wrapper.addEventListener( 'click', function ( event ) {

            if ( event.target.getAttribute( 'multi-index' ) ) {
                toggle_option( select, event );
            }

        });


        // Add keyboard handler to toggle the selected status
        wrapper.addEventListener( 'keypress', function ( event ) {

            var is_action_key = event.keyCode === 32 || event.keyCode === 13;
            var is_option = event.target.getAttribute( 'multi-index' );

            if ( is_option && is_action_key ) {

                // Prevent the default action to stop scrolling when space is pressed
                event.preventDefault();
                toggle_option( select, event );
                
            }

        });


        wrapper.appendChild( non_selected );
        wrapper.appendChild( selected );

        wrapper.non_selected = non_selected;
        wrapper.selected = selected;

        select.wrapper = wrapper;

        // Add multi.js wrapper after select element
        select.parentNode.insertBefore( wrapper, select.nextSibling );


        // Initialize selector with values from select element
        refresh_select( select, settings );

        // Refresh selector when select values change
        select.addEventListener( 'change', function() {
            refresh_select( select, settings );
        });

    };


    return init;

}());


// Add jQuery wrapper if jQuery is present
if ( typeof jQuery !== 'undefined' ) {
    (function($) {

        $.fn.multi = function( settings ) {

            settings = typeof settings !== 'undefined' ? settings : {};

            return this.each( function() {

                var $select = $(this);

                multi( $select.get(0), settings );

            });

        }

    })(jQuery);
}
