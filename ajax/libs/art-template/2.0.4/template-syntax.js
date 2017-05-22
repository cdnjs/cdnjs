/*!
 * artTemplate - Syntax Extensions
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */
 
(function (exports) {
    
    exports.openTag = '{{';
    exports.closeTag = '}}';


    exports.parser = function (code) {
        code = code.replace(/^\s/, '');
        
        var split = code.split(' ');
        var key = split.shift();
        var args = split.join(' ');

        switch (key) {

            case 'if':

                code = 'if(' + args + '){';
                break;

            case 'else':
                
                if (split.shift() === 'if') {
                    split = ' if(' + split.join(' ') + ')';
                } else {
                    split = '';
                }

                code = '}else' + split + '{';
                break;

            case '/if':

                code = '}';
                break;

            case 'each':
                
                var object = split[0] || '$data';
                var as     = split[1] || 'as';
                var value  = split[2] || '$value';
                var index  = split[3] || '$index';
                
                var param   = value + ',' + index;
                
                if (as !== 'as') {
                    object = '[]';
                }
                
                code =  '$each(' + object + ',function(' + param + '){';
                break;

            case '/each':

                code = '});';
                break;

            case 'echo':

                code = 'print(' + args + ');';
                break;

            case 'include':

                code = 'include(' + split.join(',') + ');';
                break;

            default:

                if (exports.helpers.hasOwnProperty(key)) {
                    
                    code = '=#' + key + '(' + split.join(',') + ');';
                    
                } else {

                    code = code.replace(/[\s;]*$/, '');
                    code = '=' + code;
                }

                break;
        }
        
        
        return code;
    };
})(this.template);
