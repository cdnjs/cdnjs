// Version: 4.0.2
// https://github.com/DevExpress/DevExtreme.AspNet.Data
// Copyright (c) Developer Express Inc.

/* global DevExpress:false, jQuery:false */

(function(factory) {
    "use strict";

    function unwrapESModule(module) {
        return module && module.__esModule && module.default ? module.default : module;
    }

    if(typeof define === "function" && define.amd) {
        define(function(require, exports, module) {
            module.exports = factory(
                unwrapESModule(require("devextreme/core/utils/ajax")),
                require("jquery").Deferred,
                require("jquery").extend,
                unwrapESModule(require("devextreme/data/custom_store")),
                unwrapESModule(require("devextreme/data/utils"))
            );
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(
            unwrapESModule(require("devextreme/core/utils/ajax")),
            require("jquery").Deferred,
            require("jquery").extend,
            unwrapESModule(require("devextreme/data/custom_store")),
            unwrapESModule(require("devextreme/data/utils"))
        );
    } else {
        DevExpress.data.AspNet = factory(
            DevExpress.utils.ajax || { sendRequest: jQuery.ajax },
            jQuery.Deferred,
            jQuery.extend,
            DevExpress.data.CustomStore,
            DevExpress.data.utils
        );
    }

})(function(ajaxUtility, Deferred, extend, CustomStore, dataUtils) {
    "use strict";

    var CUSTOM_STORE_OPTIONS = [
        "onLoading", "onLoaded",
        "onInserting", "onInserted",
        "onUpdating", "onUpdated",
        "onRemoving", "onRemoved",
        "onModifying", "onModified",
        "onPush",
        "loadMode", "cacheRawData",
        "errorHandler"
    ];

    function createStoreConfig(options) {
        var keyExpr = options.key,
            loadUrl = options.loadUrl,
            loadMethod = options.loadMethod || "GET",
            loadParams = options.loadParams,
            isRawLoadMode = options.loadMode === "raw",
            updateUrl = options.updateUrl,
            insertUrl = options.insertUrl,
            deleteUrl = options.deleteUrl,
            onBeforeSend = options.onBeforeSend,
            onAjaxError = options.onAjaxError;

        function send(operation, requiresKey, ajaxSettings, customSuccessHandler) {
            var d = Deferred(),
                thenable,
                beforeSendResult;

            function sendCore() {
                ajaxUtility.sendRequest(ajaxSettings).then(
                    function(res, textStatus, xhr) {
                        if(customSuccessHandler)
                            customSuccessHandler(d, res, xhr);
                        else
                            d.resolve();
                    },
                    function(xhr, textStatus) {
                        var error = getErrorMessageFromXhr(xhr);

                        if(onAjaxError) {
                            var e = { xhr: xhr, error: error };
                            onAjaxError(e);
                            error = e.error;
                        }

                        if(error)
                            d.reject(error);
                        else
                            d.reject(xhr, textStatus);
                    }
                );
            }

            if(requiresKey && !keyExpr) {
                d.reject(new Error("Primary key is not specified (operation: '" + operation + "', url: '" + ajaxSettings.url + "')"));
            } else {
                if(operation === "load") {
                    ajaxSettings.cache = false;
                    ajaxSettings.dataType = "json";
                } else {
                    ajaxSettings.dataType = "text";
                }

                if(onBeforeSend) {
                    beforeSendResult = onBeforeSend(operation, ajaxSettings);
                    if(beforeSendResult && typeof beforeSendResult.then === "function")
                        thenable = beforeSendResult;
                }

                if(thenable)
                    thenable.then(sendCore, function(error) { d.reject(error); });
                else
                    sendCore();
            }

            return d.promise();
        }

        function filterByKey(keyValue) {
            if(!Array.isArray(keyExpr))
                return [keyExpr, keyValue];

            return keyExpr.map(function(i) {
                return [i, keyValue[i]];
            });
        }

        function loadOptionsToActionParams(options, isCountQuery) {
            var result = {};

            if(isCountQuery)
                result.isCountQuery = isCountQuery;

            if(options) {

                ["skip", "take", "requireTotalCount", "requireGroupCount"].forEach(function(i) {
                    if(options[i] !== undefined)
                        result[i] = options[i];
                });

                var normalizeSorting = dataUtils.normalizeSortingInfo,
                    group = options.group,
                    filter = options.filter,
                    select = options.select;

                if(options.sort)
                    result.sort = JSON.stringify(normalizeSorting(options.sort));

                if(group) {
                    if(!isAdvancedGrouping(group))
                        group = normalizeSorting(group);
                    result.group = JSON.stringify(group);
                }

                if(Array.isArray(filter)) {
                    filter = extend(true, [], filter);
                    stringifyDatesInFilter(filter);
                    result.filter = JSON.stringify(filter);
                }

                if(options.totalSummary)
                    result.totalSummary = JSON.stringify(options.totalSummary);

                if(options.groupSummary)
                    result.groupSummary = JSON.stringify(options.groupSummary);

                if(select) {
                    if(!Array.isArray(select))
                        select = [ select ];
                    result.select = JSON.stringify(select);
                }
            }

            extend(result, loadParams);

            return result;
        }

        function handleInsertUpdateSuccess(d, res, xhr) {
            var mime = xhr.getResponseHeader("Content-Type"),
                isJSON = mime && mime.indexOf("application/json") > -1;
            d.resolve(isJSON ? JSON.parse(res) : res);
        }

        var result = {
            key: keyExpr,
            useDefaultSearch: true,

            load: function(loadOptions) {
                return send(
                    "load",
                    false,
                    {
                        url: loadUrl,
                        method: loadMethod,
                        data: loadOptionsToActionParams(loadOptions)
                    },
                    function(d, res) {
                        processLoadResponse(d, res, function(res) {
                            return [ res.data, createLoadExtra(res) ];
                        });
                    }
                );
            },

            totalCount: !isRawLoadMode && function(loadOptions) {
                return send(
                    "load",
                    false,
                    {
                        url: loadUrl,
                        method: loadMethod,
                        data: loadOptionsToActionParams(loadOptions, true)
                    },
                    function(d, res) {
                        processLoadResponse(d, res, function(res) {
                            return [ res.totalCount ];
                        });
                    }
                );
            },

            byKey: !isRawLoadMode && function(key) {
                return send(
                    "load",
                    true,
                    {
                        url: loadUrl,
                        method: loadMethod,
                        data: loadOptionsToActionParams({ filter: filterByKey(key) })
                    },
                    function(d, res) {
                        processLoadResponse(d, res, function(res) {
                            return [ res.data[0] ];
                        });
                    }
                );
            },

            update: updateUrl && function(key, values) {
                return send(
                    "update",
                    true,
                    {
                        url: updateUrl,
                        method: options.updateMethod || "PUT",
                        data: {
                            key: serializeKey(key),
                            values: JSON.stringify(values)
                        }
                    },
                    handleInsertUpdateSuccess
                );
            },

            insert: insertUrl && function(values) {
                return send(
                    "insert",
                    true,
                    {
                        url: insertUrl,
                        method: options.insertMethod || "POST",
                        data: { values: JSON.stringify(values) }
                    },
                    handleInsertUpdateSuccess
                );
            },

            remove: deleteUrl && function(key) {
                return send("delete", true, {
                    url: deleteUrl,
                    method: options.deleteMethod || "DELETE",
                    data: { key: serializeKey(key) }
                });
            }

        };

        CUSTOM_STORE_OPTIONS.forEach(function(name) {
            var value = options[name];
            if(value !== undefined)
                result[name] = value;
        });

        return result;
    }

    function processLoadResponse(d, res, getResolveArgs) {
        res = expandLoadResponse(res);

        if(!res || typeof res !== "object")
            d.reject(new Error("Unexpected response received"));
        else
            d.resolve.apply(d, getResolveArgs(res));
    }

    function expandLoadResponse(value) {
        if(Array.isArray(value))
            return { data: value };

        if(typeof value === "number")
            return { totalCount: value };

        return value;
    }

    function createLoadExtra(res) {
        return {
            totalCount: "totalCount" in res ? res.totalCount : -1,
            groupCount: "groupCount" in res ? res.groupCount : -1,
            summary: res.summary || null
        };
    }

    function serializeKey(key) {
        if(typeof key === "object")
            return JSON.stringify(key);

        return key;
    }

    function serializeDate(date) {

        function zpad(text, len) {
            text = String(text);
            while(text.length < len)
                text = "0" + text;
            return text;
        }

        var builder = [1 + date.getMonth(), "/", date.getDate(), "/", date.getFullYear()],
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            f = date.getMilliseconds();

        if(h + m + s + f > 0)
            builder.push(" ", zpad(h, 2), ":", zpad(m, 2), ":", zpad(s, 2), ".", zpad(f, 3));

        return builder.join("");
    }

    function stringifyDatesInFilter(crit) {
        crit.forEach(function(v, k) {
            if(Array.isArray(v)) {
                stringifyDatesInFilter(v);
            } else if(Object.prototype.toString.call(v) === "[object Date]") {
                crit[k] = serializeDate(v);
            }
        });
    }

    function isAdvancedGrouping(expr) {
        if(!Array.isArray(expr))
            return false;

        for(var i = 0; i < expr.length; i++) {
            if("groupInterval" in expr[i] || "isExpanded" in expr[i])
                return true;
        }

        return false;
    }

    function getErrorMessageFromXhr(xhr) {
        var mime = xhr.getResponseHeader("Content-Type"),
            responseText = xhr.responseText,
            candidate;

        if(!mime)
            return null;

        if(mime.indexOf("text/plain") === 0)
            return responseText;

        if(mime.indexOf("application/json") === 0) {
            var jsonObj = safeParseJSON(responseText);

            if(typeof jsonObj === "string")
                return jsonObj;

            if(typeof jsonObj === "object") {
                for(var key in jsonObj) {
                    if(typeof jsonObj[key] === "string")
                        return jsonObj[key];
                }
            }

            return responseText;
        }

        if(mime.indexOf("application/problem+json") === 0) {
            var jsonObj = safeParseJSON(responseText);

            var candidate;
            if(typeof jsonObj === "object") {
                candidate = jsonObj.title;
                if(isNonEmptyString(candidate))
                    return candidate;

                candidate = jsonObj.detail;
                if(isNonEmptyString(candidate))
                    return candidate;
            }

            return responseText;
        }

        return null;
    }

    function safeParseJSON(json) {
        try {
            return JSON.parse(json);
        } catch(x) {
            return null;
        }
    }

    function isNonEmptyString(value) {
        return typeof value === "string" && value.length > 0;
    }

    return {
        createStore: function(options) {
            return new CustomStore(createStoreConfig(options));
        }
    };
});
