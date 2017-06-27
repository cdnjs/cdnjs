YUI.add('io-form', function(Y) {

   /**
    * Extends the IO base class to enable HTML form data serialization, when specified
    * in the transaction's configuration object.
    * @module io
    * @submodule io-form
    */

    Y.mix(Y.io, {
       /**
        * @description Method to enumerate through an HTML form's elements collection
        * and return a string comprised of key-value pairs.
        *
        * @method _serialize
        * @private
        * @static
        * @param {object} o - YUI form node or HTML form id.
        * @return string
        */
        _serialize: function(o) {
			var eUC = encodeURIComponent,
            	data = [],
            	useDf = o.useDisabled || false,
            	item = 0,
            	e, f, n, v, d, i, ilen, j, jlen, o,
            	id = (typeof o.id === 'string') ? o.id : o.id.getAttribute('id');

            	if (!id) {
					id = Y.guid('io:');
					o.id.setAttribute('id', id);
				}

            	f = Y.config.doc.getElementById(id);

            // Iterate over the form elements collection to construct the
            // label-value pairs.
            for (i = 0, ilen = f.elements.length; i < ilen; ++i) {
                e = f.elements[i];
                d = e.disabled;
                n = e.name;

                if ((useDf) ? n : (n && !d)) {
                    n = encodeURIComponent(n) + '=';
                    v = encodeURIComponent(e.value);

                    switch (e.type) {
                        // Safari, Opera, FF all default options.value from .text if
                        // value attribute not specified in markup
                        case 'select-one':
                            if (e.selectedIndex > -1) {
                                o = e.options[e.selectedIndex];
                                data[item++] = n + eUC((o.attributes.value && o.attributes.value.specified) ? o.value : o.text);
                            }
                            break;
                        case 'select-multiple':
                            if (e.selectedIndex > -1) {
                                for (j = e.selectedIndex, jlen = e.options.length; j < jlen; ++j) {
                                    o = e.options[j];
                                    if (o.selected) {
                                      data[item++] = n + eUC((o.attributes.value && o.attributes.value.specified) ? o.value : o.text);
                                    }
                                }
                            }
                            break;
                        case 'radio':
                        case 'checkbox':
                            if(e.checked){
                                data[item++] = n + v;
                            }
                            break;
                        case 'file':
                            // stub case as XMLHttpRequest will only send the file path as a string.
                        case undefined:
                            // stub case for fieldset element which returns undefined.
                        case 'reset':
                            // stub case for input type reset button.
                        case 'button':
                            // stub case for input type button elements.
                            break;
                        case 'submit':
                        default:
                            data[item++] = n + v;
                    }
                }
            }
            return data.join('&');
        }
    }, true);



}, '@VERSION@' ,{requires:['io-base']});
