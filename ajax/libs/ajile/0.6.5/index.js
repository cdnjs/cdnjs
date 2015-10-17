/*-----------------------------------------------------------------------------+
| Product:  index.js - ajile's default auto-loader for shared dependencies.
|+-----------------------------------------------------------------------------+
| Author:   Michael Lee [ http://ajile.net/ ]
|
| Created:  Friday,    November   2, 2006    [2006.06.02.19.44.40-04.00]
| Modified: Sunday,    March      1, 2015    [2015.03.01-08.00]
|+-----------------------------------------------------------------------------+
|
| README:
|
| If you need a way to import/load a common set of scripts for every page on
| your site or in your web application, this is the file you should use.
|
| This index.js file can be used to define scripting dependencies for a page,
| site, or application in a single place for use in many places.
|
| As of ajile 0.6.5, ajile automatically loads the index.js file found in its
| directory. To disable this behavior, use the "mvcshareoff" load-time option
| in the src parameter of the script tag used to load ajile. For details on how
| to do this see: http://ajile.net/learn/api/Options.htm#mvcshareoff
|
| Placing your top-level Namespace, Import, and Load directives in this file
| allows ajile to automatically load, import, and initialize all required
| modules at startup for every page that uses ajile.
|
| By using this file as described, all scripting logic can be controlled from
| a single point separate from the page, site or application's display logic.
|
| When used within web pages (e.g. HTML, XHTML, HTA, JSP, ASP, PHP, CGI, etc.)
| only 1 SCRIPT tag is required. That SCRIPT tag must identify the location of
| the ajile module's script file. For example:
|
| <script type="text/javascript" src="__ajile's_path__"></script>
|
| Visit http://ajile.net/ to start creating "Smart scripts that play nice!"
|+----------------------------------------------------------------------------*/

// You may copy this file into your own projects and use it to define your
// shared dependencies. This file must reside in the same location as ajile's
// script file. The logic below demonstrates how this file can be used to define
// an auto-loader. You'll most-likely use index.js to auto-load common or shared
// functionality.

/*//  The following are examples of how to use some of ajile's APIs:

    Ajile.EnableCloak    (false);      // Disable  'cloak'     setting; see http://ajile.net/learn/api/Options.htm#cloak
    Ajile.EnableDebug    ();           // Enable   'debug'     setting; see http://ajile.net/learn/api/Options.htm#debug
    Ajile.EnableOverride (false);      // Enable   'override'  setting; see http://ajile.net/learn/api/Options.htm#override

    Namespace ("your.namespace");                     // Define your namespace.

    Import ("some.namespace.*.0.6", "some/path/");    // Import a versioned namespace from a specific path

    Import ("some.other.Module.*");                   // Import a module's public members.

    your.namespace.NewModule = new function()         // Define a new module.
    {
      // Your implementation here...
    };

//*/
;
(function /*Notify users of ajile's default configuration*/ (global, undefined) {
    var console = global.console;

    if (!(console && console.log)) return;

    console.log ('ajile: config: <script src=".../com.iskitz.ajile.js?mvc,mvcshare"><\/script>\n\n');
    console.log ("ajile: config: mvc        : Enables  automatically loading this page's script");
    console.log ("ajile: config: mvcoff     : Disables automatically loading this page's script");
    console.log ("ajile: config: mvcshare   : Enables  automatically loading <ajile's-path>/index.js");
    console.log ("ajile: config: mvcshareoff: Disables automatically loading <ajile's-path>/index.js\n\n");
    console.log ('ajile: config: Learn more about options at http://ajile.net/learn/api/Options.htm\n\n');

    Ajile.EnableDebug();
    Namespace ('com.iskitz.ajile');
    Ajile.EnableDebug (false);
}(this))
;