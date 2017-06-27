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

    // #region "org.pkijs.simpl" namespace 
    if(typeof in_window.org.pkijs.simpl === "undefined")
        in_window.org.pkijs.simpl = {};
    else
    {
        if(typeof in_window.org.pkijs.simpl !== "object")
            throw new Error("Name org.pkijs.simpl already exists and it's not an object" + " but " + (typeof in_window.org.pkijs.simpl));
    }
    // #endregion 

    // #region "org.pkijs.simpl.cms" namespace 
    if(typeof in_window.org.pkijs.simpl.cms === "undefined")
        in_window.org.pkijs.simpl.cms = {};
    else
    {
        if(typeof in_window.org.pkijs.simpl.cms !== "object")
            throw new Error("Name org.pkijs.simpl.cms already exists and it's not an object" + " but " + (typeof in_window.org.pkijs.simpl.cms));
    }
    // #endregion 

    // #region "local" namespace 
    var local = {};
    // #endregion   
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "CMS_CONTENT_INFO" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_CONTENT_INFO =
    function()
    {
        // #region Internal properties of the object 
        this.contentType = "";
        this.content = new in_window.org.pkijs.asn1.ANY(); // Just to make a stub
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.CMS_CONTENT_INFO.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.contentType = arguments[0].contentType || "";
                this.content = arguments[0].content || new in_window.org.pkijs.asn1.ANY(); // Just to make a stub
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_CONTENT_INFO.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.CMS_CONTENT_INFO()
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for CMS_CONTENT_INFO");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.contentType = asn1.result["contentType"].value_block.toString();
        this.content = asn1.result["content"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_CONTENT_INFO.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.OID({ value: this.contentType }),
                new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 0 // [0]
                    },
                    value: [this.content] // EXPLICIT ANY value
                })
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_CONTENT_INFO.prototype.toJSON =
    function()
    {
        var _object = {
            contentType: this.contentType
        };

        if(!(this.content instanceof in_window.org.pkijs.asn1.ANY))
            _object.content = this.content.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "OtherCertificateFormat" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherCertificateFormat =
    function()
    {
        // #region Internal properties of the object 
        this.otherCertFormat = "";
        this.otherCert = new in_window.org.pkijs.asn1.ANY(); // Just to make a stub
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.OtherCertificateFormat.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.otherCertFormat = arguments[0].contentType || "";
                this.otherCert = arguments[0].content || new in_window.org.pkijs.asn1.ANY(); // Just to make a stub
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherCertificateFormat.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.OtherCertificateFormat()
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for OtherCertificateFormat");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.otherCertFormat = asn1.result["otherCertFormat"].value_block.toString();
        this.otherCert = asn1.result["otherCert"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherCertificateFormat.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.OID({ value: this.otherCertFormat }),
                this.otherCert
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherCertificateFormat.prototype.toJSON =
    function()
    {
        var _object = {
            otherCertFormat: this.otherCertFormat
        };

        if(!(this.otherCert instanceof in_window.org.pkijs.asn1.ANY))
            _object.otherCert = this.otherCert.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "OtherRevocationInfoFormat" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherRevocationInfoFormat =
    function()
    {
        // #region Internal properties of the object 
        this.otherRevInfoFormat = "";
        this.otherRevInfo = new in_window.org.pkijs.asn1.ANY(); // Just to make a stub
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.OtherRevocationInfoFormat.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.otherRevInfoFormat = arguments[0].contentType || "";
                this.otherRevInfo = arguments[0].content || new in_window.org.pkijs.asn1.ANY(); // Just to make a stub
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherRevocationInfoFormat.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.OtherRevocationInfoFormat()
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for OtherRevocationInfoFormat");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.otherRevInfoFormat = asn1.result["otherRevInfoFormat"].value_block.toString();
        this.otherRevInfo = asn1.result["otherRevInfo"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherRevocationInfoFormat.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.OID({ value: this.otherRevInfoFormat }),
                this.otherRevInfo
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherRevocationInfoFormat.prototype.toJSON =
    function()
    {
        var _object = {
            otherRevInfoFormat: this.otherRevInfoFormat
        };

        if(!(this.otherRevInfo instanceof in_window.org.pkijs.asn1.ANY))
            _object.otherRevInfo = this.otherRevInfo.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "CMS_CERTIFICATE_SET" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_CERTIFICATE_SET =
    function()
    {
        // #region Internal properties of the object 
        this.certificates = new Array(); // Array of "CertificateChoices"
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.CMS_CERTIFICATE_SET.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.certificates = arguments[0].certificates || new Array(); // Array of "CertificateChoices"
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_CERTIFICATE_SET.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.CMS_CERTIFICATE_SET()
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for CMS_CERTIFICATE_SET");
        // #endregion 

        // #region Get internal properties from parsed schema 
        var certificates_array = asn1.result["certificates"];

        for(var i = 0; i < certificates_array; i++)
        {
            if(certificates_array.id_block.tag_class === 1)
                this.certificates.push(new in_window.org.pkijs.simpl.CERT({ schema: certificates_array[i] }));
            else
                this.certificates.push(certificates_array[i]);
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_CERTIFICATE_SET.prototype.toSchema =
    function()
    {
        // #region Create array for output set
        var output_array = new Array();

        for(var i = 0; i < this.certificates.length; i++)
        {
            if(this.certificates[i] instanceof in_window.org.pkijs.simpl.CERT)
                output_array.push(this.certificates[i].toSchema());
            else
                output_array.push(this.certificates[i]);
        }
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SET({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_CERTIFICATE_SET.prototype.toJSON =
    function()
    {
        var _object = {};

        _object.certificates = new Array();
        for(var i = 0; i < this.certificates.length; i++)
            _object.certificates.push(this.certificates[i].toJSON());

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "CSM_REVOCATION_INFO_CHOICES" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.CSM_REVOCATION_INFO_CHOICES =
    function()
    {
        // #region Internal properties of the object 
        this.crls = new Array(); // Array of "RevocationInfoChoices"
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.CSM_REVOCATION_INFO_CHOICES.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.crls = arguments[0].crls || new Array(); // Array of "RevocationInfoChoices"
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CSM_REVOCATION_INFO_CHOICES.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.CSM_REVOCATION_INFO_CHOICES()
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for CSM_REVOCATION_INFO_CHOICES");
        // #endregion 

        // #region Get internal properties from parsed schema 
        var crls_array = asn1.result["crls"];

        for(var i = 0; i < crls_array; i++)
        {
            if(crls_array.id_block.tag_class === 1)
                this.crls.push(new in_window.org.pkijs.simpl.CRL({ schema: crls_array[i] }));
            else
                this.crls.push(crls_array[i]);
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CSM_REVOCATION_INFO_CHOICES.prototype.toSchema =
    function()
    {
        // #region Create array for output set
        var output_array = new Array();

        for(var i = 0; i < this.crls.length; i++)
        {
            if(this.crls[i] instanceof in_window.org.pkijs.simpl.CRL)
                output_array.push(this.crls[i].toSchema());
            else
                output_array.push(this.crls[i]);
        }
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SET({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CSM_REVOCATION_INFO_CHOICES.prototype.toJSON =
    function()
    {
        var _object = {};

        _object.crls = new Array();
        for(var i = 0; i < this.crls.length; i++)
            _object.crls.push(this.crls[i].toJSON());

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "IssuerAndSerialNumber" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber =
    function()
    {
        // #region Internal properties of the object 
        this.issuer = new in_window.org.pkijs.simpl.RDN();
        this.serialNumber = new in_window.org.pkijs.asn1.INTEGER(); // Might be a very long integer value
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.issuer = arguments[0].issuer || new in_window.org.pkijs.simpl.RDN();
                this.serialNumber = arguments[0].serialNumber || new in_window.org.pkijs.asn1.INTEGER(); // Might be a very long integer value
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.IssuerAndSerialNumber({
                names: {
                    issuer: {
                        names: {
                            block_name: "issuer"
                        }
                    },
                    serialNumber: "serialNumber"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for IssuerAndSerialNumber");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.issuer = new in_window.org.pkijs.simpl.RDN({ schema: asn1.result["issuer"] });
        this.serialNumber = asn1.result["serialNumber"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                this.issuer.toSchema(),
                this.serialNumber
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber.prototype.toJSON =
    function()
    {
        return {
            issuer: this.issuer.toJSON(),
            serialNumber: this.serialNumber.toJSON()
        };
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "Attribute" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.Attribute =
    function()
    {
        // #region Internal properties of the object 
        this.attrType = "";
        this.attrValues = new Array(); // Array of any attribute values
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.Attribute.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.attrType = arguments[0].attrType || "";
                this.attrValues = arguments[0].attrValues || new Array(); // Array of any attribute values
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.Attribute.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.Attribute({
                names: {
                    attrType: "attrType",
                    attrValues: "attrValues"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for Attribute");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.attrType = asn1.result["attrType"].value_block.toString();
        this.attrValues = asn1.result["attrValues"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.Attribute.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.OID({ value: this.attrType }),
                new in_window.org.pkijs.asn1.SET({
                    value: this.attrValues
                })
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.Attribute.prototype.toJSON =
    function()
    {
        var _object = {
            attrType: this.attrType
        };

        _object.attrValues = new Array();
        for(var i = 0; i < this.attrValues.length; i++)
            _object.attrValues.push(this.attrValues[i].toJSON());

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "RSAES_OAEP_params" type (RFC3447)
    //**************************************************************************************
    in_window.org.pkijs.simpl.x509.RSAES_OAEP_params =
    function()
    {
        // #region Internal properties of the object 
        // OPTIONAL this.hashAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        // OPTIONAL this.maskGenAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        // OPTIONAL this.pSourceAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.x509.RSAES_OAEP_params.prototype.fromSchema.call(this, arguments[0].schema);
            // #endregion 
            // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                if("hashAlgorithm" in arguments[0])
                    this.hashAlgorithm = arguments[0].hashAlgorithm;

                if("maskGenAlgorithm" in arguments[0])
                    this.maskGenAlgorithm = arguments[0].maskGenAlgorithm;

                if("pSourceAlgorithm" in arguments[0])
                    this.pSourceAlgorithm = arguments[0].pSourceAlgorithm;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.x509.RSAES_OAEP_params.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.x509.RSAES_OAEP_params({
                names: {
                    hashAlgorithm: {
                        names: {
                            block_name: "hashAlgorithm"
                        }
                    },
                    maskGenAlgorithm: {
                        names: {
                            block_name: "maskGenAlgorithm"
                        }
                    },
                    pSourceAlgorithm: {
                        names: {
                            block_name: "pSourceAlgorithm"
                        }
                    }
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for RSAES_OAEP_params");
        // #endregion 

        // #region Get internal properties from parsed schema 
        if("hashAlgorithm" in asn1.result)
            this.hashAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["hashAlgorithm"] });

        if("maskGenAlgorithm" in asn1.result)
            this.maskGenAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["maskGenAlgorithm"] });

        if("pSourceAlgorithm" in asn1.result)
            this.pSourceAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["pSourceAlgorithm"] });
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.x509.RSAES_OAEP_params.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        if("hashAlgorithm" in this)
            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 0 // [0]
                },
                value: [this.hashAlgorithm.toSchema()]
            }));

        if("maskGenAlgorithm" in this)
            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 1 // [1]
                },
                value: [this.maskGenAlgorithm.toSchema()]
            }));

        if("pSourceAlgorithm" in this)
            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 2 // [2]
                },
                value: [this.pSourceAlgorithm.toSchema()]
            }));
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.x509.RSAES_OAEP_params.prototype.toJSON =
    function()
    {
        var _object = {};

        if("hashAlgorithm" in this)
            _object.hashAlgorithm = this.hashAlgorithm.toJSON();

        if("maskGenAlgorithm" in this)
            _object.maskGenAlgorithm = this.maskGenAlgorithm.toJSON();

        if("pSourceAlgorithm" in this)
            _object.pSourceAlgorithm = this.pSourceAlgorithm.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "SignedUnsignedAttributes" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes =
    function()
    {
        // #region Internal properties of the object 
        this.type = 0; // "SignedAttributes" = 0, "UnsignedAttributes" = 1
        this.attributes = new Array(); // Array of Attribute objects
        this.encoded_value = new ArrayBuffer(0); // Need to have it in order to successfully process with signature verification
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.type = arguments[0].type || 0; // "SignedAttributes" = 0, "UnsignedAttributes" = 1
                this.attributes = arguments[0].attributes || new Array(); // Array of Attribute objects
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.SignedUnsignedAttributes({
                names: {
                    attributes: "attributes"
                }
            }, this.type)
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for SignedUnsignedAttributes");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.type = asn1.result.id_block.tag_number;
        this.encoded_value = asn1.result.value_before_decode;

        // #region Change type from "[0]" to "SET" accordingly to standard 
        var encoded_view = new Uint8Array(this.encoded_value);
        encoded_view[0] = 0x31;
        // #endregion 

        if(("attributes" in asn1.result) === false)
        {
            if(this.type === 0)
                throw new Error("Wrong structure of SignedUnsignedAttributes");
            else
                return; // Not so important in case of "UnsignedAttributes"
        }

        var attributes_array = asn1.result["attributes"];

        for(var i = 0; i < attributes_array.length; i++)
            this.attributes.push(new in_window.org.pkijs.simpl.cms.Attribute({ schema: attributes_array[i] }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes.prototype.toSchema =
    function()
    {
        // #region Create array of attributes 
        var attributes_array = new Array();

        for(var i = 0; i < this.attributes.length; i++)
            attributes_array.push(this.attributes[i].toSchema());
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
            optional: true,
            id_block: {
                tag_class: 3, // CONTEXT-SPECIFIC
                tag_number: this.type // "SignedAttributes" = 0, "UnsignedAttributes" = 1
            },
            value: attributes_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes.prototype.toJSON =
    function()
    {
        var _object = {
            type: this.type
        };

        _object.attributes = new Array();
        for(var i = 0; i < this.attributes.length; i++)
            _object.attributes.push(this.attributes[i].toJSON());

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "CMS_SIGNER_INFO" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNER_INFO =
    function()
    {
        // #region Internal properties of the object 
        this.version = 0;
        this.sid = new in_window.org.pkijs.asn1.ANY(); // Just for making stub
        this.digestAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        // OPTIONAL this.signedAttrs = new in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes();
        this.signatureAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        this.signature = new in_window.org.pkijs.asn1.OCTETSTRING();
        // OPTIONAL this.unsignedAttrs = new in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.CMS_SIGNER_INFO.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.version = arguments[0].version || 0;
                this.sid = arguments[0].sid || new in_window.org.pkijs.asn1.ANY(); // Just for making stub
                this.digestAlgorithm = arguments[0].digestAlgorithm || new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
                if("signedAttrs" in arguments[0])
                    this.signedAttrs = arguments[0].signedAttrs;
                this.signatureAlgorithm = arguments[0].signatureAlgorithm || new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
                this.signature = arguments[0].signature || new in_window.org.pkijs.asn1.OCTETSTRING();
                if("unsignedAttrs" in arguments[0])
                    this.unsignedAttrs = arguments[0].unsignedAttrs;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNER_INFO.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.CMS_SIGNER_INFO()
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for CMS_SIGNER_INFO");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.version = asn1.result["SignerInfo.version"].value_block.value_dec;

        var current_sid = asn1.result["SignerInfo.sid"];
        if(current_sid.id_block.tag_class === 1)
            this.sid = new in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber({ schema: current_sid });
        else
            this.sid = current_sid;

        this.digestAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["SignerInfo.digestAlgorithm"] });
        if("SignerInfo.signedAttrs" in asn1.result)
            this.signedAttrs = new in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes({ schema: asn1.result["SignerInfo.signedAttrs"] });
        this.signatureAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["SignerInfo.signatureAlgorithm"] });
        this.signature = asn1.result["SignerInfo.signature"];
        if("SignerInfo.unsignedAttrs" in asn1.result)
        {
            this.unsignedAttrs = new in_window.org.pkijs.simpl.cms.SignedUnsignedAttributes();
            this.unsignedAttrs.type = 1; // Unsigned attributes
            this.unsignedAttrs.fromSchema(asn1.result["SignerInfo.unsignedAttrs"]);
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNER_INFO.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(new in_window.org.pkijs.asn1.INTEGER({ value: this.version }));

        if(this.sid instanceof in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber)
            output_array.push(this.sid.toSchema());
        else
            output_array.push(this.sid);

        output_array.push(this.digestAlgorithm.toSchema());
        if("signedAttrs" in this)
            output_array.push(this.signedAttrs.toSchema());
        output_array.push(this.signatureAlgorithm.toSchema());
        output_array.push(this.signature);
        if("unsignedAttrs" in this)
            output_array.push(this.unsignedAttrs.toSchema());
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNER_INFO.prototype.toJSON =
    function()
    {
        var _object = {
            version: this.version
        };

        if(!(this.sid instanceof in_window.org.pkijs.asn1.ANY))
            _object.sid = this.sid.toJSON();

        _object.digestAlgorithm = this.digestAlgorithm.toJSON();

        if("signedAttrs" in this)
            _object.signedAttrs = this.signedAttrs.toJSON();

        _object.signatureAlgorithm = this.signatureAlgorithm.toJSON();
        _object.signature = this.signature.toJSON();

        if("unsignedAttrs" in this)
            _object.unsignedAttrs = this.unsignedAttrs.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "EncapsulatedContentInfo" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.EncapsulatedContentInfo =
    function()
    {
        // #region Internal properties of the object 
        this.eContentType = "";
        // OPTIONAL this.eContent = new in_window.org.pkijs.asn1.OCTETSTRING();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.EncapsulatedContentInfo.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.eContentType = arguments[0].eContentType || "";
                if("eContent" in arguments[0])
                {
                    this.eContent = arguments[0].eContent;

                    if((this.eContent.id_block.tag_class === 1) &&
                       (this.eContent.id_block.tag_number === 4))
                    {
                        // #region Divide OCTETSTRING value down to small pieces 
                        if(this.eContent.id_block.is_constructed === false)
                        {
                            var constr_string = new in_window.org.pkijs.asn1.OCTETSTRING({
                                id_block: { is_constructed: true },
                                is_constructed: true
                            });

                            var offset = 0;
                            var length = this.eContent.value_block.value_hex.byteLength;

                            while(length > 0)
                            {
                                var piece_view = new Uint8Array(this.eContent.value_block.value_hex, offset, ((offset + 65536) > this.eContent.value_block.value_hex.byteLength) ? (this.eContent.value_block.value_hex.byteLength - offset) : 65536);
                                var _array = new ArrayBuffer(piece_view.length);
                                var _view = new Uint8Array(_array);

                                for(var i = 0; i < _view.length; i++)
                                    _view[i] = piece_view[i];

                                constr_string.value_block.value.push(new in_window.org.pkijs.asn1.OCTETSTRING({ value_hex: _array }));

                                length -= piece_view.length;
                                offset += piece_view.length;
                            }

                            this.eContent = constr_string;
                        }
                        // #endregion   
                    }
                }
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.EncapsulatedContentInfo.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.EncapsulatedContentInfo({
                names: {
                    eContentType: "eContentType",
                    eContent: "eContent"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for EncapsulatedContentInfo");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.eContentType = asn1.result["eContentType"].value_block.toString();
        if("eContent" in asn1.result)
            this.eContent = asn1.result["eContent"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.EncapsulatedContentInfo.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(new in_window.org.pkijs.asn1.OID({ value: this.eContentType }));
        if("eContent" in this)
            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                optional: true,
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 0 // [0]
                },
                value: [this.eContent]
            }));
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.EncapsulatedContentInfo.prototype.toJSON =
    function()
    {
        var _object = {
            eContentType: this.eContentType
        };

        if("eContent" in this)
            _object.eContent = this.eContent.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "CMS_SIGNED_DATA" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNED_DATA =
    function()
    {
        // #region Internal properties of the object 
        this.version = 0;
        this.digestAlgorithms = new Array(); // Array of AlgorithmIdentifier
        this.encapContentInfo = new in_window.org.pkijs.simpl.cms.EncapsulatedContentInfo();
        //this.certificates - OPTIONAL
        //this.crls - OPTIONAL
        this.signerInfos = new Array(); // Array of CMS_SIGNER_INFO
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.CMS_SIGNED_DATA.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.version = arguments[0].version || 0;
                this.digestAlgorithms = arguments[0].digestAlgorithms || new Array(); // Array of AlgorithmIdentifier
                this.encapContentInfo = arguments[0].encapContentInfo || new in_window.org.pkijs.simpl.cms.EncapsulatedContentInfo();
                if("certificates" in arguments[0])
                    this.certificates = arguments[0].certificates;
                if("crls" in arguments[0])
                    this.crls = arguments[0].crls;
                this.signerInfos = arguments[0].signerInfos || new Array(); // Array of CMS_SIGNER_INFO
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNED_DATA.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.CMS_SIGNED_DATA()
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for CMS_SIGNED_DATA");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.version = asn1.result["SignedData.version"].value_block.value_dec;

        var algorithms_array = asn1.result["SignedData.digestAlgorithms"];
        for(var i = 0; i < algorithms_array.length; i++)
            this.digestAlgorithms.push(new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: algorithms_array[i] }));

        this.encapContentInfo = new in_window.org.pkijs.simpl.cms.EncapsulatedContentInfo({ schema: asn1.result["SignedData.encapContentInfo"] });

        if("SignedData.certificates" in asn1.result)
        {
            this.certificates = new Array();

            var current_certificates = asn1.result["SignedData.certificates"];
            for(var k = 0; k < current_certificates.length; k++)
            {
                if(current_certificates[k].id_block.tag_class === 1)
                    this.certificates.push(new in_window.org.pkijs.simpl.CERT({ schema: current_certificates[k] }));
                else
                    this.certificates.push(new in_window.org.pkijs.simpl.cms.OtherCertificateFormat({ schema: current_certificates[k] }));
            }
        }

        if("SignedData.crls" in asn1.result)
        {
            this.crls = new Array();

            var current_crls = asn1.result["SignedData.crls"];
            for(var l = 0; l < current_crls.length; l++)
            {
                if(current_crls[l].id_block.tag_class === 1)
                    this.crls.push(new in_window.org.pkijs.simpl.CRL({ schema: current_crls[l] }));
                else
                    this.crls.push(new in_window.org.pkijs.simpl.cms.OtherRevocationInfoFormat({ schema: current_crls[l] }));
            }
        }

        var signer_infos = asn1.result["SignedData.signerInfos"];
        for(var j = 0; j < signer_infos.length; j++)
            this.signerInfos.push(new in_window.org.pkijs.simpl.CMS_SIGNER_INFO({ schema: signer_infos[j] }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNED_DATA.prototype.toSchema =
    function(encodeFlag)
    {
        /// <param name="encodeFlag" type="Boolean">If param equal to false then create TBS schema via decoding stored value. In othe case create TBS schema via assembling from TBS parts.</param>

        if(typeof encodeFlag === "undefined")
            encodeFlag = false;

        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(new in_window.org.pkijs.asn1.INTEGER({ value: this.version }));

        // #region Create array of digest algorithms 
        var digest_algorithms = new Array();
        for(var i = 0; i < this.digestAlgorithms.length; i++)
            digest_algorithms.push(this.digestAlgorithms[i].toSchema(encodeFlag));

        output_array.push(new in_window.org.pkijs.asn1.SET({
            value: digest_algorithms
        }));
        // #endregion 

        output_array.push(this.encapContentInfo.toSchema());

        if("certificates" in this)
        {
            var current_certificates = new Array();

            for(var j = 0; j < this.certificates.length; j++)
                current_certificates.push(this.certificates[j].toSchema(encodeFlag));

            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                optional: true,
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 0 // [0]
                },
                value: current_certificates
            }));
        }

        if("crls" in this)
        {
            var current_crls = new Array();

            for(var k = 0; k < this.crls.length; k++)
                current_crls.push(this.crls[k].toSchema(encodeFlag));

            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                optional: true,
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 1 // [1]
                },
                value: current_crls
            }));
        }

        // #region Create array of signer infos 
        var signer_infos = new Array();

        for(var l = 0; l < this.signerInfos.length; l++)
            signer_infos.push(this.signerInfos[l].toSchema(encodeFlag));

        output_array.push(new in_window.org.pkijs.asn1.SET({
            value: signer_infos
        }));
        // #endregion 
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNED_DATA.prototype.verify =
    function()
    {
        // #region Global variables 
        var sequence = Promise.resolve();

        var certificates = this.certificates;
        var signerInfos = this.signerInfos;
        var encapContentInfo = this.encapContentInfo;

        var data = new ArrayBuffer(0);

        var sha_algorithm = "";

        var signerIndex = -1;
        var cert_index = -1;
        var signer_cert = {};

        var trusted_certs = new Array();

        var _this = this;
        // #endregion 

        // #region Get a "crypto" extension 
        var crypto = in_window.org.pkijs.getCrypto();
        if(typeof crypto == "undefined")
            return new Promise(function(resolve, reject) { reject("Unable to create WebCrypto object"); });
        // #endregion 

        // #region Get a signer number
        if(arguments[0] instanceof Object)
        {
            if("signer" in arguments[0])
                signerIndex = arguments[0].signer;

            if("data" in arguments[0]) // Detached data
                data = arguments[0].data;

            if("trusted_certs" in arguments[0])
                trusted_certs = arguments[0].trusted_certs;
        }

        if(signerIndex === (-1))
            return new Promise(function(resolve, reject) { reject("Unable to get signer index from input parameters"); });
        // #endregion 

        // #region Check that certificates field was included in signed data 
        if(("certificates" in this) === false)
            return new Promise(function(resolve, reject) { reject("No certificates attached to this signed data"); });
        // #endregion 

        // #region Find a certificate for specified signer 
        if(this.signerInfos[signerIndex].sid instanceof in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber)
        {
            sequence = sequence.then(
                function()
                {
                    for(var i = 0; certificates.length; i++)
                    {
                        if((certificates[i].issuer.isEqual(signerInfos[signerIndex].sid.issuer)) &&
                           (certificates[i].serialNumber.isEqual(signerInfos[signerIndex].sid.serialNumber)))
                        {
                            signer_cert = certificates[i];
                            return new Promise(function(resolve, reject) { resolve(); });
                        }
                    }

                    return new Promise(function(resolve, reject) { reject("Unable to find signer certificate"); });
                }
                );
        }
        else // Find by SubjectKeyIdentifier
        {
            sequence = sequence.then(
                function()
                {
                    var digest_promises = new Array();

                    for(var i = 0; i < certificates.length; i++)
                        digest_promises.push(crypto.digest({ name: "sha-1" }, new Uint8Array(certificates[i].subjectPublicKeyInfo.subjectPublicKey.value_block.value_hex)));

                    return Promise.all(digest_promises).then(
                        function(results)
                        {
                            for(var i = 0; i < certificates.length; i++)
                            {
                                if(in_window.org.pkijs.isEqual_buffer(results[i], signerInfos[signerIndex].sid.value_block.value_hex))
                                {
                                    signer_cert = certificates[i];
                                    return new Promise(function(resolve, reject) { resolve(); });
                                }
                            }

                            return new Promise(function(resolve, reject) { reject("Unable to find signer certificate"); });
                        },
                        function(error)
                        {
                            return new Promise(function(resolve, reject) { reject("Unable to find signer certificate"); });
                        }
                        );
                }
                );
        }
        // #endregion 

        // #region Make additional verification for signer's certificate 
        function checkCA(cert)
        {
            /// <param name="cert" type="in_window.org.pkijs.simpl.CERT">Certificate to find CA flag for</param>

            // #region Do not include signer's certificate 
            if((cert.issuer.isEqual(signer_cert.issuer) === true) && (cert.serialNumber.isEqual(signer_cert.serialNumber) === true))
                return null;
            // #endregion 

            var isCA = false;

            for(var i = 0; i < cert.extensions.length; i++)
            {
                if(cert.extensions[i].extnID === "2.5.29.19") // BasicConstraints
                {
                    if("cA" in cert.extensions[i].parsedValue)
                    {
                        if(cert.extensions[i].parsedValue.cA === true)
                            isCA = true;
                    }
                }
            }

            if(isCA)
                return cert;
            else
                return null;
        }

        var checkCA_promises = new Array();

        for(var i = 0; i < this.certificates.length; i++)
            checkCA_promises.push(checkCA(this.certificates[i]));

        sequence = sequence.then(
            function(result)
            {
                return Promise.all(checkCA_promises).then(
                    function(promiseResults)
                    {
                        var additional_certs = new Array();
                        additional_certs.push(signer_cert);

                        for(var i = 0; i < promiseResults.length; i++)
                        {
                            if(promiseResults[i] !== null)
                                additional_certs.push(promiseResults[i]);
                        }

                        var cert_chain_simpl = new org.pkijs.simpl.CERT_CHAIN({
                            certs: additional_certs,
                            trusted_certs: trusted_certs
                        });
                        if("crls" in _this)
                            cert_chain_simpl.crls = _this.crls;

                        return cert_chain_simpl.verify().then(
                            function(result)
                            {
                                if(result.result === true)
                                    return new Promise(function(resolve, reject) { resolve(); });
                                else
                                    return new Promise(function(resolve, reject) { reject("Validation of signer's certificate failed"); });
                            },
                            function(error)
                            {
                                return new Promise(function(resolve, reject) { reject("Validation of signer's certificate failed with error: " + ((error instanceof Object) ? error.result_message : error)); });
                            }
                            );
                    },
                    function(promiseError)
                    {
                        return new Promise(function(resolve, reject) { reject("Error during checking certificates for CA flag: " + promiseError); });
                    }
                    );
            }
            );
        // #endregion 

        // #region Find signer's hashing algorithm 
        sequence = sequence.then(
            function()
            {
                sha_algorithm = in_window.org.pkijs.getHashAlgorithmByOID(signerInfos[signerIndex].digestAlgorithm.algorithm_id);
                if(sha_algorithm === "")
                    return new Promise(function(resolve, reject) { reject("Unsupported signature algorithm: " + _this.signerInfos[signerIndex].digestAlgorithm.algorithm_id); });

                return new Promise(function(resolve, reject) { resolve(); });
            }
            );
        // #endregion 

        // #region Create correct data block for verification 
        sequence = sequence.then(
            function()
            {
                if("signedAttrs" in signerInfos[signerIndex])
                    data = signerInfos[signerIndex].signedAttrs.encoded_value;
                else
                {
                    if("eContent" in encapContentInfo) // Attached data
                    {
                        if((encapContentInfo.eContent.id_block.tag_class === 1) &&
                           (encapContentInfo.eContent.id_block.tag_number === 4))
                        {
                            if(encapContentInfo.eContent.id_block.is_constructed === false)
                                data = encapContentInfo.eContent.value_block.value_hex;
                            else
                            {
                                for(var i = 0; i < encapContentInfo.eContent.value_block.value.length; i++)
                                    data = in_window.org.pkijs.concat_buffers(data, encapContentInfo.eContent.value_block.value[i].value_block.value_hex);
                            }
                        }
                        else
                            data = encapContentInfo.eContent.value_block.value_hex;
                    }
                    else // Detached data
                    {
                        if(data.byteLength === 0) // Check that "data" already provided by function parameter
                            return new Promise(function(resolve, reject) { reject("Missed detached data input array"); });
                    }
                }
            }
            );
        // #endregion 

        // #region Import public key from signer's certificate 
        sequence = sequence.then(
            function()
            {
                // #region Get information about public key algorithm and default parameters for import
                var algorithm_name = in_window.org.pkijs.getAlgorithmNameBySignature(signer_cert.signatureAlgorithm.algorithm_id);
                if(algorithm_name === "")
                    return new Promise(function(resolve, reject) { reject("Unsupported public key algorithm: " + signer_cert.signatureAlgorithm.algorithm_id); });

                var algorithm = in_window.org.pkijs.getAlgorithmParameters(algorithm_name, "importkey");
                if("hash" in algorithm.algorithm)
                    algorithm.algorithm.hash.name = sha_algorithm;
                // #endregion 

                var publicKeyInfo_schema = signer_cert.subjectPublicKeyInfo.toSchema();
                var publicKeyInfo_buffer = publicKeyInfo_schema.toBER(false);
                var publicKeyInfo_view = new Uint8Array(publicKeyInfo_buffer);

                return crypto.importKey("spki", publicKeyInfo_view, algorithm.algorithm, true, algorithm.usages);
            }
            );
        // #endregion 

        // #region Verify signer's signature 
        sequence = sequence.then(
            function(publicKey)
            {
                // #region Get default algorithm parameters for verification 
                var algorithm = in_window.org.pkijs.getAlgorithmParameters(publicKey.algorithm.name, "verify");
                if("hash" in algorithm.algorithm)
                    algorithm.algorithm.hash.name = sha_algorithm;
                // #endregion 

                // #region Special case for ECDSA signatures 
                var signature_value = signerInfos[signerIndex].signature.value_block.value_hex;

                if(publicKey.algorithm.name === "ECDSA")
                {
                    var asn1 = in_window.org.pkijs.fromBER(signature_value);
                    signature_value = in_window.org.pkijs.createECDSASignatureFromCMS(asn1.result);
                }
                // #endregion 

                // #region Special case for RSA-PSS 
                if(publicKey.algorithm.name === "RSA-PSS")
                {
                    var pssParameters;

                    try
                    {
                        pssParameters = new in_window.org.pkijs.simpl.x509.RSASSA_PSS_params({ schema: signerInfos[signerIndex].signatureAlgorithm.algorithm_params });
                    }
                    catch(ex)
                    {
                        return new Promise(function(resolve, reject) { reject(ex); });
                    }

                    if("saltLength" in pssParameters)
                        algorithm.algorithm.saltLength = pssParameters.saltLength;
                    else
                        algorithm.algorithm.saltLength = 20;

                    var hash_algo = "SHA-1";

                    if("hashAlgorithm" in pssParameters)
                    {
                        hash_algo = in_window.org.pkijs.getHashAlgorithmByOID(pssParameters.hashAlgorithm.algorithm_id);
                        if(hash_algo === "")
                            return new Promise(function(resolve, reject) { reject("Unrecognized hash algorithm: " + pssParameters.hashAlgorithm.algorithm_id); });
                    }

                    algorithm.algorithm.hash.name = hash_algo;
                }
                // #endregion 

                return crypto.verify(algorithm.algorithm,
                    publicKey,
                    new Uint8Array(signature_value),
                    new Uint8Array(data));
            },
            function(error)
            {
                return new Promise(function(resolve, reject) { reject(error); });
            }
            );
        // #endregion 

        return sequence;
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNED_DATA.prototype.sign =
    function(privateKey, signerIndex, hashAlgorithm)
    {
        /// <param name="privateKey" type="Key">Private key for "subjectPublicKeyInfo" structure</param>
        /// <param name="signerIndex" type="Number">Index number (starting from 0) of signer index to make signature for</param>
        /// <param name="hashAlgorithm" type="String" optional="true">Hashing algorithm. Default SHA-1</param>

        // #region Initial variables 
        var _this = this;
        var data = new ArrayBuffer(0);
        var hashAlgorithmOID = "";
        // #endregion 

        // #region Get a private key from function parameter 
        if(typeof privateKey === "undefined")
            return new Promise(function(resolve, reject) { reject("Need to provide a private key for signing"); });
        // #endregion 

        // #region Get hashing algorithm 
        if(typeof hashAlgorithm === "undefined")
            hashAlgorithm = "SHA-1";

        // #region Simple check for supported algorithm 
        hashAlgorithmOID = in_window.org.pkijs.getHashAlgorithmOID(hashAlgorithm);
        if(hashAlgorithmOID === "")
            return new Promise(function(resolve, reject) { reject("Unsupported hash algorithm: " + hashAlgorithm); });
        // #endregion 
        // #endregion 

        // #region Append information about hash algorithm  
        var found = false;

        for(var i = 0; i < _this.digestAlgorithms.length; i++)
        {
            if(_this.digestAlgorithms[i].algorithm_id === hashAlgorithmOID)
            {
                found = true;
                break;
            }
        }

        if(found === false)
        {
            _this.digestAlgorithms.push(new org.pkijs.simpl.ALGORITHM_IDENTIFIER({
                algorithm_id: hashAlgorithmOID,
                algorithm_params: new org.pkijs.asn1.NULL()
            }));
        }

        _this.signerInfos[signerIndex].digestAlgorithm = new org.pkijs.simpl.ALGORITHM_IDENTIFIER({
            algorithm_id: hashAlgorithmOID,
            algorithm_params: new org.pkijs.asn1.NULL()
        });
        // #endregion 

        // #region Get a "default parameters" for current algorithm 
        var defParams = in_window.org.pkijs.getAlgorithmParameters(privateKey.algorithm.name, "sign");
        defParams.algorithm.hash.name = hashAlgorithm;
        // #endregion 

        // #region Fill internal structures base on "privateKey" and "hashAlgorithm" 
        switch(privateKey.algorithm.name.toUpperCase())
        {
            case "RSASSA-PKCS1-V1_5":
            case "ECDSA":
                _this.signerInfos[signerIndex].signatureAlgorithm.algorithm_id = in_window.org.pkijs.getSignatureAlgorithm(defParams.algorithm);
                break;
            case "RSA-PSS":
                {
                    // #region Set "saltLength" as a length (in octets) of hash function result 
                    switch(hashAlgorithm.toUpperCase())
                    {
                        case "SHA-256":
                            defParams.algorithm.saltLength = 32;
                            break;
                        case "SHA-384":
                            defParams.algorithm.saltLength = 48;
                            break;
                        case "SHA-512":
                            defParams.algorithm.saltLength = 64;
                            break;
                        default:;
                    }
                    // #endregion 

                    // #region Fill "RSASSA_PSS_params" object 
                    var paramsObject = {};

                    if(hashAlgorithm.toUpperCase() !== "SHA-1")
                    {
                        hashAlgorithmOID = in_window.org.pkijs.getHashAlgorithmOID(hashAlgorithm);
                        if(hashAlgorithmOID === "")
                            return new Promise(function(resolve, reject) { reject("Unsupported hash algorithm: " + hashAlgorithm); });

                        paramsObject.hashAlgorithm = new org.pkijs.simpl.ALGORITHM_IDENTIFIER({
                            algorithm_id: hashAlgorithmOID,
                            algorithm_params: new org.pkijs.asn1.NULL()
                        });

                        paramsObject.maskGenAlgorithm = new org.pkijs.simpl.ALGORITHM_IDENTIFIER({
                            algorithm_id: "1.2.840.113549.1.1.8", // MGF1
                            algorithm_params: paramsObject.hashAlgorithm.toSchema()
                        })
                    }

                    if(defParams.algorithm.saltLength !== 20)
                        paramsObject.saltLength = defParams.algorithm.saltLength;

                    var pssParameters = new in_window.org.pkijs.simpl.x509.RSASSA_PSS_params(paramsObject);
                    // #endregion   

                    // #region Automatically set signature algorithm 
                    _this.signerInfos[signerIndex].signatureAlgorithm = new org.pkijs.simpl.ALGORITHM_IDENTIFIER({
                        algorithm_id: "1.2.840.113549.1.1.10",
                        algorithm_params: pssParameters.toSchema()
                    });
                    // #endregion 
                }
                break;
            default:
                return new Promise(function(resolve, reject) { reject("Unsupported signature algorithm: " + privateKey.algorithm.name); });
        }
        // #endregion 

        // #region Create TBS data for signing 
        if("signedAttrs" in _this.signerInfos[signerIndex])
        {
            if(_this.signerInfos[signerIndex].signedAttrs.encoded_value.byteLength !== 0)
                data = _this.signerInfos[signerIndex].signedAttrs.encoded_value;
            else
            {
                data = _this.signerInfos[signerIndex].signedAttrs.toSchema(true).toBER(false);

                // #region Change type from "[0]" to "SET" acordingly to standard 
                var view = new Uint8Array(data);
                view[0] = 0x31;
                // #endregion 
            }
        }
        else
        {
            if("eContent" in _this.encapContentInfo) // Attached data
            {
                if((_this.encapContentInfo.eContent.id_block.tag_class === 1) &&
                   (_this.encapContentInfo.eContent.id_block.tag_number === 4))
                {
                    if(_this.encapContentInfo.eContent.id_block.is_constructed === false)
                        data = _this.encapContentInfo.eContent.value_block.value_hex;
                    else
                    {
                        for(var i = 0; i < _this.encapContentInfo.eContent.value_block.value.length; i++)
                            data = in_window.org.pkijs.concat_buffers(data, _this.encapContentInfo.eContent.value_block.value[i].value_block.value_hex);
                    }
                }
                else
                    data = _this.encapContentInfo.eContent.value_block.value_hex;
            }
            else // Detached data
            {
                if(data.byteLength === 0) // Check that "data" already provided by function parameter
                    return new Promise(function(resolve, reject) { reject("Missed detached data input array"); });
            }
        }
        // #endregion 

        // #region Get a "crypto" extension 
        var crypto = in_window.org.pkijs.getCrypto();
        if(typeof crypto == "undefined")
            return new Promise(function(resolve, reject) { reject("Unable to create WebCrypto object"); });
        // #endregion 

        // #region Signing TBS data on provided private key 
        return crypto.sign(defParams.algorithm,
            privateKey,
            new Uint8Array(data)).then(
            function(result)
            {
                // #region Special case for ECDSA algorithm 
                if(defParams.algorithm.name === "ECDSA")
                    result = in_window.org.pkijs.createCMSECDSASignature(result);
                // #endregion 

                _this.signerInfos[signerIndex].signature = new in_window.org.pkijs.asn1.OCTETSTRING({ value_hex: result });
                return new Promise(function(resolve, reject) { resolve(result); });
            },
            function(error)
            {
                return new Promise(function(resolve, reject) { reject("Signing error: " + error); });
            }
            );
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_SIGNED_DATA.prototype.toJSON =
    function()
    {
        var _object = {
            version: this.version
        };

        _object.digestAlgorithms = new Array();

        for(var i = 0; i < this.digestAlgorithms.length; i++)
            _object.digestAlgorithms.push(this.digestAlgorithms[i].toJSON());

        _object.encapContentInfo = this.encapContentInfo.toJSON();

        if("certificates" in this)
        {
            _object.certificates = new Array();

            for(var i = 0; i < this.certificates.length; i++)
                _object.certificates.push(this.certificates[i].toJSON());
        }

        if("crls" in this)
        {
            _object.crls = new Array();

            for(var i = 0; i < this.crls.length; i++)
                _object.crls.push(this.crls[i].toJSON());
        }

        _object.signerInfos = new Array();

        for(var i = 0; i < this.signerInfos.length; i++)
            _object.signerInfos.push(this.signerInfos[i].toJSON());

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "RecipientIdentifier" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientIdentifier =
    function()
    {
        // #region Internal properties of the object 
        this.variant = -1; // CHOICE variant
        // VALUE OF CHOICE this.value
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.RecipientIdentifier.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.variant = arguments[0].variant || (-1);

                if("value" in arguments[0])
                    this.value = arguments[0].value;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientIdentifier.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.RecipientIdentifier({
                names: {
                    block_name: "block_name"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for RecipientIdentifier");
        // #endregion 

        // #region Get internal properties from parsed schema 
        if(asn1.result["block_name"].id_block.tag_class === 1)
        {
            this.variant = 1;
            this.value = new in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber({ schema: asn1.result["block_name"] });
        }
        else
        {
            this.variant = 2;
            this.value = asn1.result["block_name"].value_block.value[0];
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientIdentifier.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        switch(this.variant)
        {
            case 1:
                return this.value.toSchema();
                break;
            case 2:
                return new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 0 // [0]
                    },
                    value: [this.value]
                });
                break;
            default:
                return new in_window.org.pkijs.asn1.ANY();
        }
        // #endregion 

        return new in_window.org.pkijs.asn1.ANY();
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientIdentifier.prototype.toJSON =
    function()
    {
        var _object = {
            variant: this.variant
        };

        if((this.variant == 1) || (this.variant === 2))
            _object.value = this.value.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "KeyTransRecipientInfo" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyTransRecipientInfo =
    function()
    {
        // #region Internal properties of the object 
        this.version = -1;
        this.rid = new in_window.org.pkijs.emptyObject();
        this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        this.encryptedKey = new in_window.org.pkijs.asn1.OCTETSTRING();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.KeyTransRecipientInfo.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.version = arguments[0].version || -1;
                this.rid = arguments[0].rid || new in_window.org.pkijs.emptyObject();
                this.keyEncryptionAlgorithm = arguments[0].keyEncryptionAlgorithm || new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
                this.encryptedKey = arguments[0].encryptedKey || new in_window.org.pkijs.asn1.OCTETSTRING();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyTransRecipientInfo.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.KeyTransRecipientInfo({
                names: {
                    version: "version",
                    rid: {
                        names: {
                            block_name: "rid"
                        }
                    },
                    keyEncryptionAlgorithm: {
                        names: {
                            block_name: "keyEncryptionAlgorithm"
                        }
                    },
                    encryptedKey: "encryptedKey"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for KeyTransRecipientInfo");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.version = asn1.result["version"].value_block.value_dec;

        if(asn1.result["rid"].id_block.tag_class === 3)
            this.rid = asn1.result["rid"].value_block.value[0]; // SubjectKeyIdentifier
        else
            this.rid = new in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber({ schema: asn1.result["rid"] });

        this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["keyEncryptionAlgorithm"] });
        this.encryptedKey = asn1.result["encryptedKey"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyTransRecipientInfo.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(new in_window.org.pkijs.asn1.INTEGER({ value: this.version }));

        if(this.rid instanceof in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber)
            output_array.push(this.rid.toSchema());
        else
            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 0 // [0]
                },
                value: [this.rid]
            }));

        output_array.push(this.keyEncryptionAlgorithm.toSchema());
        output_array.push(this.encryptedKey);
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyTransRecipientInfo.prototype.toJSON =
    function()
    {
        return {
            version: this.version,
            rid: this.rid.toJSON(),
            keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
            encryptedKey: this.encryptedKey.toJSON()
        };
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "OriginatorPublicKey" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorPublicKey =
    function()
    {
        // #region Internal properties of the object 
        this.algorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        this.publicKey = new in_window.org.pkijs.asn1.BITSTRING();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.OriginatorPublicKey.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.algorithm = arguments[0].algorithm || new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
                this.publicKey = arguments[0].publicKey || new in_window.org.pkijs.asn1.BITSTRING();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorPublicKey.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.OriginatorPublicKey({
                names: {
                    algorithm: {
                        names: {
                            block_name: "algorithm"
                        }
                    },
                    publicKey: "publicKey"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for OriginatorPublicKey");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.algorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["algorithm"] });
        this.publicKey = asn1.result["publicKey"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorPublicKey.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                this.algorithm.toSchema(),
                this.publicKey
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorPublicKey.prototype.toJSON =
    function()
    {
        return {
            algorithm: this.algorithm.toJSON(),
            publicKey: this.publicKey.toJSON()
        };
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "OriginatorIdentifierOrKey" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorIdentifierOrKey =
    function()
    {
        // #region Internal properties of the object 
        this.variant = -1; // CHOICE variant
        // VALUE OF CHOICE this.value
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.OriginatorIdentifierOrKey.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.variant = arguments[0].variant || (-1);

                if("value" in arguments[0])
                    this.value = arguments[0].value;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorIdentifierOrKey.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.OriginatorIdentifierOrKey({
                names: {
                    block_name: "block_name"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for OriginatorIdentifierOrKey");
        // #endregion 

        // #region Get internal properties from parsed schema 
        if(asn1.result["block_name"].id_block.tag_class === 1)
        {
            this.variant = 1;
            this.value = new in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber({ schema: asn1.result["block_name"] });
        }
        else
        {
            if(asn1.result["block_name"].id_block.tag_number === 0)
            {
                this.variant = 2;
                this.value = asn1.result["block_name"].value_block.value[0];
            }
            else
            {
                this.variant = 3;
                this.value = new in_window.org.pkijs.simpl.cms.OriginatorPublicKey({ schema: asn1.result["block_name"].value_block.value[0] });
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorIdentifierOrKey.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        switch(this.variant)
        {
            case 1:
                return this.value.toSchema();
                break;
            case 2:
                return new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 0 // [0]
                    },
                    value: [this.value]
                });
                break;
            case 3:
                return new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 1 // [1]
                    },
                    value: [this.value.toSchema()]
                })
                break;
            default:
                return new in_window.org.pkijs.asn1.ANY();
        }
        // #endregion 

        return new in_window.org.pkijs.asn1.ANY();
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorIdentifierOrKey.prototype.toJSON =
    function()
    {
        var _object = {
            variant: this.variant
        };

        if((this.variant == 1) || (this.variant === 2) || (this.variant === 3))
            _object.value = this.value.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "OtherKeyAttribute" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherKeyAttribute =
    function()
    {
        // #region Internal properties of the object 
        this.keyAttrId = "";
        // OPTIONAL this.keyAttr
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.OtherKeyAttribute.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.keyAttrId = arguments[0].keyAttrId || new in_window.org.pkijs.asn1.OID();

                if("keyAttr" in arguments[0])
                    this.keyAttr = arguments[0].keyAttr;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherKeyAttribute.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.OtherKeyAttribute({
                names: {
                    keyAttrId: "keyAttrId",
                    keyAttr: "keyAttr"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for OtherKeyAttribute");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.keyAttrId = asn1.result["keyAttrId"].value_block.toString();

        if("keyAttr" in asn1.result)
            this.keyAttr = asn1.result["keyAttr"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherKeyAttribute.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(new in_window.org.pkijs.asn1.OID({ value: this.keyAttrId }));

        if("keyAttr" in this)
            output_array.push(this.keyAttr.toSchema());
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherKeyAttribute.prototype.toJSON =
    function()
    {
        var _object = {
            keyAttrId: this.keyAttrId
        };

        if("keyAttr" in this)
            _object.keyAttr = this.keyAttr.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "RecipientKeyIdentifier" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientKeyIdentifier =
    function()
    {
        // #region Internal properties of the object 
        this.subjectKeyIdentifier = new in_window.org.pkijs.asn1.OCTETSTRING();
        // OPTIONAL this.date
        // OPTIONAL this.other
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.RecipientKeyIdentifier.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.subjectKeyIdentifier = arguments[0].subjectKeyIdentifier || new in_window.org.pkijs.asn1.OCTETSTRING();

                if("date" in arguments[0])
                    this.date = arguments[0].date;

                if("other" in arguments[0])
                    this.other = arguments[0].other;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientKeyIdentifier.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.RecipientKeyIdentifier({
                names: {
                    subjectKeyIdentifier: "subjectKeyIdentifier",
                    date: "date",
                    other: {
                        names: {
                            block_name: "other"
                        }
                    }
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for RecipientKeyIdentifier");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.subjectKeyIdentifier = asn1.result["subjectKeyIdentifier"];

        if("date" in asn1.result)
            this.date = asn1.result["date"];

        if("other" in asn1.result)
            this.other = new in_window.org.pkijs.simpl.cms.OtherKeyAttribute({ schema: asn1.result["other"] });
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientKeyIdentifier.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(this.subjectKeyIdentifier);

        if("date" in this)
            output_array.push(this.date);

        if("other" in this)
            output_array.push(this.other.toSchema());
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientKeyIdentifier.prototype.toJSON =
    function()
    {
        var _object = {
            subjectKeyIdentifier: this.subjectKeyIdentifier.toJSON()
        };

        if("date" in this)
            _object.date = this.date;

        if("other" in this)
            _object.other = this.other.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "KeyAgreeRecipientIdentifier" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyAgreeRecipientIdentifier =
    function()
    {
        // #region Internal properties of the object 
        this.variant = -1; // CHOICE variant
        // VALUE OF CHOICE this.value
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.KeyAgreeRecipientIdentifier.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.variant = arguments[0].variant || (-1);

                if("value" in arguments[0])
                    this.value = arguments[0].value;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyAgreeRecipientIdentifier.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.KeyAgreeRecipientIdentifier({
                names: {
                    block_name: "block_name"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for KeyAgreeRecipientIdentifier");
        // #endregion 

        // #region Get internal properties from parsed schema 
        if(asn1.result["block_name"].id_block.tag_class === 1)
        {
            this.variant = 1;
            this.value = new in_window.org.pkijs.simpl.cms.IssuerAndSerialNumber({ schema: asn1.result["block_name"] });
        }
        else
        {
            this.variant = 2;

            asn1.result["block_name"].id_block.tag_class = 1; // UNIVERSAL
            asn1.result["block_name"].id_block.tag_number = 16; // SEQUENCE

            this.value = new in_window.org.pkijs.simpl.cms.RecipientKeyIdentifier({ schema: asn1.result["block_name"] });
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyAgreeRecipientIdentifier.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        switch(this.variant)
        {
            case 1:
                return this.value.toSchema();
                break;
            case 2:
                return new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 0 // [0]
                    },
                    value: this.value.toSchema().value_block.value
                });
                break;
            default:
                return new in_window.org.pkijs.asn1.ANY();
        }
        // #endregion 

        return new in_window.org.pkijs.asn1.ANY();
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyAgreeRecipientIdentifier.prototype.toJSON =
    function()
    {
        var _object = {
            variant: this.variant
        };

        if((this.variant == 1) || (this.variant === 2))
            _object.value = this.value.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "RecipientEncryptedKey" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientEncryptedKey =
    function()
    {
        // #region Internal properties of the object 
        this.rid = new in_window.org.pkijs.simpl.cms.KeyAgreeRecipientIdentifier();
        this.encryptedKey = new in_window.org.pkijs.asn1.OCTETSTRING();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.RecipientEncryptedKey.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.rid = arguments[0].rid || new in_window.org.pkijs.simpl.cms.KeyAgreeRecipientIdentifier();
                this.encryptedKey = arguments[0].encryptedKey || new in_window.org.pkijs.asn1.OCTETSTRING();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientEncryptedKey.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.RecipientEncryptedKey({
                names: {
                    rid: {
                        block_name: "rid"
                    },
                    encryptedKey: "encryptedKey"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for RecipientEncryptedKey");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.rid = new new in_window.org.pkijs.simpl.cms.KeyAgreeRecipientIdentifier({ schema: asn1.result["rid"] });
        this.encryptedKey = asn1.result["encryptedKey"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientEncryptedKey.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                this.rid.toSchema(),
                this.encryptedKey
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientEncryptedKey.prototype.toJSON =
    function()
    {
        return {
            rid: this.rid.toJSON(),
            encryptedKey: this.encryptedKey.toJSON()
        };
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "RecipientEncryptedKeys" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientEncryptedKeys =
    function()
    {
        // #region Internal properties of the object 
        this.encryptedKeys = new Array(); // Array of "in_window.org.pkijs.simpl.cms.RecipientEncryptedKey"
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.RecipientEncryptedKeys.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.encryptedKeys = arguments[0].encryptedKeys || new Array();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientEncryptedKeys.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.RecipientEncryptedKeys({
                names: {
                    RecipientEncryptedKeys: "RecipientEncryptedKeys"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for RecipientEncryptedKeys");
        // #endregion 

        // #region Get internal properties from parsed schema 
        var array = asn1.result["RecipientEncryptedKeys"];

        for(var i = 0; i < array.length; i++)
            this.encryptedKeys.push(new in_window.org.pkijs.simpl.cms.RecipientEncryptedKey({ schema: array[i] }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientEncryptedKeys.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        for(var i = 0; i < this.encryptedKeys.length; i++)
            output_array.push(this.encryptedKeys[i].toSchema());
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.RecipientEncryptedKeys.prototype.toJSON =
    function()
    {
        var _object = {};

        _object.encryptedKeys = new Array();

        for(var i = 0; i < this.encryptedKeys.length; i++)
            _object.encryptedKeys.push(this.encryptedKeys[i].toJSON());

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "KeyAgreeRecipientInfo" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyAgreeRecipientInfo =
    function()
    {
        // #region Internal properties of the object 
        this.version = 0;
        this.originator = new in_window.org.pkijs.simpl.cms.OriginatorIdentifierOrKey();
        this.ukm = new in_window.org.pkijs.asn1.OCTETSTRING();
        this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        this.recipientEncryptedKeys = new in_window.org.pkijs.simpl.cms.RecipientEncryptedKeys();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.KeyAgreeRecipientInfo.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.version = 0;
                this.originator = new in_window.org.pkijs.simpl.cms.OriginatorIdentifierOrKey();
                this.ukm = new in_window.org.pkijs.asn1.OCTETSTRING();
                this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
                this.recipientEncryptedKeys = new in_window.org.pkijs.simpl.cms.RecipientEncryptedKeys();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyAgreeRecipientInfo.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.KeyAgreeRecipientInfo({
                names: {
                    version: "version",
                    originator: {
                        names: {
                            block_name: "originator"
                        }
                    },
                    ukm: "ukm",
                    keyEncryptionAlgorithm: {
                        names: {
                            block_name: "keyEncryptionAlgorithm"
                        }
                    },
                    recipientEncryptedKeys: {
                        names: {
                            block_name: "recipientEncryptedKeys"
                        }
                    }
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for KeyAgreeRecipientInfo");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.version = asn1.result["version"].value_block.value_dec;
        this.originator = new in_window.org.pkijs.simpl.cms.OriginatorIdentifierOrKey({ schema: asn1.result["originator"] });
        this.ukm = asn1.result["ukm"];
        this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["keyEncryptionAlgorithm"] });
        this.recipientEncryptedKeys = new in_window.org.pkijs.simpl.cms.RecipientEncryptedKeys({ schema: asn1.result["recipientEncryptedKeys"] });
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyAgreeRecipientInfo.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.INTEGER({ value: this.version }),
                new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 0 // [0]
                    },
                    value: [this.originator.toSchema()]
                }),
                new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    optional: true,
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 1 // [1]
                    },
                    value: [this.ukm]
                }),
                this.keyEncryptionAlgorithm.toSchema(),
                this.recipientEncryptedKeys.toSchema()
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KeyAgreeRecipientInfo.prototype.toJSON =
    function()
    {
        return {
            version: this.version,
            originator: this.originator.toJSON(),
            ukm: this.ukm.toJSON(),
            keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
            recipientEncryptedKeys: this.recipientEncryptedKeys.toJSON()
        };
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "KEKIdentifier" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KEKIdentifier =
    function()
    {
        // #region Internal properties of the object 
        this.keyIdentifier = new in_window.org.pkijs.asn1.OCTETSTRING();
        // OPTIONAL this.date
        // OPTIONAL this.other
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.KEKIdentifier.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.keyIdentifier = arguments[0].keyIdentifier || new in_window.org.pkijs.asn1.OCTETSTRING();

                if("date" in arguments[0])
                    this.date = arguments[0].date;

                if("other" in arguments[0])
                    this.other = arguments[0].other;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KEKIdentifier.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.KEKIdentifier({
                names: {
                    keyIdentifier: "keyIdentifier",
                    date: "date",
                    other: {
                        names: {
                            block_name: "other"
                        }
                    }
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for KEKIdentifier");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.keyIdentifier = asn1.result["keyIdentifier"];

        if("date" in asn1.result)
            this.date = asn1.result["date"];

        if("other" in asn1.result)
            this.other = new in_window.org.pkijs.simpl.cms.OtherKeyAttribute({ schema: asn1.result["other"] })
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KEKIdentifier.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(this.keyIdentifier);

        if("date" in this)
            output_array.push(this.date);

        if("other" in this)
            output_array.push(this.other.toSchema());
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KEKIdentifier.prototype.toJSON =
    function()
    {
        var _object = {
            keyIdentifier: this.keyIdentifier.toJSON()
        };

        if("date" in this)
            _object.date = this.date;

        if("other" in this)
            _object.other = this.other.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "KEKRecipientInfo" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KEKRecipientInfo =
    function()
    {
        // #region Internal properties of the object 
        this.version = 0;
        this.kekid = new in_window.org.pkijs.simpl.cms.KEKIdentifier();
        this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        this.encryptedKey = new in_window.org.pkijs.asn1.OCTETSTRING();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.KEKRecipientInfo.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.version = arguments[0].version || 0;
                this.kekid = arguments[0].kekid || new in_window.org.pkijs.simpl.cms.KEKIdentifier();
                this.keyEncryptionAlgorithm = arguments[0].keyEncryptionAlgorithm || new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
                this.encryptedKey = arguments[0].encryptedKey || new in_window.org.pkijs.asn1.OCTETSTRING();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KEKRecipientInfo.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.KEKRecipientInfo({
                names: {
                    version: "version",
                    kekid: {
                        names: {
                            block_name: "kekid"
                        }
                    },
                    keyEncryptionAlgorithm: {
                        names: {
                            block_name: "keyEncryptionAlgorithm"
                        }
                    },
                    encryptedKey: "encryptedKey"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for KEKRecipientInfo");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.version = asn1.result["version"].value_block.value_dec;
        this.kekid = new in_window.org.pkijs.simpl.cms.KEKIdentifier({ schema: asn1.result["kekid"] });
        this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["keyEncryptionAlgorithm"] });
        this.encryptedKey = asn1.result["encryptedKey"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KEKRecipientInfo.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.INTEGER({ value: this.version }),
                this.kekid.toSchema(),
                this.keyEncryptionAlgorithm.toSchema(),
                this.encryptedKey
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.KEKRecipientInfo.prototype.toJSON =
    function()
    {
        return {
            version: this.version,
            kekid: this.originator.toJSON(),
            keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
            encryptedKey: this.encryptedKey.toJSON()
        };
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "PasswordRecipientinfo" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.PasswordRecipientinfo =
    function()
    {
        // #region Internal properties of the object 
        this.version = -1;
        this.keyDerivationAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        this.encryptedKey = new in_window.org.pkijs.asn1.OCTETSTRING();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.PasswordRecipientinfo.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.version = arguments[0].version || -1;
                this.keyDerivationAlgorithm = arguments[0].keyDerivationAlgorithm || new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
                this.keyEncryptionAlgorithm = arguments[0].keyEncryptionAlgorithm || new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
                this.encryptedKey = arguments[0].encryptedKey || new in_window.org.pkijs.asn1.OCTETSTRING();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.PasswordRecipientinfo.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.PasswordRecipientinfo({
                names: {
                    version: "version",
                    keyDerivationAlgorithm: {
                        names: {
                            block_name: "keyDerivationAlgorithm"
                        }
                    },
                    keyEncryptionAlgorithm: {
                        names: {
                            block_name: "keyEncryptionAlgorithm"
                        }
                    },
                    encryptedKey: "encryptedKey"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for PasswordRecipientinfo");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.version = asn1.result["version"].value_block.value_dec;
        this.keyDerivationAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["keyDerivationAlgorithm"] });
        this.keyEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["keyEncryptionAlgorithm"] });
        this.encryptedKey = asn1.result["encryptedKey"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.PasswordRecipientinfo.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.INTEGER({ value: this.version }),
                this.keyDerivationAlgorithm.toSchema(),
                this.keyEncryptionAlgorithm.toSchema(),
                this.encryptedKey
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.PasswordRecipientinfo.prototype.toJSON =
    function()
    {
        return {
            version: this.version,
            keyDerivationAlgorithm: this.keyDerivationAlgorithm.toJSON(),
            keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
            encryptedKey: this.encryptedKey.toJSON()
        };
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "OtherRecipientInfo" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherRecipientInfo =
    function()
    {
        // #region Internal properties of the object 
        this.oriType = "";
        this.oriValue = new in_window.org.pkijs.asn1.ANY();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.OtherRecipientInfo.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.oriType = arguments[0].oriType || "";
                this.oriValue = arguments[0].oriValue || new in_window.org.pkijs.asn1.ANY();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherRecipientInfo.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.OtherRecipientInfo({
                names: {
                    oriType: "oriType",
                    oriValue: "oriValue"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for OtherRecipientInfo");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.oriType = asn1.result["oriType"].value_block.toString();
        this.oriValue = asn1.result["oriValue"];
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherRecipientInfo.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.OID({ value: this.oriType }),
                this.oriValue
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OtherRecipientInfo.prototype.toJSON =
    function()
    {
        var _object = {
            oriType: this.oriType
        };

        if(!(this.oriValue instanceof in_window.org.pkijs.asn1.ANY))
            _object.oriValue = this.oriValue.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "CMS_RECIPIENT_INFO" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_RECIPIENT_INFO =
    function()
    {
        // #region Internal properties of the object 
        this.variant = -1; // CHOICE variant
        // VALUE OF CHOICE this.value
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.CMS_RECIPIENT_INFO.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.variant = arguments[0].variant || (-1);

                if("value" in arguments[0])
                    this.value = arguments[0].value;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_RECIPIENT_INFO.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.CMS_RECIPIENT_INFO({
                names: {
                    block_name: "block_name"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for CMS_RECIPIENT_INFO");
        // #endregion 

        // #region Get internal properties from parsed schema 
        if(asn1.result["block_name"].id_block.tag_class === 1)
        {
            this.variant = 1;
            this.value = new in_window.org.pkijs.simpl.cms.KeyTransRecipientInfo({ schema: asn1.result["block_name"] });
        }
        else
        {
            switch(asn1.result["block_name"].id_block.tag_number)
            {
                case 1:
                    this.variant = 2;
                    this.value = new in_window.org.pkijs.simpl.cms.KeyAgreeRecipientInfo({ schema: asn1.result["block_name"].value_block.value[0] });
                    break;
                case 2:
                    this.variant = 3;
                    this.value = new in_window.org.pkijs.simpl.cms.KEKRecipientInfo({ schema: asn1.result["block_name"].value_block.value[0] });
                    break;
                case 3:
                    this.variant = 4;
                    this.value = new in_window.org.pkijs.simpl.cms.PasswordRecipientinfo({ schema: asn1.result["block_name"].value_block.value[0] });
                    break;
                case 4:
                    this.variant = 5;
                    this.value = new in_window.org.pkijs.simpl.cms.OtherRecipientInfo({ schema: asn1.result["block_name"].value_block.value[0] });
                    break;
                default:;
            }

            this.variant = 2;
            this.value = asn1.result["block_name"].value_block.value[0];
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_RECIPIENT_INFO.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        switch(this.variant)
        {
            case 1:
                return this.value.toSchema();
                break;
            case 2:
                return new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: (this.variant - 1)
                    },
                    value: [this.value.toSchema()]
                });
                break;
            default:
                return new in_window.org.pkijs.asn1.ANY();
        }
        // #endregion 

        return new in_window.org.pkijs.asn1.ANY();
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_RECIPIENT_INFO.prototype.toJSON =
    function()
    {
        var _object = {
            variant: this.variant
        };

        if((this.variant == 1) || (this.variant === 2))
            _object.value = this.value.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "OriginatorInfo" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorInfo =
    function()
    {
        // #region Internal properties of the object 
        this.certs = new in_window.org.pkijs.simpl.CMS_CERTIFICATE_SET();
        this.crls = new in_window.org.pkijs.simpl.CSM_REVOCATION_INFO_CHOICES();
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.OriginatorInfo.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.certs = arguments[0].certs || new in_window.org.pkijs.simpl.CMS_CERTIFICATE_SET();
                this.crls = arguments[0].crls || new in_window.org.pkijs.simpl.CSM_REVOCATION_INFO_CHOICES();
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorInfo.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.OriginatorInfo({
                names: {
                    certs: "certs",
                    crls: "crls"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for OriginatorInfo");
        // #endregion 

        // #region Get internal properties from parsed schema 
        asn1.result["certs"].id_block.tag_class = 1; // UNIVERSAL
        asn1.result["certs"].id_block.tag_number = 17; // SET

        this.certs = new in_window.org.pkijs.simpl.CMS_CERTIFICATE_SET({ schema: asn1.result["certs"] });

        asn1.result["crls"].id_block.tag_class = 1; // UNIVERSAL
        asn1.result["crls"].id_block.tag_number = 17; // SET

        this.crls = new in_window.org.pkijs.simpl.CSM_REVOCATION_INFO_CHOICES({ schema: asn1.result["crls"] });
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorInfo.prototype.toSchema =
    function()
    {
        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: [
                new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    optional: true,
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 0 // [0]
                    },
                    value: this.certs.toSchema().value_block.value
                }),
                new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                    optional: true,
                    id_block: {
                        tag_class: 3, // CONTEXT-SPECIFIC
                        tag_number: 1 // [1]
                    },
                    value: this.crls.toSchema().value_block.value
                })
            ]
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.OriginatorInfo.prototype.toJSON =
    function()
    {
        return {
            certs: this.certs.toJSON(),
            crls: this.crls.toJSON()
        };
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "EncryptedContentInfo" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.EncryptedContentInfo =
    function()
    {
        // #region Internal properties of the object 
        this.contentType = "";
        this.contentEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();
        // OPTIONAL this.encryptedContent // new in_window.org.pkijs.asn1.OCTETSTRING - (!!!) could be contructive or primitive value (!!!)
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.cms.EncryptedContentInfo.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.contentType = arguments[0].contentType || "";
                this.contentEncryptionAlgorithm = arguments[0].contentEncryptionAlgorithm || new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER();

                if("encryptedContent" in arguments[0])
                {
                    this.encryptedContent = arguments[0].encryptedContent;

                    if((this.encryptedContent.id_block.tag_class === 1) &&
                       (this.encryptedContent.id_block.tag_number === 4))
                    {
                        // #region Divide OCTETSTRING value down to small pieces 
                        if(this.encryptedContent.id_block.is_constructed === false)
                        {
                            var constr_string = new in_window.org.pkijs.asn1.OCTETSTRING({
                                id_block: { is_constructed: true },
                                is_constructed: true
                            });

                            var offset = 0;
                            var length = this.encryptedContent.value_block.value_hex.byteLength;

                            while(length > 0)
                            {
                                var piece_view = new Uint8Array(this.encryptedContent.value_block.value_hex, offset, ((offset + 65536) > this.encryptedContent.value_block.value_hex.byteLength) ? (this.encryptedContent.value_block.value_hex.byteLength - offset) : 65536);
                                var _array = new ArrayBuffer(piece_view.length);
                                var _view = new Uint8Array(_array);

                                for(var i = 0; i < _view.length; i++)
                                    _view[i] = piece_view[i];

                                constr_string.value_block.value.push(new in_window.org.pkijs.asn1.OCTETSTRING({ value_hex: _array }));

                                length -= piece_view.length;
                                offset += piece_view.length;
                            }

                            this.encryptedContent = constr_string;
                        }
                        // #endregion   
                    }
                }
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.EncryptedContentInfo.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.cms.EncryptedContentInfo({
                names: {
                    contentType: "contentType",
                    contentEncryptionAlgorithm: {
                        names: {
                            block_name: "contentEncryptionAlgorithm"
                        }
                    },
                    encryptedContent: "encryptedContent"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for EncryptedContentInfo");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.contentType = asn1.result["contentType"].value_block.toString();
        this.contentEncryptionAlgorithm = new in_window.org.pkijs.simpl.ALGORITHM_IDENTIFIER({ schema: asn1.result["contentEncryptionAlgorithm"] });

        if("encryptedContent" in asn1.result)
        {
            this.encryptedContent = asn1.result["encryptedContent"];

            this.encryptedContent.id_block.tag_class = 1; // UNIVERSAL
            this.encryptedContent.id_block.tag_number = 4; // OCTETSTRING (!!!) The value still has instance of "in_window.org.pkijs.asn1.ASN1_CONSTRUCTED / ASN1_PRIMITIVE"
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.EncryptedContentInfo.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(new in_window.org.pkijs.asn1.OID({ value: this.contentType }));
        output_array.push(this.contentEncryptionAlgorithm.toSchema());

        if("encryptedContent" in this)
        {
            var encryptedValue = this.encryptedContent;

            encryptedValue.id_block.tag_class = 3; // CONTEXT-SPECIFIC
            encryptedValue.id_block.tag_number = 0; // [0]

            output_array.push(encryptedValue);
        }
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.cms.EncryptedContentInfo.prototype.toJSON =
    function()
    {
        var _object = {
            contentType: this.contentType,
            contentEncryptionAlgorithm: this.contentEncryptionAlgorithm.toJSON()
        };

        if("encryptedContent" in this)
            _object.encryptedContent = this.encryptedContent.toJSON();

        return _object;
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
    // #region Simplified structure for "CMS_ENVELOPED_DATA" type
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_ENVELOPED_DATA =
    function()
    {
        // #region Internal properties of the object 
        this.version = 0;
        // OPTIONAL this.originatorInfo
        this.recipientInfos = new Array(); // Array of "simpl.CMS_RECIPIENT_INFO"
        this.encryptedContentInfo = new in_window.org.pkijs.simpl.cms.EncryptedContentInfo();
        // OPTIONAL this.unprotectedAttrs
        // #endregion 

        // #region If input argument array contains "schema" for this object 
        if((arguments[0] instanceof Object) && ("schema" in arguments[0]))
            in_window.org.pkijs.simpl.CMS_ENVELOPED_DATA.prototype.fromSchema.call(this, arguments[0].schema);
        // #endregion 
        // #region If input argument array contains "native" values for internal properties 
        else
        {
            if(arguments[0] instanceof Object)
            {
                this.version = arguments[0].version || 0;

                if("originatorInfo" in arguments[0])
                    this.originatorInfo = arguments[0].originatorInfo;

                this.recipientInfos = arguments[0].recipientInfos || new Array(); // Array of "simpl.CMS_RECIPIENT_INFO"
                this.encryptedContentInfo = arguments[0].encryptedContentInfo || new in_window.org.pkijs.simpl.cms.EncryptedContentInfo();

                if("unprotectedAttrs" in arguments[0])
                    this.unprotectedAttrs = arguments[0].unprotectedAttrs;
            }
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_ENVELOPED_DATA.prototype.fromSchema =
    function(schema)
    {
        // #region Check the schema is valid 
        var asn1 = in_window.org.pkijs.compareSchema(schema,
            schema,
            in_window.org.pkijs.schema.CMS_ENVELOPED_DATA({
                names: {
                    version: "version",
                    originatorInfo: "originatorInfo",
                    recipientInfos: "recipientInfos",
                    encryptedContentInfo: {
                        names: {
                            block_name: "encryptedContentInfo"
                        }
                    },
                    unprotectedAttrs: "unprotectedAttrs"
                }
            })
            );

        if(asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for CMS_ENVELOPED_DATA");
        // #endregion 

        // #region Get internal properties from parsed schema 
        this.version = asn1.result["version"].value_block.value_dec;

        if("originatorInfo" in asn1.result)
        {
            asn1.result["originatorInfo"].id_block.tag_class = 1; // UNIVERSAL
            asn1.result["originatorInfo"].id_block.tag_number = 16; // SEQUENCE

            this.originatorInfo = new in_window.org.pkijs.simpl.cms.OriginatorInfo({ schema: asn1.result["originatorInfo"] });
        }

        var recipient_array = asn1.result["recipientInfos"];

        for(var i = 0; i < recipient_array.length; i++)
            this.recipientInfos.push(new in_window.org.pkijs.simpl.CMS_RECIPIENT_INFO({ schema: recipient_array[i] }));

        this.encryptedContentInfo = new in_window.org.pkijs.simpl.cms.EncryptedContentInfo({ schema: asn1.result["encryptedContentInfo"] });

        if("unprotectedAttrs" in asn1.result)
        {
            this.unprotectedAttrs = new Array();
            var attributes_array = asn1.result["unprotectedAttrs"];

            for(var j = 0; j < attributes_array.length; j++)
                this.unprotectedAttrs.push(new in_window.org.pkijs.simpl.ATTRIBUTE({ schema: attributes_array[j] }));
        }
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_ENVELOPED_DATA.prototype.toSchema =
    function()
    {
        // #region Create array for output sequence 
        var output_array = new Array();

        output_array.push(new in_window.org.pkijs.asn1.INTEGER({ value: this.version }));

        if("originatorInfo" in this)
            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                optional: true,
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 0 // [0]
                },
                value: this.originatorInfo.toSchema().value_block.value
            }));

        var recipients = new Array();

        for(var i = 0; i < this.recipientInfos.length; i++)
            recipients.push(this.recipientInfos[i].toSchema());

        output_array.push(new in_window.org.pkijs.asn1.SET({
            value: recipients
        }));

        output_array.push(this.encryptedContentInfo.toSchema());

        if("unprotectedAttrs" in this)
        {
            var attributes = new Array();

            for(var j = 0; j < this.unprotectedAttrs.length; j++)
                attributes.push(this.unprotectedAttrs[j].toSchema());

            output_array.push(new in_window.org.pkijs.asn1.ASN1_CONSTRUCTED({
                optional: true,
                id_block: {
                    tag_class: 3, // CONTEXT-SPECIFIC
                    tag_number: 1 // [1]
                },
                value: attributes
            }));
        }
        // #endregion 

        // #region Construct and return new ASN.1 schema for this object 
        return (new in_window.org.pkijs.asn1.SEQUENCE({
            value: output_array
        }));
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_ENVELOPED_DATA.prototype.toJSON =
    function()
    {
        var _object = {
            version: this.version
        };

        if("originatorInfo" in this)
            _object.originatorInfo = this.originatorInfo.toJSON();

        _object.recipientInfos = new Array();

        for(var i = 0; i < this.recipientInfos.length; i++)
            _object.recipientInfos.push(this.recipientInfos[i].toJSON());

        _object.encryptedContentInfo = this.encryptedContentInfo.toJSON();

        if("unprotectedAttrs" in this)
        {
            _object.unprotectedAttrs = new Array();

            for(var i = 0; i < this.unprotectedAttrs.length; i++)
                _object.unprotectedAttrs.push(this.unprotectedAttrs[i].toJSON());
        }

        return _object;
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_ENVELOPED_DATA.prototype.encrypt =
    function()
    {
        /// <summary>Create a new CMS Enveloped Data content with encrypted data</summary>

        // #region Initial variables 
        var type; // 0 - KeyTransRecipientInfo, 1 - KeyAgreeRecipientInfo, 2 - KEKRecipientInfo, 3 - PasswordRecipientinfo
        var typeInfo;

        // Input variables:
        // =================
        // 1. Certificate for receiver;
        // 2. Symmetric encryption algorithm;
        // 3. "Key transport" algorithm;
        // #endregion 

        // #region Get input variable values 
        if(arguments[0] instanceof Object)
        {
            if("type" in arguments[0])
            {
                type = arguments[0].type;

                if("typeInfo" in arguments[0])
                    typeInfo = arguments[0].typeInfo;
                else
                    return new Promise(function(resolve, reject) { reject("No \"typeInfo\" parameter provided to \"CMS_ENVELOPED_DATA.encrypt\" method"); });
            }
            else
                return new Promise(function(resolve, reject) { reject("No \"type\" parameter provided to \"CMS_ENVELOPED_DATA.encrypt\" method"); });
        }
        else
            return new Promise(function(resolve, reject) { reject("No input data provided to \"CMS_ENVELOPED_DATA.encrypt\" method"); });
        // #endregion 
    }
    //**************************************************************************************
    in_window.org.pkijs.simpl.CMS_ENVELOPED_DATA.prototype.decrypt =
    function()
    {
        /// <summary>Decrypt existing CMS Enveloped Data content</summary>
    }
    //**************************************************************************************
    // #endregion 
    //**************************************************************************************
}
)(typeof exports !== "undefined" ? exports : window);