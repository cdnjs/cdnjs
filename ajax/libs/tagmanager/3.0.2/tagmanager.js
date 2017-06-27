/* ===================================================
 * tagmanager.js v3.0.1
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
(function($) {

    "use strict";

    var defaults = {
        prefilled: null,
        CapitalizeFirstLetter: false,
        preventSubmitOnEnter: true,     // deprecated
        isClearInputOnEsc: true,        // deprecated
        externalTagId: false,
        prefillIdFieldName: 'Id',
        prefillValueFieldName: 'Value',
        AjaxPush: null,
        AjaxPushAllTags: null,
        AjaxPushParameters: null,
        delimiters: [9, 13, 44],        // tab, enter, comma
        backspace: [8],
        maxTags: 0,
        hiddenTagListName: null,        // deprecated
        hiddenTagListId: null,          // deprecated
        replace: true,
        output: null,
        deleteTagsOnBackspace: true,    // deprecated
        tagsContainer: null,
        tagCloseIcon: 'x',
        tagClass: '',
        validator: null,
        onlyTagList: false,
        tagList: null,
        fillInputOnTagRemove: false
    },

    publicMethods = {
        pushTag : function (tag, ignoreEvents, externalTagId) {
            var $self = $(this), opts = $self.data('opts'), alreadyInList, tlisLowerCase, max, tagId,
            tlis = $self.data("tlis"), tlid = $self.data("tlid"), idx, newTagId, newTagRemoveId, escaped,
            html, $el, lastTagId, lastTagObj;

            tag = privateMethods.trimTag(tag, opts.delimiterChars);

            if (!tag || tag.length <= 0) { return; }

            // check if restricted only to the tagList suggestions
            if (opts.onlyTagList && undefined !== opts.tagList ){

                //if the list has been updated by look pushed tag in the tagList. if not found return
                if (opts.tagList){
                    var $tagList = opts.tagList;

                    // change each array item to lower case
                    $.each($tagList, function(index, item) {
                        $tagList[index] = item.toLowerCase();
                    });
                    var suggestion = $.inArray(tag.toLowerCase(), $tagList);

                    if ( -1 === suggestion ) {
                        //console.log("tag:" + tag + " not in tagList, not adding it");
                        return;
                    } 
                }

            }

            if (opts.CapitalizeFirstLetter && tag.length > 1) {
                tag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
            }

            // call the validator (if any) and do not let the tag pass if invalid
            if (opts.validator && !opts.validator(tag)) {
                $self.trigger('tm:invalid', tag)
                return;
            }

            // dont accept new tags beyond the defined maximum
            if (opts.maxTags > 0 && tlis.length >= opts.maxTags) { return; }

            alreadyInList = false;
            //use jQuery.map to make this work in IE8 (pure JS map is JS 1.6 but IE8 only supports JS 1.5)
            tlisLowerCase = jQuery.map(tlis, function(elem) {
                return elem.toLowerCase();
            });

            idx = $.inArray(tag.toLowerCase(), tlisLowerCase);

            if (-1 !== idx) {
                // console.log("tag:" + tag + " !!already in list!!");
                alreadyInList = true;
            }

            if (alreadyInList) {
                $self.trigger('tm:duplicated', tag);
                if (opts.blinkClass) {
                    for (var i = 0; i < 6; ++i) {
                        $("#" + $self.data("tm_rndid") + "_" + tlid[idx]).queue(function(next) {
                            $(this).toggleClass(opts.blinkClass);
                            next();
                        }).delay(100);
                    }
                } else {
                    $("#" + $self.data("tm_rndid") + "_" + tlid[idx]).stop()
                        .animate({backgroundColor: opts.blinkBGColor_1}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_2}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_1}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_2}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_1}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_2}, 100);
                }
            } else {
                if (opts.externalTagId === true) {
                    if (externalTagId === undefined) {
                        $.error('externalTagId is not passed for tag -' + tag);
                    }
                    tagId = externalTagId;
                } else {
                    max = Math.max.apply(null, tlid);
                    max = max === -Infinity ? 0 : max;

                    tagId = ++max;
                }
                if (!ignoreEvents) { $self.trigger('tm:pushing', [tag, tagId]); }
                tlis.push(tag);
                tlid.push(tagId);

                if (!ignoreEvents)
                    if (opts.AjaxPush !== null && opts.AjaxPushAllTags == null) {
                        if ($.inArray(tag, opts.prefilled) === -1) {
                            $.post(opts.AjaxPush, $.extend({tag: tag}, opts.AjaxPushParameters));
                        }
                    }

                // console.log("tagList: " + tlis);

                newTagId = $self.data("tm_rndid") + '_' + tagId;
                newTagRemoveId = $self.data("tm_rndid") + '_Remover_' + tagId;
                escaped = $("<span/>").text(tag).html();

                html = '<span class="' + privateMethods.tagClasses.call($self) + '" id="' + newTagId + '">';
                html+= '<span>' + escaped + '</span>';
                html+= '<a href="#" class="tm-tag-remove" id="' + newTagRemoveId + '" TagIdToRemove="' + tagId + '">';
                html+= opts.tagCloseIcon + '</a></span> ';
                $el = $(html);

                if (opts.tagsContainer !== null) {
                    $(opts.tagsContainer).append($el);
                } else {
                    if (tlid.length > 1) {
                        lastTagObj = $self.siblings("#" + $self.data("tm_rndid") + "_" + tlid[tlid.length - 2]);
                        lastTagObj.after($el);
                    } else {
                        $self.before($el);
                    }
                }

                $el.find("#" + newTagRemoveId).on("click", $self, function(e) {
                    e.preventDefault();
                    var TagIdToRemove = parseInt($(this).attr("TagIdToRemove"));
                    privateMethods.spliceTag.call($self, TagIdToRemove, e.data);
                });

                privateMethods.refreshHiddenTagList.call($self);

                if (!ignoreEvents) { $self.trigger('tm:pushed', [tag, tagId]); }

                privateMethods.showOrHide.call($self);
                //if (tagManagerOptions.maxTags > 0 && tlis.length >= tagManagerOptions.maxTags) {
                //  obj.hide();
                //}
            }
            $self.val("");
        },

        popTag : function () {
            var $self = $(this), tagId, tagBeingRemoved,
            tlis = $self.data("tlis"),
            tlid = $self.data("tlid");

            if (tlid.length > 0) {
              tagId = tlid.pop();

              tagBeingRemoved = tlis[tlis.length - 1];
              $self.trigger('tm:popping', [tagBeingRemoved, tagId]);
              tlis.pop();

              // console.log("TagIdToRemove: " + tagId);
              $("#" + $self.data("tm_rndid") + "_" + tagId).remove();
              privateMethods.refreshHiddenTagList.call($self);
              $self.trigger('tm:popped', [tagBeingRemoved, tagId]);
              // console.log(tlis);
            }
        },

        empty : function() {
            var $self = $(this), tlis = $self.data("tlis"), tlid = $self.data("tlid"), tagId;

            while (tlid.length > 0) {
                tagId = tlid.pop();
                tlis.pop();
                // console.log("TagIdToRemove: " + tagId);
                $("#" + $self.data("tm_rndid") + "_" + tagId).remove();
                privateMethods.refreshHiddenTagList.call($self);
                // console.log(tlis);
            }
            $self.trigger('tm:emptied', null);

            privateMethods.showOrHide.call($self);
            //if (tagManagerOptions.maxTags > 0 && tlis.length < tagManagerOptions.maxTags) {
            //  obj.show();
            //}
        },

        tags : function() {
            var $self = this, tlis = $self.data("tlis");
            return tlis;
        }
    },

    privateMethods = {
        showOrHide : function () {
            var $self = this, opts = $self.data('opts'), tlis = $self.data("tlis");

            if (opts.maxTags > 0 && tlis.length < opts.maxTags) {
                $self.show();
                $self.trigger('tm:show');
            }

            if (opts.maxTags > 0 && tlis.length >= opts.maxTags) {
                $self.hide();
                $self.trigger('tm:hide');
            }
        },

        tagClasses : function () {
            var $self = $(this), opts = $self.data('opts'), tagBaseClass = opts.tagBaseClass,
            inputBaseClass = opts.inputBaseClass, cl;
            // 1) default class (tm-tag)
            cl = tagBaseClass;
            // 2) interpolate from input class: tm-input-xxx --> tm-tag-xxx
            if ($self.attr('class')) {
                $.each($self.attr('class').split(' '), function (index, value) {
                    if (value.indexOf(inputBaseClass + '-') !== -1) {
                        cl += ' ' + tagBaseClass + value.substring(inputBaseClass.length);
                    }
                });
            }
            // 3) tags from tagClass option
            cl += (opts.tagClass ? ' ' + opts.tagClass : '');
            return cl;
        },

        trimTag : function (tag, delimiterChars) {
            var i;
            tag = $.trim(tag);
            // truncate at the first delimiter char
            i = 0;
            for (i; i < tag.length; i++) {
                if ($.inArray(tag.charCodeAt(i), delimiterChars) !== -1) { break; }
            }
            return tag.substring(0, i);
        },

        refreshHiddenTagList : function () {
            var $self = $(this), tlis = $self.data("tlis"), lhiddenTagList = $self.data("lhiddenTagList");

            if (lhiddenTagList) {
                $(lhiddenTagList).val(tlis.join($self.data('opts').baseDelimiter)).change();
            }

            $self.trigger('tm:refresh', tlis.join($self.data('opts').baseDelimiter));
        },

        killEvent : function (e) {
            e.cancelBubble = true;
            e.returnValue = false;
            e.stopPropagation();
            e.preventDefault();
        },

        keyInArray : function (e, ary) {
            return $.inArray(e.which, ary) !== -1;
        },

        applyDelimiter : function (e) {
            var $self = $(this);
            publicMethods.pushTag.call($self,$(this).val());
            e.preventDefault();
        },

        prefill: function (pta) {
            var $self = $(this);
            var opts = $self.data('opts')
            $.each(pta, function (key, val) {
                if (opts.externalTagId === true) {
                    publicMethods.pushTag.call($self, val[opts.prefillValueFieldName], true, val[opts.prefillIdFieldName]);
                } else {
                    publicMethods.pushTag.call($self, val, true);
                }
            });
        },

        pushAllTags : function (e, tag) {
            var $self = $(this), opts = $self.data('opts'), tlis = $self.data("tlis");
            if (opts.AjaxPushAllTags) {
                if (e.type !== 'tm:pushed' || $.inArray(tag, opts.prefilled) === -1) {
                    $.post(opts.AjaxPush, $.extend({ tags: tlis.join(opts.baseDelimiter) }, opts.AjaxPushParameters));
                }
            }
        },

        spliceTag : function (tagId) {
            var $self = this, tlis = $self.data("tlis"), tlid = $self.data("tlid"), idx = $.inArray(tagId, tlid),
            tagBeingRemoved;

            // console.log("TagIdToRemove: " + tagId);
            // console.log("position: " + idx);

            if (-1 !== idx) {
                tagBeingRemoved = tlis[idx];
                $self.trigger('tm:splicing', [tagBeingRemoved, tagId]);
                $("#" + $self.data("tm_rndid") + "_" + tagId).remove();
                tlis.splice(idx, 1);
                tlid.splice(idx, 1);
                privateMethods.refreshHiddenTagList.call($self);
                $self.trigger('tm:spliced', [tagBeingRemoved, tagId]);
                // console.log(tlis);
            }

            privateMethods.showOrHide.call($self);
            //if (tagManagerOptions.maxTags > 0 && tlis.length < tagManagerOptions.maxTags) {
            //  obj.show();
            //}
        },

        init : function (options) {
            var opts = $.extend({}, defaults, options), delimiters, keyNums;

            opts.hiddenTagListName = (opts.hiddenTagListName === null)
                ? 'hidden-' + this.attr('name')
                : opts.hiddenTagListName;

            delimiters = opts.delimeters || opts.delimiters; // 'delimeter' is deprecated
            keyNums = [9, 13, 17, 18, 19, 37, 38, 39, 40]; // delimiter values to be handled as key codes
            opts.delimiterChars = [];
            opts.delimiterKeys = [];

            $.each(delimiters, function (i, v) {
                if ($.inArray(v, keyNums) !== -1) {
                    opts.delimiterKeys.push(v);
                } else {
                    opts.delimiterChars.push(v);
                }
            });

            opts.baseDelimiter = String.fromCharCode(opts.delimiterChars[0] || 44);
            opts.tagBaseClass = 'tm-tag';
            opts.inputBaseClass = 'tm-input';

            if (!$.isFunction(opts.validator)) { opts.validator = null; }

            this.each(function() {
                var $self = $(this), hiddenObj ='', rndid ='', albet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                // prevent double-initialization of TagManager
                if ($self.data('tagManager')) { return false; }
                $self.data('tagManager', true);

                for (var i = 0; i < 5; i++) {
                  rndid += albet.charAt(Math.floor(Math.random() * albet.length));
                }

                $self.data("tm_rndid", rndid);

                // store instance-specific data in the DOM object
                $self.data('opts',opts)
                    .data('tlis', []) //list of string tags
                    .data('tlid', []); //list of ID of the string tags

                if (opts.output === null) {
                    hiddenObj = $('<input/>', {
                        type: 'hidden',
                        name: opts.hiddenTagListName
                    });
                    $self.after(hiddenObj);
                    $self.data("lhiddenTagList", hiddenObj);
                } else {
                    $self.data("lhiddenTagList", $(opts.output));
                }

                if (opts.AjaxPushAllTags) {
                    $self.on('tm:spliced', privateMethods.pushAllTags);
                    $self.on('tm:popped', privateMethods.pushAllTags);
                    $self.on('tm:pushed', privateMethods.pushAllTags);
                }

                // hide popovers on focus and keypress events
                $self.on('focus keypress', function(e) {
                    if ($(this).popover) { $(this).popover('hide'); }
                });

                // handle ESC (keyup used for browser compatibility)
                if (opts.isClearInputOnEsc) {
                    $self.on('keyup', function(e) {
                        if (e.which === 27) {
                            // console.log('esc detected');
                            $(this).val('');
                            privateMethods.killEvent(e);
                        }
                    });
                }

                $self.on('keypress', function(e) {
                    // push ASCII-based delimiters
                    if (privateMethods.keyInArray(e, opts.delimiterChars)) {
                        privateMethods.applyDelimiter.call($self, e);
                    }
                });

                $self.on('keydown', function(e) {
                    // disable ENTER
                    if (e.which === 13) {
                        if (opts.preventSubmitOnEnter) {
                            privateMethods.killEvent(e);
                        }
                    }

                    // push key-based delimiters (includes <enter> by default)
                    if (privateMethods.keyInArray(e, opts.delimiterKeys)) {
                        privateMethods.applyDelimiter.call($self, e);
                    }
                });

                // BACKSPACE (keydown used for browser compatibility)
                if (opts.deleteTagsOnBackspace) {
                    $self.on('keydown', function(e) {
                        if (privateMethods.keyInArray(e, opts.backspace)) {
                            // console.log("backspace detected");
                            if ($(this).val().length <= 0) {
                                publicMethods.popTag.call($self);
                                privateMethods.killEvent(e);
                            }
                        }
                    });
                }

                // on tag pop fill back the tag's content to the input field
                if (opts.fillInputOnTagRemove) {
                    $self.on('tm:popped', function(e, tag) {
                        $(this).val(tag);
                    });
                }

                $self.change(function(e) {
                    if (!/webkit/.test(navigator.userAgent.toLowerCase())) {
                        $self.focus();
                    } // why?

                    /* unimplemented mode to push tag on blur
                     else if (tagManagerOptions.pushTagOnBlur) {
                     console.log('change: pushTagOnBlur ' + tag);
                     pushTag($(this).val());
                     } */
                    privateMethods.killEvent(e);
                });

                if (opts.prefilled !== null) {
                    if (typeof (opts.prefilled) === "object") {
                        privateMethods.prefill.call($self, opts.prefilled);
                    } else if (typeof (opts.prefilled) === "string") {
                        privateMethods.prefill.call($self, opts.prefilled.split(opts.baseDelimiter));
                    } else if (typeof (opts.prefilled) === "function") {
                        privateMethods.prefill.call($self, opts.prefilled());
                    }
                } else if (opts.output !== null) {
                    if ($(opts.output) && $(opts.output).val()) { var existing_tags = $(opts.output); }
                    privateMethods.prefill.call($self,$(opts.output).val().split(opts.baseDelimiter));
                }

            });

            return this;
        }
    };

    $.fn.tagsManager = function(method) {
        var $self = $(this);

        if (!(0 in this)) { return this; }

        if ( publicMethods[method] ) {
            return publicMethods[method].apply( $self, Array.prototype.slice.call(arguments, 1) );
        } else if ( typeof method === 'object' || ! method ) {
            return privateMethods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist.' );
            return false;
        }
    };

}(jQuery));
