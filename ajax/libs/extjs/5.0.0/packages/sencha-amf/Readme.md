# Sencha Touch AMF

Sencha Touch AMF if available in the [Sencha Touch Bundle](http://www.sencha.com/products/touch-bundle/).
[Action Message Format](http://en.wikipedia.org/wiki/Action_Message_Format) (AMF)
is a compact binary format used by Adobe Flash/Flex to serialize ActionScript
object graphs.  AMF is typically used to encode messages that are sent between
an Adobe Flash client and a remote service.  AMF is only a serialization
technology, not a transport, so AMF encoded binary data can be used with any
transport such as HTTP or HTTPS.

This package provides an implementation of the AMF and AMFX protocols
for use with Sencha Touch. See the documentation for
`Ext.direct.AmfRemotingProvider` for more information.

You can use the AmfRemotingProvider to make RMI calls to a server, or
as a way to provide API for a Direct Store to connect a data source to
a ListView or DataView.

To use the package, include the appropriate sencha-amf*.js file in
your index.html file.

## Using this package in your application

To use the AMF package in an app that was generated with Sencha
Cmd:

1. Edit your &lt;appdir&gt;/app.json file and add the package to the list of
requirements for your app, for example:
<pre>
/**
 * List of package names to require for the Sencha Cmd build process
 */
"requires": [
   sencha-amf
],
</pre>      
  This instructs Sencha Cmd to add the app when building your application.
2. Add the package to your code path for development by adding the
following to the top of your application's app.js file:
<pre>
//<debug>
Ext.Loader.setPath({
  'Ext.direct.AmfRemotingProvider': 'packages/sencha-amf/src-touch/direct/AmfRemotingProvider.js',
  'Ext.data.amf': 'packages/sencha-amf/src-touch/data/amf'
});
//</debug>
</pre>
3. Run the following command in the application's root directory
to have Sencha Cmd install the package:
<pre>
sencha app refresh -packages
</pre>
You will notice that your application directory now has a 'packages'
directory with a 'sencha-amf' subdirectory where the package resides.

<b>Note</b>: If you do not have the sencha-amf package installed, run the
     following command in the directory where the pkg file resides:
<pre>
sencha package add sencha-amf.pkg
</pre>
