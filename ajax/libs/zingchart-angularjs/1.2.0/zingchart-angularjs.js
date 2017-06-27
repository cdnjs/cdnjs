/**
* File: zingchart-angularjs.js
* Version: v1.1.0
*/

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
                    // newly generated id has to be put back on the element too to meet
                    // zingcharts requirements
                    $element.attr('id', id);
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
                    values : true,
                    render : true
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
			                injectValues($scope.zcValues, _json);
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

                $scope.$watch('zcRender', function(newValue, oldValue, scope) {
                    if(initializing.render){
                        initializing.render = !initializing.render;
                        return;
                    }

                    // Destroy the chart and re-render it with changed attributes
                    zingchart.exec(scope.id, 'destroy');
                    scope.zcRender = newValue;
                    scope.renderChart();
                },true);

                $scope.renderChart = function (){
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
                        injectValues($scope.zcValues, _json.data);
                    }

                    //Add other properties
                    _json.data.type = ($attrs.zcType) ? $attrs.zcType : _json.data.type;
                    _json.height = ($attrs.zcHeight) ? $attrs.zcHeight : _json.height;
                    _json.width = ($attrs.zcWidth) ? $attrs.zcWidth : _json.width;
                    _json.id = id;

                    //Set the box-model of the container element if the height or width are defined as 100%.
                    if(_json.width === "100%" && !$element.css('width')){
                        $element.css('width', '100%');
                    }
                    if(_json.height === "100%" && !$element.css('height')){
                        $element.css('height', '100%');
                    }
                    zingchart.render(_json);
                }
                
                $scope.$on('$destroy', function() {
                    zingchart.exec($scope.id,'destroy');
                });
            }],
            link : function($scope){
                $scope.renderChart();
            }
        };
    }]);

	/**
	* Injects values into each series, and handles multi series cases.
	* @param the values to inject into the config object
	* @param the configuration object itself.
	*/
	function injectValues(values, config) {
		if(typeof config.series === 'undefined'){
			config.series = [];
		}
		//Single Series
		if(!isMultiArray(values)){
			if(config.series[0]){
				config.series[0].values = values;
			}
			else{
				config.series.push({'values' : values});
			}
		}
		//Multi Series
		else{
			for(var i = 0; i < values.length; i++){
				if(config.series[i]){
					config.series[i].values = values[i];
				}
				else{
					config.series.push({'values' : values[i]});
				}
			}
		}
		return config;
	}

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
		return Array.isArray(_array[0]);
    }

})();
