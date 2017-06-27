/**
 * Angular Selectize2
 * https://github.com/machineboy2045/angular-selectize
 **/

angular.module('selectize', []).value('selectizeConfig', {}).directive("selectize", ['selectizeConfig', function(selectizeConfig) {
  return {
    restrict: 'EA',
    require: '^ngModel',
    scope: {ngModel: '=', config: '=selectize', options: '=', ngDisabled: '='},
    link: function(scope, element, attrs, modelCtrl) {
      var config = angular.copy(scope.config);
      var selectize;

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

      function addAngularOption(value, data) {
        scope.$evalAsync(function(){
          if(selectize.currentResults && (scope.options.length < selectize.currentResults.total)){
            scope.options.push(data);
          }
        });

      }

      function createItem(input) {
        var data = {};
        data[selectize.settings.labelField] = input;
        data[selectize.settings.valueField] = input;
        return data;
      }

      function toggle(disabled){
        disabled ? selectize.disable() : selectize.enable();
      }

      function setDirty(){
        modelCtrl.$setViewValue(modelCtrl.$modelValue);
      }

      function updateClasses(){
        selectize.$control.toggleClass('ng-invalid', modelCtrl.$invalid)
      }

      function updateValidity(){
        modelCtrl.$setValidity('required', !config.required || scope.ngModel.length)
        updateClasses();
      }

      function getValue(){
        if(selectize.settings.maxItems === 1)
          return selectize.items.join(selectize.settings.delimiter);
        else
          return selectize.items;
      }

      function updateAngularValue(val){
        if(val ===  scope.ngModel)
          return false;
        else
          setDirty();


        scope.$evalAsync(function(){
          scope.ngModel = getValue();
          updateValidity();
        });
      }

      function updateSelectizeOptions(value, prev){
        if( value === prev ) return;

        var needOptionRefresh = false;

        value = angular.isArray(value) ? value : [value]

        angular.forEach(value, function(item){
          var value = item[selectize.settings.valueField];
          if(!selectize.options[value]){
            selectize.addOption(item);
            needOptionRefresh = true;
          }
        });

        if(needOptionRefresh)
          selectize.refreshOptions(false);
      }

      function updateSelectizeValue(value, prev){
        var needOptionRefresh = false;


        if(value === prev) return;

        selectize.clear();


        if(!value || !value.length)
          return updateValidity();


        value = angular.isArray(value) ? value : [value]


        angular.forEach(value, function(val){

          if(selectize.settings.create){
            var item = createItem(val)
            if(!selectize.options[val]){
              selectize.addOption(item);
              needOptionRefresh = true;
            }
          }


          selectize.addItem(val);
        });

        if(needOptionRefresh)
          selectize.refreshOptions(false);

        updateValidity();

      }

      parseConfig();
      element.selectize(config);
      selectize = element[0].selectize;
      selectize.setValue(scope.ngModel);

      selectize.on('option_add', addAngularOption);
      selectize.on('change', updateAngularValue);

      scope.$watchCollection('options', updateSelectizeOptions);
      scope.$watch('ngModel', updateSelectizeValue, true);
      scope.$watch('ngDisabled', toggle);
    }
  };
}]);
