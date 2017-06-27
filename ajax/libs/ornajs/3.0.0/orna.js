//https://github.com/OrnaOrg/OrnaJS
//http://ornaorg.github.io
//version ornajs 3.0.0
//bower install OrnaJS
/*------------------createatom();----Main-function---------------------*/
$(document).ready(function() {
    createatom();
});
function createAtom(id){
    createatom(id);
}
function createatom(id) {
        if (id === undefined) {
            var tag = ['body', 'div', 'p', 'form', 'button', 'img', 'input', 'a', 'ul', 'ol', 'li', 'select', 'option', 'span', 'table', 'td', 'tr', 'th', 'tbody', 'thead', 'tfoot', 'main', 'nav', 'menu', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'textarea', 'fieldset', 'header', 'footer', 'code', 'pre', 'video', 'audio', 'aside', 'article', 'address', 'blockquote', 'label', 'strong', 'i', 'legend', 'caption', 'big', 'small', 'noscript', 'progress', 'section', 'hr', 'section', 'canvas', 'iframe', 'cite', 'abbr', 'acronym'];
            /*-----Scan-all-tags------------------------*/
            function toall(tag, tagsize) {
                for (var i = 0; i !== tagsize; i++) {
                    var istag = $(tag).is(tag);
                    if (istag === true) {
                        var current = tag + ":eq(" + i + ")";
                        stylefilter(current);
                    }
                }
            }
            for (var i = 0; i !== tag.length; i++) {
                var tagsize = $(tag[i]).size();
                toall(tag[i], tagsize);
            }
        } else {
            stylefilter(id);
        }
        /*-----Check-the-classes--------------------*/
        function stylefilter(current) {
                var attr = $(current).attr('class');
                var style;
                if (attr !== undefined) {
                    style = attr.split(' ');
                    for (var i = 0; i !== style.length; i++) {
                        var part = style[i].split('_');
                        var prop = part[0];
                        var val = part[1];
                        //---------------------------------------
                        function addpack(pack) {
                                $(current).css(pack);
                            }
                            //---------------------------------------
                        function addstyle(part, val) {
                            if (val !== undefined) {
                                /*----1--check------*/
                                if (part[2] === undefined) {
                                    $(current).css(part[0], part[1]);
                                }
                                /*----2--check------*/
                                else if (part[2] !== undefined && part[3] === undefined) {
                                    if (part[2] == 'mouseover' || part[2] == 'over' || part[2] == 'mouseenter') {
                                        $(current).on('mouseenter', function() {
                                            $(current).css(part[0], part[1]);
                                        });
                                    } else if (part[2] == 'mouseout' || part[2] == 'out'|| part[2] == 'mouseleave') {
                                        $(current).on('mouseleave', function() {
                                            $(current).css(part[0], part[1]);
                                        });
                                    }
                                     else if (part[2] == 'mousedown' || part[2] == 'down') {
                                        $(current).on('mousedown', function() {
                                            $(current).css(part[0], part[1]);
                                        });
                                    }
                                    else if (part[2] == 'mouseup' || part[2] == 'up') {
                                        $(current).on('mouseup', function() {
                                            $(current).css(part[0], part[1]);
                                        });
                                    }
                                    else if (part[2] == 'focus' || part[2] == 'focusin' ) {
                                        $(current).on('focusin', function() {
                                            $(current).css(part[0], part[1]);
                                        });
                                    } else if (part[2] == 'blur'  || part[2] == 'focusout') {
                                        $(current).on('focusout', function() {
                                            $(current).css(part[0], part[1]);
                                        });
                                    } else if (part[2] == 'click') {
                                        $(current).on('click', function() {
                                            $(current).css(part[0], part[1]);
                                        });
                                    }
                                   
                                    else {
                                        if (part[2].search(/this/) == -1) {
                                            if (part[2].search(/side/) !== -1) {
                                                $(part[2].replace(/side/, '')).css(part[0], part[1]);
                                            } else {
                                                $(current + ' ' + part[2]).css(part[0], part[1]);
                                            }
                                        } else {
                                            $(this).css(part[0], part[1]);
                                        }
                                    }
                                }
                                /*----3--check-----*/
                                else if (part[2] !== undefined && part[3] !== undefined) {
                                    if (part[2] == 'mouseover' || part[2] == 'over'|| part[2] == 'mouseenter') {
                                        $(current).on('mouseenter', function() {
                                            $(current + ' ' + part[3]).css(part[0], part[1]);
                                        });
                                    } else if (part[2] == 'mouseout' || part[2] == 'out'|| part[2] == 'mouseleave') {
                                        $(current).on('mouseleave', function() {
                                            $(current + ' ' + part[3]).css(part[0], part[1]);
                                        });
                                    } else if (part[2] == 'mousedown' || part[2] == 'down') {
                                        $(current).on('mousedown', function() {
                                            $(current + ' ' + part[3]).css(part[0], part[1]);
                                        });
                                    }
                                    else if (part[2] == 'mouseup' || part[2] == 'up') {
                                        $(current).on('mouseup', function() {
                                            $(current + ' ' + part[3]).css(part[0], part[1]);
                                        });
                                    }
                                    else if (part[2] == 'focus' || part[2] == 'focusin') {
                                        $(current).on('focusin', function() {
                                            $(current + ' ' + part[3]).css(part[0], part[1]);
                                        });
                                    } else if (part[2] == 'blur' || part[2] == 'focusout') {
                                        $(current).on('focusout', function() {
                                            $(current + ' ' + part[3]).css(part[0], part[1]);
                                        });
                                    } else if (part[2] == 'click') {
                                        $(current).on('click', function() {
                                            $(current + ' ' + part[3]).css(part[0], part[1]);
                                        });
                                    } else {
                                        /*----4--check-----*/
                                        if (part[3] == 'mouseover' || part[3] == 'over' || part[3] == 'mouseenter') {
                                            var what = current + ' ' + part[2].replace(/this/, '');
                                            if (part[2].search(/side/) !== -1) {
                                                what = current;
                                            }
                                            $(what).on('mouseenter', function() {
                                                if (part[2].search(/this/) == -1) {
                                                    if (part[2].search(/side/) !== -1) {
                                                        $(part[2].replace(/side/, '')).css(part[0], part[1]);
                                                    } else {
                                                        $(current + ' ' + part[2]).css(part[0], part[1]);
                                                    }
                                                } else {
                                                    $(this).css(part[0], part[1]);
                                                }
                                            });
                                        } else if (part[3] == 'mouseout' || part[3] == 'out'|| part[3] == 'mouseleave') {
                                            var what = current + ' ' + part[2].replace(/this/, '');
                                            if (part[2].search(/side/) !== -1) {
                                                what = current;
                                            }
                                            $(what).on('mouseleave', function() {
                                                if (part[2].search(/this/) == -1) {
                                                    if (part[2].search(/side/) !== -1) {
                                                        $(part[2].replace(/side/, '')).css(part[0], part[1]);
                                                    } else {
                                                        $(current + ' ' + part[2]).css(part[0], part[1]);
                                                    }
                                                } else {
                                                    $(this).css(part[0], part[1]);
                                                }
                                            });
                                        }
                                        else if (part[3] == 'mousedown' || part[3] == 'down') {
                                            var what = current + ' ' + part[2].replace(/this/, '');
                                            if (part[2].search(/side/) !== -1) {
                                                what = current;
                                            }
                                            $(what).on('mousedown', function() {
                                                if (part[2].search(/this/) == -1) {
                                                    if (part[2].search(/side/) !== -1) {
                                                        $(part[2].replace(/side/, '')).css(part[0], part[1]);
                                                    } else {
                                                        $(current + ' ' + part[2]).css(part[0], part[1]);
                                                    }
                                                } else {
                                                    $(this).css(part[0], part[1]);
                                                }
                                            });
                                        }  else if (part[3] == 'mouseup' || part[3] == 'up') {
                                            var what = current + ' ' + part[2].replace(/this/, '');
                                            if (part[2].search(/side/) !== -1) {
                                                what = current;
                                            }
                                            $(what).on('mouseup', function() {
                                                if (part[2].search(/this/) == -1) {
                                                    if (part[2].search(/side/) !== -1) {
                                                        $(part[2].replace(/side/, '')).css(part[0], part[1]);
                                                    } else {
                                                        $(current + ' ' + part[2]).css(part[0], part[1]);
                                                    }
                                                } else {
                                                    $(this).css(part[0], part[1]);
                                                }
                                            });
                                        } 
                                        
                                        else if (part[3] == 'focus' || part[3] == 'focusin') {
                                            var what = current + ' ' + part[2].replace(/this/, '');
                                            if (part[2].search(/side/) !== -1) {
                                                what = current;
                                            }
                                            $(what).on('focusin', function() {
                                                if (part[2].search(/this/) == -1) {
                                                    if (part[2].search(/side/) !== -1) {
                                                        $(part[2].replace(/side/, '')).css(part[0], part[1]);
                                                    } else {
                                                        $(current + ' ' + part[2]).css(part[0], part[1]);
                                                    }
                                                } else {
                                                    $(this).css(part[0], part[1]);
                                                }
                                            });
                                        } else if (part[3] == 'blur' || part[3] == 'focusout') {
                                            var what = current + ' ' + part[2].replace(/this/, '');
                                            if (part[2].search(/side/) !== -1) {
                                                what = current;
                                            }
                                            $(what).on('focusout', function() {
                                                if (part[2].search(/this/) == -1) {
                                                    if (part[2].search(/side/) !== -1) {
                                                        $(part[2].replace(/side/, '')).css(part[0], part[1]);
                                                    } else {
                                                        $(current + ' ' + part[2]).css(part[0], part[1]);
                                                    }
                                                } else {
                                                    $(this).css(part[0], part[1]);
                                                }
                                            });
                                        } else if (part[3] == 'click') {
                                            var what = current + ' ' + part[2].replace(/this/, '');
                                            if (part[2].search(/side/) !== -1) {
                                                what = current;
                                            }
                                            $(what).on('click', function() {
                                                if (part[2].search(/this/) == -1) {
                                                    if (part[2].search(/side/) !== -1) {
                                                        $(part[2].replace(/side/, '')).css(part[0], part[1]);
                                                    } else {
                                                        $(current + ' ' + part[2]).css(part[0], part[1]);
                                                    }
                                                } else {
                                                    $(this).css(part[0], part[1]);
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        if (part[0] == "hideatom") {
                            break;
                        } else if (part[0] == "ornahelp") {
                            var helpinfo = '<div id="ornahelp" class="arial bgc_rgb(230,230,230) c_black h_auto w_auto absolute top_0 left_0 right_0 overflow_hidden z-index_1000 p_10px b_2px_dashed_black"><h2  class="textincenter times">Orna - tool for Atomic CSS</h2> <p>Just write CSS like classes:<br><br> <code class=" fs_16px bgc_skyblue p_2px ">class="width_100px color_red color_green_click"</code><br><br> or<br><br> <code class=" fs_16px bgc_#ee0645 p_2px c_white ">class="w_100px c_red c_green_click"</code> </p><h3 class="bgc_white p_4px textincenter times">Structure</h3><p>property_value</p><p>property_value_event</p><p>property_value_childtagname</p><p>property_value_event_childtagname</p><p>property_value_childtagname_event</p><p><i>Also you can use childtagname or #id or .class</i></p><h3 class="bgc_white p_4px textincenter times">Events</h3><p>click</p><p>focus</p><p>blur</p><p>mouseover or just over</p><p>mouseout or just out</p><h3 class="bgc_white p_4px textincenter times">Special classes</h3><ol><li>Arial, arial - font</li><br><li>Times, TimesNewRoman - font</li><br><li>center - block elements in center by x axis</li><br><li>textincenter - text and inline elements in center by x axis</li><br><li>block - block element</li><br><li>inline - inline element</li><br><li>inlineblock - inline-block element</li><br><li>uppercase - text in uppercase</li><br><li>lowercase - text in lowercase</li><br><li>capitalize - first symbol in uppercase</li><br><li>hideatom - use for hide element from Orna, must be first in class attribute</li><br><li>flexcenter-, flexstart-, flexend-, flexcenter|, flexstart|, flexend| - use for flexbox</li><br><li>fixed - position: fixed</li><br><li>absolute - position: absolute</li><br><li>ornahelp - view the help info</li><br></ol><a href="http://ornaorg.github.io" class="d_block textincenter td_none c_#ee0645">ornaorg.github.io</a><div>';
                            $(current).append(helpinfo);
                            createatom('#ornahelp');
                        }
                        /*---------Abbreviated-name-&-Molecules-check-&-change--------*/
                        else if (part[0] == "rotate") {
                            if (val !== undefined) {
                                part[1] = part[0] + '(' + part[1] + ')';
                                part[0] = 'transform';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "scale") {
                            if (val !== undefined) {
                                part[1] = part[0] + '(' + part[1] + ')';
                                part[0] = 'transform';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "skew") {
                            if (val !== undefined) {
                                part[1] = part[0] + '(' + part[1] + ')';
                                part[0] = 'transform';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "box-shadow" && val !== "none" || part[0] == "shadow") {
                            if (val !== undefined) {
                                if (part[2] === undefined || part[3] === undefined) {
                                    alert("Hi! I'm Orna! Atomic class 'shadow' or 'box-shadow' need five values: shadow_0_0_20px_10px_black");
                                }
                                part[0] = "box-shadow";
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3] + ' ' + part[4] + ' ' + part[5];
                                if (part[6] !== undefined) {
                                    part[2] = part[6];
                                    if (part[7] !== undefined) {
                                        part[3] = part[7];
                                    } else {
                                        delete part[3];
                                    }
                                } else {
                                    delete part[2];
                                }
                                delete part[4];
                                delete part[5];
                                addstyle(part, val);
                            }
                        } else if (part[0] == "text-shadow" && val !== "none") {
                            if (val !== undefined) {
                                if (part[2] === undefined || part[3] === undefined) {
                                    alert("Hi! I'm Orna! Atomic class 'text-shadow' need four values: text-shadow_0_0_20px_black");
                                }
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3] + ' ' + part[4];
                                if (part[5] !== undefined) {
                                    part[2] = part[5];
                                    if (part[6] !== undefined) {
                                        part[3] = part[6];
                                    } else {
                                        delete part[3];
                                    }
                                } else {
                                    delete part[2];
                                }
                                delete part[3];
                                delete part[4];
                                addstyle(part, val);
                            }
                        } else if (part[0] == "border" && val !== "none" || part[0] == "b") {
                            if (val !== undefined) {
                                part[0] = 'border';
                                if (part[2] === undefined || part[3] === undefined) {
                                    alert("Hi! I'm Orna! Atomic class 'border' or 'b' need three values width, color and style");
                                }
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3];
                                if (part[4] !== undefined) {
                                    part[2] = part[4];
                                    if (part[5] !== undefined) {
                                        part[3] = part[5];
                                    } else {
                                        delete part[3];
                                    }
                                } else {
                                    delete part[2];
                                }
                                addstyle(part, val);
                            }
                        } else if (part[0] == "border-left" && val !== "none" || part[0] == "b-l") {
                            if (val !== undefined) {
                                part[0] = 'border-left';
                                if (part[2] === undefined || part[3] === undefined) {
                                    alert("Hi! I'm Orna! Atomic class 'border-left' or 'b-l' need three values width, color and style");
                                }
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3];
                                if (part[4] !== undefined) {
                                    part[2] = part[4];
                                    if (part[5] !== undefined) {
                                        part[3] = part[5];
                                    } else {
                                        delete part[3];
                                    }
                                } else {
                                    delete part[2];
                                }
                                addstyle(part, val);
                            }
                        } else if (part[0] == "border-right" && val !== "none" || part[0] == "b-r") {
                            if (val !== undefined) {
                                part[0] = 'border-right';
                                if (part[2] === undefined || part[3] === undefined) {
                                    alert("Hi! I'm Orna! Atomic class 'border-right' or 'b-r' need three values width, color and style");
                                }
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3];
                                if (part[4] !== undefined) {
                                    part[2] = part[4];
                                    if (part[5] !== undefined) {
                                        part[3] = part[5];
                                    } else {
                                        delete part[3];
                                    }
                                } else {
                                    delete part[2];
                                }
                                addstyle(part, val);
                            }
                        } else if (part[0] == "border-top" && val !== "none" || part[0] == "b-t") {
                            if (val !== undefined) {
                                part[0] = 'border-top';
                                if (part[2] === undefined || part[3] === undefined) {
                                    alert("Hi! I'm Orna! Atomic class 'border-top' or 'b-t' need three values width, color and style");
                                }
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3];
                                if (part[4] !== undefined) {
                                    part[2] = part[4];
                                    if (part[5] !== undefined) {
                                        part[3] = part[5];
                                    } else {
                                        delete part[3];
                                    }
                                } else {
                                    delete part[2];
                                }
                                addstyle(part, val);
                            }
                        } else if (part[0] == "border-bottom" && val !== "none" || part[0] == "b-b") {
                            if (val !== undefined) {
                                part[0] = 'border-bottom';
                                if (part[2] === undefined || part[3] === undefined) {
                                    alert("Hi! I'm Orna! Atomic class 'border-bottom' or 'b-b' need three values width, color and style");
                                }
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3];
                                if (part[4] !== undefined) {
                                    part[2] = part[4];
                                    if (part[5] !== undefined) {
                                        part[3] = part[5];
                                    } else {
                                        delete part[3];
                                    }
                                } else {
                                    delete part[2];
                                }
                                addstyle(part, val);
                            }
                        } else if (part[0] == "outline" && val !== "none") {
                            if (val !== undefined) {
                                if (part[2] === undefined || part[3] === undefined) {
                                    alert("Hello! I'm Orna! Atomic class 'outline' need three values: width, color, style");
                                }
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3];
                                delete part[2];
                                delete part[3];
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bg") {
                            if (val !== undefined) {
                                part[0] = 'background';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bgc") {
                            if (val !== undefined) {
                                part[0] = 'background-color';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bgp") {
                            if (val !== undefined) {
                                part[0] = 'background-position';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bgr") {
                            if (val !== undefined) {
                                part[0] = 'background-repeat';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bgi") {
                            if (val !== undefined) {
                                part[0] = 'background-image';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bgs") {
                            if (val !== undefined) {
                                part[0] = 'background-size';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bga") {
                            if (val !== undefined) {
                                part[0] = 'background-attachment';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "h") {
                            if (val !== undefined) {
                                part[0] = 'height';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "w") {
                            if (val !== undefined) {
                                part[0] = 'width';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "c") {
                            if (val !== undefined) {
                                part[0] = 'color';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "p") {
                            if (val !== undefined) {
                                part[0] = 'padding';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "pl") {
                            if (val !== undefined) {
                                part[0] = 'padding-left';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "pr") {
                            if (val !== undefined) {
                                part[0] = 'padding-right';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "pt") {
                            if (val !== undefined) {
                                part[0] = 'padding-top';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "pb") {
                            if (val !== undefined) {
                                part[0] = 'padding-bottom';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "m") {
                            if (val !== undefined) {
                                part[0] = 'margin';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "ml") {
                            if (val !== undefined) {
                                part[0] = 'margin-left';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "mr") {
                            if (val !== undefined) {
                                part[0] = 'margin-right';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "mt") {
                            if (val !== undefined) {
                                part[0] = 'margin-top';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "mb") {
                            if (val !== undefined) {
                                part[0] = 'margin-bottom';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "d") {
                            if (val !== undefined) {
                                part[0] = 'display';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "td") {
                            if (val !== undefined) {
                                part[0] = 'text-decoration';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "ff") {
                            if (val !== undefined) {
                                part[0] = 'font-family';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "fw") {
                            if (val !== undefined) {
                                part[0] = 'font-weight';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "fs") {
                            if (val !== undefined) {
                                part[0] = 'font-size';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "ta") {
                            if (val !== undefined) {
                                part[0] = 'text-align';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "br") {
                            if (val !== undefined) {
                                part[0] = 'border-radius';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "btlr") {
                            if (val !== undefined) {
                                part[0] = 'border-top-left-radius';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "btrr") {
                            if (val !== undefined) {
                                part[0] = 'border-top-right-radius';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bblr") {
                            if (val !== undefined) {
                                part[0] = 'border-bottom-left-radius';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "bbrr") {
                            if (val !== undefined) {
                                part[0] = 'border-bottom-right-radius';
                                addstyle(part, val);
                            }
                        } else if (part[0] == "transition" && val !== "none" || part[0] == "tran") {
                            if (part[2] === undefined || part[3] === undefined || part[4] === undefined) {
                                alert("Hello! Atomic class 'transition' or 'tran' need four values, like it: transition_all_1s_ease_0.5s");
                            }
                            if (val !== undefined) {
                                part[0] = 'transition';
                                part[1] = part[1] + ' ' + part[2] + ' ' + part[3] + ' ' + part[4];
                                if (part[5] !== undefined) {
                                    part[2] = part[5];
                                    if (part[6] !== undefined) {
                                        part[3] = part[6];
                                    } else {
                                        delete part[3];
                                    }
                                } else {
                                    delete part[2];
                                }
                                delete part[4];
                                addstyle(part, val);
                            }
                        } else {
                            addstyle(part, val);
                        }
                        /*--------------Add-pack---------------*/
                        if (part[0] == "clear" || part[0] == "clean") {
                            var pack = {
                                "top": 0,
                                "bottom": 0,
                                "left": 0,
                                right: 0
                            };
                            addpack(pack);
                        } else if (part[0] == "orna-btn") {
                            var pack = {
                                display: 'inline',
                                "overflow": 'hidden',
                                textAlign: 'center',
                                border: '1px solid',
                                color: 'white',
                                backgroundColor: '#ee0645',
                                padding: '10px',
                                cursor: 'pointer',
                                outline: 'none'
                            };
                            addpack(pack);
                        }
                        /*--------------Special-classes---------------*/
                        if (part[0] == "pointfollow") {
                            point_follow();
                            part[0] = 'position';
                            part[1] = 'absolute';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "screenX" || part[0] == "screen-X" || part[0] == "screenx" || part[0] == "screen-x") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'width';
                            part[1] = screen.width + 'px';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "screenY" || part[0] == "screen-Y" || part[0] == "screeny" || part[0] == "screen-y") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'height';
                            part[1] = screen.height + 'px';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "windowX" || part[0] == "window-X" || part[0] == "windowx" || part[0] == "window-x") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'width';
                            part[1] = window.innerWidth + 'px';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "windowY" || part[0] == "window-Y" || part[0] == "windowy" || part[0] == "window-y") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'height';
                            part[1] = window.innerHeight + 'px';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "Arial" || part[0] == "arial") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'font-family';
                            part[1] = 'Arial, sans-serif';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "Times" || part[0] == "times" || part[0] == "TimesNewRoman") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'font-family';
                            part[1] = '"Times New Roman", serif';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "center") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'margin';
                            part[1] = 'auto';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "absolute") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'position';
                            part[1] = 'absolute';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "fixed") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'position';
                            part[1] = 'fixed';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "relative") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'position';
                            part[1] = 'relative';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "textincenter") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'text-align';
                            part[1] = 'center';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "linear") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'transition';
                            part[1] = 'all 1s linear 0.2s';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "ease") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'transition';
                            part[1] = 'all 1s ease 0.2s';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "ease-in") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'transition';
                            part[1] = 'all 1s ease-in 0.2s';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "ease-out") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'transition';
                            part[1] = 'all 1s ease-out 0.2s';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "ease-in-out") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'transition';
                            part[1] = 'all 1s ease-in-out 0.2s';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "uppercase") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'text-transform';
                            part[1] = 'uppercase';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "lowercase") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'text-transform';
                            part[1] = 'lowercase';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "capitalize") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'text-transform';
                            part[1] = 'capitalize';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "inlineblock") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'inline-block';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "inline") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'inline';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "none") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'none';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "block") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'block';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "flexstart-") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'justify-content';
                            part[1] = 'flex-start';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "flexcenter-") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'justify-content';
                            part[1] = 'center';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "flexend-") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'justify-content';
                            part[1] = 'flex-end';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "spacebetween") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'justify-content';
                            part[1] = 'space-between';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "spacearound") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'justify-content';
                            part[1] = 'space-around';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "flexstart|") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'align-items';
                            part[1] = 'flex-start';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "flexcenter|") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'align-items';
                            part[1] = 'center';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "flexend|") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'align-items';
                            part[1] = 'flex-end';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "baseline") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'align-items';
                            part[1] = 'baseline';
                            val = part[1];
                            addstyle(part, val);
                        } else if (part[0] == "stretch") {
                            if (part[1] !== undefined) {
                                if (part[2] !== undefined) {
                                    part[3] = part[2];
                                    part[2] = part[1];
                                } else {
                                    part[2] = part[1];
                                }
                            }
                            part[0] = 'display';
                            part[1] = 'flex';
                            val = part[1];
                            addstyle(part, val);
                            part[0] = 'align-items';
                            part[1] = 'stretch';
                            val = part[1];
                            addstyle(part, val);
                        }
                    }
                }
            }
            //--Add-move-(to-live)-
        if ($('.orna-btn').length > 0) {
            $('.orna-btn').on('mouseover', function() {
                $(this).css('background-color', 'rgb(83, 2, 24)');
            });
            $('.orna-btn').on('mouseleave', function() {
                $(this).css('background-color', '#ee0645');
            });
        }
    }
    //-Value-update-on-window-resize-
$(window).resize(function() {
    createatom('.window-x');
    createatom('.window-y');
    createatom('.window-X');
    createatom('.window-Y');
});
//-Pointer-follower--
function point_follow() {
        $('.pointfollow').on('mousedown', function(event) {
            var thisel = this;
            $(document).on('mousemove', function(event) {
                $(thisel).css('left', event.pageX + 'px');
                $(thisel).css('top', event.pageY + 'px');
            });
            $(document).on('mouseup', function() {
                $(this).unbind('mousemove');
            });
        });
    }
    //------------------------------------------
function findmin(arr) {
    var min;
    min = arr[0];
    for (var i = 0; i !== arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
        }
    }
    return min;
}

function findmax(arr) {
    var min;
    min = arr[0];
    for (var i = 0; i !== arr.length; i++) {
        if (min < arr[i]) {
            min = arr[i];
        }
    }
    return min;
}

function checkit(elem, reg, color1, color2, length) {
    $(elem).on('change', function() {
        if ($(this).val().search(reg) != -1) {
            $(this).css('border-color', color1);
            $(this).val('');
            $(this).attr('placeholder', 'Only numbers!');
        } else if ($(this).val().length == 0) {
            $(this).css('border-color', color1);
            $(this).val('');
            $(this).attr('placeholder', 'Empty!');
        } else {
            if ($(this).val().length == length) {
                $(this).css('border-color', color2);
            }
        }
    });
}