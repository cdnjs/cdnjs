/**
 * Angular Selectize2
 * https://github.com/machineboy2045/angular-selectize
 **/

angular.module('selectize', []).value('selectizeConfig', {}).directive("selectize", ['selectizeConfig', '$timeout', function(selectizeConfig, $timeout) {

  return {
    restrict: 'A',
    require: '^ngModel',
    template: '<select><option></option></select>',
    replace: true,
    link: function(scope, element, attrs, ngModel) {
      var config;
      var selectize;
      var prevNgClasses = '';
      var refreshSelectizeTimeout;

      function parseConfig(){
        config = scope.$eval(attrs.selectize);
        config.options = scope.$eval(attrs.options) || [];

        if (typeof selectizeConfig !== 'undefined') {
          config = angular.extend(config, selectizeConfig);
        }
        config.maxItems = config.maxItems || null; //default to tag editor

        //support simple arrays
        if (config.options && typeof config.options[0] === 'string') {
          config.options = $.map(config.options, function(opt, index) {
            return {
              id: index,
              text: opt,
              value: opt
            };
          })
          config.sortField = config.sortField || 'id'; //preserve order
        }

        if (config.create) {
          config.create = function(input) {
            var data = {};
            data[selectize.settings.labelField] = input;
            data[selectize.settings.valueField] = input;
            return data;
          };
        }
      }

      function addAngularOption(value, data) {
        $timeout(function(){
          if(config.options.length != selectize.currentResults.total)
          config.options.push(data);
        });
      }

      function updateClasses(){
        var ngClasses = element.prop('class').match(/ng-[a-z-]+/g).join(' ');

        if(ngClasses != prevNgClasses){
          var selectizeClasses = selectize.$control.prop('class').replace(/ng-[a-z-]+/g, '');
          prevNgClasses = ngClasses;
          selectize.$control.prop('class', selectizeClasses+' '+ngClasses);
        }
      }

      function refreshItem(val){
        if(!selectize.userOptions[val] && selectize.settings.create){
          selectize.addOption( selectize.settings.create(val) );
        }
      }

      function refreshSelectize(value){
        $timeout.cancel(refreshSelectizeTimeout);
        refreshSelectizeTimeout = $timeout(function(){
          if(angular.isArray(value)){
            angular.forEach(value, refreshItem);
          }else{
            refreshItem(value);
          }
          selectize.setValue(value);
          updateClasses();
        });
      }

      function toggle(disabled){
        disabled ? selectize.disable() : selectize.enable();
      }

      //init
      $timeout(function(){

        parseConfig();
        element.selectize(config);
        selectize = element[0].selectize;

        selectize.on('option_add', addAngularOption);
        scope.$watchCollection(function() {return ngModel.$modelValue }, refreshSelectize);
        attrs.$observe('disabled', toggle);

      });

    }
  };
}]);