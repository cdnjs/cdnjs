(function (window, undefined) {
    "use strict";
    // test for REM unit support
    var cssremunit =  function() {
        var div = document.createElement( 'div' );
            div.style.cssText = 'font-size: 1rem;';

        return (/rem/).test(div.style.fontSize);
    },

    // filter returned link nodes for stylesheets
    isStyleSheet = function () {
        var styles = document.getElementsByTagName('link'),
            filteredStyles = [];
            
        for ( var i = 0; i < styles.length; i++) {
            if ( styles[i].rel.toLowerCase() === 'stylesheet' && styles[i].getAttribute('data-norem') === null ) {
                filteredStyles.push( styles[i] );
            }
        }

        return filteredStyles;
    },
    
   processSheets = function () {
        var links = [];
        sheets = isStyleSheet(); // search for link tags and confirm it's a stylesheet
        sheets.og = sheets.length; // store the original length of sheets as a property
        for( var i = 0; i < sheets.length; i++ ){
            links[i] = sheets[i].href;
            xhr( links[i], matchCSS, i );
        }
    },
    
    matchCSS = function ( response, i ) { // collect all of the rules from the xhr response texts and match them to a pattern
        var clean = removeComments( removeMediaQueries(response.responseText) ),
            pattern = /[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:;,.'"*()]*\}/g, //find selectors that use rem in one or more of their rules
            current = clean.match(pattern),
            remPattern =/\d*\.?\d+rem/g,
            remCurrent = clean.match(remPattern);

        if( current !== null && current.length !== 0 ){
            found = found.concat( current ); // save all of the blocks of rules with rem in a property
            foundProps = foundProps.concat( remCurrent ); // save all of the properties with rem
        }
        if( i === sheets.og-1 ){
            buildCSS();
        }
    },

    buildCSS = function () { // first build each individual rule from elements in the found array and then add it to the string of rules.
        var pattern = /[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:,.'"*()]*[;}]/g; // find properties with rem values in them
        for( var i = 0; i < found.length; i++ ){
            rules = rules + found[i].substr(0,found[i].indexOf("{")+1); // save the selector portion of each rule with a rem value
            var current = found[i].match( pattern );
            for( var j = 0; j<current.length; j++ ){ // build a new set of with only the selector and properties that have rem in the value
                rules = rules + current[j];
                if( j === current.length-1 && rules[rules.length-1] !== "}" ){
                    rules = rules + "\n}";
                }
            }
        }

        parseCSS();
    },

    parseCSS = function () { // replace each set of parentheses with evaluated content
	var remSize;
        for( var i = 0; i < foundProps.length; i++ ){
            remSize = parseFloat(foundProps[i].substr(0,foundProps[i].length-3));
            css[i] = Math.round( remSize * fontSize ) + 'px';
        }

        loadCSS();
    },

    loadCSS = function () { // replace and load the new rules
        for( var i = 0; i < css.length; i++ ){ // only run this loop as many times as css has entries
            if( css[i] ){
                rules = rules.replace( foundProps[i],css[i] ); // replace old rules with our processed rules
            }
        }
        var remcss = document.createElement( 'style' );
        remcss.setAttribute( 'type', 'text/css' );
        remcss.id = 'remReplace';
        document.getElementsByTagName( 'head' )[0].appendChild( remcss );   // create the new element
        if( remcss.styleSheet ) {
            remcss.styleSheet.cssText = rules; // IE8 will not support innerHTML on read-only elements, such as STYLE
        } else {
            remcss.appendChild( document.createTextNode( rules ) );
        }
    },

    xhr = function ( url, callback, i ) { // create new XMLHttpRequest object and run it
        try {
            var xhr = getXMLHttpRequest();
            xhr.open( 'GET', url, true );
            xhr.send();
            var ie = (function () { //function checking IE version
            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');
                while (
                    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );
            return v > 4 ? v : undef;
            }());
            
            if ( ie >= 7 ){ //If IE is greater than 6
                // This targets modern browsers and modern versions of IE,
                // which don't need the "new" keyword.
                xhr.onreadystatechange = function () {
                    if ( xhr.readyState === 4 ){
                        callback(xhr, i);
                    } // else { callback function on AJAX error }
                };
            } else {
                // This block targets old versions of IE, which require "new".
                xhr.onreadystatechange = new function() { //IE6 and IE7 need the "new function()" syntax to work properly
                    if ( xhr.readyState === 4 ){
                        callback(xhr, i);
                    } // else { callback function on AJAX error }
                };
            }
         } catch (e){
            if ( window.XDomainRequest ) {
                var xdr = new XDomainRequest();
                xdr.open('get', url);
                xdr.onload = function() {
                    callback(xdr, i);
                };
                xdr.onerror = function() {
                    return false; // xdr load fail
                };
                xdr.send();
            }
         }
    },

    removeComments = function ( css ) {
        var start = css.search(/\/\*/),
            end = css.search(/\*\//);
        if ( (start > -1) && (end > start) ) {
            css = css.substring(0, start) + css.substring(end + 2);
            return removeComments(css);
        }
        else {
            return css;
        }
    },

	// Test for Media Query support
    mediaQuery = function() {
        if (window.matchMedia || window.msMatchMedia) { return true; }
        return false;
    },
    
    // Remove queries.
    removeMediaQueries = function(css) {
        if (!mediaQuery()) {
            // If the browser doesn't support media queries, we find all @media declarations in the CSS and remove them.
            // Note: Since @rules can't be nested in the CSS spec, we're safe to just check for the closest following "}}" to the "@media".
            css = css.replace(/@media[\s\S]*?\}\s*\}/, "");
        }

        return css;	
    },

    getXMLHttpRequest = function () { // we're gonna check if our browser will let us use AJAX
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else { // if XMLHttpRequest doesn't work
            try {
                return new ActiveXObject("MSXML2.XMLHTTP"); // then we'll instead use AJAX through ActiveX for IE6/IE7
            } catch (e1) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP"); // other microsoft
                } catch (e2) {
                    // No XHR at all...
                }
            }
        }
    };

    if( !cssremunit() ){ // this checks if the rem value is supported
        var rules = '', // initialize the rules variable in this scope so it can be used later
            sheets = [], // initialize the array holding the sheets for use later
            found = [], // initialize the array holding the found rules for use later
            foundProps = [], // initialize the array holding the found properties for use later
            css = [], // initialize the array holding the parsed rules for use later
            body = document.getElementsByTagName('body')[0],
            fontSize = '';
        if (body.currentStyle) {
            if ( body.currentStyle.fontSize.indexOf("px") >= 0 ) {
                fontSize = body.currentStyle.fontSize.replace('px', '');
            } else if ( body.currentStyle.fontSize.indexOf("em") >= 0 ) {
                fontSize = body.currentStyle.fontSize.replace('em', '');
            } else if ( body.currentStyle.fontSize.indexOf("pt") >= 0 ) {
                fontSize = body.currentStyle.fontSize.replace('pt', '');
            } else {
                fontSize = (body.currentStyle.fontSize.replace('%', '') / 100) * 16; // IE8 returns the percentage while other browsers return the computed value
            }
        } else if (window.getComputedStyle) {
            fontSize = document.defaultView.getComputedStyle(body, null).getPropertyValue('font-size').replace('px', ''); // find font-size in body element
        }
        processSheets();
    } // else { do nothing, you are awesome and have REM support }

})(window);
