// Copyright (c) 2013 Intuit, Inc
// Author: Matthew Eagar (matthew_eagar@intuit.com)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function($) {
    $.fn.progressStep = function (options) {
        //----------------------------------------------------------------------
        //* Poor man's singleton 
        //----------------------------------------------------------------------
        if (this.getSteps) {
            return this;
        }
    
        //----------------------------------------------------------------------
        //* Private variables 
        //----------------------------------------------------------------------
        var _options = $.extend({}, $.fn.progressStep.defaults, options);
        var _steps = [];
        var _currentStepIndex = -1;
        var _clickEnabled = true;
        var _progress = this;
        var _paper = Raphael(this.get(0), this.width(), this.height());
        
        //----------------------------------------------------------------------
        //* Private methods 
        //----------------------------------------------------------------------
        function setPosition(step, hCenter, vCenter) {
            step.circle.attr({
                cx: hCenter,
                cy: vCenter
            });
            
            step.highlight.attr({
                cx: hCenter,
                cy: vCenter
            });

            step.label.attr({
                x: hCenter,
                y: vCenter + _options.labelOffset,
                "font-size": _options["font-size"]
            });

            step.number.attr({
                x: hCenter, 
                y: vCenter,
                "font-size": _options.radius
            });
        }
            
        function setActive(step, active) {
            var opacity = 0;
            var labelColor = _options.strokeColor;
            var numberColor = _options.strokeColor;
            if (active) {
                opacity = 100;
                labelColor = _options.activeColor;
                numberColor = _options.fillColor;
            }
            else if (step.visited) {
                step.circle.attr("fill", _options.visitedFillColor);
            }
            step.highlight.attr("opacity", opacity);
            step.label.attr("fill", labelColor);
            step.number.attr("fill", numberColor);
            step.active = active;
        }
        
        //----------------------------------------------------------------------
        //* Public properties 
        //----------------------------------------------------------------------
        this.getClickEnabled = function () {
            return _clickEnabled;
        };
        
        this.setClickEnabled = function (enabled) {
            _clickEnabled = enabled;
        };
        
        this.getOptions = function () {
            return _options;
        };
        
        this.getSteps = function () {
            return _steps;
        };
        
        this.getCurrentStep = function () {
            return _currentStepIndex;
        };

        this.getStep = function (stepIndex) {
            var step = null;
            if (stepIndex >= 0 && stepIndex < _steps.length) {
                step = _steps[stepIndex];
            }
            return step;
        }

        this.setCurrentStep = function (stepIndex) {
            if (stepIndex == _currentStepIndex) {
                // continue
            }
            else {
                var proceed = true;
                var currentStep = this.getStep(_currentStepIndex);
                if (currentStep) {
                    proceed = currentStep.beforeExit(currentStep);
                    if (proceed) {
                        setActive(currentStep, false);
                    }
                }
            
                if (proceed) {
                    var newStep = this.getStep(stepIndex);
                    if (newStep) {
                        proceed = newStep.beforeEntry.call(newStep);
                        if (proceed) {
                            setActive(newStep, true);
                            newStep.setVisited(true);
                            _currentStepIndex = stepIndex;
                            newStep.afterEntry.call(newStep);
                        }
                    }
                    else {
                        _currentStepIndex = -1;
                    }
                    
                    if (currentStep) {
                        if (proceed) {
                            currentStep.afterExit.call(currentStep);
                        }
                    }
                }
            }           
        };
        
        //----------------------------------------------------------------------
        //* Public methods
        //----------------------------------------------------------------------
        this.addStep = function(name) {
            if (name == undefined) {
                name = "";
            }
        
            var circle = _paper.circle(0, 0, _options.radius - 1);
            circle.attr({
                fill: _options.fillColor,
                stroke: _options.strokeColor,
                "stroke-width": 2
            });
            
            var highlight = _paper.circle(0, 0, _options.radius - 3);
            highlight.attr({
                fill: _options.activeColor,
                "stroke-width": 0,
                opacity: 0
            });
            
            var label = _paper.text(0, 0, name);
            label.attr({
                "text-anchor": "middle",
                stroke: "none",
                fill: _options.strokeColor,
                "font-family": _options["font-family"],
                "font-size": _options["font-size"],
                "font-weight": _options["font-weight"]
            });
            
            var stepIndex = _steps.length;
            var number = _paper.text(0, 0, (stepIndex + 1));
            number.attr({
                "text-anchor": "middle",
                stroke: "none",
                fill: _options.strokeColor,
                "font-family": _options["font-family"],
                "font-size": _options.radius,
                "font-weight": _options["font-weight"]
            });
        
            var step = {
                name: name,
                circle: circle,
                highlight: highlight,
                label: label,
                number: number,
                active: false,
                visited: false,
                index: stepIndex,
                onClick: function() { return false; },
                beforeEntry: function() { return true; }, 
                afterEntry: function() {},
                beforeExit: function() { return true; },
                afterExit: function() {},
                setVisited: function(visited) {
                    if (this.active) {
                        // continue
                    }
                    else {
                        var fillColor = _options.fillColor;
                        if (visited) {
                            fillColor = _options.visitedFillColor;
                        }
                        this.circle.attr("fill", fillColor);
                    }
                    this.visited = visited;
                }
            };
            
            var onStepClick = function () {
                if (_clickEnabled) {
                    if (step.onClick.call(step)) {
                        _progress.setCurrentStep(step.index);
                    }
                }
            };
            
            circle.click(onStepClick);
            highlight.click(onStepClick);
            number.click(onStepClick);
            
            _steps.push(step);
            
            return step;
        };
        
        this.refreshLayout = function() {
            _paper.setSize(this.width(), this.height());

            if (this.connector) {
                this.connector.remove();
            }
        
            var stepCount = _steps.length;
            if (stepCount == 0) {
                // nothing to draw    
            }
            else if (stepCount == 1) {
                var hCenter = Math.floor((_paper.width - _paper._left) / 2);
                var vCenter = Math.floor((_paper.height - _paper._top) / 2);
                var currentStep = _steps[0];
                setPosition(currentStep, hCenter, vCenter);
            }
            else {
                var vCenter = Math.floor((_paper.height - _paper._top) / 2);
                var usableWidth = _paper.width - 
                                  _paper._left - 
                                  2 * (_options.margin + _options.radius);
                var increment = Math.floor(usableWidth / (stepCount - 1));
                var hCenter = _paper._left + _options.margin + _options.radius;
                
                this.connector = _paper.path("M" + hCenter + "," + vCenter + 
                                             "L" + (hCenter + usableWidth) + "," + vCenter);
                this.connector.attr("stroke", _options.strokeColor);
                this.connector.toBack();
                
                for (var stepCounter = 0; stepCounter < stepCount; stepCounter++) {
                    var currentStep = _steps[stepCounter];
                    setPosition(currentStep, hCenter, vCenter);
                    hCenter += increment;
                }
            }
        };
        
        return this;
    };
    
    //--------------------------------------------------------------------------
    //* Class defaults
    //--------------------------------------------------------------------------
    $.fn.progressStep.defaults = {
        activeColor: "#4a9a49",
        strokeColor: "#d4d4d4",
        fillColor: "#ffffff",
        visitedFillColor: "#dddddd",
        margin: 10,
        radius: 15,
        labelOffset: 30,
        "font-family": "'Helvetica Neue', 'Helvetica', Arial, sans-serif",
        "font-size": 10,
        "font-weight": "normal"
    };
}(jQuery));
