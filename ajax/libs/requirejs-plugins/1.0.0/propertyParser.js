/**
 * Basic parser for URL properties
 * @author Miller Medeiros
 * @version 0.1.0 (2011/12/06)
 * MIT license
 */
define(function(){

    var rProps = /([\w-]+)\s*:\s*(?:(\[[^\]]+\])|([^,]+)),?/g, //match "foo:bar" and "lorem:[ipsum,dolor]" capturing name as $1 and val as $2 or $3
        rArr = /^\[([^\]]+)\]$/; //match "[foo,bar]" capturing "foo,bar"

    function parseProperties(str){
        var match, obj = {};
        while (match = rProps.exec(str)) {
            obj[ match[1] ] = typecastVal(match[2] || match[3]);
        }
        return obj;
    }

    function typecastVal(val){
        if (rArr.test(val)){
            val = val.replace(rArr, '$1').split(',');
        } else if (val === 'null'){
            val = null;
        } else if (val === 'false'){
            val = false;
        } else if (val === 'true'){
            val = true;
        } else if (val === '' || val === "''" || val === '""'){
            val = '';
        } else if (! isNaN(val)) {
            //isNaN('') == false
            val = +val;
        }
        return val;
    }

    //API
    return {
        parseProperties : parseProperties,
        typecastVal : typecastVal
    };
});
