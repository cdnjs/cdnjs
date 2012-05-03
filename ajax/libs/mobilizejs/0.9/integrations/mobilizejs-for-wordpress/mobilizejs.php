<?php
/*
Plugin Name: Mobilize.js for Wordpress
Plugin URI: http://mobilizejs.com
Description: Mobile version out of your Wordpress site without pain
Version: 1.0
Author: Mikko Ohtamaa
Author URI: http://mobilizejs.com
*/


// What's our name in Wordpress plug-ins folder in WP installation
DEFINE('MOBILIZEJS_NAME', 'mobilizejs-for-wordpress');

// Which Wordpress theme we serve for jQuery Mobile transformation base
DEFINE('MOBILE_THEME_BASE', 'twentyten');

// Use for localhost development of mobilize.wordpress.js itself
DEFINE('DEBUG', false);

// Output to PHP error_log() service what's going on.
// Note that PHP logging must be enabled.
// This is useful to pindown problems with mobilize.js and your log.
DEFINE('LOGGING', false);

// Version of mobilize.js to use
$mobilizejs_version = '0.1'; // $$PHP_VERSION_LINE

// Set up WP plug-in hooks
// http://codex.wordpress.org/Plugin_API/Action_Reference
add_filter('stylesheet', 'mobilizejs_stylesheet');
add_filter('template', 'mobilizejs_template');
add_filter('show_admin_bar', 'hide_admin_bar' ); // Mobile version do not need admin bar HTML

add_action('init', 'mobilizejs_init');
add_action("send_headers", "mobilizejs_http_headers");
// Make sure mobilize.js <head> is as early as possible
add_action('wp_head', 'mobilizejs_head', 2);
add_action('wp_footer', 'mobilizejs_include_debug');
add_action('wp_footer', 'mobilizejs_banner');


// Internal debug purposes only
function xlog($msg) {
	if(LOGGING) {
		error_log($msg);		
	}
}


/**
 * Check if mobilize.js mobile cookie has been set to mobile mode.
 * 
 * @return true if the client wants to render the page in mobile optimized way 
 */
function is_mobile() {
    
	// Disable mobilize.js for admin interface
	if(is_admin()) {
		return false;
	}
	
	//xlog("Cookies");
	//xlog(print_r($_COOKIE, true));
	
	// Javascript cookie has been set and it is set to mobile mode
    if(array_key_exists('mobilize-mobile', $_COOKIE)) {
        return $_COOKIE['mobilize-mobile'] == '1';
    }
    
    return false;
}

/**
 * Allow testing loading of WP theme which is used as a base for mobile.
 * 
 * Use HTTP GET mobilize-test-wordpress query parameter to load mobile template base.
 * 
 * http://localhost?mobilize-test-wordpress=true
 * 
 * @return true if You should switch CSS and template even though it's not a mobile browser 
 */
function is_test_page_load() {
	if(array_key_exists('mobilize-test-wordpress', $_GET)) {
		return true;
	}
	
	return false;
}

/**
 * Where do we load cloud resources
 * 
 * @return unknown_type
 */
function mobilizejs_get_cloud_url() {

	global $mobilizejs_version;
	
	return "http://cdn.mobilizejs.com/releases/{$mobilizejs_version}";    
}

/**
 * Include mobilize.js in <head> and clean up unwanted Javascript
 * 
 * @return unknown_type
 */
function mobilizejs_init() {
	
	global $mobilizejs_version;
	
	xlog("Loading mobilize.js plug-in version $mobilizejs_version");
	
	if(is_mobile()) {
        xlog("Unregistering unwanted WP scripts");
    
		// Unregister all known unwanted Javascripts by default
		wp_deregister_script( 'jquery' );	
		
		// No Flash for teh phones...!
        wp_deregister_script( 'swfobject' );   
		wp_deregister_script( 'swfupload-swfobject' );          		
	}
	
	
    // Go for mobilize.js
    
    if(DEBUG) {
    	// Uses wp_head hook
    } else {
        $src = mobilizejs_get_cloud_url()."/js/mobilize.wordpress.min.js";    
        xlog("Including mobilize.js script from $src");
    	wp_enqueue_script('mobilize', $src);    	
    }
}   

/**
 * Add our rendering supressing stylesheet to prevent
 * the page flashing with web styles before Javascript supression kicks in. 
 * 
 */
