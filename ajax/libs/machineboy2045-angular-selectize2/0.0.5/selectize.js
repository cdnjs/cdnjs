/**
 * Angular Selectize2
 * https://github.com/machineboy2045/angular-selectize
 **/

angular.module('selectize', []).value('selectizeConfig', {}).directive("selectize", ['selectizeConfig', '$timeout', function(selectizeConfig, $timeout) {

  return {
    restrict: 'A',
    scope: {ngModel: '=', config: '=selectize', options: '=options'},
    link: function(scope, element, attrs) {

      //=============================================================
      // setup
      //=============================================================
      scope.config.options = scope.options;

      if(selectizeConfig){
        scope.config = angular.extend(scope.config, selectizeConfig);
      }

      //support simple arrays
      var options = [];
      if(scope.config.options && typeof scope.config.options[0] === 'string'){
        angular.forEach(scope.config.options, function(opt){
          options.push({text:opt, value:opt});
        })
        scope.config.options = options;
      }
      
      //initialize
      element.selectize(scope.config);
      var selectize = element[0].selectize;
      
      //=============================================================
      // refresh angular models when selectize changes
      //=============================================================
      function refreshAngularItems(items) {
        $timeout(function(){ scope.ngModel = items },0);
      }
      
      function refreshAngularOptions(value, data) {
        $timeout(function(){ scope.options.push(data) },0);
      }
      
      //=============================================================
      // update selectize when angular models change
      //=============================================================
      function refreshSelectize(items){
        items = String(items).split(selectize.settings.delimiter)
        
        //options
        angular.forEach(items, function(opt){
          var newOpt = {};
          newOpt[selectize.settings.valueField] = opt;
          newOpt[selectize.settings.labelField] = opt;
          selectize.addOption(newOpt);
        });
        selectize.refreshOptions(false);
        
        //items
        selectize.setValue(items); 
      }
      
      
      //=============================================================
      // watchers
      //=============================================================
      selectize.on('change', refreshAngularItems);
      selectize.on('option_add', refreshAngularOptions);
      scope.$watch('ngModel', function(curr){
        if(curr)
          refreshSelectize(curr);
      },true);
      
    }
  };
}]);
