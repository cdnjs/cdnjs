YUI.add('pjax', function(Y) {

var EVT_ERROR = 'error',
    EVT_LOAD  = 'load';

Y.Pjax = Y.Base.create('pjax', Y.Router, [Y.PjaxBase], {
    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function () {
        this.publish(EVT_ERROR, {defaultFn: this._defCompleteFn});
        this.publish(EVT_LOAD,  {defaultFn: this._defCompleteFn});
    },

    // -- Public Methods -------------------------------------------------------
    getContent: function (responseText) {
        var content         = {},
            contentSelector = this.get('contentSelector'),
            frag            = Y.Node.create(responseText || ''),
            titleSelector   = this.get('titleSelector'),
            titleNode;

        if (contentSelector) {
            content.node = Y.one(frag.all(contentSelector).toFrag());
        } else {
            content.node = frag;
        }

        if (titleSelector) {
            titleNode = frag.one(titleSelector);

            if (titleNode) {
                content.title = titleNode.get('text');
            }
        }

        return content;
    },

    // -- Private Methods ------------------------------------------------------
    _defaultRoute: function (req) {
        // If there's an outstanding request, abort it.
        this._request && this._request.abort();

        // Send a request.
        this._request = Y.io(req.url, {
            context: this,
            headers: {'X-PJAX': 'true'},
            timeout: this.get('timeout'),

            on: {
                end    : this._onPjaxIOEnd,
                failure: this._onPjaxIOFailure,
                success: this._onPjaxIOSuccess
            }
        });
    },

    // -- Event Handlers -------------------------------------------------------
    _defCompleteFn: function (e) {
        var container = this.get('container'),
            content   = e.content;

        if (container && content.node) {
            container.setContent(content.node);
        }

        if (content.title && Y.config.doc) {
            Y.config.doc.title = content.title;
        }
    },

    _onPjaxIOEnd: function () {
        this._request = null;
    },

    _onPjaxIOFailure: function (id, res) {
        var content = this.getContent(res.responseText);

        this.fire(EVT_ERROR, {
            content     : content,
            responseText: res.responseText,
            status      : res.status
        });
    },

    _onPjaxIOSuccess: function (id, res, args) {
        var content = this.getContent(res.responseText);

        this.fire(EVT_LOAD, {
            content     : content,
            responseText: res.responseText,
            status      : res.status
        });
    }
}, {
    ATTRS: {
        container: {
            value: null,

            setter: function (node) {
                return node ? Y.one(node) : null;
            }
        },

        contentSelector: {
            value: null
        },

        routes: {
            value: [
                {path: '*', callback: '_defaultRoute'}
            ]
        },

        titleSelector: {
            value: 'title'
        },

        timeout: {
            value: 30000
        }
    }
});


}, '@VERSION@' ,{requires:['pjax-base', 'io-base']});
