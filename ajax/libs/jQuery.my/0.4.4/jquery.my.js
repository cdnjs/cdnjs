/*
 * jQuery.my 0.4.4 beta. 
 * -- added jQ UI .draggable() and .sortable() controls
 * -- each form can be a single control for other $.my form
 * 
 * (c) ermouth
 * See details at jquerymy.com
 * 
 * Requires jQuery 1.7.1+, SugarJS 1.2.5+
 * 
 */

;(function( $ ){

	//true if o is not null and not undefined
	var n = function (o) {return o!==null && o!==undefined;}
	var lang = "en";
	var forms = {};
	
	//storage of rules defined by cascading selectors
	//very similar to css, but leafs are some useful data 
	//for this type of node
	var mys = {
	
	//getter and setter functions for different types of nodes
	//########################################################	
		vals : {
		
	/**/	".my-form": function ($o, v) {
			//object is jQuery.my instance
				if ($o) return $o.my("data", v, true);
				else return v;
			},
				
	/**/	".hasDatepicker":function ($o,v) {
			//object has jQ UI datepicker		
				if(n(v)) $o.datepicker("setDate", f.date8601(v));
				return f.date8601($o.datepicker("getDate")||(new Date));
			},
			
	/**/	".ui-draggable": function ($o,v) {
				if (n(v) && $.type(v)=="object") {
					var c = {};
					if (!isNaN(v.left)) c.left = Number(v.left.ceil(2))+"px";
					if (!isNaN(v.top)) c.top = Number(v.top.ceil(2))+"px";
					if (c.left || c.top) $o.css(c);
				}
				var p = $o.position();
				return {left:(v&&v.left?v.left.ceil(2):p.left.ceil(2)), top:(v&&v.top?v.top.ceil(2):p.top.ceil(2))};
			},
			
	/**/	".ui-sortable": function ($o, list) {
				var a = [], sPlaceholder= ">div.ui-sortable-placeholder";
				if (n(list) && $.type(list)=="array" ) {
					if ($o.find("input:focus:eq(0)").size()!=0 || $o.find(sPlaceholder).size()!=0) return v;
					var w = {}, z={}, v = list.unique(); 
					var $c = $o.find($o.sortable("option","items"));
					$c.each(function () {w[JSON.stringify(f.extval($(this)))] = $(this);});
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
					if ($o.find(sPlaceholder).size()!=0) {
						var $c = $o.find($o.sortable("option","items"))
							.filter(":visible:not(:disabled, .ui-state-disabled, .ui-sortable-helper)");
						var $m = $o.find($o.sortable("option","items")).filter(".ui-sortable-helper");
						$c.each(function () {
							var $x = $(this);
							if ($x.is(".ui-sortable-placeholder")) a.push(f.extval($m));
							else a.push(f.extval($x));
						});
					} else {
						var $c = $o.find($o.sortable("option","items")).filter(":visible:not(:disabled, .ui-state-disabled)");
						$c.each(function () {a.push(f.extval($(this)));});
					}
				};
				return a;
			},
			
	/**/	"input[type=date]":function ($o,v) {
				//object is date
					var d = $o.val();
					if(n(v)) {
						d = f.date8601(v);
						if ($.type(d)=="string" && !d.has("Invalid")) {
							$o.val(d.to(10));
						} else if ($.type(d)=="date") {
							$o.val(f.date8601(d).to(10));
						}
					}
					var dn = (d!=""?Date.create(d):Date.create("$@#"));
					return dn;
			},
			
	/**/	"input,button":{
				"[type='text'],[type='number'],[type='hidden'],[type='password'],[type='button'],[type='range'],:not([type])":{
				//nearly all main input types and button
				
					".ui-slider-input": function ($o,v) {
					//input with jQ UI slider() applied
						if (n(v)) $o.val(v).slider("refresh");
					},
					
					".tagstrip input.value": function ($o,v) {
					//input of tagstrip() applied
						if (n(v)) $o.val(v).trigger("update");
					},
					
					"": function ($o,v) {
						if(n(v)) $o.val(v);
					}
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
						
						if (jqcheck) {
							$o.each(function(ind){
								var $x = $(this);
								if (pos!=ind && $x.is(":checked")) 
									$x.attr("checked",false).checkboxradio("refresh");
							});
						}
						
						if (pos>-1) {
							var $x = $o.eq(pos);
							if (!$x.is(":checked")) {
								$x.attr("checked",true);
								if (jqcheck) $x.checkboxradio("refresh");
							}
						} else if (!jqcheck) {
							$o.each(function(){ $(this).attr("checked",false)});
						}
					} 
					if (pos==-1) {
						for (var ind=0; ind<$o.size(); ind++) {
							if ($o.eq(ind).is(":checked")) pos=ind;
						};
					}
					return pos!=-1?$o.eq(pos).val():"";
				},
				
				":checkbox": function ($o, v0) {
				//checkbox
					var pos = -1, v = v0, a = [], k = {};
					if (n(v)) {	
						if ($.type(v) != "array") v = [v0];
						$o.each(function(ind) {
							var $x = $(this), val = $x.val(), on = $x.is(":checked")
							if (v.indexOf(val)!=-1) {
								a.push(val);
								if (!on) $x.attr("checked", true);
							} else if (on) $x.attr("checked", false);
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
						//now ditinguish between jQ selectmenu plugin
						//and jQ Mobile
							if ($o.selectmenu("option").theme!=null) $o.selectmenu("refresh",true);
							else {
								$o.find("option").each(function(i){
									var $x = $(this);
									if (f.extval($x) == v) $o.selectmenu("value",i);
								})
							}						
						}
					}	
				}
			},
			
	/**/	"textarea": function ($o,v) {
				if(n(v)) $o.val(v); 
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
						var jon = null; 
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
		
		
	//edifferent controls vents to watch for 
	//########################################################
		
		events: {
			".my-form":"change.my check.my",
			".ui-slider":"slide.my check.my",
			".ui-sortable":"sortchange.my sortupdate.my check.my",
			".ui-draggable":"drag.my dragstop.my check.my",
			"img, a, .pseudolink, input[type=button], button, :radio, :checkbox": "click.my check.my ",
			".ui-buttonset,input, select, textarea": "blur.my input.my change.my check.my"+($.browser.msie?" keyup.my":""),
			"":"check.my"
		},
		
	//container retriving functions for different controls
	//########################################################
		
		containers :{
			"*[data-role='fieldcontain'] *":{ //jQuery Mobile
				"input, textarea, select, button, :radio": function ($o) {
					return $o.parents('[data-role="fieldcontain"]').eq(0);
				}
			}, 
			".tagstrip *.value": function ($o){ //$.tagstrip()
				return $o.parents('.tagstrip').eq(0);
			},
			".hasDatepicker, .ui-widget, input, textarea, select, button" : function ($o) { //inputs
				return $o.parents('div,span,a,p,form,fieldset,li,td,th,h1,h2,h3,h4,h5,h6').eq(0);
			},
			"": function ($o) {return $o}
			
		}
	};
	
	var f = {
		//helpers
		con: function () {try {console.log (arguments);} catch (e) {}},
		clone: function (o) {return o.clone?o.clone():o},
		extval: function ($x) { 
			var d = $x.data("my"); if (d&&d.data) return d.data;
			return $x.data("value")||$x.val()||$x.text()||$x.html()||"";
		},
		overlap: function (o1, o2) {
			return Object.merge(o1, o2, false, function(key, a, b) {
				if ($.type(b)!="object") return b;
				else return Object.merge(a,b,false);
			});
		},
		
		field: function ($o, v) {
		//gets or sets the value of $o control
		//selects appropriate function for setting-retrieving
		//and attaches it to $o.data("myval");
			if (!$o.data("myval")) {
			//finding appropriate function and caching it
				var fval = f.traverse ($o, mys.vals);
				if (typeof fval=="function") {
					var r = fval($o, null);
					if (r===undefined) {
					//if function returns undefined we use .val() by default
						$o.data("myval", (function ($o, v) {
							if (v!=null) fval($o, v);
							return $o.val();
						}).fill($o, undefined)); //currying
					} else {
						$o.data("myval", fval.fill($o,undefined)); //again currying
					}
				}
			}
			var fn = $o.data("myval");
			if (typeof fn =="function") {
				var r = fn();
				if (r!=v) r = fn(v);
				return r;
			} else return null;		
		},
		
		traverse: function ($o, rules) {
		//traverses tree of rules to find  
		//first sprig with selector matching $o.
		//returns match or null
			var fval = null, flevel=0, fselector="";
			
			function traverse (os,level) {
				for (var i in os) {
					if (i!="" && $o.is(i)) {
						fselector = fselector+ (fselector?" ### ":"") + i;
						var otype = $.type(os[i]);
						if ( !(/^(null|undefined|object)/).test($.type(os[i])) && level>flevel) {
							fval=os[i]; flevel = level; return;
						} else if (otype=="object") {	
							traverse (os[i], level+1); //recursion down
						}
					}
				}
				if (os[""]!=null && typeof os[""]!="object" && level>flevel)  {
					fval=os[""]; flevel = level; 
				}
			}
			traverse (rules,1);
			return fval;		
		},
		
		
		bind: function (data, val, uiNode, $formNode) { 
		//sets or retrieves data using bind function		
			var bind = uiNode.bind;
			if (typeof bind == "function") {
				return bind(data,val,$formNode);
			} else if (typeof bind == "string") {
				if (val!=null) data[bind] = val;
				else if (data[bind]===undefined) data[bind] = null;
				return data[bind];
			}
			return null;
		},
		
		date8601:function(d) {
		//service function for converting dates from different formats to ISO 8601
			if (typeof d == "number" || !isNaN(d) && parseInt(d)==d) return (new Date(parseInt(d)));
			if (typeof d=="string") return Date.create(d, lang);
			if ($.type(d)=="date" || d==null) return Date.create(d, lang).format("{yyyy}-{MM}-{dd}T{HH}:{mm}{isotz}");	
			return (new Date);
		},
		
		isOut:function (data,val, uiNode, $formNode) {
		//checks if val is inconsistent for uiNode pattern			
			var pat = uiNode.check;
			if (pat != null) {
				var err = uiNode["error"]||$formNode.data("my").root.data("my").params.errorMessage||"Error";
				switch($.type(pat)){
					case "function": return pat(data,val, $formNode);
					case "regexp":return ( (pat.test(String(val))) ? "":err );
					case "array": return ( (pat.indexOf(val)>-1)?"":err);				
					case "string": return (val==pat?"":err);
					case "object":  return pat[val]?"":err;	
				}
				return err;
			} else {
				return "";
			}
		},
		
		
		update:function ($o, value, depth) {
			var $this = $o, xdata = $this.data("my"), err="Unknown error";
			
			if (xdata) {
				if ($o.hasClass("my-form")) {
					var $root = xdata.droot, $box = $o;
					var selector = xdata.dselector, d = xdata.ddata, oui = xdata.dui;
					var p =  xdata.dparams, ui = $root.data("my").ui;
					var $we = $root.find(selector);
				} else {
					var $root = xdata.root, $box = xdata.container;
					var selector = xdata.selector, d = xdata.data, oui = xdata.ui;
					var p =  xdata.params, ui = $root.data("my").ui;
					var $we = $root.find(selector);
				}
				
				
				if (value!=null) {
					var val = value;
				} else {
					val = f.field($we,f.bind(d,null,oui,$we));
				}
				
				//validating and storing if correct
				//applying or removing error styles
				try {
					var err = f.isOut(d,val,oui, $we);
				} catch (e) {
					f.con ("Error "+ e.name+" validating "+selector );
				};
				var ec = p.errorCss;
				var jqec = "ui-state-error";
				if (err=="") {
					xdata.errors[selector]= "";
					if (value!=null) {
						val = f.field($we,f.bind(d,value,oui,$we));
					}
					p.effect($box.removeClass(ec).find(p.errorTip), false ,(p.animate/2));
					$this.removeClass(jqec); $this.find(".ui-widget").removeClass(jqec)
				} else {
					xdata.errors[selector]= err;
					p.effect($box.addClass(ec).find(p.errorTip).addClass(ec).html(err), true, p.animate);	
					if ($this.is(".hasDatepicker")) {
						if ($this.is("input")) $this.addClass(jqec);
						else $this.find(".ui-widget").addClass(jqec);
					}
					if ($this.is(".ui-slider")) $this.addClass(jqec);
				}
				
				//applying conditional formatting if any
				var cssval = (value==null?val:value);
				if (oui.css) {
					for (var css in oui.css) {
						var oc = oui.css[css];
						if (Object.isRegExp(oc)) {
							if (oc.test(cssval)) $box.addClass(css); 
							else $box.removeClass(css);
						} else if (Object.isFunction(oc)) {
							if (oc(d,cssval,$we)) $box.addClass(css); 
							else $box.removeClass(css);
						}
					}
				}
				
				//recalculating dependent fields
				if (depth && oui.recalc) {
					var list = oui.recalc, dest = [], once = {};
					if (Object.isString(list)) list = list.split(",");				
					if (Object.isArray(list)) {
						for (var i in list) {
							if (list[i] && $.type(list[i])=="string") {
								var item = list[i].compact();
								if (ui[item]) {
									if (ui[item].recalc) {
										if (dest.indexOf(item)==-1) dest.push(item);
									} else once[item]=true;
								}
							}
						};
						for (var i=0; i<dest.length; i++) {
							once = $.extend(true, once, f.update($root.find(dest[i]),null,depth-1));
						}
						if (value!==null) { // here is a trick -- we may call f.update ($o, undefined, 1)
											// and force update if we want only retrieve
							for (i in once) {
								if (once[i]===true && i!=selector) f.update($root.find(i),null,depth-1);
							}
							return {};
						}
					}
				}
				return once||{};
			}
		},
		
		history: function (x, params, remove, silent) {
		// push or retrieves current state to history,
		//if x is object, pushes it's clone to history with timestamp,
		//if x is null or 0 returns last pushed state,
		//if x is a positive num, returns push state x steps back
		//if remove is true, removes the retrieved state if x is num
		//or replaces last element in history if x is object.
		//params is a reference to params object of $.my instance
			
		//if object is passed return this object if ok or null if 
		//last elt in history is egal to object passed
			
			var p = params;
			if ($.type(p)!="object" || isNaN(p.remember) || $.type(p.history)!="object") return null;
			var h = p.history;
			var l = p.remember;
			
			if ($.type (x) == "object") {
				var step = Object.extended($.extend(true,{},x));
				var time = (new Date).valueOf();
				var k = h.keys().sort();
				if (k.length>0 && time-k[k.length-1]< p.historyDelay) return null;
				if (k.length>0 && h[k[k.length-1]].equals(step)) return null;
				p.history[time] = step; k.push(time);
				if (k.length >= l*2) {
					var newh = Object.extended();
					for (var i=l; i<l*2; i++) newh[k[i]] = h[k[i]];
					params.history = newh;
				}
				if (!silent) p.form.trigger("change");
				return p.history[k[k.length-1]];
			}
			
			if (!isNaN(x) || x===null) {
				var n = parseInt(x) || 0;
				if (n<0) return null;
				var k = h.keys().sort();
				if (n>=k.length) n = k.length-1;
				var old = p.history[k[k.length-n-1]].clone(true);
				if (remove) {
					var newh = Object.extended();
					for (var i=0; i<k.length-n-1; i++) newh[k[i]] = h[k[i]];
					params.history = newh;
				}
				if (!silent) p.form.trigger("change");
				return old;
			}
		}
	};
	
	var methods = {
		  
		//######### INIT ##############
			
		init : function( data ) { 
			var obj = this.eq(0);
			if (!data) return this;
			if (Object.isObject(obj.data("my")) && obj.data("my").id && obj.data("my").ui) {
				f.con ("$.my is already bind!");
				return obj;
			}
			
			//####### default params, may be overriden #########
			
			var p = $.extend(true,{
				getContainer:function ($o) {return f.traverse($o, mys.containers)($o)},
			  	change:function() {},
			  	recalcDepth:2,
			  	delay:0,
			  	animate:0,
			  	errorMessage:"Incorrect input!",
			  	errorTip:".my-error-tip",
			  	errorCss:"my-error",
			  	effect: function ($e, onoff, duration) {
			  		if (onoff) { $e.fadeIn(duration); return; }
			  		$e.fadeOut(duration);
			  	},
			  	oninit:function(){},
			  	remember:100,
				form:obj,
			  	history:Object.extended(),
			  	historyDelay:100 //delay in ms between subsequent calls of history()
			  }, data.params||{}) ;
			
			var ui = $.extend(true,{}, data.ui||{}) ;
			
			var myid =  data.id || ("my"+Number.random(100000000,999999999));
						
			var d = data.data || {};
			obj.data("my", {
				id: myid,
				data:d, 
				params:p,
				errors:Object.extended(), 
				ui:Object.extended(ui)
			});
			
			obj.bind("check.my",function (){$(this).my("redraw")});
			
			for (var i in ui) {
				var  o = $(this).find(i);
				var dui = ui[i];
				if (o.size()>0) {
					var v;
					o.each(function() {
						var $this = $(this);
						var $o = o;
						var events = dui.events||f.traverse($this, mys.events);
						
						var form = !!$this.is(".my-form")
						
						if (!form) {				
							$this.data("my",{
								events:events,
								selector:i,
								initial:v,
								previous:v,
								root:obj,
								container:p.getContainer($this),
								id:myid,
								ui:dui,
								data:d,
								params:p,
								errors:obj.data("my").errors
							})
						} else {
							$.extend($this.data("my"),{
								dui:dui,
								droot:obj,
								dselector:i,
								dparams:p,
								devents:events,
								ddata:d
							});
						}
						$this.bind(events, (function(){
							var d = $this.data("my");
							if (!d.errors || d.errors.values().join("").length==0) 
								obj.data("my").lastCorrect = $.extend(true, {}, d.ddata||d.data);
							f.history(d.ddata||d.data, d.dparams||d.params);
							var $we = obj.find(d.dselector||d.selector);
							var val0 = f.field($we,null);
							f.update($this, 
									val0, 
									dui.recalcDepth||p.recalcDepth);
							if (d.root.parent().is(".ui-sortable")) d.root.parent().trigger("check");
							p.change();
						}).debounce(dui.delay || p.delay));
					});
				} else {
					f.con ("Not found "+i+" selector at form "+myid);
				}
			}
			for (var i in ui) {
				var  o = $(this).find(i);
				if (o.size()>0) {
					var dui = ui[i];
					var v = f.bind(d,null,dui,o);
					if (v!=null) {
						f.field(o,v);
					} 
					o.eq(0).trigger("check");
				}
			};
			if (!obj.data("my")) return null;
			obj.data("my").initial = $.extend(true,{},d);
			obj.addClass("my-form");
			forms[myid] = obj;
			if ($.mobile) $.mobile.changePage($.mobile.activePage);
			
			return obj;
		},
		
		//###### REDRAW ######
		
		redraw : function( noRecalc, silent) {
			var $x = this;
			$x.data("my").ui.each(function(key) {
				f.update($x.find(key), noRecalc?null:undefined , $x.data("my").params.recalcDepth)
			});
			if (!silent) $x.trigger("change");
			return $x;
		},
		
		//###### SET OR RETRIEVE DATA ######
		
		data: function(data, silent) {
			var $x = this;
			if ($.type(data)=="object") {
				$x.data("my").data = f.overlap($x.data("my").data, data);
				this.my("redraw", null, silent);
			}
			return $x.data("my").data;
		},
		
		//###### RETURNS ERRORS ######
		
		errors: function() {
			var e0 = $(this).data("my").errors, e = {};
			for (var i in e0) {
				if (e0[i] && typeof e0[i] == 'string') e[i]=e0[i];
			}
			return e;
		},
		
		//###### RESET INITIAL VALUES ######
		
		reset: function () {
			try {
				this.data("my").data = Object.merge(this.data("my").data, this.data("my").initial);
				this.my("redraw");
			} catch (e) {return false;}
			return true;
		},
		
		//###### GET id OR SEARCH BY id ######
		
		id: function (id) {
			if (typeof id == "string") {
				return forms[id]||null;
			} else {
				var d = this.data("my")
				if (d && d.id) {
					return d.id;
				} else {
					return null;
				}
			}
		},
		
		//###### REMOVE jQuery.my INSTANCE FROM THE FORM ######
		
		remove: function (){
		//returns data collected by removed instance
			var $x = this;
			$x.data("my").ui.each(function(key) {
				var $obj = $x.find(key);
				$obj.unbind(".my").removeData("my");
			});
			var d = $x.data("my").data;
			$x.removeData("my").removeClass("my-form").unbind(".my");
			return d;
		},
		
		//###### UNDO ######
		
		undo: function (steps){
			var $this = this;		
			var d = $this.data("my");
			var h = d.params.history;
			var k = h.keys().sort();
			var diff = 1*(parseInt(steps)||0);
			if (k.length==0 || diff<0) return null;		
			
			if (!d.params.errors || d.params.errors.values().compact(true).length==0) {			
				if (h[k[k.length-1]].equals(Object.extended(d.data))) diff+=1;
			} else {
				if (!Object.extended(d.data).equals(Object.extended(d.lastCorrect))) diff+=1;
			}
			
			$this.data("my").data = Object.merge($this.data("my").data, f.history(diff, d.params, true)||{});
			$this.my("redraw");
			return $this.data("my").data;
		},
		
		history: function (a,c) {return f.history(a, this.data("my").params, c);},
		val: function (v) {return f.field(this, v)},
		cont: function ($o) {return f.traverse($o, mys.containers)($o)}
	};

	$.fn.my = function( method ) {
		
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.my' );
		}
	};

})( jQuery );