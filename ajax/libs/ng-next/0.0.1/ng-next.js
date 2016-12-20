angular.module('next',[])
.directive('ngPass',function() {
    return {
        link : function($scope,$elem,$attrs) {
            var pass = $attrs.ngPass;
            var arr = extractArray(pass);
            var event = $attrs.ngPassEvent || 'click';
            var len = arr.length;
            /*
                @swagger this will check for the presence of each element as a
                function inside the array pass and throw error if any of them
                do not exist or is not a function
            */
            function walkThrough(arr,index) {
                if(index === arr.length) return;
                var curr = $scope[arr[index]];
                if(typeof curr !== 'function') {
                    var memberType = typeof curr;
                    throw new Error(curr + ' should be a function but instead found ' + memberType);  
                } 
                index += 1;
                walkThrough(arr,index);
            }
            walkThrough(arr,0);
            /*
                @swagger method that returns the actual array from the argument
                @args can be passed an array name that exist in the scope OR an array itself that has list of functions
            */
            function extractArray(arr) {
                var arr = arr;
                if (!arr) throw new Error('Argument passed in at ng-pass cannot be undefined');

                arr = $scope.$eval(arr);
                
                if (!arr) throw new Error('Argument passed in at ng-pass does not exist in the current scope');

                var isArray = Array.isArray(arr);

                if(!isArray) throw new Error('Argument passed in at ng-pass must be an array');

                if (!arr.length) throw new Error('Argument passed in at ng-pass cannot be an empty array');

                return arr;

            }

            $scope.next = function(err) {
                if(err)  {
                    //to be call if an error occured
                    dispose(err); 
                    return;
                };
		        if($scope.nxMethod) call();
            };

            var call = function() {
                var curr = $scope.nxCallingArr[$scope.nxCallingIndex];
                if(curr && $scope[curr]) { 
                    $scope.nxCallingIndex += 1;
                    $scope[curr]();
		            return;
                }
		        $scope.nxMethod = false;           
            };

            var dispose = function(err) {
                var errHandler = $attrs.ngPassErr;
		        $scope.nxMethod = false;
                if($scope[errHandler]) {
                    $scope[errHandler](err);
                };
            };
            
            $elem.bind(event,function() {
                $scope.nxCallingIndex = 0;
                var arr = extractArray($attrs.ngPass);
                $scope.nxCallingArr = arr;
                if($scope.nxCallingArr && $scope.nxCallingArr.length) {
		          $scope.nxMethod = true;
		          call();
		        }; 
            });
        }
    }
});
