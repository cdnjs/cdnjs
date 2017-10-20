/* jQuery Plugin jsPanel
   Version: 1.3.0 2014-03-31 10:11
   Dependencies:
    jQuery library ( > 1.7.0 incl. 2.1.0 )
    jQuery.UI library ( > 1.9.0 ) - (at least UI Core, Draggable, Resizable)
    HTML5 compatible browser

   Copyright (c) 2014 Stefan Sträßer, http://stefanstraesser.eu/
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var jsPanelversion = '1.3.0 2014-03-31 10:11';

(function ( $ ) {

    $.fn.jsPanel = function( config , callback ) {

        // Extend our default config with those provided.
        // Note that the first arg to extend is an empty object -
        // this is to keep from overriding our "defaults" object.
        var option = $.extend(true, {}, $.fn.jsPanel.defaults, config);

        // Counter für die Panels im jeweils verwendeten Container (für top & left)
        var count = $('.jsPanel', this.first() ).length;

        var jsPanel = $('<div class="jsPanel normalized" style="z-index:1000;display:none;">'+
                            '<div class="jsPanel-hdr">'+
                                '<div class="jsPanel-hdr-l"><p class="jsPanel-hdr-l-text"></p></div>'+
                                '<div class="jsPanel-hdr-r">'+
                                    '<div class="jsPanel-hdr-r-btn-close"></div>'+
                                    '<div class="jsPanel-hdr-r-btn-max normal"></div>'+
                                    '<div class="jsPanel-hdr-r-btn-min"></div>'+
                                '</div>'+
                                '<div class="cf"></div>'+
                            '</div>'+
                        '<div class="jsPanel-content"></div>'+
                        '</div>');


        /*
         * PANEL INS DOKUMENT EINFÜGEN, und zwar nur in das erste Element der Kollektion !!
         *
         */
        jsPanel.appendTo( this.first() );


        /*
         * DAS OPTIONS-OBJEKT DER FUNKTION .jsPanel() ABARBEITEN
         *
         */

        /* HEADER (Überschrift) des Panels */
        // wird auf jeden Fall in den defaults gesetzt ...
        $( '.jsPanel-hdr-l-text', jsPanel ).append( option.title );


        /* CONTROLS (buttons in header right) */
        if( option.controls )
        {
            if( option.controls === 'closeonly' )
            {
                $( '.jsPanel-hdr-r-btn-min, .jsPanel-hdr-r-btn-max', jsPanel ).remove();
            }
        }

        /* ATTRIBUT ID DES PANELS */
        if( option.id ){
            // wenn option.id -> string oder function?
            if( typeof option.id === 'string' ){
                // wenn id schon vorhanden
                if( $( '#' + option.id ).length < 1 ){
                    jsPanel.attr( 'id', option.id );
                }
                else
                {
                    // sonst ...
                    // wenn jQuery.fn.uniqueId zur Verfügung steht ...
                    if ( jQuery.isFunction( jQuery.fn.uniqueId ) ) {
                        jsPanel.uniqueId();
                    }
                    else
                    {
                        // sonst ...
                        option.id = function(){
                            return 'jsPanel_' + ( $('.jsPanel').length + 1 )
                        }
                        jsPanel.attr( 'id', option.id );
                    }
                    // neue id in den title schreiben
                    var txt = $('.jsPanel-hdr-l-text', jsPanel).html();
                    $('.jsPanel-hdr-l-text', jsPanel).html( txt + ' AUTOMATIC ID: ' + jsPanel.attr('id') );
                }
            }
            if( $.isFunction( option.id ) )
            {
                jsPanel.attr( 'id', option.id );
            }
        }
        else
        {
            // wenn jQuery.fn.uniqueId zur Verfügung steht ...
            if ( jQuery.isFunction( jQuery.fn.uniqueId ) ) {
                jsPanel.uniqueId();
            }
            else
            {
                // sonst ...
                option.id = function(){
                    return 'jsPanel_' + ( $('.jsPanel').length + 1 )
                }
            }
        }

        /* OVERFLOW DES JSPANEL-CONTENTS  | default: 'scroll' */
        if( typeof option.overflow === 'string' )
        {
            $( '.jsPanel-content', jsPanel ).css( 'overflow', option.overflow );
        }
        else if ( $.isPlainObject( option.overflow ) )
        {
            $( '.jsPanel-content', jsPanel ).css( { 'overflow-y':option.overflow.vertical, 'overflow-x':option.overflow.horizontal } );
        }

        /* bei Bedarf eine zusätzliche TOOLBAR einfügen */
        if( option.toolbarContent )
        {
            $( '.jsPanel-content', jsPanel ).css( { height:'-webkit-calc(100% - 40px)', height: 'calc(100% - 40px' } );
            // Toolbareinfügen
            $( '.jsPanel-hdr', jsPanel ).css( 'height', '38px' ).append( '<div style="color:white;" class="jsPanel-hdr-toolbar"></div>' );
            // Toolbar-Inhalt einfügen, kann HTML-Code, oder ein entsprechendes jquery-Objekt, oder eine Funktion sein, die HTML-Code liefert
            $( '.jsPanel-hdr-toolbar', jsPanel ).append( option.toolbarContent );
        }

        /* CSS DES PANELINHALT-CONTAINERS initialisieren und zuweisen; */
        if( $.isPlainObject( option.contentBG ) )
        {
            $('.jsPanel-content', jsPanel ).css( option.contentBG );
        }
        else if(  typeof option.contentBG === 'string'  )
        {
            $('.jsPanel-content', jsPanel ).css( 'background', option.contentBG );
        }

        /* JQUERY UI DRAGGABLE FEATURE*/
        // default-config für draggable steht in $.fn.jsPanel.defaults.draggable
        if( $.isPlainObject( option.draggable ) )
        {
            option.customdraggable = $.extend( true, {}, $.fn.jsPanel.defaults.draggable, option.draggable );
            jsPanel.draggable( option.customdraggable );
        }
        else
        {
            // cursor zurücksetzen, weil draggable deaktiviert
            $('.jsPanel-hdr-l', jsPanel ).css( 'cursor', 'inherit' );
        }

        /* JQUERY UI RESIZABLE FEATURE */
        // default-config für resizable steht in $.fn.jsPanel.defaults.resizable
        if( $.isPlainObject( option.resizable ) )
        {
            option.customresizable = $.extend( true, {}, $.fn.jsPanel.defaults.resizable, option.resizable );
            jsPanel.resizable( option.customresizable );
        }

        /* JSPANEL AUTOCLOSE | default: false */
        if( typeof option.autoclose == 'number' && option.autoclose > 0 )
        {
            window.setTimeout( function(){
                jsPanel.fadeOut('slow', function(){
                    this.remove();
                });
            }, option.autoclose )
        }

        /* INHALT DES PANELS */
        if( option.content )
        {
            // option.content kann auch eine Funktion (auch IIFE) oder ein jQuery Objekt sein, die den Inhalt zurückliefert
            $( '.jsPanel-content' , jsPanel ).append( option.content );
        }

        if( option.load && $.isPlainObject( option.load ) && option.load.url )
        {
            if( !option.load.data ){
                option.load.data = undefined;
            }
            if( !option.load.complete ){
                var func = $.noop();
            }else{
                func = function( responseText, textStatus, XMLHttpRequest ){
                    option.load.complete( responseText, textStatus, XMLHttpRequest, jsPanel );
                }
            }
            $( '.jsPanel-content' , jsPanel ).empty().load( option.load.url, option.load.data, func );
        }

        if( option.ajax && $.isPlainObject( option.ajax ) )
        {
            $.ajax( option.ajax )
                .done( function( data, textStatus, jqXHR ){
                    $( '.jsPanel-content' , jsPanel ).empty().append( data );
                    if( option.ajax.done && $.isFunction( option.ajax.done ) ){
                        option.ajax.done( data, textStatus, jqXHR, jsPanel );
                    }
                })
                .fail( function( jqXHR, textStatus, errorThrown ){
                    if( option.ajax.fail && $.isFunction( option.ajax.fail ) ){
                        option.ajax.fail( jqXHR, textStatus, errorThrown, jsPanel );
                    }
                })
                .always( function( arg1, textStatus, arg3 ){
                    //In response to a successful request, the function's arguments are the same as those of .done(): data(hier: arg1), textStatus, and the jqXHR object(hier: arg3)
                    //For failed requests the arguments are the same as those of .fail(): the jqXHR object(hier: arg1), textStatus, and errorThrown(hier: arg3)
                    if( option.ajax.always && $.isFunction( option.ajax.always ) ){
                        option.ajax.always( arg1, textStatus, arg3, jsPanel );
                    }
                })
                .then( function( data, textStatus, jqXHR ){
                    if( option.ajax.then && $.isArray( option.ajax.then ) ){
                        if( option.ajax.then[0] && $.isFunction( option.ajax.then[0] ) ){
                            option.ajax.then[0]( data, textStatus, jqXHR, jsPanel );
                        }
                    }
                },
                function( jqXHR, textStatus, errorThrown ){
                    if( option.ajax.then && $.isArray( option.ajax.then ) ){
                        if( option.ajax.then[1] && $.isFunction( option.ajax.then[1] ) ){
                            option.ajax.then[1]( jqXHR, textStatus, errorThrown, jsPanel );
                        }
                    }
                }
            )
        }

        /* option.size | default: { width: 600, height: 370 } */
        if( typeof option.size === 'string' && option.size == 'auto' )
        {
            option.size = { width: 'auto', height: 'auto' }
        }
        if( $.isPlainObject( option.size  ) )
        {
            /* CSS WIDTH initialisieren und zuweisen wenn option.size kein string ist */
            if( option.size.width != 'auto' ){
                if( parseInt( option.size.width ) > 149 )
                {
                    option.size.width = parseInt( option.size.width ) + 'px';
                }
                else if( $.isFunction( option.size.width ) )
                {
                    var w = parseInt( option.size.width( jsPanel ) );
                    console.log( w );
                    if( w > 149 )
                    {
                        option.size.width = w + 'px';
                    }
                    else
                    {
                        option.size.width = $.fn.jsPanel.defaults.size.width;
                    }
                }
                else
                {
                    option.size.width = $.fn.jsPanel.defaults.size.width;
                }
            }
            /* CSS HEIGHT initialisieren und zuweisen wenn option.height kein string ist */
            if( option.size.height != 'auto' ){
                if( parseInt( option.size.height ) > 92 )
                {
                    option.size.height = parseInt( option.size.height ) + 'px';
                }
                else if( $.isFunction( option.size.height ) )
                {
                    var h = parseInt( option.size.height( jsPanel ) );
                    if( h > 92 )
                    {
                        option.size.height = h + 'px';
                    }
                    else
                    {
                        option.size.height = $.fn.jsPanel.defaults.size.height;
                    }
                }
                else
                {
                    option.size.height = $.fn.jsPanel.defaults.size.height;
                }
            }
        }

        /* css width & height des jsPanels setzen (ist hier erforderlich wenn manuell width & height gesetzt wurde) */
        jsPanel.css( { width: option.size.width, height: option.size.height } );

        /* der folgende code block ermöglicht 'center' für top & left auch dann, wenn width und/oder height 'auto' sind */
        option.size.width = $( jsPanel ).outerWidth();
        option.size.height = $( jsPanel ).innerHeight();
        // css width & height des jsPanels neu setzen, bevor top und left berechnet wird ( es müssen numerische Werte sein)
        //jsPanel.css( { width: option.size.width, height: option.size.height } );

        /* option.position | default: 'auto' */
        if( typeof option.position === 'string' )
        {
            if( option.position == 'center' ){
                option.position = { top: 'center', left: 'center' };
                //jsPanel.css( { top: option.position.top, left: option.position.left, 'z-index': set_zi() } );
            }
            else if( option.position == 'auto' ){
                option.position = { top: 'auto', left: 'auto' };
            }
            else if( option.position == 'top left' ){
                option.position = { top: 0, left: 0 };
            }
            else if( option.position == 'top center' ){
                option.position = { top: 0, left: 'center' };
            }
            else if( option.position == 'top right' ){
                option.position = { top: 0, right: 0 };
            }
            else if( option.position == 'center right' ){
                option.position = { top: 'center', right: 0 };
            }
            else if( option.position == 'bottom right' ){
                option.position = { bottom: 0, right: 0 };
            }
            else if( option.position == 'bottom center' ){
                option.position = { bottom: 0, left: 'center' };
            }
            else if( option.position == 'bottom left' ){
                option.position = { bottom: 0, left: 0 };
            }
            else if( option.position == 'center left' ){
                option.position = { top: 'center', left: 0 };
            }
        }
        if( $.isPlainObject( option.position  ) )
        {
            if( option.position.top || option.position.top == 0 )
            {
                /* POSITION TOP DES JSPANELS SETZEN */
                // default-config für position.top steht in $.fn.jsPanel.defaults.position
                if( option.position.top === 'center' )
                {
                    option.position.top = ( jsPanel.parent().height() - parseInt(option.size.height) ) / 2 + 'px';
                    if( parseInt( option.position.top ) < 0 )
                    {
                        option.position.top = 0;
                    }
                }
                else if( option.position.top === 'auto' )
                {
                    option.position.top = (25 * count + 10) + 'px';
                }
                else if( $.isFunction( option.position.top ) )
                {
                    var t = parseInt( option.position.top( jsPanel ) );
                    if( t >= 0 )
                    {
                        option.position.top = t + 'px';
                    }
                }
                else if( parseInt( option.position.top ) >= 0 )
                {
                    option.position.top = parseInt( option.position.top ) + 'px';
                }
                else
                {
                    option.position.top = (25 * count + 10) + 'px';
                }
                jsPanel.css( 'top', option.position.top );
            }
            else if( option.position.bottom  || option.position.bottom == 0 )
            {
                /* POSITION BOTTOM DES JSPANELS SETZEN */
                if( option.position.bottom === 'center' )
                {
                    option.position.bottom = ( jsPanel.parent().height() - parseInt(option.size.height) ) / 2 + 'px';
                    if( parseInt( option.position.bottom ) < 0 )
                    {
                        option.position.bottom = 0;
                    }
                }
                else if( option.position.bottom === 'auto' )
                {
                    option.position.bottom = (25 * count + 10) + 'px';
                }
                else if( $.isFunction( option.position.bottom ) )
                {
                    var t = parseInt( option.position.bottom( jsPanel ) );
                    if( t >= 0 )
                    {
                        option.position.bottom = t + 'px';
                    }
                }
                else if( parseInt( option.position.bottom ) >= 0 )
                {
                    option.position.bottom = parseInt( option.position.bottom ) + 'px';
                }
                else
                {
                    option.position.bottom = (25 * count + 10) + 'px';
                }
                jsPanel.css( 'bottom', option.position.bottom );
            }

            if( option.position.left || option.position.left == 0 )
            {
                /* POSITION LEFT DES JSPANELS SETZEN */
                // default-config für position.left steht in $.fn.jsPanel.defaults.position
                if( option.position.left === 'center' )
                {
                    option.position.left = ( jsPanel.parent().width() - parseInt(option.size.width) ) / 2 + 'px';
                }
                else if( option.position.left === 'auto' )
                {
                    option.position.left = (25 * count + 10) + 'px';
                }
                else if( $.isFunction( option.position.left ) )
                {
                    var l = parseInt( option.position.left( jsPanel ) );
                    if( l >= 0 )
                    {
                        option.position.left = l + 'px';
                    }
                }
                else if( parseInt( option.position.left ) >= 0 )
                {
                    option.position.left = parseInt( option.position.left ) + 'px';
                }
                else
                {
                    option.position.left = (25 * count + 10) + 'px';
                }
                jsPanel.css( 'left', option.position.left );
            }
            else if( option.position.right || option.position.right == 0 )
            {
                /* POSITION RIGHT DES JSPANELS SETZEN */
                if( option.position.right === 'center' )
                {
                    option.position.right = ( jsPanel.parent().width() - parseInt(option.size.width) ) / 2 + 'px';
                }
                else if( option.position.right === 'auto' )
                {
                    option.position.right = (25 * count + 10) + 'px';
                }
                else if( $.isFunction( option.position.right ) )
                {
                    var l = parseInt( option.position.right( jsPanel ) );
                    if( l >= 0 )
                    {
                        option.position.right = l + 'px';
                    }
                }
                else if( parseInt( option.position.right ) >= 0 )
                {
                    option.position.right = parseInt( option.position.right ) + 'px';
                }
                else
                {
                    option.position.right = (25 * count + 10) + 'px';
                }
                jsPanel.css( 'right', option.position.right );
            }
        }

        /* CSS top, left, bottom, right, z-index des jsPanels setzen */
        if( option.position.top ){
            jsPanel.css( 'top', option.position.top );
        }else if( option.position.bottom ){
            jsPanel.css( 'bottom', option.position.bottom );
        }
        if( option.position.left ){
            jsPanel.css( 'left', option.position.left );
        }else if( option.position.right ){
            jsPanel.css( 'right', option.position.right );
        }
        jsPanel.css( 'z-index', set_zi() );




        /*
         * DIE HANDLER FÜR DAS PANEL
         *
         */
        // Handler um Panel in den Vordergrund zu holen
        jsPanel.on('click', function(){
            jsPanel.css( 'z-index', set_zi() );
        });
        // jsPanel schliessen
        $('.jsPanel-hdr-r-btn-close', jsPanel).on('click', function(){
            jsPanel.close();
        });
        // jsPanel minimieren
        $('.jsPanel-hdr-r-btn-min', jsPanel).on('click', function(){
            jsPanel.minimize();
        });
        // jsPanel maximieren
        $('.jsPanel-hdr-r-btn-max', jsPanel).on('click', function(){
            jsPanel.maximize();
        });


        /*
         * METHODEN DES JSPANEL-OBJEKTS
         *
         * Ich habe mich entschieden, die Anzahl der Methoden klein zu halten, weil jQuery selbst
         * ausreichend Funktionalität bereitstellt, die hier verwendet werden kann
         *
         */
        // TITLE TEXT GETTER/SETTER und mehr
        jsPanel.title = function()
        {
            if( arguments.length == 0 )
            {
                // ohne Argument liefert die Funktion das Element das den Titletext enthält
                return $('.jsPanel-hdr-l-text', this);
            }
            else if( arguments.length == 1 && arguments[0] === true )
            {
                // mit Argument true liefert die Funktion den Inhalt des Title-Elements des jsPanels
                return $('.jsPanel-hdr-l-text', this).html();
            }
            else if( arguments.length == 1 && typeof arguments[0] === 'string' )
            {
                // mit Argument string setzt die Funktion den Inhalt des Title-Elements des jsPanels
                $('.jsPanel-hdr-l-text', this).html( arguments[0] );
                return this;
            }
            else
            {
                // in allen anderen Fällen liefert die Funktion das jsPanel an sich
                return this;
            }
        }

        // TOOLBAR NACHTRÄGLICH EINFÜGEN
        jsPanel.addToolbar = function( str )
        {
            if( str && typeof str === 'string' ){
                $( '.jsPanel-content', this ).css( { height:'-webkit-calc(100% - 40px)', height: 'calc(100% - 40px' } );
                // Toolbareinfügen
                $( '.jsPanel-hdr', this ).css( 'height', '38px' ).append( '<p style="color:white;" class="jsPanel-hdr-toolbar"></p>' );
                // Toolbar-Inhalt einfügen, kann HTML-Code, oder ein entsprechendes jquery-Objekt, oder eine Funktion sein, die HTML-Code liefert
                $( '.jsPanel-hdr-toolbar', this ).append( str );
            }
            return this;
        }

        // jsPanel schließen
        jsPanel.close = function()
        {
            // das parent-Element des Panels ermitteln, wird benötigt, um dessen childpanels nach close zu repositionieren wenn minimized
            var context = $(this).parent(),
                count = context.children('.jsPanel').length;    // Anzahl Panels im context
            // childpanels löschen ...
            jsPanel.closeChildpanels();
            $(this).remove();
            // die minimierten Panels repositionieren
            for (var i = 0 ; i < count-1 ; i++){
                var left = (i * 150) + 'px';
                context.children('.minimized').eq(i).animate({left: left});
            }
            return context;
        }

        // childpanels des jspanels löschen
        jsPanel.closeChildpanels = function()
        {
            var childpanels = $( '.jsPanel', this );
            childpanels.each(function( index ){
                var id = $( this ).attr('id');
                $( this ).remove();
            });
            return this;
        }

        // jsPanel in den Fordergrund holen
        jsPanel.front = function()
        {
            this.css( 'z-index', set_zi() );
            return this;
        }
        jsPanel.movetoFront = jsPanel.front; // movetoFront is deprecated

        // jsPanel Minimieren und Maximieren
        jsPanel.minimize = function()
        {
            if( $( '#jsPanel-min-container' ).length == 0 )
            {
                // wenn der Container für die minimierten jsPanels noch nicht existiert ->
                $( 'body' ).append( '<div id="jsPanel-min-container"></div>' );
            }
            // wenn jsPanel NICHT minimiert ist ...
            if( !this.hasClass( 'minimized' ) )
            {
                // ... sondern normalized und auch nicht maximiert
                if( this.hasClass( 'normalized' ) ){
                    // position, size, parent speichern
                    jsPanel.storeData( jsPanel );
                }
                // counter der minimierten jsPanels und css left für das zu minimierende Panel berechnen
                var count =  $( '.jsPanel.minimized' ).length,
                    left = ( ( count ) * 150 ) + 'px';
                // Toolbar und Content-div ausblenden
                $( '.jsPanel-hdr-toolbar, .jsPanel-content', this ).css( 'display', 'none' );
                // jsPanel bearbeiten
                this.removeClass( 'normalized maximized' )
                    .addClass( 'minimized' )
                    .animate( { width:'150px' , height:'22px' , left:left , top:0 , opacity:1 , zIndex:1000 } )
                    .resizable( "disable" )
                    .draggable( "disable" );
                // Button Grafik austauschen
                $( '.jsPanel-hdr-r-btn-max', this ).removeClass( 'normal' ).addClass( 'alternate' );
                // jsPanel in vorgesehenen Container verschieben
                jsPanel.appendTo( '#jsPanel-min-container' );
            }
            return this;
        }

        jsPanel.maximize = function()
        {
            if ( !this.hasClass('normalized') )
            {
                // jsPanel wieder in den Ursprungscontainer verschieben
                this.appendTo( this.data( 'parentElement' ) );

                // normale Größe anwenden
                this.animate({ left:   this.data( 'panelLeft' ),
                    top:    this.data( 'panelTop' ),
                    width:  this.data( 'panelWidth' ),
                    height: this.data( 'panelHeight' )})
                    .removeClass('minimized maximized')
                    .addClass('normalized');

                if( $('.jsPanel-hdr-toolbar', this).length == 1 )
                {
                    // wenn toolbar vorhanden ist
                    $('.jsPanel-hdr-toolbar', this).css('display', 'block')
                    $('.jsPanel-content', this).css({ display:'block',
                        width: '100%',
                        height: '100%',
                        height: '-webkit-calc(100% - 40px)',
                        height: 'calc(100% - 40px)' });
                } else {
                    $('.jsPanel-content', this).css({ display:'block',
                        width: '100%',
                        height: '100%',
                        height: '-webkit-calc(100% - 20px)',
                        height: 'calc(100% - 20px)' });
                }
                // Button Grafik austauschen
                $( '.jsPanel-hdr-r-btn-max', this ).removeClass( 'alternate' ).addClass( 'normal' );
            }
            else
            {
                if ( !this.hasClass('minimized') )
                {
                    // nur wenn jsPanel nicht minimiert ist
                    jsPanel.storeData( jsPanel );
                }
                // wenn jsPanel minimiert ist
                if( this.hasClass('minimized') ){
                    // jsPanel wieder in den Ursprungscontainer verschieben
                    this.appendTo( this.data( 'parentElement' ) );
                }
                // maximale Größe anwenden
                if( this.parent().css('overflow-x') != 'hidden' )
                {
                    var width =  parseInt( this.parent().width() , 10 ) - 35 + 'px';     // extra 20 wegen scrollbar
                }
                else
                {
                    var width =  parseInt( this.parent().width() , 10 ) - 20 + 'px'     // -20px wegen padding und box-shadow & um scrollbars zu verhindern
                }
                if( this.parent().css('overflow-y') != 'hidden' )
                {
                    var height = parseInt( this.parent().height() , 10 ) - 35 + 'px';    // extra 20 wegen scrollbar
                }
                else
                {
                    var height = parseInt( this.parent().height() , 10 ) - 20 + 'px';    // -20px wegen padding und box-shadow & um scrollbars zu verhindern
                }

                this.animate( {left: '5px' , top: '5px' , width: width , height: height} )
                    .removeClass( 'minimized normalized' )
                    .addClass( 'maximized' );

                if( $('.jsPanel-hdr-toolbar', this).length == 1 )
                {
                    $('.jsPanel-hdr-toolbar', this).css('display', 'block')
                    $('.jsPanel-content', this).css({ display:'block',
                        width: '100%',
                        height: '100%',
                        height: '-webkit-calc(100% - 40px)',
                        height: 'calc(100% - 40px)' });
                }
                else
                {
                    $('.jsPanel-content', this).eq(0).css({ display: 'block' ,
                        width: '100%',
                        height: '100%',
                        height: '-webkit-calc(100% - 20px)',
                        height: 'calc(100% - 20px)' });
                }
                // Button Grafik austauschen
                $( '.jsPanel-hdr-r-btn-max', this ).removeClass( 'normal' ).addClass( 'alternate' );
            }
            this.resizable( "enable" ).draggable( "enable" );

            // die minimierten panels repositionieren
            var count = $('.jsPanel.minimized').length;
            for (var i = 0; i < count; i++){
                var left = (i * 150) + 'px';
                $('.jsPanel.minimized').eq(i).animate({left: left});
            }
            return this;
        }

        // Speichert CSS-Werte in data-Property des jsPanels
        jsPanel.storeData = function( panel )
        {
            panel.data( 'panelWidth', panel.css( 'width' ) );
            panel.data( 'panelHeight', panel.css( 'height' ) );
            panel.data( 'panelTop', panel.css( 'top' ) );
            panel.data( 'panelLeft', panel.css( 'left' ) );
            panel.data( 'parentElement', panel.parent() );
        }


        /*
         * PANEL EINBLENDEN .....
         *
         */
        jsPanel.fadeIn();


        /*
         * CALLBACK AUFRUFEN WENN VORHANDEN
         *
         */
        if( arguments.length == 1 && $.isFunction( arguments[0] ) )
        {
            arguments[0]( jsPanel );
        }
        else if( callback && $.isFunction( callback ) )
        {
            // der callback bekommt das jsPanel als Argument 'jsPanel' übergeben
            callback( jsPanel );
        }


        /*
         * RETURN-WERT IST DAS PANEL SELBST
         *
         */
        return jsPanel;

    }

    /*
     * PLUGIN DEFAULTS - added as a property on our plugin function
     *
     */
    $.fn.jsPanel.defaults = {
        "title":        function(){
                            return 'jsPanel No ' + ( $('.jsPanel').length + 1 )
                        },
        "overflow":     'scroll',
        "size":         {
                            width:  500,
                            height: 310
                        },
        "position":     'auto',
        "draggable":    {
                            handle:      'div.jsPanel-hdr',
                            stack:       '.jsPanel',
                            opacity:     0.6,
                            start:       function( event, ui ) {
                                $(ui.helper ).css( { 'bottom': '', 'right': '' } );
                            }
                        },
        "resizable":    {
                            //alsoResize:     '.jsPanel-content:first-of-type',
                            handles:        'e, s, w, se, sw',
                            autoHide:       false,
                            minWidth:       150,
                            minHeight:      93
                        },
        "autoclose":    false
    };

    /*
     * UTILITY FUNCTIONS for internal use
     *
     */
    // Funktion bildet einen Wert für css z-index
    function set_zi(){
        var zi = 0;
        $('.jsPanel').each( function(){
            if( $(this).zIndex() > zi ){
                zi = $(this).zIndex();
            }
        });
        return zi + 1;
    }

}( jQuery ));
