'use strict';

describe('ng-ckeditor-form', function () {
    var element, scope, controller, instance, i = 1;

    beforeEach(module('ngCkeditor'));

    beforeEach(function (done) {
        inject(function ($rootScope, $compile, $document) {
            element = angular.element(
                '<form name="testForm">{{test}}<div><textarea ckeditor id="' + 'editor' + i + '" ng-model="test"></textarea></div></form>');

            scope = $rootScope.$new(true);
            scope.test = 'test';

            $document.find('body').append(element);

            $compile(element)(scope);

            controller = element.controller('ngModel');
            instance = CKEDITOR.instances['editor' + i++];

            scope.$digest();
            done();
        });
    });

    afterEach(function (done) {
        scope.$destroy();
        done();
    });

    it('should create editor', function (done) {
        expect(CKEDITOR.instances['editor' + (i - 1)]).toBeDefined();
        expect(scope.test).toBe('test');
        done();
    }, 1000);

    it('should change model value editor', function (done) {
        inject(function ($rootScope) {
            scope.test = 'new value';
            $rootScope.$apply();

            setTimeout(function () {
                instance.on('instanceReady', function () {
                    expect(instance.getData()).toBe('new value');
                    expect(scope.test).toBe('new value');
                    expect(scope.testForm.$dirty).toBe(false);
                    done();
                });
            }, 10);
        });
    });
});
