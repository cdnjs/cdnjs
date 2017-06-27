
/*
 * Filter.js
 * version: 1.0 (28/09/2011)
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2011 Jiren Patel[ joshsoftware.com ]
 */

var filterJS = function(dataModel, parentNode, view, settings) {
    this.dataModel = dataModel;
    this.tags = {};
    this.view = view;
    this.parentNode = parentNode;
    this.settings = settings || {};

    if(dataModel.length == 0) return;

    for (name in this.dataModel[0]) {
        this.settings.root = name;
    }

    if (this.parentNode) this.render();
    this.category_map(dataModel, this.settings);
    this.filter_event(this.settings);

};

filterJS.prototype = {
    /*
	  Tag to make html elements.
	  i.e this.content_tag('span', {class: 'logo_text'}, "Logo Text")
	  First argument is tag name
	  Second argument is attributes class,title,id etc.	
	  Last argument is array of html elements or text.
    */
    content_tag: function(tag, attrs, content) {
        var el = document.createElement(tag);

        if (attrs) $(el).attr(attrs);
        if (content) {
            if (content.constructor == Array) {
                content.forEach(function(c) {
                    if (c) $(el).append($(c));
                });
            }
            else {
                $(el).html(content);
            }
        }
        return el;
    },

    /* Link Tag:
	   i.e. this.link('/test/1' ,{'title': 'title'}, 'link text')	
    */
    link: function(url, attrs, content) {
        attrs = attrs || {};
        attrs['href'] = url;
        return this.content_tag('a', attrs, content)
    },

    /* Image Tag:
	   i.e. this.image('/test.png', {class: 'image'})
	*/
    image: function(url, attrs) {
        attrs = attrs || {};
        attrs['src'] = url;
        return this.content_tag('img', attrs)
    },

    div: function(attrs, content) {
        return this.content_tag('div', attrs, content);
    },
    span: function(attrs, content) {
        return this.content_tag('span', attrs, content);
    },

    li: function(attrs, content) {
        return this.content_tag('li', attrs, content);
    },
    ul: function(attrs, content) {
        return this.content_tag('ul', attrs, content);
    },

    //Render Html using JSON data
    render: function(parentNode) {
        var base = this;

        if (!this.view) return false;
        if (!(parentNode || this.parentNode)) return false;

        var node = $(parentNode || this.parentNode);

        if (this.dataModel.constructor == Array) {

            this.dataModel.forEach(function(dm) {
                dm = dm[base.settings.root];
                var el = base.view(dm);
                el.id = base.settings.root + '_' + dm.id;
                el.setAttribute('tagjs', 'yes');
                node.append(el);
            });
        }
        else {
            node.append(base.view(this.dataModel));
        }
    },

    //Bind Events to filter html elements
    filter_event: function(settings) {
        var base = this;
        base.settings.selector.forEach(function(selector, index) {
            $(selector.element).bind(selector.events,
            function(e) {
                base.filter();
            });
        })
    },

    //Find elements accroding to selection criteria.
    filter: function() {
        var base = this;
        var filter_out = base.settings.all_object.slice();
        var selected_count = 0;

        base.settings.selector.forEach(function(s) {
            var out = $(s.element).filter(s.select).map(function() {
                return $(this).val();
            });
            selected_count += out.length;
            if (out.length) {
                filter_out = base.grep(filter_out, base.find_objects(s.name, out, s.type));
            }
        });

        base.hideShow((selected_count ? filter_out: []));
    },

    //Compare and collect objects
    find_objects: function(filter_name, categories, filter_type) {
        var base = this;
     	var out = [];

        $.each(categories,
        function(index, category) {
            var cat;

            if (filter_type == 'range') {
                var range = category.split('-');

                if (range.length == 2) {
                    if (range[0] == 'below') range[0] = -Infinity;
                    if (range[1] == 'above') range[1] = Infinity;

                    cat = $.map(base.settings.object_map[filter_name],
                    function(n, v) {
                        if (Number(v) >= range[0] && Number(v) <= range[1]) return base.settings.object_map[filter_name][v];
                    });
                }
            }
            else {
                cat = base.settings.object_map[filter_name][category];
            }

            if (cat) {
                out = out.concat(cat);
            }
        });

        return out;
    },

    //Find objects in array
    grep: function(filter_out, value) {
        return jQuery.grep(filter_out,
        function(p, i) {
            return (jQuery.inArray(p, value) != -1);
        });
    },
 
    //Make eval expresssion  to collect object from the json data.
    parse_map: function(field_map, root) {
        var fields = field_map.split('.ARRAY.');
        var eval_out_str = root + '.' + fields[0];

        for (i = 1; i < fields.length; i++) {
            eval_out_str += ".filter_collect('" + fields[i] + "')";
        }

        return eval_out_str;
    },

    //Create map accroding to selection criteria.
    map_objects: function(settings) {
        var base = this;
        var filter_criteria = settings.filter_criteria;
        var object_map = {};
        settings.selector = [];

        for (name in filter_criteria) {
            var selector = {};

            selector.element = filter_criteria[name][0].split(/.EVENT.|.SELECT.|.TYPE./)[0];
            selector.events = (filter_criteria[name][0].match(/.EVENT.(\S*)/) || [])[1];
            selector.select = (filter_criteria[name][0].match(/.SELECT.(\S*)/) || [])[1]
            selector.type = (filter_criteria[name][0].match(/.TYPE.(\S*)/) || [])[1];
            selector.name = name;

            settings.selector.push(selector);

            filter_criteria[name].push(base.parse_map(filter_criteria[name][1], settings.root));
            object_map[name] = {};
        }

        return object_map;
    },

    category_map: function(data, settings) {

        var filter_criteria = settings.filter_criteria;
        var object_map = this.map_objects(settings);
        settings.all_object = [];

        data.forEach(function(dm) {
            settings.all_object.push(dm[settings.root].id);
            for (name in filter_criteria) {
                var eval_out = eval('dm.' + filter_criteria[name][2]);
                var obj = object_map[name];

                if (eval_out.constructor == Array) {
                    eval_out.forEach(function(x) {
                        if (obj[x]) {
                            obj[x].push(dm[settings.root].id);
                        }
                        else {
                            obj[x] = [dm[settings.root].id];
                        }
                    });
                }
                else {
                    if (obj[eval_out]) {
                        obj[eval_out].push(dm[settings.root].id);
                    }
                    else {
                        obj[eval_out] = [dm[settings.root].id];
                    }
                }
            }
        });

        settings.object_map = object_map;

        return object_map;
    },

    hideShow: function(id_arr) {
        var id_str = "#" + this.settings.root + '_';
        $(this.parentNode + " > *[tagjs]").hide();

        id_arr.forEach(function(id) {
            $(id_str + id).show();
        });
    }
};

/*
 Recursive method to collect object from array.
 i.e. test =  [ {"deal": {"id": 1 }}, {"deal": {"id": 2}}]
    - to collect id from the json data
     test.filter_collect('deal').filter_collect('id')
     this will return [1,2]
*/
Array.prototype.filter_collect = function(field, out_arr) {
    var out_arr = out_arr || [];
    this.forEach(function(obj) {
        if (obj.constructor == Array) {
            obj.filter_collect(field, out_arr);
        }
        else {
            out_arr.push(obj[field]);
        }
    });
    return out_arr;
};

//In IE forEach mathod not define so added manually if not define.
if (! ('forEach' in Array.prototype)) {
    Array.prototype.forEach = function(action, that
    /*opt*/
    ) {
        for (var i = 0, n = this.length; i < n; i++)
        if (i in this)
        action.call(that, this[i], i, this);
    };
}
