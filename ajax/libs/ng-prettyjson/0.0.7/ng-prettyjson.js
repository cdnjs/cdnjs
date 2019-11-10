(function (angular) {
'use strict';
	angular.module('ngPrettyJson', []).directive('prettyJson', function () {

		// http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript
		var syntaxHighlight =function(json) {
			if (typeof json != 'string')
				json = JSON.stringify(json, undefined, 2);
			json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
				var cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match))
						cls = 'key';
					else
						cls = 'string';
				}
				else if (/true|false/.test(match))
					cls = 'boolean';
				else if (/null/.test(match))
					cls = 'null';
				return '<span class="' + cls + '">' + match + '</span>';
			});
		};

		return {
			restrict: 'AE',
			scope: { json: '=' },			
			link:function (scope, elm, attr) {                  
				scope.$watch('json', function(newValue, oldValue) {
				if ( newValue && newValue.json && angular.toJson(newValue.json) )
					elm.html(syntaxHighlight(newValue.json));
				else
					elm.html('value is not a valid json object {}');
				}, true);
			}
		};
	});
})(angular);