function mobilizejs_head() {

    // The following mus be added to both web + mobile sites
    // Make sure our custom CSS and JS is loaded
        
    // http://codex.wordpress.org/Function_Reference/plugin_basename
    $url_base = plugins_url();
    $js_file = $url_base.'/'.MOBILIZEJS_NAME."/mobile-custom.js";
    $css_file = $url_base.'/'.MOBILIZEJS_NAME."/mobile-custom.css";
        
    ?>
        <script type="text/javascript" class="mobilize-init">
            // Called by mobilize.init()
            function mobilizeCustomInit() {
               // Include msite specific Javascript initialization layer
               mobilize.cdnOptions.javascriptBundles.push("<?= $js_file ?>");
               mobilize.cdnOptions.cssBundles.push("<?= $css_file ?>");
            }
        </script>
    <?    
	
	// The folowing is added only if mobile mode is on
	if(is_mobile()) {		
		// Supress body loading as early as possible.
		// This matches code in mobilize.js suspendRendering()
		?>		
		  <style type="text/css" class="mobilize-supressor">
		      body > * { visibility: hidden !important;} \n body > #mobilize-supress { visibility: visible !important; color: #dc3c01; text-align: center; font-family: Helvetica, Arial, sans-serif; font-weight: bold; margin: 5px auto; width: 200px; } \n .ui-mobile-rendering > body { visibility: visible !important }
		  </style>	    
		  <meta class="mobilize-supressor" name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1"></meta>
		<?	
	}
}

/**
 * Don't do admin HTML on mobile mode. 
 */
function hide_admin_bar() {
    return !is_mobile();
}

/**
 * Insert uncompress script loading from localhost:8080 test server.
 * 
 * This is mainly useful for developing mobilize.js itself on a local computer.
 * 
 * If this ain't working make sure your DEVELOPMENT SERVER IS RUNNING.
 * 
 * @return unknown_type
 */
function mobilizejs_include_debug() {
	if(DEBUG) {
		xlog("Including unbundled debug scripts for mobilize.wordpress.js");
		?>
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
		         }, {
		             cloud: false, // Disable automatic JS + CSS resolving
		             errorReportingURL: null,
		             
		             baseURL: "http://localhost:8080", // Test server
		             // Load JS files locally
		             javascriptBundles: ["js/jquery.js", 
		            		             "js/mobilize.onjq.js", 
		            		             "js/jquery.mobile.js"],
		             
		             // Load CSS files locally
		             cssBundles: ["css/jquery.mobile.css", 
		     		             "css/wordpress.css"],
		             
		         });
		         
		         // Since we are not in auto-run mode,
		         // we start doing the stuff after we have set-up
		         // our options for development correctly
		         mobilize.bootstrap();
		         
		     }
		
		     setupMobilizeForWordpressDevelopment();
              
        </script>  
		<?		
	}
}
 
/**
 * Use always Wordpress default template when mobilizing (known to work)
 * 
 * @param $template
 * @return unknown_type
 */
function mobilizejs_template($template) {

	if(is_mobile() || is_test_page_load()) {
        xlog("Serving mobile template");
		return MOBILE_THEME_BASE;
	}
	
	xlog("Serving default template");
		
	return $template;
}

/**
 * Use always Wordpress default template when mobilizing (known to work)
 * 
 * @param $template
 * @return unknown_type
 */
function mobilizejs_stylesheet($css) {
    
    if(is_mobile() || is_test_page_load()) {
        return MOBILE_THEME_BASE;
    }    
    return $css;
}

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

/**
 * Show mobilizejs loading banner when Javascript is being loaded.
 * 
 * This matches code in mobilize.js supressRendering()
 * 
 */
function mobilizejs_banner() {
		
	if(is_mobile()) {
		?>
		<div id="mobilize-supress">
		      <p>Please wait while loading mobile optimized versino</p>
		      <img src="<?= mobilizejs_get_cloud_url() ?>/css/images/ajax-loader.gif" />		      
		      <img src="<?= mobilizejs_get_cloud_url() ?>/css/images/logo_with_text_128.gif" />
		</div>				
		<?
	}
	
	// Include backlink which is not visible in web mode, but put to jQuery Mobile footer by Javascript
	?>
	<a id="mobilizejs-backlink" style="display: none" href="http://mobilizejs.com">Mobile version by Mobilize.js</a>
	<?
}

?>