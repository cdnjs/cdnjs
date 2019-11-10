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
    in_window.org.pkijs.emptyObject =
    function()
    {
        this.toJSON = function()
        {
            return {};
        };
        this.toSchema = function()
        {
            return {};
        };
    }
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
    in_window.org.pkijs.getRandomValues =
    function(view)
    {
        /// <param name="view" type="Uint8Array">New array which gives a length for random value</param>

        var crypto_temp = {};
        //crypto_temp = window.msCrypto;
        //if(typeof crypto_temp === "undefined")
        //crypto_temp = window.polycrypt;
        //else
        crypto_temp = window.crypto;

        return crypto_temp.getRandomValues(view);
    }
    //**************************************************************************************
    in_window.org.pkijs.getAlgorithmParameters =
    function(algorithmName, operation)
    {
        /// <param name="algorithmName" type="String">Algorithm name to get common parameters for</param>
        /// <param name="operation" type="String">Kind of operation: "sign", "encrypt", "generatekey", "importkey", "exportkey", "verify"</param>

        var result = {
            algorithm: {},
            usages: []
        };

        switch(algorithmName.toUpperCase())
        {
            case "RSASSA-PKCS1-V1_5":
                switch(operation.toLowerCase())
                {
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "RSASSA-PKCS1-v1_5",
                                modulusLength: 2048,
                                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                                hash: {
                                    name: "SHA-256"
                                },
                            },
                            usages: ["sign", "verify"]
                        };
                        break;
                    case "verify":
                    case "sign":
                    case "importkey":
                        result = {
                            algorithm: {
                                name: "RSASSA-PKCS1-v1_5",
                                hash: {
                                    name: "SHA-256"
                                },
                            },
                            usages: ["verify"] // For importKey("pkcs8") usage must be "sign" only
                        };
                        break;
                    case "exportkey":
                    default:
                        return {
                            algorithm: {
                                name: "RSASSA-PKCS1-v1_5"
                            },
                            usages: []
                        };
                }
                break;
            case "RSA-PSS":
                switch(operation.toLowerCase())
                {
                    case "sign":
                    case "verify":
                        result = {
                            algorithm: {
                                name: "RSA-PSS",
                                hash: {
                                    name: "SHA-1"
                                },
                                saltLength: 20
                            },
                            usages: ["sign", "verify"]
                        };
                        break;
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "RSA-PSS",
                                modulusLength: 2048,
                                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                                hash: {
                                    name: "SHA-1"
                                }
                            },
                            usages: ["sign", "verify"]
                        };
                        break;
                    case "importkey":
                        result = {
                            algorithm: {
                                name: "RSA-PSS",
                                hash: {
                                    name: "SHA-1"
                                },
                            },
                            usages: ["verify"] // For importKey("pkcs8") usage must be "sign" only
                        };
                        break;
                    case "exportkey":
                    default:
                        return {
                            algorithm: {
                                name: "RSA-PSS"
                            },
                            usages: []
                        };
                }
                break;
            case "RSA-OAEP":
                switch(operation.toLowerCase())
                {
                    case "encrypt":
                    case "decrypt":
                        result = {
                            algorithm: {
                                name: "RSA-OAEP",
                            },
                            usages: ["encrypt", "decrypt"]
                        };
                        break;
                        break;
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "RSA-OAEP",
                                modulusLength: 2048,
                                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                                hash: {
                                    name: "SHA-256"
                                }
                            },
                            usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
                        };
                        break;
                    case "importkey":
                        result = {
                            algorithm: {
                                name: "RSA-OAEP",
                                hash: {
                                    name: "SHA-256"
                                }
                            },
                            usages: ["encrypt"] // encrypt for "spki" and decrypt for "pkcs8"
                        };
                        break;
                    case "exportkey":
                    default:
                        return {
                            algorithm: {
                                name: "RSA-OAEP"
                            },
                            usages: []
                        };
                }
                break;
            case "ECDSA":
                switch(operation.toLowerCase())
                {
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "ECDSA",
                                namedCurve: "P-256"
                            },
                            usages: ["sign", "verify"]
                        };
                        break;
                    case "importkey":
                        result = {
                            algorithm: {
                                name: "ECDSA",
                                namedCurve: "P-256"
                            },
                            usages: ["verify"] // "sign" for "pkcs8"
                        };
                        break;
                    case "verify":
                    case "sign":
                        result = {
                            algorithm: {
                                name: "ECDSA",
                                hash: {
                                    name: "SHA-256"
                                }
                            },
                            usages: ["sign"]
                        };
                        break;
                    default:
                        return {
                            algorithm: {
                                name: "ECDSA"
                            },
                            usages: []
                        };
                }
                break;
            case "ECDH":
                switch(operation.toLowerCase())
                {
                    case "exportkey":
                    case "importkey":
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "ECDH",
                                namedCurve: "P-256"
                            },
                            usages: ["deriveKey", "deriveBits"]
                        };
                        break;
                    case "derivekey":
                    case "derivebits":
                        result = {
                            algorithm: {
                                name: "ECDH",
                                namedCurve: "P-256",
                                public: [] // Must be a "publicKey"
                            },
                            usages: ["encrypt", "decrypt"]
                        };
                        break;
                    default:
                        return {
                            algorithm: {
                                name: "ECDH"
                            },
                            usages: []
                        };
                }
                break;
            case "AES-CTR":
                switch(operation.toLowerCase())
                {
                    case "importkey":
                    case "exportkey":
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "AES-CTR",
                                length: 256
                            },
                            usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
                        };
                        break;
                    case "decrypt":
                    case "encrypt":
                        result = {
                            algorithm: {
                                name: "AES-CTR",
                                counter: new Uint8Array(16),
                                length: 10
                            },
                            usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
                        };
                    default:
                        return {
                            algorithm: {
                                name: "AES-CTR"
                            },
                            usages: []
                        };
                }
                break;
            case "AES-CBC":
                switch(operation.toLowerCase())
                {
                    case "importkey":
                    case "exportkey":
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "AES-CBC",
                                length: 256
                            },
                            usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
                        };
                        break;
                    case "decrypt":
                    case "encrypt":
                        result = {
                            algorithm: {
                                name: "AES-CBC",
                                iv: in_window.org.pkijs.getRandomValues(new Uint8Array(16)) // For "decrypt" the value should be replaced with value got on "encrypt" step
                            },
                            usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
                        };
                    default:
                        return {
                            algorithm: {
                                name: "AES-CBC"
                            },
                            usages: []
                        };
                }
                break;
            case "AES-GCM":
                switch(operation.toLowerCase())
                {
                    case "importkey":
                    case "exportkey":
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "AES-GCM",
                                length: 256
                            },
                            usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
                        };
                        break;
                    case "decrypt":
                    case "encrypt":
                        result = {
                            algorithm: {
                                name: "AES-GCM",
                                iv: in_window.org.pkijs.getRandomValues(new Uint8Array(16)) // For "decrypt" the value should be replaced with value got on "encrypt" step
                            },
                            usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
                        };
                    default:
                        return {
                            algorithm: {
                                name: "AES-GCM"
                            },
                            usages: []
                        };
                }
                break;
            case "AES-KW":
                switch(operation.toLowerCase())
                {
                    case "importkey":
                    case "exportkey":
                    case "generatekey":
                    case "wrapkey":
                    case "unwrapkey":
                        result = {
                            algorithm: {
                                name: "AES-KW",
                                length: 256
                            },
                            usages: ["wrapKey", "unwrapKey"]
                        };
                        break;
                    default:
                        return {
                            algorithm: {
                                name: "AES-KW"
                            },
                            usages: []
                        };
                }
                break;
            case "HMAC":
                switch(operation.toLowerCase())
                {
                    case "sign":
                    case "verify":
                        result = {
                            algorithm: {
                                name: "HMAC",
                            },
                            usages: ["sign", "verify"]
                        };
                        break;
                    case "importkey":
                    case "exportkey":
                    case "generatekey":
                        result = {
                            algorithm: {
                                name: "HMAC",
                                length: 10,
                                hash: {
                                    name: "SHA-256"
                                }
                            },
                            usages: ["sign", "verify"]
                        };
                        break;
                    default:
                        return {
                            algorithm: {
                                name: "HMAC"
                            },
                            usages: []
                        };
                }
                break;
            case "HKDF":
                switch(operation.toLowerCase())
                {
                    case "derivekey":
                        result = {
                            algorithm: {
                                name: "HKDF",
                                hash: "SHA-256",
                                salt: new Uint8Array(),
                                info: new Uint8Array()
                            },
                            usages: ["encrypt", "decrypt"]
                        };
                        break;
                    default:
                        return {
                            algorithm: {
                                name: "HKDF"
                            },
                            usages: []
                        };
                }
                break;
            case "PBKDF2":
                switch(operation.toLowerCase())
                {
                    case "derivekey":
                        result = {
                            algorithm: {
                                name: "PBKDF2",
                                hash: { name: "SHA-256" },
                                salt: new Uint8Array(),
                                iterations: 1000
                            },
                            usages: ["encrypt", "decrypt"]
                        };
                        break;
                    default:
                        return {
                            algorithm: {
                                name: "PBKDF2"
                            },
                            usages: []
                        };
                }
                break;
            default:
                ;
        }

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.getHashAlgorithmByOID =
    function(oid)
    {
        /// <param name="oid" type="String">OID of hash algorithm</param>

        var result = "";

        switch(oid)
        {
            case "1.3.14.3.2.26":
                result = "sha-1";
                break;
            case "2.16.840.1.101.3.4.2.1":
                result = "sha-256";
                break;
            case "2.16.840.1.101.3.4.2.2":
                result = "sha-384";
                break;
            case "2.16.840.1.101.3.4.2.3":
                result = "sha-512";
                break;
            default:
        }

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.getHashAlgorithmOID =
    function(name)
    {
        /// <summary>Get hash algorithm OID by name</summary>
        /// <param name="name" type="String">Common name of hash algorithm</param>

        var result = "";

        switch(name.toUpperCase())
        {
            case "SHA-1":
                result = "1.3.14.3.2.26";
                break;
            case "SHA-256":
                result = "2.16.840.1.101.3.4.2.1";
                break;
            case "SHA-384":
                result = "2.16.840.1.101.3.4.2.2";
                break;
            case "SHA-512":
                result = "2.16.840.1.101.3.4.2.3";
                break;
            default:;
        }

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.getHashAlgorithm =
    function(signatureAlgorithm)
    {
        /// <summary>Getting hash algorithm by signature algorithm</summary>
        /// <param name="signatureAlgorithm" type="in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER">Signature algorithm</param>

        var result = "";

        switch(signatureAlgorithm.algorithm_id)
        {
            case "1.2.840.10045.4.1": // ecdsa-with-SHA1
            case "1.2.840.113549.1.1.5":
                result = "SHA-1";
                break;
            case "1.2.840.10045.4.3.2": // ecdsa-with-SHA256
            case "1.2.840.113549.1.1.11":
                result = "SHA-256";
                break;
            case "1.2.840.10045.4.3.3": // ecdsa-with-SHA384
            case "1.2.840.113549.1.1.12":
                result = "SHA-384";
                break;
            case "1.2.840.10045.4.3.4": // ecdsa-with-SHA512
            case "1.2.840.113549.1.1.13":
                result = "SHA-512";
                break;
            case "1.2.840.113549.1.1.10": // RSA-PSS
                {
                    var params;

                    try
                    {
                        params = new in_window.org.pkijs.simpl.x509.RSASSA_PSS_params({ schema: signatureAlgorithm.algorithm_params });
                        if("hashAlgorithm" in params)
                            result = in_window.org.pkijs.getHashAlgorithmByOID(params.hashAlgorithm.algorithm_id);
                        else
                            result = "SHA-1";
                    }
                    catch(ex)
                    {
                    }
                }
                break;
            default:;
        }

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.getSignatureAlgorithm =
    function(algorithm)
    {
        /// <summary>Get signature algorithm OID by algorithm name</summary>
        /// <param name="algorithm" type="WebCryptoAlgorithm">WebCrypto algorithm object</param>

        var result = "";

        switch(algorithm.name.toUpperCase())
        {
            case "RSASSA-PKCS1-V1_5":
                switch(algorithm.hash.name.toUpperCase())
                {
                    case "SHA-1":
                        result = "1.2.840.113549.1.1.5";
                        break;
                    case "SHA-256":
                        result = "1.2.840.113549.1.1.11";
                        break;
                    case "SHA-384":
                        result = "1.2.840.113549.1.1.12";
                        break;
                    case "SHA-512":
                        result = "1.2.840.113549.1.1.13";
                        break;
                    default:;
                }
                break;
            case "RSA-PSS":
                result = "1.2.840.113549.1.1.10";
                break;
            case "ECDSA":
                switch(algorithm.hash.name.toUpperCase())
                {
                    case "SHA-1":
                        result = "1.2.840.10045.4.1";
                        break;
                    case "SHA-256":
                        result = "1.2.840.10045.4.3.2";
                        break;
                    case "SHA-384":
                        result = "1.2.840.10045.4.3.3";
                        break;
                    case "SHA-512":
                        result = "1.2.840.10045.4.3.4";
                        break;
                    default:;
                }
                break;
            default:;
        }

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.getAlgorithmNameBySignature =
    function(oid)
    {
        /// <summary>Get WebCrypto algorithm name by signature algorithm OID</summary>
        /// <param name="oid" type="String">OID string of signature algorithm</param>

        var result = "";

        switch(oid)
        {
            case "1.2.840.113549.1.1.5":
            case "1.2.840.113549.1.1.11":
            case "1.2.840.113549.1.1.12":
            case "1.2.840.113549.1.1.13":
                result = "RSASSA-PKCS1-v1_5";
                break;
            case "1.2.840.113549.1.1.10":
                result = "RSA-PSS";
                break;
            case "1.2.840.10045.4.1":
            case "1.2.840.10045.4.3.2":
            case "1.2.840.10045.4.3.3":
            case "1.2.840.10045.4.3.4":
                result = "ECDSA";
                break;
            default:;
        }

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.createCMSECDSASignature =
    function(signatureBuffer)
    {
        /// <summary>Create CMS ECDSA signature from WebCrypto ECDSA signature</summary>
        /// <param name="signatureBuffer" type="ArrayBuffer">WebCrypto result of "sign" function</param>

        // #region Initial check for correct length 
        if((signatureBuffer.byteLength % 2) != 0)
            return new ArrayBuffer(0);
        // #endregion 

        // #region Initial variables 
        var i = 0;
        var length = signatureBuffer.byteLength / 2; // There are two equal parts inside incoming ArrayBuffer

        var signatureView = new Uint8Array(signatureBuffer);

        var r_buffer = new ArrayBuffer(length);
        var r_view = new Uint8Array(r_buffer);
        var r_corrected_buffer;
        var r_corrected_view;

        var s_buffer = new ArrayBuffer(length);
        var s_view = new Uint8Array(s_buffer);
        var s_corrected_buffer;
        var s_corrected_view;
        // #endregion   

        // #region Get "r" part of ECDSA signature 
        for(; i < length; i++)
            r_view[i] = signatureView[i];

        if(r_view[0] & 0x80)
        {
            r_corrected_buffer = new ArrayBuffer(length + 1);
            r_corrected_view = new Uint8Array(r_corrected_buffer);

            r_corrected_view[0] = 0x00;

            for(var j = 0; j < length; j++)
                r_corrected_view[j + 1] = r_view[j];
        }
        else
        {
            r_corrected_buffer = r_buffer;
            r_corrected_view = r_view;
        }
        // #endregion 

        // #region Get "s" part of ECDSA signature 
        for(; i < signatureBuffer.byteLength; i++)
            s_view[i - length] = signatureView[i];


        if(s_view[0] & 0x80)
        {
            s_corrected_buffer = new ArrayBuffer(length + 1);
            s_corrected_view = new Uint8Array(s_corrected_buffer);

            s_corrected_view[0] = 0x00;

            for(var j = 0; j < length; j++)
                s_corrected_view[j + 1] = s_view[j];
        }
        else
        {
            s_corrected_buffer = s_buffer;
            s_corrected_view = s_view;
        }
        // #endregion 

        // #region Create ASN.1 structure of CMS ECDSA signature 
        var r_integer = new in_window.org.pkijs.asn1.INTEGER();
        r_integer.value_block.is_hex_only = true;
        r_integer.value_block.value_hex = in_window.org.pkijs.copyBuffer(r_corrected_buffer);

        var s_integer = new in_window.org.pkijs.asn1.INTEGER();
        s_integer.value_block.is_hex_only = true;
        s_integer.value_block.value_hex = in_window.org.pkijs.copyBuffer(s_corrected_buffer);

        var asn1 = new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                r_integer,
                s_integer
            ]
        });
        // #endregion   

        return asn1.toBER(false);
    }
    //**************************************************************************************
    in_window.org.pkijs.createECDSASignatureFromCMS =
    function(cmsSignature)
    {
        /// <summary>Create a single ArrayBuffer from CMS ECDSA signature</summary>
        /// <param name="cmsSignature" type="in_window.org.pkijs.asn1.SEQUENCE">ASN.1 SEQUENCE contains CMS ECDSA signature</param>

        // #region Initial variables 
        var length = 0;

        var r_start = 0;
        var s_start = 0;

        var r_length = cmsSignature.value_block.value[0].value_block.value_hex.byteLength;
        var s_length = cmsSignature.value_block.value[1].value_block.value_hex.byteLength;
        // #endregion 

        // #region Get length of final "ArrayBuffer" 
        var r_view = new Uint8Array(cmsSignature.value_block.value[0].value_block.value_hex);
        if((r_view[0] === 0x00) && (r_view[1] & 0x80))
        {
            length = r_length - 1;
            r_start = 1;
        }
        else
            length = r_length;

        var s_view = new Uint8Array(cmsSignature.value_block.value[1].value_block.value_hex);
        if((s_view[0] === 0x00) && (s_view[1] & 0x80))
        {
            length += s_length - 1;
            s_start = 1;
        }
        else
            length += s_length;
        // #endregion 

        // #region Copy values from CMS ECDSA signature 
        var result = new ArrayBuffer(length);
        var result_view = new Uint8Array(result);

        for(var i = r_start; i < r_length; i++)
            result_view[i - r_start] = r_view[i];

        for(var i = s_start; i < s_length; i++)
            result_view[i - s_start + r_length - r_start] = s_view[i];
        // #endregion 

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.getEncryptionAlgorithm =
    function(algorithm)
    {
        /// <summary>Get encryption algorithm OID by WebCrypto algorithm's object</summary>
        /// <param name="algorithm" type="WebCryptoAlgorithm">WebCrypto algorithm object</param>

        var result = "";

        switch(algorithm.name.toUpperCase())
        {
            case "AES-CBC":
                switch(algorithm.length)
                {
                    case 128:
                        result = "2.16.840.1.101.3.4.1.2";
                        break;
                    case 192:
                        result = "2.16.840.1.101.3.4.1.22";
                        break;
                    case 256:
                        result = "2.16.840.1.101.3.4.1.42";
                        break;
                    default:;
                }
                break;
            case "AES-GCM":
                switch(algorithm.length)
                {
                    case 128:
                        result = "2.16.840.1.101.3.4.1.6";
                        break;
                    case 192:
                        result = "2.16.840.1.101.3.4.1.26";
                        break;
                    case 256:
                        result = "2.16.840.1.101.3.4.1.46";
                        break;
                    default:;
                }
                break;
            default:;
        }

        return result;
    }
    //**************************************************************************************
    in_window.org.pkijs.getAlgorithmByEncryptionOID =
    function(oid)
    {
        /// <summary>Get encryption algorithm name by OID</summary>
        /// <param name="oid" type="String">OID of encryption algorithm</param>

        var result = "";

        switch(oid)
        {
            case "2.16.840.1.101.3.4.1.2":
            case "2.16.840.1.101.3.4.1.22":
            case "2.16.840.1.101.3.4.1.42":
                result = "AES-CBC";
                break;
            case "2.16.840.1.101.3.4.1.6":
            case "2.16.840.1.101.3.4.1.26":
            case "2.16.840.1.101.3.4.1.46":
                result = "AES-GCM";
                break;
            default:;
        }

        return result;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
}
)(typeof exports !== "undefined" ? exports : window);