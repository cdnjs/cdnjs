/* jQuery Plugin jsPanel
   Version: 1.11.0 2014-05-30 07:47
    jQuery library ( > 1.7.0 incl. 2.1.1 )
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
var jsPanelversion = '1.11.0 2014-05-30 07:47';

(function ( $ ) {

    $.fn.jsPanel = function( config , callback ) {

        // tagname des elements an das das jsPanel gehängt wird und window Daten
        // this is the collection on which .jsPanel() is called
        //var par = this.first()[0].tagName.toLowerCase();
        try
        {
            var par = this.first()[0].tagName.toLowerCase();
        }
        catch ( e )
        {
            console.log( e + '\nThe element you want to append the jsPanel to does not exist!' );
        }
        function winscrollTop(){
            return $( window ).scrollTop();
        }
        function winscrollLeft(){
            return $( window ).scrollLeft();
        }
        function winouterHeight(){
            return $( window ).outerHeight();
        }
        function docouterHeight(){
            return $(document ).outerHeight();
        }

        // Extend our default config with those provided.
        // Note that the first arg to extend is an empty object -
        // this is to keep from overriding our "defaults" object.
        var option = $.extend(true, {}, $.fn.jsPanel.defaults, config);

        // Counter für die Panels im jeweils verwendeten Container (für top & left)
        var count = $('.jsPanel', this.first() ).length;

        var jsPanel = $('<div class="jsPanel jsPanel-theme-light normalized" style="z-index:1000;">'+
                            '<div class="jsPanel-hdr jsPanel-theme-light">'+
                                '<div class="jsPanel-hdr-l"><p class="jsPanel-title"></p></div>'+
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
            if( par == 'body' )
            {
                // necessary for correct positioning of modal when modal appended directly to the body element, though I don't really get why !!
                par = null;
            }
            var backdrop = '<div class="jsPanel-backdrop" style="height:' + docouterHeight() + 'px;">'+
                '<div class="jsPanel-backdrop-inner" style="top:' + winscrollTop() + 'px;height:' + winouterHeight() + 'px;"></div></div>';
            // falls vorhanden backdrop entfernen und wieder einfügen
            $( backdrop ).remove().appendTo('body');
            // jsPanel in backdrop einfügen
            jsPanel.appendTo( $( '.jsPanel-backdrop-inner' ) );
            // jsPanel auf jeden Fall centern
            option.position = 'center';
            // reposition wenn window gescrollt wird
            commons_MTA( option, jsPanel, 'closeonly' );
            window.onscroll = function(){
                $( '.jsPanel-backdrop-inner' ).css( 'top', winscrollTop() + 'px' );
            }
            // various presets for option.modal
            function tb_preset( a, b )
            {
                var arr = new Array();
                for( var i = 0; i < arguments.length; i++ )
                {
                    arr[i] = {
                        item:     arguments[i],                         // button to use
                        btntext:  option.toolbarFooter[i].buttontext,   // buttontext
                        btnclass: option.toolbarFooter[i].buttonclass,  // classname to add to the button
                        event:    'click',
                        callback: option.toolbarFooter[i].callback
                    }
                }
                console.log(arr);
                return arr;
            }
            if( option.modal == 'modal-ok' )
            {
                option.toolbarFooter = tb_preset( jsPanel_mbtn_ok );
            }
            else if( option.modal == 'modal-yesno' )
            {
                option.toolbarFooter = tb_preset( jsPanel_mbtn_yes, jsPanel_mbtn_no );
            }
            else if( option.modal == 'modal-confirm' )
            {
                option.toolbarFooter = tb_preset( jsPanel_mbtn_confirm, jsPanel_mbtn_cancel );
            }
            else if( option.modal == 'modal-submit' )
            {
                option.toolbarFooter = tb_preset( jsPanel_mbtn_submit, jsPanel_mbtn_cancel );
            }
        }
        else if( option.tooltip )
        {
            commons_MTA( option, jsPanel, 'closeonly' );
            var trigger = this.first(),      // element serving as trigger for the tooltip
                parW = trigger.outerWidth(), // width of element serving as trigger for the tooltip
                parH = trigger.height(),     // height of element serving as trigger for the tooltip
                oX, oY;                      // takes the offsets

            // check whether offsets are set
            option.tooltip.offsetX ? ( oX = option.tooltip.offsetX ) : ( oX = 0 );
            option.tooltip.offsetY ? ( oY = option.tooltip.offsetY ) : ( oY = 0 );

            // calc top & left for the various positions
            if(option.tooltip.position == 'top')
            {
                option.position = {
                    top: function(){ return -( option.size.height ) + (oY) + 'px' },
                    left: function(){ return ( parW - option.size.width )/2 + (oX) + 'px' }
                }
            }
            else if(option.tooltip.position == 'bottom')
            {
                option.position = {
                    top: function(){  return parH + (oY) + 'px' },
                    left: function(){ return ( parW - option.size.width )/2 + (oX) + 'px' }
                }
            }
            else if(option.tooltip.position == 'left')
            {
                option.position = {
                    top: function(){  return -( option.size.height/2 ) + ( parH/2 ) + (oY) + 'px' },
                    left: function(){ return -( option.size.width ) + (oX) + 'px' }
                }
            }
            else if(option.tooltip.position == 'right')
            {
                option.position = {
                    top: function(){  return -( option.size.height/2 ) + ( parH/2 ) + (oY) + 'px' },
                    left: function(){ return parW + (oX) + 'px' }
                }
            }

            if( !trigger.parent().hasClass('jsPanel-tooltip-wrapper') )
            {
                // wrap element serving as trigger in a div - will take the tooltip
                trigger.wrap( '<div class="jsPanel-tooltip-wrapper">' );

                if( option.tooltip.mode == 'semisticky' )
                {
                    jsPanel.hover(
                        function(){ $.noop() },
                        function(){ jsPanel.close() }
                    );
                }
                else if( option.tooltip.mode == 'sticky' )
                {
                    $.noop();
                }
                else
                {
                    option.controls.buttons = false;
                    // tooltip will be removed whenever mouse leaves trigger
                    trigger.mouseout(function(){
                        jsPanel.close();
                    })
                }

                // append tooltip (jsPanel) to the wrapper div
                trigger.parent().append( jsPanel );
            }
        }
        else
        {
            jsPanel.appendTo( this.first() );
        }

        /* option.rtl | default: false */
        if( option.rtl.rtl === true )
        {
            $( '.jsPanel-title, .jsPanel-content, .jsPanel-hdr-toolbar, .jsPanel-ftr', jsPanel ).attr( 'dir', 'rtl' );
            $( '.jsPanel-title', jsPanel ).css( 'text-align', 'right' );
            if( option.rtl.lang )
            {
                $( '.jsPanel-title, .jsPanel-content, .jsPanel-hdr-toolbar, .jsPanel-ftr', jsPanel ).attr( 'lang', option.rtl.lang );
            }
            $('.jsPanel-hdr-r-btn-close', jsPanel ).alterClass('jsPanel-hdr-r-btn-close', 'jsPanel-hdr-r-btn-min' );
            $('.jsPanel-hdr-r-btn-min', jsPanel ).eq(1).alterClass( 'jsPanel-hdr-r-btn-min', 'jsPanel-hdr-r-btn-close' );

            $( '.jsPanel-hdr-r', jsPanel ).css( 'float', 'left' );
            $( '.jsPanel-hdr-l', jsPanel ).css( 'float', 'right' );
        }

        /* option.id | default: false */
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
                var txt = $('.jsPanel-title', jsPanel).text();
                $('.jsPanel-title', jsPanel).html( txt + ' AUTO-ID: ' + jsPanel.attr('id' ) );
            }
        }
        else if( $.isFunction( option.id ) )
        {
            jsPanel.attr( 'id', option.id );
        }

        /* option.theme | default: 'light' - benutzt  jquery.alterclass.js von peteboere https://gist.github.com/peteboere/1517285 */
        jsPanel.alterClass( 'jsPanel-theme-*', 'jsPanel-theme-' + option.theme );
        $( '.jsPanel-hdr, .jsPanel-content, .jsPanel-ftr', jsPanel ).alterClass( 'jsPanel-theme-*', 'jsPanel-theme-' + option.theme );

        /* option.header */
        if( option.header == false )
        {
            // remove complete header section
            $( '.jsPanel-hdr', jsPanel ).remove();
        }
        /* option.controls (buttons in header right) | default: object */
        if( option.controls.buttons === 'closeonly' )
        {
            $( '.jsPanel-hdr-r-btn-min, .jsPanel-hdr-r-btn-max', jsPanel ).css('display', 'none');
        }
        else if( option.controls.buttons === false )
        {
            $( '.jsPanel-hdr-r-btn-min, .jsPanel-hdr-r-btn-max, .jsPanel-hdr-r-btn-close', jsPanel ).css('display', 'none');
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

        /* option.toolbarHeader | default: false */
        if( option.toolbarHeader && option.header == true )
        {
            configToolbar(  option.modal, option.toolbarHeader, '.jsPanel-hdr-toolbar', jsPanel );
        }

        /* option.toolbarFooter | default: false */
        if( option.toolbarFooter )
        {
            $( '.jsPanel-ftr', jsPanel ).css( { 'display':'block' } );
            // toolbar Elemente einfügen und konfigurieren
            configToolbar( option.modal,  option.toolbarFooter, '.jsPanel-ftr', jsPanel );
        }
        else
        {
            $( '.jsPanel-ftr', jsPanel ).remove();
        }
        if( option.rtl.rtl === true )
        {
            $( '.jsPanel-ftr button', jsPanel ).css( 'float', 'left' );
        }

        /* option.title | default: function - (Überschrift) des Panels */
        $( '.jsPanel-title', jsPanel ).prepend( option.title );

        /* option.overflow  | default: 'hidden' */
        if( typeof option.overflow === 'string' )
        {
            $( '.jsPanel-content', jsPanel ).css( 'overflow', option.overflow );
        }
        else if ( $.isPlainObject( option.overflow ) )
        {
            $( '.jsPanel-content', jsPanel ).css( { 'overflow-y':option.overflow.vertical, 'overflow-x':option.overflow.horizontal } );
        }

        /* option.draggable */
        // default-config für draggable steht in $.fn.jsPanel.defaults.draggable
        if( $.isPlainObject( option.draggable ) )
        {
            // wenn jsPanel ein childpanel ist ...
            if( jsPanel.parent().hasClass('jsPanel-content') )
            {
                option.draggable.containment = 'parent';
            }
            // draggable settings mergen und anwenden
            option.customdraggable = $.extend( true, {}, $.fn.jsPanel.defaults.draggable, option.draggable );
            jsPanel.draggable( option.customdraggable );
        }
        else if( option.draggable == 'disabled' )
        {
            // cursor zurücksetzen, weil draggable deaktiviert
            $('.jsPanel-hdr-l', jsPanel ).css( 'cursor', 'inherit' );
            // jquery ui draggable disabled initialisieren, damit Zustand abgefragt werden kann ( z.B. in minimize()/maximize() )
            jsPanel.draggable({ disabled: true });
        }

        /* option.resizable */
        // default-config für resizable steht in $.fn.jsPanel.defaults.resizable
        if( $.isPlainObject( option.resizable ) )
        {
            option.customresizable = $.extend( true, {}, $.fn.jsPanel.defaults.resizable, option.resizable );
            jsPanel.resizable( option.customresizable );
        }
        else if( option.resizable == 'disabled' )
        {
            // jquery ui resizable disabled initialisieren, damit Zustand abgefragt werden kann ( z.B. in minimize()/maximize() )
            jsPanel.resizable({ disabled: true });
        }

        /* PANEL CONTENT | default: false */
        /* option.content */
        // option.content kann auch eine Funktion (auch IIFE) oder ein jQuery Objekt sein, die den Inhalt zurückliefert
        $( '.jsPanel-content' , jsPanel ).append( option.content );

        /* option.load */
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

        /* option.ajax */
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
            if( option.size.width != 'auto' )
            {
                calcSize( 'width' );
            }
            /* CSS HEIGHT initialisieren und zuweisen wenn option.height kein string ist */
            if( option.size.height != 'auto' )
            {
                calcSize( 'height' );
            }
        }
        // calculate size values for width/height
        function calcSize( param )
        {
            if( $.isFunction( option.size[param] ) )
            {
                option.size[param] = option.size[param]( jsPanel );
            }
            else if( typeof option.size[param] == 'string' )
            {
                option.size[param] = option.size[param];
            }
            else if( $.isNumeric( option.size[param] ) )
            {
                option.size[param] = option.size[param];
            }
            else
            {
                option.size.height = $.fn.jsPanel.defaults.size[param];
            }
        }
        // set class for jsPanel-content depending on present header/toolbars
        // and adjust header height if necessary
        if( option.header == false && !option.toolbarFooter ) // kein header, keine toolbars
        {
            $('.jsPanel-content', jsPanel).addClass( 'jsPanel-resize0' );
        }
        else if( option.header && !option.toolbarHeader && !option.toolbarFooter ) // header, aber keine toolbars
        {
            $('.jsPanel-content', jsPanel).addClass( 'jsPanel-resize25' );
        }
        else if( option.header && option.toolbarHeader && !option.toolbarFooter ) // header + toolbarHeader, kein toolbarFooter
        {
            $('.jsPanel-content', jsPanel).addClass( 'jsPanel-resize46' );
            $('.jsPanel-hdr', jsPanel ).css('height', '46px');
        }
        else if( option.header == false && !option.toolbarHeader && option.toolbarFooter ) // nur toolbarFooter
        {
            $('.jsPanel-content', jsPanel).addClass( 'jsPanel-resize46' );
        }
        else if( option.header && !option.toolbarHeader && option.toolbarFooter ) // header + toolbarFooter, kein toolbarHeader
        {
            $('.jsPanel-content', jsPanel).addClass( 'jsPanel-resize71' );
        }
        else if( option.header && option.toolbarHeader && option.toolbarFooter ) // header + toolbarHeader + toolbarFooter
        {
            $('.jsPanel-content', jsPanel).addClass( 'jsPanel-resize92' );
            $('.jsPanel-hdr', jsPanel ).css('height', '46px');
        }

        /* css width & height des jsPanels setzen (ist hier erforderlich wenn manuell width & height gesetzt wurde) */
        jsPanel.css( { width: option.size.width, height: option.size.height + 25 + 'px' } );

        /* der folgende code block ermöglicht 'center' für top & left auch dann, wenn width und/oder height 'auto' sind */
        option.size.width = $( jsPanel ).outerWidth();
        option.size.height = $( jsPanel ).innerHeight();

        /* option.position | default: 'auto' */
        if( typeof option.position === 'string' )
        {
            option.position = rewriteOPosition(option.position);
        }

        if( $.isPlainObject( option.position ) )
        {
            if( option.position.top || option.position.top == 0 )
            {
                option.position = calcPositionParts( jsPanel, option.position, option.size, 'top', 'height', count, par );
            }
            else if( option.position.bottom  || option.position.bottom == 0 )
            {
                option.position = calcPositionParts( jsPanel, option.position, option.size, 'bottom', 'height', count, par );
            }

            if( option.position.left || option.position.left == 0 )
            {
                option.position = calcPositionParts( jsPanel, option.position, option.size, 'left', 'width', count, par );
            }
            else if( option.position.right || option.position.right == 0 )
            {
                option.position = calcPositionParts( jsPanel, option.position, option.size, 'right', 'width', count, par );
            }
        }

        /* CSS top, left, bottom, right, z-index des jsPanels setzen */
        if( option.position.top )
        {
            setCSS( 'top', winscrollTop() );
        }
        else if( option.position.bottom )
        {
            setCSS( 'bottom', winscrollTop() );
        }
        if( option.position.left )
        {
            setCSS( 'left', winscrollLeft() );
        }
        else if( option.position.right )
        {
            setCSS( 'right', winscrollLeft() );
        }
        // set css for top/left/bottom/right
        function setCSS( param, vari ){
            var panelID = jsPanel.attr('id');
            if( par == 'body' )
            {
                if( param == 'bottom' || param == 'right' )
                {
                    document.getElementById( panelID ).style[param] = parseInt( option.position[param] ) - vari + 'px';
                }
                else
                {
                    document.getElementById( panelID ).style[param] = parseInt( option.position[param] ) + vari + 'px';
                }
            }
            else
            {
                if( document.getElementById( panelID ) )
                {
                    document.getElementById( panelID ).style[param] = option.position[param];
                }
            }
        }

        if( $('.jsPanel-backdrop' ).length > 0 )
        {
            jsPanel.css('z-index', $('.jsPanel-backdrop' ).css('z-index') + 1 );
        }
        else
        {
            jsPanel.css( 'z-index', set_zi() );
        }

        /* option.autoclose | default: false */
        if( typeof option.autoclose == 'number' && option.autoclose > 0 )
        {
            var id = jsPanel.attr('id');
            window.setTimeout( function(){
                // func autoclose prüft erst ob es das el noch gibt
                autoclose( jsPanel, id );
            }, option.autoclose )
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
        $('.jsPanel-hdr-r-btn-close', jsPanel).on('click', function(e){
            e.preventDefault();
            jsPanel.close();
        });
        // jsPanel minimieren
        $('.jsPanel-hdr-r-btn-min, .jsPanel-hdr-r-btn-min *', jsPanel).on('click', function(e){
            e.preventDefault();
            jsPanel.minimize();
        });
        // jsPanel maximieren
        $('.jsPanel-hdr-r-btn-max', jsPanel).on('click', function(e){
            e.preventDefault();
            jsPanel.maximize();
        });



        /*
         * jsPanel properties ----------------------------------------------------
         */
        // define jsPanel property with panel content
        jsPanel.content = $( '.jsPanel-content', jsPanel );




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
                // und toolbarHeader height anpassen
                $( '.jsPanel-hdr-toolbar', this ).append( content ).parent().css( 'height', '46px' );
                // jsPanel-content height anpassen
                if( $( '.jsPanel-ftr', this ).length > 0 )
                {
                    $( '.jsPanel-content', this ).alterClass( 'jsPanel-resize*', 'jsPanel-resize92' );
                }
                else
                {
                    $( '.jsPanel-content', this ).alterClass( 'jsPanel-resize*', 'jsPanel-resize46' );
                }
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
            // if present remove tooltip wrapper
            if( this.parent().hasClass('jsPanel-tooltip-wrapper') )
            {
                this.unwrap();
            }
            // remove the jsPanel itself
            this.remove();

            var panelID = jsPanel.attr('id');
            $('body' ).trigger( 'onjspanelclosed', panelID );

            // backdrop entfernen
            $( '.jsPanel-backdrop' ).remove();
            // die minimierten Panels repositionieren
            for (var i = 0 ; i < count-1 ; i++){
                context.children('.minimized').eq(i).animate({ left: (i * 150) + 'px' });
            }

            return context;
        };

        // childpanels des jspanels löschen
        jsPanel.closeChildpanels = function()
        {
            $( '.jsPanel', this ).each(function(){
                var pID = $(this).attr('id');
                this.remove();
                $('body' ).trigger( 'onjspanelclosed', pID );
            });
            return this;
        };

        // jsPanel in den Fordergrund holen
        jsPanel.front = function()
        {
            this.css( 'z-index', set_zi() );
            return this;
        };

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
                // jsPanel bearbeiten
                this.alterClass( 'normalized maximized', 'minimized' )
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
                $( '.jsPanel-hdr-r-btn-max', this ).alterClass( 'normal', 'alternate' );
                // jsPanel in vorgesehenen Container verschieben
                jsPanel.appendTo( '#jsPanel-min-container' );
            }

            return this;
        };

        jsPanel.maximize = function()
        {
            if ( !this.hasClass('normalized') )
            {
                // jsPanel wieder in den Ursprungscontainer verschieben
                this.appendTo( this.data( 'parentElement' ) );
                // jsPanel restore position and size
                if( par == 'body' && option.restoreTo == 'top_left' )
                {
                    // only when jsPanel is appended to body-element AND option.restoreTo is set
                    this.animate({
                        // restore normalized size & an position top left
                        left:   winscrollLeft() + 10 + 'px',
                        top:    winscrollTop() + 10 + 'px',
                        width:  this.data( 'panelWidth' ),
                        height: this.data( 'panelHeight' )
                    });
                }
                else
                {
                    // restore normalized size & safed position
                    this.animate({
                        left:   this.data( 'panelLeft' ),
                        top:    this.data( 'panelTop' ),
                        width:  this.data( 'panelWidth' ),
                        height: this.data( 'panelHeight' )
                    });
                }
                this.alterClass( 'minimized maximized', 'normalized' );

                // Button Grafik austauschen
                $( '.jsPanel-hdr-r-btn-max', this ).alterClass( 'alternate', 'normal' );
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
                    this.animate( {left: winscrollLeft()+5+'px' , top: winscrollTop()+5+'px' , width: width , height: winouterHeight()-10+'px' } );
                }
                else
                {
                    // sonst
                    this.animate( {left: '5px' , top: '5px' , width: width , height: height} );
                }
                this.alterClass( 'minimized normalized', 'maximized' );
                // Button Grafik austauschen
                $( '.jsPanel-hdr-r-btn-max', this ).alterClass( 'normal', 'alternate' );
            }
            this.resizable( "enable" ).draggable( "enable" );

            // die minimierten panels repositionieren
            var count = $('.jsPanel.minimized').length;
            for (var i = 0; i < count; i++){
                var left = (i * 150) + 'px';
                $('.jsPanel.minimized').eq(i).animate({left: left});
            }

            return this;
        };

        // Speichert CSS-Werte in data-Property des jsPanels
        jsPanel.storeData = function( panel )
        {
            panel.data({
                'panelWidth':    panel.css( 'width' ),
                'panelHeight':   panel.css( 'height' ),
                'panelTop':      panel.css( 'top' ),
                'panelLeft':     panel.css( 'left' ),
                'parentElement': panel.parent()
            });
        };


        /*
         * PANEL EINBLENDEN .....
         *
         */
        var anim = option.show;
        if( anim.indexOf(" ") == -1 )
        {
            // wenn in anim kein Leerzeichen zu finden ist -> function anwenden
            jsPanel[anim](function(){
                // trigger custom event
                $( jsPanel ).trigger( 'onjspanelloaded', jsPanel.attr('id') );
            });
        }
        else
        {
            // sonst wird es als css animation interpretiert und die class gesetzt
            // does not work with certain combinations of type of animation and positioning
            jsPanel.css( { display:'block', opacity: 1 } )
                   .addClass( option.show )
                   .trigger( 'onjspanelloaded', jsPanel.attr('id') );
        }

        /* statusbar workaround to reduce height of toolbarFooter to 23px */
        if( option.statusbar && option.toolbarFooter )
        {
            if( option.toolbarHeader )
            {
                // if footer AND header toolbars are set
                $('.jsPanel-content', jsPanel ).alterClass( 'jsPanel-resize*', 'jsPanel-resize69' );
            }
            else
            {
                // if only a footer toolbar is set
                $('.jsPanel-content', jsPanel ).alterClass( 'jsPanel-resize*', 'jsPanel-resize48' );
            }
            $('.jsPanel-ftr', jsPanel).css( 'height', '23px' );
        }

        /* css bottom und/oder right in top und left wandeln */
        // ist notwendig, damit resizable und draggable ordentlich funktionieren wenn bottom oder right benutzt wird
        // positioning does not work correctly when this code is placed directly behind option.position
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
        "ajax":          false,
        "alert":         false,
        "autoclose":     false,
        "content":       false,
        "controls":      {
                             buttons:  true,
                             iconfont: false
                         },
        "draggable":     {
                             handle:  'div.jsPanel-hdr, div.jsPanel-ftr',
                             stack:   '.jsPanel',
                             opacity: 0.6
                         },
        "header":        true,
        "id":            function(){
                             $(this).first().uniqueId()
                         },
        "load":          false,
        "modal":         false,
        "overflow":      'hidden',
        "position":      'auto',
        "resizable":     {
                             handles:   'e, s, w, se, sw',
                             autoHide:  false,
                             minWidth:  150,
                             minHeight: 93
                         },
        "restoreTo":     false,
        "rtl":           {
                             rtl: false
                         },
        "show":          'fadeIn',
        "size":          {
                             width:  400,
                             height: 222
                         },
        "statusbar":     false,
        "theme":         'light',
        "title":         function(){
                             return 'jsPanel No ' + ( $('.jsPanel').length + 1 )
                         },
        "toolbarFooter": false,
        "toolbarHeader": false,
        "tooltip":       false
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

    // common settings for modal, tooltip, alert
    function commons_MTA( option, jsPanel, controls ){
        // draggable & resizable NICHT inizialisieren, nur close button einblenden, cursor
        option.resizable = false;
        option.draggable = false;
        option.controls.buttons = controls;
        $('.jsPanel-hdr, .jsPanel-hdr-l, .jsPanel-ftr', jsPanel ).css( 'cursor', 'default' );
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
                    var el = $( optionToolbar[i].item ),
                        type = el.prop('tagName');
                    if( typeof optionModal === 'string' && type == 'BUTTON' )
                    {
                        // set text of button
                        el.append( optionToolbar[i].btntext );
                        // add class to button
                        if( typeof optionToolbar[i].btnclass == 'string' ){
                            el.addClass( optionToolbar[i].btnclass );
                        }
                        else
                        {
                            el.addClass( 'btn-sm' );
                        }
                    }
                    $( cssToolbar, panel ).append( el );
                    el.bind( optionToolbar[i].event, optionToolbar[i].callback );
                }
            }
        }
    }

    // wandelt option.position string in objekt um
    function rewriteOPosition(op){
        if( op == 'center' ){
            op = { top: 'center', left: 'center' };
        }
        else if( op == 'auto' )
        {
            op = { top: 'auto', left: 'auto' };
        }
        else if( op == 'top left' ){
            op = { top: 0, left: 0 };
        }
        else if( op == 'top center' ){
            op = { top: 0, left: 'center' };
        }
        else if( op == 'top right' ){
            op = { top: 0, right: 0 };
        }
        else if( op == 'center right' ){
            op = { top: 'center', right: 0 };
        }
        else if( op == 'bottom right' ){
            op = { bottom: 0, right: 0 };
        }
        else if( op == 'bottom center' ){
            op = { bottom: 0, left: 'center' };
        }
        else if( op == 'bottom left' ){
            op = { bottom: 0, left: 0 };
        }
        else if( op == 'center left' ){
            op = { top: 'center', left: 0 };
        }
        return op;
    }

    // calculate position values for top/left/bootom/right
    function calcPositionParts( jsPanel, op, os, position, dimension, count, par ){
        /*
         * jsPanel = the jsPanel itself
         * op = option.position
         * os = option.size
         * position = the position part of option.position (top, left ...)
         * dimension = the size part of option.size (width or height)
         * count = Number of jsPanels present
         * par = the parent element of the jsPanel to be positioned
         */
        if( op[position] === 'center' )
        {
            if( par == 'body')
            {
                op[position] = ( $( window )[dimension]() - parseInt(os[dimension]) ) / 2 + 'px';
            }
            else
            {
                op[position] = ( jsPanel.parent()[dimension]() - parseInt(os[dimension]) ) / 2 + 'px';
            }
        }
        else if( op[position] === 'auto' )
        {
            op[position] = (25 * count + 10) + 'px';
        }
        else if( $.isFunction( op[position] ) )
        {
            op[position] = parseInt( op[position]( jsPanel ) ) + 'px';
        }
        else if( $.isNumeric( op[position] ) )
        {
            op[position] = op[position] + 'px';
        }
        else if( typeof op[position] == 'string' )
        {
            op[position] = op[position];
        }
        else
        {
            op[position] = (25 * count + 10) + 'px';
        }
        return op;
    }

    // wird in option.autoclose verwendet und prüft vor Anwendung von .close() ob es das jsPanel überhaupt noch gibt
    function autoclose( jsPanel, id ){
        var elmt = $('#' + id );
        if( elmt ){
            elmt.fadeOut('slow', function(){
                jsPanel.close(); // elmt geht hier nicht weil .close() nicht für elmt definiert ist
            });
        }
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
    var jsPanel_mbtn_ok      = '<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> </button>',
        jsPanel_mbtn_yes     = '<button type="button" class="btn btn-success"><span class="glyphicon glyphicon-ok"></span> </button>',
        jsPanel_mbtn_no      = '<button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> </button>',
        jsPanel_mbtn_cancel  = '<button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> </button>',
        jsPanel_mbtn_confirm = '<button type="button" class="btn btn-success"><span class="glyphicon glyphicon-ok"></span> </button>',
        jsPanel_mbtn_submit  = '<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> </button>',
        jsPanel_mbtn_close   = '<button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-off"></span> </button>',
        jsPanel_mbtn_login   = '<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-log-in"></span> </button>';

}( jQuery ));
