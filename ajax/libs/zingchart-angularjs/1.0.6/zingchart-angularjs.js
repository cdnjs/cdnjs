(function(){
    'use strict';
    angular.module('zingchart-angularjs', [] )
    .directive('zingchart', [function(){
        var currentAutoId = 1;

        return {
            restrict : 'EA',
            scope : {
                id : '@',
                zcValues : '=',
                zcJson : '=',
                zcRender : '='
            },
            controller : ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                var id;
                // Get or generate id
                if(!$attrs.id){
                    id = 'zingchart-auto-' + currentAutoId;
                    currentAutoId++;
                    $attrs.id = id;
                }
                else{
                    if($attrs.id.indexOf('{{') > -1){
                        id=$scope.id;
                        $element.attr('id', id);
                    }
                    else{
                        id = $attrs.id;
                    }
                }

                var initializing = {
                    json : true,
                    values :true
                };
                $scope.$watchCollection('zcValues', function(){
                    if(initializing.values){
                        initializing.values = !initializing.values;
                        return;
                    }
                    if($scope.zcValues){
                        if(isMultiArray($scope.zcValues)){
                            zingchart.exec(id, 'setseriesvalues', {
                                values : $scope.zcValues
                            });
                        }
                        else{
                            zingchart.exec(id, 'setseriesvalues', {
                                values : [$scope.zcValues]
                            });
                        }
                    }
                });

                $scope.$watch('zcJson', function(){
                    if(initializing.json){
                        initializing.json = !initializing.json;
                        return;
                    }
                    if($attrs.zcJson){
                        var _json = $scope.zcJson;
                        //Inject values
                        if($scope.zcValues){
                            for(var i = 0; i < $scope.zcValues.length; i++){
                                if(_json.series){
                                    if(_json.series[i]){
                                        _json.series[i].values = $scope.zcValues[i];
                                    }
                                    else{
                                        _json.series.push({'values' : $scope.zcValues[i]});
                                    }
                                }
                                else{

                                    _json.series = [{'values' : $scope.zcValues[i]}];
                                }
                            }
                        }
                        //Inject type
                        if(JSON.stringify(_json).indexOf('type') === -1){
                            _json.type = 'line';
                        }
                        else{
                            _json.type = ($attrs.zcType) ? $attrs.zcType : _json.type
                        }
                        zingchart.exec(id, 'setdata', {
                            data : _json
                        });
                    }
                },true);

            }],
            link : function($scope, $element, $attrs){
                var id = $element.attr('id');

                //Defaults
                var _json = {
                    data : {
                        type : 'line',
                        series : []
                    },
                    width : 600,
                    height: 400
                };

                //Add render object.
                if($scope.zcRender){
                    mergeObject($scope.zcRender, _json);
                }

                //Add JSON object
                if($scope.zcJson){
                    mergeObject($scope.zcJson, _json.data);
                }

                //Add Values
                if($scope.zcValues){
                    if(typeof _json.data.series === 'undefined'){
                        _json.data.series = [];
                    }
                    //Single Series
                    if(!isMultiArray($scope.zcValues)){
                        if(_json.data.series[0]){
                            _json.data.series[0].values = $scope.zcValues;
                        }
                        else{
                            _json.data.series.push({'values' : $scope.zcValues});
                        }
                    }
                    //Multi Series
                    else{
                        for(var i = 0; i < $scope.zcValues.length; i++){
                            if(_json.data.series[i]){
                                _json.data.series[i].values = $scope.zcValues[i];
                            }
                            else{
                                _json.data.series.push({'values' : $scope.zcValues[i]});
                            }
                        }
                    }
                }

                //Add other properties
                _json.data.type = ($attrs.zcType) ? $attrs.zcType : _json.data.type;
                _json.height = ($attrs.zcHeight) ? $attrs.zcHeight : _json.height;
                _json.width = ($attrs.zcWidth) ? $attrs.zcWidth : _json.width;
                _json.id = id;

                //Set the box-model of the container element if the height or width are defined as 100%.
                if(_json.width === "100%" && !$element.width){
                    $element.css('width', '100%');
                }
                if(_json.height === "100%" && !$element.height){
                    $element.css('height', '100%');
                }

                zingchart.render(_json);
            }
        };
    }]);

    /**
    *   Helper function to merge an object into another, overwriting properties.
    *   A shallow, not a recursive merge
    *   @param {object} fromObj - The object that has properties to be merged
    *   @param {object} intoObj - The object being merged into (Result)
    */
    function mergeObject(fromObj, intoObj){
        for(var property in fromObj){
            if (fromObj.hasOwnProperty(property)) {
                intoObj[property] = fromObj[property];
            }
        }
    }

    /**
    *   Determines whether an array is multidimensional or not.
    *   @param {array} _array - The array to test
    *   @returns {boolean} - true if the array is multidimensional, false otherwise
    */
    function isMultiArray(_array){
        if(typeof _array[0] === "string" || typeof _array[0] === "number"){
            return false;
        }
        else{
            return true;
        }
    }

})();
