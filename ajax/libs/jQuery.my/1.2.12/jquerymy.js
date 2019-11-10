/*
 * jQuery.my 1.2.12
 * Requires jQuery 2.0+, SugarJS 1.3.9-1.4.x
 * 
 * — fixed #45
 * — no more support of $.tagstrip which was never published
 *
 * More details at jquerymy.com
 * 
 * (c) @ermouth, thanks @carpogoryanin, @ftescht
 * 2017-11-04
 */

;(function ($) {
  
  var _version = "1.2.12";

  // Some shortcuts and constants
  var TMP, lang = "en",
      wURL = window.URL || window.webkitURL,
      ie8 = !document.addEventListener,
      
      Lang = ((window.navigator.language || window.navigator.userLanguage || 'en')+'').split('-')[0].toLowerCase(),
      
      d8 = "{yyyy}-{MM}-{dd}", 
      h24="{HH}:{mm}",
      Ob = "object", 
      Da = "data", 
      Ar = "array",
      St = "string", 
      Fu = "function", 
      Ch = "change",
      rthis = /^this\./,
  
      isA = Object.isArray,
      isB = Object.isBoolean,
      isS = Object.isString,
      isO = Object.isObject,
      isN = Object.isNumber,
      isR = Object.isRegExp,
      isF = Object.isFunction,
      isP = function (a) {
        // detects promise
        return null != a && typeof a == Ob && isF(a.then);
      },
  
      forms = _getref($,"my.f.repo")? $.my.f.repo():{_src:{}, _name:"Default manifest cache"},
      restyles = _getref($,"my.f.restyles")? $.my.f.restyles():{},
  
      Merge = Object.merge,
      Clone = Object.clone,
      Keys = Object.keys,
      $E = $.extend,
      $D = $.Deferred,
      T = $.type,
      
      N = null, 
      n = function (o) {return o!==null && o!==undefined;},
      
      // Configurables using $.my[fname](newHandler)
      // like $.my.ajax(newGlobalAjaxHandlerFunction)
      
      _ajax = $.ajax,
      _cache = _localCache,
      _now = Date.now,
      _require = _localRequire;
  
  //########################################################
  // Storage of rules defined by cascading selectors
  // very similar to css. Leafs are processors
  // or processing rules for this type of node
  
  var MY = {
  
    //getter and setter functions for different types of nodes
  
    vals: {
  
      ".my-form": function ($o, v) {
        //object is jQuery.my instance
        if ($o && $o.my ) {var d = $o.my(Da); return Object.equal(d,v)?d:$o.my(Da, v, true);}
        else return v||N;
      },
  
      ".hasDatepicker":function ($o,v) {
        //object has jQ UI datepicker
        if(n(v)) $o.datepicker("setDate", ((v=="")?v:Date.create(v)));
        var date = $o.datepicker("getDate");
        return (date?date.format(d8):"");
      },
  
      ".my-tags": function ($o,v) {
        //object is jQ tags control
        if (n(v)) {
          if (isS(v) || isN(v)) $o.tags(Da,[v+""]);
          else if (isA(v)) $o.tags(Da,v);
        }
        return $o.tags(Da);
      },
  
      ".ui-draggable": (function ($o,v) {
        //object is jQ UI draggable
        if (n(v) && isO(v)) {
          var c = {};
          if (!isNaN(v.left)) c.left = Number(v.left).ceil(2)+"px";
          if (!isNaN(v.top)) c.top = Number(v.top).ceil(2)+"px";
          if (c.left || c.top) $o.css(c);
        }
        var p = $o.position();
        return {
          left:((v&&!isNaN(v.left))?(v.left*1).ceil(2):p.left.ceil(2)),
          top:((v&&!isNaN(v.top))?(v.top*1).ceil(2):p.top.ceil(2))
        };
      }),
  
      ".my-form-list": (function ($o,list) {
        //object is list of forms
        var i,old,xold,mod,eq,ctr = 0,
            $n, $drag, 
            od = $o.data("formlist")||{},
            gen = od.generator||{},
            itemSel = gen.selector||">.my-form",
            merge = !!gen.merge,
            tmpl = gen.template||"<div></div>",
            tmplIsVar = /\{/.test(tmpl),
            hasher = gen.hash || _sdbm,
            ider = gen.id || _sdbm,
            extHasher = gen.ext,
            delay = gen.delay||50,
            sP = "ui-sortable", 
            sPlc= "."+sP+"-placeholder",
            sortable = $o.is("."+sP),
            sorting = !!$o.children(sPlc).length,
            result=[], 
            redraw = [],
            now = _now();
        var $c = sortable?$o.find($o.sortable("option","items")):$o.find(itemSel);
      
        if (n(list) && isA(list)) {
          //return list passed if dragging taking place
          if (sorting) return list;
          // first we must estimate
          // if putting new data over old
          // changes anything
          old= []; xold={};
          $c.each(function (i) {
            var $x = $(this), xd = $x.data("my"), dd;
            if (xd) {
              old.push(xd.data);
              if (!merge && (dd = $x.data("formlist"))) xold[dd.oid] = xd.data;
            }
          });
      
          //fast compare
          eq = _aeq(old, list, "==");
      
          if (!eq){
            // We possibly have new data, hash it
            var hash=[],  oid = [], xoid = {}, present={};
      
            redraw = [];
      
            // Build id <-> idx and hashes
            for (i=0;i<list.length;i++) {
              oid[i]=ider(list[i], i)+"";
              xoid[oid[i]]=i;
              hash[i] = (ider!==hasher? hasher(list[i], i):oid[i])+"";
            }
            //clean childs with no match to new data
            $c.each(function () {
              var $x = $(this),
                  md = $x.data("formlist")||{},
                  coid = md.oid;
              if (
                coid && _has(xoid, coid) 
                && (
                  merge ||
                  list[xoid[coid]] === xold[coid]
                )
              ) present[coid] = $(this);
              else {
                if ($x.hasClass("my-form")) $x.my("remove", true);
                else $x.remove();
              }
            });
      
            //iterate list
            for (i=0;i<list.length;i++) {
              if (present[oid[i]]) {
                $n = present[oid[i]].detach().appendTo($o);
                result.push($n.my("data"));
      
                // decide if we must redraw
                if (hash[i]!==($n.data("formlist")||{}).hash) {
                  if (merge && result.last() !== list[i]) {
                    // we must merge new data on existing form
                    gen.merge(result.last(), list[i]);
                  }
                  redraw.push($n);
                }
      
              } else {
                $n = $(tmplIsVar?tmpl.assign(list[i]):tmpl).appendTo($o);
                $n.data("formlist",{
                  list:list[i],
                  index:i,
                  hash:hash[i],
                  oid:oid[i]
                });
      
                // Init subform
                _run.call(
                  $n,
                  _manifest (gen.parent, gen.manifest, list[i], i, list, $o),
                  list[i]
                ).then(function($n){
                  $n.on("change.my", _itemChange.debounce(delay/1.3));
                }.fill($n));
                result.push($n.my("data"));
              }
            }
            // redraw if any
            if (redraw.length && extHasher){
              for (i=0;i<redraw.length;i++) _draw(redraw[i]);
              redraw = [];
            }
            old=xold=mod=null;
            return result;
          }
          xold=mod=null;
          return old;
      
        } else if ($c.length) {
          if ((now-gen.stamp>1.4*delay)
              || now-gen.stamp > 100
              || !gen.stashed
              || (gen.stashed.length !== $c.length-(sorting?1:0))
             ) {
      
            if (sorting) $drag = $o.find('>.'+sP+'-helper');
            var ri=0;
            $c.each(function (idx, elt) {
              var $x = $(elt), xd, xf, chash, dirty = false;
              if (!sorting || !$x.hasClass(sP+'-helper')) {
                if (sorting && $x.hasClass(sP + '-placeholder')) $x = $drag;
                xd = $x.data("my");
                xf = $x.data("formlist");
                if (xd && xf) {
                  result.push(xd.data);
                  if (ri != xf.index) {
                    xf.index = ri;
                    dirty = !0;
                  }
                  if (extHasher) {
                    chash = hasher(xd.data, ri)+"";
                    if (chash !== xf.hash) {
                      xf.hash = chash;
                      dirty = !0;
                    }
                  }
                  ri += 1;
                  if (dirty) redraw.push($x);
                }
              }
            });
            for (i=0;i<redraw.length;i++) _draw(redraw[i]);
            redraw=[];
      
            gen.stamp = now;
            gen.stashed = result;
          }
          else result = gen.stashed.slice(0);
          return result;
        }
        return list||[];
      
        function _itemChange () {
          var $this = $(this), df, i,
              dd=$this.data("my");
          if (dd) {
            df = $this.data("formlist");
            i = df.index;
            df.hash = hasher(dd.data, i)+"";
            if (ider!==hasher) df.oid = ider(dd.data, i)+"";
            else df.oid =df.hash;
          }
          $o.trigger("check.my");
        }
      
        function _draw($form) {
          if ($form.data("my").locktill+delay/1.3<now) $form.my("redraw");
        }
      }),
  
      "input[type=date]":function ($o,v) {
        //object is date input
        if(n(v)) {
          if (v!="") d = Date.create(v).format(d8); else d = "";
          if (isS(d) && !/Invalid/.test(d)) $o.val(d);
          return d;
        }
        var d = $o.val();
        return (d!=""?Date.create(d).format(d8):"");
      },
  
      "input[type=time]":function ($o,v) {
        //object is time input
        if(n(v)) {
          if (v!="") d = Date.create(v).format(h24); else d = "";
          if (isS(d) && !/Invalid/.test(d)) $o.val(d);
          return d;
        }
        var d = $o.val();
        return (d!=""?Date.create(d).format(h24):"");
      },
  
      "input": ({
        "[type='text'],[type='number'],[type='button'],[type='range'],[type='hidden'],:not([type])":{
          //nearly all main input types and button
      
          ".ui-slider-input": function ($o,v) {
            //input with jQ UI slider() applied
            if (n(v)) $o.val(v).slider("refresh");
          },
      
          "div.select2-container+input": function ($o, v) {
            //select2
            if (n(v) && JSON.stringify(v)!== JSON.stringify($o.select2("val")))
              $o.select2("val", (isA(v)?v:[v]));
            return $o.select2("val");
          },
      
          "": function ($o,v) {if(n(v)) $o.val(v+"");}
        },
        
        "[type='password'],[type='tel'],[type='email'],[type='search']": function ($o,v) {if(n(v)) $o.val(v+"");},
      
        ":radio":function ($o,v) {
          //radio buttons
          var pos = -1;
          if (n(v)) {
            $o.each(function (ind) {
              var val = $(this).val();
              if ((v+"")===(val+"")) pos=ind;
            });
            var jqcheck = $o.eq(0).checkboxradio;
            if (jqcheck) $o.each(function (ind){
              var $x = $(this);
              if (pos!=ind && $x.is(":checked"))
                $x.prop("checked",false).checkboxradio("refresh");
            });
            if (pos>-1) {
              var $x = $o.eq(pos);
              if (!$x.is(":checked")) {
                $x.prop("checked",true);
                if (jqcheck) $x.checkboxradio("refresh");
              }
            } else if (!jqcheck) $o.each(function () { $(this).prop("checked",false); });
          }
          if (pos==-1) for (var ind=0; ind<$o.length; ind++) {
            if ($o.eq(ind).is(":checked")) pos=ind;
          }
          return pos!=-1?$o.eq(pos).val():"";
        },
      
        ":checkbox": function ($o, v0) {
          //checkbox
          var pos = -1, v = v0, a = [];
          if (n(v)) {
            if (!isA(v)) v = [v0];
            var jqcheck = !!$o.eq(0).checkboxradio;
            $o.each(function (ind) {
              var $x = $(this), val = $x.val(), on = $x.is(":checked");
              if (v.indexOf(val)!=-1) {
                a.push(val);
                if (!on) $x.prop("checked", true);
              } else if (on) $x.prop("checked", false);
              if (jqcheck) $x.checkboxradio("refresh");
            });
          } else {
            $o.each(function () {
              var $x = $(this);
              if ($x.is(":checked")) a.push($x.val());
            });
          }
          return a;
        }
      }),
  
      "select": ({
        ".ui-slider-switch": function ($o,v) {
          //on-off in jQ Mobile
          if (n(v)) {
            $o.val(v+"");
            $o.slider("refresh");
          }
        },
        "div.select2-container+select":{
          "[multiple]": function ($o, v) {
            if (n(v)) $o.select2("val", (isA(v)?v:[v]));
            return $o.select2("val");
          },
          "":function ($o, v) {
            if (n(v)) $o.select2("val", v+"");
            return $o.select2("val");
          }
        },
        "[multiple]": function ($o,v) {
          if (n(v)) {
            $o.val(v,[]);
            if ($o.selectmenu && ($o.data("uiSelectmenu") || $o.data("selectmenu"))) $o.selectmenu("refresh",true);
            //the only way to check if we have jQ UI selectmenu() attached
          }
          return $o.val()||[];
        },
        "": function ($o,v) {
          if (n(v)) {
            $o.val(v+"");
            if ($o.selectmenu && ($o.data("uiSelectmenu") || $o.data("selectmenu"))) $o.selectmenu("refresh",true);
          }
        }
      }),
  
      "textarea": ({
        // textarea or rich editor over
        ".my-cleditor":function ($o,v) {
          if(n(v)) $o.val(v).cleditor()[0].updateFrame();
          return $o.val();
        },
        "div.redactor_box textarea,.redactor": function ($o,v) {
          var r9 = $o.hasClass('my-redactor-9');
          if(n(v)) {
            if(r9) $o.redactor('set', v);
            else $o.setCode(v, false);
            return v;
          }
          return r9 ? $o.redactor('get') : $o.getCode();
        },
        ".my-codemirror":function ($o,v){
          if (n(v)) {
            $o[0].nextSibling.CodeMirror.setValue(v);
            return v;
          }
          return $o[0].nextSibling.CodeMirror.getValue();
        },
        "":function ($o,v) {if(n(v)) $o.val(v+"");}
      }),
  
      "fieldset,form,section,footer,aside,.my-container": (function ($o, v) {
        //object is class-manageable container,
        //value is an array of css rules
        var clist = _slice($o[0], 0).sort(),
            list = v;
        if (n(v)) {
          if (isS(v)) list = v.split(/[,\s]+/).compact(true);
          if (isA(list)) {
            list.sort();
            if (list.join(" ")!==clist.join(" ")) {
              $o.atrr("css", list.join(" "));
              clist = list;
            }
          }
        }
        return clist;
      }),
  
      "div,span": ({
        ".ui-slider":function ($o, v){
          if(n(v)) $o.slider("option",$o.slider("option","values")?"values":"value", f.clone(v));
          return f.clone($o.slider("option","values")||$o.slider("option","value")||0);
        },
        ".ui-buttonset": function ($o,v) {
          //jQ UI buttonset ()
          if (!n(v)) {
            var jor = $o.find(":radio:checked");
            if (jor.length && jor.button) return jor.val()||jor.button("option", "label") ;
          } else if (v!="") {
            var jon = N;
            $o.find(":radio").each(function () {
              jon=( ($(this).val()||$(this).button("option", "label"))==v?$(this):jon );
            });
            if (jon) {
              jon.attr("checked",true);
              $o.buttonset("refresh");
              return v;
            }
          }
          $o.find(":radio:checked").attr("checked",false);
          $o.buttonset("refresh");
          return "";
        },
        ".ace_editor":function ($o,v) {
          if(n(v)) ace.edit($o[0]).setValue(v);
          return ace.edit($o[0]).getValue(v);
        },
        "": function ($o,v) {
          if(n(v)) $o.html(v);
          return $o.html();
        }
      }),
  
      "a,p,li,td,th,h1,h2,h3,h4,h5,h6,pre,code":function ($o,v) {
        if(n(v)) $o.html(v);
        return $o.html();
      },
      "img":function ($o,v) {
        if (n(v)) $o.attr("src",v);
        return $o.attr("src")||"";
      },
      "":function ($o,v) {
        if (n(v)) $o.html(v);
        return $o.html()||$o.text()||String($o.val())||"";
      }
    },
  
  
    //messages
    //########################################################
  
    msg:{
      "":{en:"Invalid input", ru:"Неверное значение"},
  
      formError:{en:"Form error",ru:"Ошибка формы"},
      initFailed:{
        en:'<p class="my-error">Form init failed</p>',
        ru:'<p class="my-error">Ошибка инициализации формы</p>'
      },
  
      badInput:{en:"Invalid input", ru:"Неверное значение"},
      patternMismatch:{en:"Pattern mismatch", ru:"Не соответствует шаблону"},
      rangeOverflow:{en:"Over maximum", ru:"Больше максимума"},
      rangeUnderflow:{en:"Under minimum", ru:"Меньше минимума"},
      stepMismatch:{en:"Step mismatch", ru:"Не кратно шагу"},
      tooLong:{en:"Too long", ru:"Слишком длинно"},
      typeMismatch:{en:"Invalid type", ru:"Неверный тип"},
      valueMissing:{en:"Required", ru:"Обязательное поле"}
    },
  
  
    // Different controls’ events to watch for
    // ########################################################
  
    events: {
      ".hasDatepicker":"change.my check.my",
      ".my-form,.my-tags":"change.my check.my",
      ".ui-slider":"slide.my check.my",
      "div.redactor_box textarea":"redactor.my check.my",
      ".my-codemirror":"codemirror.my check.my",
      ".ace_editor":"ace.my check.my",
      ".my-form-list":"sortupdate.my check.my",
      ".ui-sortable":"sortchange.my sortupdate.my check.my",
      ".ui-draggable":"drag.my dragstop.my check.my",
      "a, .pseudolink, input[type=button], button": "click.my",
      "img, :radio, :checkbox": "click.my check.my",
      "div.select2-container+input,div.select2-container+select":"change.my check.my input.my",
      ".ui-buttonset,input, select, textarea":
      "blur.my change.my check.my"+(navigator.appName.to(5)==="Micro"?" keyup.my":" input.my"),
      "":"check.my"
    },
  
    // Functions retrieving container for different controls
    // ########################################################
  
    containers: {
      "*[data-role='fieldcontain'] *":{ //jQuery Mobile
        "input,textarea,select,button,:radio": function ($o) {
          return $o.parents('[data-role="fieldcontain"]').eq(0);
        }
      },
      "div.redactor_box textarea":function ($o){
        return $o.parents('div.redactor_box').eq(0).parent();
      },
      ".my-tags,.hasDatepicker,.ui-widget,input,textarea,select,button" :{
        ".my-cleditor": function ($o) {
          return $o.parents('div.cleditorMain').eq(0).parent();
        },
        "": function ($o) {
          var p = $o[0].parentNode, t = p.nodeName;
          if (/^(div|span|a|p|form|fieldset|li|ul|td|th|h\d)$/i.test(t)) return $(p);
          else return $o.parents('div,span,a,p,form,fieldset,li,ul,td,th,h1,h2,h3,h4,h5,h6').eq(0);
        }
      },
      "": function ($o) {return $o;}
  
    },
  
    // Disablers and enablers
    // ########################################################
  
    offon: { //if x==true disables control else enables
      ".ace_editor": function (x,$o) {ace.edit($o[0]).setReadOnly(x);},
      ".ui-selectable": function (x,$o) {_jquix($o,"selectable",x);},
      ".ui-slider": function (x,$o) {_jquix($o,"slider",x);},
      ".ui-draggable": function (x,$o) {_jquix($o,"draggable",x);},
      ".ui-buttonset": function (x,$o) {_jquix($o,"buttonset",x);},
      ".hasDatepicker": function (x,$o) {_jquix($o,"datepicker",x);},
      ".my-form":function (x,$o){$o.my("disabled", !!x);},
      "div.select2-container+input,div.select2-container+select":
      function (x,$o) {_jquix($o,"select2",x);},
      ".my-cleditor": function (x,$o) { $o.cleditor()[0].disable(!!x);},
      "": function (x, $o) {$o.attr("disabled", !!x);}
    },
  
    // Destructors
    // ########################################################
    destroy:{
      ".hasDatepicker":function ($o){$o.datepicker("destroy");},
      ".ui-slider":function ($o){$o.slider("destroy");},
      ".ui-sortable":{
        ".my-form-list":function ($o){
          $o.find(">.my-form").each(function () {
            $(this).my("remove");
          });
          $o.removeClass("my-form-list");
          $o.sortable("destroy");
        },
        "":function ($o){$o.sortable("destroy");}
      },
      ".my-form-list":function ($o){
        $o.find(">.my-form").each(function () {
          $(this).my("remove");
        });
  
      },
      ".ui-draggable":function ($o){$o.draggable("destroy");},
      ".my-redactor-8":function ($o){
        $o.destroyEditor();
        $o.removeClass("my-redactor-8");
      },
      "div.select2-container+input,div.select2-container+select":
      function ($o){$o.select2('destroy');},
      ".my-form": function ($o) {$o.my("remove");},
      "textarea": {
        ".my-codemirror": function ($o) {
          $o[0].nextSibling.CodeMirror.toTextArea();
          $o.removeClass("my-codemirror");
        }
      }
    }
  };

  // Default values for .params section of manifest
  // ########################################################
  
  MY.params = {
    container:function ($o) {
      return _traverse($o, MY.containers)($o);
    },
    change:N,
    
    // depth of dependencies resolver tree
    recalcDepth: 2,
    
    // default delay of bind invocation
    delay: 0,
    
    // if true form assumed unjsonned
    strict:  false,
    
    // delay of <style> repaint on screen resize, -1 for no repaint
    restyle: -1,
    
    // default locale for manifests with .lang
    locale:  Lang,
    
    // Messages object
    messages:  Object.map(MY.msg, function (k,v){return v[Lang]||v.en;}),
    
    // selector of err tip containers
    errorTip:  ".my-error-tip",
    
    // class applied on container on err
    errorCss:  "my-error",
    
    // err tips animation duration
    animate: 0,
    
    // err tips animation effect
    effect:   function ($e, onoff, duration) {
      if (onoff) return $e.fadeIn(duration); $e.fadeOut(duration);
    },
    
    // undo steps to remember
    remember:  0,
    silent:    false,
    
    // form undo history object
    history:  {},
    
    // min gap in ms between subsequent calls of history(),
    historyDelay:100,
    
    // default loader
    loader: function (manifestId, parentId) {
      var pi = $D(), m = _cache(manifestId+"");
      if (m) pi.resolve(m);
      else pi.reject(null);
      return pi.promise();
    },
    ajaxTimeout:10000
  };

  var f = ({
  
    // Helper functions
  
    "con": _CON,
    "clone": function (o) {return o.clone?o.clone():o;},
    "indom":_indom,
    "jquix": _jquix,
    "overlap": _overlap,
    "patch": _patch,
    "kickoff": _kickoff,
    "sdbmCode":_sdbm,
    "tojson":(function () {
      function f(n){return n<10?'0'+n:n;}
      Date.prototype.toJSON=function () {
        var t=this;return t.getUTCFullYear()+'-'+f(t.getUTCMonth()+1)+'-'+f(t.getUTCDate())+
          'T'+f(t.getUTCHours())+':'+f(t.getUTCMinutes())+':'+f(t.getUTCSeconds())+'Z';
      };
      RegExp.prototype.toJSON = function () {return "new RegExp("+this.toString()+")";};
      var tabs= '\t'.repeat(10), 
          fj = JSON.stringify;
  
      return s4.fill(undefined,0,undefined);
  
      // - - - - - - - - - - - - - - - - - - - - - - -
  
      function s4 (w, ctab0, tab){
        var tl=0,a,i,k,v,ctab=ctab0||0,xt = tabs;
        if (tab && isS(tab)) {tl=String(tab).length;xt = String(tab).repeat(10);}
        switch((typeof w).substr(0,3)){
          case 'str': return fj(w).replace(/<\/scri/ig,'<\\u002fscri');
          case 'num':return isFinite(w)?''+String(w)+'':'null';
          case 'boo': case'nul':return String(w);
          case 'fun': return fj( 
            _cleanFn(w.toString())
            .replace(/<\/scri/ig,'<\\u002fscri')
          );
          case 'obj': 
            if(!w) return'null';
            if (typeof w.toJSON===Fu) return s4(w.toJSON(),ctab+(tab?1:0),tab);
            a=[];
            if (isA(w)){
              for (i=0; i<w.length; i+=1) a.push(s4(w[i], ctab + (tab?1:0), tab) || 'null');
              return'['+a.join(','+(tab?"\n"+xt.to(ctab*tl+tl):""))+']';
            }
            if (w + '' == '[object Object]') {
              for (k in w) {
                if (w.hasOwnProperty(k)) {
                  v = s4(w[k], ctab + (tab?1:0), tab);
                  if (v) a.push((tab?"\n" + xt.to(ctab*tl+tl):"")+s4(k, ctab + (tab?1:0), tab)+': '+v);
                }
              };
            }
            return '{'+a.join(',')+(tab?"\n"+xt.to(ctab*tl):"")+'}';
        }
      }
  
      // - - - - - - - - - - - - - - - - - - - - - - -
  
      function _cleanFn (s) {
        var splitter = /\)([\s\n\r\t]+?|\/{1,10}.*?\*\/|\/\/[^\n\r]{0,200}[\n\r]){0,20}?\{/,
            a = s.split(splitter,1),
            head = a[0].from(8).replace(/[\s\n\r\t]+?|\/{1,10}.*?\*\/|\/\/[^\n\r]{0,200}[\n\r]/g,'')+")",
            tail = "{"+s.from(a[0].length).replace(splitter,'').replace(/}[^}]+$/,'}');
        return ("function "+head).replace(/^function\sanonymous/,"function ") +" "+tail;
      }
  
    })(),
    "fromjson": function (s) {var obj = JSON.parse(s); _unjson(obj);return obj;},
    "mask": _mask,
    "unmask": _unmask,
    "getref":_getref,
    "repo": function(){return forms;},
    "restyles":function(){return restyles;},
    "unjson":function (obj) {
      _unjson(obj);
      return obj;
    },
    "blob2base64": function(blob, done, nosplit) {
      var reader = new FileReader();
      reader.onload = function() {done(nosplit?reader.result:reader.result.split(',')[1]);};
      reader.readAsDataURL(blob);
    },
    "base642blob": function(base64, done,  mime) {
      var binary = atob(base64),
          len = binary.length,
          buffer = new ArrayBuffer(len),
          view = new Uint8Array(buffer),
          blob;
      for (var i = 0; i < len; i++) view[i] = binary.charCodeAt(i);
      blob = new Blob([view], {type:mime||"application/octet-stream"});
      if (isF(done)) done(blob);
      else return blob;
    },
    "base64": function (s0, decode, prefix0) {
      // If s0 is not string it's stringified
      // If decode is true, decodes base64, else encodes
      // If prefix===true, utf-8 BOM is added,
      // If prefix is a string, it’s assumed mime,
      //     and added to encoded data
      var r=null, s= (isS(s0)?s0:$.my.tojson(s0)),
          prefix = isS(prefix0)?'data:'+prefix0+';base64,':"";
      if(decode) {
        try {r = decodeURIComponent(escape(window.atob(s)));}catch(e) {r=null;}
        if (null!==r && /(^".*"$)|(^\[.*\]$)|(^\{.*\}$)/.test(r)) {
          try {r = f.fromjson(r);}catch(e) {r=null;}
        }
        return r;
      }
      return prefix + window.btoa(
        (prefix0===true?"\xEF\xBB\xBF":"")
        +unescape(encodeURIComponent(s))
      );
    },
    "_s2css":_style,
    "css2json": function(css){
      var acc = "", res = (
        (css+"")
        .replace(/\/\*[\s\S]+\*\//gm,'')
        .replace(/@charset[^;]+;/gim,'')
        .replace(/[\n\t\s]+/g,' ')
        .replace(/\s*@media[^{]*\{/g,function(e){return e.to(-1).trim()+"ᴥ"})
        .replace(/\}/g,'}ᴥ')
        .replace(/^\n+/g,"").replace(/[\n\s]+$/g,"")
        .split('ᴥ')
        .compact(true)
        .reduce(function(a,b){
          var t = b.trim(), p, k, v;
          if ("}" == t) acc = "";
          else if (/^[^{]+\{[^\}]+\}$/.test(t)) {
            p = t.to(-1).split("{");
            k = " "+p[0].trim();
            v = p[1].trim();
            if (v.last()!=";") v+=";";
            if (!acc) a[k] = (a[k]||"")+v;
            else a[acc][k] = (a[acc][k]||"")+v;
          } 
          else if (/^@media/.test(t)) {
            a[t] = {};
            acc = t;
          }
          return a;
        },{})
      );
      return res;
    }
  });

  //######### JQUERY METHODS ##############

  var methods = {
    container: function ($o) {return _traverse($o, MY.containers)($o);},
    data: (function (data, noRecalc) {
      var $x = this;
      if (isO(data)) {
        $x.my().data = _overlap($x.my().data, data);
        this.my("redraw", noRecalc);
      }
      return $x.my().data;
    }),
    disabled: (function (bool) {
      var $d, i, dn,onOff,
          $x = this,
          d = $x.my();
      if (!d) return undefined;
      if (bool==N) return d.disabled;
      if (!!bool) {
        //disable all controls
        for (i in d.ui) {
          $d = _find($x, i);
          dn = $d.my();
          if (dn) dn.predisabled = dn.disabled;
          _css(true, $d, ":disabled");
        }
        $x.addClass("my-disabled");
      } else {
        for (i in d.ui) {
          $d = _find($x, i);
          dn = $d.my();
          onOff = false;
          if (dn && dn.predisabled) onOff=true;
          _css(onOff, $d, ":disabled");
        }
        $x.removeClass("my-disabled");
        $x.my("redraw");
      }
    }),
    errors: (function () {
      var e0 = $(this).my().errors, e = {};
      for (var i in e0) {
        if (e0[i] && isS(e0[i])) e[i]=e0[i];
        if (isO(e0[i]) && Keys(e0[i]).length) e[i]=e0[i];
      }
      return e;
    }),
    find: function _findUiNode(sel) {
      var $x = this, d = $x.my();
      if (d && d.root) $x=d.root;
      return $x.find(sel);
    },
    history: function (a,c) {return _history(a, this.my().params, c);},
    id: (function (id, obj) {
      if (isS(id)) return _cache(id, obj);
      else {
        var d = this.my();
        return (d && d.id)?d.id:N;
      }
    }),
    index: function () {
      var o = (this.my().root && !this.my().ddata)?this.my().root:this;
      return (o.data("formlist")||{}).index;
    },
    indom: function(){ return _indom(this); },
    
    init: _run,
    
    insert: (function (where, what) {
      var src = this.hasClass("my-form-list")?this:(this.my().root||this),
          o = src.hasClass("my-form-list")?src:src.parent(".my-form-list"),
          pos = (src.data("formlist")||{}).index,
          list,
          obj = what,
          gen = o.data("formlist").generator,
          idx;
      if (null==pos) pos=0;
      if (rthis.test(gen.bind)) list = _getref(o.my().manifest, gen.bind.replace(rthis,''));
      else list = _getref(o.my().data, gen.bind);
      if (!isO(obj)) {
        if (!isO(gen.manifest)) {
          if (o===src) throw "No data to insert, cannot guess when manifest is a function.";
          obj = Clone(src.my().manifest.data, true);
        }
        else obj = Clone(gen.manifest.data,true)||{};
      }
    
    
      if ("before"===where) idx=pos;
      else if("after"===where) idx=pos+1;
      else if (!isNaN(where)) {
        idx=(1*where).clamp(0, list.length);
      } else throw "Invalid position for insertion";
      list.add(obj, idx);
      o.trigger("redraw");
    }),
    manifest: function (format) {
      return format=="json"?f.tojson(this.my().manifest):this.my().manifest;
    },
    promise: function (fn) {if (isF(fn)) this.my().promise.then(fn); return this.my().promise;},
    radio: function _emitRadioMessage (channel, msg) {
      this.trigger("radio", isS(channel)?{channel:channel, message:msg}:channel); 
    },
    redraw: (function ( noRecalc, silent) {
      // Redraws the form
      var $x = this, 
          d = $x.my(),
          depth = 2;
      if (d && isO(d.ui)) {
        depth = d.params.recalcDepth;
        Object.keys(d.ui).forEach(function (key) {
          var $n = _find($x, key);
          _update($n, noRecalc?N:undefined , depth);
          if (!noRecalc) {
            if ($n.hasClass("my-form")) $n.my("redraw");
            if ($n.hasClass("my-form-list")) $n.trigger("redraw");
            else $n.trigger("check.my");
          }
        });
        if (!silent && noRecalc) $x.trigger(Ch);
      }
      return $x;
    }),
    remove: (function (fromDOM){
      var $o = this,
          $style,
          $locstyle, m,
          locFiles,
          d, ui, cid, mid;
    
      if (!this.my()) return N;
    
      //child elt requests form removal
      if (this.my().root && !this.my().ddata) $o = this.my().root;
    
      m =  $o.my();
      d =  m.data;
      cid = m.cid;
      mid = m.mid;
    
      // stop event listeners
      $o.unbind(".my");
    
      // exec done
      if (isO(m) && m.manifest && isF(m.manifest.die)) {
        try {
          m.manifest.die.call(m.manifest, $o, m.manifest);
        } catch(e){}
      }
    
      // remove stylesheets
      if ($style=m.style) {
        if ($style.data("count")=="1") {
          try{$style.remove();}catch(e){}
        }
        else $style.data("count", $style.data("count")-1);
      }
      if ($locstyle=m.localStyle) {
        try{
          delete restyles[cid];
          $locstyle.remove();
        }catch(e){}
      }
    
      // revoke data urls
      if (window.URL && (locFiles = m.locFiles) && locFiles.length) {
        for (var i=0;i< locFiles.length; i++) {
          try { URL.revokeObjectURL(locFiles[i]); } catch(e) {}
        }
      }
    
      // remove $.my from ui entries
      ui = (m||{}).ui;
      if (ui) {
        ui.each(function (key){
          var $we = _find($o, key), f, mw, i;
    
          // close dependent modal
          if (mw = $we.data("modal")) {
            mw.cancel();
            $we.removeData("modal");
          }
    
          //close child modals
          if (mw = $we.data("modals")) {
            for (i in mw) if (mw[i]) mw[i].cancel();
          }
    
          $we.unbind(".my");
          try{
            f = _traverse($we, MY.destroy);
            if (isF(f)) f($we);
          }catch(e){}
          $we.removeData("formlist")
          .removeData("myval")
          .removeData("my");
        });
      }
    
      if (fromDOM && $o.hasClass("my-form"))$o.remove();
      else if ($o.data("formlist") && $o.hasClass("my-form")) {
        var $p = $o.parents(".my-form-list").eq(0);
        $o.remove();
        $p.trigger("check");
      }
      else {
        $o.removeData("formlist")
        .removeData("myval")
        .removeData("my")
        .removeClass("my-form");
      }
    
      $o.removeClass("my-form-"+cid+" my-manifest-"+mid);
    
      //returns data collected by removed instance
      return d;
    }),
    reset: (function () {
      try {
        _kickoff(this.my().data, this.my().initial);
        this.my("redraw");
      } catch (e) {return false;}
      return true;
    }),
    restyle: (function (skipChilds) {
      // restyles dynamic styles of the form and its childs
      var cids = [], i, cid,
          $o = this.hasClass("my-form")?this:this.parents(".my-form").eq(0);
      if ($o.length && $o.is(":visible") ) {
        // get cids
        cid =  ($o.data("my")||{}).cid;
        if (cid) cids.push(cid);
        if (! skipChilds ) _find($o, ".my-restyle", true).each(function(){
          var $f = $(this),
              cid =  ($f.data("my")||{}).cid;
          if (cid) cids.push(cid);
        });
    
        for (i=0;i<cids.length;i++) {
          if (restyles[cids[i]]) {
            try {  restyles[cids[i]](); } catch (e) {}
          }
        }
    
        return !!cids.length;
    
      } else return false;
    }),
    ui: (function (u) {
      var $x = this, 
          d = $x.my(), 
          a=[], 
          i;
      if (!d) return N;
      
      var ui = $E(true, {}, d.ui);
      
      if (!isO(u)) return d.ui;
      
      for (i in u) a.push(i); //controls to (re)init
      d.ui = _normalize(_overlap(d.ui, u));
      for (i=0;i<a.length;i++) _build(_find($x, a[i], true), $x, d.ui[a[i]], a[i]);
      for (i in u) _find($x, i).trigger("check");
      return d.ui;
    }),
    undo: (function (steps){
      var $this = this,
          d = $this.my(),
          h = d.params.history,
          k = Keys(h).sort(),
          diff = 1*(parseInt(steps)||0),
          state;
      if (!k.length || diff<0) return N;
      if (!d.params.errors || !d.params.errors.values().compact(true).length) {
        if ( Object.equal(h[k.last()], d.data)) diff+=1;
      } else if (!Object.equal(d.data, d.lastCorrect)) diff+=1;
    
      state  = _history(diff, d.params, true);
    
      if (state) {
        _kickoff($this.my().data, state);
        $this.my("redraw");
      }
      return $this.my().data;
    }),
    val: function (v) {return _field(this, v);},
    valid: (function () {
      var e = $(this).my().errors, ctr=0;
      for (var i in e) {
        if (e[i] && isS(e[i])) ctr++;
        else if (isO(e[i]) && Keys(e[i]).length) ctr++;
      }
      return !ctr;
    }),
    version: function () {return _version;}
  },
  
  methodsKeys = Object.keys(methods);
  
  
  // Extend $.my obj
  if (!$.my) $.my={};
  
  $E($.my,{
    f: $.extend({}, f),
    tojson:f.tojson,
    fromjson:f.fromjson,
    radio: function(channel, msg){ 
      _broadcast($(document), isS(channel)?{channel:channel, message:msg}:channel); 
    },
    rules:MY,
    locale:function(lang){
      if (isS(lang)) {
        Lang = lang.toLowerCase();
        MY.params.locale = Lang;
      }
      else return Lang;
    },
    ajax: function(A1){
      if (isF(A1)) return _ajax = A1;
      else return _ajax.apply(this, _slice(arguments, 0));
    },
    cache:function (A1, A2) {
      if (isF(A1)) return _cache = A1;
      else return _cache(A1, A2);
    },
    now:function (A1) {
      if (isF(A1)) _now = A1;
      else return _now();
    },
    require:function (A1) {
      if (isF(A1)) return _require = A1;
      else return _require.apply(this, _slice(arguments, 0));
    },
    chain:(function(){
      var delay = 1, timeout = 1000,
          chain = [],
          state = false,
          put = function (def, d, t) {
            chain.push([def, d || delay, t || timeout]);
            next();
          };
      put.delay = function (d) {
        if (!isNaN(d)) delay = (d-0).clamp(0,1e6);
        return delay;
      };
      put.timeout = function (d) {
        if (!isNaN(d)) timeout = (d-0).clamp(1,1e6);
        return timeout;
      };
      put.start = function () { state = true; next(); };
      put.stop = function () { state = false; };
  
      return put;
  
      function next (){
        if (chain.length && state) {
          var f = chain.shift(),
              res,
              go = function () {  next.delay(f[1]);  }.once();
          try {  res = f[0](); }
          catch (e) {  go(); }
          if (isP(res)) {
            res.then(go, go);
            go.delay(f[1]);
          } else go();
        }
      }
    })(),
    version: function () {return _version;},
  });
  
  $.my.version.toString = function() {return _version;};
  

  // Mount everything on jQuery

  $.fn.my = function (method) {
    var form;
    if (method===undefined) return this.data("my");
    if (isS(method) && method.substr(0,1)=="{" ) {
      try{
        form = JSON.parse(method);
      }catch(e){}
      if (form) return methods.init.apply(this, [form].add(_slice(arguments, 1)));
    }
    if (isS(method) && methods[method])
      return methods[method].apply( this, _slice(arguments, 1));
    else if (isS(method) && _cache(method,"exist")) return methods.init.apply(this, arguments);
    else if (typeof method === Ob || !method ) return methods.init.apply(this, arguments);
    else $.error('Method ' + method + ' does not exist on jQuery.my');
  };
  
  // Set event monitors
  $(window).off(".my")
  .on("radio.my", function (evt, data){ 
    evt.stopPropagation(); 
    _broadcast($(document), data); 
  })
  .on("resize.my", function () {
    for (var i in restyles) try {
      restyles[i]();
    } catch (e) {}
  }.debounce(67));

  
  return;
  
  //########## INTERNAL FUNCTIONS ##########
  
  //=======================================
  // Service functions
  
  function _ERR () { if (window.console) console.error.apply (console, arguments); }
  
  function _CON () { if (window.console) console.log.apply (console, arguments); }
  
  function _has (obj, i) { return obj.hasOwnProperty(i); }
  
  function _indom ($o) {
    // returns true if 1st elt of the set is in DOM
    return $.contains(document.documentElement, $o[0]);
  }
  
  function _slice(args,l) {
    return Array.prototype.slice.call(args,l||0);
  }
  
  function _aeq (a,b, stop) {
    // Array fast compare
    var i=0, l=a.length, ok = true;
    if (a===b) return "===";
    if (stop=="===") return "";
    if (l != b.length) return "";
    for (;i<l && ok;i++) ok = a[i]===b[i];
    if (ok) return "==";
    if (stop == "==") return "";
    ok=true;
    for (;i<l && ok;i++) ok = Object.equal(a[i],b[i]);
    return ok?"=":"";
  }
  
  function _getref (obj, ref) {
    // Gets branch of obj by string ref like "data.list.items.1"
    // or array ref like ["data","list","items","1"]
    return (isS(ref) ?ref.split("."):isA(ref)?ref:[""])
    .reduce(function (a,b) {
      if (null != a) {
        if (/=/.test(b)) {
          var q = b.split("=",2);
          if (isO(a)) {
            return Object.values(a).find(function(elt){
              if (!isO(elt) && !isA(elt)) return false;
              return (elt[q[0]] == q[1]);
            });
          } else if (isA(a)) {
            return a.find(function(elt){
              if (!isO(elt) && !isA(elt)) return false;
              return (elt[q[0]] == q[1]);
            });
          } else return undefined;
        }
        else if (null != a && null != a[b]) {
          return a[b];
        }
      }
      return undefined;
    }, obj);
  }
  
  function _form ($formNode) {
    //get control's root.my()
    var $my = $formNode.my();
    if (!$my) return null;
    return $my.root?$my.root.my():$my;
  }
  
  function _functionize(a){
    var i, r = {}, row, f0 = function(){return null;};
    if (isS(a)) a.split(/[,\s]+/).compact(true).unique().map(function(e){r[e]=f0;});
    else if (isA(a)) a.compact(true).unique().map(function(e){r[e]=f0;});
    else if (isO(a)) {
      for (i in a) {
        if (!isF(a[i])) r[i] = function(){return a[i];};
        else r[i] = a[i];
      }
    }
    return r;
  }
  
  function _sa2obj (src){
    // Converts string or arrays of strings to object
    // like "x, y" or ["x","y"] both turn to {x:true, y:true}  
    var i, a = src, r={};
    if (isS(a)) a=a.split(/[,\s]+/);
    if (isA(a)) {
      a=a.compact(true);
      for (i=0;i<a.length;i++) r[a[i]] = true;
      return r;
    }
    else if (isO(a)) return src;
    else return null;
  }
  
  function _sdbm (s0){
    // Very fast hash used in Berkeley DB
    for (var s = JSON.stringify(s0), hash=0,i=0;i<s.length;i++)
      hash=s.charCodeAt(i)+(hash<<6)+(hash<<16)-hash;
    return (1e11+hash).toString(36);
  }
  
  function _patch (a,b) {
    // Applies b over a in deep, if a already has non-object node it stays untouched
    // if no, b properties are cloned.
    // patch ({y:{w:2,a:[1,2]}}, {x:1, y:{w:5,z:3,a:[3,4,5]}}) >>{x:1,y:{w:2,a:[1,2],z:3}}.
    // Returns mutated a.
    for (var i in b) {
      if (_has(b,i)) {
        if (isO(b[i])) {
          if (!_has(a, i))  a[i] = Clone(b[i],true);
          else _patch (a[i],b[i]);
        } else if (!_has(a, i)) {
          if (isA(b[i])) a[i]=b[i].clone(true);
          else a[i]=b[i];
        }
      }
    }
    return a;
  }
  
  function _overlap (a,b) {
    // Merges 2nd arg with 1st,
    // non-obj properties are replaced, obj – merged plain
    return !a?{}:!b?a:Merge(a, b, !1, _cmp);
  
    function _cmp (key, a, b) {
      return (b===undefined || b===null)? a:!isO(b)?b:Merge(a, b, !1, _cmp);
    }
  }
  
  function _kickoff (a,b) {
    //replaces a content with b content;
    Keys(a).forEach(function(i){ delete a[i]; });
    if (typeof b == "object") Merge(a, b, true);
    return a;
  }
  
  function _find ($parent, selector, forceAll) {
    // faster contextual replacement 
    // for $node.find(), returns jQuery obj
    if (/^[#\.][a-z0-9_\-]{1,31}$/i.test(selector)) return (
        forceAll
        ?  $($parent[0].querySelectorAll(selector))
        :  $($parent[0].querySelector(selector))
      );
    else return (
      ( forceAll || /:/.test(selector) ||/^[a-z]{1,31}[\[\.\#][a-z]/i.test(selector) )
      ? $parent.find(selector)
      : $parent.find(selector).eq(0)
    );
  }
  
  //=======================================
  // Manifest repo getter/setter and helpers
  
  function _localCache (A1, A2) {
    // ( no args ) – returns all forms obj container
    // ({manifest},  {container}) – caches form in container, id must be defined, return form or null
    // ({manifest}) – caches form in local container, id must be defined
    // ("form.Id", "exist") – true/false
    // ("form.Id", {container}) – get from container
    // ("form.Id") – get from local cache
    var ref, obj;
    if (isS(A1)) {
      ref=A1;
      obj = _getref(isO(A2)?A2:forms, ref);
      if ("exist" === A2) return isO(obj);
      return !obj?null:Clone(obj, true);
    } else if (isO(A1)){
      obj = _putmanifest (A1, A2);
      if (!isO(obj)) {
        return null;
      }
      return obj;
    } else if (undefined === A1) {
      return forms._src;
    } else if (null === A1) {
      return Object.reject(forms,/^_/);
    }else return null;
  };
  
  // - - - - - - - - - - - - - - - - - - - -
  
  function _manifest (manifest, ref) {
    // Dereferences pointer to form component,
    // manifest is caller manifest obj,
    // internal function
    var t, ext;
    if (isO(ref)) return ref;
    else if (isS(ref)) {
  
      //try to find it on manifest
      t = _getref(manifest, ref);
  
      //then in local repo as original
      if (null==t) t = Clone(forms._src[ref],true);
  
      //then in local repo as part of component
      if (null==t) {
        t = _getref(forms, ref);
        if (isO(t) && isO(t._self)) t = Clone(t._self, true);
        else if (isO(t)) t = Clone(t, true);
      }
  
      //then in ext repo as part of component
      if (null==t && _getref(manifest,"params.cache")) {
        ext = _getref(manifest,"params.cache");
        if (isF(ext)) t = ext(ref);
        else if (isO(ext)) t = _cache(ref, ext);
  
        if (isO(t)){
          if (isO(t._self)) t = Clone(t._self,true);
          Merge(t, {params:{cache:ext}}, true);
        }
      }
  
      if (null!=t && isO(t)) {
        ext = ext||_getref(manifest,"params.cache");
        if (ext) Merge(t, {params:{cache:ext}}, true);
        return t;
      }
      else throw "Component "+ref+" not found.";
  
    } else if (isF(ref)) {
      return ref.apply(manifest, _slice(arguments, 2));
    } else return null;
  }
  
  // - - - - - - - - - - - - - - - - - - - -
  
  function _putmanifest (obj0, root0) {
    // Mounts obj to root in a branch, defined in
    // obj.id property. If id =="x.y.z", root will be
    // deep extended with {x:{y:{z:obj}}}.
    // obj also is unjsonned and extended with _self ref,
    // which point to original version of obj.
  
    //Returns direct link to entire branch obj or string error.
  
    var i, j, keys, file, root=root0||forms, obj=obj0, path, id, prev, res;
  
    if (!(isO(root) && isO(obj) && isO(obj.ui) && isS(obj.id)))
      return "Can’t save manifest into cache, invalid arguments.";
  
    if (!_has(root,"_src")) root._src={};
  
    id = obj.id;
  
    try { obj = Clone(obj0, true); }
    catch (e) {
      return "Can’t save circular-referencing object into cache.";
    }
  
    //unwind string defs of functions
    try {
      if (!obj.params || (obj.params && !obj.params.strict)) _unjson(obj, true);
    }
    catch (e) {
      return "Invalid manifest, parse error.";
    }
  
    //blobify files
    i = _files2urls (obj);
    if (isS(i)) {
      _ERR(i);
      return i;
    }
  
    //mark manifest as unjsonned
    Merge(obj,{params:{strict:true}}, true);
    // save it
    root._src[id] = obj;
  
  
    if (prev = _mask(root, id)) {
      if (prev.params && prev.params.protect) return "Can’t save manifest into cache over protected one.";
      else {
        // Remove prev version
        if (prev._self) delete prev._self;
        $.extend(!0, root, _unmask("",id));
      }
    } 
  
    // Mount new version
    $.extend (!0, root, _unmask(obj, id));
  
    // Re-mount sub-manifests if any
    keys = Object
    .keys(root._src)
    .filter(function(e){
      return e.startsWith(id+'.');
    });
    keys.sort();
    keys.forEach(function(id){
      var prev;
      if (prev=_mask(root, id)) {
        // Remove subform if any
        if (prev._self) delete prev._self;
        $.extend (!0, root, _unmask("",id));
      }
      // Re-mount version from repo
      $.extend (!0, root, _unmask(root._src[id], id));
    });
  
    // Mount _self link to uncompiled manifest
    res = _getref(root,id);
  
    if (ie8) res["_self"] = root._src[id];
    else Object.defineProperty(res, "_self", {
      get: function () { return root._src[id]; },
      set: function () { throw "Can’t change manifest cache entry directly.";},
      enumerable : false,
      configurable : true
    });
  
    // End manifest 
  
    return res;
  }
  
  
  function _files2urls (obj) {
    // Unwinds base64 representations of attached binaries
    // into Blobs and objectURLs
    var i, flist = [], file;
    if (isO(obj.files) && Object.size(obj.files)) {
      //blobify files
      for (i in obj.files) {
        file = obj.files[i];
        if (isO(file)) {
          if (isS(file.data) && !file.url) {
            if (wURL) {
              try {
                f.base642blob(file.data,function(res){
                  file.blob = res;
                  file.url = wURL.createObjectURL(file.blob);
                },(file.content_type||file.mime));
                flist.push(i);
              } catch(e) {
                return "Invalid base64 data in files/"+i+".";
              }
            } else {
              //ie8-9 fallback
              file.url = 'data:'+(file.content_type||file.mime)+';base64,'+file.data;
              flist.push(i);
            }
          }
        }
        else return "Non-object member "+i+" in files section.";
      }
    }
    return flist;
  }
  
  //=======================================
  
  function _bind (data, val, uiNode, $formNode) {
    //sets or retrieves data using bind function
    var i, path=[], ptr, preptr, that,
        bind = uiNode.bind,
        bt = T(bind);
    if (bt == Fu) {
      return bind.call(_form($formNode).manifest, data, val, $formNode);
    }
    if (bt === St || bt === Ar) {
      if (bt === St && !/\./.test(bind)) {
        //index is flat
        if (val != N) data[bind] = val;
        else if (data[bind]===undefined) data[bind] = N;
        return data[bind];
      }
      //index is composite, we need to traverse tree
      //and create some branches if needed
      path = (bt === St)?bind.split("."):bind;
  
      if (path[0]==="this") {
        ptr = _form($formNode).manifest;
        path.shift();
      } else ptr = data;
      
      return _blow(ptr, val, path, true);
    }
    return N;
  }
  
  //=======================================
  
  function _build ($o, $root, uiNode, selector) {
    //initializes control
    var rd = $root.my(),
        p = (rd || {}).params,
        ui=uiNode,
        pi = null,
        tracker,
        v, ctr=0,
        subform,
        man = rd.manifest,
        delay,
        size = $o.length | 0;
  
    if (!rd) {
      _ERR ("Failed to find $root building "+selector+" selector.");
      return null;
    }
  
    delay = uiNode.delay;
  
    if (size) {
      //first exec init
      // init if we have one
      if (ui.init!=N) tracker = _prepare(man, ui.init, $o, rd);
  
      if (isP(tracker))  {
        //we ve got  async init
        ctr+=1;
        pi = $D();
        tracker.then(_subform, function (msg, obj){
          _fail("Init of "+selector+" failed: "+msg,obj);
        });
      } else _subform();
    } else _CON ("Not found "+selector+" selector.", $root);
  
    return pi;
  
  
    // - - - - - - - - - - - - - - - - - - - - - - -
  
    function _subform (){
      var child=null, childman = ui.manifest;
      // if we have manifest, retrieve it
      if (isF(childman) || (isO(childman) && isO(childman.ui))) subform = childman;
      else if (isS(childman)) {
        // static bind if manifest is string ref,
        // not dynamic to speed up long list renders
        subform=_manifest (man, childman.replace(rthis,''));
      }
  
      // ...and apply
      if (subform && isS(ui.bind)) {
        //decrypt bind link and check if we have one in .data
        var linked = _getref(rthis.test(ui.bind)?man:rd.data,ui.bind.replace(rthis,''));
        if (pi===null) pi = $D();
        if (isA(linked) || ui.list){
  
          // we have list
          $o.addClass("my-form-list");
  
          //generate system fields
          var ltmpl="", lsel =">*";
          if (/^<.+>$/.test(ui.list)) ltmpl=ui.list;
          else lsel = ui.list||lsel;
          if (!ltmpl) {
            var $t0 = lsel == ">*"?$($o[0].children):_find($o, lsel, true);
            ltmpl='<div></div>';
            if ($t0.length) {
              ltmpl = $(ltmpl).append($t0.eq(0).clone(true)).html();
              $t0.eq(0).remove();
            }
          }
  
          //mount data
          if (!$o.data("formlist")) $o.data("formlist",{});
          $o.data("formlist").generator={
            manifest:subform,
            delay:(ui.delay||p.delay||10)/1.3,
            template:ltmpl,
            selector:lsel,
            parent:man,
            bind:ui.bind,
            merge:isF(ui.merge)?ui.merge.bind(man):!!ui.merge?_overlap:false,
            hash:isF(ui.hash)?ui.hash.bind(man):
            isS(ui.hash)?_snapStr.fill(void 0, ui.hash):
            isA(ui.hash)?_snapArr.fill(void 0, ui.hash.slice(0)):
            null,
            id: isF(ui.id)?ui.id.bind(man):
            isS(ui.id)?_snapStr.fill(void 0, ui.id):
            isA(ui.id)?_snapArr.fill(void 0, ui.id.slice(0)):
            null,
            ext:!!(ui.id || ui.hash),
            stamp:0
          };
  
          //mount insert
          $o.on("insert.my", function (evt, obj){
            evt.stopPropagation();
            var p = {what:undefined, where:0};
            if (null==obj) p.where=1e6;
            else if (isO(obj)) Merge(p,obj);
            else if (isS(obj) || isN(obj)) p.where = obj;
            $(evt.target).my("insert",p.where, p.what);
          });
  
          //mount remove
          $o.on("remove.my", function (evt){
            evt.stopPropagation();
            $(evt.target).my("remove");
          });
  
        } else {
          try {
            child = _run.call(
              $o,
              _manifest (man, subform),
              isO(linked)?linked:undefined
            );
          }
          catch (e) {_fail("$.my subform init of " +selector+" failed: "+e.message, e.stack);}
        }
      }
      if (isP(child)) {
        //we've got promised subform init
        child.then(_startevents, function (msg, obj){
          _fail("Init of subform "+selector+" failed with error: "+msg,obj);
        });
      } else _startevents();
    }
  
  
    // - - - - - - - - - - - - - - - - - - - - - - -
  
    function _fail (msg, obj){
      _ERR (msg, obj);
      if (pi) pi.reject(msg, obj);
    }
  
    // - - - - - - - - - - - - - - - - - - - - - - -
  
  
    function _snapStr (objdata, st) {
      var h = _getref(objdata, st)||"";
      return (typeof h === "string")?h:_sdbm(h);
    }
  
    function _snapArr (objdata, arr) {
      return _sdbm(_mask(objdata, arr));
    }
  
    // - - - - - - - - - - - - - - - - - - - - - - -
  
    function _startevents () {
      //start applying monitors to controls
      //right before this moment all controls are irresponsive
      $o.each(function () {
        var $this = $(this),
            nodename = $this[0].nodeName,
            events,
            cm, isControl = false,
            ns;
  
        //codemirror fix
        if (nodename == "TEXTAREA") {
          ns = $this[0].nextSibling;
          cm = ( ns && ns.CodeMirror)?ns.CodeMirror:null;
          if (cm) $this.addClass("my-codemirror");
        }
  
        //get events
        events = ui.events||_traverse($this, MY.events);
  
        if (!$this.hasClass("my-form")) {
          $this.data("my",{
            events:events,
            selector:selector,
            initial:v,
            previous:v,
            root:$root,
            container:p.container($this),
            id:rd.id,
            ui:ui,
            data:rd.data,
            params:p,
            errors:rd.errors,
            single:size==1
          });
          uiNode._update = ui.delay?_update.debounce(ui.delay):N;
          isControl = true;
        } else {
          $E($this.data("my"),{
            dui:ui,
            root:$root,
            selector:selector,
            dparams:p,
            devents:events,
            ddata:rd.data,
            container:p.container($this),
            derrors:rd.errors,
            single:true
          });
  
        }
  
        // Fixes for different composite controls
        if (isControl) {
  
          //special cleditor fix
          //thanks ima007@stackoverflow.com for concept
          if ($this.cleditor && $this.parent().hasClass("cleditorMain")) {
            var cledit = $this.cleditor()[0];
            if (cledit && cledit.$frame && cledit.$frame[0]) {
              //mark as cleditor
              $this.addClass("my-cleditor");
              $E($this.data("my"), {container: p.container($this)});
              var cChange = function (v) {
                $this.val(v).trigger(Ch);
              };
              var cleditFrame, r = Number.random(1e5, 1e6 - 1);
              //aux event handlers for cleditor instance
              $(cledit.$frame[0]).attr("id", "cleditCool" + r);
              if (!document.frames)
                cleditFrame = $("#cleditCool" + r)[0].contentWindow.document;
              else cleditFrame = document.frames["cleditCool" + r].document;
              var $ibody = $(cleditFrame).find("body");
              $(cleditFrame).on('keyup.my', function () {
                cChange($(this).find("body").html());
              });
              $this.parent()
              .find("div.cleditorToolbar")
              .on("click.my mouseup.my", function () {
                cChange($ibody.html());
              });
              $("body").on("click", "div.cleditorPopup", function () {
                cChange($ibody.html());
              });
            }
          }
  
          //redactor fix
          else if (nodename == 'TEXTAREA' && $this.parent().hasClass("redactor_box")) {
            var editor, version = 'my-redactor-9';
            try {
              editor = $this.getEditor();
              version = 'my-redactor-8';
            } catch (e) {
              editor = $this.redactor('getEditor');
            }
            if (editor) {
              $this.addClass(version);
              editor.on("input.my keyup.my blur.my", (function ($o) {
                $o.trigger("redactor");
              }).fill($this));
            }
          }
  
          //ace fix
          else if ($this.hasClass("ace_editor"))
            ace.edit($o[0]).on(Ch, (function ($o) {
              $o.trigger("ace");
            }).fill($this));
  
          // codemirror fix
          else if (cm) {
            cm.on(Ch, (function ($o) {
              $o.trigger("codemirror");
            }).fill($this));
          }
        }
  
        //create debounced change handler
        $this.my()._changed = (_changed).debounce(delay);
        $this.my()._recalc =  (_recalc).debounce(delay);
  
        //bind events to the control
        $this.on(events, function (evt) {
          if (evt.type == Ch) evt.stopPropagation();
          if (isControl) rd.locktill = _now()+uiNode.delay;
          $this.my()._changed($this, $root, uiNode, p);
        });
  
        // if we have no check, attach its silent version
        if (!/check(\.my)?/.test(events+"")) $this.on("check.my", function(evt){
          $this.my()._changed($this, $root, uiNode, p, true);
          return false;
        });
  
        //bind events to the control
        if (!isControl) $this.off("redraw.my");
        $this.on("recalc.my, redraw.my", function (evt) {
          evt.stopPropagation();
          $this.my()._recalc($this, $root, uiNode, p);
        });
      });
  
      // we've done
      if (pi) pi.resolve();
    } // end countdown
  }
  
  //=======================================
  // Pub/sub broadcaster
  function _broadcast($root, msg) {
    var supress = false, fc, next;
    if (isO(msg) && msg.channel && msg.message) {
      _find($root, ".my-listen-"+_sdbm(msg.channel), true)
      .each(function(){  
        var $c = $(this), 
            my = $c.data("my"),
            fn, v=undefined;
        if (my && my.ui.listen && isF(my.ui.listen[msg.channel]) ) {
          fn = my.ui.listen[msg.channel];
          try{ 
            v = fn.call( my.manifest || my.root.my().manifest, my.data, msg.message, $c); 
          } catch(e) {
            _ERR("Listener failed", e.message, e.stack);
          }
          if (v!==undefined) {
            if (v===null) $c.trigger("check");
            else if (v) $c.trigger("recalc");
          }
        }  
      });
    }
  }
  
  //=======================================
  
  function _changed ($o, $root, uiNode, p, silent) {
    // called when control is changed
    var d = $o.data("my"),
        r = $root.data("my"),
        $we;
    if (d) {
      if (!d.disabled) {
        _history(d.ddata || d.data, d.dparams || d.params);
        if (!silent) $we = d.single?$o:_find($root, d.selector);
        _update(
          $o, 
          !silent?_field($we, N):N, 
          uiNode.recalcDepth || p.recalcDepth
        );
        if (p.change) p.change.call($o);
      }
      else if (!d.ddata) {
        // update disabled ctrl
        _update($o, N, uiNode.recalcDepth||p.recalcDepth);
      }
    }
  }
  
  //=======================================
  
  function _css (onOff, $we, css0) {
    //applies-discards conditional formatting or enables-disables field
    var css = css0.compact(),
        r = css.replace(/:disabled/g,''),
        disable = (r!==css),
        toSelf = (r.to(5)==="self:");
    if (toSelf) {
      r = r.replace(/^self:/g,'');
    }
    $we.each(function () {
      var $d = $(this),
          d = $d.my(),
          $o = ((!toSelf && d)?d.container:$d);
  
      $o.toggleClass(r, !!onOff);
  
      if (disable && d!==undefined && !!onOff != !!d.disabled) {
        //we have :disabled
        $d.my().disabled = !!onOff;
        if (!d._disable) $d.my()._disable = _traverse($we, MY.offon).fill(undefined, $we);
        d._disable(!!onOff);
      }
    });
    return $we;
  }
  
  function _jquix ($o, plugin, offon) {
    return $o[plugin](offon?"disable":"enable");
  }
  
  //=======================================
  
  function _field ($o, v) {
    //gets or sets the value of $o control
    //selects appropriate function for setting-retrieving
    //and attaches it to $o.data("myval");
    var fn = $o.data("myval"), r, fval;
    if (!fn) {
      // look for appropriate function and cache it
      fval = _traverse ($o, MY.vals);
      if (isF(fval)) {
        r = fval($o, N);
        if (r===undefined) {
          //if function returns undefined we use .val() by default
          $o.data("myval", (function ($o, v) {
            if (N != v) fval($o, v);
            return $o.val();
          }).fill($o, undefined));
        } else $o.data("myval", fval.fill($o, undefined));
      }
      fn = $o.data("myval");
    }
    if (isF(fn)) {
      r = fn();
      if ((r!==v && (false==v || false==r)) || r != v || isO(v)) r = fn(v);
      return r;
    } else return N;
  }
  
  //=======================================
  
  function _history (x, params, remove, silent) {
    // push or retrieves current state to history,
  
    var p = params, h, i, k, l, n, step, time, old, newh;
    if (
      !isO (p) ||
      isNaN (l=p.remember) ||
      !isO (h=p.history)
    ) return N;
  
    if (isO(x) && l) {
      step = Clone(x, true);
      time = _now();
      k = Keys(h).sort();
      if (k.length && (time-k.last() < p.historyDelay || Object.equal(h[k.last()], step))) return N;
      p.history[time] = step;
      k.push(time);
      if (k.length >= l*2) {
        newh = {};
        for (i=l; i<l*2; i++) newh[k[i]] = h[k[i]];
        params.history = newh;
      }
      if (!silent) p.form.trigger(Ch);
      return p.history[k.last()];
    }
    else if (!isNaN(x) || x===N) {
      n = parseInt(x) || 0;
      if (n<0) return N;
      k = Keys(h).sort();
      if (n>=k.length) n = k.length-1;
      old = Clone(p.history[k[k.length-n-1]], true);
      if (remove) {
        newh = {};
        for (i=0; i<k.length-n-1; i++) newh[k[i]] = h[k[i]];
        params.history = newh;
      }
      if (!silent) p.form.trigger(Ch);
      return old;
    }
    else if (!silent) p.form.trigger(Ch);
    return N;
  }
  
  //=======================================
  
  function _locale (man0, lang0) {
    
    // Processes .lang field of a manifest
    // according to lang or default locale.
    // Changes man.lang
    
    if (!isO(man0)) return false;
    
    var man = man0,
        lang = isS(lang0)?lang0:Lang,
        L = man.lang,
        keys = {};
    
    if (L && isO(L.en)) {
      
      if (L._LANG == lang) return true;
      lang = isO(L[lang])?lang:'en';
      L._LANG = lang;
      
      // Apply lang
      Object.keys(L[lang]).forEach(_copyLocale.fill(void 0, void 0, lang, keys));
      
      // Fill gaps with keys from en dict
      if (lang != 'en') Object.keys(L.en).forEach(_copyLocale.fill(void 0, void 0, 'en', keys));
      
      return true;
    }
    
    return false;
    
    // - - - - - - - - - 
    
    function _copyLocale (k, idx, l, m){
      var fx;
      if (keys[k]) return;
      if (k.length<3 && k.to(1).toLowerCase() == k.to(1)) return;
      if (!isF(L[l][k])) L[k] = L[l][k];
      else {
        fx = L[l][k].bind(man);
        L[k] = fx;
        L[k].toString = fx;
        L[k].assign = function(){
          var a = [], i = 0, r = '';
          for (;i<arguments.length;i++) a.push(arguments[i]);
          r = fx.apply(null, a);
          if (isS(r)) return r.assign.apply(r, a);
          return r;
        }
      }
      keys[k] = true;
    }
  }
  
  //=======================================
  
  function _mask (src, mask0) {
    // Returns src obj masked with mask,
    // _mask ({x:{t:5},y:3,z:[5,6]},["x","z.1"]) => [{t:5},6]
    if (!isO(src)) return null;
    var res, mask=mask0;
    if (isS(mask)) {
      return _getref(src, mask);
    } else if (isA(mask)) {
      res = [];
      for (var i=0;i<mask.length;i++) {
        res[i]=isS(mask[i])?_getref(src, mask[i])||null:null;
      }
      return res;
    } else if (isO(mask))
      return _merge(src, mask);
    //- - - -
    function _merge(src, mask) {
      if (!isO(mask)) return {};
      var dest = {};
      for (var i in mask) {
        if (!isO(mask[i]) && _has(src, i)) {
          dest[i] = Clone(src[i],true);
        }
        else if (_has(src, i)) {
          if (isO(src[i])) dest[i]=_merge(src[i],mask[i]);
          else dest[i] = Clone(src[i],true);
        }
      }
      return dest;
    }
  }
  
  function _unmask (A1,A2,A3) {
    // Unfolds masked into obj
    // _unmask ( {x:1, y:{}}, [{z:5},3], ["m.n","y.z"]) => {x:1, m:{n:{z:5}, y:{z:3}}},
    // _unmask ([1,2,3],["x","a.b","a.c"]) => {x:1, a:{b:2, c:3}}
    // modifies dest
    var dest, src, mask;
  
    if (null==A3) dest = {}, src = A1, mask = A2;
    else dest = A1, src = A2, mask = A3; 
  
    if (isO(src) && isO(mask)) return _mask(src,mask);
    if (isS(mask)) { mask = [mask]; src= [src]; }
    if (!isA(mask) || !(isA(dest) || isO(dest))) return null;
  
    if (isO(src)) src = mask.reduce(function(vals, path){
      vals.push(_getref(src,path));
      return vals;
    },[]);
  
    if (isA(src) && isA(mask)) {
      for (var i=0;i<mask.length;i++) {
        if (src[i]!=null) _blow(dest, src[i], mask[i]);
      }
      return dest;
    } 
    else return null;
  }
  
  function _blow (data, val, ref, retValAt) {
    // Adds val into ref node of data obj
    var ptr, path, preptr, i=0, l, ret;
    if (isS(ref) && !/\./.test(ref)) {
      //ref is flat
      if (null != val) data[ref] = val;
    } else {
      path = isA(ref)?ref:(ref+"").split(".");
      ptr = data;
      l = path.length-1;
      for (;i<=l;i++) {
        if (i===l) {
          if (retValAt) {
            if (N != val) ptr[path[i]] = val;
            else if (ptr[path[i]]===undefined) ptr[path[i]] = N;
            return ptr[path[i]];
          }
          ptr[path[i]] = val;
        }
        else {
          if (i===0) {
            ptr = data[path[0]];
            preptr = data;
          }
          else {
            preptr = preptr[path[i-1]];
            ptr = ptr[path[i]];
          }
          if (
            null == ptr 
            || !(isO(ptr) 
                 || !(
                   isA(ptr) 
                   && !isNaN(path[i+1]) 
                   && +path[i]>-1)
                )
          ) ptr = preptr[path[i]] = {};
        }
      }
    }
    return data;
  }
  
  //=======================================
  
  function _normalize (ui, manifest0, p) {
    // Unwinds ui recalcs, short defs and watch hooks, modifies source obj!
    // Moves shorthand binds to bind attr
    var manifest = isO(manifest0)?manifest0:null;
    Object.each(ui, function (i,v){
      var t = typeof v;
      if (/^str|^fu/.test(t)) ui[i] = {bind:v};
    });
    Object.each(ui, function (i,v){
      //correct ui definitions
      //with simplified syntax
  
      //unfold 'recalc'
      var list=[], watch=[], row , re=/\s?[,;]\s?/, rr, j;
      if (v.recalc) {
        if (isS(v.recalc)) list = v.recalc.split(re);
        else if (isA(v.recalc)) list = v.recalc;
        list = list.compact(true).unique();
      }
      if (list.length) ui[i].recalc=list;
  
      // make dummy bind if none
      if (null==v.bind) v.bind=function () {};
  
      // unfold 'listen'
      var listen;
      if (v.listen) {
        listen = _functionize(v.listen);
        if (Object.size(listen)) v.listen = listen;
        else v.listen = undefined;
      }
      
      // normalize events
      if (_has(v, 'events')) {
        v.events = (v.events+'').replace(/,\s*|\s+/g,' ');
      }
  
      // unfold 'watch' and extend appropriate 'recalc'
      if (_has(v, 'watch')) {
        if (isS(v.watch)) watch = v.watch.split(re);
        else if (isA(v.watch)) watch = v.watch.slice(0);
        watch = watch.compact(true).unique();
        for (j=0; j<watch.length; j++) if (row = ui[watch[j]]) {
          rr= row.recalc;
          if (!rr) row.recalc=[i];
          else if (isS(rr)) row.recalc+=','+i;
          else if (isA(rr) && rr.indexOf(i)==-1) row.recalc.push(i);
        }
      }
  
      // unfold child manifest if any
      if (null!==manifest) ["css","check","manifest","list","hash","id"].each(function (elt){
        if (v.hasOwnProperty(elt) && typeof v[elt] == 'string') {
          var ref = _getref (manifest, v[elt].replace(rthis,""));
          if (ref!=null && !isS(ref)) {
            v[elt]=ref;
          }
        }
      });
  
      v.delay = !isNaN(v.delay)? v.delay-0: p.delay;
    });
    return ui;
  }
  
  //=======================================
  
  function _prepare (that, init0, $o, d) {
    // prepares init, applies data if its string template,
    // dereferences it if it is pointer,
    // and calls function or formgen
    var init;
    if (isS(init0)) {
      init = _getref(that, init0);
      if (undefined === init) {
        $o.html(init0.assign(d.data));
        return null;
      }
    } else init = init0;
    if (isF(init)) return init.apply(that, _slice(arguments,2));
    else if (isA(init)) {
      try {$o.formgen(init);}
      catch(e){}
    }
    return null;
  }
  
  //=======================================
  
  function _recalc ($o,$root,uiNode,p) {
    // called when control must update
    var d = $o.my();
    if (d && !d.disabled) {
      var $we = _find($root, d.selector);
      if (($we).hasClass("my-form")) $we.my("redraw");
      else _update(
        $o,
        ($we.hasClass("my-form-list")?_getref($we.my().data,$we.data("formlist").generator.bind):N),
        uiNode.recalcDepth||p.recalcDepth
      );
    }
  }

  //=======================================
  // Require
  
  function _localRequire (man, params0){
    // Checks and loads required libs,
    // returns promise resolved with manifest
    // or rejected with err list.
    var i, j, k, pi = $D(),
        chunks = [], checks = {}, err=[], r, line,
        params = $E(true, {
          ajaxTimeout:10000,
          loader: MY.params.loader
        }, params0||{}),
        row, subrow, chunk,
        Row = {ref:null, ajax:{type:"GET", async:true, timeout: params.ajaxTimeout}};
  
    if (!isO(man)) pi.reject(["Invalid manifest."]);
    else if (!isA(man.require)) pi.resolve(man);
    else {
      r = man.require;
      for (i=0;i< r.length;i++) {
        line = r[i];
        if (isS(line)) checks[line] = _exist(line);
        else if (isO(line)) {
          chunk = [];
          for (j in line) {
            row=null;
            if (line[j]===true) {
              // global, we can’t load it, just check presence
              checks[j] = _exist(j);
            }
            else if (isS(line[j]) || isO(line[j])) {
              row = _row(line[j], j);
            } else if (isA(line[j])) {
              row = [];
              // array of requests
              for (k=0;k<line[j].length;k++) {
                if (isS(line[j][k]) || isO(line[j][k])) {
                  subrow = _row(line[j][k], j);
                  if (subrow) row.push(subrow);
                }
              }
              if (!row.length) row = null;
            }
            if (row && !(checks[j] = _exist(j))) chunk.add(row);
          }
          if (chunk.length) chunks.push(chunk);
        }
      }
  
      // we have chunks list and check list
      // iterate chunks
      var pos = -1;
      _next();
    }
  
    return pi.promise();
  
    //---------------------------------
  
    function _row (line, j) {
      var row;
      if (isS(line)) {
        // url?
        if (/[\/]/.test(line)) {
          row = $E(true,{}, Row, {ref:j, ajax:{url:line}});
          if (rthis.test(j)) row.ajax.dataType = "json";
        }
        // manifest ref?
        else if (line.length){
          row = $E(true,{}, Row,{ref:j, ajax: line});
        }
      }
      else if (isO(line)) {
        // full params set for ajax request
        row = $E(true,{}, Row, {ref:j, ajax:$.extend(
          true,
          {},
          Object.select( 
            line, 
            [
              "accepts","async","cache","data","dataType","xhrFields", 
              "password","timeout","type","url","username","headers"
            ]
          )
        )});
        if (!row.ajax.url) row = null;
      }
      return row;
    }
  
    //---------------------------------
  
    function _fail(){
      pi.reject(err);
    }
  
    //---------------------------------
  
    function _next(){
      pos +=1;
      var chunk = chunks[pos];
      if (!chunk) {
        // we are done, recheck
        var list = _present(checks),
            errs = Keys(Object.findAll(list, function(i, e) {return !e;}));
        if (errs.length) err.push(
          (errs.length===1?'Key '+errs[0]+' is':('Keys '+errs.join(", ")+' are'))
          +' not present after all.'
        );
        if (err.length) _fail();
        else pi.resolve(man);
      }
      else _chunk(chunk).then(_next).fail(_fail);
    }
  
    //---------------------------------
  
    function _chunk (chunk) {
      var row, i, stop = false,
          pi = $D(),
          ctr = chunk.length,
          loader;
      for (i=0;i<ctr;i++) {
        row = chunk[i];
        loader = isS(row.ajax)?params.loader:_ajax;
        loader(row.ajax)
        .then(function(data, row){
          if (rthis.test(row.ref)) {
            if (data != null) {
              $E(true, man, _unmask(data, row.ref.from(5)));
            } else{
              stop = true;
              err.push('Invalid data for ‘'+row.ref+'’ resource.');
            }
          }
          countdown();
        }.fill(undefined, row))
        .fail(function(e, row){
          err.push('Failed to load ‘'+row.ref+'’ resource.');
          stop = true;
          countdown();
        }.fill(undefined, row));
      }
  
      return pi.promise();
  
      function countdown (){
        ctr-=1;
        if (stop) pi.reject();
        else if (ctr<0.5) pi.resolve();
      }
    }
  
    //---------------------------------
  
    function _exist(ref){
      // check if ref exists in window or manifest
      var res = false;
      if (rthis.test(ref)) {
        if (_getref(man, ref.from(5)) != null) res=true;
      } else if (_getref(window, ref) != null) res=true;
      return res;
    }
  
    //---------------------------------
  
    function _present (list) {
      for (var i in list) if (list[i]===false) list[i] = _exist(i);
      return list;
    }
  
  }
  
  //=======================================
    
    function _run ( A0,A1,A2 ) {
      
      // Inits $.my form
      
      var data0, defaults,
          myid, cid, mid, manifest = {}, html,
          d = {}, ui, p, data, i, myf = null,
          locFiles = [],
          $listeners = {},
          style, manClass, formClass,
          $style, $locstyle,
          pi = $D(),
          _fail = false,
          tracker,
          ehandler = function () {},
          initCss = "my-form-init",
          mode = "std",
          backup = "",
          controls={};
    
      if (isS(A0)) {
        data0 = _cache(A0);
        if (data0) {
          if (isO(A2) && isO(A1)) {
            data0 = $E(data0,A1);
            defaults = A2;
          }
          else defaults = A1;
          mode = "repo";
        } else {
          pi.reject("No manifest with id "+A0+" found in repo.");
          return pi.promise();
        }
      } else {
        data0 = A0;
        defaults = A1;
      }
    
      if (!data0) return this;
    
      if (isO(defaults) && mode!="repo") data = $E(true, {}, data0);
      else data = data0;
    
      var $root = this.eq(0), rd = $root.my();
    
      if (isO(rd) && rd.id && rd.ui) {
        _CON ("jQuery.my is already bound.", $root);
        $root.my("ui", data.ui);
        $root.my(Da, data.data);
        return pi.resolve($root.my(Da)).promise();
      }
    
      // combine params
      p = data.params||{};
      if (!p.strict && !isF(data.init)) {
        p = $E(true, {}, p); _unjson(p);
      }
      p = $E(true, {}, MY.params, p);
    
      // fail finalizer
      pi.fail(function () {   $root.removeClass(formClass+" "+manClass); });
    
      //extend root with promise methods
      $E($root, pi.promise());
    
      //mount data
      if (isO(defaults)) {
        d = _patch(defaults, data.data||{});
        data.data=d;
      } else d = data.data || {};
    
      manifest.data = d;
    
    
      // early-bind data to $root
      $root.data("my", {
        data:d,
        params:p,
        promise:pi.promise(),
        locktill:0
      });
    
      $root.addClass(initCss);
    
      // Manage inherits
      if (data.inherit) _inherits(data);
    
      // Start
      if (isA(data.require)) {
        _require(data, p).then(_main)
        .fail(function(err){ 
          _makeup(); 
          _f("Linker of the ‘require’ property failed.", err);
        });
      }
      else _main();
    
      // Turn on radio & listeners
      pi.then(_initRadio);
    
      return $root;
      
      //-----------------------------------------------------
      
      function _main (){
        var ok = true;
        _makeup();
        if (manifest.files) ok = _files();
        if (ok) {
          _styler();
          _runInit();
        }
      }
    
      //-----------------------------------------------------
      
      function _inherits (m){
      // Mounts inherits, mutates source
        var i, r ={}, exp, noexp = true, 
            a = m.inherit, 
            man, $p, mp, obj;
        r = _sa2obj(a);
        if (!Object.size(r)) return null;
    
        //detect parent 
        $p = $root.parents(".my-form").eq(0);
        if (!$p.length) return null;
        // get parent man
        mp = $p.data("my");
        if (!mp || !mp.manifest) return null;
        man = mp.manifest;
        exp = man.expose;
        noexp = !exp;
        for (i in r) {
          if (noexp || exp[i]) {
            obj = _getref(man, i);
            if (obj!=null) {
              if (!/\./.test(i) && !isS(r[i])) m[i] = obj;
              else $E(true, data, _unmask(obj,isS(r[i])?r[i]:i));
            }
          }
        }
      }
    
      //-----------------------------------------------------
      
      function _initRadio (){
      // Starts radio relay and per-control listeners
        var i,j;
        for (i in $listeners) {
          for (j in ui[i].listen) {
            $listeners[i].addClass("my-listen-"+_sdbm(j));
          }
        }
        if (manifest.radio) {
          $root.on("radio.my", function(evt, msg){
            var supress = false, fc, next;
            if (isO(msg) && msg.channel && msg.message && isF(manifest.radio[msg.channel])) {
    
              fc = manifest.radio[msg.channel];
    
              try {next = fc.call(manifest,evt,msg);} 
              catch(e) {_ERR("Radio handler for form "+mid+" failed", e.message, e.stack);}
    
              if (next!==undefined) {
                evt.stopPropagation();
                if (next) _broadcast($root, msg);
              }
            }
          });
        }
      }
    
      //-----------------------------------------------------
      
      function _makeup (){
      // Prepares manifest and helpers
    
        // unwind stringified fn and regexps defs
        if (!p.strict && !isF(data.init)) _unjson(data, true);
        manifest = $E(true, manifest, Object.reject(data, ["data"]));
    
        // normalize ui section
        ui = _normalize($E(true, {}, data.ui || {}), manifest, p);
    
        // normalize radio section
        if (manifest.radio) manifest.radio = _functionize(manifest.radio);
    
        // normalize expose section
        if (manifest.expose) manifest.expose = _sa2obj(manifest.expose);
    
        // ids
        cid = Number.random(268435456,4294967295).toString(16);
        myid =  data.id || ("my"+cid);
        mid = _sdbm(myid);
        manifest.id = myid;
    
        p.form = $root;
    
        if (data.params && data.params.depth) p.recalcDepth=data.params.depth;
    
        // bind ‘this’ to 1st level manifest functions
        Object.keys(manifest)
        .forEach(function(i){
          if (typeof manifest[i] == 'function') manifest[i] = manifest[i].bind(manifest);
        });
    
        // 1.2.0, add .my property
        if (!ie8) {
          Object.defineProperty(manifest, "my", {
            get:function(){
              if (null == myf) myf = _thismy ($root);
              return myf;
            },
            enumerable:false
          });
        } else {
          manifest.my = _thismy ($root);
        }
    
        // mount error handler
        if (data.error) {
          if (isS(manifest.error)) {
            ehandler = function (msg,err) {
              return manifest.error.assign($E({
                message:msg+"",
                err:err+""
              }, manifest));
            };
          } else if (isF(data.error)) {
            ehandler = function (err, stack) {
              html=null;
              try {html = data.error.call(manifest, err, stack);}
              catch (e) {  html = p.messages.initFailed;}
              return html;
            };
          }
        }
        
        //1.2.6, mount lang
        if (manifest.lang) _locale(manifest, p.locale || Lang);
    
        // mount params to form DOM node
        $E($root.data("my"), {
          id: myid,
          cid: cid,
          mid: mid,
          errors:Object.extended(),
          ui:Object.extended(ui),
          disabled:false,
          manifest:manifest,
          locFiles:[],
          modals:{},
          radio:{}
        });
    
        // mount classes and styles if any
        $root.addClass("my-form");
    
        manClass = "my-manifest-"+mid;
        formClass = "my-form-"+cid;
    
        $root.addClass(formClass+" "+manClass);
      }
    
    
      //-----------------------------------------------------
    
      
      function _styler (onlyLocals) {
      // Generates ctx-dependent styles
        var h = "";
        if (manifest.style && (!onlyLocals || $root.is(":visible"))) {
          style = _style($root, manifest);
          if (style && style[0].length && !onlyLocals) {
            $style = $('style#' + manClass);
            if (!$style.length) $style = $(html(style[0], manClass)).appendTo($("body"));
            $style.data("count", $style.data("count") * 1 + 1);
            $root.data("my").style = $style;
          }
    
          if (style && style[1].length) {
            $locstyle = $('style#' + formClass);
            if (!$locstyle.length) {
              $locstyle = $(html(style[1], formClass)).appendTo($("body"));
              if (p.restyle>-1 && !restyles[cid]) {
                restyles[cid] = (function restyle (){ _styler(true); }).debounce(p.restyle);
              } 
              $root.data("my").restyle = _styler.fill(true).debounce(0);
            }
            else if (onlyLocals) {
              $(html(style[1], formClass)).replaceAll($locstyle);
              $locstyle = $('style#' + formClass);
            }
    
            $root.data("my").localStyle = $locstyle;
            if (!onlyLocals) $root.addClass("my-restyle");
          }
        }
    
        function html(styles, prefixCss) {
          var rn = '\n', 
              rekey = /@keyframes/,
              kf = false,
              s = rn+styles.map(function(e){
                if (/^\s*@/.test(e) || e=="}") {
                  if (rekey.test(e)) kf = true;
                  else if (e=='}') kf = false;
                  return e;
                }
                return ((!kf?"."+prefixCss:'')+e).replace(/\s+/g,' ');
              }).join(rn)+rn;
          
          return ('<'+'style id="' + prefixCss + '" data-count="0">' + s +'</'+'style>');
        }
      }
    
      //-----------------------------------------------------
    
      function _files () {
      // Prepare files section
        var i, res = true, flist;
    
        flist = _files2urls (manifest);
        if (isS(flist)) {
          _f("Error decoding base64 to local Blob/URL", flist);
          res = false;
        }
        else {
          if (wURL) for(i=0;i<flist.length;i++) locFiles.push(manifest.files[flist[i]].url);
          if (locFiles.length) $root.data("my").locFiles = locFiles;
        }
        return res;
      }
    
      //-----------------------------------------------------
    
      function _runInit(){
      // Form starter
        // Run .init
        if (data.init!=N) {
          backup = $root.find(">*").clone();
          try {
            tracker = _prepare(manifest, data.init, $root, data);
          } catch (e) {
            _f(isS(e)?e:e.message, e.stack);
            return $root;
          }
        }
        // init returned promise?
        if (isP(tracker)) {
          tracker.then(function () {_controls();}, function (err,obj){_f(err, obj);});
        } else _controls();
    
        if (!_fail) {
          if (!$root.my()) return _f("Internal error initializing controls.",""), $root;
    
          //save initial data for $.my("reset")
          $root.data("my").initial = $E(true,{},d);
    
          //init $.mobile if any
          if ($.mobile) $.mobile.changePage($.mobile.activePage);
        }
      }
    
      //-----------------------------------------------------
    
      function _controls (){
      // Build and init controls
        var formState={}, 
            k = Object.keys(ui), 
            ctr = k.length;
    
        if (ctr === 0) _end();
        else {
          $root.addClass(initCss);
          // build controls (init and premount)
          k.forEach(function (selector) {
            if (_fail) return;
            var $o = _find($root, selector ),
                built = _build($o, $root, ui[selector], selector);
            controls[selector] = $o;
            if (isP(built)) {
              //we've got promise
              built.then(
                countdown.fill(selector)
              ).fail(function (msg, obj){
                _f("Error building "+selector+", "+msg, obj);
              });
            }
            else if (!_fail) countdown(selector);
          });
        }
    
        function countdown(selector){
          if (!_fail) {
            formState[selector] = _field(_find($root, selector), N);
            ctr-=1; if (ctr<.5) _values(formState);
          }
        }
    
      }
    
      //-----------------------------------------------------
    
      function _values (formState) {
      // Apply values to controls
        var uiNode, v, $o, size, selector;
        for (selector in ui) {
          if (_fail) return;
          uiNode = ui[selector];
          $o = controls[selector];
          if (size = $o.length) {
            if (uiNode.listen) $listeners[selector] = $o.eq(0);
            try {
              v = _bind(d, N, uiNode, $o);
              if (v==N && formState[selector]!=N && v!==undefined)
                _bind(d, formState[selector], uiNode, $o);
            }
            catch (e) {
              _ERR ("Transient fail linking " +selector
                    +" of form $('.my-form-"+cid+"')",
                    e.message, e.stack
                   );
            }
            try {
              if (v!=N) _field($o,v);
              $o.eq(0).trigger("check.my");
            } catch (e) {
              _f("Error linking "+selector, e.message, e.stack);
            }
          }
        }
        _end();
      }
      
      //-----------------------------------------------------
      
      function _end (){
        $root.removeClass(initCss);
        $root.on("recalc.my, redraw.my", function (evt) {
          evt.stopPropagation();
          $root.my("redraw");
        });
        backup = null;
        pi.resolve(d);
      }
      
    
      //-----------------------------------------------------
    
      function _f (msg, obj) {
      // Fail handler
        var html;
        _fail=true;
        _ERR("Form "+myid+" failed to initialize.", msg, obj);
        Object.keys(controls).forEach(function(i){delete controls[i]});
        $root.removeClass(initCss);
        html = ehandler(msg, obj);
        if (isS(html) || (isO(html) && html.jquery)) $root.html(html);
        else if (html===true) $root.html(backup);
        if (!p.silent) {
          if(!$root.my().ddata) {
            $root.removeData("my");
            $root.removeClass("my-form");
            if ($style) {
              if ($style.data("count")=="1") {
                try{$style.remove();}catch(e){}
              }
              else $style.data("count", $style.data("count")-1);
            }
            if ($locstyle) {
              try{
                delete restyles[cid];
                $locstyle.remove();
              }catch(e){}
            }
          }
          pi.reject("Form "+myid+" failed to initialize: "+msg, obj);
        } else pi.resolve(d);
      }
    }
  
  //=======================================
  
  function _style ($o, manifest) {
    // converts .style section of manifest
    // into two css rule lists for the form
    var  aglob=[], aloc=[], man=manifest;
    if (!isO(man) || !isO(man.style)) return "";
  
    crawl(manifest.style, "", aglob, aloc);
    return [aglob, aloc];
  
  
    function crawl (branch0, key0, aglob, aloc){
      var i, j, k, b, a, 
          branch = branch0,
          isMedia = /@/.test(key0),
          key = key0.split("@")[0],
          isFn = isF(branch);
      
      if (isMedia) (isFn?aloc:aglob).push ("@"+key0.split("@")[1].trim()+" {");
  
      if (isS(branch)) {
        if (/[\r\n]/.test(branch) || branch.split("}", 3).length>2) branch = f.css2json(branch);
        else aglob.push(key+(/\{/.test(branch)?branch:'{'+branch+'}'));
      }
      if (isA(branch) && branch.length) {
        for (i=0; i<branch.length; i++) crawl(branch[i], key, aglob, aloc);
      }
      else if (isO(branch)) {
        k = Keys(branch);
        for (i=0; i<k.length; i++) {
          a = unfold(key, k[i]);
          for (j=0; j<a.length; j++) crawl(branch[k[i]], a[j], aglob, aloc);
        }
      }
      else if (isF(branch)) {
        try {
          b = branch.call(manifest, $o, manifest);
          crawl (b, key, aloc, aloc);
        } catch (e) {}
      }
      if (isMedia) (isFn?aloc:aglob).push ("}");
    }
  
    function unfold (key, selector) {
      var pre = "", ext = selector+"", a;
      if (" " === ext.to(1) || /^[a-z]/i.test(ext)) pre = " ";
      a = ext.split(/\s*,\s{0,}/).compact(true);
      if (!a.length) a.push("");
      return a.map(function (e) {return key+pre+e;});
    }
  }
  
  //=======================================
  
  function _thismy ($root) {
    // returns this.my obj for a given root
    function _t(s, evt, obj) {
      var $m = !s ?$root:isS(s)?_find($root, s):$(s);
      if (_indom($m)) return $m.trigger(evt, obj);
    }
    var myf = {
      ajax: function (){
        return _ajax.apply(this, _slice(arguments));
      },
      cancel:   _t.fill(void 0, "cancel"),
      check:     _t.fill(void 0, "check"),
      commit:    _t.fill(void 0, "commit"),
      insert: function(A0, A1, A2){
        var x = "insert", ok=true;
        if (isO(A2)) _t(A0, x, {where:A1, what:A2});
        else if (isS(A0)){
          if (null==A1 && null==A2) _t(A1, x);
          else if (isO(A1)) _t(A0, x, {where:1e6,what:A1});
          else ok = false;
        }
        else if (isO(A0)) {
          if (A0.where && A0.what) _t(null, x, A0);
          else _t(null, x, {where:1e6,what:A0});
        }
          if (!ok) throw "Invalid insert";
      },
      modal:function (A0, A1) {
        var $p, obj;
        if (isS(A0)) {
          $p = _find($root, A0);
          obj = A1;
          if (!obj.root) obj.root = $root;
        } else {
          $p = $root;
          obj = A0;
        };
        return $p.modal(obj);
      },
      now: _now,
      parent:   function(s){
        var $p = $root.parents(".my-form");
        if (!$p.length) return null;
        return $p.eq(0).my("manifest");
      },
      recalc:    _t.fill(void 0, "recalc"),
      root:      function(){return $root;},
      trigger:   _t,
      val: function (s) {
        return methods.val.apply(_find($root,s), _slice(arguments, 1));
      }
    };
    
    methodsKeys.forEach(function(i){
      if (i!="init" && !myf[i]) myf[i] = methods[i].bind($root);
    });
    
    return myf;
  
  }
  
  //=======================================
  
  function _traverse ($o, rules) {
    //traverses tree of rules to find
    //first sprig with selector matching $o.
    //returns match or null
    var fval = N, flevel=0, fselector="";
    go ($o,rules,1);
    return fval;
  
    // - - - - - - - - - - - - - - - - - - - - - - -
  
    function go ($o, os, level) {
      for (var i in os) if (i!="" && $o.is(i)) {
        fselector = fselector+ (fselector?" ### ":"") + i;
        var oi=os[i], otype = T(oi);
        if ( !(/^(nul|un|ob)/).test(otype) && level>flevel) {
          fval=oi; flevel = level; return;
        } else if (otype==Ob) go ($o, oi, level+1); //recursion down
      }
      if (N != os[""] && typeof os[""]!=Ob && level>flevel)  {
        fval=os[""];
        flevel = level;
      }
    }
  }
  
  //=======================================
  
  function _update ($o, value, depth) {
    //validates and updates field and all dependent fields,
    //applies conditional formatting
    var i, $box, d, oui, p, val, css, oc,
        selector, $root, $we, ui,
        isForm = false, 
        isList = false,
        $this = $o,
        xdata = $this.my(),
        err="";
  
    if (xdata) {
      selector = xdata.selector;
      $root = xdata.root;
      if ($root.hasClass("my-form-init")) return {};
      $we = _find($root, selector);
      ui = $root.my().ui;
      isForm = $o.hasClass("my-form");
      if (isForm){
        $box = $o; d = xdata.ddata; 
        oui = xdata.dui; 
        p =  xdata.dparams;
      }
      else {
        $box = xdata.container; 
        d = xdata.data; 
        oui = xdata.ui; 
        p =  xdata.params;
      }
      // Exec bind if any
      if (oui.bind != N) {
        if (n(value)) val = value;
        else val = _field($we, _bind(d, N, oui, $we));
  
        // validating and storing if correct
        // applying or removing error styles
        if (N != oui.check) {
          err="Unknown error";
          try { err = _validate(d, val, oui, $we); }
          catch (e) { _ERR ("Error "+ e.message+" in .check validator for "+selector, $root, e.stack); }
        }
  
        var ec = p.errorCss;
        var jqec = "ui-state-error";
  
        try {
          if (N != value) val = _field($we, _bind(d, value, oui, $we));
        }
        catch (e) { err = p.messages.formError || "Error"; }
        
        if (N != oui.check) {
          
          isList = $o.hasClass("my-form-list");
          
          if (err=="" && (isForm || $box.hasClass(ec))) {
            if (!isForm) xdata.errors[selector]= "";
            else xdata.derrors[selector]= "";
            $box.removeClass(ec);
            if ($box.attr("title")) $box.attr("title","");
            if (!isForm && !isList) p.effect(_find($box, p.errorTip), false, (p.animate/2));
            $this.removeClass(jqec); 
            _find($this, ".ui-widget").removeClass(jqec);
          } 
          else if (err) {
            if (isForm)  xdata.derrors[selector]= err;
            else if (isList) xdata.errors[selector]= err;
            else {
              $box.addClass(ec);
              xdata.errors[selector] = err;
              var $tip = _find($box, p.errorTip);
              if ($tip.length){
                p.effect($tip.addClass(ec).html(isS(err)?err:"Error"), true, p.animate);
              } else {
                $box.attr("title",(isS(err)?err:"Error").stripTags());
              }
            }
  
            if ($this.hasClass("hasDatepicker")) {
              if ($this.is("input")) $this.addClass(jqec);
              else _find($this, ".ui-widget").addClass(jqec);
            }
            if ($this.hasClass("ui-slider")) $this.addClass(jqec);
          }
        }
      }
      
      
      // Applying conditional formatting if any
      var cssval = (value==N?val:value);
      if (oui.css) {
        for (css in oui.css) {
          oc = oui.css[css];
          if (isR(oc)) _css (oc.test(cssval), $we, css);
          else if (isF(oc)) _css (oc.call($root.my().manifest, d,cssval,$we), $we, css);
        }
      }
  
      // Recursively recalculating dependent fields
      var i, list = oui.recalc, dest = [], once = {}, item;
  
      if (depth && oui.recalc &&  $root.my()) {
        ui = $root.my().ui;
        for (i=0; i<list.length; i++) {
          if (list[i] && isS(list[i]) && (item = list[i].compact()) && ui[item]) {
            if (ui[item].recalc) {
              if (dest.indexOf(item) === -1) dest.push(item);
            } else once[item]=true;
          }
        }
        for (i=0; i<dest.length; i++)
          once = $E(true, once, _update(_find($root, dest[i]), N, depth-1));
  
        if (value!==N) {
          // here is a trick -- we may call _update ($o, undefined, 1)
          // and force update if we want only retrieve without recalc
          for (i in once) if (once[i]===true && i!=selector) {
            if (ui[i].delay && !ui[i].recalc) ui[i]._update(_find($root, i), N, depth-1);
            else _update(_find($root, i), N, depth-1);
          }
          return {};
        }
      }
      return once||{};
    }
  }
  
  //=======================================
  
  // Recursively unwinds string def of funcs and regexps, modifies  source obj!
  // Split down to several fns to avoid hydrogen v8 deoptimize
  
  function _unjson (node, exclude){
    var i, incl = !exclude;
    for (i in node) if (_has(node,i)) _unjsonNode(i, node, incl);
  }
  
  function _unjsonNode (i, node, incl) {
    var nd, t="", a, e, name;
    if (incl || !/^(data|files|require)$/.test(i)) {
      nd = node[i];
      t = T(nd);
      if (/^(ob|ar)/.test(t)) _unjson(nd);
      else if (t==="string" && /^(function(\(|[\s\n\t]+)|new\sRegExp)/.test(nd)) {
  
        if ((a = nd.match(/^function([\s\n\t]+[\w_$][\w\d_$]*)?[\s\n\t]*\(([^\)]*)\)\s*\{([\s\S]*)\}[\s\n\r\t]*$/)) && a.length===4) {
  
          name = a[1]?a[1].replace(/[\s\n\t]/g,''):'';
  
          if (!name.length) e = _NewFunction(a[2], a[3]);
          else e = _NewNamedFunction(name, a[2], a[3]);
  
          if (typeof e === "function") node[i] = e;
          else _ERR ("Invalid function in XJSON, skipped", e.message, e.stack, nd);
        }
        else if ((a = nd.match(/^new\sRegExp\s*\(\/([\s\S]+)\/([a-z]*)\)$/)) && a.length===3) {
          e = _NewRegExp(a[1], a[2]);
          if (typeof e.test === "function") node[i] = e;
          else _ERR ("Invalid RegExp in XJSON, skipped", e.message, e.stack, nd);
        }
      }
    }
  }
  
  function _NewFunction (A1, A2) {
    var f;
    try {  f = new Function(A1, A2);  } catch(e) {  f = { message:e.message, stack:e.stack }; }
    return f;
  }
  
  function _NewNamedFunction (name, A1, A2) {
    var f;
    try { f = (new Function("", 'return (function '+name+'('+A1+'){'+ A2+'});'))(); } 
    catch(e) {  f = { message:e.message, stack:e.stack }; }
    return f;
  }
  
  function _NewRegExp (A1, A2) {
    var f;
    try {  f = new RegExp(A1, A2);  } catch(e) {  f = { message:e.message, stack:e.stack }; }
    return f;
  }
  
  //=======================================
  
  function _validate (data, val, uiNode, $formNode) {
    //checks if val fails to meet uiNode.check condition
    var pat = uiNode.check, i, v, ctr = 0, sel, ret;
    if (pat != N) {
      var msg = _form($formNode).params.messages,
          err = uiNode.error,
          err0 = err||msg.patternMismatch||msg[""]||"Error";
  
      if (
        $formNode.length
        && Object.prototype.hasOwnProperty.call($formNode[0], "validity")
        && !$formNode[0].validity.valid
      ) {
        var syserr=$formNode[0].validationMessage+"";
        if (syserr!=="") return syserr.substr(0,1).toUpperCase()+syserr.substr(1);
        else {
          v = $formNode[0].validity;
          for (i in v) {
            if (syserr==="" && i!="valid" && isB(v[i]) && v[i] && msg[i]) syserr=msg[i];
          }
          return syserr||err;
        }
      }
  
      switch(T(pat).substr(0,1)){
        case "f":  {
          ret = pat.call(_form($formNode).manifest, data, val, $formNode);
          return (ret === null || ret === undefined) ? "" : ret;
        }
        case "r":  return ( (pat.test(String(val))) ? "":err0 );
        case "a":  return ( (pat.indexOf(val)>-1)?"":err0);
        case "s":  return (val==pat?"":err0);
        case "o":  return pat[val]?"":err0;
        case "b":  {
          if ($formNode.hasClass("my-form-list")) {
            sel = $formNode.data("listSrc") || $formNode.data("my").listSrc || ">*";
            ret={};
            ctr = 0;
            (sel == ">*"?$($formNode[0].children):_find($formNode, sel, true))
            .each(function (idx){
              var $e = $(this);
              if ($e.hasClass('ui-sortable-placeholder')) return;
              if (
                $e.data("my") 
                && !$e.my("valid")
              ) ret[ctr] = $e.my("errors");
              ctr += 1;
            });
            return ret;
          } 
          else if ($formNode.hasClass("my-form")){
            return !pat?"":$formNode.my("valid")?"":$formNode.my("errors");
          }
          return "";
        }
      }
      return msg.formError||"Error";
    }
    return "";
  }

})(jQuery);


//#############################################################################################

/* jQuery.formgen 0.6.0
 * Generates forms markup for $.my from lean-syntax DSL.
 * Returns html string.
 *
 * $(somediv).formgen("[
 *     // Redefines params for subsequent rows, can be partial
 *     { row:"400px", label:"100px", rowCss:"rowClass", labelCss:"", labelTag:""},
 *
 *     // First row
 *     ["Text4label", "inp#Name.person-name",{placeholder:"Your name"}],
 *
 *     // Some free HTML
 *     '<div class="shim"><div>',
 *
 *     // Row with several controls and HTML, no label
 *     ["", "num#age",{style:"width:50px"}, "<i>years</i> ", "num#year", {style:"width:100px"}, " born"],
 *
 *     // Select with opts, understands many formats
 *     ["Choose one", "sel#mychoice",
 *       {vals:[
 *         "Fish",
 *         "Meat",
 *         {id:"Poultry", text:"Chicken"},
 *         {"Ice Tea":"Tea1"}
 *     ]}]
 *
 *    //and so on. Shortcuts for controls are below in the code.
 * ]")
 *
 * */

(function ($){
  //Some shortcuts and constants
  var $E = $.extend, 
      n = function (o) {return o!==null && o!==undefined;},  
      N = null,
      Ob = "object", 
      Da = "data", 
      Ar = "array", 
      St = "string", 
      Fu="function", 
      Ch = "change",
      isA = Object.isArray, 
      isB = Object.isBoolean, 
      isS = Object.isString, 
      isO = Object.isObject,
      isN = Object.isNumber, 
      isR = Object.isRegExp, 
      isF = Object.isFunction,
      iHead = '<input type="',
      iTail = ' {ext} ';
  var f = {
    tmpl:{
      "num"  :iHead+'number" {ext}/>',
      "inp"  :iHead+'text" {ext}/>',
      "sli"  :iHead+'range" {ext}/>',
      "dat"  :iHead+'date" {ext}/>',
      "btn"  :iHead+'button" {ext}/>',
      "pwd"  :iHead+'password" {ext}/>',
      "but"  :'<button {ext}>{txt}</button>',
      "div"  :'<div {ext}>{txt}</div>',
      "spn"  :'<span {ext}>{txt}</span>',
      "sel"  :'<select {ext}>{txt}</select>',
      "mul"  :'<select {ext} multiple="multiple">{txt}</select>',
      "txt"  :'<textarea {ext}>{txt}</textarea>',
      "err"  :' <span class="my-error-tip {class}" style="{style}">{txt}</span>',
      "msg"  :'<div class="my-error-tip {class}" style="{style}">{txt}</div>',
      "val"  :function (p) {
        if (!isA(p.vals)) return "";
        var p0=$E({style:"",css:""},p);
        p0.txt=p.vals.reduce(function (a,b){
          return a+'<span class="my-shortcut" '
          +'onclick="$(this).parents(\'.my-row\')'
          +'.find(\'input,textarea\').val($(this).text()).trigger(\'blur\')">'
          +b+'</span> ';
        }," ");
        return ('<span class="my-shortcuts {css}" style="{style}">{txt}</span>').assign(p0);
      },
      ""  :'<{_tag} {ext}>{txt}</{_tag}>'
    },
    txt:{
      sel:function (p) {
        if (!p.vals) return "";
        var obj = decrypt(p.vals);
        return Object.keys(obj).reduce(function (a,b){
          return a+'<option value="'+b+'">'+obj[b]+'</option>';
        },'');
      }
    },
    params:{
      styles:{
        num:"width:30%;", 
        dat:"width:30%;", 
        inp:"width:100%", 
        pwd:"width:100%", 
        but:"width:30%",
        txt:"width:100%;max-width:100%;min-height:1px;word-break:break-word;",
        err:"display:none",
        msg:"display:none"
      },
      alias: {
        number:"num",
        date:"dat",
        slider:"sli",
        textarea:"txt",
        input:"inp",
        span:"spn",
        select:"select",
        vals:"val"
      },
      row:"",
      rowTag:"div",
      rowCss:"my-row",
      label:"",
      labelTag:"span",
      labelCss:"my-label"
    },

    defaults:{id:"","class":"",style:"",placeholder:"",value:"",rows:1},
    attnames:{css:"class",plc:"placeholder",val:"value",txt:"",vals:"",tip:"title"}
  };


  function chain(a,b,sys) {
    if (isS(b)) return a+b;
    if (isO(b)) {
      sys = $E(true,sys, b);
      return a;
    } else if (isA(b) && b.length>1 && isS(b[1])) {

      var lbl = b[0],
          html="",
          key,
          type,
          a0,b0,
          i=1,j,p,
          tmpl,
          ext;

      //iterate through row inner items
      while (i<b.length) {
        if (isS(b[i])) {
          b0 = b[i].replace(/\s/g,"");
          a0 = b0.split(/[\.#]/i);
          type=sys.alias[a0[0]]||a0[0];
          key = b0.substr(a0[0].length);
          if (/^[a-z0-9]+(#[a-z0-9\-_]+)?(\.[a-z0-9\-_]+)*$/i.test(b0)) {
            tmpl = f.tmpl[type] || f.tmpl[""];
            p = {style:"","class":"",txt:""};
            ext="";

            //mount params on p
            var isExt = isO(b[i+1]);
            if (isExt) {
              i+=1;
              for (j in b[i]) if (f.attnames[j]!=="") p[f.attnames[j]||j]=b[i][j];
            }
            //apply default styles-classes
            if (!p.style && !p["class"] && sys.styles[type]) p.style=sys.styles[type];
            if (!p.id && key.to(1)=="#") p.id=key.from(1).split(".")[0];
            if (!p["class"] && /\./.test(key)) p["class"]=
              (key.to(1)=="#"?key.substr(p.id.length+1):key)
            .split(".")
            .compact(true)
            .join(" ");

            //combine attributes and others
            for (j in p) ext+=j+'="'+p[j]+'" ';
            if (isExt)  for (j in b[i]) if (f.attnames[j]==="") p[j]=b[i][j];
            p.ext=ext;

            //try to gen text if no
            if (!p.txt && f.txt[type]) p.txt=f.txt[type](p);

            //attach _tag
            p._tag=type;

            //execute template
            html+=typeof tmpl == Fu?tmpl(p)||"":typeof tmpl == St?tmpl.assign(p):"";

          } else html+=b[i];
        }
        i+=1;
      }
      //somth is generated, make row
      if (html) {
        html =
          '<'+sys.rowTag+' class="'+sys.rowCss+'" '
        +(sys.row?'style="width:'+sys.row+'; ':'')
        +(sys.label && lbl?'padding-left:'+sys.label+'; ':'')
        +'">'
        +(lbl?(
          '<'+sys.labelTag+' class="'+sys.labelCss+'" '
          +(sys.label?'style="display:inline-block;width:'+sys.label+';margin-left:-'+sys.label+'" ':"")
          +'>'+lbl+'</'+sys.labelTag+'>'
        ):"")
        +html+'</'+sys.rowTag+'>';
      }
      return a+html;
    }
    return a;
  }

  function decrypt (elt0) {
    //translates different forms like [val, val val]
    //{id:"",text:""} {key:"",value:""} and so on
    // into object {key1:val1, key2:val2, ...}
    var elt = elt0;
    if (isS(elt)) {
      elt = elt.split(/[\s,]/).compact(true);
    }
    if (isA(elt)) {
      var obj={};
      for (var i=0;i<elt.length;i++) {
        var e = elt[i];
        if (isO(e)) {
          var keys=Object.keys(e);
          if (keys.length==1) obj[keys[0]]=e[keys[0]]+"";
          else obj[e.id||e.key||e.name||""]=(e.text||e.value||e.title||"");

        } else obj[e]=e+"";
      }
      elt=obj;
    }
    if (isO(elt)) return elt;
    else return {};
  }

  function formgen (form0, params){
    //find params in form if any
    var sys={}, 
        form = isS(form0)?form0.lines().map(function(e){return e.replace(/^[\t\s]*/,'');}):form0;
    if (isA(form)) {
      $E(true,sys,f.params, params||{});
      return form.length?form.reduce(chain.fill(undefined,undefined,sys),''):"";
    } else if (isO(form)) {
      $.extend(f, form);
    } else return "";
  }

  //return formgen;
  var methods={
    init: function (form, params) {
      return $(this).html(formgen(form, params));
    }
  };


  if (!$.my) $.my={};
  $.my.formgen = formgen;
  $.fn.formgen = function (method) {
    if (isS(method) && methods[method]) return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
    else if (typeof method === 'object' || !method ) return methods.init.apply(this,arguments);
    else $.error('Method '+ method+' does not exist on jQuery.formgen');
  };

})(jQuery);


//#############################################################################################

/* jQuery.my.modal 1.2.4
 * Requires Sugar 1.4.~, jQuery 2.0+, $.my 1.2.10+
 *
 * Modal dialog constructor/manager. 
 * 
 * Returns promise, which is resolved on dialog normal close or rejected if modal fails to init.
 * After content is succesfully initialized promise progress receives notification "Ready".
 *
 * $obj.modal or
 * $.my.modal (Obj, done, width) >> null or
 *                   promise [resolve(formData or true), reject (errMessage, errStack)]
 *
 * Obj is one of following types:
 *     1. jQuery image – will raise modal with the image and text from title or data-text attributes
 *     2. HTML string – will raise modal with html content
 *     3. Object of type
 *       {
 *         manifest: formManifest Object,
 *         data: initialData Object or none,
 *         width: formWidth Number or none,
 *         done: callback Function (formErrors, data) or none,
 *         esc: false, enables/disables close on escape keypress,
 *         enter: false, enables commit on Enter keypress
 *         nose:"", left|right|top|bottom – where to put nose
 *         global: false, force global modal
 *         screen: false, show/hide screen div
 *         drag: false, allows drag of modal if $ ui draggable plugin installed
 *         align:"top|bottom:NUM%|px;left|right:NUM%|px",
 *        bound: false or number, defines if modal must lay inside root,
 *        background:"white" background color in CSS format,
 *        hardClose:true, defines if close by X is uninterruptible (true) or interruptible
 *       }
 *       will raise modal with $.my form inside. Form must call $obj.modal(false) or emit
 *       "commit" event on itself to close with sendind data. Calling $obj.modal(true) or
 *       emitting "cancel" event on form will close modal sending null as data with no error.
 *
 *       Callback in obj overlaps done provided as second arg, same for width.
 *
 *       Callback is called prior promise and unlike promise receives 2 arguments,
 *       not one, even when form succeded. If callback returns true, dialog remains
 *      opened and promise – pending.
 *
 *     4. null, undefined or false – close dialog and calls done(formErrors, data),
 *        if done return false or null promise is resoved with data,
 *        else modal stays open
 *     5. true (strict boolean) – close dialog and calls done (null, null),
 *        then promise is rejected with "Cancelled" string
 *
 *     If modal on $obj is already open, invoking $obj.modal return promise that is
 *     immediatly rejected with error "Locked", done is called with (null, null).
 *
 * $.my.modal.visible() >> Boolean
 *     Indicates if global modal is opened.
 *
 * $.my.modal.parent (selector or null) >> jQuery object
 *     Sets or gets parent DOM node, where all $.my.modal stuff is prepended.
 *     To work good must be called prior to 1st $.my.modal call.
*/

(function ($){

  var root={}, 
      parent = "body", 
      parentBack, 
      isOpen = false,
      $E = $.extend, 
      M = {},
      BTmodal,
      _indom = $.my.f.indom,
      isA = Object.isArray, isB = Object.isBoolean, isS = Object.isString, isO = Object.isObject,
      isN = Object.isNumber, isR = Object.isRegExp, isF = Object.isFunction;

  if ($.fn.modal && isF($().emulateTransitionEnd)) BTmodal = $.fn.modal;

  //Close modal on escape
  
  $(document).off(".modal");

  $(document).on("keydown.modal", function (e) {
    var code = e.keyCode, $f, m;
    if (false!==isOpen && (code ===13 || code === 27)) {
      m = isOpen.data("modal");
      $f = m.form;
      if (code == 27 && ( m.esc || Object.equal($f.data("my").initial, $f.my("data")) ) ) {
        isOpen.modal(true);
        return false;
      }
      else if (code == 13 && m.enter ) {
        (function($f){
          $f.modal();
        }).fill(isOpen).delay(50);
        return false;
      }
    }
  });
  
  if (isF($.my.f.getref($, "my.modal.parent"))) {
    var parentOld = $.my.f.getref($, "my.modal.parent")().attr("id");
    if (parentOld) parent = "#"+parentOld;
  };

  // - - - - - - - - - - - - - - - - - -

  function _convert (o, obj, ovl, width0) {
    var h, w,h0,w0,text,$i,width;
    // $ image
    if (typeof obj == "object" && obj.jquery) {
      if (obj.is("img")) {
        $i = obj;
        text = obj.attr("alt") || obj.attr("title") || obj.data("text")||"";
        w = $i[0].naturalWidth || $i[0].width;
        h = $i[0].naturalHeight || $i[0].height;
        if (h<1) h=1;
        if (w<1) w=1;
        w0=$(window).width()-90;
        h0=$(window).height()-90;
        if (h0<h) w = (w*(h0/h))|0, h=h0;
        if (w0<w) w=w0, h=(h*(w0/w))|0;
        width=w<300?300:w;
        $E(o, {
          source:"image",
          manifest:{
            init: function($o){
              $o.html(this.HTML);
              $o.on("click.my","img:eq(0)", function(){
                $o.trigger("cancel");
              });
            },
            HTML:'<img src="" class="db" style="max-width:'+w+'px;max-height:'+h+'px">'
            +'<h4 class="mt10"></h4>',
            ui:{
              "img:eq(0)":"img",
              "h4":{
                bind:"text",
                css:{hide:function(d,v){return !v;}}
              }
            }
          },
          data:{img:$i.attr("src"),text:text},
          esc:true,
          screen:true,
          width:width0||width,
          focus:false,
          global:true,
          z:"1995"
        }, ovl);
      }
    }

    // $.my form
    else if (isO(obj) && obj.manifest) {
      $E(o, obj, ovl);
    }

    //plain html
    else if (isS(obj)) {
      $E(o, {
        source:"html",
        manifest:{
          init: function($o){ $o.html(this.HTML); },
          HTML:obj,
          ui:{ "div:eq(0)":function(){} }
        },
        data:{},
        esc:true,
        focus:false,
        width:width0
      }, ovl);
    }

    else return null;

    return o;
  }


  // - - - - - - - - - - - - - - - - - -

  root.modal = function modal (obj, done0, w0) {
    var o = {},
        $r = $(parent), pi,
        $o=$r.find(">.my-modal-proxy"),
        ovl = {
          global:true,
          screen:true,
          done:isF(done0)?done0:undefined,
          z:"1995"
        };
    if (!isB(obj) && null!=obj) {
      pi = $.Deferred();
      if (!_convert(o, obj, ovl, w0)) {
        return pi.reject("Invalid data").promise();
      }
      if (isOpen) { return  pi.reject("Locked").promise(); }
      else {
        if (!$o.length) {
          $o = $('<div class="my-modal-proxy"></div>').prependTo($r);
          $o.css({position:"absolute",top:"0",left:"0",margin:"0",padding:"0",width:"1px",height:"0"});
        }
        return $o.modal(o);
      }
    } 
    else return $o.modal(obj);
  };

  // - - - - - - - - - - - - - - - - - -


  root.modal.loading = function (onoff) {
    $(parent).find(">.my-modal").toggleClass("my-modal-loading",!!onoff);
  };

  root.modal.parent = function (s) {
    // sets parent DOM node selector for $.my.modal
    if (!s || !$(s).length) return $(parent);
    parent = s;
  };

  root.modal.parentBack = function (s) {
    // sets parent DOM node selector for $.my.modal background
    if (!s || !$(s).length) return $(parentBack || parent);
    parentBack = s;
  };

  root.modal.visible = function () {return !!isOpen;};

  if (!$.my) $.my={};
  $.my.modal = root.modal;


  // ###############################
  // Extend jQuery with modal plugin

  $.fn.modal = function (obj0, done0, width0) {
    
    // Detect Bootstrap
    if (BTmodal) {
      if (obj0 === void 0 && done0 === void 0 && width0 === void 0) return BTmodal.call(this);
      else if (isO(obj0) && (
        obj0.hasOwnProperty('backdrop') 
        || obj0.hasOwnProperty('keyborad') 
        || obj0.hasOwnProperty('show')
      )) return BTmodal.call(this, obj0, done0);
      else if (isS(obj0) && /^(toggle|show|hide|handleUpdate)$/.test(obj0)) 
        return BTmodal.call(this, obj0, done0);
    }
    
    var pi = $.Deferred(), o={},
        $m, $f, $o = this, $r, $bg, $cl, $nose, padx=0, pady=0,
        done = isF(done0)?done0:function(){ return false; },
        obj = isO(obj0)?obj0:{},
        m = $o.data("modal"),
        md, stop;

    $E($o, pi.promise());

    // check if this already has modal

    if (m) {
      if (obj0==null || isB(obj0)) {
        _close(obj0);
        return $o;
      } else if (obj) {
        // reinit is not allowed
        _f("Locked");
        return $o;
      }
    }

    // check if $o is visble
    if (!$o.is(":visible")) {
      _f("Object must be visible");
      return $o;
    }

    // convert
    if (!(obj = _convert(o, obj0, {}))) {
      _f("Invalid data");
      return $o;
    }

    // check if fullscreen opened
    if (obj.global && isOpen) {
      _f("Locked");
      return $o;
    }


    // ##### NEW MODAL ##########

    m=$E({
      type:"DOM", 
      source:"manifest",
      form:null,      // $obj of the form
      modal:null,      // $obj of the modal wrapper
      root:null,      // $obj, modal is appended to
      bgroot:null,    // $obj, root for bg
      caller:$o,      // $obj modal is linked with

      manifest:{}, 
      data:{},

      global:false,
      screen: false,
      drag:false,
      focus:true,
      close:true,
      silent:true,
      esc: false, 
      enter: false,
      bound:false,
      hardClose:true,

      nose: "", 
      width:width0||300, 
      height:null,
      x:"0", 
      y:"0", 
      z:"1901", 
      background:"white",
      css:"",
      animate:200
    }, obj, {
      promise: pi.promise(),
      cid:Number.random(268435456,4294967295).toString(16)
    });
    m.done = isF(m.done)? m.done:done;

    //parse align
    if (isS(m.align) && m.align) {
      m.x = (m.align.match(/(left|right):\-?\d+(\.\d+)?(%|px)?/g)||["0"])[0];
      m.y = (m.align.match(/(top|bottom):\-?\d+(\.\d+)?(%|px)?/g)||["0"])[0];
    }

    //refine width
    m.width=1*($.my.f.getref(
      isS(m.manifest)?$.my.cache(m.manifest):m.manifest,
      "params.width"
    ) || m.width );

    // guess if $o is ctrl, form or just dom node
    // find parent container

    m.type = "DOM";
    if ($o.hasClass("my-form")) {
      m.type = "form";
      m.root = m.root || $o;        //itself
    }
    else if ($o.data("my")) {
      m.type = "control";
      m.root = m.root || $o.my().root;  // parent form
    }
    else {
      m.root = m.root || $o.parents(".my-form").eq(0);
      if (!m.root.length) m.root = $(parent); // global parent
    }

    if (m.global) {
      m.root = $(parent);
      m.bgroot = $(parentBack||parent);
    } 
    else m.bgroot = m.bgroot?$(m.bgroot):m.root;

    $r = m.root;
    if (!$r.data("modals")) $r.data("modals",{});


    // calculate z-index

    _measure();

    // ##### Create modal DOM wrapper #####

    // create wrappers if none defined
    $m= $('<div class="my-modal my-modal-init my-modal-'+ (m.global?"fullscreen ":"overlay ")
          + m.css + (m.nose?" nose-"+ m.nose:"")
          +'"></div>');
    if (!m.root.find(">.my-modal").length) $m.prependTo(m.root);
    else $m.insertAfter(m.root.find(">.my-modal").last());
    $m.addClass("my-modal-"+ m.cid);

    padx=$m.outerWidth();
    pady = $m.outerHeight();
    $m.hide();

    //rebuild modal form obj
    $m.html('<div class="my-modal-form"></div>');
    $f = $m.find(".my-modal-form");

    // close btn
    if (m.close) {
      $cl = $(isS(m.close)? m.close:'<div class="my-modal-close" title="Close">×</div>')
      .prependTo($m).on("click.my",function () {_close(m.hardClose);});
      $cl.css({"z-index":((m.z+"").to(1)==="+"?"+":"")+(m.z*1+1)});
    }


    $bg = m.bgroot.find(">.my-modal-screen");
    if (m.screen)  {
      if (!$bg.length) {
        $bg = $('<div class="my-modal-screen" style="display:none;"></div>').prependTo(m.bgroot);
      }
      if (m.esc) $bg.on("click.my"+ m.cid, function () { $o.modal(true); });
      $bg.toggleClass('my-modal-screen-global', !!m.global);
    }

    // mount data
    $o.data("modal", m);

    // silent
    if (m.silent) $m.on("change.my", function(){ return false; });

    // position
    $m.css({
      display:"block",
      height:"none",
      opacity:"0.005",
      "z-index": m.z,
      width:"auto"
    });

    if (!m.global) $m.css({
      position: "absolute",
      left: m.pos.vx+"px",
      top: m.pos.vy+"px",
      display:"block",
      height:"none",
      opacity:"0.005",
      "z-index": m.z,
      width:"auto"
    });
    else $m.css({
      position: "fixed",
      left:"50%",
      top: m.pos.vy+"px",
      display:"block",
      height:"none",
      opacity:"0.005",
      "z-index": m.z,
      width:"auto",
      "margin-left":"-"+((m.width+padx)/2).round(0)+"px"
    });

    // try to init form

    $f.my(m.manifest, m.data)
    .then(function () {
      var $img, $i, i, focus, ui;
      //success
      $E(m,{
        form: $f,
        bg:$bg,
        cancel: function(){_close(true);},
        commit: function(){_close();}
      });
      $m.data("modal",m);

      // adjust form
      m.height = $m.outerHeight();
      if (m.source !== "manifest") m.width = $m.width();
      _measure();
      $m.css({top:m.pos.vy+"px"});
      _adjust(true);
      
      $m.removeClass('my-modal-init');

      // remember cid in parent form root
      $r.data("modals")[m.cid] = m;

      // memoize modal promise
      M[m.cid] = pi;

      // bind event listeners
      $f.on("commit.my", function(){
        m.commit.delay(30);
        return false;
      }).on("cancel.my", function(){
        m.cancel.delay(30);
        return false;
      });

      $m.on("layout.my", function(){
        _adjust();
      }.debounce(30));

      // fullscreen tuneups
      if (m.global) {
        isOpen = $o;
        $(document.body).css({overflow:'hidden'});
      }

      // esc and enter monitors
      if (!m.global && (m.esc || m.enter)) {
        $f.on("keydown.my", function(e) {
          var code = e.keyCode;
          if (code == 27 && m.esc) {
            m.cancel();
            return false;
          }
          else if (code == 13 && m.enter && !($(e.target).is("textarea"))){
            m.commit.delay(50);
            return false;
          }
        });
      }

      // autofocus
      if (m.focus===true) {
        focus = false;
        ui = m.manifest.ui;
        for (i in ui) {
          if (!focus) {
            $i = $f.find(i);
            if ($i.length && $i.is("input, textarea","button")) {
              focus = true; $i.focus();
            }
          }
        }
      }
      else if (isS(m.focus)) $f.find(m.focus).focus();

      //If we have images, count them and reheight on load
      $img = $f.find("img").filter(function () {return $(this).attr("src")!="";});
      if ($img.length) {
        var _imgdone = function(){
          if (m.source !== "manifest") $m.css({width:"auto"});
          _adjust();
        }.after($img.length);
        $img.each(function () {$(this).bind("load", _imgdone);});
      }

      // Draggable
      if (m.drag && $.fn.draggable) {
        if (!isS(m.drag)) $m.draggable();
        else $m.draggable({handle: m.drag});
        if (m.nose) $m.on("dragstart.my", function(){$m.removeClass("nose-"+m.nose);});
      }
      
      // Auto popup
      $m.on("mousedown.my", function(evt){
        var a=[],
            $m, 
            $e = $(evt.currentTarget), 
            $r = $e.parent(),
            z = +$e.css("z-index"),
            zmax = z;
        if ($r.length) {
          $m = $r.find(">.my-modal")
          .each(function(i,e){
            var zi = +$(e).css("z-index");
            if (e != evt.currentTarget && zi>=z) a.push([zi, $(e)]);
            if (zi>zmax) zmax = zi;
          });
          a.forEach(function(r){
            r[1].css("z-index", (r[0]-1)+"");
          });
          $e.css("z-index",zmax+"");
        }
      })

      pi.notify("Ready");
    })
    .fail(function (err){
      try {_remove();}catch(e){}
      $o.data("modal", null);
      pi.reject(err);
    });

    return $o;


    //### Helpers
    
    function _close(obj0) {
      // closes modal
      $f = m.form;
      $bg = m.bg; 
      $r = m.root; 
      done = m.done;
      md = $f.my('data');
      stop = false;

      if (!obj0) {
        // check if we can close
        try{
          stop = done.call ($f.my('manifest'), $f.my('valid')?null:$f.my('errors'), md);
        }catch(e){}
        if (!stop) {
          try {_indom($f)?_remove():'';} catch(e){}
          if (_indom($o)) $o.removeData('modal');
          // async resolve
          (function () {
            if (M[m.cid]) {
              try { M[m.cid].resolve(md); } catch (e) {}
            }
            delete M[m.cid];
            m = null;
          }).delay(0);
        }
      } else {
        // force close
        try {done.call($f.my('manifest'),null, null);} catch(e){}
        try {_indom($f)?_remove():'';} catch(e){}
        if (_indom($o)) $o.removeData('modal');
        if (M[m.cid]) {
          try { M[m.cid].reject('Cancelled'); } catch (e) {}
        }
        delete M[m.cid];
        m = null;
      }
    }
    
    // - - - - - - - - - - - - - - - - - -

    function _measure(){
      // measure $o, its pos
      // and modal offsets rel to container

      var W = window, h, w,
          isfs = !!m.global,
          ro = $r.offset(), 
          oo = $o.offset(),
          rs = $r.scrollTop();

      m.pos = {
        px: ro.left, py: ro.top,
        pw: $r.outerWidth(), ph: $r.outerHeight(),

        ox: oo.left, oy: oo.top,
        ow: $o.outerWidth(), oh: $o.outerHeight(),

        ww:w, wh:h
      };

      // calculate offsets
      var dx = (m.x.match(/\-?\d+(\.\d+)?/)||[0])[0]* 1,
          dy = (m.y.match(/\-?\d+(\.\d+)?/)||[0])[0]* 1,
          sx = m.x.has('left') ? -1 : m.x.has('right') ? 1 : 0,
          sy = m.y.has('top') ? -1 : m.y.has('bottom') ? 1 : 0,
          vx = m.pos.ox + m.pos.ow/2 - m.pos.px,
          vy = m.pos.oy + m.pos.oh/2 - m.pos.py;

      if (isfs) {
        m.pos.wh = h = W.innerHeight || $(W).height();
        m.pos.ww = w = W.innerWidth || $(W).width();
        vx = w/2;
        vy = h/2.5;
      }
      dx = m.x.has("%")? m.pos.ow/100*dx:dx;
      dy = m.y.has("%")? m.pos.oh/100*dy:dy;

      m.pos.pix = vx; m.pos.piy = vy;

      vx = vx + sx*(m.pos.ow/2) + dx*(sx>0?-1:1) - (m.width+padx)*(sx+1)/2;

      if (isfs) {
        vy = (h - m.height-20)/3;
        if (vy<10) vy=10;
      } else {
        vy = vy + sy*(m.pos.oh/2) + dy*(sy>0?-1:1) - ((m.height||0)/*+pady*/)*(sy+1)/2;
      }

      vx = vx.round(1); vy = (vy+rs).round(1);

      m.pos.vx = vx; m.pos.vy = vy;

      if (m.bound!==false && !m.global) {
        var mb = (isN(m.bound)?m.bound:0).clamp(-100,100);

        //width

        if (m.pos.pw - 2*mb < m.width+padx) {
          // we are wider
          m.pos.vx = -(m.width+padx-m.pos.pw)/2;
        }
        else if (m.pos.vx+m.width+padx > m.pos.pw-mb) {
          // we went over right
          m.pos.vx =  m.pos.pw-mb - m.width-padx;
        } else if (m.pos.vx<mb) {
          // we went under left
          m.pos.vx = mb;
        }

        // height
        if (m.pos.ph-2*mb < m.height) {
          // we are taller
          m.pos.vy = mb;
          m.height = m.pos.ph-2*mb;
        }
        else if (m.pos.vy+m.height > m.pos.ph-mb) {
          // we went over bottom
          m.pos.vy =  m.pos.ph-mb - m.height;
        } else if (m.pos.vy<mb) {
          // we went under top
          m.pos.vy = mb;
        }
      }

    }

    // - - - - - - - - - - - - - - - - - -

    function _adjust (skipMeasure){
      //adjust modal position,
      if (!skipMeasure) {
        m.height  =  $m.outerHeight();
        if (m.source !== "manifest") m.width = $m.width();
        _measure();
      }
      $m.css({
        width: (m.width+padx)+"px",
        display:"block"
      });

      if (!m.global) {
        $m.css({ left: m.pos.vx+"px"});
        if (m.nose) {
          if (!$("style#my-modal-style-"+m.cid).length){
            $m.append('<style id="my-modal-style-'+m.cid+'"></style>');
          }
          var h = "", $s = $("style#my-modal-style-"+m.cid);
          if (m.nose=="top" || m.nose=="bottom") {
            h+='div.my-modal-'+m.cid+'.nose-'+m.nose+':before {left:'
            + (m.pos.ox - m.pos.px + m.pos.ow/2 - m.pos.vx)
            +'px!important;}';
            $s.text(h);
          }
          else if (m.nose=="left" || m.nose=="right") {
            h+='div.my-modal-'+m.cid+'.nose-'+m.nose+':before {top:'
            + (m.pos.oy - m.pos.py + m.pos.oh/2 - m.pos.vy)
            +'px!important;}';
            $s.text(h);
          }
        }
      }
      else $m.css({
        left:"50%",
        "margin-left":"-"+((m.width+padx)/2).round(0)+"px"
      });


      if (m.screen) {
        if (!m.global) $bg.css({
          top:0, left:0, position:"absolute",
          width: $bg.parent().outerWidth()+'px',
          height: $bg.parent().outerHeight()+'px',
          display:"block",
          background:isS(m.screen)? m.screen:'rgba(255,255,255,0.6)',
          "z-index":m.z-1
        });
        else {
          $bg.css({
            top:0, left:0,
            width:"100%", height:"100%",
            display:"block",
            position:"fixed",
            "z-index":m.z-1
          });
          if (isS(m.screen)) $bg.css({
            background:m.screen? m.screen:'rgba(18,41,72,0.88)'
          });
          else $bg.css({
            background:m.screen?'rgba(18,41,72,0.88)':''
          });
        }
      }
      else if ($bg.length) $bg.hide();

      if (m.height> m.pos.wh) {
        $m.height(m.pos.wh-30);
        $f.css({'overflow-y':'scroll'});
      } else {
        $f.css({'overflow-y':''});
      }

      $m.animate({top: m.pos.vy+'px', opacity:'1'}, m.animate);
    }

    // - - - - - - - - - - - - - - - - - -

    function _remove(){
      try { $f.my('remove'); } catch(e){}
      try { 
        // root may not exist
        $r.data('modals')[m.cid] = null; 
      } catch(e){}
      $f.parent().off('.my').remove();
      if (_indom($bg)) $bg.off('.my'+ m.cid);
      if (m.screen && _indom($bg)) {
        (function(g){
          if (!g || !isOpen) $bg.hide();
          if (!!g && !isOpen) {
            // repair screen color
            $bg.css({background:'rgba(18,41,72,0.88)'});
          }
        }).delay(50, m.global); // curry m.global
      }
      if (m.global) {
        isOpen = false;
        $(document.body).css({overflow:''});
      }
    }

    // - - - - - - - - - - - - - - - - - -

    function _f(msg) {
      try { done(null, null); } catch(e) {}
      (function () { pi.reject(msg); }).delay(0);
    }

  }; // -- end $.fn.modal

})(jQuery);