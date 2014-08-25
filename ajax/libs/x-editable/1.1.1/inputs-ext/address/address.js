/**
Address editable input.
Internally value stored as {city: "Moscow", street: "Lenina", building: "15"}

@class address
@extends abstract
@final
@example
<a href="#" id="address" data-type="address" data-pk="1">awesome</a>
<script>
$(function(){
    $('#address').editable({
        url: '/post',
        title: 'Enter city, street and building #',
        value: {
            city: "Moscow", 
            street: "Lenina", 
            building: "15"
        }
    });
});
</script>
**/
(function ($) {
    var Address = function (options) {
        this.init('address', options, Address.defaults);
    };

    $.fn.editableform.utils.inherit(Address, $.fn.editableform.types.abstract);

    $.extend(Address.prototype, {
         render: function() {
             Address.superclass.render.call(this);
             
            // this.$input.
         },
        
        
        value2html: function(value, element) {
            var html = value.city + ', ' + value.street + ' st., bld. ' + value.building;
            $(element).text(html); 
        },
        
        html2value: function(html) {        
          /*
            you may write parsing method to get value by element's html
            e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
            but for complex structures I do not recommend do that. 
            Better always set value directly via javascript, e.g. 
            editable({
                value: {
                    city: "Moscow", 
                    street: "Lenina", 
                    building: "15"
                }
            });
          */ 
          return null;  
        },
      
       /*
        method for converting data before sent on server.
        As jQuery correctly sends objects via ajax, you can just return value
       */
       value2str: function(value) {
           return value;
       }, 
       
       /*
        this is mainly for parsing value defined in data-value attribute. 
        If you will always set value by javascript, no need to overwrite it
       */
       str2value: function(str) {
           return str;
       },                
       
       value2input: function(value) {
           this.$input.find('input[name="city"]').val(value.city);
           this.$input.find('input[name="street"]').val(value.street);
           this.$input.find('input[name="building"]').val(value.building);
       },       
       
       input2value: function() { 
           return {
              city: this.$input.find('input[name="city"]').val(), 
              street: this.$input.find('input[name="street"]').val(), 
              building: this.$input.find('input[name="building"]').val()
           };
       },        
        
       activate: function() {
            //set focus on city
            this.$input.find('input[name="city"]').focus();
       }  
    });

    Address.defaults = $.extend({}, $.fn.editableform.types.abstract.defaults, {
        tpl: '<div><label><span>City: </span><input type="text" name="city" class="span2"></label></div>'+
             '<div><label><span>Street: </span><input type="text" name="street" class="span2"></label></div>'+
             '<div><label><span>Building: </span><input type="text" name="building" class="span1"></label></div>',
             
        inputclass: 'editable-address'
    });

    $.fn.editableform.types.address = Address;

}(window.jQuery));