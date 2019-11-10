/*
 * jQuery.my 0.2 beta. 
 * 
 * (c) ermouth
 * See details at jquerymy.com
 * 
 * Requires jQuery 1.7.1+, SugarJS 1.2.5+
 * 
 */

(function( $ ){
	var mys={};
	var f = {
		con: function () {
			try {console.log (arguments);} catch (e) {};
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
		
		field:function(jo,val0) { 
			//sets or retrieves field value
			var type = jo[0].nodeName.toLowerCase();
			
			if (val0!=null) { //set
				var val = String(val0);
				if (type=="input") {
					var stype = jo.eq(0).attr("type").toLowerCase();
					if ((/^number|text|hidden|password$/).test(stype)) {
						if (jo.val()!=val) {
							jo.val(val);
							if (jo.hasClass("ui-slider-input")) jo.slider("refresh");
							if (jo.data("tagstrip") && jo.data("tagstrip").root) jo.trigger("update");
						}
					} else if (stype=="radio") {
						var pos = -1;
						jo.each(function(ind) {
							var v = $(this).val();
							if (v===val) pos=ind;
						})
						jo.each(function(){$(this).attr("checked",false).checkboxradio("refresh")});
						if (pos>-1) {
							jo.eq(pos).attr("checked",true).checkboxradio("refresh");
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
				} else if ((/^p|div|span|li|t[dh]|a$/).test(type)) {
					jo.html(val);
				} else if (type=="img") {
					jo.attr("src",val);
				}
				return val;
			} else { //retrieve
				if (type=="input") {
					var stype = jo.eq(0).attr("type").toLowerCase();
					if ((/^number|text|hidden|password|button$/).test(stype) ) {
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
				} else if ((/^p|div|span|li|t[dh]|h[1-6]|a$/).test(type)) {
					return jo.html().compact();
				} else if (type=="img") {
					return jo.attr("src");
				}
			}
		},
		update:function ($o, value, depth) {
			var $this = $o, xdata = $this.data("my"), err="Unknown error";
			if (xdata) {
				$root = xdata.root, $container = xdata.container;
				var selector = xdata.selector, d = xdata.data, oui = xdata.ui;
				var p =  $root.data("my").params, ui = $root.data("my").ui;
				
				if (value!=null) {
					var val = value;
				} else {
					val = f.field($root.find(selector),f.bind(d,null,oui,$o));
				}
				
				//validating and storing if correct
				try {
					var err = f.isOut(d,val,oui, $this);
				} catch (e) {
					f.con ("Error "+ e.name+" validating "+selector );
				};
				if (err=="") {
					$root.data("my").errors[selector]= "";
					f.bind(d,val,oui,$o);
					$container.removeClass(p.errorCss).find(p.errorTip).removeClass(p.errorCss).html("").hide();
				} else {
					$root.data("my").errors[selector]= err;
					$container.addClass(p.errorCss).find(p.errorTip).addClass(p.errorCss).show().html(err);
				}
				
				//applying conditional formatting if any
				if (oui.css) {
					for (var css in oui.css) {
						var oc = oui.css[css];
						if (Object.isRegExp(oc)) {
							if (oc.test(val)) $container.addClass(css); else $container.removeClass(css);
						} else if (Object.isFunction(oc)) {
							if (oc(d,val,$o)) $container.addClass(css); else $container.removeClass(css);
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
							
							//f.undo ()
						}
					}
				}
				
				
				return once||{};
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
					if ( !(/^(div|span|a|li|p|h[1-6]|t[dh])$/).test($(jobj)[0].tagName.toLowerCase())) {
						var op = jobj.parents('*[data-role="fieldcontain"], *.tagstrip');
						if (op.size()==0){
							var oa =  jobj.parents('*');
							var op0=false;
							for (var i =0; i<3; i++) {
								if (!op0 && (/div|span|form|p|fieldset/).test(oa[i].tagName.toLowerCase())) {
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
			  	errorMessage:"Incorrect input!",
			  	errorTip:".my-error-tip",
			  	errorCss:"my-error",
			  	oninit:function(){},
			  	remember:10,
			  	undos:[]
			  }, data.params||{}) ;
			
			var ui = $.extend(true,{}, data.ui||{}) ;
			
			var myid =  data.id || ("auto"+Math.random(100000000,999999999));
						
			var d = data.data || {};
			obj.data("my", {
				id: myid,
				data:d, 
				params:p, 
				errors:Object.extended(), 
				ui:Object.extended(ui)
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
						$this.data("my",{
							id:myid,
							events:events,
							selector:i,
							ui:dui,
							initial:v,
							previous:v,
							root:obj,
							data:d,
							container:p.getContainer($this),
							errors:obj.data("my").errors
						}).bind(events, (function(){
							var data = $this.data("my");
							f.update($this, 
									f.field(data.root.find(data.selector)), 
									 data.ui.recalcDepth||p.recalcDepth);
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
		}
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
