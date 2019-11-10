/* ========================================================================
 * SaRibe: eModal.js v1.2.67
 * http://saribe.github.io/eModal
 * ========================================================================
 * Copyright Samuel Ribeiro.
 * Licensed under MIT.
 * ======================================================================== */

/**
 * Easy Modal for bootstrap, is a simple way to create modal dialogs using javascript.
 * @params allowed elements:
 *     buttons  {array}:           An array of objects to configure buttons to modal footer; only able if message == string
 *     css      {object}:          CSS object try apply into message body; only able if message == string
 *     data     {object}:          Used for iframe with post data parameters              
 *     loading  {boolean}:         Set loading progress as message.
 *     message  {string|object}:   The body message string or the HTML element. e.g.: $(selector);
 *     size     {string}:          sm || lg || xl -> define the modal size.
 *     subtitle {string}:          The header subtitle string. This appear in a smaller text.
 *     title    {string}:          The header title string.
 *     useBin   {boolean}:         Set message as recyclable.
 * </summary>
 * <param name="params"   >Modal options parameters of string body message.</param>
 * <param name="title"    >The string header title or a flag to set default parameters.</param>
 * <returns type="Promise">{ then, element }.</returns>
 */

;
(function (define) {
    define(['jquery'], function ($, root) {
        var $modal;
        var BIN = 'recycle-bin';
        var DIV = '<div>';
        var EMPTY = '';
        var EVENT_CLICK = 'click';
        var EVENT_HIDE = 'hide';
        var EVENT_SHOW = 'shown.bs.modal';
        var EVENT_SUBMIT = 'submit';
        var FOOTER_ID = 'eFooter';
        var HIDE = EVENT_HIDE + '.bs.modal';
        var INPUT = 'input';
        var KEY_DANGER = 'danger';
        var LABEL = {
            OK: 'Cancel',
            True: 'False',
            Yes: 'No'
        };
        var lastParams = {};
        var MODAL_BODY = 'modal-body';
        var MODAL_DIALOG = '.modal-dialog';
        var options = {};
        var REC_MODAL_CONTENT = 'modal-rec';
        var SIZE = {
            sm: 'sm',
            lg: 'lg',
            xl: 'xl'
        };
        var TMP_MODAL_CONTENT = 'modal-tmp';

        var defaultSettings = {
            allowContentRecycle: true,
            confirmLabel: Object.keys(LABEL)[0],
            labels: LABEL,
            loadingHtml: '<h5>Loading...</h5><div class=progress><div class="progress-bar progress-bar-striped active" style="width: 100%"></div></div>',
            size: EMPTY,
            title: 'Attention',
            autofocus: false
        };
        
        root = root || {};
        root.addLabel = addLabel;
        root.ajax = ajax;
        root.alert = alert;
        root.close = close;
        root.confirm = confirm;
        root.emptyBin = emptyBin;
        root.iframe = iframe;
        root.prompt = prompt;
        root.setId = setId;
        root.setEModalOptions = setEModalOptions;
        root.setModalOptions = setModalOptions;
        root.size = SIZE;
        root.version = '1.2.67';

        return root;

        //#region /////////////////////////* Private Logic */////////////////////////
        /**
         * Find modal body and append message to it.
         * @param {String | DOM} message
         */
        function _build(message) {
            $modal
                .modal(options)
                .find('.modal-content')
                .append(message);
        }

        /**
         * Will find what Promises approach the developer is using.
         * Will use Promises A+ if Q.js is present, otherwise will use Promises A from jQuery.
         * @returns {Promise}
         */
        function _createDeferred() {
            var defer;

            // try native promise
            //if (Promise) defer = Promise.defer();

            var q;

            try {
                q = require('Q');
            } // Load option Q by require if exist
            catch (e) {
                q = window.Q;
            }

            if (q) { // try Q
                defer = q.defer();
            } else { // Use jQuery :(
                defer = $.Deferred();
                defer.promise = defer.promise();
            }

            defer.promise.element = _getModalInstance(true).find(MODAL_DIALOG);
            return defer;
        }

        /**
         * Will create modal DOM footer with all buttons.
         * @param {Array} buttons - all custom buttons, if none, will generate defaults
         * @returns {$DOM} footer DOM element
         */
        function _getFooter(buttons) {
            if (buttons === false) {
                return EMPTY;
            }

            var messageFotter = $(DIV).addClass('modal-footer').prop('id', FOOTER_ID);
            if (buttons) {
                for (var i = 0, k = buttons.length; i < k; i++) {
                    var btnOp = buttons[i];
                    var btn = $('<button>').addClass('btn btn-' + (btnOp.style || 'primary'));

                    for (var index in btnOp) {
                        if (btnOp.hasOwnProperty(index)) {
                            switch (index) {
                                case 'close':
                                    //add close event
                                    if (btnOp[index]) {
                                        btn.attr('data-dismiss', 'modal')
                                            .addClass('x');
                                    }
                                    break;
                                case EVENT_CLICK:
                                    //click event
                                    var fn = btnOp.click.bind(_getModalInstance(true).find('.modal-content'));
                                    btn.click(fn);
                                    break;
                                case 'text':
                                    btn.html(btnOp[index]);
                                    break;
                                default:
                                    //all other possible HTML attributes to button element
                                    btn.attr(index, btnOp[index]);
                            }
                        }
                    }

                    messageFotter.append(btn);
                }
            } else {
                //if no buttons defined by user, add a standard close button.
                messageFotter.append('<button class="x btn btn-primary" data-dismiss=modal type=button>Close</button>');
            }
            return messageFotter;
        }

        /**
         * Extract message from arguments.
         * @param {Object | String} data - this can be the message string or the full detailed object
         * @returns {$DOM}
         */
        function _getMessage(data) {
            var $message;
            var content = data.loading ?
                defaultSettings.loadingHtml :
                (data.message || data);

            if (content.on || content.onclick) {
                $message = data.clone === true ?
                    $(content).clone() :
                    $(content);

                $message.addClass(data.useBin && !data.loading ? REC_MODAL_CONTENT : TMP_MODAL_CONTENT);
            } else {
                $message = $(DIV)
                    .attr('style', 'position:relative;word-wrap:break-word;')
                    .addClass(MODAL_BODY)
                    .html(content);
            }

            return data.css && (data.css !== $message.css && $message.css(data.css)), $message;
        }

        /**
         * Return a new modal object if is the first request or the already created model.
         * @param {boolean} skipEventChageIfExists
         * @returns {jQuery Object}
         */
        function _getModalInstance(skipEventChageIfExists) {
            if (!$modal) {
                //add recycle bin container to document
                if (!$('#' + BIN).length) {
                    $('body').append($(DIV).prop('id', BIN).hide());
                }

                $modal = createModalElement();
            }

            if (skipEventChageIfExists && $modal) {
                return $modal;
            }

            if (defaultSettings.autofocus) {
                $modal
                    .on(EVENT_SHOW, function () {
                        $(this).find(INPUT).first().focus();
                    });
            }

            return $modal;

            function createModalElement() {
                return $('<div class="modal fade" tabindex="-1"><style>.modal-xl{width:96%;}.modal-body{max-height: calc(100vh - 145px);overflow-y: auto;}</style>' +
                    '<div class=modal-dialog>' +
                    '<div class=modal-content>' +
                    ' <div class=modal-header><button type=button class="x close" data-dismiss=modal aria-label="Close"><span aria-hidden=true>&times;</span></button><h5 class=modal-title></h5></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>')
                    .on('hidden.bs.modal', _recycleModal)
                    .on(EVENT_CLICK, 'button.x', function (ev) {
                        var btn = $(ev.currentTarget);

                        if (btn.prop('type') !== EVENT_SUBMIT)
                            return $modal.modal(EVENT_HIDE);

                        try {
                            if (btn.closest('form')[0].checkValidity())
                                return close();
                        } catch (e) {
                            return close();
                        }

                        return $modal;
                    });
            }
        }

        /**
         * @param {String} version 
         * @returns {Boolean}
         */
        function _jQueryMinVersion(version) {
            var $ver = $.fn.jquery.split('.');
            var ver = version.split('.');
            var $major = $ver[0];
            var $minor = $ver[1];
            var $patch = $ver[2];
            var major = ver[0];
            var minor = ver[1];
            var patch = ver[2];
        
            return !(
                (major > $major) ||
                (major === $major && minor > $minor) ||
                (major === $major && minor === $minor && patch > $patch)
            );
        }

        /**
         * Move content to recycle bin if is a DOM object defined by user,
         * delete it if is a simple string message.
         * All modal messages can be deleted if default setting "allowContentRecycle" = false.
         */
        function _recycleModal() {
            if (!$modal) return;

            var $content = $modal.find('.' + REC_MODAL_CONTENT).removeClass(REC_MODAL_CONTENT)
                .appendTo('#' + BIN);

            $modal
                .off(HIDE)
                .off(EVENT_SHOW)
                .find('.modal-content > div:not(:first-child)')
                .remove();

            if (!defaultSettings.allowContentRecycle || lastParams.clone) {
                $content.remove();
            }
        }

        /**
         * Handle default values and toggle between {Object | String}.
         * Create or get Modal element
         * @param {Object | String} data - this can be the message string or the full detailed object
         * @param {String} title - the string that will be shown in modal header
         * @returns {Promise} Promise with modal $DOM element
         */
        function _setup(params, title) {
            if (!params) throw new Error('Invalid parameters!');

            _recycleModal();
            lastParams = params;

            // Lazy loading
            var $ref = _getModalInstance();
            var size = 'modal-' + (params.size || defaultSettings.size);

            // Change size
            $ref.find(MODAL_DIALOG)
                .removeClass('modal-sm modal-lg modal-xl')
                .addClass(params.size || defaultSettings.size ? size : null);

            // Change title
            $ref.find('.modal-title')
                .html((params.title || title || defaultSettings.title) + ' ')
                .append($('<small>').html(params.subtitle || EMPTY));

            $ref.on(HIDE, params.onHide);
        }
        //#endregion

        //#region /////////////////////////* Public Methods */////////////////////////

        function addLabel(yes, no) {
            LABEL[yes] = no;
        }

        /**
         * Gets data from URL to eModal body
         * @param {Object | String} data - this can be the message string or the full detailed object
         * @param {String} title - the string that will be shown in modal header
         * @returns {Promise} Promise with modal $DOM element
         */
        function ajax(data, title) {

            var dfd = _createDeferred();

            if (typeof data === 'object') {
                setEModalOptions(data);
            }

            var params = {
                async: true,
                deferred: dfd,
                xhrFields: { withCredentials: false },
                loading: true,
                title: title || defaultSettings.title,
                url: data.url || data,
                dataType: data.dataType || 'text'
            };

            if (data.url) {
                $.extend(params, data);
            }

            $.ajax(params)
                .done(ok)
                .fail(error);

            return alert(params, title);

            function ok(html) {
                $modal
                    .find('.' + MODAL_BODY)
                    .html(data.success ? data.success(html) : html);

                return dfd.resolve($modal);
            }

            function error(responseText, textStatus) {
                var msg = data.error ?
                    data.error(responseText, textStatus, params) :
                    '<div class="alert alert-danger">' +
                    '<strong>XHR Fail: </strong>URL [ ' + params.url + '] load fail.' +
                    '</div>';

                $modal
                    .find('.' + MODAL_BODY)
                    .html(msg);
                return dfd.reject(responseText);
            }
        }

        /**
         * Non blocking alert whit bootstrap.
         * @param {Object | String} data - this can be the message string or the full detailed object.
         * @param {String} title - the string that will be shown in modal header.
         * @returns {Promise} Promise with modal $DOM element
         */
        function alert(data, title) {
            _setup(data, title);

            var dfd = data.deferred || _createDeferred();

            if (typeof data === 'object') {
                setEModalOptions(data);
            }

            var $message = $(DIV).append(_getMessage(data), _getFooter(data.buttons));

            _build($message);

            if (!data.async) {
                $modal.on(EVENT_SHOW, dfd.resolve);
            }

            return dfd.promise;
        }

        /**
         * Non blocking confirm dialog with bootstrap.
         * @param {Object | String} data - this can be the message string or the full detailed object.
         * @param {String} title - the string that will be shown in modal header.
         * @returns {Promise} Promise with modal $DOM element
         */
        function confirm(data, title) {
            var dfd = _createDeferred();

            if (typeof data === 'object') {
                setEModalOptions(data);
            }

            return alert({
                async: true,
                buttons: [{
                    close: true,
                    click: click,
                    text: LABEL[data.label] ? LABEL[data.label] : LABEL[defaultSettings.confirmLabel],
                    style: data.style && data.style[0] || KEY_DANGER
                }, {
                    close: true,
                    click: click,
                    text: LABEL[data.label] ? data.label : defaultSettings.confirmLabel,
                    style: data.style && data.style[1]
                }],
                deferred: dfd,
                message: data.message || data,
                onHide: click,
                size: data.size,
                title: data.title || title
            });

            function click(ev) {
                close();

                var key = $(ev.currentTarget).html();
                return LABEL[key] ? dfd.resolve() : dfd.reject();
            }
        }

        /**
         * Will load a URL in iFrame inside the modal body.
         * @param {Object | String} data - this can be the URL string or the full detailed object.
         * @param {String} title - the string that will be shown in modal header.
         * @returns {Promise} Promise with modal $DOM element
         */
        function iframe(params, title) {
            var dfd = _createDeferred();

            if (typeof data === 'object') {
                setEModalOptions(data);
            }

            var postData = params.data ? 
                Object.keys(params.data).map(mapData).join(' ') : 
                '';

            var html = ('<div class=modal-body style="position: absolute;width: 100%;background-color: rgba(255,255,255,0.8);height: 100%;">%1%</div>' +
                '<iframe class="embed-responsive-item" frameborder=0 src="%0%" %2% style="width:100%;height:75vh;display:block;"/>')
                .replace('%0%', params.message || params.url || params)
                .replace('%1%', defaultSettings.loadingHtml)
                .replace('%2%', postData);

            var message = _jQueryMinVersion('3.0.0') ? 
                $(html).on('load', iframeReady):
                $(html).load(iframeReady);

            return alert({
                async: true,
                buttons: params.buttons || false,
                deferred: dfd,
                message: message,
                size: params.size || SIZE.xl,
                title: params.title || title
            });
            //////////

            function mapData(item) {
                return item + '="' + params.data[item] + '"';
            }

            function iframeReady() {
                $(this)
                    .parent()
                    .find('div.' + TMP_MODAL_CONTENT)
                    .fadeOut(function () {
                        $(this).remove();
                    });

                return dfd.resolve();
            }
        }

        /**
         * Remove all Dom elements in recycle bin.
         * @returns {Array} All removed elements
         */
        function emptyBin() {
            return $('#' + BIN + ' > *').remove();
        }

        /**
         * Provides one value form.
         * @param {Object | String} data - this can be the value string label or the full detailed object.
         * @param {String} title - the string that will be shown in modal header.
         * @returns {Promise} Promise with modal $DOM element
         */
        function prompt(data, title) {
            var dfd = _createDeferred();

            if (typeof data === 'object') {
                setEModalOptions(data);
            }

            var params = {
                deferred: dfd
            };

            if (typeof data === 'object') {
                $.extend(params, data);
            } else {
                params.message = data;
                params.title = title;
            }

            params.async = true;

            if (params.buttons) {
                var btn;
                for (var i = 0, k = params.buttons.length; i < k; i++) {
                    btn = params.buttons[i];
                    btn.style = (btn.style || 'default') + ' pull-left';
                    btn.type = btn.type || 'button';
                }
            }

            var buttons = _getFooter([{
                close: true,
                type: 'reset',
                text: LABEL.OK,
                style: KEY_DANGER
            }, {
                close: false,
                type: EVENT_SUBMIT,
                text: defaultSettings.confirmLabel
            }].concat(params.buttons || []));

            params.buttons = false;
            params.onHide = submit;

            params.message = $('<form role=form style="margin-bottom:0;">' +
                '<div class=modal-body>' +
                '<label for=prompt-input class=control-label>' + (params.message || EMPTY) + '</label>' +
                '<input type=text class=form-control required autocomplete="on" value="' + (params.value || EMPTY) + (params.pattern ? '" pattern="' + params.pattern : EMPTY) + '">' +
                '</div></form>')
                .append(buttons)
                .on(EVENT_SUBMIT, submit);

            return alert(params);

            function submit(ev) {
                var value = $modal.find(INPUT).val();
                close();

                //TODO:
                ev.type !== EVENT_SUBMIT ?
                    dfd.reject(value) :
                    dfd.resolve(value);

                return false;
            }
        }

        function setId(id) {
            _getModalInstance(true)
                .find(MODAL_DIALOG)
                .prop('id', id);
        }

        /**
         * Set or change eModal options.
         * @param {Object} overrideOptions
         * @returns {Object} merged eModal options
         */
        function setEModalOptions(overrideOptions) {
            return $.extend(defaultSettings, overrideOptions);
        }

        /**
         * Set or change bootstrap modal options.
         * @param {Object} overrideOptions
         * @returns {Object} merged eModal options
         */
        function setModalOptions(overrideOptions) {
            $modal && $modal.remove();

            return $.extend(options, overrideOptions);
        }

        /**
         * Close the current open eModal
         * @returns {$DOM} eModal DOM element
         */
        function close() {
            if ($modal) {
                $modal.off(HIDE).modal(EVENT_HIDE);
            }
            return $modal;
        }
        //#endregion
    });
}(typeof define == 'function' && define.amd ?
    define :
    function (args, mName) {
        this.eModal = typeof module != 'undefined' && module.exports ?
            mName(require(args[0], {}), module.exports) :
            mName(window.$);
    }));