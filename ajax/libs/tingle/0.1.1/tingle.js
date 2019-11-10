/*!
* tingle.js
* @author  robin_parisi
* @version 0.1.1
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
    var btn;

    var modal = {};
    var confirm = {};
    var alert = {};

    /* ----------------------------------------------------------- */
    /* == modal */
    /* ----------------------------------------------------------- */

    var modal = (function() {

        var modal;
        var modalCloseBtn;
        var modalWrapper;
        var modalContent;
        var content = '';

        var init = function() {
            _build();
            _bindEvents();
            _insertInDom();
        };

        var open = function(options) {
            modal.style.display = 'block';
            var modalHeight = Math.max(modalContent.offsetHeight, modalContent.scrollHeight, modalContent.clientHeight || 0);
            var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            if(modalHeight < viewportHeight) {
                modalContent.classList.add('tingle-modal__content--center');
            }

            window.setTimeout(function(){
                modal.classList.add('tingle-modal--visible');
            }, 50);

        };

        var close = function(e) {
            modal.style.display = 'none';
            modal.classList.remove('tingle-modal--visible');
            modalContent.classList.remove('tingle-modal__content--center');
        };

        var _catchEvent = function(e) {
            e.stopPropagation();
        };

        var destroy = function() {
            _unbindEvents();
            _removeFromDom();
            modal = null;
        };

        var setContent = function(content) {
            modalContent.innerHTML = content;
        };

        var _insertInDom = function() {
            // if the modal is not already in the dom
            if(!document.querySelector('.tingle-modal')) {
                insertInDom(modal);
            }
        };

        var _removeFromDom = function() {
            if(document.querySelector('.tingle-modal')) {
                removeFromDom(modal);
            }
        };

        var _bindEvents = function() {
            bind(modalCloseBtn, 'click', close);
            bind(modal, 'click', close);
            bind(modalContent, 'click', _catchEvent);

        };

        var _unbindEvents = function() {
            unbind(modalCloseBtn, 'click', close);
            unbind(modal, 'click', close);
            unbind(modalContent, 'click', _catchEvent);
        };

        var _build = function() {
            modal = create('div', 'tingle-modal');
            modal.style.display = 'none';

            modalCloseBtn = create('button', 'tingle-modal__close');
            modalCloseBtn.innerHTML = '×';

            //modalWrapper = create('div', 'tingle-modal__wrapper');

            modalContent = create('div', 'tingle-modal__content');

            modal.appendChild(modalCloseBtn);
            modal.appendChild(modalContent);
        };

        return {
            init: init,
            open: open,
            close: close,
            destroy: destroy,
            setContent: setContent
        };
    })();

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
        modal: modal,
        alert: alert,
        confirm: confirm
    }

}));
