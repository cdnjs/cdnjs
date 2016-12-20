/*
* background-size-emu | https://github.com/Metafalica/background-size-emu
*/

(function ()
{
    function BgSzEmu()
    {
        BgSzEmu.prototype.elemsOnPrevCheck = null;
        BgSzEmu.prototype.genericEmptyBG = "url(empty_bg_" + new Date().getTime() + ".wtf)";
    }

    BgSzEmu.prototype.scanElems = function ()
    {
        if (!BgSzEmu.prototype.IsIE() || !BgSzEmu.prototype.IsBadIE())
            return;

        if (document.body)
        {
            var curr_elems = new Array();
            BgSzEmu.prototype.getElemsIn(null, curr_elems);

            if (!BgSzEmu.prototype.elemsOnPrevCheck)
            {
                BgSzEmu.prototype.elemsOnPrevCheck = curr_elems.slice(0);
                BgSzEmu.prototype.activateBgSzFixer();
            }
            else
            {
                for (var i = 0; i < curr_elems.length; i++)
                    if (BgSzEmu.prototype.isObjectInArray(curr_elems[i], BgSzEmu.prototype.elemsOnPrevCheck))
                    {
                        if (!curr_elems[i].junkData)
                            continue;

                        var available_size = BgSzEmu.prototype.getAvailableAreaSizeIn(curr_elems[i]);

                        if (curr_elems[i].junkData.lastSize && (curr_elems[i].junkData.lastSize.width != available_size.width || curr_elems[i].junkData.lastSize.height != available_size.height))
                            BgSzEmu.prototype.fixBgFor(curr_elems[i]);
                    }
                    else
                    {
                        var curr_bg_img = BgSzEmu.prototype.getCSSPropertyValue(curr_elems[i], "background-image", "backgroundImage");

                        if (curr_bg_img && !curr_elems[i].junkData)
                            BgSzEmu.prototype.fixBgFor(curr_elems[i]);
                    }

                BgSzEmu.prototype.elemsOnPrevCheck = curr_elems.slice(0);
            }
        }

        setTimeout(BgSzEmu.prototype.scanElems, 500);
    };

    BgSzEmu.prototype.activateBgSzFixer = function ()
    {
        if (!BgSzEmu.prototype.IsIE() || !BgSzEmu.prototype.IsBadIE())
            return;

        BgSzEmu.prototype.fixBgsRecursiveIn(null);
        window.onresize = BgSzEmu.prototype.handleResize;
    };

    BgSzEmu.prototype.fixBgsRecursiveIn = function (start_elem)
    {
        var curr_elem = start_elem ? start_elem : document.body;

        var bg_sz = BgSzEmu.prototype.getCSSPropertyValue(curr_elem, "background-size", "backgroundSize");

        if (bg_sz && bg_sz.toLowerCase() != "auto auto")
            BgSzEmu.prototype.fixBgFor(curr_elem);

        for (var i = 0; i < curr_elem.children.length; i++)
            BgSzEmu.prototype.fixBgsRecursiveIn(curr_elem.children[i]);
    };

    BgSzEmu.prototype.handleResize = function ()
    {
        BgSzEmu.prototype.fixBgsRecursiveIn(null);
    };

    BgSzEmu.prototype.handlePropertyChange = function ()
    {
        var evt = window.event;
        var elem = evt.target || evt.srcElement;

        if (evt.propertyName == "onpropertychange" || !elem)
            return;

        if (evt.propertyName == "style.backgroundImage")
        {
            var bg_img = elem.style.backgroundImage || elem.currentStyle.backgroundImage;

            if (bg_img == BgSzEmu.prototype.genericEmptyBG) //skip change made by emu to clear background
                return;

            if ((!bg_img || bg_img == "none") && elem.junkData)
            {
                elem.removeChild(elem.junkData.inner_div);
                elem.style.position = elem.junkData.orig_pos;
                elem.style.zIndex = elem.junkData.orig_zInd;
                elem.junkData = null;
            }
            else
                BgSzEmu.prototype.replaceBgImgFor(elem);
        }
        else if (BgSzEmu.prototype.startsWith(evt.propertyName, "style.background"))
            BgSzEmu.prototype.replaceBgImgFor(elem);
    };

    BgSzEmu.prototype.replaceBgImgFor = function (elem)
    {
        if (!BgSzEmu.prototype.elemCanHaveDivAsChildren(elem)) //can't deal with tags that do not support children
            return;

        var e_avl_sz = BgSzEmu.prototype.getAvailableAreaSizeIn(elem);

        if (e_avl_sz.width == 0 || e_avl_sz.height == 0)
            return;

        var prop_change_removed = false;

        if (elem.onpropertychange)
        {
            elem.onpropertychange = null;
            prop_change_removed = true;
        }

        var prev_backgroundImage = BgSzEmu.prototype.getCSSPropertyValue(elem, "background-image", "backgroundImage") || elem.background || elem.getAttribute("background");

        if (BgSzEmu.prototype.startsWith(prev_backgroundImage, "url(")) //process images only. skip gradients
        {
            if (prev_backgroundImage == BgSzEmu.prototype.genericEmptyBG)
                BgSzEmu.prototype.fixBgFor(elem);
            else
                BgSzEmu.prototype.getImgNaturalSizeAndPassToCallback(elem, prev_backgroundImage, BgSzEmu.prototype.continueBgReplaceFor);
        }

        if (prop_change_removed)
            elem.onpropertychange = BgSzEmu.prototype.handlePropertyChange;
    };

    BgSzEmu.prototype.continueBgReplaceFor = function (elem, prev_backgroundImage, img_natural_size)
    {
        var prev_zIndex = elem.style.zIndex;
        var prev_position = elem.style.position;

        if (img_natural_size.width == 0 || img_natural_size.height == 0) //bad img url?
            return;

        elem.style.backgroundImage = BgSzEmu.prototype.genericEmptyBG;

        if ("background" in elem)
            elem.background = BgSzEmu.prototype.genericEmptyBG;

        var stylePosition = elem.style.position || elem.currentStyle.position;
        var styleZIndex = elem.style.zIndex || elem.currentStyle.zIndex;

        if (!stylePosition || stylePosition == "static")
            elem.style.position = "relative";

        if (!styleZIndex || styleZIndex == "auto")
            elem.style.zIndex = 0;

        var div = document.createElement("div");
        var img = document.createElement("img");

        div.style.margin = 0;
        div.style.top = "0px";
        div.style.left = "0px";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.overflow = "hidden";
        //div.style.border = "dashed";
        //img.style.border = "double";
        div.style.zIndex = img.style.zIndex = -1;
        div.style.display = img.style.display = "block";
        div.style.position = img.style.position = "absolute";
        div.style.visibility = img.style.visibility = "inherit";

        img.alt = "";
        img.src = BgSzEmu.prototype.getPurePathFrom(prev_backgroundImage);

        if (elem.junkData)
        {
            elem.removeChild(elem.junkData.inner_div);
            elem.junkData = null;
        }

        var junkData = { orig_bgImg: prev_backgroundImage, orig_pos: prev_position, orig_zInd: prev_zIndex, inner_div: div, inner_img: img, inner_img_nat_size: img_natural_size };
        elem.junkData = junkData;

        div.appendChild(img);

        if (elem.firstChild)
            elem.insertBefore(div, elem.firstChild);
        else
            elem.appendChild(div);

        BgSzEmu.prototype.fixBgFor(elem);

        elem.onpropertychange = BgSzEmu.prototype.handlePropertyChange;
    };

    BgSzEmu.prototype.getImgNaturalSizeAndPassToCallback = function (elem, img_path, callback)
    {
        var pure_path = BgSzEmu.prototype.getPurePathFrom(img_path);

        var img = new Image();

        img.onload = function ()
        {
            var sz = { width: this.width, height: this.height };
            callback(elem, img_path, sz);
        };

        img.src = pure_path;
    };

    BgSzEmu.prototype.getAvailableAreaSizeIn = function (elem)
    {
        var sz = { width: elem.clientWidth || elem.offsetWidth, height: elem.clientHeight || elem.offsetHeight };
            
        return sz;
    };

    BgSzEmu.prototype.fixBgFor = function (elem)
    {
        var junkData = elem.junkData;
        var bg_sz = BgSzEmu.prototype.getCSSPropertyValue(elem, "background-size", "backgroundSize");

        if (junkData)
        {
            var available_size = BgSzEmu.prototype.getAvailableAreaSizeIn(elem);
            var div_width = available_size.width;
            var div_height = available_size.height;
            var divRatio = div_width / div_height;

            elem.junkData.lastSize = available_size;

            junkData.inner_div.style.width = div_width + "px";
            junkData.inner_div.style.height = div_height + "px";

            var img_nat_width = junkData.inner_img_nat_size.width;
            var img_nat_height = junkData.inner_img_nat_size.height;
            var img_curr_width = junkData.inner_img.width || junkData.inner_img.style.width;
            var img_curr_height = junkData.inner_img.height || junkData.inner_img.style.height;
            var imgRatio = (img_curr_width / img_curr_height) || (img_nat_width / img_nat_height);

            var new_img_top = "0px";
            var new_img_left = "0px";
            var new_img_width;
            var new_img_height;

            var elem_bg_pos = BgSzEmu.prototype.getElemBgPos(elem);

            if (bg_sz == "cover" || bg_sz == "contain")
            {
                if ((bg_sz == "cover" && divRatio > imgRatio) || (bg_sz == "contain" && imgRatio > divRatio))
                {
                    new_img_width = div_width;
                    new_img_height = new_img_width / imgRatio;

                    if (elem_bg_pos.v_pos.is_percents)
                        new_img_top = Math.floor((div_height - new_img_height) * elem_bg_pos.v_pos.value) + "px";
                }
                else
                {
                    new_img_height = div_height;
                    new_img_width = new_img_height * imgRatio;

                    if (elem_bg_pos.h_pos.is_percents)
                        new_img_left = Math.floor((div_width - new_img_width) * elem_bg_pos.h_pos.value) + "px";
                }

                elem.junkData.inner_img.width = new_img_width;
                elem.junkData.inner_img.height = new_img_height;

                elem.junkData.inner_img.style.left = elem_bg_pos.h_pos.is_percents ? new_img_left : elem_bg_pos.h_pos.value;
                elem.junkData.inner_img.style.top = elem_bg_pos.v_pos.is_percents ? new_img_top : elem_bg_pos.v_pos.value;
            }
            else
            {
                var splitted_size = bg_sz.split(" ");
                var t_width = splitted_size[0];
                var t_height = splitted_size[1];

                if (t_width.toLowerCase() == "auto" && t_height.toLowerCase() == "auto")
                {
                    t_width = img_nat_width;
                    t_height = img_nat_height;
                }
                else if (t_width.toLowerCase() == "auto")
                {
                    elem.junkData.inner_img.style.height = t_height;
                    var just_set_height = elem.junkData.inner_img.clientHeight || elem.junkData.inner_img.offsetHeight/* || elem.junkData.inner_img.scrollHeight*/;
                    var width_to_set = (img_nat_width * just_set_height) / img_nat_height;

                    if (!width_to_set || width_to_set < 1)
                        width_to_set = 1;

                    elem.junkData.inner_img.width = width_to_set;
                }
                else if (t_height.toLowerCase() == "auto")
                {
                    elem.junkData.inner_img.style.width = t_width;
                    var just_set_width = elem.junkData.inner_img.clientWidth || elem.junkData.inner_img.offsetWidth/* || elem.junkData.inner_img.scrollWidth*/;
                    var height_to_set = (just_set_width * img_nat_height) / img_nat_width;

                    if (!height_to_set || height_to_set < 1)
                        height_to_set = 1;

                    elem.junkData.inner_img.height = height_to_set;
                }
                else
                {
                    elem.junkData.inner_img.style.width = t_width;
                    elem.junkData.inner_img.style.height = t_height;
                }

                elem.junkData.inner_img.style.left = elem_bg_pos.h_pos.is_percents ? Math.floor((div_width - elem.junkData.inner_img.width) * elem_bg_pos.h_pos.value) + "px" : elem_bg_pos.h_pos.value;
                elem.junkData.inner_img.style.top = elem_bg_pos.v_pos.is_percents ? Math.floor((div_height - elem.junkData.inner_img.height) * elem_bg_pos.v_pos.value) + "px" : elem_bg_pos.v_pos.value;
            }
        }
        else if (bg_sz)
            BgSzEmu.prototype.replaceBgImgFor(elem);
    };

    BgSzEmu.prototype.parseBgPosVal = function (word)
    {
        var map = new Array();
        map["left"] = "0.0";
        map["center"] = "0.5";
        map["right"] = "1.0";
        map["top"] = "0.0";
        map["bottom"] = "1.0";

        if (word in map)
            return { value: map[word], is_percents: true };
        else if (BgSzEmu.prototype.endsWith(word, "%"))
            return { value: (word.substr(0, word.length - 1) / 100), is_percents: true };

        return { value: word, is_percents: false };
    };

    //common functions
    BgSzEmu.prototype.IsIE = function ()
    {
        return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
    };

    BgSzEmu.prototype.IsBadIE = function ()
    {
        return "attachEvent" in window && !("addEventListener" in window); //detects ie < 9 and ie9 in quirks mode
    };

    BgSzEmu.prototype.getElemsIn = function (start_elem, curr_elems)
    {
        var curr_elem = start_elem ? start_elem : document.body;

        for (var i = 0; i < curr_elem.children.length; i++)
        {
            curr_elems.push(curr_elem.children[i]);
            BgSzEmu.prototype.getElemsIn(curr_elem.children[i], curr_elems);
        }
    };

    BgSzEmu.prototype.getPurePathFrom = function (str_path)
    {
        var final_str = str_path;

        if (final_str.substring(0, ("url(").length) == "url(")
        {
            final_str = final_str.substr(4);

            if (final_str.lastIndexOf(")") == final_str.length - 1)
                final_str = final_str.substr(0, final_str.length - 1);
        }

        return final_str;
    };

    BgSzEmu.prototype.getElemBgPos = function (elem)
    {
        var splitted_pos = Array(
            BgSzEmu.prototype.getCSSPropertyValue(elem, "background-position-x", "backgroundPositionX"),
            BgSzEmu.prototype.getCSSPropertyValue(elem, "background-position-y", "backgroundPositionY")
		);

        var h_pos_ = (splitted_pos[0] ? BgSzEmu.prototype.parseBgPosVal(splitted_pos[0]) : { value: "0", is_percents: true });
        var v_pos_ = (splitted_pos[1] ? BgSzEmu.prototype.parseBgPosVal(splitted_pos[1]) : { value: "0", is_percents: true });

        return { h_pos: h_pos_, v_pos: v_pos_ };
    };

    BgSzEmu.prototype.stringContains = function (str, suffix)
    {
        if (!str)
            return false;

        return str.toString().indexOf(suffix) > -1;
    };

    BgSzEmu.prototype.startsWith = function (str, suffix)
    {
        if (!str)
            return false;

        return str.toString().substring(0, suffix.length) === suffix;
    };

    BgSzEmu.prototype.endsWith = function (str, suffix)
    {
        if (!str)
            return false;

        return str.toString().indexOf(suffix, str.length - suffix.length) >= 0;
    };

    BgSzEmu.prototype.isObjectInArray = function (obj, arr)
    {
        for (var i = 0; i < arr.length; i++)
            if (arr[i] == obj)
                return true;

        return false;
    };

    BgSzEmu.prototype.getCSSPropertyValue = function (elem, css_prop, runtime_prop)
    {
        /*var style_runtime = elem.style[runtime_prop];
        var currentStyle_runtime = elem.currentStyle[runtime_prop];
        var style_attribute = elem.style.getAttribute(css_prop);
        var currentStyle_attribute = elem.currentStyle.getAttribute(css_prop);*/
        return elem.style[runtime_prop] || elem.currentStyle[runtime_prop] || elem.style.getAttribute(css_prop) || elem.currentStyle.getAttribute(css_prop);
    };

    BgSzEmu.prototype.elemCanHaveDivAsChildren = function (elem)
    {
        if (elem.tagName.toLowerCase() == "tr") //hacky avoid of elemens that will become bugged after adding div
            return false;

        var div = document.createElement("div");
        div.style.display = "none";
        var check_result = true;

        try { elem.appendChild(div); }
        catch (exc) { check_result = false; }
        finally
        {
            if (BgSzEmu.prototype.isObjectInArray(div, elem.children))
                elem.removeChild(div);
        }

        return check_result;
    };
    //common functions end

    var bg_sz_emu = new BgSzEmu();
    bg_sz_emu.scanElems();
})();
