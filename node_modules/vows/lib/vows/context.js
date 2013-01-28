
this.Context = function (vow, ctx, env) {
    var that = this;

    this.tests = vow.callback;
    this.topics = (ctx.topics || []).slice(0);
    this.emitter = null;
    this.env = env || {};
    this.env.context = this;

    this.env.callback = function (/* arguments */) {
        var ctx = this;
        var args = Array.prototype.slice.call(arguments);

        var emit = (function (args) {
            //
            // Convert callback-style results into events.
            //
            if (vow.batch.suite.options.error) {
                return function () {
                    var e = args.shift();
                    that.emitter.ctx = ctx;
                    // We handle a special case, where the first argument is a
                    // boolean, in which case we treat it as a result, and not
                    // an error. This is useful for `path.exists` and other
                    // functions like it, which only pass a single boolean
                    // parameter instead of the more common (error, result) pair.
                    if (typeof(e) === 'boolean' && args.length === 0) {
                        that.emitter.emit.call(that.emitter, 'success', e);
                    } else {
                        if (e) { that.emitter.emit.apply(that.emitter, ['error', e].concat(args)) }
                        else   { that.emitter.emit.apply(that.emitter, ['success'].concat(args)) }
                    }
                };
            } else {
                return function () {
                    that.emitter.ctx = ctx;
                    that.emitter.emit.apply(that.emitter, ['success'].concat(args));
                };
            }
        })(args.slice(0));
        // If `this.callback` is called synchronously,
        // the emitter will not have been set yet,
        // so we defer the emition, that way it'll behave
        // asynchronously.
        if (that.emitter) { emit() }
        else              { process.nextTick(emit) }
    };
    this.name = vow.description;
    // events is an alias for on
    if (this.name === 'events') {
      this.name = vow.description = 'on';
    }

    // if this is a sub-event context AND it's context was an event,
    // then I must enforce event order.
    // this will not do a good job of handling pin-pong events
    if (this.name === 'on' && ctx.isEvent) {
        this.after = ctx.name;
    }

    if (ctx.name === 'on') {
        this.isEvent = true;
        this.event = this.name;
        this.after = ctx.after;
    } else {
        this.isEvent = false;
        this.event = 'success';
    }

    this.title = [
        ctx.title || '',
        vow.description || ''
    ].join(/^[#.:]/.test(vow.description) ? '' : ' ').trim();
};

