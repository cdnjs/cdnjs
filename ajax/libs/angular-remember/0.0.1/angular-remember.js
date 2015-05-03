var app = angular.module("remember", []);
//angular.module("myDirective")
angular.module("remember")
    .factory("inputStorage", ['localStorage', function(localStorage){
        var storage = localStorage("inputs");
        var saved = storage._getFromLocalStorage();

        var save = {
            /**
             * Возвращает значение по селектору или создает ключ
             * с пустым значением в обьекте saved
             * @param {String} selector имя модели
             * @returns {String|Boolean} либо значение модели,
             * либо false в случае, если значения нет
             */
            getValue: function(selector){
                if(!saved[selector])
                    false;
                return saved[selector];
            },
            /**
             * Меняет значения по селектору и сохраняет их в localStorage
             * @param {String} selector имя модели, которое выступает
             * ключом для обьекта saved
             * @param {String} value значение модели
             */
            changeValue: function(selector, value) {
                saved[selector] = value;
                storage._saveToLocalStorage(saved);
            },
            /**
             * Если ключ в существует в saved, то возращает
             * saved. В противном случае создает пару ключ-значение
             * как модель-false
             * @param {String} selector имя модели
             * @returns {Object} saved то, что хранится в localStorage
             */
            getStorage: function (selector){
                //if(saved == undefined)
                    //saved = storage._getFromLocalStorage();
                if(selector in saved){
                    return saved;
                }

                saved[selector] = false;
                return saved;
            }
        };
        return save;
    }])
//angular.module("myDirective")
angular.module("remember")
    /*
    @param {
     */
    .factory("localStorage", function(){
        var STORAGE_ID;
        /**
         * Возвращает обьект с двумя методами для сохранения
         * и считывания значения localStorage с (де)сериализацией
         * @param {String} ключ для localStorage
         */
        return function(id){
            STORAGE_ID = id;
            return {
                /**
                 * Возвращает десериализованную строку по ключу id из
                 * localStorage. Ключ сохраняется в замыкании
                 * @private
                 * @return {Object|Array|'{}'}
                 */
                _getFromLocalStorage: function(){
                    console.log("id", STORAGE_ID);
                    return JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
                },
                /**
                 * Сериазилует обьект и записывает его в localStorage по ключу
                 * id, что сохраняется в замыкании
                 * @param {Object|Array} inputs
                 * @private
                 */
                _saveToLocalStorage: function(inputs){
                    localStorage.setItem(STORAGE_ID, JSON.stringify(inputs))
                }
            }
        }
    })

//angular.module("myDirective")
angular.module("remember")
    .directive("remember", ['inputStorage', function(inputStorage){
        return {
            scope:{
                "model": "=ngModel", //знанчение модели
                "modelName": "@ngModel" //само название модели
            },
            link: function(scope, elem, attr){
                var selector = scope.modelName;
                var saved = inputStorage.getStorage(selector);

                var value;
                if(value = inputStorage.getValue(selector))
                    scope.model = value;

                scope.$watch("model", function(newVal, oldVal){ //work with checkbox
                    inputStorage.changeValue(selector, newVal);
                }, true)

                //elem.on("change", function(){ //work with input type text
                //    console.log("on change emit and value =", elem.val());
                //    console.log("on change emit and value =", scope.model);
                    //inputStorage.changeValue(selector, indx, scope.model);
                //})
            }
        };
}])