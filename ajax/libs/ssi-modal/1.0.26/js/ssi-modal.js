(function (root, factory) {
    //@author http://ifandelse.com/its-not-hard-making-your-library-support-amd-and-commonjs/
    if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        root.ssi_modal = factory(root.jQuery);
    }
}(this, function ($) {
    var animationSupport = checkAnimationSupport();
    var openedModals = 0;
    var sharedBackdrop = 0;
    var byKindShare = {
        stackModal: 0,
        normalModal: 0
    };
    var uniqueId = 0;
    var orphanBackdrop = false;

    /**
     * @constructor
     * @param {object} options
     * @return
     */
    var Ssi_modal = function (options) {
        /**
         * @namespace
         * @property {object}  defaults               - The default options.
         * @property {string}  defaults.content       - The main content of the modal.
         * @property {boolean|(boolean|'shared'|'byKindShared')}  defaults.backdrop      - Enables disables the back drop. The shared option defines that the modal will open a back drop only if there is not anyone already in the dom.              * The byKindShared is similar to the shared but the already rendered backdrop must belong to the same kind of modals (normal modal,stack modal,imgBox modal) else will open new.
         * @property {boolean}  defaults.outSideClose      - Close the modal when you click outside.
         * @property {boolean}  defaults.bodyScroll    - Enables/disables the scroll bar of the document when the modal is opened.
         * @property {boolean}  defaults.closeIcon      - Show/hide the close button
         * @property {boolean}  defaults.keepContent   - Forces the modal to remove or not the content when it close.It not associated with stack modals
         * @property {function}  defaults.beforeShow      - Callback when the modal opens.
         * @property {function}  defaults.onShow      - Callback when the modal opens.
         * @property {function}  defaults.beforeClose      - Callback when the modal closes.
         * @property {function}  defaults.onClose      - Callback when the modal closes.
         * @property {'right top'|'right bottom'|'left top'|'left bottom'|'center top'|'center bottom'}  defaults.position   - Sets the position of the modals.
         * @property {boolean}  defaults.stack         - Make the modal a part of stack.For example toast/notification messages. Requires position.
         * @property {boolean}  defaults.onClickClose  - Enables/Disables the ability to close the modal when you click in the main window.
         * @property {string}  defaults.className      - Defines a class to the modal outer element.
         * @property {string}  defaults.backdropClassName      - Defines a class to the backdrop element.
         * @property {object}  defaults.preview      - Set the options and the state of a modal according to the preview
         * @property {boolean} defaults.preview.icon - Generate an icon that allows the user to change display state
         * @property {boolean} defaults.preview.hideIcons - Enables/disables the ability to hide the modal after a certain time when the modal is in fullScreen state.
         * @property {'fullScreen' | 'normal'}  defaults.preview.state - The state tha the modal will have when opens.
         * @property {object | 'false'}  defaults.closeAfter
         * @property {number}  defaults.closeAfter.time      - After the defined time the modal will close.
         * @property {boolean}  defaults.closeAfter.displayTime      - Display the in a span with class="ssi-displayTime" that you must set. In example <span class="ssi-displayTime"></span> .
         * @property {boolean}  defaults.closeAfter.resetOnHover      -Reset the time that modal will close.

         * @property {object}   defaults.iframe      - Options for iframe.
         * @property {boolean}  defaults.iframe.allowFullScreen      - The default treasure.
         * @property {string}   defaults.iframe.className      - Set a
         * @property {boolean}  defaults.center      - Element centering.Not associated with positioned modals
         * @property {boolean || string}  defaults.animation      - Enables/disables animations if you set a string all animation type will be set to that sting.
         * @property {object || string || boolean}  defaults.modalAnimation      - Set the animations for the modal window.
         * @property {string || boolean}  defaults.modalAnimation.show      - The animation tha start when the modal opens.
         * @property {string || 'boolean}  defaults.modalAnimation.hide      - The animation tha start when the modal closes.
         * @property {boolean}  defaults.backdropAnimation      - Set the animations for modal the back drop.
         * @property {string || boolean}  defaults.backdropAnimation.show      - The animation tha start when the backdrop appears.
         * @property {string || 'boolean}  defaults.backdropAnimation.hide      - The animation tha start when the modal closes.
         * @property {Object[]}  defaults.buttons      - The buttons of modal.
         * @property {'button' || 'link'}  defaults.buttons.type      - The type of button.
         * @property {keycode}  defaults.buttons.keyPres      - Registers a keypress event  that will trigger the button's click method.
         * @property {boolean}  defaults.buttons.className    - Defines a class to the button element.
         * @property {number||false}  defaults.buttons.enableAfter      - Disables the button.if set a number the button will be enable after that time in seconds.
         * @property {string}  defaults.buttons.id      - Defines an id to the button element.
         * @property {string}  defaults.buttons.label      - The text of the button.
         * @property {object || string || boolean}  defaults.buttons.modalAnimation      - Changes the animations of the modal.
         * @property {object}  defaults.buttons.modalAnimation.show      - If you set this the next modal will open with this animation.
         * @property {object}  defaults.buttons.modalAnimation.hide      - It changes the current modal hide animation.
         * @property {object || string || boolean}  defaults.buttons.backdropAnimation      - Changes the animations of the backdrop.
         * @property {object}  defaults.buttons.backdropAnimation.show      - If you set this the next backdrop will open with this animation.
         * @property {object}  defaults.buttons.backdropAnimation.hide      - It changes the current backdrop hide animation.
         * @property {boolean}  defaults.iconButtons      - Register a new icon in the top of the modal( where the x button is).You can modify it only with css using content and background properties.
         * @property {boolean}  defaults.iconButtons.className      - Defines a class name to the element.
         * @property {boolean}  defaults.iconButtons.method      - The function that will be fired when you press the icons.This function has access to the event object and the modal's object (ie function(event,modal){})
         * @property {boolean}  defaults.title      - The title of the modal.
         * @property {string}  defaults.sizeClass      - Defines the size of the modal.
         * @property {boolean}  defaults.fixedHeight      - If modal height is bigger than the screen the height of modal will be fixed and will fit the screen also the content will be scrollable.
         * @property {boolean}  defaults.fitScreen      - The modal min-height will be the height of screen.
         * @property {boolean}  defaults.navigation      - Enables/disables the navigation of imgBox.
         */

        /**
         * The unique id number of modal.
         * @type {number}
         */

        this.numberId = uniqueId;
        if (options.stack) {
            this.pluginName = 'stackModal';
        } else {
            this.pluginName = 'normalModal';
        }
        /**
         * The id of the backdrop.
         * @type {string}
         */
        this.backdropId = '';
        this.showbd = true;
        this.setOptions(options);
    };
    Ssi_modal.prototype.setOptions = function (options, value) {
        if (typeof options === 'object') {
            var defaults = {
                content: '',
                bodyScroll: false,
                keepContent: false,
                position: '',
                backdrop: true,
                stack: false,
                onClickClose: false,
                bodyElement: false,
                className: '',
                backdropClassName: '',
                preview: {
                    icon: false,
                    hideIcons: false,
                    state: 'normal'//full
                },
                closeAfter: false, // time: 4, displayTime:false, resetOnHover:true }
                outSideClose: true,
                onClose: '',
                onShow: '',
                beforeClose: '',
                beforeShow: '',
                iframe: {//{className,allowfullscreen}
                    allowFullScreen: true,
                    className: ''
                },
                center: false,
                closeIcon: true,
                navigation: false,
                sizeClass: 'medium',
                animation: false,
                modalAnimation: undefined,//{show:'',hide:''}
                backdropAnimation: undefined,//{show:'',hide:''}
                animationSpeed: 300,
                buttons: [], //[{className: 'btn btn-danger', enableAfter:3, id: '', label: 'Open', modalReverseAnimation:true backdropReverseAnimation:true closeAfter:{ clearTimeOut:true, keepContent:true, method: function(){ } } ]
                iconButtons: [],//[className:'',method:function(){}]
                title: '',
                fixedHeight: false,
                fitScreen: false
            };
            var modalObj = this;
            this.options = $.extend(true, defaults, options);
            this.options.iconButtons = toArray(this.options.iconButtons);
            if (this.options.preview.icon) {
                this.options.iconButtons.push({
                    className: 'ssi-displayIcon', method: function () {
                        modalObj.changePreviewState();
                    }
                })
            }
            if (this.options.closeIcon) {
                this.options.iconButtons.push({
                    className: 'ssi-closeIcon', method: function () {
                        modalObj.close();
                    }
                })
            }
            setAnimations(this);
        } else {
            this.options[options] = value;
            if (options === 'animation' || 'modalAnimation' || 'backdropAnimation') {
                setAnimations(this);
            }
        }
        return this;
    };
    /**
     * Initialize the modal and backdrop and expose them to the DOM
     * @returns {Ssi_modal}
     */
    Ssi_modal.prototype.init = function () {
        if (this.options.backdrop)
            this.backdropInit();
        this.modalInit();
        uniqueId++;
        return this;
    };

    /**
     * Returns the content element of the modal.
     * @returns {JQuery}
     */
    Ssi_modal.prototype.get$content = function () {
        return this.get$modal().find('#ssi-modalContent');
    };
    //returns the outer element of the modal (ie if we use stack modals will return the window object else will return the modalOuter)
    /**
     * Returns the modal element of the modal.
     * @returns {JQuery}
     */
    Ssi_modal.prototype.get$modal = function (id) {
        id = id || this.modalId;
        return this.$modal || $('#' + id);
    };
    /**
     * Returns the title element of the modal.
     * @returns {JQuery}
     */
    Ssi_modal.prototype.get$title = function () {
        return this.get$modal().find('#ssi-modalTitle');
    };
    Ssi_modal.prototype.destroyTitle = function () {
        this.get$title().remove();
        this.options.title = '';
        return this;
    };
    Ssi_modal.prototype.destroyContent = function () {
        this.get$content().remove();
        this.options.content = '';
        return this;
    };
    Ssi_modal.prototype.destroyButtons = function (type) {
        this.get$buttons(type).remove();
        this.options.buttons = [];
        return this;
    };
    Ssi_modal.prototype.destroyIcons = function () {
        this.get$icons().remove();
        this.options.icons = [];
        return this;
    };

    /**
     * Returns the title icons of the modal.
     * @returns {JQuery}
     */
    Ssi_modal.prototype.get$icons = function () {
        return this.get$modal().find('.ssi-topIcons');
    };

    /**
     * Returns the buttons element of the modal.
     * @returns {JQuery}
     */
    Ssi_modal.prototype.get$buttons = function (type) {
        type = type || 'buttons';
        return this.get$modal().find('#ssi-' + type);
    };
    /**
     * Returns the window element of the modal.
     * @returns {JQuery}
     */
    Ssi_modal.prototype.get$window = function () {
        return this.get$modal().find('#ssi-modalWindow');
    };

    /**
     * Returns the wrapper element of the modal.
     * @returns {JQuery}
     */
    Ssi_modal.prototype.get$wrapper = function () {
        if (this.options.stack) {
            return this.get$modal().parent();
        }
        return this.get$modal().find('#ssi-modalWrapper');
    };
    //returns the Outer element
    /**
     * Returns the outer element of the modal.
     * @returns {JQuery}
     */
    //returns the backdrop element
    /**
     * Returns the backdrop element of the modal.
     * @returns {JQuery}
     */
    Ssi_modal.prototype.get$backdrop = function () {
        return this.$backdrop || $('#' + this.backdropId);
    };

    var time = null;

    //get/exit full screen state
    /**
     * Changes the previe state of the modal
     * @returns {Ssi_modal}
     */
    Ssi_modal.prototype.changePreviewState = function () {
        var $modalOuter = this.get$modal();
        if (this.options.preview.state === 'fullScreen') {//if the current state is full
            $modalOuter.removeClass('ssi-fullScreen');//remove class
            this.options.preview.state = 'normal';//set state to normal
            $modalOuter.find('#ssi-modalContent').css("height", "");
            if (this.options.fixedHeight || this.options.fitScreen)
                this.setModalHeight();//set height again
            clearTimeout(time);
            $modalOuter.off('mousemove.ssi-modal');
        } else {//if current state is normal
            if (this.options.preview.hideIcons) {
                var $icons = $modalOuter.find('.ssi-topIcons');
                if (this.options.buttons)
                    var $buttons = $modalOuter.find('#ssi-buttons');//find the buttons area
                $modalOuter.on('mousemove.ssi-modal', function () {//register mousemove event
                    clearTimeout(time);
                    $icons.fadeIn();//show the icons
                    $buttons.slideDown();//and buttons
                    time = setTimeout(function () {//after 2 seconds
                        $buttons.slideUp();//hide them
                        $icons.fadeOut()
                    }, 2000)
                });
            }
            this.setModalHeight(40, 'height');         //set the height
            $modalOuter.addClass('ssi-fullScreen');
            this.options.preview.state = 'fullScreen';//change state to full
        }
        return this;
    };

    Ssi_modal.prototype.setPluginName = function (name) {
        this.pluginName = name;
        byKindShare[name] = 0;
        return this;
    };

    /**
     *  Initialize the content element if it is necessary and registers tha content.
     * @param {string} content  -The content of the element.
     * @param{'html' || 'append' || 'prepend} method    -The jquery method tha will use to register the content to the modal.
     * @returns {*}
     */
    Ssi_modal.prototype.setContent = function (content, method) {
        method = method || 'html';
        var $modalContent;
        if (this.options.content !== true) {
            $modalContent = $('<div id="ssi-modalContent" class="ssi-modalContent ' + (this.options.fixedHeight ? 'ssi-overflow ' : '') + '"></div>');
            if (this.options.content === '') {
                if (this.options.title === true) {
                    this.get$title().after($modalContent)
                } else {
                    this.get$window().prepend($modalContent);
                }
                this.setModalHeight();
            }
            this.options.content = true;
        } else {
            $modalContent = this.get$content();
        }
        var theContent = content;
        if (content instanceof $ && this.options.bodyElement === true) {
            if (this.options.extendOriginalContent === true) {
                var beforeClose = this.options.beforeClose;
                this.options.beforeClose = function (modal) {
                    var resume;
                    if (typeof  beforeClose === 'function')
                        resume = beforeClose(modal);
                    if (resume !== false) {
                        content.eq(0).after(modal.get$content().contents().unwrap().css('display', '')).remove();
                    } else {
                        return resume
                    }

                };
            }

            theContent = content.eq(0).clone();
            if (!theContent.is(":visible")) {
                theContent.show();
            }
        }
        $modalContent[method](theContent);

        return $modalContent
    };

    /**
     * Initialize the buttons element if it is necessary and registers tha buttons.
     * @param {object[]} buttons -The buttons that will be added to the element.
     * @param {string} area -The area that we'll append the buttons.
     * @returns {*}
     */
    Ssi_modal.prototype.setButtons = function (buttons, area) {
        var $buttonsArea, fixHeight = false;
        buttons = toArray(buttons);
        if (area !== false) {
            area = (typeof area !== 'undefined' ? $(area) : this.get$window());
            $buttonsArea = area.find('#ssi-buttons');
            $buttonsArea = $buttonsArea[0];
        }

        if (!$buttonsArea) {
            $buttonsArea = $('<div id="ssi-buttons" class="ssi-buttons"><div  id="ssi-leftButtons" class="ssi-leftButtons"></div><div id="ssi-rightButtons" class="ssi-rightButtons"></div></div>');
            if (area) {
                fixHeight = true;
                area.append($buttonsArea);
            }

            this.options.buttons = true;
        }
        var length = buttons.length;
        var $leftArea = $buttonsArea.find('#ssi-leftButtons');
        var $rightArea = $buttonsArea.find('#ssi-rightButtons');
        var leftAreaArray = [];
        var rightAreaArray = [];
        for (var i = 0, $btn; i < length; i++) {
            $btn = this.generateButton(buttons[i]);
            if (buttons[i].side === 'left') {
                leftAreaArray.push($btn);
            } else {
                rightAreaArray.push($btn);
            }
        }
        $leftArea.append(leftAreaArray);
        $rightArea.append(rightAreaArray);
        if (fixHeight)this.setModalHeight();
        return $buttonsArea;
    };
    /**
     * Helps to define the animations
     */
    var changeAnimations = function (animations, type) {
        switch (typeof animations) {
            case 'boolean':
                if (type === 'show') {
                    animations = (animations ? 'anim ssi-fadeIn' : 'ssi-show')
                } else {
                    animations = (animations ? 'anim ssi-fadeOut' : 'ssi-hidden')
                }
                break;
            case 'undefined':
                if (type === 'show') {
                    animations = 'ssi-show';
                } else {
                    animations = 'ssi-hidden';
                }
        }
        return animations
    };
    /**
     * Helps to define the animations
     */
    var setAnimations = function (modalObj) {
        var modalAnim = (modalObj.options.modalAnimation || modalObj.options.animation || false);
        var backdropAnim = (modalObj.options.backdropAnimation || modalObj.options.animation || false);
        var inAnim,
         outAnim;

        inAnim = changeAnimations((typeof modalAnim.show !== 'undefined' ? modalAnim.show : modalAnim), 'show');
        outAnim = changeAnimations((typeof modalAnim.hide !== 'undefined' ? modalAnim.hide : modalAnim), 'hide');
        modalObj.options.modalAnimation = {
            'show': inAnim,
            'hide': outAnim
        };

        inAnim = changeAnimations((typeof backdropAnim.show !== 'undefined' ? backdropAnim.show : backdropAnim), 'show');
        outAnim = changeAnimations((typeof backdropAnim.hide !== 'undefined' ? backdropAnim.hide : backdropAnim), 'hide');
        modalObj.options.backdropAnimation = {
            'show': inAnim,
            'hide': outAnim
        };
        if (animationSupport === false) {
            modalObj.options.modalAnimation = {
                'show': (modalObj.options.modalAnimation.show !== 'ssi-show' ? 'anim ssi-fadeIn' : 'ssi-show'),
                'hide': (modalObj.options.modalAnimation.hide !== 'ssi-hidden' ? 'anim ssi-fadeOut' : 'ssi-hidden')
            };
            modalObj.options.backdropAnimation = {
                'show': (modalObj.options.backdropAnimation.show !== 'ssi-show' ? 'anim ssi-fadeIn' : 'ssi-show'),
                'hide': (modalObj.options.backdropAnimation.hide !== 'ssi-hidden' ? 'anim ssi-fadeOut' : 'ssi-hidden')
            };
        }
    };
    /**
     * Register events and timer for closeAfter property
     * */
    var setCloseAfter = function (modalObj) {
        var $modal = modalObj.get$modal();
        modalObj.time = setTimeout(function () {

            modalObj.close();
        }, (modalObj.options.closeAfter.time * 1000));
        if (modalObj.options.closeAfter.displayTime && modalObj.options.title) {
            var $displayTime = $modal.find('span.ssi-displayTime').html(modalObj.options.closeAfter.time);
            updateTime(modalObj, $displayTime, function () {
                modalObj.$displayTime.remove()
            });
        }
        if (modalObj.options.closeAfter.resetOnHover) {
            $modal.on('mouseenter.ssi-modal', function () {
                clearTimeout(modalObj.time);
                if ($displayTime) {
                    $displayTime.html(modalObj.options.closeAfter.time);
                    clearInterval(modalObj.countDown);
                }
            });
            $modal.on('mouseleave.ssi-modal', function () {
                modalObj.time = setTimeout(function () {
                    modalObj.close();
                }, (modalObj.options.closeAfter.time * 1000));
                if (modalObj.options.closeAfter.displayTime && modalObj.options.title) {
                    updateTime(modalObj, $displayTime, function () {
                        $displayTime.parent().remove()
                    });
                }
            });
        }
    };
    /**
     * Initialize the backdrop and append it to the DOM
     *
     * @return {JQuery}
     */
    Ssi_modal.prototype.backdropInit = function () {
        var $backdrop;
        if (typeof orphanBackdrop === 'string') {//if an orphan backdrop exists
            var $orphanBackdrop = $('#' + orphanBackdrop);
            this.backdropId = orphanBackdrop;//change the id to the same as the new modal
            $backdrop = $orphanBackdrop.attr('class', 'ssi-backdrop ' + this.pluginName + ' ' + this.options.backdropClassName);
            this.showbd = false;
            orphanBackdrop = true;
        } else {
            $backdrop = $('<div id="ssi-backdrop' + this.numberId + '" class="ssi-backdrop ssi-hidden ' + (this.options.backdropClassName) + ' ' + this.pluginName + '"></div>');
            if (this.options.backdrop === 'shared' || this.options.backdrop === 'byKindShared') {
                var $sharedBackdrop;
                if (this.options.backdrop === 'byKindShared') {
                    $sharedBackdrop = $('.ssi-backdrop.ssi-openedDialog.' + this.pluginName);
                } else {
                    $sharedBackdrop = $('.ssi-backdrop.ssi-openedDialog');
                }
                if (!$sharedBackdrop[0]) {//check if backdrop already exists
                    $('body').append($backdrop);//if not , append one
                    this.backdropId = 'ssi-backdrop' + this.numberId;
                    this.showbd = true;
                } else {
                    this.backdropId = $sharedBackdrop.attr('id');
                    this.showbd = false;
                    $backdrop = $sharedBackdrop;
                }
            } else if (this.options.backdrop === true) {
                $('body').append($backdrop);
                this.backdropId = 'ssi-backdrop' + this.numberId;
                this.showbd = true;
            }
            this.$backdrop = $backdrop;
        }
        if (this.options.outSideClose && this.options.position) {//check for ie
            var modal = this;
            $backdrop.on('click.ssi-modal' + this.numberId, function (e) {
                e.preventDefault();
                modal.close();
            });
        }
        return $backdrop;
    };
    /**
     * Initialize the outer.
     * @return {JQuery}
     */
    var setOuter = function (modalObj) {
        return $('<div class="ssi-modalOuter ' + (modalObj.options.stack ? ' ssi-stack' : '' + modalObj.options.className) + (modalObj.options.center ? ' ssi-center ' : ' ') + ' ' + (modalObj.options.position ? ' ssi-modalPositioned ' + modalObj.options.position : '') + '"></div>');

    };

    /**
     * Initialize the wrapper.
     * @return $backdrop
     */
    var setWrapper = function (modalObj) {
        return $('<div id="ssi-modalWrapper" class=" ssi-modalWrapper ' + modalObj.options.sizeClass + '"></div>');

    };
    /**
     * Initialize the icons element if necessary and append the icons to the element.
     * @param {object[]} icons -The icons that will  append to the icons element.
     * @returns {jQuery}
     */
    Ssi_modal.prototype.setIcons = function (icons) {
        var $icons, iconArray = [];
        if (this.options.iconButtons !== true) {
            $icons = $('<div class="ssi-topIcons"></div>');
            this.options.iconButtons = true;
        } else {
            $icons = this.get$icons();
        }
        var modalObj = this;
        var iconsLength = icons.length;
        for (var i = 0, icon; i < iconsLength; i++) {
            icon = icons[i];
            (function (icon) {
                iconArray.push($('<a class="' + icon.className + '"></a>')
                 .click(function (e) {
                     e.preventDefault();
                     if (typeof icon.method === 'function') {
                         $.proxy(icon.method, this)(e, modalObj);
                     }
                 }))
            })(icon)
        }

        $icons.append(iconArray);
        return $icons;
    };
    /**
     * Initialize the window
     * @return {jQuery}
     */
    var setWindow = function (modalObj) {
        var $modalWindow = $('<div id="ssi-modalWindow" class="ssi-modalWindow ' + (modalObj.options.center ? modalObj.options.sizeClass : '') + (modalObj.options.stack ? ' ' + modalObj.options.sizeClass + ' ' + modalObj.options.className + ' ' : '') + '"></div>'),
         $modalContent = '',
         windowContent = [];
        if (modalObj.options.content) {
            $modalContent = modalObj.setContent(modalObj.options.content, 'html')
        }
        if (modalObj.options.title) {
            windowContent.push(modalObj.setTitle(modalObj.options.title));
        }
        if (modalObj.options.onClickClose) {
            $modalWindow.addClass('ssi-hover').click(function (e) {
                var $eTarget = $(e.target);
                if (!$eTarget.is('a') && !$eTarget.is('button')) {
                    modalObj.close();
                }
            })
        }
        if ((modalObj.options.iconButtons).length > 0) {
            windowContent.push(modalObj.setIcons(modalObj.options.iconButtons, true));
        }
        windowContent.push($modalContent);
        if (typeof modalObj.options.buttons !== 'undefined' && !$.isEmptyObject(modalObj.options.buttons)) {
            windowContent.push(modalObj.setButtons(modalObj.options.buttons, false));
        }
        $modalWindow.append(windowContent);
        return $modalWindow;
    };

    /**
     *Generates a button according to the options.
     * @param {object} buttonOptions -The button options.
     * @constructor
     * @returns {jQuery}
     */

    Ssi_modal.prototype.generateButton = function (buttonOptions) {
        var defaults = {
            className: '',
            enableAfter: false,
            method: function () {
            },
            type: 'button',
            focused: false,
            id: '',
            label: '',
            modalAnimation: '',
            backdropAnimation: ''
        };
        buttonOptions = $.extend({}, defaults, buttonOptions);
        var tag = 'button', href = '', modalObj = this, resume;
        if (buttonOptions.type === 'link') {//set tag type (<a> or <button>)
            tag = 'a';
            href = ' href="#"';
        }
        var $btn = $('<' + tag + href + (buttonOptions.id ? ' id="' + buttonOptions.id + '"' : ' ') + (buttonOptions.enableAfter ? 'disabled ' : '') + ' class="ssi-modalBtn ' + (buttonOptions.className || '') + '">'
         + buttonOptions.label +
         '</' + tag + '>');
        if (typeof buttonOptions.enableAfter === 'number') {
            var $count = $('<span class="ssi-countDown">' + buttonOptions.enableAfter + '</span>');
            updateTime(modalObj, $count, function () {
                $btn.removeClass('disabled');
                $btn.removeAttr('disabled');
                $count.remove();
            });
            $btn.append($count);
        }
//append button to selected object and set click event
        if (buttonOptions.keyPress) {
            $('body').on('keydown.ssi_modal', function (e) {
                if (e.keyCode == buttonOptions.keyPress && !$btn.is(':disabled')) {
                    $btn.trigger('click');
                }
            });
        }
        if (buttonOptions.focused) {
            setTimeout(function () {
                $btn.focus();
            }, 100)
        }
        return $btn.click(function (e) {
            e.preventDefault();
            if (buttonOptions.clearTimeOut) {
                clearTimeOut(modalObj);
            }
            if (typeof buttonOptions.method === 'function') {
                resume = $.proxy(buttonOptions.method, this)(e, modalObj);
            }
            if (resume === false) {
                return;
            }
            if (typeof buttonOptions.keepContent === 'boolean' && buttonOptions.keepContent !== modalObj.options.keepContent) {
                modalObj.options.keepContent = buttonOptions.keepContent; // change keepContent option according to button option
            }
            if (buttonOptions.closeAfter) {
                modalObj.close();
//finally close the modal if closeAfter option is true
            }
        });
    };
    /**
     * Initialize the modal and append it to the DOM
     */
    Ssi_modal.prototype.modalInit = function () {
        var $modalWindow = setWindow(this),
         modalObj = this;
        if (this.options.position) {
            if (this.options.stack) {
                var appendAction = 'append';
                if (this.options.position.indexOf('bottom') > -1) {//if we hava bottom position we want to prepend the window to appears in the top of stack
                    appendAction = 'prepend';
                }
                var position = this.options.position.replace(" ", '.');//change the spaces with dot to make it a class selector
                var positionedElement = $('div.ssi-modalOuter.ssi-stack' + '.' + position);
                if (positionedElement[0]) {//check if this element with this position exists to the dom.
                    positionedElement
                     .find('#ssi-modalWrapper')//if exists append the window to the dom.
                     [appendAction]($modalWindow);
                }
                this.$modal = $modalWindow;
            }
        }
        if (!this.options.stack || !positionedElement[0]) {//if not stack modal or the element with this position dont exist to the dom create and append one.
            var wrapper = setWrapper(this);
            var $modal = setOuter(this)
             .append(wrapper
              .append($modalWindow))
             .appendTo($('body'));
            if (!this.options.stack) {//if not stack give a unique id to the outer
                this.$modal = $modal;
                $modal.one('onShow.ssi-modal', function () {
                    if (modalObj.options.outSideClose === true) {
                        $modal.click(function (e) {
                            if (e.target === this) {
                                e.preventDefault();
                                modalObj.close();
                            }
                        });
                        wrapper.click(function (e) {
                            if (e.target === this) {
                                e.preventDefault();
                                modalObj.close();
                            }

                        });
                    }
                })

            }
        }
        this.modalId = 'ssi-' + this.pluginName + this.numberId;
        (this.$modal).attr('id', 'ssi-' + this.pluginName + this.numberId);
        (this.$modal).addClass(this.pluginName + ' ssi-modal');
        this.$modal.data('ssi-modal', this).addClass('ssi-hidden');
        if (typeof orphanBackdrop === 'string')this.backdropInit();
        return this.$modal;
    };
    /**
     * Appends title to the modal.
     * @param {string} title
     * @return $title
     */
    Ssi_modal.prototype.setTitle = function (title) {
        var $title, fixHeight = false;
        if (this.options.title !== true) {
            $title = $('<div id="ssi-modalTitle" class="ssi-modalTitle ' + (!this.options.content ? 'ssi-borderOut ' : '') + '">' + this.options.title + '</div>');
            if (this.options.title === '') {
                this.get$window().prepend($title);
                fixHeight = true;
            }
            this.options.title = true;
        } else {
            $title = this.get$title();
        }
        $title.html(title);
        if (fixHeight)this.setModalHeight();
        return $title;
    };

    Ssi_modal.prototype.showModal = function () {
        var $modal = this.get$modal(),
         modalObj = this;

        setTimeout(function () {
            $modal.trigger("beforeShow.ssi-modal");//trigger show event
        }, 0);
        if (this.options.bodyScroll === false) {
            $('body').addClass('ssi-modalOpen');//add this class to body to disable scrollbar
            openedModals++;//calculate open modals
        }
        if (this.options.backdrop === 'shared') {
            sharedBackdrop++;
        } else if (this.options.backdrop === 'byKindShared') {
            byKindShare[this.pluginName]++
        }

        $modal.addClass('ssi-openedDialog');
        var callback = function () {
            $(this).removeClass('ssi-hidden');
            if (typeof modalObj.options.onShow === 'function') {
                modalObj.options.onShow(modalObj);//execute onShow callback
            }
            setTimeout(function () {
                $modal.trigger("onShow.ssi-modal");//trigger show event);
            }, 0);
        };
        $modal.addAnimation(this.options.modalAnimation.show, function () {
            callback();
        }).removeClass('ssi-hidden');
        if (this.options.center) {
            $modal.css('display', '');
        }
        if (modalObj.options.preview.state === 'fullScreen') {//if the default state is fullscreen
            modalObj.options.preview.state = 'normal';
            modalObj.changePreviewState();
        }

        this.setModalHeight();

        if (typeof this.options.closeAfter.time === 'number') {
            setCloseAfter(this)
        }
        delete this.$modal;

    };

    /**
     * Opens the modal.
     * @return {Ssi_modal}
     */
    Ssi_modal.prototype.showBackdrop = function () {
        var modalObj = this;
        var $backdrop = this.get$backdrop().addClass('ssi-openedDialog');

        $backdrop.addAnimation(this.options.backdropAnimation.show).removeClass('ssi-hidden');

        delete this.$backdrop;
    };

    Ssi_modal.prototype.show = function () {

        if (typeof this.options.beforeShow === 'function') {
            var resume = this.options.beforeShow(this);
            if (resume === false) {
                return this;
            }
        }

        this.showModal();

        if (orphanBackdrop === false && this.options.backdrop && this.showbd === true) {
            this.showBackdrop();
        }

        return this;
    };

    /**
     * Closes the modal
     * @return {Ssi_modal}
     */
    Ssi_modal.prototype.destroyBackdrop = function () {
        var $backdrop = this.get$backdrop(), modalObj = this;
        if (this.options.keepContent !== true) {
            $backdrop.off('click.ssi-modal' + this.numberId);
        }
        var thisS = this
        var closeBack = function () {
            if ((thisS.options.backdrop === true || (    (   ( thisS.options.backdrop === 'shared' && sharedBackdrop < 1) || ( thisS.options.backdrop === 'byKindShared' && byKindShare[thisS.pluginName] < 1)  ) && ( (!thisS.get$modal(thisS.modalId.replace(thisS.numberId.toString(), thisS.backdropId.replace('ssi-backdrop', '')))[0]) || thisS.backdropId.replace('ssi-backdrop', '') == thisS.numberId))  )) {//thisS maybe blow your mine
                var closeBackdrop = function () {//thisS will execute when the hide animation end
                    $backdrop.addClass('ssi-hidden').removeClass('ssi-openedDialog');
                    $backdrop.trigger('backdropClose.ssi-modal');
                    if (modalObj.options.keepContent !== true) $backdrop.remove();//remove backdrop if keepContent option is false
                };
                $backdrop.addAnimation(thisS.options.backdropAnimation.hide, closeBackdrop);
            }
            if (orphanBackdrop === thisS.backdropId) {
                orphanBackdrop = false;
            }
        }
        if (this.options.stack && this.options.outSideClose) {
            setTimeout(closeBack, 10);
        } else {
            closeBack()
        }
        return this;
    };

    Ssi_modal.prototype.destroyModal = function () {
        var $modal = this.get$modal(),
         modalObj = this;
        $modal.off('.ssi_modal');
        $modal.trigger("beforeClose.ssi-modal"); //trigger close event
        if (this.options.backdrop === 'shared') {
            sharedBackdrop--;
        } else if (this.options.backdrop === 'byKindShared') {
            byKindShare[this.pluginName]--;
        }

        if ($modal.hasClass('ssi-openedDialog')) {
            $modal.removeClass('ssi-openedDialog');
            if (this.options.bodyScroll === false) {
                openedModals--;// downgrade opened modals
            }
        }

        var closeModal = function () {//this will execute as a callback when the hide animation end
            $modal.addClass('ssi-hidden');
            if (modalObj.options.stack) {
                $modal.addClass('ssi-smoothSlide').slideUp('500', function () {
                    $modal.removeClass('ssi-smoothSlide');
                    $modal.trigger("onClose.ssi-modal"); //trigger close event
                    if (modalObj.options.keepContent !== true) $modal.remove();//will remove modal from DOM if keepContent option is false

                });
            } else {
                $modal.trigger("onClose.ssi-modal"); //trigger close event
                if (modalObj.options.keepContent !== true)$modal.remove();//will remove modal from DOM if keepContent option is false
            }
            if (typeof modalObj.options.onClose === 'function')
                modalObj.options.onClose(modalObj);//execute onClose callback

            if (modalObj.options.keepContent !== true) {
                $modal.off('.ssi-modal').find('#ssi-modalWrapper').off('.ssi-modal');
            }
        };

        //close the modal window
        $modal.addAnimation(this.options.modalAnimation.hide, closeModal);
        this.options.icons = [];
        this.options.buttons = [];
        this.options.content = '';
        this.options.title = '';
        orphanBackdrop = this.backdropId;
        return this;
    };

    Ssi_modal.prototype.close = function () {
        if (typeof this.options.beforeClose === 'function') {
            var resume = this.options.beforeClose(this);
            if (resume === false) {
                return this;
            }
        }
        var $body = $('body');
        $body.off('.ssi_modal');

        this.destroyModal();
        this.destroyBackdrop();

        if (openedModals < 1) {//if no more modals left remove class from body and off events
            $body.removeClass('ssi-modalOpen');
        }
        clearTimeOut(this);
        return this;
    };

//calculates modals height
    /**
     * Sets the height of the modal
     * @method setModalHeight
     * @param {number} offset -Add more offset to the modal.
     * @param {'height'||'min-height'||'max-height'} option -Force the function to excecute.
     * @param {object} $content -The $content object of modal.
     * @return
     */
    Ssi_modal.prototype.setModalHeight = function (offset, option) {
        if (!this.options.fitScreen && !this.options.fixedHeight && !option) {
            return this;
        }

        if (typeof offset !== 'number') {
            offset = 100;
        }

        var $content = this.get$content();
        var windowHeight = $(window).height(),
         btnsHeight = 0, titleHeight = 0;
        if (this.options.buttons)
            btnsHeight = $content.next().innerHeight();
        if (this.options.title)
            titleHeight = this.get$title().innerHeight();
        var totalHeight = btnsHeight + titleHeight + offset,
         optionsOffset = 0;
        if (!option) {

            if (this.options.fitScreen && this.options.fixedHeight) {
                if (typeof this.options.fitScreen === 'number') {
                    optionsOffset = Math.abs((this.options.fitScreen + this.options.fixedHeight) / 2 - offset);
                }
                $content.css('height', windowHeight - totalHeight - optionsOffset); //add more margin down
            } else {
                if (this.options.fitScreen) {
                    if (typeof this.options.fitScreen === 'number') {
                        optionsOffset = Math.abs(this.options.fitScreen - offset);
                    }
                    $content.css('min-height', windowHeight - totalHeight - optionsOffset); //add more margin down
                }
                if (this.options.fixedHeight) {
                    optionsOffset = 0;
                    if (typeof this.options.fixedHeight === 'number') {
                        optionsOffset = Math.abs(this.options.fixedHeight - offset);
                    }
                    $content.css('max-height', (windowHeight - totalHeight - optionsOffset)); //add more margin down
                }
            }

        } else if (typeof option === 'string') {
            $content.css(option, (windowHeight - totalHeight)); //add more margin down
        }
        return totalHeight;
    };
    /**
     * Clears the timeout
     */
    var clearTimeOut = function (modalObj) {
        clearTimeout(modalObj.time);
        modalObj.time = null;
        clearInterval(modalObj.countDown);

    };

    /**
     * Updates the text of an element
     * @param {Ssi_modal} modalObj
     * @param {JQuery} $target -the element that will be updated
     * @param {function} callback -The function that will execute when the time expires;
     */
    var updateTime = function (modalObj, $target, callback) {
        var doUpdate = function () {
            var count = parseInt($target.html());
            if ((count - 1) !== 0) {
                $target.html(count - 1);
            } else {
                if (callback)
                    callback();
                clearInterval(modalObj.countDown);
            }
        };
        modalObj.countDown = setInterval(doUpdate, 1000);
    };

//--------------------------------------------------------------------------------------------------------------

    /**
     * Creates a new modal window.
     * @param {object} options -The options of the modal
     * @param {string} element -The id or class name om the element that trigger the modal.
     * @return {Ssi_modal}
     */

    /**
     * @author http://stackoverflow.com/a/8015864/4801797
     */
    $.fn.extend({
        hasClasses: function (selectors) {
            var self = this;
            for (var i in selectors) {
                if ($(self).hasClass(selectors[i]))
                    return true;
            }
            return false;
        }
    });

    var ssi_modal = {
        checkElement: function (element) {
            var $element = $(element);
            if ($element[0]) {
                var data = $element.data('ssi-modal');//then check if object exists in data-ssi-modal
                if (data) {
                    if (!$('#' + data.modalId)[0]) {// if data exists but no modal exists(probably removed by button)
                        $element.data('ssi-modal', '');//then remove data-ssi-modal
                        return false
                    }
                }
            }
            if (data) {
                return data
            } else {
                return false;
            }
        },
        createObject: function (options, element) {
            var $element, obj, data;
            if (typeof element !== 'undefined') { //this means that we use jquery method(see line 406)
                $element = $(element);
                data = $element.data('ssi-modal');//then check if object exists in data-ssi-modal
            } else {
                options.keepContent = false;
            }
            if (data) {
                obj = data
            } else {
                obj = new Ssi_modal(options);
                if (typeof element !== 'undefined') {
                    $element.data('ssi-modal', obj);// save the object to the target
                }
            }
            return obj;
        },
        /**
         * Opens the modal
         * @param {object} options -The options of the modal.
         * @param {string} element -The id or class name om the element that trigger the modal.
         *@returns {Ssi_modal}
         */
        show: function (options, element) {
            var obj = false;
            if (element) {
                obj = this.checkElement(element);
            }
            if (obj === false) {
                return this.createObject(options, element).init().show();
            } else if (typeof obj === 'object') {
                return obj.show();
            }

        },
        /**
         * Closes the targeted modal or the very top
         * @param {string} $target
         */
        close: function ($target) {
            if (!$target) {
                var modal = $('.ssi-modalOuter');
                $target = modal.eq(modal.length - 1);
            }
            return $target.data('ssi-modal')
             .close();
        },
        /**
         * Closes all or a group of modals.
         * @param {'normalModal'||'pluginName'} group
         * @param {className} except -The modal with this class will not close
         */
        proto: Ssi_modal.prototype,
        closeAll: function (group, except) {//close all opened modal with the right order and all callbacks will execute normally
            except = toArray(except);
            var $activeModals;
            var groupVarType = typeof group;
            if ((groupVarType === 'string' && group !== '') || groupVarType === 'array') {
                group = toArray(group);
                var groupLength = group.length;
                for (var i = 0; i < groupLength; i++) {
                    $activeModals = $('.ssi-modal.ssi-openedDialog.' + group[i]);
                    close($activeModals);
                }
            } else {
                $activeModals = $('.ssi-modal.ssi-openedDialog');
                close($activeModals);
            }

            function close($modals) {
                var modalsLength = $modals.length;
                for (var i = modalsLength - 1; i >= 0; i--) {
                    var $modal = $modals.eq(i);
                    if (!$modal.hasClasses(except)) {
                        $modal.data('ssi-modal').close();
                    }

                }
            }
        },
        /**
         * Remove immediately all the modals from the dom. No modal callbacks will execute.
         * @param {function} callback -Just a callback
         */
        removeAll: function () {//close all opened modal no callbacks and no keepContent will execute you can determine one callback
            $('.ssi-modalOuter').addClass('ssi-hidden').remove();
            $('.ssi-backdrop').addClass('ssi-hidden').remove();
            $('body').removeClass('ssi-modalOpen');
            openedModals = 0;
            sharedBackdrop = 0;
            byKindShare = {
                stackModal: 0,
                normalModal: 0
            };
            uniqueId = 0;
        }
    };

//-----------------------------Start of confirm plugin------------------------------------------------------------------

    ssi_modal.dialog = function (options, method) {
        var defaults = {
            sizeClass: 'dialog',
            okBtn: {
                className: '',
                label: 'Ok'
            },
            title: '',
            closeIcon: false,
            outSideClose: false
        };
        options.okBtn = $.extend({}, defaults.okBtn, options.okBtn);
        options = $.extend({}, defaults, options);
        options.buttons = [{
            className: options.okBtn.className,
            label: options.okBtn.label,
            closeAfter: true,
            method: method
        }];
        return new Ssi_modal(options).init().show();
    };

    //-----------------------------End of dialog plugin------------------------------------------------------------------

//-----------------------------Start of confirm plugin------------------------------------------------------------------

    ssi_modal.confirm = function (options, method) {
        var defaults = {
            okBtn: {
                className: '',
                label: 'Ok'
            },
            cancelBtn: {
                className: '',
                label: 'Cancel'
            },
            closeIcon: false,
            sizeClass: 'dialog',
            title: '',

            outSideClose: false
        };
        options.okBtn = $.extend({}, defaults.okBtn, options.okBtn);
        options.cancelBtn = $.extend({}, defaults.cancelBtn, options.cancelBtn);
        options = $.extend({}, defaults, options);
        options.buttons = [{
            className: options.okBtn.className,
            label: options.okBtn.label,
            closeAfter: true,
            method: function (e, modal) {
                if (typeof method === 'function')
                    method(true, e, modal);
            }
        }, {
            className: options.cancelBtn.className,
            label: options.cancelBtn.label,
            closeAfter: true,
            method: function (e, modal) {
                if (typeof method === 'function')
                    method(false, e, modal);
            }
        }];
        return new Ssi_modal(options).init().show();
    };

    //--------------------------------End of confirm plugin--------------------------------------------------

//-----------------------------Start of imgBox plugin------------------------------------------------------------------
    function isDataURL(s) {
        return !!s.match(isDataURL.regex);
    }

    isDataURL.regex = /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

    var imgBoxOptions = {'ssi-mainOption': {}};//this will hold the imgbox options when will call ssi_modal.imgBox function
    ssi_modal.imgBox = function (options, group) {//set options for the image box
        group = group || 'ssi-mainOption';
        imgBoxOptions[group] = $.extend({}, imgBoxOptions['ssi-mainOption'], options);
    };

    var currentIndex,
     $elementsLength,
     $eventTarget;

    /**
     *  Navigates to the next/previous image.
     * @param {'next' || 'prev'} direction -The navigation direction
     * @returns {Ssi_modal}
     */
    ssi_modal.proto.navigate = function (direction) {
        var $groupElements = $('a[data-ssi_imgGroup="' + $eventTarget.attr('data-ssi_imgGroup') + '"]');
        if (!currentIndex)currentIndex = $groupElements.index($eventTarget);
        if (!$elementsLength)$elementsLength = $groupElements.length;
        if ((direction === 'next' && currentIndex + 1 >= $elementsLength) || (direction === 'prev' && currentIndex < 0)) {
            return this;
        }

        this.destroyModal();
        if (direction === 'next') {//next image
            currentIndex++;
        } else if (direction === 'prev') {//previous image
            currentIndex--;
        }
        $groupElements.eq(currentIndex).trigger('click.ssi-imgBox');
        return this;
    };

    ssi_modal.imgBox.show = function (url, options) {
        var defaults = {//set defaults
            backdrop: 'byKindShared',
            fixedHeight: true,
            navigation: true,
            closeIcon: true,
            title: false,
            allowIframe:true,
            hideImgButtons: true
        };
        options = $.extend(true, defaults, options);
        $.extend(options, {
            img: true,
            content: '<div class="ssi-loader"></div>',
            sizeClass: ''
        });
        var imgBox = ssi_modal.createObject(options)
         .setPluginName('imgBox');
        imgBox.imgUrl = url;
        imgBox.imgTitle = options.title;
        imgBox.init();
        if (options.title) {
            imgBox.get$icons().addClass('inTitle');
        }

        imgBox.show();
        setImg(imgBox, url);

    };
    $('body').on('click.ssi-imgBox', 'a.ssi-imgBox', function (e) {//click event handler for all links with ssi-imgbox class
        e.preventDefault();
        e.stopPropagation();
        $eventTarget = $(e.currentTarget);
        var group = $eventTarget.attr('data-ssi_imgGroup') || 'ssi-mainOption';//get the options of the right group
        var options = imgBoxOptions[group] || imgBoxOptions['ssi-mainOption'];
        var url = $eventTarget.attr('href');
        if (options.imgButtons !== '' && !$.isEmptyObject(options.imgButtons)) {
            for (var i = 0; i < options.imgButtons.length; i++) { //check if the current button is in the exclude list
                if (options.imgButtons[i].exclude) {
                    var btnClass = options.imgButtons[i].exclude.split(',');
                    for (var y = 0; y < btnClass.length; y++) {
                        if ($eventTarget.hasClass(btnClass[y])) {
                            options.imgButtons.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
        if (options.title) {
            if (options.title === true) {
                options.title = $eventTarget.attr('title');//get title of the target
            }
        }
        ssi_modal.imgBox.show(url, options, $eventTarget);
    });

    function setImg(imgBox, url) {

        var $modalWrapper = imgBox.get$wrapper(),
         $content = $modalWrapper.find('#ssi-modalContent');
        if (!url || url == '#') {
            var alt = ($eventTarget ? $eventTarget.attr('data-alt') : '');
            $img = '<h3>Image not found</h3><br>' + (typeof alt !== 'undefined' ? '<h4>' + alt + '</h4>' : '');
            placeImg(true);
            return;
        }
        var interval,
         startInterval,
         supportsNatural = ("naturalWidth" in (new Image())),
         windowHeight = $(window).height(),
         windowWidth = $(window).width(),
         $img = [''],
         i = 0;
        if (imgBox.options.navigation && $eventTarget) {
            $content.append(setImgNavigation);
        }
        var imgTypes = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'bmp'
        ];
        if (!imgBox.options.allowIframe||$.inArray(url.split('.').pop().toLowerCase(), imgTypes) !== -1||isDataURL(url)) {
            $img = $('<img src="' + url + '" class="ssi-modalImg"/>')
             .on('load', function () {
                 if (!supportsNatural) {
                     var ghost = new Image();
                     ghost.src = $img.attr('src');
                     var width = ghost.width;
                     var height = ghost.height;
                     onHasSize(width, height);
                 }
             })
             .error(function () {
                 var alt = ($eventTarget ? $eventTarget.attr('data-alt') : '');
                 $img = '<h3>Image not found</h3><br>' + (typeof alt !== 'undefined' ? '<h4>' + alt + '</h4>' : '');
                 placeImg(true);
             });
            checkSize();
            if (startInterval) {
                interval = setInterval(function () {
                    $modalWrapper.addClass('ssi-imgBorder');
                    checkSize();
                    i++
                }, 50);
            }

        } else {
            if (typeof imgBox.options.iframe.allowFullScreen !== 'boolean') {
                imgBox.options.iframe.allowFullScreen = true;
            }
            imgBox.options.iframe.className = imgBox.options.iframe.className || '';
            $img = $('<iframe src="' + url + '" frameborder="0" ' + (imgBox.options.iframe.allowFullScreen ? 'allowfullscreen' : '') + '></iframe>');

            if (imgBox.options.center) {
                $modalWrapper.addClass('ssi-iframe ').find('#ssi-modalWindow' + imgBox.numberId).addClass(imgBox.options.iframe.className);
            } else {
                $modalWrapper.addClass('ssi-iframe ' + imgBox.options.iframe.className);
            }
            placeImg();
        }

        function setImgNavigation() {
            var $groupElements = $('a[data-ssi_imgGroup="' + $eventTarget.attr('data-ssi_imgGroup') + '"]');
            if (!$groupElements.length)return;
            var index = $groupElements.index($eventTarget),
             $elementLength = $groupElements.length;
            if (index + 1 >= $elementLength && index < 1)return;
            var $nav = $('<div class="ssi-modalNavigation"></divid>').mouseover(function () {
                 $nav.addClass('ssi-navFadeIn');
             }).mouseleave(function () {
                 $nav.removeClass('ssi-navFadeIn');
             }),
             $next = $('<div class="ssi-modalNext ' + (index + 1 >= $elementLength ? 'ssi-hidden' : '') + '"><span></span></div>'),
             $prev = $('<div class="ssi-modalPrev ' + (index < 1 ? 'ssi-hidden' : '') + '"><span></span></div>');
            $nav.append($next, $prev);
            imgBox.get$backdrop().one('backdropClose.ssi-modal', function () {

                $elementsLength = '';
                currentIndex = '';
            });
            imgBox.get$modal().one('beforeClose.ssi-modal', function () {
                $nav.remove();
            }).one('onShow.ssi-modal', function () {
                $next.one('click', function (e) {
                    e.preventDefault();
                    imgBox.navigate('next');
                    $(this).off('click.ssi_modal');
                });
                $prev.one('click', function (e) {
                    e.preventDefault();
                    imgBox.navigate('prev');
                    $(this).off('click.ssi_modal');
                });
            });

            return $nav;
        }

        function placeImg(error) {
            $content.find('.ssi-loader').remove();
            var content = [];
            if (!error && imgBox.options.imgButtons !== '' && !$.isEmptyObject(imgBox.options.imgButtons)) {
                var imgButtons = imgBox.setButtons(imgBox.options.imgButtons, imgBox.get$content()).addClass('ssi-imgButtons');
                if (imgBox.options.hideImgButtons === true) {
                    imgButtons.addClass('ssi-navFade ssi-navFadeOut');
                    imgBox.get$wrapper().mouseover(function () {
                        imgButtons.addClass('ssi-navFadeIn');
                    }).mouseleave(function () {
                        imgButtons.removeClass('ssi-navFadeIn');
                    })
                }

                content.push(imgButtons);

            }
            content.push($img);
            $content.append(content);
        }

        function AspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {//find the aspect ration
            var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            return {width: srcWidth * ratio, height: srcHeight * ratio};
        }

        function onHasSize(width, height) {
            clearInterval(interval);
            var naturalWidth = width || (supportsNatural ? $img[0].naturalWidth : $img.width());
            var naturalHeight = height || (supportsNatural ? $img[0].naturalHeight : $img.height());

            var imgHeight = imgBox.setModalHeight(120, true);
            if ((naturalHeight > windowHeight - imgHeight || naturalWidth > windowWidth) && imgBox.options.fixedHeight === true) {
                var dimensions = AspectRatio(naturalWidth, naturalHeight, windowWidth - 100, windowHeight - imgHeight);
                naturalWidth = dimensions.width;
                naturalHeight = dimensions.height;
                if (i > 2) {
                    $modalWrapper.addClass('ssi-overHeight')
                }
            }
            $content.css('height', naturalHeight);
            if (imgBox.options.center) {
                $content.parent().css({'width': naturalWidth, 'height': naturalHeight});
            }
            $modalWrapper.css('width', naturalWidth);
            placeImg();

            $modalWrapper.addClass('ssi-imgBorder')

        }

        /**
         * Initialize the arrows of navigation.
         * @param {Ssi_modal}modalObj
         * @returns {*|HTMLElement}
         */

        /**
         * checks when the image's size is available
         */
        function checkSize() {
            if (supportsNatural) {
                if ($img[0].naturalWidth > 0) {
                    onHasSize();
                    return;
                }
            } else {
                clearInterval(interval);
                if ($img.width() > 50) {
                    onHasSize();
                    return;
                }
            }
            startInterval = true;
        }

    }

//-----------------------------End of imgBox plugin------------------------------------------------------------------

//--------------------------------Start of notify plugin--------------------------------------------------
    ssi_modal.notify = function (type, options, callback) {
        var defaults = {
            closeIcon: false,
            overrideOther: false,
            sizeClass: 'dialog',
            onClickClose: true,
            bodyScroll: true,
            animation: true,
            className: '',
            backdrop: false,
            outSideClose: false,
            position: 'right top',
            topZIndex: true,
            okBtn: {
                className: '',
                label: 'Ok'
            },
            cancelBtn: {
                className: '',
                label: 'Cancel'
            },
            stack: true,
            closeAfter: {
                time: 4,
                resetOnHover: true
            }
        };
        if (type === 'confirm' || 'dialog') {
            options.okBtn = $.extend({}, defaults.okBtn, options.okBtn);
            options.cancelBtn = $.extend({}, defaults.cancelBtn, options.cancelBtn);
        }

        var generateIcon = function (className) {
            if (className === '')return '';
            return '<span class="ssi-icon ' + className + '"></span>'
        };

        var icon = '', title = '';
        switch (type) {
            case 'success':
                defaults.className = ' ssi-success';
                break;
            case 'error':
                defaults.className = ' ssi-error';
                break;
            case 'info':
                defaults.className = ' ssi-info';
                break;
            case 'warning':
                defaults.className = ' ssi-warning';
                break;
            case 'confirm':
                defaults.closeAfter = false;
                defaults.onClickClose = false;
                defaults.outSideClose = false;
                defaults.icon = false;
                defaults.title = false;

                defaults.buttons = [{
                    className: options.okBtn.className,
                    label: options.okBtn.label,
                    closeAfter: true,
                    method: function () {
                        if (typeof callback === 'function') {
                            callback(true);
                        }
                    }
                }, {
                    className: options.cancelBtn.className,
                    label: options.cancelBtn.label,
                    closeAfter: true,
                    method: function () {
                        if (typeof callback === 'function') {
                            callback(false);
                        }
                    }
                }];
                break;
            case 'dialog':
                defaults.onClickClose = false;
                defaults.closeAfter = false;
                defaults.outSideClose = false;
                defaults.title = false;
                defaults.icon = false;
                defaults.buttons = [{
                    className: options.okBtn.className,
                    label: options.okBtn.label,
                    closeAfter: true,
                    method: callback
                }];
                break;
            default:
                defaults.className = type;
        }
        if (options.className) {
            options.className += defaults.className || '';
        }
        options = $.extend(true, defaults, options);

        if (options.icon != false) {
            icon = options.icon || type || '';
        }
        if (options.title != false) {
            title = options.title || type;
        }
        if ((options.icon != false && options.title != false) && icon != '') {
            options.title = generateIcon(icon) + ' ' + title;
        }
        if (options.backdrop === true) {
            options.backdrop = 'byKndShared'
        }
        options.keepContent = false;
        if (options.overrideOther) {
            var classes = options.position.split(' ');
            $('body').find('div.' + classes[0] + '.' + classes[1]).children().empty()
        }

        return ssi_modal.createObject(options)
         .setPluginName('notify').init().show();
    };
//--------------------------------End of notify plugin--------------------------------------------------

//--------------------------------Start of jquery selector plugin--------------------------------------------------

    $.fn.ssi_modal = function () {
        var opts;
        if (typeof arguments[1] === 'object') {
            var action = arguments[0];
            opts = arguments[1] || {};
            var callback = arguments[2];
        } else {
            opts = arguments[0] || {};
        }
        return this.each(function () {
            var element = $(this), options;
            if (opts.content) {//that means that we will not use any div element for content
                element.click(function () {
                    switch (action) {//action could be show,dialog or confirm
                        case 'show':
                            ssi_modal['show'](opts, element);
                            break;
                        default:
                            ssi_modal[action](opts, callback);
                    }
                })
            } else {
                var content, def, dataAttr = element.attr('data-ssi_modal');
                if (dataAttr) {// that means the content is an element.  data-ssi_modal shows the elements selector
                    element.click(function () {//set click event
                        content = $(dataAttr);
                        def = {
                            content: content
                        };
                        options = $.extend({}, opts, def);
                        ssi_modal.createObject(options).init().show();
                    });
                } else {//that means the target is the element that contains the content
                    def = {
                        content: element
                    };
                    options = $.extend({}, opts, def);
                    ssi_modal.createObject(options).init().show();
                }
            }
        });
    };
//--------------------------------End of jquery selector plugin--------------------------------------------------

    /**
     * Adds animation to an element
     * @method addAnimation
     * @param {string} animationName
     * @param {function} callback
     * @return CallExpression
     */

//@author https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
    function checkAnimationSupport() {
        var animation = false,
         animationstring = 'animation',
         keyframeprefix = '',
         domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
         pfx = '',
         elm = document.createElement('div');

        if (elm.style.animationName !== undefined) {
            animation = true;
        }

        if (animation === false) {
            for (var i = 0; i < domPrefixes.length; i++) {
                if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                    pfx = domPrefixes[i];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                    break;
                }
            }
        }
        return animation;
    }

    $.fn.addAnimation = function (animationName, callback) {
        var animationEnd = 'mozAnimationEnd webkitAnimationEnd  MSAnimationEnd oanimationend animationend';
        if (animationName.indexOf('ssi-fade') !== -1 && animationSupport === false) {
            return $(this)[animationName.replace('anim ssi-', '')](300, function () {
                if (typeof callback === 'function') {
                    callback();
                }
            });
        } else {
            $(this).addClass(animationName).one(animationEnd, function () {
                $(this).removeClass(animationName);
                if (typeof callback === 'function') {
                    callback();
                }
            });

            if (animationName === 'ssi-show' || animationName === 'ssi-hidden' || animationName === '') {
                $(this).trigger('animationend');
            }
            return this.each(function () {
                $(this)
            })
        }
    };

    function toArray(value) {//if the value is not array returns an array with the value
        if (!(value instanceof Array)) {
            value = [value];
        }
        return value;
    }

    return ssi_modal;

}));