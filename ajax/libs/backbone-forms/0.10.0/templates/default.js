/**
 * Include this file _after_ the main backbone-forms file to override the default templates.
 * You only need to include templates you want to override.
 * 
 * Requirements when customising templates:
 * - Each template must have one 'parent' element tag.
 * - "data-type" attributes are required.
 * - The main placeholder tags such as the following are required: fieldsets, fields
 */
;(function() {
  var Form = Backbone.Form;

  
  //DEFAULT TEMPLATES
  Form.setTemplates({
    
    //HTML
    form: '\
      <form class="bbf-form">{{fieldsets}}</form>\
    ',
    
    fieldset: '\
      <fieldset>\
        <legend>{{legend}}</legend>\
        <ul>{{fields}}</ul>\
      </fieldset>\
    ',
    
    field: '\
      <li class="bbf-field">\
        <label for="{{id}}">{{title}}</label>\
        <div class="bbf-editor">{{editor}}</div>\
        <div class="bbf-help">{{help}}</div>\
      </li>\
    ',

    nestedField: '\
      <li class="bbf-field" title="{{title}}">\
        <label for="{{id}}">{{title}}</label>\
        <div class="bbf-editor">{{editor}}</div>\
        <div class="bbf-help">{{help}}</div>\
      </li>\
    ',

    list: '\
      <div class="bbf-list">\
        <ul>{{items}}</ul>\
        <div class="bbf-actions"><button data-action="add">Add</div>\
      </div>\
    ',

    listItem: '\
      <li>\
        <button data-action="remove" class="bbf-remove">x</button>\
        <div class="bbf-editor-container">{{editor}}</div>\
      </li>\
    ',

    date: '\
      <div class="bbf-date">\
        <select data-type="date" class="bbf-date">{{dates}}</select>\
        <select data-type="month" class="bbf-month">{{months}}</select>\
        <select data-type="year" class="bbf-year">{{years}}</select>\
      </div>\
    ',

    dateTime: '\
      <div class="bbf-datetime">\
        <div class="bbf-date-container">{{date}}</div>\
        <select data-type="hour">{{hours}}</select>\
        :\
        <select data-type="min">{{mins}}</select>\
      </div>\
    ',

    'list.Modal': '\
      <div class="bbf-list-modal">\
        {{summary}}\
      </div>\
    '
  }, {

    //CLASSNAMES
    error: 'bbf-error'

  });


})();
