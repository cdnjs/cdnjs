/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/





var Ext = Ext || {};
Ext._startTime = new Date().getTime();
(function() {
    var global = this,
        objectPrototype = Object.prototype,
        toString = objectPrototype.toString,
        enumerables = true,
        enumerablesTest = {toString: 1},
        emptyFn = function () {},
        
        
        callOverrideParent = function () {
            var method = callOverrideParent.caller.caller; 
            return method.$owner.prototype[method.$name].apply(this, arguments);
        },
        i,
        nonWhitespaceRe = /\S/,
        ExtApp,
        iterableRe = /\[object\s*(?:Array|Arguments|\w*Collection|\w*List|HTML\s+document\.all\s+class)\]/;

    Function.prototype.$extIsFunction = true;

    Ext.global = global;

    for (i in enumerablesTest) {
        enumerables = null;
    }

    if (enumerables) {
        enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
                       'toLocaleString', 'toString', 'constructor'];
    }

    
    Ext.enumerables = enumerables;

    
    Ext.apply = function(object, config, defaults) {
        if (defaults) {
            Ext.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }

        return object;
    };

    Ext.buildSettings = Ext.apply({
        baseCSSPrefix: 'x-'
    }, Ext.buildSettings || {});

    Ext.apply(Ext, {

        
        name: Ext.sandboxName || 'Ext',

        
        emptyFn: emptyFn,
        
        
        identityFn: function(o) {
            return o;
        },

        
        emptyString: new String(),

        baseCSSPrefix: Ext.buildSettings.baseCSSPrefix,

        
        applyIf: function(object, config) {
            var property;

            if (object) {
                for (property in config) {
                    if (object[property] === undefined) {
                        object[property] = config[property];
                    }
                }
            }

            return object;
        },

        
        iterate: function(object, fn, scope) {
            if (Ext.isEmpty(object)) {
                return;
            }

            if (scope === undefined) {
                scope = object;
            }

            if (Ext.isIterable(object)) {
                Ext.Array.each.call(Ext.Array, object, fn, scope);
            }
            else {
                Ext.Object.each.call(Ext.Object, object, fn, scope);
            }
        }
    });

    Ext.apply(Ext, {

        
        extend: (function() {
            
            var objectConstructor = objectPrototype.constructor,
                inlineOverrides = function(o) {
                for (var m in o) {
                    if (!o.hasOwnProperty(m)) {
                        continue;
                    }
                    this[m] = o[m];
                }
            };

            return function(subclass, superclass, overrides) {
                
                if (Ext.isObject(superclass)) {
                    overrides = superclass;
                    superclass = subclass;
                    subclass = overrides.constructor !== objectConstructor ? overrides.constructor : function() {
                        superclass.apply(this, arguments);
                    };
                }


                
                var F = function() {},
                    subclassProto, superclassProto = superclass.prototype;

                F.prototype = superclassProto;
                subclassProto = subclass.prototype = new F();
                subclassProto.constructor = subclass;
                subclass.superclass = superclassProto;

                if (superclassProto.constructor === objectConstructor) {
                    superclassProto.constructor = superclass;
                }

                subclass.override = function(overrides) {
                    Ext.override(subclass, overrides);
                };

                subclassProto.override = inlineOverrides;
                subclassProto.proto = subclassProto;

                subclass.override(overrides);
                subclass.extend = function(o) {
                    return Ext.extend(subclass, o);
                };

                return subclass;
            };
        }()),

        
        override: function (target, overrides) {
            if (target.$isClass) {
                target.override(overrides);
            } else if (typeof target == 'function') {
                Ext.apply(target.prototype, overrides);
            } else {
                var owner = target.self,
                    name, value;

                if (owner && owner.$isClass) { 
                    for (name in overrides) {
                        if (overrides.hasOwnProperty(name)) {
                            value = overrides[name];

                            if (typeof value == 'function') {

                                value.$name = name;
                                value.$owner = owner;
                                value.$previous = target.hasOwnProperty(name)
                                    ? target[name] 
                                    : callOverrideParent; 
                            }

                            target[name] = value;
                        }
                    }
                } else {
                    Ext.apply(target, overrides);
                }
            }

            return target;
        }
    });

    
    Ext.apply(Ext, {

        
        valueFrom: function(value, defaultValue, allowBlank){
            return Ext.isEmpty(value, allowBlank) ? defaultValue : value;
        },

        
        typeOf: function(value) {
            var type,
                typeToString;
            
            if (value === null) {
                return 'null';
            }

            type = typeof value;

            if (type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
                return type;
            }

            typeToString = toString.call(value);

            switch(typeToString) {
                case '[object Array]':
                    return 'array';
                case '[object Date]':
                    return 'date';
                case '[object Boolean]':
                    return 'boolean';
                case '[object Number]':
                    return 'number';
                case '[object RegExp]':
                    return 'regexp';
            }

            if (type === 'function') {
                return 'function';
            }

            if (type === 'object') {
                if (value.nodeType !== undefined) {
                    if (value.nodeType === 3) {
                        return (nonWhitespaceRe).test(value.nodeValue) ? 'textnode' : 'whitespace';
                    }
                    else {
                        return 'element';
                    }
                }

                return 'object';
            }

        },

        
        coerce: function(from, to) {
            var fromType = Ext.typeOf(from),
                toType = Ext.typeOf(to),
                isString = typeof from === 'string';

            if (fromType !== toType) {
                switch (toType) {
                    case 'string':
                        return String(from);
                    case 'number':
                        return Number(from);
                    case 'boolean':
                        return isString && (!from || from === 'false') ? false : Boolean(from);
                    case 'null':
                        return isString && (!from || from === 'null') ? null : from;
                    case 'undefined':
                        return isString && (!from || from === 'undefined') ? undefined : from;
                    case 'date':
                        return isString && isNaN(from) ? Ext.Date.parse(from, Ext.Date.defaultFormat) : Date(Number(from));
                }
            }
            return from;
        },

        
        isEmpty: function(value, allowEmptyString) {
            return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (Ext.isArray(value) && value.length === 0);
        },

        
        isArray: ('isArray' in Array) ? Array.isArray : function(value) {
            return toString.call(value) === '[object Array]';
        },

        
        isDate: function(value) {
            return toString.call(value) === '[object Date]';
        },

        
        isObject: (toString.call(null) === '[object Object]') ?
        function(value) {
            
            return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
        } :
        function(value) {
            return toString.call(value) === '[object Object]';
        },

        
        isSimpleObject: function(value) {
            return value instanceof Object && value.constructor === Object;
        },
        
        isPrimitive: function(value) {
            var type = typeof value;

            return type === 'string' || type === 'number' || type === 'boolean';
        },

        
        isFunction: function(value) {
            return !!(value && value.$extIsFunction);
        },

        
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        
        isNumeric: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },

        
        isString: function(value) {
            return typeof value === 'string';
        },

        
        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

        
        isElement: function(value) {
            return value ? value.nodeType === 1 : false;
        },

        
        isTextNode: function(value) {
            return value ? value.nodeName === "#text" : false;
        },

        
        isDefined: function(value) {
            return typeof value !== 'undefined';
        },

        
        isIterable: function(value) {
            
            if (!value || typeof value.length !== 'number' || typeof value === 'string' || value.$extIsFunction) {
                return false;
            }

            
            
            
            if (!value.propertyIsEnumerable) {
                return !!value.item;
            }

            
            
            if (value.hasOwnProperty('length') && !value.propertyIsEnumerable('length')) {
                return true;
            }

            
            return iterableRe.test(toString.call(value));
        }
    });

    Ext.apply(Ext, {

        
        clone: function(item) {
            var type,
                i,
                j,
                k,
                clone,
                key;
            
            if (item === null || item === undefined) {
                return item;
            }

            
            
            
            if (item.nodeType && item.cloneNode) {
                return item.cloneNode(true);
            }

            type = toString.call(item);

            
            if (type === '[object Date]') {
                return new Date(item.getTime());
            }


            
            if (type === '[object Array]') {
                i = item.length;

                clone = [];

                while (i--) {
                    clone[i] = Ext.clone(item[i]);
                }
            }
            
            else if (type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = Ext.clone(item[key]);
                }

                if (enumerables) {
                    for (j = enumerables.length; j--;) {
                        k = enumerables[j];
                        if (item.hasOwnProperty(k)) {
                            clone[k] = item[k];
                        }
                    }
                }
            }

            return clone || item;
        },

        
        getUniqueGlobalNamespace: function() {
            var uniqueGlobalNamespace = this.uniqueGlobalNamespace,
                i;

            if (uniqueGlobalNamespace === undefined) {
                i = 0;

                do {
                    uniqueGlobalNamespace = 'ExtBox' + (++i);
                } while (Ext.global[uniqueGlobalNamespace] !== undefined);

                Ext.global[uniqueGlobalNamespace] = Ext;
                this.uniqueGlobalNamespace = uniqueGlobalNamespace;
            }

            return uniqueGlobalNamespace;
        },
        
        
        functionFactoryCache: {},
        
        cacheableFunctionFactory: function() {
            var me = this,
                args = Array.prototype.slice.call(arguments),
                cache = me.functionFactoryCache,
                idx, fn, ln;
                
             if (Ext.isSandboxed) {
                ln = args.length;
                if (ln > 0) {
                    ln--;
                    args[ln] = 'var Ext=window.' + Ext.name + ';' + args[ln];
                }
            }
            idx = args.join('');
            fn = cache[idx];
            if (!fn) {
                fn = Function.prototype.constructor.apply(Function.prototype, args);
                
                cache[idx] = fn;
            }
            return fn;
        },
        
        functionFactory: function() {
            var me = this,
                args = Array.prototype.slice.call(arguments),
                ln;
                
            if (Ext.isSandboxed) {
                ln = args.length;
                if (ln > 0) {
                    ln--;
                    args[ln] = 'var Ext=window.' + Ext.name + ';' + args[ln];
                }
            }
     
            return Function.prototype.constructor.apply(Function.prototype, args);
        },

        
        Logger: {
            verbose: emptyFn,
            log: emptyFn,
            info: emptyFn,
            warn: emptyFn,
            error: function(message) {
                throw new Error(message);
            },
            deprecate: emptyFn
        }
    });

    
    Ext.type = Ext.typeOf;
    
    
    
    
    ExtApp = Ext.app;
    if (!ExtApp) {
        ExtApp = Ext.app = {};
    }
    Ext.apply(ExtApp, {
        namespaces: {},
        
        
        collectNamespaces: function(paths) {
            var namespaces = Ext.app.namespaces,
                path;
            
            for (path in paths) {
                if (paths.hasOwnProperty(path)) {
                    namespaces[path] = true;
                }
            }
        },

        
        addNamespaces: function(ns) {
            var namespaces = Ext.app.namespaces,
                i, l;

            if (!Ext.isArray(ns)) {
                ns = [ns];
            }

            for (i = 0, l = ns.length; i < l; i++) {
                namespaces[ns[i]] = true;
            }
        },

        
        clearNamespaces: function() {
            Ext.app.namespaces = {};
        },

        
        getNamespace: function(className) {
            var namespaces    = Ext.app.namespaces,
                deepestPrefix = '',
                prefix;

            for (prefix in namespaces) {
                if (namespaces.hasOwnProperty(prefix)    &&
                    prefix.length > deepestPrefix.length &&
                    (prefix + '.' === className.substring(0, prefix.length + 1))) {
                    deepestPrefix = prefix;
                }
            }

            return deepestPrefix === '' ? undefined : deepestPrefix;
        }
    });
}());


Ext.globalEval = Ext.global.execScript
    ? function(code) {
        execScript(code);
    }
    : function($$code) {
        
        
        (function(){
            
            
            
            var Ext = this.Ext;
            eval($$code);
        }());
    };






(function() {



var version = '4.2.1.883', Version;
    Ext.Version = Version = Ext.extend(Object, {

        
        constructor: function(version) {
            var parts, releaseStartIndex;

            if (version instanceof Version) {
                return version;
            }

            this.version = this.shortVersion = String(version).toLowerCase().replace(/_/g, '.').replace(/[\-+]/g, '');

            releaseStartIndex = this.version.search(/([^\d\.])/);

            if (releaseStartIndex !== -1) {
                this.release = this.version.substr(releaseStartIndex, version.length);
                this.shortVersion = this.version.substr(0, releaseStartIndex);
            }

            this.shortVersion = this.shortVersion.replace(/[^\d]/g, '');

            parts = this.version.split('.');

            this.major = parseInt(parts.shift() || 0, 10);
            this.minor = parseInt(parts.shift() || 0, 10);
            this.patch = parseInt(parts.shift() || 0, 10);
            this.build = parseInt(parts.shift() || 0, 10);

            return this;
        },

        
        toString: function() {
            return this.version;
        },

        
        valueOf: function() {
            return this.version;
        },

        
        getMajor: function() {
            return this.major || 0;
        },

        
        getMinor: function() {
            return this.minor || 0;
        },

        
        getPatch: function() {
            return this.patch || 0;
        },

        
        getBuild: function() {
            return this.build || 0;
        },

        
        getRelease: function() {
            return this.release || '';
        },

        
        isGreaterThan: function(target) {
            return Version.compare(this.version, target) === 1;
        },

        
        isGreaterThanOrEqual: function(target) {
            return Version.compare(this.version, target) >= 0;
        },

        
        isLessThan: function(target) {
            return Version.compare(this.version, target) === -1;
        },

        
        isLessThanOrEqual: function(target) {
            return Version.compare(this.version, target) <= 0;
        },

        
        equals: function(target) {
            return Version.compare(this.version, target) === 0;
        },

        
        match: function(target) {
            target = String(target);
            return this.version.substr(0, target.length) === target;
        },

        
        toArray: function() {
            return [this.getMajor(), this.getMinor(), this.getPatch(), this.getBuild(), this.getRelease()];
        },

        
        getShortVersion: function() {
            return this.shortVersion;
        },

        
        gt: function() {
            return this.isGreaterThan.apply(this, arguments);
        },

        
        lt: function() {
            return this.isLessThan.apply(this, arguments);
        },

        
        gtEq: function() {
            return this.isGreaterThanOrEqual.apply(this, arguments);
        },

        
        ltEq: function() {
            return this.isLessThanOrEqual.apply(this, arguments);
        }
    });

    Ext.apply(Version, {
        
        releaseValueMap: {
            'dev': -6,
            'alpha': -5,
            'a': -5,
            'beta': -4,
            'b': -4,
            'rc': -3,
            '#': -2,
            'p': -1,
            'pl': -1
        },

        
        getComponentValue: function(value) {
            return !value ? 0 : (isNaN(value) ? this.releaseValueMap[value] || value : parseInt(value, 10));
        },

        
        compare: function(current, target) {
            var currentValue, targetValue, i;

            current = new Version(current).toArray();
            target = new Version(target).toArray();

            for (i = 0; i < Math.max(current.length, target.length); i++) {
                currentValue = this.getComponentValue(current[i]);
                targetValue = this.getComponentValue(target[i]);

                if (currentValue < targetValue) {
                    return -1;
                } else if (currentValue > targetValue) {
                    return 1;
                }
            }

            return 0;
        }
    });

    
    Ext.apply(Ext, {
        
        versions: {},

        
        lastRegisteredVersion: null,

        
        setVersion: function(packageName, version) {
            Ext.versions[packageName] = new Version(version);
            Ext.lastRegisteredVersion = Ext.versions[packageName];

            return this;
        },

        
        getVersion: function(packageName) {
            if (packageName === undefined) {
                return Ext.lastRegisteredVersion;
            }

            return Ext.versions[packageName];
        },

        
        deprecate: function(packageName, since, closure, scope) {
            if (Version.compare(Ext.getVersion(packageName), since) < 1) {
                closure.call(scope);
            }
        }
    }); 

    Ext.setVersion('core', version);

}());







Ext.String = (function() {
    var trimRegex     = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
        escapeRe      = /('|\\)/g,
        formatRe      = /\{(\d+)\}/g,
        escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g,
        basicTrimRe   = /^\s+|\s+$/g,
        whitespaceRe  = /\s+/,
        varReplace    = /(^[^a-z]*|[^\w])/gi,
        charToEntity,
        entityToChar,
        charToEntityRegex,
        entityToCharRegex,
        htmlEncodeReplaceFn = function(match, capture) {
            return charToEntity[capture];
        },
        htmlDecodeReplaceFn = function(match, capture) {
            return (capture in entityToChar) ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(2), 10));
        },
        boundsCheck = function(s, other){
            if (s === null || s === undefined || other === null || other === undefined) {
                return false;
            }
            
            return other.length <= s.length; 
        };

    return {
        
        
        insert: function(s, value, index) {
            if (!s) {
                return value;
            }
            
            if (!value) {
                return s;
            }
            
            var len = s.length;
            
            if (!index && index !== 0) {
                index = len;
            }
            
            if (index < 0) {
                index *= -1;
                if (index >= len) {
                    
                    index = 0;
                } else {
                    index = len - index;
                }
            }
            
            if (index === 0) {
                s = value + s;
            } else if (index >= s.length) {
                s += value;
            } else {
                s = s.substr(0, index) + value + s.substr(index);
            }
            return s;
        },
        
        
        startsWith: function(s, start, ignoreCase){
            var result = boundsCheck(s, start);
            
            if (result) {
                if (ignoreCase) {
                    s = s.toLowerCase();
                    start = start.toLowerCase();
                }
                result = s.lastIndexOf(start, 0) === 0;
            }
            return result;
        },
        
        
        endsWith: function(s, end, ignoreCase){
            var result = boundsCheck(s, end);
            
            if (result) {
                if (ignoreCase) {
                    s = s.toLowerCase();
                    end = end.toLowerCase();
                }
                result = s.indexOf(end, s.length - end.length) !== -1;
            }
            return result;
        },

        
        createVarName: function(s) {
            return s.replace(varReplace, '');
        },

        
        htmlEncode: function(value) {
            return (!value) ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
        },

        
        htmlDecode: function(value) {
            return (!value) ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
        },

        
        addCharacterEntities: function(newEntities) {
            var charKeys = [],
                entityKeys = [],
                key, echar;
            for (key in newEntities) {
                echar = newEntities[key];
                entityToChar[key] = echar;
                charToEntity[echar] = key;
                charKeys.push(echar);
                entityKeys.push(key);
            }
            charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
            entityToCharRegex = new RegExp('(' + entityKeys.join('|') + '|&#[0-9]{1,5};' + ')', 'g');
        },

        
        resetCharacterEntities: function() {
            charToEntity = {};
            entityToChar = {};
            
            this.addCharacterEntities({
                '&amp;'     :   '&',
                '&gt;'      :   '>',
                '&lt;'      :   '<',
                '&quot;'    :   '"',
                '&#39;'     :   "'"
            });
        },

        
        urlAppend : function(url, string) {
            if (!Ext.isEmpty(string)) {
                return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
            }

            return url;
        },

        
        trim: function(string) {
            return string.replace(trimRegex, "");
        },

        
        capitalize: function(string) {
            return string.charAt(0).toUpperCase() + string.substr(1);
        },

        
        uncapitalize: function(string) {
            return string.charAt(0).toLowerCase() + string.substr(1);
        },

        
        ellipsis: function(value, len, word) {
            if (value && value.length > len) {
                if (word) {
                    var vs = value.substr(0, len - 2),
                    index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                    if (index !== -1 && index >= (len - 15)) {
                        return vs.substr(0, index) + "...";
                    }
                }
                return value.substr(0, len - 3) + "...";
            }
            return value;
        },

        
        escapeRegex: function(string) {
            return string.replace(escapeRegexRe, "\\$1");
        },

        
        escape: function(string) {
            return string.replace(escapeRe, "\\$1");
        },

        
        toggle: function(string, value, other) {
            return string === value ? other : value;
        },

        
        leftPad: function(string, size, character) {
            var result = String(string);
            character = character || " ";
            while (result.length < size) {
                result = character + result;
            }
            return result;
        },

        
        format: function(format) {
            var args = Ext.Array.toArray(arguments, 1);
            return format.replace(formatRe, function(m, i) {
                return args[i];
            });
        },

        
        repeat: function(pattern, count, sep) {
            if (count < 1) {
                count = 0;
            }
            for (var buf = [], i = count; i--; ) {
                buf.push(pattern);
            }
            return buf.join(sep || '');
        },

        
        splitWords: function (words) {
            if (words && typeof words == 'string') {
                return words.replace(basicTrimRe, '').split(whitespaceRe);
            }
            return words || [];
        }
    };
}());


Ext.String.resetCharacterEntities();


Ext.htmlEncode = Ext.String.htmlEncode;



Ext.htmlDecode = Ext.String.htmlDecode;


Ext.urlAppend = Ext.String.urlAppend;







Ext.Number = new function() {

    var me = this,
        isToFixedBroken = (0.9).toFixed() !== '1',
        math = Math;

    Ext.apply(this, {
        
        constrain: function(number, min, max) {
            var x = parseFloat(number);

            
            

            
            
            
            
            
            return (x < min) ? min : ((x > max) ? max : x);
        },

        
        snap : function(value, increment, minValue, maxValue) {
            var m;

            
            
            if (value === undefined || value < minValue) {
                return minValue || 0;
            }

            if (increment) {
                m = value % increment;
                if (m !== 0) {
                    value -= m;
                    if (m * 2 >= increment) {
                        value += increment;
                    } else if (m * 2 < -increment) {
                        value -= increment;
                    }
                }
            }
            return me.constrain(value, minValue,  maxValue);
        },

        
        snapInRange : function(value, increment, minValue, maxValue) {
            var tween;

            
            minValue = (minValue || 0);

            
            if (value === undefined || value < minValue) {
                return minValue;
            }

            
            if (increment && (tween = ((value - minValue) % increment))) {
                value -= tween;
                tween *= 2;
                if (tween >= increment) {
                    value += increment;
                }
            }

            
            if (maxValue !== undefined) {
                if (value > (maxValue = me.snapInRange(maxValue, increment, minValue))) {
                    value = maxValue;
                }
            }

            return value;
        },

        
        toFixed: isToFixedBroken ? function(value, precision) {
            precision = precision || 0;
            var pow = math.pow(10, precision);
            return (math.round(value * pow) / pow).toFixed(precision);
        } : function(value, precision) {
            return value.toFixed(precision);
        },

        
        from: function(value, defaultValue) {
            if (isFinite(value)) {
                value = parseFloat(value);
            }

            return !isNaN(value) ? value : defaultValue;
        },

        
        randomInt: function (from, to) {
           return math.floor(math.random() * (to - from + 1) + from);
        },
        
        
        correctFloat: function(n) {
            
            
            
            return parseFloat(n.toPrecision(14));
        }
    });

    
    Ext.num = function() {
        return me.from.apply(this, arguments);
    };
};






(function() {

    var arrayPrototype = Array.prototype,
        slice = arrayPrototype.slice,
        supportsSplice = (function () {
            var array = [],
                lengthBefore,
                j = 20;

            if (!array.splice) {
                return false;
            }

            
            

            while (j--) {
                array.push("A");
            }

            array.splice(15, 0, "F", "F", "F", "F", "F","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F");

            lengthBefore = array.length; 
            array.splice(13, 0, "XXX"); 

            if (lengthBefore+1 != array.length) {
                return false;
            }
            

            return true;
        }()),
        supportsForEach = 'forEach' in arrayPrototype,
        supportsMap = 'map' in arrayPrototype,
        supportsIndexOf = 'indexOf' in arrayPrototype,
        supportsEvery = 'every' in arrayPrototype,
        supportsSome = 'some' in arrayPrototype,
        supportsFilter = 'filter' in arrayPrototype,
        supportsSort = (function() {
            var a = [1,2,3,4,5].sort(function(){ return 0; });
            return a[0] === 1 && a[1] === 2 && a[2] === 3 && a[3] === 4 && a[4] === 5;
        }()),
        supportsSliceOnNodeList = true,
        ExtArray,
        erase,
        replace,
        splice;

    try {
        
        if (typeof document !== 'undefined') {
            slice.call(document.getElementsByTagName('body'));
        }
    } catch (e) {
        supportsSliceOnNodeList = false;
    }

    function fixArrayIndex (array, index) {
        return (index < 0) ? Math.max(0, array.length + index)
                           : Math.min(array.length, index);
    }

    
    function replaceSim (array, index, removeCount, insert) {
        var add = insert ? insert.length : 0,
            length = array.length,
            pos = fixArrayIndex(array, index),
            remove,
            tailOldPos,
            tailNewPos,
            tailCount,
            lengthAfterRemove,
            i;

        
        if (pos === length) {
            if (add) {
                array.push.apply(array, insert);
            }
        } else {
            remove = Math.min(removeCount, length - pos);
            tailOldPos = pos + remove;
            tailNewPos = tailOldPos + add - remove;
            tailCount = length - tailOldPos;
            lengthAfterRemove = length - remove;

            if (tailNewPos < tailOldPos) { 
                for (i = 0; i < tailCount; ++i) {
                    array[tailNewPos+i] = array[tailOldPos+i];
                }
            } else if (tailNewPos > tailOldPos) { 
                for (i = tailCount; i--; ) {
                    array[tailNewPos+i] = array[tailOldPos+i];
                }
            } 

            if (add && pos === lengthAfterRemove) {
                array.length = lengthAfterRemove; 
                array.push.apply(array, insert);
            } else {
                array.length = lengthAfterRemove + add; 
                for (i = 0; i < add; ++i) {
                    array[pos+i] = insert[i];
                }
            }
        }

        return array;
    }

    function replaceNative (array, index, removeCount, insert) {
        if (insert && insert.length) {
            
            if (index === 0 && !removeCount) {
                array.unshift.apply(array, insert);
            }
            
            else if (index < array.length) {
                array.splice.apply(array, [index, removeCount].concat(insert));
            }
            
            else {
                array.push.apply(array, insert);
            }
        } else {
            array.splice(index, removeCount);
        }
        return array;
    }

    function eraseSim (array, index, removeCount) {
        return replaceSim(array, index, removeCount);
    }

    function eraseNative (array, index, removeCount) {
        array.splice(index, removeCount);
        return array;
    }

    function spliceSim (array, index, removeCount) {
        var pos = fixArrayIndex(array, index),
            removed = array.slice(index, fixArrayIndex(array, pos+removeCount));

        if (arguments.length < 4) {
            replaceSim(array, pos, removeCount);
        } else {
            replaceSim(array, pos, removeCount, slice.call(arguments, 3));
        }

        return removed;
    }

    function spliceNative (array) {
        return array.splice.apply(array, slice.call(arguments, 1));
    }

    erase = supportsSplice ? eraseNative : eraseSim;
    replace = supportsSplice ? replaceNative : replaceSim;
    splice = supportsSplice ? spliceNative : spliceSim;

    

    ExtArray = Ext.Array = {
        
        each: function(array, fn, scope, reverse) {
            array = ExtArray.from(array);

            var i,
                ln = array.length;

            if (reverse !== true) {
                for (i = 0; i < ln; i++) {
                    if (fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }
            else {
                for (i = ln - 1; i > -1; i--) {
                    if (fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }

            return true;
        },

        
        forEach: supportsForEach ? function(array, fn, scope) {
            array.forEach(fn, scope);
        } : function(array, fn, scope) {
            var i = 0,
                ln = array.length;

            for (; i < ln; i++) {
                fn.call(scope, array[i], i, array);
            }
        },

        
        indexOf: supportsIndexOf ? function(array, item, from) {
            return arrayPrototype.indexOf.call(array, item, from);
         } : function(array, item, from) {
            var i, length = array.length;

            for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
                if (array[i] === item) {
                    return i;
                }
            }

            return -1;
        },

        
        contains: supportsIndexOf ? function(array, item) {
            return arrayPrototype.indexOf.call(array, item) !== -1;
        } : function(array, item) {
            var i, ln;

            for (i = 0, ln = array.length; i < ln; i++) {
                if (array[i] === item) {
                    return true;
                }
            }

            return false;
        },

        
        toArray: function(iterable, start, end){
            if (!iterable || !iterable.length) {
                return [];
            }

            if (typeof iterable === 'string') {
                iterable = iterable.split('');
            }

            if (supportsSliceOnNodeList) {
                return slice.call(iterable, start || 0, end || iterable.length);
            }

            var array = [],
                i;

            start = start || 0;
            end = end ? ((end < 0) ? iterable.length + end : end) : iterable.length;

            for (i = start; i < end; i++) {
                array.push(iterable[i]);
            }

            return array;
        },

        
        pluck: function(array, propertyName) {
            var ret = [],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                ret.push(item[propertyName]);
            }

            return ret;
        },

        
        map: supportsMap ? function(array, fn, scope) {
            return array.map(fn, scope);
        } : function(array, fn, scope) {
            var results = [],
                i = 0,
                len = array.length;

            for (; i < len; i++) {
                results[i] = fn.call(scope, array[i], i, array);
            }

            return results;
        },

        
        every: supportsEvery ? function(array, fn, scope) {
            return array.every(fn, scope);
        } : function(array, fn, scope) {
            var i = 0,
                ln = array.length;

            for (; i < ln; ++i) {
                if (!fn.call(scope, array[i], i, array)) {
                    return false;
                }
            }

            return true;
        },

        
        some: supportsSome ? function(array, fn, scope) {
            return array.some(fn, scope);
        } : function(array, fn, scope) {
            var i = 0,
                ln = array.length;

            for (; i < ln; ++i) {
                if (fn.call(scope, array[i], i, array)) {
                    return true;
                }
            }

            return false;
        },
        
        
        equals: function(array1, array2) {
            var len1 = array1.length,
                len2 = array2.length,
                i;
                
            
            if (array1 === array2) {
                return true;
            }
                
            if (len1 !== len2) {
                return false;
            }
            
            for (i = 0; i < len1; ++i) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }
            
            return true;
        },

        
        clean: function(array) {
            var results = [],
                i = 0,
                ln = array.length,
                item;

            for (; i < ln; i++) {
                item = array[i];

                if (!Ext.isEmpty(item)) {
                    results.push(item);
                }
            }

            return results;
        },

        
        unique: function(array) {
            var clone = [],
                i = 0,
                ln = array.length,
                item;

            for (; i < ln; i++) {
                item = array[i];

                if (ExtArray.indexOf(clone, item) === -1) {
                    clone.push(item);
                }
            }

            return clone;
        },

        
        filter: supportsFilter ? function(array, fn, scope) {
            return array.filter(fn, scope);
        } : function(array, fn, scope) {
            var results = [],
                i = 0,
                ln = array.length;

            for (; i < ln; i++) {
                if (fn.call(scope, array[i], i, array)) {
                    results.push(array[i]);
                }
            }

            return results;
        },

        
        findBy : function(array, fn, scope) {
            var i = 0,
                len = array.length;

            for (; i < len; i++) {
                if (fn.call(scope || array, array[i], i)) {
                    return array[i];
                }
            }
            return null;
        },

        
        from: function(value, newReference) {
            if (value === undefined || value === null) {
                return [];
            }

            if (Ext.isArray(value)) {
                return (newReference) ? slice.call(value) : value;
            }

            var type = typeof value;
            
            
            if (value && value.length !== undefined && type !== 'string' && (type !== 'function' || !value.apply)) {
                return ExtArray.toArray(value);
            }

            return [value];
        },

        
        remove: function(array, item) {
            var index = ExtArray.indexOf(array, item);

            if (index !== -1) {
                erase(array, index, 1);
            }

            return array;
        },

        
        include: function(array, item) {
            if (!ExtArray.contains(array, item)) {
                array.push(item);
            }
        },

        
        clone: function(array) {
            return slice.call(array);
        },

        
        merge: function() {
            var args = slice.call(arguments),
                array = [],
                i, ln;

            for (i = 0, ln = args.length; i < ln; i++) {
                array = array.concat(args[i]);
            }

            return ExtArray.unique(array);
        },

        
        intersect: function() {
            var intersection = [],
                arrays = slice.call(arguments),
                arraysLength,
                array,
                arrayLength,
                minArray,
                minArrayIndex,
                minArrayCandidate,
                minArrayLength,
                element,
                elementCandidate,
                elementCount,
                i, j, k;

            if (!arrays.length) {
                return intersection;
            }

            
            arraysLength = arrays.length;
            for (i = minArrayIndex = 0; i < arraysLength; i++) {
                minArrayCandidate = arrays[i];
                if (!minArray || minArrayCandidate.length < minArray.length) {
                    minArray = minArrayCandidate;
                    minArrayIndex = i;
                }
            }

            minArray = ExtArray.unique(minArray);
            erase(arrays, minArrayIndex, 1);

            
            
            
            minArrayLength = minArray.length;
            arraysLength = arrays.length;
            for (i = 0; i < minArrayLength; i++) {
                element = minArray[i];
                elementCount = 0;

                for (j = 0; j < arraysLength; j++) {
                    array = arrays[j];
                    arrayLength = array.length;
                    for (k = 0; k < arrayLength; k++) {
                        elementCandidate = array[k];
                        if (element === elementCandidate) {
                            elementCount++;
                            break;
                        }
                    }
                }

                if (elementCount === arraysLength) {
                    intersection.push(element);
                }
            }

            return intersection;
        },

        
        difference: function(arrayA, arrayB) {
            var clone = slice.call(arrayA),
                ln = clone.length,
                i, j, lnB;

            for (i = 0,lnB = arrayB.length; i < lnB; i++) {
                for (j = 0; j < ln; j++) {
                    if (clone[j] === arrayB[i]) {
                        erase(clone, j, 1);
                        j--;
                        ln--;
                    }
                }
            }

            return clone;
        },

        
        
        slice: ([1,2].slice(1, undefined).length ?
            function (array, begin, end) {
                return slice.call(array, begin, end);
            } :
            
            function (array, begin, end) {
                
                
                if (typeof begin === 'undefined') {
                    return slice.call(array);
                }
                if (typeof end === 'undefined') {
                    return slice.call(array, begin);
                }
                return slice.call(array, begin, end);
            }
        ),

        
        sort: supportsSort ? function(array, sortFn) {
            if (sortFn) {
                return array.sort(sortFn);
            } else {
                return array.sort();
            }
         } : function(array, sortFn) {
            var length = array.length,
                i = 0,
                comparison,
                j, min, tmp;

            for (; i < length; i++) {
                min = i;
                for (j = i + 1; j < length; j++) {
                    if (sortFn) {
                        comparison = sortFn(array[j], array[min]);
                        if (comparison < 0) {
                            min = j;
                        }
                    } else if (array[j] < array[min]) {
                        min = j;
                    }
                }
                if (min !== i) {
                    tmp = array[i];
                    array[i] = array[min];
                    array[min] = tmp;
                }
            }

            return array;
        },

        
        flatten: function(array) {
            var worker = [];

            function rFlatten(a) {
                var i, ln, v;

                for (i = 0, ln = a.length; i < ln; i++) {
                    v = a[i];

                    if (Ext.isArray(v)) {
                        rFlatten(v);
                    } else {
                        worker.push(v);
                    }
                }

                return worker;
            }

            return rFlatten(array);
        },

        
        min: function(array, comparisonFn) {
            var min = array[0],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                if (comparisonFn) {
                    if (comparisonFn(min, item) === 1) {
                        min = item;
                    }
                }
                else {
                    if (item < min) {
                        min = item;
                    }
                }
            }

            return min;
        },

        
        max: function(array, comparisonFn) {
            var max = array[0],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                if (comparisonFn) {
                    if (comparisonFn(max, item) === -1) {
                        max = item;
                    }
                }
                else {
                    if (item > max) {
                        max = item;
                    }
                }
            }

            return max;
        },

        
        mean: function(array) {
            return array.length > 0 ? ExtArray.sum(array) / array.length : undefined;
        },

        
        sum: function(array) {
            var sum = 0,
                i, ln, item;

            for (i = 0,ln = array.length; i < ln; i++) {
                item = array[i];

                sum += item;
            }

            return sum;
        },

        
        toMap: function(array, getKey, scope) {
            var map = {},
                i = array.length;

            if (!getKey) {
                while (i--) {
                    map[array[i]] = i+1;
                }
            } else if (typeof getKey == 'string') {
                while (i--) {
                    map[array[i][getKey]] = i+1;
                }
            } else {
                while (i--) {
                    map[getKey.call(scope, array[i])] = i+1;
                }
            }

            return map;
        },

        
        toValueMap: function(array, getKey, scope) {
            var map = {},
                i = array.length;

            if (!getKey) {
                while (i--) {
                    map[array[i]] = array[i];
                }
            } else if (typeof getKey == 'string') {
                while (i--) {
                    map[array[i][getKey]] = array[i];
                }
            } else {
                while (i--) {
                    map[getKey.call(scope, array[i])] = array[i];
                }
            }

            return map;
        },


        
        erase: erase,

        
        insert: function (array, index, items) {
            return replace(array, index, 0, items);
        },

        
        replace: replace,

        
        splice: splice,

        
        push: function(array) {
            var len = arguments.length,
                i = 1,
                newItem;

            if (array === undefined) {
                array = [];
            } else if (!Ext.isArray(array)) {
                array = [array];
            }
            for (; i < len; i++) {
                newItem = arguments[i];
                Array.prototype.push[Ext.isIterable(newItem) ? 'apply' : 'call'](array, newItem);
            }
            return array;
        }
    };

    
    Ext.each = ExtArray.each;

    
    ExtArray.union = ExtArray.merge;

    
    Ext.min = ExtArray.min;

    
    Ext.max = ExtArray.max;

    
    Ext.sum = ExtArray.sum;

    
    Ext.mean = ExtArray.mean;

    
    Ext.flatten = ExtArray.flatten;

    
    Ext.clean = ExtArray.clean;

    
    Ext.unique = ExtArray.unique;

    
    Ext.pluck = ExtArray.pluck;

    
    Ext.toArray = function() {
        return ExtArray.toArray.apply(ExtArray, arguments);
    };
}());






Ext.Function = {

    
    flexSetter: function(fn) {
        return function(a, b) {
            var k, i;

            if (a === null) {
                return this;
            }

            if (typeof a !== 'string') {
                for (k in a) {
                    if (a.hasOwnProperty(k)) {
                        fn.call(this, k, a[k]);
                    }
                }

                if (Ext.enumerables) {
                    for (i = Ext.enumerables.length; i--;) {
                        k = Ext.enumerables[i];
                        if (a.hasOwnProperty(k)) {
                            fn.call(this, k, a[k]);
                        }
                    }
                }
            } else {
                fn.call(this, a, b);
            }

            return this;
        };
    },

    
    bind: function(fn, scope, args, appendArgs) {
        if (arguments.length === 2) {
            return function() {
                return fn.apply(scope, arguments);
            };
        }

        var method = fn,
            slice = Array.prototype.slice;

        return function() {
            var callArgs = args || arguments;

            if (appendArgs === true) {
                callArgs = slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }
            else if (typeof appendArgs == 'number') {
                callArgs = slice.call(arguments, 0); 
                Ext.Array.insert(callArgs, appendArgs, args);
            }

            return method.apply(scope || Ext.global, callArgs);
        };
    },

    
    pass: function(fn, args, scope) {
        if (!Ext.isArray(args)) {
            if (Ext.isIterable(args)) {
                args = Ext.Array.clone(args);
            } else {
                args = args !== undefined ? [args] : [];
            }
        }

        return function() {
            var fnArgs = [].concat(args);
            fnArgs.push.apply(fnArgs, arguments);
            return fn.apply(scope || this, fnArgs);
        };
    },

    
    alias: function(object, methodName) {
        return function() {
            return object[methodName].apply(object, arguments);
        };
    },

    
    clone: function(method) {
        return function() {
            return method.apply(this, arguments);
        };
    },

    
    createInterceptor: function(origFn, newFn, scope, returnValue) {
        var method = origFn;
        if (!Ext.isFunction(newFn)) {
            return origFn;
        } else {
            returnValue = Ext.isDefined(returnValue) ? returnValue : null;
            return function() {
                var me = this,
                    args = arguments;
                    
                newFn.target = me;
                newFn.method = origFn;
                return (newFn.apply(scope || me || Ext.global, args) !== false) ? origFn.apply(me || Ext.global, args) : returnValue;
            };
        }
    },

    
    createDelayed: function(fn, delay, scope, args, appendArgs) {
        if (scope || args) {
            fn = Ext.Function.bind(fn, scope, args, appendArgs);
        }

        return function() {
            var me = this,
                args = Array.prototype.slice.call(arguments);

            setTimeout(function() {
                fn.apply(me, args);
            }, delay);
        };
    },

    
    defer: function(fn, millis, scope, args, appendArgs) {
        fn = Ext.Function.bind(fn, scope, args, appendArgs);
        if (millis > 0) {
            return setTimeout(Ext.supports.TimeoutActualLateness ? function () {
                fn();
            } : fn, millis);
        }
        fn();
        return 0;
    },

    
    createSequence: function(originalFn, newFn, scope) {
        if (!newFn) {
            return originalFn;
        }
        else {
            return function() {
                var result = originalFn.apply(this, arguments);
                newFn.apply(scope || this, arguments);
                return result;
            };
        }
    },

    
    createBuffered: function(fn, buffer, scope, args) {
        var timerId;

        return function() {
            var callArgs = args || Array.prototype.slice.call(arguments, 0),
                me = scope || this;

            if (timerId) {
                clearTimeout(timerId);
            }

            timerId = setTimeout(function(){
                fn.apply(me, callArgs);
            }, buffer);
        };
    },

    
    createThrottled: function(fn, interval, scope) {
        var lastCallTime, elapsed, lastArgs, timer, execute = function() {
            fn.apply(scope || this, lastArgs);
            lastCallTime = Ext.Date.now();
        };

        return function() {
            elapsed = Ext.Date.now() - lastCallTime;
            lastArgs = arguments;

            clearTimeout(timer);
            if (!lastCallTime || (elapsed >= interval)) {
                execute();
            } else {
                timer = setTimeout(execute, interval - elapsed);
            }
        };
    },


    
    interceptBefore: function(object, methodName, fn, scope) {
        var method = object[methodName] || Ext.emptyFn;

        return (object[methodName] = function() {
            var ret = fn.apply(scope || this, arguments);
            method.apply(this, arguments);

            return ret;
        });
    },

    
    interceptAfter: function(object, methodName, fn, scope) {
        var method = object[methodName] || Ext.emptyFn;

        return (object[methodName] = function() {
            method.apply(this, arguments);
            return fn.apply(scope || this, arguments);
        });
    }
};


Ext.defer = Ext.Function.alias(Ext.Function, 'defer');


Ext.pass = Ext.Function.alias(Ext.Function, 'pass');


Ext.bind = Ext.Function.alias(Ext.Function, 'bind');







(function() {


var TemplateClass = function(){},
    ExtObject = Ext.Object = {

    
    chain: Object.create || function (object) {
        TemplateClass.prototype = object;
        var result = new TemplateClass();
        TemplateClass.prototype = null;
        return result;
    },

    
    toQueryObjects: function(name, value, recursive) {
        var self = ExtObject.toQueryObjects,
            objects = [],
            i, ln;

        if (Ext.isArray(value)) {
            for (i = 0, ln = value.length; i < ln; i++) {
                if (recursive) {
                    objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                }
                else {
                    objects.push({
                        name: name,
                        value: value[i]
                    });
                }
            }
        }
        else if (Ext.isObject(value)) {
            for (i in value) {
                if (value.hasOwnProperty(i)) {
                    if (recursive) {
                        objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                    }
                    else {
                        objects.push({
                            name: name,
                            value: value[i]
                        });
                    }
                }
            }
        }
        else {
            objects.push({
                name: name,
                value: value
            });
        }

        return objects;
    },

    
    toQueryString: function(object, recursive) {
        var paramObjects = [],
            params = [],
            i, j, ln, paramObject, value;

        for (i in object) {
            if (object.hasOwnProperty(i)) {
                paramObjects = paramObjects.concat(ExtObject.toQueryObjects(i, object[i], recursive));
            }
        }

        for (j = 0, ln = paramObjects.length; j < ln; j++) {
            paramObject = paramObjects[j];
            value = paramObject.value;

            if (Ext.isEmpty(value)) {
                value = '';
            } else if (Ext.isDate(value)) {
                value = Ext.Date.toString(value);
            }

            params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
        }

        return params.join('&');
    },

    
    fromQueryString: function(queryString, recursive) {
        var parts = queryString.replace(/^\?/, '').split('&'),
            object = {},
            temp, components, name, value, i, ln,
            part, j, subLn, matchedKeys, matchedName,
            keys, key, nextKey;

        for (i = 0, ln = parts.length; i < ln; i++) {
            part = parts[i];

            if (part.length > 0) {
                components = part.split('=');
                name = decodeURIComponent(components[0]);
                value = (components[1] !== undefined) ? decodeURIComponent(components[1]) : '';

                if (!recursive) {
                    if (object.hasOwnProperty(name)) {
                        if (!Ext.isArray(object[name])) {
                            object[name] = [object[name]];
                        }

                        object[name].push(value);
                    }
                    else {
                        object[name] = value;
                    }
                }
                else {
                    matchedKeys = name.match(/(\[):?([^\]]*)\]/g);
                    matchedName = name.match(/^([^\[]+)/);


                    name = matchedName[0];
                    keys = [];

                    if (matchedKeys === null) {
                        object[name] = value;
                        continue;
                    }

                    for (j = 0, subLn = matchedKeys.length; j < subLn; j++) {
                        key = matchedKeys[j];
                        key = (key.length === 2) ? '' : key.substring(1, key.length - 1);
                        keys.push(key);
                    }

                    keys.unshift(name);

                    temp = object;

                    for (j = 0, subLn = keys.length; j < subLn; j++) {
                        key = keys[j];

                        if (j === subLn - 1) {
                            if (Ext.isArray(temp) && key === '') {
                                temp.push(value);
                            }
                            else {
                                temp[key] = value;
                            }
                        }
                        else {
                            if (temp[key] === undefined || typeof temp[key] === 'string') {
                                nextKey = keys[j+1];

                                temp[key] = (Ext.isNumeric(nextKey) || nextKey === '') ? [] : {};
                            }

                            temp = temp[key];
                        }
                    }
                }
            }
        }

        return object;
    },

    
    each: function(object, fn, scope) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                if (fn.call(scope || object, property, object[property], object) === false) {
                    return;
                }
            }
        }
    },

    
    merge: function(destination) {
        var i = 1,
            ln = arguments.length,
            mergeFn = ExtObject.merge,
            cloneFn = Ext.clone,
            object, key, value, sourceKey;

        for (; i < ln; i++) {
            object = arguments[i];

            for (key in object) {
                value = object[key];
                if (value && value.constructor === Object) {
                    sourceKey = destination[key];
                    if (sourceKey && sourceKey.constructor === Object) {
                        mergeFn(sourceKey, value);
                    }
                    else {
                        destination[key] = cloneFn(value);
                    }
                }
                else {
                    destination[key] = value;
                }
            }
        }

        return destination;
    },

    
    mergeIf: function(destination) {
        var i = 1,
            ln = arguments.length,
            cloneFn = Ext.clone,
            object, key, value;

        for (; i < ln; i++) {
            object = arguments[i];

            for (key in object) {
                if (!(key in destination)) {
                    value = object[key];

                    if (value && value.constructor === Object) {
                        destination[key] = cloneFn(value);
                    }
                    else {
                        destination[key] = value;
                    }
                }
            }
        }

        return destination;
    },

    
    getKey: function(object, value) {
        for (var property in object) {
            if (object.hasOwnProperty(property) && object[property] === value) {
                return property;
            }
        }

        return null;
    },

    
    getValues: function(object) {
        var values = [],
            property;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                values.push(object[property]);
            }
        }

        return values;
    },

    
    getKeys: (typeof Object.keys == 'function')
        ? function(object){
            if (!object) {
                return [];
            }
            return Object.keys(object);
        }
        : function(object) {
            var keys = [],
                property;

            for (property in object) {
                if (object.hasOwnProperty(property)) {
                    keys.push(property);
                }
            }

            return keys;
        },

    
    getSize: function(object) {
        var size = 0,
            property;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                size++;
            }
        }

        return size;
    },
    
    
    isEmpty: function(object){
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;    
    },
    
    
    equals: (function() {
        var check = function(o1, o2) {
            var key;
        
            for (key in o1) {
                if (o1.hasOwnProperty(key)) {
                    if (o1[key] !== o2[key]) {
                        return false;
                    }    
                }
            }    
            return true;
        };
        
        return function(object1, object2) {
            
            
            if (object1 === object2) {
                return true;
            } if (object1 && object2) {
                
                
                return check(object1, object2) && check(object2, object1);  
            } else if (!object1 && !object2) {
                return object1 === object2;
            } else {
                return false;
            }
        };
    })(),

    
    classify: function(object) {
        var prototype = object,
            objectProperties = [],
            propertyClassesMap = {},
            objectClass = function() {
                var i = 0,
                    ln = objectProperties.length,
                    property;

                for (; i < ln; i++) {
                    property = objectProperties[i];
                    this[property] = new propertyClassesMap[property]();
                }
            },
            key, value;

        for (key in object) {
            if (object.hasOwnProperty(key)) {
                value = object[key];

                if (value && value.constructor === Object) {
                    objectProperties.push(key);
                    propertyClassesMap[key] = ExtObject.classify(value);
                }
            }
        }

        objectClass.prototype = prototype;

        return objectClass;
    }
};


Ext.merge = Ext.Object.merge;


Ext.mergeIf = Ext.Object.mergeIf;


Ext.urlEncode = function() {
    var args = Ext.Array.from(arguments),
        prefix = '';

    
    if ((typeof args[1] === 'string')) {
        prefix = args[1] + '&';
        args[1] = false;
    }

    return prefix + ExtObject.toQueryString.apply(ExtObject, args);
};


Ext.urlDecode = function() {
    return ExtObject.fromQueryString.apply(ExtObject, arguments);
};

}());









Ext.Date = new function() {
  var utilDate = this,
      stripEscapeRe = /(\\.)/g,
      hourInfoRe = /([gGhHisucUOPZ]|MS)/,
      dateInfoRe = /([djzmnYycU]|MS)/,
      slashRe = /\\/gi,
      numberTokenRe = /\{(\d+)\}/g,
      MSFormatRe = new RegExp('\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/'),
      code = [
        
        "var me = this, dt, y, m, d, h, i, s, ms, o, O, z, zz, u, v, W, year, jan4, week1monday, daysInMonth, dayMatched,",
            "def = me.defaults,",
            "from = Ext.Number.from,",
            "results = String(input).match(me.parseRegexes[{0}]);", 

        "if(results){",
            "{1}",

            "if(u != null){", 
                "v = new Date(u * 1000);", 
            "}else{",
                
                
                
                "dt = me.clearTime(new Date);",

                "y = from(y, from(def.y, dt.getFullYear()));",
                "m = from(m, from(def.m - 1, dt.getMonth()));",
                "dayMatched = d !== undefined;",
                "d = from(d, from(def.d, dt.getDate()));",
                
                
                
                
                
                
                
                
                "if (!dayMatched) {", 
                    "dt.setDate(1);",
                    "dt.setMonth(m);",
                    "dt.setFullYear(y);",
                
                    "daysInMonth = me.getDaysInMonth(dt);",
                    "if (d > daysInMonth) {",
                        "d = daysInMonth;",
                    "}",
                "}",

                "h  = from(h, from(def.h, dt.getHours()));",
                "i  = from(i, from(def.i, dt.getMinutes()));",
                "s  = from(s, from(def.s, dt.getSeconds()));",
                "ms = from(ms, from(def.ms, dt.getMilliseconds()));",

                "if(z >= 0 && y >= 0){",
                    
                    

                    
                    
                    "v = me.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);",

                    
                    "v = !strict? v : (strict === true && (z <= 364 || (me.isLeapYear(v) && z <= 365))? me.add(v, me.DAY, z) : null);",
                "}else if(strict === true && !me.isValid(y, m + 1, d, h, i, s, ms)){", 
                    "v = null;", 
                "}else{",
                    "if (W) {", 
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        "year = y || (new Date()).getFullYear(),",
                        "jan4 = new Date(year, 0, 4, 0, 0, 0),",
                        "week1monday = new Date(jan4.getTime() - ((jan4.getDay() - 1) * 86400000));",
                        "v = Ext.Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000)));",
                    "} else {",
                        
                        
                        "v = me.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);",
                    "}",
                "}",
            "}",
        "}",

        "if(v){",
            
            "if(zz != null){",
                
                "v = me.add(v, me.SECOND, -v.getTimezoneOffset() * 60 - zz);",
            "}else if(o){",
                
                "v = me.add(v, me.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
            "}",
        "}",

        "return v;"
      ].join('\n');

  
  
  
  function xf(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(numberTokenRe, function(m, i) {
          return args[i];
      });
  }

  Ext.apply(utilDate, {
    
    now: Date.now || function() {
        return +new Date();
    },

    
    toString: function(date) {
        var pad = Ext.String.leftPad;

        return date.getFullYear() + "-"
            + pad(date.getMonth() + 1, 2, '0') + "-"
            + pad(date.getDate(), 2, '0') + "T"
            + pad(date.getHours(), 2, '0') + ":"
            + pad(date.getMinutes(), 2, '0') + ":"
            + pad(date.getSeconds(), 2, '0');
    },

    
    getElapsed: function(dateA, dateB) {
        return Math.abs(dateA - (dateB || utilDate.now()));
    },

    
    useStrict: false,

    
    formatCodeToRegex: function(character, currentGroup) {
        
        var p = utilDate.parseCodes[character];

        if (p) {
          p = typeof p == 'function'? p() : p;
          utilDate.parseCodes[character] = p; 
        }

        return p ? Ext.applyIf({
          c: p.c ? xf(p.c, currentGroup || "{0}") : p.c
        }, p) : {
            g: 0,
            c: null,
            s: Ext.String.escapeRegex(character) 
        };
    },

    
    parseFunctions: {
        "MS": function(input, strict) {
            
            
            var r = (input || '').match(MSFormatRe);
            return r ? new Date(((r[1] || '') + r[2]) * 1) : null;
        },
        "time": function(input, strict) {
            var num = parseInt(input, 10);
            if (num || num === 0) {
                return new Date(num);
            }
            return null;
        },
        "timestamp": function(input, strict) {
            var num = parseInt(input, 10);
            if (num || num === 0) {
                return new Date(num * 1000);
            }
            return null;
        }
    },
    parseRegexes: [],

    
    formatFunctions: {
        "MS": function() {
            
            return '\\/Date(' + this.getTime() + ')\\/';
        },
        "time": function(){
            return this.getTime().toString();
        },
        "timestamp": function(){
            return utilDate.format(this, 'U');
        }
    },

    y2kYear : 50,

    
    MILLI : "ms",

    
    SECOND : "s",

    
    MINUTE : "mi",

    
    HOUR : "h",

    
    DAY : "d",

    
    MONTH : "mo",

    
    YEAR : "y",

    
    defaults: {},

    
    
    dayNames : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    

    
    
    monthNames : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    

    
    
    monthNumbers : {
        January: 0,
        Jan: 0,
        February: 1,
        Feb: 1,
        March: 2,
        Mar: 2,
        April: 3,
        Apr: 3,
        May: 4,
        June: 5,
        Jun: 5,
        July: 6,
        Jul: 6,
        August: 7,
        Aug: 7,
        September: 8,
        Sep: 8,
        October: 9,
        Oct: 9,
        November: 10,
        Nov: 10,
        December: 11,
        Dec: 11
    },
    
    
    
    
    defaultFormat : "m/d/Y",
    
    
    
    getShortMonthName : function(month) {
        return Ext.Date.monthNames[month].substring(0, 3);
    },
    

    
    
    getShortDayName : function(day) {
        return Ext.Date.dayNames[day].substring(0, 3);
    },
    

    
    
    getMonthNumber : function(name) {
        
        return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
    },
    

    
    formatContainsHourInfo : function(format){
        return hourInfoRe.test(format.replace(stripEscapeRe, ''));
    },

    
    formatContainsDateInfo : function(format){
        return dateInfoRe.test(format.replace(stripEscapeRe, ''));
    },
    
    
    unescapeFormat: function(format) {
        
        
        
        return format.replace(slashRe, '');
    },

    
    formatCodes : {
        d: "Ext.String.leftPad(this.getDate(), 2, '0')",
        D: "Ext.Date.getShortDayName(this.getDay())", 
        j: "this.getDate()",
        l: "Ext.Date.dayNames[this.getDay()]",
        N: "(this.getDay() ? this.getDay() : 7)",
        S: "Ext.Date.getSuffix(this)",
        w: "this.getDay()",
        z: "Ext.Date.getDayOfYear(this)",
        W: "Ext.String.leftPad(Ext.Date.getWeekOfYear(this), 2, '0')",
        F: "Ext.Date.monthNames[this.getMonth()]",
        m: "Ext.String.leftPad(this.getMonth() + 1, 2, '0')",
        M: "Ext.Date.getShortMonthName(this.getMonth())", 
        n: "(this.getMonth() + 1)",
        t: "Ext.Date.getDaysInMonth(this)",
        L: "(Ext.Date.isLeapYear(this) ? 1 : 0)",
        o: "(this.getFullYear() + (Ext.Date.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))",
        Y: "Ext.String.leftPad(this.getFullYear(), 4, '0')",
        y: "('' + this.getFullYear()).substring(2, 4)",
        a: "(this.getHours() < 12 ? 'am' : 'pm')",
        A: "(this.getHours() < 12 ? 'AM' : 'PM')",
        g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
        G: "this.getHours()",
        h: "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
        H: "Ext.String.leftPad(this.getHours(), 2, '0')",
        i: "Ext.String.leftPad(this.getMinutes(), 2, '0')",
        s: "Ext.String.leftPad(this.getSeconds(), 2, '0')",
        u: "Ext.String.leftPad(this.getMilliseconds(), 3, '0')",
        O: "Ext.Date.getGMTOffset(this)",
        P: "Ext.Date.getGMTOffset(this, true)",
        T: "Ext.Date.getTimezone(this)",
        Z: "(this.getTimezoneOffset() * -60)",

        c: function() { 
            var c, code, i, l, e;
            for (c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                e = c.charAt(i);
                code.push(e == "T" ? "'T'" : utilDate.getFormatCode(e)); 
            }
            return code.join(" + ");
        },
        

        U: "Math.round(this.getTime() / 1000)"
    },

    
    isValid : function(y, m, d, h, i, s, ms) {
        
        h = h || 0;
        i = i || 0;
        s = s || 0;
        ms = ms || 0;

        
        var dt = utilDate.add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), utilDate.YEAR, y < 100 ? y - 100 : 0);

        return y == dt.getFullYear() &&
            m == dt.getMonth() + 1 &&
            d == dt.getDate() &&
            h == dt.getHours() &&
            i == dt.getMinutes() &&
            s == dt.getSeconds() &&
            ms == dt.getMilliseconds();
    },

    
    parse : function(input, format, strict) {
        var p = utilDate.parseFunctions;
        if (p[format] == null) {
            utilDate.createParser(format);
        }
        return p[format].call(utilDate, input, Ext.isDefined(strict) ? strict : utilDate.useStrict);
    },

    
    parseDate: function(input, format, strict){
        return utilDate.parse(input, format, strict);
    },


    
    getFormatCode : function(character) {
        var f = utilDate.formatCodes[character];

        if (f) {
          f = typeof f == 'function'? f() : f;
          utilDate.formatCodes[character] = f; 
        }

        
        return f || ("'" + Ext.String.escape(character) + "'");
    },

    
    createFormat : function(format) {
        var code = [],
            special = false,
            ch = '',
            i;

        for (i = 0; i < format.length; ++i) {
            ch = format.charAt(i);
            if (!special && ch == "\\") {
                special = true;
            } else if (special) {
                special = false;
                code.push("'" + Ext.String.escape(ch) + "'");
            } else {
                code.push(utilDate.getFormatCode(ch));
            }
        }
        utilDate.formatFunctions[format] = Ext.functionFactory("return " + code.join('+'));
    },

    
    createParser : function(format) {
        var regexNum = utilDate.parseRegexes.length,
            currentGroup = 1,
            calc = [],
            regex = [],
            special = false,
            ch = "",
            i = 0,
            len = format.length,
            atEnd = [],
            obj;

        for (; i < len; ++i) {
            ch = format.charAt(i);
            if (!special && ch == "\\") {
                special = true;
            } else if (special) {
                special = false;
                regex.push(Ext.String.escape(ch));
            } else {
                obj = utilDate.formatCodeToRegex(ch, currentGroup);
                currentGroup += obj.g;
                regex.push(obj.s);
                if (obj.g && obj.c) {
                    if (obj.calcAtEnd) {
                        atEnd.push(obj.c);
                    } else {
                        calc.push(obj.c);
                    }
                }
            }
        }

        calc = calc.concat(atEnd);

        utilDate.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$", 'i');
        utilDate.parseFunctions[format] = Ext.functionFactory("input", "strict", xf(code, regexNum, calc.join('')));
    },

    
    parseCodes : {
        
        d: {
            g:1,
            c:"d = parseInt(results[{0}], 10);\n",
            s:"(3[0-1]|[1-2][0-9]|0[1-9])" 
        },
        j: {
            g:1,
            c:"d = parseInt(results[{0}], 10);\n",
            s:"(3[0-1]|[1-2][0-9]|[1-9])" 
        },
        D: function() {
            for (var a = [], i = 0; i < 7; a.push(utilDate.getShortDayName(i)), ++i); 
            return {
                g:0,
                c:null,
                s:"(?:" + a.join("|") +")"
            };
        },
        l: function() {
            return {
                g:0,
                c:null,
                s:"(?:" + utilDate.dayNames.join("|") + ")"
            };
        },
        N: {
            g:0,
            c:null,
            s:"[1-7]" 
        },
        
        S: {
            g:0,
            c:null,
            s:"(?:st|nd|rd|th)"
        },
        
        w: {
            g:0,
            c:null,
            s:"[0-6]" 
        },
        z: {
            g:1,
            c:"z = parseInt(results[{0}], 10);\n",
            s:"(\\d{1,3})" 
        },
        W: {
            g:1,
            c:"W = parseInt(results[{0}], 10);\n",
            s:"(\\d{2})" 
        },
        F: function() {
            return {
                g:1,
                c:"m = parseInt(me.getMonthNumber(results[{0}]), 10);\n", 
                s:"(" + utilDate.monthNames.join("|") + ")"
            };
        },
        M: function() {
            for (var a = [], i = 0; i < 12; a.push(utilDate.getShortMonthName(i)), ++i); 
            return Ext.applyIf({
                s:"(" + a.join("|") + ")"
            }, utilDate.formatCodeToRegex("F"));
        },
        m: {
            g:1,
            c:"m = parseInt(results[{0}], 10) - 1;\n",
            s:"(1[0-2]|0[1-9])" 
        },
        n: {
            g:1,
            c:"m = parseInt(results[{0}], 10) - 1;\n",
            s:"(1[0-2]|[1-9])" 
        },
        t: {
            g:0,
            c:null,
            s:"(?:\\d{2})" 
        },
        L: {
            g:0,
            c:null,
            s:"(?:1|0)"
        },
        o: { 
            g: 1,
            c: "y = parseInt(results[{0}], 10);\n",
            s: "(\\d{4})" 

        },
        Y: {
            g:1,
            c:"y = parseInt(results[{0}], 10);\n",
            s:"(\\d{4})" 
        },
        y: {
            g:1,
            c:"var ty = parseInt(results[{0}], 10);\n"
                + "y = ty > me.y2kYear ? 1900 + ty : 2000 + ty;\n", 
            s:"(\\d{1,2})"
        },
        
        
        a: {
            g:1,
            c:"if (/(am)/i.test(results[{0}])) {\n"
                + "if (!h || h == 12) { h = 0; }\n"
                + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
            s:"(am|pm|AM|PM)",
            calcAtEnd: true
        },
        
        
        A: {
            g:1,
            c:"if (/(am)/i.test(results[{0}])) {\n"
                + "if (!h || h == 12) { h = 0; }\n"
                + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
            s:"(AM|PM|am|pm)",
            calcAtEnd: true
        },
        
        g: {
            g:1,
            c:"h = parseInt(results[{0}], 10);\n",
            s:"(1[0-2]|[0-9])" 
        },
        G: {
            g:1,
            c:"h = parseInt(results[{0}], 10);\n",
            s:"(2[0-3]|1[0-9]|[0-9])" 
        },
        h: {
            g:1,
            c:"h = parseInt(results[{0}], 10);\n",
            s:"(1[0-2]|0[1-9])" 
        },
        H: {
            g:1,
            c:"h = parseInt(results[{0}], 10);\n",
            s:"(2[0-3]|[0-1][0-9])" 
        },
        i: {
            g:1,
            c:"i = parseInt(results[{0}], 10);\n",
            s:"([0-5][0-9])" 
        },
        s: {
            g:1,
            c:"s = parseInt(results[{0}], 10);\n",
            s:"([0-5][0-9])" 
        },
        u: {
            g:1,
            c:"ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
            s:"(\\d+)" 
        },
        O: {
            g:1,
            c:[
                "o = results[{0}];",
                "var sn = o.substring(0,1),", 
                    "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", 
                    "mn = o.substring(3,5) % 60;", 
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" 
            ].join("\n"),
            s: "([+-]\\d{4})" 
        },
        P: {
            g:1,
            c:[
                "o = results[{0}];",
                "var sn = o.substring(0,1),", 
                    "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", 
                    "mn = o.substring(4,6) % 60;", 
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" 
            ].join("\n"),
            s: "([+-]\\d{2}:\\d{2})" 
        },
        T: {
            g:0,
            c:null,
            s:"[A-Z]{1,5}" 
        },
        Z: {
            g:1,
            c:"zz = results[{0}] * 1;\n" 
                  + "zz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
            s:"([+-]?\\d{1,5})" 
        },
        c: function() {
            var calc = [],
                arr = [
                    utilDate.formatCodeToRegex("Y", 1), 
                    utilDate.formatCodeToRegex("m", 2), 
                    utilDate.formatCodeToRegex("d", 3), 
                    utilDate.formatCodeToRegex("H", 4), 
                    utilDate.formatCodeToRegex("i", 5), 
                    utilDate.formatCodeToRegex("s", 6), 
                    {c:"ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"}, 
                    {c:[ 
                        "if(results[8]) {", 
                            "if(results[8] == 'Z'){",
                                "zz = 0;", 
                            "}else if (results[8].indexOf(':') > -1){",
                                utilDate.formatCodeToRegex("P", 8).c, 
                            "}else{",
                                utilDate.formatCodeToRegex("O", 8).c, 
                            "}",
                        "}"
                    ].join('\n')}
                ],
                i,
                l;

            for (i = 0, l = arr.length; i < l; ++i) {
                calc.push(arr[i].c);
            }

            return {
                g:1,
                c:calc.join(""),
                s:[
                    arr[0].s, 
                    "(?:", "-", arr[1].s, 
                        "(?:", "-", arr[2].s, 
                            "(?:",
                                "(?:T| )?", 
                                arr[3].s, ":", arr[4].s,  
                                "(?::", arr[5].s, ")?", 
                                "(?:(?:\\.|,)(\\d+))?", 
                                "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", 
                            ")?",
                        ")?",
                    ")?"
                ].join("")
            };
        },
        U: {
            g:1,
            c:"u = parseInt(results[{0}], 10);\n",
            s:"(-?\\d+)" 
        }
    },

    
    
    dateFormat: function(date, format) {
        return utilDate.format(date, format);
    },

    
    isEqual: function(date1, date2) {
        
        if (date1 && date2) {
            return (date1.getTime() === date2.getTime());
        }
        
        return !(date1 || date2);
    },

    
    format: function(date, format) {
        var formatFunctions = utilDate.formatFunctions;

        if (!Ext.isDate(date)) {
            return '';
        }

        if (formatFunctions[format] == null) {
            utilDate.createFormat(format);
        }

        return formatFunctions[format].call(date) + '';
    },

    
    getTimezone : function(date) {
        
        
        
        
        
        
        
        
        
        
        
        
        return date.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,5})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
    },

    
    getGMTOffset : function(date, colon) {
        var offset = date.getTimezoneOffset();
        return (offset > 0 ? "-" : "+")
            + Ext.String.leftPad(Math.floor(Math.abs(offset) / 60), 2, "0")
            + (colon ? ":" : "")
            + Ext.String.leftPad(Math.abs(offset % 60), 2, "0");
    },

    
    getDayOfYear: function(date) {
        var num = 0,
            d = Ext.Date.clone(date),
            m = date.getMonth(),
            i;

        for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
            num += utilDate.getDaysInMonth(d);
        }
        return num + date.getDate() - 1;
    },

    
    getWeekOfYear : (function() {
        
        var ms1d = 864e5, 
            ms7d = 7 * ms1d; 

        return function(date) { 
            var DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d, 
                AWN = Math.floor(DC3 / 7), 
                Wyr = new Date(AWN * ms7d).getUTCFullYear();

            return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
        };
    }()),

    
    isLeapYear : function(date) {
        var year = date.getFullYear();
        return !!((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
    },

    
    getFirstDayOfMonth : function(date) {
        var day = (date.getDay() - (date.getDate() - 1)) % 7;
        return (day < 0) ? (day + 7) : day;
    },

    
    getLastDayOfMonth : function(date) {
        return utilDate.getLastDateOfMonth(date).getDay();
    },


    
    getFirstDateOfMonth : function(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    
    getLastDateOfMonth : function(date) {
        return new Date(date.getFullYear(), date.getMonth(), utilDate.getDaysInMonth(date));
    },

    
    getDaysInMonth: (function() {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        return function(date) { 
            var m = date.getMonth();

            return m == 1 && utilDate.isLeapYear(date) ? 29 : daysInMonth[m];
        };
    }()),

    
    
    getSuffix : function(date) {
        switch (date.getDate()) {
            case 1:
            case 21:
            case 31:
                return "st";
            case 2:
            case 22:
                return "nd";
            case 3:
            case 23:
                return "rd";
            default:
                return "th";
        }
    },
    

    
    clone : function(date) {
        return new Date(date.getTime());
    },

    
    isDST : function(date) {
        
        
        return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() != date.getTimezoneOffset();
    },

    
    clearTime : function(date, clone) {
        if (clone) {
            return Ext.Date.clearTime(Ext.Date.clone(date));
        }

        
        var d = date.getDate(),
            hr,
            c;

        
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        if (date.getDate() != d) { 
            
            

            
            for (hr = 1, c = utilDate.add(date, Ext.Date.HOUR, hr); c.getDate() != d; hr++, c = utilDate.add(date, Ext.Date.HOUR, hr));

            date.setDate(d);
            date.setHours(c.getHours());
        }

        return date;
    },

    
    add : function(date, interval, value) {
        var d = Ext.Date.clone(date),
            Date = Ext.Date,
            day, decimalValue, base = 0;
        if (!interval || value === 0) {
            return d;
        }

        decimalValue = value - parseInt(value, 10);
        value = parseInt(value, 10);

        if (value) {
            switch(interval.toLowerCase()) {
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                case Ext.Date.MILLI:
                    d.setTime(d.getTime() + value);
                    break;
                case Ext.Date.SECOND:
                    d.setTime(d.getTime() + value * 1000);
                    break;
                case Ext.Date.MINUTE:
                    d.setTime(d.getTime() + value * 60 * 1000);
                    break;
                case Ext.Date.HOUR:
                    d.setTime(d.getTime() + value * 60 * 60 * 1000);
                    break;
                case Ext.Date.DAY:
                    d.setDate(d.getDate() + value);
                    break;
                case Ext.Date.MONTH:
                    day = date.getDate();
                    if (day > 28) {
                        day = Math.min(day, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(date), Ext.Date.MONTH, value)).getDate());
                    }
                    d.setDate(day);
                    d.setMonth(date.getMonth() + value);
                    break;
                case Ext.Date.YEAR:
                    day = date.getDate();
                    if (day > 28) {
                        day = Math.min(day, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(date), Ext.Date.YEAR, value)).getDate());
                    }
                    d.setDate(day);
                    d.setFullYear(date.getFullYear() + value);
                    break;
            }
        }

        if (decimalValue) {
            switch (interval.toLowerCase()) {
                case Ext.Date.MILLI:    base = 1;               break;
                case Ext.Date.SECOND:   base = 1000;            break;
                case Ext.Date.MINUTE:   base = 1000*60;         break;
                case Ext.Date.HOUR:     base = 1000*60*60;      break;
                case Ext.Date.DAY:      base = 1000*60*60*24;   break;

                case Ext.Date.MONTH:
                    day = utilDate.getDaysInMonth(d);
                    base = 1000*60*60*24*day;
                    break;

                case Ext.Date.YEAR:
                    day = (utilDate.isLeapYear(d) ? 366 : 365);
                    base = 1000*60*60*24*day;
                    break;
            }
            if (base) {
                d.setTime(d.getTime() + base * decimalValue); 
            }
        }

        return d;
    },
    
    
    subtract: function(date, interval, value){
        return utilDate.add(date, interval, -value);
    },

    
    between : function(date, start, end) {
        var t = date.getTime();
        return start.getTime() <= t && t <= end.getTime();
    },

    
    compat: function() {
        var nativeDate = window.Date,
            p,
            statics = ['useStrict', 'formatCodeToRegex', 'parseFunctions', 'parseRegexes', 'formatFunctions', 'y2kYear', 'MILLI', 'SECOND', 'MINUTE', 'HOUR', 'DAY', 'MONTH', 'YEAR', 'defaults', 'dayNames', 'monthNames', 'monthNumbers', 'getShortMonthName', 'getShortDayName', 'getMonthNumber', 'formatCodes', 'isValid', 'parseDate', 'getFormatCode', 'createFormat', 'createParser', 'parseCodes'],
            proto = ['dateFormat', 'format', 'getTimezone', 'getGMTOffset', 'getDayOfYear', 'getWeekOfYear', 'isLeapYear', 'getFirstDayOfMonth', 'getLastDayOfMonth', 'getDaysInMonth', 'getSuffix', 'clone', 'isDST', 'clearTime', 'add', 'between'],
            sLen    = statics.length,
            pLen    = proto.length,
            stat, prot, s;

        
        for (s = 0; s < sLen; s++) {
            stat = statics[s];
            nativeDate[stat] = utilDate[stat];
        }

        
        for (p = 0; p < pLen; p++) {
            prot = proto[p];
            nativeDate.prototype[prot] = function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(this);
                return utilDate[prot].apply(utilDate, args);
            };
        }
    }
  });
};






(function(flexSetter) {

var noArgs = [],
    Base = function(){},
    hookFunctionFactory = function(hookFunction, underriddenFunction, methodName, owningClass) {
        var result = function() {
            var result = this.callParent(arguments);
            hookFunction.apply(this, arguments);
            return result;
        };
        result.$name = methodName;
        result.$owner = owningClass;
        if (underriddenFunction) {
            result.$previous = underriddenFunction.$previous;
            underriddenFunction.$previous = result;
        }
        return result;
    };

    
    Ext.apply(Base, {
        $className: 'Ext.Base',

        $isClass: true,

        
        create: function() {
            return Ext.create.apply(Ext, [this].concat(Array.prototype.slice.call(arguments, 0)));
        },

        
        extend: function(parent) {
            var parentPrototype = parent.prototype,
                basePrototype, prototype, i, ln, name, statics;

            prototype = this.prototype = Ext.Object.chain(parentPrototype);
            prototype.self = this;

            this.superclass = prototype.superclass = parentPrototype;

            if (!parent.$isClass) {
                basePrototype = Ext.Base.prototype;

                for (i in basePrototype) {
                    if (i in prototype) {
                        prototype[i] = basePrototype[i];
                    }
                }
            }

            
            statics = parentPrototype.$inheritableStatics;

            if (statics) {
                for (i = 0,ln = statics.length; i < ln; i++) {
                    name = statics[i];

                    if (!this.hasOwnProperty(name)) {
                        this[name] = parent[name];
                    }
                }
            }

            if (parent.$onExtended) {
                this.$onExtended = parent.$onExtended.slice();
            }

            prototype.config = new prototype.configClass();
            prototype.initConfigList = prototype.initConfigList.slice();
            prototype.initConfigMap = Ext.clone(prototype.initConfigMap);
            prototype.configMap = Ext.Object.chain(prototype.configMap);
        },

        
        $onExtended: [],

        
        triggerExtended: function() {
        
            var callbacks = this.$onExtended,
                ln = callbacks.length,
                i, callback;

            if (ln > 0) {
                for (i = 0; i < ln; i++) {
                    callback = callbacks[i];
                    callback.fn.apply(callback.scope || this, arguments);
                }
            }
        },

        
        onExtended: function(fn, scope) {
            this.$onExtended.push({
                fn: fn,
                scope: scope
            });

            return this;
        },

        
        addConfig: function(config, fullMerge) {
            var prototype = this.prototype,
                configNameCache = Ext.Class.configNameCache,
                hasConfig = prototype.configMap,
                initConfigList = prototype.initConfigList,
                initConfigMap = prototype.initConfigMap,
                defaultConfig = prototype.config,
                initializedName, name, value;

            for (name in config) {
                if (config.hasOwnProperty(name)) {
                    if (!hasConfig[name]) {
                        hasConfig[name] = true;
                    }

                    value = config[name];

                    initializedName = configNameCache[name].initialized;

                    if (!initConfigMap[name] && value !== null && !prototype[initializedName]) {
                        initConfigMap[name] = true;
                        initConfigList.push(name);
                    }
                }
            }

            if (fullMerge) {
                Ext.merge(defaultConfig, config);
            }
            else {
                Ext.mergeIf(defaultConfig, config);
            }

            prototype.configClass = Ext.Object.classify(defaultConfig);
        },

        
        addStatics: function(members) {
            var member, name;

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];
                    if (typeof member == 'function' && !member.$isClass && member !== Ext.emptyFn && member !== Ext.identityFn) {
                        member.$owner = this;
                        member.$name = name;
                    }
                    this[name] = member;
                }
            }

            return this;
        },

        
        addInheritableStatics: function(members) {
            var inheritableStatics,
                hasInheritableStatics,
                prototype = this.prototype,
                name, member;

            inheritableStatics = prototype.$inheritableStatics;
            hasInheritableStatics = prototype.$hasInheritableStatics;

            if (!inheritableStatics) {
                inheritableStatics = prototype.$inheritableStatics = [];
                hasInheritableStatics = prototype.$hasInheritableStatics = {};
            }

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];
                    this[name] = member;

                    if (!hasInheritableStatics[name]) {
                        hasInheritableStatics[name] = true;
                        inheritableStatics.push(name);
                    }
                }
            }

            return this;
        },

        
        addMembers: function(members) {
            var prototype = this.prototype,
                enumerables = Ext.enumerables,
                names = [],
                i, ln, name, member;

            for (name in members) {
                names.push(name);
            }

            if (enumerables) {
                names.push.apply(names, enumerables);
            }

            for (i = 0,ln = names.length; i < ln; i++) {
                name = names[i];

                if (members.hasOwnProperty(name)) {
                    member = members[name];

                    if (typeof member == 'function' && !member.$isClass && member !== Ext.emptyFn && member !== Ext.identityFn) {
                        member.$owner = this;
                        member.$name = name;
                    }

                    prototype[name] = member;
                }
            }

            return this;
        },

        
        addMember: function(name, member) {            
            if (typeof member == 'function' && !member.$isClass && member !== Ext.emptyFn && member !== Ext.identityFn) {
                member.$owner = this;
                member.$name = name;
            }

            this.prototype[name] = member;
            return this;
        },

        
        implement: function() {
            this.addMembers.apply(this, arguments);
        },

        
        borrow: function(fromClass, members) {
            
            var prototype = this.prototype,
                fromPrototype = fromClass.prototype,
                i, ln, name, fn, toBorrow;

            members = Ext.Array.from(members);

            for (i = 0,ln = members.length; i < ln; i++) {
                name = members[i];

                toBorrow = fromPrototype[name];

                if (typeof toBorrow == 'function') {
                    fn = Ext.Function.clone(toBorrow);


                    fn.$owner = this;
                    fn.$name = name;

                    prototype[name] = fn;
                }
                else {
                    prototype[name] = toBorrow;
                }
            }

            return this;
        },

        
        override: function(members) {
            var me = this,
                enumerables = Ext.enumerables,
                target = me.prototype,
                cloneFunction = Ext.Function.clone,
                name, index, member, statics, names, previous;

            if (arguments.length === 2) {
                name = members;
                members = {};
                members[name] = arguments[1];
                enumerables = null;
            }

            do {
                names = []; 
                statics = null; 

                for (name in members) { 
                    if (name == 'statics') {
                        statics = members[name];
                    } else if (name == 'inheritableStatics'){
                        me.addInheritableStatics(members[name]);
                    } else if (name == 'config') {
                        me.addConfig(members[name], true);
                    } else {
                        names.push(name);
                    }
                }

                if (enumerables) {
                    names.push.apply(names, enumerables);
                }

                for (index = names.length; index--; ) {
                    name = names[index];

                    if (members.hasOwnProperty(name)) {
                        member = members[name];

                        if (typeof member == 'function' && !member.$className && member !== Ext.emptyFn && member !== Ext.identityFn) {
                            if (typeof member.$owner != 'undefined') {
                                member = cloneFunction(member);
                            }


                            member.$owner = me;
                            member.$name = name;

                            previous = target[name];
                            if (previous) {
                                member.$previous = previous;
                            }
                        }

                        target[name] = member;
                    }
                }

                target = me; 
                members = statics; 
            } while (members);

            return this;
        },

        
        callParent: function(args) {
            var method;

            
            return (method = this.callParent.caller) && (method.$previous ||
                  ((method = method.$owner ? method : method.caller) &&
                        method.$owner.superclass.self[method.$name])).apply(this, args || noArgs);
        },

        
        callSuper: function(args) {
            var method;

            
            return (method = this.callSuper.caller) &&
                    ((method = method.$owner ? method : method.caller) &&
                      method.$owner.superclass.self[method.$name]).apply(this, args || noArgs);
        },

        
        mixin: function(name, mixinClass) {
            var me = this,
                mixin = mixinClass.prototype,
                prototype = me.prototype,
                key, statics, i, ln, staticName,
                mixinValue, hookKey, hookFunction;

            if (typeof mixin.onClassMixedIn != 'undefined') {
                mixin.onClassMixedIn.call(mixinClass, me);
            }

            if (!prototype.hasOwnProperty('mixins')) {
                if ('mixins' in prototype) {
                    prototype.mixins = Ext.Object.chain(prototype.mixins);
                }
                else {
                    prototype.mixins = {};
                }
            }

            for (key in mixin) {
                mixinValue = mixin[key];
                if (key === 'mixins') {
                    Ext.merge(prototype.mixins, mixinValue);
                }
                else if (key === 'xhooks') {
                    for (hookKey in mixinValue) {
                        hookFunction = mixinValue[hookKey];

                        
                        hookFunction.$previous = Ext.emptyFn;

                        if (prototype.hasOwnProperty(hookKey)) {

                            
                            
                            
                            hookFunctionFactory(hookFunction, prototype[hookKey], hookKey, me);
                        } else {
                            
                            
                            prototype[hookKey] = hookFunctionFactory(hookFunction, null, hookKey, me);
                        }
                    }
                }
                else if (!(key === 'mixinId' || key === 'config') && (prototype[key] === undefined)) {
                    prototype[key] = mixinValue;
                }
            }

            
            statics = mixin.$inheritableStatics;

            if (statics) {
                for (i = 0, ln = statics.length; i < ln; i++) {
                    staticName = statics[i];

                    if (!me.hasOwnProperty(staticName)) {
                        me[staticName] = mixinClass[staticName];
                    }
                }
            }

            if ('config' in mixin) {
                me.addConfig(mixin.config, false);
            }

            prototype.mixins[name] = mixin;
            return me;
        },

        
        getName: function() {
            return Ext.getClassName(this);
        },

        
        createAlias: flexSetter(function(alias, origin) {
            this.override(alias, function() {
                return this[origin].apply(this, arguments);
            });
        }),

        
        addXtype: function(xtype) {
            var prototype = this.prototype,
                xtypesMap = prototype.xtypesMap,
                xtypes = prototype.xtypes,
                xtypesChain = prototype.xtypesChain;

            if (!prototype.hasOwnProperty('xtypesMap')) {
                xtypesMap = prototype.xtypesMap = Ext.merge({}, prototype.xtypesMap || {});
                xtypes = prototype.xtypes = prototype.xtypes ? [].concat(prototype.xtypes) : [];
                xtypesChain = prototype.xtypesChain = prototype.xtypesChain ? [].concat(prototype.xtypesChain) : [];
                prototype.xtype = xtype;
            }

            if (!xtypesMap[xtype]) {
                xtypesMap[xtype] = true;
                xtypes.push(xtype);
                xtypesChain.push(xtype);
                Ext.ClassManager.setAlias(this, 'widget.' + xtype);
            }

            return this;
        }
    });

    Base.implement({
        
        isInstance: true,

        
        $className: 'Ext.Base',

        
        configClass: Ext.emptyFn,

        
        initConfigList: [],

        
        configMap: {},

        
        initConfigMap: {},

        
        statics: function() {
            var method = this.statics.caller,
                self = this.self;

            if (!method) {
                return self;
            }

            return method.$owner;
        },

        
        callParent: function(args) {
            
            
            
            
            var method,
                superMethod = (method = this.callParent.caller) && (method.$previous ||
                        ((method = method.$owner ? method : method.caller) &&
                                method.$owner.superclass[method.$name]));


            return superMethod.apply(this, args || noArgs);
        },

        
        callSuper: function(args) {
            
            
            
            
            var method,
                superMethod = (method = this.callSuper.caller) &&
                        ((method = method.$owner ? method : method.caller) &&
                          method.$owner.superclass[method.$name]);


            return superMethod.apply(this, args || noArgs);
        },

        
        self: Base,

        
        constructor: function() {
            return this;
        },

        
        initConfig: function(config) {
            var instanceConfig = config,
                configNameCache = Ext.Class.configNameCache,
                defaultConfig = new this.configClass(),
                defaultConfigList = this.initConfigList,
                hasConfig = this.configMap,
                nameMap, i, ln, name, initializedName;

            this.initConfig = Ext.emptyFn;

            this.initialConfig = instanceConfig || {};

            this.config = config = (instanceConfig) ? Ext.merge(defaultConfig, config) : defaultConfig;

            if (instanceConfig) {
                defaultConfigList = defaultConfigList.slice();

                for (name in instanceConfig) {
                    if (hasConfig[name]) {
                        if (instanceConfig[name] !== null) {
                            defaultConfigList.push(name);
                            this[configNameCache[name].initialized] = false;
                        }
                    }
                }
            }

            for (i = 0,ln = defaultConfigList.length; i < ln; i++) {
                name = defaultConfigList[i];
                nameMap = configNameCache[name];
                initializedName = nameMap.initialized;

                if (!this[initializedName]) {
                    this[initializedName] = true;
                    this[nameMap.set].call(this, config[name]);
                }
            }

            return this;
        },

        
        hasConfig: function(name) {
            return Boolean(this.configMap[name]);
        },

        
        setConfig: function(config, applyIfNotSet) {
            if (!config) {
                return this;
            }

            var configNameCache = Ext.Class.configNameCache,
                currentConfig = this.config,
                hasConfig = this.configMap,
                initialConfig = this.initialConfig,
                name, value;

            applyIfNotSet = Boolean(applyIfNotSet);

            for (name in config) {
                if (applyIfNotSet && initialConfig.hasOwnProperty(name)) {
                    continue;
                }

                value = config[name];
                currentConfig[name] = value;

                if (hasConfig[name]) {
                    this[configNameCache[name].set](value);
                }
            }

            return this;
        },

        
        getConfig: function(name) {
            var configNameCache = Ext.Class.configNameCache;

            return this[configNameCache[name].get]();
        },

        
        getInitialConfig: function(name) {
            var config = this.config;

            if (!name) {
                return config;
            }
            else {
                return config[name];
            }
        },

        
        onConfigUpdate: function(names, callback, scope) {
            var self = this.self,
                i, ln, name,
                updaterName, updater, newUpdater;

            names = Ext.Array.from(names);

            scope = scope || this;

            for (i = 0,ln = names.length; i < ln; i++) {
                name = names[i];
                updaterName = 'update' + Ext.String.capitalize(name);
                updater = this[updaterName] || Ext.emptyFn;
                newUpdater = function() {
                    updater.apply(this, arguments);
                    scope[callback].apply(scope, arguments);
                };
                newUpdater.$name = updaterName;
                newUpdater.$owner = self;

                this[updaterName] = newUpdater;
            }
        },

        
        destroy: function() {
            this.destroy = Ext.emptyFn;
        }
    });

    
    Base.prototype.callOverridden = Base.prototype.callParent;

    Ext.Base = Base;

}(Ext.Function.flexSetter));






(function() {
    var ExtClass,
        Base = Ext.Base,
        baseStaticMembers = [],
        baseStaticMember, baseStaticMemberLength;

    for (baseStaticMember in Base) {
        if (Base.hasOwnProperty(baseStaticMember)) {
            baseStaticMembers.push(baseStaticMember);
        }
    }

    baseStaticMemberLength = baseStaticMembers.length;

    
    function makeCtor (className) {
        function constructor () {
            
            
            return this.constructor.apply(this, arguments) || null;
        }
        return constructor;
    }

    
    Ext.Class = ExtClass = function(Class, data, onCreated) {
        if (typeof Class != 'function') {
            onCreated = data;
            data = Class;
            Class = null;
        }

        if (!data) {
            data = {};
        }

        Class = ExtClass.create(Class, data);

        ExtClass.process(Class, data, onCreated);

        return Class;
    };

    Ext.apply(ExtClass, {
        
        onBeforeCreated: function(Class, data, hooks) {
        
            Class.addMembers(data);

            hooks.onCreated.call(Class, Class);
            
        },

        
        create: function(Class, data) {
            var name, i;

            if (!Class) {
                Class = makeCtor(
                );
            }

            for (i = 0; i < baseStaticMemberLength; i++) {
                name = baseStaticMembers[i];
                Class[name] = Base[name];
            }

            return Class;
        },

        
        process: function(Class, data, onCreated) {
            var preprocessorStack = data.preprocessors || ExtClass.defaultPreprocessors,
                registeredPreprocessors = this.preprocessors,
                hooks = {
                    onBeforeCreated: this.onBeforeCreated
                },
                preprocessors = [],
                preprocessor, preprocessorsProperties,
                i, ln, j, subLn, preprocessorProperty;

            delete data.preprocessors;

            for (i = 0,ln = preprocessorStack.length; i < ln; i++) {
                preprocessor = preprocessorStack[i];

                if (typeof preprocessor == 'string') {
                    preprocessor = registeredPreprocessors[preprocessor];
                    preprocessorsProperties = preprocessor.properties;

                    if (preprocessorsProperties === true) {
                        preprocessors.push(preprocessor.fn);
                    }
                    else if (preprocessorsProperties) {
                        for (j = 0,subLn = preprocessorsProperties.length; j < subLn; j++) {
                            preprocessorProperty = preprocessorsProperties[j];

                            if (data.hasOwnProperty(preprocessorProperty)) {
                                preprocessors.push(preprocessor.fn);
                                break;
                            }
                        }
                    }
                }
                else {
                    preprocessors.push(preprocessor);
                }
            }

            hooks.onCreated = onCreated ? onCreated : Ext.emptyFn;
            hooks.preprocessors = preprocessors;

            this.doProcess(Class, data, hooks);
        },
        
        doProcess: function(Class, data, hooks) {
            var me = this,
                preprocessors = hooks.preprocessors,
                preprocessor = preprocessors.shift(),
                doProcess = me.doProcess;

            for ( ; preprocessor ; preprocessor = preprocessors.shift()) {
                
                if (preprocessor.call(me, Class, data, hooks, doProcess) === false) {
                    return;
                }
            }
            hooks.onBeforeCreated.apply(me, arguments);
        },

        
        preprocessors: {},

        
        registerPreprocessor: function(name, fn, properties, position, relativeTo) {
            if (!position) {
                position = 'last';
            }

            if (!properties) {
                properties = [name];
            }

            this.preprocessors[name] = {
                name: name,
                properties: properties || false,
                fn: fn
            };

            this.setDefaultPreprocessorPosition(name, position, relativeTo);

            return this;
        },

        
        getPreprocessor: function(name) {
            return this.preprocessors[name];
        },

        
        getPreprocessors: function() {
            return this.preprocessors;
        },

        
        defaultPreprocessors: [],

        
        getDefaultPreprocessors: function() {
            return this.defaultPreprocessors;
        },

        
        setDefaultPreprocessors: function(preprocessors) {
            this.defaultPreprocessors = Ext.Array.from(preprocessors);

            return this;
        },

        
        setDefaultPreprocessorPosition: function(name, offset, relativeName) {
            var defaultPreprocessors = this.defaultPreprocessors,
                index;

            if (typeof offset == 'string') {
                if (offset === 'first') {
                    defaultPreprocessors.unshift(name);

                    return this;
                }
                else if (offset === 'last') {
                    defaultPreprocessors.push(name);

                    return this;
                }

                offset = (offset === 'after') ? 1 : -1;
            }

            index = Ext.Array.indexOf(defaultPreprocessors, relativeName);

            if (index !== -1) {
                Ext.Array.splice(defaultPreprocessors, Math.max(0, index + offset), 0, name);
            }

            return this;
        },

        configNameCache: {},

        getConfigNameMap: function(name) {
            var cache = this.configNameCache,
                map = cache[name],
                capitalizedName;

            if (!map) {
                capitalizedName = name.charAt(0).toUpperCase() + name.substr(1);

                map = cache[name] = {
                    internal: name,
                    initialized: '_is' + capitalizedName + 'Initialized',
                    apply: 'apply' + capitalizedName,
                    update: 'update' + capitalizedName,
                    'set': 'set' + capitalizedName,
                    'get': 'get' + capitalizedName,
                    doSet : 'doSet' + capitalizedName,
                    changeEvent: name.toLowerCase() + 'change'
                };
            }

            return map;
        }
    });

    
    ExtClass.registerPreprocessor('extend', function(Class, data, hooks) {
        
        var Base = Ext.Base,
            basePrototype = Base.prototype,
            extend = data.extend,
            Parent, parentPrototype, i;

        delete data.extend;

        if (extend && extend !== Object) {
            Parent = extend;
        }
        else {
            Parent = Base;
        }

        parentPrototype = Parent.prototype;

        if (!Parent.$isClass) {
            for (i in basePrototype) {
                if (!parentPrototype[i]) {
                    parentPrototype[i] = basePrototype[i];
                }
            }
        }

        Class.extend(Parent);

        Class.triggerExtended.apply(Class, arguments);

        if (data.onClassExtended) {
            Class.onExtended(data.onClassExtended, Class);
            delete data.onClassExtended;
        }

    }, true);

    
    ExtClass.registerPreprocessor('statics', function(Class, data) {
        
        Class.addStatics(data.statics);

        delete data.statics;
    });

    
    ExtClass.registerPreprocessor('inheritableStatics', function(Class, data) {
        
        Class.addInheritableStatics(data.inheritableStatics);

        delete data.inheritableStatics;
    });

    
    ExtClass.registerPreprocessor('config', function(Class, data) {
        
        var config = data.config,
            prototype = Class.prototype;

        delete data.config;

        Ext.Object.each(config, function(name, value) {
            var nameMap = ExtClass.getConfigNameMap(name),
                internalName = nameMap.internal,
                initializedName = nameMap.initialized,
                applyName = nameMap.apply,
                updateName = nameMap.update,
                setName = nameMap.set,
                getName = nameMap.get,
                hasOwnSetter = (setName in prototype) || data.hasOwnProperty(setName),
                hasOwnApplier = (applyName in prototype) || data.hasOwnProperty(applyName),
                hasOwnUpdater = (updateName in prototype) || data.hasOwnProperty(updateName),
                optimizedGetter, customGetter;

            if (value === null || (!hasOwnSetter && !hasOwnApplier && !hasOwnUpdater)) {
                prototype[internalName] = value;
                prototype[initializedName] = true;
            }
            else {
                prototype[initializedName] = false;
            }

            if (!hasOwnSetter) {
                data[setName] = function(value) {
                    var oldValue = this[internalName],
                        applier = this[applyName],
                        updater = this[updateName];

                    if (!this[initializedName]) {
                        this[initializedName] = true;
                    }

                    if (applier) {
                        value = applier.call(this, value, oldValue);
                    }

                    if (typeof value != 'undefined') {
                        this[internalName] = value;

                        if (updater && value !== oldValue) {
                            updater.call(this, value, oldValue);
                        }
                    }

                    return this;
                };
            }

            if (!(getName in prototype) || data.hasOwnProperty(getName)) {
                customGetter = data[getName] || false;

                if (customGetter) {
                    optimizedGetter = function() {
                        return customGetter.apply(this, arguments);
                    };
                }
                else {
                    optimizedGetter = function() {
                        return this[internalName];
                    };
                }

                data[getName] = function() {
                    var currentGetter;

                    if (!this[initializedName]) {
                        this[initializedName] = true;
                        this[setName](this.config[name]);
                    }

                    currentGetter = this[getName];

                    if ('$previous' in currentGetter) {
                        currentGetter.$previous = optimizedGetter;
                    }
                    else {
                        this[getName] = optimizedGetter;
                    }

                    return optimizedGetter.apply(this, arguments);
                };
            }
        });

        Class.addConfig(config, true);
    });

    
    ExtClass.registerPreprocessor('mixins', function(Class, data, hooks) {
        
        var mixins = data.mixins,
            name, mixin, i, ln;

        delete data.mixins;

        Ext.Function.interceptBefore(hooks, 'onCreated', function() {
        
            if (mixins instanceof Array) {
                for (i = 0,ln = mixins.length; i < ln; i++) {
                    mixin = mixins[i];
                    name = mixin.prototype.mixinId || mixin.$className;

                    Class.mixin(name, mixin);
                }
            }
            else {
                for (var mixinName in mixins) {
                    if (mixins.hasOwnProperty(mixinName)) {
                        Class.mixin(mixinName, mixins[mixinName]);
                    }
                }
            }
        });
    });

    
    Ext.extend = function(Class, Parent, members) {
            
        if (arguments.length === 2 && Ext.isObject(Parent)) {
            members = Parent;
            Parent = Class;
            Class = null;
        }

        var cls;

        if (!Parent) {
            throw new Error("[Ext.extend] Attempting to extend from a class which has not been loaded on the page.");
        }

        members.extend = Parent;
        members.preprocessors = [
            'extend'
            ,'statics'
            ,'inheritableStatics'
            ,'mixins'
            ,'config'
        ];

        if (Class) {
            cls = new ExtClass(Class, members);
            
            cls.prototype.constructor = Class;
        } else {
            cls = new ExtClass(members);
        }

        cls.prototype.override = function(o) {
            for (var m in o) {
                if (o.hasOwnProperty(m)) {
                    this[m] = o[m];
                }
            }
        };

        return cls;
    };
}());






(function(Class, alias, arraySlice, arrayFrom, global) {

    
    function makeCtor () {
        function constructor () {
            
            
            return this.constructor.apply(this, arguments) || null;
        }
        return constructor;
    }

    var Manager = Ext.ClassManager = {

        
        classes: {},

        
        existCache: {},

        
        namespaceRewrites: [{
            from: 'Ext.',
            to: Ext
        }],

        
        maps: {
            alternateToName: {},
            aliasToName: {},
            nameToAliases: {},
            nameToAlternates: {}
        },

        
        enableNamespaceParseCache: true,

        
        namespaceParseCache: {},

        
        instantiators: [],

        
        isCreated: function(className) {
            var existCache = this.existCache,
                i, ln, part, root, parts;


            if (this.classes[className] || existCache[className]) {
                return true;
            }

            root = global;
            parts = this.parseNamespace(className);

            for (i = 0, ln = parts.length; i < ln; i++) {
                part = parts[i];

                if (typeof part != 'string') {
                    root = part;
                } else {
                    if (!root || !root[part]) {
                        return false;
                    }

                    root = root[part];
                }
            }

            existCache[className] = true;

            this.triggerCreated(className);

            return true;
        },

        
        createdListeners: [],

        
        nameCreatedListeners: {},

        
        triggerCreated: function(className) {
            var listeners = this.createdListeners,
                nameListeners = this.nameCreatedListeners,
                alternateNames = this.maps.nameToAlternates[className],
                names = [className],
                i, ln, j, subLn, listener, name;

            for (i = 0,ln = listeners.length; i < ln; i++) {
                listener = listeners[i];
                listener.fn.call(listener.scope, className);
            }

            if (alternateNames) {
                names.push.apply(names, alternateNames);
            }

            for (i = 0,ln = names.length; i < ln; i++) {
                name = names[i];
                listeners = nameListeners[name];

                if (listeners) {
                    for (j = 0,subLn = listeners.length; j < subLn; j++) {
                        listener = listeners[j];
                        listener.fn.call(listener.scope, name);
                    }
                    delete nameListeners[name];
                }
            }
        },

        
        onCreated: function(fn, scope, className) {
            
            var listeners = this.createdListeners,
                nameListeners = this.nameCreatedListeners,
                listener = {
                    fn: fn,
                    scope: scope
                };

            if (className) {
                if (this.isCreated(className)) {
                    fn.call(scope, className);
                    return;
                }

                if (!nameListeners[className]) {
                    nameListeners[className] = [];
                }

                nameListeners[className].push(listener);
            }
            else {
                listeners.push(listener);
            }
        },

        
        parseNamespace: function(namespace) {

            var cache = this.namespaceParseCache,
                parts,
                rewrites,
                root,
                name,
                rewrite, from, to, i, ln;

            if (this.enableNamespaceParseCache) {
                if (cache.hasOwnProperty(namespace)) {
                    return cache[namespace];
                }
            }

            parts = [];
            rewrites = this.namespaceRewrites;
            root = global;
            name = namespace;

            for (i = 0, ln = rewrites.length; i < ln; i++) {
                rewrite = rewrites[i];
                from = rewrite.from;
                to = rewrite.to;

                if (name === from || name.substring(0, from.length) === from) {
                    name = name.substring(from.length);

                    if (typeof to != 'string') {
                        root = to;
                    } else {
                        parts = parts.concat(to.split('.'));
                    }

                    break;
                }
            }

            parts.push(root);

            parts = parts.concat(name.split('.'));

            if (this.enableNamespaceParseCache) {
                cache[namespace] = parts;
            }

            return parts;
        },

        
        setNamespace: function(name, value) {
            var root = global,
                parts = this.parseNamespace(name),
                ln = parts.length - 1,
                leaf = parts[ln],
                i, part;

            for (i = 0; i < ln; i++) {
                part = parts[i];

                if (typeof part != 'string') {
                    root = part;
                } else {
                    if (!root[part]) {
                        root[part] = {};
                    }

                    root = root[part];
                }
            }

            root[leaf] = value;

            return root[leaf];
        },

        
        createNamespaces: function() {
            var root = global,
                parts, part, i, j, ln, subLn;

            for (i = 0, ln = arguments.length; i < ln; i++) {
                parts = this.parseNamespace(arguments[i]);

                for (j = 0, subLn = parts.length; j < subLn; j++) {
                    part = parts[j];

                    if (typeof part != 'string') {
                        root = part;
                    } else {
                        if (!root[part]) {
                            root[part] = {};
                        }

                        root = root[part];
                    }
                }
            }

            return root;
        },

        
        set: function(name, value) {
            var me = this,
                maps = me.maps,
                nameToAlternates = maps.nameToAlternates,
                targetName = me.getName(value),
                alternates;

            me.classes[name] = me.setNamespace(name, value);

            if (targetName && targetName !== name) {
                maps.alternateToName[name] = targetName;
                alternates = nameToAlternates[targetName] || (nameToAlternates[targetName] = []);
                alternates.push(name);
            }

            return this;
        },

        
        get: function(name) {
            var classes = this.classes,
                root,
                parts,
                part, i, ln;

            if (classes[name]) {
                return classes[name];
            }

            root = global;
            parts = this.parseNamespace(name);

            for (i = 0, ln = parts.length; i < ln; i++) {
                part = parts[i];

                if (typeof part != 'string') {
                    root = part;
                } else {
                    if (!root || !root[part]) {
                        return null;
                    }

                    root = root[part];
                }
            }

            return root;
        },

        
        setAlias: function(cls, alias) {
            var aliasToNameMap = this.maps.aliasToName,
                nameToAliasesMap = this.maps.nameToAliases,
                className;

            if (typeof cls == 'string') {
                className = cls;
            } else {
                className = this.getName(cls);
            }

            if (alias && aliasToNameMap[alias] !== className) {

                aliasToNameMap[alias] = className;
            }

            if (!nameToAliasesMap[className]) {
                nameToAliasesMap[className] = [];
            }

            if (alias) {
                Ext.Array.include(nameToAliasesMap[className], alias);
            }

            return this;
        },

        
        addNameAliasMappings: function(aliases){
            var aliasToNameMap = this.maps.aliasToName,
                nameToAliasesMap = this.maps.nameToAliases,
                className, aliasList, alias, i;

            for (className in aliases) {
                aliasList = nameToAliasesMap[className] ||
                    (nameToAliasesMap[className] = []);

                for (i = 0; i < aliases[className].length; i++) {
                    alias = aliases[className][i];
                    if (!aliasToNameMap[alias]) {
                        aliasToNameMap[alias] = className;
                        aliasList.push(alias);
                    }
                }

            }
            return this;
        },

        
        addNameAlternateMappings: function(alternates) {
            var alternateToName = this.maps.alternateToName,
                nameToAlternates = this.maps.nameToAlternates,
                className, aliasList, alternate, i;

            for (className in alternates) {
                aliasList = nameToAlternates[className] ||
                    (nameToAlternates[className] = []);

                for (i  = 0; i < alternates[className].length; i++) {
                    alternate = alternates[className][i];
                    if (!alternateToName[alternate]) {
                        alternateToName[alternate] = className;
                        aliasList.push(alternate);
                    }
                }

            }
            return this;
        },

        
        getByAlias: function(alias) {
            return this.get(this.getNameByAlias(alias));
        },

        
        getNameByAlias: function(alias) {
            return this.maps.aliasToName[alias] || '';
        },

        
        getNameByAlternate: function(alternate) {
            return this.maps.alternateToName[alternate] || '';
        },

        
        getAliasesByName: function(name) {
            return this.maps.nameToAliases[name] || [];
        },

        
        getName: function(object) {
            return object && object.$className || '';
        },

        
        getClass: function(object) {
            return object && object.self || null;
        },

        
        create: function(className, data, createdFn) {

            var ctor = makeCtor();
            if (typeof data == 'function') {
                data = data(ctor);
            }


            data.$className = className;

            return new Class(ctor, data, function() {
                var postprocessorStack = data.postprocessors || Manager.defaultPostprocessors,
                    registeredPostprocessors = Manager.postprocessors,
                    postprocessors = [],
                    postprocessor, i, ln, j, subLn, postprocessorProperties, postprocessorProperty;

                delete data.postprocessors;

                for (i = 0,ln = postprocessorStack.length; i < ln; i++) {
                    postprocessor = postprocessorStack[i];

                    if (typeof postprocessor == 'string') {
                        postprocessor = registeredPostprocessors[postprocessor];
                        postprocessorProperties = postprocessor.properties;

                        if (postprocessorProperties === true) {
                            postprocessors.push(postprocessor.fn);
                        }
                        else if (postprocessorProperties) {
                            for (j = 0,subLn = postprocessorProperties.length; j < subLn; j++) {
                                postprocessorProperty = postprocessorProperties[j];

                                if (data.hasOwnProperty(postprocessorProperty)) {
                                    postprocessors.push(postprocessor.fn);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        postprocessors.push(postprocessor);
                    }
                }

                data.postprocessors = postprocessors;
                data.createdFn = createdFn;
                Manager.processCreate(className, this, data);
            });
        },

        processCreate: function(className, cls, clsData){
            var me = this,
                postprocessor = clsData.postprocessors.shift(),
                createdFn = clsData.createdFn;

            if (!postprocessor) {
                
                if (className) {
                    me.set(className, cls);
                }

                if (createdFn) {
                    createdFn.call(cls, cls);
                }

                if (className) {
                    me.triggerCreated(className);
                }
                return;
            }

            if (postprocessor.call(me, className, cls, clsData, me.processCreate) !== false) {
                me.processCreate(className, cls, clsData);
            }
        },

        createOverride: function (className, data, createdFn) {
            var me = this,
                overriddenClassName = data.override,
                requires = data.requires,
                uses = data.uses,
                classReady = function () {
                    var cls, temp;

                    if (requires) {
                        temp = requires;
                        requires = null; 

                        
                        
                        
                        Ext.Loader.require(temp, classReady);
                    } else {
                        
                        
                        cls = me.get(overriddenClassName);

                        
                        delete data.override;
                        delete data.requires;
                        delete data.uses;

                        Ext.override(cls, data);

                        
                        
                        
                        me.triggerCreated(className);

                        if (uses) {
                            Ext.Loader.addUsedClasses(uses); 
                        }

                        if (createdFn) {
                            createdFn.call(cls); 
                        }
                    }
                };

            me.existCache[className] = true;

            
            me.onCreated(classReady, me, overriddenClassName);

            return me;
        },

        
        instantiateByAlias: function() {
            var alias = arguments[0],
                args = arraySlice.call(arguments),
                className = this.getNameByAlias(alias);

            if (!className) {
                className = this.maps.aliasToName[alias];



                Ext.syncRequire(className);
            }

            args[0] = className;

            return this.instantiate.apply(this, args);
        },

        
        instantiate: function() {
            var name = arguments[0],
                nameType = typeof name,
                args = arraySlice.call(arguments, 1),
                alias = name,
                possibleName, cls;

            if (nameType != 'function') {
                if (nameType != 'string' && args.length === 0) {
                    args = [name];
                    name = name.xclass;
                }


                cls = this.get(name);
            }
            else {
                cls = name;
            }

            
            if (!cls) {
                possibleName = this.getNameByAlias(name);

                if (possibleName) {
                    name = possibleName;

                    cls = this.get(name);
                }
            }

            
            if (!cls) {
                possibleName = this.getNameByAlternate(name);

                if (possibleName) {
                    name = possibleName;

                    cls = this.get(name);
                }
            }

            
            if (!cls) {

                Ext.syncRequire(name);

                cls = this.get(name);
            }


            return this.getInstantiator(args.length)(cls, args);
        },

        
        dynInstantiate: function(name, args) {
            args = arrayFrom(args, true);
            args.unshift(name);

            return this.instantiate.apply(this, args);
        },

        
        getInstantiator: function(length) {
            var instantiators = this.instantiators,
                instantiator,
                i,
                args;

            instantiator = instantiators[length];

            if (!instantiator) {
                i = length;
                args = [];

                for (i = 0; i < length; i++) {
                    args.push('a[' + i + ']');
                }

                instantiator = instantiators[length] = new Function('c', 'a', 'return new c(' + args.join(',') + ')');
            }

            return instantiator;
        },

        
        postprocessors: {},

        
        defaultPostprocessors: [],

        
        registerPostprocessor: function(name, fn, properties, position, relativeTo) {
            if (!position) {
                position = 'last';
            }

            if (!properties) {
                properties = [name];
            }

            this.postprocessors[name] = {
                name: name,
                properties: properties || false,
                fn: fn
            };

            this.setDefaultPostprocessorPosition(name, position, relativeTo);

            return this;
        },

        
        setDefaultPostprocessors: function(postprocessors) {
            this.defaultPostprocessors = arrayFrom(postprocessors);

            return this;
        },

        
        setDefaultPostprocessorPosition: function(name, offset, relativeName) {
            var defaultPostprocessors = this.defaultPostprocessors,
                index;

            if (typeof offset == 'string') {
                if (offset === 'first') {
                    defaultPostprocessors.unshift(name);

                    return this;
                }
                else if (offset === 'last') {
                    defaultPostprocessors.push(name);

                    return this;
                }

                offset = (offset === 'after') ? 1 : -1;
            }

            index = Ext.Array.indexOf(defaultPostprocessors, relativeName);

            if (index !== -1) {
                Ext.Array.splice(defaultPostprocessors, Math.max(0, index + offset), 0, name);
            }

            return this;
        },

        
        getNamesByExpression: function(expression) {
            var nameToAliasesMap = this.maps.nameToAliases,
                names = [],
                name, alias, aliases, possibleName, regex, i, ln;


            if (expression.indexOf('*') !== -1) {
                expression = expression.replace(/\*/g, '(.*?)');
                regex = new RegExp('^' + expression + '$');

                for (name in nameToAliasesMap) {
                    if (nameToAliasesMap.hasOwnProperty(name)) {
                        aliases = nameToAliasesMap[name];

                        if (name.search(regex) !== -1) {
                            names.push(name);
                        }
                        else {
                            for (i = 0, ln = aliases.length; i < ln; i++) {
                                alias = aliases[i];

                                if (alias.search(regex) !== -1) {
                                    names.push(name);
                                    break;
                                }
                            }
                        }
                    }
                }

            } else {
                possibleName = this.getNameByAlias(expression);

                if (possibleName) {
                    names.push(possibleName);
                } else {
                    possibleName = this.getNameByAlternate(expression);

                    if (possibleName) {
                        names.push(possibleName);
                    } else {
                        names.push(expression);
                    }
                }
            }

            return names;
        }
    };

    
    Manager.registerPostprocessor('alias', function(name, cls, data) {
        
        var aliases = data.alias,
            i, ln;

        for (i = 0,ln = aliases.length; i < ln; i++) {
            alias = aliases[i];

            this.setAlias(cls, alias);
        }

    }, ['xtype', 'alias']);

    
    Manager.registerPostprocessor('singleton', function(name, cls, data, fn) {
        
        if (data.singleton) {
            fn.call(this, name, new cls(), data);
        }
        else {
            return true;
        }
        return false;
    });

    
    Manager.registerPostprocessor('alternateClassName', function(name, cls, data) {
        
        var alternates = data.alternateClassName,
            i, ln, alternate;

        if (!(alternates instanceof Array)) {
            alternates = [alternates];
        }

        for (i = 0, ln = alternates.length; i < ln; i++) {
            alternate = alternates[i];


            this.set(alternate, cls);
        }
    });

    Ext.apply(Ext, {
        
        create: alias(Manager, 'instantiate'),

        
        widget: function(name, config) {
            
            
            
            
            
            
            
            var xtype = name,
                alias, className, T, load;

            if (typeof xtype != 'string') { 
                
                config = name; 
                xtype = config.xtype;
            } else {
                config = config || {};
            }

            if (config.isComponent) {
                return config;
            }

            alias = 'widget.' + xtype;
            className = Manager.getNameByAlias(alias);

            
            if (!className) {
                load = true;
            }

            T = Manager.get(className);
            if (load || !T) {
                return Manager.instantiateByAlias(alias, config);
            }
            return new T(config);
        },

        
        createByAlias: alias(Manager, 'instantiateByAlias'),

        
        define: function (className, data, createdFn) {
            
            if (data.override) {
                return Manager.createOverride.apply(Manager, arguments);
            }

            return Manager.create.apply(Manager, arguments);
        },

        
        undefine: function(className) {
        
            var classes = Manager.classes,
                maps = Manager.maps,
                aliasToName = maps.aliasToName,
                nameToAliases = maps.nameToAliases,
                alternateToName = maps.alternateToName,
                nameToAlternates = maps.nameToAlternates,
                aliases = nameToAliases[className],
                alternates = nameToAlternates[className],
                parts, partCount, namespace, i;

            delete Manager.namespaceParseCache[className];
            delete nameToAliases[className];
            delete nameToAlternates[className];
            delete classes[className];

            if (aliases) {
                for (i = aliases.length; i--;) {
                    delete aliasToName[aliases[i]];
                }
            }

            if (alternates) {
                for (i = alternates.length; i--; ) {
                    delete alternateToName[alternates[i]];
                }
            }

            parts  = Manager.parseNamespace(className);
            partCount = parts.length - 1;
            namespace = parts[0];

            for (i = 1; i < partCount; i++) {
                namespace = namespace[parts[i]];
                if (!namespace) {
                    return;
                }
            }

            
            try {
                delete namespace[parts[partCount]];
            }
            catch (e) {
                namespace[parts[partCount]] = undefined;
            }
        },

        
        getClassName: alias(Manager, 'getName'),

        
        getDisplayName: function(object) {
            if (object) {
                if (object.displayName) {
                    return object.displayName;
                }

                if (object.$name && object.$class) {
                    return Ext.getClassName(object.$class) + '#' + object.$name;
                }

                if (object.$className) {
                    return object.$className;
                }
            }

            return 'Anonymous';
        },

        
        getClass: alias(Manager, 'getClass'),

        
        namespace: alias(Manager, 'createNamespaces')
    });

    
    Ext.createWidget = Ext.widget;

    
    Ext.ns = Ext.namespace;

    Class.registerPreprocessor('className', function(cls, data) {
        if (data.$className) {
            cls.$className = data.$className;
        }
        
    }, true, 'first');

    Class.registerPreprocessor('alias', function(cls, data) {
        
        var prototype = cls.prototype,
            xtypes = arrayFrom(data.xtype),
            aliases = arrayFrom(data.alias),
            widgetPrefix = 'widget.',
            widgetPrefixLength = widgetPrefix.length,
            xtypesChain = Array.prototype.slice.call(prototype.xtypesChain || []),
            xtypesMap = Ext.merge({}, prototype.xtypesMap || {}),
            i, ln, alias, xtype;

        for (i = 0,ln = aliases.length; i < ln; i++) {
            alias = aliases[i];


            if (alias.substring(0, widgetPrefixLength) === widgetPrefix) {
                xtype = alias.substring(widgetPrefixLength);
                Ext.Array.include(xtypes, xtype);
            }
        }

        cls.xtype = data.xtype = xtypes[0];
        data.xtypes = xtypes;

        for (i = 0,ln = xtypes.length; i < ln; i++) {
            xtype = xtypes[i];

            if (!xtypesMap[xtype]) {
                xtypesMap[xtype] = true;
                xtypesChain.push(xtype);
            }
        }

        data.xtypesChain = xtypesChain;
        data.xtypesMap = xtypesMap;

        Ext.Function.interceptAfter(data, 'onClassCreated', function() {
        
            var mixins = prototype.mixins,
                key, mixin;

            for (key in mixins) {
                if (mixins.hasOwnProperty(key)) {
                    mixin = mixins[key];

                    xtypes = mixin.xtypes;

                    if (xtypes) {
                        for (i = 0,ln = xtypes.length; i < ln; i++) {
                            xtype = xtypes[i];

                            if (!xtypesMap[xtype]) {
                                xtypesMap[xtype] = true;
                                xtypesChain.push(xtype);
                            }
                        }
                    }
                }
            }
        });

        for (i = 0,ln = xtypes.length; i < ln; i++) {
            xtype = xtypes[i];


            Ext.Array.include(aliases, widgetPrefix + xtype);
        }

        data.alias = aliases;

    }, ['xtype', 'alias']);

}(Ext.Class, Ext.Function.alias, Array.prototype.slice, Ext.Array.from, Ext.global));



if (Ext._alternatesMetadata) {
   Ext.ClassManager.addNameAlternateMappings(Ext._alternatesMetadata);
   Ext._alternatesMetadata = null;
}

if (Ext._aliasMetadata) {
    Ext.ClassManager.addNameAliasMappings(Ext._aliasMetadata);
    Ext._aliasMetadata = null;
}







Ext.Loader = new function() {
    var Loader = this,
        Manager = Ext.ClassManager,
        Class = Ext.Class,
        flexSetter = Ext.Function.flexSetter,
        alias = Ext.Function.alias,
        pass = Ext.Function.pass,
        defer = Ext.Function.defer,
        arrayErase = Ext.Array.erase,
        dependencyProperties = ['extend', 'mixins', 'requires'],
        isInHistory = {},
        history = [],
        slashDotSlashRe = /\/\.\//g,
        dotRe = /\./g,
        setPathCount = 0;

    Ext.apply(Loader, {

        
        isInHistory: isInHistory,

        
        history: history,

        
        config: {
            
            enabled: false,

            
            scriptChainDelay : false,

            
            disableCaching: true,

            
            disableCachingParam: '_dc',

            
            garbageCollect : false,

            
            paths: {
                'Ext': '.'
            },

            
            preserveScripts : true,

            
            scriptCharset : undefined
        },

        
        setConfig: function(name, value) {
            if (Ext.isObject(name) && arguments.length === 1) {
                Ext.merge(Loader.config, name);

                if ('paths' in name) {
                    Ext.app.collectNamespaces(name.paths);
                }
            }
            else {
                Loader.config[name] = (Ext.isObject(value)) ? Ext.merge(Loader.config[name], value) : value;

                if (name === 'paths') {
                    Ext.app.collectNamespaces(value);
                }
            }

            return Loader;
        },

        
        getConfig: function(name) {
            if (name) {
                return Loader.config[name];
            }

            return Loader.config;
        },

        
        setPath: flexSetter(function(name, path) {
            Loader.config.paths[name] = path;
            Ext.app.namespaces[name] = true;
            setPathCount++;

            return Loader;
        }),

        
        addClassPathMappings: function(paths) {
            var name;

            if(setPathCount == 0){
                Loader.config.paths = paths;
            } else {
                for(name in paths){
                    Loader.config.paths[name] = paths[name];
                }
            }
            setPathCount++;
            return Loader;
        },

        
        getPath: function(className) {
            var path = '',
                paths = Loader.config.paths,
                prefix = Loader.getPrefix(className);

            if (prefix.length > 0) {
                if (prefix === className) {
                    return paths[prefix];
                }

                path = paths[prefix];
                className = className.substring(prefix.length + 1);
            }

            if (path.length > 0) {
                path += '/';
            }

            return path.replace(slashDotSlashRe, '/') + className.replace(dotRe, "/") + '.js';
        },

        
        getPrefix: function(className) {
            var paths = Loader.config.paths,
                prefix, deepestPrefix = '';

            if (paths.hasOwnProperty(className)) {
                return className;
            }

            for (prefix in paths) {
                if (paths.hasOwnProperty(prefix) && prefix + '.' === className.substring(0, prefix.length + 1)) {
                    if (prefix.length > deepestPrefix.length) {
                        deepestPrefix = prefix;
                    }
                }
            }

            return deepestPrefix;
        },

        
        isAClassNameWithAKnownPrefix: function(className) {
            var prefix = Loader.getPrefix(className);

            
            return prefix !== '' && prefix !== className;
        },

        
        require: function(expressions, fn, scope, excludes) {
            if (fn) {
                fn.call(scope);
            }
        },

        
        syncRequire: function() {},

        
        exclude: function(excludes) {
            return {
                require: function(expressions, fn, scope) {
                    return Loader.require(expressions, fn, scope, excludes);
                },

                syncRequire: function(expressions, fn, scope) {
                    return Loader.syncRequire(expressions, fn, scope, excludes);
                }
            };
        },

        
        onReady: function(fn, scope, withDomReady, options) {
            var oldFn;

            if (withDomReady !== false && Ext.onDocumentReady) {
                oldFn = fn;

                fn = function() {
                    Ext.onDocumentReady(oldFn, scope, options);
                };
            }

            fn.call(scope);
        }
    });

    var queue = [],
        isClassFileLoaded = {},
        isFileLoaded = {},
        classNameToFilePathMap = {},
        scriptElements = {},
        readyListeners = [],
        usedClasses = [],
        requiresMap = {},
        comparePriority = function(listenerA, listenerB) {
            return listenerB.priority - listenerA.priority;
        };

    Ext.apply(Loader, {
        
        documentHead: typeof document != 'undefined' && (document.head || document.getElementsByTagName('head')[0]),

        
        isLoading: false,

        
        queue: queue,

        
        isClassFileLoaded: isClassFileLoaded,

        
        isFileLoaded: isFileLoaded,

        
        readyListeners: readyListeners,

        
        optionalRequires: usedClasses,

        
        requiresMap: requiresMap,

        
        numPendingFiles: 0,

        
        numLoadedFiles: 0,

        
        hasFileLoadError: false,

        
        classNameToFilePathMap: classNameToFilePathMap,

        
        scriptsLoading: 0,

        
        syncModeEnabled: false,

        scriptElements: scriptElements,

        
        refreshQueue: function() {
            var ln = queue.length,
                i, item, j, requires;

            

            if (!ln && !Loader.scriptsLoading) {
                return Loader.triggerReady();
            }

            for (i = 0; i < ln; i++) {
                item = queue[i];

                if (item) {
                    requires = item.requires;

                    
                    
                    if (requires.length > Loader.numLoadedFiles) {
                        continue;
                    }

                    
                    for (j = 0; j < requires.length; ) {
                        if (Manager.isCreated(requires[j])) {
                            
                            arrayErase(requires, j, 1);
                        }
                        else {
                            j++;
                        }
                    }

                    
                    if (item.requires.length === 0) {
                        arrayErase(queue, i, 1);
                        item.callback.call(item.scope);
                        Loader.refreshQueue();
                        break;
                    }
                }
            }

            return Loader;
        },

        
        injectScriptElement: function(url, onLoad, onError, scope, charset) {
            var script = document.createElement('script'),
                dispatched = false,
                config = Loader.config,
                onLoadFn = function() {

                    if(!dispatched) {
                        dispatched = true;
                        script.onload = script.onreadystatechange = script.onerror = null;
                        if (typeof config.scriptChainDelay == 'number') {
                            
                            defer(onLoad, config.scriptChainDelay, scope);
                        } else {
                            onLoad.call(scope);
                        }
                        Loader.cleanupScriptElement(script, config.preserveScripts === false, config.garbageCollect);
                    }

                },
                onErrorFn = function(arg) {
                    defer(onError, 1, scope);   
                    Loader.cleanupScriptElement(script, config.preserveScripts === false, config.garbageCollect);
                };

            script.type = 'text/javascript';
            script.onerror = onErrorFn;
            charset = charset || config.scriptCharset;
            if (charset) {
                script.charset = charset;
            }

            
            if ('addEventListener' in script ) {
                script.onload = onLoadFn;
            } else if ('readyState' in script) {   
                script.onreadystatechange = function() {
                    if ( this.readyState == 'loaded' || this.readyState == 'complete' ) {
                        onLoadFn();
                    }
                };
            } else {
                 script.onload = onLoadFn;
            }

            script.src = url;
            (Loader.documentHead || document.getElementsByTagName('head')[0]).appendChild(script);

            return script;
        },

        
        removeScriptElement: function(url) {
            if (scriptElements[url]) {
                Loader.cleanupScriptElement(scriptElements[url], true, !!Loader.getConfig('garbageCollect'));
                delete scriptElements[url];
            }

            return Loader;
        },

        
        cleanupScriptElement: function(script, remove, collect) {
            var prop;
            script.onload = script.onreadystatechange = script.onerror = null;
            if (remove) {
                Ext.removeNode(script);       
                if (collect) {
                    for (prop in script) {
                        try {
                            if (prop != 'src') {
                                
                                
                                script[prop] = null;
                            }
                            delete script[prop];      
                        } catch (cleanEx) {
                            
                        }
                    }
                }
            }

            return Loader;
        },

        
        loadScript: function (options) {
            var config = Loader.getConfig(),
                isString = typeof options == 'string',
                url = isString ? options : options.url,
                onError = !isString && options.onError,
                onLoad = !isString && options.onLoad,
                scope = !isString && options.scope,
                onScriptError = function() {
                    Loader.numPendingFiles--;
                    Loader.scriptsLoading--;

                    if (onError) {
                        onError.call(scope, "Failed loading '" + url + "', please verify that the file exists");
                    }

                    if (Loader.numPendingFiles + Loader.scriptsLoading === 0) {
                        Loader.refreshQueue();
                    }
                },
                onScriptLoad = function () {
                    Loader.numPendingFiles--;
                    Loader.scriptsLoading--;

                    if (onLoad) {
                        onLoad.call(scope);
                    }

                    if (Loader.numPendingFiles + Loader.scriptsLoading === 0) {
                        Loader.refreshQueue();
                    }
                },
                src;

            Loader.isLoading = true;
            Loader.numPendingFiles++;
            Loader.scriptsLoading++;

            src = config.disableCaching ?
                (url + '?' + config.disableCachingParam + '=' + Ext.Date.now()) : url;

            scriptElements[url] = Loader.injectScriptElement(src, onScriptLoad, onScriptError);
        },

        
        loadScriptFile: function(url, onLoad, onError, scope, synchronous) {
            if (isFileLoaded[url]) {
                return Loader;
            }

            var config = Loader.getConfig(),
                noCacheUrl = url + (config.disableCaching ? ('?' + config.disableCachingParam + '=' + Ext.Date.now()) : ''),
                isCrossOriginRestricted = false,
                xhr, status, onScriptError,
                debugSourceURL = "";

            scope = scope || Loader;

            Loader.isLoading = true;

            if (!synchronous) {
                onScriptError = function() {
                };

                scriptElements[url] = Loader.injectScriptElement(noCacheUrl, onLoad, onScriptError, scope);
            } else {
                if (typeof XMLHttpRequest != 'undefined') {
                    xhr = new XMLHttpRequest();
                } else {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }

                try {
                    xhr.open('GET', noCacheUrl, false);
                    xhr.send(null);
                } catch (e) {
                    isCrossOriginRestricted = true;
                }

                status = (xhr.status === 1223) ? 204 :
                    (xhr.status === 0 && ((self.location || {}).protocol == 'file:' || (self.location || {}).protocol == 'ionp:')) ? 200 : xhr.status;

                isCrossOriginRestricted = isCrossOriginRestricted || (status === 0);

                if (isCrossOriginRestricted
                ) {
                }
                else if ((status >= 200 && status < 300) || (status === 304)
                ) {
                    
                    
                    if (!Ext.isIE) {
                        debugSourceURL = "\n//@ sourceURL=" + url;
                    }

                    Ext.globalEval(xhr.responseText + debugSourceURL);

                    onLoad.call(scope);
                }
                else {
                }

                
                xhr = null;
            }
        },

        
        syncRequire: function() {
            var syncModeEnabled = Loader.syncModeEnabled;

            if (!syncModeEnabled) {
                Loader.syncModeEnabled = true;
            }

            Loader.require.apply(Loader, arguments);

            if (!syncModeEnabled) {
                Loader.syncModeEnabled = false;
            }

            Loader.refreshQueue();
        },

        
        require: function(expressions, fn, scope, excludes) {
            var excluded = {},
                included = {},
                excludedClassNames = [],
                possibleClassNames = [],
                classNames = [],
                references = [],
                callback,
                syncModeEnabled,
                filePath, expression, exclude, className,
                possibleClassName, i, j, ln, subLn;

            if (excludes) {
                
                excludes = (typeof excludes === 'string') ? [ excludes ] : excludes;

                for (i = 0,ln = excludes.length; i < ln; i++) {
                    exclude = excludes[i];

                    if (typeof exclude == 'string' && exclude.length > 0) {
                        excludedClassNames = Manager.getNamesByExpression(exclude);

                        for (j = 0,subLn = excludedClassNames.length; j < subLn; j++) {
                            excluded[excludedClassNames[j]] = true;
                        }
                    }
                }
            }

            
            expressions = (typeof expressions === 'string') ? [ expressions ] : (expressions ? expressions : []);

            if (fn) {
                if (fn.length > 0) {
                    callback = function() {
                        var classes = [],
                            i, ln;

                        for (i = 0,ln = references.length; i < ln; i++) {
                            classes.push(Manager.get(references[i]));
                        }

                        return fn.apply(this, classes);
                    };
                }
                else {
                    callback = fn;
                }
            }
            else {
                callback = Ext.emptyFn;
            }

            scope = scope || Ext.global;

            for (i = 0,ln = expressions.length; i < ln; i++) {
                expression = expressions[i];

                if (typeof expression == 'string' && expression.length > 0) {
                    possibleClassNames = Manager.getNamesByExpression(expression);
                    subLn = possibleClassNames.length;

                    for (j = 0; j < subLn; j++) {
                        possibleClassName = possibleClassNames[j];

                        if (excluded[possibleClassName] !== true) {
                            references.push(possibleClassName);

                            if (!Manager.isCreated(possibleClassName) && !included[possibleClassName]) {
                                included[possibleClassName] = true;
                                classNames.push(possibleClassName);
                            }
                        }
                    }
                }
            }

            
            
            if (classNames.length > 0) {
                if (!Loader.config.enabled) {
                    throw new Error("Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. " +
                             "Missing required class" + ((classNames.length > 1) ? "es" : "") + ": " + classNames.join(', '));
                }
            }
            else {
                callback.call(scope);
                return Loader;
            }

            syncModeEnabled = Loader.syncModeEnabled;

            if (!syncModeEnabled) {
                queue.push({
                    requires: classNames.slice(), 
                                                  
                    callback: callback,
                    scope: scope
                });
            }

            ln = classNames.length;

            for (i = 0; i < ln; i++) {
                className = classNames[i];

                filePath = Loader.getPath(className);

                
                
                
                if (syncModeEnabled && isClassFileLoaded.hasOwnProperty(className)) {
                    if (!isClassFileLoaded[className]) {
                        Loader.numPendingFiles--;
                        Loader.removeScriptElement(filePath);
                        delete isClassFileLoaded[className];
                    }
                }

                if (!isClassFileLoaded.hasOwnProperty(className)) {
                    isClassFileLoaded[className] = false;
                    classNameToFilePathMap[className] = filePath;

                    Loader.numPendingFiles++;
                    Loader.loadScriptFile(
                        filePath,
                        pass(Loader.onFileLoaded, [className, filePath], Loader),
                        pass(Loader.onFileLoadError, [className, filePath], Loader),
                        Loader,
                        syncModeEnabled
                    );
                }
            }

            if (syncModeEnabled) {
                callback.call(scope);

                if (ln === 1) {
                    return Manager.get(className);
                }
            }

            return Loader;
        },

        
        onFileLoaded: function(className, filePath) {
            var loaded = isClassFileLoaded[className];
            Loader.numLoadedFiles++;

            isClassFileLoaded[className] = true;
            isFileLoaded[filePath] = true;

            
            
            if (!loaded) {
                Loader.numPendingFiles--;
            }

            if (Loader.numPendingFiles === 0) {
                Loader.refreshQueue();
            }

        },

        
        onFileLoadError: function(className, filePath, errorMessage, isSynchronous) {
            Loader.numPendingFiles--;
            Loader.hasFileLoadError = true;

        },

        
        addUsedClasses: function (classes) {
            var cls, i, ln;

            if (classes) {
                classes = (typeof classes == 'string') ? [classes] : classes;
                for (i = 0, ln = classes.length; i < ln; i++) {
                    cls = classes[i];
                    if (typeof cls == 'string' && !Ext.Array.contains(usedClasses, cls)) {
                        usedClasses.push(cls);
                    }
                }
            }

            return Loader;
        },

        
        triggerReady: function() {
            var listener,
                refClasses = usedClasses;

            if (Loader.isLoading) {
                Loader.isLoading = false;

                if (refClasses.length !== 0) {
                    
                    refClasses = refClasses.slice();
                    usedClasses.length = 0;
                    
                    
                    Loader.require(refClasses, Loader.triggerReady, Loader);
                    return Loader;
                }
            }

            Ext.Array.sort(readyListeners, comparePriority);

            
            
            
            while (readyListeners.length && !Loader.isLoading) {
                
                
                listener = readyListeners.shift();
                listener.fn.call(listener.scope);
            }

            return Loader;
        },

        
        onReady: function(fn, scope, withDomReady, options) {
            var oldFn;

            if (withDomReady !== false && Ext.onDocumentReady) {
                oldFn = fn;

                fn = function() {
                    Ext.onDocumentReady(oldFn, scope, options);
                };
            }

            if (!Loader.isLoading) {
                fn.call(scope);
            }
            else {
                readyListeners.push({
                    fn: fn,
                    scope: scope,
                    priority: (options && options.priority) || 0
                });
            }
        },

        
        historyPush: function(className) {
            if (className && isClassFileLoaded.hasOwnProperty(className) && !isInHistory[className]) {
                isInHistory[className] = true;
                history.push(className);
            }
            return Loader;
        }
    });

    
    Ext.disableCacheBuster = function (disable, path) {
        var date = new Date();
        date.setTime(date.getTime() + (disable ? 10*365 : -1) * 24*60*60*1000);
        date = date.toGMTString();
        document.cookie = 'ext-cache=1; expires=' + date + '; path='+(path || '/');
    };


    
    Ext.require = alias(Loader, 'require');

    
    Ext.syncRequire = alias(Loader, 'syncRequire');

    
    Ext.exclude = alias(Loader, 'exclude');

    
    Ext.onReady = function(fn, scope, options) {
        Loader.onReady(fn, scope, true, options);
    };

    
    Class.registerPreprocessor('loader', function(cls, data, hooks, continueFn) {
        
        var me = this,
            dependencies = [],
            dependency,
            className = Manager.getName(cls),
            i, j, ln, subLn, value, propertyName, propertyValue,
            requiredMap, requiredDep;

        

        for (i = 0,ln = dependencyProperties.length; i < ln; i++) {
            propertyName = dependencyProperties[i];

            if (data.hasOwnProperty(propertyName)) {
                propertyValue = data[propertyName];

                if (typeof propertyValue == 'string') {
                    dependencies.push(propertyValue);
                }
                else if (propertyValue instanceof Array) {
                    for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
                        value = propertyValue[j];

                        if (typeof value == 'string') {
                            dependencies.push(value);
                        }
                    }
                }
                else if (typeof propertyValue != 'function') {
                    for (j in propertyValue) {
                        if (propertyValue.hasOwnProperty(j)) {
                            value = propertyValue[j];

                            if (typeof value == 'string') {
                                dependencies.push(value);
                            }
                        }
                    }
                }
            }
        }

        if (dependencies.length === 0) {
            return;
        }


        Loader.require(dependencies, function() {
            for (i = 0,ln = dependencyProperties.length; i < ln; i++) {
                propertyName = dependencyProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    propertyValue = data[propertyName];

                    if (typeof propertyValue == 'string') {
                        data[propertyName] = Manager.get(propertyValue);
                    }
                    else if (propertyValue instanceof Array) {
                        for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
                            value = propertyValue[j];

                            if (typeof value == 'string') {
                                data[propertyName][j] = Manager.get(value);
                            }
                        }
                    }
                    else if (typeof propertyValue != 'function') {
                        for (var k in propertyValue) {
                            if (propertyValue.hasOwnProperty(k)) {
                                value = propertyValue[k];

                                if (typeof value == 'string') {
                                    data[propertyName][k] = Manager.get(value);
                                }
                            }
                        }
                    }
                }
            }

            continueFn.call(me, cls, data, hooks);
        });

        return false;
    }, true, 'after', 'className');

    
    Manager.registerPostprocessor('uses', function(name, cls, data) {
        
        var uses = data.uses;
        if (uses) {
            Loader.addUsedClasses(uses);
        }
    });

    Manager.onCreated(Loader.historyPush);
};



if (Ext._classPathMetadata) {
    Ext.Loader.addClassPathMappings(Ext._classPathMetadata);
    Ext._classPathMetadata = null;
}


(function() {
    var scripts = document.getElementsByTagName('script'),
        currentScript = scripts[scripts.length - 1],
        src = currentScript.src,
        path = src.substring(0, src.lastIndexOf('/') + 1),
        Loader = Ext.Loader;


    Loader.setConfig({
        enabled: true,
        disableCaching:
            true,
        paths: {
            'Ext': path + 'src'
        }
    });
})();



Ext._endTime = new Date().getTime();
if (Ext._beforereadyhandler){
    Ext._beforereadyhandler();
}






Ext.Error = Ext.extend(Error, {
    statics: {
        
        ignore: false,

        
        

        
        raise: function(err){
            err = err || {};
            if (Ext.isString(err)) {
                err = { msg: err };
            }

            var method = this.raise.caller,
                msg;

            if (method) {
                if (method.$name) {
                    err.sourceMethod = method.$name;
                }
                if (method.$owner) {
                    err.sourceClass = method.$owner.$className;
                }
            }

            if (Ext.Error.handle(err) !== true) {
                msg = Ext.Error.prototype.toString.call(err);

                Ext.log({
                    msg: msg,
                    level: 'error',
                    dump: err,
                    stack: true
                });

                throw new Ext.Error(err);
            }
        },

        
        handle: function(){
            return Ext.Error.ignore;
        }
    },

    
    name: 'Ext.Error',

    
    constructor: function(config){
        if (Ext.isString(config)) {
            config = { msg: config };
        }

        var me = this;

        Ext.apply(me, config);

        me.message = me.message || me.msg; 
        
    },

    
    toString: function(){
        var me = this,
            className = me.sourceClass ? me.sourceClass : '',
            methodName = me.sourceMethod ? '.' + me.sourceMethod + '(): ' : '',
            msg = me.msg || '(No description provided)';

        return className + methodName + msg;
    }
});


Ext.deprecated = function (suggestion) {
    return Ext.emptyFn;
};








Ext.JSON = (new(function() {
    var me = this,
    encodingFunction,
    decodingFunction,
    useNative = null,
    useHasOwn = !! {}.hasOwnProperty,
    isNative = function() {
        if (useNative === null) {
            useNative = Ext.USE_NATIVE_JSON && window.JSON && JSON.toString() == '[object JSON]';
        }
        return useNative;
    },
    pad = function(n) {
        return n < 10 ? "0" + n : n;
    },
    doDecode = function(json) {
        return eval("(" + json + ')');
    },
    doEncode = function(o, newline) {
        
        if (o === null || o === undefined) {
            return "null";
        } else if (Ext.isDate(o)) {
            return Ext.JSON.encodeDate(o);
        } else if (Ext.isString(o)) {
            return Ext.JSON.encodeString(o);
        } else if (typeof o == "number") {
            
            return isFinite(o) ? String(o) : "null";
        } else if (Ext.isBoolean(o)) {
            return String(o);
        }
        
        
        else if (o.toJSON) {
            return o.toJSON();
        } else if (Ext.isArray(o)) {
            return encodeArray(o, newline);
        } else if (Ext.isObject(o)) {
            return encodeObject(o, newline);
        } else if (typeof o === "function") {
            return "null";
        }
        return 'undefined';
    },
    m = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"': '\\"',
        "\\": '\\\\',
        '\x0b': '\\u000b' 
    },
    charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g,
    encodeString = function(s) {
        return '"' + s.replace(charToReplace, function(a) {
            var c = m[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"';
    },


    encodeArray = function(o, newline) {

        var a = ["[", ""], 
            len = o.length,
            i;
        for (i = 0; i < len; i += 1) {
            a.push(Ext.JSON.encodeValue(o[i]), ',');
        }
        
        a[a.length - 1] = ']';
        return a.join("");
    },

    encodeObject = function(o, newline) {

        var a = ["{", ""], 
            i, val;
        for (i in o) {
            val = o[i];
            if (!useHasOwn || o.hasOwnProperty(i)) {
                
                if (typeof val === 'function' || val === undefined) {
                    continue;
                }
                a.push(Ext.JSON.encodeValue(i), ":", Ext.JSON.encodeValue(val), ',');
                
            }
        }
        
        a[a.length - 1] = '}';
        return a.join("");
    };
    
    
    me.encodeString = encodeString;

    
    me.encodeValue = doEncode;

    
    me.encodeDate = function(o) {
        return '"' + o.getFullYear() + "-"
        + pad(o.getMonth() + 1) + "-"
        + pad(o.getDate()) + "T"
        + pad(o.getHours()) + ":"
        + pad(o.getMinutes()) + ":"
        + pad(o.getSeconds()) + '"';
    };

    
    me.encode = function(o) {
        if (!encodingFunction) {
            
            encodingFunction = isNative() ? JSON.stringify : me.encodeValue;
        }
        return encodingFunction(o);
    };

    
    me.decode = function(json, safe) {
        if (!decodingFunction) {
            
            decodingFunction = isNative() ? JSON.parse : doDecode;
        }
        try {
            return decodingFunction(json);
        } catch (e) {
            if (safe === true) {
                return null;
            }
            Ext.Error.raise({
                sourceClass: "Ext.JSON",
                sourceMethod: "decode",
                msg: "You're trying to decode an invalid JSON String: " + json
            });
        }
    };
})());

Ext.encode = Ext.JSON.encode;

Ext.decode = Ext.JSON.decode;






Ext.apply(Ext, {
    userAgent: navigator.userAgent.toLowerCase(),
    cache: {},
    idSeed: 1000,
    windowId: 'ext-window',
    documentId: 'ext-document',

    
    isReady: false,

    
    enableGarbageCollector: true,

    
    enableListenerCollection: true,

    
    rootHierarchyState: {},

    addCacheEntry: function(id, el, dom) {
        dom = dom || el.dom;


        var cache = Ext.cache,
            key = id || (el && el.id) || dom.id,
            entry = cache[key] || (cache[key] = {
                data: {},
                events: {},

                dom: dom,

                
                skipGarbageCollection: !!(dom.getElementById || dom.navigator)
            });

        if (el) {
            el.$cache = entry;
            
            
            entry.el = el;
        }

        return entry;
    },

    updateCacheEntry: function(cacheItem, dom){
        cacheItem.dom = dom;
        if (cacheItem.el) {
            cacheItem.el.dom = dom;
        }
        return cacheItem;
    },

    
    id: function(el, prefix) {
        var me = this,
            sandboxPrefix = '';
        el = Ext.getDom(el, true) || {};
        if (el === document) {
            el.id = me.documentId;
        }
        else if (el === window) {
            el.id = me.windowId;
        }
        if (!el.id) {
            if (me.isSandboxed) {
                sandboxPrefix = Ext.sandboxName.toLowerCase() + '-';
            }
            el.id = sandboxPrefix + (prefix || "ext-gen") + (++Ext.idSeed);
        }
        return el.id;
    },

    escapeId: (function(){
        var validIdRe = /^[a-zA-Z_][a-zA-Z0-9_\-]*$/i,
            escapeRx = /([\W]{1})/g,
            leadingNumRx = /^(\d)/g,
            escapeFn = function(match, capture){
                return "\\" + capture;
            },
            numEscapeFn = function(match, capture){
                return '\\00' + capture.charCodeAt(0).toString(16) + ' ';
            };

        return function(id) {
            return validIdRe.test(id)
                ? id
                
                
                : id.replace(escapeRx, escapeFn)
                    .replace(leadingNumRx, numEscapeFn);
        };
    }()),

    
    getBody: (function() {
        var body;
        return function() {
            return body || (body = Ext.get(document.body));
        };
    }()),

    
    getHead: (function() {
        var head;
        return function() {
            return head || (head = Ext.get(document.getElementsByTagName("head")[0]));
        };
    }()),

    
    getDoc: (function() {
        var doc;
        return function() {
            return doc || (doc = Ext.get(document));
        };
    }()),

    
    getOrientation: function() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    },

    
    destroy: function() {
        var ln = arguments.length,
        i, arg;

        for (i = 0; i < ln; i++) {
            arg = arguments[i];
            if (arg) {
                if (Ext.isArray(arg)) {
                    this.destroy.apply(this, arg);
                } else if (arg.isStore) {
                    arg.destroyStore();
                } else if (Ext.isFunction(arg.destroy)) {
                    arg.destroy();
                } else if (arg.dom) {
                    arg.remove();
                }
            }
        }
    },

    
    callback: function (callback, scope, args, delay) {
        var fn, ret;

        if (Ext.isFunction(callback)){
            fn = callback;
        } else if (scope && Ext.isString(callback)) {
            fn = scope[callback];
        }

        if (fn) {
            args = args || [];
            scope = scope || window;
            if (delay) {
                Ext.defer(fn, delay, scope, args);
            } else {
                ret = fn.apply(scope, args);
            }
        }

        return ret;
    },
    
    
    resolveMethod: function(fn, scope) {
        if (Ext.isFunction(fn)) {
            return fn;
        }
        
        
        return scope[fn];
    },

    
    htmlEncode : function(value) {
        return Ext.String.htmlEncode(value);
    },

    
    htmlDecode : function(value) {
         return Ext.String.htmlDecode(value);
    },

    
    urlAppend : function(url, s) {
        return Ext.String.urlAppend(url, s);
    }
});


Ext.ns = Ext.namespace;


window.undefined = window.undefined;


(function(){

    var check = function(regex){
            return regex.test(Ext.userAgent);
        },
        isStrict = document.compatMode == "CSS1Compat",
        version = function (is, regex) {
            var m;
            return (is && (m = regex.exec(Ext.userAgent))) ? parseFloat(m[1]) : 0;
        },
        docMode = document.documentMode,
        isOpera = check(/opera/),
        isOpera10_5 = isOpera && check(/version\/10\.5/),
        isChrome = check(/\bchrome\b/),
        isWebKit = check(/webkit/),
        isSafari = !isChrome && check(/safari/),
        isSafari2 = isSafari && check(/applewebkit\/4/), 
        isSafari3 = isSafari && check(/version\/3/),
        isSafari4 = isSafari && check(/version\/4/),
        isSafari5_0 = isSafari && check(/version\/5\.0/),
        isSafari5 = isSafari && check(/version\/5/),
        isIE = !isOpera && check(/msie/),
        isIE7 = isIE && ((check(/msie 7/) && docMode != 8 && docMode != 9 && docMode != 10) || docMode == 7),
        isIE8 = isIE && ((check(/msie 8/) && docMode != 7 && docMode != 9 && docMode != 10) || docMode == 8),
        isIE9 = isIE && ((check(/msie 9/) && docMode != 7 && docMode != 8 && docMode != 10) || docMode == 9),
        isIE10 = isIE && ((check(/msie 10/) && docMode != 7 && docMode != 8 && docMode != 9) || docMode == 10),
        isIE6 = isIE && check(/msie 6/),
        isGecko = !isWebKit && check(/gecko/),
        isGecko3 = isGecko && check(/rv:1\.9/),
        isGecko4 = isGecko && check(/rv:2\.0/),
        isGecko5 = isGecko && check(/rv:5\./),
        isGecko10 = isGecko && check(/rv:10\./),
        isFF3_0 = isGecko3 && check(/rv:1\.9\.0/),
        isFF3_5 = isGecko3 && check(/rv:1\.9\.1/),
        isFF3_6 = isGecko3 && check(/rv:1\.9\.2/),
        isWindows = check(/windows|win32/),
        isMac = check(/macintosh|mac os x/),
        isLinux = check(/linux/),
        scrollbarSize = null,
        chromeVersion = version(true, /\bchrome\/(\d+\.\d+)/),
        firefoxVersion = version(true, /\bfirefox\/(\d+\.\d+)/),
        ieVersion = version(isIE, /msie (\d+\.\d+)/),
        operaVersion = version(isOpera, /version\/(\d+\.\d+)/),
        safariVersion = version(isSafari, /version\/(\d+\.\d+)/),
        webKitVersion = version(isWebKit, /webkit\/(\d+\.\d+)/),
        isSecure = /^https/i.test(window.location.protocol),
        nullLog;

    
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch(e) {}



    nullLog = function () {};
    nullLog.info = nullLog.warn = nullLog.error = Ext.emptyFn;

    
    Ext.setVersion('extjs', '4.2.1.883');
    Ext.apply(Ext, {
        
        SSL_SECURE_URL : isSecure && isIE ? 'javascript:\'\'' : 'about:blank',

        

        plainTableCls: Ext.buildSettings.baseCSSPrefix + 'table-plain', 

        plainListCls: Ext.buildSettings.baseCSSPrefix + 'list-plain', 

        
        enableNestedListenerRemoval : false,

        
        USE_NATIVE_JSON : false,

        
        getDom : function(el, strict) {
            if (!el || !document) {
                return null;
            }
            if (el.dom) {
                return el.dom;
            } else {
                if (typeof el == 'string') {
                    var e = Ext.getElementById(el);
                    
                    
                    if (e && isIE && strict) {
                        if (el == e.getAttribute('id')) {
                            return e;
                        } else {
                            return null;
                        }
                    }
                    return e;
                } else {
                    return el;
                }
            }
        },

        
        removeNode : isIE6 || isIE7 || isIE8
            ? (function() {
                var d;
                return function(n){
                    if(n && n.tagName.toUpperCase() != 'BODY'){
                        (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(n) : Ext.EventManager.removeAll(n);

                        var cache = Ext.cache,
                            id = n.id;

                        if (cache[id]) {
                            delete cache[id].dom;
                            delete cache[id];
                        }

                        if (isIE8 && n.parentNode) {
                            n.parentNode.removeChild(n);
                        }
                        d = d || document.createElement('div');
                        d.appendChild(n);
                        d.innerHTML = '';
                    }
                };
            }())
            : function(n) {
                if (n && n.parentNode && n.tagName.toUpperCase() != 'BODY') {
                    (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(n) : Ext.EventManager.removeAll(n);

                    var cache = Ext.cache,
                        id = n.id;

                    if (cache[id]) {
                        delete cache[id].dom;
                        delete cache[id];
                    }

                    n.parentNode.removeChild(n);
                }
            },

        isStrict: isStrict,

        
        isIEQuirks: isIE && (!isStrict && (isIE6 || isIE7 || isIE8 || isIE9)),

        
        isOpera : isOpera,

        
        isOpera10_5 : isOpera10_5,

        
        isWebKit : isWebKit,

        
        isChrome : isChrome,

        
        isSafari : isSafari,

        
        isSafari3 : isSafari3,

        
        isSafari4 : isSafari4,

        
        isSafari5 : isSafari5,

        
        isSafari5_0 : isSafari5_0,


        
        isSafari2 : isSafari2,

        
        isIE : isIE,

        
        isIE6 : isIE6,

        
        isIE7 : isIE7,

        
        isIE7m : isIE6 || isIE7,

        
        isIE7p : isIE && !isIE6,

        
        isIE8 : isIE8,

        
        isIE8m : isIE6 || isIE7 || isIE8,

        
        isIE8p : isIE && !(isIE6 || isIE7),

        
        isIE9 : isIE9,

        
        isIE9m : isIE6 || isIE7 || isIE8 || isIE9,

        
        isIE9p : isIE && !(isIE6 || isIE7 || isIE8),
        
        
        isIE10 : isIE10, 
 
        
        isIE10m : isIE6 || isIE7 || isIE8 || isIE9 || isIE10,
 
        
        isIE10p : isIE && !(isIE6 || isIE7 || isIE8 || isIE9),

        
        isGecko : isGecko,

        
        isGecko3 : isGecko3,

        
        isGecko4 : isGecko4,

        
        isGecko5 : isGecko5,

        
        isGecko10 : isGecko10,

        
        isFF3_0 : isFF3_0,

        
        isFF3_5 : isFF3_5,

        
        isFF3_6 : isFF3_6,

        
        isFF4 : 4 <= firefoxVersion && firefoxVersion < 5,

        
        isFF5 : 5 <= firefoxVersion && firefoxVersion < 6,

        
        isFF10 : 10 <= firefoxVersion && firefoxVersion < 11,

        
        isLinux : isLinux,

        
        isWindows : isWindows,

        
        isMac : isMac,

        
        chromeVersion: chromeVersion,

        
        firefoxVersion: firefoxVersion,

        
        ieVersion: ieVersion,

        
        operaVersion: operaVersion,

        
        safariVersion: safariVersion,

        
        webKitVersion: webKitVersion,

        
        isSecure: isSecure,

        
        BLANK_IMAGE_URL : (isIE6 || isIE7) ? '/' + '/www.sencha.com/s.gif' : 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',

        
        value : function(v, defaultValue, allowBlank){
            return Ext.isEmpty(v, allowBlank) ? defaultValue : v;
        },

        
        escapeRe : function(s) {
            return s.replace(/([-.*+?\^${}()|\[\]\/\\])/g, "\\$1");
        },

        
        addBehaviors : function(o){
            if(!Ext.isReady){
                Ext.onReady(function(){
                    Ext.addBehaviors(o);
                });
            } else {
                var cache = {}, 
                    parts,
                    b,
                    s;
                for (b in o) {
                    if ((parts = b.split('@'))[1]) { 
                        s = parts[0];
                        if(!cache[s]){
                            cache[s] = Ext.select(s);
                        }
                        cache[s].on(parts[1], o[b]);
                    }
                }
                cache = null;
            }
        },

        
        getScrollbarSize: function (force) {
            if (!Ext.isReady) {
                return {};
            }

            if (force || !scrollbarSize) {
                var db = document.body,
                    div = document.createElement('div');

                div.style.width = div.style.height = '100px';
                div.style.overflow = 'scroll';
                div.style.position = 'absolute';

                db.appendChild(div); 

                
                scrollbarSize = {
                    width: div.offsetWidth - div.clientWidth,
                    height: div.offsetHeight - div.clientHeight
                };

                db.removeChild(div);
            }

            return scrollbarSize;
        },

        
        getScrollBarWidth: function(force){
            var size = Ext.getScrollbarSize(force);
            return size.width + 2; 
        },

        
        copyTo : function(dest, source, names, usePrototypeKeys){
            if(typeof names == 'string'){
                names = names.split(/[,;\s]/);
            }

            var n,
                nLen = names? names.length : 0,
                name;

            for(n = 0; n < nLen; n++) {
                name = names[n];

                if(usePrototypeKeys || source.hasOwnProperty(name)){
                    dest[name] = source[name];
                }
            }

            return dest;
        },

        
        destroyMembers : function(o){
            for (var i = 1, a = arguments, len = a.length; i < len; i++) {
                Ext.destroy(o[a[i]]);
                delete o[a[i]];
            }
        },

        
        log :
            nullLog,

        
        partition : function(arr, truth){
            var ret = [[],[]],
                a, v,
                aLen = arr.length;

            for (a = 0; a < aLen; a++) {
                v = arr[a];
                ret[ (truth && truth(v, a, arr)) || (!truth && v) ? 0 : 1].push(v);
            }

            return ret;
        },

        
        invoke : function(arr, methodName){
            var ret  = [],
                args = Array.prototype.slice.call(arguments, 2),
                a, v,
                aLen = arr.length;

            for (a = 0; a < aLen; a++) {
                v = arr[a];

                if (v && typeof v[methodName] == 'function') {
                    ret.push(v[methodName].apply(v, args));
                } else {
                    ret.push(undefined);
                }
            }

            return ret;
        },

        
        zip : function(){
            var parts = Ext.partition(arguments, function( val ){ return typeof val != 'function'; }),
                arrs = parts[0],
                fn = parts[1][0],
                len = Ext.max(Ext.pluck(arrs, "length")),
                ret = [],
                i,
                j,
                aLen;

            for (i = 0; i < len; i++) {
                ret[i] = [];
                if(fn){
                    ret[i] = fn.apply(fn, Ext.pluck(arrs, i));
                }else{
                    for (j = 0, aLen = arrs.length; j < aLen; j++){
                        ret[i].push( arrs[j][i] );
                    }
                }
            }
            return ret;
        },

        
        toSentence: function(items, connector) {
            var length = items.length,
                head,
                tail;

            if (length <= 1) {
                return items[0];
            } else {
                head = items.slice(0, length - 1);
                tail = items[length - 1];

                return Ext.util.Format.format("{0} {1} {2}", head.join(", "), connector || 'and', tail);
            }
        },

        
        setGlyphFontFamily: function(fontFamily) {
            Ext._glyphFontFamily = fontFamily;
        },

        
        useShims: isIE6
    });
}());


Ext.application = function(config) {
    var App, paths, ns;
    
    if (typeof config === "string") {
        Ext.require(config, function(){
            App = Ext.ClassManager.get(config);
        });
    }
    else {
        
        
        Ext.Loader.setPath(config.name, config.appFolder || 'app');
        
        if (paths = config.paths) {
            for (ns in paths) {
                if (paths.hasOwnProperty(ns)) {
                    Ext.Loader.setPath(ns, paths[ns]);
                }
            }
        }
        
        config['paths processed'] = true;
        
        
        
        Ext.define(config.name + ".$application", Ext.apply({
                extend: 'Ext.app.Application' 
            }, config),
            
            function () {
                App = this;
            });
    }

    Ext.onReady(function() {
        
        
        Ext.app.Application.instance = new App();
    });
};






(function() {
    Ext.ns('Ext.util');

    var UtilFormat     = Ext.util.Format = {},
        stripTagsRE    = /<\/?[^>]+>/gi,
        stripScriptsRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        nl2brRe        = /\r?\n/g,
        allHashes      = /^#+$/,

        
        formatPattern = /[\d,\.#]+/,

        
        formatCleanRe  = /[^\d\.#]/g,

        
        
        I18NFormatCleanRe,

        
        formatFns = {};

    Ext.apply(UtilFormat, {
        
        
        thousandSeparator: ',',
        

        
        
        decimalSeparator: '.',
        

        
        
        currencyPrecision: 2,
        

         
        
        currencySign: '$',
        

        
        
        currencyAtEnd: false,
        

        
        undef : function(value) {
            return value !== undefined ? value : "";
        },

        
        defaultValue : function(value, defaultValue) {
            return value !== undefined && value !== '' ? value : defaultValue;
        },

        
        substr : 'ab'.substr(-1) != 'b'
        ? function (value, start, length) {
            var str = String(value);
            return (start < 0)
                ? str.substr(Math.max(str.length + start, 0), length)
                : str.substr(start, length);
        }
        : function(value, start, length) {
            return String(value).substr(start, length);
        },

        
        lowercase : function(value) {
            return String(value).toLowerCase();
        },

        
        uppercase : function(value) {
            return String(value).toUpperCase();
        },

        
        usMoney : function(v) {
            return UtilFormat.currency(v, '$', 2);
        },

        
        currency: function(v, currencySign, decimals, end) {
            var negativeSign = '',
                format = ",0",
                i = 0;
            v = v - 0;
            if (v < 0) {
                v = -v;
                negativeSign = '-';
            }
            decimals = Ext.isDefined(decimals) ? decimals : UtilFormat.currencyPrecision;
            format += (decimals > 0 ? '.' : '');
            for (; i < decimals; i++) {
                format += '0';
            }
            v = UtilFormat.number(v, format);
            if ((end || UtilFormat.currencyAtEnd) === true) {
                return Ext.String.format("{0}{1}{2}", negativeSign, v, currencySign || UtilFormat.currencySign);
            } else {
                return Ext.String.format("{0}{1}{2}", negativeSign, currencySign || UtilFormat.currencySign, v);
            }
        },

        
        date: function(v, format) {
            if (!v) {
                return "";
            }
            if (!Ext.isDate(v)) {
                v = new Date(Date.parse(v));
            }
            return Ext.Date.dateFormat(v, format || Ext.Date.defaultFormat);
        },

        
        dateRenderer : function(format) {
            return function(v) {
                return UtilFormat.date(v, format);
            };
        },

        
        stripTags : function(v) {
            return !v ? v : String(v).replace(stripTagsRE, "");
        },

        
        stripScripts : function(v) {
            return !v ? v : String(v).replace(stripScriptsRe, "");
        },

        
        fileSize : (function(){
            var byteLimit = 1024,
                kbLimit = 1048576,
                mbLimit = 1073741824;
                
            return function(size) {
                var out;
                if (size < byteLimit) {
                    if (size === 1) {
                        out = '1 byte';    
                    } else {
                        out = size + ' bytes';
                    }
                } else if (size < kbLimit) {
                    out = (Math.round(((size*10) / byteLimit))/10) + ' KB';
                } else if (size < mbLimit) {
                    out = (Math.round(((size*10) / kbLimit))/10) + ' MB';
                } else {
                    out = (Math.round(((size*10) / mbLimit))/10) + ' GB';
                }
                return out;
            };
        })(),

        
        math : (function(){
            var fns = {};

            return function(v, a){
                if (!fns[a]) {
                    fns[a] = Ext.functionFactory('v', 'return v ' + a + ';');
                }
                return fns[a](v);
            };
        }()),

        
        round : function(value, precision) {
            var result = Number(value);
            if (typeof precision == 'number') {
                precision = Math.pow(10, precision);
                result = Math.round(value * precision) / precision;
            }
            return result;
        },

        
        number : function(v, formatString) {
            if (!formatString) {
                return v;
            }
            var formatFn = formatFns[formatString];

            
            
            if (!formatFn) {

                var originalFormatString = formatString,
                    comma = UtilFormat.thousandSeparator,
                    decimalSeparator = UtilFormat.decimalSeparator,
                    hasComma,
                    splitFormat,
                    extraChars,
                    precision = 0,
                    multiplier,
                    trimTrailingZeroes,
                    code;

                
                
                
                
                if (formatString.substr(formatString.length - 2) == '/i') {
                    if (!I18NFormatCleanRe) {
                        I18NFormatCleanRe = new RegExp('[^\\d\\' + UtilFormat.decimalSeparator + ']','g');
                    }
                    formatString = formatString.substr(0, formatString.length - 2);
                    hasComma = formatString.indexOf(comma) != -1;
                    splitFormat = formatString.replace(I18NFormatCleanRe, '').split(decimalSeparator);
                } else {
                    hasComma = formatString.indexOf(',') != -1;
                    splitFormat = formatString.replace(formatCleanRe, '').split('.');
                }
                extraChars = formatString.replace(formatPattern, '');

                if (splitFormat.length > 2) {
                } else if (splitFormat.length === 2) {
                    precision = splitFormat[1].length;

                    
                    trimTrailingZeroes = allHashes.test(splitFormat[1]);
                }
                
                
                code = [
                    'var utilFormat=Ext.util.Format,extNumber=Ext.Number,neg,fnum,parts' +
                        (hasComma ? ',thousandSeparator,thousands=[],j,n,i' : '') +
                        (extraChars  ? ',formatString="' + formatString + '",formatPattern=/[\\d,\\.#]+/' : '') +
                        (trimTrailingZeroes ? ',trailingZeroes=/\\.?0+$/;' : ';') +
                    'return function(v){' +
                    'if(typeof v!=="number"&&isNaN(v=extNumber.from(v,NaN)))return"";' +
                    'neg=v<0;',
                    'fnum=Ext.Number.toFixed(Math.abs(v), ' + precision + ');'
                ];

                if (hasComma) {
                    
                    
                    
                    if (precision) {
                        code[code.length] = 'parts=fnum.split(".");';
                        code[code.length] = 'fnum=parts[0];';
                    }
                    code[code.length] =
                        'if(v>=1000) {';
                            code[code.length] = 'thousandSeparator=utilFormat.thousandSeparator;' +
                            'thousands.length=0;' +
                            'j=fnum.length;' +
                            'n=fnum.length%3||3;' +
                            'for(i=0;i<j;i+=n){' +
                                'if(i!==0){' +
                                    'n=3;' +
                                '}' +
                                'thousands[thousands.length]=fnum.substr(i,n);' +
                            '}' +
                            'fnum=thousands.join(thousandSeparator);' + 
                        '}';
                    if (precision) {
                        code[code.length] = 'fnum += utilFormat.decimalSeparator+parts[1];';
                    }
                    
                } else if (precision) {
                    
                    code[code.length] = 'if(utilFormat.decimalSeparator!=="."){' +
                        'parts=fnum.split(".");' +
                        'fnum=parts[0]+utilFormat.decimalSeparator+parts[1];' +
                    '}';
                }

                if (trimTrailingZeroes) {
                    code[code.length] = 'fnum=fnum.replace(trailingZeroes,"");';
                }

                
                code[code.length] = 'if(neg&&fnum!=="' + (precision ? '0.' + Ext.String.repeat('0', precision) : '0') + '")fnum="-"+fnum;';

                code[code.length] = 'return ';

                
                if (extraChars) {
                    code[code.length] = 'formatString.replace(formatPattern, fnum);';
                } else {
                    code[code.length] = 'fnum;';
                }
                code[code.length] = '};'

                formatFn = formatFns[originalFormatString] = Ext.functionFactory('Ext', code.join(''))(Ext);
            }
            return formatFn(v);
        },

        
        numberRenderer : function(format) {
            return function(v) {
                return UtilFormat.number(v, format);
            };
        },

        
        attributes: function(attributes) {
            if (typeof attributes === 'object') {
                var result = [],
                    name;

                for (name in attributes) {
                    result.push(name, '="', name === 'style' ? Ext.DomHelper.generateStyles(attributes[name]) : Ext.htmlEncode(attributes[name]), '"');
                }
                attributes = result.join('');
            }
            return attributes||'';
        },

        
        plural : function(v, s, p) {
            return v +' ' + (v == 1 ? s : (p ? p : s+'s'));
        },

        
        nl2br : function(v) {
            return Ext.isEmpty(v) ? '' : v.replace(nl2brRe, '<br/>');
        },

        
        capitalize: Ext.String.capitalize,

        
        ellipsis: Ext.String.ellipsis,

        
        format: Ext.String.format,

        
        htmlDecode: Ext.String.htmlDecode,

        
        htmlEncode: Ext.String.htmlEncode,

        
        leftPad: Ext.String.leftPad,

        
        trim : Ext.String.trim,

        
        parseBox : function(box) {
            box = box || 0;

            if (typeof box === 'number') {
                return {
                    top   : box,
                    right : box,
                    bottom: box,
                    left  : box
                };
             }

            var parts  = box.split(' '),
                ln = parts.length;

            if (ln == 1) {
                parts[1] = parts[2] = parts[3] = parts[0];
            }
            else if (ln == 2) {
                parts[2] = parts[0];
                parts[3] = parts[1];
            }
            else if (ln == 3) {
                parts[3] = parts[1];
            }

            return {
                top   :parseInt(parts[0], 10) || 0,
                right :parseInt(parts[1], 10) || 0,
                bottom:parseInt(parts[2], 10) || 0,
                left  :parseInt(parts[3], 10) || 0
            };
        },

        
        escapeRegex : function(s) {
            return s.replace(/([\-.*+?\^${}()|\[\]\/\\])/g, "\\$1");
        }
    });
}());





Ext.define('Ext.util.TaskRunner', {
    

    
    interval: 10,

    
    timerId: null,

    constructor: function (interval) {
        var me = this;

        if (typeof interval == 'number') {
            me.interval = interval;
        } else if (interval) {
            Ext.apply(me, interval);
        }

        me.tasks = [];
        me.timerFn = Ext.Function.bind(me.onTick, me);
    },

    
    newTask: function (config) {
        var task = new Ext.util.TaskRunner.Task(config);
        task.manager = this;
        return task;
    },

    
    start: function(task) {
        var me = this,
            now = Ext.Date.now();

        if (!task.pending) {
            me.tasks.push(task);
            task.pending = true; 
        }

        task.stopped = false; 
        task.taskStartTime = now;
        task.taskRunTime = task.fireOnStart !== false ? 0 : task.taskStartTime;
        task.taskRunCount = 0;

        if (!me.firing) {
            if (task.fireOnStart !== false) {
                me.startTimer(0, now);
            } else {
                me.startTimer(task.interval, now);
            }
        }

        return task;
    },

    
    stop: function(task) {
        
        
        
        if (!task.stopped) {
            task.stopped = true;

            if (task.onStop) {
                task.onStop.call(task.scope || task, task);
            }
        }

        return task;
    },

    
    stopAll: function() {
        
        Ext.each(this.tasks, this.stop, this);
    },

    

    firing: false,

    nextExpires: 1e99,

    
    onTick: function () {
        var me = this,
            tasks = me.tasks,
            now = Ext.Date.now(),
            nextExpires = 1e99,
            len = tasks.length,
            expires, newTasks, i, task, rt, remove;

        me.timerId = null;
        me.firing = true; 

        
        
        
        
        for (i = 0; i < len || i < (len = tasks.length); ++i) {
            task = tasks[i];

            if (!(remove = task.stopped)) {
                expires = task.taskRunTime + task.interval;

                if (expires <= now) {
                    rt = 1; 
                    try {
                        rt = task.run.apply(task.scope || task, task.args || [++task.taskRunCount]);
                    } catch (taskError) {
                        try {
                            if (task.onError) {
                                rt = task.onError.call(task.scope || task, task, taskError);
                            }
                        } catch (ignore) { }
                        }
                    task.taskRunTime = now;
                    if (rt === false || task.taskRunCount === task.repeat) {
                        me.stop(task);
                        remove = true;
                    } else {
                        remove = task.stopped; 
                        expires = now + task.interval;
                    }
                }

                if (!remove && task.duration && task.duration <= (now - task.taskStartTime)) {
                    me.stop(task);
                    remove = true;
                }
            }

            if (remove) {
                task.pending = false; 

                
                
                
                
                
                if (!newTasks) {
                    newTasks = tasks.slice(0, i);
                    
                    
                    
                }
            } else {
                if (newTasks) {
                    newTasks.push(task); 
                }

                if (nextExpires > expires) {
                    nextExpires = expires; 
                }
            }
        }

        if (newTasks) {
            
            
            me.tasks = newTasks;
        }

        me.firing = false; 

        if (me.tasks.length) {
            
            
            
            me.startTimer(nextExpires - now, Ext.Date.now());
        }
        
        
        if (me.fireIdleEvent !== false) {
            Ext.EventManager.idleEvent.fire();
        }
   },

    
    startTimer: function (timeout, now) {
        var me = this,
            expires = now + timeout,
            timerId = me.timerId;

        
        
        if (timerId && me.nextExpires - expires > me.interval) {
            clearTimeout(timerId);
            timerId = null;
        }

        if (!timerId) {
            if (timeout < me.interval) {
                timeout = me.interval;
            }

            me.timerId = setTimeout(me.timerFn, timeout);
            me.nextExpires = expires;
        }
    }
},
function () {
    var me = this,
        proto = me.prototype;

    
    proto.destroy = proto.stopAll;

    
    Ext.util.TaskManager = Ext.TaskManager = new me();

    
    me.Task = new Ext.Class({
        isTask: true,

        
        stopped: true, 

        
        fireOnStart: false,

        constructor: function (config) {
            Ext.apply(this, config);
        },

        
        restart: function (interval) {
            if (interval !== undefined) {
                this.interval = interval;
            }

            this.manager.start(this);
        },

        
        start: function (interval) {
            if (this.stopped) {
                this.restart(interval);
            }
        },

        
        stop: function () {
            this.manager.stop(this);
        }
    });

    proto = me.Task.prototype;

    
    proto.destroy = proto.stop;
});












Ext.define('Ext.util.TaskManager', {
    extend:  Ext.util.TaskRunner ,

    alternateClassName: [
        'Ext.TaskManager'
    ],

    singleton: true
});





Ext.define('Ext.perf.Accumulator', (function () {
    var currentFrame = null,
        khrome = Ext.global['chrome'],
        formatTpl,
        
        
        getTimestamp = function () {

            getTimestamp = function () {
                return new Date().getTime();
            };
            
            var interval, toolbox;

            
            if (Ext.isChrome && khrome && khrome.Interval) {
                interval = new khrome.Interval();
                interval.start();
                getTimestamp = function () {
                    return interval.microseconds() / 1000;
                };
            } else if (window.ActiveXObject) {
                try {
                    
                    toolbox = new ActiveXObject('SenchaToolbox.Toolbox');
                    Ext.senchaToolbox = toolbox; 
                    getTimestamp = function () {
                        return toolbox.milliseconds;
                    };
                } catch (e) {
                    
                }
            } else if (Date.now) {
                getTimestamp = Date.now;
            }

            Ext.perf.getTimestamp = Ext.perf.Accumulator.getTimestamp = getTimestamp;
            return getTimestamp();
        };

    function adjustSet (set, time) {
        set.sum += time;
        set.min = Math.min(set.min, time);
        set.max = Math.max(set.max, time);
    }

    function leaveFrame (time) {
        var totalTime = time ? time : (getTimestamp() - this.time), 
            me = this, 
            accum = me.accum;

        ++accum.count;
        if (! --accum.depth) {
            adjustSet(accum.total, totalTime);
        }
        adjustSet(accum.pure, totalTime - me.childTime);

        currentFrame = me.parent;
        if (currentFrame) {
            ++currentFrame.accum.childCount;
            currentFrame.childTime += totalTime;
        }
    }

    function makeSet () {
        return {
            min: Number.MAX_VALUE,
            max: 0,
            sum: 0
        };
    }

    function makeTap (me, fn) {
        return function () {
            var frame = me.enter(),
                ret = fn.apply(this, arguments);

            frame.leave();
            return ret;
        };
    }

    function round (x) {
        return Math.round(x * 100) / 100;
    }

    function setToJSON (count, childCount, calibration, set) {
        var data = {
            avg: 0,
            min: set.min,
            max: set.max,
            sum: 0
        };

        if (count) {
            calibration = calibration || 0;
            data.sum = set.sum - childCount * calibration;
            data.avg = data.sum / count;
            
            
        }

        return data;
    }

    return {
        constructor: function (name) {
            var me = this;

            me.count = me.childCount = me.depth = me.maxDepth = 0;
            me.pure = makeSet();
            me.total = makeSet();
            me.name = name;
        },

        statics: {
            getTimestamp: getTimestamp
        },

        format: function (calibration) {
            if (!formatTpl) {
                formatTpl = new Ext.XTemplate([
                        '{name} - {count} call(s)',
                        '<tpl if="count">',
                            '<tpl if="childCount">',
                                ' ({childCount} children)',
                            '</tpl>',
                            '<tpl if="depth - 1">',
                                ' ({depth} deep)',
                            '</tpl>',
                            '<tpl for="times">',
                                ', {type}: {[this.time(values.sum)]} msec (',
                                     
                                     'avg={[this.time(values.sum / parent.count)]}',
                                     
                                     ')',
                            '</tpl>',
                        '</tpl>'
                    ].join(''), {
                        time: function (t) {
                            return Math.round(t * 100) / 100;
                        }
                    });
            }

            var data = this.getData(calibration);
            data.name = this.name;
            data.pure.type = 'Pure';
            data.total.type = 'Total';
            data.times = [data.pure, data.total];
            return formatTpl.apply(data);
        },

        getData: function (calibration) {
            var me = this;

            return {
                count: me.count,
                childCount: me.childCount,
                depth: me.maxDepth,
                pure: setToJSON(me.count, me.childCount, calibration, me.pure),
                total: setToJSON(me.count, me.childCount, calibration, me.total)
            };
        },

        enter: function () {
            var me = this,
                frame = {
                    accum: me,
                    leave: leaveFrame,
                    childTime: 0,
                    parent: currentFrame
                };

            ++me.depth;
            if (me.maxDepth < me.depth) {
                me.maxDepth = me.depth;
            }

            currentFrame = frame;
            frame.time = getTimestamp(); 
            return frame;
        },

        monitor: function (fn, scope, args) {
            var frame = this.enter();
            if (args) {
                fn.apply(scope, args);
            } else {
                fn.call(scope);
            }
            frame.leave();
        },

        report: function () {
            Ext.log(this.format());
        },

        tap: function (className, methodName) {
            var me = this,
                methods = typeof methodName == 'string' ? [methodName] : methodName,
                klass, statik, i, parts, length, name, src,
                tapFunc;

            tapFunc = function(){
                if (typeof className == 'string') {
                    klass = Ext.global;
                    parts = className.split('.');
                    for (i = 0, length = parts.length; i < length; ++i) {
                        klass = klass[parts[i]];
                    }
                } else {
                    klass = className;
                }

                for (i = 0, length = methods.length; i < length; ++i) {
                    name = methods[i];
                    statik = name.charAt(0) == '!';

                    if (statik) {
                        name = name.substring(1);
                    } else {
                        statik = !(name in klass.prototype);
                    }

                    src = statik ? klass : klass.prototype;
                    src[name] = makeTap(me, src[name]);
                }
            };

            Ext.ClassManager.onCreated(tapFunc, me, className);

            return me;
        }
    };
}()),

function () {
    Ext.perf.getTimestamp = this.getTimestamp;
});





Ext.define('Ext.perf.Monitor', {
    singleton: true,
    alternateClassName: 'Ext.Perf',

               
                              
      

    constructor: function () {
        this.accumulators = [];
        this.accumulatorsByName = {};
    },

    calibrate: function () {
        var accum = new Ext.perf.Accumulator('$'),
            total = accum.total,
            getTimestamp = Ext.perf.Accumulator.getTimestamp,
            count = 0,
            frame,
            endTime,
            startTime;

        startTime = getTimestamp();

        do {
            frame = accum.enter();
            frame.leave();
            ++count;
        } while (total.sum < 100);

        endTime = getTimestamp();

        return (endTime - startTime) / count;
    },

    get: function (name) {
        var me = this,
            accum = me.accumulatorsByName[name];

        if (!accum) {
            me.accumulatorsByName[name] = accum = new Ext.perf.Accumulator(name);
            me.accumulators.push(accum);
        }

        return accum;
    },

    enter: function (name) {
        return this.get(name).enter();
    },

    monitor: function (name, fn, scope) {
        this.get(name).monitor(fn, scope);
    },

    report: function () {
        var me = this,
            accumulators = me.accumulators,
            calibration = me.calibrate();

        accumulators.sort(function (a, b) {
            return (a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0);
        });

        me.updateGC();

        Ext.log('Calibration: ' + Math.round(calibration * 100) / 100 + ' msec/sample');
        Ext.each(accumulators, function (accum) {
            Ext.log(accum.format(calibration));
        });
    },

    getData: function (all) {
        var ret = {},
            accumulators = this.accumulators;

        Ext.each(accumulators, function (accum) {
            if (all || accum.count) {
                ret[accum.name] = accum.getData();
            }
        });

        return ret;
    },

    reset: function(){
        Ext.each(this.accumulators, function(accum){
            var me = accum;
            me.count = me.childCount = me.depth = me.maxDepth = 0;
            me.pure = {
                min: Number.MAX_VALUE,
                max: 0,
                sum: 0
            };
            me.total = {
                min: Number.MAX_VALUE,
                max: 0,
                sum: 0
            };
        });
    },

    updateGC: function () {
        var accumGC = this.accumulatorsByName.GC,
            toolbox = Ext.senchaToolbox,
            bucket;

        if (accumGC) {
            accumGC.count = toolbox.garbageCollectionCounter || 0;

            if (accumGC.count) {
                bucket = accumGC.pure;
                accumGC.total.sum = bucket.sum = toolbox.garbageCollectionMilliseconds;
                bucket.min = bucket.max = bucket.sum / accumGC.count;
                bucket = accumGC.total;
                bucket.min = bucket.max = bucket.sum / accumGC.count;
            }
        }
    },

    watchGC: function () {
        Ext.perf.getTimestamp(); 

        var toolbox = Ext.senchaToolbox;

        if (toolbox) {
            this.get("GC");
            toolbox.watchGarbageCollector(false); 
        }
    },

    setup: function (config) {
        if (!config) {
            config = {
                
                






                render: {
                    'Ext.AbstractComponent': 'render'
                },

































                layout: {
                    'Ext.layout.Context': 'run'
                }
            };
        }

        this.currentConfig = config;

        var key, prop,
            accum, className, methods;
        for (key in config) {
            if (config.hasOwnProperty(key)) {
                prop = config[key];
                accum = Ext.Perf.get(key);

                for (className in prop) {
                    if (prop.hasOwnProperty(className)) {
                        methods = prop[className];
                        accum.tap(className, methods);
                    }
                }
            }
        }

        this.watchGC();
    }
});






Ext.is = {
    init : function(navigator) {
        var platforms = this.platforms,
            ln = platforms.length,
            i, platform;

        navigator = navigator || window.navigator;

        for (i = 0; i < ln; i++) {
            platform = platforms[i];
            this[platform.identity] = platform.regex.test(navigator[platform.property]);
        }

        
        this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
        
        this.Tablet = this.iPad;
        
        this.Phone = !this.Desktop && !this.Tablet;
        
        this.iOS = this.iPhone || this.iPad || this.iPod;
        
        
        this.Standalone = !!window.navigator.standalone;
    },
    
    
    platforms: [{
        property: 'platform',
        regex: /iPhone/i,
        identity: 'iPhone'
    },
    
    
    {
        property: 'platform',
        regex: /iPod/i,
        identity: 'iPod'
    },
    
    
    {
        property: 'userAgent',
        regex: /iPad/i,
        identity: 'iPad'
    },
    
    
    {
        property: 'userAgent',
        regex: /Blackberry/i,
        identity: 'Blackberry'
    },
    
    
    {
        property: 'userAgent',
        regex: /Android/i,
        identity: 'Android'
    },
    
    
    {
        property: 'platform',
        regex: /Mac/i,
        identity: 'Mac'
    },
    
    
    {
        property: 'platform',
        regex: /Win/i,
        identity: 'Windows'
    },
    
    
    {
        property: 'platform',
        regex: /Linux/i,
        identity: 'Linux'
    }]
};

Ext.is.init();


(function(){

    
    
    
    var getStyle = function(element, styleName){
        var view = element.ownerDocument.defaultView,
            style = (view ? view.getComputedStyle(element, null) : element.currentStyle) || element.style;
        return style[styleName];
    },
    supportsVectors = {
        'IE6-quirks':  [0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0],
        'IE6-strict':  [0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0],
        'IE7-quirks':  [0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0],
        'IE7-strict':  [0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1,0,0,1,0,1,0,0,0],
        'IE8-quirks':  [0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0],
        'IE8-strict':  [0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,1,0,1,0,0,1],
        'IE9-quirks':  [0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0],
        'IE9-strict':  [0,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,1],
        'IE10-quirks': [1,1,0,0,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,0,1],
        'IE10-strict': [1,1,0,0,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,0,1]
    };

function getBrowserKey() {
    var browser = Ext.isIE6 ? 'IE6' : Ext.isIE7 ? 'IE7' : Ext.isIE8 ? 'IE8' :
        Ext.isIE9 ? 'IE9': Ext.isIE10 ? 'IE10' : '';

    return browser ? browser + (Ext.isStrict ? '-strict' : '-quirks') : '';
}

Ext.supports = {
    
    init : function() {
        var me = this,
            doc = document,
            toRun = me.toRun || me.tests,
            n = toRun.length,
            div = n && Ext.isReady && doc.createElement('div'),
            notRun = [],
            browserKey = getBrowserKey(),
            test, vector, value;

        if (div) {
            div.innerHTML = [
                '<div style="height:30px;width:50px;">',
                    '<div style="height:20px;width:20px;"></div>',
                '</div>',
                '<div style="width: 200px; height: 200px; position: relative; padding: 5px;">',
                    '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>',
                '</div>',
                '<div style="position: absolute; left: 10%; top: 10%;"></div>',
                '<div style="float:left; background-color:transparent;"></div>'
            ].join('');

            doc.body.appendChild(div);
        }

        vector = supportsVectors[browserKey];
        while (n--) {
            test = toRun[n];
            value = vector && vector[n];
            if (value !== undefined) {
                me[test.identity] = value;
            } else if (div || test.early) {
                me[test.identity] = test.fn.call(me, doc, div);
            } else {
                notRun.push(test);
            }
        }

        if (div) {
            doc.body.removeChild(div);
        }

        me.toRun = notRun;
    },


    
    PointerEvents: 'pointerEvents' in document.documentElement.style,

    
    
    
    LocalStorage: (function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    })(),

    
    CSS3BoxShadow: 'boxShadow' in document.documentElement.style || 'WebkitBoxShadow' in document.documentElement.style || 'MozBoxShadow' in document.documentElement.style,

    
    ClassList: !!document.documentElement.classList,

    
    OrientationChange: ((typeof window.orientation != 'undefined') && ('onorientationchange' in window)),

    
    DeviceMotion: ('ondevicemotion' in window),

    
    
    
    Touch: ('ontouchstart' in window) && (!Ext.is.Desktop),

    
    TimeoutActualLateness: (function(){
        setTimeout(function(){
            Ext.supports.TimeoutActualLateness = arguments.length !== 0;
        }, 0);
    }()),

    tests: [
        
        {
            identity: 'Transitions',
            fn: function(doc, div) {
                var prefix = [
                        'webkit',
                        'Moz',
                        'o',
                        'ms',
                        'khtml'
                    ],
                    TE = 'TransitionEnd',
                    transitionEndName = [
                        prefix[0] + TE,
                        'transitionend', 
                        prefix[2] + TE,
                        prefix[3] + TE,
                        prefix[4] + TE
                    ],
                    ln = prefix.length,
                    i = 0,
                    out = false;

                for (; i < ln; i++) {
                    if (getStyle(div, prefix[i] + "TransitionProperty")) {
                        Ext.supports.CSS3Prefix = prefix[i];
                        Ext.supports.CSS3TransitionEnd = transitionEndName[i];
                        out = true;
                        break;
                    }
                }
                return out;
            }
        },

        
        {
            identity: 'RightMargin',
            fn: function(doc, div) {
                var view = doc.defaultView;
                return !(view && view.getComputedStyle(div.firstChild.firstChild, null).marginRight != '0px');
            }
        },

        
        {
            identity: 'DisplayChangeInputSelectionBug',
            early: true,
            fn: function() {
                var webKitVersion = Ext.webKitVersion;
                
                return 0 < webKitVersion && webKitVersion < 533;
            }
        },

        
        {
            identity: 'DisplayChangeTextAreaSelectionBug',
            early: true,
            fn: function() {
                var webKitVersion = Ext.webKitVersion;

                
                return 0 < webKitVersion && webKitVersion < 534.24;
            }
        },

        
        {
            identity: 'TransparentColor',
            fn: function(doc, div, view) {
                view = doc.defaultView;
                return !(view && view.getComputedStyle(div.lastChild, null).backgroundColor != 'transparent');
            }
        },

        
        {
            identity: 'ComputedStyle',
            fn: function(doc, div, view) {
                view = doc.defaultView;
                return view && view.getComputedStyle;
            }
        },

        
        {
            identity: 'Svg',
            fn: function(doc) {
                return !!doc.createElementNS && !!doc.createElementNS( "http:/" + "/www.w3.org/2000/svg", "svg").createSVGRect;
            }
        },

        
        {
            identity: 'Canvas',
            fn: function(doc) {
                return !!doc.createElement('canvas').getContext;
            }
        },

        
        {
            identity: 'Vml',
            fn: function(doc) {
                var d = doc.createElement("div");
                d.innerHTML = "<!--[if vml]><br/><br/><![endif]-->";
                return (d.childNodes.length == 2);
            }
        },

        
        {
            identity: 'Float',
            fn: function(doc, div) {
                return !!div.lastChild.style.cssFloat;
            }
        },

        
        {
            identity: 'AudioTag',
            fn: function(doc) {
                return !!doc.createElement('audio').canPlayType;
            }
        },

        
        {
            identity: 'History',
            fn: function() {
                var history = window.history;
                return !!(history && history.pushState);
            }
        },

        
        {
            identity: 'CSS3DTransform',
            fn: function() {
                return (typeof WebKitCSSMatrix != 'undefined' && new WebKitCSSMatrix().hasOwnProperty('m41'));
            }
        },

		
        {
            identity: 'CSS3LinearGradient',
            fn: function(doc, div) {
                var property = 'background-image:',
                    webkit   = '-webkit-gradient(linear, left top, right bottom, from(black), to(white))',
                    w3c      = 'linear-gradient(left top, black, white)',
                    moz      = '-moz-' + w3c,
                    ms       = '-ms-' + w3c,
                    opera    = '-o-' + w3c,
                    options  = [property + webkit, property + w3c, property + moz, property + ms, property + opera];

                div.style.cssText = options.join(';');

                return (("" + div.style.backgroundImage).indexOf('gradient') !== -1) && !Ext.isIE9;
            }
        },

        
        {
            identity: 'CSS3BorderRadius',
            fn: function(doc, div) {
                var domPrefixes = ['borderRadius', 'BorderRadius', 'MozBorderRadius', 'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'],
                    pass = false,
                    i;
                for (i = 0; i < domPrefixes.length; i++) {
                    if (document.body.style[domPrefixes[i]] !== undefined) {
                        return true;
                    }
                }
                return pass;
            }
        },

        
        {
            identity: 'GeoLocation',
            fn: function() {
                
                return (typeof navigator != 'undefined' && 'geolocation' in navigator) || (typeof google != 'undefined' && typeof google.gears != 'undefined');
            }
        },
        
        {
            identity: 'MouseEnterLeave',
            fn: function(doc, div){
                return ('onmouseenter' in div && 'onmouseleave' in div);
            }
        },
        
        {
            identity: 'MouseWheel',
            fn: function(doc, div) {
                return ('onmousewheel' in div);
            }
        },
        
        {
            identity: 'Opacity',
            fn: function(doc, div){
                
                if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
                    return false;
                }
                div.firstChild.style.cssText = 'opacity:0.73';
                return div.firstChild.style.opacity == '0.73';
            }
        },
        
        {
            identity: 'Placeholder',
            fn: function(doc) {
                return 'placeholder' in doc.createElement('input');
            }
        },

        
        {
            identity: 'Direct2DBug',
            fn: function() {
                return Ext.isString(document.body.style.msTransformOrigin) && Ext.isIE10m;
            }
        },
        
        {
            identity: 'BoundingClientRect',
            fn: function(doc, div) {
                return Ext.isFunction(div.getBoundingClientRect);
            }
        },
        
        {
            identity: 'RotatedBoundingClientRect',
            fn: function() {
                var body = document.body,
                    supports = false,
                    el = document.createElement('div'),
                    style = el.style;

                if (el.getBoundingClientRect) {
                    style.WebkitTransform = style.MozTransform =
                        style.OTransform = style.transform = 'rotate(90deg)';
                    style.width = '100px';
                    style.height = '30px';
                    body.appendChild(el)

                    supports = el.getBoundingClientRect().height !== 100;
                    body.removeChild(el);
                }
               
                return supports;
            }
        },
        {
            identity: 'IncludePaddingInWidthCalculation',
            fn: function(doc, div){
                return div.childNodes[1].firstChild.offsetWidth == 210;
            }
        },
        {
            identity: 'IncludePaddingInHeightCalculation',
            fn: function(doc, div){
                return div.childNodes[1].firstChild.offsetHeight == 210;
            }
        },

        
        {
            identity: 'ArraySort',
            fn: function() {
                var a = [1,2,3,4,5].sort(function(){ return 0; });
                return a[0] === 1 && a[1] === 2 && a[2] === 3 && a[3] === 4 && a[4] === 5;
            }
        },
        
        {
            identity: 'Range',
            fn: function() {
                return !!document.createRange;
            }
        },
        
        {
            identity: 'CreateContextualFragment',
            fn: function() {
                var range = Ext.supports.Range ? document.createRange() : false;

                return range && !!range.createContextualFragment;
            }
        },

        
        {
            identity: 'WindowOnError',
            fn: function () {
                
                return Ext.isIE || Ext.isGecko || Ext.webKitVersion >= 534.16; 
            }
        },

        
        {
            identity: 'TextAreaMaxLength',
            fn: function(){
                var el = document.createElement('textarea');
                return ('maxlength' in el);
            }
        },
        
        
        {
            identity: 'GetPositionPercentage',
            fn: function(doc, div){
               return getStyle(div.childNodes[2], 'left') == '10%';
            }
        },
        
        {
            identity: 'PercentageHeightOverflowBug',
            fn: function(doc) {
                var hasBug = false,
                    style, el;

                if (Ext.getScrollbarSize().height) {
                    
                    el = doc.createElement('div');
                    style = el.style;
                    style.height = '50px';
                    style.width = '50px';
                    style.overflow = 'auto';
                    style.position = 'absolute';
                    
                    el.innerHTML = [
                        '<div style="display:table;height:100%;">',
                            
                            
                            
                            '<div style="width:51px;"></div>',
                        '</div>'
                    ].join('');
                    doc.body.appendChild(el);
                    if (el.firstChild.offsetHeight === 50) {
                        hasBug = true;
                    }
                    doc.body.removeChild(el);
                }
                
                return hasBug;
            }
        },
        
        {
            identity: 'xOriginBug',
            fn: function(doc, div) {
               div.innerHTML = '<div id="b1" style="height:100px;width:100px;direction:rtl;position:relative;overflow:scroll">' +
                    '<div id="b2" style="position:relative;width:100%;height:20px;"></div>' +
                    '<div id="b3" style="position:absolute;width:20px;height:20px;top:0px;right:0px"></div>' +
                '</div>';

                var outerBox = document.getElementById('b1').getBoundingClientRect(),
                    b2 = document.getElementById('b2').getBoundingClientRect(),
                    b3 = document.getElementById('b3').getBoundingClientRect();

                return (b2.left !== outerBox.left && b3.right !== outerBox.right);
            }
        },

        
        {
            identity: 'ScrollWidthInlinePaddingBug',
            fn: function(doc) {
                var hasBug = false,
                    style, el;

                el = doc.createElement('div');
                style = el.style;
                style.height = '50px';
                style.width = '50px';
                style.padding = '10px';
                style.overflow = 'hidden';
                style.position = 'absolute';
                
                el.innerHTML =
                    '<span style="display:inline-block;zoom:1;height:60px;width:60px;"></span>';
                doc.body.appendChild(el);
                if (el.scrollWidth === 70) {
                    hasBug = true;
                }
                doc.body.removeChild(el);
                
                return hasBug;
            }
        }
    ]
};
}());

Ext.supports.init(); 






Ext.util.DelayedTask = function(fn, scope, args, cancelOnDelay) {
    var me = this,
        delay,
        call = function() {
            clearInterval(me.id);
            me.id = null;
            fn.apply(scope, args || []);
            Ext.EventManager.idleEvent.fire();
        };

    cancelOnDelay = typeof cancelOnDelay === 'boolean' ? cancelOnDelay : true;

    
    me.id = null;

    
    me.delay = function(newDelay, newFn, newScope, newArgs) {
        if (cancelOnDelay) {
            me.cancel();
        }
        delay = newDelay || delay,
        fn    = newFn    || fn;
        scope = newScope || scope;
        args  = newArgs  || args;
        if (!me.id) {
            me.id = setInterval(call, delay);
        }
    };

    
    me.cancel = function() {
        if (me.id) {
            clearInterval(me.id);
            me.id = null;
        }
    };
};



Ext.define('Ext.util.Event', function() {
  var arraySlice = Array.prototype.slice,
      arrayInsert = Ext.Array.insert,
      toArray = Ext.Array.toArray,
      DelayedTask = Ext.util.DelayedTask;

  return {
                                     

    
    isEvent: true,
    
    
    suspended: 0,

    noOptions: {},

    constructor: function(observable, name) {
        this.name = name;
        this.observable = observable;
        this.listeners = [];
    },

    addListener: function(fn, scope, options) {
        var me = this,
            listeners, listener, priority, isNegativePriority, highestNegativePriorityIndex,
            hasNegativePriorityIndex, length, index, i, listenerPriority;

        scope = scope || me.observable;


        if (!me.isListening(fn, scope)) {
            listener = me.createListener(fn, scope, options);
            if (me.firing) {
                
                me.listeners = me.listeners.slice(0);
            }
            listeners = me.listeners;
            index = length = listeners.length;
            priority = options && options.priority;
            highestNegativePriorityIndex = me._highestNegativePriorityIndex;
            hasNegativePriorityIndex = (highestNegativePriorityIndex !== undefined);
            if (priority) {
                
                
                isNegativePriority = (priority < 0);
                if (!isNegativePriority || hasNegativePriorityIndex) {
                    
                    
                    
                    
                    
                    
                    for(i = (isNegativePriority ? highestNegativePriorityIndex : 0); i < length; i++) {
                        
                        listenerPriority = listeners[i].o ? listeners[i].o.priority||0 : 0;
                        if (listenerPriority < priority) {
                            index = i;
                            break;
                        }
                    }
                } else {
                    
                    
                    
                    me._highestNegativePriorityIndex = index;
                }
            } else if (hasNegativePriorityIndex) {
                
                
                
                
                index = highestNegativePriorityIndex;
            }

            if (!isNegativePriority && index <= highestNegativePriorityIndex) {
                me._highestNegativePriorityIndex ++;
            }
            if (index === length) {
                me.listeners[length] = listener;
            } else {
                arrayInsert(me.listeners, index, [listener]);
            }
        }
    },

    createListener: function(fn, scope, o) {
        scope = scope || this.observable;

        var me = this,
            listener = {
                fn: fn,
                scope: scope,
                ev: me
            },
            handler = fn;

        
        
        if (o) {
            listener.o = o;
            if (o.single) {
                handler = me.createSingle(handler, listener, o, scope);
            }
            if (o.target) {
                handler = me.createTargeted(handler, listener, o, scope);
            }
            if (o.delay) {
                handler = me.createDelayed(handler, listener, o, scope);
            }
            if (o.buffer) {
                handler = me.createBuffered(handler, listener, o, scope);
            }
        }

        listener.fireFn = handler;
        return listener;
    },

    findListener: function(fn, scope) {
        var listeners = this.listeners,
        i = listeners.length,
        listener,
        s;

        while (i--) {
            listener = listeners[i];
            if (listener) {
                s = listener.scope;

                
                
                
                if (listener.fn == fn && (s == (scope || this.observable))) {
                    return i;
                }
            }
        }

        return - 1;
    },

    isListening: function(fn, scope) {
        return this.findListener(fn, scope) !== -1;
    },

    removeListener: function(fn, scope) {
        var me = this,
            index,
            listener,
            highestNegativePriorityIndex,
            k;
        index = me.findListener(fn, scope);
        if (index != -1) {
            listener = me.listeners[index];
            highestNegativePriorityIndex = me._highestNegativePriorityIndex;

            if (me.firing) {
                me.listeners = me.listeners.slice(0);
            }

            
            if (listener.task) {
                listener.task.cancel();
                delete listener.task;
            }

            
            k = listener.tasks && listener.tasks.length;
            if (k) {
                while (k--) {
                    listener.tasks[k].cancel();
                }
                delete listener.tasks;
            }

            
            
            
            me.listeners.splice(index, 1);

            
            
            if (highestNegativePriorityIndex) {
                if (index < highestNegativePriorityIndex) {
                    me._highestNegativePriorityIndex --;
                } else if (index === highestNegativePriorityIndex && index === me.listeners.length) {
                    delete me._highestNegativePriorityIndex;
                }
            }
            return true;
        }

        return false;
    },

    
    clearListeners: function() {
        var listeners = this.listeners,
            i = listeners.length;

        while (i--) {
            this.removeListener(listeners[i].fn, listeners[i].scope);
        }
    },

    suspend: function() {
        this.suspended += 1;
    },

    resume: function() {
        if (this.suspended) {
            this.suspended--;
        }
    },

    fire: function() {
        var me = this,
            listeners = me.listeners,
            count = listeners.length,
            i,
            args,
            listener,
            len;

        if (!me.suspended && count > 0) {
            me.firing = true;
            args = arguments.length ? arraySlice.call(arguments, 0) : []
            len = args.length;
            for (i = 0; i < count; i++) {
                listener = listeners[i];
                if (listener.o) {
                    args[len] = listener.o;
                }
                if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
                    return (me.firing = false);
                }
            }
        }
        me.firing = false;
        return true;
    },

    createTargeted: function (handler, listener, o, scope) {
        return function(){
            if (o.target === arguments[0]){
                handler.apply(scope, arguments);
            }
        };
    },

    createBuffered: function (handler, listener, o, scope) {
        listener.task = new DelayedTask();
        return function() {
            listener.task.delay(o.buffer, handler, scope, toArray(arguments));
        };
    },

    createDelayed: function (handler, listener, o, scope) {
        return function() {
            var task = new DelayedTask();
            if (!listener.tasks) {
                listener.tasks = [];
            }
            listener.tasks.push(task);
            task.delay(o.delay || 10, handler, scope, toArray(arguments));
        };
    },

    createSingle: function (handler, listener, o, scope) {
        return function() {
            var event = listener.ev;

            if (event.removeListener(listener.fn, scope) && event.observable) {
                
                
                event.observable.hasListeners[event.name]--;
            }

            return handler.apply(scope, arguments);
        };
    }
  };
});






Ext.EventManager = new function() {
    var EventManager = this,
        doc = document,
        win = window,
        escapeRx = /\\/g,
        prefix = Ext.baseCSSPrefix,
        
        supportsAddEventListener = !Ext.isIE9 && 'addEventListener' in doc,
        readyEvent,
        initExtCss = function() {
            
            var bd = doc.body || doc.getElementsByTagName('body')[0],
                cls = [prefix + 'body'],
                htmlCls = [],
                supportsLG = Ext.supports.CSS3LinearGradient,
                supportsBR = Ext.supports.CSS3BorderRadius,
                html;

            if (!bd) {
                return false;
            }

            html = bd.parentNode;

            function add (c) {
                cls.push(prefix + c);
            }

            
            if (Ext.isIE && Ext.isIE9m) {
                add('ie');

                
                
                
                
                
                
                
                
                
                
                
                if (Ext.isIE6) {
                    add('ie6');
                } else { 
                    add('ie7p');

                    if (Ext.isIE7) {
                        add('ie7');
                    } else {
                        add('ie8p');

                        if (Ext.isIE8) {
                            add('ie8');
                        } else {
                            add('ie9p');

                            if (Ext.isIE9) {
                                add('ie9');
                            }
                        }
                    }
                }

                if (Ext.isIE7m) {
                    add('ie7m');
                }
                if (Ext.isIE8m) {
                    add('ie8m');
                }
                if (Ext.isIE9m) {
                    add('ie9m');
                }
                if (Ext.isIE7 || Ext.isIE8) {
                    add('ie78');
                }
            }
            
            if (Ext.isIE10) {
                add('ie10');
            }
            
            if (Ext.isGecko) {
                add('gecko');
                if (Ext.isGecko3) {
                    add('gecko3');
                }
                if (Ext.isGecko4) {
                    add('gecko4');
                }
                if (Ext.isGecko5) {
                    add('gecko5');
                }
            }
            if (Ext.isOpera) {
                add('opera');
            }
            if (Ext.isWebKit) {
                add('webkit');
            }
            if (Ext.isSafari) {
                add('safari');
                if (Ext.isSafari2) {
                    add('safari2');
                }
                if (Ext.isSafari3) {
                    add('safari3');
                }
                if (Ext.isSafari4) {
                    add('safari4');
                }
                if (Ext.isSafari5) {
                    add('safari5');
                }
                if (Ext.isSafari5_0) {
                    add('safari5_0')
                }
            }
            if (Ext.isChrome) {
                add('chrome');
            }
            if (Ext.isMac) {
                add('mac');
            }
            if (Ext.isLinux) {
                add('linux');
            }
            if (!supportsBR) {
                add('nbr');
            }
            if (!supportsLG) {
                add('nlg');
            }

            
            if (html) {
                if (Ext.isStrict && (Ext.isIE6 || Ext.isIE7)) {
                    Ext.isBorderBox = false;
                }
                else {
                    Ext.isBorderBox = true;
                }

                if(!Ext.isBorderBox) {
                    htmlCls.push(prefix + 'content-box');
                }
                if (Ext.isStrict) {
                    htmlCls.push(prefix + 'strict');
                } else {
                    htmlCls.push(prefix + 'quirks');
                }
                Ext.fly(html, '_internal').addCls(htmlCls);
            }

            Ext.fly(bd, '_internal').addCls(cls);
            return true;
        };

    Ext.apply(EventManager, {
        
        hasBoundOnReady: false,

        
        hasFiredReady: false,

        
        deferReadyEvent : 1,

        
        onReadyChain : [],

        
        readyEvent:
            (function () {
                readyEvent = new Ext.util.Event();
                readyEvent.fire = function () {
                    Ext._beforeReadyTime = Ext._beforeReadyTime || new Date().getTime();
                    readyEvent.self.prototype.fire.apply(readyEvent, arguments);
                    Ext._afterReadytime = new Date().getTime();
                };
                return readyEvent;
            }()),

        
        idleEvent: new Ext.util.Event(),

        
        isReadyPaused: function(){
            return (/[?&]ext-pauseReadyFire\b/i.test(location.search) && !Ext._continueFireReady);
        },

        
        bindReadyEvent: function() {
            if (EventManager.hasBoundOnReady) {
                return;
            }

            
            if ( doc.readyState == 'complete'  ) {  
                EventManager.onReadyEvent({
                    type: doc.readyState || 'body'
                });
            } else {
                doc.addEventListener('DOMContentLoaded', EventManager.onReadyEvent, false);
                win.addEventListener('load', EventManager.onReadyEvent, false);
                EventManager.hasBoundOnReady = true;
            }
        },

        onReadyEvent : function(e) {
            if (e && e.type) {
                EventManager.onReadyChain.push(e.type);
            }

            if (EventManager.hasBoundOnReady) {
                doc.removeEventListener('DOMContentLoaded', EventManager.onReadyEvent, false);
                win.removeEventListener('load', EventManager.onReadyEvent, false);
            }

            if (!Ext.isReady) {
                EventManager.fireDocReady();
            }
        },

        
        fireDocReady: function() {
            if (!Ext.isReady) {
                Ext._readyTime = new Date().getTime();
                Ext.isReady = true;

                Ext.supports.init();
                EventManager.onWindowUnload();
                readyEvent.onReadyChain = EventManager.onReadyChain;    

                if (Ext.isNumber(EventManager.deferReadyEvent)) {
                    Ext.Function.defer(EventManager.fireReadyEvent, EventManager.deferReadyEvent);
                    EventManager.hasDocReadyTimer = true;
                } else {
                    EventManager.fireReadyEvent();
                }
            }
        },

        
        fireReadyEvent: function() {

            
            
            EventManager.hasDocReadyTimer = false;
            EventManager.isFiring = true;

            
            
            
            while (readyEvent.listeners.length && !EventManager.isReadyPaused()) {
                readyEvent.fire();
            }
            EventManager.isFiring = false;
            EventManager.hasFiredReady = true;
            Ext.EventManager.idleEvent.fire();
        },

        
        onDocumentReady: function(fn, scope, options) {
            options = options || {};
            
            options.single = true;
            readyEvent.addListener(fn, scope, options);

            
            
            if (!(EventManager.isFiring || EventManager.hasDocReadyTimer)) {
                if (Ext.isReady) {
                    EventManager.fireReadyEvent();
                } else {
                    EventManager.bindReadyEvent();
                }
            }
        },

        

        
        stoppedMouseDownEvent: new Ext.util.Event(),

        
        propRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|freezeEvent)$/,

        
        getId : function(element) {
            var id;

            element = Ext.getDom(element);

            if (element === doc || element === win) {
                id = element === doc ? Ext.documentId : Ext.windowId;
            }
            else {
                id = Ext.id(element);
            }

            if (!Ext.cache[id]) {
                Ext.addCacheEntry(id, null, element);
            }

            return id;
        },

        
        prepareListenerConfig: function(element, config, isRemove) {
            var propRe = EventManager.propRe,
                key, value, args;

            
            for (key in config) {
                if (config.hasOwnProperty(key)) {
                    
                    if (!propRe.test(key)) {
                        value = config[key];
                        
                        
                        if (typeof value == 'function') {
                            
                            args = [element, key, value, config.scope, config];
                        } else {
                            
                            args = [element, key, value.fn, value.scope, value];
                        }

                        if (isRemove) {
                            EventManager.removeListener.apply(EventManager, args);
                        } else {
                            EventManager.addListener.apply(EventManager, args);
                        }
                    }
                }
            }
        },

        mouseEnterLeaveRe: /mouseenter|mouseleave/,

        
        normalizeEvent: function(eventName, fn) {
            if (EventManager.mouseEnterLeaveRe.test(eventName) && !Ext.supports.MouseEnterLeave) {
                if (fn) {
                    fn = Ext.Function.createInterceptor(fn, EventManager.contains);
                }
                eventName = eventName == 'mouseenter' ? 'mouseover' : 'mouseout';
            } else if (eventName == 'mousewheel' && !Ext.supports.MouseWheel && !Ext.isOpera) {
                eventName = 'DOMMouseScroll';
            }
            return {
                eventName: eventName,
                fn: fn
            };
        },

        
        contains: function(event) {
            event = event.browserEvent || event;
            var parent = event.currentTarget,
                child = EventManager.getRelatedTarget(event);

            if (parent && parent.firstChild) {
                while (child) {
                    if (child === parent) {
                        return false;
                    }
                    child = child.parentNode;
                    if (child && (child.nodeType != 1)) {
                        child = null;
                    }
                }
            }
            return true;
        },

        
        addListener: function(element, eventName, fn, scope, options) {
            
            if (typeof eventName !== 'string') {
                EventManager.prepareListenerConfig(element, eventName);
                return;
            }

            var dom = element.dom || Ext.getDom(element),
                hasAddEventListener, bind, wrap, cache, id, cacheItem, capture;
            
            if (typeof fn === 'string') {
                fn = Ext.resolveMethod(fn, scope || element);
            }


            
            options = options || {};

            bind = EventManager.normalizeEvent(eventName, fn);
            wrap = EventManager.createListenerWrap(dom, eventName, bind.fn, scope, options);
            
            
            cache = EventManager.getEventListenerCache(element.dom ? element : dom, eventName);
            eventName = bind.eventName;

            
            hasAddEventListener = supportsAddEventListener || (Ext.isIE9 && !dom.attachEvent);
            
            if (!hasAddEventListener) {
                id = EventManager.normalizeId(dom);
                
                
                if (id) {
                    cacheItem = Ext.cache[id][eventName];
                    if (cacheItem && cacheItem.firing) {
                        
                        
                        
                        
                        
                        
                        cache = EventManager.cloneEventListenerCache(dom, eventName);
                    }
                }
            }

            capture = !!options.capture;
            cache.push({
                fn: fn,
                wrap: wrap,
                scope: scope,
                capture: capture 
            });

            if (!hasAddEventListener) {
                
                
                if (cache.length === 1) {
                    id = EventManager.normalizeId(dom, true);
                    fn = Ext.Function.bind(EventManager.handleSingleEvent, EventManager, [id, eventName], true);
                    Ext.cache[id][eventName] = {
                        firing: false,
                        fn: fn
                    };
                    dom.attachEvent('on' + eventName, fn);
                }
            } else {
                dom.addEventListener(eventName, wrap, capture);
            }

            if (dom == doc && eventName == 'mousedown') {
                EventManager.stoppedMouseDownEvent.addListener(wrap);
            }
        },
        
        
        
        normalizeId: function(dom, force) {
            var id;
            if (dom === document) {
                id = Ext.documentId;
            } else if (dom === window) {
                id = Ext.windowId;
            } else {
                id = dom.id;
            }
            if (!id && force) {
                id = EventManager.getId(dom);
            }
            return id;
        },
        
        handleSingleEvent: function(e, id, eventName) {
            
            
            
            var listenerCache = EventManager.getEventListenerCache(id, eventName),
                attachItem = Ext.cache[id][eventName],
                len, i;
                
            
            
            
            if (attachItem.firing) {
                return;
            }
                
            attachItem.firing = true;
            for (i = 0, len = listenerCache.length; i < len; ++i) {
                listenerCache[i].wrap(e);
            }
            attachItem.firing = false;
            
        },

        
        removeListener : function(element, eventName, fn, scope) {
            
            if (typeof eventName !== 'string') {
                EventManager.prepareListenerConfig(element, eventName, true);
                return;
            }

            var dom = Ext.getDom(element),
                id, el = element.dom ? element : Ext.get(dom),
                cache = EventManager.getEventListenerCache(el, eventName),
                bindName = EventManager.normalizeEvent(eventName).eventName,
                i = cache.length, j, cacheItem, hasRemoveEventListener,
                listener, wrap;
                
            if (!dom) {
                return;
            }

            
            hasRemoveEventListener = supportsAddEventListener || (Ext.isIE9 && !dom.detachEvent);
            
            if (typeof fn === 'string') {
                fn = Ext.resolveMethod(fn, scope || element);
            }

            while (i--) {
                listener = cache[i];

                if (listener && (!fn || listener.fn == fn) && (!scope || listener.scope === scope)) {
                    wrap = listener.wrap;

                    
                    if (wrap.task) {
                        clearTimeout(wrap.task);
                        delete wrap.task;
                    }

                    
                    j = wrap.tasks && wrap.tasks.length;
                    if (j) {
                        while (j--) {
                            clearTimeout(wrap.tasks[j]);
                        }
                        delete wrap.tasks;
                    }

                    if (!hasRemoveEventListener) {
                        
                        
                        id = EventManager.normalizeId(dom, true);
                        cacheItem = Ext.cache[id][bindName];
                        if (cacheItem && cacheItem.firing) {
                            
                            cache = EventManager.cloneEventListenerCache(dom, bindName);
                        }
                        
                        if (cache.length === 1) {
                            fn = cacheItem.fn;
                            delete Ext.cache[id][bindName];
                            dom.detachEvent('on' + bindName, fn);
                        }
                    } else {
                        dom.removeEventListener(bindName, wrap, listener.capture);
                    }

                    if (wrap && dom == doc && eventName == 'mousedown') {
                        EventManager.stoppedMouseDownEvent.removeListener(wrap);
                    }

                    
                    Ext.Array.erase(cache, i, 1);
                }
            }
        },

        
        removeAll : function(element) {
            var id = (typeof element === 'string') ? element : element.id,
                cache, events, eventName;

            
            if (id && (cache = Ext.cache[id])) {
                events = cache.events;
    
                for (eventName in events) {
                    if (events.hasOwnProperty(eventName)) {
                        EventManager.removeListener(element, eventName);
                    }
                }
                cache.events = {};
             }
        },

        
        purgeElement : function(element, eventName) {
            var dom = Ext.getDom(element),
                i = 0, len, childNodes;

            if (eventName) {
                EventManager.removeListener(element, eventName);
            } else {
                EventManager.removeAll(element);
            }

            if (dom && dom.childNodes) {
                childNodes = dom.childNodes;
                for (len = childNodes.length; i < len; i++) {
                    EventManager.purgeElement(childNodes[i], eventName);
                }
            }
        },

        
        createListenerWrap : function(dom, ename, fn, scope, options) {
            options = options || {};

            var f, gen, wrap = function(e, args) {
                
                if (!gen) {
                    f = ['if(!' + Ext.name + ') {return;}'];

                    if (options.buffer || options.delay || options.freezeEvent) {
                        if (options.freezeEvent) {
                            
                            
                            f.push('e = X.EventObject.setEvent(e);');
                        }
                        f.push('e = new X.EventObjectImpl(e, ' + (options.freezeEvent ? 'true' : 'false' ) + ');');
                    } else {
                        f.push('e = X.EventObject.setEvent(e);');
                    }

                    if (options.delegate) {
                        
                        
                        f.push('var result, t = e.getTarget("' + (options.delegate + '').replace(escapeRx, '\\\\') + '", this);');
                        f.push('if(!t) {return;}');
                    } else {
                        f.push('var t = e.target, result;');
                    }

                    if (options.target) {
                        f.push('if(e.target !== options.target) {return;}');
                    }

                    if (options.stopEvent) {
                        f.push('e.stopEvent();');
                    } else {
                        if(options.preventDefault) {
                            f.push('e.preventDefault();');
                        }
                        if(options.stopPropagation) {
                            f.push('e.stopPropagation();');
                        }
                    }

                    if (options.normalized === false) {
                        f.push('e = e.browserEvent;');
                    }

                    if (options.buffer) {
                        f.push('(wrap.task && clearTimeout(wrap.task));');
                        f.push('wrap.task = setTimeout(function() {');
                    }

                    if (options.delay) {
                        f.push('wrap.tasks = wrap.tasks || [];');
                        f.push('wrap.tasks.push(setTimeout(function() {');
                    }

                    
                    f.push('result = fn.call(scope || dom, e, t, options);');

                    if (options.single) {
                        f.push('evtMgr.removeListener(dom, ename, fn, scope);');
                    }

                    
                    
                    if (ename !== 'mousemove' && ename !== 'unload') {
                        f.push('if (evtMgr.idleEvent.listeners.length) {');
                        f.push('evtMgr.idleEvent.fire();');
                        f.push('}');
                    }

                    if (options.delay) {
                        f.push('}, ' + options.delay + '));');
                    }

                    if (options.buffer) {
                        f.push('}, ' + options.buffer + ');');
                    }
                    f.push('return result;');

                    gen = Ext.cacheableFunctionFactory('e', 'options', 'fn', 'scope', 'ename', 'dom', 'wrap', 'args', 'X', 'evtMgr', f.join('\n'));
                }

                return gen.call(dom, e, options, fn, scope, ename, dom, wrap, args, Ext, EventManager);
            };
            return wrap;
        },
        
        
        getEventCache: function(element) {
            var elementCache, eventCache, id;
            
            if (!element) {
                return [];
            }

            if (element.$cache) {
                elementCache = element.$cache;
            } else {
                
                if (typeof element === 'string') {
                    id = element;
                } else {
                    id = EventManager.getId(element);
                }
                elementCache = Ext.cache[id];
            }
            eventCache = elementCache.events || (elementCache.events = {});
            return eventCache;
        },

        
        getEventListenerCache : function(element, eventName) {
            var eventCache = EventManager.getEventCache(element);
            return eventCache[eventName] || (eventCache[eventName] = []);
        },
        
        
        cloneEventListenerCache: function(element, eventName){
            var eventCache = EventManager.getEventCache(element),
                out;
                
            if (eventCache[eventName]) {
                out = eventCache[eventName].slice(0);
            } else {
                out = [];
            }
            eventCache[eventName] = out;
            return out;
        },

        
        mouseLeaveRe: /(mouseout|mouseleave)/,
        mouseEnterRe: /(mouseover|mouseenter)/,

        
        stopEvent: function(event) {
            EventManager.stopPropagation(event);
            EventManager.preventDefault(event);
        },

        
        stopPropagation: function(event) {
            event = event.browserEvent || event;
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },

        
        preventDefault: function(event) {
            event = event.browserEvent || event;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
                
                try {
                  
                  if (event.ctrlKey || event.keyCode > 111 && event.keyCode < 124) {
                      event.keyCode = -1;
                  }
                } catch (e) {
                    
                }
            }
        },

        
        getRelatedTarget: function(event) {
            event = event.browserEvent || event;
            var target = event.relatedTarget;
            if (!target) {
                if (EventManager.mouseLeaveRe.test(event.type)) {
                    target = event.toElement;
                } else if (EventManager.mouseEnterRe.test(event.type)) {
                    target = event.fromElement;
                }
            }
            return EventManager.resolveTextNode(target);
        },

        
        getPageX: function(event) {
            return EventManager.getPageXY(event)[0];
        },

        
        getPageY: function(event) {
            return EventManager.getPageXY(event)[1];
        },

        
        getPageXY: function(event) {
            event = event.browserEvent || event;
            var x = event.pageX,
                y = event.pageY,
                docEl = doc.documentElement,
                body = doc.body;

            
            if (!x && x !== 0) {
                x = event.clientX + (docEl && docEl.scrollLeft || body && body.scrollLeft || 0) - (docEl && docEl.clientLeft || body && body.clientLeft || 0);
                y = event.clientY + (docEl && docEl.scrollTop  || body && body.scrollTop  || 0) - (docEl && docEl.clientTop  || body && body.clientTop  || 0);
            }
            return [x, y];
        },

        
        getTarget: function(event) {
            event = event.browserEvent || event;
            return EventManager.resolveTextNode(event.target || event.srcElement);
        },

        
        
        
        
        resolveTextNode: Ext.isGecko ?
            function(node) {
                if (node) {
                    
                    var s = HTMLElement.prototype.toString.call(node);
                    if (s !== '[xpconnect wrapped native prototype]' && s !== '[object XULElement]') {
                        return node.nodeType == 3 ? node.parentNode: node;
                    }
                }
            }
            :
            function(node) {
                return node && node.nodeType == 3 ? node.parentNode: node;
            },

        

        
        curWidth: 0,
        curHeight: 0,

        
        onWindowResize: function(fn, scope, options) {
            var resize = EventManager.resizeEvent;

            if (!resize) {
                EventManager.resizeEvent = resize = new Ext.util.Event();
                EventManager.on(win, 'resize', EventManager.fireResize, null, {buffer: 100});
            }
            resize.addListener(fn, scope, options);
        },

        
        fireResize: function() {
            var w = Ext.Element.getViewWidth(),
                h = Ext.Element.getViewHeight();

             
             if (EventManager.curHeight != h || EventManager.curWidth != w) {
                 EventManager.curHeight = h;
                 EventManager.curWidth = w;
                 EventManager.resizeEvent.fire(w, h);
             }
        },

        
        removeResizeListener: function(fn, scope) {
            var resize = EventManager.resizeEvent;
            if (resize) {
                resize.removeListener(fn, scope);
            }
        },

        
        onWindowUnload: function(fn, scope, options) {
            var unload = EventManager.unloadEvent;

            if (!unload) {
                EventManager.unloadEvent = unload = new Ext.util.Event();
                EventManager.addListener(win, 'unload', EventManager.fireUnload);
            }
            if (fn) {
                unload.addListener(fn, scope, options);
            }
        },

        
        fireUnload: function() {
            
            try {
                
                doc = win = undefined;

                var gridviews, i, ln,
                    el, cache;

                EventManager.unloadEvent.fire();
                
                if (Ext.isGecko3) {
                    gridviews = Ext.ComponentQuery.query('gridview');
                    i = 0;
                    ln = gridviews.length;
                    for (; i < ln; i++) {
                        gridviews[i].scrollToTop();
                    }
                }
                
                cache = Ext.cache;

                for (el in cache) {
                    if (cache.hasOwnProperty(el)) {
                        EventManager.removeAll(el);
                    }
                }
            } catch(e) {
            }
        },

        
        removeUnloadListener: function(fn, scope) {
            var unload = EventManager.unloadEvent;
            if (unload) {
                unload.removeListener(fn, scope);
            }
        },

        
        useKeyDown: Ext.isWebKit ?
                       parseInt(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1], 10) >= 525 :
                       !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera),

        
        getKeyEvent: function() {
            return EventManager.useKeyDown ? 'keydown' : 'keypress';
        }
    });

    
    if(!supportsAddEventListener && document.attachEvent) {
        Ext.apply( EventManager, {
            

            
            pollScroll : function() {
                var scrollable = true;

                try {
                    document.documentElement.doScroll('left');
                } catch(e) {
                    scrollable = false;
                }

                
                if (scrollable && document.body) {
                    EventManager.onReadyEvent({
                        type:'doScroll'
                    });
                } else {
                    
                    EventManager.scrollTimeout = setTimeout(EventManager.pollScroll, 20);
                }

                return scrollable;
            },

            
            scrollTimeout: null,

            
            readyStatesRe  : /complete/i,

            
            checkReadyState: function() {
                var state = document.readyState;

                if (EventManager.readyStatesRe.test(state)) {
                    EventManager.onReadyEvent({
                        type: state
                    });
                }
            },

            bindReadyEvent: function() {
                var topContext = true;

                if (EventManager.hasBoundOnReady) {
                    return;
                }

                
                try {
                    topContext = window.frameElement === undefined;
                } catch(e) {
                    
                    
                    topContext = false;
                }

                if (!topContext || !doc.documentElement.doScroll) {
                    EventManager.pollScroll = Ext.emptyFn;   
                }

                
                if (EventManager.pollScroll() === true) {
                    return;
                }

                
                if (doc.readyState == 'complete' )  {
                    EventManager.onReadyEvent({type: 'already ' + (doc.readyState || 'body') });
                } else {
                    doc.attachEvent('onreadystatechange', EventManager.checkReadyState);
                    window.attachEvent('onload', EventManager.onReadyEvent);
                    EventManager.hasBoundOnReady = true;
                }
            },

            onReadyEvent : function(e) {
                if (e && e.type) {
                    EventManager.onReadyChain.push(e.type);
                }

                if (EventManager.hasBoundOnReady) {
                    document.detachEvent('onreadystatechange', EventManager.checkReadyState);
                    window.detachEvent('onload', EventManager.onReadyEvent);
                }

                if (Ext.isNumber(EventManager.scrollTimeout)) {
                    clearTimeout(EventManager.scrollTimeout);
                    delete EventManager.scrollTimeout;
                }

                if (!Ext.isReady) {
                    EventManager.fireDocReady();
                }
            },

            
            onReadyChain : []
        });
    }


    
    Ext.onReady = function(fn, scope, options) {
        Ext.Loader.onReady(fn, scope, true, options);
    };

    
    Ext.onDocumentReady = EventManager.onDocumentReady;

    
    EventManager.on = EventManager.addListener;

    
    EventManager.un = EventManager.removeListener;

    Ext.onReady(initExtCss);
};



Ext.define('Ext.util.Observable', function(Observable) {

    
    var emptyArray = [],
        arrayProto = Array.prototype,
        arraySlice = arrayProto.slice,
        ExtEvent = Ext.util.Event,
        ListenerRemover = function(observable) {

            
            if (observable instanceof ListenerRemover) {
                return observable;
            }

            this.observable = observable;

            
            
            if (arguments[1].isObservable) {
                this.managedListeners = true;
            }
            this.args = arraySlice.call(arguments, 1);
        };

    ListenerRemover.prototype.destroy = function() {
        this.observable[this.managedListeners ? 'mun' : 'un'].apply(this.observable, this.args);
    };

    return {

        

                                                         

        statics: {
            
            releaseCapture: function(o) {
                o.fireEventArgs = this.prototype.fireEventArgs;
            },

            
            capture: function(o, fn, scope) {
                
                
                
                
                var newFn = function(eventName, args) {
                    return fn.apply(scope, [eventName].concat(args));
                }
                
                this.captureArgs(o, newFn, scope);
            },
            
            
            captureArgs: function(o, fn, scope) {
                o.fireEventArgs = Ext.Function.createInterceptor(o.fireEventArgs, fn, scope);
            },

            
            observe: function(cls, listeners) {
                if (cls) {
                    if (!cls.isObservable) {
                        Ext.applyIf(cls, new this());
                        this.captureArgs(cls.prototype, cls.fireEventArgs, cls);
                    }
                    if (Ext.isObject(listeners)) {
                        cls.on(listeners);
                    }
                }
                return cls;
            },

            
            prepareClass: function (T, mixin) {
                
                

                
                

                if (!T.HasListeners) {
                    
                    
                    
                    var HasListeners = function () {},
                        SuperHL = T.superclass.HasListeners || (mixin && mixin.HasListeners) ||
                                Observable.HasListeners;

                    
                    T.prototype.HasListeners = T.HasListeners = HasListeners;

                    
                    
                    HasListeners.prototype = T.hasListeners = new SuperHL();
                }
            }
        },

        

        

        
        isObservable: true,

        
        eventsSuspended: 0,

        

        constructor: function(config) {
            var me = this;

            Ext.apply(me, config);

            
            if (!me.hasListeners) {
                me.hasListeners = new me.HasListeners();
            }

            me.events = me.events || {};
            if (me.listeners) {
                me.on(me.listeners);
                me.listeners = null; 
            }

            if (me.bubbleEvents) {
                me.enableBubble(me.bubbleEvents);
            }
        },

        onClassExtended: function (T) {
            if (!T.HasListeners) {
                
                
                Observable.prepareClass(T);
            }
        },

        
        
        eventOptionsRe : /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|destroyable|vertical|horizontal|freezeEvent|priority)$/,

        
        addManagedListener: function(item, ename, fn, scope, options,  noDestroy) {
            var me = this,
                managedListeners = me.managedListeners = me.managedListeners || [],
                config, passedOptions;

            if (typeof ename !== 'string') {
                
                
                
                
                passedOptions = arguments.length > 4 ? options : ename;

                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            
                            
                            me.addManagedListener(item, ename, config.fn || config, config.scope || options.scope || scope, config.fn ? config : passedOptions, true);
                        }
                    }
                }
                if (options && options.destroyable) {
                    return new ListenerRemover(me, item, options);
                }
            }
            else {
                if (typeof fn === 'string') {
                    scope = scope || me;
                    fn = Ext.resolveMethod(fn, scope);
                }
                
                managedListeners.push({
                    item: item,
                    ename: ename,
                    fn: fn,
                    scope: scope,
                    options: options
                });

                item.on(ename, fn, scope, options);

                
                if (!noDestroy && options && options.destroyable) {
                    return new ListenerRemover(me, item, ename, fn, scope);
                }
            }
        },

        
        removeManagedListener: function(item, ename, fn, scope) {
            var me = this,
                options,
                config,
                managedListeners,
                length,
                i, func;

            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            me.removeManagedListener(item, ename, config.fn || config, config.scope || options.scope || scope);
                        }
                    }
                }
            } else {
                managedListeners = me.managedListeners ? me.managedListeners.slice() : [];
                
                if (typeof fn === 'string') {
                    scope = scope || me;
                    fn = Ext.resolveMethod(fn, scope);
                }

                for (i = 0, length = managedListeners.length; i < length; i++) {
                    me.removeManagedListenerItem(false, managedListeners[i], item, ename, fn, scope);
                }
            }
        },

        
        fireEvent: function(eventName) {
            return this.fireEventArgs(eventName, arraySlice.call(arguments, 1));
        },

        
        fireEventArgs: function(eventName, args) {
            eventName = eventName.toLowerCase();
            var me = this,
                events = me.events,
                event = events && events[eventName],
                ret = true;

            
            
            if (event && me.hasListeners[eventName]) {
                ret = me.continueFireEvent(eventName, args || emptyArray, event.bubble);
            }
            return ret;
        },

        
        continueFireEvent: function(eventName, args, bubbles) {
            var target = this,
                queue, event,
                ret = true;

            do {
                if (target.eventsSuspended) {
                    if ((queue = target.eventQueue)) {
                        queue.push([eventName, args, bubbles]);
                    }
                    return ret;
                } else {
                    event = target.events[eventName];
                    
                    
                    if (event && event !== true) {
                        if ((ret = event.fire.apply(event, args)) === false) {
                            break;
                        }
                    }
                }
            } while (bubbles && (target = target.getBubbleParent()));
            return ret;
        },

        
        getBubbleParent: function() {
            var me = this, parent = me.getBubbleTarget && me.getBubbleTarget();
            if (parent && parent.isObservable) {
                return parent;
            }
            return null;
        },

        
        addListener: function(ename, fn, scope, options) {
            var me = this,
                config, event,
                prevListenerCount = 0;

            
            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            
                            me.addListener(ename, config.fn || config, config.scope || options.scope, config.fn ? config : options);
                        }
                    }
                }
                if (options && options.destroyable) {
                    return new ListenerRemover(me, options);
                }
            }
            
            else {
                ename = ename.toLowerCase();
                event = me.events[ename];
                if (event && event.isEvent) {
                    prevListenerCount = event.listeners.length;
                } else {
                    me.events[ename] = event = new ExtEvent(me, ename);
                }

                
                if (typeof fn === 'string') {
                    scope = scope || me;
                    fn = Ext.resolveMethod(fn, scope);
                }
                event.addListener(fn, scope, options);

                
                
                if (event.listeners.length !== prevListenerCount) {
                    me.hasListeners._incr_(ename);
                }
                if (options && options.destroyable) {
                    return new ListenerRemover(me, ename, fn, scope, options);
                }
            }
        },

        
        removeListener: function(ename, fn, scope) {
            var me = this,
                config,
                event,
                options;

            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            me.removeListener(ename, config.fn || config, config.scope || options.scope);
                        }
                    }
                }
            } else {
                ename = ename.toLowerCase();
                event = me.events[ename];
                if (event && event.isEvent) {
                    if (typeof fn === 'string') {
                        scope = scope || me;
                        fn = Ext.resolveMethod(fn, scope);
                    }
                    
                    if (event.removeListener(fn, scope)) {
                        me.hasListeners._decr_(ename);
                    }
                }
            }
        },

        
        clearListeners: function() {
            var events = this.events,
                hasListeners = this.hasListeners,
                event,
                key;

            for (key in events) {
                if (events.hasOwnProperty(key)) {
                    event = events[key];
                    if (event.isEvent) {
                        delete hasListeners[key];
                        event.clearListeners();
                    }
                }
            }

            this.clearManagedListeners();
        },


        
        clearManagedListeners : function() {
            var managedListeners = this.managedListeners || [],
                i = 0,
                len = managedListeners.length;

            for (; i < len; i++) {
                this.removeManagedListenerItem(true, managedListeners[i]);
            }

            this.managedListeners = [];
        },

        
        removeManagedListenerItem: function(isClear, managedListener, item, ename, fn, scope){
            if (isClear || (managedListener.item === item && managedListener.ename === ename && (!fn || managedListener.fn === fn) && (!scope || managedListener.scope === scope))) {
                managedListener.item.un(managedListener.ename, managedListener.fn, managedListener.scope);
                if (!isClear) {
                    Ext.Array.remove(this.managedListeners, managedListener);
                }
            }
        },


        
        addEvents: function(o) {
            var me = this,
                events = me.events || (me.events = {}),
                arg, args, i;

            if (typeof o == 'string') {
                for (args = arguments, i = args.length; i--; ) {
                    arg = args[i];
                    if (!events[arg]) {
                        events[arg] = true;
                    }
                }
            } else {
                Ext.applyIf(me.events, o);
            }
        },

        
        hasListener: function(ename) {
            return !!this.hasListeners[ename.toLowerCase()];
        },

        
        suspendEvents: function(queueSuspended) {
            this.eventsSuspended += 1;
            if (queueSuspended && !this.eventQueue) {
                this.eventQueue = [];
            }
        },

        
        suspendEvent: function(eventName) {
            var len = arguments.length,
                i, event;

            for (i = 0; i < len; i++) {
                event = this.events[arguments[i]];

                
                if (event && event.suspend) {
                    event.suspend();
                }
            }
        },

        
        resumeEvent: function() {
            var len = arguments.length,
                i, event;

            for (i = 0; i < len; i++) {

                
                event = this.events[arguments[i]];
                if (event && event.resume) {
                    event.resume();
                }
            }
        },

        
        resumeEvents: function() {
            var me = this,
                queued = me.eventQueue,
                qLen, q;

            if (me.eventsSuspended && ! --me.eventsSuspended) {
                delete me.eventQueue;

                if (queued) {
                    qLen = queued.length;
                    for (q = 0; q < qLen; q++) {
                        me.continueFireEvent.apply(me, queued[q]);
                    }
                }
            }
        },

        
        relayEvents : function(origin, events, prefix) {
            var me = this,
                len = events.length,
                i = 0,
                oldName,
                relayers = {};

            for (; i < len; i++) {
                oldName = events[i];

                
                relayers[oldName] = me.createRelayer(prefix ? prefix + oldName : oldName);
            }
            
            
            
            me.mon(origin, relayers, null, null, undefined);

            
            return new ListenerRemover(me, origin, relayers);
        },

        
        createRelayer: function(newName, beginEnd) {
            var me = this;
            return function() {
                return me.fireEventArgs.call(me, newName, beginEnd ? arraySlice.apply(arguments, beginEnd) : arguments);
            };
        },

        
        enableBubble: function(eventNames) {
            if (eventNames) {
                var me = this,
                    names = (typeof eventNames == 'string') ? arguments : eventNames,
                    length = names.length,
                    events = me.events,
                    ename, event, i;

                for (i = 0; i < length; ++i) {
                    ename = names[i].toLowerCase();
                    event = events[ename];

                    if (!event || typeof event == 'boolean') {
                        events[ename] = event = new ExtEvent(me, ename);
                    }

                    
                    
                    me.hasListeners._incr_(ename);

                    event.bubble = true;
                }
            }
        }
    };
}, function() {
    var Observable = this,
        proto = Observable.prototype,
        HasListeners = function () {},
        prepareMixin = function (T) {
            if (!T.HasListeners) {
                var proto = T.prototype;

                
                Observable.prepareClass(T, this);

                
                
                T.onExtended(function (U) {
                    
                    Observable.prepareClass(U);
                });

                
                
                if (proto.onClassMixedIn) {
                    
                    Ext.override(T, {
                        onClassMixedIn: function (U) {
                            prepareMixin.call(this, U);
                            this.callParent(arguments);
                        }
                    });
                } else {
                    
                    proto.onClassMixedIn = function (U) {
                        prepareMixin.call(this, U);
                    };
                }
            }
        },
        globalEvents;

    HasListeners.prototype = {
        
        _decr_: function (ev) {
            if (! --this[ev]) {
                
                
                
                delete this[ev];
            }
        },
        _incr_: function (ev) {
            if (this.hasOwnProperty(ev)) {
                
                ++this[ev];
            } else {
                
                
                this[ev] = 1;
            }
        }
    };

    proto.HasListeners = Observable.HasListeners = HasListeners;

    Observable.createAlias({
        
        on: 'addListener',
        
        un: 'removeListener',
        
        mon: 'addManagedListener',
        
        mun: 'removeManagedListener'
    });

    
    Observable.observeClass = Observable.observe;

    
    Ext.globalEvents = globalEvents = new Observable({
        events: {
            idle: Ext.EventManager.idleEvent,
            ready: Ext.EventManager.readyEvent
        }
    });

    
    Ext.on = function() {
        return globalEvents.addListener.apply(globalEvents, arguments);
    };

    
    Ext.un = function() {
        return globalEvents.removeListener.apply(globalEvents, arguments);
    };

    
    
    
    function getMethodEvent(method){
        var e = (this.methodEvents = this.methodEvents || {})[method],
            returnValue,
            v,
            cancel,
            obj = this,
            makeCall;

        if (!e) {
            this.methodEvents[method] = e = {};
            e.originalFn = this[method];
            e.methodName = method;
            e.before = [];
            e.after = [];

            makeCall = function(fn, scope, args){
                if((v = fn.apply(scope || obj, args)) !== undefined){
                    if (typeof v == 'object') {
                        if(v.returnValue !== undefined){
                            returnValue = v.returnValue;
                        }else{
                            returnValue = v;
                        }
                        cancel = !!v.cancel;
                    }
                    else
                        if (v === false) {
                            cancel = true;
                        }
                        else {
                            returnValue = v;
                        }
                }
            };

            this[method] = function(){
                var args = Array.prototype.slice.call(arguments, 0),
                    b, i, len;
                returnValue = v = undefined;
                cancel = false;

                for(i = 0, len = e.before.length; i < len; i++){
                    b = e.before[i];
                    makeCall(b.fn, b.scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }

                if((v = e.originalFn.apply(obj, args)) !== undefined){
                    returnValue = v;
                }

                for(i = 0, len = e.after.length; i < len; i++){
                    b = e.after[i];
                    makeCall(b.fn, b.scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }
                return returnValue;
            };
        }
        return e;
    }

    Ext.apply(proto, {
        onClassMixedIn: prepareMixin,

        
        
        
        beforeMethod : function(method, fn, scope){
            getMethodEvent.call(this, method).before.push({
                fn: fn,
                scope: scope
            });
        },

        
        afterMethod : function(method, fn, scope){
            getMethodEvent.call(this, method).after.push({
                fn: fn,
                scope: scope
            });
        },

        removeMethodListener: function(method, fn, scope){
            var e = this.getMethodEvent(method),
                i, len;
            for(i = 0, len = e.before.length; i < len; i++){
                if(e.before[i].fn == fn && e.before[i].scope == scope){
                    Ext.Array.erase(e.before, i, 1);
                    return;
                }
            }
            for(i = 0, len = e.after.length; i < len; i++){
                if(e.after[i].fn == fn && e.after[i].scope == scope){
                    Ext.Array.erase(e.after, i, 1);
                    return;
                }
            }
        },

        toggleEventLogging: function(toggle) {
            Ext.util.Observable[toggle ? 'capture' : 'releaseCapture'](this, function(en) {
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.log(en, arguments);
                }
            });
        }
    });
});






Ext.define('Ext.EventObjectImpl', {
                             

    
    BACKSPACE: 8,
    
    TAB: 9,
    
    NUM_CENTER: 12,
    
    ENTER: 13,
    
    RETURN: 13,
    
    SHIFT: 16,
    
    CTRL: 17,
    
    ALT: 18,
    
    PAUSE: 19,
    
    CAPS_LOCK: 20,
    
    ESC: 27,
    
    SPACE: 32,
    
    PAGE_UP: 33,
    
    PAGE_DOWN: 34,
    
    END: 35,
    
    HOME: 36,
    
    LEFT: 37,
    
    UP: 38,
    
    RIGHT: 39,
    
    DOWN: 40,
    
    PRINT_SCREEN: 44,
    
    INSERT: 45,
    
    DELETE: 46,
    
    ZERO: 48,
    
    ONE: 49,
    
    TWO: 50,
    
    THREE: 51,
    
    FOUR: 52,
    
    FIVE: 53,
    
    SIX: 54,
    
    SEVEN: 55,
    
    EIGHT: 56,
    
    NINE: 57,
    
    A: 65,
    
    B: 66,
    
    C: 67,
    
    D: 68,
    
    E: 69,
    
    F: 70,
    
    G: 71,
    
    H: 72,
    
    I: 73,
    
    J: 74,
    
    K: 75,
    
    L: 76,
    
    M: 77,
    
    N: 78,
    
    O: 79,
    
    P: 80,
    
    Q: 81,
    
    R: 82,
    
    S: 83,
    
    T: 84,
    
    U: 85,
    
    V: 86,
    
    W: 87,
    
    X: 88,
    
    Y: 89,
    
    Z: 90,
    
    CONTEXT_MENU: 93,
    
    NUM_ZERO: 96,
    
    NUM_ONE: 97,
    
    NUM_TWO: 98,
    
    NUM_THREE: 99,
    
    NUM_FOUR: 100,
    
    NUM_FIVE: 101,
    
    NUM_SIX: 102,
    
    NUM_SEVEN: 103,
    
    NUM_EIGHT: 104,
    
    NUM_NINE: 105,
    
    NUM_MULTIPLY: 106,
    
    NUM_PLUS: 107,
    
    NUM_MINUS: 109,
    
    NUM_PERIOD: 110,
    
    NUM_DIVISION: 111,
    
    F1: 112,
    
    F2: 113,
    
    F3: 114,
    
    F4: 115,
    
    F5: 116,
    
    F6: 117,
    
    F7: 118,
    
    F8: 119,
    
    F9: 120,
    
    F10: 121,
    
    F11: 122,
    
    F12: 123,
    
    WHEEL_SCALE: (function () {
        var scale;

        if (Ext.isGecko) {
            
            scale = 3;
        } else if (Ext.isMac) {
            
            
            

            if (Ext.isSafari && Ext.webKitVersion >= 532.0) {
                
                
                
                
                
                
                scale = 120;
            } else {
                
                
                scale = 12;
            }

            
            
            
            
            scale *= 3;
        } else {
            
            scale = 120;
        }

        return scale;
    }()),

    
    clickRe: /(dbl)?click/,
    
    safariKeys: {
        3: 13, 
        63234: 37, 
        63235: 39, 
        63232: 38, 
        63233: 40, 
        63276: 33, 
        63277: 34, 
        63272: 46, 
        63273: 36, 
        63275: 35 
    },
    
    btnMap: Ext.isIE ? {
        1: 0,
        4: 1,
        2: 2
    } : {
        0: 0,
        1: 1,
        2: 2
    },
    
    
    
    

    constructor: function(event, freezeEvent){
        if (event) {
            this.setEvent(event.browserEvent || event, freezeEvent);
        }
    },

    setEvent: function(event, freezeEvent){
        var me = this, button, options;

        if (event === me || (event && event.browserEvent)) { 
            return event;
        }
        me.browserEvent = event;
        if (event) {
            
            button = event.button ? me.btnMap[event.button] : (event.which ? event.which - 1 : -1);
            if (me.clickRe.test(event.type) && button == -1) {
                button = 0;
            }
            options = {
                type: event.type,
                button: button,
                shiftKey: event.shiftKey,
                
                ctrlKey: event.ctrlKey || event.metaKey || false,
                altKey: event.altKey,
                
                keyCode: event.keyCode,
                charCode: event.charCode,
                
                target: Ext.EventManager.getTarget(event),
                relatedTarget: Ext.EventManager.getRelatedTarget(event),
                currentTarget: event.currentTarget,
                xy: (freezeEvent ? me.getXY() : null)
            };
        } else {
            options = {
                button: -1,
                shiftKey: false,
                ctrlKey: false,
                altKey: false,
                keyCode: 0,
                charCode: 0,
                target: null,
                xy: [0, 0]
            };
        }
        Ext.apply(me, options);
        return me;
    },

    
    stopEvent: function(){
        this.stopPropagation();
        this.preventDefault();
    },

    
    preventDefault: function(){
        if (this.browserEvent) {
            Ext.EventManager.preventDefault(this.browserEvent);
        }
    },

    
    stopPropagation: function(){
        var browserEvent = this.browserEvent;

        if (browserEvent) {
            if (browserEvent.type == 'mousedown') {
                Ext.EventManager.stoppedMouseDownEvent.fire(this);
            }
            Ext.EventManager.stopPropagation(browserEvent);
        }
    },

    
    getCharCode: function(){
        return this.charCode || this.keyCode;
    },

    
    getKey: function(){
        return this.normalizeKey(this.keyCode || this.charCode);
    },

    
    normalizeKey: function(key){
        
        return Ext.isWebKit ? (this.safariKeys[key] || key) : key;
    },

    
    getPageX: function(){
        return this.getX();
    },

    
    getPageY: function(){
        return this.getY();
    },

    
    getX: function() {
        return this.getXY()[0];
    },

    
    getY: function() {
        return this.getXY()[1];
    },

    
    getXY: function() {
        if (!this.xy) {
            
            this.xy = Ext.EventManager.getPageXY(this.browserEvent);
        }
        return this.xy;
    },

    
    getTarget : function(selector, maxDepth, returnEl){
        if (selector) {
            return Ext.fly(this.target).findParent(selector, maxDepth, returnEl);
        }
        return returnEl ? Ext.get(this.target) : this.target;
    },

    
    getRelatedTarget : function(selector, maxDepth, returnEl){
        if (selector && this.relatedTarget) {
            return Ext.fly(this.relatedTarget).findParent(selector, maxDepth, returnEl);
        }
        return returnEl ? Ext.get(this.relatedTarget) : this.relatedTarget;
    },

    
    correctWheelDelta : function (delta) {
        var scale = this.WHEEL_SCALE,
            ret = Math.round(delta / scale);

        if (!ret && delta) {
            ret = (delta < 0) ? -1 : 1; 
        }

        return ret;
    },

    
    getWheelDeltas : function () {
        var me = this,
            event = me.browserEvent,
            dx = 0, dy = 0; 

        if (Ext.isDefined(event.wheelDeltaX)) { 
            dx = event.wheelDeltaX;
            dy = event.wheelDeltaY;
        } else if (event.wheelDelta) { 
            dy = event.wheelDelta;
        } else if (event.detail) { 
            dy = -event.detail; 

            
            
            if (dy > 100) {
                dy = 3;
            } else if (dy < -100) {
                dy = -3;
            }

            
            
            if (Ext.isDefined(event.axis) && event.axis === event.HORIZONTAL_AXIS) {
                dx = dy;
                dy = 0;
            }
        }

        return {
            x: me.correctWheelDelta(dx),
            y: me.correctWheelDelta(dy)
        };
    },

    
    getWheelDelta : function(){
        var deltas = this.getWheelDeltas();

        return deltas.y;
    },

    
    within : function(el, related, allowEl){
        if(el){
            var t = related ? this.getRelatedTarget() : this.getTarget(),
                result;

            if (t) {
                result = Ext.fly(el, '_internal').contains(t);
                if (!result && allowEl) {
                    result = t == Ext.getDom(el);
                }
                return result;
            }
        }
        return false;
    },

    
    isNavKeyPress : function(){
        var me = this,
            k = this.normalizeKey(me.keyCode);

       return (k >= 33 && k <= 40) ||  
       k == me.RETURN ||
       k == me.TAB ||
       k == me.ESC;
    },

    
    isSpecialKey : function(){
        var k = this.normalizeKey(this.keyCode);
        return (this.type == 'keypress' && this.ctrlKey) ||
        this.isNavKeyPress() ||
        (k == this.BACKSPACE) || 
        (k >= 16 && k <= 20) || 
        (k >= 44 && k <= 46);   
    },

    
    getPoint : function(){
        var xy = this.getXY();
        return new Ext.util.Point(xy[0], xy[1]);
    },

   
    hasModifier : function(){
        return this.ctrlKey || this.altKey || this.shiftKey || this.metaKey;
    },

    
    injectEvent: (function () {
        var API,
            dispatchers = {}, 
            crazyIEButtons;

        

        
        

        if (!Ext.isIE9m && document.createEvent) { 
            API = {
                createHtmlEvent: function (doc, type, bubbles, cancelable) {
                    var event = doc.createEvent('HTMLEvents');

                    event.initEvent(type, bubbles, cancelable);
                    return event;
                },

                createMouseEvent: function (doc, type, bubbles, cancelable, detail,
                                            clientX, clientY, ctrlKey, altKey, shiftKey, metaKey,
                                            button, relatedTarget) {
                    var event = doc.createEvent('MouseEvents'),
                        view = doc.defaultView || window;

                    if (event.initMouseEvent) {
                        event.initMouseEvent(type, bubbles, cancelable, view, detail,
                                    clientX, clientY, clientX, clientY, ctrlKey, altKey,
                                    shiftKey, metaKey, button, relatedTarget);
                    } else { 
                        event = doc.createEvent('UIEvents');
                        event.initEvent(type, bubbles, cancelable);
                        event.view = view;
                        event.detail = detail;
                        event.screenX = clientX;
                        event.screenY = clientY;
                        event.clientX = clientX;
                        event.clientY = clientY;
                        event.ctrlKey = ctrlKey;
                        event.altKey = altKey;
                        event.metaKey = metaKey;
                        event.shiftKey = shiftKey;
                        event.button = button;
                        event.relatedTarget = relatedTarget;
                    }

                    return event;
                },

                createUIEvent: function (doc, type, bubbles, cancelable, detail) {
                    var event = doc.createEvent('UIEvents'),
                        view = doc.defaultView || window;

                    event.initUIEvent(type, bubbles, cancelable, view, detail);
                    return event;
                },

                fireEvent: function (target, type, event) {
                    target.dispatchEvent(event);
                },

                fixTarget: function (target) {
                    
                    if (target == window && !target.dispatchEvent) {
                        return document;
                    }

                    return target;
                }
            };
        } else if (document.createEventObject) { 
            crazyIEButtons = { 0: 1, 1: 4, 2: 2 };

            API = {
                createHtmlEvent: function (doc, type, bubbles, cancelable) {
                    var event = doc.createEventObject();
                    event.bubbles = bubbles;
                    event.cancelable = cancelable;
                    return event;
                },

                createMouseEvent: function (doc, type, bubbles, cancelable, detail,
                                            clientX, clientY, ctrlKey, altKey, shiftKey, metaKey,
                                            button, relatedTarget) {
                    var event = doc.createEventObject();
                    event.bubbles = bubbles;
                    event.cancelable = cancelable;
                    event.detail = detail;
                    event.screenX = clientX;
                    event.screenY = clientY;
                    event.clientX = clientX;
                    event.clientY = clientY;
                    event.ctrlKey = ctrlKey;
                    event.altKey = altKey;
                    event.shiftKey = shiftKey;
                    event.metaKey = metaKey;
                    event.button = crazyIEButtons[button] || button;
                    event.relatedTarget = relatedTarget; 
                    return event;
                },

                createUIEvent: function (doc, type, bubbles, cancelable, detail) {
                    var event = doc.createEventObject();
                    event.bubbles = bubbles;
                    event.cancelable = cancelable;
                    return event;
                },

                fireEvent: function (target, type, event) {
                    target.fireEvent('on' + type, event);
                },

                fixTarget: function (target) {
                    if (target == document) {
                        
                        
                        return document.documentElement;
                    }

                    return target;
                }
            };
        }

        
        

        Ext.Object.each({
                load:   [false, false],
                unload: [false, false],
                select: [true, false],
                change: [true, false],
                submit: [true, true],
                reset:  [true, false],
                resize: [true, false],
                scroll: [true, false]
            },
            function (name, value) {
                var bubbles = value[0], cancelable = value[1];
                dispatchers[name] = function (targetEl, srcEvent) {
                    var e = API.createHtmlEvent(name, bubbles, cancelable);
                    API.fireEvent(targetEl, name, e);
                };
            });

        
        

        function createMouseEventDispatcher (type, detail) {
            var cancelable = (type != 'mousemove');
            return function (targetEl, srcEvent) {
                var xy = srcEvent.getXY(),
                    e = API.createMouseEvent(targetEl.ownerDocument, type, true, cancelable,
                                detail, xy[0], xy[1], srcEvent.ctrlKey, srcEvent.altKey,
                                srcEvent.shiftKey, srcEvent.metaKey, srcEvent.button,
                                srcEvent.relatedTarget);
                API.fireEvent(targetEl, type, e);
            };
        }

        Ext.each(['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'mouseout'],
            function (eventName) {
                dispatchers[eventName] = createMouseEventDispatcher(eventName, 1);
            });

        
        

        Ext.Object.each({
                focusin:  [true, false],
                focusout: [true, false],
                activate: [true, true],
                focus:    [false, false],
                blur:     [false, false]
            },
            function (name, value) {
                var bubbles = value[0], cancelable = value[1];
                dispatchers[name] = function (targetEl, srcEvent) {
                    var e = API.createUIEvent(targetEl.ownerDocument, name, bubbles, cancelable, 1);
                    API.fireEvent(targetEl, name, e);
                };
            });

        
        if (!API) {
            

            dispatchers = {}; 

            API = {
                fixTarget: Ext.identityFn
            };
        }

        function cannotInject (target, srcEvent) {
        }

        return function (target) {
            var me = this,
                dispatcher = dispatchers[me.type] || cannotInject,
                t = target ? (target.dom || target) : me.getTarget();

            t = API.fixTarget(t);
            dispatcher(t, me);
        };
    }()) 

}, function() {

Ext.EventObject = new Ext.EventObjectImpl();

});






Ext.define('Ext.dom.AbstractQuery', {
    
    select: function(q, root) {
        var results = [],
            nodes,
            i,
            j,
            qlen,
            nlen;

        root = root || document;

        if (typeof root == 'string') {
            root = document.getElementById(root);
        }

        q = q.split(",");

        for (i = 0,qlen = q.length; i < qlen; i++) {
            if (typeof q[i] == 'string') {
                
                
                if (typeof q[i][0] == '@') {
                    nodes = root.getAttributeNode(q[i].substring(1));
                    results.push(nodes);
                } else {
                    nodes = root.querySelectorAll(q[i]);

                    for (j = 0,nlen = nodes.length; j < nlen; j++) {
                        results.push(nodes[j]);
                    }
                }
            }
        }

        return results;
    },

    
    selectNode: function(q, root) {
        return this.select(q, root)[0];
    },

    
    is: function(el, q) {
        if (typeof el == "string") {
            el = document.getElementById(el);
        }
        return this.select(q).indexOf(el) !== -1;
    }

});





Ext.define('Ext.dom.AbstractHelper', {
    emptyTags : /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe : /^(?:tag|children|cn|html|tpl|tplData)$/i,
    endRe : /end/i,
    styleSepRe: /\s*(?::|;)\s*/,

    
    attributeTransform: { cls : 'class', htmlFor : 'for' },

    closeTags: {},

    decamelizeName : (function () {
        var camelCaseRe = /([a-z])([A-Z])/g,
            cache = {};

        function decamel (match, p1, p2) {
            return p1 + '-' + p2.toLowerCase();
        }

        return function (s) {
            return cache[s] || (cache[s] = s.replace(camelCaseRe, decamel));
        };
    }()),

    generateMarkup: function(spec, buffer) {
        var me = this,
            specType = typeof spec,
            attr, val, tag, i, closeTags;

        if (specType == "string" || specType == "number") {
            buffer.push(spec);
        } else if (Ext.isArray(spec)) {
            for (i = 0; i < spec.length; i++) {
                if (spec[i]) {
                    me.generateMarkup(spec[i], buffer);
                }
            }
        } else {
            tag = spec.tag || 'div';
            buffer.push('<', tag);

            for (attr in spec) {
                if (spec.hasOwnProperty(attr)) {
                    val = spec[attr];
                    if (!me.confRe.test(attr)) {
                        if (typeof val == "object") {
                            buffer.push(' ', attr, '="');
                            me.generateStyles(val, buffer).push('"');
                        } else {
                            buffer.push(' ', me.attributeTransform[attr] || attr, '="', val, '"');
                        }
                    }
                }
            }

            
            if (me.emptyTags.test(tag)) {
                buffer.push('/>');
            } else {
                buffer.push('>');

                
                if ((val = spec.tpl)) {
                    val.applyOut(spec.tplData, buffer);
                }
                if ((val = spec.html)) {
                    buffer.push(val);
                }
                if ((val = spec.cn || spec.children)) {
                    me.generateMarkup(val, buffer);
                }

                
                closeTags = me.closeTags;
                buffer.push(closeTags[tag] || (closeTags[tag] = '</' + tag + '>'));
            }
        }

        return buffer;
    },

    
    generateStyles: function (styles, buffer) {
        var a = buffer || [],
            name;

        for (name in styles) {
            if (styles.hasOwnProperty(name)) {
                a.push(this.decamelizeName(name), ':', styles[name], ';');
            }
        }

        return buffer || a.join('');
    },

    
    markup: function(spec) {
        if (typeof spec == "string") {
            return spec;
        }

        var buf = this.generateMarkup(spec, []);
        return buf.join('');
    },

    
    applyStyles: function(el, styles) {
        if (styles) {
            var i = 0,
                len;

            el = Ext.fly(el, '_applyStyles');
            if (typeof styles == 'function') {
                styles = styles.call();
            }
            if (typeof styles == 'string') {
                styles = Ext.util.Format.trim(styles).split(this.styleSepRe);
                for (len = styles.length; i < len;) {
                    el.setStyle(styles[i++], styles[i++]);
                }
            } else if (Ext.isObject(styles)) {
                el.setStyle(styles);
            }
        }
    },

    
    insertHtml: function(where, el, html) {
        var hash = {},
            setStart,
            range,
            frag,
            rangeEl;

        where = where.toLowerCase();

        
        hash['beforebegin'] = ['BeforeBegin', 'previousSibling'];
        hash['afterend'] = ['AfterEnd', 'nextSibling'];

        range = el.ownerDocument.createRange();
        setStart = 'setStart' + (this.endRe.test(where) ? 'After' : 'Before');
        if (hash[where]) {
            range[setStart](el);
            frag = range.createContextualFragment(html);
            el.parentNode.insertBefore(frag, where == 'beforebegin' ? el : el.nextSibling);
            return el[(where == 'beforebegin' ? 'previous' : 'next') + 'Sibling'];
        }
        else {
            rangeEl = (where == 'afterbegin' ? 'first' : 'last') + 'Child';
            if (el.firstChild) {
                range[setStart](el[rangeEl]);
                frag = range.createContextualFragment(html);
                if (where == 'afterbegin') {
                    el.insertBefore(frag, el.firstChild);
                }
                else {
                    el.appendChild(frag);
                }
            }
            else {
                el.innerHTML = html;
            }
            return el[rangeEl];
        }

        throw 'Illegal insertion point -> "' + where + '"';
    },

    
    insertBefore: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforebegin');
    },

    
    insertAfter: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterend', 'nextSibling');
    },

    
    insertFirst: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterbegin', 'firstChild');
    },

    
    append: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforeend', '', true);
    },

    
    overwrite: function(el, o, returnElement) {
        el = Ext.getDom(el);
        el.innerHTML = this.markup(o);
        return returnElement ? Ext.get(el.firstChild) : el.firstChild;
    },

    doInsert: function(el, o, returnElement, pos, sibling, append) {
        var newNode = this.insertHtml(pos, Ext.getDom(el), this.markup(o));
        return returnElement ? Ext.get(newNode, true) : newNode;
    }

});



Ext.define('Ext.dom.AbstractElement_static', {
    override: 'Ext.dom.AbstractElement',

    inheritableStatics: {
        unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
        camelRe: /(-[a-z])/gi,
        msRe: /^-ms-/,
        cssRe: /([a-z0-9\-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*)?;?/gi,
        opacityRe: /alpha\(opacity=(.*)\)/i,
        propertyCache: {},
        defaultUnit : "px",
        borders: {l: 'border-left-width', r: 'border-right-width', t: 'border-top-width', b: 'border-bottom-width'},
        paddings: {l: 'padding-left', r: 'padding-right', t: 'padding-top', b: 'padding-bottom'},
        margins: {l: 'margin-left', r: 'margin-right', t: 'margin-top', b: 'margin-bottom'},
        
        addUnits: function(size, units) {
            
            if (typeof size == 'number') {
                return size + (units || this.defaultUnit || 'px');
            }

            
            if (size === "" || size == "auto" || size === undefined || size === null) {
                return size || '';
            }

            
            if (!this.unitRe.test(size)) {
                return size || '';
            }

            return size;
        },

        
        isAncestor: function(p, c) {
            var ret = false;

            p = Ext.getDom(p);
            c = Ext.getDom(c);
            if (p && c) {
                if (p.contains) {
                    return p.contains(c);
                } else if (p.compareDocumentPosition) {
                    return !!(p.compareDocumentPosition(c) & 16);
                } else {
                    while ((c = c.parentNode)) {
                        ret = c == p || ret;
                    }
                }
            }
            return ret;
        },

        
        parseBox: function(box) {
            box = box || 0;
            
            var type = typeof box,
                parts,
                ln;

            if (type === 'number') {
                return {
                    top   : box,
                    right : box,
                    bottom: box,
                    left  : box
                };
             } else if (type !== 'string') {
                 
                 return box;
             }

            parts  = box.split(' ');
            ln = parts.length;

            if (ln == 1) {
                parts[1] = parts[2] = parts[3] = parts[0];
            } else if (ln == 2) {
                parts[2] = parts[0];
                parts[3] = parts[1];
            } else if (ln == 3) {
                parts[3] = parts[1];
            }

            return {
                top   :parseFloat(parts[0]) || 0,
                right :parseFloat(parts[1]) || 0,
                bottom:parseFloat(parts[2]) || 0,
                left  :parseFloat(parts[3]) || 0
            };
        },

        
        unitizeBox: function(box, units) {
            var a = this.addUnits,
                b = this.parseBox(box);

            return a(b.top, units) + ' ' +
                   a(b.right, units) + ' ' +
                   a(b.bottom, units) + ' ' +
                   a(b.left, units);

        },

        
        camelReplaceFn: function(m, a) {
            return a.charAt(1).toUpperCase();
        },

        
        normalize: function(prop) {
            
            if (prop == 'float') {
                prop = Ext.supports.Float ? 'cssFloat' : 'styleFloat';
            }
            
            return this.propertyCache[prop] || (this.propertyCache[prop] = prop.replace(this.msRe, 'ms-').replace(this.camelRe, this.camelReplaceFn));
        },

        
        getDocumentHeight: function() {
            return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight());
        },

        
        getDocumentWidth: function() {
            return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth());
        },

        
        getViewportHeight: function(){
            return window.innerHeight;
        },

        
        getViewportWidth: function() {
            return window.innerWidth;
        },

        
        getViewSize: function() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        },

        
        getOrientation: function() {
            if (Ext.supports.OrientationChange) {
                return (window.orientation == 0) ? 'portrait' : 'landscape';
            }

            return (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
        },

        
        fromPoint: function(x, y) {
            return Ext.get(document.elementFromPoint(x, y));
        },

        
        parseStyles: function(styles){
            var out = {},
                cssRe = this.cssRe,
                matches;

            if (styles) {
                
                
                
                
                cssRe.lastIndex = 0;
                while ((matches = cssRe.exec(styles))) {
                    out[matches[1]] = matches[2]||'';
                }
            }
            return out;
        }
    }
},
function () {
    var doc = document,
        activeElement = null,
        isCSS1 = doc.compatMode == "CSS1Compat";

    
    
    
    if (!('activeElement' in doc) && doc.addEventListener) {
        doc.addEventListener('focus',
            function (ev) {
                if (ev && ev.target) {
                    activeElement = (ev.target == doc) ? null : ev.target;
                }
            }, true);
    }

    
    function makeSelectionRestoreFn (activeEl, start, end) {
        return function () {
            activeEl.selectionStart = start;
            activeEl.selectionEnd = end;
        };
    }

    this.addInheritableStatics({
        
        getActiveElement: function () {
            var active;
            
            
            
            try {
                active = doc.activeElement;
            } catch(e) {}
            
            
            
            active = active || activeElement;
            if (!active) {
                active = activeElement = document.body;
            }
            return active;
        },

        
        getRightMarginFixCleaner: function (target) {
            var supports = Ext.supports,
                hasInputBug = supports.DisplayChangeInputSelectionBug,
                hasTextAreaBug = supports.DisplayChangeTextAreaSelectionBug,
                activeEl,
                tag,
                start,
                end;

            if (hasInputBug || hasTextAreaBug) {
                activeEl = doc.activeElement || activeElement; 
                tag = activeEl && activeEl.tagName;

                if ((hasTextAreaBug && tag == 'TEXTAREA') ||
                    (hasInputBug && tag == 'INPUT' && activeEl.type == 'text')) {
                    if (Ext.dom.Element.isAncestor(target, activeEl)) {
                        start = activeEl.selectionStart;
                        end = activeEl.selectionEnd;

                        if (Ext.isNumber(start) && Ext.isNumber(end)) { 
                            
                            
                            
                            
                            return makeSelectionRestoreFn(activeEl, start, end);
                        }
                    }
                }
            }

            return Ext.emptyFn; 
        },

        getViewWidth: function(full) {
            return full ? Ext.dom.Element.getDocumentWidth() : Ext.dom.Element.getViewportWidth();
        },

        getViewHeight: function(full) {
            return full ? Ext.dom.Element.getDocumentHeight() : Ext.dom.Element.getViewportHeight();
        },

        getDocumentHeight: function() {
            return Math.max(!isCSS1 ? doc.body.scrollHeight : doc.documentElement.scrollHeight, Ext.dom.Element.getViewportHeight());
        },

        getDocumentWidth: function() {
            return Math.max(!isCSS1 ? doc.body.scrollWidth : doc.documentElement.scrollWidth, Ext.dom.Element.getViewportWidth());
        },

        getViewportHeight: function(){
            return Ext.isIE9m ?
                   (Ext.isStrict ? doc.documentElement.clientHeight : doc.body.clientHeight) :
                   self.innerHeight;
        },

        getViewportWidth: function() {
            return (!Ext.isStrict && !Ext.isOpera) ? doc.body.clientWidth :
                   Ext.isIE9m ? doc.documentElement.clientWidth : self.innerWidth;
        },

        
        serializeForm: function(form) {
            var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements,
                hasSubmit = false,
                encoder   = encodeURIComponent,
                data      = '',
                eLen      = fElements.length,
                element, name, type, options, hasValue, e,
                o, oLen, opt;

            for (e = 0; e < eLen; e++) {
                element = fElements[e];
                name    = element.name;
                type    = element.type;
                options = element.options;

                if (!element.disabled && name) {
                    if (/select-(one|multiple)/i.test(type)) {
                        oLen = options.length;
                        for (o = 0; o < oLen; o++) {
                            opt = options[o];
                            if (opt.selected) {
                                hasValue = opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttributeNode('value').specified;
                                data += Ext.String.format("{0}={1}&", encoder(name), encoder(hasValue ? opt.value : opt.text));
                            }
                        }
                    } else if (!(/file|undefined|reset|button/i.test(type))) {
                        if (!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)) {
                            data += encoder(name) + '=' + encoder(element.value) + '&';
                            hasSubmit = /submit/i.test(type);
                        }
                    }
                }
            }
            return data.substr(0, data.length - 1);
        }
    });
});



Ext.define('Ext.dom.AbstractElement_insertion', {
    override: 'Ext.dom.AbstractElement',

    
    appendChild: function(el, returnDom) {
        var me = this,
            insertEl,
            eLen, e, oldUseDom;

        if (el.nodeType || el.dom || typeof el == 'string') { 
            el = Ext.getDom(el);
            me.dom.appendChild(el);
            return !returnDom ? Ext.get(el) : el;
        } else if (el.length) {
            
            insertEl = Ext.fly(document.createDocumentFragment(), '_internal');
            eLen = el.length;

            
            Ext.DomHelper.useDom = true;
            for (e = 0; e < eLen; e++) {
                insertEl.appendChild(el[e], returnDom);
            }
            Ext.DomHelper.useDom = oldUseDom;
            me.dom.appendChild(insertEl.dom);
            return returnDom ? insertEl.dom : insertEl;
        }
        else { 
            return me.createChild(el, null, returnDom);
        }
    },

    
    appendTo: function(el) {
        Ext.getDom(el).appendChild(this.dom);
        return this;
    },

    
    insertBefore: function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el);
        return this;
    },

    
    insertAfter: function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el.nextSibling);
        return this;
    },

    
    insertFirst: function(el, returnDom) {
        el = el || {};
        if (el.nodeType || el.dom || typeof el == 'string') { 
            el = Ext.getDom(el);
            this.dom.insertBefore(el, this.dom.firstChild);
            return !returnDom ? Ext.get(el) : el;
        }
        else { 
            return this.createChild(el, this.dom.firstChild, returnDom);
        }
    },

    
    insertSibling: function(el, where, returnDom) {
        var me        = this,
            DomHelper = Ext.core.DomHelper,
            oldUseDom = DomHelper.useDom,
            isAfter   = (where || 'before').toLowerCase() == 'after',
            rt, insertEl, eLen, e;

        if (Ext.isArray(el)) {
            
            insertEl = Ext.fly(document.createDocumentFragment(), '_internal');
            eLen = el.length;

            
            DomHelper.useDom = true;
            for (e = 0; e < eLen; e++) {
                rt = insertEl.appendChild(el[e], returnDom);
            }
            DomHelper.useDom = oldUseDom;

            
            me.dom.parentNode.insertBefore(insertEl.dom, isAfter ? me.dom.nextSibling : me.dom);
            return rt;
        }

        el = el || {};

        if (el.nodeType || el.dom) {
            rt = me.dom.parentNode.insertBefore(Ext.getDom(el), isAfter ? me.dom.nextSibling : me.dom);
            if (!returnDom) {
                rt = Ext.get(rt);
            }
        } else {
            if (isAfter && !me.dom.nextSibling) {
                rt = DomHelper.append(me.dom.parentNode, el, !returnDom);
            } else {
                rt = DomHelper[isAfter ? 'insertAfter' : 'insertBefore'](me.dom, el, !returnDom);
            }
        }
        return rt;
    },

    
    replace: function(el) {
        el = Ext.get(el);
        this.insertBefore(el);
        el.remove();
        return this;
    },

    
    replaceWith: function(el){
        var me = this;

        if (el.nodeType || el.dom || typeof el == 'string') {
            el = Ext.get(el);
            me.dom.parentNode.insertBefore(el.dom, me.dom);
        } else {
            el = Ext.core.DomHelper.insertBefore(me.dom, el);
        }

        delete Ext.cache[me.id];
        Ext.removeNode(me.dom);
        me.id = Ext.id(me.dom = el);
        Ext.dom.AbstractElement.addToCache(me.isFlyweight ? new Ext.dom.AbstractElement(me.dom) : me);
        return me;
    },

    
    createChild: function(config, insertBefore, returnDom) {
        config = config || {tag:'div'};
        if (insertBefore) {
            return Ext.core.DomHelper.insertBefore(insertBefore, config, returnDom !== true);
        }
        else {
            return Ext.core.DomHelper.append(this.dom, config,  returnDom !== true);
        }
    },

    
    wrap: function(config, returnDom, selector) {
        var newEl = Ext.core.DomHelper.insertBefore(this.dom, config || {tag: "div"}, true),
            target = newEl;
        
        if (selector) {
            target = Ext.DomQuery.selectNode(selector, newEl.dom);
        }

        target.appendChild(this.dom);
        return returnDom ? newEl.dom : newEl;
    },

    
    insertHtml: function(where, html, returnEl) {
        var el = Ext.core.DomHelper.insertHtml(where, this.dom, html);
        return returnEl ? Ext.get(el) : el;
    }
});



Ext.define('Ext.dom.AbstractElement_style', {

    override: 'Ext.dom.AbstractElement'

}, function() {
    
    var Element = this,
        wordsRe = /\w/g,
        spacesRe = /\s+/,
        transparentRe = /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
        
        
        
        
        hasClassList = Ext.supports.ClassList,
        PADDING = 'padding',
        MARGIN = 'margin',
        BORDER = 'border',
        LEFT_SUFFIX = '-left',
        RIGHT_SUFFIX = '-right',
        TOP_SUFFIX = '-top',
        BOTTOM_SUFFIX = '-bottom',
        WIDTH = '-width',
        
        borders = {l: BORDER + LEFT_SUFFIX + WIDTH, r: BORDER + RIGHT_SUFFIX + WIDTH, t: BORDER + TOP_SUFFIX + WIDTH, b: BORDER + BOTTOM_SUFFIX + WIDTH},
        paddings = {l: PADDING + LEFT_SUFFIX, r: PADDING + RIGHT_SUFFIX, t: PADDING + TOP_SUFFIX, b: PADDING + BOTTOM_SUFFIX},
        margins = {l: MARGIN + LEFT_SUFFIX, r: MARGIN + RIGHT_SUFFIX, t: MARGIN + TOP_SUFFIX, b: MARGIN + BOTTOM_SUFFIX},
        internalFly = new Element.Fly();


    Ext.override(Element, {

        
        styleHooks: {},

        
        addStyles : function(sides, styles){
            var totalSize = 0,
                sidesArr = (sides || '').match(wordsRe),
                i,
                len = sidesArr.length,
                side,
                styleSides = [];

            if (len == 1) {
                totalSize = Math.abs(parseFloat(this.getStyle(styles[sidesArr[0]])) || 0);
            } else if (len) {
                for (i = 0; i < len; i++) {
                    side = sidesArr[i];
                    styleSides.push(styles[side]);
                }
                
                styleSides = this.getStyle(styleSides);

                for (i=0; i < len; i++) {
                    side = sidesArr[i];
                    totalSize += Math.abs(parseFloat(styleSides[styles[side]]) || 0);
                }
            }

            return totalSize;
        },

        
        addCls: (function(){
            var addWithClassList = function(className) {
                var me = this,
                    dom = me.dom,
                    trimRe = me.trimRe,
                    origClassName = className,
                    classList,
                    newCls,
                    i,
                    len,
                    cls;

                if (typeof(className) == 'string') {
                    
                    className = className.replace(trimRe, '').split(spacesRe);
                }

                
                
                if (dom && className && !!(len = className.length)) {
                    if (!dom.className) {
                        dom.className = className.join(' ');
                    } else {
                        classList = dom.classList;
                        if (classList) {
                            for (i = 0; i < len; ++i) {
                                cls = className[i];
                                if (cls) {
                                    if (!classList.contains(cls)) {
                                        if (newCls) {
                                            newCls.push(cls);
                                        } else {
                                            newCls = dom.className.replace(trimRe, '');
                                            newCls = newCls ? [newCls, cls] : [cls];
                                        }
                                    }
                                }
                            }

                            if (newCls) {
                                dom.className = newCls.join(' '); 
                            }
                        } else {
                            addWithoutClassList(origClassName);
                        }
                    }
                }
                return me;
            }, addWithoutClassList = function(className) {
                var me = this,
                    dom = me.dom,
                    elClasses;

                if (dom && className && className.length) {
                    elClasses = Ext.Element.mergeClsList(dom.className, className);
                    if (elClasses.changed) {
                        dom.className = elClasses.join(' '); 
                    }
                }
                return me;
            };
            
            return hasClassList ? addWithClassList : addWithoutClassList;
        })(),


        
        removeCls: function(className) {
            var me = this,
                dom = me.dom,
                classList,
                len,
                elClasses;

            if (typeof(className) == 'string') {
                
                className = className.replace(me.trimRe, '').split(spacesRe);
            }

            if (dom && dom.className && className && !!(len = className.length)) {
                classList = dom.classList;
                if (len === 1 && classList) {
                    if (className[0]) {
                        classList.remove(className[0]); 
                    }
                } else {
                    elClasses = Ext.Element.removeCls(dom.className, className);
                    if (elClasses.changed) {
                        dom.className = elClasses.join(' ');
                    }
                }
            }
            return me;
        },

        
        radioCls: function(className) {
            var cn = this.dom.parentNode.childNodes,
                v,
                i, len;
            className = Ext.isArray(className) ? className: [className];
            for (i = 0, len = cn.length; i < len; i++) {
                v = cn[i];
                if (v && v.nodeType == 1) {
                    internalFly.attach(v).removeCls(className);
                }
            }
            return this.addCls(className);
        },

        
        toggleCls: (function(){
            var toggleWithClassList = function(className){
                var me = this,
                    dom = me.dom,
                    classList;

                if (dom) {
                    className = className.replace(me.trimRe, '');
                    if (className) {
                        classList = dom.classList;
                        if (classList) {
                            classList.toggle(className);
                        } else {
                            toggleWithoutClassList(className);
                        }
                    }
                }

                return me;
            }, toggleWithoutClassList = function(className){
                return this.hasCls(className) ? this.removeCls(className) : this.addCls(className);
            };
            
            return hasClassList ? toggleWithClassList :  toggleWithoutClassList;
        })(),

        
        hasCls: (function(){
            var hasClsWithClassList = function(className) {
                var dom = this.dom,
                    out = false,
                    classList;
                    
                if (dom && className) {
                    classList = dom.classList;
                    if (classList) {
                        out = classList.contains(className);
                    } else {
                        out = hasClsWithoutClassList(className);
                    }
                }
                return out;
            }, hasClsWithoutClassList = function(className){
                var dom = this.dom;
                return dom ? className && (' '+dom.className+' ').indexOf(' '+className+' ') !== -1 : false;
            };
            
            return hasClassList ? hasClsWithClassList : hasClsWithoutClassList;
        })(),

        
        replaceCls: function(oldClassName, newClassName){
            return this.removeCls(oldClassName).addCls(newClassName);
        },

        
        isStyle: function(style, val) {
            return this.getStyle(style) == val;
        },

        
        getStyle: function (property, inline) {
            var me = this,
                dom = me.dom,
                multiple = typeof property != 'string',
                hooks = me.styleHooks,
                prop = property,
                props = prop,
                len = 1,
                domStyle, camel, values, hook, out, style, i;

            if (multiple) {
                values = {};
                prop = props[0];
                i = 0;
                if (!(len = props.length)) {
                    return values;
                }
            }

            if (!dom || dom.documentElement) {
                return values || '';
            }

            domStyle = dom.style;

            if (inline) {
                style = domStyle;
            } else {
                
                
                
                
                style = dom.ownerDocument.defaultView.getComputedStyle(dom, null);

                
                if (!style) {
                    inline = true;
                    style = domStyle;
                }
            }

            do {
                hook = hooks[prop];

                if (!hook) {
                    hooks[prop] = hook = { name: Element.normalize(prop) };
                }

                if (hook.get) {
                    out = hook.get(dom, me, inline, style);
                } else {
                    camel = hook.name;
                    out = style[camel];
                }

                if (!multiple) {
                   return out;
                }

                values[prop] = out;
                prop = props[++i];
            } while (i < len);

            return values;
        },

        getStyles: function () {
            var props = Ext.Array.slice(arguments),
                len = props.length,
                inline;

            if (len && typeof props[len-1] == 'boolean') {
                inline = props.pop();
            }

            return this.getStyle(props, inline);
        },

        
        isTransparent: function (prop) {
            var value = this.getStyle(prop);
            return value ? transparentRe.test(value) : false;
        },

        
        setStyle: function(prop, value) {
            var me = this,
                dom = me.dom,
                hooks = me.styleHooks,
                style = dom.style,
                name = prop,
                hook;

            
            if (typeof name == 'string') {
                hook = hooks[name];
                if (!hook) {
                    hooks[name] = hook = { name: Element.normalize(name) };
                }
                value = (value == null) ? '' : value;
                if (hook.set) {
                    hook.set(dom, value, me);
                } else {
                    style[hook.name] = value;
                }
                if (hook.afterSet) {
                    hook.afterSet(dom, value, me);
                }
            } else {
                for (name in prop) {
                    if (prop.hasOwnProperty(name)) {
                        hook = hooks[name];
                        if (!hook) {
                            hooks[name] = hook = { name: Element.normalize(name) };
                        }
                        value = prop[name];
                        value = (value == null) ? '' : value;
                        if (hook.set) {
                            hook.set(dom, value, me);
                        } else {
                            style[hook.name] = value;
                        }
                        if (hook.afterSet) {
                            hook.afterSet(dom, value, me);
                        }
                    }
                }
            }

            return me;
        },

        
        getHeight: function(contentHeight) {
            var dom = this.dom,
                height = contentHeight ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight;
            return height > 0 ? height: 0;
        },

        
        getWidth: function(contentWidth) {
            var dom = this.dom,
                width = contentWidth ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth;
            return width > 0 ? width: 0;
        },

        
        setWidth: function(width) {
            var me = this;
                me.dom.style.width = Element.addUnits(width);
            return me;
        },

        
        setHeight: function(height) {
            var me = this;
                me.dom.style.height = Element.addUnits(height);
            return me;
        },

        
        getBorderWidth: function(side){
            return this.addStyles(side, borders);
        },

        
        getPadding: function(side){
            return this.addStyles(side, paddings);
        },

        margins : margins,

        
        applyStyles: function(styles) {
            if (styles) {
                var i,
                    len,
                    dom = this.dom;

                if (typeof styles == 'function') {
                    styles = styles.call();
                }
                if (typeof styles == 'string') {
                    styles = Ext.util.Format.trim(styles).split(/\s*(?::|;)\s*/);
                    for (i = 0, len = styles.length; i < len;) {
                        dom.style[Element.normalize(styles[i++])] = styles[i++];
                    }
                }
                else if (typeof styles == 'object') {
                    this.setStyle(styles);
                }
            }
        },

        
        setSize: function(width, height) {
            var me = this,
                style = me.dom.style;

            if (Ext.isObject(width)) {
                
                height = width.height;
                width = width.width;
            }

            style.width = Element.addUnits(width);
            style.height = Element.addUnits(height);
            return me;
        },

        
        getViewSize: function() {
            var doc = document,
                dom = this.dom;

            if (dom == doc || dom == doc.body) {
                return {
                    width: Element.getViewportWidth(),
                    height: Element.getViewportHeight()
                };
            }
            else {
                return {
                    width: dom.clientWidth,
                    height: dom.clientHeight
                };
            }
        },

        
        getSize: function(contentSize) {
            var dom = this.dom;
            return {
                width: Math.max(0, contentSize ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth),
                height: Math.max(0, contentSize ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight)
            };
        },

        
        repaint: function() {
            var dom = this.dom;
            this.addCls(Ext.baseCSSPrefix + 'repaint');
            setTimeout(function(){
                internalFly.attach(dom).removeCls(Ext.baseCSSPrefix + 'repaint');
            }, 1);
            return this;
        },

        
        getMargin: function(side){
            var me = this,
                hash = {t:"top", l:"left", r:"right", b: "bottom"},
                key,
                o,
                margins;

            if (!side) {
                margins = [];
                for (key in me.margins) {
                    if(me.margins.hasOwnProperty(key)) {
                        margins.push(me.margins[key]);
                    }
                }
                o = me.getStyle(margins);
                if(o && typeof o == 'object') {
                    
                    for (key in me.margins) {
                        if(me.margins.hasOwnProperty(key)) {
                            o[hash[key]] = parseFloat(o[me.margins[key]]) || 0;
                        }
                    }
                }

                return o;
            } else {
                return me.addStyles(side, me.margins);
            }
        },

        
        mask: function(msg, msgCls, transparent) {
            var me = this,
                dom = me.dom,
                data = (me.$cache || me.getCache()).data,
                el = data.mask,
                mask,
                size,
                cls = '',
                prefix = Ext.baseCSSPrefix;

            me.addCls(prefix + 'masked');
            if (me.getStyle("position") == "static") {
                me.addCls(prefix + 'masked-relative');
            }
            if (el) {
                el.remove();
            }
            if (msgCls && typeof msgCls == 'string' ) {
                cls = ' ' + msgCls;
            }
            else {
                cls = ' ' + prefix + 'mask-gray';
            }

            mask = me.createChild({
                cls: prefix + 'mask' + ((transparent !== false) ? '' : (' ' + prefix + 'mask-gray')),
                html: msg ? ('<div class="' + (msgCls || (prefix + 'mask-message')) + '">' + msg + '</div>') : ''
            });

            size = me.getSize();

            data.mask = mask;

            if (dom === document.body) {
                size.height = window.innerHeight;
                if (me.orientationHandler) {
                    Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                }

                me.orientationHandler = function() {
                    size = me.getSize();
                    size.height = window.innerHeight;
                    mask.setSize(size);
                };

                Ext.EventManager.onOrientationChange(me.orientationHandler, me);
            }
            mask.setSize(size);
            if (Ext.is.iPad) {
                Ext.repaint();
            }
        },

        
        unmask: function() {
            var me = this,
                data = (me.$cache || me.getCache()).data,
                mask = data.mask,
                prefix = Ext.baseCSSPrefix;

            if (mask) {
                mask.remove();
                delete data.mask;
            }
            me.removeCls([prefix + 'masked', prefix + 'masked-relative']);

            if (me.dom === document.body) {
                Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                delete me.orientationHandler;
            }
        }
    });


    Ext.onReady(function () {
        var supports = Ext.supports,
            styleHooks,
            colorStyles, i, name, camel;

        function fixTransparent (dom, el, inline, style) {
            var value = style[this.name] || '';
            return transparentRe.test(value) ? 'transparent' : value;
        }

        function fixRightMargin (dom, el, inline, style) {
            var result = style.marginRight,
                domStyle, display;

            
            
            if (result != '0px') {
                domStyle = dom.style;
                display = domStyle.display;
                domStyle.display = 'inline-block';
                result = (inline ? style : dom.ownerDocument.defaultView.getComputedStyle(dom, null)).marginRight;
                domStyle.display = display;
            }

            return result;
        }

        function fixRightMarginAndInputFocus (dom, el, inline, style) {
            var result = style.marginRight,
                domStyle, cleaner, display;

            if (result != '0px') {
                domStyle = dom.style;
                cleaner = Element.getRightMarginFixCleaner(dom);
                display = domStyle.display;
                domStyle.display = 'inline-block';
                result = (inline ? style : dom.ownerDocument.defaultView.getComputedStyle(dom, '')).marginRight;
                domStyle.display = display;
                cleaner();
            }

            return result;
        }

        styleHooks = Element.prototype.styleHooks;

        
        
        if (supports.init) {
            supports.init();
        }

        
        if (!supports.RightMargin) {
            styleHooks.marginRight = styleHooks['margin-right'] = {
                name: 'marginRight',
                
                
                get: (supports.DisplayChangeInputSelectionBug || supports.DisplayChangeTextAreaSelectionBug) ?
                    fixRightMarginAndInputFocus : fixRightMargin
            };
        }

        if (!supports.TransparentColor) {
            colorStyles = ['background-color', 'border-color', 'color', 'outline-color'];
            for (i = colorStyles.length; i--; ) {
                name = colorStyles[i];
                camel = Element.normalize(name);

                styleHooks[name] = styleHooks[camel] = {
                    name: camel,
                    get: fixTransparent
                };
            }
        }
    });

});



Ext.define('Ext.dom.AbstractElement_traversal', {
    override: 'Ext.dom.AbstractElement',

    
    findParent: function(simpleSelector, limit, returnEl) {
        var target = this.dom,
            topmost = document.documentElement,
            depth = 0,
            stopEl;

        limit = limit || 50;
        if (isNaN(limit)) {
            stopEl = Ext.getDom(limit);
            limit = Number.MAX_VALUE;
        }
        while (target && target.nodeType == 1 && depth < limit && target != topmost && target != stopEl) {
            if (Ext.DomQuery.is(target, simpleSelector)) {
                return returnEl ? Ext.get(target) : target;
            }
            depth++;
            target = target.parentNode;
        }
        return null;
    },

    
    findParentNode: function(simpleSelector, limit, returnEl) {
        var p = Ext.fly(this.dom.parentNode, '_internal');
        return p ? p.findParent(simpleSelector, limit, returnEl) : null;
    },

    
    up: function(simpleSelector, limit, returnDom) {
        return this.findParentNode(simpleSelector, limit, !returnDom);
    },

    
    select: function(selector, composite) {
        return Ext.dom.Element.select(selector, this.dom, composite);
    },

    
    query: function(selector) {
        return Ext.DomQuery.select(selector, this.dom);
    },

    
    down: function(selector, returnDom) {
        var n = Ext.DomQuery.selectNode(selector, this.dom);
        return returnDom ? n : Ext.get(n);
    },

    
    child: function(selector, returnDom) {
        var node,
            me = this,
            id;

        
        
        id = Ext.id(me.dom);
        
        id = Ext.escapeId(id);
        node = Ext.DomQuery.selectNode('#' + id + " > " + selector, me.dom);
        return returnDom ? node : Ext.get(node);
    },

     
    parent: function(selector, returnDom) {
        return this.matchNode('parentNode', 'parentNode', selector, returnDom);
    },

     
    next: function(selector, returnDom) {
        return this.matchNode('nextSibling', 'nextSibling', selector, returnDom);
    },

    
    prev: function(selector, returnDom) {
        return this.matchNode('previousSibling', 'previousSibling', selector, returnDom);
    },


    
    first: function(selector, returnDom) {
        return this.matchNode('nextSibling', 'firstChild', selector, returnDom);
    },

    
    last: function(selector, returnDom) {
        return this.matchNode('previousSibling', 'lastChild', selector, returnDom);
    },

    matchNode: function(dir, start, selector, returnDom) {
        if (!this.dom) {
            return null;
        }

        var n = this.dom[start];
        while (n) {
            if (n.nodeType == 1 && (!selector || Ext.DomQuery.is(n, selector))) {
                return !returnDom ? Ext.get(n) : n;
            }
            n = n[dir];
        }
        return null;
    },

    isAncestor: function(element) {
        return this.self.isAncestor.call(this.self, this.dom, element);
    }
});





Ext.define('Ext.dom.AbstractElement', {
               
                           
                                         
                                            
                                        
                                           
      

    trimRe: /^\s+|\s+$/g,
    whitespaceRe: /\s/,
    
    inheritableStatics: {
        trimRe: /^\s+|\s+$/g,
        whitespaceRe: /\s/,

        
        get: function(el) {
            var me = this,
                document = window.document,
                El = Ext.dom.Element,
                cacheItem,
                docEl,
                extEl,
                dom,
                id;

            if (!el) {
                return null;
            }

            
            if (el.isFly) {
                el = el.dom;
            }

            if (typeof el == "string") { 
                if (el == Ext.windowId) {
                    return El.get(window);
                } else if (el == Ext.documentId) {
                    return El.get(document);
                }
                
                cacheItem = Ext.cache[el];
                
                
                
                
                if (cacheItem && cacheItem.skipGarbageCollection) {
                    extEl = cacheItem.el;
                    return extEl;
                }
                
                if (!(dom = document.getElementById(el))) {
                    return null;
                }

                if (cacheItem && cacheItem.el) {
                    extEl = Ext.updateCacheEntry(cacheItem, dom).el;
                } else {
                    
                    extEl = new El(dom, !!cacheItem);
                }
                return extEl;
            } else if (el.tagName) { 
                if (!(id = el.id)) {
                    id = Ext.id(el);
                }
                cacheItem = Ext.cache[id];
                if (cacheItem && cacheItem.el) {
                    extEl = Ext.updateCacheEntry(cacheItem, el).el;
                } else {
                    
                    extEl = new El(el, !!cacheItem);
                }
                return extEl;
            } else if (el instanceof me) {
                if (el != me.docEl && el != me.winEl) {
                    id = el.id;
                    
                    
                    cacheItem = Ext.cache[id];
                    if (cacheItem) {
                        Ext.updateCacheEntry(cacheItem, document.getElementById(id) || el.dom);
                    }
                }
                return el;
            } else if (el.isComposite) {
                return el;
            } else if (Ext.isArray(el)) {
                return me.select(el);
            } else if (el === document) {
                
                if (!me.docEl) {
                    docEl = me.docEl = Ext.Object.chain(El.prototype);
                    docEl.dom = document;
                    
                    
                    
                    docEl.el = docEl;
                    docEl.id = Ext.id(document);
                    me.addToCache(docEl);
                }
                return me.docEl;
            } else if (el === window) {
                if (!me.winEl) {
                    me.winEl = Ext.Object.chain(El.prototype);
                    me.winEl.dom = window;
                    me.winEl.id = Ext.id(window);
                    me.addToCache(me.winEl);
                }
                return me.winEl;
            }
            return null;
        },

        addToCache: function(el, id) {
            if (el) {
                Ext.addCacheEntry(id, el);
            }
            return el;
        },

        addMethods: function() {
            this.override.apply(this, arguments);
        },

        
        mergeClsList: function() {
            var clsList, clsHash = {},
                i, length, j, listLength, clsName, result = [],
                changed = false,
                trimRe = this.trimRe,
                whitespaceRe = this.whitespaceRe;

            for (i = 0, length = arguments.length; i < length; i++) {
                clsList = arguments[i];
                if (Ext.isString(clsList)) {
                    clsList = clsList.replace(trimRe, '').split(whitespaceRe);
                }
                if (clsList) {
                    for (j = 0, listLength = clsList.length; j < listLength; j++) {
                        clsName = clsList[j];
                        if (!clsHash[clsName]) {
                            if (i) {
                                changed = true;
                            }
                            clsHash[clsName] = true;
                        }
                    }
                }
            }

            for (clsName in clsHash) {
                result.push(clsName);
            }
            result.changed = changed;
            return result;
        },

        
        removeCls: function(existingClsList, removeClsList) {
            var clsHash = {},
                i, length, clsName, result = [],
                changed = false,
                whitespaceRe = this.whitespaceRe;

            if (existingClsList) {
                if (Ext.isString(existingClsList)) {
                    existingClsList = existingClsList.replace(this.trimRe, '').split(whitespaceRe);
                }
                for (i = 0, length = existingClsList.length; i < length; i++) {
                    clsHash[existingClsList[i]] = true;
                }
            }
            if (removeClsList) {
                if (Ext.isString(removeClsList)) {
                    removeClsList = removeClsList.split(whitespaceRe);
                }
                for (i = 0, length = removeClsList.length; i < length; i++) {
                    clsName = removeClsList[i];
                    if (clsHash[clsName]) {
                        changed = true;
                        delete clsHash[clsName];
                    }
                }
            }
            for (clsName in clsHash) {
                result.push(clsName);
            }
            result.changed = changed;
            return result;
        },

        
        VISIBILITY: 1,

        
        DISPLAY: 2,

        
        OFFSETS: 3,

        
        ASCLASS: 4
    },

    constructor: function(element, forceNew) {
        var me = this,
            dom = typeof element == 'string'
                ? document.getElementById(element)
                : element,
            id;

        
        
        
        me.el = me;

        if (!dom) {
            return null;
        }

        id = dom.id;
        if (!forceNew && id && Ext.cache[id]) {
            
            return Ext.cache[id].el;
        }

        
        me.dom = dom;

        
        me.id = id || Ext.id(dom);

        me.self.addToCache(me);
    },

    
    set: function(o, useSet) {
         var el = this.dom,
             attr,
             value;

         for (attr in o) {
             if (o.hasOwnProperty(attr)) {
                 value = o[attr];
                 if (attr == 'style') {
                     this.applyStyles(value);
                 }
                 else if (attr == 'cls') {
                     el.className = value;
                 }
                 else if (useSet !== false) {
                     if (value === undefined) {
                         el.removeAttribute(attr);
                     } else {
                        el.setAttribute(attr, value);
                     }
                 }
                 else {
                     el[attr] = value;
                 }
             }
         }
         return this;
     },

    
    defaultUnit: "px",

    
    is: function(simpleSelector) {
        return Ext.DomQuery.is(this.dom, simpleSelector);
    },

    
    getValue: function(asNumber) {
        var val = this.dom.value;
        return asNumber ? parseInt(val, 10) : val;
    },

    
    remove: function() {
        var me = this,
            dom = me.dom;
            
        if (me.isAnimate) {
            me.stopAnimation();
        }

        if (dom) {
            Ext.removeNode(dom);
            delete me.dom;
        }
    },

    
    contains: function(el) {
        if (!el) {
            return false;
        }

        var me = this,
            dom = el.dom || el;

        
        return (dom === me.dom) || Ext.dom.AbstractElement.isAncestor(me.dom, dom);
    },

    
    getAttribute: function(name, ns) {
        var dom = this.dom;
        return dom.getAttributeNS(ns, name) || dom.getAttribute(ns + ":" + name) || dom.getAttribute(name) || dom[name];
    },

    
    update: function(html) {
        if (this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },


    
    setHTML: function(html) {
        if(this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },

    
    getHTML: function() {
        return this.dom ? this.dom.innerHTML : '';
    },

    
    hide: function() {
        this.setVisible(false);
        return this;
    },

    
    show: function() {
        this.setVisible(true);
        return this;
    },

    
    setVisible: function(visible, animate) {
        var me = this,
            statics = me.self,
            mode = me.getVisibilityMode(),
            prefix = Ext.baseCSSPrefix;

        switch (mode) {
            case statics.VISIBILITY:
                me.removeCls([prefix + 'hidden-display', prefix + 'hidden-offsets']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-visibility');
            break;

            case statics.DISPLAY:
                me.removeCls([prefix + 'hidden-visibility', prefix + 'hidden-offsets']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-display');
            break;

            case statics.OFFSETS:
                me.removeCls([prefix + 'hidden-visibility', prefix + 'hidden-display']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-offsets');
            break;
        }

        return me;
    },

    getVisibilityMode: function() {
        
        
        
        var data = (this.$cache || this.getCache()).data,
            visMode = data.visibilityMode;

        if (visMode === undefined) {
            data.visibilityMode = visMode = this.self.DISPLAY;
        }
        
        return visMode;
    },

    
    setVisibilityMode: function(mode) {
        (this.$cache || this.getCache()).data.visibilityMode = mode;
        return this;
    },
    
    getCache: function() {
        var me = this,
            id = me.dom.id || Ext.id(me.dom);

        
        
        
        me.$cache = Ext.cache[id] || Ext.addCacheEntry(id, null, me.dom);
            
        return me.$cache;
    }
},
function() {
    var AbstractElement = this;

    
    Ext.getDetachedBody = function () {
        var detachedEl = AbstractElement.detachedBodyEl;

        if (!detachedEl) {
            detachedEl = document.createElement('div');
            AbstractElement.detachedBodyEl = detachedEl = new AbstractElement.Fly(detachedEl);
            detachedEl.isDetachedBody = true;
        }

        return detachedEl;
    };

    
    Ext.getElementById = function (id) {
        var el = document.getElementById(id),
            detachedBodyEl;

        if (!el && (detachedBodyEl = AbstractElement.detachedBodyEl)) {
            el = detachedBodyEl.dom.querySelector('#' + Ext.escapeId(id));
        }

        return el;
    };

    
    Ext.get = function(el) {
        return Ext.dom.Element.get(el);
    };

    this.addStatics({
        
        Fly: new Ext.Class({
            
            
            
            
            extend: AbstractElement,

            
            isFly: true,

            constructor: function(dom) {
                this.dom = dom;
                
                
                
                this.el = this;
            },

            
            attach: function (dom) {

                
                this.dom = dom;
                
                
                this.$cache = dom.id ? Ext.cache[dom.id] : null;
                return this;
            }
        }),

        _flyweights: {},

        
        fly: function(dom, named) {
            var fly = null,
                _flyweights = AbstractElement._flyweights;

            named = named || '_global';

            dom = Ext.getDom(dom);

            if (dom) {
                fly = _flyweights[named] || (_flyweights[named] = new AbstractElement.Fly());

                
                
                fly.dom = dom;
                
                
                fly.$cache = dom.id ? Ext.cache[dom.id] : null;
            }
            return fly;
        }
    });

    
    Ext.fly = function() {
        return AbstractElement.fly.apply(AbstractElement, arguments);
    };

    (function (proto) {
        
        proto.destroy = proto.remove;

        
        if (document.querySelector) {
            proto.getById = function (id, asDom) {
                
                
                var dom = document.getElementById(id) ||
                    this.dom.querySelector('#'+Ext.escapeId(id));
                return asDom ? dom : (dom ? Ext.get(dom) : null);
            };
        } else {
            proto.getById = function (id, asDom) {
                var dom = document.getElementById(id);
                return asDom ? dom : (dom ? Ext.get(dom) : null);
            };
        }
    }(this.prototype));
});







Ext.define('Ext.dom.Helper', (function() {


var afterbegin = 'afterbegin',
    afterend = 'afterend',
    beforebegin = 'beforebegin',
    beforeend = 'beforeend',
    ts = '<table>',
    te = '</table>',
    tbs = ts+'<tbody>',
    tbe = '</tbody>'+te,
    trs = tbs + '<tr>',
    tre = '</tr>'+tbe,
    detachedDiv = document.createElement('div'),
    bbValues = ['BeforeBegin', 'previousSibling'],
    aeValues = ['AfterEnd', 'nextSibling'],
    bb_ae_PositionHash = {
        beforebegin: bbValues,
        afterend: aeValues
    },
    fullPositionHash = {
        beforebegin: bbValues,
        afterend: aeValues,
        afterbegin: ['AfterBegin', 'firstChild'],
        beforeend: ['BeforeEnd', 'lastChild']
    };


return {
    extend:  Ext.dom.AbstractHelper ,
                                         

    tableRe: /^(?:table|thead|tbody|tr|td)$/i,

    tableElRe: /td|tr|tbody|thead/i,

    
    useDom : false,

    
    createDom: function(o, parentNode){
        var el,
            doc = document,
            useSet,
            attr,
            val,
            cn,
            i, l;

        if (Ext.isArray(o)) {                       
            el = doc.createDocumentFragment(); 
            for (i = 0, l = o.length; i < l; i++) {
                this.createDom(o[i], el);
            }
        } else if (typeof o == 'string') {         
            el = doc.createTextNode(o);
        } else {
            el = doc.createElement(o.tag || 'div');
            useSet = !!el.setAttribute; 
            for (attr in o) {
                if (!this.confRe.test(attr)) {
                    val = o[attr];
                    if (attr == 'cls') {
                        el.className = val;
                    } else {
                        if (useSet) {
                            el.setAttribute(attr, val);
                        } else {
                            el[attr] = val;
                        }
                    }
                }
            }
            Ext.DomHelper.applyStyles(el, o.style);

            if ((cn = o.children || o.cn)) {
                this.createDom(cn, el);
            } else if (o.html) {
                el.innerHTML = o.html;
            }
        }
        if (parentNode) {
            parentNode.appendChild(el);
        }
        return el;
    },

    ieTable: function(depth, openingTags, htmlContent, closingTags){
        detachedDiv.innerHTML = [openingTags, htmlContent, closingTags].join('');

        var i = -1,
            el = detachedDiv,
            ns;

        while (++i < depth) {
            el = el.firstChild;
        }
        
        ns = el.nextSibling;

        if (ns) {
            ns = el;
            el = document.createDocumentFragment();
            
            while (ns) {
                 nx = ns.nextSibling;
                 el.appendChild(ns);
                 ns = nx;
            }
        }
        return el;
    },

    
    insertIntoTable: function(tag, where, destinationEl, html) {
        var node,
            before,
            bb = where == beforebegin,
            ab = where == afterbegin,
            be = where == beforeend,
            ae = where == afterend;

        if (tag == 'td' && (ab || be) || !this.tableElRe.test(tag) && (bb || ae)) {
            return null;
        }
        before = bb ? destinationEl :
                 ae ? destinationEl.nextSibling :
                 ab ? destinationEl.firstChild : null;

        if (bb || ae) {
            destinationEl = destinationEl.parentNode;
        }

        if (tag == 'td' || (tag == 'tr' && (be || ab))) {
            node = this.ieTable(4, trs, html, tre);
        } else if (((tag == 'tbody' || tag == 'thead') && (be || ab)) ||
                (tag == 'tr' && (bb || ae))) {
            node = this.ieTable(3, tbs, html, tbe);
        } else {
            node = this.ieTable(2, ts, html, te);
        }
        destinationEl.insertBefore(node, before);
        return node;
    },

    
    createContextualFragment: function(html) {
        var fragment = document.createDocumentFragment(),
            length, childNodes;

        detachedDiv.innerHTML = html;
        childNodes = detachedDiv.childNodes;
        length = childNodes.length;

        
        while (length--) {
            fragment.appendChild(childNodes[0]);
        }
        return fragment;
    },

    applyStyles: function(el, styles) {
        if (styles) {
            if (typeof styles == "function") {
                styles = styles.call();
            }
            if (typeof styles == "string") {
                styles = Ext.dom.Element.parseStyles(styles);
            }
            if (typeof styles == "object") {
                Ext.fly(el, '_applyStyles').setStyle(styles);
            }
        }
    },

    
    createHtml: function(spec) {
        return this.markup(spec);
    },

    doInsert: function(el, o, returnElement, pos, sibling, append) {
        
        el = el.dom || Ext.getDom(el);

        var newNode;

        if (this.useDom) {
            newNode = this.createDom(o, null);

            if (append) {
                el.appendChild(newNode);
            }
            else {
                (sibling == 'firstChild' ? el : el.parentNode).insertBefore(newNode, el[sibling] || el);
            }

        } else {
            newNode = this.insertHtml(pos, el, this.markup(o));
        }
        return returnElement ? Ext.get(newNode, true) : newNode;
    },

    
    overwrite: function(el, html, returnElement) {
        var newNode;

        el = Ext.getDom(el);
        html = this.markup(html);

        
        if (Ext.isIE && this.tableRe.test(el.tagName)) {
            
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            if (html) {
                newNode = this.insertHtml('afterbegin', el, html);
                return returnElement ? Ext.get(newNode) : newNode;
            }
            return null;
        }
        el.innerHTML = html;
        return returnElement ? Ext.get(el.firstChild) : el.firstChild;
    },

    insertHtml: function(where, el, html) {
        var hashVal,
            range,
            rangeEl,
            setStart,
            frag;

        where = where.toLowerCase();

        
        if (el.insertAdjacentHTML) {

            
            if (Ext.isIE && this.tableRe.test(el.tagName) && (frag = this.insertIntoTable(el.tagName.toLowerCase(), where, el, html))) {
                return frag;
            }

            if ((hashVal = fullPositionHash[where])) {

                if (Ext.global.MSApp && Ext.global.MSApp.execUnsafeLocalFunction) {
                    
                    MSApp.execUnsafeLocalFunction(function () {
                        el.insertAdjacentHTML(hashVal[0], html);
                    });
                } else {
                    el.insertAdjacentHTML(hashVal[0], html);
                }

                return el[hashVal[1]];
            }
            
        } else {
            
            if (el.nodeType === 3) {
                where = where === 'afterbegin' ? 'beforebegin' : where;
                where = where === 'beforeend' ? 'afterend' : where;
            }
            range = Ext.supports.CreateContextualFragment ? el.ownerDocument.createRange() : undefined;
            setStart = 'setStart' + (this.endRe.test(where) ? 'After' : 'Before');
            if (bb_ae_PositionHash[where]) {
                if (range) {
                    range[setStart](el);
                    frag = range.createContextualFragment(html);
                } else {
                    frag = this.createContextualFragment(html);
                }
                el.parentNode.insertBefore(frag, where == beforebegin ? el : el.nextSibling);
                return el[(where == beforebegin ? 'previous' : 'next') + 'Sibling'];
            } else {
                rangeEl = (where == afterbegin ? 'first' : 'last') + 'Child';
                if (el.firstChild) {
                    if (range) {
                        range[setStart](el[rangeEl]);
                        frag = range.createContextualFragment(html);
                    } else {
                        frag = this.createContextualFragment(html);
                    }

                    if (where == afterbegin) {
                        el.insertBefore(frag, el.firstChild);
                    } else {
                        el.appendChild(frag);
                    }
                } else {
                    el.innerHTML = html;
                }
                return el[rangeEl];
            }
        }
    },

    
    createTemplate: function(o) {
        var html = this.markup(o);
        return new Ext.Template(html);
    }

};
})(), function() {
    Ext.ns('Ext.core');
    Ext.DomHelper = Ext.core.DomHelper = new this;
});



Ext.define('Ext.Template', {

    

                                                    

    inheritableStatics: {
        
        from: function(el, config) {
            el = Ext.getDom(el);
            return new this(el.value || el.innerHTML, config || '');
        }
    },

    

    
    constructor: function(html) {
        var me = this,
            args = arguments,
            buffer = [],
            i = 0,
            length = args.length,
            value;

        me.initialConfig = {};
        
        
        
        
        if (length === 1 && Ext.isArray(html)) {
            args = html;
            length = args.length;
        }

        if (length > 1) {
            for (; i < length; i++) {
                value = args[i];
                if (typeof value == 'object') {
                    Ext.apply(me.initialConfig, value);
                    Ext.apply(me, value);
                } else {
                    buffer.push(value);
                }
            }
        } else {
            buffer.push(html);
        }

        
        me.html = buffer.join('');

        if (me.compiled) {
            me.compile();
        }
    },

    
    isTemplate: true,

    

    
    disableFormats: false,

    re: /\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,

    
    apply: function(values) {
        var me = this,
            useFormat = me.disableFormats !== true,
            fm = Ext.util.Format,
            tpl = me,
            ret;

        if (me.compiled) {
            return me.compiled(values).join('');
        }

        function fn(m, name, format, args) {
            if (format && useFormat) {
                if (args) {
                    args = [values[name]].concat(Ext.functionFactory('return ['+ args +'];')());
                } else {
                    args = [values[name]];
                }
                if (format.substr(0, 5) == "this.") {
                    return tpl[format.substr(5)].apply(tpl, args);
                }
                else {
                    return fm[format].apply(fm, args);
                }
            }
            else {
                return values[name] !== undefined ? values[name] : "";
            }
        }

        ret = me.html.replace(me.re, fn);
        return ret;
    },

    
    applyOut: function(values, out) {
        var me = this;

        if (me.compiled) {
            out.push.apply(out, me.compiled(values));
        } else {
            out.push(me.apply(values));
        }

        return out;
    },

    
    applyTemplate: function () {
        return this.apply.apply(this, arguments);
    },

    
    set: function(html, compile) {
        var me = this;
        me.html = html;
        me.compiled = null;
        return compile ? me.compile() : me;
    },

    compileARe: /\\/g,
    compileBRe: /(\r\n|\n)/g,
    compileCRe: /'/g,

    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ext.Template} this
     */
    compile: function() {
        var me = this,
            fm = Ext.util.Format,
            useFormat = me.disableFormats !== true,
            body, bodyReturn;

        function fn(m, name, format, args) {
            if (format && useFormat) {
                args = args ? ',' + args: "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + '(';
                }
                else {
                    format = 'this.' + format.substr(5) + '(';
                }
            }
            else {
                args = '';
                format = "(values['" + name + "'] == undefined ? '' : ";
            }
            return "'," + format + "values['" + name + "']" + args + ") ,'";
        }

        bodyReturn = me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn);
        body = "this.compiled = function(values){ return ['" + bodyReturn + "'];};";
        eval(body);
        return me;
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) as the first child of el.
     *
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return a Ext.Element.
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertFirst: function(el, values, returnElement) {
        return this.doInsert('afterBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) before el.
     *
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return a Ext.Element.
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertBefore: function(el, values, returnElement) {
        return this.doInsert('beforeBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) after el.
     *
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return a Ext.Element.
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertAfter: function(el, values, returnElement) {
        return this.doInsert('afterEnd', el, values, returnElement);
    },

    /**
     * Applies the supplied `values` to the template and appends the new node(s) to the specified `el`.
     *
     * For example usage see {@link Ext.Template Ext.Template class docs}.
     *
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return an Ext.Element.
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    append: function(el, values, returnElement) {
        return this.doInsert('beforeEnd', el, values, returnElement);
    },

    doInsert: function(where, el, values, returnElement) {
        var newNode = Ext.DomHelper.insertHtml(where, Ext.getDom(el), this.apply(values));
        return returnElement ? Ext.get(newNode) : newNode;
    },

    /**
     * Applies the supplied values to the template and overwrites the content of el with the new node(s).
     *
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/Array} values The template values. See {@link #applyTemplate} for details.
     * @param {Boolean} returnElement (optional) true to return a Ext.Element.
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    overwrite: function(el, values, returnElement) {
        var newNode = Ext.DomHelper.overwrite(Ext.getDom(el), this.apply(values));
        return returnElement ? Ext.get(newNode) : newNode;
    }
});

// @tag core
/**
 * This class parses the XTemplate syntax and calls abstract methods to process the parts.
 * @private
 */
Ext.define('Ext.XTemplateParser', {
    constructor: function (config) {
        Ext.apply(this, config);
    },

    /**
     * @property {Number} level The 'for' or 'foreach' loop context level. This is adjusted
     * up by one prior to calling {@link #doFor} or {@link #doForEach} and down by one after
     * calling the corresponding {@link #doEnd} that closes the loop. This will be 1 on the
     * first {@link #doFor} or {@link #doForEach} call.
     */

    /**
     * This method is called to process a piece of raw text from the tpl.
     * @param {String} text
     * @method doText
     */
    // doText: function (text)

    /**
     * This method is called to process expressions (like `{[expr]}`).
     * @param {String} expr The body of the expression (inside "{[" and "]}").
     * @method doExpr
     */
    // doExpr: function (expr)

    /**
     * This method is called to process simple tags (like `{tag}`).
     * @method doTag
     */
    // doTag: function (tag)

    /**
     * This method is called to process `<tpl else>`.
     * @method doElse
     */
    // doElse: function ()

    /**
     * This method is called to process `{% text %}`.
     * @param {String} text
     * @method doEval
     */
    // doEval: function (text)

    /**
     * This method is called to process `<tpl if="action">`. If there are other attributes,
     * these are passed in the actions object.
     * @param {String} action
     * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
     * @method doIf
     */
    // doIf: function (action, actions)

    /**
     * This method is called to process `<tpl elseif="action">`. If there are other attributes,
     * these are passed in the actions object.
     * @param {String} action
     * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
     * @method doElseIf
     */
    // doElseIf: function (action, actions)

    /**
     * This method is called to process `<tpl switch="action">`. If there are other attributes,
     * these are passed in the actions object.
     * @param {String} action
     * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
     * @method doSwitch
     */
    // doSwitch: function (action, actions)

    /**
     * This method is called to process `<tpl case="action">`. If there are other attributes,
     * these are passed in the actions object.
     * @param {String} action
     * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
     * @method doCase
     */
    // doCase: function (action, actions)

    /**
     * This method is called to process `<tpl default>`.
     * @method doDefault
     */
    // doDefault: function ()

    /**
     * This method is called to process `</tpl>`. It is given the action type that started
     * the tpl and the set of additional actions.
     * @param {String} type The type of action that is being ended.
     * @param {Object} actions The other actions keyed by the attribute name (such as 'exec').
     * @method doEnd
     */
    // doEnd: function (type, actions) 

    /**
     * This method is called to process `<tpl for="action">`. If there are other attributes,
     * these are passed in the actions object.
     * @param {String} action
     * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
     * @method doFor
     */
    // doFor: function (action, actions)

    /**
     * This method is called to process `<tpl foreach="action">`. If there are other
     * attributes, these are passed in the actions object.
     * @param {String} action
     * @param {Object} actions Other actions keyed by the attribute name (such as 'exec').
     * @method doForEach
     */
    // doForEach: function (action, actions)

    /**
     * This method is called to process `<tpl exec="action">`. If there are other attributes,
     * these are passed in the actions object.
     * @param {String} action
     * @param {Object} actions Other actions keyed by the attribute name.
     * @method doExec
     */
    // doExec: function (action, actions)

    /**
     * This method is called to process an empty `<tpl>`. This is unlikely to need to be
     * implemented, so a default (do nothing) version is provided.
     * @method
     */
    doTpl: Ext.emptyFn,

    parse: function (str) {
        var me = this,
            len = str.length,
            aliases = { elseif: 'elif' },
            topRe = me.topRe,
            actionsRe = me.actionsRe,
            index, stack, s, m, t, prev, frame, subMatch, begin, end, actions,
            prop;

        me.level = 0;
        me.stack = stack = [];

        for (index = 0; index < len; index = end) {
            topRe.lastIndex = index;
            m = topRe.exec(str);

            if (!m) {
                me.doText(str.substring(index, len));
                break;
            }

            begin = m.index;
            end = topRe.lastIndex;

            if (index < begin) {
                me.doText(str.substring(index, begin));
            }

            if (m[1]) {
                end = str.indexOf('%}', begin+2);
                me.doEval(str.substring(begin+2, end));
                end += 2;
            } else if (m[2]) {
                end = str.indexOf(']}', begin+2);
                me.doExpr(str.substring(begin+2, end));
                end += 2;
            } else if (m[3]) { // if ('{' token)
                me.doTag(m[3]);
            } else if (m[4]) { // content of a <tpl xxxxxx xxx> tag
                actions = null;
                while ((subMatch = actionsRe.exec(m[4])) !== null) {
                    s = subMatch[2] || subMatch[3];
                    if (s) {
                        s = Ext.String.htmlDecode(s); // decode attr value
                        t = subMatch[1];
                        t = aliases[t] || t;
                        actions = actions || {};
                        prev = actions[t];

                        if (typeof prev == 'string') {
                            actions[t] = [prev, s];
                        } else if (prev) {
                            actions[t].push(s);
                        } else {
                            actions[t] = s;
                        }
                    }
                }

                if (!actions) {
                    if (me.elseRe.test(m[4])) {
                        me.doElse();
                    } else if (me.defaultRe.test(m[4])) {
                        me.doDefault();
                    } else {
                        me.doTpl();
                        stack.push({ type: 'tpl' });
                    }
                }
                else if (actions['if']) {
                    me.doIf(actions['if'], actions);
                    stack.push({ type: 'if' });
                }
                else if (actions['switch']) {
                    me.doSwitch(actions['switch'], actions);
                    stack.push({ type: 'switch' });
                }
                else if (actions['case']) {
                    me.doCase(actions['case'], actions);
                }
                else if (actions['elif']) {
                    me.doElseIf(actions['elif'], actions);
                }
                else if (actions['for']) {
                    ++me.level;

                    // Extract property name to use from indexed item
                    if (prop = me.propRe.exec(m[4])) {
                        actions.propName = prop[1] || prop[2];
                    }
                    me.doFor(actions['for'], actions);
                    stack.push({ type: 'for', actions: actions });
                }
                else if (actions['foreach']) {
                    ++me.level;

                    // Extract property name to use from indexed item
                    if (prop = me.propRe.exec(m[4])) {
                        actions.propName = prop[1] || prop[2];
                    }
                    me.doForEach(actions['foreach'], actions);
                    stack.push({ type: 'foreach', actions: actions });
                }
                else if (actions.exec) {
                    me.doExec(actions.exec, actions);
                    stack.push({ type: 'exec', actions: actions });
                }
                /*
                else {
                    // todo - error
                }
                */
            } else if (m[0].length === 5) {
                // if the length of m[0] is 5, assume that we're dealing with an opening tpl tag with no attributes (e.g. <tpl>...</tpl>)
                // in this case no action is needed other than pushing it on to the stack
                stack.push({ type: 'tpl' });
            } else {
                frame = stack.pop();
                me.doEnd(frame.type, frame.actions);
                if (frame.type == 'for' || frame.type == 'foreach') {
                    --me.level;
                }
            }
        }
    },

    // Internal regexes
    
    topRe:     /(?:(\{\%)|(\{\[)|\{([^{}]+)\})|(?:<tpl([^>]*)\>)|(?:<\/tpl>)/g,
    actionsRe: /\s*(elif|elseif|if|for|foreach|exec|switch|case|eval|between)\s*\=\s*(?:(?:"([^"]*)")|(?:'([^']*)'))\s*/g,
    propRe:    /prop=(?:(?:"([^"]*)")|(?:'([^']*)'))/,
    defaultRe: /^\s*default\s*$/,
    elseRe:    /^\s*else\s*$/
});



Ext.define('Ext.XTemplateCompiler', {
    extend:  Ext.XTemplateParser ,

    
    
    
    useEval: Ext.isGecko,

    
    
    
    useIndex: Ext.isIE8m,

    useFormat: true,
    
    propNameRe: /^[\w\d\$]*$/,

    compile: function (tpl) {
        var me = this,
            code = me.generate(tpl);

        
        
        
        
        return me.useEval ? me.evalTpl(code) : (new Function('Ext', code))(Ext);
    },

    generate: function (tpl) {
        var me = this,
            
            definitions = 'var fm=Ext.util.Format,ts=Object.prototype.toString;',
            code;

        
        me.maxLevel = 0;

        me.body = [
            'var c0=values, a0=' + me.createArrayTest(0) + ', p0=parent, n0=xcount, i0=xindex, k0, v;\n'
        ];
        if (me.definitions) {
            if (typeof me.definitions === 'string') {
                me.definitions = [me.definitions, definitions ];
            } else {
                me.definitions.push(definitions);
            }
        } else {
            me.definitions = [ definitions ];
        }
        me.switches = [];

        me.parse(tpl);

        me.definitions.push(
            (me.useEval ? '$=' : 'return') + ' function (' + me.fnArgs + ') {',
                me.body.join(''),
            '}'
        );

        code = me.definitions.join('\n');

        
        me.definitions.length = me.body.length = me.switches.length = 0;
        delete me.definitions;
        delete me.body;
        delete me.switches;

        return code;
    },

    
    

    doText: function (text) {
        var me = this,
            out = me.body;

        text = text.replace(me.aposRe, "\\'").replace(me.newLineRe, '\\n');
        if (me.useIndex) {
            out.push('out[out.length]=\'', text, '\'\n');
        } else {
            out.push('out.push(\'', text, '\')\n');
        }
    },

    doExpr: function (expr) {
        var out = this.body;
        out.push('if ((v=' + expr + ') != null) out');

        
        
        if (this.useIndex) {
             out.push('[out.length]=v+\'\'\n');
        } else {
             out.push('.push(v+\'\')\n');
        }
    },

    doTag: function (tag) {
        var expr = this.parseTag(tag);
        if (expr) {
            this.doExpr(expr);
        } else {
            
            this.doText('{' + tag + '}');
        }
    },

    doElse: function () {
        this.body.push('} else {\n');
    },

    doEval: function (text) {
        this.body.push(text, '\n');
    },

    doIf: function (action, actions) {
        var me = this;

        
        if (action === '.') {
            me.body.push('if (values) {\n');
        } else if (me.propNameRe.test(action)) {
            me.body.push('if (', me.parseTag(action), ') {\n');
        }
        
        else {
            me.body.push('if (', me.addFn(action), me.callFn, ') {\n');
        }
        if (actions.exec) {
            me.doExec(actions.exec);
        }
    },

    doElseIf: function (action, actions) {
        var me = this;

        
        if (action === '.') {
            me.body.push('else if (values) {\n');
        } else if (me.propNameRe.test(action)) {
            me.body.push('} else if (', me.parseTag(action), ') {\n');
        }
        
        else {
            me.body.push('} else if (', me.addFn(action), me.callFn, ') {\n');
        }
        if (actions.exec) {
            me.doExec(actions.exec);
        }
    },

    doSwitch: function (action) {
        var me = this;

        
        if (action === '.') {
            me.body.push('switch (values) {\n');
        } else if (me.propNameRe.test(action)) {
            me.body.push('switch (', me.parseTag(action), ') {\n');
        }
        
        else {
            me.body.push('switch (', me.addFn(action), me.callFn, ') {\n');
        }
        me.switches.push(0);
    },

    doCase: function (action) {
        var me = this,
            cases = Ext.isArray(action) ? action : [action],
            n = me.switches.length - 1,
            match, i;

        if (me.switches[n]) {
            me.body.push('break;\n');
        } else {
            me.switches[n]++;
        }

        for (i = 0, n = cases.length; i < n; ++i) {
            match = me.intRe.exec(cases[i]);
            cases[i] = match ? match[1] : ("'" + cases[i].replace(me.aposRe,"\\'") + "'");
        }

        me.body.push('case ', cases.join(': case '), ':\n');
    },

    doDefault: function () {
        var me = this,
            n = me.switches.length - 1;

        if (me.switches[n]) {
            me.body.push('break;\n');
        } else {
            me.switches[n]++;
        }

        me.body.push('default:\n');
    },

    doEnd: function (type, actions) {
        var me = this,
            L = me.level-1;

        if (type == 'for' || type == 'foreach') {
            
            if (actions.exec) {
                me.doExec(actions.exec);
            }

            me.body.push('}\n');
            me.body.push('parent=p',L,';values=r',L+1,';xcount=n'+L+';xindex=i',L,'+1;xkey=k',L,';\n');
        } else if (type == 'if' || type == 'switch') {
            me.body.push('}\n');
        }
    },

    doFor: function (action, actions) {
        var me = this,
            s,
            L = me.level,
            up = L-1,
            parentAssignment;

        
        if (action === '.') {
            s = 'values';
        } else if (me.propNameRe.test(action)) {
            s = me.parseTag(action);
        }
        
        else {
            s = me.addFn(action) + me.callFn;
        }

        

        
        if (me.maxLevel < L) {
            me.maxLevel = L;
            me.body.push('var ');
        }
        
        if (action == '.') {
            parentAssignment = 'c' + L;
        } else {
            parentAssignment = 'a' + up + '?c' + up + '[i' + up + ']:c' + up;
        }
        
        me.body.push('i',L,'=0,n', L, '=0,c',L,'=',s,',a',L,'=', me.createArrayTest(L),',r',L,'=values,p',L,',k',L,';\n',
            'p',L,'=parent=',parentAssignment,'\n',
            'if (c',L,'){if(a',L,'){n', L,'=c', L, '.length;}else if (c', L, '.isMixedCollection){c',L,'=c',L,'.items;n',L,'=c',L,'.length;}else if(c',L,'.isStore){c',L,'=c',L,'.data.items;n',L,'=c',L,'.length;}else{c',L,'=[c',L,'];n',L,'=1;}}\n',
            'for (xcount=n',L,';i',L,'<n'+L+';++i',L,'){\n',
            'values=c',L,'[i',L,']');
        if (actions.propName) {
            me.body.push('.', actions.propName);
        }
        me.body.push('\n',
            'xindex=i',L,'+1\n');
        
        if (actions.between) {
            me.body.push('if(xindex>1){ out.push("',actions.between,'"); } \n');
        }
    },

    doForEach: function (action, actions) {
        var me = this,
            s,
            L = me.level,
            up = L-1,
            parentAssignment;

        
        if (action === '.') {
            s = 'values';
        } else if (me.propNameRe.test(action)) {
            s = me.parseTag(action);
        }
        
        else {
            s = me.addFn(action) + me.callFn;
        }

        

        
        if (me.maxLevel < L) {
            me.maxLevel = L;
            me.body.push('var ');
        }
        
        if (action == '.') {
            parentAssignment = 'c' + L;
        } else {
            parentAssignment = 'a' + up + '?c' + up + '[i' + up + ']:c' + up;
        }
        
        me.body.push('i',L,'=-1,n',L,'=0,c',L,'=',s,',a',L,'=',me.createArrayTest(L),',r',L,'=values,p',L,',k',L,';\n',
            'p',L,'=parent=',parentAssignment,'\n',
            'for(k',L,' in c',L,'){\n',
                'xindex=++i',L,'+1;\n',
                'xkey=k',L,';\n',
                'values=c',L,'[k',L,'];');
        if (actions.propName) {
            me.body.push('.', actions.propName);
        }
        
        if (actions.between) {
            me.body.push('if(xindex>1){ out.push("',actions.between,'"); } \n');
        }
    },

    createArrayTest: ('isArray' in Array) ? function(L) {
        return 'Array.isArray(c' + L + ')';
    } : function(L) {
        return 'ts.call(c' + L + ')==="[object Array]"';
    },

    doExec: function (action, actions) {
        var me = this,
            name = 'f' + me.definitions.length;

        me.definitions.push('function ' + name + '(' + me.fnArgs + ') {',
                            ' try { with(values) {',
                            '  ' + action,
                            ' }} catch(e) {',
                            '}',
                      '}');

        me.body.push(name + me.callFn + '\n');
    },

    
    

    addFn: function (body) {
        var me = this,
            name = 'f' + me.definitions.length;

        if (body === '.') {
            me.definitions.push('function ' + name + '(' + me.fnArgs + ') {',
                            ' return values',
                       '}');
        } else if (body === '..') {
            me.definitions.push('function ' + name + '(' + me.fnArgs + ') {',
                            ' return parent',
                       '}');
        } else {
            me.definitions.push('function ' + name + '(' + me.fnArgs + ') {',
                            ' try { with(values) {',
                            '  return(' + body + ')',
                            ' }} catch(e) {',
                            '}',
                       '}');
        }

        return name;
    },

    parseTag: function (tag) {
        var me = this,
            m = me.tagRe.exec(tag),
            name, format, args, math, v;

        if (!m) {
            return null;
        }

        name = m[1];
        format = m[2];
        args = m[3];
        math = m[4];

        
        if (name == '.') {
            
            if (!me.validTypes) {
                me.definitions.push('var validTypes={string:1,number:1,boolean:1};');
                me.validTypes = true;
            }
            v = 'validTypes[typeof values] || ts.call(values) === "[object Date]" ? values : ""';
        }
        
        else if (name == '#') {
            v = 'xindex';
        }
        
        else if (name == '$') {
            v = 'xkey';
        }
        else if (name.substr(0, 7) == "parent.") {
            v = name;
        }
        
        else if (isNaN(name) && name.indexOf('-') == -1 && name.indexOf('.') != -1) {
            v = "values." + name;
        }
        
        
        else {    
            v = "values['" + name + "']";
        }

        if (math) {
            v = '(' + v + math + ')';
        }

        if (format && me.useFormat) {
            args = args ? ',' + args : "";
            if (format.substr(0, 5) != "this.") {
                format = "fm." + format + '(';
            } else {
                format += '(';
            }
        } else {
            return v;
        }

        return format + v + args + ')';
    },

    
    evalTpl: function ($) {

        
        
        
        
        eval($);
        return $;
    },

    newLineRe: /\r\n|\r|\n/g,
    aposRe: /[']/g,
    intRe:  /^\s*(\d+)\s*$/,
    tagRe:  /^([\w-\.\#\$]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\/]\s?[\d\.\+\-\*\/\(\)]+)?$/

}, function () {
    var proto = this.prototype;

    proto.fnArgs = 'out,values,parent,xindex,xcount,xkey';
    proto.callFn = '.call(this,' + proto.fnArgs + ')';
});

// @tag core
/**
 * A template class that supports advanced functionality like:
 *
 * - Autofilling arrays using templates and sub-templates
 * - Conditional processing with basic comparison operators
 * - Basic math function support
 * - Execute arbitrary inline code with special built-in template variables
 * - Custom member functions
 * - Many special tags and built-in operators that aren't defined as part of the API, but are supported in the templates that can be created
 *
 * XTemplate provides the templating mechanism built into {@link Ext.view.View}.
 *
 * The {@link Ext.Template} describes the acceptable parameters to pass to the constructor. The following examples
 * demonstrate all of the supported features.
 *
 * # Sample Data
 *
 * This is the data object used for reference in each code example:
 *
 *     var data = {
 *         name: 'Don Griffin',
 *         title: 'Senior Technomage',
 *         company: 'Sencha Inc.',
 *         drinks: ['Coffee', 'Water', 'More Coffee'],
 *         kids: [
 *             { name: 'Aubrey',  age: 17 },
 *             { name: 'Joshua',  age: 13 },
 *             { name: 'Cale',    age: 10 },
 *             { name: 'Nikol',   age: 5 },
 *             { name: 'Solomon', age: 0 }
 *         ]
 *     };
 *
 * # Auto filling of arrays
 *
 * The **tpl** tag and the **for** operator are used to process the provided data object:
 *
 * - If the value specified in for is an array, it will auto-fill, repeating the template block inside the tpl
 *   tag for each item in the array.
 * - If for="." is specified, the data object provided is examined.
 * - If between="..." is specified, the provided value will be inserted between the items.
 *   This is also supported in the "foreach" looping template.
 * - While processing an array, the special variable {#} will provide the current array index + 1 (starts at 1, not 0).
 *
 * Examples:
 *
 *     <tpl for=".">...</tpl>       
 *     <tpl for="foo">...</tpl>     
 *     <tpl for="foo.bar">...</tpl> 
 *     <tpl for="." between=",">...</tpl> 
 *
 * Using the sample data above:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Kids: ',
 *         '<tpl for=".">',       
 *             '<p>{#}. {name}</p>',  
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data.kids); 
 *
 * An example illustrating how the **for** property can be leveraged to access specified members of the provided data
 * object to populate the template:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Title: {title}</p>',
 *         '<p>Company: {company}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',     
 *             '<p>{name}</p>',
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data);  
 *
 * Flat arrays that contain values (and not objects) can be auto-rendered using the special **`{.}`** variable inside a
 * loop. This variable will represent the value of the array at the current index:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>{name}\'s favorite beverages:</p>',
 *         '<tpl for="drinks">',
 *             '<div> - {.}</div>',
 *         '</tpl>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *
 * When processing a sub-template, for example while looping through a child array, you can access the parent object's
 * members via the **parent** object:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<tpl if="age &gt; 1">',
 *                 '<p>{name}</p>',
 *                 '<p>Dad: {parent.name}</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *     
 * The **foreach** operator is used to loop over an object's properties.  The following
 * example demonstrates looping over the main data object's properties:
 * 
 *     var tpl = new Ext.XTemplate(
 *         '<dl>',
 *             '<tpl foreach=".">',
 *                 '<dt>{$}</dt>', // the special **`{$}`** variable contains the property name
 *                 '<dd>{.}</dd>', // within the loop, the **`{.}`** variable is set to the property value
 *             '</tpl>',
 *         '</dl>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *
 * # Conditional processing with basic comparison operators
 *
 * The **tpl** tag and the **if** operator are used to provide conditional checks for deciding whether or not to render
 * specific parts of the template.
 *
 * Using the sample data above:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<tpl if="age &gt; 1">',
 *                 '<p>{name}</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *
 * More advanced conditionals are also supported:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<p>{name} is a ',
 *             '<tpl if="age &gt;= 13">',
 *                 '<p>teenager</p>',
 *             '<tpl elseif="age &gt;= 2">',
 *                 '<p>kid</p>',
 *             '<tpl else>',
 *                 '<p>baby</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<p>{name} is a ',
 *             '<tpl switch="name">',
 *                 '<tpl case="Aubrey" case="Nikol">',
 *                     '<p>girl</p>',
 *                 '<tpl default>',
 *                     '<p>boy</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *
 * A `break` is implied between each case and default, however, multiple cases can be listed
 * in a single &lt;tpl&gt; tag.
 *
 * # Using double quotes
 *
 * Examples:
 *
 *     var tpl = new Ext.XTemplate(
 *         "<tpl if='age &gt; 1 && age &lt; 10'>Child</tpl>",
 *         "<tpl if='age &gt;= 10 && age &lt; 18'>Teenager</tpl>",
 *         "<tpl if='this.isGirl(name)'>...</tpl>",
 *         '<tpl if="id == \'download\'">...</tpl>',
 *         "<tpl if='needsIcon'><img src='{icon}' class='{iconCls}'/></tpl>",
 *         "<tpl if='name == \"Don\"'>Hello</tpl>"
 *     );
 *
 * # Basic math support
 *
 * The following basic math operators may be applied directly on numeric data values:
 *
 *     + - * /
 *
 * For example:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<tpl if="age &gt; 1">',  
 *                 '<p>{#}: {name}</p>',  
 *                 '<p>In 5 Years: {age+5}</p>',  
 *                 '<p>Dad: {parent.name}</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *
 * # Execute arbitrary inline code with special built-in template variables
 *
 * Anything between `{[ ... ]}` is considered code to be executed in the scope of the template.
 * The expression is evaluated and the result is included in the generated result. There are
 * some special variables available in that code:
 *
 * - **out**: The output array into which the template is being appended (using `push` to later
 *   `join`).
 * - **values**: The values in the current scope. If you are using scope changing sub-templates,
 *   you can change what values is.
 * - **parent**: The scope (values) of the ancestor template.
 * - **xindex**: If you are in a "for" or "foreach" looping template, the index of the loop you are in (1-based).
 * - **xcount**: If you are in a "for" looping template, the total length of the array you are looping.
 * - **xkey**: If you are in a "foreach" looping template, the key of the current property
 * being examined.
 *
 * This example demonstrates basic row striping using an inline code block and the xindex variable:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Company: {[values.company.toUpperCase() + ", " + values.title]}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<div class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
 *             '{name}',
 *             '</div>',
 *         '</tpl></p>'
 *      );
 *
 * Any code contained in "verbatim" blocks (using "{% ... %}") will be inserted directly in
 * the generated code for the template. These blocks are not included in the output. This
 * can be used for simple things like break/continue in a loop, or control structures or
 * method calls (when they don't produce output). The `this` references the template instance.
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Company: {[values.company.toUpperCase() + ", " + values.title]}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '{% if (xindex % 2 === 0) continue; %}',
 *             '{name}',
 *             '{% if (xindex > 100) break; %}',
 *             '</div>',
 *         '</tpl></p>'
 *      );
 *
 * # Template member functions
 *
 * One or more member functions can be specified in a configuration object passed into the XTemplate constructor for
 * more complex processing:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<tpl if="this.isGirl(name)">',
 *                 '<p>Girl: {name} - {age}</p>',
 *             '<tpl else>',
 *                 '<p>Boy: {name} - {age}</p>',
 *             '</tpl>',
 *             '<tpl if="this.isBaby(age)">',
 *                 '<p>{name} is a baby!</p>',
 *             '</tpl>',
 *         '</tpl></p>',
 *         {
 *             // XTemplate configuration:
 *             disableFormats: true,
 *             // member functions:
 *             isGirl: function(name){
 *                return name == 'Aubrey' || name == 'Nikol';
 *             },
 *             isBaby: function(age){
 *                return age < 1;
 *             }
 *         }
 *     );
 *     tpl.overwrite(panel.body, data);
 */
Ext.define('Ext.XTemplate', {
    extend:  Ext.Template ,

                                      

    /**
     * @private
     */
    emptyObj: {},

    /**
     * @cfg {Boolean} compiled
     * Only applies to {@link Ext.Template}, XTemplates are compiled automatically on the
     * first call to {@link #apply} or {@link #applyOut}.
     * @hide
     */

    /**
     * @cfg {String/Array} definitions
     * Optional. A statement, or array of statements which set up `var`s which may then
     * be accessed within the scope of the generated function.
     */

    apply: function(values, parent) {
        return this.applyOut(values, [], parent).join('');
    },

    applyOut: function(values, out, parent) {
        var me = this,
            compiler;

        if (!me.fn) {
            compiler = new Ext.XTemplateCompiler({
                useFormat: me.disableFormats !== true,
                definitions: me.definitions
            });

            me.fn = compiler.compile(me.html);
        }

        try {
            me.fn(out, values, parent || me.emptyObj, 1, 1);
        } catch (e) {
        }

        return out;
    },

    /**
     * Does nothing. XTemplates are compiled automatically, so this function simply returns this.
     * @return {Ext.XTemplate} this
     */
    compile: function() {
        return this;
    },

    statics: {
        /**
         * Gets an `XTemplate` from an object (an instance of an {@link Ext#define}'d class).
         * Many times, templates are configured high in the class hierarchy and are to be
         * shared by all classes that derive from that base. To further complicate matters,
         * these templates are seldom actual instances but are rather configurations. For
         * example:
         *
         *      Ext.define('MyApp.Class', {
         *          extraCls: 'extra-class',
         *
         *          someTpl: [
         *              '<div class="{%this.emitClass(out)%}"></div>',
         *          {
         *              
         *              emitClass: function(out) {
         *                  out.push(this.owner.extraCls);
         *              }
         *          }]
         *      });
         *
         * The goal being to share that template definition with all instances and even
         * instances of derived classes, until `someTpl` is overridden. This method will
         * "upgrade" these configurations to be real `XTemplate` instances *in place* (to
         * avoid creating one instance per object).
         *
         * The resulting XTemplate will have an `owner` reference injected which refers back
         * to the owning object whether that is an object which has an *own instance*, or a
         * class prototype. Through this link, XTemplate member functions will be able to access
         * prototype properties of its owning class.
         *
         * @param {Object} instance The object from which to get the `XTemplate` (must be
         * an instance of an {@link Ext#define}'d class).
         * @param {String} name The name of the property by which to get the `XTemplate`.
         * @return {Ext.XTemplate} The `XTemplate` instance or null if not found.
         * @protected
         * @static
         */
        getTpl: function (instance, name) {
            var tpl = instance[name], // go for it! 99% of the time we will get it!
                owner;

            if (tpl && !tpl.isTemplate) { // tpl is just a configuration (not an instance)
                // create the template instance from the configuration:
                tpl = Ext.ClassManager.dynInstantiate('Ext.XTemplate', tpl);

                // and replace the reference with the new instance:
                if (instance.hasOwnProperty(name)) { // the tpl is on the instance
                    owner = instance;
                } else { // must be somewhere in the prototype chain
                    for (owner = instance.self.prototype; owner && !owner.hasOwnProperty(name); owner = owner.superclass) {
                    }
                }
                owner[name] = tpl;
                tpl.owner = owner;
            }
            // else !tpl (no such tpl) or the tpl is an instance already... either way, tpl
            // is ready to return

            return tpl || null;
        }
    }
});

// @tag dom,core
// @require Helper.js
// @define Ext.dom.Query
// @define Ext.core.DomQuery
// @define Ext.DomQuery

/*
 * This is code is also distributed under MIT license for use
 * with jQuery and prototype JavaScript libraries.
 */
/**
 * @class Ext.dom.Query
 * @alternateClassName Ext.DomQuery
 * @alternateClassName Ext.core.DomQuery
 * @singleton
 *
 * Provides high performance selector/xpath processing by compiling queries into reusable functions. New pseudo classes
 * and matchers can be plugged. It works on HTML and XML documents (if a content node is passed in).
 *
 * DomQuery supports most of the [CSS3 selectors spec][1], along with some custom selectors and basic XPath.
 *
 * All selectors, attribute filters and pseudos below can be combined infinitely in any order. For example
 * `div.foo:nth-child(odd)[@foo=bar].bar:first` would be a perfectly valid selector. Node filters are processed
 * in the order in which they appear, which allows you to optimize your queries for your document structure.
 *
 * ## Element Selectors:
 *
 *   - **`*`** any element
 *   - **`E`** an element with the tag E
 *   - **`E F`** All descendent elements of E that have the tag F
 *   - **`E > F`** or **E/F** all direct children elements of E that have the tag F
 *   - **`E + F`** all elements with the tag F that are immediately preceded by an element with the tag E
 *   - **`E ~ F`** all elements with the tag F that are preceded by a sibling element with the tag E
 *
 * ## Attribute Selectors:
 *
 * The use of `@` and quotes are optional. For example, `div[@foo='bar']` is also a valid attribute selector.
 *
 *   - **`E[foo]`** has an attribute "foo"
 *   - **`E[foo=bar]`** has an attribute "foo" that equals "bar"
 *   - **`E[foo^=bar]`** has an attribute "foo" that starts with "bar"
 *   - **`E[foo$=bar]`** has an attribute "foo" that ends with "bar"
 *   - **`E[foo*=bar]`** has an attribute "foo" that contains the substring "bar"
 *   - **`E[foo%=2]`** has an attribute "foo" that is evenly divisible by 2
 *   - **`E[foo!=bar]`** attribute "foo" does not equal "bar"
 *
 * ## Pseudo Classes:
 *
 *   - **`E:first-child`** E is the first child of its parent
 *   - **`E:last-child`** E is the last child of its parent
 *   - **`E:nth-child(_n_)`** E is the _n_th child of its parent (1 based as per the spec)
 *   - **`E:nth-child(odd)`** E is an odd child of its parent
 *   - **`E:nth-child(even)`** E is an even child of its parent
 *   - **`E:only-child`** E is the only child of its parent
 *   - **`E:checked`** E is an element that is has a checked attribute that is true (e.g. a radio or checkbox)
 *   - **`E:first`** the first E in the resultset
 *   - **`E:last`** the last E in the resultset
 *   - **`E:nth(_n_)`** the _n_th E in the resultset (1 based)
 *   - **`E:odd`** shortcut for :nth-child(odd)
 *   - **`E:even`** shortcut for :nth-child(even)
 *   - **`E:contains(foo)`** E's innerHTML contains the substring "foo"
 *   - **`E:nodeValue(foo)`** E contains a textNode with a nodeValue that equals "foo"
 *   - **`E:not(S)`** an E element that does not match simple selector S
 *   - **`E:has(S)`** an E element that has a descendent that matches simple selector S
 *   - **`E:next(S)`** an E element whose next sibling matches simple selector S
 *   - **`E:prev(S)`** an E element whose previous sibling matches simple selector S
 *   - **`E:any(S1|S2|S2)`** an E element which matches any of the simple selectors S1, S2 or S3
 *   - **`E:visible(true)`** an E element which is deeply visible according to {@link Ext.dom.Element#isVisible}
 *
 * ## CSS Value Selectors:
 *
 *   - **`E{display=none}`** css value "display" that equals "none"
 *   - **`E{display^=none}`** css value "display" that starts with "none"
 *   - **`E{display$=none}`** css value "display" that ends with "none"
 *   - **`E{display*=none}`** css value "display" that contains the substring "none"
 *   - **`E{display%=2}`** css value "display" that is evenly divisible by 2
 *   - **`E{display!=none}`** css value "display" that does not equal "none"
 * 
 * ## XML Namespaces:
 *   - **`ns|E`** an element with tag E and namespace prefix ns
 *
 * [1]: http:
 */
Ext.ns('Ext.core');

Ext.dom.Query = Ext.core.DomQuery = Ext.DomQuery = (function() {
    var DQ,
        doc = document,
        cache = {},
        simpleCache = {},
        valueCache = {},
        useClassList = !!doc.documentElement.classList,
        useElementPointer = !!doc.documentElement.firstElementChild,
        useChildrenCollection = (function() {
            var d = doc.createElement('div');
            d.innerHTML = '<!-- -->text<!-- -->';
            return d.children && (d.children.length === 0);
        })(),
        nonSpace = /\S/,
        trimRe = /^\s+|\s+$/g,
        tplRe = /\{(\d+)\}/g,
        modeRe = /^(\s?[\/>+~]\s?|\s|$)/,
        tagTokenRe = /^(#)?([\w\-\*\|\\]+)/,
        nthRe = /(\d*)n\+?(\d*)/,
        nthRe2 = /\D/,
        startIdRe = /^\s*#/,
        
        
        
        isIE = window.ActiveXObject ? true : false,
        key = 30803,
        longHex = /\\([0-9a-fA-F]{6})/g,
        shortHex = /\\([0-9a-fA-F]{1,6})\s{0,1}/g,
        nonHex = /\\([^0-9a-fA-F]{1})/g,
        escapes = /\\/g,
        num, hasEscapes,
        
        
        supportsColonNsSeparator = (function () {
            var xmlDoc,
                xmlString = '<r><a:b xmlns:a="n"></a:b></r>';

            if (window.DOMParser) {
                xmlDoc = (new DOMParser()).parseFromString(xmlString, "application/xml");
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.loadXML(xmlString);
            }

            return !!xmlDoc.getElementsByTagName('a:b').length;
        })(),

        
        
        longHexToChar = function($0, $1) {
            return String.fromCharCode(parseInt($1, 16));
        },

        
        shortToLongHex = function($0, $1) {
            while ($1.length < 6) {
                $1 = '0' + $1;
            }
            return '\\' + $1;
        },

        
        charToLongHex = function($0, $1) {
            num = $1.charCodeAt(0).toString(16);
            if (num.length === 1) {
                num = '0' + num;
            }
            return '\\0000' + num;
        },

        
        
        
        unescapeCssSelector = function(selector) {
            return (hasEscapes) ? selector.replace(longHex, longHexToChar) : selector;
        },

        
        setupEscapes = function(path) {
            hasEscapes = (path.indexOf('\\') > -1);
            if (hasEscapes) {
                path = path
                    .replace(shortHex, shortToLongHex)
                    .replace(nonHex, charToLongHex)
                    .replace(escapes, '\\\\');  
            }
            return path;
        };

    
    
    eval("var batch = 30803, child, next, prev, byClassName;");

    
    
    child = useChildrenCollection ?
        function child(parent, index) {
            return parent.children[index];
        } :
        function child(parent, index) {
            var i = 0,
                n = parent.firstChild;
            while (n) {
                if (n.nodeType == 1) {
                    if (++i == index) {
                        return n;
                    }
                }
                n = n.nextSibling;
            }
            return null;
        };

    
    next = useElementPointer ?
        function(n) {
            return n.nextElementSibling;
        } :
        function(n) {
            while ((n = n.nextSibling) && n.nodeType != 1);
            return n;
        };

    
    prev = useElementPointer ?
        function(n) {
            return n.previousElementSibling;
        } :
        function(n) {
            while ((n = n.previousSibling) && n.nodeType != 1);
            return n;
        };

    
    
    function children(parent) {
        var n = parent.firstChild,
            nodeIndex = -1,
            nextNode;

        while (n) {
            nextNode = n.nextSibling;
            
            if (n.nodeType == 3 && !nonSpace.test(n.nodeValue)) {
                parent.removeChild(n);
            } else {
                
                n.nodeIndex = ++nodeIndex;
            }
            n = nextNode;
        }
        return this;
    }

    
    
    byClassName = useClassList ? 
        function (nodeSet, cls) {
            cls = unescapeCssSelector(cls);
            if (!cls) {
                return nodeSet;
            }
            var result = [], ri = -1,
                i, ci, classList;

            for (i = 0; ci = nodeSet[i]; i++) {
                classList = ci.classList;
                if (classList) {
                    if (classList.contains(cls)) {
                        result[++ri] = ci;
                    }
                } else if ((' ' + ci.className + ' ').indexOf(cls) !== -1) {
                    
                    
                    result[++ri] = ci;
                }
            }
            return result;
        } :
        function (nodeSet, cls) {
            cls = unescapeCssSelector(cls);
            if (!cls) {
                return nodeSet;
            }
            var result = [], ri = -1,
                i, ci;

            for (i = 0; ci = nodeSet[i]; i++) {
                if ((' ' + ci.className + ' ').indexOf(cls) !== -1) {
                    result[++ri] = ci;
                }
            }
            return result;
        };

    function attrValue(n, attr) {
        
        if (!n.tagName && typeof n.length != "undefined") {
            n = n[0];
        }
        if (!n) {
            return null;
        }

        if (attr == "for") {
            return n.htmlFor;
        }
        if (attr == "class" || attr == "className") {
            return n.className;
        }
        return n.getAttribute(attr) || n[attr];

    }

    
    
    
    function getNodes(ns, mode, tagName) {
        var result = [], ri = -1, cs,
            i, ni, j, ci, cn, utag, n, cj;
        if (!ns) {
            return result;
        }
        tagName = tagName.replace('|', ':') || "*";
        
        if (typeof ns.getElementsByTagName != "undefined") {
            ns = [ns];
        }

        
        
        if (!mode) {
            tagName = unescapeCssSelector(tagName);
            if (!supportsColonNsSeparator && DQ.isXml(ns[0]) &&
                tagName.indexOf(':') !== -1) {
                
                
                
                
                
                
                for (i = 0; ni = ns[i]; i++) {
                    cs = ni.getElementsByTagName(tagName.split(':').pop());
                    for (j = 0; ci = cs[j]; j++) {
                        if (ci.tagName === tagName) {
                            result[++ri] = ci;
                        }
                    }
                }
            } else {
                for (i = 0; ni = ns[i]; i++) {
                    cs = ni.getElementsByTagName(tagName);
                    for (j = 0; ci = cs[j]; j++) {
                        result[++ri] = ci;
                    }
                }
            }
            
            
        } else if (mode == "/" || mode == ">") {
            utag = tagName.toUpperCase();
            for (i = 0; ni = ns[i]; i++) {
                cn = ni.childNodes;
                for (j = 0; cj = cn[j]; j++) {
                    if (cj.nodeName == utag || cj.nodeName == tagName || tagName == '*') {
                        result[++ri] = cj;
                    }
                }
            }
            
            
        } else if (mode == "+") {
            utag = tagName.toUpperCase();
            for (i = 0; n = ns[i]; i++) {
                while ((n = n.nextSibling) && n.nodeType != 1);
                if (n && (n.nodeName == utag || n.nodeName == tagName || tagName == '*')) {
                    result[++ri] = n;
                }
            }
            
            
        } else if (mode == "~") {
            utag = tagName.toUpperCase();
            for (i = 0; n = ns[i]; i++) {
                while ((n = n.nextSibling)) {
                    if (n.nodeName == utag || n.nodeName == tagName || tagName == '*') {
                        result[++ri] = n;
                    }
                }
            }
        }
        return result;
    }

    function concat(a, b) {
        a.push.apply(a, b);
        return a;
    }

    function byTag(cs, tagName) {
        if (cs.tagName || cs === doc) {
            cs = [cs];
        }
        if (!tagName) {
            return cs;
        }
        var result = [], ri = -1,
            i, ci;
        tagName = tagName.toLowerCase();
        for (i = 0; ci = cs[i]; i++) {
            if (ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName) {
                result[++ri] = ci;
            }
        }
        return result;
    }

    function byId(cs, id) {
        id = unescapeCssSelector(id);
        if (cs.tagName || cs === doc) {
            cs = [cs];
        }
        if (!id) {
            return cs;
        }
        var result = [], ri = -1,
            i, ci;
        for (i = 0; ci = cs[i]; i++) {
            if (ci && ci.id == id) {
                result[++ri] = ci;
                return result;
            }
        }
        return result;
    }

    
    
    function byAttribute(cs, attr, value, op, custom) {
        var result = [],
            ri = -1,
            useGetStyle = custom == "{",
            fn = DQ.operators[op],
            a,
            xml,
            hasXml,
            i, ci;

        value = unescapeCssSelector(value);

        for (i = 0; ci = cs[i]; i++) {
            
            if (ci.nodeType === 1) {
                
                if (!hasXml) {
                    xml = DQ.isXml(ci);
                    hasXml = true;
                }

                
                if (!xml) {
                    if (useGetStyle) {
                        a = DQ.getStyle(ci, attr);
                    } else if (attr == "class" || attr == "className") {
                        a = ci.className;
                    } else if (attr == "for") {
                        a = ci.htmlFor;
                    } else if (attr == "href") {
                        
                        
                        a = ci.getAttribute("href", 2);
                    } else {
                        a = ci.getAttribute(attr);
                    }
                } else {
                    a = ci.getAttribute(attr);
                }
                if ((fn && fn(a, value)) || (!fn && a)) {
                    result[++ri] = ci;
                }
            }
        }
        return result;
    }

    function byPseudo(cs, name, value) {
        value = unescapeCssSelector(value);
        return DQ.pseudos[name](cs, value);
    }

    function nodupIEXml(cs) {
        var d = ++key,
            r,
            i, len, c;
        cs[0].setAttribute("_nodup", d);
        r = [cs[0]];
        for (i = 1, len = cs.length; i < len; i++) {
            c = cs[i];
            if (!c.getAttribute("_nodup") != d) {
                c.setAttribute("_nodup", d);
                r[r.length] = c;
            }
        }
        for (i = 0, len = cs.length; i < len; i++) {
            cs[i].removeAttribute("_nodup");
        }
        return r;
    }

    function nodup(cs) {
        if (!cs) {
            return [];
        }
        var len = cs.length, c, i, r = cs, cj, ri = -1, d, j;
        if (!len || typeof cs.nodeType != "undefined" || len == 1) {
            return cs;
        }
        if (isIE && typeof cs[0].selectSingleNode != "undefined") {
            return nodupIEXml(cs);
        }
        d = ++key;
        cs[0]._nodup = d;
        for (i = 1; c = cs[i]; i++) {
            if (c._nodup != d) {
                c._nodup = d;
            } else {
                r = [];
                for (j = 0; j < i; j++) {
                    r[++ri] = cs[j];
                }
                for (j = i + 1; cj = cs[j]; j++) {
                    if (cj._nodup != d) {
                        cj._nodup = d;
                        r[++ri] = cj;
                    }
                }
                return r;
            }
        }
        return r;
    }

    function quickDiffIEXml(c1, c2) {
        var d = ++key,
            r = [],
            i, len;
        for (i = 0, len = c1.length; i < len; i++) {
            c1[i].setAttribute("_qdiff", d);
        }
        for (i = 0, len = c2.length; i < len; i++) {
            if (c2[i].getAttribute("_qdiff") != d) {
                r[r.length] = c2[i];
            }
        }
        for (i = 0, len = c1.length; i < len; i++) {
            c1[i].removeAttribute("_qdiff");
        }
        return r;
    }

    function quickDiff(c1, c2) {
        var len1 = c1.length,
            d = ++key,
            r = [],
            i, len;
        if (!len1) {
            return c2;
        }
        if (isIE && typeof c1[0].selectSingleNode != "undefined") {
            return quickDiffIEXml(c1, c2);
        }
        for (i = 0; i < len1; i++) {
            c1[i]._qdiff = d;
        }
        for (i = 0, len = c2.length; i < len; i++) {
            if (c2[i]._qdiff != d) {
                r[r.length] = c2[i];
            }
        }
        return r;
    }

    function quickId(ns, mode, root, id) {
        if (ns == root) {
            id = unescapeCssSelector(id);
            var d = root.ownerDocument || root;
            return d.getElementById(id);
        }
        ns = getNodes(ns, mode, "*");
        return byId(ns, id);
    }

    return DQ = {
        getStyle: function(el, name) {
            return Ext.fly(el, '_DomQuery').getStyle(name);
        },
        
        compile: function(path, type) {
            type = type || "select";

            
            var fn = ["var f = function(root) {\n var mode; ++batch; var n = root || document;\n"],
                lastPath,
                matchers = DQ.matchers,
                matchersLn = matchers.length,
                modeMatch,
                
                lmode = path.match(modeRe),
                tokenMatch, matched, j, t, m;

            path = setupEscapes(path);

            if (lmode && lmode[1]) {
                fn[fn.length] = 'mode="' + lmode[1].replace(trimRe, "") + '";';
                path = path.replace(lmode[1], "");
            }

            
            while (path.substr(0, 1) == "/") {
                path = path.substr(1);
            }

            while (path && lastPath != path) {
                lastPath = path;
                tokenMatch = path.match(tagTokenRe);
                if (type == "select") {
                    if (tokenMatch) {
                        
                        if (tokenMatch[1] == "#") {
                            fn[fn.length] = 'n = quickId(n, mode, root, "' + tokenMatch[2] + '");';
                        } else {
                            fn[fn.length] = 'n = getNodes(n, mode, "' + tokenMatch[2] + '");';
                        }
                        path = path.replace(tokenMatch[0], "");
                    } else if (path.substr(0, 1) != '@') {
                        fn[fn.length] = 'n = getNodes(n, mode, "*");';
                    }
                    
                } else {
                    if (tokenMatch) {
                        if (tokenMatch[1] == "#") {
                            fn[fn.length] = 'n = byId(n, "' + tokenMatch[2] + '");';
                        } else {
                            fn[fn.length] = 'n = byTag(n, "' + tokenMatch[2] + '");';
                        }
                        path = path.replace(tokenMatch[0], "");
                    }
                }
                while (!(modeMatch = path.match(modeRe))) {
                    matched = false;
                    for (j = 0; j < matchersLn; j++) {
                        t = matchers[j];
                        m = path.match(t.re);
                        if (m) {
                            fn[fn.length] = t.select.replace(tplRe, function(x, i) {
                                return m[i];
                            });
                            path = path.replace(m[0], "");
                            matched = true;
                            break;
                        }
                    }
                    
                    if (!matched) {
                        Ext.Error.raise({
                            sourceClass:'Ext.DomQuery',
                            sourceMethod:'compile',
                            msg:'Error parsing selector. Parsing failed at "' + path + '"'
                        });
                    }
                }
                if (modeMatch[1]) {
                    fn[fn.length] = 'mode="' + modeMatch[1].replace(trimRe, "") + '";';
                    path = path.replace(modeMatch[1], "");
                }
            }
            
            fn[fn.length] = "return nodup(n);\n}";

            
            eval(fn.join(""));
            return f;
        },

        
        jsSelect: function(path, root, type) {
            
            root = root || doc;

            if (typeof root == "string") {
                root = doc.getElementById(root);
            }
            var paths = path.split(","),
                results = [],
                i, len, subPath, result;

            
            for (i = 0, len = paths.length; i < len; i++) {
                subPath = paths[i].replace(trimRe, "");
                
                if (!cache[subPath]) {
                    
                    cache[subPath] = DQ.compile(subPath, type);
                    if (!cache[subPath]) {
                        Ext.Error.raise({
                            sourceClass:'Ext.DomQuery',
                            sourceMethod:'jsSelect',
                            msg:subPath + ' is not a valid selector'
                        });
                    }
                } else {
                    
                    
                    setupEscapes(subPath);
                }
                result = cache[subPath](root);
                if (result && result !== doc) {
                    results = results.concat(result);
                }
            }

            
            
            if (paths.length > 1) {
                return nodup(results);
            }
            return results;
        },

        isXml: function(el) {
            var docEl = (el ? el.ownerDocument || el : 0).documentElement;
            return docEl ? docEl.nodeName !== "HTML" : false;
        },

        
        select : doc.querySelectorAll ? function(path, root, type, single) {
            root = root || doc;
            if (!DQ.isXml(root)) {
                try {
                    
                    if (root.parentNode && (root.nodeType !== 9) && path.indexOf(',') === -1 && !startIdRe.test(path)) {
                        path = '#' + Ext.escapeId(Ext.id(root)) + ' ' + path;
                        root = root.parentNode;
                    }
                    return single ? [ root.querySelector(path) ]
                        : Ext.Array.toArray(root.querySelectorAll(path));
                }
                catch (e) {
                }
            }
            return DQ.jsSelect.call(this, path, root, type);
        } : function(path, root, type) {
            return DQ.jsSelect.call(this, path, root, type);
        },

        
        selectNode : function(path, root){
            return Ext.DomQuery.select(path, root, null, true)[0];
        },

        
        selectValue: function(path, root, defaultValue) {
            path = path.replace(trimRe, "");
            if (!valueCache[path]) {
                valueCache[path] = DQ.compile(path, "select");
            } else {
                setupEscapes(path);
            }

            var n = valueCache[path](root),
                v;

            n = n[0] ? n[0] : n;

            
            
            
            
            if (typeof n.normalize == 'function') {
                n.normalize();
            }

            v = (n && n.firstChild ? n.firstChild.nodeValue : null);
            return ((v === null || v === undefined || v === '') ? defaultValue : v);
        },

        
        selectNumber: function(path, root, defaultValue) {
            var v = DQ.selectValue(path, root, defaultValue || 0);
            return parseFloat(v);
        },

        
        is: function(el, ss) {
            if (typeof el == "string") {
                el = doc.getElementById(el);
            }
            var isArray = Ext.isArray(el),
                result = DQ.filter(isArray ? el : [el], ss);
            return isArray ? (result.length == el.length) : (result.length > 0);
        },

        
        filter: function(els, ss, nonMatches) {
            ss = ss.replace(trimRe, "");
            if (!simpleCache[ss]) {
                simpleCache[ss] = DQ.compile(ss, "simple");
            } else {
                setupEscapes(ss);
            }

            var result = simpleCache[ss](els);
            return nonMatches ? quickDiff(result, els) : result;
        },

        
        matchers: [{
            re: /^\.([\w\-\\]+)/,
            select: useClassList ? 'n = byClassName(n, "{1}");' : 'n = byClassName(n, " {1} ");'
        }, {
            re: /^\:([\w\-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
            select: 'n = byPseudo(n, "{1}", "{2}");'
        },  {
            re: /^(?:([\[\{])(?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
            select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
        }, {
            re: /^#([\w\-\\]+)/,
            select: 'n = byId(n, "{1}");'
        }, {
            re: /^@([\w\-\.]+)/,
            select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
        }],

        
        operators: {
            "=": function(a, v) {
                return a == v;
            },
            "!=": function(a, v) {
                return a != v;
            },
            "^=": function(a, v) {
                return a && a.substr(0, v.length) == v;
            },
            "$=": function(a, v) {
                return a && a.substr(a.length - v.length) == v;
            },
            "*=": function(a, v) {
                return a && a.indexOf(v) !== -1;
            },
            "%=": function(a, v) {
                return (a % v) === 0;
            },
            "|=": function(a, v) {
                return a && (a == v || a.substr(0, v.length + 1) == v + '-');
            },
            "~=": function(a, v) {
                return a && (' ' + a + ' ').indexOf(' ' + v + ' ') != -1;
            }
        },

        
        pseudos: {
            "first-child": function(c) {
                var r = [], ri = -1, n,
                    i, ci;
                for (i = 0; (ci = n = c[i]); i++) {
                    while ((n = n.previousSibling) && n.nodeType != 1);
                    if (!n) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "last-child": function(c) {
                var r = [], ri = -1, n,
                    i, ci;
                for (i = 0; (ci = n = c[i]); i++) {
                    while ((n = n.nextSibling) && n.nodeType != 1);
                    if (!n) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nth-child": function(c, a) {
                var r = [], ri = -1,
                    m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a),
                    f = (m[1] || 1) - 0, l = m[2] - 0,
                    i, n, j, cn, pn;
                for (i = 0; n = c[i]; i++) {
                    pn = n.parentNode;
                    if (batch != pn._batch) {
                        j = 0;
                        for (cn = pn.firstChild; cn; cn = cn.nextSibling) {
                            if (cn.nodeType == 1) {
                                cn.nodeIndex = ++j;
                            }
                        }
                        pn._batch = batch;
                    }
                    if (f == 1) {
                        if (l === 0 || n.nodeIndex == l) {
                            r[++ri] = n;
                        }
                    } else if ((n.nodeIndex + l) % f === 0) {
                        r[++ri] = n;
                    }
                }

                return r;
            },

            "only-child": function(c) {
                var r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (!prev(ci) && !next(ci)) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "empty": function(c) {
                var r = [], ri = -1,
                    i, ci, cns, j, cn, empty;
                for (i = 0; ci = c[i]; i++) {
                    cns = ci.childNodes;
                    j = 0;
                    empty = true;
                    while (cn = cns[j]) {
                        ++j;
                        if (cn.nodeType == 1 || cn.nodeType == 3) {
                            empty = false;
                            break;
                        }
                    }
                    if (empty) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "contains": function(c, v) {
                var r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if ((ci.textContent || ci.innerText || ci.text || '').indexOf(v) != -1) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nodeValue": function(c, v) {
                var r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (ci.firstChild && ci.firstChild.nodeValue == v) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "checked": function(c) {
                var r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (ci.checked === true) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "not": function(c, ss) {
                return DQ.filter(c, ss, true);
            },

            "any": function(c, selectors) {
                var ss = selectors.split('|'),
                    r = [], ri = -1, s,
                    i, ci, j;
                for (i = 0; ci = c[i]; i++) {
                    for (j = 0; s = ss[j]; j++) {
                        if (DQ.is(ci, s)) {
                            r[++ri] = ci;
                            break;
                        }
                    }
                }
                return r;
            },

            "odd": function(c) {
                return this["nth-child"](c, "odd");
            },

            "even": function(c) {
                return this["nth-child"](c, "even");
            },

            "nth": function(c, a) {
                return c[a - 1] || [];
            },

            "first": function(c) {
                return c[0] || [];
            },

            "last": function(c) {
                return c[c.length - 1] || [];
            },

            "has": function(c, ss) {
                var s = DQ.select,
                    r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (s(ss, ci).length > 0) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "next": function(c, ss) {
                var is = DQ.is,
                    r = [], ri = -1,
                    i, ci, n;
                for (i = 0; ci = c[i]; i++) {
                    n = next(ci);
                    if (n && is(n, ss)) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "prev": function(c, ss) {
                var is = DQ.is,
                    r = [], ri = -1,
                    i, ci, n;
                for (i = 0; ci = c[i]; i++) {
                    n = prev(ci);
                    if (n && is(n, ss)) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            focusable: function(candidates) {
                var len = candidates.length,
                    results = [],
                    i = 0,
                    c;

                for (; i < len; i++) {
                    c = candidates[i];
                    if (Ext.fly(c, '_DomQuery').isFocusable()) {
                        results.push(c);
                    }
                }

                return results;
            },
            
            visible: function(candidates, deep) {
                var len = candidates.length,
                    results = [],
                    i = 0,
                    c;

                for (; i < len; i++) {
                    c = candidates[i];
                    if (Ext.fly(c, '_DomQuery').isVisible(deep)) {
                        results.push(c);
                    }
                }

                return results;
            }
        }
    };
}());


Ext.query = Ext.DomQuery.select;





Ext.define('Ext.dom.Element_anim', {
    override: 'Ext.dom.Element',

    
    animate: function(config) {
        var me = this,
            listeners,
            anim,
            animId = me.dom.id || Ext.id(me.dom);

        if (!Ext.fx.Manager.hasFxBlock(animId)) {
            
            if (config.listeners) {
                listeners = config.listeners;
                delete config.listeners;
            }
            if (config.internalListeners) {
                config.listeners = config.internalListeners;
                delete config.internalListeners;
            }
            anim = new Ext.fx.Anim(me.anim(config));
            if (listeners) {
                anim.on(listeners);
            }
            Ext.fx.Manager.queueFx(anim);
        }
        return me;
    },

    
    anim: function(config) {
        if (!Ext.isObject(config)) {
            return (config) ? {} : false;
        }

        var me = this,
            duration = config.duration || Ext.fx.Anim.prototype.duration,
            easing = config.easing || 'ease',
            animConfig;

        if (config.stopAnimation) {
            me.stopAnimation();
        }

        Ext.applyIf(config, Ext.fx.Manager.getFxDefaults(me.id));

        
        Ext.fx.Manager.setFxDefaults(me.id, {
            delay: 0
        });

        animConfig = {
            
            target: me.dom,
            remove: config.remove,
            alternate: config.alternate || false,
            duration: duration,
            easing: easing,
            callback: config.callback,
            listeners: config.listeners,
            iterations: config.iterations || 1,
            scope: config.scope,
            block: config.block,
            concurrent: config.concurrent,
            delay: config.delay || 0,
            paused: true,
            keyframes: config.keyframes,
            from: config.from || {},
            to: Ext.apply({}, config)
        };
        Ext.apply(animConfig.to, config.to);

        
        delete animConfig.to.to;
        delete animConfig.to.from;
        delete animConfig.to.remove;
        delete animConfig.to.alternate;
        delete animConfig.to.keyframes;
        delete animConfig.to.iterations;
        delete animConfig.to.listeners;
        delete animConfig.to.target;
        delete animConfig.to.paused;
        delete animConfig.to.callback;
        delete animConfig.to.scope;
        delete animConfig.to.duration;
        delete animConfig.to.easing;
        delete animConfig.to.concurrent;
        delete animConfig.to.block;
        delete animConfig.to.stopAnimation;
        delete animConfig.to.delay;
        return animConfig;
    },

    
    slideIn: function(anchor, obj, slideOut) {
        var me = this,
            dom = me.dom,
            elStyle = dom.style,
            beforeAnim,
            wrapAnim,
            restoreScroll,
            wrapDomParentNode;

        anchor = anchor || "t";
        obj = obj || {};

        beforeAnim = function() {
            var animScope = this,
                listeners = obj.listeners,
                el = Ext.fly(dom, '_anim'),
                box, originalStyles, anim, wrap;

            if (!slideOut) {
                el.fixDisplay();
            }

            box = el.getBox();
            if ((anchor == 't' || anchor == 'b') && box.height === 0) {
                box.height = dom.scrollHeight;
            }
            else if ((anchor == 'l' || anchor == 'r') && box.width === 0) {
                box.width = dom.scrollWidth;
            }

            originalStyles = el.getStyles('width', 'height', 'left', 'right', 'top', 'bottom', 'position', 'z-index', true);
            el.setSize(box.width, box.height);

            
            if (obj.preserveScroll) {
                restoreScroll = el.cacheScrollValues();
            }

            wrap = el.wrap({
                id: Ext.id() + '-anim-wrap-for-' + el.dom.id,
                style: {
                    visibility: slideOut ? 'visible' : 'hidden'
                }
            });
            wrapDomParentNode = wrap.dom.parentNode;
            wrap.setPositioning(el.getPositioning(true));
            if (wrap.isStyle('position', 'static')) {
                wrap.position('relative');
            }
            el.clearPositioning('auto');
            wrap.clip();

            
            if (restoreScroll) {
                restoreScroll();
            }

            
            
            
            el.setStyle({
                visibility: '',
                position: 'absolute'
            });
            if (slideOut) {
                wrap.setSize(box.width, box.height);
            }

            switch (anchor) {
                case 't':
                    anim = {
                        from: {
                            width: box.width + 'px',
                            height: '0px'
                        },
                        to: {
                            width: box.width + 'px',
                            height: box.height + 'px'
                        }
                    };
                    elStyle.bottom = '0px';
                    break;
                case 'l':
                    anim = {
                        from: {
                            width: '0px',
                            height: box.height + 'px'
                        },
                        to: {
                            width: box.width + 'px',
                            height: box.height + 'px'
                        }
                    };
                    me.anchorAnimX(anchor);
                    break;
                case 'r':
                    anim = {
                        from: {
                            x: box.x + box.width,
                            width: '0px',
                            height: box.height + 'px'
                        },
                        to: {
                            x: box.x,
                            width: box.width + 'px',
                            height: box.height + 'px'
                        }
                    };
                    me.anchorAnimX(anchor);
                    break;
                case 'b':
                    anim = {
                        from: {
                            y: box.y + box.height,
                            width: box.width + 'px',
                            height: '0px'
                        },
                        to: {
                            y: box.y,
                            width: box.width + 'px',
                            height: box.height + 'px'
                        }
                    };
                    break;
                case 'tl':
                    anim = {
                        from: {
                            x: box.x,
                            y: box.y,
                            width: '0px',
                            height: '0px'
                        },
                        to: {
                            width: box.width + 'px',
                            height: box.height + 'px'
                        }
                    };
                    elStyle.bottom = '0px';
                    me.anchorAnimX('l');
                    break;
                case 'bl':
                    anim = {
                        from: {
                            y: box.y + box.height,
                            width: '0px',
                            height: '0px'
                        },
                        to: {
                            y: box.y,
                            width: box.width + 'px',
                            height: box.height + 'px'
                        }
                    };
                    me.anchorAnimX('l');
                    break;
                case 'br':
                    anim = {
                        from: {
                            x: box.x + box.width,
                            y: box.y + box.height,
                            width: '0px',
                            height: '0px'
                        },
                        to: {
                            x: box.x,
                            y: box.y,
                            width: box.width + 'px',
                            height: box.height + 'px'
                        }
                    };
                    me.anchorAnimX('r');
                    break;
                case 'tr':
                    anim = {
                        from: {
                            x: box.x + box.width,
                            width: '0px',
                            height: '0px'
                        },
                        to: {
                            x: box.x,
                            width: box.width + 'px',
                            height: box.height + 'px'
                        }
                    };
                    elStyle.bottom = '0px';
                    me.anchorAnimX('r');
                    break;
            }

            wrap.show();
            wrapAnim = Ext.apply({}, obj);
            delete wrapAnim.listeners;
            wrapAnim = new Ext.fx.Anim(Ext.applyIf(wrapAnim, {
                target: wrap,
                duration: 500,
                easing: 'ease-out',
                from: slideOut ? anim.to : anim.from,
                to: slideOut ? anim.from : anim.to
            }));

            
            wrapAnim.on('afteranimate', function() {
                var el = Ext.fly(dom, '_anim');
                
                el.setStyle(originalStyles);
                if (slideOut) {
                    if (obj.useDisplay) {
                        el.setDisplayed(false);
                    } else {
                        el.hide();
                    }
                }
                if (wrap.dom) {
                    if (wrap.dom.parentNode) {
                        wrap.dom.parentNode.insertBefore(el.dom, wrap.dom);
                    } else {
                        wrapDomParentNode.appendChild(el.dom);
                    }
                    wrap.remove();
                }
                
                if (restoreScroll) {
                    restoreScroll();
                }
                
                animScope.end();
            });
            
            if (listeners) {
                wrapAnim.on(listeners);
            }
        };

        me.animate({
            
            duration: obj.duration ? Math.max(obj.duration, 500) * 2 : 1000,
            listeners: {
                beforeanimate: beforeAnim 
            }
        });
        return me;
    },


    
    slideOut: function(anchor, o) {
        return this.slideIn(anchor, o, true);
    },

    
    puff: function(obj) {
        var me = this,
            dom = me.dom,
            beforeAnim,
            box = me.getBox(),
            originalStyles = me.getStyles('width', 'height', 'left', 'right', 'top', 'bottom', 'position', 'z-index', 'font-size', 'opacity', true);

       obj = Ext.applyIf(obj || {}, {
            easing: 'ease-out',
            duration: 500,
            useDisplay: false
        });

        beforeAnim = function() {
            var el = Ext.fly(dom, '_anim');
            
            el.clearOpacity();
            el.show();
            this.to = {
                width: box.width * 2,
                height: box.height * 2,
                x: box.x - (box.width / 2),
                y: box.y - (box.height /2),
                opacity: 0,
                fontSize: '200%'
            };
            this.on('afteranimate',function() {
                var el = Ext.fly(dom, '_anim');
                if (el) {
                    if (obj.useDisplay) {
                        el.setDisplayed(false);
                    } else {
                        el.hide();
                    }
                    el.setStyle(originalStyles);
                    Ext.callback(obj.callback, obj.scope);
                }
            });
        };

        me.animate({
            duration: obj.duration,
            easing: obj.easing,
            listeners: {
                beforeanimate: {
                    fn: beforeAnim
                }
            }
        });
        return me;
    },

    
    switchOff: function(obj) {
        var me = this,
            dom = me.dom,
            beforeAnim;

        obj = Ext.applyIf(obj || {}, {
            easing: 'ease-in',
            duration: 500,
            remove: false,
            useDisplay: false
        });

        beforeAnim = function() {
            var el = Ext.fly(dom, '_anim'),
                animScope = this,
                size = el.getSize(),
                xy = el.getXY(),
                keyframe, position;
                
            el.clearOpacity();
            el.clip();
            position = el.getPositioning();

            keyframe = new Ext.fx.Animator({
                target: dom,
                duration: obj.duration,
                easing: obj.easing,
                keyframes: {
                    33: {
                        opacity: 0.3
                    },
                    66: {
                        height: 1,
                        y: xy[1] + size.height / 2
                    },
                    100: {
                        width: 1,
                        x: xy[0] + size.width / 2
                    }
                }
            });
            keyframe.on('afteranimate', function() {
                var el = Ext.fly(dom, '_anim');
                if (obj.useDisplay) {
                    el.setDisplayed(false);
                } else {
                    el.hide();
                }
                el.clearOpacity();
                el.setPositioning(position);
                el.setSize(size);
                
                animScope.end();
            });
        };
        
        me.animate({
            
            duration: (Math.max(obj.duration, 500) * 2),
            listeners: {
                beforeanimate: {
                    fn: beforeAnim
                }
            },
            callback: obj.callback,
            scope: obj.scope
        });
        return me;
    },

    
    frame : function(color, count, obj){
        var me = this,
            dom = me.dom,
            beforeAnim;

        color = color || '#C3DAF9';
        count = count || 1;
        obj = obj || {};

        beforeAnim = function() {
            var el = Ext.fly(dom, '_anim'),
                animScope = this,
                box,
                proxy, proxyAnim;
                
            el.show();
            box = el.getBox();
            proxy = Ext.getBody().createChild({
                id: el.dom.id + '-anim-proxy',
                style: {
                    position : 'absolute',
                    'pointer-events': 'none',
                    'z-index': 35000,
                    border : '0px solid ' + color
                }
            });
            
            proxyAnim = new Ext.fx.Anim({
                target: proxy,
                duration: obj.duration || 1000,
                iterations: count,
                from: {
                    top: box.y,
                    left: box.x,
                    borderWidth: 0,
                    opacity: 1,
                    height: box.height,
                    width: box.width
                },
                to: {
                    top: box.y - 20,
                    left: box.x - 20,
                    borderWidth: 10,
                    opacity: 0,
                    height: box.height + 40,
                    width: box.width + 40
                }
            });
            proxyAnim.on('afteranimate', function() {
                proxy.remove();
                
                animScope.end();
            });
        };

        me.animate({
            
            duration: (Math.max(obj.duration, 500) * 2) || 2000,
            listeners: {
                beforeanimate: {
                    fn: beforeAnim
                }
            },
            callback: obj.callback,
            scope: obj.scope
        });
        return me;
    },

    
    ghost: function(anchor, obj) {
        var me = this,
            dom = me.dom,
            beforeAnim;

        anchor = anchor || "b";
        beforeAnim = function() {
            var el = Ext.fly(dom, '_anim'),
                width = el.getWidth(),
                height = el.getHeight(),
                xy = el.getXY(),
                position = el.getPositioning(),
                to = {
                    opacity: 0
                };
            switch (anchor) {
                case 't':
                    to.y = xy[1] - height;
                    break;
                case 'l':
                    to.x = xy[0] - width;
                    break;
                case 'r':
                    to.x = xy[0] + width;
                    break;
                case 'b':
                    to.y = xy[1] + height;
                    break;
                case 'tl':
                    to.x = xy[0] - width;
                    to.y = xy[1] - height;
                    break;
                case 'bl':
                    to.x = xy[0] - width;
                    to.y = xy[1] + height;
                    break;
                case 'br':
                    to.x = xy[0] + width;
                    to.y = xy[1] + height;
                    break;
                case 'tr':
                    to.x = xy[0] + width;
                    to.y = xy[1] - height;
                    break;
            }
            this.to = to;
            this.on('afteranimate', function () {
                var el = Ext.fly(dom, '_anim');
                if (el) {
                    el.hide();
                    el.clearOpacity();
                    el.setPositioning(position);
                }
            });
        };

        me.animate(Ext.applyIf(obj || {}, {
            duration: 500,
            easing: 'ease-out',
            listeners: {
                beforeanimate: beforeAnim
            }
        }));
        return me;
    },

    
    highlight: function(color, o) {
        var me = this,
            dom = me.dom,
            from = {},
            restore, to, attr, lns, event, fn;

        
        if (dom.tagName.match(me.tableTagRe)) {
            return me.select('div').highlight(color, o);
        }

        o = o || {};
        lns = o.listeners || {};
        attr = o.attr || 'backgroundColor';
        from[attr] = color || 'ffff9c';

        if (!o.to) {
            to = {};
            to[attr] = o.endColor || me.getColor(attr, 'ffffff', '');
        }
        else {
            to = o.to;
        }

        
        o.listeners = Ext.apply(Ext.apply({}, lns), {
            beforeanimate: function() {
                restore = dom.style[attr];
                var el = Ext.fly(dom, '_anim');
                el.clearOpacity();
                el.show();

                event = lns.beforeanimate;
                if (event) {
                    fn = event.fn || event;
                    return fn.apply(event.scope || lns.scope || window, arguments);
                }
            },
            afteranimate: function() {
                if (dom) {
                    dom.style[attr] = restore;
                }

                event = lns.afteranimate;
                if (event) {
                    fn = event.fn || event;
                    fn.apply(event.scope || lns.scope || window, arguments);
                }
            }
        });

        me.animate(Ext.apply({}, o, {
            duration: 1000,
            easing: 'ease-in',
            from: from,
            to: to
        }));
        return me;
    },

   
    pause: function(ms) {
        var me = this;
        Ext.fx.Manager.setFxDefaults(me.id, {
            delay: ms
        });
        return me;
    },

    
    fadeIn: function(o) {
        var me = this,
            dom = me.dom;
            
        me.animate(Ext.apply({}, o, {
            opacity: 1,
            internalListeners: {
                beforeanimate: function(anim){
                    
                    
                    var el = Ext.fly(dom, '_anim');
                    if (el.isStyle('display', 'none')) {
                        el.setDisplayed('');
                    } else {
                        el.show();
                    } 
                }
            }
        }));
        return this;
    },

    
    fadeOut: function(o) {
        var me = this,
            dom = me.dom;
            
        o = Ext.apply({
            opacity: 0,
            internalListeners: {
                afteranimate: function(anim){
                    if (dom && anim.to.opacity === 0) {
                        var el = Ext.fly(dom, '_anim');
                        if (o.useDisplay) {
                            el.setDisplayed(false);
                        } else {
                            el.hide();
                        }
                    }         
                }
            }
        }, o);
        me.animate(o);
        return me;
    },

    
    scale: function(w, h, o) {
        this.animate(Ext.apply({}, o, {
            width: w,
            height: h
        }));
        return this;
    },

    
    shift: function(config) {
        this.animate(config);
        return this;
    },

    
    anchorAnimX: function(anchor) {
        var xName = (anchor === 'l') ? 'right' : 'left';
        this.dom.style[xName] = '0px';
    }
});



Ext.define('Ext.dom.Element_dd', {
    override: 'Ext.dom.Element',

    
    initDD : function(group, config, overrides){
        var dd = new Ext.dd.DD(Ext.id(this.dom), group, config);
        return Ext.apply(dd, overrides);
    },

    
    initDDProxy : function(group, config, overrides){
        var dd = new Ext.dd.DDProxy(Ext.id(this.dom), group, config);
        return Ext.apply(dd, overrides);
    },

    
    initDDTarget : function(group, config, overrides){
        var dd = new Ext.dd.DDTarget(Ext.id(this.dom), group, config);
        return Ext.apply(dd, overrides);
    }
});



Ext.define('Ext.dom.Element_fx', {
    override: 'Ext.dom.Element'
},
function() {

var Element         = Ext.dom.Element,
    VISIBILITY      = "visibility",
    DISPLAY         = "display",
    NONE            = "none",
    HIDDEN          = 'hidden',
    VISIBLE         = 'visible',
    OFFSETS         = "offsets",
    ASCLASS         = "asclass",
    NOSIZE          = 'nosize',
    ORIGINALDISPLAY = 'originalDisplay',
    VISMODE         = 'visibilityMode',
    ISVISIBLE       = 'isVisible',
    OFFSETCLASS     = Ext.baseCSSPrefix + 'hide-offsets',
    getDisplay = function(el) {
        var data = (el.$cache || el.getCache()).data,
            display = data[ORIGINALDISPLAY];
            
        if (display === undefined) {
            data[ORIGINALDISPLAY] = display = '';
        }
        return display;
    },
    getVisMode = function(el){
        var data = (el.$cache || el.getCache()).data,
            visMode = data[VISMODE];
            
        if (visMode === undefined) {
            data[VISMODE] = visMode = Element.VISIBILITY;
        }
        return visMode;
    };

Element.override({
    
    originalDisplay : "",
    visibilityMode : 1,

    
    setVisible : function(visible, animate) {
        var me = this,
            dom = me.dom,
            visMode = getVisMode(me);

        
        if (typeof animate == 'string') {
            switch (animate) {
                case DISPLAY:
                    visMode = Element.DISPLAY;
                    break;
                case VISIBILITY:
                    visMode = Element.VISIBILITY;
                    break;
                case OFFSETS:
                    visMode = Element.OFFSETS;
                    break;
                case NOSIZE:
                case ASCLASS:
                    visMode = Element.ASCLASS;
                    break;
            }
            me.setVisibilityMode(visMode);
            animate = false;
        }

        if (!animate || !me.anim) {
            if (visMode == Element.DISPLAY) {
                return me.setDisplayed(visible);
            } else if (visMode == Element.OFFSETS) {
                me[visible?'removeCls':'addCls'](OFFSETCLASS);
            } else if (visMode == Element.VISIBILITY) {
                me.fixDisplay();
                
                dom.style.visibility = visible ? '' : HIDDEN;
            } else if (visMode == Element.ASCLASS) {
                me[visible?'removeCls':'addCls'](me.visibilityCls || Element.visibilityCls);
            }
        } else {
            
            if (visible) {
                me.setOpacity(0.01);
                me.setVisible(true);
            }
            if (!Ext.isObject(animate)) {
                animate = {
                    duration: 350,
                    easing: 'ease-in'
                };
            }
            me.animate(Ext.applyIf({
                callback: function() {
                    if (!visible) {
                        
                        
                        Ext.fly(dom, '_internal').setVisible(false).setOpacity(1);
                    }
                },
                to: {
                    opacity: (visible) ? 1 : 0
                }
            }, animate));
        }
        (me.$cache || me.getCache()).data[ISVISIBLE] = visible;
        return me;
    },

    
    hasMetrics  : function(){
        var visMode = getVisMode(this);
        return this.isVisible() || (visMode == Element.OFFSETS) || (visMode == Element.VISIBILITY);
    },

    
    toggle : function(animate){
        var me = this;
        me.setVisible(!me.isVisible(), me.anim(animate));
        return me;
    },

    
    setDisplayed : function(value) {
        if(typeof value == "boolean"){
           value = value ? getDisplay(this) : NONE;
        }
        this.setStyle(DISPLAY, value);
        return this;
    },

    
    fixDisplay : function(){
        var me = this;
        if (me.isStyle(DISPLAY, NONE)) {
            me.setStyle(VISIBILITY, HIDDEN);
            me.setStyle(DISPLAY, getDisplay(me)); 
            if (me.isStyle(DISPLAY, NONE)) { 
                me.setStyle(DISPLAY, "block");
            }
        }
    },

    
    hide : function(animate){
        
        if (typeof animate == 'string'){
            this.setVisible(false, animate);
            return this;
        }
        this.setVisible(false, this.anim(animate));
        return this;
    },

    
    show : function(animate){
        
        if (typeof animate == 'string'){
            this.setVisible(true, animate);
            return this;
        }
        this.setVisible(true, this.anim(animate));
        return this;
    }
});

});



Ext.define('Ext.dom.Element_position', {
    override: 'Ext.dom.Element'
},
function() {

var flyInstance,
    Element = this,
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom",
    POSITION = "position",
    STATIC = "static",
    RELATIVE = "relative",
    ZINDEX = "z-index",
    BODY = 'BODY',

    PADDING = 'padding',
    BORDER = 'border',
    SLEFT = '-left',
    SRIGHT = '-right',
    STOP = '-top',
    SBOTTOM = '-bottom',
    SWIDTH = '-width',
    
    borders = {l: BORDER + SLEFT + SWIDTH, r: BORDER + SRIGHT + SWIDTH, t: BORDER + STOP + SWIDTH, b: BORDER + SBOTTOM + SWIDTH},
    paddings = {l: PADDING + SLEFT, r: PADDING + SRIGHT, t: PADDING + STOP, b: PADDING + SBOTTOM},
    paddingsTLRB = [paddings.l, paddings.r, paddings.t, paddings.b],
    bordersTLRB = [borders.l,  borders.r,  borders.t,  borders.b],
    round = Math.round,
    doc = document,
    fly = function (el) {
        if (!flyInstance) {
            flyInstance = new Ext.Element.Fly();
        }
        flyInstance.attach(el);
        return flyInstance;
    };

    Element.override({

        pxRe: /^\d+(?:\.\d*)?px$/i,

        inheritableStatics: {
            getX: function(el) {
                return Element.getXY(el)[0];
            },

            getXY: function(el) {
                var bd = doc.body,
                    docEl = doc.documentElement,
                    leftBorder = 0,
                    topBorder = 0,
                    ret = [0,0],
                    box,
                    scroll;

                el = Ext.getDom(el);

                if(el != doc && el != bd){
                    
                    
                    if (Ext.isIE) {
                        try {
                            box = el.getBoundingClientRect();
                            
                            
                            topBorder = docEl.clientTop || bd.clientTop;
                            leftBorder = docEl.clientLeft || bd.clientLeft;
                        } catch (ex) {
                            box = { left: 0, top: 0 };
                        }
                    } else {
                        box = el.getBoundingClientRect();
                    }

                    scroll = fly(doc).getScroll();
                    ret = [
                        round(box.left + scroll.left - leftBorder),
                        round(box.top + scroll.top - topBorder)
                    ];
                }
                return ret;
            },

            getY: function(el) {
                return Element.getXY(el)[1];
            },

            setX: function(el, x) {
                Element.setXY(el, [x, false]);
            },

            setXY: function(el, xy) {
                (el = Ext.fly(el, '_setXY')).position();

                var pts = el.translatePoints(xy),
                    style = el.dom.style,
                    pos;

                
                
                style.right = 'auto';
                for (pos in pts) {
                    if (!isNaN(pts[pos])) {
                        style[pos] = pts[pos] + "px";
                    }
                }
            },

            setY: function(el, y) {
                Element.setXY(el, [false, y]);
            }
        },

        
        center: function(centerIn){
            return this.alignTo(centerIn || doc, 'c-c');
        },

        
        clearPositioning: function(value) {
            value = value || '';
            return this.setStyle({
                left : value,
                right : value,
                top : value,
                bottom : value,
                'z-index' : '',
                position : STATIC
            });
        },

        getAnchorToXY: function(el, anchor, local, mySize) {
            return el.getAnchorXY(anchor, local, mySize);
        },

        
        getBottom: function(local) {
            return (local ? this.getLocalY() : this.getY()) + this.getHeight();
        },

        getBorderPadding: function() {
            var paddingWidth = this.getStyle(paddingsTLRB),
                bordersWidth = this.getStyle(bordersTLRB);

            return {
                beforeX: (parseFloat(bordersWidth[borders.l]) || 0) + (parseFloat(paddingWidth[paddings.l]) || 0),
                afterX: (parseFloat(bordersWidth[borders.r]) || 0) + (parseFloat(paddingWidth[paddings.r]) || 0),
                beforeY: (parseFloat(bordersWidth[borders.t]) || 0) + (parseFloat(paddingWidth[paddings.t]) || 0),
                afterY: (parseFloat(bordersWidth[borders.b]) || 0) + (parseFloat(paddingWidth[paddings.b]) || 0)
            };
        },

        
        getCenterXY: function(){
            return this.getAlignToXY(doc, 'c-c');
        },

        
        getLeft: function(local) {
            return local ? this.getLocalX() : this.getX();
        },

        
        getLocalX: function() {
            var me = this,
                offsetParent = me.dom.offsetParent,
                x = me.getStyle('left');

            if (!x || x === 'auto') {
                x = 0;
            } else if (me.pxRe.test(x)) {
                x = parseFloat(x);
            } else {
                x = me.getX();
                if (offsetParent) {
                    x -= Element.getX(offsetParent);
                }
            }

            return x;
        },

        
        getLocalXY: function() {
            var me = this,
                offsetParent = me.dom.offsetParent,
                style = me.getStyle(['left', 'top']),
                x = style.left,
                y = style.top;

            if (!x || x === 'auto') {
                x = 0;
            } else if (me.pxRe.test(x)) {
                x = parseFloat(x);
            } else {
                x = me.getX();
                if (offsetParent) {
                    x -= Element.getX(offsetParent);
                }
            }

            if (!y || y === 'auto') {
                y = 0;
            } else if (me.pxRe.test(y)) {
                y = parseFloat(y);
            } else {
                y = me.getY();
                if (offsetParent) {
                    y -= Element.getY(offsetParent);
                }
            }

            return [x, y];
        },

        
        getLocalY: function() {
            var me = this,
                offsetParent = me.dom.offsetParent,
                y = me.getStyle('top');

            if (!y || y === 'auto') {
                y = 0;
            } else if (me.pxRe.test(y)) {
                y = parseFloat(y);
            } else {
                y = me.getY();
                if (offsetParent) {
                    y -= Element.getY(offsetParent);
                }
            }

            return y;
        },

        
        getPageBox: function(getRegion) {
            var me = this,
                dom = me.dom,
                isDoc = dom.nodeName == BODY,
                w = isDoc ? Ext.Element.getViewWidth() : dom.offsetWidth,
                h = isDoc ? Ext.Element.getViewHeight() : dom.offsetHeight,
                xy = me.getXY(),
                t = xy[1],
                r = xy[0] + w,
                b = xy[1] + h,
                l = xy[0];

            if (getRegion) {
                return new Ext.util.Region(t, r, b, l);
            }
            else {
                return {
                    left: l,
                    top: t,
                    width: w,
                    height: h,
                    right: r,
                    bottom: b
                };
            }
        },

        
        getPositioning: function(autoPx){
            var styles = this.getStyle(['left', 'top', 'position', 'z-index']),
                dom = this.dom;

            if(autoPx) {
                if(styles.left === 'auto') {
                    styles.left = dom.offsetLeft + 'px';
                }
                if(styles.top === 'auto') {
                    styles.top = dom.offsetTop + 'px';
                }
            }

            return styles;
        },

        
        getRight: function(local) {
            return (local ? this.getLocalX() : this.getX()) + this.getWidth();
        },

        
        getTop: function(local) {
            return local ? this.getLocalY() : this.getY();
        },

        
        getX: function() {
            return Element.getX(this.dom);
        },

        
        getXY: function() {
            return Element.getXY(this.dom);
        },

        
        getY: function() {
            return Element.getY(this.dom);
        },

        
        moveTo: function(x, y, animate) {
            return this.setXY([x, y], animate);
        },

        
        position: function(pos, zIndex, x, y) {
            var me = this;

            if (!pos && me.isStyle(POSITION, STATIC)) {
                me.setStyle(POSITION, RELATIVE);
            } else if (pos) {
                me.setStyle(POSITION, pos);
            }
            if (zIndex) {
                me.setStyle(ZINDEX, zIndex);
            }
            if (x || y) {
                me.setXY([x || false, y || false]);
            }
        },

        
        setBottom: function(bottom) {
            this.dom.style[BOTTOM] = this.addUnits(bottom);
            return this;
        },

        
        setBounds: function(x, y, width, height, animate) {
            return this.setBox({
                x: x,
                y: y,
                width: width,
                height: height
            }, animate);
        },

        
        setLeft: function(left) {
            this.dom.style[LEFT] = this.addUnits(left); 
            return this;
        },

        
        setLeftTop: function(left, top) {
            var me = this,
                style = me.dom.style;

            style.left = me.addUnits(left);
            style.top = me.addUnits(top);

            return me;
        },

        setLocalX: function(x) {
            var style = this.dom.style;

            
            style.right = 'auto';
            style.left = (x === null) ? 'auto' : x + 'px';
        },

        setLocalXY: function(x, y) {
            var style = this.dom.style;

            
            style.right = 'auto';

            if (x && x.length) {
                y = x[1];
                x = x[0];
            }

            if (x === null) {
                style.left = 'auto';
            } else if (x !== undefined) {
                style.left = x + 'px';
            }

            if (y === null) {
                style.top = 'auto';
            } else if (y !== undefined) {
                style.top = y + 'px';
            }
        },

        setLocalY: function(y) {
            this.dom.style.top = (y === null) ? 'auto' : y + 'px';
        },

        
        setLocation: function(x, y, animate) {
            return this.setXY([x, y], animate);
        },

        
        setPositioning: function(pc) {
            return this.setStyle(pc);
        },

        
        setRight: function(right) {
            this.dom.style[RIGHT] = this.addUnits(right);
            return this;
        },

        
        setTop: function(top) {
            this.dom.style[TOP] = this.addUnits(top);
            return this;
        },

        setX: function(x, animate) {
            return this.setXY([x, this.getY()], animate);
        },

        setXY: function(xy, animate) {
            var me = this;

            if (!animate || !me.anim) {
                Element.setXY(me.dom, xy);
            } else {
                if (!Ext.isObject(animate)) {
                    animate = {};
                }
                me.animate(Ext.applyIf({ to: { x: xy[0], y: xy[1] } }, animate));
            }
            return this;
        },

        setY: function(y, animate) {
            return this.setXY([this.getX(), y], animate);
        }
    });

    
    Element.getTrueXY = Element.getXY;

});



Ext.define('Ext.dom.Element_scroll', {
    override: 'Ext.dom.Element',

    
    isScrollable: function() {
        var dom = this.dom;
        return dom.scrollHeight > dom.clientHeight || dom.scrollWidth > dom.clientWidth;
    },

    
    getScroll: function() {
        var me = this,
            dom = me.dom,
            doc = document,
            body = doc.body,
            docElement = doc.documentElement,
            left, top;

        if (dom === doc || dom === body) {
            
            
            
            
            
            
            
            
            left = docElement.scrollLeft || (body ? body.scrollLeft : 0);
            top = docElement.scrollTop || (body ? body.scrollTop : 0);
        } else {
            left = dom.scrollLeft;
            top = dom.scrollTop;
        }

        return {
            left: left,
            top: top
        };
    },
    
    
    getScrollLeft: function() {
        var dom = this.dom,
            doc = document;
            
        if (dom === doc || dom === doc.body) {
            return this.getScroll().left;
        } else {
            return dom.scrollLeft;
        }
    },
    
    
    getScrollTop: function(){
        var dom = this.dom,
            doc = document;
            
        if (dom === doc || dom === doc.body) {
            return this.getScroll().top;
        } else {
            return dom.scrollTop;
        }
    },
    
    
    setScrollLeft: function(left){
        this.dom.scrollLeft = left;
        return this;
    },
    
    
    setScrollTop: function(top) {
        this.dom.scrollTop = top;
        return this;
    },

    
    scrollBy: function(deltaX, deltaY, animate) {
        var me = this,
            dom = me.dom;

        
        if (deltaX.length) {
            animate = deltaY;
            deltaY = deltaX[1];
            deltaX = deltaX[0];
        } else if (typeof deltaX != 'number') { 
            animate = deltaY;
            deltaY = deltaX.y;
            deltaX = deltaX.x;
        }

        if (deltaX) {
            me.scrollTo('left', me.constrainScrollLeft(dom.scrollLeft + deltaX), animate);
        }
        if (deltaY) {
            me.scrollTo('top', me.constrainScrollTop(dom.scrollTop + deltaY), animate);
        }

        return me;
    },

    
    scrollTo: function(side, value, animate) {
        
        var top = /top/i.test(side),
            me = this,
            prop = top ? 'scrollTop' : 'scrollLeft',
            dom = me.dom,
            animCfg;

        if (!animate || !me.anim) {
            
            dom[prop] = value;
            
            dom[prop] = value;
        }
        else {
            animCfg = {
                to: {}
            };
            animCfg.to[prop] = value;
            if (Ext.isObject(animate)) {
                Ext.applyIf(animCfg, animate);
            }
            me.animate(animCfg);
        }
        return me;
    },

    
    scrollIntoView: function(container, hscroll, animate, highlight) {
        var me = this,
            dom = me.dom,
            offsets = me.getOffsetsTo(container = Ext.getDom(container) || Ext.getBody().dom),
        
            left = offsets[0] + container.scrollLeft,
            top = offsets[1] + container.scrollTop,
            bottom = top + dom.offsetHeight,
            right = left + dom.offsetWidth,
        
            ctClientHeight = container.clientHeight,
            ctScrollTop = parseInt(container.scrollTop, 10),
            ctScrollLeft = parseInt(container.scrollLeft, 10),
            ctBottom = ctScrollTop + ctClientHeight,
            ctRight = ctScrollLeft + container.clientWidth,
            newPos;

        
        if (highlight) {
            if (animate) {
                animate = Ext.apply({
                    listeners: {
                        afteranimate: function() {
                            me.scrollChildFly.attach(dom).highlight();
                        }
                    }
                }, animate);
            } else {
                me.scrollChildFly.attach(dom).highlight();
            }
        }

        if (dom.offsetHeight > ctClientHeight || top < ctScrollTop) {
            newPos = top;
        } else if (bottom > ctBottom) {
            newPos = bottom - ctClientHeight;
        }
        if (newPos != null) {
            me.scrollChildFly.attach(container).scrollTo('top', newPos, animate);
        }

        if (hscroll !== false) {
            newPos = null;
            if (dom.offsetWidth > container.clientWidth || left < ctScrollLeft) {
                newPos = left;
            } else if (right > ctRight) {
                newPos = right - container.clientWidth;
            }
            if (newPos != null) {
                me.scrollChildFly.attach(container).scrollTo('left', newPos, animate);
            }
        }
        return me;
    },

    
    scrollChildIntoView: function(child, hscroll) {
        this.scrollChildFly.attach(Ext.getDom(child)).scrollIntoView(this, hscroll);
    },

    
    scroll: function(direction, distance, animate) {
        if (!this.isScrollable()) {
            return false;
        }
        var me = this,
            dom = me.dom,
            side = direction === 'r' || direction === 'l' ? 'left' : 'top',
            scrolled = false,
            currentScroll, constrainedScroll;

        if (direction === 'r') {
            distance = -distance;
        }

        if (side === 'left') {
            currentScroll = dom.scrollLeft;
            constrainedScroll = me.constrainScrollLeft(currentScroll + distance);
        } else {
            currentScroll = dom.scrollTop;
            constrainedScroll = me.constrainScrollTop(currentScroll + distance);
        }

        if (constrainedScroll !== currentScroll) {
            this.scrollTo(side, constrainedScroll, animate);
            scrolled = true;
        }

        return scrolled;
    },

    constrainScrollLeft: function(left) {
        var dom = this.dom;
        return Math.max(Math.min(left, dom.scrollWidth - dom.clientWidth), 0);
    },

    constrainScrollTop: function(top) {
        var dom = this.dom;
        return Math.max(Math.min(top, dom.scrollHeight - dom.clientHeight), 0);
    }
}, function() {
    this.prototype.scrollChildFly = new this.Fly();
    this.prototype.scrolltoFly = new this.Fly();
});



Ext.define('Ext.dom.Element_style', {
    override: 'Ext.dom.Element'
},
function() {

var Element = this,
    view = document.defaultView,
    adjustDirect2DTableRe = /table-row|table-.*-group/,
    INTERNAL = '_internal',
    HIDDEN = 'hidden',
    HEIGHT = 'height',
    WIDTH = 'width',
    ISCLIPPED = 'isClipped',
    OVERFLOW = 'overflow',
    OVERFLOWX = 'overflow-x',
    OVERFLOWY = 'overflow-y',
    ORIGINALCLIP = 'originalClip',
    DOCORBODYRE = /#document|body/i,
    
    
    styleHooks, verticalStyleHooks90, verticalStyleHooks270,
    edges, k, edge, borderWidth;

if (!view || !view.getComputedStyle) {
    Element.prototype.getStyle = function (property, inline) {
        var me = this,
            dom = me.dom,
            multiple = typeof property != 'string',
            hooks = me.styleHooks,
            prop = property,
            props = prop,
            len = 1,
            isInline = inline,
            camel, domStyle, values, hook, out, style, i;

        if (multiple) {
            values = {};
            prop = props[0];
            i = 0;
            if (!(len = props.length)) {
                return values;
            }
        }

        if (!dom || dom.documentElement) {
            return values || '';
        }

        domStyle = dom.style;

        if (inline) {
            style = domStyle;
        } else {
            style = dom.currentStyle;

            
            if (!style) {
                isInline = true;
                style = domStyle;
            }
        }

        do {
            hook = hooks[prop];

            if (!hook) {
                hooks[prop] = hook = { name: Element.normalize(prop) };
            }

            if (hook.get) {
                out = hook.get(dom, me, isInline, style);
            } else {
                camel = hook.name;

                
                
                
                
                if (hook.canThrow) {
                    try {
                        out = style[camel];
                    } catch (e) {
                        out = '';
                    }
                } else {
                    
                    
                    out = style ? style[camel] : '';
                }
            }

            if (!multiple) {
                return out;
            }

            values[prop] = out;
            prop = props[++i];
        } while (i < len);

        return values;
    };
}

Element.override({
    getHeight: function(contentHeight, preciseHeight) {
        var me = this,
            hidden = me.isStyle('display', 'none'),
            height,
            floating;

        if (hidden) {
            return 0;
        }

        height = me.dom.offsetHeight;

        
        if (Ext.supports.Direct2DBug) {
            floating = me.adjustDirect2DDimension(HEIGHT);
            if (preciseHeight) {
                height += floating;
            }
            else if (floating > 0 && floating < 0.5) {
                height++;
            }
        }

        if (contentHeight) {
            height -= me.getBorderWidth("tb") + me.getPadding("tb");
        }

        return (height < 0) ? 0 : height;
    },

    getWidth: function(contentWidth, preciseWidth) {
        var me = this,
            dom = me.dom,
            hidden = me.isStyle('display', 'none'),
            rect, width, floating;

        if (hidden) {
            return 0;
        }

        
        
        
        
        
        
        if (preciseWidth && Ext.supports.BoundingClientRect) {
            rect = dom.getBoundingClientRect();
            
            
            
            
            width = (me.vertical && !Ext.isIE9 && !Ext.supports.RotatedBoundingClientRect) ?
                    (rect.bottom - rect.top) : (rect.right - rect.left);
        } else {
            width = dom.offsetWidth;
        }

        
        
        
        if (Ext.supports.Direct2DBug && !me.vertical) {
            
            floating = me.adjustDirect2DDimension(WIDTH);
            if (preciseWidth) {
                width += floating;
            }
            
            
            
            else if (floating > 0 && floating < 0.5) {
                width++;
            }
        }

        if (contentWidth) {
            width -= me.getBorderWidth("lr") + me.getPadding("lr");
        }

        return (width < 0) ? 0 : width;
    },

    setWidth: function(width, animate) {
        var me = this;
        width = me.adjustWidth(width);
        if (!animate || !me.anim) {
            me.dom.style.width = me.addUnits(width);
        }
        else {
            if (!Ext.isObject(animate)) {
                animate = {};
            }
            me.animate(Ext.applyIf({
                to: {
                    width: width
                }
            }, animate));
        }
        return me;
    },

    setHeight : function(height, animate) {
        var me = this;

        height = me.adjustHeight(height);
        if (!animate || !me.anim) {
            me.dom.style.height = me.addUnits(height);
        }
        else {
            if (!Ext.isObject(animate)) {
                animate = {};
            }
            me.animate(Ext.applyIf({
                to: {
                    height: height
                }
            }, animate));
        }

        return me;
    },

    applyStyles: function(style) {
        Ext.DomHelper.applyStyles(this.dom, style);
        return this;
    },

    setSize: function(width, height, animate) {
        var me = this;

        if (Ext.isObject(width)) { 
            animate = height;
            height = width.height;
            width = width.width;
        }

        width = me.adjustWidth(width);
        height = me.adjustHeight(height);

        if (!animate || !me.anim) {
            me.dom.style.width = me.addUnits(width);
            me.dom.style.height = me.addUnits(height);
        }
        else {
            if (animate === true) {
                animate = {};
            }
            me.animate(Ext.applyIf({
                to: {
                    width: width,
                    height: height
                }
            }, animate));
        }

        return me;
    },

    getViewSize : function() {
        var me = this,
            dom = me.dom,
            isDoc = DOCORBODYRE.test(dom.nodeName),
            ret;

        
        if (isDoc) {
            ret = {
                width : Element.getViewWidth(),
                height : Element.getViewHeight()
            };
        } else {
            ret = {
                width : dom.clientWidth,
                height : dom.clientHeight
            };
        }

        return ret;
    },

    getSize: function(contentSize) {
        return {width: this.getWidth(contentSize), height: this.getHeight(contentSize)};
    },

    

    
    adjustWidth : function(width) {
        var me = this,
            isNum = (typeof width == 'number');

        if (isNum && me.autoBoxAdjust && !me.isBorderBox()) {
            width -= (me.getBorderWidth("lr") + me.getPadding("lr"));
        }
        return (isNum && width < 0) ? 0 : width;
    },

    
    adjustHeight : function(height) {
        var me = this,
            isNum = (typeof height == "number");

        if (isNum && me.autoBoxAdjust && !me.isBorderBox()) {
            height -= (me.getBorderWidth("tb") + me.getPadding("tb"));
        }
        return (isNum && height < 0) ? 0 : height;
    },

    
    getColor : function(attr, defaultValue, prefix) {
        var v = this.getStyle(attr),
            color = prefix || prefix === '' ? prefix : '#',
            h, len, i=0;

        if (!v || (/transparent|inherit/.test(v))) {
            return defaultValue;
        }
        if (/^r/.test(v)) {
             v = v.slice(4, v.length - 1).split(',');
             len = v.length;
             for (; i<len; i++) {
                h = parseInt(v[i], 10);
                color += (h < 16 ? '0' : '') + h.toString(16);
            }
        } else {
            v = v.replace('#', '');
            color += v.length == 3 ? v.replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3') : v;
        }
        return(color.length > 5 ? color.toLowerCase() : defaultValue);
    },

    
    setOpacity: function(opacity, animate) {
        var me = this;

        if (!me.dom) {
            return me;
        }

        if (!animate || !me.anim) {
            me.setStyle('opacity', opacity);
        }
        else {
            if (typeof animate != 'object') {
                animate = {
                    duration: 350,
                    easing: 'ease-in'
                };
            }

            me.animate(Ext.applyIf({
                to: {
                    opacity: opacity
                }
            }, animate));
        }
        return me;
    },

    
    clearOpacity : function() {
        return this.setOpacity('');
    },

    
    adjustDirect2DDimension: function(dimension) {
        var me = this,
            dom = me.dom,
            display = me.getStyle('display'),
            inlineDisplay = dom.style.display,
            inlinePosition = dom.style.position,
            originIndex = dimension === WIDTH ? 0 : 1,
            currentStyle = dom.currentStyle,
            floating;

        if (display === 'inline') {
            dom.style.display = 'inline-block';
        }

        dom.style.position = display.match(adjustDirect2DTableRe) ? 'absolute' : 'static';

        
        
        
        
        
        floating = (parseFloat(currentStyle[dimension]) || parseFloat(currentStyle.msTransformOrigin.split(' ')[originIndex]) * 2) % 1;

        dom.style.position = inlinePosition;

        if (display === 'inline') {
            dom.style.display = inlineDisplay;
        }

        return floating;
    },

    
    clip : function() {
        var me = this,
            data = (me.$cache || me.getCache()).data,
            style;

        if (!data[ISCLIPPED]) {
            data[ISCLIPPED] = true;
            style = me.getStyle([OVERFLOW, OVERFLOWX, OVERFLOWY]);
            data[ORIGINALCLIP] = {
                o: style[OVERFLOW],
                x: style[OVERFLOWX],
                y: style[OVERFLOWY]
            };
            me.setStyle(OVERFLOW, HIDDEN);
            me.setStyle(OVERFLOWX, HIDDEN);
            me.setStyle(OVERFLOWY, HIDDEN);
        }
        return me;
    },

    
    unclip : function() {
        var me = this,
            data = (me.$cache || me.getCache()).data,
            clip;

        if (data[ISCLIPPED]) {
            data[ISCLIPPED] = false;
            clip = data[ORIGINALCLIP];
            if (clip.o) {
                me.setStyle(OVERFLOW, clip.o);
            }
            if (clip.x) {
                me.setStyle(OVERFLOWX, clip.x);
            }
            if (clip.y) {
                me.setStyle(OVERFLOWY, clip.y);
            }
        }
        return me;
    },

    
    boxWrap : function(cls) {
        cls = cls || Ext.baseCSSPrefix + 'box';
        var el = Ext.get(this.insertHtml("beforeBegin", "<div class='" + cls + "'>" + Ext.String.format(Element.boxMarkup, cls) + "</div>"));
        Ext.DomQuery.selectNode('.' + cls + '-mc', el.dom).appendChild(this.dom);
        return el;
    },

    
    getComputedHeight : function() {
        var me = this,
            h = Math.max(me.dom.offsetHeight, me.dom.clientHeight);
        if (!h) {
            h = parseFloat(me.getStyle(HEIGHT)) || 0;
            if (!me.isBorderBox()) {
                h += me.getFrameWidth('tb');
            }
        }
        return h;
    },

    
    getComputedWidth : function() {
        var me = this,
            w = Math.max(me.dom.offsetWidth, me.dom.clientWidth);

        if (!w) {
            w = parseFloat(me.getStyle(WIDTH)) || 0;
            if (!me.isBorderBox()) {
                w += me.getFrameWidth('lr');
            }
        }
        return w;
    },

    
    getFrameWidth : function(sides, onlyContentBox) {
        return (onlyContentBox && this.isBorderBox()) ? 0 : (this.getPadding(sides) + this.getBorderWidth(sides));
    },

    
    addClsOnOver : function(className, testFn, scope) {
        var me = this,
            dom = me.dom,
            hasTest = Ext.isFunction(testFn);
            
        me.hover(
            function() {
                if (hasTest && testFn.call(scope || me, me) === false) {
                    return;
                }
                Ext.fly(dom, INTERNAL).addCls(className);
            },
            function() {
                Ext.fly(dom, INTERNAL).removeCls(className);
            }
        );
        return me;
    },

    
    addClsOnFocus : function(className, testFn, scope) {
        var me = this,
            dom = me.dom,
            hasTest = Ext.isFunction(testFn);
            
        me.on("focus", function() {
            if (hasTest && testFn.call(scope || me, me) === false) {
                return false;
            }
            Ext.fly(dom, INTERNAL).addCls(className);
        });
        me.on("blur", function() {
            Ext.fly(dom, INTERNAL).removeCls(className);
        });
        return me;
    },

    
    addClsOnClick : function(className, testFn, scope) {
        var me = this,
            dom = me.dom,
            hasTest = Ext.isFunction(testFn);
            
        me.on("mousedown", function() {
            if (hasTest && testFn.call(scope || me, me) === false) {
                return false;
            }
            Ext.fly(dom, INTERNAL).addCls(className);
            var d = Ext.getDoc(),
                fn = function() {
                    Ext.fly(dom, INTERNAL).removeCls(className);
                    d.removeListener("mouseup", fn);
                };
            d.on("mouseup", fn);
        });
        return me;
    },

    
    getStyleSize : function() {
        var me = this,
            d = this.dom,
            isDoc = DOCORBODYRE.test(d.nodeName),
            s ,
            w, h;

        
        if (isDoc) {
            return {
                width : Element.getViewWidth(),
                height : Element.getViewHeight()
            };
        }

        s = me.getStyle([HEIGHT, WIDTH], true);  
        
        if (s.width && s.width != 'auto') {
            w = parseFloat(s.width);
            if (me.isBorderBox()) {
                w -= me.getFrameWidth('lr');
            }
        }
        
        if (s.height && s.height != 'auto') {
            h = parseFloat(s.height);
            if (me.isBorderBox()) {
                h -= me.getFrameWidth('tb');
            }
        }
        
        return {width: w || me.getWidth(true), height: h || me.getHeight(true)};
    },

    statics: {
        selectableCls: Ext.baseCSSPrefix + 'selectable',
        unselectableCls: Ext.baseCSSPrefix + 'unselectable'
    },

    
    selectable : function() {
        var me = this;

        
        
        me.dom.unselectable = '';

        me.removeCls(Element.unselectableCls);
        me.addCls(Element.selectableCls);

        return me;
    },

    
    unselectable : function() {
        
        
        
        
        
        
        
        var me = this;

        
        
        
        
        
        if (Ext.isOpera) {
            me.dom.unselectable = 'on';
        }

        
        
        
        
        
        
        
        
        
        me.removeCls(Element.selectableCls);
        me.addCls(Element.unselectableCls);

        return me;
    },

    
    setVertical: function(angle, cls) {
        var me = this,
            proto = Element.prototype,
            hooks;

        me.vertical = true;
        if (cls) {
            me.addCls(me.verticalCls = cls);
        }

        me.setWidth = proto.setHeight;
        me.setHeight = proto.setWidth;
        if (!Ext.isIE9m) {
            
            
            
            
            me.getWidth = proto.getHeight;
            me.getHeight = proto.getWidth;
        }

        
        me.styleHooks = (angle === 270) ?
            Element.prototype.verticalStyleHooks270 : Element.prototype.verticalStyleHooks90;
    },

    
    setHorizontal: function() {
        var me = this,
            cls = me.verticalCls;

        delete me.vertical;
        if (cls) {
            delete me.verticalCls;
            me.removeCls(cls);
        }

        
        delete me.setWidth;
        delete me.setHeight;
        if (!Ext.isIE9m) {
            delete me.getWidth;
            delete me.getHeight;
        }

        
        delete me.styleHooks;
    }
});

Element.prototype.styleHooks = styleHooks = Ext.dom.AbstractElement.prototype.styleHooks;



Element.prototype.verticalStyleHooks90 = verticalStyleHooks90 = Ext.Object.chain(Element.prototype.styleHooks);
Element.prototype.verticalStyleHooks270 = verticalStyleHooks270 = Ext.Object.chain(Element.prototype.styleHooks);

verticalStyleHooks90.width = { name: 'height' };
verticalStyleHooks90.height = { name: 'width' };
verticalStyleHooks90['margin-top'] = { name: 'marginLeft' };
verticalStyleHooks90['margin-right'] = { name: 'marginTop' };
verticalStyleHooks90['margin-bottom'] = { name: 'marginRight' };
verticalStyleHooks90['margin-left'] = { name: 'marginBottom' };
verticalStyleHooks90['padding-top'] = { name: 'paddingLeft' };
verticalStyleHooks90['padding-right'] = { name: 'paddingTop' };
verticalStyleHooks90['padding-bottom'] = { name: 'paddingRight' };
verticalStyleHooks90['padding-left'] = { name: 'paddingBottom' };
verticalStyleHooks90['border-top'] = { name: 'borderLeft' };
verticalStyleHooks90['border-right'] = { name: 'borderTop' };
verticalStyleHooks90['border-bottom'] = { name: 'borderRight' };
verticalStyleHooks90['border-left'] = { name: 'borderBottom' };

verticalStyleHooks270.width = { name: 'height' };
verticalStyleHooks270.height = { name: 'width' };
verticalStyleHooks270['margin-top'] = { name: 'marginRight' };
verticalStyleHooks270['margin-right'] = { name: 'marginBottom' };
verticalStyleHooks270['margin-bottom'] = { name: 'marginLeft' };
verticalStyleHooks270['margin-left'] = { name: 'marginTop' };
verticalStyleHooks270['padding-top'] = { name: 'paddingRight' };
verticalStyleHooks270['padding-right'] = { name: 'paddingBottom' };
verticalStyleHooks270['padding-bottom'] = { name: 'paddingLeft' };
verticalStyleHooks270['padding-left'] = { name: 'paddingTop' };
verticalStyleHooks270['border-top'] = { name: 'borderRight' };
verticalStyleHooks270['border-right'] = { name: 'borderBottom' };
verticalStyleHooks270['border-bottom'] = { name: 'borderLeft' };
verticalStyleHooks270['border-left'] = { name: 'borderTop' };

if (Ext.isIE7m) {
    styleHooks.fontSize = styleHooks['font-size'] = {
        name: 'fontSize',
        canThrow: true
    };
    
    styleHooks.fontStyle = styleHooks['font-style'] = {
        name: 'fontStyle',
        canThrow: true
    };
    
    styleHooks.fontFamily = styleHooks['font-family'] = {
        name: 'fontFamily',
        canThrow: true
    };
}


if (Ext.isIEQuirks || Ext.isIE && Ext.ieVersion <= 8) {
    function getBorderWidth (dom, el, inline, style) {
        if (style[this.styleName] == 'none') {
            return '0px';
        }
        return style[this.name];
    }

    edges = ['Top','Right','Bottom','Left'];
    k = edges.length;

    while (k--) {
        edge = edges[k];
        borderWidth = 'border' + edge + 'Width';

        styleHooks['border-'+edge.toLowerCase()+'-width'] = styleHooks[borderWidth] = {
            name: borderWidth,
            styleName: 'border' + edge + 'Style',
            get: getBorderWidth
        };
    }
}

































Ext.getDoc().on('selectstart', function(ev, dom) {
    var doc = document.documentElement,
        selectableCls = Element.selectableCls,
        unselectableCls = Element.unselectableCls,
        tagName = dom && dom.tagName;

    tagName = tagName && tagName.toLowerCase();

    
    
    
    if (tagName === 'input' || tagName === 'textarea') {
        return;
    }

    
    while (dom && dom.nodeType === 1 && dom !== doc) {
        var el = Ext.fly(dom);

        
        if (el.hasCls(selectableCls)) {
            return;
        }

        
        if (el.hasCls(unselectableCls)) {
            ev.stopEvent();
            return;
        }

        dom = dom.parentNode;
    }
});

});

Ext.onReady(function () {
    var opacityRe = /alpha\(opacity=(.*)\)/i,
        trimRe = /^\s+|\s+$/g,
        hooks = Ext.dom.Element.prototype.styleHooks;

    
    hooks.opacity = {
        name: 'opacity',
        afterSet: function(dom, value, el) {
            if (el.isLayer) {
                el.onOpacitySet(value);
            }
        }
    };
    if (!Ext.supports.Opacity && Ext.isIE) {
        Ext.apply(hooks.opacity, {
            get: function (dom) {
                var filter = dom.style.filter,
                    match, opacity;
                if (filter.match) {
                    match = filter.match(opacityRe);
                    if (match) {
                        opacity = parseFloat(match[1]);
                        if (!isNaN(opacity)) {
                            return opacity ? opacity / 100 : 0;
                        }
                    }
                }
                return 1;
            },
            set: function (dom, value) {
                var style = dom.style,
                    val = style.filter.replace(opacityRe, '').replace(trimRe, '');

                style.zoom = 1; 

                
                if (typeof(value) == 'number' && value >= 0 && value < 1) {
                    value *= 100;
                    style.filter = val + (val.length ? ' ' : '') + 'alpha(opacity='+value+')';
                } else {
                    style.filter = val;
                }
            }  
        });
    }
    
    
});



Ext.define('Ext.util.Positionable', {

    _positionTopLeft: ['position', 'top', 'left'],

    _alignRe: /^([a-z]+)-([a-z]+)(\?)?$/,

    
    
    afterSetPosition: Ext.emptyFn,


    
    
    adjustForConstraints: function(xy, parent) {
        var vector = this.getConstrainVector(parent, xy);
        if (vector) {
            xy[0] += vector[0];
            xy[1] += vector[1];
        }
        return xy;
    },

    
    alignTo: function(element, position, offsets, animate) {
        var me = this,
            el = me.el;

        return me.setXY(me.getAlignToXY(element, position, offsets),
                el.anim && !!animate ? el.anim(animate) : false);
    },

    
    anchorTo: function(anchorToEl, alignment, offsets, animate, monitorScroll, callback) {
        var me = this,
            scroll = !Ext.isEmpty(monitorScroll),
            action = function() {
                me.alignTo(anchorToEl, alignment, offsets, animate);
                Ext.callback(callback, me);
            },
            anchor = me.getAnchor();

        
        me.removeAnchor();
        Ext.apply(anchor, {
            fn: action,
            scroll: scroll
        });

        Ext.EventManager.onWindowResize(action, null);

        if (scroll) {
            Ext.EventManager.on(window, 'scroll', action, null,
                    {buffer: !isNaN(monitorScroll) ? monitorScroll : 50});
        }
        action(); 
        return me;
    },

    
    calculateAnchorXY: function(anchor, extraX, extraY, mySize) {
        
        
        var me = this,
            el = me.el,
            doc = document,
            isViewport = el.dom == doc.body || el.dom == doc,
            round = Math.round,
            xy, myWidth, myHeight;

        anchor = (anchor || "tl").toLowerCase();
        mySize = mySize || {};

        myWidth = mySize.width || isViewport ? Ext.Element.getViewWidth() : me.getWidth();
        myHeight = mySize.height || isViewport ? Ext.Element.getViewHeight() : me.getHeight();

        
        
        switch (anchor) {
            case 'tl' : xy = [0, 0];
                        break;
            case 'bl' : xy = [0, myHeight];
                        break;
            case 'tr' : xy = [myWidth, 0];
                        break;
            case 'c'  : xy = [round(myWidth * 0.5), round(myHeight * 0.5)];
                        break;
            case 't'  : xy = [round(myWidth * 0.5), 0];
                        break;
            case 'l'  : xy = [0, round(myHeight * 0.5)];
                        break;
            case 'r'  : xy = [myWidth, round(myHeight * 0.5)];
                        break;
            case 'b'  : xy = [round(myWidth * 0.5), myHeight];
                        break;
            case 'tc' : xy = [round(myWidth * 0.5), 0];
                        break;
            case 'bc' : xy = [round(myWidth * 0.5), myHeight];
                        break;
            case 'br' : xy = [myWidth, myHeight];
        }
        return [xy[0] + extraX, xy[1] + extraY];
    },

    
    convertPositionSpec: Ext.identityFn,

    
    getAlignToXY: function(alignToEl, posSpec, offset) {
        var me = this,
            viewportWidth = Ext.Element.getViewWidth() - 10, 
            viewportHeight = Ext.Element.getViewHeight() - 10, 
            doc = document,
            docElement = doc.documentElement,
            docBody = doc.body,
            scrollX = (docElement.scrollLeft || docBody.scrollLeft || 0),
            scrollY = (docElement.scrollTop  || docBody.scrollTop  || 0),
            alignMatch, myPosition, alignToElPosition, myWidth, myHeight,
            alignToElRegion, swapY, swapX, constrain, align1, align2,
            p1y, p1x, p2y, p2x, x, y;

        alignToEl = Ext.get(alignToEl.el || alignToEl);

        if (!alignToEl || !alignToEl.dom) {
        }

        offset = offset || [0,0];
        posSpec = (!posSpec || posSpec == "?" ? "tl-bl?" :
            (!(/-/).test(posSpec) && posSpec !== "" ? "tl-" + posSpec : posSpec || "tl-bl")).toLowerCase();

        posSpec = me.convertPositionSpec(posSpec);

        alignMatch = posSpec.match(me._alignRe);


        align1 = alignMatch[1];
        align2 = alignMatch[2];
        constrain = !!alignMatch[3];

        
        
        myPosition = me.getAnchorXY(align1, true);
        alignToElPosition = me.getAnchorToXY(alignToEl, align2, false);

        x = alignToElPosition[0] - myPosition[0] + offset[0];
        y = alignToElPosition[1] - myPosition[1] + offset[1];

        
        if (constrain) {
            myWidth = me.getWidth();
            myHeight = me.getHeight();
            alignToElRegion = alignToEl.getRegion();
            
            
            
            
            p1y = align1.charAt(0);
            p1x = align1.charAt(align1.length - 1);
            p2y = align2.charAt(0);
            p2x = align2.charAt(align2.length - 1);
            swapY = ((p1y == "t" && p2y == "b") || (p1y == "b" && p2y == "t"));
            swapX = ((p1x == "r" && p2x == "l") || (p1x == "l" && p2x == "r"));

            if (x + myWidth > viewportWidth + scrollX) {
                x = swapX ? alignToElRegion.left - myWidth : viewportWidth + scrollX - myWidth;
            }
            if (x < scrollX) {
                x = swapX ? alignToElRegion.right : scrollX;
            }
            if (y + myHeight > viewportHeight + scrollY) {
                y = swapY ? alignToElRegion.top - myHeight : viewportHeight + scrollY - myHeight;
            }
            if (y < scrollY) {
                y = swapY ? alignToElRegion.bottom : scrollY;
            }
        }
        return [x,y];
    },

    
    getAnchor: function(){
        var el = this.el,
            data = (el.$cache || el.getCache()).data,
            anchor;
            
        if (!el.dom) {
            return;
        }
        anchor = data._anchor;

        if(!anchor){
            anchor = data._anchor = {};
        }
        return anchor;
    },

    
    getAnchorXY: function(anchor, local, mySize) {
        var me = this,
            myPos = me.getXY(),
            el = me.el,
            doc = document,
            isViewport = el.dom == doc.body || el.dom == doc,
            scroll = el.getScroll(),
            extraX = isViewport ? scroll.left : local ? 0 : myPos[0],
            extraY = isViewport ? scroll.top : local ? 0 : myPos[1];

        return me.calculateAnchorXY(anchor, extraX, extraY, mySize);
    },

    
    getBox: function(contentBox, local) {
        var me = this,
            xy = local ? me.getLocalXY() : me.getXY(),
            x = xy[0],
            y = xy[1],
            w = me.getWidth(),
            h = me.getHeight(),
            borderPadding, beforeX, beforeY;

        if (contentBox) {
            borderPadding = me.getBorderPadding();
            beforeX = borderPadding.beforeX;
            beforeY = borderPadding.beforeY;

            x += beforeX;
            y += beforeY;
            w -= (beforeX + borderPadding.afterX);
            h -= (beforeY + borderPadding.afterY);
        }

        return {
            x: x,
            left: x,
            0: x,
            y: y,
            top: y,
            1: y,
            width: w,
            height: h,
            right: x + w,
            bottom: y + h
        };
    },

    
    calculateConstrainedPosition: function(constrainTo, proposedPosition, local, proposedSize) {
        var me = this,
            vector,
            fp = me.floatParent,
            parentNode = fp ? fp.getTargetEl() : null,
            parentOffset,
            borderPadding,
            proposedConstrainPosition,
            xy = false;

        if (local && fp) {
            parentOffset = parentNode.getXY();
            borderPadding = parentNode.getBorderPadding();
            parentOffset[0] += borderPadding.beforeX;
            parentOffset[1] += borderPadding.beforeY;
            if (proposedPosition) {
                proposedConstrainPosition = [proposedPosition[0] + parentOffset[0], proposedPosition[1] + parentOffset[1]];
            }
        } else {
            proposedConstrainPosition = proposedPosition;
        }
        
        
        
        constrainTo = constrainTo || me.constrainTo || parentNode || me.container || me.el.parent();
        vector = (me.constrainHeader ? me.header : me).getConstrainVector(constrainTo, proposedConstrainPosition, proposedSize);

        
        if (vector) {
            xy = proposedPosition || me.getPosition(local);
            xy[0] += vector[0];
            xy[1] += vector[1];
        }
        return xy;
    },

    
    getConstrainVector: function(constrainTo, proposedPosition, proposedSize) {
        var thisRegion = this.getRegion(),
            vector = [0, 0],
            shadowSize = (this.shadow && this.constrainShadow && !this.shadowDisabled) ? this.shadow.getShadowSize() : undefined,
            overflowed = false,
            constraintInsets = this.constraintInsets;

        if (!(constrainTo instanceof Ext.util.Region)) {
            constrainTo = Ext.get(constrainTo.el || constrainTo).getViewRegion();
        }

        
        if (constraintInsets) {
            constraintInsets = Ext.isObject(constraintInsets) ? constraintInsets : Ext.Element.parseBox(constraintInsets);
            constrainTo.adjust(constraintInsets.top, constraintInsets.right, constraintInsets.bottom, constraintInsets.length);
        }

        
        if (proposedPosition) {
            thisRegion.translateBy(proposedPosition[0] - thisRegion.x, proposedPosition[1] - thisRegion.y);
        }
        
        if (proposedSize) {
            thisRegion.right = thisRegion.left + proposedSize[0];
            thisRegion.bottom = thisRegion.top + proposedSize[1];
        }

        
        if (shadowSize) {
            constrainTo.adjust(shadowSize[0], -shadowSize[1], -shadowSize[2], shadowSize[3]);
        }

        
        if (thisRegion.right > constrainTo.right) {
            overflowed = true;
            vector[0] = (constrainTo.right - thisRegion.right);    
        }
        if (thisRegion.left + vector[0] < constrainTo.left) {
            overflowed = true;
            vector[0] = (constrainTo.left - thisRegion.left);      
        }

        
        if (thisRegion.bottom > constrainTo.bottom) {
            overflowed = true;
            vector[1] = (constrainTo.bottom - thisRegion.bottom);  
        }
        if (thisRegion.top + vector[1] < constrainTo.top) {
            overflowed = true;
            vector[1] = (constrainTo.top - thisRegion.top);        
        }
        return overflowed ? vector : false;
    },

    
    getOffsetsTo: function(offsetsTo) {
        var o = this.getXY(),
                e = Ext.fly(offsetsTo.el || offsetsTo, '_internal').getXY();
        return [o[0] - e[0],o[1] - e[1]];
    },

    
    getRegion: function() {
        var box = this.getBox();
        return new Ext.util.Region(box.top, box.right, box.bottom, box.left);
    },

    
    getViewRegion: function() {
        var me = this,
            el = me.el,
            isBody = el.dom.nodeName === 'BODY',
            borderPadding, scroll, pos, top, left, width, height;

        
        if (isBody) {
            scroll = el.getScroll();
            left = scroll.left;
            top = scroll.top;
            width = Ext.dom.AbstractElement.getViewportWidth();
            height = Ext.dom.AbstractElement.getViewportHeight();
        }
        else {
            borderPadding = me.getBorderPadding();
            pos = me.getXY();
            left = pos[0] + borderPadding.beforeX;
            top = pos[1] + borderPadding.beforeY;
            width = me.getWidth(true);
            height = me.getHeight(true);
        }

        return new Ext.util.Region(top, left + width, top + height, left);
    },

    
    move: function(direction, distance, animate) {
        var me = this,
            xy = me.getXY(),
            x = xy[0],
            y = xy[1],
            left = [x - distance, y],
            right = [x + distance, y],
            top = [x, y - distance],
            bottom = [x, y + distance],
            hash = {
                l: left,
                left: left,
                r: right,
                right: right,
                t: top,
                top: top,
                up: top,
                b: bottom,
                bottom: bottom,
                down: bottom
            };

        direction = direction.toLowerCase();
        me.setXY([hash[direction][0], hash[direction][1]], animate);
    },

    
    removeAnchor: function() {
        var anchor = this.getAnchor();

        if (anchor && anchor.fn) {
            Ext.EventManager.removeResizeListener(anchor.fn);
            if (anchor.scroll) {
                Ext.EventManager.un(window, 'scroll', anchor.fn);
            }
            delete anchor.fn;
        }
        return this;
    },

    
    setBox: function(box, animate) {
        var me = this,
            el = me.el,
            x = box.x,
            y = box.y,
            xy = [x, y],
            w = box.width,
            h = box.height,
            doConstrain = (me.constrain || me.constrainHeader),
            constrainedPos = doConstrain && me.calculateConstrainedPosition(null, [x, y], false, [w, h]);

        
        if (constrainedPos) {
            x = constrainedPos[0];
            y = constrainedPos[1];
        }
        if (!animate || !el.anim) {
            me.setSize(w, h);
            me.setXY([x, y]);
            me.afterSetPosition(x, y);
        } else {
            me.animate(Ext.applyIf({
                to: {
                    x: x,
                    y: y,
                    width: el.adjustWidth(w),
                    height: el.adjustHeight(h)
                },
                listeners: {
                    afteranimate: Ext.Function.bind(me.afterSetPosition, me, [x, y])
                }
            }, animate));
        }
        return me;
    },

    
    setRegion: function(region, animate) {
        return this.setBox({
            x: region.left,
            y: region.top,
            width: region.right - region.left,
            height: region.bottom - region.top
        }, animate);
    },

    
    translatePoints: function(x, y) {
        var pos = this.translateXY(x, y);

        return {
            left: pos.x,
            top: pos.y
        };
    },

    
    translateXY: function(x, y) {
        var me = this,
            el = me.el,
            styles = el.getStyle(me._positionTopLeft),
            relative = styles.position == 'relative',
            left = parseFloat(styles.left),
            top = parseFloat(styles.top),
            xy = me.getXY();

        if (Ext.isArray(x)) {
             y = x[1];
             x = x[0];
        }
        if (isNaN(left)) {
            left = relative ? 0 : el.dom.offsetLeft;
        }
        if (isNaN(top)) {
            top = relative ? 0 : el.dom.offsetTop;
        }
        left = (typeof x == 'number') ? x - xy[0] + left : undefined;
        top = (typeof y == 'number') ? y - xy[1] + top : undefined;
        return {
            x: left,
            y: top
        };
    }
});



Ext.define('Ext.dom.Element', function(Element) {
    var HIDDEN          = 'hidden',
        DOC             = document,
        VISIBILITY      = "visibility",
        DISPLAY         = "display",
        NONE            = "none",
        XMASKED         = Ext.baseCSSPrefix + "masked",
        XMASKEDRELATIVE = Ext.baseCSSPrefix + "masked-relative",
        EXTELMASKMSG    = Ext.baseCSSPrefix + "mask-msg",
        bodyRe          = /^body/i,
        visFly,

        
        noBoxAdjust = Ext.isStrict ? {
            select: 1
        }: {
            input: 1,
            select: 1,
            textarea: 1
        },

        
        isScrolled = function(c) {
            var r = [], ri = -1,
                i, ci;
            for (i = 0; ci = c[i]; i++) {
                if (ci.scrollTop > 0 || ci.scrollLeft > 0) {
                    r[++ri] = ci;
                }
            }
            return r;
        };

    return {

        extend:  Ext.dom.AbstractElement ,

        alternateClassName: ['Ext.Element', 'Ext.core.Element'],

                   
                            
                                   
                                 
                                 
                                       
                                     
                                   
          
        
        tableTagRe: /^(?:tr|td|table|tbody)$/i,

        mixins: [
             Ext.util.Positionable 
        ],

        addUnits: function() {
            return Element.addUnits.apply(Element, arguments);
        },

        
        focus: function(defer,  dom) {
            var me = this;

            dom = dom || me.dom;
            try {
                if (Number(defer)) {
                    Ext.defer(me.focus, defer, me, [null, dom]);
                } else {
                    dom.focus();
                }
            } catch(e) {
            }
            return me;
        },

        
        blur: function() {
            var me = this,
                dom = me.dom;
            
            
            if (dom !== document.body) {
                try {
                    dom.blur();
                } catch(e) {
                }
                return me;
            } else {
                return me.focus(undefined, dom);
            }
        },

        
        isBorderBox: function() {
            var box = Ext.isBorderBox;
            
            
            if (box && Ext.isIE7m) {
                box = !((this.dom.tagName || "").toLowerCase() in noBoxAdjust);
            }
            return box;
        },

        
        hover: function(overFn, outFn, scope, options) {
            var me = this;
            me.on('mouseenter', overFn, scope || me.dom, options);
            me.on('mouseleave', outFn, scope || me.dom, options);
            return me;
        },

        
        getAttributeNS: function(ns, name) {
            return this.getAttribute(name, ns);
        },

        getAttribute: (Ext.isIE && !(Ext.isIE9p && DOC.documentMode >= 9)) ?

            
            
            
            
            
            
            
            
            

            function(name, ns) {
                var d = this.dom,
                        type;
                if (ns) {
                    type = typeof d[ns + ":" + name];
                    if (type != 'undefined' && type != 'unknown') {
                        return d[ns + ":" + name] || null;
                    }
                    return null;
                }
                if (name === "for") {
                    name = "htmlFor";
                }
                return d[name] || null;
            } : function(name, ns) {
                var d = this.dom;
                if (ns) {
                    return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name);
                }
                return  d.getAttribute(name) || d[name] || null;
            },

        
        cacheScrollValues: function() {
            var me = this,
                scrolledDescendants,
                el, i,
                scrollValues = [],
                result = function() {
                    for (i = 0; i < scrolledDescendants.length; i++) {
                        el = scrolledDescendants[i];
                        el.scrollLeft = scrollValues[i][0];
                        el.scrollTop  = scrollValues[i][1];
                    }
                };

            if (!Ext.DomQuery.pseudos.isScrolled) {
                Ext.DomQuery.pseudos.isScrolled = isScrolled;
            }
            scrolledDescendants = me.query(':isScrolled');
            for (i = 0; i < scrolledDescendants.length; i++) {
                el = scrolledDescendants[i];
                scrollValues[i] = [el.scrollLeft, el.scrollTop];
            }
            return result;
        },

        
        autoBoxAdjust: true,

        
        isVisible : function(deep) {
            var me = this,
                dom = me.dom,
                stopNode = dom.ownerDocument.documentElement;

            if (!visFly) {
                visFly = new Element.Fly();
            }

            while (dom !== stopNode) {
                
                
                if (!dom || dom.nodeType === 11 || (visFly.attach(dom)).isStyle(VISIBILITY, HIDDEN) || visFly.isStyle(DISPLAY, NONE)) {
                    return false;
                }
                
                if (!deep) {
                    break;
                }
                dom = dom.parentNode;
            }
            return true;
        },

        
        isDisplayed : function() {
            return !this.isStyle(DISPLAY, NONE);
        },

        
        enableDisplayMode : function(display) {
            var me = this;

            me.setVisibilityMode(Element.DISPLAY);

            if (!Ext.isEmpty(display)) {
                (me.$cache || me.getCache()).data.originalDisplay = display;
            }

            return me;
        },

        
        mask : function(msg, msgCls , elHeight) {
            var me            = this,
                dom           = me.dom,
                
                
                setExpression = dom.style.setExpression,
                data          = (me.$cache || me.getCache()).data,
                maskShimEl    = data.maskShimEl,
                maskEl        = data.maskEl,
                maskMsg       = data.maskMsg,
                widthExpression, heightExpression;

            if (!(bodyRe.test(dom.tagName) && me.getStyle('position') == 'static')) {
                me.addCls(XMASKEDRELATIVE);
            }

            
            if (maskEl) {
                maskEl.remove();
            }

            if (maskMsg) {
                maskMsg.remove();
            }

            if (maskShimEl) {
                maskShimEl.remove();
            }

            if (Ext.isIE6) {
                maskShimEl = Ext.DomHelper.append(dom, {
                    tag: 'iframe',
                    cls : Ext.baseCSSPrefix + 'shim ' + Ext.baseCSSPrefix + 'mask-shim'
                }, true);
                data.maskShimEl = maskShimEl;
                maskShimEl.setDisplayed(true);
            }

            Ext.DomHelper.append(dom, [{
                cls : Ext.baseCSSPrefix + "mask",
                style: 'top:0;left:0;'
            }, {
                cls : msgCls ? EXTELMASKMSG + " " + msgCls : EXTELMASKMSG,
                cn  : {
                    tag: 'div',
                    cls: Ext.baseCSSPrefix + 'mask-msg-inner',
                    cn: {
                        tag: 'div',
                        cls: Ext.baseCSSPrefix + 'mask-msg-text',
                        html: msg || ''
                    }
                }
            }]);

            maskMsg = Ext.get(dom.lastChild);
            maskEl = Ext.get(maskMsg.dom.previousSibling);
            data.maskMsg = maskMsg;
            data.maskEl = maskEl;

            me.addCls(XMASKED);
            maskEl.setDisplayed(true);

            if (typeof msg == 'string') {
                maskMsg.setDisplayed(true);
                maskMsg.center(me);
            } else {
                maskMsg.setDisplayed(false);
            }
            
            
            
            
            
            if (!Ext.supports.IncludePaddingInWidthCalculation && setExpression) {
                
                try {
                    maskEl.dom.style.setExpression('width', 'this.parentNode.clientWidth + "px"');
                    widthExpression = 'this.parentNode.clientWidth + "px"';
                    if (maskShimEl) {
                        maskShimEl.dom.style.setExpression('width', widthExpression);
                    }
                    maskEl.dom.style.setExpression('width', widthExpression);
                } catch (e) {}
            }

            
            
            if (!Ext.supports.IncludePaddingInHeightCalculation && setExpression) {
                
                try {
                    heightExpression = 'this.parentNode.' + (dom == DOC.body ? 'scrollHeight' : 'offsetHeight') + ' + "px"';
                    if (maskShimEl) {
                        maskShimEl.dom.style.setExpression('height', heightExpression);
                    }
                    maskEl.dom.style.setExpression('height', heightExpression);
                } catch (e) {}
            }
            
            else if (Ext.isIE9m && !(Ext.isIE7 && Ext.isStrict) && me.getStyle('height') == 'auto') {
                if (maskShimEl) {
                    maskShimEl.setSize(undefined, elHeight || me.getHeight());
                }
                maskEl.setSize(undefined, elHeight || me.getHeight());
            }
            return maskEl;
        },

        
        unmask : function() {
            var me      = this,
                data    = (me.$cache || me.getCache()).data,
                maskEl  = data.maskEl,
                maskShimEl = data.maskShimEl,
                maskMsg = data.maskMsg,
                style;

            if (maskEl) {
                style = maskEl.dom.style;
                
                if (style.clearExpression) {
                    style.clearExpression('width');
                    style.clearExpression('height');
                }

                if (maskEl) {
                    maskEl.remove();
                    delete data.maskEl;
                }

                if (maskMsg) {
                    maskMsg.remove();
                    delete data.maskMsg;
                }

                me.removeCls([XMASKED, XMASKEDRELATIVE]);

                if (maskShimEl) {
                    style = maskShimEl.dom.style;
                    
                    if (style.clearExpression) {
                        style.clearExpression('width');
                        style.clearExpression('height');
                    }

                    maskShimEl.remove();
                    delete data.maskShimEl;
                }
            }
        },

        
        isMasked : function() {
            var me      = this,
                data    = (me.$cache || me.getCache()).data,
                maskEl  = data.maskEl,
                maskMsg = data.maskMsg,
                hasMask = false; 

            if (maskEl && maskEl.isVisible()) {
                if (maskMsg) {
                    maskMsg.center(me);
                }
                hasMask = true;
            }
            return hasMask;
        },

        
        createShim : function() {
            var el = DOC.createElement('iframe'),
                shim;

            el.frameBorder = '0';
            el.className = Ext.baseCSSPrefix + 'shim';
            el.src = Ext.SSL_SECURE_URL;
            shim = Ext.get(this.dom.parentNode.insertBefore(el, this.dom));
            shim.autoBoxAdjust = false;
            return shim;
        },

        
        addKeyListener : function(key, fn, scope){
            var config;
            if(typeof key != 'object' || Ext.isArray(key)){
                config = {
                    target: this,
                    key: key,
                    fn: fn,
                    scope: scope
                };
            }else{
                config = {
                    target: this,
                    key : key.key,
                    shift : key.shift,
                    ctrl : key.ctrl,
                    alt : key.alt,
                    fn: fn,
                    scope: scope
                };
            }
            return new Ext.util.KeyMap(config);
        },

        
        addKeyMap : function(config) {
            return new Ext.util.KeyMap(Ext.apply({
                target: this
            }, config));
        },

        
        
        
        
        
        
        
        
        
        
        

        
        
        
        

        
        
        
        
        
        
        

        
        
        
        
        
        
        

        
        
        
        

        
        
        
        
        
        
        
        

        
        on: function(eventName, fn, scope, options) {
            Ext.EventManager.on(this, eventName, fn, scope || this, options);
            return this;
        },

        
        un: function(eventName, fn, scope) {
            Ext.EventManager.un(this, eventName, fn, scope || this);
            return this;
        },

        
        removeAllListeners: function() {
            Ext.EventManager.removeAll(this);
            return this;
        },

        
        purgeAllListeners: function() {
            Ext.EventManager.purgeElement(this);
            return this;
        },

        select: function(selector) {
            return Element.select(selector, false,  this.dom);
        }
    };
}, function() {

    var DOC             = document,
        EC              = Ext.cache,
        Element         = this,
        AbstractElement = Ext.dom.AbstractElement,
        focusRe         = /^a|button|embed|iframe|input|object|select|textarea$/i,
        nonSpaceRe      = /\S/,
        scriptTagRe     = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        replaceScriptTagRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        srcRe           = /\ssrc=([\'\"])(.*?)\1/i,
        typeRe          = /\stype=([\'\"])(.*?)\1/i,
        useDocForId     = !Ext.isIE8m,
        internalFly;

    Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
    

    
    
    
    function garbageCollect() {
        if (!Ext.enableGarbageCollector) {
            clearInterval(Element.collectorThreadId);
        } else {
            var eid,
                d,
                o,
                t;

            for (eid in EC) {
                if (!EC.hasOwnProperty(eid)) {
                    continue;
                }

                o = EC[eid];

                
                if (o.skipGarbageCollection) {
                    continue;
                }

                d = o.dom;


                
                
                
                
                
                
                
                
                
                
                
                
                
                
                if (d && (!d.parentNode || (!d.offsetParent && !Ext.getElementById(eid)))) {
                    if (Ext.enableListenerCollection) {
                        Ext.EventManager.removeAll(d);
                    }
                    delete EC[eid];
                }
            }
            
            if (Ext.isIE) {
                t = {};
                for (eid in EC) {
                    if (!EC.hasOwnProperty(eid)) {
                        continue;
                    }
                    t[eid] = EC[eid];
                }
                EC = Ext.cache = t;
            }
        }
    }

    Element.collectorThreadId = setInterval(garbageCollect, 30000);

    
    Element.addMethods({

        
        monitorMouseLeave: function(delay, handler, scope) {
            var me = this,
                timer,
                listeners = {
                    mouseleave: function(e) {
                        timer = setTimeout(Ext.Function.bind(handler, scope||me, [e]), delay);
                    },
                    mouseenter: function() {
                        clearTimeout(timer);
                    },
                    freezeEvent: true
                };

            me.on(listeners);
            return listeners;
        },

        
        swallowEvent : function(eventName, preventDefault) {
            var me = this,
                e, eLen,
                fn = function(e) {
                    e.stopPropagation();
                    if (preventDefault) {
                        e.preventDefault();
                    }
                };

            if (Ext.isArray(eventName)) {
                eLen = eventName.length;

                for (e = 0; e < eLen; e++) {
                    me.on(eventName[e], fn);
                }

                return me;
            }
            me.on(eventName, fn);
            return me;
        },

        
        relayEvent : function(eventName, observable) {
            this.on(eventName, function(e) {
                observable.fireEvent(eventName, e);
            });
        },

        
        clean : function(forceReclean) {
            var me   = this,
                dom  = me.dom,
                data = (me.$cache || me.getCache()).data,
                n    = dom.firstChild,
                ni   = -1,
                nx;

            if (data.isCleaned && forceReclean !== true) {
                return me;
            }

            while (n) {
                nx = n.nextSibling;
                if (n.nodeType == 3) {
                    
                    if (!(nonSpaceRe.test(n.nodeValue))) {
                        dom.removeChild(n);
                    
                    } else if (nx && nx.nodeType == 3) {
                        n.appendData(Ext.String.trim(nx.data));
                        dom.removeChild(nx);
                        nx = n.nextSibling;
                        n.nodeIndex = ++ni;
                    }
                } else {
                    
                    internalFly.attach(n).clean();
                    n.nodeIndex = ++ni;
                }
                n = nx;
            }

            data.isCleaned = true;
            return me;
        },

        
        load : function(options) {
            this.getLoader().load(options);
            return this;
        },

        
        getLoader : function() {
            var me = this,
                data = (me.$cache || me.getCache()).data,
                loader = data.loader;

            if (!loader) {
                data.loader = loader = new Ext.ElementLoader({
                    target: me
                });
            }
            return loader;
        },

        
        syncContent: function(source) {
            source = Ext.getDom(source);
            var sourceNodes = source.childNodes,
                sourceLen = sourceNodes.length,
                dest = this.dom,
                destNodes = dest.childNodes,
                destLen = destNodes.length,
                i,  destNode, sourceNode,
                nodeType, newAttrs, attLen, attName;

            
            
            
            
            if (Ext.isIE9m && dest.mergeAttributes) {
                dest.mergeAttributes(source, true);

                
                
                dest.src = source.src;
            } else {
                newAttrs = source.attributes;
                attLen = newAttrs.length;
                for (i = 0; i < attLen; i++) {
                    attName = newAttrs[i].name;
                    if (attName !== 'id') {
                        dest.setAttribute(attName, newAttrs[i].value);
                    }
                }
            }

            
            if (sourceLen !== destLen) {
                dest.innerHTML = source.innerHTML;
                return;
            }

            
            
            for (i = 0; i < sourceLen; i++) {
                sourceNode = sourceNodes[i];
                destNode = destNodes[i];
                nodeType = sourceNode.nodeType;

                
                if (nodeType !== destNode.nodeType || (nodeType === 1 && sourceNode.tagName !== destNode.tagName)) {
                    dest.innerHTML = source.innerHTML;
                    return;
                }

                
                if (nodeType === 3) {
                    destNode.data = sourceNode.data;
                }
                
                else {
                    if (sourceNode.id && destNode.id !== sourceNode.id) {
                        destNode.id = sourceNode.id;
                    }
                    destNode.style.cssText = sourceNode.style.cssText;
                    destNode.className = sourceNode.className;
                    internalFly.attach(destNode).syncContent(sourceNode);
                }
            }
        },

        
        update : function(html, loadScripts, callback) {
            var me = this,
                id,
                dom,
                interval;

            if (!me.dom) {
                return me;
            }
            html = html || '';
            dom = me.dom;

            if (loadScripts !== true) {
                dom.innerHTML = html;
                Ext.callback(callback, me);
                return me;
            }

            id  = Ext.id();
            html += '<span id="' + id + '"></span>';

            interval = setInterval(function() {
                var hd,
                    match,
                    attrs,
                    srcMatch,
                    typeMatch,
                    el,
                    s;
                if (!(el = DOC.getElementById(id))) {
                    return false;
                }
                clearInterval(interval);
                Ext.removeNode(el);
                hd = Ext.getHead().dom;

                while ((match = scriptTagRe.exec(html))) {
                    attrs = match[1];
                    srcMatch = attrs ? attrs.match(srcRe) : false;
                    if (srcMatch && srcMatch[2]) {
                       s = DOC.createElement("script");
                       s.src = srcMatch[2];
                       typeMatch = attrs.match(typeRe);
                       if (typeMatch && typeMatch[2]) {
                           s.type = typeMatch[2];
                       }
                       hd.appendChild(s);
                    } else if (match[2] && match[2].length > 0) {
                        if (window.execScript) {
                           window.execScript(match[2]);
                        } else {
                           window.eval(match[2]);
                        }
                    }
                }
                Ext.callback(callback, me);
            }, 20);
            dom.innerHTML = html.replace(replaceScriptTagRe, '');
            return me;
        },

        
        removeAllListeners : function() {
            this.removeAnchor();
            Ext.EventManager.removeAll(this.dom);
            return this;
        },

        
        createProxy : function(config, renderTo, matchBox) {
            config = (typeof config == 'object') ? config : {tag : "div", cls: config};

            var me = this,
                proxy = renderTo ? Ext.DomHelper.append(renderTo, config, true) :
                                   Ext.DomHelper.insertBefore(me.dom, config, true);

            proxy.setVisibilityMode(Element.DISPLAY);
            proxy.hide();
            if (matchBox && me.setBox && me.getBox) { 
               proxy.setBox(me.getBox());
            }
            return proxy;
        },
        
        
        needsTabIndex: function() {
            if (this.dom) {
                if ((this.dom.nodeName === 'a') && (!this.dom.href)) {
                    return true;
                }
                return !focusRe.test(this.dom.nodeName);
            }
        },

        
        isFocusable: function ( asFocusEl) {
            var dom = this.dom,
                tabIndexAttr = dom.getAttributeNode('tabIndex'),
                tabIndex,
                nodeName = dom.nodeName,
                canFocus = false;

            
            
            
            
            
            
            
            
            
            
            if (tabIndexAttr && tabIndexAttr.specified) {
                tabIndex = tabIndexAttr.value;
            }
            if (dom && !dom.disabled) {
                
                
                if (tabIndex == -1) { 
                    canFocus = Ext.FocusManager && Ext.FocusManager.enabled && asFocusEl;
                }
                else {
                    
                    if (focusRe.test(nodeName)) {
                        if ((nodeName !== 'a') || dom.href) {
                            canFocus = true;
                        }
                    }
                    
                    else {
                        canFocus = tabIndex != null && tabIndex >= 0;
                    }
                }
                canFocus = canFocus && this.isVisible(true);
            }
            return canFocus;
        }
    });

    if (Ext.isIE) {
        Element.prototype.getById = function (id, asDom) {
            var dom = this.dom,
                cacheItem, el, ret;

            if (dom) {
                
                
                el = (useDocForId && DOC.getElementById(id)) || dom.all[id];
                if (el) {
                    if (asDom) {
                        ret = el;
                    } else {
                        
                        
                        cacheItem = EC[id];
                        if (cacheItem && cacheItem.el) {
                            ret = Ext.updateCacheEntry(cacheItem, el).el;
                        } else {
                            ret = new Element(el);
                        }
                    }
                    return ret;
                }
            }

            return asDom ? Ext.getDom(id) : Element.get(id);
        };
    }

    Element.createAlias({
        
        addListener: 'on',
        
        removeListener: 'un',
        
        clearListeners: 'removeAllListeners',
        
        focusable: 'isFocusable'
    });

    Element.Fly = AbstractElement.Fly = new Ext.Class({
        extend: Element,

        isFly: true,

        constructor: function(dom) {
            this.dom = dom;
            
            
            
            this.el = this;
        },
        
        attach: AbstractElement.Fly.prototype.attach
    });
    
    internalFly = new Element.Fly();

    if (Ext.isIE) {
        Ext.getElementById = function (id) {
            var el = DOC.getElementById(id),
                detachedBodyEl;

            if (!el && (detachedBodyEl = AbstractElement.detachedBodyEl)) {
                el = detachedBodyEl.dom.all[id];
            }

            return el;
        };
    } else if (!DOC.querySelector) {
        Ext.getDetachedBody = Ext.getBody;

        Ext.getElementById = function (id) {
            return DOC.getElementById(id);
        };
    }
});



Ext.define('Ext.dom.CompositeElementLite', {
    alternateClassName: 'Ext.CompositeElementLite',

                                                   

    statics: {
        
        importElementMethods: function() {
            var name,
                elementPrototype = Ext.dom.Element.prototype,
                prototype = this.prototype;

            for (name in elementPrototype) {
                if (typeof elementPrototype[name] == 'function'){
                    (function(key) {
                        prototype[key] = prototype[key] || function() {
                            return this.invoke(key, arguments);
                        };
                    }).call(prototype, name);

                }
            }
        }
    },

    constructor: function(elements, root) {
        
        this.elements = [];
        this.add(elements, root);
        this.el = new Ext.dom.AbstractElement.Fly();
    },

    
    isComposite: true,

    
    getElement: function(el) {
        
        return this.el.attach(el);
    },

    
    transformElement: function(el) {
        return Ext.getDom(el);
    },

    
    getCount: function() {
        return this.elements.length;
    },

    
    add: function(els, root) {
        var elements = this.elements,
            i, ln;

        if (!els) {
            return this;
        }

        if (typeof els == "string") {
            els = Ext.dom.Element.selectorFunction(els, root);
        }
        else if (els.isComposite) {
            els = els.elements;
        }
        else if (!Ext.isIterable(els)) {
            els = [els];
        }

        for (i = 0, ln = els.length; i < ln; ++i) {
            elements.push(this.transformElement(els[i]));
        }

        return this;
    },

    invoke: function(fn, args) {
        var elements = this.elements,
            ln = elements.length,
            element,
            i;

        fn = Ext.dom.Element.prototype[fn];
        for (i = 0; i < ln; i++) {
            element = elements[i];

            if (element) {
                fn.apply(this.getElement(element), args);
            }
        }
        return this;
    },

    
    item: function(index) {
        var el = this.elements[index],
            out = null;

        if (el) {
            out = this.getElement(el);
        }

        return out;
    },

    
    slice: function() {
        return this.elements.slice.apply(this.elements, arguments);
    },

    
    addListener: function(eventName, handler, scope, opt) {
        var els = this.elements,
                len = els.length,
                i, e;

        for (i = 0; i < len; i++) {
            e = els[i];
            if (e) {
                Ext.EventManager.on(e, eventName, handler, scope || e, opt);
            }
        }
        return this;
    },
    
    each: function(fn, scope) {
        var me  = this,
            els = me.elements,
            len = els.length,
            i, e;

        for (i = 0; i < len; i++) {
            e = els[i];
            if (e) {
                e = this.getElement(e);
                if (fn.call(scope || e, e, me, i) === false) {
                    break;
                }
            }
        }
        return me;
    },

    
    fill: function(els) {
        var me = this;
        me.elements = [];
        me.add(els);
        return me;
    },

    insert: function(index, nodes) {
        Ext.Array.insert(this.elements, index, nodes);
    },

    
    filter: function(selector) {
        var me  = this,
            els = me.elements,
            len = els.length,
            out = [],
            i = 0,
            isFunc = typeof selector == 'function',
            add,
            el;

        for (; i < len; i++) {
            el = els[i];
            add = false;
            if (el) {
                el = me.getElement(el);

                if (isFunc) {
                    add = selector.call(el, el, me, i) !== false;
                } else {
                    add = el.is(selector);
                }
                
                if (add) {
                    out.push(me.transformElement(el));
                }
            }
        }

        me.elements = out;
        return me;
    },

    
    indexOf: function(el) {
        return Ext.Array.indexOf(this.elements, this.transformElement(el));
    },

    
    replaceElement: function(el, replacement, domReplace) {
        var index = !isNaN(el) ? el : this.indexOf(el),
                d;
        if (index > -1) {
            replacement = Ext.getDom(replacement);
            if (domReplace) {
                d = this.elements[index];
                d.parentNode.insertBefore(replacement, d);
                Ext.removeNode(d);
            }
            Ext.Array.splice(this.elements, index, 1, replacement);
        }
        return this;
    },

    
    clear: function(removeDom) {
        var me  = this,
            els = me.elements,
            i = els.length - 1;
        
        if (removeDom) {
            for (; i >= 0; i--) {
                Ext.removeNode(els[i]);
            }
        }
        this.elements = [];
    },

    addElements: function(els, root) {
        if (!els) {
            return this;
        }

        if (typeof els == "string") {
            els = Ext.dom.Element.selectorFunction(els, root);
        }

        var yels = this.elements,
            eLen = els.length,
            e;

        for (e = 0; e < eLen; e++) {
            yels.push(Ext.get(els[e]));
        }

        return this;
    },

    
    first: function() {
        return this.item(0);
    },

    
    last: function() {
        return this.item(this.getCount() - 1);
    },

    
    contains: function(el) {
        return this.indexOf(el) != -1;
    },

    
    removeElement: function(keys, removeDom) {
        keys = [].concat(keys);

        var me       = this,
            elements = me.elements,
            kLen     = keys.length,
            val, el, k;

        for (k = 0; k < kLen; k++) {
            val = keys[k];

            if ((el = (elements[val] || elements[val = me.indexOf(val)]))) {
                if (removeDom) {
                    if (el.dom) {
                        el.remove();
                    } else {
                        Ext.removeNode(el);
                    }
                }
                Ext.Array.erase(elements, val, 1);
            }
        }

        return me;
    }

}, function() {
    this.importElementMethods();

    this.prototype.on = this.prototype.addListener;

    if (Ext.DomQuery){
        Ext.dom.Element.selectorFunction = Ext.DomQuery.select;
    }

    
   Ext.dom.Element.select = function(selector, root) {
        var elements;

        if (typeof selector == "string") {
            elements = Ext.dom.Element.selectorFunction(selector, root);
        }
        else if (selector.length !== undefined) {
            elements = selector;
        }
        else {
        }

        return new Ext.CompositeElementLite(elements);
    };

    
    Ext.select = function() {
        return Ext.dom.Element.select.apply(Ext.dom.Element, arguments);
    };
});



Ext.define('Ext.dom.CompositeElement', {
    alternateClassName: 'Ext.CompositeElement',

    extend:  Ext.dom.CompositeElementLite ,

    
    getElement: function(el) {
        
        return el;
    },

    
    transformElement: function(el) {
        return Ext.get(el);
    }

}, function() {
    

    Ext.dom.Element.select = function(selector, unique, root) {
        var elements;

        if (typeof selector == "string") {
            elements = Ext.dom.Element.selectorFunction(selector, root);
        }
        else if (selector.length !== undefined) {
            elements = selector;
        }
        else {
        }
        return (unique === true) ? new Ext.CompositeElement(elements) : new Ext.CompositeElementLite(elements);
    };
});


Ext.select = Ext.Element.select;

Ext.ClassManager.addNameAlternateMappings({
  "Ext.rtl.layout.container.boxOverflow.Menu": [],
  "Ext.draw.engine.ImageExporter": [],
  "Ext.layout.component.Auto": [],
  "Ext.grid.property.Store": [
    "Ext.grid.PropertyStore"
  ],
  "Ext.layout.container.Box": [
    "Ext.layout.BoxLayout"
  ],
  "Ext.rtl.resizer.BorderSplitterTracker": [],
  "Ext.direct.JsonProvider": [],
  "Ext.tree.Panel": [
    "Ext.tree.TreePanel",
    "Ext.TreePanel"
  ],
  "Ext.data.Model": [
    "Ext.data.Record"
  ],
  "Ext.data.reader.Reader": [
    "Ext.data.Reader",
    "Ext.data.DataReader"
  ],
  "Ext.tab.Tab": [],
  "Ext.button.Button": [
    "Ext.Button"
  ],
  "Ext.util.Grouper": [],
  "Ext.direct.RemotingProvider": [],
  "Ext.data.NodeInterface": [],
  "Ext.view.NodeCache": [],
  "Ext.grid.column.Date": [
    "Ext.grid.DateColumn"
  ],
  "Ext.form.field.Trigger": [
    "Ext.form.TriggerField",
    "Ext.form.TwinTriggerField",
    "Ext.form.Trigger"
  ],
  "Ext.grid.plugin.RowEditing": [],
  "Ext.tip.QuickTip": [
    "Ext.QuickTip"
  ],
  "Ext.rtl.grid.plugin.HeaderResizer": [],
  "Ext.form.action.Load": [
    "Ext.form.Action.Load"
  ],
  "Ext.form.field.ComboBox": [
    "Ext.form.ComboBox"
  ],
  "Ext.layout.container.Border": [
    "Ext.layout.BorderLayout"
  ],
  "Ext.rtl.layout.container.Column": [],
  "Ext.data.JsonPStore": [],
  "Ext.layout.component.field.TextArea": [],
  "Ext.layout.container.Container": [
    "Ext.layout.ContainerLayout"
  ],
  "Ext.util.Sortable": [],
  "Ext.selection.Model": [
    "Ext.AbstractSelectionModel"
  ],
  "Ext.draw.CompositeSprite": [],
  "Ext.fx.Queue": [],
  "Ext.dd.StatusProxy": [],
  "Ext.form.field.Checkbox": [
    "Ext.form.Checkbox"
  ],
  "Ext.direct.Transaction": [
    "Ext.Direct.Transaction"
  ],
  "Ext.util.Offset": [],
  "Ext.container.Monitor": [],
  "Ext.view.DragZone": [],
  "Ext.util.KeyNav": [
    "Ext.KeyNav"
  ],
  "Ext.rtl.dom.Element_static": [],
  "Ext.form.field.File": [
    "Ext.form.FileUploadField",
    "Ext.ux.form.FileUploadField",
    "Ext.form.File"
  ],
  "Ext.slider.Single": [
    "Ext.Slider",
    "Ext.form.SliderField",
    "Ext.slider.SingleSlider",
    "Ext.slider.Slider"
  ],
  "Ext.panel.Proxy": [
    "Ext.dd.PanelProxy"
  ],
  "Ext.fx.target.Target": [],
  "Ext.ComponentManager": [
    "Ext.ComponentMgr"
  ],
  "Ext.grid.feature.GroupingSummary": [],
  "Ext.grid.property.HeaderContainer": [
    "Ext.grid.PropertyColumnModel"
  ],
  "Ext.layout.component.BoundList": [],
  "Ext.tab.Bar": [],
  "Ext.app.Application": [],
  "Ext.layout.container.Accordion": [
    "Ext.layout.AccordionLayout"
  ],
  "Ext.ShadowPool": [],
  "Ext.grid.locking.HeaderContainer": [],
  "Ext.resizer.ResizeTracker": [],
  "Ext.panel.Tool": [],
  "Ext.layout.container.boxOverflow.None": [
    "Ext.layout.boxOverflow.None"
  ],
  "Ext.grid.CellContext": [],
  "Ext.tree.View": [],
  "Ext.ElementLoader": [],
  "Ext.grid.ColumnComponentLayout": [],
  "Ext.toolbar.Separator": [
    "Ext.Toolbar.Separator"
  ],
  "Ext.dd.DragZone": [],
  "Ext.layout.component.FieldSet": [],
  "Ext.util.Renderable": [],
  "Ext.util.Bindable": [],
  "Ext.data.SortTypes": [],
  "Ext.rtl.layout.container.HBox": [],
  "Ext.util.Animate": [],
  "Ext.data.flash.BinaryXhr": [],
  "Ext.form.field.Date": [
    "Ext.form.DateField",
    "Ext.form.Date"
  ],
  "Ext.Component": [],
  "Ext.chart.axis.Axis": [
    "Ext.chart.Axis"
  ],
  "Ext.menu.DatePicker": [],
  "Ext.fx.target.CompositeSprite": [],
  "Ext.rtl.tip.QuickTipManager": [],
  "Ext.form.field.Picker": [
    "Ext.form.Picker"
  ],
  "Ext.fx.Animator": [],
  "Ext.Ajax": [],
  "Ext.layout.component.Dock": [
    "Ext.layout.component.AbstractDock"
  ],
  "Ext.util.Filter": [],
  "Ext.dd.DragDrop": [],
  "Ext.view.View": [
    "Ext.DataView"
  ],
  "Ext.data.association.BelongsTo": [
    "Ext.data.BelongsToAssociation"
  ],
  "Ext.fx.target.Element": [],
  "Ext.draw.Surface": [],
  "Ext.dd.DDProxy": [],
  "Ext.data.AbstractStore": [],
  "Ext.grid.plugin.BufferedRendererTreeView": [],
  "Ext.grid.locking.View": [
    "Ext.grid.LockingView"
  ],
  "Ext.form.action.StandardSubmit": [],
  "Ext.dd.Registry": [],
  "Ext.picker.Month": [
    "Ext.MonthPicker"
  ],
  "Ext.menu.Manager": [
    "Ext.menu.MenuMgr"
  ],
  "Ext.container.Container": [
    "Ext.Container"
  ],
  "Ext.rtl.form.field.Spinner": [],
  "Ext.util.KeyMap": [
    "Ext.KeyMap"
  ],
  "Ext.data.Batch": [],
  "Ext.resizer.Handle": [],
  "Ext.util.ElementContainer": [],
  "Ext.grid.feature.Grouping": [],
  "Ext.tab.Panel": [
    "Ext.TabPanel"
  ],
  "Ext.rtl.grid.CellEditor": [],
  "Ext.layout.component.Body": [],
  "Ext.layout.Context": [],
  "Ext.layout.component.field.ComboBox": [],
  "Ext.dd.DDTarget": [],
  "Ext.chart.Chart": [],
  "Ext.data.Field": [],
  "Ext.form.field.FileButton": [],
  "Ext.chart.series.Gauge": [],
  "Ext.data.StoreManager": [
    "Ext.StoreMgr",
    "Ext.data.StoreMgr",
    "Ext.StoreManager"
  ],
  "Ext.data.IdGenerator": [],
  "Ext.tip.QuickTipManager": [
    "Ext.QuickTips"
  ],
  "Ext.grid.plugin.Editing": [],
  "Ext.Queryable": [],
  "Ext.state.LocalStorageProvider": [],
  "Ext.grid.RowEditor": [],
  "Ext.app.EventDomain": [],
  "Ext.form.action.Action": [
    "Ext.form.Action"
  ],
  "Ext.fx.Easing": [],
  "Ext.ProgressBar": [],
  "Ext.tree.ViewDragZone": [],
  "Ext.data.reader.Array": [
    "Ext.data.ArrayReader"
  ],
  "Ext.picker.Date": [
    "Ext.DatePicker"
  ],
  "Ext.rtl.grid.column.Column": [],
  "Ext.data.proxy.JsonP": [
    "Ext.data.ScriptTagProxy"
  ],
  "Ext.chart.series.Area": [],
  "Ext.fx.Anim": [],
  "Ext.menu.Item": [
    "Ext.menu.TextItem"
  ],
  "Ext.rtl.dom.Element_position": [],
  "Ext.chart.Legend": [],
  "Ext.grid.plugin.HeaderReorderer": [],
  "Ext.rtl.view.Table": [],
  "Ext.layout.container.VBox": [
    "Ext.layout.VBoxLayout"
  ],
  "Ext.rtl.util.Floating": [],
  "Ext.view.DropZone": [],
  "Ext.rtl.tree.Column": [],
  "Ext.layout.component.Button": [],
  "Ext.form.field.Hidden": [
    "Ext.form.Hidden"
  ],
  "Ext.form.FieldContainer": [],
  "Ext.rtl.grid.plugin.RowEditing": [],
  "Ext.data.proxy.Server": [
    "Ext.data.ServerProxy"
  ],
  "Ext.chart.series.Cartesian": [
    "Ext.chart.CartesianSeries",
    "Ext.chart.CartesianChart"
  ],
  "Ext.rtl.layout.component.Dock": [],
  "Ext.grid.column.Column": [
    "Ext.grid.Column"
  ],
  "Ext.data.ResultSet": [],
  "Ext.data.association.HasMany": [
    "Ext.data.HasManyAssociation"
  ],
  "Ext.layout.container.Fit": [
    "Ext.layout.FitLayout"
  ],
  "Ext.util.CSS": [],
  "Ext.rtl.AbstractComponent": [],
  "Ext.layout.component.field.Field": [],
  "Ext.data.proxy.Ajax": [
    "Ext.data.HttpProxy",
    "Ext.data.AjaxProxy"
  ],
  "Ext.rtl.EventObjectImpl": [],
  "Ext.app.domain.Component": [],
  "Ext.form.Label": [],
  "Ext.data.writer.Writer": [
    "Ext.data.DataWriter",
    "Ext.data.Writer"
  ],
  "Ext.view.BoundListKeyNav": [],
  "Ext.form.FieldSet": [],
  "Ext.form.field.VTypes": [
    "Ext.form.VTypes"
  ],
  "Ext.fx.PropertyHandler": [],
  "Ext.form.CheckboxGroup": [],
  "Ext.data.JsonP": [],
  "Ext.draw.engine.Vml": [],
  "Ext.layout.container.CheckboxGroup": [],
  "Ext.app.domain.Direct": [],
  "Ext.panel.Header": [],
  "Ext.app.Controller": [],
  "Ext.rtl.dom.Layer": [],
  "Ext.grid.plugin.CellEditing": [],
  "Ext.form.field.Time": [
    "Ext.form.TimeField",
    "Ext.form.Time"
  ],
  "Ext.fx.CubicBezier": [],
  "Ext.button.Cycle": [
    "Ext.CycleButton"
  ],
  "Ext.app.domain.Global": [],
  "Ext.data.Tree": [],
  "Ext.ModelManager": [
    "Ext.ModelMgr"
  ],
  "Ext.data.XmlStore": [],
  "Ext.grid.ViewDropZone": [],
  "Ext.rtl.slider.Multi": [],
  "Ext.grid.header.DropZone": [],
  "Ext.rtl.layout.component.field.Text": [],
  "Ext.util.HashMap": [],
  "Ext.grid.column.Template": [
    "Ext.grid.TemplateColumn"
  ],
  "Ext.ComponentLoader": [],
  "Ext.form.FieldAncestor": [],
  "Ext.rtl.layout.container.Border": [],
  "Ext.app.domain.Controller": [],
  "Ext.chart.axis.Gauge": [],
  "Ext.layout.container.border.Region": [],
  "Ext.data.validations": [],
  "Ext.data.Connection": [],
  "Ext.resizer.Splitter": [],
  "Ext.dd.DropZone": [],
  "Ext.direct.ExceptionEvent": [],
  "Ext.form.RadioManager": [],
  "Ext.data.association.HasOne": [
    "Ext.data.HasOneAssociation"
  ],
  "Ext.draw.Text": [],
  "Ext.window.MessageBox": [],
  "Ext.fx.target.CompositeElementCSS": [],
  "Ext.rtl.selection.CellModel": [],
  "Ext.rtl.layout.ContextItem": [],
  "Ext.chart.series.Line": [
    "Ext.chart.LineSeries",
    "Ext.chart.LineChart"
  ],
  "Ext.view.Table": [],
  "Ext.fx.target.CompositeElement": [],
  "Ext.fx.Manager": [],
  "Ext.data.writer.Json": [
    "Ext.data.JsonWriter"
  ],
  "Ext.chart.Label": [],
  "Ext.grid.View": [],
  "Ext.Action": [],
  "Ext.form.Basic": [
    "Ext.form.BasicForm"
  ],
  "Ext.rtl.form.field.Checkbox": [],
  "Ext.container.Viewport": [
    "Ext.Viewport"
  ],
  "Ext.state.Stateful": [],
  "Ext.grid.feature.RowBody": [],
  "Ext.form.field.Text": [
    "Ext.form.TextField",
    "Ext.form.Text"
  ],
  "Ext.rtl.layout.component.field.Trigger": [],
  "Ext.data.reader.Xml": [
    "Ext.data.XmlReader"
  ],
  "Ext.grid.feature.AbstractSummary": [],
  "Ext.chart.axis.Category": [
    "Ext.chart.CategoryAxis"
  ],
  "Ext.rtl.layout.container.boxOverflow.Scroller": [],
  "Ext.grid.plugin.BufferedRendererTableView": [],
  "Ext.layout.container.Absolute": [
    "Ext.layout.AbsoluteLayout"
  ],
  "Ext.rtl.layout.container.Box": [],
  "Ext.data.reader.Json": [
    "Ext.data.JsonReader"
  ],
  "Ext.util.TextMetrics": [],
  "Ext.data.TreeStore": [],
  "Ext.view.BoundList": [
    "Ext.BoundList"
  ],
  "Ext.form.field.HtmlEditor": [
    "Ext.form.HtmlEditor"
  ],
  "Ext.layout.container.Form": [
    "Ext.layout.FormLayout"
  ],
  "Ext.chart.MaskLayer": [],
  "Ext.resizer.BorderSplitterTracker": [],
  "Ext.util.LruCache": [],
  "Ext.tip.Tip": [
    "Ext.Tip"
  ],
  "Ext.grid.column.CheckColumn": [
    "Ext.ux.CheckColumn"
  ],
  "Ext.grid.column.RowNumberer": [
    "Ext.grid.RowNumberer"
  ],
  "Ext.rtl.resizer.SplitterTracker": [],
  "Ext.grid.feature.RowWrap": [],
  "Ext.data.proxy.Client": [
    "Ext.data.ClientProxy"
  ],
  "Ext.data.Types": [],
  "Ext.draw.SpriteDD": [],
  "Ext.layout.container.boxOverflow.Menu": [
    "Ext.layout.boxOverflow.Menu"
  ],
  "Ext.LoadMask": [],
  "Ext.rtl.grid.RowEditor": [],
  "Ext.toolbar.Paging": [
    "Ext.PagingToolbar"
  ],
  "Ext.data.association.Association": [
    "Ext.data.Association"
  ],
  "Ext.tree.ViewDropZone": [],
  "Ext.toolbar.Toolbar": [
    "Ext.Toolbar"
  ],
  "Ext.tip.ToolTip": [
    "Ext.ToolTip"
  ],
  "Ext.chart.Highlight": [],
  "Ext.state.Manager": [],
  "Ext.util.Inflector": [],
  "Ext.grid.Panel": [
    "Ext.list.ListView",
    "Ext.ListView",
    "Ext.grid.GridPanel"
  ],
  "Ext.data.NodeStore": [],
  "Ext.Shadow": [],
  "Ext.form.action.Submit": [
    "Ext.form.Action.Submit"
  ],
  "Ext.form.Panel": [
    "Ext.FormPanel",
    "Ext.form.FormPanel"
  ],
  "Ext.chart.series.Series": [],
  "Ext.data.Request": [],
  "Ext.dd.DD": [],
  "Ext.toolbar.Fill": [
    "Ext.Toolbar.Fill"
  ],
  "Ext.data.proxy.WebStorage": [
    "Ext.data.WebStorageProxy"
  ],
  "Ext.util.Floating": [],
  "Ext.form.action.DirectSubmit": [
    "Ext.form.Action.DirectSubmit"
  ],
  "Ext.util.Cookies": [],
  "Ext.data.UuidGenerator": [],
  "Ext.util.Point": [],
  "Ext.fx.target.Component": [],
  "Ext.form.CheckboxManager": [],
  "Ext.form.field.Field": [],
  "Ext.form.field.Display": [
    "Ext.form.DisplayField",
    "Ext.form.Display"
  ],
  "Ext.layout.container.Anchor": [
    "Ext.layout.AnchorLayout"
  ],
  "Ext.layout.component.field.Text": [],
  "Ext.data.DirectStore": [],
  "Ext.dom.Layer": [
    "Ext.Layer"
  ],
  "Ext.grid.RowEditorButtons": [],
  "Ext.data.BufferStore": [],
  "Ext.grid.plugin.DivRenderer": [],
  "Ext.grid.ColumnLayout": [],
  "Ext.chart.series.Column": [
    "Ext.chart.ColumnSeries",
    "Ext.chart.ColumnChart",
    "Ext.chart.StackedColumnChart"
  ],
  "Ext.AbstractComponent": [],
  "Ext.flash.Component": [
    "Ext.FlashComponent"
  ],
  "Ext.form.field.Base": [
    "Ext.form.Field",
    "Ext.form.BaseField"
  ],
  "Ext.grid.feature.GroupStore": [],
  "Ext.data.SequentialIdGenerator": [],
  "Ext.grid.header.Container": [],
  "Ext.container.ButtonGroup": [
    "Ext.ButtonGroup"
  ],
  "Ext.data.PageMap": [],
  "Ext.grid.column.Action": [
    "Ext.grid.ActionColumn"
  ],
  "Ext.layout.component.field.Trigger": [],
  "Ext.layout.component.field.FieldContainer": [],
  "Ext.chart.Shape": [],
  "Ext.panel.DD": [],
  "Ext.container.AbstractContainer": [],
  "Ext.data.ArrayStore": [],
  "Ext.rtl.layout.container.CheckboxGroup": [],
  "Ext.window.Window": [
    "Ext.Window"
  ],
  "Ext.picker.Color": [
    "Ext.ColorPalette"
  ],
  "Ext.grid.feature.Feature": [],
  "Ext.chart.theme.Theme": [],
  "Ext.util.ClickRepeater": [],
  "Ext.form.field.Spinner": [
    "Ext.form.Spinner"
  ],
  "Ext.container.DockingContainer": [],
  "Ext.selection.DataViewModel": [],
  "Ext.rtl.selection.TreeModel": [],
  "Ext.dd.DragTracker": [],
  "Ext.data.Group": [],
  "Ext.dd.DragDropManager": [
    "Ext.dd.DragDropMgr",
    "Ext.dd.DDM"
  ],
  "Ext.selection.CheckboxModel": [],
  "Ext.menu.KeyNav": [],
  "Ext.layout.container.Column": [
    "Ext.layout.ColumnLayout"
  ],
  "Ext.draw.Matrix": [],
  "Ext.form.field.Number": [
    "Ext.form.NumberField",
    "Ext.form.Number"
  ],
  "Ext.rtl.util.Renderable": [],
  "Ext.data.proxy.Direct": [
    "Ext.data.DirectProxy"
  ],
  "Ext.chart.Navigation": [],
  "Ext.slider.Tip": [],
  "Ext.chart.theme.Base": [],
  "Ext.form.field.TextArea": [
    "Ext.form.TextArea"
  ],
  "Ext.rtl.layout.container.VBox": [],
  "Ext.form.field.Radio": [
    "Ext.form.Radio"
  ],
  "Ext.layout.component.ProgressBar": [],
  "Ext.chart.series.Pie": [
    "Ext.chart.PieSeries",
    "Ext.chart.PieChart"
  ],
  "Ext.tree.plugin.TreeViewDragDrop": [],
  "Ext.direct.Provider": [],
  "Ext.data.TreeModel": [],
  "Ext.layout.Layout": [],
  "Ext.toolbar.TextItem": [
    "Ext.Toolbar.TextItem"
  ],
  "Ext.rtl.button.Button": [],
  "Ext.util.AbstractMixedCollection": [],
  "Ext.data.JsonStore": [],
  "Ext.button.Split": [
    "Ext.SplitButton"
  ],
  "Ext.dd.DropTarget": [],
  "Ext.direct.RemotingEvent": [],
  "Ext.draw.Sprite": [],
  "Ext.fx.target.Sprite": [],
  "Ext.data.proxy.LocalStorage": [
    "Ext.data.LocalStorageProxy"
  ],
  "Ext.layout.component.Draw": [],
  "Ext.AbstractPlugin": [],
  "Ext.Editor": [],
  "Ext.chart.axis.Radial": [],
  "Ext.chart.Tip": [],
  "Ext.layout.container.Table": [
    "Ext.layout.TableLayout"
  ],
  "Ext.chart.axis.Abstract": [],
  "Ext.data.proxy.Rest": [
    "Ext.data.RestProxy"
  ],
  "Ext.rtl.layout.container.Absolute": [],
  "Ext.util.Queue": [],
  "Ext.state.CookieProvider": [],
  "Ext.Img": [],
  "Ext.dd.DragSource": [],
  "Ext.grid.CellEditor": [],
  "Ext.layout.ClassList": [],
  "Ext.button.Manager": [
    "Ext.ButtonToggleManager"
  ],
  "Ext.rtl.form.field.File": [],
  "Ext.util.Sorter": [],
  "Ext.resizer.SplitterTracker": [],
  "Ext.panel.Table": [],
  "Ext.draw.Color": [],
  "Ext.chart.series.Bar": [
    "Ext.chart.BarSeries",
    "Ext.chart.BarChart",
    "Ext.chart.StackedBarChart"
  ],
  "Ext.PluginManager": [
    "Ext.PluginMgr"
  ],
  "Ext.util.ComponentDragger": [],
  "Ext.chart.series.Scatter": [],
  "Ext.chart.Callout": [],
  "Ext.data.Store": [],
  "Ext.grid.feature.Summary": [],
  "Ext.util.ProtoElement": [],
  "Ext.layout.component.Component": [],
  "Ext.direct.Manager": [],
  "Ext.data.proxy.Proxy": [
    "Ext.data.DataProxy",
    "Ext.data.Proxy"
  ],
  "Ext.menu.CheckItem": [],
  "Ext.layout.container.Card": [
    "Ext.layout.CardLayout"
  ],
  "Ext.draw.Component": [],
  "Ext.toolbar.Item": [
    "Ext.Toolbar.Item"
  ],
  "Ext.form.RadioGroup": [],
  "Ext.rtl.tab.Bar": [],
  "Ext.rtl.form.field.Trigger": [],
  "Ext.slider.Thumb": [],
  "Ext.grid.header.DragZone": [],
  "Ext.rtl.resizer.ResizeTracker": [],
  "Ext.form.action.DirectLoad": [
    "Ext.form.Action.DirectLoad"
  ],
  "Ext.picker.Time": [],
  "Ext.grid.plugin.BufferedRenderer": [],
  "Ext.resizer.BorderSplitter": [],
  "Ext.menu.ColorPicker": [],
  "Ext.ZIndexManager": [
    "Ext.WindowGroup"
  ],
  "Ext.menu.Menu": [],
  "Ext.chart.LegendItem": [],
  "Ext.toolbar.Spacer": [
    "Ext.Toolbar.Spacer"
  ],
  "Ext.rtl.dd.DD": [],
  "Ext.panel.Panel": [
    "Ext.Panel"
  ],
  "Ext.util.Memento": [],
  "Ext.app.domain.Store": [],
  "Ext.data.proxy.Memory": [
    "Ext.data.MemoryProxy"
  ],
  "Ext.chart.axis.Time": [
    "Ext.chart.TimeAxis"
  ],
  "Ext.grid.plugin.DragDrop": [],
  "Ext.ComponentQuery": [],
  "Ext.draw.engine.SvgExporter": [],
  "Ext.layout.container.Auto": [],
  "Ext.grid.locking.Lockable": [
    "Ext.grid.Lockable"
  ],
  "Ext.view.AbstractView": [],
  "Ext.util.Region": [],
  "Ext.draw.Draw": [],
  "Ext.fx.target.ElementCSS": [],
  "Ext.rtl.panel.Panel": [],
  "Ext.layout.component.field.HtmlEditor": [],
  "Ext.data.proxy.SessionStorage": [
    "Ext.data.SessionStorageProxy"
  ],
  "Ext.app.EventBus": [],
  "Ext.menu.Separator": [],
  "Ext.util.History": [
    "Ext.History"
  ],
  "Ext.direct.Event": [],
  "Ext.direct.RemotingMethod": [],
  "Ext.dd.ScrollManager": [],
  "Ext.chart.Mask": [],
  "Ext.rtl.dom.Element_anim": [],
  "Ext.selection.CellModel": [],
  "Ext.view.TableLayout": [],
  "Ext.rtl.panel.Header": [],
  "Ext.rtl.dom.Element_scroll": [],
  "Ext.state.Provider": [],
  "Ext.layout.container.Editor": [],
  "Ext.grid.ColumnManager": [
    "Ext.grid.ColumnModel"
  ],
  "Ext.data.Errors": [],
  "Ext.grid.plugin.RowExpander": [],
  "Ext.selection.TreeModel": [],
  "Ext.form.Labelable": [],
  "Ext.grid.column.Number": [
    "Ext.grid.NumberColumn"
  ],
  "Ext.draw.engine.Svg": [],
  "Ext.grid.property.Grid": [
    "Ext.grid.PropertyGrid"
  ],
  "Ext.FocusManager": [
    "Ext.FocusMgr"
  ],
  "Ext.AbstractManager": [],
  "Ext.chart.series.Radar": [],
  "Ext.rtl.dom.Element_insertion": [],
  "Ext.grid.property.Property": [
    "Ext.PropGridProperty"
  ],
  "Ext.chart.TipSurface": [],
  "Ext.layout.SizeModel": [],
  "Ext.grid.column.Boolean": [
    "Ext.grid.BooleanColumn"
  ],
  "Ext.direct.PollingProvider": [],
  "Ext.grid.plugin.HeaderResizer": [],
  "Ext.tree.Column": [],
  "Ext.data.writer.Xml": [
    "Ext.data.XmlWriter"
  ],
  "Ext.slider.Multi": [
    "Ext.slider.MultiSlider"
  ],
  "Ext.panel.AbstractPanel": [],
  "Ext.layout.component.field.Slider": [],
  "Ext.chart.axis.Numeric": [
    "Ext.chart.NumericAxis"
  ],
  "Ext.layout.container.boxOverflow.Scroller": [
    "Ext.layout.boxOverflow.Scroller"
  ],
  "Ext.data.Operation": [],
  "Ext.resizer.Resizer": [
    "Ext.Resizable"
  ],
  "Ext.layout.container.HBox": [
    "Ext.layout.HBoxLayout"
  ],
  "Ext.selection.RowModel": [],
  "Ext.layout.ContextItem": [],
  "Ext.util.MixedCollection": []
});
Ext.ClassManager.addNameAliasMappings({
  "Ext.rtl.layout.container.boxOverflow.Menu": [],
  "Ext.draw.engine.ImageExporter": [],
  "Ext.layout.component.Auto": [
    "layout.autocomponent"
  ],
  "Ext.grid.property.Store": [],
  "Ext.layout.container.Box": [
    "layout.box"
  ],
  "Ext.rtl.resizer.BorderSplitterTracker": [],
  "Ext.direct.JsonProvider": [
    "direct.jsonprovider"
  ],
  "Ext.tree.Panel": [
    "widget.treepanel"
  ],
  "Ext.data.Model": [],
  "Ext.data.reader.Reader": [],
  "Ext.tab.Tab": [
    "widget.tab"
  ],
  "Ext.button.Button": [
    "widget.button"
  ],
  "Ext.util.Grouper": [],
  "Ext.direct.RemotingProvider": [
    "direct.remotingprovider"
  ],
  "Ext.data.NodeInterface": [],
  "Ext.view.NodeCache": [],
  "Ext.grid.column.Date": [
    "widget.datecolumn"
  ],
  "Ext.form.field.Trigger": [
    "widget.trigger",
    "widget.triggerfield"
  ],
  "Ext.grid.plugin.RowEditing": [
    "plugin.rowediting"
  ],
  "Ext.tip.QuickTip": [
    "widget.quicktip"
  ],
  "Ext.rtl.grid.plugin.HeaderResizer": [],
  "Ext.form.action.Load": [
    "formaction.load"
  ],
  "Ext.form.field.ComboBox": [
    "widget.combo",
    "widget.combobox"
  ],
  "Ext.layout.container.Border": [
    "layout.border"
  ],
  "Ext.rtl.layout.container.Column": [],
  "Ext.data.JsonPStore": [
    "store.jsonp"
  ],
  "Ext.layout.component.field.TextArea": [
    "layout.textareafield"
  ],
  "Ext.layout.container.Container": [
    "layout.container"
  ],
  "Ext.util.Sortable": [],
  "Ext.selection.Model": [],
  "Ext.draw.CompositeSprite": [],
  "Ext.fx.Queue": [],
  "Ext.dd.StatusProxy": [],
  "Ext.form.field.Checkbox": [
    "widget.checkbox",
    "widget.checkboxfield"
  ],
  "Ext.direct.Transaction": [
    "direct.transaction"
  ],
  "Ext.util.Offset": [],
  "Ext.container.Monitor": [],
  "Ext.view.DragZone": [],
  "Ext.util.KeyNav": [],
  "Ext.rtl.dom.Element_static": [],
  "Ext.form.field.File": [
    "widget.filefield",
    "widget.fileuploadfield"
  ],
  "Ext.slider.Single": [
    "widget.slider",
    "widget.sliderfield"
  ],
  "Ext.panel.Proxy": [],
  "Ext.fx.target.Target": [],
  "Ext.ComponentManager": [],
  "Ext.grid.feature.GroupingSummary": [
    "feature.groupingsummary"
  ],
  "Ext.grid.property.HeaderContainer": [],
  "Ext.layout.component.BoundList": [
    "layout.boundlist"
  ],
  "Ext.tab.Bar": [
    "widget.tabbar"
  ],
  "Ext.app.Application": [],
  "Ext.layout.container.Accordion": [
    "layout.accordion"
  ],
  "Ext.ShadowPool": [],
  "Ext.grid.locking.HeaderContainer": [],
  "Ext.resizer.ResizeTracker": [],
  "Ext.panel.Tool": [
    "widget.tool"
  ],
  "Ext.layout.container.boxOverflow.None": [],
  "Ext.grid.CellContext": [],
  "Ext.tree.View": [
    "widget.treeview"
  ],
  "Ext.ElementLoader": [],
  "Ext.grid.ColumnComponentLayout": [
    "layout.columncomponent"
  ],
  "Ext.toolbar.Separator": [
    "widget.tbseparator"
  ],
  "Ext.dd.DragZone": [],
  "Ext.layout.component.FieldSet": [
    "layout.fieldset"
  ],
  "Ext.util.Renderable": [],
  "Ext.util.Bindable": [],
  "Ext.data.SortTypes": [],
  "Ext.rtl.layout.container.HBox": [],
  "Ext.util.Animate": [],
  "Ext.data.flash.BinaryXhr": [],
  "Ext.form.field.Date": [
    "widget.datefield"
  ],
  "Ext.Component": [
    "widget.box",
    "widget.component"
  ],
  "Ext.chart.axis.Axis": [],
  "Ext.menu.DatePicker": [
    "widget.datemenu"
  ],
  "Ext.fx.target.CompositeSprite": [],
  "Ext.rtl.tip.QuickTipManager": [],
  "Ext.form.field.Picker": [
    "widget.pickerfield"
  ],
  "Ext.fx.Animator": [],
  "Ext.Ajax": [],
  "Ext.layout.component.Dock": [
    "layout.dock"
  ],
  "Ext.util.Filter": [],
  "Ext.dd.DragDrop": [],
  "Ext.view.View": [
    "widget.dataview"
  ],
  "Ext.data.association.BelongsTo": [
    "association.belongsto"
  ],
  "Ext.fx.target.Element": [],
  "Ext.draw.Surface": [],
  "Ext.dd.DDProxy": [],
  "Ext.data.AbstractStore": [],
  "Ext.grid.plugin.BufferedRendererTreeView": [],
  "Ext.grid.locking.View": [],
  "Ext.form.action.StandardSubmit": [
    "formaction.standardsubmit"
  ],
  "Ext.dd.Registry": [],
  "Ext.picker.Month": [
    "widget.monthpicker"
  ],
  "Ext.menu.Manager": [],
  "Ext.container.Container": [
    "widget.container"
  ],
  "Ext.rtl.form.field.Spinner": [],
  "Ext.util.KeyMap": [],
  "Ext.data.Batch": [],
  "Ext.resizer.Handle": [],
  "Ext.util.ElementContainer": [],
  "Ext.grid.feature.Grouping": [
    "feature.grouping"
  ],
  "Ext.tab.Panel": [
    "widget.tabpanel"
  ],
  "Ext.rtl.grid.CellEditor": [],
  "Ext.layout.component.Body": [
    "layout.body"
  ],
  "Ext.layout.Context": [],
  "Ext.layout.component.field.ComboBox": [
    "layout.combobox"
  ],
  "Ext.dd.DDTarget": [],
  "Ext.chart.Chart": [
    "widget.chart"
  ],
  "Ext.data.Field": [
    "data.field"
  ],
  "Ext.form.field.FileButton": [
    "widget.filebutton"
  ],
  "Ext.chart.series.Gauge": [
    "series.gauge"
  ],
  "Ext.data.StoreManager": [],
  "Ext.data.IdGenerator": [],
  "Ext.tip.QuickTipManager": [],
  "Ext.grid.plugin.Editing": [
    "editing.editing"
  ],
  "Ext.Queryable": [],
  "Ext.state.LocalStorageProvider": [
    "state.localstorage"
  ],
  "Ext.grid.RowEditor": [
    "widget.roweditor"
  ],
  "Ext.app.EventDomain": [],
  "Ext.form.action.Action": [],
  "Ext.fx.Easing": [],
  "Ext.ProgressBar": [
    "widget.progressbar"
  ],
  "Ext.tree.ViewDragZone": [],
  "Ext.data.reader.Array": [
    "reader.array"
  ],
  "Ext.picker.Date": [
    "widget.datepicker"
  ],
  "Ext.rtl.grid.column.Column": [],
  "Ext.data.proxy.JsonP": [
    "proxy.jsonp",
    "proxy.scripttag"
  ],
  "Ext.chart.series.Area": [
    "series.area"
  ],
  "Ext.fx.Anim": [],
  "Ext.menu.Item": [
    "widget.menuitem"
  ],
  "Ext.rtl.dom.Element_position": [],
  "Ext.chart.Legend": [],
  "Ext.grid.plugin.HeaderReorderer": [
    "plugin.gridheaderreorderer"
  ],
  "Ext.rtl.view.Table": [],
  "Ext.layout.container.VBox": [
    "layout.vbox"
  ],
  "Ext.rtl.util.Floating": [],
  "Ext.view.DropZone": [],
  "Ext.rtl.tree.Column": [],
  "Ext.layout.component.Button": [
    "layout.button"
  ],
  "Ext.form.field.Hidden": [
    "widget.hidden",
    "widget.hiddenfield"
  ],
  "Ext.form.FieldContainer": [
    "widget.fieldcontainer"
  ],
  "Ext.rtl.grid.plugin.RowEditing": [],
  "Ext.data.proxy.Server": [
    "proxy.server"
  ],
  "Ext.chart.series.Cartesian": [],
  "Ext.rtl.layout.component.Dock": [],
  "Ext.grid.column.Column": [
    "widget.gridcolumn"
  ],
  "Ext.data.ResultSet": [],
  "Ext.data.association.HasMany": [
    "association.hasmany"
  ],
  "Ext.layout.container.Fit": [
    "layout.fit"
  ],
  "Ext.util.CSS": [],
  "Ext.rtl.AbstractComponent": [],
  "Ext.layout.component.field.Field": [
    "layout.field"
  ],
  "Ext.data.proxy.Ajax": [
    "proxy.ajax"
  ],
  "Ext.rtl.EventObjectImpl": [],
  "Ext.app.domain.Component": [],
  "Ext.form.Label": [
    "widget.label"
  ],
  "Ext.data.writer.Writer": [
    "writer.base"
  ],
  "Ext.view.BoundListKeyNav": [],
  "Ext.form.FieldSet": [
    "widget.fieldset"
  ],
  "Ext.form.field.VTypes": [],
  "Ext.fx.PropertyHandler": [],
  "Ext.form.CheckboxGroup": [
    "widget.checkboxgroup"
  ],
  "Ext.data.JsonP": [],
  "Ext.draw.engine.Vml": [],
  "Ext.layout.container.CheckboxGroup": [
    "layout.checkboxgroup"
  ],
  "Ext.app.domain.Direct": [],
  "Ext.panel.Header": [
    "widget.header"
  ],
  "Ext.app.Controller": [],
  "Ext.rtl.dom.Layer": [],
  "Ext.grid.plugin.CellEditing": [
    "plugin.cellediting"
  ],
  "Ext.form.field.Time": [
    "widget.timefield"
  ],
  "Ext.fx.CubicBezier": [],
  "Ext.button.Cycle": [
    "widget.cycle"
  ],
  "Ext.app.domain.Global": [],
  "Ext.data.Tree": [
    "data.tree"
  ],
  "Ext.ModelManager": [],
  "Ext.data.XmlStore": [
    "store.xml"
  ],
  "Ext.grid.ViewDropZone": [],
  "Ext.rtl.slider.Multi": [],
  "Ext.grid.header.DropZone": [],
  "Ext.rtl.layout.component.field.Text": [],
  "Ext.util.HashMap": [],
  "Ext.grid.column.Template": [
    "widget.templatecolumn"
  ],
  "Ext.ComponentLoader": [],
  "Ext.form.FieldAncestor": [],
  "Ext.rtl.layout.container.Border": [],
  "Ext.app.domain.Controller": [],
  "Ext.chart.axis.Gauge": [
    "axis.gauge"
  ],
  "Ext.layout.container.border.Region": [],
  "Ext.data.validations": [],
  "Ext.data.Connection": [],
  "Ext.resizer.Splitter": [
    "widget.splitter"
  ],
  "Ext.dd.DropZone": [],
  "Ext.direct.ExceptionEvent": [
    "direct.exception"
  ],
  "Ext.form.RadioManager": [],
  "Ext.data.association.HasOne": [
    "association.hasone"
  ],
  "Ext.draw.Text": [
    "widget.text"
  ],
  "Ext.window.MessageBox": [
    "widget.messagebox"
  ],
  "Ext.fx.target.CompositeElementCSS": [],
  "Ext.rtl.selection.CellModel": [],
  "Ext.rtl.layout.ContextItem": [],
  "Ext.chart.series.Line": [
    "series.line"
  ],
  "Ext.view.Table": [
    "widget.tableview"
  ],
  "Ext.fx.target.CompositeElement": [],
  "Ext.fx.Manager": [],
  "Ext.data.writer.Json": [
    "writer.json"
  ],
  "Ext.chart.Label": [],
  "Ext.grid.View": [
    "widget.gridview"
  ],
  "Ext.Action": [],
  "Ext.form.Basic": [],
  "Ext.rtl.form.field.Checkbox": [],
  "Ext.container.Viewport": [
    "widget.viewport"
  ],
  "Ext.state.Stateful": [],
  "Ext.grid.feature.RowBody": [
    "feature.rowbody"
  ],
  "Ext.form.field.Text": [
    "widget.textfield"
  ],
  "Ext.rtl.layout.component.field.Trigger": [],
  "Ext.data.reader.Xml": [
    "reader.xml"
  ],
  "Ext.grid.feature.AbstractSummary": [
    "feature.abstractsummary"
  ],
  "Ext.chart.axis.Category": [
    "axis.category"
  ],
  "Ext.rtl.layout.container.boxOverflow.Scroller": [],
  "Ext.grid.plugin.BufferedRendererTableView": [],
  "Ext.layout.container.Absolute": [
    "layout.absolute"
  ],
  "Ext.rtl.layout.container.Box": [],
  "Ext.data.reader.Json": [
    "reader.json"
  ],
  "Ext.util.TextMetrics": [],
  "Ext.data.TreeStore": [
    "store.tree"
  ],
  "Ext.view.BoundList": [
    "widget.boundlist"
  ],
  "Ext.form.field.HtmlEditor": [
    "widget.htmleditor"
  ],
  "Ext.layout.container.Form": [
    "layout.form"
  ],
  "Ext.chart.MaskLayer": [],
  "Ext.resizer.BorderSplitterTracker": [],
  "Ext.util.LruCache": [],
  "Ext.tip.Tip": [],
  "Ext.grid.column.CheckColumn": [
    "widget.checkcolumn"
  ],
  "Ext.grid.column.RowNumberer": [
    "widget.rownumberer"
  ],
  "Ext.rtl.resizer.SplitterTracker": [],
  "Ext.grid.feature.RowWrap": [
    "feature.rowwrap"
  ],
  "Ext.data.proxy.Client": [],
  "Ext.data.Types": [],
  "Ext.draw.SpriteDD": [],
  "Ext.layout.container.boxOverflow.Menu": [],
  "Ext.LoadMask": [
    "widget.loadmask"
  ],
  "Ext.rtl.grid.RowEditor": [],
  "Ext.toolbar.Paging": [
    "widget.pagingtoolbar"
  ],
  "Ext.data.association.Association": [],
  "Ext.tree.ViewDropZone": [],
  "Ext.toolbar.Toolbar": [
    "widget.toolbar"
  ],
  "Ext.tip.ToolTip": [
    "widget.tooltip"
  ],
  "Ext.chart.Highlight": [],
  "Ext.state.Manager": [],
  "Ext.util.Inflector": [],
  "Ext.grid.Panel": [
    "widget.grid",
    "widget.gridpanel"
  ],
  "Ext.data.NodeStore": [
    "store.node"
  ],
  "Ext.Shadow": [],
  "Ext.form.action.Submit": [
    "formaction.submit"
  ],
  "Ext.form.Panel": [
    "widget.form"
  ],
  "Ext.chart.series.Series": [],
  "Ext.data.Request": [],
  "Ext.dd.DD": [],
  "Ext.toolbar.Fill": [
    "widget.tbfill"
  ],
  "Ext.data.proxy.WebStorage": [],
  "Ext.util.Floating": [],
  "Ext.form.action.DirectSubmit": [
    "formaction.directsubmit"
  ],
  "Ext.util.Cookies": [],
  "Ext.data.UuidGenerator": [
    "idgen.uuid"
  ],
  "Ext.util.Point": [],
  "Ext.fx.target.Component": [],
  "Ext.form.CheckboxManager": [],
  "Ext.form.field.Field": [],
  "Ext.form.field.Display": [
    "widget.displayfield"
  ],
  "Ext.layout.container.Anchor": [
    "layout.anchor"
  ],
  "Ext.layout.component.field.Text": [
    "layout.textfield"
  ],
  "Ext.data.DirectStore": [
    "store.direct"
  ],
  "Ext.dom.Layer": [],
  "Ext.grid.RowEditorButtons": [
    "widget.roweditorbuttons"
  ],
  "Ext.data.BufferStore": [
    "store.buffer"
  ],
  "Ext.grid.plugin.DivRenderer": [
    "plugin.divrenderer"
  ],
  "Ext.grid.ColumnLayout": [
    "layout.gridcolumn"
  ],
  "Ext.chart.series.Column": [
    "series.column"
  ],
  "Ext.AbstractComponent": [],
  "Ext.flash.Component": [
    "widget.flash"
  ],
  "Ext.form.field.Base": [
    "widget.field"
  ],
  "Ext.grid.feature.GroupStore": [],
  "Ext.data.SequentialIdGenerator": [
    "idgen.sequential"
  ],
  "Ext.grid.header.Container": [
    "widget.headercontainer"
  ],
  "Ext.container.ButtonGroup": [
    "widget.buttongroup"
  ],
  "Ext.data.PageMap": [],
  "Ext.grid.column.Action": [
    "widget.actioncolumn"
  ],
  "Ext.layout.component.field.Trigger": [
    "layout.triggerfield"
  ],
  "Ext.layout.component.field.FieldContainer": [
    "layout.fieldcontainer"
  ],
  "Ext.chart.Shape": [],
  "Ext.panel.DD": [],
  "Ext.container.AbstractContainer": [],
  "Ext.data.ArrayStore": [
    "store.array"
  ],
  "Ext.rtl.layout.container.CheckboxGroup": [],
  "Ext.window.Window": [
    "widget.window"
  ],
  "Ext.picker.Color": [
    "widget.colorpicker"
  ],
  "Ext.grid.feature.Feature": [
    "feature.feature"
  ],
  "Ext.chart.theme.Theme": [],
  "Ext.util.ClickRepeater": [],
  "Ext.form.field.Spinner": [
    "widget.spinnerfield"
  ],
  "Ext.container.DockingContainer": [],
  "Ext.selection.DataViewModel": [],
  "Ext.rtl.selection.TreeModel": [],
  "Ext.dd.DragTracker": [],
  "Ext.data.Group": [],
  "Ext.dd.DragDropManager": [],
  "Ext.selection.CheckboxModel": [
    "selection.checkboxmodel"
  ],
  "Ext.menu.KeyNav": [],
  "Ext.layout.container.Column": [
    "layout.column"
  ],
  "Ext.draw.Matrix": [],
  "Ext.form.field.Number": [
    "widget.numberfield"
  ],
  "Ext.rtl.util.Renderable": [],
  "Ext.data.proxy.Direct": [
    "proxy.direct"
  ],
  "Ext.chart.Navigation": [],
  "Ext.slider.Tip": [
    "widget.slidertip"
  ],
  "Ext.chart.theme.Base": [],
  "Ext.form.field.TextArea": [
    "widget.textarea",
    "widget.textareafield"
  ],
  "Ext.rtl.layout.container.VBox": [],
  "Ext.form.field.Radio": [
    "widget.radio",
    "widget.radiofield"
  ],
  "Ext.layout.component.ProgressBar": [
    "layout.progressbar"
  ],
  "Ext.chart.series.Pie": [
    "series.pie"
  ],
  "Ext.tree.plugin.TreeViewDragDrop": [
    "plugin.treeviewdragdrop"
  ],
  "Ext.direct.Provider": [
    "direct.provider"
  ],
  "Ext.data.TreeModel": [],
  "Ext.layout.Layout": [],
  "Ext.toolbar.TextItem": [
    "widget.tbtext"
  ],
  "Ext.rtl.button.Button": [],
  "Ext.util.AbstractMixedCollection": [],
  "Ext.data.JsonStore": [
    "store.json"
  ],
  "Ext.button.Split": [
    "widget.splitbutton"
  ],
  "Ext.dd.DropTarget": [],
  "Ext.direct.RemotingEvent": [
    "direct.rpc"
  ],
  "Ext.draw.Sprite": [],
  "Ext.fx.target.Sprite": [],
  "Ext.data.proxy.LocalStorage": [
    "proxy.localstorage"
  ],
  "Ext.layout.component.Draw": [
    "layout.draw"
  ],
  "Ext.AbstractPlugin": [],
  "Ext.Editor": [
    "widget.editor"
  ],
  "Ext.chart.axis.Radial": [
    "axis.radial"
  ],
  "Ext.chart.Tip": [],
  "Ext.layout.container.Table": [
    "layout.table"
  ],
  "Ext.chart.axis.Abstract": [],
  "Ext.data.proxy.Rest": [
    "proxy.rest"
  ],
  "Ext.rtl.layout.container.Absolute": [],
  "Ext.util.Queue": [],
  "Ext.state.CookieProvider": [],
  "Ext.Img": [
    "widget.image",
    "widget.imagecomponent"
  ],
  "Ext.dd.DragSource": [],
  "Ext.grid.CellEditor": [],
  "Ext.layout.ClassList": [],
  "Ext.button.Manager": [],
  "Ext.rtl.form.field.File": [],
  "Ext.util.Sorter": [],
  "Ext.resizer.SplitterTracker": [],
  "Ext.panel.Table": [
    "widget.tablepanel"
  ],
  "Ext.draw.Color": [],
  "Ext.chart.series.Bar": [
    "series.bar"
  ],
  "Ext.PluginManager": [],
  "Ext.util.ComponentDragger": [],
  "Ext.chart.series.Scatter": [
    "series.scatter"
  ],
  "Ext.chart.Callout": [],
  "Ext.data.Store": [
    "store.store"
  ],
  "Ext.grid.feature.Summary": [
    "feature.summary"
  ],
  "Ext.util.ProtoElement": [],
  "Ext.layout.component.Component": [],
  "Ext.direct.Manager": [],
  "Ext.data.proxy.Proxy": [
    "proxy.proxy"
  ],
  "Ext.menu.CheckItem": [
    "widget.menucheckitem"
  ],
  "Ext.layout.container.Card": [
    "layout.card"
  ],
  "Ext.draw.Component": [
    "widget.draw"
  ],
  "Ext.toolbar.Item": [
    "widget.tbitem"
  ],
  "Ext.form.RadioGroup": [
    "widget.radiogroup"
  ],
  "Ext.rtl.tab.Bar": [],
  "Ext.rtl.form.field.Trigger": [],
  "Ext.slider.Thumb": [],
  "Ext.grid.header.DragZone": [],
  "Ext.rtl.resizer.ResizeTracker": [],
  "Ext.form.action.DirectLoad": [
    "formaction.directload"
  ],
  "Ext.picker.Time": [
    "widget.timepicker"
  ],
  "Ext.grid.plugin.BufferedRenderer": [
    "plugin.bufferedrenderer"
  ],
  "Ext.resizer.BorderSplitter": [
    "widget.bordersplitter"
  ],
  "Ext.menu.ColorPicker": [
    "widget.colormenu"
  ],
  "Ext.ZIndexManager": [],
  "Ext.menu.Menu": [
    "widget.menu"
  ],
  "Ext.chart.LegendItem": [],
  "Ext.toolbar.Spacer": [
    "widget.tbspacer"
  ],
  "Ext.rtl.dd.DD": [],
  "Ext.panel.Panel": [
    "widget.panel"
  ],
  "Ext.util.Memento": [],
  "Ext.app.domain.Store": [],
  "Ext.data.proxy.Memory": [
    "proxy.memory"
  ],
  "Ext.chart.axis.Time": [
    "axis.time"
  ],
  "Ext.grid.plugin.DragDrop": [
    "plugin.gridviewdragdrop"
  ],
  "Ext.ComponentQuery": [],
  "Ext.draw.engine.SvgExporter": [],
  "Ext.layout.container.Auto": [
    "layout.auto",
    "layout.autocontainer"
  ],
  "Ext.grid.locking.Lockable": [],
  "Ext.view.AbstractView": [],
  "Ext.util.Region": [],
  "Ext.draw.Draw": [],
  "Ext.fx.target.ElementCSS": [],
  "Ext.rtl.panel.Panel": [],
  "Ext.layout.component.field.HtmlEditor": [
    "layout.htmleditor"
  ],
  "Ext.data.proxy.SessionStorage": [
    "proxy.sessionstorage"
  ],
  "Ext.app.EventBus": [],
  "Ext.menu.Separator": [
    "widget.menuseparator"
  ],
  "Ext.util.History": [],
  "Ext.direct.Event": [
    "direct.event"
  ],
  "Ext.direct.RemotingMethod": [],
  "Ext.dd.ScrollManager": [],
  "Ext.chart.Mask": [],
  "Ext.rtl.dom.Element_anim": [],
  "Ext.selection.CellModel": [
    "selection.cellmodel"
  ],
  "Ext.view.TableLayout": [
    "layout.tableview"
  ],
  "Ext.rtl.panel.Header": [],
  "Ext.rtl.dom.Element_scroll": [],
  "Ext.state.Provider": [],
  "Ext.layout.container.Editor": [
    "layout.editor"
  ],
  "Ext.grid.ColumnManager": [],
  "Ext.data.Errors": [],
  "Ext.grid.plugin.RowExpander": [
    "plugin.rowexpander"
  ],
  "Ext.selection.TreeModel": [
    "selection.treemodel"
  ],
  "Ext.form.Labelable": [],
  "Ext.grid.column.Number": [
    "widget.numbercolumn"
  ],
  "Ext.draw.engine.Svg": [],
  "Ext.grid.property.Grid": [
    "widget.propertygrid"
  ],
  "Ext.FocusManager": [],
  "Ext.AbstractManager": [],
  "Ext.chart.series.Radar": [
    "series.radar"
  ],
  "Ext.rtl.dom.Element_insertion": [],
  "Ext.grid.property.Property": [],
  "Ext.chart.TipSurface": [],
  "Ext.layout.SizeModel": [],
  "Ext.grid.column.Boolean": [
    "widget.booleancolumn"
  ],
  "Ext.direct.PollingProvider": [
    "direct.pollingprovider"
  ],
  "Ext.grid.plugin.HeaderResizer": [
    "plugin.gridheaderresizer"
  ],
  "Ext.tree.Column": [
    "widget.treecolumn"
  ],
  "Ext.data.writer.Xml": [
    "writer.xml"
  ],
  "Ext.slider.Multi": [
    "widget.multislider"
  ],
  "Ext.panel.AbstractPanel": [],
  "Ext.layout.component.field.Slider": [
    "layout.sliderfield"
  ],
  "Ext.chart.axis.Numeric": [
    "axis.numeric"
  ],
  "Ext.layout.container.boxOverflow.Scroller": [],
  "Ext.data.Operation": [],
  "Ext.resizer.Resizer": [],
  "Ext.layout.container.HBox": [
    "layout.hbox"
  ],
  "Ext.selection.RowModel": [
    "selection.rowmodel"
  ],
  "Ext.layout.ContextItem": [],
  "Ext.util.MixedCollection": []
});
