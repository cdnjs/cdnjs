/* jQuery Plugin jsPanel
   Version: 1.6.1 2014-04-20 07:16
   Dependencies:
    jQuery library ( > 1.7.0 incl. 2.1.0 )
    jQuery.UI library ( > 1.9.0 ) - (at least UI Core, Mouse, Widget, Draggable, Resizable)
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
var jsPanelversion = '1.6.1 2014-04-20 07:16';

// option.show verbessert/erweitert
// option.controls erweitert

(function ( $ ) {

    $.fn.jsPanel = function( config , callback ) {

        // unbind all handlers for the "DOMNodeRemoved" event
        // will be bound again after jsPanel is visible in the document
        $( "body" ).unbind( "DOMNodeRemoved" );

        // tagname des elements an das das jsPanel gehängt wird und window Daten
        // this is the collection on which .jsPanel() is called
        var par = this.first()[0].tagName.toLowerCase(),
            wsT = $( window ).scrollTop(),
            wsL = $( window ).scrollLeft(),
            woW = $( window ).outerWidth(),
            woH = $( window ).outerHeight();

        // Extend our default config with those provided.
        // Note that the first arg to extend is an empty object -
        // this is to keep from overriding our "defaults" object.
        var option = $.extend(true, {}, $.fn.jsPanel.defaults, config);

        // Counter für die Panels im jeweils verwendeten Container (für top & left)
        var count = $('.jsPanel', this.first() ).length;

        var jsPanel = $('<div class="jsPanel jsPanel-theme-light normalized" style="z-index:1000;display:none;">'+
                            '<div class="jsPanel-hdr jsPanel-theme-light">'+
                                '<div class="jsPanel-hdr-l"><p class="jsPanel-hdr-l-text"></p></div>'+
                                '<div class="jsPanel-hdr-r">'+
                                    '<div class="jsPanel-hdr-r-btn-close"></div>'+
                                    '<div class="jsPanel-hdr-r-btn-max normal"></div>'+
                                    '<div class="jsPanel-hdr-r-btn-min"></div>'+
                                '</div>'+
                                '<div class="jsPanel-hdr-toolbar"></div>'+
                            '</div>'+
                            '<div class="jsPanel-content jsPanel-theme-light"></div>'+
                            '<div class="jsPanel-ftr"></div>'+
                        '</div>');


        /*
         * DAS OPTIONS-OBJEKT DER FUNKTION .jsPanel() ABARBEITEN
         * und jsPanel ins document einfügen
         */

        /* option.modal  | default: false  */
        if( option.modal )
        {
            var dh = $(document ).outerHeight() + 'px',
                backdrop = '<div class="jsPanel-backdrop" style="position:absolute;top:0;left:0;z-index:10000; width:100%;height:' + dh + ';background:rgba(0,0,0,0.9);">'+
                           '<div class="jsPanel-backdrop-inner" style="position:absolute;top:' + $( window ).scrollTop() + 'px;width:100%;height:' + woH + 'px;"></div></div>';
            // falls vorhanden backdrop entfernen
            $( '.jsPanel-backdrop' ).remove();
            // backdrop wieder einfügen
            $( 'body' ).append( backdrop );
            // jsPanel in backdrop einfügen
            jsPanel.appendTo( $( '.jsPanel-backdrop-inner' ) );
            // draggable und resizable deaktivieren
            option.draggable = 'disabled';
            option.resizable = 'disabled';
            // jsPanel auf jeden Fall centern
            option.position = 'center';
            // reposition wenn window gescrollt wird
            window.onscroll = function(){
                $( '.jsPanel-backdrop-inner' ).css( 'top', $( window ).scrollTop() + 'px' );
            }
        }
        else
        {
            jsPanel.appendTo( this.first() );
        }

        // various presets for option.modal
        if( option.modal == 'modal-ok' )
        {
            option.toolbarFooter = [
                {
                    item:     jsPanel_mbtn_ok,                      // button to use
                    btntext:  option.toolbarFooter[0].buttontext,   // buttontext
                    event:    'click',
                    callback: option.toolbarFooter[0].callback
                }
            ]
        }
        else if( option.modal == 'modal-yesno' )
        {
            option.toolbarFooter = [
                { item: jsPanel_mbtn_yes, btntext: option.toolbarFooter[0].buttontext, event: 'click', callback: option.toolbarFooter[0].callback },
                { item: jsPanel_mbtn_no,  btntext: option.toolbarFooter[1].buttontext, event: 'click', callback: option.toolbarFooter[1].callback }
            ]
        }
        else if( option.modal == 'modal-confirm' )
        {
            option.toolbarFooter = [
                { item: jsPanel_mbtn_confirm, btntext: option.toolbarFooter[0].buttontext, event: 'click', callback: option.toolbarFooter[0].callback },
                { item: jsPanel_mbtn_cancel,  btntext: option.toolbarFooter[1].buttontext, event: 'click', callback: option.toolbarFooter[1].callback }
            ]
        }
        else if( option.modal == 'modal-submit' )
        {
            option.toolbarFooter = [
                { item: jsPanel_mbtn_submit, btntext: option.toolbarFooter[0].buttontext, event: 'click', callback: option.toolbarFooter[0].callback },
                { item: jsPanel_mbtn_cancel, btntext: option.toolbarFooter[1].buttontext, event: 'click', callback: option.toolbarFooter[1].callback }
            ]
        }

        /* THEME | default: 'light' - benutzt  jquery.alterclass.js von peteboere https://gist.github.com/peteboere/1517285 */
        jsPanel.alterClass( 'jsPanel-theme-*', 'jsPanel-theme-' + option.theme );
        $( '.jsPanel-hdr', jsPanel ).alterClass( 'jsPanel-theme-*', 'jsPanel-theme-' + option.theme );
        $( '.jsPanel-content', jsPanel ).alterClass( 'jsPanel-theme-*', 'jsPanel-theme-' + option.theme );
        $( '.jsPanel-ftr', jsPanel ).alterClass( 'jsPanel-theme-*', 'jsPanel-theme-' + option.theme );

        /* TITLE/HEADER | default: function - (Überschrift) des Panels */
        $( '.jsPanel-hdr-l:first-of-type p', jsPanel ).append( option.title );

        /* CONTROLS (buttons in header right) | default: object */
        if( option.controls.buttons === 'closeonly' || option.modal )
        {
            $( '.jsPanel-hdr-r-btn-min, .jsPanel-hdr-r-btn-max', jsPanel ).css('display', 'none');
        }
        else if( option.controls.buttons === false )
        {
            $( '.jsPanel-hdr-r-btn-min, .jsPanel-hdr-r-btn-max, .jsPanel-hdr-r-btn-close', jsPanel ).css('display', 'none');
        }

        /* ATTRIBUT ID DES PANELS | default: false */
        // wenn option.id -> string oder function?
        if( typeof option.id === 'string' )
        {
            // wenn id noch nicht existiert -> benutzen
            if( $( '#' + option.id ).length < 1 ){
                jsPanel.attr( 'id', option.id );
            }
            else
            {
                // sonst ...
                jsPanel.uniqueId();
                // neue id als Hinweis in den title schreiben
                var txt = $('.jsPanel-hdr-l:first-of-type p', jsPanel).html();
                $('.jsPanel-hdr-l:first-of-type p', jsPanel).html( txt + ' AUTOMATIC ID: ' + jsPanel.attr('id') );
            }
        }
        else if( $.isFunction( option.id ) )
        {
            jsPanel.attr( 'id', option.id );
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

        /* TOOLBAR im Header einfügen | default: false */
        if( option.toolbarHeader )
        {
            configToolbar(  option.modal, option.toolbarHeader, '.jsPanel-hdr-toolbar', jsPanel );
        }
        else if( option.toolbarContent ) // remains only for downward compatibility
        {
            // Toolbar-Inhalt einfügen, kann HTML-Code, oder ein entsprechendes jquery-Objekt, oder eine Funktion sein, die HTML-Code liefert
            $( '.jsPanel-hdr-toolbar', jsPanel ).append( option.toolbarContent );
        }

        /* TOOLBAR im Footer aktivieren | default: false */
        if( option.toolbarFooter )
        {
            $( '.jsPanel-content', jsPanel ).addClass( 'jsPanel-content-footer' );
            $( '.jsPanel-ftr', jsPanel ).css( { 'display':'block' } );
            // toolbar Elemente einfügen und konfigurieren
            configToolbar( option.modal,  option.toolbarFooter, '.jsPanel-ftr', jsPanel );

        }

        /* font-awesome | bootstrap iconfonts einfügen wenn option.iconfont gesetzt */
        if( option.controls.iconfont )
        {
            if( option.controls.iconfont === 'font-awesome' )
            {
                $( '.jsPanel-hdr-r-btn-close', jsPanel ).append( '<i class="fa fa-times"></i>' );
                $( '.jsPanel-hdr-r-btn-max', jsPanel ).append( '<i class="fa fa-arrows-alt"></i>' );
                $( '.jsPanel-hdr-r-btn-min', jsPanel ).append( '<i class="fa fa-minus"></i>' );
            }
            else if( option.controls.iconfont === 'bootstrap' )
            {
                $( '.jsPanel-hdr-r-btn-close', jsPanel ).append( '<span class="glyphicon glyphicon-remove"></span>' );
                $( '.jsPanel-hdr-r-btn-max', jsPanel ).append( '<span class="glyphicon glyphicon-fullscreen"></span>' );
                $( '.jsPanel-hdr-r-btn-min', jsPanel ).append( '<span class="glyphicon glyphicon-minus"></span>' );
            }
            // icon sprites entfernen
            $( '.jsPanel-hdr-r-btn-close, .jsPanel-hdr-r-btn-min, .jsPanel-hdr-r-btn-max, .jsPanel-hdr-r-btn-alternate', jsPanel ).css( 'background-image', 'none' );
        }

        /* CSS DES PANELINHALT-CONTAINERS initialisieren und zuweisen | default: false */
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
            // jquery ui draggable disabled initialisieren, damit Zustand abgefragt werden kann ( z.B. in minimize()/maximize() )
            jsPanel.draggable({ disabled: true });
        }

        /* JQUERY UI RESIZABLE FEATURE */
        // default-config für resizable steht in $.fn.jsPanel.defaults.resizable
        if( $.isPlainObject( option.resizable ) )
        {
            option.customresizable = $.extend( true, {}, $.fn.jsPanel.defaults.resizable, option.resizable );
            jsPanel.resizable( option.customresizable );
        }
        else
        {
            // jquery ui resizable disabled initialisieren, damit Zustand abgefragt werden kann ( z.B. in minimize()/maximize() )
            jsPanel.resizable({ disabled: true });
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

        /* INHALT DES PANELS | default: false */
        /* CONTENT */
        // option.content kann auch eine Funktion (auch IIFE) oder ein jQuery Objekt sein, die den Inhalt zurückliefert
        $( '.jsPanel-content' , jsPanel ).append( option.content );

        /* LOAD */
        if( $.isPlainObject( option.load ) && option.load.url )
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

        /* AJAX */
        if( $.isPlainObject( option.ajax ) )
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

        /* option.size | default: { width: 500, height: 310 } */
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

        /* option.position | default: 'auto' */
        if( typeof option.position === 'string' )
        {
            if( option.position == 'center' ){
                option.position = { top: 'center', left: 'center' };
            }
            else if( option.position == 'auto' )
            {
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
        if( $.isPlainObject( option.position ) )
        {
            if( option.position.top || option.position.top == 0 )
            {
                /* POSITION TOP DES JSPANELS SETZEN */
                // default-config für position.top steht in $.fn.jsPanel.defaults.position
                if( option.position.top === 'center' )
                {
                    if( par == 'body' )
                    {
                        option.position.top = ( $( window ).height() - parseInt(option.size.height) ) / 2 + 'px';
                    }
                    else
                    {
                        option.position.top = ( jsPanel.parent().height() - parseInt(option.size.height) ) / 2 + 'px';
                    }
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
            }
            else if( option.position.bottom  || option.position.bottom == 0 )
            {
                /* POSITION BOTTOM DES JSPANELS SETZEN */
                if( option.position.bottom === 'center' )
                {
                    if( par == 'body' )
                    {
                        option.position.bottom = ( $( window ).height() - parseInt(option.size.height) ) / 2 + 'px';
                    }
                    else
                    {
                        option.position.bottom = ( jsPanel.parent().height() - parseInt(option.size.height) ) / 2 + 'px';
                    }
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
            }
        }

        /* CSS top, left, bottom, right, z-index des jsPanels setzen */
        if( option.position.top )
        {
            if( par == 'body' )
            {
                jsPanel.css( 'top', parseInt( option.position.top ) + wsT + 'px' );
            }
            else
            {
                jsPanel.css( 'top', option.position.top );
            }
        }
        else if( option.position.bottom )
        {
            if( par == 'body' )
            {
                jsPanel.css( 'bottom', parseInt( option.position.bottom ) - wsT + 'px' );
            }
            else
            {
                jsPanel.css( 'bottom', option.position.bottom );
            }
        }
        if( option.position.left )
        {
            if( par == 'body' )
            {
                jsPanel.css( 'left', parseInt( option.position.left ) + wsL + 'px' );
            }
            else
            {
                jsPanel.css( 'left', option.position.left );
            }
        }
        else if( option.position.right )
        {
            if( par == 'body' )
            {
                jsPanel.css( 'right', parseInt( option.position.right ) - wsL + 'px' );
            }
            else
            {
                jsPanel.css( 'right', option.position.right );
            }
        }

        if( $('.jsPanel-backdrop' ).length > 0 )
        {
            var zi = $('.jsPanel-backdrop' ).css('z-index') + 1;
            jsPanel.css('z-index', zi );
        }
        else
        {
            jsPanel.css( 'z-index', set_zi() );
        }




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
        $('.jsPanel-hdr-r-btn-min, .jsPanel-hdr-r-btn-min *', jsPanel).on('click', function(){
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
                return $('.jsPanel-hdr div:first-child p', this);
            }
            else if( arguments.length == 1 && arguments[0] === true )
            {
                // mit Argument true liefert die Funktion den Inhalt des Title-Elements des jsPanels
                return $('.jsPanel-hdr div:first-child p', this).html();
            }
            else if( arguments.length == 1 && typeof arguments[0] === 'string' )
            {
                // mit Argument string setzt die Funktion den Inhalt des Title-Elements des jsPanels
                $('.jsPanel-hdr div:first-child p', this).html( arguments[0] );
                return this;
            }
            else
            {
                // in allen anderen Fällen liefert die Funktion das jsPanel an sich
                return this;
            }
        };

        // TOOLBAR NACHTRÄGLICH EINFÜGEN
        jsPanel.addToolbar = function( content )
        {
            if( content ){
                // Toolbar-Inhalt einfügen, kann HTML-Code, oder ein entsprechendes jquery-Objekt, oder eine Funktion sein, die HTML-Code liefert
                $( '.jsPanel-hdr-toolbar', this ).append( content );
            }
            return this;
        };

        // jsPanel schließen
        jsPanel.close = function()
        {
            // das parent-Element des Panels ermitteln, wird benötigt, um dessen childpanels nach close zu repositionieren wenn minimized
            var context = this.parent(),
                count = context.children('.jsPanel').length;    // Anzahl Panels im context
            // childpanels löschen ...
            jsPanel.closeChildpanels();
            this.remove();
            // backdrop entfernen
            $( '.jsPanel-backdrop' ).remove();
            // die minimierten Panels repositionieren
            for (var i = 0 ; i < count-1 ; i++){
                var left = (i * 150) + 'px';
                context.children('.minimized').eq(i).animate({left: left});
            }
            return context;
        };

        // childpanels des jspanels löschen
        jsPanel.closeChildpanels = function()
        {
            var childpanels = $( '.jsPanel', this );
            childpanels.each(function( index ){
                var id = $(this).attr('id');
                this.remove();
            });
            return this;
        };

        // jsPanel in den Fordergrund holen
        jsPanel.front = function()
        {
            this.css( 'z-index', set_zi() );
            return this;
        };
        jsPanel.movetoFront = jsPanel.front; // movetoFront is deprecated

        // jsPanel Minimieren und Maximieren
        jsPanel.minimize = function()
        {
            // unbind necessary -> event 'onjspanelclosed' would fire
            $( "body" ).unbind( "DOMNodeRemoved" );

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
                // jsPanel bearbeiten
                this.removeClass( 'normalized maximized' )
                    .addClass( 'minimized' )
                    .animate( { width:'150px' , height:'26px' , left:left , top:0 , opacity:1 , zIndex:1000 } );
                // jquery ui resizable und draggable bei Bedarf deaktivieren
                if( jsPanel.resizable( "option", "disabled" ) === false )
                {
                    this.resizable( "disable" );
                }
                if( jsPanel.draggable( "option", "disabled" ) === false )
                {
                    this.draggable( "disable" );
                }
                // Button Grafik austauschen
                $( '.jsPanel-hdr-r-btn-max', this ).removeClass( 'normal' ).addClass( 'alternate' );
                // jsPanel in vorgesehenen Container verschieben
                jsPanel.appendTo( '#jsPanel-min-container' );
            }
            // enable 'onjspanelclosed' again
            bindRemoveEvent();

            return this;
        };

        jsPanel.maximize = function()
        {
            // unbind necessary -> event 'onjspanelclosed' would fire
            $( "body" ).unbind( "DOMNodeRemoved" );

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
                var width =  parseInt( this.parent().outerWidth() , 10 ) - 10 + 'px',
                    height = parseInt( this.parent().outerHeight() , 10 ) - 10 + 'px';

                if( par == 'body' )
                {
                    // wenn jsPanel im body Element hängt
                    var wsT = $( window ).scrollTop(),
                        wsL = $( window ).scrollLeft(),
                        woH = $( window ).outerHeight();
                    this.animate( {left: wsL+5+'px' , top: wsT+5+'px' , width: width , height: woH-10+'px' } );
                }
                else
                {
                    // sonst
                    this.animate( {left: '5px' , top: '5px' , width: width , height: height} );
                }
                this.removeClass( 'minimized normalized' )
                    .addClass( 'maximized' );
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
            // enable 'onjspanelclosed' again
            bindRemoveEvent();

            return this;
        };

        // Speichert CSS-Werte in data-Property des jsPanels
        jsPanel.storeData = function( panel )
        {
            panel.data( 'panelWidth', panel.css( 'width' ) );
            panel.data( 'panelHeight', panel.css( 'height' ) );
            panel.data( 'panelTop', panel.css( 'top' ) );
            panel.data( 'panelLeft', panel.css( 'left' ) );
            panel.data( 'parentElement', panel.parent() );
        };


        /*
         * PANEL EINBLENDEN .....
         *
         */
        var anim = option.show;
        if( anim.indexOf(" ") == -1 ){
            // wenn in anim kein Leerzeichen zu finden ist -> function anwenden
            jsPanel[anim](function(){
                // trigger custom event
                $( jsPanel ).trigger( 'onjspanelloaded', jsPanel.attr('id') );
                // binds the DOMNodeRemoved event and prepares to trigger 'onjspanelclosed'
                bindRemoveEvent();
            });
        }
        else
        {
            // sonst wird es als css animation interpretiert und die class gesetzt
            // does not work with certain combinations of type of animation and positioning
            jsPanel.css( { display:'block', opacity: 1 } );
            jsPanel.addClass( option.show );
            $( jsPanel ).trigger( 'onjspanelloaded', jsPanel.attr('id') );
            bindRemoveEvent();
        }
        // Example Code for application as put in api.js:
        //$('body').on( 'onjspanelloaded', function(event, jsPanelID){ console.log( 'jsPanel added with ID: ' + jsPanelID ) });
        //$('body').on( 'onjspanelclosed', function(event, jsPanelID){ console.log( 'Node removed ID: ' + jsPanelID ) });


        /* css bottom und/oder right in top und left wandeln */
        // ist notwendig, damit resizable und draggable ordentlich funktionieren wenn bottom oder right benutzt wird
        var pos = jsPanel.position();
        if( option.position.bottom )
        {
            jsPanel.css( { 'top': parseInt(pos.top) + 'px', 'bottom': '' } );
        }
        if( option.position.right )
        {
            jsPanel.css( { 'left': parseInt(pos.left) + 'px', 'right': '' } );
        }




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

    };

    /*
     * PLUGIN DEFAULTS - added as a property on our plugin function
     *
     */
    $.fn.jsPanel.defaults = {
        "id":               function(){
                                $(this).first().uniqueId()
                            },
        "toolbarContent":   false, // deprecated in favor of toolbarHeader
        "toolbarHeader":    false,
        "toolbarFooter":    false,
        "modal":            false,
        "contentBG":        false,
        "content":          false,
        "load":             false,
        "ajax":             false,
        "autoclose":        false,
        "theme":            'light',
        "position":         'auto',
        "overflow":         'scroll',
        "show":             'fadeIn',
        "title":            function(){
                                return 'jsPanel No ' + ( $('.jsPanel').length + 1 )
                            },
        "controls":         {
                                buttons:  true,
                                iconfont: false
                            },
        "size":             {
                                width:  500,
                                height: 310
                            },
        "draggable":        {
                                handle:      'div.jsPanel-hdr',
                                stack:       '.jsPanel',
                                opacity:     0.6
                            },
        "resizable":        {
                                handles:        'e, s, w, se, sw',
                                autoHide:       false,
                                minWidth:       150,
                                minHeight:      93
                            }
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

    // bestückt die Toolbars mit Inhalt
    function configToolbar( optionModal, optionToolbar, cssToolbar, panel ){
        if( typeof optionToolbar === 'string' )
        {
            // wenn toolbarFooter ein string ist -> einfügen
            $( cssToolbar, panel ).append( optionToolbar );
        }
        else if( $.isArray( optionToolbar ) )
        {
            for( i = 0; i < optionToolbar.length; i++ )
            {
                if( typeof optionToolbar[i] === 'object' )
                {
                    var el = $( optionToolbar[i].item );
                    if( typeof optionModal === 'string'  && el.hasClass( 'btn' ) )
                    {
                        el= $( optionToolbar[i].item ).append( optionToolbar[i].btntext );
                    }
                    $( cssToolbar, panel ).append( el );
                    el.bind( optionToolbar[i].event, optionToolbar[i].callback );
                }
            }
        }
    }
    /*
     // forEach needs ECMA Script5 implemented -> not the case on all browsers
     option.toolbarFooter.forEach(
         function( element, index, array ){
             if( typeof element === 'object')
             {
                 var el = $( element.item )
                 $( '.jsPanel-ftr', jsPanel ).append( el );
                 el.bind( element.event, element.callback )
             }
         }
     );
     */

    // binds the DOMNOdeRemoved event and triggers 'onjspanelclosed'
    function bindRemoveEvent(){
        $( "body" ).bind(
            "DOMNodeRemoved",
            function( objEvent ){
                if( $( objEvent.target ).hasClass('jsPanel') )
                {
                    var panelID = $( objEvent.target ).attr('id');
                    $('body' ).trigger( 'onjspanelclosed', panelID );
                }
            }
        );
    }

    /*
     * jQuery alterClass plugin
     *
     * Remove element classes with wildcard matching. Optionally add classes:
     * $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
     *
     * Copyright (c) 2011 Pete Boere (the-echoplex.net)
     * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
     *
     */
    $.fn.alterClass = function ( removals, additions ) {
        var self = this;
        if ( removals.indexOf( '*' ) === -1 ) {
        // Use native jQuery methods if there is no wildcard matching
            self.removeClass( removals );
            return !additions ? self : self.addClass( additions );
        }

        var patt = new RegExp( '\\s' +
            removals.
                replace( /\*/g, '[A-Za-z0-9-_]+' ).
                split( ' ' ).
                join( '\\s|\\s' ) +
            '\\s', 'g' );

        self.each( function ( i, it ) {
            var cn = ' ' + it.className + ' ';
            while ( patt.test( cn ) ) {
                cn = cn.replace( patt, ' ' );
            }
            it.className = $.trim( cn );
        });

        return !additions ? self : self.addClass( additions );
    };

    /* Templates */
    // for the modal buttons in the footer toolbar
    var jsPanel_mbtn_ok      = '<button type="button" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-ok"></span> </button>',
        jsPanel_mbtn_yes     = '<button type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-ok"></span> </button>',
        jsPanel_mbtn_no      = '<button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove"></span> </button>',
        jsPanel_mbtn_cancel  = '<button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove"></span> </button>',
        jsPanel_mbtn_confirm = '<button type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-ok"></span> </button>',
        jsPanel_mbtn_submit  = '<button type="button" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-ok"></span> </button>',
        jsPanel_mbtn_close   = '<button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-off"></span> </button>',
        jsPanel_mbtn_login   = '<button type="button" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-log-in"></span> </button>';

}( jQuery ));
