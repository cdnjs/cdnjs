/*
 * jQote2 - client-side Javascript templating engine
 * Copyright (C) 2010, aefxx
 * http://aefxx.com/
 *
 * Dual licensed under the WTFPL v2 or MIT (X11) licenses
 * WTFPL v2 Copyright (C) 2004, Sam Hocevar
 *
 * Date: Thu, Oct 21st, 2010
 * Version: 0.9.7
 */
(function($) {
    var JQOTE2_TMPL_UNDEF_ERROR = 'UndefinedTemplateError',
        JQOTE2_TMPL_COMP_ERROR  = 'TemplateCompilationError',
        JQOTE2_TMPL_EXEC_ERROR  = 'TemplateExecutionError';

    var ARR  = '[object Array]',
        STR  = '[object String]',
        FUNC = '[object Function]';

    var n = 1, tag = '%',
        qreg = /^[^<]*(<[\w\W]+>)[^>]*$/,
        type_of = Object.prototype.toString;

    function raise(error, ext) {
        throw ($.extend(error, ext), error);
    }

    function dotted_ns(fn) {
        var ns = [];

        if ( type_of.call(fn) !== ARR ) return false;

        for ( var i=0,l=fn.length; i < l; i++ )
            ns[i] = fn[i].jqote_id;

        return ns.length ?
            ns.sort().join('.').replace(/(\b\d+\b)\.(?:\1(\.|$))+/g, '$1$2') : false;
    }

    function lambda(tmpl, t) {
        var f, fn = [], t = t || tag,
            type = type_of.call(tmpl);

        if ( type === FUNC )
            return tmpl.jqote_id ? [tmpl] : false;

        if ( type !== ARR )
            return [$.jqotec(tmpl, t)];

        if ( type === ARR )
            for ( var i=0,l=tmpl.length; i < l; i++ )
                if ( f = lambda(tmpl[i], t) ) fn.push(f[0]);

        return fn.length ? fn : false;
    }

    $.fn.extend({
        jqote: function(data, t) {
            var data = type_of.call(data) === ARR ? data : [data],
                dom = '';

            this.each(function(i) {
                var fn = $.jqotec(this, t);

                for ( var j=0; j < data.length; j++ )
                    dom += fn.call(data[j], i, j, data, fn);
            });

            return dom;
        }
    });

    $.each({app: 'append', pre: 'prepend', sub: 'html'}, function(name, method) {
        $.fn['jqote'+name] = function(elem, data, t) {
            var ns, regexp, str = $.jqote(elem, data, t),
                $$ = !qreg.test(str) ?
                    function(str) {return $(document.createTextNode(str));} : $;

            if ( !!(ns = dotted_ns(lambda(elem))) )
                regexp = new RegExp('(^|\\.)'+ns.split('.').join('\\.(.*)?')+'(\\.|$)');

            return this.each(function() {
                var dom = $$(str);

                $(this)[method](dom);

                ( dom[0].nodeType === 3 ?
                    $(this) : dom ).trigger('jqote.'+name, [dom, regexp]);
            });
        };
    });

    $.extend({
        jqote: function(elem, data, t) {
            var str = '', t = t || tag,
                fn = lambda(elem);

            if ( fn === false )
                raise(new Error('Empty or undefined template passed to $.jqote'), {type: JQOTE2_TMPL_UNDEF_ERROR});

            data = type_of.call(data) !== ARR ?
                [data] : data;

            for ( var i=0,l=fn.length; i < l; i++ )
                for ( var j=0; j < data.length; j++ )
                    str += fn[i].call(data[j], i, j, data, fn[i]);

            return str;
        },

        jqotec: function(template, t) {
            var cache, elem, tmpl, t = t || tag,
                type = type_of.call(template);

            if ( type === STR && qreg.test(template) ) {
                elem = tmpl = template;

                if ( cache = $.jqotecache[template] ) return cache;
            } else {
                elem = type === STR || template.nodeType ?
                    $(template) : template instanceof jQuery ?
                        template : null;

                if ( !elem[0] || !(tmpl = elem[0].innerHTML) && !(tmpl = elem.text()) )
                    raise(new Error('Empty or undefined template passed to $.jqotec'), {type: JQOTE2_TMPL_UNDEF_ERROR});

                if ( cache = $.jqotecache[$.data(elem[0], 'jqote_id')] ) return cache;
            }

            var str = '', index,
                arr = tmpl.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]/g, '')
                    .split('<'+t).join(t+'>\x1b')
                        .split(t+'>');

            for ( var m=0,l=arr.length; m < l; m++ )
                str += arr[m].charAt(0) !== '\x1b' ?
                    "out+='" + arr[m].replace(/(\\|["'])/g, '\\$1') + "'" : (arr[m].charAt(1) === '=' ?
                        ';out+=(' + arr[m].substr(2) + ');' : (arr[m].charAt(1) === '!' ?
                            ';out+=$.jqotenc((' + arr[m].substr(2) + '));' : ';' + arr[m].substr(1)));

            str = 'try{' +
                ('var out="";'+str+';return out;')
                    .split("out+='';").join('')
                        .split('var out="";out+=').join('var out=') +
                '}catch(e){e.type="'+JQOTE2_TMPL_EXEC_ERROR+'";e.args=arguments;e.template=arguments.callee.toString();throw e;}';

            try {
                var fn = new Function('i, j, data, fn', str);
            } catch ( e ) { raise(e, {type: JQOTE2_TMPL_COMP_ERROR}); }

            index = elem instanceof jQuery ?
                $.data(elem[0], 'jqote_id', n) : elem;

            return $.jqotecache[index] = (fn.jqote_id = n++, fn);
        },

        jqotefn: function(elem) {
            var type = type_of.call(elem),
                index = type === STR && qreg.test(elem) ?
                    elem : $.data($(elem)[0], 'jqote_id');

            return $.jqotecache[index] || false;
        },

        jqotetag: function(str) {
            if ( type_of.call(str) === STR ) tag = str;
        },

        jqotenc: function(str) {
            return str.toString()
                    .replace(/&(?!\w+;)/g, '&#38;')
                        .split('<').join('&#60;').split('>').join('&#62;')
                            .split('"').join('&#34;').split("'").join('&#39;');
        },

        jqotecache: {}
    });

    $.event.special.jqote = {
        add: function(obj) {
            var ns, handler = obj.handler,
                data = !obj.data ?
                    [] : type_of.call(obj.data) !== ARR ?
                        [obj.data] : obj.data;

            if ( !obj.namespace ) obj.namespace = 'app.pre.sub';
            if ( !data.length || !(ns = dotted_ns(lambda(data))) ) return;

            obj.handler = function(event, dom, regexp) {
                return !regexp || regexp.test(ns) ?
                    handler.apply(this, [event, dom]) : null;
            };
        }
    };
})(jQuery);
