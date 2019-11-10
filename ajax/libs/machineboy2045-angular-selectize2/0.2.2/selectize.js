/**
 * Angular Selectize2
 * https://github.com/machineboy2045/angular-selectize
 **/

angular.module('selectize', []).value('selectizeConfig', {}).directive("selectize", ['selectizeConfig', '$timeout', function(selectizeConfig, $timeout) {

  return {
    restrict: 'A',
    require: '^ngModel',
    link: function(scope, element, attrs, ngModel) {
      var config;
      var selectize;
      
      //config
      config = scope.$eval(attrs.selectize);
      config.options = scope.$eval(attrs.options) || [];
      if(selectizeConfig){
        config = angular.extend(config, selectizeConfig);
      }
      config.maxItems = config.maxItems || null; //default to tag editor
      
      //support simple arrays
      if(config.options && typeof config.options[0] === 'string'){
        config.options = $.map(config.options, function(opt, index){
          return {id:index, text:opt, value:opt};
        })
        config.sortField = config.sortField || 'id'; //preserve order
      }
    
      //init
      element.selectize(config);
      selectize = element[0].selectize;
      
      function refreshAngularOptions(value, data) {
        config.options = selectize.options;
      }
    
      function createOptions(input){
        if($.isArray(input)){
          for(var i = 0, opt; opt = input[i++];){
            createOptions(input);
          }
        }
        var newOpt = {};
        newOpt[selectize.settings.valueField] = input;
        newOpt[selectize.settings.labelField] = input;
        selectize.addOption(newOpt);
      }
      
      function refreshSelectize(value){
        $timeout(function(){
          createOptions(value);
          selectize.refreshOptions(false);
          selectize.setValue(value); 
        });
      }
      
      selectize.on('option_add', refreshAngularOptions);
      scope.$watch(function(){ return ngModel.$modelValue }, refreshSelectize, true);
      
    }
  };
}]);