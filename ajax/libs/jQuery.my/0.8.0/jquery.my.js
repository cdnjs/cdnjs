/*
 * jQuery.my 0.8.0
 * Requires jQuery 1.8.1–1.8.3, SugarJS 1.3.7–1.3.8
 * 		 or jQuery 1.9.0+, SugarJS 1.3.9+
 * 
 * Changes:
 * – strings in check, init, css, events resolved as manifest[string]
 * 
 * See more details at jquerymy.com
 * 
 * @ermouth, thanks @carpogoryanin, @ftescht
 * 2013-08-30
 */

;(function($) {var _version = "jQuery.my 0.8.0";
	
	//Some shortcuts and constants
	var $E = $.extend, n = function (o) {return o!==null && o!==undefined;}, 
		lang = "en", forms = {}, d8="{yyyy}-{MM}-{dd}", h24="{HH}:{mm}", N = null, 
		Ob="object", Da="data", Ar = "array", St = "string", Fu="function", Ch = "change",
		isA = Object.isArray, isB = Object.isBoolean, isS = Object.isString, isO = Object.isObject,
		isN = Object.isNumber, isR = Object.isRegExp, isF = Object.isFunction;
	
	//storage of rules defined by cascading selectors
	//very similar to css, but leafs are some useful data 
	//for this type of node
	var mys = {
	
	//getter and setter functions for different types of nodes
	//########################################################	
		vals : {
		
	/**/	".my-form": function ($o, v) {
			//object is jQuery.my instance
				if ($o && $o.my ) {var d = $o.my(Da); return Object.equal(d,v)?d:$o.my(Da, v, true);}
				else return v||N;
			},
				
	/**/	".hasDatepicker":function ($o,v) {
			//object has jQ UI datepicker		
				if(n(v)) $o.datepicker("setDate", ((v=="")?v:Date.create(v)));
				var date = $o.datepicker("getDate");
				return (date?date.format(d8):"");
			},
			
	/**/	".my-tags": function ($o,v) {
				//object is jQ tags control
				if (n(v)) {
					var v0 = v;
					if (isS(v)) $o.tags(Da,[v]);
					else if (isA(v)) $o.tags(Da,v);
				}
				return $o.tags(Da);
			},
			
	/**/	".ui-draggable": function ($o,v) {
			//object is jQ UI draggable
				if (n(v) && isO(v)) {
					var c = {};
					if (!isNaN(v.left)) c.left = Number(v.left.ceil(2))+"px";
					if (!isNaN(v.top)) c.top = Number(v.top.ceil(2))+"px";
					if (c.left || c.top) $o.css(c);
				}
				var p = $o.position();
				return {left:(v&&v.left?v.left.ceil(2):p.left.ceil(2)), top:(v&&v.top?v.top.ceil(2):p.top.ceil(2))};
			},
	/**/	".my-form-list": function ($o,list) {
			//object is list of forms	
				var i,old,mod,eq,
					sP = "ui-sortable", sPlaceholder= ">."+sP+"-placeholder",
					od = $o.data("formlist")||{},
					gen = od.listGen||{},
					itemSel = gen.selector||">*", 
					tmpl = gen.template||"<div></div>",
					delay = gen.delay||50,
					sortable = $o.is("."+sP), 
					result=[];
				var $c = sortable?$o.find($o.sortable("option","items")):$o.find(itemSel);
				
				if (n(list) && isA(list)) {
	
					//return list passed if dragging taking place
					if (sortable && $o.find(sPlaceholder).size()!=0) {
						return list;
					}
					
					//first we must define if putting new data over old will
					// change anything
					old= []; $c.each(function(){
						var $x = $(this);
						if ($x.data("my")) old.push($x.my("data"));
					});
					
					//fast compare
					eq=false; 
					if (old.length==list.length) for (eq=true, i=0;i<old.length;i++) if (old[i]!==list[i]) eq=false;

					if (!eq){
						// more comprehemsive compare, for example
						// applying [{a:1},{b:4}] over [{a:1,b:2},{a:3,b:4}]
						// must not force any recalc
						mod = $.extend(true, [], old, list);
						if (!Object.equal(old,mod) || mod.length!=list.length) {
							//we have new data, hash it
							var hash=[], xhash={}, present={};
							for (var i=0;i<list.length;i++) {
								hash[i]=f.sdbmCode(list[i]);
								xhash[hash[i]]=i;
							}
							
							//clean childs with no match to new data
							$c.filter("*:not(.ui-sortable-placeholder)").each(function(idx,elt){
								var $x = $(this), 
									md = $x.data("formlist")||{},
									hash = md.sdbmCode;
								if (hash && xhash[hash]) present[hash]=$(this);
								else $x.remove();
							});
							
							//iterate list
							for (var i=0;i<list.length;i++) {
								if (present[hash[i]]) {
									var $n = present[hash[i]].detach().appendTo($o);
									result.push($n.my("data"));
									//$n.data("formlist").index=i;
								} else {
									var $n = $(tmpl.assign(list[i])).appendTo($o);
									$n.data("formlist",{index:i});
									$n.on("change.my", (function (){
										if ($(this).data("my")) {
											$(this).data("formlist").sdbmCode = f.sdbmCode($(this).my("data"));
										}
										$o.trigger("check.my");
									}).debounce(delay/1.3));
									$n.data("formlist").list = list[i];
									$n.my(gen.manifest, list[i]);
									result.push($n.my("data"));
								}
							}
							return result;
						}
					}
					return old;
				} else if ($c.size()) {
					$c.filter("*:not(.ui-sortable-placeholder)").each(function(idx){
						var $x = $(this);
						if ($x.is(".my-form") && $x.data("my")) {
							result.push($x.my("data"));
							if (idx!=$x.data("formlist").index) {
								$x.data("formlist").index=idx;
								$x.my("redraw");
							}
						}
					})
					return result;
				}
				return list||[];
			},
			
	/**/	".ui-sortable": function ($o, list) {
				//jQ UI sortable
				var a = [], sP = "ui-sortable", sPlaceholder= ">."+sP+"-placeholder", $c = $o.find($o.sortable("option","items"));
				if (n(list) && isA(list)) {
					var w = {}, z={}, v = list.unique(); 				
					//return list passed if some field has focus of dragging taking place
					if ($o.find("input:focus:eq(0),textarea:focus:eq(0)").size()!=0 
							|| $o.find(sPlaceholder).size()!=0) return v;	
					$c.each(function () {w[f.sdbmCode(f.extval($(this)))] = $(this)});
					for (var i=v.length-1; i>=0; i--) {
						var j = f.sdbmCode(v[i]);
						if (w[j]) {
							w[j].prependTo($o).show();z[j]=true;
							if (a.indexOf(v[i])==-1) a.push(v[i]);
						}
					};
					a=a.reverse();
					for (i in w) if (!z[i]) w[i].hide();
				} else {
					var $p = $o.find(sPlaceholder), $q = $o.eq(0);
					if ($p.size()!=0) {
			
						//if placeholder state changed saving new data
						if ($q.my()[sP] != $p.position().left+""+$p.position().top) {
							var $c = $c.filter(":visible:not(:disabled, .ui-state-disabled, .ui-sortable-helper)");
							var $m = $o.find($o.sortable("option","items")).filter(".ui-sortable-helper");
							$c.each(function () {
								var $x = $(this);
								if ($x.is(".ui-sortable-placeholder")) {a.push(f.extval($m));}
								else a.push(f.extval($x));
							});
							//caching placeholder state and data retrieved
							$q.my()[sP] = $p.position().left+""+$p.position().top;
							$q.my()[sP+"1"] = a;
						} else a = $q.my()[sP+"1"];
						if (a==N) $c.each(function () {a.push(f.extval($(this)))});				
					} else {
						var $c = $o.find($o.sortable("option","items")).filter(":visible:not(:disabled, .ui-state-disabled)");
						$c.each(function () {a.push(f.extval($(this)));});
					}
				};
				return a;
			},
			
	/**/	"input[type=date]":function ($o,v) {
				//object is date input
				if(n(v)) {
					if (v!="") d = Date.create(v).format(d8); else d = "";
					if (isS(d) && !d.has("Invalid")) $o.val(d);
					return d;
				}
				var d = $o.val();
				return (d!=""?Date.create(d).format(d8):"");
			},
			
	/**/	"input[type=time]":function ($o,v) {
				//object is time input
				if(n(v)) {
					if (v!="") d = Date.create(v).format(h24); else d = "";
					if (isS(d) && !d.has("Invalid")) $o.val(d);
					return d;
				}
				var d = $o.val();
				return (d!=""?Date.create(d).format(h24):"");
			},
			
	/**/	"input,button":{
				"[type='text'],[type='number'],[type='search'],[type='hidden'],[type='password'],[type='button'],[type='range'],:not([type])":{
				//nearly all main input types and button
				
					".ui-slider-input": function ($o,v) {
					//input with jQ UI slider() applied
						if (n(v)) $o.val(v).slider("refresh");
					},
					
					".tagstrip input.value": function ($o,v) {
					//input of tagstrip() applied
						if (n(v)) $o.val(v).trigger("update");
					},
					
					"div.select2-container+input": function ($o, v) {
					//select2
						if (n(v) && !(JSON.stringify(v)===JSON.stringify($o.select2("val")))) $o.select2("val", (isA(v)?v:[v]));
						return $o.select2("val");
					},
					
					"": function ($o,v) {if(n(v)) $o.val(v)}
				},
				
				":radio":function ($o,v) {
				//radio buttons
					var pos = -1;
					if (n(v)) {	
						$o.each(function(ind) {
							var val = $(this).val();
							if (String(v)===String(val)) pos=ind;
						});
						var jqcheck = $o.eq(0).checkboxradio;
						if (jqcheck) $o.each(function(ind){
								var $x = $(this);
								if (pos!=ind && $x.is(":checked")) 
									$x.attr("checked",false).checkboxradio("refresh");
							});						
						if (pos>-1) {
							var $x = $o.eq(pos);
							if (!$x.is(":checked")) {
								$x.attr("checked",true);
								if (jqcheck) $x.checkboxradio("refresh");
							}
						} else if (!jqcheck) $o.each(function(){ $(this).attr("checked",false)});
					} 
					if (pos==-1) for (var ind=0; ind<$o.size(); ind++) {
						if ($o.eq(ind).is(":checked")) pos=ind;
					};
					return pos!=-1?$o.eq(pos).val():"";
				},
				
				":checkbox": function ($o, v0) {
				//checkbox
					var pos = -1, v = v0, a = [], k = {};
					if (n(v)) {	
						if ($.type(v) != Ar) v = [v0];
						var jqcheck = !!$o.eq(0).checkboxradio;
						$o.each(function(ind) {
							var $x = $(this), val = $x.val(), on = $x.is(":checked");
							if (v.indexOf(val)!=-1) {
								a.push(val);
								if (!on) $x.attr("checked", true);
							} else if (on) $x.attr("checked", false);
							if (jqcheck) $x.checkboxradio("refresh");
						});
					} else {
						$o.each(function(ind) {
							var $x = $(this);
							if ($x.is(":checked")) a.push($x.val());
						});
					}
					return a;
				}
			},
			
	/**/	"select": {
				".ui-slider-switch": function ($o,v) {
				//on-off in jQ Mobile
					if (n(v)) {
						$o.val(String(v||""));
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
						if ($o.selectmenu) $o.selectmenu("refresh",true);
						//the only way to check if we have jQ UI selectmenu() attached
					}	
				},
				"": function ($o,v) {
					if (n(v)) {
						$o.val(String(v||""));	
						if ($o.selectmenu) {
						//now ditinguish between jQ selectmenu plugin and jQ Mobile
							if ($o.selectmenu("option").theme!=N) $o.selectmenu("refresh",true);
							else $o.find("option").each(function(i){
								var $x = $(this);
								if (f.extval($x) == v) $o.selectmenu("value",i);
							});						
			}}}},
			
	/**/	"textarea": {
				".my-cleditor":function ($o,v) {
					if(n(v)) $o.val(v).cleditor()[0].updateFrame();
					return $o.val();
				},
				"div.redactor_box textarea,.redactor": function($o,v) {
					if(n(v)) $o.setCode(v);
					return $o.getCode();
				},
				"":function ($o,v) {if(n(v)) $o.val(v)}
			},
			
	/**/	"div,span,a,p,form,fieldset,li,td,th,h1,h2,h3,h4,h5,h6":{
				".ui-slider":function ($o, v){
					if(n(v)) $o.slider("option",$o.slider("option","values")?"values":"value", f.clone(v));
					return f.clone($o.slider("option","values")||$o.slider("option","value")||"");
				},
				".ui-buttonset": function ($o,v) {
				//jQ UI buttonset ()	
					if (!n(v)) {
						var jor = $o.find(":radio:checked");
						if (jor.size() && jor.button) return jor.val()||jor.button("option", "label") ;
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
				".ace_editor":function($o,v) {
					if(n(v)) ace.edit($o[0]).setValue(v);
					return ace.edit($o[0]).getValue(v);
				},
				"": function ($o,v) {
					if(n(v)) $o.html(v);
					return $o.html();
				}
			},
	/**/	"pre,code":function ($o,v) {
				if(n(v)) $o.html(v);
				return $o.html();		
			},
	/**/	"img":function ($o,v) {
				if (n(v)) $o.attr("src",val);
				return $o.attr("src")||"";
			},
	/**/	"":function ($o,v) {
				if (n(v)) $o.html(v);
				return $o.html()||$o.text()||String($o.val())||"";
			}
		},
		
		
	//different controls' events to watch for 
	//########################################################
		
		events: {
			".hasDatepicker":"change.my check.my",
			".my-form,.my-tags":"change.my check.my",
			".ui-slider":"slide.my check.my",
			"div.redactor_box textarea":"redactor.my check.my",
			".ace_editor":"ace.my check.my",
			".my-form-list,.ui-sortable":"sortchange.my sortupdate.my check.my",
			".ui-draggable":"drag.my dragstop.my check.my",
			"a, .pseudolink, input[type=button], button": "click.my ",
			"img, :radio, :checkbox": "click.my check.my ",
			"div.select2-container+input,div.select2-container+select":"change.my check.my input.my",
			".ui-buttonset,input, select, textarea":"blur.my change.my check.my"+(navigator.appName.to(5)=="Micro"?" keyup.my":" input.my"),
			"":"check.my"
		},
		
	//functions retrieving container for different controls
	//########################################################
		
		containers: {
			"*[data-role='fieldcontain'] *":{ //jQuery Mobile
				"input,textarea,select,button,:radio": function ($o) {
					return $o.parents('[data-role="fieldcontain"]').eq(0);
				}
			},
			".tagstrip *.value": function ($o){ //$.tagstrip()
				return $o.parents('.tagstrip').eq(0);
			},
			"div.redactor_box textarea":function ($o){
				return $o.parents('div.redactor_box').eq(0).parent();
			},
			".my-tags,.hasDatepicker,.ui-widget,input,textarea,select,button" :{ 
				".my-cleditor": function ($o) {
					return $o.parents('div.cleditorMain').eq(0).parent();
				},
				"": function ($o) { 
					return $o.parents('div,span,a,p,form,fieldset,li,ul,td,th,h1,h2,h3,h4,h5,h6').eq(0);
				}
			},
			"": function ($o) {return $o}
			
		},
	
	//disablers and enablers
	//########################################################
		
		offon: { //if x==true disables control else enables	
			".ace_editor": function (x,$o) {ace.edit($o[0]).setReadOnly(x)},
			".ui-selectable": function(x,$o) {f.jquix($o,"selectable",x)},
			".ui-slider": function(x,$o) {f.jquix($o,"slider",x)},
			".ui-draggable": function(x,$o) {f.jquix($o,"draggable",x)},
			".ui-buttonset": function(x,$o) {f.jquix($o,"buttonset",x)},
			".hasDatepicker": function(x,$o) {f.jquix($o,"datepicker",x)},
			".my-form":function(x,$o){$o.my("disabled", !!x)},
			"div.select2-container+input,div.select2-container+select": function(x,$o) {f.jquix($o,"select2",x)},
			".my-cleditor": function (x,$o) { $o.cleditor()[0].disable(!!x);},
			"": function (x, $o) {$o.attr("disabled", !!x);}
		}
	};
	
	var f = {
		//### helpers
		con: function () {try {console.log (arguments);} catch (e) {}},
		clone: function (o) {return o.clone?o.clone():o},
		extval: function ($x) { 
			var d = $x.my(); if (d&&d.data) return d.data;
			return $x.data("value")||$x.val()||$x.text()||$x.html()||"";
		},
		jquix: function ($o, plugin, offon) {return $o[plugin](offon?"disable":"enable")},
		overlap: function (o1, o2) {
			if (arguments.length == 0) return {};
			if (arguments.length == 1) return arguments[0];
			for (var i=1; i<arguments.length;i++) Object.merge(arguments[0],arguments[i], false, function(key,a,b) {
				if (b===undefined || b===null) return a;
				if (!isO(b)) return b;
				else return Object.merge(a,b,false);
			});
			return arguments[0];
		},
		patch: function patcher (a,b) {
			//applies b over a in deep, if a already has non-object node it stays untouched
			//if no, b properties are cloned
			// function merger ({y:{w:2,a:[1,2]}}, {x:1, y:{w:5,z:3,a:[3,4,5]}}) >>{x:1,y:{w:2,a:[1,2],z:3}}.
			//return mutated a
			for (var i in b) {
				if (b.hasOwnProperty(i)) {
					if (isO(b[i])) {
						if (!a.hasOwnProperty(i))  a[i]=Object.clone(b[i],true);
						else patcher (a[i],b[i]);
					} else if (!a.hasOwnProperty(i)) {
						if (isA(b[i])) a[i]=b[i].clone(true);
						else a[i]=b[i];
					}
				}	
			}
			return a;
		},
		kickoff: function(a,b) {
			//replaces a content with b content;
			for (var i in a) {
				if (a.hasOwnProperty(i)) {
					if (b[i]===undefined) delete a[i];
					else a[i] = b[i];
				}
			}
		},
		getref:function(obj,ref) {
			return (ref||"").split(".").reduce(function(a,b){
				if (a!==undefined && a[b]) return a[b];
				else return undefined;
			}, obj);
		},
		sdbmCode:function(s0){ //very fast hash
		    for (var s = JSON.stringify(s0), hash=0,i=0;i<s.length;i++) hash=s.charCodeAt(i)+(hash<<6)+(hash<<16)-hash;
		    return (1e11+hash).toString(36);
		},
		tojson:(function(){
			function f(n){return n<10?'0'+n:n}
			Date.prototype.toJSON=function(){
				var t=this;return t.getUTCFullYear()+'-'+f(t.getUTCMonth()+1)+'-'+f(t.getUTCDate())+
				'T'+f(t.getUTCHours())+':'+f(t.getUTCMinutes())+':'+f(t.getUTCSeconds())+'Z';
			};
			RegExp.prototype.toJSON = function(){return "new RegExp("+this.toString()+")"};
			var tabs= '\t'.repeat(10), fj = JSON.stringify;
			function s2 (w, ctab0, tab){
				var tl=0,a,i,k,l,v,ctab=ctab0||0,xt = tabs;
				if (tab && isS(tab)) {tl=String(tab).length;xt = String(tab).repeat(10)}
				switch((typeof w).substr(0,3)){
					case 'str': return fj(w);case'num':return isFinite(w)?'"'+String(w)+'"':'null';
					case 'boo': case'nul':return String(w); 
					case 'fun': return fj(w.toString().replace(/^(function)([^\(]*)(\(.*)/,"$1 $3").replace(/(})([^}]*$)/,'$1'));
					case 'obj': if(!w) return'null';
					if (typeof w.toJSON===Fu) return s2(w.toJSON(),ctab+(tab?1:0),tab);
					a=[];
					if (isA(w)){
						for(i=0; i<w.length; i+=1){a.push(s2(w[i],ctab+(tab?1:0),tab)||'null')}
						return'['+a.join(','+(tab?"\n"+xt.to(ctab*tl+tl):""))+']';
					}
					for (k in w) if (isS(k)) {
						v=s2(w[k],ctab+(tab?1:0),tab);
						if(v) a.push((tab?"\n"+xt.to(ctab*tl+tl):"")+s2(k,ctab+(tab?1:0),tab)+': '+v);
					};
					return '{'+a.join(',')+(tab?"\n"+xt.to(ctab*tl):"")+'}';
				}
			}
			return s2.fill(undefined,0,undefined);
		})(),
		fromjson: function (s) {var obj = JSON.parse(s); xjs(obj);return obj},	
		
		//### end helpers
		
		
		//########## SYSTEM FUNCTIONS ##########
			
		field: function _fieldValue ($o, v) {
		//gets or sets the value of $o control
		//selects appropriate function for setting-retrieving
		//and attaches it to $o.data("myval");
			var fn = $o.data("myval");
			if (!fn) {
			//finding appropriate function and caching it
				var fval = f.traverse ($o, mys.vals);
				if (isF(fval)) {
					var r = fval($o, N);
					if (r===undefined) {
					//if function returns undefined we use .val() by default
						$o.data("myval", (function ($o, v) {
							if (v!=N) fval($o, v);
							return $o.val();
						}).fill($o, undefined)); 
					} else $o.data("myval", fval.fill($o,undefined)); 
				}
				fn = $o.data("myval");
			}		
			if (isF(fn)) {
				var r = fn();
				if (r!=v || isO(v)) r = fn(v);
				return r;
			} else return N;		
		},
		
		traverse: (function () {
		//traverses tree of rules to find  
		//first sprig with selector matching $o.
		//returns match or null
			var fval = N, flevel=0, fselector="";
			
			function go ($o, os,level) {
				for (var i in os) if (i!="" && $o.is(i)) {
					fselector = fselector+ (fselector?" ### ":"") + i;
					var oi=os[i],otype = $.type(oi);
					if ( !(/^(nul|un|ob)/).test(otype) && level>flevel) {
						fval=oi; flevel = level; return;
					} else if (otype==Ob) go ($o, oi, level+1); //recursion down
				};
				if (os[""]!=N && typeof os[""]!=Ob && level>flevel)  {
					fval=os[""]; flevel = level; 
				}
			}
			return function _traverseRules ($o, rules) {
				fval = N; flevel=0; fselector="";
				go ($o,rules,1);
				return fval;
			}
		})(),
		
		
		bind: function _bind (data, val, uiNode, $formNode) { 
		//sets or retrieves data using bind function		
			var bind = uiNode.bind, i, path=[], ptr, preptr, bt = $.type(bind);
			if (bt == Fu) {
				return bind.call(f.root($formNode).manifest, data, val, $formNode);
			} 
			if (bt == St || bt == Ar) {
				if (bt == St && !/\./.test(bind)) {
					//index is flat
					if (val!=N) data[bind] = val;
					else if (data[bind]===undefined) data[bind] = N;
					return data[bind];
				}
				//index is composite, we need to traverse tree
				//and create some branches if needed
				if (bt == St) path = bind.split(".").each(function(a,i){this[i]=String(a).compact()});
				if (bt == Ar) path = bind.slice(0).each(function(a,i){this[i]=String(a).compact()});
				ptr = data;
				for (i=0;i<path.length;i++) {
					if (i==path.length-1) {
						//we'r on the hole
						if (val!=N) ptr[path[i]] = val;
						else if (ptr[path[i]]===undefined) ptr[path[i]] = N;
						return ptr[path[i]];
					}			
					if (i==0) { 
						ptr = data[path[0]]; preptr= data;
					} else {
						preptr = preptr[path[i-1]];
						ptr = ptr[path[i]];
					}
					if (ptr===undefined) ptr = preptr[path[i]] = {};
				}
			}
			return N;
		},
		
		isOut:function _isOut (data,val, uiNode, $formNode) {
		//checks if val fails to meet uiNode.check condition			
			var pat = uiNode.check;
			if (pat != N) {
				var err = uiNode["error"]||f.root($formNode).params.errorMessage||"Error";
				switch($.type(pat).to(1)){
					case "f": 	return pat.call(f.root($formNode).manifest, data,val, $formNode);
					case "r":	return ( (pat.test(String(val))) ? "":err );
					case "a": 	return ( (pat.indexOf(val)>-1)?"":err);				
					case "s": 	return (val==pat?"":err);
					case "o":  	return pat[val]?"":err;	
					case "b":	{
						if ($formNode.is(".my-form-list,.ui-sortable")) {
							var sel = $formNode.data("listSrc")||$formNode.data("my").listSrc||">*", ret={};
							$formNode.find(sel).filter("*:not(.ui-sortable-placeholder)").each(function(idx){
								var $e = $(this);
								if ($e.data("my") && !$e.my("valid")) ret[idx]=$e.my("errors")
							});
							return ret;
						} else if ($formNode.hasClass("my-form")){
							return !pat?"":$formNode.my("valid")?"":$formNode.my("errors");
						}
					}
				}
				return err;
			} else {
				return "";
			}
		},
		
		root: function _root ($formNode) {
		//get control's root.my()
			return $formNode.my().root.my();
		},
		
		css: function _css (onOff, $we, css0) {
		//applies-discards conditional formatting or enables-disables field
			var css = css0.compact(), r = css.replace(/:disabled/g,''), 
				$d = $we.eq(0), d = $d.my(), $o = (d?d.container:$we);
			if (r) onOff?$o.addClass(r):$o.removeClass(r);	
			if (r!=css) { //we have :disabled
				if (d!==undefined && !!onOff!=!!d.disabled) { 
					$d.my().disabled = !!onOff;
					if (!d._disable) $d.my()._disable = f.traverse($we, mys.offon).fill(undefined, $we);
					d._disable(!!onOff);
				}
			}
			return $o;
		},
		
		update:function _updateField ($o, value, depth) {
		//validates and updates field and all dependent fields, 
		//applies conditional formatting
			var $this = $o, xdata = $this.my(), err="Unknown error";
			
			if (xdata) {
				var selector = xdata.selector, $root = xdata.root, $we = $root.find(selector), ui = $root.my().ui, 
					isform = $o.hasClass("my-form"), isList = $o.hasClass("my-form-list");
				if (isform) var $box = $o, d = xdata.ddata, oui = xdata.dui, p =  xdata.dparams;
				else $box = xdata.container, d = xdata.data, oui = xdata.ui, p =  xdata.params;	
				//exec bind if any
				if (oui.bind!=N) {
					if (n(value)) var val = value;
					else val = f.field($we,f.bind(d,N,oui,$we));
					
					//validating and storing if correct
					//applying or removing error styles
					try {var err = f.isOut(d,val,oui, $we)} 
					catch (e) {f.con ("Error "+ e.name+" validating "+selector, $root )}
					var ec = p.errorCss;
					var jqec = "ui-state-error";
					
					try { if (value!=N) val = f.field($we,f.bind(d,value,oui,$we));} 
					catch (e) { err=p.errorBind	}
					
					if (err=="") {
						if (!isform) xdata.errors[selector]= "";
						else xdata.derrors[selector]= "";
						$box.removeClass(ec);
						if (!isform) p.effect($box.find(p.errorTip), false ,(p.animate/2));
						$this.removeClass(jqec); $this.find(".ui-widget").removeClass(jqec);
					} else {
						
						if (isform) {
							xdata.derrors[selector]= err;
						} else if (isList) {
							xdata.errors[selector]= err;
						} else {
							$box.addClass(ec);
							xdata.errors[selector]= err;
							p.effect($box.find(p.errorTip).addClass(ec).html(err), true, p.animate);	
						}
						
						if ($this.is(".hasDatepicker")) {
							if ($this.is("input")) $this.addClass(jqec);
							else $this.find(".ui-widget").addClass(jqec);
						}
						if ($this.is(".ui-slider")) $this.addClass(jqec);
					}
				}
				//applying conditional formatting if any
				var cssval = (value==N?val:value);
				if (oui.css) {
					for (var css in oui.css) {
						var oc = oui.css[css];
						if (isR(oc)) f.css (oc.test(cssval), $we, css); 
						else if (isF(oc)) f.css (oc.call($root.my().manifest, d,cssval,$we), $we, css); 
					}
				}
				
				//recalculating dependent fields
				var i, list = oui.recalc, dest = [], once = {}, item;
				
				if (depth && oui.recalc &&  $root.my()) {
					for (var ui = $root.my().ui, i=0;i<list.length;i++) {
						if (list[i] && isS(list[i]) && (item = list[i].compact()) && ui[item]) {
							if (ui[item].recalc) {
								if (dest.indexOf(item)==-1) dest.push(item);
							} else once[item]=true;
						}
					};
					for (i=0; i<dest.length; i++) once = $E(true, once, f.update($root.find(dest[i]),N,depth-1));

					if (value!==N) { 
						// here is a trick -- we may call f.update ($o, undefined, 1)
						// and force update if we want only retrieve without recalc
						for (i in once) if (once[i]===true && i!=selector) {
							if (ui[i].delay && !ui[i].recalc) ui[i]._update($root.find(i),N,depth-1);
							else f.update($root.find(i),N,depth-1);
						}
						return {};
					}
				}
				return once||{};
			}
		},
		
		history: function _history (x, params, remove, silent) {
		// push or retrieves current state to history,

			var p = params;
			if ($.type(p)!=Ob || isNaN(p.remember) || $.type(p.history)!=Ob) return N;
			var h = p.history, l = p.remember;
			
			if (isO(x) && l) {
				var step = Object.extended(JSON.parse(JSON.stringify(x))),
					time = (new Date).valueOf(),
					k = h.keys().sort();
				if (k.length && (time-k[k.length-1]< p.historyDelay || h[k[k.length-1]].equals(step))) return N;
				p.history[time] = step; k.push(time);
				if (k.length >= l*2) {
					var newh = Object.extended();
					for (var i=l; i<l*2; i++) newh[k[i]] = h[k[i]];
					params.history = newh;
				}
				if (!silent) p.form.trigger(Ch);
				return p.history[k[k.length-1]];
			} else if (!silent) p.form.trigger(Ch);
			if (!isNaN(x) || x===N) {
				var n = parseInt(x) || 0;
				if (n<0) return N;
				var k = h.keys().sort();
				if (n>=k.length) n = k.length-1;
				var old = p.history[k[k.length-n-1]].clone(true);
				if (remove) {
					var newh = Object.extended();
					for (var i=0; i<k.length-n-1; i++) newh[k[i]] = h[k[i]];
					params.history = newh;
				}
				if (!silent) p.form.trigger(Ch);
				return old;
			}
		},
				
		build: function _buidControl ($o, $root, uiNode, selector) {
		//initializes control
			var rd = $root.my(), 
			p = (rd||{}).params, v, ui=uiNode;
			if (!rd) {f.con ("Failed to find $root building "+selector+" selector."); return $o}
			if ($o.size()) {
				
				// if we have manifest, retrieve it
				var subform;
				if (isO(ui.manifest)) subform = ui.manifest;				
				// ...and apply
				
				if (subform && isO(subform.ui) && isS(ui.bind)) {
					//decrypt bind link and check if we have one in .data
					var linked = f.getref(rd.data,ui.bind);
					if (isO(linked)) {
						try {$o.my(subform, linked)} catch (e) {}
					} else if (isA(linked) || ui.list){
						// we have list
						$o.addClass("my-form-list");
						
						//generate system fields
						var ltmpl="", lsel =">*"; 
						if (/^<.+>$/.test(ui.list)) ltmpl=ui.list;
						else lsel = ui.list||lsel;
						if (!ltmpl) {
							var $t0 = $o.find(lsel);
							if ($t0.size()) {
								ltmpl = $(ltmpl).append($t0.eq(0).clone(true)).html();
								$t0.eq(0).remove();
							} else ltmpl='<div></div>';
						}
						
						//mount data
						if (!$o.data("formlist")) $o.data("formlist",{})
						$o.data("formlist").listGen={manifest:subform, delay:(ui.delay||p.delay||10)/1.3, template:ltmpl, selector:lsel};					
					} else {
						try {$o.my(subform)} catch (e) {}
					}
				}
				
				// init if we have one
				if (ui.init!=N) f.prepare(ui.init,$o,rd);
				$o.each(function() {
					var $this = $(this), events = ui.events||f.traverse($this, mys.events);
					
					if (!$this.is(".my-form")) {				
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
							errors:rd.errors
						});
						uiNode._update = ui.delay?f.update.debounce(ui.delay):N;
					} else {
						$E($this.data("my"),{
							dui:ui,
							root:$root,
							selector:selector,
							dparams:p,
							devents:events,
							ddata:rd.data,
							container:p.container($this),
							derrors:rd.errors
						});
					}
					
					//special cleditor fix
					//thanks ima007@stackoverflow.com for concept
					if ($this.cleditor && $this.parent().is(".cleditorMain")) {
						var cledit = $this.cleditor()[0];
						if (cledit && cledit.$frame && cledit.$frame[0]) {	
							//mark as cleditor
							$this.addClass("my-cleditor");
							$E($this.data("my"), {container:p.container($this)});
							var cChange = function (v) {$this.val(v).trigger(Ch);}
							var cleditFrame, r = Number.random(1e5,1e6-1);
							//aux event handlers for cleditor instance
						    $(cledit.$frame[0]).attr("id","cleditCool"+r);
						    if (!document.frames) cleditFrame = $("#cleditCool"+r)[0].contentWindow.document;
						    else cleditFrame = document.frames["cleditCool"+r].document; 
						    var $ibody = $(cleditFrame).find("body");
						    $(cleditFrame).bind('keyup.my', function(){cChange($(this).find("body").html())});
						    $this.parent()
						    	.find("div.cleditorToolbar")
						    	.bind("click.my mouseup.my",function(){cChange($ibody.html())});
						    $("body").on("click", "div.cleditorPopup", function (){cChange($ibody.html())})    
						}
					}
					//redactor fix
					if ($this.is("div.redactor_box textarea")) 
						$this.getEditor().bind("input keyup blur",(function($o){$o.trigger("redactor")}).fill($this));
					//ace fix
					if ($this.is(".ace_editor"))
						ace.edit($o[0]).on(Ch,(function($o){$o.trigger("ace")}).fill($this));					
					//create debounced change handler
					$this.my()._changed = f.changed.debounce(uiNode.delay || p.delay);
					//bind events to the control
					$this.bind(events, function (evt) {
						if (evt.type==Ch) evt.stopPropagation();
						$this.my()._changed($this,$root,uiNode,p);
					});
				});
			} else f.con ("Not found "+selector+" selector.",$root);
			return $o;
		},
		
		changed: function _hasChanged ($this,obj,uiNode,p) {
			var d = $this.my(); if (d && !d.disabled) {
				/*if (!d.errors || d.errors.values().join("").length==0 && obj ) 
					obj.my().lastCorrect = $E(true, {}, d.ddata||d.data);*/
				f.history(d.ddata||d.data, d.dparams||d.params);
				var $we = obj.find(d.selector);
				var val0 = f.field($we,N);
				f.update($this,val0,uiNode.recalcDepth||p.recalcDepth);
				if (d.root.parent().is(".ui-sortable")) d.root.parent().trigger("check");
				if (p.change) p.change.call($this);
			}
		},
		
		prepare: function _prepareInit (init, $n, d) {
		//prepares init, applies data if its string template
		//or calls function
			var t = $.type(init);
			if (t==St) $n.html(init.assign(d.data));
			else if (t==Fu) init.apply(d.manifest||d, Array.prototype.slice.call(arguments,1));
			else if (t==Ar) {
				try {$n.formgen(init);} 
				catch(e){}
			}
			return $n;
		}
	};
	
	var methods = {
		  
		//######### INIT ##############
			
		init : function( data0, defaults ) { 
			var data;
			if (!data0) return this;
			if ($.type(defaults)=="object") data = $E(true,{},data0);
			else data = data0;
			var $root = this.eq(0), rd=$root.my();			
			if (isO(rd) && rd.id && rd.ui) {
				f.con ("$.my is already bind.",$root);
				$root.my("ui",data.ui);
				$root.my(Da,data.data);
				return $root;
			}
			
			//here we must unwind stringified fn and regexps defs
			//if we are not in strict mode
			if (!data.params || (data.params && !data.params.strict)) xjs(data);
			var manifest = $E(true,{},data);
			
			//####### default params, may be overriden #########
			
			var p = $E(true,{
					container:function ($o) {return f.traverse($o, mys.containers)($o)},
					change:N,
					recalcDepth:2,
					delay:0,
					strict:false,
					animate:0,
					errorMessage:"Incorrect input",
					errorBind:"Error during bind",
					errorTip:".my-error-tip",
					errorCss:"my-error",
					effect: function ($e, onoff, duration) {
						if (onoff) { $e.fadeIn(duration); return; }
						$e.fadeOut(duration);
					},
					remember:0,
					form:$root,
					history:Object.extended(),
					historyDelay:100 //delay in ms between subsequent calls of history()
				}, data.params||{}),
				ui = xui($E(true,{}, data.ui||{}), manifest),
				myid =  data.id || ("my"+Number.random(1e5,1e6-1)),
				d={};
			if (data.params && data.params.depth) p.recalcDepth=data.params.depth;
			
			//init data	
			
			if ($.type(defaults)=="object") {
				d = f.patch(defaults,data.data||{});
				data.data=d;
			} else d = data.data || {};
			
			
			
			//initialize
			if (data.init!=N) f.prepare(data.init,$root,data);
			
			$root.data("my", {
				id: myid,
				data:d, 
				params:p,
				errors:Object.extended(), 
				ui:Object.extended(ui),
			  	disabled:false,
			  	manifest:manifest
			});
			manifest.id = myid;
			
			$root.addClass("my-form");
			var formState={}
			for (var selector in ui) {
				var  $o = $root.find(selector);
				f.build($o, $root, ui[selector], selector);
				formState[selector]=f.field($o,N);
			}
			for (var selector in ui) {
				var  $o = $root.find(selector);
				if ($o.size()) {
					var uiNode = ui[selector];
					var v = f.bind(d, N, uiNode, $o);
					if (v!=N) f.field($o,v);
					else {
						try {
							if (formState[selector]!=N && v!==undefined) f.bind(d, formState[selector], uiNode, $o)
						} catch(e){}
					}
					$o.eq(0).trigger("check.my");
				} 
			};
			if (!$root.my()) return N;
			$root.my().initial = $E(true,{},d);
			
			forms[myid] = $root;
			if ($.mobile) $.mobile.changePage($.mobile.activePage);
			
			return $root;
		},
		
		//###### REDRAW ######
		
		redraw: function( noRecalc, silent) {
			var $x = this, d = $x.my();
			d.ui.each(function(key) {
				var $n = $x.find(key);
				f.update($n, noRecalc?N:undefined , d.params.recalcDepth);
				if (!noRecalc) {
					if ($n.is(".my-form")) $n.my("redraw");
					else $n.trigger("check.my");
				}
			});
			if (!silent && noRecalc) $x.trigger(Ch);
			return $x;
		},
		
		//###### SET OR RETRIEVE DATA ######
		
		data: function(data, noRecalc) {
			var $x = this;
			if (isO(data)) {
				$x.my().data = f.overlap($x.my().data, data);
				this.my("redraw", noRecalc);
			}
			return $x.my().data;
		},
		
		//###### RETURNS ERRORS ######
		
		errors: function() {
			var e0 = $(this).my().errors, e = {};
			for (var i in e0) {
				if (e0[i] && isS(e0[i])) e[i]=e0[i];
				if (isO(e0[i]) && Object.keys(e0[i]).length) e[i]=e0[i];
			}
			return e;
		},
		
		//###### RETURNS true IF FORM VALID ######
		
		valid: function (){return !Object.values($(this).my().errors).compact(true).length},
		
		//###### RESET INITIAL VALUES ######
		
		reset: function () {
			try {
				f.kickoff(this.my().data, this.my().initial);
				this.my("redraw");
			} catch (e) {return false;}
			return true;
		},
		
		//###### GET id OR SEARCH BY id ######
		
		id: function (id) {
			if (isS(id)) return forms[id]||N;
			else {
				var d = this.my();
				return (d && d.id)?d.id:N;
			}
		},
		
		//###### REMOVE jQuery.my INSTANCE FROM THE FORM ######
		
		remove: function (){	
			var $x = this;
			$x.my().ui.each(function(key) {
				var $obj = $x.find(key);
				$obj.unbind(".my").removeData("my");
			});
			var d = $x.my().data;
			$x.removeData("my").removeClass("my-form").unbind(".my");
			return d; //returns data collected by removed instance
		},
		
		//###### UNDO ######
		
		undo: function (steps){
			var $this = this, d = $this.my(), h = d.params.history, 
			k = h.keys().sort(), diff = 1*(parseInt(steps)||0);
			if (!k.length || diff<0) return N;		
			if (!d.params.errors || !d.params.errors.values().compact(true).length) {			
				if (h[k[k.length-1]].equals(Object.extended(d.data))) diff+=1;
			} else {
				if (!Object.extended(d.data).equals(Object.extended(d.lastCorrect))) diff+=1;
			}
			
			$this.my().data = Object.merge($this.my().data, f.history(diff, d.params, true)||{});
			$this.my("redraw");
			return $this.my().data;
		},
		
		//###### UI RUNTIME GETTER-SETTER ######
		
		ui: function (u) {
			var $x = this, d = $x.my(), a=[], i;
			if (!d) return N;
			var ui = $E(true, {}, d.ui);
			if ($.type(u)!=Ob) return d.ui;
			for (i in u) if (true || !ui[i]) a.push(i); //controls to (re)init
			d.ui = xui(f.overlap(d.ui,u));
			for (i=0;i<a.length;i++) f.build($x.find(a[i]), $x, d.ui[a[i]], a[i]);
			for (i in u) $x.find(i).eq(0).trigger("check");
			return d.ui;
		},
		
		//###### ENABLE-DISABLE FORM ######
		
		disabled: function (bool) {
			var $x = this, d = $x.my();
			if (!d) return undefined;
			if (bool==N) return d.disabled;
			if (!!bool) {
				//disable all controls
				for (var i in d.ui) {
					var $d = $x.find(i).eq(0), dn = $d.my();
					if (dn) dn.predisabled = dn.disabled;
					f.css(true, $d, ":disabled");
				}
				$x.addClass("my-disabled");
			} else {
				for (var i in d.ui) {
					var $d = $x.find(i).eq(0), dn = $d.my(), onOff = false;
					if (dn && dn.predisabled) onOff=true;
					f.css(onOff, $d, ":disabled");
				}
				$x.removeClass("my-disabled");
				$x.my("redraw");
			}
		},
		manifest: function (format) {return format=="json"?f.tojson(this.my().manifest):this.my().manifest},
		version: function () {return _version},
		history: function (a,c) {return f.history(a, this.my().params, c);},
		val: function (v) {return f.field(this, v)},
		container: function ($o) {return f.traverse($o, mys.containers)($o)}
	};
	
	if (!$.my) $.my={}; $.my.f=f; $.my.tojson=f.tojson; $.my.fromjson=f.fromjson; $.my.formgen = f.formgen; $.my.bolter=mys; 

	$.fn.my = function(method) {
		var form;
		if (method===undefined) return this.data("my");
		if (isS(method) && method.substr(0,1)=="{" ) {
			try{form = JSON.parse(method)}catch(e){}
			if (form) return methods.init.apply(this,[form].add(Array.prototype.slice.call(arguments, 1)));
		}
		if (methods[method]) return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method === Ob || !method ) return methods.init.apply(this,arguments);
		else $.error('Method '+ method+' does not exist on jQuery.my');
	}
	
	function xjs (node){ //recursively unwinds string def of funcs and regexps, modifies  source obj!
		for (var i in node) if (node.hasOwnProperty(i)) {
			var n = node[i], t = $.type(n);
			if (/^(ob|ar)/.test(t)) xjs(n);
			else if (t==St && /(^function\s\(|^new\sRegExp)/.test(n)) node[i]=eval('('+n+')');
		}
	}
	
	function xui (ui, manifest) { 
	//unwinds ui recalcs, short defs and watch hooks, modifies source obj!
		
		//move shorthand binds to bind attr
		Object.each(ui, function (i,v){
			var t = typeof v;
			if (/^str|^fu/.test(t)) ui[i] = {bind:v};
		});
		Object.each(ui, function (i,v){
			//correct ui definitions
			//with simplified syntax -- unfolding
			var t = typeof v;
			//unfold recalcs and watches
			var recalcs=[], list=[], watch=[], row , re=/\s?[,;]\s?/;
			if (v.recalc) {
				if (isS(v.recalc)) list = v.recalc.split(re);
				else if (isA(v.recalc)) list = v.recalc;
				list = list.compact(true).unique();
			}
			if (list.length) ui[i].recalc=list;
			if (v.watch) {
				if (isS(v.watch)) watch = v.watch.split(re);
				else if (isA(v.watch)) watch = v.watch.slice(0);
				watch = watch.compact(true).unique();
				for (var rr, j=0;j<watch.length;j++) if (row = ui[watch[j]]) {
					rr= row.recalc;
					if (!rr) row.recalc=[i];
					else if (isS(rr)) row.recalc+=","+i;
					else if (isA(rr) && rr.indexOf(i)==-1) row["recalc"].push(i);
				}
			}
			
			if (isO(manifest)) ["css","check","manifest","list"].each(function(elt){
				if (isS(v[elt])) {
					var ref = f.getref (manifest, v[elt]);
					if (ref!=null) v[elt]=ref; 
				}
			});
		});
		return ui;
	}	
})(jQuery);

