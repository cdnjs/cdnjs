/*
YUI 3.17.1 (build 0eb5a52)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("uploader",function(e,t){var n=e.config.win;n&&n.File&&n.FormData&&n.XMLHttpRequest?e.Uploader=e.UploaderHTML5:e.SWFDetect.isFlashVersionAtLeast(10,0,45)?e.Uploader=e.UploaderFlash:(e.namespace("Uploader"),e.Uploader.TYPE="none")},"3.17.1",{requires:["uploader-html5","uploader-flash"]});
