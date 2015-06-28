////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2004-2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

package mx.utils
{

import flash.utils.ByteArray;

/**
 * A utility class to encode a String or ByteArray as a Base64 encoded String.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
public class Base64Encoder
{
    //--------------------------------------------------------------------------
    //
    //  Static Class Variables
    //
    //--------------------------------------------------------------------------

    /**
     *  Constant definition for the string "UTF-8".
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static const CHARSET_UTF_8:String = "UTF-8";

    /**
     * The character codepoint to be inserted into the encoded output to
     * denote a new line if <code>insertNewLines</code> is true.
     * 
     * The default is <code>10</code> to represent the line feed <code>\n</code>.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public static var newLine:int = 10;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    /**
     * Constructor.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public function Base64Encoder()
    {
        super();
        reset();
    }

    //--------------------------------------------------------------------------
    //
    //  Variables
    //
    //--------------------------------------------------------------------------

    /**
     * A Boolean flag to control whether the sequence of characters specified
     * for <code>Base64Encoder.newLine</code> are inserted every 76 characters
     * to wrap the encoded output.
     * 
     * The default is true.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public var insertNewLines:Boolean = true;

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    public function drain():String
    {
        var result:String = "";

        for (var i:uint = 0; i < _buffers.length; i++)
        {
            var buffer:Array = _buffers[i] as Array;
            result += String.fromCharCode.apply(null, buffer);
        }

        _buffers = [];
        _buffers.push([]);

        return result;
    }

    /**
     * Encodes the characters of a String in Base64 and adds the result to
     * an internal buffer. Subsequent calls to this method add on to the
     * internal buffer. After all data have been encoded, call
     * <code>toString()</code> to obtain a Base64 encoded String.
     * 
     * @param data The String to encode.
     * @param offset The character position from which to start encoding.
     * @param length The number of characters to encode from the offset.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public function encode(data:String, offset:uint=0, length:uint=0):void
    {
        if (length == 0)
            length = data.length;

        var currentIndex:uint = offset;

        var endIndex:uint = offset + length;
        if (endIndex > data.length)
            endIndex = data.length;

        while (currentIndex < endIndex)
        {
            _work[_count] = data.charCodeAt(currentIndex);
            _count++;

            if (_count == _work.length || endIndex - currentIndex == 1)
            {
                encodeBlock();
                _count = 0;
                _work[0] = 0;
                _work[1] = 0;
                _work[2] = 0;
            }
            currentIndex++;
        }
    }

    /**
     * Encodes the UTF-8 bytes of a String in Base64 and adds the result to an
     * internal buffer. The UTF-8 information does not contain a length prefix. 
     * Subsequent calls to this method add on to the internal buffer. After all
     * data have been encoded, call <code>toString()</code> to obtain a Base64
     * encoded String.
     * 
     * @param data The String to encode.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public function encodeUTFBytes(data:String):void
    {
        var bytes:ByteArray = new ByteArray();
        bytes.writeUTFBytes(data);
        bytes.position = 0;
        encodeBytes(bytes);
    }

    /**
     * Encodes a ByteArray in Base64 and adds the result to an internal buffer.
     * Subsequent calls to this method add on to the internal buffer. After all
     * data have been encoded, call <code>toString()</code> to obtain a
     * Base64 encoded String.
     * 
     * @param data The ByteArray to encode.
     * @param offset The index from which to start encoding.
     * @param length The number of bytes to encode from the offset.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public function encodeBytes(data:ByteArray, offset:uint=0, length:uint=0):void
    {
        if (length == 0)
            length = data.length;

        var oldPosition:uint = data.position;
        data.position = offset;
        var currentIndex:uint = offset;

        var endIndex:uint = offset + length;
        if (endIndex > data.length)
            endIndex = data.length;

        while (currentIndex < endIndex)
        {
            _work[_count] = data[currentIndex];
            _count++;

            if (_count == _work.length || endIndex - currentIndex == 1)
            {
                encodeBlock();
                _count = 0;
                _work[0] = 0;
                _work[1] = 0;
                _work[2] = 0;
            }
            currentIndex++;
        }

        data.position = oldPosition;
    }

    /**
     * @private
     */
    public function flush():String
    {
        if (_count > 0)
            encodeBlock();

        var result:String = drain();
        reset();
        return result;
    }

    /**
     * Clears all buffers and resets the encoder to its initial state.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public function reset():void
    {
        _buffers = [];
        _buffers.push([]);
        _count = 0;
        _line = 0;
        _work[0] = 0;
        _work[1] = 0;
        _work[2] = 0;
    }

    /**
     * Returns the current buffer as a Base64 encoded String. Note that
     * calling this method also clears the buffer and resets the 
     * encoder to its initial state.
     * 
     * @return The Base64 encoded String.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    public function toString():String
    {
        return flush();
    }

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    private function encodeBlock():void
    {
        var currentBuffer:Array = _buffers[_buffers.length - 1] as Array;
        if (currentBuffer.length >= MAX_BUFFER_SIZE)
        {
            currentBuffer = [];
            _buffers.push(currentBuffer);
        }

        currentBuffer.push(ALPHABET_CHAR_CODES[(_work[0] & 0xFF) >> 2]);
        currentBuffer.push(ALPHABET_CHAR_CODES[((_work[0] & 0x03) << 4) | ((_work[1] & 0xF0) >> 4)]);

        if (_count > 1)
            currentBuffer.push(ALPHABET_CHAR_CODES[((_work[1] & 0x0F) << 2) | ((_work[2] & 0xC0) >> 6) ]);
        else
            currentBuffer.push(ESCAPE_CHAR_CODE);

        if (_count > 2)
            currentBuffer.push(ALPHABET_CHAR_CODES[_work[2] & 0x3F]);
        else
            currentBuffer.push(ESCAPE_CHAR_CODE);

        if (insertNewLines)
        {
            if ((_line += 4) == 76)
            {
                currentBuffer.push(newLine);
                _line = 0;
            }
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Private Variables
    //
    //--------------------------------------------------------------------------

    /**
     * An Array of buffer Arrays.
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     */
    private var _buffers:Array;
    private var _count:uint;
    private var _line:uint;
    private var _work:Array = [ 0, 0, 0 ];

    /**
     * This value represents a safe number of characters (i.e. arguments) that
     * can be passed to String.fromCharCode.apply() without exceeding the AVM+
     * stack limit.
     * 
     * @private
     */
    public static const MAX_BUFFER_SIZE:uint = 32767;

    private static const ESCAPE_CHAR_CODE:Number = 61; // The '=' char

    /*
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    */
    private static const ALPHABET_CHAR_CODES:Array =
    [
        65,   66,  67,  68,  69,  70,  71,  72,
        73,   74,  75,  76,  77,  78,  79,  80,
        81,   82,  83,  84,  85,  86,  87,  88,
        89,   90,  97,  98,  99, 100, 101, 102,
        103, 104, 105, 106, 107, 108, 109, 110,
        111, 112, 113, 114, 115, 116, 117, 118,
        119, 120, 121, 122,  48,  49,  50,  51,
        52,   53,  54,  55,  56,  57,  43,  47
    ];

}

}
