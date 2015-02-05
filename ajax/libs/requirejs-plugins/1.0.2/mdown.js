/** @license
 * RequireJS plugin for loading Markdown files and converting them into HTML.
 * Author: Miller Medeiros
 * Version: 0.1.1 (2012/02/17)
 * Released under the MIT license
 */

// NOTE :: if you don't need to load markdown files in production outside of
// the build, precompile them into modules and set
// `pragmasOnSave.excludeMdown=true`

define(
    [
//>>excludeStart('excludeMdown', pragmas.excludeMdown)
        'text',
        'markdownConverter'
//>>excludeEnd('excludeMdown')
    ],
    function (
//>>excludeStart('excludeMdown', pragmas.excludeMdown)
        text, markdownConverter
//>>excludeEnd('excludeMdown')
    ) {

//>>excludeStart('excludeMdown', pragmas.excludeMdown)
        var buildMap = {};
//>>excludeEnd('excludeMdown')

        //API
        return {

            load : function(name, req, onLoad, config) {
//>>excludeStart('excludeMdown', pragmas.excludeMdown)
                text.get(req.toUrl(name), function(data){
                    data = markdownConverter.makeHtml(data);
                    if (config.isBuild) {
                        buildMap[name] = data;
                        onLoad(data);
                    } else {
                        onLoad(data);
                    }
                });
            },

            //write method based on RequireJS official text plugin by James Burke
            //https://github.com/jrburke/requirejs/blob/master/text.js
            write : function(pluginName, moduleName, write){
                if(moduleName in buildMap){
                    var content = text.jsEscape(buildMap[moduleName]);
                    write.asModule(pluginName + "!" + moduleName,
                                   "define(function () { return '" +
                                       content +
                                   "';});\n");
                }
//>>excludeEnd('excludeMdown')
            }

        };
});
