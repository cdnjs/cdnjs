/* ===================================================
 * tagmanager.js v3.0.0
 * http://welldonethings.com/tags/manager
 * ===================================================
 * Copyright 2012 Max Favilli
 *
 * Licensed under the Mozilla Public License, Version 2.0 You may not use this work except in compliance with the License.
 *
 * http://www.mozilla.org/MPL/2.0/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

(function ($) {

  "use strict";

  if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {};
    console.log = function () { };
  }

  $.fn.tagsManager = function (options, tagToManipulate) {
    var obj = this;
    var rndid = "";

    var tagManagerOptions = {
      prefilled: null,
      CapitalizeFirstLetter: false,
      preventSubmitOnEnter: true, // deprecated
      isClearInputOnEsc: true, // deprecated
      AjaxPush: null,
      AjaxPushAllTags: null,
      AjaxPushParameters: null,
      delimiters: [9, 13, 44], // tab, enter, comma
      backspace: [8],
      maxTags: 0,
      hiddenTagListName: null,  // deprecated
      hiddenTagListId: null,  // deprecated
      replace: true,
      output: null,
      deleteTagsOnBackspace: true, // deprecated
      tagsContainer: null,
      tagCloseIcon: 'x',
      tagClass: '',
      validator: null,
      onlyTagList: false
    };

    // exit when no matched elements
    if (!(0 in this)) {
      return this;
    }

    if (typeof options == 'string') {
      tagManagerOptions = obj.data("tm_options");
    } else {
      $.extend(tagManagerOptions, options);
      obj.data("tm_options", tagManagerOptions);
    }

    if (typeof options == 'string') {
      rndid = obj.data("tm_rndid");
    } else {
      var albet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (var i = 0; i < 5; i++)
        rndid += albet.charAt(Math.floor(Math.random() * albet.length));
      obj.data("tm_rndid", rndid);
    }

    if (tagManagerOptions.replace === true && tagManagerOptions.hiddenTagListName === null) {
      var original_name = obj.attr('name');
      tagManagerOptions.hiddenTagListName = original_name;
      obj.attr('name', "display-" + rndid);
    }
    if (tagManagerOptions.hiddenTagListName === null) {
      tagManagerOptions.hiddenTagListName = "hidden-" + rndid;
    }

    var delimiters = tagManagerOptions.delimeters || tagManagerOptions.delimiters; // 'delimeter' is deprecated
    // delimiter values to be handled as key codes
    var keyNums = [9, 13, 17, 18, 19, 37, 38, 39, 40];
    var delimiterChars = [], delimiterKeys = [];
    $.each(delimiters, function (i, v) {
      if ($.inArray(v, keyNums) != -1) {
        delimiterKeys.push(v);
      } else {
        delimiterChars.push(v);
      }
    });
    var baseDelimiter = String.fromCharCode(delimiterChars[0] || 44);
    var backspace = tagManagerOptions.backspace;
    var tagBaseClass = 'tm-tag';
    var inputBaseClass = 'tm-input';

    if ($.isFunction(tagManagerOptions.validator)) obj.data('validator', tagManagerOptions.validator);


    //var ajaxPolling = function (query, process) {
    //  if (typeof (tagManagerOptions.typeaheadAjaxSource) == "string") {
    //    $.ajax({
    //      cache: false,
    //      type: "POST",
    //      contentType: "application/json",
    //      dataType: "json",
    //      url: tagManagerOptions.typeaheadAjaxSource,
    //      data: JSON.stringify({ typeahead: query }),
    //      success: function (data) { onTypeaheadAjaxSuccess(data, false, process); }
    //    });
    //  }
    //};


    var tagClasses = function () {
      // 1) default class (tm-tag)
      var cl = tagBaseClass;
      // 2) interpolate from input class: tm-input-xxx --> tm-tag-xxx
      if (obj.attr('class')) {
        $.each(obj.attr('class').split(' '), function (index, value) {
          if (value.indexOf(inputBaseClass + '-') != -1) {
            cl += ' ' + tagBaseClass + value.substring(inputBaseClass.length);
          }
        });
      }
      // 3) tags from tagClass option
      cl += (tagManagerOptions.tagClass ? ' ' + tagManagerOptions.tagClass : '');
      return cl;
    };

    var trimTag = function (tag) {
      tag = $.trim(tag);
      // truncate at the first delimiter char
      var i = 0;
      for (i; i < tag.length; i++) {
        if ($.inArray(tag.charCodeAt(i), delimiterChars) != -1) break;
      }
      return tag.substring(0, i);
    };

    var showOrHide = function () {
      var tlis = obj.data("tlis");
      if (tagManagerOptions.maxTags > 0 && tlis.length < tagManagerOptions.maxTags) {
        obj.show();
        obj.trigger('tm:show');
      }
      if (tagManagerOptions.maxTags > 0 && tlis.length >= tagManagerOptions.maxTags) {
        obj.hide();
        obj.trigger('tm:hide');
      }
    };

    var popTag = function () {
      var tlis = obj.data("tlis");
      var tlid = obj.data("tlid");

      if (tlid.length > 0) {
        var tagId = tlid.pop();

        var tagBeingRemoved = tlis[tlis.length - 1];
        obj.trigger('tm:beforePop', tagBeingRemoved);
        tlis.pop();

        // console.log("TagIdToRemove: " + tagId);
        $("#" + rndid + "_" + tagId).remove();
        refreshHiddenTagList();
        obj.trigger('tm:afterPop', tagBeingRemoved);
        // console.log(tlis);
      }

      showOrHide();
      //if (tagManagerOptions.maxTags > 0 && tlis.length < tagManagerOptions.maxTags) {
      //  obj.show();
      //}
    };

    var empty = function () {
      var tlis = obj.data("tlis");
      var tlid = obj.data("tlid");

      while (tlid.length > 0) {
        var tagId = tlid.pop();
        tlis.pop();
        // console.log("TagIdToRemove: " + tagId);
        $("#" + rndid + "_" + tagId).remove();
        refreshHiddenTagList();
        // console.log(tlis);
      }
      obj.trigger('tm:emptied', null);

      showOrHide();
      //if (tagManagerOptions.maxTags > 0 && tlis.length < tagManagerOptions.maxTags) {
      //  obj.show();
      //}
    };

    var refreshHiddenTagList = function () {
      var tlis = obj.data("tlis");
      var lhiddenTagList = obj.data("lhiddenTagList");

      if (lhiddenTagList) {
        $(lhiddenTagList).val(tlis.join(baseDelimiter)).change();
      }

      obj.trigger('tm:refresh', tlis.join(baseDelimiter));
    };

    var spliceTag = function (tagId) {
      var tlis = obj.data("tlis");
      var tlid = obj.data("tlid");

      var p = $.inArray(tagId, tlid);

      // console.log("TagIdToRemove: " + tagId);
      // console.log("position: " + p);

      if (-1 != p) {
        var tagBeingRemoved = tlis[p];

        obj.trigger('tm:beforeSplice', tagBeingRemoved);

        $("#" + rndid + "_" + tagId).remove();
        tlis.splice(p, 1);
        tlid.splice(p, 1);
        refreshHiddenTagList();

        obj.trigger('tm:afterSplice', tagBeingRemoved);

        // console.log(tlis);
      }


      showOrHide();
      //if (tagManagerOptions.maxTags > 0 && tlis.length < tagManagerOptions.maxTags) {
      //  obj.show();
      //}
    };

    var pushAllTags = function (e, tag) {
      if (tagManagerOptions.AjaxPushAllTags) {
        if (e.type != 'tm:afterPush' || $.inArray(tag, tagManagerOptions.prefilled) == -1) {
          var tlis = obj.data("tlis");
          $.post(tagManagerOptions.AjaxPush, { tags: tlis.join(baseDelimiter) });
        }
      }
    };

    var pushTag = function (tag, ignore_events) {
      tag = trimTag(tag);

      if (!tag || tag.length <= 0) return;

      if (tagManagerOptions.CapitalizeFirstLetter && tag.length > 1) {
        tag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
      }

      // call the validator (if any) and do not let the tag pass if invalid
      if (obj.data('validator') && !obj.data('validator')(tag)) return;

      var tlis = obj.data("tlis");
      var tlid = obj.data("tlid");

      // dont accept new tags beyond the defined maximum
      if (tagManagerOptions.maxTags > 0 && tlis.length >= tagManagerOptions.maxTags) return;

      var alreadyInList = false;
      var tlisLowerCase = tlis.map(function (elem) { return elem.toLowerCase(); });
      var p = $.inArray(tag.toLowerCase(), tlisLowerCase);
      if (-1 != p) {
        // console.log("tag:" + tag + " !!already in list!!");
        alreadyInList = true;
      }

      if (alreadyInList) {
        var pTagId = tlid[p];
        $("#" + rndid + "_" + pTagId).stop()
          .animate({ backgroundColor: tagManagerOptions.blinkBGColor_1 }, 100)
          .animate({ backgroundColor: tagManagerOptions.blinkBGColor_2 }, 100)
          .animate({ backgroundColor: tagManagerOptions.blinkBGColor_1 }, 100)
          .animate({ backgroundColor: tagManagerOptions.blinkBGColor_2 }, 100)
          .animate({ backgroundColor: tagManagerOptions.blinkBGColor_1 }, 100)
          .animate({ backgroundColor: tagManagerOptions.blinkBGColor_2 }, 100);
      } else {
        if(!ignore_events)
          obj.trigger('tm:beforePush', tag);

        var max = Math.max.apply(null, tlid);
        max = max == -Infinity ? 0 : max;

        var tagId = ++max;
        tlis.push(tag);
        tlid.push(tagId);

        if (!ignore_events)
          if (tagManagerOptions.AjaxPush != null) {
            if ($.inArray(tag, tagManagerOptions.prefilled) == -1) {
              $.post(tagManagerOptions.AjaxPush, $.extend({ tag: tag }, tagManagerOptions.AjaxPushParameters));
            }
          }

        // console.log("tagList: " + tlis);

        var newTagId = rndid + '_' + tagId;
        var newTagRemoveId = rndid + '_Remover_' + tagId;
        var escaped = $("<span></span>").text(tag).html();

        var html = '<span class="' + tagClasses() + '" id="' + newTagId + '">';
        html += '<span>' + escaped + '</span>';
        html += '<a href="#" class="tm-tag-remove" id="' + newTagRemoveId + '" TagIdToRemove="' + tagId + '">';
        html += tagManagerOptions.tagCloseIcon + '</a></span> ';
        var $el = $(html);

        if (tagManagerOptions.tagsContainer != null) {
          $(tagManagerOptions.tagsContainer).append($el);
        } else {
          if (tagId > 1) {
            var lastTagId = tagId - 1;
            var lastTagObj = $("#" + rndid + "_" + lastTagId);
            lastTagObj.after($el);
          } else {
            obj.before($el);
          }
        }

        $el.find("#" + newTagRemoveId).on("click", obj, function (e) {
          e.preventDefault();
          var TagIdToRemove = parseInt($(this).attr("TagIdToRemove"));
          spliceTag(TagIdToRemove, e.data);
        });

        refreshHiddenTagList();

        if (!ignore_events)
          obj.trigger('tm:afterPush', tag);

        showOrHide();
        //if (tagManagerOptions.maxTags > 0 && tlis.length >= tagManagerOptions.maxTags) {
        //  obj.hide();
        //}
      }
      obj.val("");
    };

    var prefill = function (pta) {
      $.each(pta, function (key, val) {
        pushTag(val,true);
      });
    };

    var killEvent = function (e) {
      e.cancelBubble = true;
      e.returnValue = false;
      e.stopPropagation();
      e.preventDefault();
    };

    var keyInArray = function (e, ary) {
      return $.inArray(e.which, ary) != -1
    };

    var applyDelimiter = function (e) {
      pushTag(obj.val());
      e.preventDefault();
    };

    var returnValue = null;
    this.each(function () {

      if (typeof options == 'string') {
        switch (options) {
          case "empty":
            empty();
            break;
          case "popTag":
            popTag();
            break;
          case "pushTag":
            pushTag(tagToManipulate);
            break;
          case "tags":
            returnValue = { tags: obj.data("tlis") };
            break;
        }
        return;
      }

      // prevent double-initialization of TagManager
      if ($(this).data('tagManager')) { return false; }
      $(this).data('tagManager', true);

      // store instance-specific data in the DOM object
      var tlis = new Array();
      var tlid = new Array();
      obj.data("tlis", tlis); //list of string tags
      obj.data("tlid", tlid); //list of ID of the string tags

      if (tagManagerOptions.output == null) { 
        var hiddenObj = jQuery('<input/>', {
          type: 'hidden',
          name: tagManagerOptions.hiddenTagListName
        });
        obj.after(hiddenObj);
        obj.data("lhiddenTagList", hiddenObj);
      } else {
        obj.data("lhiddenTagList", jQuery(tagManagerOptions.output))
      }

      if (tagManagerOptions.AjaxPushAllTags) {
        obj.on('tm:afterSplice', pushAllTags);
        obj.on('tm:afterPop', pushAllTags);
        obj.on('tm:afterPush', pushAllTags);
      }

      // hide popovers on focus and keypress events
      obj.on('focus keypress', function (e) {
        if ($(this).popover) {
          $(this).popover('hide');
        }
      });

      // handle ESC (keyup used for browser compatibility)
      if (tagManagerOptions.isClearInputOnEsc) {
        obj.on('keyup', function (e) {
          if (e.which == 27) {
            // console.log('esc detected');
            $(this).val('');
            killEvent(e);
          }
        });
      }

      obj.on('keypress', function (e) {
        // push ASCII-based delimiters
        if (keyInArray(e, delimiterChars)) {
          applyDelimiter(e);
        }
      });

      obj.on('keydown', function (e) {
        // disable ENTER
        if (e.which == 13) {
          if (tagManagerOptions.preventSubmitOnEnter) {
            killEvent(e);
          }
        }

        // push key-based delimiters (includes <enter> by default)
        if (keyInArray(e, delimiterKeys)) {
          applyDelimiter(e);
        }
      });

      // BACKSPACE (keydown used for browser compatibility)
      if (tagManagerOptions.deleteTagsOnBackspace) {
        obj.on('keydown', function (e) {
          if (keyInArray(e, backspace)) {
            // console.log("backspace detected");
            if ($(this).val().length <= 0) {
              popTag();
              killEvent(e);
            }
          }
        });
      }

      obj.change(function (e) {

        if (!/webkit/.test(navigator.userAgent.toLowerCase())) { $(this).focus(); } // why?

        /* unimplemented mode to push tag on blur
         else if (tagManagerOptions.pushTagOnBlur) {
         console.log('change: pushTagOnBlur ' + tag);
         pushTag($(this).val());
         } */
        killEvent(e);
      });

      if (tagManagerOptions.prefilled != null) {
        if (typeof (tagManagerOptions.prefilled) == "object") {
          prefill(tagManagerOptions.prefilled);
        } else if (typeof (tagManagerOptions.prefilled) == "string") {
          prefill(tagManagerOptions.prefilled.split(baseDelimiter));
        } else if (typeof (tagManagerOptions.prefilled) == "function") {
          prefill(tagManagerOptions.prefilled());
        }
      } else if (tagManagerOptions.output != null) {
        if (jQuery(tagManagerOptions.output) && jQuery(tagManagerOptions.output).val())
        var existing_tags = jQuery(tagManagerOptions.output)
        prefill(jQuery(tagManagerOptions.output).val().split(baseDelimiter));
      }
    });

    if (!returnValue)
      returnValue = this;

    return returnValue;
  }
})(jQuery);