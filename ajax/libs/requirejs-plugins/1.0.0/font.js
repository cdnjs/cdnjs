/** @license
 * RequireJS plugin for loading web fonts using the WebFont Loader
 * Author: Miller Medeiros
 * Version: 0.2.0 (2011/12/06)
 * Released under the MIT license
 */
define(['propertyParser'], function (propertyParser) {

    var rParts = /^([^,]+),([^\|]+)\|?/;

    function parseName(name) {
        var data = {},
            vendors = name.split('|'),
            n = vendors.length,
            match;

        while (n--) {
            match = rParts.exec(vendors[n]);
            data[ match[1] ] = propertyParser.parseProperties(match[2]);
        }
        return data;
    }

    // API
    return {

        //example: font!google,families:[Tangerine,Cantarell,Yanone Kaffeesatz:700]
        load : function(name, req, onLoad, config){
            if (config.isBuild) {
                onLoad(null); //avoid errors on the optimizer
            } else {
                var data = parseName(name);
                data.active = onLoad;
                data.inactive = function(){
                    onLoad(false);
                };
                req([(document.location.protocol === 'https:'? 'https' : 'http') +'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'], function(){
                    WebFont.load(data);
                });
            }
        }

    };

});
