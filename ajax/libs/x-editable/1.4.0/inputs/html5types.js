/**
HTML5 input types.
Following types are supported:

* password
* email
* url
* tel
* number
* range

Learn more about html5 inputs:  
http://www.w3.org/wiki/HTML5_form_additions  
To check browser compatibility please see:  
https://developer.mozilla.org/en-US/docs/HTML/Element/Input
            
@class html5types 
@extends text
@final
@since 1.3.0
@example
<a href="#" id="email" data-type="email" data-pk="1">admin@example.com</a>
<script>
$(function(){
    $('#email').editable({
        url: '/post',
        title: 'Enter email'
    });
});
</script>
**/

/**
@property tpl 
@default depends on type
**/ 

/*
Password
*/
(function ($) {
    var Password = function (options) {
        this.init('password', options, Password.defaults);
    };
    $.fn.editableutils.inherit(Password, $.fn.editabletypes.text);
    $.extend(Password.prototype, {
       //do not display password, show '[hidden]' instead
       value2html: function(value, element) {
           if(value) {
               $(element).text('[hidden]');
           } else {
               $(element).empty(); 
           }
       },
       //as password not displayed, should not set value by html
       html2value: function(html) {
           return null;
       }       
    });    
    Password.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="password">'
    });
    $.fn.editabletypes.password = Password;
}(window.jQuery));


/*
Email
*/
(function ($) {
    var Email = function (options) {
        this.init('email', options, Email.defaults);
    };
    $.fn.editableutils.inherit(Email, $.fn.editabletypes.text);
    Email.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="email">'
    });
    $.fn.editabletypes.email = Email;
}(window.jQuery));


/*
Url
*/
(function ($) {
    var Url = function (options) {
        this.init('url', options, Url.defaults);
    };
    $.fn.editableutils.inherit(Url, $.fn.editabletypes.text);
    Url.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="url">'
    });
    $.fn.editabletypes.url = Url;
}(window.jQuery));


/*
Tel
*/
(function ($) {
    var Tel = function (options) {
        this.init('tel', options, Tel.defaults);
    };
    $.fn.editableutils.inherit(Tel, $.fn.editabletypes.text);
    Tel.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="tel">'
    });
    $.fn.editabletypes.tel = Tel;
}(window.jQuery));


/*
Number
*/
(function ($) {
    var NumberInput = function (options) {
        this.init('number', options, NumberInput.defaults);
    };
    $.fn.editableutils.inherit(NumberInput, $.fn.editabletypes.text);
    $.extend(NumberInput.prototype, {
         render: function () {
            NumberInput.superclass.render.call(this);
            this.setAttr('min');
            this.setAttr('max');
            this.setAttr('step');
        }
    });     
    NumberInput.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="number">',
        inputclass: 'input-mini',
        min: null,
        max: null,
        step: null
    });
    $.fn.editabletypes.number = NumberInput;
}(window.jQuery));


/*
Range (inherit from number)
*/
(function ($) {
    var Range = function (options) {
        this.init('range', options, Range.defaults);
    };
    $.fn.editableutils.inherit(Range, $.fn.editabletypes.number);
    $.extend(Range.prototype, {
        render: function () {
            this.$input = this.$tpl.filter('input');
            
            this.setClass();
            this.setAttr('min');
            this.setAttr('max');
            this.setAttr('step');           
            
            this.$input.on('input', function(){
                $(this).siblings('output').text($(this).val()); 
            });  
        },
        activate: function() {
            this.$input.focus();
        }         
    });
    Range.defaults = $.extend({}, $.fn.editabletypes.number.defaults, {
        tpl: '<input type="range"><output style="width: 30px; display: inline-block"></output>',
        inputclass: 'input-medium'
    });
    $.fn.editabletypes.range = Range;
}(window.jQuery));