========================================
 Hosting mobilize.js files 
========================================

.. contents :: :local:

Introduction
--------------

The official location of mobilize.js files is::

    http://cdn.mobilizejs.com

This is a cloud enabled service and you should use
files on this server.
This server also collects mobile browser statistics
and has automatic error handling support for problematic mobile devices. 
    
.. note ::

    It is discouraged to try to host mobilize.js on your own server, unless
    you are planning to spend your Friday evening with HTTP Expires header.

URL resolving
--------------

mobilize.js, when running as ``mobilize.cdnOptions.cloud == true``
will automatically detect location of

* JS files

* CSS files

* Image files

based on the ``<script>`` tag which has ``<script class="mobilize-js-source>``. 

Bundles
---------------

mobilize.js is delivered in three bundles

* mobilize.$bundleName.js e.g. mobilize.wordpress.js - this JS code is run always, on every browser

* mobilize.$bundleName.mobile.js - this bundle contains jQuery, jQuery Mobile and additional mobilize 
  code. This bundle is loaded only if a mobile browser is detected.
  
* mobilize.$bundleName.mobile.css - this bundle contains jQuery Mobile and additional mobilize 
  CSS code. This bundle is loaded only if a mobile browser is detected.
  
All bundles have .min and .debug version

E.g::

	js/mobilize.wordpress.debug.js
	css/mobilize.wordpress.mobile.min.js
	
Setting file locations
==================================

There are three kind of relativity rules with mobilize.js internal loading

* Absolute http:// referring, starts with http protocol

* Relative to the bundle location (<script> tag source>). This is the default.

* Relative to the current page using slashdot (./) at the beginning of the URI.


More info

* `mobilize.cdnOptions <http://cdn.mobilizejs.com/docs/apidocs/symbols/mobilize.options.html>`_	
	
URI layout
----------

The following URI layout is used to host mobilize.js files.

The default URL base is:

        http://cdn.mobilizejs.com/releases/$version_tag

mobilize.wordpress for mobilize.js 0.1 would be::

        http://cdn.mobilizejs.com/releases/0.1/js/mobilize.wordpress.bundle.debug.js
        
This would load files::

        http://cdn.mobilizejs.com/releases/0.1/js/mobilize.wordpress.mobile.debug.js
        http://cdn.mobilizejs.com/releases/0.1/css/mobilize.wordpress.mobile.debug.css
        http://cdn.mobilizejs.com/releases/0.1/templates/wordpress.min.html
        
Alternatively::

        http://cdn.mobilizejs.com/releases/0.1/js/mobilize.wordpress.min.js

Would load files::        

        http://cdn.mobilizejs.com/releases/0.1/js/mobilize.wordpress.mobile.min.js
        http://cdn.mobilizejs.com/releases/0.1/css/mobilize.wordpress.mobile.min.css
        http://cdn.mobilizejs.com/releases/0.1/templates/wordpress.min.html

Manual Javascript loading for development)
---------------------------------------------

If you are developing mobilize.js itself and you want to use the trunk
version of the Javascript files you can bootstrap the framework locally. See *tests* folder
for more examples.

In this case, you manually link Javascript files and CSS files
as and mobilize.js will load each file individually.
This way line number debug info stays intact and
files are reread when you simply hit refresh in your web browser.

The order of <scripts> tags and more detailed arguments are shown in the example below.

.. code-block:: html

    <body>

        <script type="text/javascript">
         // Don't start executing mobilize whilst loaading JS file, but wait
         // for our manual (development commands)
         window.mobilizeAutoload = false;
        </script>
  
        <script class="mobilize-js-source" 
                type="text/javascript" 
                src="http://localhost:8080/js/mobilize.js"
                >
        </script>

        <script type="text/javascript" 
                src="http://localhost:8080/js/mobilize.wordpress.js"
                >
        </script>

        <script type="text/javascript">        

             // Setup mobilize.js to load files from local development server
             function setupMobilizeForWordpressDevelopment(){
        
                 mobilize.init({
                     // Make the page load as mobile always
                     forceMobilize: undefined // true: always mobile  
                 }, {
                     // Don't do cloud error reporting
                     // (it would useful for production deployment only)
                     errorReportingURL: false,
                     
                     // Load JS files locally
                     javascriptBundles: ["js/jquery.js", 
                                         "js/mobilize.onjq.js", 
                                         "js/jquery.mobile.js"],
                     
                     // Load CSS files locally
                     cssBundles: ["css/jquery.mobile.css", 
                                 "css/wordpress.css"],
                     
                     template: "../templates/wordpress.html"
                 });
                 
                 // Since we are not in auto-run mode,
                 // we start doing the stuff after we have set-up
                 // our options for development correctly
                 mobilize.bootstrap();
                 
             }
        
             setupMobilizeForWordpressDevelopment();
              
        </script>
        
        ...
        
Hosting mobilize.js
--------------------

It is easiest if you follow the following directory layout as described above.

mobilize.js should be able to load itself arbitary directory.
It is not recommended tomix mobilize.js files with other JS or static media files in
the same folder.

Allow-origin
=============

You might need to fiddle with ``mobilize.cdnOptions`` to make mobilize run on your custom hosting.

* You must set allow origin HTTP header on your server

This is due to browser security limitations.

More info

* https://developer.mozilla.org/En/HTTP_access_control

Locally cached files
------------------------

If mobilize.cdnOptions.cacheVersion is set to true, the loader tries to load cached versions
from local storage. If local storage is empty or the cache version mismatchs, the loader
proceed as decribed above.
