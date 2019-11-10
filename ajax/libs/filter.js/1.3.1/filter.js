/*
 * Filter.js
 * version: 1.3.1 (7/10/2012)
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2011 Jiren Patel[ joshsoftware.com ]
 * 
 * Dependency:
 *  jQuery(v1.6 >=)
 */

 (function(window) {

    var _filterJS = function(dataModel, parentNode, view, settings) {
        this.dataModel = dataModel;
        this.view = view;
        this.parentNode = parentNode;
        this.settings = settings || {};
        //this.last_result = null;

        if (this.dataModel.constructor == Object){
          this.dataModel = [this.dataModel];
        }

        for (name in this.dataModel[0]) {
            this.settings.root = name;
        }

        this.render();
        this.buildCategoryMap();
        this.bindEvents();

        if(this.settings.exec_callbacks_on_init &&  this.settings.callbacks){
          this.execCallBacks(this.settings.all_objects);
        }
    };

    var FilterJS = function(dataModel, parentNode, view, settings) {
        return new _filterJS(dataModel, parentNode, view, settings);
    };

    FilterJS.VERSION = 1.3;

    //Register new html tag
    FilterJS.registerHtmlElement = function(tag_name){
        _filterJS.prototype[tag_name] = function(attrs, content){
           return _filterJS.prototype.content_tag(tag_name, attrs, content);
        };
    };

    _filterJS.prototype = {
       /**
	      * Tag to make html elements.
	      * i.e this.content_tag('span', {class: 'logo_text'}, "Logo Text")
	      * First argument is tag name
	      * Second argument is attributes class,title,id etc.	
	      * Last argument is array of html elements or text.
        **/
        content_tag: function(tag, attrs, content) {
            var el = document.createElement(tag);

            if (attrs) $(el).attr(attrs);
            if (content) {
                if (content.constructor == Array) {
                    content.forEach(function(c) {
                        if (c) $(el).append(c.constructor == String ? c : $(c));
                    });
                }
                else {
                    $(el).html(content);
                }
            }
            return el;
        },

        /**
         * Link Tag:
  	     * i.e. this.link('/test/1' ,{'title': 'title'}, 'link text')	
         **/
        link: function(url, attrs, content) {
            attrs = attrs || {};
            attrs['href'] = url;
            return this.content_tag('a', attrs, content)
        },

        /** 
         * Image Tag:
	       * i.e. this.image('/test.png', {class: 'image'})
	       **/
        image: function(url, attrs) {
            attrs = attrs || {};
            attrs['src'] = url;
            return this.content_tag('img', attrs)
        },

        //Render Html using JSON data
        render: function(parentNode) {
            var base = this;
            var node = $(this.parentNode);

            if (!this.parentNode || !this.view) return;

            this.dataModel.forEach(function(dm) {
                dm = dm[base.settings.root];
                var el = $(base.view(dm));
                el.attr({'id': base.settings.root + '_' + dm.id, 'data-fjs': true});
                node.append(el);
            });
        },

        //Bind Events to filter html elements
        bindEvents: function() {
            var base = this;
            base.settings.selector.forEach(function(selector, index) {
                $(selector.element).live(selector.events, function(e) {
                    base.filter();
                });
            })

           if(base.settings.search){
              $(base.settings.search.input).live('keyup', function(e){
                  //var search_result = base.search(this, base.last_result || base.settings.all_objects);
                  //base.hideShow(search_result);
                  base.filter();
              });
           }
        },

        //Unbind fileter events
        unbindEvents: function() {
            var base = this;
            base.settings.selector.forEach(function(selector, index) {
                $(selector.element).die(selector.events);
            })
        },
                    

        //Find elements accroding to selection criteria.
        filter: function() {
            var base = this;
            var filter_out = base.settings.all_objects.slice();
            var selected_count = 0;
            var select_none = false; //Zero Selection for any category

            base.settings.selector.forEach(function(s) {
                var out = $(s.element).filter(s.select).map(function() {
                    return $(this).val();
                });
                selected_count += out.length;

                if (out.length) {
                    filter_out = base.grep(filter_out, base.findObjects(s.name, out, s.type));
                }
                else{
                  select_none = true;
                }

            });

            if(select_none && base.settings.and_filter_on) filter_out = [];

            //Search
            if(base.settings.search){
              filter_out = base.search(base.settings.search, filter_out);
            }
            base.hideShow(filter_out);

            //Callbacks
            base.execCallBacks(filter_out);

            //base.last_result = filter_out;
        },

        //Compare and collect objects
        findObjects: function(filter_name, categories, filter_type) {
            var base = this;
            var out = [];

            $.each(categories, function(index, category) {
                var cat;

                if (filter_type == 'range') {
                    var range = category.split('-');

                    if (range.length == 2) {
                        if (range[0] == 'below') range[0] = -Infinity;
                        if (range[1] == 'above') range[1] = Infinity;

                        cat = $.map(base.settings.object_map[filter_name],
                          function(n, v) {
                              if (Number(v) >= range[0] && Number(v) <= range[1]){
                                return base.settings.object_map[filter_name][v];
                              }
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
        makeEvalString: function(field_map, root) {
            var fields = field_map.split('.ARRAY.');
            var eval_out_str = root + '.' + fields[0];

            for (i = 1; i < fields.length; i++) {
                eval_out_str += ".filter_collect('" + fields[i] + "')";
            }

            return eval_out_str;
        },

        //Create map accroding to selection criteria.
        buildObjectMap: function() {
            var base = this;
            var filter_criteria = this.settings.filter_criteria;
            var object_map = {};
            base.settings.selector = [];

            for (name in filter_criteria) {
                var selector = {};

                selector.element = filter_criteria[name][0].split(/.EVENT.|.SELECT.|.TYPE./)[0];
                selector.events = (filter_criteria[name][0].match(/.EVENT.(\S*)/) || [])[1];
                selector.select = (filter_criteria[name][0].match(/.SELECT.(\S*)/) || [])[1]
                selector.type = (filter_criteria[name][0].match(/.TYPE.(\S*)/) || [])[1];
                selector.name = name;

                base.settings.selector.push(selector);

                filter_criteria[name].push(base.makeEvalString(filter_criteria[name][1], base.settings.root));
                object_map[name] = {};
            }

            return object_map;
        },

        buildCategoryMap: function() {
            var filter_criteria = this.settings.filter_criteria;
            var object_map = this.buildObjectMap();
            var settings = this.settings;
            settings.all_objects = [];

            this.dataModel.forEach(function(dm) {
                settings.all_objects.push(dm[settings.root].id);
                for (name in filter_criteria) {
                    var eval_out = eval('dm.' + filter_criteria[name][2]);
                    var obj = object_map[name];

                    if (eval_out && eval_out.constructor == Array) {
                        eval_out.forEach(function(x) {
                            if (obj[x]) {
                                obj[x].push(dm[settings.root].id);
                            } else {
                                obj[x] = [dm[settings.root].id];
                            }
                        });
                    }
                    else {
                        if (obj[eval_out]) {
                            obj[eval_out].push(dm[settings.root].id);
                        } else {
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
            $(this.parentNode + " > *[data-fjs]").hide();

            id_arr.forEach(function(id) {
                $(id_str + id).show();
            });
        },

        search: function(search_config, filter_result){
          var base = this;
          var val = $(search_config.input).val().trim();
          
          if(!val.length) return filter_result;

          var id_str = "#" + base.settings.root + '_';

          return $.map(filter_result, function(id){
              var $item = $(id_str + id);
              if(search_config.field_selector){
                $item = $item.find(search_config.field_selector) 
              }

              if($item.text().toUpperCase().indexOf(val.toUpperCase()) >= 0){
                return id;
              }
          });

        },

        execCallBacks: function(result){
            var base = this;
            if(!base.settings.callbacks) return;

            filtered_objects = [];
            $.each(base.dataModel, function(i, v){
              if(result.indexOf(v[base.settings.root].id) != -1){
                filtered_objects.push(v[base.settings.root]);
              }
            });

            $.each(base.settings.callbacks, function(name, callback){
                callback.call(base, filtered_objects);
              }
            );
        }


    };

    window.FilterJS = FilterJS;

    //Register html tags
    FilterJS.registerHtmlElement('div');
    FilterJS.registerHtmlElement('span');
    FilterJS.registerHtmlElement('li');
    FilterJS.registerHtmlElement('ul');
    FilterJS.registerHtmlElement('p');

})(this);

/**
 * Recursive method to collect object from json object.
 * i.e. test =  [ {"deal": {"id": 1 }}, {"deal": {"id": 2}}]
 *  - to collect id from the json data
 *    test.filter_collect('deal').filter_collect('id')
 *    this will return [1,2]
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
if(!Array.prototype.forEach) {
    Array.prototype.forEach = function(action, that) {
        for (var i = 0, n = this.length; i < n; i++)
        if (i in this) action.call(that, this[i], i, this);
    };
}

//In IE indexOf method not define.
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
      if (this[i] === obj) { return i; }
  }
  return -1;
}

}


