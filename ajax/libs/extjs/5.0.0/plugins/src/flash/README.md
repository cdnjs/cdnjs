# Flash Polyfill #

The directory holds an Adobe Flash Builder 4.7 project that integrates with the extjs platform to provide support for http-posting binary data from browsers without native support for the capabilities, e.g. IE < 10.

The project assumes standard installation directories on a Mac and might not correctly reference libraries in other installation.

## Building ##

* Open in Adobe Flash Builder 4.7.
* Make sure the linked framework.swc file is correctly referenced from the project properties pane.
* Export a release build.
* Copy the resulting bin-release/FlashPlugin.swf file to SDK/platform/src/plugins/flash/

## Troubleshooting ##

The plugin is loaded by Ext.data.flash.BinaryXhr in case the Ext.data.Connection class is used to make a binary post (see binaryData parameter in the Connection class docs).

### Check the user's browser ###
The plugin is only loaded on older browsers (e.g. IE < 10, Opera, Safari < 5, etc.). The code snippet below is an example of how to trigger this on such a browser. Once executed, a flash object should be loaded - use the browser's dom inspector to check that it's at the bottom of the document.

    var data = [0,1,2,3,0xff];
    var req = Ext.Ajax.request({
        url:'/samples/messagebroker/amf',
        binaryData:data,
        binary:true, // for returned data
        headers: {
            'Content-Type': 'application/x-amf'
        },
        success: function(response, opts) {
            alert("Success!: " + response.responseBytes.length);
        },
        failure: function(response, opts) {
            alert('failed with status code ' + response.status);
        }
    });



### Check that flash is installed ###
If there is no flash installed, a visual text indicator will show up at the bottom of the screen saying flash v11 is not installed.

### Check the Flash plugin location ###
If the application was packaged, check that the plugins directory was
copied to the application's root directory, or that the application is
correctly notifying the framework as to the location of the flash swf
file using the Ext.flashPluginPath parameter in the application launch
method. See the documentation for Ext.data.flash.BinaryXhr for more information.

### Check that flash actually gets loaded ###
In the BinaryXhr class, change the "0", "0" size in the flash loader (line 145) to "100", "100". Once the binary connection is attempted, a blue square should show up at the bottom of the screen. If not, the flash object is likely not loaded.

### Turn on debugging in the flash plugin ###
By defining the following function at the root of the web page, you'll cause the plugin to send detailed state information to Ext.log. Make sure you're using a debug version of the SDK.
    <script type="text/javascript">
      debugPolyfill=function() {return true;};
    </script>
