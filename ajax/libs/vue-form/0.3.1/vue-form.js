; (function () {
    var vueForm = {};
    vueForm.install = function (Vue) {

        function closest(elem, selector) {
            var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
            while (elem) {
                if (matchesSelector.call(elem, selector)) {
                    return elem;
                } else {
                    elem = elem.parentElement;
                }
            }
            return null;
        }

        function removeClassWithPrefix(el, prefix) {
            var classes = el.className.split(" ").filter(function (c) {
                return c.lastIndexOf(prefix, 0) !== 0;
            });
            el.className = (classes.join(" ")).trim();
        }

        var emailRegExp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, // from angular
            urlRegExp = /^(http\:\/\/|https\:\/\/)(.{4,})$/,
            dirtyClass = 'vf-dirty',
            pristineClass = 'vf-pristine',
            validClass = 'vf-valid',
            invalidClass = 'vf-invalid',
            submittedClass = 'vf-submitted',
            touchedClass = 'vf-touched',
            untouchedClass = 'vf-untouched',
            attrs = [
                'type',
                'required',
                'pattern',
                'multiple',
                'minlength',
                'maxlength',
                'min',
                'max',
                'custom-validator'
            ],
            attrsWithValue = [
                'minlength',
                'maxlength',
                'min',
                'max',
                'pattern'
            ];

        var validators = {
            required: function (value) {
                if (Vue.util.isArray(value)) {
                    return !!value.length;
                }
                return !!value;
            },
            email: function (value, multiple) {
                return emailRegExp.test(value);
            },
            number: function (value) {
                return !isNaN(value);
            },
            url: function (value) {
                return urlRegExp.test(value);
            },
            minlength: function (value, length) {
                return value.length >= length;
            },
            maxlength: function (value, length) {
                return length >= value.length;
            },
            pattern: function (value, pattern) {
                var patternRegExp = new RegExp('^' + pattern + '$');
                return patternRegExp.test(value);
            },
            min: function (value, min) {
                return value * 1 >= min * 1;
            },
            max: function (value, max) {
                return max * 1 >= value * 1;
            }
        };
        
        // check if an attribute exists, static or binding.
        // if it is a binding, watch it and re-validate on change
        function checkAttribute($this, scope, attribute, objectBinding) {
            var vueFormCtrl = $this._vueFormCtrl;
            var binding = typeof objectBinding[attribute] !== 'undefined' ? objectBinding[attribute] + '' : Vue.util.getBindAttr($this.el, attribute);
            if (binding) {
                scope.$watch(binding, function (value, oldValue) {
                    vueFormCtrl[attribute] = value;
                    if (attribute === 'type') {
                        delete vueFormCtrl.validators[oldValue];
                        vueFormCtrl.validators[value] = validators[value];
                    } else if (attribute === 'custom-validator') {
                        vueFormCtrl.validators[attribute] = scope.$eval(binding);
                    } else {
                        vueFormCtrl.validators[attribute] = validators[attribute];
                        if (value === false || typeof value === 'undefined') {
                            vueFormCtrl.validators[attribute] = false;
                        }
                    }
                    if ($this._vueForm) {
                        vueFormCtrl.validate();
                    } else {
                        // this is for when an input is inside a v-if
                        // and will not be inserted into the dom for 
                        // some time
                        Vue.nextTick(function () {
                            Vue.nextTick(function () {
                                vueFormCtrl.validate();
                            });
                        });
                    }
                }, { immediate: true });
            }
            var staticAttr = $this.el.getAttribute(attribute);
            if (staticAttr !== null) {
                vueFormCtrl[attribute] = staticAttr || true;
                if (attribute === 'type') {
                    vueFormCtrl.validators[staticAttr] = validators[staticAttr];
                } else if (attribute === 'custom-validator') {
                    vueFormCtrl.validators[attribute] = scope[staticAttr];
                } else {
                    vueFormCtrl.validators[attribute] = validators[attribute];
                }
            }

        }

        Vue.directive('form', {
            id: 'form',
            priority: 10001,
            bind: function () {
                var el = this.el,
                    formName = el.getAttribute('name'),
                    hook = el.getAttribute('hook'),
                    vm = this.vm,
                    self = this,
                    controls = {};

                el.noValidate = true;

                var state = this._state = {
                    $name: formName,
                    $dirty: false,
                    $pristine: true,
                    $valid: true,
                    $invalid: false,
                    $submitted: false,
                    $touched: false,
                    $untouched: true,
                    $error: {}
                };

                // set inital state
                vm.$set(formName, state);
                Vue.util.addClass(el, pristineClass);
                Vue.util.addClass(el, validClass);
                Vue.util.addClass(el, untouchedClass);

                var vueForm = this.el._vueForm = {
                    name: formName,
                    state: state,
                    controls: controls,                    
                    addControl: function (ctrl) {
                        controls[ctrl.name] = ctrl;
                    },
                    removeControl: function (ctrl) {
                        this.removeError(ctrl.name);
                        delete controls[ctrl.name];
                        this.checkValidity();
                    },
                    setData: function (key, data) {
                        vm.$set(formName + '.' + key, data);
                    },
                    removeError: function (key) {
                        state.$error[key] = false;
                        delete state.$error[key];
                    },
                    checkValidity: function () {
                        var isValid = true;
                        Object.keys(controls).forEach(function (ctrl) {
                            if (controls[ctrl].state.$invalid) {
                                isValid = false;
                            }
                        });
                        this.setValidity(isValid);
                    },
                    setValidity: function (isValid) {
                        state.$valid = isValid;
                        state.$invalid = !isValid;
                        if (isValid) {
                            Vue.util.addClass(el, validClass);
                            Vue.util.removeClass(el, invalidClass);
                            removeClassWithPrefix(el, invalidClass + '-');
                        } else {
                            Vue.util.removeClass(el, validClass);
                            Vue.util.addClass(el, invalidClass);
                        }
                    },
                    setDirty: function () {
                        state.$dirty = true;
                        state.$pristine = false;
                        Vue.util.addClass(el, dirtyClass);
                        Vue.util.removeClass(el, pristineClass);
                    },
                    setPristine: function () {
                        state.$dirty = false;
                        state.$pristine = true;
                        Object.keys(controls).forEach(function (ctrl) {
                            controls[ctrl].setPristine();
                        });
                        vueForm.setSubmitted(false);
                        Vue.util.removeClass(el, dirtyClass);
                        Vue.util.addClass(el, pristineClass);
                    },
                    setSubmitted: function (isSubmitted) {
                        state.$submitted = isSubmitted;
                        if (isSubmitted) {
                            Vue.util.addClass(el, submittedClass);
                        } else {
                            Vue.util.removeClass(el, submittedClass);
                        }
                    }, 
                    setTouched: function () {                        
                        state.$touched = true;
                        state.$untouched = false;
                        Vue.util.addClass(el, touchedClass);
                        Vue.util.removeClass(el, untouchedClass);              
                    },
                    setUntouched: function () {                        
                        state.$touched = false;
                        state.$untouched = true;                        
                        Vue.util.removeClass(el, touchedClass);
                        Vue.util.addClass(el, untouchedClass);
                        Object.keys(controls).forEach(function (ctrl) {
                            controls[ctrl].setUntouched();
                        });                                           
                    }
                };

                if (hook) {
                    vm[hook](vueForm);
                }

                this._submitEvent = function () {
                    vueForm.setSubmitted(true);
                };
                Vue.util.on(el, 'submit', this._submitEvent);
            },
            update: function () {

            },
            unbind: function () {
                Vue.util.off(this.el, 'submit', this._submitEvent);
                delete this.el._vueForm;
            }
        });

        Vue.directive('formCtrl', {
            id: 'formCtrl',
            priority: 10000,
            deep: true,
            bind: function () {
                var inputName = this.el.getAttribute('name'),
                    boundInputName = this.el.getAttribute(':name') || this.el.getAttribute('v-bind:name'),
                    objectBindingExp = this.el.getAttribute(':') || this.el.getAttribute('v-bind'),
                    vModel = this.el.getAttribute('v-model'),
                    hook = this.el.getAttribute('hook'),
                    vm = this.vm,
                    el = this.el,
                    self = this,
                    scope, objectBinding;

                if (this._scope) {
                    // is inside loop   
                    scope = this._scope;
                } else {
                    scope = this.vm;
                }

                if (boundInputName) {
                    scope.$watch(boundInputName, function (value) {
                        inputName = value;
                    }, {
                        immediate: true                    
                    });
                }
                
                if(objectBindingExp !== null) {                   
                    objectBinding = scope.$eval(objectBindingExp);               
                    if (objectBinding.name) {
                        inputName = objectBinding.name;
                    }
                }

                if (!inputName) {
                    console.warn('Name attribute must be populated');
                    return;
                }

                var state = self._state = {
                    $name: inputName,
                    $dirty: false,
                    $pristine: true,
                    $valid: true,
                    $invalid: false,
                    $touched: false,
                    $untouched: true,
                    $error: {}
                };

                var vueFormCtrl = el._vueFormCtrl = self._vueFormCtrl = {
                    el: el,
                    name: inputName,
                    state: state,
                    setVadility: function (key, isValid) {
                        var vueForm = self._vueForm;

                        if (!vueForm) {
                            return;
                        }

                        if (typeof key === 'boolean') {
                            // when key is boolean, we are setting 
                            // overall field vadility
                            state.$valid = isValid;
                            state.$invalid = !isValid;

                            if (isValid) {
                                vueForm.removeError(inputName);
                                Vue.util.addClass(el, validClass);
                                Vue.util.removeClass(el, invalidClass);
                            } else {
                                Vue.util.removeClass(el, validClass);
                                Vue.util.addClass(el, invalidClass);
                            }
                            vueForm.checkValidity();
                            return;
                        }

                        key = Vue.util.camelize(key);
                        if (isValid) {
                            vueForm.setData(inputName + '.$error.' + key, false);
                            delete state.$error[key];
                            removeClassWithPrefix(el, invalidClass + '-');
                        } else {
                            vueForm.setData(inputName + '.$error.' + key, true);
                            vueForm.setData('$error.' + inputName, state);
                            Vue.util.addClass(el, invalidClass + '-' + key);
                        }
                    },
                    setDirty: function () {
                        state.$dirty = true;
                        state.$pristine = false;
                        self._vueForm.setDirty();
                        Vue.util.addClass(el, dirtyClass);
                        Vue.util.removeClass(el, pristineClass);
                    },
                    setPristine: function () {
                        state.$dirty = false;
                        state.$pristine = true;
                        Vue.util.removeClass(el, dirtyClass);
                        Vue.util.addClass(el, pristineClass);
                    },
                    setTouched: function (isTouched) {                        
                        state.$touched = true;
                        state.$untouched = false;
                        self._vueForm.setTouched();
                        Vue.util.addClass(el, touchedClass);
                        Vue.util.removeClass(el, untouchedClass); 
                    },       
                    setUntouched: function (isTouched) {                        
                        state.$touched = false;
                        state.$untouched = true;
                        Vue.util.removeClass(el, touchedClass);
                        Vue.util.addClass(el, untouchedClass);
                    },                                 
                    validators: {},
                    error: {},
                    validate: function () {
                        var isValid = true,
                            _this = this,
                            value = self._value;
                            
                        Object.keys(this.validators).forEach(function (validator) {
                            var args = [value];

                            if (_this.validators[validator] === false) {
                                _this.setVadility(validator, true);
                                return;
                            }

                            if (!_this.validators[validator]) {
                                return;
                            }                           
                            
                            // if not the required validator and value is 
                            // falsy but not a number, do not validate
                            if (validator !== 'required' && !value && typeof value !== 'number') {
                                _this.setVadility(validator, true);
                                return;
                            }

                            if (validator === 'email') {
                                args.push(_this.multiple);
                            } else if (attrsWithValue.indexOf(validator) !== -1) {
                                args.push(_this[validator]);
                            }

                            if (!_this.validators[validator].apply(this, args)) {
                                isValid = false;
                                _this.setVadility(validator, false);
                            } else {
                                _this.setVadility(validator, true);
                            }

                        });

                        _this.setVadility(true, isValid);

                        return isValid;
                    }
                };  
                    
                // add to validators depending on element attributes 
                attrs.forEach(function (attr) {
                    checkAttribute(self, scope, attr, objectBinding || {});
                });
                
                // find parent form             
                var form;
                if (el.form) {
                    init(el.form._vueForm);
                } else {
                    // this is either a non form element node 
                    // or a detached node (inside v-if)
                    form = closest(el, 'form[name]');
                    if (form && form._vueForm) {
                        init(form._vueForm);
                    } else {
                        // must be detached
                        setTimeout(function () {
                            form = el.form || closest(el, 'form[name]');
                            init(form._vueForm);
                        }, 0);
                    }
                }

                function init(vueForm) {
                    if (!vueForm) {
                        return;
                    }
                    self._vueForm = vueForm;
                                   
                    // register the form control
                    vueForm.addControl(vueFormCtrl);                 
                                                                                                        
                    // set inital state
                    vueForm.setData(inputName, state);
                    Vue.util.addClass(el, pristineClass);
                    Vue.util.addClass(el, validClass);
                    Vue.util.addClass(el, untouchedClass);
                    
                    Vue.util.on(el, 'blur', vueFormCtrl.setTouched);

                    var first = true;
                    if (vModel) {
                        scope.$watch(vModel, function (value, oldValue) {
                            if (!first) {
                                vueFormCtrl.setDirty();
                            }
                            first = false;
                            self._value = value;
                            vueFormCtrl.validate(value);                            
                        }, { immediate: true });
                    }

                };

                if (hook) {
                    vm[hook](vueFormCtrl);
                }

            },
            update: function (value, oldValue) {
                if (typeof value === 'undefined') {
                    return;
                }
                if (this._notfirst) {
                    this._vueFormCtrl.setDirty();
                }
                this._notfirst = true;
                this._value = value;
                this._vueFormCtrl.validate(value);                
            },
            unbind: function () {
                this._vueForm.removeControl(this._vueFormCtrl);
                Vue.util.off(this.el, 'blur', this._vueFormCtrl.setTouched);
                delete this.el._vueFormCtrl;                
            }
        });

    }

    if (typeof exports == "object") {
        module.exports = vueForm;
    } else if (typeof define == "function" && define.amd) {
        define([], function () { return vueForm });
    } else if (window.Vue) {
        window.vueForm = vueForm;
        Vue.use(vueForm);
    }

})();