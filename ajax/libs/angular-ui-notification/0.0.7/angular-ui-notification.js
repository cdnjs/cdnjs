angular.module('ui-notification',[]);

angular.module('ui-notification').value('uiNotificationTemplates','angular-ui-notification.html');

angular.module('ui-notification').factory('Notification', function(
	$timeout, uiNotificationTemplates, $http, $compile, $templateCache, $rootScope, $injector, $sce) {

	var startTop = 10;
	var startRight = 10;
	var verticalSpacing = 10;
	var horizontalSpacing = 10;
	var type = '';
	var delay = 5000;
	//var positionY = 'top';
	//var positionX = 'right';

	var messageElements = [];

	var notify = function(args, t){

		if (typeof args !== 'object'){
			args = {message:args};
		}

		args.scope = args.scope ? args.scope : $rootScope;
		args.template = args.template ? args.template : uiNotificationTemplates;
		args.delay = !angular.isUndefined(args.delay) ? args.delay : delay;
		args.type = t ? t : '';

		$http.get(args.template,{cache: $templateCache}).success(function(template) {

			var scope = args.scope.$new();
			scope.message = $sce.trustAsHtml(args.message);
			scope.title = $sce.trustAsHtml(args.title);
			scope.t = args.type.substr(0,1);
			scope.delay = args.delay;

			var reposite = function() {
				var j = 0;
				var k = 0;
				var lastTop = startTop;
				var lastRight = startRight;
				var lastPosition = [];
				for(var i = messageElements.length - 1; i >= 0; i --) {
					var element  = messageElements[i];
					var elHeight = parseInt(element[0].offsetHeight);
					var elWidth  = parseInt(element[0].offsetWidth);
					var position = lastPosition[element._positionY+element._positionX];

					if ((top + elHeight) > window.innerHeight) {
						position = startTop;
						k ++;
						j = 0;
					}
					
					var top = (lastTop = position ? position : startTop) + (j === 0 ? 0 : verticalSpacing);
					var right = lastRight + (k * (horizontalSpacing + elWidth));
					
					element.css(element._positionY, top + 'px');
					element.css(element._positionX, right + 'px');
					
					lastPosition[element._positionY+element._positionX] = top + elHeight;

					j ++;
				}
			};

			var templateElement = $compile(template)(scope);
			args._positionY = args._positionY ? args._positionY : 'top';
			args._positionX = args._positionX ? args._positionX : 'right';
			templateElement._positionY = args._positionY;
			templateElement._positionX = args._positionX;
			templateElement.addClass(args.type);
			templateElement.bind('webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd click', function(e){
				e = e.originalEvent || e;
				if (e.type === 'click' || (e.propertyName === 'opacity' && e.elapsedTime >= 1)){
					templateElement.remove();
					messageElements.splice(messageElements.indexOf(templateElement), 1);
					reposite();
				}
			});
            if (angular.isNumber(args.delay)) {
                $timeout(function() {
                    templateElement.addClass('killed');
                }, args.delay);
            }

			angular.element(document.getElementsByTagName('body')).append(templateElement);
			var offset = -(parseInt(templateElement[0].offsetHeight) + 50);
			templateElement.css(templateElement._positionY, offset + "px");
			messageElements.push(templateElement);

			$timeout(reposite);

		}).error(function(data){
			throw new Error('Template ('+args.template+') could not be loaded. ' + data);
		});
		
	};

	notify.config = function(args){
		startTop = args.top ? args.top : startTop;
		verticalSpacing = args.verticalSpacing ? args.verticalSpacing : verticalSpacing;
	};
	notify.primary = function(args) {
		this(args, 'primary');
	};
	notify.error = function(args) {
		this(args, 'error');
	};
	notify.success = function(args) {
		this(args, 'success');
	};
	notify.info = function(args) {
		this(args, 'info');
	};
	notify.warning = function(args) {
		this(args, 'warning');
	};

	notify.clearAll = function() {
		var notifys = angular.element(document.getElementsByClassName('ui-notification'));

		if (notifys) {
			angular.forEach(notifys, function(notify) {
				notify.remove();
			});
		}
	};

	return notify;
});
