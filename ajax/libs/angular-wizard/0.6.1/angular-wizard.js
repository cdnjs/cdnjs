/**
 * Easy to use Wizard library for AngularJS
 * @version v0.6.0 - 2015-12-31 * @link https://github.com/mgonto/angular-wizard
 * @author Martin Gontovnikas <martin@gon.to>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularwizard', ['step.html', 'wizard.html']);

angular.module("step.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step.html",
    "<section ng-show=\"selected\" ng-class=\"{current: selected, done: completed}\" class=\"step\" ng-transclude>\n" +
    "</section>");
}]);

angular.module("wizard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("wizard.html",
    "<div>\n" +
    "    <div class=\"steps\" ng-transclude></div>\n" +
    "    <ul class=\"steps-indicator steps-{{getEnabledSteps().length}}\" ng-if=\"!hideIndicators\">\n" +
    "      <li ng-class=\"{default: !step.completed && !step.selected, current: step.selected && !step.completed, done: step.completed && !step.selected, editing: step.selected && step.completed}\" ng-repeat=\"step in getEnabledSteps()\">\n" +
    "        <a ng-click=\"goTo(step)\">{{step.title || step.wzTitle}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module('mgo-angular-wizard', ['templates-angularwizard']);

angular.module('mgo-angular-wizard').directive('wzStep', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            wzTitle: '@',
            canenter : '=',
            canexit : '=',
            disabled: '@?wzDisabled',
            description: '@',
            wzData: '='
        },
        require: '^wizard',
        templateUrl: function(element, attributes) {
          return attributes.template || "step.html";
        },
        link: function($scope, $element, $attrs, wizard) {
            $scope.title = $scope.wzTitle;
            wizard.addStep($scope);
        }
    };
});

//wizard directive
angular.module('mgo-angular-wizard').directive('wizard', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            currentStep: '=',
            onFinish: '&',
            hideIndicators: '=',
            editMode: '=',
            name: '@'
        },
        templateUrl: function(element, attributes) {
            return attributes.template || "wizard.html";
        },

        //controller for wizard directive, treat this just like an angular controller
        controller: ['$scope', '$element', '$log', 'WizardHandler', '$q', function($scope, $element, $log, WizardHandler, $q) {
            //this variable allows directive to load without having to pass any step validation
            var firstRun = true;
            //creating instance of wizard, passing this as second argument allows access to functions attached to this via Service
            WizardHandler.addWizard($scope.name || WizardHandler.defaultName, this);

            $scope.$on('$destroy', function() {
                WizardHandler.removeWizard($scope.name || WizardHandler.defaultName);
            });

            //steps array where all the scopes of each step are added
            $scope.steps = [];

            var stepIdx = function(step) {
                var idx = 0;
                var res = -1;
                angular.forEach($scope.getEnabledSteps(), function(currStep) {
                  if (currStep === step) {
                    res = idx;
                  }
                  idx++;
                });
                return res;
            };

            var stepByTitle = function(titleToFind) {
              var foundStep = null;
              angular.forEach($scope.getEnabledSteps(), function(step) {
                if (step.wzTitle === titleToFind) {
                  foundStep = step;
                }
              });
              return foundStep;
            };

            //access to context object for step validation
            $scope.context = {};

            //watching changes to currentStep
            $scope.$watch('currentStep', function(step) {
                //checking to make sure currentStep is truthy value
                if (!step) return;
                //setting stepTitle equal to current step title or default title
                var stepTitle = $scope.selectedStep.wzTitle;
                if ($scope.selectedStep && stepTitle !== $scope.currentStep) {
                    //invoking goTo() with step title as argument
                    $scope.goTo(stepByTitle($scope.currentStep));
                }

            });

            //watching steps array length and editMode value, if edit module is undefined or null the nothing is done
            //if edit mode is truthy, then all steps are marked as completed
            $scope.$watch('[editMode, steps.length]', function() {
                var editMode = $scope.editMode;
                if (angular.isUndefined(editMode) || (editMode === null)) return;

                if (editMode) {
                    angular.forEach($scope.getEnabledSteps(), function(step) {
                        step.completed = true;
                    });
                } else {
                    var completedStepsIndex = $scope.currentStepNumber() - 1;
                    angular.forEach($scope.getEnabledSteps(), function(step, stepIndex) {
                        if(stepIndex >= completedStepsIndex) {
                            step.completed = false;
                        }
                    });
                }
            }, true);

            //called each time step directive is loaded
            this.addStep = function(step) {
                //pushing the scope of directive onto step array
                $scope.steps.push(step);
                //if this is first step being pushed then goTo that first step
                if ($scope.getEnabledSteps().length === 1) {
                    //goTo first step
                    $scope.goTo($scope.getEnabledSteps()[0]);
                }
            };

            this.context = $scope.context;

            $scope.getStepNumber = function(step) {
                return stepIdx(step) + 1;
            };

            $scope.goTo = function(step) {
                //if this is the first time the wizard is loading it bi-passes step validation
                if(firstRun){
                    //deselect all steps so you can set fresh below
                    unselectAll();
                    $scope.selectedStep = step;
                    //making sure current step is not undefined
                    if (!angular.isUndefined($scope.currentStep)) {
                        $scope.currentStep = step.wzTitle;
                    }
                    //setting selected step to argument passed into goTo()
                    step.selected = true;
                    //emit event upwards with data on goTo() invoktion
                    $scope.$emit('wizard:stepChanged', {step: step, index: stepIdx(step)});
                    //setting variable to false so all other step changes must pass validation
                    firstRun = false;
                } else {
                    //createing variables to capture current state that goTo() was invoked from and allow booleans
                    var thisStep;
                    //getting data for step you are transitioning out of
                    if($scope.currentStepNumber() > 0){
                        thisStep = $scope.currentStepNumber() - 1;
                    } else if ($scope.currentStepNumber() === 0){
                        thisStep = 0;
                    }
                    //$log.log('steps[thisStep] Data: ', $scope.getEnabledSteps()[thisStep].canexit);
                    $q.all([canExitStep($scope.getEnabledSteps()[thisStep], step), canEnterStep(step)]).then(function(data) {
                        if(data[0] && data[1]){
                            //deselect all steps so you can set fresh below
                            unselectAll();

                            //$log.log('value for canExit argument: ', $scope.currentStep.canexit);
                            $scope.selectedStep = step;
                            //making sure current step is not undefined
                            if(!angular.isUndefined($scope.currentStep)){
                                $scope.currentStep = step.wzTitle;
                            }
                            //setting selected step to argument passed into goTo()
                            step.selected = true;
                            //emit event upwards with data on goTo() invoktion
                            $scope.$emit('wizard:stepChanged', {step: step, index: stepIdx(step)});
                            //$log.log('current step number: ', $scope.currentStepNumber());
                        }
                    });
                }
            };

            function canEnterStep(step) {
                var defer,
                    canEnter;
                //If no validation function is provided, allow the user to enter the step
                if(step.canenter === undefined){
                    return true;
                }
                //If canenter is a boolean value instead of a function, return the value
                if(typeof step.canenter === 'boolean'){
                    return step.canenter;
                }
                //Check to see if the canenter function is a promise which needs to be returned
                canEnter = step.canenter($scope.context);
                if(angular.isFunction(canEnter.then)){
                    defer = $q.defer();
                    canEnter.then(function(response){
                        defer.resolve(response);
                    });
                    return defer.promise;
                } else {
                    return canEnter === true;
                }
            }

            function canExitStep(step, stepTo) {
                var defer,
                    canExit;
                //Exiting the step should be allowed if no validation function was provided or if the user is moving backwards
                if(typeof(step.canexit) === 'undefined' || $scope.getStepNumber(stepTo) < $scope.currentStepNumber()){
                    return true;
                }
                //If canexit is a boolean value instead of a function, return the value
                if(typeof step.canexit === 'boolean'){
                    return step.canexit;
                }
                //Check to see if the canexit function is a promise which needs to be returned
                canExit = step.canexit($scope.context);
                if(angular.isFunction(canExit.then)){
                    defer = $q.defer();
                    canExit.then(function(response){
                        defer.resolve(response);
                    });
                    return defer.promise;
                } else {
                    return canExit === true;
                }
            }

            $scope.currentStepNumber = function() {
                //retreive current step number
                return stepIdx($scope.selectedStep) + 1;
            };

            $scope.getEnabledSteps = function() {
                return $scope.steps.filter(function(step){
                    return step.disabled !== 'true';
                });
            };

            //unSelect All Steps
            function unselectAll() {
                //traverse steps array and set each "selected" property to false
                angular.forEach($scope.getEnabledSteps(), function (step) {
                    step.selected = false;
                });
                //set selectedStep variable to null
                $scope.selectedStep = null;
            }

            //ALL METHODS ATTACHED TO this ARE ACCESSIBLE VIA WizardHandler.wizard().methodName()

            this.currentStepTitle = function(){
                return $scope.selectedStep.wzTitle;
            };

            this.currentStepDescription = function(){
                return $scope.selectedStep.description;
            };

            this.currentStep = function(){
                return $scope.selectedStep;
            };

            this.totalStepCount = function() {
                return $scope.getEnabledSteps().length;
            }

            //Access to enabled steps from outside
            this.getEnabledSteps = function(){
                return $scope.getEnabledSteps();
            };

            //Access to current step number from outside
            this.currentStepNumber = function(){
                return $scope.currentStepNumber();
            };
            //method used for next button within step
            this.next = function(callback) {
                var enabledSteps = $scope.getEnabledSteps();
                //setting variable equal to step  you were on when next() was invoked
                var index = stepIdx($scope.selectedStep);
                //checking to see if callback is a function
                if(angular.isFunction(callback)){
                   if(callback()){
                        if (index === enabledSteps.length - 1) {
                            this.finish();
                        } else {
                            //invoking goTo() with step number next in line
                            $scope.goTo(enabledSteps[index + 1]);
                        }
                   } else {
                        return;
                   }
                }
                if (!callback) {
                    //completed property set on scope which is used to add class/remove class from progress bar
                    $scope.selectedStep.completed = true;
                }
                //checking to see if this is the last step.  If it is next behaves the same as finish()
                if (index === enabledSteps.length - 1) {
                    this.finish();
                } else {
                    //invoking goTo() with step number next in line
                    $scope.goTo(enabledSteps[index + 1]);
                }

            };

            //used to traverse to any step, step number placed as argument
            this.goTo = function(step) {
                var enabledSteps = $scope.getEnabledSteps();
                var stepTo;
                //checking that step is a Number
                if (angular.isNumber(step)) {
                    stepTo = enabledSteps[step];
                } else {
                    //finding the step associated with the title entered as goTo argument
                    stepTo = stepByTitle(step);
                }
                //going to step
                $scope.goTo(stepTo);
            };

            //calls finish() which calls onFinish() which is declared on an attribute and linked to controller via wizard directive.
            this.finish = function() {
                if ($scope.onFinish) {
                    $scope.onFinish();
                }
            };
            
            this.previous = function() {
                //getting index of current step
                var index = stepIdx($scope.selectedStep);
                //ensuring you aren't trying to go back from the first step
                if (index === 0) {
                    throw new Error("Can't go back. It's already in step 0");
                } else {
                    //go back one step from current step
                    $scope.goTo($scope.getEnabledSteps()[index - 1]);
                }
            };

            //cancel is alias for previous.
            this.cancel = function() {
                //getting index of current step
                var index = stepIdx($scope.selectedStep);
                //ensuring you aren't trying to go back from the first step
                if (index === 0) {
                    throw new Error("Can't go back. It's already in step 0");
                } else {
                    //go back one step from current step
                    $scope.goTo($scope.getEnabledSteps()[0]);
                }
            };

            //reset
            this.reset = function(){
                //traverse steps array and set each "completed" property to false
                angular.forEach($scope.getEnabledSteps(), function (step) {
                    step.completed = false;
                });
                //go to first step
                this.goTo(0);
            };
        }]
    };
});
function wizardButtonDirective(action) {
    angular.module('mgo-angular-wizard')
        .directive(action, function() {
            return {
                restrict: 'A',
                replace: false,
                require: '^wizard',
                link: function($scope, $element, $attrs, wizard) {

                    $element.on("click", function(e) {
                        e.preventDefault();
                        $scope.$apply(function() {
                            $scope.$eval($attrs[action]);
                            wizard[action.replace("wz", "").toLowerCase()]();
                        });
                    });
                }
            };
        });
}

wizardButtonDirective('wzNext');
wizardButtonDirective('wzPrevious');
wizardButtonDirective('wzFinish');
wizardButtonDirective('wzCancel');
wizardButtonDirective('wzReset');

angular.module('mgo-angular-wizard').factory('WizardHandler', function() {
   var service = {};
   
   var wizards = {};
   
   service.defaultName = "defaultWizard";
   
   service.addWizard = function(name, wizard) {
       wizards[name] = wizard;
   };
   
   service.removeWizard = function(name) {
       delete wizards[name];
   };
   
   service.wizard = function(name) {
       var nameToUse = name;
       if (!name) {
           nameToUse = service.defaultName;
       }
       
       return wizards[nameToUse];
   };
   
   return service;
});
