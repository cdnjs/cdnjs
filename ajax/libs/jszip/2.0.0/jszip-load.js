/**

JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2011 David Duponchel <d.duponchel@gmail.com>
Dual licenced under the MIT license or GPLv3. See LICENSE.markdown.

**/
/*global JSZip */
(function (root) {
  "use strict";

   var JSZip = root.JSZip;

   var MAX_VALUE_16BITS = 65535;
   var MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

   /**
    * Prettify a string read as binary.
    * @param {string} str the string to prettify.
    * @return {string} a pretty string.
    */
   var pretty = function (str) {
      var res = '', code, i;
      for (i = 0; i < (str||"").length; i++) {
         code = str.charCodeAt(i);
         res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
      }
      return res;
   };

   /**
    * Find a compression registered in JSZip.
    * @param {string} compressionMethod the method magic to find.
    * @return {Object|null} the JSZip compression object, null if none found.
    */
   var findCompression = function (compressionMethod) {
      for (var method in JSZip.compressions) {
         if( !JSZip.compressions.hasOwnProperty(method) ) { continue; }
         if (JSZip.compressions[method].magic === compressionMethod) {
            return JSZip.compressions[method];
         }
      }
      return null;
   };

   // class DataReader {{{
   /**
    * Read bytes from a source.
    * Developer tip : when debugging, a watch on pretty(this.reader.data.slice(this.reader.index))
    * is very useful :)
    * @constructor
    * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
    */
   function DataReader(data) {
      this.data = null; // type : see implementation
      this.length = 0;
      this.index = 0;
   }
   DataReader.prototype = {
      /**
       * Check that the offset will not go too far.
       * @param {string} offset the additional offset to check.
       * @throws {Error} an Error if the offset is out of bounds.
       */
      checkOffset : function (offset) {
         this.checkIndex(this.index + offset);
      },
      /**
       * Check that the specifed index will not be too far.
       * @param {string} newIndex the index to check.
       * @throws {Error} an Error if the index is out of bounds.
       */
      checkIndex : function (newIndex) {
         if (this.length < newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " +
                            this.length + ", asked index = " +
                            (newIndex) + "). Corrupted zip ?");
         }
      },
      /**
       * Change the index.
       * @param {number} newIndex The new index.
       * @throws {Error} if the new index is out of the data.
       */
      setIndex : function (newIndex) {
         this.checkIndex(newIndex);
         this.index = newIndex;
      },
      /**
       * Skip the next n bytes.
       * @param {number} n the number of bytes to skip.
       * @throws {Error} if the new index is out of the data.
       */
      skip : function (n) {
         this.setIndex(this.index + n);
      },
      /**
       * Get the byte at the specified index.
       * @param {number} i the index to use.
       * @return {number} a byte.
       */
      byteAt : function(i) {
         // see implementations
      },
      /**
       * Get the next number with a given byte size.
       * @param {number} size the number of bytes to read.
       * @return {number} the corresponding number.
       */
      readInt : function (size) {
         var result = 0, i;
         this.checkOffset(size);
         for(i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
         }
         this.index += size;
         return result;
      },
      /**
       * Get the next string with a given byte size.
       * @param {number} size the number of bytes to read.
       * @return {string} the corresponding string.
       */
      readString : function (size) {
         return JSZip.utils.transformTo("string", this.readData(size));
      },
      /**
       * Get raw data without conversion, <size> bytes.
       * @param {number} size the number of bytes to read.
       * @return {Object} the raw data, implementation specific.
       */
      readData : function (size) {
         // see implementations
      },
      /**
       * Find the last occurence of a zip signature (4 bytes).
       * @param {string} sig the signature to find.
       * @return {number} the index of the last occurence, -1 if not found.
       */
      lastIndexOfSignature : function (sig) {
         // see implementations
      },
      /**
       * Get the next date.
       * @return {Date} the date.
       */
      readDate : function () {
         var dostime = this.readInt(4);
         return new Date(
            ((dostime >> 25) & 0x7f) + 1980, // year
            ((dostime >> 21) & 0x0f) - 1, // month
            (dostime >> 16) & 0x1f, // day
            (dostime >> 11) & 0x1f, // hour
            (dostime >> 5) & 0x3f, // minute
            (dostime & 0x1f) << 1); // second
      }
   };


   /**
    * Read bytes from a string.
    * @constructor
    * @param {String} data the data to read.
    */
   function StringReader(data, optimizedBinaryString) {
      this.data = data;
      if (!optimizedBinaryString) {
         this.data = JSZip.utils.string2binary(this.data);
      }
      this.length = this.data.length;
      this.index = 0;
   }
   StringReader.prototype = new DataReader();
   /**
    * @see DataReader.byteAt
    */
   StringReader.prototype.byteAt = function(i) {
      return this.data.charCodeAt(i);
   };
   /**
    * @see DataReader.lastIndexOfSignature
    */
   StringReader.prototype.lastIndexOfSignature = function (sig) {
      return this.data.lastIndexOf(sig);
   };
   /**
    * @see DataReader.readData
    */
   StringReader.prototype.readData = function (size) {
      this.checkOffset(size);
      // this will work because the constructor applied the "& 0xff" mask.
      var result = this.data.slice(this.index, this.index + size);
      this.index += size;
      return result;
   };


   /**
    * Read bytes from an Uin8Array.
    * @constructor
    * @param {Uint8Array} data the data to read.
    */
   function Uint8ArrayReader(data) {
      if (data) {
         this.data = data;
         this.length = this.data.length;
         this.index = 0;
      }
   }
   Uint8ArrayReader.prototype = new DataReader();
   /**
    * @see DataReader.byteAt
    */
   Uint8ArrayReader.prototype.byteAt = function(i) {
      return this.data[i];
   };
   /**
    * @see DataReader.lastIndexOfSignature
    */
   Uint8ArrayReader.prototype.lastIndexOfSignature = function (sig) {
      var sig0 = sig.charCodeAt(0),
      sig1 = sig.charCodeAt(1),
      sig2 = sig.charCodeAt(2),
      sig3 = sig.charCodeAt(3);
      for(var i = this.length - 4;i >= 0;--i) {
         if (this.data[i] === sig0 && this.data[i+1] === sig1 && this.data[i+2] === sig2 && this.data[i+3] === sig3) {
            return i;
         }
      }

      return -1;
   };
   /**
    * @see DataReader.readData
    */
   Uint8ArrayReader.prototype.readData = function (size) {
      this.checkOffset(size);
      var result = this.data.subarray(this.index, this.index + size);
      this.index += size;
      return result;
   };

   /**
    * Read bytes from a Buffer.
    * @constructor
    * @param {Buffer} data the data to read.
    */
   function NodeBufferReader(data) {
      this.data = data;
      this.length = this.data.length;
      this.index = 0;
   }
   NodeBufferReader.prototype = new Uint8ArrayReader();

   /**
    * @see DataReader.readData
    */
   NodeBufferReader.prototype.readData = function (size) {
      this.checkOffset(size);
      var result = this.data.slice(this.index, this.index + size);
      this.index += size;
      return result;
   };
   // }}} end of DataReader

   // class ZipEntry {{{
   /**
    * An entry in the zip file.
    * @constructor
    * @param {Object} options Options of the current file.
    * @param {Object} loadOptions Options for loading the data.
    */
   function ZipEntry(options, loadOptions) {
      this.options = options;
      this.loadOptions = loadOptions;
   }
   ZipEntry.prototype = {
      /**
       * say if the file is encrypted.
       * @return {boolean} true if the file is encrypted, false otherwise.
       */
      isEncrypted : function () {
         // bit 1 is set
         return (this.bitFlag & 0x0001) === 0x0001;
      },
      /**
       * say if the file has utf-8 filename/comment.
       * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
       */
      useUTF8 : function () {
         // bit 11 is set
         return (this.bitFlag & 0x0800) === 0x0800;
      },
      /**
       * Prepare the function used to generate the compressed content from this ZipFile.
       * @param {DataReader} reader the reader to use.
       * @param {number} from the offset from where we should read the data.
       * @param {number} length the length of the data to read.
       * @return {Function} the callback to get the compressed content (the type depends of the DataReader class).
       */
      prepareCompressedContent : function (reader, from, length) {
         return function () {
            var previousIndex = reader.index;
            reader.setIndex(from);
            var compressedFileData = reader.readData(length);
            reader.setIndex(previousIndex);

            return compressedFileData;
         };
      },
      /**
       * Prepare the function used to generate the uncompressed content from this ZipFile.
       * @param {DataReader} reader the reader to use.
       * @param {number} from the offset from where we should read the data.
       * @param {number} length the length of the data to read.
       * @param {JSZip.compression} compression the compression used on this file.
       * @param {number} uncompressedSize the uncompressed size to expect.
       * @return {Function} the callback to get the uncompressed content (the type depends of the DataReader class).
       */
      prepareContent : function (reader, from, length, compression, uncompressedSize) {
         return function () {

            var compressedFileData = JSZip.utils.transformTo(compression.uncompressInputType, this.getCompressedContent());
            var uncompressedFileData = compression.uncompress(compressedFileData);

            if (uncompressedFileData.length !== uncompressedSize) {
               throw new Error("Bug : uncompressed data size mismatch");
            }

            return uncompressedFileData;
         };
      },
      /**
       * Read the local part of a zip file and add the info in this object.
       * @param {DataReader} reader the reader to use.
       */
      readLocalPart : function(reader) {
         var compression, localExtraFieldsLength;

         // we already know everything from the central dir !
         // If the central dir data are false, we are doomed.
         // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
         // The less data we get here, the more reliable this should be.
         // Let's skip the whole header and dash to the data !
         reader.skip(22);
         // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
         // Strangely, the filename here is OK.
         // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
         // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
         // Search "unzip mismatching "local" filename continuing with "central" filename version" on
         // the internet.
         //
         // I think I see the logic here : the central directory is used to display
         // content and the local directory is used to extract the files. Mixing / and \
         // may be used to display \ to windows users and use / when extracting the files.
         // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
         this.fileNameLength = reader.readInt(2);
         localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
         this.fileName = reader.readString(this.fileNameLength);
         reader.skip(localExtraFieldsLength);

         if (this.compressedSize == -1 || this.uncompressedSize == -1) {
            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " +
                            "(compressedSize == -1 || uncompressedSize == -1)");
         }

         compression = findCompression(this.compressionMethod);
         if (compression === null) { // no compression found
            throw new Error("Corrupted zip : compression " + pretty(this.compressionMethod) +
                            " unknown (inner file : " + this.fileName + ")");
         }
         this.decompressed = new JSZip.CompressedObject();
         this.decompressed.compressedSize = this.compressedSize;
         this.decompressed.uncompressedSize = this.uncompressedSize;
         this.decompressed.crc32 = this.crc32;
         this.decompressed.compressionMethod = this.compressionMethod;
         this.decompressed.getCompressedContent = this.prepareCompressedContent(reader, reader.index, this.compressedSize, compression);
         this.decompressed.getContent = this.prepareContent(reader, reader.index, this.compressedSize, compression, this.uncompressedSize);

         // we need to compute the crc32...
         if (this.loadOptions.checkCRC32) {
            this.decompressed = JSZip.utils.transformTo("string", this.decompressed.getContent());
            if (JSZip.prototype.crc32(this.decompressed) !== this.crc32) {
               throw new Error("Corrupted zip : CRC32 mismatch");
            }
         }
      },

      /**
       * Read the central part of a zip file and add the info in this object.
       * @param {DataReader} reader the reader to use.
       */
      readCentralPart : function(reader) {
         this.versionMadeBy          = reader.readString(2);
         this.versionNeeded          = reader.readInt(2);
         this.bitFlag                = reader.readInt(2);
         this.compressionMethod      = reader.readString(2);
         this.date                   = reader.readDate();
         this.crc32                  = reader.readInt(4);
         this.compressedSize         = reader.readInt(4);
         this.uncompressedSize       = reader.readInt(4);
         this.fileNameLength         = reader.readInt(2);
         this.extraFieldsLength      = reader.readInt(2);
         this.fileCommentLength      = reader.readInt(2);
         this.diskNumberStart        = reader.readInt(2);
         this.internalFileAttributes = reader.readInt(2);
         this.externalFileAttributes = reader.readInt(4);
         this.localHeaderOffset      = reader.readInt(4);

         if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
         }

         this.fileName = reader.readString(this.fileNameLength);
         this.readExtraFields(reader);
         this.parseZIP64ExtraField(reader);
         this.fileComment = reader.readString(this.fileCommentLength);

         // warning, this is true only for zip with madeBy == DOS (plateform dependent feature)
         this.dir = this.externalFileAttributes & 0x00000010 ? true : false;
      },
      /**
       * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
       * @param {DataReader} reader the reader to use.
       */
      parseZIP64ExtraField : function(reader) {

         if(!this.extraFields[0x0001]) {
            return;
         }

         // should be something, preparing the extra reader
         var extraReader = new StringReader(this.extraFields[0x0001].value);

         // I really hope that these 64bits integer can fit in 32 bits integer, because js
         // won't let us have more.
         if(this.uncompressedSize === MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
         }
         if(this.compressedSize === MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
         }
         if(this.localHeaderOffset === MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
         }
         if(this.diskNumberStart === MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
         }
      },
      /**
       * Read the central part of a zip file and add the info in this object.
       * @param {DataReader} reader the reader to use.
       */
      readExtraFields : function(reader) {
         var start = reader.index,
             extraFieldId,
             extraFieldLength,
             extraFieldValue;

         this.extraFields = this.extraFields || {};

         while (reader.index < start + this.extraFieldsLength) {
            extraFieldId     = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue  = reader.readString(extraFieldLength);

            this.extraFields[extraFieldId] = {
               id:     extraFieldId,
               length: extraFieldLength,
               value:  extraFieldValue
            };
         }
      },
      /**
       * Apply an UTF8 transformation if needed.
       */
      handleUTF8 : function() {
         if (this.useUTF8()) {
            this.fileName    = JSZip.prototype.utf8decode(this.fileName);
            this.fileComment = JSZip.prototype.utf8decode(this.fileComment);
         }
      }
   };
   // }}} end of ZipEntry

   //  class ZipEntries {{{
   /**
    * All the entries in the zip file.
    * @constructor
    * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary data to load.
    * @param {Object} loadOptions Options for loading the data.
    */
   function ZipEntries(data, loadOptions) {
      this.files = [];
      this.loadOptions = loadOptions;
      if (data) {
         this.load(data);
      }
   }
   ZipEntries.prototype = {
      /**
       * Check that the reader is on the speficied signature.
       * @param {string} expectedSignature the expected signature.
       * @throws {Error} if it is an other signature.
       */
      checkSignature : function(expectedSignature) {
         var signature = this.reader.readString(4);
         if (signature !== expectedSignature) {
            throw new Error("Corrupted zip or bug : unexpected signature " +
                            "(" + pretty(signature) + ", expected " + pretty(expectedSignature) + ")");
         }
      },
      /**
       * Read the end of the central directory.
       */
      readBlockEndOfCentral : function () {
         this.diskNumber                  = this.reader.readInt(2);
         this.diskWithCentralDirStart     = this.reader.readInt(2);
         this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
         this.centralDirRecords           = this.reader.readInt(2);
         this.centralDirSize              = this.reader.readInt(4);
         this.centralDirOffset            = this.reader.readInt(4);

         this.zipCommentLength            = this.reader.readInt(2);
         this.zipComment                  = this.reader.readString(this.zipCommentLength);
      },
      /**
       * Read the end of the Zip 64 central directory.
       * Not merged with the method readEndOfCentral :
       * The end of central can coexist with its Zip64 brother,
       * I don't want to read the wrong number of bytes !
       */
      readBlockZip64EndOfCentral : function () {
         this.zip64EndOfCentralSize       = this.reader.readInt(8);
         this.versionMadeBy               = this.reader.readString(2);
         this.versionNeeded               = this.reader.readInt(2);
         this.diskNumber                  = this.reader.readInt(4);
         this.diskWithCentralDirStart     = this.reader.readInt(4);
         this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
         this.centralDirRecords           = this.reader.readInt(8);
         this.centralDirSize              = this.reader.readInt(8);
         this.centralDirOffset            = this.reader.readInt(8);

         this.zip64ExtensibleData = {};
         var extraDataSize = this.zip64EndOfCentralSize - 44,
         index = 0,
         extraFieldId,
         extraFieldLength,
         extraFieldValue;
         while(index < extraDataSize) {
            extraFieldId     = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue  = this.reader.readString(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
               id:     extraFieldId,
               length: extraFieldLength,
               value:  extraFieldValue
            };
         }
      },
      /**
       * Read the end of the Zip 64 central directory locator.
       */
      readBlockZip64EndOfCentralLocator : function () {
         this.diskWithZip64CentralDirStart       = this.reader.readInt(4);
         this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
         this.disksCount                         = this.reader.readInt(4);
         if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
         }
      },
      /**
       * Read the local files, based on the offset read in the central part.
       */
      readLocalFiles : function() {
         var i, file;
         for(i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(JSZip.signature.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
         }
      },
      /**
       * Read the central directory.
       */
      readCentralDir : function() {
         var file;

         this.reader.setIndex(this.centralDirOffset);
         while(this.reader.readString(4) === JSZip.signature.CENTRAL_FILE_HEADER) {
            file = new ZipEntry({
               zip64: this.zip64
            }, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
         }
      },
      /**
       * Read the end of central directory.
       */
      readEndOfCentral : function() {
         var offset = this.reader.lastIndexOfSignature(JSZip.signature.CENTRAL_DIRECTORY_END);
         if (offset === -1) {
            throw new Error("Corrupted zip : can't find end of central directory");
         }
         this.reader.setIndex(offset);
         this.checkSignature(JSZip.signature.CENTRAL_DIRECTORY_END);
         this.readBlockEndOfCentral();


         /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
         if (this.diskNumber                 === MAX_VALUE_16BITS ||
            this.diskWithCentralDirStart     === MAX_VALUE_16BITS ||
            this.centralDirRecordsOnThisDisk === MAX_VALUE_16BITS ||
            this.centralDirRecords           === MAX_VALUE_16BITS ||
            this.centralDirSize              === MAX_VALUE_32BITS ||
            this.centralDirOffset            === MAX_VALUE_32BITS
         ) {
            this.zip64 = true;

            /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : Javascript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

            // should look for a zip64 EOCD locator
            offset = this.reader.lastIndexOfSignature(JSZip.signature.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset === -1) {
               throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(JSZip.signature.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();

            // now the zip64 EOCD record
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(JSZip.signature.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
         }
      },
      prepareReader : function (data) {
         var type = JSZip.utils.getTypeOf(data);
         if (type === "string" && !JSZip.support.uint8array) {
            this.reader = new StringReader(data, this.loadOptions.optimizedBinaryString);
         } else if (type === "nodebuffer") {
            this.reader = new NodeBufferReader(data);
         } else {
            this.reader = new Uint8ArrayReader(JSZip.utils.transformTo("uint8array", data));
         }
      },
      /**
       * Read a zip file and create ZipEntries.
       * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
       */
      load : function(data) {
         this.prepareReader(data);
         this.readEndOfCentral();
         this.readCentralDir();
         this.readLocalFiles();
      }
   };
   // }}} end of ZipEntries

   /**
    * Implementation of the load method of JSZip.
    * It uses the above classes to decode a zip file, and load every files.
    * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to load.
    * @param {Object} options Options for loading the data.
    *  options.base64 : is the data in base64 ? default : false
    */
   JSZip.prototype.load = function(data, options) {
      var files, zipEntries, i, input;
      options = options || {};
      if(options.base64) {
         data = JSZip.base64.decode(data);
      }

      zipEntries = new ZipEntries(data, options);
      files = zipEntries.files;
      for (i = 0; i < files.length; i++) {
         input = files[i];
         this.file(input.fileName, input.decompressed, {
            binary:true,
            optimizedBinaryString:true,
            date:input.date,
            dir:input.dir
         });
      }

      return this;
   };

}(this));
// enforcing Stuk's coding style
// vim: set shiftwidth=3 softtabstop=3 foldmethod=marker:
