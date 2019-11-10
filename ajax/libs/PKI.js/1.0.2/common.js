/*
 * Copyright (c) 2014, GMO GlobalSign
 * All rights reserved.
 *
 * Author 2014, Yury Strozhevsky <www.strozhevsky.com>.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, 
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, 
 *    this list of conditions and the following disclaimer in the documentation 
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors 
 *    may be used to endorse or promote products derived from this software without 
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY 
 * OF SUCH DAMAGE. 
 *
 */
(
function(in_window)
{
    //**************************************************************************************
    // #region Declaration of global variables 
    //**************************************************************************************
    // #region "org" namespace 
    if(typeof in_window.org === "undefined")
        in_window.org = {};
    else
    {
        if(typeof in_window.org !== "object")
            throw new Error("Name org already exists and it's not an object");
    }
    // #endregion 

    // #region "org.pkijs" namespace 
    if(typeof in_window.org.pkijs === "undefined")
        in_window.org.pkijs = {};
    else
    {
        if(typeof in_window.org.pkijs !== "object")
            throw new Error("Name org.pkijs already exists and it's not an object" + " but " + (typeof in_window.org.pkijs));
    }
    // #endregion 

    // #region "local" namespace 
    var local = {};
    // #endregion   
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Declaration of common functions 
    //**************************************************************************************
    in_window.org.pkijs.getNames =
    function(arg)
    {
        /// <summary>Get correct "names" array for all "schema" objects</summary>

        var names = {};

        if(arg instanceof Object)
            names = (arg.names || {});

        return names;
    }
    //**************************************************************************************
    in_window.org.pkijs.getValue =
    function(args, item, default_value)
    {
        if(item in args)
            return args[item];
        else
            return default_value;
    }
    //**************************************************************************************
    in_window.org.pkijs.isEqual_view =
    function(input_view1, input_view2)
    {
        /// <summary>Compare two Uint8Arrays</summary>
        /// <param name="input_view1" type="Uint8Array">First Uint8Array for comparision</param>
        /// <param name="input_view2" type="Uint8Array">Second Uint8Array for comparision</param>

        if(input_view1.length !== input_view2.length)
            return false;

        for(var i = 0; i < input_view1.length; i++)
        {
            if(input_view1[i] != input_view2[i])
                return false;
        }

        return true;
    }
    //**************************************************************************************
    in_window.org.pkijs.isEqual_buffer =
    function(input_buffer1, input_buffer2)
    {
        /// <summary>Compare two array buffers</summary>
        /// <param name="input_buffer1" type="ArrayBuffer">First ArrayBuffer for comparision</param>
        /// <param name="input_buffer2" type="ArrayBuffer">Second ArrayBuffer for comparision</param>

        if(input_buffer1.byteLength != input_buffer2.byteLength)
            return false;

        var view1 = new Uint8Array(input_buffer1);
        var view2 = new Uint8Array(input_buffer2);

        return in_window.org.pkijs.isEqual_view(view1, view2);
    }
    //**************************************************************************************
    in_window.org.pkijs.concat_buffers =
    function(input_buf1, input_buf2)
    {
        /// <summary>Concatenate two ArrayBuffers</summary>
        /// <param name="input_buf1" type="ArrayBuffer">First ArrayBuffer (first part of concatenated array)</param>
        /// <param name="input_buf2" type="ArrayBuffer">Second ArrayBuffer (second part of concatenated array)</param>

        var input_view1 = new Uint8Array(input_buf1);
        var input_view2 = new Uint8Array(input_buf2);

        var ret_buf = new ArrayBuffer(input_buf1.byteLength + input_buf2.byteLength);
        var ret_view = new Uint8Array(ret_buf);

        for(var i = 0; i < input_buf1.byteLength; i++)
            ret_view[i] = input_view1[i];

        for(var j = 0; j < input_buf2.byteLength; j++)
            ret_view[input_buf1.byteLength + j] = input_view2[j];

        return ret_buf;
    }
    //**************************************************************************************
    in_window.org.pkijs.copyBuffer =
    function(input_buffer)
    {
        var result = new ArrayBuffer(input_buffer.byteLength);

        var resultView = new Uint8Array(result);
        var inputView = new Uint8Array(input_buffer);

        for(var i = 0; i < inputView.length; i++)
            resultView[i] = inputView[i];

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.getCrypto =
    function()
    {
        var crypto_temp = {};
        //crypto_temp = window.msCrypto;
        //if(typeof crypto_temp === "undefined")
        //crypto_temp = window.polycrypt;
        //else
        crypto_temp = window.crypto.subtle;

        return crypto_temp;
    }
    //**************************************************************************************
    in_window.org.pkijs.stringPrep =
    function(input_string)
    {
        /// <summary>String preparation function. In a future here will be realization of algorithm from RFC4518.</summary>
        /// <param name="input_string" type="String">JavaScript string. As soon as for each ASN.1 string type we have a specific transformation function here we will work with pure JavaScript string</param>
        /// <returns type="String">Formated string</returns>

        var result = input_string.replace(/^\s+|\s+$/g, ""); // Trim input string
        result = result.replace(/\s+/g, " "); // Change all sequence of SPACE down to SPACE char
        result = result.toLowerCase();

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.bufferToHexCodes =
    function(input_buffer, input_offset, input_lenght)
    {
        var result = "";

        var int_buffer = new Uint8Array(input_buffer, input_offset, input_lenght);

        for(var i = 0; i < int_buffer.length; i++)
        {
            var str = int_buffer[i].toString(16).toUpperCase();
            result = result + ((str.length === 1) ? "0" : "") + str;
        }

        return result;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
}
)(typeof exports !== "undefined" ? exports : window);