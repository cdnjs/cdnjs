/*!--------------------------------------------------------------------
JAVASCRIPT "Outdated Browser"
Version:    1.0.1 - 2014
author:     Burocratik
website:    http://www.burocratik.com
* @preserve
-----------------------------------------------------------------------*/
var outdatedBrowser = function(options) {

    //Variable definition
    var outdated = document.getElementById("outdated");
    var btnClose = document.getElementById("btnCloseUpdateBrowser");
    var btnUpdate = document.getElementById("btnUpdateBrowser");

    // Default settings
    this.defaultOpts = {
        bgColor: '#F25648',
        color: '#ffffff',
        lowerThan: 'transform'
    }

    if (options) {
        this.defaultOpts.bgColor = options.bgColor,
        this.defaultOpts.color = options.color;

        //assign css3 property to IE browser version
        if(options.lowerThan == 'IE8' || options.lowerThan == 'borderSpacing') {
            options.lowerThan = 'borderSpacing';
        } else if (options.lowerThan == 'IE9' || options.lowerThan == 'boxShadow') {
            options.lowerThan = 'boxShadow';
        } else if (options.lowerThan == 'IE10' || options.lowerThan == 'transform' || options.lowerThan == '' || typeof options.lowerThan === "undefined") {
            options.lowerThan = 'transform';
        } else if (options.lowerThan == 'IE11' || options.lowerThan == 'borderImage') {
            options.lowerThan = 'borderImage';
        }

        this.defaultOpts.lowerThan = options.lowerThan;

        bkgColor = this.defaultOpts.bgColor;
        txtColor = this.defaultOpts.color;
        cssProp = this.defaultOpts.lowerThan;
    } else {
        bkgColor = this.defaultOpts.bgColor;
        txtColor = this.defaultOpts.color;
        cssProp = this.defaultOpts.lowerThan;
    }

    //Define opacity and fadeIn/fadeOut functions
    var done = true;

    function function_opacity(opacity_value) {
        outdated.style.opacity = opacity_value / 100;
        outdated.style.filter = 'alpha(opacity=' + opacity_value + ')';
    }

    function function_fade_out(opacity_value) {
        function_opacity(opacity_value);
        if (opacity_value == 1) {
            outdated.style.display = 'none';
            done = true;
        }
    }

    function function_fade_in(opacity_value) {
        function_opacity(opacity_value);
        if (opacity_value == 1) {
            outdated.style.display = 'block';
        }
        if (opacity_value == 100) {
            done = true;
        }
    }

    //check if element has a particular class
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    var supports = (function() {
       var div = document.createElement('div'),
          vendors = 'Khtml Ms O Moz Webkit'.split(' '),
          len = vendors.length;

       return function(prop) {
          if ( prop in div.style ) return true;

          prop = prop.replace(/^[a-z]/, function(val) {
             return val.toUpperCase();
          });

          while(len--) {
             if ( vendors[len] + prop in div.style ) {
                return true;
             }
          }
          return false;
       };
    })();

    //check for css3 property support (transform=default)
    if ( !supports(''+ cssProp +'') ) {
        if (done && outdated.style.opacity !== '1') {
            done = false;
            for (var i = 1; i <= 100; i++) {
                setTimeout((function (x) {
                    return function () {
                        function_fade_in(x)
                    };
                })(i), i * 10);
            }
        }
        //close button
        btnClose.onmousedown = function() {
            outdated.style.display = 'none';
            return false;
        };
    }


    //check settings attributes
    outdated.style.backgroundColor = bkgColor;
    outdated.style.color = txtColor;

    //check settings attributes
    btnUpdate.style.color = txtColor;
    btnUpdate.style.borderColor = txtColor;
    btnClose.style.color = txtColor;

    //Override the update button color to match the background color
    btnUpdate.onmouseover = function() {
        this.style.color = bkgColor;
        this.style.backgroundColor = txtColor;
    };
    btnUpdate.onmouseout = function() {
        this.style.color = txtColor;
        this.style.backgroundColor = bkgColor;
    };
}//end of function