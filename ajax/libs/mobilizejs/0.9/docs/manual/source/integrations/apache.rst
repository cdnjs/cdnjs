=============================
 Apache
=============================

.. contents :: :local:

Introduction
=============

Apache web server is the old and faitful workhorse of the internets.
Even though Apache itself is not producing any HTML, you might
still need to consider :doc:`mobilize-mobile cookie </serverside>`.

Integration
=============

Simple integration
-------------------

.. note ::

    This concerns only if server-side optimization are being used
    (different HTML for web and mobile browsers).    

Since HTML output may vary depending on the user agent,
your might want to  disable Apache HTML page caching by add the following directive::

     ExpiresByType text/html A0
              
Apache cannot do this, but you must set ``Vary: User-Agent`` on the server-side for 
all HTML page responses which may have different output for web and mobile devices.
Below is an example from Wordpress plug-in::

 	/**
	 * Make sure that public pages vary caching by user agent.
	 * 
	 * Because otherwise cache may deliver web output for mobile,
	 * or mobile output for web, because cached HTML is not mobile aware.
	 * 
	 * http://codex.wordpress.org/Plugin_API/Action_Reference
	 * 
	 * http://codex.wordpress.org/Function_Reference
	 * 
	 * @return unknown_type
	 */
	function mobilizejs_http_headers($wp_object) {
		
	    // We are concerned only about the public HTML interface
	    if(is_admin() || is_feed()) {
	        return false;
	    }
	    
	    // Instruct caches to have different version for different user agents
	    header('Vary: User-Agent');
	}
	 	
                 
This should ensure that mobile optimized page is not served
to a web browser and vice versa.

Advanced integration
-----------------------

Below is some example how to use mobilize-mobile cookie and
query parameters in Apache configuration file::

    # Get mobilize-mobile cookie value to environment
    # so that we can use env variable in Apache control flow
    # http://stackoverflow.com/questions/3876477/how-to-append-cookie-value-to-end-of-response-location-header-with-apache
    # Note that we need special handling of hyphen which cannot be escaped in regex
    SetEnvIf Cookie "mobilize(-)mobile=([^;]+)" mobilize=$2
    
    # By default, enable XSLT based theming on the site
    # The following condition is always true
    SetEnvIfNoCase SERVER_NAME "(.*)" xslt-theming=1

    # Disable XSLT web theming if we are rendering with mobilize.js
    SetEnvIf mobilize "1" xslt-theming=0

    # http://httpd.apache.org/docs/2.0/mod/mod_headers.html
    # Output debug headers, so you can see how Apache has seen the
    # cookies and the situation when the response was served
    Header set X-XSLT-theming %{xslt-theming}e
    Header set X-Mobilize %{mobilize}e
    
    # Since SetEnvIf does not support query string matching
    # for matching this test parameter we need to resort
    # to evil rewrite magic
    # http://objectmix.com/apache/669056-setenvif%5Bnocase%5D-url-get-attributes.html
    RewriteEngine On
    RewriteCond %{QUERY_STRING} mobilize-test-wordpress
    RewriteRule .* - [E=xslt-theming:0]
    
    # Do not touch RSS feeds.
    # XXX: What is this magical THE_REQUEST variable?? REQUEST_URI and QUERY_STRING didn't work
    RewriteCond %{THE_REQUEST} (feed)
    RewriteRule .* - [E=xslt-theming:0]
    


Then you can use these variables, for example, in
choosing if the transform filter should be applied::

    # This chain is used for public web pages
    FilterDeclare THEME
    FilterProvider THEME XSLT env=xslt-theming =1
    
    TransformOptions +ApacheFS +HTML +HideParseErrors
    # This is the location of compiled XSL theme transform
    TransformSet /theme.xsl
    
    # This will make Apache not to reload transformation every time
    # it is performed. Instead, a compiled version is hold in the
    # virtual URL declared above.
    TransformCache /theme.xsl /srv/plone/cows-rock/theme.xsl
    
    # We want to apply theme only for
    # 1. public pages (otherwise Wordpress administrative interface stops working)
    <Location "/">
        FilterChain THEME
    </Location>

    # 2. Admin interface and feeds should not receive any kind of theming
    <LocationMatch "(wp-login|wp-admin|wp-includes|xmlrpc|info)">
        # The following resets the filter chain
        # http://httpd.apache.org/docs/2.2/mod/mod_filter.html#filterchain
        FilterChain !
    </LocationMatch>

Testing
==============

Use wget to test headers and content served by Apache::

    wget -S http://blog.mfabrik.com
    
    wget -S --header "Cookie: mobilize-mobile=1" http://blog.mfabrik.com

    wget -S --header "Cookie: mobilize-mobile=0" http://blog.mfabrik.com


Caching
=============

If you are using server-side optimizations in HTML, make sure that HTML pages
are not cached::

        ExpiresActive On
        ExpiresByType text/html A0
    