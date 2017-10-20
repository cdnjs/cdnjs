/* jQuery Plugin jsPanel
   Version: 1.0.1 2014-03-17 10:32
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
var jsPanelversion = 'jsPanel Version: 1.0.1 2014-03-17 10:32';

//TODO maximize() arbeitet nicht gut wenn Fenster bzw. jsPanel parent gescrollt ist; siehe Beispiel maximize()
//TODO Events einbauen ja/nein??
/*
 if (jQuery.ui) {
 console.log( 'Yep :-)' );
 }
 if (typeof(jQuery.ui.draggable) != 'undefined'){
 console.log( 'draggable loaded :-)' );
 }
 if (typeof(jQuery.ui.resizable) != 'undefined'){
 console.log( 'resizable loaded :-)' );
 }
 if (jQuery.isFunction(jQuery.fn.uniqueId)) {
 console.log('ok')
 }
 */

(function ( $ ) {

    $.fn.jsPanel = function( config , callback ) {

        // Extend our default config with those provided.
        // Note that the first arg to extend is an empty object -
        // this is to keep from overriding our "defaults" object.
        var option = $.extend(true, {}, $.fn.jsPanel.defaults, config);

        // Counter für die Panels im jeweils verwendeten Container (für top & left)
        var count = $('.jsPanel', this.first() ).length;

        var jsPanel = $('<div class="jsPanel normalized" style="z-index:1;display:none;">'+
                            '<div class="jsPanel-hdr">'+
                                '<div class="jsPanel-hdr-l"><p class="jsPanel-hdr-l-text"></p></div>'+
                                '<div class="jsPanel-hdr-r">'+
                                    '<div class="jsPanel-hdr-r-btn-close"></div>'+
                                    '<div class="jsPanel-hdr-r-btn-max normal"></div>'+
                                    '<div class="jsPanel-hdr-r-btn-min"></div>'+
                                '</div>'+
                                '<div class="clearfix"></div>'+
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

        /* bei Bedarf eine zusätzliche TOOLBAR einfügen */
        if( option.toolbarContent )
        {
            $( '.jsPanel-content', jsPanel ).css( { height:'-webkit-calc(100% - 40px)', height: 'calc(100% - 40px' } );
            // Toolbareinfügen
            $( '.jsPanel-hdr', jsPanel ).append( '<div style="color:white;" class="jsPanel-hdr-toolbar"></div>' );
            // Toolbar-Inhalt einfügen, kann HTML-Code, oder ein entsprechendes jquery-Objekt, oder eine Funktion sein, die HTML-Code liefert
            $( '.jsPanel-hdr-toolbar', jsPanel ).append( option.toolbarContent );
        }

        /* CSS WIDTH initialisieren und zuweisen */
        /* option.size.width ist in den Defaults vorhanden, ein if/else ist also nicht erforderlich */
        if( option.size.width != 'auto' ){
            if( parseInt( option.size.width ) > 0 )
            {
                option.size.width = parseInt( option.size.width ) + 'px';
            }
            else if( $.isFunction( option.size.width ) )
            {
                var w = parseInt( option.size.width() );
                if( w > 0 )
                {
                    option.size.width = w + 'px';
                }
            }
            else
            {
                option.size.width = '600px';
            }
        }

        /* CSS HEIGHT initialisieren und zuweisen */
        /* option.size.height ist in den Defaults vorhanden, ein if/else ist also nicht erforderlich */
        if( option.size.height != 'auto' ){
            if( parseInt( option.size.height ) > 0 )
            {
                option.size.height = parseInt( option.size.height ) + 'px';
            }
            else if( $.isFunction( option.size.height ) )
            {
                var h = parseInt( option.size.height() );
                if( h > 0 )
                {
                    option.size.height = h + 'px';
                }
            }
            else
            {
                option.size.height = '370px';
            }
        }

        /* OVERFLOW DES JSPANEL-CONTENTS */
        // wird auf jeden Fall in den defaults gesetzt ...
        $( '.jsPanel-content', jsPanel ).css( { 'overflow-y':option.overflow.vertical, 'overflow-x':option.overflow.horizontal } );

        /* CSS DES PANELINHALT-CONTAINERS initialisieren und zuweisen; */
        if( typeof option.contentBG === 'object' )
        {
            $('.jsPanel-content', jsPanel ).css( option.contentBG );
        }
        else if(  typeof option.contentBG === 'string'  )
        {
            $('.jsPanel-content', jsPanel ).css( 'background', option.contentBG );
        }

        /* JQUERY UI DRAGGABLE FEATURE*/
        // default-config für draggable steht in $.fn.jsPanel.defaults.draggable
        option.customdraggable = $.extend( true, {}, $.fn.jsPanel.defaults.draggable, option.draggable );
        jsPanel.draggable( option.customdraggable );

        /* JQUERY UI RESIZABLE FEATURE */
        // default-config für resizable steht in $.fn.jsPanel.defaults.resizable
        option.customresizable = $.extend( true, {}, $.fn.jsPanel.defaults.resizable, option.resizable );
        jsPanel.resizable( option.customresizable );

        /* POSITION TOP DES JSPANELS SETZEN */
        // default-config für position.top steht in $.fn.jsPanel.defaults.position
        if( option.position.top === 'center' && option.size.height != 'auto' )
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
            var t = parseInt( option.position.top() );
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

        /* POSITION LEFT DES JSPANELS SETZEN */
        // default-config für position.left steht in $.fn.jsPanel.defaults.position
        if( option.position.left === 'center' && option.size.width != 'auto' )
        {
            option.position.left = ( jsPanel.parent().width() - parseInt(option.size.width) ) / 2 + 'px';
        }
        else if( option.position.left === 'auto' )
        {
            option.position.left = (25 * count + 10) + 'px';
        }
        else if( $.isFunction( option.position.left ) )
        {
            var l = parseInt( option.position.left() );
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

        /* CSS für top, left, width, height und z-index des jsPanels setzen */
        jsPanel.css( { top:option.position.top, left:option.position.left, width:option.size.width, height:option.size.height, 'z-index': set_zIndex() } );


        /* INHALT DES PANELS */
        if( option.content )
        {
            // option.content kann auch eine Funktion (auch IIFE) oder ein jQuery Objekt sein, die den Inhalt zurückliefert
            $( '.jsPanel-content' , jsPanel ).append( option.content );
        }

        if( option.load && $.isPlainObject( option.load ) )
        {
            if( option.load.url ){
                var url = option.load.url;
            }else{
                var url = undefined;
            }
            if( option.load.data ){
                var data = option.load.data;
            }else{
                var data = undefined;
            }
            if( option.load.complete && $.isFunction( option.load.complete ) ){
                var complete = option.load.complete;
            }else{
                var complete = $.noop();
            }
            $( '.jsPanel-content' , jsPanel ).empty().load( url, data, complete );
        }


        if( option.ajax && $.isPlainObject( option.ajax ) )
        {
            $.ajax( option.ajax )
            .done( function( data ){
                $( '.jsPanel-content' , jsPanel ).empty().append( data );
            });
        }


        /*
         * DIE HANDLER FÜR DAS PANEL
         *
         */
        // Handler um Panel in den Vordergrund zu holen
        jsPanel.on('click', function(){
            jsPanel.movetoFront();
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
                $( '.jsPanel-hdr', this ).append( '<p style="color:white;" class="jsPanel-hdr-toolbar"></p>' );
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
                var left = (i * 160) + 'px';
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
        jsPanel.movetoFront = function()
        {
            this.css( 'z-index', set_zIndex() );
            return this;
        }

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
                    left = ( ( count ) * 160 ) + 'px';
                // Toolbar und Content-div ausblenden
                $( '.jsPanel-hdr-toolbar, .jsPanel-content', this ).css( 'display', 'none' );
                // jsPanel bearbeiten
                this.removeClass( 'normalized maximized' )
                    .addClass( 'minimized' )
                    .animate( { width:'150px' , height:'17px' , left:left , top:0 , opacity:1 , zIndex:999 } )
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

                if( $('.jsPanel-hdr-toolbar', this).length == 1 ){
                    $('.jsPanel-hdr-toolbar', this).css('display', 'block')
                    $('.jsPanel-content', this).css({ display:'block',
                        width: '100%',
                        height: '100%',
                        height: '-webkit-calc(100% - 40px)',
                        height: 'calc(100% - 40px)' });
                } else {
                    $('.jsPanel-content', this).eq(0).css({ display: 'block' ,
                        width: width,
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
                var left = (i * 160) + 'px';
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
        jsPanel.css( 'display', 'block' );


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
        "overflow":     {
                            vertical:   'scroll',
                            horizontal: 'scroll'
                        },
        "size":         {
                            width:  600,
                            height: 370
                        },
        "position":     {
                            top:  'auto',
                            left: 'auto'
                        },
        "draggable":    {
                            handle:      'div.jsPanel-hdr',
                            containment: 'document',
                            stack:       '.jsPanel',
                            opacity:     0.6
                        },
        "resizable":    {
                            containment:    'document',
                            autoHide:       false,
                            minWidth:       150,
                            minHeight:      100
                        }
    };

    /*
     * UTILITY FUNCTIONS for internal use
     *
     */
    // Funktion bildet einen Wert für css z-index
    function set_zIndex()
    {
        var zIndexe = [];
        // z-indexe holen und in array schreiben
        $('.jsPanel:not(.minimized)').each(function(index) {
            zIndexe.push(parseInt($(this).css('z-index') , 10) );
            // .zIndex() ist eine jQuery-UI Methode
            zIndexe.push( $(this).zIndex() );
        });
        // array absteigend sortieren(größter wert wird erstes element)
        zIndexe.sort(function(a,b){return b - a});
        return zIndexe[0] + 1;
    }

}( jQuery ));
