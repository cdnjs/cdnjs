/*
An extension for attrchange jQuery plugin
http://meetselva.github.io/attrchange/

About License:
Copyright (C) 2013-2014 Selvakumar Arumugam
You may use attrchange ext plugin under the terms of the MIT Licese.
https://github.com/meetselva/attrchange/blob/master/MIT-License.txt
 */
$.fn.attrchange.extensions = { /*attrchange option/extension*/
	disconnect: function (o) {
		if (typeof o !== 'undefined' && o.isPhysicalDisconnect) {
			return this.each(function() {
				var attrchangeMethod = $(this).data('attrchange-method');
				if (attrchangeMethod == 'propertychange' || attrchangeMethod == 'DOMAttrModified') {
					$(this).off(attrchangeMethod);
				} else if (attrchangeMethod == 'Mutation Observer') {
					$(this).data('attrchange-obs').disconnect();
				} else if (attrchangeMethod == 'polling') {
					clearInterval($(this).data('attrchange-polling-timer'));
				}
			}).removeData('attrchange-method');
		} else { //logical disconnect
			return this.data('attrchange-tdisconnect', 'tdisconnect'); //set a flag that prevents triggering callback onattrchange
		}
	},
	remove: function (o) {
		return  $.fn.attrchange.extensions['disconnect'].call(this, {isPhysicalDisconnect: true});
	},
	getProperties: function (o) {
		var attrchangeMethod = $(this).data('attrchange-method');
		var pollInterval = $(this).data('attrchange-pollInterval');
		return {
			method: attrchangeMethod,
			isPolling: (attrchangeMethod == 'polling'),
			pollingInterval: (typeof pollInterval === 'undefined')?0:parseInt(pollInterval, 10),
			status: (typeof attrchangeMethod === 'undefined')?'removed': (typeof $(this).data('attrchange-tdisconnect') === 'undefined')?'connected':'disconnected'
		}
	},
	reconnect: function (o) {//reconnect possible only when there is a logical disconnect
		return this.removeData('attrchange-tdisconnect');
	},
	polling: function (o) {
		if (o.hasOwnProperty('isComputedStyle') && o.isComputedStyle == 'true') { /* extensive and slow - polling to check on computed style properties */
			return this.each(function(i, _this) {
				if (!o.hasOwnProperty('properties') ||
						Object.prototype.toString.call(o.properties) !== '[object Array]' ||
							o.properties.length == 0) { return false; } //return if no properties found
				var attributes = {}; //store computed properties
				for (var i = 0; i < o.properties.length; i++) {
					attributes[o.properties[i]] = $(this).css(o.properties[i]);
				}			
				var _this = this;
				$(this).data('attrchange-polling-timer', setInterval(function () {
					var changes = {}, hasChanges = false; // attrName: { oldValue: xxx, newValue: yyy}						
					for (var comuptedVal, i = 0; i < o.properties.length; i++){
						comuptedVal = $(_this).css(o.properties[i]);
						if (attributes[o.properties[i]] !== comuptedVal) {
							hasChanges = true;
							changes[o.properties[i]] = {oldValue: attributes[o.properties[i]], newValue: comuptedVal};
							attributes[o.properties[i]] = comuptedVal //add the attribute to the orig						
						}
					}
					if (hasChanges && typeof $(_this).data('attrchange-tdisconnect') === 'undefined') { //disconnected logically
						o.callback.call(_this, changes);
					}
				}, (o.pollInterval)?o.pollInterval: 1000)).data('attrchange-method', 'polling').data('attrchange-pollInterval', o.pollInterval);
			});
		} else {
			return this.each(function(i, _this) { /* this one is programmatic polling */
				var attributes = {};
				for (var attr, i=0, attrs=_this.attributes, l=attrs.length; i<l; i++){
					attr = attrs.item(i);
					attributes[attr.nodeName] = attr.nodeValue;
				}						
				$(_this).data('attrchange-polling-timer', setInterval(function () {
					var changes = {}, hasChanges = false; // attrName: { oldValue: xxx, newValue: yyy}						
					for (var attr, i=0, attrs=_this.attributes, l=attrs.length; i<l; i++){
						attr = attrs.item(i);							
						if (attributes.hasOwnProperty(attr.nodeName) &&
								attributes[attr.nodeName] != attr.nodeValue) { //check the values
							changes[attr.nodeName] = {oldValue: attributes[attr.nodeName], newValue: attr.nodeValue};
							hasChanges = true;
						} else if (!attributes.hasOwnProperty(attr.nodeName)) { //new attribute
							changes[attr.nodeName] = {oldValue: '', newValue: attr.nodeValue};
							hasChanges = true;
						}
						attributes[attr.nodeName] = attr.nodeValue; //add the attribute to the orig
					}
					if (hasChanges && typeof $(_this).data('attrchange-tdisconnect') === 'undefined') { //disconnected logically
						o.callback.call(_this, changes);
					}
				}, (o.pollInterval)?o.pollInterval: 1000)).data('attrchange-method', 'polling').data('attrchange-pollInterval', o.pollInterval);
			});
		}
	}
}