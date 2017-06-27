/*!
 * jquery.sumoselect - v1.0.0
 * http://hemantnegi.github.io/jquery.sumoselect
 * 2014-04-08
 *
 * Copyright 2014 Hemant Negi
 * Email : hemant.frnz@gmail.com
 * Compressor http://refresh-sf.com/yui/
 */

(function ($) {
            'namespace sumo';
            $.fn.SumoSelect = function (options) {

                // var is_visible_default = false;
                //$(document).click(function () { is_visible_default = false; });

                // This is the easiest way to have default options.
                var settings = $.extend({
                    placeholder: 'Select Here',  // Dont change it here.
                    csvDispCount: 3,             // display no. of items in multiselect. 0 to display all.
                    floatWidth: 400,             // Screen width of device at which the list is rendered in floating popup fashion.
                    forceCustomRendering: false, // force the custom modal on all devices below floatWidth resolution.
                    nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'], //'Windows'
                    outputAsCSV : true,          //true to POST data as csv ( false for Html control array ie. deafault select )
                    csvSepChar : ',',            // seperation char in csv mode
                    okCancelInMulti: false,      //display ok cancel buttons in desktop mode multiselect also. 
                    triggerChangeCombined : true // im multi select mode wether to trigger change event on individual selection or combined selection.

                }, options);

                return this.each(function () {
                    var self = this;
                    this.E = $(this);                    //the original select element
                    this.is_multi = self.E.attr('multiple');  //if its a mmultiple select
                    this.select, this.caption, this.placeholder, this.optDiv, this.CaptionCont,this.is_floating = this.is_opened = false, this.backdrop, this.Pstate=[];

                    this.createElems = function () {
                        self.E.wrap('<div class="SumoSelect">');
                        self.select = self.E.parent();
                        self.caption = $('<span></span>');
                        self.CaptionCont = $('<p class="CaptionCont"><label><i></i></label></p>').addClass('SlectBox').attr('style', self.E.attr('style')).prepend(self.caption);
                        self.select.append(self.CaptionCont);

                        //if output as csv and is a multiselect.
                        if (settings.outputAsCSV && self.is_multi && self.E.attr('name')) {
                            //create a hidden field to store csv value.
                            self.select.append($('<input class="HEMANT123" type="hidden" />').attr('name', self.E.attr('name')).val(self.getSelStr()));

                            // so it can not post the original select.
                            self.E.removeAttr('name'); 
                        }

                        //break for mobile rendring.. if forceCustomRendering is false
                        if (self.isMobile() && !settings.forceCustomRendering) {                 
                            self.setNativeMobile();
                            return;
                        }

                        //hide original select
                        self.E.hide();

                        //## Creating the list...
                        self.optDiv = $('<div class="optWrapper">');

                        //barnch for floating list in low res devices.
                        self.floatingList();

                        //Creating the markup for the available options
                        ul = $('<ul class="options">');
                        self.optDiv.append(ul);

                        $(self.E.children('option')).each(function (i, opt) {       // parsing options to li
                            opt = $(opt);
                            li = $('<li data-val="' + opt.val() + '"><label>' + opt.text() + '</label></li>');
                            if (self.is_multi) li.prepend('<span><i></i></span>');
                            ul.append(li);

                            if (opt.attr('disabled'))
                                li.addClass('disabled');
                            else
                                self.onOptClick(li);

                            if (opt.attr('selected'))
                                li.addClass('selected');
                        });

                        //if multiple then add the class multiple and add OK / CANCEL button
                        if (self.is_multi) self.multiSelelect();

                        //creating the backdrop element for clickoutside support.
                        if (!$('.BackdropSelect').length) $('body').append('<div class="BackdropSelect">');
                        self.backdrop = $('.BackdropSelect');

                        self.select.append(self.optDiv);
                        self.basicEvents();
                    }

                    //## Returns the selected items as string in a Multiselect.
                    this.getSelStr = function () {
                        // get the pre selected items.
                        sopt = [];
                        self.E.children('option:selected').each(function () { sopt.push($(this).val()); });
                        return sopt.join(settings.csvSepChar);
                    }

                    //## THOSE OK/CANCEL BUTTONS ON MULTIPLE SELECT.
                    this.multiSelelect = function () {
                        self.optDiv.addClass('multiple');
                        okbtn = $('<p class="btnOk">OK</p>').click(function () {

                            //if combined change event is set.
                            if (settings.triggerChangeCombined) {

                                //check for a change in the selection.
                                changed = false;
                                if (self.E.children('option:selected').length != self.Pstate.length) {
                                    changed = true;
                                }
                                else {
                                    self.E.children('option:selected').each(function () {
                                        if (self.Pstate.indexOf($(this).val()) < 0) changed = true;
                                    });
                                }

                                if (changed) {
                                    self.E.trigger('change');
                                    self.setText();
                                }
                            }
                            self.hideOpts();
                        });
                        cancelBtn = $('<p class="btnCancel">Cancel</p>').click(function () {
                            //remove all selections
                            self.E.children('option:selected').each(function () { this.selected = false; });
                            self.optDiv.find('li.selected').removeClass('selected')

                            //restore selections from saved state.
                            for (i = 0; i < self.Pstate.length; i++) {
                                self.E.children('option[value="' + self.Pstate[i] + '"]')[0].selected = true;
                                self.optDiv.find('li[data-val="' + self.Pstate[i] + '"]').addClass('selected');
                            }
                            self.setText();
                            self.hideOpts();
                        });
                        self.optDiv.append($('<div class="MultiControls">').append(okbtn).append(cancelBtn));
                    }

                    this.showOpts = function () {
                        self.is_opened = true;
                        self.backdrop.show();
                        self.optDiv.addClass('open');

                        if (self.is_floating) {
                            H = self.optDiv.children('ul').outerHeight() + 2 ;  // +2 is clear fix
                            if (self.is_multi) H = H + parseInt(self.optDiv.css('padding-bottom'));
                            self.optDiv.css('height', H);
                        }

                        //maintain state when ok/cancel buttons are available.
                        if (self.is_multi && (self.is_floating || settings.okCancelInMulti)) {
                            self.Pstate = [];
                            self.E.children('option:selected').each(function () { self.Pstate.push($(this).val()); });
                        }
                    }
                    this.hideOpts = function () {
                        self.is_opened = false;
                        self.backdrop.hide();
                        self.optDiv.removeClass('open');
                    }

                    this.basicEvents = function () {
                        self.CaptionCont.click(function (evt) {
                            if (self.is_opened) self.hideOpts(); else self.showOpts();
                            // self.E.focus();

                            self.E.trigger('click');
                        });

                        self.backdrop.click(function () { self.hideOpts(); });

                        self.E.on('blur', function () {
                            //setTimeout(function () {
                            self.optDiv.removeClass('open');
                            // }, 200);
                        });

                        $(window).on('resize.sumo', function () { self.floatingList(); });
                    }

                    this.onOptClick = function (li) {
                        li.click(function () {
                            var li = $(this);
                            txt = "";
                            if (self.is_multi) {
                                li.toggleClass('selected');
                                self.E.children('option[value="' + li.attr('data-val') + '"]')[0].selected = li.hasClass('selected');
                            }
                            else {
                                li.parent().find('li.selected').removeClass('selected'); //if not multiselect then remove all selections from this list
                                li.toggleClass('selected');
                                self.E.val(li.attr('data-val'));   //set the value of select element
                            }

                            //branch for combined change event.
                            if (!(self.is_multi && settings.triggerChangeCombined && (self.is_floating || settings.okCancelInMulti))) {
                                self.setText();
                                self.E.trigger('change');
                            }

                            if(!self.is_multi)self.hideOpts(); //if its not a multiselect then hide on single select.
                        });
                    }

                    this.setText = function () {
                        self.placeholder = "";
                        if (self.is_multi) {
                            sels = self.E.children(':selected').not(':disabled'); //selected options.
                           
                            for (i = 0; i < sels.length; i++) {
                                if (i >= settings.csvDispCount && settings.csvDispCount) {
                                    self.placeholder = i + '+ Selected';
                                    break;
                                }
                                else self.placeholder += $(sels[i]).text() + ", ";
                            }
                            self.placeholder = self.placeholder.replace(/,([^,]*)$/, '$1'); //remove unexpected "," from last.
                        }
                        else {
                            self.placeholder = self.E.children(':selected').not(':disabled').text();
                        }

                        is_placeholder = false;

                        if (!self.placeholder) {

                            is_placeholder = true;

                            self.placeholder = self.E.attr('placeholder');
                            if (!self.placeholder)                  //if placeholder is there then set it
                            {
                                self.placeholder = self.E.children('option:disabled:selected').text();
                                //if (!self.placeholder && settings.placeholder === 'Select Here')
                                //    self.placeholder = self.E.val();
                            }
                        }

                        self.placeholder = self.placeholder ? self.placeholder : settings.placeholder

                        //set display text
                        self.caption.text(self.placeholder);

                        //set the hidden field if post as csv is true.
                        csvField = self.select.find('input.HEMANT123');
                        if (csvField.length) csvField.val(self.getSelStr());
                       
                        //add class placeholder if its a placeholder text.
                        if (is_placeholder) self.caption.addClass('placeholder'); else self.caption.removeClass('placeholder');
                        return self.placeholder;
                    }

                    this.isMobile = function () {

                        // Adapted from http://www.detectmobilebrowsers.com
                        var ua = navigator.userAgent || navigator.vendor || window.opera;

                        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                        for (var i in settings.nativeOnDevice) if (ua.toLowerCase().indexOf(settings.nativeOnDevice[i].toLowerCase()) > 0) return settings.nativeOnDevice[i];
                        return false;
                    };

                    this.setNativeMobile = function () {
                        self.E.addClass('SelectClass').css('height', self.select.outerHeight());

                        self.E.change(function () {
                            self.setText();
                        });
                    }

                    this.floatingList = function () {
                        //called on init and also on resize.
                        //self.is_floating = true if window width is < specified float width
                        self.is_floating = $(window).width() <= settings.floatWidth;

                        //set class isFloating
                        self.optDiv.toggleClass('isFloating', self.is_floating);
                        
                        //remove height if not floating
                        if (!self.is_floating)self.optDiv.css('height', '');
                        
                        //toggle class according to okCancelInMulti flag only when it is not floating
                        self.optDiv.toggleClass('okCancelInMulti', settings.okCancelInMulti && !self.is_floating);
                    }

                    this.init = function () {
                        self.createElems();
                        self.setText();
                    }

                    self.init();
                });
            };

        }(jQuery));