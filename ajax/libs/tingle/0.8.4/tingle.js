/*!
 * tingle.js
 * @author  robin_parisi
 * @version 0.8.4
 * @url
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.tingle = factory();
    }
}(this, function() {

    /* ----------------------------------------------------------- */
    /* == modal */
    /* ----------------------------------------------------------- */

    var transitionEvent = whichTransitionEvent();

    /**
     * Modal constructor
     */
    function Modal(options) {
        this.modal;
        this.modalCloseBtn;
        this.modalWrapper;
        this.modalBox;
        this.modalBoxContent
        this.modalBoxFooter;
        this.modalContent;
        var defaults = {
            onClose: null,
            onOpen: null,
            stickyFooter: false,
            footer: false,
            cssClass: []
        }

        // extends config
        this.opts = extend({}, defaults, options);

        // init modal
        this.init();

    }

    /**
     * Init modal
     */
    Modal.prototype.init = function() {
        if (this.modal) {
            return;
        }

        _build.call(this);
        _bindEvents.call(this);

        // insert modal in dom
        document.body.insertBefore(this.modal, document.body.firstChild);

        if (this.opts.footer) {
            this.addFooter();
        }
    };


    /**
     * Destroy modal: unbind events and remove from dom
     */
    Modal.prototype.destroy = function() {
        if (this.modal === null) {
            return;
        }
        _unbindEvents.call(this);

        // remove modal from dom
        this.modal.parentNode.removeChild(this.modal);

        this.modal = null;
    };


    /**
     * Open modal
     */
    Modal.prototype.open = function(options) {

        if (this.modal.style.removeProperty) {
            this.modal.style.removeProperty('display');
        } else {
            this.modal.style.removeAttribute('display');
        }


        // prevent double scroll
        document.body.classList.add('tingle-enabled');

        // sticky footer
        this.setStickyFooter(this.opts.stickyFooter);

        // show modal
        this.modal.classList.add('tingle-modal--visible');

        // onOpen event
        var self = this;

        if (transitionEvent) {
            this.modal.addEventListener(transitionEvent, function handler() {
                if (typeof self.opts.onOpen === 'function') {
                    self.opts.onOpen.call(self);
                }

                // detach event after transition end (so it doesn't fire multiple onOpen)
                self.modal.removeEventListener(transitionEvent, handler, false);

            }, false);
        }

        // check if modal is bigger than screen height
        _checkOverflow.call(this);

    };

    /**
     * Close modal
     */
    Modal.prototype.close = function(e) {

        this.modal.style.display = 'none';
        document.body.classList.remove('tingle-enabled');

        this.modal.classList.remove('tingle-modal--visible');

        // on close callback
        if (typeof this.opts.onClose === "function") {
            this.opts.onClose.call(this);
        }
    };

    /**
     * Set content
     */
    Modal.prototype.setContent = function(content) {
        // check type of content : String or Node
        if (typeof content === 'string') {
            this.modalBoxContent.innerHTML = content;
        } else {
            this.modalBoxContent.innerHTML = "";
            this.modalBoxContent.appendChild(content);
        }
    };

    Modal.prototype.getContent = function() {
        return this.modalBoxContent;
    };

    Modal.prototype.addFooter = function() {
        // add footer to modal
        _buildFooter.call(this);
    }

    Modal.prototype.setFooterContent = function(content) {
        // set footer content
        this.modalBoxFooter.innerHTML = content;
    };

    Modal.prototype.getFooterContent = function() {
        return this.modalBoxFooter;
    };

    Modal.prototype.setStickyFooter = function(isSticky) {

        // if the modal is smaller than the viewport height, we don't need sticky
        if (!this.isOverflow()) {
            isSticky = false;
        }

        if (isSticky) {
            if (this.modalBox.contains(this.modalBoxFooter)) {
                this.modalBox.removeChild(this.modalBoxFooter);
                this.modal.appendChild(this.modalBoxFooter);
                this.modalBoxFooter.classList.add('tingle-modal-box__footer--sticky');
                _recalculateFooterPosition.call(this);
                this.modalBoxContent.style['padding-bottom'] = this.modalBoxFooter.clientHeight +
                    20 + 'px';
                bind(this.modalBoxFooter, 'click', _catchEvent);
            }
        } else if (this.modalBoxFooter) {
            if (!this.modalBox.contains(this.modalBoxFooter)) {
                this.modal.removeChild(this.modalBoxFooter);
                this.modalBox.appendChild(this.modalBoxFooter);
                this.modalBoxFooter.style.width = 'auto';
                this.modalBoxFooter.style.left = '';
                this.modalBoxContent.style['padding-bottom'] = '';
                this.modalBoxFooter.classList.remove('tingle-modal-box__footer--sticky');
            }
        }
    }

    Modal.prototype.addFooterBtn = function(label, cssClass, callback) {
        var btn = document.createElement("button");

        // set label
        btn.innerHTML = label;

        // bind callback
        btn.addEventListener('click', callback);

        if (typeof cssClass === 'string' && cssClass.length) {
            // add classes to btn
            cssClass.split(" ").forEach(function(item) {
                btn.classList.add(item);
            });
        }

        this.modalBoxFooter.appendChild(btn);

        return btn;
    }

    Modal.prototype.resize = function() {
        console.warn('Resize is deprecated and will be removed in version 1.0');
    };


    Modal.prototype.isOverflow = function() {
        var viewportHeight = window.innerHeight;
        var modalHeight = this.modalBox.clientHeight;

        var isOverflow = modalHeight < viewportHeight ? false : true;
        return isOverflow;
    }


    /* ----------------------------------------------------------- */
    /* == private methods */
    /* ----------------------------------------------------------- */


    function _checkOverflow() {
        // only if the modal is currently shown
        if (this.modal.classList.contains('tingle-modal--visible')) {
            if (this.isOverflow()) {
                this.modal.classList.add('tingle-modal--overflow');
            } else {
                this.modal.classList.remove('tingle-modal--overflow');
            }

            // TODO: remove offset
            //_offset.call(this);
            if (!this.isOverflow() && this.opts.stickyFooter) {
                this.setStickyFooter(false);
            } else if (this.isOverflow() && this.opts.stickyFooter) {
                _recalculateFooterPosition.call(this);
                this.setStickyFooter(true);
            }
        }
    };

    function _recalculateFooterPosition() {
        if (!this.modalBoxFooter) {
            return;
        }
        this.modalBoxFooter.style.width = this.modalBox.clientWidth + 'px';
        this.modalBoxFooter.style.left = this.modalBox.offsetLeft + 'px';
    }

    function _build() {
        this.modal = create('div', 'tingle-modal');
        this.modal.style.display = 'none';

        // custom class
        this.opts.cssClass.forEach(function(item) {
            if (typeof item === 'string') {
                this.modal.classList.add(item);
            }
        }, this);

        this.modalCloseBtn = create('button', 'tingle-modal__close');
        this.modalCloseBtn.innerHTML = '×';

        this.modalBox = create('div', 'tingle-modal-box');
        this.modalBoxContent = create('div', 'tingle-modal-box__content');
        this.modalBox.appendChild(this.modalBoxContent);

        this.modal.appendChild(this.modalCloseBtn);
        this.modal.appendChild(this.modalBox);

    };

    function _buildFooter() {
        this.modalBoxFooter = create('div', 'tingle-modal-box__footer');
        this.modalBox.appendChild(this.modalBoxFooter);
    }

    function _bindEvents() {
        bind(this.modalCloseBtn, 'click', this.close.bind(this));
        bind(this.modal, 'mousedown', _handleClickProcedure.bind(this));
        window.addEventListener('resize', _checkOverflow.bind(this));
    };

    function _handleClickProcedure(event) {
        // if click is outside the modal
        if (!_findAncestor(event.target, 'tingle-modal')) {
            this.close();
        }
    }

    /**
     * Avoid closing the modal when a click is trigger inside
     */
    function _catchEvent(e) {
        e.stopPropagation();
    };

    function _findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    function _unbindEvents() {
        unbind(this.modalCloseBtn, 'click', this.close.bind(this));
        unbind(this.modal, 'mousedown', _handleClickProcedure.bind(this));
    };

    /* ----------------------------------------------------------- */
    /* == confirm */
    /* ----------------------------------------------------------- */

    // coming soon

    /* ----------------------------------------------------------- */
    /* == alert */
    /* ----------------------------------------------------------- */

    // coming soon

    /* ----------------------------------------------------------- */
    /* == helpers */
    /* ----------------------------------------------------------- */

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    function isNodeList(el) {
        return (typeof el.length != 'undefined' && typeof el.item != 'undefined');
    }

    function bind(el, event, callback) {

        if (isNodeList(el)) {
            [].forEach.call(el, function(el) {
                el.addEventListener(event, callback);
            })
        } else {
            el.addEventListener(event, callback);
        }
    }

    function unbind(el, event, callback) {
        if (isNodeList(el)) {
            [].forEach.call(el, function(el) {
                el.removeEventListener(event, callback);
            })
        } else {
            el.removeEventListener(event, callback);
        }
    }

    function create(element, cssClass) {
        var element = document.createElement(element);
        if (cssClass) {
            element.classList.add(cssClass);
        }
        return element;
    }

    function whichTransitionEvent() {
        var t;
        var el = document.createElement('tingle-test-transition');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    /* ----------------------------------------------------------- */
    /* == return */
    /* ----------------------------------------------------------- */

    return {
        modal: Modal
    };

}));
