// Version: 2021-03-01
//
    // o--------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:               |
    // |                                                                                |
    // |                         https://www.rgraph.net                                 |
    // |                                                                                |
    // | RGraph is licensed under the Open Source MIT license. That means that it's     |
    // | totally free to use and there are no restrictions on what you can do with it!  |
    // o--------------------------------------------------------------------------------o

    RGraph          = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG      = RGraph.SVG || {};
    RGraph.SVG.AJAX = RGraph.SVG.AJAX || {};

// Module pattern
(function (win, doc, undefined)
{
    //
    // Makes an AJAX call. It calls the given callback (a function) when ready
    // 
    // @param string   url      The URL to retrieve
    // @param function callback A function that is called when the response is ready, there's an example below
    //                          called "myCallback".
    //
    RGraph.SVG.AJAX = function (url, callback)
    {
        // Mozilla, Safari, ...
        if (window.XMLHttpRequest) {
            var httpRequest = new XMLHttpRequest();

        // MSIE
        } else if (window.ActiveXObject) {
            var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200) {
                this.__user_callback__ = callback;
                this.__user_callback__(this.responseText);
            }
        }

        httpRequest.open('GET', url, true);
        httpRequest.send();
    };










    //
    // Makes an AJAX POST request. It calls the given callback (a function) when ready
    // 
    // @param string   url      The URL to retrieve
    // @param object   data     The POST data
    // @param function callback A function that is called when the response is ready, there's an example below
    //                          called "myCallback".
    //
    RGraph.SVG.AJAX.post =
    RGraph.SVG.AJAX.POST = function (url, data, callback) // Do not remove this alias
    {
        // Used when building the POST string
        var crumbs = [];






        // Mozilla, Safari, ...
        if (window.XMLHttpRequest) {
            var httpRequest = new XMLHttpRequest();

        // MSIE
        } else if (window.ActiveXObject) {
            var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }





        httpRequest.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200) {
                this.__user_callback__ = callback;
                this.__user_callback__(this.responseText);
            }
        }

        httpRequest.open('POST', url, true);
        httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        
        for (i in data) {
            if (typeof i == 'string') {
                crumbs.push(i + '=' + encodeURIComponent(data[i]));
            }
        }

        httpRequest.send(crumbs.join('&'));
    };










    //
    // Uses the above function but calls the call back passing a number as its argument
    // 
    // @param url string The URL to fetch
    // @param callback function Your callback function (which is passed the number as an argument)
    //
    RGraph.SVG.AJAX.getNumber = function (url, callback)
    {
        RGraph.SVG.AJAX(url, function ()
        {
            var num = parseFloat(this.responseText);

            callback(num);
        });
    };










    //
    // Uses the above function but calls the call back passing a string as its argument
    // 
    // @param url string The URL to fetch
    // @param callback function Your callback function (which is passed the string as an argument)
    //
    RGraph.SVG.AJAX.getString = function (url, callback)
    {
        RGraph.SVG.AJAX(url, function ()
        {
            var str = String(this.responseText);

            callback(str);
        });
    };










    //
    // Uses the above function but calls the call back passing JSON (ie a JavaScript object ) as its argument
    // 
    // @param url string The URL to fetch
    // @param callback function Your callback function (which is passed the JSON object as an argument)
    //
    RGraph.SVG.AJAX.getJSON = function (url, callback)
    {
        RGraph.SVG.AJAX(url, function ()
        {
            var json = eval('(' + this.responseText + ')');

            callback(json);
        });
    };










    //
    // Uses the above RGraph.AJAX function but calls the call back passing an array as its argument.
    // Useful if you're retrieving CSV data
    // 
    // @param url string The URL to fetch
    // @param callback function Your callback function (which is passed the CSV/array as an argument)
    //
    RGraph.SVG.AJAX.getCSV = function (url, callback)
    {
        var seperator = (typeof arguments[2] === 'string'  ? arguments[2] : ','),
            lineSep   = (typeof arguments[3] === 'string' ? arguments[3] : "\r?\n");

        RGraph.SVG.AJAX(url, function ()
        {
            var text   = this.responseText,
                regexp = new RegExp(seperator),
                lines  = this.responseText.split(lineSep),
                rows   = [];

            for (var i=0; i<lines.length; ++i) {
                
                var row = lines[i].split(seperator);
                
                for (var j=0,len=row.length;j<len;++j) {
                    if (row[j].match(/^[0-9.]+$/)) {
                        row[j] = parseFloat(row[j]);
                    }
                }
    
                rows.push(row);
            }


            callback(rows);
        });
    };










// End module pattern
})(window, document);