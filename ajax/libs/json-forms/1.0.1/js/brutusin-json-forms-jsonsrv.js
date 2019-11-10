/*
 * Copyright 2015 brutusin.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @author Ignacio del Valle Alles idelvall@brutusin.org
 */
if ("undefined" == typeof BrutusinForms) {
    throw new Error("brutusin-json-forms-jsonsrv.js requires brutusin-json-forms.js");
}

BrutusinForms.createJsonsrvResolver = function (jsonsrvUrl, serviceId) {
    return function (names, data) {
        var payload = new Object();
        payload.serviceId = serviceId;
        payload.fieldNames = names;
        payload.input = new Object();
        payload.input = data;
        var schema;
        jQuery.ajax({
            url: jsonsrvUrl + '?id=jsonsrv.schema-provider' + '&input=' + encodeURI(JSON.stringify(payload)),
            success: function (result) {
                schema = new Object();
                for (var prop in result.value) {
                    schema[prop] = result.value[prop];
                }
            },
            async: false
        });
        return schema;
    };
}