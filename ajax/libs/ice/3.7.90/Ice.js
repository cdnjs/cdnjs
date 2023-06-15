(function()
{
    var root = typeof(window) !== "undefined" ? window : typeof(global) !== "undefined" ? global : typeof(self) !== "undefined" ? self : {};
    var ice = root.ice || {};
    root.Ice = root.Ice || {};
    ice.Ice = root.Ice;
    Ice.Slice = Ice.Slice || {};
    root.IceMX = root.IceMX || {};
    ice.IceMX = root.IceMX;
    root.IceSSL = root.IceSSL || {};
    ice.IceSSL = root.IceSSL;
    var Slice = Ice.Slice;

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        let Ice = {};
        
        if (typeof process !== 'undefined')
        {
            const modules = {};
        
            class _ModuleRegistry
            {
                static module(name)
                {
                    let m = modules[name];
                    if(m === undefined)
                    {
                        m = {};
                        modules[name] = m;
                    }
                    return m;
                }
        
                static require(m, paths)
                {
                    let o;
                    paths.forEach(path =>
                        {
                            o = m.require(path);
                        });
                    return o;
                }
        
                static type(scoped)
                {
                    if(scoped === undefined)
                    {
                        return undefined;
                    }
        
                    const components = scoped.split(".");
                    let type = modules;
                    for(let i = 0; i < components.length; ++i)
                    {
                        type = type[components[i]];
                        if(type === undefined)
                        {
                            return undefined;
                        }
                    }
                    return type;
                }
            }
        
            Ice = _ModuleRegistry.module("Ice");
            Ice.Slice = Ice.Slice || {};
            Ice._ModuleRegistry = _ModuleRegistry;
        }
        else
        {
            /* global
                self : false
            */
            const root = typeof window !== "undefined" ? window :
                typeof global !== "undefined" ? global :
                typeof self !== "undefined" ? self : {};
            /* global
                self : true
            */
            class _ModuleRegistry
            {
                static module(name)
                {
                    let m = root[name];
                    if(m === undefined)
                    {
                        m = {};
                        root[name] = m;
                    }
                    return m;
                }
        
                static require(name)
                {
                    return root;
                }
        
                static type(scoped)
                {
                    if(scoped === undefined)
                    {
                        return undefined;
                    }
                    const components = scoped.split(".");
                    let type = root;
                    for(let i = 0, length = components.length; i < length; ++i)
                    {
                        type = type[components[i]];
                        if(type === undefined)
                        {
                            return undefined;
                        }
                    }
                    return type;
                }
            }
        
            Ice = _ModuleRegistry.module("Ice");
        
            Ice._require = function()
            {
                return root;
            };
        
            Ice.Slice = Ice.Slice || {};
            Ice._ModuleRegistry = _ModuleRegistry;
        }
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const _ModuleRegistry = Ice._ModuleRegistry;
        
        const eq = function(e1, e2)
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
            else if(e1 instanceof Array || e1 instanceof Uint8Array)
            {
                return ArrayUtil.equals(e1, e2, eq);
            }
            return false;
        };
        
        class ArrayUtil
        {
            static clone(arr)
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
            }
        
            static equals(v1, v2, valuesEqual)
            {
                if(v1.length != v2.length)
                {
                    return false;
                }
        
                const equalFn = valuesEqual || eq;
                for(let i = 0; i < v1.length; ++i)
                {
                    if(!equalFn.call(equalFn, v1[i], v2[i]))
                    {
                        return false;
                    }
                }
        
                return true;
            }
        
            static shuffle(arr)
            {
                for(let i = arr.length; i > 1; --i)
                {
                    const e = arr[i - 1];
                    const rand = Math.floor(Math.random() * i);
                    arr[i - 1] = arr[rand];
                    arr[rand] = e;
                }
            }
        }
        
        ArrayUtil.eq = eq;
        
        Ice.Slice.defineSequence = function(module, name, valueHelper, fixed, elementType)
        {
            let helper = null;
            Object.defineProperty(module, name,
                {
                    get: () =>
                        {
                            if(helper === null)
                            {
                                helper = Ice.StreamHelpers.generateSeqHelper(_ModuleRegistry.type(valueHelper),
                                                                             fixed,
                                                                             _ModuleRegistry.type(elementType));
                            }
                            return helper;
                        }
                });
        };
        
        Ice.ArrayUtil = ArrayUtil;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        //
        // Ice.EnumBase
        //
        class EnumBase
        {
            constructor(name, value)
            {
                this._name = name;
                this._value = value;
            }
        
            equals(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
        
                if(!(rhs instanceof Object.getPrototypeOf(this).constructor))
                {
                    return false;
                }
        
                return this._value == rhs._value;
            }
        
            hashCode()
            {
                return this._value;
            }
        
            toString()
            {
                return this._name;
            }
        
            get name()
            {
                return this._name;
            }
        
            get value()
            {
                return this._value;
            }
        }
        Ice.EnumBase = EnumBase;
        
        class EnumHelper
        {
            constructor(enumType)
            {
                this._enumType = enumType;
            }
        
            write(os, v)
            {
                this._enumType._write(os, v);
            }
        
            writeOptional(os, tag, v)
            {
                this._enumType._writeOpt(os, tag, v);
            }
        
            read(is)
            {
                return this._enumType._read(is);
            }
        
            readOptional(is, tag)
            {
                return this._enumType._readOpt(is, tag);
            }
        }
        
        Ice.EnumHelper = EnumHelper;
        
        const Slice = Ice.Slice;
        Slice.defineEnum = function(enumerators)
        {
            const type = class extends EnumBase
            {
            };
        
            const enums = [];
            let maxValue = 0;
            let firstEnum = null;
        
            for(const idx in enumerators)
            {
                const e = enumerators[idx][0];
                const value = enumerators[idx][1];
                const enumerator = new type(e, value);
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
        
            Object.defineProperty(type, "minWireSize", {get: () => 1});
        
            type._write = function(os, v)
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
        
            type._read = function(is)
            {
                return is.readEnum(type);
            };
        
            type._writeOpt = function(os, tag, v)
            {
                if(v !== undefined)
                {
                    if(os.writeOptional(tag, Ice.OptionalFormat.Size))
                    {
                        type._write(os, v);
                    }
                }
            };
        
            type._readOpt = function(is, tag)
            {
                return is.readOptionalEnum(tag, type);
            };
        
            type._helper = new EnumHelper(type);
        
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
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        //
        // The Long type represents a signed 64-bit integer as two 32-bit values
        // corresponding to the high and low words.
        //
        class Long
        {
            //
            // If only one argument is provide we assume it is a JavaScript Number,
            // and we convert it to two 32 bit words to fit in the Ice.Long internal
            // representation.
            //
            // If two arguments are provided we asume these are the high and low words
            // respectively.
            //
            constructor(high = 0, low = undefined)
            {
                if(!Number.isSafeInteger(high))
                {
                    throw new RangeError(low === undefined ?
                            "Number must be a safe integer" :
                            "High word must be a safe integer");
                }
        
                if(low === undefined)
                {
                    this.low = high >>> 0;
                    this.high = ((high - this.low) / Long.HIGH_MASK) >>> 0;
                }
                else
                {
                    if(!Number.isSafeInteger(low))
                    {
                        throw new RangeError("Low word must be a safe integer");
                    }
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
                }
            }
        
            hashCode()
            {
                return this.low;
            }
        
            equals(rhs)
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
            }
        
            toString()
            {
                return this.high + ":" + this.low;
            }
        
            toNumber()
            {
                if((this.high & Long.SIGN_MASK) !== 0)
                {
                    const l = (~this.low) >>> 0;
                    const h = (~this.high) >>> 0;
                    if(h > Long.HIGH_MAX || h == Long.HIGH_MAX && l == Long.MAX_UINT32)
                    {
                        return Number.NEGATIVE_INFINITY;
                    }
                    return -((h * Long.HIGH_MASK) + l + 1);
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
        }
        
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
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        Ice.AsyncStatus = {Queued: 0, Sent: 1};
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const Long = Ice.Long;
        
        const bufferOverflowExceptionMsg = "BufferOverflowException";
        const bufferUnderflowExceptionMsg = "BufferUnderflowException";
        const indexOutOfBoundsExceptionMsg = "IndexOutOfBoundsException";
        
        class Buffer
        {
            constructor(buffer)
            {
                if(buffer !== undefined)
                {
                    this.b = buffer;
                    this.v = new DataView(this.b);
                    this._limit = this.b.byteLength;
                }
                else
                {
                    this.b = null; // ArrayBuffer
                    this.v = null; // DataView
                    this._limit = 0;
                }
                this._position = 0;
                this._shrinkCounter = 0;
            }
        
            empty()
            {
                return this._limit === 0;
            }
        
            resize(n)
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
            }
        
            clear()
            {
                this.b = null;
                this.v = null;
                this._position = 0;
                this._limit = 0;
            }
        
            //
            // Call expand(n) to add room for n additional bytes. Note that expand()
            // examines the current position of the buffer first; we don't want to
            // expand the buffer if the caller is writing to a location that is
            // already in the buffer.
            //
            expand(n)
            {
                const sz = this.capacity === 0 ? n : this._position + n;
                if(sz > this._limit)
                {
                    this.resize(sz);
                }
            }
        
            reset()
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
                this._limit = this.capacity();
                this._position = 0;
            }
        
            reserve(n)
            {
                if(n > this.capacity)
                {
                    const capacity = Math.max(1024, Math.max(n, 2 * this.capacity));
                    if(!this.b)
                    {
                        this.b = new ArrayBuffer(capacity);
                    }
                    else
                    {
                        const b = new Uint8Array(capacity);
                        b.set(new Uint8Array(this.b));
                        this.b = b.buffer;
                    }
                    this.v = new DataView(this.b);
                }
                else if(n < this.capacity)
                {
                    this.b = this.b.slice(0, n);
                    this.v = new DataView(this.b);
                }
            }
        
            put(v)
            {
                if(this._position === this._limit)
                {
                    throw new RangeError(bufferOverflowExceptionMsg);
                }
                this.v.setUint8(this._position, v);
                this._position++;
            }
        
            putAt(i, v)
            {
                if(i >= this._limit)
                {
                    throw new RangeError(indexOutOfBoundsExceptionMsg);
                }
                this.v.setUint8(i, v);
            }
        
            putArray(v)
            {
                // Expects an Uint8Array
                if(!(v instanceof Uint8Array))
                {
                    throw new TypeError('argument is not a Uint8Array');
                }
                if(v.byteLength > 0)
                {
                    if(this._position + v.length > this._limit)
                    {
                        throw new RangeError(bufferOverflowExceptionMsg);
                    }
                    new Uint8Array(this.b, 0, this.b.byteLength).set(v, this._position);
                    this._position += v.byteLength;
                }
            }
        
            putShort(v)
            {
                if(this._position + 2 > this._limit)
                {
                    throw new RangeError(bufferOverflowExceptionMsg);
                }
                this.v.setInt16(this._position, v, true);
                this._position += 2;
            }
        
            putInt(v)
            {
                if(this._position + 4 > this._limit)
                {
                    throw new RangeError(bufferOverflowExceptionMsg);
                }
                this.v.setInt32(this._position, v, true);
                this._position += 4;
            }
        
            putIntAt(i, v)
            {
                if(i + 4 > this._limit || i < 0)
                {
                    throw new RangeError(indexOutOfBoundsExceptionMsg);
                }
                this.v.setInt32(i, v, true);
            }
        
            putFloat(v)
            {
                if(this._position + 4 > this._limit)
                {
                    throw new RangeError(bufferOverflowExceptionMsg);
                }
                this.v.setFloat32(this._position, v, true);
                this._position += 4;
            }
        
            putDouble(v)
            {
                if(this._position + 8 > this._limit)
                {
                    throw new RangeError(bufferOverflowExceptionMsg);
                }
                this.v.setFloat64(this._position, v, true);
                this._position += 8;
            }
        
            putLong(v)
            {
                if(this._position + 8 > this._limit)
                {
                    throw new RangeError(bufferOverflowExceptionMsg);
                }
                this.v.setInt32(this._position, v.low, true);
                this._position += 4;
                this.v.setInt32(this._position, v.high, true);
                this._position += 4;
            }
        
            writeString(stream, v)
            {
                //
                // Encode the string as utf8
                //
                const encoded = unescape(encodeURIComponent(v));
        
                stream.writeSize(encoded.length);
                stream.expand(encoded.length);
                this.putString(encoded, encoded.length);
            }
        
            putString(v, sz)
            {
                if(this._position + sz > this._limit)
                {
                    throw new RangeError(bufferOverflowExceptionMsg);
                }
                for(let i = 0; i < sz; ++i)
                {
                    this.v.setUint8(this._position, v.charCodeAt(i));
                    this._position++;
                }
            }
        
            get()
            {
                if(this._position >= this._limit)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
                const v = this.v.getUint8(this._position);
                this._position++;
                return v;
            }
        
            getAt(i)
            {
                if(i < 0 || i >= this._limit)
                {
                    throw new RangeError(indexOutOfBoundsExceptionMsg);
                }
                return this.v.getUint8(i);
            }
        
            getArray(length)
            {
                if(this._position + length > this._limit)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
                const buffer = this.b.slice(this._position, this._position + length);
                this._position += length;
                return new Uint8Array(buffer);
            }
        
            getArrayAt(position, length)
            {
                if(position + length > this._limit)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
                return new Uint8Array(
                    this.b.slice(position, position + length === undefined ?
                                 (this.b.byteLength - position) : length));
            }
        
            getShort()
            {
                if(this._limit - this._position < 2)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
                const v = this.v.getInt16(this._position, true);
                this._position += 2;
                return v;
            }
        
            getInt()
            {
                if(this._limit - this._position < 4)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
                const v = this.v.getInt32(this._position, true);
                this._position += 4;
                return v;
            }
        
            getFloat()
            {
                if(this._limit - this._position < 4)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
                const v = this.v.getFloat32(this._position, true);
                this._position += 4;
                return v;
            }
        
            getDouble()
            {
                if(this._limit - this._position < 8)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
                const v = this.v.getFloat64(this._position, true);
                this._position += 8;
                return v;
            }
        
            getLong()
            {
                if(this._limit - this._position < 8)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
                const low = this.v.getUint32(this._position, true);
                this._position += 4;
                const high = this.v.getUint32(this._position, true);
                this._position += 4;
        
                return new Long(high, low);
            }
        
            getString(length)
            {
                if(this._position + length > this._limit)
                {
                    throw new RangeError(bufferUnderflowExceptionMsg);
                }
        
                const data = new DataView(this.b, this._position, length);
                let s = "";
                for(let i = 0; i < length; ++i)
                {
                    s += String.fromCharCode(data.getUint8(i));
                }
                this._position += length;
                return decodeURIComponent(escape(s));
            }
        
            get position()
            {
                return this._position;
            }
        
            set position(value)
            {
                if(value >= 0 && value <= this._limit)
                {
                    this._position = value;
                }
            }
        
            get limit()
            {
                return this._limit;
            }
        
            set limit(value)
            {
                if(value <= this.capacity)
                {
                    this._limit = value;
                    if(this._position > value)
                    {
                        this._position = value;
                    }
                }
            }
        
            get capacity()
            {
                return this.b === null ? 0 : this.b.byteLength;
            }
        
            get remaining()
            {
                return this._limit - this._position;
            }
        }
        
        Ice.Buffer = Buffer;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        Ice.CompactIdRegistry = new Map();
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        const toString = function(key, object, objectTable, ident)
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
            let s = "\n" + ident + key + ":";
            for(const k in object)
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
        class Exception extends Error
        {
            constructor(cause)
            {
                super();
                if(cause)
                {
                    this.ice_cause = cause;
                }
            }
        
            ice_name()
            {
                return this.constructor._id.substr(2);
            }
        
            ice_id()
            {
                return this.constructor._id;
            }
        
            static get _id()
            {
                return "::Ice::Exception";
            }
        
            toString()
            {
                //
                // We have a guard here to prevent being re-entered. With some browsers (IE), accessing
                // the stack property ends up calling toString on the exception to print it out with the
                // stack.
                //
                if(this._inToStringAlready)
                {
                    return "";
                }
        
                this._inToStringAlready = true;
                let s = this.ice_id();
                for(const key in this)
                {
                    if(key != "_inToStringAlready")
                    {
                        s += toString(key, this[key], [], "");
                    }
                }
        
                if(Ice._printStackTraces === true && this.stack)
                {
                    s += "\n" + this.stack;
                }
                this._inToStringAlready = false;
                return s;
            }
        
            static captureStackTrace(object)
            {
                const stack = new Error().stack;
                //
                // In IE 10 and greater the stack will be filled once the Error is throw
                // we don't need to do anything.
                //
                if(stack !== undefined)
                {
                    Object.defineProperty(object, "stack", {
                        get: function()
                            {
                                return stack;
                            }
                    });
                }
            }
        }
        
        Ice.Exception = Exception;
        
        //
        // Ice.LocalException
        //
        class LocalException extends Exception
        {
            constructor(cause)
            {
                super(cause);
                Exception.captureStackTrace(this);
            }
        
            static get _id()
            {
                return "::Ice::LocalException";
            }
        }
        
        Ice.LocalException = LocalException;
        
        //
        // Ice.UserException
        //
        class UserException extends Exception
        {
            constructor(cause)
            {
                super(cause);
                Exception.captureStackTrace(this);
            }
        
            static get _id()
            {
                return "::Ice::UserException";
            }
        
            ice_getSlicedData()
            {
                return null;
            }
        
            _write(os)
            {
                os.startException(null);
                writeImpl(this, os, this._mostDerivedType());
                os.endException();
            }
        
            _read(is)
            {
                is.startException();
                readImpl(this, is, this._mostDerivedType());
                is.endException(false);
            }
        
            _usesClasses()
            {
                return false;
            }
        
            _mostDerivedType()
            {
                return Ice.UserException;
            }
        }
        Ice.UserException = UserException;
        
        //
        // Private methods
        //
        
        const writeImpl = function(obj, os, type)
        {
            //
            // The writeImpl method is a recursive method that goes down the
            // class hierarchy to marshal each slice of the class using the
            // generated _writeMemberImpl method.
            //
        
            if(type === undefined || type === UserException)
            {
                return; // Don't marshal anything for Ice.UserException
            }
        
            os.startSlice(type._id, -1, type._parent === UserException);
            if(type.prototype.hasOwnProperty('_writeMemberImpl'))
            {
                type.prototype._writeMemberImpl.call(obj, os);
            }
            os.endSlice();
            writeImpl(obj, os, type._parent);
        };
        
        const readImpl = function(obj, is, type)
        {
            //
            // The readImpl method is a recursive method that goes down the
            // class hierarchy to marshal each slice of the class using the
            // generated _readMemberImpl method.
            //
        
            if(type === undefined || type === UserException)
            {
                return; // Don't marshal anything for UserException
            }
        
            is.startSlice();
            if(type.prototype.hasOwnProperty('_readMemberImpl'))
            {
                type.prototype._readMemberImpl.call(obj, is);
            }
            is.endSlice();
            readImpl(obj, is, type._parent);
        };
        
        const writePreserved = function(os)
        {
            //
            // For Slice exceptions which are marked "preserved", the implementation of this method
            // replaces the Ice.UserException.prototype._write method.
            //
            os.startException(this._slicedData);
            writeImpl(this, os, this._mostDerivedType());
            os.endException();
        };
        
        const readPreserved = function(is)
        {
            //
            // For Slice exceptions which are marked "preserved", the implementation of this method
            // replaces the Ice.UserException.prototype._read method.
            //
            is.startException();
            readImpl(this, is, this._mostDerivedType());
            this._slicedData = is.endException(true);
        };
        
        const ice_getSlicedData = function()
        {
            return this._slicedData;
        };
        
        Ice.Slice.PreservedUserException = function(ex)
        {
            ex.prototype.ice_getSlicedData = ice_getSlicedData;
            ex.prototype._write = writePreserved;
            ex.prototype._read = readPreserved;
        };
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        Ice.FormatType = Ice.Slice.defineEnum(
            [
                ['DefaultFormat', 0],
                ['CompactFormat', 1],
                ['SlicedFormat', 2]
            ]);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        /* eslint no-sync: "off" */
        /* eslint no-process-exit: "off" */
        
        
        let Debug = {};
        
        if (typeof process !== 'undefined')
        {
            Debug = class
            {
                static assert(b, msg)
                {
                    if(!b)
                    {
                        fs.writeSync(process.stderr.fd, msg === undefined ? "assertion failed" : msg);
                        fs.writeSync(process.stderr.fd, new Error().stack);
                        process.exit(1);
                    }
                }
            }
        }
        else
        {
            class AssertionFailedException extends Error
            {
                constructor(message)
                {
                    super();
                    Ice.Exception.captureStackTrace(this);
                    this.message = message;
                }
            }
            Ice.AssertionFailedException = AssertionFailedException;
        
            Debug = class
            {
                static assert(b, msg)
                {
                    if(!b)
                    {
                        console.log(msg === undefined ? "assertion failed" : msg);
                        console.log(new Error().stack);
                        throw new Ice.AssertionFailedException(msg === undefined ? "assertion failed" : msg);
                    }
                }
            }
        }
        
        Ice.Debug = Debug;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const Debug = Ice.Debug;
        
        Ice.StringUtil = class
        {
            //
            // Return the index of the first character in str to
            // appear in match, starting from start. Returns -1 if none is
            // found.
            //
            static findFirstOf(str, match, start)
            {
                start = start === undefined ? 0 : start;
                for(let i = start; i < str.length; i++)
                {
                    const ch = str.charAt(i);
                    if(match.indexOf(ch) != -1)
                    {
                        return i;
                    }
                }
                return -1;
            }
        
            //
            // Return the index of the first character in str which does
            // not appear in match, starting from start. Returns -1 if none is
            // found.
            //
            static findFirstNotOf(str, match, start)
            {
                start = start === undefined ? 0 : start;
                for(let i = start; i < str.length; i++)
                {
                    const ch = str.charAt(i);
                    if(match.indexOf(ch) == -1)
                    {
                        return i;
                    }
                }
                return -1;
            }
        
            //
            // Add escape sequences (such as "\n", or "\123") to s
            //
            static escapeString(s, special, toStringMode)
            {
                special = special === undefined ? null : special;
                if(special !== null)
                {
                    for(let i = 0; i < special.length; ++i)
                    {
                        if(special.charCodeAt(i) < 32 || special.charCodeAt(i) > 126)
                        {
                            throw new RangeError("special characters must be in ASCII range 32-126");
                        }
                    }
                }
        
                const result = [];
        
                if(toStringMode === Ice.ToStringMode.Compat)
                {
                    // Encode UTF-8 bytes
                    const bytes = unescape(encodeURIComponent(s));
                    for(let i = 0; i < bytes.length; ++i)
                    {
                        const c = bytes.charCodeAt(i);
                        encodeChar(c, result, special, toStringMode);
                    }
                }
                else
                {
                    for(let i = 0; i < s.length; ++i)
                    {
                        const c = s.charCodeAt(i);
                        if(toStringMode === Ice.ToStringMode.Unicode || c < 0xD800 || c > 0xDFFF)
                        {
                            encodeChar(c, result, special, toStringMode);
                        }
                        else
                        {
                            Debug.assert(toStringMode === Ice.ToStringMode.ASCII && c >= 0xD800 && c <= 0xDFFF);
                            if(i + 1 === s.length)
                            {
                                throw new RangeError("High surrogate without low surrogate");
                            }
                            else
                            {
                                const codePoint = s.codePointAt(i);
                                Debug.assert(codePoint > 0xFFFF);
                                i++;
        
                                // append \Unnnnnnnn
                                result.push("\\U");
                                const hex = codePoint.toString(16);
                                for(let j = hex.length; j < 8; j++)
                                {
                                    result.push('0');
                                }
                                result.push(hex);
                            }
                        }
                    }
                }
                return result.join("");
            }
        
            //
            // Remove escape sequences added by escapeString. Throws Error
            // for an invalid input string.
            //
            static unescapeString(s, start, end, special)
            {
                start = start === undefined ? 0 : start;
                end = end === undefined ? s.length : end;
                special = special === undefined ? null : special;
        
                Debug.assert(start >= 0 && start <= end && end <= s.length);
        
                if(special !== null)
                {
                    for(let i = 0; i < special.length; ++i)
                    {
                        if(special.charCodeAt(i) < 32 || special.charCodeAt(i) > 126)
                        {
                            throw new RangeError("special characters must be in ASCII range 32-126");
                        }
                    }
                }
        
                // Optimization for strings without escapes
                let p = s.indexOf('\\', start);
                if(p == -1 || p >= end)
                {
                    p = start;
                    while(p < end)
                    {
                        checkChar(s, p++);
                    }
                    return s.substring(start, end);
                }
                else
                {
                    const arr = [];
                    while(start < end)
                    {
                        start = decodeChar(s, start, end, special, arr);
                    }
                    return arr.join("");
                }
            }
        
            //
            // Split string helper; returns null for unmatched quotes
            //
            static splitString(str, delim)
            {
                const v = [];
                let s = "";
                let pos = 0;
                let quoteChar = null;
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
            }
        
            //
            // If a single or double quotation mark is found at the start position,
            // then the position of the matching closing quote is returned. If no
            // quotation mark is found at the start position, then 0 is returned.
            // If no matching closing quote is found, then -1 is returned.
            //
            static checkQuote(s, start)
            {
                start = start === undefined ? 0 : start;
        
                const quoteChar = s.charAt(start);
                if(quoteChar == '"' || quoteChar == '\'')
                {
                    start++;
                    let pos;
                    while(start < s.length && (pos = s.indexOf(quoteChar, start)) != -1)
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
            }
        
            static hashCode(s)
            {
                let hash = 0;
                for(let i = 0; i < s.length; i++)
                {
                    hash = 31 * hash + s.charCodeAt(i);
                }
                return hash;
            }
        
            static toInt(s)
            {
                const n = parseInt(s, 10);
                if(isNaN(n))
                {
                    throw new RangeError("conversion of `" + s + "' to int failed");
                }
                return n;
            }
        };
        
        function encodeChar(c, sb, special, toStringMode)
        {
            switch(c)
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
                case 7: // '\a'
                {
                    if(toStringMode == Ice.ToStringMode.Compat)
                    {
                        // Octal escape for compatibility with 3.6 and earlier
                        sb.push("\\007");
                    }
                    else
                    {
                        sb.push("\\a");
                    }
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
                case 11: // '\v'
                {
                    if(toStringMode == Ice.ToStringMode.Compat)
                    {
                        // Octal escape for compatibility with 3.6 and earlier
                        sb.push("\\013");
                    }
                    else
                    {
                        sb.push("\\v");
                    }
                    break;
                }
                default:
                {
                    const s = String.fromCharCode(c);
        
                    if(special !== null && special.indexOf(s) !== -1)
                    {
                        sb.push('\\');
                        sb.push(s);
                    }
                    else if(c < 32 || c > 126)
                    {
                        if(toStringMode === Ice.ToStringMode.Compat)
                        {
                            //
                            // When ToStringMode=Compat, c is a UTF-8 byte
                            //
                            Debug.assert(c < 256);
                            sb.push('\\');
                            const octal = c.toString(8);
                            //
                            // Add leading zeroes so that we avoid problems during
                            // decoding. For example, consider the encoded string
                            // \0013 (i.e., a character with value 1 followed by
                            // the character '3'). If the leading zeroes were omitted,
                            // the result would be incorrectly interpreted by the
                            // decoder as a single character with value 11.
                            //
                            for(let j = octal.length; j < 3; j++)
                            {
                                sb.push('0');
                            }
                            sb.push(octal);
                        }
                        else if(c < 32 || c == 127 || toStringMode === Ice.ToStringMode.ASCII)
                        {
                            // append \\unnnn
                            sb.push("\\u");
                            const hex = c.toString(16);
                            for(let j = hex.length; j < 4; j++)
                            {
                                sb.push('0');
                            }
                            sb.push(hex);
                        }
                        else
                        {
                            // keep as is
                            sb.push(s);
                        }
                    }
                    else
                    {
                        // printable ASCII character
                        sb.push(s);
                    }
                    break;
                }
            }
        }
        
        function checkChar(s, pos)
        {
            const c = s.charCodeAt(pos);
            if(c < 32 || c === 127)
            {
                let msg;
                if(pos > 0)
                {
                    msg = "character after `" + s.substring(0, pos) + "'";
                }
                else
                {
                    msg = "first character";
                }
                msg += " has invalid ordinal value" + c;
                throw new RangeError(msg);
            }
            return s.charAt(pos);
        }
        //
        // Decode the character or escape sequence starting at start and appends it to result;
        // returns the index of the first character following the decoded character
        // or escape sequence.
        //
        function decodeChar(s, start, end, special, result)
        {
            Debug.assert(start >= 0);
            Debug.assert(start < end);
            Debug.assert(end <= s.length);
        
            if(s.charAt(start) != '\\')
            {
                result.push(checkChar(s, start++));
            }
            else if(start + 1 === end)
            {
                ++start;
                result.push("\\"); // trailing backslash
            }
            else
            {
                let c = s.charAt(++start);
        
                switch(c)
                {
                    case '\\':
                    case '\'':
                    case '"':
                    case '?':
                    {
                        ++start;
                        result.push(c);
                        break;
                    }
                    case 'a':
                    {
                        ++start;
                        result.append("\u0007");
                        break;
                    }
                    case 'b':
                    {
                        ++start;
                        result.push("\b");
                        break;
                    }
                    case 'f':
                    {
                        ++start;
                        result.push("\f");
                        break;
                    }
                    case 'n':
                    {
                        ++start;
                        result.push("\n");
                        break;
                    }
                    case 'r':
                    {
                        ++start;
                        result.push("\r");
                        break;
                    }
                    case 't':
                    {
                        ++start;
                        result.push("\t");
                        break;
                    }
                    case 'v':
                    {
                        ++start;
                        result.push("\v");
                        break;
                    }
                    case 'u':
                    case 'U':
                    {
                        let codePoint = 0;
                        const inBMP = (c === 'u');
                        let size = inBMP ? 4 : 8;
                        ++start;
                        while(size > 0 && start < end)
                        {
                            let charVal = s.charCodeAt(start++);
                            if(charVal >= 0x30 && charVal <= 0x39)
                            {
                                charVal -= 0x30;
                            }
                            else if(charVal >= 0x61 && charVal <= 0x66)
                            {
                                charVal += 10 - 0x61;
                            }
                            else if(charVal >= 0x41 && charVal <= 0x46)
                            {
                                charVal += 10 - 0x41;
                            }
                            else
                            {
                                break; // while
                            }
                            codePoint = codePoint * 16 + charVal;
                            --size;
                        }
                        if(size > 0)
                        {
                            throw new RangeError("Invalid universal character name: too few hex digits");
                        }
                        if(codePoint >= 0xD800 && codePoint <= 0xDFFF)
                        {
                            throw new RangeError("A universal character name cannot designate a surrogate");
                        }
                        if(inBMP || codePoint <= 0xFFFF)
                        {
                            result.push(String.fromCharCode(codePoint));
                        }
                        else
                        {
                            result.push(String.fromCodePoint(codePoint));
                        }
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
                    case 'x':
                    {
                        // UTF-8 byte sequence encoded with octal or hex escapes
        
                        const arr = [];
                        let more = true;
                        while(more)
                        {
                            let val = 0;
                            if(c === 'x')
                            {
                                let size = 2;
                                ++start;
                                while(size > 0 && start < end)
                                {
                                    let charVal = s.charCodeAt(start++);
                                    if(charVal >= 0x30 && charVal <= 0x39)
                                    {
                                        charVal -= 0x30;
                                    }
                                    else if(charVal >= 0x61 && charVal <= 0x66)
                                    {
                                        charVal += 10 - 0x61;
                                    }
                                    else if(charVal >= 0x41 && charVal <= 0x46)
                                    {
                                        charVal += 10 - 0x41;
                                    }
                                    else
                                    {
                                        break; // while
                                    }
                                    val = val * 16 + charVal;
                                    --size;
                                }
                                if(size === 2)
                                {
                                    throw new RangeError("Invalid \\x escape sequence: no hex digit");
                                }
                            }
                            else
                            {
                                for(let j = 0; j < 3 && start < end; ++j)
                                {
                                    const charVal = s.charCodeAt(start++) - '0'.charCodeAt(0);
                                    if(charVal < 0 || charVal > 7)
                                    {
                                        --start; // move back
                                        Debug.assert(j !== 0); // must be at least one digit
                                        break; // for
                                    }
                                    val = val * 8 + charVal;
                                }
                                if(val > 255)
                                {
                                    throw new RangeError("octal value \\" + val.toString(8) + " (" + val + ") is out of range");
                                }
                            }
        
                            arr.push(String.fromCharCode(val));
        
                            more = false;
                            if((start + 1 < end) && s.charAt(start) === '\\')
                            {
                                c = s.charAt(start + 1);
                                const charVal = s.charCodeAt(start + 1);
                                if(c === 'x' || (charVal >= 0x30 && charVal <= 0x39))
                                {
                                    start++;
                                    more = true;
                                }
                            }
                        }
        
                        // Decode UTF-8 arr into string
                        result.push(decodeURIComponent(escape(arr.join(""))));
                        break;
                    }
                    default:
                    {
                        if(special === null || special.length === 0 || special.indexOf(c) === -1)
                        {
                            result.push("\\"); // not in special, so we keep the backslash
                        }
                        result.push(checkChar(s, start++));
                        break;
                    }
                }
            }
        
            return start;
        }
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
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
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        Ice.OptionalFormat = Ice.Slice.defineEnum([['F1', 0], ['F2', 1], ['F4', 2], ['F8', 3], ['Size', 4], ['VSize', 5], ['FSize', 6], ['Class', 7]]);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        const defineProperty = Object.defineProperty;
        const OptionalFormat = Ice.OptionalFormat;
        
        const StreamHelpers = {};
        
        StreamHelpers.FSizeOptHelper = function()
        {
            this.writeOptional = function(os, tag, v)
            {
                if(v !== undefined && os.writeOptional(tag, OptionalFormat.FSize))
                {
                    const pos = os.startSize();
                    this.write(os, v);
                    os.endSize(pos);
                }
            };
        
            this.readOptional = function(is, tag)
            {
                let v;
                if(is.readOptional(tag, OptionalFormat.FSize))
                {
                    is.skip(4);
                    v = this.read(is);
                }
                return v;
            };
        };
        
        StreamHelpers.VSizeOptHelper = function()
        {
            this.writeOptional = function(os, tag, v)
            {
                if(v !== undefined && os.writeOptional(tag, OptionalFormat.VSize))
                {
                    os.writeSize(this.minWireSize);
                    this.write(os, v);
                }
            };
        
            this.readOptional = function(is, tag)
            {
                let v;
                if(is.readOptional(tag, OptionalFormat.VSize))
                {
                    is.skipSize();
                    v = this.read(is);
                }
                return v;
            };
        };
        
        StreamHelpers.VSizeContainerOptHelper = function(elementSize)
        {
            this.writeOptional = function(os, tag, v)
            {
                if(v !== undefined && os.writeOptional(tag, OptionalFormat.VSize))
                {
                    const sz = this.size(v);
                    os.writeSize(sz > 254 ? sz * elementSize + 5 : sz * elementSize + 1);
                    this.write(os, v);
                }
            };
        
            this.readOptional = function(is, tag)
            {
                let v;
                if(is.readOptional(tag, OptionalFormat.VSize))
                {
                    is.skipSize();
                    v = this.read(is);
                }
                return v;
            };
        };
        
        StreamHelpers.VSizeContainer1OptHelper = function()
        {
            this.writeOptional = function(os, tag, v)
            {
                if(v !== undefined && os.writeOptional(tag, OptionalFormat.VSize))
                {
                    this.write(os, v);
                }
            };
        
            this.readOptional = function(is, tag)
            {
                let v;
                if(is.readOptional(tag, OptionalFormat.VSize))
                {
                    v = this.read(is);
                }
                return v;
            };
        };
        
        //
        // Sequence helper to write sequences
        //
        class SequenceHelper
        {
            write(os, v)
            {
                if(v === null || v === undefined || v.length === 0)
                {
                    os.writeSize(0);
                }
                else
                {
                    const helper = this.elementHelper;
                    os.writeSize(v.length);
                    for(let i = 0; i < v.length; ++i)
                    {
                        helper.write(os, v[i]);
                    }
                }
            }
        
            read(is)
            {
                const helper = this.elementHelper; // Cache the element helper.
                const sz = is.readAndCheckSeqSize(helper.minWireSize);
                const v = [];
                v.length = sz;
                for(let i = 0; i < sz; ++i)
                {
                    v[i] = helper.read(is);
                }
                return v;
            }
        
            size(v)
            {
                return (v === null || v === undefined) ? 0 : v.length;
            }
        
            get minWireSize()
            {
                return 1;
            }
        }
        
        // Speacialization optimized for ByteSeq
        const byteSeqHelper = new SequenceHelper();
        byteSeqHelper.write = (os, v) => os.writeByteSeq(v);
        byteSeqHelper.read = is => is.readByteSeq();
        
        defineProperty(byteSeqHelper, "elementHelper", {get: () => Ice.ByteHelper});
        StreamHelpers.VSizeContainer1OptHelper.call(byteSeqHelper);
        
        // Read method for value sequences
        const valueSequenceHelperRead = function(is)
        {
            const sz = is.readAndCheckSeqSize(1);
            const v = [];
            v.length = sz;
            const elementType = this.elementType;
            const readValueAtIndex = function(idx)
            {
                is.readValue(obj =>
                             {
                                 v[idx] = obj;
                             }, elementType);
            };
        
            for(let i = 0; i < sz; ++i)
            {
                readValueAtIndex(i);
            }
            return v;
        };
        
        StreamHelpers.generateSeqHelper = function(elementHelper, fixed, elementType)
        {
            if(elementHelper === Ice.ByteHelper)
            {
                return byteSeqHelper;
            }
        
            const helper = new SequenceHelper();
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
        
            defineProperty(helper, "elementHelper", {get: () => elementHelper});
        
            if(elementHelper == Ice.ObjectHelper)
            {
                defineProperty(helper, "elementType", {get: () => elementType});
                helper.read = valueSequenceHelperRead;
            }
        
            return helper;
        };
        
        //
        // Dictionary helper to write dictionaries
        //
        class DictionaryHelper
        {
            write(os, v)
            {
                if(v === null || v == undefined || v.size === 0)
                {
                    os.writeSize(0);
                }
                else
                {
                    const keyHelper = this.keyHelper;
                    const valueHelper = this.valueHelper;
                    os.writeSize(v.size);
                    for(const [key, value] of v)
                    {
                        keyHelper.write(os, key);
                        valueHelper.write(os, value);
                    }
                }
            }
        
            read(is)
            {
                const mapType = this.mapType;
                const v = new mapType();
                const sz = is.readSize();
                const keyHelper = this.keyHelper;
                const valueHelper = this.valueHelper;
                for(let i = 0; i < sz; ++i)
                {
                    v.set(keyHelper.read(is), valueHelper.read(is));
                }
                return v;
            }
        
            size(v)
            {
                return (v === null || v === undefined) ? 0 : v.size;
            }
        
            get minWireSize()
            {
                return 1;
            }
        }
        
        // Read method for dictionaries of values
        const valueDictionaryHelperRead = function(is)
        {
            const sz = is.readSize();
            const mapType = this.mapType;
            const v = new mapType();
            const valueType = this.valueType;
        
            const readValueForKey = function(key)
            {
                is.readValue(obj => v.set(key, obj), valueType);
            };
        
            const keyHelper = this.keyHelper;
            for(let i = 0; i < sz; ++i)
            {
                readValueForKey(keyHelper.read(is));
            }
            return v;
        };
        
        StreamHelpers.generateDictHelper = function(keyHelper, valueHelper, fixed, valueType, mapType)
        {
            const helper = new DictionaryHelper();
            if(fixed)
            {
                StreamHelpers.VSizeContainerOptHelper.call(helper, keyHelper.minWireSize + valueHelper.minWireSize);
            }
            else
            {
                StreamHelpers.FSizeOptHelper.call(helper);
            }
        
            defineProperty(helper,
                           "mapType",
                           {
                               get: () => mapType
                           });
        
            defineProperty(helper, "keyHelper",
                           {
                               get: () => keyHelper
                           });
        
            defineProperty(helper, "valueHelper",
                           {
                               get: () => valueHelper
                           });
        
            if(valueHelper == Ice.ObjectHelper)
            {
                defineProperty(helper, "valueType",
                               {
                                   get: () => valueType
                               });
        
                helper.read = valueDictionaryHelperRead;
            }
        
            return helper;
        };
        
        Ice.StreamHelpers = StreamHelpers;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const ReferenceMode = Ice.ReferenceMode;
        
        class ConnectionRequestHandler
        {
            constructor(ref, connection)
            {
                this._reference = ref;
                this._response = ref.getMode() == ReferenceMode.ModeTwoway;
                this._connection = connection;
            }
        
            update(previousHandler, newHandler)
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
            }
        
            sendAsyncRequest(out)
            {
                return out.invokeRemote(this._connection, this._response);
            }
        
            asyncRequestCanceled(out)
            {
                return this._connection.asyncRequestCanceled(out);
            }
        
            getReference()
            {
                return this._reference;
            }
        
            getConnection()
            {
                return this._connection;
            }
        }
        
        Ice.ConnectionRequestHandler = ConnectionRequestHandler;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        //
        // Ice.Object
        //
        // Using IceObject in this file to avoid collisions with the native Object.
        //
        
        
        Ice.Object = class
        {
            ice_isA(s, current)
            {
                return this._iceMostDerivedType()._iceIds.indexOf(s) >= 0;
            }
        
            ice_ping(current)
            {
            }
        
            ice_ids(current)
            {
                return this._iceMostDerivedType()._iceIds;
            }
        
            ice_id(current)
            {
                return this._iceMostDerivedType()._iceId;
            }
        
            toString()
            {
                return "[object " + this.ice_id() + "]";
            }
        
            //
            // _iceMostDerivedType returns the the most derived Ice generated class. This is
            // necessary because the user might extend Slice generated classes. The user
            // class extensions don't have _iceId, _iceIds, etc static members so the implementation
            // of ice_id and ice_ids would fail trying to access those members of the user
            // defined class. Instead, ice_id, ice_ids and ice_instanceof call _iceMostDerivedType
            // to get the most derived Ice class.
            //
            _iceMostDerivedType()
            {
                return Ice.Object;
            }
        
            //
            // The default implementation of equals compare references.
            //
            equals(other)
            {
                return this === other;
            }
        
            static get _iceImplements()
            {
                return [];
            }
        };
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        function generateUUID()
        {
            let d = new Date().getTime();
            const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                const r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }
        
        Ice.generateUUID = generateUUID;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        const StringUtil = Ice.StringUtil;
        
        class HashUtil
        {
            static addBoolean(h, b)
            {
                return ((h << 5) + h) ^ (b ? 0 : 1);
            }
        
            static addString(h, str)
            {
                if(str !== undefined && str !== null)
                {
                    h = ((h << 5) + h) ^ StringUtil.hashCode(str);
                }
                return h;
            }
        
            static addNumber(h, num)
            {
                return ((h << 5) + h) ^ num;
            }
        
            static addHashable(h, obj)
            {
                if(obj !== undefined && obj !== null)
                {
                    h = ((h << 5) + h) ^ obj.hashCode();
                }
                return h;
            }
        
            static addArray(h, arr, hashCode)
            {
                if(arr !== undefined && arr !== null)
                {
                    for(let i = 0; i < arr.length; ++i)
                    {
                        h = hashCode(h, arr[i]);
                    }
                }
                return h;
            }
        }
        
        Ice.HashUtil = HashUtil;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const _ModuleRegistry = Ice._ModuleRegistry;
        const StringUtil = Ice.StringUtil;
        
        function setInternal(map, key, value, hash, index)
        {
            //
            // Search for an entry with the same key.
            //
            for(let e = map._table[index]; e !== null; e = e._nextInBucket)
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
        
        class HashMap
        {
            constructor(arg1, arg2)
            {
                //
                // The first argument can be a HashMap or the keyComparator, the second
                // argument if present is always the value comparator.
                //
                let h, keyComparator, valueComparator;
        
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
        
                if(h instanceof HashMap && h._size > 0)
                {
                    this._threshold = h._threshold;
                    this._table.length = h._table.length;
                    for(let i = 0; i < h._table.length; i++)
                    {
                        this._table[i] = null;
                    }
                    this.merge(h);
                }
                else
                {
                    this._threshold = this._initialCapacity * this._loadFactor;
                    for(let i = 0; i < this._initialCapacity; i++)
                    {
                        this._table[i] = null;
                    }
                }
            }
        
            set(key, value)
            {
                const r = this.computeHash(key); // Returns an object with key,hash members.
        
                const index = this.hashIndex(r.hash, this._table.length);
        
                return setInternal(this, r.key, value, r.hash, index);
            }
        
            get(key)
            {
                const r = this.computeHash(key); // Returns an object with key,hash members.
                const e = this.findEntry(r.key, r.hash);
                return e !== undefined ? e._value : undefined;
            }
        
            has(key)
            {
                const r = this.computeHash(key); // Returns an object with key,hash members.
                return this.findEntry(r.key, r.hash) !== undefined;
            }
        
            delete(key)
            {
                const r = this.computeHash(key); // Returns an object with key,hash members.
        
                const index = this.hashIndex(r.hash, this._table.length);
        
                //
                // Search for an entry with the same key.
                //
                let prev = null;
                for(let e = this._table[index]; e !== null; e = e._nextInBucket)
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
            }
        
            clear()
            {
                for(let i = 0; i < this._table.length; ++i)
                {
                    this._table[i] = null;
                }
                this._head = null;
                this._size = 0;
            }
        
            forEach(fn, obj)
            {
                obj = obj === undefined ? fn : obj;
                for(let e = this._head; e !== null; e = e._next)
                {
                    fn.call(obj, e._value, e._key);
                }
            }
        
            *entries()
            {
                for(let e = this._head; e !== null; e = e._next)
                {
                    yield [e._key, e._value];
                }
            }
        
            *keys()
            {
                for(let e = this._head; e !== null; e = e._next)
                {
                    yield e._key;
                }
            }
        
            *values()
            {
                for(let e = this._head; e !== null; e = e._next)
                {
                    yield e._value;
                }
            }
        
            equals(other, valuesEqual)
            {
                if(other === null || !(other instanceof HashMap) || this._size !== other._size)
                {
                    return false;
                }
        
                let eq;
                if(valuesEqual)
                {
                    eq = valuesEqual;
                }
                else
                {
                    eq = (v1, v2) => this._valueComparator.call(this._valueComparator, v1, v2);
                }
        
                for(let e = this._head; e !== null; e = e._next)
                {
                    const oe = other.findEntry(e._key, e._hash);
                    if(oe === undefined || !eq(e._value, oe._value))
                    {
                        return false;
                    }
                }
                return true;
            }
        
            merge(from)
            {
                for(let e = from._head; e !== null; e = e._next)
                {
                    setInternal(this, e._key, e._value, e._hash, this.hashIndex(e._hash, this._table.length));
                }
            }
        
            add(key, value, hash, index)
            {
                //
                // Create a new table entry.
                //
                const e = Object.create(null, {
                    key:
                    {
                        enumerable: true,
                        get: function() { return this._key; }
                    },
                    value:
                    {
                        enumerable: true,
                        get: function() { return this._value; }
                    },
                    next:
                    {
                        enumerable: true,
                        get: function() { return this._next; }
                    },
                    _key:
                    {
                        enumerable: false,
                        writable: true,
                        value: key
                    },
                    _value:
                    {
                        enumerable: false,
                        writable: true,
                        value: value
                    },
                    _prev:
                    {
                        enumerable: false,
                        writable: true,
                        value: null
                    },
                    _next:
                    {
                        enumerable: false,
                        writable: true,
                        value: null
                    },
                    _nextInBucket:
                    {
                        enumerable: false,
                        writable: true,
                        value: null
                    },
                    _hash:
                    {
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
            }
        
            resize(capacity)
            {
                const newTable = new Array(capacity).fill(null);
        
                //
                // Re-assign all entries to buckets.
                //
                for(let e = this._head; e !== null; e = e._next)
                {
                    const index = this.hashIndex(e._hash, capacity);
                    e._nextInBucket = newTable[index];
                    newTable[index] = e;
                }
        
                this._table = newTable;
                this._threshold = (capacity * this._loadFactor);
            }
        
            findEntry(key, hash)
            {
                const index = this.hashIndex(hash, this._table.length);
                //
                // Search for an entry with the same key.
                //
                for(let e = this._table[index]; e !== null; e = e._nextInBucket)
                {
                    if(e._hash === hash && this.keysEqual(key, e._key))
                    {
                        return e;
                    }
                }
        
                return undefined;
            }
        
            hashIndex(hash, len)
            {
                return hash & (len - 1);
            }
        
            computeHash(v)
            {
                if(v === 0)
                {
                    return {key: 0, hash: 0};
                }
        
                if(v === null)
                {
                    if(HashMap._null === null)
                    {
                        const uuid = Ice.generateUUID();
                        HashMap._null = {key: uuid, hash: StringUtil.hashCode(uuid)};
                    }
                    return HashMap._null;
                }
        
                if(v === undefined)
                {
                    throw new RangeError("cannot compute hash for undefined value");
                }
        
                if(typeof v.hashCode === "function")
                {
                    return {key: v, hash: v.hashCode()};
                }
        
                const type = typeof v;
                if(type === "string" || v instanceof String)
                {
                    return {key: v, hash: StringUtil.hashCode(v)};
                }
                else if(type === "number" || v instanceof Number)
                {
                    if(isNaN(v))
                    {
                        if(HashMap._nan === null)
                        {
                            const uuid = Ice.generateUUID();
                            HashMap._nan = {key: uuid, hash: StringUtil.hashCode(uuid)};
                        }
                        return HashMap._nan;
                    }
                    return {key: v, hash: v.toFixed(0)};
                }
                else if(type === "boolean" || v instanceof Boolean)
                {
                    return {key: v, hash: v ? 1 : 0};
                }
        
                throw new RangeError("cannot compute hash for value of type " + type);
            }
        
            keysEqual(k1, k2)
            {
                return this._keyComparator.call(this._keyComparator, k1, k2);
            }
        
            get size()
            {
                return this._size;
            }
        }
        
        HashMap.prototype[Symbol.iterator] = HashMap.prototype.entries;
        
        Ice.HashMap = HashMap;
        
        HashMap.compareEquals = compareEquals;
        HashMap.compareIdentity = compareIdentity;
        HashMap._null = null;
        HashMap._nan = null;
        
        const Slice = Ice.Slice;
        
        Slice.defineDictionary = function(module, name, helperName, keyHelper, valueHelper, fixed, keysEqual, valueType)
        {
            if(keysEqual === undefined)
            {
                module[name] = Map;
            }
            else
            {
                //
                // Define a constructor function for a dictionary whose key type requires
                // comparison using an equals() method instead of the native comparison
                // operators.
                //
                module[name] = function(h)
                {
                    return new HashMap(h || keysEqual);
                };
            }
        
            let helper = null;
            Object.defineProperty(module, helperName,
            {
                get: function()
                {
                    if(helper === null)
                    {
                        helper = Ice.StreamHelpers.generateDictHelper(_ModuleRegistry.type(keyHelper),
                                                                      _ModuleRegistry.type(valueHelper),
                                                                      fixed,
                                                                      _ModuleRegistry.type(valueType),
                                                                      module[name]);
                    }
                    return helper;
                }
            });
        };
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `InstrumentationF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        //
        // Ice.Value
        //
        
        Ice.Value = class
        {
            ice_preMarshal()
            {
            }
        
            ice_postUnmarshal()
            {
            }
        
            ice_getSlicedData()
            {
                return null;
            }
        
            _iceWrite(os)
            {
                os.startValue(null);
                writeImpl(this, os, this._iceMostDerivedType());
                os.endValue();
            }
        
            _iceRead(is)
            {
                is.startValue();
                readImpl(this, is, this._iceMostDerivedType());
                is.endValue(false);
            }
        
            //
            // These methods are used for object parameters.
            //
            static write(os, v)
            {
                os.writeValue(v);
            }
        
            static writeOptional(os, tag, v)
            {
                os.writeOptionalValue(tag, v);
            }
        
            static read(is)
            {
                const v = {value: null};
                is.readValue(o =>
                             {
                                 v.value = o;
                             }, this);
                return v;
            }
        
            static readOptional(is, tag)
            {
                const v = {value: undefined};
                is.readOptionalValue(tag, o =>
                                     {
                                         v.value = o;
                                     }, this);
                return v;
            }
        };
        
        Ice.InterfaceByValue = class extends Ice.Value
        {
            constructor(id)
            {
                super();
                this._id = id;
            }
        
            ice_id()
            {
                return this._id;
            }
        
            _iceWrite(os)
            {
                os.startValue(null);
                os.startSlice(this.ice_id(), -1, true);
                os.endSlice();
                os.endValue();
            }
        
            _iceRead(is)
            {
                is.startValue();
                is.startSlice();
                is.endSlice();
                is.endValue(false);
            }
        };
        
        //
        // Private methods
        //
        const writeImpl = function(obj, os, type)
        {
            //
            // The writeImpl method is a recursive method that goes down the
            // class hierarchy to marshal each slice of the class using the
            // generated _iceWriteMemberImpl method.
            //
        
            if(type === undefined || type === Ice.Value)
            {
                return; // Don't marshal anything for Ice.Value
            }
        
            os.startSlice(type.ice_staticId(),
                          Object.prototype.hasOwnProperty.call(type, '_iceCompactId') ? type._iceCompactId : -1,
                          Object.getPrototypeOf(type) === Ice.Value);
            if(type.prototype.hasOwnProperty('_iceWriteMemberImpl'))
            {
                type.prototype._iceWriteMemberImpl.call(obj, os);
            }
            os.endSlice();
            writeImpl(obj, os, Object.getPrototypeOf(type));
        };
        
        const readImpl = function(obj, is, type)
        {
            //
            // The readImpl method is a recursive method that goes down the
            // class hierarchy to unmarshal each slice of the class using the
            // generated _iceReadMemberImpl method.
            //
        
            if(type === undefined || type === Ice.Value)
            {
                return; // Don't unmarshal anything for Ice.Value
            }
        
            is.startSlice();
            if(type.prototype.hasOwnProperty('_iceReadMemberImpl'))
            {
                type.prototype._iceReadMemberImpl.call(obj, is);
            }
            is.endSlice();
            readImpl(obj, is, Object.getPrototypeOf(type));
        };
        
        function writePreserved(os)
        {
            //
            // For Slice classes which are marked "preserved", the implementation of this method
            // replaces the Ice.Value.prototype._iceWrite method.
            //
            os.startValue(this._iceSlicedData);
            writeImpl(this, os, this._iceMostDerivedType());
            os.endValue();
        }
        
        function readPreserved(is)
        {
            //
            // For Slice classes which are marked "preserved", the implementation of this method
            // replaces the Ice.Value.prototype._iceRead method.
            //
            is.startValue();
            readImpl(this, is, this._iceMostDerivedType());
            this._iceSlicedData = is.endValue(true);
        }
        
        function ice_getSlicedData()
        {
            return this._iceSlicedData;
        }
        
        const Slice = Ice.Slice;
        
        Slice.defineValue = function(valueType, id, preserved, compactId = 0)
        {
            valueType.prototype.ice_id = function()
            {
                return id;
            };
        
            valueType.prototype._iceMostDerivedType = function()
            {
                return valueType;
            };
        
            valueType.ice_staticId = function()
            {
                return id;
            };
        
            if(preserved)
            {
                valueType.prototype.ice_getSlicedData = ice_getSlicedData;
                valueType.prototype._iceWrite = writePreserved;
                valueType.prototype._iceRead = readPreserved;
            }
        
            if(compactId > 0)
            {
                Ice.CompactIdRegistry.set(compactId, id);
            }
        };
        Slice.defineValue(Ice.Value, "::Ice::Object");
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const ArrayUtil = Ice.ArrayUtil;
        
        //
        // Use generic equality test from ArrayUtil.
        //
        const eq = ArrayUtil.eq;
        
        function equals(other)
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
        
            for(const key in this)
            {
                const e1 = this[key];
                const e2 = other[key];
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
        }
        
        function clone()
        {
            const other = new this.constructor();
            for(const key in this)
            {
                const e = this[key];
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
        }
        
        function memberHashCode(h, e)
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
                const t = typeof e;
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
        }
        
        function hashCode()
        {
            let h = 5381;
            for(const key in this)
            {
                const e = this[key];
                if(e === undefined || e === null || typeof e == "function")
                {
                    continue;
                }
                h = memberHashCode(h, e);
            }
            return h;
        }
        
        Ice.Slice.defineStruct = function(obj, legalKeyType, variableLength)
        {
            obj.prototype.clone = clone;
        
            obj.prototype.equals = equals;
        
            //
            // Only generate hashCode if this structure type is a legal dictionary key type.
            //
            if(legalKeyType)
            {
                obj.prototype.hashCode = hashCode;
            }
        
            if(obj.prototype._write && obj.prototype._read)
            {
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
                    v._write(os);
                };
        
                obj.read = function(is, v)
                {
                    if(!v || !(v instanceof this))
                    {
                        v = new this();
                    }
                    v._read(is);
                    return v;
                };
        
                if(variableLength)
                {
                    Ice.StreamHelpers.FSizeOptHelper.call(obj);
                }
                else
                {
                    Ice.StreamHelpers.VSizeOptHelper.call(obj);
                }
            }
            return obj;
        };
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ConnectionF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        const _codeA = "A".charCodeAt(0);
        const _codea = "a".charCodeAt(0);
        const _code0 = "0".charCodeAt(0);
        
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
        
        class Base64
        {
            // Expects native Buffer
            static encode(buf)
            {
                if(buf === null || buf.length === 0)
                {
                    return "";
                }
        
                const v = [];
        
                let by1;
                let by2;
                let by3;
                let by4;
                let by5;
                let by6;
                let by7;
        
                for(let i = 0; i < buf.length; i += 3)
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
        
                const retval = v.join("");
                const outString = [];
                let iter = 0;
        
                while((retval.length - iter) > 76)
                {
                    outString.push(retval.substring(iter, iter + 76));
                    outString.push("\r\n");
                    iter += 76;
                }
        
                outString.push(retval.substring(iter));
        
                return outString.join("");
            }
        
            static decode(str) // Returns native Buffer
            {
                const newStr = [];
        
                for(let j = 0; j < str.length; j++)
                {
                    const c = str.charAt(j);
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
                const totalBytes = (newStr.length * 3 / 4) + 1;
        
                const retval = new Ice.Buffer();
                retval.resize(totalBytes);
        
                let by1;
                let by2;
                let by3;
                let by4;
        
                let c1;
                let c2;
                let c3;
                let c4;
        
                for(let i = 0; i < newStr.length; i += 4)
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
            }
        
            static isBase64(c)
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
            }
        }
        
        Ice.Base64 = Base64;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `BuiltinSequences.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        Slice.defineSequence(Ice, "BoolSeqHelper", "Ice.BoolHelper", true);
        
        Slice.defineSequence(Ice, "ByteSeqHelper", "Ice.ByteHelper", true);
        
        Slice.defineSequence(Ice, "ShortSeqHelper", "Ice.ShortHelper", true);
        
        Slice.defineSequence(Ice, "IntSeqHelper", "Ice.IntHelper", true);
        
        Slice.defineSequence(Ice, "LongSeqHelper", "Ice.LongHelper", true);
        
        Slice.defineSequence(Ice, "FloatSeqHelper", "Ice.FloatHelper", true);
        
        Slice.defineSequence(Ice, "DoubleSeqHelper", "Ice.DoubleHelper", true);
        
        Slice.defineSequence(Ice, "StringSeqHelper", "Ice.StringHelper", false);
        
        Slice.defineSequence(Ice, "ObjectSeqHelper", "Ice.ObjectHelper", false, "Ice.Value");
        
        Slice.defineSequence(Ice, "ObjectProxySeqHelper", "Ice.ObjectPrx", false);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Identity.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * The identity of an Ice object. In a proxy, an empty {@link Identity#name} denotes a nil
         * proxy. An identity with an empty {@link Identity#name} and a non-empty {@link Identity#category}
         * is illegal. You cannot add a servant with an empty name to the Active Servant Map.
         *
         * @see ServantLocator
         * @see ObjectAdapter#addServantLocator
         *
         **/
        Ice.Identity = class
        {
            constructor(name = "", category = "")
            {
                this.name = name;
                this.category = category;
            }
        
            _write(ostr)
            {
                ostr.writeString(this.name);
                ostr.writeString(this.category);
            }
        
            _read(istr)
            {
                this.name = istr.readString();
                this.category = istr.readString();
            }
        
            static get minWireSize()
            {
                return  2;
            }
        };
        
        Slice.defineStruct(Ice.Identity, true, true);
        
        Slice.defineDictionary(Ice, "ObjectDict", "ObjectDictHelper", "Ice.Identity", "Ice.ObjectHelper", false, Ice.HashMap.compareEquals, "Ice.Value");
        
        Slice.defineSequence(Ice, "IdentitySeqHelper", "Ice.Identity", false);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ObjectAdapterF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Version.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * A version structure for the protocol version.
         *
         **/
        Ice.ProtocolVersion = class
        {
            constructor(major = 0, minor = 0)
            {
                this.major = major;
                this.minor = minor;
            }
        
            _write(ostr)
            {
                ostr.writeByte(this.major);
                ostr.writeByte(this.minor);
            }
        
            _read(istr)
            {
                this.major = istr.readByte();
                this.minor = istr.readByte();
            }
        
            static get minWireSize()
            {
                return  2;
            }
        };
        
        Slice.defineStruct(Ice.ProtocolVersion, true, false);
        
        /**
         * A version structure for the encoding version.
         *
         **/
        Ice.EncodingVersion = class
        {
            constructor(major = 0, minor = 0)
            {
                this.major = major;
                this.minor = minor;
            }
        
            _write(ostr)
            {
                ostr.writeByte(this.major);
                ostr.writeByte(this.minor);
            }
        
            _read(istr)
            {
                this.major = istr.readByte();
                this.minor = istr.readByte();
            }
        
            static get minWireSize()
            {
                return  2;
            }
        };
        
        Slice.defineStruct(Ice.EncodingVersion, true, false);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        let Timer = {};
        
        if (typeof process != 'undefined')
        {
            Timer = class
            {
            }
        
            Timer.setTimeout = setTimeout;
            Timer.clearTimeout = clearTimeout;
            Timer.setInterval = setInterval;
            Timer.clearInterval = clearInterval;
            Timer.setImmediate = setImmediate;
            Ice.Timer = Timer;
        }
        else
        {
            function isIE()
            {
                return (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.match(/Trident.*rv:11\./));
            }
        
            function isEdge()
            {
                return (/Edge/).test(navigator.userAgent);
            }
        
            function isWorker()
            {
                return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
            }
        
            const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
            let _nextId = 0;
            const nextId = function()
            {
                if(_nextId == MAX_SAFE_INTEGER)
                {
                    _nextId = 0;
                }
                return _nextId++;
            };
            const _timers = new Map();
        
            //
            // Create a timer object that uses the default browser methods.
            //
            function createTimerObject()
            {
                const Timer = class
                {
                    static setTimeout(cb, ms)
                    {
                        return setTimeout(cb, ms);
                    }
        
                    static clearTimeout(id)
                    {
                        return clearTimeout(id);
                    }
        
                    static setInterval(cb, ms)
                    {
                        return setInterval(cb, ms);
                    }
        
                    static clearInterval(id)
                    {
                        return clearInterval(id);
                    }
                };
        
                //
                // For Browsers that support setImmediate prefer that,
                // otherwise implement it using MessageChannel
                //
                if(isEdge() || isIE())
                {
                    Timer.setImmediate = function(cb)
                    {
                        setImmediate(cb);
                    };
                }
                else
                {
                    //
                    // Should be only call for workers
                    //
                    const channel = new MessageChannel();
                    channel.port1.onmessage = event =>
                    {
                        const id = event.data;
                        const cb = _timers.get(id);
                        if(cb !== undefined)
                        {
                            cb.call();
                            _timers.delete(id);
                        }
                    };
        
                    Timer.setImmediate = function(cb)
                    {
                        const id = nextId();
                        _timers.set(id, cb);
                        channel.port2.postMessage(id);
                    };
                }
        
                return Timer;
            }
        
            const _SetTimeoutType = 0;
            const _SetIntervalType = 1;
            const _SetImmediateType = 2;
            const _ClearTimeoutType = 3;
            const _ClearIntervalType = 4;
        
            let worker;
        
            class Timer
            {
                static setTimeout(cb, ms)
                {
                    const id = nextId();
                    _timers.set(id, cb);
                    worker.postMessage({type: _SetTimeoutType, id: id, ms: ms});
                    return id;
                }
        
                static clearTimeout(id)
                {
                    _timers.delete(id);
                    worker.postMessage({type: _ClearTimeoutType, id: id});
                }
        
                static setInterval(cb, ms)
                {
                    const id = nextId();
                    _timers.set(id, cb);
                    worker.postMessage({type: _SetIntervalType, id: id, ms: ms});
                    return id;
                }
        
                static clearInterval(id)
                {
                    _timers.delete(id);
                    worker.postMessage({type: _ClearIntervalType, id: id});
                }
        
                static setImmediate(cb)
                {
                    const id = nextId();
                    _timers.set(id, cb);
                    worker.postMessage({type: _SetImmediateType, id: id});
                    return id;
                }
        
                static onmessage(e)
                {
                    const cb = _timers.get(e.data.id);
                    if(cb !== undefined)
                    {
                        cb.call();
                        if(e.data.type !== _SetIntervalType)
                        {
                            _timers.delete(e.data.id);
                        }
                    }
                }
            }
        
            const workerCode = function()
            {
                return "(" +
                function()
                {
                    //
                    // jshint worker: true
                    //
                    const _wSetTimeoutType = 0;
                    const _wSetIntervalType = 1;
                    const _wSetImmediateType = 2;
                    const _wClearTimeoutType = 3;
                    const _wClearIntervalType = 4;
        
                    const timers = {};
        
                    self.onmessage = e =>
                    {
                        if(e.data.type == _wSetTimeoutType)
                        {
                            timers[e.data.id] = setTimeout(() => self.postMessage(e.data), e.data.ms);
                        }
                        else if(e.data.type == _wSetIntervalType)
                        {
                            timers[e.data.id] = setInterval(() => self.postMessage(e.data), e.data.ms);
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
            };
        
            if(isIE())
            {
                //
                // With IE always use the setInterval/setTimeout browser functions directly
                //
                Ice.Timer = createTimerObject();
            }
            else if(isWorker())
            {
                //
                // If we are running in a worker don't spawn a separate worker for the timer
                //
                Ice.Timer = createTimerObject();
            }
            else if(worker === undefined)
            {
                const url = URL.createObjectURL(new Blob([workerCode()], {type: 'text/javascript'}));
                worker = new Worker(url);
                worker.onmessage = Timer.onmessage;
                Ice.Timer = Timer;
            }
        }
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `LocalException.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * This exception is raised when a failure occurs during initialization.
         *
         **/
        Ice.InitializationException = class extends Ice.LocalException
        {
            constructor(reason = "", _cause = "")
            {
                super(_cause);
                this.reason = reason;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::InitializationException";
            }
        };
        
        /**
         * This exception indicates that a failure occurred while initializing
         * a plug-in.
         *
         **/
        Ice.PluginInitializationException = class extends Ice.LocalException
        {
            constructor(reason = "", _cause = "")
            {
                super(_cause);
                this.reason = reason;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::PluginInitializationException";
            }
        };
        
        /**
         * This exception is raised if a feature is requested that is not
         * supported with collocation optimization.
         *
         * @deprecated This exception is no longer used by the Ice run time
         **/
        Ice.CollocationOptimizationException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::CollocationOptimizationException";
            }
        };
        
        /**
         * An attempt was made to register something more than once with
         * the Ice run time.
         *
         * This exception is raised if an attempt is made to register a
         * servant, servant locator, facet, value factory, plug-in, object
         * adapter, object, or user exception factory more than once for the
         * same ID.
         *
         **/
        Ice.AlreadyRegisteredException = class extends Ice.LocalException
        {
            constructor(kindOfObject = "", id = "", _cause = "")
            {
                super(_cause);
                this.kindOfObject = kindOfObject;
                this.id = id;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::AlreadyRegisteredException";
            }
        };
        
        /**
         * An attempt was made to find or deregister something that is not
         * registered with the Ice run time or Ice locator.
         *
         * This exception is raised if an attempt is made to remove a servant,
         * servant locator, facet, value factory, plug-in, object adapter,
         * object, or user exception factory that is not currently registered.
         *
         * It's also raised if the Ice locator can't find an object or object
         * adapter when resolving an indirect proxy or when an object adapter
         * is activated.
         *
         **/
        Ice.NotRegisteredException = class extends Ice.LocalException
        {
            constructor(kindOfObject = "", id = "", _cause = "")
            {
                super(_cause);
                this.kindOfObject = kindOfObject;
                this.id = id;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::NotRegisteredException";
            }
        };
        
        /**
         * The operation can only be invoked with a twoway request.
         *
         * This exception is raised if an attempt is made to invoke an
         * operation with <code>ice_oneway</code>, <code>ice_batchOneway</code>, <code>ice_datagram</code>,
         * or <code>ice_batchDatagram</code> and the operation has a return value,
         * out-parameters, or an exception specification.
         *
         **/
        Ice.TwowayOnlyException = class extends Ice.LocalException
        {
            constructor(operation = "", _cause = "")
            {
                super(_cause);
                this.operation = operation;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::TwowayOnlyException";
            }
        };
        
        /**
         * An attempt was made to clone a class that does not support
         * cloning.
         *
         * This exception is raised if <code>ice_clone</code> is called on
         * a class that is derived from an abstract Slice class (that is,
         * a class containing operations), and the derived class does not
         * provide an implementation of the <code>ice_clone</code> operation (C++ only).
         *
         **/
        Ice.CloneNotImplementedException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::CloneNotImplementedException";
            }
        };
        
        /**
         * This exception is raised if an operation call on a server raises an
         * unknown exception. For example, for C++, this exception is raised
         * if the server throws a C++ exception that is not directly or
         * indirectly derived from <code>Ice::LocalException</code> or
         * <code>Ice::UserException</code>.
         *
         **/
        Ice.UnknownException = class extends Ice.LocalException
        {
            constructor(unknown = "", _cause = "")
            {
                super(_cause);
                this.unknown = unknown;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::UnknownException";
            }
        };
        
        /**
         * This exception is raised if an operation call on a server raises a
         * local exception. Because local exceptions are not transmitted by
         * the Ice protocol, the client receives all local exceptions raised
         * by the server as {@link UnknownLocalException}. The only exception to this
         * rule are all exceptions derived from {@link RequestFailedException},
         * which are transmitted by the Ice protocol even though they are
         * declared <code>local</code>.
         *
         **/
        Ice.UnknownLocalException = class extends Ice.UnknownException
        {
            constructor(unknown, _cause = "")
            {
                super(unknown, _cause);
            }
        
            static get _parent()
            {
                return Ice.UnknownException;
            }
        
            static get _id()
            {
                return "::Ice::UnknownLocalException";
            }
        };
        
        /**
         * An operation raised an incorrect user exception.
         *
         * This exception is raised if an operation raises a
         * user exception that is not declared in the exception's
         * <code>throws</code> clause. Such undeclared exceptions are
         * not transmitted from the server to the client by the Ice
         * protocol, but instead the client just gets an
         * {@link UnknownUserException}. This is necessary in order to not violate
         * the contract established by an operation's signature: Only local
         * exceptions and user exceptions declared in the
         * <code>throws</code> clause can be raised.
         *
         **/
        Ice.UnknownUserException = class extends Ice.UnknownException
        {
            constructor(unknown, _cause = "")
            {
                super(unknown, _cause);
            }
        
            static get _parent()
            {
                return Ice.UnknownException;
            }
        
            static get _id()
            {
                return "::Ice::UnknownUserException";
            }
        };
        
        /**
         * This exception is raised if the Ice library version does not match
         * the version in the Ice header files.
         *
         **/
        Ice.VersionMismatchException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::VersionMismatchException";
            }
        };
        
        /**
         * This exception is raised if the {@link Communicator} has been destroyed.
         *
         * @see Communicator#destroy
         *
         **/
        Ice.CommunicatorDestroyedException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::CommunicatorDestroyedException";
            }
        };
        
        /**
         * This exception is raised if an attempt is made to use a deactivated
         * {@link ObjectAdapter}.
         *
         * @see ObjectAdapter#deactivate
         * @see Communicator#shutdown
         *
         **/
        Ice.ObjectAdapterDeactivatedException = class extends Ice.LocalException
        {
            constructor(name = "", _cause = "")
            {
                super(_cause);
                this.name = name;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::ObjectAdapterDeactivatedException";
            }
        };
        
        /**
         * This exception is raised if an {@link ObjectAdapter} cannot be activated.
         *
         * This happens if the {@link Locator} detects another active {@link ObjectAdapter} with
         * the same adapter id.
         *
         **/
        Ice.ObjectAdapterIdInUseException = class extends Ice.LocalException
        {
            constructor(id = "", _cause = "")
            {
                super(_cause);
                this.id = id;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::ObjectAdapterIdInUseException";
            }
        };
        
        /**
         * This exception is raised if no suitable endpoint is available.
         *
         **/
        Ice.NoEndpointException = class extends Ice.LocalException
        {
            constructor(proxy = "", _cause = "")
            {
                super(_cause);
                this.proxy = proxy;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::NoEndpointException";
            }
        };
        
        /**
         * This exception is raised if there was an error while parsing an
         * endpoint.
         *
         **/
        Ice.EndpointParseException = class extends Ice.LocalException
        {
            constructor(str = "", _cause = "")
            {
                super(_cause);
                this.str = str;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::EndpointParseException";
            }
        };
        
        /**
         * This exception is raised if there was an error while parsing an
         * endpoint selection type.
         *
         **/
        Ice.EndpointSelectionTypeParseException = class extends Ice.LocalException
        {
            constructor(str = "", _cause = "")
            {
                super(_cause);
                this.str = str;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::EndpointSelectionTypeParseException";
            }
        };
        
        /**
         * This exception is raised if there was an error while parsing a
         * version.
         *
         **/
        Ice.VersionParseException = class extends Ice.LocalException
        {
            constructor(str = "", _cause = "")
            {
                super(_cause);
                this.str = str;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::VersionParseException";
            }
        };
        
        /**
         * This exception is raised if there was an error while parsing a
         * stringified identity.
         *
         **/
        Ice.IdentityParseException = class extends Ice.LocalException
        {
            constructor(str = "", _cause = "")
            {
                super(_cause);
                this.str = str;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::IdentityParseException";
            }
        };
        
        /**
         * This exception is raised if there was an error while parsing a
         * stringified proxy.
         *
         **/
        Ice.ProxyParseException = class extends Ice.LocalException
        {
            constructor(str = "", _cause = "")
            {
                super(_cause);
                this.str = str;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::ProxyParseException";
            }
        };
        
        /**
         * This exception is raised if an illegal identity is encountered.
         *
         **/
        Ice.IllegalIdentityException = class extends Ice.LocalException
        {
            constructor(id = new Ice.Identity(), _cause = "")
            {
                super(_cause);
                this.id = id;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::IllegalIdentityException";
            }
        };
        
        /**
         * This exception is raised to reject an illegal servant (typically
         * a null servant)
         *
         **/
        Ice.IllegalServantException = class extends Ice.LocalException
        {
            constructor(reason = "", _cause = "")
            {
                super(_cause);
                this.reason = reason;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::IllegalServantException";
            }
        };
        
        /**
         * This exception is raised if a request failed. This exception, and
         * all exceptions derived from {@link RequestFailedException}, are
         * transmitted by the Ice protocol, even though they are declared
         * <code>local</code>.
         *
         **/
        Ice.RequestFailedException = class extends Ice.LocalException
        {
            constructor(id = new Ice.Identity(), facet = "", operation = "", _cause = "")
            {
                super(_cause);
                this.id = id;
                this.facet = facet;
                this.operation = operation;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::RequestFailedException";
            }
        };
        
        /**
         * This exception is raised if an object does not exist on the server,
         * that is, if no facets with the given identity exist.
         *
         **/
        Ice.ObjectNotExistException = class extends Ice.RequestFailedException
        {
            constructor(id, facet, operation, _cause = "")
            {
                super(id, facet, operation, _cause);
            }
        
            static get _parent()
            {
                return Ice.RequestFailedException;
            }
        
            static get _id()
            {
                return "::Ice::ObjectNotExistException";
            }
        };
        
        /**
         * This exception is raised if no facet with the given name exists,
         * but at least one facet with the given identity exists.
         *
         **/
        Ice.FacetNotExistException = class extends Ice.RequestFailedException
        {
            constructor(id, facet, operation, _cause = "")
            {
                super(id, facet, operation, _cause);
            }
        
            static get _parent()
            {
                return Ice.RequestFailedException;
            }
        
            static get _id()
            {
                return "::Ice::FacetNotExistException";
            }
        };
        
        /**
         * This exception is raised if an operation for a given object does
         * not exist on the server. Typically this is caused by either the
         * client or the server using an outdated Slice specification.
         *
         **/
        Ice.OperationNotExistException = class extends Ice.RequestFailedException
        {
            constructor(id, facet, operation, _cause = "")
            {
                super(id, facet, operation, _cause);
            }
        
            static get _parent()
            {
                return Ice.RequestFailedException;
            }
        
            static get _id()
            {
                return "::Ice::OperationNotExistException";
            }
        };
        
        /**
         * This exception is raised if a system error occurred in the server
         * or client process. There are many possible causes for such a system
         * exception. For details on the cause, {@link SyscallException#error}
         * should be inspected.
         *
         **/
        Ice.SyscallException = class extends Ice.LocalException
        {
            constructor(error = 0, _cause = "")
            {
                super(_cause);
                this.error = error;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::SyscallException";
            }
        };
        
        /**
         * This exception indicates socket errors.
         *
         **/
        Ice.SocketException = class extends Ice.SyscallException
        {
            constructor(error, _cause = "")
            {
                super(error, _cause);
            }
        
            static get _parent()
            {
                return Ice.SyscallException;
            }
        
            static get _id()
            {
                return "::Ice::SocketException";
            }
        };
        
        /**
         * This exception indicates CFNetwork errors.
         *
         **/
        Ice.CFNetworkException = class extends Ice.SocketException
        {
            constructor(error, domain = "", _cause = "")
            {
                super(error, _cause);
                this.domain = domain;
            }
        
            static get _parent()
            {
                return Ice.SocketException;
            }
        
            static get _id()
            {
                return "::Ice::CFNetworkException";
            }
        };
        
        /**
         * This exception indicates file errors.
         *
         **/
        Ice.FileException = class extends Ice.SyscallException
        {
            constructor(error, path = "", _cause = "")
            {
                super(error, _cause);
                this.path = path;
            }
        
            static get _parent()
            {
                return Ice.SyscallException;
            }
        
            static get _id()
            {
                return "::Ice::FileException";
            }
        };
        
        /**
         * This exception indicates connection failures.
         *
         **/
        Ice.ConnectFailedException = class extends Ice.SocketException
        {
            constructor(error, _cause = "")
            {
                super(error, _cause);
            }
        
            static get _parent()
            {
                return Ice.SocketException;
            }
        
            static get _id()
            {
                return "::Ice::ConnectFailedException";
            }
        };
        
        /**
         * This exception indicates a connection failure for which
         * the server host actively refuses a connection.
         *
         **/
        Ice.ConnectionRefusedException = class extends Ice.ConnectFailedException
        {
            constructor(error, _cause = "")
            {
                super(error, _cause);
            }
        
            static get _parent()
            {
                return Ice.ConnectFailedException;
            }
        
            static get _id()
            {
                return "::Ice::ConnectionRefusedException";
            }
        };
        
        /**
         * This exception indicates a lost connection.
         *
         **/
        Ice.ConnectionLostException = class extends Ice.SocketException
        {
            constructor(error, _cause = "")
            {
                super(error, _cause);
            }
        
            static get _parent()
            {
                return Ice.SocketException;
            }
        
            static get _id()
            {
                return "::Ice::ConnectionLostException";
            }
        };
        
        /**
         * This exception indicates a DNS problem. For details on the cause,
         * {@link DNSException#error} should be inspected.
         *
         **/
        Ice.DNSException = class extends Ice.LocalException
        {
            constructor(error = 0, host = "", _cause = "")
            {
                super(_cause);
                this.error = error;
                this.host = host;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::DNSException";
            }
        };
        
        /**
         * This exception indicates a request was interrupted.
         *
         **/
        Ice.OperationInterruptedException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::OperationInterruptedException";
            }
        };
        
        /**
         * This exception indicates a timeout condition.
         *
         **/
        Ice.TimeoutException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::TimeoutException";
            }
        };
        
        /**
         * This exception indicates a connection establishment timeout condition.
         *
         **/
        Ice.ConnectTimeoutException = class extends Ice.TimeoutException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.TimeoutException;
            }
        
            static get _id()
            {
                return "::Ice::ConnectTimeoutException";
            }
        };
        
        /**
         * This exception indicates a connection closure timeout condition.
         *
         **/
        Ice.CloseTimeoutException = class extends Ice.TimeoutException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.TimeoutException;
            }
        
            static get _id()
            {
                return "::Ice::CloseTimeoutException";
            }
        };
        
        /**
         * This exception indicates that a connection has been shut down because it has been
         * idle for some time.
         *
         **/
        Ice.ConnectionTimeoutException = class extends Ice.TimeoutException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.TimeoutException;
            }
        
            static get _id()
            {
                return "::Ice::ConnectionTimeoutException";
            }
        };
        
        /**
         * This exception indicates that an invocation failed because it timed
         * out.
         *
         **/
        Ice.InvocationTimeoutException = class extends Ice.TimeoutException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.TimeoutException;
            }
        
            static get _id()
            {
                return "::Ice::InvocationTimeoutException";
            }
        };
        
        /**
         * This exception indicates that an asynchronous invocation failed
         * because it was canceled explicitly by the user.
         *
         **/
        Ice.InvocationCanceledException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::InvocationCanceledException";
            }
        };
        
        /**
         * A generic exception base for all kinds of protocol error
         * conditions.
         *
         **/
        Ice.ProtocolException = class extends Ice.LocalException
        {
            constructor(reason = "", _cause = "")
            {
                super(_cause);
                this.reason = reason;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::ProtocolException";
            }
        };
        
        /**
         * This exception indicates that a message did not start with the expected
         * magic number ('I', 'c', 'e', 'P').
         *
         **/
        Ice.BadMagicException = class extends Ice.ProtocolException
        {
            constructor(reason, badMagic = null, _cause = "")
            {
                super(reason, _cause);
                this.badMagic = badMagic;
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::BadMagicException";
            }
        };
        
        /**
         * This exception indicates an unsupported protocol version.
         *
         **/
        Ice.UnsupportedProtocolException = class extends Ice.ProtocolException
        {
            constructor(reason, bad = new Ice.ProtocolVersion(), supported = new Ice.ProtocolVersion(), _cause = "")
            {
                super(reason, _cause);
                this.bad = bad;
                this.supported = supported;
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::UnsupportedProtocolException";
            }
        };
        
        /**
         * This exception indicates an unsupported data encoding version.
         *
         **/
        Ice.UnsupportedEncodingException = class extends Ice.ProtocolException
        {
            constructor(reason, bad = new Ice.EncodingVersion(), supported = new Ice.EncodingVersion(), _cause = "")
            {
                super(reason, _cause);
                this.bad = bad;
                this.supported = supported;
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::UnsupportedEncodingException";
            }
        };
        
        /**
         * This exception indicates that an unknown protocol message has been received.
         *
         **/
        Ice.UnknownMessageException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::UnknownMessageException";
            }
        };
        
        /**
         * This exception is raised if a message is received over a connection
         * that is not yet validated.
         *
         **/
        Ice.ConnectionNotValidatedException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::ConnectionNotValidatedException";
            }
        };
        
        /**
         * This exception indicates that a response for an unknown request ID has been
         * received.
         *
         **/
        Ice.UnknownRequestIdException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::UnknownRequestIdException";
            }
        };
        
        /**
         * This exception indicates that an unknown reply status has been received.
         *
         **/
        Ice.UnknownReplyStatusException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::UnknownReplyStatusException";
            }
        };
        
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
        Ice.CloseConnectionException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::CloseConnectionException";
            }
        };
        
        /**
         * This exception is raised by an operation call if the application
         * closes the connection locally using {@link Connection#close}.
         *
         * @see Connection#close
         *
         **/
        Ice.ConnectionManuallyClosedException = class extends Ice.LocalException
        {
            constructor(graceful = false, _cause = "")
            {
                super(_cause);
                this.graceful = graceful;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::ConnectionManuallyClosedException";
            }
        };
        
        /**
         * This exception indicates that a message size is less
         * than the minimum required size.
         *
         **/
        Ice.IllegalMessageSizeException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::IllegalMessageSizeException";
            }
        };
        
        /**
         * This exception indicates a problem with compressing or uncompressing data.
         *
         **/
        Ice.CompressionException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::CompressionException";
            }
        };
        
        /**
         * A datagram exceeds the configured size.
         *
         * This exception is raised if a datagram exceeds the configured send or receive buffer
         * size, or exceeds the maximum payload size of a UDP packet (65507 bytes).
         *
         **/
        Ice.DatagramLimitException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::DatagramLimitException";
            }
        };
        
        /**
         * This exception is raised for errors during marshaling or unmarshaling data.
         *
         **/
        Ice.MarshalException = class extends Ice.ProtocolException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.ProtocolException;
            }
        
            static get _id()
            {
                return "::Ice::MarshalException";
            }
        };
        
        /**
         * This exception is raised if inconsistent data is received while unmarshaling a proxy.
         *
         **/
        Ice.ProxyUnmarshalException = class extends Ice.MarshalException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.MarshalException;
            }
        
            static get _id()
            {
                return "::Ice::ProxyUnmarshalException";
            }
        };
        
        /**
         * This exception is raised if an out-of-bounds condition occurs during unmarshaling.
         *
         **/
        Ice.UnmarshalOutOfBoundsException = class extends Ice.MarshalException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.MarshalException;
            }
        
            static get _id()
            {
                return "::Ice::UnmarshalOutOfBoundsException";
            }
        };
        
        /**
         * This exception is raised if no suitable value factory was found during
         * unmarshaling of a Slice class instance.
         *
         * @see ValueFactory
         * @see Communicator#getValueFactoryManager
         * @see ValueFactoryManager#add
         * @see ValueFactoryManager#find
         *
         **/
        Ice.NoValueFactoryException = class extends Ice.MarshalException
        {
            constructor(reason, type = "", _cause = "")
            {
                super(reason, _cause);
                this.type = type;
            }
        
            static get _parent()
            {
                return Ice.MarshalException;
            }
        
            static get _id()
            {
                return "::Ice::NoValueFactoryException";
            }
        };
        
        /**
         * This exception is raised if the type of an unmarshaled Slice class instance does
         * not match its expected type.
         * This can happen if client and server are compiled with mismatched Slice
         * definitions or if a class of the wrong type is passed as a parameter
         * or return value using dynamic invocation. This exception can also be
         * raised if IceStorm is used to send Slice class instances and
         * an operation is subscribed to the wrong topic.
         *
         **/
        Ice.UnexpectedObjectException = class extends Ice.MarshalException
        {
            constructor(reason, type = "", expectedType = "", _cause = "")
            {
                super(reason, _cause);
                this.type = type;
                this.expectedType = expectedType;
            }
        
            static get _parent()
            {
                return Ice.MarshalException;
            }
        
            static get _id()
            {
                return "::Ice::UnexpectedObjectException";
            }
        };
        
        /**
         * This exception is raised when Ice receives a request or reply
         * message whose size exceeds the limit specified by the
         * <code>Ice.MessageSizeMax</code> property.
         *
         **/
        Ice.MemoryLimitException = class extends Ice.MarshalException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.MarshalException;
            }
        
            static get _id()
            {
                return "::Ice::MemoryLimitException";
            }
        };
        
        /**
         * This exception is raised when a string conversion to or from UTF-8
         * fails during marshaling or unmarshaling.
         *
         **/
        Ice.StringConversionException = class extends Ice.MarshalException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.MarshalException;
            }
        
            static get _id()
            {
                return "::Ice::StringConversionException";
            }
        };
        
        /**
         * This exception indicates a malformed data encapsulation.
         *
         **/
        Ice.EncapsulationException = class extends Ice.MarshalException
        {
            constructor(reason, _cause = "")
            {
                super(reason, _cause);
            }
        
            static get _parent()
            {
                return Ice.MarshalException;
            }
        
            static get _id()
            {
                return "::Ice::EncapsulationException";
            }
        };
        
        /**
         * This exception is raised if an unsupported feature is used. The
         * unsupported feature string contains the name of the unsupported
         * feature
         *
         **/
        Ice.FeatureNotSupportedException = class extends Ice.LocalException
        {
            constructor(unsupportedFeature = "", _cause = "")
            {
                super(_cause);
                this.unsupportedFeature = unsupportedFeature;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::FeatureNotSupportedException";
            }
        };
        
        /**
         * This exception indicates a failure in a security subsystem,
         * such as the IceSSL plug-in.
         *
         **/
        Ice.SecurityException = class extends Ice.LocalException
        {
            constructor(reason = "", _cause = "")
            {
                super(_cause);
                this.reason = reason;
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::SecurityException";
            }
        };
        
        /**
         * This exception indicates that an attempt has been made to
         * change the connection properties of a fixed proxy.
         *
         **/
        Ice.FixedProxyException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::FixedProxyException";
            }
        };
        
        /**
         * Indicates that the response to a request has already been sent;
         * re-dispatching such a request is not possible.
         *
         **/
        Ice.ResponseSentException = class extends Ice.LocalException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.LocalException;
            }
        
            static get _id()
            {
                return "::Ice::ResponseSentException";
            }
        };
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `PluginF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Identity = Ice.Identity;
        const IdentityParseException = Ice.IdentityParseException;
        const StringUtil = Ice.StringUtil;
        
        /**
        * Converts a string to an object identity.
        *
        * @param s The string to convert.
        *
        * @return The converted object identity.
        **/
        Ice.stringToIdentity = function(s)
        {
            const ident = new Identity();
        
            //
            // Find unescaped separator; note that the string may contain an escaped
            // backslash before the separator.
            //
            let slash = -1;
            let pos = 0;
            while((pos = s.indexOf('/', pos)) !== -1)
            {
                let escapes = 0;
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
                        throw new IdentityParseException(`unescaped backslash in identity \`${s}'`);
                    }
                }
                pos++;
            }
        
            if(slash == -1)
            {
                ident.category = "";
                try
                {
                    ident.name = StringUtil.unescapeString(s, 0, s.length, "/");
                }
                catch(e)
                {
                    throw new IdentityParseException(`invalid identity name \`${s}': ${e.toString()}`);
                }
            }
            else
            {
                try
                {
                    ident.category = StringUtil.unescapeString(s, 0, slash, "/");
                }
                catch(e)
                {
                    throw new IdentityParseException(`invalid category in identity \`${s}': ${e.toString()}`);
                }
                if(slash + 1 < s.length)
                {
                    try
                    {
                        ident.name = StringUtil.unescapeString(s, slash + 1, s.length, "/");
                    }
                    catch(e)
                    {
                        throw new IdentityParseException(`invalid name in identity \`${s}': ${e.toString()}`);
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
        * @param toStringMode Specifies if and how non-printable ASCII characters are escaped in the result.
        *
        * @return The string representation of the object identity.
        **/
        Ice.identityToString = function(ident, toStringMode = Ice.ToStringMode.Unicode)
        {
            if(ident.category === null || ident.category.length === 0)
            {
                return StringUtil.escapeString(ident.name, "/", toStringMode);
            }
            else
            {
                return StringUtil.escapeString(ident.category, "/", toStringMode) + '/' + StringUtil.escapeString(ident.name, "/", toStringMode);
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
                const lhsIdentity = lhs.ice_getIdentity();
                const rhsIdentity = rhs.ice_getIdentity();
                const n = lhsIdentity.name.localeCompare(rhsIdentity.name);
                return (n !== 0) ? n : lhsIdentity.category.localeCompare(rhsIdentity.category);
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
                const lhsIdentity = lhs.ice_getIdentity();
                const rhsIdentity = rhs.ice_getIdentity();
                let n = lhsIdentity.name.localeCompare(rhsIdentity.name);
                if(n !== 0)
                {
                    return n;
                }
                n = lhsIdentity.category.localeCompare(rhsIdentity.category);
                if(n !== 0)
                {
                    return n;
                }
        
                const lhsFacet = lhs.ice_getFacet();
                const rhsFacet = rhs.ice_getFacet();
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
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        //
        // Local aliases.
        //
        const UnexpectedObjectException = Ice.UnexpectedObjectException;
        const MemoryLimitException = Ice.MemoryLimitException;
        
        //
        // Exception utilities
        //
        
        Ice.ExUtil =
        {
            throwUOE: function(expectedType, v)
            {
                const type = v.ice_id();
                throw new UnexpectedObjectException("expected element of type `" + expectedType + "' but received `" +
                                                    type + "'", type, expectedType);
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
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        class Logger
        {
            constructor(prefix)
            {
                if(prefix !== undefined && prefix.length > 0)
                {
                    this._prefix = prefix + ": ";
                }
                else
                {
                    this._prefix = "";
                }
        
                this._dateformat =
                {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                };
            }
        
            print(message)
            {
                this.write(message, false);
            }
        
            trace(category, message)
            {
                const s = [];
                s.push("-- ");
                s.push(this.timestamp());
                s.push(' ');
                s.push(this._prefix);
                s.push(category);
                s.push(": ");
                s.push(message);
                this.write(s.join(""), true);
            }
        
            warning(message)
            {
                const s = [];
                s.push("-! ");
                s.push(this.timestamp());
                s.push(' ');
                s.push(this._prefix);
                s.push("warning: ");
                s.push(message);
                this.write(s.join(""), true);
            }
        
            error(message)
            {
                const s = [];
                s.push("!! ");
                s.push(this.timestamp());
                s.push(' ');
                s.push(this._prefix);
                s.push("error: ");
                s.push(message);
                this.write(s.join(""), true);
            }
        
            cloneWithPrefix(prefix)
            {
                return new Logger(prefix);
            }
        
            write(message, indent)
            {
                if(indent)
                {
                    message = message.replace(/\n/g, "\n   ");
                }
        
                console.log(message);
            }
        
            timestamp()
            {
                const d = new Date();
                return d.toLocaleString("en-US", this._dateformat) + "." + d.getMilliseconds();
            }
        }
        
        Ice.Logger = Logger;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        class SliceInfo
        {
            constructor()
            {
                //
                // The Slice type ID for this slice.
                //
                this.typeId = "";
        
                //
                // The Slice compact type ID for this slice.
                //
                this.compactId = -1;
        
                //
                // The encoded bytes for this slice, including the leading size integer.
                //
                this.bytes = [];
        
                //
                // The class instances referenced by this slice.
                //
                this.instances = [];
        
                //
                // Whether or not the slice contains optional members.
                //
                this.hasOptionalMembers = false;
        
                //
                // Whether or not this is the last slice.
                //
                this.isLastSlice = false;
            }
        }
        Ice.SliceInfo = SliceInfo;
        
        class SlicedData
        {
            constructor(slices)
            {
                this.slices = slices;
            }
        }
        Ice.SlicedData = SlicedData;
        
        class UnknownSlicedValue extends Ice.Value
        {
            constructor(unknownTypeId)
            {
                super();
                this._unknownTypeId = unknownTypeId;
            }
        
            ice_getSlicedData()
            {
                return this._slicedData;
            }
        
            ice_id()
            {
                return this._unknownTypeId;
            }
        
            _iceWrite(os)
            {
                os.startValue(this._slicedData);
                os.endValue();
            }
        
            _iceRead(is)
            {
                is.startValue();
                this._slicedData = is.endValue(true);
            }
        }
        Ice.UnknownSlicedValue = UnknownSlicedValue;
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const StringUtil = Ice.StringUtil;
        
        const Protocol = {};
        
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
        // The magic number at the front of each message ['I', 'c', 'e', 'P']
        //
        Protocol.magic = new Uint8Array([0x49, 0x63, 0x65, 0x50]);
        
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
        
        Protocol.requestHdr = new Uint8Array([
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
            0, 0, 0, 0 // Request ID (placeholder).
        ]);
        
        Protocol.requestBatchHdr = new Uint8Array([
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
            0, 0, 0, 0 // Number of requests in batch (placeholder).
        ]);
        
        Protocol.replyHdr = new Uint8Array([
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
        
        Protocol.OPTIONAL_END_MARKER = 0xFF;
        Protocol.FLAG_HAS_TYPE_ID_STRING = (1 << 0);
        Protocol.FLAG_HAS_TYPE_ID_INDEX = (1 << 1);
        Protocol.FLAG_HAS_TYPE_ID_COMPACT = (1 << 1 | 1 << 0);
        Protocol.FLAG_HAS_OPTIONAL_MEMBERS = (1 << 2);
        Protocol.FLAG_HAS_INDIRECTION_TABLE = (1 << 3);
        Protocol.FLAG_HAS_SLICE_SIZE = (1 << 4);
        Protocol.FLAG_IS_LAST_SLICE = (1 << 5);
        
        Ice.Protocol = Protocol;
        
        function stringToMajor(str)
        {
            const pos = str.indexOf('.');
            if(pos === -1)
            {
                throw new Ice.VersionParseException("malformed version value `" + str + "'");
            }
        
            try
            {
                const majVersion = StringUtil.toInt(str.substring(0, pos));
                if(majVersion < 1 || majVersion > 255)
                {
                    throw new Ice.VersionParseException("range error in version `" + str + "'");
                }
                return majVersion;
            }
            catch(ex)
            {
                throw new Ice.VersionParseException("invalid version value `" + str + "'");
            }
        }
        
        function stringToMinor(str)
        {
            const pos = str.indexOf('.');
            if(pos === -1)
            {
                throw new Ice.VersionParseException("malformed version value `" + str + "'");
            }
        
            try
            {
                const minVersion = StringUtil.toInt(str.substring(pos + 1));
                if(minVersion < 0 || minVersion > 255)
                {
                    throw new Ice.VersionParseException("range error in version `" + str + "'");
                }
                return minVersion;
            }
            catch(ex)
            {
                throw new Ice.VersionParseException("invalid version value `" + str + "'");
            }
        }
        
        function majorMinorToString(major, minor)
        {
            return major + "." + minor;
        }
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        class MapUtil
        {
            static equals(m1, m2)
            {
                if(m1 === m2)
                {
                    return true;
                }
                else if(m1.size != m2.size)
                {
                    return false;
                }
                else
                {
                    for(const [key, value] of m1)
                    {
                        if(value === undefined)
                        {
                            if(!m2.has(key))
                            {
                                return false;
                            }
                            else if(m2.get(key) !== value)
                            {
                                return false;
                            }
                        }
                        else if(m2.get(key) !== value)
                        {
                            return false;
                        }
                    }
                }
                return true;
            }
        }
        
        Ice.MapUtil = MapUtil;
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Current.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        Slice.defineDictionary(Ice, "Context", "ContextHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
        
        /**
         * Determines the retry behavior an invocation in case of a (potentially) recoverable error.
         *
         **/
        Ice.OperationMode = Slice.defineEnum([
            ['Normal', 0], ['Nonmutating', 1], ['Idempotent', 2]]);
        
        /**
         * Information about the current method invocation for servers. Each
         * operation on the server has a <code>Current</code> as its implicit final
         * parameter. <code>Current</code> is mostly used for Ice services. Most
         * applications ignore this parameter.
         *
         **/
        Ice.Current = class
        {
            constructor(adapter = null, con = null, id = new Ice.Identity(), facet = "", operation = "", mode = Ice.OperationMode.Normal, ctx = null, requestId = 0, encoding = new Ice.EncodingVersion())
            {
                this.adapter = adapter;
                this.con = con;
                this.id = id;
                this.facet = facet;
                this.operation = operation;
                this.mode = mode;
                this.ctx = ctx;
                this.requestId = requestId;
                this.encoding = encoding;
            }
        };
        
        Slice.defineStruct(Ice.Current, false, true);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        Ice.Property = class
        {
            constructor(pattern, deprecated, deprecatedBy)
            {
                this._pattern = pattern;
                this._deprecated = deprecated;
                this._deprecatedBy = deprecatedBy;
            }
        
            get pattern()
            {
                return this._pattern;
            }
        
            get deprecated()
            {
                return this._deprecated;
            }
        
            get deprecatedBy()
            {
                return this._deprecatedBy;
            }
        };
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        // Generated by makeprops.py from file ..\config\PropertyNames.xml, Fri Jan  7 10:30:00 2022
        
        // IMPORTANT: Do not edit this file -- any edits made here will be lost!
        
        /* eslint comma-dangle: "off" */
        /* eslint array-bracket-newline: "off" */
        /* eslint no-useless-escape: "off" */
        
        const PropertyNames = {};
        const Property = Ice.Property;
        PropertyNames.IceProps =
        [
            new Property("/^Ice\.AcceptClassCycles/", false, null),
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
            new Property("/^Ice\.ClassGraphDepthMax/", false, null),
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
            new Property("/^Ice\.LogFile\.SizeMax/", false, null),
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
            new Property("/^Ice\.PreloadAssemblies/", false, null),
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
            new Property("/^Ice\.ToStringMode/", false, null),
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
            new Property("/^Ice\.UseOSLog/", false, null),
            new Property("/^Ice\.UseSyslog/", false, null),
            new Property("/^Ice\.UseSystemdJournal/", false, null),
            new Property("/^Ice\.Warn\.AMICallback/", false, null),
            new Property("/^Ice\.Warn\.Connections/", false, null),
            new Property("/^Ice\.Warn\.Datagrams/", false, null),
            new Property("/^Ice\.Warn\.Dispatch/", false, null),
            new Property("/^Ice\.Warn\.Endpoints/", false, null),
            new Property("/^Ice\.Warn\.UnknownProperties/", false, null),
            new Property("/^Ice\.Warn\.UnusedProperties/", false, null),
            new Property("/^Ice\.CacheMessageBuffers/", false, null),
            new Property("/^Ice\.ThreadInterruptSafe/", false, null),
        ];
        
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
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const CommunicatorDestroyedException = Ice.CommunicatorDestroyedException;
        
        class Timer
        {
            constructor(logger)
            {
                this._logger = logger;
                this._destroyed = false;
                this._tokenId = 0;
                this._tokens = new Map();
            }
        
            destroy()
            {
                this._tokens.forEach((value, key) => this.cancel(key));
                this._destroyed = true;
                this._tokens.clear();
            }
        
            schedule(callback, delay)
            {
                if(this._destroyed)
                {
                    throw new CommunicatorDestroyedException();
                }
                const token = this._tokenId++;
                const id = Timer.setTimeout(() => this.handleTimeout(token), delay);
                this._tokens.set(token, {callback: callback, id: id, isInterval: false});
                return token;
            }
        
            scheduleRepeated(callback, period)
            {
                if(this._destroyed)
                {
                    throw new CommunicatorDestroyedException();
                }
                const token = this._tokenId++;
                const id = Timer.setInterval(() => this.handleInterval(token), period);
                this._tokens.set(token, {callback: callback, id: id, isInterval: true});
                return token;
            }
        
            cancel(id)
            {
                if(this._destroyed)
                {
                    return false;
                }
        
                const token = this._tokens.get(id);
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
            }
        
            handleTimeout(id)
            {
                if(this._destroyed)
                {
                    return;
                }
        
                const token = this._tokens.get(id);
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
            }
        
            handleInterval(id)
            {
                if(this._destroyed)
                {
                    return;
                }
        
                const token = this._tokens.get(id);
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
        }
        
        Timer.setTimeout = Ice.Timer.setTimeout;
        Timer.clearTimeout = Ice.Timer.clearTimeout;
        Timer.setInterval = Ice.Timer.setInterval;
        Timer.clearInterval = Ice.Timer.clearInterval;
        Timer.setImmediate = Ice.Timer.setImmediate;
        
        Ice.Timer = Timer;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        const Timer = Ice.Timer;
        
        class P extends Promise
        {
            constructor(cb)
            {
                let res;
                let rej;
                super((resolve, reject) =>
                    {
                        res = resolve;
                        rej = reject;
        
                        if(cb)
                        {
                            cb(resolve, reject);
                        }
                    });
        
                this.resolve = res;
                this.reject = rej;
            }
        
            delay(ms)
            {
                return this.then(
                    value => new P((resolve, reject) => Timer.setTimeout(() => resolve(value), ms)),
                    reason => new P((resolve, reject) => Timer.setTimeout(() => reject(reason), ms)));
            }
        
            static get [Symbol.species]()
            {
                return P;
            }
        
            static delay(ms, value)
            {
                return new P(resolve => Timer.setTimeout(() => resolve(value), ms));
            }
        
            static try(cb)
            {
                return P.resolve().then(cb);
            }
        }
        
        Ice.Promise = P;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        //
        // Local aliases.
        //
        const Debug = Ice.Debug;
        const Identity = Ice.Identity;
        const OperationMode = Ice.OperationMode;
        const Protocol = Ice.Protocol;
        const StringUtil = Ice.StringUtil;
        
        const slicingIds = new Map();
        
        function printIdentityFacetOperation(s, stream)
        {
            let toStringMode = Ice.ToStringMode.Unicode;
            if(stream.instance !== null)
            {
                toStringMode = stream.instance.toStringMode();
            }
        
            const identity = new Identity();
            identity._read(stream);
            s.push("\nidentity = " + Ice.identityToString(identity, toStringMode));
        
            const facet = Ice.StringSeqHelper.read(stream);
            s.push("\nfacet = ");
            if(facet.length > 0)
            {
                s.push(StringUtil.escapeString(facet[0], "", toStringMode));
            }
        
            const operation = stream.readString();
            s.push("\noperation = " + operation);
        }
        
        function printRequest(s, stream)
        {
            const requestId = stream.readInt();
            s.push("\nrequest id = " + requestId);
            if(requestId === 0)
            {
                s.push(" (oneway)");
            }
        
            printRequestHeader(s, stream);
        }
        
        function printBatchRequest(s, stream)
        {
            const batchRequestNum = stream.readInt();
            s.push("\nnumber of requests = " + batchRequestNum);
        
            for(let i = 0; i < batchRequestNum; ++i)
            {
                s.push("\nrequest #" + i + ':');
                printRequestHeader(s, stream);
            }
        }
        
        function printReply(s, stream)
        {
            const requestId = stream.readInt();
            s.push("\nrequest id = " + requestId);
        
            const replyStatus = stream.readByte();
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
        
                const unknown = stream.readString();
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
                const ver = stream.skipEncapsulation();
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
        
            const mode = stream.readByte();
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
        
            let sz = stream.readSize();
            s.push("\ncontext = ");
            while(sz-- > 0)
            {
                const key = stream.readString();
                const value = stream.readString();
                s.push(key + '/' + value);
                if(sz > 0)
                {
                    s.push(", ");
                }
            }
        
            const ver = stream.skipEncapsulation();
            if(!ver.equals(Ice.Encoding_1_0))
            {
                s.push("\nencoding = ");
                s.push(Ice.encodingVersionToString(ver));
            }
        }
        
        function printHeader(s, stream)
        {
            stream.readByte(); // Don't bother printing the magic number
            stream.readByte();
            stream.readByte();
            stream.readByte();
        
        //        const pMajor = stream.readByte();
        //        const pMinor = stream.readByte();
        //        s.push("\nprotocol version = " + pMajor + "." + pMinor);
            stream.readByte(); // major
            stream.readByte(); // minor
        
        //        const eMajor = stream.readByte();
        //        const eMinor = stream.readByte();
        //        s.push("\nencoding version = " + eMajor + "." + eMinor);
            stream.readByte(); // major
            stream.readByte(); // minor
        
            const type = stream.readByte();
        
            s.push("\nmessage type = " + type + " (" + getMessageTypeAsString(type) + ')');
            const compress = stream.readByte();
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
        
            const size = stream.readInt();
            s.push("\nmessage size = " + size);
            return type;
        }
        
        function printMessage(s, stream)
        {
            const type = printHeader(s, stream);
        
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
                return "validate connection";
            default:
                return "unknown";
            }
        }
        
        class TraceUtil
        {
            static traceSlicing(kind, typeId, slicingCat, logger)
            {
                if(!slicingIds.has(typeId))
                {
                    logger.trace(slicingCat, `unknown ${kind} type \`${typeId}'`);
                    slicingIds.set(typeId, 1);
                }
            }
        
            static traceSend(stream, logger, traceLevels)
            {
                if(traceLevels.protocol >= 1)
                {
                    const p = stream.pos;
                    const is = new Ice.InputStream(stream.instance, stream.getEncoding(), stream.buffer);
                    is.pos = 0;
        
                    const s = [];
                    const type = printMessage(s, is);
        
                    logger.trace(traceLevels.protocolCat, "sending " + getMessageTypeAsString(type) + " " + s.join(""));
        
                    stream.pos = p;
                }
            }
        
            static traceRecv(stream, logger, traceLevels)
            {
                if(traceLevels.protocol >= 1)
                {
                    const p = stream.pos;
                    stream.pos = 0;
        
                    const s = [];
                    const type = printMessage(s, stream);
        
                    logger.trace(traceLevels.protocolCat, "received " + getMessageTypeAsString(type) + " " + s.join(""));
        
                    stream.pos = p;
                }
            }
        
            static traceOut(heading, stream, logger, traceLevels)
            {
                if(traceLevels.protocol >= 1)
                {
                    const p = stream.pos;
                    const is = new Ice.InputStream(stream.instance, stream.getEncoding(), stream.buffer);
                    is.pos = 0;
        
                    const s = [];
                    s.push(heading);
                    printMessage(s, is);
        
                    logger.trace(traceLevels.protocolCat, s.join(""));
                    stream.pos = p;
                }
            }
        
            static traceIn(heading, stream, logger, traceLevels)
            {
                if(traceLevels.protocol >= 1)
                {
                    const p = stream.pos;
                    stream.pos = 0;
        
                    const s = [];
                    s.push(heading);
                    printMessage(s, stream);
        
                    logger.trace(traceLevels.protocolCat, s.join(""));
                    stream.pos = p;
                }
            }
        
            static dumpStream(stream)
            {
                const pos = stream.pos;
                stream.pos = 0;
        
                const data = stream.readBlob(stream.size());
                TraceUtil.dumpOctets(data);
        
                stream.pos = pos;
            }
        
            static dumpOctets(data)
            {
                const inc = 8;
                const buf = [];
        
                for(let i = 0; i < data.length; i += inc)
                {
                    for(let j = i; j - i < inc; j++)
                    {
                        if(j < data.length)
                        {
                            let n = data[j];
                            if(n < 0)
                            {
                                n += 256;
                            }
                            let s;
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
                                s = String(n);
                            }
                            buf.push(s + " ");
                        }
                        else
                        {
                            buf.push("    ");
                        }
                    }
        
                    buf.push('"');
        
                    for(let j = i; j < data.length && j - i < inc; j++)
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
            }
        }
        
        Ice.TraceUtil = TraceUtil;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        class RetryException extends Error
        {
            constructor(ex)
            {
                super();
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
        
            get inner()
            {
                return this._ex;
            }
        }
        
        Ice.RetryException = RetryException;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const _ModuleRegistry = Ice._ModuleRegistry;
        
        
        const ArrayUtil = Ice.ArrayUtil;
        const Debug = Ice.Debug;
        const ExUtil = Ice.ExUtil;
        const FormatType = Ice.FormatType;
        const OptionalFormat = Ice.OptionalFormat;
        const Protocol = Ice.Protocol;
        const SlicedData = Ice.SlicedData;
        const TraceUtil = Ice.TraceUtil;
        
        const SliceType =
        {
            NoSlice: 0,
            ValueSlice: 1,
            ExceptionSlice: 2
        };
        
        //
        // Number.isNaN polyfill for compatibility with IE
        //
        // see: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
        //
        Number.isNaN = Number.isNaN || function(value)
        {
            return typeof value === "number" && isNaN(value);
        };
        
        //
        // InputStream
        //
        
        class IndirectPatchEntry
        {
            constructor(index, cb)
            {
                this.index = index;
                this.cb = cb;
            }
        }
        
        class EncapsDecoder
        {
            constructor(stream, encaps, sliceValues, f)
            {
                this._stream = stream;
                this._encaps = encaps;
                this._sliceValues = sliceValues;
                this._valueFactoryManager = f;
                this._patchMap = null; // Lazy initialized, Map<int, Patcher[] >()
                this._unmarshaledMap = new Map(); // Map<int, Ice.Value>()
                this._typeIdMap = null; // Lazy initialized, Map<int, String>
                this._typeIdIndex = 0;
                this._valueList = null; // Lazy initialized. Ice.Value[]
            }
        
            readOptional()
            {
                return false;
            }
        
            readPendingValues()
            {
            }
        
            readTypeId(isIndex)
            {
                if(this._typeIdMap === null) // Lazy initialization
                {
                    this._typeIdMap = new Map(); // Map<int, String>();
                }
        
                let typeId;
                if(isIndex)
                {
                    typeId = this._typeIdMap.get(this._stream.readSize());
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
            }
        
            newInstance(typeId)
            {
                //
                // Try to find a factory registered for the specific type.
                //
                let userFactory = this._valueFactoryManager.find(typeId);
                let v = null;
        
                if(userFactory !== undefined)
                {
                    v = userFactory(typeId);
                }
        
                //
                // If that fails, invoke the default factory if one has been
                // registered.
                //
                if(v === null || v === undefined)
                {
                    userFactory = this._valueFactoryManager.find("");
                    if(userFactory !== undefined)
                    {
                        v = userFactory(typeId);
                    }
                }
        
                //
                // Last chance: try to instantiate the class dynamically.
                //
                if(v === null || v === undefined)
                {
                    v = this._stream.createInstance(typeId);
                }
        
                return v;
            }
        
            addPatchEntry(index, cb)
            {
                Debug.assert(index > 0);
        
                //
                // Check if we have already unmarshaled the instance. If that's the case,
                // just call the callback and we're done.
                //
                const obj = this._unmarshaledMap.get(index);
                if(obj !== undefined && obj !== null)
                {
                    cb(obj);
                    return;
                }
        
                if(this._patchMap === null) // Lazy initialization
                {
                    this._patchMap = new Map(); // Map<Integer, Patcher[] >();
                }
        
                //
                // Add a patch entry if the instance isn't unmarshaled yet,
                // the callback will be called when the instance is
                // unmarshaled.
                //
                let l = this._patchMap.get(index);
                if(l === undefined)
                {
                    //
                    // We have no outstanding instances to be patched for this
                    // index, so make a new entry in the patch map.
                    //
                    l = []; // ReadValueCallback[]
                    this._patchMap.set(index, l);
                }
        
                //
                // Append a patch entry for this instance.
                //
                l.push(cb);
            }
        
            unmarshal(index, v)
            {
                //
                // Add the instance to the map of unmarshaled instances, this must
                // be done before reading the instances (for circular references).
                //
                this._unmarshaledMap.set(index, v);
        
                //
                // Read the instance.
                //
                v._iceRead(this._stream);
        
                if(this._patchMap !== null)
                {
                    //
                    // Patch all instances now that the instance is unmarshaled.
                    //
                    const l = this._patchMap.get(index);
                    if(l !== undefined)
                    {
                        Debug.assert(l.length > 0);
        
                        //
                        // Patch all pointers that refer to the instance.
                        //
                        for(let i = 0; i < l.length; ++i)
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
        
                if((this._patchMap === null || this._patchMap.size === 0) && this._valueList === null)
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
                    if(this._valueList === null) // Lazy initialization
                    {
                        this._valueList = []; // Ice.Value[]
                    }
                    this._valueList.push(v);
        
                    if(this._patchMap === null || this._patchMap.size === 0)
                    {
                        //
                        // Iterate over the instance list and invoke ice_postUnmarshal on
                        // each instance. We must do this after all instances have been
                        // unmarshaled in order to ensure that any instance data members
                        // have been properly patched.
                        //
                        for(let i = 0; i < this._valueList.length; i++)
                        {
                            try
                            {
                                this._valueList[i].ice_postUnmarshal();
                            }
                            catch(ex)
                            {
                                this._stream.instance.initializationData().logger.warning(
                                    "exception raised by ice_postUnmarshal:\n" + ex.toString());
                            }
                        }
                        this._valueList = [];
                    }
                }
            }
        }
        
        class EncapsDecoder10 extends EncapsDecoder
        {
            constructor(stream, encaps, sliceValues, f)
            {
                super(stream, encaps, sliceValues, f);
                this._sliceType = SliceType.NoSlice;
            }
        
            readValue(cb)
            {
                Debug.assert(cb !== null);
        
                //
                // Instance references are encoded as a negative integer in 1.0.
                //
                let index = this._stream.readInt();
                if(index > 0)
                {
                    throw new Ice.MarshalException("invalid object id");
                }
                index = -index;
        
                if(index === 0)
                {
                    cb(null);
                }
                else
                {
                    this.addPatchEntry(index, cb);
                }
            }
        
            throwException()
            {
                Debug.assert(this._sliceType === SliceType.NoSlice);
        
                //
                // User exceptions with the 1.0 encoding start with a boolean flag
                // that indicates whether or not the exception has classes.
                //
                // This allows reading the pending instances even if some part of
                // the exception was sliced.
                //
                const usesClasses = this._stream.readBool();
        
                this._sliceType = SliceType.ExceptionSlice;
                this._skipFirstSlice = false;
        
                //
                // Read the first slice header.
                //
                this.startSlice();
                const mostDerivedId = this._typeId;
                while(true)
                {
                    const userEx = this._stream.createUserException(this._typeId);
        
                    //
                    // We found the exception.
                    //
                    if(userEx !== null)
                    {
                        userEx._read(this._stream);
                        if(usesClasses)
                        {
                            this.readPendingValues();
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
            }
        
            startInstance(sliceType)
            {
                Debug.assert(this._sliceType === sliceType);
                this._skipFirstSlice = true;
            }
        
            endInstance(preserve)
            {
                //
                // Read the Ice::Object slice.
                //
                if(this._sliceType === SliceType.ValueSlice)
                {
                    this.startSlice();
                    const sz = this._stream.readSize(); // For compatibility with the old AFM.
                    if(sz !== 0)
                    {
                        throw new Ice.MarshalException("invalid Object slice");
                    }
                    this.endSlice();
                }
        
                this._sliceType = SliceType.NoSlice;
                return null;
            }
        
            startSlice()
            {
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
                // For instances, first read the type ID boolean which indicates
                // whether or not the type ID is encoded as a string or as an
                // index. For exceptions, the type ID is always encoded as a
                // string.
                //
                if(this._sliceType === SliceType.ValueSlice) // For exceptions, the type ID is always encoded as a string
                {
                    const isIndex = this._stream.readBool();
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
            }
        
            endSlice()
            {
            }
        
            skipSlice()
            {
                this._stream.traceSkipSlice(this._typeId, this._sliceType);
                Debug.assert(this._sliceSize >= 4);
                this._stream.skip(this._sliceSize - 4);
            }
        
            readPendingValues()
            {
                let num;
                do
                {
                    num = this._stream.readSize();
                    for(let k = num; k > 0; --k)
                    {
                        this.readInstance();
                    }
                }
                while(num > 0);
        
                if(this._patchMap !== null && this._patchMap.size !== 0)
                {
                    //
                    // If any entries remain in the patch map, the sender has sent an index for an instance, but failed
                    // to supply the instance.
                    //
                    throw new Ice.MarshalException("index for class received, but no instance");
                }
            }
        
            readInstance()
            {
                const index = this._stream.readInt();
                let v = null;
        
                if(index <= 0)
                {
                    throw new Ice.MarshalException("invalid object id");
                }
        
                this._sliceType = SliceType.ValueSlice;
                this._skipFirstSlice = false;
        
                //
                // Read the first slice header.
                //
                this.startSlice();
                const mostDerivedId = this._typeId;
                while(true)
                {
                    //
                    // For the 1.0 encoding, the type ID for the base Object class
                    // marks the last slice.
                    //
                    if(this._typeId == Ice.Value.ice_staticId())
                    {
                        throw new Ice.NoValueFactoryException("", mostDerivedId);
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
                    // If slicing is disabled, stop unmarshaling.
                    //
                    if(!this._sliceValues)
                    {
                        throw new Ice.NoValueFactoryException("no value factory found and slicing is disabled",
                                                               this._typeId);
                    }
        
                    //
                    // Slice off what we don't understand.
                    //
                    this.skipSlice();
                    this.startSlice(); // Read next Slice header for next iteration.
                }
        
                //
                // Unmarshal the instance and add it to the map of unmarshaled instances.
                //
                this.unmarshal(index, v);
            }
        }
        
        class EncapsDecoder11 extends EncapsDecoder
        {
            constructor(stream, encaps, sliceValues, f, r)
            {
                super(stream, encaps, sliceValues, f);
                this._compactIdResolver = r;
                this._current = null;
                this._valueIdIndex = 1;
            }
        
            readValue(cb)
            {
                const index = this._stream.readSize();
                if(index < 0)
                {
                    throw new Ice.MarshalException("invalid object id");
                }
                else if(index === 0)
                {
                    if(cb !== null)
                    {
                        cb(null);
                    }
                }
                else if(this._current !== null && (this._current.sliceFlags & Protocol.FLAG_HAS_INDIRECTION_TABLE) !== 0)
                {
                    //
                    // When reading an instance within a slice and there's an
                    // indirect instance table, always read an indirect reference
                    // that points to an instance from the indirect instance table
                    // marshaled at the end of the Slice.
                    //
                    // Maintain a list of indirect references. Note that the
                    // indirect index starts at 1, so we decrement it by one to
                    // derive an index into the indirection table that we'll read
                    // at the end of the slice.
                    //
                    if(cb !== null)
                    {
                        if(this._current.indirectPatchList === null) // Lazy initialization
                        {
                            this._current.indirectPatchList = []; // IndirectPatchEntry[]
                        }
                        this._current.indirectPatchList.push(new IndirectPatchEntry(index - 1, cb));
                    }
                }
                else
                {
                    this.readInstance(index, cb);
                }
            }
        
            throwException()
            {
                Debug.assert(this._current === null);
        
                this.push(SliceType.ExceptionSlice);
        
                //
                // Read the first slice header.
                //
                this.startSlice();
                const mostDerivedId = this._current.typeId;
                while(true)
                {
        
                    const userEx = this._stream.createUserException(this._current.typeId);
        
                    //
                    // We found the exception.
                    //
                    if(userEx !== null)
                    {
                        userEx._read(this._stream);
                        throw userEx;
        
                        // Never reached.
                    }
        
                    //
                    // Slice off what we don't understand.
                    //
                    this.skipSlice();
        
                    if((this._current.sliceFlags & Protocol.FLAG_IS_LAST_SLICE) !== 0)
                    {
                        if(mostDerivedId.indexOf("::") === 0)
                        {
                            throw new Ice.UnknownUserException(mostDerivedId.substr(2));
                        }
                        throw new Ice.UnknownUserException(mostDerivedId);
                    }
        
                    this.startSlice();
                }
            }
        
            startInstance(sliceType)
            {
                Debug.assert(sliceType !== undefined);
                Debug.assert(this._current.sliceType !== null && this._current.sliceType === sliceType);
                this._current.skipFirstSlice = true;
            }
        
            endInstance(preserve)
            {
                let slicedData = null;
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
            }
        
            startSlice()
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
                // Read the type ID, for instance slices the type ID is encoded as a
                // string or as an index, for exceptions it's always encoded as a
                // string.
                //
                if(this._current.sliceType === SliceType.ValueSlice)
                {
                    if((this._current.sliceFlags & Protocol.FLAG_HAS_TYPE_ID_COMPACT) ===
                        Protocol.FLAG_HAS_TYPE_ID_COMPACT) // Must be checked 1st!
                    {
                        this._current.typeId = "";
                        this._current.compactId = this._stream.readSize();
                    }
                    else if((this._current.sliceFlags & (Protocol.FLAG_HAS_TYPE_ID_INDEX |
                                Protocol.FLAG_HAS_TYPE_ID_STRING)) !== 0)
                    {
                        this._current.typeId =
                            this.readTypeId((this._current.sliceFlags & Protocol.FLAG_HAS_TYPE_ID_INDEX) !== 0);
                        this._current.compactId = -1;
                    }
                    else
                    {
                        //
                        // Only the most derived slice encodes the type ID for the compact format.
                        //
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
                if((this._current.sliceFlags & Protocol.FLAG_HAS_SLICE_SIZE) !== 0)
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
            }
        
            endSlice()
            {
                if((this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) !== 0)
                {
                    this._stream.skipOptionals();
                }
        
                //
                // Read the indirection table if one is present and transform the
                // indirect patch list into patch entries with direct references.
                //
                if((this._current.sliceFlags & Protocol.FLAG_HAS_INDIRECTION_TABLE) !== 0)
                {
                    const indirectionTable = [];
                    //
                    // The table is written as a sequence<size> to conserve space.
                    //
                    const length = this._stream.readAndCheckSeqSize(1);
                    for(let i = 0; i < length; ++i)
                    {
                        indirectionTable[i] = this.readInstance(this._stream.readSize(), null);
                    }
        
                    //
                    // Sanity checks. If there are optional members, it's possible
                    // that not all instance references were read if they are from
                    // unknown optional data members.
                    //
                    if(indirectionTable.length === 0)
                    {
                        throw new Ice.MarshalException("empty indirection table");
                    }
                    if((this._current.indirectPatchList === null || this._current.indirectPatchList.length === 0) &&
                       (this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) === 0)
                    {
                        throw new Ice.MarshalException("no references to indirection table");
                    }
        
                    //
                    // Convert indirect references into direct references.
                    //
                    if(this._current.indirectPatchList !== null)
                    {
                        this._current.indirectPatchList.forEach(e =>
                            {
                                Debug.assert(e.index >= 0);
                                if(e.index >= indirectionTable.length)
                                {
                                    throw new Ice.MarshalException("indirection out of range");
                                }
                                this.addPatchEntry(indirectionTable[e.index], e.cb);
                            });
                        this._current.indirectPatchList.length = 0;
                    }
                }
            }
        
            skipSlice()
            {
                this._stream.traceSkipSlice(this._current.typeId, this._current.sliceType);
        
                const start = this._stream.pos;
        
                if((this._current.sliceFlags & Protocol.FLAG_HAS_SLICE_SIZE) !== 0)
                {
                    Debug.assert(this._current.sliceSize >= 4);
                    this._stream.skip(this._current.sliceSize - 4);
                }
                else if(this._current.sliceType === SliceType.ValueSlice)
                {
                    throw new Ice.NoValueFactoryException("no value factory found and compact format prevents slicing " +
                                                          "(the sender should use the sliced format instead)",
                                                          this._current.typeId);
                }
                else if(this._current.typeId.indexOf("::") === 0)
                {
                    throw new Ice.UnknownUserException(this._current.typeId.substring(2));
                }
                else
                {
                    throw new Ice.UnknownUserException(this._current.typeId);
                }
        
                //
                // Preserve this slice.
                //
                const info = new Ice.SliceInfo();
                info.typeId = this._current.typeId;
                info.compactId = this._current.compactId;
                info.hasOptionalMembers = (this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) !== 0;
                info.isLastSlice = (this._current.sliceFlags & Protocol.FLAG_IS_LAST_SLICE) !== 0;
        
                const b = this._stream._buf;
                const end = b.position;
                let dataEnd = end;
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
                // Read the indirect instance table. We read the instances or their
                // IDs if the instance is a reference to an already unmarshaled
                // instance.
                //
        
                if((this._current.sliceFlags & Protocol.FLAG_HAS_INDIRECTION_TABLE) !== 0)
                {
                    const length = this._stream.readAndCheckSeqSize(1);
                    const indirectionTable = [];
                    for(let i = 0; i < length; ++i)
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
            }
        
            readOptional(readTag, expectedFormat)
            {
                if(this._current === null)
                {
                    return this._stream.readOptImpl(readTag, expectedFormat);
                }
                else if((this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) !== 0)
                {
                    return this._stream.readOptImpl(readTag, expectedFormat);
                }
                return false;
            }
        
            readInstance(index, cb)
            {
                Debug.assert(index > 0);
        
                let v = null;
        
                if(index > 1)
                {
                    if(cb !== null)
                    {
                        this.addPatchEntry(index, cb);
                    }
                    return index;
                }
        
                this.push(SliceType.ValueSlice);
        
                //
                // Get the instance ID before we start reading slices. If some
                // slices are skipped, the indirect instance table is still read and
                // might read other instances.
                //
                index = ++this._valueIdIndex;
        
                //
                // Read the first slice header.
                //
                this.startSlice();
                const mostDerivedId = this._current.typeId;
                while(true)
                {
                    if(this._current.compactId >= 0)
                    {
                        //
                        // Translate a compact (numeric) type ID into a string type ID.
                        //
                        this._current.typeId = "";
                        if(this._compactIdResolver !== null)
                        {
                            try
                            {
                                this._current.typeId = this._compactIdResolver.call(null, this._current.compactId);
                            }
                            catch(ex)
                            {
                                if(!(ex instanceof Ice.LocalException))
                                {
                                    throw new Ice.MarshalException("exception in CompactIdResolver for ID " +
                                                                   this._current.compactId, ex);
                                }
                                throw ex;
                            }
                        }
        
                        if(this._current.typeId.length === 0)
                        {
                            this._current.typeId = this._stream.resolveCompactId(this._current.compactId);
                        }
                    }
        
                    if(this._current.typeId.length > 0)
                    {
                        v = this.newInstance(this._current.typeId);
                    }
        
                    if(v !== null && v !== undefined)
                    {
                        //
                        // We have an instance, we get out of this loop.
                        //
                        break;
                    }
        
                    //
                    // If slicing is disabled, stop unmarshaling.
                    //
                    if(!this._sliceValues)
                    {
                        throw new Ice.NoValueFactoryException("no value factory found and slicing is disabled",
                                                               this._current.typeId);
                    }
        
                    //
                    // Slice off what we don't understand.
                    //
                    this.skipSlice();
        
                    //
                    // If this is the last slice, keep the instance as an opaque
                    // UnknownSlicedValue object.
                    //
                    if((this._current.sliceFlags & Protocol.FLAG_IS_LAST_SLICE) !== 0)
                    {
                        v = new Ice.UnknownSlicedValue(mostDerivedId);
                        break;
                    }
        
                    this.startSlice(); // Read next Slice header for next iteration.
                }
        
                //
                // Unmarshal the instance.
                //
                this.unmarshal(index, v);
        
                if(this._current === null && this._patchMap !== null && this._patchMap.size !== 0)
                {
                    //
                    // If any entries remain in the patch map, the sender has sent an index for an instance, but failed
                    // to supply the instance.
                    //
                    throw new Ice.MarshalException("index for class received, but no instance");
                }
        
                if(cb !== null)
                {
                    cb(v);
                }
        
                return index;
            }
        
            readSlicedData()
            {
                if(this._current.slices === null) // No preserved slices.
                {
                    return null;
                }
        
                //
                // The _indirectionTables member holds the indirection table for each slice
                // in _slices.
                //
                Debug.assert(this._current.slices.length === this._current.indirectionTables.length);
                for(let i = 0; i < this._current.slices.length; ++i)
                {
                    //
                    // We use the "instances" list in SliceInfo to hold references
                    // to the target instances. Note that the instances might not have
                    // been read yet in the case of a circular reference to an
                    // enclosing instance.
                    //
                    const table = this._current.indirectionTables[i];
                    const info = this._current.slices[i];
                    info.instances = [];
                    if(table)
                    {
                        for(let j = 0; j < table.length; ++j)
                        {
                            this.addPatchEntry(table[j], sequencePatcher(info.instances, j, Ice.Value));
                        }
                    }
                }
                return new SlicedData(ArrayUtil.clone(this._current.slices));
            }
        
            push(sliceType)
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
        }
        
        EncapsDecoder11.InstanceData = class
        {
            constructor(previous)
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
                this.slices = null; // Preserved slices. Ice.SliceInfo[]
                this.indirectionTables = null; // int[][]
        
                // Slice attributes
                this.sliceFlags = 0;
                this.sliceSize = 0;
                this.typeId = null;
                this.compactId = 0;
                this.indirectPatchList = null; // Lazy initialized, IndirectPatchEntry[]
            }
        };
        
        const sequencePatcher = function(seq, index, T)
        {
            return v =>
                {
                    if(v !== null && !(v instanceof T))
                    {
                        ExUtil.throwUOE(T.ice_staticId(), v);
                    }
                    seq[index] = v;
                };
        };
        
        class ReadEncaps
        {
            constructor()
            {
                this.start = 0;
                this.sz = 0;
                this.encoding = null;
                this.encoding_1_0 = false;
                this.decoder = null;
                this.next = null;
            }
        
            reset()
            {
                this.decoder = null;
            }
        
            setEncoding(encoding)
            {
                this.encoding = encoding;
                this.encoding_1_0 = encoding.equals(Ice.Encoding_1_0);
            }
        }
        
        class InputStream
        {
            constructor(arg1, arg2, arg3)
            {
                const args =
                {
                    instance: null,
                    encoding: null,
                    bytes: null,
                    buffer: null
                };
                this._checkArgs([arg1, arg2, arg3], args);
                this._initialize(args);
            }
        
            _checkArgs(arr, args)
            {
                //
                // The constructor can accept a variety of argument combinations:
                //
                // (<empty>)
                // (communicator)
                // (instance)
                // (encoding)
                // (array)
                // (buffer)
                // (communicator, encoding)
                // (instance, encoding)
                // (communicator, array)
                // (instance, array)
                // (communicator, buffer)
                // (instance, buffer)
                // (communicator, encoding, array)
                // (instance, encoding, array)
                // (communicator, encoding, buffer)
                // (instance, encoding, buffer)
                // (encoding, array)
                // (encoding, array)
                // (encoding, buffer)
                // (encoding, buffer)
                //
                arr.forEach(arg =>
                    {
                        if(arg !== null && arg !== undefined)
                        {
                            if(arg.constructor === Ice.Communicator)
                            {
                                args.instance = arg.instance;
                            }
                            else if(arg.constructor === Ice.Instance)
                            {
                                args.instance = arg;
                            }
                            else if(arg.constructor === Ice.EncodingVersion)
                            {
                                args.encoding = arg;
                            }
                            else if(arg.constructor === Ice.Buffer)
                            {
                                args.buffer = arg;
                            }
                            else if(arg.constructor === ArrayBuffer)
                            {
                                args.bytes = arg;
                            }
                            else if(arg.constructor === Uint8Array)
                            {
                                args.bytes = arg.buffer;
                            }
                            else
                            {
                                throw new Ice.InitializationException("unknown argument to InputStream constructor");
                            }
                        }
                    });
                if(args.buffer !== null && args.bytes !== null)
                {
                    throw new Ice.InitializationException("invalid argument to InputStream constructor");
                }
            }
        
            _initialize(args)
            {
                this._instance = args.instance;
                this._encoding = args.encoding;
                this._encapsStack = null;
                this._encapsCache = null;
                this._closure = null;
                this._sliceValues = true;
                this._startSeq = -1;
                this._sizePos = -1;
                this._compactIdResolver = null;
        
                if(this._instance !== null)
                {
                    if(this._encoding === null)
                    {
                        this._encoding = this._instance.defaultsAndOverrides().defaultEncoding;
                    }
                    this._traceSlicing = this._instance.traceLevels().slicing > 0;
                    this._valueFactoryManager = this._instance.initializationData().valueFactoryManager;
                    this._logger = this._instance.initializationData().logger;
                }
                else
                {
                    if(this._encoding === null)
                    {
                        this._encoding = Protocol.currentEncoding;
                    }
                    this._traceSlicing = false;
                    this._valueFactoryManager = null;
                    this._logger = null;
                }
        
                if(args.bytes !== null)
                {
                    this._buf = new Ice.Buffer(args.bytes);
                }
                else if(args.buffer !== null)
                {
                    this._buf = args.buffer;
                }
                else
                {
                    this._buf = new Ice.Buffer();
                }
            }
        
            //
            // This function allows this object to be reused, rather than reallocated.
            //
            reset()
            {
                this._buf.reset();
                this.clear();
            }
        
            clear()
            {
                if(this._encapsStack !== null)
                {
                    Debug.assert(this._encapsStack.next === null);
                    this._encapsStack.next = this._encapsCache;
                    this._encapsCache = this._encapsStack;
                    this._encapsCache.reset();
                    this._encapsStack = null;
                }
        
                this._startSeq = -1;
                this._sliceValues = true;
            }
        
            swap(other)
            {
                Debug.assert(this._instance === other._instance);
        
                [other._buf, this._buf] = [this._buf, other._buf];
                [other._encoding, this._encoding] = [this._encoding, other._encoding];
                [other._traceSlicing, this._traceSlicing] = [this._traceSlicing, other._traceSlicing];
                [other._closure, this._closure] = [this._closure, other.closure];
                [other._sliceValues, this._sliceValues] = [this._sliceValues, other._sliceValues];
        
                //
                // Swap is never called for InputStreams that have encapsulations being read/write. However,
                // encapsulations might still be set in case marshaling or unmarshaling failed. We just
                // reset the encapsulations if there are still some set.
                //
                this.resetEncapsulation();
                other.resetEncapsulation();
        
                [other._startSeq, this._startSeq] = [this._startSeq, other._startSeq];
                [other._minSeqSize, this._minSeqSize] = [this._minSeqSize, other._minSeqSize];
                [other._sizePos, this._sizePos] = [this._sizePos, other._sizePos];
                [other._valueFactoryManager, this._valueFactoryManager] = [this._valueFactoryManager, other._valueFactoryManager];
                [other._logger, this._logger] = [this._logger, other._logger];
                [other._compactIdResolver, this._compactIdResolver] = [this._compactIdResolver, other._compactIdResolver];
            }
        
            resetEncapsulation()
            {
                this._encapsStack = null;
            }
        
            resize(sz)
            {
                this._buf.resize(sz);
                this._buf.position = sz;
            }
        
            startValue()
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
                this._encapsStack.decoder.startInstance(SliceType.ValueSlice);
            }
        
            endValue(preserve)
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
                return this._encapsStack.decoder.endInstance(preserve);
            }
        
            startException()
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
                this._encapsStack.decoder.startInstance(SliceType.ExceptionSlice);
            }
        
            endException(preserve)
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
                return this._encapsStack.decoder.endInstance(preserve);
            }
        
            startEncapsulation()
            {
                let curr = this._encapsCache;
                if(curr !== null)
                {
                    curr.reset();
                    this._encapsCache = this._encapsCache.next;
                }
                else
                {
                    curr = new ReadEncaps();
                }
                curr.next = this._encapsStack;
                this._encapsStack = curr;
        
                this._encapsStack.start = this._buf.position;
        
                //
                // I don't use readSize() for encapsulations, because when creating an encapsulation,
                // I must know in advance how many bytes the size information will require in the data
                // stream. If I use an Int, it is always 4 bytes. For readSize(), it could be 1 or 5 bytes.
                //
                const sz = this.readInt();
                if(sz < 6)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                if(sz - 4 > this._buf.remaining)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                this._encapsStack.sz = sz;
        
                const encoding = new Ice.EncodingVersion();
                encoding._read(this);
                Protocol.checkSupportedEncoding(encoding); // Make sure the encoding is supported.
                this._encapsStack.setEncoding(encoding);
        
                return encoding;
            }
        
            endEncapsulation()
            {
                Debug.assert(this._encapsStack !== null);
        
                if(!this._encapsStack.encoding_1_0)
                {
                    this.skipOptionals();
                    if(this._buf.position !== this._encapsStack.start + this._encapsStack.sz)
                    {
                        throw new Ice.EncapsulationException();
                    }
                }
                else if(this._buf.position !== this._encapsStack.start + this._encapsStack.sz)
                {
                    if(this._buf.position + 1 !== this._encapsStack.start + this._encapsStack.sz)
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
        
                const curr = this._encapsStack;
                this._encapsStack = curr.next;
                curr.next = this._encapsCache;
                this._encapsCache = curr;
                this._encapsCache.reset();
            }
        
            skipEmptyEncapsulation()
            {
                const sz = this.readInt();
                if(sz < 6)
                {
                    throw new Ice.EncapsulationException();
                }
                if(sz - 4 > this._buf.remaining)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
        
                const encoding = new Ice.EncodingVersion();
                encoding._read(this);
                Protocol.checkSupportedEncoding(encoding); // Make sure the encoding is supported.
        
                if(encoding.equals(Ice.Encoding_1_0))
                {
                    if(sz != 6)
                    {
                        throw new Ice.EncapsulationException();
                    }
                }
                else
                {
                    // Skip the optional content of the encapsulation if we are expecting an
                    // empty encapsulation.
                    this._buf.position = this._buf.position + sz - 6;
                }
                return encoding;
            }
        
            readEncapsulation(encoding)
            {
                Debug.assert(encoding !== undefined);
                const sz = this.readInt();
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
                    encoding._read(this);
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
            }
        
            getEncoding()
            {
                return this._encapsStack !== null ? this._encapsStack.encoding : this._encoding;
            }
        
            getEncapsulationSize()
            {
                Debug.assert(this._encapsStack !== null);
                return this._encapsStack.sz - 6;
            }
        
            skipEncapsulation()
            {
                const sz = this.readInt();
                if(sz < 6)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                const encoding = new Ice.EncodingVersion();
                encoding._read(this);
                try
                {
                    this._buf.position = this._buf.position + sz - 6;
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                return encoding;
            }
        
            startSlice() // Returns type ID of next slice
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
                return this._encapsStack.decoder.startSlice();
            }
        
            endSlice()
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
                this._encapsStack.decoder.endSlice();
            }
        
            skipSlice()
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
                this._encapsStack.decoder.skipSlice();
            }
        
            readPendingValues()
            {
                if(this._encapsStack !== null && this._encapsStack.decoder !== null)
                {
                    this._encapsStack.decoder.readPendingValues();
                }
                else if((this._encapsStack !== null && this._encapsStack.encoding_1_0) ||
                        (this._encapsStack === null && this._encoding.equals(Ice.Encoding_1_0)))
                {
                    //
                    // If using the 1.0 encoding and no instances were read, we
                    // still read an empty sequence of pending instances if
                    // requested (i.e.: if this is called).
                    //
                    // This is required by the 1.0 encoding, even if no instances
                    // are written we do marshal an empty sequence if marshaled
                    // data types use classes.
                    //
                    this.skipSize();
                }
            }
        
            readSize()
            {
                try
                {
                    const b = this._buf.get();
                    if(b === 255)
                    {
                        const v = this._buf.getInt();
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
            }
        
            readAndCheckSeqSize(minSize)
            {
                const sz = this.readSize();
        
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
                // The goal of this check is to ensure that when we start unmarshaling
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
                // possibly enclosed sequences), something is wrong with the marshaled
                // data: it's claiming having more data that what is possible to read.
                //
                if(this._startSeq + this._minSeqSize > this._buf.limit)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
        
                return sz;
            }
        
            readBlob(sz)
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
            }
        
            readOptional(tag, expectedFormat)
            {
                Debug.assert(this._encapsStack !== null);
                if(this._encapsStack.decoder !== null)
                {
                    return this._encapsStack.decoder.readOptional(tag, expectedFormat);
                }
                return this.readOptImpl(tag, expectedFormat);
            }
        
            readOptionalHelper(tag, format, read)
            {
                if(this.readOptional(tag, format))
                {
                    return read.call(this);
                }
                else
                {
                    return undefined;
                }
            }
        
            readByte()
            {
                try
                {
                    return this._buf.get();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            }
        
            readByteSeq()
            {
                return this._buf.getArray(this.readAndCheckSeqSize(1));
            }
        
            readBool()
            {
                try
                {
                    return this._buf.get() === 1;
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            }
        
            readShort()
            {
                try
                {
                    return this._buf.getShort();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            }
        
            readInt()
            {
                try
                {
                    return this._buf.getInt();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            }
        
            readLong()
            {
                try
                {
                    return this._buf.getLong();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            }
        
            readFloat()
            {
                try
                {
                    return this._buf.getFloat();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            }
        
            readDouble()
            {
                try
                {
                    return this._buf.getDouble();
                }
                catch(ex)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
            }
        
            readString()
            {
                const len = this.readSize();
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
            }
        
            readProxy(type)
            {
                return this._instance.proxyFactory().streamToProxy(this, type);
            }
        
            readOptionalProxy(tag, type)
            {
                if(this.readOptional(tag, OptionalFormat.FSize))
                {
                    this.skip(4);
                    return this.readProxy(type);
                }
                else
                {
                    return undefined;
                }
            }
        
            readEnum(T)
            {
                let v;
                if(this.getEncoding().equals(Ice.Encoding_1_0))
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
        
                const e = T.valueOf(v);
                if(e === undefined)
                {
                    throw new Ice.MarshalException("enumerator value " + v + " is out of range");
                }
                return e;
            }
        
            readOptionalEnum(tag, T)
            {
                if(this.readOptional(tag, OptionalFormat.Size))
                {
                    return this.readEnum(T);
                }
                else
                {
                    return undefined;
                }
            }
        
            readValue(cb, T)
            {
                this.initEncaps();
                this._encapsStack.decoder.readValue(
                    cb === null ? null : obj =>
                    {
                        if(obj !== null && !(obj instanceof T))
                        {
                            ExUtil.throwUOE(T.ice_staticId(), obj);
                        }
                        cb(obj);
                    });
            }
        
            readOptionalValue(tag, cb, T)
            {
                if(this.readOptional(tag, OptionalFormat.Class))
                {
                    this.readValue(cb, T);
                }
                else
                {
                    cb(undefined);
                }
            }
        
            throwException()
            {
                this.initEncaps();
                this._encapsStack.decoder.throwException();
            }
        
            readOptImpl(readTag, expectedFormat)
            {
                if(this.isEncoding_1_0())
                {
                    return false; // Optional members aren't supported with the 1.0 encoding.
                }
        
                while(true)
                {
                    if(this._buf.position >= this._encapsStack.start + this._encapsStack.sz)
                    {
                        return false; // End of encapsulation also indicates end of optionals.
                    }
        
                    const v = this.readByte();
        
                    if(v === Protocol.OPTIONAL_END_MARKER)
                    {
                        this._buf.position -= 1; // Rewind.
                        return false;
                    }
        
                    const format = OptionalFormat.valueOf(v & 0x07); // First 3 bits.
                    let tag = v >> 3;
                    if(tag === 30)
                    {
                        tag = this.readSize();
                    }
        
                    if(tag > readTag)
                    {
                        const offset = tag < 30 ? 1 : (tag < 255 ? 2 : 6); // Rewind
                        this._buf.position -= offset;
                        return false; // No optional data members with the requested tag.
                    }
                    else if(tag < readTag)
                    {
                        this.skipOptional(format); // Skip optional data members
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
            }
        
            skipOptional(format)
            {
                switch(format)
                {
                    case OptionalFormat.F1:
                    {
                        this.skip(1);
                        break;
                    }
                    case OptionalFormat.F2:
                    {
                        this.skip(2);
                        break;
                    }
                    case OptionalFormat.F4:
                    {
                        this.skip(4);
                        break;
                    }
                    case OptionalFormat.F8:
                    {
                        this.skip(8);
                        break;
                    }
                    case OptionalFormat.Size:
                    {
                        this.skipSize();
                        break;
                    }
                    case OptionalFormat.VSize:
                    {
                        this.skip(this.readSize());
                        break;
                    }
                    case OptionalFormat.FSize:
                    {
                        this.skip(this.readInt());
                        break;
                    }
                    case OptionalFormat.Class:
                    {
                        this.readValue(null, Ice.Value);
                        break;
                    }
                    default:
                    {
                        Debug.assert(false);
                        break;
                    }
                }
            }
        
            skipOptionals()
            {
                //
                // Skip remaining un-read optional members.
                //
                while(true)
                {
                    if(this._buf.position >= this._encapsStack.start + this._encapsStack.sz)
                    {
                        return; // End of encapsulation also indicates end of optionals.
                    }
        
                    const b = this.readByte();
                    const v = b < 0 ? b + 256 : b;
                    if(v === Protocol.OPTIONAL_END_MARKER)
                    {
                        return;
                    }
        
                    const format = OptionalFormat.valueOf(v & 0x07); // Read first 3 bits.
                    if((v >> 3) === 30)
                    {
                        this.skipSize();
                    }
                    this.skipOptional(format);
                }
            }
        
            skip(size)
            {
                if(size > this._buf.remaining)
                {
                    throw new Ice.UnmarshalOutOfBoundsException();
                }
                this._buf.position += size;
            }
        
            skipSize()
            {
                const b = this.readByte();
                if(b === 255)
                {
                    this.skip(4);
                }
            }
        
            isEmpty()
            {
                return this._buf.empty();
            }
        
            expand(n)
            {
                this._buf.expand(n);
            }
        
            createInstance(id)
            {
                let obj = null;
                try
                {
                    const typeId = id.length > 2 ? id.substr(2).replace(/::/g, ".") : "";
                    const Class = _ModuleRegistry.type(typeId);
                    if(Class !== undefined)
                    {
                        obj = new Class();
                    }
                }
                catch(ex)
                {
                    throw new Ice.NoValueFactoryException("no value factory", id, ex);
                }
        
                return obj;
            }
        
            createUserException(id)
            {
                let userEx = null;
                try
                {
                    const typeId = id.length > 2 ? id.substr(2).replace(/::/g, ".") : "";
                    const Class = _ModuleRegistry.type(typeId);
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
        
            resolveCompactId(compactId)
            {
                const typeId = Ice.CompactIdRegistry.get(compactId);
                return typeId === undefined ? "" : typeId;
            }
        
            isEncoding_1_0()
            {
                return this._encapsStack !== null ? this._encapsStack.encoding_1_0 : this._encoding.equals(Ice.Encoding_1_0);
            }
        
            initEncaps()
            {
                if(this._encapsStack === null) // Lazy initialization
                {
                    this._encapsStack = this._encapsCache;
                    if(this._encapsStack !== null)
                    {
                        this._encapsCache = this._encapsCache.next;
                    }
                    else
                    {
                        this._encapsStack = new ReadEncaps();
                    }
                    this._encapsStack.setEncoding(this._encoding);
                    this._encapsStack.sz = this._buf.limit;
                }
        
                if(this._encapsStack.decoder === null) // Lazy initialization.
                {
                    if(this._encapsStack.encoding_1_0)
                    {
                        this._encapsStack.decoder = new EncapsDecoder10(this, this._encapsStack, this._sliceValues,
                                                                        this._valueFactoryManager);
                    }
                    else
                    {
                        this._encapsStack.decoder = new EncapsDecoder11(this, this._encapsStack, this._sliceValues,
                                                                        this._valueFactoryManager, this._compactIdResolver);
                    }
                }
            }
        
            traceSkipSlice(typeId, sliceType)
            {
                if(this._traceSlicing && this._logger !== null)
                {
                    TraceUtil.traceSlicing(sliceType === SliceType.ExceptionSlice ? "exception" : "object", typeId, "Slicing",
                                           this._logger);
                }
            }
        
            //
            // Sets the value factory manager to use when marshaling value instances. If the stream
            // was initialized with a communicator, the communicator's value factory manager will
            // be used by default.
            //
            get valueFactoryManager()
            {
                return this._valueFactoryManager;
            }
        
            set valueFactoryManager(value)
            {
                this._valueFactoryManager = value !== undefined ? value : null;
            }
        
            //
            // Sets the logger to use when logging trace messages. If the stream
            // was initialized with a communicator, the communicator's logger will
            // be used by default.
            //
            get logger()
            {
                return this._logger;
            }
        
            set logger(value)
            {
                this._logger = value !== undefined ? value : null;
            }
        
            //
            // Sets the compact ID resolver to use when unmarshaling value and exception
            // instances. If the stream was initialized with a communicator, the communicator's
            // resolver will be used by default.
            //
            get compactIdResolver()
            {
                return this._compactIdResolver;
            }
        
            set compactIdResolver(value)
            {
                this._compactIdResolver = value !== undefined ? value : null;
            }
        
            //
            // Determines the behavior of the stream when extracting instances of Slice classes.
            // A instance is "sliced" when a factory cannot be found for a Slice type ID.
            // The stream's default behavior is to slice instances.
            //
            // If slicing is disabled and the stream encounters a Slice type ID
            // during decoding for which no value factory is installed, it raises
            // NoValueFactoryException.
            //
            get sliceValues()
            {
                return this._sliceValues;
            }
        
            set sliceValues(value)
            {
                this._sliceValues = value;
            }
        
            //
            // Determines whether the stream logs messages about slicing instances of Slice values.
            //
            get traceSlicing()
            {
                return this._traceSlicing;
            }
        
            set traceSlicing(value)
            {
                this._traceSlicing = value;
            }
        
            get pos()
            {
                return this._buf.position;
            }
        
            set pos(value)
            {
                this._buf.position = value;
            }
        
            get size()
            {
                return this._buf.limit;
            }
        
            get instance()
            {
                return this._instance;
            }
        
            get closure()
            {
                return this._type;
            }
        
            set closure(value)
            {
                this._type = value;
            }
        
            get buffer()
            {
                return this._buf;
            }
        }
        
        //
        // OutputStream
        //
        
        class EncapsEncoder
        {
            constructor(stream, encaps)
            {
                this._stream = stream;
                this._encaps = encaps;
                this._marshaledMap = new Map(); // Map<Ice.Value, int>;
                this._typeIdMap = null; // Lazy initialized. Map<String, int>
                this._typeIdIndex = 0;
            }
        
            writeOptional()
            {
                return false;
            }
        
            writePendingValues()
            {
                return undefined;
            }
        
            registerTypeId(typeId)
            {
                if(this._typeIdMap === null) // Lazy initialization
                {
                    this._typeIdMap = new Map(); // Map<String, int>
                }
        
                const p = this._typeIdMap.get(typeId);
                if(p !== undefined)
                {
                    return p;
                }
                else
                {
                    this._typeIdMap.set(typeId, ++this._typeIdIndex);
                    return -1;
                }
            }
        }
        
        class EncapsEncoder10 extends EncapsEncoder
        {
            constructor(stream, encaps)
            {
                super(stream, encaps);
                this._sliceType = SliceType.NoSlice;
                this._writeSlice = 0; // Position of the slice data members
                this._valueIdIndex = 0;
                this._toBeMarshaledMap = new Map(); // Map<Ice.Value, Integer>();
            }
        
            writeValue(v)
            {
                Debug.assert(v !== undefined);
                //
                // Object references are encoded as a negative integer in 1.0.
                //
                if(v !== null && v !== undefined)
                {
                    this._stream.writeInt(-this.registerValue(v));
                }
                else
                {
                    this._stream.writeInt(0);
                }
            }
        
            writeException(v)
            {
                Debug.assert(v !== null && v !== undefined);
                //
                // User exception with the 1.0 encoding start with a boolean
                // flag that indicates whether or not the exception uses
                // classes.
                //
                // This allows reading the pending instances even if some part of
                // the exception was sliced.
                //
                const usesClasses = v._usesClasses();
                this._stream.writeBool(usesClasses);
                v._write(this._stream);
                if(usesClasses)
                {
                    this.writePendingValues();
                }
            }
        
            startInstance(sliceType)
            {
                this._sliceType = sliceType;
            }
        
            endInstance()
            {
                if(this._sliceType === SliceType.ValueSlice)
                {
                    //
                    // Write the Object slice.
                    //
                    this.startSlice(Ice.Value.ice_staticId(), -1, true);
                    this._stream.writeSize(0); // For compatibility with the old AFM.
                    this.endSlice();
                }
                this._sliceType = SliceType.NoSlice;
            }
        
            startSlice(typeId)
            {
                //
                // For instance slices, encode a boolean to indicate how the type ID
                // is encoded and the type ID either as a string or index. For
                // exception slices, always encode the type ID as a string.
                //
                if(this._sliceType === SliceType.ValueSlice)
                {
                    const index = this.registerTypeId(typeId);
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
            }
        
            endSlice()
            {
                //
                // Write the slice length.
                //
                const sz = this._stream.pos - this._writeSlice + 4;
                this._stream.rewriteInt(sz, this._writeSlice - 4);
            }
        
            writePendingValues()
            {
                const writeCB = (value, key) =>
                    {
                        //
                        // Ask the instance to marshal itself. Any new class
                        // instances that are triggered by the classes marshaled
                        // are added to toBeMarshaledMap.
                        //
                        this._stream.writeInt(value);
                        try
                        {
                            key.ice_preMarshal();
                        }
                        catch(ex)
                        {
                            this._stream.instance.initializationData().logger.warning(
                                "exception raised by ice_preMarshal:\n" + ex.toString());
                        }
                        key._iceWrite(this._stream);
                    };
        
                while(this._toBeMarshaledMap.size > 0)
                {
                    //
                    // Consider the to be marshalled instances as marshalled now,
                    // this is necessary to avoid adding again the "to be
                    // marshalled instances" into _toBeMarshaledMap while writing
                    // instances.
                    //
                    this._toBeMarshaledMap.forEach((value, key) => this._marshaledMap.set(key, value));
        
                    const savedMap = this._toBeMarshaledMap;
                    this._toBeMarshaledMap = new Map(); // Map<Ice.Value, int>();
                    this._stream.writeSize(savedMap.size);
                    savedMap.forEach(writeCB);
                }
                this._stream.writeSize(0); // Zero marker indicates end of sequence of sequences of instances.
            }
        
            registerValue(v)
            {
                Debug.assert(v !== null);
        
                //
                // Look for this instance in the to-be-marshaled map.
                //
                let p = this._toBeMarshaledMap.get(v);
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
                this._toBeMarshaledMap.set(v, ++this._valueIdIndex);
                return this._valueIdIndex;
            }
        }
        
        class EncapsEncoder11 extends EncapsEncoder
        {
            constructor(stream, encaps)
            {
                super(stream, encaps);
                this._current = null;
                this._valueIdIndex = 1;
            }
        
            writeValue(v)
            {
                Debug.assert(v !== undefined);
                if(v === null || v === undefined)
                {
                    this._stream.writeSize(0);
                }
                else if(this._current !== null && this._encaps.format === FormatType.SlicedFormat)
                {
                    if(this._current.indirectionTable === null) // Lazy initialization
                    {
                        this._current.indirectionTable = []; // Ice.Value[]
                        this._current.indirectionMap = new Map(); // Map<Ice.Value, int>
                    }
        
                    //
                    // If writing an instance within a slice and using the sliced
                    // format, write an index from the instance indirection
                    // table. The indirect instance table is encoded at the end of
                    // each slice and is always read (even if the Slice is
                    // unknown).
                    //
                    const index = this._current.indirectionMap.get(v);
                    if(index === undefined)
                    {
                        this._current.indirectionTable.push(v);
                        const idx = this._current.indirectionTable.length; // Position + 1 (0 is reserved for nil)
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
            }
        
            writePendingValues()
            {
                return undefined;
            }
        
            writeException(v)
            {
                Debug.assert(v !== null && v !== undefined);
                v._write(this._stream);
            }
        
            startInstance(sliceType, data)
            {
                if(this._current === null)
                {
                    this._current = new EncapsEncoder11.InstanceData(null);
                }
                else
                {
                    this._current =
                        (this._current.next === null) ? new EncapsEncoder11.InstanceData(this._current) : this._current.next;
                }
                this._current.sliceType = sliceType;
                this._current.firstSlice = true;
        
                if(data !== null && data !== undefined)
                {
                    this.writeSlicedData(data);
                }
            }
        
            endInstance()
            {
                this._current = this._current.previous;
            }
        
            startSlice(typeId, compactId, last)
            {
                Debug.assert((this._current.indirectionTable === null || this._current.indirectionTable.length === 0) &&
                             (this._current.indirectionMap === null || this._current.indirectionMap.size === 0));
        
                this._current.sliceFlagsPos = this._stream.pos;
        
                this._current.sliceFlags = 0;
                if(this._encaps.format === FormatType.SlicedFormat)
                {
                    // Encode the slice size if using the sliced format.
                    this._current.sliceFlags |= Protocol.FLAG_HAS_SLICE_SIZE;
                }
                if(last)
                {
                    this._current.sliceFlags |= Protocol.FLAG_IS_LAST_SLICE; // This is the last slice.
                }
        
                this._stream.writeByte(0); // Placeholder for the slice flags
        
                //
                // For instance slices, encode the flag and the type ID either as a
                // string or index. For exception slices, always encode the type
                // ID a string.
                //
                if(this._current.sliceType === SliceType.ValueSlice)
                {
                    //
                    // Encode the type ID (only in the first slice for the compact
                    // encoding).
                    //
                    if(this._encaps.format === FormatType.SlicedFormat || this._current.firstSlice)
                    {
                        if(compactId >= 0)
                        {
                            this._current.sliceFlags |= Protocol.FLAG_HAS_TYPE_ID_COMPACT;
                            this._stream.writeSize(compactId);
                        }
                        else
                        {
                            const index = this.registerTypeId(typeId);
                            if(index < 0)
                            {
                                this._current.sliceFlags |= Protocol.FLAG_HAS_TYPE_ID_STRING;
                                this._stream.writeString(typeId);
                            }
                            else
                            {
                                this._current.sliceFlags |= Protocol.FLAG_HAS_TYPE_ID_INDEX;
                                this._stream.writeSize(index);
                            }
                        }
                    }
                }
                else
                {
                    this._stream.writeString(typeId);
                }
        
                if((this._current.sliceFlags & Protocol.FLAG_HAS_SLICE_SIZE) !== 0)
                {
                    this._stream.writeInt(0); // Placeholder for the slice length.
                }
        
                this._current.writeSlice = this._stream.pos;
                this._current.firstSlice = false;
            }
        
            endSlice()
            {
                //
                // Write the optional member end marker if some optional members
                // were encoded. Note that the optional members are encoded before
                // the indirection table and are included in the slice size.
                //
                if((this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) !== 0)
                {
                    this._stream.writeByte(Protocol.OPTIONAL_END_MARKER);
                }
        
                //
                // Write the slice length if necessary.
                //
                if((this._current.sliceFlags & Protocol.FLAG_HAS_SLICE_SIZE) !== 0)
                {
                    const sz = this._stream.pos - this._current.writeSlice + 4;
                    this._stream.rewriteInt(sz, this._current.writeSlice - 4);
                }
        
                //
                // Only write the indirection table if it contains entries.
                //
                if(this._current.indirectionTable !== null && this._current.indirectionTable.length !== 0)
                {
                    Debug.assert(this._encaps.format === FormatType.SlicedFormat);
                    this._current.sliceFlags |= Protocol.FLAG_HAS_INDIRECTION_TABLE;
        
                    //
                    // Write the indirection instance table.
                    //
                    this._stream.writeSize(this._current.indirectionTable.length);
                    this._current.indirectionTable.forEach(o => this.writeInstance(o));
                    this._current.indirectionTable.length = 0; // Faster way to clean array in JavaScript
                    this._current.indirectionMap.clear();
                }
        
                //
                // Finally, update the slice flags.
                //
                this._stream.rewriteByte(this._current.sliceFlags, this._current.sliceFlagsPos);
            }
        
            writeOptional(tag, format)
            {
                if(this._current === null)
                {
                    return this._stream.writeOptImpl(tag, format);
                }
        
                if(this._stream.writeOptImpl(tag, format))
                {
                    this._current.sliceFlags |= Protocol.FLAG_HAS_OPTIONAL_MEMBERS;
                    return true;
                }
        
                return false;
            }
        
            writeSlicedData(slicedData)
            {
                Debug.assert(slicedData !== null && slicedData !== undefined);
        
                //
                // We only remarshal preserved slices if we are using the sliced
                // format. Otherwise, we ignore the preserved slices, which
                // essentially "slices" the instance into the most-derived type
                // known by the sender.
                //
                if(this._encaps.format !== FormatType.SlicedFormat)
                {
                    return;
                }
        
                slicedData.slices.forEach(info =>
                    {
                        this.startSlice(info.typeId, info.compactId, info.isLastSlice);
        
                        //
                        // Write the bytes associated with this slice.
                        //
                        this._stream.writeBlob(info.bytes);
        
                        if(info.hasOptionalMembers)
                        {
                            this._current.sliceFlags |= Protocol.FLAG_HAS_OPTIONAL_MEMBERS;
                        }
        
                        //
                        // Make sure to also re-write the instance indirection table.
                        //
                        if(info.instances !== null && info.instances.length > 0)
                        {
                            if(this._current.indirectionTable === null) // Lazy initialization
                            {
                                this._current.indirectionTable = []; // Ice.Value[]
                                this._current.indirectionMap = new Map(); // Map<Ice.Value, int>
                            }
        
                            info.instances.forEach(instance => this._current.indirectionTable.push(instance));
                        }
        
                        this.endSlice();
                    });
            }
        
            writeInstance(v)
            {
                Debug.assert(v !== null && v !== undefined);
        
                //
                // If the instance was already marshaled, just write it's ID.
                //
                const p = this._marshaledMap.get(v);
                if(p !== undefined)
                {
                    this._stream.writeSize(p);
                    return;
                }
        
                //
                // We haven't seen this instance previously, create a new ID,
                // insert it into the marshaled map, and write the instance.
                //
                this._marshaledMap.set(v, ++this._valueIdIndex);
        
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
                v._iceWrite(this._stream);
            }
        }
        
        EncapsEncoder11.InstanceData = class
        {
            constructor(previous)
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
                this.writeSlice = 0; // Position of the slice data members
                this.sliceFlagsPos = 0; // Position of the slice flags
                this.indirectionTable = null; // Ice.Value[]
                this.indirectionMap = null; // Map<Ice.Value, int>
            }
        };
        
        class WriteEncaps
        {
            constructor()
            {
                this.start = 0;
                this.format = FormatType.DefaultFormat;
                this.encoding = null;
                this.encoding_1_0 = false;
                this.encoder = null;
                this.next = null;
            }
        
            reset()
            {
                this.encoder = null;
            }
        
            setEncoding(encoding)
            {
                this.encoding = encoding;
                this.encoding_1_0 = encoding.equals(Ice.Encoding_1_0);
            }
        }
        
        class OutputStream
        {
            constructor(arg1, arg2)
            {
                this._instance = null;
                this._encoding = null;
        
                if(arg1 !== undefined && arg1 !== null)
                {
                    if(arg1.constructor == Ice.Communicator)
                    {
                        this._instance = arg1.instance;
                    }
                    else if(arg1.constructor == Ice.Instance)
                    {
                        this._instance = arg1;
                    }
                    else if(arg1.constructor == Ice.EncodingVersion)
                    {
                        this._encoding = arg1;
                    }
                    else
                    {
                        throw new Ice.InitializationException("unknown argument to OutputStream constructor");
                    }
                }
        
                if(arg2 !== undefined && arg2 !== null)
                {
                    if(arg2.constructor == Ice.EncodingVersion)
                    {
                        this._encoding = arg2;
                    }
                    else
                    {
                        throw new Ice.InitializationException("unknown argument to OutputStream constructor");
                    }
                }
        
                this._buf = new Ice.Buffer();
        
                this._closure = null;
        
                this._encapsStack = null;
                this._encapsCache = null;
        
                if(this._instance !== null)
                {
                    if(this._encoding === null)
                    {
                        this._encoding = this._instance.defaultsAndOverrides().defaultEncoding;
                    }
                    this._format = this._instance.defaultsAndOverrides().defaultFormat;
                }
                else
                {
                    if(this._encoding === null)
                    {
                        this._encoding = Protocol.currentEncoding;
                    }
                    this._format = FormatType.CompactFormat;
                }
            }
        
            //
            // This function allows this object to be reused, rather than reallocated.
            //
            reset()
            {
                this._buf.reset();
                this.clear();
            }
        
            clear()
            {
                if(this._encapsStack !== null)
                {
                    Debug.assert(this._encapsStack.next);
                    this._encapsStack.next = this._encapsCache;
                    this._encapsCache = this._encapsStack;
                    this._encapsCache.reset();
                    this._encapsStack = null;
                }
            }
        
            finished()
            {
                return this.prepareWrite().getArray(this.size);
            }
        
            swap(other)
            {
                Debug.assert(this._instance === other._instance);
        
                [other._buf, this._buf] = [this._buf, other._buf];
                [other._encoding, this._encoding] = [this._encoding, other._encoding];
                [other._closure, this._closure] = [this._closure, other._closure];
        
                //
                // Swap is never called for streams that have encapsulations being written. However,
                // encapsulations might still be set in case marshaling failed. We just
                // reset the encapsulations if there are still some set.
                //
                this.resetEncapsulation();
                other.resetEncapsulation();
            }
        
            resetEncapsulation()
            {
                this._encapsStack = null;
            }
        
            resize(sz)
            {
                this._buf.resize(sz);
                this._buf.position = sz;
            }
        
            prepareWrite()
            {
                this._buf.position = 0;
                return this._buf;
            }
        
            startValue(data)
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);
                this._encapsStack.encoder.startInstance(SliceType.ValueSlice, data);
            }
        
            endValue()
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);
                this._encapsStack.encoder.endInstance();
            }
        
            startException(data)
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);
                this._encapsStack.encoder.startInstance(SliceType.ExceptionSlice, data);
            }
        
            endException()
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);
                this._encapsStack.encoder.endInstance();
            }
        
            startEncapsulation(encoding, format)
            {
                //
                // If no encoding version is specified, use the current write
                // encapsulation encoding version if there's a current write
                // encapsulation, otherwise, use the stream encoding version.
                //
        
                if(encoding === undefined)
                {
                    if(this._encapsStack !== null)
                    {
                        encoding = this._encapsStack.encoding;
                        format = this._encapsStack.format;
                    }
                    else
                    {
                        encoding = this._encoding;
                        format = FormatType.DefaultFormat;
                    }
                }
        
                Protocol.checkSupportedEncoding(encoding);
        
                let curr = this._encapsCache;
                if(curr !== null)
                {
                    curr.reset();
                    this._encapsCache = this._encapsCache.next;
                }
                else
                {
                    curr = new WriteEncaps();
                }
                curr.next = this._encapsStack;
                this._encapsStack = curr;
        
                this._encapsStack.format = format;
                this._encapsStack.setEncoding(encoding);
                this._encapsStack.start = this._buf.limit;
        
                this.writeInt(0); // Placeholder for the encapsulation length.
                this._encapsStack.encoding._write(this);
            }
        
            endEncapsulation()
            {
                Debug.assert(this._encapsStack);
        
                // Size includes size and version.
                const start = this._encapsStack.start;
                const sz = this._buf.limit - start;
                this._buf.putIntAt(start, sz);
        
                const curr = this._encapsStack;
                this._encapsStack = curr.next;
                curr.next = this._encapsCache;
                this._encapsCache = curr;
                this._encapsCache.reset();
            }
        
            writeEmptyEncapsulation(encoding)
            {
                Protocol.checkSupportedEncoding(encoding);
                this.writeInt(6); // Size
                encoding._write(this);
            }
        
            writeEncapsulation(v)
            {
                if(v.length < 6)
                {
                    throw new Ice.EncapsulationException();
                }
                this.expand(v.length);
                this._buf.putArray(v);
            }
        
            getEncoding()
            {
                return this._encapsStack !== null ? this._encapsStack.encoding : this._encoding;
            }
        
            startSlice(typeId, compactId, last)
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);
                this._encapsStack.encoder.startSlice(typeId, compactId, last);
            }
        
            endSlice()
            {
                Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);
                this._encapsStack.encoder.endSlice();
            }
        
            writePendingValues()
            {
                if(this._encapsStack !== null && this._encapsStack.encoder !== null)
                {
                    this._encapsStack.encoder.writePendingValues();
                }
                else if((this._encapsStack !== null && this._encapsStack.encoding_1_0) ||
                        (this._encapsStack === null && this._encoding.equals(Ice.Encoding_1_0)))
                {
                    //
                    // If using the 1.0 encoding and no instances were written, we
                    // still write an empty sequence for pending instances if
                    // requested (i.e.: if this is called).
                    //
                    // This is required by the 1.0 encoding, even if no instances
                    // are written we do marshal an empty sequence if marshaled
                    // data types use classes.
                    //
                    this.writeSize(0);
                }
            }
        
            writeSize(v)
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
            }
        
            startSize()
            {
                const pos = this._buf.position;
                this.writeInt(0); // Placeholder for 32-bit size
                return pos;
            }
        
            endSize(pos)
            {
                Debug.assert(pos >= 0);
                this.rewriteInt(this._buf.position - pos - 4, pos);
            }
        
            writeBlob(v)
            {
                if(v === null || v === undefined)
                {
                    return;
                }
                this.expand(v.length);
                this._buf.putArray(v);
            }
        
            // Read/write format and tag for optionals
            writeOptional(tag, format)
            {
                Debug.assert(this._encapsStack !== null);
                if(this._encapsStack.encoder !== null)
                {
                    return this._encapsStack.encoder.writeOptional(tag, format);
                }
                return this.writeOptImpl(tag, format);
            }
        
            writeOptionalHelper(tag, format, write, v)
            {
                if(v !== undefined)
                {
                    if(this.writeOptional(tag, format))
                    {
                        write.call(this, v);
                    }
                }
            }
        
            writeByte(v)
            {
                this.expand(1);
                this._buf.put(v);
            }
        
            rewriteByte(v, dest)
            {
                this._buf.putAt(dest, v);
            }
        
            writeByteSeq(v)
            {
                if(v === null || v === undefined || v.length === 0)
                {
                    this.writeSize(0);
                }
                else
                {
                    this.writeSize(v.length);
                    this.expand(v.length);
                    this._buf.putArray(v);
                }
            }
        
            writeBool(v)
            {
                this.expand(1);
                this._buf.put(v ? 1 : 0);
            }
        
            rewriteBool(v, dest)
            {
                this._buf.putAt(dest, v ? 1 : 0);
            }
        
            writeShort(v)
            {
                this.expand(2);
                this._buf.putShort(v);
            }
        
            writeInt(v)
            {
                this.expand(4);
                this._buf.putInt(v);
            }
        
            rewriteInt(v, dest)
            {
                this._buf.putIntAt(dest, v);
            }
        
            writeLong(v)
            {
                this.expand(8);
                this._buf.putLong(v);
            }
        
            writeFloat(v)
            {
                this.expand(4);
                this._buf.putFloat(v);
            }
        
            writeDouble(v)
            {
                this.expand(8);
                this._buf.putDouble(v);
            }
        
            writeString(v)
            {
                if(v === null || v === undefined || v.length === 0)
                {
                    this.writeSize(0);
                }
                else
                {
                    this._buf.writeString(this, v);
                }
            }
        
            writeProxy(v)
            {
                if(v === null || v === undefined)
                {
                    const ident = new Ice.Identity();
                    ident._write(this);
                }
                else
                {
                    v._write(this);
                }
            }
        
            writeOptionalProxy(tag, v)
            {
                if(v !== undefined)
                {
                    if(this.writeOptional(tag, OptionalFormat.FSize))
                    {
                        const pos = this.startSize();
                        this.writeProxy(v);
                        this.endSize(pos);
                    }
                }
            }
        
            writeEnum(v)
            {
                if(this.isEncoding_1_0())
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
            }
        
            writeValue(v)
            {
                this.initEncaps();
                this._encapsStack.encoder.writeValue(v);
            }
        
            writeOptionalValue(tag, v)
            {
                if(v !== undefined)
                {
                    if(this.writeOptional(tag, OptionalFormat.Class))
                    {
                        this.writeValue(v);
                    }
                }
            }
        
            writeException(e)
            {
                this.initEncaps();
                this._encapsStack.encoder.writeException(e);
            }
        
            //
            // Keep for compatibility with 3.7.0 remove with next major version
            //
            writeUserException(e)
            {
                this.WriteException(e);
            }
        
            writeOptImpl(tag, format)
            {
                if(this.isEncoding_1_0())
                {
                    return false; // Optional members aren't supported with the 1.0 encoding.
                }
        
                let v = format.value;
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
            }
        
            isEmpty()
            {
                return this._buf.empty();
            }
        
            expand(n)
            {
                this._buf.expand(n);
            }
        
            isEncoding_1_0()
            {
                return this._encapsStack ? this._encapsStack.encoding_1_0 : this._encoding.equals(Ice.Encoding_1_0);
            }
        
            initEncaps()
            {
                if(!this._encapsStack) // Lazy initialization
                {
                    this._encapsStack = this._encapsCache;
                    if(this._encapsStack)
                    {
                        this._encapsCache = this._encapsCache.next;
                    }
                    else
                    {
                        this._encapsStack = new WriteEncaps();
                    }
                    this._encapsStack.setEncoding(this._encoding);
                }
        
                if(this._encapsStack.format === FormatType.DefaultFormat)
                {
                    this._encapsStack.format = this._instance.defaultsAndOverrides().defaultFormat;
                }
        
                if(!this._encapsStack.encoder) // Lazy initialization.
                {
                    if(this._encapsStack.encoding_1_0)
                    {
                        this._encapsStack.encoder = new EncapsEncoder10(this, this._encapsStack);
                    }
                    else
                    {
                        this._encapsStack.encoder = new EncapsEncoder11(this, this._encapsStack);
                    }
                }
            }
        
            //
            // Sets the encoding format for class and exception instances.
            //
            get format()
            {
                return this._format;
            }
        
            set format(value)
            {
                this._format = value;
            }
        
            get pos()
            {
                return this._buf.position;
            }
        
            set pos(value)
            {
                this._buf.position = value;
            }
        
            get size()
            {
                return this._buf.limit;
            }
        
            get instance()
            {
                return this._instance;
            }
        
            get closure()
            {
                return this._closure;
            }
        
            set closure(value)
            {
                this._closure = value;
            }
        
            get buffer()
            {
                return this._buf;
            }
        }
        
        const defineBuiltinHelper = function(write, read, sz, format, min, max)
        {
            const helper = class
            {
                static write(os, v)
                {
                    return write.call(os, v);
                }
        
                static read(is)
                {
                    return read.call(is);
                }
        
                static writeOptional(os, tag, v)
                {
                    os.writeOptionalHelper(tag, format, write, v);
                }
        
                static readOptional(is, tag)
                {
                    return is.readOptionalHelper(tag, format, read);
                }
        
                static get minWireSize()
                {
                    return sz;
                }
            };
        
            if(min !== undefined && max !== undefined)
            {
                helper.validate = function(v)
                {
                    return v >= min && v <= max;
                };
            }
        
            return helper;
        };
        
        const istr = InputStream.prototype;
        const ostr = OutputStream.prototype;
        
        //
        // Constants to use in number type range checks.
        //
        const MIN_UINT8_VALUE = 0x0;
        const MAX_UINT8_VALUE = 0xFF;
        
        const MIN_INT16_VALUE = -0x8000;
        const MAX_INT16_VALUE = 0x7FFF;
        
        const MIN_UINT32_VALUE = 0x0;
        const MAX_UINT32_VALUE = 0xFFFFFFFF;
        
        const MIN_INT32_VALUE = -0x80000000;
        const MAX_INT32_VALUE = 0x7FFFFFFF;
        
        const MIN_FLOAT32_VALUE = -3.4028234664e+38;
        const MAX_FLOAT32_VALUE = 3.4028234664e+38;
        
        Ice.ByteHelper = defineBuiltinHelper(ostr.writeByte, istr.readByte, 1, Ice.OptionalFormat.F1,
                                             MIN_UINT8_VALUE, MAX_UINT8_VALUE);
        
        Ice.ShortHelper = defineBuiltinHelper(ostr.writeShort, istr.readShort, 2, Ice.OptionalFormat.F2,
                                              MIN_INT16_VALUE, MAX_INT16_VALUE);
        
        Ice.IntHelper = defineBuiltinHelper(ostr.writeInt, istr.readInt, 4, Ice.OptionalFormat.F4,
                                            MIN_INT32_VALUE, MAX_INT32_VALUE);
        
        Ice.FloatHelper = defineBuiltinHelper(ostr.writeFloat, istr.readFloat, 4, Ice.OptionalFormat.F4,
                                              MIN_FLOAT32_VALUE, MAX_FLOAT32_VALUE);
        Ice.FloatHelper.validate = function(v)
        {
            return Number.isNaN(v) || v == Number.POSITIVE_INFINITY || v == Number.NEGATIVE_INFINITY ||
                (v >= MIN_FLOAT32_VALUE && v <= MAX_FLOAT32_VALUE);
        };
        
        Ice.DoubleHelper = defineBuiltinHelper(ostr.writeDouble, istr.readDouble, 8, Ice.OptionalFormat.F8,
                                               -Number.MAX_VALUE, Number.MAX_VALUE);
        Ice.DoubleHelper.validate = function(v)
        {
            return Number.isNaN(v) || v == Number.POSITIVE_INFINITY || v == Number.NEGATIVE_INFINITY ||
                (v >= -Number.MAX_VALUE && v <= Number.MAX_VALUE);
        };
        
        Ice.BoolHelper = defineBuiltinHelper(ostr.writeBool, istr.readBool, 1, Ice.OptionalFormat.F1);
        Ice.LongHelper = defineBuiltinHelper(ostr.writeLong, istr.readLong, 8, Ice.OptionalFormat.F8);
        Ice.LongHelper.validate = function(v)
        {
            //
            // For a long to be valid both words must be within the range of UINT32
            //
            return v.low >= MIN_UINT32_VALUE && v.low <= MAX_UINT32_VALUE &&
                   v.high >= MIN_UINT32_VALUE && v.high <= MAX_UINT32_VALUE;
        };
        
        Ice.StringHelper = defineBuiltinHelper(ostr.writeString, istr.readString, 1, Ice.OptionalFormat.VSize);
        
        Ice.ObjectHelper = class
        {
            static write(os, v)
            {
                os.writeValue(v);
            }
        
            static read(is)
            {
                let o;
                is.readValue(v =>
                             {
                                 o = v;
                             }, Ice.Value);
                return o;
            }
        
            static writeOptional(os, tag, v)
            {
                os.writeOptionalValue(tag, Ice.OptionalFormat.Class, ostr.writeValue, v);
            }
        
            static readOptional(is, tag)
            {
                let o;
                is.readOptionalValue(tag, v =>
                                     {
                                         o = v;
                                     }, Ice.Value);
                return o;
            }
        
            static get minWireSize()
            {
                return 1;
            }
        };
        
        Ice.InputStream = InputStream;
        Ice.OutputStream = OutputStream;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
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
        
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const Logger = Ice.Logger;
        
        let processLogger = null;
        
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
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        class AsyncResultBase extends Ice.Promise
        {
            constructor(communicator, op, connection, proxy, adapter)
            {
                super();
                this._communicator = communicator;
                this._instance = communicator ? communicator.instance : null;
                this._operation = op;
                this._connection = connection;
                this._proxy = proxy;
                this._adapter = adapter;
            }
        
            get communicator()
            {
                return this._communicator;
            }
        
            get connection()
            {
                return this._connection;
            }
        
            get proxy()
            {
                return this._proxy;
            }
        
            get adapter()
            {
                return this._adapter;
            }
        
            get operation()
            {
                return this._operation;
            }
        }
        
        Ice.AsyncResultBase = AsyncResultBase;
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const OutputStream = Ice.OutputStream;
        const Debug = Ice.Debug;
        const Protocol = Ice.Protocol;
        
        const udpOverhead = 20 + 8;
        
        class BatchRequestQueue
        {
            constructor(instance, datagram)
            {
                this._batchStreamInUse = false;
                this._batchRequestNum = 0;
                this._batchStream = new OutputStream(instance, Protocol.currentProtocolEncoding);
                this._batchStream.writeBlob(Protocol.requestBatchHdr);
                this._batchMarker = this._batchStream.size;
                this._exception = null;
        
                this._maxSize = instance.batchAutoFlushSize();
                if(this._maxSize > 0 && datagram)
                {
                    const udpSndSize = instance.initializationData().properties.getPropertyAsIntWithDefault(
                        "Ice.UDP.SndSize", 65535 - udpOverhead);
                    if(udpSndSize < this._maxSize)
                    {
                        this._maxSize = udpSndSize;
                    }
                }
            }
        
            prepareBatchRequest(os)
            {
                if(this._exception)
                {
                    throw this._exception;
                }
                this._batchStream.swap(os);
            }
        
            finishBatchRequest(os, proxy, operation)
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
            }
        
            abortBatchRequest(os)
            {
                this._batchStream.swap(os);
                this._batchStream.resize(this._batchMarker);
            }
        
            swap(os)
            {
                if(this._batchRequestNum === 0)
                {
                    return 0;
                }
        
                let lastRequest = null;
                if(this._batchMarker < this._batchStream.size)
                {
                    const length = this._batchStream.size - this._batchMarker;
                    this._batchStream.pos = this._batchMarker;
                    lastRequest = this._batchStream.buffer.getArray(length);
                    this._batchStream.resize(this._batchMarker);
                }
        
                const requestNum = this._batchRequestNum;
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
            }
        
            destroy(ex)
            {
                this._exception = ex;
            }
        
            isEmpty()
            {
                return this._batchStream.size === Protocol.requestBatchHdr.length;
            }
        }
        
        Ice.BatchRequestQueue = BatchRequestQueue;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Debug = Ice.Debug;
        const HashMap = Ice.HashMap;
        const StringUtil = Ice.StringUtil;
        
        //
        // Only for use by Ice.ObjectAdatperI.
        //
        class ServantManager
        {
            constructor(instance, adapterName)
            {
                this._instance = instance;
                this._adapterName = adapterName;
                // Map<Ice.Identity, Map<String, Ice.Object> >
                this._servantMapMap = new HashMap(HashMap.compareEquals);
                // Map<String, Ice.Object>
                this._defaultServantMap = new Map();
                // Map<String, Ice.ServantLocator>
                this._locatorMap = new Map();
            }
        
            addServant(servant, ident, facet)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                if(facet === null)
                {
                    facet = "";
                }
        
                let m = this._servantMapMap.get(ident);
                if(m === undefined)
                {
                    m = new Map();
                    this._servantMapMap.set(ident, m);
                }
                else if(m.has(facet))
                {
                    const ex = new Ice.AlreadyRegisteredException();
                    ex.id = Ice.identityToString(ident, this._instance.toStringMode());
                    ex.kindOfObject = "servant";
                    if(facet.length > 0)
                    {
                        ex.id += " -f " + StringUtil.escapeString(facet, "", this._instance.toStringMode());
                    }
                    throw ex;
                }
        
                m.set(facet, servant);
            }
        
            addDefaultServant(servant, category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction
        
                if(this._defaultServantMap.has(category))
                {
                    const ex = new Ice.AlreadyRegisteredException();
                    ex.kindOfObject = "default servant";
                    ex.id = category;
                    throw ex;
                }
        
                this._defaultServantMap.set(category, servant);
            }
        
            removeServant(ident, facet)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                if(facet === null)
                {
                    facet = "";
                }
        
                const m = this._servantMapMap.get(ident);
                if(m === undefined || !m.has(facet))
                {
                    const ex = new Ice.NotRegisteredException();
                    ex.id = Ice.identityToString(ident, this._instance.toStringMode());
                    ex.kindOfObject = "servant";
                    if(facet.length > 0)
                    {
                        ex.id += " -f " + StringUtil.escapeString(facet, "", this._instance.toStringMode());
                    }
                    throw ex;
                }
        
                const obj = m.get(facet);
                m.delete(facet);
        
                if(m.size === 0)
                {
                    this._servantMapMap.delete(ident);
                }
        
                return obj;
            }
        
            removeDefaultServant(category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                const obj = this._defaultServantMap.get(category);
                if(obj === undefined)
                {
                    const ex = new Ice.NotRegisteredException();
                    ex.kindOfObject = "default servant";
                    ex.id = category;
                    throw ex;
                }
        
                this._defaultServantMap.delete(category);
                return obj;
            }
        
            removeAllFacets(ident)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                const m = this._servantMapMap.get(ident);
                if(m === undefined)
                {
                    const ex = new Ice.NotRegisteredException();
                    ex.id = Ice.identityToString(ident, this._instance.toStringMode());
                    ex.kindOfObject = "servant";
                    throw ex;
                }
        
                this._servantMapMap.delete(ident);
        
                return m;
            }
        
            findServant(ident, facet)
            {
                if(facet === null)
                {
                    facet = "";
                }
        
                const m = this._servantMapMap.get(ident);
                let obj = null;
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
            }
        
            findDefaultServant(category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                const ds = this._defaultServantMap.get(category);
                return ds === undefined ? null : ds;
            }
        
            findAllFacets(ident)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                const m = this._servantMapMap.get(ident);
                if(m !== undefined)
                {
                    return new Map(m);
                }
        
                return new Map();
            }
        
            hasServant(ident)
            {
                const m = this._servantMapMap.get(ident);
                if(m === undefined)
                {
                    return false;
                }
                else
                {
                    Debug.assert(m.size > 0);
                    return true;
                }
            }
        
            addServantLocator(locator, category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                if(this._locatorMap.has(category))
                {
                    const ex = new Ice.AlreadyRegisteredException();
                    ex.id = StringUtil.escapeString(category, "", this._instance.toStringMode());
                    ex.kindOfObject = "servant locator";
                    throw ex;
                }
        
                this._locatorMap.set(category, locator);
            }
        
            removeServantLocator(category)
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
        
                const l = this._locatorMap.get(category);
                if(l === undefined)
                {
                    const ex = new Ice.NotRegisteredException();
                    ex.id = StringUtil.escapeString(category, "", this._instance.toStringMode());
                    ex.kindOfObject = "servant locator";
                    throw ex;
                }
                this._locatorMap.delete(category);
                return l;
            }
        
            findServantLocator(category)
            {
                const l = this._locatorMap.get(category);
                return l === undefined ? null : l;
            }
        
            //
            // Only for use by Ice.ObjectAdapterI.
            //
            destroy()
            {
                Debug.assert(this._instance !== null); // Must not be called after destruction.
                const logger = this._instance.initializationData().logger;
                this._servantMapMap.clear();
        
                this._defaultServantMap.clear();
        
                const locatorMap = new Map(this._locatorMap);
                this._locatorMap.clear();
                this._instance = null;
        
                for(const [key, locator] of locatorMap)
                {
                    try
                    {
                        locator.deactivate(key);
                    }
                    catch(ex)
                    {
                        logger.error("exception during locator deactivation:\nobject adapter: `" +
                                     this._adapterName + "'\nlocator category: `" + key + "'\n" +
                                     ex.toString());
                    }
                }
            }
        }
        
        Ice.ServantManager = ServantManager;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const AsyncResultBase = Ice.AsyncResultBase;
        const Debug = Ice.Debug;
        const Protocol = Ice.Protocol;
        const UserException = Ice.UserException;
        const OutputStream = Ice.OutputStream;
        
        class AsyncResult extends AsyncResultBase
        {
            constructor(com, op, connection, proxy, adapter, completedFn)
            {
                super(com, op, connection, proxy, adapter);
                this._completed = completedFn;
                this._is = null;
                this._os = com !== null ? new OutputStream(this._instance, Protocol.currentProtocolEncoding) : null;
                this._state = 0;
                this._exception = null;
                this._sentSynchronously = false;
            }
        
            cancel()
            {
                this.cancelWithException(new Ice.InvocationCanceledException());
            }
        
            isCompleted()
            {
                return (this._state & AsyncResult.Done) > 0;
            }
        
            isSent()
            {
                return (this._state & AsyncResult.Sent) > 0;
            }
        
            throwLocalException()
            {
                if(this._exception !== null)
                {
                    throw this._exception;
                }
            }
        
            sentSynchronously()
            {
                return this._sentSynchronously;
            }
        
            markSent(done)
            {
                Debug.assert((this._state & AsyncResult.Done) === 0);
                this._state |= AsyncResult.Sent;
                if(done)
                {
                    this._state |= AsyncResult.Done | AsyncResult.OK;
                    this._cancellationHandler = null;
                    this.resolve();
                }
            }
        
            markFinished(ok, completed)
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
                    this.resolve();
                }
            }
        
            markFinishedEx(ex)
            {
                Debug.assert((this._state & AsyncResult.Done) === 0);
                this._exception = ex;
                this._state |= AsyncResult.Done;
                this._cancellationHandler = null;
                this.reject(ex);
            }
        
            cancelWithException(ex)
            {
                if(this._cancellationHandler)
                {
                    this._cancellationHandler.asyncRequestCanceled(this, ex);
                }
                else
                {
                    this._cancellationException = ex;
                }
            }
        
            cancelable(handler)
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
            }
        
            getOs()
            {
                return this._os;
            }
        
            startReadParams()
            {
                this._is.startEncapsulation();
                return this._is;
            }
        
            endReadParams()
            {
                this._is.endEncapsulation();
            }
        
            readEmptyParams()
            {
                this._is.skipEmptyEncapsulation();
            }
        
            throwUserException()
            {
                Debug.assert((this._state & AsyncResult.Done) !== 0);
                if((this._state & AsyncResult.OK) === 0)
                {
                    try
                    {
                        this._is.startEncapsulation();
                        this._is.throwException();
                    }
                    catch(ex)
                    {
                        if(ex instanceof UserException)
                        {
                            this._is.endEncapsulation();
                        }
                        throw ex;
                    }
                }
            }
        
        }
        
        AsyncResult.OK = 0x1;
        AsyncResult.Done = 0x2;
        AsyncResult.Sent = 0x4;
        
        Ice.AsyncResult = AsyncResult;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const StringUtil = Ice.StringUtil;
        const PropertyNames = Ice.PropertyNames;
        const Debug = Ice.Debug;
        const getProcessLogger = Ice.getProcessLogger;
        const InitializationException = Ice.InitializationException;
        
        const ParseStateKey = 0;
        const ParseStateValue = 1;
        //
        // Ice.Properties
        //
        class Properties
        {
            constructor(args, defaults)
            {
                this._properties = new Map();
        
                if(defaults !== undefined && defaults !== null)
                {
                    //
                    // NOTE: we can't just do a shallow copy of the map as the map values
                    // would otherwise be shared between the two PropertiesI object.
                    //
                    for(const [key, property] of defaults._properties)
                    {
                        this._properties.set(key, {value: property.value, used: false});
                    }
                }
        
                if(args !== undefined && args !== null)
                {
                    const v = this.parseIceCommandLineOptions(args);
                    args.length = 0;
                    for(let i = 0; i < v.length; ++i)
                    {
                        args.push(v[i]);
                    }
                }
            }
        
            getProperty(key)
            {
                return this.getPropertyWithDefault(key, "");
            }
        
            getPropertyWithDefault(key, value)
            {
                const pv = this._properties.get(key);
                if(pv !== undefined)
                {
                    pv.used = true;
                    return pv.value;
                }
                else
                {
                    return value;
                }
            }
        
            getPropertyAsInt(key)
            {
                return this.getPropertyAsIntWithDefault(key, 0);
            }
        
            getPropertyAsIntWithDefault(key, value)
            {
                const pv = this._properties.get(key);
                if(pv !== undefined)
                {
                    pv.used = true;
                    return parseInt(pv.value);
                }
                else
                {
                    return value;
                }
            }
        
            getPropertyAsList(key)
            {
                return this.getPropertyAsListWithDefault(key, 0);
            }
        
            getPropertyAsListWithDefault(key, value)
            {
                if(value === undefined || value === null)
                {
                    value = [];
                }
        
                const pv = this._properties.get(key);
                if(pv !== undefined)
                {
                    pv.used = true;
        
                    let result = StringUtil.splitString(pv.value, ", \t\r\n");
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
            }
        
            getPropertiesForPrefix(prefix = "")
            {
                const result = new Map();
                this._properties.forEach((property, key) =>
                    {
                        if(key.indexOf(prefix) === 0)
                        {
                            property.used = true;
                            result.set(key, property.value);
                        }
                    });
                return result;
            }
        
            setProperty(key = "", value = "")
            {
                //
                // Trim whitespace
                //
                if(key !== null)
                {
                    key = key.trim();
                }
        
                //
                // Check if the property is legal.
                //
                const logger = getProcessLogger();
                if(key === null || key.length === 0)
                {
                    throw new InitializationException("Attempt to set property with empty key");
                }
        
                let dotPos = key.indexOf(".");
                if(dotPos !== -1)
                {
                    const prefix = key.substr(0, dotPos);
                    for(let i = 0; i < PropertyNames.validProps.length; ++i)
                    {
                        let pattern = PropertyNames.validProps[i][0].pattern;
                        dotPos = pattern.indexOf(".");
                        //
                        // Each top level prefix describes a non-empty namespace. Having a string without a
                        // prefix followed by a dot is an error.
                        //
                        Debug.assert(dotPos != -1);
                        if(pattern.substring(0, dotPos - 1) != prefix)
                        {
                            continue;
                        }
        
                        let found = false;
                        let mismatchCase = false;
                        let otherKey;
                        for(let j = 0; j < PropertyNames.validProps[i][j].length && !found; ++j)
                        {
                            pattern = PropertyNames.validProps[i][j].pattern();
                            let pComp = new RegExp(pattern);
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
                                    otherKey = otherKey.substr(0, otherKey.length - 1);
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
                if(value !== null && value.length > 0)
                {
                    const pv = this._properties.get(key);
                    if(pv !== undefined)
                    {
                        pv.value = value;
                    }
                    else
                    {
                        this._properties.set(key, {value: value, used: false});
                    }
                }
                else
                {
                    this._properties.delete(key);
                }
            }
        
            getCommandLineOptions()
            {
                const result = [];
                this._properties.forEach((property, key) =>
                    {
                        result.push("--" + key + "=" + property.value);
                    });
                return result;
            }
        
            parseCommandLineOptions(pfx, options)
            {
                if(pfx.length > 0 && pfx.charAt(pfx.length - 1) != ".")
                {
                    pfx += ".";
                }
                pfx = "--" + pfx;
        
                const result = [];
        
                options.forEach(opt =>
                    {
                        if(opt.indexOf(pfx) === 0)
                        {
                            if(opt.indexOf('=') === -1)
                            {
                                opt += "=1";
                            }
        
                            this.parseLine(opt.substring(2));
                        }
                        else
                        {
                            result.push(opt);
                        }
                    });
                return result;
            }
        
            parseIceCommandLineOptions(options)
            {
                let args = options.slice();
                for(let i = 0; i < PropertyNames.clPropNames.length; ++i)
                {
                    args = this.parseCommandLineOptions(PropertyNames.clPropNames[i], args);
                }
                return args;
            }
        
            parse(data)
            {
                data.match(/[^\r\n]+/g).forEach(line => this.parseLine(line));
            }
        
            parseLine(line)
            {
                let key = "";
                let value = "";
        
                let state = ParseStateKey;
        
                let whitespace = "";
                let escapedspace = "";
                let finished = false;
        
                for(let i = 0; i < line.length; ++i)
                {
                    let c = line.charAt(i);
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
        
                        default:
                        {
                            Debug.assert(false);
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
            }
        
            clone()
            {
                return new Properties(null, this);
            }
        
            getUnusedProperties()
            {
                const unused = [];
                this._properties.forEach((property, key) =>
                    {
                        if(!property.used)
                        {
                            unused.push(key);
                        }
                    });
                return unused;
            }
        
            static createProperties(args, defaults)
            {
                return new Properties(args, defaults);
            }
        }
        
        Ice.Properties = Properties;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const AsyncResult = Ice.AsyncResult;
        const AsyncStatus = Ice.AsyncStatus;
        const Debug = Ice.Debug;
        const Identity = Ice.Identity;
        const InputStream = Ice.InputStream;
        const OutputStream = Ice.OutputStream;
        const Protocol = Ice.Protocol;
        const RetryException = Ice.RetryException;
        
        class OutgoingAsyncBase extends AsyncResult
        {
            constructor(communicator, operation, connection, proxy, adapter)
            {
                super(communicator, operation, connection, proxy, adapter);
                this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
            }
        
            getOs()
            {
                return this._os;
            }
        
            sent()
            {
                this.markSent(true);
            }
        
            completedEx(ex)
            {
                this.markFinishedEx(ex);
            }
        }
        
        class ProxyOutgoingAsyncBase extends OutgoingAsyncBase
        {
            constructor(prx, operation)
            {
                if (prx)
                {
                    super(prx.ice_getCommunicator(), operation, null, prx, null);
                }
                else
                {
                    super();
                }
                this._mode = null;
                this._cnt = 0;
                this._sent = false;
                this._handler = null;
            }
        
            completedEx(ex)
            {
                try
                {
                    this._instance.retryQueue().add(this, this.handleException(ex));
                }
                catch(ex)
                {
                    this.markFinishedEx(ex);
                }
            }
        
            retryException(ex)
            {
                try
                {
                    this._proxy._updateRequestHandler(this._handler, null); // Clear request handler and always retry.
                    this._instance.retryQueue().add(this, 0);
                }
                catch(ex)
                {
                    this.completedEx(ex);
                }
            }
        
            retry()
            {
                this.invokeImpl(false);
            }
        
            abort(ex)
            {
                this.markFinishedEx(ex);
            }
        
            invokeImpl(userThread)
            {
                try
                {
                    if(userThread)
                    {
                        const invocationTimeout = this._proxy._getReference().getInvocationTimeout();
                        if(invocationTimeout > 0)
                        {
                            this._timeoutToken = this._instance.timer().schedule(
                                () =>
                                {
                                    this.cancelWithException(new Ice.InvocationTimeoutException());
                                },
                                invocationTimeout);
                        }
                    }
        
                    while(true)
                    {
                        try
                        {
                            this._sent = false;
                            this._handler = this._proxy._getRequestHandler();
                            if((this._handler.sendAsyncRequest(this) & AsyncStatus.Sent) > 0)
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
                                this._proxy._updateRequestHandler(this._handler, null);
                            }
                            else
                            {
                                const interval = this.handleException(ex);
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
                    this.markFinishedEx(ex);
                }
            }
        
            markSent(done)
            {
                this._sent = true;
                if(done)
                {
                    if(this._timeoutToken)
                    {
                        this._instance.timer().cancel(this._timeoutToken);
                    }
                }
                super.markSent.call(this, done);
            }
        
            markFinishedEx(ex)
            {
                if(this._timeoutToken)
                {
                    this._instance.timer().cancel(this._timeoutToken);
                }
                super.markFinishedEx.call(this, ex);
            }
        
            handleException(ex)
            {
                const interval = {value: 0};
                this._cnt = this._proxy._handleException(ex, this._handler, this._mode, this._sent, interval, this._cnt);
                return interval.value;
            }
        }
        
        class OutgoingAsync extends ProxyOutgoingAsyncBase
        {
            constructor(prx, operation, completed)
            {
                super(prx, operation);
                if (prx)
                {
                    this._encoding = Protocol.getCompatibleEncoding(this._proxy._getReference().getEncoding());
                    this._completed = completed;
                }
            }
        
            prepare(op, mode, ctx)
            {
                Protocol.checkSupportedProtocol(Protocol.getCompatibleProtocol(this._proxy._getReference().getProtocol()));
        
                this._mode = mode;
                if(ctx === null)
                {
                    ctx = OutgoingAsync._emptyContext;
                }
        
                if(this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram())
                {
                    this._proxy._getBatchRequestQueue().prepareBatchRequest(this._os);
                }
                else
                {
                    this._os.writeBlob(Protocol.requestHdr);
                }
        
                const ref = this._proxy._getReference();
        
                ref.getIdentity()._write(this._os);
        
                //
                // For compatibility with the old FacetPath.
                //
                const facet = ref.getFacet();
                if(facet === null || facet.length === 0)
                {
                    Ice.StringSeqHelper.write(this._os, null);
                }
                else
                {
                    Ice.StringSeqHelper.write(this._os, [facet]);
                }
        
                this._os.writeString(this._operation);
        
                this._os.writeByte(mode.value);
        
                if(ctx !== undefined)
                {
                    if(ctx !== null && !(ctx instanceof Map))
                    {
                        throw new RangeError("illegal context value, expecting null or Map");
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
                    const implicitContext = ref.getInstance().getImplicitContext();
                    const prxContext = ref.getContext();
        
                    if(implicitContext === null)
                    {
                        Ice.ContextHelper.write(this._os, prxContext);
                    }
                    else
                    {
                        implicitContext.write(prxContext, this._os);
                    }
                }
            }
        
            sent()
            {
                this.markSent(!this._proxy.ice_isTwoway());
            }
        
            invokeRemote(connection, response)
            {
                return connection.sendAsyncRequest(this, response, 0);
            }
        
            abort(ex)
            {
                if(this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram())
                {
                    this._proxy._getBatchRequestQueue().abortBatchRequest(this._os);
                }
                super.abort(ex);
            }
        
            invoke()
            {
                if(this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram())
                {
                    this._sentSynchronously = true;
                    this._proxy._getBatchRequestQueue().finishBatchRequest(this._os, this._proxy, this._operation);
                    this.markFinished(true);
                    return;
                }
        
                //
                // NOTE: invokeImpl doesn't throw so this can be called from the
                // try block with the catch block calling abort() in case of an
                // exception.
                //
                this.invokeImpl(true); // userThread = true
            }
        
            completed(istr)
            {
                Debug.assert(this._proxy.ice_isTwoway()); // Can only be called for twoways.
        
                let replyStatus;
                try
                {
                    if(this._is === null) // _is can already be initialized if the invocation is retried
                    {
                        this._is = new InputStream(this._instance, Protocol.currentProtocolEncoding);
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
                            const id = new Identity();
                            id._read(this._is);
        
                            //
                            // For compatibility with the old FacetPath.
                            //
                            const facetPath = Ice.StringSeqHelper.read(this._is);
                            let facet;
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
        
                            const operation = this._is.readString();
        
                            let rfe = null;
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
                            const unknown = this._is.readString();
        
                            let ue = null;
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
        
                    this.markFinished(replyStatus == Protocol.replyOK, this._completed);
                }
                catch(ex)
                {
                    this.completedEx(ex);
                }
            }
        
            startWriteParams(format)
            {
                this._os.startEncapsulation(this._encoding, format);
                return this._os;
            }
        
            endWriteParams()
            {
                this._os.endEncapsulation();
            }
        
            writeEmptyParams()
            {
                this._os.writeEmptyEncapsulation(this._encoding);
            }
        
            startReadParams()
            {
                this._is.startEncapsulation();
                return this._is;
            }
        
            endReadParams()
            {
                this._is.endEncapsulation();
            }
        
            readEmptyParams()
            {
                this._is.skipEmptyEncapsulation();
            }
        
            throwUserException()
            {
                Debug.assert((this._state & AsyncResult.Done) !== 0);
                if((this._state & AsyncResult.OK) === 0)
                {
                    try
                    {
                        this._is.startEncapsulation();
                        this._is.throwException();
                    }
                    catch(ex)
                    {
                        if(ex instanceof Ice.UserException)
                        {
                            this._is.endEncapsulation();
                        }
                        throw ex;
                    }
                }
            }
        }
        
        OutgoingAsync._emptyContext = new Map(); // Map<string, string>
        
        class ProxyFlushBatch extends ProxyOutgoingAsyncBase
        {
            constructor(prx, operation)
            {
                super(prx, operation);
                this._batchRequestNum = prx._getBatchRequestQueue().swap(this._os);
            }
        
            invokeRemote(connection, response)
            {
                if(this._batchRequestNum === 0)
                {
                    this.sent();
                    return AsyncStatus.Sent;
                }
                return connection.sendAsyncRequest(this, response, this._batchRequestNum);
            }
        
            invoke()
            {
                Protocol.checkSupportedProtocol(Protocol.getCompatibleProtocol(this._proxy._getReference().getProtocol()));
                this.invokeImpl(true); // userThread = true
            }
        }
        
        class ProxyGetConnection extends ProxyOutgoingAsyncBase
        {
            invokeRemote(connection, response)
            {
                this.markFinished(true, r => r.resolve(connection));
                return AsyncStatus.Sent;
            }
        
            invoke()
            {
                this.invokeImpl(true); // userThread = true
            }
        }
        
        class ConnectionFlushBatch extends OutgoingAsyncBase
        {
            constructor(con, communicator, operation)
            {
                super(communicator, operation, con, null, null);
            }
        
            invoke()
            {
                try
                {
                    const batchRequestNum = this._connection.getBatchRequestQueue().swap(this._os);
                    let status;
                    if(batchRequestNum === 0)
                    {
                        this.sent();
                        status = AsyncStatus.Sent;
                    }
                    else
                    {
                        status = this._connection.sendAsyncRequest(this, false, batchRequestNum);
                    }
        
                    if((status & AsyncStatus.Sent) > 0)
                    {
                        this._sentSynchronously = true;
                    }
                }
                catch(ex)
                {
                    this.completedEx(ex);
                }
            }
        }
        
        class HeartbeatAsync extends OutgoingAsyncBase
        {
            constructor(con, communicator)
            {
                super(communicator, "heartbeat", con, null, null);
            }
        
            invoke()
            {
                try
                {
                    this._os.writeBlob(Protocol.magic);
                    Protocol.currentProtocol._write(this._os);
                    Protocol.currentProtocolEncoding._write(this._os);
                    this._os.writeByte(Protocol.validateConnectionMsg);
                    this._os.writeByte(0);
                    this._os.writeInt(Protocol.headerSize); // Message size.
        
                    const status = this._connection.sendAsyncRequest(this, false, 0);
                    if((status & AsyncStatus.Sent) > 0)
                    {
                        this._sentSynchronously = true;
                    }
                }
                catch(ex)
                {
                    this.completedEx(ex);
                }
            }
        }
        
        Ice.OutgoingAsync = OutgoingAsync;
        Ice.ProxyFlushBatch = ProxyFlushBatch;
        Ice.ProxyGetConnection = ProxyGetConnection;
        Ice.ConnectionFlushBatch = ConnectionFlushBatch;
        Ice.HeartbeatAsync = HeartbeatAsync;
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `EndpointTypes.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
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
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        class ProtocolInstance
        {
            constructor(instance, type, protocol, secure)
            {
                this._instance = instance;
                this._traceLevel = instance.traceLevels().network;
                this._traceCategory = instance.traceLevels().networkCat;
                this._logger = instance.initializationData().logger;
                this._properties = instance.initializationData().properties;
                this._type = type;
                this._protocol = protocol;
                this._secure = secure;
            }
        
            traceLevel()
            {
                return this._traceLevel;
            }
        
            traceCategory()
            {
                return this._traceCategory;
            }
        
            logger()
            {
                return this._logger;
            }
        
            protocol()
            {
                return this._protocol;
            }
        
            type()
            {
                return this._type;
            }
        
            secure()
            {
                return this._secure;
            }
        
            properties()
            {
                return this._properties;
            }
        
            defaultHost()
            {
                return this._instance.defaultsAndOverrides().defaultHost;
            }
        
            defaultSourceAddress()
            {
                return this._instance.defaultsAndOverrides().defaultSourceAddress;
            }
        
            defaultEncoding()
            {
                return this._instance.defaultsAndOverrides().defaultEncoding;
            }
        
            defaultTimeout()
            {
                return this._instance.defaultsAndOverrides().defaultTimeout;
            }
        
            messageSizeMax()
            {
                return this._instance.messageSizeMax();
            }
        }
        
        Ice.ProtocolInstance = ProtocolInstance;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `EndpointF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        Slice.defineSequence(Ice, "EndpointSeqHelper", "Ice.ObjectHelper", false, "Ice.Endpoint");
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const ArrayUtil = Ice.ArrayUtil;
        const AsyncResultBase = Ice.AsyncResultBase;
        const Debug = Ice.Debug;
        const OutgoingAsync = Ice.OutgoingAsync;
        const ProxyFlushBatch = Ice.ProxyFlushBatch;
        const ProxyGetConnection = Ice.ProxyGetConnection;
        const RefMode = Ice.ReferenceMode;
        const OperationMode = Ice.OperationMode;
        
        //
        // Ice.ObjectPrx
        //
        class ObjectPrx
        {
            constructor()
            {
                this._reference = null;
                this._requestHandler = null;
            }
        
            hashCode(r)
            {
                return this._reference.hashCode();
            }
        
            ice_getCommunicator()
            {
                return this._reference.getCommunicator();
            }
        
            toString()
            {
                return this._reference.toString();
            }
        
            ice_getIdentity()
            {
                return this._reference.getIdentity().clone();
            }
        
            ice_identity(newIdentity)
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
                    const proxy = new ObjectPrx();
                    proxy._setup(this._reference.changeIdentity(newIdentity));
                    return proxy;
                }
            }
        
            ice_getContext()
            {
                return new Map(this._reference.getContext());
            }
        
            ice_context(newContext)
            {
                return this._newInstance(this._reference.changeContext(newContext));
            }
        
            ice_getFacet()
            {
                return this._reference.getFacet();
            }
        
            ice_facet(newFacet)
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
                    const proxy = new ObjectPrx();
                    proxy._setup(this._reference.changeFacet(newFacet));
                    return proxy;
                }
            }
        
            ice_getAdapterId()
            {
                return this._reference.getAdapterId();
            }
        
            ice_adapterId(newAdapterId)
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
                    return this._newInstance(this._reference.changeAdapterId(newAdapterId));
                }
            }
        
            ice_getEndpoints()
            {
                return ArrayUtil.clone(this._reference.getEndpoints());
            }
        
            ice_endpoints(newEndpoints)
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
                    return this._newInstance(this._reference.changeEndpoints(newEndpoints));
                }
            }
        
            ice_getLocatorCacheTimeout()
            {
                return this._reference.getLocatorCacheTimeout();
            }
        
            ice_locatorCacheTimeout(newTimeout)
            {
                if(newTimeout < -1)
                {
                    throw new RangeError("invalid value passed to ice_locatorCacheTimeout: " + newTimeout);
                }
                if(newTimeout === this._reference.getLocatorCacheTimeout())
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeLocatorCacheTimeout(newTimeout));
                }
            }
        
            ice_getInvocationTimeout()
            {
                return this._reference.getInvocationTimeout();
            }
        
            ice_invocationTimeout(newTimeout)
            {
                if(newTimeout < 1 && newTimeout !== -1)
                {
                    throw new RangeError("invalid value passed to ice_invocationTimeout: " + newTimeout);
                }
                if(newTimeout === this._reference.getInvocationTimeout())
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeInvocationTimeout(newTimeout));
                }
            }
        
            ice_isConnectionCached()
            {
                return this._reference.getCacheConnection();
            }
        
            ice_connectionCached(newCache)
            {
                if(newCache === this._reference.getCacheConnection())
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeCacheConnection(newCache));
                }
            }
        
            ice_getEndpointSelection()
            {
                return this._reference.getEndpointSelection();
            }
        
            ice_endpointSelection(newType)
            {
                if(newType === this._reference.getEndpointSelection())
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeEndpointSelection(newType));
                }
            }
        
            ice_isSecure()
            {
                return this._reference.getSecure();
            }
        
            ice_secure(b)
            {
                if(b === this._reference.getSecure())
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeSecure(b));
                }
            }
        
            ice_getEncodingVersion()
            {
                return this._reference.getEncoding().clone();
            }
        
            ice_encodingVersion(e)
            {
                if(e.equals(this._reference.getEncoding()))
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeEncoding(e));
                }
            }
        
            ice_isPreferSecure()
            {
                return this._reference.getPreferSecure();
            }
        
            ice_preferSecure(b)
            {
                if(b === this._reference.getPreferSecure())
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changePreferSecure(b));
                }
            }
        
            ice_getRouter()
            {
                const ri = this._reference.getRouterInfo();
                return ri !== null ? ri.getRouter() : null;
            }
        
            ice_router(router)
            {
                const ref = this._reference.changeRouter(router);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this._newInstance(ref);
                }
            }
        
            ice_getLocator()
            {
                const ri = this._reference.getLocatorInfo();
                return ri !== null ? ri.getLocator() : null;
            }
        
            ice_locator(locator)
            {
                const ref = this._reference.changeLocator(locator);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this._newInstance(ref);
                }
            }
        
            ice_isTwoway()
            {
                return this._reference.getMode() === RefMode.ModeTwoway;
            }
        
            ice_twoway()
            {
                if(this._reference.getMode() === RefMode.ModeTwoway)
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeMode(RefMode.ModeTwoway));
                }
            }
        
            ice_isOneway()
            {
                return this._reference.getMode() === RefMode.ModeOneway;
            }
        
            ice_oneway()
            {
                if(this._reference.getMode() === RefMode.ModeOneway)
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeMode(RefMode.ModeOneway));
                }
            }
        
            ice_isBatchOneway()
            {
                return this._reference.getMode() === RefMode.ModeBatchOneway;
            }
        
            ice_batchOneway()
            {
                if(this._reference.getMode() === RefMode.ModeBatchOneway)
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeMode(RefMode.ModeBatchOneway));
                }
            }
        
            ice_isDatagram()
            {
                return this._reference.getMode() === RefMode.ModeDatagram;
            }
        
            ice_datagram()
            {
                if(this._reference.getMode() === RefMode.ModeDatagram)
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeMode(RefMode.ModeDatagram));
                }
            }
        
            ice_isBatchDatagram()
            {
                return this._reference.getMode() === RefMode.ModeBatchDatagram;
            }
        
            ice_batchDatagram()
            {
                if(this._reference.getMode() === RefMode.ModeBatchDatagram)
                {
                    return this;
                }
                else
                {
                    return this._newInstance(this._reference.changeMode(RefMode.ModeBatchDatagram));
                }
            }
        
            ice_timeout(t)
            {
                if(t < 1 && t !== -1)
                {
                    throw new RangeError("invalid value passed to ice_timeout: " + t);
                }
                const ref = this._reference.changeTimeout(t);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this._newInstance(ref);
                }
            }
        
            ice_getTimeout()
            {
                return this._reference.getTimeout();
            }
        
            ice_fixed(connection)
            {
                if(connection === null)
                {
                    throw new RangeError("invalid null connection passed to ice_fixed");
                }
                if(!(connection instanceof Ice.ConnectionI))
                {
                    throw new RangeError("invalid connection passed to ice_fixed");
                }
                const ref = this._reference.changeConnection(connection);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this._newInstance(ref);
                }
            }
        
            ice_isFixed()
            {
                return this._reference instanceof Ice.FixedReference;
            }
        
            ice_getConnectionId()
            {
                return this._reference.getConnectionId();
            }
        
            ice_connectionId(id)
            {
                const ref = this._reference.changeConnectionId(id);
                if(ref.equals(this._reference))
                {
                    return this;
                }
                else
                {
                    return this._newInstance(ref);
                }
            }
        
            ice_getConnection()
            {
                const r = new ProxyGetConnection(this, "ice_getConnection");
                try
                {
                    r.invoke();
                }
                catch(ex)
                {
                    r.abort(ex);
                }
                return r;
            }
        
            ice_getCachedConnection()
            {
                return this._requestHandler ? this._requestHandler.getConnection() : null;
            }
        
            ice_flushBatchRequests()
            {
                const r = new ProxyFlushBatch(this, "ice_flushBatchRequests");
                try
                {
                    r.invoke();
                }
                catch(ex)
                {
                    r.abort(ex);
                }
                return r;
            }
        
            equals(r)
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
            }
        
            _write(os)
            {
                this._reference.getIdentity()._write(os);
                this._reference.streamWrite(os);
            }
        
            _getReference()
            {
                return this._reference;
            }
        
            _copyFrom(from)
            {
                Debug.assert(this._reference === null);
                Debug.assert(this._requestHandler === null);
        
                this._reference = from._reference;
                this._requestHandler = from._requestHandler;
            }
        
            _handleException(ex, handler, mode, sent, sleep, cnt)
            {
                this._updateRequestHandler(handler, null); // Clear the request handler
        
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
            }
        
            _checkAsyncTwowayOnly(name)
            {
                if(!this.ice_isTwoway())
                {
                    throw new Ice.TwowayOnlyException(name);
                }
            }
        
            _getRequestHandler()
            {
                if(this._reference.getCacheConnection())
                {
                    if(this._requestHandler)
                    {
                        return this._requestHandler;
                    }
                }
                return this._reference.getRequestHandler(this);
            }
        
            _getBatchRequestQueue()
            {
                if(!this._batchRequestQueue)
                {
                    this._batchRequestQueue = this._reference.getBatchRequestQueue();
                }
                return this._batchRequestQueue;
            }
        
            _setRequestHandler(handler)
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
            }
        
            _updateRequestHandler(previous, handler)
            {
                if(this._reference.getCacheConnection() && previous !== null)
                {
                    if(this._requestHandler && this._requestHandler !== handler)
                    {
                        this._requestHandler = this._requestHandler.update(previous, handler);
                    }
                }
            }
        
            //
            // Only for use by IceInternal.ProxyFactory
            //
            _setup(ref)
            {
                Debug.assert(this._reference === null);
        
                this._reference = ref;
            }
        
            _newInstance(ref)
            {
                const proxy = new this.constructor();
                proxy._setup(ref);
                return proxy;
            }
        
            ice_instanceof(T)
            {
                if(T)
                {
                    if(this instanceof T)
                    {
                        return true;
                    }
                    return this.constructor._instanceof(T);
                }
                return false;
            }
        
            //
            // Generic invocation for operations that have input parameters.
            //
            static _invoke(p, name, mode, fmt, ctx, marshalFn, unmarshalFn, userEx, args)
            {
                if(unmarshalFn !== null || userEx.length > 0)
                {
                    p._checkAsyncTwowayOnly(name);
                }
        
                const r = new OutgoingAsync(p, name,
                    res =>
                    {
                        this._completed(res, unmarshalFn, userEx);
                    });
        
                try
                {
                    r.prepare(name, mode, ctx);
                    if(marshalFn === null)
                    {
                        r.writeEmptyParams();
                    }
                    else
                    {
                        const ostr = r.startWriteParams(fmt);
                        marshalFn(ostr, args);
                        r.endWriteParams();
                    }
                    r.invoke();
                }
                catch(ex)
                {
                    r.abort(ex);
                }
                return r;
            }
        
            //
            // Handles the completion of an invocation.
            //
            static _completed(r, unmarshalFn, userEx)
            {
                if(!this._check(r, userEx))
                {
                    return;
                }
        
                try
                {
                    if(unmarshalFn === null)
                    {
                        r.readEmptyParams();
                        r.resolve();
                    }
                    else
                    {
                        r.resolve(unmarshalFn(r));
                    }
                }
                catch(ex)
                {
                    this.dispatchLocalException(r, ex);
                }
            }
        
            //
            // Handles user exceptions.
            //
            static _check(r, uex)
            {
                //
                // If uex is non-null, it must be an array of exception types.
                //
                try
                {
                    r.throwUserException();
                }
                catch(ex)
                {
                    if(ex instanceof Ice.UserException)
                    {
                        if(uex !== null)
                        {
                            for(let i = 0; i < uex.length; ++i)
                            {
                                if(ex instanceof uex[i])
                                {
                                    r.reject(ex);
                                    return false;
                                }
                            }
                        }
                        r.reject(new Ice.UnknownUserException(ex.ice_id()));
                        return false;
                    }
                    else
                    {
                        r.reject(ex);
                        return false;
                    }
                }
        
                return true;
            }
        
            static dispatchLocalException(r, ex)
            {
                r.reject(ex);
            }
        
            static checkedCast(prx, facet, ctx)
            {
                let r = null;
        
                if(prx === undefined || prx === null)
                {
                    r = new AsyncResultBase(null, "checkedCast", null, null, null);
                    r.resolve(null);
                }
                else
                {
                    if(facet !== undefined)
                    {
                        prx = prx.ice_facet(facet);
                    }
        
                    r = new AsyncResultBase(prx.ice_getCommunicator(), "checkedCast", null, prx, null);
                    prx.ice_isA(this.ice_staticId(), ctx).then(
                        ret =>
                        {
                            if(ret)
                            {
                                const h = new this();
                                h._copyFrom(prx);
                                r.resolve(h);
                            }
                            else
                            {
                                r.resolve(null);
                            }
                        }).catch(
                            ex =>
                            {
                                if(ex instanceof Ice.FacetNotExistException)
                                {
                                    r.resolve(null);
                                }
                                else
                                {
                                    r.reject(ex);
                                }
                            });
                }
        
                return r;
            }
        
            static uncheckedCast(prx, facet)
            {
                let r = null;
                if(prx !== undefined && prx !== null)
                {
                    r = new this();
                    if(facet !== undefined)
                    {
                        prx = prx.ice_facet(facet);
                    }
                    r._copyFrom(prx);
                }
                return r;
            }
        
            static get minWireSize()
            {
                return 2;
            }
        
            static write(os, v)
            {
                os.writeProxy(v);
            }
        
            static read(is)
            {
                return is.readProxy(this);
            }
        
            static writeOptional(os, tag, v)
            {
                os.writeOptionalProxy(tag, v);
            }
        
            static readOptional(is, tag)
            {
                return is.readOptionalProxy(tag, this);
            }
        
            static _instanceof(T)
            {
                if(T === this)
                {
                    return true;
                }
        
                for(const i in this._implements)
                {
                    if(this._implements[i]._instanceof(T))
                    {
                        return true;
                    }
                }
        
                return false;
            }
        
            static ice_staticId()
            {
                return this._id;
            }
        
            static get _implements()
            {
                return [];
            }
        }
        
        Ice.ObjectPrx = ObjectPrx;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const AsyncStatus = Ice.AsyncStatus;
        const ConnectionRequestHandler = Ice.ConnectionRequestHandler;
        const Debug = Ice.Debug;
        const RetryException = Ice.RetryException;
        const ReferenceMode = Ice.ReferenceMode;
        const LocalException = Ice.LocalException;
        
        class ConnectRequestHandler
        {
            constructor(ref, proxy)
            {
                this._reference = ref;
                this._response = ref.getMode() === ReferenceMode.ModeTwoway;
                this._proxy = proxy;
                this._proxies = [];
                this._initialized = false;
        
                this._connection = null;
                this._exception = null;
                this._requests = [];
            }
        
            connect(proxy)
            {
                if(!this.initialized())
                {
                    this._proxies.push(proxy);
                }
                return this._requestHandler ? this._requestHandler : this;
            }
        
            update(previousHandler, newHandler)
            {
                return previousHandler === this ? newHandler : this;
            }
        
            sendAsyncRequest(out)
            {
                if(!this._initialized)
                {
                    out.cancelable(this); // This will throw if the request is canceled
                }
        
                if(!this.initialized())
                {
                    this._requests.push(out);
                    return AsyncStatus.Queued;
                }
                return out.invokeRemote(this._connection, this._response);
            }
        
            asyncRequestCanceled(out, ex)
            {
                if(this._exception !== null)
                {
                    return; // The request has been notified of a failure already.
                }
        
                if(!this.initialized())
                {
                    for(let i = 0; i < this._requests.length; i++)
                    {
                        if(this._requests[i] === out)
                        {
                            out.completedEx(ex);
                            this._requests.splice(i, 1);
                            return;
                        }
                    }
                    Debug.assert(false); // The request has to be queued if it timed out and we're not initialized yet.
                }
                this._connection.asyncRequestCanceled(out, ex);
            }
        
            getReference()
            {
                return this._reference;
            }
        
            getConnection()
            {
                if(this._exception !== null)
                {
                    throw this._exception;
                }
                else
                {
                    return this._connection;
                }
            }
        
            //
            // Implementation of Reference_GetConnectionCallback
            //
            setConnection(connection)
            {
                Debug.assert(this._exception === null && this._connection === null);
        
                this._connection = connection;
        
                //
                // If this proxy is for a non-local object, and we are using a router, then
                // add this proxy to the router info object.
                //
                const ri = this._reference.getRouterInfo();
                if(ri !== null)
                {
                    ri.addProxy(this._proxy).then(
                        //
                        // The proxy was added to the router
                        // info, we're now ready to send the
                        // queued requests.
                        //
                        () => this.flushRequests(),
                        ex => this.setException(ex));
                    return; // The request handler will be initialized once addProxy completes.
                }
        
                //
                // We can now send the queued requests.
                //
                this.flushRequests();
            }
        
            setException(ex)
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
        
                this._requests.forEach(request =>
                    {
                        if(request !== null)
                        {
                            request.completedEx(this._exception);
                        }
                    });
                this._requests.length = 0;
            }
        
            initialized()
            {
                if(this._initialized)
                {
                    Debug.assert(this._connection !== null);
                    return true;
                }
                else if(this._exception !== null)
                {
                    if(this._connection !== null)
                    {
                        //
                        // Only throw if the connection didn't get established. If
                        // it died after being established, we allow the caller to
                        // retry the connection establishment by not throwing here
                        // (the connection will throw RetryException).
                        //
                        return true;
                    }
                    throw this._exception;
                }
                else
                {
                    return this._initialized;
                }
            }
        
            flushRequests()
            {
                Debug.assert(this._connection !== null && !this._initialized);
        
                let exception = null;
                this._requests.forEach(request =>
                    {
                        try
                        {
                            request.invokeRemote(this._connection, this._response);
                        }
                        catch(ex)
                        {
                            if(ex instanceof RetryException)
                            {
                                exception = ex.inner;
        
                                // Remove the request handler before retrying.
                                this._reference.getInstance().requestHandlerFactory().removeRequestHandler(this._reference, this);
                                request.retryException(ex.inner);
                            }
                            else
                            {
                                Debug.assert(ex instanceof LocalException);
                                exception = ex;
                                request.out.completedEx(ex);
                            }
                        }
                    });
                this._requests.length = 0;
        
                if(this._reference.getCacheConnection() && exception === null)
                {
                    this._requestHandler = new ConnectionRequestHandler(this._reference, this._connection);
                    this._proxies.forEach(proxy => proxy._updateRequestHandler(this, this._requestHandler));
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
        }
        
        Ice.ConnectRequestHandler = ConnectRequestHandler;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Endpoint.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
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
        
        Object.defineProperty(Ice, 'BTEndpointType', {
            value: 6
        });
        
        Object.defineProperty(Ice, 'BTSEndpointType', {
            value: 7
        });
        
        Object.defineProperty(Ice, 'iAPEndpointType', {
            value: 8
        });
        
        Object.defineProperty(Ice, 'iAPSEndpointType', {
            value: 9
        });
        
        /**
         * Base class providing access to the endpoint details.
         *
         **/
        Ice.EndpointInfo = class
        {
            constructor(underlying = null, timeout = 0, compress = false)
            {
                this.underlying = underlying;
                this.timeout = timeout;
                this.compress = compress;
            }
        };
        
        
        /**
         * Provides access to the address details of a IP endpoint.
         *
         * @see Endpoint
         *
         **/
        Ice.IPEndpointInfo = class extends Ice.EndpointInfo
        {
            constructor(underlying, timeout, compress, host = "", port = 0, sourceAddress = "")
            {
                super(underlying, timeout, compress);
                this.host = host;
                this.port = port;
                this.sourceAddress = sourceAddress;
            }
        };
        
        
        /**
         * Provides access to a TCP endpoint information.
         *
         * @see Endpoint
         *
         **/
        Ice.TCPEndpointInfo = class extends Ice.IPEndpointInfo
        {
            constructor(underlying, timeout, compress, host, port, sourceAddress)
            {
                super(underlying, timeout, compress, host, port, sourceAddress);
            }
        };
        
        
        /**
         * Provides access to an UDP endpoint information.
         *
         * @see Endpoint
         *
         **/
        Ice.UDPEndpointInfo = class extends Ice.IPEndpointInfo
        {
            constructor(underlying, timeout, compress, host, port, sourceAddress, mcastInterface = "", mcastTtl = 0)
            {
                super(underlying, timeout, compress, host, port, sourceAddress);
                this.mcastInterface = mcastInterface;
                this.mcastTtl = mcastTtl;
            }
        };
        
        
        /**
         * Provides access to a WebSocket endpoint information.
         *
         **/
        Ice.WSEndpointInfo = class extends Ice.EndpointInfo
        {
            constructor(underlying, timeout, compress, resource = "")
            {
                super(underlying, timeout, compress);
                this.resource = resource;
            }
        };
        
        
        /**
         * Provides access to the details of an opaque endpoint.
         *
         * @see Endpoint
         *
         **/
        Ice.OpaqueEndpointInfo = class extends Ice.EndpointInfo
        {
            constructor(underlying, timeout, compress, rawEncoding = new Ice.EncodingVersion(), rawBytes = null)
            {
                super(underlying, timeout, compress);
                this.rawEncoding = rawEncoding;
                this.rawBytes = rawBytes;
            }
        };
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const _ModuleRegistry = Ice._ModuleRegistry;
        
        
        const builtinHelpers =
        [
            Ice.ByteHelper,
            Ice.BoolHelper,
            Ice.ShortHelper,
            Ice.IntHelper,
            Ice.LongHelper,
            Ice.FloatHelper,
            Ice.DoubleHelper,
            Ice.StringHelper,
            Ice.Value,
            Ice.ObjectPrx,
            Ice.Value
        ];
        
        function parseParam(p)
        {
            let type = p[0];
            const t = typeof type;
            if(t === 'number')
            {
                type = builtinHelpers[p[0]];
            }
            else if(t === 'string')
            {
                type = _ModuleRegistry.type(type);
            }
        
            return {
                type: type,
                isObject: (p[1] === true),
                tag: p[2] // Optional tag, which may not be present - an undefined tag means "not optional".
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
        //  3: format (undefined == Default or int)
        //  4: return type (undefined if void, or [type, tag])
        //  5: in params (undefined if none, or array of [type, tag])
        //  6: out params (undefined if none, or array of [type, tag])
        //  7: exceptions (undefined if none, or array of types)
        //  8: sends classes (true or undefined)
        //  9: returns classes (true or undefined)
        //
        function parseOperation(name, arr)
        {
            const r = {};
        
            r.name = name;
            r.servantMethod = arr[0] ? arr[0] : name;
            r.mode = arr[1] ? Ice.OperationMode.valueOf(arr[1]) : Ice.OperationMode.Normal;
            r.sendMode = arr[2] ? Ice.OperationMode.valueOf(arr[2]) : Ice.OperationMode.Normal;
            r.format = arr[3] ? Ice.FormatType.valueOf(arr[3]) : Ice.FormatType.DefaultFormat;
        
            let ret;
            if(arr[4])
            {
                ret = parseParam(arr[4]);
                ret.pos = 0;
            }
            r.returns = ret;
        
            const inParams = [];
            const inParamsOpt = [];
            if(arr[5])
            {
                for(let i = 0; i < arr[5].length; ++i)
                {
                    const p = parseParam(arr[5][i]);
                    p.pos = i;
                    inParams.push(p);
                    if(p.tag)
                    {
                        inParamsOpt.push(p);
                    }
                }
            }
            inParamsOpt.sort((p1, p2) => p1.tag - p2.tag); // Sort by tag.
            r.inParams = inParams;
            r.inParamsOpt = inParamsOpt;
        
            const outParams = [];
            const outParamsOpt = [];
            if(arr[6])
            {
                const offs = ret ? 1 : 0;
                for(let i = 0; i < arr[6].length; ++i)
                {
                    const p = parseParam(arr[6][i]);
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
            outParamsOpt.sort((p1, p2) => p1.tag - p2.tag); // Sort by tag.
            r.outParams = outParams;
            r.outParamsOpt = outParamsOpt;
        
            const exceptions = [];
            if(arr[7])
            {
                for(let i = 0; i < arr[7].length; ++i)
                {
                    exceptions.push(arr[7][i]);
                }
            }
            r.exceptions = exceptions;
        
            r.sendsClasses = arr[8] === true;
            r.returnsClasses = arr[9] === true;
        
            return r;
        }
        
        class OpTable
        {
            constructor(ops)
            {
                this.raw = ops;
                this.parsed = {};
            }
        
            find(name)
            {
                //
                // Check if we've already parsed the operation.
                //
                let op = this.parsed[name];
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
        }
        
        function unmarshalParams(is, retvalInfo, allParamInfo, optParamInfo, usesClasses, params, offset)
        {
            const readParam = (p, optional) =>
            {
                if(optional)
                {
                    if(p.isObject)
                    {
                        is.readOptionalValue(p.tag,
                                             obj =>
                                             {
                                                 params[p.pos + offset] = obj;
                                             },
                                             p.type);
                    }
                    else
                    {
                        params[p.pos + offset] = p.type.readOptional(is, p.tag);
                    }
                }
                else if(p.isObject)
                {
                    is.readValue(obj =>
                                 {
                                     params[p.pos + offset] = obj;
                                 },
                                 p.type);
                }
                else
                {
                    params[p.pos + offset] = p.type.read(is);
                }
            };
        
            //
            // First read all required params.
            //
            for(let i = 0; i < allParamInfo.length; ++i)
            {
                if(!allParamInfo[i].tag)
                {
                    readParam(allParamInfo[i], false);
                }
            }
        
            //
            // Then read a required return value (if any).
            //
            if(retvalInfo)
            {
                readParam(retvalInfo, false);
            }
        
            //
            // Then read all optional params.
            //
            for(let i = 0; i < optParamInfo.length; ++i)
            {
                readParam(optParamInfo[i], true);
            }
        
            if(usesClasses)
            {
                is.readPendingValues();
            }
        }
        
        function marshalParams(os, params, retvalInfo, paramInfo, optParamInfo, usesClasses)
        {
            //
            // Write the required params.
            //
            for(let i = 0; i < paramInfo.length; ++i)
            {
                const p = paramInfo[i];
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
            for(let i = 0; i < optParamInfo.length; ++i)
            {
                const p = optParamInfo[i];
                p.type.writeOptional(os, p.tag, params[p.pos]);
            }
        
            if(usesClasses)
            {
                os.writePendingValues();
            }
        }
        
        function dispatchImpl(servant, op, incomingAsync, current)
        {
            //
            // Check to make sure the servant implements the operation.
            //
            const method = servant[op.servantMethod];
            if(method === undefined || typeof method !== "function")
            {
                throw new Ice.UnknownException("servant for identity " + current.adapter.getCommunicator().identityToString(current.id) +
                                               " does not define operation `" + op.servantMethod + "'");
            }
        
            //
            // Unmarshal the in params (if any).
            //
            const params = [];
            if(op.inParams.length === 0)
            {
                incomingAsync.readEmptyParams();
            }
            else
            {
                const is = incomingAsync.startReadParams();
                unmarshalParams(is, undefined, op.inParams, op.inParamsOpt, op.sendsClasses, params, 0);
                incomingAsync.endReadParams();
            }
        
            params.push(current);
        
            incomingAsync.setFormat(op.format);
        
            const marshalFn = function(params)
            {
                const numExpectedResults = op.outParams.length + (op.returns ? 1 : 0);
                if(numExpectedResults > 1 && !(params instanceof Array))
                {
                    throw new Ice.MarshalException("operation `" + op.servantMethod + "' should return an array");
                }
                else if(numExpectedResults === 1)
                {
                    params = [params]; // Wrap a single out parameter in an array.
                }
        
                if(op.returns === undefined && op.outParams.length === 0)
                {
                    if(params && params.length > 0)
                    {
                        throw new Ice.MarshalException("operation `" + op.servantMethod + "' shouldn't return any value");
                    }
                    else
                    {
                        incomingAsync.writeEmptyParams();
                    }
                }
                else
                {
                    let retvalInfo;
                    if(op.returns && !op.returns.tag)
                    {
                        retvalInfo = op.returns;
                    }
        
                    const os = incomingAsync.startWriteParams();
                    marshalParams(os, params, retvalInfo, op.outParams, op.outParamsOpt, op.returnsClasses);
                    incomingAsync.endWriteParams();
                }
            };
        
            const results = method.apply(servant, params);
            if(results instanceof Promise)
            {
                return results.then(marshalFn);
            }
            else
            {
                marshalFn(results);
                return null;
            }
        }
        
        function getServantMethodFromInterfaces(interfaces, methodName, all)
        {
            let method;
            for(let i = 0; method === undefined && i < interfaces.length; ++i)
            {
                const intf = interfaces[i];
                method = intf[methodName];
                if(method === undefined)
                {
                    if(all.indexOf(intf) === -1)
                    {
                        all.push(intf);
                    }
                    if(intf._iceImplements)
                    {
                        method = getServantMethodFromInterfaces(intf._iceImplements, methodName, all);
                    }
                }
            }
            return method;
        }
        
        const dispatchPrefix = "_iceD_";
        
        function getServantMethod(servantType, name)
        {
            //
            // The dispatch method is named _iceD_<Slice name> and is stored in the type (not the prototype).
            //
            const methodName = dispatchPrefix + name;
        
            //
            // First check the servant type.
            //
            let method = servantType[methodName];
        
            let allInterfaces;
        
            if(method === undefined)
            {
                allInterfaces = [];
        
                //
                // Now check the prototypes of the implemented interfaces.
                //
                let curr = servantType;
                while(curr && method === undefined)
                {
                    if(curr._iceImplements)
                    {
                        method = getServantMethodFromInterfaces(curr._iceImplements, methodName, allInterfaces);
                    }
                    curr = Object.getPrototypeOf(curr);
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
                let op;
                if(servantType._iceOps)
                {
                    op = servantType._iceOps.find(name);
                }
        
                let source;
                if(op === undefined)
                {
                    //
                    // Now check the op tables of the base types.
                    //
                    let parent = Object.getPrototypeOf(servantType);
                    while(op === undefined && parent)
                    {
                        if(parent._iceOps)
                        {
                            if((op = parent._iceOps.find(name)) !== undefined)
                            {
                                source = parent;
                            }
                        }
                        parent = Object.getPrototypeOf(parent);
                    }
        
                    //
                    // Now check the op tables of all base interfaces.
                    //
                    for(let i = 0; op === undefined && i < allInterfaces.length; ++i)
                    {
                        const intf = allInterfaces[i];
                        if(intf._iceOps)
                        {
                            if((op = intf._iceOps.find(name)) !== undefined)
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
                        return dispatchImpl(servant, op, incomingAsync, current);
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
            const method = data[0] ? data[0] : name;
        
            let op = null;
        
            proxyType.prototype[method] = function(...args)
            {
                //
                // Parse the operation data on the first invocation of a proxy method.
                //
                if(op === null)
                {
                    op = parseOperation(name, data);
                }
        
                const ctx = args[op.inParams.length]; // The request context is the last argument (if present).
        
                let marshalFn = null;
                if(op.inParams.length > 0)
                {
                    marshalFn = function(os, params)
                    {
                        //
                        // Validate the parameters.
                        //
                        for(let i = 0; i < op.inParams.length; ++i)
                        {
                            const p = op.inParams[i];
                            const v = params[p.pos];
                            if(!p.tag || v !== undefined)
                            {
                                if(typeof p.type.validate === "function")
                                {
                                    if(!p.type.validate(v))
                                    {
                                        throw new Ice.MarshalException("invalid value for argument " + (i + 1) +
                                                                       " in operation `" + op.servantMethod + "'");
                                    }
                                }
                            }
                        }
        
                        marshalParams(os, params, undefined, op.inParams, op.inParamsOpt, op.sendsClasses);
                    };
                }
        
                let unmarshalFn = null;
                if(op.returns || op.outParams.length > 0)
                {
                    unmarshalFn = function(asyncResult)
                    {
                        //
                        // The results array holds the out parameters in the following format:
                        //
                        // [retval, out1, out2, ..., asyncResult]
                        //
                        const results = [];
        
                        const is = asyncResult.startReadParams();
                        let retvalInfo;
                        if(op.returns && !op.returns.tag)
                        {
                            retvalInfo = op.returns;
                        }
                        unmarshalParams(is, retvalInfo, op.outParams, op.outParamsOpt, op.returnsClasses, results, 0);
                        asyncResult.endReadParams();
                        return results.length == 1 ? results[0] : results;
                    };
                }
                return Ice.ObjectPrx._invoke(this, op.name, op.sendMode, op.format, ctx, marshalFn, unmarshalFn,
                                             op.exceptions, Array.prototype.slice.call(args));
            };
        }
        
        const Slice = Ice.Slice;
        Slice.defineOperations = function(classType, proxyType, ids, pos, ops)
        {
            if(ops)
            {
                classType._iceOps = new OpTable(ops);
            }
        
            classType.prototype._iceDispatch = function(incomingAsync, current)
            {
                //
                // Retrieve the dispatch method for this operation.
                //
                const method = getServantMethod(classType, current.operation);
        
                if(method === undefined || typeof method !== 'function')
                {
                    throw new Ice.OperationNotExistException(current.id, current.facet, current.operation);
                }
        
                return method.call(method, this, incomingAsync, current);
            };
        
            classType.prototype._iceMostDerivedType = function()
            {
                return classType;
            };
        
            Object.defineProperty(classType, "_iceIds", {
                get: () => ids
            });
        
            Object.defineProperty(classType, "_iceId", {
                get: () => ids[pos]
            });
        
            classType.ice_staticId = function()
            {
                return classType._iceId;
            };
        
            if(proxyType !== undefined)
            {
                if(ops)
                {
                    for(const name in ops)
                    {
                        addProxyOperation(proxyType, name, ops[name]);
                    }
                }
        
                //
                // Copy proxy methods from super-interfaces.
                //
                if(proxyType._implements)
                {
                    for(const intf in proxyType._implements)
                    {
                        const proto = proxyType._implements[intf].prototype;
                        for(const f in proto)
                        {
                            if(typeof proto[f] == "function" && proxyType.prototype[f] === undefined)
                            {
                                proxyType.prototype[f] = proto[f];
                            }
                        }
                    }
                }
        
                Object.defineProperty(proxyType, "_id", {
                    get: () => ids[pos]
                });
            }
        };
        
        //
        // Define the "built-in" operations for all Ice objects.
        //
        Slice.defineOperations(Ice.Object, Ice.ObjectPrx, ["::Ice::Object"], 0,
        {
            ice_ping: [undefined, 1, 1, undefined, undefined, undefined, undefined, undefined],
            ice_isA: [undefined, 1, 1, undefined, [1], [[7]], undefined, undefined],
            ice_id: [undefined, 1, 1, undefined, [7], undefined, undefined, undefined],
            ice_ids: [undefined, 1, 1, undefined, ["Ice.StringSeqHelper"], undefined, undefined, undefined]
        });
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        class RetryTask
        {
            constructor(instance, queue, outAsync, interval)
            {
                this._instance = instance;
                this._queue = queue;
                this._outAsync = outAsync;
            }
        
            run()
            {
                this._outAsync.retry();
                this._queue.remove(this);
            }
        
            destroy()
            {
                try
                {
                    this._outAsync.abort(new Ice.CommunicatorDestroyedException());
                }
                catch(ex)
                {
                    // Abort shouldn't throw if there's no callback, ignore.
                }
            }
        
            asyncRequestCanceled(outAsync, ex)
            {
                if(this._queue.cancel(this))
                {
                    if(this._instance.traceLevels().retry >= 1)
                    {
                        this._instance.initializationData().logger.trace(this._instance.traceLevels().retryCat,
                                                                         "operation retry canceled\n" + ex.toString());
                    }
                    this._outAsync.completedEx(ex);
                }
            }
        }
        
        class RetryQueue
        {
            constructor(instance)
            {
                this._instance = instance;
                this._requests = [];
            }
        
            add(outAsync, interval)
            {
                if(this._instance === null)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
                const task = new RetryTask(this._instance, this, outAsync);
                outAsync.cancelable(task); // This will throw if the request is canceled
                task.token = this._instance.timer().schedule(() => task.run(), interval);
                this._requests.push(task);
            }
        
            destroy()
            {
                this._requests.forEach(request =>
                    {
                        this._instance.timer().cancel(request.token);
                        request.destroy();
                    });
        
                this._requests = [];
                this._instance = null;
            }
        
            remove(task)
            {
                const idx = this._requests.indexOf(task);
                if(idx >= 0)
                {
                    this._requests.splice(idx, 1);
                }
            }
        
            cancel(task)
            {
                const idx = this._requests.indexOf(task);
                if(idx >= 0)
                {
                    this._requests.splice(idx, 1);
                    return this._instance.timer().cancel(task.token);
                }
                return false;
            }
        }
        Ice.RetryQueue = RetryQueue;
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Debug = Ice.Debug;
        const HashMap = Ice.HashMap;
        
        class RouterInfo
        {
            constructor(router)
            {
                this._router = router;
        
                Debug.assert(this._router !== null);
        
                this._clientEndpoints = null;
                this._adapter = null;
                this._identities = new HashMap(HashMap.compareEquals); // Set<Identity> = Map<Identity, 1>
                this._evictedIdentities = [];
                this._hasRoutingTable = false;
            }
        
            destroy()
            {
                this._clientEndpoints = [];
                this._adapter = null;
                this._identities.clear();
            }
        
            equals(rhs)
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
            }
        
            hashCode()
            {
                return this._router.hashCode();
            }
        
            getRouter()
            {
                //
                // No mutex lock necessary, _router is immutable.
                //
                return this._router;
            }
        
            getClientEndpoints()
            {
                const promise = new Ice.Promise();
                if(this._clientEndpoints !== null)
                {
                    promise.resolve(this._clientEndpoints);
                }
                else
                {
                    this._router.getClientProxy().then(result =>
                                   this.setClientEndpoints(result[0],
                                                           result[1] !== undefined ? result[1] : true,
                                                           promise)).catch(promise.reject);
                }
                return promise;
            }
        
            getServerEndpoints()
            {
                return this._router.getServerProxy().then(serverProxy => {
                    if(serverProxy === null)
                    {
                        throw new Ice.NoEndpointException();
                    }
                    serverProxy = serverProxy.ice_router(null); // The server proxy cannot be routed.
                    return serverProxy._getReference().getEndpoints();
                });
            }
        
            addProxy(proxy)
            {
                Debug.assert(proxy !== null);
                if(!this._hasRoutingTable)
                {
                    return Ice.Promise.resolve(); // The router implementation doesn't maintain a routing table.
                }
                else if(this._identities.has(proxy.ice_getIdentity()))
                {
                    //
                    // Only add the proxy to the router if it's not already in our local map.
                    //
                    return Ice.Promise.resolve();
                }
                else
                {
                    return this._router.addProxies([proxy]).then(
                        evictedProxies =>
                        {
                            this.addAndEvictProxies(proxy, evictedProxies);
                        });
                }
            }
        
            setAdapter(adapter)
            {
                this._adapter = adapter;
            }
        
            getAdapter()
            {
                return this._adapter;
            }
        
            clearCache(ref)
            {
                this._identities.delete(ref.getIdentity());
            }
        
            setClientEndpoints(clientProxy, hasRoutingTable, promise)
            {
                if(this._clientEndpoints === null)
                {
                    this._hasRoutingTable = hasRoutingTable;
                    if(clientProxy === null)
                    {
                        //
                        // If getClientProxy() return nil, use router endpoints.
                        //
                        this._clientEndpoints = this._router._getReference().getEndpoints();
                        promise.resolve(this._clientEndpoints);
                    }
                    else
                    {
                        clientProxy = clientProxy.ice_router(null); // The client proxy cannot be routed.
        
                        //
                        // In order to avoid creating a new connection to the
                        // router, we must use the same timeout as the already
                        // existing connection.
                        //
                        this._router.ice_getConnection().then(
                            con =>
                            {
                                this._clientEndpoints = clientProxy.ice_timeout(con.timeout())._getReference().getEndpoints();
                                promise.resolve(this._clientEndpoints);
                            }).catch(promise.reject);
                    }
                }
                else
                {
                    promise.resolve(this._clientEndpoints);
                }
            }
        
            addAndEvictProxies(proxy, evictedProxies)
            {
                //
                // Check if the proxy hasn't already been evicted by a
                // concurrent addProxies call. If it's the case, don't
                // add it to our local map.
                //
                const index = this._evictedIdentities.findIndex(e => e.equals(proxy.ice_getIdentity()));
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
                evictedProxies.forEach(proxy =>
                    {
                        this._identities.delete(proxy.ice_getIdentity());
                    });
            }
        }
        
        Ice.RouterInfo = RouterInfo;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Router.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        const iceC_Ice_Router_ids = [
            "::Ice::Object",
            "::Ice::Router"
        ];
        
        /**
         * The Ice router interface. Routers can be set either globally with
         * {@link Communicator#setDefaultRouter}, or with <code>ice_router</code> on specific
         * proxies.
         *
         **/
        Ice.Router = class extends Ice.Object
        {
        };
        
        Ice.RouterPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.Router, Ice.RouterPrx, iceC_Ice_Router_ids, 1,
        {
            "getClientProxy": [, 2, 1, , [9], , [[1, , 1]], , , ],
            "getServerProxy": [, 2, 1, , [9], , , , , ],
            "addProxies": [, 2, 2, , ["Ice.ObjectProxySeqHelper"], [["Ice.ObjectProxySeqHelper"]], , , , ]
        });
        
        const iceC_Ice_RouterFinder_ids = [
            "::Ice::Object",
            "::Ice::RouterFinder"
        ];
        
        /**
         * This inferface should be implemented by services implementing the
         * Ice::Router interface. It should be advertised through an Ice
         * object with the identity `Ice/RouterFinder'. This allows clients to
         * retrieve the router proxy with just the endpoint information of the
         * service.
         *
         **/
        Ice.RouterFinder = class extends Ice.Object
        {
        };
        
        Ice.RouterFinderPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.RouterFinder, Ice.RouterFinderPrx, iceC_Ice_RouterFinder_ids, 1,
        {
            "getRouter": [, , , , ["Ice.RouterPrx"], , , , , ]
        });
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const ArrayUtil = Ice.ArrayUtil;
        const AsyncResultBase = Ice.AsyncResultBase;
        const Debug = Ice.Debug;
        const Identity = Ice.Identity;
        const PropertyNames = Ice.PropertyNames;
        const ServantManager = Ice.ServantManager;
        const StringUtil = Ice.StringUtil;
        const Timer = Ice.Timer;
        
        const _suffixes =
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
        
        const StateUninitialized = 0; // Just constructed.
        const StateHeld = 1;
        // const StateWaitActivate = 2;
        const StateActive = 3;
        // const StateDeactivating = 4;
        const StateDeactivated = 5;
        const StateDestroyed = 6;
        
        //
        // Only for use by IceInternal.ObjectAdapterFactory
        //
        class ObjectAdapterI
        {
            constructor(instance, communicator, objectAdapterFactory, name, router, noConfig, promise)
            {
                this._instance = instance;
                this._communicator = communicator;
                this._objectAdapterFactory = objectAdapterFactory;
                this._servantManager = new ServantManager(instance, name);
                this._name = name;
                this._publishedEndpoints = [];
                this._routerInfo = null;
                this._state = StateUninitialized;
                this._noConfig = noConfig;
                this._statePromises = [];
        
                if(this._noConfig)
                {
                    this._reference = this._instance.referenceFactory().createFromString("dummy -t", "");
                    this._messageSizeMax = this._instance.messageSizeMax();
                    promise.resolve(this);
                    return;
                }
        
                const properties = this._instance.initializationData().properties;
                const unknownProps = [];
                const noProps = this.filterProperties(unknownProps);
        
                //
                // Warn about unknown object adapter properties.
                //
                if(unknownProps.length !== 0 && properties.getPropertyAsIntWithDefault("Ice.Warn.UnknownProperties", 1) > 0)
                {
                    const message = ["found unknown properties for object adapter `" + name + "':"];
                    unknownProps.forEach(unknownProp => message.push("\n    " + unknownProp));
                    this._instance.initializationData().logger.warning(message.join(""));
                }
        
                //
                // Make sure named adapter has some configuration.
                //
                if(router === null && noProps)
                {
                    throw new Ice.InitializationException(`object adapter \`${this._name}' requires configuration`);
                }
        
                //
                // Setup a reference to be used to get the default proxy options
                // when creating new proxies. By default, create twoway proxies.
                //
                const proxyOptions = properties.getPropertyWithDefault(this._name + ".ProxyOptions", "-t");
                try
                {
                    this._reference = this._instance.referenceFactory().createFromString("dummy " + proxyOptions, "");
                }
                catch(e)
                {
                    if(e instanceof Ice.ProxyParseException)
                    {
                        throw new Ice.InitializationException(
                            `invalid proxy options \`${proxyOptions}' for object adapter \`${name}'`);
                    }
                    else
                    {
                        throw e;
                    }
                }
        
                {
                    const defaultMessageSizeMax = this._instance.messageSizeMax() / 1024;
                    const num = properties.getPropertyAsIntWithDefault(this._name + ".MessageSizeMax", defaultMessageSizeMax);
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
                    let p;
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
                                Ice.identityToString(router.ice_getIdentity(), this._instance.toStringMode()));
                        }
        
                        //
                        // Associate this object adapter with the router. This way,
                        // new outgoing connections to the router's client proxy will
                        // use this object adapter for callbacks.
                        //
                        this._routerInfo.setAdapter(this);
        
                        //
                        // Also modify all existing outgoing connections to the
                        // router's client proxy to use this object adapter for
                        // callbacks.
                        //
                        p = this._instance.outgoingConnectionFactory().setRouterInfo(this._routerInfo);
                    }
                    else
                    {
                        const endpoints = properties.getProperty(this._name + ".Endpoints");
                        if(endpoints.length > 0)
                        {
                            throw new Ice.FeatureNotSupportedException("object adapter endpoints not supported");
                        }
                        p = Ice.Promise.resolve();
                    }
        
                    p.then(() => this.computePublishedEndpoints()).then(endpoints =>
                    {
                        this._publishedEndpoints = endpoints;
                        promise.resolve(this);
                    },
                    ex =>
                    {
                        this.destroy();
                        promise.reject(ex);
                    });
                }
                catch(ex)
                {
                    this.destroy();
                    throw ex;
                }
            }
        
            getName()
            {
                //
                // No mutex lock necessary, _name is immutable.
                //
                return this._noConfig ? "" : this._name;
            }
        
            getCommunicator()
            {
                return this._communicator;
            }
        
            activate()
            {
                const promise = new AsyncResultBase(this._communicator, "activate", null, null, this);
                this.setState(StateActive);
                promise.resolve();
                return promise;
            }
        
            hold()
            {
                this.checkForDeactivation();
                this.setState(StateHeld);
            }
        
            waitForHold()
            {
                const promise = new AsyncResultBase(this._communicator, "waitForHold", null, null, this);
                try
                {
                    this.checkForDeactivation();
                    this.waitState(StateHeld, promise);
                }
                catch(ex)
                {
                    promise.reject(ex);
                }
                return promise;
            }
        
            deactivate()
            {
                const promise = new AsyncResultBase(this._communicator, "deactivate", null, null, this);
                if(this._state < StateDeactivated)
                {
                    this.setState(StateDeactivated);
                    this._instance.outgoingConnectionFactory().removeAdapter(this);
                }
                promise.resolve();
                return promise;
            }
        
            waitForDeactivate()
            {
                const promise = new AsyncResultBase(this._communicator, "waitForDeactivate", null, null, this);
                this.waitState(StateDeactivated, promise);
                return promise;
            }
        
            isDeactivated()
            {
                return this._state >= StateDeactivated;
            }
        
            destroy()
            {
                // NOTE: we don't call waitForDeactivate since it's currently a no-op.
                return this.deactivate().then(() =>
                {
                    if(this._state < StateDestroyed)
                    {
                        this.setState(StateDestroyed);
                        this._servantManager.destroy();
                        this._objectAdapterFactory.removeObjectAdapter(this);
                        this._publishedEndpoints = [];
                    }
                    const promise = new AsyncResultBase(this._communicator, "destroy", null, null, this);
                    promise.resolve();
                    return promise;
                });
            }
        
            add(object, ident)
            {
                return this.addFacet(object, ident, "");
            }
        
            addFacet(object, ident, facet)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
                this.checkServant(object);
        
                //
                // Create a copy of the Identity argument, in case the caller
                // reuses it.
                //
                const id = ident.clone();
        
                this._servantManager.addServant(object, id, facet);
        
                return this.newProxy(id, facet);
            }
        
            addWithUUID(object)
            {
                return this.addFacetWithUUID(object, "");
            }
        
            addFacetWithUUID(object, facet)
            {
                return this.addFacet(object, new Identity(Ice.generateUUID(), ""), facet);
            }
        
            addDefaultServant(servant, category)
            {
                this.checkServant(servant);
                this.checkForDeactivation();
        
                this._servantManager.addDefaultServant(servant, category);
            }
        
            remove(ident)
            {
                return this.removeFacet(ident, "");
            }
        
            removeFacet(ident, facet)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
        
                return this._servantManager.removeServant(ident, facet);
            }
        
            removeAllFacets(ident)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
        
                return this._servantManager.removeAllFacets(ident);
            }
        
            removeDefaultServant(category)
            {
                this.checkForDeactivation();
        
                return this._servantManager.removeDefaultServant(category);
            }
        
            find(ident)
            {
                return this.findFacet(ident, "");
            }
        
            findFacet(ident, facet)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
                return this._servantManager.findServant(ident, facet);
            }
        
            findAllFacets(ident)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
                return this._servantManager.findAllFacets(ident);
            }
        
            findByProxy(proxy)
            {
                this.checkForDeactivation();
                const ref = proxy._getReference();
                return this.findFacet(ref.getIdentity(), ref.getFacet());
            }
        
            findDefaultServant(category)
            {
                this.checkForDeactivation();
                return this._servantManager.findDefaultServant(category);
            }
        
            addServantLocator(locator, prefix)
            {
                this.checkForDeactivation();
                this._servantManager.addServantLocator(locator, prefix);
            }
        
            removeServantLocator(prefix)
            {
                this.checkForDeactivation();
                return this._servantManager.removeServantLocator(prefix);
            }
        
            findServantLocator(prefix)
            {
                this.checkForDeactivation();
                return this._servantManager.findServantLocator(prefix);
            }
        
            createProxy(ident)
            {
                this.checkForDeactivation();
                this.checkIdentity(ident);
                return this.newProxy(ident, "");
            }
        
            createDirectProxy(ident)
            {
                return this.createProxy(ident);
            }
        
            createIndirectProxy(ident)
            {
                throw new Ice.FeatureNotSupportedException("createIndirectProxy not supported");
            }
        
            setLocator(locator)
            {
                throw new Ice.FeatureNotSupportedException("setLocator not supported");
            }
        
            getEndpoints()
            {
                return [];
            }
        
            refreshPublishedEndpoints()
            {
                this.checkForDeactivation();
                return this.computePublishedEndpoints().then(
                    endpoints =>
                        {
                            this._publishedEndpoints = endpoints;
                        });
            }
        
            getPublishedEndpoints()
            {
                return ArrayUtil.clone(this._publishedEndpoints);
            }
        
            setPublishedEndpoints(newEndpoints)
            {
                this.checkForDeactivation();
                if(this._routerInfo !== null)
                {
                    throw new Error("can't set published endpoints on object adapter associated with a router");
                }
                this._publishedEndpoints = ArrayUtil.clone(newEndpoints);
            }
        
            getServantManager()
            {
                //
                // _servantManager is immutable.
                //
                return this._servantManager;
            }
        
            setAdapterOnConnection(connection)
            {
                this.checkForDeactivation();
                connection.setAdapterAndServantManager(this, this._servantManager);
            }
        
            messageSizeMax()
            {
                return this._messageSizeMax;
            }
        
            newProxy(ident, facet)
            {
                //
                // Now we also add the endpoints of the router's server proxy, if
                // any. This way, object references created by this object adapter
                // will also point to the router's server proxy endpoints.
                //
                //
                // Create a reference and return a proxy for this reference.
                //
                return this._instance.proxyFactory().referenceToProxy(
                    this._instance.referenceFactory().create(ident, facet, this._reference, this._publishedEndpoints));
            }
        
            checkForDeactivation()
            {
                if(this._state >= StateDeactivated)
                {
                    const ex = new Ice.ObjectAdapterDeactivatedException();
                    ex.name = this.getName();
                    throw ex;
                }
            }
        
            checkIdentity(ident)
            {
                if(ident.name === undefined || ident.name === null || ident.name.length === 0)
                {
                    throw new Ice.IllegalIdentityException(ident);
                }
        
                if(ident.category === undefined || ident.category === null)
                {
                    ident.category = "";
                }
            }
        
            checkServant(servant)
            {
                if(servant === undefined || servant === null)
                {
                    throw new Ice.IllegalServantException("cannot add null servant to Object Adapter");
                }
            }
        
            computePublishedEndpoints()
            {
                let p;
                if(this._routerInfo !== null)
                {
                    p = this._routerInfo.getServerEndpoints().then(
                        endpts =>
                            {
                                //
                                // Remove duplicate endpoints, so we have a list of unique endpoints.
                                //
                                const endpoints = [];
                                endpts.forEach(endpoint =>
                                               {
                                                   if(endpoints.findIndex(value => endpoint.equals(value)) === -1)
                                                   {
                                                       endpoints.push(endpoint);
                                                   }
                                               });
                                return endpoints;
                            });
                }
                else
                {
        
                    //
                    // Parse published endpoints. If set, these are used in proxies
                    // instead of the connection factory Endpoints.
                    //
                    const endpoints = [];
                    const s = this._instance.initializationData().properties.getProperty(this._name + ".PublishedEndpoints");
                    const delim = " \t\n\r";
        
                    let end = 0;
                    let beg;
                    while(end < s.length)
                    {
                        beg = StringUtil.findFirstNotOf(s, delim, end);
                        if(beg === -1)
                        {
                            if(s != "")
                            {
                                throw new Ice.EndpointParseException("invalid empty object adapter endpoint");
                            }
                            break;
                        }
        
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
                                let quoted = false;
                                let quote = beg;
                                while(true)
                                {
                                    quote = s.indexOf("\"", quote);
                                    if(quote == -1 || end < quote)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        quote = s.indexOf("\"", ++quote);
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
        
                        const es = s.substring(beg, end);
                        const endp = this._instance.endpointFactoryManager().create(es, false);
                        if(endp === null)
                        {
                            throw new Ice.EndpointParseException("invalid object adapter endpoint `" + s + "'");
                        }
                        endpoints.push(endp);
                    }
        
                    p = Ice.Promise.resolve(endpoints);
                }
        
                return p.then(
                    endpoints =>
                        {
                            if(this._instance.traceLevels().network >= 1 && endpoints.length > 0)
                            {
                                const s = [];
                                s.push("published endpoints for object adapter `");
                                s.push(this._name);
                                s.push("':\n");
                                let first = true;
                                endpoints.forEach(endpoint =>
                                                  {
                                                      if(!first)
                                                      {
                                                          s.push(":");
                                                      }
                                                      s.push(endpoint.toString());
                                                      first = false;
                                                  });
                                this._instance.initializationData().logger.trace(this._instance.traceLevels().networkCat,
                                                                                 s.toString());
                            }
                            return endpoints;
                        });
            }
        
            filterProperties(unknownProps)
            {
                //
                // Do not create unknown properties list if Ice prefix, i.e., Ice, Glacier2, etc.
                //
                let addUnknown = true;
                const prefix = this._name + ".";
                for(let i = 0; i < PropertyNames.clPropNames.length; ++i)
                {
                    if(prefix.indexOf(PropertyNames.clPropNames[i] + ".") === 0)
                    {
                        addUnknown = false;
                        break;
                    }
                }
        
                let noProps = true;
                const props = this._instance.initializationData().properties.getPropertiesForPrefix(prefix);
                for(const key of props.keys())
                {
                    let valid = false;
                    for(let i = 0; i < _suffixes.length; ++i)
                    {
                        if(key === prefix + _suffixes[i])
                        {
                            noProps = false;
                            valid = true;
                            break;
                        }
                    }
        
                    if(!valid && addUnknown)
                    {
                        unknownProps.push(key);
                    }
                }
        
                return noProps;
            }
        
            setState(state)
            {
                if(this._state === state)
                {
                    return;
                }
                this._state = state;
        
                let promises = [];
                (state < StateDeactivated ? [state] : [StateHeld, StateDeactivated]).forEach(s =>
                {
                    if(this._statePromises[s])
                    {
                        promises = promises.concat(this._statePromises[s]);
                        delete this._statePromises[s];
                    }
                });
                if(promises.length > 0)
                {
                    Timer.setImmediate(() => promises.forEach(p => p.resolve()));
                }
            }
        
            waitState(state, promise)
            {
                if(this._state < StateDeactivated &&
                   (state === StateHeld && this._state !== StateHeld || state === StateDeactivated))
                {
                    if(this._statePromises[state])
                    {
                        this._statePromises[state].push(promise);
                    }
                    else
                    {
                        this._statePromises[state] = [promise];
                    }
                }
                else
                {
                    promise.resolve();
                }
            }
        }
        
        Ice.ObjectAdapterI = ObjectAdapterI;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Connection.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * The batch compression option when flushing queued batch requests.
         *
         **/
        Ice.CompressBatch = Slice.defineEnum([
            ['Yes', 0], ['No', 1], ['BasedOnProxy', 2]]);
        
        /**
         * Base class providing access to the connection details.
         *
         **/
        Ice.ConnectionInfo = class
        {
            constructor(underlying = null, incoming = false, adapterName = "", connectionId = "")
            {
                this.underlying = underlying;
                this.incoming = incoming;
                this.adapterName = adapterName;
                this.connectionId = connectionId;
            }
        };
        
        
        /**
         * Specifies the close semantics for Active Connection Management.
         **/
        Ice.ACMClose = Slice.defineEnum([
            ['CloseOff', 0], ['CloseOnIdle', 1], ['CloseOnInvocation', 2], ['CloseOnInvocationAndIdle', 3], ['CloseOnIdleForceful', 4]]);
        
        /**
         * Specifies the heartbeat semantics for Active Connection Management.
         **/
        Ice.ACMHeartbeat = Slice.defineEnum([
            ['HeartbeatOff', 0], ['HeartbeatOnDispatch', 1], ['HeartbeatOnIdle', 2], ['HeartbeatAlways', 3]]);
        
        /**
         * A collection of Active Connection Management configuration settings.
         **/
        Ice.ACM = class
        {
            constructor(timeout = 0, close = Ice.ACMClose.CloseOff, heartbeat = Ice.ACMHeartbeat.HeartbeatOff)
            {
                this.timeout = timeout;
                this.close = close;
                this.heartbeat = heartbeat;
            }
        };
        
        Slice.defineStruct(Ice.ACM, true, true);
        
        /**
         * Determines the behavior when manually closing a connection.
         **/
        Ice.ConnectionClose = Slice.defineEnum([
            ['Forcefully', 0], ['Gracefully', 1], ['GracefullyWithWait', 2]]);
        
        /**
         * Provides access to the connection details of an IP connection
         *
         **/
        Ice.IPConnectionInfo = class extends Ice.ConnectionInfo
        {
            constructor(underlying, incoming, adapterName, connectionId, localAddress = "", localPort = -1, remoteAddress = "", remotePort = -1)
            {
                super(underlying, incoming, adapterName, connectionId);
                this.localAddress = localAddress;
                this.localPort = localPort;
                this.remoteAddress = remoteAddress;
                this.remotePort = remotePort;
            }
        };
        
        
        /**
         * Provides access to the connection details of a TCP connection
         *
         **/
        Ice.TCPConnectionInfo = class extends Ice.IPConnectionInfo
        {
            constructor(underlying, incoming, adapterName, connectionId, localAddress, localPort, remoteAddress, remotePort, rcvSize = 0, sndSize = 0)
            {
                super(underlying, incoming, adapterName, connectionId, localAddress, localPort, remoteAddress, remotePort);
                this.rcvSize = rcvSize;
                this.sndSize = sndSize;
            }
        };
        
        
        /**
         * Provides access to the connection details of a UDP connection
         *
         **/
        Ice.UDPConnectionInfo = class extends Ice.IPConnectionInfo
        {
            constructor(underlying, incoming, adapterName, connectionId, localAddress, localPort, remoteAddress, remotePort, mcastAddress = "", mcastPort = -1, rcvSize = 0, sndSize = 0)
            {
                super(underlying, incoming, adapterName, connectionId, localAddress, localPort, remoteAddress, remotePort);
                this.mcastAddress = mcastAddress;
                this.mcastPort = mcastPort;
                this.rcvSize = rcvSize;
                this.sndSize = sndSize;
            }
        };
        
        
        Slice.defineDictionary(Ice, "HeaderDict", "HeaderDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
        
        /**
         * Provides access to the connection details of a WebSocket connection
         *
         **/
        Ice.WSConnectionInfo = class extends Ice.ConnectionInfo
        {
            constructor(underlying, incoming, adapterName, connectionId, headers = null)
            {
                super(underlying, incoming, adapterName, connectionId);
                this.headers = headers;
            }
        };
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Debug = Ice.Debug;
        
        class ACMConfig
        {
            constructor(p, l, prefix, dflt)
            {
                if(p === undefined)
                {
                    this.timeout = 60 * 1000;
                    this.heartbeat = Ice.ACMHeartbeat.HeartbeatOnDispatch;
                    this.close = Ice.ACMClose.CloseOnInvocationAndIdle;
                    return;
                }
        
                let timeoutProperty;
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
                if(this.timeout < 0)
                {
                    l.warning("invalid value for property `" + timeoutProperty + "', default value will be used instead");
                    this.timeout = dflt.timeout;
                }
        
                const hb = p.getPropertyAsIntWithDefault(prefix + ".Heartbeat", dflt.heartbeat.value);
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
        
                const cl = p.getPropertyAsIntWithDefault(prefix + ".Close", dflt.close.value);
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
        }
        
        class FactoryACMMonitor
        {
            constructor(instance, config)
            {
                this._instance = instance;
                this._config = config;
                this._reapedConnections = [];
                this._connections = [];
            }
        
            destroy()
            {
                if(this._instance === null)
                {
                    return;
                }
                this._instance = null;
            }
        
            add(connection)
            {
                if(this._config.timeout === 0)
                {
                    return;
                }
        
                this._connections.push(connection);
                if(this._connections.length == 1)
                {
                    this._timerToken = this._instance.timer().scheduleRepeated(
                        () => this.runTimerTask(), this._config.timeout / 2);
                }
            }
        
            remove(connection)
            {
                if(this._config.timeout === 0)
                {
                    return;
                }
        
                const i = this._connections.indexOf(connection);
                Debug.assert(i >= 0);
                this._connections.splice(i, 1);
                if(this._connections.length === 0)
                {
                    this._instance.timer().cancel(this._timerToken);
                }
            }
        
            reap(connection)
            {
                this._reapedConnections.push(connection);
            }
        
            acm(timeout, close, heartbeat)
            {
                Debug.assert(this._instance !== null);
        
                const config = new ACMConfig();
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
            }
        
            getACM()
            {
                return new Ice.ACM(this._config.timeout / 1000, this._config.close, this._config.heartbeat);
            }
        
            swapReapedConnections()
            {
                if(this._reapedConnections.length === 0)
                {
                    return null;
                }
                const connections = this._reapedConnections;
                this._reapedConnections = [];
                return connections;
            }
        
            runTimerTask()
            {
                if(this._instance === null)
                {
                    this._connections = null;
                    return;
                }
        
                //
                // Monitor connections outside the thread synchronization, so
                // that connections can be added or removed during monitoring.
                //
                const now = Date.now();
                this._connections.forEach(connection =>
                    {
                        try
                        {
                            connection.monitor(now, this._config);
                        }
                        catch(ex)
                        {
                            this.handleException(ex);
                        }
                    });
            }
        
            handleException(ex)
            {
                if(this._instance === null)
                {
                    return;
                }
                this._instance.initializationData().logger.error("exception in connection monitor:\n" + ex);
            }
        }
        
        class ConnectionACMMonitor
        {
            constructor(parent, timer, config)
            {
                this._parent = parent;
                this._timer = timer;
                this._config = config;
                this._connection = null;
            }
        
            add(connection)
            {
                Debug.assert(this._connection === null);
                this._connection = connection;
                if(this._config.timeout > 0)
                {
                    this._timerToken = this._timer.scheduleRepeated(() => this.runTimerTask(), this._config.timeout / 2);
                }
            }
        
            remove(connection)
            {
                Debug.assert(this._connection === connection);
                this._connection = null;
                if(this._config.timeout > 0)
                {
                    this._timer.cancel(this._timerToken);
                }
            }
        
            reap(connection)
            {
                this._parent.reap(connection);
            }
        
            acm(timeout, close, heartbeat)
            {
                return this._parent.acm(timeout, close, heartbeat);
            }
        
            getACM()
            {
                return new Ice.ACM(this._config.timeout / 1000, this._config.close, this._config.heartbeat);
            }
        
            runTimerTask()
            {
                try
                {
                    this._connection.monitor(Date.now(), this._config);
                }
                catch(ex)
                {
                    this._parent.handleException(ex);
                }
            }
        }
        
        Ice.FactoryACMMonitor = FactoryACMMonitor;
        Ice.ACMConfig = ACMConfig;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Debug = Ice.Debug;
        const HashMap = Ice.HashMap;
        
        class EndpointTableEntry
        {
            constructor(time, endpoints)
            {
                this.time = time;
                this.endpoints = endpoints;
            }
        }
        
        class ReferenceTableEntry
        {
            constructor(time, reference)
            {
                this.time = time;
                this.reference = reference;
            }
        }
        
        class LocatorTable
        {
            constructor()
            {
                this._adapterEndpointsTable = new Map(); // Map<String, EndpointTableEntry>
                this._objectTable = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, ReferenceTableEntry>
            }
        
            clear()
            {
                this._adapterEndpointsTable.clear();
                this._objectTable.clear();
            }
        
            getAdapterEndpoints(adapter, ttl, cached)
            {
                if(ttl === 0) // Locator cache disabled.
                {
                    cached.value = false;
                    return null;
                }
        
                const entry = this._adapterEndpointsTable.get(adapter);
                if(entry !== undefined)
                {
                    cached.value = this.checkTTL(entry.time, ttl);
                    return entry.endpoints;
                }
                cached.value = false;
                return null;
            }
        
            addAdapterEndpoints(adapter, endpoints)
            {
                this._adapterEndpointsTable.set(adapter, new EndpointTableEntry(Date.now(), endpoints));
            }
        
            removeAdapterEndpoints(adapter)
            {
                const entry = this._adapterEndpointsTable.get(adapter);
                this._adapterEndpointsTable.delete(adapter);
                return entry !== undefined ? entry.endpoints : null;
            }
        
            getObjectReference(id, ttl, cached)
            {
                if(ttl === 0) // Locator cache disabled.
                {
                    cached.value = false;
                    return null;
                }
        
                const entry = this._objectTable.get(id);
                if(entry !== undefined)
                {
                    cached.value = this.checkTTL(entry.time, ttl);
                    return entry.reference;
                }
                cached.value = false;
                return null;
            }
        
            addObjectReference(id, ref)
            {
                this._objectTable.set(id, new ReferenceTableEntry(Date.now(), ref));
            }
        
            removeObjectReference(id)
            {
                const entry = this._objectTable.get(id);
                this._objectTable.delete(id);
                return entry !== undefined ? entry.reference : null;
            }
        
            checkTTL(time, ttl)
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
        }
        
        Ice.LocatorTable = LocatorTable;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        class Address
        {
            constructor(host, port)
            {
                this.host = host;
                this.port = port;
            }
        }
        
        Ice.Address = Address;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `PropertiesAdmin.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        Slice.defineDictionary(Ice, "PropertyDict", "PropertyDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
        
        const iceC_Ice_PropertiesAdmin_ids = [
            "::Ice::Object",
            "::Ice::PropertiesAdmin"
        ];
        
        /**
         * The PropertiesAdmin interface provides remote access to the properties
         * of a communicator.
         *
         **/
        Ice.PropertiesAdmin = class extends Ice.Object
        {
        };
        
        Ice.PropertiesAdminPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.PropertiesAdmin, Ice.PropertiesAdminPrx, iceC_Ice_PropertiesAdmin_ids, 1,
        {
            "getProperty": [, , , , [7], [[7]], , , , ],
            "getPropertiesForPrefix": [, , , , ["Ice.PropertyDictHelper"], [[7]], , , , ],
            "setProperties": [, , , , , [["Ice.PropertyDictHelper"]], , , , ]
        });
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Logger.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        class EndpointI
        {
            toString()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                return this.protocol() + this.options();
            }
        
            initWithOptions(args)
            {
                const unknown = [];
        
                let str = "`" + this.protocol();
                for(let i = 0; i < args.length; ++i)
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
        
                for(let i = 0; i < args.length;)
                {
                    const option = args[i++];
                    if(option.length < 2 || option.charAt(0) != '-')
                    {
                        unknown.push(option);
                        continue;
                    }
        
                    let argument = null;
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
                for(let i = 0; i < unknown.length; i++)
                {
                    args.push(unknown[i]);
                }
            }
        
            //
            // Compare endpoints for sorting purposes
            //
            equals(p)
            {
                if(!(p instanceof EndpointI))
                {
                    return false;
                }
                return this.compareTo(p) === 0;
            }
        
            checkOption()
            {
                return false;
            }
        }
        
        Ice.EndpointI = EndpointI;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        let TcpTransceiver = {};
        
        if (typeof process !== 'undefined')
        {
        
            const Debug = Ice.Debug;
            const SocketOperation = Ice.SocketOperation;
            const Timer = Ice.Timer;
        
            const StateNeedConnect = 0;
            const StateConnectPending = 1;
            const StateProxyConnectRequest = 2;
            const StateProxyConnectRequestPending = 3;
            const StateConnected = 4;
        
            //
            // TODO: WORKAROUND: We can directly use Buffer.from once we drop
            // support for Node 4.x
            //
            let createBuffer = null;
            if(Buffer.from)
            {
                createBuffer = Buffer.from;
            }
            else
            {
                /* eslint-disable no-buffer-constructor */
                createBuffer = data => new Buffer(data);
                /* eslint-enable no-buffer-constructor */
            }
        
            TcpTransceiver = class
            {
                constructor(instance)
                {
                    this._logger = instance.logger();
                    this._readBuffers = [];
                    this._readPosition = 0;
                    this._maxSendPacketSize = instance.properties().getPropertyAsIntWithDefault("Ice.TCP.SndSize", 512 * 1024);
                }
        
                setCallbacks(connectedCallback, bytesAvailableCallback, bytesWrittenCallback)
                {
                    this._connectedCallback = connectedCallback;
                    this._bytesAvailableCallback = bytesAvailableCallback;
                    this._bytesWrittenCallback = bytesWrittenCallback;
                }
        
                //
                // Returns SocketOperation.None when initialization is complete.
                //
                initialize(readBuffer, writeBuffer)
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
                            this._fd = net.createConnection(
                                {
                                    port: this._addr.port,
                                    host: this._addr.host,
                                    localAddress: this._sourceAddr
                                });
        
                            this._fd.on("connect", () => this.socketConnected());
                            this._fd.on("data", buf => this.socketBytesAvailable(buf));
        
                            //
                            // The error callback can be triggered from the socket
                            // write(). We don't want it to dispached right away
                            // from within the write() so we delay the call with
                            // setImmediate. We do the same for close as a
                            // precaution. See also issue #6226.
                            //
                            this._fd.on("close", err => Timer.setImmediate(() => this.socketClosed(err)));
                            this._fd.on("error", err => Timer.setImmediate(() => this.socketError(err)));
        
                            return SocketOperation.Connect; // Waiting for connect to complete.
                        }
                        else if(this._state === StateConnectPending)
                        {
                            //
                            // Socket is connected.
                            //
                            this._desc = fdToString(this._fd, this._proxy, this._addr);
                            this._state = StateConnected;
                        }
                        else if(this._state === StateProxyConnectRequest)
                        {
                            //
                            // Write completed.
                            //
                            this._proxy.endWriteConnectRequest(writeBuffer);
                            this._state = StateProxyConnectRequestPending; // Wait for proxy response
                            return SocketOperation.Read;
                        }
                        else if(this._state === StateProxyConnectRequestPending)
                        {
                            //
                            // Read completed.
                            //
                            this._proxy.endReadConnectRequestResponse(readBuffer);
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
                }
        
                register()
                {
                    this._registered = true;
                    this._fd.resume();
                    if(this._exception)
                    {
                        this._bytesAvailableCallback();
                    }
                }
        
                unregister()
                {
                    if(this._fd === null)
                    {
                        Debug.assert(this._exception); // Socket creation failed.
                        return;
                    }
                    this._registered = false;
                    this._fd.pause();
                }
        
                close()
                {
                    if(this._fd === null)
                    {
                        Debug.assert(this._exception); // Socket creation failed.
                        return;
                    }
        
                    try
                    {
                        this._fd.destroy();
                    }
                    catch(ex)
                    {
                        throw translateError(this._state, ex);
                    }
                    finally
                    {
                        this._fd = null;
                    }
                }
        
                //
                // Returns true if all of the data was flushed to the kernel buffer.
                //
                write(byteBuffer)
                {
                    if(this._exception)
                    {
                        throw this._exception;
                    }
        
                    let packetSize = byteBuffer.remaining;
                    Debug.assert(packetSize > 0);
        
                    if(this._maxSendPacketSize > 0 && packetSize > this._maxSendPacketSize)
                    {
                        packetSize = this._maxSendPacketSize;
                    }
        
                    while(packetSize > 0)
                    {
                        const slice = byteBuffer.b.slice(byteBuffer.position, byteBuffer.position + packetSize);
        
                        let sync = true;
                        sync = this._fd.write(createBuffer(slice), null, () =>
                            {
                                if(!sync)
                                {
                                    this._bytesWrittenCallback();
                                }
                            });
        
                        byteBuffer.position += packetSize;
                        if(!sync)
                        {
                            return false; // Wait for callback to be called before sending more data.
                        }
        
                        if(this._maxSendPacketSize > 0 && byteBuffer.remaining > this._maxSendPacketSize)
                        {
                            packetSize = this._maxSendPacketSize;
                        }
                        else
                        {
                            packetSize = byteBuffer.remaining;
                        }
                    }
                    return true;
                }
        
                read(byteBuffer, moreData)
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
        
                    let avail = this._readBuffers[0].length - this._readPosition;
                    Debug.assert(avail > 0);
        
                    while(byteBuffer.remaining > 0)
                    {
                        if(avail > byteBuffer.remaining)
                        {
                            avail = byteBuffer.remaining;
                        }
        
                        this._readBuffers[0].copy(createBuffer(byteBuffer.b), byteBuffer.position, this._readPosition,
                                                this._readPosition + avail);
        
                        byteBuffer.position += avail;
                        this._readPosition += avail;
                        if(this._readPosition === this._readBuffers[0].length)
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
                                avail = this._readBuffers[0].length;
                            }
                        }
                    }
                    moreData.value = this._readBuffers.length > 0;
        
                    return byteBuffer.remaining === 0;
                }
        
                type()
                {
                    return "tcp";
                }
        
                getInfo()
                {
                    Debug.assert(this._fd !== null);
                    const info = new Ice.TCPConnectionInfo();
                    info.localAddress = this._fd.localAddress;
                    info.localPort = this._fd.localPort;
                    info.remoteAddress = this._fd.remoteAddress;
                    info.remotePort = this._fd.remotePort;
                    info.rcvSize = -1;
                    info.sndSize = this._maxSendPacketSize;
                    return info;
                }
        
                checkSendSize(stream)
                {
                }
        
                setBufferSize(rcvSize, sndSize)
                {
                    this._maxSendPacketSize = sndSize;
                }
        
                toString()
                {
                    return this._desc;
                }
        
                socketConnected()
                {
                    Debug.assert(this._connectedCallback !== null);
                    this._connectedCallback();
                }
        
                socketBytesAvailable(buf)
                {
                    Debug.assert(this._bytesAvailableCallback !== null);
        
                    //
                    // TODO: Should we set a limit on how much data we can read?
                    // We can call _fd.pause() to temporarily stop reading.
                    //
                    if(buf.length > 0)
                    {
                        this._readBuffers.push(buf);
                        this._bytesAvailableCallback();
                    }
                }
        
                socketClosed(err)
                {
                    //
                    // Don't call the closed callback if an error occurred; the error callback
                    // will be called.
                    //
                    if(!err)
                    {
                        this.socketError(null);
                    }
                }
        
                socketError(err)
                {
                    this._exception = translateError(this._state, err);
                    if(this._state < StateConnected)
                    {
                        this._connectedCallback();
                    }
                    else if(this._registered)
                    {
                        this._bytesAvailableCallback();
                    }
                }
        
                static createOutgoing(instance, addr, sourceAddr)
                {
                    const transceiver = new TcpTransceiver(instance);
        
                    transceiver._fd = null;
                    transceiver._addr = addr;
                    transceiver._sourceAddr = sourceAddr;
                    transceiver._desc = "local address = <not connected>\nremote address = " + addr.host + ":" + addr.port;
                    transceiver._state = StateNeedConnect;
                    transceiver._registered = false;
                    transceiver._exception = null;
        
                    return transceiver;
                }
        
                static createIncoming(instance, fd)
                {
                    const transceiver = new TcpTransceiver(instance);
        
                    transceiver._fd = fd;
                    transceiver._addr = null;
                    transceiver._sourceAddr = null;
                    transceiver._desc = fdToString(fd);
                    transceiver._state = StateConnected;
                    transceiver._registered = false;
                    transceiver._exception = null;
        
                    return transceiver;
                }
            }
        
            function fdToString(fd, targetAddr)
            {
                if(fd === null)
                {
                    return "<closed>";
                }
        
                return addressesToString(fd.localAddress, fd.localPort, fd.remoteAddress, fd.remotePort, targetAddr);
            }
        
            function translateError(state, err)
            {
                if(!err)
                {
                    return new Ice.ConnectionLostException();
                }
                else if(state < StateConnected)
                {
                    if(connectionRefused(err.code))
                    {
                        return new Ice.ConnectionRefusedException(err.code, err);
                    }
                    else if(connectionFailed(err.code))
                    {
                        return new Ice.ConnectFailedException(err.code, err);
                    }
                }
                else if(connectionLost(err.code))
                {
                    return new Ice.ConnectionLostException(err.code, err);
                }
                return new Ice.SocketException(err.code, err);
            }
        
            function addressesToString(localHost, localPort, remoteHost, remotePort, targetAddr)
            {
                remoteHost = remoteHost === undefined ? null : remoteHost;
                targetAddr = targetAddr === undefined ? null : targetAddr;
        
                const s = [];
                s.push("local address = ");
                s.push(localHost + ":" + localPort);
        
                if(remoteHost === null && targetAddr !== null)
                {
                    remoteHost = targetAddr.host;
                    remotePort = targetAddr.port;
                }
        
                if(remoteHost === null)
                {
                    s.push("\nremote address = <not connected>");
                }
                else
                {
                    s.push("\nremote address = ");
                    s.push(remoteHost + ":" + remotePort);
                }
        
                return s.join("");
            }
        
            const ECONNABORTED = "ECONNABORTED";
            const ECONNREFUSED = "ECONNREFUSED";
            const ECONNRESET = "ECONNRESET";
            const EHOSTUNREACH = "EHOSTUNREACH";
            const ENETUNREACH = "ENETUNREACH";
            const ENOTCONN = "ENOTCONN";
            const EPIPE = "EPIPE";
            const ESHUTDOWN = "ESHUTDOWN";
            const ETIMEDOUT = "ETIMEDOUT";
        
            function connectionRefused(err)
            {
                return err == ECONNREFUSED;
            }
        
            function connectionFailed(err)
            {
                return err == ECONNREFUSED || err == ETIMEDOUT ||
                    err == ENETUNREACH || err == EHOSTUNREACH ||
                    err == ECONNRESET || err == ESHUTDOWN ||
                    err == ECONNABORTED;
            }
        
            function connectionLost(err)
            {
                return err == ECONNRESET || err == ENOTCONN ||
                    err == ESHUTDOWN || err == ECONNABORTED ||
                    err == EPIPE;
            }
        }
        else
        {
            TcpTransceiver = class {};
        }
        
        Ice.TcpTransceiver = TcpTransceiver;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        Ice.ToStringMode = Ice.Slice.defineEnum(
            [
                ['Unicode', 0],
                ['ASCII', 1],
                ['Compat', 2]
            ]);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        Ice.TraceLevels = function(properties)
        {
            const networkCat = "Network";
            const protocolCat = "Protocol";
            const retryCat = "Retry";
            const locationCat = "Locator";
            const slicingCat = "Slicing";
        
            const keyBase = "Ice.Trace.";
        
            const network = properties.getPropertyAsInt(keyBase + networkCat);
            const protocol = properties.getPropertyAsInt(keyBase + protocolCat);
            const retry = properties.getPropertyAsInt(keyBase + retryCat);
            const location = properties.getPropertyAsInt(keyBase + locationCat);
            const slicing = properties.getPropertyAsInt(keyBase + slicingCat);
        
            properties.getPropertyAsInt(keyBase + "ThreadPool"); // Avoid an "unused property" warning.
        
            return class
            {
                static get network()
                {
                    return network;
                }
        
                static get networkCat()
                {
                    return networkCat;
                }
        
                static get protocol()
                {
                    return protocol;
                }
        
                static get protocolCat()
                {
                    return protocolCat;
                }
        
                static get retry()
                {
                    return retry;
                }
        
                static get retryCat()
                {
                    return retryCat;
                }
        
                static get location()
                {
                    return location;
                }
        
                static get locationCat()
                {
                    return locationCat;
                }
        
                static get slicing()
                {
                    return slicing;
                }
        
                static get slicingCat()
                {
                    return slicingCat;
                }
            };
        };
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const OutputStream = Ice.OutputStream;
        const Current = Ice.Current;
        const Debug = Ice.Debug;
        const Context = Ice.Context;
        const Identity = Ice.Identity;
        const Protocol = Ice.Protocol;
        const StringUtil = Ice.StringUtil;
        
        class IncomingAsync
        {
            constructor(instance, connection, adapter, response, requestId)
            {
                this._instance = instance;
                this._response = response;
                this._connection = connection;
                this._format = Ice.FormatType.DefaultFormat;
        
                this._current = new Current();
                this._current.id = new Identity();
                this._current.adapter = adapter;
                this._current.con = this._connection;
                this._current.requestId = requestId;
        
                this._servant = null;
                this._locator = null;
                this._cookie = {value: null};
        
                this._os = null;
                this._is = null;
            }
        
            startWriteParams()
            {
                if(!this._response)
                {
                    throw new Ice.MarshalException("can't marshal out parameters for oneway dispatch");
                }
        
                Debug.assert(this._current.encoding !== null); // Encoding for reply is known.
                this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                this._os.writeBlob(Protocol.replyHdr);
                this._os.writeInt(this._current.requestId);
                this._os.writeByte(0);
                this._os.startEncapsulation(this._current.encoding, this._format);
                return this._os;
            }
        
            endWriteParams()
            {
                if(this._response)
                {
                    this._os.endEncapsulation();
                }
            }
        
            writeEmptyParams()
            {
                if(this._response)
                {
                    Debug.assert(this._current.encoding !== null); // Encoding for reply is known.
                    this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                    this._os.writeBlob(Protocol.replyHdr);
                    this._os.writeInt(this._current.requestId);
                    this._os.writeByte(Protocol.replyOK);
                    this._os.writeEmptyEncapsulation(this._current.encoding);
                }
            }
        
            writeParamEncaps(v, ok)
            {
                if(this._response)
                {
                    Debug.assert(this._current.encoding !== null); // Encoding for reply is known.
                    this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                    this._os.writeBlob(Protocol.replyHdr);
                    this._os.writeInt(this._current.requestId);
                    this._os.writeByte(ok ? Protocol.replyOK : Protocol.replyUserException);
                    if(v === null || v.length === 0)
                    {
                        this._os.writeEmptyEncapsulation(this._current.encoding);
                    }
                    else
                    {
                        this._os.writeEncapsulation(v);
                    }
                }
            }
        
            setFormat(format)
            {
                this._format = format;
            }
        
            warning(ex)
            {
                Debug.assert(this._instance !== null);
        
                const s = [];
                s.push("dispatch exception:");
                s.push("\nidentity: " + Ice.identityToString(this._current.id, this._instance.toStringMode()));
                s.push("\nfacet: " + StringUtil.escapeString(this._current.facet, "", this._instance.toStringMode()));
                s.push("\noperation: " + this._current.operation);
                if(this._connection !== null)
                {
                    try
                    {
                        for(let p = this._connection.getInfo(); p; p = p.underlying)
                        {
                            if(p instanceof Ice.IPConnectionInfo)
                            {
                                s.push("\nremote host: " + p.remoteAddress + " remote port: " + p.remotePort);
                            }
                        }
                    }
                    catch(exc)
                    {
                        // Ignore.
                    }
                }
                if(ex.stack)
                {
                    s.push("\n");
                    s.push(ex.stack);
                }
                this._instance.initializationData().logger.warning(s.join(""));
            }
        
            handleException(ex, amd)
            {
                Debug.assert(this._connection !== null);
        
                const props = this._instance.initializationData().properties;
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
                        this.warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                        this._os.writeBlob(Protocol.replyHdr);
                        this._os.writeInt(this._current.requestId);
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
                        ex.id._write(this._os);
        
                        //
                        // For compatibility with the old FacetPath.
                        //
                        if(ex.facet === null || ex.facet.length === 0)
                        {
                            Ice.StringSeqHelper.write(this._os, null);
                        }
                        else
                        {
                            Ice.StringSeqHelper.write(this._os, [ex.facet]);
                        }
        
                        this._os.writeString(ex.operation);
        
                        this._connection.sendResponse(this._os);
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
                        this.warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                        this._os.writeBlob(Protocol.replyHdr);
                        this._os.writeInt(this._current.requestId);
                        this._os.writeByte(Protocol.replyUnknownLocalException);
                        this._os.writeString(ex.unknown);
                        this._connection.sendResponse(this._os);
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
                        this.warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                        this._os.writeBlob(Protocol.replyHdr);
                        this._os.writeInt(this._current.requestId);
                        this._os.writeByte(Protocol.replyUnknownUserException);
                        this._os.writeString(ex.unknown);
                        this._connection.sendResponse(this._os);
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
                        this.warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                        this._os.writeBlob(Protocol.replyHdr);
                        this._os.writeInt(this._current.requestId);
                        this._os.writeByte(Protocol.replyUnknownException);
                        this._os.writeString(ex.unknown);
                        this._connection.sendResponse(this._os);
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
                        this.warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                        this._os.writeBlob(Protocol.replyHdr);
                        this._os.writeInt(this._current.requestId);
                        this._os.writeByte(Protocol.replyUnknownLocalException);
                        // this._os.writeString(ex.toString());
                        const s = [ex.ice_id()];
                        if(ex.stack)
                        {
                            s.push("\n");
                            s.push(ex.stack);
                        }
                        this._os.writeString(s.join(""));
                        this._connection.sendResponse(this._os);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
                else if(ex instanceof Ice.UserException)
                {
                    if(this._response)
                    {
                        this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                        this._os.writeBlob(Protocol.replyHdr);
                        this._os.writeInt(this._current.requestId);
                        this._os.writeByte(Protocol.replyUserException);
                        this._os.startEncapsulation(this._current.encoding, this._format);
                        this._os.writeException(ex);
                        this._os.endEncapsulation();
                        this._connection.sendResponse(this._os);
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
                        this.warning(ex);
                    }
        
                    if(this._response)
                    {
                        this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                        this._os.writeBlob(Protocol.replyHdr);
                        this._os.writeInt(this._current.requestId);
                        this._os.writeByte(Protocol.replyUnknownException);
                        this._os.writeString(ex.toString() + (ex.stack ? "\n" + ex.stack : ""));
                        this._connection.sendResponse(this._os);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
        
                this._connection = null;
            }
        
            invoke(servantManager, stream)
            {
                this._is = stream;
        
                //
                // Read the current.
                //
                this._current.id._read(this._is);
        
                //
                // For compatibility with the old FacetPath.
                //
                const facetPath = Ice.StringSeqHelper.read(this._is);
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
                let sz = this._is.readSize();
                while(sz-- > 0)
                {
                    this._current.ctx.set(this._is.readString(), this._is.readString());
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
                                this.skipReadParams(); // Required for batch requests.
                                this.handleException(ex, false);
                                return;
                            }
                        }
                    }
                }
        
                if(this._servant === null)
                {
                    try
                    {
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
                    catch(ex)
                    {
                        this.skipReadParams(); // Required for batch requests.
                        this.handleException(ex, false);
                        return;
                    }
                }
        
                try
                {
                    Debug.assert(this._servant !== null);
                    const promise = this._servant._iceDispatch(this, this._current);
                    if(promise !== null)
                    {
                        promise.then(() => this.completed(null, true),
                                     ex => this.completed(ex, true));
                        return;
                    }
        
                    Debug.assert(!this._response || this._os !== null);
                    this.completed(null, false);
                }
                catch(ex)
                {
                    this.completed(ex, false);
                }
            }
        
            startReadParams()
            {
                //
                // Remember the encoding used by the input parameters, we'll
                // encode the response parameters with the same encoding.
                //
                this._current.encoding = this._is.startEncapsulation();
                return this._is;
            }
        
            endReadParams()
            {
                this._is.endEncapsulation();
            }
        
            readEmptyParams()
            {
                this._current.encoding = this._is.skipEmptyEncapsulation();
            }
        
            readParamEncaps()
            {
                this._current.encoding = new Ice.EncodingVersion();
                return this._is.readEncapsulation(this._current.encoding);
            }
        
            skipReadParams()
            {
                this._current.encoding = this._is.skipEncapsulation();
            }
        
            completed(exc, amd)
            {
                try
                {
                    if(this._locator !== null)
                    {
                        Debug.assert(this._locator !== null && this._servant !== null);
                        try
                        {
                            this._locator.finished(this._current, this._servant, this._cookie.value);
                        }
                        catch(ex)
                        {
                            this.handleException(ex, amd);
                            return;
                        }
                    }
        
                    Debug.assert(this._connection !== null);
        
                    if(exc !== null)
                    {
                        this.handleException(exc, amd);
                    }
                    else if(this._response)
                    {
                        this._connection.sendResponse(this._os);
                    }
                    else
                    {
                        this._connection.sendNoResponse();
                    }
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        this._connection.invokeException(ex, 1);
                    }
                    else
                    {
                        throw ex;
                    }
                }
                this._connection = null;
            }
        
        }
        
        Ice.IncomingAsync = IncomingAsync;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Base64 = Ice.Base64;
        const Debug = Ice.Debug;
        const EndpointParseException = Ice.EndpointParseException;
        const HashUtil = Ice.HashUtil;
        const StringUtil = Ice.StringUtil;
        
        class OpaqueEndpointI extends Ice.EndpointI
        {
            constructor(type)
            {
                super();
                this._rawEncoding = Ice.Encoding_1_0;
                this._type = type === undefined ? -1 : type;
                this._rawBytes = null;
            }
        
            //
            // Marshal the endpoint
            //
            streamWrite(s)
            {
                s.startEncapsulation(this._rawEncoding, Ice.FormatType.DefaultFormat);
                s.writeBlob(this._rawBytes);
                s.endEncapsulation();
            }
        
            //
            // Return the endpoint information.
            //
            getInfo()
            {
                return new OpaqueEndpointInfoI(null, -1, false, this._rawEncoding, this._rawBytes, this._type);
            }
        
            //
            // Return the endpoint type
            //
            type()
            {
                return this._type;
            }
        
            protocol()
            {
                return "opaque";
            }
        
            //
            // Return the timeout for the endpoint in milliseconds. 0 means
            // non-blocking, -1 means no timeout.
            //
            timeout()
            {
                return -1;
            }
        
            //
            // Return a new endpoint with a different timeout value, provided
            // that timeouts are supported by the endpoint. Otherwise the same
            // endpoint is returned.
            //
            changeTimeout(t)
            {
                return this;
            }
        
            //
            // Return a new endpoint with a different connection id.
            //
            changeConnectionId(connectionId)
            {
                return this;
            }
        
            //
            // Return true if the endpoints support bzip2 compress, or false
            // otherwise.
            //
            compress()
            {
                return false;
            }
        
            //
            // Return a new endpoint with a different compression value,
            // provided that compression is supported by the
            // endpoint. Otherwise the same endpoint is returned.
            //
            changeCompress(compress)
            {
                return this;
            }
        
            //
            // Return true if the endpoint is datagram-based.
            //
            datagram()
            {
                return false;
            }
        
            //
            // Return true if the endpoint is secure.
            //
            secure()
            {
                return false;
            }
        
            //
            // Get the encoded endpoint.
            //
            rawBytes()
            {
                return this._rawBytes; // Returns a Uint8Array
            }
        
            //
            // Return a server side transceiver for this endpoint, or null if a
            // transceiver can only be created by an acceptor. In case a
            // transceiver is created, this operation also returns a new
            // "effective" endpoint, which might differ from this endpoint,
            // for example, if a dynamic port number is assigned.
            //
            transceiver(endpoint)
            {
                endpoint.value = null;
                return null;
            }
        
            //
            // Return an acceptor for this endpoint, or null if no acceptors
            // is available. In case an acceptor is created, this operation
            // also returns a new "effective" endpoint, which might differ
            // from this endpoint, for example, if a dynamic port number is
            // assigned.
            //
            acceptor(endpoint, adapterName)
            {
                endpoint.value = this;
                return null;
            }
        
            connect()
            {
                return null;
            }
        
            hashCode()
            {
                if(this._hashCode === undefined)
                {
                    let h = 5381;
                    h = HashUtil.addNumber(h, this._type);
                    h = HashUtil.addHashable(h, this._rawEncoding);
                    h = HashUtil.addArray(h, this._rawBytes, HashUtil.addNumber);
                    this._hashCode = h;
                }
                return this._hashCode;
            }
        
            options()
            {
                let s = "";
                s += " -t " + this._type;
                s += " -e " + Ice.encodingVersionToString(this._rawEncoding);
                s += " -v " + Base64.encode(this._rawBytes);
                return s;
            }
        
            //
            // Compare endpoints for sorting purposes
            //
            equals(p)
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
                for(let i = 0; i < this._rawBytes.length; i++)
                {
                    if(this._rawBytes[i] !== p._rawBytes[i])
                    {
                        return false;
                    }
                }
        
                return true;
            }
        
            compareTo(p)
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
                for(let i = 0; i < this._rawBytes.length; i++)
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
            }
        
            checkOption(option, argument, endpoint)
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
        
                        let type;
        
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
                        for(let i = 0; i < argument.length; ++i)
                        {
                            if(!Base64.isBase64(argument.charAt(i)))
                            {
                                throw new EndpointParseException("invalid base64 character `" + argument.charAt(i) +
                                                                 "' (ordinal " + argument.charCodeAt(i) +
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
            }
        
            initWithOptions(args)
            {
                super.initWithOptions(args);
                Debug.assert(this._rawEncoding);
        
                if(this._type < 0)
                {
                    throw new EndpointParseException("no -t option in endpoint `" + this + "'");
                }
                if(this._rawBytes === null || this._rawBytes.length === 0)
                {
                    throw new EndpointParseException("no -v option in endpoint `" + this + "'");
                }
            }
        
            initWithStream(s)
            {
                this._rawEncoding = s.getEncoding();
                this._rawBytes = s.readBlob(s.getEncapsulationSize());
            }
        }
        
        class OpaqueEndpointInfoI extends Ice.OpaqueEndpointInfo
        {
            constructor(timeout, compress, rawEncoding, rawBytes, type)
            {
                super(-1, false, rawEncoding, rawBytes);
                this._type = type;
            }
        
            type()
            {
                return this._type;
            }
        
            datagram()
            {
                return false;
            }
        
            secure()
            {
                return false;
            }
        }
        
        Ice.OpaqueEndpointI = OpaqueEndpointI;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Process.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        const iceC_Ice_Process_ids = [
            "::Ice::Object",
            "::Ice::Process"
        ];
        
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
        Ice.Process = class extends Ice.Object
        {
        };
        
        Ice.ProcessPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.Process, Ice.ProcessPrx, iceC_Ice_Process_ids, 1,
        {
            "shutdown": [, , , , , , , , , ],
            "writeMessage": [, , , , , [[7], [3]], , , , ]
        });
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        const AsyncStatus = Ice.AsyncStatus;
        const AsyncResultBase = Ice.AsyncResultBase;
        const InputStream = Ice.InputStream;
        const OutputStream = Ice.OutputStream;
        const BatchRequestQueue = Ice.BatchRequestQueue;
        const ConnectionFlushBatch = Ice.ConnectionFlushBatch;
        const HeartbeatAsync = Ice.HeartbeatAsync;
        const Debug = Ice.Debug;
        const ExUtil = Ice.ExUtil;
        const HashMap = Ice.HashMap;
        const IncomingAsync = Ice.IncomingAsync;
        const RetryException = Ice.RetryException;
        const Protocol = Ice.Protocol;
        const SocketOperation = Ice.SocketOperation;
        const Timer = Ice.Timer;
        const TraceUtil = Ice.TraceUtil;
        const ProtocolVersion = Ice.ProtocolVersion;
        const EncodingVersion = Ice.EncodingVersion;
        const ACM = Ice.ACM;
        const ACMClose = Ice.ACMClose;
        const ACMHeartbeat = Ice.ACMHeartbeat;
        const ConnectionClose = Ice.ConnectionClose;
        
        const StateNotInitialized = 0;
        const StateNotValidated = 1;
        const StateActive = 2;
        const StateHolding = 3;
        const StateClosing = 4;
        const StateClosed = 5;
        const StateFinished = 6;
        
        class MessageInfo
        {
            constructor(instance)
            {
                this.stream = new InputStream(instance, Protocol.currentProtocolEncoding);
                this.invokeNum = 0;
                this.requestId = 0;
                this.servantManager = null;
                this.adapter = null;
                this.outAsync = null;
                this.heartbeatCallback = null;
            }
        }
        
        class ConnectionI
        {
            constructor(communicator, instance, monitor, transceiver, endpoint, incoming, adapter)
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
                const initData = instance.initializationData();
                this._logger = initData.logger; // Cached for better performance.
                this._traceLevels = instance.traceLevels(); // Cached for better performance.
                this._timer = instance.timer();
                this._writeTimeoutId = 0;
                this._writeTimeoutScheduled = false;
                this._readTimeoutId = 0;
                this._readTimeoutScheduled = false;
        
                this._hasMoreData = {value: false};
        
                this._warn = initData.properties.getPropertyAsInt("Ice.Warn.Connections") > 0;
                this._warnUdp = instance.initializationData().properties.getPropertyAsInt("Ice.Warn.Datagrams") > 0;
                this._acmLastActivity = this._monitor !== null && this._monitor.getACM().timeout > 0 ? Date.now() : -1;
                this._nextRequestId = 1;
                this._messageSizeMax = adapter ? adapter.messageSizeMax() : instance.messageSizeMax();
                this._batchRequestQueue = new BatchRequestQueue(instance, endpoint.datagram());
        
                this._sendStreams = [];
        
                this._readStream = new InputStream(instance, Protocol.currentProtocolEncoding);
                this._readHeader = false;
                this._writeStream = new OutputStream(instance, Protocol.currentProtocolEncoding);
        
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
                this._finishedPromises = [];
        
                if(this._adapter !== null)
                {
                    this._servantManager = this._adapter.getServantManager();
                }
                else
                {
                    this._servantManager = null;
                }
                this._closeCallback = null;
                this._heartbeatCallback = null;
            }
        
            start()
            {
                Debug.assert(this._startPromise === null);
        
                try
                {
                    // The connection might already be closed if the communicator was destroyed.
                    if(this._state >= StateClosed)
                    {
                        Debug.assert(this._exception !== null);
                        return Ice.Promise.reject(this._exception);
                    }
        
                    this._startPromise = new Ice.Promise();
                    this._transceiver.setCallbacks(
                        () => this.message(SocketOperation.Write), // connected callback
                        () => this.message(SocketOperation.Read), // read callback
                        () => this.message(SocketOperation.Write) // write callback
                    );
                    this.initialize();
                }
                catch(ex)
                {
                    const startPromise = this._startPromise;
                    this.exception(ex);
                    return startPromise;
                }
                return this._startPromise;
            }
        
            activate()
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
            }
        
            hold()
            {
                if(this._state <= StateNotValidated)
                {
                    return;
                }
        
                this.setState(StateHolding);
            }
        
            destroy(reason)
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
        
                    default:
                    {
                        Debug.assert(false);
                        break;
                    }
                }
            }
        
            close(mode)
            {
                const r = new AsyncResultBase(this._communicator, "close", this, null, null);
        
                if(mode == ConnectionClose.Forcefully)
                {
                    this.setState(StateClosed, new Ice.ConnectionManuallyClosedException(false));
                    r.resolve();
                }
                else if(mode == ConnectionClose.Gracefully)
                {
                    this.setState(StateClosing, new Ice.ConnectionManuallyClosedException(true));
                    r.resolve();
                }
                else
                {
                    Debug.assert(mode == ConnectionClose.GracefullyWithWait);
        
                    //
                    // Wait until all outstanding requests have been completed.
                    //
                    this._closePromises.push(r);
                    this.checkClose();
                }
        
                return r;
            }
        
            checkClose()
            {
                //
                // If close(GracefullyWithWait) has been called, then we need to check if all
                // requests have completed and we can transition to StateClosing. We also
                // complete outstanding promises.
                //
                if(this._asyncRequests.size === 0 && this._closePromises.length > 0)
                {
                    //
                    // The caller doesn't expect the state of the connection to change when this is called so
                    // we defer the check immediately after doing whather we're doing. This is consistent with
                    // other implementations as well.
                    //
                    Timer.setImmediate(() =>
                    {
                        this.setState(StateClosing, new Ice.ConnectionManuallyClosedException(true));
                        this._closePromises.forEach(p => p.resolve());
                        this._closePromises = [];
                    });
                }
            }
        
            isActiveOrHolding()
            {
                return this._state > StateNotValidated && this._state < StateClosing;
            }
        
            isFinished()
            {
                if(this._state !== StateFinished || this._dispatchCount !== 0)
                {
                    return false;
                }
        
                Debug.assert(this._state === StateFinished);
                return true;
            }
        
            throwException()
            {
                if(this._exception !== null)
                {
                    Debug.assert(this._state >= StateClosing);
                    throw this._exception;
                }
            }
        
            waitUntilFinished()
            {
                const promise = new Ice.Promise();
                this._finishedPromises.push(promise);
                this.checkState();
                return promise;
            }
        
            monitor(now, acm)
            {
                if(this._state !== StateActive)
                {
                    return;
                }
        
                //
                // We send a heartbeat if there was no activity in the last
                // (timeout / 4) period. Sending a heartbeat sooner than
                // really needed is safer to ensure that the receiver will
                // receive the heartbeat in time. Sending the heartbeat if
                // there was no activity in the last (timeout / 2) period
                // isn't enough since monitor() is called only every (timeout
                // / 2) period.
                //
                // Note that this doesn't imply that we are sending 4 heartbeats
                // per timeout period because the monitor() method is still only
                // called every (timeout / 2) period.
                //
                if(acm.heartbeat == Ice.ACMHeartbeat.HeartbeatAlways ||
                   (acm.heartbeat != Ice.ACMHeartbeat.HeartbeatOff && this._writeStream.isEmpty() &&
                    now >= (this._acmLastActivity + (acm.timeout / 4))))
                {
                    if(acm.heartbeat != Ice.ACMHeartbeat.HeartbeatOnDispatch || this._dispatchCount > 0)
                    {
                        this.sendHeartbeatNow(); // Send heartbeat if idle in the last timeout / 2 period.
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
            }
        
            sendAsyncRequest(out, response, batchRequestNum)
            {
                let requestId = 0;
                const ostr = out.getOs();
        
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
                this._transceiver.checkSendSize(ostr);
        
                //
                // Notify the request that it's cancelable with this connection.
                // This will throw if the request is canceled.
                //
                out.cancelable(this); // Notify the request that it's cancelable
        
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
                    ostr.pos = Protocol.headerSize;
                    ostr.writeInt(requestId);
                }
                else if(batchRequestNum > 0)
                {
                    ostr.pos = Protocol.headerSize;
                    ostr.writeInt(batchRequestNum);
                }
        
                let status;
                try
                {
                    status = this.sendMessage(OutgoingMessage.create(out, out.getOs(), requestId));
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
            }
        
            getBatchRequestQueue()
            {
                return this._batchRequestQueue;
            }
        
            flushBatchRequests()
            {
                const result = new ConnectionFlushBatch(this, this._communicator, "flushBatchRequests");
                result.invoke();
                return result;
            }
        
            setCloseCallback(callback)
            {
                if(this._state >= StateClosed)
                {
                    if(callback !== null)
                    {
                        Timer.setImmediate(() =>
                        {
                            try
                            {
                                callback(this);
                            }
                            catch(ex)
                            {
                                this._logger.error("connection callback exception:\n" + ex + '\n' + this._desc);
                            }
                        });
                    }
                }
                else
                {
                    this._closeCallback = callback;
                }
            }
        
            setHeartbeatCallback(callback)
            {
                if(this._state >= StateClosed)
                {
                    return;
                }
                this._heartbeatCallback = callback;
            }
        
            heartbeat()
            {
                const result = new HeartbeatAsync(this, this._communicator);
                result.invoke();
                return result;
            }
        
            setACM(timeout, close, heartbeat)
            {
                if(timeout !== undefined && timeout < 0)
                {
                    throw new RangeError("invalid negative ACM timeout value");
                }
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
            }
        
            getACM()
            {
                return this._monitor !== null ? this._monitor.getACM() :
                    new ACM(0, ACMClose.CloseOff, ACMHeartbeat.HeartbeatOff);
            }
        
            asyncRequestCanceled(outAsync, ex)
            {
                for(let i = 0; i < this._sendStreams.length; i++)
                {
                    const o = this._sendStreams[i];
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
                        outAsync.completedEx(ex);
                        this.checkClose();
                        return; // We're done.
                    }
                }
        
                if(outAsync instanceof Ice.OutgoingAsync)
                {
                    for(const [key, value] of this._asyncRequests)
                    {
                        if(value === outAsync)
                        {
                            this._asyncRequests.delete(key);
                            outAsync.completedEx(ex);
                            this.checkClose();
                            return; // We're done.
                        }
                    }
                }
            }
        
            sendResponse(os)
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
        
                    this.sendMessage(OutgoingMessage.createForStream(os, true));
        
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
            }
        
            sendNoResponse()
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
            }
        
            endpoint()
            {
                return this._endpoint;
            }
        
            setAdapter(adapter)
            {
                if(adapter !== null)
                {
                    adapter.checkForDeactivation();
                    if(this._state <= StateNotValidated || this._state >= StateClosing)
                    {
                        return;
                    }
                    this._adapter = adapter;
                    this._servantManager = adapter.getServantManager(); // The OA's servant manager is immutable.
                }
                else
                {
                    if(this._state <= StateNotValidated || this._state >= StateClosing)
                    {
                        return;
                    }
                    this._adapter = null;
                    this._servantManager = null;
                }
            }
        
            getAdapter()
            {
                return this._adapter;
            }
        
            getEndpoint()
            {
                return this._endpoint;
            }
        
            createProxy(ident)
            {
                //
                // Create a reference and return a reverse proxy for this
                // reference.
                //
                return this._instance.proxyFactory().referenceToProxy(
                    this._instance.referenceFactory().createFixed(ident, this));
            }
        
            message(operation)
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
        
                let info = null;
                try
                {
                    if((operation & SocketOperation.Write) !== 0 && this._writeStream.buffer.remaining > 0)
                    {
                        if(!this.write(this._writeStream.buffer))
                        {
                            Debug.assert(!this._writeStream.isEmpty());
                            this.scheduleTimeout(SocketOperation.Write);
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
        
                            //
                            // Connection is validated on first message. This is only used by
                            // setState() to check wether or not we can print a connection
                            // warning (a client might close the connection forcefully if the
                            // connection isn't validated, we don't want to print a warning
                            // in this case).
                            //
                            this._validated = true;
        
                            const pos = this._readStream.pos;
                            if(pos < Protocol.headerSize)
                            {
                                //
                                // This situation is possible for small UDP packets.
                                //
                                throw new Ice.IllegalMessageSizeException();
                            }
        
                            this._readStream.pos = 0;
                            const magic0 = this._readStream.readByte();
                            const magic1 = this._readStream.readByte();
                            const magic2 = this._readStream.readByte();
                            const magic3 = this._readStream.readByte();
                            if(magic0 !== Protocol.magic[0] || magic1 !== Protocol.magic[1] ||
                               magic2 !== Protocol.magic[2] || magic3 !== Protocol.magic[3])
                            {
                                throw new Ice.BadMagicException("", new Uint8Array([magic0, magic1, magic2, magic3]));
                            }
        
                            this._readProtocol._read(this._readStream);
                            Protocol.checkSupportedProtocol(this._readProtocol);
        
                            this._readProtocolEncoding._read(this._readStream);
                            Protocol.checkSupportedProtocolEncoding(this._readProtocolEncoding);
        
                            this._readStream.readByte(); // messageType
                            this._readStream.readByte(); // compress
                            const size = this._readStream.readInt();
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
                                    this.scheduleTimeout(SocketOperation.Read);
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
                    Timer.setImmediate(() => this.message(SocketOperation.Read)); // Don't tie up the thread.
                }
            }
        
            dispatch(info)
            {
                let count = 0;
                //
                // Notify the factory that the connection establishment and
                // validation has completed.
                //
                if(this._startPromise !== null)
                {
                    this._startPromise.resolve();
        
                    this._startPromise = null;
                    ++count;
                }
        
                if(info !== null)
                {
                    if(info.outAsync !== null)
                    {
                        info.outAsync.completed(info.stream);
                        ++count;
                    }
        
                    if(info.invokeNum > 0)
                    {
                        this.invokeAll(info.stream, info.invokeNum, info.requestId, info.servantManager, info.adapter);
        
                        //
                        // Don't increase count, the dispatch count is
                        // decreased when the incoming reply is sent.
                        //
                    }
        
                    if(info.heartbeatCallback)
                    {
                        try
                        {
                            info.heartbeatCallback(this);
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
                        if(this._state === StateClosing)
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
            }
        
            finish()
            {
                Debug.assert(this._state === StateClosed);
                this.unscheduleTimeout(SocketOperation.Read | SocketOperation.Write | SocketOperation.Connect);
        
                const traceLevels = this._instance.traceLevels();
                if(!this._initialized)
                {
                    if(traceLevels.network >= 2)
                    {
                        const s = [];
                        s.push("failed to establish ");
                        s.push(this._endpoint.protocol());
                        s.push(" connection\n");
                        s.push(this.toString());
                        s.push("\n");
                        s.push(this._exception.toString());
                        this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                    }
                }
                else if(traceLevels.network >= 1)
                {
                    const s = [];
                    s.push("closed ");
                    s.push(this._endpoint.protocol());
                    s.push(" connection\n");
                    s.push(this.toString());
        
                    //
                    // Trace the cause of unexpected connection closures
                    //
                    if(!(this._exception instanceof Ice.CloseConnectionException ||
                         this._exception instanceof Ice.ConnectionManuallyClosedException ||
                         this._exception instanceof Ice.ConnectionTimeoutException ||
                         this._exception instanceof Ice.CommunicatorDestroyedException ||
                         this._exception instanceof Ice.ObjectAdapterDeactivatedException))
                    {
                        s.push("\n");
                        s.push(this._exception.toString());
                    }
        
                    this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                }
        
                if(this._startPromise !== null)
                {
                    this._startPromise.reject(this._exception);
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
                        this._writeStream.swap(this._sendStreams[0].stream);
                    }
        
                    //
                    // NOTE: for twoway requests which are not sent, finished can be called twice: the
                    // first time because the outgoing is in the _sendStreams set and the second time
                    // because it's either in the _requests/_asyncRequests set. This is fine, only the
                    // first call should be taken into account by the implementation of finished.
                    //
                    for(let i = 0; i < this._sendStreams.length; ++i)
                    {
                        const p = this._sendStreams[i];
                        if(p.requestId > 0)
                        {
                            this._asyncRequests.delete(p.requestId);
                        }
                        p.completed(this._exception);
                    }
                    this._sendStreams = [];
                }
        
                for(const value of this._asyncRequests.values())
                {
                    value.completedEx(this._exception);
                }
                this._asyncRequests.clear();
                this.checkClose();
        
                //
                // Don't wait to be reaped to reclaim memory allocated by read/write streams.
                //
                this._readStream.clear();
                this._readStream.buffer.clear();
                this._writeStream.clear();
                this._writeStream.buffer.clear();
        
                if(this._closeCallback !== null)
                {
                    try
                    {
                        this._closeCallback(this);
                    }
                    catch(ex)
                    {
                        this._logger.error("connection callback exception:\n" + ex + '\n' + this._desc);
                    }
                    this._closeCallback = null;
                }
        
                this._heartbeatCallback = null;
        
                //
                // This must be done last as this will cause waitUntilFinished() to return (and communicator
                // objects such as the timer might be destroyed too).
                //
                if(this._dispatchCount === 0)
                {
                    this.reap();
                }
                this.setState(StateFinished);
            }
        
            toString()
            {
                return this._desc;
            }
        
            timedOut(event)
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
            }
        
            type()
            {
                return this._type;
            }
        
            timeout()
            {
                return this._endpoint.timeout();
            }
        
            getInfo()
            {
                if(this._state >= StateClosed)
                {
                    throw this._exception;
                }
                const info = this._transceiver.getInfo();
                for(let p = info; p !== null; p = p.underlying)
                {
                    p.adapterName = this._adapter !== null ? this._adapter.getName() : "";
                    p.incoming = this._incoming;
                }
                return info;
            }
        
            setBufferSize(rcvSize, sndSize)
            {
                if(this._state >= StateClosed)
                {
                    throw this._exception;
                }
                this._transceiver.setBufferSize(rcvSize, sndSize);
            }
        
            exception(ex)
            {
                this.setState(StateClosed, ex);
            }
        
            invokeException(ex, invokeNum)
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
            }
        
            setState(state, ex)
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
                                 this._exception instanceof Ice.ConnectionManuallyClosedException ||
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
        
                        default:
                        {
                            Debug.assert(false);
                            break;
                        }
                    }
                }
                catch(ex)
                {
                    if(ex instanceof Ice.LocalException)
                    {
                        this._instance.initializationData().logger.error(
                            `unexpected connection exception:\n${this._desc}\n${ex.toString()}`);
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
            }
        
            initiateShutdown()
            {
                Debug.assert(this._state === StateClosing && this._dispatchCount === 0);
        
                if(this._shutdownInitiated)
                {
                    return;
                }
                this._shutdownInitiated = true;
        
                if(!this._endpoint.datagram())
                {
                    //
                    // Before we shut down, we send a close connection message.
                    //
                    const os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                    os.writeBlob(Protocol.magic);
                    Protocol.currentProtocol._write(os);
                    Protocol.currentProtocolEncoding._write(os);
                    os.writeByte(Protocol.closeConnectionMsg);
                    os.writeByte(0); // compression status: always report 0 for CloseConnection.
                    os.writeInt(Protocol.headerSize); // Message size.
        
                    if((this.sendMessage(OutgoingMessage.createForStream(os, false)) & AsyncStatus.Sent) > 0)
                    {
                        //
                        // Schedule the close timeout to wait for the peer to close the connection.
                        //
                        this.scheduleTimeout(SocketOperation.Read);
                    }
                }
            }
        
            sendHeartbeatNow()
            {
                Debug.assert(this._state === StateActive);
        
                if(!this._endpoint.datagram())
                {
                    const os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                    os.writeBlob(Protocol.magic);
                    Protocol.currentProtocol._write(os);
                    Protocol.currentProtocolEncoding._write(os);
                    os.writeByte(Protocol.validateConnectionMsg);
                    os.writeByte(0);
                    os.writeInt(Protocol.headerSize); // Message size.
                    try
                    {
                        this.sendMessage(OutgoingMessage.createForStream(os, false));
                    }
                    catch(ex)
                    {
                        this.setState(StateClosed, ex);
                        Debug.assert(this._exception !== null);
                    }
                }
            }
        
            initialize()
            {
                const s = this._transceiver.initialize(this._readStream.buffer, this._writeStream.buffer);
                if(s != SocketOperation.None)
                {
                    this.scheduleTimeout(s);
                    return false;
                }
        
                //
                // Update the connection description once the transceiver is initialized.
                //
                this._desc = this._transceiver.toString();
                this._initialized = true;
                this.setState(StateNotValidated);
                return true;
            }
        
            validate()
            {
                if(!this._endpoint.datagram()) // Datagram connections are always implicitly validated.
                {
                    if(this._adapter !== null) // The server side has the active role for connection validation.
                    {
                        if(this._writeStream.size === 0)
                        {
                            this._writeStream.writeBlob(Protocol.magic);
                            Protocol.currentProtocol._write(this._writeStream);
                            Protocol.currentProtocolEncoding._write(this._writeStream);
                            this._writeStream.writeByte(Protocol.validateConnectionMsg);
                            this._writeStream.writeByte(0); // Compression status (always zero for validate connection).
                            this._writeStream.writeInt(Protocol.headerSize); // Message size.
                            TraceUtil.traceSend(this._writeStream, this._logger, this._traceLevels);
                            this._writeStream.prepareWrite();
                        }
        
                        if(this._writeStream.pos != this._writeStream.size && !this.write(this._writeStream.buffer))
                        {
                            this.scheduleTimeout(SocketOperation.Write);
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
                            this.scheduleTimeout(SocketOperation.Read);
                            return false;
                        }
        
                        this._validated = true;
        
                        Debug.assert(this._readStream.pos === Protocol.headerSize);
                        this._readStream.pos = 0;
                        const m = this._readStream.readBlob(4);
                        if(m[0] !== Protocol.magic[0] || m[1] !== Protocol.magic[1] ||
                            m[2] !== Protocol.magic[2] || m[3] !== Protocol.magic[3])
                        {
                            throw new Ice.BadMagicException("", m);
                        }
        
                        this._readProtocol._read(this._readStream);
                        Protocol.checkSupportedProtocol(this._readProtocol);
        
                        this._readProtocolEncoding._read(this._readStream);
                        Protocol.checkSupportedProtocolEncoding(this._readProtocolEncoding);
        
                        const messageType = this._readStream.readByte();
                        if(messageType !== Protocol.validateConnectionMsg)
                        {
                            throw new Ice.ConnectionNotValidatedException();
                        }
                        this._readStream.readByte(); // Ignore compression status for validate connection.
                        if(this._readStream.readInt() !== Protocol.headerSize)
                        {
                            throw new Ice.IllegalMessageSizeException();
                        }
                        TraceUtil.traceRecv(this._readStream, this._logger, this._traceLevels);
                    }
                }
        
                this._writeStream.resize(0);
                this._writeStream.pos = 0;
        
                this._readStream.resize(Protocol.headerSize);
                this._readHeader = true;
                this._readStream.pos = 0;
        
                const traceLevels = this._instance.traceLevels();
                if(traceLevels.network >= 1)
                {
                    const s = [];
                    if(this._endpoint.datagram())
                    {
                        s.push("starting to send ");
                        s.push(this._endpoint.protocol());
                        s.push(" messages\n");
                        s.push(this._transceiver.toDetailedString());
                    }
                    else
                    {
                        s.push("established ");
                        s.push(this._endpoint.protocol());
                        s.push(" connection\n");
                        s.push(this.toString());
                    }
                    this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                }
        
                return true;
            }
        
            sendNextMessage()
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
                        let message = this._sendStreams.shift();
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
        
                        const stream = message.stream;
                        stream.pos = 10;
                        stream.writeInt(stream.size);
                        stream.prepareWrite();
                        message.prepared = true;
        
                        TraceUtil.traceSend(stream, this._logger, this._traceLevels);
        
                        this._writeStream.swap(message.stream);
        
                        //
                        // Send the message.
                        //
                        if(this._writeStream.pos != this._writeStream.size && !this.write(this._writeStream.buffer))
                        {
                            Debug.assert(!this._writeStream.isEmpty());
                            this.scheduleTimeout(SocketOperation.Write);
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
                if(this._state === StateClosing && this._shutdownInitiated)
                {
                    this.scheduleTimeout(SocketOperation.Read);
                }
            }
        
            sendMessage(message)
            {
                if(this._sendStreams.length > 0)
                {
                    message.doAdopt();
                    this._sendStreams.push(message);
                    return AsyncStatus.Queued;
                }
                Debug.assert(this._state < StateClosed);
        
                Debug.assert(!message.prepared);
        
                const stream = message.stream;
                stream.pos = 10;
                stream.writeInt(stream.size);
                stream.prepareWrite();
                message.prepared = true;
        
                TraceUtil.traceSend(stream, this._logger, this._traceLevels);
        
                if(this.write(stream.buffer))
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
                this.scheduleTimeout(SocketOperation.Write);
        
                return AsyncStatus.Queued;
            }
        
            parseMessage()
            {
                Debug.assert(this._state > StateNotValidated && this._state < StateClosed);
        
                let info = new MessageInfo(this._instance);
        
                this._readStream.swap(info.stream);
                this._readStream.resize(Protocol.headerSize);
                this._readStream.pos = 0;
                this._readHeader = true;
        
                Debug.assert(info.stream.pos === info.stream.size);
        
                try
                {
                    //
                    // We don't need to check magic and version here. This has already
                    // been done by the caller.
                    //
                    info.stream.pos = 8;
                    const messageType = info.stream.readByte();
                    const compress = info.stream.readByte();
                    if(compress === 2)
                    {
                        throw new Ice.FeatureNotSupportedException("Cannot uncompress compressed message");
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
                                TraceUtil.traceIn("received request during closing\n" +
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
                                TraceUtil.traceIn("received batch request during closing\n" +
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
                            if(this._heartbeatCallback !== null)
                            {
                                info.heartbeatCallback = this._heartbeatCallback;
                                ++this._dispatchCount;
                            }
                            break;
                        }
        
                        default:
                        {
                            TraceUtil.traceIn("received unknown message\n(invalid, closing connection)",
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
            }
        
            invokeAll(stream, invokeNum, requestId, servantManager, adapter)
            {
                try
                {
                    while(invokeNum > 0)
                    {
                        //
                        // Prepare the invocation.
                        //
                        const inc = new IncomingAsync(this._instance, this,
                                                      adapter,
                                                      !this._endpoint.datagram() && requestId !== 0, // response
                                                      requestId);
        
                        //
                        // Dispatch the invocation.
                        //
                        inc.invoke(servantManager, stream);
        
                        --invokeNum;
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
                        //
                        // An Error was raised outside of servant code (i.e., by Ice code).
                        // Attempt to log the error and clean up.
                        //
                        this._logger.error("unexpected exception:\n" + ex.toString());
                        this.invokeException(new Ice.UnknownException(ex), invokeNum);
                    }
                }
            }
        
            scheduleTimeout(op)
            {
                let timeout;
                if(this._state < StateActive)
                {
                    const defaultsAndOverrides = this._instance.defaultsAndOverrides();
                    if(defaultsAndOverrides.overrideConnectTimeout)
                    {
                        timeout = defaultsAndOverrides.overrideConnectTimeoutValue;
                    }
                    else
                    {
                        timeout = this._endpoint.timeout();
                    }
                }
                else if(this._state < StateClosing)
                {
                    if(this._readHeader) // No timeout for reading the header.
                    {
                        op &= ~SocketOperation.Read;
                    }
                    timeout = this._endpoint.timeout();
                }
                else
                {
                    const defaultsAndOverrides = this._instance.defaultsAndOverrides();
                    if(defaultsAndOverrides.overrideCloseTimeout)
                    {
                        timeout = defaultsAndOverrides.overrideCloseTimeoutValue;
                    }
                    else
                    {
                        timeout = this._endpoint.timeout();
                    }
                }
        
                if(timeout < 0)
                {
                    return;
                }
        
                if((op & SocketOperation.Read) !== 0)
                {
                    if(this._readTimeoutScheduled)
                    {
                        this._timer.cancel(this._readTimeoutId);
                    }
                    this._readTimeoutId = this._timer.schedule(() => this.timedOut(), timeout);
                    this._readTimeoutScheduled = true;
                }
                if((op & (SocketOperation.Write | SocketOperation.Connect)) !== 0)
                {
                    if(this._writeTimeoutScheduled)
                    {
                        this._timer.cancel(this._writeTimeoutId);
                    }
                    this._writeTimeoutId = this._timer.schedule(() => this.timedOut(), timeout);
                    this._writeTimeoutScheduled = true;
                }
            }
        
            unscheduleTimeout(op)
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
            }
        
            warning(msg, ex)
            {
                this._logger.warning(msg + ":\n" + this._desc + "\n" + ex.toString());
            }
        
            checkState()
            {
                if(this._state < StateHolding || this._dispatchCount > 0)
                {
                    return;
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
                    this._finishedPromises.forEach(p => p.resolve());
                    this._finishedPromises = [];
                }
            }
        
            reap()
            {
                if(this._monitor !== null)
                {
                    this._monitor.reap(this);
                }
            }
        
            read(buf)
            {
                const start = buf.position;
                const ret = this._transceiver.read(buf, this._hasMoreData);
                if(this._instance.traceLevels().network >= 3 && buf.position != start)
                {
                    const s = [];
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
            }
        
            write(buf)
            {
                const start = buf.position;
                const ret = this._transceiver.write(buf);
                if(this._instance.traceLevels().network >= 3 && buf.position != start)
                {
                    const s = [];
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
        }
        
        // DestructionReason.
        ConnectionI.ObjectAdapterDeactivated = 0;
        ConnectionI.CommunicatorDestroyed = 1;
        
        Ice.ConnectionI = ConnectionI;
        
        class OutgoingMessage
        {
            constructor()
            {
                this.stream = null;
                this.outAsync = null;
                this.requestId = 0;
                this.prepared = false;
            }
        
            canceled()
            {
                Debug.assert(this.outAsync !== null);
                this.outAsync = null;
            }
        
            doAdopt()
            {
                if(this.adopt)
                {
                    const stream = new OutputStream(this.stream.instance, Protocol.currentProtocolEncoding);
                    stream.swap(this.stream);
                    this.stream = stream;
                    this.adopt = false;
                }
            }
        
            sent()
            {
                if(this.outAsync !== null)
                {
                    this.outAsync.sent();
                }
            }
        
            completed(ex)
            {
                if(this.outAsync !== null)
                {
                    this.outAsync.completedEx(ex);
                }
            }
        
            static createForStream(stream, adopt)
            {
                const m = new OutgoingMessage();
                m.stream = stream;
                m.adopt = adopt;
                m.isSent = false;
                m.requestId = 0;
                m.outAsync = null;
                return m;
            }
        
            static create(out, stream, requestId)
            {
                const m = new OutgoingMessage();
                m.stream = stream;
                m.outAsync = out;
                m.requestId = requestId;
                m.isSent = false;
                m.adopt = false;
                return m;
            }
        }
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        const AlreadyRegisteredException = Ice.AlreadyRegisteredException;
        
        //
        // Only for use by Instance
        //
        class ValueFactoryManagerI
        {
            constructor()
            {
                this._factoryMap = new Map(); // Map<String, ValueFactory>
            }
        
            add(factory, id)
            {
                if(this._factoryMap.has(id))
                {
                    throw new AlreadyRegisteredException("value factory", id);
                }
                this._factoryMap.set(id, factory);
            }
        
            find(id)
            {
                return this._factoryMap.get(id);
            }
        
            destroy()
            {
                this._factoryMap = new Map(); // Map<String, ValueFactory>
            }
        }
        
        Ice.ValueFactoryManagerI = ValueFactoryManagerI;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ConnectionInfo.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * Provides access to the connection details of an SSL connection
         *
         **/
        IceSSL.ConnectionInfo = class extends Ice.ConnectionInfo
        {
            constructor(underlying, incoming, adapterName, connectionId, cipher = "", certs = null, verified = false)
            {
                super(underlying, incoming, adapterName, connectionId);
                this.cipher = cipher;
                this.certs = certs;
                this.verified = verified;
            }
        };
        
        
    }());

    (function()
    {
        
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const IceSSL = Ice._ModuleRegistry.module("IceSSL");
        
        let WSTransceiver = {};
        
        if (typeof WebSocket !== 'undefined')
        {
            //
            // With Chrome we don't want to close the socket while connection is in progress,
            // see comments on close implementation below.
            //
            // We need to check for Edge browser as it might include Chrome in its user agent.
            //
            const IsChrome = navigator.userAgent.indexOf("Edge/") === -1 &&
                            navigator.userAgent.indexOf("Chrome/") !== -1;
            const IsSafari = (/^((?!chrome).)*safari/i).test(navigator.userAgent);
        
            const Debug = Ice.Debug;
            const SocketOperation = Ice.SocketOperation;
            const Timer = Ice.Timer;
        
            const StateNeedConnect = 0;
            const StateConnectPending = 1;
            const StateConnected = 2;
            const StateClosePending = 3;
            const StateClosed = 4;
        
            WSTransceiver = class
            {
                constructor(instance)
                {
                    this._readBuffers = [];
                    this._readPosition = 0;
                    this._maxSendPacketSize = instance.properties().getPropertyAsIntWithDefault("Ice.TCP.SndSize", 512 * 1024);
                    this._writeReadyTimeout = 0;
                }
        
                writeReadyTimeout()
                {
                    const t = Math.round(this._writeReadyTimeout);
                    this._writeReadyTimeout += (this._writeReadyTimeout >= 5 ? 5 : 0.2);
                    return Math.min(t, 25);
                }
        
                setCallbacks(connectedCallback, bytesAvailableCallback, bytesWrittenCallback)
                {
                    this._connectedCallback = connectedCallback;
                    this._bytesAvailableCallback = bytesAvailableCallback;
                    this._bytesWrittenCallback = bytesWrittenCallback;
                }
        
                //
                // Returns SocketOperation.None when initialization is complete.
                //
                initialize(readBuffer, writeBuffer)
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
                            this._fd.onopen = e => this.socketConnected(e);
                            this._fd.onmessage = e => this.socketBytesAvailable(e.data);
                            this._fd.onclose = e => this.socketClosed(e);
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
                }
        
                register()
                {
                    //
                    // Register the socket data listener.
                    //
                    this._registered = true;
                    if(this._hasBytesAvailable || this._exception)
                    {
                        this._hasBytesAvailable = false;
                        Timer.setTimeout(() => this._bytesAvailableCallback(), 0);
                    }
                }
        
                unregister()
                {
                    //
                    // Unregister the socket data listener.
                    //
                    this._registered = false;
                }
        
                close()
                {
                    if(this._fd === null)
                    {
                        Debug.assert(this._exception); // Websocket creation failed.
                        return;
                    }
        
                    //
                    // With Chrome (in particular on macOS) calling close() while the websocket isn't
                    // connected yet doesn't abort the connection attempt, and might result in the
                    // connection being reused by a different web socket.
                    //
                    // To workaround this problem, we always wait for the socket to be connected or
                    // closed before closing the socket.
                    //
                    // NOTE: when this workaround is no longer necessary, don't forget removing the
                    // StateClosePending state.
                    //
                    if((IsChrome || IsSafari) && this._fd.readyState === WebSocket.CONNECTING)
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
                }
        
                //
                // Returns true if all of the data was flushed to the kernel buffer.
                //
                write(byteBuffer)
                {
                    if(this._exception)
                    {
                        throw this._exception;
                    }
                    else if(byteBuffer.remaining === 0)
                    {
                        return true;
                    }
                    Debug.assert(this._fd);
        
                    const cb = () =>
                        {
                            if(this._fd)
                            {
                                const packetSize = this._maxSendPacketSize > 0 && byteBuffer.remaining > this._maxSendPacketSize ?
                                        this._maxSendPacketSize : byteBuffer.remaining;
                                if(this._fd.bufferedAmount + packetSize <= this._maxSendPacketSize)
                                {
                                    this._bytesWrittenCallback(0, 0);
                                }
                                else
                                {
                                    Timer.setTimeout(cb, this.writeReadyTimeout());
                                }
                            }
                        };
        
                    while(true)
                    {
                        const packetSize = this._maxSendPacketSize > 0 && byteBuffer.remaining > this._maxSendPacketSize ?
                            this._maxSendPacketSize : byteBuffer.remaining;
                        if(byteBuffer.remaining === 0)
                        {
                            break;
                        }
                        Debug.assert(packetSize > 0);
                        if(this._fd.bufferedAmount + packetSize > this._maxSendPacketSize)
                        {
                            Timer.setTimeout(cb, this.writeReadyTimeout());
                            return false;
                        }
                        this._writeReadyTimeout = 0;
                        const slice = byteBuffer.b.slice(byteBuffer.position, byteBuffer.position + packetSize);
                        this._fd.send(slice);
                        byteBuffer.position += packetSize;
        
                        //
                        // TODO: WORKAROUND for Safari issue. The websocket accepts all the
                        // data (bufferedAmount is always 0). We relinquish the control here
                        // to ensure timeouts work properly.
                        //
                        if(IsSafari && byteBuffer.remaining > 0)
                        {
                            Timer.setTimeout(cb, this.writeReadyTimeout());
                            return false;
                        }
                    }
                    return true;
                }
        
                read(byteBuffer, moreData)
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
        
                    let avail = this._readBuffers[0].byteLength - this._readPosition;
                    Debug.assert(avail > 0);
        
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
        
                    moreData.value = this._readBuffers.length > 0;
        
                    return byteBuffer.remaining === 0;
                }
        
                type()
                {
                    return this._secure ? "wss" : "ws";
                }
        
                getInfo()
                {
                    Debug.assert(this._fd !== null);
                    const info = new Ice.WSConnectionInfo();
                    const tcpinfo = new Ice.TCPConnectionInfo();
                    tcpinfo.localAddress = "";
                    tcpinfo.localPort = -1;
                    tcpinfo.remoteAddress = this._addr.host;
                    tcpinfo.remotePort = this._addr.port;
                    info.underlying = this._secure ? new IceSSL.ConnectionInfo(tcpinfo, tcpinfo.timeout, tcpinfo.compress) : tcpinfo;
                    info.rcvSize = -1;
                    info.sndSize = this._maxSendPacketSize;
                    info.headers = {};
                    return info;
                }
        
                checkSendSize(stream)
                {
                }
        
                setBufferSize(rcvSize, sndSize)
                {
                    this._maxSendPacketSize = sndSize;
                }
        
                toString()
                {
                    return this._desc;
                }
        
                socketConnected(e)
                {
                    if(this._state == StateClosePending)
                    {
                        this.close();
                        return;
                    }
        
                    Debug.assert(this._connectedCallback !== null);
                    this._connectedCallback();
                }
        
                socketBytesAvailable(buf)
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
                }
        
                socketClosed(err)
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
                }
        
                static createOutgoing(instance, secure, addr, resource)
                {
                    const transceiver = new WSTransceiver(instance);
                    let url = secure ? "wss" : "ws";
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
                }
            }
        
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
        }
        else
        {
            WSTransceiver = class {}
        }
        Ice.WSTransceiver = WSTransceiver;
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `EndpointInfo.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * Provides access to an SSL endpoint information.
         *
         **/
        IceSSL.EndpointInfo = class extends Ice.EndpointInfo
        {
            constructor(underlying, timeout, compress)
            {
                super(underlying, timeout, compress);
            }
        };
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Address = Ice.Address;
        const EndpointParseException = Ice.EndpointParseException;
        const HashUtil = Ice.HashUtil;
        const StringUtil = Ice.StringUtil;
        
        class IPEndpointI extends Ice.EndpointI
        {
            constructor(instance, ho, po, sa, conId)
            {
                super();
                this._instance = instance;
                this._host = ho === undefined ? null : ho;
                this._port = po === undefined ? 0 : po;
                this._sourceAddr = sa === undefined ? null : sa;
                this._connectionId = conId === undefined ? "" : conId;
            }
        
            //
            // Marshal the endpoint
            //
            streamWrite(s)
            {
                s.startEncapsulation();
                this.streamWriteImpl(s);
                s.endEncapsulation();
            }
        
            getInfo()
            {
                const info = new Ice.IPEndpointInfo();
                this.fillEndpointInfo(info);
                return info;
            }
        
            //
            // Return the endpoint type
            //
            type()
            {
                return this._instance.type();
            }
        
            //
            // Return the protocol string
            //
            protocol()
            {
                return this._instance.protocol();
            }
        
            //
            // Return true if the endpoint is secure.
            //
            secure()
            {
                return this._instance.secure();
            }
        
            connectionId()
            {
                return this._connectionId;
            }
        
            //
            // Return a new endpoint with a different connection id.
            //
            changeConnectionId(connectionId)
            {
                if(connectionId === this._connectionId)
                {
                    return this;
                }
                else
                {
                    return this.createEndpoint(this._host, this._port, connectionId);
                }
            }
        
            //
            // Return the endpoint information.
            //
            hashCode()
            {
                if(this._hashCode === undefined)
                {
                    this._hashCode = this.hashInit(5381);
                }
                return this._hashCode;
            }
        
            options()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                let s = "";
        
                if(this._host !== null && this._host.length > 0)
                {
                    s += " -h ";
                    const addQuote = this._host.indexOf(':') != -1;
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
                    s += " --sourceAddress ";
                    const addQuote = this._sourceAddr.indexOf(':') != -1;
                    if(addQuote)
                    {
                        s += "\"";
                    }
                    s += this._sourceAddr;
                    if(addQuote)
                    {
                        s += "\"";
                    }
                }
                return s;
            }
        
            compareTo(p)
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
            }
        
            getAddress()
            {
                return new Address(this._host, this._port);
            }
        
            //
            // Convert the endpoint to its Connector string form
            //
            toConnectorString()
            {
                return this._host + ":" + this._port;
            }
        
            streamWriteImpl(s)
            {
                s.writeString(this._host);
                s.writeInt(this._port);
            }
        
            hashInit(h)
            {
                h = HashUtil.addNumber(h, this.type());
                h = HashUtil.addString(h, this._host);
                h = HashUtil.addNumber(h, this._port);
                h = HashUtil.addString(h, this._sourceAddr);
                h = HashUtil.addString(h, this._connectionId);
                return h;
            }
        
            fillEndpointInfo(info)
            {
                info.type = () => this.type();
                info.datagram = () => this.datagram();
                info.secure = () => this.secure();
                info.host = this._host;
                info.port = this._port;
                info.sourceAddress = this._sourceAddr;
            }
        
            initWithOptions(args, oaEndpoint)
            {
                super.initWithOptions(args);
        
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
            }
        
            initWithStream(s)
            {
                this._host = s.readString();
                this._port = s.readInt();
            }
        
            checkOption(option, argument, str)
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
        }
        
        Ice.IPEndpointI = IPEndpointI;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `FacetMap.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        Slice.defineDictionary(Ice, "FacetMap", "FacetMapHelper", "Ice.StringHelper", "Ice.ObjectHelper", false, undefined, "Ice.Value");
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        
        const Debug = Ice.Debug;
        const HashUtil = Ice.HashUtil;
        const StringUtil = Ice.StringUtil;
        
        const TcpTransceiver = typeof Ice.TcpTransceiver !== "undefined" ? Ice.TcpTransceiver : null;
        
        class TcpEndpointI extends Ice.IPEndpointI
        {
            constructor(instance, ho, po, sif, ti, conId, co)
            {
                super(instance, ho, po, sif, conId);
                this._timeout = ti === undefined ? (instance ? instance.defaultTimeout() : undefined) : ti;
                this._compress = co === undefined ? false : co;
            }
        
            //
            // Return the endpoint information.
            //
            getInfo()
            {
                const info = new Ice.TCPEndpointInfo();
                this.fillEndpointInfo(info);
                return this.secure() ? new IceSSL.EndpointInfo(info, info.timeout, info.compress) : info;
            }
        
            //
            // Return the timeout for the endpoint in milliseconds. 0 means
            // non-blocking, -1 means no timeout.
            //
            timeout()
            {
                return this._timeout;
            }
        
            //
            // Return a new endpoint with a different timeout value, provided
            // that timeouts are supported by the endpoint. Otherwise the same
            // endpoint is returned.
            //
            changeTimeout(timeout)
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
            }
        
            //
            // Return a new endpoint with a different connection id.
            //
            changeConnectionId(connectionId)
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
            }
        
            //
            // Return true if the endpoints support bzip2 compress, or false
            // otherwise.
            //
            compress()
            {
                return this._compress;
            }
        
            //
            // Return a new endpoint with a different compression value,
            // provided that compression is supported by the
            // endpoint. Otherwise the same endpoint is returned.
            //
            changeCompress(compress)
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
            }
        
            //
            // Return true if the endpoint is datagram-based.
            //
            datagram()
            {
                return false;
            }
        
            connectable()
            {
                //
                // TCP endpoints are not connectable when running in a browser, SSL
                // isn't currently supported.
                //
                return typeof process !== 'undefined' && !this.secure();
            }
        
            connect()
            {
                Debug.assert(!this.secure());
                return TcpTransceiver.createOutgoing(this._instance, this.getAddress(), this._sourceAddr);
            }
        
            //
            // Convert the endpoint to its string form
            //
            options()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                let s = super.options();
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
            }
        
            compareTo(p)
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
        
                return super.compareTo(p);
            }
        
            streamWriteImpl(s)
            {
                super.streamWriteImpl(s);
                s.writeInt(this._timeout);
                s.writeBool(this._compress);
            }
        
            hashInit(h)
            {
                h = super.hashInit(h);
                h = HashUtil.addNumber(h, this._timeout);
                h = HashUtil.addBoolean(h, this._compress);
                return h;
            }
        
            fillEndpointInfo(info)
            {
                super.fillEndpointInfo(info);
                info.timeout = this._timeout;
                info.compress = this._compress;
            }
        
            initWithStream(s)
            {
                super.initWithStream(s);
                this._timeout = s.readInt();
                this._compress = s.readBool();
            }
        
            checkOption(option, argument, endpoint)
            {
                if(super.checkOption(option, argument, endpoint))
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
                        let invalid = false;
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
            }
        
            createEndpoint(host, port, conId)
            {
                return new TcpEndpointI(this._instance, host, port, this._sourceAddr, this._timeout, conId, this._compress);
            }
        }
        
        Ice.TcpEndpointI = TcpEndpointI;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Locator.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * This exception is raised if an adapter cannot be found.
         *
         **/
        Ice.AdapterNotFoundException = class extends Ice.UserException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.UserException;
            }
        
            static get _id()
            {
                return "::Ice::AdapterNotFoundException";
            }
        
            _mostDerivedType()
            {
                return Ice.AdapterNotFoundException;
            }
        };
        
        /**
         * This exception is raised if the replica group provided by the
         * server is invalid.
         *
         **/
        Ice.InvalidReplicaGroupIdException = class extends Ice.UserException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.UserException;
            }
        
            static get _id()
            {
                return "::Ice::InvalidReplicaGroupIdException";
            }
        
            _mostDerivedType()
            {
                return Ice.InvalidReplicaGroupIdException;
            }
        };
        
        /**
         * This exception is raised if a server tries to set endpoints for
         * an adapter that is already active.
         *
         **/
        Ice.AdapterAlreadyActiveException = class extends Ice.UserException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.UserException;
            }
        
            static get _id()
            {
                return "::Ice::AdapterAlreadyActiveException";
            }
        
            _mostDerivedType()
            {
                return Ice.AdapterAlreadyActiveException;
            }
        };
        
        /**
         * This exception is raised if an object cannot be found.
         *
         **/
        Ice.ObjectNotFoundException = class extends Ice.UserException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.UserException;
            }
        
            static get _id()
            {
                return "::Ice::ObjectNotFoundException";
            }
        
            _mostDerivedType()
            {
                return Ice.ObjectNotFoundException;
            }
        };
        
        /**
         * This exception is raised if a server cannot be found.
         *
         **/
        Ice.ServerNotFoundException = class extends Ice.UserException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.UserException;
            }
        
            static get _id()
            {
                return "::Ice::ServerNotFoundException";
            }
        
            _mostDerivedType()
            {
                return Ice.ServerNotFoundException;
            }
        };
        
        const iceC_Ice_Locator_ids = [
            "::Ice::Locator",
            "::Ice::Object"
        ];
        
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
        Ice.Locator = class extends Ice.Object
        {
        };
        
        Ice.LocatorPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.Locator, Ice.LocatorPrx, iceC_Ice_Locator_ids, 0,
        {
            "findObjectById": [, 2, 1, , [9], [[Ice.Identity]], ,
            [
                Ice.ObjectNotFoundException
            ], , ],
            "findAdapterById": [, 2, 1, , [9], [[7]], ,
            [
                Ice.AdapterNotFoundException
            ], , ],
            "getRegistry": [, 2, 1, , ["Ice.LocatorRegistryPrx"], , , , , ]
        });
        
        const iceC_Ice_LocatorRegistry_ids = [
            "::Ice::LocatorRegistry",
            "::Ice::Object"
        ];
        
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
        Ice.LocatorRegistry = class extends Ice.Object
        {
        };
        
        Ice.LocatorRegistryPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.LocatorRegistry, Ice.LocatorRegistryPrx, iceC_Ice_LocatorRegistry_ids, 0,
        {
            "setAdapterDirectProxy": [, 2, 2, , , [[7], [9]], ,
            [
                Ice.AdapterAlreadyActiveException,
                Ice.AdapterNotFoundException
            ], , ],
            "setReplicatedAdapterDirectProxy": [, 2, 2, , , [[7], [7], [9]], ,
            [
                Ice.AdapterAlreadyActiveException,
                Ice.AdapterNotFoundException,
                Ice.InvalidReplicaGroupIdException
            ], , ],
            "setServerProcessProxy": [, 2, 2, , , [[7], ["Ice.ProcessPrx"]], ,
            [
                Ice.ServerNotFoundException
            ], , ]
        });
        
        const iceC_Ice_LocatorFinder_ids = [
            "::Ice::LocatorFinder",
            "::Ice::Object"
        ];
        
        /**
         * This inferface should be implemented by services implementing the
         * Ice::Locator interface. It should be advertised through an Ice
         * object with the identity `Ice/LocatorFinder'. This allows clients
         * to retrieve the locator proxy with just the endpoint information of
         * the service.
         *
         **/
        Ice.LocatorFinder = class extends Ice.Object
        {
        };
        
        Ice.LocatorFinderPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.LocatorFinder, Ice.LocatorFinderPrx, iceC_Ice_LocatorFinder_ids, 0,
        {
            "getLocator": [, , , , ["Ice.LocatorPrx"], , , , , ]
        });
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const AsyncResultBase = Ice.AsyncResultBase;
        const ConnectionI = Ice.ConnectionI;
        const Debug = Ice.Debug;
        const FactoryACMMonitor = Ice.FactoryACMMonitor;
        const HashMap = Ice.HashMap;
        
        //
        // Only for use by Instance.
        //
        class OutgoingConnectionFactory
        {
            constructor(communicator, instance)
            {
                this._communicator = communicator;
                this._instance = instance;
                this._destroyed = false;
        
                this._monitor = new FactoryACMMonitor(this._instance, this._instance.clientACM());
        
                this._connectionsByEndpoint = new ConnectionListMap(); // map<EndpointI, Array<Ice.ConnectionI>>
                this._pending = new HashMap(HashMap.compareEquals); // map<EndpointI, Array<ConnectCallback>>
                this._pendingConnectCount = 0;
        
                this._waitPromise = null;
            }
        
            destroy()
            {
                if(this._destroyed)
                {
                    return;
                }
        
                this._connectionsByEndpoint.forEach(connection => connection.destroy(ConnectionI.CommunicatorDestroyed));
        
                this._destroyed = true;
                this._communicator = null;
                this.checkFinished();
            }
        
            waitUntilFinished()
            {
                this._waitPromise = new Ice.Promise();
                this.checkFinished();
                return this._waitPromise;
            }
        
            //
            // Returns a promise, success callback receives the connection
            //
            create(endpts, hasMore, selType)
            {
                Debug.assert(endpts.length > 0);
        
                //
                // Apply the overrides.
                //
                const endpoints = this.applyOverrides(endpts);
        
                //
                // Try to find a connection to one of the given endpoints.
                //
                try
                {
                    const connection = this.findConnectionByEndpoint(endpoints);
                    if(connection !== null)
                    {
                        return Ice.Promise.resolve(connection);
                    }
                }
                catch(ex)
                {
                    return Ice.Promise.reject(ex);
                }
        
                return new ConnectCallback(this, endpoints, hasMore, selType).start();
            }
        
            setRouterInfo(routerInfo)
            {
                return Ice.Promise.try(() =>
                    {
                        if(this._destroyed)
                        {
                            throw new Ice.CommunicatorDestroyedException();
                        }
                        return routerInfo.getClientEndpoints();
                    }
                ).then(
                    endpoints =>
                    {
                        //
                        // Search for connections to the router's client proxy
                        // endpoints, and update the object adapter for such
                        // connections, so that callbacks from the router can be
                        // received over such connections.
                        //
                        const adapter = routerInfo.getAdapter();
                        const defaultsAndOverrides = this._instance.defaultsAndOverrides();
                        endpoints.forEach(endpoint =>
                        {
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
        
                            this._connectionsByEndpoint.forEach(connection =>
                                                                {
                                                                    if(connection.endpoint().equals(endpoint))
                                                                    {
                                                                        connection.setAdapter(adapter);
                                                                    }
                                                                });
                        });
                    });
            }
        
            removeAdapter(adapter)
            {
                if(this._destroyed)
                {
                    return;
                }
                this._connectionsByEndpoint.forEach(connection =>
                                                    {
                                                        if(connection.getAdapter() === adapter)
                                                        {
                                                            connection.setAdapter(null);
                                                        }
                                                    });
            }
        
            flushAsyncBatchRequests()
            {
                const promise = new AsyncResultBase(this._communicator, "flushBatchRequests", null, null, null);
                if(this._destroyed)
                {
                    promise.resolve();
                    return promise;
                }
        
                Ice.Promise.all(
                    this._connectionsByEndpoint.map(
                        connection =>
                        {
                            if(connection.isActiveOrHolding())
                            {
                                return connection.flushBatchRequests().catch(
                                    ex =>
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
                        })).then(promise.resolve, promise.reject);
                return promise;
            }
        
            applyOverrides(endpts)
            {
                const defaultsAndOverrides = this._instance.defaultsAndOverrides();
                return endpts.map(
                    endpoint =>
                        {
                            if(defaultsAndOverrides.overrideTimeout)
                            {
                                return endpoint.changeTimeout(defaultsAndOverrides.overrideTimeoutValue);
                            }
                            else
                            {
                                return endpoint;
                            }
                        });
            }
        
            findConnectionByEndpoint(endpoints)
            {
                if(this._destroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(endpoints.length > 0);
        
                for(let i = 0; i < endpoints.length; ++i)
                {
                    const endpoint = endpoints[i];
        
                    if(this._pending.has(endpoint))
                    {
                        continue;
                    }
        
                    const connectionList = this._connectionsByEndpoint.get(endpoint);
                    if(connectionList === undefined)
                    {
                        continue;
                    }
        
                    for(let j = 0; j < connectionList.length; ++j)
                    {
                        if(connectionList[j].isActiveOrHolding()) // Don't return destroyed or un-validated connections
                        {
                            return connectionList[j];
                        }
                    }
                }
        
                return null;
            }
        
            incPendingConnectCount()
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
            }
        
            decPendingConnectCount()
            {
                --this._pendingConnectCount;
                Debug.assert(this._pendingConnectCount >= 0);
                if(this._destroyed && this._pendingConnectCount === 0)
                {
                    this.checkFinished();
                }
            }
        
            getConnection(endpoints, cb)
            {
                if(this._destroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                //
                // Reap closed connections
                //
                const cons = this._monitor.swapReapedConnections();
                if(cons !== null)
                {
                    cons.forEach(c =>
                        {
                            this._connectionsByEndpoint.removeConnection(c.endpoint(), c);
                            this._connectionsByEndpoint.removeConnection(c.endpoint().changeCompress(true), c);
                        });
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
                    const connection = this.findConnectionByEndpoint(endpoints);
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
            }
        
            createConnection(transceiver, endpoint)
            {
                Debug.assert(this._pending.has(endpoint) && transceiver !== null);
        
                //
                // Create and add the connection to the connection map. Adding the connection to the map
                // is necessary to support the interruption of the connection initialization and validation
                // in case the communicator is destroyed.
                //
                let connection = null;
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
            }
        
            finishGetConnection(endpoints, endpoint, connection, cb)
            {
                // cb is-a ConnectCallback
        
                const connectionCallbacks = [];
                if(cb !== null)
                {
                    connectionCallbacks.push(cb);
                }
        
                const callbacks = [];
                endpoints.forEach(endpt =>
                    {
                        const cbs = this._pending.get(endpt);
                        if(cbs !== undefined)
                        {
                            this._pending.delete(endpt);
                            cbs.forEach(cc =>
                                {
                                    if(cc.hasEndpoint(endpoint))
                                    {
                                        if(connectionCallbacks.indexOf(cc) === -1)
                                        {
                                            connectionCallbacks.push(cc);
                                        }
                                    }
                                    else if(callbacks.indexOf(cc) === -1)
                                    {
                                        callbacks.push(cc);
                                    }
                                });
                        }
                    });
        
                connectionCallbacks.forEach(cc =>
                    {
                        cc.removeFromPending();
                        const idx = callbacks.indexOf(cc);
                        if(idx !== -1)
                        {
                            callbacks.splice(idx, 1);
                        }
                    });
        
                callbacks.forEach(cc => cc.removeFromPending());
        
                callbacks.forEach(cc => cc.getConnection());
                connectionCallbacks.forEach(cc => cc.setConnection(connection));
        
                this.checkFinished();
            }
        
            finishGetConnectionEx(endpoints, ex, cb)
            {
                // cb is-a ConnectCallback
        
                const failedCallbacks = [];
                if(cb !== null)
                {
                    failedCallbacks.push(cb);
                }
        
                const callbacks = [];
                endpoints.forEach(endpt =>
                    {
                        const cbs = this._pending.get(endpt);
                        if(cbs !== undefined)
                        {
                            this._pending.delete(endpt);
                            cbs.forEach(cc =>
                                {
                                    if(cc.removeEndpoints(endpoints))
                                    {
                                        if(failedCallbacks.indexOf(cc) === -1)
                                        {
                                            failedCallbacks.push(cc);
                                        }
                                    }
                                    else if(callbacks.indexOf(cc) === -1)
                                    {
                                        callbacks.push(cc);
                                    }
                                });
                        }
                    });
        
                callbacks.forEach(cc =>
                    {
                        Debug.assert(failedCallbacks.indexOf(cc) === -1);
                        cc.removeFromPending();
                    });
                this.checkFinished();
                callbacks.forEach(cc => cc.getConnection());
                failedCallbacks.forEach(cc => cc.setException(ex));
            }
        
            addToPending(cb, endpoints)
            {
                // cb is-a ConnectCallback
        
                //
                // Add the callback to each pending list.
                //
                let found = false;
                if(cb !== null)
                {
                    endpoints.forEach(p =>
                        {
                            const cbs = this._pending.get(p);
                            if(cbs !== undefined)
                            {
                                found = true;
                                if(cbs.indexOf(cb) === -1)
                                {
                                    cbs.push(cb); // Add the callback to each pending endpoint.
                                }
                            }
                        });
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
                endpoints.forEach(p =>
                    {
                        if(!this._pending.has(p))
                        {
                            this._pending.set(p, []);
                        }
                    });
        
                return false;
            }
        
            removeFromPending(cb, endpoints)
            {
                // cb is-a ConnectCallback
                endpoints.forEach(p =>
                    {
                        const cbs = this._pending.get(p);
                        if(cbs !== undefined)
                        {
                            const idx = cbs.indexOf(cb);
                            if(idx !== -1)
                            {
                                cbs.splice(idx, 1);
                            }
                        }
                    });
            }
        
            handleConnectionException(ex, hasMore)
            {
                const traceLevels = this._instance.traceLevels();
                if(traceLevels.network >= 2)
                {
                    const s = [];
                    s.push("connection to endpoint failed");
                    if(ex instanceof Ice.CommunicatorDestroyedException)
                    {
                        s.push("\n");
                    }
                    else if(hasMore)
                    {
                        s.push(", trying next endpoint\n");
                    }
                    else
                    {
                        s.push(" and no more endpoints to try\n");
                    }
                    s.push(ex.toString());
                    this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                }
            }
        
            handleException(ex, hasMore)
            {
                const traceLevels = this._instance.traceLevels();
                if(traceLevels.network >= 2)
                {
                    const s = [];
                    s.push("couldn't resolve endpoint host");
                    if(ex instanceof Ice.CommunicatorDestroyedException)
                    {
                        s.push("\n");
                    }
                    else if(hasMore)
                    {
                        s.push(", trying next endpoint\n");
                    }
                    else
                    {
                        s.push(" and no more endpoints to try\n");
                    }
                    s.push(ex.toString());
                    this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                }
            }
        
            checkFinished()
            {
                //
                // Can't continue until the factory is destroyed and there are no pending connections.
                //
                if(!this._waitPromise || !this._destroyed || this._pending.size > 0 || this._pendingConnectCount > 0)
                {
                    return;
                }
        
                Ice.Promise.all(
                    this._connectionsByEndpoint.map(
                        connection => connection.waitUntilFinished().catch(ex => Debug.assert(false)))
                ).then(
                    () =>
                    {
                        const cons = this._monitor.swapReapedConnections();
                        if(cons !== null)
                        {
                            const arr = [];
                            this._connectionsByEndpoint.forEach(connection =>
                            {
                                if(arr.indexOf(connection) === -1)
                                {
                                    arr.push(connection);
                                }
                            });
                            Debug.assert(cons.length === arr.length);
                            this._connectionsByEndpoint.clear();
                        }
                        else
                        {
                            Debug.assert(this._connectionsByEndpoint.size === 0);
                        }
        
                        Debug.assert(this._waitPromise !== null);
                        this._waitPromise.resolve();
                        this._monitor.destroy();
                    });
            }
        }
        
        Ice.OutgoingConnectionFactory = OutgoingConnectionFactory;
        
        //
        // Value is a Vector<Ice.ConnectionI>
        //
        class ConnectionListMap extends HashMap
        {
            constructor(h)
            {
                super(h || HashMap.compareEquals);
            }
        
            set(key, value)
            {
                let list = this.get(key);
                if(list === undefined)
                {
                    list = [];
                    super.set(key, list);
                }
                Debug.assert(value instanceof ConnectionI);
                list.push(value);
                return undefined;
            }
        
            removeConnection(key, conn)
            {
                const list = this.get(key);
                Debug.assert(list !== null);
                const idx = list.indexOf(conn);
                Debug.assert(idx !== -1);
                list.splice(idx, 1);
                if(list.length === 0)
                {
                    this.delete(key);
                }
            }
        
            map(fn)
            {
                const arr = [];
                this.forEach(c => arr.push(fn(c)));
                return arr;
            }
        
            forEach(fn)
            {
                for(const connections of this.values())
                {
                    connections.forEach(fn);
                }
            }
        }
        
        class ConnectCallback
        {
            constructor(f, endpoints, more, selType)
            {
                this._factory = f;
                this._endpoints = endpoints;
                this._hasMore = more;
                this._selType = selType;
                this._promise = new Ice.Promise();
                this._index = 0;
                this._current = null;
            }
        
            //
            // Methods from ConnectionI_StartCallback
            //
            connectionStartCompleted(connection)
            {
                connection.activate();
                this._factory.finishGetConnection(this._endpoints, this._current, connection, this);
            }
        
            connectionStartFailed(connection, ex)
            {
                Debug.assert(this._current !== null);
                if(this.connectionStartFailedImpl(ex))
                {
                    this.nextEndpoint();
                }
            }
        
            setConnection(connection)
            {
                //
                // Callback from the factory: the connection to one of the callback
                // connectors has been established.
                //
                this._promise.resolve(connection);
                this._factory.decPendingConnectCount(); // Must be called last.
            }
        
            setException(ex)
            {
                //
                // Callback from the factory: connection establishment failed.
                //
                this._promise.reject(ex);
                this._factory.decPendingConnectCount(); // Must be called last.
            }
        
            hasEndpoint(endpoint)
            {
                return this.findEndpoint(endpoint) !== -1;
            }
        
            findEndpoint(endpoint)
            {
                return this._endpoints.findIndex(value => endpoint.equals(value));
            }
        
            removeEndpoints(endpoints)
            {
                endpoints.forEach(endpoint =>
                    {
                        const idx = this.findEndpoint(endpoint);
                        if(idx !== -1)
                        {
                            this._endpoints.splice(idx, 1);
                        }
                    });
                this._index = 0;
                return this._endpoints.length === 0;
            }
        
            removeFromPending()
            {
                this._factory.removeFromPending(this, this._endpoints);
            }
        
            start()
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
                    this._promise.reject(ex);
                    return;
                }
        
                this.getConnection();
                return this._promise;
            }
        
            getConnection()
            {
                try
                {
                    //
                    // Ask the factory to get a connection.
                    //
                    const connection = this._factory.getConnection(this._endpoints, this);
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
        
                    this._promise.resolve(connection);
                    this._factory.decPendingConnectCount(); // Must be called last.
                }
                catch(ex)
                {
                    this._promise.reject(ex);
                    this._factory.decPendingConnectCount(); // Must be called last.
                }
            }
        
            nextEndpoint()
            {
        
                const start = connection =>
                    {
                        connection.start().then(
                            () =>
                            {
                                this.connectionStartCompleted(connection);
                            },
                            ex =>
                            {
                                this.connectionStartFailed(connection, ex);
                            });
                    };
        
                while(true)
                {
                    const traceLevels = this._factory._instance.traceLevels();
                    try
                    {
                        Debug.assert(this._index < this._endpoints.length);
                        this._current = this._endpoints[this._index++];
        
                        if(traceLevels.network >= 2)
                        {
                            const s = [];
                            s.push("trying to establish ");
                            s.push(this._current.protocol());
                            s.push(" connection to ");
                            s.push(this._current.toConnectorString());
                            this._factory._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                        }
        
                        start(this._factory.createConnection(this._current.connect(), this._current));
                    }
                    catch(ex)
                    {
                        if(traceLevels.network >= 2)
                        {
                            const s = [];
                            s.push("failed to establish ");
                            s.push(this._current.protocol());
                            s.push(" connection to ");
                            s.push(this._current.toString());
                            s.push("\n");
                            s.push(ex.toString());
                            this._factory._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
                        }
        
                        if(this.connectionStartFailedImpl(ex))
                        {
                            continue;
                        }
                    }
                    break;
                }
            }
        
            connectionStartFailedImpl(ex)
            {
                if(ex instanceof Ice.LocalException)
                {
                    this._factory.handleConnectionException(ex, this._hasMore || this._index < this._endpoints.length);
                    if(ex instanceof Ice.CommunicatorDestroyedException) // No need to continue.
                    {
                        this._factory.finishGetConnectionEx(this._endpoints, ex, this);
                    }
                    else if(this._index < this._endpoints.length) // Try the next endpoint.
                    {
                        return true;
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
                return false;
            }
        }
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Context = Ice.Context;
        const InitializationException = Ice.InitializationException;
        
        //
        // The base class for all ImplicitContext implementations
        //
        class ImplicitContextI
        {
            constructor()
            {
                this._context = new Context();
            }
        
            getContext()
            {
                return new Context(this._context);
            }
        
            setContext(context)
            {
                if(context !== null && context.size > 0)
                {
                    this._context = new Context(context);
                }
                else
                {
                    this._context.clear();
                }
            }
        
            containsKey(key)
            {
                if(key === null)
                {
                    key = "";
                }
        
                return this._context.has(key);
            }
        
            get(key)
            {
                if(key === null)
                {
                    key = "";
                }
        
                let val = this._context.get(key);
                if(val === null)
                {
                    val = "";
                }
        
                return val;
            }
        
            put(key, value)
            {
                if(key === null)
                {
                    key = "";
                }
                if(value === null)
                {
                    value = "";
                }
        
                let oldVal = this._context.get(key);
                if(oldVal === null)
                {
                    oldVal = "";
                }
        
                this._context.set(key, value);
        
                return oldVal;
            }
        
            remove(key)
            {
                if(key === null)
                {
                    key = "";
                }
        
                let val = this._context.get(key);
                this._context.delete(key);
        
                if(val === null)
                {
                    val = "";
                }
                return val;
            }
        
            write(prxContext, os)
            {
                if(prxContext.size === 0)
                {
                    Ice.ContextHelper.write(os, this._context);
                }
                else
                {
                    let ctx = null;
                    if(this._context.size === 0)
                    {
                        ctx = prxContext;
                    }
                    else
                    {
                        ctx = new Context(this._context);
                        for(const [key, value] of prxContext)
                        {
                            ctx.set(key, value);
                        }
                    }
                    Ice.ContextHelper.write(os, ctx);
                }
            }
        
            static create(kind)
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
            }
        }
        
        Ice.ImplicitContextI = ImplicitContextI;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ImplicitContextF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const ArrayUtil = Ice.ArrayUtil;
        const BatchRequestQueue = Ice.BatchRequestQueue;
        const ConnectionRequestHandler = Ice.ConnectionRequestHandler;
        const Debug = Ice.Debug;
        const EndpointSelectionType = Ice.EndpointSelectionType;
        const HashUtil = Ice.HashUtil;
        const Identity = Ice.Identity;
        const LocatorPrx = Ice.LocatorPrx;
        const MapUtil = Ice.MapUtil;
        const OpaqueEndpointI = Ice.OpaqueEndpointI;
        const PropertyNames = Ice.PropertyNames;
        const RefMode = Ice.ReferenceMode;
        const RouterPrx = Ice.RouterPrx;
        const StringSeqHelper = Ice.StringSeqHelper;
        const StringUtil = Ice.StringUtil;
        
        const suffixes =
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
        class ReferenceFactory
        {
            constructor(instance, communicator)
            {
                this._instance = instance;
                this._communicator = communicator;
                this._defaultRouter = null;
                this._defaultLocator = null;
            }
        
            create(ident, facet, tmpl, endpoints)
            {
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
        
                return this.createImpl(ident, facet, tmpl.getMode(), tmpl.getSecure(), tmpl.getProtocol(), tmpl.getEncoding(),
                                       endpoints, null, null);
            }
        
            createWithAdapterId(ident, facet, tmpl, adapterId)
            {
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
        
                return this.createImpl(ident, facet, tmpl.getMode(), tmpl.getSecure(), tmpl.getProtocol(), tmpl.getEncoding(),
                                       null, adapterId, null);
            }
        
            createFixed(ident, fixedConnection)
            {
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
        
                //
                // Create new reference
                //
                return new FixedReference(
                    this._instance,
                    this._communicator,
                    ident,
                    "", // Facet
                    fixedConnection.endpoint().datagram() ? RefMode.ModeDatagram : RefMode.ModeTwoway,
                    fixedConnection.endpoint().secure(),
                    Ice.Protocol_1_0,
                    this._instance.defaultsAndOverrides().defaultEncoding,
                    fixedConnection,
                    -1,
                    null);
            }
        
            copy(r)
            {
                const ident = r.getIdentity();
                if(ident.name.length === 0 && ident.category.length === 0)
                {
                    return null;
                }
                return r.clone();
            }
        
            createFromString(s, propertyPrefix)
            {
                if(s === undefined || s === null || s.length === 0)
                {
                    return null;
                }
        
                const delim = " \t\n\r";
        
                let end = 0;
                let beg = StringUtil.findFirstNotOf(s, delim, end);
                if(beg == -1)
                {
                    throw new Ice.ProxyParseException("no non-whitespace characters found in `" + s + "'");
                }
        
                //
                // Extract the identity, which may be enclosed in single
                // or double quotation marks.
                //
                let idstr = null;
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
                const ident = Ice.stringToIdentity(idstr);
        
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
        
                let facet = "";
                let mode = RefMode.ModeTwoway;
                let secure = false;
                let encoding = this._instance.defaultsAndOverrides().defaultEncoding;
                let protocol = Ice.Protocol_1_0;
                let adapter = "";
        
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
        
                    const option = s.substring(beg, end);
                    if(option.length != 2 || option.charAt(0) != '-')
                    {
                        throw new Ice.ProxyParseException("expected a proxy option but found `" + option + "' in `" + s + "'");
                    }
        
                    //
                    // Check for the presence of an option argument. The
                    // argument may be enclosed in single or double
                    // quotation marks.
                    //
                    let argument = null;
                    const argumentBeg = StringUtil.findFirstNotOf(s, delim, end);
                    if(argumentBeg != -1)
                    {
                        const ch = s.charAt(argumentBeg);
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
        
                const endpoints = [];
        
                if(s.charAt(beg) == ':')
                {
                    const unknownEndpoints = [];
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
                                let quoted = false;
                                let quote = beg;
                                while(true)
                                {
                                    quote = s.indexOf("\"", quote);
                                    if(quote == -1 || end < quote)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        quote = s.indexOf("\"", ++quote);
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
        
                        const es = s.substring(beg, end);
                        const endp = this._instance.endpointFactoryManager().create(es, false);
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
                        const msg = [];
                        msg.push("Proxy contains unknown endpoints:");
                        unknownEndpoints.forEach(unknownEndpoint =>
                            {
                                msg.push(" `");
                                msg.push(unknownEndpoint);
                                msg.push("'");
                            });
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
        
                    let adapterstr = null;
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
            }
        
            createFromStream(ident, s)
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
                const facetPath = StringSeqHelper.read(s); // String[]
                let facet;
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
        
                const mode = s.readByte();
                if(mode < 0 || mode > RefMode.ModeLast)
                {
                    throw new Ice.ProxyUnmarshalException();
                }
        
                const secure = s.readBool();
        
                let protocol = null;
                let encoding = null;
                if(!s.getEncoding().equals(Ice.Encoding_1_0))
                {
                    protocol = new Ice.ProtocolVersion();
                    protocol._read(s);
                    encoding = new Ice.EncodingVersion();
                    encoding._read(s);
                }
                else
                {
                    protocol = Ice.Protocol_1_0;
                    encoding = Ice.Encoding_1_0;
                }
        
                let endpoints = null; // EndpointI[]
                let adapterId = null;
        
                const sz = s.readSize();
                if(sz > 0)
                {
                    endpoints = [];
                    for(let i = 0; i < sz; i++)
                    {
                        endpoints[i] = this._instance.endpointFactoryManager().read(s);
                    }
                }
                else
                {
                    adapterId = s.readString();
                }
        
                return this.createImpl(ident, facet, mode, secure, protocol, encoding, endpoints, adapterId, null);
            }
        
            setDefaultRouter(defaultRouter)
            {
                if(this._defaultRouter === null ? defaultRouter === null : this._defaultRouter.equals(defaultRouter))
                {
                    return this;
                }
        
                const factory = new ReferenceFactory(this._instance, this._communicator);
                factory._defaultLocator = this._defaultLocator;
                factory._defaultRouter = defaultRouter;
                return factory;
            }
        
            getDefaultRouter()
            {
                return this._defaultRouter;
            }
        
            setDefaultLocator(defaultLocator)
            {
                if(this._defaultLocator === null ? defaultLocator === null : this._defaultLocator.equals(defaultLocator))
                {
                    return this;
                }
        
                const factory = new ReferenceFactory(this._instance, this._communicator);
                factory._defaultRouter = this._defaultRouter;
                factory._defaultLocator = defaultLocator;
                return factory;
            }
        
            getDefaultLocator()
            {
                return this._defaultLocator;
            }
        
            checkForUnknownProperties(prefix)
            {
                let unknownProps = [];
                //
                // Do not warn about unknown properties for Ice prefixes (Ice, Glacier2, etc.)
                //
                for(let i = 0; i < PropertyNames.clPropNames.length; ++i)
                {
                    if(prefix.indexOf(PropertyNames.clPropNames[i] + ".") === 0)
                    {
                        return;
                    }
                }
        
                const properties = this._instance.initializationData().properties.getPropertiesForPrefix(prefix + ".");
                unknownProps = unknownProps.concat(Array.from(properties.keys()).filter(
                    key => !suffixes.some(suffix => key === prefix + "." + suffix)));
                if(unknownProps.length > 0)
                {
                    const message = [];
                    message.push("found unknown properties for proxy '");
                    message.push(prefix);
                    message.push("':");
                    unknownProps.forEach(unknownProp => message.push("\n    ", unknownProp));
                    this._instance.initializationData().logger.warning(message.join(""));
                }
            }
        
            createImpl(ident, facet, mode, secure, protocol, encoding, endpoints, adapterId, propertyPrefix)
            {
                const defaultsAndOverrides = this._instance.defaultsAndOverrides();
        
                //
                // Default local proxy options.
                //
                let locatorInfo = null;
                if(this._defaultLocator !== null)
                {
                    if(!this._defaultLocator._getReference().getEncoding().equals(encoding))
                    {
                        locatorInfo = this._instance.locatorManager().find(
                            this._defaultLocator.ice_encodingVersion(encoding));
                    }
                    else
                    {
                        locatorInfo = this._instance.locatorManager().find(this._defaultLocator);
                    }
                }
                let routerInfo = this._instance.routerManager().find(this._defaultRouter);
                let cacheConnection = true;
                let preferSecure = defaultsAndOverrides.defaultPreferSecure;
                let endpointSelection = defaultsAndOverrides.defaultEndpointSelection;
                let locatorCacheTimeout = defaultsAndOverrides.defaultLocatorCacheTimeout;
                let invocationTimeout = defaultsAndOverrides.defaultInvocationTimeout;
        
                //
                // Override the defaults with the proxy properties if a property prefix is defined.
                //
                if(propertyPrefix !== null && propertyPrefix.length > 0)
                {
                    const properties = this._instance.initializationData().properties;
        
                    //
                    // Warn about unknown properties.
                    //
                    if(properties.getPropertyAsIntWithDefault("Ice.Warn.UnknownProperties", 1) > 0)
                    {
                        this.checkForUnknownProperties(propertyPrefix);
                    }
        
                    let property = propertyPrefix + ".Locator";
                    const locator = LocatorPrx.uncheckedCast(this._communicator.propertyToProxy(property));
                    if(locator !== null)
                    {
                        if(!locator._getReference().getEncoding().equals(encoding))
                        {
                            locatorInfo = this._instance.locatorManager().find(locator.ice_encodingVersion(encoding));
                        }
                        else
                        {
                            locatorInfo = this._instance.locatorManager().find(locator);
                        }
                    }
        
                    property = propertyPrefix + ".Router";
                    const router = RouterPrx.uncheckedCast(this._communicator.propertyToProxy(property));
                    if(router !== null)
                    {
                        if(propertyPrefix.endsWith("Router"))
                        {
                            this._instance.initializationData().logger.warning(
                                "`" + property + "=" + properties.getProperty(property) +
                                "': cannot set a router on a router; setting ignored");
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
                        const type = properties.getProperty(property);
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
                    let value = properties.getProperty(property);
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
        }
        
        Ice.ReferenceFactory = ReferenceFactory;
        
        class Reference
        {
            constructor(instance, communicator, identity, facet, mode, secure, protocol, encoding, invocationTimeout, context)
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
                this._context = context === undefined ? Reference._emptyContext : context;
                this._facet = facet;
                this._protocol = protocol;
                this._encoding = encoding;
                this._invocationTimeout = invocationTimeout;
                this._hashInitialized = false;
            }
        
            getMode()
            {
                return this._mode;
            }
        
            getSecure()
            {
                return this._secure;
            }
        
            getProtocol()
            {
                return this._protocol;
            }
        
            getEncoding()
            {
                return this._encoding;
            }
        
            getIdentity()
            {
                return this._identity;
            }
        
            getFacet()
            {
                return this._facet;
            }
        
            getInstance()
            {
                return this._instance;
            }
        
            getContext()
            {
                return this._context; // Map
            }
        
            getInvocationTimeout()
            {
                return this._invocationTimeout;
            }
        
            getCommunicator()
            {
                return this._communicator;
            }
        
            getEndpoints()
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            getAdapterId()
            {
                // Abstract
                Debug.assert(false);
                return "";
            }
        
            getRouterInfo()
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            getLocatorInfo()
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            getCacheConnection()
            {
                // Abstract
                Debug.assert(false);
                return false;
            }
        
            getPreferSecure()
            {
                // Abstract
                Debug.assert(false);
                return false;
            }
        
            getEndpointSelection()
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            getLocatorCacheTimeout()
            {
                // Abstract
                Debug.assert(false);
                return 0;
            }
        
            getConnectionId()
            {
                // Abstract
                Debug.assert(false);
                return "";
            }
        
            getTimeout()
            {
                // Abstract
                Debug.assert(false);
                return "";
            }
        
            //
            // The change* methods (here and in derived classes) create
            // a new reference based on the existing one, with the
            // corresponding value changed.
            //
            changeContext(newContext)
            {
                if(newContext === undefined || newContext === null)
                {
                    newContext = Reference._emptyContext;
                }
                const r = this._instance.referenceFactory().copy(this);
                if(newContext.size === 0)
                {
                    r._context = Reference._emptyContext;
                }
                else
                {
                    r._context = new Map(newContext);
                }
                return r;
            }
        
            changeMode(newMode)
            {
                if(newMode === this._mode)
                {
                    return this;
                }
                const r = this._instance.referenceFactory().copy(this);
                r._mode = newMode;
                return r;
            }
        
            changeSecure(newSecure)
            {
                if(newSecure === this._secure)
                {
                    return this;
                }
                const r = this._instance.referenceFactory().copy(this);
                r._secure = newSecure;
                return r;
            }
        
            changeIdentity(newIdentity)
            {
                if(newIdentity.equals(this._identity))
                {
                    return this;
                }
                const r = this._instance.referenceFactory().copy(this);
                r._identity = new Identity(newIdentity.name, newIdentity.category);
                return r;
            }
        
            changeFacet(newFacet)
            {
                if(newFacet === this._facet)
                {
                    return this;
                }
                const r = this._instance.referenceFactory().copy(this);
                r._facet = newFacet;
                return r;
            }
        
            changeInvocationTimeout(newInvocationTimeout)
            {
                if(newInvocationTimeout === this._invocationTimeout)
                {
                    return this;
                }
                const r = this._instance.referenceFactory().copy(this);
                r._invocationTimeout = newInvocationTimeout;
                return r;
            }
        
            changeEncoding(newEncoding)
            {
                if(newEncoding.equals(this._encoding))
                {
                    return this;
                }
                const r = this._instance.referenceFactory().copy(this);
                r._encoding = newEncoding;
                return r;
            }
        
            changeAdapterId(newAdapterId)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeEndpoints(newEndpoints)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeLocator(newLocator)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeRouter(newRouter)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeCacheConnection(newCache)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changePreferSecure(newPreferSecure)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeEndpointSelection(newType)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeLocatorCacheTimeout(newTimeout)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeTimeout(newTimeout)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeConnectionId(connectionId)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            changeConnection(connection)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            hashCode()
            {
                if(this._hashInitialized)
                {
                    return this._hashValue;
                }
        
                let h = 5381;
                h = HashUtil.addNumber(h, this._mode);
                h = HashUtil.addBoolean(h, this._secure);
                h = HashUtil.addHashable(h, this._identity);
                if(this._context !== null && this._context !== undefined)
                {
                    for(const [key, value] of this._context)
                    {
                        h = HashUtil.addString(h, key);
                        h = HashUtil.addString(h, value);
                    }
                }
                h = HashUtil.addString(h, this._facet);
                h = HashUtil.addHashable(h, this._protocol);
                h = HashUtil.addHashable(h, this._encoding);
                h = HashUtil.addNumber(h, this._invocationTimeout);
        
                this._hashValue = h;
                this._hashInitialized = true;
        
                return this._hashValue;
            }
        
            //
            // Utility methods
            //
            isIndirect()
            {
                // Abstract
                Debug.assert(false);
                return false;
            }
        
            isWellKnown()
            {
                // Abstract
                Debug.assert(false);
                return false;
            }
        
            //
            // Marshal the reference.
            //
            streamWrite(s)
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
        
                if(!s.getEncoding().equals(Ice.Encoding_1_0))
                {
                    this._protocol._write(s);
                    this._encoding._write(s);
                }
        
                // Derived class writes the remainder of the reference.
            }
        
            //
            // Convert the reference to its string form.
            //
            toString()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                const s = [];
        
                const toStringMode = this._instance.toStringMode();
        
                //
                // If the encoded identity string contains characters which
                // the reference parser uses as separators, then we enclose
                // the identity string in quotes.
                //
        
                const id = Ice.identityToString(this._identity, toStringMode);
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
                    const fs = StringUtil.escapeString(this._facet, "", toStringMode);
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
        
                    default:
                    {
                        Debug.assert(false);
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
            }
        
            //
            // Convert the reference to its property form.
            //
            toProperty(prefix)
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            getRequestHandler(proxy)
            {
                // Abstract
                Debug.assert(false);
            }
        
            getBatchRequestQueue()
            {
                // Abstract
                Debug.assert(false);
            }
        
            equals(r)
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
        
                if(!MapUtil.equals(this._context, r._context))
                {
                    return false;
                }
        
                if(this._facet !== r._facet)
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
            }
        
            clone()
            {
                // Abstract
                Debug.assert(false);
                return null;
            }
        
            copyMembers(r)
            {
                //
                // Copy the members that are not passed to the constructor.
                //
                r._context = this._context;
            }
        }
        
        Reference._emptyContext = new Map();
        Reference._emptyEndpoints = [];
        
        Ice.Reference = Reference;
        
        class FixedReference extends Reference
        {
            constructor(instance, communicator, identity, facet, mode, secure, protocol, encoding, connection,
                        invocationTimeout, context)
            {
                super(instance, communicator, identity, facet, mode, secure, protocol, encoding, invocationTimeout, context);
                this._fixedConnection = connection;
            }
        
            getEndpoints()
            {
                return Reference._emptyEndpoints;
            }
        
            getAdapterId()
            {
                return "";
            }
        
            getRouterInfo()
            {
                return null;
            }
        
            getLocatorInfo()
            {
                return null;
            }
        
            getCacheConnection()
            {
                return true;
            }
        
            getPreferSecure()
            {
                return false;
            }
        
            getEndpointSelection()
            {
                return EndpointSelectionType.Random;
            }
        
            getLocatorCacheTimeout()
            {
                return 0;
            }
        
            getConnectionId()
            {
                return "";
            }
        
            getTimeout()
            {
                return undefined;
            }
        
            changeAdapterId(newAdapterId)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeEndpoints(newEndpoints)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeLocato(newLocator)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeRouter(newRouter)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeCacheConnection(newCache)
            {
                throw new Ice.FixedProxyException();
            }
        
            changePreferSecure(prefSec)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeEndpointSelection(newType)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeLocatorCacheTimeout(newTimeout)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeTimeout(newTimeout)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeConnectionId(connectionId)
            {
                throw new Ice.FixedProxyException();
            }
        
            changeConnection(newConnection)
            {
                if(newConnection == this._fixedConnection)
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._fixedConnection = newConnection;
                return r;
            }
        
            isIndirect()
            {
                return false;
            }
        
            isWellKnown()
            {
                return false;
            }
        
            streamWrite(s)
            {
                throw new Ice.FixedProxyException();
            }
        
            toProperty(prefix)
            {
                throw new Ice.FixedProxyException();
            }
        
            clone()
            {
                const r = new FixedReference(this.getInstance(),
                                             this.getCommunicator(),
                                             this.getIdentity(),
                                             this.getFacet(),
                                             this.getMode(),
                                             this.getSecure(),
                                             this.getProtocol(),
                                             this.getEncoding(),
                                             this._fixedConnection,
                                             this.getInvocationTimeout(),
                                             this.getContext());
                this.copyMembers(r);
                return r;
            }
        
            getRequestHandler(proxy)
            {
                switch(this.getMode())
                {
                    case RefMode.ModeTwoway:
                    case RefMode.ModeOneway:
                    case RefMode.ModeBatchOneway:
                    {
                        if(this._fixedConnection.endpoint().datagram())
                        {
                            throw new Ice.NoEndpointException(this.toString());
                        }
                        break;
                    }
        
                    case RefMode.ModeDatagram:
                    case RefMode.ModeBatchDatagram:
                    {
                        if(!this._fixedConnection.endpoint().datagram())
                        {
                            throw new Ice.NoEndpointException(this.toString());
                        }
                        break;
                    }
        
                    default:
                    {
                        Debug.assert(false);
                        break;
                    }
                }
        
                //
                // If a secure connection is requested or secure overrides is set,
                // check if the connection is secure.
                //
                const defaultsAndOverrides = this.getInstance().defaultsAndOverrides();
                const secure = defaultsAndOverrides.overrideSecure ? defaultsAndOverrides.overrideSecureValue : this.getSecure();
                if(secure && !this._fixedConnection.endpoint().secure())
                {
                    throw new Ice.NoEndpointException(this.toString());
                }
        
                this._fixedConnection.throwException(); // Throw in case our connection is already destroyed.
        
                return proxy._setRequestHandler(new ConnectionRequestHandler(this, this._fixedConnection));
            }
        
            getBatchRequestQueue()
            {
                return this._fixedConnection.getBatchRequestQueue();
            }
        
            equals(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
                if(!(rhs instanceof FixedReference))
                {
                    return false;
                }
                if(!super.equals(rhs))
                {
                    return false;
                }
                return this._fixedConnection == rhs._fixedConnection;
            }
        }
        
        Ice.FixedReference = FixedReference;
        
        class RoutableReference extends Reference
        {
            constructor(instance, communicator, identity, facet, mode, secure, protocol, encoding, endpoints,
                        adapterId, locatorInfo, routerInfo, cacheConnection, preferSecure, endpointSelection,
                        locatorCacheTimeout, invocationTimeout, context)
            {
                super(instance, communicator, identity, facet, mode, secure, protocol, encoding, invocationTimeout, context);
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
            }
        
            getEndpoints()
            {
                return this._endpoints;
            }
        
            getAdapterId()
            {
                return this._adapterId;
            }
        
            getRouterInfo()
            {
                return this._routerInfo;
            }
        
            getLocatorInfo()
            {
                return this._locatorInfo;
            }
        
            getCacheConnection()
            {
                return this._cacheConnection;
            }
        
            getPreferSecure()
            {
                return this._preferSecure;
            }
        
            getEndpointSelection()
            {
                return this._endpointSelection;
            }
        
            getLocatorCacheTimeout()
            {
                return this._locatorCacheTimeout;
            }
        
            getConnectionId()
            {
                return this._connectionId;
            }
        
            getTimeout()
            {
                return this._overrideTimeout ? this._timeout : undefined;
            }
        
            changeEncoding(newEncoding)
            {
                const r = super.changeEncoding(newEncoding);
                if(r !== this)
                {
                    if(r._locatorInfo !== null && !r._locatorInfo.getLocator().ice_getEncodingVersion().equals(newEncoding))
                    {
                        r._locatorInfo = this.getInstance().locatorManager().find(
                            r._locatorInfo.getLocator().ice_encodingVersion(newEncoding));
                    }
                }
                return r;
            }
        
            changeAdapterId(newAdapterId)
            {
                if(this._adapterId === newAdapterId)
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._adapterId = newAdapterId;
                r._endpoints = Reference._emptyEndpoints;
                return r;
            }
        
            changeEndpoints(newEndpoints)
            {
                if(ArrayUtil.equals(newEndpoints, this._endpoints, (e1, e2) => e1.equals(e2)))
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._endpoints = newEndpoints;
                r._adapterId = "";
                r.applyOverrides(r._endpoints);
                return r;
            }
        
            changeLocator(newLocator)
            {
                const newLocatorInfo = this.getInstance().locatorManager().find(newLocator);
                if(newLocatorInfo !== null && this._locatorInfo !== null && newLocatorInfo.equals(this._locatorInfo))
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._locatorInfo = newLocatorInfo;
                return r;
            }
        
            changeRouter(newRouter)
            {
                const newRouterInfo = this.getInstance().routerManager().find(newRouter);
                if(newRouterInfo !== null && this._routerInfo !== null && newRouterInfo.equals(this._routerInfo))
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._routerInfo = newRouterInfo;
                return r;
            }
        
            changeCacheConnection(newCache)
            {
                if(newCache === this._cacheConnection)
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._cacheConnection = newCache;
                return r;
            }
        
            changePreferSecure(newPreferSecure)
            {
                if(newPreferSecure === this._preferSecure)
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._preferSecure = newPreferSecure;
                return r;
            }
        
            changeEndpointSelection(newType)
            {
                if(newType === this._endpointSelection)
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._endpointSelection = newType;
                return r;
            }
        
            changeLocatorCacheTimeout(newTimeout)
            {
                if(this._locatorCacheTimeout === newTimeout)
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._locatorCacheTimeout = newTimeout;
                return r;
            }
        
            changeTimeout(newTimeout)
            {
                if(this._overrideTimeout && this._timeout === newTimeout)
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._timeout = newTimeout;
                r._overrideTimeout = true;
                r._endpoints = this._endpoints.map(endpoint => endpoint.changeTimeout(newTimeout));
                return r;
            }
        
            changeConnectionId(id)
            {
                if(this._connectionId === id)
                {
                    return this;
                }
                const r = this.getInstance().referenceFactory().copy(this);
                r._connectionId = id;
                r._endpoints = this._endpoints.map(endpoint => endpoint.changeConnectionId(id));
                return r;
            }
        
            changeConnection(newConnection)
            {
                return new FixedReference(this.getInstance(),
                                          this.getCommunicator(),
                                          this.getIdentity(),
                                          this.getFacet(),
                                          this.getMode(),
                                          this.getSecure(),
                                          this.getProtocol(),
                                          this.getEncoding(),
                                          newConnection,
                                          this.getInvocationTimeout(),
                                          this.getContext());
            }
        
            isIndirect()
            {
                return this._endpoints.length === 0;
            }
        
            isWellKnown()
            {
                return this._endpoints.length === 0 && this._adapterId.length === 0;
            }
        
            streamWrite(s)
            {
                super.streamWrite(s);
        
                s.writeSize(this._endpoints.length);
                if(this._endpoints.length > 0)
                {
                    Debug.assert(this._adapterId.length === 0);
                    this._endpoints.forEach(endpoint =>
                        {
                            s.writeShort(endpoint.type());
                            endpoint.streamWrite(s);
                        });
                }
                else
                {
                    s.writeString(this._adapterId); // Adapter id.
                }
            }
        
            toString()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                const s = [];
                s.push(super.toString());
                if(this._endpoints.length > 0)
                {
                    this._endpoints.forEach(endpoint =>
                        {
                            const endp = endpoint.toString();
                            if(endp !== null && endp.length > 0)
                            {
                                s.push(':');
                                s.push(endp);
                            }
                        });
                }
                else if(this._adapterId.length > 0)
                {
                    s.push(" @ ");
        
                    //
                    // If the encoded adapter id string contains characters which
                    // the reference parser uses as separators, then we enclose
                    // the adapter id string in quotes.
                    //
                    const a = StringUtil.escapeString(this._adapterId, null, this._instance.toStringMode());
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
            }
        
            toProperty(prefix)
            {
                const properties = new Map();
        
                properties.set(prefix, this.toString());
                properties.set(prefix + ".CollocationOptimized", "0");
                properties.set(prefix + ".ConnectionCached", this._cacheConnection ? "1" : "0");
                properties.set(prefix + ".PreferSecure", this._preferSecure ? "1" : "0");
                properties.set(prefix + ".EndpointSelection",
                               this._endpointSelection === EndpointSelectionType.Random ? "Random" : "Ordered");
        
                properties.set(prefix + ".LocatorCacheTimeout", String(this._locatorCacheTimeout));
                properties.set(prefix + ".InvocationTimeout", String(this.getInvocationTimeout()));
        
                if(this._routerInfo !== null)
                {
                    this._routerInfo.getRouter()._getReference().toProperty(prefix + ".Router").forEach(
                        (value, key) => properties.set(key, value));
                }
        
                if(this._locatorInfo !== null)
                {
                    this._locatorInfo.getLocator()._getReference().toProperty(prefix + ".Locator").forEach(
                        (value, key) => properties.set(key, value));
                }
        
                return properties;
            }
        
            hashCode()
            {
                if(!this._hashInitialized)
                {
                    super.hashCode(); // Initializes _hashValue.
                    this._hashValue = HashUtil.addString(this._hashValue, this._adapterId);
                }
                return this._hashValue;
            }
        
            equals(rhs)
            {
                if(this === rhs)
                {
                    return true;
                }
                if(!(rhs instanceof RoutableReference))
                {
                    return false;
                }
        
                if(!super.equals(rhs))
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
                if(!ArrayUtil.equals(this._endpoints, rhs._endpoints, (e1, e2) => e1.equals(e2)))
                {
                    return false;
                }
                if(this._adapterId !== rhs._adapterId)
                {
                    return false;
                }
                return true;
            }
        
            getRequestHandler(proxy)
            {
                return this._instance.requestHandlerFactory().getRequestHandler(this, proxy);
            }
        
            getBatchRequestQueue()
            {
                return new BatchRequestQueue(this._instance, this._mode === RefMode.ModeBatchDatagram);
            }
        
            getConnection()
            {
                const p = new Ice.Promise(); // success callback receives (connection)
        
                if(this._routerInfo !== null)
                {
                    //
                    // If we route, we send everything to the router's client
                    // proxy endpoints.
                    //
                    this._routerInfo.getClientEndpoints().then(endpts =>
                        {
                            if(endpts.length > 0)
                            {
                                this.applyOverrides(endpts);
                                this.createConnection(endpts).then(p.resolve, p.reject);
                            }
                            else
                            {
                                this.getConnectionNoRouterInfo(p);
                            }
                        }).catch(p.reject);
                }
                else
                {
                    this.getConnectionNoRouterInfo(p);
                }
                return p;
            }
        
            getConnectionNoRouterInfo(p)
            {
                if(this._endpoints.length > 0)
                {
                    this.createConnection(this._endpoints).then(p.resolve).catch(p.reject);
                    return;
                }
        
                if(this._locatorInfo !== null)
                {
                    this._locatorInfo.getEndpoints(this, null, this._locatorCacheTimeout).then(
                        values =>
                        {
                            const [endpoints, cached] = values;
                            if(endpoints.length === 0)
                            {
                                p.reject(new Ice.NoEndpointException(this.toString()));
                                return;
                            }
        
                            this.applyOverrides(endpoints);
                            this.createConnection(endpoints).then(
                                p.resolve,
                                ex =>
                                {
                                    if(ex instanceof Ice.NoEndpointException)
                                    {
                                        //
                                        // No need to retry if there's no endpoints.
                                        //
                                        p.reject(ex);
                                    }
                                    else
                                    {
                                        Debug.assert(this._locatorInfo !== null);
                                        this.getLocatorInfo().clearCache(this);
                                        if(cached)
                                        {
                                            const traceLevels = this.getInstance().traceLevels();
                                            if(traceLevels.retry >= 2)
                                            {
                                                this.getInstance().initializationData().logger.trace(
                                                    traceLevels.retryCat,
                                                    "connection to cached endpoints failed\n" +
                                                    "removing endpoints from cache and trying again\n" +
                                                    ex.toString());
                                            }
                                            this.getConnectionNoRouterInfo(p); // Retry.
                                            return;
                                        }
                                        p.reject(ex);
                                    }
                                });
                        }).catch(p.reject);
                }
                else
                {
                    p.reject(new Ice.NoEndpointException(this.toString()));
                }
            }
        
            clone()
            {
                const r = new RoutableReference(this.getInstance(),
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
            }
        
            copyMembers(rhs)
            {
                //
                // Copy the members that are not passed to the constructor.
                //
                super.copyMembers(rhs);
                rhs._overrideTimeout = this._overrideTimeout;
                rhs._timeout = this._timeout;
                rhs._connectionId = this._connectionId;
            }
        
            applyOverrides(endpts)
            {
                //
                // Apply the endpoint overrides to each endpoint.
                //
                for(let i = 0; i < endpts.length; ++i)
                {
                    endpts[i] = endpts[i].changeConnectionId(this._connectionId);
                    if(this._overrideTimeout)
                    {
                        endpts[i] = endpts[i].changeTimeout(this._timeout);
                    }
                }
            }
        
            filterEndpoints(allEndpoints)
            {
                //
                // Filter out opaque endpoints or endpoints which can't connect.
                //
                let endpoints = allEndpoints.filter(e => !(e instanceof OpaqueEndpointI) && e.connectable());
        
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
                        endpoints = endpoints.filter(e => !e.datagram());
                        break;
                    }
        
                    case RefMode.ModeDatagram:
                    case RefMode.ModeBatchDatagram:
                    {
                        //
                        // Filter out non-datagram endpoints.
                        //
                        endpoints = endpoints.filter(e => e.datagram());
                        break;
                    }
        
                    default:
                    {
                        Debug.assert(false);
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
                const overrides = this.getInstance().defaultsAndOverrides();
                if(overrides.overrideSecure ? overrides.overrideSecureValue : this.getSecure())
                {
                    endpoints = endpoints.filter(e => e.secure());
                }
                else
                {
                    const preferSecure = this.getPreferSecure();
                    const compare = (e1, e2) =>
                    {
                        const ls = e1.secure();
                        const rs = e2.secure();
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
            }
        
            createConnection(allEndpoints)
            {
                const endpoints = this.filterEndpoints(allEndpoints);
                if(endpoints.length === 0)
                {
                    return Ice.Promise.reject(new Ice.NoEndpointException(this.toString()));
                }
        
                //
                // Finally, create the connection.
                //
                const promise = new Ice.Promise();
                const factory = this.getInstance().outgoingConnectionFactory();
                if(this.getCacheConnection() || endpoints.length == 1)
                {
                    //
                    // Get an existing connection or create one if there's no
                    // existing connection to one of the given endpoints.
                    //
                    const cb = new CreateConnectionCallback(this, null, promise);
                    factory.create(endpoints, false, this.getEndpointSelection()).then(
                        connection => cb.setConnection(connection)).catch(ex => cb.setException(ex));
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
                    const cb = new CreateConnectionCallback(this, endpoints, promise);
                    factory.create([endpoints[0]], true, this.getEndpointSelection()).then(
                        connection => cb.setConnection(connection)).catch(ex => cb.setException(ex));
                }
                return promise;
            }
        }
        
        Ice.RoutableReference = RoutableReference;
        
        class CreateConnectionCallback
        {
            constructor(r, endpoints, promise)
            {
                this.ref = r;
                this.endpoints = endpoints;
                this.promise = promise;
                this.i = 0;
                this.exception = null;
            }
        
            setConnection(connection)
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
                this.promise.resolve(connection);
            }
        
            setException(ex)
            {
                if(this.exception === null)
                {
                    this.exception = ex;
                }
        
                if(this.endpoints === null || ++this.i === this.endpoints.length)
                {
                    this.promise.reject(this.exception);
                    return;
                }
        
                this.ref.getInstance().outgoingConnectionFactory().create(
                    [this.endpoints[this.i]],
                    this.i != this.endpoints.length - 1,
                    this.ref.getEndpointSelection()).then(
                        connection => this.setConnection(connection)).catch(ex => this.setException(ex));
            }
        }
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `CommunicatorF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        //
        // Local aliases.
        //
        const Debug = Ice.Debug;
        const InputStream = Ice.InputStream;
        const OutputStream = Ice.OutputStream;
        const EndpointParseException = Ice.EndpointParseException;
        const OpaqueEndpointI = Ice.OpaqueEndpointI;
        const Protocol = Ice.Protocol;
        const StringUtil = Ice.StringUtil;
        
        class EndpointFactoryManager
        {
            constructor(instance)
            {
                this._instance = instance;
                this._factories = [];
            }
        
            add(factory)
            {
                Debug.assert(this._factories.find(f => factory.type() == f.type()) === undefined);
                this._factories.push(factory);
            }
        
            get(type)
            {
                return this._factories.find(f => type == f.type()) || null;
            }
        
            create(str, oaEndpoint)
            {
                const s = str.trim();
                if(s.length === 0)
                {
                    throw new EndpointParseException("value has no non-whitespace characters");
                }
        
                const arr = StringUtil.splitString(s, " \t\n\r");
                if(arr.length === 0)
                {
                    throw new EndpointParseException("value has no non-whitespace characters");
                }
        
                let protocol = arr[0];
                arr.splice(0, 1);
        
                if(protocol === "default")
                {
                    protocol = this._instance.defaultsAndOverrides().defaultProtocol;
                }
                for(let i = 0, length = this._factories.length; i < length; ++i)
                {
                    if(this._factories[i].protocol() === protocol)
                    {
                        const e = this._factories[i].create(arr, oaEndpoint);
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
                    const ue = new OpaqueEndpointI();
                    ue.initWithOptions(arr);
                    if(arr.length > 0)
                    {
                        throw new EndpointParseException("unrecognized argument `" + arr[0] + "' in endpoint `" + str + "'");
                    }
        
                    for(let i = 0, length = this._factories.length; i < length; ++i)
                    {
                        if(this._factories[i].type() == ue.type())
                        {
                            //
                            // Make a temporary stream, write the opaque endpoint data into the stream,
                            // and ask the factory to read the endpoint data from that stream to create
                            // the actual endpoint.
                            //
                            const os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                            os.writeShort(ue.type());
                            ue.streamWrite(os);
                            const is = new InputStream(this._instance, Protocol.currentProtocolEncoding, os.buffer);
                            is.pos = 0;
                            is.readShort(); // type
                            is.startEncapsulation();
                            const e = this._factories[i].read(is);
                            is.endEncapsulation();
                            return e;
                        }
                    }
                    return ue; // Endpoint is opaque, but we don't have a factory for its type.
                }
        
                return null;
            }
        
            read(s)
            {
                const type = s.readShort();
        
                const factory = this.get(type);
                let e = null;
                s.startEncapsulation();
                if(factory)
                {
                    e = factory.read(s);
                }
                //
                // If the factory failed to read the endpoint, return an opaque endpoint. This can
                // occur if for example the factory delegates to another factory and this factory
                // isn't available. In this case, the factory needs to make sure the stream position
                // is preserved for reading the opaque endpoint.
                //
                if(!e)
                {
                    e = new OpaqueEndpointI(type);
                    e.initWithStream(s);
                }
                s.endEncapsulation();
                return e;
            }
        
            destroy()
            {
                this._factories.forEach(factory => factory.destroy());
                this._factories = [];
            }
        }
        
        Ice.EndpointFactoryManager = EndpointFactoryManager;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const FormatType = Ice.FormatType;
        const EndpointSelectionType = Ice.EndpointSelectionType;
        const Protocol = Ice.Protocol;
        
        class DefaultsAndOverrides
        {
            constructor(properties, logger)
            {
                this.defaultProtocol = properties.getPropertyWithDefault("Ice.Default.Protocol",
                                                                         Ice.TcpTransceiver !== null ? "tcp" : "ws");
        
                let value = properties.getProperty("Ice.Default.Host");
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
                    const ex = new Ice.EndpointSelectionTypeParseException();
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
        
                const slicedFormat = properties.getPropertyAsIntWithDefault("Ice.Default.SlicedFormat", 0) > 0;
                this.defaultFormat = slicedFormat ? FormatType.SlicedFormat : FormatType.CompactFormat;
            }
        }
        
        Ice.DefaultsAndOverrides = DefaultsAndOverrides;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Debug = Ice.Debug;
        const HashMap = Ice.HashMap;
        const LocatorRegistryPrx = Ice.LocatorRegisterPrx;
        const Protocol = Ice.Protocol;
        
        class LocatorInfo
        {
            constructor(locator, table, background)
            {
                this._locator = locator;
                this._locatorRegistry = null;
                this._table = table;
                this._background = background;
        
                this._adapterRequests = new Map(); // Map<String, Request>
                this._objectRequests = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, Request>
            }
        
            destroy()
            {
                this._locatorRegistry = null;
                this._table.clear();
            }
        
            equals(rhs)
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
            }
        
            hashCode()
            {
                return this._locator.hashCode();
            }
        
            getLocator()
            {
                return this._locator;
            }
        
            getLocatorRegistry()
            {
                if(this._locatorRegistry !== null)
                {
                    return Ice.Promise.resolve(this._locatorRegistry);
                }
        
                return this._locator.getRegistry().then(reg =>
                    {
                        //
                        // The locator registry can't be located. We use ordered
                        // endpoint selection in case the locator returned a proxy
                        // with some endpoints which are prefered to be tried first.
                        //
                        this._locatorRegistry = LocatorRegistryPrx.uncheckedCast(reg.ice_locator(null).ice_endpointSelection(
                            Ice.EndpointSelectionType.Ordered));
                        return this._locatorRegistry;
                    });
            }
        
            getEndpoints(ref, wellKnownRef, ttl, p)
            {
                const promise = p || new Ice.Promise(); // success callback receives (endpoints, cached)
        
                Debug.assert(ref.isIndirect());
                let endpoints = null;
                const cached = {value: false};
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
                    const r = this._table.getObjectReference(ref.getIdentity(), ttl, cached);
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
                        if(ref.getInstance().traceLevels().location >= 1)
                        {
                            this.traceWellKnown("found adapter for well-known object in locator cache", ref, r);
                        }
                        this.getEndpoints(r, ref, ttl, promise);
                        return promise;
                    }
                }
        
                Debug.assert(endpoints !== null);
                if(ref.getInstance().traceLevels().location >= 1)
                {
                    this.getEndpointsTrace(ref, endpoints, true);
                }
                promise.resolve([endpoints, true]);
        
                return promise;
            }
        
            clearCache(ref)
            {
                Debug.assert(ref.isIndirect());
        
                if(!ref.isWellKnown())
                {
                    const endpoints = this._table.removeAdapterEndpoints(ref.getAdapterId());
        
                    if(endpoints !== null && ref.getInstance().traceLevels().location >= 2)
                    {
                        this.trace("removed endpoints for adapter from locator cache", ref, endpoints);
                    }
                }
                else
                {
                    const r = this._table.removeObjectReference(ref.getIdentity());
                    if(r !== null)
                    {
                        if(!r.isIndirect())
                        {
                            if(ref.getInstance().traceLevels().location >= 2)
                            {
                                this.trace("removed endpoints for well-known object from locator cache", ref, r.getEndpoints());
                            }
                        }
                        else if(!r.isWellKnown())
                        {
                            if(ref.getInstance().traceLevels().location >= 2)
                            {
                                this.traceWellKnown("removed adapter for well-known object from locator cache", ref, r);
                            }
                            this.clearCache(r);
                        }
                    }
                }
            }
        
            trace(msg, ref, endpoints)
            {
                Debug.assert(ref.isIndirect());
        
                const s = [];
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
                    s.push("well-known proxy = ");
                    s.push(ref.toString());
                    s.push("\n");
                }
        
                s.push("endpoints = ");
                s.push(endpoints.map(e => e.toString()).join(":"));
                ref.getInstance().initializationData().logger.trace(ref.getInstance().traceLevels().locationCat, s.join(""));
            }
        
            traceWellKnown(msg, ref, resolved)
            {
                Debug.assert(ref.isWellKnown());
        
                const s = [];
                s.push(msg);
                s.push("\n");
                s.push("well-known proxy = ");
                s.push(ref.toString());
                s.push("\n");
        
                s.push("adapter = ");
                s.push(resolved.getAdapterId());
                ref.getInstance().initializationData().logger.trace(ref.getInstance().traceLevels().locationCat, s.join(""));
            }
        
            getEndpointsException(ref, exc)
            {
                Debug.assert(ref.isIndirect());
        
                const instance = ref.getInstance();
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
                            const s = [];
                            s.push("adapter not found\n");
                            s.push("adapter = ");
                            s.push(ref.getAdapterId());
                            instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                        }
        
                        const e = new Ice.NotRegisteredException();
                        e.kindOfObject = "object adapter";
                        e.id = ref.getAdapterId();
                        throw e;
                    }
                    else if(ex instanceof Ice.ObjectNotFoundException)
                    {
                        if(instance.traceLevels().location >= 1)
                        {
                            const s = [];
                            s.push("object not found\n");
                            s.push("object = ");
                            s.push(Ice.identityToString(ref.getIdentity(), instance.toStringMode()));
                            instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                        }
        
                        const e = new Ice.NotRegisteredException();
                        e.kindOfObject = "object";
                        e.id = Ice.identityToString(ref.getIdentity(), instance.toStringMode());
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
                            const s = [];
                            s.push("couldn't contact the locator to retrieve endpoints\n");
                            if(ref.getAdapterId().length > 0)
                            {
                                s.push("adapter = ");
                                s.push(ref.getAdapterId());
                                s.push("\n");
                            }
                            else
                            {
                                s.push("well-known proxy = ");
                                s.push(ref.toString());
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
            }
        
            getEndpointsTrace(ref, endpoints, cached)
            {
                if(endpoints !== null && endpoints.length > 0)
                {
                    if(cached)
                    {
                        if(ref.isWellKnown())
                        {
                            this.trace("found endpoints for well-known proxy in locator cache", ref, endpoints);
                        }
                        else
                        {
                            this.trace("found endpoints for adapter in locator cache", ref, endpoints);
                        }
                    }
                    else if(ref.isWellKnown())
                    {
                        this.trace("retrieved endpoints for well-known proxy from locator, adding to locator cache",
                                   ref, endpoints);
                    }
                    else
                    {
                        this.trace("retrieved endpoints for adapter from locator, adding to locator cache",
                                   ref, endpoints);
                    }
                }
                else
                {
                    const instance = ref.getInstance();
                    const s = [];
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
                        s.push("well-known object\n");
                        s.push("well-known proxy = ");
                        s.push(ref.toString());
                        s.push("\n");
                    }
                    instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                }
            }
        
            getAdapterRequest(ref)
            {
                if(ref.getInstance().traceLevels().location >= 1)
                {
                    const instance = ref.getInstance();
                    const s = [];
                    s.push("searching for adapter by id\n");
                    s.push("adapter = ");
                    s.push(ref.getAdapterId());
                    instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                }
        
                let request = this._adapterRequests.get(ref.getAdapterId());
                if(request !== undefined)
                {
                    return request;
                }
                request = new AdapterRequest(this, ref);
                this._adapterRequests.set(ref.getAdapterId(), request);
                return request;
            }
        
            getObjectRequest(ref)
            {
                if(ref.getInstance().traceLevels().location >= 1)
                {
                    const instance = ref.getInstance();
                    const s = [];
                    s.push("searching for well-known object\n");
                    s.push("well-known proxy = ");
                    s.push(ref.toString());
                    instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
                }
        
                let request = this._objectRequests.get(ref.getIdentity());
                if(request !== undefined)
                {
                    return request;
                }
                request = new ObjectRequest(this, ref);
                this._objectRequests.set(ref.getIdentity(), request);
                return request;
            }
        
            finishRequest(ref, wellKnownRefs, proxy, notRegistered)
            {
                if(proxy === null || proxy._getReference().isIndirect())
                {
                    //
                    // Remove the cached references of well-known objects for which we tried
                    // to resolved the endpoints if these endpoints are empty.
                    //
                    for(let i = 0; i < wellKnownRefs.length; ++i)
                    {
                        this._table.removeObjectReference(wellKnownRefs[i].getIdentity());
                    }
                }
        
                if(!ref.isWellKnown())
                {
                    if(proxy !== null && !proxy._getReference().isIndirect())
                    {
                        // Cache the adapter endpoints.
                        this._table.addAdapterEndpoints(ref.getAdapterId(), proxy._getReference().getEndpoints());
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
                    if(proxy !== null && !proxy._getReference().isWellKnown())
                    {
                        // Cache the well-known object reference.
                        this._table.addObjectReference(ref.getIdentity(), proxy._getReference());
                    }
                    else if(notRegistered) // If the well-known object isn't registered anymore, remove it from the cache.
                    {
                        this._table.removeObjectReference(ref.getIdentity());
                    }
        
                    Debug.assert(this._objectRequests.has(ref.getIdentity()));
                    this._objectRequests.delete(ref.getIdentity());
                }
            }
        }
        
        Ice.LocatorInfo = LocatorInfo;
        
        class RequestCallback
        {
            constructor(ref, ttl, promise)
            {
                this._ref = ref;
                this._ttl = ttl;
                this._promise = promise;
            }
        
            response(locatorInfo, proxy)
            {
                let endpoints = null;
                if(proxy !== null)
                {
                    const r = proxy._getReference();
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
                        if(this._ref.getInstance().traceLevels().location >= 1)
                        {
                            locatorInfo.traceWellKnown("retrieved adapter for well-known object from locator, " +
                                                       "adding to locator cache", this._ref, r);
                        }
                        locatorInfo.getEndpoints(r, this._ref, this._ttl).then(
                            values =>
                            {
                                if(this._promise !== null)
                                {
                                    this._promise.resolve(values);
                                }
                            },
                            ex =>
                            {
                                if(this._promise !== null)
                                {
                                    this._promise.reject(ex);
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
                    this._promise.resolve(endpoints === null ? [[], false] : [endpoints, false]);
                }
            }
        
            exception(locatorInfo, exc)
            {
                try
                {
                    locatorInfo.getEndpointsException(this._ref, exc); // This throws.
                }
                catch(ex)
                {
                    if(this._promise !== null)
                    {
                        this._promise.reject(ex);
                    }
                }
            }
        }
        
        class Request
        {
            constructor(locatorInfo, ref)
            {
                this._locatorInfo = locatorInfo;
                this._ref = ref;
        
                this._callbacks = []; // Array<RequestCallback>
                this._wellKnownRefs = []; // Array<Reference>
                this._sent = false;
                this._response = false;
                this._proxy = null;
                this._exception = null;
            }
        
            addCallback(ref, wellKnownRef, ttl, promise)
            {
                const callback = new RequestCallback(ref, ttl, promise);
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
            }
        
            response(proxy)
            {
                this._locatorInfo.finishRequest(this._ref, this._wellKnownRefs, proxy, false);
                this._response = true;
                this._proxy = proxy;
                for(let i = 0; i < this._callbacks.length; ++i)
                {
                    this._callbacks[i].response(this._locatorInfo, proxy);
                }
            }
        
            exception(ex)
            {
                this._locatorInfo.finishRequest(this._ref, this._wellKnownRefs, null, ex instanceof Ice.UserException);
                this._exception = ex;
                for(let i = 0; i < this._callbacks.length; ++i)
                {
                    this._callbacks[i].exception(this._locatorInfo, ex);
                }
            }
        }
        
        class ObjectRequest extends Request
        {
            constructor(locatorInfo, reference)
            {
                super(locatorInfo, reference);
                Debug.assert(reference.isWellKnown());
            }
        
            send()
            {
                try
                {
                    this._locatorInfo.getLocator().findObjectById(this._ref.getIdentity()).then(
                        proxy => this.response(proxy),
                        ex => this.exception(ex));
                }
                catch(ex)
                {
                    this.exception(ex);
                }
            }
        }
        
        class AdapterRequest extends Request
        {
            constructor(locatorInfo, reference)
            {
                super(locatorInfo, reference);
                Debug.assert(reference.isIndirect());
            }
        
            send()
            {
                try
                {
                    this._locatorInfo.getLocator().findAdapterById(this._ref.getAdapterId()).then(
                        proxy => this.response(proxy),
                        ex => this.exception(ex));
                }
                catch(ex)
                {
                    this.exception(ex);
                }
            }
        }
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const ObjectAdapterI = Ice.ObjectAdapterI;
        const _Promise = Ice.Promise;
        
        //
        // Only for use by Instance.
        //
        class ObjectAdapterFactory
        {
            constructor(instance, communicator)
            {
                this._instance = instance;
                this._communicator = communicator;
                this._adapters = [];
                this._adapterNamesInUse = [];
                this._shutdownPromise = new _Promise();
            }
        
            shutdown()
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
                _Promise.all(this._adapters.map(adapter => adapter.deactivate())).then(() => this._shutdownPromise.resolve());
                return this._shutdownPromise;
            }
        
            waitForShutdown()
            {
                return this._shutdownPromise.then(() => _Promise.all(this._adapters.map(adapter => adapter.waitForDeactivate())));
            }
        
            isShutdown()
            {
                return this._instance === null;
            }
        
            destroy()
            {
                return this.waitForShutdown().then(() => _Promise.all(this._adapters.map(adapter => adapter.destroy())));
            }
        
            createObjectAdapter(name, router, promise)
            {
                if(this._instance === null)
                {
                    throw new Ice.ObjectAdapterDeactivatedException();
                }
        
                let adapter = null;
                try
                {
                    if(name.length === 0)
                    {
                        adapter = new ObjectAdapterI(this._instance, this._communicator, this, Ice.generateUUID(), null, true,
                                                     promise);
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
                    promise.reject(ex);
                }
            }
        
            removeObjectAdapter(adapter)
            {
                if(this._instance === null)
                {
                    return;
                }
        
                let n = this._adapters.indexOf(adapter);
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
        }
        
        Ice.ObjectAdapterFactory = ObjectAdapterFactory;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `LoggerF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const HashMap = Ice.HashMap;
        const LocatorInfo = Ice.LocatorInfo;
        const LocatorPrx = Ice.LocatorPrx;
        const LocatorTable = Ice.LocatorTable;
        
        class LocatorManager
        {
            constructor(properties)
            {
                this._background = properties.getPropertyAsInt("Ice.BackgroundLocatorCacheUpdates") > 0;
                this._table = new HashMap(HashMap.compareEquals); // Map<Ice.LocatorPrx, LocatorInfo>
                this._locatorTables = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, LocatorTable>
            }
        
            destroy()
            {
                for(const locator of this._table.values())
                {
                    locator.destroy();
                }
                this._table.clear();
                this._locatorTables.clear();
            }
        
            //
            // Returns locator info for a given locator. Automatically creates
            // the locator info if it doesn't exist yet.
            //
            find(loc)
            {
                if(loc === null)
                {
                    return null;
                }
        
                //
                // The locator can't be located.
                //
                const locator = LocatorPrx.uncheckedCast(loc.ice_locator(null));
        
                //
                // TODO: reap unused locator info objects?
                //
                let info = this._table.get(locator);
                if(info === undefined)
                {
                    //
                    // Rely on locator identity for the adapter table. We want to
                    // have only one table per locator (not one per locator
                    // proxy).
                    //
                    let table = this._locatorTables.get(locator.ice_getIdentity());
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
        }
        
        Ice.LocatorManager = LocatorManager;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ObjectFactory.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ImplicitContext.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const ConnectRequestHandler = Ice.ConnectRequestHandler;
        const HashMap = Ice.HashMap;
        
        class RequestHandlerFactory
        {
            constructor(instance)
            {
                this._instance = instance;
                this._handlers = new HashMap(HashMap.compareEquals);
            }
        
            getRequestHandler(ref, proxy)
            {
                let connect = false;
                let handler;
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
                    ref.getConnection().then(connection =>
                                             {
                                                 handler.setConnection(connection);
                                             },
                                             ex =>
                                             {
                                                 handler.setException(ex);
                                             });
                }
                return proxy._setRequestHandler(handler.connect(proxy));
            }
        
            removeRequestHandler(ref, handler)
            {
                if(ref.getCacheConnection())
                {
                    if(this._handlers.get(ref) === handler)
                    {
                        this._handlers.delete(ref);
                    }
                }
            }
        }
        
        Ice.RequestHandlerFactory = RequestHandlerFactory;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Debug = Ice.Debug;
        const Identity = Ice.Identity;
        const ObjectPrx = Ice.ObjectPrx;
        const StringUtil = Ice.StringUtil;
        
        //
        // Only for use by Instance.
        //
        class ProxyFactory
        {
            constructor(instance)
            {
                this._instance = instance;
        
                const arr = this._instance.initializationData().properties.getPropertyAsList("Ice.RetryIntervals");
        
                if(arr.length > 0)
                {
                    this._retryIntervals = [];
        
                    for(let i = 0; i < arr.length; i++)
                    {
                        let v;
        
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
                    this._retryIntervals = [0];
                }
            }
        
            stringToProxy(str)
            {
                return this.referenceToProxy(this._instance.referenceFactory().createFromString(str, null));
            }
        
            proxyToString(proxy)
            {
                return proxy === null ? "" : proxy._getReference().toString();
            }
        
            propertyToProxy(prefix)
            {
                const proxy = this._instance.initializationData().properties.getProperty(prefix);
                const ref = this._instance.referenceFactory().createFromString(proxy, prefix);
                return this.referenceToProxy(ref);
            }
        
            proxyToProperty(proxy, prefix)
            {
                return proxy === null ? new Map() : proxy._getReference().toProperty(prefix);
            }
        
            streamToProxy(s, type)
            {
                const ident = new Identity();
                ident._read(s);
                return this.referenceToProxy(this._instance.referenceFactory().createFromStream(ident, s), type);
            }
        
            referenceToProxy(ref, type)
            {
                if(ref !== null)
                {
                    const proxy = type ? new type() : new ObjectPrx();
                    proxy._setup(ref);
                    return proxy;
                }
                else
                {
                    return null;
                }
            }
        
            checkRetryAfterException(ex, ref, sleepInterval, cnt)
            {
                const traceLevels = this._instance.traceLevels();
                const logger = this._instance.initializationData().logger;
        
                //
                // We don't retry batch requests because the exception might have caused
                // the all the requests batched with the connection to be aborted and we
                // want the application to be notified.
                //
                if(ref.getMode() === Ice.Reference.ModeBatchOneway || ref.getMode() === Ice.Reference.ModeBatchDatagram)
                {
                    throw ex;
                }
        
                //
                // If it's a fixed proxy, retrying isn't useful as the proxy is tied to
                // the connection and the request will fail with the exception.
                //
                if(ref instanceof Ice.FixedReference)
                {
                    throw ex;
                }
        
                if(ex instanceof Ice.ObjectNotExistException)
                {
                    if(ref.getRouterInfo() !== null && ex.operation === "ice_add_proxy")
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
                            const li = ref.getLocatorInfo();
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
                // Don't retry if the communicator is destroyed, object adapter is deactivated,
                // or connection is manually closed.
                //
                if(ex instanceof Ice.CommunicatorDestroyedException ||
                   ex instanceof Ice.ObjectAdapterDeactivatedException ||
                   ex instanceof Ice.ConnectionManuallyClosedException)
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
        
                let interval;
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
                    let msg = "retrying operation call";
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
        }
        
        Ice.ProxyFactory = ProxyFactory;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Properties.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `LocatorF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Metrics.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        Slice.defineDictionary(IceMX, "StringIntDict", "StringIntDictHelper", "Ice.StringHelper", "Ice.IntHelper", false, undefined, undefined);
        
        const iceC_IceMX_Metrics_ids = [
            "::Ice::Object",
            "::IceMX::Metrics"
        ];
        
        /**
         * The base class for metrics. A metrics object represents a
         * collection of measurements associated to a given a system.
         *
         **/
        IceMX.Metrics = class extends Ice.Value
        {
            constructor(id = "", total = new Ice.Long(0, 0), current = 0, totalLifetime = new Ice.Long(0, 0), failures = 0)
            {
                super();
                this.id = id;
                this.total = total;
                this.current = current;
                this.totalLifetime = totalLifetime;
                this.failures = failures;
            }
        
            _iceWriteMemberImpl(ostr)
            {
                ostr.writeString(this.id);
                ostr.writeLong(this.total);
                ostr.writeInt(this.current);
                ostr.writeLong(this.totalLifetime);
                ostr.writeInt(this.failures);
            }
        
            _iceReadMemberImpl(istr)
            {
                this.id = istr.readString();
                this.total = istr.readLong();
                this.current = istr.readInt();
                this.totalLifetime = istr.readLong();
                this.failures = istr.readInt();
            }
        };
        
        Slice.defineValue(IceMX.Metrics, iceC_IceMX_Metrics_ids[1], false);
        
        /**
         * A structure to keep track of failures associated with a given
         * metrics.
         *
         **/
        IceMX.MetricsFailures = class
        {
            constructor(id = "", failures = null)
            {
                this.id = id;
                this.failures = failures;
            }
        
            _write(ostr)
            {
                ostr.writeString(this.id);
                IceMX.StringIntDictHelper.write(ostr, this.failures);
            }
        
            _read(istr)
            {
                this.id = istr.readString();
                this.failures = IceMX.StringIntDictHelper.read(istr);
            }
        
            static get minWireSize()
            {
                return  2;
            }
        };
        
        Slice.defineStruct(IceMX.MetricsFailures, false, true);
        
        Slice.defineSequence(IceMX, "MetricsFailuresSeqHelper", "IceMX.MetricsFailures", false);
        
        Slice.defineSequence(IceMX, "MetricsMapHelper", "Ice.ObjectHelper", false, "IceMX.Metrics");
        
        Slice.defineDictionary(IceMX, "MetricsView", "MetricsViewHelper", "Ice.StringHelper", "IceMX.MetricsMapHelper", false, undefined, undefined, Ice.ArrayUtil.equals);
        
        /**
         * Raised if a metrics view cannot be found.
         *
         **/
        IceMX.UnknownMetricsView = class extends Ice.UserException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.UserException;
            }
        
            static get _id()
            {
                return "::IceMX::UnknownMetricsView";
            }
        
            _mostDerivedType()
            {
                return IceMX.UnknownMetricsView;
            }
        };
        
        const iceC_IceMX_MetricsAdmin_ids = [
            "::Ice::Object",
            "::IceMX::MetricsAdmin"
        ];
        
        /**
         * The metrics administrative facet interface. This interface allows
         * remote administrative clients to access metrics of an application
         * that enabled the Ice administrative facility and configured some
         * metrics views.
         *
         **/
        IceMX.MetricsAdmin = class extends Ice.Object
        {
        };
        
        IceMX.MetricsAdminPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(IceMX.MetricsAdmin, IceMX.MetricsAdminPrx, iceC_IceMX_MetricsAdmin_ids, 1,
        {
            "getMetricsViewNames": [, , , 2, ["Ice.StringSeqHelper"], , [["Ice.StringSeqHelper"]], , , ],
            "enableMetricsView": [, , , 2, , [[7]], ,
            [
                IceMX.UnknownMetricsView
            ], , ],
            "disableMetricsView": [, , , 2, , [[7]], ,
            [
                IceMX.UnknownMetricsView
            ], , ],
            "getMetricsView": [, , , 2, ["IceMX.MetricsViewHelper"], [[7]], [[4]],
            [
                IceMX.UnknownMetricsView
            ], , true],
            "getMapMetricsFailures": [, , , 2, ["IceMX.MetricsFailuresSeqHelper"], [[7], [7]], ,
            [
                IceMX.UnknownMetricsView
            ], , ],
            "getMetricsFailures": [, , , 2, [IceMX.MetricsFailures], [[7], [7], [7]], ,
            [
                IceMX.UnknownMetricsView
            ], , ]
        });
        
        const iceC_IceMX_ThreadMetrics_ids = [
            "::Ice::Object",
            "::IceMX::Metrics",
            "::IceMX::ThreadMetrics"
        ];
        
        /**
         * Provides information on the number of threads currently in use and
         * their activity.
         *
         **/
        IceMX.ThreadMetrics = class extends IceMX.Metrics
        {
            constructor(id, total, current, totalLifetime, failures, inUseForIO = 0, inUseForUser = 0, inUseForOther = 0)
            {
                super(id, total, current, totalLifetime, failures);
                this.inUseForIO = inUseForIO;
                this.inUseForUser = inUseForUser;
                this.inUseForOther = inUseForOther;
            }
        
            _iceWriteMemberImpl(ostr)
            {
                ostr.writeInt(this.inUseForIO);
                ostr.writeInt(this.inUseForUser);
                ostr.writeInt(this.inUseForOther);
            }
        
            _iceReadMemberImpl(istr)
            {
                this.inUseForIO = istr.readInt();
                this.inUseForUser = istr.readInt();
                this.inUseForOther = istr.readInt();
            }
        };
        
        Slice.defineValue(IceMX.ThreadMetrics, iceC_IceMX_ThreadMetrics_ids[2], false);
        
        const iceC_IceMX_DispatchMetrics_ids = [
            "::Ice::Object",
            "::IceMX::DispatchMetrics",
            "::IceMX::Metrics"
        ];
        
        /**
         * Provides information on servant dispatch.
         *
         **/
        IceMX.DispatchMetrics = class extends IceMX.Metrics
        {
            constructor(id, total, current, totalLifetime, failures, userException = 0, size = new Ice.Long(0, 0), replySize = new Ice.Long(0, 0))
            {
                super(id, total, current, totalLifetime, failures);
                this.userException = userException;
                this.size = size;
                this.replySize = replySize;
            }
        
            _iceWriteMemberImpl(ostr)
            {
                ostr.writeInt(this.userException);
                ostr.writeLong(this.size);
                ostr.writeLong(this.replySize);
            }
        
            _iceReadMemberImpl(istr)
            {
                this.userException = istr.readInt();
                this.size = istr.readLong();
                this.replySize = istr.readLong();
            }
        };
        
        Slice.defineValue(IceMX.DispatchMetrics, iceC_IceMX_DispatchMetrics_ids[1], false);
        
        const iceC_IceMX_ChildInvocationMetrics_ids = [
            "::Ice::Object",
            "::IceMX::ChildInvocationMetrics",
            "::IceMX::Metrics"
        ];
        
        /**
         * Provides information on child invocations. A child invocation is
         * either remote (sent over an Ice connection) or collocated. An
         * invocation can have multiple child invocation if it is
         * retried. Child invocation metrics are embedded within
         * {@link InvocationMetrics}.
         *
         **/
        IceMX.ChildInvocationMetrics = class extends IceMX.Metrics
        {
            constructor(id, total, current, totalLifetime, failures, size = new Ice.Long(0, 0), replySize = new Ice.Long(0, 0))
            {
                super(id, total, current, totalLifetime, failures);
                this.size = size;
                this.replySize = replySize;
            }
        
            _iceWriteMemberImpl(ostr)
            {
                ostr.writeLong(this.size);
                ostr.writeLong(this.replySize);
            }
        
            _iceReadMemberImpl(istr)
            {
                this.size = istr.readLong();
                this.replySize = istr.readLong();
            }
        };
        
        Slice.defineValue(IceMX.ChildInvocationMetrics, iceC_IceMX_ChildInvocationMetrics_ids[1], false);
        
        const iceC_IceMX_CollocatedMetrics_ids = [
            "::Ice::Object",
            "::IceMX::ChildInvocationMetrics",
            "::IceMX::CollocatedMetrics",
            "::IceMX::Metrics"
        ];
        
        /**
         * Provides information on invocations that are collocated. Collocated
         * metrics are embedded within {@link InvocationMetrics}.
         *
         **/
        IceMX.CollocatedMetrics = class extends IceMX.ChildInvocationMetrics
        {
            constructor(id, total, current, totalLifetime, failures, size, replySize)
            {
                super(id, total, current, totalLifetime, failures, size, replySize);
            }
        };
        
        Slice.defineValue(IceMX.CollocatedMetrics, iceC_IceMX_CollocatedMetrics_ids[2], false);
        
        const iceC_IceMX_RemoteMetrics_ids = [
            "::Ice::Object",
            "::IceMX::ChildInvocationMetrics",
            "::IceMX::Metrics",
            "::IceMX::RemoteMetrics"
        ];
        
        /**
         * Provides information on invocations that are specifically sent over
         * Ice connections. Remote metrics are embedded within {@link InvocationMetrics}.
         *
         **/
        IceMX.RemoteMetrics = class extends IceMX.ChildInvocationMetrics
        {
            constructor(id, total, current, totalLifetime, failures, size, replySize)
            {
                super(id, total, current, totalLifetime, failures, size, replySize);
            }
        };
        
        Slice.defineValue(IceMX.RemoteMetrics, iceC_IceMX_RemoteMetrics_ids[3], false);
        
        const iceC_IceMX_InvocationMetrics_ids = [
            "::Ice::Object",
            "::IceMX::InvocationMetrics",
            "::IceMX::Metrics"
        ];
        
        /**
         * Provide measurements for proxy invocations. Proxy invocations can
         * either be sent over the wire or be collocated.
         *
         **/
        IceMX.InvocationMetrics = class extends IceMX.Metrics
        {
            constructor(id, total, current, totalLifetime, failures, retry = 0, userException = 0, remotes = null, collocated = null)
            {
                super(id, total, current, totalLifetime, failures);
                this.retry = retry;
                this.userException = userException;
                this.remotes = remotes;
                this.collocated = collocated;
            }
        
            _iceWriteMemberImpl(ostr)
            {
                ostr.writeInt(this.retry);
                ostr.writeInt(this.userException);
                IceMX.MetricsMapHelper.write(ostr, this.remotes);
                IceMX.MetricsMapHelper.write(ostr, this.collocated);
            }
        
            _iceReadMemberImpl(istr)
            {
                this.retry = istr.readInt();
                this.userException = istr.readInt();
                this.remotes = IceMX.MetricsMapHelper.read(istr);
                this.collocated = IceMX.MetricsMapHelper.read(istr);
            }
        };
        
        Slice.defineValue(IceMX.InvocationMetrics, iceC_IceMX_InvocationMetrics_ids[1], false);
        
        const iceC_IceMX_ConnectionMetrics_ids = [
            "::Ice::Object",
            "::IceMX::ConnectionMetrics",
            "::IceMX::Metrics"
        ];
        
        /**
         * Provides information on the data sent and received over Ice
         * connections.
         *
         **/
        IceMX.ConnectionMetrics = class extends IceMX.Metrics
        {
            constructor(id, total, current, totalLifetime, failures, receivedBytes = new Ice.Long(0, 0), sentBytes = new Ice.Long(0, 0))
            {
                super(id, total, current, totalLifetime, failures);
                this.receivedBytes = receivedBytes;
                this.sentBytes = sentBytes;
            }
        
            _iceWriteMemberImpl(ostr)
            {
                ostr.writeLong(this.receivedBytes);
                ostr.writeLong(this.sentBytes);
            }
        
            _iceReadMemberImpl(istr)
            {
                this.receivedBytes = istr.readLong();
                this.sentBytes = istr.readLong();
            }
        };
        
        Slice.defineValue(IceMX.ConnectionMetrics, iceC_IceMX_ConnectionMetrics_ids[1], false);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const HashMap = Ice.HashMap;
        const RouterInfo = Ice.RouterInfo;
        const RouterPrx = Ice.RouterPrx;
        
        class RouterManager
        {
            constructor()
            {
                this._table = new HashMap(HashMap.compareEquals); // Map<Ice.RouterPrx, RouterInfo>
            }
        
            destroy()
            {
                for(const router of this._table.values())
                {
                    router.destroy();
                }
                this._table.clear();
            }
        
            //
            // Returns router info for a given router. Automatically creates
            // the router info if it doesn't exist yet.
            //
            find(rtr)
            {
                if(rtr === null)
                {
                    return null;
                }
        
                //
                // The router cannot be routed.
                //
                const router = RouterPrx.uncheckedCast(rtr.ice_router(null));
        
                let info = this._table.get(router);
                if(info === undefined)
                {
                    info = new RouterInfo(router);
                    this._table.set(router, info);
                }
        
                return info;
            }
        
            erase(rtr)
            {
                let info = null;
                if(rtr !== null)
                {
                    // The router cannot be routed.
                    const router = RouterPrx.uncheckedCast(rtr.ice_router(null));
        
                    info = this._table.get(router);
                    this._table.delete(router);
                }
                return info;
            }
        }
        Ice.RouterManager = RouterManager;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ServantLocatorF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ValueFactory.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const TcpEndpointI = Ice.TcpEndpointI;
        
        class TcpEndpointFactory
        {
            constructor(instance)
            {
                this._instance = instance;
            }
        
            type()
            {
                return this._instance.type();
            }
        
            protocol()
            {
                return this._instance.protocol();
            }
        
            create(args, oaEndpoint)
            {
                const e = new TcpEndpointI(this._instance);
                e.initWithOptions(args, oaEndpoint);
                return e;
            }
        
            read(s)
            {
                const e = new TcpEndpointI(this._instance);
                e.initWithStream(s);
                return e;
            }
        
            destroy()
            {
                this._instance = null;
            }
        
            clone(instance)
            {
                return new TcpEndpointFactory(instance);
            }
        }
        
        Ice.TcpEndpointFactory = TcpEndpointFactory;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `Communicator.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * The output mode for xxxToString method such as identityToString and proxyToString.
         * The actual encoding format for the string is the same for all modes: you
         * don't need to specify an encoding format or mode when reading such a string.
         *
         **/
        Ice.ToStringMode = Slice.defineEnum([
            ['Unicode', 0], ['ASCII', 1], ['Compat', 2]]);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ProcessF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const EndpointI = Ice.EndpointI;
        const HashUtil = Ice.HashUtil;
        
        class WSEndpoint extends EndpointI
        {
            constructor(instance, del, re)
            {
                super();
                this._instance = instance;
                this._delegate = del;
                this._resource = re || "/";
            }
        
            getInfo()
            {
                const info = new Ice.WSEndpointInfo();
                info.type = () => this.type();
                info.datagram = () => this.datagram();
                info.secure = () => this.secure();
                info.resource = this._resource;
                info.underlying = this._delegate.getInfo();
                info.timeout = info.underlying.timeout;
                info.compress = info.underlying.compress;
                return info;
            }
        
            type()
            {
                return this._delegate.type();
            }
        
            protocol()
            {
                return this._delegate.protocol();
            }
        
            streamWrite(s)
            {
                s.startEncapsulation();
                this._delegate.streamWriteImpl(s);
                s.writeString(this._resource);
                s.endEncapsulation();
            }
        
            timeout()
            {
                return this._delegate.timeout();
            }
        
            changeTimeout(timeout)
            {
                if(timeout === this._delegate.timeout())
                {
                    return this;
                }
                else
                {
                    return new WSEndpoint(this._instance, this._delegate.changeTimeout(timeout), this._resource);
                }
            }
        
            changeConnectionId(connectionId)
            {
                if(connectionId === this._delegate.connectionId())
                {
                    return this;
                }
                else
                {
                    return new WSEndpoint(this._instance, this._delegate.changeConnectionId(connectionId), this._resource);
                }
            }
        
            compress()
            {
                return this._delegate.compress();
            }
        
            changeCompress(compress)
            {
                if(compress === this._delegate.compress())
                {
                    return this;
                }
                else
                {
                    return new WSEndpoint(this._instance, this._delegate.changeCompress(compress), this._resource);
                }
            }
        
            datagram()
            {
                return this._delegate.datagram();
            }
        
            secure()
            {
                return this._delegate.secure();
            }
        
            connect()
            {
                return Ice.WSTransceiver.createOutgoing(this._instance,
                                                        this._delegate.secure(),
                                                        this._delegate.getAddress(),
                                                        this._resource);
            }
        
            hashCode()
            {
                if(this._hashCode === undefined)
                {
                    this._hashCode = this._delegate.hashCode();
                    this._hashCode = HashUtil.addString(this._hashCode, this._resource);
                }
                return this._hashCode;
            }
        
            compareTo(p)
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
        
                const r = this._delegate.compareTo(p._delegate);
                if(r !== 0)
                {
                    return r;
                }
        
                if(this._resource !== p._resource)
                {
                    return this._resource < p._resource ? -1 : 1;
                }
        
                return 0;
            }
        
            options()
            {
                //
                // WARNING: Certain features, such as proxy validation in Glacier2,
                // depend on the format of proxy strings. Changes to toString() and
                // methods called to generate parts of the reference string could break
                // these features. Please review for all features that depend on the
                // format of proxyToString() before changing this and related code.
                //
                let s = this._delegate.options();
        
                if(this._resource !== null && this._resource.length > 0)
                {
                    s += " -r ";
                    s += (this._resource.indexOf(':') !== -1) ? ("\"" + this._resource + "\"") : this._resource;
                }
        
                return s;
            }
        
            toConnectorString()
            {
                return this._delegate.toConnectorString();
            }
        
            initWithStream(s)
            {
                this._resource = s.readString();
            }
        
            checkOption(option, argument, endpoint)
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
            }
        
            connectable()
            {
                return typeof WebSocket !== "undefined";
            }
        }
        
        Ice.WSEndpoint = WSEndpoint;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `PropertiesF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `RemoteLogger.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        /**
         * An enumeration representing the different types of log messages.
         *
         **/
        Ice.LogMessageType = Slice.defineEnum([
            ['PrintMessage', 0], ['TraceMessage', 1], ['WarningMessage', 2], ['ErrorMessage', 3]]);
        
        Slice.defineSequence(Ice, "LogMessageTypeSeqHelper", "Ice.LogMessageType._helper", false);
        
        /**
         * A complete log message.
         *
         **/
        Ice.LogMessage = class
        {
            constructor(type = Ice.LogMessageType.PrintMessage, timestamp = new Ice.Long(0, 0), traceCategory = "", message = "")
            {
                this.type = type;
                this.timestamp = timestamp;
                this.traceCategory = traceCategory;
                this.message = message;
            }
        
            _write(ostr)
            {
                Ice.LogMessageType._write(ostr, this.type);
                ostr.writeLong(this.timestamp);
                ostr.writeString(this.traceCategory);
                ostr.writeString(this.message);
            }
        
            _read(istr)
            {
                this.type = Ice.LogMessageType._read(istr);
                this.timestamp = istr.readLong();
                this.traceCategory = istr.readString();
                this.message = istr.readString();
            }
        
            static get minWireSize()
            {
                return  11;
            }
        };
        
        Slice.defineStruct(Ice.LogMessage, true, true);
        
        Slice.defineSequence(Ice, "LogMessageSeqHelper", "Ice.LogMessage", false);
        
        const iceC_Ice_RemoteLogger_ids = [
            "::Ice::Object",
            "::Ice::RemoteLogger"
        ];
        
        /**
         * The Ice remote logger interface. An application can implement a
         * RemoteLogger to receive the log messages sent to the local {@link Logger}
         * of another Ice application.
         *
         **/
        Ice.RemoteLogger = class extends Ice.Object
        {
        };
        
        Ice.RemoteLoggerPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.RemoteLogger, Ice.RemoteLoggerPrx, iceC_Ice_RemoteLogger_ids, 1,
        {
            "init": [, , , , , [[7], ["Ice.LogMessageSeqHelper"]], , , , ],
            "log": [, , , , , [[Ice.LogMessage]], , , , ]
        });
        
        /**
         * Thrown when the provided RemoteLogger was previously attached to a LoggerAdmin.
         *
         **/
        Ice.RemoteLoggerAlreadyAttachedException = class extends Ice.UserException
        {
            constructor(_cause = "")
            {
                super(_cause);
            }
        
            static get _parent()
            {
                return Ice.UserException;
            }
        
            static get _id()
            {
                return "::Ice::RemoteLoggerAlreadyAttachedException";
            }
        
            _mostDerivedType()
            {
                return Ice.RemoteLoggerAlreadyAttachedException;
            }
        };
        
        const iceC_Ice_LoggerAdmin_ids = [
            "::Ice::LoggerAdmin",
            "::Ice::Object"
        ];
        
        /**
         * The interface of the admin object that allows an Ice application the attach its
         * {@link RemoteLogger} to the {@link Logger} of this admin object's Ice communicator.
         *
         **/
        Ice.LoggerAdmin = class extends Ice.Object
        {
        };
        
        Ice.LoggerAdminPrx = class extends Ice.ObjectPrx
        {
        };
        
        Slice.defineOperations(Ice.LoggerAdmin, Ice.LoggerAdminPrx, iceC_Ice_LoggerAdmin_ids, 0,
        {
            "attachRemoteLogger": [, , , , , [["Ice.RemoteLoggerPrx"], ["Ice.LogMessageTypeSeqHelper"], ["Ice.StringSeqHelper"], [3]], ,
            [
                Ice.RemoteLoggerAlreadyAttachedException
            ], , ],
            "detachRemoteLogger": [, , , , [1], [["Ice.RemoteLoggerPrx"]], , , , ],
            "getLog": [, , , , ["Ice.LogMessageSeqHelper"], [["Ice.LogMessageTypeSeqHelper"], ["Ice.StringSeqHelper"], [3]], [[7]], , , ]
        });
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Protocol = Ice.Protocol;
        
        //
        // Ice.InitializationData
        //
        Ice.InitializationData = class
        {
            constructor()
            {
                this.properties = null;
                this.logger = null;
                this.valueFactoryManager = null;
            }
        
            clone()
            {
                const r = new Ice.InitializationData();
                r.properties = this.properties;
                r.logger = this.logger;
                r.valueFactoryManager = this.valueFactoryManager;
                return r;
            }
        };
        
        //
        // Ice.initialize()
        //
        Ice.initialize = function(arg1, arg2)
        {
            let args = null;
            let initData = null;
        
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
        
            const result = new Ice.Communicator(initData);
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
        
        Ice.stringVersion = function()
        {
            return "3.7.9"; // "A.B.C", with A=major, B=minor, C=patch
        };
        
        Ice.intVersion = function()
        {
            return 30709; // AABBCC, with AA=major, BB=minor, CC=patch
        };
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `RouterF.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ServantLocator.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `ObjectAdapter.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        //
        // Ice version 3.7.9
        //
        // <auto-generated>
        //
        // Generated from file `SliceChecksumDict.ice'
        //
        // Warning: do not edit this file.
        //
        // </auto-generated>
        //
        
        /* eslint-disable */
        /* jshint ignore: start */
        
        
        Slice.defineDictionary(Ice, "SliceChecksumDict", "SliceChecksumDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        const WSEndpoint = Ice.WSEndpoint;
        
        class WSEndpointFactory
        {
            constructor(instance, delegate)
            {
                this._instance = instance;
                this._delegate = delegate;
            }
        
            type()
            {
                return this._instance.type();
            }
        
            protocol()
            {
                return this._instance.protocol();
            }
        
            create(args, oaEndpoint)
            {
                const e = new WSEndpoint(this._instance, this._delegate.create(args, oaEndpoint));
                e.initWithOptions(args);
                return e;
            }
        
            read(s)
            {
                const e = new WSEndpoint(this._instance, this._delegate.read(s));
                e.initWithStream(s);
                return e;
            }
        
            destroy()
            {
                this._delegate.destroy();
                this._instance = null;
            }
        }
        
        Ice.WSEndpointFactory = WSEndpointFactory;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const ACMConfig = Ice.ACMConfig;
        const AsyncResultBase = Ice.AsyncResultBase;
        const Debug = Ice.Debug;
        const DefaultsAndOverrides = Ice.DefaultsAndOverrides;
        const EndpointFactoryManager = Ice.EndpointFactoryManager;
        const ImplicitContextI = Ice.ImplicitContextI;
        const LocatorManager = Ice.LocatorManager;
        const ObjectAdapterFactory = Ice.ObjectAdapterFactory;
        const OutgoingConnectionFactory = Ice.OutgoingConnectionFactory;
        const Properties = Ice.Properties;
        const ProxyFactory = Ice.ProxyFactory;
        const ReferenceFactory = Ice.ReferenceFactory;
        const RequestHandlerFactory = Ice.RequestHandlerFactory;
        const RetryQueue = Ice.RetryQueue;
        const RouterManager = Ice.RouterManager;
        const Timer = Ice.Timer;
        const TraceLevels = Ice.TraceLevels;
        const ValueFactoryManagerI = Ice.ValueFactoryManagerI;
        
        const StateActive = 0;
        const StateDestroyInProgress = 1;
        const StateDestroyed = 2;
        
        //
        // Instance - only for use by Communicator
        //
        class Instance
        {
            constructor(initData)
            {
                this._state = StateActive;
                this._initData = initData;
        
                this._traceLevels = null;
                this._defaultsAndOverrides = null;
                this._messageSizeMax = 0;
                this._batchAutoFlushSize = 0;
                this._clientACM = null;
                this._toStringMode = Ice.ToStringMode.Unicode;
                this._implicitContext = null;
                this._routerManager = null;
                this._locatorManager = null;
                this._referenceFactory = null;
                this._requestHandlerFactory = null;
                this._proxyFactory = null;
                this._outgoingConnectionFactory = null;
                this._objectAdapterFactory = null;
                this._retryQueue = null;
                this._endpointHostResolver = null;
                this._endpointFactoryManager = null;
                this._objectFactoryMap = null;
            }
        
            initializationData()
            {
                //
                // No check for destruction. It must be possible to access the
                // initialization data after destruction.
                //
                // This value is immutable.
                //
                return this._initData;
            }
        
            traceLevels()
            {
                // This value is immutable.
                Debug.assert(this._traceLevels !== null);
                return this._traceLevels;
            }
        
            defaultsAndOverrides()
            {
                // This value is immutable.
                Debug.assert(this._defaultsAndOverrides !== null);
                return this._defaultsAndOverrides;
            }
        
            routerManager()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._routerManager !== null);
                return this._routerManager;
            }
        
            locatorManager()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._locatorManager !== null);
                return this._locatorManager;
            }
        
            referenceFactory()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._referenceFactory !== null);
                return this._referenceFactory;
            }
        
            requestHandlerFactory()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._requestHandlerFactory !== null);
                return this._requestHandlerFactory;
            }
        
            proxyFactory()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._proxyFactory !== null);
                return this._proxyFactory;
            }
        
            outgoingConnectionFactory()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._outgoingConnectionFactory !== null);
                return this._outgoingConnectionFactory;
            }
        
            objectAdapterFactory()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._objectAdapterFactory !== null);
                return this._objectAdapterFactory;
            }
        
            retryQueue()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._retryQueue !== null);
                return this._retryQueue;
            }
        
            timer()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._timer !== null);
                return this._timer;
            }
        
            endpointFactoryManager()
            {
                if(this._state === StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                Debug.assert(this._endpointFactoryManager !== null);
                return this._endpointFactoryManager;
            }
        
            messageSizeMax()
            {
                // This value is immutable.
                return this._messageSizeMax;
            }
        
            batchAutoFlushSize()
            {
                // This value is immutable.
                return this._batchAutoFlushSize;
            }
        
            clientACM()
            {
                // This value is immutable.
                return this._clientACM;
            }
        
            toStringMode()
            {
                // this value is immutable
                return this._toStringMode;
            }
        
            getImplicitContext()
            {
                return this._implicitContext;
            }
        
            setDefaultLocator(locator)
            {
                if(this._state == StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                this._referenceFactory = this._referenceFactory.setDefaultLocator(locator);
            }
        
            setDefaultRouter(router)
            {
                if(this._state == StateDestroyed)
                {
                    throw new Ice.CommunicatorDestroyedException();
                }
        
                this._referenceFactory = this._referenceFactory.setDefaultRouter(router);
            }
        
            setLogger(logger)
            {
                this._initData.logger = logger;
            }
        
            finishSetup(communicator, promise)
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
        
                    if(Ice._oneOfDone === undefined)
                    {
                        Ice._printStackTraces =
                            this._initData.properties.getPropertyAsIntWithDefault("Ice.PrintStackTraces", 0) > 0;
        
                        Ice._oneOfDone = true;
                    }
        
                    if(this._initData.logger === null)
                    {
                        this._initData.logger = Ice.getProcessLogger();
                    }
        
                    this._traceLevels = new TraceLevels(this._initData.properties);
        
                    this._defaultsAndOverrides = new DefaultsAndOverrides(this._initData.properties, this._initData.logger);
        
                    const defMessageSizeMax = 1024;
                    let num = this._initData.properties.getPropertyAsIntWithDefault("Ice.MessageSizeMax", defMessageSizeMax);
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
        
                    const toStringModeStr = this._initData.properties.getPropertyWithDefault("Ice.ToStringMode", "Unicode");
                    if(toStringModeStr === "ASCII")
                    {
                        this._toStringMode = Ice.ToStringMode.ASCII;
                    }
                    else if(toStringModeStr === "Compat")
                    {
                        this._toStringMode = Ice.ToStringMode.Compat;
                    }
                    else if(toStringModeStr !== "Unicode")
                    {
                        throw new Ice.InitializationException("The value for Ice.ToStringMode must be Unicode, ASCII or Compat");
                    }
        
                    this._implicitContext =
                        ImplicitContextI.create(this._initData.properties.getProperty("Ice.ImplicitContext"));
        
                    this._routerManager = new RouterManager();
        
                    this._locatorManager = new LocatorManager(this._initData.properties);
        
                    this._referenceFactory = new ReferenceFactory(this, communicator);
        
                    this._requestHandlerFactory = new RequestHandlerFactory(this, communicator);
        
                    this._proxyFactory = new ProxyFactory(this);
        
                    this._endpointFactoryManager = new EndpointFactoryManager(this);
        
                    const tcpInstance = new Ice.ProtocolInstance(this, Ice.TCPEndpointType, "tcp", false);
                    const tcpEndpointFactory = new Ice.TcpEndpointFactory(tcpInstance);
                    this._endpointFactoryManager.add(tcpEndpointFactory);
        
                    const wsInstance = new Ice.ProtocolInstance(this, Ice.WSEndpointType, "ws", false);
                    const wsEndpointFactory = new Ice.WSEndpointFactory(wsInstance, tcpEndpointFactory.clone(wsInstance));
                    this._endpointFactoryManager.add(wsEndpointFactory);
        
                    const sslInstance = new Ice.ProtocolInstance(this, Ice.SSLEndpointType, "ssl", true);
                    const sslEndpointFactory = new Ice.TcpEndpointFactory(sslInstance);
                    this._endpointFactoryManager.add(sslEndpointFactory);
        
                    const wssInstance = new Ice.ProtocolInstance(this, Ice.WSSEndpointType, "wss", true);
                    const wssEndpointFactory = new Ice.WSEndpointFactory(wssInstance, sslEndpointFactory.clone(wssInstance));
                    this._endpointFactoryManager.add(wssEndpointFactory);
        
                    this._outgoingConnectionFactory = new OutgoingConnectionFactory(communicator, this);
        
                    if(this._initData.valueFactoryManager === null)
                    {
                        this._initData.valueFactoryManager = new ValueFactoryManagerI();
                    }
        
                    this._objectAdapterFactory = new ObjectAdapterFactory(this, communicator);
        
                    this._retryQueue = new RetryQueue(this);
                    this._timer = new Timer(this._initData.logger);
        
                    const router = Ice.RouterPrx.uncheckedCast(this._proxyFactory.propertyToProxy("Ice.Default.Router"));
                    if(router !== null)
                    {
                        this._referenceFactory = this._referenceFactory.setDefaultRouter(router);
                    }
        
                    const loc = Ice.LocatorPrx.uncheckedCast(this._proxyFactory.propertyToProxy("Ice.Default.Locator"));
                    if(loc !== null)
                    {
                        this._referenceFactory = this._referenceFactory.setDefaultLocator(loc);
                    }
        
                    if(promise !== null)
                    {
                        promise.resolve(communicator);
                    }
                }
                catch(ex)
                {
                    if(promise !== null)
                    {
                        if(ex instanceof Ice.LocalException)
                        {
                            this.destroy().finally(() => promise.reject(ex));
                        }
                        else
                        {
                            promise.reject(ex);
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
            }
        
            //
            // Only for use by Ice.CommunicatorI
            //
            destroy()
            {
                const promise = new AsyncResultBase(null, "destroy", null, this, null);
        
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
                Ice.Promise.try(() =>
                    {
                        if(this._objectAdapterFactory)
                        {
                            return this._objectAdapterFactory.shutdown();
                        }
                    }
                ).then(() =>
                    {
                        if(this._outgoingConnectionFactory !== null)
                        {
                            this._outgoingConnectionFactory.destroy();
                        }
        
                        if(this._objectAdapterFactory !== null)
                        {
                            return this._objectAdapterFactory.destroy();
                        }
                    }
                ).then(() =>
                    {
                        if(this._outgoingConnectionFactory !== null)
                        {
                            return this._outgoingConnectionFactory.waitUntilFinished();
                        }
                    }
                ).then(() =>
                    {
                        if(this._retryQueue)
                        {
                            this._retryQueue.destroy();
                        }
                        if(this._timer)
                        {
                            this._timer.destroy();
                        }
        
                        if(this._objectFactoryMap !== null)
                        {
                            this._objectFactoryMap.forEach(factory => factory.destroy());
                            this._objectFactoryMap.clear();
                        }
        
                        if(this._routerManager)
                        {
                            this._routerManager.destroy();
                        }
                        if(this._locatorManager)
                        {
                            this._locatorManager.destroy();
                        }
                        if(this._endpointFactoryManager)
                        {
                            this._endpointFactoryManager.destroy();
                        }
        
                        if(this._initData.properties.getPropertyAsInt("Ice.Warn.UnusedProperties") > 0)
                        {
                            const unusedProperties = this._initData.properties.getUnusedProperties();
                            if(unusedProperties.length > 0)
                            {
                                const message = [];
                                message.push("The following properties were set but never read:");
                                unusedProperties.forEach(p => message.push("\n    ", p));
                                this._initData.logger.warning(message.join(""));
                            }
                        }
        
                        this._objectAdapterFactory = null;
                        this._outgoingConnectionFactory = null;
                        this._retryQueue = null;
                        this._timer = null;
        
                        this._referenceFactory = null;
                        this._requestHandlerFactory = null;
                        this._proxyFactory = null;
                        this._routerManager = null;
                        this._locatorManager = null;
                        this._endpointFactoryManager = null;
        
                        this._state = StateDestroyed;
        
                        if(this._destroyPromises)
                        {
                            this._destroyPromises.forEach(p => p.resolve());
                        }
                        promise.resolve();
                    }
                ).catch(ex =>
                    {
                        if(this._destroyPromises)
                        {
                            this._destroyPromises.forEach(p => p.reject(ex));
                        }
                        promise.reject(ex);
                    });
                return promise;
            }
        
            addObjectFactory(factory, id)
            {
                //
                // Create a ValueFactory wrapper around the given ObjectFactory and register the wrapper
                // with the value factory manager. This may raise AlreadyRegisteredException.
                //
                this._initData.valueFactoryManager.add(typeId => factory.create(typeId), id);
        
                if(this._objectFactoryMap === null)
                {
                    this._objectFactoryMap = new Map();
                }
        
                this._objectFactoryMap.set(id, factory);
            }
        
            findObjectFactory(id)
            {
                let factory = null;
                if(this._objectFactoryMap !== null)
                {
                    factory = this._objectFactoryMap.get(id);
                }
                return factory !== undefined ? factory : null;
            }
        }
        
        Ice.Instance = Instance;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
        const Instance = Ice.Instance;
        const Debug = Ice.Debug;
        
        //
        // Ice.Communicator
        //
        class Communicator
        {
            constructor(initData)
            {
                this._instance = new Instance(initData);
            }
        
            //
            // Certain initialization tasks need to be completed after the
            // constructor.
            //
            finishSetup(promise)
            {
                this._instance.finishSetup(this, promise);
            }
        
            destroy()
            {
                return this._instance.destroy();
            }
        
            shutdown()
            {
                try
                {
                    return this._instance.objectAdapterFactory().shutdown();
                }
                catch(ex)
                {
                    Debug.assert(ex instanceof Ice.CommunicatorDestroyedException);
                    return Ice.Promise.resolve();
                }
            }
        
            waitForShutdown()
            {
                try
                {
                    return this._instance.objectAdapterFactory().waitForShutdown();
                }
                catch(ex)
                {
                    Debug.assert(ex instanceof Ice.CommunicatorDestroyedException);
                    return Ice.Promise.resolve();
                }
            }
        
            isShutdown()
            {
                try
                {
                    return this._instance.objectAdapterFactory().isShutdown();
                }
                catch(ex)
                {
                    if(!(ex instanceof Ice.CommunicatorDestroyedException))
                    {
                        throw ex;
                    }
                    return true;
                }
            }
        
            stringToProxy(s)
            {
                return this._instance.proxyFactory().stringToProxy(s);
            }
        
            proxyToString(proxy)
            {
                return this._instance.proxyFactory().proxyToString(proxy);
            }
        
            propertyToProxy(s)
            {
                return this._instance.proxyFactory().propertyToProxy(s);
            }
        
            proxyToProperty(proxy, prefix)
            {
                return this._instance.proxyFactory().proxyToProperty(proxy, prefix);
            }
        
            stringToIdentity(s)
            {
                return Ice.stringToIdentity(s);
            }
        
            identityToString(ident)
            {
                return Ice.identityToString(ident, this._instance.toStringMode());
            }
        
            createObjectAdapter(name)
            {
                const promise = new Ice.AsyncResultBase(this, "createObjectAdapter", this, null, null);
                this._instance.objectAdapterFactory().createObjectAdapter(name, null, promise);
                return promise;
            }
        
            createObjectAdapterWithEndpoints(name, endpoints)
            {
                if(name.length === 0)
                {
                    name = Ice.generateUUID();
                }
        
                this.getProperties().setProperty(name + ".Endpoints", endpoints);
                const promise = new Ice.AsyncResultBase(this, "createObjectAdapterWithEndpoints", this, null, null);
                this._instance.objectAdapterFactory().createObjectAdapter(name, null, promise);
                return promise;
            }
        
            createObjectAdapterWithRouter(name, router)
            {
                if(name.length === 0)
                {
                    name = Ice.generateUUID();
                }
        
                const promise = new Ice.AsyncResultBase(this, "createObjectAdapterWithRouter", this, null, null);
        
                //
                // We set the proxy properties here, although we still use the proxy supplied.
                //
                this.proxyToProperty(router, name + ".Router").forEach((value, key) =>
                    {
                        this.getProperties().setProperty(key, value);
                    });
        
                this._instance.objectAdapterFactory().createObjectAdapter(name, router, promise);
                return promise;
            }
        
            addObjectFactory(factory, id)
            {
                this._instance.addObjectFactory(factory, id);
            }
        
            findObjectFactory(id)
            {
                return this._instance.findObjectFactory(id);
            }
        
            getValueFactoryManager()
            {
                return this._instance.initializationData().valueFactoryManager;
            }
        
            getImplicitContext()
            {
                return this._instance.getImplicitContext();
            }
        
            getProperties()
            {
                return this._instance.initializationData().properties;
            }
        
            getLogger()
            {
                return this._instance.initializationData().logger;
            }
        
            getDefaultRouter()
            {
                return this._instance.referenceFactory().getDefaultRouter();
            }
        
            setDefaultRouter(router)
            {
                this._instance.setDefaultRouter(router);
            }
        
            getDefaultLocator()
            {
                return this._instance.referenceFactory().getDefaultLocator();
            }
        
            setDefaultLocator(locator)
            {
                this._instance.setDefaultLocator(locator);
            }
        
            flushBatchRequests()
            {
                return this._instance.outgoingConnectionFactory().flushAsyncBatchRequests();
            }
        
            get instance()
            {
                return this._instance;
            }
        }
        
        Ice.Communicator = Communicator;
        
    }());

    (function()
    {
        //
        // Copyright (c) ZeroC, Inc. All rights reserved.
        //
        
        
        
    }());

    root.Ice = Ice;
    root.IceMX = IceMX;
    root.IceSSL = IceSSL;
    root.ice = ice;
}());

