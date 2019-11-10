/*!
* tingle.js
* @author  robin_parisi
* @version 0.3.0
* @url
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.tingle = factory();
    }
}(this, function () {

    /* ----------------------------------------------------------- */
    /* == modal */
    /* ----------------------------------------------------------- */

    /**
    * Modal constructor
    */
    function Modal(options) {
        this.modal;
        this.modalCloseBtn;
        this.modalWrapper;
        this.modalContent;
        options = options ? options : {};
        this.onClose = options.onClose ? options.onClose : null;
    }

    /**
    * Init modal
    */
    Modal.prototype.init = function() {
        _build.call(this);
        _bindEvents.call(this);
        _insertInDom.call(this);
    };

    /**
    * Open modal
    */
    Modal.prototype.open = function(options) {
        this.modal.style.display = 'block';
        var modalHeight = Math.max(this.modalContent.offsetHeight, this.modalContent.scrollHeight, this.modalContent.clientHeight || 0);
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        if(modalHeight < viewportHeight) {
            this.modalContent.classList.add('tingle-modal__content--center');
        }
        var self = this;
        window.setTimeout(function(){
            self.modal.classList.add('tingle-modal--visible');
        }, 50);

    };

    /**
    * Close modal
    */
    Modal.prototype.close = function(e) {
        this.modal.style.display = 'none';
        this.modal.classList.remove('tingle-modal--visible');
        this.modalContent.classList.remove('tingle-modal__content--center');
        if(typeof this.onClose === "function") {
            this.onClose();
        }
    };

    /**
    * Destroy modal: unbind events and remove from dom
    */
    Modal.prototype.destroy = function() {
        if(this.modal === null) {
            return;
        }
        _unbindEvents.call(this);
        _removeFromDom.call(this);
        this.modal = null;
    };

    /**
    * Set content
    */
    Modal.prototype.setContent = function(content) {
        this.modalContent.innerHTML = content;
    };

    var _insertInDom = function() {
        insertInDom(this.modal);
    };

    var _removeFromDom = function() {
        if(document.querySelector('.tingle-modal')) {
            removeFromDom(this.modal);
        }
    };

    var _bindEvents = function() {
        bind(this.modalCloseBtn, 'click', this.close.bind(this));
        bind(this.modal, 'click', this.close.bind(this));
        bind(this.modalContent, 'click', _catchEvent);
    };

    var _catchEvent = function(e) {
        e.stopPropagation();
    };

    var _unbindEvents = function() {
        unbind(this.modalCloseBtn, 'click', this.close.bind(this));
        unbind(this.modal, 'click', this.close.bind(this));
        unbind(this.modalContent, 'click', _catchEvent);
    };

    var _build = function() {
        this.modal = create('div', 'tingle-modal');
        this.modal.style.display = 'none';

        this.modalCloseBtn = create('button', 'tingle-modal__close');
        this.modalCloseBtn.innerHTML = '×';

        //modalWrapper = create('div', 'tingle-modal__wrapper');

        this.modalContent = create('div', 'tingle-modal__content');

        this.modal.appendChild(this.modalCloseBtn);
        this.modal.appendChild(this.modalContent);
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

    function isNodeList(el) {
        return (typeof el.length != 'undefined' && typeof el.item != 'undefined');
    }

    function insertInDom(el) {
        document.body.insertBefore(el, document.body.firstChild);
    };

    function removeFromDom(el) {
        el.parentNode.removeChild(el);
    };

    function bind(el, event, callback) {

        if(isNodeList(el)) {
            [].forEach.call(el, function(el) {
                el.addEventListener(event, callback);
            })
        } else {
            el.addEventListener(event, callback);
        }
    }

    function unbind(el, event, callback) {
        if(isNodeList(el)) {
            [].forEach.call(el, function(el) {
                el.removeEventListener(event, callback);
            })
        } else {
            el.removeEventListener(event, callback);
        }
    }

    function create(element, cssClass) {
        var element = document.createElement(element);
        if(cssClass) {
            element.classList.add(cssClass);
        }
        return element;
    }

    /* ----------------------------------------------------------- */
    /* == return */
    /* ----------------------------------------------------------- */

    return {
        modal: Modal
    };

}));
