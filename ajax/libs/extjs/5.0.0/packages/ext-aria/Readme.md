# ext-aria - Read Me

## Initializing the Focus manager

FocusManager is enabled automatically when a Viewport is used in an
application. If Viewport is not used, the app has to init the FocusManager
manually:

    Ext.FocusManager.enable();

## Enabling ARIA support without using ext-theme-aria

While it is recommended to use ext-theme-aria in your accessible applications
due to higher contrast and other considerations, we realize that not
every application can be used with the accessibility theme. It is possible
to create a custom theme that would incorporate some of the features of the
ext-theme-aria without changing the colors and image assets.

To do that, start with creating a new theme as described in the
[Theming guide](http://docs.sencha.com/extjs/4.2.2/#!/guide/theming):

    sencha generate theme custom-aria-theme

Configure the base theme by editing the `package.json` file, and add ext-aria
package to the list of required packages:

    {
        "name": "custom-aria-theme",
        ...
        "requires": ["ext-aria"],
        "extend": "ext-theme-neptune"
    }

After that, run `sencha app build` to produce the JavaScript and CSS files
with ARIA features.

If you are not using Sencha Cmd to build your application, you can still use
ARIA features by building a custom ARIA-enabled theme as described above,
with the additional configuration option that will cause the theme build to
include the JavaScript classes from the ext-aria in addition to the CSS.

Edit the `.sencha/package/build.properties` file for your custom theme, and
add the following lines there:

    build.operations=include\n \
        -tag=package-ext-aria\n

After this, you can run `sencha package build` in the package directory
to produce the JavaScript and CSS files to include in your application.

Note that in this case you may have to adjust some SASS variables to
provide higher contrast for focused components like buttons, etc.
