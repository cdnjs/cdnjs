// Fine Uploader 5.13.0 - (c) 2013-present Widen Enterprises, Inc. MIT licensed. http://fineuploader.com
(function(global) {
    var qq = function(element) {
        "use strict";
        return {
            hide: function() {
                element.style.display = "none";
                return this;
            },
            attach: function(type, fn) {
                if (element.addEventListener) {
                    element.addEventListener(type, fn, false);
                } else if (element.attachEvent) {
                    element.attachEvent("on" + type, fn);
                }
                return function() {
                    qq(element).detach(type, fn);
                };
            },
            detach: function(type, fn) {
                if (element.removeEventListener) {
                    element.removeEventListener(type, fn, false);
                } else if (element.attachEvent) {
                    element.detachEvent("on" + type, fn);
                }
                return this;
            },
            contains: function(descendant) {
                if (!descendant) {
                    return false;
                }
                if (element === descendant) {
                    return true;
                }
                if (element.contains) {
                    return element.contains(descendant);
                } else {
                    return !!(descendant.compareDocumentPosition(element) & 8);
                }
            },
            insertBefore: function(elementB) {
                elementB.parentNode.insertBefore(element, elementB);
                return this;
            },
            remove: function() {
                element.parentNode.removeChild(element);
                return this;
            },
            css: function(styles) {
                if (element.style == null) {
                    throw new qq.Error("Can't apply style to node as it is not on the HTMLElement prototype chain!");
                }
                if (styles.opacity != null) {
                    if (typeof element.style.opacity !== "string" && typeof element.filters !== "undefined") {
                        styles.filter = "alpha(opacity=" + Math.round(100 * styles.opacity) + ")";
                    }
                }
                qq.extend(element.style, styles);
                return this;
            },
            hasClass: function(name, considerParent) {
                var re = new RegExp("(^| )" + name + "( |$)");
                return re.test(element.className) || !!(considerParent && re.test(element.parentNode.className));
            },
            addClass: function(name) {
                if (!qq(element).hasClass(name)) {
                    element.className += " " + name;
                }
                return this;
            },
            removeClass: function(name) {
                var re = new RegExp("(^| )" + name + "( |$)");
                element.className = element.className.replace(re, " ").replace(/^\s+|\s+$/g, "");
                return this;
            },
            getByClass: function(className, first) {
                var candidates, result = [];
                if (first && element.querySelector) {
                    return element.querySelector("." + className);
                } else if (element.querySelectorAll) {
                    return element.querySelectorAll("." + className);
                }
                candidates = element.getElementsByTagName("*");
                qq.each(candidates, function(idx, val) {
                    if (qq(val).hasClass(className)) {
                        result.push(val);
                    }
                });
                return first ? result[0] : result;
            },
            getFirstByClass: function(className) {
                return qq(element).getByClass(className, true);
            },
            children: function() {
                var children = [], child = element.firstChild;
                while (child) {
                    if (child.nodeType === 1) {
                        children.push(child);
                    }
                    child = child.nextSibling;
                }
                return children;
            },
            setText: function(text) {
                element.innerText = text;
                element.textContent = text;
                return this;
            },
            clearText: function() {
                return qq(element).setText("");
            },
            hasAttribute: function(attrName) {
                var attrVal;
                if (element.hasAttribute) {
                    if (!element.hasAttribute(attrName)) {
                        return false;
                    }
                    return /^false$/i.exec(element.getAttribute(attrName)) == null;
                } else {
                    attrVal = element[attrName];
                    if (attrVal === undefined) {
                        return false;
                    }
                    return /^false$/i.exec(attrVal) == null;
                }
            }
        };
    };
    (function() {
        "use strict";
        qq.canvasToBlob = function(canvas, mime, quality) {
            return qq.dataUriToBlob(canvas.toDataURL(mime, quality));
        };
        qq.dataUriToBlob = function(dataUri) {
            var arrayBuffer, byteString, createBlob = function(data, mime) {
                var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, blobBuilder = BlobBuilder && new BlobBuilder();
                if (blobBuilder) {
                    blobBuilder.append(data);
                    return blobBuilder.getBlob(mime);
                } else {
                    return new Blob([ data ], {
                        type: mime
                    });
                }
            }, intArray, mimeString;
            if (dataUri.split(",")[0].indexOf("base64") >= 0) {
                byteString = atob(dataUri.split(",")[1]);
            } else {
                byteString = decodeURI(dataUri.split(",")[1]);
            }
            mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
            arrayBuffer = new ArrayBuffer(byteString.length);
            intArray = new Uint8Array(arrayBuffer);
            qq.each(byteString, function(idx, character) {
                intArray[idx] = character.charCodeAt(0);
            });
            return createBlob(arrayBuffer, mimeString);
        };
        qq.log = function(message, level) {
            if (window.console) {
                if (!level || level === "info") {
                    window.console.log(message);
                } else {
                    if (window.console[level]) {
                        window.console[level](message);
                    } else {
                        window.console.log("<" + level + "> " + message);
                    }
                }
            }
        };
        qq.isObject = function(variable) {
            return variable && !variable.nodeType && Object.prototype.toString.call(variable) === "[object Object]";
        };
        qq.isFunction = function(variable) {
            return typeof variable === "function";
        };
        qq.isArray = function(value) {
            return Object.prototype.toString.call(value) === "[object Array]" || value && window.ArrayBuffer && value.buffer && value.buffer.constructor === ArrayBuffer;
        };
        qq.isItemList = function(maybeItemList) {
            return Object.prototype.toString.call(maybeItemList) === "[object DataTransferItemList]";
        };
        qq.isNodeList = function(maybeNodeList) {
            return Object.prototype.toString.call(maybeNodeList) === "[object NodeList]" || maybeNodeList.item && maybeNodeList.namedItem;
        };
        qq.isString = function(maybeString) {
            return Object.prototype.toString.call(maybeString) === "[object String]";
        };
        qq.trimStr = function(string) {
            if (String.prototype.trim) {
                return string.trim();
            }
            return string.replace(/^\s+|\s+$/g, "");
        };
        qq.format = function(str) {
            var args = Array.prototype.slice.call(arguments, 1), newStr = str, nextIdxToReplace = newStr.indexOf("{}");
            qq.each(args, function(idx, val) {
                var strBefore = newStr.substring(0, nextIdxToReplace), strAfter = newStr.substring(nextIdxToReplace + 2);
                newStr = strBefore + val + strAfter;
                nextIdxToReplace = newStr.indexOf("{}", nextIdxToReplace + val.length);
                if (nextIdxToReplace < 0) {
                    return false;
                }
            });
            return newStr;
        };
        qq.isFile = function(maybeFile) {
            return window.File && Object.prototype.toString.call(maybeFile) === "[object File]";
        };
        qq.isFileList = function(maybeFileList) {
            return window.FileList && Object.prototype.toString.call(maybeFileList) === "[object FileList]";
        };
        qq.isFileOrInput = function(maybeFileOrInput) {
            return qq.isFile(maybeFileOrInput) || qq.isInput(maybeFileOrInput);
        };
        qq.isInput = function(maybeInput, notFile) {
            var evaluateType = function(type) {
                var normalizedType = type.toLowerCase();
                if (notFile) {
                    return normalizedType !== "file";
                }
                return normalizedType === "file";
            };
            if (window.HTMLInputElement) {
                if (Object.prototype.toString.call(maybeInput) === "[object HTMLInputElement]") {
                    if (maybeInput.type && evaluateType(maybeInput.type)) {
                        return true;
                    }
                }
            }
            if (maybeInput.tagName) {
                if (maybeInput.tagName.toLowerCase() === "input") {
                    if (maybeInput.type && evaluateType(maybeInput.type)) {
                        return true;
                    }
                }
            }
            return false;
        };
        qq.isBlob = function(maybeBlob) {
            if (window.Blob && Object.prototype.toString.call(maybeBlob) === "[object Blob]") {
                return true;
            }
        };
        qq.isXhrUploadSupported = function() {
            var input = document.createElement("input");
            input.type = "file";
            return input.multiple !== undefined && typeof File !== "undefined" && typeof FormData !== "undefined" && typeof qq.createXhrInstance().upload !== "undefined";
        };
        qq.createXhrInstance = function() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
            try {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            } catch (error) {
                qq.log("Neither XHR or ActiveX are supported!", "error");
                return null;
            }
        };
        qq.isFolderDropSupported = function(dataTransfer) {
            return dataTransfer.items && dataTransfer.items.length > 0 && dataTransfer.items[0].webkitGetAsEntry;
        };
        qq.isFileChunkingSupported = function() {
            return !qq.androidStock() && qq.isXhrUploadSupported() && (File.prototype.slice !== undefined || File.prototype.webkitSlice !== undefined || File.prototype.mozSlice !== undefined);
        };
        qq.sliceBlob = function(fileOrBlob, start, end) {
            var slicer = fileOrBlob.slice || fileOrBlob.mozSlice || fileOrBlob.webkitSlice;
            return slicer.call(fileOrBlob, start, end);
        };
        qq.arrayBufferToHex = function(buffer) {
            var bytesAsHex = "", bytes = new Uint8Array(buffer);
            qq.each(bytes, function(idx, byt) {
                var byteAsHexStr = byt.toString(16);
                if (byteAsHexStr.length < 2) {
                    byteAsHexStr = "0" + byteAsHexStr;
                }
                bytesAsHex += byteAsHexStr;
            });
            return bytesAsHex;
        };
        qq.readBlobToHex = function(blob, startOffset, length) {
            var initialBlob = qq.sliceBlob(blob, startOffset, startOffset + length), fileReader = new FileReader(), promise = new qq.Promise();
            fileReader.onload = function() {
                promise.success(qq.arrayBufferToHex(fileReader.result));
            };
            fileReader.onerror = promise.failure;
            fileReader.readAsArrayBuffer(initialBlob);
            return promise;
        };
        qq.extend = function(first, second, extendNested) {
            qq.each(second, function(prop, val) {
                if (extendNested && qq.isObject(val)) {
                    if (first[prop] === undefined) {
                        first[prop] = {};
                    }
                    qq.extend(first[prop], val, true);
                } else {
                    first[prop] = val;
                }
            });
            return first;
        };
        qq.override = function(target, sourceFn) {
            var super_ = {}, source = sourceFn(super_);
            qq.each(source, function(srcPropName, srcPropVal) {
                if (target[srcPropName] !== undefined) {
                    super_[srcPropName] = target[srcPropName];
                }
                target[srcPropName] = srcPropVal;
            });
            return target;
        };
        qq.indexOf = function(arr, elt, from) {
            if (arr.indexOf) {
                return arr.indexOf(elt, from);
            }
            from = from || 0;
            var len = arr.length;
            if (from < 0) {
                from += len;
            }
            for (;from < len; from += 1) {
                if (arr.hasOwnProperty(from) && arr[from] === elt) {
                    return from;
                }
            }
            return -1;
        };
        qq.getUniqueId = function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
                return v.toString(16);
            });
        };
        qq.ie = function() {
            return navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.indexOf("Trident") !== -1;
        };
        qq.ie7 = function() {
            return navigator.userAgent.indexOf("MSIE 7") !== -1;
        };
        qq.ie8 = function() {
            return navigator.userAgent.indexOf("MSIE 8") !== -1;
        };
        qq.ie10 = function() {
            return navigator.userAgent.indexOf("MSIE 10") !== -1;
        };
        qq.ie11 = function() {
            return qq.ie() && navigator.userAgent.indexOf("rv:11") !== -1;
        };
        qq.edge = function() {
            return navigator.userAgent.indexOf("Edge") >= 0;
        };
        qq.safari = function() {
            return navigator.vendor !== undefined && navigator.vendor.indexOf("Apple") !== -1;
        };
        qq.chrome = function() {
            return navigator.vendor !== undefined && navigator.vendor.indexOf("Google") !== -1;
        };
        qq.opera = function() {
            return navigator.vendor !== undefined && navigator.vendor.indexOf("Opera") !== -1;
        };
        qq.firefox = function() {
            return !qq.edge() && !qq.ie11() && navigator.userAgent.indexOf("Mozilla") !== -1 && navigator.vendor !== undefined && navigator.vendor === "";
        };
        qq.windows = function() {
            return navigator.platform === "Win32";
        };
        qq.android = function() {
            return navigator.userAgent.toLowerCase().indexOf("android") !== -1;
        };
        qq.androidStock = function() {
            return qq.android() && navigator.userAgent.toLowerCase().indexOf("chrome") < 0;
        };
        qq.ios6 = function() {
            return qq.ios() && navigator.userAgent.indexOf(" OS 6_") !== -1;
        };
        qq.ios7 = function() {
            return qq.ios() && navigator.userAgent.indexOf(" OS 7_") !== -1;
        };
        qq.ios8 = function() {
            return qq.ios() && navigator.userAgent.indexOf(" OS 8_") !== -1;
        };
        qq.ios800 = function() {
            return qq.ios() && navigator.userAgent.indexOf(" OS 8_0 ") !== -1;
        };
        qq.ios = function() {
            return navigator.userAgent.indexOf("iPad") !== -1 || navigator.userAgent.indexOf("iPod") !== -1 || navigator.userAgent.indexOf("iPhone") !== -1;
        };
        qq.iosChrome = function() {
            return qq.ios() && navigator.userAgent.indexOf("CriOS") !== -1;
        };
        qq.iosSafari = function() {
            return qq.ios() && !qq.iosChrome() && navigator.userAgent.indexOf("Safari") !== -1;
        };
        qq.iosSafariWebView = function() {
            return qq.ios() && !qq.iosChrome() && !qq.iosSafari();
        };
        qq.preventDefault = function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        };
        qq.toElement = function() {
            var div = document.createElement("div");
            return function(html) {
                div.innerHTML = html;
                var element = div.firstChild;
                div.removeChild(element);
                return element;
            };
        }();
        qq.each = function(iterableItem, callback) {
            var keyOrIndex, retVal;
            if (iterableItem) {
                if (window.Storage && iterableItem.constructor === window.Storage) {
                    for (keyOrIndex = 0; keyOrIndex < iterableItem.length; keyOrIndex++) {
                        retVal = callback(iterableItem.key(keyOrIndex), iterableItem.getItem(iterableItem.key(keyOrIndex)));
                        if (retVal === false) {
                            break;
                        }
                    }
                } else if (qq.isArray(iterableItem) || qq.isItemList(iterableItem) || qq.isNodeList(iterableItem)) {
                    for (keyOrIndex = 0; keyOrIndex < iterableItem.length; keyOrIndex++) {
                        retVal = callback(keyOrIndex, iterableItem[keyOrIndex]);
                        if (retVal === false) {
                            break;
                        }
                    }
                } else if (qq.isString(iterableItem)) {
                    for (keyOrIndex = 0; keyOrIndex < iterableItem.length; keyOrIndex++) {
                        retVal = callback(keyOrIndex, iterableItem.charAt(keyOrIndex));
                        if (retVal === false) {
                            break;
                        }
                    }
                } else {
                    for (keyOrIndex in iterableItem) {
                        if (Object.prototype.hasOwnProperty.call(iterableItem, keyOrIndex)) {
                            retVal = callback(keyOrIndex, iterableItem[keyOrIndex]);
                            if (retVal === false) {
                                break;
                            }
                        }
                    }
                }
            }
        };
        qq.bind = function(oldFunc, context) {
            if (qq.isFunction(oldFunc)) {
                var args = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var newArgs = qq.extend([], args);
                    if (arguments.length) {
                        newArgs = newArgs.concat(Array.prototype.slice.call(arguments));
                    }
                    return oldFunc.apply(context, newArgs);
                };
            }
            throw new Error("first parameter must be a function!");
        };
        qq.obj2url = function(obj, temp, prefixDone) {
            var uristrings = [], prefix = "&", add = function(nextObj, i) {
                var nextTemp = temp ? /\[\]$/.test(temp) ? temp : temp + "[" + i + "]" : i;
                if (nextTemp !== "undefined" && i !== "undefined") {
                    uristrings.push(typeof nextObj === "object" ? qq.obj2url(nextObj, nextTemp, true) : Object.prototype.toString.call(nextObj) === "[object Function]" ? encodeURIComponent(nextTemp) + "=" + encodeURIComponent(nextObj()) : encodeURIComponent(nextTemp) + "=" + encodeURIComponent(nextObj));
                }
            };
            if (!prefixDone && temp) {
                prefix = /\?/.test(temp) ? /\?$/.test(temp) ? "" : "&" : "?";
                uristrings.push(temp);
                uristrings.push(qq.obj2url(obj));
            } else if (Object.prototype.toString.call(obj) === "[object Array]" && typeof obj !== "undefined") {
                qq.each(obj, function(idx, val) {
                    add(val, idx);
                });
            } else if (typeof obj !== "undefined" && obj !== null && typeof obj === "object") {
                qq.each(obj, function(prop, val) {
                    add(val, prop);
                });
            } else {
                uristrings.push(encodeURIComponent(temp) + "=" + encodeURIComponent(obj));
            }
            if (temp) {
                return uristrings.join(prefix);
            } else {
                return uristrings.join(prefix).replace(/^&/, "").replace(/%20/g, "+");
            }
        };
        qq.obj2FormData = function(obj, formData, arrayKeyName) {
            if (!formData) {
                formData = new FormData();
            }
            qq.each(obj, function(key, val) {
                key = arrayKeyName ? arrayKeyName + "[" + key + "]" : key;
                if (qq.isObject(val)) {
                    qq.obj2FormData(val, formData, key);
                } else if (qq.isFunction(val)) {
                    formData.append(key, val());
                } else {
                    formData.append(key, val);
                }
            });
            return formData;
        };
        qq.obj2Inputs = function(obj, form) {
            var input;
            if (!form) {
                form = document.createElement("form");
            }
            qq.obj2FormData(obj, {
                append: function(key, val) {
                    input = document.createElement("input");
                    input.setAttribute("name", key);
                    input.setAttribute("value", val);
                    form.appendChild(input);
                }
            });
            return form;
        };
        qq.parseJson = function(json) {
            if (window.JSON && qq.isFunction(JSON.parse)) {
                return JSON.parse(json);
            } else {
                return eval("(" + json + ")");
            }
        };
        qq.getExtension = function(filename) {
            var extIdx = filename.lastIndexOf(".") + 1;
            if (extIdx > 0) {
                return filename.substr(extIdx, filename.length - extIdx);
            }
        };
        qq.getFilename = function(blobOrFileInput) {
            if (qq.isInput(blobOrFileInput)) {
                return blobOrFileInput.value.replace(/.*(\/|\\)/, "");
            } else if (qq.isFile(blobOrFileInput)) {
                if (blobOrFileInput.fileName !== null && blobOrFileInput.fileName !== undefined) {
                    return blobOrFileInput.fileName;
                }
            }
            return blobOrFileInput.name;
        };
        qq.DisposeSupport = function() {
            var disposers = [];
            return {
                dispose: function() {
                    var disposer;
                    do {
                        disposer = disposers.shift();
                        if (disposer) {
                            disposer();
                        }
                    } while (disposer);
                },
                attach: function() {
                    var args = arguments;
                    this.addDisposer(qq(args[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)));
                },
                addDisposer: function(disposeFunction) {
                    disposers.push(disposeFunction);
                }
            };
        };
    })();
    (function() {
        "use strict";
        if (typeof define === "function" && define.amd) {
            define(function() {
                return qq;
            });
        } else if (typeof module !== "undefined" && module.exports) {
            module.exports = qq;
        } else {
            global.qq = qq;
        }
    })();
    (function() {
        "use strict";
        qq.Error = function(message) {
            this.message = "[Fine Uploader " + qq.version + "] " + message;
        };
        qq.Error.prototype = new Error();
    })();
    qq.version = "5.13.0";
    qq.supportedFeatures = function() {
        "use strict";
        var supportsUploading, supportsUploadingBlobs, supportsFileDrop, supportsAjaxFileUploading, supportsFolderDrop, supportsChunking, supportsResume, supportsUploadViaPaste, supportsUploadCors, supportsDeleteFileXdr, supportsDeleteFileCorsXhr, supportsDeleteFileCors, supportsFolderSelection, supportsImagePreviews, supportsUploadProgress;
        function testSupportsFileInputElement() {
            var supported = true, tempInput;
            try {
                tempInput = document.createElement("input");
                tempInput.type = "file";
                qq(tempInput).hide();
                if (tempInput.disabled) {
                    supported = false;
                }
            } catch (ex) {
                supported = false;
            }
            return supported;
        }
        function isChrome21OrHigher() {
            return (qq.chrome() || qq.opera()) && navigator.userAgent.match(/Chrome\/[2][1-9]|Chrome\/[3-9][0-9]/) !== undefined;
        }
        function isChrome14OrHigher() {
            return (qq.chrome() || qq.opera()) && navigator.userAgent.match(/Chrome\/[1][4-9]|Chrome\/[2-9][0-9]/) !== undefined;
        }
        function isCrossOriginXhrSupported() {
            if (window.XMLHttpRequest) {
                var xhr = qq.createXhrInstance();
                return xhr.withCredentials !== undefined;
            }
            return false;
        }
        function isXdrSupported() {
            return window.XDomainRequest !== undefined;
        }
        function isCrossOriginAjaxSupported() {
            if (isCrossOriginXhrSupported()) {
                return true;
            }
            return isXdrSupported();
        }
        function isFolderSelectionSupported() {
            return document.createElement("input").webkitdirectory !== undefined;
        }
        function isLocalStorageSupported() {
            try {
                return !!window.localStorage && qq.isFunction(window.localStorage.setItem);
            } catch (error) {
                return false;
            }
        }
        function isDragAndDropSupported() {
            var span = document.createElement("span");
            return ("draggable" in span || "ondragstart" in span && "ondrop" in span) && !qq.android() && !qq.ios();
        }
        supportsUploading = testSupportsFileInputElement();
        supportsAjaxFileUploading = supportsUploading && qq.isXhrUploadSupported();
        supportsUploadingBlobs = supportsAjaxFileUploading && !qq.androidStock();
        supportsFileDrop = supportsAjaxFileUploading && isDragAndDropSupported();
        supportsFolderDrop = supportsFileDrop && isChrome21OrHigher();
        supportsChunking = supportsAjaxFileUploading && qq.isFileChunkingSupported();
        supportsResume = supportsAjaxFileUploading && supportsChunking && isLocalStorageSupported();
        supportsUploadViaPaste = supportsAjaxFileUploading && isChrome14OrHigher();
        supportsUploadCors = supportsUploading && (window.postMessage !== undefined || supportsAjaxFileUploading);
        supportsDeleteFileCorsXhr = isCrossOriginXhrSupported();
        supportsDeleteFileXdr = isXdrSupported();
        supportsDeleteFileCors = isCrossOriginAjaxSupported();
        supportsFolderSelection = isFolderSelectionSupported();
        supportsImagePreviews = supportsAjaxFileUploading && window.FileReader !== undefined;
        supportsUploadProgress = function() {
            if (supportsAjaxFileUploading) {
                return !qq.androidStock() && !qq.iosChrome();
            }
            return false;
        }();
        return {
            ajaxUploading: supportsAjaxFileUploading,
            blobUploading: supportsUploadingBlobs,
            canDetermineSize: supportsAjaxFileUploading,
            chunking: supportsChunking,
            deleteFileCors: supportsDeleteFileCors,
            deleteFileCorsXdr: supportsDeleteFileXdr,
            deleteFileCorsXhr: supportsDeleteFileCorsXhr,
            dialogElement: !!window.HTMLDialogElement,
            fileDrop: supportsFileDrop,
            folderDrop: supportsFolderDrop,
            folderSelection: supportsFolderSelection,
            imagePreviews: supportsImagePreviews,
            imageValidation: supportsImagePreviews,
            itemSizeValidation: supportsAjaxFileUploading,
            pause: supportsChunking,
            progressBar: supportsUploadProgress,
            resume: supportsResume,
            scaling: supportsImagePreviews && supportsUploadingBlobs,
            tiffPreviews: qq.safari(),
            unlimitedScaledImageSize: !qq.ios(),
            uploading: supportsUploading,
            uploadCors: supportsUploadCors,
            uploadCustomHeaders: supportsAjaxFileUploading,
            uploadNonMultipart: supportsAjaxFileUploading,
            uploadViaPaste: supportsUploadViaPaste
        };
    }();
    qq.isGenericPromise = function(maybePromise) {
        "use strict";
        return !!(maybePromise && maybePromise.then && qq.isFunction(maybePromise.then));
    };
    qq.Promise = function() {
        "use strict";
        var successArgs, failureArgs, successCallbacks = [], failureCallbacks = [], doneCallbacks = [], state = 0;
        qq.extend(this, {
            then: function(onSuccess, onFailure) {
                if (state === 0) {
                    if (onSuccess) {
                        successCallbacks.push(onSuccess);
                    }
                    if (onFailure) {
                        failureCallbacks.push(onFailure);
                    }
                } else if (state === -1) {
                    onFailure && onFailure.apply(null, failureArgs);
                } else if (onSuccess) {
                    onSuccess.apply(null, successArgs);
                }
                return this;
            },
            done: function(callback) {
                if (state === 0) {
                    doneCallbacks.push(callback);
                } else {
                    callback.apply(null, failureArgs === undefined ? successArgs : failureArgs);
                }
                return this;
            },
            success: function() {
                state = 1;
                successArgs = arguments;
                if (successCallbacks.length) {
                    qq.each(successCallbacks, function(idx, callback) {
                        callback.apply(null, successArgs);
                    });
                }
                if (doneCallbacks.length) {
                    qq.each(doneCallbacks, function(idx, callback) {
                        callback.apply(null, successArgs);
                    });
                }
                return this;
            },
            failure: function() {
                state = -1;
                failureArgs = arguments;
                if (failureCallbacks.length) {
                    qq.each(failureCallbacks, function(idx, callback) {
                        callback.apply(null, failureArgs);
                    });
                }
                if (doneCallbacks.length) {
                    qq.each(doneCallbacks, function(idx, callback) {
                        callback.apply(null, failureArgs);
                    });
                }
                return this;
            }
        });
    };
    qq.BlobProxy = function(referenceBlob, onCreate) {
        "use strict";
        qq.extend(this, {
            referenceBlob: referenceBlob,
            create: function() {
                return onCreate(referenceBlob);
            }
        });
    };
    qq.UploadButton = function(o) {
        "use strict";
        var self = this, disposeSupport = new qq.DisposeSupport(), options = {
            acceptFiles: null,
            element: null,
            focusClass: "qq-upload-button-focus",
            folders: false,
            hoverClass: "qq-upload-button-hover",
            ios8BrowserCrashWorkaround: false,
            multiple: false,
            name: "qqfile",
            onChange: function(input) {},
            title: null
        }, input, buttonId;
        qq.extend(options, o);
        buttonId = qq.getUniqueId();
        function createInput() {
            var input = document.createElement("input");
            input.setAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME, buttonId);
            input.setAttribute("title", options.title);
            self.setMultiple(options.multiple, input);
            if (options.folders && qq.supportedFeatures.folderSelection) {
                input.setAttribute("webkitdirectory", "");
            }
            if (options.acceptFiles) {
                input.setAttribute("accept", options.acceptFiles);
            }
            input.setAttribute("type", "file");
            input.setAttribute("name", options.name);
            qq(input).css({
                position: "absolute",
                right: 0,
                top: 0,
                fontFamily: "Arial",
                fontSize: qq.ie() && !qq.ie8() ? "3500px" : "118px",
                margin: 0,
                padding: 0,
                cursor: "pointer",
                opacity: 0
            });
            !qq.ie7() && qq(input).css({
                height: "100%"
            });
            options.element.appendChild(input);
            disposeSupport.attach(input, "change", function() {
                options.onChange(input);
            });
            disposeSupport.attach(input, "mouseover", function() {
                qq(options.element).addClass(options.hoverClass);
            });
            disposeSupport.attach(input, "mouseout", function() {
                qq(options.element).removeClass(options.hoverClass);
            });
            disposeSupport.attach(input, "focus", function() {
                qq(options.element).addClass(options.focusClass);
            });
            disposeSupport.attach(input, "blur", function() {
                qq(options.element).removeClass(options.focusClass);
            });
            return input;
        }
        qq(options.element).css({
            position: "relative",
            overflow: "hidden",
            direction: "ltr"
        });
        qq.extend(this, {
            getInput: function() {
                return input;
            },
            getButtonId: function() {
                return buttonId;
            },
            setMultiple: function(isMultiple, optInput) {
                var input = optInput || this.getInput();
                if (options.ios8BrowserCrashWorkaround && qq.ios8() && (qq.iosChrome() || qq.iosSafariWebView())) {
                    input.setAttribute("multiple", "");
                } else {
                    if (isMultiple) {
                        input.setAttribute("multiple", "");
                    } else {
                        input.removeAttribute("multiple");
                    }
                }
            },
            setAcceptFiles: function(acceptFiles) {
                if (acceptFiles !== options.acceptFiles) {
                    input.setAttribute("accept", acceptFiles);
                }
            },
            reset: function() {
                if (input.parentNode) {
                    qq(input).remove();
                }
                qq(options.element).removeClass(options.focusClass);
                input = null;
                input = createInput();
            }
        });
        input = createInput();
    };
    qq.UploadButton.BUTTON_ID_ATTR_NAME = "qq-button-id";
    qq.UploadData = function(uploaderProxy) {
        "use strict";
        var data = [], byUuid = {}, byStatus = {}, byProxyGroupId = {}, byBatchId = {};
        function getDataByIds(idOrIds) {
            if (qq.isArray(idOrIds)) {
                var entries = [];
                qq.each(idOrIds, function(idx, id) {
                    entries.push(data[id]);
                });
                return entries;
            }
            return data[idOrIds];
        }
        function getDataByUuids(uuids) {
            if (qq.isArray(uuids)) {
                var entries = [];
                qq.each(uuids, function(idx, uuid) {
                    entries.push(data[byUuid[uuid]]);
                });
                return entries;
            }
            return data[byUuid[uuids]];
        }
        function getDataByStatus(status) {
            var statusResults = [], statuses = [].concat(status);
            qq.each(statuses, function(index, statusEnum) {
                var statusResultIndexes = byStatus[statusEnum];
                if (statusResultIndexes !== undefined) {
                    qq.each(statusResultIndexes, function(i, dataIndex) {
                        statusResults.push(data[dataIndex]);
                    });
                }
            });
            return statusResults;
        }
        qq.extend(this, {
            addFile: function(spec) {
                var status = spec.status || qq.status.SUBMITTING, id = data.push({
                    name: spec.name,
                    originalName: spec.name,
                    uuid: spec.uuid,
                    size: spec.size == null ? -1 : spec.size,
                    status: status
                }) - 1;
                if (spec.batchId) {
                    data[id].batchId = spec.batchId;
                    if (byBatchId[spec.batchId] === undefined) {
                        byBatchId[spec.batchId] = [];
                    }
                    byBatchId[spec.batchId].push(id);
                }
                if (spec.proxyGroupId) {
                    data[id].proxyGroupId = spec.proxyGroupId;
                    if (byProxyGroupId[spec.proxyGroupId] === undefined) {
                        byProxyGroupId[spec.proxyGroupId] = [];
                    }
                    byProxyGroupId[spec.proxyGroupId].push(id);
                }
                data[id].id = id;
                byUuid[spec.uuid] = id;
                if (byStatus[status] === undefined) {
                    byStatus[status] = [];
                }
                byStatus[status].push(id);
                uploaderProxy.onStatusChange(id, null, status);
                return id;
            },
            retrieve: function(optionalFilter) {
                if (qq.isObject(optionalFilter) && data.length) {
                    if (optionalFilter.id !== undefined) {
                        return getDataByIds(optionalFilter.id);
                    } else if (optionalFilter.uuid !== undefined) {
                        return getDataByUuids(optionalFilter.uuid);
                    } else if (optionalFilter.status) {
                        return getDataByStatus(optionalFilter.status);
                    }
                } else {
                    return qq.extend([], data, true);
                }
            },
            reset: function() {
                data = [];
                byUuid = {};
                byStatus = {};
                byBatchId = {};
            },
            setStatus: function(id, newStatus) {
                var oldStatus = data[id].status, byStatusOldStatusIndex = qq.indexOf(byStatus[oldStatus], id);
                byStatus[oldStatus].splice(byStatusOldStatusIndex, 1);
                data[id].status = newStatus;
                if (byStatus[newStatus] === undefined) {
                    byStatus[newStatus] = [];
                }
                byStatus[newStatus].push(id);
                uploaderProxy.onStatusChange(id, oldStatus, newStatus);
            },
            uuidChanged: function(id, newUuid) {
                var oldUuid = data[id].uuid;
                data[id].uuid = newUuid;
                byUuid[newUuid] = id;
                delete byUuid[oldUuid];
            },
            updateName: function(id, newName) {
                data[id].name = newName;
            },
            updateSize: function(id, newSize) {
                data[id].size = newSize;
            },
            setParentId: function(targetId, parentId) {
                data[targetId].parentId = parentId;
            },
            getIdsInProxyGroup: function(id) {
                var proxyGroupId = data[id].proxyGroupId;
                if (proxyGroupId) {
                    return byProxyGroupId[proxyGroupId];
                }
                return [];
            },
            getIdsInBatch: function(id) {
                var batchId = data[id].batchId;
                return byBatchId[batchId];
            }
        });
    };
    qq.status = {
        SUBMITTING: "submitting",
        SUBMITTED: "submitted",
        REJECTED: "rejected",
        QUEUED: "queued",
        CANCELED: "canceled",
        PAUSED: "paused",
        UPLOADING: "uploading",
        UPLOAD_RETRYING: "retrying upload",
        UPLOAD_SUCCESSFUL: "upload successful",
        UPLOAD_FAILED: "upload failed",
        DELETE_FAILED: "delete failed",
        DELETING: "deleting",
        DELETED: "deleted"
    };
    (function() {
        "use strict";
        qq.basePublicApi = {
            addBlobs: function(blobDataOrArray, params, endpoint) {
                this.addFiles(blobDataOrArray, params, endpoint);
            },
            addInitialFiles: function(cannedFileList) {
                var self = this;
                qq.each(cannedFileList, function(index, cannedFile) {
                    self._addCannedFile(cannedFile);
                });
            },
            addFiles: function(data, params, endpoint) {
                this._maybeHandleIos8SafariWorkaround();
                var batchId = this._storedIds.length === 0 ? qq.getUniqueId() : this._currentBatchId, processBlob = qq.bind(function(blob) {
                    this._handleNewFile({
                        blob: blob,
                        name: this._options.blobs.defaultName
                    }, batchId, verifiedFiles);
                }, this), processBlobData = qq.bind(function(blobData) {
                    this._handleNewFile(blobData, batchId, verifiedFiles);
                }, this), processCanvas = qq.bind(function(canvas) {
                    var blob = qq.canvasToBlob(canvas);
                    this._handleNewFile({
                        blob: blob,
                        name: this._options.blobs.defaultName + ".png"
                    }, batchId, verifiedFiles);
                }, this), processCanvasData = qq.bind(function(canvasData) {
                    var normalizedQuality = canvasData.quality && canvasData.quality / 100, blob = qq.canvasToBlob(canvasData.canvas, canvasData.type, normalizedQuality);
                    this._handleNewFile({
                        blob: blob,
                        name: canvasData.name
                    }, batchId, verifiedFiles);
                }, this), processFileOrInput = qq.bind(function(fileOrInput) {
                    if (qq.isInput(fileOrInput) && qq.supportedFeatures.ajaxUploading) {
                        var files = Array.prototype.slice.call(fileOrInput.files), self = this;
                        qq.each(files, function(idx, file) {
                            self._handleNewFile(file, batchId, verifiedFiles);
                        });
                    } else {
                        this._handleNewFile(fileOrInput, batchId, verifiedFiles);
                    }
                }, this), normalizeData = function() {
                    if (qq.isFileList(data)) {
                        data = Array.prototype.slice.call(data);
                    }
                    data = [].concat(data);
                }, self = this, verifiedFiles = [];
                this._currentBatchId = batchId;
                if (data) {
                    normalizeData();
                    qq.each(data, function(idx, fileContainer) {
                        if (qq.isFileOrInput(fileContainer)) {
                            processFileOrInput(fileContainer);
                        } else if (qq.isBlob(fileContainer)) {
                            processBlob(fileContainer);
                        } else if (qq.isObject(fileContainer)) {
                            if (fileContainer.blob && fileContainer.name) {
                                processBlobData(fileContainer);
                            } else if (fileContainer.canvas && fileContainer.name) {
                                processCanvasData(fileContainer);
                            }
                        } else if (fileContainer.tagName && fileContainer.tagName.toLowerCase() === "canvas") {
                            processCanvas(fileContainer);
                        } else {
                            self.log(fileContainer + " is not a valid file container!  Ignoring!", "warn");
                        }
                    });
                    this.log("Received " + verifiedFiles.length + " files.");
                    this._prepareItemsForUpload(verifiedFiles, params, endpoint);
                }
            },
            cancel: function(id) {
                this._handler.cancel(id);
            },
            cancelAll: function() {
                var storedIdsCopy = [], self = this;
                qq.extend(storedIdsCopy, this._storedIds);
                qq.each(storedIdsCopy, function(idx, storedFileId) {
                    self.cancel(storedFileId);
                });
                this._handler.cancelAll();
            },
            clearStoredFiles: function() {
                this._storedIds = [];
            },
            continueUpload: function(id) {
                var uploadData = this._uploadData.retrieve({
                    id: id
                });
                if (!qq.supportedFeatures.pause || !this._options.chunking.enabled) {
                    return false;
                }
                if (uploadData.status === qq.status.PAUSED) {
                    this.log(qq.format("Paused file ID {} ({}) will be continued.  Not paused.", id, this.getName(id)));
                    this._uploadFile(id);
                    return true;
                } else {
                    this.log(qq.format("Ignoring continue for file ID {} ({}).  Not paused.", id, this.getName(id)), "error");
                }
                return false;
            },
            deleteFile: function(id) {
                return this._onSubmitDelete(id);
            },
            doesExist: function(fileOrBlobId) {
                return this._handler.isValid(fileOrBlobId);
            },
            drawThumbnail: function(fileId, imgOrCanvas, maxSize, fromServer, customResizeFunction) {
                var promiseToReturn = new qq.Promise(), fileOrUrl, options;
                if (this._imageGenerator) {
                    fileOrUrl = this._thumbnailUrls[fileId];
                    options = {
                        customResizeFunction: customResizeFunction,
                        maxSize: maxSize > 0 ? maxSize : null,
                        scale: maxSize > 0
                    };
                    if (!fromServer && qq.supportedFeatures.imagePreviews) {
                        fileOrUrl = this.getFile(fileId);
                    }
                    if (fileOrUrl == null) {
                        promiseToReturn.failure({
                            container: imgOrCanvas,
                            error: "File or URL not found."
                        });
                    } else {
                        this._imageGenerator.generate(fileOrUrl, imgOrCanvas, options).then(function success(modifiedContainer) {
                            promiseToReturn.success(modifiedContainer);
                        }, function failure(container, reason) {
                            promiseToReturn.failure({
                                container: container,
                                error: reason || "Problem generating thumbnail"
                            });
                        });
                    }
                } else {
                    promiseToReturn.failure({
                        container: imgOrCanvas,
                        error: "Missing image generator module"
                    });
                }
                return promiseToReturn;
            },
            getButton: function(fileId) {
                return this._getButton(this._buttonIdsForFileIds[fileId]);
            },
            getEndpoint: function(fileId) {
                return this._endpointStore.get(fileId);
            },
            getFile: function(fileOrBlobId) {
                return this._handler.getFile(fileOrBlobId) || null;
            },
            getInProgress: function() {
                return this._uploadData.retrieve({
                    status: [ qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED ]
                }).length;
            },
            getName: function(id) {
                return this._uploadData.retrieve({
                    id: id
                }).name;
            },
            getParentId: function(id) {
                var uploadDataEntry = this.getUploads({
                    id: id
                }), parentId = null;
                if (uploadDataEntry) {
                    if (uploadDataEntry.parentId !== undefined) {
                        parentId = uploadDataEntry.parentId;
                    }
                }
                return parentId;
            },
            getResumableFilesData: function() {
                return this._handler.getResumableFilesData();
            },
            getSize: function(id) {
                return this._uploadData.retrieve({
                    id: id
                }).size;
            },
            getNetUploads: function() {
                return this._netUploaded;
            },
            getRemainingAllowedItems: function() {
                var allowedItems = this._currentItemLimit;
                if (allowedItems > 0) {
                    return allowedItems - this._netUploadedOrQueued;
                }
                return null;
            },
            getUploads: function(optionalFilter) {
                return this._uploadData.retrieve(optionalFilter);
            },
            getUuid: function(id) {
                return this._uploadData.retrieve({
                    id: id
                }).uuid;
            },
            log: function(str, level) {
                if (this._options.debug && (!level || level === "info")) {
                    qq.log("[Fine Uploader " + qq.version + "] " + str);
                } else if (level && level !== "info") {
                    qq.log("[Fine Uploader " + qq.version + "] " + str, level);
                }
            },
            pauseUpload: function(id) {
                var uploadData = this._uploadData.retrieve({
                    id: id
                });
                if (!qq.supportedFeatures.pause || !this._options.chunking.enabled) {
                    return false;
                }
                if (qq.indexOf([ qq.status.UPLOADING, qq.status.UPLOAD_RETRYING ], uploadData.status) >= 0) {
                    if (this._handler.pause(id)) {
                        this._uploadData.setStatus(id, qq.status.PAUSED);
                        return true;
                    } else {
                        this.log(qq.format("Unable to pause file ID {} ({}).", id, this.getName(id)), "error");
                    }
                } else {
                    this.log(qq.format("Ignoring pause for file ID {} ({}).  Not in progress.", id, this.getName(id)), "error");
                }
                return false;
            },
            reset: function() {
                this.log("Resetting uploader...");
                this._handler.reset();
                this._storedIds = [];
                this._autoRetries = [];
                this._retryTimeouts = [];
                this._preventRetries = [];
                this._thumbnailUrls = [];
                qq.each(this._buttons, function(idx, button) {
                    button.reset();
                });
                this._paramsStore.reset();
                this._endpointStore.reset();
                this._netUploadedOrQueued = 0;
                this._netUploaded = 0;
                this._uploadData.reset();
                this._buttonIdsForFileIds = [];
                this._pasteHandler && this._pasteHandler.reset();
                this._options.session.refreshOnReset && this._refreshSessionData();
                this._succeededSinceLastAllComplete = [];
                this._failedSinceLastAllComplete = [];
                this._totalProgress && this._totalProgress.reset();
            },
            retry: function(id) {
                return this._manualRetry(id);
            },
            scaleImage: function(id, specs) {
                var self = this;
                return qq.Scaler.prototype.scaleImage(id, specs, {
                    log: qq.bind(self.log, self),
                    getFile: qq.bind(self.getFile, self),
                    uploadData: self._uploadData
                });
            },
            setCustomHeaders: function(headers, id) {
                this._customHeadersStore.set(headers, id);
            },
            setDeleteFileCustomHeaders: function(headers, id) {
                this._deleteFileCustomHeadersStore.set(headers, id);
            },
            setDeleteFileEndpoint: function(endpoint, id) {
                this._deleteFileEndpointStore.set(endpoint, id);
            },
            setDeleteFileParams: function(params, id) {
                this._deleteFileParamsStore.set(params, id);
            },
            setEndpoint: function(endpoint, id) {
                this._endpointStore.set(endpoint, id);
            },
            setForm: function(elementOrId) {
                this._updateFormSupportAndParams(elementOrId);
            },
            setItemLimit: function(newItemLimit) {
                this._currentItemLimit = newItemLimit;
            },
            setName: function(id, newName) {
                this._uploadData.updateName(id, newName);
            },
            setParams: function(params, id) {
                this._paramsStore.set(params, id);
            },
            setUuid: function(id, newUuid) {
                return this._uploadData.uuidChanged(id, newUuid);
            },
            uploadStoredFiles: function() {
                if (this._storedIds.length === 0) {
                    this._itemError("noFilesError");
                } else {
                    this._uploadStoredFiles();
                }
            }
        };
        qq.basePrivateApi = {
            _addCannedFile: function(sessionData) {
                var id = this._uploadData.addFile({
                    uuid: sessionData.uuid,
                    name: sessionData.name,
                    size: sessionData.size,
                    status: qq.status.UPLOAD_SUCCESSFUL
                });
                sessionData.deleteFileEndpoint && this.setDeleteFileEndpoint(sessionData.deleteFileEndpoint, id);
                sessionData.deleteFileParams && this.setDeleteFileParams(sessionData.deleteFileParams, id);
                if (sessionData.thumbnailUrl) {
                    this._thumbnailUrls[id] = sessionData.thumbnailUrl;
                }
                this._netUploaded++;
                this._netUploadedOrQueued++;
                return id;
            },
            _annotateWithButtonId: function(file, associatedInput) {
                if (qq.isFile(file)) {
                    file.qqButtonId = this._getButtonId(associatedInput);
                }
            },
            _batchError: function(message) {
                this._options.callbacks.onError(null, null, message, undefined);
            },
            _createDeleteHandler: function() {
                var self = this;
                return new qq.DeleteFileAjaxRequester({
                    method: this._options.deleteFile.method.toUpperCase(),
                    maxConnections: this._options.maxConnections,
                    uuidParamName: this._options.request.uuidName,
                    customHeaders: this._deleteFileCustomHeadersStore,
                    paramsStore: this._deleteFileParamsStore,
                    endpointStore: this._deleteFileEndpointStore,
                    cors: this._options.cors,
                    log: qq.bind(self.log, self),
                    onDelete: function(id) {
                        self._onDelete(id);
                        self._options.callbacks.onDelete(id);
                    },
                    onDeleteComplete: function(id, xhrOrXdr, isError) {
                        self._onDeleteComplete(id, xhrOrXdr, isError);
                        self._options.callbacks.onDeleteComplete(id, xhrOrXdr, isError);
                    }
                });
            },
            _createPasteHandler: function() {
                var self = this;
                return new qq.PasteSupport({
                    targetElement: this._options.paste.targetElement,
                    callbacks: {
                        log: qq.bind(self.log, self),
                        pasteReceived: function(blob) {
                            self._handleCheckedCallback({
                                name: "onPasteReceived",
                                callback: qq.bind(self._options.callbacks.onPasteReceived, self, blob),
                                onSuccess: qq.bind(self._handlePasteSuccess, self, blob),
                                identifier: "pasted image"
                            });
                        }
                    }
                });
            },
            _createStore: function(initialValue, _readOnlyValues_) {
                var store = {}, catchall = initialValue, perIdReadOnlyValues = {}, readOnlyValues = _readOnlyValues_, copy = function(orig) {
                    if (qq.isObject(orig)) {
                        return qq.extend({}, orig);
                    }
                    return orig;
                }, getReadOnlyValues = function() {
                    if (qq.isFunction(readOnlyValues)) {
                        return readOnlyValues();
                    }
                    return readOnlyValues;
                }, includeReadOnlyValues = function(id, existing) {
                    if (readOnlyValues && qq.isObject(existing)) {
                        qq.extend(existing, getReadOnlyValues());
                    }
                    if (perIdReadOnlyValues[id]) {
                        qq.extend(existing, perIdReadOnlyValues[id]);
                    }
                };
                return {
                    set: function(val, id) {
                        if (id == null) {
                            store = {};
                            catchall = copy(val);
                        } else {
                            store[id] = copy(val);
                        }
                    },
                    get: function(id) {
                        var values;
                        if (id != null && store[id]) {
                            values = store[id];
                        } else {
                            values = copy(catchall);
                        }
                        includeReadOnlyValues(id, values);
                        return copy(values);
                    },
                    addReadOnly: function(id, values) {
                        if (qq.isObject(store)) {
                            if (id === null) {
                                if (qq.isFunction(values)) {
                                    readOnlyValues = values;
                                } else {
                                    readOnlyValues = readOnlyValues || {};
                                    qq.extend(readOnlyValues, values);
                                }
                            } else {
                                perIdReadOnlyValues[id] = perIdReadOnlyValues[id] || {};
                                qq.extend(perIdReadOnlyValues[id], values);
                            }
                        }
                    },
                    remove: function(fileId) {
                        return delete store[fileId];
                    },
                    reset: function() {
                        store = {};
                        perIdReadOnlyValues = {};
                        catchall = initialValue;
                    }
                };
            },
            _createUploadDataTracker: function() {
                var self = this;
                return new qq.UploadData({
                    getName: function(id) {
                        return self.getName(id);
                    },
                    getUuid: function(id) {
                        return self.getUuid(id);
                    },
                    getSize: function(id) {
                        return self.getSize(id);
                    },
                    onStatusChange: function(id, oldStatus, newStatus) {
                        self._onUploadStatusChange(id, oldStatus, newStatus);
                        self._options.callbacks.onStatusChange(id, oldStatus, newStatus);
                        self._maybeAllComplete(id, newStatus);
                        if (self._totalProgress) {
                            setTimeout(function() {
                                self._totalProgress.onStatusChange(id, oldStatus, newStatus);
                            }, 0);
                        }
                    }
                });
            },
            _createUploadButton: function(spec) {
                var self = this, acceptFiles = spec.accept || this._options.validation.acceptFiles, allowedExtensions = spec.allowedExtensions || this._options.validation.allowedExtensions, button;
                function allowMultiple() {
                    if (qq.supportedFeatures.ajaxUploading) {
                        if (self._options.workarounds.iosEmptyVideos && qq.ios() && !qq.ios6() && self._isAllowedExtension(allowedExtensions, ".mov")) {
                            return false;
                        }
                        if (spec.multiple === undefined) {
                            return self._options.multiple;
                        }
                        return spec.multiple;
                    }
                    return false;
                }
                button = new qq.UploadButton({
                    acceptFiles: acceptFiles,
                    element: spec.element,
                    focusClass: this._options.classes.buttonFocus,
                    folders: spec.folders,
                    hoverClass: this._options.classes.buttonHover,
                    ios8BrowserCrashWorkaround: this._options.workarounds.ios8BrowserCrash,
                    multiple: allowMultiple(),
                    name: this._options.request.inputName,
                    onChange: function(input) {
                        self._onInputChange(input);
                    },
                    title: spec.title == null ? this._options.text.fileInputTitle : spec.title
                });
                this._disposeSupport.addDisposer(function() {
                    button.dispose();
                });
                self._buttons.push(button);
                return button;
            },
            _createUploadHandler: function(additionalOptions, namespace) {
                var self = this, lastOnProgress = {}, options = {
                    debug: this._options.debug,
                    maxConnections: this._options.maxConnections,
                    cors: this._options.cors,
                    paramsStore: this._paramsStore,
                    endpointStore: this._endpointStore,
                    chunking: this._options.chunking,
                    resume: this._options.resume,
                    blobs: this._options.blobs,
                    log: qq.bind(self.log, self),
                    preventRetryParam: this._options.retry.preventRetryResponseProperty,
                    onProgress: function(id, name, loaded, total) {
                        if (loaded < 0 || total < 0) {
                            return;
                        }
                        if (lastOnProgress[id]) {
                            if (lastOnProgress[id].loaded !== loaded || lastOnProgress[id].total !== total) {
                                self._onProgress(id, name, loaded, total);
                                self._options.callbacks.onProgress(id, name, loaded, total);
                            }
                        } else {
                            self._onProgress(id, name, loaded, total);
                            self._options.callbacks.onProgress(id, name, loaded, total);
                        }
                        lastOnProgress[id] = {
                            loaded: loaded,
                            total: total
                        };
                    },
                    onComplete: function(id, name, result, xhr) {
                        delete lastOnProgress[id];
                        var status = self.getUploads({
                            id: id
                        }).status, retVal;
                        if (status === qq.status.UPLOAD_SUCCESSFUL || status === qq.status.UPLOAD_FAILED) {
                            return;
                        }
                        retVal = self._onComplete(id, name, result, xhr);
                        if (retVal instanceof qq.Promise) {
                            retVal.done(function() {
                                self._options.callbacks.onComplete(id, name, result, xhr);
                            });
                        } else {
                            self._options.callbacks.onComplete(id, name, result, xhr);
                        }
                    },
                    onCancel: function(id, name, cancelFinalizationEffort) {
                        var promise = new qq.Promise();
                        self._handleCheckedCallback({
                            name: "onCancel",
                            callback: qq.bind(self._options.callbacks.onCancel, self, id, name),
                            onFailure: promise.failure,
                            onSuccess: function() {
                                cancelFinalizationEffort.then(function() {
                                    self._onCancel(id, name);
                                });
                                promise.success();
                            },
                            identifier: id
                        });
                        return promise;
                    },
                    onUploadPrep: qq.bind(this._onUploadPrep, this),
                    onUpload: function(id, name) {
                        self._onUpload(id, name);
                        self._options.callbacks.onUpload(id, name);
                    },
                    onUploadChunk: function(id, name, chunkData) {
                        self._onUploadChunk(id, chunkData);
                        self._options.callbacks.onUploadChunk(id, name, chunkData);
                    },
                    onUploadChunkSuccess: function(id, chunkData, result, xhr) {
                        self._options.callbacks.onUploadChunkSuccess.apply(self, arguments);
                    },
                    onResume: function(id, name, chunkData) {
                        return self._options.callbacks.onResume(id, name, chunkData);
                    },
                    onAutoRetry: function(id, name, responseJSON, xhr) {
                        return self._onAutoRetry.apply(self, arguments);
                    },
                    onUuidChanged: function(id, newUuid) {
                        self.log("Server requested UUID change from '" + self.getUuid(id) + "' to '" + newUuid + "'");
                        self.setUuid(id, newUuid);
                    },
                    getName: qq.bind(self.getName, self),
                    getUuid: qq.bind(self.getUuid, self),
                    getSize: qq.bind(self.getSize, self),
                    setSize: qq.bind(self._setSize, self),
                    getDataByUuid: function(uuid) {
                        return self.getUploads({
                            uuid: uuid
                        });
                    },
                    isQueued: function(id) {
                        var status = self.getUploads({
                            id: id
                        }).status;
                        return status === qq.status.QUEUED || status === qq.status.SUBMITTED || status === qq.status.UPLOAD_RETRYING || status === qq.status.PAUSED;
                    },
                    getIdsInProxyGroup: self._uploadData.getIdsInProxyGroup,
                    getIdsInBatch: self._uploadData.getIdsInBatch
                };
                qq.each(this._options.request, function(prop, val) {
                    options[prop] = val;
                });
                options.customHeaders = this._customHeadersStore;
                if (additionalOptions) {
                    qq.each(additionalOptions, function(key, val) {
                        options[key] = val;
                    });
                }
                return new qq.UploadHandlerController(options, namespace);
            },
            _fileOrBlobRejected: function(id) {
                this._netUploadedOrQueued--;
                this._uploadData.setStatus(id, qq.status.REJECTED);
            },
            _formatSize: function(bytes) {
                if (bytes === 0) {
                    return bytes + this._options.text.sizeSymbols[0];
                }
                var i = -1;
                do {
                    bytes = bytes / 1e3;
                    i++;
                } while (bytes > 999);
                return Math.max(bytes, .1).toFixed(1) + this._options.text.sizeSymbols[i];
            },
            _generateExtraButtonSpecs: function() {
                var self = this;
                this._extraButtonSpecs = {};
                qq.each(this._options.extraButtons, function(idx, extraButtonOptionEntry) {
                    var multiple = extraButtonOptionEntry.multiple, validation = qq.extend({}, self._options.validation, true), extraButtonSpec = qq.extend({}, extraButtonOptionEntry);
                    if (multiple === undefined) {
                        multiple = self._options.multiple;
                    }
                    if (extraButtonSpec.validation) {
                        qq.extend(validation, extraButtonOptionEntry.validation, true);
                    }
                    qq.extend(extraButtonSpec, {
                        multiple: multiple,
                        validation: validation
                    }, true);
                    self._initExtraButton(extraButtonSpec);
                });
            },
            _getButton: function(buttonId) {
                var extraButtonsSpec = this._extraButtonSpecs[buttonId];
                if (extraButtonsSpec) {
                    return extraButtonsSpec.element;
                } else if (buttonId === this._defaultButtonId) {
                    return this._options.button;
                }
            },
            _getButtonId: function(buttonOrFileInputOrFile) {
                var inputs, fileInput, fileBlobOrInput = buttonOrFileInputOrFile;
                if (fileBlobOrInput instanceof qq.BlobProxy) {
                    fileBlobOrInput = fileBlobOrInput.referenceBlob;
                }
                if (fileBlobOrInput && !qq.isBlob(fileBlobOrInput)) {
                    if (qq.isFile(fileBlobOrInput)) {
                        return fileBlobOrInput.qqButtonId;
                    } else if (fileBlobOrInput.tagName.toLowerCase() === "input" && fileBlobOrInput.type.toLowerCase() === "file") {
                        return fileBlobOrInput.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME);
                    }
                    inputs = fileBlobOrInput.getElementsByTagName("input");
                    qq.each(inputs, function(idx, input) {
                        if (input.getAttribute("type") === "file") {
                            fileInput = input;
                            return false;
                        }
                    });
                    if (fileInput) {
                        return fileInput.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME);
                    }
                }
            },
            _getNotFinished: function() {
                return this._uploadData.retrieve({
                    status: [ qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED, qq.status.SUBMITTING, qq.status.SUBMITTED, qq.status.PAUSED ]
                }).length;
            },
            _getValidationBase: function(buttonId) {
                var extraButtonSpec = this._extraButtonSpecs[buttonId];
                return extraButtonSpec ? extraButtonSpec.validation : this._options.validation;
            },
            _getValidationDescriptor: function(fileWrapper) {
                if (fileWrapper.file instanceof qq.BlobProxy) {
                    return {
                        name: qq.getFilename(fileWrapper.file.referenceBlob),
                        size: fileWrapper.file.referenceBlob.size
                    };
                }
                return {
                    name: this.getUploads({
                        id: fileWrapper.id
                    }).name,
                    size: this.getUploads({
                        id: fileWrapper.id
                    }).size
                };
            },
            _getValidationDescriptors: function(fileWrappers) {
                var self = this, fileDescriptors = [];
                qq.each(fileWrappers, function(idx, fileWrapper) {
                    fileDescriptors.push(self._getValidationDescriptor(fileWrapper));
                });
                return fileDescriptors;
            },
            _handleCameraAccess: function() {
                if (this._options.camera.ios && qq.ios()) {
                    var acceptIosCamera = "image/*;capture=camera", button = this._options.camera.button, buttonId = button ? this._getButtonId(button) : this._defaultButtonId, optionRoot = this._options;
                    if (buttonId && buttonId !== this._defaultButtonId) {
                        optionRoot = this._extraButtonSpecs[buttonId];
                    }
                    optionRoot.multiple = false;
                    if (optionRoot.validation.acceptFiles === null) {
                        optionRoot.validation.acceptFiles = acceptIosCamera;
                    } else {
                        optionRoot.validation.acceptFiles += "," + acceptIosCamera;
                    }
                    qq.each(this._buttons, function(idx, button) {
                        if (button.getButtonId() === buttonId) {
                            button.setMultiple(optionRoot.multiple);
                            button.setAcceptFiles(optionRoot.acceptFiles);
                            return false;
                        }
                    });
                }
            },
            _handleCheckedCallback: function(details) {
                var self = this, callbackRetVal = details.callback();
                if (qq.isGenericPromise(callbackRetVal)) {
                    this.log(details.name + " - waiting for " + details.name + " promise to be fulfilled for " + details.identifier);
                    return callbackRetVal.then(function(successParam) {
                        self.log(details.name + " promise success for " + details.identifier);
                        details.onSuccess(successParam);
                    }, function() {
                        if (details.onFailure) {
                            self.log(details.name + " promise failure for " + details.identifier);
                            details.onFailure();
                        } else {
                            self.log(details.name + " promise failure for " + details.identifier);
                        }
                    });
                }
                if (callbackRetVal !== false) {
                    details.onSuccess(callbackRetVal);
                } else {
                    if (details.onFailure) {
                        this.log(details.name + " - return value was 'false' for " + details.identifier + ".  Invoking failure callback.");
                        details.onFailure();
                    } else {
                        this.log(details.name + " - return value was 'false' for " + details.identifier + ".  Will not proceed.");
                    }
                }
                return callbackRetVal;
            },
            _handleNewFile: function(file, batchId, newFileWrapperList) {
                var self = this, uuid = qq.getUniqueId(), size = -1, name = qq.getFilename(file), actualFile = file.blob || file, handler = this._customNewFileHandler ? this._customNewFileHandler : qq.bind(self._handleNewFileGeneric, self);
                if (!qq.isInput(actualFile) && actualFile.size >= 0) {
                    size = actualFile.size;
                }
                handler(actualFile, name, uuid, size, newFileWrapperList, batchId, this._options.request.uuidName, {
                    uploadData: self._uploadData,
                    paramsStore: self._paramsStore,
                    addFileToHandler: function(id, file) {
                        self._handler.add(id, file);
                        self._netUploadedOrQueued++;
                        self._trackButton(id);
                    }
                });
            },
            _handleNewFileGeneric: function(file, name, uuid, size, fileList, batchId) {
                var id = this._uploadData.addFile({
                    uuid: uuid,
                    name: name,
                    size: size,
                    batchId: batchId
                });
                this._handler.add(id, file);
                this._trackButton(id);
                this._netUploadedOrQueued++;
                fileList.push({
                    id: id,
                    file: file
                });
            },
            _handlePasteSuccess: function(blob, extSuppliedName) {
                var extension = blob.type.split("/")[1], name = extSuppliedName;
                if (name == null) {
                    name = this._options.paste.defaultName;
                }
                name += "." + extension;
                this.addFiles({
                    name: name,
                    blob: blob
                });
            },
            _initExtraButton: function(spec) {
                var button = this._createUploadButton({
                    accept: spec.validation.acceptFiles,
                    allowedExtensions: spec.validation.allowedExtensions,
                    element: spec.element,
                    folders: spec.folders,
                    multiple: spec.multiple,
                    title: spec.fileInputTitle
                });
                this._extraButtonSpecs[button.getButtonId()] = spec;
            },
            _initFormSupportAndParams: function() {
                this._formSupport = qq.FormSupport && new qq.FormSupport(this._options.form, qq.bind(this.uploadStoredFiles, this), qq.bind(this.log, this));
                if (this._formSupport && this._formSupport.attachedToForm) {
                    this._paramsStore = this._createStore(this._options.request.params, this._formSupport.getFormInputsAsObject);
                    this._options.autoUpload = this._formSupport.newAutoUpload;
                    if (this._formSupport.newEndpoint) {
                        this._options.request.endpoint = this._formSupport.newEndpoint;
                    }
                } else {
                    this._paramsStore = this._createStore(this._options.request.params);
                }
            },
            _isDeletePossible: function() {
                if (!qq.DeleteFileAjaxRequester || !this._options.deleteFile.enabled) {
                    return false;
                }
                if (this._options.cors.expected) {
                    if (qq.supportedFeatures.deleteFileCorsXhr) {
                        return true;
                    }
                    if (qq.supportedFeatures.deleteFileCorsXdr && this._options.cors.allowXdr) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            _isAllowedExtension: function(allowed, fileName) {
                var valid = false;
                if (!allowed.length) {
                    return true;
                }
                qq.each(allowed, function(idx, allowedExt) {
                    if (qq.isString(allowedExt)) {
                        var extRegex = new RegExp("\\." + allowedExt + "$", "i");
                        if (fileName.match(extRegex) != null) {
                            valid = true;
                            return false;
                        }
                    }
                });
                return valid;
            },
            _itemError: function(code, maybeNameOrNames, item) {
                var message = this._options.messages[code], allowedExtensions = [], names = [].concat(maybeNameOrNames), name = names[0], buttonId = this._getButtonId(item), validationBase = this._getValidationBase(buttonId), extensionsForMessage, placeholderMatch;
                function r(name, replacement) {
                    message = message.replace(name, replacement);
                }
                qq.each(validationBase.allowedExtensions, function(idx, allowedExtension) {
                    if (qq.isString(allowedExtension)) {
                        allowedExtensions.push(allowedExtension);
                    }
                });
                extensionsForMessage = allowedExtensions.join(", ").toLowerCase();
                r("{file}", this._options.formatFileName(name));
                r("{extensions}", extensionsForMessage);
                r("{sizeLimit}", this._formatSize(validationBase.sizeLimit));
                r("{minSizeLimit}", this._formatSize(validationBase.minSizeLimit));
                placeholderMatch = message.match(/(\{\w+\})/g);
                if (placeholderMatch !== null) {
                    qq.each(placeholderMatch, function(idx, placeholder) {
                        r(placeholder, names[idx]);
                    });
                }
                this._options.callbacks.onError(null, name, message, undefined);
                return message;
            },
            _manualRetry: function(id, callback) {
                if (this._onBeforeManualRetry(id)) {
                    this._netUploadedOrQueued++;
                    this._uploadData.setStatus(id, qq.status.UPLOAD_RETRYING);
                    if (callback) {
                        callback(id);
                    } else {
                        this._handler.retry(id);
                    }
                    return true;
                }
            },
            _maybeAllComplete: function(id, status) {
                var self = this, notFinished = this._getNotFinished();
                if (status === qq.status.UPLOAD_SUCCESSFUL) {
                    this._succeededSinceLastAllComplete.push(id);
                } else if (status === qq.status.UPLOAD_FAILED) {
                    this._failedSinceLastAllComplete.push(id);
                }
                if (notFinished === 0 && (this._succeededSinceLastAllComplete.length || this._failedSinceLastAllComplete.length)) {
                    setTimeout(function() {
                        self._onAllComplete(self._succeededSinceLastAllComplete, self._failedSinceLastAllComplete);
                    }, 0);
                }
            },
            _maybeHandleIos8SafariWorkaround: function() {
                var self = this;
                if (this._options.workarounds.ios8SafariUploads && qq.ios800() && qq.iosSafari()) {
                    setTimeout(function() {
                        window.alert(self._options.messages.unsupportedBrowserIos8Safari);
                    }, 0);
                    throw new qq.Error(this._options.messages.unsupportedBrowserIos8Safari);
                }
            },
            _maybeParseAndSendUploadError: function(id, name, response, xhr) {
                if (!response.success) {
                    if (xhr && xhr.status !== 200 && !response.error) {
                        this._options.callbacks.onError(id, name, "XHR returned response code " + xhr.status, xhr);
                    } else {
                        var errorReason = response.error ? response.error : this._options.text.defaultResponseError;
                        this._options.callbacks.onError(id, name, errorReason, xhr);
                    }
                }
            },
            _maybeProcessNextItemAfterOnValidateCallback: function(validItem, items, index, params, endpoint) {
                var self = this;
                if (items.length > index) {
                    if (validItem || !this._options.validation.stopOnFirstInvalidFile) {
                        setTimeout(function() {
                            var validationDescriptor = self._getValidationDescriptor(items[index]), buttonId = self._getButtonId(items[index].file), button = self._getButton(buttonId);
                            self._handleCheckedCallback({
                                name: "onValidate",
                                callback: qq.bind(self._options.callbacks.onValidate, self, validationDescriptor, button),
                                onSuccess: qq.bind(self._onValidateCallbackSuccess, self, items, index, params, endpoint),
                                onFailure: qq.bind(self._onValidateCallbackFailure, self, items, index, params, endpoint),
                                identifier: "Item '" + validationDescriptor.name + "', size: " + validationDescriptor.size
                            });
                        }, 0);
                    } else if (!validItem) {
                        for (;index < items.length; index++) {
                            self._fileOrBlobRejected(items[index].id);
                        }
                    }
                }
            },
            _onAllComplete: function(successful, failed) {
                this._totalProgress && this._totalProgress.onAllComplete(successful, failed, this._preventRetries);
                this._options.callbacks.onAllComplete(qq.extend([], successful), qq.extend([], failed));
                this._succeededSinceLastAllComplete = [];
                this._failedSinceLastAllComplete = [];
            },
            _onAutoRetry: function(id, name, responseJSON, xhr, callback) {
                var self = this;
                self._preventRetries[id] = responseJSON[self._options.retry.preventRetryResponseProperty];
                if (self._shouldAutoRetry(id, name, responseJSON)) {
                    var retryWaitPeriod = self._options.retry.autoAttemptDelay * 1e3;
                    self._maybeParseAndSendUploadError.apply(self, arguments);
                    self._options.callbacks.onAutoRetry(id, name, self._autoRetries[id]);
                    self._onBeforeAutoRetry(id, name);
                    self._uploadData.setStatus(id, qq.status.UPLOAD_RETRYING);
                    self._retryTimeouts[id] = setTimeout(function() {
                        self.log("Starting retry for " + name + "...");
                        if (callback) {
                            callback(id);
                        } else {
                            self._handler.retry(id);
                        }
                    }, retryWaitPeriod);
                    return true;
                }
            },
            _onBeforeAutoRetry: function(id, name) {
                this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + name + "...");
            },
            _onBeforeManualRetry: function(id) {
                var itemLimit = this._currentItemLimit, fileName;
                if (this._preventRetries[id]) {
                    this.log("Retries are forbidden for id " + id, "warn");
                    return false;
                } else if (this._handler.isValid(id)) {
                    fileName = this.getName(id);
                    if (this._options.callbacks.onManualRetry(id, fileName) === false) {
                        return false;
                    }
                    if (itemLimit > 0 && this._netUploadedOrQueued + 1 > itemLimit) {
                        this._itemError("retryFailTooManyItems");
                        return false;
                    }
                    this.log("Retrying upload for '" + fileName + "' (id: " + id + ")...");
                    return true;
                } else {
                    this.log("'" + id + "' is not a valid file ID", "error");
                    return false;
                }
            },
            _onCancel: function(id, name) {
                this._netUploadedOrQueued--;
                clearTimeout(this._retryTimeouts[id]);
                var storedItemIndex = qq.indexOf(this._storedIds, id);
                if (!this._options.autoUpload && storedItemIndex >= 0) {
                    this._storedIds.splice(storedItemIndex, 1);
                }
                this._uploadData.setStatus(id, qq.status.CANCELED);
            },
            _onComplete: function(id, name, result, xhr) {
                if (!result.success) {
                    this._netUploadedOrQueued--;
                    this._uploadData.setStatus(id, qq.status.UPLOAD_FAILED);
                    if (result[this._options.retry.preventRetryResponseProperty] === true) {
                        this._preventRetries[id] = true;
                    }
                } else {
                    if (result.thumbnailUrl) {
                        this._thumbnailUrls[id] = result.thumbnailUrl;
                    }
                    this._netUploaded++;
                    this._uploadData.setStatus(id, qq.status.UPLOAD_SUCCESSFUL);
                }
                this._maybeParseAndSendUploadError(id, name, result, xhr);
                return result.success ? true : false;
            },
            _onDelete: function(id) {
                this._uploadData.setStatus(id, qq.status.DELETING);
            },
            _onDeleteComplete: function(id, xhrOrXdr, isError) {
                var name = this.getName(id);
                if (isError) {
                    this._uploadData.setStatus(id, qq.status.DELETE_FAILED);
                    this.log("Delete request for '" + name + "' has failed.", "error");
                    if (xhrOrXdr.withCredentials === undefined) {
                        this._options.callbacks.onError(id, name, "Delete request failed", xhrOrXdr);
                    } else {
                        this._options.callbacks.onError(id, name, "Delete request failed with response code " + xhrOrXdr.status, xhrOrXdr);
                    }
                } else {
                    this._netUploadedOrQueued--;
                    this._netUploaded--;
                    this._handler.expunge(id);
                    this._uploadData.setStatus(id, qq.status.DELETED);
                    this.log("Delete request for '" + name + "' has succeeded.");
                }
            },
            _onInputChange: function(input) {
                var fileIndex;
                if (qq.supportedFeatures.ajaxUploading) {
                    for (fileIndex = 0; fileIndex < input.files.length; fileIndex++) {
                        this._annotateWithButtonId(input.files[fileIndex], input);
                    }
                    this.addFiles(input.files);
                } else if (input.value.length > 0) {
                    this.addFiles(input);
                }
                qq.each(this._buttons, function(idx, button) {
                    button.reset();
                });
            },
            _onProgress: function(id, name, loaded, total) {
                this._totalProgress && this._totalProgress.onIndividualProgress(id, loaded, total);
            },
            _onSubmit: function(id, name) {},
            _onSubmitCallbackSuccess: function(id, name) {
                this._onSubmit.apply(this, arguments);
                this._uploadData.setStatus(id, qq.status.SUBMITTED);
                this._onSubmitted.apply(this, arguments);
                if (this._options.autoUpload) {
                    this._options.callbacks.onSubmitted.apply(this, arguments);
                    this._uploadFile(id);
                } else {
                    this._storeForLater(id);
                    this._options.callbacks.onSubmitted.apply(this, arguments);
                }
            },
            _onSubmitDelete: function(id, onSuccessCallback, additionalMandatedParams) {
                var uuid = this.getUuid(id), adjustedOnSuccessCallback;
                if (onSuccessCallback) {
                    adjustedOnSuccessCallback = qq.bind(onSuccessCallback, this, id, uuid, additionalMandatedParams);
                }
                if (this._isDeletePossible()) {
                    this._handleCheckedCallback({
                        name: "onSubmitDelete",
                        callback: qq.bind(this._options.callbacks.onSubmitDelete, this, id),
                        onSuccess: adjustedOnSuccessCallback || qq.bind(this._deleteHandler.sendDelete, this, id, uuid, additionalMandatedParams),
                        identifier: id
                    });
                    return true;
                } else {
                    this.log("Delete request ignored for ID " + id + ", delete feature is disabled or request not possible " + "due to CORS on a user agent that does not support pre-flighting.", "warn");
                    return false;
                }
            },
            _onSubmitted: function(id) {},
            _onTotalProgress: function(loaded, total) {
                this._options.callbacks.onTotalProgress(loaded, total);
            },
            _onUploadPrep: function(id) {},
            _onUpload: function(id, name) {
                this._uploadData.setStatus(id, qq.status.UPLOADING);
            },
            _onUploadChunk: function(id, chunkData) {},
            _onUploadStatusChange: function(id, oldStatus, newStatus) {
                if (newStatus === qq.status.PAUSED) {
                    clearTimeout(this._retryTimeouts[id]);
                }
            },
            _onValidateBatchCallbackFailure: function(fileWrappers) {
                var self = this;
                qq.each(fileWrappers, function(idx, fileWrapper) {
                    self._fileOrBlobRejected(fileWrapper.id);
                });
            },
            _onValidateBatchCallbackSuccess: function(validationDescriptors, items, params, endpoint, button) {
                var errorMessage, itemLimit = this._currentItemLimit, proposedNetFilesUploadedOrQueued = this._netUploadedOrQueued;
                if (itemLimit === 0 || proposedNetFilesUploadedOrQueued <= itemLimit) {
                    if (items.length > 0) {
                        this._handleCheckedCallback({
                            name: "onValidate",
                            callback: qq.bind(this._options.callbacks.onValidate, this, validationDescriptors[0], button),
                            onSuccess: qq.bind(this._onValidateCallbackSuccess, this, items, 0, params, endpoint),
                            onFailure: qq.bind(this._onValidateCallbackFailure, this, items, 0, params, endpoint),
                            identifier: "Item '" + items[0].file.name + "', size: " + items[0].file.size
                        });
                    } else {
                        this._itemError("noFilesError");
                    }
                } else {
                    this._onValidateBatchCallbackFailure(items);
                    errorMessage = this._options.messages.tooManyItemsError.replace(/\{netItems\}/g, proposedNetFilesUploadedOrQueued).replace(/\{itemLimit\}/g, itemLimit);
                    this._batchError(errorMessage);
                }
            },
            _onValidateCallbackFailure: function(items, index, params, endpoint) {
                var nextIndex = index + 1;
                this._fileOrBlobRejected(items[index].id, items[index].file.name);
                this._maybeProcessNextItemAfterOnValidateCallback(false, items, nextIndex, params, endpoint);
            },
            _onValidateCallbackSuccess: function(items, index, params, endpoint) {
                var self = this, nextIndex = index + 1, validationDescriptor = this._getValidationDescriptor(items[index]);
                this._validateFileOrBlobData(items[index], validationDescriptor).then(function() {
                    self._upload(items[index].id, params, endpoint);
                    self._maybeProcessNextItemAfterOnValidateCallback(true, items, nextIndex, params, endpoint);
                }, function() {
                    self._maybeProcessNextItemAfterOnValidateCallback(false, items, nextIndex, params, endpoint);
                });
            },
            _prepareItemsForUpload: function(items, params, endpoint) {
                if (items.length === 0) {
                    this._itemError("noFilesError");
                    return;
                }
                var validationDescriptors = this._getValidationDescriptors(items), buttonId = this._getButtonId(items[0].file), button = this._getButton(buttonId);
                this._handleCheckedCallback({
                    name: "onValidateBatch",
                    callback: qq.bind(this._options.callbacks.onValidateBatch, this, validationDescriptors, button),
                    onSuccess: qq.bind(this._onValidateBatchCallbackSuccess, this, validationDescriptors, items, params, endpoint, button),
                    onFailure: qq.bind(this._onValidateBatchCallbackFailure, this, items),
                    identifier: "batch validation"
                });
            },
            _preventLeaveInProgress: function() {
                var self = this;
                this._disposeSupport.attach(window, "beforeunload", function(e) {
                    if (self.getInProgress()) {
                        e = e || window.event;
                        e.returnValue = self._options.messages.onLeave;
                        return self._options.messages.onLeave;
                    }
                });
            },
            _refreshSessionData: function() {
                var self = this, options = this._options.session;
                if (qq.Session && this._options.session.endpoint != null) {
                    if (!this._session) {
                        qq.extend(options, {
                            cors: this._options.cors
                        });
                        options.log = qq.bind(this.log, this);
                        options.addFileRecord = qq.bind(this._addCannedFile, this);
                        this._session = new qq.Session(options);
                    }
                    setTimeout(function() {
                        self._session.refresh().then(function(response, xhrOrXdr) {
                            self._sessionRequestComplete();
                            self._options.callbacks.onSessionRequestComplete(response, true, xhrOrXdr);
                        }, function(response, xhrOrXdr) {
                            self._options.callbacks.onSessionRequestComplete(response, false, xhrOrXdr);
                        });
                    }, 0);
                }
            },
            _sessionRequestComplete: function() {},
            _setSize: function(id, newSize) {
                this._uploadData.updateSize(id, newSize);
                this._totalProgress && this._totalProgress.onNewSize(id);
            },
            _shouldAutoRetry: function(id, name, responseJSON) {
                var uploadData = this._uploadData.retrieve({
                    id: id
                });
                if (!this._preventRetries[id] && this._options.retry.enableAuto && uploadData.status !== qq.status.PAUSED) {
                    if (this._autoRetries[id] === undefined) {
                        this._autoRetries[id] = 0;
                    }
                    if (this._autoRetries[id] < this._options.retry.maxAutoAttempts) {
                        this._autoRetries[id] += 1;
                        return true;
                    }
                }
                return false;
            },
            _storeForLater: function(id) {
                this._storedIds.push(id);
            },
            _trackButton: function(id) {
                var buttonId;
                if (qq.supportedFeatures.ajaxUploading) {
                    buttonId = this._handler.getFile(id).qqButtonId;
                } else {
                    buttonId = this._getButtonId(this._handler.getInput(id));
                }
                if (buttonId) {
                    this._buttonIdsForFileIds[id] = buttonId;
                }
            },
            _updateFormSupportAndParams: function(formElementOrId) {
                this._options.form.element = formElementOrId;
                this._formSupport = qq.FormSupport && new qq.FormSupport(this._options.form, qq.bind(this.uploadStoredFiles, this), qq.bind(this.log, this));
                if (this._formSupport && this._formSupport.attachedToForm) {
                    this._paramsStore.addReadOnly(null, this._formSupport.getFormInputsAsObject);
                    this._options.autoUpload = this._formSupport.newAutoUpload;
                    if (this._formSupport.newEndpoint) {
                        this.setEndpoint(this._formSupport.newEndpoint);
                    }
                }
            },
            _upload: function(id, params, endpoint) {
                var name = this.getName(id);
                if (params) {
                    this.setParams(params, id);
                }
                if (endpoint) {
                    this.setEndpoint(endpoint, id);
                }
                this._handleCheckedCallback({
                    name: "onSubmit",
                    callback: qq.bind(this._options.callbacks.onSubmit, this, id, name),
                    onSuccess: qq.bind(this._onSubmitCallbackSuccess, this, id, name),
                    onFailure: qq.bind(this._fileOrBlobRejected, this, id, name),
                    identifier: id
                });
            },
            _uploadFile: function(id) {
                if (!this._handler.upload(id)) {
                    this._uploadData.setStatus(id, qq.status.QUEUED);
                }
            },
            _uploadStoredFiles: function() {
                var idToUpload, stillSubmitting, self = this;
                while (this._storedIds.length) {
                    idToUpload = this._storedIds.shift();
                    this._uploadFile(idToUpload);
                }
                stillSubmitting = this.getUploads({
                    status: qq.status.SUBMITTING
                }).length;
                if (stillSubmitting) {
                    qq.log("Still waiting for " + stillSubmitting + " files to clear submit queue. Will re-parse stored IDs array shortly.");
                    setTimeout(function() {
                        self._uploadStoredFiles();
                    }, 1e3);
                }
            },
            _validateFileOrBlobData: function(fileWrapper, validationDescriptor) {
                var self = this, file = function() {
                    if (fileWrapper.file instanceof qq.BlobProxy) {
                        return fileWrapper.file.referenceBlob;
                    }
                    return fileWrapper.file;
                }(), name = validationDescriptor.name, size = validationDescriptor.size, buttonId = this._getButtonId(fileWrapper.file), validationBase = this._getValidationBase(buttonId), validityChecker = new qq.Promise();
                validityChecker.then(function() {}, function() {
                    self._fileOrBlobRejected(fileWrapper.id, name);
                });
                if (qq.isFileOrInput(file) && !this._isAllowedExtension(validationBase.allowedExtensions, name)) {
                    this._itemError("typeError", name, file);
                    return validityChecker.failure();
                }
                if (!this._options.validation.allowEmpty && size === 0) {
                    this._itemError("emptyError", name, file);
                    return validityChecker.failure();
                }
                if (size > 0 && validationBase.sizeLimit && size > validationBase.sizeLimit) {
                    this._itemError("sizeError", name, file);
                    return validityChecker.failure();
                }
                if (size > 0 && size < validationBase.minSizeLimit) {
                    this._itemError("minSizeError", name, file);
                    return validityChecker.failure();
                }
                if (qq.ImageValidation && qq.supportedFeatures.imagePreviews && qq.isFile(file)) {
                    new qq.ImageValidation(file, qq.bind(self.log, self)).validate(validationBase.image).then(validityChecker.success, function(errorCode) {
                        self._itemError(errorCode + "ImageError", name, file);
                        validityChecker.failure();
                    });
                } else {
                    validityChecker.success();
                }
                return validityChecker;
            },
            _wrapCallbacks: function() {
                var self, safeCallback, prop;
                self = this;
                safeCallback = function(name, callback, args) {
                    var errorMsg;
                    try {
                        return callback.apply(self, args);
                    } catch (exception) {
                        errorMsg = exception.message || exception.toString();
                        self.log("Caught exception in '" + name + "' callback - " + errorMsg, "error");
                    }
                };
                for (prop in this._options.callbacks) {
                    (function() {
                        var callbackName, callbackFunc;
                        callbackName = prop;
                        callbackFunc = self._options.callbacks[callbackName];
                        self._options.callbacks[callbackName] = function() {
                            return safeCallback(callbackName, callbackFunc, arguments);
                        };
                    })();
                }
            }
        };
    })();
    (function() {
        "use strict";
        qq.FineUploaderBasic = function(o) {
            var self = this;
            this._options = {
                debug: false,
                button: null,
                multiple: true,
                maxConnections: 3,
                disableCancelForFormUploads: false,
                autoUpload: true,
                request: {
                    customHeaders: {},
                    endpoint: "/server/upload",
                    filenameParam: "qqfilename",
                    forceMultipart: true,
                    inputName: "qqfile",
                    method: "POST",
                    params: {},
                    paramsInBody: true,
                    totalFileSizeName: "qqtotalfilesize",
                    uuidName: "qquuid"
                },
                validation: {
                    allowedExtensions: [],
                    sizeLimit: 0,
                    minSizeLimit: 0,
                    itemLimit: 0,
                    stopOnFirstInvalidFile: true,
                    acceptFiles: null,
                    image: {
                        maxHeight: 0,
                        maxWidth: 0,
                        minHeight: 0,
                        minWidth: 0
                    },
                    allowEmpty: false
                },
                callbacks: {
                    onSubmit: function(id, name) {},
                    onSubmitted: function(id, name) {},
                    onComplete: function(id, name, responseJSON, maybeXhr) {},
                    onAllComplete: function(successful, failed) {},
                    onCancel: function(id, name) {},
                    onUpload: function(id, name) {},
                    onUploadChunk: function(id, name, chunkData) {},
                    onUploadChunkSuccess: function(id, chunkData, responseJSON, xhr) {},
                    onResume: function(id, fileName, chunkData) {},
                    onProgress: function(id, name, loaded, total) {},
                    onTotalProgress: function(loaded, total) {},
                    onError: function(id, name, reason, maybeXhrOrXdr) {},
                    onAutoRetry: function(id, name, attemptNumber) {},
                    onManualRetry: function(id, name) {},
                    onValidateBatch: function(fileOrBlobData) {},
                    onValidate: function(fileOrBlobData) {},
                    onSubmitDelete: function(id) {},
                    onDelete: function(id) {},
                    onDeleteComplete: function(id, xhrOrXdr, isError) {},
                    onPasteReceived: function(blob) {},
                    onStatusChange: function(id, oldStatus, newStatus) {},
                    onSessionRequestComplete: function(response, success, xhrOrXdr) {}
                },
                messages: {
                    typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
                    sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
                    minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
                    emptyError: "{file} is empty, please select files again without it.",
                    noFilesError: "No files to upload.",
                    tooManyItemsError: "Too many items ({netItems}) would be uploaded.  Item limit is {itemLimit}.",
                    maxHeightImageError: "Image is too tall.",
                    maxWidthImageError: "Image is too wide.",
                    minHeightImageError: "Image is not tall enough.",
                    minWidthImageError: "Image is not wide enough.",
                    retryFailTooManyItems: "Retry failed - you have reached your file limit.",
                    onLeave: "The files are being uploaded, if you leave now the upload will be canceled.",
                    unsupportedBrowserIos8Safari: "Unrecoverable error - this browser does not permit file uploading of any kind due to serious bugs in iOS8 Safari.  Please use iOS8 Chrome until Apple fixes these issues."
                },
                retry: {
                    enableAuto: false,
                    maxAutoAttempts: 3,
                    autoAttemptDelay: 5,
                    preventRetryResponseProperty: "preventRetry"
                },
                classes: {
                    buttonHover: "qq-upload-button-hover",
                    buttonFocus: "qq-upload-button-focus"
                },
                chunking: {
                    enabled: false,
                    concurrent: {
                        enabled: false
                    },
                    mandatory: false,
                    paramNames: {
                        partIndex: "qqpartindex",
                        partByteOffset: "qqpartbyteoffset",
                        chunkSize: "qqchunksize",
                        totalFileSize: "qqtotalfilesize",
                        totalParts: "qqtotalparts"
                    },
                    partSize: 2e6,
                    success: {
                        endpoint: null
                    }
                },
                resume: {
                    enabled: false,
                    recordsExpireIn: 7,
                    paramNames: {
                        resuming: "qqresume"
                    }
                },
                formatFileName: function(fileOrBlobName) {
                    return fileOrBlobName;
                },
                text: {
                    defaultResponseError: "Upload failure reason unknown",
                    fileInputTitle: "file input",
                    sizeSymbols: [ "kB", "MB", "GB", "TB", "PB", "EB" ]
                },
                deleteFile: {
                    enabled: false,
                    method: "DELETE",
                    endpoint: "/server/upload",
                    customHeaders: {},
                    params: {}
                },
                cors: {
                    expected: false,
                    sendCredentials: false,
                    allowXdr: false
                },
                blobs: {
                    defaultName: "misc_data"
                },
                paste: {
                    targetElement: null,
                    defaultName: "pasted_image"
                },
                camera: {
                    ios: false,
                    button: null
                },
                extraButtons: [],
                session: {
                    endpoint: null,
                    params: {},
                    customHeaders: {},
                    refreshOnReset: true
                },
                form: {
                    element: "qq-form",
                    autoUpload: false,
                    interceptSubmit: true
                },
                scaling: {
                    customResizer: null,
                    sendOriginal: true,
                    orient: true,
                    defaultType: null,
                    defaultQuality: 80,
                    failureText: "Failed to scale",
                    includeExif: false,
                    sizes: []
                },
                workarounds: {
                    iosEmptyVideos: true,
                    ios8SafariUploads: true,
                    ios8BrowserCrash: false
                }
            };
            qq.extend(this._options, o, true);
            this._buttons = [];
            this._extraButtonSpecs = {};
            this._buttonIdsForFileIds = [];
            this._wrapCallbacks();
            this._disposeSupport = new qq.DisposeSupport();
            this._storedIds = [];
            this._autoRetries = [];
            this._retryTimeouts = [];
            this._preventRetries = [];
            this._thumbnailUrls = [];
            this._netUploadedOrQueued = 0;
            this._netUploaded = 0;
            this._uploadData = this._createUploadDataTracker();
            this._initFormSupportAndParams();
            this._customHeadersStore = this._createStore(this._options.request.customHeaders);
            this._deleteFileCustomHeadersStore = this._createStore(this._options.deleteFile.customHeaders);
            this._deleteFileParamsStore = this._createStore(this._options.deleteFile.params);
            this._endpointStore = this._createStore(this._options.request.endpoint);
            this._deleteFileEndpointStore = this._createStore(this._options.deleteFile.endpoint);
            this._handler = this._createUploadHandler();
            this._deleteHandler = qq.DeleteFileAjaxRequester && this._createDeleteHandler();
            if (this._options.button) {
                this._defaultButtonId = this._createUploadButton({
                    element: this._options.button,
                    title: this._options.text.fileInputTitle
                }).getButtonId();
            }
            this._generateExtraButtonSpecs();
            this._handleCameraAccess();
            if (this._options.paste.targetElement) {
                if (qq.PasteSupport) {
                    this._pasteHandler = this._createPasteHandler();
                } else {
                    this.log("Paste support module not found", "error");
                }
            }
            this._preventLeaveInProgress();
            this._imageGenerator = qq.ImageGenerator && new qq.ImageGenerator(qq.bind(this.log, this));
            this._refreshSessionData();
            this._succeededSinceLastAllComplete = [];
            this._failedSinceLastAllComplete = [];
            this._scaler = qq.Scaler && new qq.Scaler(this._options.scaling, qq.bind(this.log, this)) || {};
            if (this._scaler.enabled) {
                this._customNewFileHandler = qq.bind(this._scaler.handleNewFile, this._scaler);
            }
            if (qq.TotalProgress && qq.supportedFeatures.progressBar) {
                this._totalProgress = new qq.TotalProgress(qq.bind(this._onTotalProgress, this), function(id) {
                    var entry = self._uploadData.retrieve({
                        id: id
                    });
                    return entry && entry.size || 0;
                });
            }
            this._currentItemLimit = this._options.validation.itemLimit;
        };
        qq.FineUploaderBasic.prototype = qq.basePublicApi;
        qq.extend(qq.FineUploaderBasic.prototype, qq.basePrivateApi);
    })();
    qq.AjaxRequester = function(o) {
        "use strict";
        var log, shouldParamsBeInQueryString, queue = [], requestData = {}, options = {
            acceptHeader: null,
            validMethods: [ "PATCH", "POST", "PUT" ],
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            maxConnections: 3,
            customHeaders: {},
            endpointStore: {},
            paramsStore: {},
            mandatedParams: {},
            allowXRequestedWithAndCacheControl: true,
            successfulResponseCodes: {
                DELETE: [ 200, 202, 204 ],
                PATCH: [ 200, 201, 202, 203, 204 ],
                POST: [ 200, 201, 202, 203, 204 ],
                PUT: [ 200, 201, 202, 203, 204 ],
                GET: [ 200 ]
            },
            cors: {
                expected: false,
                sendCredentials: false
            },
            log: function(str, level) {},
            onSend: function(id) {},
            onComplete: function(id, xhrOrXdr, isError) {},
            onProgress: null
        };
        qq.extend(options, o);
        log = options.log;
        if (qq.indexOf(options.validMethods, options.method) < 0) {
            throw new Error("'" + options.method + "' is not a supported method for this type of request!");
        }
        function isSimpleMethod() {
            return qq.indexOf([ "GET", "POST", "HEAD" ], options.method) >= 0;
        }
        function containsNonSimpleHeaders(headers) {
            var containsNonSimple = false;
            qq.each(containsNonSimple, function(idx, header) {
                if (qq.indexOf([ "Accept", "Accept-Language", "Content-Language", "Content-Type" ], header) < 0) {
                    containsNonSimple = true;
                    return false;
                }
            });
            return containsNonSimple;
        }
        function isXdr(xhr) {
            return options.cors.expected && xhr.withCredentials === undefined;
        }
        function getCorsAjaxTransport() {
            var xhrOrXdr;
            if (window.XMLHttpRequest || window.ActiveXObject) {
                xhrOrXdr = qq.createXhrInstance();
                if (xhrOrXdr.withCredentials === undefined) {
                    xhrOrXdr = new XDomainRequest();
                    xhrOrXdr.onload = function() {};
                    xhrOrXdr.onerror = function() {};
                    xhrOrXdr.ontimeout = function() {};
                    xhrOrXdr.onprogress = function() {};
                }
            }
            return xhrOrXdr;
        }
        function getXhrOrXdr(id, suppliedXhr) {
            var xhrOrXdr = requestData[id].xhr;
            if (!xhrOrXdr) {
                if (suppliedXhr) {
                    xhrOrXdr = suppliedXhr;
                } else {
                    if (options.cors.expected) {
                        xhrOrXdr = getCorsAjaxTransport();
                    } else {
                        xhrOrXdr = qq.createXhrInstance();
                    }
                }
                requestData[id].xhr = xhrOrXdr;
            }
            return xhrOrXdr;
        }
        function dequeue(id) {
            var i = qq.indexOf(queue, id), max = options.maxConnections, nextId;
            delete requestData[id];
            queue.splice(i, 1);
            if (queue.length >= max && i < max) {
                nextId = queue[max - 1];
                sendRequest(nextId);
            }
        }
        function onComplete(id, xdrError) {
            var xhr = getXhrOrXdr(id), method = options.method, isError = xdrError === true;
            dequeue(id);
            if (isError) {
                log(method + " request for " + id + " has failed", "error");
            } else if (!isXdr(xhr) && !isResponseSuccessful(xhr.status)) {
                isError = true;
                log(method + " request for " + id + " has failed - response code " + xhr.status, "error");
            }
            options.onComplete(id, xhr, isError);
        }
        function getParams(id) {
            var onDemandParams = requestData[id].additionalParams, mandatedParams = options.mandatedParams, params;
            if (options.paramsStore.get) {
                params = options.paramsStore.get(id);
            }
            if (onDemandParams) {
                qq.each(onDemandParams, function(name, val) {
                    params = params || {};
                    params[name] = val;
                });
            }
            if (mandatedParams) {
                qq.each(mandatedParams, function(name, val) {
                    params = params || {};
                    params[name] = val;
                });
            }
            return params;
        }
        function sendRequest(id, optXhr) {
            var xhr = getXhrOrXdr(id, optXhr), method = options.method, params = getParams(id), payload = requestData[id].payload, url;
            options.onSend(id);
            url = createUrl(id, params, requestData[id].additionalQueryParams);
            if (isXdr(xhr)) {
                xhr.onload = getXdrLoadHandler(id);
                xhr.onerror = getXdrErrorHandler(id);
            } else {
                xhr.onreadystatechange = getXhrReadyStateChangeHandler(id);
            }
            registerForUploadProgress(id);
            xhr.open(method, url, true);
            if (options.cors.expected && options.cors.sendCredentials && !isXdr(xhr)) {
                xhr.withCredentials = true;
            }
            setHeaders(id);
            log("Sending " + method + " request for " + id);
            if (payload) {
                xhr.send(payload);
            } else if (shouldParamsBeInQueryString || !params) {
                xhr.send();
            } else if (params && options.contentType && options.contentType.toLowerCase().indexOf("application/x-www-form-urlencoded") >= 0) {
                xhr.send(qq.obj2url(params, ""));
            } else if (params && options.contentType && options.contentType.toLowerCase().indexOf("application/json") >= 0) {
                xhr.send(JSON.stringify(params));
            } else {
                xhr.send(params);
            }
            return xhr;
        }
        function createUrl(id, params, additionalQueryParams) {
            var endpoint = options.endpointStore.get(id), addToPath = requestData[id].addToPath;
            if (addToPath != undefined) {
                endpoint += "/" + addToPath;
            }
            if (shouldParamsBeInQueryString && params) {
                endpoint = qq.obj2url(params, endpoint);
            }
            if (additionalQueryParams) {
                endpoint = qq.obj2url(additionalQueryParams, endpoint);
            }
            return endpoint;
        }
        function getXhrReadyStateChangeHandler(id) {
            return function() {
                if (getXhrOrXdr(id).readyState === 4) {
                    onComplete(id);
                }
            };
        }
        function registerForUploadProgress(id) {
            var onProgress = options.onProgress;
            if (onProgress) {
                getXhrOrXdr(id).upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        onProgress(id, e.loaded, e.total);
                    }
                };
            }
        }
        function getXdrLoadHandler(id) {
            return function() {
                onComplete(id);
            };
        }
        function getXdrErrorHandler(id) {
            return function() {
                onComplete(id, true);
            };
        }
        function setHeaders(id) {
            var xhr = getXhrOrXdr(id), customHeaders = options.customHeaders, onDemandHeaders = requestData[id].additionalHeaders || {}, method = options.method, allHeaders = {};
            if (!isXdr(xhr)) {
                options.acceptHeader && xhr.setRequestHeader("Accept", options.acceptHeader);
                if (options.allowXRequestedWithAndCacheControl) {
                    if (!options.cors.expected || (!isSimpleMethod() || containsNonSimpleHeaders(customHeaders))) {
                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        xhr.setRequestHeader("Cache-Control", "no-cache");
                    }
                }
                if (options.contentType && (method === "POST" || method === "PUT")) {
                    xhr.setRequestHeader("Content-Type", options.contentType);
                }
                qq.extend(allHeaders, qq.isFunction(customHeaders) ? customHeaders(id) : customHeaders);
                qq.extend(allHeaders, onDemandHeaders);
                qq.each(allHeaders, function(name, val) {
                    xhr.setRequestHeader(name, val);
                });
            }
        }
        function isResponseSuccessful(responseCode) {
            return qq.indexOf(options.successfulResponseCodes[options.method], responseCode) >= 0;
        }
        function prepareToSend(id, optXhr, addToPath, additionalParams, additionalQueryParams, additionalHeaders, payload) {
            requestData[id] = {
                addToPath: addToPath,
                additionalParams: additionalParams,
                additionalQueryParams: additionalQueryParams,
                additionalHeaders: additionalHeaders,
                payload: payload
            };
            var len = queue.push(id);
            if (len <= options.maxConnections) {
                return sendRequest(id, optXhr);
            }
        }
        shouldParamsBeInQueryString = options.method === "GET" || options.method === "DELETE";
        qq.extend(this, {
            initTransport: function(id) {
                var path, params, headers, payload, cacheBuster, additionalQueryParams;
                return {
                    withPath: function(appendToPath) {
                        path = appendToPath;
                        return this;
                    },
                    withParams: function(additionalParams) {
                        params = additionalParams;
                        return this;
                    },
                    withQueryParams: function(_additionalQueryParams_) {
                        additionalQueryParams = _additionalQueryParams_;
                        return this;
                    },
                    withHeaders: function(additionalHeaders) {
                        headers = additionalHeaders;
                        return this;
                    },
                    withPayload: function(thePayload) {
                        payload = thePayload;
                        return this;
                    },
                    withCacheBuster: function() {
                        cacheBuster = true;
                        return this;
                    },
                    send: function(optXhr) {
                        if (cacheBuster && qq.indexOf([ "GET", "DELETE" ], options.method) >= 0) {
                            params.qqtimestamp = new Date().getTime();
                        }
                        return prepareToSend(id, optXhr, path, params, additionalQueryParams, headers, payload);
                    }
                };
            },
            canceled: function(id) {
                dequeue(id);
            }
        });
    };
    qq.UploadHandler = function(spec) {
        "use strict";
        var proxy = spec.proxy, fileState = {}, onCancel = proxy.onCancel, getName = proxy.getName;
        qq.extend(this, {
            add: function(id, fileItem) {
                fileState[id] = fileItem;
                fileState[id].temp = {};
            },
            cancel: function(id) {
                var self = this, cancelFinalizationEffort = new qq.Promise(), onCancelRetVal = onCancel(id, getName(id), cancelFinalizationEffort);
                onCancelRetVal.then(function() {
                    if (self.isValid(id)) {
                        fileState[id].canceled = true;
                        self.expunge(id);
                    }
                    cancelFinalizationEffort.success();
                });
            },
            expunge: function(id) {
                delete fileState[id];
            },
            getThirdPartyFileId: function(id) {
                return fileState[id].key;
            },
            isValid: function(id) {
                return fileState[id] !== undefined;
            },
            reset: function() {
                fileState = {};
            },
            _getFileState: function(id) {
                return fileState[id];
            },
            _setThirdPartyFileId: function(id, thirdPartyFileId) {
                fileState[id].key = thirdPartyFileId;
            },
            _wasCanceled: function(id) {
                return !!fileState[id].canceled;
            }
        });
    };
    qq.UploadHandlerController = function(o, namespace) {
        "use strict";
        var controller = this, chunkingPossible = false, concurrentChunkingPossible = false, chunking, preventRetryResponse, log, handler, options = {
            paramsStore: {},
            maxConnections: 3,
            chunking: {
                enabled: false,
                multiple: {
                    enabled: false
                }
            },
            log: function(str, level) {},
            onProgress: function(id, fileName, loaded, total) {},
            onComplete: function(id, fileName, response, xhr) {},
            onCancel: function(id, fileName) {},
            onUploadPrep: function(id) {},
            onUpload: function(id, fileName) {},
            onUploadChunk: function(id, fileName, chunkData) {},
            onUploadChunkSuccess: function(id, chunkData, response, xhr) {},
            onAutoRetry: function(id, fileName, response, xhr) {},
            onResume: function(id, fileName, chunkData) {},
            onUuidChanged: function(id, newUuid) {},
            getName: function(id) {},
            setSize: function(id, newSize) {},
            isQueued: function(id) {},
            getIdsInProxyGroup: function(id) {},
            getIdsInBatch: function(id) {}
        }, chunked = {
            done: function(id, chunkIdx, response, xhr) {
                var chunkData = handler._getChunkData(id, chunkIdx);
                handler._getFileState(id).attemptingResume = false;
                delete handler._getFileState(id).temp.chunkProgress[chunkIdx];
                handler._getFileState(id).loaded += chunkData.size;
                options.onUploadChunkSuccess(id, handler._getChunkDataForCallback(chunkData), response, xhr);
            },
            finalize: function(id) {
                var size = options.getSize(id), name = options.getName(id);
                log("All chunks have been uploaded for " + id + " - finalizing....");
                handler.finalizeChunks(id).then(function(response, xhr) {
                    log("Finalize successful for " + id);
                    var normaizedResponse = upload.normalizeResponse(response, true);
                    options.onProgress(id, name, size, size);
                    handler._maybeDeletePersistedChunkData(id);
                    upload.cleanup(id, normaizedResponse, xhr);
                }, function(response, xhr) {
                    var normaizedResponse = upload.normalizeResponse(response, false);
                    log("Problem finalizing chunks for file ID " + id + " - " + normaizedResponse.error, "error");
                    if (normaizedResponse.reset) {
                        chunked.reset(id);
                    }
                    if (!options.onAutoRetry(id, name, normaizedResponse, xhr)) {
                        upload.cleanup(id, normaizedResponse, xhr);
                    }
                });
            },
            handleFailure: function(chunkIdx, id, response, xhr) {
                var name = options.getName(id);
                log("Chunked upload request failed for " + id + ", chunk " + chunkIdx);
                handler.clearCachedChunk(id, chunkIdx);
                var responseToReport = upload.normalizeResponse(response, false), inProgressIdx;
                if (responseToReport.reset) {
                    chunked.reset(id);
                } else {
                    inProgressIdx = qq.indexOf(handler._getFileState(id).chunking.inProgress, chunkIdx);
                    if (inProgressIdx >= 0) {
                        handler._getFileState(id).chunking.inProgress.splice(inProgressIdx, 1);
                        handler._getFileState(id).chunking.remaining.unshift(chunkIdx);
                    }
                }
                if (!handler._getFileState(id).temp.ignoreFailure) {
                    if (concurrentChunkingPossible) {
                        handler._getFileState(id).temp.ignoreFailure = true;
                        log(qq.format("Going to attempt to abort these chunks: {}. These are currently in-progress: {}.", JSON.stringify(Object.keys(handler._getXhrs(id))), JSON.stringify(handler._getFileState(id).chunking.inProgress)));
                        qq.each(handler._getXhrs(id), function(ckid, ckXhr) {
                            log(qq.format("Attempting to abort file {}.{}. XHR readyState {}. ", id, ckid, ckXhr.readyState));
                            ckXhr.abort();
                            ckXhr._cancelled = true;
                        });
                        handler.moveInProgressToRemaining(id);
                        connectionManager.free(id, true);
                    }
                    if (!options.onAutoRetry(id, name, responseToReport, xhr)) {
                        upload.cleanup(id, responseToReport, xhr);
                    }
                }
            },
            hasMoreParts: function(id) {
                return !!handler._getFileState(id).chunking.remaining.length;
            },
            nextPart: function(id) {
                var nextIdx = handler._getFileState(id).chunking.remaining.shift();
                if (nextIdx >= handler._getTotalChunks(id)) {
                    nextIdx = null;
                }
                return nextIdx;
            },
            reset: function(id) {
                log("Server or callback has ordered chunking effort to be restarted on next attempt for item ID " + id, "error");
                handler._maybeDeletePersistedChunkData(id);
                handler.reevaluateChunking(id);
                handler._getFileState(id).loaded = 0;
            },
            sendNext: function(id) {
                var size = options.getSize(id), name = options.getName(id), chunkIdx = chunked.nextPart(id), chunkData = handler._getChunkData(id, chunkIdx), resuming = handler._getFileState(id).attemptingResume, inProgressChunks = handler._getFileState(id).chunking.inProgress || [];
                if (handler._getFileState(id).loaded == null) {
                    handler._getFileState(id).loaded = 0;
                }
                if (resuming && options.onResume(id, name, chunkData) === false) {
                    chunked.reset(id);
                    chunkIdx = chunked.nextPart(id);
                    chunkData = handler._getChunkData(id, chunkIdx);
                    resuming = false;
                }
                if (chunkIdx == null && inProgressChunks.length === 0) {
                    chunked.finalize(id);
                } else {
                    log(qq.format("Sending chunked upload request for item {}.{}, bytes {}-{} of {}.", id, chunkIdx, chunkData.start + 1, chunkData.end, size));
                    options.onUploadChunk(id, name, handler._getChunkDataForCallback(chunkData));
                    inProgressChunks.push(chunkIdx);
                    handler._getFileState(id).chunking.inProgress = inProgressChunks;
                    if (concurrentChunkingPossible) {
                        connectionManager.open(id, chunkIdx);
                    }
                    if (concurrentChunkingPossible && connectionManager.available() && handler._getFileState(id).chunking.remaining.length) {
                        chunked.sendNext(id);
                    }
                    if (chunkData.blob.size === 0) {
                        log(qq.format("Chunk {} for file {} will not be uploaded, zero sized chunk.", chunkIdx, id), "error");
                        chunked.handleFailure(chunkIdx, id, "File is no longer available", null);
                    } else {
                        handler.uploadChunk(id, chunkIdx, resuming).then(function success(response, xhr) {
                            log("Chunked upload request succeeded for " + id + ", chunk " + chunkIdx);
                            handler.clearCachedChunk(id, chunkIdx);
                            var inProgressChunks = handler._getFileState(id).chunking.inProgress || [], responseToReport = upload.normalizeResponse(response, true), inProgressChunkIdx = qq.indexOf(inProgressChunks, chunkIdx);
                            log(qq.format("Chunk {} for file {} uploaded successfully.", chunkIdx, id));
                            chunked.done(id, chunkIdx, responseToReport, xhr);
                            if (inProgressChunkIdx >= 0) {
                                inProgressChunks.splice(inProgressChunkIdx, 1);
                            }
                            handler._maybePersistChunkedState(id);
                            if (!chunked.hasMoreParts(id) && inProgressChunks.length === 0) {
                                chunked.finalize(id);
                            } else if (chunked.hasMoreParts(id)) {
                                chunked.sendNext(id);
                            } else {
                                log(qq.format("File ID {} has no more chunks to send and these chunk indexes are still marked as in-progress: {}", id, JSON.stringify(inProgressChunks)));
                            }
                        }, function failure(response, xhr) {
                            chunked.handleFailure(chunkIdx, id, response, xhr);
                        }).done(function() {
                            handler.clearXhr(id, chunkIdx);
                        });
                    }
                }
            }
        }, connectionManager = {
            _open: [],
            _openChunks: {},
            _waiting: [],
            available: function() {
                var max = options.maxConnections, openChunkEntriesCount = 0, openChunksCount = 0;
                qq.each(connectionManager._openChunks, function(fileId, openChunkIndexes) {
                    openChunkEntriesCount++;
                    openChunksCount += openChunkIndexes.length;
                });
                return max - (connectionManager._open.length - openChunkEntriesCount + openChunksCount);
            },
            free: function(id, dontAllowNext) {
                var allowNext = !dontAllowNext, waitingIndex = qq.indexOf(connectionManager._waiting, id), connectionsIndex = qq.indexOf(connectionManager._open, id), nextId;
                delete connectionManager._openChunks[id];
                if (upload.getProxyOrBlob(id) instanceof qq.BlobProxy) {
                    log("Generated blob upload has ended for " + id + ", disposing generated blob.");
                    delete handler._getFileState(id).file;
                }
                if (waitingIndex >= 0) {
                    connectionManager._waiting.splice(waitingIndex, 1);
                } else if (allowNext && connectionsIndex >= 0) {
                    connectionManager._open.splice(connectionsIndex, 1);
                    nextId = connectionManager._waiting.shift();
                    if (nextId >= 0) {
                        connectionManager._open.push(nextId);
                        upload.start(nextId);
                    }
                }
            },
            getWaitingOrConnected: function() {
                var waitingOrConnected = [];
                qq.each(connectionManager._openChunks, function(fileId, chunks) {
                    if (chunks && chunks.length) {
                        waitingOrConnected.push(parseInt(fileId));
                    }
                });
                qq.each(connectionManager._open, function(idx, fileId) {
                    if (!connectionManager._openChunks[fileId]) {
                        waitingOrConnected.push(parseInt(fileId));
                    }
                });
                waitingOrConnected = waitingOrConnected.concat(connectionManager._waiting);
                return waitingOrConnected;
            },
            isUsingConnection: function(id) {
                return qq.indexOf(connectionManager._open, id) >= 0;
            },
            open: function(id, chunkIdx) {
                if (chunkIdx == null) {
                    connectionManager._waiting.push(id);
                }
                if (connectionManager.available()) {
                    if (chunkIdx == null) {
                        connectionManager._waiting.pop();
                        connectionManager._open.push(id);
                    } else {
                        (function() {
                            var openChunksEntry = connectionManager._openChunks[id] || [];
                            openChunksEntry.push(chunkIdx);
                            connectionManager._openChunks[id] = openChunksEntry;
                        })();
                    }
                    return true;
                }
                return false;
            },
            reset: function() {
                connectionManager._waiting = [];
                connectionManager._open = [];
            }
        }, simple = {
            send: function(id, name) {
                handler._getFileState(id).loaded = 0;
                log("Sending simple upload request for " + id);
                handler.uploadFile(id).then(function(response, optXhr) {
                    log("Simple upload request succeeded for " + id);
                    var responseToReport = upload.normalizeResponse(response, true), size = options.getSize(id);
                    options.onProgress(id, name, size, size);
                    upload.maybeNewUuid(id, responseToReport);
                    upload.cleanup(id, responseToReport, optXhr);
                }, function(response, optXhr) {
                    log("Simple upload request failed for " + id);
                    var responseToReport = upload.normalizeResponse(response, false);
                    if (!options.onAutoRetry(id, name, responseToReport, optXhr)) {
                        upload.cleanup(id, responseToReport, optXhr);
                    }
                });
            }
        }, upload = {
            cancel: function(id) {
                log("Cancelling " + id);
                options.paramsStore.remove(id);
                connectionManager.free(id);
            },
            cleanup: function(id, response, optXhr) {
                var name = options.getName(id);
                options.onComplete(id, name, response, optXhr);
                if (handler._getFileState(id)) {
                    handler._clearXhrs && handler._clearXhrs(id);
                }
                connectionManager.free(id);
            },
            getProxyOrBlob: function(id) {
                return handler.getProxy && handler.getProxy(id) || handler.getFile && handler.getFile(id);
            },
            initHandler: function() {
                var handlerType = namespace ? qq[namespace] : qq.traditional, handlerModuleSubtype = qq.supportedFeatures.ajaxUploading ? "Xhr" : "Form";
                handler = new handlerType[handlerModuleSubtype + "UploadHandler"](options, {
                    getDataByUuid: options.getDataByUuid,
                    getName: options.getName,
                    getSize: options.getSize,
                    getUuid: options.getUuid,
                    log: log,
                    onCancel: options.onCancel,
                    onProgress: options.onProgress,
                    onUuidChanged: options.onUuidChanged
                });
                if (handler._removeExpiredChunkingRecords) {
                    handler._removeExpiredChunkingRecords();
                }
            },
            isDeferredEligibleForUpload: function(id) {
                return options.isQueued(id);
            },
            maybeDefer: function(id, blob) {
                if (blob && !handler.getFile(id) && blob instanceof qq.BlobProxy) {
                    options.onUploadPrep(id);
                    log("Attempting to generate a blob on-demand for " + id);
                    blob.create().then(function(generatedBlob) {
                        log("Generated an on-demand blob for " + id);
                        handler.updateBlob(id, generatedBlob);
                        options.setSize(id, generatedBlob.size);
                        handler.reevaluateChunking(id);
                        upload.maybeSendDeferredFiles(id);
                    }, function(errorMessage) {
                        var errorResponse = {};
                        if (errorMessage) {
                            errorResponse.error = errorMessage;
                        }
                        log(qq.format("Failed to generate blob for ID {}.  Error message: {}.", id, errorMessage), "error");
                        options.onComplete(id, options.getName(id), qq.extend(errorResponse, preventRetryResponse), null);
                        upload.maybeSendDeferredFiles(id);
                        connectionManager.free(id);
                    });
                } else {
                    return upload.maybeSendDeferredFiles(id);
                }
                return false;
            },
            maybeSendDeferredFiles: function(id) {
                var idsInGroup = options.getIdsInProxyGroup(id), uploadedThisId = false;
                if (idsInGroup && idsInGroup.length) {
                    log("Maybe ready to upload proxy group file " + id);
                    qq.each(idsInGroup, function(idx, idInGroup) {
                        if (upload.isDeferredEligibleForUpload(idInGroup) && !!handler.getFile(idInGroup)) {
                            uploadedThisId = idInGroup === id;
                            upload.now(idInGroup);
                        } else if (upload.isDeferredEligibleForUpload(idInGroup)) {
                            return false;
                        }
                    });
                } else {
                    uploadedThisId = true;
                    upload.now(id);
                }
                return uploadedThisId;
            },
            maybeNewUuid: function(id, response) {
                if (response.newUuid !== undefined) {
                    options.onUuidChanged(id, response.newUuid);
                }
            },
            normalizeResponse: function(originalResponse, successful) {
                var response = originalResponse;
                if (!qq.isObject(originalResponse)) {
                    response = {};
                    if (qq.isString(originalResponse) && !successful) {
                        response.error = originalResponse;
                    }
                }
                response.success = successful;
                return response;
            },
            now: function(id) {
                var name = options.getName(id);
                if (!controller.isValid(id)) {
                    throw new qq.Error(id + " is not a valid file ID to upload!");
                }
                options.onUpload(id, name);
                if (chunkingPossible && handler._shouldChunkThisFile(id)) {
                    chunked.sendNext(id);
                } else {
                    simple.send(id, name);
                }
            },
            start: function(id) {
                var blobToUpload = upload.getProxyOrBlob(id);
                if (blobToUpload) {
                    return upload.maybeDefer(id, blobToUpload);
                } else {
                    upload.now(id);
                    return true;
                }
            }
        };
        qq.extend(this, {
            add: function(id, file) {
                handler.add.apply(this, arguments);
            },
            upload: function(id) {
                if (connectionManager.open(id)) {
                    return upload.start(id);
                }
                return false;
            },
            retry: function(id) {
                if (concurrentChunkingPossible) {
                    handler._getFileState(id).temp.ignoreFailure = false;
                }
                if (connectionManager.isUsingConnection(id)) {
                    return upload.start(id);
                } else {
                    return controller.upload(id);
                }
            },
            cancel: function(id) {
                var cancelRetVal = handler.cancel(id);
                if (qq.isGenericPromise(cancelRetVal)) {
                    cancelRetVal.then(function() {
                        upload.cancel(id);
                    });
                } else if (cancelRetVal !== false) {
                    upload.cancel(id);
                }
            },
            cancelAll: function() {
                var waitingOrConnected = connectionManager.getWaitingOrConnected(), i;
                if (waitingOrConnected.length) {
                    for (i = waitingOrConnected.length - 1; i >= 0; i--) {
                        controller.cancel(waitingOrConnected[i]);
                    }
                }
                connectionManager.reset();
            },
            getFile: function(id) {
                if (handler.getProxy && handler.getProxy(id)) {
                    return handler.getProxy(id).referenceBlob;
                }
                return handler.getFile && handler.getFile(id);
            },
            isProxied: function(id) {
                return !!(handler.getProxy && handler.getProxy(id));
            },
            getInput: function(id) {
                if (handler.getInput) {
                    return handler.getInput(id);
                }
            },
            reset: function() {
                log("Resetting upload handler");
                controller.cancelAll();
                connectionManager.reset();
                handler.reset();
            },
            expunge: function(id) {
                if (controller.isValid(id)) {
                    return handler.expunge(id);
                }
            },
            isValid: function(id) {
                return handler.isValid(id);
            },
            getResumableFilesData: function() {
                if (handler.getResumableFilesData) {
                    return handler.getResumableFilesData();
                }
                return [];
            },
            getThirdPartyFileId: function(id) {
                if (controller.isValid(id)) {
                    return handler.getThirdPartyFileId(id);
                }
            },
            pause: function(id) {
                if (controller.isResumable(id) && handler.pause && controller.isValid(id) && handler.pause(id)) {
                    connectionManager.free(id);
                    handler.moveInProgressToRemaining(id);
                    return true;
                }
                return false;
            },
            isResumable: function(id) {
                return !!handler.isResumable && handler.isResumable(id);
            }
        });
        qq.extend(options, o);
        log = options.log;
        chunkingPossible = options.chunking.enabled && qq.supportedFeatures.chunking;
        concurrentChunkingPossible = chunkingPossible && options.chunking.concurrent.enabled;
        preventRetryResponse = function() {
            var response = {};
            response[options.preventRetryParam] = true;
            return response;
        }();
        upload.initHandler();
    };
    qq.WindowReceiveMessage = function(o) {
        "use strict";
        var options = {
            log: function(message, level) {}
        }, callbackWrapperDetachers = {};
        qq.extend(options, o);
        qq.extend(this, {
            receiveMessage: function(id, callback) {
                var onMessageCallbackWrapper = function(event) {
                    callback(event.data);
                };
                if (window.postMessage) {
                    callbackWrapperDetachers[id] = qq(window).attach("message", onMessageCallbackWrapper);
                } else {
                    log("iframe message passing not supported in this browser!", "error");
                }
            },
            stopReceivingMessages: function(id) {
                if (window.postMessage) {
                    var detacher = callbackWrapperDetachers[id];
                    if (detacher) {
                        detacher();
                    }
                }
            }
        });
    };
    qq.FormUploadHandler = function(spec) {
        "use strict";
        var options = spec.options, handler = this, proxy = spec.proxy, formHandlerInstanceId = qq.getUniqueId(), onloadCallbacks = {}, detachLoadEvents = {}, postMessageCallbackTimers = {}, isCors = options.isCors, inputName = options.inputName, getUuid = proxy.getUuid, log = proxy.log, corsMessageReceiver = new qq.WindowReceiveMessage({
            log: log
        });
        function expungeFile(id) {
            delete detachLoadEvents[id];
            if (isCors) {
                clearTimeout(postMessageCallbackTimers[id]);
                delete postMessageCallbackTimers[id];
                corsMessageReceiver.stopReceivingMessages(id);
            }
            var iframe = document.getElementById(handler._getIframeName(id));
            if (iframe) {
                iframe.setAttribute("src", "javascript:false;");
                qq(iframe).remove();
            }
        }
        function getFileIdForIframeName(iframeName) {
            return iframeName.split("_")[0];
        }
        function initIframeForUpload(name) {
            var iframe = qq.toElement("<iframe src='javascript:false;' name='" + name + "' />");
            iframe.setAttribute("id", name);
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            return iframe;
        }
        function registerPostMessageCallback(iframe, callback) {
            var iframeName = iframe.id, fileId = getFileIdForIframeName(iframeName), uuid = getUuid(fileId);
            onloadCallbacks[uuid] = callback;
            detachLoadEvents[fileId] = qq(iframe).attach("load", function() {
                if (handler.getInput(fileId)) {
                    log("Received iframe load event for CORS upload request (iframe name " + iframeName + ")");
                    postMessageCallbackTimers[iframeName] = setTimeout(function() {
                        var errorMessage = "No valid message received from loaded iframe for iframe name " + iframeName;
                        log(errorMessage, "error");
                        callback({
                            error: errorMessage
                        });
                    }, 1e3);
                }
            });
            corsMessageReceiver.receiveMessage(iframeName, function(message) {
                log("Received the following window message: '" + message + "'");
                var fileId = getFileIdForIframeName(iframeName), response = handler._parseJsonResponse(message), uuid = response.uuid, onloadCallback;
                if (uuid && onloadCallbacks[uuid]) {
                    log("Handling response for iframe name " + iframeName);
                    clearTimeout(postMessageCallbackTimers[iframeName]);
                    delete postMessageCallbackTimers[iframeName];
                    handler._detachLoadEvent(iframeName);
                    onloadCallback = onloadCallbacks[uuid];
                    delete onloadCallbacks[uuid];
                    corsMessageReceiver.stopReceivingMessages(iframeName);
                    onloadCallback(response);
                } else if (!uuid) {
                    log("'" + message + "' does not contain a UUID - ignoring.");
                }
            });
        }
        qq.extend(this, new qq.UploadHandler(spec));
        qq.override(this, function(super_) {
            return {
                add: function(id, fileInput) {
                    super_.add(id, {
                        input: fileInput
                    });
                    fileInput.setAttribute("name", inputName);
                    if (fileInput.parentNode) {
                        qq(fileInput).remove();
                    }
                },
                expunge: function(id) {
                    expungeFile(id);
                    super_.expunge(id);
                },
                isValid: function(id) {
                    return super_.isValid(id) && handler._getFileState(id).input !== undefined;
                }
            };
        });
        qq.extend(this, {
            getInput: function(id) {
                return handler._getFileState(id).input;
            },
            _attachLoadEvent: function(iframe, callback) {
                var responseDescriptor;
                if (isCors) {
                    registerPostMessageCallback(iframe, callback);
                } else {
                    detachLoadEvents[iframe.id] = qq(iframe).attach("load", function() {
                        log("Received response for " + iframe.id);
                        if (!iframe.parentNode) {
                            return;
                        }
                        try {
                            if (iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.innerHTML == "false") {
                                return;
                            }
                        } catch (error) {
                            log("Error when attempting to access iframe during handling of upload response (" + error.message + ")", "error");
                            responseDescriptor = {
                                success: false
                            };
                        }
                        callback(responseDescriptor);
                    });
                }
            },
            _createIframe: function(id) {
                var iframeName = handler._getIframeName(id);
                return initIframeForUpload(iframeName);
            },
            _detachLoadEvent: function(id) {
                if (detachLoadEvents[id] !== undefined) {
                    detachLoadEvents[id]();
                    delete detachLoadEvents[id];
                }
            },
            _getIframeName: function(fileId) {
                return fileId + "_" + formHandlerInstanceId;
            },
            _initFormForUpload: function(spec) {
                var method = spec.method, endpoint = spec.endpoint, params = spec.params, paramsInBody = spec.paramsInBody, targetName = spec.targetName, form = qq.toElement("<form method='" + method + "' enctype='multipart/form-data'></form>"), url = endpoint;
                if (paramsInBody) {
                    qq.obj2Inputs(params, form);
                } else {
                    url = qq.obj2url(params, endpoint);
                }
                form.setAttribute("action", url);
                form.setAttribute("target", targetName);
                form.style.display = "none";
                document.body.appendChild(form);
                return form;
            },
            _parseJsonResponse: function(innerHtmlOrMessage) {
                var response = {};
                try {
                    response = qq.parseJson(innerHtmlOrMessage);
                } catch (error) {
                    log("Error when attempting to parse iframe upload response (" + error.message + ")", "error");
                }
                return response;
            }
        });
    };
    qq.XhrUploadHandler = function(spec) {
        "use strict";
        var handler = this, namespace = spec.options.namespace, proxy = spec.proxy, chunking = spec.options.chunking, resume = spec.options.resume, chunkFiles = chunking && spec.options.chunking.enabled && qq.supportedFeatures.chunking, resumeEnabled = resume && spec.options.resume.enabled && chunkFiles && qq.supportedFeatures.resume, getName = proxy.getName, getSize = proxy.getSize, getUuid = proxy.getUuid, getEndpoint = proxy.getEndpoint, getDataByUuid = proxy.getDataByUuid, onUuidChanged = proxy.onUuidChanged, onProgress = proxy.onProgress, log = proxy.log;
        function abort(id) {
            qq.each(handler._getXhrs(id), function(xhrId, xhr) {
                var ajaxRequester = handler._getAjaxRequester(id, xhrId);
                xhr.onreadystatechange = null;
                xhr.upload.onprogress = null;
                xhr.abort();
                ajaxRequester && ajaxRequester.canceled && ajaxRequester.canceled(id);
            });
        }
        qq.extend(this, new qq.UploadHandler(spec));
        qq.override(this, function(super_) {
            return {
                add: function(id, blobOrProxy) {
                    if (qq.isFile(blobOrProxy) || qq.isBlob(blobOrProxy)) {
                        super_.add(id, {
                            file: blobOrProxy
                        });
                    } else if (blobOrProxy instanceof qq.BlobProxy) {
                        super_.add(id, {
                            proxy: blobOrProxy
                        });
                    } else {
                        throw new Error("Passed obj is not a File, Blob, or proxy");
                    }
                    handler._initTempState(id);
                    resumeEnabled && handler._maybePrepareForResume(id);
                },
                expunge: function(id) {
                    abort(id);
                    handler._maybeDeletePersistedChunkData(id);
                    handler._clearXhrs(id);
                    super_.expunge(id);
                }
            };
        });
        qq.extend(this, {
            clearCachedChunk: function(id, chunkIdx) {
                delete handler._getFileState(id).temp.cachedChunks[chunkIdx];
            },
            clearXhr: function(id, chunkIdx) {
                var tempState = handler._getFileState(id).temp;
                if (tempState.xhrs) {
                    delete tempState.xhrs[chunkIdx];
                }
                if (tempState.ajaxRequesters) {
                    delete tempState.ajaxRequesters[chunkIdx];
                }
            },
            finalizeChunks: function(id, responseParser) {
                var lastChunkIdx = handler._getTotalChunks(id) - 1, xhr = handler._getXhr(id, lastChunkIdx);
                if (responseParser) {
                    return new qq.Promise().success(responseParser(xhr), xhr);
                }
                return new qq.Promise().success({}, xhr);
            },
            getFile: function(id) {
                return handler.isValid(id) && handler._getFileState(id).file;
            },
            getProxy: function(id) {
                return handler.isValid(id) && handler._getFileState(id).proxy;
            },
            getResumableFilesData: function() {
                var resumableFilesData = [];
                handler._iterateResumeRecords(function(key, uploadData) {
                    handler.moveInProgressToRemaining(null, uploadData.chunking.inProgress, uploadData.chunking.remaining);
                    var data = {
                        name: uploadData.name,
                        remaining: uploadData.chunking.remaining,
                        size: uploadData.size,
                        uuid: uploadData.uuid
                    };
                    if (uploadData.key) {
                        data.key = uploadData.key;
                    }
                    resumableFilesData.push(data);
                });
                return resumableFilesData;
            },
            isResumable: function(id) {
                return !!chunking && handler.isValid(id) && !handler._getFileState(id).notResumable;
            },
            moveInProgressToRemaining: function(id, optInProgress, optRemaining) {
                var inProgress = optInProgress || handler._getFileState(id).chunking.inProgress, remaining = optRemaining || handler._getFileState(id).chunking.remaining;
                if (inProgress) {
                    log(qq.format("Moving these chunks from in-progress {}, to remaining.", JSON.stringify(inProgress)));
                    inProgress.reverse();
                    qq.each(inProgress, function(idx, chunkIdx) {
                        remaining.unshift(chunkIdx);
                    });
                    inProgress.length = 0;
                }
            },
            pause: function(id) {
                if (handler.isValid(id)) {
                    log(qq.format("Aborting XHR upload for {} '{}' due to pause instruction.", id, getName(id)));
                    handler._getFileState(id).paused = true;
                    abort(id);
                    return true;
                }
            },
            reevaluateChunking: function(id) {
                if (chunking && handler.isValid(id)) {
                    var state = handler._getFileState(id), totalChunks, i;
                    delete state.chunking;
                    state.chunking = {};
                    totalChunks = handler._getTotalChunks(id);
                    if (totalChunks > 1 || chunking.mandatory) {
                        state.chunking.enabled = true;
                        state.chunking.parts = totalChunks;
                        state.chunking.remaining = [];
                        for (i = 0; i < totalChunks; i++) {
                            state.chunking.remaining.push(i);
                        }
                        handler._initTempState(id);
                    } else {
                        state.chunking.enabled = false;
                    }
                }
            },
            updateBlob: function(id, newBlob) {
                if (handler.isValid(id)) {
                    handler._getFileState(id).file = newBlob;
                }
            },
            _clearXhrs: function(id) {
                var tempState = handler._getFileState(id).temp;
                qq.each(tempState.ajaxRequesters, function(chunkId) {
                    delete tempState.ajaxRequesters[chunkId];
                });
                qq.each(tempState.xhrs, function(chunkId) {
                    delete tempState.xhrs[chunkId];
                });
            },
            _createXhr: function(id, optChunkIdx) {
                return handler._registerXhr(id, optChunkIdx, qq.createXhrInstance());
            },
            _getAjaxRequester: function(id, optChunkIdx) {
                var chunkIdx = optChunkIdx == null ? -1 : optChunkIdx;
                return handler._getFileState(id).temp.ajaxRequesters[chunkIdx];
            },
            _getChunkData: function(id, chunkIndex) {
                var chunkSize = chunking.partSize, fileSize = getSize(id), fileOrBlob = handler.getFile(id), startBytes = chunkSize * chunkIndex, endBytes = startBytes + chunkSize >= fileSize ? fileSize : startBytes + chunkSize, totalChunks = handler._getTotalChunks(id), cachedChunks = this._getFileState(id).temp.cachedChunks, blob = cachedChunks[chunkIndex] || qq.sliceBlob(fileOrBlob, startBytes, endBytes);
                cachedChunks[chunkIndex] = blob;
                return {
                    part: chunkIndex,
                    start: startBytes,
                    end: endBytes,
                    count: totalChunks,
                    blob: blob,
                    size: endBytes - startBytes
                };
            },
            _getChunkDataForCallback: function(chunkData) {
                return {
                    partIndex: chunkData.part,
                    startByte: chunkData.start + 1,
                    endByte: chunkData.end,
                    totalParts: chunkData.count
                };
            },
            _getLocalStorageId: function(id) {
                var formatVersion = "5.0", name = getName(id), size = getSize(id), chunkSize = chunking.partSize, endpoint = getEndpoint(id);
                return qq.format("qq{}resume{}-{}-{}-{}-{}", namespace, formatVersion, name, size, chunkSize, endpoint);
            },
            _getMimeType: function(id) {
                return handler.getFile(id).type;
            },
            _getPersistableData: function(id) {
                return handler._getFileState(id).chunking;
            },
            _getTotalChunks: function(id) {
                if (chunking) {
                    var fileSize = getSize(id), chunkSize = chunking.partSize;
                    return Math.ceil(fileSize / chunkSize);
                }
            },
            _getXhr: function(id, optChunkIdx) {
                var chunkIdx = optChunkIdx == null ? -1 : optChunkIdx;
                return handler._getFileState(id).temp.xhrs[chunkIdx];
            },
            _getXhrs: function(id) {
                return handler._getFileState(id).temp.xhrs;
            },
            _iterateResumeRecords: function(callback) {
                if (resumeEnabled) {
                    qq.each(localStorage, function(key, item) {
                        if (key.indexOf(qq.format("qq{}resume", namespace)) === 0) {
                            var uploadData = JSON.parse(item);
                            callback(key, uploadData);
                        }
                    });
                }
            },
            _initTempState: function(id) {
                handler._getFileState(id).temp = {
                    ajaxRequesters: {},
                    chunkProgress: {},
                    xhrs: {},
                    cachedChunks: {}
                };
            },
            _markNotResumable: function(id) {
                handler._getFileState(id).notResumable = true;
            },
            _maybeDeletePersistedChunkData: function(id) {
                var localStorageId;
                if (resumeEnabled && handler.isResumable(id)) {
                    localStorageId = handler._getLocalStorageId(id);
                    if (localStorageId && localStorage.getItem(localStorageId)) {
                        localStorage.removeItem(localStorageId);
                        return true;
                    }
                }
                return false;
            },
            _maybePrepareForResume: function(id) {
                var state = handler._getFileState(id), localStorageId, persistedData;
                if (resumeEnabled && state.key === undefined) {
                    localStorageId = handler._getLocalStorageId(id);
                    persistedData = localStorage.getItem(localStorageId);
                    if (persistedData) {
                        persistedData = JSON.parse(persistedData);
                        if (getDataByUuid(persistedData.uuid)) {
                            handler._markNotResumable(id);
                        } else {
                            log(qq.format("Identified file with ID {} and name of {} as resumable.", id, getName(id)));
                            onUuidChanged(id, persistedData.uuid);
                            state.key = persistedData.key;
                            state.chunking = persistedData.chunking;
                            state.loaded = persistedData.loaded;
                            state.attemptingResume = true;
                            handler.moveInProgressToRemaining(id);
                        }
                    }
                }
            },
            _maybePersistChunkedState: function(id) {
                var state = handler._getFileState(id), localStorageId, persistedData;
                if (resumeEnabled && handler.isResumable(id)) {
                    localStorageId = handler._getLocalStorageId(id);
                    persistedData = {
                        name: getName(id),
                        size: getSize(id),
                        uuid: getUuid(id),
                        key: state.key,
                        chunking: state.chunking,
                        loaded: state.loaded,
                        lastUpdated: Date.now()
                    };
                    try {
                        localStorage.setItem(localStorageId, JSON.stringify(persistedData));
                    } catch (error) {
                        log(qq.format("Unable to save resume data for '{}' due to error: '{}'.", id, error.toString()), "warn");
                    }
                }
            },
            _registerProgressHandler: function(id, chunkIdx, chunkSize) {
                var xhr = handler._getXhr(id, chunkIdx), name = getName(id), progressCalculator = {
                    simple: function(loaded, total) {
                        var fileSize = getSize(id);
                        if (loaded === total) {
                            onProgress(id, name, fileSize, fileSize);
                        } else {
                            onProgress(id, name, loaded >= fileSize ? fileSize - 1 : loaded, fileSize);
                        }
                    },
                    chunked: function(loaded, total) {
                        var chunkProgress = handler._getFileState(id).temp.chunkProgress, totalSuccessfullyLoadedForFile = handler._getFileState(id).loaded, loadedForRequest = loaded, totalForRequest = total, totalFileSize = getSize(id), estActualChunkLoaded = loadedForRequest - (totalForRequest - chunkSize), totalLoadedForFile = totalSuccessfullyLoadedForFile;
                        chunkProgress[chunkIdx] = estActualChunkLoaded;
                        qq.each(chunkProgress, function(chunkIdx, chunkLoaded) {
                            totalLoadedForFile += chunkLoaded;
                        });
                        onProgress(id, name, totalLoadedForFile, totalFileSize);
                    }
                };
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var type = chunkSize == null ? "simple" : "chunked";
                        progressCalculator[type](e.loaded, e.total);
                    }
                };
            },
            _registerXhr: function(id, optChunkIdx, xhr, optAjaxRequester) {
                var xhrsId = optChunkIdx == null ? -1 : optChunkIdx, tempState = handler._getFileState(id).temp;
                tempState.xhrs = tempState.xhrs || {};
                tempState.ajaxRequesters = tempState.ajaxRequesters || {};
                tempState.xhrs[xhrsId] = xhr;
                if (optAjaxRequester) {
                    tempState.ajaxRequesters[xhrsId] = optAjaxRequester;
                }
                return xhr;
            },
            _removeExpiredChunkingRecords: function() {
                var expirationDays = resume.recordsExpireIn;
                handler._iterateResumeRecords(function(key, uploadData) {
                    var expirationDate = new Date(uploadData.lastUpdated);
                    expirationDate.setDate(expirationDate.getDate() + expirationDays);
                    if (expirationDate.getTime() <= Date.now()) {
                        log("Removing expired resume record with key " + key);
                        localStorage.removeItem(key);
                    }
                });
            },
            _shouldChunkThisFile: function(id) {
                var state = handler._getFileState(id);
                if (!state.chunking) {
                    handler.reevaluateChunking(id);
                }
                return state.chunking.enabled;
            }
        });
    };
    qq.DeleteFileAjaxRequester = function(o) {
        "use strict";
        var requester, options = {
            method: "DELETE",
            uuidParamName: "qquuid",
            endpointStore: {},
            maxConnections: 3,
            customHeaders: function(id) {
                return {};
            },
            paramsStore: {},
            cors: {
                expected: false,
                sendCredentials: false
            },
            log: function(str, level) {},
            onDelete: function(id) {},
            onDeleteComplete: function(id, xhrOrXdr, isError) {}
        };
        qq.extend(options, o);
        function getMandatedParams() {
            if (options.method.toUpperCase() === "POST") {
                return {
                    _method: "DELETE"
                };
            }
            return {};
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: [ "POST", "DELETE" ],
            method: options.method,
            endpointStore: options.endpointStore,
            paramsStore: options.paramsStore,
            mandatedParams: getMandatedParams(),
            maxConnections: options.maxConnections,
            customHeaders: function(id) {
                return options.customHeaders.get(id);
            },
            log: options.log,
            onSend: options.onDelete,
            onComplete: options.onDeleteComplete,
            cors: options.cors
        }));
        qq.extend(this, {
            sendDelete: function(id, uuid, additionalMandatedParams) {
                var additionalOptions = additionalMandatedParams || {};
                options.log("Submitting delete file request for " + id);
                if (options.method === "DELETE") {
                    requester.initTransport(id).withPath(uuid).withParams(additionalOptions).send();
                } else {
                    additionalOptions[options.uuidParamName] = uuid;
                    requester.initTransport(id).withParams(additionalOptions).send();
                }
            }
        });
    };
    (function() {
        function detectSubsampling(img) {
            var iw = img.naturalWidth, ih = img.naturalHeight, canvas = document.createElement("canvas"), ctx;
            if (iw * ih > 1024 * 1024) {
                canvas.width = canvas.height = 1;
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, -iw + 1, 0);
                return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
            } else {
                return false;
            }
        }
        function detectVerticalSquash(img, iw, ih) {
            var canvas = document.createElement("canvas"), sy = 0, ey = ih, py = ih, ctx, data, alpha, ratio;
            canvas.width = 1;
            canvas.height = ih;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            data = ctx.getImageData(0, 0, 1, ih).data;
            while (py > sy) {
                alpha = data[(py - 1) * 4 + 3];
                if (alpha === 0) {
                    ey = py;
                } else {
                    sy = py;
                }
                py = ey + sy >> 1;
            }
            ratio = py / ih;
            return ratio === 0 ? 1 : ratio;
        }
        function renderImageToDataURL(img, blob, options, doSquash) {
            var canvas = document.createElement("canvas"), mime = options.mime || "image/jpeg", promise = new qq.Promise();
            renderImageToCanvas(img, blob, canvas, options, doSquash).then(function() {
                promise.success(canvas.toDataURL(mime, options.quality || .8));
            });
            return promise;
        }
        function maybeCalculateDownsampledDimensions(spec) {
            var maxPixels = 5241e3;
            if (!qq.ios()) {
                throw new qq.Error("Downsampled dimensions can only be reliably calculated for iOS!");
            }
            if (spec.origHeight * spec.origWidth > maxPixels) {
                return {
                    newHeight: Math.round(Math.sqrt(maxPixels * (spec.origHeight / spec.origWidth))),
                    newWidth: Math.round(Math.sqrt(maxPixels * (spec.origWidth / spec.origHeight)))
                };
            }
        }
        function renderImageToCanvas(img, blob, canvas, options, doSquash) {
            var iw = img.naturalWidth, ih = img.naturalHeight, width = options.width, height = options.height, ctx = canvas.getContext("2d"), promise = new qq.Promise(), modifiedDimensions;
            ctx.save();
            if (options.resize) {
                return renderImageToCanvasWithCustomResizer({
                    blob: blob,
                    canvas: canvas,
                    image: img,
                    imageHeight: ih,
                    imageWidth: iw,
                    orientation: options.orientation,
                    resize: options.resize,
                    targetHeight: height,
                    targetWidth: width
                });
            }
            if (!qq.supportedFeatures.unlimitedScaledImageSize) {
                modifiedDimensions = maybeCalculateDownsampledDimensions({
                    origWidth: width,
                    origHeight: height
                });
                if (modifiedDimensions) {
                    qq.log(qq.format("Had to reduce dimensions due to device limitations from {}w / {}h to {}w / {}h", width, height, modifiedDimensions.newWidth, modifiedDimensions.newHeight), "warn");
                    width = modifiedDimensions.newWidth;
                    height = modifiedDimensions.newHeight;
                }
            }
            transformCoordinate(canvas, width, height, options.orientation);
            if (qq.ios()) {
                (function() {
                    if (detectSubsampling(img)) {
                        iw /= 2;
                        ih /= 2;
                    }
                    var d = 1024, tmpCanvas = document.createElement("canvas"), vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1, dw = Math.ceil(d * width / iw), dh = Math.ceil(d * height / ih / vertSquashRatio), sy = 0, dy = 0, tmpCtx, sx, dx;
                    tmpCanvas.width = tmpCanvas.height = d;
                    tmpCtx = tmpCanvas.getContext("2d");
                    while (sy < ih) {
                        sx = 0;
                        dx = 0;
                        while (sx < iw) {
                            tmpCtx.clearRect(0, 0, d, d);
                            tmpCtx.drawImage(img, -sx, -sy);
                            ctx.drawImage(tmpCanvas, 0, 0, d, d, dx, dy, dw, dh);
                            sx += d;
                            dx += dw;
                        }
                        sy += d;
                        dy += dh;
                    }
                    ctx.restore();
                    tmpCanvas = tmpCtx = null;
                })();
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            canvas.qqImageRendered && canvas.qqImageRendered();
            promise.success();
            return promise;
        }
        function renderImageToCanvasWithCustomResizer(resizeInfo) {
            var blob = resizeInfo.blob, image = resizeInfo.image, imageHeight = resizeInfo.imageHeight, imageWidth = resizeInfo.imageWidth, orientation = resizeInfo.orientation, promise = new qq.Promise(), resize = resizeInfo.resize, sourceCanvas = document.createElement("canvas"), sourceCanvasContext = sourceCanvas.getContext("2d"), targetCanvas = resizeInfo.canvas, targetHeight = resizeInfo.targetHeight, targetWidth = resizeInfo.targetWidth;
            transformCoordinate(sourceCanvas, imageWidth, imageHeight, orientation);
            targetCanvas.height = targetHeight;
            targetCanvas.width = targetWidth;
            sourceCanvasContext.drawImage(image, 0, 0);
            resize({
                blob: blob,
                height: targetHeight,
                image: image,
                sourceCanvas: sourceCanvas,
                targetCanvas: targetCanvas,
                width: targetWidth
            }).then(function success() {
                targetCanvas.qqImageRendered && targetCanvas.qqImageRendered();
                promise.success();
            }, promise.failure);
            return promise;
        }
        function transformCoordinate(canvas, width, height, orientation) {
            switch (orientation) {
              case 5:
              case 6:
              case 7:
              case 8:
                canvas.width = height;
                canvas.height = width;
                break;

              default:
                canvas.width = width;
                canvas.height = height;
            }
            var ctx = canvas.getContext("2d");
            switch (orientation) {
              case 2:
                ctx.translate(width, 0);
                ctx.scale(-1, 1);
                break;

              case 3:
                ctx.translate(width, height);
                ctx.rotate(Math.PI);
                break;

              case 4:
                ctx.translate(0, height);
                ctx.scale(1, -1);
                break;

              case 5:
                ctx.rotate(.5 * Math.PI);
                ctx.scale(1, -1);
                break;

              case 6:
                ctx.rotate(.5 * Math.PI);
                ctx.translate(0, -height);
                break;

              case 7:
                ctx.rotate(.5 * Math.PI);
                ctx.translate(width, -height);
                ctx.scale(-1, 1);
                break;

              case 8:
                ctx.rotate(-.5 * Math.PI);
                ctx.translate(-width, 0);
                break;

              default:
                break;
            }
        }
        function MegaPixImage(srcImage, errorCallback) {
            var self = this;
            if (window.Blob && srcImage instanceof Blob) {
                (function() {
                    var img = new Image(), URL = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
                    if (!URL) {
                        throw Error("No createObjectURL function found to create blob url");
                    }
                    img.src = URL.createObjectURL(srcImage);
                    self.blob = srcImage;
                    srcImage = img;
                })();
            }
            if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
                srcImage.onload = function() {
                    var listeners = self.imageLoadListeners;
                    if (listeners) {
                        self.imageLoadListeners = null;
                        setTimeout(function() {
                            for (var i = 0, len = listeners.length; i < len; i++) {
                                listeners[i]();
                            }
                        }, 0);
                    }
                };
                srcImage.onerror = errorCallback;
                this.imageLoadListeners = [];
            }
            this.srcImage = srcImage;
        }
        MegaPixImage.prototype.render = function(target, options) {
            options = options || {};
            var self = this, imgWidth = this.srcImage.naturalWidth, imgHeight = this.srcImage.naturalHeight, width = options.width, height = options.height, maxWidth = options.maxWidth, maxHeight = options.maxHeight, doSquash = !this.blob || this.blob.type === "image/jpeg", tagName = target.tagName.toLowerCase(), opt;
            if (this.imageLoadListeners) {
                this.imageLoadListeners.push(function() {
                    self.render(target, options);
                });
                return;
            }
            if (width && !height) {
                height = imgHeight * width / imgWidth << 0;
            } else if (height && !width) {
                width = imgWidth * height / imgHeight << 0;
            } else {
                width = imgWidth;
                height = imgHeight;
            }
            if (maxWidth && width > maxWidth) {
                width = maxWidth;
                height = imgHeight * width / imgWidth << 0;
            }
            if (maxHeight && height > maxHeight) {
                height = maxHeight;
                width = imgWidth * height / imgHeight << 0;
            }
            opt = {
                width: width,
                height: height
            }, qq.each(options, function(optionsKey, optionsValue) {
                opt[optionsKey] = optionsValue;
            });
            if (tagName === "img") {
                (function() {
                    var oldTargetSrc = target.src;
                    renderImageToDataURL(self.srcImage, self.blob, opt, doSquash).then(function(dataUri) {
                        target.src = dataUri;
                        oldTargetSrc === target.src && target.onload();
                    });
                })();
            } else if (tagName === "canvas") {
                renderImageToCanvas(this.srcImage, this.blob, target, opt, doSquash);
            }
            if (typeof this.onrender === "function") {
                this.onrender(target);
            }
        };
        qq.MegaPixImage = MegaPixImage;
    })();
    qq.ImageGenerator = function(log) {
        "use strict";
        function isImg(el) {
            return el.tagName.toLowerCase() === "img";
        }
        function isCanvas(el) {
            return el.tagName.toLowerCase() === "canvas";
        }
        function isImgCorsSupported() {
            return new Image().crossOrigin !== undefined;
        }
        function isCanvasSupported() {
            var canvas = document.createElement("canvas");
            return canvas.getContext && canvas.getContext("2d");
        }
        function determineMimeOfFileName(nameWithPath) {
            var pathSegments = nameWithPath.split("/"), name = pathSegments[pathSegments.length - 1].split("?")[0], extension = qq.getExtension(name);
            extension = extension && extension.toLowerCase();
            switch (extension) {
              case "jpeg":
              case "jpg":
                return "image/jpeg";

              case "png":
                return "image/png";

              case "bmp":
                return "image/bmp";

              case "gif":
                return "image/gif";

              case "tiff":
              case "tif":
                return "image/tiff";
            }
        }
        function isCrossOrigin(url) {
            var targetAnchor = document.createElement("a"), targetProtocol, targetHostname, targetPort;
            targetAnchor.href = url;
            targetProtocol = targetAnchor.protocol;
            targetPort = targetAnchor.port;
            targetHostname = targetAnchor.hostname;
            if (targetProtocol.toLowerCase() !== window.location.protocol.toLowerCase()) {
                return true;
            }
            if (targetHostname.toLowerCase() !== window.location.hostname.toLowerCase()) {
                return true;
            }
            if (targetPort !== window.location.port && !qq.ie()) {
                return true;
            }
            return false;
        }
        function registerImgLoadListeners(img, promise) {
            img.onload = function() {
                img.onload = null;
                img.onerror = null;
                promise.success(img);
            };
            img.onerror = function() {
                img.onload = null;
                img.onerror = null;
                log("Problem drawing thumbnail!", "error");
                promise.failure(img, "Problem drawing thumbnail!");
            };
        }
        function registerCanvasDrawImageListener(canvas, promise) {
            canvas.qqImageRendered = function() {
                promise.success(canvas);
            };
        }
        function registerThumbnailRenderedListener(imgOrCanvas, promise) {
            var registered = isImg(imgOrCanvas) || isCanvas(imgOrCanvas);
            if (isImg(imgOrCanvas)) {
                registerImgLoadListeners(imgOrCanvas, promise);
            } else if (isCanvas(imgOrCanvas)) {
                registerCanvasDrawImageListener(imgOrCanvas, promise);
            } else {
                promise.failure(imgOrCanvas);
                log(qq.format("Element container of type {} is not supported!", imgOrCanvas.tagName), "error");
            }
            return registered;
        }
        function draw(fileOrBlob, container, options) {
            var drawPreview = new qq.Promise(), identifier = new qq.Identify(fileOrBlob, log), maxSize = options.maxSize, orient = options.orient == null ? true : options.orient, megapixErrorHandler = function() {
                container.onerror = null;
                container.onload = null;
                log("Could not render preview, file may be too large!", "error");
                drawPreview.failure(container, "Browser cannot render image!");
            };
            identifier.isPreviewable().then(function(mime) {
                var dummyExif = {
                    parse: function() {
                        return new qq.Promise().success();
                    }
                }, exif = orient ? new qq.Exif(fileOrBlob, log) : dummyExif, mpImg = new qq.MegaPixImage(fileOrBlob, megapixErrorHandler);
                if (registerThumbnailRenderedListener(container, drawPreview)) {
                    exif.parse().then(function(exif) {
                        var orientation = exif && exif.Orientation;
                        mpImg.render(container, {
                            maxWidth: maxSize,
                            maxHeight: maxSize,
                            orientation: orientation,
                            mime: mime,
                            resize: options.customResizeFunction
                        });
                    }, function(failureMsg) {
                        log(qq.format("EXIF data could not be parsed ({}).  Assuming orientation = 1.", failureMsg));
                        mpImg.render(container, {
                            maxWidth: maxSize,
                            maxHeight: maxSize,
                            mime: mime,
                            resize: options.customResizeFunction
                        });
                    });
                }
            }, function() {
                log("Not previewable");
                drawPreview.failure(container, "Not previewable");
            });
            return drawPreview;
        }
        function drawOnCanvasOrImgFromUrl(url, canvasOrImg, draw, maxSize, customResizeFunction) {
            var tempImg = new Image(), tempImgRender = new qq.Promise();
            registerThumbnailRenderedListener(tempImg, tempImgRender);
            if (isCrossOrigin(url)) {
                tempImg.crossOrigin = "anonymous";
            }
            tempImg.src = url;
            tempImgRender.then(function rendered() {
                registerThumbnailRenderedListener(canvasOrImg, draw);
                var mpImg = new qq.MegaPixImage(tempImg);
                mpImg.render(canvasOrImg, {
                    maxWidth: maxSize,
                    maxHeight: maxSize,
                    mime: determineMimeOfFileName(url),
                    resize: customResizeFunction
                });
            }, draw.failure);
        }
        function drawOnImgFromUrlWithCssScaling(url, img, draw, maxSize) {
            registerThumbnailRenderedListener(img, draw);
            qq(img).css({
                maxWidth: maxSize + "px",
                maxHeight: maxSize + "px"
            });
            img.src = url;
        }
        function drawFromUrl(url, container, options) {
            var draw = new qq.Promise(), scale = options.scale, maxSize = scale ? options.maxSize : null;
            if (scale && isImg(container)) {
                if (isCanvasSupported()) {
                    if (isCrossOrigin(url) && !isImgCorsSupported()) {
                        drawOnImgFromUrlWithCssScaling(url, container, draw, maxSize);
                    } else {
                        drawOnCanvasOrImgFromUrl(url, container, draw, maxSize);
                    }
                } else {
                    drawOnImgFromUrlWithCssScaling(url, container, draw, maxSize);
                }
            } else if (isCanvas(container)) {
                drawOnCanvasOrImgFromUrl(url, container, draw, maxSize);
            } else if (registerThumbnailRenderedListener(container, draw)) {
                container.src = url;
            }
            return draw;
        }
        qq.extend(this, {
            generate: function(fileBlobOrUrl, container, options) {
                if (qq.isString(fileBlobOrUrl)) {
                    log("Attempting to update thumbnail based on server response.");
                    return drawFromUrl(fileBlobOrUrl, container, options || {});
                } else {
                    log("Attempting to draw client-side image preview.");
                    return draw(fileBlobOrUrl, container, options || {});
                }
            }
        });
        this._testing = {};
        this._testing.isImg = isImg;
        this._testing.isCanvas = isCanvas;
        this._testing.isCrossOrigin = isCrossOrigin;
        this._testing.determineMimeOfFileName = determineMimeOfFileName;
    };
    qq.Exif = function(fileOrBlob, log) {
        "use strict";
        var TAG_IDS = [ 274 ], TAG_INFO = {
            274: {
                name: "Orientation",
                bytes: 2
            }
        };
        function parseLittleEndian(hex) {
            var result = 0, pow = 0;
            while (hex.length > 0) {
                result += parseInt(hex.substring(0, 2), 16) * Math.pow(2, pow);
                hex = hex.substring(2, hex.length);
                pow += 8;
            }
            return result;
        }
        function seekToApp1(offset, promise) {
            var theOffset = offset, thePromise = promise;
            if (theOffset === undefined) {
                theOffset = 2;
                thePromise = new qq.Promise();
            }
            qq.readBlobToHex(fileOrBlob, theOffset, 4).then(function(hex) {
                var match = /^ffe([0-9])/.exec(hex), segmentLength;
                if (match) {
                    if (match[1] !== "1") {
                        segmentLength = parseInt(hex.slice(4, 8), 16);
                        seekToApp1(theOffset + segmentLength + 2, thePromise);
                    } else {
                        thePromise.success(theOffset);
                    }
                } else {
                    thePromise.failure("No EXIF header to be found!");
                }
            });
            return thePromise;
        }
        function getApp1Offset() {
            var promise = new qq.Promise();
            qq.readBlobToHex(fileOrBlob, 0, 6).then(function(hex) {
                if (hex.indexOf("ffd8") !== 0) {
                    promise.failure("Not a valid JPEG!");
                } else {
                    seekToApp1().then(function(offset) {
                        promise.success(offset);
                    }, function(error) {
                        promise.failure(error);
                    });
                }
            });
            return promise;
        }
        function isLittleEndian(app1Start) {
            var promise = new qq.Promise();
            qq.readBlobToHex(fileOrBlob, app1Start + 10, 2).then(function(hex) {
                promise.success(hex === "4949");
            });
            return promise;
        }
        function getDirEntryCount(app1Start, littleEndian) {
            var promise = new qq.Promise();
            qq.readBlobToHex(fileOrBlob, app1Start + 18, 2).then(function(hex) {
                if (littleEndian) {
                    return promise.success(parseLittleEndian(hex));
                } else {
                    promise.success(parseInt(hex, 16));
                }
            });
            return promise;
        }
        function getIfd(app1Start, dirEntries) {
            var offset = app1Start + 20, bytes = dirEntries * 12;
            return qq.readBlobToHex(fileOrBlob, offset, bytes);
        }
        function getDirEntries(ifdHex) {
            var entries = [], offset = 0;
            while (offset + 24 <= ifdHex.length) {
                entries.push(ifdHex.slice(offset, offset + 24));
                offset += 24;
            }
            return entries;
        }
        function getTagValues(littleEndian, dirEntries) {
            var TAG_VAL_OFFSET = 16, tagsToFind = qq.extend([], TAG_IDS), vals = {};
            qq.each(dirEntries, function(idx, entry) {
                var idHex = entry.slice(0, 4), id = littleEndian ? parseLittleEndian(idHex) : parseInt(idHex, 16), tagsToFindIdx = tagsToFind.indexOf(id), tagValHex, tagName, tagValLength;
                if (tagsToFindIdx >= 0) {
                    tagName = TAG_INFO[id].name;
                    tagValLength = TAG_INFO[id].bytes;
                    tagValHex = entry.slice(TAG_VAL_OFFSET, TAG_VAL_OFFSET + tagValLength * 2);
                    vals[tagName] = littleEndian ? parseLittleEndian(tagValHex) : parseInt(tagValHex, 16);
                    tagsToFind.splice(tagsToFindIdx, 1);
                }
                if (tagsToFind.length === 0) {
                    return false;
                }
            });
            return vals;
        }
        qq.extend(this, {
            parse: function() {
                var parser = new qq.Promise(), onParseFailure = function(message) {
                    log(qq.format("EXIF header parse failed: '{}' ", message));
                    parser.failure(message);
                };
                getApp1Offset().then(function(app1Offset) {
                    log(qq.format("Moving forward with EXIF header parsing for '{}'", fileOrBlob.name === undefined ? "blob" : fileOrBlob.name));
                    isLittleEndian(app1Offset).then(function(littleEndian) {
                        log(qq.format("EXIF Byte order is {} endian", littleEndian ? "little" : "big"));
                        getDirEntryCount(app1Offset, littleEndian).then(function(dirEntryCount) {
                            log(qq.format("Found {} APP1 directory entries", dirEntryCount));
                            getIfd(app1Offset, dirEntryCount).then(function(ifdHex) {
                                var dirEntries = getDirEntries(ifdHex), tagValues = getTagValues(littleEndian, dirEntries);
                                log("Successfully parsed some EXIF tags");
                                parser.success(tagValues);
                            }, onParseFailure);
                        }, onParseFailure);
                    }, onParseFailure);
                }, onParseFailure);
                return parser;
            }
        });
        this._testing = {};
        this._testing.parseLittleEndian = parseLittleEndian;
    };
    qq.Identify = function(fileOrBlob, log) {
        "use strict";
        function isIdentifiable(magicBytes, questionableBytes) {
            var identifiable = false, magicBytesEntries = [].concat(magicBytes);
            qq.each(magicBytesEntries, function(idx, magicBytesArrayEntry) {
                if (questionableBytes.indexOf(magicBytesArrayEntry) === 0) {
                    identifiable = true;
                    return false;
                }
            });
            return identifiable;
        }
        qq.extend(this, {
            isPreviewable: function() {
                var self = this, identifier = new qq.Promise(), previewable = false, name = fileOrBlob.name === undefined ? "blob" : fileOrBlob.name;
                log(qq.format("Attempting to determine if {} can be rendered in this browser", name));
                log("First pass: check type attribute of blob object.");
                if (this.isPreviewableSync()) {
                    log("Second pass: check for magic bytes in file header.");
                    qq.readBlobToHex(fileOrBlob, 0, 4).then(function(hex) {
                        qq.each(self.PREVIEWABLE_MIME_TYPES, function(mime, bytes) {
                            if (isIdentifiable(bytes, hex)) {
                                if (mime !== "image/tiff" || qq.supportedFeatures.tiffPreviews) {
                                    previewable = true;
                                    identifier.success(mime);
                                }
                                return false;
                            }
                        });
                        log(qq.format("'{}' is {} able to be rendered in this browser", name, previewable ? "" : "NOT"));
                        if (!previewable) {
                            identifier.failure();
                        }
                    }, function() {
                        log("Error reading file w/ name '" + name + "'.  Not able to be rendered in this browser.");
                        identifier.failure();
                    });
                } else {
                    identifier.failure();
                }
                return identifier;
            },
            isPreviewableSync: function() {
                var fileMime = fileOrBlob.type, isRecognizedImage = qq.indexOf(Object.keys(this.PREVIEWABLE_MIME_TYPES), fileMime) >= 0, previewable = false, name = fileOrBlob.name === undefined ? "blob" : fileOrBlob.name;
                if (isRecognizedImage) {
                    if (fileMime === "image/tiff") {
                        previewable = qq.supportedFeatures.tiffPreviews;
                    } else {
                        previewable = true;
                    }
                }
                !previewable && log(name + " is not previewable in this browser per the blob's type attr");
                return previewable;
            }
        });
    };
    qq.Identify.prototype.PREVIEWABLE_MIME_TYPES = {
        "image/jpeg": "ffd8ff",
        "image/gif": "474946",
        "image/png": "89504e",
        "image/bmp": "424d",
        "image/tiff": [ "49492a00", "4d4d002a" ]
    };
    qq.ImageValidation = function(blob, log) {
        "use strict";
        function hasNonZeroLimits(limits) {
            var atLeastOne = false;
            qq.each(limits, function(limit, value) {
                if (value > 0) {
                    atLeastOne = true;
                    return false;
                }
            });
            return atLeastOne;
        }
        function getWidthHeight() {
            var sizeDetermination = new qq.Promise();
            new qq.Identify(blob, log).isPreviewable().then(function() {
                var image = new Image(), url = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
                if (url) {
                    image.onerror = function() {
                        log("Cannot determine dimensions for image.  May be too large.", "error");
                        sizeDetermination.failure();
                    };
                    image.onload = function() {
                        sizeDetermination.success({
                            width: this.width,
                            height: this.height
                        });
                    };
                    image.src = url.createObjectURL(blob);
                } else {
                    log("No createObjectURL function available to generate image URL!", "error");
                    sizeDetermination.failure();
                }
            }, sizeDetermination.failure);
            return sizeDetermination;
        }
        function getFailingLimit(limits, dimensions) {
            var failingLimit;
            qq.each(limits, function(limitName, limitValue) {
                if (limitValue > 0) {
                    var limitMatcher = /(max|min)(Width|Height)/.exec(limitName), dimensionPropName = limitMatcher[2].charAt(0).toLowerCase() + limitMatcher[2].slice(1), actualValue = dimensions[dimensionPropName];
                    switch (limitMatcher[1]) {
                      case "min":
                        if (actualValue < limitValue) {
                            failingLimit = limitName;
                            return false;
                        }
                        break;

                      case "max":
                        if (actualValue > limitValue) {
                            failingLimit = limitName;
                            return false;
                        }
                        break;
                    }
                }
            });
            return failingLimit;
        }
        this.validate = function(limits) {
            var validationEffort = new qq.Promise();
            log("Attempting to validate image.");
            if (hasNonZeroLimits(limits)) {
                getWidthHeight().then(function(dimensions) {
                    var failingLimit = getFailingLimit(limits, dimensions);
                    if (failingLimit) {
                        validationEffort.failure(failingLimit);
                    } else {
                        validationEffort.success();
                    }
                }, validationEffort.success);
            } else {
                validationEffort.success();
            }
            return validationEffort;
        };
    };
    qq.Session = function(spec) {
        "use strict";
        var options = {
            endpoint: null,
            params: {},
            customHeaders: {},
            cors: {},
            addFileRecord: function(sessionData) {},
            log: function(message, level) {}
        };
        qq.extend(options, spec, true);
        function isJsonResponseValid(response) {
            if (qq.isArray(response)) {
                return true;
            }
            options.log("Session response is not an array.", "error");
        }
        function handleFileItems(fileItems, success, xhrOrXdr, promise) {
            var someItemsIgnored = false;
            success = success && isJsonResponseValid(fileItems);
            if (success) {
                qq.each(fileItems, function(idx, fileItem) {
                    if (fileItem.uuid == null) {
                        someItemsIgnored = true;
                        options.log(qq.format("Session response item {} did not include a valid UUID - ignoring.", idx), "error");
                    } else if (fileItem.name == null) {
                        someItemsIgnored = true;
                        options.log(qq.format("Session response item {} did not include a valid name - ignoring.", idx), "error");
                    } else {
                        try {
                            options.addFileRecord(fileItem);
                            return true;
                        } catch (err) {
                            someItemsIgnored = true;
                            options.log(err.message, "error");
                        }
                    }
                    return false;
                });
            }
            promise[success && !someItemsIgnored ? "success" : "failure"](fileItems, xhrOrXdr);
        }
        this.refresh = function() {
            var refreshEffort = new qq.Promise(), refreshCompleteCallback = function(response, success, xhrOrXdr) {
                handleFileItems(response, success, xhrOrXdr, refreshEffort);
            }, requesterOptions = qq.extend({}, options), requester = new qq.SessionAjaxRequester(qq.extend(requesterOptions, {
                onComplete: refreshCompleteCallback
            }));
            requester.queryServer();
            return refreshEffort;
        };
    };
    qq.SessionAjaxRequester = function(spec) {
        "use strict";
        var requester, options = {
            endpoint: null,
            customHeaders: {},
            params: {},
            cors: {
                expected: false,
                sendCredentials: false
            },
            onComplete: function(response, success, xhrOrXdr) {},
            log: function(str, level) {}
        };
        qq.extend(options, spec);
        function onComplete(id, xhrOrXdr, isError) {
            var response = null;
            if (xhrOrXdr.responseText != null) {
                try {
                    response = qq.parseJson(xhrOrXdr.responseText);
                } catch (err) {
                    options.log("Problem parsing session response: " + err.message, "error");
                    isError = true;
                }
            }
            options.onComplete(response, !isError, xhrOrXdr);
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: [ "GET" ],
            method: "GET",
            endpointStore: {
                get: function() {
                    return options.endpoint;
                }
            },
            customHeaders: options.customHeaders,
            log: options.log,
            onComplete: onComplete,
            cors: options.cors
        }));
        qq.extend(this, {
            queryServer: function() {
                var params = qq.extend({}, options.params);
                options.log("Session query request.");
                requester.initTransport("sessionRefresh").withParams(params).withCacheBuster().send();
            }
        });
    };
    qq.Scaler = function(spec, log) {
        "use strict";
        var self = this, customResizeFunction = spec.customResizer, includeOriginal = spec.sendOriginal, orient = spec.orient, defaultType = spec.defaultType, defaultQuality = spec.defaultQuality / 100, failedToScaleText = spec.failureText, includeExif = spec.includeExif, sizes = this._getSortedSizes(spec.sizes);
        qq.extend(this, {
            enabled: qq.supportedFeatures.scaling && sizes.length > 0,
            getFileRecords: function(originalFileUuid, originalFileName, originalBlobOrBlobData) {
                var self = this, records = [], originalBlob = originalBlobOrBlobData.blob ? originalBlobOrBlobData.blob : originalBlobOrBlobData, identifier = new qq.Identify(originalBlob, log);
                if (identifier.isPreviewableSync()) {
                    qq.each(sizes, function(idx, sizeRecord) {
                        var outputType = self._determineOutputType({
                            defaultType: defaultType,
                            requestedType: sizeRecord.type,
                            refType: originalBlob.type
                        });
                        records.push({
                            uuid: qq.getUniqueId(),
                            name: self._getName(originalFileName, {
                                name: sizeRecord.name,
                                type: outputType,
                                refType: originalBlob.type
                            }),
                            blob: new qq.BlobProxy(originalBlob, qq.bind(self._generateScaledImage, self, {
                                customResizeFunction: customResizeFunction,
                                maxSize: sizeRecord.maxSize,
                                orient: orient,
                                type: outputType,
                                quality: defaultQuality,
                                failedText: failedToScaleText,
                                includeExif: includeExif,
                                log: log
                            }))
                        });
                    });
                    records.push({
                        uuid: originalFileUuid,
                        name: originalFileName,
                        size: originalBlob.size,
                        blob: includeOriginal ? originalBlob : null
                    });
                } else {
                    records.push({
                        uuid: originalFileUuid,
                        name: originalFileName,
                        size: originalBlob.size,
                        blob: originalBlob
                    });
                }
                return records;
            },
            handleNewFile: function(file, name, uuid, size, fileList, batchId, uuidParamName, api) {
                var self = this, buttonId = file.qqButtonId || file.blob && file.blob.qqButtonId, scaledIds = [], originalId = null, addFileToHandler = api.addFileToHandler, uploadData = api.uploadData, paramsStore = api.paramsStore, proxyGroupId = qq.getUniqueId();
                qq.each(self.getFileRecords(uuid, name, file), function(idx, record) {
                    var blobSize = record.size, id;
                    if (record.blob instanceof qq.BlobProxy) {
                        blobSize = -1;
                    }
                    id = uploadData.addFile({
                        uuid: record.uuid,
                        name: record.name,
                        size: blobSize,
                        batchId: batchId,
                        proxyGroupId: proxyGroupId
                    });
                    if (record.blob instanceof qq.BlobProxy) {
                        scaledIds.push(id);
                    } else {
                        originalId = id;
                    }
                    if (record.blob) {
                        addFileToHandler(id, record.blob);
                        fileList.push({
                            id: id,
                            file: record.blob
                        });
                    } else {
                        uploadData.setStatus(id, qq.status.REJECTED);
                    }
                });
                if (originalId !== null) {
                    qq.each(scaledIds, function(idx, scaledId) {
                        var params = {
                            qqparentuuid: uploadData.retrieve({
                                id: originalId
                            }).uuid,
                            qqparentsize: uploadData.retrieve({
                                id: originalId
                            }).size
                        };
                        params[uuidParamName] = uploadData.retrieve({
                            id: scaledId
                        }).uuid;
                        uploadData.setParentId(scaledId, originalId);
                        paramsStore.addReadOnly(scaledId, params);
                    });
                    if (scaledIds.length) {
                        (function() {
                            var param = {};
                            param[uuidParamName] = uploadData.retrieve({
                                id: originalId
                            }).uuid;
                            paramsStore.addReadOnly(originalId, param);
                        })();
                    }
                }
            }
        });
    };
    qq.extend(qq.Scaler.prototype, {
        scaleImage: function(id, specs, api) {
            "use strict";
            if (!qq.supportedFeatures.scaling) {
                throw new qq.Error("Scaling is not supported in this browser!");
            }
            var scalingEffort = new qq.Promise(), log = api.log, file = api.getFile(id), uploadData = api.uploadData.retrieve({
                id: id
            }), name = uploadData && uploadData.name, uuid = uploadData && uploadData.uuid, scalingOptions = {
                customResizer: specs.customResizer,
                sendOriginal: false,
                orient: specs.orient,
                defaultType: specs.type || null,
                defaultQuality: specs.quality,
                failedToScaleText: "Unable to scale",
                sizes: [ {
                    name: "",
                    maxSize: specs.maxSize
                } ]
            }, scaler = new qq.Scaler(scalingOptions, log);
            if (!qq.Scaler || !qq.supportedFeatures.imagePreviews || !file) {
                scalingEffort.failure();
                log("Could not generate requested scaled image for " + id + ".  " + "Scaling is either not possible in this browser, or the file could not be located.", "error");
            } else {
                qq.bind(function() {
                    var record = scaler.getFileRecords(uuid, name, file)[0];
                    if (record && record.blob instanceof qq.BlobProxy) {
                        record.blob.create().then(scalingEffort.success, scalingEffort.failure);
                    } else {
                        log(id + " is not a scalable image!", "error");
                        scalingEffort.failure();
                    }
                }, this)();
            }
            return scalingEffort;
        },
        _determineOutputType: function(spec) {
            "use strict";
            var requestedType = spec.requestedType, defaultType = spec.defaultType, referenceType = spec.refType;
            if (!defaultType && !requestedType) {
                if (referenceType !== "image/jpeg") {
                    return "image/png";
                }
                return referenceType;
            }
            if (!requestedType) {
                return defaultType;
            }
            if (qq.indexOf(Object.keys(qq.Identify.prototype.PREVIEWABLE_MIME_TYPES), requestedType) >= 0) {
                if (requestedType === "image/tiff") {
                    return qq.supportedFeatures.tiffPreviews ? requestedType : defaultType;
                }
                return requestedType;
            }
            return defaultType;
        },
        _getName: function(originalName, scaledVersionProperties) {
            "use strict";
            var startOfExt = originalName.lastIndexOf("."), versionType = scaledVersionProperties.type || "image/png", referenceType = scaledVersionProperties.refType, scaledName = "", scaledExt = qq.getExtension(originalName), nameAppendage = "";
            if (scaledVersionProperties.name && scaledVersionProperties.name.trim().length) {
                nameAppendage = " (" + scaledVersionProperties.name + ")";
            }
            if (startOfExt >= 0) {
                scaledName = originalName.substr(0, startOfExt);
                if (referenceType !== versionType) {
                    scaledExt = versionType.split("/")[1];
                }
                scaledName += nameAppendage + "." + scaledExt;
            } else {
                scaledName = originalName + nameAppendage;
            }
            return scaledName;
        },
        _getSortedSizes: function(sizes) {
            "use strict";
            sizes = qq.extend([], sizes);
            return sizes.sort(function(a, b) {
                if (a.maxSize > b.maxSize) {
                    return 1;
                }
                if (a.maxSize < b.maxSize) {
                    return -1;
                }
                return 0;
            });
        },
        _generateScaledImage: function(spec, sourceFile) {
            "use strict";
            var self = this, customResizeFunction = spec.customResizeFunction, log = spec.log, maxSize = spec.maxSize, orient = spec.orient, type = spec.type, quality = spec.quality, failedText = spec.failedText, includeExif = spec.includeExif && sourceFile.type === "image/jpeg" && type === "image/jpeg", scalingEffort = new qq.Promise(), imageGenerator = new qq.ImageGenerator(log), canvas = document.createElement("canvas");
            log("Attempting to generate scaled version for " + sourceFile.name);
            imageGenerator.generate(sourceFile, canvas, {
                maxSize: maxSize,
                orient: orient,
                customResizeFunction: customResizeFunction
            }).then(function() {
                var scaledImageDataUri = canvas.toDataURL(type, quality), signalSuccess = function() {
                    log("Success generating scaled version for " + sourceFile.name);
                    var blob = qq.dataUriToBlob(scaledImageDataUri);
                    scalingEffort.success(blob);
                };
                if (includeExif) {
                    self._insertExifHeader(sourceFile, scaledImageDataUri, log).then(function(scaledImageDataUriWithExif) {
                        scaledImageDataUri = scaledImageDataUriWithExif;
                        signalSuccess();
                    }, function() {
                        log("Problem inserting EXIF header into scaled image.  Using scaled image w/out EXIF data.", "error");
                        signalSuccess();
                    });
                } else {
                    signalSuccess();
                }
            }, function() {
                log("Failed attempt to generate scaled version for " + sourceFile.name, "error");
                scalingEffort.failure(failedText);
            });
            return scalingEffort;
        },
        _insertExifHeader: function(originalImage, scaledImageDataUri, log) {
            "use strict";
            var reader = new FileReader(), insertionEffort = new qq.Promise(), originalImageDataUri = "";
            reader.onload = function() {
                originalImageDataUri = reader.result;
                insertionEffort.success(qq.ExifRestorer.restore(originalImageDataUri, scaledImageDataUri));
            };
            reader.onerror = function() {
                log("Problem reading " + originalImage.name + " during attempt to transfer EXIF data to scaled version.", "error");
                insertionEffort.failure();
            };
            reader.readAsDataURL(originalImage);
            return insertionEffort;
        },
        _dataUriToBlob: function(dataUri) {
            "use strict";
            var byteString, mimeString, arrayBuffer, intArray;
            if (dataUri.split(",")[0].indexOf("base64") >= 0) {
                byteString = atob(dataUri.split(",")[1]);
            } else {
                byteString = decodeURI(dataUri.split(",")[1]);
            }
            mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
            arrayBuffer = new ArrayBuffer(byteString.length);
            intArray = new Uint8Array(arrayBuffer);
            qq.each(byteString, function(idx, character) {
                intArray[idx] = character.charCodeAt(0);
            });
            return this._createBlob(arrayBuffer, mimeString);
        },
        _createBlob: function(data, mime) {
            "use strict";
            var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, blobBuilder = BlobBuilder && new BlobBuilder();
            if (blobBuilder) {
                blobBuilder.append(data);
                return blobBuilder.getBlob(mime);
            } else {
                return new Blob([ data ], {
                    type: mime
                });
            }
        }
    });
    qq.ExifRestorer = function() {
        var ExifRestorer = {};
        ExifRestorer.KEY_STR = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
        ExifRestorer.encode64 = function(input) {
            var output = "", chr1, chr2, chr3 = "", enc1, enc2, enc3, enc4 = "", i = 0;
            do {
                chr1 = input[i++];
                chr2 = input[i++];
                chr3 = input[i++];
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            return output;
        };
        ExifRestorer.restore = function(origFileBase64, resizedFileBase64) {
            var expectedBase64Header = "data:image/jpeg;base64,";
            if (!origFileBase64.match(expectedBase64Header)) {
                return resizedFileBase64;
            }
            var rawImage = this.decode64(origFileBase64.replace(expectedBase64Header, ""));
            var segments = this.slice2Segments(rawImage);
            var image = this.exifManipulation(resizedFileBase64, segments);
            return expectedBase64Header + this.encode64(image);
        };
        ExifRestorer.exifManipulation = function(resizedFileBase64, segments) {
            var exifArray = this.getExifArray(segments), newImageArray = this.insertExif(resizedFileBase64, exifArray), aBuffer = new Uint8Array(newImageArray);
            return aBuffer;
        };
        ExifRestorer.getExifArray = function(segments) {
            var seg;
            for (var x = 0; x < segments.length; x++) {
                seg = segments[x];
                if (seg[0] == 255 & seg[1] == 225) {
                    return seg;
                }
            }
            return [];
        };
        ExifRestorer.insertExif = function(resizedFileBase64, exifArray) {
            var imageData = resizedFileBase64.replace("data:image/jpeg;base64,", ""), buf = this.decode64(imageData), separatePoint = buf.indexOf(255, 3), mae = buf.slice(0, separatePoint), ato = buf.slice(separatePoint), array = mae;
            array = array.concat(exifArray);
            array = array.concat(ato);
            return array;
        };
        ExifRestorer.slice2Segments = function(rawImageArray) {
            var head = 0, segments = [];
            while (1) {
                if (rawImageArray[head] == 255 & rawImageArray[head + 1] == 218) {
                    break;
                }
                if (rawImageArray[head] == 255 & rawImageArray[head + 1] == 216) {
                    head += 2;
                } else {
                    var length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3], endPoint = head + length + 2, seg = rawImageArray.slice(head, endPoint);
                    segments.push(seg);
                    head = endPoint;
                }
                if (head > rawImageArray.length) {
                    break;
                }
            }
            return segments;
        };
        ExifRestorer.decode64 = function(input) {
            var output = "", chr1, chr2, chr3 = "", enc1, enc2, enc3, enc4 = "", i = 0, buf = [];
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                throw new Error("There were invalid base64 characters in the input text.  " + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                enc1 = this.KEY_STR.indexOf(input.charAt(i++));
                enc2 = this.KEY_STR.indexOf(input.charAt(i++));
                enc3 = this.KEY_STR.indexOf(input.charAt(i++));
                enc4 = this.KEY_STR.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;
                buf.push(chr1);
                if (enc3 != 64) {
                    buf.push(chr2);
                }
                if (enc4 != 64) {
                    buf.push(chr3);
                }
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            return buf;
        };
        return ExifRestorer;
    }();
    qq.TotalProgress = function(callback, getSize) {
        "use strict";
        var perFileProgress = {}, totalLoaded = 0, totalSize = 0, lastLoadedSent = -1, lastTotalSent = -1, callbackProxy = function(loaded, total) {
            if (loaded !== lastLoadedSent || total !== lastTotalSent) {
                callback(loaded, total);
            }
            lastLoadedSent = loaded;
            lastTotalSent = total;
        }, noRetryableFiles = function(failed, retryable) {
            var none = true;
            qq.each(failed, function(idx, failedId) {
                if (qq.indexOf(retryable, failedId) >= 0) {
                    none = false;
                    return false;
                }
            });
            return none;
        }, onCancel = function(id) {
            updateTotalProgress(id, -1, -1);
            delete perFileProgress[id];
        }, onAllComplete = function(successful, failed, retryable) {
            if (failed.length === 0 || noRetryableFiles(failed, retryable)) {
                callbackProxy(totalSize, totalSize);
                this.reset();
            }
        }, onNew = function(id) {
            var size = getSize(id);
            if (size > 0) {
                updateTotalProgress(id, 0, size);
                perFileProgress[id] = {
                    loaded: 0,
                    total: size
                };
            }
        }, updateTotalProgress = function(id, newLoaded, newTotal) {
            var oldLoaded = perFileProgress[id] ? perFileProgress[id].loaded : 0, oldTotal = perFileProgress[id] ? perFileProgress[id].total : 0;
            if (newLoaded === -1 && newTotal === -1) {
                totalLoaded -= oldLoaded;
                totalSize -= oldTotal;
            } else {
                if (newLoaded) {
                    totalLoaded += newLoaded - oldLoaded;
                }
                if (newTotal) {
                    totalSize += newTotal - oldTotal;
                }
            }
            callbackProxy(totalLoaded, totalSize);
        };
        qq.extend(this, {
            onAllComplete: onAllComplete,
            onStatusChange: function(id, oldStatus, newStatus) {
                if (newStatus === qq.status.CANCELED || newStatus === qq.status.REJECTED) {
                    onCancel(id);
                } else if (newStatus === qq.status.SUBMITTING) {
                    onNew(id);
                }
            },
            onIndividualProgress: function(id, loaded, total) {
                updateTotalProgress(id, loaded, total);
                perFileProgress[id] = {
                    loaded: loaded,
                    total: total
                };
            },
            onNewSize: function(id) {
                onNew(id);
            },
            reset: function() {
                perFileProgress = {};
                totalLoaded = 0;
                totalSize = 0;
            }
        });
    };
    qq.PasteSupport = function(o) {
        "use strict";
        var options, detachPasteHandler;
        options = {
            targetElement: null,
            callbacks: {
                log: function(message, level) {},
                pasteReceived: function(blob) {}
            }
        };
        function isImage(item) {
            return item.type && item.type.indexOf("image/") === 0;
        }
        function registerPasteHandler() {
            detachPasteHandler = qq(options.targetElement).attach("paste", function(event) {
                var clipboardData = event.clipboardData;
                if (clipboardData) {
                    qq.each(clipboardData.items, function(idx, item) {
                        if (isImage(item)) {
                            var blob = item.getAsFile();
                            options.callbacks.pasteReceived(blob);
                        }
                    });
                }
            });
        }
        function unregisterPasteHandler() {
            if (detachPasteHandler) {
                detachPasteHandler();
            }
        }
        qq.extend(options, o);
        registerPasteHandler();
        qq.extend(this, {
            reset: function() {
                unregisterPasteHandler();
            }
        });
    };
    qq.FormSupport = function(options, startUpload, log) {
        "use strict";
        var self = this, interceptSubmit = options.interceptSubmit, formEl = options.element, autoUpload = options.autoUpload;
        qq.extend(this, {
            newEndpoint: null,
            newAutoUpload: autoUpload,
            attachedToForm: false,
            getFormInputsAsObject: function() {
                if (formEl == null) {
                    return null;
                }
                return self._form2Obj(formEl);
            }
        });
        function determineNewEndpoint(formEl) {
            if (formEl.getAttribute("action")) {
                self.newEndpoint = formEl.getAttribute("action");
            }
        }
        function validateForm(formEl, nativeSubmit) {
            if (formEl.checkValidity && !formEl.checkValidity()) {
                log("Form did not pass validation checks - will not upload.", "error");
                nativeSubmit();
            } else {
                return true;
            }
        }
        function maybeUploadOnSubmit(formEl) {
            var nativeSubmit = formEl.submit;
            qq(formEl).attach("submit", function(event) {
                event = event || window.event;
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
                validateForm(formEl, nativeSubmit) && startUpload();
            });
            formEl.submit = function() {
                validateForm(formEl, nativeSubmit) && startUpload();
            };
        }
        function determineFormEl(formEl) {
            if (formEl) {
                if (qq.isString(formEl)) {
                    formEl = document.getElementById(formEl);
                }
                if (formEl) {
                    log("Attaching to form element.");
                    determineNewEndpoint(formEl);
                    interceptSubmit && maybeUploadOnSubmit(formEl);
                }
            }
            return formEl;
        }
        formEl = determineFormEl(formEl);
        this.attachedToForm = !!formEl;
    };
    qq.extend(qq.FormSupport.prototype, {
        _form2Obj: function(form) {
            "use strict";
            var obj = {}, notIrrelevantType = function(type) {
                var irrelevantTypes = [ "button", "image", "reset", "submit" ];
                return qq.indexOf(irrelevantTypes, type.toLowerCase()) < 0;
            }, radioOrCheckbox = function(type) {
                return qq.indexOf([ "checkbox", "radio" ], type.toLowerCase()) >= 0;
            }, ignoreValue = function(el) {
                if (radioOrCheckbox(el.type) && !el.checked) {
                    return true;
                }
                return el.disabled && el.type.toLowerCase() !== "hidden";
            }, selectValue = function(select) {
                var value = null;
                qq.each(qq(select).children(), function(idx, child) {
                    if (child.tagName.toLowerCase() === "option" && child.selected) {
                        value = child.value;
                        return false;
                    }
                });
                return value;
            };
            qq.each(form.elements, function(idx, el) {
                if ((qq.isInput(el, true) || el.tagName.toLowerCase() === "textarea") && notIrrelevantType(el.type) && !ignoreValue(el)) {
                    obj[el.name] = el.value;
                } else if (el.tagName.toLowerCase() === "select" && !ignoreValue(el)) {
                    var value = selectValue(el);
                    if (value !== null) {
                        obj[el.name] = value;
                    }
                }
            });
            return obj;
        }
    });
    qq.traditional = qq.traditional || {};
    qq.traditional.FormUploadHandler = function(options, proxy) {
        "use strict";
        var handler = this, getName = proxy.getName, getUuid = proxy.getUuid, log = proxy.log;
        function getIframeContentJson(id, iframe) {
            var response, doc, innerHtml;
            try {
                doc = iframe.contentDocument || iframe.contentWindow.document;
                innerHtml = doc.body.innerHTML;
                log("converting iframe's innerHTML to JSON");
                log("innerHTML = " + innerHtml);
                if (innerHtml && innerHtml.match(/^<pre/i)) {
                    innerHtml = doc.body.firstChild.firstChild.nodeValue;
                }
                response = handler._parseJsonResponse(innerHtml);
            } catch (error) {
                log("Error when attempting to parse form upload response (" + error.message + ")", "error");
                response = {
                    success: false
                };
            }
            return response;
        }
        function createForm(id, iframe) {
            var params = options.paramsStore.get(id), method = options.method.toLowerCase() === "get" ? "GET" : "POST", endpoint = options.endpointStore.get(id), name = getName(id);
            params[options.uuidName] = getUuid(id);
            params[options.filenameParam] = name;
            return handler._initFormForUpload({
                method: method,
                endpoint: endpoint,
                params: params,
                paramsInBody: options.paramsInBody,
                targetName: iframe.name
            });
        }
        this.uploadFile = function(id) {
            var input = handler.getInput(id), iframe = handler._createIframe(id), promise = new qq.Promise(), form;
            form = createForm(id, iframe);
            form.appendChild(input);
            handler._attachLoadEvent(iframe, function(responseFromMessage) {
                log("iframe loaded");
                var response = responseFromMessage ? responseFromMessage : getIframeContentJson(id, iframe);
                handler._detachLoadEvent(id);
                if (!options.cors.expected) {
                    qq(iframe).remove();
                }
                if (response.success) {
                    promise.success(response);
                } else {
                    promise.failure(response);
                }
            });
            log("Sending upload request for " + id);
            form.submit();
            qq(form).remove();
            return promise;
        };
        qq.extend(this, new qq.FormUploadHandler({
            options: {
                isCors: options.cors.expected,
                inputName: options.inputName
            },
            proxy: {
                onCancel: options.onCancel,
                getName: getName,
                getUuid: getUuid,
                log: log
            }
        }));
    };
    qq.traditional = qq.traditional || {};
    qq.traditional.XhrUploadHandler = function(spec, proxy) {
        "use strict";
        var handler = this, getName = proxy.getName, getSize = proxy.getSize, getUuid = proxy.getUuid, log = proxy.log, multipart = spec.forceMultipart || spec.paramsInBody, addChunkingSpecificParams = function(id, params, chunkData) {
            var size = getSize(id), name = getName(id);
            params[spec.chunking.paramNames.partIndex] = chunkData.part;
            params[spec.chunking.paramNames.partByteOffset] = chunkData.start;
            params[spec.chunking.paramNames.chunkSize] = chunkData.size;
            params[spec.chunking.paramNames.totalParts] = chunkData.count;
            params[spec.totalFileSizeName] = size;
            if (multipart) {
                params[spec.filenameParam] = name;
            }
        }, allChunksDoneRequester = new qq.traditional.AllChunksDoneAjaxRequester({
            cors: spec.cors,
            endpoint: spec.chunking.success.endpoint,
            log: log
        }), createReadyStateChangedHandler = function(id, xhr) {
            var promise = new qq.Promise();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var result = onUploadOrChunkComplete(id, xhr);
                    if (result.success) {
                        promise.success(result.response, xhr);
                    } else {
                        promise.failure(result.response, xhr);
                    }
                }
            };
            return promise;
        }, getChunksCompleteParams = function(id) {
            var params = spec.paramsStore.get(id), name = getName(id), size = getSize(id);
            params[spec.uuidName] = getUuid(id);
            params[spec.filenameParam] = name;
            params[spec.totalFileSizeName] = size;
            params[spec.chunking.paramNames.totalParts] = handler._getTotalChunks(id);
            return params;
        }, isErrorUploadResponse = function(xhr, response) {
            return qq.indexOf([ 200, 201, 202, 203, 204 ], xhr.status) < 0 || !response.success || response.reset;
        }, onUploadOrChunkComplete = function(id, xhr) {
            var response;
            log("xhr - server response received for " + id);
            log("responseText = " + xhr.responseText);
            response = parseResponse(true, xhr);
            return {
                success: !isErrorUploadResponse(xhr, response),
                response: response
            };
        }, parseResponse = function(upload, xhr) {
            var response = {};
            try {
                log(qq.format("Received response status {} with body: {}", xhr.status, xhr.responseText));
                response = qq.parseJson(xhr.responseText);
            } catch (error) {
                upload && log("Error when attempting to parse xhr response text (" + error.message + ")", "error");
            }
            return response;
        }, sendChunksCompleteRequest = function(id) {
            var promise = new qq.Promise();
            allChunksDoneRequester.complete(id, handler._createXhr(id), getChunksCompleteParams(id), spec.customHeaders.get(id)).then(function(xhr) {
                promise.success(parseResponse(false, xhr), xhr);
            }, function(xhr) {
                promise.failure(parseResponse(false, xhr), xhr);
            });
            return promise;
        }, setParamsAndGetEntityToSend = function(params, xhr, fileOrBlob, id) {
            var formData = new FormData(), method = spec.method, endpoint = spec.endpointStore.get(id), name = getName(id), size = getSize(id);
            params[spec.uuidName] = getUuid(id);
            params[spec.filenameParam] = name;
            if (multipart) {
                params[spec.totalFileSizeName] = size;
            }
            if (!spec.paramsInBody) {
                if (!multipart) {
                    params[spec.inputName] = name;
                }
                endpoint = qq.obj2url(params, endpoint);
            }
            xhr.open(method, endpoint, true);
            if (spec.cors.expected && spec.cors.sendCredentials) {
                xhr.withCredentials = true;
            }
            if (multipart) {
                if (spec.paramsInBody) {
                    qq.obj2FormData(params, formData);
                }
                formData.append(spec.inputName, fileOrBlob);
                return formData;
            }
            return fileOrBlob;
        }, setUploadHeaders = function(id, xhr) {
            var extraHeaders = spec.customHeaders.get(id), fileOrBlob = handler.getFile(id);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            if (!multipart) {
                xhr.setRequestHeader("Content-Type", "application/octet-stream");
                xhr.setRequestHeader("X-Mime-Type", fileOrBlob.type);
            }
            qq.each(extraHeaders, function(name, val) {
                xhr.setRequestHeader(name, val);
            });
        };
        qq.extend(this, {
            uploadChunk: function(id, chunkIdx, resuming) {
                var chunkData = handler._getChunkData(id, chunkIdx), xhr = handler._createXhr(id, chunkIdx), size = getSize(id), promise, toSend, params;
                promise = createReadyStateChangedHandler(id, xhr);
                handler._registerProgressHandler(id, chunkIdx, chunkData.size);
                params = spec.paramsStore.get(id);
                addChunkingSpecificParams(id, params, chunkData);
                if (resuming) {
                    params[spec.resume.paramNames.resuming] = true;
                }
                toSend = setParamsAndGetEntityToSend(params, xhr, chunkData.blob, id);
                setUploadHeaders(id, xhr);
                xhr.send(toSend);
                return promise;
            },
            uploadFile: function(id) {
                var fileOrBlob = handler.getFile(id), promise, xhr, params, toSend;
                xhr = handler._createXhr(id);
                handler._registerProgressHandler(id);
                promise = createReadyStateChangedHandler(id, xhr);
                params = spec.paramsStore.get(id);
                toSend = setParamsAndGetEntityToSend(params, xhr, fileOrBlob, id);
                setUploadHeaders(id, xhr);
                xhr.send(toSend);
                return promise;
            }
        });
        qq.extend(this, new qq.XhrUploadHandler({
            options: qq.extend({
                namespace: "traditional"
            }, spec),
            proxy: qq.extend({
                getEndpoint: spec.endpointStore.get
            }, proxy)
        }));
        qq.override(this, function(super_) {
            return {
                finalizeChunks: function(id) {
                    if (spec.chunking.success.endpoint) {
                        return sendChunksCompleteRequest(id);
                    } else {
                        return super_.finalizeChunks(id, qq.bind(parseResponse, this, true));
                    }
                }
            };
        });
    };
    qq.traditional.AllChunksDoneAjaxRequester = function(o) {
        "use strict";
        var requester, method = "POST", options = {
            cors: {
                allowXdr: false,
                expected: false,
                sendCredentials: false
            },
            endpoint: null,
            log: function(str, level) {}
        }, promises = {}, endpointHandler = {
            get: function(id) {
                return options.endpoint;
            }
        };
        qq.extend(options, o);
        requester = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: [ method ],
            method: method,
            endpointStore: endpointHandler,
            allowXRequestedWithAndCacheControl: false,
            cors: options.cors,
            log: options.log,
            onComplete: function(id, xhr, isError) {
                var promise = promises[id];
                delete promises[id];
                if (isError) {
                    promise.failure(xhr);
                } else {
                    promise.success(xhr);
                }
            }
        }));
        qq.extend(this, {
            complete: function(id, xhr, params, headers) {
                var promise = new qq.Promise();
                options.log("Submitting All Chunks Done request for " + id);
                promises[id] = promise;
                requester.initTransport(id).withParams(params).withHeaders(headers).send(xhr);
                return promise;
            }
        });
    };
    qq.CryptoJS = function(Math, undefined) {
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = function() {
            function F() {}
            return {
                extend: function(overrides) {
                    F.prototype = this;
                    var subtype = new F();
                    if (overrides) {
                        subtype.mixIn(overrides);
                    }
                    if (!subtype.hasOwnProperty("init")) {
                        subtype.init = function() {
                            subtype.$super.init.apply(this, arguments);
                        };
                    }
                    subtype.init.prototype = subtype;
                    subtype.$super = this;
                    return subtype;
                },
                create: function() {
                    var instance = this.extend();
                    instance.init.apply(instance, arguments);
                    return instance;
                },
                init: function() {},
                mixIn: function(properties) {
                    for (var propertyName in properties) {
                        if (properties.hasOwnProperty(propertyName)) {
                            this[propertyName] = properties[propertyName];
                        }
                    }
                    if (properties.hasOwnProperty("toString")) {
                        this.toString = properties.toString;
                    }
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
            init: function(words, sigBytes) {
                words = this.words = words || [];
                if (sigBytes != undefined) {
                    this.sigBytes = sigBytes;
                } else {
                    this.sigBytes = words.length * 4;
                }
            },
            toString: function(encoder) {
                return (encoder || Hex).stringify(this);
            },
            concat: function(wordArray) {
                var thisWords = this.words;
                var thatWords = wordArray.words;
                var thisSigBytes = this.sigBytes;
                var thatSigBytes = wordArray.sigBytes;
                this.clamp();
                if (thisSigBytes % 4) {
                    for (var i = 0; i < thatSigBytes; i++) {
                        var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                        thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                    }
                } else if (thatWords.length > 65535) {
                    for (var i = 0; i < thatSigBytes; i += 4) {
                        thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
                    }
                } else {
                    thisWords.push.apply(thisWords, thatWords);
                }
                this.sigBytes += thatSigBytes;
                return this;
            },
            clamp: function() {
                var words = this.words;
                var sigBytes = this.sigBytes;
                words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
                words.length = Math.ceil(sigBytes / 4);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);
                return clone;
            },
            random: function(nBytes) {
                var words = [];
                for (var i = 0; i < nBytes; i += 4) {
                    words.push(Math.random() * 4294967296 | 0);
                }
                return new WordArray.init(words, nBytes);
            }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var hexChars = [];
                for (var i = 0; i < sigBytes; i++) {
                    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    hexChars.push((bite >>> 4).toString(16));
                    hexChars.push((bite & 15).toString(16));
                }
                return hexChars.join("");
            },
            parse: function(hexStr) {
                var hexStrLength = hexStr.length;
                var words = [];
                for (var i = 0; i < hexStrLength; i += 2) {
                    words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
                }
                return new WordArray.init(words, hexStrLength / 2);
            }
        };
        var Latin1 = C_enc.Latin1 = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var latin1Chars = [];
                for (var i = 0; i < sigBytes; i++) {
                    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    latin1Chars.push(String.fromCharCode(bite));
                }
                return latin1Chars.join("");
            },
            parse: function(latin1Str) {
                var latin1StrLength = latin1Str.length;
                var words = [];
                for (var i = 0; i < latin1StrLength; i++) {
                    words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
                }
                return new WordArray.init(words, latin1StrLength);
            }
        };
        var Utf8 = C_enc.Utf8 = {
            stringify: function(wordArray) {
                try {
                    return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                    throw new Error("Malformed UTF-8 data");
                }
            },
            parse: function(utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function() {
                this._data = new WordArray.init();
                this._nDataBytes = 0;
            },
            _append: function(data) {
                if (typeof data == "string") {
                    data = Utf8.parse(data);
                }
                this._data.concat(data);
                this._nDataBytes += data.sigBytes;
            },
            _process: function(doFlush) {
                var data = this._data;
                var dataWords = data.words;
                var dataSigBytes = data.sigBytes;
                var blockSize = this.blockSize;
                var blockSizeBytes = blockSize * 4;
                var nBlocksReady = dataSigBytes / blockSizeBytes;
                if (doFlush) {
                    nBlocksReady = Math.ceil(nBlocksReady);
                } else {
                    nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
                }
                var nWordsReady = nBlocksReady * blockSize;
                var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
                if (nWordsReady) {
                    for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                        this._doProcessBlock(dataWords, offset);
                    }
                    var processedWords = dataWords.splice(0, nWordsReady);
                    data.sigBytes -= nBytesReady;
                }
                return new WordArray.init(processedWords, nBytesReady);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();
                return clone;
            },
            _minBufferSize: 0
        });
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
                this.reset();
            },
            reset: function() {
                BufferedBlockAlgorithm.reset.call(this);
                this._doReset();
            },
            update: function(messageUpdate) {
                this._append(messageUpdate);
                this._process();
                return this;
            },
            finalize: function(messageUpdate) {
                if (messageUpdate) {
                    this._append(messageUpdate);
                }
                var hash = this._doFinalize();
                return hash;
            },
            blockSize: 512 / 32,
            _createHelper: function(hasher) {
                return function(message, cfg) {
                    return new hasher.init(cfg).finalize(message);
                };
            },
            _createHmacHelper: function(hasher) {
                return function(message, key) {
                    return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
            }
        });
        var C_algo = C.algo = {};
        return C;
    }(Math);
    (function() {
        var C = qq.CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var map = this._map;
                wordArray.clamp();
                var base64Chars = [];
                for (var i = 0; i < sigBytes; i += 3) {
                    var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                    var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                    var triplet = byte1 << 16 | byte2 << 8 | byte3;
                    for (var j = 0; j < 4 && i + j * .75 < sigBytes; j++) {
                        base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                    }
                }
                var paddingChar = map.charAt(64);
                if (paddingChar) {
                    while (base64Chars.length % 4) {
                        base64Chars.push(paddingChar);
                    }
                }
                return base64Chars.join("");
            },
            parse: function(base64Str) {
                var base64StrLength = base64Str.length;
                var map = this._map;
                var paddingChar = map.charAt(64);
                if (paddingChar) {
                    var paddingIndex = base64Str.indexOf(paddingChar);
                    if (paddingIndex != -1) {
                        base64StrLength = paddingIndex;
                    }
                }
                var words = [];
                var nBytes = 0;
                for (var i = 0; i < base64StrLength; i++) {
                    if (i % 4) {
                        var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2;
                        var bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;
                        words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
                        nBytes++;
                    }
                }
                return WordArray.create(words, nBytes);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
    })();
    (function() {
        var C = qq.CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
            init: function(hasher, key) {
                hasher = this._hasher = new hasher.init();
                if (typeof key == "string") {
                    key = Utf8.parse(key);
                }
                var hasherBlockSize = hasher.blockSize;
                var hasherBlockSizeBytes = hasherBlockSize * 4;
                if (key.sigBytes > hasherBlockSizeBytes) {
                    key = hasher.finalize(key);
                }
                key.clamp();
                var oKey = this._oKey = key.clone();
                var iKey = this._iKey = key.clone();
                var oKeyWords = oKey.words;
                var iKeyWords = iKey.words;
                for (var i = 0; i < hasherBlockSize; i++) {
                    oKeyWords[i] ^= 1549556828;
                    iKeyWords[i] ^= 909522486;
                }
                oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
                this.reset();
            },
            reset: function() {
                var hasher = this._hasher;
                hasher.reset();
                hasher.update(this._iKey);
            },
            update: function(messageUpdate) {
                this._hasher.update(messageUpdate);
                return this;
            },
            finalize: function(messageUpdate) {
                var hasher = this._hasher;
                var innerHash = hasher.finalize(messageUpdate);
                hasher.reset();
                var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
                return hmac;
            }
        });
    })();
    (function() {
        var C = qq.CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
            },
            _doProcessBlock: function(M, offset) {
                var H = this._hash.words;
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4];
                for (var i = 0; i < 80; i++) {
                    if (i < 16) {
                        W[i] = M[offset + i] | 0;
                    } else {
                        var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                        W[i] = n << 1 | n >>> 31;
                    }
                    var t = (a << 5 | a >>> 27) + e + W[i];
                    if (i < 20) {
                        t += (b & c | ~b & d) + 1518500249;
                    } else if (i < 40) {
                        t += (b ^ c ^ d) + 1859775393;
                    } else if (i < 60) {
                        t += (b & c | b & d | c & d) - 1894007588;
                    } else {
                        t += (b ^ c ^ d) - 899497514;
                    }
                    e = d;
                    d = c;
                    c = b << 30 | b >>> 2;
                    b = a;
                    a = t;
                }
                H[0] = H[0] + a | 0;
                H[1] = H[1] + b | 0;
                H[2] = H[2] + c | 0;
                H[3] = H[3] + d | 0;
                H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                data.sigBytes = dataWords.length * 4;
                this._process();
                return this._hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
    })();
    (function(Math) {
        var C = qq.CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
            function isPrime(n) {
                var sqrtN = Math.sqrt(n);
                for (var factor = 2; factor <= sqrtN; factor++) {
                    if (!(n % factor)) {
                        return false;
                    }
                }
                return true;
            }
            function getFractionalBits(n) {
                return (n - (n | 0)) * 4294967296 | 0;
            }
            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
                if (isPrime(n)) {
                    if (nPrime < 8) {
                        H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
                    }
                    K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
                    nPrime++;
                }
                n++;
            }
        })();
        var W = [];
        var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
                var H = this._hash.words;
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4];
                var f = H[5];
                var g = H[6];
                var h = H[7];
                for (var i = 0; i < 64; i++) {
                    if (i < 16) {
                        W[i] = M[offset + i] | 0;
                    } else {
                        var gamma0x = W[i - 15];
                        var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                        var gamma1x = W[i - 2];
                        var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                    }
                    var ch = e & f ^ ~e & g;
                    var maj = a & b ^ a & c ^ b & c;
                    var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                    var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                    var t1 = h + sigma1 + ch + K[i] + W[i];
                    var t2 = sigma0 + maj;
                    h = g;
                    g = f;
                    f = e;
                    e = d + t1 | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = t1 + t2 | 0;
                }
                H[0] = H[0] + a | 0;
                H[1] = H[1] + b | 0;
                H[2] = H[2] + c | 0;
                H[3] = H[3] + d | 0;
                H[4] = H[4] + e | 0;
                H[5] = H[5] + f | 0;
                H[6] = H[6] + g | 0;
                H[7] = H[7] + h | 0;
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                data.sigBytes = dataWords.length * 4;
                this._process();
                return this._hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });
        C.SHA256 = Hasher._createHelper(SHA256);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
    })(Math);
    (function() {
        if (typeof ArrayBuffer != "function") {
            return;
        }
        var C = qq.CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
                typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
                typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
                var typedArrayByteLength = typedArray.byteLength;
                var words = [];
                for (var i = 0; i < typedArrayByteLength; i++) {
                    words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
                }
                superInit.call(this, words, typedArrayByteLength);
            } else {
                superInit.apply(this, arguments);
            }
        };
        subInit.prototype = WordArray;
    })();
    qq.s3 = qq.s3 || {};
    qq.s3.util = qq.s3.util || function() {
        "use strict";
        return {
            ALGORITHM_PARAM_NAME: "x-amz-algorithm",
            AWS_PARAM_PREFIX: "x-amz-meta-",
            CREDENTIAL_PARAM_NAME: "x-amz-credential",
            DATE_PARAM_NAME: "x-amz-date",
            REDUCED_REDUNDANCY_PARAM_NAME: "x-amz-storage-class",
            REDUCED_REDUNDANCY_PARAM_VALUE: "REDUCED_REDUNDANCY",
            SERVER_SIDE_ENCRYPTION_PARAM_NAME: "x-amz-server-side-encryption",
            SERVER_SIDE_ENCRYPTION_PARAM_VALUE: "AES256",
            SESSION_TOKEN_PARAM_NAME: "x-amz-security-token",
            V4_ALGORITHM_PARAM_VALUE: "AWS4-HMAC-SHA256",
            V4_SIGNATURE_PARAM_NAME: "x-amz-signature",
            CASE_SENSITIVE_PARAM_NAMES: [ "Cache-Control", "Content-Disposition", "Content-Encoding", "Content-MD5" ],
            UNSIGNABLE_REST_HEADER_NAMES: [ "Cache-Control", "Content-Disposition", "Content-Encoding", "Content-MD5" ],
            UNPREFIXED_PARAM_NAMES: [ "Cache-Control", "Content-Disposition", "Content-Encoding", "Content-MD5", "x-amz-server-side-encryption-customer-algorithm", "x-amz-server-side-encryption-customer-key", "x-amz-server-side-encryption-customer-key-MD5" ],
            getBucket: function(endpoint) {
                var patterns = [ /^(?:https?:\/\/)?([a-z0-9.\-_]+)\.s3(?:-[a-z0-9\-]+)?\.amazonaws\.com/i, /^(?:https?:\/\/)?s3(?:-[a-z0-9\-]+)?\.amazonaws\.com\/([a-z0-9.\-_]+)/i, /^(?:https?:\/\/)?([a-z0-9.\-_]+)/i ], bucket;
                qq.each(patterns, function(idx, pattern) {
                    var match = pattern.exec(endpoint);
                    if (match) {
                        bucket = match[1];
                        return false;
                    }
                });
                return bucket;
            },
            _getPrefixedParamName: function(name) {
                if (qq.indexOf(qq.s3.util.UNPREFIXED_PARAM_NAMES, name) >= 0) {
                    return name;
                }
                return qq.s3.util.AWS_PARAM_PREFIX + name;
            },
            getPolicy: function(spec) {
                var policy = {}, conditions = [], bucket = spec.bucket, date = spec.date, drift = spec.clockDrift, key = spec.key, accessKey = spec.accessKey, acl = spec.acl, type = spec.type, expectedStatus = spec.expectedStatus, sessionToken = spec.sessionToken, params = spec.params, successRedirectUrl = qq.s3.util.getSuccessRedirectAbsoluteUrl(spec.successRedirectUrl), minFileSize = spec.minFileSize, maxFileSize = spec.maxFileSize, reducedRedundancy = spec.reducedRedundancy, region = spec.region, serverSideEncryption = spec.serverSideEncryption, signatureVersion = spec.signatureVersion;
                policy.expiration = qq.s3.util.getPolicyExpirationDate(date, drift);
                conditions.push({
                    acl: acl
                });
                conditions.push({
                    bucket: bucket
                });
                if (type) {
                    conditions.push({
                        "Content-Type": type
                    });
                }
                if (expectedStatus) {
                    conditions.push({
                        success_action_status: expectedStatus.toString()
                    });
                }
                if (successRedirectUrl) {
                    conditions.push({
                        success_action_redirect: successRedirectUrl
                    });
                }
                if (reducedRedundancy) {
                    conditions.push({});
                    conditions[conditions.length - 1][qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE;
                }
                if (sessionToken) {
                    conditions.push({});
                    conditions[conditions.length - 1][qq.s3.util.SESSION_TOKEN_PARAM_NAME] = sessionToken;
                }
                if (serverSideEncryption) {
                    conditions.push({});
                    conditions[conditions.length - 1][qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE;
                }
                if (signatureVersion === 2) {
                    conditions.push({
                        key: key
                    });
                } else if (signatureVersion === 4) {
                    conditions.push({});
                    conditions[conditions.length - 1][qq.s3.util.ALGORITHM_PARAM_NAME] = qq.s3.util.V4_ALGORITHM_PARAM_VALUE;
                    conditions.push({});
                    conditions[conditions.length - 1].key = key;
                    conditions.push({});
                    conditions[conditions.length - 1][qq.s3.util.CREDENTIAL_PARAM_NAME] = qq.s3.util.getV4CredentialsString({
                        date: date,
                        key: accessKey,
                        region: region
                    });
                    conditions.push({});
                    conditions[conditions.length - 1][qq.s3.util.DATE_PARAM_NAME] = qq.s3.util.getV4PolicyDate(date, drift);
                }
                qq.each(params, function(name, val) {
                    var awsParamName = qq.s3.util._getPrefixedParamName(name), param = {};
                    if (qq.indexOf(qq.s3.util.UNPREFIXED_PARAM_NAMES, awsParamName) >= 0) {
                        param[awsParamName] = val;
                    } else {
                        param[awsParamName] = encodeURIComponent(val);
                    }
                    conditions.push(param);
                });
                policy.conditions = conditions;
                qq.s3.util.enforceSizeLimits(policy, minFileSize, maxFileSize);
                return policy;
            },
            refreshPolicyCredentials: function(policy, newSessionToken) {
                var sessionTokenFound = false;
                qq.each(policy.conditions, function(oldCondIdx, oldCondObj) {
                    qq.each(oldCondObj, function(oldCondName, oldCondVal) {
                        if (oldCondName === qq.s3.util.SESSION_TOKEN_PARAM_NAME) {
                            oldCondObj[oldCondName] = newSessionToken;
                            sessionTokenFound = true;
                        }
                    });
                });
                if (!sessionTokenFound) {
                    policy.conditions.push({});
                    policy.conditions[policy.conditions.length - 1][qq.s3.util.SESSION_TOKEN_PARAM_NAME] = newSessionToken;
                }
            },
            generateAwsParams: function(spec, signPolicyCallback) {
                var awsParams = {}, customParams = spec.params, promise = new qq.Promise(), sessionToken = spec.sessionToken, drift = spec.clockDrift, type = spec.type, key = spec.key, accessKey = spec.accessKey, acl = spec.acl, expectedStatus = spec.expectedStatus, successRedirectUrl = qq.s3.util.getSuccessRedirectAbsoluteUrl(spec.successRedirectUrl), reducedRedundancy = spec.reducedRedundancy, region = spec.region, serverSideEncryption = spec.serverSideEncryption, signatureVersion = spec.signatureVersion, now = new Date(), log = spec.log, policyJson;
                spec.date = now;
                policyJson = qq.s3.util.getPolicy(spec);
                awsParams.key = key;
                if (type) {
                    awsParams["Content-Type"] = type;
                }
                if (expectedStatus) {
                    awsParams.success_action_status = expectedStatus;
                }
                if (successRedirectUrl) {
                    awsParams.success_action_redirect = successRedirectUrl;
                }
                if (reducedRedundancy) {
                    awsParams[qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE;
                }
                if (serverSideEncryption) {
                    awsParams[qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE;
                }
                if (sessionToken) {
                    awsParams[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = sessionToken;
                }
                awsParams.acl = acl;
                qq.each(customParams, function(name, val) {
                    var awsParamName = qq.s3.util._getPrefixedParamName(name);
                    if (qq.indexOf(qq.s3.util.UNPREFIXED_PARAM_NAMES, awsParamName) >= 0) {
                        awsParams[awsParamName] = val;
                    } else {
                        awsParams[awsParamName] = encodeURIComponent(val);
                    }
                });
                if (signatureVersion === 2) {
                    awsParams.AWSAccessKeyId = accessKey;
                } else if (signatureVersion === 4) {
                    awsParams[qq.s3.util.ALGORITHM_PARAM_NAME] = qq.s3.util.V4_ALGORITHM_PARAM_VALUE;
                    awsParams[qq.s3.util.CREDENTIAL_PARAM_NAME] = qq.s3.util.getV4CredentialsString({
                        date: now,
                        key: accessKey,
                        region: region
                    });
                    awsParams[qq.s3.util.DATE_PARAM_NAME] = qq.s3.util.getV4PolicyDate(now, drift);
                }
                signPolicyCallback(policyJson).then(function(policyAndSignature, updatedAccessKey, updatedSessionToken) {
                    awsParams.policy = policyAndSignature.policy;
                    if (spec.signatureVersion === 2) {
                        awsParams.signature = policyAndSignature.signature;
                        if (updatedAccessKey) {
                            awsParams.AWSAccessKeyId = updatedAccessKey;
                        }
                    } else if (spec.signatureVersion === 4) {
                        awsParams[qq.s3.util.V4_SIGNATURE_PARAM_NAME] = policyAndSignature.signature;
                    }
                    if (updatedSessionToken) {
                        awsParams[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = updatedSessionToken;
                    }
                    promise.success(awsParams);
                }, function(errorMessage) {
                    errorMessage = errorMessage || "Can't continue further with request to S3 as we did not receive " + "a valid signature and policy from the server.";
                    log("Policy signing failed.  " + errorMessage, "error");
                    promise.failure(errorMessage);
                });
                return promise;
            },
            enforceSizeLimits: function(policy, minSize, maxSize) {
                var adjustedMinSize = minSize < 0 ? 0 : minSize, adjustedMaxSize = maxSize <= 0 ? 9007199254740992 : maxSize;
                if (minSize > 0 || maxSize > 0) {
                    policy.conditions.push([ "content-length-range", adjustedMinSize.toString(), adjustedMaxSize.toString() ]);
                }
            },
            getPolicyExpirationDate: function(date, drift) {
                var adjustedDate = new Date(date.getTime() + drift);
                return qq.s3.util.getPolicyDate(adjustedDate, 5);
            },
            getCredentialsDate: function(date) {
                return date.getUTCFullYear() + "" + ("0" + (date.getUTCMonth() + 1)).slice(-2) + ("0" + date.getUTCDate()).slice(-2);
            },
            getPolicyDate: function(date, _minutesToAdd_) {
                var minutesToAdd = _minutesToAdd_ || 0, pad, r;
                date.setMinutes(date.getMinutes() + (minutesToAdd || 0));
                if (Date.prototype.toISOString) {
                    return date.toISOString();
                } else {
                    pad = function(number) {
                        r = String(number);
                        if (r.length === 1) {
                            r = "0" + r;
                        }
                        return r;
                    };
                    return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + "T" + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + "." + String((date.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z";
                }
            },
            parseIframeResponse: function(iframe) {
                var doc = iframe.contentDocument || iframe.contentWindow.document, queryString = doc.location.search, match = /bucket=(.+)&key=(.+)&etag=(.+)/.exec(queryString);
                if (match) {
                    return {
                        bucket: match[1],
                        key: match[2],
                        etag: match[3].replace(/%22/g, "")
                    };
                }
            },
            getSuccessRedirectAbsoluteUrl: function(successRedirectUrl) {
                if (successRedirectUrl) {
                    var targetAnchorContainer = document.createElement("div"), targetAnchor;
                    if (qq.ie7()) {
                        targetAnchorContainer.innerHTML = "<a href='" + successRedirectUrl + "'></a>";
                        targetAnchor = targetAnchorContainer.firstChild;
                        return targetAnchor.href;
                    } else {
                        targetAnchor = document.createElement("a");
                        targetAnchor.href = successRedirectUrl;
                        targetAnchor.href = targetAnchor.href;
                        return targetAnchor.href;
                    }
                }
            },
            getV4CredentialsString: function(spec) {
                return spec.key + "/" + qq.s3.util.getCredentialsDate(spec.date) + "/" + spec.region + "/s3/aws4_request";
            },
            getV4PolicyDate: function(date, drift) {
                var adjustedDate = new Date(date.getTime() + drift);
                return qq.s3.util.getCredentialsDate(adjustedDate) + "T" + ("0" + adjustedDate.getUTCHours()).slice(-2) + ("0" + adjustedDate.getUTCMinutes()).slice(-2) + ("0" + adjustedDate.getUTCSeconds()).slice(-2) + "Z";
            },
            encodeQueryStringParam: function(param) {
                var percentEncoded = encodeURIComponent(param);
                percentEncoded = percentEncoded.replace(/[!'()]/g, escape);
                percentEncoded = percentEncoded.replace(/\*/g, "%2A");
                return percentEncoded.replace(/%20/g, "+");
            },
            uriEscape: function(string) {
                var output = encodeURIComponent(string);
                output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape);
                output = output.replace(/[*]/g, function(ch) {
                    return "%" + ch.charCodeAt(0).toString(16).toUpperCase();
                });
                return output;
            },
            uriEscapePath: function(path) {
                var parts = [];
                qq.each(path.split("/"), function(idx, item) {
                    parts.push(qq.s3.util.uriEscape(item));
                });
                return parts.join("/");
            }
        };
    }();
    (function() {
        "use strict";
        qq.nonTraditionalBasePublicApi = {
            setUploadSuccessParams: function(params, id) {
                this._uploadSuccessParamsStore.set(params, id);
            },
            setUploadSuccessEndpoint: function(endpoint, id) {
                this._uploadSuccessEndpointStore.set(endpoint, id);
            }
        };
        qq.nonTraditionalBasePrivateApi = {
            _onComplete: function(id, name, result, xhr) {
                var success = result.success ? true : false, self = this, onCompleteArgs = arguments, successEndpoint = this._uploadSuccessEndpointStore.get(id), successCustomHeaders = this._options.uploadSuccess.customHeaders, successMethod = this._options.uploadSuccess.method, cors = this._options.cors, promise = new qq.Promise(), uploadSuccessParams = this._uploadSuccessParamsStore.get(id), fileParams = this._paramsStore.get(id), onSuccessFromServer = function(successRequestResult) {
                    delete self._failedSuccessRequestCallbacks[id];
                    qq.extend(result, successRequestResult);
                    qq.FineUploaderBasic.prototype._onComplete.apply(self, onCompleteArgs);
                    promise.success(successRequestResult);
                }, onFailureFromServer = function(successRequestResult) {
                    var callback = submitSuccessRequest;
                    qq.extend(result, successRequestResult);
                    if (result && result.reset) {
                        callback = null;
                    }
                    if (!callback) {
                        delete self._failedSuccessRequestCallbacks[id];
                    } else {
                        self._failedSuccessRequestCallbacks[id] = callback;
                    }
                    if (!self._onAutoRetry(id, name, result, xhr, callback)) {
                        qq.FineUploaderBasic.prototype._onComplete.apply(self, onCompleteArgs);
                        promise.failure(successRequestResult);
                    }
                }, submitSuccessRequest, successAjaxRequester;
                if (success && successEndpoint) {
                    successAjaxRequester = new qq.UploadSuccessAjaxRequester({
                        endpoint: successEndpoint,
                        method: successMethod,
                        customHeaders: successCustomHeaders,
                        cors: cors,
                        log: qq.bind(this.log, this)
                    });
                    qq.extend(uploadSuccessParams, self._getEndpointSpecificParams(id, result, xhr), true);
                    fileParams && qq.extend(uploadSuccessParams, fileParams, true);
                    submitSuccessRequest = qq.bind(function() {
                        successAjaxRequester.sendSuccessRequest(id, uploadSuccessParams).then(onSuccessFromServer, onFailureFromServer);
                    }, self);
                    submitSuccessRequest();
                    return promise;
                }
                return qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments);
            },
            _manualRetry: function(id) {
                var successRequestCallback = this._failedSuccessRequestCallbacks[id];
                return qq.FineUploaderBasic.prototype._manualRetry.call(this, id, successRequestCallback);
            }
        };
    })();
    (function() {
        "use strict";
        qq.s3.FineUploaderBasic = function(o) {
            var options = {
                request: {
                    accessKey: null,
                    clockDrift: 0
                },
                objectProperties: {
                    acl: "private",
                    bucket: qq.bind(function(id) {
                        return qq.s3.util.getBucket(this.getEndpoint(id));
                    }, this),
                    host: qq.bind(function(id) {
                        return /(?:http|https):\/\/(.+)(?:\/.+)?/.exec(this._endpointStore.get(id))[1];
                    }, this),
                    key: "uuid",
                    reducedRedundancy: false,
                    region: "us-east-1",
                    serverSideEncryption: false
                },
                credentials: {
                    accessKey: null,
                    secretKey: null,
                    expiration: null,
                    sessionToken: null
                },
                signature: {
                    customHeaders: {},
                    endpoint: null,
                    version: 2
                },
                uploadSuccess: {
                    endpoint: null,
                    method: "POST",
                    params: {},
                    customHeaders: {}
                },
                iframeSupport: {
                    localBlankPagePath: null
                },
                chunking: {
                    partSize: 5242880
                },
                cors: {
                    allowXdr: true
                },
                callbacks: {
                    onCredentialsExpired: function() {}
                }
            };
            qq.extend(options, o, true);
            if (!this.setCredentials(options.credentials, true)) {
                this._currentCredentials.accessKey = options.request.accessKey;
            }
            this._aclStore = this._createStore(options.objectProperties.acl);
            qq.FineUploaderBasic.call(this, options);
            this._uploadSuccessParamsStore = this._createStore(this._options.uploadSuccess.params);
            this._uploadSuccessEndpointStore = this._createStore(this._options.uploadSuccess.endpoint);
            this._failedSuccessRequestCallbacks = {};
            this._cannedKeys = {};
            this._cannedBuckets = {};
            this._buckets = {};
            this._hosts = {};
        };
        qq.extend(qq.s3.FineUploaderBasic.prototype, qq.basePublicApi);
        qq.extend(qq.s3.FineUploaderBasic.prototype, qq.basePrivateApi);
        qq.extend(qq.s3.FineUploaderBasic.prototype, qq.nonTraditionalBasePublicApi);
        qq.extend(qq.s3.FineUploaderBasic.prototype, qq.nonTraditionalBasePrivateApi);
        qq.extend(qq.s3.FineUploaderBasic.prototype, {
            getBucket: function(id) {
                if (this._cannedBuckets[id] == null) {
                    return this._buckets[id];
                }
                return this._cannedBuckets[id];
            },
            getKey: function(id) {
                if (this._cannedKeys[id] == null) {
                    return this._handler.getThirdPartyFileId(id);
                }
                return this._cannedKeys[id];
            },
            reset: function() {
                qq.FineUploaderBasic.prototype.reset.call(this);
                this._failedSuccessRequestCallbacks = [];
                this._buckets = {};
                this._hosts = {};
            },
            setCredentials: function(credentials, ignoreEmpty) {
                if (credentials && credentials.secretKey) {
                    if (!credentials.accessKey) {
                        throw new qq.Error("Invalid credentials: no accessKey");
                    } else if (!credentials.expiration) {
                        throw new qq.Error("Invalid credentials: no expiration");
                    } else {
                        this._currentCredentials = qq.extend({}, credentials);
                        if (qq.isString(credentials.expiration)) {
                            this._currentCredentials.expiration = new Date(credentials.expiration);
                        }
                    }
                    return true;
                } else if (!ignoreEmpty) {
                    throw new qq.Error("Invalid credentials parameter!");
                } else {
                    this._currentCredentials = {};
                }
            },
            setAcl: function(acl, id) {
                this._aclStore.set(acl, id);
            },
            _createUploadHandler: function() {
                var self = this, additionalOptions = {
                    aclStore: this._aclStore,
                    getBucket: qq.bind(this._determineBucket, this),
                    getHost: qq.bind(this._determineHost, this),
                    getKeyName: qq.bind(this._determineKeyName, this),
                    iframeSupport: this._options.iframeSupport,
                    objectProperties: this._options.objectProperties,
                    signature: this._options.signature,
                    clockDrift: this._options.request.clockDrift,
                    validation: {
                        minSizeLimit: this._options.validation.minSizeLimit,
                        maxSizeLimit: this._options.validation.sizeLimit
                    }
                };
                qq.override(this._endpointStore, function(super_) {
                    return {
                        get: function(id) {
                            var endpoint = super_.get(id);
                            if (endpoint.indexOf("http") < 0) {
                                return "http://" + endpoint;
                            }
                            return endpoint;
                        }
                    };
                });
                qq.override(this._paramsStore, function(super_) {
                    return {
                        get: function(id) {
                            var oldParams = super_.get(id), modifiedParams = {};
                            qq.each(oldParams, function(name, val) {
                                var paramName = name;
                                if (qq.indexOf(qq.s3.util.CASE_SENSITIVE_PARAM_NAMES, paramName) < 0) {
                                    paramName = paramName.toLowerCase();
                                }
                                modifiedParams[paramName] = qq.isFunction(val) ? val() : val;
                            });
                            return modifiedParams;
                        }
                    };
                });
                additionalOptions.signature.credentialsProvider = {
                    get: function() {
                        return self._currentCredentials;
                    },
                    onExpired: function() {
                        var updateCredentials = new qq.Promise(), callbackRetVal = self._options.callbacks.onCredentialsExpired();
                        if (qq.isGenericPromise(callbackRetVal)) {
                            callbackRetVal.then(function(credentials) {
                                try {
                                    self.setCredentials(credentials);
                                    updateCredentials.success();
                                } catch (error) {
                                    self.log("Invalid credentials returned from onCredentialsExpired callback! (" + error.message + ")", "error");
                                    updateCredentials.failure("onCredentialsExpired did not return valid credentials.");
                                }
                            }, function(errorMsg) {
                                self.log("onCredentialsExpired callback indicated failure! (" + errorMsg + ")", "error");
                                updateCredentials.failure("onCredentialsExpired callback failed.");
                            });
                        } else {
                            self.log("onCredentialsExpired callback did not return a promise!", "error");
                            updateCredentials.failure("Unexpected return value for onCredentialsExpired.");
                        }
                        return updateCredentials;
                    }
                };
                return qq.FineUploaderBasic.prototype._createUploadHandler.call(this, additionalOptions, "s3");
            },
            _determineObjectPropertyValue: function(id, property) {
                var maybe = this._options.objectProperties[property], promise = new qq.Promise(), self = this;
                if (qq.isFunction(maybe)) {
                    maybe = maybe(id);
                    if (qq.isGenericPromise(maybe)) {
                        promise = maybe;
                    } else {
                        promise.success(maybe);
                    }
                } else if (qq.isString(maybe)) {
                    promise.success(maybe);
                }
                promise.then(function success(value) {
                    self["_" + property + "s"][id] = value;
                }, function failure(errorMsg) {
                    qq.log("Problem determining " + property + " for ID " + id + " (" + errorMsg + ")", "error");
                });
                return promise;
            },
            _determineBucket: function(id) {
                return this._determineObjectPropertyValue(id, "bucket");
            },
            _determineHost: function(id) {
                return this._determineObjectPropertyValue(id, "host");
            },
            _determineKeyName: function(id, filename) {
                var promise = new qq.Promise(), keynameLogic = this._options.objectProperties.key, extension = qq.getExtension(filename), onGetKeynameFailure = promise.failure, onGetKeynameSuccess = function(keyname, extension) {
                    var keynameToUse = keyname;
                    if (extension !== undefined) {
                        keynameToUse += "." + extension;
                    }
                    promise.success(keynameToUse);
                };
                switch (keynameLogic) {
                  case "uuid":
                    onGetKeynameSuccess(this.getUuid(id), extension);
                    break;

                  case "filename":
                    onGetKeynameSuccess(filename);
                    break;

                  default:
                    if (qq.isFunction(keynameLogic)) {
                        this._handleKeynameFunction(keynameLogic, id, onGetKeynameSuccess, onGetKeynameFailure);
                    } else {
                        this.log(keynameLogic + " is not a valid value for the s3.keyname option!", "error");
                        onGetKeynameFailure();
                    }
                }
                return promise;
            },
            _handleKeynameFunction: function(keynameFunc, id, successCallback, failureCallback) {
                var self = this, onSuccess = function(keyname) {
                    successCallback(keyname);
                }, onFailure = function(reason) {
                    self.log(qq.format("Failed to retrieve key name for {}.  Reason: {}", id, reason || "null"), "error");
                    failureCallback(reason);
                }, keyname = keynameFunc.call(this, id);
                if (qq.isGenericPromise(keyname)) {
                    keyname.then(onSuccess, onFailure);
                } else if (keyname == null) {
                    onFailure();
                } else {
                    onSuccess(keyname);
                }
            },
            _getEndpointSpecificParams: function(id, response, maybeXhr) {
                var params = {
                    key: this.getKey(id),
                    uuid: this.getUuid(id),
                    name: this.getName(id),
                    bucket: this.getBucket(id)
                };
                if (maybeXhr && maybeXhr.getResponseHeader("ETag")) {
                    params.etag = maybeXhr.getResponseHeader("ETag");
                } else if (response.etag) {
                    params.etag = response.etag;
                }
                return params;
            },
            _onSubmitDelete: function(id, onSuccessCallback) {
                var additionalMandatedParams = {
                    key: this.getKey(id),
                    bucket: this.getBucket(id)
                };
                return qq.FineUploaderBasic.prototype._onSubmitDelete.call(this, id, onSuccessCallback, additionalMandatedParams);
            },
            _addCannedFile: function(sessionData) {
                var id;
                if (sessionData.s3Key == null) {
                    throw new qq.Error("Did not find s3Key property in server session response.  This is required!");
                } else {
                    id = qq.FineUploaderBasic.prototype._addCannedFile.apply(this, arguments);
                    this._cannedKeys[id] = sessionData.s3Key;
                    this._cannedBuckets[id] = sessionData.s3Bucket;
                }
                return id;
            }
        });
    })();
    if (!window.Uint8ClampedArray) {
        window.Uint8ClampedArray = function() {};
    }
    qq.s3.RequestSigner = function(o) {
        "use strict";
        var requester, thisSignatureRequester = this, pendingSignatures = {}, options = {
            expectingPolicy: false,
            method: "POST",
            signatureSpec: {
                drift: 0,
                credentialsProvider: {},
                endpoint: null,
                customHeaders: {},
                version: 2
            },
            maxConnections: 3,
            endpointStore: {},
            paramsStore: {},
            cors: {
                expected: false,
                sendCredentials: false
            },
            log: function(str, level) {}
        }, credentialsProvider, generateHeaders = function(signatureConstructor, signature, promise) {
            var headers = signatureConstructor.getHeaders();
            if (options.signatureSpec.version === 4) {
                headers.Authorization = qq.s3.util.V4_ALGORITHM_PARAM_VALUE + " Credential=" + options.signatureSpec.credentialsProvider.get().accessKey + "/" + qq.s3.util.getCredentialsDate(signatureConstructor.getRequestDate()) + "/" + options.signatureSpec.region + "/" + "s3/aws4_request," + "SignedHeaders=" + signatureConstructor.getSignedHeaders() + "," + "Signature=" + signature;
            } else {
                headers.Authorization = "AWS " + options.signatureSpec.credentialsProvider.get().accessKey + ":" + signature;
            }
            promise.success(headers, signatureConstructor.getEndOfUrl());
        }, v2 = {
            getStringToSign: function(signatureSpec) {
                return qq.format("{}\n{}\n{}\n\n{}/{}/{}", signatureSpec.method, signatureSpec.contentMd5 || "", signatureSpec.contentType || "", signatureSpec.headersStr || "\n", signatureSpec.bucket, signatureSpec.endOfUrl);
            },
            signApiRequest: function(signatureConstructor, headersStr, signatureEffort) {
                var headersWordArray = qq.CryptoJS.enc.Utf8.parse(headersStr), headersHmacSha1 = qq.CryptoJS.HmacSHA1(headersWordArray, credentialsProvider.get().secretKey), headersHmacSha1Base64 = qq.CryptoJS.enc.Base64.stringify(headersHmacSha1);
                generateHeaders(signatureConstructor, headersHmacSha1Base64, signatureEffort);
            },
            signPolicy: function(policy, signatureEffort, updatedAccessKey, updatedSessionToken) {
                var policyStr = JSON.stringify(policy), policyWordArray = qq.CryptoJS.enc.Utf8.parse(policyStr), base64Policy = qq.CryptoJS.enc.Base64.stringify(policyWordArray), policyHmacSha1 = qq.CryptoJS.HmacSHA1(base64Policy, credentialsProvider.get().secretKey), policyHmacSha1Base64 = qq.CryptoJS.enc.Base64.stringify(policyHmacSha1);
                signatureEffort.success({
                    policy: base64Policy,
                    signature: policyHmacSha1Base64
                }, updatedAccessKey, updatedSessionToken);
            }
        }, v4 = {
            getCanonicalQueryString: function(endOfUri) {
                var queryParamIdx = endOfUri.indexOf("?"), canonicalQueryString = "", encodedQueryParams, encodedQueryParamNames, queryStrings;
                if (queryParamIdx >= 0) {
                    encodedQueryParams = {};
                    queryStrings = endOfUri.substr(queryParamIdx + 1).split("&");
                    qq.each(queryStrings, function(idx, queryString) {
                        var nameAndVal = queryString.split("="), paramVal = nameAndVal[1];
                        if (paramVal == null) {
                            paramVal = "";
                        }
                        encodedQueryParams[encodeURIComponent(nameAndVal[0])] = encodeURIComponent(paramVal);
                    });
                    encodedQueryParamNames = Object.keys(encodedQueryParams).sort();
                    encodedQueryParamNames.forEach(function(encodedQueryParamName, idx) {
                        canonicalQueryString += encodedQueryParamName + "=" + encodedQueryParams[encodedQueryParamName];
                        if (idx < encodedQueryParamNames.length - 1) {
                            canonicalQueryString += "&";
                        }
                    });
                }
                return canonicalQueryString;
            },
            getCanonicalRequest: function(signatureSpec) {
                return qq.format("{}\n{}\n{}\n{}\n{}\n{}", signatureSpec.method, v4.getCanonicalUri(signatureSpec.endOfUrl), v4.getCanonicalQueryString(signatureSpec.endOfUrl), signatureSpec.headersStr || "\n", v4.getSignedHeaders(signatureSpec.headerNames), signatureSpec.hashedContent);
            },
            getCanonicalUri: function(endOfUri) {
                var path = endOfUri, queryParamIdx = endOfUri.indexOf("?");
                if (queryParamIdx > 0) {
                    path = endOfUri.substr(0, queryParamIdx);
                }
                return "/" + path;
            },
            getEncodedHashedPayload: function(body) {
                var promise = new qq.Promise(), reader;
                if (qq.isBlob(body)) {
                    reader = new FileReader();
                    reader.onloadend = function(e) {
                        if (e.target.readyState === FileReader.DONE) {
                            if (e.target.error) {
                                promise.failure(e.target.error);
                            } else {
                                var wordArray = qq.CryptoJS.lib.WordArray.create(e.target.result);
                                promise.success(qq.CryptoJS.SHA256(wordArray).toString());
                            }
                        }
                    };
                    reader.readAsArrayBuffer(body);
                } else {
                    body = body || "";
                    promise.success(qq.CryptoJS.SHA256(body).toString());
                }
                return promise;
            },
            getScope: function(date, region) {
                return qq.s3.util.getCredentialsDate(date) + "/" + region + "/s3/aws4_request";
            },
            getStringToSign: function(signatureSpec) {
                var canonicalRequest = v4.getCanonicalRequest(signatureSpec), date = qq.s3.util.getV4PolicyDate(signatureSpec.date, signatureSpec.drift), hashedRequest = qq.CryptoJS.SHA256(canonicalRequest).toString(), scope = v4.getScope(signatureSpec.date, options.signatureSpec.region), stringToSignTemplate = "AWS4-HMAC-SHA256\n{}\n{}\n{}";
                return {
                    hashed: qq.format(stringToSignTemplate, date, scope, hashedRequest),
                    raw: qq.format(stringToSignTemplate, date, scope, canonicalRequest)
                };
            },
            getSignedHeaders: function(headerNames) {
                var signedHeaders = "";
                headerNames.forEach(function(headerName, idx) {
                    signedHeaders += headerName.toLowerCase();
                    if (idx < headerNames.length - 1) {
                        signedHeaders += ";";
                    }
                });
                return signedHeaders;
            },
            signApiRequest: function(signatureConstructor, headersStr, signatureEffort) {
                var secretKey = credentialsProvider.get().secretKey, headersPattern = /.+\n.+\n(\d+)\/(.+)\/s3\/.+\n(.+)/, matches = headersPattern.exec(headersStr), dateKey, dateRegionKey, dateRegionServiceKey, signingKey;
                dateKey = qq.CryptoJS.HmacSHA256(matches[1], "AWS4" + secretKey);
                dateRegionKey = qq.CryptoJS.HmacSHA256(matches[2], dateKey);
                dateRegionServiceKey = qq.CryptoJS.HmacSHA256("s3", dateRegionKey);
                signingKey = qq.CryptoJS.HmacSHA256("aws4_request", dateRegionServiceKey);
                generateHeaders(signatureConstructor, qq.CryptoJS.HmacSHA256(headersStr, signingKey), signatureEffort);
            },
            signPolicy: function(policy, signatureEffort, updatedAccessKey, updatedSessionToken) {
                var policyStr = JSON.stringify(policy), policyWordArray = qq.CryptoJS.enc.Utf8.parse(policyStr), base64Policy = qq.CryptoJS.enc.Base64.stringify(policyWordArray), secretKey = credentialsProvider.get().secretKey, credentialPattern = /.+\/(.+)\/(.+)\/s3\/aws4_request/, credentialCondition = function() {
                    var credential = null;
                    qq.each(policy.conditions, function(key, condition) {
                        var val = condition["x-amz-credential"];
                        if (val) {
                            credential = val;
                            return false;
                        }
                    });
                    return credential;
                }(), matches, dateKey, dateRegionKey, dateRegionServiceKey, signingKey;
                matches = credentialPattern.exec(credentialCondition);
                dateKey = qq.CryptoJS.HmacSHA256(matches[1], "AWS4" + secretKey);
                dateRegionKey = qq.CryptoJS.HmacSHA256(matches[2], dateKey);
                dateRegionServiceKey = qq.CryptoJS.HmacSHA256("s3", dateRegionKey);
                signingKey = qq.CryptoJS.HmacSHA256("aws4_request", dateRegionServiceKey);
                signatureEffort.success({
                    policy: base64Policy,
                    signature: qq.CryptoJS.HmacSHA256(base64Policy, signingKey).toString()
                }, updatedAccessKey, updatedSessionToken);
            }
        };
        qq.extend(options, o, true);
        credentialsProvider = options.signatureSpec.credentialsProvider;
        function handleSignatureReceived(id, xhrOrXdr, isError) {
            var responseJson = xhrOrXdr.responseText, pendingSignatureData = pendingSignatures[id], promise = pendingSignatureData.promise, signatureConstructor = pendingSignatureData.signatureConstructor, errorMessage, response;
            delete pendingSignatures[id];
            if (responseJson) {
                try {
                    response = qq.parseJson(responseJson);
                } catch (error) {
                    options.log("Error attempting to parse signature response: " + error, "error");
                }
            }
            if (response && response.error) {
                isError = true;
                errorMessage = response.error;
            } else if (response && response.invalid) {
                isError = true;
                errorMessage = "Invalid policy document or request headers!";
            } else if (response) {
                if (options.expectingPolicy && !response.policy) {
                    isError = true;
                    errorMessage = "Response does not include the base64 encoded policy!";
                } else if (!response.signature) {
                    isError = true;
                    errorMessage = "Response does not include the signature!";
                }
            } else {
                isError = true;
                errorMessage = "Received an empty or invalid response from the server!";
            }
            if (isError) {
                if (errorMessage) {
                    options.log(errorMessage, "error");
                }
                promise.failure(errorMessage);
            } else if (signatureConstructor) {
                generateHeaders(signatureConstructor, response.signature, promise);
            } else {
                promise.success(response);
            }
        }
        function getStringToSignArtifacts(id, version, requestInfo) {
            var promise = new qq.Promise(), method = "POST", headerNames = [], headersStr = "", now = new Date(), endOfUrl, signatureSpec, toSign, generateStringToSign = function(requestInfo) {
                var contentMd5, headerIndexesToRemove = [];
                qq.each(requestInfo.headers, function(name) {
                    headerNames.push(name);
                });
                headerNames.sort();
                qq.each(headerNames, function(idx, headerName) {
                    if (qq.indexOf(qq.s3.util.UNSIGNABLE_REST_HEADER_NAMES, headerName) < 0) {
                        headersStr += headerName.toLowerCase() + ":" + requestInfo.headers[headerName].trim() + "\n";
                    } else if (headerName === "Content-MD5") {
                        contentMd5 = requestInfo.headers[headerName];
                    } else {
                        headerIndexesToRemove.unshift(idx);
                    }
                });
                qq.each(headerIndexesToRemove, function(idx, headerIdx) {
                    headerNames.splice(headerIdx, 1);
                });
                signatureSpec = {
                    bucket: requestInfo.bucket,
                    contentMd5: contentMd5,
                    contentType: requestInfo.contentType,
                    date: now,
                    drift: options.signatureSpec.drift,
                    endOfUrl: endOfUrl,
                    hashedContent: requestInfo.hashedContent,
                    headerNames: headerNames,
                    headersStr: headersStr,
                    method: method
                };
                toSign = version === 2 ? v2.getStringToSign(signatureSpec) : v4.getStringToSign(signatureSpec);
                return {
                    date: now,
                    endOfUrl: endOfUrl,
                    signedHeaders: version === 4 ? v4.getSignedHeaders(signatureSpec.headerNames) : null,
                    toSign: version === 4 ? toSign.hashed : toSign,
                    toSignRaw: version === 4 ? toSign.raw : toSign
                };
            };
            switch (requestInfo.type) {
              case thisSignatureRequester.REQUEST_TYPE.MULTIPART_ABORT:
                method = "DELETE";
                endOfUrl = qq.format("uploadId={}", requestInfo.uploadId);
                break;

              case thisSignatureRequester.REQUEST_TYPE.MULTIPART_INITIATE:
                endOfUrl = "uploads";
                break;

              case thisSignatureRequester.REQUEST_TYPE.MULTIPART_COMPLETE:
                endOfUrl = qq.format("uploadId={}", requestInfo.uploadId);
                break;

              case thisSignatureRequester.REQUEST_TYPE.MULTIPART_UPLOAD:
                method = "PUT";
                endOfUrl = qq.format("partNumber={}&uploadId={}", requestInfo.partNum, requestInfo.uploadId);
                break;
            }
            endOfUrl = requestInfo.key + "?" + endOfUrl;
            if (version === 4) {
                v4.getEncodedHashedPayload(requestInfo.content).then(function(hashedContent) {
                    requestInfo.headers["x-amz-content-sha256"] = hashedContent;
                    requestInfo.headers.Host = requestInfo.host;
                    requestInfo.headers["x-amz-date"] = qq.s3.util.getV4PolicyDate(now, options.signatureSpec.drift);
                    requestInfo.hashedContent = hashedContent;
                    promise.success(generateStringToSign(requestInfo));
                }, function(err) {
                    promise.failure(err);
                });
            } else {
                promise.success(generateStringToSign(requestInfo));
            }
            return promise;
        }
        function determineSignatureClientSide(id, toBeSigned, signatureEffort, updatedAccessKey, updatedSessionToken) {
            var updatedHeaders;
            if (toBeSigned.signatureConstructor) {
                if (updatedSessionToken) {
                    updatedHeaders = toBeSigned.signatureConstructor.getHeaders();
                    updatedHeaders[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = updatedSessionToken;
                    toBeSigned.signatureConstructor.withHeaders(updatedHeaders);
                }
                toBeSigned.signatureConstructor.getToSign(id).then(function(signatureArtifacts) {
                    signApiRequest(toBeSigned.signatureConstructor, signatureArtifacts.stringToSign, signatureEffort);
                }, function(err) {
                    signatureEffort.failure(err);
                });
            } else {
                updatedSessionToken && qq.s3.util.refreshPolicyCredentials(toBeSigned, updatedSessionToken);
                signPolicy(toBeSigned, signatureEffort, updatedAccessKey, updatedSessionToken);
            }
        }
        function signPolicy(policy, signatureEffort, updatedAccessKey, updatedSessionToken) {
            if (options.signatureSpec.version === 4) {
                v4.signPolicy(policy, signatureEffort, updatedAccessKey, updatedSessionToken);
            } else {
                v2.signPolicy(policy, signatureEffort, updatedAccessKey, updatedSessionToken);
            }
        }
        function signApiRequest(signatureConstructor, headersStr, signatureEffort) {
            if (options.signatureSpec.version === 4) {
                v4.signApiRequest(signatureConstructor, headersStr, signatureEffort);
            } else {
                v2.signApiRequest(signatureConstructor, headersStr, signatureEffort);
            }
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            method: options.method,
            contentType: "application/json; charset=utf-8",
            endpointStore: {
                get: function() {
                    return options.signatureSpec.endpoint;
                }
            },
            paramsStore: options.paramsStore,
            maxConnections: options.maxConnections,
            customHeaders: options.signatureSpec.customHeaders,
            log: options.log,
            onComplete: handleSignatureReceived,
            cors: options.cors
        }));
        qq.extend(this, {
            getSignature: function(id, toBeSigned) {
                var params = toBeSigned, signatureConstructor = toBeSigned.signatureConstructor, signatureEffort = new qq.Promise(), queryParams;
                if (options.signatureSpec.version === 4) {
                    queryParams = {
                        v4: true
                    };
                }
                if (credentialsProvider.get().secretKey && qq.CryptoJS) {
                    if (credentialsProvider.get().expiration.getTime() > Date.now()) {
                        determineSignatureClientSide(id, toBeSigned, signatureEffort);
                    } else {
                        credentialsProvider.onExpired().then(function() {
                            determineSignatureClientSide(id, toBeSigned, signatureEffort, credentialsProvider.get().accessKey, credentialsProvider.get().sessionToken);
                        }, function(errorMsg) {
                            options.log("Attempt to update expired credentials apparently failed! Unable to sign request.  ", "error");
                            signatureEffort.failure("Unable to sign request - expired credentials.");
                        });
                    }
                } else {
                    options.log("Submitting S3 signature request for " + id);
                    if (signatureConstructor) {
                        signatureConstructor.getToSign(id).then(function(signatureArtifacts) {
                            params = {
                                headers: signatureArtifacts.stringToSignRaw
                            };
                            requester.initTransport(id).withParams(params).withQueryParams(queryParams).send();
                        }, function(err) {
                            options.log("Failed to construct signature. ", "error");
                            signatureEffort.failure("Failed to construct signature.");
                        });
                    } else {
                        requester.initTransport(id).withParams(params).withQueryParams(queryParams).send();
                    }
                    pendingSignatures[id] = {
                        promise: signatureEffort,
                        signatureConstructor: signatureConstructor
                    };
                }
                return signatureEffort;
            },
            constructStringToSign: function(type, bucket, host, key) {
                var headers = {}, uploadId, content, contentType, partNum, artifacts;
                return {
                    withHeaders: function(theHeaders) {
                        headers = theHeaders;
                        return this;
                    },
                    withUploadId: function(theUploadId) {
                        uploadId = theUploadId;
                        return this;
                    },
                    withContent: function(theContent) {
                        content = theContent;
                        return this;
                    },
                    withContentType: function(theContentType) {
                        contentType = theContentType;
                        return this;
                    },
                    withPartNum: function(thePartNum) {
                        partNum = thePartNum;
                        return this;
                    },
                    getToSign: function(id) {
                        var sessionToken = credentialsProvider.get().sessionToken, promise = new qq.Promise(), adjustedDate = new Date(Date.now() + options.signatureSpec.drift);
                        headers["x-amz-date"] = adjustedDate.toUTCString();
                        if (sessionToken) {
                            headers[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = sessionToken;
                        }
                        getStringToSignArtifacts(id, options.signatureSpec.version, {
                            bucket: bucket,
                            content: content,
                            contentType: contentType,
                            headers: headers,
                            host: host,
                            key: key,
                            partNum: partNum,
                            type: type,
                            uploadId: uploadId
                        }).then(function(_artifacts_) {
                            artifacts = _artifacts_;
                            promise.success({
                                headers: function() {
                                    if (contentType) {
                                        headers["Content-Type"] = contentType;
                                    }
                                    delete headers.Host;
                                    return headers;
                                }(),
                                date: artifacts.date,
                                endOfUrl: artifacts.endOfUrl,
                                signedHeaders: artifacts.signedHeaders,
                                stringToSign: artifacts.toSign,
                                stringToSignRaw: artifacts.toSignRaw
                            });
                        }, function(err) {
                            promise.failure(err);
                        });
                        return promise;
                    },
                    getHeaders: function() {
                        return qq.extend({}, headers);
                    },
                    getEndOfUrl: function() {
                        return artifacts && artifacts.endOfUrl;
                    },
                    getRequestDate: function() {
                        return artifacts && artifacts.date;
                    },
                    getSignedHeaders: function() {
                        return artifacts && artifacts.signedHeaders;
                    }
                };
            }
        });
    };
    qq.s3.RequestSigner.prototype.REQUEST_TYPE = {
        MULTIPART_INITIATE: "multipart_initiate",
        MULTIPART_COMPLETE: "multipart_complete",
        MULTIPART_ABORT: "multipart_abort",
        MULTIPART_UPLOAD: "multipart_upload"
    };
    qq.UploadSuccessAjaxRequester = function(o) {
        "use strict";
        var requester, pendingRequests = [], options = {
            method: "POST",
            endpoint: null,
            maxConnections: 3,
            customHeaders: {},
            paramsStore: {},
            cors: {
                expected: false,
                sendCredentials: false
            },
            log: function(str, level) {}
        };
        qq.extend(options, o);
        function handleSuccessResponse(id, xhrOrXdr, isError) {
            var promise = pendingRequests[id], responseJson = xhrOrXdr.responseText, successIndicator = {
                success: true
            }, failureIndicator = {
                success: false
            }, parsedResponse;
            delete pendingRequests[id];
            options.log(qq.format("Received the following response body to an upload success request for id {}: {}", id, responseJson));
            try {
                parsedResponse = qq.parseJson(responseJson);
                if (isError || parsedResponse && (parsedResponse.error || parsedResponse.success === false)) {
                    options.log("Upload success request was rejected by the server.", "error");
                    promise.failure(qq.extend(parsedResponse, failureIndicator));
                } else {
                    options.log("Upload success was acknowledged by the server.");
                    promise.success(qq.extend(parsedResponse, successIndicator));
                }
            } catch (error) {
                if (isError) {
                    options.log(qq.format("Your server indicated failure in its upload success request response for id {}!", id), "error");
                    promise.failure(failureIndicator);
                } else {
                    options.log("Upload success was acknowledged by the server.");
                    promise.success(successIndicator);
                }
            }
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            method: options.method,
            endpointStore: {
                get: function() {
                    return options.endpoint;
                }
            },
            paramsStore: options.paramsStore,
            maxConnections: options.maxConnections,
            customHeaders: options.customHeaders,
            log: options.log,
            onComplete: handleSuccessResponse,
            cors: options.cors
        }));
        qq.extend(this, {
            sendSuccessRequest: function(id, spec) {
                var promise = new qq.Promise();
                options.log("Submitting upload success request/notification for " + id);
                requester.initTransport(id).withParams(spec).send();
                pendingRequests[id] = promise;
                return promise;
            }
        });
    };
    qq.s3.InitiateMultipartAjaxRequester = function(o) {
        "use strict";
        var requester, pendingInitiateRequests = {}, options = {
            filenameParam: "qqfilename",
            method: "POST",
            endpointStore: null,
            paramsStore: null,
            signatureSpec: null,
            aclStore: null,
            reducedRedundancy: false,
            serverSideEncryption: false,
            maxConnections: 3,
            getContentType: function(id) {},
            getBucket: function(id) {},
            getHost: function(id) {},
            getKey: function(id) {},
            getName: function(id) {},
            log: function(str, level) {}
        }, getSignatureAjaxRequester;
        qq.extend(options, o);
        getSignatureAjaxRequester = new qq.s3.RequestSigner({
            endpointStore: options.endpointStore,
            signatureSpec: options.signatureSpec,
            cors: options.cors,
            log: options.log
        });
        function getHeaders(id) {
            var bucket = options.getBucket(id), host = options.getHost(id), headers = {}, promise = new qq.Promise(), key = options.getKey(id), signatureConstructor;
            headers["x-amz-acl"] = options.aclStore.get(id);
            if (options.reducedRedundancy) {
                headers[qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE;
            }
            if (options.serverSideEncryption) {
                headers[qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE;
            }
            headers[qq.s3.util.AWS_PARAM_PREFIX + options.filenameParam] = encodeURIComponent(options.getName(id));
            qq.each(options.paramsStore.get(id), function(name, val) {
                if (qq.indexOf(qq.s3.util.UNPREFIXED_PARAM_NAMES, name) >= 0) {
                    headers[name] = val;
                } else {
                    headers[qq.s3.util.AWS_PARAM_PREFIX + name] = encodeURIComponent(val);
                }
            });
            signatureConstructor = getSignatureAjaxRequester.constructStringToSign(getSignatureAjaxRequester.REQUEST_TYPE.MULTIPART_INITIATE, bucket, host, key).withContentType(options.getContentType(id)).withHeaders(headers);
            getSignatureAjaxRequester.getSignature(id, {
                signatureConstructor: signatureConstructor
            }).then(promise.success, promise.failure);
            return promise;
        }
        function handleInitiateRequestComplete(id, xhr, isError) {
            var promise = pendingInitiateRequests[id], domParser = new DOMParser(), responseDoc = domParser.parseFromString(xhr.responseText, "application/xml"), uploadIdElements, messageElements, uploadId, errorMessage, status;
            delete pendingInitiateRequests[id];
            if (isError) {
                status = xhr.status;
                messageElements = responseDoc.getElementsByTagName("Message");
                if (messageElements.length > 0) {
                    errorMessage = messageElements[0].textContent;
                }
            } else {
                uploadIdElements = responseDoc.getElementsByTagName("UploadId");
                if (uploadIdElements.length > 0) {
                    uploadId = uploadIdElements[0].textContent;
                } else {
                    errorMessage = "Upload ID missing from request";
                }
            }
            if (uploadId === undefined) {
                if (errorMessage) {
                    options.log(qq.format("Specific problem detected initiating multipart upload request for {}: '{}'.", id, errorMessage), "error");
                } else {
                    options.log(qq.format("Unexplained error with initiate multipart upload request for {}.  Status code {}.", id, status), "error");
                }
                promise.failure("Problem initiating upload request.", xhr);
            } else {
                options.log(qq.format("Initiate multipart upload request successful for {}.  Upload ID is {}", id, uploadId));
                promise.success(uploadId, xhr);
            }
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            method: options.method,
            contentType: null,
            endpointStore: options.endpointStore,
            maxConnections: options.maxConnections,
            allowXRequestedWithAndCacheControl: false,
            log: options.log,
            onComplete: handleInitiateRequestComplete,
            successfulResponseCodes: {
                POST: [ 200 ]
            }
        }));
        qq.extend(this, {
            send: function(id) {
                var promise = new qq.Promise();
                getHeaders(id).then(function(headers, endOfUrl) {
                    options.log("Submitting S3 initiate multipart upload request for " + id);
                    pendingInitiateRequests[id] = promise;
                    requester.initTransport(id).withPath(endOfUrl).withHeaders(headers).send();
                }, promise.failure);
                return promise;
            }
        });
    };
    qq.s3.CompleteMultipartAjaxRequester = function(o) {
        "use strict";
        var requester, pendingCompleteRequests = {}, options = {
            method: "POST",
            contentType: "text/xml",
            endpointStore: null,
            signatureSpec: null,
            maxConnections: 3,
            getBucket: function(id) {},
            getHost: function(id) {},
            getKey: function(id) {},
            log: function(str, level) {}
        }, getSignatureAjaxRequester;
        qq.extend(options, o);
        getSignatureAjaxRequester = new qq.s3.RequestSigner({
            endpointStore: options.endpointStore,
            signatureSpec: options.signatureSpec,
            cors: options.cors,
            log: options.log
        });
        function getHeaders(id, uploadId, body) {
            var headers = {}, promise = new qq.Promise(), bucket = options.getBucket(id), host = options.getHost(id), signatureConstructor = getSignatureAjaxRequester.constructStringToSign(getSignatureAjaxRequester.REQUEST_TYPE.MULTIPART_COMPLETE, bucket, host, options.getKey(id)).withUploadId(uploadId).withContent(body).withContentType("application/xml; charset=UTF-8");
            getSignatureAjaxRequester.getSignature(id, {
                signatureConstructor: signatureConstructor
            }).then(promise.success, promise.failure);
            return promise;
        }
        function handleCompleteRequestComplete(id, xhr, isError) {
            var promise = pendingCompleteRequests[id], domParser = new DOMParser(), bucket = options.getBucket(id), key = options.getKey(id), responseDoc = domParser.parseFromString(xhr.responseText, "application/xml"), bucketEls = responseDoc.getElementsByTagName("Bucket"), keyEls = responseDoc.getElementsByTagName("Key");
            delete pendingCompleteRequests[id];
            options.log(qq.format("Complete response status {}, body = {}", xhr.status, xhr.responseText));
            if (isError) {
                options.log(qq.format("Complete Multipart Upload request for {} failed with status {}.", id, xhr.status), "error");
            } else {
                if (bucketEls.length && keyEls.length) {
                    if (bucketEls[0].textContent !== bucket) {
                        isError = true;
                        options.log(qq.format("Wrong bucket in response to Complete Multipart Upload request for {}.", id), "error");
                    }
                } else {
                    isError = true;
                    options.log(qq.format("Missing bucket and/or key in response to Complete Multipart Upload request for {}.", id), "error");
                }
            }
            if (isError) {
                promise.failure("Problem combining the file parts!", xhr);
            } else {
                promise.success({}, xhr);
            }
        }
        function getCompleteRequestBody(etagEntries) {
            var doc = document.implementation.createDocument(null, "CompleteMultipartUpload", null);
            etagEntries.sort(function(a, b) {
                return a.part - b.part;
            });
            qq.each(etagEntries, function(idx, etagEntry) {
                var part = etagEntry.part, etag = etagEntry.etag, partEl = doc.createElement("Part"), partNumEl = doc.createElement("PartNumber"), partNumTextEl = doc.createTextNode(part), etagTextEl = doc.createTextNode(etag), etagEl = doc.createElement("ETag");
                etagEl.appendChild(etagTextEl);
                partNumEl.appendChild(partNumTextEl);
                partEl.appendChild(partNumEl);
                partEl.appendChild(etagEl);
                qq(doc).children()[0].appendChild(partEl);
            });
            return new XMLSerializer().serializeToString(doc);
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            method: options.method,
            contentType: "application/xml; charset=UTF-8",
            endpointStore: options.endpointStore,
            maxConnections: options.maxConnections,
            allowXRequestedWithAndCacheControl: false,
            log: options.log,
            onComplete: handleCompleteRequestComplete,
            successfulResponseCodes: {
                POST: [ 200 ]
            }
        }));
        qq.extend(this, {
            send: function(id, uploadId, etagEntries) {
                var promise = new qq.Promise(), body = getCompleteRequestBody(etagEntries);
                getHeaders(id, uploadId, body).then(function(headers, endOfUrl) {
                    options.log("Submitting S3 complete multipart upload request for " + id);
                    pendingCompleteRequests[id] = promise;
                    delete headers["Content-Type"];
                    requester.initTransport(id).withPath(endOfUrl).withHeaders(headers).withPayload(body).send();
                }, promise.failure);
                return promise;
            }
        });
    };
    qq.s3.AbortMultipartAjaxRequester = function(o) {
        "use strict";
        var requester, options = {
            method: "DELETE",
            endpointStore: null,
            signatureSpec: null,
            maxConnections: 3,
            getBucket: function(id) {},
            getHost: function(id) {},
            getKey: function(id) {},
            log: function(str, level) {}
        }, getSignatureAjaxRequester;
        qq.extend(options, o);
        getSignatureAjaxRequester = new qq.s3.RequestSigner({
            endpointStore: options.endpointStore,
            signatureSpec: options.signatureSpec,
            cors: options.cors,
            log: options.log
        });
        function getHeaders(id, uploadId) {
            var headers = {}, promise = new qq.Promise(), bucket = options.getBucket(id), host = options.getHost(id), signatureConstructor = getSignatureAjaxRequester.constructStringToSign(getSignatureAjaxRequester.REQUEST_TYPE.MULTIPART_ABORT, bucket, host, options.getKey(id)).withUploadId(uploadId);
            getSignatureAjaxRequester.getSignature(id, {
                signatureConstructor: signatureConstructor
            }).then(promise.success, promise.failure);
            return promise;
        }
        function handleAbortRequestComplete(id, xhr, isError) {
            var domParser = new DOMParser(), responseDoc = domParser.parseFromString(xhr.responseText, "application/xml"), errorEls = responseDoc.getElementsByTagName("Error"), awsErrorMsg;
            options.log(qq.format("Abort response status {}, body = {}", xhr.status, xhr.responseText));
            if (isError) {
                options.log(qq.format("Abort Multipart Upload request for {} failed with status {}.", id, xhr.status), "error");
            } else {
                if (errorEls.length) {
                    isError = true;
                    awsErrorMsg = responseDoc.getElementsByTagName("Message")[0].textContent;
                    options.log(qq.format("Failed to Abort Multipart Upload request for {}.  Error: {}", id, awsErrorMsg), "error");
                } else {
                    options.log(qq.format("Abort MPU request succeeded for file ID {}.", id));
                }
            }
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            validMethods: [ "DELETE" ],
            method: options.method,
            contentType: null,
            endpointStore: options.endpointStore,
            maxConnections: options.maxConnections,
            allowXRequestedWithAndCacheControl: false,
            log: options.log,
            onComplete: handleAbortRequestComplete,
            successfulResponseCodes: {
                DELETE: [ 204 ]
            }
        }));
        qq.extend(this, {
            send: function(id, uploadId) {
                getHeaders(id, uploadId).then(function(headers, endOfUrl) {
                    options.log("Submitting S3 Abort multipart upload request for " + id);
                    requester.initTransport(id).withPath(endOfUrl).withHeaders(headers).send();
                });
            }
        });
    };
    qq.s3.XhrUploadHandler = function(spec, proxy) {
        "use strict";
        var getName = proxy.getName, log = proxy.log, clockDrift = spec.clockDrift, expectedStatus = 200, onGetBucket = spec.getBucket, onGetHost = spec.getHost, onGetKeyName = spec.getKeyName, filenameParam = spec.filenameParam, paramsStore = spec.paramsStore, endpointStore = spec.endpointStore, aclStore = spec.aclStore, reducedRedundancy = spec.objectProperties.reducedRedundancy, region = spec.objectProperties.region, serverSideEncryption = spec.objectProperties.serverSideEncryption, validation = spec.validation, signature = qq.extend({
            region: region,
            drift: clockDrift
        }, spec.signature), handler = this, credentialsProvider = spec.signature.credentialsProvider, chunked = {
            combine: function(id) {
                var uploadId = handler._getPersistableData(id).uploadId, etagMap = handler._getPersistableData(id).etags, result = new qq.Promise();
                requesters.completeMultipart.send(id, uploadId, etagMap).then(result.success, function failure(reason, xhr) {
                    result.failure(upload.done(id, xhr).response, xhr);
                });
                return result;
            },
            done: function(id, xhr, chunkIdx) {
                var response = upload.response.parse(id, xhr), etag;
                if (response.success) {
                    etag = xhr.getResponseHeader("ETag");
                    if (!handler._getPersistableData(id).etags) {
                        handler._getPersistableData(id).etags = [];
                    }
                    handler._getPersistableData(id).etags.push({
                        part: chunkIdx + 1,
                        etag: etag
                    });
                }
            },
            initHeaders: function(id, chunkIdx, blob) {
                var headers = {}, bucket = upload.bucket.getName(id), host = upload.host.getName(id), key = upload.key.urlSafe(id), promise = new qq.Promise(), signatureConstructor = requesters.restSignature.constructStringToSign(requesters.restSignature.REQUEST_TYPE.MULTIPART_UPLOAD, bucket, host, key).withPartNum(chunkIdx + 1).withContent(blob).withUploadId(handler._getPersistableData(id).uploadId);
                requesters.restSignature.getSignature(id + "." + chunkIdx, {
                    signatureConstructor: signatureConstructor
                }).then(promise.success, promise.failure);
                return promise;
            },
            put: function(id, chunkIdx) {
                var xhr = handler._createXhr(id, chunkIdx), chunkData = handler._getChunkData(id, chunkIdx), domain = spec.endpointStore.get(id), promise = new qq.Promise();
                chunked.initHeaders(id, chunkIdx, chunkData.blob).then(function(headers, endOfUrl) {
                    if (xhr._cancelled) {
                        log(qq.format("Upload of item {}.{} cancelled. Upload will not start after successful signature request.", id, chunkIdx));
                        promise.failure({
                            error: "Chunk upload cancelled"
                        });
                    } else {
                        var url = domain + "/" + endOfUrl;
                        handler._registerProgressHandler(id, chunkIdx, chunkData.size);
                        upload.track(id, xhr, chunkIdx).then(promise.success, promise.failure);
                        xhr.open("PUT", url, true);
                        qq.each(headers, function(name, val) {
                            xhr.setRequestHeader(name, val);
                        });
                        xhr.send(chunkData.blob);
                    }
                }, function() {
                    promise.failure({
                        error: "Problem signing the chunk!"
                    }, xhr);
                });
                return promise;
            },
            send: function(id, chunkIdx) {
                var promise = new qq.Promise();
                chunked.setup(id).then(function() {
                    chunked.put(id, chunkIdx).then(promise.success, promise.failure);
                }, function(errorMessage, xhr) {
                    promise.failure({
                        error: errorMessage
                    }, xhr);
                });
                return promise;
            },
            setup: function(id) {
                var promise = new qq.Promise(), uploadId = handler._getPersistableData(id).uploadId, uploadIdPromise = new qq.Promise();
                if (!uploadId) {
                    handler._getPersistableData(id).uploadId = uploadIdPromise;
                    requesters.initiateMultipart.send(id).then(function(uploadId) {
                        handler._getPersistableData(id).uploadId = uploadId;
                        uploadIdPromise.success(uploadId);
                        promise.success(uploadId);
                    }, function(errorMsg, xhr) {
                        handler._getPersistableData(id).uploadId = null;
                        promise.failure(errorMsg, xhr);
                        uploadIdPromise.failure(errorMsg, xhr);
                    });
                } else if (uploadId instanceof qq.Promise) {
                    uploadId.then(function(uploadId) {
                        promise.success(uploadId);
                    });
                } else {
                    promise.success(uploadId);
                }
                return promise;
            }
        }, requesters = {
            abortMultipart: new qq.s3.AbortMultipartAjaxRequester({
                endpointStore: endpointStore,
                signatureSpec: signature,
                cors: spec.cors,
                log: log,
                getBucket: function(id) {
                    return upload.bucket.getName(id);
                },
                getHost: function(id) {
                    return upload.host.getName(id);
                },
                getKey: function(id) {
                    return upload.key.urlSafe(id);
                }
            }),
            completeMultipart: new qq.s3.CompleteMultipartAjaxRequester({
                endpointStore: endpointStore,
                signatureSpec: signature,
                cors: spec.cors,
                log: log,
                getBucket: function(id) {
                    return upload.bucket.getName(id);
                },
                getHost: function(id) {
                    return upload.host.getName(id);
                },
                getKey: function(id) {
                    return upload.key.urlSafe(id);
                }
            }),
            initiateMultipart: new qq.s3.InitiateMultipartAjaxRequester({
                filenameParam: filenameParam,
                endpointStore: endpointStore,
                paramsStore: paramsStore,
                signatureSpec: signature,
                aclStore: aclStore,
                reducedRedundancy: reducedRedundancy,
                serverSideEncryption: serverSideEncryption,
                cors: spec.cors,
                log: log,
                getContentType: function(id) {
                    return handler._getMimeType(id);
                },
                getBucket: function(id) {
                    return upload.bucket.getName(id);
                },
                getHost: function(id) {
                    return upload.host.getName(id);
                },
                getKey: function(id) {
                    return upload.key.urlSafe(id);
                },
                getName: function(id) {
                    return getName(id);
                }
            }),
            policySignature: new qq.s3.RequestSigner({
                expectingPolicy: true,
                signatureSpec: signature,
                cors: spec.cors,
                log: log
            }),
            restSignature: new qq.s3.RequestSigner({
                endpointStore: endpointStore,
                signatureSpec: signature,
                cors: spec.cors,
                log: log
            })
        }, simple = {
            initParams: function(id) {
                var customParams = paramsStore.get(id);
                customParams[filenameParam] = getName(id);
                return qq.s3.util.generateAwsParams({
                    endpoint: endpointStore.get(id),
                    clockDrift: clockDrift,
                    params: customParams,
                    type: handler._getMimeType(id),
                    bucket: upload.bucket.getName(id),
                    key: handler.getThirdPartyFileId(id),
                    accessKey: credentialsProvider.get().accessKey,
                    sessionToken: credentialsProvider.get().sessionToken,
                    acl: aclStore.get(id),
                    expectedStatus: expectedStatus,
                    minFileSize: validation.minSizeLimit,
                    maxFileSize: validation.maxSizeLimit,
                    reducedRedundancy: reducedRedundancy,
                    region: region,
                    serverSideEncryption: serverSideEncryption,
                    signatureVersion: signature.version,
                    log: log
                }, qq.bind(requesters.policySignature.getSignature, this, id));
            },
            send: function(id) {
                var promise = new qq.Promise(), xhr = handler._createXhr(id), fileOrBlob = handler.getFile(id);
                handler._registerProgressHandler(id);
                upload.track(id, xhr).then(promise.success, promise.failure);
                simple.setup(id, xhr, fileOrBlob).then(function(toSend) {
                    log("Sending upload request for " + id);
                    xhr.send(toSend);
                }, promise.failure);
                return promise;
            },
            setup: function(id, xhr, fileOrBlob) {
                var formData = new FormData(), endpoint = endpointStore.get(id), url = endpoint, promise = new qq.Promise();
                simple.initParams(id).then(function(awsParams) {
                    xhr.open("POST", url, true);
                    qq.obj2FormData(awsParams, formData);
                    formData.append("file", fileOrBlob);
                    promise.success(formData);
                }, function(errorMessage) {
                    promise.failure({
                        error: errorMessage
                    });
                });
                return promise;
            }
        }, upload = {
            bucket: {
                promise: function(id) {
                    var promise = new qq.Promise(), cachedBucket = handler._getFileState(id).bucket;
                    if (cachedBucket) {
                        promise.success(cachedBucket);
                    } else {
                        onGetBucket(id).then(function(bucket) {
                            handler._getFileState(id).bucket = bucket;
                            promise.success(bucket);
                        }, promise.failure);
                    }
                    return promise;
                },
                getName: function(id) {
                    return handler._getFileState(id).bucket;
                }
            },
            host: {
                promise: function(id) {
                    var promise = new qq.Promise(), cachedHost = handler._getFileState(id).host;
                    if (cachedHost) {
                        promise.success(cachedHost);
                    } else {
                        onGetHost(id).then(function(host) {
                            handler._getFileState(id).host = host;
                            promise.success(host);
                        }, promise.failure);
                    }
                    return promise;
                },
                getName: function(id) {
                    return handler._getFileState(id).host;
                }
            },
            done: function(id, xhr) {
                var response = upload.response.parse(id, xhr), isError = response.success !== true;
                if (isError && upload.response.shouldReset(response.code)) {
                    log("This is an unrecoverable error, we must restart the upload entirely on the next retry attempt.", "error");
                    response.reset = true;
                }
                return {
                    success: !isError,
                    response: response
                };
            },
            key: {
                promise: function(id) {
                    var promise = new qq.Promise(), key = handler.getThirdPartyFileId(id);
                    if (key == null) {
                        handler._setThirdPartyFileId(id, promise);
                        onGetKeyName(id, getName(id)).then(function(keyName) {
                            handler._setThirdPartyFileId(id, keyName);
                            promise.success(keyName);
                        }, function(errorReason) {
                            handler._setThirdPartyFileId(id, null);
                            promise.failure(errorReason);
                        });
                    } else if (qq.isGenericPromise(key)) {
                        key.then(promise.success, promise.failure);
                    } else {
                        promise.success(key);
                    }
                    return promise;
                },
                urlSafe: function(id) {
                    var encodedKey = handler.getThirdPartyFileId(id);
                    return qq.s3.util.uriEscapePath(encodedKey);
                }
            },
            response: {
                parse: function(id, xhr) {
                    var response = {}, parsedErrorProps;
                    try {
                        log(qq.format("Received response status {} with body: {}", xhr.status, xhr.responseText));
                        if (xhr.status === expectedStatus) {
                            response.success = true;
                        } else {
                            parsedErrorProps = upload.response.parseError(xhr.responseText);
                            if (parsedErrorProps) {
                                response.error = parsedErrorProps.message;
                                response.code = parsedErrorProps.code;
                            }
                        }
                    } catch (error) {
                        log("Error when attempting to parse xhr response text (" + error.message + ")", "error");
                    }
                    return response;
                },
                parseError: function(awsResponseXml) {
                    var parser = new DOMParser(), parsedDoc = parser.parseFromString(awsResponseXml, "application/xml"), errorEls = parsedDoc.getElementsByTagName("Error"), errorDetails = {}, codeEls, messageEls;
                    if (errorEls.length) {
                        codeEls = parsedDoc.getElementsByTagName("Code");
                        messageEls = parsedDoc.getElementsByTagName("Message");
                        if (messageEls.length) {
                            errorDetails.message = messageEls[0].textContent;
                        }
                        if (codeEls.length) {
                            errorDetails.code = codeEls[0].textContent;
                        }
                        return errorDetails;
                    }
                },
                shouldReset: function(errorCode) {
                    return errorCode === "EntityTooSmall" || errorCode === "InvalidPart" || errorCode === "InvalidPartOrder" || errorCode === "NoSuchUpload";
                }
            },
            start: function(id, optChunkIdx) {
                var promise = new qq.Promise();
                upload.key.promise(id).then(function() {
                    upload.bucket.promise(id).then(function() {
                        upload.host.promise(id).then(function() {
                            if (optChunkIdx == null) {
                                simple.send(id).then(promise.success, promise.failure);
                            } else {
                                chunked.send(id, optChunkIdx).then(promise.success, promise.failure);
                            }
                        });
                    });
                }, function(errorReason) {
                    promise.failure({
                        error: errorReason
                    });
                });
                return promise;
            },
            track: function(id, xhr, optChunkIdx) {
                var promise = new qq.Promise();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        var result;
                        if (optChunkIdx == null) {
                            result = upload.done(id, xhr);
                            promise[result.success ? "success" : "failure"](result.response, xhr);
                        } else {
                            chunked.done(id, xhr, optChunkIdx);
                            result = upload.done(id, xhr);
                            promise[result.success ? "success" : "failure"](result.response, xhr);
                        }
                    }
                };
                return promise;
            }
        };
        qq.extend(this, {
            uploadChunk: upload.start,
            uploadFile: upload.start
        });
        qq.extend(this, new qq.XhrUploadHandler({
            options: qq.extend({
                namespace: "s3"
            }, spec),
            proxy: qq.extend({
                getEndpoint: spec.endpointStore.get
            }, proxy)
        }));
        qq.override(this, function(super_) {
            return {
                expunge: function(id) {
                    var uploadId = handler._getPersistableData(id) && handler._getPersistableData(id).uploadId, existedInLocalStorage = handler._maybeDeletePersistedChunkData(id);
                    if (uploadId !== undefined && existedInLocalStorage) {
                        requesters.abortMultipart.send(id, uploadId);
                    }
                    super_.expunge(id);
                },
                finalizeChunks: function(id) {
                    return chunked.combine(id);
                },
                _getLocalStorageId: function(id) {
                    var baseStorageId = super_._getLocalStorageId(id), bucketName = upload.bucket.getName(id);
                    return baseStorageId + "-" + bucketName;
                }
            };
        });
    };
    qq.s3.FormUploadHandler = function(options, proxy) {
        "use strict";
        var handler = this, clockDrift = options.clockDrift, onUuidChanged = proxy.onUuidChanged, getName = proxy.getName, getUuid = proxy.getUuid, log = proxy.log, onGetBucket = options.getBucket, onGetKeyName = options.getKeyName, filenameParam = options.filenameParam, paramsStore = options.paramsStore, endpointStore = options.endpointStore, aclStore = options.aclStore, reducedRedundancy = options.objectProperties.reducedRedundancy, region = options.objectProperties.region, serverSideEncryption = options.objectProperties.serverSideEncryption, validation = options.validation, signature = options.signature, successRedirectUrl = options.iframeSupport.localBlankPagePath, credentialsProvider = options.signature.credentialsProvider, getSignatureAjaxRequester = new qq.s3.RequestSigner({
            signatureSpec: signature,
            cors: options.cors,
            log: log
        });
        if (successRedirectUrl === undefined) {
            throw new Error("successRedirectEndpoint MUST be defined if you intend to use browsers that do not support the File API!");
        }
        function isValidResponse(id, iframe) {
            var response, endpoint = options.endpointStore.get(id), bucket = handler._getFileState(id).bucket, doc, innerHtml, responseData;
            try {
                doc = iframe.contentDocument || iframe.contentWindow.document;
                innerHtml = doc.body.innerHTML;
                responseData = qq.s3.util.parseIframeResponse(iframe);
                if (responseData.bucket === bucket && responseData.key === qq.s3.util.encodeQueryStringParam(handler.getThirdPartyFileId(id))) {
                    return true;
                }
                log("Response from AWS included an unexpected bucket or key name.", "error");
            } catch (error) {
                log("Error when attempting to parse form upload response (" + error.message + ")", "error");
            }
            return false;
        }
        function generateAwsParams(id) {
            var customParams = paramsStore.get(id);
            customParams[filenameParam] = getName(id);
            return qq.s3.util.generateAwsParams({
                endpoint: endpointStore.get(id),
                clockDrift: clockDrift,
                params: customParams,
                bucket: handler._getFileState(id).bucket,
                key: handler.getThirdPartyFileId(id),
                accessKey: credentialsProvider.get().accessKey,
                sessionToken: credentialsProvider.get().sessionToken,
                acl: aclStore.get(id),
                minFileSize: validation.minSizeLimit,
                maxFileSize: validation.maxSizeLimit,
                successRedirectUrl: successRedirectUrl,
                reducedRedundancy: reducedRedundancy,
                region: region,
                serverSideEncryption: serverSideEncryption,
                signatureVersion: signature.version,
                log: log
            }, qq.bind(getSignatureAjaxRequester.getSignature, this, id));
        }
        function createForm(id, iframe) {
            var promise = new qq.Promise(), method = "POST", endpoint = options.endpointStore.get(id), fileName = getName(id);
            generateAwsParams(id).then(function(params) {
                var form = handler._initFormForUpload({
                    method: method,
                    endpoint: endpoint,
                    params: params,
                    paramsInBody: true,
                    targetName: iframe.name
                });
                promise.success(form);
            }, function(errorMessage) {
                promise.failure(errorMessage);
                handleFinishedUpload(id, iframe, fileName, {
                    error: errorMessage
                });
            });
            return promise;
        }
        function handleUpload(id) {
            var iframe = handler._createIframe(id), input = handler.getInput(id), promise = new qq.Promise();
            createForm(id, iframe).then(function(form) {
                form.appendChild(input);
                handler._attachLoadEvent(iframe, function(response) {
                    log("iframe loaded");
                    if (response) {
                        if (response.success === false) {
                            log("Amazon likely rejected the upload request", "error");
                            promise.failure(response);
                        }
                    } else {
                        response = {};
                        response.success = isValidResponse(id, iframe);
                        if (response.success === false) {
                            log("A success response was received by Amazon, but it was invalid in some way.", "error");
                            promise.failure(response);
                        } else {
                            qq.extend(response, qq.s3.util.parseIframeResponse(iframe));
                            promise.success(response);
                        }
                    }
                    handleFinishedUpload(id, iframe);
                });
                log("Sending upload request for " + id);
                form.submit();
                qq(form).remove();
            }, promise.failure);
            return promise;
        }
        function handleFinishedUpload(id, iframe) {
            handler._detachLoadEvent(id);
            iframe && qq(iframe).remove();
        }
        qq.extend(this, new qq.FormUploadHandler({
            options: {
                isCors: false,
                inputName: "file"
            },
            proxy: {
                onCancel: options.onCancel,
                onUuidChanged: onUuidChanged,
                getName: getName,
                getUuid: getUuid,
                log: log
            }
        }));
        qq.extend(this, {
            uploadFile: function(id) {
                var name = getName(id), promise = new qq.Promise();
                if (handler.getThirdPartyFileId(id)) {
                    if (handler._getFileState(id).bucket) {
                        handleUpload(id).then(promise.success, promise.failure);
                    } else {
                        onGetBucket(id).then(function(bucket) {
                            handler._getFileState(id).bucket = bucket;
                            handleUpload(id).then(promise.success, promise.failure);
                        });
                    }
                } else {
                    onGetKeyName(id, name).then(function(key) {
                        onGetBucket(id).then(function(bucket) {
                            handler._getFileState(id).bucket = bucket;
                            handler._setThirdPartyFileId(id, key);
                            handleUpload(id).then(promise.success, promise.failure);
                        }, function(errorReason) {
                            promise.failure({
                                error: errorReason
                            });
                        });
                    }, function(errorReason) {
                        promise.failure({
                            error: errorReason
                        });
                    });
                }
                return promise;
            }
        });
    };
    qq.azure = qq.azure || {};
    qq.azure.util = qq.azure.util || function() {
        "use strict";
        return {
            AZURE_PARAM_PREFIX: "x-ms-meta-",
            _paramNameMatchesAzureParameter: function(name) {
                switch (name) {
                  case "Cache-Control":
                  case "Content-Disposition":
                  case "Content-Encoding":
                  case "Content-MD5":
                  case "x-ms-blob-content-encoding":
                  case "x-ms-blob-content-disposition":
                  case "x-ms-blob-content-md5":
                  case "x-ms-blob-cache-control":
                    return true;

                  default:
                    return false;
                }
            },
            _getPrefixedParamName: function(name) {
                if (qq.azure.util._paramNameMatchesAzureParameter(name)) {
                    return name;
                } else {
                    return qq.azure.util.AZURE_PARAM_PREFIX + name;
                }
            },
            getParamsAsHeaders: function(params) {
                var headers = {};
                qq.each(params, function(name, val) {
                    var headerName = qq.azure.util._getPrefixedParamName(name), value = null;
                    if (qq.isFunction(val)) {
                        value = String(val());
                    } else if (qq.isObject(val)) {
                        qq.extend(headers, qq.azure.util.getParamsAsHeaders(val));
                    } else {
                        value = String(val);
                    }
                    if (value !== null) {
                        if (qq.azure.util._paramNameMatchesAzureParameter(name)) {
                            headers[headerName] = value;
                        } else {
                            headers[headerName] = encodeURIComponent(value);
                        }
                    }
                });
                return headers;
            },
            parseAzureError: function(responseText, log) {
                var domParser = new DOMParser(), responseDoc = domParser.parseFromString(responseText, "application/xml"), errorTag = responseDoc.getElementsByTagName("Error")[0], errorDetails = {}, codeTag, messageTag;
                log("Received error response: " + responseText, "error");
                if (errorTag) {
                    messageTag = errorTag.getElementsByTagName("Message")[0];
                    if (messageTag) {
                        errorDetails.message = messageTag.textContent;
                    }
                    codeTag = errorTag.getElementsByTagName("Code")[0];
                    if (codeTag) {
                        errorDetails.code = codeTag.textContent;
                    }
                    log("Parsed Azure error: " + JSON.stringify(errorDetails), "error");
                    return errorDetails;
                }
            }
        };
    }();
    (function() {
        "use strict";
        qq.nonTraditionalBasePublicApi = {
            setUploadSuccessParams: function(params, id) {
                this._uploadSuccessParamsStore.set(params, id);
            },
            setUploadSuccessEndpoint: function(endpoint, id) {
                this._uploadSuccessEndpointStore.set(endpoint, id);
            }
        };
        qq.nonTraditionalBasePrivateApi = {
            _onComplete: function(id, name, result, xhr) {
                var success = result.success ? true : false, self = this, onCompleteArgs = arguments, successEndpoint = this._uploadSuccessEndpointStore.get(id), successCustomHeaders = this._options.uploadSuccess.customHeaders, successMethod = this._options.uploadSuccess.method, cors = this._options.cors, promise = new qq.Promise(), uploadSuccessParams = this._uploadSuccessParamsStore.get(id), fileParams = this._paramsStore.get(id), onSuccessFromServer = function(successRequestResult) {
                    delete self._failedSuccessRequestCallbacks[id];
                    qq.extend(result, successRequestResult);
                    qq.FineUploaderBasic.prototype._onComplete.apply(self, onCompleteArgs);
                    promise.success(successRequestResult);
                }, onFailureFromServer = function(successRequestResult) {
                    var callback = submitSuccessRequest;
                    qq.extend(result, successRequestResult);
                    if (result && result.reset) {
                        callback = null;
                    }
                    if (!callback) {
                        delete self._failedSuccessRequestCallbacks[id];
                    } else {
                        self._failedSuccessRequestCallbacks[id] = callback;
                    }
                    if (!self._onAutoRetry(id, name, result, xhr, callback)) {
                        qq.FineUploaderBasic.prototype._onComplete.apply(self, onCompleteArgs);
                        promise.failure(successRequestResult);
                    }
                }, submitSuccessRequest, successAjaxRequester;
                if (success && successEndpoint) {
                    successAjaxRequester = new qq.UploadSuccessAjaxRequester({
                        endpoint: successEndpoint,
                        method: successMethod,
                        customHeaders: successCustomHeaders,
                        cors: cors,
                        log: qq.bind(this.log, this)
                    });
                    qq.extend(uploadSuccessParams, self._getEndpointSpecificParams(id, result, xhr), true);
                    fileParams && qq.extend(uploadSuccessParams, fileParams, true);
                    submitSuccessRequest = qq.bind(function() {
                        successAjaxRequester.sendSuccessRequest(id, uploadSuccessParams).then(onSuccessFromServer, onFailureFromServer);
                    }, self);
                    submitSuccessRequest();
                    return promise;
                }
                return qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments);
            },
            _manualRetry: function(id) {
                var successRequestCallback = this._failedSuccessRequestCallbacks[id];
                return qq.FineUploaderBasic.prototype._manualRetry.call(this, id, successRequestCallback);
            }
        };
    })();
    (function() {
        "use strict";
        qq.azure.FineUploaderBasic = function(o) {
            if (!qq.supportedFeatures.ajaxUploading) {
                throw new qq.Error("Uploading directly to Azure is not possible in this browser.");
            }
            var options = {
                signature: {
                    endpoint: null,
                    customHeaders: {}
                },
                blobProperties: {
                    name: "uuid"
                },
                uploadSuccess: {
                    endpoint: null,
                    method: "POST",
                    params: {},
                    customHeaders: {}
                },
                chunking: {
                    partSize: 4e6,
                    minFileSize: 4000001
                }
            };
            qq.extend(options, o, true);
            qq.FineUploaderBasic.call(this, options);
            this._uploadSuccessParamsStore = this._createStore(this._options.uploadSuccess.params);
            this._uploadSuccessEndpointStore = this._createStore(this._options.uploadSuccess.endpoint);
            this._failedSuccessRequestCallbacks = {};
            this._cannedBlobNames = {};
        };
        qq.extend(qq.azure.FineUploaderBasic.prototype, qq.basePublicApi);
        qq.extend(qq.azure.FineUploaderBasic.prototype, qq.basePrivateApi);
        qq.extend(qq.azure.FineUploaderBasic.prototype, qq.nonTraditionalBasePublicApi);
        qq.extend(qq.azure.FineUploaderBasic.prototype, qq.nonTraditionalBasePrivateApi);
        qq.extend(qq.azure.FineUploaderBasic.prototype, {
            getBlobName: function(id) {
                if (this._cannedBlobNames[id] == null) {
                    return this._handler.getThirdPartyFileId(id);
                }
                return this._cannedBlobNames[id];
            },
            _getEndpointSpecificParams: function(id) {
                return {
                    blob: this.getBlobName(id),
                    uuid: this.getUuid(id),
                    name: this.getName(id),
                    container: this._endpointStore.get(id)
                };
            },
            _createUploadHandler: function() {
                return qq.FineUploaderBasic.prototype._createUploadHandler.call(this, {
                    signature: this._options.signature,
                    onGetBlobName: qq.bind(this._determineBlobName, this),
                    deleteBlob: qq.bind(this._deleteBlob, this, true)
                }, "azure");
            },
            _determineBlobName: function(id) {
                var self = this, blobNameOptionValue = this._options.blobProperties.name, uuid = this.getUuid(id), filename = this.getName(id), fileExtension = qq.getExtension(filename), blobNameToUse = uuid;
                if (qq.isString(blobNameOptionValue)) {
                    switch (blobNameOptionValue) {
                      case "uuid":
                        if (fileExtension !== undefined) {
                            blobNameToUse += "." + fileExtension;
                        }
                        return new qq.Promise().success(blobNameToUse);

                      case "filename":
                        return new qq.Promise().success(filename);

                      default:
                        return new qq.Promise.failure("Invalid blobName option value - " + blobNameOptionValue);
                    }
                } else {
                    return blobNameOptionValue.call(this, id);
                }
            },
            _addCannedFile: function(sessionData) {
                var id;
                if (sessionData.blobName == null) {
                    throw new qq.Error("Did not find blob name property in server session response.  This is required!");
                } else {
                    id = qq.FineUploaderBasic.prototype._addCannedFile.apply(this, arguments);
                    this._cannedBlobNames[id] = sessionData.blobName;
                }
                return id;
            },
            _deleteBlob: function(relatedToCancel, id) {
                var self = this, deleteBlobSasUri = {}, blobUriStore = {
                    get: function(id) {
                        return self._endpointStore.get(id) + "/" + self.getBlobName(id);
                    }
                }, deleteFileEndpointStore = {
                    get: function(id) {
                        return deleteBlobSasUri[id];
                    }
                }, getSasSuccess = function(id, sasUri) {
                    deleteBlobSasUri[id] = sasUri;
                    deleteBlob.send(id);
                }, getSasFailure = function(id, reason, xhr) {
                    if (relatedToCancel) {
                        self.log("Will cancel upload, but cannot remove uncommitted parts from Azure due to issue retrieving SAS", "error");
                        qq.FineUploaderBasic.prototype._onCancel.call(self, id, self.getName(id));
                    } else {
                        self._onDeleteComplete(id, xhr, true);
                        self._options.callbacks.onDeleteComplete(id, xhr, true);
                    }
                }, deleteBlob = new qq.azure.DeleteBlob({
                    endpointStore: deleteFileEndpointStore,
                    log: qq.bind(self.log, self),
                    onDelete: function(id) {
                        self._onDelete(id);
                        self._options.callbacks.onDelete(id);
                    },
                    onDeleteComplete: function(id, xhrOrXdr, isError) {
                        delete deleteBlobSasUri[id];
                        if (isError) {
                            if (relatedToCancel) {
                                self.log("Will cancel upload, but failed to remove uncommitted parts from Azure.", "error");
                            } else {
                                qq.azure.util.parseAzureError(xhrOrXdr.responseText, qq.bind(self.log, self));
                            }
                        }
                        if (relatedToCancel) {
                            qq.FineUploaderBasic.prototype._onCancel.call(self, id, self.getName(id));
                            self.log("Deleted uncommitted blob chunks for " + id);
                        } else {
                            self._onDeleteComplete(id, xhrOrXdr, isError);
                            self._options.callbacks.onDeleteComplete(id, xhrOrXdr, isError);
                        }
                    }
                }), getSas = new qq.azure.GetSas({
                    cors: this._options.cors,
                    customHeaders: this._options.signature.customHeaders,
                    endpointStore: {
                        get: function() {
                            return self._options.signature.endpoint;
                        }
                    },
                    restRequestVerb: deleteBlob.method,
                    log: qq.bind(self.log, self)
                });
                getSas.request(id, blobUriStore.get(id)).then(qq.bind(getSasSuccess, self, id), qq.bind(getSasFailure, self, id));
            },
            _createDeleteHandler: function() {
                var self = this;
                return {
                    sendDelete: function(id, uuid) {
                        self._deleteBlob(false, id);
                    }
                };
            }
        });
    })();
    qq.azure.XhrUploadHandler = function(spec, proxy) {
        "use strict";
        var handler = this, log = proxy.log, cors = spec.cors, endpointStore = spec.endpointStore, paramsStore = spec.paramsStore, signature = spec.signature, filenameParam = spec.filenameParam, minFileSizeForChunking = spec.chunking.minFileSize, deleteBlob = spec.deleteBlob, onGetBlobName = spec.onGetBlobName, getName = proxy.getName, getSize = proxy.getSize, getBlobMetadata = function(id) {
            var params = paramsStore.get(id);
            params[filenameParam] = getName(id);
            return params;
        }, api = {
            putBlob: new qq.azure.PutBlob({
                getBlobMetadata: getBlobMetadata,
                log: log
            }),
            putBlock: new qq.azure.PutBlock({
                log: log
            }),
            putBlockList: new qq.azure.PutBlockList({
                getBlobMetadata: getBlobMetadata,
                log: log
            }),
            getSasForPutBlobOrBlock: new qq.azure.GetSas({
                cors: cors,
                customHeaders: signature.customHeaders,
                endpointStore: {
                    get: function() {
                        return signature.endpoint;
                    }
                },
                log: log,
                restRequestVerb: "PUT"
            })
        };
        function combineChunks(id) {
            var promise = new qq.Promise();
            getSignedUrl(id).then(function(sasUri) {
                var mimeType = handler._getMimeType(id), blockIdEntries = handler._getPersistableData(id).blockIdEntries;
                api.putBlockList.send(id, sasUri, blockIdEntries, mimeType, function(xhr) {
                    handler._registerXhr(id, null, xhr, api.putBlockList);
                }).then(function(xhr) {
                    log("Success combining chunks for id " + id);
                    promise.success({}, xhr);
                }, function(xhr) {
                    log("Attempt to combine chunks failed for id " + id, "error");
                    handleFailure(xhr, promise);
                });
            }, promise.failure);
            return promise;
        }
        function determineBlobUrl(id) {
            var containerUrl = endpointStore.get(id), promise = new qq.Promise(), getBlobNameSuccess = function(blobName) {
                handler._setThirdPartyFileId(id, blobName);
                promise.success(containerUrl + "/" + blobName);
            }, getBlobNameFailure = function(reason) {
                promise.failure(reason);
            };
            onGetBlobName(id).then(getBlobNameSuccess, getBlobNameFailure);
            return promise;
        }
        function getSignedUrl(id, optChunkIdx) {
            var getSasId = optChunkIdx == null ? id : id + "." + optChunkIdx, promise = new qq.Promise(), getSasSuccess = function(sasUri) {
                log("GET SAS request succeeded.");
                promise.success(sasUri);
            }, getSasFailure = function(reason, getSasXhr) {
                log("GET SAS request failed: " + reason, "error");
                promise.failure({
                    error: "Problem communicating with local server"
                }, getSasXhr);
            }, determineBlobUrlSuccess = function(blobUrl) {
                api.getSasForPutBlobOrBlock.request(getSasId, blobUrl).then(getSasSuccess, getSasFailure);
            }, determineBlobUrlFailure = function(reason) {
                log(qq.format("Failed to determine blob name for ID {} - {}", id, reason), "error");
                promise.failure({
                    error: reason
                });
            };
            determineBlobUrl(id).then(determineBlobUrlSuccess, determineBlobUrlFailure);
            return promise;
        }
        function handleFailure(xhr, promise) {
            var azureError = qq.azure.util.parseAzureError(xhr.responseText, log), errorMsg = "Problem sending file to Azure";
            promise.failure({
                error: errorMsg,
                azureError: azureError && azureError.message,
                reset: xhr.status === 403
            });
        }
        qq.extend(this, {
            uploadChunk: function(id, chunkIdx) {
                var promise = new qq.Promise();
                getSignedUrl(id, chunkIdx).then(function(sasUri) {
                    var xhr = handler._createXhr(id, chunkIdx), chunkData = handler._getChunkData(id, chunkIdx);
                    handler._registerProgressHandler(id, chunkIdx, chunkData.size);
                    handler._registerXhr(id, chunkIdx, xhr, api.putBlock);
                    api.putBlock.upload(id + "." + chunkIdx, xhr, sasUri, chunkIdx, chunkData.blob).then(function(blockIdEntry) {
                        if (!handler._getPersistableData(id).blockIdEntries) {
                            handler._getPersistableData(id).blockIdEntries = [];
                        }
                        handler._getPersistableData(id).blockIdEntries.push(blockIdEntry);
                        log("Put Block call succeeded for " + id);
                        promise.success({}, xhr);
                    }, function() {
                        log(qq.format("Put Block call failed for ID {} on part {}", id, chunkIdx), "error");
                        handleFailure(xhr, promise);
                    });
                }, promise.failure);
                return promise;
            },
            uploadFile: function(id) {
                var promise = new qq.Promise(), fileOrBlob = handler.getFile(id);
                getSignedUrl(id).then(function(sasUri) {
                    var xhr = handler._createXhr(id);
                    handler._registerProgressHandler(id);
                    api.putBlob.upload(id, xhr, sasUri, fileOrBlob).then(function() {
                        log("Put Blob call succeeded for " + id);
                        promise.success({}, xhr);
                    }, function() {
                        log("Put Blob call failed for " + id, "error");
                        handleFailure(xhr, promise);
                    });
                }, promise.failure);
                return promise;
            }
        });
        qq.extend(this, new qq.XhrUploadHandler({
            options: qq.extend({
                namespace: "azure"
            }, spec),
            proxy: qq.extend({
                getEndpoint: spec.endpointStore.get
            }, proxy)
        }));
        qq.override(this, function(super_) {
            return {
                expunge: function(id) {
                    var relatedToCancel = handler._wasCanceled(id), chunkingData = handler._getPersistableData(id), blockIdEntries = chunkingData && chunkingData.blockIdEntries || [];
                    if (relatedToCancel && blockIdEntries.length > 0) {
                        deleteBlob(id);
                    }
                    super_.expunge(id);
                },
                finalizeChunks: function(id) {
                    return combineChunks(id);
                },
                _shouldChunkThisFile: function(id) {
                    var maybePossible = super_._shouldChunkThisFile(id);
                    return maybePossible && getSize(id) >= minFileSizeForChunking;
                }
            };
        });
    };
    qq.azure.GetSas = function(o) {
        "use strict";
        var requester, options = {
            cors: {
                expected: false,
                sendCredentials: false
            },
            customHeaders: {},
            restRequestVerb: "PUT",
            endpointStore: null,
            log: function(str, level) {}
        }, requestPromises = {};
        qq.extend(options, o);
        function sasResponseReceived(id, xhr, isError) {
            var promise = requestPromises[id];
            if (isError) {
                promise.failure("Received response code " + xhr.status, xhr);
            } else {
                if (xhr.responseText.length) {
                    promise.success(xhr.responseText);
                } else {
                    promise.failure("Empty response.", xhr);
                }
            }
            delete requestPromises[id];
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: [ "GET" ],
            method: "GET",
            successfulResponseCodes: {
                GET: [ 200 ]
            },
            contentType: null,
            customHeaders: options.customHeaders,
            endpointStore: options.endpointStore,
            cors: options.cors,
            log: options.log,
            onComplete: sasResponseReceived
        }));
        qq.extend(this, {
            request: function(id, blobUri) {
                var requestPromise = new qq.Promise(), restVerb = options.restRequestVerb;
                options.log(qq.format("Submitting GET SAS request for a {} REST request related to file ID {}.", restVerb, id));
                requestPromises[id] = requestPromise;
                requester.initTransport(id).withParams({
                    bloburi: blobUri,
                    _method: restVerb
                }).withCacheBuster().send();
                return requestPromise;
            }
        });
    };
    qq.UploadSuccessAjaxRequester = function(o) {
        "use strict";
        var requester, pendingRequests = [], options = {
            method: "POST",
            endpoint: null,
            maxConnections: 3,
            customHeaders: {},
            paramsStore: {},
            cors: {
                expected: false,
                sendCredentials: false
            },
            log: function(str, level) {}
        };
        qq.extend(options, o);
        function handleSuccessResponse(id, xhrOrXdr, isError) {
            var promise = pendingRequests[id], responseJson = xhrOrXdr.responseText, successIndicator = {
                success: true
            }, failureIndicator = {
                success: false
            }, parsedResponse;
            delete pendingRequests[id];
            options.log(qq.format("Received the following response body to an upload success request for id {}: {}", id, responseJson));
            try {
                parsedResponse = qq.parseJson(responseJson);
                if (isError || parsedResponse && (parsedResponse.error || parsedResponse.success === false)) {
                    options.log("Upload success request was rejected by the server.", "error");
                    promise.failure(qq.extend(parsedResponse, failureIndicator));
                } else {
                    options.log("Upload success was acknowledged by the server.");
                    promise.success(qq.extend(parsedResponse, successIndicator));
                }
            } catch (error) {
                if (isError) {
                    options.log(qq.format("Your server indicated failure in its upload success request response for id {}!", id), "error");
                    promise.failure(failureIndicator);
                } else {
                    options.log("Upload success was acknowledged by the server.");
                    promise.success(successIndicator);
                }
            }
        }
        requester = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            method: options.method,
            endpointStore: {
                get: function() {
                    return options.endpoint;
                }
            },
            paramsStore: options.paramsStore,
            maxConnections: options.maxConnections,
            customHeaders: options.customHeaders,
            log: options.log,
            onComplete: handleSuccessResponse,
            cors: options.cors
        }));
        qq.extend(this, {
            sendSuccessRequest: function(id, spec) {
                var promise = new qq.Promise();
                options.log("Submitting upload success request/notification for " + id);
                requester.initTransport(id).withParams(spec).send();
                pendingRequests[id] = promise;
                return promise;
            }
        });
    };
    qq.azure.DeleteBlob = function(o) {
        "use strict";
        var requester, method = "DELETE", options = {
            endpointStore: {},
            onDelete: function(id) {},
            onDeleteComplete: function(id, xhr, isError) {},
            log: function(str, level) {}
        };
        qq.extend(options, o);
        requester = qq.extend(this, new qq.AjaxRequester({
            validMethods: [ method ],
            method: method,
            successfulResponseCodes: function() {
                var codes = {};
                codes[method] = [ 202 ];
                return codes;
            }(),
            contentType: null,
            endpointStore: options.endpointStore,
            allowXRequestedWithAndCacheControl: false,
            cors: {
                expected: true
            },
            log: options.log,
            onSend: options.onDelete,
            onComplete: options.onDeleteComplete
        }));
        qq.extend(this, {
            method: method,
            send: function(id) {
                options.log("Submitting Delete Blob request for " + id);
                return requester.initTransport(id).send();
            }
        });
    };
    qq.azure.PutBlob = function(o) {
        "use strict";
        var requester, method = "PUT", options = {
            getBlobMetadata: function(id) {},
            log: function(str, level) {}
        }, endpoints = {}, promises = {}, endpointHandler = {
            get: function(id) {
                return endpoints[id];
            }
        };
        qq.extend(options, o);
        requester = qq.extend(this, new qq.AjaxRequester({
            validMethods: [ method ],
            method: method,
            successfulResponseCodes: function() {
                var codes = {};
                codes[method] = [ 201 ];
                return codes;
            }(),
            contentType: null,
            customHeaders: function(id) {
                var params = options.getBlobMetadata(id), headers = qq.azure.util.getParamsAsHeaders(params);
                headers["x-ms-blob-type"] = "BlockBlob";
                return headers;
            },
            endpointStore: endpointHandler,
            allowXRequestedWithAndCacheControl: false,
            cors: {
                expected: true
            },
            log: options.log,
            onComplete: function(id, xhr, isError) {
                var promise = promises[id];
                delete endpoints[id];
                delete promises[id];
                if (isError) {
                    promise.failure();
                } else {
                    promise.success();
                }
            }
        }));
        qq.extend(this, {
            method: method,
            upload: function(id, xhr, url, file) {
                var promise = new qq.Promise();
                options.log("Submitting Put Blob request for " + id);
                promises[id] = promise;
                endpoints[id] = url;
                requester.initTransport(id).withPayload(file).withHeaders({
                    "Content-Type": file.type
                }).send(xhr);
                return promise;
            }
        });
    };
    qq.azure.PutBlock = function(o) {
        "use strict";
        var requester, method = "PUT", blockIdEntries = {}, promises = {}, options = {
            log: function(str, level) {}
        }, endpoints = {}, endpointHandler = {
            get: function(id) {
                return endpoints[id];
            }
        };
        qq.extend(options, o);
        requester = qq.extend(this, new qq.AjaxRequester({
            validMethods: [ method ],
            method: method,
            successfulResponseCodes: function() {
                var codes = {};
                codes[method] = [ 201 ];
                return codes;
            }(),
            contentType: null,
            endpointStore: endpointHandler,
            allowXRequestedWithAndCacheControl: false,
            cors: {
                expected: true
            },
            log: options.log,
            onComplete: function(id, xhr, isError) {
                var promise = promises[id], blockIdEntry = blockIdEntries[id];
                delete endpoints[id];
                delete promises[id];
                delete blockIdEntries[id];
                if (isError) {
                    promise.failure();
                } else {
                    promise.success(blockIdEntry);
                }
            }
        }));
        function createBlockId(partNum) {
            var digits = 5, zeros = new Array(digits + 1).join("0"), paddedPartNum = (zeros + partNum).slice(-digits);
            return btoa(paddedPartNum);
        }
        qq.extend(this, {
            method: method,
            upload: function(id, xhr, sasUri, partNum, blob) {
                var promise = new qq.Promise(), blockId = createBlockId(partNum);
                promises[id] = promise;
                options.log(qq.format("Submitting Put Block request for {} = part {}", id, partNum));
                endpoints[id] = qq.format("{}&comp=block&blockid={}", sasUri, encodeURIComponent(blockId));
                blockIdEntries[id] = {
                    part: partNum,
                    id: blockId
                };
                requester.initTransport(id).withPayload(blob).send(xhr);
                return promise;
            }
        });
    };
    qq.azure.PutBlockList = function(o) {
        "use strict";
        var requester, method = "PUT", promises = {}, options = {
            getBlobMetadata: function(id) {},
            log: function(str, level) {}
        }, endpoints = {}, endpointHandler = {
            get: function(id) {
                return endpoints[id];
            }
        };
        qq.extend(options, o);
        requester = qq.extend(this, new qq.AjaxRequester({
            validMethods: [ method ],
            method: method,
            successfulResponseCodes: function() {
                var codes = {};
                codes[method] = [ 201 ];
                return codes;
            }(),
            customHeaders: function(id) {
                var params = options.getBlobMetadata(id);
                return qq.azure.util.getParamsAsHeaders(params);
            },
            contentType: "text/plain",
            endpointStore: endpointHandler,
            allowXRequestedWithAndCacheControl: false,
            cors: {
                expected: true
            },
            log: options.log,
            onSend: function() {},
            onComplete: function(id, xhr, isError) {
                var promise = promises[id];
                delete endpoints[id];
                delete promises[id];
                if (isError) {
                    promise.failure(xhr);
                } else {
                    promise.success(xhr);
                }
            }
        }));
        function createRequestBody(blockIdEntries) {
            var doc = document.implementation.createDocument(null, "BlockList", null);
            blockIdEntries.sort(function(a, b) {
                return a.part - b.part;
            });
            qq.each(blockIdEntries, function(idx, blockIdEntry) {
                var latestEl = doc.createElement("Latest"), latestTextEl = doc.createTextNode(blockIdEntry.id);
                latestEl.appendChild(latestTextEl);
                qq(doc).children()[0].appendChild(latestEl);
            });
            return new XMLSerializer().serializeToString(doc);
        }
        qq.extend(this, {
            method: method,
            send: function(id, sasUri, blockIdEntries, fileMimeType, registerXhrCallback) {
                var promise = new qq.Promise(), blockIdsXml = createRequestBody(blockIdEntries), xhr;
                promises[id] = promise;
                options.log(qq.format("Submitting Put Block List request for {}", id));
                endpoints[id] = qq.format("{}&comp=blocklist", sasUri);
                xhr = requester.initTransport(id).withPayload(blockIdsXml).withHeaders({
                    "x-ms-blob-content-type": fileMimeType
                }).send();
                registerXhrCallback(xhr);
                return promise;
            }
        });
    };
})(window);
//# sourceMappingURL=all.fine-uploader.core.js.map