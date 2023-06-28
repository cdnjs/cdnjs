    // o--------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:               |
    // |                                                                                |
    // |                         https://www.rgraph.net                                 |
    // |                                                                                |
    // | RGraph is licensed under the Open Source MIT license. That means that it's     |
    // | totally free to use and there are no restrictions on what you can do with it!  |
    // o--------------------------------------------------------------------------------o

    //
    // Initialise the various objects
    //
    window.RGraph               = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};
    window.RGraph.SVG           = window.RGraph.SVG || {};
    window.RGraph.SVG.HTMLTable = {};

// Module pattern
(function (win, doc, undefined)
{
    //
    // This function has been taken out of the RGraph.common.core.js file to
    // enable the table reader to work standalone.
    //
    RGraph.SVG.HTMLTable.AJAX = function ()
    {
        var args = RGraph.SVG.HTMLTable.getArgs(arguments, 'url,callback');

        // Mozilla, Safari, ...
        if (win.XMLHttpRequest) {
            var httpRequest = new XMLHttpRequest();

        // MSIE
        } else if (win.ActiveXObject) {
            var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200) {
                this.__user_callback__ = callback;

                this.__user_callback__(this.responseText);
            }
        }

        httpRequest.open('GET', args.url, true);
        httpRequest.send();
    };








    //
    // Use the AJAX function above to fetch a string
    //
    RGraph.SVG.HTMLTable.AJAX.getString = function ()
    {
        var args = RGraph.SVG.HTMLTable.getArgs(arguments, 'url,callback');

        RGraph.SVG.HTMLTable.AJAX(args.url, function ()
        {
            var str = String(this.responseText);

            args.callback(str);
        });
    };








    //
    // The HTMLTable object
    //
    RGraph.HTMLTable =
    RGraph.SVG.HTMLTable = function ()
    {
        //
        // The fetch function that starts everythjing going
        //
        this.fetch = function ()
        {
            //
            // Parse the HTML table for the data
            //
            this.parseTable();
    
            //
            // Call the callback
            //
            this.callback(this);
        };








        //
        // Parse the HTML table to get the data from it. If the <ID that we've been given is a
        // string then first convert it to an HTML element using the HTML5 <template> tag
        //
        this.parseTable = function ()
        {
            // Allow for string: <table>...</table>
            if (this.id.substr(0, 7) === 'string:') {
                
                this.id = this.id.substr(7);
                
                var template       = doc.createElement('template');
                html               = this.id.trim(); // Never return a text node of whitespace as the result
                template.innerHTML = html;

                var table = template.content.firstChild;
            } else {
                var table = doc.getElementById(this.id.replace(/^#/,''));
            }

            var rows  = table.getElementsByTagName('tr');

            // Loop thru the rows
            for (var i=0; i<rows.length; ++i) {
                
                var row = rows[i].getElementsByTagName('td');
                
                // Get the headers if there's no td cell
                if (!row.length) {
                    var row = rows[i].getElementsByTagName('th');
                }
                
                // Create a row in the data array
                this.data[i] = [];
                
                // Loop thru the cells in the row
                for (var j=0; j<row.length; ++j) {
                    var cell = row[j];
                    var data = cell.innerHTML;
                    
                    // Convert the cell data to a number if it'as numeric
                    if (data.match(/^[ 0-9]+$/)) {
                        data = parseInt(data.trim());
                    } else if (data.match(/^[ 0-9.]+$/)) {
                        data = parseFloat(data.trim());
                    }
                    
                    this.data[i][j] = data;
                    
                    //
                    // Store the number of rows as an object property
                    //
                    this.numrows = this.data.length;
                    
                    //
                    // Store the number of cells as an object property
                    //(based on the first row)
                    //
                    this.numcols = this.data[0].length;
                }
            }
        };








        //
        // This function allows you to fetch a row
        // of the HTML table data.
        //
        this.row    = 
        this.getRow = function (index)
        {
            var row    = [],
                start  = parseInt(arguments[1]) || 0,
                length = arguments[2];

            // Convert a string based row name to a
            // numeric index
            if (typeof index === 'string') {
                for (var i=0; i<this.data.length; ++i) {
                    if (this.data[i][0].trim() === index.trim()) {
                        var found = true;
                        index = i;
                        break;
                    }
                }
                
                if (!found) {
                    return null;
                }
            }

            if (start < 0) {
                row = this.data[index].slice(this.data[index].length  - Math.abs(start));
            } else {
                row = this.data[index].slice(start);
            }

            // Zero length
            if (typeof length === 'number' && length === 0) {
                row = [];

            }  else {
                // Positive length
                if (typeof length === 'number' && length > 0) {
                    row = row.slice(0, length)
                
                // Negative length
                } else if (typeof length === 'number' && length < 0) {
                    for (var i=0; i<Math.abs(length); ++i) {
                        row.pop();
                    }
                }
            }
            
            

            return row;
        };








        //
        // This fuunction allows you to fetch a column
        // of the HTML table data.
        //
        this.col       =
        this.column    =
        this.getColumn =
        this.getCol    = function (index)
        {
            var col    = [],
                start  = arguments[1] || 0,
                length = arguments[2];



            // Convert a string based column name to a
            // numeric index
            if (typeof index === 'string') {
                for (var i=0; i<this.data.length; ++i) {
                    if (this.data[0][i].trim() === index.trim()) {
                        var found = true;
                        index = i;
                        break;
                    }
                }
                
                if (!found) {
                    return null;
                }
            }


            if (start >= 0) {
                for (var i=start; i<this.data.length; i+=1) {
                    if (this.data[i]) {
                        col.push(this.data[i][index]);
                    } else {
                        col.push(null);
                    }
                }
            } else {
                for (var i=(this.data.length - Math.abs(start)); i<this.data.length; i+=1) {
                    if (this.data[i]) {
                        col.push(this.data[i][index]);
                    } else {
                        col.push(null);
                    }
                }
            }

            // Zero length
            if (typeof length === 'number' && length === 0) {
                col = [];

            }  else {
                // Positive length
                if (typeof length === 'number' && length > 0) {
                    col = col.slice(0, length)
                
                // Negative length
                } else if (typeof length === 'number' && length < 0) {
                    for (var i=0; i<Math.abs(length); ++i) {
                        col.pop();
                    }
                }
            }

            return col;
        };









        var args = RGraph.SVG.HTMLTable.getArgs(arguments, 'id,callback');

        //
        // Some default values
        //
        this.id       = args.id.replace(/^#/,'');
        this.callback = args.callback;
        this.data     = [];

        this.fetch();
    };








    //
    // This function allows both object based arguments to functions
    // and also regular arguments as well.
    //
    // You can call it from inside a function like this:
    //
    // args = RGraph.SVG.HTMLTable.getArgs(arguments, 'object,id,foo,bar');
    //
    // So you're passing it the arguments object and a comma seperated list of names
    // for the arguments.
    //
    // @param array args   The arguments object that you get when inside a function
    // @param string names A comma seperated list of desired names for the arguments
    //                     eg: 'object,color,size'
    //
    RGraph.SVG.HTMLTable.getArgs = function (args, names)
    {
        var ret   = {};
        var count = 0;
        names     = names.trim().split(/ *, */);

        if (   args
            && args[0]
            && args.length === 1
            && typeof args[0][names[0]] !== 'undefined') {
            
            for (var i=0; i<names.length; ++i) {
                if (typeof args[0][names[i]] === 'undefined') {
                    args[0][names[i]] = null;
                }
            }

            return args[0];
        } else {
            for (var i in names) {
                ret[names[i]] = typeof args[count] === 'undefined' ? null : args[count];
                
                count += 1;
            }
        }

        return ret;
    };








// End module pattern
})(window, document);