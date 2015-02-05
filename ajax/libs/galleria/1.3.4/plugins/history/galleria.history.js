/**
 * Galleria History Plugin 2012-04-04
 * http://galleria.io
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */

(function( $, window ) {

/*global jQuery, Galleria, window */

Galleria.requires(1.25, 'The History Plugin requires Galleria version 1.2.5 or later.');

Galleria.History = (function() {

    var onloads = [],

        init = false,

        loc = window.location,

        doc = window.document,

        ie = Galleria.IE,

        support = 'onhashchange' in window && ( doc.mode === undefined || doc.mode > 7 ),

        iframe,

        get = function( winloc ) {
            if( iframe && !support && Galleria.IE ) {
                winloc = winloc || iframe.location;
            }  else {
                winloc = loc;
            }
            return parseInt( winloc.hash.substr(2), 10 );
        },

        saved = get( loc ),

        callbacks = [],

        onchange = function() {
            $.each( callbacks, function( i, fn ) {
                fn.call( window, get() );
            });
        },

        ready = function() {
            $.each( onloads, function(i, fn) {
                fn();
            });

            init = true;
        },

        setHash = function( val ) {
            return '/' + val;
        };

    // always remove support if IE < 8
    if ( support && ie < 8 ) {
        support = false;
    }

    if ( !support ) {

        $(function() {

            var interval = window.setInterval(function() {

                var hash = get();

                if ( !isNaN( hash ) && hash != saved ) {
                    saved = hash;
                    loc.hash = setHash( hash );
                    onchange();
                }

            }, 50);

            if ( ie ) {

                $('<iframe tabindex="-1" title="empty">').hide().attr( 'src', 'about:blank' ).one('load', function() {

                    iframe = this.contentWindow;

                    ready();

                }).insertAfter(doc.body);

            } else {
                ready();
            }
        });
    } else {
        ready();
    }

    return {

        change: function( fn ) {

            callbacks.push( fn );

            if( support ) {
                window.onhashchange = onchange;
            }
        },

        set: function( val ) {

            if ( isNaN( val ) ) {
                return;
            }

            if ( !support && ie ) {

                this.ready(function() {

                    var idoc = iframe.document;
                    idoc.open();
                    idoc.close();

                    iframe.location.hash = setHash( val );

                });
            }

            loc.hash = setHash( val );
        },

        ready: function(fn) {
            if (!init) {
                onloads.push(fn);
            } else {
                fn();
            }
        }
    };
}());

}( jQuery, this ));

