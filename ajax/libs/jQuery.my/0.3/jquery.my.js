/*
 * jQuery.my 0.3 beta. 
 * -- added undo
 * -- jQuery UI slider, buttonset and datepicker 
 *    are now recognized
 * 
 * (c) ermouth
 * See details at jquerymy.com
 * 
 * Requires jQuery 1.7.1+, SugarJS 1.2.5+
 * 
 */

(function( $ ){
	//some masks
	var r = {
		i:/^number|text|hidden|password|button|range/,
		div:/^p|div|span|form|fieldset|pre|code|li|t[dh]|h[1-6]|a$/
	}
	var f = {
		con: function () {
			try {console.log (arguments);} catch (e) {};
		},
		
		
		field:function(jo,val0) { 
		//sets or retrieves jQuery  object's value,
		//understands all main HTML controls
		//and some controls of jQuery UI
			
			var type = jo[0].nodeName.toLowerCase();	
			if (val0!=null) { 

			//############## set ###############
				
				var val = String(val0);
				if (type=="input") {
					var stype = jo.eq(0).attr("type").toLowerCase();
					if ((r.i).test(stype)) {
						if (jo.val()!=val) {
							if (jo.hasClass("hasDatepicker")) {
								if (f.mydate(jo.datepicker("getDate")).to(10) != 
									f.mydate(f.mydate(val)).to(10)) jo.datepicker("setDate", f.mydate(val));
							} else {
								jo.val(val);
								if (jo.hasClass("ui-slider-input")) jo.slider("refresh");
								if (jo.data("tagstrip") && jo.data("tagstrip").root) jo.trigger("update");
							}
						}
					} else if (stype=="radio") {
						var pos = -1;
						jo.each(function(ind) {
							var v = $(this).val();
							if (v===val) pos=ind;
						});
						jo.each(function(){
							var jor = $(this).eq(pos);
							jor.attr("checked",false)
							if (jo.eq(pos).checkboxradio) jor.checkboxradio("refresh");
						});
						if (pos>-1) {
							var jor = jo.eq(pos);
							jor.attr("checked",true)
							if (jo.eq(pos).checkboxradio) jor.checkboxradio("refresh");
						}
					}
				} else if (type=="select") {
					if (jo.val()!=val) {
						jo.val(val);				
						if (jo.hasClass("ui-slider-switch")) 
							jo.slider("refresh"); 
						else {
							if (jo.selectmenu) jo.selectmenu("refresh",true);
						}
					}
				}  else if (type=="textarea") {
					if (jo.val()!=val) jo.val(val);
				} else if ((r.div).test(type)) {
					if (jo.hasClass("ui-slider")) jo.slider("option","value", val);
					else if (jo.hasClass("hasDatepicker")) jo.datepicker("setDate", f.mydate(val));
					else if (jo.hasClass("ui-buttonset")) {
						var jon; 
						jo.find(":radio").each(function () {
							jon=$(this).button("option", "label")==val?$(this):jon;
						});
						if (jon) {
							jon.attr("checked","checked"); 
							jo.buttonset("refresh");
						} 
					}
					else jo.html(val);
				} else if (type=="img") {
					jo.attr("src",val);
				}
				return val;
			} else { 
				
			//############## retrieve ###############
				
				if (type=="input") {
					var stype = (jo.eq(0).attr("type")||"text").toLowerCase();
					if ((r.i).test(stype) ) {
						if (jo.hasClass("hasDatepicker")) return f.mydate(jo.datepicker("getDate")||(new Date));
						return jo.val();
					} else if (stype=="radio") {
						var c = "";
						jo.each(function(){
							if (this.attributes["checked"]) c=$(this).val();
						})
						return c;
					}
				} else if ((/^select|textarea$/).test(type)) {
					return jo.val();				
				} else if ((r.div).test(type)) {
					if (jo.hasClass("ui-slider")) return String(jo.slider("option","value"))||"";
					if (jo.hasClass("ui-buttonset")) {
						var jor = jo.find(":radio:checked")
						if (jor.size() && jor.button) return jor.button("option", "label") ;
						return "";
					}
					if (jo.hasClass("hasDatepicker")) return f.mydate(jo.datepicker("getDate")||(new Date));
					return jo.html().compact();
				} else if (type=="img") {
					return jo.attr("src");
				}
			}
		},
		
		bind: function (data, val, uiNode, $formNode) { 
		//sets or retrieves data using bind function
		
			var bind = uiNode.bind;
			if (typeof bind == "function") {
				return bind(data,val,$formNode);
			} else if (typeof bind == "string") {
				if (val!=null)  {
					data[bind] = String(val);
				} else {
					if (data[bind]===undefined) data[bind] = null;
				};
				return data[bind];
			}
			return null;
		},
		
		mydate:function(d) {
			if (typeof d == "number" || !isNaN(d) && parseInt(d)==d) {
				return (new Date(parseInt(d)));
			}
			if (typeof d=="string") {
				if (Date.create) return Date.create(d);
				return (new Date(d));
			}
			if ($.type(d)=="date" || d==null) {
				return (Date.create?Date.create(d).format("{yyyy}-{MM}-{dd}T{HH}:{mm}{isotz}"):String(d));
			}
			
			return (new Date);
		},
		
		isOut:function (data,val, uiNode, $formNode) {
		//checks if val is inconsistent for uiNode pattern
			
			var pat = uiNode.check;
			if (pat != null) {
				var err = uiNode["error"]||$formNode.data("my").root.data("my").params.errorMessage||"Error";
				var type = $.type(pat);
				if (type=="function") {
					return pat(data,val, $formNode);
				} else if (type=="regexp") {
					return ( (pat.test(String(val))) ? "":err );
				} else if (type=="array") {
					return ( (pat.indexOf(val)>-1)?"":err);				
				} else if (type=="string") {
					return (val==pat?"":err);
				} else if (type=="object")  {
					return pat[val]?"":err;
				}
				return err;
			} else {
				return "";
			}
		},
		
		
		update:function ($o, value, depth) {
			var $this = $o, xdata = $this.data("my"), err="Unknown error";
			if (xdata) {
				$root = xdata.root, $container = xdata.container;
				var selector = xdata.selector, d = xdata.data, oui = xdata.ui;
				var p =  $root.data("my").params, ui = $root.data("my").ui;
				var $we = $root.find(selector);
				
				if (value!=null) {
					var val = value;
				} else {
					val = f.field($we,f.bind(d,null,oui,$o));
				}
				
				//validating and storing if correct
				//applying or removing error styles
				try {
					var err = f.isOut(d,val,oui, $this);
				} catch (e) {
					f.con ("Error "+ e.name+" validating "+selector );
				};
				if (err=="") {
					xdata.errors[selector]= "";
					if (value!=null) {
						val = f.field($we,f.bind(d,value,oui,$o));
					}
					$container.removeClass(p.errorCss).find(p.errorTip).removeClass(p.errorCss).html("").hide(p.animate);
					$this.removeClass("ui-state-error"); $this.find(".ui-widget").removeClass("ui-state-error")
				} else {
					xdata.errors[selector]= err;
					$container.addClass(p.errorCss).find(p.errorTip).addClass(p.errorCss).show(p.animate).html(err);	
					if ($this.hasClass("hasDatepicker")) {
						if ($this.is("input")) $this.addClass("ui-state-error");
						else $this.find(".ui-widget").addClass("ui-state-error");
					}
					if ($this.hasClass("ui-slider")) $this.addClass("ui-state-error");
				}
				
				//applying conditional formatting if any
				var cssval = (value==null?val:value);
				if (oui.css) {
					for (var css in oui.css) {
						var oc = oui.css[css];
						if (Object.isRegExp(oc)) {
							if (oc.test(cssval)) $container.addClass(css); 
							else $container.removeClass(css);
						} else if (Object.isFunction(oc)) {
							if (oc(d,cssval,$o)) $container.addClass(css); 
							else $container.removeClass(css);
						}
					}
				}
				
				//recalculating dependent fields
				if (depth && oui.recalc) {
					var list = oui.recalc, dest = [], once = {};
					if (Object.isString(list)) list = list.split(",");				
					if (Object.isArray(list)) {
						for (var i in list) {
							if (list[i] && Object.isString(list[i])) {
								var item = list[i].compact();
								if (ui[item]) {
									if (ui[item].recalc) {
										if (dest.indexOf(item)==-1) dest.push(item);
									} else {
										once[item]=true;
									}
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
		
		history: function (x, params, remove) {
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
					for (var i=l; i<l*2; i++) {
						newh[k[i]] = h[k[i]];
					}
					params.history = newh;
				}
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
					for (var i=0; i<k.length-n-1; i++) {
						newh[k[i]] = h[k[i]];
					}
					params.history = newh;
				}
				return old;
			}
		}
	};
	
	var forms = {};
	
	var methods = {
		  
		//######### INIT ##############
			
		init : function( data ) { 
			var obj = this;
			if (!data) return obj;
			if (Object.isObject(obj.data("my")) && obj.data("my").id && obj.data("my").ui) {
				f.con ("$.my is already bind!");
				return obj;
			}
			
			//####### default params, may be overriden #########
			
			var p = $.extend(true,{
				getContainer:function(jobj) { 
					//returns container div for field or whatever if any 
					//it can be the firstmost elt with fieldcontain role or
					//fieldset, div or form in depth of not mre than 2
					if ( !r.div.test($(jobj)[0]
							.tagName.toLowerCase()) ||
							jobj.hasClass("ui-widget")
					) {
						var op = jobj.parents('*[data-role="fieldcontain"], *.tagstrip');
						if (op.size()==0){
							var oa =  jobj.parents('*');
							var op0=false;
							for (var i =0; i<3; i++) {
								if (!op0 && r.div.test(oa[i].tagName.toLowerCase())) {
									op0 = oa[i];
								}
							}
							if (!op0) return jobj; else return $(op0);
						}
						return $(op[0]);
					} else {
						return jobj;
					}
			  	},
			  	change:function() {},
			  	recalcDepth:2,
			  	delay:0,
			  	animate:0,
			  	errorMessage:"Incorrect input!",
			  	errorTip:".my-error-tip",
			  	errorCss:"my-error",
			  	oninit:function(){},
			  	remember:100,
			  	history:Object.extended(),
			  	historyDelay:10 //delay in ms between subsequent calls of history()
			  }, data.params||{}) ;
			
			var ui = $.extend(true,{}, data.ui||{}) ;
			
			var myid =  data.id || ("auto"+Math.random(100000000,999999999));
						
			var d = data.data || {};
			obj.data("my", {
				id: myid,
				data:d, 
				params:p, 
				errors:Object.extended(), 
				ui:Object.extended(ui),
				history:p.history
			});
			
			
			for (var i in ui) {
				var  o = $(this).find(i);
				var dui = ui[i];
				if (o.size()>0) {
					var v = f.bind(d,null,dui,o);
					if (v!=null) {
						f.field(o,v);
					} else {
						v = f.field(o, null);
						v = f.bind(d,v,dui,o);
					}
					o.each(function() {
						var $this = $(this);
						var events = "blur.my input.my change.my check.my"+($.browser.msie?" keyup.my":"");
						if ($this.is('[type="button"]')) events = "click.my check.my";
						else if ($this.hasClass("ui-slider")) events = "slide.my check.my";
						$this.data("my",{
							id:myid,
							events:events,
							selector:i,
							ui:dui,
							initial:v,
							previous:v,
							root:obj,
							data:d,
							params:p,
							container:p.getContainer($this),
							errors:obj.data("my").errors
						}).bind(events, (function(){
							var data = $this.data("my");
							if (!data.errors || data.errors.values().compact(true).length==0) 
								data.root.data("my").lastCorrect = $.extend(true, {}, data.data)
							f.history(data.data, data.params);
							f.update($this, 
									f.field(data.root.find(data.selector)), 
									 dui.recalcDepth||p.recalcDepth);
							p.change();
						}).debounce(p.delay));
					});
				} else {
					f.con ("Not found "+i+" selector at form "+myid);
				}
			}
			for (var i in ui) {
				this.find(i).trigger("check");
			};
			obj.data("my").initial = $.extend(true,{},d);
			forms[myid] = obj;
			if ($.mobile) $.mobile.changePage($.mobile.activePage);
			
			return obj;
		},
		
		//###### REDRAW ######
		
		redraw : function( noRecalc ) {
			var $this = this;
			$this.data("my").ui.each(function(key) {
				f.update($this.find(key), noRecalc?null:undefined , $this.data("my").params.reclcDepth)
			});
		},
		
		//###### SET OR RETRIEVE DATA ######
		
		data: function(data) {
			if (data!=null) {
				$.extend(true, this.data("my").data, data);
				this.my("redraw");
			}
			return $(this).data("my").data;
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
				$.extend(true, this.data("my").data, this.data("my").initial);
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
			var $this = this;
			$this.data("my").ui.each(function(key) {
				var $obj = $this.find(key);
				$obj.unbind($obj.data("my").events)
					.removeData("my");
			});
			var d = $this.data("my").data;
			$this.removeData("my");
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
			$.extend(true, $this.data("my").data, f.history(diff, d.params, true)||{});
			$this.my("redraw");
			return $this.data("my").data;
		},
		
		history: function (a,c) {return f.history(a, this.data("my").params, c);}
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
