// Callbacks
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.callbacks', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    var _init   = PNotify.prototype.init,
        _open   = PNotify.prototype.open,
        _remove = PNotify.prototype.remove;
    PNotify.prototype.init = function(){
        if (this.options.before_init) {
            this.options.before_init(this.options);
        }
        _init.apply(this, arguments);
        if (this.options.after_init) {
            this.options.after_init(this);
        }
    };
    PNotify.prototype.open = function(){
        var ret;
        if (this.options.before_open) {
            ret = this.options.before_open(this);
        }
        if (ret !== false) {
            _open.apply(this, arguments);
            if (this.options.after_open) {
                this.options.after_open(this);
            }
        }
    };
    PNotify.prototype.remove = function(timer_hide){
        var ret;
        if (this.options.before_close) {
            ret = this.options.before_close(this, timer_hide);
        }
        if (ret !== false) {
            _remove.apply(this, arguments);
            if (this.options.after_close) {
                this.options.after_close(this, timer_hide);
            }
        }
    };
}));
