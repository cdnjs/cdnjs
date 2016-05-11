// Reference
// This file is for referencing while you are making a PNotify module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.reference', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    // This if the default values of your options.
    PNotify.prototype.options.reference = {
        // Provide a thing for stuff. Turned off by default.
        put_thing: false,
        // If you are displaying any text, you should use a labels options to
        // support internationalization.
        labels: {
            text: "Spin Around"
        }
    };
    PNotify.prototype.modules.reference = {
        // You can put variables here that are specific to a notice instance.
        thingElem: null,

        // This function is called when the notice is being created, after the
        // core has done all of its work.
        init: function(notice /* the notice object */, options /* this module's options */){
            var that = this; // This line will allow you to access instance variables
                             // like "this.thingElem" from within closures.

            // The notice object is also available here:
            this.notice;
            // The module's options are also available here:
            this.options;

            // Note that options only contains the options specific to our modules.
            // To access global options, we would use notice.options.

            // We want to check to make sure the notice should include our thing.
            if (!options.put_thing) {
                return;
            }

            // We're going to create a button that will be appended to the notice.
            // It will be disabled by default, so we can enable it on mouseover.
            // You should try to keep elements inside the notice container.
            this.thingElem = $('<button style="float:right;" class="btn btn-default" type="button" disabled><i class="'+notice.styles.athing+'" />&nbsp;'+options.labels.text+'</button>').appendTo(notice.container);
            // Since our button is floated, we have to add a clearing div.
            notice.container.append('<div style="clear: right; line-height: 0;" />')

            // Now we're going to enable the button on mouseenter.
            notice.elem.on({
                "mouseenter": function(e){
                    // Enable the button.
                    // Notice that we have to use "that" to access thingElem, because
                    // we are in a different scope inside this function.
                    that.thingElem.prop("disabled", false);
                },
                "mouseleave": function(e){
                    // Disable the button.
                    that.thingElem.prop("disabled", true);
                }
            });

            // Now we're going to make our button do something.
            this.thingElem.on("click", function(){
                // Spin the notice around.
                var cur_angle = 0;
                var timer = setInterval(function(){
                    cur_angle += 10;
                    if (cur_angle == 360) {
                        cur_angle = 0;
                        clearInterval(timer);
                    }
                    notice.elem.css({
                        '-moz-transform': ('rotate('+cur_angle+'deg)'),
                        '-webkit-transform': ('rotate('+cur_angle+'deg)'),
                        '-o-transform': ('rotate('+cur_angle+'deg)'),
                        '-ms-transform': ('rotate('+cur_angle+'deg)'),
                        'filter': ('progid:DXImageTransform.Microsoft.BasicImage(rotation='+(cur_angle / 360 * 4)+')')
                    });
                }, 20);
            });
        },

        // This is called when the notice is updating its options.
        update: function(notice, options /* the new options for our module */, oldOpts /* the old options for our module */){
            // The notice object is also available here:
            this.notice;
            // The module's options are also available here:
            this.options;

            // We need to remove the button if it's now disabled, and show it again if it's enabled.
            if (options.put_thing && this.thingElem) {
                this.thingElem.show();
            } else if (!options.put_thing && this.thingElem) {
                this.thingElem.hide();
            }
            // You may notice that if the user creates a notice without our button,
            // then updates it to enable our button, they will be out of luck.
            // Whatever, I don't want to write that much code.

            // Now we update the icon, which may have changed.
            // Note that as of right now, PNotify doesn't support updating styling.
            if (this.thingElem) {
                this.thingElem.find('i').attr("class", notice.styles.athing);
            }
        },
        // I have nothing to put in these, just showing you that they exist. You
        // won't need to include them if you aren't using them.
        beforeOpen: function(notice, options){
            // Called before the notice is opened.
        },
        afterOpen: function(notice, options){
            // Called after the notice is opened.
        },
        beforeClose: function(notice, options){
            // Called before the notice is closed.
        },
        afterClose: function(notice, options){
            // Called after the notice is closed.
        },
        beforeDestroy: function(notice, options){
            // Called before the notice is destroyed.
        },
        afterDestroy: function(notice, options){
            // Called after the notice is destroyed.
        }
    };
    // This is where you would add any styling options you are using in your code.
    $.extend(PNotify.styling.jqueryui, {
        athing: "ui-icon ui-icon-refresh"
    });
    $.extend(PNotify.styling.bootstrap2, {
        athing: "icon-refresh"
    });
    $.extend(PNotify.styling.bootstrap3, {
        athing: "glyphicon glyphicon-refresh"
    });
    $.extend(PNotify.styling.fontawesome, {
        athing: "fa fa-refresh"
    });
}));
