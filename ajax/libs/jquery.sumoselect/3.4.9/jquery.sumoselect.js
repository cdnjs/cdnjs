/*global jQuery, define, module, require*/
/*!
 * jquery.sumoselect
 * http://hemantnegi.github.io/jquery.sumoselect
 * 2016-12-12
 *
 * Copyright 2015 Hemant Negi
 * Email : hemant.frnz@gmail.com
 * Compressor http://refresh-sf.com/
 */

(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

})(($) => {

  'namespace sumo';
  $.fn.SumoSelect = function (options) {
    // Extra check for IE compatibility
    const dispatchEvent = (target, eventName) => {
      let event = null;
      if (typeof (Event) === 'function') {
        event = new Event(eventName, {
          bubbles: true
        });
      } else {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
      }

      target.dispatchEvent(event);
    };

    // missing forEach on NodeList for IE11
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }

    // This is the easiest way to have default options.
    const defaultOptions = {
      placeholder: 'Select Here',   // Dont change it here.
      csvDispCount: 3,              // display no. of items in multiselect. 0 to display all.
      captionFormat: '{0} Selected', // format of caption text. you can set your locale.
      captionFormatAllSelected: '{0} all selected!', // format of caption text when all elements are selected. set null to use captionFormat. It will not work if there are disabled elements in select.
      floatWidth: 400,              // Screen width of device at which the list is rendered in floating popup fashion.
      forceCustomRendering: false,  // force the custom modal on all devices below floatWidth resolution.
      nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'], //
      outputAsCSV: false,           // true to POST data as csv ( false for Html control array ie. default select )
      csvSepChar: ',',              // separation char in csv mode
      okCancelInMulti: false,       // display ok cancel buttons in desktop mode multiselect also.
      isClickAwayOk: false,         // for okCancelInMulti=true. sets whether click outside will trigger Ok or Cancel (default is cancel).
      triggerChangeCombined: true,  // im multi select mode whether to trigger change event on individual selection or combined selection.
      selectAll: false,             // to display select all button in multiselect mode.|| also select all will not be available on mobile devices.
      selectAllPartialCheck: true,  // Display a disabled checkbox in multiselect mode when all the items are not selected.
      search: false,                // to display input for filtering content. selectAlltext will be input text placeholder
      searchText: 'Search...',      // placeholder for search input
      searchFn(haystack, needle) { // search function
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) < 0;
      },
      noMatch: 'No matches for "{0}"',
      prefix: '',                   // some prefix usually the field name. eg. '<b>Hello</b>'
      locale: ['OK', 'Cancel', 'Select All', 'Clear all'],  // all text that is used. don't change the index.
      up: false,                    // set true to open upside.
      showTitle: true,              // set to false to prevent title (tooltip) from appearing
      clearAll: false,              // im multi select - clear all checked options
      closeAfterClearAll: false,    // im multi select - close select after clear
      max: null,                    // Maximum number of options selected (when multiple)
      // eslint-disable-next-line no-unused-vars
      renderLi: (li, _originalOption) => li          // Custom <li> item renderer
    };

    const ret = this.each(function () {
      const selObj = this; // the original select object.
      if (this.sumo || !$(this).is('select')) return; //already initialized

      const settings = $.extend({}, defaultOptions, options, $(this).data());

      this.sumo = {
        E: $(selObj),   //the jquery object of original select element.
        is_multi: $(selObj).attr('multiple'),  //if its a multiple select
        select: '',
        caption: '',
        placeholder: '',
        optDiv: '',
        CaptionCont: '',
        ul: '',
        is_floating: false,
        is_opened: false,
        //backdrop: '',
        mob: false, // if to open device default select
        Pstate: [],
        lastUnselected: null,
        selectedCount: 0,

        createElems() {
          const O = this;
          const selectedOptions = O.E.find('option:checked');
          O.E.wrap('<div class="SumoSelect" tabindex="0" role="button" aria-expanded="false">');
          selectedOptions.each((_, selectedOption) => { // Fix for IE resetting index to 0 when -1
            selectedOption.selected = true;
          });
          O.select = O.E.parent();
          O.caption = $('<span>');
          O.CaptionCont = $(`<p class="CaptionCont SelectBox ${O.E.attr('class')}" ><label><i></i></label></p>`)
            .attr('style', O.E.attr('style'))
            .prepend(O.caption);
          O.select.append(O.CaptionCont);

          // default turn off if no multiselect
          if (!O.is_multi) settings.okCancelInMulti = false;

          if (O.E.attr('disabled'))
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

          // if there is a name attr in select add a class to container div
          if (O.E.attr('name')) O.select.addClass(`sumo_${O.E.attr('name').replace(/\[\]/, '')}`);

          //hide original select
          O.E.addClass('SumoUnder').attr('tabindex', '-1');

          //## Creating the list...
          O.optDiv = $(`<div class="optWrapper ${settings.up ? 'up' : ''}">`);

          //branch for floating list in low res devices.
          O.floatingList();

          //Creating the markup for the available options
          O.ul = $('<ul class="options">');
          O.optDiv.append(O.ul);

          // Select all functionality
          if (settings.clearAll && O.is_multi) O.ClearAll();
          if (settings.selectAll && O.is_multi && !settings.max) O.SelAll();

          // search functionality
          if (settings.search) O.Search();

          O.ul.append(O.prepItems(O.E.children()));

          //if multiple then add the class multiple and add OK / CANCEL button
          if (O.is_multi) O.multiSelelect();

          O.select.append(O.optDiv);
          O._handleMax();
          O.basicEvents();
          O.selAllState();
        },

        prepItems(opts, d) {
          const lis = [], O = this;
          $(opts).each((i, opt) => {       // parsing options to li
            const $opt = $(opt);
            lis.push($opt.is('optgroup') ?
              $(`<li class="group ${opt.disabled ? 'disabled' : ''}"><label></label><ul></ul></li>`)
                .find('label')
                .text($opt.attr('label'))
                .end()
                .find('ul')
                .append(O.prepItems($opt.children(), opt.disabled))
                .end()
              :
              O.createLi($opt, d)
            );
          });
          return lis;
        },

        //## Creates a LI element from a given option and binds events to it
        //## returns the jquery instance of li (not inserted in dom)
        createLi(opt, d) {
          const O = this;

          if (!opt.attr('value')) opt.attr('value', opt.val());
          const li = $(`<li class="opt"><label>${opt.html()}</label></li>`);

          li.data('opt', opt);    // store a direct reference to option.
          opt.data('li', li);    // store a direct reference to list item.
          if (O.is_multi) li.prepend('<span><i></i></span>');

          if (opt[0].disabled || d)
            li.addClass('disabled');

          O.onOptClick(li);

          if (opt[0].selected) {
            li.addClass('selected');
            O.selectedCount++;
          }

          if (opt.attr('class'))
            li.addClass(opt.attr('class'));

          if (opt.attr('title'))
            li.attr('title', opt.attr('title'));

          return settings.renderLi(li, opt);
        },

        //## Returns the selected items as string in a Multiselect.
        getSelStr() {
          // get the pre selected items.
          const sopt = [];
          this.E.find('option:checked').each(function () { sopt.push($(this).val()); });
          return sopt.join(settings.csvSepChar);
        },

        //## THOSE OK/CANCEL BUTTONS ON MULTIPLE SELECT.
        multiSelelect() {
          const O = this;
          O.optDiv.addClass('multiple');
          O.okbtn = $('<p tabindex="0" class="btnOk"></p>').on('click', () => {
            //if combined change event is set.
            O._okbtn();
            O.hideOpts();
          });
          [O.okbtn[0].innerText] = settings.locale;

          O.cancelBtn = $('<p tabindex="0" class="btnCancel"></p>').on('click', () => {
            O._cnbtn();
            O.hideOpts();
          });
          [, O.cancelBtn[0].innerText] = settings.locale;

          const btns = O.okbtn.add(O.cancelBtn);
          O.optDiv.append($('<div class="MultiControls">').append(btns));

          // handling keyboard navigation on ok cancel buttons.
          btns.on('keydown.sumo', function (e) {
            const el = $(this);
            switch (e.which) {
              case 32: // space
              case 13: // enter
                el.trigger('click');
                break;

              case 9:  //tab
                if (el.hasClass('btnOk')) return;
                break;
              case 27: // esc
                O._cnbtn();
                O.hideOpts();
                return;
              default:
                break;
            }
            e.stopPropagation();
            e.preventDefault();
          });
        },

        _okbtn() {
          const O = this;
          let cg = 0;
          //if combined change event is set.
          if (settings.triggerChangeCombined) {
            //check for a change in the selection.
            if (O.E.find('option:checked').length !== O.Pstate.length) {
              cg = 1;
            }
            else {
              O.E.find('option').each((i, e) => {
                if (e.selected && O.Pstate.indexOf(i) < 0) cg = 1;
              });
            }

            if (cg) {
              O.callChange();
              O.setText();
            }
          }
        },
        _cnbtn() {
          const O = this;
          //remove all selections
          O.E.find('option:checked').each(function () { this.selected = false; });
          O.optDiv.find('li.selected').removeClass('selected');

          //restore selections from saved state.
          for (let i = 0; i < O.Pstate.length; i++) {
            O.E.find('option')[O.Pstate[i]].selected = true;
            O.ul.find('li.opt').eq(O.Pstate[i]).addClass('selected');
          }
          O.setText();
          O.selAllState();
        },

        _handleMax() {
          // Disable options if max reached
          if (settings.max) {
            if (this.selectedCount >= +settings.max) {
              this.optDiv.find('li.opt').not('.hidden').each((ix, e) => {
                if (!$(e).hasClass('selected')) {
                  $(e).addClass('temporary-disabled disabled');
                }
              });
            } else {
              // Enable options back
              this.optDiv.find('li.opt').not('.hidden').each((ix, e) => {
                if ($(e).hasClass('temporary-disabled')) {
                  $(e).removeClass('temporary-disabled disabled');
                }
              });
            }
          }
        },

        ClearAll () {
          const O = this;
          if (!O.is_multi) return;
          O.selAll = $('<p class="reset-all"><span><i></i></span><label></label></p>');
          [, , , O.selAll.find('label')[0].innerText] = settings.locale;
          O.optDiv.addClass('resetAll');
          O.selAll.on('click', () => {
            O.selAll.removeClass('selected');
            O.toggSelAll(false, 1);
            if (settings.closeAfterClearAll) {
              O.hideOpts();
            }
          });

          O.optDiv.prepend(O.selAll);
        },

        SelAll() {
          const O = this;
          if (!O.is_multi) return;
          O.selAll = $('<p class="select-all"><span><i></i></span><label></label></p>');
          [, , O.selAll.find('label')[0].innerText] = settings.locale;
          O.optDiv.addClass('selall');
          O.selAll.on('click', () => {
            O.selAll.toggleClass('selected');
            O.toggSelAll(O.selAll.hasClass('selected'), 1);
            O.selAllState();
          });

          O.optDiv.prepend(O.selAll);
        },

        // search module (can be removed if not required.)
        Search() {
          const O = this,
            cc = O.CaptionCont.addClass('search'),
            P = $('<p class="no-match">'),
            fn = (options.searchFn && typeof options.searchFn === 'function') ? options.searchFn : settings.searchFn;

          O.ftxt = $('<input type="search" class="search-txt" value="" autocomplete="off">')
            .on('click', (e) => {
              e.stopPropagation();
            });
          O.ftxt[0].placeholder = settings.searchText;
          cc.append(O.ftxt);
          O.optDiv.children('ul').after(P);

          O.ftxt.on('input.sumo', () => {
            const hid = O.optDiv.find('ul.options li.opt').each((ix, e) => {
              const el = $(e),
                { 0: opt } = el.data('opt');
              opt.hidden = fn(el.text(), O.ftxt.val(), el);
              el.toggleClass('hidden', opt.hidden);
            }).not('.hidden');

            // Hide opt-groups with no options matched
            O.optDiv[0].querySelectorAll('li.group').forEach(optGroup => {
              if (optGroup.querySelector('li:not(.hidden)')) {
                optGroup.classList.remove('hidden');
              } else {
                optGroup.classList.add('hidden');
              }
            });

            P.html(settings.noMatch.replace(/\{0\}/g, '<em></em>')).toggle(!hid.length);
            P.find('em').text(O.ftxt.val());
            O.selAllState();
          });
        },

        selAllState() {
          const O = this;
          if (settings.selectAll && O.is_multi) {
            let sc = 0, vc = 0;
            O.optDiv.find('li.opt:not(.disabled):not(.hidden)').each((ix, e) => {
              if ($(e).hasClass('selected')) sc++;
              vc++;
            });
            //select all checkbox state change.
            if (sc === vc)  O.selAll.removeClass('partial').addClass('selected');
            else if (sc === 0) O.selAll.removeClass('selected partial');
            else {
              if(settings.selectAllPartialCheck) {
                O.selAll.addClass('partial')
              }
              O.selAll.removeClass('selected');
            }
          }
        },

        showOpts() {
          const O = this;
          if (O.E.attr('disabled')) return; // if select is disabled then retrun
          O.E.trigger('sumo:opening', O);
          O.is_opened = true;
          O.select.addClass('open').attr('aria-expanded', 'true');

          // Scroll first selected option into view
          const firstSelected = O.optDiv.find('li.opt.selected').first();
          if (firstSelected.length) {
            O.optDiv.find('.options').scrollTop(firstSelected.position().top);
          } else {
            O.optDiv.find('.options').scrollTop(0);
          }

          O.E.trigger('sumo:opened', O);

          if (O.ftxt) O.ftxt.focus();
          else O.select.focus();

          // hide options on click outside.
          $(document).on('click.sumo', (e) => {
            if (!O.select.is(e.target)                  // if the target of the click isn't the container...
              && O.select.has(e.target).length === 0) { // ... nor a descendant of the container
              if (!O.is_opened) return;
              O.hideOpts();
              if (settings.okCancelInMulti) {
                if (settings.isClickAwayOk)
                  O._okbtn();
                else
                  O._cnbtn();
              }
            }
          });

          if (O.is_floating) {
            let H = O.optDiv.children('ul').outerHeight() + 2;  // +2 is clear fix
            if (O.is_multi) H = H + +O.optDiv.css('padding-bottom');
            O.optDiv.css('height', H);
            $('body').addClass('sumoStopScroll');
          }

          O.setPstate();
        },

        //maintain state when ok/cancel buttons are available storing the indexes.
        setPstate() {
          const O = this;
          if (O.is_multi && (O.is_floating || settings.okCancelInMulti)) {
            O.Pstate = [];
            // assuming that find returns elements in tree order
            O.E.find('option').each((i, e) => { if (e.selected) O.Pstate.push(i); });
          }
        },

        callChange() {
          this.E.get().forEach(e => {
            dispatchEvent(e, 'change');
            dispatchEvent(e, 'click');
          });
        },

        hideOpts() {
          const O = this;
          if (O.is_opened) {
            O.E.trigger('sumo:closing', O);
            O.is_opened = false;
            O.select.removeClass('open').attr('aria-expanded', 'false').find('ul li.sel').removeClass('sel');
            O.E.trigger('sumo:closed', O);
            $(document).off('click.sumo');
            $('body').removeClass('sumoStopScroll');

            // clear the search
            if (settings.search) {
              O.ftxt.val('');
              O.ftxt.trigger('input.sumo');
            }
          }
        },
        setOnOpen() {
          const O = this;
          let li = O.optDiv.find('li.opt:not(.hidden)').eq(settings.search ? 0 : O.E[0].selectedIndex);
          if (li.hasClass('disabled')) {
            li = li.next(':not(disabled)');
            if (!li.length) return;
          }
          O.optDiv.find('li.sel').removeClass('sel');
          li.addClass('sel');
          O.showOpts();
        },
        nav(up) {
          const O = this;
          let c = null, sel = O.ul.find('li.opt.sel:not(.hidden)');
          const
            s = O.ul.find('li.opt:not(.disabled):not(.hidden)'),
            idx = s.index(sel);
          if (O.is_opened && sel.length) {
            if (up && idx > 0)
              c = s.eq(idx - 1);
            else if (!up && idx < s.length - 1 && idx > -1)
              c = s.eq(idx + 1);
            else return; // if no items before or after

            sel.removeClass('sel');
            sel = c.addClass('sel');

            // setting sel item to visible view.
            const { ul } = O,
              st = ul.scrollTop(),
              t = sel.position().top + st;
            if (t >= st + ul.height() - sel.outerHeight())
              ul.scrollTop(t - ul.height() + sel.outerHeight());
            if (t < st)
              ul.scrollTop(t);

          }
          else
            O.setOnOpen();
        },

        basicEvents() {
          const O = this;
          O.CaptionCont.on('click', (evt) => {
            O.E.trigger('click');
            if (O.is_opened) O.hideOpts(); else O.showOpts();
            evt.stopPropagation();
          });

          O.select.on('keydown.sumo', (e) => {
            switch (e.which) {
              case 38: // up
                O.nav(true);
                break;

              case 40: // down
                O.nav(false);
                break;

              case 65: // shortcut ctrl + a to select all and ctrl + shift + a to unselect all.
                if (O.is_multi && !settings.max && e.ctrlKey) {
                  O.toggSelAll(!e.shiftKey, 1);
                  break;
                }
                else
                  return;

              case 32: // space
                if (settings.search && O.ftxt.is(e.target)) return;
                break;
              case 13: // enter
                if (O.is_opened)
                  O.optDiv.find('ul li.sel').trigger('click');
                  if (settings.search) O.select.focus();
                else
                  O.setOnOpen();
                break;
              case 9:	 //tab
                if (!settings.okCancelInMulti)
                  O.hideOpts();
                return;
              case 27: // esc
                if (settings.okCancelInMulti) O._cnbtn();
                O.hideOpts();
                if (settings.search) O.select.focus();
                return;

              default:
                return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
          });

          $(window).on('resize.sumo', () => {
            O.floatingList();
          });
        },

        onOptClick(li) {
          const O = this;
          li.on('click', function () {
            const $li = $(this);
            if ($li.hasClass('disabled')) return;
            if (O.is_multi) {
              $li.toggleClass('selected');
              $li.data('opt')[0].selected = $li.hasClass('selected');
              if ($li.data('opt')[0].selected === false) {
                O.lastUnselected = $li.data('opt')[0].textContent;
                O.selectedCount--;
              } else {
                O.selectedCount++;
              }

              if (settings.max) {
                O._handleMax();
              }

              O.selAllState();
            }
            else {
              $li.parent().find('li.selected').removeClass('selected'); //if not multiselect then remove all selections from this list
              $li.toggleClass('selected');
              $li.data('opt')[0].selected = true;
              O.selectedCount = 1;
            }

            //branch for combined change event.
            if (!(O.is_multi && settings.triggerChangeCombined && (O.is_floating || settings.okCancelInMulti))) {
              O.setText();
              O.callChange();
            }

            if (!O.is_multi) O.hideOpts(); //if its not a multiselect then hide on single select.
          });
        },

        // fixed some variables that were not explicitly typed (michc)
        setText() {
          const O = this;
          let lengthSelected = 0;
          O.placeholder = "";
          if (O.is_multi) {
            const sels = O.E.find(':checked').not(':disabled'); //selected options.

            lengthSelected = sels.length;

            if (settings.csvDispCount && sels.length > settings.csvDispCount) {
              if (sels.length === O.E.find('option').length && settings.captionFormatAllSelected) {
                O.placeholder = settings.captionFormatAllSelected.replace(/\{0\}/g, sels.length);
              }
              else {
                O.placeholder = settings.captionFormat.replace(/\{0\}/g, sels.length);
              }
            }
            else {
              O.placeholder = sels.toArray().map(selected => selected.innerText).join(', ');
            }
          }
          else {
            const option = O.E.find(':checked').not(':disabled');
            O.placeholder = option.text();
            lengthSelected = option.length;
          }

          let is_placeholder = false;

          if (!O.placeholder) {

            is_placeholder = true;

            O.placeholder = O.E.attr('placeholder');
            if (!O.placeholder)                  //if placeholder is there then set it
              O.placeholder = O.E.find('option:disabled:checked').text();
          }

          O.select.attr('selected-count', lengthSelected);
          O.select.attr('is-selected', lengthSelected ? 'true' : 'false');
          
          O.placeholder = O.placeholder ? (`${settings.prefix} ${O.placeholder}`) : settings.placeholder;

          //set display text
          O.caption.text(O.placeholder);
          if (settings.showTitle) O.CaptionCont.attr('title', O.placeholder);

          //set the hidden field if post as csv is true.
          const csvField = O.select.find('input.HEMANT123');
          if (csvField.length) csvField.val(O.getSelStr());

          //add class placeholder if its a placeholder text.
          if (is_placeholder) O.caption.addClass('placeholder'); else O.caption.removeClass('placeholder');
          return O.placeholder;
        },

        isMobile() {

          // Adapted from http://www.detectmobilebrowsers.com
          const ua = navigator.userAgent || navigator.vendor || window.opera;

          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          for (let i = 0; i < settings.nativeOnDevice.length; i++) if (ua.toString().toLowerCase().indexOf(settings.nativeOnDevice[i].toLowerCase()) > 0) return settings.nativeOnDevice[i];
          return false;
        },

        setNativeMobile() {
          const O = this;
          O.E.addClass('SelectClass');//.css('height', O.select.outerHeight());
          O.mob = true;
          O.E.change(() => {
            O.setText();
          });
        },

        floatingList() {
          const O = this;
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
        vRange(i) {
          const O = this;
          const opts = O.E.find('option');
          if (opts.length <= i || i < 0) throw new Error("index out of bounds");
          return O;
        },

        //toggles selection on c as boolean.
        toggSel(c, i) {
          const O = this;
          let opt = null;
          if (typeof (i) === "number") {
            O.vRange(i);
            opt = O.E.find('option')[i];
          }
          else {
            opt = O.E.find(`option[value="${i}"]`)[0] || 0;
          }
          if (!opt || opt.disabled)
            return;

          if (opt.selected !== c) {
            if ((settings.max && !opt.selected && O.selectedCount < settings.max) || opt.selected || (!settings.max && !opt.selected)) {
              opt.selected = c;
              if (!O.mob) $(opt).data('li').toggleClass('selected', c);

              O.callChange();
              O.setPstate();
              O.setText();
              O.selAllState();
            }
          }
        },

        //toggles disabled on c as boolean.
        toggDis(c, i) {
          const O = this.vRange(i);
          O.E.find('option')[i].disabled = c;
          if (c) O.E.find('option')[i].selected = false;
          if (!O.mob) O.optDiv.find('ul.options li.opt').eq(i).toggleClass('disabled', c).removeClass('selected');
          O.setText();
        },

        // toggle disable/enable on complete select control
        toggSumo(val) {
          const O = this;
          O.enabled = val;
          O.select.toggleClass('disabled', val);

          if (val) {
            O.E.attr('disabled', 'disabled');
            O.select.removeAttr('tabindex');
          }
          else {
            O.E.removeAttr('disabled');
            O.select.attr('tabindex', '0');
          }

          return O;
        },

        // toggles all option on c as boolean.
        // set direct=false/0 bypasses okCancelInMulti behaviour.
        toggSelAll(c, direct) {
          const O = this;
          const cloneOriginalEvents = $.extend(true, {}, $._data(O.E.get(0), "events")); // clone original select elements events
          O.E.off(); // unbind original select elements events because we do not want the following clicks to trigger change on it

          if (O.is_multi) {
            // Select all
            if (c) {
              O.E.find('option').toArray().filter((option) => !option.selected && !option.disabled && option.style.display !== 'none').forEach(option => {
                if (!$(option).data('li').hasClass('hidden')) {
                  option.selected = true;
                  $(option).data('li').toggleClass('selected', true);
                }
              });
            } else {
              // Unselect all
              O.E.find('option').toArray().filter((option) => option.selected && !option.disabled && option.style.display !== 'none').forEach(option => {
                if (!$(option).data('li').hasClass('hidden')) {
                  option.selected = false;
                  $(option).data('li').toggleClass('selected', false);
                }
              });
            }
          } else {
            if (!c) O.E[0].selectedIndex = -1;
            else console.warn('You called `SelectAll` on a non-multiple select');
          }

          // rebind original select elements events
          $.each(cloneOriginalEvents, (_, e) => {
            $.each(e, (__, ev) => {
              O.E.on(ev.type, ev.handler);
            });
          });

          if ((O.is_multi && !settings.okCancelInMulti) || !O.is_multi) {
            O.callChange(); // call change on original select element
            O.setText();
          }

          if (!direct) {
            if (!O.mob && O.selAll) O.selAll.removeClass('partial').toggleClass('selected', !!c);
            O.setText();
            O.setPstate();
          }
        },

        /* outside accessibility options
          which can be accessed from the element instance.
         */
        reload() {
          const elm = this.unload();
          return $(elm).SumoSelect(settings);
        },

        unload() {
          const O = this;
          O.select.before(O.E);
          O.E.show();
          O.E[0].classList.remove('SumoUnder', 'SelectClass');

          if (settings.outputAsCSV && O.is_multi && O.select.find('input.HEMANT123').length) {
            O.E.attr('name', O.select.find('input.HEMANT123').attr('name')); // restore the name;
          }
          O.select.remove();
          delete selObj.sumo;
          O.E.trigger('sumo:unloaded', O);
          return selObj;
        },

        //## add a new option to select at a given index.
        add(val, txt, i, attr) {
          if (typeof val === "undefined") throw new Error("No value to add");

          const O = this;
          const opts = O.E.find('option');
          const value = val;
          let
            text = txt,
            index = i;
          if (typeof txt === "number") { // .add('xxx', 2) shorthand
            index = txt;
            text = val;
          } else if (typeof txt === "undefined") { // .add('xxx') shorthand
            text = val;
          }

          const opt = $("<option></option>").val(value).html(text);

          if (attr && typeof attr === "object") {
            $.each(attr, (j, v) => {
              opt.attr(j, v);
            });
          }

          if (opts.length < index) throw new Error("index out of bounds");

          if (typeof index === "undefined" || opts.length === index) { // add it to the last if given index is last no or no index provides.
            O.E.append(opt);
            if (!O.mob) O.ul.append(O.createLi(opt));
          }
          else {
            opts.eq(index).before(opt);
            if (!O.mob) O.ul.find('li.opt').eq(index).before(O.createLi(opt));
          }

          return selObj;
        },

        //## removes an item at a given index.
        remove(i) {
          const O = this.vRange(i);
          O.E.find('option').eq(i).remove();
          if (!O.mob) O.optDiv.find('ul.options li.opt').eq(i).remove();
          O.setText();
        },

        // removes all but the selected one
        removeAll() {
          const O = this;
          const optionList = O.E.find('option');

          for (let x = (optionList.length - 1); x >= 0; x--) {
            if (optionList[x].selected !== true) {
              O.remove(x);
            }
          }

        },


        find(val) {
          const O = this;
          const optionList = O.E.find('option');
          for (const x in optionList) {
            if (optionList[x].value === val) {
              return +x;
            }
          }

          return -1;

        },

        //## Select an item at a given index.
        selectItem(i) { this.toggSel(true, i); },

        //## UnSelect an iten at a given index.
        unSelectItem(i) { this.toggSel(false, i); },

        //## Select all items  of the select.
        selectAll() { this.toggSelAll(true); },

        //## UnSelect all items of the select.
        unSelectAll() { this.toggSelAll(false); },

        //## Disable an iten at a given index.
        disableItem(i) { this.toggDis(true, i); },

        //## Removes disabled an iten at a given index.
        enableItem(i) { this.toggDis(false, i); },

        //## New simple methods as getter and setter are not working fine in ie8-
        //## variable to check state of control if enabled or disabled.
        enabled: true,
        //## Enables the control
        enable() { return this.toggSumo(false); },

        //## Disables the control
        disable() { return this.toggSumo(true); },


        init() {
          const O = this;
          O.createElems();
          O.setText();
          O.E.trigger('sumo:initialized', O);
          return O;
        }

      };

      selObj.sumo.init();
    });

    return ret.length === 1 ? ret[0] : ret;
  };


});