// end $.my










//#############################################################################################

/*
 * jQuery.formgen 0.2
 * 
 * */

(function($){
	//Some shortcuts and constants
	var $E = $.extend, n = function (o) {return o!==null && o!==undefined;},  N = null, 
		Ob="object", Da="data", Ar = "array", St = "string", Fu="function", Ch = "change",
		isA = Object.isArray, isB = Object.isBoolean, isS = Object.isString, isO = Object.isObject,
		isN = Object.isNumber, isR = Object.isRegExp, isF = Object.isFunction;
	var iHead = '<input type="',
		iTail = ' {ext} ';
	var f = {
		tmpl:{
			num:iHead+'number" {ext}/>',
			inp:iHead+'text" {ext}/>',
			sli:iHead+'range" {ext}/>',
			dat:iHead+'date" {ext}/>',
			btn:iHead+'button" {ext}/>',
			div:'<div {ext}>{txt}</div>',
			spn:'<span {ext}>{txt}</span>',
			sel:'<select {ext}>{txt}</select>',
			mul:'<select {ext} multiple="multiple">{txt}</select>',
			txt:'<textarea {ext}>{txt}</textarea>',
			err:' <span class="my-error-tip {class}" style="{style}">{txt}</span>',
			msg:'<div class="my-error-tip {class}" style="{style}">{txt}</div>',
			val:function (p) {
				if (!isA(p.vals)) return "";
				var p0=$E({style:"",css:""},p);
				p0.txt=p.vals.reduce(function(a,b){return a+'<span class="my-shortcut" '
					+'onclick="$(this).parents(\'.my-row\').find(\'input,textarea\').val($(this).text()).trigger(\'blur\')">'+b+'</span> '}," ")
				return ('<span class="my-shortcuts {css}" style="{style}">{txt}</span>').assign(p0);
			},
			"":'<{_tag} {ext}>{txt}</{_tag}>'
		},
		txt:{
			sel:function(p) {
				if (!p.vals) return "";
				var obj = decrypt(p.vals);
				return Object.keys(obj).reduce(function(a,b){
					return a+'<option value="'+b+'">'+obj[b]+'</option>';
				},'');
			}
		},
		params:{
			styles:{num:"width:30%;", dat:"width:30%;", inp:"width:100%", 
					txt:"width:100%;max-width:100%;min-height:1px;word-break:break-word;", 
					err:"display:none",msg:"display:none"},
			alias: {number:"num",date:"dat",slider:"sli",textarea:"txt",input:"inp",
					span:"spn",select:"select",vals:"val"},
			row:"",
			rowTag:"div",
			rowCss:"my-row",
			label:"",
			labelTag:"span",
			labelCss:"my-label"					
		},
		
		defaults:{id:"","class":"",style:"",placeholder:"",value:"",rows:1},
		attnames:{css:"class",plc:"placeholder",val:"value",txt:"",vals:"",tip:"title"}
	}
		

	function chain(a,b,sys) {
		if (isS(b)) return a+b;
		if (isA(b) && b.length>1 && isS(b[1])) {
				
			var lbl = b[0],html="",key,type,a0,b0,i=1,j,p,tmpl,ext;
			
			//iterate through row's inside items
			while (i<b.length) {
				if (isS(b[i])) {
					b0 = b[i].replace(/\s/g,"");
					a0 = b0.split(/[\.#]/i);
					type=sys.alias[a0[0]]||a0[0];
					key = b0.substr(a0[0].length);
					if (/^[a-z0-9]+(#[a-z0-9\-_]+)?(\.[a-z0-9\-_]+)*$/i.test(b0)) {
						tmpl = f.tmpl[type] || f.tmpl[""];
						p={style:"","class":"",txt:""};ext="";
						
						//mount params over p
						var isExt = isO(b[i+1]);
						if (isExt) {
							i+=1; 
							for (j in b[i]) if (f.attnames[j]!=="") p[f.attnames[j]||j]=b[i][j];
						}
						//apply default styles-classes
						if (!p.style && !p["class"] && sys.styles[type]) p.style=sys.styles[type];
						if (!p.id && key.to(1)=="#") p.id=key.from(1).split(".")[0];
						if (!p["class"] && key.has(".")) p["class"]=(key.to(1)=="#"?key.substr(p.id.length+1):key).split(".").compact(true).join(" ");
						
						//combine attributes and others
						for (j in p) ext+=j+'="'+p[j]+'" ';
						if (isExt)	for (j in b[i]) if (f.attnames[j]==="") p[j]=b[i][j];
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
					+(sys.row?'style="width:'+sys.row+'; ':"")
					+(sys.label && lbl?'padding-left:'+sys.label+'; ':"")
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
					else obj[e.id||e.key||e.name||""]=(e.text||e.value||e.title||"")
					
				} else obj[e]=e+"";
			}
			elt=obj;
		} 
		if (isO(elt)) return elt;
		else return {};
	}
	
	function formgen (form, params){
		//find params in form if any
		if (isA(form)) {
			var sys = $E(true,{},f.params, params||{});
			for (var i in form) {
				if (isO(form[i])) sys = $E(true,sys, form[i]);
			}
			sys = $E(true,sys, params||{});
			var html = form.length?form.reduce(chain.fill(undefined,undefined,sys),''):"";
			return html;
		} else return "";
	}
	
	//return formgen;
	var methods={
		init: function (form, params) {
			return $(this).html(formgen(form, params));
		}
	}
	
	
	if (!$.my) $.my={};
	$.my.formgen = formgen;
	$.fn.formgen = function(method) {		
		if (methods[method]) return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method === 'object' || !method ) return methods.init.apply(this,arguments);
		else $.error('Method '+ method+' does not exist on jQuery.formgen');
	}
	
})(jQuery)
