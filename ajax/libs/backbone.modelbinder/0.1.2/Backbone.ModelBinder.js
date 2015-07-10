// Backbone.ModelBinder v0.1.1
// (c) 2012 Bart Wood
// Distributed Under MIT License

(function(){

    if(!Backbone){
        throw 'Please include Backbone.js before Backbone.ModelBinder.js';
    }

    Backbone.ModelBinder = function(){
        _.bindAll(this, '_onElChanged');
    };

    // Current version of the library. Keep in sync with `package.json`.
    Backbone.ModelBinder.VERSION = '0.1.2';
    Backbone.ModelBinder.Constants = {};
    Backbone.ModelBinder.Constants.ModelToView = 'ModelToView';
    Backbone.ModelBinder.Constants.ViewToModel = 'ViewToModel';

    _.extend(Backbone.ModelBinder.prototype, {

        bind:function (model, rootEl, attributeBindings) {
            this.unbind();

            this._model = model;
            this._rootEl = rootEl;

            if (!this._model) throw 'model must be specified';
            if (!this._rootEl) throw 'rootEl must be specified';

            if(attributeBindings){
                // Create a deep clone of the attribute bindings
                this._attributeBindings = $.extend(true, {}, attributeBindings);
            }

            this._initializeAttributeBindings();

            this._bindModelToView();
            this._bindViewToModel();
        },

        unbind:function () {
            this._unbindModelToView();
            this._unbindViewToModel();

            if(this._attributeBindings){
                delete this._attributeBindings;
                this._attributeBindings = undefined;
            }
        },

        // Converts the input bindings, which might just be empty or strings, to binding objects
        _initializeAttributeBindings:function () {
            var attributeBindingKey, inputBinding, attributeBinding, elementBindingCount, elementBinding;

            if(!this._attributeBindings){
                this._initializeDefaultAttributeBindings();
            }
            else {
                for (attributeBindingKey in this._attributeBindings) {
                    inputBinding = this._attributeBindings[attributeBindingKey];

                    if (_.isString(inputBinding)) {
                        attributeBinding = {elementBindings: [{selector: inputBinding}]};
                    }
                    else if (_.isArray(inputBinding)) {
                        attributeBinding = {elementBindings: inputBinding};
                    }
                    else if(_.isObject(inputBinding)){
                        attributeBinding = {elementBindings: [inputBinding]};
                    }
                    else {
                        throw 'Unsupported type passed to Model Binder ' + attributeBinding;
                    }

                    // Add a linkage from the element binding back to the attribute binding
                    for(elementBindingCount = 0; elementBindingCount < attributeBinding.elementBindings.length; elementBindingCount++){
                        elementBinding = attributeBinding.elementBindings[elementBindingCount];
                        elementBinding.attributeBinding = attributeBinding;
                    }

                    attributeBinding.attributeName = attributeBindingKey;
                    this._attributeBindings[attributeBindingKey] = attributeBinding;
                }

                this._initializeElBindings();
            }
        },

        _initializeDefaultAttributeBindings: function(){
            var elCount, namedEls, namedEl, name;
            this._attributeBindings = {};
            namedEls = $('[name]', this._rootEl);

            for(elCount = 0; elCount < namedEls.length; elCount++){
                namedEl = namedEls[elCount];
                name = $(namedEl).attr('name');

                // For elements like radio buttons we only want a single attribute binding with possibly multiple element bindings
                if(!this._attributeBindings[name]){
                    var attributeBinding =  {attributeName: name};
                    attributeBinding.elementBindings = [{attributeBinding: attributeBinding, boundEls: [namedEl]}];
                    this._attributeBindings[name] = attributeBinding;
                }
                else{
                    this._attributeBindings[name].elementBindings.push({attributeBinding: this._attributeBindings[name], boundEls: [namedEl]});
                }
            }
        },

        _initializeElBindings:function () {
            var bindingKey, attributeBinding, bindingCount, elementBinding, foundEls, elCount, el;
            for (bindingKey in this._attributeBindings) {
                attributeBinding = this._attributeBindings[bindingKey];

                for (bindingCount = 0; bindingCount < attributeBinding.elementBindings.length; bindingCount++) {
                    elementBinding = attributeBinding.elementBindings[bindingCount];
                    if (elementBinding.selector === '') {
						foundEls = $(this._rootEl);
                    }
                    else {
                        foundEls = $(elementBinding.selector, this._rootEl);
                    }

                    if (foundEls.length === 0) {
                        throw 'Bad binding found. No elements returned for binding selector ' + elementBinding.selector;
                    }
                    else {
                        elementBinding.boundEls = [];
                        for (elCount = 0; elCount < foundEls.length; elCount++) {
                            el = foundEls[elCount];
                            elementBinding.boundEls.push(el);
                        }
                    }
                }
            }
        },

        _bindModelToView: function () {
            this._model.on('change', this._onModelChange, this);

            this._copyModelAttributesToView();
        },

        // should only be called when initially binding the model to the view
        _copyModelAttributesToView: function(){
            var attributeName, attributeBinding;

            for (attributeName in this._attributeBindings) {
                if(this._model.has(attributeName)){
                    attributeBinding = this._attributeBindings[attributeName];
                    this._copyModelToView(attributeBinding);
                }
            }
        },

        _unbindModelToView: function(){
            if(this._model){
                this._model.off('change', this._onModelChange);
                this._model = undefined;
            }
        },

        _bindViewToModel:function () {
            $(this._rootEl).delegate('*', 'change', this._onElChanged);
            // The change event doesn't work properly for contenteditable elements - but blur does
            $(this._rootEl).delegate('[contenteditable]', 'blur', this._onElChanged);
        },

        _unbindViewToModel: function(){
            if(this._rootEl){
                $(this._rootEl).undelegate('', 'change', this._onElChanged);
                $(this._rootEl).undelegate('[contenteditable]', 'blur', this._onElChanged);
            }
        },

        _onElChanged:function (event) {
            var el = $(event.target)[0];
            var elementBinding = this._getElBinding(el);
            if (elementBinding) {
                this._copyViewToModel(elementBinding, el);
            }
        },

        _getElBinding:function (findEl) {
            var attributeName, attributeBinding, elementBindingCount, elementBinding, boundElCount, boundEl;

            for (attributeName in this._attributeBindings) {
                attributeBinding = this._attributeBindings[attributeName];

                for (elementBindingCount = 0; elementBindingCount < attributeBinding.elementBindings.length; elementBindingCount++) {
                    elementBinding = attributeBinding.elementBindings[elementBindingCount];

                    for (boundElCount = 0; boundElCount < elementBinding.boundEls.length; boundElCount++) {
                        boundEl = elementBinding.boundEls[boundElCount];

                        if (boundEl === findEl) {
                            return elementBinding;
                        }
                    }
                }
            }

            return undefined;
        },

        _onModelChange:function () {
            var changedAttribute, attributeBinding;

            for (changedAttribute in this._model.changedAttributes()) {
                attributeBinding = this._attributeBindings[changedAttribute];
                if (attributeBinding) {
                    this._copyModelToView(attributeBinding);
                }
            }
        },

        _copyModelToView:function (attributeBinding) {
            var elementBindingCount, elementBinding, boundElCount, boundEl;
            var value = this._model.get(attributeBinding.attributeName);

            for (elementBindingCount = 0; elementBindingCount < attributeBinding.elementBindings.length; elementBindingCount++) {
                elementBinding = attributeBinding.elementBindings[elementBindingCount];

                var convertedValue = this._getConvertedValue(Backbone.ModelBinder.Constants.ModelToView, elementBinding, value);

                for (boundElCount = 0; boundElCount < elementBinding.boundEls.length; boundElCount++) {
                    boundEl = elementBinding.boundEls[boundElCount];
                    this._setEl($(boundEl), elementBinding, convertedValue);
                }
            }
        },

        _setEl: function (el, elementBinding, convertedValue) {
            if (elementBinding.elAttribute) {
                this._setElAttribute(el, elementBinding, convertedValue);
            }
            else {
                this._setElValue(el, convertedValue);
            }
        },

        _setElAttribute:function (el, elementBinding, convertedValue) {
            switch (elementBinding.elAttribute) {
                case 'html':
                    el.html(convertedValue);
                    break;
                case 'text':
                    el.text(convertedValue);
                    break;
                case 'enabled':
                    el.attr('disabled', !convertedValue);
                    break;
                case 'displayed':
                    el[convertedValue ? 'show' : 'hide']();
                    break;
                case 'hidden':
                    el[convertedValue ? 'hide' : 'show']();
                    break;
                case 'class':
                    if(!convertedValue){
                        var previousValue = this._model.previous(elementBinding.attributeBinding.attributeName);
                        previousValue = this._getConvertedValue(Backbone.ModelBinder.Constants.ModelToView, elementBinding, previousValue);

                        if(previousValue){
                            el.removeClass(previousValue);
                        }
                    }
                    else{
                        el.addClass(convertedValue);
                    }
                    break;
                default:
                    el.attr(elementBinding.elAttribute, convertedValue);
            }
        },

        _setElValue:function (el, convertedValue) {
            if(el.attr('type')){
                switch (el.attr('type')) {
                    case 'radio':
                        if (el.attr('value') === convertedValue) {
                            el.attr('checked', 'checked');
                        }
                        break;
                    case 'checkbox':
                        if (convertedValue) {
                            el.attr('checked', 'checked');
                        }
                        else {
                            el.removeAttr('checked');
                        }
                        break;
                    default:
                        $(el).val(convertedValue);
                }
            }
            else if(el.is('input') || el.is('select') || el.is('textarea')){
                el.val(convertedValue);
            }
            else {
                el.html(convertedValue);
            }
        },

        _copyViewToModel: function (elementBinding, el) {
            if (!elementBinding.isSetting) {
                elementBinding.isSetting = true;
                this._setModel(elementBinding, $(el));

                if(elementBinding.converter){
                    this._copyModelToView(elementBinding.attributeBinding);
                }

                elementBinding.isSetting = false;
            }
        },

        _getElValue: function(elementBinding, el){
            switch (el.attr('type')) {
                case 'checkbox':
                    return el.prop('checked') ? true : false;
                default:
                    if(el.attr('contenteditable') !== undefined){
                        return el.html();
                    }
                    else {
                        return el.val();
                    }
            }
        },

        _setModel: function (elementBinding, el) {
            var data = {};
            var elVal = this._getElValue(elementBinding, el);
            elVal = this._getConvertedValue(Backbone.ModelBinder.Constants.ViewToModel, elementBinding, elVal);
            data[elementBinding.attributeBinding.attributeName] = elVal;
            this._model.set(data, {changeSource: 'ModelBinder'});
        },

        _getConvertedValue: function (direction, elementBinding, value) {
            if (elementBinding.converter) {
                value = elementBinding.converter(direction, value, elementBinding.attributeBinding.attributeName, this._model);
            }

            return value;
        }
    });

    Backbone.ModelBinder.CollectionConverter = function(collection){
        this._collection = collection;

        if(!this._collection){
            throw 'Collection must be defined';
        }
        _.bindAll(this, 'convert');
    };

    _.extend(Backbone.ModelBinder.CollectionConverter.prototype, {
        convert: function(direction, value){
            if (direction === Backbone.ModelBinder.Constants.ModelToView) {
                return value ? value.id : undefined;
            }
            else {
                return this._collection.get(value);
            }
        }
    });

}).call(this);
