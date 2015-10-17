/**
 * alertify
 * An unobtrusive customizable JavaScript notification system
 *
 * @author Fabien Doiron <fabien.doiron@gmail.com>
 * @copyright Fabien Doiron 2013
 * @license MIT <http://opensource.org/licenses/mit-license.php>
 * @link http://fabien-d.github.com/alertify.js/
 * @module alertify
 * @version 0.5.0
 */
( function ( global ) {
    'use strict';

    /**
     * Use a closure to return proper event listener method. Try to use
     * `addEventListener` by default but fallback to `attachEvent` for
     * unsupported browser. The closure simply ensures that the test doesn't
     * happen every time the method is called.
     *
     * @param    {Node}     el    Node element
     * @param    {String}   event Event type
     * @param    {Function} fn    Callback of event
     * @return   {Function}
     */
    var on = ( function () {
        if ( document.addEventListener ) {
            return function ( el, event, fn ) {
                el.addEventListener( event, fn, false );
            };
        } else if ( document.attachEvent ) {
            return function ( el, event, fn ) {
                el.attachEvent( 'on' + event, fn );
            };
        }
    } () );

    /**
     * Use a closure to return proper event listener method. Try to use
     * `removeEventListener` by default but fallback to `detachEvent` for
     * unsupported browser. The closure simply ensures that the test doesn't
     * happen every time the method is called.
     *
     * @param    {Node}     el    Node element
     * @param    {String}   event Event type
     * @param    {Function} fn    Callback of event
     * @return   {Function}
     */
    var off = ( function () {
        if ( document.removeEventListener ) {
            return function ( el, event, fn ) {
                el.removeEventListener( event, fn, false );
            };
        } else if ( document.detachEvent ) {
            return function ( el, event, fn ) {
                el.detachEvent( 'on' + event, fn );
            };
        }
    } () );

    /**
     * Prevent default event from firing
     *
     * @param  {Event} event Event object
     * @return {undefined}
     */
    function prevent ( event ) {
        if ( event ) {
            if ( event.preventDefault ) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    }

    var transition = ( function () {
        var t, type;
        var supported = false;
        var el = document.createElement( 'fakeelement' );
        var transitions = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'otransitionend',
            'transition': 'transitionend'
        };

        for ( t in transitions ) {
            if ( el.style[ t ] !== undefined ) {
                type = transitions[ t ];
                supported = true;
                break;
            }
        }

        return {
            type: type,
            supported: supported
        };
    } () );

    /**
     * Base object for all dialog object
     *
     * @return {undefined}
     */
    var dialog = (function () {
        var CLASS_BASE = 'alertify';
        var CLASS_TYPE = CLASS_BASE + ' alertify--';
        var CLASS_COVER_SHOW = 'alertify-cover';
        var CLASS_COVER_HIDE = CLASS_COVER_SHOW + ' alertify-hidden';

        var btnOK = document.getElementById( 'alertifyButtonOk' );
        var btnCancel = document.getElementById( 'alertifyButtonCancel' );
        var btnFocusReset = document.getElementById( 'alertifyFocusReset' );
        var input = document.getElementById( 'alertifyInput' );
        var titleEl = document.getElementById( 'alertifyTitle' );
        var coverEl = document.getElementById( 'alertifyCover' );
        var btnWrapper = document.getElementById( 'alertifyButtons' );

        var isDialogOpen = false;

        var keys = {
            ENTER: 13,
            ESC: 27
        };

        var parent, transitionTimeout;

        // set tabindex attribute on body element this allows script to give it
        // focus after the dialog is closed
        document.body.setAttribute( 'tabindex', '0' );

        /**
         * Update HTML copy based on settings as passed message
         *
         * @return {undefined}
         */
        function build () {
            titleEl.innerHTML = parent.message;
            btnOK.innerHTML = parent.settings.ok;
            btnCancel.innerHTML = parent.settings.cancel;
            input.value = parent.value || '';
        }

        /**
         * Handle transitionend event listener since you can't set focus to
         * elements during the transition
         *
         * @return {undefined}
         */
        function handleTransitionEvent ( event ) {
            prevent( event );
            clearTimeout( transitionTimeout );
            setFocus();

            // allow custom `onfocus` method
            if ( typeof parent.onfocus === 'function' ) {
                parent.onfocus();
            }

            off( parent.el, transition.type, handleTransitionEvent );
        }

        /**
         * Set focus to proper dialog element
         *
         * @return {undefined} [description]
         */
        function setFocus ( reset ) {
            on( document.body, 'keyup', onKeyup );

            if ( parent.type === 'prompt' ) {
                input.focus();
                input.select();
            } else if ( reset ) {
                if ( parent.type === 'alert' ) {
                    btnOK.focus();
                } else {
                    btnWrapper.children[ 0 ].focus();
                }
            } else {
                switch ( parent.settings.focus ) {
                case 'ok':
                    btnOK.focus();
                    break;
                case 'cancel':
                    btnCancel.focus();
                    break;
                default:
                    btnOK.focus();
                }
            }
        }

        /**
         * Handle resetting focus
         *
         * @param  {Event} event Focus event
         * @return {undefined}
         */
        function onReset ( event ) {
            prevent( event );
            setFocus( true );
        }

        /**
         * Handle clicking OK
         *
         * @param  {Event} event Click event
         * @return {undefined}
         */
        function onOK ( event ) {
            prevent( event );
            parent.close();

            // allow custom `ok` method
            if ( typeof parent.ok === 'function' ) {
                parent.ok( input.value );
            }
        }

        /**
         * Handle clicking Cancel
         *
         * @param  {Event} event Click event
         * @return {undefined}
         */
        function onCancel ( event ) {
            prevent( event );
            parent.close();

            // allow custom `cancel` method
            if ( typeof parent.cancel === 'function' ) {
                parent.cancel();
            }
        }

        /**
         * Handle keyboard shortcut
         *
         * @param  {Event} event Keyboard event
         * @return {undefined}
         */
        function onKeyup ( event ) {
            var keyCode = event.keyCode;

            if ( keyCode === keys.ENTER ) {
                onOK( event );
            }

            if ( keyCode === keys.ESC && /prompt|confirm/.test( parent.type ) ) {
                onCancel( event );
            }
        }

        // common dialog API
        return {
            /**
             * Main alertify dialog node.
             *
             * @type {Node}
             */
            el: document.getElementById( 'alertifyDialog' ),

            /**
             * Active element is the element that will receive focus after
             * closing the dialog. It defaults as the body tag, but gets updated
             * to the last focused element before the dialog was opened.
             *
             * @type {Node}
             */
            activeElement: document.body,

            /**
             * Customizable settings
             *
             * @type {Object}
             */
            settings: {
                ok: 'OK',
                cancel: 'Cancel',
                focus: 'ok'
            },

            /**
             * Check if dialog is currently open
             *
             * @return {Boolean}
             */
            isOpen: function () {
                return isDialogOpen;
            },

            /**
             * Show the dialog
             *
             * @return {undefined}
             */
            show: function () {
                if ( isDialogOpen ) {
                    return false;
                } else {
                    isDialogOpen = true;
                    parent = this;
                    build();

                    dialog.activeElement = document.activeElement;

                    on( btnOK, 'click', onOK );
                    on( btnCancel, 'click', onCancel );
                    on( btnFocusReset, 'focus', onReset );

                    if ( transition.supported ) {
                        on( this.el, transition.type, handleTransitionEvent );
                        // set 1s fallback in case transition event doesn't fire
                        clearTimeout( transitionTimeout );
                        transitionTimeout = setTimeout( handleTransitionEvent, 1000 );
                    }

                    coverEl.className = CLASS_COVER_SHOW;
                    this.el.className = CLASS_TYPE + this.type;

                    if ( !transition.supported ) {
                        setFocus();
                    }

                    // allow custom `onshow` method
                    if ( typeof this.onshow === 'function' ) {
                        this.onshow();
                    }

                    return true;
                }
            },

            /**
             * Close the dialog
             *
             * @return {undefined}
             */
            close: function () {
                off( btnOK, 'click', onOK );
                off( btnCancel, 'click', onCancel );
                off( document.body, 'keyup', onKeyup );
                off( btnFocusReset, 'focus', onReset );

                coverEl.className = CLASS_COVER_HIDE;
                this.el.className += ' alertify-close';

                dialog.activeElement.focus();

                isDialogOpen = false;

                // allow custom `onclose` method
                if ( typeof this.onclose === 'function' ) {
                    this.onclose();
                }
            }
        };
    } () );

    /**
     * Alert dialog object
     *
     * @param  {String} message Alert message
     * @return {Object}
     */
    function AlertifyAlert ( message ) {
        // alert properties
        this.message = message;
        this.type = 'alert';
    }

    // Add the common dialog functionality to the prototype
    AlertifyAlert.prototype = dialog;

    /**
     * Confirm dialog object
     *
     * @param  {String} message Confirm message
     * @return {Object}
     */
    function AlertifyConfirm ( message ) {
        // confirm properties
        this.message = message;
        this.type = 'confirm';
    }

    // Add the common dialog functionality to the prototype
    AlertifyConfirm.prototype = dialog;

    /**
     * Prompt dialog object
     *
     * @param  {String} message Prompt message
     * @return {Object}
     */
    function AlertifyPrompt ( message, value ) {
        // prompt properties
        this.message = message;
        this.value = value;
        this.type = 'prompt';
    }

    // Add the common dialog functionality to the prototype
    AlertifyPrompt.prototype = dialog;

    /**
     * Alertify public API
     * This contains everything that is exposed through the alertify object.
     *
     * @return {Object}
     */
    function Alertify () {
        return {
            /**
             * Expose dialog labels for customization
             * @type {Object}
             */
            settings: dialog.settings,

            /**
             * Display an alert dialog with an optional message and an OK button
             *
             * @param  {String} [message=undefined] Message in alert dialog
             * @return {Object}
             */
            alert: function ( message ) {
                return new AlertifyAlert( message );
            },

            /**
             * Display a confirm dialog with an optional message and two
             * buttons, OK and Cancel
             *
             * @param  {String} [message=undefined] Message in confirm dialog
             * @return {Object}
             */
            confirm: function ( message ) {
                return new AlertifyConfirm( message );
            },

            /**
             * Display a prompt dialog with an optional message prompting the
             * user to input some text
             *
             * @param  {String} [message=undefined] Message in confirm dialog
             * @param  {String} [value='']          Default value in input field
             * @return {Object}
             */
            prompt: function ( message, value ) {
                return new AlertifyPrompt( message, value );
            }
        };
    }

    // AMD and window support
    if ( typeof define === 'function' ) {
        define( [], function () {
            return new Alertify();
        } );
    } else if ( !global.alertify ) {
        global.alertify = new Alertify();
    }

} ( this ) );
