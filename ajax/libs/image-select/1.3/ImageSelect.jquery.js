// Image Select, an extention to the Chosen, a Select Box Enhancer for jQuery and Prototype
// by Adnan Sagar, WebSemantics Inc. http://websemantics.ca & AlterSpark Corp. http://www.alterspark.com/
//
// Version 1.3
// Full source at https://github.com/harvesthq/chosen
// Copyright (c) 2014 WebSemantics http://websemantics.ca

// MIT License, https://github.com/websemantics/Image-Select/blob/master/LICENSE

(function($) {

    // Image template, this can be overridden from the constructor (options.template),
    // must contains {src} placeholder. Ther eare two class names 'chose-image' or 'chose-image-small', modifiy in CSS
    var fn_template = '<img class="{class_name}" src="{url}" />';

    // Store the original 'chosen' method
    var fn_chosen = $.fn.chosen;

      $.fn.extend({
        // summery:
        //  Extend the original 'chosen' method to support images

        chosen: function(options) {

            options = options || {};

            var html_template = options.html_template || fn_template;

            // Attach Ready event before continue with chose
            this.each(function(input_field) {

                $this = $(this);

                $this.on("chosen:ready", function change(e, chosen){

                    chosen = chosen.chosen;

                    var form_field = chosen.form_field;

                    var options = form_field.options;
                    var spans = $(chosen.container).find('.chosen-choices span');


                      if(options && options.length){

                        for(var i = 0 ; i < options.length; i++){

                            var option = options[i];
                            var selected = $(option).attr('selected');
                            var img_src = $(option).attr('data-img-src');
                            var text = $(option).text();

                            if(selected && img_src){

                              var template = html_template.replace('{url}',img_src);

                              if(spans.length){
                                for (var j = 0; j < spans.length; j++)
                                  if(text == $(spans[j]).text()){
                                    $(spans[j]).prepend(template.replace('{class_name}','chose-image'));
                                  }
                                } else {
                                  $(chosen.container).find('.chosen-single span').prepend(template.replace('{class_name}','chose-image-small'));
                                }
                            }

                        }
                    }

               });
            });

            // original behavior - use function.apply to preserve context
            var ret = fn_chosen.apply(this, arguments);

            this.each(function(input_field) {

                var $this, chosen;

                $this = $(this);

                chosen = $this.data('chosen');

                $this.on("change", function change(evt,selected){
                    // summery
                    //      This function is triggered when the chosen instance has changed,
                    // evt: Event
                    //      The event object
                    // selected: Object
                    //      Contains the value of the selected
                    //
                    var options = chosen.form_field.options;

                    if(selected != undefined && selected.selected != undefined && options && options.length){

                        for(var i = 0 ; i < options.length; i++){
                            var option = options[i];
                            var value =  ($(option).attr('value')) ? $(option).attr('value') : $(option).text();
                            var img_src = $(option).attr('data-img-src');

                            if(img_src != undefined && selected.selected == value){
                                var template = html_template.replace('{url}',img_src);

                                // For multiple selection
                                span = $(chosen.container).find('.chosen-choices span').last()
                                span.find('img').remove()
                                span.prepend(template.replace('{class_name}','chose-image'));

                                // For single select
                                span = $(chosen.container).find('.chosen-single span')
                                span.find('img').remove()
                                span.prepend(template.replace('{class_name}','chose-image-small'));
                            }
                        }
                    }
                });

                $this.on("chosen:hiding_dropdown", function(e, _c){

                    var options  = chosen.form_field.options;

                    var selected = $(chosen.form_field).find(':selected');

                    if(!selected) return;

                    var img_src  = selected.attr('data-img-src');

                    if(!img_src) return;

                    var template = html_template.replace('{url}',img_src);

                    // For multiple selection
                    span = $(chosen.container).find('.chosen-choices span').last()
                    span.find('img').remove()
                    span.prepend(template.replace('{class_name}','chose-image'));

                    // For single select
                    span = $(chosen.container).find('.chosen-single span')
                    span.find('img').remove()
                    span.prepend(template.replace('{class_name}','chose-image-small'));
                })

                $this.on("chosen:showing_dropdown", function showing_dropdown(evt, _chosen){
                    // summery
                    //      This function is triggered when the chosen instance dropdown list becomes visible
                    //  For Chose custom events: http://forwebonly.com/jquery-chosen-custom-events-and-how-to-use-them/
                    //
                    // evt: Event
                    //      The event object
                    // _chosen: Object {chosen:Chosen}
                    //      Contains the current instance of Chosen class
                    var lis = $(chosen.container).find('.chosen-drop ul li:not(:has(img))')
                    var options = $(chosen.form_field).find('optgroup, option');
                    
                    for(var i = 0; i < lis.length; i++){
                        var li = lis[i];
                        var option = options[i];
                        var img_src = $(option).attr('data-img-src');

                        if(img_src != undefined){
                            var template = html_template.replace('{url}',img_src);
                            $(li).prepend(template.replace('{class_name}','chose-image-list'));
                        }
                    }
                });
              });
            $this.trigger('chosen:hiding_dropdown');
            return ret;
        }
      });

})(jQuery);