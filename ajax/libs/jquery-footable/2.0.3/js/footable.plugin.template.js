(function ($, w, undefined) {
  if (w.footable === undefined || w.foobox === null)
    throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');

  var defaults = {
    /*
       Plugin options here, example:

        var defaults = {
          myPlugin: {
            enabled: true
          }
        };

       This would allow you to access this option using ft.options.myPlugin.enabled
    */
  };

  function MyPlugin() {
    var p = this;
    p.name = 'Footable MyPlugin';
    p.init = function(ft) {
      $(ft.table).bind({
        /*
           Bind to relevant events here to modify/add functionality to Footable, example:

            $(ft.table).bind({
              'footable_initialized': function(e){
                if (e.ft.options.myPlugin.enabled === true){
                  alert('Hello World');
                }
              }
            });

           This would listen for the 'footable_initialized' event and when called check if the plugin is enabled
           and if it is alert 'Hello World' to the user.
        */
      });
    };
  }
  
  w.footable.plugins.register(MyPlugin, defaults);
  
})(jQuery, window);
