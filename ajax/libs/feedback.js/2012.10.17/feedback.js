/*
 feedback.js <http://experiments.hertzen.com/jsfeedback/>
 Copyright (c) 2012 Niklas von Hertzen. All rights reserved.
 http://www.twitter.com/niklasvh

 Released under MIT License
*/
(function( window, document, undefined ) {
if ( window.Feedback !== undefined ) { 
    return; 
}

// log proxy function
var log = function( msg ) {
    window.console.log( msg );
},
// function to remove elements, input as arrays
removeElements = function( remove ) {
    for (var i = 0, len = remove.length; i < len; i++ ) {
        var item = Array.prototype.pop.call( remove );
        if ( item !== undefined ) {
            if (item.parentNode !== null ) { // check that the item was actually added to DOM
                item.parentNode.removeChild( item );
            }
        }
    }
},
loader = function() {
    var div = document.createElement("div"), i = 3;
    div.className = "feedback-loader";
    
    while (i--) { div.appendChild( document.createElement( "span" )); }
    return div;
},
getBounds = function( el ) {
    return el.getBoundingClientRect();
},
emptyElements = function( el ) {
    var item;
    while( (( item = el.firstChild ) !== null ? el.removeChild( item ) : false) ) {}
},
element = function( name, text ) {
    var el = document.createElement( name );
    el.appendChild( document.createTextNode( text ) );
    return el;
},
// script onload function to provide support for IE as well
scriptLoader = function( script, func ){

    if (script.onload === undefined) {
        // IE lack of support for script onload

        if( script.onreadystatechange !== undefined ) {

            var intervalFunc = function() {
                if (script.readyState !== "loaded" && script.readyState !== "complete") {
                    window.setTimeout( intervalFunc, 250 );
                } else {
                    // it is loaded
                    func();
                }
            };

            window.setTimeout( intervalFunc, 250 );

        } else {
            log("ERROR: We can't track when script is loaded");
        }

    } else {
        return func;
    }

},
nextButton,
H2C_IGNORE = "data-html2canvas-ignore",
currentPage,
modalBody = document.createElement("div");

window.Feedback = function( options ) {

    options = options || {};

    // default properties
    options.label = options.label || "Send Feedback";
    options.header = options.header || "Send Feedback";
    options.url = options.url || "/";
    options.adapter = options.adapter || new window.Feedback.XHR( options.url );
    
    options.nextLabel = options.nextLabel || "Continue";
    options.reviewLabel = options.reviewLabel || "Review";
    options.sendLabel = options.sendLabel || "Send";
    options.closeLabel = options.closeLabel || "Close";
    
    options.messageSuccess = options.messageSuccess || "Your feedback was sent succesfully.";
    options.messageError = options.messageError || "There was an error sending your feedback to the server.";
    
  
    if (options.pages === undefined ) {
        options.pages = [
            new window.Feedback.Form(),
            new window.Feedback.Screenshot( options ),
            new window.Feedback.Review()
        ];
    }

    var button,
    modal,
    currentPage,
    glass = document.createElement("div"),
    returnMethods = {

        // open send feedback modal window
        open: function() {
            var len = options.pages.length;
            currentPage = 0;
            for (; currentPage < len; currentPage++) {
                // create DOM for each page in the wizard
                if ( !(options.pages[ currentPage ] instanceof window.Feedback.Review) ) {
                    options.pages[ currentPage ].render();
                }
            }

            var a = element("a", "×"),
            modalHeader = document.createElement("div"),
            // modal container
            modalFooter = document.createElement("div");

            modal = document.createElement("div");
            document.body.appendChild( glass );

            // modal close button
            a.className =  "feedback-close";
            a.onclick = returnMethods.close;
            a.href = "#";

            button.disabled = true;

            // build header element
            modalHeader.appendChild( a );
            modalHeader.appendChild( element("h3", options.header ) );
            modalHeader.className =  "feedback-header";

            modalBody.className = "feedback-body";

            emptyElements( modalBody );
            currentPage = 0;
            modalBody.appendChild( options.pages[ currentPage++ ].dom );


            // Next button
            nextButton = element( "button", options.nextLabel );

            nextButton.className =  "feedback-btn";
            nextButton.onclick = function() {
                
                if (currentPage > 0 ) {
                    if ( options.pages[ currentPage - 1 ].end( modal ) === false ) {
                        // page failed validation, cancel onclick
                        return;
                    }
                }
                
                emptyElements( modalBody );

                if ( currentPage === len ) {
                    returnMethods.send( options.adapter );
                } else {

                    options.pages[ currentPage ].start( modal, modalHeader, modalFooter, nextButton );
                    
                    if ( options.pages[ currentPage ] instanceof window.Feedback.Review ) {
                        // create DOM for review page, based on collected data
                        options.pages[ currentPage ].render( options.pages );
                    }
                    
                    // add page DOM to modal
                    modalBody.appendChild( options.pages[ currentPage++ ].dom );

                    // if last page, change button label to send
                    if ( currentPage === len ) {
                        nextButton.firstChild.nodeValue = options.sendLabel;
                    }
                    
                    // if next page is review page, change button label
                    if ( options.pages[ currentPage ] instanceof window.Feedback.Review ) {   
                        nextButton.firstChild.nodeValue = options.reviewLabel;
                    }
                        

                }

            };

            modalFooter.className = "feedback-footer";
            modalFooter.appendChild( nextButton );


            modal.className =  "feedback-modal";
            modal.setAttribute(H2C_IGNORE, true); // don't render in html2canvas


            modal.appendChild( modalHeader );
            modal.appendChild( modalBody );
            modal.appendChild( modalFooter );

            document.body.appendChild( modal );
        },


        // close modal window
        close: function() {

            button.disabled = false;

            // remove feedback elements
            removeElements( [ modal, glass ] );

            // call end event for current page
            if (currentPage > 0 ) {
                options.pages[ currentPage - 1 ].end( modal );
            }
                
            // call close events for all pages    
            for (var i = 0, len = options.pages.length; i < len; i++) {
                options.pages[ i ].close();
            }

            return false;

        },
        
        // send data
        send: function( adapter ) {
            
            // make sure send adapter is of right prototype
            if ( !(adapter instanceof window.Feedback.Send) ) {
                throw new Error( "Adapter is not an instance of Feedback.Send" );
            }
            
            // fetch data from all pages   
            for (var i = 0, len = options.pages.length, data = [], p = 0, tmp; i < len; i++) {
                if ( (tmp = options.pages[ i ].data()) !== false ) {
                    data[ p++ ] = tmp;
                }
            }

            nextButton.disabled = true;
                
            emptyElements( modalBody );
            modalBody.appendChild( loader() );

            // send data to adapter for processing
            adapter.send( data, function( success ) {
                
                emptyElements( modalBody );
                nextButton.disabled = false;
                
                nextButton.firstChild.nodeValue = options.closeLabel;
                
                nextButton.onclick = function() {
                    returnMethods.close();
                    return false;  
                };
                
                if ( success === true ) {
                    modalBody.appendChild( document.createTextNode( options.messageSuccess ) );
                } else {
                    modalBody.appendChild( document.createTextNode( options.messageError ) );
                }
                
            } );
  
        }
    };

    glass.className = "feedback-glass";
    glass.style.pointerEvents = "none";
    glass.setAttribute(H2C_IGNORE, true);

    options = options || {};

    button = element( "button", options.label );
    button.className = "feedback-btn feedback-bottom-right";

    button.setAttribute(H2C_IGNORE, true);

    button.onclick = returnMethods.open;
    
    if ( options.appendTo !== null ) {
        ((options.appendTo !== undefined) ? options.appendTo : document.body).appendChild( button );
    }
    
    return returnMethods;
};
window.Feedback.Page = function() {};
window.Feedback.Page.prototype = {

    render: function( dom ) {
        this.dom = dom;
    },
    start: function() {},
    close: function() {},
    data: function() {
        // don't collect data from page by default
        return false;
    },
    review: function() {
        return null;
    },
    end: function() { return true; }

};
window.Feedback.Send = function() {};
window.Feedback.Send.prototype = {

    send: function() {}

};

window.Feedback.Form = function( elements ) {

    this.elements = elements || [{
        type: "textarea",
        name: "Issue",
        label: "Please describe the issue you are experiencing",
        required: false
    }];

    this.dom = document.createElement("div");

};

window.Feedback.Form.prototype = new window.Feedback.Page();

window.Feedback.Form.prototype.render = function() {

    var i = 0, len = this.elements.length, item;
    emptyElements( this.dom );
    for (; i < len; i++) {
        item = this.elements[ i ];

        switch( item.type ) {
            case "textarea":
                this.dom.appendChild( element("label", item.label + ":" + (( item.required === true ) ? " *" : "")) );
                this.dom.appendChild( ( item.element = document.createElement("textarea")) );
                break;
        }
    }

    return this;

};

window.Feedback.Form.prototype.end = function() {
    // form validation  
    var i = 0, len = this.elements.length, item;
    for (; i < len; i++) {
        item = this.elements[ i ];

        // check that all required fields are entered
        if ( item.required === true && item.element.value.length === 0) {
            item.element.className = "feedback-error";
            return false;
        } else {
            item.element.className = "";
        }
    }
    
    return true;
    
};

window.Feedback.Form.prototype.data = function() {
    
    if ( this._data !== undefined ) {
        // return cached value
        return this._data;
    }
    
    var i = 0, len = this.elements.length, item, data = {};
    
    for (; i < len; i++) {
        item = this.elements[ i ];
        data[ item.name ] = item.element.value;
    }
    
    // cache and return data
    return ( this._data = data );
};


window.Feedback.Form.prototype.review = function( dom ) {
  
    var i = 0, item, len = this.elements.length;
      
    for (; i < len; i++) {
        item = this.elements[ i ];
        
        if (item.element.value.length > 0) {
            dom.appendChild( element("label", item.name + ":") );
            dom.appendChild( document.createTextNode( item.element.value.length ) );
            dom.appendChild( document.createElement( "hr" ) );
        }
        
    }
    
    return dom;
     
};
window.Feedback.Review = function() {

    this.dom = document.createElement("div");
    this.dom.className = "feedback-review";

};

window.Feedback.Review.prototype = new window.Feedback.Page();

window.Feedback.Review.prototype.render = function( pages ) {

    var i = 0, len = pages.length, item;
    emptyElements( this.dom );
    
    for (; i < len; i++) {
        
        // get preview DOM items
        pages[ i ].review( this.dom );

    }

    return this;

};




window.Feedback.Screenshot = function( options ) {
    this.options = options || {};

    this.options.blackoutClass = this.options.blackoutClass || 'feedback-blackedout';
    this.options.highlightClass = this.options.highlightClass || 'feedback-highlighted';

    this.h2cDone = false;
};

window.Feedback.Screenshot.prototype = new window.Feedback.Page();

window.Feedback.Screenshot.prototype.end = function( modal ){
    modal.className = modal.className.replace(/feedback\-animate\-toside/, "");

    // remove event listeners
    document.body.removeEventListener("mousemove", this.mouseMoveEvent, false);
    document.body.removeEventListener("click", this.mouseClickEvent, false);

    removeElements( [this.h2cCanvas] );

    this.h2cDone = false;

};

window.Feedback.Screenshot.prototype.close = function(){
    removeElements( [ this.blackoutBox, this.highlightContainer, this.highlightBox, this.highlightClose ] );

    removeElements( document.getElementsByClassName( this.options.blackoutClass ) );
    removeElements( document.getElementsByClassName( this.options.highlightClass ) );

};

window.Feedback.Screenshot.prototype.start = function( modal, modalHeader, modalFooter, nextButton ) {

    if ( this.h2cDone ) {
        emptyElements( this.dom );
        nextButton.disabled = false;
        
        var $this = this,
        feedbackHighlightElement = "feedback-highlight-element",
        dataExclude = "data-exclude";

        var action = true;

        // delegate mouse move event for body
        this.mouseMoveEvent = function( e ) {

            // set close button
            if ( e.target !== previousElement && (e.target.className.indexOf( $this.options.blackoutClass ) !== -1 || e.target.className.indexOf( $this.options.highlightClass ) !== -1)) {

                var left = (parseInt(e.target.style.left, 10) +  parseInt(e.target.style.width, 10));
                left = Math.max( left, 10 );

                left = Math.min( left, window.innerWidth - 15 );

                var top = (parseInt(e.target.style.top, 10));
                top = Math.max( top, 10 );

                highlightClose.style.left = left + "px";
                highlightClose.style.top = top + "px";
                removeElement = e.target;
                clearBox();
                previousElement = undefined;
                return;
            }

            // don't do anything if we are highlighting a close button or body tag
            if (e.target.nodeName === "BODY" ||  e.target === highlightClose || e.target === modal || e.target === nextButton || e.target.parentNode === modal || e.target.parentNode === modalHeader) {
                // we are not gonna blackout the whole page or the close item
                clearBox();
                previousElement = e.target;
                return;
            }

            hideClose();

            if (e.target !== previousElement ) {
                previousElement = e.target;

                window.clearTimeout( timer );

                timer = window.setTimeout(function(){
                    var bounds = getBounds( previousElement ),
                    item;

                    if ( action === false ) {
                        item = blackoutBox;
                    } else {
                        item = highlightBox;
                        item.width = bounds.width;
                        item.height = bounds.height;
                        ctx.drawImage($this.h2cCanvas, window.pageXOffset + bounds.left, window.pageYOffset + bounds.top, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height );
                    }

                    // we are only targetting IE>=9, so window.pageYOffset works fine
                    item.setAttribute(dataExclude, false);
                    item.style.left = window.pageXOffset + bounds.left + "px";
                    item.style.top = window.pageYOffset + bounds.top + "px";
                    item.style.width = bounds.width + "px";
                    item.style.height = bounds.height + "px";
                }, 100);



            }


        };


        // delegate event for body click
        this.mouseClickEvent = function( e ){

            e.preventDefault();


            if ( action === false) {
                if ( blackoutBox.getAttribute(dataExclude) === "false") {
                    var blackout = document.createElement("div");
                    blackout.className = $this.options.blackoutClass;
                    blackout.style.left = blackoutBox.style.left;
                    blackout.style.top = blackoutBox.style.top;
                    blackout.style.width = blackoutBox.style.width;
                    blackout.style.height = blackoutBox.style.height;

                    document.body.appendChild( blackout );
                    previousElement = undefined;
                }
            } else {
                if ( highlightBox.getAttribute(dataExclude) === "false") {

                    highlightBox.className += " " + $this.options.highlightClass;
                    highlightBox.className = highlightBox.className.replace(/feedback\-highlight\-element/g,"");
                    $this.highlightBox = highlightBox = document.createElement('canvas');

                    ctx = highlightBox.getContext("2d");

                    highlightBox.className += " " + feedbackHighlightElement;

                    document.body.appendChild( highlightBox );
                    clearBox();
                    previousElement = undefined;
                }
            }



        };

        this.highlightClose = element("div", "×");
        this.blackoutBox = document.createElement('div');
        this.highlightBox = document.createElement( "canvas" );
        this.highlightContainer = document.createElement('div');
        var timer,
        highlightClose = this.highlightClose,
        highlightBox = this.highlightBox,
        blackoutBox = this.blackoutBox,
        highlightContainer = this.highlightContainer,
        removeElement,
        ctx = highlightBox.getContext("2d"),
        buttonClickFunction = function( e ) {
            e.preventDefault();
            
            if (blackoutButton.className.indexOf("active") === -1) {
                blackoutButton.className += " active";
                highlightButton.className = highlightButton.className.replace(/active/g,"");
            } else {
                highlightButton.className += " active";
                blackoutButton.className = blackoutButton.className.replace(/active/g,"");
            }

            action = !action;
        },
        clearBox = function() {
            
            clearBoxEl(blackoutBox);
            clearBoxEl(highlightBox);

            window.clearTimeout( timer );
        },
        clearBoxEl = function( el ) {
            el.style.left =  "-5px";
            el.style.top =  "-5px";
            el.style.width = "0px";
            el.style.height = "0px";
            el.setAttribute(dataExclude, true);
        },
        hideClose = function() {
            highlightClose.style.left =  "-50px";
            highlightClose.style.top =  "-50px";

        },
        blackoutButton = element("a", "Blackout"),
        highlightButton = element("a", "Highlight"),
        previousElement;


        modal.className += ' feedback-animate-toside';


        highlightClose.id = "feedback-highlight-close";


        highlightClose.addEventListener("click", function(){
            removeElement.parentNode.removeChild( removeElement );
            hideClose();
        }, false);

        document.body.appendChild( highlightClose );


        this.h2cCanvas.className = 'feedback-canvas';
        document.body.appendChild( this.h2cCanvas);


        var buttonItem = [ highlightButton, blackoutButton ];

        this.dom.appendChild( element("p", "Highlight or blackout important information") );

        // add highlight and blackout buttons
        for (var i = 0; i < 2; i++ ) {
            buttonItem[ i ].className = 'feedback-btn feedback-btn-small ' + (i === 0 ? 'active' : 'feedback-btn-inverse');

            buttonItem[ i ].href = "#";
            buttonItem[ i ].onclick = buttonClickFunction;

            this.dom.appendChild( buttonItem[ i ] );

            this.dom.appendChild( document.createTextNode(" ") );

        }



        highlightContainer.id = "feedback-highlight-container";
        highlightContainer.style.width = this.h2cCanvas.width + "px";
        highlightContainer.style.height = this.h2cCanvas.height + "px";

        this.highlightBox.className += " " + feedbackHighlightElement;
        this.blackoutBox.id = "feedback-blackout-element";
        document.body.appendChild( this.highlightBox );
        highlightContainer.appendChild( this.blackoutBox );

        document.body.appendChild( highlightContainer );

        // bind mouse delegate events
        document.body.addEventListener("mousemove", this.mouseMoveEvent, false);
        document.body.addEventListener("click", this.mouseClickEvent, false);

    } else {
        // still loading html2canvas
        var args = arguments,
        $this = this;

        if ( nextButton.disabled !== true) {
            this.dom.appendChild( loader() );
        }

        nextButton.disabled = true;

        window.setTimeout(function(){
            $this.start.apply( $this, args );
        }, 500);
    }

};

window.Feedback.Screenshot.prototype.render = function() {

    this.dom = document.createElement("div");

    // execute the html2canvas script
    var script,
    $this = this,
    options = this.options,
    runH2c = function(){
        try {

            options.onrendered = options.onrendered || function( canvas ) {
                $this.h2cCanvas = canvas;
                $this.h2cDone = true;
            };

            window.html2canvas([ document.body ], options);

        } catch( e ) {

            $this.h2cDone = true;
            log("Error in html2canvas: " + e.message);
        }
    };

    if ( window.html2canvas === undefined && script === undefined ) {

        // let's load html2canvas library while user is writing message

        script = document.createElement("script");
        script.src = options.h2cPath || "libs/html2canvas.js";
        script.onerror = function() {
            log("Failed to load html2canvas library, check that the path is correctly defined");
        };

        script.onload = (scriptLoader)(script, function() {

            if (window.html2canvas === undefined) {
                log("Loaded html2canvas, but library not found");
                return;
            }

            window.html2canvas.logging = window.Feedback.debug;
            runH2c();


        });

        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);

    } else {
        // html2canvas already loaded, just run it then
        runH2c();
    }

    return this;
};

window.Feedback.Screenshot.prototype.data = function() {

    if ( this._data !== undefined ) {
        return this._data;
    }

    if ( this.h2cCanvas !== undefined ) {
      
        var ctx = this.h2cCanvas.getContext("2d"),
        canvasCopy,
        copyCtx,
        radius = 5;
        ctx.fillStyle = "#000";

        // draw blackouts
        Array.prototype.slice.call( document.getElementsByClassName('feedback-blackedout'), 0).forEach( function( item ) {
            var bounds = getBounds( item );
            ctx.fillRect( bounds.left, bounds.top, bounds.width, bounds.height );
        });

        // draw highlights
        var items = Array.prototype.slice.call( document.getElementsByClassName('feedback-highlighted'), 0);

        if (items.length > 0 ) {

            // copy canvas
            canvasCopy = document.createElement( "canvas" );
            copyCtx = canvasCopy.getContext('2d');
            canvasCopy.width = this.h2cCanvas.width;
            canvasCopy.height = this.h2cCanvas.height;

            copyCtx.drawImage( this.h2cCanvas, 0, 0 );

            ctx.fillStyle = "#777";
            ctx.globalAlpha = 0.5;
            ctx.fillRect( 0, 0, this.h2cCanvas.width, this.h2cCanvas.height );

            ctx.beginPath();

            items.forEach( function( item ) {

                var x = parseInt(item.style.left, 10),
                y = parseInt(item.style.top, 10),
                width = parseInt(item.style.width, 10),
                height = parseInt(item.style.height, 10);

                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
               
            });
            ctx.closePath();
            ctx.clip();

            ctx.globalAlpha = 1;

            ctx.drawImage(canvasCopy, 0,0);
   
        }
        
        // to avoid security error break for tainted canvas   
        try {
            // cache and return data
            return ( this._data = this.h2cCanvas.toDataURL() );
        } catch( e ) {}
        
    }
};


window.Feedback.Screenshot.prototype.review = function( dom ) {
  
    var data = this.data();
    if ( data !== undefined ) {
        var img = new Image();
        img.src = data;
        img.style.width = "300px";
        dom.appendChild( img );
    }
    
};
window.Feedback.XHR = function( url ) {
    
    this.xhr = new XMLHttpRequest();
    this.url = url;

};

window.Feedback.XHR.prototype = new window.Feedback.Send();

window.Feedback.XHR.prototype.send = function( data, callback ) {
    
    var xhr = this.xhr;
    
    xhr.onreadystatechange = function() {
        if( xhr.readyState == 4 ){
            callback( (xhr.status === 200) );
        }
    };
    
    xhr.open( "POST", this.url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send( "data=" + encodeURIComponent( window.JSON.stringify( data ) ) );
     
};
})( window, document );
