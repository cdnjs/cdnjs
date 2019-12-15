/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!function(){"use strict";var e=self.GlobalEnvironment,s=e&&e.baseUrl?e.baseUrl:"../../../";importScripts(s+"vs/loader.js"),require.config({baseUrl:s,catchError:!0});var n=function(e){require([e],function(e){var s=e.create(function(e){self.postMessage(e)},null);for(self.onmessage=function(e){return s.onmessage(e.data)};o.length>0;)self.onmessage(o.shift())})},r=!0,o=[];self.onmessage=function(e){return r?(r=!1,void n(e.data)):void o.push(e)}}();
//# sourceMappingURL=../../../../min-maps/vs/base/worker/workerMain.js.map