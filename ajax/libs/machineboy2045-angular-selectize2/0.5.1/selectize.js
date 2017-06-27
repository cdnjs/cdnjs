/**
 * Angular Selectize2
 * https://github.com/machineboy2045/angular-selectize
 **/

angular.module('selectize', []).value('selectizeConfig', {}).directive("selectize", ['selectizeConfig', '$timeout', function(selectizeConfig, $timeout) {

    return {
    restrict: 'A',
    template: '<select><option></option></select>',
    replace: true,
    scope: {ngModel: '=', config: '=selectize', options: '=', ngDisabled: '='},
    link: function(scope, element, attrs) {
      var config = angular.copy(scope.config);
      var selectize;
      var prevNgClasses = '';


      function parseConfig(){
        config.options = scope.options || [];


        if (typeof selectizeConfig !== 'undefined') {
          var defaultConfig = angular.copy(selectizeConfig);
          config = angular.extend(defaultConfig, config);
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
      }


      function updateClasses(){
        var ngClasses = element.prop('class').match(/ng-[a-z-]+/g).join(' ');

        if(ngClasses != prevNgClasses){
          var selectizeClasses = selectize.$control.prop('class').replace(/ng-[a-z-]+/g, '');
          prevNgClasses = ngClasses;
          selectize.$control.prop('class', selectizeClasses+' '+ngClasses);
        }
      }

      function addAngularOption(value, data) {
        scope.$evalAsync(function(){
          if(selectize.currentResults && (scope.options.length < selectize.currentResults.total)){
            scope.options.push(data);
          }
        });

      }


      function addSelectizeOptions(value, prev){
        if(!config.create){
          return;
        }
        if(angular.isArray(value)){
          angular.forEach(value, function(val){
            selectize.addOption(val);
          });
        }else{
          selectize.addOption(value);
        }
      }

      function toggle(disabled){
        disabled ? selectize.disable() : selectize.enable();
      }


      function updateAngularValue(val){
        scope.$evalAsync(function(){
          scope.ngModel = val;
        })
      }

      function updateSelectizeValue(curr, prev){
        if(curr === prev) return;
        //use timeout to wait in case options are being added
        $timeout(function(){
          selectize.setValue(curr);
          updateClasses();
        })

      }

      parseConfig();
      element.selectize(config);
      selectize = element[0].selectize;
      selectize.setValue(scope.ngModel);

      selectize.on('option_add', addAngularOption);
      selectize.on('change', updateAngularValue)

      scope.$watch('ngModel', updateSelectizeValue, true);
      scope.$watchCollection('options', addSelectizeOptions);
      scope.$watch('ngDisabled', toggle);


    }
  };
}]);
