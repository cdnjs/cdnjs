(function()
{
    window.Ice = window.Ice || {};
    Ice.Slice = Ice.Slice || {};
    window.IceMX = window.IceMX || {};
    window.IceSSL = window.IceSSL || {};
    var Slice = Ice.Slice;

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var __M =
        {
            module: function(name)
            {
                var m =  window[name];
                if(m === undefined)
                {
                    m = {};
                    window[name] =  m;
                }
                return m;
            },
            require: function(name)
            {
                return window;
            },
            type: function(scoped)
            {
                if(scoped === undefined)
                {
                    return undefined;
                }
                var components = scoped.split(".");
                var T = window;
        
                for(var i = 0, length = components.length; i < length; ++i)
                {
                    T = T[components[i]];
                    if(T === undefined)
                    {
                        return undefined;
                    }
                }
                return T;
            }
        };
        
        
        Ice.__require = function()
        {
            return window;
        };
        
        Ice.Slice = Ice.Slice || {};
        Ice.__M = __M;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
            
        var __M = Ice.__M;
        var Slice = Ice.Slice;
        
        var eq = function(e1, e2)
        {
            if(e1 === e2)
            {
                return true; // If identity compare equals members are equal.
            }
            else if(e1 === null || e1 === undefined || e2 === null || e2 === undefined)
            {
                return false;
            }
            else if(e1.prototype !== e2.prototype)
            {
                return false;
            }
            else if(typeof e1.equals == "function")
            {
                return e1.equals(e2);
            }
            else if(e1 instanceof Array)
            {
                return ArrayUtil.equals(e1, e2, eq);
            }
            return false;
        };
        
        var ArrayUtil =
        {
            clone: function(arr)
            {
                if(arr === undefined)
                {
                    return arr;
                }
                else if(arr === null)
                {
                    return [];
                }
                else
                {
                    return arr.slice();
                }
            },
            equals: function(v1, v2, valuesEqual)
            {        
                if(v1.length != v2.length)
                {
                    return false;
                }
        
                var i, length, equalFn = valuesEqual || eq;
                for(i = 0, length = v1.length; i < length; ++i)
                {
                    if(!equalFn.call(equalFn, v1[i], v2[i]))
                    {
                        return false;
                    }
                }
        
                return true;
            },
            shuffle: function(arr)
            {
                for(var i = arr.length; i > 1; --i)
                {
                    var e = arr[i - 1];
                    var rand = Math.floor(Math.random() * i);
                    arr[i - 1] = arr[rand];
                    arr[rand] = e;
                }
            },
            indexOf: function(arr, elem, equalFn)
            {
                if(equalFn !== undefined && equalFn !== null)
                {
                    for(var i = 0; i < arr.length; ++i)
                    {
                        if(equalFn.call(equalFn, arr[i], elem))
                        {
                            return i;
                        }
                    }
                }
                else
                {
                    return arr.indexOf(elem);
                }
        
                return -1;
            },
            filter: function(arr, includeFn, obj)
            {
                obj = obj === undefined ? includeFn : obj;
                var result = [];
                for(var i = 0; i < arr.length; ++i)
                {
                    if(includeFn.call(obj, arr[i], i, arr))
                    {
                        result.push(arr[i]);
                    }
                }
                return result;
            }
        };
        
        ArrayUtil.eq = eq;
        
        Slice.defineSequence = function(module, name, valueHelper, fixed, elementType)
        {
            var helper = null;
            Object.defineProperty(module, name, 
            {
                get: function()
                    {
                        if(helper === null)
                        {
                            /*jshint -W061 */
                            helper = Ice.StreamHelpers.generateSeqHelper(__M.type(valueHelper), fixed, __M.type(elementType));
                            /*jshint +W061 */
                        }
                        return helper;
                    }
            });
        };
        
        Ice.ArrayUtil = ArrayUtil;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        Ice.Class = function()
        {
            var base;
            var desc;
            var constructor;
            
            if(arguments.length == 1)
            {
                desc = arguments[0];
            }
            else if(arguments.length == 2)
            {
                base = arguments[0];
                desc = arguments[1];
            }
        
            if(desc !== undefined)
            {
                constructor = desc.__init__;
                if(constructor)
                {
                    delete desc.__init__;
                }
            }
            
            var o = constructor || function(){};
        
            if(base !== undefined)
            {
                o.prototype = new base();
                o.prototype.constructor = o;
            }
        
            if(desc !== undefined)
            {
                for(var key in desc)
                {
                    o.prototype[key] = desc[key];
                }
            }
            return o;
        };
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var Class = Ice.Class;
        
        var toString = function(key, object, objectTable, ident)
        {
            ident += "  ";
            if(object === null)
            {
                return "\n" + ident + key + ": (null)";
            }
            if(object === undefined)
            {
                return "\n" + ident + key + ": (undefined)";
            }
            if(key == "stack" || typeof object == "function")
            {
                return "";
            }
            if(typeof object != "object")
            {
                return "\n" + ident + key + ": \"" + object + "\"";
            }
            if(objectTable.indexOf(object) != -1)
            {
                return "\n" + ident + key + ": (recursive)";
            }
            
            objectTable.push(object);
            //
            // For objects use the toString function if one is provided.
            //
            if(typeof object.toString == "function")
            {
                return "\n" + ident + key + ":" + object.toString();
            }
            
            var s = "\n" + ident + key + ":";
            for(var k in object)
            {
                if(key.indexOf("_") === 0)
                {
                    continue;
                }
        
                if(typeof object[k] == "function")
                {
                    continue;
                }
                s += ident + toString(k, object[k], objectTable, ident);
            }
            return s;
        };
        
        //
        // Ice.Exception
        //
        var Exception = Class(Error, {
            __init__: function(cause)
            {
                if(cause)
                {
                    this.ice_cause = cause;
                }
            },
            ice_name: function()
            {
                return "Ice::Exception";
            },
            toString: function()
            {
                var s = this.ice_name();
                for(var key in this)
                {
                    s += toString(key, this[key], [], "");
                }
        
                if(Ice.__printStackTraces === true && this.stack)
                {
                    s += "\n" + this.stack;
                }
                return s;
            }
        });
        
        Exception.captureStackTrace = function(object)
        {
            var stack = new Error().stack;
            //
            // In IE 10 and greater the stack will be filled once the Error is throw
            // we don't need to do anything.
            //
            if(stack !== undefined)
            {
                Object.defineProperty(object, "stack", {
                    get: function(){
                        return stack;
                    }
                });
            }
        };
        
        Ice.Exception = Exception;
        
        //
        // Ice.LocalException
        //
        var LocalException = Class(Exception, {
            __init__: function(cause)
            {
                Exception.call(this, cause);
                Exception.captureStackTrace(this);
            },
            ice_name: function()
            {
                return "Ice::LocalException";
            }
        });
        
        Ice.LocalException = LocalException;
        
        var Slice = Ice.Slice;
        Slice.defineLocalException = function(constructor, base, name)
        {
            var ex = constructor;
            ex.prototype = new base();
            ex.prototype.constructor = ex;
            ex.prototype.ice_name = function()
            {
                return name;
            };
            return ex;
        };
        
        //
        // Ice.UserException
        //
        var UserException = Class(Exception, {
            __init__: function(cause)
            {
                Exception.call(this, cause);
                Exception.captureStackTrace(this);
            },
            ice_name: function()
            {
                return "Ice::UserException";
            },
            __write: function(os)
            {
                os.startWriteException(null);
                __writeImpl(this, os, this.__mostDerivedType());
                os.endWriteException();
            },
            __read: function(is)
            {
                is.startReadException();
                __readImpl(this, is, this.__mostDerivedType());
                is.endReadException(false);
            },
            __usesClasses: function()
            {
                return false;
            }
        });
        Ice.UserException = UserException;
        
        //
        // Private methods
        //
        
        var __writeImpl = function(obj, os, type)
        {
            //
            // The __writeImpl method is a recursive method that goes down the
            // class hierarchy to marshal each slice of the class using the
            // generated __writeMemberImpl method.
            //
        
            if(type === undefined || type === UserException)
            {
                return; // Don't marshal anything for Ice.UserException
            }
        
            os.startWriteSlice(type.__id, -1, type.__parent === UserException);
            if(type.prototype.__writeMemberImpl)
            {
                type.prototype.__writeMemberImpl.call(obj, os);
            }
            os.endWriteSlice();
            __writeImpl(obj, os, type.__parent);
        };
        
        var __readImpl = function(obj, is, type)
        {
            //
            // The __readImpl method is a recursive method that goes down the
            // class hierarchy to marshal each slice of the class using the
            // generated __readMemberImpl method.
            //
        
            if(type === undefined || type === UserException)
            {
                return; // Don't marshal anything for UserException
            }
        
            is.startReadSlice();
            if(type.prototype.__readMemberImpl)
            {
                type.prototype.__readMemberImpl.call(obj, is);
            }
            is.endReadSlice();
            __readImpl(obj, is, type.__parent);
        };
        
        var __writePreserved = function(os)
        {
            //
            // For Slice exceptions which are marked "preserved", the implementation of this method
            // replaces the Ice.Object.prototype.__write method.
            //
            os.startWriteException(this.__slicedData);
            __writeImpl(this, os, this.__mostDerivedType());
            os.endWriteException();
        };
        
        var __readPreserved = function(is)
        {
            //
            // For Slice exceptions which are marked "preserved", the implementation of this method
            // replaces the Ice.Object.prototype.__read method.
            //
            is.startReadException();
            __readImpl(this, is, this.__mostDerivedType());
            this.__slicedData = is.endReadException(true);
        };
        
        Slice.defineUserException = function(constructor, base, name, writeImpl, readImpl, preserved, usesClasses)
        {
            var ex = constructor;
            ex.__parent = base;
            ex.prototype = new base();
            ex.__id = "::" + name;
            ex.prototype.ice_name = function()
            {
                return name;
            };
        
            ex.prototype.constructor = ex;
            ex.prototype.__mostDerivedType = function() { return ex; };
            if(preserved)
            {
                ex.prototype.__write = __writePreserved;
                ex.prototype.__read = __readPreserved;
            }
            ex.prototype.__writeMemberImpl = writeImpl;
            ex.prototype.__readMemberImpl = readImpl;
        
            if(usesClasses)
            {
                ex.prototype.__usesClasses = function()
                {
                    return true;
                };
            }
        
            return ex;
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        Ice.AsyncStatus = {Queued: 0, Sent: 1};
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        //
        // The Long type represents a signed 64-bit integer as two 32-bit values
        // corresponding to the high and low words.
        //
        
        var Long = Ice.Class({
            __init__: function(high, low)
            {
                if(low < 0 || low > Long.MAX_UINT32)
                {
                    throw new RangeError("Low word must be between 0 and 0xFFFFFFFF");
                }
                if(high < 0 || high > Long.MAX_UINT32)
                {
                    throw new RangeError("High word must be between 0 and 0xFFFFFFFF");
                }
                
                this.high = high;
                this.low = low;
            },
            hashCode: function()
            {
                return this.low;
            },
            equals: function(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
                if(!(rhs instanceof Long))
                {
                    return false;
                }
                return this.high === rhs.high && this.low === rhs.low;
            },
            toString: function()
            {
                return this.high + ":" + this.low;
            },
            toNumber: function()
            {
        
                if((this.high & Long.SIGN_MASK) !== 0)
                {
                    if(this.high === Long.MAX_UINT32 && this.low !== 0)
                    {
                        return -(~this.low + 1);
                    }
         
                    var high = ~this.high + 1;
        
                    if(high > Long.HIGH_MAX)
                    {
                        return Number.NEGATIVE_INFINITY;
                    }
        
                    return -1 * (high * Long.HIGH_MASK) + this.low;
                }
                else
                {
                    if(this.high > Long.HIGH_MAX)
                    {
                        return Number.POSITIVE_INFINITY;
                    }
                    return (this.high * Long.HIGH_MASK) + this.low;
                }
            }
        });
        
        //
        // 2^32
        // 
        Long.MAX_UINT32 = 0xFFFFFFFF;
        
        //
        // (high & SIGN_MASK) != 0 denotes a negative number;
        // that is, the most significant bit is set.
        //
        Long.SIGN_MASK = 0x80000000;
        
        //
        // When converting to a JavaScript Number we left shift the
        // high word by 32 bits. As that isn't possible using JavaScript's
        // left shift operator, we multiply the value by 2^32 which will
        // produce the same result.
        //
        Long.HIGH_MASK = 0x100000000;
        
        //
        // The maximum value for the high word when coverting to
        // a JavaScript Number is 2^21 - 1, in which case all
        // 53 bits are used.
        //
        Long.HIGH_MAX = 0x1FFFFF;
        
        Ice.Long = Long;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        Ice.AssertionFailedException = Ice.Class(Error, 
            {
                __init__: function(message)
                {
                    Error.call(this);
                    Ice.Exception.captureStackTrace(this);
                    this.message = message;
                }
            });
        
        Ice.Debug =
        {
            assert: function(b, msg)
            {
                if(!b)
                {
                    console.log(msg === undefined ? "assertion failed" : msg);
                    console.log(Error().stack);
                    throw new Ice.AssertionFailedException(msg === undefined ? "assertion failed" : msg);
                }
            }
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        Ice.DispatchStatus = {DispatchOK: 0, DispatchUserException: 1, DispatchAsync: 2};
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        //
        // Ice.EnumBase
        //
        var EnumBase = Ice.Class({
            __init__: function(name, value)
            {
                this._name = name;
                this._value = value;
            },
            equals: function(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
        
                var proto = Object.getPrototypeOf(this);
                if(!(rhs instanceof proto.constructor))
                {
                    return false;
                }
        
                return this._value == rhs._value;
            },
            hashCode: function()
            {
                return this._value;
            },
            toString: function()
            {
                return this._name;
            }
        });
        Ice.EnumBase = EnumBase;
        
        var prototype = EnumBase.prototype;
        
        Object.defineProperty(prototype, 'name', {
            enumerable: true,
            get: function() { return this._name; }
        });
        
        Object.defineProperty(prototype, 'value', {
            enumerable: true,
            get: function() { return this._value; }
        });
        
        var EnumHelper = Ice.Class({
            __init__: function(enumType)
            {
                this._enumType = enumType;
            },
            write: function(os, v)
            {
                this._enumType.__write(os, v);
            },
            writeOpt: function(os, tag, v)
            {
                this._enumType.__writeOpt(os, tag, v);
            },
            read: function(is)
            {
                return this._enumType.__read(is);
            },
            readOpt: function(is, tag)
            {
                return this._enumType.__readOpt(is, tag);
            }
        });
        
        Ice.EnumHelper = EnumHelper;
        
        var Slice = Ice.Slice;
        Slice.defineEnum = function(enumerators)
        {
            var type = function(n, v)
            {
                EnumBase.call(this, n, v);
            };
        
            type.prototype = new EnumBase();
            type.prototype.constructor = type;
        
            var enums = [];
            var maxValue = 0;
            var firstEnum = null;
            for(var idx in enumerators)
            {
                var e = enumerators[idx][0], value = enumerators[idx][1];
                var enumerator = new type(e, value);
                enums[value] = enumerator;
                if(!firstEnum)
                {
                    firstEnum = enumerator;
                }
                Object.defineProperty(type, e, {
                    enumerable: true,
                    value: enumerator
                });
                if(value > maxValue)
                {
                    maxValue = value;
                }
            }
        
            Object.defineProperty(type, "minWireSize", {
                get: function(){ return 1; }
            });
        
            type.__write = function(os, v)
            {
                if(v)
                {
                    os.writeEnum(v);
                }
                else
                {
                    os.writeEnum(firstEnum);
                }
            };
            type.__read = function(is)
            {
                return is.readEnum(type);
            };
            type.__writeOpt = function(os, tag, v)
            {
                if(v !== undefined)
                {
                    if(os.writeOpt(tag, Ice.OptionalFormat.Size))
                    {
                        type.__write(os, v);
                    }
                }
            };
            type.__readOpt = function(is, tag)
            {
                return is.readOptEnum(tag, type);
            };
        
            type.__helper = new EnumHelper(type);
        
            Object.defineProperty(type, 'valueOf', {
                value: function(v) {
                    if(v === undefined)
                    {
                        return type;
                    }
                    return enums[v];
                }
            });
        
            Object.defineProperty(type, 'maxValue', {
                value: maxValue
            });
        
            Object.defineProperty(type.prototype, 'maxValue', {
                value: maxValue
            });
        
            return type;
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        function generateUUID()
        {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
            return uuid;
        }
        
        Ice.generateUUID = generateUUID;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        Ice.FormatType  = Ice.Slice.defineEnum([['DefaultFormat', 0], ['CompactFormat',1], ['SlicedFormat',2]]);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var Debug = Ice.Debug;
        
        Ice.StringUtil =
        {
            //
            // Return the index of the first character in str to
            // appear in match, starting from start. Returns -1 if none is
            // found.
            //
            findFirstOf: function(str, match, start)
            {
                start = start === undefined ? 0 : start;
        
                var len = str.length;
                for(var i = start; i < len; i++)
                {
                    var ch = str.charAt(i);
                    if(match.indexOf(ch) != -1)
                    {
                        return i;
                    }
                }
        
                return -1;
            },
            //
            // Return the index of the first character in str which does
            // not appear in match, starting from start. Returns -1 if none is
            // found.
            //
            findFirstNotOf: function(str, match, start)
            {
                start = start === undefined ? 0 : start;
        
                var len = str.length;
                for(var i = start; i < len; i++)
                {
                    var ch = str.charAt(i);
                    if(match.indexOf(ch) == -1)
                    {
                        return i;
                    }
                }
        
                return -1;
            },
            //
            // Add escape sequences (such as "\n", or "\007") to make a string
            // readable in ASCII. Any characters that appear in special are
            // prefixed with a backlash in the returned string.
            //
            escapeString: function(s, special)
            {
                special = special === undefined ? null : special;
        
                var i, length;
                if(special !== null)
                {
                    for(i = 0, length = special.length; i < length; ++i)
                    {
                        if(special.charCodeAt(i) < 32 || special.charCodeAt(i) > 126)
                        {
                            throw new Error("special characters must be in ASCII range 32-126");
                        }
                    }
                }
        
                var result = [], c;
                for(i = 0, length = s.length; i < length; ++i)
                {
                    c = s.charCodeAt(i);
                    if(c < 128)
                    {
                        encodeChar(c, result, special);
                    }
                    else if(c > 127 && c < 2048)
                    {
                        encodeChar((c >> 6) | 192, result, special);
                        encodeChar((c & 63) | 128, result, special);
                    }
                    else
                    {
                        encodeChar((c >> 12) | 224, result, special);
                        encodeChar(((c >> 6) & 63) | 128, result, special);
                        encodeChar((c & 63) | 128, result, special);
                    }
                }
        
                return result.join("");
            },
            //
            // Remove escape sequences added by escapeString. Throws Error
            // for an invalid input string.
            //
            unescapeString: function(s, start, end)
            {
                start = start === undefined ? 0 : start;
                end = end === undefined ? s.length : end;
        
                Debug.assert(start >= 0 && start <= end && end <= s.length);
        
                var arr = [];
                decodeString(s, start, end, arr);
        
                return arr.join("");
            },
            //
            // Split string helper; returns null for unmatched quotes
            //
            splitString: function(str, delim)
            {
                var v = [];
                var s = "";
                var pos = 0;
        
                var quoteChar = null;
                while(pos < str.length)
                {
                    if(quoteChar === null && (str.charAt(pos) === '"' || str.charAt(pos) === '\''))
                    {
                        quoteChar = str.charAt(pos++);
                        continue; // Skip the quote.
                    }
                    else if(quoteChar === null && str.charAt(pos) === '\\' && pos + 1 < str.length &&
                            (str.charAt(pos + 1) === '"' || str.charAt(pos + 1) === '\''))
                    {
                        ++pos; // Skip the backslash
                    }
                    else if(quoteChar !== null && str.charAt(pos) === '\\' && pos + 1 < str.length &&
                            str.charAt(pos + 1) === quoteChar)
                    {
                        ++pos; // Skip the backslash
                    }
                    else if(quoteChar !== null && str.charAt(pos) === quoteChar)
                    {
                        ++pos;
                        quoteChar = null;
                        continue; // Skip the quote.
                    }
                    else if(delim.indexOf(str.charAt(pos)) !== -1)
                    {
                        if(quoteChar === null)
                        {
                            ++pos;
                            if(s.length > 0)
                            {
                                v.push(s);
                                s = "";
                            }
                            continue;
                        }
                    }
        
                    if(pos < str.length)
                    {
                        s += str.charAt(pos++);
                    }
                }
        
                if(s.length > 0)
                {
                    v.push(s);
                }
                if(quoteChar !== null)
                {
                    return null; // Unmatched quote.
                }
        
                return v;
            },
            //
            // If a single or double quotation mark is found at the start position,
            // then the position of the matching closing quote is returned. If no
            // quotation mark is found at the start position, then 0 is returned.
            // If no matching closing quote is found, then -1 is returned.
            //
            checkQuote: function(s, start)
            {
                start = start === undefined ? 0 : start;
        
                var quoteChar = s.charAt(start);
                if(quoteChar == '"' || quoteChar == '\'')
                {
                    start++;
                    var len = s.length;
                    var pos;
                    while(start < len && (pos = s.indexOf(quoteChar, start)) != -1)
                    {
                        if(s.charAt(pos - 1) != '\\')
                        {
                            return pos;
                        }
                        start = pos + 1;
                    }
                    return -1; // Unmatched quote
                }
                return 0; // Not quoted
            },
            hashCode: function(s)
            {
                var hash = 0;
                var n = s.length;
        
                for(var i = 0; i < n; i++)
                {
                    hash = 31 * hash + s.charCodeAt(i);
                }
        
                return hash;
            },
            toInt: function(s)
            {
                var n = parseInt(s, 10);
                if(isNaN(n))
                {
                    throw new Error("conversion of `" + s + "' to int failed");
                }
                return n;
            }
        };
        
        //
        // Write the byte b as an escape sequence if it isn't a printable ASCII
        // character and append the escape sequence to sb. Additional characters
        // that should be escaped can be passed in special. If b is any of these
        // characters, b is preceded by a backslash in sb.
        //
        function encodeChar(b, sb, special)
        {
            switch(b)
            {
                case 92: // '\\'
                {
                    sb.push("\\\\");
                    break;
                }
                case 39: // '\''
                {
                    sb.push("\\'");
                    break;
                }
                case 34: // '"'
                {
                    sb.push("\\\"");
                    break;
                }
                case 8: // '\b'
                {
                    sb.push("\\b");
                    break;
                }
                case 12: // '\f'
                {
                    sb.push("\\f");
                    break;
                }
                case 10: // '\n'
                {
                    sb.push("\\n");
                    break;
                }
                case 13: // '\r'
                {
                    sb.push("\\r");
                    break;
                }
                case 9: // '\t'
                {
                    sb.push("\\t");
                    break;
                }
                default:
                {
                    if(!(b >= 32 && b <= 126))
                    {
                        sb.push('\\');
                        var octal = b.toString(8);
                        //
                        // Add leading zeroes so that we avoid problems during
                        // decoding. For example, consider the encoded string
                        // \0013 (i.e., a character with value 1 followed by
                        // the character '3'). If the leading zeroes were omitted,
                        // the result would be incorrectly interpreted by the
                        // decoder as a single character with value 11.
                        //
                        for(var j = octal.length; j < 3; j++)
                        {
                            sb.push('0');
                        }
                        sb.push(octal);
                    }
                    else
                    {
                        var c = String.fromCharCode(b);
                        if(special !== null && special.indexOf(c) !== -1)
                        {
                            sb.push('\\');
                            sb.push(c);
                        }
                        else
                        {
                            sb.push(c);
                        }
                    }
                }
            }
        }
        function checkChar(s, pos)
        {
            var n = s.charCodeAt(pos);
            if(!(n >= 32 && n <= 126))
            {
                var msg;
                if(pos > 0)
                {
                    msg = "character after `" + s.substring(0, pos) + "'";
                }
                else
                {
                    msg = "first character";
                }
                msg += " is not a printable ASCII character (ordinal " + n + ")";
                throw new Error(msg);
            }
            return n;
        }
        
        //
        // Decode the character or escape sequence starting at start and return it.
        // nextStart is set to the index of the first character following the decoded
        // character or escape sequence.
        //
        function decodeChar(s, start, end, nextStart)
        {
            Debug.assert(start >= 0);
            Debug.assert(end <= s.length);
        
            if(start >= end)
            {
                throw new Error("EOF while decoding string");
            }
        
            var c;
        
            if(s.charAt(start) != '\\')
            {
                c = checkChar(s, start++);
            }
            else
            {
                if(start + 1 == end)
                {
                    throw new Error("trailing backslash");
                }
                switch(s.charAt(++start))
                {
                    case '\\':
                    case '\'':
                    case '"':
                    {
                        c = s.charCodeAt(start++);
                        break;
                    }
                    case 'b':
                    {
                        ++start;
                        c = "\b".charCodeAt(0);
                        break;
                    }
                    case 'f':
                    {
                        ++start;
                        c = "\f".charCodeAt(0);
                        break;
                    }
                    case 'n':
                    {
                        ++start;
                        c = "\n".charCodeAt(0);
                        break;
                    }
                    case 'r':
                    {
                        ++start;
                        c = "\r".charCodeAt(0);
                        break;
                    }
                    case 't':
                    {
                        ++start;
                        c = "\t".charCodeAt(0);
                        break;
                    }
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    {
                        var octalChars = "01234567";
                        var val = 0;
                        for(var j = 0; j < 3 && start < end; ++j)
                        {
                            var ch = s.charAt(start++);
                            if(octalChars.indexOf(ch) == -1)
                            {
                                --start;
                                break;
                            }
                            val = val * 8 + parseInt(ch);
                        }
                        if(val > 255)
                        {
                            var msg = "octal value \\" + val.toString(8) + " (" + val + ") is out of range";
                            throw new Error(msg);
                        }
                        c = val;
                        break;
                    }
                    default:
                    {
                        c = checkChar(s, start++);
                        break;
                    }
                }
            }
            nextStart.value = start;
            return c;
        }
        
        //
        // Remove escape sequences from s and append the result to sb.
        // Return true if successful, false otherwise.
        //
        function decodeString(s, start, end, arr)
        {
            var nextStart = { 'value': 0 }, c, c2, c3;
            while(start < end)
            {
                c = decodeChar(s, start, end, nextStart);
                start = nextStart.value;
        
                if(c < 128)
                {
                    arr.push(String.fromCharCode(c));
                }
                else if(c > 191 && c < 224)
                {
                    c2 = decodeChar(s, start, end, nextStart);
                    start = nextStart.value;
                    arr.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
                }
                else
                {
                    c2 = decodeChar(s, start, end, nextStart);
                    start = nextStart.value;
                    c3 = decodeChar(s, start, end, nextStart);
                    start = nextStart.value;
                    arr.push(String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
                }
            }
        }
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var __M = Ice.__M;
        var StringUtil = Ice.StringUtil;
        
        function setInternal(map, key, value, hash, index)
        {
            //
            // Search for an entry with the same key.
            //
            for(var e = map._table[index]; e !== null; e = e._nextInBucket)
            {
                if(e._hash === hash && map.keysEqual(key, e._key))
                {
                    //
                    // Found a match, update the value.
                    //
                    e._value = value;
                    return undefined;
                }
            }
        
            //
            // No match found, add a new entry.
            //
            map.add(key, value, hash, index);
            return undefined;
        }
        
        function compareEquals(v1, v2)
        {
            if(v1 === v2)
            {
                return true;
            }
            if(v1 === undefined || v1 === null || v2 === undefined || v2 === null)
            {
                return false;
            }
            return v1.equals(v2);
        }
        
        function compareIdentity(v1, v2)
        {
            return v1 === v2;
        }
        
        var HashMap = Ice.Class({
            __init__: function(arg1, arg2)
            {
                //
                // The first argument can be a HashMap or the keyComparator, the second
                // argument if present is always the value comparator.
                // 
                var args = arguments;
        
                var h, keyComparator, valueComparator;
        
                if(typeof arg1 == "function")
                {
                    keyComparator = arg1;
                    valueComparator = arg2;
                }
                else if(arg1 instanceof HashMap)
                {
                    h = arg1;
                    keyComparator = h.keyComparator;
                    valueComparator = h.valueComparator;
                }
        
                this._size = 0;
                this._head = null;
                this._initialCapacity = 32;
                this._loadFactor = 0.75;
                this._table = [];
        
                this._keyComparator = (typeof keyComparator == "function") ? keyComparator : compareIdentity;
                this._valueComparator = (typeof valueComparator == "function") ? valueComparator : compareIdentity;
        
                var i, length;
                if(h instanceof HashMap && h._size > 0)
                {
                    this._threshold = h._threshold;
                    length = h._table.length;
                    this._table.length = length;
                    for(i = 0; i < length; i++)
                    {
                        this._table[i] = null;
                    }
                    this.merge(h);
                }
                else
                {
                    this._threshold = this._initialCapacity * this._loadFactor;
                    for(i = 0; i < this._initialCapacity; i++)
                    {
                        this._table[i] = null;
                    }
                }
            },
            set: function(key, value)
            {
                var r = this.computeHash(key); // Returns an object with key,hash members.
        
                var index = this.hashIndex(r.hash, this._table.length);
        
                return setInternal(this, r.key, value, r.hash, index);
            },
            get: function(key)
            {
                var r = this.computeHash(key); // Returns an object with key,hash members.
                var e = this.findEntry(r.key, r.hash);
                return e !== undefined ? e._value : undefined;
            },
            has: function(key)
            {
                var r = this.computeHash(key); // Returns an object with key,hash members.
                return this.findEntry(r.key, r.hash) !== undefined;
            },
            delete: function(key)
            {
                var r = this.computeHash(key); // Returns an object with key,hash members.
        
                var index = this.hashIndex(r.hash, this._table.length);
        
                //
                // Search for an entry with the same key.
                //
                var prev = null;
                for(var e = this._table[index]; e !== null; e = e._nextInBucket)
                {
                    if(e._hash === r.hash && this.keysEqual(r.key, e._key))
                    {
                        //
                        // Found a match.
                        //
                        this._size--;
        
                        //
                        // Remove from bucket.
                        //
                        if(prev !== null)
                        {
                            prev._nextInBucket = e._nextInBucket;
                        }
                        else
                        {
                            this._table[index] = e._nextInBucket;
                        }
        
                        //
                        // Unlink the entry.
                        //
                        if(e._prev !== null)
                        {
                            e._prev._next = e._next;
                        }
                        if(e._next !== null)
                        {
                            e._next._prev = e._prev;
                        }
        
                        if(this._head === e)
                        {
                            this._head = e._next;
                        }
        
                        return e._value;
                    }
        
                    prev = e;
                }
        
                return undefined;
            },
            clear: function()
            {
                for(var i = 0; i < this._table.length; ++i)
                {
                    this._table[i] = null;
                }
                this._head = null;
                this._size = 0;
            },
            forEach: function(fn, obj)
            {
                obj = obj === undefined ? fn : obj;
                for(var e = this._head; e !== null; e = e._next)
                {
                    fn.call(obj, e._key, e._value);
                }
            },
            keys: function()
            {
                var k = [];
                var i = 0;
                for(var e = this._head; e !== null; e = e._next)
                {
                    k[i++] = e._key;
                }
                return k;
            },
            values: function()
            {
                var v = [];
                var i = 0;
                for(var e = this._head; e !== null; e = e._next)
                {
                    v[i++] = e._value;
                }
                return v;
            },
            equals: function(other, valuesEqual)
            {
                if(other === null || !(other instanceof HashMap) || this._size !== other._size)
                {
                    return false;
                }
        
                var self = this;
                var eq = valuesEqual || function(v1, v2)
                    {
                        return self._valueComparator.call(self._valueComparator, v1, v2);
                    };
                
                for(var e = this._head; e !== null; e = e._next)
                {
                    var oe = other.findEntry(e._key, e._hash);
                    if(oe === undefined || !eq(e._value, oe._value))
                    {
                        return false;
                    }
                }
        
                return true;
            },
            clone: function()
            {
                return new HashMap(this);
            },
            merge: function(from)
            {
                for(var e = from._head; e !== null; e = e._next)
                {
                    setInternal(this, e._key, e._value, e._hash, this.hashIndex(e._hash, this._table.length));
                }
            },
            add: function(key, value, hash, index)
            {
                //
                // Create a new table entry.
                //
                var e = Object.create(null, {
                    "key": {
                        enumerable: true,
                        get: function() { return this._key; }
                    },
                    "value": {
                        enumerable: true,
                        get: function() { return this._value; }
                    },
                    "next": {
                        enumerable: true,
                        get: function() { return this._next; }
                    },
                    "_key": {
                        enumerable: false,
                        writable: true,
                        value: key
                    },
                    "_value": {
                        enumerable: false,
                        writable: true,
                        value: value
                    },
                    "_prev": {
                        enumerable: false,
                        writable: true,
                        value: null
                    },
                    "_next": {
                        enumerable: false,
                        writable: true,
                        value: null
                    },
                    "_nextInBucket": {
                        enumerable: false,
                        writable: true,
                        value: null
                    },
                    "_hash": {
                        enumerable: false,
                        writable: true,
                        value: hash
                    }
                });
                e._nextInBucket = this._table[index];
                this._table[index] = e;
        
                e._next = this._head;
                if(this._head !== null)
                {
                    this._head._prev = e;
                }
                this._head = e;
        
                this._size++;
                if(this._size >= this._threshold)
                {
                    this.resize(this._table.length * 2);
                }
            },
            resize: function(capacity)
            {
                var oldTable = this._table;
        
                var newTable = [];
                for(var i = 0; i < capacity; i++)
                {
                    newTable[i] = null;
                }
        
                //
                // Re-assign all entries to buckets.
                //
                for(var e = this._head; e !== null; e = e._next)
                {
                    var index = this.hashIndex(e._hash, capacity);
                    e._nextInBucket = newTable[index];
                    newTable[index] = e;
                }
        
                this._table = newTable;
                this._threshold = (capacity * this._loadFactor);
            },
            findEntry: function(key, hash)
            {
                var index = this.hashIndex(hash, this._table.length);
                //
                // Search for an entry with the same key.
                //
                for(var e = this._table[index]; e !== null; e = e._nextInBucket)
                {
                    if(e._hash === hash && this.keysEqual(key, e._key))
                    {
                        return e;
                    }
                }
        
                return undefined;
            },
            hashIndex: function(hash, len)
            {
                return hash & (len - 1);
            },
            computeHash: function(v)
            {
                var uuid;
                if(v === 0 || v === -0)
                {
                    return {key:0, hash:0};
                }
        
                if(v === null)
                {
                    if(HashMap._null === null)
                    {
                        uuid = Ice.generateUUID();
                        HashMap._null = {key:uuid, hash:StringUtil.hashCode(uuid)};
                    }
                    return HashMap._null;
                }
        
                if(v === undefined)
                {
                    throw new Error("cannot compute hash for undefined value");
                }
        
                if(typeof(v.hashCode) === "function")
                {
                    return {key:v, hash:v.hashCode()};
                }
        
                var type = typeof(v);
                if(type === "string" || v instanceof String)
                {
                    return {key:v, hash:StringUtil.hashCode(v)};
                }
                else if(type === "number" || v instanceof Number)
                {
                    if(isNaN(v))
                    {
                        if(HashMap._nan === null)
                        {
                            uuid = Ice.generateUUID();
                            HashMap._nan = {key:uuid, hash:StringUtil.hashCode(uuid)};
                        }
                        return HashMap._nan;
                    }
                    return {key:v, hash:v.toFixed(0)};
                }
                else if(type === "boolean" || v instanceof Boolean)
                {
                    return {key:v, hash:v ? 1 : 0};
                }
        
                throw new Error("cannot compute hash for value of type " + type);
            },
            keysEqual: function(k1, k2)
            {
                return this._keyComparator.call(this._keyComparator, k1, k2);
            }
        });
        Ice.HashMap = HashMap;
        
        HashMap.compareEquals = compareEquals;
        HashMap.compareIdentity = compareIdentity;
        HashMap._null = null;
        HashMap._nan = null;
        
        var prototype = HashMap.prototype;
        
        Object.defineProperty(prototype, "size", {
            get: function() { return this._size; }
        });
        
        Object.defineProperty(prototype, "entries", {
            get: function() { return this._head; }
        });
        
        var Slice = Ice.Slice;
        Slice.defineDictionary = function(module, name, helperName, keyHelper, valueHelper, fixed, keysEqual, valueType, valuesEqual)
        {
            if(keysEqual !== undefined || valuesEqual !== undefined)
            {
                //
                // Define a constructor function for a dictionary whose key type requires
                // comparison using an equals() method instead of the native comparison
                // operators.
                //
                module[name] = function(h)
                {
                    return new HashMap(h || keysEqual, valuesEqual);
                };
            }
            else
            {
                module[name] = HashMap;
            }
        
            var helper = null;
            Object.defineProperty(module, helperName,
            {
                get: function()
                    {
                        if(helper === null)
                        {
                            /*jshint -W061 */
                            helper = Ice.StreamHelpers.generateDictHelper(__M.type(keyHelper), __M.type(valueHelper), fixed, 
                                                                          __M.type(valueType), module[name]);
                            /*jshint +W061 */
                        }
                        return helper;
                    }
            });
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        Ice.OptionalFormat = Ice.Slice.defineEnum([['F1', 0], ['F2', 1], ['F4', 2], ['F8', 3], ['Size', 4], ['VSize', 5], ['FSize', 6], ['Class', 7]]);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Class = Ice.Class;
        var defineProperty = Object.defineProperty;
        var HashMap = Ice.HashMap;
        var OptionalFormat = Ice.OptionalFormat;
        
        var StreamHelpers = {};
        
        StreamHelpers.FSizeOptHelper = function()
        {
            this.writeOpt = function(os, tag, v)
            {
                if(v !== undefined && os.writeOpt(tag, OptionalFormat.FSize))
                {
                    var pos = os.startSize();
                    this.write(os, v);
                    os.endSize(pos);
                }
            };
        
            this.readOpt = function(is, tag)
            {
                var v;
                if(is.readOpt(tag, OptionalFormat.FSize))
                {
                    is.skip(4);
                    v = this.read(is);
                }
                return v;
            };
        };
        
        StreamHelpers.VSizeOptHelper = function()
        {
            this.writeOpt = function(os, tag, v)
            {
                if(v !== undefined && os.writeOpt(tag, OptionalFormat.VSize))
                {
                    os.writeSize(this.minWireSize);
                    this.write(os, v);
                }
            };
        
            this.readOpt = function(is, tag)
            {
                var v;
                if(is.readOpt(tag, OptionalFormat.VSize))
                {
                    is.skipSize();
                    v = this.read(is);
                }
                return v;
            };
        };
        
        StreamHelpers.VSizeContainerOptHelper = function(elementSize)
        {
            this.writeOpt = function(os, tag, v)
            {
                if(v !== undefined && os.writeOpt(tag, OptionalFormat.VSize))
                {
                    var sz = this.size(v);
                    os.writeSize(sz > 254 ? sz * elementSize + 5 : sz * elementSize + 1);
                    this.write(os, v);
                }
            };
        
            this.readOpt = function(is, tag)
            {
                var v;
                if(is.readOpt(tag, OptionalFormat.VSize))
                {
                    is.skipSize();
                    v = this.read(is);
                }
                return v;
            };
        };
        
        StreamHelpers.VSizeContainer1OptHelper = function()
        {
            this.writeOpt = function(os, tag, v)
            {
                if(v !== undefined && os.writeOpt(tag, OptionalFormat.VSize))
                {
                    this.write(os, v);
                }
            };
        
            this.readOpt = function(is, tag)
            {
                var v;
                if(is.readOpt(tag, OptionalFormat.VSize))
                {
                    v = this.read(is);
                }
                return v;
            };
        };
        
        //
        // Sequence helper to write sequences
        //
        var SequenceHelper = Class({
            write: function(os, v)
            {
                if(v === null || v.length === 0)
                {
                    os.writeSize(0);
                }
                else
                {
                    var helper = this.elementHelper;
                    os.writeSize(v.length);
                    for(var i = 0; i < v.length; ++i)
                    {
                        helper.write(os, v[i]);
                    }
                }
            },
            read: function(is)
            {
                var helper = this.elementHelper; // Cache the element helper.
                var sz = is.readAndCheckSeqSize(helper.minWireSize);
                var v = [];
                v.length = sz;
                for(var i = 0; i < sz; ++i)
                {
                    v[i] = helper.read(is);
                }
                return v;
            },
            size: function(v)
            {
                return (v === null || v === undefined) ? 0 : v.length;
            }
        });
        
        defineProperty(SequenceHelper.prototype, "minWireSize", {
            get: function(){ return 1; }
        });
        
        // Speacialization optimized for ByteSeq
        var byteSeqHelper = new SequenceHelper();
        byteSeqHelper.write = function(os, v) { return os.writeByteSeq(v); };
        byteSeqHelper.read = function(is) { return is.readByteSeq(); };
        defineProperty(byteSeqHelper, "elementHelper", {
            get: function(){ return Ice.ByteHelper; }
        });
        StreamHelpers.VSizeContainer1OptHelper.call(byteSeqHelper);
        
        // Read method for object sequences
        var objectSequenceHelperRead = function(is)
        {
            var sz = is.readAndCheckSeqSize(1);
            var v = [];
            v.length = sz;
            var elementType = this.elementType;
            var readObjectAtIndex = function(idx)
            {
                is.readObject(function(obj) { v[idx] = obj; }, elementType);
            };
        
            for(var i = 0; i < sz; ++i)
            {
                readObjectAtIndex(i);
            }
            return v;
        };
        
        StreamHelpers.generateSeqHelper = function(elementHelper, fixed, elementType)
        {
            if(elementHelper === Ice.ByteHelper)
            {
                return byteSeqHelper;
            }
        
            var helper = new SequenceHelper();
            if(fixed)
            {
                if(elementHelper.minWireSize === 1)
                {
                    StreamHelpers.VSizeContainer1OptHelper.call(helper);
                }
                else
                {
                    StreamHelpers.VSizeContainerOptHelper.call(helper, elementHelper.minWireSize);
                }
            }
            else
            {
                StreamHelpers.FSizeOptHelper.call(helper);
            }
        
            defineProperty(helper, "elementHelper", {
                get: function(){ return elementHelper; }
            });
        
            if(elementHelper == Ice.ObjectHelper)
            {
                defineProperty(helper, "elementType", {
                    get: function(){ return elementType; }
                });
                helper.read = objectSequenceHelperRead;
            }
        
            return helper;
        };
        
        //
        // Dictionary helper to write dictionaries
        //
        var DictionaryHelper = Class({
            write: function(os, v)
            {
                if(v === null || v.size === 0)
                {
                    os.writeSize(0);
                }
                else
                {
                    var keyHelper = this.keyHelper;
                    var valueHelper = this.valueHelper;
                    os.writeSize(v.size);
                    for(var e = v.entries; e !== null; e = e.next)
                    {
                        keyHelper.write(os, e.key);
                        valueHelper.write(os, e.value);
                    }
                }
            },
            read: function(is)
            {
                var mapType = this.mapType;
                var v = new mapType();
                var sz = is.readSize();
                var keyHelper = this.keyHelper;
                var valueHelper = this.valueHelper;
                for(var i = 0; i < sz; ++i)
                {
                    v.set(keyHelper.read(is), valueHelper.read(is));
                }
                return v;
            },
            size: function(v)
            {
                return (v === null || v === undefined) ? 0 : v.size;
            }
        });
        
        Object.defineProperty(DictionaryHelper.prototype, "minWireSize", {
            get: function(){ return 1; }
        });
        
        // Read method for dictionaries of objects
        var objectDictionaryHelperRead = function(is)
        {
            var sz = is.readSize();
            var mapType = this.mapType;
            var v = new mapType();
            var valueType = this.valueType;
        
            var readObjectForKey = function(key)
            {
                is.readObject(function(obj) { v.set(key, obj); }, valueType);
            };
        
            var keyHelper = this.keyHelper;
            for(var i = 0; i < sz; ++i)
            {
                readObjectForKey(keyHelper.read(is));
            }
            return v;
        };
        
        StreamHelpers.generateDictHelper = function(keyHelper, valueHelper, fixed, valueType, mapType)
        {
            var helper = new DictionaryHelper();
            if(fixed)
            {
                StreamHelpers.VSizeContainerOptHelper.call(helper, keyHelper.minWireSize + valueHelper.minWireSize);
            }
            else
            {
                StreamHelpers.FSizeOptHelper.call(helper);
            }
            defineProperty(helper, "mapType", {
                get: function(){ return mapType; }
            });
            defineProperty(helper, "keyHelper", {
                get: function(){ return keyHelper; }
            });
            defineProperty(helper, "valueHelper", {
                get: function(){ return valueHelper; }
            });
        
            if(valueHelper == Ice.ObjectHelper)
            {
                defineProperty(helper, "valueType", {
                    get: function(){ return valueType; }
                });
                helper.read = objectDictionaryHelperRead;
            }
        
            return helper;
        };
        
        Ice.StreamHelpers = StreamHelpers;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        //
        // jshint browser: true
        //
        
        var HashMap = Ice.HashMap;
        
        var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER  || 9007199254740991;
        
        var _timers = new HashMap();
        
        var _SetTimeoutType = 0,
            _SetIntervalType = 1,
            _SetImmediateType = 2,
            _ClearTimeoutType = 3,
            _ClearIntervalType = 4;
        
        var Timer = {};
        var worker;
        
        var _nextId = 0;
        
        function nextId()
        {
            if(_nextId == MAX_SAFE_INTEGER)
            {
                _nextId = 0;
            }
            return _nextId++;
        }
        Timer.setTimeout = function(cb, ms)
        {
            var id = nextId();
            _timers.set(id, cb);
            worker.postMessage({type: _SetTimeoutType, id: id, ms: ms});
            return id;
        };
        
        Timer.clearTimeout = function(id)
        {
            _timers.delete(id);
            worker.postMessage({type: _ClearTimeoutType, id: id});
        };
        
        Timer.setInterval = function(cb, ms)
        {
            var id = nextId();
            _timers.set(id, cb);
            worker.postMessage({type: _SetIntervalType, id: id, ms: ms});
            return id;
        };
        
        Timer.clearInterval = function(id)
        {
            _timers.delete(id);
            worker.postMessage({type: _ClearIntervalType, id: id});
        };
        
        Timer.setImmediate = function(cb)
        {
            var id = nextId();
            _timers.set(id, cb);
            worker.postMessage({type: _SetImmediateType, id: id});
            return id;
        };
        
        Timer.onmessage = function(e)
        {
            var cb;
            if(e.data.type === _SetIntervalType)
            {
                cb = _timers.get(e.data.id);
            }
            else
            {
                cb = _timers.delete(e.data.id);
            }
            
            if(cb !== undefined)
            {
                cb.call();
            }
        };
        
        
        function workerCode()
        {
            return "(" +
            function()
            {
                //
                // jshint worker: true
                //
                var _wSetTimeoutType = 0,
                    _wSetIntervalType = 1,
                    _wSetImmediateType = 2,
                    _wClearTimeoutType = 3,
                    _wClearIntervalType = 4;
                    
                var timers = {};
                
                self.onmessage = function(e)
                {
                    if(e.data.type == _wSetTimeoutType)
                    {
                        timers[e.data.id] = setTimeout(function()
                            {
                                self.postMessage(e.data);
                            },
                            e.data.ms);
                    }
                    else if(e.data.type == _wSetIntervalType)
                    {
                        timers[e.data.id] = setInterval(function()
                            {
                                self.postMessage(e.data);
                            },
                            e.data.ms);
                    }
                    else if(e.data.type == _wSetImmediateType)
                    {
                        self.postMessage(e.data);
                    }
                    else if(e.data.type == _wClearTimeoutType)
                    {
                        clearTimeout(timers[e.data.id]);
                        delete timers[e.data.id];
                    }
                    else if(e.data.type == _wClearIntervalType)
                    {
                        clearInterval(timers[e.data.id]);
                        delete timers[e.data.id];
                    }
                };
                
                //
                // jshint worker: false
                //
            }.toString() + "());";
        }
        
        if(worker === undefined)
        {
            worker = new Worker(window.URL.createObjectURL(new Blob([workerCode()], {type : 'text/javascript'})));
            worker.onmessage = Timer.onmessage;
        }
        
        Ice.Timer = Timer;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        //
        // Ice.Object
        //
        // Using IceObject in this file to avoid collisions with the native Object.
        //
        
        var Class = Ice.Class;
        
        var nextAddress = 0;
        
        var IceObject = Class({
            __init__: function()
            {
                // Fake Address used as the hashCode for this object instance.
                this.__address = nextAddress++;
            },
            hashCode: function()
            {
                return this.__address;
            },
            ice_isA: function(s, current)
            {
                return this.__mostDerivedType().__ids.indexOf(s) >= 0;
            },
            ice_ping: function(current)
            {
            },
            ice_ids: function(current)
            {
                return this.__mostDerivedType().__ids;
            },
            ice_id: function(current)
            {
                return this.__mostDerivedType().__id;
            },
            toString: function()
            {
                return "[object " + this.ice_id() + "]";
            },
            ice_preMarshal: function()
            {
            },
            ice_postUnmarshal: function()
            {
            },
            __write: function(os)
            {
                os.startWriteObject(null);
                __writeImpl(this, os, this.__mostDerivedType());
                os.endWriteObject();
            },
            __read: function(is)
            {
                is.startReadObject();
                __readImpl(this, is, this.__mostDerivedType());
                is.endReadObject(false);
            },
            ice_instanceof: function(T)
            {
                if(T)
                {
                    if(this instanceof T)
                    {
                        return true;
                    }
                    return this.__mostDerivedType().__instanceof(T);
                }
                return false;
            },
            //
            // __mostDerivedType returns the the most derived Ice generated class. This is
            // necessary because the user might extend Slice generated classes. The user
            // class extensions don't have __id, __ids, __instanceof etc static members so
            // the implementation of ice_id, ice_ids and ice_instanceof would fail trying
            // to access those members of the user defined class. Instead, ice_id, ice_ids
            // and ice_instanceof call __mostDerivedType to get the most derived Ice class.
            //
            // The __mostDerivedType is overriden by each Slice generated class, see the
            // Slice.defineObject method implementation for details.
            //
            __mostDerivedType: function()
            {
                return IceObject;
            },
            //
            // The default implementation of equals compare references.
            // 
            equals: function(other)
            {
                return this === other;
            }
        });
        
        //
        // These methods are used for object parameters.
        //
        IceObject.write = function(os, v)
        {
            os.writeObject(v);
        };
        
        IceObject.writeOpt = function(os, tag, v)
        {
            os.writeOptObject(tag, v);
        };
        
        IceObject.read = function(is)
        {
            var v = { value: null };
            is.readObject(function(o) { v.value = o; }, IceObject);
            return v;
        };
        
        IceObject.readOpt = function(is, tag)
        {
            var v = { value: undefined };
            is.readOptObject(tag, function(o) { v.value = o; }, IceObject);
            return v;
        };
        
        IceObject.ice_staticId = function()
        {
            return IceObject.__id;
        };
        
        IceObject.__instanceof = function(T)
        {
            if(T === this)
            {
                return true;
            }
        
            for(var i in this.__implements)
            {
                if(this.__implements[i].__instanceof(T))
                {
                    return true;
                }
            }
        
            if(this.__parent)
            {
                return this.__parent.__instanceof(T);
            }
            return false;
        };
        
        IceObject.__ids = ["::Ice::Object"];
        IceObject.__id = IceObject.__ids[0];
        IceObject.__compactId = -1;
        IceObject.__preserved = false;
        
        //
        // Private methods
        //
        
        var __writeImpl = function(obj, os, type)
        {
            //
            // The __writeImpl method is a recursive method that goes down the
            // class hierarchy to marshal each slice of the class using the
            // generated __writeMemberImpl method.
            //
        
            if(type === undefined || type === IceObject)
            {
                return; // Don't marshal anything for IceObject
            }
        
            os.startWriteSlice(type.__id, type.__compactId, type.__parent === IceObject);
            if(type.prototype.__writeMemberImpl)
            {
                type.prototype.__writeMemberImpl.call(obj, os);
            }
            os.endWriteSlice();
            __writeImpl(obj, os, type.__parent);
        };
        
        var __readImpl = function(obj, is, type)
        {
            //
            // The __readImpl method is a recursive method that goes down the
            // class hierarchy to marshal each slice of the class using the
            // generated __readMemberImpl method.
            //
        
            if(type === undefined || type === IceObject)
            {
                return; // Don't marshal anything for IceObject
            }
        
            is.startReadSlice();
            if(type.prototype.__readMemberImpl)
            {
                type.prototype.__readMemberImpl.call(obj, is);
            }
            is.endReadSlice();
            __readImpl(obj, is, type.__parent);
        };
        
        var __writePreserved = function(os)
        {
            //
            // For Slice classes which are marked "preserved", the implementation of this method
            // replaces the Ice.Object.prototype.__write method.
            //
            os.startWriteObject(this.__slicedData);
            __writeImpl(this, os, this.__mostDerivedType());
            os.endWriteObject();
        };
        
        var __readPreserved = function(is)
        {
            //
            // For Slice classes which are marked "preserved", the implementation of this method
            // replaces the Ice.Object.prototype.__read method.
            //
            is.startReadObject();
            __readImpl(this, is, this.__mostDerivedType());
            this.__slicedData = is.endReadObject(true);
        };
        
        Ice.Object = IceObject;
        
        var Slice = Ice.Slice;
        Slice.defineLocalObject = function(constructor, base)
        {
            var obj = constructor || function(){};
        
            if(base !== undefined)
            {
                obj.prototype = new base();
                obj.__parent = base;
                obj.prototype.constructor = constructor;
            }
        
            return obj;
        };
        
        Slice.defineObject = function(constructor, base, intfs, scope, ids, compactId, writeImpl, readImpl, preserved)
        {
            var obj = constructor || function(){};
        
            obj.prototype = new base();
            obj.__parent = base;
            obj.__ids = ids;
            obj.__id = ids[scope];
            obj.__compactId = compactId;
            obj.__instanceof = IceObject.__instanceof;
            obj.__implements = intfs;
        
            //
            // These methods are used for object parameters.
            //
            obj.write = function(os, v)
            {
                os.writeObject(v);
            };
            obj.writeOpt = function(os, tag, v)
            {
                os.writeOptObject(tag, v);
            };
            obj.read = function(is)
            {
                var v = { value: null };
                is.readObject(function(o) { v.value = o; }, obj);
                return v;
            };
            obj.readOpt = function(is, tag)
            {
                var v = { value: undefined };
                is.readOptObject(tag, function(o) { v.value = o; }, obj);
                return v;
            };
        
            obj.ice_staticId = function()
            {
                return ids[scope];
            };
        
            obj.prototype.constructor = obj;
            obj.prototype.__mostDerivedType = function() { return obj; };
            if(preserved)
            {
                obj.prototype.__write = __writePreserved;
                obj.prototype.__read = __readPreserved;
            }
            obj.prototype.__writeMemberImpl = writeImpl;
            obj.prototype.__readMemberImpl = readImpl;
        
            return obj;
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var StringUtil = Ice.StringUtil;
        
        Ice.HashUtil =
        {
            addBoolean: function(h, b)
            {
                return ((h << 5) + h) ^ (b ? 0 : 1);
            },
            addString: function(h, str)
            {
                if(str !== undefined && str !== null)
                {
                    h = ((h << 5) + h) ^ StringUtil.hashCode(str);
                }
                return h;
            },
            addNumber: function(h, num)
            {
                return ((h << 5) + h) ^ num;
            },
            addHashable: function(h, obj)
            {
                if(obj !== undefined && obj !== null)
                {
                    h = ((h << 5) + h) ^ obj.hashCode();
                }
                return h;
            },
            addArray: function(h, arr, hashCode)
            {
                if(arr !== undefined && arr !== null)
                {
                    for(var i = 0; i < arr.length; ++i)
                    {
                        h = hashCode(h, arr[i]);
                    }
                }
                return h;
            }
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var ArrayUtil = Ice.ArrayUtil;
        
        //
        // Use generic equality test from ArrayUtil.
        //
        var eq = ArrayUtil.eq;
        
        var equals = function(other)
        {
            if(this === other)
            {
                return true;
            }
        
            if(other === null || other === undefined)
            {
                return false;
            }
        
            if(this.prototype !== other.prototype)
            {
                return false;
            }
        
            var e1, e2;
            for(var key in this)
            {
                e1 = this[key];
                e2 = other[key];
                if(typeof e1 == "function")
                {
                    continue; // Don't need to compare functions
                }
                else if(!eq(e1, e2))
                {
                    return false;
                }
            }
            return true;
        };
        
        var clone = function()
        {
            var other = new this.constructor();
            var e;
            for(var key in this)
            {
                e = this[key];
                if(e === undefined || e === null)
                {
                    other[key] = e;
                }
                else if(typeof e == "function")
                {
                    continue;
                }
                else if(typeof e.clone == "function")
                {
                    other[key] = e.clone();
                }
                else if(e instanceof Array)
                {
                    other[key] = ArrayUtil.clone(e);
                }
                else
                {
                    other[key] = e;
                }
            }
            return other;
        };
        
        var memberHashCode = function(h, e)
        {
            if(typeof e.hashCode == "function")
            {
                return Ice.HashUtil.addHashable(h, e);
            }
            else if(e instanceof Array)
            {
                return Ice.HashUtil.addArray(h, e, memberHashCode);
            }
            else
            {
                var t = typeof(e);
                if(e instanceof String || t == "string")
                {
                    return Ice.HashUtil.addString(h, e);
                }
                else if(e instanceof Number || t == "number")
                {
                    return Ice.HashUtil.addNumber(h, e);
                }
                else if(e instanceof Boolean || t == "boolean")
                {
                    return Ice.HashUtil.addBoolean(h, e);
                }
            }
        };
        
        var hashCode = function()
        {
            var __h = 5381;
            var e;
            for(var key in this)
            {
                e = this[key];
                if(e === undefined || e === null || typeof e == "function")
                {
                    continue;
                }
                __h = memberHashCode(__h, e);
            }
            return __h;
        };
        
        Ice.Slice.defineStruct = function(constructor, legalKeyType, writeImpl, readImpl, minWireSize, fixed)
        {
            var obj = constructor;
        
            obj.prototype.clone = clone;
        
            obj.prototype.equals = equals;
        
            //
            // Only generate hashCode if this structure type is a legal dictionary key type.
            //
            if(legalKeyType)
            {
                obj.prototype.hashCode = hashCode;
            }
        
            if(readImpl && writeImpl)
            {
                obj.prototype.__write = writeImpl;
                obj.prototype.__read = readImpl;
                obj.write = function(os, v)
                {
                    if(!v)
                    {
                        if(!obj.prototype._nullMarshalValue)
                        {
                            obj.prototype._nullMarshalValue = new this();
                        }
                        v = obj.prototype._nullMarshalValue;
                    }
                    v.__write(os);
                };
                obj.read = function(is, v)
                {
                    if(!v || !(v instanceof this))
                    {
                        v = new this();
                    }
                    v.__read(is);
                    return v;
                };
                Object.defineProperty(obj, "minWireSize", {
                    get: function() { return minWireSize; }
                });
                if(fixed)
                {
                    Ice.StreamHelpers.VSizeOptHelper.call(obj);
                }
                else
                {
                    Ice.StreamHelpers.FSizeOptHelper.call(obj);
                }
            }
            return obj;
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        Ice.CompactIdRegistry = new Ice.HashMap();
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `BuiltinSequences.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
            Slice.defineSequence(Ice, "BoolSeqHelper", "Ice.BoolHelper", true);
            Slice.defineSequence(Ice, "ByteSeqHelper", "Ice.ByteHelper", true);
            Slice.defineSequence(Ice, "ShortSeqHelper", "Ice.ShortHelper", true);
            Slice.defineSequence(Ice, "IntSeqHelper", "Ice.IntHelper", true);
            Slice.defineSequence(Ice, "LongSeqHelper", "Ice.LongHelper", true);
            Slice.defineSequence(Ice, "FloatSeqHelper", "Ice.FloatHelper", true);
            Slice.defineSequence(Ice, "DoubleSeqHelper", "Ice.DoubleHelper", true);
            Slice.defineSequence(Ice, "StringSeqHelper", "Ice.StringHelper", false);
            Slice.defineSequence(Ice, "ObjectSeqHelper", "Ice.ObjectHelper", false, "Ice.Object");
            Slice.defineSequence(Ice, "ObjectProxySeqHelper", "Ice.ObjectPrx", false);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        //
        // Using a separate module for these constants so that ObjectPrx does
        // not need to include Reference.
        //
        Ice.ReferenceMode = 
        {
            ModeTwoway: 0, 
            ModeOneway: 1, 
            ModeBatchOneway: 2, 
            ModeDatagram: 3, 
            ModeBatchDatagram: 4,
            ModeLast: 4
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        
        var Long = Ice.Long;
        
        //
        // IE 10 doesn't implement ArrayBuffer.slice
        //
        
        if(!ArrayBuffer.prototype.slice)
        {
            ArrayBuffer.prototype.slice = function (start, end)
            {
                var b = new Uint8Array(this);
                end = end === undefined ? b.length : end;
                var result = new Uint8Array(new ArrayBuffer(end - start));
                for(var i = 0, length = result.length; i < length; i++)
                {
                    result[i] = b[i + start];
                }
                return result.buffer;
            };
        }
        
        var __BufferOverflowException__ = "BufferOverflowException";
        var __BufferUnderflowException__ = "BufferUnderflowException";
        var __IndexOutOfBoundsException__ = "IndexOutOfBoundsException";
        
        //
        // Buffer implementation to be used by web browsers, it uses ArrayBuffer as
        // the store.
        //
        var Buffer = Ice.Class({
            __init__: function(buffer)
            {
                if(buffer !== undefined)
                {
                    this.b = buffer;
                    this.v = new DataView(this.b);
                }
                else
                {
                    this.b = null; // ArrayBuffer
                    this.v = null; // DataView
                }
                this._position = 0;
                this._limit = 0;
                this._shrinkCounter = 0;
            },
            empty: function()
            {
                return this._limit === 0;
            },
            resize: function(n)
            {
                if(n === 0)
                {
                    this.clear();
                }
                else if(n > this.capacity)
                {
                    this.reserve(n);
                }
                this._limit = n;
            },
            clear: function()
            {
                this.b = null;
                this.v = null;
                this._position = 0;
                this._limit = 0;
            },
            //
            // Call expand(n) to add room for n additional bytes. Note that expand()
            // examines the current position of the buffer first; we don't want to
            // expand the buffer if the caller is writing to a location that is
            // already in the buffer.
            //
            expand: function(n)
            {
                var sz = this.capacity === 0 ? n : this._position + n;
                if(sz > this._limit)
                {
                    this.resize(sz);
                }
            },
            reset: function()
            {
                if(this._limit > 0 && this._limit * 2 < this.capacity)
                {
                    //
                    // If the current buffer size is smaller than the
                    // buffer capacity, we shrink the buffer memory to the
                    // current size. This is to avoid holding on to too much
                    // memory if it's not needed anymore.
                    //
                    if(++this._shrinkCounter > 2)
                    {
                        this.reserve(this._limit);
                        this._shrinkCounter = 0;
                    }
                }
                else
                {
                    this._shrinkCounter = 0;
                }
                this._limit = 0;
                this._position = 0;
            },
            reserve: function(n)
            {
                if(n > this.capacity)
                {
                    var capacity = Math.max(n, 2 * this.capacity);
                    capacity = Math.max(1024, capacity);
                    if(!this.b)
                    {
                        this.b = new ArrayBuffer(capacity);
                    }
                    else
                    {
                        var b = new Uint8Array(capacity);
                        b.set(new Uint8Array(this.b));
                        this.b = b.buffer;
                    }
                    this.v = new DataView(this.b);
                }
                else if(n < this.capacity)
                {
                    this.b = this.b.slice(0, this.capacity);
                    this.v = new DataView(this.b);
                }
                else
                {
                    return;
                }
            },
            put: function(v)
            {
                if(this._position === this._limit)
                {
                    throw new Error(__BufferOverflowException__);
                }
                this.v.setUint8(this._position, v);
                this._position++;
            },
            putAt: function(i, v)
            {
                if(i >= this._limit)
                {
                    throw new Error(__IndexOutOfBoundsException__);
                }
                this.v.setUint8(i, v);
            },
            putArray: function(v)
            {
                //Expects an Uint8Array
                if(!(v instanceof Uint8Array))
                {
                    throw new TypeError('argument is not a Uint8Array');
                }
                if(v.byteLength > 0)
                {
                    if(this._position + v.length > this._limit)
                    {
                        throw new Error(__BufferOverflowException__);
                    }
                    new Uint8Array(this.b, 0, this.b.byteLength).set(v, this._position);
                    this._position += v.byteLength;
                }
            },
            putShort: function(v)
            {
                if(this._position + 2 > this._limit)
                {
                    throw new Error(__BufferOverflowException__);
                }
                this.v.setInt16(this._position, v, true);
                this._position += 2;
            },
            putInt: function(v)
            {
                if(this._position + 4 > this._limit)
                {
                    throw new Error(__BufferOverflowException__);
                }
                this.v.setInt32(this._position, v, true);
                this._position += 4;
            },
            putIntAt: function(i, v)
            {
                if(i + 4 > this._limit || i < 0)
                {
                    throw new Error(__IndexOutOfBoundsException__);
                }
                this.v.setInt32(i, v, true);
            },
            putFloat: function(v)
            {
                if(this._position + 4 > this._limit)
                {
                    throw new Error(__BufferOverflowException__);
                }
                this.v.setFloat32(this._position, v, true);
                this._position += 4;
            },
            putDouble: function(v)
            {
                if(this._position + 8 > this._limit)
                {
                    throw new Error(__BufferOverflowException__);
                }
                this.v.setFloat64(this._position, v, true);
                this._position += 8;
            },
            putLong: function(v)
            {
                if(this._position + 8 > this._limit)
                {
                    throw new Error(__BufferOverflowException__);
                }
                this.v.setInt32(this._position, v.low, true);
                this._position += 4;
                this.v.setInt32(this._position, v.high, true);
                this._position += 4;
            },
            writeString: function(stream, v)
            {
                //
                // Encode the string as utf8
                //
                var encoded = unescape(encodeURIComponent(v));
        
                stream.writeSize(encoded.length);
                stream.expand(encoded.length);
                this.putString(encoded, encoded.length);
            },
            putString: function(v, sz)
            {
                if(this._position + sz > this._limit)
                {
                    throw new Error(__BufferOverflowException__);
                }
                for(var i = 0; i < sz; ++i)
                {
                    this.v.setUint8(this._position, v.charCodeAt(i));
                    this._position++;
                }
            },
            get: function()
            {
                if(this._position >= this._limit)
                {
                    throw new Error(__BufferUnderflowException__);
                }
                var v = this.v.getUint8(this._position);
                this._position++;
                return v;
            },
            getAt: function(i)
            {
                if(i < 0 || i >= this._limit)
                {
                    throw new Error(__IndexOutOfBoundsException__);
                }
                return this.v.getUint8(i);
            },
            getArray: function(length)
            {
                if(this._position + length > this._limit)
                {
                    throw new Error(__BufferUnderflowException__);
                }
                var buffer = this.b.slice(this._position, this._position + length);
                this._position += length;
                return new Uint8Array(buffer);
            },
            getArrayAt: function(position, length)
            {
                if(position + length > this._limit)
                {
                    throw new Error(__BufferUnderflowException__);
                }
                length = length === undefined ? (this.b.byteLength - position) : length;
                return new Uint8Array(this.b.slice(position, position + length));
            },
            getShort: function()
            {
                if(this._limit - this._position < 2)
                {
                    throw new Error(__BufferUnderflowException__);
                }
                var v = this.v.getInt16(this._position, true);
                this._position += 2;
                return v;
            },
            getInt: function()
            {
                if(this._limit - this._position < 4)
                {
                    throw new Error(__BufferUnderflowException__);
                }
                var v = this.v.getInt32(this._position, true);
                this._position += 4;
                return v;
            },
            getFloat: function()
            {
                if(this._limit - this._position < 4)
                {
                    throw new Error(__BufferUnderflowException__);
                }
                var v = this.v.getFloat32(this._position, true);
                this._position += 4;
                return v;
            },
            getDouble: function()
            {
                if(this._limit - this._position < 8)
                {
                    throw new Error(__BufferUnderflowException__);
                }
                var v = this.v.getFloat64(this._position, true);
                this._position += 8;
                return v;
            },
            getLong: function()
            {
                if(this._limit - this._position < 8)
                {
                    throw new Error(__BufferUnderflowException__);
                }
                var v = new Long();
                v.low = this.v.getUint32(this._position, true);
                this._position += 4;
                v.high = this.v.getUint32(this._position, true);
                this._position += 4;
                return v;
            },
            getString: function(length)
            {
                if(this._position + length > this._limit)
                {
                    throw new Error(__BufferUnderflowException__);
                }
        
                var data = new DataView(this.b, this._position, length);
                var s = "";
        
                for(var i = 0; i < length; ++i)
                {
                    s += String.fromCharCode(data.getUint8(i));
                }
                this._position += length;
                s = decodeURIComponent(escape(s));
                return s;
            }
        });
        
        var prototype = Buffer.prototype;
        
        Object.defineProperty(prototype, "position", {
            get: function() { return this._position; },
            set: function(position){
                if(position >= 0 && position <= this._limit)
                {
                    this._position = position;
                }
            }
        });
        
        Object.defineProperty(prototype, "limit", {
            get: function() { return this._limit; },
            set: function(limit){
                if(limit <= this.capacity)
                {
                    this._limit = limit;
                    if(this._position > limit)
                    {
                        this._position = limit;
                    }
                }
            }
        });
        
        Object.defineProperty(prototype, "capacity", {
            get: function() { return this.b === null ? 0 : this.b.byteLength; }
        });
        
        Object.defineProperty(prototype, "remaining", {
            get: function() { return this._limit - this._position; }
        });
        
        //
        // Create a native buffer from an array of bytes.
        //
        Buffer.createNative = function(data)
        {
            if(data === undefined)
            {
                return new Uint8Array(0);
            }
            else
            {
                return new Uint8Array(data);
            }
        };
        
        Ice.Buffer = Buffer;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Buffer = Ice.Buffer;
        
        var Base64 = {};
        
        var _codeA = "A".charCodeAt(0);
        var _codea = "a".charCodeAt(0);
        var _code0 = "0".charCodeAt(0);
        
        Base64.encode = function(buf) // Expects native Buffer
        {
            if(buf === null || buf.length === 0)
            {
                return "";
            }
        
            var base64Bytes = (((buf.length * 4) / 3) + 1);
            var newlineBytes = (((base64Bytes * 2) / 76) + 1);
            var totalBytes = base64Bytes + newlineBytes;
        
            var v = [];
        
            var by1;
            var by2;
            var by3;
            var by4;
            var by5;
            var by6;
            var by7;
        
            for(var i = 0; i < buf.length; i += 3)
            {
                by1 = buf[i] & 0xff;
                by2 = 0;
                by3 = 0;
        
                if((i + 1) < buf.length)
                {
                    by2 = buf[i + 1] & 0xff;
                }
        
                if((i + 2) < buf.length)
                {
                    by3 = buf[i + 2] & 0xff;
                }
        
                by4 = (by1 >> 2) & 0xff;
                by5 = (((by1 & 0x3) << 4) | (by2 >> 4)) & 0xff;
                by6 = (((by2 & 0xf) << 2) | (by3 >> 6)) & 0xff;
                by7 = by3 & 0x3f;
        
                v.push(encodeChar(by4));
                v.push(encodeChar(by5));
        
                if((i + 1) < buf.length)
                {
                    v.push(encodeChar(by6));
                }
                else
                {
                    v.push("=");
                }
        
                if((i + 2) < buf.length)
                {
                    v.push(encodeChar(by7));
                }
                else
                {
                    v.push("=");
                }
            }
        
            var retval = v.join("");
            var outString = [];
            var iter = 0;
        
            while((retval.length - iter) > 76)
            {
                outString.push(retval.substring(iter, iter + 76));
                outString.push("\r\n");
                iter += 76;
            }
        
            outString.push(retval.substring(iter));
        
            return outString.join("");
        };
        
        Base64.decode = function(str) // Returns native Buffer
        {
            var newStr = [];
        
            for(var j = 0; j < str.length; j++)
            {
                var c = str.charAt(j);
                if(Base64.isBase64(c))
                {
                    newStr.push(c);
                }
            }
        
            if(newStr.length === 0)
            {
                return null;
            }
        
            // Note: This is how we were previously computing the size of the return
            //       sequence.  The method below is more efficient (and correct).
            // size_t lines = str.size() / 78;
            // size_t totalBytes = (lines * 76) + (((str.size() - (lines * 78)) * 3) / 4);
        
            // Figure out how long the final sequence is going to be.
            var totalBytes = (newStr.length * 3 / 4) + 1;
        
            var retval = new Buffer();
            retval.resize(totalBytes);
        
            var by1;
            var by2;
            var by3;
            var by4;
        
            var c1;
            var c2;
            var c3;
            var c4;
        
            var off = 0;
        
            for(var i = 0; i < newStr.length; i += 4)
            {
                c1 = "A";
                c2 = "A";
                c3 = "A";
                c4 = "A";
        
                c1 = newStr[i];
        
                if((i + 1) < newStr.length)
                {
                    c2 = newStr[i + 1];
                }
        
                if((i + 2) < newStr.length)
                {
                    c3 = newStr[i + 2];
                }
        
                if((i + 3) < newStr.length)
                {
                    c4 = newStr[i + 3];
                }
        
                by1 = decodeChar(c1) & 0xff;
                by2 = decodeChar(c2) & 0xff;
                by3 = decodeChar(c3) & 0xff;
                by4 = decodeChar(c4) & 0xff;
        
                retval.put((by1 << 2) | (by2 >> 4));
        
                if(c3 != "=")
                {
                    retval.put(((by2 & 0xf) << 4) | (by3 >> 2));
                }
        
                if(c4 != "=")
                {
                    retval.put(((by3 & 0x3) << 6) | by4);
                }
            }
        
            return retval.remaining > 0 ? retval.getArrayAt(0, retval.position) : retval.getArrayAt(0);
        };
        
        Base64.isBase64 = function(c)
        {
            if(c >= 'A' && c <= 'Z')
            {
                return true;
            }
        
            if(c >= 'a' && c <= 'z')
            {
                return true;
            }
        
            if(c >= '0' && c <= '9')
            {
                return true;
            }
        
            if(c == '+')
            {
                return true;
            }
        
            if(c == '/')
            {
                return true;
            }
        
            if(c == '=')
            {
                return true;
            }
        
            return false;
        };
        
        function encodeChar(uc)
        {
            if(uc < 26)
            {
                return String.fromCharCode(_codeA + uc);
            }
        
            if(uc < 52)
            {
                return String.fromCharCode(_codea + (uc - 26));
            }
        
            if(uc < 62)
            {
                return String.fromCharCode(_code0 + (uc - 52));
            }
        
            if(uc == 62)
            {
                return "+";
            }
        
            return "/";
        }
        
        function decodeChar(c)
        {
            if(c >= 'A' && c <= 'Z')
            {
                return c.charCodeAt(0) - _codeA;
            }
        
            if(c >= 'a' && c <= 'z')
            {
                return c.charCodeAt(0) - _codea + 26;
            }
        
            if(c >= '0' && c <= '9')
            {
                return c.charCodeAt(0) - _code0 + 52;
            }
        
            if(c == '+')
            {
                return 62;
            }
        
            return 63;
        }
        
        Ice.Base64 = Base64;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Identity.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            /**
             * The identity of an Ice object. In a proxy, an empty {@link Identity#name} denotes a nil
             * proxy. An identity with an empty {@link Identity#name} and a non-empty {@link Identity#category}
             * is illegal. You cannot add a servant with an empty name to the Active Servant Map.
             * 
             * @see ServantLocator
             * @see ObjectAdapter#addServantLocator
             * 
             **/
            Ice.Identity = Slice.defineStruct(
                function(name, category)
                {
                    this.name = name !== undefined ? name : "";
                    this.category = category !== undefined ? category : "";
                },
                true,
                function(__os)
                {
                    __os.writeString(this.name);
                    __os.writeString(this.category);
                },
                function(__is)
                {
                    this.name = __is.readString();
                    this.category = __is.readString();
                },
                2, 
                false);
            Slice.defineDictionary(Ice, "ObjectDict", "ObjectDictHelper", "Ice.Identity", "Ice.ObjectHelper", false, Ice.HashMap.compareEquals, "Ice.Object");
            Slice.defineSequence(Ice, "IdentitySeqHelper", "Ice.Identity", false);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `ConnectionF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Version.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            /**
             * A version structure for the protocol version.
             * 
             **/
            Ice.ProtocolVersion = Slice.defineStruct(
                function(major, minor)
                {
                    this.major = major !== undefined ? major : 0;
                    this.minor = minor !== undefined ? minor : 0;
                },
                true,
                function(__os)
                {
                    __os.writeByte(this.major);
                    __os.writeByte(this.minor);
                },
                function(__is)
                {
                    this.major = __is.readByte();
                    this.minor = __is.readByte();
                },
                2, 
                true);
        
            /**
             * A version structure for the encoding version.
             * 
             **/
            Ice.EncodingVersion = Slice.defineStruct(
                function(major, minor)
                {
                    this.major = major !== undefined ? major : 0;
                    this.minor = minor !== undefined ? minor : 0;
                },
                true,
                function(__os)
                {
                    __os.writeByte(this.major);
                    __os.writeByte(this.minor);
                },
                function(__is)
                {
                    this.major = __is.readByte();
                    this.minor = __is.readByte();
                },
                2, 
                true);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
            
        var SliceInfo = function()
        {
            /**
            * The Slice type ID for this slice.
            **/
            this.typeId = "";
        
            /**
            * The Slice compact type ID for this slice.
            **/
            this.compactId = -1;
        
            /**
            * The encoded bytes for this slice, including the leading size integer.
            **/
            this.bytes = [];
        
            /**
            * The Ice objects referenced by this slice.
            **/
            this.objects = [];
        
            /**
            * Whether or not the slice contains optional members.
            **/
            this.hasOptionalMembers = false;
        
            /**
            * Whether or not this is the last slice.
            **/
            this.isLastSlice = false;
        };
        Ice.SliceInfo = SliceInfo;
        
        var SlicedData = function(slices)
        {
            this.slices = slices;
        };
        Ice.SlicedData = SlicedData;
        
        var UnknownSlicedObject = Ice.Class(Ice.Object,
            {
                __init__: function(unknownTypeId)
                {
                    this._unknownTypeId = unknownTypeId;
                },
                getUnknownTypeId: function()
                {
                    return this._unknownTypeId;
                },
                __write: function(os)
                {
                    os.startWriteObject(this._slicedData);
                    os.endWriteObject();
                },
                __read: function(is)
                {
                    is.startReadObject();
                    this._slicedData = is.endReadObject(true);
                }
            });
        Ice.UnknownSlicedObject = UnknownSlicedObject;
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `ObjectAdapterF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var HashMap = Ice.HashMap;
        var Debug = Ice.Debug;
        
        var LocatorTable = Ice.Class({
            __init__: function()
            {
                this._adapterEndpointsTable = new HashMap(); // Map<String, EndpointTableEntry>
                this._objectTable = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, ReferenceTableEntry>
            },
            clear: function()
            {
                this._adapterEndpointsTable.clear();
                this._objectTable.clear();
            },
            getAdapterEndpoints: function(adapter, ttl, cached)
            {
                if(ttl === 0) // Locator cache disabled.
                {
                    cached.value = false;
                    return null;
                }
        
                var entry = this._adapterEndpointsTable.get(adapter);
                if(entry !== undefined)
                {
                    cached.value = this.checkTTL(entry.time, ttl);
                    return entry.endpoints;
                }
                cached.value = false;
                return null;
            },
            addAdapterEndpoints: function(adapter, endpoints)
            {
                this._adapterEndpointsTable.set(adapter, new EndpointTableEntry(Date.now(), endpoints));
            },
            removeAdapterEndpoints: function(adapter)
            {
                var entry = this._adapterEndpointsTable.get(adapter);
                this._adapterEndpointsTable.delete(adapter);
                return entry !== undefined ? entry.endpoints : null;
            },
            getObjectReference: function(id, ttl, cached)
            {
                if(ttl === 0) // Locator cache disabled.
                {
                    cached.value = false;
                    return null;
                }
        
                var entry = this._objectTable.get(id);
                if(entry !== undefined)
                {
                    cached.value = this.checkTTL(entry.time, ttl);
                    return entry.reference;
                }
                cached.value = false;
                return null;
            },
            addObjectReference: function(id, ref)
            {
                this._objectTable.set(id, new ReferenceTableEntry(Date.now(), ref));
            },
            removeObjectReference: function(id)
            {
                var entry = this._objectTable.get(id);
                this._objectTable.delete(id);
                return entry !== undefined ? entry.reference : null;
            },
            checkTTL: function(time, ttl)
            {
                Debug.assert(ttl !== 0);
                if(ttl < 0) // TTL = infinite
                {
                    return true;
                }
                else
                {
                    return Date.now() - time <= (ttl * 1000);
                }
            }
        });
        
        Ice.LocatorTable = LocatorTable;
        
        var EndpointTableEntry = function(time, endpoints)
        {
            this.time = time;
            this.endpoints = endpoints;
        };
        
        var ReferenceTableEntry = function(time, reference)
        {
            this.time = time;
            this.reference = reference;
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Timer = Ice.Timer;
        
        //
        // Promise State
        //
        var State = {Pending: 0, Success: 1, Failed: 2};
        
        var resolveImp = function(self, listener)
        {
            var callback = self.__state === State.Success ? listener.onResponse : listener.onException;
            try
            {
                if(typeof callback !== "function")
                {
                    listener.promise.setState(self.__state, self._args);
                }
                else
                {
                    var result = callback.apply(null, self._args);
        
                    //
                    // Callback can return a new promise.
                    //
                    if(result && typeof result.then == "function")
                    {
                        result.then(
                            function()
                            {
                                var args = arguments;
                                listener.promise.succeed.apply(listener.promise, args);
                            },
                            function()
                            {
                                var args = arguments;
                                listener.promise.fail.apply(listener.promise, args);
                            });
                    }
                    else
                    {
                        listener.promise.succeed(result);
                    }
                }
            }
            catch(e)
            {
                listener.promise.fail.call(listener.promise, e);
            }
        };
        
        var Promise = Ice.Class({
            __init__: function()
            {
                this.__state = State.Pending;
                this.__listeners = [];
            },
            then: function(onResponse, onException)
            {
                var promise = new Promise();
                var self = this;
                //
                // Use setImmediate so the listeners are not resolved until the call stack is empty.
                //
                Timer.setImmediate(
                    function()
                    {
                        self.__listeners.push(
                            {
                                promise:promise,
                                onResponse:onResponse,
                                onException:onException
                            });
                        self.resolve();
                    });
                return promise;
            },
            exception: function(onException)
            {
                return this.then(null, onException);
            },
            finally: function(cb)
            {
                var p = new Promise();
                var self = this;
                
                var finallyHandler = function(method)
                {
                    return function()
                    {
                        var args = arguments;
                        try
                        {
                            var result = cb.apply(null, args);
                            if(result && typeof result.then == "function")
                            {
                                var handler = function(){ method.apply(p, args); };
                                result.then(handler).exception(handler);
                            }
                            else
                            {
                                method.apply(p, args);
                            }
                        }
                        catch(e)
                        {
                            method.apply(p, args);
                        }
                    };
                };
                
                Timer.setImmediate(
                    function(){
                        self.then(finallyHandler(p.succeed), finallyHandler(p.fail));
                    });
                return p;
            },
            delay: function(ms)
            {
                var p = new Promise();
                
                var self = this;
                
                var delayHandler = function(promise, method)
                {
                    return function()
                    {
                        var args = arguments;
                        Timer.setTimeout(
                            function()
                            {
                                method.apply(promise, args);
                            },
                            ms);
                    };
                };
                
                Timer.setImmediate(function()
                           {
                               self.then(delayHandler(p, p.succeed), delayHandler(p, p.fail));
                           });
                return p;
            },
            resolve: function()
            {
                if(this.__state === State.Pending)
                {
                    return;
                }
        
                var obj;
                while((obj = this.__listeners.pop()))
                {
                    //
                    // We use a separate function here to capture the listeners
                    // in the loop.
                    //
                    resolveImp(this, obj);
                }
            },
            setState: function(state, args)
            {
                if(this.__state === State.Pending && state !== State.Pending)
                {
                    this.__state = state;
                    this._args = args;
                    //
                    // Use setImmediate so the listeners are not resolved until the call stack is empty.
                    //
                    var self = this;
                    Timer.setImmediate(function(){ self.resolve(); });
                }
            },
            succeed: function()
            {
                var args = arguments;
                this.setState(State.Success, args);
                return this;
            },
            fail: function()
            {
                var args = arguments;
                this.setState(State.Failed, args);
                return this;
            },
            succeeded: function()
            {
                return this.__state === State.Success;
            },
            failed: function()
            {
                return this.__state === State.Failed;
            },
            completed: function()
            {
                return this.__state !== State.Pending;
            }
        });
        
        //
        // Create a new promise object that is fulfilled when all the promise arguments
        // are fulfilled or is rejected when one of the promises is rejected.
        //
        Promise.all = function()
        {
            // If only one argument is provided, check if the argument is an array
            if(arguments.length === 1 && arguments[0] instanceof Array)
            {
                return Promise.all.apply(this, arguments[0]);
            }
        
            var promise = new Promise();
            var promises = Array.prototype.slice.call(arguments);
            var results = new Array(arguments.length);
        
            var pending = promises.length;
            if(pending === 0)
            {
                promise.succeed.apply(promise, results);
            }
            for(var i = 0; i < promises.length; ++i)
            {
                //
                // Create an anonymous function to capture the loop index
                //
                
                /*jshint -W083 */
                (function(j)
                {
                    if(promises[j] && typeof promises[j].then == "function")
                    {
                        promises[j].then(
                            function()
                            {
                                results[j] = arguments;
                                pending--;
                                if(pending === 0)
                                {
                                    promise.succeed.apply(promise, results);
                                }
                            },
                            function()
                            {
                                promise.fail.apply(promise, arguments);
                            });
                    }
                    else
                    {
                        results[j] = promises[j];
                        pending--;
                        if(pending === 0)
                        {
                            promise.succeed.apply(promise, results);
                        }
                    }
                }(i));
                /*jshint +W083 */
            }
            return promise;
        };
        
        Promise.try = function(onResponse)
        {
            return new Promise().succeed().then(onResponse);
        };
        
        Promise.delay = function(ms)
        {
            if(arguments.length > 1)
            {
                var p = new Promise();
                var args = Array.prototype.slice.call(arguments);
                ms = args.pop();
                return p.succeed.apply(p, args).delay(ms);
            }
            else
            {
                return new Promise().succeed().delay(ms);
            }
        };
        
        Ice.Promise = Promise;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
            
            
        var Logger = Ice.Class({
            __init__: function(prefix)
            {
                if(prefix !== undefined && prefix.length > 0)
                {
                    this._prefix = prefix + ": ";
                }
                else
                {
                    this._prefix = "";
                }
            },
            print: function(message)
            {
                this.write(message, false);
            },
            trace: function(category, message)
            {
                var s = [];
                var d = new Date();
                s.push("-- ");
                s.push(this.timestamp());
                s.push(' ');
                s.push(this._prefix);
                s.push(category);
                s.push(": ");
                s.push(message);
                this.write(s.join(""), true);
            },
            warning: function(message)
            {
                var s = [];
                var d = new Date();
                s.push("-! ");
                s.push(this.timestamp());
                s.push(' ');
                s.push(this._prefix);
                s.push("warning: ");
                s.push(message);
                this.write(s.join(""), true);
            },
            error: function(message)
            {
                var s = [];
                var d = new Date();
                s.push("!! ");
                s.push(this.timestamp());
                s.push(' ');
                s.push(this._prefix);
                s.push("error: ");
                s.push(message);
                this.write(s.join(""), true);
            },
            cloneWithPrefix: function(prefix)
            {
                return new Logger(prefix);
            },
            write: function(message, indent)
            {
                if(indent)
                {
                    message = message.replace(/\n/g, "\n   ");
                }
        
                console.log(message);
            },
            timestamp: function()
            {
                var d = new Date();
                var mon = d.getMonth() + 1;
                mon = mon < 10 ? "0" + mon : mon;
                var day = d.getDate();
                day = day < 10 ? "0" + day : day;
                return mon + "-" + day + "-" + d.getFullYear() + " " + d.toLocaleTimeString() + "." + d.getMilliseconds();
            }
        });
        Ice.Logger = Logger;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `LocalException.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            /**
             * This exception is raised when a failure occurs during initialization.
             * 
             **/
            Ice.InitializationException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.reason = reason !== undefined ? reason : "";
                },
                Ice.LocalException,
                "Ice::InitializationException");
        
            /**
             * This exception indicates that a failure occurred while initializing
             * a plug-in.
             * 
             **/
            Ice.PluginInitializationException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.reason = reason !== undefined ? reason : "";
                },
                Ice.LocalException,
                "Ice::PluginInitializationException");
        
            /**
             * This exception is raised if a feature is requested that is not
             * supported with collocation optimization.
             * 
             * @deprecated this exception isn't used anymore by the Ice runtime
             **/
            Ice.CollocationOptimizationException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::CollocationOptimizationException");
        
            /**
             * An attempt was made to register something more than once with
             * the Ice run time.
             * 
             * This exception is raised if an attempt is made to register a
             * servant, servant locator, facet, object factory, plug-in, object
             * adapter, object, or user exception factory more than once for the
             * same ID.
             * 
             **/
            Ice.AlreadyRegisteredException = Slice.defineLocalException(
                function(kindOfObject, id, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.kindOfObject = kindOfObject !== undefined ? kindOfObject : "";
                    this.id = id !== undefined ? id : "";
                },
                Ice.LocalException,
                "Ice::AlreadyRegisteredException");
        
            /**
             * An attempt was made to find or deregister something that is not
             * registered with the Ice run time or Ice locator.
             * 
             * This exception is raised if an attempt is made to remove a servant,
             * servant locator, facet, object factory, plug-in, object adapter,
             * object, or user exception factory that is not currently registered.
             * 
             * It's also raised if the Ice locator can't find an object or object
             * adapter when resolving an indirect proxy or when an object adapter
             * is activated.
             * 
             **/
            Ice.NotRegisteredException = Slice.defineLocalException(
                function(kindOfObject, id, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.kindOfObject = kindOfObject !== undefined ? kindOfObject : "";
                    this.id = id !== undefined ? id : "";
                },
                Ice.LocalException,
                "Ice::NotRegisteredException");
        
            /**
             * The operation can only be invoked with a twoway request.
             * 
             * This exception is raised if an attempt is made to invoke an
             * operation with <tt>ice_oneway</tt>, <tt>ice_batchOneway</tt>, <tt>ice_datagram</tt>,
             * or <tt>ice_batchDatagram</tt> and the operation has a return value,
             * out-parameters, or an exception specification.
             * 
             **/
            Ice.TwowayOnlyException = Slice.defineLocalException(
                function(operation, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.operation = operation !== undefined ? operation : "";
                },
                Ice.LocalException,
                "Ice::TwowayOnlyException");
        
            /**
             * An attempt was made to clone a class that does not support
             * cloning.
             * 
             * This exception is raised if <tt>ice_clone</tt> is called on
             * a class that is derived from an abstract Slice class (that is,
             * a class containing operations), and the derived class does not
             * provide an implementation of the <tt>ice_clone</tt> operation (C++ only).
             * 
             **/
            Ice.CloneNotImplementedException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::CloneNotImplementedException");
        
            /**
             * This exception is raised if an operation call on a server raises an
             * unknown exception. For example, for C++, this exception is raised
             * if the server throws a C++ exception that is not directly or
             * indirectly derived from <tt>Ice::LocalException</tt> or
             * <tt>Ice::UserException</tt>.
             * 
             **/
            Ice.UnknownException = Slice.defineLocalException(
                function(unknown, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.unknown = unknown !== undefined ? unknown : "";
                },
                Ice.LocalException,
                "Ice::UnknownException");
        
            /**
             * This exception is raised if an operation call on a server raises a
             * local exception. Because local exceptions are not transmitted by
             * the Ice protocol, the client receives all local exceptions raised
             * by the server as {@link UnknownLocalException}. The only exception to this
             * rule are all exceptions derived from {@link RequestFailedException},
             * which are transmitted by the Ice protocol even though they are
             * declared <tt>local</tt>.
             * 
             **/
            Ice.UnknownLocalException = Slice.defineLocalException(
                function(unknown, _cause)
                {
                    Ice.UnknownException.call(this, unknown, _cause);
                },
                Ice.UnknownException,
                "Ice::UnknownLocalException");
        
            /**
             * An operation raised an incorrect user exception.
             * 
             * This exception is raised if an operation raises a
             * user exception that is not declared in the exception's
             * <tt>throws</tt> clause. Such undeclared exceptions are
             * not transmitted from the server to the client by the Ice
             * protocol, but instead the client just gets an
             * {@link UnknownUserException}. This is necessary in order to not violate
             * the contract established by an operation's signature: Only local
             * exceptions and user exceptions declared in the
             * <tt>throws</tt> clause can be raised.
             * 
             **/
            Ice.UnknownUserException = Slice.defineLocalException(
                function(unknown, _cause)
                {
                    Ice.UnknownException.call(this, unknown, _cause);
                },
                Ice.UnknownException,
                "Ice::UnknownUserException");
        
            /**
             * This exception is raised if the Ice library version does not match
             * the version in the Ice header files.
             * 
             **/
            Ice.VersionMismatchException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::VersionMismatchException");
        
            /**
             * This exception is raised if the {@link Communicator} has been destroyed.
             * 
             * @see Communicator#destroy
             * 
             **/
            Ice.CommunicatorDestroyedException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::CommunicatorDestroyedException");
        
            /**
             * This exception is raised if an attempt is made to use a deactivated
             * {@link ObjectAdapter}.
             * 
             * @see ObjectAdapter#deactivate
             * @see Communicator#shutdown
             * 
             **/
            Ice.ObjectAdapterDeactivatedException = Slice.defineLocalException(
                function(name, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.name = name !== undefined ? name : "";
                },
                Ice.LocalException,
                "Ice::ObjectAdapterDeactivatedException");
        
            /**
             * This exception is raised if an {@link ObjectAdapter} cannot be activated.
             * 
             * This happens if the {@link Locator} detects another active {@link ObjectAdapter} with
             * the same adapter id.
             * 
             **/
            Ice.ObjectAdapterIdInUseException = Slice.defineLocalException(
                function(id, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.id = id !== undefined ? id : "";
                },
                Ice.LocalException,
                "Ice::ObjectAdapterIdInUseException");
        
            /**
             * This exception is raised if no suitable endpoint is available.
             * 
             **/
            Ice.NoEndpointException = Slice.defineLocalException(
                function(proxy, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.proxy = proxy !== undefined ? proxy : "";
                },
                Ice.LocalException,
                "Ice::NoEndpointException");
        
            /**
             * This exception is raised if there was an error while parsing an
             * endpoint.
             * 
             **/
            Ice.EndpointParseException = Slice.defineLocalException(
                function(str, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.str = str !== undefined ? str : "";
                },
                Ice.LocalException,
                "Ice::EndpointParseException");
        
            /**
             * This exception is raised if there was an error while parsing an
             * endpoint selection type.
             * 
             **/
            Ice.EndpointSelectionTypeParseException = Slice.defineLocalException(
                function(str, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.str = str !== undefined ? str : "";
                },
                Ice.LocalException,
                "Ice::EndpointSelectionTypeParseException");
        
            /**
             * This exception is raised if there was an error while parsing a
             * version.
             * 
             **/
            Ice.VersionParseException = Slice.defineLocalException(
                function(str, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.str = str !== undefined ? str : "";
                },
                Ice.LocalException,
                "Ice::VersionParseException");
        
            /**
             * This exception is raised if there was an error while parsing a
             * stringified identity.
             * 
             **/
            Ice.IdentityParseException = Slice.defineLocalException(
                function(str, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.str = str !== undefined ? str : "";
                },
                Ice.LocalException,
                "Ice::IdentityParseException");
        
            /**
             * This exception is raised if there was an error while parsing a
             * stringified proxy.
             * 
             **/
            Ice.ProxyParseException = Slice.defineLocalException(
                function(str, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.str = str !== undefined ? str : "";
                },
                Ice.LocalException,
                "Ice::ProxyParseException");
        
            /**
             * This exception is raised if an illegal identity is encountered.
             * 
             **/
            Ice.IllegalIdentityException = Slice.defineLocalException(
                function(id, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.id = id !== undefined ? id : new Ice.Identity();
                },
                Ice.LocalException,
                "Ice::IllegalIdentityException");
        
            /**
             * This exception is raised to reject an illegal servant (typically
             * a null servant)
             * 
             **/
            Ice.IllegalServantException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.reason = reason !== undefined ? reason : "";
                },
                Ice.LocalException,
                "Ice::IllegalServantException");
        
            /**
             * This exception is raised if a request failed. This exception, and
             * all exceptions derived from {@link RequestFailedException}, are
             * transmitted by the Ice protocol, even though they are declared
             * <tt>local</tt>.
             * 
             **/
            Ice.RequestFailedException = Slice.defineLocalException(
                function(id, facet, operation, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.id = id !== undefined ? id : new Ice.Identity();
                    this.facet = facet !== undefined ? facet : "";
                    this.operation = operation !== undefined ? operation : "";
                },
                Ice.LocalException,
                "Ice::RequestFailedException");
        
            /**
             * This exception is raised if an object does not exist on the server,
             * that is, if no facets with the given identity exist.
             * 
             **/
            Ice.ObjectNotExistException = Slice.defineLocalException(
                function(id, facet, operation, _cause)
                {
                    Ice.RequestFailedException.call(this, id, facet, operation, _cause);
                },
                Ice.RequestFailedException,
                "Ice::ObjectNotExistException");
        
            /**
             * This exception is raised if no facet with the given name exists,
             * but at least one facet with the given identity exists.
             * 
             **/
            Ice.FacetNotExistException = Slice.defineLocalException(
                function(id, facet, operation, _cause)
                {
                    Ice.RequestFailedException.call(this, id, facet, operation, _cause);
                },
                Ice.RequestFailedException,
                "Ice::FacetNotExistException");
        
            /**
             * This exception is raised if an operation for a given object does
             * not exist on the server. Typically this is caused by either the
             * client or the server using an outdated Slice specification.
             * 
             **/
            Ice.OperationNotExistException = Slice.defineLocalException(
                function(id, facet, operation, _cause)
                {
                    Ice.RequestFailedException.call(this, id, facet, operation, _cause);
                },
                Ice.RequestFailedException,
                "Ice::OperationNotExistException");
        
            /**
             * This exception is raised if a system error occurred in the server
             * or client process. There are many possible causes for such a system
             * exception. For details on the cause, {@link SyscallException#error}
             * should be inspected.
             * 
             **/
            Ice.SyscallException = Slice.defineLocalException(
                function(error, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.error = error !== undefined ? error : 0;
                },
                Ice.LocalException,
                "Ice::SyscallException");
        
            /**
             * This exception indicates socket errors.
             * 
             **/
            Ice.SocketException = Slice.defineLocalException(
                function(error, _cause)
                {
                    Ice.SyscallException.call(this, error, _cause);
                },
                Ice.SyscallException,
                "Ice::SocketException");
        
            /**
             * This exception indicates file errors.
             * 
             **/
            Ice.FileException = Slice.defineLocalException(
                function(error, path, _cause)
                {
                    Ice.SyscallException.call(this, error, _cause);
                    this.path = path !== undefined ? path : "";
                },
                Ice.SyscallException,
                "Ice::FileException");
        
            /**
             * This exception indicates connection failures.
             * 
             **/
            Ice.ConnectFailedException = Slice.defineLocalException(
                function(error, _cause)
                {
                    Ice.SocketException.call(this, error, _cause);
                },
                Ice.SocketException,
                "Ice::ConnectFailedException");
        
            /**
             * This exception indicates a connection failure for which
             * the server host actively refuses a connection.
             * 
             **/
            Ice.ConnectionRefusedException = Slice.defineLocalException(
                function(error, _cause)
                {
                    Ice.ConnectFailedException.call(this, error, _cause);
                },
                Ice.ConnectFailedException,
                "Ice::ConnectionRefusedException");
        
            /**
             * This exception indicates a lost connection.
             * 
             **/
            Ice.ConnectionLostException = Slice.defineLocalException(
                function(error, _cause)
                {
                    Ice.SocketException.call(this, error, _cause);
                },
                Ice.SocketException,
                "Ice::ConnectionLostException");
        
            /**
             * This exception indicates a DNS problem. For details on the cause,
             * {@link DNSException#error} should be inspected.
             * 
             **/
            Ice.DNSException = Slice.defineLocalException(
                function(error, host, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.error = error !== undefined ? error : 0;
                    this.host = host !== undefined ? host : "";
                },
                Ice.LocalException,
                "Ice::DNSException");
        
            /**
             * This exception indicates a request was interrupted.
             * 
             **/
            Ice.OperationInterruptedException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::OperationInterruptedException");
        
            /**
             * This exception indicates a timeout condition.
             * 
             **/
            Ice.TimeoutException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::TimeoutException");
        
            /**
             * This exception indicates a connection establishment timeout condition.
             * 
             **/
            Ice.ConnectTimeoutException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.TimeoutException.call(this, _cause);
                },
                Ice.TimeoutException,
                "Ice::ConnectTimeoutException");
        
            /**
             * This exception indicates a connection closure timeout condition.
             * 
             **/
            Ice.CloseTimeoutException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.TimeoutException.call(this, _cause);
                },
                Ice.TimeoutException,
                "Ice::CloseTimeoutException");
        
            /**
             * This exception indicates that a connection has been shut down because it has been
             * idle for some time.
             * 
             **/
            Ice.ConnectionTimeoutException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.TimeoutException.call(this, _cause);
                },
                Ice.TimeoutException,
                "Ice::ConnectionTimeoutException");
        
            /**
             * This exception indicates that an invocation failed because it timed
             * out.
             * 
             **/
            Ice.InvocationTimeoutException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.TimeoutException.call(this, _cause);
                },
                Ice.TimeoutException,
                "Ice::InvocationTimeoutException");
        
            /**
             * This exception indicates that an asynchronous invocation failed
             * because it was canceled explicitly by the user using the
             * <tt>Ice::AsyncResult::cancel</tt> method.
             * 
             **/
            Ice.InvocationCanceledException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::InvocationCanceledException");
        
            /**
             * A generic exception base for all kinds of protocol error
             * conditions.
             * 
             **/
            Ice.ProtocolException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.reason = reason !== undefined ? reason : "";
                },
                Ice.LocalException,
                "Ice::ProtocolException");
        
            /**
             * This exception indicates that a message did not start with the expected
             * magic number ('I', 'c', 'e', 'P').
             * 
             **/
            Ice.BadMagicException = Slice.defineLocalException(
                function(reason, badMagic, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                    this.badMagic = badMagic !== undefined ? badMagic : null;
                },
                Ice.ProtocolException,
                "Ice::BadMagicException");
        
            /**
             * This exception indicates an unsupported protocol version.
             * 
             **/
            Ice.UnsupportedProtocolException = Slice.defineLocalException(
                function(reason, bad, supported, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                    this.bad = bad !== undefined ? bad : new Ice.ProtocolVersion();
                    this.supported = supported !== undefined ? supported : new Ice.ProtocolVersion();
                },
                Ice.ProtocolException,
                "Ice::UnsupportedProtocolException");
        
            /**
             * This exception indicates an unsupported data encoding version.
             * 
             **/
            Ice.UnsupportedEncodingException = Slice.defineLocalException(
                function(reason, bad, supported, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                    this.bad = bad !== undefined ? bad : new Ice.EncodingVersion();
                    this.supported = supported !== undefined ? supported : new Ice.EncodingVersion();
                },
                Ice.ProtocolException,
                "Ice::UnsupportedEncodingException");
        
            /**
             * This exception indicates that an unknown protocol message has been received.
             * 
             **/
            Ice.UnknownMessageException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::UnknownMessageException");
        
            /**
             * This exception is raised if a message is received over a connection
             * that is not yet validated.
             * 
             **/
            Ice.ConnectionNotValidatedException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::ConnectionNotValidatedException");
        
            /**
             * This exception indicates that a response for an unknown request ID has been
             * received.
             * 
             **/
            Ice.UnknownRequestIdException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::UnknownRequestIdException");
        
            /**
             * This exception indicates that an unknown reply status has been received.
             * 
             **/
            Ice.UnknownReplyStatusException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::UnknownReplyStatusException");
        
            /**
             * This exception indicates that the connection has been gracefully shut down by the
             * server. The operation call that caused this exception has not been
             * executed by the server. In most cases you will not get this
             * exception, because the client will automatically retry the
             * operation call in case the server shut down the connection. However,
             * if upon retry the server shuts down the connection again, and the
             * retry limit has been reached, then this exception is propagated to
             * the application code.
             * 
             **/
            Ice.CloseConnectionException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::CloseConnectionException");
        
            /**
             * This exception is raised by an operation call if the application
             * forcefully closes the connection {@link Connection#close}.
             * 
             * @see Connection#close
             * 
             **/
            Ice.ForcedCloseConnectionException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::ForcedCloseConnectionException");
        
            /**
             * This exception indicates that a message size is less
             * than the minimum required size.
             * 
             **/
            Ice.IllegalMessageSizeException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::IllegalMessageSizeException");
        
            /**
             * This exception indicates a problem with compressing or uncompressing data.
             * 
             **/
            Ice.CompressionException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::CompressionException");
        
            /**
             * A datagram exceeds the configured size.
             * 
             * This exception is raised if a datagram exceeds the configured send or receive buffer
             * size, or exceeds the maximum payload size of a UDP packet (65507 bytes).
             * 
             **/
            Ice.DatagramLimitException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::DatagramLimitException");
        
            /**
             * This exception is raised for errors during marshaling or unmarshaling data.
             * 
             **/
            Ice.MarshalException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.ProtocolException.call(this, reason, _cause);
                },
                Ice.ProtocolException,
                "Ice::MarshalException");
        
            /**
             * This exception is raised if inconsistent data is received while unmarshaling a proxy.
             * 
             **/
            Ice.ProxyUnmarshalException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.MarshalException.call(this, reason, _cause);
                },
                Ice.MarshalException,
                "Ice::ProxyUnmarshalException");
        
            /**
             * This exception is raised if an out-of-bounds condition occurs during unmarshaling.
             * 
             **/
            Ice.UnmarshalOutOfBoundsException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.MarshalException.call(this, reason, _cause);
                },
                Ice.MarshalException,
                "Ice::UnmarshalOutOfBoundsException");
        
            /**
             * This exception is raised if no suitable object factory was found during
             * unmarshaling of a Slice class instance.
             * 
             * @see ObjectFactory
             * @see Communicator#addObjectFactory
             * @see Communicator#findObjectFactory
             * 
             **/
            Ice.NoObjectFactoryException = Slice.defineLocalException(
                function(reason, type, _cause)
                {
                    Ice.MarshalException.call(this, reason, _cause);
                    this.type = type !== undefined ? type : "";
                },
                Ice.MarshalException,
                "Ice::NoObjectFactoryException");
        
            /**
             * This exception is raised if the type of an unmarshaled Slice class instance does
             * not match its expected type.
             * This can happen if client and server are compiled with mismatched Slice
             * definitions or if a class of the wrong type is passed as a parameter
             * or return value using dynamic invocation. This exception can also be
             * raised if {@link IceStorm} is used to send Slice class instances and
             * an operation is subscribed to the wrong topic.
             * 
             **/
            Ice.UnexpectedObjectException = Slice.defineLocalException(
                function(reason, type, expectedType, _cause)
                {
                    Ice.MarshalException.call(this, reason, _cause);
                    this.type = type !== undefined ? type : "";
                    this.expectedType = expectedType !== undefined ? expectedType : "";
                },
                Ice.MarshalException,
                "Ice::UnexpectedObjectException");
        
            /**
             * This exception is raised when Ice receives a request or reply
             * message whose size exceeds the limit specified by the
             * <tt>Ice.MessageSizeMax</tt> property.
             * 
             **/
            Ice.MemoryLimitException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.MarshalException.call(this, reason, _cause);
                },
                Ice.MarshalException,
                "Ice::MemoryLimitException");
        
            /**
             * This exception is raised when a string conversion to or from UTF-8
             * fails during marshaling or unmarshaling.
             * 
             **/
            Ice.StringConversionException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.MarshalException.call(this, reason, _cause);
                },
                Ice.MarshalException,
                "Ice::StringConversionException");
        
            /**
             * This exception indicates a malformed data encapsulation.
             * 
             **/
            Ice.EncapsulationException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.MarshalException.call(this, reason, _cause);
                },
                Ice.MarshalException,
                "Ice::EncapsulationException");
        
            /**
             * This exception is raised if an unsupported feature is used. The
             * unsupported feature string contains the name of the unsupported
             * feature
             * 
             **/
            Ice.FeatureNotSupportedException = Slice.defineLocalException(
                function(unsupportedFeature, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.unsupportedFeature = unsupportedFeature !== undefined ? unsupportedFeature : "";
                },
                Ice.LocalException,
                "Ice::FeatureNotSupportedException");
        
            /**
             * This exception indicates a failure in a security subsystem,
             * such as the IceSSL plug-in.
             * 
             **/
            Ice.SecurityException = Slice.defineLocalException(
                function(reason, _cause)
                {
                    Ice.LocalException.call(this, _cause);
                    this.reason = reason !== undefined ? reason : "";
                },
                Ice.LocalException,
                "Ice::SecurityException");
        
            /**
             * This exception indicates that an attempt has been made to
             * change the connection properties of a fixed proxy.
             * 
             **/
            Ice.FixedProxyException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::FixedProxyException");
        
            /**
             * Indicates that the response to a request has already been sent;
             * re-dispatching such a request is not possible.
             * 
             **/
            Ice.ResponseSentException = Slice.defineLocalException(
                function(_cause)
                {
                    Ice.LocalException.call(this, _cause);
                },
                Ice.LocalException,
                "Ice::ResponseSentException");
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var StringUtil = Ice.StringUtil;
        
        var Protocol = {};
        
        Ice.Encoding_1_0 = new Ice.EncodingVersion(1, 0);
        Ice.Encoding_1_1 = new Ice.EncodingVersion(1, 1);
        
        Ice.Protocol_1_0 = new Ice.ProtocolVersion(1, 0);
        
        //
        // Size of the Ice protocol header
        //
        // Magic number (4 bytes)
        // Protocol version major (Byte)
        // Protocol version minor (Byte)
        // Encoding version major (Byte)
        // Encoding version minor (Byte)
        // Message type (Byte)
        // Compression status (Byte)
        // Message size (Int)
        //
        Protocol.headerSize = 14;
        
        //
        // The magic number at the front of each message
        //
        //Protocol.magic = [ 0x49, 0x63, 0x65, 0x50 ];      // 'I', 'c', 'e', 'P'
        Protocol.magic = Ice.Buffer.createNative([ 0x49, 0x63, 0x65, 0x50 ]);      // 'I', 'c', 'e', 'P'
        
        //
        // The current Ice protocol and encoding version
        //
        Protocol.protocolMajor = 1;
        Protocol.protocolMinor = 0;
        Protocol.protocolEncodingMajor = 1;
        Protocol.protocolEncodingMinor = 0;
        
        Protocol.encodingMajor = 1;
        Protocol.encodingMinor = 1;
        
        //
        // The Ice protocol message types
        //
        Protocol.requestMsg = 0;
        Protocol.requestBatchMsg = 1;
        Protocol.replyMsg = 2;
        Protocol.validateConnectionMsg = 3;
        Protocol.closeConnectionMsg = 4;
        
        //
        // Reply status
        //
        Protocol.replyOK = 0;
        Protocol.replyUserException = 1;
        Protocol.replyObjectNotExist = 2;
        Protocol.replyFacetNotExist = 3;
        Protocol.replyOperationNotExist = 4;
        Protocol.replyUnknownLocalException = 5;
        Protocol.replyUnknownUserException = 6;
        Protocol.replyUnknownException = 7;
        
        Protocol.requestHdr = Ice.Buffer.createNative([
            Protocol.magic[0],
            Protocol.magic[1],
            Protocol.magic[2],
            Protocol.magic[3],
            Protocol.protocolMajor,
            Protocol.protocolMinor,
            Protocol.protocolEncodingMajor,
            Protocol.protocolEncodingMinor,
            Protocol.requestMsg,
            0, // Compression status.
            0, 0, 0, 0, // Message size (placeholder).
            0, 0, 0, 0  // Request ID (placeholder).
        ]);
        
        Protocol.requestBatchHdr = Ice.Buffer.createNative([
            Protocol.magic[0],
            Protocol.magic[1],
            Protocol.magic[2],
            Protocol.magic[3],
            Protocol.protocolMajor,
            Protocol.protocolMinor,
            Protocol.protocolEncodingMajor,
            Protocol.protocolEncodingMinor,
            Protocol.requestBatchMsg,
            0, // Compression status.
            0, 0, 0, 0, // Message size (placeholder).
            0, 0, 0, 0  // Number of requests in batch (placeholder).
        ]);
        
        Protocol.replyHdr = Ice.Buffer.createNative([
            Protocol.magic[0],
            Protocol.magic[1],
            Protocol.magic[2],
            Protocol.magic[3],
            Protocol.protocolMajor,
            Protocol.protocolMinor,
            Protocol.protocolEncodingMajor,
            Protocol.protocolEncodingMinor,
            Protocol.replyMsg,
            0, // Compression status.
            0, 0, 0, 0 // Message size (placeholder).
        ]);
        
        Protocol.currentProtocol = new Ice.ProtocolVersion(Protocol.protocolMajor, Protocol.protocolMinor);
        Protocol.currentProtocolEncoding = new Ice.EncodingVersion(Protocol.protocolEncodingMajor, 
                                                                    Protocol.protocolEncodingMinor);
        
        Protocol.currentEncoding = new Ice.EncodingVersion(Protocol.encodingMajor, Protocol.encodingMinor);
        
        Protocol.checkSupportedProtocol = function(v)
        {
            if(v.major !== Protocol.currentProtocol.major || v.minor > Protocol.currentProtocol.minor)
            {
                throw new Ice.UnsupportedProtocolException("", v, Protocol.currentProtocol);
            }
        };
        
        Protocol.checkSupportedProtocolEncoding = function(v)
        {
            if(v.major !== Protocol.currentProtocolEncoding.major ||
            v.minor > Protocol.currentProtocolEncoding.minor)
            {
                throw new Ice.UnsupportedEncodingException("", v, Protocol.currentProtocolEncoding);
            }
        };
        
        Protocol.checkSupportedEncoding = function(v)
        {
            if(v.major !== Protocol.currentEncoding.major || v.minor > Protocol.currentEncoding.minor)
            {
                throw new Ice.UnsupportedEncodingException("", v, Protocol.currentEncoding);
            }
        };
        
        //
        // Either return the given protocol if not compatible, or the greatest
        // supported protocol otherwise.
        //
        Protocol.getCompatibleProtocol = function(v)
        {
            if(v.major !== Protocol.currentProtocol.major)
            {
                return v; // Unsupported protocol, return as is.
            }
            else if(v.minor < Protocol.currentProtocol.minor)
            {
                return v; // Supported protocol.
            }
            else
            {
                //
                // Unsupported but compatible, use the currently supported
                // protocol, that's the best we can do.
                //
                return Protocol.currentProtocol; 
            }
        };
        
        //
        // Either return the given encoding if not compatible, or the greatest
        // supported encoding otherwise.
        //
        Protocol.getCompatibleEncoding = function(v)
        {
            if(v.major !== Protocol.currentEncoding.major)
            {
                return v; // Unsupported encoding, return as is.
            }
            else if(v.minor < Protocol.currentEncoding.minor)
            {
                return v; // Supported encoding.
            }
            else
            {
                //
                // Unsupported but compatible, use the currently supported
                // encoding, that's the best we can do.
                //
                return Protocol.currentEncoding; 
            }
        };
        
        Protocol.isSupported = function(version, supported)
        {
            return version.major === supported.major && version.minor <= supported.minor;
        };
        
        /**
        * Converts a string to a protocol version.
        *
        * @param version The string to convert.
        *
        * @return The converted protocol version.
        **/
        Ice.stringToProtocolVersion = function(version)
        {
            return new Ice.ProtocolVersion(stringToMajor(version), stringToMinor(version));
        };
        
        /**
        * Converts a string to an encoding version.
        *
        * @param version The string to convert.
        *
        * @return The converted object identity.
        **/
        Ice.stringToEncodingVersion = function(version)
        {
            return new Ice.EncodingVersion(stringToMajor(version), stringToMinor(version));
        };
        
        /**
        * Converts a protocol version to a string.
        *
        * @param v The protocol version to convert.
        *
        * @return The converted string.
        **/
        Ice.protocolVersionToString = function(v)
        {
            return majorMinorToString(v.major, v.minor);
        };
        
        /**
        * Converts an encoding version to a string.
        *
        * @param v The encoding version to convert.
        *
        * @return The converted string.
        **/
        Ice.encodingVersionToString = function(v)
        {
            return majorMinorToString(v.major, v.minor);
        };
        
        Ice.Protocol = Protocol;
        
        function stringToMajor(str)
        {
            var pos = str.indexOf('.');
            if(pos === -1)
            {
                throw new Ice.VersionParseException("malformed version value `" + str + "'");
            }
                
            var majStr = str.substring(0, pos);
            var majVersion;
            try
            {
                majVersion = StringUtil.toInt(majStr);
            }
            catch(ex)
            {
                throw new Ice.VersionParseException("invalid version value `" + str + "'");
            }
            
            if(majVersion < 1 || majVersion > 255)
            {
                throw new Ice.VersionParseException("range error in version `" + str + "'");
            }
        
            return majVersion;
        }
        
        function stringToMinor(str)
        {
            var pos = str.indexOf('.');
            if(pos === -1)
            {
                throw new Ice.VersionParseException("malformed version value `" + str + "'");
            }
                
            var minStr = str.substring(pos + 1);
            var minVersion;
            try
            {
                minVersion = StringUtil.toInt(minStr);
            }
            catch(ex)
            {
                throw new Ice.VersionParseException("invalid version value `" + str + "'");
            }
            
            if(minVersion < 0 || minVersion > 255)
            {
                throw new Ice.VersionParseException("range error in version `" + str + "'");
            }
        
            return minVersion;
        }
        
        function majorMinorToString(major, minor)
        {
            return major + "." + minor;
        }
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var Property = function Property(pattern, deprecated, deprecatedBy)
        {
            this._pattern = pattern;
            this._deprecated = deprecated;
            this._deprecatedBy = deprecatedBy;
        };
        
        Object.defineProperty(Property.prototype, "pattern",{
            get: function() { return this._pattern; }
        });
        
        Object.defineProperty(Property.prototype, "deprecated",{
            get: function() { return this._deprecated; }
        });
        
        Object.defineProperty(Property.prototype, "deprecatedBy",{
            get: function() { return this._deprecatedBy; }
        });
        
        Ice.Property = Property;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        // Generated by makeprops.py from file ./config/PropertyNames.xml, Tue Apr 28 22:03:41 2015
        
        // IMPORTANT: Do not edit this file -- any edits made here will be lost!
        
        var PropertyNames = {};
        var Property = Ice.Property;
        /* jshint -W044*/
        
        PropertyNames.IceProps =
        [
            new Property("/^Ice\.ACM\.Client/", true, null),
            new Property("/^Ice\.ACM\.Server/", true, null),
            new Property("/^Ice\.ACM\.Timeout/", false, null),
            new Property("/^Ice\.ACM\.Heartbeat/", false, null),
            new Property("/^Ice\.ACM\.Close/", false, null),
            new Property("/^Ice\.ACM/", false, null),
            new Property("/^Ice\.ACM\.Client\.Timeout/", false, null),
            new Property("/^Ice\.ACM\.Client\.Heartbeat/", false, null),
            new Property("/^Ice\.ACM\.Client\.Close/", false, null),
            new Property("/^Ice\.ACM\.Client/", false, null),
            new Property("/^Ice\.ACM\.Server\.Timeout/", false, null),
            new Property("/^Ice\.ACM\.Server\.Heartbeat/", false, null),
            new Property("/^Ice\.ACM\.Server\.Close/", false, null),
            new Property("/^Ice\.ACM\.Server/", false, null),
            new Property("/^Ice\.Admin\.ACM\.Timeout/", false, null),
            new Property("/^Ice\.Admin\.ACM\.Heartbeat/", false, null),
            new Property("/^Ice\.Admin\.ACM\.Close/", false, null),
            new Property("/^Ice\.Admin\.ACM/", false, null),
            new Property("/^Ice\.Admin\.AdapterId/", false, null),
            new Property("/^Ice\.Admin\.Endpoints/", false, null),
            new Property("/^Ice\.Admin\.Locator\.EndpointSelection/", false, null),
            new Property("/^Ice\.Admin\.Locator\.ConnectionCached/", false, null),
            new Property("/^Ice\.Admin\.Locator\.PreferSecure/", false, null),
            new Property("/^Ice\.Admin\.Locator\.LocatorCacheTimeout/", false, null),
            new Property("/^Ice\.Admin\.Locator\.InvocationTimeout/", false, null),
            new Property("/^Ice\.Admin\.Locator\.Locator/", false, null),
            new Property("/^Ice\.Admin\.Locator\.Router/", false, null),
            new Property("/^Ice\.Admin\.Locator\.CollocationOptimized/", false, null),
            new Property("/^Ice\.Admin\.Locator\.Context\../", false, null),
            new Property("/^Ice\.Admin\.Locator/", false, null),
            new Property("/^Ice\.Admin\.PublishedEndpoints/", false, null),
            new Property("/^Ice\.Admin\.ReplicaGroupId/", false, null),
            new Property("/^Ice\.Admin\.Router\.EndpointSelection/", false, null),
            new Property("/^Ice\.Admin\.Router\.ConnectionCached/", false, null),
            new Property("/^Ice\.Admin\.Router\.PreferSecure/", false, null),
            new Property("/^Ice\.Admin\.Router\.LocatorCacheTimeout/", false, null),
            new Property("/^Ice\.Admin\.Router\.InvocationTimeout/", false, null),
            new Property("/^Ice\.Admin\.Router\.Locator/", false, null),
            new Property("/^Ice\.Admin\.Router\.Router/", false, null),
            new Property("/^Ice\.Admin\.Router\.CollocationOptimized/", false, null),
            new Property("/^Ice\.Admin\.Router\.Context\../", false, null),
            new Property("/^Ice\.Admin\.Router/", false, null),
            new Property("/^Ice\.Admin\.ProxyOptions/", false, null),
            new Property("/^Ice\.Admin\.ThreadPool\.Size/", false, null),
            new Property("/^Ice\.Admin\.ThreadPool\.SizeMax/", false, null),
            new Property("/^Ice\.Admin\.ThreadPool\.SizeWarn/", false, null),
            new Property("/^Ice\.Admin\.ThreadPool\.StackSize/", false, null),
            new Property("/^Ice\.Admin\.ThreadPool\.Serialize/", false, null),
            new Property("/^Ice\.Admin\.ThreadPool\.ThreadIdleTime/", false, null),
            new Property("/^Ice\.Admin\.ThreadPool\.ThreadPriority/", false, null),
            new Property("/^Ice\.Admin\.MessageSizeMax/", false, null),
            new Property("/^Ice\.Admin\.DelayCreation/", false, null),
            new Property("/^Ice\.Admin\.Enabled/", false, null),
            new Property("/^Ice\.Admin\.Facets/", false, null),
            new Property("/^Ice\.Admin\.InstanceName/", false, null),
            new Property("/^Ice\.Admin\.Logger\.KeepLogs/", false, null),
            new Property("/^Ice\.Admin\.Logger\.KeepTraces/", false, null),
            new Property("/^Ice\.Admin\.Logger\.Properties/", false, null),
            new Property("/^Ice\.Admin\.ServerId/", false, null),
            new Property("/^Ice\.BackgroundLocatorCacheUpdates/", false, null),
            new Property("/^Ice\.BatchAutoFlush/", true, null),
            new Property("/^Ice\.BatchAutoFlushSize/", false, null),
            new Property("/^Ice\.ChangeUser/", false, null),
            new Property("/^Ice\.ClientAccessPolicyProtocol/", false, null),
            new Property("/^Ice\.Compression\.Level/", false, null),
            new Property("/^Ice\.CollectObjects/", false, null),
            new Property("/^Ice\.Config/", false, null),
            new Property("/^Ice\.ConsoleListener/", false, null),
            new Property("/^Ice\.Default\.CollocationOptimized/", false, null),
            new Property("/^Ice\.Default\.EncodingVersion/", false, null),
            new Property("/^Ice\.Default\.EndpointSelection/", false, null),
            new Property("/^Ice\.Default\.Host/", false, null),
            new Property("/^Ice\.Default\.Locator\.EndpointSelection/", false, null),
            new Property("/^Ice\.Default\.Locator\.ConnectionCached/", false, null),
            new Property("/^Ice\.Default\.Locator\.PreferSecure/", false, null),
            new Property("/^Ice\.Default\.Locator\.LocatorCacheTimeout/", false, null),
            new Property("/^Ice\.Default\.Locator\.InvocationTimeout/", false, null),
            new Property("/^Ice\.Default\.Locator\.Locator/", false, null),
            new Property("/^Ice\.Default\.Locator\.Router/", false, null),
            new Property("/^Ice\.Default\.Locator\.CollocationOptimized/", false, null),
            new Property("/^Ice\.Default\.Locator\.Context\../", false, null),
            new Property("/^Ice\.Default\.Locator/", false, null),
            new Property("/^Ice\.Default\.LocatorCacheTimeout/", false, null),
            new Property("/^Ice\.Default\.InvocationTimeout/", false, null),
            new Property("/^Ice\.Default\.Package/", false, null),
            new Property("/^Ice\.Default\.PreferSecure/", false, null),
            new Property("/^Ice\.Default\.Protocol/", false, null),
            new Property("/^Ice\.Default\.Router\.EndpointSelection/", false, null),
            new Property("/^Ice\.Default\.Router\.ConnectionCached/", false, null),
            new Property("/^Ice\.Default\.Router\.PreferSecure/", false, null),
            new Property("/^Ice\.Default\.Router\.LocatorCacheTimeout/", false, null),
            new Property("/^Ice\.Default\.Router\.InvocationTimeout/", false, null),
            new Property("/^Ice\.Default\.Router\.Locator/", false, null),
            new Property("/^Ice\.Default\.Router\.Router/", false, null),
            new Property("/^Ice\.Default\.Router\.CollocationOptimized/", false, null),
            new Property("/^Ice\.Default\.Router\.Context\../", false, null),
            new Property("/^Ice\.Default\.Router/", false, null),
            new Property("/^Ice\.Default\.SlicedFormat/", false, null),
            new Property("/^Ice\.Default\.SourceAddress/", false, null),
            new Property("/^Ice\.Default\.Timeout/", false, null),
            new Property("/^Ice\.EventLog\.Source/", false, null),
            new Property("/^Ice\.FactoryAssemblies/", false, null),
            new Property("/^Ice\.HTTPProxyHost/", false, null),
            new Property("/^Ice\.HTTPProxyPort/", false, null),
            new Property("/^Ice\.ImplicitContext/", false, null),
            new Property("/^Ice\.InitPlugins/", false, null),
            new Property("/^Ice\.IPv4/", false, null),
            new Property("/^Ice\.IPv6/", false, null),
            new Property("/^Ice\.LogFile/", false, null),
            new Property("/^Ice\.LogStdErr\.Convert/", false, null),
            new Property("/^Ice\.MessageSizeMax/", false, null),
            new Property("/^Ice\.Nohup/", false, null),
            new Property("/^Ice\.NullHandleAbort/", false, null),
            new Property("/^Ice\.Override\.CloseTimeout/", false, null),
            new Property("/^Ice\.Override\.Compress/", false, null),
            new Property("/^Ice\.Override\.ConnectTimeout/", false, null),
            new Property("/^Ice\.Override\.Timeout/", false, null),
            new Property("/^Ice\.Override\.Secure/", false, null),
            new Property("/^Ice\.Package\../", false, null),
            new Property("/^Ice\.Plugin\../", false, null),
            new Property("/^Ice\.PluginLoadOrder/", false, null),
            new Property("/^Ice\.PreferIPv6Address/", false, null),
            new Property("/^Ice\.PrintAdapterReady/", false, null),
            new Property("/^Ice\.PrintProcessId/", false, null),
            new Property("/^Ice\.PrintStackTraces/", false, null),
            new Property("/^Ice\.ProgramName/", false, null),
            new Property("/^Ice\.RetryIntervals/", false, null),
            new Property("/^Ice\.ServerIdleTime/", false, null),
            new Property("/^Ice\.SOCKSProxyHost/", false, null),
            new Property("/^Ice\.SOCKSProxyPort/", false, null),
            new Property("/^Ice\.StdErr/", false, null),
            new Property("/^Ice\.StdOut/", false, null),
            new Property("/^Ice\.SyslogFacility/", false, null),
            new Property("/^Ice\.ThreadPool\.Client\.Size/", false, null),
            new Property("/^Ice\.ThreadPool\.Client\.SizeMax/", false, null),
            new Property("/^Ice\.ThreadPool\.Client\.SizeWarn/", false, null),
            new Property("/^Ice\.ThreadPool\.Client\.StackSize/", false, null),
            new Property("/^Ice\.ThreadPool\.Client\.Serialize/", false, null),
            new Property("/^Ice\.ThreadPool\.Client\.ThreadIdleTime/", false, null),
            new Property("/^Ice\.ThreadPool\.Client\.ThreadPriority/", false, null),
            new Property("/^Ice\.ThreadPool\.Server\.Size/", false, null),
            new Property("/^Ice\.ThreadPool\.Server\.SizeMax/", false, null),
            new Property("/^Ice\.ThreadPool\.Server\.SizeWarn/", false, null),
            new Property("/^Ice\.ThreadPool\.Server\.StackSize/", false, null),
            new Property("/^Ice\.ThreadPool\.Server\.Serialize/", false, null),
            new Property("/^Ice\.ThreadPool\.Server\.ThreadIdleTime/", false, null),
            new Property("/^Ice\.ThreadPool\.Server\.ThreadPriority/", false, null),
            new Property("/^Ice\.ThreadPriority/", false, null),
            new Property("/^Ice\.Trace\.Admin\.Properties/", false, null),
            new Property("/^Ice\.Trace\.Admin\.Logger/", false, null),
            new Property("/^Ice\.Trace\.Locator/", false, null),
            new Property("/^Ice\.Trace\.Network/", false, null),
            new Property("/^Ice\.Trace\.Protocol/", false, null),
            new Property("/^Ice\.Trace\.Retry/", false, null),
            new Property("/^Ice\.Trace\.Slicing/", false, null),
            new Property("/^Ice\.Trace\.ThreadPool/", false, null),
            new Property("/^Ice\.UDP\.RcvSize/", false, null),
            new Property("/^Ice\.UDP\.SndSize/", false, null),
            new Property("/^Ice\.TCP\.Backlog/", false, null),
            new Property("/^Ice\.TCP\.RcvSize/", false, null),
            new Property("/^Ice\.TCP\.SndSize/", false, null),
            new Property("/^Ice\.UseApplicationClassLoader/", false, null),
            new Property("/^Ice\.UseSyslog/", false, null),
            new Property("/^Ice\.Warn\.AMICallback/", false, null),
            new Property("/^Ice\.Warn\.Connections/", false, null),
            new Property("/^Ice\.Warn\.Datagrams/", false, null),
            new Property("/^Ice\.Warn\.Dispatch/", false, null),
            new Property("/^Ice\.Warn\.Endpoints/", false, null),
            new Property("/^Ice\.Warn\.UnknownProperties/", false, null),
            new Property("/^Ice\.Warn\.UnusedProperties/", false, null),
            new Property("/^Ice\.CacheMessageBuffers/", false, null),
            new Property("/^Ice\.ThreadInterruptSafe/", false, null),
            new Property("/^Ice\.Voip/", false, null),
        ];
        
        /* jshint +W044*/
        
        PropertyNames.validProps =
        [
            PropertyNames.IceProps,
        ];
        
        PropertyNames.clPropNames =
        [
            "Ice",
        ];
        
        Ice.PropertyNames = PropertyNames;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
            
        var HashMap = Ice.HashMap;
        var AlreadyRegisteredException = Ice.AlreadyRegisteredException;
        var NotRegisteredException = Ice.NotRegisteredException;
        
        //
        // Only for use by Instance
        //
        var ObjectFactoryManager = Ice.Class({
            __init__: function()
            {
                this._factoryMap = new HashMap(); // Map<String, ObjectFactory>
            },
            add: function(factory, id)
            {
                var o, ex;
                o = this._factoryMap.get(id);
                if(o !== undefined)
                {
                    ex = new AlreadyRegisteredException();
                    ex.id = id;
                    ex.kindOfObject = "object factory";
                    throw ex;
                }
                this._factoryMap.set(id, factory);
            },
            remove: function(id)
            {
                var factory, ex;
                factory = this._factoryMap.get(id);
                if(factory === undefined)
                {
                    ex = new NotRegisteredException();
                    ex.id = id;
                    ex.kindOfObject = "object factory";
                    throw ex;
                }
                this._factoryMap.delete(id);
                factory.destroy();
            },
            find: function(id)
            {
                return this._factoryMap.get(id);
            },
            destroy: function()
            {
                var oldMap = this._factoryMap,
                    e = oldMap.entries;
                this._factoryMap = new HashMap(); // Map<String, ObjectFactory>
        
                while(e !== null)
                {
                    e.value.destroy();
                    e = e.next;
                }
            }
        });
        
        Ice.ObjectFactoryManager = ObjectFactoryManager;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Promise = Ice.Promise;
        
        var AsyncResultBase = Ice.Class(Promise, {
            __init__: function(communicator, op, connection, proxy, adapter)
            {
                //
                // AsyncResultBase can be constructed by a sub-type's prototype, in which case the
                // arguments are undefined.
                //
                Promise.call(this);
                if(communicator !== undefined)
                {
                    this._communicator = communicator;
                    this._instance = communicator !== null ? communicator.instance : null;
                    this._operation = op;
                    this._connection = connection;
                    this._proxy = proxy;
                    this._adapter = adapter;
                }
            }
        });
        
        var prototype = AsyncResultBase.prototype;
        var defineProperty = Object.defineProperty;
        
        defineProperty(prototype, "communicator", {
            get: function() { return this._communicator; }
        });
        
        defineProperty(prototype, "connection", {
            get: function() { return this._connection; }
        });
        
        defineProperty(prototype, "proxy", {
            get: function() { return this._proxy; }
        });
        
        defineProperty(prototype, "adapter", {
            get: function() { return this._adapter; }
        });
        
        defineProperty(prototype, "operation", {
            get: function() { return this._operation; }
        });
        
        Ice.AsyncResultBase = AsyncResultBase;
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Current.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
            Slice.defineDictionary(Ice, "Context", "ContextHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
        
            /**
             * The {@link OperationMode} determines the retry behavior an
             * invocation in case of a (potentially) recoverable error.
             * 
             **/
            Ice.OperationMode = Slice.defineEnum([
                ['Normal', 0], ['Nonmutating', 1], ['Idempotent', 2]]);
        
            /**
             * Information about the current method invocation for servers. Each
             * operation on the server has a <tt>Current</tt> as its implicit final
             * parameter. <tt>Current</tt> is mostly used for Ice services. Most
             * applications ignore this parameter.
             * 
             **/
            Ice.Current = Slice.defineStruct(
                function(adapter, con, id, facet, operation, mode, ctx, requestId, encoding)
                {
                    this.adapter = adapter !== undefined ? adapter : null;
                    this.con = con !== undefined ? con : null;
                    this.id = id !== undefined ? id : new Ice.Identity();
                    this.facet = facet !== undefined ? facet : "";
                    this.operation = operation !== undefined ? operation : "";
                    this.mode = mode !== undefined ? mode : Ice.OperationMode.Normal;
                    this.ctx = ctx !== undefined ? ctx : null;
                    this.requestId = requestId !== undefined ? requestId : 0;
                    this.encoding = encoding !== undefined ? encoding : new Ice.EncodingVersion();
                },
                false);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        Ice.ObjectFactory = Ice.Class({
            create: function(type)
            {
                throw new Error("not implemented");
            },
            destroy: function()
            {
                throw new Error("not implemented");
            }
        });
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var RetryException = Ice.Class(Error, {
            __init__: function(ex)
            {
                if(ex instanceof Ice.LocalException)
                {
                    this._ex = ex;
                }
                else
                {
                    Ice.Debug.assert(ex instanceof RetryException);
                    this._ex = ex._ex;
                }
            }
        });
        
        var prototype = RetryException.prototype;
        
        Object.defineProperty(prototype, "inner", {
            get: function() { return this._ex; }
        });
        
        Ice.RetryException = RetryException;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `EndpointTypes.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            /**
             * Determines the order in which the Ice run time uses the endpoints
             * in a proxy when establishing a connection.
             * 
             **/
            Ice.EndpointSelectionType = Slice.defineEnum([
                ['Random', 0], ['Ordered', 1]]);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Promise = Ice.Promise;
        var ReferenceMode = Ice.ReferenceMode;
        
        var ConnectionRequestHandler = Ice.Class({
            __init__: function(ref, connection, compress)
            {
                this._reference = ref;
                this._response = ref.getMode() == ReferenceMode.ModeTwoway;
                this._connection = connection;
                this._compress = compress;
            },
            update: function(previousHandler, newHandler)
            {
                try
                {
                    if(previousHandler === this)
                    {
                        return newHandler;
                    }
                    else if(previousHandler.getConnection() === this._connection)
                    {
                        //
                        // If both request handlers point to the same connection, we also
                        // update the request handler. See bug ICE-5489 for reasons why
                        // this can be useful.
                        //
                        return newHandler;
                    }
                }
                catch(ex)
                {
                    // Ignore
                }
                return this;
            },
            sendAsyncRequest: function(out)
            {
                return out.__invokeRemote(this._connection, this._compress, this._response);
            },
            asyncRequestCanceled: function(out)
            {
                return this._connection.asyncRequestCanceled(out);
            },
            getReference: function()
            {
                return this._reference;
            },
            getConnection: function()
            {
                return this._connection;
            },
        });
        
        Ice.ConnectionRequestHandler = ConnectionRequestHandler;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        //
        // Local aliases.
        //
        var Debug = Ice.Debug;
        var HashMap = Ice.HashMap;
        var Protocol = Ice.Protocol;
        var StringUtil = Ice.StringUtil;
        var OperationMode = Ice.OperationMode;
        var Identity = Ice.Identity;
        
        var TraceUtil = {};
        
        TraceUtil.traceSend = function(stream, logger, traceLevels)
        {
            if(traceLevels.protocol >= 1)
            {
                var p = stream.pos;
                stream.pos = 0;
        
                var s = [];
                var type = printMessage(s, stream);
        
                logger.trace(traceLevels.protocolCat, "sending " + getMessageTypeAsString(type) + " " + s.join(""));
        
                stream.pos = p;
            }
        };
        
        TraceUtil.traceRecv = function(stream, logger, traceLevels)
        {
            if(traceLevels.protocol >= 1)
            {
                var p = stream.pos;
                stream.pos = 0;
        
                var s = [];
                var type = printMessage(s, stream);
        
                logger.trace(traceLevels.protocolCat, "received " + getMessageTypeAsString(type) + " " + s.join(""));
        
                stream.pos = p;
            }
        };
        
        TraceUtil.trace = function(heading, stream, logger, traceLevels)
        {
            if(traceLevels.protocol >= 1)
            {
                var p = stream.pos;
                stream.pos = 0;
        
                var s = [];
                s.push(heading);
                printMessage(s, stream);
        
                logger.trace(traceLevels.protocolCat, s.join(""));
                stream.pos = p;
            }
        };
        
        var slicingIds = new HashMap();
        
        function traceSlicing(kind, typeId, slicingCat, logger)
        {
            if(!slicingIds.has(typeId))
            {
                var s = "unknown " + kind + " type `" + typeId + "'";
                logger.trace(slicingCat, s);
                slicingIds.set(typeId, 1);
            }
        }
        
        TraceUtil.dumpStream = function(stream)
        {
            var pos = stream.pos;
            stream.pos = 0;
        
            var data = stream.readBlob(stream.size());
            TraceUtil.dumpOctets(data);
        
            stream.pos = pos;
        };
        
        TraceUtil.dumpOctets = function(data)
        {
            var inc = 8;
            var buf = [];
        
            for(var i = 0; i < data.length; i += inc)
            {
                var j;
                for(j = i; j - i < inc; j++)
                {
                    if(j < data.length)
                    {
                        var n = data[j];
                        if(n < 0)
                        {
                            n += 256;
                        }
                        var s;
                        if(n < 10)
                        {
                            s = "  " + n;
                        }
                        else if(n < 100)
                        {
                            s = " " + n;
                        }
                        else
                        {
                            s = "" + n;
                        }
                        buf.push(s + " ");
                    }
                    else
                    {
                        buf.push("    ");
                    }
                }
        
                buf.push('"');
        
                for(j = i; j < data.length && j - i < inc; j++)
                {
                    if(data[j] >= 32 && data[j] < 127)
                    {
                        buf.push(String.fromCharCode(data[j]));
                    }
                    else
                    {
                        buf.push('.');
                    }
                }
        
                buf.push("\"\n");
            }
        
            console.log(buf.join(""));
        };
        
        Ice.TraceUtil = TraceUtil;
        
        function printIdentityFacetOperation(s, stream)
        {
            var identity = new Identity();
            identity.__read(stream);
            s.push("\nidentity = " + stream.instance.identityToString(identity));
        
            var facet = Ice.StringSeqHelper.read(stream);
            s.push("\nfacet = ");
            if(facet.length > 0)
            {
                s.push(StringUtil.escapeString(facet[0], ""));
            }
        
            var operation = stream.readString();
            s.push("\noperation = " + operation);
        }
        
        function printRequest(s, stream)
        {
            var requestId = stream.readInt();
            s.push("\nrequest id = " + requestId);
            if(requestId === 0)
            {
                s.push(" (oneway)");
            }
        
            printRequestHeader(s, stream);
        }
        
        function printBatchRequest(s, stream)
        {
            var batchRequestNum = stream.readInt();
            s.push("\nnumber of requests = " + batchRequestNum);
        
            for(var i = 0; i < batchRequestNum; ++i)
            {
                s.push("\nrequest #" + i + ':');
                printRequestHeader(s, stream);
            }
        }
        
        function printReply(s, stream)
        {
            var requestId = stream.readInt();
            s.push("\nrequest id = " + requestId);
        
            var replyStatus = stream.readByte();
            s.push("\nreply status = " + replyStatus + ' ');
        
            switch(replyStatus)
            {
            case Protocol.replyOK:
            {
                s.push("(ok)");
                break;
            }
        
            case Protocol.replyUserException:
            {
                s.push("(user exception)");
                break;
            }
        
            case Protocol.replyObjectNotExist:
            case Protocol.replyFacetNotExist:
            case Protocol.replyOperationNotExist:
            {
                switch(replyStatus)
                {
                case Protocol.replyObjectNotExist:
                {
                    s.push("(object not exist)");
                    break;
                }
        
                case Protocol.replyFacetNotExist:
                {
                    s.push("(facet not exist)");
                    break;
                }
        
                case Protocol.replyOperationNotExist:
                {
                    s.push("(operation not exist)");
                    break;
                }
        
                default:
                {
                    Debug.assert(false);
                    break;
                }
                }
        
                printIdentityFacetOperation(s, stream);
                break;
            }
        
            case Protocol.replyUnknownException:
            case Protocol.replyUnknownLocalException:
            case Protocol.replyUnknownUserException:
            {
                switch(replyStatus)
                {
                case Protocol.replyUnknownException:
                {
                    s.push("(unknown exception)");
                    break;
                }
        
                case Protocol.replyUnknownLocalException:
                {
                    s.push("(unknown local exception)");
                    break;
                }
        
                case Protocol.replyUnknownUserException:
                {
                    s.push("(unknown user exception)");
                    break;
                }
        
                default:
                {
                    Debug.assert(false);
                    break;
                }
                }
        
                var unknown = stream.readString();
                s.push("\nunknown = " + unknown);
                break;
            }
        
            default:
            {
                s.push("(unknown)");
                break;
            }
            }
        
            if(replyStatus === Protocol.replyOK || replyStatus === Protocol.replyUserException)
            {
                var ver = stream.skipEncaps();
                if(!ver.equals(Ice.Encoding_1_0))
                {
                    s.push("\nencoding = ");
                    s.push(Ice.encodingVersionToString(ver));
                }
            }
        }
        
        function printRequestHeader(s, stream)
        {
            printIdentityFacetOperation(s, stream);
        
            var mode = stream.readByte();
            s.push("\nmode = " + mode + ' ');
            switch(OperationMode.valueOf(mode))
            {
                case OperationMode.Normal:
                {
                    s.push("(normal)");
                    break;
                }
        
                case OperationMode.Nonmutating:
                {
                    s.push("(nonmutating)");
                    break;
                }
        
                case OperationMode.Idempotent:
                {
                    s.push("(idempotent)");
                    break;
                }
        
                default:
                {
                    s.push("(unknown)");
                    break;
                }
            }
        
            var sz = stream.readSize();
            s.push("\ncontext = ");
            while(sz-- > 0)
            {
                var key = stream.readString();
                var value = stream.readString();
                s.push(key + '/'+ value);
                if(sz > 0)
                {
                    s.push(", ");
                }
            }
        
            var ver = stream.skipEncaps();
            if(!ver.equals(Ice.Encoding_1_0))
            {
                s.push("\nencoding = ");
                s.push(Ice.encodingVersionToString(ver));
            }
        }
        
        function printHeader(s, stream)
        {
            stream.readByte();  // Don't bother printing the magic number
            stream.readByte();
            stream.readByte();
            stream.readByte();
        
        //        var pMajor = stream.readByte();
        //        var pMinor = stream.readByte();
        //        s.push("\nprotocol version = " + pMajor + "." + pMinor);
            stream.readByte(); // major
            stream.readByte(); // minor
        
        //        var eMajor = stream.readByte();
        //        var eMinor = stream.readByte();
        //        s.push("\nencoding version = " + eMajor + "." + eMinor);
            stream.readByte(); // major
            stream.readByte(); // minor
        
            var type = stream.readByte();
        
            s.push("\nmessage type = " + type + " (" + getMessageTypeAsString(type) + ')');
            var compress = stream.readByte();
            s.push("\ncompression status = " + compress + ' ');
            switch(compress)
            {
                case 0:
                {
                    s.push("(not compressed; do not compress response, if any)");
                    break;
                }
        
                case 1:
                {
                    s.push("(not compressed; compress response, if any)");
                    break;
                }
        
                case 2:
                {
                    s.push("(compressed; compress response, if any)");
                    break;
                }
        
                default:
                {
                    s.push("(unknown)");
                    break;
                }
            }
        
            var size = stream.readInt();
            s.push("\nmessage size = " + size);
            return type;
        }
        
        function printMessage(s, stream)
        {
            var type = printHeader(s, stream);
        
            switch(type)
            {
            case Protocol.closeConnectionMsg:
            case Protocol.validateConnectionMsg:
            {
                // We're done.
                break;
            }
        
            case Protocol.requestMsg:
            {
                printRequest(s, stream);
                break;
            }
        
            case Protocol.requestBatchMsg:
            {
                printBatchRequest(s, stream);
                break;
            }
        
            case Protocol.replyMsg:
            {
                printReply(s, stream);
                break;
            }
        
            default:
            {
                break;
            }
            }
        
            return type;
        }
        
        function getMessageTypeAsString(type)
        {
            switch(type)
            {
            case Protocol.requestMsg:
                return "request";
            case Protocol.requestBatchMsg:
                return "batch request";
            case Protocol.replyMsg:
                return "reply";
            case Protocol.closeConnectionMsg:
                return "close connection";
            case Protocol.validateConnectionMsg:
                return  "validate connection";
            default:
                return "unknown";
            }
        }
        
    }());

    (function()
    {
        
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var Logger = Ice.Logger;
        
        var processLogger = null;
        
        Ice.getProcessLogger = function()
        {
            if(processLogger === null)
            {
                //
                // TODO: Would be nice to be able to use process name as prefix by default.
                //
                processLogger = new Logger("", "");
            }
        
            return processLogger;
        };
        
        Ice.setProcessLogger = function(logger)
        {
            processLogger = logger;
        };
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        //
        // Local aliases.
        //
        var UnexpectedObjectException = Ice.UnexpectedObjectException;
        var MemoryLimitException = Ice.MemoryLimitException;
        
        //
        // Exception utilities
        //
        
        Ice.ExUtil =
        {
            throwUOE: function(expectedType, v)
            {
                var type = v.ice_id();
                throw new UnexpectedObjectException("expected element of type `" + expectedType + "' but received '" +
                                                    type, type, expectedType);
            },
            throwMemoryLimitException: function(requested, maximum)
            {
                throw new MemoryLimitException("requested " + requested + " bytes, maximum allowed is " + maximum +
                                               " bytes (see Ice.MessageSizeMax)");
            }
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        
        var StringUtil = Ice.StringUtil;
        var HashMap = Ice.HashMap;
        var Promise = Ice.Promise;
        var PropertyNames = Ice.PropertyNames;
        var Debug = Ice.Debug;
        var ProcessLogger = Ice.ProcessLogger;
        var getProcessLogger = Ice.getProcessLogger;
        var InitializationException = Ice.InitializationException;
        
        var ParseStateKey = 0;
        var ParseStateValue = 1;
        //
        // Ice.Properties
        //
        var Properties = Ice.Class({
            __init__: function(args, defaults)
            {
                this._properties = new HashMap();
        
                if(defaults !== undefined && defaults !== null)
                {
                    //
                    // NOTE: we can't just do a shallow copy of the map as the map values
                    // would otherwise be shared between the two PropertiesI object.
                    //
                    //_properties = new HashMap(pi._properties);
                    for(var e = defaults._properties.entries; e !== null; e = e.next)
                    {
                        this._properties.set(e.key, { 'value': e.value.value, 'used': false });
                    }
                }
        
                if(args !== undefined && args !== null)
                {
                    var v = this.parseIceCommandLineOptions(args);
                    args.length = 0;
                    for(var i = 0; i < v.length; ++i)
                    {
                        args.push(v[i]);
                    }
                }
            },
            getProperty: function(key)
            {
                return this.getPropertyWithDefault(key, "");
            },
            getPropertyWithDefault: function(key, value)
            {
                var pv = this._properties.get(key);
                if(pv !== undefined)
                {
                    pv.used = true;
                    return pv.value;
                }
                else
                {
                    return value;
                }
            },
            getPropertyAsInt: function(key)
            {
                return this.getPropertyAsIntWithDefault(key, 0);
            },
            getPropertyAsIntWithDefault: function(key, value)
            {
                var pv = this._properties.get(key);
                if(pv !== undefined)
                {
                    pv.used = true;
                    return parseInt(pv.value);
                }
                else
                {
                    return value;
                }
            },
            getPropertyAsList: function(key)
            {
                return this.getPropertyAsListWithDefault(key, 0);
            },
            getPropertyAsListWithDefault: function(key, value)
            {
                if(value === undefined || value === null)
                {
                    value = [];
                }
        
                var pv = this._properties.get(key);
                if(pv !== undefined)
                {
                    pv.used = true;
        
                    var result = StringUtil.splitString(pv.value, ", \t\r\n");
                    if(result === null)
                    {
                        getProcessLogger().warning("mismatched quotes in property " + key + "'s value, returning default value");
                        return value;
                    }
                    if(result.length === 0)
                    {
                        result = value;
                    }
                    return result;
                }
                else
                {
                    return value;
                }
            },
            getPropertiesForPrefix: function(prefix)
            {
                var result = new HashMap();
                for(var e = this._properties.entries; e !== null; e = e.next)
                {
                    if(prefix === undefined || prefix === null || e.key.indexOf(prefix) === 0)
                    {
                        e.value.used = true;
                        result.set(e.key, e.value.value);
                    }
                }
                return result;
            },
            setProperty: function(key, value)
            {
                //
                // Trim whitespace
                //
                if(key !== null && key !== undefined)
                {
                    key = key.trim();
                }
        
                //
                // Check if the property is legal.
                //
                var logger = getProcessLogger();
                if(key === null || key === undefined || key.length === 0)
                {
                    throw new InitializationException("Attempt to set property with empty key");
                }
        
                var dotPos = key.indexOf(".");
                if(dotPos !== -1)
                {
                    var prefix = key.substr(0, dotPos);
                    for(var i = 0; i < PropertyNames.validProps.length; ++i)
                    {
                        var pattern = PropertyNames.validProps[i][0].pattern;
                        dotPos = pattern.indexOf(".");
                        //
                        // Each top level prefix describes a non-empty namespace. Having a string without a
                        // prefix followed by a dot is an error.
                        //
                        Debug.assert(dotPos != -1);
                        var propPrefix = pattern.substring(0, dotPos - 1);
                        if(propPrefix != prefix)
                        {
                            continue;
                        }
                        
                        var found = false;
                        var mismatchCase = false;
                        var otherKey;
                        for(var j = 0; j < PropertyNames.validProps[i][j].length && !found; ++j)
                        {
                            pattern = PropertyNames.validProps[i][j].pattern();
                            var pComp = new RegExp(pattern);
                            found = pComp.test(key);
        
                            if(found && PropertyNames.validProps[i][j].deprecated)
                            {
                                logger.warning("deprecated property: " + key);
                                if(PropertyNames.validProps[i][j].deprecatedBy !== null)
                                {
                                    key = PropertyNames.validProps[i][j].deprecatedBy;
                                }
                            }
                            
                            if(found)
                            {
                                break;
                            }
                            else
                            {
                                pComp = new RegExp(pattern.toUpperCase());
                                found = pComp.test(key.toUpperCase());
                                if(found)
                                {
                                    mismatchCase = true;
                                    otherKey = pattern.substr(2);
                                    otherKey = otherKey.substr(0, otherKey.length -1);
                                    otherKey = otherKey.replace(/\\/g, "");
                                    break;
                                }
                            }
                        }
                        
                        if(!found)
                        {
                            logger.warning("unknown property: " + key);
                        }
                        else if(mismatchCase)
                        {
                            logger.warning("unknown property: `" + key + "'; did you mean `" + otherKey + "'");
                        }
                    }
                }
        
                //
                // Set or clear the property.
                //
                if(value !== undefined && value !== null && value.length > 0)
                {
                    var pv = this._properties.get(key);
                    if(pv !== undefined)
                    {
                        pv.value = value;
                    }
                    else
                    {
                        this._properties.set(key, { 'value': value, 'used': false });
                    }
                }
                else
                {
                    this._properties.delete(key);
                }
            },
            getCommandLineOptions: function()
            {
                var result = [];
                for(var e = this._properties.entries; e !== null; e = e.next)
                {
                    result.push("--" + e.key + "=" + e.pv.value);
                }
                return result;
            },
            parseCommandLineOptions: function(pfx, options)
            {
                if(pfx.length > 0 && pfx.charAt(pfx.length - 1) != ".")
                {
                    pfx += ".";
                }
                pfx = "--" + pfx;
        
                var result = [];
                
                var self = this;
                options.forEach(
                    function(opt)
                    {
                        if(opt.indexOf(pfx) === 0)
                        {
                            if(opt.indexOf('=') === -1)
                            {
                                opt += "=1";
                            }
        
                            self.parseLine(opt.substring(2));
                        }
                        else
                        {
                            result.push(opt);
                        }
                    });
                return result;
            },
            parseIceCommandLineOptions: function(options)
            {
                var args = options.slice();
                for(var i = 0; i < PropertyNames.clPropNames.length; ++i)
                {
                    args = this.parseCommandLineOptions(PropertyNames.clPropNames[i], args);
                }
                return args;
            },
            parse: function(data)
            {
                var lines = data.match(/[^\r\n]+/g);
                
                var line;
                
                while((line = lines.shift()))
                {
                    this.parseLine(line);
                }
            },
            parseLine: function(line)
            {
                var key = "";
                var value = "";
        
                var state = ParseStateKey;
        
                var whitespace = "";
                var escapedspace = "";
                var finished = false;
                
                for(var i = 0; i < line.length; ++i)
                {
                    var c = line.charAt(i);
                    switch(state)
                    {
                        case ParseStateKey:
                        {
                            switch(c)
                            {
                                case '\\':
                                    if(i < line.length - 1)
                                    {
                                        c = line.charAt(++i);
                                        switch(c)
                                        {
                                            case '\\':
                                            case '#':
                                            case '=':
                                                key += whitespace;
                                                whitespace = "";
                                                key += c;
                                                break;
        
                                            case ' ':
                                                if(key.length !== 0)
                                                {
                                                    whitespace += c;
                                                }
                                                break;
        
                                            default:
                                                key += whitespace;
                                                whitespace = "";
                                                key += '\\';
                                                key += c;
                                                break;
                                        }
                                    }
                                    else
                                    {
                                        key += whitespace;
                                        key += c;
                                    }
                                    break;
        
                                case ' ':
                                case '\t':
                                case '\r':
                                case '\n':
                                    if(key.length !== 0)
                                    {
                                        whitespace += c;
                                    }
                                    break;
        
                                case '=':
                                    whitespace = "";
                                    state = ParseStateValue;
                                    break;
        
                                case '#':
                                    finished = true;
                                    break;
        
                                default:
                                    key += whitespace;
                                    whitespace = "";
                                    key += c;
                                    break;
                            }
                            break;
                        }
        
                        case ParseStateValue:
                        {
                            switch(c)
                            {
                                case '\\':
                                    if(i < line.length - 1)
                                    {
                                        c = line.charAt(++i);
                                        switch(c)
                                        {
                                            case '\\':
                                            case '#':
                                            case '=':
                                                value += value.length === 0 ? escapedspace : whitespace;
                                                whitespace = "";
                                                escapedspace = "";
                                                value += c;
                                                break;
        
                                            case ' ':
                                                whitespace += c;
                                                escapedspace += c;
                                                break;
        
                                            default:
                                                value += value.length === 0 ? escapedspace : whitespace;
                                                whitespace = "";
                                                escapedspace = "";
                                                value += '\\';
                                                value += c;
                                                break;
                                        }
                                    }
                                    else
                                    {
                                        value += value.length === 0 ? escapedspace : whitespace;
                                        value += c;
                                    }
                                    break;
        
                                case ' ':
                                case '\t':
                                case '\r':
                                case '\n':
                                    if(value.length !== 0)
                                    {
                                        whitespace += c;
                                    }
                                    break;
        
                                case '#':
                                    finished = true;
                                    break;
        
                                default:
                                    value += value.length === 0 ? escapedspace : whitespace;
                                    whitespace = "";
                                    escapedspace = "";
                                    value += c;
                                    break;
                            }
                            break;
                        }
                    }
                    if(finished)
                    {
                        break;
                    }
                }
                value += escapedspace;
        
                if((state === ParseStateKey && key.length !== 0) ||
                (state == ParseStateValue && key.length === 0))
                {
                    getProcessLogger().warning("invalid config file entry: \"" + line + "\"");
                    return;
                }
                else if(key.length === 0)
                {
                    return;
                }
                
                this.setProperty(key, value);
            },
            clone: function()
            {
                return new Properties(null, this);
            },
            getUnusedProperties: function()
            {
                var unused = [];
                for(var e = this._properties.entries; e !== null; e = e.next)
                {
                    if(!e.pv.used)
                    {
                        unused.push(e.key);
                    }
                }
                return unused;
            }
        });
        
        Properties.createProperties = function(args, defaults)
        {
            return new Properties(args, defaults);
        };
        
        Ice.Properties = Properties;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Debug = Ice.Debug;
        var HashMap = Ice.HashMap;
        var StringUtil = Ice.StringUtil;
        
        //
        // Only for use by Ice.ObjectAdatperI.
        //
        var ServantManager = Ice.Class({
            __init__: function(instance, adapterName)
            {
                this._instance = instance;
                this._adapterName = adapterName;
                this._servantMapMap = new HashMap(HashMap.compareEquals);        // Map<Ice.Identity, Map<String, Ice.Object> >
                this._defaultServantMap = new HashMap();    // Map<String, Ice.Object>
                this._locatorMap = new HashMap();           // Map<String, Ice.ServantLocator>
            },
            addServant: function(servant, ident, facet)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                if(facet === null)
                {
                    facet = "";
                }
        
                var m = this._servantMapMap.get(ident);
                if(m === undefined)
                {
                    m = new HashMap();
                    this._servantMapMap.set(ident, m);
                }
                else
                {
                    if(m.has(facet))
                    {
                        var ex = new Ice.AlreadyRegisteredException();
                        ex.id = this._instance.identityToString(ident);
                        ex.kindOfObject = "servant";
                        if(facet.length > 0)
                        {
                            ex.id += " -f " + StringUtil.escapeString(facet, "");
                        }
                        throw ex;
                    }
                }
        
                m.set(facet, servant);
            },
            addDefaultServant: function(servant, category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction
        
                var obj = this._defaultServantMap.get(category);
                if(obj !== undefined)
                {
                    var ex = new Ice.AlreadyRegisteredException();
                    ex.kindOfObject = "default servant";
                    ex.id = category;
                    throw ex;
                }
        
                this._defaultServantMap.set(category, servant);
            },
            removeServant: function(ident, facet)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                if(facet === null)
                {
                    facet = "";
                }
        
                var m = this._servantMapMap.get(ident);
                if(m === undefined || !m.has(facet))
                {
                    var ex = new Ice.NotRegisteredException();
                    ex.id = this._instance.identityToString(ident);
                    ex.kindOfObject = "servant";
                    if(facet.length > 0)
                    {
                        ex.id += " -f " + StringUtil.escapeString(facet, "");
                    }
                    throw ex;
                }
        
                var obj = m.get(facet);
                m.delete(facet);
        
                if(m.size === 0)
                {
                    this._servantMapMap.delete(ident);
                }
        
                return obj;
            },
            removeDefaultServant: function(category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                var obj = this._defaultServantMap.get(category);
                if(obj === undefined)
                {
                    var ex = new Ice.NotRegisteredException();
                    ex.kindOfObject = "default servant";
                    ex.id = category;
                    throw ex;
                }
        
                this._defaultServantMap.delete(category);
                return obj;
            },
            removeAllFacets: function(ident)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                var m = this._servantMapMap.get(ident);
                if(m === undefined)
                {
                    var ex = new Ice.NotRegisteredException();
                    ex.id = this._instance.identityToString(ident);
                    ex.kindOfObject = "servant";
                    throw ex;
                }
        
                this._servantMapMap.delete(ident);
        
                return m;
            },
            findServant: function(ident, facet)
            {
                //
                // This assert is not valid if the adapter dispatch incoming
                // requests from bidir connections. This method might be called if
                // requests are received over the bidir connection after the
                // adapter was deactivated.
                //
                //Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                if(facet === null)
                {
                    facet = "";
                }
        
                var m = this._servantMapMap.get(ident);
                var obj = null;
                if(m === undefined)
                {
                    obj = this._defaultServantMap.get(ident.category);
                    if(obj === undefined)
                    {
                        obj = this._defaultServantMap.get("");
                    }
                }
                else
                {
                    obj = m.get(facet);
                }
        
                return obj === undefined ? null : obj;
            },
            findDefaultServant: function(category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                var ds = this._defaultServantMap.get(category);
                return ds === undefined ? null : ds;
            },
            findAllFacets: function(ident)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                var m = this._servantMapMap.get(ident);
                if(m !== undefined)
                {
                    return m.clone();
                }
        
                return new HashMap();
            },
            hasServant: function(ident)
            {
                //
                // This assert is not valid if the adapter dispatch incoming
                // requests from bidir connections. This method might be called if
                // requests are received over the bidir connection after the
                // adapter was deactivated.
                //
                //Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                var m = this._servantMapMap.get(ident);
                if(m === undefined)
                {
                    return false;
                }
                else
                {
                    Debug.assert(m.size > 0);
                    return true;
                }
            },
            addServantLocator: function(locator, category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                var l = this._locatorMap.get(category);
                if(l !== undefined)
                {
                    var ex = new Ice.AlreadyRegisteredException();
                    ex.id = StringUtil.escapeString(category, "");
                    ex.kindOfObject = "servant locator";
                    throw ex;
                }
        
                this._locatorMap.set(category, locator);
            },
            removeServantLocator: function(category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                var l = this._locatorMap.get(category);
                if(l === undefined)
                {
                    var ex = new Ice.NotRegisteredException();
                    ex.id = StringUtil.escapeString(category, "");
                    ex.kindOfObject = "servant locator";
                    throw ex;
                }
                this._locatorMap.delete(category);
                return l;
            },
            findServantLocator: function(category)
            {
                //
                // This assert is not valid if the adapter dispatch incoming
                // requests from bidir connections. This method might be called if
                // requests are received over the bidir connection after the
                // adapter was deactivated.
                //
                //Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                var l = this._locatorMap.get(category);
                return l === undefined ? null : l;
            },
            //
            // Only for use by Ice.ObjectAdapterI.
            //
            destroy: function()
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
                var logger = this._instance.initializationData().logger;
                this._servantMapMap.clear();
        
                this._defaultServantMap.clear();
        
                var locatorMap = this._locatorMap.clone();
                this._locatorMap.clear();
                this._instance = null;
        
                for(var e = locatorMap.entries; e !== null; e = e.next)
                {
                    var locator = e.value;
                    try
                    {
                        locator.deactivate(e.key);
                    }
                    catch(ex)
                    {
                        var s = "exception during locator deactivation:\n" + "object adapter: `" + this._adapterName +
                            "'\n" + "locator category: `" + e.key + "'\n" + ex.toString();
                        logger.error(s);
                    }
                }
            }
        });
        
        Ice.ServantManager = ServantManager;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var __M = Ice.__M;
        
        var Debug = Ice.Debug;
        var ExUtil = Ice.ExUtil;
        var FormatType = Ice.FormatType;
        var HashMap = Ice.HashMap;
        var IceObject = Ice.Object;
        var OptionalFormat = Ice.OptionalFormat;
        var Protocol = Ice.Protocol;
        var TraceUtil = Ice.TraceUtil;
        var ArrayUtil = Ice.ArrayUtil;
        var SlicedData = Ice.SlicedData;
        
        var SliceType = {};
        SliceType.NoSlice = 0;
        SliceType.ObjectSlice = 1;
        SliceType.ExceptionSlice = 2;
        
        var OPTIONAL_END_MARKER           = 0xFF;
        var FLAG_HAS_TYPE_ID_STRING       = (1<<0);
        var FLAG_HAS_TYPE_ID_INDEX        = (1<<1);
        var FLAG_HAS_TYPE_ID_COMPACT      = (1<<1 | 1<<0);
        var FLAG_HAS_OPTIONAL_MEMBERS     = (1<<2);
        var FLAG_HAS_INDIRECTION_TABLE    = (1<<3);
        var FLAG_HAS_SLICE_SIZE           = (1<<4);
        var FLAG_IS_LAST_SLICE            = (1<<5);
        
        var IndirectPatchEntry = function(index, patcher)
        {
            this.index = index;
            this.patcher = patcher;
        };
        
        var Class = Ice.Class;
        
        var EncapsDecoder = Class({
            __init__: function(stream, encaps, sliceObjects, f)
            {
                this._stream = stream;
                this._encaps = encaps;
                this._sliceObjects = sliceObjects;
                this._servantFactoryManager = f;
                this._patchMap = null; // Lazy initialized, HashMap<int, Patcher[] >()
                this._unmarshaledMap = new HashMap(); // HashMap<int, Ice.Object>()
                this._typeIdMap = null; // Lazy initialized, HashMap<int, String>
                this._typeIdIndex = 0;
                this._objectList = null; // Lazy initialized. Ice.Object[]
            },
            readOpt: function()
            {
                return false;
            },
            readPendingObjects: function()
            {
            },
            readTypeId: function(isIndex)
            {
                var typeId, index;
                if(this._typeIdMap === null) // Lazy initialization
                {
                    this._typeIdMap = new HashMap(); // Map<int, String>();
                }
        
                if(isIndex)
                {
                    index = this._stream.readSize();
                    typeId = this._typeIdMap.get(index);
                    if(typeId === undefined)
                    {
                        throw new Ice.UnmarshalOutOfBoundsException();
                    }
                }
                else
                {
                    typeId = this._stream.readString();
                    this._typeIdMap.set(++this._typeIdIndex, typeId);
                }
                return typeId;
            },
            newInstance: function(typeId)
            {
                //
                // Try to find a factory registered for the specific type.
                //
                var userFactory = this._servantFactoryManager.find(typeId);
                var v = null;
        
                if(userFactory !== undefined)
                {
                    v = userFactory.create(typeId);
                }
        
                //
                // If that fails, invoke the default factory if one has been
                // registered.
                //
                if(v === null || v === undefined)
                {
                    userFactory = this._servantFactoryManager.find("");
                    if(userFactory !== undefined)
                    {
                        v = userFactory.create(typeId);
                    }
                }
        
                //
                // Last chance: try to instantiate the class dynamically.
                //
                if(v === null || v === undefined)
                {
                    v = this._stream.createObject(typeId);
                }
        
                return v;
            },
            addPatchEntry: function(index, patcher)
            {
                Debug.assert(index > 0);
                //
                // Check if already un-marshalled the object. If that's the case,
                // just patch the object smart pointer and we're done.
                //
                var obj = this._unmarshaledMap.get(index);
                if(obj !== undefined && obj !== null)
                {
                    patcher.call(null, obj);
                    return;
                }
        
                if(this._patchMap === null) // Lazy initialization
                {
                    this._patchMap = new HashMap(); // HashMap<Integer, Patcher[] >();
                }
        
                //
                // Add patch entry if the object isn't un-marshalled yet,
                // the smart pointer will be patched when the instance is
                // un-marshalled.
                //
                var l = this._patchMap.get(index);
                if(l === undefined)
                {
                    //
                    // We have no outstanding instances to be patched for this
                    // index, so make a new entry in the patch map.
                    //
                    l = []; // Patcher[];
                    this._patchMap.set(index, l);
                }
        
                //
                // Append a patch entry for this instance.
                //
                l.push(patcher);
            },
            unmarshal: function(index, v)
            {
                var i, length, l;
                //
                // Add the object to the map of un-marshalled objects, this must
                // be done before reading the objects (for circular references).
                //
                this._unmarshaledMap.set(index, v);
        
                //
                // Read the object.
                //
                v.__read(this._stream);
                if(this._patchMap !== null)
                {
                    //
                    // Patch all instances now that the object is un-marshalled.
                    //
                    l = this._patchMap.get(index);
                    if(l !== undefined)
                    {
                        Debug.assert(l.length > 0);
                        //
                        // Patch all pointers that refer to the instance.
                        //
                        for(i = 0, length = l.length; i < length; ++i)
                        {
                            l[i](v);
                        }
                        //
                        // Clear out the patch map for that index -- there is nothing left
                        // to patch for that index for the time being.
                        //
                        this._patchMap.delete(index);
                    }
                }
        
                if((this._patchMap === null || this._patchMap.size === 0) && this._objectList === null)
                {
                    try
                    {
                        v.ice_postUnmarshal();
                    }
                    catch(ex)
                    {
                        this._stream.instance.initializationData().logger.warning("exception raised by ice_postUnmarshal:\n" +
        									  ex.toString());
                    }
                }
                else
                {
                    if(this._objectList === null) // Lazy initialization
                    {
                        this._objectList = []; // Ice.Object[]
                    }
                    this._objectList.push(v);
        
                    if(this._patchMap === null || this._patchMap.size === 0)
                    {
                        //
                        // Iterate over the object list and invoke ice_postUnmarshal on
                        // each object.  We must do this after all objects have been
                        // unmarshaled in order to ensure that any object data members
                        // have been properly patched.
                        //
                        for(i = 0, length = this._objectList.length; i < length; i++)
                        {
                            try
                            {
                                this._objectList[i].ice_postUnmarshal();
                            }
                            catch(ex)
                            {
                                this._stream.instance.initializationData().logger.warning(
                                                                    "exception raised by ice_postUnmarshal:\n" + ex.toString());
                            }
                        }
                        this._objectList = [];
                    }
                }
            }
        });
        
        var EncapsDecoder10 = Class(EncapsDecoder, {
            __init__: function(stream, encaps, sliceObjects, f)
            {
                EncapsDecoder.call(this, stream, encaps, sliceObjects, f);
                this._sliceType = SliceType.NoSlice;
            },
            readObject: function(patcher)
            {
                Debug.assert(patcher !== null);
        
                //
                // Object references are encoded as a negative integer in 1.0.
                //
                var index = this._stream.readInt();
                if(index > 0)
                {
                    throw new Ice.MarshalException("invalid object id");
                }
                index = -index;
        
                if(index === 0)
                {
                    patcher.call(null, null);
                }
                else
                {
                    this.addPatchEntry(index, patcher);
                }
            },
            throwException: function()
            {
                Debug.assert(this._sliceType === SliceType.NoSlice);
        
                //
                // User exception with the 1.0 encoding start with a boolean flag
                // that indicates whether or not the exception has classes.
                //
                // This allows reading the pending objects even if some part of
                // the exception was sliced.
                //
                var usesClasses = this._stream.readBool();
                this._sliceType = SliceType.ExceptionSlice;
                this._skipFirstSlice = false;
        
                //
                // Read the first slice header.
                //
                this.startSlice();
                var mostDerivedId = this._typeId;
                while(true)
                {
                    var userEx = this._stream.createUserException(this._typeId);
        
                    //
                    // We found the exception.
                    //
                    if(userEx !== null)
                    {
                        userEx.__read(this._stream);
                        if(usesClasses)
                        {
                            this.readPendingObjects();
                        }
                        throw userEx;
        
                        // Never reached.
                    }
        
                    //
                    // Slice off what we don't understand.
                    //
                    this.skipSlice();
                    try
                    {
                        this.startSlice();
                    }
                    catch(ex)
                    {
                        //
                        // An oversight in the 1.0 encoding means there is no marker to indicate
                        // the last slice of an exception. As a result, we just try to read the
                        // next type ID, which raises UnmarshalOutOfBoundsException when the
                        // input buffer underflows.
                        //
                        // Set the reason member to a more helpful message.
                        //
                        if(ex instanceof Ice.UnmarshalOutOfBoundsException)
                        {
                            ex.reason = "unknown exception type `" + mostDerivedId + "'";
                        }
                        throw ex;
                    }
                }
            },
            startInstance: function(sliceType)
            {
                Debug.assert(this._sliceType === sliceType);
                this._skipFirstSlice = true;
            },
            endInstance: function(/*preserve*/)
            {
                var sz;
                //
                // Read the Ice::Object slice.
                //
                if(this._sliceType === SliceType.ObjectSlice)
                {
                    this.startSlice();
                    sz = this._stream.readSize(); // For compatibility with the old AFM.
                    if(sz !== 0)
                    {
                        throw new Ice.MarshalException("invalid Object slice");
                    }
                    this.endSlice();
                }
        
                this._sliceType = SliceType.NoSlice;
                return null;
            },
            startSlice: function()
            {
                var isIndex;
                //
                // If first slice, don't read the header, it was already read in
                // readInstance or throwException to find the factory.
                //
                if(this._skipFirstSlice)
                {
                    this._skipFirstSlice = false;
                    return this._typeId;
                }
        
                //
                // For objects, first read the type ID boolean which indicates
                // whether or not the type ID is encoded as a string or as an
                // index. For exceptions, the type ID is always encoded as a
                // string.
                //
                if(this._sliceType === SliceType.ObjectSlice) // For exceptions, the type ID is always encoded as a string
                {
                    isIndex = this._stream.readBool();
                    this._typeId = this.readTypeId(isIndex);
                }
                else
                {
                    this._typeId = this._stream.readString();
                }
        
                this._sliceSize = this._stream.readInt();
                if(this._sliceSize < 4)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
        
                return this._typeId;
            },
            endSlice: function()
            {
            },
            skipSlice: function()
            {
                if(this._stream.instance.traceLevels().slicing > 0)
                {
                    var logger = this._stream.instance.initializationData().logger;
                    if(this._sliceType === SliceType.ObjectSlice)
                    {
                        TraceUtil.traceSlicing("object", this._typeId, this._stream.instance.traceLevels().slicingCat, logger);
                    }
                    else
                    {
                        TraceUtil.traceSlicing("exception", this._typeId, this._stream.instance.traceLevels().slicingCat, logger);
                    }
                }
                Debug.assert(this._sliceSize >= 4);
                this._stream.skip(this._sliceSize - 4);
            },
            readPendingObjects: function()
            {
                var k, num;
                do
                {
                    num = this._stream.readSize();
                    for(k = num; k > 0; --k)
                    {
                        this.readInstance();
                    }
                }
                while(num > 0);
        
                if(this._patchMap !== null && this._patchMap.size !== 0)
                {
                    //
                    // If any entries remain in the patch map, the sender has sent an index for an object, but failed
                    // to supply the object.
                    //
                    throw new Ice.MarshalException("index for class received, but no instance");
                }
            },
            readInstance: function()
            {
                var index = this._stream.readInt(),
                    mostDerivedId,
                    v = null;
        
                if(index <= 0)
                {
                    throw new Ice.MarshalException("invalid object id");
                }
        
                this._sliceType = SliceType.ObjectSlice;
                this._skipFirstSlice = false;
        
                //
                // Read the first slice header.
                //
                this.startSlice();
                mostDerivedId = this._typeId;
                while(true)
                {
                    //
                    // For the 1.0 encoding, the type ID for the base Object class
                    // marks the last slice.
                    //
                    if(this._typeId == IceObject.ice_staticId())
                    {
                        throw new Ice.NoObjectFactoryException("", mostDerivedId);
                    }
        
                    v = this.newInstance(this._typeId);
        
                    //
                    // We found a factory, we get out of this loop.
                    //
                    if(v)
                    {
                        break;
                    }
        
                    //
                    // If object slicing is disabled, stop un-marshalling.
                    //
                    if(!this._sliceObjects)
                    {
                        throw new Ice.NoObjectFactoryException("no object factory found and object slicing is disabled",
                                                               this._typeId);
                    }
        
                    //
                    // Slice off what we don't understand.
                    //
                    this.skipSlice();
                    this.startSlice(); // Read next Slice header for next iteration.
                }
        
                //
                // Un-marshal the object and add-it to the map of un-marshaled objects.
                //
                this.unmarshal(index, v);
            }
        });
        
        var EncapsDecoder11 = Class(EncapsDecoder, {
            __init__: function(stream, encaps, sliceObjects, f)
            {
                EncapsDecoder.call(this, stream, encaps, sliceObjects, f);
                this._current = null;
                this._objectIdIndex = 1;
            },
            readObject: function(patcher)
            {
                Debug.assert(patcher !== undefined);
                var index = this._stream.readSize();
        
                if(index < 0)
                {
                    throw new Ice.MarshalException("invalid object id");
                }
        
                if(index === 0)
                {
                    if(patcher !== null)
                    {
                        patcher.call(null, null);
                    }
                }
                else if(this._current !== null && (this._current.sliceFlags & FLAG_HAS_INDIRECTION_TABLE) !== 0)
                {
                    //
                    // When reading an object within a slice and there's an
                    // indirect object table, always read an indirect reference
                    // that points to an object from the indirect object table
                    // marshaled at the end of the Slice.
                    //
                    // Maintain a list of indirect references. Note that the
                    // indirect index starts at 1, so we decrement it by one to
                    // derive an index into the indirection table that we'll read
                    // at the end of the slice.
                    //
                    if(patcher !== null)
                    {
                        if(this._current.indirectPatchList === null) // Lazy initialization
                        {
                            this._current.indirectPatchList = []; // IndirectPatchEntry[]
                        }
                        var e = new IndirectPatchEntry();
                        e.index = index - 1;
                        e.patcher = patcher;
                        this._current.indirectPatchList.push(e);
                    }
                }
                else
                {
                    this.readInstance(index, patcher);
                }
            },
            throwException: function()
            {
                Debug.assert(this._current === null);
                this.push(SliceType.ExceptionSlice);
        
                //
                // Read the first slice header.
                //
                this.startSlice();
                var mostDerivedId = this._current.typeId;
                while(true)
                {
        
                    var userEx = this._stream.createUserException(this._current.typeId);
        
                    //
                    // We found the exception.
                    //
                    if(userEx !== null)
                    {
                        userEx.__read(this._stream);
                        throw userEx;
        
                        // Never reached.
                    }
        
                    //
                    // Slice off what we don't understand.
                    //
                    this.skipSlice();
        
                    if((this._current.sliceFlags & FLAG_IS_LAST_SLICE) !== 0)
                    {
                        if(mostDerivedId.indexOf("::") === 0)
                        {
                            throw new Ice.UnknownUserException(mostDerivedId.substr(2));
                        }
                        throw new Ice.UnknownUserException(mostDerivedId);
                    }
        
                    this.startSlice();
                }
            },
            startInstance: function(sliceType)
            {
                Debug.assert(sliceType !== undefined);
                Debug.assert(this._current.sliceType !== null && this._current.sliceType === sliceType);
                this._current.skipFirstSlice = true;
            },
            endInstance: function(preserve)
            {
                var slicedData = null;
                if(preserve)
                {
                    slicedData = this.readSlicedData();
                }
                if(this._current.slices !== null)
                {
                    this._current.slices.length = 0; // Clear the array.
                    this._current.indirectionTables.length = 0; // Clear the array.
                }
                this._current = this._current.previous;
                return slicedData;
            },
            startSlice: function()
            {
                //
                // If first slice, don't read the header, it was already read in
                // readInstance or throwException to find the factory.
                //
                if(this._current.skipFirstSlice)
                {
                    this._current.skipFirstSlice = false;
                    return this._current.typeId;
                }
        
                this._current.sliceFlags = this._stream.readByte();
        
                //
                // Read the type ID, for object slices the type ID is encoded as a
                // string or as an index, for exceptions it's always encoded as a
                // string.
                //
                if(this._current.sliceType === SliceType.ObjectSlice)
                {
                    if((this._current.sliceFlags & FLAG_HAS_TYPE_ID_COMPACT) === FLAG_HAS_TYPE_ID_COMPACT) // Must be checked 1st!
                    {
                        this._current.typeId = "";
                        this._current.compactId = this._stream.readSize();
                    }
                    else if((this._current.sliceFlags & (FLAG_HAS_TYPE_ID_INDEX | FLAG_HAS_TYPE_ID_STRING)) !== 0)
                    {
                        this._current.typeId = this.readTypeId((this._current.sliceFlags & FLAG_HAS_TYPE_ID_INDEX) !== 0);
                        this._current.compactId = -1;
                    }
                    else
                    {
                        // Only the most derived slice encodes the type ID for the compact format.
                        this._current.typeId = "";
                        this._current.compactId = -1;
                    }
                }
                else
                {
                    this._current.typeId = this._stream.readString();
                    this._current.compactId = -1;
                }
        
                //
                // Read the slice size if necessary.
                //
                if((this._current.sliceFlags & FLAG_HAS_SLICE_SIZE) !== 0)
                {
                    this._current.sliceSize = this._stream.readInt();
                    if(this._current.sliceSize < 4)
                    {
                        throw new Ice.UnmarshalOutOfBoundsException();
                    }
                }
                else
                {
                    this._current.sliceSize = 0;
                }
                return this._current.typeId;
            },
            endSlice: function()
            {
                var e,
                    i,
                    indirectionTable = [],
                    length;
        
                if((this._current.sliceFlags & FLAG_HAS_OPTIONAL_MEMBERS) !== 0)
                {
                    this._stream.skipOpts();
                }
        
                //
                // Read the indirection table if one is present and transform the
                // indirect patch list into patch entries with direct references.
                //
                if((this._current.sliceFlags & FLAG_HAS_INDIRECTION_TABLE) !== 0)
                {
                    //
                    // The table is written as a sequence<size> to conserve space.
                    //
                    length = this._stream.readAndCheckSeqSize(1);
                    for(i = 0; i < length; ++i)
                    {
                        indirectionTable[i] = this.readInstance(this._stream.readSize(), null);
                    }
        
                    //
                    // Sanity checks. If there are optional members, it's possible
                    // that not all object references were read if they are from
                    // unknown optional data members.
                    //
                    if(indirectionTable.length === 0)
                    {
                        throw new Ice.MarshalException("empty indirection table");
                    }
                    if((this._current.indirectPatchList === null || this._current.indirectPatchList.length === 0) &&
                    (this._current.sliceFlags & FLAG_HAS_OPTIONAL_MEMBERS) === 0)
                    {
                        throw new Ice.MarshalException("no references to indirection table");
                    }
        
                    //
                    // Convert indirect references into direct references.
                    //
                    if(this._current.indirectPatchList !== null)
                    {
                        for(i = 0, length = this._current.indirectPatchList.length; i < length; ++i)
                        {
                            e = this._current.indirectPatchList[i];
                            Debug.assert(e.index >= 0);
                            if(e.index >= indirectionTable.length)
                            {
                                throw new Ice.MarshalException("indirection out of range");
                            }
                            this.addPatchEntry(indirectionTable[e.index], e.patcher);
                        }
                        this._current.indirectPatchList.length = 0;
                    }
                }
            },
            skipSlice: function()
            {
                if(this._stream.instance.traceLevels().slicing > 0)
                {
                    var logger = this._stream.instance.initializationData().logger;
                    var slicingCat = this._stream.instance.traceLevels().slicingCat;
                    if(this._current.sliceType === SliceType.ExceptionSlice)
                    {
                        TraceUtil.traceSlicing("exception", this._current.typeId, slicingCat, logger);
                    }
                    else
                    {
                        TraceUtil.traceSlicing("object", this._current.typeId, slicingCat, logger);
                    }
                }
        
                var start = this._stream.pos;
        
                if((this._current.sliceFlags & FLAG_HAS_SLICE_SIZE) !== 0)
                {
                    Debug.assert(this._current.sliceSize >= 4);
                    this._stream.skip(this._current.sliceSize - 4);
                }
                else
                {
                    if(this._current.sliceType === SliceType.ObjectSlice)
                    {
                        throw new Ice.NoObjectFactoryException("no object factory found and compact format prevents slicing " +
                                                               "(the sender should use the sliced format instead)",
                                                               this._current.typeId);
                    }
        
                    if(this._current.typeId.indexOf("::") === 0)
                    {
                        throw new Ice.UnknownUserException(this._current.typeId.substring(2));
                    }
        
                    throw new Ice.UnknownUserException(this._current.typeId);
                }
        
                //
                // Preserve this slice.
                //
                var info = new Ice.SliceInfo();
                info.typeId = this._current.typeId;
                info.compactId = this._current.compactId;
                info.hasOptionalMembers = (this._current.sliceFlags & FLAG_HAS_OPTIONAL_MEMBERS) !== 0;
                info.isLastSlice = (this._current.sliceFlags & FLAG_IS_LAST_SLICE) !== 0;
        
                var b = this._stream._buf;
                var end = b.position;
                var dataEnd = end;
                if(info.hasOptionalMembers)
                {
                    //
                    // Don't include the optional member end marker. It will be re-written by
                    // endSlice when the sliced data is re-written.
                    //
                    --dataEnd;
                }
        
                b.position = start;
                info.bytes = b.getArray(dataEnd - start);
                b.position = end;
        
                if(this._current.slices === null) // Lazy initialization
                {
                    this._current.slices = []; // Ice.SliceInfo[]
                    this._current.indirectionTables = []; // int[]
                }
        
                //
                // Read the indirect object table. We read the instances or their
                // IDs if the instance is a reference to an already un-marhsaled
                // object.
                //
                // The SliceInfo object sequence is initialized only if
                // readSlicedData is called.
                //
        
                if((this._current.sliceFlags & FLAG_HAS_INDIRECTION_TABLE) !== 0)
                {
                    var length = this._stream.readAndCheckSeqSize(1);
                    var indirectionTable = [];
                    for(var i = 0; i < length; ++i)
                    {
                        indirectionTable[i] = this.readInstance(this._stream.readSize(), null);
                    }
                    this._current.indirectionTables.push(indirectionTable);
                }
                else
                {
                    this._current.indirectionTables.push(null);
                }
                this._current.slices.push(info);
            },
            readOpt: function(readTag, expectedFormat)
            {
                if(this._current === null)
                {
                    return this._stream.readOptImpl(readTag, expectedFormat);
                }
        
                if((this._current.sliceFlags & FLAG_HAS_OPTIONAL_MEMBERS) !== 0)
                {
                    return this._stream.readOptImpl(readTag, expectedFormat);
                }
                return false;
            },
            readInstance: function(index, patcher)
            {
                Debug.assert(index > 0);
        
                var mostDerivedId,
                    v = null;
        
                if(index > 1)
                {
                    if(patcher !== null)
                    {
                        this.addPatchEntry(index, patcher);
                    }
                    return index;
                }
        
                this.push(SliceType.ObjectSlice);
        
                //
                // Get the object ID before we start reading slices. If some
                // slices are skiped, the indirect object table are still read and
                // might read other objects.
                //
                index = ++this._objectIdIndex;
        
                //
                // Read the first slice header.
                //
                this.startSlice();
                mostDerivedId = this._current.typeId;
                while(true)
                {
                    if(this._current.compactId >= 0)
                    {
                        //
                        // Translate a compact (numeric) type ID into a string type ID.
                        //
                        this._current.typeId = "";
                        if(this._current.typeId.length === 0)
                        {
                            this._current.typeId = this._stream.getTypeId(this._current.compactId);
                        }
                    }
        
                    if(this._current.typeId.length > 0)
                    {
                        v = this.newInstance(this._current.typeId);
                        //
                        // We found a factory, we get out of this loop.
                        //
                        if(v !== null && v !== undefined)
                        {
                            break;
                        }
                    }
        
                    //
                    // If object slicing is disabled, stop un-marshalling.
                    //
                    if(!this._sliceObjects)
                    {
                        throw new Ice.NoObjectFactoryException("no object factory found and object slicing is disabled",
                                                               this._current.typeId);
                    }
        
                    //
                    // Slice off what we don't understand.
                    //
                    this.skipSlice();
                    //
                    // If this is the last slice, keep the object as an opaque
                    // UnknownSlicedData object.
                    //
                    if((this._current.sliceFlags & FLAG_IS_LAST_SLICE) !== 0)
                    {
                        v = new Ice.UnknownSlicedObject(mostDerivedId);
                        break;
                    }
        
                    this.startSlice(); // Read next Slice header for next iteration.
                }
        
                //
                // Un-marshal the object
                //
                this.unmarshal(index, v);
                if(this._current === null && this._patchMap !== null && this._patchMap.size !== 0)
                {
                    //
                    // If any entries remain in the patch map, the sender has sent an index for an object, but failed
                    // to supply the object.
                    //
                    throw new Ice.MarshalException("index for class received, but no instance");
                }
        
                if(patcher !== null)
                {
                    patcher.call(null, v);
                }
                return index;
            },
            readSlicedData: function()
            {
                var i, ii, table, info, j, jj;
        
                if(this._current.slices === null) // No preserved slices.
                {
                    return null;
                }
                //
                // The _indirectionTables member holds the indirection table for each slice
                // in _slices.
                //
                Debug.assert(this._current.slices.length === this._current.indirectionTables.length);
                for(i = 0, ii = this._current.slices.length; i < ii; ++i)
                {
                    //
                    // We use the "objects" list in SliceInfo to hold references
                    // to the target objects. Note that the objects might not have
                    // been read yet in the case of a circular reference to an
                    // enclosing object.
                    //
                    table = this._current.indirectionTables[i];
                    info = this._current.slices[i];
                    info.objects = [];
                    jj = table ? table.length : 0;
                    for(j = 0; j < jj; ++j)
                    {
                        this.addPatchEntry(table[j], sequencePatcher(info.objects, j, IceObject));
                    }
                }
                return new SlicedData(ArrayUtil.clone(this._current.slices));
            },
            push: function(sliceType)
            {
                if(this._current === null)
                {
                    this._current = new EncapsDecoder11.InstanceData(null);
                }
                else
                {
                    this._current = !this._current.next ? new EncapsDecoder11.InstanceData(this._current) : this._current.next;
                }
                this._current.sliceType = sliceType;
                this._current.skipFirstSlice = false;
            }
        });
        
        EncapsDecoder11.InstanceData = function(previous)
        {
            if(previous !== null)
            {
                previous.next = this;
            }
            this.previous = previous;
            this.next = null;
        
            // Instance attributes
            this.sliceType = null;
            this.skipFirstSlice = false;
            this.slices = null;     // Preserved slices. Ice.SliceInfo[]
            this.indirectionTables = null; // int[]
        
            // Slice attributes
            this.sliceFlags = 0;
            this.sliceSize = 0;
            this.typeId = null;
            this.compactId = 0;
            this.indirectPatchList = null; // Lazy initialized, IndirectPatchEntry[]
        };
        
        var sequencePatcher = function(seq, index, T){
            return function(v)
                {
                    if(v !== null && !(v instanceof T))
                    {
                        ExUtil.throwUOE(T.ice_staticId(), v);
                    }
                    seq[index] = v;
                };
        };
        
        var EncapsEncoder = Class({
            __init__: function(stream, encaps)
            {
                this._stream = stream;
                this._encaps = encaps;
                this._marshaledMap = new HashMap(); // HashMap<Ice.Object, int>;
                this._typeIdMap = null; // Lazy initialized. HashMap<String, int>
                this._typeIdIndex = 0;
            },
            writeOpt: function()
            {
                return false;
            },
            writePendingObjects: function()
            {
                return undefined;
            },
            registerTypeId: function(typeId)
            {
                if(this._typeIdMap === null) // Lazy initialization
                {
                    this._typeIdMap = new HashMap(); // HashMap<String, int>
                }
        
                var p = this._typeIdMap.get(typeId);
                if(p !== undefined)
                {
                    return p;
                }
                this._typeIdMap.set(typeId, ++this._typeIdIndex);
                return -1;
            }
        });
        
        var EncapsEncoder10 = Class(EncapsEncoder, {
            __init__: function(stream, encaps)
            {
                EncapsEncoder.call(this, stream, encaps);
                // Instance attributes
                this._sliceType = SliceType.NoSlice;
                this._writeSlice = 0;        // Position of the slice data members
                // Encapsulation attributes for object marshalling.
                this._objectIdIndex = 0;
                this._toBeMarshaledMap = new HashMap(); // HashMap<Ice.Object, Integer>();
            },
            writeObject: function(v)
            {
                Debug.assert(v !== undefined);
                //
                // Object references are encoded as a negative integer in 1.0.
                //
                if(v !== null)
                {
                    this._stream.writeInt(-this.registerObject(v));
                }
                else
                {
                    this._stream.writeInt(0);
                }
            },
            writeUserException: function(v)
            {
                Debug.assert(v !== null && v !== undefined);
                //
                // User exception with the 1.0 encoding start with a boolean
                // flag that indicates whether or not the exception uses
                // classes.
                //
                // This allows reading the pending objects even if some part of
                // the exception was sliced.
                //
                var usesClasses = v.__usesClasses();
                this._stream.writeBool(usesClasses);
                v.__write(this._stream);
                if(usesClasses)
                {
                    this.writePendingObjects();
                }
            },
            startInstance: function(sliceType)
            {
                this._sliceType = sliceType;
            },
            endInstance: function()
            {
                if(this._sliceType === SliceType.ObjectSlice)
                {
                    //
                    // Write the Object slice.
                    //
                    this.startSlice(IceObject.ice_staticId(), -1, true);
                    this._stream.writeSize(0); // For compatibility with the old AFM.
                    this.endSlice();
                }
                this._sliceType = SliceType.NoSlice;
            },
            startSlice: function(typeId)
            {
                //
                // For object slices, encode a boolean to indicate how the type ID
                // is encoded and the type ID either as a string or index. For
                // exception slices, always encode the type ID as a string.
                //
                if(this._sliceType === SliceType.ObjectSlice)
                {
                    var index = this.registerTypeId(typeId);
                    if(index < 0)
                    {
                        this._stream.writeBool(false);
                        this._stream.writeString(typeId);
                    }
                    else
                    {
                        this._stream.writeBool(true);
                        this._stream.writeSize(index);
                    }
                }
                else
                {
                    this._stream.writeString(typeId);
                }
        
                this._stream.writeInt(0); // Placeholder for the slice length.
        
                this._writeSlice = this._stream.pos;
            },
            endSlice: function()
            {
                //
                // Write the slice length.
                //
                var sz = this._stream.pos - this._writeSlice + 4;
                this._stream.rewriteInt(sz, this._writeSlice - 4);
            },
            writePendingObjects: function()
            {
                var self = this,
                    writeCB = function(key, value)
                                {
                                    //
                                    // Ask the instance to marshal itself. Any new class
                                    // instances that are triggered by the classes marshaled
                                    // are added to toBeMarshaledMap.
                                    //
                                    self._stream.writeInt(value);
        
                                    try
                                    {
                                        key.ice_preMarshal();
                                    }
                                    catch(ex)
                                    {
                                        self._stream.instance.initializationData().logger.warning(
                                            "exception raised by ice_preMarshal:\n" + ex.toString());
                                    }
        
                                    key.__write(self._stream);
                                },
                    savedMap;
        
                while(this._toBeMarshaledMap.size > 0)
                {
                    //
                    // Consider the to be marshalled objects as marshalled now,
                    // this is necessary to avoid adding again the "to be
                    // marshalled objects" into _toBeMarshaledMap while writing
                    // objects.
                    //
                    this._marshaledMap.merge(this._toBeMarshaledMap);
        
                    savedMap = this._toBeMarshaledMap;
                    this._toBeMarshaledMap = new HashMap(); // HashMap<Ice.Object, int>();
                    this._stream.writeSize(savedMap.size);
                    savedMap.forEach(writeCB);
                }
                this._stream.writeSize(0); // Zero marker indicates end of sequence of sequences of instances.
            },
            registerObject: function(v)
            {
                Debug.assert(v !== null);
        
                //
                // Look for this instance in the to-be-marshaled map.
                //
                var p = this._toBeMarshaledMap.get(v);
                if(p !== undefined)
                {
                    return p;
                }
        
                //
                // Didn't find it, try the marshaled map next.
                //
                p = this._marshaledMap.get(v);
                if(p !== undefined)
                {
                    return p;
                }
        
                //
                // We haven't seen this instance previously, create a new
                // index, and insert it into the to-be-marshaled map.
                //
                this._toBeMarshaledMap.set(v, ++this._objectIdIndex);
                return this._objectIdIndex;
            }
        });
        
        var EncapsEncoder11 = Class(EncapsEncoder, {
            __init__: function(stream, encaps)
            {
                EncapsEncoder.call(this, stream, encaps);
                this._current = null;
                this._objectIdIndex = 1;
            },
            writeObject: function(v)
            {
                Debug.assert(v !== undefined);
                var index, idx;
                if(v === null)
                {
                    this._stream.writeSize(0);
                }
                else if(this._current !== null && this._encaps.format === FormatType.SlicedFormat)
                {
                    if(this._current.indirectionTable === null) // Lazy initialization
                    {
                        this._current.indirectionTable = []; // Ice.Object[]
                        this._current.indirectionMap = new HashMap(); // HashMap<Ice.Object, int>
                    }
        
                    //
                    // If writting an object within a slice and using the sliced
                    // format, write an index from the object indirection
                    // table. The indirect object table is encoded at the end of
                    // each slice and is always read (even if the Slice is
                    // unknown).
                    //
                    index = this._current.indirectionMap.get(v);
                    if(index === undefined)
                    {
                        this._current.indirectionTable.push(v);
                        idx = this._current.indirectionTable.length; // Position + 1 (0 is reserved for nil)
                        this._current.indirectionMap.set(v, idx);
                        this._stream.writeSize(idx);
                    }
                    else
                    {
                        this._stream.writeSize(index);
                    }
                }
                else
                {
                    this.writeInstance(v); // Write the instance or a reference if already marshaled.
                }
            },
            writePendingObjects: function()
            {
                return undefined;
            },
            writeUserException: function(v)
            {
                Debug.assert(v !== null && v !== undefined);
                v.__write(this._stream);
            },
            startInstance: function(sliceType, data)
            {
                if(this._current === null)
                {
                    this._current = new EncapsEncoder11.InstanceData(null);
                }
                else
                {
                    this._current = (this._current.next === null) ? new EncapsEncoder11.InstanceData(this._current) : this._current.next;
                }
                this._current.sliceType = sliceType;
                this._current.firstSlice = true;
        
                if(data !== null && data !== undefined)
                {
                    this.writeSlicedData(data);
                }
            },
            endInstance: function()
            {
                this._current = this._current.previous;
            },
            startSlice: function(typeId, compactId, last)
            {
                Debug.assert((this._current.indirectionTable === null || this._current.indirectionTable.length === 0) &&
                                (this._current.indirectionMap === null || this._current.indirectionMap.size === 0));
        
                this._current.sliceFlagsPos = this._stream.pos;
        
                this._current.sliceFlags = 0;
                if(this._encaps.format === FormatType.SlicedFormat)
                {
                    this._current.sliceFlags |= FLAG_HAS_SLICE_SIZE; // Encode the slice size if using the sliced format.
                }
                if(last)
                {
                    this._current.sliceFlags |= FLAG_IS_LAST_SLICE; // This is the last slice.
                }
        
                this._stream.writeByte(0); // Placeholder for the slice flags
        
                //
                // For object slices, encode the flag and the type ID either as a
                // string or index. For exception slices, always encode the type
                // ID a string.
                //
                if(this._current.sliceType === SliceType.ObjectSlice)
                {
                    //
                    // Encode the type ID (only in the first slice for the compact
                    // encoding).
                    //
                    if(this._encaps.format === FormatType.SlicedFormat || this._current.firstSlice)
                    {
                        if(compactId >= 0)
                        {
                            this._current.sliceFlags |= FLAG_HAS_TYPE_ID_COMPACT;
                            this._stream.writeSize(compactId);
                        }
                        else
                        {
                            var index = this.registerTypeId(typeId);
                            if(index < 0)
                            {
                                this._current.sliceFlags |= FLAG_HAS_TYPE_ID_STRING;
                                this._stream.writeString(typeId);
                            }
                            else
                            {
                                this._current.sliceFlags |= FLAG_HAS_TYPE_ID_INDEX;
                                this._stream.writeSize(index);
                            }
                        }
                    }
                }
                else
                {
                    this._stream.writeString(typeId);
                }
        
                if((this._current.sliceFlags & FLAG_HAS_SLICE_SIZE) !== 0)
                {
                    this._stream.writeInt(0); // Placeholder for the slice length.
                }
        
                this._current.writeSlice = this._stream.pos;
                this._current.firstSlice = false;
            },
            endSlice: function()
            {
                var sz, i, length;
        
                //
                // Write the optional member end marker if some optional members
                // were encoded. Note that the optional members are encoded before
                // the indirection table and are included in the slice size.
                //
                if((this._current.sliceFlags & FLAG_HAS_OPTIONAL_MEMBERS) !== 0)
                {
                    this._stream.writeByte(OPTIONAL_END_MARKER);
                }
        
                //
                // Write the slice length if necessary.
                //
                if((this._current.sliceFlags & FLAG_HAS_SLICE_SIZE) !== 0)
                {
                    sz = this._stream.pos - this._current.writeSlice + 4;
                    this._stream.rewriteInt(sz, this._current.writeSlice - 4);
                }
        
                //
                // Only write the indirection table if it contains entries.
                //
                if(this._current.indirectionTable !== null && this._current.indirectionTable.length !== 0)
                {
                    Debug.assert(this._encaps.format === FormatType.SlicedFormat);
                    this._current.sliceFlags |= FLAG_HAS_INDIRECTION_TABLE;
        
                    //
                    // Write the indirection object table.
                    //
                    this._stream.writeSize(this._current.indirectionTable.length);
                    for(i = 0, length = this._current.indirectionTable.length; i < length; ++i)
                    {
                        this.writeInstance(this._current.indirectionTable[i]);
                    }
                    this._current.indirectionTable.length = 0; // Faster way to clean array in JavaScript
                    this._current.indirectionMap.clear();
                }
        
                //
                // Finally, update the slice flags.
                //
                this._stream.rewriteByte(this._current.sliceFlags, this._current.sliceFlagsPos);
            },
            writeOpt: function(tag, format)
            {
                if(this._current === null)
                {
                    return this._stream.writeOptImpl(tag, format);
                }
        
                if(this._stream.writeOptImpl(tag, format))
                {
                    this._current.sliceFlags |= FLAG_HAS_OPTIONAL_MEMBERS;
                    return true;
                }
        
                return false;
            },
            writeSlicedData: function(slicedData)
            {
                Debug.assert(slicedData !== null && slicedData !== undefined);
        
                //
                // We only remarshal preserved slices if we are using the sliced
                // format. Otherwise, we ignore the preserved slices, which
                // essentially "slices" the object into the most-derived type
                // known by the sender.
                //
                if(this._encaps.format !== FormatType.SlicedFormat)
                {
                    return;
                }
        
                var i, ii, info,
                    j, jj;
        
                for(i = 0, ii = slicedData.slices.length; i < ii; ++i)
                {
                    info = slicedData.slices[i];
                    this.startSlice(info.typeId, info.compactId, info.isLastSlice);
        
                    //
                    // Write the bytes associated with this slice.
                    //
                    this._stream.writeBlob(info.bytes);
        
                    if(info.hasOptionalMembers)
                    {
                        this._current.sliceFlags |= FLAG_HAS_OPTIONAL_MEMBERS;
                    }
        
                    //
                    // Make sure to also re-write the object indirection table.
                    //
                    if(info.objects !== null && info.objects.length > 0)
                    {
                        if(this._current.indirectionTable === null) // Lazy initialization
                        {
                            this._current.indirectionTable = []; // Ice.Object[]
                            this._current.indirectionMap = new HashMap(); // HashMap<Ice.Object, int>
                        }
        
                        for(j = 0, jj = info.objects.length; j < jj; ++j)
                        {
                            this._current.indirectionTable.push(info.objects[j]);
                        }
                    }
        
                    this.endSlice();
                }
            },
            writeInstance: function(v)
            {
                Debug.assert(v !== null && v !== undefined);
        
                //
                // If the instance was already marshaled, just write it's ID.
                //
                var p = this._marshaledMap.get(v);
                if(p !== undefined)
                {
                    this._stream.writeSize(p);
                    return;
                }
        
                //
                // We haven't seen this instance previously, create a new ID,
                // insert it into the marshaled map, and write the instance.
                //
                this._marshaledMap.set(v, ++this._objectIdIndex);
        
                try
                {
                    v.ice_preMarshal();
                }
                catch(ex)
                {
                    this._stream.instance.initializationData().logger.warning("exception raised by ice_preMarshal:\n" +
                                                                              ex.toString());
                }
        
                this._stream.writeSize(1); // Object instance marker.
                v.__write(this._stream);
            }
        });
        
        EncapsEncoder11.InstanceData = function(previous)
        {
            Debug.assert(previous !== undefined);
            if(previous !== null)
            {
                previous.next = this;
            }
            this.previous = previous;
            this.next = null;
        
            // Instance attributes
            this.sliceType = null;
            this.firstSlice = false;
        
            // Slice attributes
            this.sliceFlags = 0;
            this.writeSlice = 0;    // Position of the slice data members
            this.sliceFlagsPos = 0; // Position of the slice flags
            this.indirectionTable = null; // Ice.Object[]
            this.indirectionMap = null; // HashMap<Ice.Object, int>
        };
        
        var ReadEncaps = Class({
            __init__: function()
            {
                this.start = 0;
                this.sz = 0;
                this.encoding = null;
                this.encoding_1_0 = false;
                this.decoder = null;
                this.next = null;
            },
            reset: function()
            {
                this.decoder = null;
            },
            setEncoding: function(encoding)
            {
                this.encoding = encoding;
                this.encoding_1_0 = encoding.equals(Ice.Encoding_1_0);
            }
        });
        
        var WriteEncaps = Class({
            __init__: function()
            {
                this.start = 0;
                this.format = FormatType.DefaultFormat;
                this.encoding = null;
                this.encoding_1_0 = false;
                this.encoder = null;
                this.next = null;
            },
            reset: function()
            {
                this.encoder = null;
            },
            setEncoding: function(encoding)
            {
                this.encoding = encoding;
                this.encoding_1_0 = encoding.equals(Ice.Encoding_1_0);
            }
        });
        
        var BasicStream = Class({
            __init__: function(instance, encoding, data)
            {
                this._instance = instance;
                this._closure = null;
                this._encoding = encoding;
        
                this._readEncapsStack = null;
                this._writeEncapsStack = null;
                this._readEncapsCache = null;
                this._writeEncapsCache = null;
        
                this._sliceObjects = true;
        
                this._startSeq = -1;
                this._sizePos = -1;
        
                if(data !== undefined)
                {
                    this._buf = new Ice.Buffer(data);
                }
                else
                {
                    this._buf = new Ice.Buffer();
                }
            },
            //
            // This function allows this object to be reused, rather than
            // reallocated.
            //
            reset: function()
            {
                this._buf.reset();
                this.clear();
            },
            clear: function()
            {
                if(this._readEncapsStack !== null)
                {
                    Debug.assert(this._readEncapsStack.next);
                    this._readEncapsStack.next = this._readEncapsCache;
                    this._readEncapsCache = this._readEncapsStack;
                    this._readEncapsCache.reset();
                    this._readEncapsStack = null;
                }
        
                if(this._writeEncapsStack !== null)
                {
                    Debug.assert(this._writeEncapsStack.next);
                    this._writeEncapsStack.next = this._writeEncapsCache;
                    this._writeEncapsCache = this._writeEncapsStack;
                    this._writeEncapsCache.reset();
                    this._writeEncapsStack = null;
                }
                this._startSeq = -1;
                this._sliceObjects = true;
            },
            swap: function(other)
            {
                Debug.assert(this._instance === other._instance);
        
                var tmpBuf, tmpClosure, tmpStartSeq, tmpMinSeqSize, tmpSizePos;
        
                tmpBuf = other._buf;
                other._buf = this._buf;
                this._buf = tmpBuf;
        
                tmpClosure = other._closure;
                other._closure = this._closure;
                this._closure = tmpClosure;
        
                //
                // Swap is never called for BasicStreams that have encapsulations being read/write. However,
                // encapsulations might still be set in case marshalling or un-marshalling failed. We just
                // reset the encapsulations if there are still some set.
                //
                this.resetEncaps();
                other.resetEncaps();
        
                tmpStartSeq = other._startSeq;
                other._startSeq = this._startSeq;
                this._startSeq = tmpStartSeq;
        
                tmpMinSeqSize = other._minSeqSize;
                other._minSeqSize = this._minSeqSize;
                this._minSeqSize = tmpMinSeqSize;
        
                tmpSizePos = other._sizePos;
                other._sizePos = this._sizePos;
                this._sizePos = tmpSizePos;
            },
            resetEncaps: function()
            {
                this._readEncapsStack = null;
                this._writeEncapsStack = null;
            },
            resize: function(sz)
            {
                this._buf.resize(sz);
                this._buf.position = sz;
            },
            prepareWrite: function()
            {
                this._buf.position = 0;
                return this._buf;
            },
            startWriteObject: function(data)
            {
                Debug.assert(this._writeEncapsStack !== null && this._writeEncapsStack.encoder !== null);
                this._writeEncapsStack.encoder.startInstance(SliceType.ObjectSlice, data);
            },
            endWriteObject: function()
            {
                Debug.assert(this._writeEncapsStack !== null && this._writeEncapsStack.encoder !== null);
                this._writeEncapsStack.encoder.endInstance();
            },
            startReadObject: function()
            {
                Debug.assert(this._readEncapsStack !== null && this._readEncapsStack.decoder !== null);
                this._readEncapsStack.decoder.startInstance(SliceType.ObjectSlice);
            },
            endReadObject: function(preserve)
            {
                Debug.assert(this._readEncapsStack !== null && this._readEncapsStack.decoder !== null);
                return this._readEncapsStack.decoder.endInstance(preserve);
            },
            startWriteException: function(data)
            {
                Debug.assert(this._writeEncapsStack !== null && this._writeEncapsStack.encoder !== null);
                this._writeEncapsStack.encoder.startInstance(SliceType.ExceptionSlice, data);
            },
            endWriteException: function()
            {
                Debug.assert(this._writeEncapsStack !== null && this._writeEncapsStack.encoder !== null);
                this._writeEncapsStack.encoder.endInstance();
            },
            startReadException: function()
            {
                Debug.assert(this._readEncapsStack !== null && this._readEncapsStack.decoder !== null);
                this._readEncapsStack.decoder.startInstance(SliceType.ExceptionSlice);
            },
            endReadException: function(preserve)
            {
                Debug.assert(this._readEncapsStack !== null && this._readEncapsStack.decoder !== null);
                return this._readEncapsStack.decoder.endInstance(preserve);
            },
            startWriteEncaps: function(encoding, format)
            {
                //
                // If no encoding version is specified, use the current write
                // encapsulation encoding version if there's a current write
                // encapsulation, otherwise, use the stream encoding version.
                //
        
                if(encoding === undefined)
                {
                    if(this._writeEncapsStack !== null)
                    {
                        encoding = this._writeEncapsStack.encoding;
                        format = this._writeEncapsStack.format;
                    }
                    else
                    {
                        encoding = this._encoding;
                        format = FormatType.DefaultFormat;
                    }
                }
        
                Protocol.checkSupportedEncoding(encoding);
        
                var curr = this._writeEncapsCache;
                if(curr !== null)
                {
                    curr.reset();
                    this._writeEncapsCache = this._writeEncapsCache.next;
                }
                else
                {
                    curr = new WriteEncaps();
                }
                curr.next = this._writeEncapsStack;
                this._writeEncapsStack = curr;
        
                this._writeEncapsStack.format = format;
                this._writeEncapsStack.setEncoding(encoding);
                this._writeEncapsStack.start = this._buf.limit;
        
                this.writeInt(0); // Placeholder for the encapsulation length.
                this._writeEncapsStack.encoding.__write(this);
            },
            endWriteEncaps: function()
            {
                Debug.assert(this._writeEncapsStack);
        
                // Size includes size and version.
                var start = this._writeEncapsStack.start;
        
                var sz = this._buf.limit - start;
                this._buf.putIntAt(start, sz);
        
                var curr = this._writeEncapsStack;
                this._writeEncapsStack = curr.next;
                curr.next = this._writeEncapsCache;
                this._writeEncapsCache = curr;
                this._writeEncapsCache.reset();
            },
            endWriteEncapsChecked: function() // Used by public stream API.
            {
                if(this._writeEncapsStack === null)
                {
                    throw new Ice.EncapsulationException("not in an encapsulation");
                }
                this.endWriteEncaps();
            },
            writeEmptyEncaps: function(encoding)
            {
                Protocol.checkSupportedEncoding(encoding);
                this.writeInt(6); // Size
                encoding.__write(this);
            },
            writeEncaps: function(v)
            {
                if(v.length < 6)
                {
                    throw new Ice.EncapsulationException();
                }
                this.expand(v.length);
                this._buf.putArray(v);
            },
            getWriteEncoding: function()
            {
                return this._writeEncapsStack !== null ? this._writeEncapsStack.encoding : this._encoding;
            },
            startReadEncaps: function()
            {
                var curr = this._readEncapsCache;
                if(curr !== null)
                {
                    curr.reset();
                    this._readEncapsCache = this._readEncapsCache.next;
                }
                else
                {
                    curr = new ReadEncaps();
                }
                curr.next = this._readEncapsStack;
                this._readEncapsStack = curr;
        
                this._readEncapsStack.start = this._buf.position;
        
                //
                // I don't use readSize() and writeSize() for encapsulations,
                // because when creating an encapsulation, I must know in advance
                // how many bytes the size information will require in the data
                // stream. If I use an Int, it is always 4 bytes. For
                // readSize()/writeSize(), it could be 1 or 5 bytes.
                //
                var sz = this.readInt();
                if(sz < 6)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                if(sz - 4 > this._buf.remaining)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                this._readEncapsStack.sz = sz;
        
                var encoding = new Ice.EncodingVersion();
                encoding.__read(this);
                Protocol.checkSupportedEncoding(encoding); // Make sure the encoding is supported.
                this._readEncapsStack.setEncoding(encoding);
        
                return encoding;
            },
            endReadEncaps: function()
            {
                Debug.assert(this._readEncapsStack !== null);
        
                if(!this._readEncapsStack.encoding_1_0)
                {
                    this.skipOpts();
                    if(this._buf.position !== this._readEncapsStack.start + this._readEncapsStack.sz)
                    {
                        throw new Ice.EncapsulationException();
                    }
                }
                else if(this._buf.position !== this._readEncapsStack.start + this._readEncapsStack.sz)
                {
                    if(this._buf.position + 1 !== this._readEncapsStack.start + this._readEncapsStack.sz)
                    {
                        throw new Ice.EncapsulationException();
                    }
        
                    //
                    // Ice version < 3.3 had a bug where user exceptions with
                    // class members could be encoded with a trailing byte
                    // when dispatched with AMD. So we tolerate an extra byte
                    // in the encapsulation.
                    //
        
                    try
                    {
                        this._buf.get();
                    }
                    catch(ex)
                    {
                        throw new Ice.UnmarshalOutOfBoundsException();
                    }
                }
        
                var curr = this._readEncapsStack;
                this._readEncapsStack = curr.next;
                curr.next = this._readEncapsCache;
                this._readEncapsCache = curr;
                this._readEncapsCache.reset();
            },
            skipEmptyEncaps: function(encoding)
            {
                Debug.assert(encoding !== undefined);
                var sz = this.readInt();
                if(sz !== 6)
                {
                    throw new Ice.EncapsulationException();
                }
        
                var pos = this._buf.position;
                if(pos + 2 > this._buf.limit)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
        
                if(encoding !== null)
                {
                    encoding.__read(this);
                }
                else
                {
                    this._buf.position = pos + 2;
                }
            },
            endReadEncapsChecked: function() // Used by public stream API.
            {
                if(this._readEncapsStack === null)
                {
                    throw new Ice.EncapsulationException("not in an encapsulation");
                }
                this.endReadEncaps();
            },
            readEncaps: function(encoding)
            {
                Debug.assert(encoding !== undefined);
                var sz = this.readInt();
                if(sz < 6)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
        
                if(sz - 4 > this._buf.remaining)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
        
                if(encoding !== null)
                {
                    encoding.__read(this);
                    this._buf.position = this._buf.position - 6;
                }
                else
                {
                    this._buf.position = this._buf.position - 4;
                }
        
                try
                {
                    return this._buf.getArray(sz);
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            getReadEncoding: function()
            {
                return this._readEncapsStack !== null ? this._readEncapsStack.encoding : this._encoding;
            },
            getReadEncapsSize: function()
            {
                Debug.assert(this._readEncapsStack !== null);
                return this._readEncapsStack.sz - 6;
            },
            skipEncaps: function()
            {
                var sz = this.readInt();
                if(sz < 6)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                var encoding = new Ice.EncodingVersion();
                encoding.__read(this);
                try
                {
                    this._buf.position = this._buf.position + sz - 6;
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                return encoding;
            },
            startWriteSlice: function(typeId, compactId, last)
            {
                Debug.assert(this._writeEncapsStack !== null && this._writeEncapsStack.encoder !== null);
                this._writeEncapsStack.encoder.startSlice(typeId, compactId, last);
            },
            endWriteSlice: function()
            {
                Debug.assert(this._writeEncapsStack !== null && this._writeEncapsStack.encoder !== null);
                this._writeEncapsStack.encoder.endSlice();
            },
            startReadSlice: function() // Returns type ID of next slice
            {
                Debug.assert(this._readEncapsStack !== null && this._readEncapsStack.decoder !== null);
                return this._readEncapsStack.decoder.startSlice();
            },
            endReadSlice: function()
            {
                Debug.assert(this._readEncapsStack !== null && this._readEncapsStack.decoder !== null);
                this._readEncapsStack.decoder.endSlice();
            },
            skipSlice: function()
            {
                Debug.assert(this._readEncapsStack !== null && this._readEncapsStack.decoder !== null);
                this._readEncapsStack.decoder.skipSlice();
            },
            readPendingObjects: function()
            {
                if(this._readEncapsStack !== null && this._readEncapsStack.decoder !== null)
                {
                    this._readEncapsStack.decoder.readPendingObjects();
                }
                else if((this._readEncapsStack !== null && this._readEncapsStack.encoding_1_0) ||
                        (this._readEncapsStack === null && this._encoding.equals(Ice.Encoding_1_0)))
                {
                    //
                    // If using the 1.0 encoding and no objects were read, we
                    // still read an empty sequence of pending objects if
                    // requested (i.e.: if this is called).
                    //
                    // This is required by the 1.0 encoding, even if no objects
                    // are written we do marshal an empty sequence if marshaled
                    // data types use classes.
                    //
                    this.skipSize();
                }
            },
            writePendingObjects: function()
            {
                if(this._writeEncapsStack !== null && this._writeEncapsStack.encoder !== null)
                {
                    this._writeEncapsStack.encoder.writePendingObjects();
                }
                else if((this._writeEncapsStack !== null && this._writeEncapsStack.encoding_1_0) ||
                        (this._writeEncapsStack === null && this._encoding.equals(Ice.Encoding_1_0)))
                {
                    //
                    // If using the 1.0 encoding and no objects were written, we
                    // still write an empty sequence for pending objects if
                    // requested (i.e.: if this is called).
                    //
                    // This is required by the 1.0 encoding, even if no objects
                    // are written we do marshal an empty sequence if marshaled
                    // data types use classes.
                    //
                    this.writeSize(0);
                }
            },
            writeSize: function(v)
            {
                if(v > 254)
                {
                    this.expand(5);
                    this._buf.put(255);
                    this._buf.putInt(v);
                }
                else
                {
                    this.expand(1);
                    this._buf.put(v);
                }
            },
            readSize: function()
            {
                try
                {
                    var b = this._buf.get();
                    if(b === 255)
                    {
                        var v = this._buf.getInt();
                        if(v < 0)
                        {
                            throw new Ice.UnmarshalOutOfBoundsException();
                        }
                        return v;
                    }
                    return b;
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            readAndCheckSeqSize: function(minSize)
            {
                var sz = this.readSize();
        
                if(sz === 0)
                {
                    return sz;
                }
        
                //
                // The _startSeq variable points to the start of the sequence for which
                // we expect to read at least _minSeqSize bytes from the stream.
                //
                // If not initialized or if we already read more data than _minSeqSize,
                // we reset _startSeq and _minSeqSize for this sequence (possibly a
                // top-level sequence or enclosed sequence it doesn't really matter).
                //
                // Otherwise, we are reading an enclosed sequence and we have to bump
                // _minSeqSize by the minimum size that this sequence will  require on
                // the stream.
                //
                // The goal of this check is to ensure that when we start un-marshalling
                // a new sequence, we check the minimal size of this new sequence against
                // the estimated remaining buffer size. This estimatation is based on
                // the minimum size of the enclosing sequences, it's _minSeqSize.
                //
                if(this._startSeq === -1 || this._buf.position > (this._startSeq + this._minSeqSize))
                {
                    this._startSeq = this._buf.position;
                    this._minSeqSize = sz * minSize;
                }
                else
                {
                    this._minSeqSize += sz * minSize;
                }
        
                //
                // If there isn't enough data to read on the stream for the sequence (and
                // possibly enclosed sequences), something is wrong with the marshalled
                // data: it's claiming having more data that what is possible to read.
                //
                if(this._startSeq + this._minSeqSize > this._buf.limit)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
        
                return sz;
            },
            startSize: function()
            {
                var pos = this._buf.position;
                this.writeInt(0); // Placeholder for 32-bit size
                return pos;
            },
            endSize: function(pos)
            {
                Debug.assert(pos >= 0);
                this.rewriteInt(this._buf.position - pos - 4, pos);
            },
            writeBlob: function(v)
            {
                if(v === null)
                {
                    return;
                }
                this.expand(v.length);
                this._buf.putArray(v);
            },
            readBlob: function(sz)
            {
                if(this._buf.remaining < sz)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                try
                {
                    return this._buf.getArray(sz);
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            // Read/write format and tag for optionals
            writeOpt: function(tag, format)
            {
                Debug.assert(this._writeEncapsStack !== null);
                if(this._writeEncapsStack.encoder !== null)
                {
                    return this._writeEncapsStack.encoder.writeOpt(tag, format);
                }
                return this.writeOptImpl(tag, format);
            },
            readOpt: function(tag, expectedFormat)
            {
                Debug.assert(this._readEncapsStack !== null);
                if(this._readEncapsStack.decoder !== null)
                {
                    return this._readEncapsStack.decoder.readOpt(tag, expectedFormat);
                }
                return this.readOptImpl(tag, expectedFormat);
            },
            writeOptValue: function(tag, format, write, v)
            {
                if(v !== undefined)
                {
                    if(this.writeOpt(tag, format))
                    {
                        write.call(this, v);
                    }
                }
            },
            readOptValue: function(tag, format, read)
            {
                if(this.readOpt(tag, format))
                {
                    return read.call(this);
                }
                else
                {
                    return undefined;
                }
            },
            writeByte: function(v)
            {
                this.expand(1);
                this._buf.put(v);
            },
            rewriteByte: function(v, dest)
            {
                this._buf.putAt(dest, v);
            },
            readByte: function()
            {
                try
                {
                    return this._buf.get();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            writeByteSeq: function(v)
            {
                if(v === null || v.length === 0)
                {
                    this.writeSize(0);
                }
                else
                {
                    this.writeSize(v.length);
                    this.expand(v.length);
                    this._buf.putArray(v);
                }
            },
            readByteSeq: function()
            {
                return this._buf.getArray(this.readAndCheckSeqSize(1));
            },
            writeBool: function(v)
            {
                this.expand(1);
                this._buf.put(v ? 1 : 0);
            },
            rewriteBool: function(v, dest)
            {
                this._buf.putAt(dest, v ? 1 : 0);
            },
            readBool: function()
            {
                try
                {
                    return this._buf.get() === 1;
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            writeShort: function(v)
            {
                this.expand(2);
                this._buf.putShort(v);
            },
            readShort: function()
            {
                try
                {
                    return this._buf.getShort();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            writeInt: function(v)
            {
                this.expand(4);
                this._buf.putInt(v);
            },
            rewriteInt: function(v, dest)
            {
                this._buf.putIntAt(dest, v);
            },
            readInt: function()
            {
                try
                {
                    return this._buf.getInt();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            writeLong: function(v)
            {
                this.expand(8);
                this._buf.putLong(v);
            },
            readLong: function()
            {
                try
                {
                    return this._buf.getLong();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            writeFloat: function(v)
            {
                this.expand(4);
                this._buf.putFloat(v);
            },
            readFloat: function()
            {
                try
                {
                    return this._buf.getFloat();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            writeDouble: function(v)
            {
                this.expand(8);
                this._buf.putDouble(v);
            },
            readDouble: function()
            {
                try
                {
                    return this._buf.getDouble();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            writeString: function(v)
            {
                if(v === null || v.length === 0)
                {
                    this.writeSize(0);
                }
                else
                {
                    this._buf.writeString(this, v);
                }
            },
            readString: function()
            {
                var len = this.readSize();
                if(len === 0)
                {
                    return "";
                }
                //
                // Check the buffer has enough bytes to read.
                //
                if(this._buf.remaining < len)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
        
                try
                {
                    return this._buf.getString(len);
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            },
            writeProxy: function(v)
            {
                this._instance.proxyFactory().proxyToStream(v, this);
            },
            writeOptProxy: function(tag, v)
            {
                if(v !== undefined)
                {
                    if(this.writeOpt(tag, OptionalFormat.FSize))
                    {
                        var pos = this.startSize();
                        this.writeProxy(v);
                        this.endSize(pos);
                    }
                }
            },
            readProxy: function(type)
            {
                return this._instance.proxyFactory().streamToProxy(this, type);
            },
            readOptProxy: function(tag, type)
            {
                if(this.readOpt(tag, OptionalFormat.FSize))
                {
                    this.skip(4);
                    return this.readProxy(type);
                }
                else
                {
                    return undefined;
                }
            },
            writeEnum: function(v)
            {
                if(this.isWriteEncoding_1_0())
                {
                    if(v.maxValue < 127)
                    {
                        this.writeByte(v.value);
                    }
                    else if(v.maxValue < 32767)
                    {
                        this.writeShort(v.value);
                    }
                    else
                    {
                        this.writeInt(v.value);
                    }
                }
                else
                {
                    this.writeSize(v.value);
                }
            },
            readEnum: function(T)
            {
                var v;
                if(this.getReadEncoding().equals(Ice.Encoding_1_0))
                {
                    if(T.maxValue < 127)
                    {
                        v = this.readByte();
                    }
                    else if(T.maxValue < 32767)
                    {
                        v = this.readShort();
                    }
                    else
                    {
                        v = this.readInt();
                    }
                }
                else
                {
                    v = this.readSize();
                }
        
                var e = T.valueOf(v);
                if(e === undefined)
                {
                    throw new Ice.MarshalException("enumerator value " + v + " is out of range");
                }
                return e;
            },
            readOptEnum: function(tag, T)
            {
                if(this.readOpt(tag, OptionalFormat.Size))
                {
                    return this.readEnum(T);
                }
                else
                {
                    return undefined;
                }
            },
            writeObject: function(v)
            {
                this.initWriteEncaps();
                this._writeEncapsStack.encoder.writeObject(v);
            },
            writeOptObject: function(tag, v)
            {
                if(v !== undefined)
                {
                    if(this.writeOpt(tag, OptionalFormat.Class))
                    {
                        this.writeObject(v);
                    }
                }
            },
            readObject: function(patcher, T)
            {
                this.initReadEncaps();
                //
                // BUGFIX:
                // With Chrome linux the invokation of readObject on the decoder some times
                // calls BasicStream.readObject with the decoder object as this param.
                // Use call instead of directly invoke the method to workaround this bug.
                //
                this._readEncapsStack.decoder.readObject.call(
                    this._readEncapsStack.decoder,
                    function(obj){
                        if(obj !== null && !(obj.ice_instanceof(T)))
                        {
                            ExUtil.throwUOE(T.ice_staticId(), obj);
                        }
                        patcher(obj);
                    });
            },
            readOptObject: function(tag, patcher, T)
            {
                if(this.readOpt(tag, OptionalFormat.Class))
                {
                    this.readObject(patcher, T);
                }
                else
                {
                    patcher(undefined);
                }
            },
            writeUserException: function(e)
            {
                this.initWriteEncaps();
                this._writeEncapsStack.encoder.writeUserException(e);
            },
            throwException: function()
            {
                this.initReadEncaps();
                this._readEncapsStack.decoder.throwException();
            },
            sliceObjects: function(b)
            {
                this._sliceObjects = b;
            },
            readOptImpl: function(readTag, expectedFormat)
            {
                var b, v, format, tag, offset;
        
                if(this.isReadEncoding_1_0())
                {
                    return false; // Optional members aren't supported with the 1.0 encoding.
                }
        
                while(true)
                {
                    if(this._buf.position >= this._readEncapsStack.start + this._readEncapsStack.sz)
                    {
                        return false; // End of encapsulation also indicates end of optionals.
                    }
        
                    v = this.readByte();
        
                    if(v === OPTIONAL_END_MARKER)
                    {
                        this._buf.position -= 1; // Rewind.
                        return false;
                    }
        
                    format = OptionalFormat.valueOf(v & 0x07); // First 3 bits.
                    tag = v >> 3;
                    if(tag === 30)
                    {
                        tag = this.readSize();
                    }
        
                    if(tag > readTag)
                    {
                        offset = tag < 30 ? 1 : (tag < 255 ? 2 : 6); // Rewind
                        this._buf.position -= offset;
                        return false; // No optional data members with the requested tag.
                    }
        
                    if(tag < readTag)
                    {
                        this.skipOpt(format); // Skip optional data members
                    }
                    else
                    {
                        if(format !== expectedFormat)
                        {
                            throw new Ice.MarshalException("invalid optional data member `" + tag + "': unexpected format");
                        }
                        return true;
                    }
                }
            },
            writeOptImpl: function(tag, format)
            {
                if(this.isWriteEncoding_1_0())
                {
                    return false; // Optional members aren't supported with the 1.0 encoding.
                }
        
                var v = format.value;
                if(tag < 30)
                {
                    v |= tag << 3;
                    this.writeByte(v);
                }
                else
                {
                    v |= 0x0F0; // tag = 30
                    this.writeByte(v);
                    this.writeSize(tag);
                }
                return true;
            },
            skipOpt: function(format)
            {
                switch(format)
                {
                    case OptionalFormat.F1:
                        this.skip(1);
                        break;
                    case OptionalFormat.F2:
                        this.skip(2);
                        break;
                    case OptionalFormat.F4:
                        this.skip(4);
                        break;
                    case OptionalFormat.F8:
                        this.skip(8);
                        break;
                    case OptionalFormat.Size:
                        this.skipSize();
                        break;
                    case OptionalFormat.VSize:
                        this.skip(this.readSize());
                        break;
                    case OptionalFormat.FSize:
                        this.skip(this.readInt());
                        break;
                    case OptionalFormat.Class:
                        this.readObject(null, Ice.Object);
                        break;
                }
            },
            skipOpts: function()
            {
                var b, v, format;
                //
                // Skip remaining un-read optional members.
                //
                while(true)
                {
                    if(this._buf.position >= this._readEncapsStack.start + this._readEncapsStack.sz)
                    {
                        return; // End of encapsulation also indicates end of optionals.
                    }
        
                    b = this.readByte();
                    v = b < 0 ? b + 256 : b;
                    if(v === OPTIONAL_END_MARKER)
                    {
                        return;
                    }
        
                    format = OptionalFormat.valueOf(v & 0x07); // Read first 3 bits.
                    if((v >> 3) === 30)
                    {
                        this.skipSize();
                    }
                    this.skipOpt(format);
                }
            },
            skip: function(size)
            {
                if(size > this._buf.remaining)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                this._buf.position += size;
            },
            skipSize: function()
            {
                var b = this.readByte();
                if(b === 255)
                {
                    this.skip(4);
                }
            },
            isEmpty: function()
            {
                return this._buf.empty();
            },
            expand: function(n)
            {
                this._buf.expand(n);
            },
            createObject: function(id)
            {
                var obj = null, Class;
                try
                {
                    var typeId = id.length > 2 ? id.substr(2).replace(/::/g, ".") : "";
                    /*jshint -W061 */
                    Class = __M.type(typeId);
                    /*jshint +W061 */
                    if(Class !== undefined)
                    {
                        obj = new Class();
                    }
                }
                catch(ex)
                {
                    throw new Ice.NoObjectFactoryException("no object factory", id, ex);
                }
        
                return obj;
            },
            getTypeId: function(compactId)
            {
                var typeId = Ice.CompactIdRegistry.get(compactId);
                return typeId === undefined ? "" : typeId;
            },
            isReadEncoding_1_0: function()
            {
                return this._readEncapsStack !== null ? this._readEncapsStack.encoding_1_0 : this._encoding.equals(Ice.Encoding_1_0);
            },
            isWriteEncoding_1_0: function()
            {
                return this._writeEncapsStack ? this._writeEncapsStack.encoding_1_0 : this._encoding.equals(Ice.Encoding_1_0);
            },
            initReadEncaps: function()
            {
                if(this._readEncapsStack === null) // Lazy initialization
                {
                    this._readEncapsStack = this._readEncapsCache;
                    if(this._readEncapsStack !== null)
                    {
                        this._readEncapsCache = this._readEncapsCache.next;
                    }
                    else
                    {
                        this._readEncapsStack = new ReadEncaps();
                    }
                    this._readEncapsStack.setEncoding(this._encoding);
                    this._readEncapsStack.sz = this._buf.limit;
                }
        
                if(this._readEncapsStack.decoder === null) // Lazy initialization.
                {
                    var factoryManager = this._instance.servantFactoryManager();
                    if(this._readEncapsStack.encoding_1_0)
                    {
                        this._readEncapsStack.decoder = new EncapsDecoder10(this, this._readEncapsStack, this._sliceObjects, factoryManager);
                    }
                    else
                    {
                        this._readEncapsStack.decoder = new EncapsDecoder11(this, this._readEncapsStack, this._sliceObjects, factoryManager);
                    }
                }
            },
            initWriteEncaps: function()
            {
                if(!this._writeEncapsStack) // Lazy initialization
                {
                    this._writeEncapsStack = this._writeEncapsCache;
                    if(this._writeEncapsStack)
                    {
                        this._writeEncapsCache = this._writeEncapsCache.next;
                    }
                    else
                    {
                        this._writeEncapsStack = new WriteEncaps();
                    }
                    this._writeEncapsStack.setEncoding(this._encoding);
                }
        
                if(this._writeEncapsStack.format === FormatType.DefaultFormat)
                {
                    this._writeEncapsStack.format = this._instance.defaultsAndOverrides().defaultFormat;
                }
        
                if(!this._writeEncapsStack.encoder) // Lazy initialization.
                {
                    if(this._writeEncapsStack.encoding_1_0)
                    {
                        this._writeEncapsStack.encoder = new EncapsEncoder10(this, this._writeEncapsStack);
                    }
                    else
                    {
                        this._writeEncapsStack.encoder = new EncapsEncoder11(this, this._writeEncapsStack);
                    }
                }
            },
            createUserException: function(id)
            {
                var userEx = null, Class;
        
                try
                {
                    var typeId = id.length > 2 ? id.substr(2).replace(/::/g, ".") : "";
                    /*jshint -W061 */
                    Class = __M.type(typeId);
                    /*jshint +W061 */
                    if(Class !== undefined)
                    {
                        userEx = new Class();
                    }
                }
                catch(ex)
                {
                    throw new Ice.MarshalException(ex);
                }
        
                return userEx;
            }
        });
        
        var defineProperty = Object.defineProperty;
        
        defineProperty(BasicStream.prototype, "pos", {
            get: function() { return this._buf.position; },
            set: function(n) { this._buf.position = n; }
        });
        
        defineProperty(BasicStream.prototype, "size", {
            get: function() { return this._buf.limit; }
        });
        
        defineProperty(BasicStream.prototype, "instance", {
            get: function() { return this._instance; }
        });
        
        defineProperty(BasicStream.prototype, "closure", {
            get: function() { return this._type; },
            set: function(type) { this._type = type; }
        });
        
        defineProperty(BasicStream.prototype, "buffer", {
            get: function() { return this._buf; }
        });
        
        var defineBuiltinHelper = function(write, read, sz, format, min, max)
        {
            var helper = {
                write: function(os, v) { return write.call(os, v); },
                read: function(is) { return read.call(is); },
                writeOpt: function(os, tag, v) { os.writeOptValue(tag, format, write, v); },
                readOpt: function(is, tag) { return is.readOptValue(tag, format, read); },
            };
            
            if(min !== undefined && max !== undefined)
            {
                helper.validate = function(v) {
                    return v >= min && v <= max;
                };
            }
            defineProperty(helper, "minWireSize", {
                get: function() { return sz; }
            });
            return helper;
        };
        
        var stream = BasicStream.prototype;
        
        
        //
        // Constants to use in number type range checks.
        //
        var MIN_UINT8_VALUE = 0x0;
        var MAX_UINT8_VALUE = 0xFF;
        
        var MIN_INT16_VALUE = -0x8000;
        var MAX_INT16_VALUE = 0x7FFF;
        
        var MIN_UINT32_VALUE = 0x0;
        var MAX_UINT32_VALUE = 0xFFFFFFFF;
        
        var MIN_INT32_VALUE = -0x80000000;
        var MAX_INT32_VALUE = 0x7FFFFFFF;
        
        var MIN_FLOAT32_VALUE = -3.4028234664e+38;
        var MAX_FLOAT32_VALUE = 3.4028234664e+38;
        
        Ice.ByteHelper = defineBuiltinHelper(stream.writeByte, stream.readByte, 1, Ice.OptionalFormat.F1, 
                                             MIN_UINT8_VALUE, MAX_UINT8_VALUE);
        
        Ice.ShortHelper = defineBuiltinHelper(stream.writeShort, stream.readShort, 2, Ice.OptionalFormat.F2,
                                              MIN_INT16_VALUE, MAX_INT16_VALUE);
        
        Ice.IntHelper = defineBuiltinHelper(stream.writeInt, stream.readInt, 4, Ice.OptionalFormat.F4, 
                                            MIN_INT32_VALUE, MAX_INT32_VALUE);
        
        Ice.FloatHelper = defineBuiltinHelper(stream.writeFloat, stream.readFloat, 4, Ice.OptionalFormat.F4,
                                              MIN_FLOAT32_VALUE, MAX_FLOAT32_VALUE);
        
        Ice.DoubleHelper = defineBuiltinHelper(stream.writeDouble, stream.readDouble, 8, Ice.OptionalFormat.F8,
                                               -Number.MAX_VALUE, Number.MAX_VALUE);
        
        Ice.BoolHelper = defineBuiltinHelper(stream.writeBool, stream.readBool, 1, Ice.OptionalFormat.F1);
        Ice.LongHelper = defineBuiltinHelper(stream.writeLong, stream.readLong, 8, Ice.OptionalFormat.F8);
        Ice.LongHelper.validate = function(v)
        {
            //
            // For a long to be valid both words must be within the range of UINT32
            //
            return v.low >= MIN_UINT32_VALUE && v.low <= MAX_UINT32_VALUE && 
                   v.high >= MIN_UINT32_VALUE && v.high <= MAX_UINT32_VALUE;
        };
        
        Ice.StringHelper = defineBuiltinHelper(stream.writeString, stream.readString, 1, Ice.OptionalFormat.VSize);
        
        Ice.ObjectHelper = {
            write: function(os, v)
            {
                os.writeObject(v);
            },
            read: function(is)
            {
                var o;
                is.readObject(function(v) { o = v; }, Ice.Object);
                return o;
            },
            writeOpt: function(os, tag, v)
            {
                os.writeOptValue(tag, Ice.OptionalFormat.Class, stream.writeObject, v);
            },
            readOpt: function(is, tag)
            {
                var o;
                is.readOptObject(tag, function(v) { o = v; }, Ice.Object);
                return o;
            },
        };
        
        defineProperty(Ice.ObjectHelper, "minWireSize", {
            get: function() { return 1; }
        });
        
        Ice.BasicStream = BasicStream;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        Ice.SocketOperation = 
        {
            None: 0,
            Read: 1,
            Write: 2,
            Connect: 2 // Same as Write
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        //
        // NOTE: the protocol instance class is a bit different from other
        // language mappinps since it also provides the secure property for
        // the tranport. Since we don't support SSL but still want to be able
        // to parse SSL endpoints, we simply re-use the TCP endpoint with a
        // different protocol instance to support SSL endpoints.
        //
        // If SSL endpoints attributes were to diverge from TCP endpoints or
        // if we want to support SSL, we'd have to change this and instead, do
        // like in other mappings: have a separate implementation for the SSL
        // endpoint and suppress the secure member of the protocol instance
        // class bellow.
        //
        var ProtocolInstance = Ice.Class({
            __init__: function(instance, type, protocol, secure)
            {
                this._instance = instance;
                this._traceLevel = instance.traceLevels().network;
                this._traceCategory = instance.traceLevels().networkCat;
                this._logger = instance.initializationData().logger;
                this._properties = instance.initializationData().properties;
                this._type = type;
                this._protocol = protocol;
                this._secure = secure;
            },
            traceLevel: function()
            {
                return this._traceLevel;
            },
            traceCategory: function()
            {
                return this._traceCategory;
            },
            logger: function()
            {
                return this._logger;
            },
            protocol: function()
            {
                return this._protocol;
            },
            type: function()
            {
                return this._type;
            },
            secure: function()
            {
                return this._secure;
            },
            properties: function()
            {
                return this._properties;
            },
            defaultHost: function()
            {
                return this._instance.defaultsAndOverrides().defaultHost;
            },
            defaultSourceAddress: function()
            {
                return this._instance.defaultsAndOverrides().defaultSourceAddress;
            },
            defaultEncoding: function()
            {
                return this._instance.defaultsAndOverrides().defaultEncoding;
            },
            defaultTimeout: function()
            {
                return this._instance.defaultsAndOverrides().defaultTimeout;
            },
            messageSizeMax: function()
            {
                return this._instance.messageSizeMax();
            }
        });
        
        Ice.ProtocolInstance = ProtocolInstance;
        
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `EndpointF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
            Slice.defineSequence(Ice, "EndpointSeqHelper", "Ice.ObjectHelper", false, "Ice.Endpoint");
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var AsyncResultBase = Ice.AsyncResultBase;
        var Debug = Ice.Debug;
        var Promise = Ice.Promise;
        var Protocol = Ice.Protocol;
        var UserException = Ice.UserException;
        var BasicStream = Ice.BasicStream;
        
        var AsyncResult = Ice.Class(AsyncResultBase, {
            __init__: function(com, op, connection, proxy, adapter, completedFn)
            {
                //
                // AsyncResult can be constructed by a sub-type's prototype, in which case the
                // arguments are undefined.
                //
                AsyncResultBase.call(this, com, op, connection, proxy, adapter);
                if(com === undefined)
                {
                    return;
                }
                
                this._completed = completedFn;
                this._is = null;
                this._os = com !== null ? new BasicStream(this._instance, Protocol.currentProtocolEncoding) : null;
                this._state = 0;
                this._exception = null;
                this._sentSynchronously = false;
            },
            cancel: function()
            {
                this.__cancel(new Ice.InvocationCanceledException());
            },
            isCompleted: function()
            {
                return (this._state & AsyncResult.Done) > 0;
            },
            isSent: function()
            {
                return (this._state & AsyncResult.Sent) > 0;
            },
            throwLocalException: function()
            {
                if(this._exception !== null)
                {
                    throw this._exception;
                }
            },
            sentSynchronously: function()
            {
                return this._sentSynchronously;
            },
            __markSent: function(done)
            {
                Debug.assert((this._state & AsyncResult.Done) === 0);
                this._state |= AsyncResult.Sent;
                if(done)
                {
                    this._state |= AsyncResult.Done | AsyncResult.OK;
                    this._cancellationHandler = null;
                    this.succeed(this);
                }
            },
            __markFinished: function(ok, completed)
            {
                Debug.assert((this._state & AsyncResult.Done) === 0);
                this._state |= AsyncResult.Done;
                if(ok)
                {
                    this._state |= AsyncResult.OK;
                }
                this._cancellationHandler = null;
                if(completed)
                {
                    completed(this);
                }
                else
                {
                    this.succeed(this);
                }
            },
            __markFinishedEx: function(ex)
            {
                Debug.assert((this._state & AsyncResult.Done) === 0);
                this._exception = ex;
                this._state |= AsyncResult.Done;
                this._cancellationHandler = null;
                this.fail(ex, this);
            },
            __cancel: function(ex)
            {
                this._cancellationException = ex;
                if(this._cancellationHandler)
                {
                    this._cancellationHandler.asyncRequestCanceled(this, ex);
                }
            },
            __cancelable: function(handler)
            {
                if(this._cancellationException)
                {
                    try
                    {
                        throw this._cancellationException;
                    }
                    finally
                    {
                        this._cancellationException = null;
                    }
                }
                this._cancellationHandler = handler;
            },
            __os: function()
            {
                return this._os;
            },
            __is: function()
            {
                return this._is;
            },
            __startReadParams: function()
            {
                this._is.startReadEncaps();
                return this._is;
            },
            __endReadParams: function()
            {
                this._is.endReadEncaps();
            },
            __readEmptyParams: function()
            {
                this._is.skipEmptyEncaps(null);
            },
            __readParamEncaps: function()
            {
                return this._is.readEncaps(null);
            },
            __throwUserException: function()
            {
                Debug.assert((this._state & AsyncResult.Done) !== 0);
                if((this._state & AsyncResult.OK) === 0)
                {
                    try
                    {
                        this._is.startReadEncaps();
                        this._is.throwException();
                    }
                    catch(ex)
                    {
                        if(ex instanceof UserException)
                        {
                            this._is.endReadEncaps();
                        }
                        throw ex;
                    }
                }
            },
        });
        
        AsyncResult.OK = 0x1;
        AsyncResult.Done = 0x2;
        AsyncResult.Sent = 0x4;
        
        Ice.AsyncResult = AsyncResult;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
            
        
        Ice.Address = function(host, port)
        {
            this.host = host;
            this.port = port;
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var BasicStream = Ice.BasicStream;
        var Debug = Ice.Debug;
        var ExUtil = Ice.ExUtil;
        var Class = Ice.Class;
        var Protocol = Ice.Protocol;
        
        var udpOverhead = 20 + 8;
        
        var BatchRequestQueue = Class({
            __init__: function(instance, datagram)
            {
                this._batchStreamInUse = false;
                this._batchRequestNum = 0;
                this._batchStream = new BasicStream(instance, Protocol.currentProtocolEncoding);
                this._batchStream.writeBlob(Protocol.requestBatchHdr);
                this._batchMarker = this._batchStream.size;
                this._exception = null;
        
                this._maxSize = instance.batchAutoFlushSize();
                if(this._maxSize > 0 && datagram)
                {
                    var props = instance.initializationData().properties;
                    var udpSndSize = props.getPropertyAsIntWithDefault("Ice.UDP.SndSize", 65535 - udpOverhead);
                    if(udpSndSize < this._maxSize)
                    {
                        this._maxSize = udpSndSize;
                    }
                }
            },
            prepareBatchRequest: function(os)
            {
                if(this._exception)
                {
                    throw this._exception;
                }
                this._batchStream.swap(os);
            },
            finishBatchRequest: function(os, proxy, operation)
            {
                //
                // No need for synchronization, no other threads are supposed
                // to modify the queue since we set this._batchStreamInUse to true.
                //
                this._batchStream.swap(os);
        
                try
                {
                    if(this._maxSize > 0 && this._batchStream.size >= this._maxSize)
                    {
                        proxy.ice_flushBatchRequests(); // Auto flush
                    }
        
                    Debug.assert(this._batchMarker < this._batchStream.size);
                    this._batchMarker = this._batchStream.size;
                    ++this._batchRequestNum;
                }
                finally
                {
                    this._batchStream.resize(this._batchMarker);
                }
            },
            abortBatchRequest: function(os)
            {
                this._batchStream.swap(os);
                this._batchStream.resize(this._batchMarker);
            },
            swap: function(os)
            {
                if(this._batchRequestNum === 0)
                {
                    return 0;
                }
        
                var lastRequest = null;
                if(this._batchMarker < this._batchStream.size)
                {
                    var length = this._batchStream.size - this._batchMarker;
                    this._batchStream.pos = this._batchMarker;
                    lastRequest = this._batchStream.buffer.getArray(length);
                    this._batchStream.resize(this._batchMarker);
                }
        
                var requestNum = this._batchRequestNum;
                this._batchStream.swap(os);
        
                //
                // Reset the batch.
                //
                this._batchRequestNum = 0;
                this._batchStream.writeBlob(Protocol.requestBatchHdr);
                this._batchMarker = this._batchStream.size;
                if(lastRequest !== null)
                {
                    this._batchStream.writeBlob(lastRequest);
                }
                return requestNum;
            },
            destroy: function(ex)
            {
                this._exception = ex;
            },
            isEmpty: function()
            {
                return this._batchStream.size === Protocol.requestBatchHdr.length;
            }
        });
        
        Ice.BatchRequestQueue = BatchRequestQueue;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var HashMap = Ice.HashMap;
        var CommunicatorDestroyedException = Ice.CommunicatorDestroyedException;
        
        var Timer = Ice.Class({
            __init__: function(logger)
            {
                this._logger = logger;
                this._destroyed = false;
                this._tokenId = 0;
                this._tokens = new HashMap();
            },
            destroy: function()
            {
                var self = this;
                this._tokens.forEach(function(key, value){
                    self.cancel(key);
                });
                this._destroyed = true;
                this._tokens.clear();
            },
            schedule: function(callback, delay)
            {
                if(this._destroyed)
                {
                    throw new CommunicatorDestroyedException();
                }
        
                var token = this._tokenId++;
                var self = this;
                var id = Timer.setTimeout(function() { self.handleTimeout(token); }, delay);
                this._tokens.set(token, { callback: callback, id: id, isInterval: false });
        
                return token;
            },
            scheduleRepeated: function(callback, period)
            {
                if(this._destroyed)
                {
                    throw new CommunicatorDestroyedException();
                }
        
                var token = this._tokenId++;
                var self = this;
        
                var id = Timer.setInterval(function() { self.handleInterval(token); }, period);
                this._tokens.set(token, { callback: callback, id: id, isInterval: true });
        
                return token;
            },
            cancel: function(id)
            {
                if(this._destroyed)
                {
                    return false;
                }
        
                var token = this._tokens.get(id);
                if(token === undefined)
                {
                    return false;
                }
        
                this._tokens.delete(id);
                if(token.isInterval)
                {
                    Timer.clearInterval(token.id);
                }
                else
                {
                    Timer.clearTimeout(token.id);
                }
        
                return true;
            },
            handleTimeout: function(id)
            {
                if(this._destroyed)
                {
                    return;
                }
        
                var token = this._tokens.get(id);
                if(token !== undefined)
                {
                    this._tokens.delete(id);
                    try
                    {
                        token.callback();
                    }
                    catch(ex)
                    {
                        this._logger.warning("uncaught exception while executing timer:\n" + ex);
                    }
                }
            },
            handleInterval: function(id)
            {
                if(this._destroyed)
                {
                    return;
                }
        
                var token = this._tokens.get(id);
                if(token !== undefined)
                {
                    try
                    {
                        token.callback();
                    }
                    catch(ex)
                    {
                        this._logger.warning("uncaught exception while executing timer:\n" + ex);
                    }
                }
            }
        });
        
        Timer.setTimeout = Ice.Timer.setTimeout;
        Timer.clearTimeout = Ice.Timer.clearTimeout;
        Timer.setInterval = Ice.Timer.setInterval;
        Timer.clearInterval = Ice.Timer.clearInterval;
        Timer.setImmediate = Ice.Timer.setImmediate;
        
        Ice.Timer = Timer;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Class = Ice.Class;
        
        var RetryQueue = Class({
            __init__: function(instance)
            {
                this._instance = instance;
                this._requests = [];
            },
            add: function(outAsync, interval)
            {
                if(this._instance === null)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
                var task = new RetryTask(this._instance, this, outAsync);
                outAsync.__cancelable(task); // This will throw if the request is canceled
                task.token = this._instance.timer().schedule(function()
                                                             {
                                                                 task.run();
                                                             }, interval);
                this._requests.push(task);
            },
            destroy: function()
            {
                for(var i = 0; i < this._requests.length; ++i)
                {
                    this._instance.timer().cancel(this._requests[i].token);
                    this._requests[i].destroy();
                }
                this._requests = [];
                this._instance = null;
            },
            remove: function(task)
            {
                var idx = this._requests.indexOf(task);
                if(idx >= 0)
                {
                    this._requests.splice(idx, 1);
                }
            },
            cancel: function(task)
            {
                var idx = this._requests.indexOf(task);
                if(idx >= 0)
                {
                    this._requests.splice(idx, 1);
                    return this._instance.timer().cancel(task.token);
                }
                return false;
            }
        });
        Ice.RetryQueue = RetryQueue;
        
        var RetryTask = Class({
            __init__: function(instance, queue, outAsync, interval)
            {
                this._instance = instance;
                this._queue = queue;
                this._outAsync = outAsync;
            },
            run: function()
            {
                this._outAsync.__retry();
                this._queue.remove(this);
            },
            destroy: function()
            {
                try
                {
                    this._outAsync.__abort(new Ice.CommunicatorDestroyedException());
                }
                catch(ex)
                {
                    // Abort shouldn't throw if there's no callback, ignore.
                }
            },
            asyncRequestCanceled: function(outAsync, ex)
            {
                if(this._queue.cancel(this))
                {
                    if(this._instance.traceLevels().retry >= 1)
                    {
                        this._instance.initializationData().logger.trace(this._instance.traceLevels().retryCat,
                                                                         "operation retry canceled\n" + ex.toString());
                    }
                    this._outAsync.__completedEx(ex);
                }
            }
        });
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var ArrayUtil = Ice.ArrayUtil;
        var Debug = Ice.Debug;
        var HashMap = Ice.HashMap;
        var Promise = Ice.Promise;
        
        var RouterInfo = Ice.Class({
            __init__: function(router)
            {
                this._router = router;
        
                Debug.assert(this._router !== null);
        
                this._clientEndpoints = null;
                this._serverEndpoints = null;
                this._adapter = null;
                this._identities = new HashMap(HashMap.compareEquals); // Set<Identity> = Map<Identity, 1>
                this._evictedIdentities = [];
            },
            destroy: function()
            {
                this._clientEndpoints = [];
                this._serverEndpoints = [];
                this._adapter = null;
                this._identities.clear();
            },
            equals: function(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
        
                if(rhs instanceof RouterInfo)
                {
                    return this._router.equals(rhs._router);
                }
        
                return false;
            },
            hashCode: function()
            {
                return this._router.hashCode();
            },
            getRouter: function()
            {
                //
                // No mutex lock necessary, _router is immutable.
                //
                return this._router;
            },
            getClientEndpoints: function()
            {
                var promise = new Promise();
        
                if(this._clientEndpoints !== null)
                {
                    promise.succeed(this._clientEndpoints);
                }
                else
                {
                    var self = this;
                    this._router.getClientProxy().then(
                        function(clientProxy)
                        {
                            self.setClientEndpoints(clientProxy, promise);
                        }).exception(
                            function(ex)
                            {
                                promise.fail(ex);
                            });
                }
        
                return promise;
            },
            getServerEndpoints: function()
            {
                if(this._serverEndpoints !== null) // Lazy initialization.
                {
                    return new Promise().succeed(this._serverEndpoints);
                }
                else
                {
                    var self = this;
                    return this._router.getServerProxy().then(
                        function(proxy)
                        {
                            return self.setServerEndpoints(proxy);
                        });
                }
            },
            addProxy: function(proxy)
            {
                Debug.assert(proxy !== null);
        
                if(this._identities.has(proxy.ice_getIdentity()))
                {
                    //
                    // Only add the proxy to the router if it's not already in our local map.
                    //
                    return new Promise().succeed();
                }
                else
                {
                    var self = this;
                    return this._router.addProxies([ proxy ]).then(
                        function(evictedProxies)
                        {
                            self.addAndEvictProxies(proxy, evictedProxies);
                        });
                }
            },
            setAdapter: function(adapter)
            {
                this._adapter = adapter;
            },
            getAdapter: function()
            {
                return this._adapter;
            },
            clearCache: function(ref)
            {
                this._identities.delete(ref.getIdentity());
            },
            setClientEndpoints: function(clientProxy, promise)
            {
                if(this._clientEndpoints === null)
                {
                    if(clientProxy === null)
                    {
                        //
                        // If getClientProxy() return nil, use router endpoints.
                        //
                        this._clientEndpoints = this._router.__reference().getEndpoints();
                        promise.succeed(this._clientEndpoints);
                    }
                    else
                    {
                        clientProxy = clientProxy.ice_router(null); // The client proxy cannot be routed.
        
                        //
                        // In order to avoid creating a new connection to the
                        // router, we must use the same timeout as the already
                        // existing connection.
                        //
                        var self = this;
                        this._router.ice_getConnection().then(
                            function(con)
                            {
                                var proxy = clientProxy.ice_timeout(con.timeout());
                                self._clientEndpoints = proxy.__reference().getEndpoints();
                                promise.succeed(self._clientEndpoints);
                            }).exception(
                                function(ex)
                                {
                                    promise.fail(ex);
                                });
                    }
                }
                else
                {
                    promise.succeed(this._clientEndpoints);
                }
            },
            setServerEndpoints: function(serverProxy)
            {
                if(serverProxy === null)
                {
                    throw new Ice.NoEndpointException();
                }
        
                serverProxy = serverProxy.ice_router(null); // The server proxy cannot be routed.
                this._serverEndpoints = serverProxy.__reference().getEndpoints();
                return this._serverEndpoints;
            },
            addAndEvictProxies: function(proxy, evictedProxies)
            {
                //
                // Check if the proxy hasn't already been evicted by a
                // concurrent addProxies call. If it's the case, don't
                // add it to our local map.
                //
                var index = ArrayUtil.indexOf(this._evictedIdentities, proxy.ice_getIdentity(),
                                            function(i1, i2) { return i1.equals(i2); });
                if(index >= 0)
                {
                    this._evictedIdentities.splice(index, 1);
                }
                else
                {
                    //
                    // If we successfully added the proxy to the router,
                    // we add it to our local map.
                    //
                    this._identities.set(proxy.ice_getIdentity(), 1);
                }
        
                //
                // We also must remove whatever proxies the router evicted.
                //
                for(var i = 0; i < evictedProxies.length; ++i)
                {
                    this._identities.delete(evictedProxies[i].ice_getIdentity());
                }
            }
        });
        
        Ice.RouterInfo = RouterInfo;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_FOR_ACTIONSCRIPT_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var AsyncStatus = Ice.AsyncStatus;
        var AsyncResult = Ice.AsyncResult;
        var BasicStream = Ice.BasicStream;
        var Debug = Ice.Debug;
        var HashMap = Ice.HashMap;
        var RetryException = Ice.RetryException;
        var OperationMode = Ice.OperationMode;
        var Protocol = Ice.Protocol;
        var Identity = Ice.Identity;
        
        var OutgoingAsyncBase = Ice.Class(AsyncResult, {
            __init__ : function(communicator, operation, connection, proxy, adapter)
            {
                if(communicator !== undefined)
                {
                    AsyncResult.call(this, communicator, operation, connection, proxy, adapter);
                    this._os = new BasicStream(this._instance, Protocol.currentProtocolEncoding);
                }
                else
                {
                    AsyncResult.call(this);
                }
            },
            __os: function()
            {
                return this._os;
            },
            __sent: function()
            {
                this.__markSent(true);
            },
            __completedEx: function(ex)
            {
                this.__markFinishedEx(ex);
            }
        });
        
        
        var ProxyOutgoingAsyncBase = Ice.Class(OutgoingAsyncBase, {
            __init__ : function(prx, operation)
            {
                if(prx !== undefined)
                {
                    OutgoingAsyncBase.call(this, prx.ice_getCommunicator(), operation, null, prx, null);
                    this._mode = null;
                    this._cnt = 0;
                    this._sent = false;
                    this._handler = null;
                }
                else
                {
                    AsyncResult.call(this);
                }
            },
            __completedEx: function(ex)
            {
                try
                {
                    this._instance.retryQueue().add(this, this.__handleException(ex));
                }
                catch(ex)
                {
                    this.__markFinishedEx(ex);
                }
            },
            __retryException: function(ex)
            {
                try
                {
                    this._proxy.__updateRequestHandler(this._handler, null); // Clear request handler and always retry.
                    this._instance.retryQueue().add(this, 0);
                }
                catch(ex)
                {
                    this.__completedEx(ex);
                }
            },
            __retry: function()
            {
                this.__invokeImpl(false);
            },
            __abort: function(ex)
            {
                this.__markFinishedEx(ex);
            },
            __invokeImpl: function(userThread)
            {
                try
                {
                    if(userThread)
                    {
                        var invocationTimeout = this._proxy.__reference().getInvocationTimeout();
                        if(invocationTimeout > 0)
                        {
                            var self = this;
                            this._timeoutToken = this._instance.timer().schedule(
                                function()
                                {
                                    self.__cancel(new Ice.InvocationTimeoutException());
                                },
                                invocationTimeout);
                        }
                    }
        
                    while(true)
                    {
                        try
                        {
                            this._sent  = false;
                            this._handler = this._proxy.__getRequestHandler();
                            var status = this._handler.sendAsyncRequest(this);
                            if((status & AsyncStatus.Sent) > 0)
                            {
                                if(userThread)
                                {
                                    this._sentSynchronously = true;
                                }
                            }
                            return; // We're done!
                        }
                        catch(ex)
                        {
                            if(ex instanceof RetryException)
                            {
                                // Clear request handler and always retry
                                this._proxy.__updateRequestHandler(this._handler, null);
                            }
                            else
                            {
                                var interval = this.__handleException(ex);
                                if(interval > 0)
                                {
                                    this._instance.retryQueue().add(this, interval);
                                    return;
                                }
                            }
                        }
                    }
                }
                catch(ex)
                {
                    this.__markFinishedEx(ex);
                }
            },
            __markSent: function(done)
            {
                this._sent = true;
                if(done)
                {
                    if(this._timeoutToken)
                    {
                        this._instance.timer().cancel(this._timeoutToken);
                    }
                }
                OutgoingAsyncBase.prototype.__markSent.call(this, done);
            },
            __markFinishedEx: function(ex)
            {
                if(this._timeoutToken)
                {
                    this._instance.timer().cancel(this._timeoutToken);
                }
                OutgoingAsyncBase.prototype.__markFinishedEx.call(this, ex);
            },
            __handleException: function(ex)
            {
                var interval = { value: 0 };
                this._cnt = this._proxy.__handleException(ex, this._handler, this._mode, this._sent, interval, this._cnt);
                return interval.value;
            }
        });
        
        var OutgoingAsync = Ice.Class(ProxyOutgoingAsyncBase, {
            __init__: function(prx, operation, completed)
            {
                //
                // OutgoingAsync can be constructed by a sub-type's prototype, in which case the
                // arguments are undefined.
                //
                if(prx !== undefined)
                {
                    ProxyOutgoingAsyncBase.call(this, prx, operation);
                    this._encoding = Protocol.getCompatibleEncoding(this._proxy.__reference().getEncoding());
                    this._completed = completed;
                }
                else
                {
                    ProxyOutgoingAsyncBase.call(this);
                }
            },
            __prepare: function(op, mode, ctx)
            {
                Protocol.checkSupportedProtocol(Protocol.getCompatibleProtocol(this._proxy.__reference().getProtocol()));
        
                this._mode = mode;
                if(ctx === null)
                {
                    ctx = OutgoingAsync._emptyContext;
                }
        
                if(this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram())
                {
                    this._proxy.__getBatchRequestQueue().prepareBatchRequest(this._os);
                }
                else
                {
                    this._os.writeBlob(Protocol.requestHdr);
                }
        
                var ref = this._proxy.__reference();
        
                ref.getIdentity().__write(this._os);
        
                //
                // For compatibility with the old FacetPath.
                //
                var facet = ref.getFacet();
                if(facet === null || facet.length === 0)
                {
                    Ice.StringSeqHelper.write(this._os, null);
                }
                else
                {
                    Ice.StringSeqHelper.write(this._os, [ facet ]);
                }
        
                this._os.writeString(this._operation);
        
                this._os.writeByte(mode.value);
        
                if(ctx !== undefined)
                {
                    if(ctx !== null && !(ctx instanceof HashMap))
                    {
                        throw new Error("illegal context value, expecting null or HashMap");
                    }
        
                    //
                    // Explicit context
                    //
                    Ice.ContextHelper.write(this._os, ctx);
                }
                else
                {
                    //
                    // Implicit context
                    //
                    var implicitContext = ref.getInstance().getImplicitContext();
                    var prxContext = ref.getContext();
        
                    if(implicitContext === null)
                    {
                        Ice.ContextHelper.write(this._os, prxContext);
                    }
                    else
                    {
                        implicitContext.write(prxContext, this._os);
                    }
                }
            },
            __sent: function()
            {
                this.__markSent(!this._proxy.ice_isTwoway());
            },
            __invokeRemote: function(connection, compress, response)
            {
                return connection.sendAsyncRequest(this, compress, response, 0);
            },
            __abort: function(ex)
            {
                if(this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram())
                {
                    this._proxy.__getBatchRequestQueue().abortBatchRequest(this._os);
                }
                ProxyOutgoingAsyncBase.prototype.__abort.call(this, ex);
            },
            __invoke: function()
            {
                if(this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram())
                {
                    this._sentSynchronously = true;
                    this._proxy.__getBatchRequestQueue().finishBatchRequest(this._os, this._proxy, this._operation);
                    this.__markFinished(true);
                    return;
                }
        
                //
                // NOTE: invokeImpl doesn't throw so this can be called from the
                // try block with the catch block calling abort() in case of an
                // exception.
                //
                this.__invokeImpl(true); // userThread = true
            },
            __completed: function(istr)
            {
                Debug.assert(this._proxy.ice_isTwoway()); // Can only be called for twoways.
        
                var replyStatus;
                try
                {
                    if(this._is === null) // _is can already be initialized if the invocation is retried
                    {
                        this._is = new BasicStream(this._instance, Protocol.currentProtocolEncoding);
                    }
                    this._is.swap(istr);
                    replyStatus = this._is.readByte();
        
                    switch(replyStatus)
                    {
                        case Protocol.replyOK:
                        case Protocol.replyUserException:
                        {
                            break;
                        }
        
                        case Protocol.replyObjectNotExist:
                        case Protocol.replyFacetNotExist:
                        case Protocol.replyOperationNotExist:
                        {
                            var id = new Identity();
                            id.__read(this._is);
        
                            //
                            // For compatibility with the old FacetPath.
                            //
                            var facetPath = Ice.StringSeqHelper.read(this._is);
                            var facet;
                            if(facetPath.length > 0)
                            {
                                if(facetPath.length > 1)
                                {
                                    throw new Ice.MarshalException();
                                }
                                facet = facetPath[0];
                            }
                            else
                            {
                                facet = "";
                            }
        
                            var operation = this._is.readString();
        
                            var rfe = null;
                            switch(replyStatus)
                            {
                            case Protocol.replyObjectNotExist:
                            {
                                rfe = new Ice.ObjectNotExistException();
                                break;
                            }
        
                            case Protocol.replyFacetNotExist:
                            {
                                rfe = new Ice.FacetNotExistException();
                                break;
                            }
        
                            case Protocol.replyOperationNotExist:
                            {
                                rfe = new Ice.OperationNotExistException();
                                break;
                            }
        
                            default:
                            {
                                Debug.assert(false);
                                break;
                            }
                            }
        
                            rfe.id = id;
                            rfe.facet = facet;
                            rfe.operation = operation;
                            throw rfe;
                        }
        
                        case Protocol.replyUnknownException:
                        case Protocol.replyUnknownLocalException:
                        case Protocol.replyUnknownUserException:
                        {
                            var unknown = this._is.readString();
        
                            var ue = null;
                            switch(replyStatus)
                            {
                            case Protocol.replyUnknownException:
                            {
                                ue = new Ice.UnknownException();
                                break;
                            }
        
                            case Protocol.replyUnknownLocalException:
                            {
                                ue = new Ice.UnknownLocalException();
                                break;
                            }
        
                            case Protocol.replyUnknownUserException:
                            {
                                ue = new Ice.UnknownUserException();
                                break;
                            }
        
                            default:
                            {
                                Debug.assert(false);
                                break;
                            }
                            }
        
                            ue.unknown = unknown;
                            throw ue;
                        }
        
                        default:
                        {
                            throw new Ice.UnknownReplyStatusException();
                        }
                    }
        
                    this.__markFinished(replyStatus == Protocol.replyOK, this._completed);
                }
                catch(ex)
                {
                    this.__completedEx(ex);
                }
            },
            __startWriteParams: function(format)
            {
                this._os.startWriteEncaps(this._encoding, format);
                return this._os;
            },
            __endWriteParams: function()
            {
                this._os.endWriteEncaps();
            },
            __writeEmptyParams: function()
            {
                this._os.writeEmptyEncaps(this._encoding);
            },
            __writeParamEncaps: function(encaps)
            {
                if(encaps === null || encaps.length === 0)
                {
                    this._os.writeEmptyEncaps(this._encoding);
                }
                else
                {
                    this._os.writeEncaps(encaps);
                }
            },
            __is: function()
            {
                return this._is;
            },
            __startReadParams: function()
            {
                this._is.startReadEncaps();
                return this._is;
            },
            __endReadParams: function()
            {
                this._is.endReadEncaps();
            },
            __readEmptyParams: function()
            {
                this._is.skipEmptyEncaps(null);
            },
            __readParamEncaps: function()
            {
                return this._is.readEncaps(null);
            },
            __throwUserException: function()
            {
                Debug.assert((this._state & AsyncResult.Done) !== 0);
                if((this._state & AsyncResult.OK) === 0)
                {
                    try
                    {
                        this._is.startReadEncaps();
                        this._is.throwException();
                    }
                    catch(ex)
                    {
                        if(ex instanceof Ice.UserException)
                        {
                            this._is.endReadEncaps();
                        }
                        throw ex;
                    }
                }
            },
        });
        OutgoingAsync._emptyContext = new HashMap();
        
        var ProxyFlushBatch = Ice.Class(ProxyOutgoingAsyncBase, {
            __init__ : function(prx, operation)
            {
                ProxyOutgoingAsyncBase.call(this, prx, operation);
                this._batchRequestNum = prx.__getBatchRequestQueue().swap(this._os);
            },
            __invokeRemote: function(connection, compress, response)
            {
                if(this._batchRequestNum === 0)
                {
                    this.__sent();
                    return AsyncStatus.Sent;
                }
                return connection.sendAsyncRequest(this, compress, response, this._batchRequestNum);
            },
            __invoke: function()
            {
                Protocol.checkSupportedProtocol(Protocol.getCompatibleProtocol(this._proxy.__reference().getProtocol()));
                this.__invokeImpl(true); // userThread = true
            },
        });
        
        var ProxyGetConnection = Ice.Class(ProxyOutgoingAsyncBase, {
            __init__ : function(prx, operation)
            {
                ProxyOutgoingAsyncBase.call(this, prx, operation);
            },
            __invokeRemote: function(connection, compress, response)
            {
                this.__markFinished(true,
                                    function(r)
                                    {
                                        r.succeed(connection);
                                    });
                return AsyncStatus.Sent;
            },
            __invoke: function()
            {
                this.__invokeImpl(true); // userThread = true
            }
        });
        
        var ConnectionFlushBatch = Ice.Class(OutgoingAsyncBase, {
            __init__: function(con, communicator, operation)
            {
                OutgoingAsyncBase.call(this, communicator, operation, con, null, null);
            },
            __invoke: function()
            {
                try
                {
                    var batchRequestNum = this._connection.getBatchRequestQueue().swap(this._os);
                    var status;
                    if(batchRequestNum === 0)
                    {
                        this.__sent();
                        status = AsyncStatus.Sent;
                    }
                    else
                    {
                        status = this._connection.sendAsyncRequest(this, false, false, batchRequestNum);
                    }
        
                    if((status & AsyncStatus.Sent) > 0)
                    {
                        this._sentSynchronously = true;
                    }
                }
                catch(ex)
                {
                    this.__completedEx(ex);
                }
            }
        });
        
        Ice.OutgoingAsync = OutgoingAsync;
        Ice.ProxyFlushBatch = ProxyFlushBatch;
        Ice.ProxyGetConnection = ProxyGetConnection;
        Ice.ConnectionFlushBatch = ConnectionFlushBatch;
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var ArrayUtil = Ice.ArrayUtil;
        var AsyncResultBase = Ice.AsyncResultBase;
        var AsyncResult = Ice.AsyncResult;
        var Debug = Ice.Debug;
        var FormatType = Ice.FormatType;
        var HashMap = Ice.HashMap;
        var OutgoingAsync = Ice.OutgoingAsync;
        var ProxyFlushBatch = Ice.ProxyFlushBatch;
        var ProxyGetConnection = Ice.ProxyGetConnection;
        var RefMode = Ice.ReferenceMode;
        var OperationMode = Ice.OperationMode;
        
        //
        // Ice.ObjectPrx
        //
        var ObjectPrx = Ice.Class({
            __init__: function()
            {
                this._reference = null;
                this._requestHandler = null;
            },
            hashCode: function(r)
            {
                return this._reference.hashCode();
            },
            ice_getCommunicator: function()
            {
                return this._reference.getCommunicator();
            },
            toString: function()
            {
                return this._reference.toString();
            },
            ice_getIdentity: function()
            {
                return this._reference.getIdentity().clone();
            },
            ice_identity: function(newIdentity)
            {
                if(newIdentity === undefined || newIdentity === null || newIdentity.name.length === 0)
                {
                    throw new Ice.IllegalIdentityException();
                }
                if(newIdentity.equals(this._reference.getIdentity()))
                {
                    return this;
                }
                else
                {
                    var proxy = new ObjectPrx();
                    proxy.__setup(this._reference.changeIdentity(newIdentity));
                    return proxy;
                }
            },
            ice_getContext: function()
            {
                return new HashMap(this._reference.getContext());
            },
            ice_context: function(newContext)
            {
                return this.__newInstance(this._reference.changeContext(newContext));
            },
            ice_getFacet: function()
            {
                return this._reference.getFacet();
            },
            ice_facet: function(newFacet)
            {
                if(newFacet === undefined || newFacet === null)
                {
                    newFacet = "";
                }
        
                if(newFacet === this._reference.getFacet())
                {
                    return this;
                }
                else
                {
                    var proxy = new ObjectPrx();
                    proxy.__setup(this._reference.changeFacet(newFacet));
                    return proxy;
                }
            },
            ice_getAdapterId: function()
            {
                return this._reference.getAdapterId();
            },
            ice_adapterId: function(newAdapterId)
            {
                if(newAdapterId === undefined || newAdapterId === null)
                {
                    newAdapterId = "";
                }
        
                if(newAdapterId === this._reference.getAdapterId())
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeAdapterId(newAdapterId));
                }
            },
            ice_getEndpoints: function()
            {
                return ArrayUtil.clone(this._reference.getEndpoints());
            },
            ice_endpoints: function(newEndpoints)
            {
                if(newEndpoints === undefined || newEndpoints === null)
                {
                    newEndpoints = [];
                }
        
                if(ArrayUtil.equals(newEndpoints, this._reference.getEndpoints()))
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeEndpoints(newEndpoints));
                }
            },
            ice_getLocatorCacheTimeout: function()
            {
                return this._reference.getLocatorCacheTimeout();
            },
            ice_locatorCacheTimeout: function(newTimeout)
            {
                if(newTimeout < -1)
                {
                    throw new Error("invalid value passed to ice_locatorCacheTimeout: " + newTimeout);
                }
                if(newTimeout === this._reference.getLocatorCacheTimeout())
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeLocatorCacheTimeout(newTimeout));
                }
            },
            ice_getInvocationTimeout: function()
            {
                return this._reference.getInvocationTimeout();
            },
            ice_invocationTimeout: function(newTimeout)
            {
                if(newTimeout < 1 && newTimeout !== -1)
                {
                    throw new Error("invalid value passed to ice_invocationTimeout: " + newTimeout);
                }
                if(newTimeout === this._reference.getInvocationTimeout())
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeInvocationTimeout(newTimeout));
                }
            },
            ice_isConnectionCached: function()
            {
                return this._reference.getCacheConnection();
            },
            ice_connectionCached: function(newCache)
            {
                if(newCache === this._reference.getCacheConnection())
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeCacheConnection(newCache));
                }
            },
            ice_getEndpointSelection: function()
            {
                return this._reference.getEndpointSelection();
            },
            ice_endpointSelection: function(newType)
            {
                if(newType === this._reference.getEndpointSelection())
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeEndpointSelection(newType));
                }
            },
            ice_isSecure: function()
            {
                return this._reference.getSecure();
            },
            ice_secure: function(b)
            {
                if(b === this._reference.getSecure())
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeSecure(b));
                }
            },
            ice_getEncodingVersion: function()
            {
                return this._reference.getEncoding().clone();
            },
            ice_encodingVersion: function(e)
            {
                if(e.equals(this._reference.getEncoding()))
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeEncoding(e));
                }
            },
            ice_isPreferSecure: function()
            {
                return this._reference.getPreferSecure();
            },
            ice_preferSecure: function(b)
            {
                if(b === this._reference.getPreferSecure())
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changePreferSecure(b));
                }
            },
            ice_getRouter: function()
            {
                var ri = this._reference.getRouterInfo();
                return ri !== null ? ri.getRouter() : null;
            },
            ice_router: function(router)
            {
                var ref = this._reference.changeRouter(router);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(ref);
                }
            },
            ice_getLocator: function()
            {
                var ri = this._reference.getLocatorInfo();
                return ri !== null ? ri.getLocator() : null;
            },
            ice_locator: function(locator)
            {
                var ref = this._reference.changeLocator(locator);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(ref);
                }
            },
            ice_isTwoway: function()
            {
                return this._reference.getMode() === RefMode.ModeTwoway;
            },
            ice_twoway: function()
            {
                if(this._reference.getMode() === RefMode.ModeTwoway)
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeMode(RefMode.ModeTwoway));
                }
            },
            ice_isOneway: function()
            {
                return this._reference.getMode() === RefMode.ModeOneway;
            },
            ice_oneway: function()
            {
                if(this._reference.getMode() === RefMode.ModeOneway)
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeMode(RefMode.ModeOneway));
                }
            },
            ice_isBatchOneway: function()
            {
                return this._reference.getMode() === RefMode.ModeBatchOneway;
            },
            ice_batchOneway: function()
            {
                if(this._reference.getMode() === RefMode.ModeBatchOneway)
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeMode(RefMode.ModeBatchOneway));
                }
            },
            ice_isDatagram: function()
            {
                return this._reference.getMode() === RefMode.ModeDatagram;
            },
            ice_datagram: function()
            {
                if(this._reference.getMode() === RefMode.ModeDatagram)
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeMode(RefMode.ModeDatagram));
                }
            },
            ice_isBatchDatagram: function()
            {
                return this._reference.getMode() === RefMode.ModeBatchDatagram;
            },
            ice_batchDatagram: function()
            {
                if(this._reference.getMode() === RefMode.ModeBatchDatagram)
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(this._reference.changeMode(RefMode.ModeBatchDatagram));
                }
            },
            ice_compress: function(co)
            {
                var ref = this._reference.changeCompress(co);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(ref);
                }
            },
            ice_timeout: function(t)
            {
                if(t < 1 && t !== -1)
                {
                    throw new Error("invalid value passed to ice_timeout: " + t);
                }
                var ref = this._reference.changeTimeout(t);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(ref);
                }
            },
            ice_getConnectionId: function()
            {
                return this._reference.getConnectionId();
            },
            ice_connectionId: function(id)
            {
                var ref = this._reference.changeConnectionId(id);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this.__newInstance(ref);
                }
            },
            ice_getConnection: function()
            {
                var r = new ProxyGetConnection(this, "ice_getConnection");
                try
                {
                    r.__invoke();
                }
                catch(ex)
                {
                    r.__abort(ex);
                }
                return r;
            },
            ice_getCachedConnection: function()
            {
                return this._requestHandler ? this._requestHandler.getConnection() : null;
            },
            ice_flushBatchRequests: function()
            {
                var r = new ProxyFlushBatch(this, "ice_flushBatchRequests");
                try
                {
                    r.__invoke();
                }
                catch(ex)
                {
                    r.__abort(ex);
                }
                return r;
            },
            equals: function(r)
            {
                if(this === r)
                {
                    return true;
                }
        
                if(r instanceof ObjectPrx)
                {
                    return this._reference.equals(r._reference);
                }
        
                return false;
            },
            __reference: function()
            {
                return this._reference;
            },
            __copyFrom: function(from)
            {
                Debug.assert(this._reference === null);
                Debug.assert(this._requestHandler === null);
        
                this._reference = from._reference;
                this._requestHandler = from._requestHandler;
            },
            __handleException: function(ex, handler, mode, sent, sleep, cnt)
            {
                this.__updateRequestHandler(handler, null); // Clear the request handler
        
                //
                // We only retry local exception, system exceptions aren't retried.
                //
                // A CloseConnectionException indicates graceful server shutdown, and is therefore
                // always repeatable without violating "at-most-once". That's because by sending a
                // close connection message, the server guarantees that all outstanding requests
                // can safely be repeated.
                //
                // An ObjectNotExistException can always be retried as well without violating
                // "at-most-once" (see the implementation of the checkRetryAfterException method
                //  of the ProxyFactory class for the reasons why it can be useful).
                //
                // If the request didn't get sent or if it's non-mutating or idempotent it can
                // also always be retried if the retry count isn't reached.
                //
                if(ex instanceof Ice.LocalException &&
                   (!sent ||
                    mode == OperationMode.Nonmutating || mode == OperationMode.Idempotent ||
                    ex instanceof Ice.CloseConnectionException || ex instanceof Ice.ObjectNotExistException))
                {
                    try
                    {
                        return this._reference.getInstance().proxyFactory().checkRetryAfterException(ex,
                                                                                                     this._reference,
                                                                                                     sleep,
                                                                                                     cnt);
                    }
                    catch(exc)
                    {
                        if(exc instanceof Ice.CommunicatorDestroyedException)
                        {
                            //
                            // The communicator is already destroyed, so we cannot retry.
                            //
                            throw ex;
                        }
                        else
                        {
                            throw exc;
                        }
                    }
                }
                else
                {
                    throw ex;
                }
            },
            __checkAsyncTwowayOnly: function(name)
            {
                if(!this.ice_isTwoway())
                {
                    throw new Error("`" + name + "' can only be called with a twoway proxy");
                }
            },
            __getRequestHandler: function()
            {
                if(this._reference.getCacheConnection())
                {
                    if(this._requestHandler)
                    {
                        return this._requestHandler;
                    }
                }
                return this._reference.getRequestHandler(this);
            },
            __getBatchRequestQueue: function()
            {
                if(!this._batchRequestQueue)
                {
                    this._batchRequestQueue = this._reference.getBatchRequestQueue();
                }
                return this._batchRequestQueue;
            },
            __setRequestHandler: function(handler)
            {
                if(this._reference.getCacheConnection())
                {
                    if(!this._requestHandler)
                    {
                        this._requestHandler = handler;
                    }
                    return this._requestHandler;
                }
                return handler;
            },
            __updateRequestHandler: function(previous, handler)
            {
                if(this._reference.getCacheConnection() && previous !== null)
                {
                    if(this._requestHandler && this._requestHandler !== handler)
                    {
                        this._requestHandler = this._requestHandler.update(previous, handler);
                    }
                }
            },
            //
            // Only for use by IceInternal.ProxyFactory
            //
            __setup: function(ref)
            {
                Debug.assert(this._reference === null);
        
                this._reference = ref;
            },
            __newInstance: function(ref)
            {
                var proxy = new this.constructor();
                proxy.__setup(ref);
                return proxy;
            },
            ice_instanceof: function(T)
            {
                if(T)
                {
                    if(this instanceof T)
                    {
                        return true;
                    }
                    return this.constructor.__instanceof(T);
                }
                return false;
            }
        });
        
        //
        // Generic invocation for operations that have input parameters.
        //
        ObjectPrx.__invoke = function(p, name, mode, fmt, ctx, marshalFn, unmarshalFn, userEx, args)
        {
            if(unmarshalFn !== null || userEx.length > 0)
            {
                p.__checkAsyncTwowayOnly(name);
            }
        
            var __r = new OutgoingAsync(p, name,
                function(__res)
                {
                    ObjectPrx.__completed(__res, unmarshalFn, userEx);
                });
        
            try
            {
                __r.__prepare(name, mode, ctx);
                if(marshalFn === null)
                {
                    __r.__writeEmptyParams();
                }
                else
                {
                    var __os = __r.__startWriteParams(fmt);
                    marshalFn.call(null, __os, args);
                    __r.__endWriteParams();
                }
                __r.__invoke();
            }
            catch(ex)
            {
                __r.__abort(ex);
            }
            return __r;
        };
        
        //
        // Handles the completion of an invocation.
        //
        ObjectPrx.__completed = function(__r, unmarshalFn, userEx)
        {
            if(!ObjectPrx.__check(__r, userEx))
            {
                return;
            }
        
            try
            {
                if(unmarshalFn === null)
                {
                    __r.__readEmptyParams();
                    __r.succeed(__r);
                }
                else
                {
                    var results = unmarshalFn(__r);
                    __r.succeed.apply(__r, results);
                }
            }
            catch(ex)
            {
                ObjectPrx.__dispatchLocalException(__r, ex);
                return;
            }
        };
        
        //
        // Unmarshal callback for operations that return a bool as the only result.
        //
        ObjectPrx.__returns_bool = function(__is, __results)
        {
            __results.push(__is.readBool());
        };
        
        //
        // Unmarshal callback for operations that return a byte as the only result.
        //
        ObjectPrx.__returns_byte = function(__is, __results)
        {
            __results.push(__is.readByte());
        };
        
        //
        // Unmarshal callback for operations that return a short as the only result.
        //
        ObjectPrx.__returns_short = function(__is, __results)
        {
            __results.push(__is.readShort());
        };
        
        //
        // Unmarshal callback for operations that return an int as the only result.
        //
        ObjectPrx.__returns_int = function(__is, __results)
        {
            __results.push(__is.readInt());
        };
        
        //
        // Unmarshal callback for operations that return a long as the only result.
        //
        ObjectPrx.__returns_long = function(__is, __results)
        {
            __results.push(__is.readLong());
        };
        
        //
        // Unmarshal callback for operations that return a float as the only result.
        //
        ObjectPrx.__returns_float = function(__is, __results)
        {
            __results.push(__is.readFloat());
        };
        
        //
        // Unmarshal callback for operations that return a double as the only result.
        //
        ObjectPrx.__returns_double = function(__is, __results)
        {
            __results.push(__is.readDouble());
        };
        
        //
        // Unmarshal callback for operations that return a string as the only result.
        //
        ObjectPrx.__returns_string = function(__is, __results)
        {
            __results.push(__is.readString());
        };
        
        //
        // Unmarshal callback for operations that return a proxy as the only result.
        //
        ObjectPrx.__returns_ObjectPrx = function(__is, __results)
        {
            __results.push(__is.readProxy());
        };
        
        //
        // Unmarshal callback for operations that return an object as the only result.
        //
        ObjectPrx.__returns_Object = function(__is, __results)
        {
            __is.readObject(function(obj){ __results.push(obj); }, Ice.Object);
            __is.readPendingObjects();
        };
        
        //
        // Handles user exceptions.
        //
        ObjectPrx.__check = function(__r, __uex)
        {
            //
            // If __uex is non-null, it must be an array of exception types.
            //
            try
            {
                __r.__throwUserException();
            }
            catch(ex)
            {
                if(ex instanceof Ice.UserException)
                {
                    if(__uex !== null)
                    {
                        for(var i = 0; i < __uex.length; ++i)
                        {
                            if(ex instanceof __uex[i])
                            {
                                __r.fail(ex, __r);
                                return false;
                            }
                        }
                    }
                    __r.fail(new Ice.UnknownUserException(ex.ice_name()), __r);
                    return false;
                }
                else
                {
                    __r.fail(ex, __r);
                    return false;
                }
            }
        
            return true;
        };
        
        ObjectPrx.__dispatchLocalException = function(__r, __ex)
        {
            __r.fail(__ex, __r);
        };
        
        ObjectPrx.ice_staticId = Ice.Object.ice_staticId;
        
        ObjectPrx.checkedCast = function(prx, facet, ctx)
        {
            var __r = null;
        
            if(prx === undefined || prx === null)
            {
                __r = new AsyncResultBase(null, "checkedCast", null, null, null);
                __r.succeed(null, __r);
            }
            else
            {
                if(facet !== undefined)
                {
                    prx = prx.ice_facet(facet);
                }
        
                var self = this;
                __r = new AsyncResultBase(prx.ice_getCommunicator(), "checkedCast", null, prx, null);
                prx.ice_isA(this.ice_staticId(), ctx).then(
                    function(__res, __ret)
                    {
                        if(__ret)
                        {
                            var __h = new self();
                            __h.__copyFrom(prx);
                            __r.succeed(__h, __r);
                        }
                        else
                        {
                            __r.succeed(null, __r);
                        }
                    }).exception(
                        function(__ex)
                        {
                            if(__ex instanceof Ice.FacetNotExistException)
                            {
                                __r.succeed(null, __r);
                            }
                            else
                            {
                                __r.fail(__ex, __r);
                            }
                        });
            }
        
            return __r;
        };
        
        ObjectPrx.uncheckedCast = function(prx, facet)
        {
            var r = null;
            if(prx !== undefined && prx !== null)
            {
                r = new this();
                if(facet !== undefined)
                {
                    prx = prx.ice_facet(facet);
                }
                r.__copyFrom(prx);
            }
            return r;
        };
        
        Object.defineProperty(ObjectPrx, "minWireSize", {
            get: function(){ return 2; }
        });
        
        ObjectPrx.write = function(os, v)
        {
            os.writeProxy(v);
        };
        
        ObjectPrx.read = function(is)
        {
            return is.readProxy(this);
        };
        
        ObjectPrx.writeOpt = function(os, tag, v)
        {
            os.writeOptProxy(tag, v);
        };
        
        ObjectPrx.readOpt = function(is, tag)
        {
            return is.readOptProxy(tag, this);
        };
        
        ObjectPrx.__instanceof = function(T)
        {
            if(T === this)
            {
                return true;
            }
        
            for(var i in this.__implements)
            {
                if(this.__implements[i].__instanceof(T))
                {
                    return true;
                }
            }
        
            if(this.__parent)
            {
                return this.__parent.__instanceof(T);
            }
            return false;
        };
        
        var Slice = Ice.Slice;
        Slice.defineProxy = function(base, staticId, prxInterfaces)
        {
            var prx = function()
            {
                base.call(this);
            };
            prx.__parent = base;
            prx.__implements = prxInterfaces;
        
            // All generated proxies inherit from ObjectPrx
            prx.prototype = new base();
            prx.prototype.constructor = prx;
        
            // Static methods
            prx.ice_staticId = staticId;
        
            // Copy static methods inherited from ObjectPrx
            prx.checkedCast = ObjectPrx.checkedCast;
            prx.uncheckedCast = ObjectPrx.uncheckedCast;
            prx.write = ObjectPrx.write;
            prx.writeOpt = ObjectPrx.writeOpt;
            prx.read = ObjectPrx.read;
            prx.readOpt = ObjectPrx.readOpt;
        
            prx.__instanceof = ObjectPrx.__instanceof;
        
            // Static properties
            Object.defineProperty(prx, "minWireSize", {
                get: function(){ return 2; }
            });
        
            return prx;
        };
        
        Ice.ObjectPrx = ObjectPrx;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Endpoint.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            Object.defineProperty(Ice, 'TCPEndpointType', {
                value: 1
            });
        
            Object.defineProperty(Ice, 'SSLEndpointType', {
                value: 2
            });
        
            Object.defineProperty(Ice, 'UDPEndpointType', {
                value: 3
            });
        
            Object.defineProperty(Ice, 'WSEndpointType', {
                value: 4
            });
        
            Object.defineProperty(Ice, 'WSSEndpointType', {
                value: 5
            });
        
            /**
             * Base class providing access to the endpoint details.
             * 
             **/
            Ice.EndpointInfo = Slice.defineLocalObject(
                function(timeout, compress)
                {
                    this.timeout = timeout !== undefined ? timeout : 0;
                    this.compress = compress !== undefined ? compress : false;
                });
        
            /**
             * The user-level interface to an endpoint.
             * 
             **/
            Ice.Endpoint = Slice.defineLocalObject();
        
            /**
             * Provides access to the address details of a IP endpoint.
             * 
             * @see Endpoint
             * 
             **/
            Ice.IPEndpointInfo = Slice.defineLocalObject(
                function(timeout, compress, host, port, sourceAddress)
                {
                    Ice.EndpointInfo.call(this, timeout, compress);
                    this.host = host !== undefined ? host : "";
                    this.port = port !== undefined ? port : 0;
                    this.sourceAddress = sourceAddress !== undefined ? sourceAddress : "";
                },
                Ice.EndpointInfo);
        
            /**
             * Provides access to a TCP endpoint information.
             * 
             * @see Endpoint
             * 
             **/
            Ice.TCPEndpointInfo = Slice.defineLocalObject(
                function(timeout, compress, host, port, sourceAddress)
                {
                    Ice.IPEndpointInfo.call(this, timeout, compress, host, port, sourceAddress);
                },
                Ice.IPEndpointInfo);
        
            /**
             * Provides access to an UDP endpoint information.
             * 
             * @see Endpoint
             * 
             **/
            Ice.UDPEndpointInfo = Slice.defineLocalObject(
                function(timeout, compress, host, port, sourceAddress, mcastInterface, mcastTtl)
                {
                    Ice.IPEndpointInfo.call(this, timeout, compress, host, port, sourceAddress);
                    this.mcastInterface = mcastInterface !== undefined ? mcastInterface : "";
                    this.mcastTtl = mcastTtl !== undefined ? mcastTtl : 0;
                },
                Ice.IPEndpointInfo);
        
            /**
             * Provides access to a WebSocket endpoint information.
             * 
             **/
            Ice.WSEndpointInfo = Slice.defineLocalObject(
                function(timeout, compress, host, port, sourceAddress, resource)
                {
                    Ice.TCPEndpointInfo.call(this, timeout, compress, host, port, sourceAddress);
                    this.resource = resource !== undefined ? resource : "";
                },
                Ice.TCPEndpointInfo);
        
            /**
             * Provides access to the details of an opaque endpoint.
             * 
             * @see Endpoint
             * 
             **/
            Ice.OpaqueEndpointInfo = Slice.defineLocalObject(
                function(timeout, compress, rawEncoding, rawBytes)
                {
                    Ice.EndpointInfo.call(this, timeout, compress);
                    this.rawEncoding = rawEncoding !== undefined ? rawEncoding : new Ice.EncodingVersion();
                    this.rawBytes = rawBytes !== undefined ? rawBytes : null;
                },
                Ice.EndpointInfo);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Class = Ice.Class;
        
        var EndpointI = Class(Ice.Endpoint, {
            toString: function()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                return this.protocol() + this.options();
            },
            initWithOptions: function(args)
            {
                var unknown = [];
        
                var i;
                var str = "`" + this.protocol();
                for(i = 0; i < args.length; ++i)
                {
                    if(args[i].search(/[ \t\n\r]+/) !== -1)
                    {
                        str += " \"" + args[i] + "\"";
                    }
                    else
                    {
                        str += " " + args[i];
                    }
                }
                str += "'";
        
                i = 0;
                while(i < args.length)
                {
                    var option = args[i++];
                    if(option.length < 2 || option.charAt(0) != '-')
                    {
                        unknown.push(option);
                        continue;
                    }
        
                    var argument = null;
                    if(i < args.length && args[i].charAt(0) != '-')
                    {
                        argument = args[i++];
                    }
        
                    if(!this.checkOption(option, argument, str))
                    {
                        unknown.push(option);
                        if(argument !== null)
                        {
                            unknown.push(argument);
                        }
                    }
                }
        
                args.length = 0;
                for(i = 0; i < unknown.length; i++)
                {
                    args.push(unknown[i]);
                }
            },
            //
            // Compare endpoints for sorting purposes
            //
            equals: function(p)
            {
                if(!(p instanceof EndpointI))
                {
                    return false;
                }
                return this.compareTo(p) === 0;
            },
            checkOption: function()
            {
                return false;
            }
        });
        
        Ice.EndpointI = EndpointI;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `ProcessF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var __M = Ice.__M;
        
        var Class = Ice.Class;
        
        var builtinHelpers =
        [
            Ice.ByteHelper,
            Ice.BoolHelper,
            Ice.ShortHelper,
            Ice.IntHelper,
            Ice.LongHelper,
            Ice.FloatHelper,
            Ice.DoubleHelper,
            Ice.StringHelper,
            Ice.Object,
            Ice.ObjectPrx
        ];
        
        function parseParam(p)
        {
            var type = p[0];
            var t = typeof(type);
            if(t === 'number')
            {
                type = builtinHelpers[p[0]];
            }
            else if(t === 'string')
            {
                /*jshint -W061 */
                type = __M.type(type);
                /*jshint +W061 */
            }
        
            return {
                "type": type,
                "isObject": (p[1] === true),
                "tag": p[2] // Optional tag, which may not be present - an undefined tag means "not optional".
            };
        }
        
        //
        // Each operation descriptor is a property. The key is the "on-the-wire"
        // name, and the value is an array consisting of the following elements:
        //
        //  0: native method name in case of a keyword conflict (e.g., "_while"),
        //     otherwise an empty string
        //  1: mode (undefined == Normal or int)
        //  2: sendMode (undefined == Normal or int)
        //  3: amd (undefined or 1)
        //  4: format (undefined == Default or int)
        //  5: return type (undefined if void, or [type, tag])
        //  6: in params (undefined if none, or array of [type, tag])
        //  7: out params (undefined if none, or array of [type, tag])
        //  8: exceptions (undefined if none, or array of types)
        //  9: sends classes (true or undefined)
        // 10: returns classes (true or undefined)
        //
        function parseOperation(name, arr)
        {
            var r = {};
            var i;
            var p;
        
            r.name = name;
            r.mode = arr[1] ? Ice.OperationMode.valueOf(arr[1]) : Ice.OperationMode.Normal;
            r.sendMode = arr[2] ? Ice.OperationMode.valueOf(arr[2]) : Ice.OperationMode.Normal;
            r.amd = arr[3] ? true : false;
            r.format = arr[4] ? Ice.FormatType.valueOf(arr[4]) : Ice.FormatType.DefaultFormat;
        
            if(r.amd)
            {
                r.servantMethod = name + "_async";
            }
            else
            {
                r.servantMethod = arr[0] ? arr[0] : name;
            }
        
            var ret;
            if(arr[5])
            {
                ret = parseParam(arr[5]);
                ret.pos = 0;
            }
            r.returns = ret;
        
            var inParams = [];
            var inParamsOpt = [];
            if(arr[6])
            {
                for(i = 0; i < arr[6].length; ++i)
                {
                    p = parseParam(arr[6][i]);
                    p.pos = i;
                    inParams.push(p);
                    if(p.tag)
                    {
                        inParamsOpt.push(p);
                    }
                }
            }
            inParamsOpt.sort(function(p1, p2) { return p1.tag - p2.tag; }); // Sort by tag.
            r.inParams = inParams;
            r.inParamsOpt = inParamsOpt;
        
            var outParams = [];
            var outParamsOpt = [];
            if(arr[7])
            {
                var offs = ret ? 1 : 0;
                for(i = 0; i < arr[7].length; ++i)
                {
                    p = parseParam(arr[7][i]);
                    p.pos = i + offs;
                    outParams.push(p);
                    if(p.tag)
                    {
                        outParamsOpt.push(p);
                    }
                }
            }
            if(ret && ret.tag)
            {
                outParamsOpt.push(ret);
            }
            outParamsOpt.sort(function(p1, p2) { return p1.tag - p2.tag; }); // Sort by tag.
            r.outParams = outParams;
            r.outParamsOpt = outParamsOpt;
        
            var exceptions = [];
            if(arr[8])
            {
                for(i = 0; i < arr[8].length; ++i)
                {
                    exceptions.push(arr[8][i]);
                }
            }
            r.exceptions = exceptions;
        
            r.sendsClasses = arr[9] === true;
            r.returnsClasses = arr[10] === true;
        
            return r;
        }
        
        var OpTable = Class({
            __init__: function(ops)
            {
                this.raw = ops;
                this.parsed = {};
            },
            find: function(name)
            {
                //
                // Check if we've already parsed the operation.
                //
                var op = this.parsed[name];
                if(op === undefined && this.raw[name] !== undefined)
                {
                    //
                    // We haven't parsed it yet, but we found a match for the name, so parse it now.
                    //
                    op = parseOperation(name, this.raw[name]);
                    this.parsed[name] = op;
                }
                return op;
            }
        });
        
        function unmarshalParams(is, retvalInfo, allParamInfo, optParamInfo, usesClasses, params, offset)
        {
            var i, p, v;
            //
            // First read all required params.
            //
            for(i = 0; i < allParamInfo.length; ++i)
            {
                p = allParamInfo[i];
                if(!p.tag)
                {
                    v = p.type.read(is);
                    params[p.pos + offset] = v;
                }
            }
        
            //
            // Then read a required return value (if any).
            //
            if(retvalInfo)
            {
                v = retvalInfo.type.read(is);
                params[retvalInfo.pos + offset] = v;
            }
        
            //
            // Then read all optional params.
            //
            for(i = 0; i < optParamInfo.length; ++i)
            {
                p = optParamInfo[i];
                v = p.type.readOpt(is, p.tag);
                params[p.pos + offset] = v;
            }
        
            if(usesClasses)
            {
                is.readPendingObjects();
            }
        }
        
        function marshalParams(os, params, retvalInfo, paramInfo, optParamInfo, usesClasses)
        {
            var i, p;
        
            //
            // Write the required params.
            //
            for(i = 0; i < paramInfo.length; ++i)
            {
                p = paramInfo[i];
                if(!p.tag)
                {
                    p.type.write(os, params[p.pos]);
                }
            }
        
            //
            // retvalInfo should only be provided if there is a non-void required return value.
            //
            if(retvalInfo)
            {
                retvalInfo.type.write(os, params[retvalInfo.pos]);
            }
        
            //
            // Write the optional params.
            //
            for(i = 0; i < optParamInfo.length; ++i)
            {
                p = optParamInfo[i];
                p.type.writeOpt(os, p.tag, params[p.pos]);
            }
        
            if(usesClasses)
            {
                os.writePendingObjects();
            }
        }
        
        var Upcall = Class({
            __init__: function(incomingAsync, op)
            {
                this.incomingAsync = incomingAsync;
                this.op = op;
            },
            ice_response: function()
            {
                var args = arguments;
        
                if(this.incomingAsync.__validateResponse(true))
                {
                    try
                    {
                        this.__sendResponse(args);
                        this.incomingAsync.__response();
                    }
                    catch(ex)
                    {
                        this.incomingAsync.__exception(ex);
                    }
                }
            },
            ice_exception: function(ex)
            {
                if(this.__checkException(ex))
                {
                    if(this.incomingAsync.__validateResponse(false))
                    {
                        this.__sendException(ex);
                        this.incomingAsync.__response();
                    }
                }
                else
                {
                    this.incomingAsync.ice_exception(ex);
                }
            },
            __sendResponse: function(results)
            {
                if(this.op.returns === undefined && this.op.outParams.length === 0)
                {
                    if(results && results.length > 0)
                    {
                        //
                        // No results expected.
                        //
                        throw new Error("ice_response called with invalid arguments");
                    }
                    else
                    {
                        this.incomingAsync.__writeEmptyParams();
                    }
                }
                else
                {
                    var __os = this.incomingAsync.__startWriteParams(this.op.format);
                    var retvalInfo;
                    if(this.op.returns && !this.op.returns.tag)
                    {
                        retvalInfo = this.op.returns;
                    }
                    marshalParams(__os, results, retvalInfo, this.op.outParams, this.op.outParamsOpt,
                                    this.op.returnsClasses);
                    this.incomingAsync.__endWriteParams(true);
                }
            },
            __checkException: function(ex)
            {
                //
                // Make sure the given exception is an instance of one of the declared user exceptions
                // for this operation.
                //
                for(var i = 0; i < this.op.exceptions.length; ++i)
                {
                    if(ex instanceof this.op.exceptions[i])
                    {
                        //
                        // User exception is valid.
                        //
                        return true;
                    }
                }
        
                return false;
            },
            __sendException: function(ex)
            {
                //
                // User exception is valid, now marshal it.
                //
                this.incomingAsync.__writeUserException(ex, this.op.format);
            }
        });
        
        var __dispatchImpl = function(servant, op, incomingAsync, current)
        {
            //
            // Check to make sure the servant implements the operation.
            //
            var method = servant[op.servantMethod];
            if(method === undefined || typeof(method) !== "function")
            {
                var comm = current.adapter.getCommunicator();
                var msg = "servant for identity " + comm.identityToString(current.id) +
                    " does not define operation `" + op.servantMethod + "'";
                throw new Ice.UnknownException(msg);
            }
        
            var up = new Upcall(incomingAsync, op);
        
            try
            {
                //
                // Unmarshal the in params (if any).
                //
                var params = op.amd ? [null] : [];
                if(op.inParams.length === 0)
                {
                    incomingAsync.readEmptyParams();
                }
                else
                {
                    var __is = incomingAsync.startReadParams();
                    var offset = op.amd ? 1 : 0;
                    unmarshalParams(__is, undefined, op.inParams, op.inParamsOpt, op.sendsClasses, params, offset);
                    incomingAsync.endReadParams();
        
                    //
                    // When unmarshaling objects, the ObjectHelper returns a wrapper object
                    // and eventually stores the unmarshaled object into its "value" member.
                    // Here we scan the parameter array and replace the wrappers with the
                    // actual object references.
                    //
                    if(op.inParams.length > 0 && (op.sendsClasses || op.inParamsOpt.length > 0))
                    {
                        for(var i = 0; i < op.inParams.length; ++i)
                        {
                            var p = op.inParams[i];
                            //
                            // Optional parameters may be undefined.
                            //
                            if(p.isObject && params[p.pos + offset] !== undefined)
                            {
                                params[p.pos + offset] = params[p.pos + offset].value;
                            }
                        }
                    }
                }
        
                params.push(current);
        
                if(op.amd)
                {
                    params[0] = up; // The AMD callback object.
                    try
                    {
                        method.apply(servant, params);
                    }
                    catch(ex)
                    {
                        up.ice_exception(ex);
                    }
                    return Ice.DispatchStatus.DispatchAsync;
                }
                else
                {
                    //
                    // Determine how many out parameters to expect.
                    //
                    var numExpectedResults = op.outParams.length;
                    if(op.returns)
                    {
                        ++numExpectedResults;
                    }
        
                    var results = method.apply(servant, params);
        
                    //
                    // Complain if we expect more than out parameter and the servant doesn't return an array.
                    //
                    if(numExpectedResults > 1 && !(results instanceof Array))
                    {
                        throw new Ice.MarshalException("operation `" + op.servantMethod +
                                                       "' should return an array of length " + numExpectedResults);
                    }
                    else if(numExpectedResults === 1)
                    {
                        //
                        // Wrap a single out parameter in an array.
                        //
                        results = [results];
                    }
        
                    up.__sendResponse(results);
                    return Ice.DispatchStatus.DispatchOK;
                }
            }
            catch(ex)
            {
                if(up.__checkException(ex))
                {
                    up.__sendException(ex);
                    return Ice.DispatchStatus.DispatchUserException;
                }
                else
                {
                    throw ex;
                }
            }
        };
        
        function getServantMethodFromInterfaces(interfaces, methodName, all)
        {
            var method;
            for(var i = 0; method === undefined && i < interfaces.length; ++i)
            {
                var intf = interfaces[i];
                method = intf[methodName];
                if(method === undefined)
                {
                    if(all.indexOf(intf) === -1)
                    {
                        all.push(intf);
                    }
                    if(intf.__implements)
                    {
                        method = getServantMethodFromInterfaces(intf.__implements, methodName, all);
                    }
                }
            }
            return method;
        }
        
        var dispatchPrefix = "__op_";
        
        function getServantMethod(servantType, name)
        {
            //
            // The dispatch method is named __op_<Slice name> and is stored in the type (not the prototype).
            //
            var methodName = dispatchPrefix + name;
        
            //
            // First check the servant type.
            //
            var method = servantType[methodName];
        
            var allInterfaces;
        
            if(method === undefined)
            {
                allInterfaces = [];
        
                //
                // Now check the prototypes of the implemented interfaces.
                //
                var curr = servantType;
                while(curr && method === undefined)
                {
                    if(curr.__implements)
                    {
                        method = getServantMethodFromInterfaces(curr.__implements, methodName, allInterfaces);
                    }
                    curr = curr.__parent;
                }
        
                if(method !== undefined)
                {
                    //
                    // Add the method to the servant's type.
                    //
                    servantType[methodName] = method;
                }
            }
        
            if(method === undefined)
            {
                //
                // Next check the op table for the servant's type.
                //
                var op;
                if(servantType.__ops)
                {
                    op = servantType.__ops.find(name);
                }
        
                var source;
                if(op === undefined)
                {
                    //
                    // Now check the op tables of the base types.
                    //
                    var parent = servantType.__parent;
                    while(op === undefined && parent)
                    {
                        if(parent.__ops)
                        {
                            if((op = parent.__ops.find(name)) !== undefined)
                            {
                                source = parent;
                            }
                        }
                        parent = parent.__parent;
                    }
        
                    //
                    // Now check the op tables of all base interfaces.
                    //
                    for(var i = 0; op === undefined && i < allInterfaces.length; ++i)
                    {
                        var intf = allInterfaces[i];
                        if(intf.__ops)
                        {
                            if((op = intf.__ops.find(name)) !== undefined)
                            {
                                source = intf;
                            }
                        }
                    }
                }
        
                if(op !== undefined)
                {
                    method = function(servant, incomingAsync, current)
                    {
                        return __dispatchImpl(servant, op, incomingAsync, current);
                    };
        
                    //
                    // Add the method to the servant type.
                    //
                    servantType[methodName] = method;
        
                    //
                    // Also add the method to the type in which the operation was found.
                    //
                    if(source)
                    {
                        source[methodName] = method;
                    }
                }
            }
        
            return method;
        }
        
        function addProxyOperation(proxyType, name, data)
        {
            var method = data[0] ? data[0] : name;
        
            var op = null;
        
            proxyType.prototype[method] = function()
            {
                var args = arguments;
        
                //
                // Parse the operation data on the first invocation of a proxy method.
                //
                if(op === null)
                {
                    op = parseOperation(name, data);
                }
        
                var ctx = args[op.inParams.length]; // The request context is the last argument (if present).
        
                var marshalFn = null;
                if(op.inParams.length > 0)
                {
                    marshalFn = function(os, params)
                    {
                        var i, p, v;
        
                        //
                        // Validate the parameters.
                        //
                        for(i = 0; i < op.inParams.length; ++i)
                        {
                            p = op.inParams[i];
                            v = params[p.pos];
                            if(!p.tag || v !== undefined)
                            {
                                if(typeof p.type.validate === "function")
                                {
                                    if(!p.type.validate(v))
                                    {
                                        throw new Ice.MarshalException("invalid value for argument " + (i + 1)  +
                                                                       " in operation `" + op.servantMethod + "'");
                                    }
                                }
                            }
                        }
        
                        marshalParams(os, params, undefined, op.inParams, op.inParamsOpt, op.sendsClasses);
                    };
                }
        
                var unmarshalFn = null;
                if(op.returns || op.outParams.length > 0)
                {
                    unmarshalFn = function(asyncResult)
                    {
                        //
                        // The results array holds the out parameters in the following format:
                        //
                        // [retval, out1, out2, ..., asyncResult]
                        //
                        var results = [];
        
                        var is = asyncResult.__startReadParams();
        
                        var retvalInfo;
                        if(op.returns && !op.returns.tag)
                        {
                            retvalInfo = op.returns;
                        }
                        unmarshalParams(is, retvalInfo, op.outParams, op.outParamsOpt, op.returnsClasses, results, 0);
        
                        asyncResult.__endReadParams();
        
                        //
                        // When unmarshaling objects, the ObjectHelper returns a wrapper object
                        // and eventually stores the unmarshaled object into its "value" member.
                        // Here we scan the results array and replace the wrappers with the
                        // actual object references.
                        //
                        if(op.returnsClasses || op.outParamsOpt.length > 0)
                        {
                            var offset = 0; // Skip asyncResult in results.
                            if(op.returns && op.returns.isObject && results[op.returns.pos + offset] !== undefined)
                            {
                                results[op.returns.pos + offset] = results[op.returns.pos + offset].value;
                            }
                            for(var i = 0; i < op.outParams.length; ++i)
                            {
                                var p = op.outParams[i];
                                //
                                // Optional parameters may be undefined.
                                //
                                if(p.isObject && results[p.pos + offset] !== undefined)
                                {
                                    results[p.pos + offset] = results[p.pos + offset].value;
                                }
                            }
                        }
                        results.push(asyncResult);
                        return results;
                    };
                }
        
                return Ice.ObjectPrx.__invoke(this, op.name, op.sendMode, op.format, ctx, marshalFn, unmarshalFn,
                                                op.exceptions, Array.prototype.slice.call(args));
            };
        }
        
        var Slice = Ice.Slice;
        Slice.defineOperations = function(classType, proxyType, ops)
        {
            if(ops)
            {
                classType.__ops = new OpTable(ops);
            }
        
            classType.prototype.__dispatch = function(incomingAsync, current)
            {
                //
                // Retrieve the dispatch method for this operation.
                //
                var method = getServantMethod(classType, current.operation);
        
                if(method === undefined || typeof(method) !== 'function')
                {
                    throw new Ice.OperationNotExistException(current.id, current.facet, current.operation);
                }
        
                return method.call(method, this, incomingAsync, current);
            };
        
            if(ops)
            {
                for(var name in ops)
                {
                    addProxyOperation(proxyType, name, ops[name]);
                }
            }
        
            //
            // Copy proxy methods from super-interfaces.
            //
            if(proxyType.__implements)
            {
                for(var intf in proxyType.__implements)
                {
                    var proto = proxyType.__implements[intf].prototype;
                    for(var f in proto)
                    {
                        if(typeof proto[f] == "function" && proxyType.prototype[f] === undefined)
                        {
                            proxyType.prototype[f] = proto[f];
                        }
                    }
                }
            }
        };
        
        //
        // Define the "built-in" operations for all Ice objects.
        //
        Slice.defineOperations(Ice.Object, Ice.ObjectPrx,
        {
            "ice_ping": [, 1, 1, , , , , , ],
            "ice_isA": [, 1, 1, , , [1], [[7]], , ],
            "ice_id": [, 1, 1, , , [7], , , ],
            "ice_ids": [, 1, 1, , , ["Ice.StringSeqHelper"], , , ]
        });
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Address = Ice.Address;
        var HashUtil = Ice.HashUtil;
        var StringUtil = Ice.StringUtil;
        var Class = Ice.Class;
        var EndpointParseException = Ice.EndpointParseException;
        
        var IPEndpointI = Class(Ice.EndpointI, {
            __init__: function(instance, ho, po, sa, conId)
            {
                this._instance = instance;
                this._host = ho === undefined ? null : ho;
                this._port = po === undefined ? null : po;
                this._sourceAddr = sa === undefined ? null : sa;
                this._connectionId = conId === undefined ? "" : conId;
            },
            //
            // Marshal the endpoint
            //
            streamWrite: function(s)
            {
                s.startWriteEncaps();
                this.streamWriteImpl(s);
                s.endWriteEncaps();
            },
            getInfo: function()
            {
                var info = new Ice.IPEndpointInfo();
                this.fillEndpointInfo(info);
                return info;
            },
            //
            // Return the endpoint type
            //
            type: function()
            {
                return this._instance.type();
            },
            //
            // Return the protocol string
            //
            protocol: function()
            {
                return this._instance.protocol();
            },
            //
            // Return true if the endpoint is secure.
            //
            secure: function()
            {
                return this._instance.secure();
            },
            connectionId: function()
            {
                return this._connectionId;
            },
            //
            // Return a new endpoint with a different connection id.
            //
            changeConnectionId: function(connectionId)
            {
                if(connectionId === this._connectionId)
                {
                    return this;
                }
                else
                {
                    return this.createEndpoint(this._host, this._port, connectionId);
                }
            },
            //
            // Return the endpoint information.
            //
            hashCode: function()
            {
                if(this._hashCode === undefined)
                {
                    this._hashCode = this.hashInit(5381);
                }
                return this._hashCode;
            },
            options: function()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                var s = "";
        
                if(this._host !== null && this._host.length > 0)
                {
                    s += " -h ";
                    var addQuote = this._host.indexOf(':') != -1;
                    if(addQuote)
                    {
                        s += "\"";
                    }
                    s += this._host;
                    if(addQuote)
                    {
                        s += "\"";
                    }
                }
        
                s += " -p " + this._port;
        
                if(this._sourceAddr !== null && this._sourceAddr.length > 0)
                {
                    s += " --sourceAddr " + this._sourceAddr;
                }
                return s;
            },
            compareTo: function(p)
            {
                if(this === p)
                {
                    return 0;
                }
        
                if(p === null)
                {
                    return 1;
                }
        
                if(!(p instanceof IPEndpointI))
                {
                    return this.type() < p.type() ? -1 : 1;
                }
        
                if(this._port < p._port)
                {
                    return -1;
                }
                else if(p._port < this._port)
                {
                    return 1;
                }
        
                if(this._host != p._host)
                {
                    return this._host < p._host ? -1 : 1;
                }
        
                if(this._sourceAddr != p._sourceAddr)
                {
                    return this._sourceAddr < p._sourceAddr ? -1 : 1;
                }
        
                if(this._connectionId != p._connectionId)
                {
                    return this._connectionId < p._connectionId ? -1 : 1;
                }
        
                return 0;
            },
            getAddress: function()
            {
                return new Address(this._host, this._port);
            },
            //
            // Convert the endpoint to its Connector string form
            //
            toConnectorString: function()
            {
                return this._host + ":" + this._port;
            },
            streamWriteImpl: function(s)
            {
                s.writeString(this._host);
                s.writeInt(this._port);
            },
            hashInit: function(h)
            {
                h = HashUtil.addNumber(h, this.type());
                h = HashUtil.addString(h, this._host);
                h = HashUtil.addNumber(h, this._port);
                h = HashUtil.addString(h, this._sourceAddr);
                h = HashUtil.addString(h, this._connectionId);
                return h;
            },
            fillEndpointInfo: function(info)
            {
                var self = this;
                info.type = function() { return self.type(); };
                info.datagram = function() { return self.datagram(); };
                info.secure = function() { return self.secure(); };
                info.host = this._host;
                info.port = this._port;
                info.sourceAddress = this._sourceAddr;
            },
            initWithOptions: function(args, oaEndpoint)
            {
                Ice.EndpointI.prototype.initWithOptions.call(this, args);
        
                if(this._host === null || this._host.length === 0)
                {
                    this._host = this._instance.defaultHost();
                }
                else if(this._host == "*")
                {
                    if(oaEndpoint)
                    {
                        this._host = "";
                    }
                    else
                    {
                        throw new EndpointParseException("`-h *' not valid for proxy endpoint `" + this + "'");
                    }
                }
        
                if(this._host === null)
                {
                    this._host = "";
                }
        
                if(this._sourceAddr === null)
                {
                    if(!oaEndpoint)
                    {
                        this._sourceAddr = this._instance.defaultSourceAddress();
                    }
                }
                else if(oaEndpoint)
                {
                    throw new EndpointParseException("`--sourceAddress not valid for object adapter endpoint `" + this + "'");
                }
            },
            initWithStream: function(s)
            {
                this._host = s.readString();
                this._port = s.readInt();
            },
            checkOption: function(option, argument, str)
            {
                if(option === "-h")
                {
                    if(argument === null)
                    {
                        throw new EndpointParseException("no argument provided for -h option in endpoint " + str);
                    }
        
                    this._host = argument;
                }
                else if(option === "-p")
                {
                    if(argument === null)
                    {
                        throw new EndpointParseException("no argument provided for -p option in endpoint " + str);
                    }
        
                    try
                    {
                        this._port = StringUtil.toInt(argument);
                    }
                    catch(ex)
                    {
                        throw new EndpointParseException("invalid port value `" + argument + "' in endpoint " + str);
                    }
        
                    if(this._port < 0 || this._port > 65535)
                    {
                        throw new EndpointParseException("port value `" + argument + "' out of range in endpoint " + str);
                    }
                }
                else if(option === "--sourceAddress")
                {
                    if(argument === null)
                    {
                        throw new EndpointParseException("no argument provided for --sourceAddress option in endpoint " + str);
                    }
        
                    this._sourceAddr = argument;
                }
                else
                {
                    return false;
                }
                return true;
            }
        });
        
        Ice.IPEndpointI = IPEndpointI;
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `EndpointInfo.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            Object.defineProperty(IceSSL, 'EndpointType', {
                value: Ice.SSLEndpointType
            });
        
            /**
             * Provides access to an SSL endpoint information.
             * 
             **/
            IceSSL.EndpointInfo = Slice.defineLocalObject(
                function(timeout, compress, host, port, sourceAddress)
                {
                    Ice.IPEndpointInfo.call(this, timeout, compress, host, port, sourceAddress);
                },
                Ice.IPEndpointInfo);
        
            /**
             * Provides access to a secure WebSocket endpoint information.
             * 
             **/
            IceSSL.WSSEndpointInfo = Slice.defineLocalObject(
                function(timeout, compress, host, port, sourceAddress, resource)
                {
                    IceSSL.EndpointInfo.call(this, timeout, compress, host, port, sourceAddress);
                    this.resource = resource !== undefined ? resource : "";
                },
                IceSSL.EndpointInfo);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Connection.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            /**
             * Base class providing access to the connection details. *
             **/
            Ice.ConnectionInfo = Slice.defineLocalObject(
                function(incoming, adapterName, connectionId, rcvSize, sndSize)
                {
                    this.incoming = incoming !== undefined ? incoming : false;
                    this.adapterName = adapterName !== undefined ? adapterName : "";
                    this.connectionId = connectionId !== undefined ? connectionId : "";
                    this.rcvSize = rcvSize !== undefined ? rcvSize : 0;
                    this.sndSize = sndSize !== undefined ? sndSize : 0;
                });
        
            /**
             * An application can implement this interface to receive notifications when
             * a connection closes or receives a heartbeat message.
             * 
             * @see Connection#setCallback
             * 
             **/
            Ice.ConnectionCallback = Slice.defineLocalObject();
        
            Ice.ACMClose = Slice.defineEnum([
                ['CloseOff', 0], ['CloseOnIdle', 1], ['CloseOnInvocation', 2], ['CloseOnInvocationAndIdle', 3], ['CloseOnIdleForceful', 4]]);
        
            Ice.ACMHeartbeat = Slice.defineEnum([
                ['HeartbeatOff', 0], ['HeartbeatOnInvocation', 1], ['HeartbeatOnIdle', 2], ['HeartbeatAlways', 3]]);
        
            Ice.ACM = Slice.defineStruct(
                function(timeout, close, heartbeat)
                {
                    this.timeout = timeout !== undefined ? timeout : 0;
                    this.close = close !== undefined ? close : Ice.ACMClose.CloseOff;
                    this.heartbeat = heartbeat !== undefined ? heartbeat : Ice.ACMHeartbeat.HeartbeatOff;
                },
                true);
        
            /**
             * The user-level interface to a connection.
             * 
             **/
            Ice.Connection = Slice.defineLocalObject();
        
            /**
             * Provides access to the connection details of an IP connection
             * 
             **/
            Ice.IPConnectionInfo = Slice.defineLocalObject(
                function(incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort)
                {
                    Ice.ConnectionInfo.call(this, incoming, adapterName, connectionId, rcvSize, sndSize);
                    this.localAddress = localAddress !== undefined ? localAddress : "";
                    this.localPort = localPort !== undefined ? localPort : -1;
                    this.remoteAddress = remoteAddress !== undefined ? remoteAddress : "";
                    this.remotePort = remotePort !== undefined ? remotePort : -1;
                },
                Ice.ConnectionInfo);
        
            /**
             * Provides access to the connection details of a TCP connection
             * 
             **/
            Ice.TCPConnectionInfo = Slice.defineLocalObject(
                function(incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort)
                {
                    Ice.IPConnectionInfo.call(this, incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort);
                },
                Ice.IPConnectionInfo);
        
            /**
             * Provides access to the connection details of a UDP connection
             * 
             **/
            Ice.UDPConnectionInfo = Slice.defineLocalObject(
                function(incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort, mcastAddress, mcastPort)
                {
                    Ice.IPConnectionInfo.call(this, incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort);
                    this.mcastAddress = mcastAddress !== undefined ? mcastAddress : "";
                    this.mcastPort = mcastPort !== undefined ? mcastPort : -1;
                },
                Ice.IPConnectionInfo);
            Slice.defineDictionary(Ice, "HeaderDict", "HeaderDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
        
            /**
             * Provides access to the connection details of a WebSocket connection
             * 
             **/
            Ice.WSConnectionInfo = Slice.defineLocalObject(
                function(incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort, headers)
                {
                    Ice.TCPConnectionInfo.call(this, incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort);
                    this.headers = headers !== undefined ? headers : null;
                },
                Ice.TCPConnectionInfo);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        Ice.TraceLevels = function(properties)
        {
            var networkCat = "Network";
            var protocolCat = "Protocol";
            var retryCat = "Retry";
            var locationCat = "Locator";
            var slicingCat = "Slicing";
        
            var keyBase = "Ice.Trace.";
        
            var network = properties.getPropertyAsInt(keyBase + networkCat);
            var protocol = properties.getPropertyAsInt(keyBase + protocolCat);
            var retry = properties.getPropertyAsInt(keyBase + retryCat);
            var location = properties.getPropertyAsInt(keyBase + locationCat);
            var slicing = properties.getPropertyAsInt(keyBase + slicingCat);
            properties.getPropertyAsInt(keyBase + "ThreadPool"); // Avoid an "unused property" warning.
        
            return Object.create(null, {
                'network': {
                    get: function() { return network; }
                },
                'networkCat': {
                    get: function() { return networkCat; }
                },
                'protocol': {
                    get: function() { return protocol; }
                },
                'protocolCat': {
                    get: function() { return protocolCat; }
                },
                'retry': {
                    get: function() { return retry; }
                },
                'retryCat': {
                    get: function() { return retryCat; }
                },
                'location': {
                    get: function() { return location; }
                },
                'locationCat': {
                    get: function() { return locationCat; }
                },
                'slicing': {
                    get: function() { return slicing; }
                },
                'slicingCat': {
                    get: function() { return slicingCat; }
                }
            });
        };
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Base64 = Ice.Base64;
        var Debug = Ice.Debug;
        var HashUtil = Ice.HashUtil;
        var Protocol = Ice.Protocol;
        var StringUtil = Ice.StringUtil;
        var EndpointParseException = Ice.EndpointParseException;
        
        var Class = Ice.Class;
        
        var OpaqueEndpointI = Class(Ice.EndpointI, {
            __init__: function(type)
            {
                this._rawEncoding = Ice.Encoding_1_0;
                this._type = type === undefined ? -1 : type;
                this._rawBytes = null;
            },
            //
            // Marshal the endpoint
            //
            streamWrite: function(s)
            {
                s.startWriteEncaps(this._rawEncoding, Ice.FormatType.DefaultFormat);
                s.writeBlob(this._rawBytes);
                s.endWriteEncaps();
            },
            //
            // Return the endpoint information.
            //
            getInfo: function()
            {
                return new OpaqueEndpointInfoI(-1, false, this._rawEncoding, this._rawBytes, this._type);
            },
            //
            // Return the endpoint type
            //
            type: function()
            {
                return this._type;
            },
            protocol: function()
            {
                return "opaque";
            },
            //
            // Return the timeout for the endpoint in milliseconds. 0 means
            // non-blocking, -1 means no timeout.
            //
            timeout: function()
            {
                return -1;
            },
            //
            // Return a new endpoint with a different timeout value, provided
            // that timeouts are supported by the endpoint. Otherwise the same
            // endpoint is returned.
            //
            changeTimeout: function(t)
            {
                return this;
            },
            //
            // Return a new endpoint with a different connection id.
            //
            changeConnectionId: function(connectionId)
            {
                return this;
            },
            //
            // Return true if the endpoints support bzip2 compress, or false
            // otherwise.
            //
            compress: function()
            {
                return false;
            },
            //
            // Return a new endpoint with a different compression value,
            // provided that compression is supported by the
            // endpoint. Otherwise the same endpoint is returned.
            //
            changeCompress: function(compress)
            {
                return this;
            },
            //
            // Return true if the endpoint is datagram-based.
            //
            datagram: function()
            {
                return false;
            },
            //
            // Return true if the endpoint is secure.
            //
            secure: function()
            {
                return false;
            },
            //
            // Get the encoded endpoint.
            //
            rawBytes: function()
            {
                return this._rawBytes; // Returns a Uint8Array
            },
            //
            // Return a server side transceiver for this endpoint, or null if a
            // transceiver can only be created by an acceptor. In case a
            // transceiver is created, this operation also returns a new
            // "effective" endpoint, which might differ from this endpoint,
            // for example, if a dynamic port number is assigned.
            //
            transceiver: function(endpoint)
            {
                endpoint.value = null;
                return null;
            },
            //
            // Return an acceptor for this endpoint, or null if no acceptors
            // is available. In case an acceptor is created, this operation
            // also returns a new "effective" endpoint, which might differ
            // from this endpoint, for example, if a dynamic port number is
            // assigned.
            //
            acceptor: function(endpoint, adapterName)
            {
                endpoint.value = this;
                return null;
            },
            connect: function()
            {
                return null;
            },
            hashCode: function()
            {
                if(this._hashCode === undefined)
                {
                    var h = 5381;
                    h = HashUtil.addNumber(h, this._type);
                    h = HashUtil.addHashable(h, this._rawEncoding);
                    h = HashUtil.addArray(h, this._rawBytes, HashUtil.addNumber);
                    this._hashCode = h;
                }
                return this._hashCode;
            },
            options: function()
            {
                var s = "";
                s+= " -t " + this._type;
                s += " -e " + Ice.encodingVersionToString(this._rawEncoding);
                s += " -v " + Base64.encode(this._rawBytes);
                return s;
            },
            //
            // Compare endpoints for sorting purposes
            //
            equals: function(p)
            {
                if(!(p instanceof OpaqueEndpointI))
                {
                    return false;
                }
        
                if(this === p)
                {
                    return true;
                }
        
                if(this._type !== p._type)
                {
                    return false;
                }
        
                if(!this._rawEncoding.equals(p._rawEncoding))
                {
                    return false;
                }
        
                if(this._rawBytes.length !== p._rawBytes.length)
                {
                    return false;
                }
                for(var i = 0; i < this._rawBytes.length; i++)
                {
                    if(this._rawBytes[i] !== p._rawBytes[i])
                    {
                        return false;
                    }
                }
        
                return true;
            },
            compareTo: function(p)
            {
                if(this === p)
                {
                    return 0;
                }
        
                if(p === null)
                {
                    return 1;
                }
        
                if(!(p instanceof OpaqueEndpointI))
                {
                    return this.type() < p.type() ? -1 : 1;
                }
        
                if(this._type < p._type)
                {
                    return -1;
                }
                else if(p._type < this._type)
                {
                    return 1;
                }
        
                if(this._rawEncoding.major < p._rawEncoding.major)
                {
                    return -1;
                }
                else if(p._rawEncoding.major < this._rawEncoding.major)
                {
                    return 1;
                }
        
                if(this._rawEncoding.minor < p._rawEncoding.minor)
                {
                    return -1;
                }
                else if(p._rawEncoding.minor < this._rawEncoding.minor)
                {
                    return 1;
                }
        
                if(this._rawBytes.length < p._rawBytes.length)
                {
                    return -1;
                }
                else if(p._rawBytes.length < this._rawBytes.length)
                {
                    return 1;
                }
                for(var i = 0; i < this._rawBytes.length; i++)
                {
                    if(this._rawBytes[i] < p._rawBytes[i])
                    {
                        return -1;
                    }
                    else if(p._rawBytes[i] < this._rawBytes[i])
                    {
                        return 1;
                    }
                }
        
                return 0;
            },
            checkOption: function(option, argument, endpoint)
            {
                switch(option.charAt(1))
                {
                    case 't':
                    {
                        if(this._type > -1)
                        {
                            throw new EndpointParseException("multiple -t options in endpoint " + endpoint);
                        }
                        if(argument === null)
                        {
                            throw new EndpointParseException("no argument provided for -t option in endpoint " + endpoint);
                        }
        
                        var type;
        
                        try
                        {
                            type = StringUtil.toInt(argument);
                        }
                        catch(ex)
                        {
                            throw new EndpointParseException("invalid type value `" + argument + "' in endpoint " + endpoint);
                        }
        
                        if(type < 0 || type > 65535)
                        {
                            throw new EndpointParseException("type value `" + argument + "' out of range in endpoint " +
                                                             endpoint);
                        }
        
                        this._type = type;
                        return true;
                    }
        
                    case 'v':
                    {
                        if(this._rawBytes)
                        {
                            throw new EndpointParseException("multiple -v options in endpoint " + endpoint);
                        }
                        if(argument === null || argument.length === 0)
                        {
                            throw new EndpointParseException("no argument provided for -v option in endpoint " + endpoint);
                        }
                        for(var j = 0; j < argument.length; ++j)
                        {
                            if(!Base64.isBase64(argument.charAt(j)))
                            {
                                throw new EndpointParseException("invalid base64 character `" + argument.charAt(j) +
                                                                    "' (ordinal " + argument.charCodeAt(j) +
                                                                    ") in endpoint " + endpoint);
                            }
                        }
                        this._rawBytes = Base64.decode(argument);
                        return true;
                    }
        
                    case 'e':
                    {
                        if(argument === null)
                        {
                            throw new EndpointParseException("no argument provided for -e option in endpoint " + endpoint);
                        }
                        try
                        {
                            this._rawEncoding = Ice.stringToEncodingVersion(argument);
                        }
                        catch(e)
                        {
                            throw new EndpointParseException("invalid encoding version `" + argument +
                                                             "' in endpoint " + endpoint + ":\n" + e.str);
                        }
                        return true;
                    }
        
                    default:
                    {
                        return false;
                    }
                }
            },
            initWithOptions: function(args)
            {
                Ice.EndpointI.prototype.initWithOptions.call(this, args);
                Debug.assert(this._rawEncoding);
        
                if(this._type < 0)
                {
                    throw new EndpointParseException("no -t option in endpoint `" + this + "'");
                }
                if(this._rawBytes === null || this._rawBytes.length === 0)
                {
                    throw new EndpointParseException("no -v option in endpoint `" + this + "'");
                }
            },
            initWithStream: function(s)
            {
                this._rawEncoding = s.getReadEncoding();
                var sz = s.getReadEncapsSize();
                this._rawBytes = s.readBlob(sz);
            }
        });
        
        var OpaqueEndpointInfoI = Class(Ice.OpaqueEndpointInfo, {
            __init__: function(timeout, compress, rawEncoding, rawBytes, type)
            {
                Ice.OpaqueEndpointInfo.call(this, -1, false, rawEncoding, rawBytes);
                this._type = type;
            },
            type: function()
            {
                return this._type;
            },
            datagram: function()
            {
                return false;
            },
            secure: function()
            {
                return false;
            }
        });
        
        Ice.OpaqueEndpointI = OpaqueEndpointI;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var BasicStream = Ice.BasicStream;
        var Current = Ice.Current;
        var Debug = Ice.Debug;
        var FormatType = Ice.FormatType;
        var Context = Ice.Context;
        var Identity = Ice.Identity;
        var Protocol = Ice.Protocol;
        var StringUtil = Ice.StringUtil;
        
        var IncomingAsync = Ice.Class({
            __init__: function(instance, connection, adapter, response, compress, requestId)
            {
                this._instance = instance;
                this._response = response;
                this._compress = compress;
                if(this._response)
                {
                    this._os = new BasicStream(instance, Protocol.currentProtocolEncoding);
                }
                this._connection = connection;
        
                this._current = new Current();
                this._current.id = new Identity();
                this._current.adapter = adapter;
                this._current.con = this._connection;
                this._current.requestId = requestId;
        
                this._servant = null;
                this._locator = null;
                this._cookie = { value: null };
        
                //
                // Prepare the response if necessary.
                //
                if(response)
                {
                    this._os.writeBlob(Protocol.replyHdr);
        
                    //
                    // Add the request ID.
                    //
                    this._os.writeInt(requestId);
                }
        
                this._is = null;
        
                this._cb = null;
                this._active = true;
            },
            __startWriteParams: function(format)
            {
                if(!this._response)
                {
                    throw new Ice.MarshalException("can't marshal out parameters for oneway dispatch");
                }
        
                Debug.assert(this._os.size == Protocol.headerSize + 4); // Reply status position.
                Debug.assert(this._current.encoding !== null); // Encoding for reply is known.
                this._os.writeByte(0);
                this._os.startWriteEncaps(this._current.encoding, format);
                return this._os;
            },
            __endWriteParams: function(ok)
            {
                if(this._response)
                {
                    var save = this._os.pos;
                    this._os.pos = Protocol.headerSize + 4; // Reply status position.
                    this._os.writeByte(ok ? Protocol.replyOK : Protocol.replyUserException);
                    this._os.pos = save;
                    this._os.endWriteEncaps();
                }
            },
            __writeEmptyParams: function()
            {
                if(this._response)
                {
                    Debug.assert(this._os.size === Protocol.headerSize + 4); // Reply status position.
                    Debug.assert(this._current.encoding !== null); // Encoding for reply is known.
                    this._os.writeByte(Protocol.replyOK);
                    this._os.writeEmptyEncaps(this._current.encoding);
                }
            },
            __writeParamEncaps: function(v, ok)
            {
                if(this._response)
                {
                    Debug.assert(this._os.size === Protocol.headerSize + 4); // Reply status position.
                    Debug.assert(this._current.encoding !== null); // Encoding for reply is known.
                    this._os.writeByte(ok ? Protocol.replyOK : Protocol.replyUserException);
                    if(v === null || v.length === 0)
                    {
                        this._os.writeEmptyEncaps(this._current.encoding);
                    }
                    else
                    {
                        this._os.writeEncaps(v);
                    }
                }
            },
            __writeUserException: function(ex, format)
            {
                var os = this.__startWriteParams(format);
                os.writeUserException(ex);
                this.__endWriteParams(false);
            },
            __warning: function(ex)
            {
                Debug.assert(this._instance !== null);
        
                var s = [];
                s.push("dispatch exception:");
                s.push("\nidentity: " + this._instance.identityToString(this._current.id));
                s.push("\nfacet: " + StringUtil.escapeString(this._current.facet, ""));
                s.push("\noperation: " + this._current.operation);
                if(this._connection !== null)
                {
                    var connInfo = this._connection.getInfo();
                    if(connInfo instanceof Ice.IPConnectionInfo)
                    {
                        var ipConnInfo = connInfo;
                        s.push("\nremote host: " + ipConnInfo.remoteAddress + " remote port: " + ipConnInfo.remotePort);
                    }
                }
                if(ex.stack)
                {
                    s.push("\n");
                    s.push(ex.stack);
                }
                this._instance.initializationData().logger.warning(s.join(""));
            },
            __servantLocatorFinished: function()
            {
                Debug.assert(this._locator !== null && this._servant !== null);
                try
                {
                    this._locator.finished(this._current, this._servant, this._cookie.value);
                    return true;
                }
                catch(ex)
                {
                    if(ex instanceof Ice.UserException)
                    {
                        Debug.assert(this._connection !== null);
        
                        //
                        // The operation may have already marshaled a reply; we must overwrite that reply.
                        //
                        if(this._response)
                        {
                            this._os.resize(Protocol.headerSize + 4); // Reply status position.
                            this._os.writeByte(Protocol.replyUserException);
                            this._os.startWriteEncaps();
                            this._os.writeUserException(ex);
                            this._os.endWriteEncaps();
                            this._connection.sendResponse(this._os, this._compress);
                        }
                        else
                        {
                            this._connection.sendNoResponse();
                        }
        
                        this._connection = null;
                    }
                    else
                    {
                        this.__handleException(ex);
                    }
                    return false;
                }
            },
            __handleException: function(ex)
            {
                Debug.assert(this._connection !== null);
        
                var props = this._instance.initializationData().properties;
                var s;
                if(ex instanceof Ice.RequestFailedException)
                {
                    if(ex.id === null)
                    {
                        ex.id = this._current.id;
                    }
        
                    if(ex.facet === null)
                    {
                        ex.facet = this._current.facet;
                    }
        
                    if(ex.operation === null || ex.operation.length === 0)
                    {
                        ex.operation = this._current.operation;
                    }
        
                    if(props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 1)
                    {
                        this.__warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os.resize(Protocol.headerSize + 4); // Reply status position.
                        if(ex instanceof Ice.ObjectNotExistException)
                        {
                            this._os.writeByte(Protocol.replyObjectNotExist);
                        }
                        else if(ex instanceof Ice.FacetNotExistException)
                        {
                            this._os.writeByte(Protocol.replyFacetNotExist);
                        }
                        else if(ex instanceof Ice.OperationNotExistException)
                        {
                            this._os.writeByte(Protocol.replyOperationNotExist);
                        }
                        else
                        {
                            Debug.assert(false);
                        }
                        ex.id.__write(this._os);
        
                        //
                        // For compatibility with the old FacetPath.
                        //
                        if(ex.facet === null || ex.facet.length === 0)
                        {
                            Ice.StringSeqHelper.write(this._os, null);
                        }
                        else
                        {
                            Ice.StringSeqHelper.write(this._os, [ ex.facet ]);
                        }
        
                        this._os.writeString(ex.operation);
        
                        this._connection.sendResponse(this._os, this._compress);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
                else if(ex instanceof Ice.UnknownLocalException)
                {
                    if(props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0)
                    {
                        this.__warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os.resize(Protocol.headerSize + 4); // Reply status position.
                        this._os.writeByte(Protocol.replyUnknownLocalException);
                        this._os.writeString(ex.unknown);
                        this._connection.sendResponse(this._os, this._compress);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
                else if(ex instanceof Ice.UnknownUserException)
                {
                    if(props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0)
                    {
                        this.__warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os.resize(Protocol.headerSize + 4); // Reply status position.
                        this._os.writeByte(Protocol.replyUnknownUserException);
                        this._os.writeString(ex.unknown);
                        this._connection.sendResponse(this._os, this._compress);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
                else if(ex instanceof Ice.UnknownException)
                {
                    if(props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0)
                    {
                        this.__warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os.resize(Protocol.headerSize + 4); // Reply status position.
                        this._os.writeByte(Protocol.replyUnknownException);
                        this._os.writeString(ex.unknown);
                        this._connection.sendResponse(this._os, this._compress);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
                else if(ex instanceof Ice.LocalException)
                {
                    if(props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0)
                    {
                        this.__warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os.resize(Protocol.headerSize + 4); // Reply status position.
                        this._os.writeByte(Protocol.replyUnknownLocalException);
                        //this._os.writeString(ex.toString());
                        s = [ ex.ice_name() ];
                        if(ex.stack)
                        {
                            s.push("\n");
                            s.push(ex.stack);
                        }
                        this._os.writeString(s.join(""));
                        this._connection.sendResponse(this._os, this._compress);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
                else if(ex instanceof Ice.UserException)
                {
                    if(props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0)
                    {
                        this.__warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os.resize(Protocol.headerSize + 4); // Reply status position.
                        this._os.writeByte(Protocol.replyUnknownUserException);
                        //this._os.writeString(ex.toString());
                        s = [ ex.ice_name() ];
                        if(ex.stack)
                        {
                            s.push("\n");
                            s.push(ex.stack);
                        }
                        this._os.writeString(s.join(""));
                        this._connection.sendResponse(this._os, this._compress);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
                else
                {
                    if(props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0)
                    {
                        this.__warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os.resize(Protocol.headerSize + 4); // Reply status position.
                        this._os.writeByte(Protocol.replyUnknownException);
                        //this._os.writeString(ex.toString());
                        this._os.writeString(ex.stack ? ex.stack : "");
                        this._connection.sendResponse(this._os, this._compress);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
        
                this._connection = null;
            },
            invoke: function(servantManager, stream)
            {
                this._is = stream;
        
                var start = this._is.pos;
        
                //
                // Read the current.
                //
                this._current.id.__read(this._is);
        
                //
                // For compatibility with the old FacetPath.
                //
                var facetPath = Ice.StringSeqHelper.read(this._is);
                if(facetPath.length > 0)
                {
                    if(facetPath.length > 1)
                    {
                        throw new Ice.MarshalException();
                    }
                    this._current.facet = facetPath[0];
                }
                else
                {
                    this._current.facet = "";
                }
        
                this._current.operation = this._is.readString();
                this._current.mode = Ice.OperationMode.valueOf(this._is.readByte());
                this._current.ctx = new Context();
                var sz = this._is.readSize();
                while(sz-- > 0)
                {
                    var first = this._is.readString();
                    var second = this._is.readString();
                    this._current.ctx.set(first, second);
                }
        
                //
                // Don't put the code above into the try block below. Exceptions
                // in the code above are considered fatal, and must propagate to
                // the caller of this operation.
                //
        
                if(servantManager !== null)
                {
                    this._servant = servantManager.findServant(this._current.id, this._current.facet);
                    if(this._servant === null)
                    {
                        this._locator = servantManager.findServantLocator(this._current.id.category);
                        if(this._locator === null && this._current.id.category.length > 0)
                        {
                            this._locator = servantManager.findServantLocator("");
                        }
        
                        if(this._locator !== null)
                        {
                            try
                            {
                                this._servant = this._locator.locate(this._current, this._cookie);
                            }
                            catch(ex)
                            {
                                if(ex instanceof Ice.UserException)
                                {
                                    var encoding = this._is.skipEncaps(); // Required for batch requests.
        
                                    if(this._response)
                                    {
                                        this._os.writeByte(Protocol.replyUserException);
                                        this._os.startWriteEncaps(encoding, FormatType.DefaultFormat);
                                        this._os.writeUserException(ex);
                                        this._os.endWriteEncaps();
                                        this._connection.sendResponse(this._os, this._compress);
                                    }
                                    else
                                    {
                                        this._connection.sendNoResponse();
                                    }
        
                                    this._connection = null;
                                    return;
                                }
                                else
                                {
                                    this._is.skipEncaps(); // Required for batch requests.
                                    this.__handleException(ex);
                                    return;
                                }
                            }
                        }
                    }
                }
        
                try
                {
                    if(this._servant !== null)
                    {
                        //
                        // DispatchAsync is a "pseudo dispatch status", used internally only
                        // to indicate async dispatch.
                        //
                        if(this._servant.__dispatch(this, this._current) === Ice.DispatchStatus.DispatchAsync)
                        {
                            //
                            // If this was an asynchronous dispatch, we're done here.
                            //
                            return;
                        }
        
                        if(this._locator !== null && !this.__servantLocatorFinished())
                        {
                            return;
                        }
                    }
                    else
                    {
                        //
                        // Skip the input parameters, this is required for reading
                        // the next batch request if dispatching batch requests.
                        //
                        this._is.skipEncaps();
        
                        if(servantManager !== null && servantManager.hasServant(this._current.id))
                        {
                            throw new Ice.FacetNotExistException(this._current.id, this._current.facet,
                                                                    this._current.operation);
                        }
                        else
                        {
                            throw new Ice.ObjectNotExistException(this._current.id, this._current.facet,
                                                                    this._current.operation);
                        }
                    }
                }
                catch(ex)
                {
                    if(this._servant !== null && this._locator !== null && !this.__servantLocatorFinished())
                    {
                        return;
                    }
                    this.__handleException(ex);
                    return;
                }
        
                //
                // Don't put the code below into the try block above. Exceptions
                // in the code below are considered fatal, and must propagate to
                // the caller of this operation.
                //
        
                Debug.assert(this._connection !== null);
        
                if(this._response)
                {
                    this._connection.sendResponse(this._os, this._compress);
                }
                else
                {
                    this._connection.sendNoResponse();
                }
        
                this._connection = null;
            },
            startReadParams: function()
            {
                //
                // Remember the encoding used by the input parameters, we'll
                // encode the response parameters with the same encoding.
                //
                this._current.encoding = this._is.startReadEncaps();
                return this._is;
            },
            endReadParams: function()
            {
                this._is.endReadEncaps();
            },
            readEmptyParams: function()
            {
                this._current.encoding = new Ice.EncodingVersion();
                this._is.skipEmptyEncaps(this._current.encoding);
            },
            readParamEncaps: function()
            {
                this._current.encoding = new Ice.EncodingVersion();
                return this._is.readEncaps(this._current.encoding);
            },
            __response: function()
            {
                try
                {
                    if(this._locator !== null && !this.__servantLocatorFinished())
                    {
                        return;
                    }
        
                    Debug.assert(this._connection !== null);
        
                    if(this._response)
                    {
                        this._connection.sendResponse(this._os, this._compress);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
        
                    this._connection = null;
                }
                catch(ex)
                {
                    this._connection.invokeException(ex, 1);
                }
            },
            __exception: function(exc)
            {
                try
                {
                    if(this._locator !== null && !this.__servantLocatorFinished())
                    {
                        return;
                    }
        
                    this.__handleException(exc);
                }
                catch(ex)
                {
                    this._connection.invokeException(ex, 1);
                }
            },
            __validateResponse: function(ok)
            {
                if(!this._active)
                {
                    return false;
                }
                this._active = false;
                return true;
            },
            ice_exception: function(ex)
            {
                if(!this._active)
                {
                    return;
                }
                this._active = false;
        
                if(this._connection !== null)
                {
                    this.__exception(ex);
                }
                else
                {
                    //
                    // Response has already been sent.
                    //
                    if(this._instance.initializationData().properties.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0)
                    {
                        this.__warning(ex);
                    }
                }
            }
        });
        
        Ice.IncomingAsync = IncomingAsync;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var AsyncResult = Ice.AsyncResult;
        var AsyncStatus = Ice.AsyncStatus;
        var BasicStream = Ice.BasicStream;
        var ConnectionRequestHandler = Ice.ConnectionRequestHandler;
        var Debug = Ice.Debug;
        var ExUtil = Ice.ExUtil;
        var RetryException = Ice.RetryException;
        var OutgoingAsync = Ice.OutgoingAsync;
        var Protocol = Ice.Protocol;
        var ReferenceMode = Ice.ReferenceMode;
        var LocalException = Ice.LocalException;
        var Promise = Ice.Promise;
        
        var ConnectRequestHandler = Ice.Class({
            __init__: function(ref, proxy)
            {
                this._reference = ref;
                this._response = ref.getMode() === ReferenceMode.ModeTwoway;
                this._proxy = proxy;
                this._proxies = [];
                this._initialized = false;
        
                this._connection = null;
                this._compress = false;
                this._exception = null;
                this._requests = [];
            },
            connect: function(proxy)
            {
                try
                {
                    if(!this.initialized())
                    {
                        this._proxies.push(proxy);
                    }
                }
                catch(ex)
                {
                    //
                    // Only throw if the connection didn't get established. If
                    // it died after being established, we allow the caller to
                    // retry the connection establishment by not throwing here.
                    //
                    if(this._connection === null)
                    {
                        throw ex;
                    }
                }
                return this._requestHandler ? this._requestHandler : this;
            },
            update: function(previousHandler, newHandler)
            {
                return previousHandler === this ? newHandler : this;
            },
            sendAsyncRequest: function(out)
            {
                if(!this._initialized)
                {
                    out.__cancelable(this); // This will throw if the request is canceled
                }
        
                if(!this.initialized())
                {
                    this._requests.push(out);
                    return AsyncStatus.Queued;
                }
                return out.__invokeRemote(this._connection, this._compress, this._response);
            },
            asyncRequestCanceled: function(out, ex)
            {
                if(this._exception !== null)
                {
                    return; // The request has been notified of a failure already.
                }
        
                if(!this.initialized())
                {
                    for(var i = 0; i < this._requests.length; i++)
                    {
                        if(this._requests[i] === out)
                        {
                            out.__completedEx(ex);
                            this._requests.splice(i, 1);
                            return;
                        }
                    }
                    Debug.assert(false); // The request has to be queued if it timed out and we're not initialized yet.
                }
                this._connection.asyncRequestCanceled(out, ex);
            },
            getReference: function()
            {
                return this._reference;
            },
            getConnection: function()
            {
                if(this._exception !== null)
                {
                    throw this._exception;
                }
                else
                {
                    return this._connection;
                }
            },
            //
            // Implementation of Reference_GetConnectionCallback
            //
            setConnection: function(connection, compress)
            {
                Debug.assert(this._exception === null && this._connection === null);
        
                this._connection = connection;
                this._compress = compress;
        
                //
                // If this proxy is for a non-local object, and we are using a router, then
                // add this proxy to the router info object.
                //
                var ri = this._reference.getRouterInfo();
                if(ri !== null)
                {
                    var self = this;
                    ri.addProxy(this._proxy).then(function()
                                                  {
                                                      //
                                                      // The proxy was added to the router info, we're now ready to send the
                                                      // queued requests.
                                                      //
                                                      self.flushRequests();
                                                  },
                                                  function(ex)
                                                  {
                                                      self.setException(ex);
                                                  });
                    return; // The request handler will be initialized once addProxy completes.
                }
        
                //
                // We can now send the queued requests.
                //
                this.flushRequests();
            },
            setException: function(ex)
            {
                Debug.assert(!this._initialized && this._exception === null);
        
                this._exception = ex;
                this._proxies.length = 0;
                this._proxy = null; // Break cyclic reference count.
        
                //
                // NOTE: remove the request handler *before* notifying the
                // requests that the connection failed. It's important to ensure
                // that future invocations will obtain a new connect request
                // handler once invocations are notified.
                //
                try
                {
                    this._reference.getInstance().requestHandlerFactory().removeRequestHandler(this._reference, this);
                }
                catch(exc)
                {
                    // Ignore
                }
        
                for(var i = 0; i < this._requests.length; ++i)
                {
                    var request = this._requests[i];
                    if(request !== null)
                    {
                        request.__completedEx(this._exception);
                    }
                }
                this._requests.length = 0;
            },
            initialized: function()
            {
                if(this._initialized)
                {
                    Debug.assert(this._connection !== null);
                    return true;
                }
                else
                {
                    if(this._exception !== null)
                    {
                        throw this._exception;
                    }
                    else
                    {
                        return this._initialized;
                    }
                }
            },
            flushRequests: function()
            {
                Debug.assert(this._connection !== null && !this._initialized);
        
                var exception = null;
                for(var i = 0; i < this._requests.length; ++i)
                {
                    var request = this._requests[i];
                    try
                    {
                        request.__invokeRemote(this._connection, this._compress, this._response);
                    }
                    catch(ex)
                    {
                        if(ex instanceof RetryException)
                        {
                            exception = ex.inner;
        
                            // Remove the request handler before retrying.
                            this._reference.getInstance().requestHandlerFactory().removeRequestHandler(this._reference, this);
        
                            request.__retryException(ex.inner);
                        }
                        else
                        {
                            Debug.assert(ex instanceof LocalException);
                            exception = ex;
                            request.out.__completedEx(ex);
                        }
                    }
                }
                this._requests.length = 0;
        
                if(this._reference.getCacheConnection() && exception === null)
                {
                    this._requestHandler = new ConnectionRequestHandler(this._reference, this._connection, this._compress);
                    for(var k = 0; k < this._proxies.length; ++k)
                    {
                        this._proxies[k].__updateRequestHandler(this, this._requestHandler);
                    }
                }
        
                Debug.assert(!this._initialized);
                this._exception = exception;
                this._initialized = this._exception === null;
        
                //
                // Only remove once all the requests are flushed to
                // guarantee serialization.
                //
                this._reference.getInstance().requestHandlerFactory().removeRequestHandler(this._reference, this);
        
                this._proxies.length = 0;
                this._proxy = null; // Break cyclic reference count.
            }
        });
        
        Ice.ConnectRequestHandler = ConnectRequestHandler;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `ConnectionInfo.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        (function(module, require, exports)
        {
            var __M = Ice.__M;
            var Slice = Ice.Slice;
        
        
            /**
             * Provides access to the connection details of an SSL connection
             * 
             **/
            IceSSL.ConnectionInfo = Slice.defineLocalObject(
                function(incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort, cipher, certs, verified)
                {
                    Ice.IPConnectionInfo.call(this, incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort);
                    this.cipher = cipher !== undefined ? cipher : "";
                    this.certs = certs !== undefined ? certs : null;
                    this.verified = verified !== undefined ? verified : false;
                },
                Ice.IPConnectionInfo);
        
            /**
             * Provides access to the connection details of a secure WebSocket connection
             * 
             **/
            IceSSL.WSSConnectionInfo = Slice.defineLocalObject(
                function(incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort, cipher, certs, verified, headers)
                {
                    IceSSL.ConnectionInfo.call(this, incoming, adapterName, connectionId, rcvSize, sndSize, localAddress, localPort, remoteAddress, remotePort, cipher, certs, verified);
                    this.headers = headers !== undefined ? headers : null;
                },
                IceSSL.ConnectionInfo);
        }
        (typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? module : undefined,
         typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? require : window.Ice.__require,
         typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? exports : window));
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        var IceSSL = Ice.__M.module("IceSSL");
        
        var Debug = Ice.Debug;
        var ExUtil = Ice.ExUtil;
        var Network = Ice.Network;
        var SocketOperation = Ice.SocketOperation;
        var Conn = Ice.Connection;
        var LocalException = Ice.LocalException;
        var SocketException = Ice.SocketException;
        var Timer = Ice.Timer;
        
        var StateNeedConnect = 0;
        var StateConnectPending = 1;
        var StateConnected = 2;
        var StateClosePending = 3;
        var StateClosed = 4;
        
        var IsFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        
        var WSTransceiver = Ice.Class({
            __init__: function(instance)
            {
                this._logger = instance.logger();
                this._readBuffers = [];
                this._readPosition = 0;
                this._maxSendPacketSize = instance.properties().getPropertyAsIntWithDefault("Ice.TCP.SndSize", 512 * 1024);
            },
            setCallbacks: function(connectedCallback, bytesAvailableCallback, bytesWrittenCallback)
            {
                this._connectedCallback = connectedCallback;
                this._bytesAvailableCallback = bytesAvailableCallback;
        
                var transceiver = this;
                this._bytesWrittenCallback = function(bytesSent, bytesTotal)
                {
                    if(transceiver._fd)
                    {
                        if(transceiver._fd.bufferedAmount < 1024 || this._exception)
                        {
                            bytesWrittenCallback(bytesSent, bytesTotal);
                        }
                        else
                        {
                            Timer.setTimeout(function() { transceiver._bytesWrittenCallback(bytesSent, bytesTotal); }, 50);
                        }
                    }
                };
            },
            //
            // Returns SocketOperation.None when initialization is complete.
            //
            initialize: function(readBuffer, writeBuffer)
            {
                try
                {
                    if(this._exception)
                    {
                        throw this._exception;
                    }
        
                    if(this._state === StateNeedConnect)
                    {
                        this._state = StateConnectPending;
                        this._fd = new WebSocket(this._url, "ice.zeroc.com");
                        this._fd.binaryType = "arraybuffer";
                        var self = this;
                        this._fd.onopen = function(e) { self.socketConnected(e); };
                        this._fd.onmessage = function(e) { self.socketBytesAvailable(e.data); };
                        this._fd.onclose = function(e) { self.socketClosed(e); };
                        return SocketOperation.Connect; // Waiting for connect to complete.
                    }
                    else if(this._state === StateConnectPending)
                    {
                        //
                        // Socket is connected.
                        //
                        this._desc = fdToString(this._addr);
                        this._state = StateConnected;
                    }
                }
                catch(err)
                {
                    if(!this._exception)
                    {
                        this._exception = translateError(this._state, err);
                    }
                    throw this._exception;
                }
        
                Debug.assert(this._state === StateConnected);
                return SocketOperation.None;
            },
            register: function()
            {
                //
                // Register the socket data listener.
                //
                this._registered = true;
                if(this._hasBytesAvailable || this._exception)
                {
                    this._bytesAvailableCallback();
                    this._hasBytesAvailable = false;
                }
            },
            unregister: function()
            {
                //
                // Unregister the socket data listener.
                //
                this._registered = false;
            },
            close: function()
            {
                if(this._fd === null)
                {
                    Debug.assert(this._exception); // Websocket creation failed.
                    return;
                }
        
                //
                // WORKAROUND: With Firefox, calling close() if the websocket isn't connected
                // yet doesn't close the connection. The server doesn't receive any close frame
                // and the underlying socket isn't closed causing the server to hang on closing
                // the connection until the browser exits.
                //
                // To workaround this problem, we always wait for the socket to be connected
                // or closed before closing the socket.
                //
                if(this._fd.readyState === WebSocket.CONNECTING && IsFirefox)
                {
                    this._state = StateClosePending;
                    return;
                }
        
                Debug.assert(this._fd !== null);
                try
                {
                    this._state = StateClosed;
                    this._fd.close();
                }
                catch(ex)
                {
                    throw translateError(this._state, ex);
                }
                finally
                {
                    this._fd = null;
                }
            },
            //
            // Returns true if all of the data was flushed to the kernel buffer.
            //
            write: function(byteBuffer)
            {
                if(this._exception)
                {
                    throw this._exception;
                }
                else if(byteBuffer.remaining === 0)
                {
                    return true;
                }
        
                var transceiver = this;
                var bytesWrittenCallback = function()
                { 
                    transceiver._bytesWrittenCallback(0, 0); 
                };
        
                if(this._fd.bufferedAmount > 1024)
                {
                    Timer.setTimeout(bytesWrittenCallback, 50);
                    return false;
                }
        
                var packetSize = byteBuffer.remaining;
                Debug.assert(packetSize > 0);
                Debug.assert(this._fd);
        
                if(this._maxSendPacketSize > 0 && packetSize > this._maxSendPacketSize)
                {
                    packetSize = this._maxSendPacketSize;
                }
        
                while(packetSize > 0)
                {
                    var slice = byteBuffer.b.slice(byteBuffer.position, byteBuffer.position + packetSize);
                    this._fd.send(slice);
        
                    byteBuffer.position = byteBuffer.position + packetSize;
                    if(this._maxSendPacketSize > 0 && byteBuffer.remaining > this._maxSendPacketSize)
                    {
                        packetSize = this._maxSendPacketSize;
                    }
                    else
                    {
                        packetSize = byteBuffer.remaining;
                    }
        
                    if(this._fd.bufferedAmount > 0 && packetSize > 0)
                    {
                        Timer.setTimeout(bytesWrittenCallback, 50);
                        return false;
                    }
                }
                return true;
            },
            read: function(byteBuffer, moreData)
            {
                if(this._exception)
                {
                    throw this._exception;
                }
        
                moreData.value = false;
        
                if(this._readBuffers.length === 0)
                {
                    return false; // No data available.
                }
        
                var avail = this._readBuffers[0].byteLength - this._readPosition;
                Debug.assert(avail > 0);
                var remaining = byteBuffer.remaining;
        
                while(byteBuffer.remaining > 0)
                {
                    if(avail > byteBuffer.remaining)
                    {
                        avail = byteBuffer.remaining;
                    }
        
                    new Uint8Array(byteBuffer.b).set(new Uint8Array(this._readBuffers[0], this._readPosition, avail),
                                                        byteBuffer.position);
        
                    byteBuffer.position += avail;
                    this._readPosition += avail;
                    if(this._readPosition === this._readBuffers[0].byteLength)
                    {
                        //
                        // We've exhausted the current read buffer.
                        //
                        this._readPosition = 0;
                        this._readBuffers.shift();
                        if(this._readBuffers.length === 0)
                        {
                            break; // No more data - we're done.
                        }
                        else
                        {
                            avail = this._readBuffers[0].byteLength;
                        }
                    }
                }
        
                moreData.value = this._readBuffers.byteLength > 0;
        
                return byteBuffer.remaining === 0;
            },
            type: function()
            {
                return this._secure ? "wss" : "ws";
            },
            getInfo: function()
            {
                Debug.assert(this._fd !== null);
                var info = this._secure ? new IceSSL.WSSConnectionInfo() : new Ice.WSConnectionInfo();
        
                //
                // The WebSocket API doens't provide this info
                //
                info.localAddress = "";
                info.localPort = -1;
                info.remoteAddress = this._addr.host;
                info.remotePort = this._addr.port;
                info.rcvSize = -1;
                info.sndSize = this._maxSendPacketSize;
                info.headers = {};
                return info;
            },
            checkSendSize: function(stream)
            {
            },
            setBufferSize: function(rcvSize, sndSize)
            {
                this._maxSendPacketSize = sndSize;
            },
            toString: function()
            {
                return this._desc;
            },
            socketConnected: function(e)
            {
                if(this._state == StateClosePending)
                {
                    this.close();
                    return;
                }
        
                Debug.assert(this._connectedCallback !== null);
                this._connectedCallback();
            },
            socketBytesAvailable: function(buf)
            {
                Debug.assert(this._bytesAvailableCallback !== null);
                if(buf.byteLength > 0)
                {
                    this._readBuffers.push(buf);
                    if(this._registered)
                    {
                        this._bytesAvailableCallback();
                    }
                    else if(!this._hasBytesAvailable)
                    {
                        this._hasBytesAvailable = true;
                    }
                }
            },
            socketClosed: function(err)
            {
                if(this._state == StateClosePending)
                {
                    this.close();
                    return;
                }
        
                this._exception = translateError(this._state, err);
                if(this._state < StateConnected)
                {
                    this._connectedCallback();
                }
                else if(this._registered)
                {
                    this._bytesAvailableCallback();
                }
            },
        });
        
        function fdToString(address)
        {
            return "local address = <not available>\nremote address = " + address.host + ":" + address.port;
        }
        
        function translateError(state, err)
        {
            if(state < StateConnected)
            {
                return new Ice.ConnectFailedException(err.code, err);
            }
            else
            {
                if(err.code === 1000 || err.code === 1006) // CLOSE_NORMAL | CLOSE_ABNORMAL
                {
                    return new Ice.ConnectionLostException();
                }
                return new Ice.SocketException(err.code, err);
            }
        }
        
        WSTransceiver.createOutgoing = function(instance, secure, addr, resource)
        {
            var transceiver = new WSTransceiver(instance);
        
            var url = secure ? "wss" : "ws";
            url += "://" + addr.host;
            if(addr.port !== 80)
            {
                url += ":" + addr.port;
            }
            url += resource ? resource : "/";
            transceiver._url = url;
            transceiver._fd = null;
            transceiver._addr = addr;
            transceiver._desc = "local address = <not available>\nremote address = " + addr.host + ":" + addr.port;
            transceiver._state = StateNeedConnect;
            transceiver._secure = secure;
            transceiver._exception = null;
        
            return transceiver;
        };
        
        Ice.WSTransceiver = WSTransceiver;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Router.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            /**
             * The Ice router interface. Routers can be set either globally with
             * {@link Communicator.setDefaultRouter}, or with <tt>ice_router</tt> on specific
             * proxies.
             * 
             **/
            Ice.Router = Slice.defineObject(
                undefined,
                Ice.Object, undefined, 1,
                [
                    "::Ice::Object",
                    "::Ice::Router"
                ],
                -1, undefined, undefined, false);
        
            Ice.RouterPrx = Slice.defineProxy(Ice.ObjectPrx, Ice.Router.ice_staticId, undefined);
        
            Slice.defineOperations(Ice.Router, Ice.RouterPrx,
            {
                "getClientProxy": [, 2, 1, , , [9], , , , , ],
                "getServerProxy": [, 2, 1, , , [9], , , , , ],
                "addProxies": [, 2, 2, , , ["Ice.ObjectProxySeqHelper"], [["Ice.ObjectProxySeqHelper"]], , , , ]
            });
        
            /**
             * This inferface should be implemented by services implementing the
             * Ice::Router interface. It should be advertised through an Ice
             * object with the identity `Ice/RouterFinder'. This allows clients to
             * retrieve the router proxy with just the endpoint information of the
             * service.
             * 
             **/
            Ice.RouterFinder = Slice.defineObject(
                undefined,
                Ice.Object, undefined, 1,
                [
                    "::Ice::Object",
                    "::Ice::RouterFinder"
                ],
                -1, undefined, undefined, false);
        
            Ice.RouterFinderPrx = Slice.defineProxy(Ice.ObjectPrx, Ice.RouterFinder.ice_staticId, undefined);
        
            Slice.defineOperations(Ice.RouterFinder, Ice.RouterFinderPrx,
            {
                "getRouter": [, , , , , ["Ice.RouterPrx"], , , , , ]
            });
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Locator.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            /**
             * This exception is raised if an adapter cannot be found.
             * 
             **/
            Ice.AdapterNotFoundException = Slice.defineUserException(
                function(_cause)
                {
                    Ice.UserException.call(this, _cause);
                },
                Ice.UserException,
                "Ice::AdapterNotFoundException",
                undefined, undefined,
                false,
                false);
        
            /**
             * This exception is raised if the replica group provided by the
             * server is invalid.
             * 
             **/
            Ice.InvalidReplicaGroupIdException = Slice.defineUserException(
                function(_cause)
                {
                    Ice.UserException.call(this, _cause);
                },
                Ice.UserException,
                "Ice::InvalidReplicaGroupIdException",
                undefined, undefined,
                false,
                false);
        
            /**
             * This exception is raised if a server tries to set endpoints for
             * an adapter that is already active.
             * 
             **/
            Ice.AdapterAlreadyActiveException = Slice.defineUserException(
                function(_cause)
                {
                    Ice.UserException.call(this, _cause);
                },
                Ice.UserException,
                "Ice::AdapterAlreadyActiveException",
                undefined, undefined,
                false,
                false);
        
            /**
             * This exception is raised if an object cannot be found.
             * 
             **/
            Ice.ObjectNotFoundException = Slice.defineUserException(
                function(_cause)
                {
                    Ice.UserException.call(this, _cause);
                },
                Ice.UserException,
                "Ice::ObjectNotFoundException",
                undefined, undefined,
                false,
                false);
        
            /**
             * This exception is raised if a server cannot be found.
             * 
             **/
            Ice.ServerNotFoundException = Slice.defineUserException(
                function(_cause)
                {
                    Ice.UserException.call(this, _cause);
                },
                Ice.UserException,
                "Ice::ServerNotFoundException",
                undefined, undefined,
                false,
                false);
        
            /**
             * The Ice locator interface. This interface is used by clients to
             * lookup adapters and objects. It is also used by servers to get the
             * locator registry proxy.
             * 
             * <p class="Note">The {@link Locator} interface is intended to be used by
             * Ice internals and by locator implementations. Regular user code
             * should not attempt to use any functionality of this interface
             * directly.
             * 
             **/
            Ice.Locator = Slice.defineObject(
                undefined,
                Ice.Object, undefined, 0,
                [
                    "::Ice::Locator",
                    "::Ice::Object"
                ],
                -1, undefined, undefined, false);
        
            Ice.LocatorPrx = Slice.defineProxy(Ice.ObjectPrx, Ice.Locator.ice_staticId, undefined);
        
            Slice.defineOperations(Ice.Locator, Ice.LocatorPrx,
            {
                "findObjectById": [, 2, 1, 1, , [9], [[Ice.Identity]], , 
                [
                    Ice.ObjectNotFoundException
                ], , ],
                "findAdapterById": [, 2, 1, 1, , [9], [[7]], , 
                [
                    Ice.AdapterNotFoundException
                ], , ],
                "getRegistry": [, 2, 1, , , ["Ice.LocatorRegistryPrx"], , , , , ]
            });
        
            /**
             * The Ice locator registry interface. This interface is used by
             * servers to register adapter endpoints with the locator.
             * 
             * <p class="Note"> The {@link LocatorRegistry} interface is intended to be used
             * by Ice internals and by locator implementations. Regular user
             * code should not attempt to use any functionality of this interface
             * directly.
             * 
             **/
            Ice.LocatorRegistry = Slice.defineObject(
                undefined,
                Ice.Object, undefined, 0,
                [
                    "::Ice::LocatorRegistry",
                    "::Ice::Object"
                ],
                -1, undefined, undefined, false);
        
            Ice.LocatorRegistryPrx = Slice.defineProxy(Ice.ObjectPrx, Ice.LocatorRegistry.ice_staticId, undefined);
        
            Slice.defineOperations(Ice.LocatorRegistry, Ice.LocatorRegistryPrx,
            {
                "setAdapterDirectProxy": [, 2, 2, 1, , , [[7], [9]], , 
                [
                    Ice.AdapterAlreadyActiveException,
                    Ice.AdapterNotFoundException
                ], , ],
                "setReplicatedAdapterDirectProxy": [, 2, 2, 1, , , [[7], [7], [9]], , 
                [
                    Ice.AdapterAlreadyActiveException,
                    Ice.AdapterNotFoundException,
                    Ice.InvalidReplicaGroupIdException
                ], , ],
                "setServerProcessProxy": [, 2, 2, 1, , , [[7], ["Ice.ProcessPrx"]], , 
                [
                    Ice.ServerNotFoundException
                ], , ]
            });
        
            /**
             * This inferface should be implemented by services implementing the
             * Ice::Locator interface. It should be advertised through an Ice
             * object with the identity `Ice/LocatorFinder'. This allows clients
             * to retrieve the locator proxy with just the endpoint information of
             * the service.
             * 
             **/
            Ice.LocatorFinder = Slice.defineObject(
                undefined,
                Ice.Object, undefined, 0,
                [
                    "::Ice::LocatorFinder",
                    "::Ice::Object"
                ],
                -1, undefined, undefined, false);
        
            Ice.LocatorFinderPrx = Slice.defineProxy(Ice.ObjectPrx, Ice.LocatorFinder.ice_staticId, undefined);
        
            Slice.defineOperations(Ice.LocatorFinder, Ice.LocatorFinderPrx,
            {
                "getLocator": [, , , , , ["Ice.LocatorPrx"], , , , , ]
            });
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        
        var Debug = Ice.Debug;
        var HashUtil = Ice.HashUtil;
        var StringUtil = Ice.StringUtil;
        var TcpTransceiver = typeof(Ice.TcpTransceiver) !== "undefined" ? Ice.TcpTransceiver : null;
        var Class = Ice.Class;
        
        var TcpEndpointI = Class(Ice.IPEndpointI, {
            __init__: function(instance, ho, po, sif, ti, conId, co)
            {
                Ice.IPEndpointI.call(this, instance, ho, po, sif, conId);
                this._timeout = ti === undefined ? (instance ? instance.defaultTimeout() : undefined) : ti;
                this._compress = co === undefined ? false : co;
            },
            //
            // Return the endpoint information.
            //
            getInfo: function()
            {
                var info = this.secure() ? new IceSSL.EndpointInfo() : new Ice.TCPEndpointInfo();
                this.fillEndpointInfo(info);
                return info;
            },
            //
            // Return the timeout for the endpoint in milliseconds. 0 means
            // non-blocking, -1 means no timeout.
            //
            timeout: function()
            {
                return this._timeout;
            },
            //
            // Return a new endpoint with a different timeout value, provided
            // that timeouts are supported by the endpoint. Otherwise the same
            // endpoint is returned.
            //
            changeTimeout: function(timeout)
            {
                if(timeout === this._timeout)
                {
                    return this;
                }
                else
                {
                    return new TcpEndpointI(this._instance, this._host, this._port, this._sourceAddr, timeout,
                                            this._connectionId, this._compress);
                }
            },
            //
            // Return a new endpoint with a different connection id.
            //
            changeConnectionId: function(connectionId)
            {
                if(connectionId === this._connectionId)
                {
                    return this;
                }
                else
                {
                    return new TcpEndpointI(this._instance, this._host, this._port, this._sourceAddr, this._timeout,
                                            connectionId, this._compress);
                }
            },
            //
            // Return true if the endpoints support bzip2 compress, or false
            // otherwise.
            //
            compress: function()
            {
                return this._compress;
            },
            //
            // Return a new endpoint with a different compression value,
            // provided that compression is supported by the
            // endpoint. Otherwise the same endpoint is returned.
            //
            changeCompress: function(compress)
            {
                if(compress === this._compress)
                {
                    return this;
                }
                else
                {
                    return new TcpEndpointI(this._instance, this._host, this._port, this._sourceAddr, this._timeout,
                                            this._connectionId, compress);
                }
            },
            //
            // Return true if the endpoint is datagram-based.
            //
            datagram: function()
            {
                return false;
            },
            connectable: function()
            {
                //
                // TCP endpoints are not connectable when running in a browser, SSL
                // isn't currently supported.
                //
                return TcpTransceiver !== null && !this.secure();
            },
            connect: function()
            {
                Debug.assert(!this.secure());
                return TcpTransceiver.createOutgoing(this._instance, this.getAddress(), this._sourceAddr);
            },
            //
            // Convert the endpoint to its string form
            //
            options: function()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                var s = Ice.IPEndpointI.prototype.options.call(this);
                if(this._timeout == -1)
                {
                    s += " -t infinite";
                }
                else
                {
                    s += " -t " + this._timeout;
                }
        
                if(this._compress)
                {
                    s += " -z";
                }
                return s;
            },
            compareTo: function(p)
            {
                if(this === p)
                {
                    return 0;
                }
        
                if(p === null)
                {
                    return 1;
                }
        
                if(!(p instanceof TcpEndpointI))
                {
                    return this.type() < p.type() ? -1 : 1;
                }
        
                if(this._timeout < p._timeout)
                {
                    return -1;
                }
                else if(p._timeout < this._timeout)
                {
                    return 1;
                }
        
                if(!this._compress && p._compress)
                {
                    return -1;
                }
                else if(!p._compress && this._compress)
                {
                    return 1;
                }
        
                return Ice.IPEndpointI.prototype.compareTo.call(this, p);
            },
            streamWriteImpl: function(s)
            {
                Ice.IPEndpointI.prototype.streamWriteImpl.call(this, s);
                s.writeInt(this._timeout);
                s.writeBool(this._compress);
            },
            hashInit: function(h)
            {
                h = Ice.IPEndpointI.prototype.hashInit.call(this, h);
                h = HashUtil.addNumber(h, this._timeout);
                h = HashUtil.addBoolean(h, this._compress);
                return h;
            },
            fillEndpointInfo: function(info)
            {
                Ice.IPEndpointI.prototype.fillEndpointInfo.call(this, info);
                info.timeout = this._timeout;
                info.compress = this._compress;
            },
            initWithStream: function(s)
            {
                Ice.IPEndpointI.prototype.initWithStream.call(this, s);
                this._timeout = s.readInt();
                this._compress = s.readBool();
            },
            checkOption: function(option, argument, endpoint)
            {
                if(Ice.IPEndpointI.prototype.checkOption.call(this, option, argument, endpoint))
                {
                    return true;
                }
        
                if(option === "-t")
                {
                    if(argument === null)
                    {
                        throw new Ice.EndpointParseException("no argument provided for -t option in endpoint " + endpoint);
                    }
        
                    if(argument == "infinite")
                    {
                        this._timeout = -1;
                    }
                    else
                    {
                        var invalid = false;
                        try
                        {
                            this._timeout = StringUtil.toInt(argument);
                        }
                        catch(ex)
                        {
                            invalid = true;
                        }
                        if(invalid || this._timeout < 1)
                        {
                            throw new Ice.EndpointParseException("invalid timeout value `" + argument + "' in endpoint " +
                                                                 endpoint);
                        }
                    }
                }
                else if(option === "-z")
                {
                    if(argument !== null)
                    {
                        throw new Ice.EndpointParseException("unexpected argument `" + argument +
                                                             "' provided for -z option in " + endpoint);
                    }
        
                    this._compress = true;
                }
                else
                {
                    return false;
                }
                return true;
            },
            createEndpoint: function(host, port, conId)
            {
                return new TcpEndpointI(this._instance, host, port, this._sourceAddr, this._timeout, conId, this._compress);
            }
        });
        
        Ice.TcpEndpointI = TcpEndpointI;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var AsyncStatus = Ice.AsyncStatus;
        var AsyncResultBase = Ice.AsyncResultBase;
        var BasicStream = Ice.BasicStream;
        var BatchRequestQueue = Ice.BatchRequestQueue;
        var ConnectionFlushBatch = Ice.ConnectionFlushBatch;
        var Debug = Ice.Debug;
        var ExUtil = Ice.ExUtil;
        var HashMap = Ice.HashMap;
        var IncomingAsync = Ice.IncomingAsync;
        var RetryException = Ice.RetryException;
        var Promise = Ice.Promise;
        var Protocol = Ice.Protocol;
        var SocketOperation = Ice.SocketOperation;
        var Timer = Ice.Timer;
        var TraceUtil = Ice.TraceUtil;
        var ProtocolVersion = Ice.ProtocolVersion;
        var EncodingVersion = Ice.EncodingVersion;
        var ACM = Ice.ACM;
        var ACMClose = Ice.ACMClose;
        var ACMHeartbeat = Ice.ACMHeartbeat;
        
        var StateNotInitialized = 0;
        var StateNotValidated = 1;
        var StateActive = 2;
        var StateHolding = 3;
        var StateClosing = 4;
        var StateClosed = 5;
        var StateFinished = 6;
        
        var MessageInfo = function(instance)
        {
            this.stream = new BasicStream(instance, Protocol.currentProtocolEncoding);
        
            this.invokeNum = 0;
            this.requestId = 0;
            this.compress = false;
            this.servantManager = null;
            this.adapter = null;
            this.outAsync = null;
            this.heartbeatCallback = null;
        };
        
        var Class = Ice.Class;
        
        var ConnectionI = Class({
            __init__: function(communicator, instance, monitor, transceiver, endpoint, incoming, adapter)
            {
                this._communicator = communicator;
                this._instance = instance;
                this._monitor = monitor;
                this._transceiver = transceiver;
                this._desc = transceiver.toString();
                this._type = transceiver.type();
                this._endpoint = endpoint;
                this._incoming = incoming;
                this._adapter = adapter;
                var initData = instance.initializationData();
                this._logger = initData.logger; // Cached for better performance.
                this._traceLevels = instance.traceLevels(); // Cached for better performance.
                this._timer = instance.timer();
                this._writeTimeoutId = 0;
                this._writeTimeoutScheduled = false;
                this._readTimeoutId = 0;
                this._readTimeoutScheduled = false;
        
                this._hasMoreData = { value: false };
        
                this._warn = initData.properties.getPropertyAsInt("Ice.Warn.Connections") > 0;
                this._warnUdp = instance.initializationData().properties.getPropertyAsInt("Ice.Warn.Datagrams") > 0;
                this._acmLastActivity = this._monitor !== null && this._monitor.getACM().timeout > 0 ? Date.now() : -1;
                this._nextRequestId = 1;
                this._messageSizeMax = adapter ? adapter.messageSizeMax() : instance.messageSizeMax();
                this._batchRequestQueue = new BatchRequestQueue(instance, endpoint.datagram());
        
                this._sendStreams = [];
        
                this._readStream = new BasicStream(instance, Protocol.currentProtocolEncoding);
                this._readHeader = false;
                this._writeStream = new BasicStream(instance, Protocol.currentProtocolEncoding);
        
                this._readStreamPos = -1;
                this._writeStreamPos = -1;
        
                this._dispatchCount = 0;
        
                this._state = StateNotInitialized;
                this._shutdownInitiated = false;
                this._initialized = false;
                this._validated = false;
        
                this._readProtocol = new ProtocolVersion();
                this._readProtocolEncoding = new EncodingVersion();
        
                this._asyncRequests = new HashMap(); // Map<int, OutgoingAsync>
        
                this._exception = null;
        
                this._startPromise = null;
                this._closePromises = [];
                this._holdPromises = [];
                this._finishedPromises = [];
        
                if(this._adapter !== null)
                {
                    this._servantManager = this._adapter.getServantManager();
                }
                else
                {
                    this._servantManager = null;
                }
                this._callback = null;
            },
            start: function()
            {
                Debug.assert(this._startPromise === null);
        
                try
                {
                    // The connection might already be closed if the communicator was destroyed.
                    if(this._state >= StateClosed)
                    {
                        Debug.assert(this._exception !== null);
                        return new Promise().fail(this._exception);
                    }
        
                    this._startPromise = new Promise();
                    var self = this;
                    this._transceiver.setCallbacks(
                        function() { self.message(SocketOperation.Write); }, // connected callback
                        function() { self.message(SocketOperation.Read); },  // read callback
                        function(bytesSent, bytesTotal) {
                            self.message(SocketOperation.Write);
                            if(self._instance.traceLevels().network >= 3 && bytesSent > 0)
                            {
                                var s = [];
                                s.push("sent ");
                                s.push(bytesSent);
                                if(!self._endpoint.datagram())
                                {
                                    s.push(" of ");
                                    s.push(bytesTotal);
                                }
                                s.push(" bytes via ");
                                s.push(self._endpoint.protocol());
                                s.push("\n");
                                s.push(this.toString());
                                self._instance.initializationData().logger.trace(self._instance.traceLevels().networkCat,
                                                                                 s.join(""));
                            }
                        }  // write callback
                    );
                    this.initialize();
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        this.exception(ex);
                    }
                    return new Promise().fail(ex);
                }
        
                return this._startPromise;
            },
            activate: function()
            {
                if(this._state <= StateNotValidated)
                {
                    return;
                }
        
                if(this._acmLastActivity > 0)
                {
                    this._acmLastActivity = Date.now();
                }
                this.setState(StateActive);
            },
            hold: function()
            {
                if(this._state <= StateNotValidated)
                {
                    return;
                }
        
                this.setState(StateHolding);
            },
            destroy: function(reason)
            {
                switch(reason)
                {
                    case ConnectionI.ObjectAdapterDeactivated:
                    {
                        this.setState(StateClosing, new Ice.ObjectAdapterDeactivatedException());
                        break;
                    }
        
                    case ConnectionI.CommunicatorDestroyed:
                    {
                        this.setState(StateClosing, new Ice.CommunicatorDestroyedException());
                        break;
                    }
                }
            },
            close: function(force)
            {
                var __r = new AsyncResultBase(this._communicator, "close", this, null, null);
        
                if(force)
                {
                    this.setState(StateClosed, new Ice.ForcedCloseConnectionException());
                    __r.succeed(__r);
                }
                else
                {
                    //
                    // If we do a graceful shutdown, then we wait until all
                    // outstanding requests have been completed. Otherwise,
                    // the CloseConnectionException will cause all outstanding
                    // requests to be retried, regardless of whether the
                    // server has processed them or not.
                    //
                    this._closePromises.push(__r);
                    this.checkClose();
                }
        
                return __r;
            },
            checkClose: function()
            {
                //
                // If close(false) has been called, then we need to check if all
                // requests have completed and we can transition to StateClosing.
                // We also complete outstanding promises.
                //
                if(this._asyncRequests.size === 0 && this._closePromises.length > 0)
                {
                    this.setState(StateClosing, new Ice.CloseConnectionException());
                    for(var i = 0; i < this._closePromises.length; ++i)
                    {
                        this._closePromises[i].succeed(this._closePromises[i]);
                    }
                    this._closePromises = [];
                }
            },
            isActiveOrHolding: function()
            {
                return this._state > StateNotValidated && this._state < StateClosing;
            },
            isFinished: function()
            {
                if(this._state !== StateFinished || this._dispatchCount !== 0)
                {
                    return false;
                }
        
                Debug.assert(this._state === StateFinished);
                return true;
            },
            throwException: function()
            {
                if(this._exception !== null)
                {
                    Debug.assert(this._state >= StateClosing);
                    throw this._exception;
                }
            },
            waitUntilHolding: function()
            {
                var promise = new Promise();
                this._holdPromises.push(promise);
                this.checkState();
                return promise;
            },
            waitUntilFinished: function()
            {
                var promise = new Promise();
                this._finishedPromises.push(promise);
                this.checkState();
                return promise;
            },
            monitor: function(now, acm)
            {
                if(this._state !== StateActive)
                {
                    return;
                }
        
                //
                // We send a heartbeat if there was no activity in the last
                // (timeout / 4) period. Sending a heartbeat sooner than
                // really needed is safer to ensure that the receiver will
                // receive in time the heartbeat. Sending the heartbeat if
                // there was no activity in the last (timeout / 2) period
                // isn't enough since monitor() is called only every (timeout
                // / 2) period.
                //
                // Note that this doesn't imply that we are sending 4 heartbeats
                // per timeout period because the monitor() method is sill only
                // called every (timeout / 2) period.
                //
                if(acm.heartbeat == Ice.ACMHeartbeat.HeartbeatAlways ||
                    (acm.heartbeat != Ice.ACMHeartbeat.HeartbeatOff && this._writeStream.isEmpty() &&
                     now >= (this._acmLastActivity + acm.timeout / 4)))
                {
                    if(acm.heartbeat != Ice.ACMHeartbeat.HeartbeatOnInvocation || this._dispatchCount > 0)
                    {
                        this.heartbeat(); // Send heartbeat if idle in the last timeout / 2 period.
                    }
                }
        
                if(this._readStream.size > Protocol.headerSize || !this._writeStream.isEmpty())
                {
                    //
                    // If writing or reading, nothing to do, the connection
                    // timeout will kick-in if writes or reads don't progress.
                    // This check is necessary because the actitivy timer is
                    // only set when a message is fully read/written.
                    //
                    return;
                }
        
                if(acm.close != Ice.ACMClose.CloseOff && now >= (this._acmLastActivity + acm.timeout))
                {
                    if(acm.close == Ice.ACMClose.CloseOnIdleForceful ||
                        (acm.close != Ice.ACMClose.CloseOnIdle && this._asyncRequests.size > 0))
                    {
                        //
                        // Close the connection if we didn't receive a heartbeat in
                        // the last period.
                        //
                        this.setState(StateClosed, new Ice.ConnectionTimeoutException());
                    }
                    else if(acm.close != Ice.ACMClose.CloseOnInvocation &&
                            this._dispatchCount === 0 && this._batchRequestQueue.isEmpty() && this._asyncRequests.size === 0)
                    {
                        //
                        // The connection is idle, close it.
                        //
                        this.setState(StateClosing, new Ice.ConnectionTimeoutException());
                    }
                }
            },
            sendAsyncRequest: function(out, compress, response, batchRequestNum)
            {
                var requestId = 0;
                var os = out.__os();
        
                if(this._exception !== null)
                {
                    //
                    // If the connection is closed before we even have a chance
                    // to send our request, we always try to send the request
                    // again.
                    //
                    throw new RetryException(this._exception);
                }
        
                Debug.assert(this._state > StateNotValidated);
                Debug.assert(this._state < StateClosing);
        
                //
                // Ensure the message isn't bigger than what we can send with the
                // transport.
                //
                this._transceiver.checkSendSize(os);
        
                //
                // Notify the request that it's cancelable with this connection.
                // This will throw if the request is canceled.
                //
                out.__cancelable(this); // Notify the request that it's cancelable
        
                if(response)
                {
                    //
                    // Create a new unique request ID.
                    //
                    requestId = this._nextRequestId++;
                    if(requestId <= 0)
                    {
                        this._nextRequestId = 1;
                        requestId = this._nextRequestId++;
                    }
        
                    //
                    // Fill in the request ID.
                    //
                    os.pos = Protocol.headerSize;
                    os.writeInt(requestId);
                }
                else if(batchRequestNum > 0)
                {
                    os.pos = Protocol.headerSize;
                    os.writeInt(batchRequestNum);
                }
        
                var status;
                try
                {
                    status = this.sendMessage(OutgoingMessage.create(out, out.__os(), compress, requestId));
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        this.setState(StateClosed, ex);
                        Debug.assert(this._exception !== null);
                        throw this._exception;
                    }
                    else
                    {
                        throw ex;
                    }
                }
        
                if(response)
                {
                    //
                    // Add to the async requests map.
                    //
                    this._asyncRequests.set(requestId, out);
                }
        
                return status;
            },
            getBatchRequestQueue: function()
            {
                return this._batchRequestQueue;
            },
            flushBatchRequests: function()
            {
                var result = new ConnectionFlushBatch(this, this._communicator, "flushBatchRequests");
                result.__invoke();
                return result;
            },
            setCallback: function(callback)
            {
                if(this._state >= StateClosed)
                {
                    if(callback !== null)
                    {
                        var self = this;
                        Timer.setImmediate(function() {
                            try
                            {
                                callback.closed(this);
                            }
                            catch(ex)
                            {
                                self._logger.error("connection callback exception:\n" + ex + '\n' + self._desc);
                            }
                        });
                    }
                }
                else
                {
                    this._callback = callback;
                }
            },
            setACM: function(timeout, close, heartbeat)
            {
                if(this._monitor === null || this._state >= StateClosed)
                {
                    return;
                }
        
                if(this._state == StateActive)
                {
                    this._monitor.remove(this);
                }
                this._monitor = this._monitor.acm(timeout, close, heartbeat);
                if(this._state == StateActive)
                {
                    this._monitor.add(this);
                }
                if(this._monitor.getACM().timeout <= 0)
                {
                    this._acmLastActivity = -1; // Disable the recording of last activity.
                }
                else if(this._state == StateActive && this._acmLastActivity == -1)
                {
                    this._acmLastActivity = Date.now();
                }
            },
            getACM: function()
            {
                return this._monitor !== null ? this._monitor.getACM() :
                    new ACM(0, ACMClose.CloseOff, ACMHeartbeat.HeartbeatOff);
            },
            asyncRequestCanceled: function(outAsync, ex)
            {
                for(var i = 0; i < this._sendStreams.length; i++)
                {
                    var o = this._sendStreams[i];
                    if(o.outAsync === outAsync)
                    {
                        if(o.requestId > 0)
                        {
                            this._asyncRequests.delete(o.requestId);
                        }
        
                        //
                        // If the request is being sent, don't remove it from the send streams,
                        // it will be removed once the sending is finished.
                        //
                        o.canceled();
                        if(i !== 0)
                        {
                            this._sendStreams.splice(i, 1);
                        }
                        outAsync.__completedEx(ex);
                        return; // We're done.
                    }
                }
        
                if(outAsync instanceof Ice.OutgoingAsync)
                {
                    for(var e = this._asyncRequests.entries; e !== null; e = e.next)
                    {
                        if(e.value === outAsync)
                        {
                            this._asyncRequests.delete(e.key);
                            outAsync.__completedEx(ex);
                            return; // We're done.
                        }
                    }
                }
            },
            sendResponse: function(os, compressFlag)
            {
                Debug.assert(this._state > StateNotValidated);
        
                try
                {
                    if(--this._dispatchCount === 0)
                    {
                        if(this._state === StateFinished)
                        {
                            this.reap();
                        }
                        this.checkState();
                    }
        
                    if(this._state >= StateClosed)
                    {
                        Debug.assert(this._exception !== null);
                        throw this._exception;
                    }
        
                    this.sendMessage(OutgoingMessage.createForStream(os, compressFlag !== 0, true));
        
                    if(this._state === StateClosing && this._dispatchCount === 0)
                    {
                        this.initiateShutdown();
                    }
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        this.setState(StateClosed, ex);
                    }
                    else
                    {
                        throw ex;
                    }
                }
            },
            sendNoResponse: function()
            {
                Debug.assert(this._state > StateNotValidated);
                try
                {
                    if(--this._dispatchCount === 0)
                    {
                        if(this._state === StateFinished)
                        {
                            this.reap();
                        }
                        this.checkState();
                    }
        
                    if(this._state >= StateClosed)
                    {
                        Debug.assert(this._exception !== null);
                        throw this._exception;
                    }
        
                    if(this._state === StateClosing && this._dispatchCount === 0)
                    {
                        this.initiateShutdown();
                    }
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        this.setState(StateClosed, ex);
                    }
                    else
                    {
                        throw ex;
                    }
                }
            },
            endpoint: function()
            {
                return this._endpoint;
            },
            setAdapter: function(adapter)
            {
                if(this._state <= StateNotValidated || this._state >= StateClosing)
                {
                    return;
                }
                Debug.assert(this._state < StateClosing);
        
                this._adapter = adapter;
        
                if(this._adapter !== null)
                {
                    this._servantManager = this._adapter.getServantManager();
                    if(this._servantManager === null)
                    {
                        this._adapter = null;
                    }
                }
                else
                {
                    this._servantManager = null;
                }
            },
            getAdapter: function()
            {
                return this._adapter;
            },
            getEndpoint: function()
            {
                return this._endpoint;
            },
            createProxy: function(ident)
            {
                //
                // Create a reference and return a reverse proxy for this
                // reference.
                //
                return this._instance.proxyFactory().referenceToProxy(
                    this._instance.referenceFactory().createFixed(ident, this));
            },
            message: function(operation)
            {
                if(this._state >= StateClosed)
                {
                    return;
                }
        
                this.unscheduleTimeout(operation);
        
                //
                // Keep reading until no more data is available.
                //
                this._hasMoreData.value = (operation & SocketOperation.Read) !== 0;
        
                var info = null;
                try
                {
                    if((operation & SocketOperation.Write) !== 0 && this._writeStream.buffer.remaining > 0)
                    {
                        if(!this.write(this._writeStream.buffer))
                        {
                            Debug.assert(!this._writeStream.isEmpty());
                            this.scheduleTimeout(SocketOperation.Write, this._endpoint.timeout());
                            return;
                        }
                        Debug.assert(this._writeStream.buffer.remaining === 0);
                    }
                    if((operation & SocketOperation.Read) !== 0 && !this._readStream.isEmpty())
                    {
                        if(this._readHeader) // Read header if necessary.
                        {
                            if(!this.read(this._readStream.buffer))
                            {
                                //
                                // We didn't get enough data to complete the header.
                                //
                                return;
                            }
        
                            Debug.assert(this._readStream.buffer.remaining === 0);
                            this._readHeader = false;
        
                            var pos = this._readStream.pos;
                            if(pos < Protocol.headerSize)
                            {
                                //
                                // This situation is possible for small UDP packets.
                                //
                                throw new Ice.IllegalMessageSizeException();
                            }
        
                            this._readStream.pos = 0;
                            var magic0 = this._readStream.readByte();
                            var magic1 = this._readStream.readByte();
                            var magic2 = this._readStream.readByte();
                            var magic3 = this._readStream.readByte();
                            if(magic0 !== Protocol.magic[0] || magic1 !== Protocol.magic[1] ||
                                magic2 !== Protocol.magic[2] || magic3 !== Protocol.magic[3])
                            {
                                var bme = new Ice.BadMagicException();
                                bme.badMagic = Ice.Buffer.createNative([magic0, magic1, magic2, magic3]);
                                throw bme;
                            }
        
                            this._readProtocol.__read(this._readStream);
                            Protocol.checkSupportedProtocol(this._readProtocol);
        
                            this._readProtocolEncoding.__read(this._readStream);
                            Protocol.checkSupportedProtocolEncoding(this._readProtocolEncoding);
        
                            this._readStream.readByte(); // messageType
                            this._readStream.readByte(); // compress
                            var size = this._readStream.readInt();
                            if(size < Protocol.headerSize)
                            {
                                throw new Ice.IllegalMessageSizeException();
                            }
                            if(size > this._messageSizeMax)
                            {
                                ExUtil.throwMemoryLimitException(size, this._messageSizeMax);
                            }
                            if(size > this._readStream.size)
                            {
                                this._readStream.resize(size);
                            }
                            this._readStream.pos = pos;
                        }
        
                        if(this._readStream.pos != this._readStream.size)
                        {
                            if(this._endpoint.datagram())
                            {
                                throw new Ice.DatagramLimitException(); // The message was truncated.
                            }
                            else
                            {
                                if(!this.read(this._readStream.buffer))
                                {
                                    Debug.assert(!this._readStream.isEmpty());
                                    this.scheduleTimeout(SocketOperation.Read, this._endpoint.timeout());
                                    return;
                                }
                                Debug.assert(this._readStream.buffer.remaining === 0);
                            }
                        }
                    }
        
                    if(this._state <= StateNotValidated)
                    {
                        if(this._state === StateNotInitialized && !this.initialize())
                        {
                            return;
                        }
        
                        if(this._state <= StateNotValidated && !this.validate())
                        {
                            return;
                        }
        
                        this._transceiver.unregister();
        
                        //
                        // We start out in holding state.
                        //
                        this.setState(StateHolding);
                        if(this._startPromise !== null)
                        {
                            ++this._dispatchCount;
                        }
                    }
                    else
                    {
                        Debug.assert(this._state <= StateClosing);
        
                        //
                        // We parse messages first, if we receive a close
                        // connection message we won't send more messages.
                        //
                        if((operation & SocketOperation.Read) !== 0)
                        {
                            info = this.parseMessage();
                        }
        
                        if((operation & SocketOperation.Write) !== 0)
                        {
                            this.sendNextMessage();
                        }
                    }
                }
                catch(ex)
                {
                    if(ex instanceof Ice.DatagramLimitException) // Expected.
                    {
                        if(this._warnUdp)
                        {
                            this._logger.warning("maximum datagram size of " + this._readStream.pos + " exceeded");
                        }
                        this._readStream.resize(Protocol.headerSize);
                        this._readStream.pos = 0;
                        this._readHeader = true;
                        return;
                    }
                    else if(ex instanceof Ice.SocketException)
                    {
                        this.setState(StateClosed, ex);
                        return;
                    }
                    else if(ex instanceof Ice.LocalException)
                    {
                        if(this._endpoint.datagram())
                        {
                            if(this._warn)
                            {
                                this._logger.warning("datagram connection exception:\n" + ex + '\n' + this._desc);
                            }
                            this._readStream.resize(Protocol.headerSize);
                            this._readStream.pos = 0;
                            this._readHeader = true;
                        }
                        else
                        {
                            this.setState(StateClosed, ex);
                        }
                        return;
                    }
                    else
                    {
                        throw ex;
                    }
                }
        
                if(this._acmLastActivity > 0)
                {
                    this._acmLastActivity = Date.now();
                }
        
                this.dispatch(info);
        
                if(this._hasMoreData.value)
                {
                    var self = this;
                    Timer.setImmediate(function() { self.message(SocketOperation.Read); }); // Don't tie up the thread.
                }
            },
            dispatch: function(info)
            {
                var count = 0;
                //
                // Notify the factory that the connection establishment and
                // validation has completed.
                //
                if(this._startPromise !== null)
                {
                    this._startPromise.succeed();
                    this._startPromise = null;
                    ++count;
                }
        
                if(info !== null)
                {
                    if(info.outAsync !== null)
                    {
                        info.outAsync.__completed(info.stream);
                        ++count;
                    }
        
                    if(info.invokeNum > 0)
                    {
                        this.invokeAll(info.stream, info.invokeNum, info.requestId, info.compress, info.servantManager,
                                    info.adapter);
        
                        //
                        // Don't increase count, the dispatch count is
                        // decreased when the incoming reply is sent.
                        //
                    }
        
                    if(info.heartbeatCallback)
                    {
                        try
                        {
                            info.heartbeatCallback.heartbeat(this);
                        }
                        catch(ex)
                        {
                            this._logger.error("connection callback exception:\n" + ex + '\n' + this._desc);
                        }
                        info.heartbeatCallback = null;
                        ++count;
                    }
                }
        
                //
                // Decrease dispatch count.
                //
                if(count > 0)
                {
                    this._dispatchCount -= count;
                    if(this._dispatchCount === 0)
                    {
                        if(this._state === StateClosing && !this._shutdownInitiated)
                        {
                            try
                            {
                                this.initiateShutdown();
                            }
                            catch(ex)
                            {
                                if(ex instanceof Ice.LocalException)
                                {
                                    this.setState(StateClosed, ex);
                                }
                                else
                                {
                                    throw ex;
                                }
                            }
                        }
                        else if(this._state === StateFinished)
                        {
                            this.reap();
                        }
                        this.checkState();
                    }
                }
            },
            finish: function()
            {
                Debug.assert(this._state === StateClosed);
                this.unscheduleTimeout(SocketOperation.Read | SocketOperation.Write | SocketOperation.Connect);
        
                var s;
                var traceLevels = this._instance.traceLevels();
                if(!this._initialized)
                {
                    if(traceLevels.network >= 2)
                    {
                        s = [];
                        s.push("failed to establish ");
                        s.push(this._endpoint.protocol());
                        s.push(" connection\n");
                        s.push(this.toString());
                        s.push("\n");
                        s.push(this._exception.toString());
                        this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                    }
                }
                else
                {
                    if(traceLevels.network >= 1)
                    {
                        s = [];
                        s.push("closed ");
                        s.push(this._endpoint.protocol());
                        s.push(" connection\n");
                        s.push(this.toString());
        
                        //
                        // Trace the cause of unexpected connection closures
                        //
                        if(!(this._exception instanceof Ice.CloseConnectionException ||
                             this._exception instanceof Ice.ForcedCloseConnectionException ||
                             this._exception instanceof Ice.ConnectionTimeoutException ||
                             this._exception instanceof Ice.CommunicatorDestroyedException ||
                             this._exception instanceof Ice.ObjectAdapterDeactivatedException))
                        {
                            s.push("\n");
                            s.push(this._exception.toString());
                        }
        
                        this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                    }
                }
        
                if(this._startPromise !== null)
                {
                    this._startPromise.fail(this._exception);
                    this._startPromise = null;
                }
        
                if(this._sendStreams.length > 0)
                {
                    if(!this._writeStream.isEmpty())
                    {
                        //
                        // Return the stream to the outgoing call. This is important for
                        // retriable AMI calls which are not marshalled again.
                        //
                        var message = this._sendStreams[0];
                        this._writeStream.swap(message.stream);
                    }
        
                    //
                    // NOTE: for twoway requests which are not sent, finished can be called twice: the
                    // first time because the outgoing is in the _sendStreams set and the second time
                    // because it's either in the _requests/_asyncRequests set. This is fine, only the
                    // first call should be taken into account by the implementation of finished.
                    //
                    for(var i = 0; i < this._sendStreams.length; ++i)
                    {
                        var p = this._sendStreams[i];
                        if(p.requestId > 0)
                        {
                            this._asyncRequests.delete(p.requestId);
                        }
                        p.completed(this._exception);
                    }
                    this._sendStreams = [];
                }
        
                for(var e = this._asyncRequests.entries; e !== null; e = e.next)
                {
                    e.value.__completedEx(this._exception);
                }
                this._asyncRequests.clear();
        
                if(this._callback !== null)
                {
                    try
                    {
                        this._callback.closed(this);
                    }
                    catch(ex)
                    {
                        this._logger.error("connection callback exception:\n" + ex + '\n' + this._desc);
                    }
                    this._callback = null;
                }
        
                //
                // This must be done last as this will cause waitUntilFinished() to return (and communicator
                // objects such as the timer might be destroyed too).
                //
                if(this._dispatchCount === 0)
                {
                    this.reap();
                }
                this.setState(StateFinished);
            },
            toString: function()
            {
                return this._desc;
            },
            timedOut: function(event)
            {
                if(this._state <= StateNotValidated)
                {
                    this.setState(StateClosed, new Ice.ConnectTimeoutException());
                }
                else if(this._state < StateClosing)
                {
                    this.setState(StateClosed, new Ice.TimeoutException());
                }
                else if(this._state === StateClosing)
                {
                    this.setState(StateClosed, new Ice.CloseTimeoutException());
                }
            },
            type: function()
            {
                return this._type;
            },
            timeout: function()
            {
                return this._endpoint.timeout();
            },
            getInfo: function()
            {
                if(this._state >= StateClosed)
                {
                    throw this._exception;
                }
                var info = this._transceiver.getInfo();
                info.adapterName = this._adapter !== null ? this._adapter.getName() : "";
                info.incoming = this._incoming;
                return info;
            },
            setBufferSize: function(rcvSize, sndSize)
            {
                if(this._state >= StateClosed)
                {
                    throw this._exception;
                }
                this._transceiver.setBufferSize(rcvSize, sndSize);
            },
            exception: function(ex)
            {
                this.setState(StateClosed, ex);
            },
            invokeException: function(ex, invokeNum)
            {
                //
                // Fatal exception while invoking a request. Since sendResponse/sendNoResponse isn't
                // called in case of a fatal exception we decrement this._dispatchCount here.
                //
        
                this.setState(StateClosed, ex);
        
                if(invokeNum > 0)
                {
                    Debug.assert(this._dispatchCount > 0);
                    this._dispatchCount -= invokeNum;
                    Debug.assert(this._dispatchCount >= 0);
                    if(this._dispatchCount === 0)
                    {
                        if(this._state === StateFinished)
                        {
                            this.reap();
                        }
                        this.checkState();
                    }
                }
            },
            setState: function(state, ex)
            {
                if(ex !== undefined)
                {
                    Debug.assert(ex instanceof Ice.LocalException);
        
                    //
                    // If setState() is called with an exception, then only closed
                    // and closing states are permissible.
                    //
                    Debug.assert(state >= StateClosing);
        
                    if(this._state === state) // Don't switch twice.
                    {
                        return;
                    }
        
                    if(this._exception === null)
                    {
                        this._exception = ex;
        
                        //
                        // We don't warn if we are not validated.
                        //
                        if(this._warn && this._validated)
                        {
                            //
                            // Don't warn about certain expected exceptions.
                            //
                            if(!(this._exception instanceof Ice.CloseConnectionException ||
                                 this._exception instanceof Ice.ForcedCloseConnectionException ||
                                 this._exception instanceof Ice.ConnectionTimeoutException ||
                                 this._exception instanceof Ice.CommunicatorDestroyedException ||
                                 this._exception instanceof Ice.ObjectAdapterDeactivatedException ||
                                 (this._exception instanceof Ice.ConnectionLostException && this._state === StateClosing)))
                            {
                                this.warning("connection exception", this._exception);
                            }
                        }
                    }
        
                    //
                    // We must set the new state before we notify requests of any
                    // exceptions. Otherwise new requests may retry on a
                    // connection that is not yet marked as closed or closing.
                    //
                }
        
                //
                // We don't want to send close connection messages if the endpoint
                // only supports oneway transmission from client to server.
                //
                if(this._endpoint.datagram() && state === StateClosing)
                {
                    state = StateClosed;
                }
        
                //
                // Skip graceful shutdown if we are destroyed before validation.
                //
                if(this._state <= StateNotValidated && state === StateClosing)
                {
                    state = StateClosed;
                }
        
                if(this._state === state) // Don't switch twice.
                {
                    return;
                }
        
                try
                {
                    switch(state)
                    {
                    case StateNotInitialized:
                    {
                        Debug.assert(false);
                        break;
                    }
        
                    case StateNotValidated:
                    {
                        if(this._state !== StateNotInitialized)
                        {
                            Debug.assert(this._state === StateClosed);
                            return;
                        }
                        //
                        // Register to receive validation message.
                        //
                        if(!this._endpoint.datagram() && !this._incoming)
                        {
                            //
                            // Once validation is complete, a new connection starts out in the
                            // Holding state. We only want to register the transceiver now if we
                            // need to receive data in order to validate the connection.
                            //
                            this._transceiver.register();
                        }
                        break;
                    }
        
                    case StateActive:
                    {
                        //
                        // Can only switch from holding or not validated to
                        // active.
                        //
                        if(this._state !== StateHolding && this._state !== StateNotValidated)
                        {
                            return;
                        }
                        this._transceiver.register();
                        break;
                    }
        
                    case StateHolding:
                    {
                        //
                        // Can only switch from active or not validated to
                        // holding.
                        //
                        if(this._state !== StateActive && this._state !== StateNotValidated)
                        {
                            return;
                        }
                        if(this._state === StateActive)
                        {
                            this._transceiver.unregister();
                        }
                        break;
                    }
        
                    case StateClosing:
                    {
                        //
                        // Can't change back from closed.
                        //
                        if(this._state >= StateClosed)
                        {
                            return;
                        }
                        if(this._state === StateHolding)
                        {
                            // We need to continue to read in closing state.
                            this._transceiver.register();
                        }
                        break;
                    }
        
                    case StateClosed:
                    {
                        if(this._state === StateFinished)
                        {
                            return;
                        }
                        this._batchRequestQueue.destroy(this._exception);
                        this._transceiver.unregister();
                        break;
                    }
        
                    case StateFinished:
                    {
                        Debug.assert(this._state === StateClosed);
                        this._transceiver.close();
                        this._communicator = null;
                        break;
                    }
                    }
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        var msg = "unexpected connection exception:\n " + this._desc + "\n" + ex.toString();
                        this._instance.initializationData().logger.error(msg);
                    }
                    else
                    {
                        throw ex;
                    }
                }
        
                //
                // We only register with the connection monitor if our new state
                // is StateActive. Otherwise we unregister with the connection
                // monitor, but only if we were registered before, i.e., if our
                // old state was StateActive.
                //
                if(this._monitor !== null)
                {
                    if(state === StateActive)
                    {
                        this._monitor.add(this);
                        if(this._acmLastActivity > 0)
                        {
                            this._acmLastActivity = Date.now();
                        }
                    }
                    else if(this._state === StateActive)
                    {
                        this._monitor.remove(this);
                    }
                }
        
                this._state = state;
        
                if(this._state === StateClosing && this._dispatchCount === 0)
                {
                    try
                    {
                        this.initiateShutdown();
                    }
                    catch(ex)
                    {
                        if(ex instanceof Ice.LocalException)
                        {
                            this.setState(StateClosed, ex);
                        }
                        else
                        {
                            throw ex;
                        }
                    }
                }
                else if(this._state === StateClosed)
                {
                    this.finish();
                }
        
                this.checkState();
            },
            initiateShutdown: function()
            {
                Debug.assert(this._state === StateClosing);
                Debug.assert(this._dispatchCount === 0);
                Debug.assert(!this._shutdownInitiated);
        
                if(!this._endpoint.datagram())
                {
                    //
                    // Before we shut down, we send a close connection
                    // message.
                    //
                    var os = new BasicStream(this._instance, Protocol.currentProtocolEncoding);
                    os.writeBlob(Protocol.magic);
                    Protocol.currentProtocol.__write(os);
                    Protocol.currentProtocolEncoding.__write(os);
                    os.writeByte(Protocol.closeConnectionMsg);
                    os.writeByte(0); // compression status: always report 0 for CloseConnection.
                    os.writeInt(Protocol.headerSize); // Message size.
        
                    var status = this.sendMessage(OutgoingMessage.createForStream(os, false, false));
                    if((status & AsyncStatus.Sent) > 0)
                    {
                        //
                        // Schedule the close timeout to wait for the peer to close the connection.
                        //
                        this.scheduleTimeout(SocketOperation.Write, this.closeTimeout());
                    }
        
                    //
                    // The CloseConnection message should be sufficient. Closing the write
                    // end of the socket is probably an artifact of how things were done
                    // in IIOP. In fact, shutting down the write end of the socket causes
                    // problems on Windows by preventing the peer from using the socket.
                    // For example, the peer is no longer able to continue writing a large
                    // message after the socket is shutdown.
                    //
                    //this._transceiver.shutdownWrite();
                }
            },
            heartbeat: function()
            {
                Debug.assert(this._state === StateActive);
        
                if(!this._endpoint.datagram())
                {
                    var os = new BasicStream(this._instance, Protocol.currentProtocolEncoding);
                    os.writeBlob(Protocol.magic);
                    Protocol.currentProtocol.__write(os);
                    Protocol.currentProtocolEncoding.__write(os);
                    os.writeByte(Protocol.validateConnectionMsg);
                    os.writeByte(0);
                    os.writeInt(Protocol.headerSize); // Message size.
                    try
                    {
                        this.sendMessage(OutgoingMessage.createForStream(os, false, false));
                    }
                    catch(ex)
                    {
                        this.setState(StateClosed, ex);
                        Debug.assert(this._exception !== null);
                    }
                }
            },
            initialize: function()
            {
                var s = this._transceiver.initialize(this._readStream.buffer, this._writeStream.buffer);
                if(s != SocketOperation.None)
                {
                    this.scheduleTimeout(s, this.connectTimeout());
                    return false;
                }
        
                //
                // Update the connection description once the transceiver is initialized.
                //
                this._desc = this._transceiver.toString();
                this._initialized = true;
                this.setState(StateNotValidated);
                return true;
            },
            validate: function()
            {
                if(!this._endpoint.datagram()) // Datagram connections are always implicitly validated.
                {
                    if(this._adapter !== null) // The server side has the active role for connection validation.
                    {
                        if(this._writeStream.size === 0)
                        {
                            this._writeStream.writeBlob(Protocol.magic);
                            Protocol.currentProtocol.__write(this._writeStream);
                            Protocol.currentProtocolEncoding.__write(this._writeStream);
                            this._writeStream.writeByte(Protocol.validateConnectionMsg);
                            this._writeStream.writeByte(0); // Compression status (always zero for validate connection).
                            this._writeStream.writeInt(Protocol.headerSize); // Message size.
                            TraceUtil.traceSend(this._writeStream, this._logger, this._traceLevels);
                            this._writeStream.prepareWrite();
                        }
        
                        if(this._writeStream.pos != this._writeStream.size && !this.write(this._writeStream.buffer))
                        {
                            this.scheduleTimeout(SocketOperation.Write, this.connectTimeout());
                            return false;
                        }
                    }
                    else // The client side has the passive role for connection validation.
                    {
                        if(this._readStream.size === 0)
                        {
                            this._readStream.resize(Protocol.headerSize);
                            this._readStream.pos = 0;
                        }
        
                        if(this._readStream.pos !== this._readStream.size &&
                            !this.read(this._readStream.buffer))
                        {
                            this.scheduleTimeout(SocketOperation.Read, this.connectTimeout());
                            return false;
                        }
        
                        Debug.assert(this._readStream.pos === Protocol.headerSize);
                        this._readStream.pos = 0;
                        var m = this._readStream.readBlob(4);
                        if(m[0] !== Protocol.magic[0] || m[1] !== Protocol.magic[1] ||
                            m[2] !== Protocol.magic[2] || m[3] !== Protocol.magic[3])
                        {
                            var bme = new Ice.BadMagicException();
                            bme.badMagic = m;
                            throw bme;
                        }
        
                        this._readProtocol.__read(this._readStream);
                        Protocol.checkSupportedProtocol(this._readProtocol);
        
                        this._readProtocolEncoding.__read(this._readStream);
                        Protocol.checkSupportedProtocolEncoding(this._readProtocolEncoding);
        
                        var messageType = this._readStream.readByte();
                        if(messageType !== Protocol.validateConnectionMsg)
                        {
                            throw new Ice.ConnectionNotValidatedException();
                        }
                        this._readStream.readByte(); // Ignore compression status for validate connection.
                        var size = this._readStream.readInt();
                        if(size !== Protocol.headerSize)
                        {
                            throw new Ice.IllegalMessageSizeException();
                        }
                        TraceUtil.traceRecv(this._readStream, this._logger, this._traceLevels);
                        this._validated = true;
                    }
                }
        
                this._writeStream.resize(0);
                this._writeStream.pos = 0;
        
                this._readStream.resize(Protocol.headerSize);
                this._readHeader = true;
                this._readStream.pos = 0;
        
                var traceLevels = this._instance.traceLevels();
                if(traceLevels.network >= 1)
                {
                    var s = [];
                    if(this._endpoint.datagram())
                    {
                        s.push("starting to send ");
                        s.push(this._endpoint.protocol());
                        s.push(" messages\n");
                        s.push(this._transceiver.toDetailedString());
                    }
                    else
                    {
                        s = [];
                        s.push("established ");
                        s.push(this._endpoint.protocol());
                        s.push(" connection\n");
                        s.push(this.toString());
                    }
                    this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                }
        
                return true;
            },
            sendNextMessage: function()
            {
                if(this._sendStreams.length === 0)
                {
                    return;
                }
        
                Debug.assert(!this._writeStream.isEmpty() && this._writeStream.pos === this._writeStream.size);
                try
                {
                    while(true)
                    {
                        //
                        // Notify the message that it was sent.
                        //
                        var message = this._sendStreams.shift();
                        this._writeStream.swap(message.stream);
                        message.sent();
        
                        //
                        // If there's nothing left to send, we're done.
                        //
                        if(this._sendStreams.length === 0)
                        {
                            break;
                        }
        
                        //
                        // If we are in the closed state, don't continue sending.
                        //
                        // The connection can be in the closed state if parseMessage
                        // (called before sendNextMessage by message()) closes the
                        // connection.
                        //
                        if(this._state >= StateClosed)
                        {
                            return;
                        }
        
                        //
                        // Otherwise, prepare the next message stream for writing.
                        //
                        message = this._sendStreams[0];
                        Debug.assert(!message.prepared);
                        var stream = message.stream;
        
                        stream.pos = 10;
                        stream.writeInt(stream.size);
                        stream.prepareWrite();
                        message.prepared = true;
        
                        if(message.outAsync !== null)
                        {
                            TraceUtil.trace("sending asynchronous request", stream, this._logger, this._traceLevels);
                        }
                        else
                        {
                            TraceUtil.traceSend(stream, this._logger, this._traceLevels);
                        }
                        this._writeStream.swap(message.stream);
        
                        //
                        // Send the message.
                        //
                        if(this._writeStream.pos != this._writeStream.size && !this.write(this._writeStream.buffer))
                        {
                            Debug.assert(!this._writeStream.isEmpty());
                            this.scheduleTimeout(SocketOperation.Write, this._endpoint.timeout());
                            return;
                        }
                    }
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        this.setState(StateClosed, ex);
                        return;
                    }
                    else
                    {
                        throw ex;
                    }
                }
        
                Debug.assert(this._writeStream.isEmpty());
        
                //
                // If all the messages were sent and we are in the closing state, we schedule
                // the close timeout to wait for the peer to close the connection.
                //
                if(this._state === StateClosing)
                {
                    this.scheduleTimeout(SocketOperation.Write, this.closeTimeout());
                }
            },
            sendMessage: function(message)
            {
                if(this._sendStreams.length > 0)
                {
                    message.doAdopt();
                    this._sendStreams.push(message);
                    return AsyncStatus.Queued;
                }
                Debug.assert(this._state < StateClosed);
        
                Debug.assert(!message.prepared);
        
                var stream = message.stream;
                stream.pos = 10;
                stream.writeInt(stream.size);
                stream.prepareWrite();
                message.prepared = true;
        
                if(message.outAsync)
                {
                    TraceUtil.trace("sending asynchronous request", message.stream, this._logger, this._traceLevels);
                }
                else
                {
                    TraceUtil.traceSend(message.stream, this._logger, this._traceLevels);
                }
        
                if(this.write(message.stream.buffer))
                {
                    //
                    // Entire buffer was written immediately.
                    //
                    message.sent();
        
                    if(this._acmLastActivity > 0)
                    {
                        this._acmLastActivity = Date.now();
                    }
                    return AsyncStatus.Sent;
                }
                message.doAdopt();
        
                this._writeStream.swap(message.stream);
                this._sendStreams.push(message);
                this.scheduleTimeout(SocketOperation.Write, this._endpoint.timeout());
        
                return AsyncStatus.Queued;
            },
            parseMessage: function()
            {
                Debug.assert(this._state > StateNotValidated && this._state < StateClosed);
        
                var info = new MessageInfo(this._instance);
        
                this._readStream.swap(info.stream);
                this._readStream.resize(Protocol.headerSize);
                this._readStream.pos = 0;
                this._readHeader = true;
        
                //
                // Connection is validated on first message. This is only used by
                // setState() to check wether or not we can print a connection
                // warning (a client might close the connection forcefully if the
                // connection isn't validated).
                //
                this._validated = true;
        
                Debug.assert(info.stream.pos === info.stream.size);
        
                try
                {
                    //
                    // We don't need to check magic and version here. This has already
                    // been done by the caller.
                    //
                    info.stream.pos = 8;
                    var messageType = info.stream.readByte();
                    info.compress = info.stream.readByte();
                    if(info.compress === 2)
                    {
                        var ex = new Ice.FeatureNotSupportedException();
                        ex.unsupportedFeature = "Cannot uncompress compressed message";
                        throw ex;
                    }
                    info.stream.pos = Protocol.headerSize;
        
                    switch(messageType)
                    {
                        case Protocol.closeConnectionMsg:
                        {
                            TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);
                            if(this._endpoint.datagram())
                            {
                                if(this._warn)
                                {
                                    this._logger.warning("ignoring close connection message for datagram connection:\n" +
                                                        this._desc);
                                }
                            }
                            else
                            {
                                this.setState(StateClosed, new Ice.CloseConnectionException());
                            }
                            break;
                        }
        
                        case Protocol.requestMsg:
                        {
                            if(this._state === StateClosing)
                            {
                                TraceUtil.trace("received request during closing\n" +
                                                "(ignored by server, client will retry)",
                                                info.stream, this._logger, this._traceLevels);
                            }
                            else
                            {
                                TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);
                                info.requestId = info.stream.readInt();
                                info.invokeNum = 1;
                                info.servantManager = this._servantManager;
                                info.adapter = this._adapter;
                                ++this._dispatchCount;
                            }
                            break;
                        }
        
                        case Protocol.requestBatchMsg:
                        {
                            if(this._state === StateClosing)
                            {
                                TraceUtil.trace("received batch request during closing\n" +
                                                "(ignored by server, client will retry)",
                                                info.stream, this._logger, this._traceLevels);
                            }
                            else
                            {
                                TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);
                                info.invokeNum = info.stream.readInt();
                                if(info.invokeNum < 0)
                                {
                                    info.invokeNum = 0;
                                    throw new Ice.UnmarshalOutOfBoundsException();
                                }
                                info.servantManager = this._servantManager;
                                info.adapter = this._adapter;
                                this._dispatchCount += info.invokeNum;
                            }
                            break;
                        }
        
                        case Protocol.replyMsg:
                        {
                            TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);
                            info.requestId = info.stream.readInt();
                            info.outAsync = this._asyncRequests.get(info.requestId);
                            if(info.outAsync)
                            {
                                this._asyncRequests.delete(info.requestId);
                                ++this._dispatchCount;
                            }
                            else
                            {
                                info = null;
                            }
                            this.checkClose();
                            break;
                        }
        
                        case Protocol.validateConnectionMsg:
                        {
                            TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);
                            if(this._callback !== null)
                            {
                                info.heartbeatCallback = this._callback;
                                ++this._dispatchCount;
                            }
                            break;
                        }
        
                        default:
                        {
                            TraceUtil.trace("received unknown message\n(invalid, closing connection)",
                                            info.stream, this._logger, this._traceLevels);
                            throw new Ice.UnknownMessageException();
                        }
                    }
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        if(this._endpoint.datagram())
                        {
                            if(this._warn)
                            {
                                this._logger.warning("datagram connection exception:\n" + ex + '\n' + this._desc);
                            }
                        }
                        else
                        {
                            this.setState(StateClosed, ex);
                        }
                    }
                    else
                    {
                        throw ex;
                    }
                }
        
                return info;
            },
            invokeAll: function(stream, invokeNum, requestId, compress, servantManager, adapter)
            {
                var inc = null;
                try
                {
                    while(invokeNum > 0)
                    {
                        //
                        // Prepare the invocation.
                        //
                        var response = !this._endpoint.datagram() && requestId !== 0;
                        inc = new IncomingAsync(this._instance, this, adapter, response, compress, requestId);
        
                        //
                        // Dispatch the invocation.
                        //
                        inc.invoke(servantManager, stream);
        
                        --invokeNum;
                        inc = null;
                    }
        
                    stream.clear();
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        this.invokeException(ex, invokeNum);
                    }
                    else
                    {
                        throw ex;
                    }
                }
            },
            scheduleTimeout: function(op, timeout)
            {
                if(timeout < 0)
                {
                    return;
                }
        
                var self = this;
                if((op & SocketOperation.Read) !== 0)
                {
                    this._readTimeoutId = this._timer.schedule(function() { self.timedOut(); }, timeout);
                    this._readTimeoutScheduled = true;
                }
                if((op & (SocketOperation.Write | SocketOperation.Connect)) !== 0)
                {
                    this._writeTimeoutId = this._timer.schedule(function() { self.timedOut(); }, timeout);
                    this._writeTimeoutScheduled = true;
                }
            },
            unscheduleTimeout: function(op)
            {
                if((op & SocketOperation.Read) !== 0 && this._readTimeoutScheduled)
                {
                    this._timer.cancel(this._readTimeoutId);
                    this._readTimeoutScheduled = false;
                }
                if((op & (SocketOperation.Write | SocketOperation.Connect)) !== 0 && this._writeTimeoutScheduled)
                {
                    this._timer.cancel(this._writeTimeoutId);
                    this._writeTimeoutScheduled = false;
                }
            },
            connectTimeout: function()
            {
                var defaultsAndOverrides = this._instance.defaultsAndOverrides();
                if(defaultsAndOverrides.overrideConnectTimeout)
                {
                    return defaultsAndOverrides.overrideConnectTimeoutValue;
                }
                else
                {
                    return this._endpoint.timeout();
                }
            },
            closeTimeout: function()
            {
                var defaultsAndOverrides = this._instance.defaultsAndOverrides();
                if(defaultsAndOverrides.overrideCloseTimeout)
                {
                    return defaultsAndOverrides.overrideCloseTimeoutValue;
                }
                else
                {
                    return this._endpoint.timeout();
                }
            },
            warning: function(msg, ex)
            {
                this._logger.warning(msg + ":\n" + this._desc + "\n" + ex.toString());
            },
            checkState: function()
            {
                if(this._state < StateHolding || this._dispatchCount > 0)
                {
                    return;
                }
        
                var i;
                if(this._holdPromises.length > 0)
                {
                    for(i = 0; i < this._holdPromises.length; ++i)
                    {
                        this._holdPromises[i].succeed();
                    }
                    this._holdPromises = [];
                }
        
                //
                // We aren't finished until the state is finished and all
                // outstanding requests are completed. Otherwise we couldn't
                // guarantee that there are no outstanding calls when deactivate()
                // is called on the servant locators.
                //
                if(this._state === StateFinished && this._finishedPromises.length > 0)
                {
                    //
                    // Clear the OA. See bug 1673 for the details of why this is necessary.
                    //
                    this._adapter = null;
        
                    for(i = 0; i < this._finishedPromises.length; ++i)
                    {
                        this._finishedPromises[i].succeed();
                    }
                    this._finishedPromises = [];
                }
            },
            reap: function()
            {
                if(this._monitor !== null)
                {
                    this._monitor.reap(this);
                }
            },
            read: function(buf)
            {
                var start = buf.position;
                var ret = this._transceiver.read(buf, this._hasMoreData);
                if(this._instance.traceLevels().network >= 3 && buf.position != start)
                {
                    var s = [];
                    s.push("received ");
                    if(this._endpoint.datagram())
                    {
                        s.push(buf.limit);
                    }
                    else
                    {
                        s.push(buf.position - start);
                        s.push(" of ");
                        s.push(buf.limit - start);
                    }
                    s.push(" bytes via ");
                    s.push(this._endpoint.protocol());
                    s.push("\n");
                    s.push(this.toString());
                    this._instance.initializationData().logger.trace(this._instance.traceLevels().networkCat, s.join(""));
                }
                return ret;
            },
            write: function(buf)
            {
                var start = buf.position;
                var ret = this._transceiver.write(buf);
                if(this._instance.traceLevels().network >= 3 && buf.position != start)
                {
                    var s = [];
                    s.push("sent ");
                    s.push(buf.position - start);
                    if(!this._endpoint.datagram())
                    {
                        s.push(" of ");
                        s.push(buf.limit - start);
                    }
                    s.push(" bytes via ");
                    s.push(this._endpoint.protocol());
                    s.push("\n");
                    s.push(this.toString());
                    this._instance.initializationData().logger.trace(this._instance.traceLevels().networkCat, s.join(""));
                }
                return ret;
            }
        });
        
        // DestructionReason.
        ConnectionI.ObjectAdapterDeactivated = 0;
        ConnectionI.CommunicatorDestroyed = 1;
        
        Ice.ConnectionI = ConnectionI;
        
        var OutgoingMessage = Class({
            __init__: function()
            {
                this.stream = null;
                this.outAsync = null;
                this.compress = false;
                this.requestId = 0;
                this.prepared = false;
            },
            canceled: function()
            {
                Debug.assert(this.outAsync !== null);
                this.outAsync = null;
            },
            doAdopt: function()
            {
                if(this.adopt)
                {
                    var stream = new BasicStream(this.stream.instance, Protocol.currentProtocolEncoding);
                    stream.swap(this.stream);
                    this.stream = stream;
                    this.adopt = false;
                }
            },
            sent: function()
            {
                if(this.outAsync !== null)
                {
                    this.outAsync.__sent();
                }
            },
            completed: function(ex)
            {
                if(this.outAsync !== null)
                {
                    this.outAsync.__completedEx(ex);
                }
            }
        });
        
        OutgoingMessage.createForStream = function(stream, compress, adopt)
        {
            var m = new OutgoingMessage();
            m.stream = stream;
            m.compress = compress;
            m.adopt = adopt;
            m.isSent = false;
            m.requestId = 0;
            m.outAsync = null;
            return m;
        };
        
        OutgoingMessage.create = function(out, stream, compress, requestId)
        {
            var m = new OutgoingMessage();
            m.stream = stream;
            m.compress = compress;
            m.outAsync = out;
            m.requestId = requestId;
            m.isSent = false;
            m.adopt = false;
            return m;
        };
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var IceSSL = Ice.__M.module("IceSSL");
        
        var HashUtil = Ice.HashUtil;
        var StringUtil = Ice.StringUtil;
        var EndpointI = Ice.EndpointI;
        var Class = Ice.Class;
        
        var WSEndpoint = Class(EndpointI, {
            __init__: function(instance, del, re)
            {
                this._instance = instance;
                this._delegate = del;
                this._resource = re || "/";
            },
            getInfo: function()
            {
                var info = this._delegate.secure() ? new IceSSL.WSSEndpointInfo() : new Ice.WSEndpointInfo();
                info.resource = this._resource;
                this._delegate.fillEndpointInfo(info);
                return info;
            },
            type: function()
            {
                return this._delegate.type();
            },
            protocol: function()
            {
                return this._delegate.protocol();
            },
            streamWrite: function(s)
            {
                s.startWriteEncaps();
                this._delegate.streamWriteImpl(s);
                s.writeString(this._resource);
                s.endWriteEncaps();
            },
            timeout: function()
            {
                return this._delegate.timeout();
            },
            changeTimeout: function(timeout)
            {
                if(timeout === this._delegate.timeout())
                {
                    return this;
                }
                else
                {
                    return new WSEndpoint(this._instance, this._delegate.changeTimeout(timeout), this._resource);
                }
            },
            changeConnectionId: function(connectionId)
            {
                if(connectionId === this._delegate.connectionId())
                {
                    return this;
                }
                else
                {
                    return new WSEndpoint(this._instance, this._delegate.changeConnectionId(connectionId), this._resource);
                }
            },
            compress: function()
            {
                return this._delegate.compress();
            },
            changeCompress: function(compress)
            {
                if(compress === this._delegate.compress())
                {
                    return this;
                }
                else
                {
                    return new WSEndpoint(this._instance, this._delegate.changeCompress(compress), this._resource);
                }
            },
            datagram: function()
            {
                return this._delegate.datagram();
            },
            secure: function()
            {
                return this._delegate.secure();
            },
            connect: function()
            {
                return Ice.WSTransceiver.createOutgoing(this._instance,
                                                        this._delegate.secure(),
                                                        this._delegate.getAddress(),
                                                        this._resource);
            },
            hashCode: function()
            {
                if(this._hashCode === undefined)
                {
                    this._hashCode = this._delegate.hashCode();
                    this._hashCode = HashUtil.addString(this._hashCode, this._resource);
                }
                return this._hashCode;
            },
            compareTo: function(p)
            {
                if(this === p)
                {
                    return 0;
                }
        
                if(p === null)
                {
                    return 1;
                }
        
                if(!(p instanceof WSEndpoint))
                {
                    return this.type() < p.type() ? -1 : 1;
                }
        
                var r = this._delegate.compareTo(p._delegate);
                if(r !== 0)
                {
                    return r;
                }
        
                if(this._resource !== p._resource)
                {
                    return this._resource < p._resource ? -1 : 1;
                }
        
                return 0;
            },
            options: function()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                var s = this._delegate.options();
        
                if(this._resource !== null && this._resource.length > 0)
                {
                    s += " -r ";
                    s += (this._resource.indexOf(':') !== -1) ? ("\"" + this._resource + "\"") : this._resource;
                }
        
                return s;
            },
            toConnectorString: function()
            {
                return this._delegate.toConnectorString();
            },
            initWithStream: function(s)
            {
                this._resource = s.readString();
            },
            checkOption: function(option, argument, endpoint)
            {
                if(option === "-r")
                {
                    if(argument === null)
                    {
                        throw new Ice.EndpointParseException("no argument provided for -r option in endpoint " + endpoint);
                    }
                    this._resource = argument;
                }
                else
                {
                    return false;
                }
                return true;
            },
        });
        
        if(typeof(Ice.WSTransceiver) !== "undefined")
        {
            WSEndpoint.prototype.connectable = function()
            {
                return true;
            };
        }
        else
        {
            WSEndpoint.prototype.connectable = function()
            {
                return false;
            };
        }
        
        Ice.WSEndpoint = WSEndpoint;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var HashMap = Ice.HashMap;
        var RouterInfo = Ice.RouterInfo;
        var RouterPrx = Ice.RouterPrx;
        
        var RouterManager = Ice.Class({
            __init__: function()
            {
                this._table = new HashMap(HashMap.compareEquals); // Map<Ice.RouterPrx, RouterInfo>
            },
            destroy: function()
            {
                for(var e = this._table.entries; e !== null; e = e.next)
                {
                    e.value.destroy();
                }
                this._table.clear();
            },
            //
            // Returns router info for a given router. Automatically creates
            // the router info if it doesn't exist yet.
            //
            find: function(rtr)
            {
                if(rtr === null)
                {
                    return null;
                }
        
                //
                // The router cannot be routed.
                //
                var router = RouterPrx.uncheckedCast(rtr.ice_router(null));
        
                var info = this._table.get(router);
                if(info === undefined)
                {
                    info = new RouterInfo(router);
                    this._table.set(router, info);
                }
        
                return info;
            },
            erase: function(rtr)
            {
                var info = null;
                if(rtr !== null)
                {
                    // The router cannot be routed.
                    var router = RouterPrx.uncheckedCast(rtr.ice_router(null));
        
                    info = this._table.get(router);
                    this._table.delete(router);
                }
                return info;
            }
        });
        Ice.RouterManager = RouterManager;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Class = Ice.Class;
        var Debug = Ice.Debug;
        
        var ACMConfig = Class({
            __init__: function(p, l, prefix, dflt)
            {
                if(p === undefined)
                {
                    this.timeout = 60 * 1000;
                    this.heartbeat = Ice.ACMHeartbeat.HeartbeatOnInvocation;
                    this.close = Ice.ACMClose.CloseOnInvocationAndIdle;
                    return;
                }
                
                var timeoutProperty;
                if((prefix == "Ice.ACM.Client" || prefix == "Ice.ACM.Server") &&
                    p.getProperty(prefix + ".Timeout").length === 0)
                {
                    timeoutProperty = prefix; // Deprecated property.
                }
                else
                {
                    timeoutProperty = prefix + ".Timeout";
                }
                
                this.timeout = p.getPropertyAsIntWithDefault(timeoutProperty, dflt.timeout / 1000) * 1000; // To ms
        
                var hb = p.getPropertyAsIntWithDefault(prefix + ".Heartbeat", dflt.heartbeat.value);
                if(hb >= 0 && hb <= Ice.ACMHeartbeat.maxValue)
                {
                    this.heartbeat = Ice.ACMHeartbeat.valueOf(hb);
                }
                else
                {
                    l.warning("invalid value for property `" + prefix + ".Heartbeat" + 
                                "', default value will be used instead");
                    this.heartbeat = dflt.heartbeat;
                }
        
                var cl = p.getPropertyAsIntWithDefault(prefix + ".Close", dflt.close.value);
                if(cl >= 0 && cl <= Ice.ACMClose.maxValue)
                {
                    this.close = Ice.ACMClose.valueOf(cl);
                }
                else
                {
                    l.warning("invalid value for property `" + prefix + ".Close" + 
                                "', default value will be used instead");
                    this.close = dflt.close;
                }
            }
        });
        
        var ACMMonitor = Class({
            add: function(con)
            {
                Debug.assert(false); // Absract
            },
            remove: function(con)
            {
                Debug.assert(false); // Absract
            },
            reap: function(con)
            {
                Debug.assert(false); // Absract
            },
            acm: function(timeout)
            {
                Debug.assert(false); // Absract
                return null;
            },
            getACM: function()
            {
                Debug.assert(false); // Absract
                return 0;
            }
        });
        
        var FactoryACMMonitor = Class(ACMMonitor, {
            __init__: function(instance, config)
            {
                this._instance = instance;
                this._config = config;
                this._reapedConnections = [];
                this._connections = [];
            },
            destroy: function()
            {
                if(this._instance === null)
                {
                    return;
                }
                this._instance = null;
                this._connections = null;
            },
            add: function(connection)
            {
                if(this._config.timeout === 0)
                {
                    return;
                }
        
                this._connections.push(connection);
                if(this._connections.length == 1)
                {
                    var self = this;
                    this._timerToken = this._instance.timer().scheduleRepeated(
                        function()
                            {
                                self.runTimerTask(); 
                            }, 
                        this._config.timeout / 2);
                }
            },
            remove: function(connection)
            {
                if(this._config.timeout === 0)
                {
                    return;
                }
                
                var i = this._connections.indexOf(connection);
                Debug.assert(i >= 0);
                this._connections.splice(i, 1);
                if(this._connections.length === 0)
                {
                    this._instance.timer().cancel(this._timerToken);
                    return;
                }
            },
            reap: function(connection)
            {
                this._reapedConnections.push(connection);
            },
            acm: function(timeout, close, heartbeat)
            {
                Debug.assert(this._instance !== null);
                
                var config = new ACMConfig();
                config.timeout = this._config.timeout;
                config.close = this._config.close;
                config.heartbeat = this._config.heartbeat;
                if(timeout !== undefined)
                {
                    config.timeout = timeout * 1000; // To milliseconds
                }
                if(close !== undefined)
                {
                    config.close = close;
                }
                if(heartbeat !== undefined)
                {
                    config.heartbeat = heartbeat;
                }
                return new ConnectionACMMonitor(this, this._instance.timer(), config);
            },
            getACM: function()
            {
                return new Ice.ACM(this._config.timeout / 1000, this._config.close, this._config.heartbeat);
            },
            swapReapedConnections: function()
            {
                if(this._reapedConnections.length === 0)
                {
                    return null;
                }
                var connections = this._reapedConnections;
                this._reapedConnections = [];
                return connections;
            },
            runTimerTask: function()
            {
                if(this._instance === null)
                {
                    return;
                }
                
                //
                // Monitor connections outside the thread synchronization, so
                // that connections can be added or removed during monitoring.
                //
                var now = Date.now();
                for(var i = 0; i < this._connections.length; i++)
                {
                    try
                    {          
                        this._connections[i].monitor(now, this._config);
                    }
                    catch(ex)
                    {   
                        this.handleException(ex);
                    }
                }
            },
            handleException: function(ex)
            {
                if(this._instance === null)
                {
                    return;
                }        
                this._instance.initializationData().logger.error("exception in connection monitor:\n" + ex);
            }
        });
        
        var ConnectionACMMonitor = Class(ACMMonitor, {
            __init__: function(parent, timer, config)
            {
                this._parent = parent;
                this._timer = timer;
                this._config = config;
                this._connection = null;
            },
            add: function(connection)
            {
                Debug.assert(this._connection === null);
                this._connection = connection;
                if(this._config.timeout > 0)
                {
                    var self = this;
                    this._timerToken = this._timer.scheduleRepeated(function() { self.runTimerTask(); },
                                                                    this._config.timeout / 2);
                }
            },
            remove: function(connection)
            {
                Debug.assert(this._connection === connection);
                this._connection = null;
                if(this._config.timeout > 0)
                {
                    this._timer.cancel(this._timerToken);
                }
            },
            reap: function(connection)
            {
                this._parent.reap(connection);
            },
            acm: function(timeout, close, heartbeat)
            {
                return this._parent.acm(timeout, close, heartbeat);
            },
            getACM: function()
            {
                return new Ice.ACM(this._config.timeout / 1000, this._config.close, this._config.heartbeat);
            },
            runTimerTask: function()
            {
                try
                {          
                    this.connection.monitor(Date.now(), this._config);
                }
                catch(ex)
                {   
                    this._parent.handleException(ex);
                }
            }
        });
        
        Ice.FactoryACMMonitor = FactoryACMMonitor;
        Ice.ACMConfig = ACMConfig;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Context = Ice.Context;
        var InitializationException = Ice.InitializationException;
        
        //
        // The base class for all ImplicitContext implementations
        //
        var ImplicitContextI = Ice.Class({
            __init__: function()
            {
                this._context = new Context();
            },
            getContext: function()
            {
                return new Context(this._context);
            },
            setContext: function(context)
            {
                if(context !== null && context.size > 0)
                {
                    this._context = new Context(context);
                }
                else
                {
                    this._context.clear();
                }
            },
            containsKey: function(key)
            {
                if(key === null)
                {
                    key = "";
                }
        
                return this._context.has(key);
            },
            get: function(key)
            {
                if(key === null)
                {
                    key = "";
                }
        
                var val = this._context.get(key);
                if(val === null)
                {
                    val = "";
                }
        
                return val;
            },
            put: function(key, value)
            {
                if(key === null)
                {
                    key = "";
                }
                if(value === null)
                {
                    value = "";
                }
        
                var oldVal = this._context.get(key);
                if(oldVal === null)
                {
                    oldVal = "";
                }
        
                this._context.set(key, value);
        
                return oldVal;
            },
            remove: function(key)
            {
                if(key === null)
                {
                    key = "";
                }
        
                var val = this._context.get(key);
                this._context.delete(key);
        
                if(val === null)
                {
                    val = "";
                }
                return val;
            },
            write: function(prxContext, os)
            {
                if(prxContext.size === 0)
                {
                    Ice.ContextHelper.write(os, this._context);
                }
                else
                {
                    var ctx = null;
                    if(this._context.size === 0)
                    {
                        ctx = prxContext;
                    }
                    else
                    {
                        ctx = new Context(this._context);
                        ctx.merge(prxContext);
                    }
                    Ice.ContextHelper.write(os, ctx);
                }
            }
        });
        
        ImplicitContextI.create = function(kind)
        {
            if(kind.length === 0 || kind === "None")
            {
                return null;
            }
            else if(kind === "Shared")
            {
                return new ImplicitContextI();
            }
            else
            {
                throw new InitializationException("'" + kind + "' is not a valid value for Ice.ImplicitContext");
            }
        };
        Ice.ImplicitContextI = ImplicitContextI;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var ArrayUtil = Ice.ArrayUtil;
        var Debug = Ice.Debug;
        var BatchRequestQueue = Ice.BatchRequestQueue;
        var HashMap = Ice.HashMap;
        var HashUtil = Ice.HashUtil;
        var OpaqueEndpointI = Ice.OpaqueEndpointI;
        var Promise = Ice.Promise;
        var Protocol = Ice.Protocol;
        var RefMode = Ice.ReferenceMode;
        var StringUtil = Ice.StringUtil;
        var StringSeqHelper = Ice.StringSeqHelper;
        var EndpointSelectionType = Ice.EndpointSelectionType;
        var Identity = Ice.Identity;
        var RouterPrx = Ice.RouterPrx;
        var LocatorPrx = Ice.LocatorPrx;
        var PropertyNames = Ice.PropertyNames;
        var ConnectionRequestHandler = Ice.ConnectionRequestHandler;
        
        var Class = Ice.Class;
        
        var suffixes =
        [
            "EndpointSelection",
            "ConnectionCached",
            "PreferSecure",
            "EncodingVersion",
            "LocatorCacheTimeout",
            "InvocationTimeout",
            "Locator",
            "Router",
            "CollocationOptimized"
        ];
        
        //
        // Only for use by Instance
        //
        var ReferenceFactory = Class({
            __init__: function(instance, communicator)
            {
                this._instance = instance;
                this._communicator = communicator;
                this._defaultRouter = null;
                this._defaultLocator = null;
            },
            create: function(ident, facet, tmpl, endpoints)
            {
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
        
                return this.createImpl(ident, facet, tmpl.getMode(), tmpl.getSecure(), tmpl.getProtocol(), tmpl.getEncoding(),
                                    endpoints, null, null);
            },
            createWithAdapterId: function(ident, facet, tmpl, adapterId)
            {
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
        
                return this.createImpl(ident, facet, tmpl.getMode(), tmpl.getSecure(), tmpl.getProtocol(), tmpl.getEncoding(),
                                    null, adapterId, null);
            },
            createFixed: function(ident, fixedConnection)
            {
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
        
                //
                // Create new reference
                //
                var ref = new FixedReference(
                    this._instance,
                    this._communicator,
                    ident,
                    "", // Facet
                    fixedConnection.endpoint().datagram() ? RefMode.ModeDatagram : RefMode.ModeTwoway,
                    fixedConnection.endpoint().secure(),
                    this._instance.defaultsAndOverrides().defaultEncoding,
                    fixedConnection);
                return ref;
            },
            copy: function(r)
            {
                var ident = r.getIdentity();
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
                return r.clone();
            },
            createFromString: function(s, propertyPrefix)
            {
                if(s === undefined || s === null || s.length === 0)
                {
                    return null;
                }
        
                var delim = " \t\n\r";
        
                var beg;
                var end = 0;
        
                beg = StringUtil.findFirstNotOf(s, delim, end);
                if(beg == -1)
                {
                    throw new Ice.ProxyParseException("no non-whitespace characters found in `" + s + "'");
                }
        
                //
                // Extract the identity, which may be enclosed in single
                // or double quotation marks.
                //
                var idstr = null;
                end = StringUtil.checkQuote(s, beg);
                if(end === -1)
                {
                    throw new Ice.ProxyParseException("mismatched quotes around identity in `" + s + "'");
                }
                else if(end === 0)
                {
                    end = StringUtil.findFirstOf(s, delim + ":@", beg);
                    if(end === -1)
                    {
                        end = s.length;
                    }
                    idstr = s.substring(beg, end);
                }
                else
                {
                    beg++; // Skip leading quote
                    idstr = s.substring(beg, end);
                    end++; // Skip trailing quote
                }
        
                if(beg === end)
                {
                    throw new Ice.ProxyParseException("no identity in `" + s + "'");
                }
        
                //
                // Parsing the identity may raise IdentityParseException.
                //
                var ident = this._instance.stringToIdentity(idstr);
        
                if(ident.name.length === 0)
                {
                    //
                    // An identity with an empty name and a non-empty
                    // category is illegal.
                    //
                    if(ident.category.length > 0)
                    {
                        throw new Ice.IllegalIdentityException(ident);
                    }
                    //
                    // Treat a stringified proxy containing two double
                    // quotes ("") the same as an empty string, i.e.,
                    // a null proxy, but only if nothing follows the
                    // quotes.
                    //
                    else if(StringUtil.findFirstNotOf(s, delim, end) != -1)
                    {
                        throw new Ice.ProxyParseException("invalid characters after identity in `" + s + "'");
                    }
                    else
                    {
                        return null;
                    }
                }
        
                var facet = "";
                var mode = RefMode.ModeTwoway;
                var secure = false;
                var encoding = this._instance.defaultsAndOverrides().defaultEncoding;
                var protocol = Ice.Protocol_1_0;
                var adapter = "";
        
                while(true)
                {
                    beg = StringUtil.findFirstNotOf(s, delim, end);
                    if(beg === -1)
                    {
                        break;
                    }
        
                    if(s.charAt(beg) == ':' || s.charAt(beg) == '@')
                    {
                        break;
                    }
        
                    end = StringUtil.findFirstOf(s, delim + ":@", beg);
                    if(end == -1)
                    {
                        end = s.length;
                    }
        
                    if(beg == end)
                    {
                        break;
                    }
        
                    var option = s.substring(beg, end);
                    if(option.length != 2 || option.charAt(0) != '-')
                    {
                        throw new Ice.ProxyParseException("expected a proxy option but found `" + option + "' in `" + s + "'");
                    }
        
                    //
                    // Check for the presence of an option argument. The
                    // argument may be enclosed in single or double
                    // quotation marks.
                    //
                    var argument = null;
                    var argumentBeg = StringUtil.findFirstNotOf(s, delim, end);
                    if(argumentBeg != -1)
                    {
                        var ch = s.charAt(argumentBeg);
                        if(ch != "@" && ch != ":" && ch != "-")
                        {
                            beg = argumentBeg;
                            end = StringUtil.checkQuote(s, beg);
                            if(end == -1)
                            {
                                throw new Ice.ProxyParseException("mismatched quotes around value for " + option +
                                                                " option in `" + s + "'");
                            }
                            else if(end === 0)
                            {
                                end = StringUtil.findFirstOf(s, delim + ":@", beg);
                                if(end === -1)
                                {
                                    end = s.length;
                                }
                                argument = s.substring(beg, end);
                            }
                            else
                            {
                                beg++; // Skip leading quote
                                argument = s.substring(beg, end);
                                end++; // Skip trailing quote
                            }
                        }
                    }
        
                    //
                    // If any new options are added here,
                    // IceInternal::Reference::toString() and its derived classes must be updated as well.
                    //
                    switch(option.charAt(1))
                    {
                        case 'f':
                        {
                            if(argument === null)
                            {
                                throw new Ice.ProxyParseException("no argument provided for -f option in `" + s + "'");
                            }
        
                            try
                            {
                                facet = StringUtil.unescapeString(argument, 0, argument.length);
                            }
                            catch(ex)
                            {
                                throw new Ice.ProxyParseException("invalid facet in `" + s + "': " + ex.message);
                            }
        
                            break;
                        }
        
                        case 't':
                        {
                            if(argument !== null)
                            {
                                throw new Ice.ProxyParseException("unexpected argument `" + argument +
                                                                    "' provided for -t option in `" + s + "'");
                            }
                            mode = RefMode.ModeTwoway;
                            break;
                        }
        
                        case 'o':
                        {
                            if(argument !== null)
                            {
                                throw new Ice.ProxyParseException("unexpected argument `" + argument +
                                                                    "' provided for -o option in `" + s + "'");
                            }
                            mode = RefMode.ModeOneway;
                            break;
                        }
        
                        case 'O':
                        {
                            if(argument !== null)
                            {
                                throw new Ice.ProxyParseException("unexpected argument `" + argument +
                                                                    "' provided for -O option in `" + s + "'");
                            }
                            mode = RefMode.ModeBatchOneway;
                            break;
                        }
        
                        case 'd':
                        {
                            if(argument !== null)
                            {
                                throw new Ice.ProxyParseException("unexpected argument `" + argument +
                                                                    "' provided for -d option in `" + s + "'");
                            }
                            mode = RefMode.ModeDatagram;
                            break;
                        }
        
                        case 'D':
                        {
                            if(argument !== null)
                            {
                                throw new Ice.ProxyParseException("unexpected argument `" + argument +
                                                                    "' provided for -D option in `" + s + "'");
                            }
                            mode = RefMode.ModeBatchDatagram;
                            break;
                        }
        
                        case 's':
                        {
                            if(argument !== null)
                            {
                                throw new Ice.ProxyParseException("unexpected argument `" + argument +
                                                                    "' provided for -s option in `" + s + "'");
                            }
                            secure = true;
                            break;
                        }
        
                        case 'e':
                        {
                            if(argument === null)
                            {
                                throw new Ice.ProxyParseException("no argument provided for -e option in `" + s + "'");
                            }
        
                            try
                            {
                                encoding = Ice.stringToEncodingVersion(argument);
                            }
                            catch(e) // VersionParseException
                            {
                                throw new Ice.ProxyParseException("invalid encoding version `" + argument + "' in `" + s +
                                                                    "':\n" + e.str);
                            }
                            break;
                        }
        
                        case 'p':
                        {
                            if(argument === null)
                            {
                                throw new Ice.ProxyParseException("no argument provided for -p option in `" + s + "'");
                            }
        
                            try
                            {
                                protocol = Ice.stringToProtocolVersion(argument);
                            }
                            catch(e) // VersionParseException
                            {
                                throw new Ice.ProxyParseException("invalid protocol version `" + argument + "' in `" + s +
                                                                    "':\n" + e.str);
                            }
                            break;
                        }
        
                        default:
                        {
                            throw new Ice.ProxyParseException("unknown option `" + option + "' in `" + s + "'");
                        }
                    }
                }
        
                if(beg === -1)
                {
                    return this.createImpl(ident, facet, mode, secure, protocol, encoding, null, null, propertyPrefix);
                }
        
                var endpoints = [];
        
                if(s.charAt(beg) == ':')
                {
                    var unknownEndpoints = [];
                    end = beg;
        
                    while(end < s.length && s.charAt(end) == ':')
                    {
                        beg = end + 1;
        
                        end = beg;
                        while(true)
                        {
                            end = s.indexOf(':', end);
                            if(end == -1)
                            {
                                end = s.length;
                                break;
                            }
                            else
                            {
                                var quoted = false;
                                var quote = beg;
                                while(true)
                                {
                                    quote = s.indexOf("\"", quote);
                                    if(quote == -1 || end < quote)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        quote = s.indexOf('\"', ++quote);
                                        if(quote == -1)
                                        {
                                            break;
                                        }
                                        else if(end < quote)
                                        {
                                            quoted = true;
                                            break;
                                        }
                                        ++quote;
                                    }
                                }
                                if(!quoted)
                                {
                                    break;
                                }
                                ++end;
                            }
                        }
        
                        var es = s.substring(beg, end);
                        var endp = this._instance.endpointFactoryManager().create(es, false);
                        if(endp !== null)
                        {
                            endpoints.push(endp);
                        }
                        else
                        {
                            unknownEndpoints.push(es);
                        }
                    }
                    if(endpoints.length === 0)
                    {
                        Debug.assert(unknownEndpoints.length > 0);
                        throw new Ice.EndpointParseException("invalid endpoint `" + unknownEndpoints[0] + "' in `" + s + "'");
                    }
                    else if(unknownEndpoints.length !== 0 &&
                        this._instance.initializationData().properties.getPropertyAsIntWithDefault("Ice.Warn.Endpoints", 1) > 0)
                    {
                        var msg = [];
                        msg.push("Proxy contains unknown endpoints:");
                        for(var i = 0; i < unknownEndpoints.length; ++i)
                        {
                            msg.push(" `");
                            msg.push(unknownEndpoints[i]);
                            msg.push("'");
                        }
                        this._instance.initializationData().logger.warning(msg.join(""));
                    }
        
                    return this.createImpl(ident, facet, mode, secure, protocol, encoding, endpoints, null, propertyPrefix);
                }
                else if(s.charAt(beg) == '@')
                {
                    beg = StringUtil.findFirstNotOf(s, delim, beg + 1);
                    if(beg == -1)
                    {
                        throw new Ice.ProxyParseException("missing adapter id in `" + s + "'");
                    }
        
                    var adapterstr = null;
                    end = StringUtil.checkQuote(s, beg);
                    if(end === -1)
                    {
                        throw new Ice.ProxyParseException("mismatched quotes around adapter id in `" + s + "'");
                    }
                    else if(end === 0)
                    {
                        end = StringUtil.findFirstOf(s, delim, beg);
                        if(end === -1)
                        {
                            end = s.length;
                        }
                        adapterstr = s.substring(beg, end);
                    }
                    else
                    {
                        beg++; // Skip leading quote
                        adapterstr = s.substring(beg, end);
                        end++; // Skip trailing quote
                    }
        
                    if(end !== s.length && StringUtil.findFirstNotOf(s, delim, end) !== -1)
                    {
                        throw new Ice.ProxyParseException("invalid trailing characters after `" + s.substring(0, end + 1) +
                                                            "' in `" + s + "'");
                    }
        
                    try
                    {
                        adapter = StringUtil.unescapeString(adapterstr, 0, adapterstr.length);
                    }
                    catch(ex)
                    {
                        throw new Ice.ProxyParseException("invalid adapter id in `" + s + "': " + ex.message);
                    }
                    if(adapter.length === 0)
                    {
                        throw new Ice.ProxyParseException("empty adapter id in `" + s + "'");
                    }
                    return this.createImpl(ident, facet, mode, secure, protocol, encoding, null, adapter, propertyPrefix);
                }
        
                throw new Ice.ProxyParseException("malformed proxy `" + s + "'");
            },
            createFromStream: function(ident, s)
            {
                //
                // Don't read the identity here. Operations calling this
                // constructor read the identity, and pass it as a parameter.
                //
        
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
        
                //
                // For compatibility with the old FacetPath.
                //
                var facetPath = StringSeqHelper.read(s); // String[]
                var facet;
                if(facetPath.length > 0)
                {
                    if(facetPath.length > 1)
                    {
                        throw new Ice.ProxyUnmarshalException();
                    }
                    facet = facetPath[0];
                }
                else
                {
                    facet = "";
                }
        
                var mode = s.readByte();
                if(mode < 0 || mode > RefMode.ModeLast)
                {
                    throw new Ice.ProxyUnmarshalException();
                }
        
                var secure = s.readBool();
        
                var protocol = null;
                var encoding = null;
                if(!s.getReadEncoding().equals(Ice.Encoding_1_0))
                {
                    protocol = new Ice.ProtocolVersion();
                    protocol.__read(s);
                    encoding = new Ice.EncodingVersion();
                    encoding.__read(s);
                }
                else
                {
                    protocol = Ice.Protocol_1_0;
                    encoding = Ice.Encoding_1_0;
                }
        
                var endpoints = null; // EndpointI[]
                var adapterId = null;
        
                var sz = s.readSize();
                if(sz > 0)
                {
                    endpoints = [];
                    for(var i = 0; i < sz; i++)
                    {
                        endpoints[i] = this._instance.endpointFactoryManager().read(s);
                    }
                }
                else
                {
                    adapterId = s.readString();
                }
        
                return this.createImpl(ident, facet, mode, secure, protocol, encoding, endpoints, adapterId, null);
            },
            setDefaultRouter: function(defaultRouter)
            {
                if(this._defaultRouter === null ? defaultRouter === null : this._defaultRouter.equals(defaultRouter))
                {
                    return this;
                }
        
                var factory = new ReferenceFactory(this._instance, this._communicator);
                factory._defaultLocator = this._defaultLocator;
                factory._defaultRouter = defaultRouter;
                return factory;
            },
            getDefaultRouter: function()
            {
                return this._defaultRouter;
            },
            setDefaultLocator: function(defaultLocator)
            {
                if(this._defaultLocator === null ? defaultLocator === null : this._defaultLocator.equals(defaultLocator))
                {
                    return this;
                }
        
                var factory = new ReferenceFactory(this._instance, this._communicator);
                factory._defaultRouter = this._defaultRouter;
                factory._defaultLocator = defaultLocator;
                return factory;
            },
            getDefaultLocator: function()
            {
                return this._defaultLocator;
            },
            checkForUnknownProperties: function(prefix)
            {
                var unknownProps = [], i, length;
                //
                // Do not warn about unknown properties for Ice prefixes (Ice, Glacier2, etc.)
                //
                for(i = 0; i < PropertyNames.clPropNames.length; ++i)
                {
                    if(prefix.indexOf(PropertyNames.clPropNames[i] + ".") === 0)
                    {
                        return;
                    }
                }
        
                var props = this._instance.initializationData().properties.getPropertiesForPrefix(prefix + ".");
                for(var e = props.entries; e !== null; e = e.next)
                {
                    var valid = false;
                    for(i = 0, length = suffixes.length; i < length; ++i)
                    {
                        if(e.key === prefix + "." + suffixes[i])
                        {
                            valid = true;
                            break;
                        }
                    }
        
                    if(!valid)
                    {
                        unknownProps.push(e.key);
                    }
                }
        
                if(unknownProps.length > 0)
                {
                    var message = [];
                    message.push("found unknown properties for proxy '");
                    message.push(prefix);
                    message.push("':");
                    for(i = 0, length = unknownProps.length; i < length; ++i)
                    {
                        message.push("\n    ");
                        message.push(unknownProps[i]);
                    }
                    this._instance.initializationData().logger.warning(message.join(""));
                }
            },
            createImpl: function(ident, facet, mode, secure, protocol, encoding, endpoints, adapterId, propertyPrefix)
            {
                var defaultsAndOverrides = this._instance.defaultsAndOverrides();
        
                //
                // Default local proxy options.
                //
                var locatorInfo = null;
                if(this._defaultLocator !== null)
                {
                    if(!this._defaultLocator.__reference().getEncoding().equals(encoding))
                    {
                        locatorInfo = this._instance.locatorManager().find(
                            this._defaultLocator.ice_encodingVersion(encoding));
                    }
                    else
                    {
                        locatorInfo = this._instance.locatorManager().find(this._defaultLocator);
                    }
                }
                var routerInfo = this._instance.routerManager().find(this._defaultRouter);
                var cacheConnection = true;
                var preferSecure = defaultsAndOverrides.defaultPreferSecure;
                var endpointSelection = defaultsAndOverrides.defaultEndpointSelection;
                var locatorCacheTimeout = defaultsAndOverrides.defaultLocatorCacheTimeout;
                var invocationTimeout = defaultsAndOverrides.defaultInvocationTimeout;
        
                //
                // Override the defaults with the proxy properties if a property prefix is defined.
                //
                if(propertyPrefix !== null && propertyPrefix.length > 0)
                {
                    var properties = this._instance.initializationData().properties;
        
                    //
                    // Warn about unknown properties.
                    //
                    if(properties.getPropertyAsIntWithDefault("Ice.Warn.UnknownProperties", 1) > 0)
                    {
                        this.checkForUnknownProperties(propertyPrefix);
                    }
        
                    var property;
        
                    property = propertyPrefix + ".Locator";
                    var locator = LocatorPrx.uncheckedCast(this._communicator.propertyToProxy(property));
                    if(locator !== null)
                    {
                        if(!locator.__reference().getEncoding().equals(encoding))
                        {
                            locatorInfo = this._instance.locatorManager().find(locator.ice_encodingVersion(encoding));
                        }
                        else
                        {
                            locatorInfo = this._instance.locatorManager().find(locator);
                        }
                    }
        
                    property = propertyPrefix + ".Router";
                    var router = RouterPrx.uncheckedCast(this._communicator.propertyToProxy(property));
                    if(router !== null)
                    {
                        var match = ".Router";
                        if(propertyPrefix.lastIndexOf(match) == propertyPrefix.length - match.length)
                        {
                            var s = "`" + property + "=" + properties.getProperty(property) +
                                "': cannot set a router on a router; setting ignored";
                            this._instance.initializationData().logger.warning(s);
                        }
                        else
                        {
                            routerInfo = this._instance.routerManager().find(router);
                        }
                    }
        
                    property = propertyPrefix + ".ConnectionCached";
                    cacheConnection = properties.getPropertyAsIntWithDefault(property, cacheConnection ? 1 : 0) > 0;
        
                    property = propertyPrefix + ".PreferSecure";
                    preferSecure = properties.getPropertyAsIntWithDefault(property, preferSecure ? 1 : 0) > 0;
        
                    property = propertyPrefix + ".EndpointSelection";
                    if(properties.getProperty(property).length > 0)
                    {
                        var type = properties.getProperty(property);
                        if(type == "Random")
                        {
                            endpointSelection = EndpointSelectionType.Random;
                        }
                        else if(type == "Ordered")
                        {
                            endpointSelection = EndpointSelectionType.Ordered;
                        }
                        else
                        {
                            throw new Ice.EndpointSelectionTypeParseException("illegal value `" + type +
                                                                                "'; expected `Random' or `Ordered'");
                        }
                    }
        
                    property = propertyPrefix + ".LocatorCacheTimeout";
                    var value = properties.getProperty(property);
                    if(value.length !== 0)
                    {
                        locatorCacheTimeout = properties.getPropertyAsIntWithDefault(property, locatorCacheTimeout);
                        if(locatorCacheTimeout < -1)
                        {
                            locatorCacheTimeout = -1;
                            this._instance.initializationData().logger.warning(
                                "invalid value for" + property + "`" + properties.getProperty(property) +
                                "': defaulting to -1");
                        }
                    }
        
                    property = propertyPrefix + ".InvocationTimeout";
                    value = properties.getProperty(property);
                    if(value.length !== 0)
                    {
                        invocationTimeout = properties.getPropertyAsIntWithDefault(property, invocationTimeout);
                        if(invocationTimeout < 1 && invocationTimeout !== -1)
                        {
                            invocationTimeout = -1;
                            this._instance.initializationData().logger.warning(
                                "invalid value for" + property + "`" + properties.getProperty(property) +
                                "': defaulting to -1");
                        }
                    }
                }
        
                //
                // Create new reference
                //
                return new RoutableReference(this._instance,
                                             this._communicator,
                                             ident,
                                             facet,
                                             mode,
                                             secure,
                                             protocol,
                                             encoding,
                                             endpoints,
                                             adapterId,
                                             locatorInfo,
                                             routerInfo,
                                             cacheConnection,
                                             preferSecure,
                                             endpointSelection,
                                             locatorCacheTimeout,
                                             invocationTimeout);
            }
        });
        
        Ice.ReferenceFactory = ReferenceFactory;
        
        var Reference = Class({
            __init__: function(instance, communicator, identity, facet, mode, secure, protocol, encoding, invocationTimeout)
            {
                //
                // Validate string arguments.
                //
                Debug.assert(identity === undefined || identity.name !== null);
                Debug.assert(identity === undefined || identity.category !== null);
                Debug.assert(facet === undefined || facet !== null);
        
                this._instance = instance;
                this._communicator = communicator;
                this._mode = mode;
                this._secure = secure;
                this._identity = identity;
                this._context = Reference._emptyContext;
                this._facet = facet;
                this._protocol = protocol;
                this._encoding = encoding;
                this._invocationTimeout = invocationTimeout;
                this._hashInitialized = false;
                this._overrideCompress = false;
                this._compress = false; // Only used if _overrideCompress == true
            },
            getMode: function()
            {
                return this._mode;
            },
            getSecure: function()
            {
                return this._secure;
            },
            getProtocol: function()
            {
                return this._protocol;
            },
            getEncoding: function()
            {
                return this._encoding;
            },
            getIdentity: function()
            {
                return this._identity;
            },
            getFacet: function()
            {
                return this._facet;
            },
            getInstance: function()
            {
                return this._instance;
            },
            getContext: function()
            {
                return this._context; // HashMap
            },
            getInvocationTimeout: function()
            {
                return this._invocationTimeout;
            },
            getCommunicator: function()
            {
                return this._communicator;
            },
            getEndpoints: function()
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            getAdapterId: function()
            {
                // Abstract
                Debug.assert(false);
                return "";
            },
            getRouterInfo: function()
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            getLocatorInfo: function()
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            getCacheConnection: function()
            {
                // Abstract
                Debug.assert(false);
                return false;
            },
            getPreferSecure: function()
            {
                // Abstract
                Debug.assert(false);
                return false;
            },
            getEndpointSelection: function()
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            getLocatorCacheTimeout: function()
            {
                // Abstract
                Debug.assert(false);
                return 0;
            },
            getConnectionId: function()
            {
                // Abstract
                Debug.assert(false);
                return "";
            },
            //
            // The change* methods (here and in derived classes) create
            // a new reference based on the existing one, with the
            // corresponding value changed.
            //
            changeContext: function(newContext)
            {
                if(newContext === undefined || newContext === null)
                {
                    newContext = Reference._emptyContext;
                }
                var r = this._instance.referenceFactory().copy(this);
                if(newContext.size === 0)
                {
                    r._context = Reference._emptyContext;
                }
                else
                {
                    r._context = new HashMap(newContext);
                }
                return r;
            },
            changeMode: function(newMode)
            {
                if(newMode === this._mode)
                {
                    return this;
                }
                var r = this._instance.referenceFactory().copy(this);
                r._mode = newMode;
                return r;
            },
            changeSecure: function(newSecure)
            {
                if(newSecure === this._secure)
                {
                    return this;
                }
                var r = this._instance.referenceFactory().copy(this);
                r._secure = newSecure;
                return r;
            },
            changeIdentity: function(newIdentity)
            {
                if(newIdentity.equals(this._identity))
                {
                    return this;
                }
                var r = this._instance.referenceFactory().copy(this);
                r._identity = new Identity(newIdentity.name, newIdentity.category);
                return r;
            },
            changeFacet: function(newFacet)
            {
                if(newFacet === this._facet)
                {
                    return this;
                }
                var r = this._instance.referenceFactory().copy(this);
                r._facet = newFacet;
                return r;
            },
            changeInvocationTimeout: function(newInvocationTimeout)
            {
                if(newInvocationTimeout === this._invocationTimeout)
                {
                    return this;
                }
                var r = this._instance.referenceFactory().copy(this);
                r._invocationTimeout = newInvocationTimeout;
                return r;
            },
            changeEncoding: function(newEncoding)
            {
                if(newEncoding.equals(this._encoding))
                {
                    return this;
                }
                var r = this._instance.referenceFactory().copy(this);
                r._encoding = newEncoding;
                return r;
            },
            changeCompress: function(newCompress)
            {
                if(this._overrideCompress && this._compress === newCompress)
                {
                    return this;
                }
                var r = this._instance.referenceFactory().copy(this);
                r._compress = newCompress;
                r._overrideCompress = true;
                return r;
            },
            changeAdapterId: function(newAdapterId)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changeEndpoints: function(newEndpoints)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changeLocator: function(newLocator)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changeRouter: function(newRouter)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changeCacheConnection: function(newCache)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changePreferSecure: function(newPreferSecure)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changeEndpointSelection: function(newType)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changeLocatorCacheTimeout: function(newTimeout)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changeTimeout: function(newTimeout)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            changeConnectionId: function(connectionId)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            hashCode: function()
            {
                if(this._hashInitialized)
                {
                    return this._hashValue;
                }
        
                var h = 5381;
                h = HashUtil.addNumber(h, this._mode);
                h = HashUtil.addBoolean(h, this._secure);
                h = HashUtil.addHashable(h, this._identity);
                if(this._context !== null && this._context !== undefined)
                {
                    for(var e = this._context.entries; e !== null; e = e.next)
                    {
                        h = HashUtil.addString(h, e.key);
                        h = HashUtil.addString(h, e.value);
                    }
                }
                h = HashUtil.addString(h, this._facet);
                h = HashUtil.addBoolean(h, this._overrideCompress);
                if(this._overrideCompress)
                {
                    h = HashUtil.addBoolean(h, this._compress);
                }
                h = HashUtil.addHashable(h, this._protocol);
                h = HashUtil.addHashable(h, this._encoding);
                h = HashUtil.addNumber(h, this._invocationTimeout);
        
                this._hashValue = h;
                this._hashInitialized = true;
        
                return this._hashValue;
            },
            //
            // Utility methods
            //
            isIndirect: function()
            {
                // Abstract
                Debug.assert(false);
                return false;
            },
            isWellKnown: function()
            {
                // Abstract
                Debug.assert(false);
                return false;
            },
            //
            // Marshal the reference.
            //
            streamWrite: function(s)
            {
                //
                // Don't write the identity here. Operations calling streamWrite
                // write the identity.
                //
        
                //
                // For compatibility with the old FacetPath.
                //
                if(this._facet.length === 0)
                {
                    s.writeSize(0); // Empty string sequence
                }
                else
                {
                    s.writeSize(1); // String sequence with one element
                    s.writeString(this._facet);
                }
        
                s.writeByte(this._mode);
        
                s.writeBool(this._secure);
        
                if(!s.getWriteEncoding().equals(Ice.Encoding_1_0))
                {
                    this._protocol.__write(s);
                    this._encoding.__write(s);
                }
        
                // Derived class writes the remainder of the reference.
            },
            //
            // Convert the reference to its string form.
            //
            toString: function()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                var s = [];
        
                //
                // If the encoded identity string contains characters which
                // the reference parser uses as separators, then we enclose
                // the identity string in quotes.
                //
                var id = this._instance.identityToString(this._identity);
                if(id.search(/[ :@]/) != -1)
                {
                    s.push('"');
                    s.push(id);
                    s.push('"');
                }
                else
                {
                    s.push(id);
                }
        
                if(this._facet.length > 0)
                {
                    //
                    // If the encoded facet string contains characters which
                    // the reference parser uses as separators, then we enclose
                    // the facet string in quotes.
                    //
                    s.push(" -f ");
                    var fs = StringUtil.escapeString(this._facet, "");
                    if(fs.search(/[ :@]/) != -1)
                    {
                        s.push('"');
                        s.push(fs);
                        s.push('"');
                    }
                    else
                    {
                        s.push(fs);
                    }
                }
        
                switch(this._mode)
                {
                    case RefMode.ModeTwoway:
                    {
                        s.push(" -t");
                        break;
                    }
        
                    case RefMode.ModeOneway:
                    {
                        s.push(" -o");
                        break;
                    }
        
                    case RefMode.ModeBatchOneway:
                    {
                        s.push(" -O");
                        break;
                    }
        
                    case RefMode.ModeDatagram:
                    {
                        s.push(" -d");
                        break;
                    }
        
                    case RefMode.ModeBatchDatagram:
                    {
                        s.push(" -D");
                        break;
                    }
                }
        
                if(this._secure)
                {
                    s.push(" -s");
                }
        
                if(!this._protocol.equals(Ice.Protocol_1_0))
                {
                    //
                    // We only print the protocol if it's not 1.0. It's fine as
                    // long as we don't add Ice.Default.ProtocolVersion, a
                    // stringified proxy will convert back to the same proxy with
                    // stringToProxy.
                    //
                    s.push(" -p ");
                    s.push(Ice.protocolVersionToString(this._protocol));
                }
        
                //
                // Always print the encoding version to ensure a stringified proxy
                // will convert back to a proxy with the same encoding with
                // stringToProxy (and won't use Ice.Default.EncodingVersion).
                //
                s.push(" -e ");
                s.push(Ice.encodingVersionToString(this._encoding));
        
                return s.join("");
        
                // Derived class writes the remainder of the string.
            },
            //
            // Convert the reference to its property form.
            //
            toProperty: function(prefix)
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            getRequestHandler: function(proxy)
            {
                // Abstract
                Debug.assert(false);
            },
            getBatchRequestQueue: function()
            {
                // Abstract
                Debug.assert(false);
            },
            equals: function(r)
            {
                //
                // Note: if(this === r) and type test are performed by each non-abstract derived class.
                //
        
                if(this._mode !== r._mode)
                {
                    return false;
                }
        
                if(this._secure !== r._secure)
                {
                    return false;
                }
        
                if(!this._identity.equals(r._identity))
                {
                    return false;
                }
        
                if(!this._context.equals(r._context))
                {
                    return false;
                }
        
                if(this._facet !== r._facet)
                {
                    return false;
                }
        
                if(this._overrideCompress !== r._overrideCompress)
                {
                return false;
                }
                if(this._overrideCompress && this._compress !== r._compress)
                {
                    return false;
                }
        
                if(!this._protocol.equals(r._protocol))
                {
                    return false;
                }
        
                if(!this._encoding.equals(r._encoding))
                {
                    return false;
                }
        
                if(this._invocationTimeout !== r._invocationTimeout)
                {
                    return false;
                }
        
                return true;
            },
            clone: function()
            {
                // Abstract
                Debug.assert(false);
                return null;
            },
            copyMembers: function(r)
            {
                //
                // Copy the members that are not passed to the constructor.
                //
                r._context = this._context;
                r._overrideCompress = this._overrideCompress;
                r._compress = this._compress;
            }
        });
        
        Reference._emptyContext = new HashMap();
        Reference._emptyEndpoints = [];
        
        Ice.Reference = Reference;
        
        var FixedReference = Class(Reference, {
            __init__: function(instance, communicator, identity, facet, mode, secure, encoding, connection)
            {
                Reference.call(this, instance, communicator, identity, facet, mode, secure, Ice.Protocol_1_0, encoding);
                this._fixedConnection = connection;
            },
            getEndpoints: function()
            {
                return Reference._emptyEndpoints;
            },
            getAdapterId: function()
            {
                return "";
            },
            getRouterInfo: function()
            {
                return null;
            },
            getLocatorInfo: function()
            {
                return null;
            },
            getCacheConnection: function()
            {
                return true;
            },
            getPreferSecure: function()
            {
                return false;
            },
            getEndpointSelection: function()
            {
                return EndpointSelectionType.Random;
            },
            getLocatorCacheTimeout: function()
            {
                return 0;
            },
            getConnectionId: function()
            {
                return "";
            },
            changeAdapterId: function(newAdapterId)
            {
                throw new Ice.FixedProxyException();
            },
            changeEndpoints: function(newEndpoints)
            {
                throw new Ice.FixedProxyException();
            },
            changeLocator: function(newLocator)
            {
                throw new Ice.FixedProxyException();
            },
            changeRouter: function(newRouter)
            {
                throw new Ice.FixedProxyException();
            },
            changeCacheConnection: function(newCache)
            {
                throw new Ice.FixedProxyException();
            },
            changePreferSecure: function(prefSec)
            {
                throw new Ice.FixedProxyException();
            },
            changeEndpointSelection: function(newType)
            {
                throw new Ice.FixedProxyException();
            },
            changeLocatorCacheTimeout: function(newTimeout)
            {
                throw new Ice.FixedProxyException();
            },
            changeTimeout: function(newTimeout)
            {
                throw new Ice.FixedProxyException();
            },
            changeConnectionId: function(connectionId)
            {
                throw new Ice.FixedProxyException();
            },
            isIndirect: function()
            {
                return false;
            },
            isWellKnown: function()
            {
                return false;
            },
            streamWrite: function(s)
            {
                throw new Ice.FixedProxyException();
            },
            toString: function()
            {
                throw new Ice.FixedProxyException();
            },
            toProperty: function(prefix)
            {
                throw new Ice.FixedProxyException();
            },
            clone: function()
            {
                var r = new FixedReference(this.getInstance(), this.getCommunicator(), this.getIdentity(), this.getFacet(),
                                            this.getMode(), this.getSecure(), this.getEncoding(), this._fixedConnection);
                this.copyMembers(r);
                return r;
            },
            getRequestHandler: function(proxy)
            {
                switch(this.getMode())
                {
                    case RefMode.ModeTwoway:
                    case RefMode.ModeOneway:
                    case RefMode.ModeBatchOneway:
                    {
                        if(this._fixedConnection.endpoint().datagram())
                        {
                            throw new Ice.NoEndpointException("");
                        }
                        break;
                    }
        
                    case RefMode.ModeDatagram:
                    case RefMode.ModeBatchDatagram:
                    {
                        if(!this._fixedConnection.endpoint().datagram())
                        {
                            throw new Ice.NoEndpointException("");
                        }
                        break;
                    }
                }
        
                //
                // If a secure connection is requested or secure overrides is set,
                // check if the connection is secure.
                //
                var secure;
                var defaultsAndOverrides = this.getInstance().defaultsAndOverrides();
                if(defaultsAndOverrides.overrideSecure)
                {
                    secure = defaultsAndOverrides.overrideSecureValue;
                }
                else
                {
                    secure = this.getSecure();
                }
                if(secure && !this._fixedConnection.endpoint().secure())
                {
                    throw new Ice.NoEndpointException("");
                }
        
                this._fixedConnection.throwException(); // Throw in case our connection is already destroyed.
        
                var compress;
                if(defaultsAndOverrides.overrideCompress)
                {
                    compress = defaultsAndOverrides.overrideCompressValue;
                }
                else if(this._overrideCompress)
                {
                    compress = this._compress;
                }
                else
                {
                    compress = this._fixedConnection.endpoint().compress();
                }
        
                return proxy.__setRequestHandler(new ConnectionRequestHandler(this, this._fixedConnection, compress));
            },
            getBatchRequestQueue: function()
            {
                return this._fixedConnection.getBatchRequestQueue();
            },
            equals: function(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
                if(!(rhs instanceof FixedReference))
                {
                    return false;
                }
                if(!Reference.prototype.equals.call(this, rhs))
                {
                    return false;
                }
                return this._fixedConnection.equals(rhs._fixedConnection);
            }
        });
        
        Ice.FixedReference = FixedReference;
        
        var RoutableReference = Class(Reference, {
            __init__: function(instance, communicator, identity, facet, mode, secure, protocol, encoding, endpoints,
                                adapterId, locatorInfo, routerInfo, cacheConnection, preferSecure, endpointSelection,
                                locatorCacheTimeout, invocationTimeout)
            {
                Reference.call(this, instance, communicator, identity, facet, mode, secure, protocol, encoding,
                                invocationTimeout);
                this._endpoints = endpoints;
                this._adapterId = adapterId;
                this._locatorInfo = locatorInfo;
                this._routerInfo = routerInfo;
                this._cacheConnection = cacheConnection;
                this._preferSecure = preferSecure;
                this._endpointSelection = endpointSelection;
                this._locatorCacheTimeout = locatorCacheTimeout;
                this._overrideTimeout = false;
                this._timeout = -1;
        
                if(this._endpoints === null)
                {
                    this._endpoints = Reference._emptyEndpoints;
                }
                if(this._adapterId === null)
                {
                    this._adapterId = "";
                }
                this._connectionId = "";
                Debug.assert(this._adapterId.length === 0 || this._endpoints.length === 0);
            },
            getEndpoints: function()
            {
                return this._endpoints;
            },
            getAdapterId: function()
            {
                return this._adapterId;
            },
            getRouterInfo: function()
            {
                return this._routerInfo;
            },
            getLocatorInfo: function()
            {
                return this._locatorInfo;
            },
            getCacheConnection: function()
            {
                return this._cacheConnection;
            },
            getPreferSecure: function()
            {
                return this._preferSecure;
            },
            getEndpointSelection: function()
            {
                return this._endpointSelection;
            },
            getLocatorCacheTimeout: function()
            {
                return this._locatorCacheTimeout;
            },
            getConnectionId: function()
            {
                return this._connectionId;
            },
            changeEncoding: function(newEncoding)
            {
                var r = Reference.prototype.changeEncoding.call(this, newEncoding);
                if(r !== this)
                {
                    var locInfo = r._locatorInfo;
                    if(locInfo !== null && !locInfo.getLocator().ice_getEncodingVersion().equals(newEncoding))
                    {
                        r._locatorInfo = this.getInstance().locatorManager().find(
                            locInfo.getLocator().ice_encodingVersion(newEncoding));
                    }
                }
                return r;
            },
            changeCompress: function(newCompress)
            {
                var r = Reference.prototype.changeCompress.call(this, newCompress);
                if(r !== this && this._endpoints.length > 0) // Also override the compress flag on the endpoints if it was updated.
                {
                    var newEndpoints = [];
                    for(var i = 0; i < this._endpoints.length; i++)
                    {
                        newEndpoints[i] = this._endpoints[i].changeCompress(newCompress);
                    }
                    r._endpoints = newEndpoints;
                }
                return r;
            },
            changeAdapterId: function(newAdapterId)
            {
                if(this._adapterId === newAdapterId)
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._adapterId = newAdapterId;
                r._endpoints = Reference._emptyEndpoints;
                return r;
            },
            changeEndpoints: function(newEndpoints)
            {
                if(ArrayUtil.equals(newEndpoints, this._endpoints, function(e1, e2) { return e1.equals(e2); }))
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._endpoints = newEndpoints;
                r._adapterId = "";
                r.applyOverrides(r._endpoints);
                return r;
            },
            changeLocator: function(newLocator)
            {
                var newLocatorInfo = this.getInstance().locatorManager().find(newLocator);
                if(newLocatorInfo !== null && this._locatorInfo !== null && newLocatorInfo.equals(this._locatorInfo))
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._locatorInfo = newLocatorInfo;
                return r;
            },
            changeRouter: function(newRouter)
            {
                var newRouterInfo = this.getInstance().routerManager().find(newRouter);
                if(newRouterInfo !== null && this._routerInfo !== null && newRouterInfo.equals(this._routerInfo))
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._routerInfo = newRouterInfo;
                return r;
            },
            changeCacheConnection: function(newCache)
            {
                if(newCache === this._cacheConnection)
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._cacheConnection = newCache;
                return r;
            },
            changePreferSecure: function(newPreferSecure)
            {
                if(newPreferSecure === this._preferSecure)
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._preferSecure = newPreferSecure;
                return r;
            },
            changeEndpointSelection: function(newType)
            {
                if(newType === this._endpointSelection)
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._endpointSelection = newType;
                return r;
            },
            changeLocatorCacheTimeout: function(newTimeout)
            {
                if(this._locatorCacheTimeout === newTimeout)
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._locatorCacheTimeout = newTimeout;
                return r;
            },
            changeTimeout: function(newTimeout)
            {
                if(this._overrideTimeout && this._timeout === newTimeout)
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._timeout = newTimeout;
                r._overrideTimeout = true;
                if(this._endpoints.length > 0)
                {
                    var newEndpoints = [];
                    for(var i = 0; i < this._endpoints.length; i++)
                    {
                        newEndpoints[i] = this._endpoints[i].changeTimeout(newTimeout);
                    }
                    r._endpoints = newEndpoints;
                }
                return r;
            },
            changeConnectionId: function(id)
            {
                if(this._connectionId === id)
                {
                    return this;
                }
                var r = this.getInstance().referenceFactory().copy(this);
                r._connectionId = id;
                if(this._endpoints.length > 0)
                {
                    var newEndpoints = [];
                    for(var i = 0; i < this._endpoints.length; i++)
                    {
                        newEndpoints[i] = this._endpoints[i].changeConnectionId(id);
                    }
                    r._endpoints = newEndpoints;
                }
                return r;
            },
            isIndirect: function()
            {
                return this._endpoints.length === 0;
            },
            isWellKnown: function()
            {
                return this._endpoints.length === 0 && this._adapterId.length === 0;
            },
            streamWrite: function(s)
            {
                Reference.prototype.streamWrite.call(this, s);
        
                s.writeSize(this._endpoints.length);
                if(this._endpoints.length > 0)
                {
                    Debug.assert(this._adapterId.length === 0);
                    for(var i = 0; i < this._endpoints.length; ++i)
                    {
                        s.writeShort(this._endpoints[i].type());
                        this._endpoints[i].streamWrite(s);
                    }
                }
                else
                {
                    s.writeString(this._adapterId); // Adapter id.
                }
            },
            toString: function()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                var s = [];
                s.push(Reference.prototype.toString.call(this));
                if(this._endpoints.length > 0)
                {
                    for(var i = 0; i < this._endpoints.length; ++i)
                    {
                        var endp = this._endpoints[i].toString();
                        if(endp !== null && endp.length > 0)
                        {
                            s.push(':');
                            s.push(endp);
                        }
                    }
                }
                else if(this._adapterId.length > 0)
                {
                    s.push(" @ ");
        
                    //
                    // If the encoded adapter id string contains characters which
                    // the reference parser uses as separators, then we enclose
                    // the adapter id string in quotes.
                    //
                    var a = StringUtil.escapeString(this._adapterId, null);
                    if(a.search(/[ :@]/) != -1)
                    {
                        s.push('"');
                        s.push(a);
                        s.push('"');
                    }
                    else
                    {
                        s.push(a);
                    }
                }
                return s.join("");
            },
            toProperty: function(prefix)
            {
                var properties = new HashMap(), e;
        
                properties.set(prefix, this.toString());
                properties.set(prefix + ".CollocationOptimized", "0");
                properties.set(prefix + ".ConnectionCached", this._cacheConnection ? "1" : "0");
                properties.set(prefix + ".PreferSecure", this._preferSecure ? "1" : "0");
                properties.set(prefix + ".EndpointSelection",
                            this._endpointSelection === EndpointSelectionType.Random ? "Random" : "Ordered");
        
                properties.set(prefix + ".LocatorCacheTimeout", "" + this._locatorCacheTimeout);
                properties.set(prefix + ".InvocationTimeout", "" + this.getInvocationTimeout());
        
                if(this._routerInfo !== null)
                {
                    var h = this._routerInfo.getRouter();
                    var routerProperties = h.__reference().toProperty(prefix + ".Router");
                    for(e = routerProperties.entries; e !== null; e = e.next)
                    {
                        properties.set(e.key, e.value);
                    }
                }
        
                if(this._locatorInfo !== null)
                {
                    var p = this._locatorInfo.getLocator();
                    var locatorProperties = p.__reference().toProperty(prefix + ".Locator");
                    for(e = locatorProperties.entries; e !== null; e = e.next)
                    {
                        properties.set(e.key, e.value);
                    }
                }
        
                return properties;
            },
            hashCode: function()
            {
                if(!this._hashInitialized)
                {
                    Reference.prototype.hashCode.call(this); // Initializes _hashValue.
                    this._hashValue = HashUtil.addString(this._hashValue, this._adapterId);
                }
                return this._hashValue;
            },
            equals: function(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
                if(!(rhs instanceof RoutableReference))
                {
                    return false;
                }
        
                if(!Reference.prototype.equals.call(this, rhs))
                {
                    return false;
                }
        
                if(this._locatorInfo === null ? rhs._locatorInfo !== null : !this._locatorInfo.equals(rhs._locatorInfo))
                {
                    return false;
                }
                if(this._routerInfo === null ? rhs._routerInfo !== null : !this._routerInfo.equals(rhs._routerInfo))
                {
                    return false;
                }
                if(this._cacheConnection !== rhs._cacheConnection)
                {
                    return false;
                }
                if(this._preferSecure !== rhs._preferSecure)
                {
                    return false;
                }
                if(this._endpointSelection !== rhs._endpointSelection)
                {
                    return false;
                }
                if(this._locatorCacheTimeout !== rhs._locatorCacheTimeout)
                {
                    return false;
                }
                if(this._connectionId !== rhs._connectionId)
                {
                    return false;
                }
                if(this._overrideTimeout !== rhs._overrideTimeout)
                {
                    return false;
                }
                if(this._overrideTimeout && this._timeout !== rhs._timeout)
                {
                    return false;
                }
                if(!ArrayUtil.equals(this._endpoints, rhs._endpoints, function(e1, e2) { return e1.equals(e2); }))
                {
                    return false;
                }
                if(this._adapterId !== rhs._adapterId)
                {
                    return false;
                }
                return true;
            },
            getRequestHandler: function(proxy)
            {
                return this._instance.requestHandlerFactory().getRequestHandler(this, proxy);
            },
            getBatchRequestQueue: function()
            {
                return new BatchRequestQueue(this._instance, this._mode === RefMode.ModeBatchDatagram);
            },
            getConnection: function()
            {
                var promise = new Promise(); // success callback receives (connection, compress)
        
                if(this._routerInfo !== null)
                {
                    //
                    // If we route, we send everything to the router's client
                    // proxy endpoints.
                    //
                    var self = this;
                    this._routerInfo.getClientEndpoints().then(
                        function(endpts)
                        {
                            if(endpts.length > 0)
                            {
                                self.applyOverrides(endpts);
                                self.createConnection(endpts).then(
                                    function(connection, compress)
                                    {
                                        promise.succeed(connection, compress);
                                    },
                                    function(ex)
                                    {
                                        promise.fail(ex);
                                    });
                            }
                            else
                            {
                                self.getConnectionNoRouterInfo(promise);
                            }
                        }).exception(
                            function(ex)
                            {
                                promise.fail(ex);
                            });
                }
                else
                {
                    this.getConnectionNoRouterInfo(promise);
                }
        
                return promise;
            },
            getConnectionNoRouterInfo: function(promise)
            {
                if(this._endpoints.length > 0)
                {
                    this.createConnection(this._endpoints).then(
                        function(connection, compress)
                        {
                            promise.succeed(connection, compress);
                        }).exception(
                            function(ex)
                            {
                                promise.fail(ex);
                            });
                    return;
                }
        
                var self = this;
                if(this._locatorInfo !== null)
                {
                    this._locatorInfo.getEndpoints(this, null, this._locatorCacheTimeout).then(
                        function(endpoints, cached)
                        {
                            if(endpoints.length === 0)
                            {
                                promise.fail(new Ice.NoEndpointException(self.toString()));
                                return;
                            }
        
                            self.applyOverrides(endpoints);
                            self.createConnection(endpoints).then(
                                function(connection, compress)
                                {
                                    promise.succeed(connection, compress);
                                },
                                function(ex)
                                {
                                    if(ex instanceof Ice.NoEndpointException)
                                    {
                                        //
                                        // No need to retry if there's no endpoints.
                                        //
                                        promise.fail(ex);
                                    }
                                    else
                                    {
                                        Debug.assert(self._locatorInfo !== null);
                                        self.getLocatorInfo().clearCache(self);
                                        if(cached)
                                        {
                                            var traceLevels = self.getInstance().traceLevels();
                                            if(traceLevels.retry >= 2)
                                            {
                                                var s = "connection to cached endpoints failed\n" +
                                                        "removing endpoints from cache and trying one more time\n" +
                                                        ex.toString();
                                                self.getInstance().initializationData().logger.trace(traceLevels.retryCat, s);
                                            }
                                            self.getConnectionNoRouterInfo(promise); // Retry.
                                            return;
                                        }
                                        promise.fail(ex);
                                    }
                                });
                        }).exception(
                            function(ex)
                            {
                                promise.fail(ex);
                            });
                }
                else
                {
                    promise.fail(new Ice.NoEndpointException(this.toString()));
                }
            },
            clone: function()
            {
                var r = new RoutableReference(this.getInstance(),
                                                this.getCommunicator(),
                                                this.getIdentity(),
                                                this.getFacet(),
                                                this.getMode(),
                                                this.getSecure(),
                                                this.getProtocol(),
                                                this.getEncoding(),
                                                this._endpoints,
                                                this._adapterId,
                                                this._locatorInfo,
                                                this._routerInfo,
                                                this._cacheConnection,
                                                this._preferSecure,
                                                this._endpointSelection,
                                                this._locatorCacheTimeout,
                                                this._invocationTimeout);
                this.copyMembers(r);
                return r;
            },
            copyMembers: function(rhs)
            {
                //
                // Copy the members that are not passed to the constructor.
                //
                Reference.prototype.copyMembers.call(this, rhs);
                rhs._overrideTimeout = this._overrideTimeout;
                rhs._timeout = this._timeout;
                rhs._connectionId = this._connectionId;
            },
            applyOverrides: function(endpts)
            {
                //
                // Apply the endpoint overrides to each endpoint.
                //
                for(var i = 0; i < endpts.length; ++i)
                {
                    endpts[i] = endpts[i].changeConnectionId(this._connectionId);
                    if(this._overrideCompress)
                    {
                        endpts[i] = endpts[i].changeCompress(this._compress);
                    }
                    if(this._overrideTimeout)
                    {
                        endpts[i] = endpts[i].changeTimeout(this._timeout);
                    }
                }
            },
            filterEndpoints: function(allEndpoints)
            {
                var endpoints = [];
        
                //
                // Filter out opaque endpoints or endpoints which can't connect.
                //
                for(var i = 0; i < allEndpoints.length; ++i)
                {
                    if(!(allEndpoints[i] instanceof OpaqueEndpointI) && allEndpoints[i].connectable())
                    {
                        endpoints.push(allEndpoints[i]);
                    }
                }
        
                //
                // Filter out endpoints according to the mode of the reference.
                //
                switch(this.getMode())
                {
                    case RefMode.ModeTwoway:
                    case RefMode.ModeOneway:
                    case RefMode.ModeBatchOneway:
                    {
                        //
                        // Filter out datagram endpoints.
                        //
                        endpoints = ArrayUtil.filter(endpoints, function(e, index, arr) { return !e.datagram(); });
                        break;
                    }
        
                    case RefMode.ModeDatagram:
                    case RefMode.ModeBatchDatagram:
                    {
                        //
                        // Filter out non-datagram endpoints.
                        //
                        endpoints = ArrayUtil.filter(endpoints, function(e, index, arr) { return e.datagram(); });
                        break;
                    }
                }
        
                //
                // Sort the endpoints according to the endpoint selection type.
                //
                switch(this.getEndpointSelection())
                {
                    case EndpointSelectionType.Random:
                    {
                        //
                        // Shuffle the endpoints.
                        //
                        ArrayUtil.shuffle(endpoints);
                        break;
                    }
                    case EndpointSelectionType.Ordered:
                    {
                        // Nothing to do.
                        break;
                    }
                    default:
                    {
                        Debug.assert(false);
                        break;
                    }
                }
        
                //
                // If a secure connection is requested or secure overrides is
                // set, remove all non-secure endpoints. Otherwise if preferSecure is set
                // make secure endpoints prefered. By default make non-secure
                // endpoints preferred over secure endpoints.
                //
                var overrides = this.getInstance().defaultsAndOverrides();
                if(overrides.overrideSecure ? overrides.overrideSecureValue : this.getSecure())
                {
                    endpoints = ArrayUtil.filter(endpoints, function(e, index, arr) { return e.secure(); });
                }
                else
                {
                    var preferSecure = this.getPreferSecure();
                    var compare = function(e1, e2)
                    {
                        var ls = e1.secure();
                        var rs = e2.secure();
                        if((ls && rs) || (!ls && !rs))
                        {
                            return 0;
                        }
                        else if(!ls && rs)
                        {
                            return preferSecure ? 1 : -1;
                        }
                        else
                        {
                            return preferSecure ? -1 : 1;
                        }
                    };
                    endpoints.sort(compare);
                }
                return endpoints;
            },
            createConnection: function(allEndpoints)
            {
                var endpoints = this.filterEndpoints(allEndpoints);
                if(endpoints.length === 0)
                {
                    return new Promise().fail(new Ice.NoEndpointException(this.toString()));
                }
        
                //
                // Finally, create the connection.
                //
                var promise = new Promise();
                var factory = this.getInstance().outgoingConnectionFactory();
                var cb;
                if(this.getCacheConnection() || endpoints.length == 1)
                {
                    //
                    // Get an existing connection or create one if there's no
                    // existing connection to one of the given endpoints.
                    //
                    cb = new CreateConnectionCallback(this, null, promise);
                    factory.create(endpoints, false, this.getEndpointSelection()).then(
                        function(connection, compress)
                        {
                            cb.setConnection(connection, compress);
                        }).exception(
                            function(ex)
                            {
                                cb.setException(ex);
                            });
                }
                else
                {
                    //
                    // Go through the list of endpoints and try to create the
                    // connection until it succeeds. This is different from just
                    // calling create() with the given endpoints since this might
                    // create a new connection even if there's an existing
                    // connection for one of the endpoints.
                    //
                    var v = [ endpoints[0] ];
                    cb = new CreateConnectionCallback(this, endpoints, promise);
                    factory.create(v, true, this.getEndpointSelection()).then(
                        function(connection, compress)
                        {
                            cb.setConnection(connection, compress);
                        }).exception(
                            function(ex)
                            {
                                cb.setException(ex);
                            });
                }
        
                return promise;
            }
        });
        
        Ice.RoutableReference = RoutableReference;
        
        var CreateConnectionCallback = Class({
            __init__: function(r, endpoints, promise)
            {
                this.ref = r;
                this.endpoints = endpoints;
                this.promise = promise;
                this.i = 0;
                this.exception = null;
            },
            setConnection: function(connection, compress)
            {
                //
                // If we have a router, set the object adapter for this router
                // (if any) to the new connection, so that callbacks from the
                // router can be received over this new connection.
                //
                if(this.ref.getRouterInfo() !== null && this.ref.getRouterInfo().getAdapter() !== null)
                {
                    connection.setAdapter(this.ref.getRouterInfo().getAdapter());
                }
                this.promise.succeed(connection, compress);
            },
            setException: function(ex)
            {
                if(this.exception === null)
                {
                    this.exception = ex;
                }
        
                if(this.endpoints === null || ++this.i === this.endpoints.length)
                {
                    this.promise.fail(this.exception);
                    return;
                }
        
                var more = this.i != this.endpoints.length - 1;
                var arr = [ this.endpoints[this.i] ];
                var self = this;
                this.ref.getInstance().outgoingConnectionFactory().create(arr, more, this.ref.getEndpointSelection()).then(
                    function(connection, compress)
                    {
                        self.setConnection(connection, compress);
                    }).exception(
                        function(ex)
                        {
                            self.setException(ex);
                        });
            }
        });
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        //
        // Local aliases.
        //
        var Debug = Ice.Debug;
        var BasicStream = Ice.BasicStream;
        var EndpointParseException = Ice.EndpointParseException;
        var OpaqueEndpointI = Ice.OpaqueEndpointI;
        var Protocol = Ice.Protocol;
        var StringUtil = Ice.StringUtil;
        
        var EndpointFactoryManager = Ice.Class({
            __init__: function(instance)
            {
                this._instance = instance;
                this._factories = [];
            },
            add: function(factory)
            {
                for(var i = 0; i < this._factories.length; ++i)
                {
                    Debug.assert(this._factories[i].type() != factory.type());
                }
        
                this._factories.push(factory);
            },
            get: function(type)
            {
                for(var i = 0; i < this._factories.length; ++i)
                {
                    if(this._factories[i].type() === type)
                    {
                        return this._factories[i];
                    }
                }
                return null;
            },
            create: function(str, oaEndpoint)
            {
                var s = str.trim();
                if(s.length === 0)
                {
                    throw new EndpointParseException("value has no non-whitespace characters");
                }
        
                var arr = StringUtil.splitString(s, " \t\n\r");
                if(arr.length === 0)
                {
                    throw new EndpointParseException("value has no non-whitespace characters");
                }
        
                var protocol = arr[0];
                arr.splice(0, 1);
        
                if(protocol === "default")
                {
                    protocol = this._instance.defaultsAndOverrides().defaultProtocol;
                }
        
                for(var i = 0, length = this._factories.length; i < length; ++i)
                {
                    if(this._factories[i].protocol() === protocol)
                    {
                        var e = this._factories[i].create(arr, oaEndpoint);
                        if(arr.length > 0)
                        {
                            throw new EndpointParseException("unrecognized argument `" + arr[0] + "' in endpoint `" +
                                                             str + "'");
                        }
                        return e;
                    }
                }
        
                //
                // If the stringified endpoint is opaque, create an unknown endpoint,
                // then see whether the type matches one of the known endpoints.
                //
                if(protocol === "opaque")
                {
                    var ue = new OpaqueEndpointI();
                    ue.initWithOptions(arr);
                    if(arr.length > 0)
                    {
                        throw new EndpointParseException("unrecognized argument `" + arr[0] + "' in endpoint `" + str + "'");
                    }
        
                    for(i = 0, length =  this._factories.length; i < length; ++i)
                    {
                        if(this._factories[i].type() == ue.type())
                        {
                            //
                            // Make a temporary stream, write the opaque endpoint data into the stream,
                            // and ask the factory to read the endpoint data from that stream to create
                            // the actual endpoint.
                            //
                            var bs = new BasicStream(this._instance, Protocol.currentProtocolEncoding);
                            bs.writeShort(ue.type());
                            ue.streamWrite(bs);
                            bs.pos = 0;
                            bs.readShort(); // type
                            bs.startReadEncaps();
                            var endpoint = this._factories[i].read(bs);
                            bs.endReadEncaps();
                            return endpoint;
                        }
                    }
                    return ue; // Endpoint is opaque, but we don't have a factory for its type.
                }
        
                return null;
            },
            read: function(s)
            {
                var e;
                var type = s.readShort();
                for(var i = 0; i < this._factories.length; ++i)
                {
                    if(this._factories[i].type() == type)
                    {
                        s.startReadEncaps();
                        e = this._factories[i].read(s);
                        s.endReadEncaps();
                        return e;
                    }
                }
                s.startReadEncaps();
                e = new OpaqueEndpointI(type);
                e.initWithStream(s);
                s.endReadEncaps();
                return e;
            },
            destroy: function()
            {
                for(var i = 0; i < this._factories.length; ++i)
                {
                    this._factories[i].destroy();
                }
                this._factories = [];
            }
        });
        
        Ice.EndpointFactoryManager = EndpointFactoryManager;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Debug = Ice.Debug;
        var HashMap = Ice.HashMap;
        var ObjectPrx = Ice.ObjectPrx;
        var StringUtil = Ice.StringUtil;
        var Identity = Ice.Identity;
        
        //
        // Only for use by Instance.
        //
        var ProxyFactory = Ice.Class({
            __init__: function(instance)
            {
                this._instance = instance;
        
                var arr = this._instance.initializationData().properties.getPropertyAsList("Ice.RetryIntervals");
        
                if(arr.length > 0)
                {
                    this._retryIntervals = [];
        
                    for(var i = 0; i < arr.length; i++)
                    {
                        var v;
        
                        try
                        {
                            v = StringUtil.toInt(arr[i]);
                        }
                        catch(ex)
                        {
                            v = 0;
                        }
        
                        //
                        // If -1 is the first value, no retry and wait intervals.
                        //
                        if(i === 0 && v === -1)
                        {
                            break;
                        }
        
                        this._retryIntervals[i] = v > 0 ? v : 0;
                    }
                }
                else
                {
                    this._retryIntervals = [ 0 ];
                }
            },
            stringToProxy: function(str)
            {
                var ref = this._instance.referenceFactory().createFromString(str, null);
                return this.referenceToProxy(ref);
            },
            proxyToString: function(proxy)
            {
                if(proxy !== null)
                {
                    return proxy.__reference().toString();
                }
                else
                {
                    return "";
                }
            },
            propertyToProxy: function(prefix)
            {
                var proxy = this._instance.initializationData().properties.getProperty(prefix);
                var ref = this._instance.referenceFactory().createFromString(proxy, prefix);
                return this.referenceToProxy(ref);
            },
            proxyToProperty: function(proxy, prefix)
            {
                if(proxy !== null)
                {
                    return proxy.__reference().toProperty(prefix);
                }
                else
                {
                    return new HashMap();
                }
            },
            streamToProxy: function(s, type)
            {
                var ident = new Identity();
                ident.__read(s);
        
                var ref = this._instance.referenceFactory().createFromStream(ident, s);
                return this.referenceToProxy(ref, type);
            },
            referenceToProxy: function(ref, type)
            {
                if(ref !== null)
                {
                    var proxy = type ? new type() : new ObjectPrx();
                    proxy.__setup(ref);
                    return proxy;
                }
                else
                {
                    return null;
                }
            },
            proxyToStream: function(proxy, s)
            {
                if(proxy !== null)
                {
                    var ref = proxy.__reference();
                    ref.getIdentity().__write(s);
                    ref.streamWrite(s);
                }
                else
                {
                    var ident = new Identity("", "");
                    ident.__write(s);
                }
            },
            checkRetryAfterException: function(ex, ref, sleepInterval, cnt)
            {
                var traceLevels = this._instance.traceLevels();
                var logger = this._instance.initializationData().logger;
        
                //
                // We don't retry batch requests because the exception might have caused
                // the all the requests batched with the connection to be aborted and we
                // want the application to be notified.
                //
                if(ref.getMode() === Ice.Reference.ModeBatchOneway || ref.getMode() === Ice.Reference.ModeBatchDatagram)
                {
                    throw ex;
                }
        
                if(ex instanceof Ice.ObjectNotExistException)
                {
                    var one = ex;
        
                    if(ref.getRouterInfo() !== null && one.operation === "ice_add_proxy")
                    {
                        //
                        // If we have a router, an ObjectNotExistException with an
                        // operation name "ice_add_proxy" indicates to the client
                        // that the router isn't aware of the proxy (for example,
                        // because it was evicted by the router). In this case, we
                        // must *always* retry, so that the missing proxy is added
                        // to the router.
                        //
        
                        ref.getRouterInfo().clearCache(ref);
        
                        if(traceLevels.retry >= 1)
                        {
                            logger.trace(traceLevels.retryCat, "retrying operation call to add proxy to router\n" +
                                                            ex.toString());
                        }
        
                        if(sleepInterval !== null)
                        {
                            sleepInterval.value = 0;
                        }
                        return cnt; // We must always retry, so we don't look at the retry count.
                    }
                    else if(ref.isIndirect())
                    {
                        //
                        // We retry ObjectNotExistException if the reference is
                        // indirect.
                        //
        
                        if(ref.isWellKnown())
                        {
                            var li = ref.getLocatorInfo();
                            if(li !== null)
                            {
                                li.clearCache(ref);
                            }
                        }
                    }
                    else
                    {
                        //
                        // For all other cases, we don't retry ObjectNotExistException.
                        //
                        throw ex;
                    }
                }
                else if(ex instanceof Ice.RequestFailedException)
                {
                    //
                    // For all other cases, we don't retry ObjectNotExistException
                    //
                    throw ex;
                }
        
                //
                // There is no point in retrying an operation that resulted in a
                // MarshalException. This must have been raised locally (because
                // if it happened in a server it would result in an
                // UnknownLocalException instead), which means there was a problem
                // in this process that will not change if we try again.
                //
                // The most likely cause for a MarshalException is exceeding the
                // maximum message size, which is represented by the the subclass
                // MemoryLimitException. For example, a client can attempt to send
                // a message that exceeds the maximum memory size, or accumulate
                // enough batch requests without flushing that the maximum size is
                // reached.
                //
                // This latter case is especially problematic, because if we were
                // to retry a batch request after a MarshalException, we would in
                // fact silently discard the accumulated requests and allow new
                // batch requests to accumulate. If the subsequent batched
                // requests do not exceed the maximum message size, it appears to
                // the client that all of the batched requests were accepted, when
                // in reality only the last few are actually sent.
                //
                if(ex instanceof Ice.MarshalException)
                {
                    throw ex;
                }
        
                //
                // Don't retry if the communicator is destroyed or object adapter
                // deactivated.
                //
                if(ex instanceof Ice.CommunicatorDestroyedException || ex instanceof Ice.ObjectAdapterDeactivatedException)
                {
                    throw ex;
                }
        
                //
                // Don't retry invocation timeouts.
                //
                if(ex instanceof Ice.InvocationTimeoutException || ex instanceof Ice.InvocationCanceledException)
                {
                    throw ex;
                }
        
                ++cnt;
                Debug.assert(cnt > 0);
        
                var interval;
                if(cnt === (this._retryIntervals.length + 1) && ex instanceof Ice.CloseConnectionException)
                {
                    //
                    // A close connection exception is always retried at least once, even if the retry
                    // limit is reached.
                    //
                    interval = 0;
                }
                else if(cnt > this._retryIntervals.length)
                {
                    if(traceLevels.retry >= 1)
                    {
                        logger.trace(traceLevels.retryCat,
        			     "cannot retry operation call because retry limit has been exceeded\n" + ex.toString());
                    }
                    throw ex;
                }
                else
                {
                    interval = this._retryIntervals[cnt - 1];
                }
        
                if(traceLevels.retry >= 1)
                {
                    var msg = "retrying operation call";
                    if(interval > 0)
                    {
                        msg += " in " + interval + "ms";
                    }
                    msg += " because of exception\n" + ex.toString();
                    logger.trace(traceLevels.retryCat, msg);
                }
        
                Debug.assert(sleepInterval !== null);
                sleepInterval.value = interval;
        
                return cnt;
            }
        });
        
        Ice.ProxyFactory = ProxyFactory;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        
        var FormatType = Ice.FormatType;
        var EndpointSelectionType = Ice.EndpointSelectionType;
        var Protocol = Ice.Protocol;
        
        var DefaultsAndOverrides = function(properties, logger)
        {
            this.defaultProtocol = properties.getPropertyWithDefault("Ice.Default.Protocol",
                                                                     Ice.TcpEndpointFactory !== undefined ? "tcp" : "ws");
        
            var value = properties.getProperty("Ice.Default.Host");
            this.defaultHost = value.length > 0 ? value : null;
        
            value = properties.getProperty("Ice.Default.SourceAddress");
            this.defaultSourceAddress = value.length > 0 ? value : null;
        
            value = properties.getProperty("Ice.Override.Timeout");
            if(value.length > 0)
            {
                this.overrideTimeout = true;
                this.overrideTimeoutValue = properties.getPropertyAsInt("Ice.Override.Timeout");
                if(this.overrideTimeoutValue < 1 && this.overrideTimeoutValue !== -1)
                {
                    this.overrideTimeoutValue = -1;
                    logger.warning("invalid value for Ice.Override.Timeout `" +
                                    properties.getProperty("Ice.Override.Timeout") + "': defaulting to -1");
                }
            }
            else
            {
                this.overrideTimeout = false;
                this.overrideTimeoutValue = -1;
            }
        
            value = properties.getProperty("Ice.Override.ConnectTimeout");
            if(value.length > 0)
            {
                this.overrideConnectTimeout = true;
                this.overrideConnectTimeoutValue = properties.getPropertyAsInt("Ice.Override.ConnectTimeout");
                if(this.overrideConnectTimeoutValue < 1 && this.overrideConnectTimeoutValue !== -1)
                {
                    this.overrideConnectTimeoutValue = -1;
                    logger.warning("invalid value for Ice.Override.ConnectTimeout `" +
                                    properties.getProperty("Ice.Override.ConnectTimeout") + "': defaulting to -1");
                }
            }
            else
            {
                this.overrideConnectTimeout = false;
                this.overrideConnectTimeoutValue = -1;
            }
        
            value = properties.getProperty("Ice.Override.CloseTimeout");
            if(value.length > 0)
            {
                this.overrideCloseTimeout = true;
                this.overrideCloseTimeoutValue = properties.getPropertyAsInt("Ice.Override.CloseTimeout");
                if(this.overrideCloseTimeoutValue < 1 && this.overrideCloseTimeoutValue !== -1)
                {
                    this.overrideCloseTimeoutValue = -1;
                    logger.warning("invalid value for Ice.Override.CloseTimeout `" +
                                    properties.getProperty("Ice.Override.CloseTimeout") + "': defaulting to -1");
                }
            }
            else
            {
                this.overrideCloseTimeout = false;
                this.overrideCloseTimeoutValue = -1;
            }
        
            this.overrideCompress = false;
            this.overrideSecure = false;
        
            value = properties.getPropertyWithDefault("Ice.Default.EndpointSelection", "Random");
            if(value === "Random")
            {
                this.defaultEndpointSelection = EndpointSelectionType.Random;
            }
            else if(value === "Ordered")
            {
                this.defaultEndpointSelection = EndpointSelectionType.Ordered;
            }
            else
            {
                var ex = new Ice.EndpointSelectionTypeParseException();
                ex.str = "illegal value `" + value + "'; expected `Random' or `Ordered'";
                throw ex;
            }
        
            this.defaultTimeout = properties.getPropertyAsIntWithDefault("Ice.Default.Timeout", 60000);
            if(this.defaultTimeout < 1 && this.defaultTimeout !== -1)
            {
                this.defaultTimeout = 60000;
                logger.warning("invalid value for Ice.Default.Timeout `" + properties.getProperty("Ice.Default.Timeout") +
                               "': defaulting to 60000");
            }
        
            this.defaultLocatorCacheTimeout = properties.getPropertyAsIntWithDefault("Ice.Default.LocatorCacheTimeout", -1);
            if(this.defaultLocatorCacheTimeout < -1)
            {
                this.defaultLocatorCacheTimeout = -1;
                logger.warning("invalid value for Ice.Default.LocatorCacheTimeout `" +
                               properties.getProperty("Ice.Default.LocatorCacheTimeout") + "': defaulting to -1");
            }
        
            this.defaultInvocationTimeout = properties.getPropertyAsIntWithDefault("Ice.Default.InvocationTimeout", -1);
            if(this.defaultInvocationTimeout < 1 && this.defaultInvocationTimeout !== -1)
            {
                this.defaultInvocationTimeout = -1;
                logger.warning("invalid value for Ice.Default.InvocationTimeout `" +
                               properties.getProperty("Ice.Default.InvocationTimeout") + "': defaulting to -1");
            }
        
            this.defaultPreferSecure = properties.getPropertyAsIntWithDefault("Ice.Default.PreferSecure", 0) > 0;
        
            value = properties.getPropertyWithDefault("Ice.Default.EncodingVersion",
                                                      Ice.encodingVersionToString(Protocol.currentEncoding));
            this.defaultEncoding = Ice.stringToEncodingVersion(value);
            Protocol.checkSupportedEncoding(this.defaultEncoding);
        
            var slicedFormat = properties.getPropertyAsIntWithDefault("Ice.Default.SlicedFormat", 0) > 0;
            this.defaultFormat = slicedFormat ? FormatType.SlicedFormat : FormatType.CompactFormat;
        };
        
        Ice.DefaultsAndOverrides = DefaultsAndOverrides;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var StringUtil = Ice.StringUtil;
        var Identity = Ice.Identity;
        var IdentityParseException = Ice.IdentityParseException;
        
        /**
        * Converts a string to an object identity.
        *
        * @param s The string to convert.
        *
        * @return The converted object identity.
        **/
        Ice.stringToIdentity = function(s)
        {
            var ident = new Identity();
        
            //
            // Find unescaped separator; note that the string may contain an escaped
            // backslash before the separator.
            //
            var slash = -1;
            var pos = 0;
            while((pos = s.indexOf('/', pos)) !== -1)
            {
                var escapes = 0;
                while(pos - escapes > 0 && s.charAt(pos - escapes - 1) == '\\')
                {
                    escapes++;
                }
                    
                //
                // We ignore escaped escapes
                //
                if(escapes % 2 === 0)
                {
                    if(slash == -1)
                    {
                        slash = pos;
                    }
                    else
                    {
                        //
                        // Extra unescaped slash found.
                        //
                        var ex = new IdentityParseException();
                        ex.str = "unescaped backslash in identity `" + s + "'";
                        throw ex;
                    }
                }
                pos++;
            }
        
            if(slash == -1)
            {
                ident.category = "";
                try
                {
                    ident.name = StringUtil.unescapeString(s);
                }
                catch(e)
                {
                    var ex = new IdentityParseException();
                    ex.str = "invalid identity name `" + s + "': " + ex.toString();
                    throw ex;
                }
            }
            else
            {
                try
                {
                    ident.category = StringUtil.unescapeString(s, 0, slash);
                }
                catch(e)
                {
                    var ex = new IdentityParseException();
                    ex.str = "invalid category in identity `" + s + "': " + ex.toString();
                    throw ex;
                }
                if(slash + 1 < s.length)
                {
                    try
                    {
                        ident.name = StringUtil.unescapeString(s, slash + 1, s.length);
                    }
                    catch(e)
                    {
                        var ex = new IdentityParseException();
                        ex.str = "invalid name in identity `" + s + "': " + ex.toString();
                        throw ex;
                    }
                }
                else
                {
                    ident.name = "";
                }
            }
        
            return ident;
        };
        
        /**
        * Converts an object identity to a string.
        *
        * @param ident The object identity to convert.
        *
        * @return The string representation of the object identity.
        **/
        Ice.identityToString = function(ident)
        {
            if(ident.category === null || ident.category.length === 0)
            {
                return StringUtil.escapeString(ident.name, "/");
            }
            else
            {
                return StringUtil.escapeString(ident.category, "/") + '/' + StringUtil.escapeString(ident.name, "/");
            }
        };
        
        /**
        * Compares the object identities of two proxies.
        *
        * @param lhs A proxy.
        * @param rhs A proxy.
        * @return -1 if the identity in <code>lhs</code> compares
        * less than the identity in <code>rhs</code>; 0 if the identities
        * compare equal; 1, otherwise.
        *
        * @see ProxyIdentityKey
        * @see ProxyIdentityAndFacetKey
        * @see ProxyIdentityAndFacetCompare
        **/
        Ice.proxyIdentityCompare = function(lhs, rhs)
        {
            if(lhs === rhs)
            {
                return 0;
            }
            else if(lhs === null && rhs !== null)
            {
                return -1;
            }
            else if(lhs !== null && rhs === null)
            {
                return 1;
            }
            else
            {
                var lhsIdentity = lhs.ice_getIdentity();
                var rhsIdentity = rhs.ice_getIdentity();
                var n;
                if((n = lhsIdentity.name.localeCompare(rhsIdentity.name)) !== 0)
                {
                    return n;
                }
                return lhsIdentity.category.localeCompare(rhsIdentity.category);
            }
        };
        
        /**
        * Compares the object identities and facets of two proxies.
        *
        * @param lhs A proxy.
        * @param rhs A proxy.
        * @return -1 if the identity and facet in <code>lhs</code> compare
        * less than the identity and facet in <code>rhs</code>; 0 if the identities
        * and facets compare equal; 1, otherwise.
        *
        * @see ProxyIdentityAndFacetKey
        * @see ProxyIdentityKey
        * @see ProxyIdentityCompare
        **/
        Ice.proxyIdentityAndFacetCompare = function(lhs, rhs)
        {
            if(lhs === rhs)
            {
                return 0;
            }
            else if(lhs === null && rhs !== null)
            {
                return -1;
            }
            else if(lhs !== null && rhs === null)
            {
                return 1;
            }
            else
            {
                var lhsIdentity = lhs.ice_getIdentity();
                var rhsIdentity = rhs.ice_getIdentity();
                var n;
                if((n = lhsIdentity.name.localeCompare(rhsIdentity.name)) !== 0)
                {
                    return n;
                }
                if((n = lhsIdentity.category.localeCompare(rhsIdentity.category)) !== 0)
                {
                    return n;
                }
        
                var lhsFacet = lhs.ice_getFacet();
                var rhsFacet = rhs.ice_getFacet();
                if(lhsFacet === null && rhsFacet === null)
                {
                    return 0;
                }
                else if(lhsFacet === null)
                {
                    return -1;
                }
                else if(rhsFacet === null)
                {
                    return 1;
                }
                return lhsFacet.localeCompare(rhsFacet);
            }
        };
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var ArrayUtil = Ice.ArrayUtil;
        var AsyncResultBase = Ice.AsyncResultBase;
        var ConnectionI = Ice.ConnectionI;
        var ConnectionReaper = Ice.ConnectionReaper;
        var Debug = Ice.Debug;
        var HashMap = Ice.HashMap;
        var Promise = Ice.Promise;
        var EndpointSelectionType = Ice.EndpointSelectionType;
        var FactoryACMMonitor = Ice.FactoryACMMonitor;
        var Class = Ice.Class;
        
        //
        // Only for use by Instance.
        //
        var OutgoingConnectionFactory = Class({
            __init__: function(communicator, instance)
            {
                this._communicator = communicator;
                this._instance = instance;
                this._destroyed = false;
        
                this._monitor = new FactoryACMMonitor(this._instance, this._instance.clientACM());
        
                this._connectionsByEndpoint = new ConnectionListMap(); // map<EndpointI, Array<Ice.ConnectionI>>
                this._pending = new HashMap(HashMap.compareEquals); // map<EndpointI, Array<ConnectCallback>>
                this._pendingConnectCount = 0;
        
                this._waitPromise = null;
            },
            destroy: function()
            {
                if(this._destroyed)
                {
                    return;
                }
        
                this._connectionsByEndpoint.forEach(function(connection)
                                                    {
                                                        connection.destroy(ConnectionI.CommunicatorDestroyed);
                                                    });
        
                this._destroyed = true;
                this._communicator = null;
                this.checkFinished();
            },
            waitUntilFinished: function()
            {
                this._waitPromise = new Promise();
                this.checkFinished();
                return this._waitPromise;
            },
            //
            // Returns a promise, success callback receives (connection, compress)
            //
            create: function(endpts, hasMore, selType)
            {
                Debug.assert(endpts.length > 0);
        
                //
                // Apply the overrides.
                //
                var endpoints = this.applyOverrides(endpts);
        
                //
                // Try to find a connection to one of the given endpoints.
                //
                try
                {
                    var compress = { value: false };
                    var connection = this.findConnectionByEndpoint(endpoints, compress);
                    if(connection !== null)
                    {
                        return new Promise().succeed(connection, compress.value);
                    }
                }
                catch(ex)
                {
                    return new Promise().fail(ex);
                }
        
                var cb = new ConnectCallback(this, endpoints, hasMore, selType);
                return cb.start();
            },
            setRouterInfo: function(routerInfo)
            {
                var self = this;
                return Ice.Promise.try(
                    function()
                    {
                        if(self._destroyed)
                        {
                            throw new Ice.CommunicatorDestroyedException();
                        }
                        return routerInfo.getClientEndpoints();
                    }
                ).then(
                    function(endpoints)
                    {
                        //
                        // Search for connections to the router's client proxy
                        // endpoints, and update the object adapter for such
                        // connections, so that callbacks from the router can be
                        // received over such connections.
                        //
                        var adapter = routerInfo.getAdapter();
                        var defaultsAndOverrides = self._instance.defaultsAndOverrides();
                        for(var i = 0; i < endpoints.length; ++i)
                        {
                            var endpoint = endpoints[i];
        
                            //
                            // Modify endpoints with overrides.
                            //
                            if(defaultsAndOverrides.overrideTimeout)
                            {
                                endpoint = endpoint.changeTimeout(defaultsAndOverrides.overrideTimeoutValue);
                            }
        
                            //
                            // The Connection object does not take the compression flag of
                            // endpoints into account, but instead gets the information
                            // about whether messages should be compressed or not from
                            // other sources. In order to allow connection sharing for
                            // endpoints that differ in the value of the compression flag
                            // only, we always set the compression flag to false here in
                            // this connection factory.
                            //
                            endpoint = endpoint.changeCompress(false);
        
                            for(var j = 0; j < self._connectionsByEndpoint.length; ++j)
                            {
                                var connection = self._connectionsByEndpoint[j];
                                if(connection.endpoint().equals(endpoint))
                                {
                                    connection.setAdapter(adapter);
                                }
                            }
                        }
                    }
                );
            },
            removeAdapter: function(adapter)
            {
                if(this._destroyed)
                {
                    return;
                }
                this._connectionsByEndpoint.forEach(function(connection)
                                                    {
                                                        if(connection.getAdapter() === adapter)
                                                        {
                                                            connection.setAdapter(null);
                                                        }
                                                    });
            },
            flushAsyncBatchRequests: function()
            {
                var promise = new AsyncResultBase(this._communicator, "flushBatchRequests", null, null, null);
                if(this._destroyed)
                {
                    promise.succeed();
                    return;
                }
        
                Promise.all(
                    this._connectionsByEndpoint.map(
                        function(connection)
                        {
                            if(connection.isActiveOrHolding())
                            {
                                return connection.flushBatchRequests().exception(
                                    function(ex)
                                    {
                                        if(ex instanceof Ice.LocalException)
                                        {
                                            // Ignore
                                        }
                                        else
                                        {
                                            throw ex;
                                        }
                                    });
                            }
                        })
                ).then(
                    function()
                    {
                        promise.succeed(promise);
                    },
                    function(ex)
                    {
                        promise.fail(ex, promise);
                    }
                );
                return promise;
            },
            applyOverrides: function(endpts)
            {
                var defaultsAndOverrides = this._instance.defaultsAndOverrides();
                var endpoints = [];
                for(var i = 0; i < endpts.length; ++i)
                {
                    var endpoint = endpts[i];
        
                    //
                    // Modify endpoints with overrides.
                    //
                    if(defaultsAndOverrides.overrideTimeout)
                    {
                        endpoints.push(endpoint.changeTimeout(defaultsAndOverrides.overrideTimeoutValue));
                    }
                    else
                    {
                        endpoints.push(endpoint);
                    }
                }
        
                return endpoints;
            },
            findConnectionByEndpoint: function(endpoints, compress)
            {
                if(this._destroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                var defaultsAndOverrides = this._instance.defaultsAndOverrides();
                Debug.assert(endpoints.length > 0);
        
                for(var i = 0; i < endpoints.length; ++i)
                {
                    var endpoint = endpoints[i];
        
                    if(this._pending.has(endpoint))
                    {
                        continue;
                    }
        
                    var connectionList = this._connectionsByEndpoint.get(endpoint);
                    if(connectionList === undefined)
                    {
                        continue;
                    }
        
                    for(var j = 0; j < connectionList.length; ++j)
                    {
                        if(connectionList[j].isActiveOrHolding()) // Don't return destroyed or un-validated connections
                        {
                            if(defaultsAndOverrides.overrideCompress)
                            {
                                compress.value = defaultsAndOverrides.overrideCompressValue;
                            }
                            else
                            {
                                compress.value = endpoint.compress();
                            }
                            return connectionList[j];
                        }
                    }
                }
        
                return null;
            },
            incPendingConnectCount: function()
            {
                //
                // Keep track of the number of pending connects. The outgoing connection factory
                // waitUntilFinished() method waits for all the pending connects to terminate before
                // to return. This ensures that the communicator client thread pool isn't destroyed
                // too soon and will still be available to execute the ice_exception() callbacks for
                // the asynchronous requests waiting on a connection to be established.
                //
        
                if(this._destroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
                ++this._pendingConnectCount;
            },
            decPendingConnectCount: function()
            {
                --this._pendingConnectCount;
                Debug.assert(this._pendingConnectCount >= 0);
                if(this._destroyed && this._pendingConnectCount === 0)
                {
                    this.checkFinished();
                }
            },
            getConnection: function(endpoints, cb, compress)
            {
                if(this._destroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                //
                // Reap closed connections
                //
                var cons = this._monitor.swapReapedConnections();
                if(cons !== null)
                {
                    for(var i = 0; i < cons.length; ++i)
                    {
                        var c = cons[i];
                        this._connectionsByEndpoint.removeConnection(c.endpoint(), c);
                        this._connectionsByEndpoint.removeConnection(c.endpoint().changeCompress(true), c);
                    }
                }
        
                //
                // Try to get the connection.
                //
                while(true)
                {
                    if(this._destroyed)
                    {
                        throw new Ice.CommunicatorDestroyedException();
                    }
        
                    //
                    // Search for a matching connection. If we find one, we're done.
                    //
                    var connection = this.findConnectionByEndpoint(endpoints, compress);
                    if(connection !== null)
                    {
                        return connection;
                    }
        
                    if(this.addToPending(cb, endpoints))
                    {
                        //
                        // A connection is already pending.
                        //
                        return null;
                    }
                    else
                    {
                        //
                        // No connection is currently pending to one of our endpoints, so we
                        // get out of this loop and start the connection establishment to one of the
                        // given endpoints.
                        //
                        break;
                    }
                }
        
                //
                // At this point, we're responsible for establishing the connection to one of
                // the given endpoints. If it's a non-blocking connect, calling nextEndpoint
                // will start the connection establishment. Otherwise, we return null to get
                // the caller to establish the connection.
                //
                cb.nextEndpoint();
        
                return null;
            },
            createConnection: function(transceiver, endpoint)
            {
                Debug.assert(this._pending.has(endpoint) && transceiver !== null);
        
                //
                // Create and add the connection to the connection map. Adding the connection to the map
                // is necessary to support the interruption of the connection initialization and validation
                // in case the communicator is destroyed.
                //
                var connection = null;
                try
                {
                    if(this._destroyed)
                    {
                        throw new Ice.CommunicatorDestroyedException();
                    }
        
                    connection = new ConnectionI(this._communicator, this._instance, this._monitor, transceiver,
                                                endpoint.changeCompress(false), false, null);
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        try
                        {
                            transceiver.close();
                        }
                        catch(exc)
                        {
                            // Ignore
                        }
                    }
                    throw ex;
                }
        
                this._connectionsByEndpoint.set(connection.endpoint(), connection);
                this._connectionsByEndpoint.set(connection.endpoint().changeCompress(true), connection);
                return connection;
            },
            finishGetConnection: function(endpoints, endpoint, connection, cb)
            {
                // cb is-a ConnectCallback
        
                var connectionCallbacks = [];
                if(cb !== null)
                {
                    connectionCallbacks.push(cb);
                }
        
                var i;
                var cc;
                var callbacks = [];
                for(i = 0; i < endpoints.length; ++i)
                {
                    var endpt = endpoints[i];
                    var cbs = this._pending.get(endpt);
                    if(cbs !== undefined)
                    {
                        this._pending.delete(endpt);
                        for(var j = 0; j < cbs.length; ++j)
                        {
                            cc = cbs[j];
                            if(cc.hasEndpoint(endpoint))
                            {
                                if(connectionCallbacks.indexOf(cc) === -1)
                                {
                                    connectionCallbacks.push(cc);
                                }
                            }
                            else
                            {
                                if(callbacks.indexOf(cc) === -1)
                                {
                                    callbacks.push(cc);
                                }
                            }
                        }
                    }
                }
        
                for(i = 0; i < connectionCallbacks.length; ++i)
                {
                    cc = connectionCallbacks[i];
                    cc.removeFromPending();
                    var idx = callbacks.indexOf(cc);
                    if(idx !== -1)
                    {
                        callbacks.splice(idx, 1);
                    }
                }
                for(i = 0; i < callbacks.length; ++i)
                {
                    cc = callbacks[i];
                    cc.removeFromPending();
                }
        
                var compress;
                var defaultsAndOverrides = this._instance.defaultsAndOverrides();
                if(defaultsAndOverrides.overrideCompress)
                {
                    compress = defaultsAndOverrides.overrideCompressValue;
                }
                else
                {
                    compress = endpoint.compress();
                }
        
                for(i = 0; i < callbacks.length; ++i)
                {
                    cc = callbacks[i];
                    cc.getConnection();
                }
                for(i = 0; i < connectionCallbacks.length; ++i)
                {
                    cc = connectionCallbacks[i];
                    cc.setConnection(connection, compress);
                }
        
                this.checkFinished();
            },
            finishGetConnectionEx: function(endpoints, ex, cb)
            {
                // cb is-a ConnectCallback
        
                var failedCallbacks = [];
                if(cb !== null)
                {
                    failedCallbacks.push(cb);
                }
                var i;
                var cc;
                var callbacks = [];
                for(i = 0; i < endpoints.length; ++i)
                {
                    var endpt = endpoints[i];
                    var cbs = this._pending.get(endpt);
                    if(cbs !== undefined)
                    {
                        this._pending.delete(endpt);
                        for(var j = 0; j < cbs.length; ++j)
                        {
                            cc = cbs[j];
                            if(cc.removeEndpoints(endpoints))
                            {
                                if(failedCallbacks.indexOf(cc) === -1)
                                {
                                    failedCallbacks.push(cc);
                                }
                            }
                            else
                            {
                                if(callbacks.indexOf(cc) === -1)
                                {
                                    callbacks.push(cc);
                                }
                            }
                        }
                    }
                }
        
                for(i = 0; i < callbacks.length; ++i)
                {
                    cc = callbacks[i];
                    Debug.assert(failedCallbacks.indexOf(cc) === -1);
                    cc.removeFromPending();
                }
                this.checkFinished();
        
                for(i = 0; i < callbacks.length; ++i)
                {
                    cc = callbacks[i];
                    cc.getConnection();
                }
                for(i = 0; i < failedCallbacks.length; ++i)
                {
                    cc = failedCallbacks[i];
                    cc.setException(ex);
                }
            },
            addToPending: function(cb, endpoints)
            {
                // cb is-a ConnectCallback
        
                //
                // Add the callback to each pending list.
                //
                var found = false;
                var p;
                var i;
                if(cb !== null)
                {
                    for(i = 0; i < endpoints.length; ++i)
                    {
                        p = endpoints[i];
                        var cbs = this._pending.get(p);
                        if(cbs !== undefined)
                        {
                            found = true;
                            if(cbs.indexOf(cb) === -1)
                            {
                                cbs.push(cb); // Add the callback to each pending endpoint.
                            }
                        }
                    }
                }
        
                if(found)
                {
                    return true;
                }
        
                //
                // If there's no pending connection for the given endpoints, we're
                // responsible for its establishment. We add empty pending lists,
                // other callbacks to the same endpoints will be queued.
                //
                for(i = 0; i < endpoints.length; ++i)
                {
                    p = endpoints[i];
                    if(!this._pending.has(p))
                    {
                        this._pending.set(p, []);
                    }
                }
        
                return false;
            },
            removeFromPending: function(cb, endpoints)
            {
                // cb is-a ConnectCallback
        
                for(var i = 0; i < endpoints.length; ++i)
                {
                    var p = endpoints[i];
                    var cbs = this._pending.get(p);
                    if(cbs !== undefined)
                    {
                        var idx = cbs.indexOf(cb);
                        if(idx !== -1)
                        {
                            cbs.splice(idx, 1);
                        }
                    }
                }
            },
            handleConnectionException: function(ex, hasMore)
            {
                var traceLevels = this._instance.traceLevels();
                if(traceLevels.retry >= 2)
                {
                    var s = [];
                    s.push("connection to endpoint failed");
                    if(ex instanceof Ice.CommunicatorDestroyedException)
                    {
                        s.push("\n");
                    }
                    else
                    {
                        if(hasMore)
                        {
                            s.push(", trying next endpoint\n");
                        }
                        else
                        {
                            s.push(" and no more endpoints to try\n");
                        }
                    }
                    s.push(ex.toString());
                    this._instance.initializationData().logger.trace(traceLevels.retryCat, s.join(""));
                }
            },
            handleException: function(ex, hasMore)
            {
                var traceLevels = this._instance.traceLevels();
                if(traceLevels.retry >= 2)
                {
                    var s = [];
                    s.push("couldn't resolve endpoint host");
                    if(ex instanceof Ice.CommunicatorDestroyedException)
                    {
                        s.push("\n");
                    }
                    else
                    {
                        if(hasMore)
                        {
                            s.push(", trying next endpoint\n");
                        }
                        else
                        {
                            s.push(" and no more endpoints to try\n");
                        }
                    }
                    s.push(ex.toString());
                    this._instance.initializationData().logger.trace(traceLevels.retryCat, s.join(""));
                }
            },
            checkFinished: function()
            {
                //
                // Can't continue until the factory is destroyed and there are no pending connections.
                //
                if(!this._waitPromise || !this._destroyed || this._pending.size > 0 || this._pendingConnectCount > 0)
                {
                    return;
                }
        
                var self = this;
                Promise.all(
                    self._connectionsByEndpoint.map(
                        function(connection)
                        {
                            return connection.waitUntilFinished().exception(function(ex)
                                                                            {
                                                                                Debug.assert(false);
                                                                            });
                        }
                    )
                ).then(
                    function()
                    {
                        var cons = self._monitor.swapReapedConnections();
                        if(cons !== null)
                        {
                            var arr = [];
                            for(var e = self._connectionsByEndpoint.entries; e !== null; e = e.next)
                            {
                                var connectionList = e.value;
                                for(var i = 0; i < connectionList.length; ++i)
                                {
                                    if(arr.indexOf(connectionList[i]) === -1)
                                    {
                                        arr.push(connectionList[i]);
                                    }
                                }
                            }
                            Debug.assert(cons.length === arr.length);
                            self._connectionsByEndpoint.clear();
                        }
                        else
                        {
                            Debug.assert(self._connectionsByEndpoint.size === 0);
                        }
        
                        Debug.assert(self._waitPromise !== null);
                        self._waitPromise.succeed();
                        self._monitor.destroy();
                    }
                );
            }
        });
        
        Ice.OutgoingConnectionFactory = OutgoingConnectionFactory;
        
        //
        // Value is a Vector<Ice.ConnectionI>
        //
        var ConnectionListMap = Class(HashMap, {
            __init__: function(h)
            {
                HashMap.call(this, h || HashMap.compareEquals);
            },
            set: function(key, value)
            {
                var list = this.get(key);
                if(list === undefined)
                {
                    list = [];
                    HashMap.prototype.set.call(this, key, list);
                }
                Debug.assert(value instanceof ConnectionI);
                list.push(value);
                return undefined;
            },
            removeConnection: function(key, conn)
            {
                var list = this.get(key);
                Debug.assert(list !== null);
                var idx = list.indexOf(conn);
                Debug.assert(idx !== -1);
                list.splice(idx, 1);
                if(list.length === 0)
                {
                    this.delete(key);
                }
            },
            map: function(fn)
            {
                var arr = [];
                this.forEach(function(c) { arr.push(fn(c)); });
                return arr;
            },
            forEach: function(fn)
            {
                for(var e = this._head; e !== null; e = e._next)
                {
                    for(var i = 0; i < e.value.length; ++i)
                    {
                        fn(e.value[i]);
                    }
                }
            }
        });
        
        var ConnectCallback = Class({
            __init__: function(f, endpoints, more, selType)
            {
                this._factory = f;
                this._endpoints = endpoints;
                this._hasMore = more;
                this._selType = selType;
                this._promise = new Promise();
                this._index = 0;
                this._current = null;
            },
            //
            // Methods from ConnectionI_StartCallback
            //
            connectionStartCompleted: function(connection)
            {
                connection.activate();
                this._factory.finishGetConnection(this._endpoints, this._current, connection, this);
            },
            connectionStartFailed: function(connection, ex)
            {
                Debug.assert(this._current !== null);
        
                if(ex instanceof Ice.LocalException)
                {
                    this._factory.handleConnectionException(ex, this._hasMore || this._index < this._endpoints.length);
                    if(ex instanceof Ice.CommunicatorDestroyedException) // No need to continue.
                    {
                        this._factory.finishGetConnectionEx(this._endpoints, ex, this);
                    }
                    else if(this._index < this._endpoints.length) // Try the next endpoint.
                    {
                        this.nextEndpoint();
                    }
                    else
                    {
                        this._factory.finishGetConnectionEx(this._endpoints, ex, this);
                    }
                }
                else
                {
                    this._factory.finishGetConnectionEx(this._endpoints, ex, this);
                }
            },
            setConnection: function(connection, compress)
            {
                //
                // Callback from the factory: the connection to one of the callback
                // connectors has been established.
                //
                this._promise.succeed(connection, compress);
                this._factory.decPendingConnectCount(); // Must be called last.
            },
            setException: function(ex)
            {
                //
                // Callback from the factory: connection establishment failed.
                //
                this._promise.fail(ex);
                this._factory.decPendingConnectCount(); // Must be called last.
            },
            hasEndpoint: function(endpt)
            {
                return this.findEndpoint(endpt) !== -1;
            },
            findEndpoint: function(endpt)
            {
                for(var index = 0; index < this._endpoints.length; ++index)
                {
                    if(endpt.equals(this._endpoints[index]))
                    {
                        return index;
                    }
                }
                return -1;
            },
            removeEndpoints: function(endpoints)
            {
                for(var i = 0; i < endpoints.length; ++i)
                {
                    var idx = this.findEndpoint(endpoints[i]);
                    if(idx !== -1)
                    {
                        this._endpoints.splice(idx, 1);
                    }
                }
                this._index = 0;
                return this._endpoints.length === 0;
            },
            removeFromPending: function()
            {
                this._factory.removeFromPending(this, this._endpoints);
            },
            start: function()
            {
                try
                {
                    //
                    // Notify the factory that there's an async connect pending. This is necessary
                    // to prevent the outgoing connection factory to be destroyed before all the
                    // pending asynchronous connects are finished.
                    //
                    this._factory.incPendingConnectCount();
                }
                catch(ex)
                {
                    this._promise.fail(ex);
                    return;
                }
        
                this.getConnection();
                return this._promise;
            },
            getConnection: function()
            {
                try
                {
                    //
                    // Ask the factory to get a connection.
                    //
                    var compress = { value: false };
                    var connection = this._factory.getConnection(this._endpoints, this, compress);
                    if(connection === null)
                    {
                        //
                        // A null return value from getConnection indicates that the connection
                        // is being established and that everthing has been done to ensure that
                        // the callback will be notified when the connection establishment is
                        // done.
                        //
                        return;
                    }
        
                    this._promise.succeed(connection, compress.value);
                    this._factory.decPendingConnectCount(); // Must be called last.
                }
                catch(ex)
                {
                    this._promise.fail(ex);
                    this._factory.decPendingConnectCount(); // Must be called last.
                }
            },
            nextEndpoint: function()
            {
                var connection = null;
                var traceLevels = this._factory._instance.traceLevels();
                try
                {
                    Debug.assert(this._index < this._endpoints.length);
                    this._current = this._endpoints[this._index++];
        
                    if(traceLevels.network >= 2)
                    {
                        var s = [];
                        s.push("trying to establish ");
                        s.push(this._current.protocol());
                        s.push(" connection to ");
                        s.push(this._current.toConnectorString());
                        this._factory._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                    }
        
                    connection = this._factory.createConnection(this._current.connect(), this._current);
                    var self = this;
                    connection.start().then(
                        function()
                        {
                            self.connectionStartCompleted(connection);
                        },
                        function(ex)
                        {
                            self.connectionStartFailed(connection, ex);
                        });
                }
                catch(ex)
                {
                    if(traceLevels.network >= 2)
                    {
                        var s = [];
                        s.push("failed to establish ");
                        s.push(this._current.protocol());
                        s.push(" connection to ");
                        s.push(this._current.toString());
                        s.push(ex.toString());
                        this._factory._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                    }
        
                    this.connectionStartFailed(connection, ex);
                }
            }
        });
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Debug = Ice.Debug;
        var HashMap = Ice.HashMap;
        var Promise = Ice.Promise;
        var Protocol = Ice.Protocol;
        var LocatorRegistryPrx = Ice.LocatorRegisterPrx;
        
        var  Class = Ice.Class;
        
        var LocatorInfo = Class({
            __init__: function(locator, table, background)
            {
                this._locator = locator;
                this._locatorRegistry = null;
                this._table = table;
                this._background = background;
        
                this._adapterRequests = new HashMap(); // Map<String, Request>
                this._objectRequests = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, Request>
            },
            destroy: function()
            {
                this._locatorRegistry = null;
                this._table.clear();
            },
            equals: function(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
        
                if(rhs instanceof LocatorInfo)
                {
                    return this._locator.equals(rhs._locator);
                }
        
                return false;
            },
            hashCode: function()
            {
                return this._locator.hashCode();
            },
            getLocator: function()
            {
                return this._locator;
            },
            getLocatorRegistry: function()
            {
                if(this._locatorRegistry !== null)
                {
                    return new Promise().succeed(this._locatorRegistry);
                }
        
                var self = this;
                return this._locator.getRegistry().then(
                    function(reg)
                    {
                        //
                        // The locator registry can't be located. We use ordered
                        // endpoint selection in case the locator returned a proxy
                        // with some endpoints which are prefered to be tried first.
                        //
                        self._locatorRegistry = LocatorRegistryPrx.uncheckedCast(reg.ice_locator(null).ice_endpointSelection(
                            Ice.EndpointSelectionType.Ordered));
                        return self._locatorRegistry;
                    });
            },
            getEndpoints: function(ref, wellKnownRef, ttl, p)
            {
                var promise = p || new Promise(); // success callback receives (endpoints, cached)
        
                Debug.assert(ref.isIndirect());
                var endpoints = null;
                var cached = { value: false };
                if(!ref.isWellKnown())
                {
                    endpoints = this._table.getAdapterEndpoints(ref.getAdapterId(), ttl, cached);
                    if(!cached.value)
                    {
                        if(this._background && endpoints !== null)
                        {
                            this.getAdapterRequest(ref).addCallback(ref, wellKnownRef, ttl, null);
                        }
                        else
                        {
                            this.getAdapterRequest(ref).addCallback(ref, wellKnownRef, ttl, promise);
                            return promise;
                        }
                    }
                }
                else
                {
                    var r = this._table.getObjectReference(ref.getIdentity(), ttl, cached);
                    if(!cached.value)
                    {
                        if(this._background && r !== null)
                        {
                            this.getObjectRequest(ref).addCallback(ref, null, ttl, null);
                        }
                        else
                        {
                            this.getObjectRequest(ref).addCallback(ref, null, ttl, promise);
                            return promise;
                        }
                    }
        
                    if(!r.isIndirect())
                    {
                        endpoints = r.getEndpoints();
                    }
                    else if(!r.isWellKnown())
                    {
                        this.getEndpoints(r, ref, ttl, promise);
                        return promise;
                    }
                }
        
                Debug.assert(endpoints !== null);
                if(ref.getInstance().traceLevels().location >= 1)
                {
                    this.getEndpointsTrace(ref, endpoints, true);
                }
                promise.succeed(endpoints, true);
        
                return promise;
            },
            clearCache: function(ref)
            {
                Debug.assert(ref.isIndirect());
        
                if(!ref.isWellKnown())
                {
                    var endpoints = this._table.removeAdapterEndpoints(ref.getAdapterId());
        
                    if(endpoints !== null && ref.getInstance().traceLevels().location >= 2)
                    {
                        this.trace("removed endpoints from locator table\n", ref, endpoints);
                    }
                }
                else
                {
                    var r =  this._table.removeObjectReference(ref.getIdentity());
                    if(r !== null)
                    {
                        if(!r.isIndirect())
                        {
                            if(ref.getInstance().traceLevels().location >= 2)
                            {
                                this.trace("removed endpoints from locator table", ref, r.getEndpoints());
                            }
                        }
                        else if(!r.isWellKnown())
                        {
                            this.clearCache(r);
                        }
                    }
                }
            },
            trace: function(msg, ref, endpoints)
            {
                Debug.assert(ref.isIndirect());
        
                var s = [];
                s.push(msg);
                s.push("\n");
                if(!ref.isWellKnown())
                {
                    s.push("adapter = ");
                    s.push(ref.getAdapterId());
                    s.push("\n");
                }
                else
                {
                    s.push("object = ");
                    s.push(ref.getInstance().identityToString(ref.getIdentity()));
                    s.push("\n");
                }
        
                s.push("endpoints = ");
                for(var i = 0; i < endpoints.length; i++)
                {
                    s.push(endpoints[i].toString());
                    if(i + 1 < endpoints.length)
                    {
                        s.push(":");
                    }
                }
        
                ref.getInstance().initializationData().logger.trace(ref.getInstance().traceLevels().locationCat, s.join(""));
            },
            getEndpointsException: function(ref, exc)
            {
                Debug.assert(ref.isIndirect());
        
                var instance = ref.getInstance();
                var s, e;
                try
                {
                    throw exc;
                }
                catch(ex)
                {
                    if(ex instanceof Ice.AdapterNotFoundException)
                    {
                        if(instance.traceLevels().location >= 1)
                        {
                            s = [];
                            s.push("adapter not found\n");
                            s.push("adapter = ");
                            s.push(ref.getAdapterId());
                            instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                        }
        
                        e = new Ice.NotRegisteredException();
                        e.kindOfObject = "object adapter";
                        e.id = ref.getAdapterId();
                        throw e;
                    }
                    else if(ex instanceof Ice.ObjectNotFoundException)
                    {
                        if(instance.traceLevels().location >= 1)
                        {
                            s = [];
                            s.push("object not found\n");
                            s.push("object = ");
                            s.push(instance.identityToString(ref.getIdentity()));
                            instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                        }
        
                        e = new Ice.NotRegisteredException();
                        e.kindOfObject = "object";
                        e.id = instance.identityToString(ref.getIdentity());
                        throw e;
                    }
                    else if(ex instanceof Ice.NotRegisteredException)
                    {
                        throw ex;
                    }
                    else if(ex instanceof Ice.LocalException)
                    {
                        if(instance.traceLevels().location >= 1)
                        {
                            s = [];
                            s.push("couldn't contact the locator to retrieve adapter endpoints\n");
                            if(ref.getAdapterId().length > 0)
                            {
                                s.push("adapter = ");
                                s.push(ref.getAdapterId());
                                s.push("\n");
                            }
                            else
                            {
                                s.push("object = ");
                                s.push(instance.identityToString(ref.getIdentity()));
                                s.push("\n");
                            }
                            s.push("reason = " + ex.toString());
                            instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                        }
                        throw ex;
                    }
                    else
                    {
                        Debug.assert(false);
                    }
                }
            },
            getEndpointsTrace: function(ref, endpoints, cached)
            {
                if(endpoints !== null && endpoints.length > 0)
                {
                    if(cached)
                    {
                        this.trace("found endpoints in locator table", ref, endpoints);
                    }
                    else
                    {
                        this.trace("retrieved endpoints from locator, adding to locator table", ref, endpoints);
                    }
                }
                else
                {
                    var instance = ref.getInstance();
                    var s = [];
                    s.push("no endpoints configured for ");
                    if(ref.getAdapterId().length > 0)
                    {
                        s.push("adapter\n");
                        s.push("adapter = ");
                        s.push(ref.getAdapterId());
                        s.push("\n");
                    }
                    else
                    {
                        s.push("object\n");
                        s.push("object = ");
                        s.push(instance.identityToString(ref.getIdentity()));
                        s.push("\n");
                    }
                    instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                }
            },
            getAdapterRequest: function(ref)
            {
                if(ref.getInstance().traceLevels().location >= 1)
                {
                    var instance = ref.getInstance();
                    var s = [];
                    s.push("searching for adapter by id\n");
                    s.push("adapter = ");
                    s.push(ref.getAdapterId());
                    instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                }
        
                var request = this._adapterRequests.get(ref.getAdapterId());
                if(request !== undefined)
                {
                    return request;
                }
                request = new AdapterRequest(this, ref);
                this._adapterRequests.set(ref.getAdapterId(), request);
                return request;
            },
            getObjectRequest: function(ref)
            {
                if(ref.getInstance().traceLevels().location >= 1)
                {
                    var instance = ref.getInstance();
                    var s = [];
                    s.push("searching for object by id\n");
                    s.push("object = ");
                    s.push(instance.identityToString(ref.getIdentity()));
                    instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                }
        
                var request = this._objectRequests.get(ref.getIdentity());
                if(request !== undefined)
                {
                    return request;
                }
                request = new ObjectRequest(this, ref);
                this._objectRequests.set(ref.getIdentity(), request);
                return request;
            },
            finishRequest: function(ref, wellKnownRefs, proxy, notRegistered)
            {
                if(proxy === null || proxy.__reference().isIndirect())
                {
                    //
                    // Remove the cached references of well-known objects for which we tried
                    // to resolved the endpoints if these endpoints are empty.
                    //
                    for(var i = 0; i < wellKnownRefs.length; ++i)
                    {
                        this._table.removeObjectReference(wellKnownRefs[i].getIdentity());
                    }
                }
        
                if(!ref.isWellKnown())
                {
                    if(proxy !== null && !proxy.__reference().isIndirect())
                    {
                        // Cache the adapter endpoints.
                        this._table.addAdapterEndpoints(ref.getAdapterId(), proxy.__reference().getEndpoints());
                    }
                    else if(notRegistered) // If the adapter isn't registered anymore, remove it from the cache.
                    {
                        this._table.removeAdapterEndpoints(ref.getAdapterId());
                    }
        
                    Debug.assert(this._adapterRequests.has(ref.getAdapterId()));
                    this._adapterRequests.delete(ref.getAdapterId());
                }
                else
                {
                    if(proxy !== null && !proxy.__reference().isWellKnown())
                    {
                        // Cache the well-known object reference.
                        this._table.addObjectReference(ref.getIdentity(), proxy.__reference());
                    }
                    else if(notRegistered) // If the well-known object isn't registered anymore, remove it from the cache.
                    {
                        this._table.removeObjectReference(ref.getIdentity());
                    }
        
                    Debug.assert(this._objectRequests.has(ref.getIdentity()));
                    this._objectRequests.delete(ref.getIdentity());
                }
            }
        });
        
        Ice.LocatorInfo = LocatorInfo;
        
        var RequestCallback = Class({
            __init__: function(ref, ttl, promise)
            {
                this._ref = ref;
                this._ttl = ttl;
                this._promise = promise;
            },
            response: function(locatorInfo, proxy)
            {
                var endpoints = null;
                if(proxy !== null)
                {
                    var r = proxy.__reference();
                    if(this._ref.isWellKnown() && !Protocol.isSupported(this._ref.getEncoding(), r.getEncoding()))
                    {
                        //
                        // If a well-known proxy and the returned proxy
                        // encoding isn't supported, we're done: there's
                        // no compatible endpoint we can use.
                        //
                    }
                    else if(!r.isIndirect())
                    {
                        endpoints = r.getEndpoints();
                    }
                    else if(this._ref.isWellKnown() && !r.isWellKnown())
                    {
                        //
                        // We're resolving the endpoints of a well-known object and the proxy returned
                        // by the locator is an indirect proxy. We now need to resolve the endpoints
                        // of this indirect proxy.
                        //
                        var self = this;
                        locatorInfo.getEndpoints(r, this._ref, this._ttl).then(
                            function(endpts, b)
                            {
                                if(self._promise !== null)
                                {
                                    self._promise.succeed(endpts, b);
                                }
                            },
                            function(ex)
                            {
                                if(self._promise !== null)
                                {
                                    self._promise.fail(ex);
                                }
                            });
                        return;
                    }
                }
        
                if(this._ref.getInstance().traceLevels().location >= 1)
                {
                    locatorInfo.getEndpointsTrace(this._ref, endpoints, false);
                }
        
                if(this._promise !== null)
                {
                    this._promise.succeed(endpoints === null ? [] : endpoints, false);
                }
            },
            exception: function(locatorInfo, exc)
            {
                try
                {
                    locatorInfo.getEndpointsException(this._ref, exc); // This throws.
                }
                catch(ex)
                {
                    if(this._promise !== null)
                    {
                        this._promise.fail(ex);
                    }
                }
            }
        });
        
        var Request = Class({
            __init__: function(locatorInfo, ref)
            {
                this._locatorInfo = locatorInfo;
                this._ref = ref;
        
                this._callbacks = []; // Array<RequestCallback>
                this._wellKnownRefs = []; // Array<Reference>
                this._sent = false;
                this._response = false;
                this._proxy = null;
                this._exception = null;
            },
            addCallback: function(ref, wellKnownRef, ttl, promise)
            {
                var callback = new RequestCallback(ref, ttl, promise);
                if(this._response)
                {
                    callback.response(this._locatorInfo, this._proxy);
                }
                else if(this._exception !== null)
                {
                    callback.exception(this._locatorInfo, this._exception);
                }
                else
                {
                    this._callbacks.push(callback);
                    if(wellKnownRef !== null) // This request is to resolve the endpoints of a cached well-known object ref
                    {
                        this._wellKnownRefs.push(wellKnownRef);
                    }
                    if(!this._sent)
                    {
                        this._sent = true;
                        this.send();
                    }
                }
            },
            response: function(proxy)
            {
                this._locatorInfo.finishRequest(this._ref, this._wellKnownRefs, proxy, false);
                this._response = true;
                this._proxy = proxy;
                for(var i = 0; i < this._callbacks.length; ++i)
                {
                    this._callbacks[i].response(this._locatorInfo, proxy);
                }
            },
            exception: function(ex)
            {
                this._locatorInfo.finishRequest(this._ref, this._wellKnownRefs, null, ex instanceof Ice.UserException);
                this._exception = ex;
                for(var i = 0; i < this._callbacks.length; ++i)
                {
                    this._callbacks[i].exception(this._locatorInfo, ex);
                }
            }
        });
        
        var ObjectRequest = Class(Request, {
            __init__: function(locatorInfo, reference)
            {
                Request.call(this, locatorInfo, reference);
                Debug.assert(reference.isWellKnown());
            },
            send: function()
            {
                try
                {
                    var self = this;
                    this._locatorInfo.getLocator().findObjectById(this._ref.getIdentity()).then(
                        function(proxy)
                        {
                            self.response(proxy);
                        },
                        function(ex)
                        {
                            self.exception(ex);
                        });
                }
                catch(ex)
                {
                    this.exception(ex);
                }
            }
        });
        
        var AdapterRequest = Class(Request, {
            __init__: function(locatorInfo, reference)
            {
                Request.call(this, locatorInfo, reference);
                Debug.assert(reference.isIndirect());
            },
            send: function()
            {
                try
                {
                    var self = this;
                    this._locatorInfo.getLocator().findAdapterById(this._ref.getAdapterId()).then(
                        function(proxy)
                        {
                            self.response(proxy);
                        },
                        function(ex)
                        {
                            self.exception(ex);
                        });
                }
                catch(ex)
                {
                    this.exception(ex);
                }
            }
        });
        
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        
        var AsyncResultBase = Ice.AsyncResultBase;
        var Debug = Ice.Debug;
        var Identity = Ice.Identity;
        var Promise = Ice.Promise;
        var PropertyNames = Ice.PropertyNames;
        var ServantManager = Ice.ServantManager;
        var StringUtil = Ice.StringUtil;
        
        var _suffixes =
        [
            "ACM",
            "AdapterId",
            "Endpoints",
            "Locator",
            "Locator.EncodingVersion",
            "Locator.EndpointSelection",
            "Locator.ConnectionCached",
            "Locator.PreferSecure",
            "Locator.CollocationOptimized",
            "Locator.Router",
            "MessageSizeMax",
            "PublishedEndpoints",
            "RegisterProcess",
            "ReplicaGroupId",
            "Router",
            "Router.EncodingVersion",
            "Router.EndpointSelection",
            "Router.ConnectionCached",
            "Router.PreferSecure",
            "Router.CollocationOptimized",
            "Router.Locator",
            "Router.Locator.EndpointSelection",
            "Router.Locator.ConnectionCached",
            "Router.Locator.PreferSecure",
            "Router.Locator.CollocationOptimized",
            "Router.Locator.LocatorCacheTimeout",
            "Router.Locator.InvocationTimeout",
            "Router.LocatorCacheTimeout",
            "Router.InvocationTimeout",
            "ProxyOptions",
            "ThreadPool.Size",
            "ThreadPool.SizeMax",
            "ThreadPool.SizeWarn",
            "ThreadPool.StackSize",
            "ThreadPool.Serialize"
        ];
        
        var StateUninitialized = 0; // Just constructed.
        //var StateHeld = 1;
        //var StateWaitActivate = 2;
        //var StateActive = 3;
        //var StateDeactivating = 4;
        var StateDeactivated = 5;
        var StateDestroyed  = 6;
        
        //
        // Only for use by IceInternal.ObjectAdapterFactory
        //
        var ObjectAdapterI = Ice.Class({
            __init__: function(instance, communicator, objectAdapterFactory, name, router, noConfig, promise)
            {
                this._instance = instance;
                this._communicator = communicator;
                this._objectAdapterFactory = objectAdapterFactory;
                this._servantManager = new ServantManager(instance, name);
                this._name = name;
                this._routerEndpoints = [];
                this._routerInfo = null;
                this._state = StateUninitialized;
                this._noConfig = noConfig;
        
                if(this._noConfig)
                {
                    this._reference = this._instance.referenceFactory().createFromString("dummy -t", "");
                    this._messageSizeMax = this._instance.messageSizeMax();
                    promise.succeed(this, promise);
                    return;
                }
        
                var properties = this._instance.initializationData().properties;
                var unknownProps = [];
                var noProps = this.filterProperties(unknownProps);
        
                //
                // Warn about unknown object adapter properties.
                //
                if(unknownProps.length !== 0 && properties.getPropertyAsIntWithDefault("Ice.Warn.UnknownProperties", 1) > 0)
                {
                    var message = ["found unknown properties for object adapter `" + name + "':"];
                    for(var i = 0; i < unknownProps.length; ++i)
                    {
                        message.push("\n    " + unknownProps[i]);
                    }
                    this._instance.initializationData().logger.warning(message.join(""));
                }
        
                //
                // Make sure named adapter has some configuration.
                //
                if(router === null && noProps)
                {
                    var ex = new Ice.InitializationException();
                    ex.reason = "object adapter `" + this._name + "' requires configuration";
                    throw ex;
                }
                
                //
                // Setup a reference to be used to get the default proxy options
                // when creating new proxies. By default, create twoway proxies.
                //
                var proxyOptions = properties.getPropertyWithDefault(this._name + ".ProxyOptions", "-t");
                try
                {
                    this._reference = this._instance.referenceFactory().createFromString("dummy " + proxyOptions, "");
                }
                catch(e)
                {
                    if(e instanceof Ice.ProxyParseException)
                    {
                        var ex = new Ice.InitializationException();
                        ex.reason = "invalid proxy options `" + proxyOptions + "' for object adapter `" + name + "'";
                        throw ex;
                    }
                    else
                    {
                        throw e;
                    }
                }
        
                {
                    var defaultMessageSizeMax = this._instance.messageSizeMax() / 1024;
                    var num = properties.getPropertyAsIntWithDefault(this._name + ".MessageSizeMax", defaultMessageSizeMax);
                    if(num < 1 || num > 0x7fffffff / 1024)
                    {
                        this._messageSizeMax = 0x7fffffff;
                    }
                    else
                    {
                        this._messageSizeMax = num * 1024; // Property is in kilobytes, _messageSizeMax in bytes
                    }
                }
        
                try
                {
                    
                    if(router === null)
                    {
                        router = Ice.RouterPrx.uncheckedCast(
                            this._instance.proxyFactory().propertyToProxy(this._name + ".Router"));
                    }
                    if(router !== null)
                    {
                        this._routerInfo = this._instance.routerManager().find(router);
                        Debug.assert(this._routerInfo !== null);
        
                        //
                        // Make sure this router is not already registered with another adapter.
                        //
                        if(this._routerInfo.getAdapter() !== null)
                        {
                            throw new Ice.AlreadyRegisteredException(
                                "object adapter with router",
                                this._instance.identityToString(router.ice_getIdentity()));
                        }
                        
                        //
                        // Add the router's server proxy endpoints to this object
                        // adapter.
                        //
                        var self = this;
                        this._routerInfo.getServerEndpoints().then(
                            function(endpoints)
                            {
                                var i;
                                    
                                for(i = 0; i < endpoints.length; ++i)
                                {
                                    self._routerEndpoints.push(endpoints[i]);
                                }
                                self._routerEndpoints.sort(     // Must be sorted.
                                    function(e1, e2)
                                    {
                                        return e1.compareTo(e2);
                                    });
                                
                                //
                                // Remove duplicate endpoints, so we have a list of unique
                                // endpoints.
                                //
                                for(i = 0; i < self._routerEndpoints.length - 1;)
                                {
                                    var e1 = self._routerEndpoints[i];
                                    var e2 = self._routerEndpoints[i + 1];
                                    if(e1.equals(e2))
                                    {
                                        self._routerEndpoints.splice(i, 1);
                                    }
                                    else
                                    {
                                        ++i;
                                    }
                                }
                                
                                //
                                // Associate this object adapter with the router. This way,
                                // new outgoing connections to the router's client proxy will
                                // use this object adapter for callbacks.
                                //
                                self._routerInfo.setAdapter(self);
                                
                                //
                                // Also modify all existing outgoing connections to the
                                // router's client proxy to use this object adapter for
                                // callbacks.
                                //
                                return self._instance.outgoingConnectionFactory().setRouterInfo(self._routerInfo);
                            }
                        ).then(
                            function()
                            {
                                promise.succeed(self, promise);
                            },
                            function(ex)
                            {
                                promise.fail(ex, promise);
                            });
                    }
                    else
                    {
                        var endpoints = properties.getProperty(this._name + ".Endpoints");
                        if(endpoints.length > 0)
                        {
                            throw new Ice.FeatureNotSupportedException("object adapter endpoints not supported");
                        }
                        promise.succeed(this, promise);
                    }
                }
                catch(ex)
                {
                    this.destroy();
                    throw ex;
                }
            },
            getName: function()
            {
                //
                // No mutex lock necessary, _name is immutable.
                //
                return this._noConfig ? "" : this._name;
            },
            getCommunicator: function()
            {
                return this._communicator;
            },
            activate: function()
            {
            },
            hold: function()
            {
                this.checkForDeactivation();
            },
            waitForHold: function()
            {
                var promise = new AsyncResultBase(this._communicator, "waitForHold", null, null, this);
                if(this.checkForDeactivation(promise))
                {
                    return promise;
                }
                return promise.succeed(promise);
            },
            deactivate: function()
            {
                var promise = new AsyncResultBase(this._communicator, "deactivate", null, null, this);
                if(this._state < StateDeactivated)
                {
                    this._state = StateDeactivated;
                    this._instance.outgoingConnectionFactory().removeAdapter(this);
                }
                return promise.succeed(promise);
            },
            waitForDeactivate: function()
            {
                var promise = new AsyncResultBase(this._communicator, "deactivate", null, null, this);
                return promise.succeed(promise);
            },
            isDeactivated: function()
            {
                return this._state >= StateDeactivated;
            },
            destroy: function()
            {
                var promise = new AsyncResultBase(this._communicator, "destroy", null, null, this);
                var self = this;
                var destroyInternal = function()
                {
                    if(self._state < StateDestroyed)
                    {
                        self._state = StateDestroyed;
                        self._servantManager.destroy();
                        self._objectAdapterFactory.removeObjectAdapter(self);
                    }
                    return promise.succeed(promise);
                };
        
                return this._state < StateDeactivated ? this.deactivate().then(destroyInternal) : destroyInternal();
            },
            add: function(object, ident)
            {
                return this.addFacet(object, ident, "");
            },
            addFacet: function(object, ident, facet)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
                this.checkServant(object);
        
                //
                // Create a copy of the Identity argument, in case the caller
                // reuses it.
                //
                var id = ident.clone();
        
                this._servantManager.addServant(object, id, facet);
        
                return this.newProxy(id, facet);
            },
            addWithUUID: function(object)
            {
                return this.addFacetWithUUID(object, "");
            },
            addFacetWithUUID: function(object, facet)
            {
                return this.addFacet(object, new Identity(Ice.generateUUID(), ""), facet);
            },
            addDefaultServant: function(servant, category)
            {
                this.checkServant(servant);
                this.checkForDeactivation();
        
                this._servantManager.addDefaultServant(servant, category);
            },
            remove: function(ident)
            {
                return this.removeFacet(ident, "");
            },
            removeFacet: function(ident, facet)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
        
                return this._servantManager.removeServant(ident, facet);
            },
            removeAllFacets: function(ident)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
        
                return this._servantManager.removeAllFacets(ident);
            },
            removeDefaultServant: function(category)
            {
                this.checkForDeactivation();
        
                return this._servantManager.removeDefaultServant(category);
            },
            find: function(ident)
            {
                return this.findFacet(ident, "");
            },
            findFacet: function(ident, facet)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
        
                return this._servantManager.findServant(ident, facet);
            },
            findAllFacets: function(ident)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
        
                return this._servantManager.findAllFacets(ident);
            },
            findByProxy: function(proxy)
            {
                this.checkForDeactivation();
        
                var ref = proxy.__reference();
                return this.findFacet(ref.getIdentity(), ref.getFacet());
            },
            findDefaultServant: function(category)
            {
                this.checkForDeactivation();
        
                return this._servantManager.findDefaultServant(category);
            },
            addServantLocator: function(locator, prefix)
            {
                this.checkForDeactivation();
        
                this._servantManager.addServantLocator(locator, prefix);
            },
            removeServantLocator: function(prefix)
            {
                this.checkForDeactivation();
        
                return this._servantManager.removeServantLocator(prefix);
            },
            findServantLocator: function(prefix)
            {
                this.checkForDeactivation();
        
                return this._servantManager.findServantLocator(prefix);
            },
            createProxy: function(ident)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
        
                return this.newProxy(ident, "");
            },
            createDirectProxy: function(ident)
            {
                return this.createProxy(ident);
            },
            createIndirectProxy: function(ident)
            {
                throw new Ice.FeatureNotSupportedException("setLocator not supported");
            },
            setLocator: function(locator)
            {
                throw new Ice.FeatureNotSupportedException("setLocator not supported");
            },
            refreshPublishedEndpoints: function()
            {
                throw new Ice.FeatureNotSupportedException("refreshPublishedEndpoints not supported");
            },
            getEndpoints: function()
            {
                return [];
            },
            getPublishedEndpoints: function()
            {
                return [];
            },
            getServantManager: function()
            {
                //
                // _servantManager is immutable.
                //
                return this._servantManager;
            },
            messageSizeMax: function()
            {
                return this._messageSizeMax;
            },
            newProxy: function(ident, facet)
            {
                var endpoints = [];
        
                //
                // Now we also add the endpoints of the router's server proxy, if
                // any. This way, object references created by this object adapter
                // will also point to the router's server proxy endpoints.
                //
                for(var i = 0; i < this._routerEndpoints.length; ++i)
                {
                    endpoints.push(this._routerEndpoints[i]);
                }
        
                //
                // Create a reference and return a proxy for this reference.
                //
                var ref = this._instance.referenceFactory().create(ident, facet, this._reference, endpoints);
                return this._instance.proxyFactory().referenceToProxy(ref);
            },
            checkForDeactivation: function(promise)
            {
                if(this._state >= StateDeactivated)
                {
                    var ex = new Ice.ObjectAdapterDeactivatedException();
                    ex.name = this.getName();
        
                    if(promise !== undefined)
                    {
                        promise.fail(ex, promise);
                        return true;
                    }
                    else
                    {
                        throw ex;
                    }
                }
        
                return false;
            },
            checkIdentity: function(ident)
            {
                if(ident.name === undefined || ident.name === null || ident.name.length === 0)
                {
                    throw new Ice.IllegalIdentityException(ident);
                }
        
                if(ident.category === undefined || ident.category === null)
                {
                    ident.category = "";
                }
            },
            checkServant: function(servant)
            {
                if(servant === undefined || servant === null)
                {
                    throw new Ice.IllegalServantException("cannot add null servant to Object Adapter");
                }
            },
            filterProperties: function(unknownProps)
            {
                //
                // Do not create unknown properties list if Ice prefix, i.e., Ice, Glacier2, etc.
                //
                var addUnknown = true, i;
                var prefix = this._name + ".";
                for(i = 0; i < PropertyNames.clPropNames.length; ++i)
                {
                    if(prefix.indexOf(PropertyNames.clPropNames[i] + ".") === 0)
                    {
                        addUnknown = false;
                        break;
                    }
                }
        
                var noProps = true;
                var props = this._instance.initializationData().properties.getPropertiesForPrefix(prefix);
                for(var e = props.entries; e !== null; e = e.next)
                {
                    var valid = false;
                    for(i = 0; i < _suffixes.length; ++i)
                    {
                        if(e.key === prefix + _suffixes[i])
                        {
                            noProps = false;
                            valid = true;
                            break;
                        }
                    }
        
                    if(!valid && addUnknown)
                    {
                        unknownProps.push(e.key);
                    }
                }
        
                return noProps;
            }
        });
        
        Ice.ObjectAdapterI = ObjectAdapterI;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var HashMap = Ice.HashMap;
        var LocatorInfo = Ice.LocatorInfo;
        var LocatorTable = Ice.LocatorTable;
        var LocatorPrx = Ice.LocatorPrx;
        
        var LocatorManager = Ice.Class({
            __init__: function(properties)
            {
                this._background = properties.getPropertyAsInt("Ice.BackgroundLocatorCacheUpdates") > 0;
        
                this._table = new HashMap(HashMap.compareEquals); // Map<Ice.LocatorPrx, LocatorInfo>
                this._locatorTables = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, LocatorTable>
            },
            destroy: function()
            {
                for(var e = this._table.entries; e !== null; e = e.next)
                {
                    e.value.destroy();
                }
                this._table.clear();
                this._locatorTables.clear();
            },
            //
            // Returns locator info for a given locator. Automatically creates
            // the locator info if it doesn't exist yet.
            //
            find: function(loc)
            {
                if(loc === null)
                {
                    return null;
                }
        
                //
                // The locator can't be located.
                //
                var locator = LocatorPrx.uncheckedCast(loc.ice_locator(null));
        
                //
                // TODO: reap unused locator info objects?
                //
        
                var info = this._table.get(locator);
                if(info === undefined)
                {
                    //
                    // Rely on locator identity for the adapter table. We want to
                    // have only one table per locator (not one per locator
                    // proxy).
                    //
                    var table = this._locatorTables.get(locator.ice_getIdentity());
                    if(table === undefined)
                    {
                        table = new LocatorTable();
                        this._locatorTables.set(locator.ice_getIdentity(), table);
                    }
        
                    info = new LocatorInfo(locator, table, this._background);
                    this._table.set(locator, info);
                }
        
                return info;
            }
        });
        
        Ice.LocatorManager = LocatorManager;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var AsyncResultBase = Ice.AsyncResultBase;
        var ObjectAdapterI = Ice.ObjectAdapterI;
        var Promise = Ice.Promise;
        
        //
        // Only for use by Instance.
        //
        var ObjectAdapterFactory = Ice.Class({
            __init__: function(instance, communicator)
            {
                this._instance = instance;
                this._communicator = communicator;
                this._adapters = [];
                this._adapterNamesInUse = [];
                this._shutdownPromise = new Promise();
            },
            shutdown: function()
            {
                //
                // Ignore shutdown requests if the object adapter factory has
                // already been shut down.
                //
                if(this._instance === null)
                {
                    return this._shutdownPromise;
                }
        
                this._instance = null;
                this._communicator = null;
                this._shutdownPromise = Promise.all(
                    this._adapters.map(function(adapter)
                                       {
                                           return adapter.deactivate();
                                       }));
                return this._shutdownPromise;
            },
            waitForShutdown: function()
            {
                var self = this;
                return this._shutdownPromise.then(
                    function()
                    {
                        return Promise.all(self._adapters.map(function(adapter)
                                                              {
                                                                  return adapter.waitForDeactivate();
                                                              }));
                    });
            },
            isShutdown: function()
            {
                return this._instance === null;
            },
            destroy: function()
            {
                var self = this;
                return this.waitForShutdown().then(
                    function()
                    {
                        return Promise.all(self._adapters.map(function(adapter)
                                                              {
                                                                  return adapter.destroy();
                                                              }));
                    });
            },
            createObjectAdapter: function(name, router, promise)
            {
                if(this._instance === null)
                {
                    throw new Ice.ObjectAdapterDeactivatedException();
                }
        
                var adapter = null;
                try
                {
                    if(name.length === 0)
                    {
                        var uuid = Ice.generateUUID();
                        adapter = new ObjectAdapterI(this._instance, this._communicator, this, uuid, null, true, promise);
                    }
                    else
                    {
                        if(this._adapterNamesInUse.indexOf(name) !== -1)
                        {
                            throw new Ice.AlreadyRegisteredException("object adapter", name);
                        }
                        adapter = new ObjectAdapterI(this._instance, this._communicator, this, name, router, false, promise);
                        this._adapterNamesInUse.push(name);
                    }
                    this._adapters.push(adapter);
                }
                catch(ex)
                {
                    promise.fail(ex, promise);
                }
            },
            removeObjectAdapter: function(adapter)
            {
                if(this._instance === null)
                {
                    return;
                }
        
                var n = this._adapters.indexOf(adapter);
                if(n !== -1)
                {
                    this._adapters.splice(n, 1);
                }
        
                n = this._adapterNamesInUse.indexOf(adapter.getName());
                if(n !== -1)
                {
                    this._adapterNamesInUse.splice(n, 1);
                }
            }
        });
        
        Ice.ObjectAdapterFactory = ObjectAdapterFactory;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Metrics.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
            Slice.defineDictionary(IceMX, "StringIntDict", "StringIntDictHelper", "Ice.StringHelper", "Ice.IntHelper", false, undefined, undefined);
        
            /**
             * The base class for metrics. A metrics object represents a
             * collection of measurements associated to a given a system.
             * 
             **/
            IceMX.Metrics = Slice.defineObject(
                function(id, total, current, totalLifetime, failures)
                {
                    Ice.Object.call(this);
                    this.id = id !== undefined ? id : "";
                    this.total = total !== undefined ? total : new Ice.Long(0, 0);
                    this.current = current !== undefined ? current : 0;
                    this.totalLifetime = totalLifetime !== undefined ? totalLifetime : new Ice.Long(0, 0);
                    this.failures = failures !== undefined ? failures : 0;
                },
                Ice.Object, undefined, 1,
                [
                    "::Ice::Object",
                    "::IceMX::Metrics"
                ],
                -1,
                function(__os)
                {
                    __os.writeString(this.id);
                    __os.writeLong(this.total);
                    __os.writeInt(this.current);
                    __os.writeLong(this.totalLifetime);
                    __os.writeInt(this.failures);
                },
                function(__is)
                {
                    this.id = __is.readString();
                    this.total = __is.readLong();
                    this.current = __is.readInt();
                    this.totalLifetime = __is.readLong();
                    this.failures = __is.readInt();
                },
                false);
        
            IceMX.MetricsPrx = Slice.defineProxy(Ice.ObjectPrx, IceMX.Metrics.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.Metrics, IceMX.MetricsPrx);
        
            /**
             * A structure to keep track of failures associated with a given
             * metrics.
             * 
             **/
            IceMX.MetricsFailures = Slice.defineStruct(
                function(id, failures)
                {
                    this.id = id !== undefined ? id : "";
                    this.failures = failures !== undefined ? failures : null;
                },
                false,
                function(__os)
                {
                    __os.writeString(this.id);
                    IceMX.StringIntDictHelper.write(__os, this.failures);
                },
                function(__is)
                {
                    this.id = __is.readString();
                    this.failures = IceMX.StringIntDictHelper.read(__is);
                },
                2, 
                false);
            Slice.defineSequence(IceMX, "MetricsFailuresSeqHelper", "IceMX.MetricsFailures", false);
            Slice.defineSequence(IceMX, "MetricsMapHelper", "Ice.ObjectHelper", false, "IceMX.Metrics");
            Slice.defineDictionary(IceMX, "MetricsView", "MetricsViewHelper", "Ice.StringHelper", "IceMX.MetricsMapHelper", false, undefined, undefined, Ice.ArrayUtil.equals);
        
            /**
             * Raised if a metrics view cannot be found.
             * 
             **/
            IceMX.UnknownMetricsView = Slice.defineUserException(
                function(_cause)
                {
                    Ice.UserException.call(this, _cause);
                },
                Ice.UserException,
                "IceMX::UnknownMetricsView",
                undefined, undefined,
                false,
                false);
        
            /**
             * The metrics administrative facet interface. This interface allows
             * remote administrative clients to access metrics of an application
             * that enabled the Ice administrative facility and configured some
             * metrics views.
             * 
             **/
            IceMX.MetricsAdmin = Slice.defineObject(
                undefined,
                Ice.Object, undefined, 1,
                [
                    "::Ice::Object",
                    "::IceMX::MetricsAdmin"
                ],
                -1, undefined, undefined, false);
        
            IceMX.MetricsAdminPrx = Slice.defineProxy(Ice.ObjectPrx, IceMX.MetricsAdmin.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.MetricsAdmin, IceMX.MetricsAdminPrx,
            {
                "getMetricsViewNames": [, , , , 2, ["Ice.StringSeqHelper"], , [["Ice.StringSeqHelper"]], , , ],
                "enableMetricsView": [, , , , 2, , [[7]], , 
                [
                    IceMX.UnknownMetricsView
                ], , ],
                "disableMetricsView": [, , , , 2, , [[7]], , 
                [
                    IceMX.UnknownMetricsView
                ], , ],
                "getMetricsView": [, , , , 2, ["IceMX.MetricsViewHelper"], [[7]], [[4]], 
                [
                    IceMX.UnknownMetricsView
                ], , true],
                "getMapMetricsFailures": [, , , , 2, ["IceMX.MetricsFailuresSeqHelper"], [[7], [7]], , 
                [
                    IceMX.UnknownMetricsView
                ], , ],
                "getMetricsFailures": [, , , , 2, [IceMX.MetricsFailures], [[7], [7], [7]], , 
                [
                    IceMX.UnknownMetricsView
                ], , ]
            });
        
            /**
             * Provides information on the number of threads currently in use and
             * their activity.
             * 
             **/
            IceMX.ThreadMetrics = Slice.defineObject(
                function(id, total, current, totalLifetime, failures, inUseForIO, inUseForUser, inUseForOther)
                {
                    IceMX.Metrics.call(this, id, total, current, totalLifetime, failures);
                    this.inUseForIO = inUseForIO !== undefined ? inUseForIO : 0;
                    this.inUseForUser = inUseForUser !== undefined ? inUseForUser : 0;
                    this.inUseForOther = inUseForOther !== undefined ? inUseForOther : 0;
                },
                IceMX.Metrics, undefined, 2,
                [
                    "::Ice::Object",
                    "::IceMX::Metrics",
                    "::IceMX::ThreadMetrics"
                ],
                -1,
                function(__os)
                {
                    __os.writeInt(this.inUseForIO);
                    __os.writeInt(this.inUseForUser);
                    __os.writeInt(this.inUseForOther);
                },
                function(__is)
                {
                    this.inUseForIO = __is.readInt();
                    this.inUseForUser = __is.readInt();
                    this.inUseForOther = __is.readInt();
                },
                false);
        
            IceMX.ThreadMetricsPrx = Slice.defineProxy(IceMX.MetricsPrx, IceMX.ThreadMetrics.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.ThreadMetrics, IceMX.ThreadMetricsPrx);
        
            /**
             * Provides information on servant dispatch.
             * 
             **/
            IceMX.DispatchMetrics = Slice.defineObject(
                function(id, total, current, totalLifetime, failures, userException, size, replySize)
                {
                    IceMX.Metrics.call(this, id, total, current, totalLifetime, failures);
                    this.userException = userException !== undefined ? userException : 0;
                    this.size = size !== undefined ? size : new Ice.Long(0, 0);
                    this.replySize = replySize !== undefined ? replySize : new Ice.Long(0, 0);
                },
                IceMX.Metrics, undefined, 1,
                [
                    "::Ice::Object",
                    "::IceMX::DispatchMetrics",
                    "::IceMX::Metrics"
                ],
                -1,
                function(__os)
                {
                    __os.writeInt(this.userException);
                    __os.writeLong(this.size);
                    __os.writeLong(this.replySize);
                },
                function(__is)
                {
                    this.userException = __is.readInt();
                    this.size = __is.readLong();
                    this.replySize = __is.readLong();
                },
                false);
        
            IceMX.DispatchMetricsPrx = Slice.defineProxy(IceMX.MetricsPrx, IceMX.DispatchMetrics.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.DispatchMetrics, IceMX.DispatchMetricsPrx);
        
            /**
             * Provides information on child invocations. A child invocation is
             * either remote (sent over an Ice connection) or collocated. An
             * invocation can have multiple child invocation if it is
             * retried. Child invocation metrics are embedded within {@link
             * InvocationMetrics}.
             * 
             **/
            IceMX.ChildInvocationMetrics = Slice.defineObject(
                function(id, total, current, totalLifetime, failures, size, replySize)
                {
                    IceMX.Metrics.call(this, id, total, current, totalLifetime, failures);
                    this.size = size !== undefined ? size : new Ice.Long(0, 0);
                    this.replySize = replySize !== undefined ? replySize : new Ice.Long(0, 0);
                },
                IceMX.Metrics, undefined, 1,
                [
                    "::Ice::Object",
                    "::IceMX::ChildInvocationMetrics",
                    "::IceMX::Metrics"
                ],
                -1,
                function(__os)
                {
                    __os.writeLong(this.size);
                    __os.writeLong(this.replySize);
                },
                function(__is)
                {
                    this.size = __is.readLong();
                    this.replySize = __is.readLong();
                },
                false);
        
            IceMX.ChildInvocationMetricsPrx = Slice.defineProxy(IceMX.MetricsPrx, IceMX.ChildInvocationMetrics.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.ChildInvocationMetrics, IceMX.ChildInvocationMetricsPrx);
        
            /**
             * Provides information on invocations that are collocated. Collocated
             * metrics are embedded within {@link InvocationMetrics}.
             * 
             **/
            IceMX.CollocatedMetrics = Slice.defineObject(
                function(id, total, current, totalLifetime, failures, size, replySize)
                {
                    IceMX.ChildInvocationMetrics.call(this, id, total, current, totalLifetime, failures, size, replySize);
                },
                IceMX.ChildInvocationMetrics, undefined, 2,
                [
                    "::Ice::Object",
                    "::IceMX::ChildInvocationMetrics",
                    "::IceMX::CollocatedMetrics",
                    "::IceMX::Metrics"
                ],
                -1, undefined, undefined, false);
        
            IceMX.CollocatedMetricsPrx = Slice.defineProxy(IceMX.ChildInvocationMetricsPrx, IceMX.CollocatedMetrics.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.CollocatedMetrics, IceMX.CollocatedMetricsPrx);
        
            /**
             * Provides information on invocations that are specifically sent over
             * Ice connections. Remote metrics are embedded within {@link
             * InvocationMetrics}.
             * 
             **/
            IceMX.RemoteMetrics = Slice.defineObject(
                function(id, total, current, totalLifetime, failures, size, replySize)
                {
                    IceMX.ChildInvocationMetrics.call(this, id, total, current, totalLifetime, failures, size, replySize);
                },
                IceMX.ChildInvocationMetrics, undefined, 3,
                [
                    "::Ice::Object",
                    "::IceMX::ChildInvocationMetrics",
                    "::IceMX::Metrics",
                    "::IceMX::RemoteMetrics"
                ],
                -1, undefined, undefined, false);
        
            IceMX.RemoteMetricsPrx = Slice.defineProxy(IceMX.ChildInvocationMetricsPrx, IceMX.RemoteMetrics.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.RemoteMetrics, IceMX.RemoteMetricsPrx);
        
            /**
             * Provide measurements for proxy invocations. Proxy invocations can
             * either be sent over the wire or be collocated.
             * 
             **/
            IceMX.InvocationMetrics = Slice.defineObject(
                function(id, total, current, totalLifetime, failures, retry, userException, remotes, collocated)
                {
                    IceMX.Metrics.call(this, id, total, current, totalLifetime, failures);
                    this.retry = retry !== undefined ? retry : 0;
                    this.userException = userException !== undefined ? userException : 0;
                    this.remotes = remotes !== undefined ? remotes : null;
                    this.collocated = collocated !== undefined ? collocated : null;
                },
                IceMX.Metrics, undefined, 1,
                [
                    "::Ice::Object",
                    "::IceMX::InvocationMetrics",
                    "::IceMX::Metrics"
                ],
                -1,
                function(__os)
                {
                    __os.writeInt(this.retry);
                    __os.writeInt(this.userException);
                    IceMX.MetricsMapHelper.write(__os, this.remotes);
                    IceMX.MetricsMapHelper.write(__os, this.collocated);
                },
                function(__is)
                {
                    this.retry = __is.readInt();
                    this.userException = __is.readInt();
                    this.remotes = IceMX.MetricsMapHelper.read(__is);
                    this.collocated = IceMX.MetricsMapHelper.read(__is);
                },
                false);
        
            IceMX.InvocationMetricsPrx = Slice.defineProxy(IceMX.MetricsPrx, IceMX.InvocationMetrics.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.InvocationMetrics, IceMX.InvocationMetricsPrx);
        
            /**
             * Provides information on the data sent and received over Ice
             * connections.
             * 
             **/
            IceMX.ConnectionMetrics = Slice.defineObject(
                function(id, total, current, totalLifetime, failures, receivedBytes, sentBytes)
                {
                    IceMX.Metrics.call(this, id, total, current, totalLifetime, failures);
                    this.receivedBytes = receivedBytes !== undefined ? receivedBytes : new Ice.Long(0, 0);
                    this.sentBytes = sentBytes !== undefined ? sentBytes : new Ice.Long(0, 0);
                },
                IceMX.Metrics, undefined, 1,
                [
                    "::Ice::Object",
                    "::IceMX::ConnectionMetrics",
                    "::IceMX::Metrics"
                ],
                -1,
                function(__os)
                {
                    __os.writeLong(this.receivedBytes);
                    __os.writeLong(this.sentBytes);
                },
                function(__is)
                {
                    this.receivedBytes = __is.readLong();
                    this.sentBytes = __is.readLong();
                },
                false);
        
            IceMX.ConnectionMetricsPrx = Slice.defineProxy(IceMX.MetricsPrx, IceMX.ConnectionMetrics.ice_staticId, undefined);
        
            Slice.defineOperations(IceMX.ConnectionMetrics, IceMX.ConnectionMetricsPrx);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Debug = Ice.Debug;
        var HashMap = Ice.HashMap;
        var ConnectRequestHandler = Ice.ConnectRequestHandler;
        
        var RequestHandlerFactory = Ice.Class({
            __init__: function(instance)
            {
                this._instance = instance;
                this._handlers = new HashMap(HashMap.compareEquals);
            },
            getRequestHandler: function(ref, proxy)
            {
                var connect = false;
                var handler;
                if(ref.getCacheConnection())
                {
                    handler = this._handlers.get(ref);
                    if(!handler)
                    {
                        handler = new ConnectRequestHandler(ref, proxy);
                        this._handlers.set(ref, handler);
                        connect = true;
                    }
                }
                else
                {
                    connect = true;
                    handler = new ConnectRequestHandler(ref, proxy);
                }
        
                if(connect)
                {
                    ref.getConnection().then(function(connection, compress)
                                             {
                                                 handler.setConnection(connection, compress);
                                             },
                                             function(ex)
                                             {
                                                 handler.setException(ex);
                                             });
                }
                return proxy.__setRequestHandler(handler.connect(proxy));
            },
            removeRequestHandler: function(ref, handler)
            {
                if(ref.getCacheConnection())
                {
                    if(this._handlers.get(ref) === handler)
                    {
                        this._handlers.delete(ref);
                    }
                }
            }
        });
        
        Ice.RequestHandlerFactory = RequestHandlerFactory;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `Process.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        
            /**
             * An administrative interface for process management. Managed servers must
             * implement this interface.
             * 
             * <p class="Note">A servant implementing this interface is a potential target
             * for denial-of-service attacks, therefore proper security precautions
             * should be taken. For example, the servant can use a UUID to make its
             * identity harder to guess, and be registered in an object adapter with
             * a secured endpoint.
             * 
             **/
            Ice.Process = Slice.defineObject(
                undefined,
                Ice.Object, undefined, 1,
                [
                    "::Ice::Object",
                    "::Ice::Process"
                ],
                -1, undefined, undefined, false);
        
            Ice.ProcessPrx = Slice.defineProxy(Ice.ObjectPrx, Ice.Process.ice_staticId, undefined);
        
            Slice.defineOperations(Ice.Process, Ice.ProcessPrx,
            {
                "shutdown": [, , , , , , , , , , ],
                "writeMessage": [, , , , , , [[7], [3]], , , , ]
            });
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var TcpEndpointI = Ice.TcpEndpointI;
        
        var TcpEndpointFactory = Ice.Class({
            __init__: function(instance)
            {
                this._instance = instance;
            },
            type: function()
            {
                return this._instance.type();
            },
            protocol: function()
            {
                return this._instance.protocol();
            },
            create: function(args, oaEndpoint)
            {
                var e = new TcpEndpointI(this._instance);
                e.initWithOptions(args, oaEndpoint);
                return e;
            },
            read: function(s)
            {
                var e = new TcpEndpointI(this._instance);
                e.initWithStream(s);
                return e;
            },
            destroy: function()
            {
                this._instance = null;
            },
            clone:function(instance)
            {
                return new TcpEndpointFactory(instance);
            }
        });
        
        Ice.TcpEndpointFactory = TcpEndpointFactory;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `PropertiesAdmin.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
            Slice.defineDictionary(Ice, "PropertyDict", "PropertyDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
        
            /**
             * The PropertiesAdmin interface provides remote access to the properties
             * of a communicator.
             * 
             **/
            Ice.PropertiesAdmin = Slice.defineObject(
                undefined,
                Ice.Object, undefined, 1,
                [
                    "::Ice::Object",
                    "::Ice::PropertiesAdmin"
                ],
                -1, undefined, undefined, false);
        
            Ice.PropertiesAdminPrx = Slice.defineProxy(Ice.ObjectPrx, Ice.PropertiesAdmin.ice_staticId, undefined);
        
            Slice.defineOperations(Ice.PropertiesAdmin, Ice.PropertiesAdminPrx,
            {
                "getProperty": [, , , , , [7], [[7]], , , , ],
                "getPropertiesForPrefix": [, , , , , ["Ice.PropertyDictHelper"], [[7]], , , , ],
                "setProperties": [, , , 1, , , [["Ice.PropertyDictHelper"]], , , , ]
            });
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var WSEndpoint = Ice.WSEndpoint;
        
        var WSEndpointFactory = Ice.Class({
            __init__:function(instance, delegate)
            {
                this._instance = instance;
                this._delegate = delegate;
            },
            type: function()
            {
                return this._instance.type();
            },
            protocol: function()
            {
                return this._instance.protocol();
            },
            create: function(args, oaEndpoint)
            {
                var e = new WSEndpoint(this._instance, this._delegate.create(args, oaEndpoint));
                e.initWithOptions(args);
                return e;
            },
            read: function(s)
            {
                var e = new WSEndpoint(this._instance, this._delegate.read(s));
                e.initWithStream(s);
                return e;
            },
            destroy: function()
            {
                this._delegate.destroy();
                this._instance = null;
            }
        });
        Ice.WSEndpointFactory = WSEndpointFactory;
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        //
        // Ice version 3.6.0
        //
        // <auto-generated>
        //
        // Generated from file `SliceChecksumDict.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
            Slice.defineDictionary(Ice, "SliceChecksumDict", "SliceChecksumDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        
        var AsyncResultBase = Ice.AsyncResultBase;
        var Debug = Ice.Debug;
        var DefaultsAndOverrides = Ice.DefaultsAndOverrides;
        var EndpointFactoryManager = Ice.EndpointFactoryManager;
        var HashMap = Ice.HashMap;
        var ImplicitContextI = Ice.ImplicitContextI;
        var LocatorManager = Ice.LocatorManager;
        var Logger = Ice.Logger;
        var ObjectAdapterFactory = Ice.ObjectAdapterFactory;
        var ObjectFactoryManager = Ice.ObjectFactoryManager;
        var OutgoingConnectionFactory = Ice.OutgoingConnectionFactory;
        var Promise = Ice.Promise;
        var Properties = Ice.Properties;
        var ProxyFactory = Ice.ProxyFactory;
        var RetryQueue = Ice.RetryQueue;
        var RouterManager = Ice.RouterManager;
        var Timer = Ice.Timer;
        var TraceLevels = Ice.TraceLevels;
        var ReferenceFactory = Ice.ReferenceFactory;
        var RequestHandlerFactory = Ice.RequestHandlerFactory;
        var ACMConfig = Ice.ACMConfig;
        
        var StateActive = 0;
        var StateDestroyInProgress = 1;
        var StateDestroyed = 2;
        
        //
        // Instance - only for use by Communicator
        //
        var Instance = Ice.Class({
            __init__: function(initData)
            {
                this._state = StateActive;
                this._initData = initData;
        
                this._traceLevels = null;
                this._defaultsAndOverrides = null;
                this._messageSizeMax = 0;
                this._batchAutoFlushSize = 0;
                this._clientACM = null;
                this._implicitContext = null;
                this._routerManager = null;
                this._locatorManager = null;
                this._referenceFactory = null;
                this._requestHandlerFactory = null;
                this._proxyFactory = null;
                this._outgoingConnectionFactory = null;
                this._servantFactoryManager = null;
                this._objectAdapterFactory = null;
                this._retryQueue = null;
                this._endpointHostResolver = null;
                this._endpointFactoryManager = null;
            },
            initializationData: function()
            {
                //
                // No check for destruction. It must be possible to access the
                // initialization data after destruction.
                //
                // This value is immutable.
                //
                return this._initData;
            },
            traceLevels: function()
            {
                // This value is immutable.
                Debug.assert(this._traceLevels !== null);
                return this._traceLevels;
            },
            defaultsAndOverrides: function()
            {
                // This value is immutable.
                Debug.assert(this._defaultsAndOverrides !== null);
                return this._defaultsAndOverrides;
            },
            routerManager: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._routerManager !== null);
                return this._routerManager;
            },
            locatorManager: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._locatorManager !== null);
                return this._locatorManager;
            },
            referenceFactory: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._referenceFactory !== null);
                return this._referenceFactory;
            },
            requestHandlerFactory: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._requestHandlerFactory !== null);
                return this._requestHandlerFactory;
            },
            proxyFactory: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._proxyFactory !== null);
                return this._proxyFactory;
            },
            outgoingConnectionFactory: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._outgoingConnectionFactory !== null);
                return this._outgoingConnectionFactory;
            },
            servantFactoryManager: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._servantFactoryManager !== null);
                return this._servantFactoryManager;
            },
            objectAdapterFactory: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._objectAdapterFactory !== null);
                return this._objectAdapterFactory;
            },
            retryQueue: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._retryQueue !== null);
                return this._retryQueue;
            },
            timer: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._timer !== null);
                return this._timer;
            },
            endpointFactoryManager: function()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._endpointFactoryManager !== null);
                return this._endpointFactoryManager;
            },
            messageSizeMax: function()
            {
                // This value is immutable.
                return this._messageSizeMax;
            },
            batchAutoFlushSize: function()
            {
                // This value is immutable.
                return this._batchAutoFlushSize;
            },
            clientACM: function()
            {
                // This value is immutable.
                return this._clientACM;
            },
            getImplicitContext: function()
            {
                return this._implicitContext;
            },
            stringToIdentity: function(s)
            {
                return Ice.stringToIdentity(s);
            },
            identityToString: function(ident)
            {
                return Ice.identityToString(ident);
            },
        
            setDefaultLocator: function(locator)
            {
                if(this._state == StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                this._referenceFactory = this._referenceFactory.setDefaultLocator(locator);
            },
            setDefaultRouter: function(router)
            {
                if(this._state == StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                this._referenceFactory = this._referenceFactory.setDefaultRouter(router);
            },
            setLogger: function(logger)
            {
                this._initData.logger = logger;
            },
            finishSetup: function(communicator, promise)
            {
                //
                // If promise == null, it means the caller is requesting a synchronous setup.
                // Otherwise, we resolve the promise after all initialization is complete.
                //
        
                try
                {
                    if(this._initData.properties === null)
                    {
                        this._initData.properties = Properties.createProperties();
                    }
        
                    if(Ice.__oneOfDone === undefined)
                    {
                        Ice.__printStackTraces =
                            this._initData.properties.getPropertyAsIntWithDefault("Ice.PrintStackTraces", 0) > 0;
        
                        Ice.__oneOfDone = true;
                    }
        
                    if(this._initData.logger === null)
                    {
                        this._initData.logger = Ice.getProcessLogger();
                    }
        
                    this._traceLevels = new TraceLevels(this._initData.properties);
        
                    this._defaultsAndOverrides = new DefaultsAndOverrides(this._initData.properties, this._initData.logger);
        
                    var defMessageSizeMax = 1024;
                    var num = this._initData.properties.getPropertyAsIntWithDefault("Ice.MessageSizeMax", defMessageSizeMax);
                    if(num < 1 || num > 0x7fffffff / 1024)
                    {
                        this._messageSizeMax = 0x7fffffff;
                    }
                    else
                    {
                        this._messageSizeMax = num * 1024; // Property is in kilobytes, _messageSizeMax in bytes
                    }
        
                    if(this._initData.properties.getProperty("Ice.BatchAutoFlushSize").length === 0 &&
                       this._initData.properties.getProperty("Ice.BatchAutoFlush").length > 0)
                    {
                        if(this._initData.properties.getPropertyAsInt("Ice.BatchAutoFlush") > 0)
                        {
                            this._batchAutoFlushSize = this._messageSizeMax;
                        }
                    }
                    else
                    {
                        num = this._initData.properties.getPropertyAsIntWithDefault("Ice.BatchAutoFlushSize", 1024); // 1MB
                        if(num < 1)
                        {
                            this._batchAutoFlushSize = num;
                        }
                        else if(num > 0x7fffffff / 1024)
                        {
                            this._batchAutoFlushSize = 0x7fffffff;
                        }
                        else
                        {
                            this._batchAutoFlushSize = num * 1024; // Property is in kilobytes, _batchAutoFlushSize in bytes
                        }
                    }
        
                    this._clientACM = new ACMConfig(this._initData.properties, this._initData.logger, "Ice.ACM.Client",
                                                    new ACMConfig(this._initData.properties, this._initData.logger,
                                                                    "Ice.ACM", new ACMConfig()));
        
                    this._implicitContext =
                        ImplicitContextI.create(this._initData.properties.getProperty("Ice.ImplicitContext"));
        
                    this._routerManager = new RouterManager();
        
                    this._locatorManager = new LocatorManager(this._initData.properties);
        
                    this._referenceFactory = new ReferenceFactory(this, communicator);
        
                    this._requestHandlerFactory = new RequestHandlerFactory(this, communicator);
        
                    this._proxyFactory = new ProxyFactory(this);
        
                    this._endpointFactoryManager = new EndpointFactoryManager(this);
        
                    var tcpInstance = new Ice.ProtocolInstance(this, Ice.TCPEndpointType, "tcp", false);
                    var tcpEndpointFactory = new Ice.TcpEndpointFactory(tcpInstance);
                    this._endpointFactoryManager.add(tcpEndpointFactory);
        
                    var wsInstance = new Ice.ProtocolInstance(this, Ice.WSEndpointType, "ws", false);
                    var wsEndpointFactory = new Ice.WSEndpointFactory(wsInstance, tcpEndpointFactory.clone(wsInstance));
                    this._endpointFactoryManager.add(wsEndpointFactory);
        
                    var sslInstance = new Ice.ProtocolInstance(this, IceSSL.EndpointType, "ssl", true);
                    var sslEndpointFactory = new Ice.TcpEndpointFactory(sslInstance);
                    this._endpointFactoryManager.add(sslEndpointFactory);
        
                    var wssInstance = new Ice.ProtocolInstance(this, Ice.WSSEndpointType, "wss", true);
                    var wssEndpointFactory = new Ice.WSEndpointFactory(wssInstance, sslEndpointFactory.clone(wssInstance));
                    this._endpointFactoryManager.add(wssEndpointFactory);
        
                    this._outgoingConnectionFactory = new OutgoingConnectionFactory(communicator, this);
                    this._servantFactoryManager = new ObjectFactoryManager();
        
                    this._objectAdapterFactory = new ObjectAdapterFactory(this, communicator);
        
                    this._retryQueue = new RetryQueue(this);
                    this._timer = new Timer(this._initData.logger);
        
                    var router = Ice.RouterPrx.uncheckedCast(this._proxyFactory.propertyToProxy("Ice.Default.Router"));
                    if(router !== null)
                    {
                        this._referenceFactory = this._referenceFactory.setDefaultRouter(router);
                    }
        
                    var loc = Ice.LocatorPrx.uncheckedCast(this._proxyFactory.propertyToProxy("Ice.Default.Locator"));
                    if(loc !== null)
                    {
                        this._referenceFactory = this._referenceFactory.setDefaultLocator(loc);
                    }
        
                    if(promise !== null)
                    {
                        promise.succeed(communicator);
                    }
                }
                catch(ex)
                {
                    if(promise !== null)
                    {
                        if(ex instanceof Ice.LocalException)
                        {
                            this.destroy().finally(function()
                                                    {
                                                        promise.fail(ex);
                                                    });
                        }
                        else
                        {
                            promise.fail(ex);
                        }
                    }
                    else
                    {
                        if(ex instanceof Ice.LocalException)
                        {
                            this.destroy();
                        }
                        throw ex;
                    }
                }
            },
            //
            // Only for use by Ice.CommunicatorI
            //
            destroy: function()
            {
                var promise = new AsyncResultBase(null, "destroy", null, this, null);
        
                //
                // If destroy is in progress, wait for it to be done. This is
                // necessary in case destroy() is called concurrently by
                // multiple threads.
                //
                if(this._state == StateDestroyInProgress)
                {
                    if(!this._destroyPromises)
                    {
                        this._destroyPromises = [];
                    }
                    this._destroyPromises.push(promise);
                    return promise;
                }
                this._state = StateDestroyInProgress;
        
                //
                // Shutdown and destroy all the incoming and outgoing Ice
                // connections and wait for the connections to be finished.
                //
                var self = this;
                Ice.Promise.try(
                    function()
                    {
                        if(self._objectAdapterFactory)
                        {
                            return self._objectAdapterFactory.shutdown();
                        }
                    }
                ).then(
                    function()
                    {
                        if(self._outgoingConnectionFactory !== null)
                        {
                            self._outgoingConnectionFactory.destroy();
                        }
        
                        if(self._objectAdapterFactory !== null)
                        {
                            return self._objectAdapterFactory.destroy();
                        }
                    }
                ).then(
                    function()
                    {
                        if(self._outgoingConnectionFactory !== null)
                        {
                            return self._outgoingConnectionFactory.waitUntilFinished();
                        }
                    }
                ).then(
                    function()
                    {
                        if(self._retryQueue)
                        {
                            self._retryQueue.destroy();
                        }
                        if(self._timer)
                        {
                            self._timer.destroy();
                        }
        
                        if(self._servantFactoryManager)
                        {
                            self._servantFactoryManager.destroy();
                        }
                        if(self._routerManager)
                        {
                            self._routerManager.destroy();
                        }
                        if(self._locatorManager)
                        {
                            self._locatorManager.destroy();
                        }
                        if(self._endpointFactoryManager)
                        {
                            self._endpointFactoryManager.destroy();
                        }
        
                        var i;
                        if(self._initData.properties.getPropertyAsInt("Ice.Warn.UnusedProperties") > 0)
                        {
                            var unusedProperties = self._initData.properties.getUnusedProperties();
                            if(unusedProperties.length > 0)
                            {
                                var message = [];
                                message.push("The following properties were set but never read:");
                                for(i = 0; i < unusedProperties.length; ++i)
                                {
                                    message.push("\n    ");
                                    message.push(unusedProperties[i]);
                                }
                                self._initData.logger.warning(message.join(""));
                            }
                        }
        
                        self._objectAdapterFactory = null;
                        self._outgoingConnectionFactory = null;
                        self._retryQueue = null;
                        self._timer = null;
        
                        self._servantFactoryManager = null;
                        self._referenceFactory = null;
                        self._requestHandlerFactory = null;
                        self._proxyFactory = null;
                        self._routerManager = null;
                        self._locatorManager = null;
                        self._endpointFactoryManager = null;
        
                        self._state = StateDestroyed;
        
                        if(this._destroyPromises)
                        {
                            for(i = 0; i < this._destroyPromises.length; ++i)
                            {
                                this._destroyPromises[i].succeed(this._destroyPromises[i]);
                            }
                        }
                        promise.succeed(promise);
                    }
                ).exception(
                    function(ex)
                    {
                        if(this._destroyPromises)
                        {
                            for(var i = 0; i < this._destroyPromises.length; ++i)
                            {
                                this._destroyPromises[i].fail(ex, this._destroyPromises[i]);
                            }
                        }
                        promise.fail(ex, promise);
                    }
                );
                return promise;
            },
        });
        
        Ice.Instance = Instance;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Instance = Ice.Instance;
        var Promise = Ice.Promise;
        
        //
        // Ice.Communicator
        //
        var Communicator = Ice.Class({
            __init__: function(initData)
            {
                this._instance = new Instance(initData);
            },
            //
            // Certain initialization tasks need to be completed after the
            // constructor.
            //
            finishSetup: function(promise)
            {
                this._instance.finishSetup(this, promise);
            },
            destroy: function()
            {
                return this._instance.destroy();
            },
            shutdown: function()
            {
                this._instance.objectAdapterFactory().shutdown();
            },
            waitForShutdown: function()
            {
                return this._instance.objectAdapterFactory().waitForShutdown();
            },
            isShutdown: function()
            {
                return this._instance.objectAdapterFactory().isShutdown();
            },
            stringToProxy: function(s)
            {
                return this._instance.proxyFactory().stringToProxy(s);
            },
            proxyToString: function(proxy)
            {
                return this._instance.proxyFactory().proxyToString(proxy);
            },
            propertyToProxy: function(s)
            {
                return this._instance.proxyFactory().propertyToProxy(s);
            },
            proxyToProperty: function(proxy, prefix)
            {
                return this._instance.proxyFactory().proxyToProperty(proxy, prefix);
            },
            stringToIdentity: function(s)
            {
                return this._instance.stringToIdentity(s);
            },
            identityToString: function(ident)
            {
                return this._instance.identityToString(ident);
            },
            createObjectAdapter: function(name)
            {
                var promise = new Ice.AsyncResultBase(this, "createObjectAdapter", this, null, null);
                this._instance.objectAdapterFactory().createObjectAdapter(name, null, promise);
                return promise;
            },
            createObjectAdapterWithEndpoints: function(name, endpoints)
            {
                if(name.length === 0)
                {
                    name = Ice.generateUUID();
                }
        
                this.getProperties().setProperty(name + ".Endpoints", endpoints);
                var promise = new Ice.AsyncResultBase(this, "createObjectAdapterWithEndpoints", this, null, null);
                this._instance.objectAdapterFactory().createObjectAdapter(name, null, promise);
                return promise;
            },
            createObjectAdapterWithRouter: function(name, router)
            {
                if(name.length === 0)
                {
                    name = Ice.generateUUID();
                }
        
                var promise = new Ice.AsyncResultBase(this, "createObjectAdapterWithRouter", this, null, null);
        
                //
                // We set the proxy properties here, although we still use the proxy supplied.
                //
                var properties = this.proxyToProperty(router, name + ".Router");
                for(var e = properties.entries; e !== null; e = e.next)
                {
                    this.getProperties().setProperty(e.key, e.value);
                }
        
                this._instance.objectAdapterFactory().createObjectAdapter(name, router, promise);
                return promise;
            },
            addObjectFactory: function(factory, id)
            {
                this._instance.servantFactoryManager().add(factory, id);
            },
            findObjectFactory: function(id)
            {
                return this._instance.servantFactoryManager().find(id);
            },
            getImplicitContext: function()
            {
                return this._instance.getImplicitContext();
            },
            getProperties: function()
            {
                return this._instance.initializationData().properties;
            },
            getLogger: function()
            {
                return this._instance.initializationData().logger;
            },
            getDefaultRouter: function()
            {
                return this._instance.referenceFactory().getDefaultRouter();
            },
            setDefaultRouter: function(router)
            {
                this._instance.setDefaultRouter(router);
            },
            getDefaultLocator: function()
            {
                return this._instance.referenceFactory().getDefaultLocator();
            },
            setDefaultLocator: function(locator)
            {
                this._instance.setDefaultLocator(locator);
            },
            flushBatchRequests: function()
            {
                return this._instance.outgoingConnectionFactory().flushAsyncBatchRequests();
            }
        });
        
        Object.defineProperty(Communicator.prototype, "instance", {
            get: function() { return this._instance; }
        });
        
        Ice.Communicator = Communicator;
        
    }());

    (function()
    {
        // **********************************************************************
        //
        // Copyright (c) 2003-2015 ZeroC, Inc. All rights reserved.
        //
        // This copy of Ice is licensed to you under the terms described in the
        // ICE_LICENSE file included in this distribution.
        //
        // **********************************************************************
        
        
        var Protocol = Ice.Protocol;
        
        //
        // Ice.InitializationData
        //
        Ice.InitializationData = function()
        {
            this.properties = null;
            this.logger = null;
        };
        
        Ice.InitializationData.prototype.clone = function()
        {
            var r = new Ice.InitializationData();
            r.properties = this.properties;
            r.logger = this.logger;
            return r;
        };
        
        //
        // Ice.initialize()
        //
        Ice.initialize = function(arg1, arg2)
        {
            var args = null;
            var initData = null;
        
            if(arg1 instanceof Array)
            {
                args = arg1;
            }
            else if(arg1 instanceof Ice.InitializationData)
            {
                initData = arg1;
            }
            else if(arg1 !== undefined && arg1 !== null)
            {
                throw new Ice.InitializationException("invalid argument to initialize");
            }
        
            if(arg2 !== undefined && arg2 !== null)
            {
                if(arg2 instanceof Ice.InitializationData && initData === null)
                {
                    initData = arg2;
                }
                else
                {
                    throw new Ice.InitializationException("invalid argument to initialize");
                }
            }
        
            if(initData === null)
            {
                initData = new Ice.InitializationData();
            }
            else
            {
                initData = initData.clone();
            }
            initData.properties = Ice.createProperties(args, initData.properties);
        
            var result = new Ice.Communicator(initData);
            result.finishSetup(null);
            return result;
        };
        
        //
        // Ice.createProperties()
        //
        Ice.createProperties = function(args, defaults)
        {
            return new Ice.Properties(args, defaults);
        };
        
        Ice.currentProtocol = function()
        {
            return Protocol.currentProtocol.clone();
        };
        
        Ice.currentEncoding = function()
        {
            return Protocol.currentEncoding.clone();
        };
        
        
    }());

    window.Ice = Ice;
    window.IceMX = IceMX;
    window.IceSSL = IceSSL;
}());


//# sourceMappingURL=../lib/Ice.js.map