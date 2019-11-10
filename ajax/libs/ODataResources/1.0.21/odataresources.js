angular.module('ODataResources', ['ng']);;

angular.module('ODataResources').
  factory('$odataOperators', [function() {

      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      var trim = function(value) {
        return value.replace(rtrim, '');
      };
        

  		var filterOperators =  {
  			'eq':['=','==','==='],
			'ne':['!=','!==','<>'],
			'gt':['>'],
			'ge':['>=','>=='],
			'lt':['<'],
			'le':['<=','<=='],
			'and':['&&'],
			'or':['||'],
			'not':['!'],
			'add':['+'],
			'sub':['-'],
			'mul':['*'],
			'div':['/'],
			'mod':['%'],
  		};

  		var convertOperator = function(from){
  			var input = trim(from).toLowerCase();
  			var key;
  			for(key in filterOperators)
  			{
  				if(input === key) return key;

  				var possibleValues = filterOperators[key];
  				for (var i = 0; i < possibleValues.length; i++) {
  					if(input === possibleValues[i]){
  						return key;
  					}
  				}
  			}

  			throw "Operator "+ from+" not found";
  		};

  		return {
  			operators : filterOperators,
  			convert:convertOperator,
  		};
  	}]);
;angular.module('ODataResources').
factory('$odataValue', [

    function() {
        var illegalChars = {
            '%': '%25',
            '+': '%2B',
            '/': '%2F',
            '?': '%3F',
            '#': '%23',
            '&': '%26'
        };
        var escapeIllegalChars = function(string) {
            for (var key in illegalChars) {
                string = string.replace(key, illegalChars[key]);
            }
            string = string.replace(/'/g, "''");
            return string;
        };
        var ODataValue = function(input, type) {
            this.value = input;
            this.type = type;
        };

        var generateDate = function(date,isOdataV4){
        	if(!isOdataV4){
        		return "datetime'" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)+':'+("0" + date.getSeconds()).slice(-2) + "'";
        	}else{
        		return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)+':'+("0" + date.getSeconds()).slice(-2) + "Z";
        	}
        };
        
        var generateGuid = function(guidValue, isOdataV4){
            if(!isOdataV4){
                return "guid'"+guidValue+"'";
            }else{
                return guidValue;
            } 
        };
		
		var generateDateOffset = function (date, isOdataV4) {
            if (!isOdataV4) {
                return "datetimeoffset'" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2) + "'";
            } else {
                return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2) + "Z";
            }
        };

        ODataValue.prototype.executeWithUndefinedType = function(isOdataV4) {
            if (angular.isString(this.value)) {
                return "'" + escapeIllegalChars(this.value) + "'";
            } else if (this.value === false) {
                return "false";
            } else if (this.value === true) {
                return "true";
            } else if (angular.isDate(this.value)) {
                return generateDate(this.value,isOdataV4);
            } else if (!isNaN(this.value)) {
                return this.value;
            } else {
                throw "Unrecognized type of " + this.value;
            }
        };

        ODataValue.prototype.executeWithType = function(isOdataV4){
        	if(this.value === true || this.value === false){
	        	if(this.type.toLowerCase() === "boolean"){
	        		return !!this.value+"";
	        	}else if(this.type.toLowerCase() === "string"){
	        		return "'"+!!this.value+"'";
	        	}else {
	        		throw "Cannot convert bool ("+this.value+") into "+this.type;
	        	}
	        }
	        if(angular.isDate(this.value)){
	        	if(this.type.toLowerCase() === "decimal"){
	        		return this.value.getTime()+"M";
	        	}else if(this.type.toLowerCase() === "int32"){
	        		return this.value.getTime()+"";
	        	}else if(this.type.toLowerCase() === "single"){
	        		return this.value.getTime()+"f";
	        	}else if(this.type.toLowerCase() === "double"){
	        		return this.value.getTime()+"d";
	        	}else if(this.type.toLowerCase() === "datetime"){
	        		return generateDate(this.value,isOdataV4);
	        	} else if (this.type.toLowerCase() === "datetimeoffset") {
	        	    return generateDateOffset(new Date(this.value), isOdataV4);					
	        	}else if(this.type.toLowerCase()==="string"){
	        		return "'"+this.value.toISOString()+"'";
	        	}else {
	        		throw "Cannot convert date ("+this.value+") into "+this.type;
	        	}
	        }
	        if(angular.isString(this.value)){
	        	if(this.type.toLowerCase() === "guid"){
                    return generateGuid(this.value,isOdataV4);
	        	}else if(this.type.toLowerCase() === "datetime"){
	        		return generateDate(new Date(this.value),isOdataV4);
	        	} else if (this.type.toLowerCase() === "datetimeoffset") {
	        	    return generateDateOffset(new Date(this.value), isOdataV4);					
	        	}else if(this.type.toLowerCase() === "single"){
	        		return parseFloat(this.value)+"f";
	        	}else if(this.type.toLowerCase() === "double"){
	        		return parseFloat(this.value)+"d";
	        	}else if(this.type.toLowerCase() === "decimal"){
	        		return parseFloat(this.value)+"M";
	        	}else if(this.type.toLowerCase() === "boolean"){
	        		return this.value;
	        	}else if(this.type.toLowerCase() === "int32"){
	        		return parseInt(this.value)+"";
	        	}else {
	        		throw "Cannot convert "+this.value+" into "+this.type;
	        	}
        	}else if(!isNaN(this.value)){
	        	if(this.type.toLowerCase() === "boolean"){
	        		return !!this.value+"";
	        	}else if(this.type.toLowerCase() === "decimal"){
	        		return this.value+"M";
	        	}else if(this.type.toLowerCase() === "double"){
	        		return this.value+"d";
	        	}else if(this.type.toLowerCase() === "single"){
	        		return this.value+"f";
	        	}else if(this.type.toLowerCase() === "byte"){
	        		return (this.value%255).toString(16);
	        	}else if(this.type.toLowerCase() === "datetime"){
	        		return generateDate(new Date(this.value),isOdataV4);
	        	}else if(this.type.toLowerCase() === "string"){
	        		return "'"+this.value+"'";
	        	}else {
	        		throw "Cannot convert number ("+this.value+") into "+this.type;
	        	}
        	}
        	else{
        		throw "Source type of "+this.value+" to be conververted into "+this.type+"is not supported";
        	}
        };

        ODataValue.prototype.execute = function(isOdataV4) {
            if(this.value === null){
                return 'null';
            }

            if (this.type === undefined) {
            	return this.executeWithUndefinedType(isOdataV4);
            } else {
            	return this.executeWithType(isOdataV4);
            }
        };
        return ODataValue;

    }
]);;angular.module('ODataResources').
factory('$odataProperty', [function() {

var ODataProperty = function(input){
		this.value = input;
	};

	ODataProperty.prototype.execute = function(){
		return this.value;
	};
	return ODataProperty;
}]);
	;angular.module('ODataResources').
