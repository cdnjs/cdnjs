/*
 * jQuery.my 0.7.3
 * Requires jQuery 1.8.1–1.8.3, SugarJS 1.3.7–1.3.8
 * 		 or jQuery 1.9.0+, SugarJS 1.3.9+
 * 
 * Changes:
 * – code size reduced
 * – added jQuery 1.9.0 compatibility
 * – added jQuery UI 1.10
 * – Redactor container retrieval bug fixed
 * – obsolete jQuery methods removed
 * 
 * See more details at jquerymy.com
 * 
 * (c) ermouth 
 * 2013-01-29
 */

;(function($) {var _version = "jQuery.my 0.7.3";
	
	//Some shortcuts and constants
	var $e = $.extend, n = function (o) {return o!==null && o!==undefined;}, 
		lang = "en", forms = {}, d8="{yyyy}-{MM}-{dd}", N = null, 
		Ob="object", Da="data", Ar = "array", St = "string", Fu="function", Ch = "change";
	
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
					if (typeof v==St) $o.tags(Da,[v]);
					else if ($.type(v)==Ar) $o.tags(Da,v);
				}
				return $o.tags(Da);
			},
			
	/**/	".ui-draggable": function ($o,v) {
			//object is jQ UI draggable
				if (n(v) && $.type(v)==Ob) {
					var c = {};
					if (!isNaN(v.left)) c.left = Number(v.left.ceil(2))+"px";
					if (!isNaN(v.top)) c.top = Number(v.top.ceil(2))+"px";
					if (c.left || c.top) $o.css(c);
				}
				var p = $o.position();
				return {left:(v&&v.left?v.left.ceil(2):p.left.ceil(2)), top:(v&&v.top?v.top.ceil(2):p.top.ceil(2))};
			},
			
	/**/	".ui-sortable": eval("("+eval(eval((function(){var Y,$,_='\'\\"Z$oRLDH7a<[]R`</8/R`6= />./+`+/-p6/R$c%4?n(LX&& $.type(L)==Ar D7w<{}Rz={}Rv<L.uniquek; HH?@/input:focus:eq(0)/)C || @`6)CX^v4*w[FQB))]<$B}Ifor (Yi=v.length-1; i>=0; i--D7j<FvUI?w[j]DHw[j].prependTo($o).showk;z[j]=true4?a.indexOf(vU)==-1X_vUI}H}4a=a.reverse(Ifor (i in wX?!zUXwU.hidekE{7$p<@`6)R$q<$o.eq(0I?$pCDHHH?9] !5D7$c<$c2RV)/IY$m%WV/I*7$x<$B4?$x.is(/.8-p6/)D3m));}Helse 3x)I}IH9] 549+/1/]<aEa<9+/1/]4?a==nullX*3B))})E{7$c%2)/I*3B));}I}H}4^a4}\\"\'#\\\\%<@$o.sortM(/opK/,/items/))*$c.each(ZD/#\\"2W:visible:not(:disMdR.ui-state-disMd3_Q4;H5= Gleft+//+Gtop6laceholder7HY8ui-sortM9$q.myk[`< = ?if (@$o.find(B(this)C.sizek!=0DX{E4} else FJSON.stringify(G$p.posiKk.H#nI)4KtionLlistMableQf.extval($R, U[i]V.8-helperW.filter(/X) Yvar ZfuncK (^return _a.push(`sPk()';for(Y=0;$='k`_^ZYXWVURQMLKIHGFEDCB@?<98765432/*%#'[Y++];)with(_.split($))_=join(pop());return _})()))+")"),
			//The above code is jscrush compressed code commented below
			/*function ($o, list) {
				//jQ UI sortable
				var a = [], sP = "ui-sortable", sPlaceholder= ">."+sP+"-placeholder", $c = $o.find($o.sortable("option","items"));
				if (n(list) && $.type(list)==Ar ) {
					var w = {}, z={}, v = list.unique(); 				
					//return list passed if some field has focus of dragging taking place
					if ($o.find("input:focus:eq(0)").size()!=0 || $o.find(sPlaceholder).size()!=0) return v;	
					$c.each(function () {w[JSON.stringify(f.extval($(this)))] = $(this)});
					for (var i=v.length-1; i>=0; i--) {
						var j = JSON.stringify(v[i]);
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
			},*/
			
	/**/	"input[type=date]":function ($o,v) {
				//object is date input
				if(n(v)) {
					if (v!="") d = Date.create(v).format(d8); else d = "";
					if ($.type(d)==St && !d.has("Invalid")) $o.val(d);
					return d;
				}
				var d = $o.val();
				return (d!=""?Date.create(d).format(d8):"");
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
						if (n(v)) $o.select2("val", (($.type(v)==Ar)?v:[v]));
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
						if (n(v)) $o.select2("val", (($.type(v)==Ar)?v:[v]));
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
			".ui-sortable":"sortchange.my sortupdate.my check.my",
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
			return Object.merge(o1, o2, false, function(key, a, b) {
				if ($.type(b)!=Ob) return b;
				else return Object.merge(a,b,false);
			});
		},
		kickoff: function(a,b) {
			//replaces a content with b content;
			for (var i in a) {
				if (b[i]===undefined) delete a[i];
				else a[i] = b[i];
			}
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
				if (tab&&(typeof tab==St)) {tl=String(tab).length;xt = String(tab).repeat(10)}
				switch((typeof w).substr(0,3)){
					case'str': return fj(w);case'num':return isFinite(w)?'"'+String(w)+'"':'null';
					case'boo':case'nul':return String(w); 
					case'fun':return fj(w.toString().replace(/^(function)([^\(]*)(\(.*)/,"$1 $3").replace(/(})([^}]*$)/,'$1'));
					case'obj':if(!w) return'null';
					if(typeof w.toJSON===Fu) return s2(w.toJSON(),ctab+(tab?1:0),tab);
					a=[];
					if(Object.isArray(w)){
						for(i=0;i<w.length;i+=1){a.push(s2(w[i],ctab+(tab?1:0),tab)||'null')}
						return'['+a.join(','+(tab?"\n"+xt.to(ctab*tl+tl):""))+']';
					}
					for(k in w) if (typeof k==St) {
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
		
		field: function ($o, v) {
		//gets or sets the value of $o control
		//selects appropriate function for setting-retrieving
		//and attaches it to $o.data("myval");
			var fn = $o.data("myval");
			if (!fn) {
			//finding appropriate function and caching it
				var fval = f.traverse ($o, mys.vals);
				if (typeof fval==Fu) {
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
			if (typeof fn ==Fu) {
				var r = fn();
				if (r!=v || $.type(v)==Ob) r = fn(v);
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
			return function ($o, rules) {
				fval = N; flevel=0; fselector="";
				go ($o,rules,1);
				return fval;
			}
		})(),
		
		
		bind: function (data, val, uiNode, $formNode) { 
		//sets or retrieves data using bind function		
			var bind = uiNode.bind, i, path=[], ptr, preptr, bt = $.type(bind);
			if (bt == Fu) {
				return bind(data,val,$formNode);
			} 
			if (bt == St || bt == Ar) {
				if (bt == St && !/\./.test(bind)) {
					//index is flat
					if (val!=N) data[bind] = val;
					else if (data[bind]===undefined) data[bind] = N;
					return data[bind];
				}
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
		
		isOut:function (data,val, uiNode, $formNode) {
		//checks if val fails to meet uiNode.check condition			
			var pat = uiNode.check;
			if (pat != N) {
				var err = uiNode["error"]||$formNode.my().root.my().params.errorMessage||"Error";
				switch($.type(pat).to(1)){
					case "f": 	return pat(data,val, $formNode);
					case "r":	return ( (pat.test(String(val))) ? "":err );
					case "a": 	return ( (pat.indexOf(val)>-1)?"":err);				
					case "s": 	return (val==pat?"":err);
					case "o":  	return pat[val]?"":err;	
				}
				return err;
			} else {
				return "";
			}
		},
		
		css: function (onOff, $we, css0) {
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
		
		update:function ($o, value, depth) {
		//validates and updates field and all dependent fields, 
		//applies conditional formatting
			var $this = $o, xdata = $this.my(), err="Unknown error";
			
			if (xdata) {
				var  selector = xdata.selector, $root = xdata.root, $we = $root.find(selector), ui = $root.my().ui, isform = $o.hasClass("my-form");
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
					if (err=="") {
						xdata.errors[selector]= "";
						if (value!=N) val = f.field($we,f.bind(d,value,oui,$we));
						$box.removeClass(ec);
						if (!isform) p.effect($box.find(p.errorTip), false ,(p.animate/2));
						$this.removeClass(jqec); $this.find(".ui-widget").removeClass(jqec)
					} else {
						xdata.errors[selector]= err;
						$box.addClass(ec);
						if (!isform) p.effect($box.find(p.errorTip).addClass(ec).html(err), true, p.animate);	
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
						if (Object.isRegExp(oc)) f.css (oc.test(cssval), $we, css); 
						else if (Object.isFunction(oc)) f.css (oc(d,cssval,$we), $we, css); 
					}
				}
				
				//recalculating dependent fields
				var i, list = oui.recalc, dest = [], once = {}, item;
				
				if (depth && oui.recalc &&  $root.my()) {
					for (var ui = $root.my().ui, i=0;i<list.length;i++) {
						if (list[i] && $.type(list[i])==St && (item = list[i].compact()) && ui[item]) {
							if (ui[item].recalc) {
								if (dest.indexOf(item)==-1) dest.push(item);
							} else once[item]=true;
						}
					};
					for (i=0; i<dest.length; i++) once = $e(true, once, f.update($root.find(dest[i]),N,depth-1));

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
		
		history: function (x, params, remove, silent) {
		// push or retrieves current state to history,

			var p = params;
			if ($.type(p)!=Ob || isNaN(p.remember) || $.type(p.history)!=Ob) return N;
			var h = p.history, l = p.remember;
			
			if ($.type (x) == Ob && l) {
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
		
		build: function ($o, $root, uiNode, selector) {
		//initializes control
			var rd = $root.my(), p = rd.params, v;
			if ($o.size()) {
				if (uiNode.init!=N) f.prepare(uiNode.init,$o,rd);  //init node
				$o.each(function() {
					var $this = $(this), events = uiNode.events||f.traverse($this, mys.events);
					
					if (!$this.is(".my-form")) {				
						$this.data("my",{
							events:events,
							selector:selector,
							initial:v,
							previous:v,
							root:$root,
							container:p.container($this),
							id:rd.id,
							ui:uiNode,
							data:rd.data,
							params:p,
							errors:rd.errors
						});
						uiNode._update = uiNode.delay?f.update.debounce(uiNode.delay):N;
					} else {
						$e($this.data("my"),{
							dui:uiNode,
							root:$root,
							selector:selector,
							dparams:p,
							devents:events,
							ddata:rd.data,
							container:p.container($this)
						});
					}
					
					//special cleditor fix
					//thanks ima007@stackoverflow.com for concept
					if ($this.cleditor && $this.parent().is(".cleditorMain")) {
						var cledit = $this.cleditor()[0];
						if (cledit && cledit.$frame && cledit.$frame[0]) {	
							//mark as cleditor
							$this.addClass("my-cleditor");
							$e($this.data("my"), {container:p.container($this)});
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
						ace.edit($("#ace")[0]).on(Ch,(function($o){$o.trigger("ace")}).fill($this));					
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
		
		changed: function ($this,obj,uiNode,p) {
			var d = $this.my(); if (d && !d.disabled) {
				if (!d.errors || d.errors.values().join("").length==0 && obj ) 
					obj.my().lastCorrect = $e(true, {}, d.ddata||d.data);
				f.history(d.ddata||d.data, d.dparams||d.params);
				var $we = obj.find(d.selector);
				var val0 = f.field($we,N);
				f.update($this,val0,uiNode.recalcDepth||p.recalcDepth);
				if (d.root.parent().is(".ui-sortable")) d.root.parent().trigger("check");
				if (p.change) p.change.call($this);
			}
		},
		
		prepare : function (init, $n, d) {
			var t = $.type(init);
			if (t==St) $n.html(init.assign(d));
			if (t==Fu) init.apply($n, Array.prototype.slice.call(arguments,1));
			return $n;
		}
	};
	
	var methods = {
		  
		//######### INIT ##############
			
		init : function( data, defaults ) { 
			if (!data) return this;
			var $root = this.eq(0), rd=$root.my();			
			if (Object.isObject(rd) && rd.id && rd.ui) {
				f.con ("$.my is already bind.",$root);
				$root.my("ui",data.ui);
				$root.my(Da,data.data);
				return $root;
			}
			
			//here we must unwind stringified fn and regexps defs
			//if we are not in strict mode
			if (!data.params || (data.params && !data.params.strict)) xjs(data);
			var manifest = $e(true,{},data);
			if (data.init!=N) f.prepare(data.init,$root,data);
			
			//####### default params, may be overriden #########
			
			var p = $e(true,{
					container:function ($o) {return f.traverse($o, mys.containers)($o)},
					change:N,
					recalcDepth:2,
					delay:0,
					strict:false,
					animate:0,
					errorMessage:"Incorrect input!",
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
				ui = $e(true,{}, data.ui||{}),
				myid =  data.id || ("my"+Number.random(1e5,1e6-1)),
				d = data.data || {};
			ui = xui(ui);
			if ($.type(defaults)==$.type(d)) $e(d, defaults);
			$root.data("my", {
				id: myid,
				data:d, 
				params:p,
				errors:Object.extended(), 
				ui:Object.extended(ui),
			  	disabled:false,
			  	manifest:manifest
			});
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
					if (v!=N) f.field($o,v);				//######## check this!
					else {
						try {if (formState[selector]!=N) f.bind(d, formState[selector], uiNode, $o)} catch(e){}
					}
					$o.eq(0).trigger("check.my");
				} 
			};
			if (!$root.my()) return N;
			$root.my().initial = $e(true,{},d);
			
			forms[myid] = $root;
			if ($.mobile) $.mobile.changePage($.mobile.activePage);
			
			return $root;
		},
		
		//###### REDRAW ######
		
		redraw : function( noRecalc, silent) {
			var $x = this, d = $x.my();
			d.ui.each(function(key) {f.update($x.find(key), noRecalc?N:undefined , d.params.recalcDepth)});
			if (!silent) $x.trigger(Ch);
			return $x;
		},
		
		//###### SET OR RETRIEVE DATA ######
		
		data: function(data, silent) {
			var $x = this;
			if ($.type(data)==Ob) {
				$x.my().data = f.overlap($x.my().data, data);
				this.my("redraw", N, silent);
			}
			return $x.my().data;
		},
		
		//###### RETURNS ERRORS ######
		
		errors: function() {
			var e0 = $(this).my().errors, e = {};
			for (var i in e0) {
				if (e0[i] && typeof e0[i] == St) e[i]=e0[i];
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
			if (typeof id == St) return forms[id]||N;
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
			var ui = $e(true, {}, d.ui);
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
	
	if (!$.my) $.my={}; $.my.f=f; $.my.tojson=f.tojson; $.my.fromjson=f.fromjson; $.my.bolter=mys;

	$.fn.my = function(method) {
		if (method===undefined) return this.data("my");
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
	
	function xui (ui) { //unwinds ui recalcs, short defs and watch hooks, modifies source obj!
		$.each(ui, function (i,v){
			//correct ui definitions
			//with simplified syntax -- unfolding
			var t = typeof v;
			if (/^str|^fu/.test(t)) ui[i] = {bind:v};
			//unfold recalcs and watches
			var recalcs=[], list=[], watch=[], row , re=/\s?[,;]\s?/;
			if (v.recalc) {
				if (typeof v.recalc == St) list = v.recalc.split(re);
				else if ($.type(v.recalc)==Ar) list = v.recalc;
				list = list.compact().unique();
			}
			if (list.length) ui[i].recalc=list;
			if (v.watch) {
				if (typeof v.watch == St) watch = v.watch.split(re);
				else if ($.type(v.watch)==Ar) watch = v.watch.slice(0);
				watch = watch.compact().unique();
				for (var rr, j=0;j<watch.length;j++) if (row = ui[watch[j]]) {
					rr= row.recalc;
					if (!rr) row.recalc=[i];
					else if (typeof rr == St) row.recalc+=","+i;
					else if ($.type(rr) == Ar && rr.indexOf(i)==-1) row["recalc"].push(i);
				}
			}
		});
		return ui;
	}	
})(jQuery);