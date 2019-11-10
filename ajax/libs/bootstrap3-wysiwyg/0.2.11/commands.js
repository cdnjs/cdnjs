(function(wysihtml5) {
  var undef;
  wysihtml5.commands.small = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatInline.exec(composer, command, "small");
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "small");
    },

    value: function() {
      return undef;
    }
  };
})(wysihtml5);
