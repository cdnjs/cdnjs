/*
 * jQuery Promin
 * Changes big, dodgy forms into small, compact, minimal ones.
 * https://timseverien.github.io/promin/
 */

(function($) {
    var index = -1;
    var $form, $steps;
    var keys = [];

    $.promin = {
        key: {
            backspace: 8,
            tab: 9,
            enter: 13, // alias for return
            return: 13,
            shift: 16,
            ctrl: 17,
            alt: 18,
            caps: 20,
            escape: 27,
            space: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            del: 46
        }
    };

    var settings = {
        ajaxCallback: null,
        autofocus: true,

        actions: {
            submit: 'default'
        },

        events: {
            change: null,
            next: null,
            previous: null,
            submit: null,
            reset: null
        },

        shortcuts: {
            next: [$.promin.key.tab, $.promin.key.enter],
            previous: [[$.promin.key.tab, $.promin.key.shift]],
            reset: [$.promin.key.escape]
        }
    };

    var methods = {
        next: function(ignoreEvents) {
            var next = index + 1;

            if(pmethods.eventIsSet('next', ignoreEvents)) {
                if(settings.events.next.call(this, next) === false) return;
            }

            if(next === $steps.length) methods.submit();
            else methods.show(next);
        },

        previous: function(ignoreEvents) {
            var next = index - 1;

            if(pmethods.eventIsSet('previous', ignoreEvents)) {
                if(settings.events.next.call(this, next) === false) return;
            }

            if(next < 0) return;
            methods.show(next);
        },

        show: function(i, ignoreEvents, init) {
            var step, field;

            if(pmethods.eventIsSet('change', ignoreEvents)) {
                if(settings.events.change.call(this, i) === false) return;
            }

            step = $steps.eq(index);
            field = pmethods.getField(step);

            step.hide();
            field.blur();

            if(i < $steps.length) {
                step = $steps.eq(i);
                field = pmethods.getField(step);

                step.show();
                if(!init || settings.autofocus) field.focus();
            }

            index = i;
        },

        submit: function(ignoreEvents) {
            var fields;

            if(pmethods.eventIsSet('submit', ignoreEvents)) {
                fields = $steps.find('input, textarea, select');
                if(settings.events.submit.call(this, fields) === false) return;
            }

            if(settings.actions.submit && settings.actions.submit === 'default') {
                $form.submit();
            } else if(settings.actions.submit && settings.actions.submit === 'ajax') {
                var url = $form.attr('action');
                fields = $form.serialize();
                fields.ajax = true;

                $.ajax({
                    cache: false,
                    complete: settings.ajaxCallback,
                    data: fields,
                    type: 'POST',
                    url: url
                });
            }
        },

        reset: function(ignoreEvents) {
            methods.show(0, false, true);

            $steps.find('input').each(pmethods.resetInput);
            $steps.find('textarea').each(pmethods.resetTextarea);
            $steps.find('select').each(pmethods.resetSelect);

            if(pmethods.eventIsSet('reset', ignoreEvents)) {
                settings.events.reset.call(this);
            }
        }
    };

    var pmethods = {
        init: function(opt) {
            $.extend(settings, opt);

            $form = this;
            $steps = this.find('.pm-step');
            $form.addClass('promin');

            $steps.hide().each(function(i, e) {
                var $e = $(e);
                var field = pmethods.getField($e);

                field.keydown(pmethods.keydownHandler);
                field.keyup(pmethods.keyupHandler);
            });

            if($steps.length > 0) methods.show(0, false, true);
        },

        keydownHandler: function(e) {
            keys.push(e.keyCode);

            if(!settings.shortcuts) return;

            if(settings.shortcuts.next && settings.shortcuts.next.length > 0 && pmethods.keydown.apply(null, settings.shortcuts.next)) {
                methods.next();
                return false;
            }

            if(settings.shortcuts.previous && settings.shortcuts.previous.length > 0 && pmethods.keydown.apply(null, settings.shortcuts.previous)) {
                methods.previous();
                return false;
            }

            if(settings.shortcuts.reset && settings.shortcuts.reset.length > 0 && pmethods.keydown.apply(null, settings.shortcuts.reset)) {
                methods.reset();
                return false;
            }
        },

        keyupHandler: function(e) {
            var i = keys.length;

            while(i--) {
                if(keys[i] === e.keyCode) {
                    keys.splice(i, 1);
                }
            }
        },

        keydown: function() {
            var keysdown = false;

            $.each(arguments, function(i, keyset) {
                if(typeof keyset === 'number') {
                    if(keys.length !== 1) return;

                    if($.inArray(keyset, keys) >= 0) {
                        keysdown = true;
                        return false;
                    }
                } else {
                    if(keyset.length !== keys.length) return;

                    var equal = 0;

                    $.each(keyset, function(i, key) {
                        if($.inArray(key, keys) >= 0) equal++;
                    });

                    if(equal === keyset.length) {
                        keysdown = true;
                        return false;
                    }
                }
            });

            return keysdown;
        },

        resetInput: function(i, e) {
            var $e = $(e);
            $e.val($e.attr('value'));
        },

        resetTextarea: function(i, e) {
            var $e = $(e);
            $e.val($e.html());
        },

        resetSelect: function(i, e) {
            var $e = $(e);
            var val = $e.find('option[selected]').attr('value');
            $e.val(val);
        },

        getField: function(e) {
            var tag = e.prop('nodeName').toLowerCase();
            var desc = e.find('input, textarea, select');

            if(tag === 'input' || tag === 'textarea' || tag === 'select') return e;
	        if(desc.length > 0) return desc.eq(0);
            return desc;
        },

        eventIsSet: function(name, ignoreEvents) {
            return (!ignoreEvents && settings.events && settings.events[name] && typeof settings.events[name] === 'function');
        }
    };

    $.fn.promin = function(opt) {
        if(methods[opt]) {
            return methods[opt].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof opt === 'object' || !opt) {
            return pmethods.init.apply(this, arguments);
        }

        return this;
    };
})(jQuery);
