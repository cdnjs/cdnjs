/*!
 * jquery.sumoselect - v2.0.2
 * http://hemantnegi.github.io/jquery.sumoselect
 * 2014-04-08
 *
 * Copyright 2015 Hemant Negi
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
            placeholder: 'Select Here',   // Dont change it here.
            csvDispCount: 3,              // display no. of items in multiselect. 0 to display all.
            captionFormat:'{0} Selected', // format of caption text. you can set your locale.
            floatWidth: 400,              // Screen width of device at which the list is rendered in floating popup fashion.
            forceCustomRendering: false,  // force the custom modal on all devices below floatWidth resolution.
            nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'], //
            outputAsCSV: false,           // true to POST data as csv ( false for Html control array ie. deafault select )
            csvSepChar: ',',              // seperation char in csv mode
            okCancelInMulti: false,       //display ok cancel buttons in desktop mode multiselect also.
            triggerChangeCombined: true,  // im multi select mode wether to trigger change event on individual selection or combined selection.
            selectAll: false,             // to display select all button in multiselect mode.|| also select all will not be available on mobile devices.
            selectAlltext: 'Select All'   // the text to display for select all.

        }, options);

        var ret = this.each(function () {
            var selObj = this; // the original select object.
            if (this.sumo || !$(this).is('select')) return; //already initialized

            this.sumo = {
                E: $(selObj),   //the jquery object of original select element.
                is_multi: $(selObj).attr('multiple'),  //if its a mmultiple select
                select: '',
                caption: '',
                placeholder: '',
                optDiv: '',
                CaptionCont: '',
                is_floating: false,
                is_opened: false,
                //backdrop: '',
                mob:false, // if to open device default select
                Pstate: [],

                createElems: function () {
                    var O = this;
                    O.E.wrap('<div class="SumoSelect" tabindex="0">');
                    O.select = O.E.parent();
                    O.caption = $('<span></span>');
                    O.CaptionCont = $('<p class="CaptionCont"><label><i></i></label></p>').addClass('SlectBox').attr('style', O.E.attr('style')).prepend(O.caption);
                    O.select.append(O.CaptionCont);

                    if(O.E.attr('disabled'))
                        O.select.addClass('disabled').removeAttr('tabindex');

                    //if output as csv and is a multiselect.
                    if (settings.outputAsCSV && O.is_multi && O.E.attr('name')) {
                        //create a hidden field to store csv value.
                        O.select.append($('<input class="HEMANT123" type="hidden" />').attr('name', O.E.attr('name')).val(O.getSelStr()));

                        // so it can not post the original select.
                        O.E.removeAttr('name');
                    }

                    //break for mobile rendring.. if forceCustomRendering is false
                    if (O.isMobile() && !settings.forceCustomRendering) {
                        O.setNativeMobile();
                        return;
                    }

                    //hide original select
                    O.E.hide();

                    //## Creating the list...
                    O.optDiv = $('<div class="optWrapper">');

                    //branch for floating list in low res devices.
                    O.floatingList();

                    //Creating the markup for the available options
                    ul = $('<ul class="options">');
                    O.optDiv.append(ul);

                    // Select all functionality
                    if (settings.selectAll) O.selAll();

                    $(O.E.children('option')).each(function (i, opt) {       // parsing options to li
                        opt = $(opt);
                        O.createLi(opt);
                    });

                    //if multiple then add the class multiple and add OK / CANCEL button
                    if (O.is_multi) O.multiSelelect();

                    O.select.append(O.optDiv);
                    O.basicEvents();
                    O.selAllState();
                },

                //## Creates a LI element from a given option and binds events to it
                //## Adds it to UL at a given index (Last by default)
                createLi: function (opt,i) {
                    var O = this;

                    if(!opt.attr('value'))opt.attr('value',opt.val());

                    li = $('<li data-val="' + opt.val() + '"><label>' + opt.text() + '</label></li>');
                    if (O.is_multi) li.prepend('<span><i></i></span>');

                    if (opt[0].disabled)
                        li = li.addClass('disabled');

                    O.onOptClick(li);

                    if (opt[0].selected)
                        li.addClass('selected');

                    if (opt.attr('class'))
                        li.addClass(opt.attr('class'));

                    ul = O.optDiv.children('ul.options');
                    if (typeof i == "undefined")
                        ul.append(li);
                    else
                        ul.children('li').eq(i).before(li);

                    return li;
                },

                //## Returns the selected items as string in a Multiselect.
                getSelStr: function () {
                    // get the pre selected items.
                    sopt = [];
                    this.E.children('option:selected').each(function () { sopt.push($(this).val()); });
                    return sopt.join(settings.csvSepChar);
                },

                //## THOSE OK/CANCEL BUTTONS ON MULTIPLE SELECT.
                multiSelelect: function () {
                    var O = this;
                    O.optDiv.addClass('multiple');
                    O.okbtn = $('<p class="btnOk">OK</p>').click(function () {

                        //if combined change event is set.
                        if (settings.triggerChangeCombined) {

                            //check for a change in the selection.
                            changed = false;
                            if (O.E.children('option:selected').length != O.Pstate.length) {
                                changed = true;
                            }
                            else {
                                O.E.children('option:selected').each(function () {
                                    if (O.Pstate.indexOf($(this).val()) < 0) changed = true;
                                });
                            }

                            if (changed) {
                                O.E.trigger('change').trigger('click');
                                O.setText();
                            }
                        }
                        O.hideOpts();
                    });
                    O.cancelBtn = $('<p class="btnCancel">Cancel</p>').click(function () {
                        O._cnbtn();
                        O.hideOpts();
                    });
                    O.optDiv.append($('<div class="MultiControls">').append(O.okbtn).append(O.cancelBtn));
                },

                _cnbtn:function(){
                    var O = this;
                    //remove all selections
                        O.E.children('option:selected').each(function () { this.selected = false; });
                        O.optDiv.find('li.selected').removeClass('selected')

                        //restore selections from saved state.
                        for (i = 0; i < O.Pstate.length; i++) {
                            O.E.children('option[value="' + O.Pstate[i] + '"]')[0].selected = true;
                            O.optDiv.find('li[data-val="' + O.Pstate[i] + '"]').addClass('selected');
                        }
                    O.selAllState();
                },

                selAll:function(){
                    var O = this;
                    if(!O.is_multi)return;
                    O.chkAll = $('<i>');
                    O.selAll = $('<p class="select-all"><label>' + settings.selectAlltext + '</label></p>').prepend($('<span></span>').append(O.chkAll));
                    O.chkAll.on('click',function(){
                        //O.toggSelAll(!);
                        O.selAll.toggleClass('selected');
                        O.optDiv.find('ul.options li').each(function(ix,e){
                            e = $(e);
                            if(O.selAll.hasClass('selected')){
                                if(!e.hasClass('selected'))e.trigger('click');
                            }
                            else
                                if(e.hasClass('selected'))e.trigger('click');
                        });
                    });

                    O.optDiv.prepend(O.selAll);
                },

                selAllState: function () {
                    var O = this;
                    if (settings.selectAll) {
                        var sc = 0, vc = 0;
                        O.optDiv.find('ul.options li').each(function (ix, e) {
                            if ($(e).hasClass('selected')) sc++;
                            if (!$(e).hasClass('disabled')) vc++;
                        });
                        //select all checkbox state change.
                        if (sc == vc) O.selAll.removeClass('partial').addClass('selected');
                        else if (sc == 0) O.selAll.removeClass('selected partial');
                        else O.selAll.addClass('partial')//.removeClass('selected');
                    }
                },

                showOpts: function () {
                    var O = this;
                    if (O.E.attr('disabled')) return; // if select is disabled then retrun
                    O.is_opened = true;
                    //O.backdrop.show();
                    O.optDiv.addClass('open');

                    // hide options on click outside.
//                    $(document).on('click.sumo', function (e) {
//                            if (!O.select.is(e.target)                  // if the target of the click isn't the container...
//                                && O.select.has(e.target).length === 0) // ... nor a descendant of the container
//                            {   if (O.is_multi && settings.okCancelInMulti)
//                                    O._cnbtn();
//                                O.hideOpts();
//                            }
//                    });

                    if (O.is_floating) {
                        H = O.optDiv.children('ul').outerHeight() + 2;  // +2 is clear fix
                        if (O.is_multi) H = H + parseInt(O.optDiv.css('padding-bottom'));
                        O.optDiv.css('height', H);
                    }

                    //maintain state when ok/cancel buttons are available.
                    if (O.is_multi && (O.is_floating || settings.okCancelInMulti)) {
                        O.Pstate = [];
                        O.E.children('option:selected').each(function () { O.Pstate.push($(this).val()); });
                    }
                },
                hideOpts: function () {
                    var O = this;
                    O.is_opened = false;
                    O.optDiv.removeClass('open').find('ul li.sel').removeClass('sel');
                    //$(document).off('click.sumo');
                },
                setOnOpen: function () {
                    var O = this;
                    var li = O.optDiv.find('ul li').eq(O.E[0].selectedIndex);
                    li.addClass('sel');
                    O.showOpts();
                },
                nav: function (up) {
                    var O = this, c;
                    var sel = O.optDiv.find('ul li.sel');
                    if (O.is_opened && sel.length) {
                        if (up)
                            c = sel.prevAll('li:not(.disabled)');
                        else
                            c = sel.nextAll('li:not(.disabled)');
                        if (!c.length)return;
                        sel.removeClass('sel');
                        sel = c.first().addClass('sel');

                        // setting sel item to visible view.
                        var ul = O.optDiv.find('ul'),
                            st = ul.scrollTop(),
                            t = sel.position().top + st;                            
                        if(t >= st + ul.height()-sel.outerHeight())
                            ul.scrollTop(t - ul.height() + sel.outerHeight());
                        if(t<st)
                            ul.scrollTop(t);

                    }
                    else
                        O.setOnOpen();
                },

                basicEvents: function () {
                    var O = this;
                    O.CaptionCont.click(function (evt) {
                        O.E.trigger('click');
                        if (O.is_opened) O.hideOpts(); else O.showOpts();
                        evt.stopPropagation();
                    });

                    O.select.on('blur', function () {
                        if(!O.is_opened)return;
                        //O.hideOpts();
                        O.hideOpts();

                    if (O.is_multi && settings.okCancelInMulti)
                         O._cnbtn();
                    })
                        .on('keydown', function (e) {
                            switch (e.which) {
                                case 38: // up
                                    O.nav(true);
                                    break;

                                case 40: // down
                                    O.nav(false);
                                    break;

                                case 32: // space
                                case 13: // enter
                                    if (O.is_opened)
                                        O.optDiv.find('ul li.sel').trigger('click');
                                    else
                                        O.setOnOpen();
                                    break;

                                case 27: // esc
                                     if (O.is_multi && settings.okCancelInMulti)O._cnbtn();
                                    O.hideOpts();
                                    break;

                                default:
                                    return; // exit this handler for other keys
                            }
                            e.preventDefault(); // prevent the default action (scroll / move caret)
                        });

                    $(window).on('resize.sumo', function () {
                        O.floatingList();
                    });
                },

                onOptClick: function (li) {
                    var O = this;
                    li.click(function () {
                        var li = $(this);
                        if(li.hasClass('disabled'))return;
                        txt = "";
                        if (O.is_multi) {
                            li.toggleClass('selected');
                            O.E.children('option[value="' + li.data('val') + '"]')[0].selected = li.hasClass('selected');

                            O.selAllState();
                        }
                        else {
                            li.parent().find('li.selected').removeClass('selected'); //if not multiselect then remove all selections from this list
                            li.toggleClass('selected');
                            O.E.val(li.attr('data-val'));   //set the value of select element
                        }

                        //branch for combined change event.
                        if (!(O.is_multi && settings.triggerChangeCombined && (O.is_floating || settings.okCancelInMulti))) {
                            O.setText();
                            O.E.trigger('change').trigger('click');
                        }

                        if (!O.is_multi) O.hideOpts(); //if its not a multiselect then hide on single select.
                    });
                },

                setText: function () {
                    var O = this;
                    O.placeholder = "";
                    if (O.is_multi) {
                        sels = O.E.children(':selected').not(':disabled'); //selected options.

                        for (i = 0; i < sels.length; i++) {
                            if (i >= settings.csvDispCount && settings.csvDispCount) {
                                O.placeholder = settings.captionFormat.replace('{0}', sels.length);
                                //O.placeholder = i + '+ Selected';
                                break;
                            }
                            else O.placeholder += $(sels[i]).text() + ", ";
                        }
                        O.placeholder = O.placeholder.replace(/,([^,]*)$/, '$1'); //remove unexpected "," from last.
                    }
                    else {
                        O.placeholder = O.E.children(':selected').not(':disabled').text();
                    }

                    is_placeholder = false;

                    if (!O.placeholder) {

                        is_placeholder = true;

                        O.placeholder = O.E.attr('placeholder');
                        if (!O.placeholder)                  //if placeholder is there then set it
                        {
                            O.placeholder = O.E.children('option:disabled:selected').text();
                            //if (!O.placeholder && settings.placeholder === 'Select Here')
                            //    O.placeholder = O.E.val();
                        }
                    }

                    O.placeholder = O.placeholder ? O.placeholder : settings.placeholder

                    //set display text
                    O.caption.text(O.placeholder);

                    //set the hidden field if post as csv is true.
                    csvField = O.select.find('input.HEMANT123');
                    if (csvField.length) csvField.val(O.getSelStr());

                    //add class placeholder if its a placeholder text.
                    if (is_placeholder) O.caption.addClass('placeholder'); else O.caption.removeClass('placeholder');
                    return O.placeholder;
                },

                isMobile: function () {

                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = navigator.userAgent || navigator.vendor || window.opera;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    for (var i = 0; i < settings.nativeOnDevice.length; i++) if (ua.toString().toLowerCase().indexOf(settings.nativeOnDevice[i].toLowerCase()) > 0) return settings.nativeOnDevice[i];
                    return false;
                },

                setNativeMobile: function () {
                    var O = this;
                    O.E.addClass('SelectClass')//.css('height', O.select.outerHeight());
					O.mob = true;
                    O.E.change(function () {
                        O.setText();
                    });
                },

                floatingList: function () {
                    var O = this;
                    //called on init and also on resize.
                    //O.is_floating = true if window width is < specified float width
                    O.is_floating = $(window).width() <= settings.floatWidth;

                    //set class isFloating
                    O.optDiv.toggleClass('isFloating', O.is_floating);

                    //remove height if not floating
                    if (!O.is_floating) O.optDiv.css('height', '');

                    //toggle class according to okCancelInMulti flag only when it is not floating
                    O.optDiv.toggleClass('okCancelInMulti', settings.okCancelInMulti && !O.is_floating);
                },

                //HELPERS FOR OUTSIDERS
                // validates range of given item operations
                vRange: function (i) {
                    var O = this;
                    opts = O.E.children('option');
                    if (opts.length <= i || i < 0) throw "index out of bounds"
                    return O;
                },

                //toggles selection on c as boolean.
                toggSel: function (c, i) {
                    var O = this.vRange(i);
                    if (O.E.children('option')[i].disabled) return;
                    O.E.children('option')[i].selected = c;
                    if(!O.mob)O.optDiv.find('ul.options li').eq(i).toggleClass('selected',c);
                    O.setText();
                },

                //toggles disabled on c as boolean.
                toggDis: function (c, i) {
                    var O = this.vRange(i);
                    O.E.children('option')[i].disabled = c;
                    if(c)O.E.children('option')[i].selected = false;
                    if(!O.mob)O.optDiv.find('ul.options li').eq(i).toggleClass('disabled', c).removeClass('selected');
                    O.setText();
                },

                // toggle disable/enable on complete select control
                toggSumo: function(val) {
                    var O = this;
                    O.enabled = val;
                    O.select.toggleClass('disabled', val);

                    if (val) {
                        O.E.attr('disabled', 'disabled');
                        O.select.removeAttr('tabindex');
                    }
                    else{
                        O.E.removeAttr('disabled');
                        O.select.attr('tabindex','0');
                    }

                    return O;
                },

                //toggles alloption on c as boolean.
                toggSelAll: function (c) {
                    var O = this;
                    O.E.find('option').each(function (ix, el) {
                        if (O.E.find('option')[$(this).index()].disabled) return;
                        O.E.find('option')[$(this).index()].selected = c;
                        if (!O.mob)
							O.optDiv.find('ul.options li').eq($(this).index()).toggleClass('selected', c);
                        O.setText();
                    });
                    if(!O.mob && settings.selectAll)O.selAll.removeClass('partial').toggleClass('selected',c);
                },

                /* outside accessibility options
                   which can be accessed from the element instance.
                */
                reload:function(){
                    var elm = this.unload();
                    return $(elm).SumoSelect(settings);
                },

                unload: function () {
                    var O = this;
                    O.select.before(O.E);
                    O.E.show();

                    if (settings.outputAsCSV && O.is_multi && O.select.find('input.HEMANT123').length) {
                        O.E.attr('name', O.select.find('input.HEMANT123').attr('name')); // restore the name;
                    }
                    O.select.remove();
                    delete selObj.sumo;
                    return selObj;
                },

                //## add a new option to select at a given index.
                add: function (val, txt, i) {
                    if (typeof val == "undefined") throw "No value to add"

                    var O = this;
                    opts=O.E.children('option')
                    if (typeof txt == "number") { i = txt; txt = val; }
                    if (typeof txt == "undefined") { txt = val; }

                    opt = $("<option></option>").val(val).html(txt);

                    if (opts.length < i) throw "index out of bounds"

                    if (typeof i == "undefined" || opts.length == i) { // add it to the last if given index is last no or no index provides.
                        O.E.append(opt);
                        if(!O.mob)O.createLi(opt);
                    }
                    else {
                        opts.eq(i).before(opt);
                        if(!O.mob)O.createLi(opt, i);
                    }

                    return selObj;
                },

                //## removes an item at a given index.
                remove: function (i) {
                    var O = this.vRange(i);
                    O.E.children('option').eq(i).remove();
                    if(!O.mob)O.optDiv.find('ul.options li').eq(i).remove();
                    O.setText();
                },

                //## Select an item at a given index.
                selectItem: function (i) { this.toggSel(true, i); },

                //## UnSelect an iten at a given index.
                unSelectItem: function (i) { this.toggSel(false, i); },

                //## Select all items  of the select.
                selectAll: function () { this.toggSelAll(true); },

                //## UnSelect all items of the select.
                unSelectAll: function () { this.toggSelAll(false); },

                //## Disable an iten at a given index.
                disableItem: function (i) { this.toggDis(true, i) },

                //## Removes disabled an iten at a given index.
                enableItem: function (i) { this.toggDis(false, i) },

                //## New simple methods as getter and setter are not working fine in ie8-
                //## variable to check state of control if enabled or disabled.
                enabled : true,
                //## Enables the control
                enable: function(){return this.toggSumo(false)},

                //## Disables the control
                disable: function(){return this.toggSumo(true)},


                init: function () {
                    var O = this;
                    O.createElems();
                    O.setText();
                    return O
                }

            };

            selObj.sumo.init();
        });

        return ret.length == 1 ? ret[0] : ret;
    };


}(jQuery));
