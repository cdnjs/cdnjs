this["wysihtml5"] = this["wysihtml5"] || {};
this["wysihtml5"]["tpl"] = this["wysihtml5"]["tpl"] || {};

this["wysihtml5"]["tpl"]["blockquote"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " \n      <span class=\"fa fa-quote-left\"></span>\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-quote\"></span>\n    ";
  }

  buffer += "<li>\n  <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"blockquote\" data-wysihtml5-display-format-name=\"false\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </a>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["color"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

  buffer += "<li class=\"dropdown\">\n  <a class=\"btn btn-default dropdown-toggle ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-toggle=\"dropdown\" tabindex=\"-1\">\n    <span class=\"current-color\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.black)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <b class=\"caret\"></b>\n  </a>\n  <ul class=\"dropdown-menu\">\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"black\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"black\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.black)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"silver\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"silver\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.silver)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"gray\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"gray\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.gray)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"maroon\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"maroon\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.maroon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"red\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"red\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.red)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"purple\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"purple\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.purple)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"green\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"green\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.green)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"olive\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"olive\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.olive)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"navy\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"navy\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.navy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"blue\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"blue\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.blue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><div class=\"wysihtml5-colors\" data-wysihtml5-command-value=\"orange\"></div><a class=\"wysihtml5-colors-title\" data-wysihtml5-command=\"foreColor\" data-wysihtml5-command-value=\"orange\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.colours)),stack1 == null || stack1 === false ? stack1 : stack1.orange)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n  </ul>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["emphasis"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"small\" title=\"CTRL+S\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.small)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n    ";
  return buffer;
  }

  buffer += "<li>\n  <div class=\"btn-group\">\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"bold\" title=\"CTRL+B\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.bold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"italic\" title=\"CTRL+I\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.italic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"underline\" title=\"CTRL+U\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.underline)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.emphasis)),stack1 == null || stack1 === false ? stack1 : stack1.small), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["font-styles"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-font\"></span>\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-font\"></span>\n    ";
  }

  buffer += "<li class=\"dropdown\">\n  <a class=\"btn btn-default dropdown-toggle ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-toggle=\"dropdown\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <span class=\"current-font\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.normal)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <b class=\"caret\"></b>\n  </a>\n  <ul class=\"dropdown-menu\">\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"p\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.normal)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h1\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h2\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h2)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h3\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h3)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h4\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h4)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h5\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h5)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n    <li><a data-wysihtml5-command=\"formatBlock\" data-wysihtml5-command-value=\"h6\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.font_styles)),stack1 == null || stack1 === false ? stack1 : stack1.h6)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n  </ul>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n        <span class=\"fa fa-pencil\"></span>\n      ";
  }

function program5(depth0,data) {
  
  
  return "\n        <span class=\"glyphicon glyphicon-pencil\"></span>\n      ";
  }

  buffer += "<li>\n  <div class=\"btn-group\">\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-action=\"change_view\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.html)),stack1 == null || stack1 === false ? stack1 : stack1.edit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n  </div>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["image"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "modal-sm";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-file-image-o\"></span>\n    ";
  }

function program7(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-picture\"></span>\n    ";
  }

  buffer += "<li>\n  <div class=\"bootstrap-wysihtml5-insert-image-modal modal fade\" data-wysihtml5-dialog=\"insertImage\">\n    <div class=\"modal-dialog ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.smallmodals), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <a class=\"close\" data-dismiss=\"modal\">&times;</a>\n          <h3>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"form-group\">\n            <input value=\"http://\" class=\"bootstrap-wysihtml5-insert-image-url form-control\" data-wysihtml5-dialog-field=\"src\">\n          </div> \n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"btn btn-default\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"cancel\" href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n          <a class=\"btn btn-primary\" data-dismiss=\"modal\"  data-wysihtml5-dialog-action=\"save\" href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"insertImage\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.image)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </a>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["link"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "modal-sm";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-share-square-o\"></span>\n    ";
  }

function program7(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-share\"></span>\n    ";
  }

  buffer += "<li>\n  <div class=\"bootstrap-wysihtml5-insert-link-modal modal fade\" data-wysihtml5-dialog=\"createLink\">\n    <div class=\"modal-dialog ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.smallmodals), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <a class=\"close\" data-dismiss=\"modal\">&times;</a>\n          <h3>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"form-group\">\n            <input value=\"http://\" class=\"bootstrap-wysihtml5-insert-link-url form-control\" data-wysihtml5-dialog-field=\"href\">\n          </div> \n          <div class=\"checkbox\">\n            <label> \n              <input type=\"checkbox\" class=\"bootstrap-wysihtml5-insert-link-target\" checked>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.target)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </label>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"btn btn-default\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"cancel\" href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n          <a href=\"#\" class=\"btn btn-primary\" data-dismiss=\"modal\" data-wysihtml5-dialog-action=\"save\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"createLink\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.link)),stack1 == null || stack1 === false ? stack1 : stack1.insert)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </a>\n</li>\n";
  return buffer;
  });

this["wysihtml5"]["tpl"]["lists"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "btn-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-list-ul\"></span>\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-list\"></span>\n    ";
  }

function program7(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-list-ol\"></span>\n    ";
  }

function program9(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-th-list\"></span>\n    ";
  }

function program11(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-outdent\"></span>\n    ";
  }

function program13(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-indent-right\"></span>\n    ";
  }

function program15(depth0,data) {
  
  
  return "\n      <span class=\"fa fa-indent\"></span>\n    ";
  }

function program17(depth0,data) {
  
  
  return "\n      <span class=\"glyphicon glyphicon-indent-left\"></span>\n    ";
  }

  buffer += "<li>\n  <div class=\"btn-group\">\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"insertUnorderedList\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.lists)),stack1 == null || stack1 === false ? stack1 : stack1.unordered)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"insertOrderedList\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.lists)),stack1 == null || stack1 === false ? stack1 : stack1.ordered)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"Outdent\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.lists)),stack1 == null || stack1 === false ? stack1 : stack1.outdent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n    <a class=\"btn ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " btn-default\" data-wysihtml5-command=\"Indent\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.locale)),stack1 == null || stack1 === false ? stack1 : stack1.lists)),stack1 == null || stack1 === false ? stack1 : stack1.indent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.toolbar)),stack1 == null || stack1 === false ? stack1 : stack1.fa), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n  </div>\n</li>\n";
  return buffer;
  });