factory('$odataBinaryOperation', ['$odataOperators','$odataProperty','$odataValue',function($odataOperators,ODataProperty,ODataValue) {

	var ODataBinaryOperation = function(a1,a2,a3){
		if(a1===undefined){
			throw "The property of a filter cannot be undefined";
		}

		if(a2 === undefined){
			throw "The value of a filter cannot be undefined";
		}

		if(a3 === undefined){
			//If strings are specified, we assume that the first one is the object property and the second one its value

			if(angular.isFunction(a1.execute)){
				this.operandA = a1;
			}else{
				this.operandA = new ODataProperty(a1);
			}
			if(a2!==null && angular.isFunction(a2.execute)){ 
				this.operandB = a2;
			}else{
				this.operandB = new ODataValue(a2);
			}

			this.filterOperator = 'eq';
		}
		else{
			if(angular.isFunction(a1.execute)){
				this.operandA = a1;
			}else{
				this.operandA = new ODataProperty(a1);
			}
			if(a3!==null && angular.isFunction(a3.execute)){
				this.operandB = a3;
			}else{
				this.operandB = new ODataValue(a3);
			}

			this.filterOperator = $odataOperators.convert(a2);
		}
	};


	ODataBinaryOperation.prototype.execute = function(isODatav4,noParenthesis){
		var result = this.operandA.execute(isODatav4)+" "+this.filterOperator+" " +this.operandB.execute(isODatav4);
		if(!noParenthesis)
			result = "("+result+")";

		return result;
	};

	ODataBinaryOperation.prototype.or = function(a1,a2,a3){
		var other;
		if(a2!==undefined){
			other = new ODataBinaryOperation(a1,a2,a3);
		}
		else if(angular.isFunction(a1.execute)){
			other = a1;
		}
		else{
			throw "The object " +a1 +" passed as a parameter of the or method is not valid";
		}
		return new ODataBinaryOperation(this,"or",other);
	};

	ODataBinaryOperation.prototype.and = function(a1,a2,a3){
		var other;
		if(a2!==undefined){
			other = new ODataBinaryOperation(a1,a2,a3);
		}
		else if(angular.isFunction(a1.execute)){
			other = a1;
		}
		else{
			throw "The object " +a1 +" passed as a parameter of the and method is not valid";
		}
		return new ODataBinaryOperation(this,"and",other);
	};

	return ODataBinaryOperation;
}

]);;angular.module('ODataResources').
factory('$odataExpandPredicate', ['$odataPredicate', '$odataBinaryOperation', function (ODataPredicate, ODataBinaryOperation) {

    var ODataExpandPredicate = function (tableName, context) {
        if (tableName === undefined) {
            throw "ExpandPredicate should be passed a table name but got undefined.";
        }

        if (context === undefined) {
            throw "ExpandPredicate should be passed a context but got undefined.";
        }

        this.name = tableName;
        this.expandables = []; // To maintain recursion compatibility with base OdataResourceProvider
        this.options = {
            select: [],
            filter: [],
            expand: this.expandables,
        };
        this.context = context;
    };

    ODataExpandPredicate.prototype.filter = function(operand1, operand2, operand3) {
        if (operand1 === undefined) throw "The first parameter is undefined. Did you forget to invoke the method as a constructor by adding the 'new' keyword?";

        var predicate;

        if (angular.isFunction(operand1.execute) && operand2 === undefined) {
            predicate = operand1;
        } else {
            predicate = new ODataBinaryOperation(operand1, operand2, operand3);
        }

        this.options.filter.push(predicate);

        return this;
    };

    ODataExpandPredicate.prototype.select = function (propertyName) {
        if (propertyName === undefined) {
            throw "ExpandPredicate.select should be passed a property name but got undefined.";
        }

        if (!angular.isArray(propertyName))
            propertyName = propertyName.split(',');

        function checkArray(i, value) {
            return value === propertyName[i];
        }

        for (var i = 0; i < propertyName.length; i++) {
            if (!this.options.select.some(checkArray.bind(this, i)))
                this.options.select.push(propertyName[i]);
        }
        return this;
    };

    ODataExpandPredicate.prototype.expand = function (tableName) {
        if (tableName === undefined) {
            throw "ExpandPredicate.expand should be passed a table name but got undefined.";
        }
        return new ODataExpandPredicate(tableName, this).finish();
    };

    ODataExpandPredicate.prototype.expandPredicate = function (tableName) {
        if (tableName === undefined) {
            throw "ExpandPredicate.expandPredicate should be passed a table name but got undefined.";
        }
        return new ODataExpandPredicate(tableName, this);
    };

    ODataExpandPredicate.prototype.build = function () {
        var query = this.name;
        var sub = [];
        for (var option in this.options) {
            if (this.options[option].length) {
                if (option === 'filter') {
                    sub.push("$filter=" + ODataPredicate.and(this.options.filter).execute(this.isv4,true));
                } else {
                    sub.push("$" + option + "=" + this.options[option].join(','));
                }
            }
        }
        if (sub.length) {
            query += "(" + sub.join(';') + ")";
        }
        return query;
    };

    ODataExpandPredicate.prototype.finish = function () {
        var query = this.build();
        this.context.expandables.push(query);
        return this.context;
    };

    return ODataExpandPredicate;
}]);;angular.module('ODataResources').
factory('$odataMethodCall', ['$odataProperty', '$odataValue',
    function(ODataProperty, ODataValue) {

        var ODataMethodCall = function(methodName) {
            if (methodName === undefined || methodName === "")
                throw "Method name should be defined";

            this.params = [];

            if (arguments.length < 2)
                throw "Method should be invoked with arguments";

            for (var i = 1; i < arguments.length; i++) {
                var value = arguments[i];
                if (angular.isFunction(value.execute)) {
                    this.params.push(value);
                } else {
                    //We assume the first one is the object property;
                    if (i == 1) {
                        this.params.push(new ODataProperty(value));
                    } else {
                        this.params.push(new ODataValue(value));
                    }
                }
            }

            this.methodName = methodName;
        };

        ODataMethodCall.prototype.execute = function() {
            var lambdaOperators = ["any", "all"];
            var invocation = "";

            if(lambdaOperators.indexOf(this.methodName) > -1) {
                for (var i = 0; i < this.params.length; i++) {
                    if (i === 0) {
                        invocation += this.params[i].execute();
                        invocation += "/";
                        invocation += this.methodName;
                    } else if(i === 1) {
                        invocation += "(";
                        invocation += this.params[i].value;
                        invocation += ":";
                    } else {
                        invocation += this.params[i].execute();
                        invocation += ")";
                    }
                }
            } else {
                invocation += this.methodName + "(";

                for (var j = 0; j < this.params.length; j++) {
                    if (j > 0)
                        invocation += ",";

                    invocation += this.params[j].execute();
                }
                invocation += ")";
            }

            return invocation;
        };

        return ODataMethodCall;
    }
]);;angular.module('ODataResources').
factory('$odataOrderByStatement', [function($odataOperators,ODataBinaryOperation,ODataPredicate) {

	var ODataOrderByStatement = function(propertyName, sortOrder){
		if(propertyName===undefined){
			throw "Orderby should be passed a property name but got undefined";
		}

		this.propertyName = propertyName;

		this.direction = sortOrder || "asc";
	};

	ODataOrderByStatement.prototype.execute = function() {
		return this.propertyName+" "+this.direction;
	};

	return ODataOrderByStatement;
}]);;angular.module('ODataResources').
factory('$odataPredicate', ['$odataBinaryOperation',function(ODataBinaryOperation) {



	var ODataPredicate = function(a1,a2,a3){
		if(angular.isFunction(a1.execute) && a2 === undefined){
			return a1;
		}
		else{
			return new ODataBinaryOperation(a1,a2,a3);
		}
	};

	ODataPredicate.and = function(andStatements){
		if(andStatements.length>0){
			var finalOperation = andStatements[0];

			for (var i = 1; i < andStatements.length; i++) {
				finalOperation = new ODataBinaryOperation(finalOperation,'and',andStatements[i]);
			}
			return finalOperation;
		}
		throw "No statements specified";
	};

	ODataPredicate.or = function(orStatements){
		if(orStatements.length>0){
			var finalOperation = orStatements[0];

			for (var i = 1; i < orStatements.length; i++) {
				finalOperation = new ODataBinaryOperation(finalOperation,'or',orStatements[i]);
			}
			return finalOperation;
		}
		throw "No statements specified for OR predicate";
	};


	ODataPredicate.create = function(a1,a2,a3){
		if(angular.isFunction(a1.execute) && a2 === undefined){
			return a1;
		}
		else{
			return new ODataBinaryOperation(a1,a2,a3);
		}
	};

	return ODataPredicate;

}]);
;angular.module('ODataResources').
factory('$odataProvider', ['$odataOperators', '$odataBinaryOperation', '$odataPredicate', '$odataOrderByStatement', '$odataExpandPredicate',
    function($odataOperators, ODataBinaryOperation, ODataPredicate, ODataOrderByStatement, ODataExpandPredicate) {
        var ODataProvider = function(callback, isv4, reusables) {
            this.$$callback = callback;
            this.filters = [];
            this.sortOrders = [];
            this.takeAmount = undefined;
            this.skipAmount = undefined;
            this.expandables = [];
            this.isv4 = isv4;
            this.hasInlineCount = false;
            this.selectables = [];
            this.transformUrls=[];
            this.formatBy = undefined;
            if (reusables)
                this.$$reusables = reusables;
        };
        ODataProvider.prototype.filter = function(operand1, operand2, operand3) {
            if (operand1 === undefined) throw "The first parameted is undefined. Did you forget to invoke the method as a constructor by adding the 'new' keyword?";
            var predicate;
            if (angular.isFunction(operand1.execute) && operand2 === undefined) {
                predicate = operand1;
            } else {
                predicate = new ODataBinaryOperation(operand1, operand2, operand3);
            }
            this.filters.push(predicate);
            return this;
        };

        ODataProvider.prototype.transformUrl = function(transformMethod) {
            this.transformUrls.push(transformMethod);
            return this;
        };

        ODataProvider.prototype.orderBy = function(arg1, arg2) {
            this.sortOrders.push(new ODataOrderByStatement(arg1, arg2));
            return this;
        };
        ODataProvider.prototype.take = function(amount) {
            this.takeAmount = amount;
            return this;
        };
        ODataProvider.prototype.skip = function(amount) {
            this.skipAmount = amount;
            return this;
        };
        ODataProvider.prototype.format = function(format) {
            this.formatBy = format;
            return this;
        };
        ODataProvider.prototype.execute = function() {
            var queryString = '';
            var i;
            if (this.filters.length > 0) {
                queryString = "$filter=" + ODataPredicate.and(this.filters).execute(this.isv4,true);
            }
            if (this.sortOrders.length > 0) {
                if (queryString !== "") queryString += "&";
                queryString += "$orderby=";
                for (i = 0; i < this.sortOrders.length; i++) {
                    if (i > 0) {
                        queryString += ",";
                    }
                    queryString += this.sortOrders[i].execute();
                }
            }
            if (this.takeAmount) {
                if (queryString !== "") queryString += "&";
                queryString += "$top=" + this.takeAmount;
            }
            if (this.skipAmount) {
                if (queryString !== "") queryString += "&";
                queryString += "$skip=" + this.skipAmount;
            }
            if (this.expandables.length > 0) {
                if (queryString !== "") queryString += "&";
                queryString += "$expand="+ this.expandables.join(',');
            }
            if(this.selectables.length>0){
                if (queryString !== "") queryString += "&";
                queryString += "$select=" + this.selectables.join(',');
            }


            if (this.hasInlineCount > 0) {
                if (queryString !== "") queryString += "&";
                queryString += this.isv4 ? "$count=true" : "$inlinecount=allpages";
            }

            if (this.formatBy) {
                if (queryString !== "") queryString += "&";
                queryString += "$format=" + this.formatBy;
            }

            for (i = 0; i < this.transformUrls.length; i++) {
               var transform= this.transformUrls[i];
               queryString = transform(queryString);
            }

            return queryString;
        };
        ODataProvider.prototype.query = function(success, error) {
            if (!angular.isFunction(this.$$callback)) throw "Cannot execute query, no callback was specified";
            success = success || angular.noop;
            error = error || angular.noop;
            return this.$$callback(this.execute(), success, error, false, false, getPersistence.bind(this, 'query'));
        };
        ODataProvider.prototype.single = function(success, error) {
            if (!angular.isFunction(this.$$callback)) throw "Cannot execute single, no callback was specified";
            success = success || angular.noop;
            error = error || angular.noop;
            return this.$$callback(this.execute(), success, error, true, true, getPersistence.bind(this, 'single'));
        };
        ODataProvider.prototype.get = function(data, success, error) {
            if (!angular.isFunction(this.$$callback)) throw "Cannot execute get, no callback was specified";
            success = success || angular.noop;
            error = error || angular.noop;
            // The query string from this.execute() should be included even
            //  when fetching just a single element.
            var queryString = this.execute();
            if (queryString.length > 0) {
                queryString = "?" + queryString;
            }
            return this.$$callback("(" + data + ")" + queryString, success, error, true, false, getPersistence.bind(this, 'get'));
        };

        ODataProvider.prototype.count = function(success, error) {
            if (!angular.isFunction(this.$$callback)) throw "Cannot execute count, no callback was specified";
            success = success || angular.noop;
            error = error || angular.noop;
            // The query string from this.execute() should be included even
            //  when fetching just a single element.
            var queryString = this.execute();
            if (queryString.length > 0) {
                queryString = "/?" + queryString;
            }
            return this.$$callback("/$count" + queryString, success, error, true, false, getPersistence.bind(this, 'count'));
        };

        ODataProvider.prototype.withInlineCount = function() {
            this.hasInlineCount = true;
            return this;
        };

        var expandOdatav4 = function(navigationProperties){
        	var first = navigationProperties.shift();
        	var current = first;
        	if(navigationProperties.length>0){
        		current = current + "($expand="+expandOdatav4(navigationProperties)+")";
        	}
        	return current;
        };

        ODataProvider.prototype.expand = function(params) {
            if (!angular.isString(params) && !angular.isArray(params)) {
                throw "Invalid parameter passed to expand method (" + params + ")";
            }
            if (params === "") {
                return;
            }
            var expandQuery = params;
            if (this.isv4) {
            	//Make it an array
            	if (!angular.isArray(params)) {
                    params = Array.prototype.slice.call(arguments);
                }
                expandQuery = expandOdatav4(params);


            } else {
                if (angular.isArray(params)) {
                    expandQuery = params.join('/');
                } else {
                    expandQuery = Array.prototype.slice.call(arguments).join('/');
                }
                for (var i = 0; i < this.expandables.length; i++) {
                    if (this.expandables[i] === expandQuery) return this;
                }
            }

            this.expandables.push(expandQuery);
            return this;
        };

        ODataProvider.prototype.expandPredicate = function(tableName) {
            return new ODataExpandPredicate(tableName, this);
        };

        ODataProvider.prototype.select = function(params) {
            if (!angular.isString(params) && !angular.isArray(params)) {
                throw "Invalid parameter passed to select method (" + params + ")";
            }

            if (params === "") {
                return;
            }

            var selectQuery = params;

            if (!angular.isArray(params)) {
                params = Array.prototype.slice.call(arguments);
            }   

            for (var i = params.length - 1; i >= 0; i--) {
                    this.selectables.push(params[i]);
            }   

            return this;
        };

        function getPersistence(type, full) {
            var reusables = {};
            // Set full persistence if type is count or single(?) because we'll want to pull in filters, etc to reproduce what we're refreshing.
            // Otherwise, let the factory decide if the persistence state should include the full (for a refresh on the array), or limited for
            // a single entity refresh.
            // Single is tricky... Should the refresh requery and take the first element based on full filtering, or just refresh the entity we
            // already have based on limited persistence?  What's its purposed use case?  Could set an option toggle for either or.
            if (!full && (type === 'count' || type === 'single'))
                full = true;
            Object.defineProperty(reusables, '$$type', { enumerble: false, writable: true, configurable: true, value: type });
            if (full) {
                for (var key in this) {
                    if (this.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                        reusables[key] = this[key];
                    }
                }
                return reusables;
            } else {
                if (this.selectables.length)
                    reusables.selectables = this.selectables;
                if (this.expandables.length)
                    reusables.expandables = this.expandables;
                if (this.formatBy)
                    reusables.formatBy = this.formatBy;
            }
            return reusables;
        }

        ODataProvider.prototype.re = function (force) {
            if (this.$$reusables) {
                for (var option in this.$$reusables) {
                    if (angular.isArray(this.$$reusables[option])) {
                        for (var i = 0; i < this.$$reusables[option].length; i++) {
                            if (this[option].indexOf(this.$$reusables[option][i]) === -1)
                                this[option].push(this.$$reusables[option][i]);
                        }
                    } else
                        this[option] = this.$$reusables[option];
                }
            }
            return this;
        };

        return ODataProvider;
    }
]);;/**
 * @license AngularJS v1.3.15
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {
  'use strict';

  var $resourceMinErr = angular.$$minErr('$resource');

  // Helper functions and regex to lookup a dotted path on an object
  // stopping at undefined/null.  The path must be composed of ASCII
  // identifiers (just like $parse)
  var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;

  function isValidDottedPath(path) {
    return (path !== null && path !== '' && path !== 'hasOwnProperty' &&
      MEMBER_NAME_REGEX.test('.' + path));
  }

  function lookupDottedPath(obj, path) {
    if (!isValidDottedPath(path)) {
      throw $resourceMinErr('badmember', 'Dotted member path "@{0}" is invalid.', path);
    }
    var keys = path.split('.');
    for (var i = 0, ii = keys.length; i < ii && obj !== undefined; i++) {
      var key = keys[i];
      obj = (obj !== null) ? obj[key] : undefined;
    }
    return obj;
  }

  /**
   * Create a shallow copy of an object and clear other fields from the destination
   */
  function shallowClearAndCopy(src, dst) {
    dst = dst || {};

    angular.forEach(dst, function(value, key) {
      delete dst[key];
    });

    for (var key in src) {
      if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
        dst[key] = src[key];
      }
    }

    return dst;
  }


  angular.module('ODataResources').
  provider('$odataresource', function() {
    var provider = this;

    this.defaults = {
      // Strip slashes by default
      stripTrailingSlashes: true,

      // Default actions configuration
      actions: {
        'get': {
          method: 'GET'
        },
        'save': {
          method: 'POST'
        },
        'query': {
          method: 'GET',
          isArray: true
        },
        'remove': {
          method: 'DELETE'
        },
        'delete': {
          method: 'DELETE'
        },
        'update': {
          method: 'PUT'
        },
        'odata': {
          method: 'GET',
          isArray: true
        }
      }
    };

    this.$get = ['$http', '$q', '$odata',
      function($http, $q, $odata) {

        var noop = angular.noop,
          forEach = angular.forEach,
          extend = angular.extend,
          copy = angular.copy,
          isFunction = angular.isFunction;

        /**
         * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
         * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
         * (pchar) allowed in path segments:
         *    segment       = *pchar
         *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
         *    pct-encoded   = "%" HEXDIG HEXDIG
         *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
         *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
         *                     / "*" / "+" / "," / ";" / "="
         */
        function encodeUriSegment(val) {
          return encodeUriQuery(val, true).
          replace(/%26/gi, '&').
          replace(/%3D/gi, '=').
          replace(/%2B/gi, '+');
        }


        /**
         * This method is intended for encoding *key* or *value* parts of query component. We need a
         * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
         * have to be encoded per http://tools.ietf.org/html/rfc3986:
         *    query       = *( pchar / "/" / "?" )
         *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
         *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
         *    pct-encoded   = "%" HEXDIG HEXDIG
         *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
         *                     / "*" / "+" / "," / ";" / "="
         */
        function encodeUriQuery(val, pctEncodeSpaces) {
          return encodeURIComponent(val).
          replace(/%40/gi, '@').
          replace(/%3A/gi, ':').
          replace(/%24/g, '$').
          replace(/%2C/gi, ',').
          replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
        }

        function Route(template, defaults) {
          this.template = template;
          this.defaults = extend({}, provider.defaults, defaults);
          this.urlParams = {};
        }

        Route.prototype = {
          setUrlParams: function(config, params, actionUrl, data, isOData) {
            var self = this,
              url = actionUrl || self.template,
              val,
              encodedVal;



            if (url === self.template &&
              (config.method === 'PUT' ||
              config.method === 'DELETE' ||
              (config.method == 'GET' && !isOData) ||
              config.method == 'PATCH') && angular.isString(self.defaults.odatakey)) {
              
            // strip trailing slashes and set the url (unless this behavior is specifically disabled)
            if (self.defaults.stripTrailingSlashes) {
              url = url.replace(/\/+$/, '') || '/';
            }

            var odatakeySplit = self.defaults.odatakey.split(',');
            var splitKey = odatakeySplit.map(function (key) { return odatakeySplit.length > 1 ? key + '=:' + key : ':' + key; });
            url = url + '(' + splitKey.join(',') + ')';

              if (data) {
                  forEach(odatakeySplit, function (param) {
                      params[param] = data[param];
                  });
              }
            }

            var urlParams = self.urlParams = {};
            forEach(url.split(/\W/), function(param) {
              if (param === 'hasOwnProperty') {
                throw $resourceMinErr('badname', "hasOwnProperty is not a valid parameter name.");
              }
              if (!(new RegExp("^\\d+$").test(param)) && param &&
                (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
                urlParams[param] = true;
              }
            });
            url = url.replace(/\\:/g, ':');

            params = params || {};
            forEach(self.urlParams, function(_, urlParam) {
              val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
              if (angular.isDefined(val) && val !== null) {
                encodedVal = encodeUriSegment(val);
                url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function(match, p1) {
                  return encodedVal + p1;
                });
              } else {
                url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function(match,
                  leadingSlashes, tail) {
                  if (tail.charAt(0) == '/') {
                    return tail;
                  } else {
                    return leadingSlashes + tail;
                  }
                });
              }
            });

            // strip trailing slashes and set the url (unless this behavior is specifically disabled)
            if (self.defaults.stripTrailingSlashes) {
              url = url.replace(/\/+$/, '') || '/';
            }
            

            // then replace collapse `/.` if found in the last URL path segment before the query
            // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
            url = url.replace(/\/\.(?=\w+($|\?))/, '.');
            // replace escaped `/\.` with `/.`
            config.url = url.replace(/\/\\\./, '/.');


            // set params - delegate param encoding to $http
            forEach(params, function(value, key) {
              if (!self.urlParams[key]) {
                config.params = config.params || {};
                config.params[key] = value;
              }
            });
          }
        };


        function resourceFactory(url, paramDefaults, actions, options) {
          options = options || {};

          if (angular.isString(paramDefaults)) {
            options.odatakey = paramDefaults;
            paramDefaults = {};
          }

          var route = new Route(url, options);

          actions = extend({}, provider.defaults.actions, actions);

          function extractParams(data, actionParams) {
            var ids = {};
            actionParams = extend({}, paramDefaults, actionParams);
            forEach(actionParams, function(value, key) {
              if (isFunction(value)) {
                value = value();
              }
              ids[key] = value && value.charAt && value.charAt(0) == '@' ?
                lookupDottedPath(data, value.substr(1)) : value;
            });
            return ids;
          }

          function defaultResponseInterceptor(response) {
            return response.resource;
          }

          function Resource(value) {
              shallowClearAndCopy(value || {}, this);
          }

          Resource.prototype.toJSON = function() {
            var data = extend({}, this);
            delete data.$promise;
            delete data.$resolved;
            return data;
          };

          forEach(actions, function(action, name) {

            var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);

            Resource[name] = function(a1, a2, a3, a4, isOdata, odataQueryString, isSingleElement, forceSingleElement, persistence) {
              var params = {}, data, success, error;

              /* jshint -W086 */
              /* (purposefully fall through case statements) */
              switch (arguments.length) {
                case 9:
                case 8:
                case 7:
                case 6:
                case 4:
                  error = a4;
                  success = a3;
                  //fallthrough
                case 3:
                case 2:
                  if (isFunction(a2)) {
                    if (isFunction(a1)) {
                      success = a1;
                      error = a2;
                      break;
                    }

                    success = a2;
                    error = a3;
                    //fallthrough
                  } else {
                    params = a1;
                    data = a2;
                    success = a3;
                    break;
                  }
                case 1:
                  if (isFunction(a1)) success = a1;
                  else if (hasBody) data = a1;
                  else params = a1;
                  break;
                case 0:
                  break;
                default:
                  throw $resourceMinErr('badargs',
                    "Expected up to 4 arguments [params, data, success, error], got {0} arguments",
                    arguments.length);
              }
              /* jshint +W086 */
              /* (purposefully fall through case statements) */

              var isInstanceCall = this instanceof Resource;
              var value = isInstanceCall ? data : ((!isSingleElement && action.isArray) ? [] : new Resource(data));
              var httpConfig = {};
              var responseInterceptor = action.interceptor && action.interceptor.response ||
                defaultResponseInterceptor;
              var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||
                undefined;

              forEach(action, function(value, key) {
                if (key != 'params' && key != 'isArray' && key != 'interceptor') {
                  httpConfig[key] = copy(value);
                }
              });

              if (hasBody) httpConfig.data = data;


              route.setUrlParams(httpConfig,
                extend({}, extractParams(data, action.params || {}), params),
                action.url,
                data,
                isOdata);

              //if (angular.isString(odataQueryString) && odataQueryString !== "" && !isOdata || (isOdata && (!isSingleElement || forceSingleElement))) {
              if (isOdata && odataQueryString !== "" && (!isSingleElement || forceSingleElement)) {
                httpConfig.url += "?" + odataQueryString;
              } else if (odataQueryString !== "" && isSingleElement) {
                httpConfig.url += odataQueryString;
              }

              //chieffancypants / angular-loading-bar
              //https://github.com/chieffancypants/angular-loading-bar
              if (options.ignoreLoadingBar)
                httpConfig.ignoreLoadingBar = true;

              var promise = $http(httpConfig).then(function(response) {
                var data = response.data,
                  promise = value.$promise;

                if(data && angular.isNumber(data['@odata.count'])) {
                    data.count = data['@odata.count'];
                }

                if (data && (angular.isString(data['@odata.context']) || angular.isString(data['odata.metadata']) ) && data.value && angular.isArray(data.value)) {
                  var fullObject = data;
                  data = data.value;
                  for (var property in fullObject) {
                    if (property !== "value") {
                      value[property] = fullObject[property];
                    }
                  }
                }


                if (data) {
                  // Need to convert action.isArray to boolean in case it is undefined
                  // jshint -W018
                  if (angular.isArray(data) !== (!isSingleElement && !! action.isArray) && !forceSingleElement) {
                    throw $resourceMinErr('badcfg',
                      'Error in resource configuration for action `{0}`. Expected response to ' +
                      'contain an {1} but got an {2} (Request: {3} {4})', name, (!isSingleElement && action.isArray) ? 'array' : 'object',
                      angular.isArray(data) ? 'array' : 'object', httpConfig.method, httpConfig.url);
                  }

                  if(angular.isArray(data) && forceSingleElement){
                    if(data.length>0){
                      data = data[0];
                    }else{
                      throw "The response returned no result";
                    }
                  }

                  // jshint +W018
                  if (!isSingleElement && action.isArray && isNaN(parseInt(data))) {
                    value.length = 0;
                    forEach(data, function(item) {
                      if (typeof item === "object") {
                          var newResource = new Resource(item);
                          addRefreshMethod(newResource, persistence, false);
                          value.push(newResource);
                      } else {
                        // Valid JSON values may be string literals, and these should not be converted
                        // into objects. These items will not have access to the Resource prototype
                        // methods, but unfortunately there
                        value.push(item);
                      }
                    });
                  } else {
                    shallowClearAndCopy(data, value);
                    value.$promise = promise;
                  }
                }

                if(angular.isNumber(data) && isSingleElement){
                  value.result = data;
                }
                else if(!isNaN(parseInt(data)) && isSingleElement){
                  value.result = parseInt(data);
                }

                value.$resolved = true;

                  addRefreshMethod(value, persistence);


                response.resource = value;

                return response;
              }, function(response) {
                value.$resolved = true;

                (error || noop)(response);

                return $q.reject(response);
              });

              promise = promise.then(
                function(response) {
                  var value = responseInterceptor(response);
                  (success || noop)(value, response.headers);
                  return value;
                },
                responseErrorInterceptor);

              if (!isInstanceCall) {
                // we are creating instance / collection
                // - set the initial promise
                // - return the instance / collection
                value.$promise = promise;
                value.$resolved = false;
                
                return value;
              }

              // instance call
              return promise;
            };


            Resource.prototype['$' + name] = function(params, success, error) {
              if (isFunction(params)) {
                error = success;
                success = params;
                params = {};
              }
              var result = Resource[name].call(this, params, this, success, error);
              return result.$promise || result;
            };
          });

          var oldOdataResource = Resource.odata;
          Resource.odata = function (persistence) {
              var onQuery = function(queryString, success, error, isSingleElement, forceSingleElement, _persistence) {
                  return oldOdataResource({}, {}, success, error, true, queryString, isSingleElement, forceSingleElement, _persistence);
              };

              var odataProvider = new $odata.Provider(onQuery, options.isodatav4, this.$refresh ? this.$refresh.$$persistence : null);
              return options.persistence ? odataProvider.re() : odataProvider;
          };

          var addRefreshMethod = function (target, persistence, full) {
                full = typeof full === 'boolean' ? full : true;
                if (angular.isDefined(target) && angular.isDefined(persistence)) {
                    var refreshFn = refreshData.bind(target);
                    refreshFn.$$persistence = angular.isFunction(persistence) ? persistence(full) : persistence;
                    Object.defineProperty(target, '$refresh', { enumerable: false, configurable: true, writable: true, value: refreshFn });
                }
            };

            var refreshData = function refreshData(success, error) {
                var onQuery = function(queryString, success, error, isSingleElement, forceSingleElement, _persistence) {
                    return oldOdataResource({}, {}, success, error, true, queryString, isSingleElement, forceSingleElement, _persistence);
                };
                var odataProvider = new $odata.Provider(onQuery, options.isodatav4, this.$refresh.$$persistence);
                odataProvider = odataProvider.re();

                // Single and Count are special, so rerun them.
                if (this.$refresh.$$persistence.$$type == 'count') {
                    return odataProvider.count();
                }
                if (this.$refresh.$$persistence.$$type == 'single') {
                    return odataProvider.single();
                }

                var queryString = odataProvider.execute();

                var multiple = this instanceof Array;
                // Refresh a normal Resource or Array of Resources
                return Resource[multiple ? 'query' : 'get'].call(undefined, {}, multiple ? {} : this, success, error, multiple, (!multiple? '?' : '') + queryString, !multiple, false, this.$refresh.$$persistence);
                };

          Resource.bind = function(additionalParamDefaults) {
            return resourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
          };

          return Resource;
        }

        return resourceFactory;
      }
    ];
  });


})(window, window.angular);
;angular.module('ODataResources').
factory('$odata', ['$odataBinaryOperation','$odataProvider','$odataValue',
	'$odataProperty','$odataMethodCall','$odataPredicate','$odataOrderByStatement','$odataExpandPredicate',
	function(ODataBinaryOperation,ODataProvider,ODataValue,ODataProperty,ODataMethodCall,ODataPredicate,ODataOrderByStatement,ODataExpandPredicate) {

		return {
			Provider : ODataProvider,
			BinaryOperation : ODataBinaryOperation,
			Value : ODataValue,
			Property : ODataProperty,
			Func : ODataMethodCall,
			Predicate : ODataPredicate,
			OrderBy : ODataOrderByStatement,
            ExpandPredicate : ODataExpandPredicate,
		};

	}]);