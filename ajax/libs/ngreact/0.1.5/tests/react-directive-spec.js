'use strict';

// phantom doesn't support Function.bind
require('es5-shim');
require('../ngReact');

var React = require( 'react/addons' );
var angular = require( 'angular' );
require( 'angular-mocks' );

var Hello = React.createClass({
  propTypes: {
    fname : React.PropTypes.string,
    lname : React.PropTypes.string,
    changeName: React.PropTypes.func
  },

  handleClick() {
    this.props.changeName();
  },

  render() {
    var {fname, lname, undeclared} = this.props;
    return <div onClick={this.handleClick}>Hello {fname} {lname}{undeclared}</div>;
  }
});

var People = React.createClass({
  propTypes: {
    items : React.PropTypes.array
  },

  render () {
    var names = this.props.items.map(person => person.fname + ' ' + person.lname).join(', ');
    return <div>Hello {names}</div>;
  }
});

describe('react-directive', () => {

  var provide, compileProvider;
  var compileElement;

  beforeEach(angular.mock.module('react'));

  beforeEach(angular.mock.module(($provide, $compileProvider) => {
    compileProvider = $compileProvider;
    provide = $provide;
  }));

  afterEach(()=>{
    window.GlobalHello = undefined;
  });

  beforeEach(inject(($rootScope, $compile, $timeout) => {
    compileElement = ( html, scope ) => {
      scope = scope || $rootScope;
      var elm = angular.element(html);
      $compile(elm)(scope);
      scope.$digest();
      $timeout.flush();
      return elm;
    };
  }));

  describe('creation', () => {

    beforeEach( () => {
      window.GlobalHello = Hello;
      provide.value('InjectedHello', Hello);
    });

    afterEach(()=>{
      window.GlobalHello = undefined;
    });

    it('should create global component with name', () => {
      compileProvider.directive('globalHello', (reactDirective) => {
        return reactDirective('GlobalHello');
      });
      var elm = compileElement('<global-hello/>');
      expect(elm.text().trim()).toEqual('Hello');
    });

    it('should create with component', () => {
      compileProvider.directive('helloFromComponent', (reactDirective) => {
        return reactDirective(Hello);
      });
      var elm = compileElement('<hello-from-component/>');
      expect(elm.text().trim()).toEqual('Hello');
    });

    it('should create injectable component with name', () => {
      compileProvider.directive('injectedHello', (reactDirective) => {
        return reactDirective('InjectedHello');
      });
      var elm = compileElement('<injected-hello/>');
      expect(elm.text().trim()).toEqual('Hello');
    });
  });

  describe('properties',() => {

    beforeEach(() => {
      provide.value('Hello', Hello);
      compileProvider.directive('hello', (reactDirective) => {
        return reactDirective('Hello');
      });
    });

    it('should be possible to provide a custom directive configuration', () => {
      compileProvider.directive('confHello', (reactDirective) => {
        return reactDirective(Hello, undefined, {restrict: 'C'});
      });
      var elm = compileElement('<div class="conf-hello"/>');
      expect(elm.text().trim()).toEqual('Hello');
    });

    it('should bind to properties on scope', inject(($rootScope) => {
      var scope = $rootScope.$new();
      scope.firstName = 'Clark';
      scope.lastName = 'Kent';

      var elm = compileElement(
        '<hello fname="firstName" lname="lastName"/>',
        scope
      );
      expect(elm.text().trim()).toEqual('Hello Clark Kent');
    }));

    it('should bind to object on scope', inject(($rootScope) => {
      var scope = $rootScope.$new();
      scope.person = { firstName: 'Clark', lastName: 'Kent' };

      var elm = compileElement(
        '<hello fname="person.firstName" lname="person.lastName"/>',
        scope
      );
      expect(elm.text().trim()).toEqual('Hello Clark Kent');
    }));

    it('should rerender when scope is updated', inject(($rootScope, $timeout) => {
      var scope = $rootScope.$new();
      scope.person = { firstName: 'Clark', lastName: 'Kent' };

      var elm = compileElement(
        '<hello fname="person.firstName" lname="person.lastName"/>',
        scope
      );

      expect(elm.text().trim()).toEqual('Hello Clark Kent');

      scope.person.firstName = 'Bruce';
      scope.person.lastName = 'Banner';
      scope.$apply();
      $timeout.flush();

      expect(elm.text().trim()).toEqual('Hello Bruce Banner');
    }));

    it('should accept callbacks as properties', inject(($rootScope, $timeout) => {
      var scope = $rootScope.$new();
      scope.person = {
        fname: 'Clark', lname: 'Kent'
      };
      scope.change = () => {
        scope.person.fname = 'Bruce';
        scope.person.lname = 'Banner';
      };

      var elm = compileElement(
        '<hello fname="person.fname" lname="person.lname" change-name="change"/>',
        scope
      );
      expect(elm.text().trim()).toEqual('Hello Clark Kent');

      React.addons.TestUtils.Simulate.click( elm[0].firstChild );
      $timeout.flush();

      expect(elm.text().trim()).toEqual('Hello Bruce Banner');
    }));

    it('should accept undeclared properties when specified', inject(($rootScope) => {
      compileProvider.directive('helloWithUndeclared', (reactDirective) => {
        return reactDirective('Hello', ['undeclared']);
      });
      var scope = $rootScope.$new();
      scope.name = 'Bruce Wayne';
      var elm = compileElement(
        '<hello-with-undeclared undeclared="name"/>',
        scope
      );
      expect(elm.text().trim()).toEqual('Hello  Bruce Wayne');
    }));
  });


  describe('watch-depth', () => {

    describe('value', () => {
      var elm, scope;

      beforeEach(inject(($rootScope) => {
        provide.value('Hello', Hello);
        compileProvider.directive('hello', (reactDirective) => {
          return reactDirective('Hello');
        });

        scope = $rootScope.$new();
        scope.person = { fname: 'Clark', lname: 'Kent' };

        elm = compileElement(
            '<hello fname="person.fname" lname="person.lname" watch-depth="value"/>',
            scope);
      }));

      it('should rerender when a property of scope object is updated', () => inject(($rootScope, $timeout) => {

        expect(elm.text().trim()).toEqual('Hello Clark Kent');

        scope.person.fname = 'Bruce';
        scope.person.lname = 'Banner';

        scope.$apply();
        $timeout.flush();

        expect(elm.text().trim()).toEqual('Hello Bruce Banner');
      }));
    });

    describe('reference', () => {
      var elm, scope;

      beforeEach(inject(($rootScope) => {
        provide.value('Hello', Hello);
        compileProvider.directive('hello', (reactDirective) => {
          return reactDirective('Hello');
        });

        scope = $rootScope.$new();
        scope.person = { fname: 'Clark', lname: 'Kent' };

        elm = compileElement(
            '<hello fname="person.fname" lname="person.lname" watch-depth="reference"/>',
            scope);
      }));

      it('should rerender when scope object is updated', () => inject(($timeout) => {

        expect(elm.text().trim()).toEqual('Hello Clark Kent');

        scope.person = { fname: 'Bruce', lname: 'Banner' };
        scope.$apply();
        $timeout.flush();

        expect(elm.text().trim()).toEqual('Hello Bruce Banner');
      }));

      it('should NOT rerender when a property of scope object is updated', () => inject(() => {

        expect(elm.text().trim()).toEqual('Hello Clark Kent');

        scope.person.fname = 'Bruce';
        scope.person.lname = 'Banner';
        scope.$apply();

        expect(elm.text().trim()).toEqual('Hello Clark Kent');
      }));
    });

    describe('collection', () => {
      var elm, scope;

      beforeEach(inject(($rootScope) => {
        provide.value('People', People);
        compileProvider.directive('people', (reactDirective) => {
          return reactDirective('People');
        });
        scope = $rootScope.$new();
        scope.people = [{ fname: 'Clark', lname: 'Kent' }];

        elm = compileElement(
            '<people items="people" watch-depth="collection"/>',
            scope);
      }));

      it('should rerender when an item is added to array in scope', () => inject(($timeout) => {

        expect(elm.text().trim()).toEqual('Hello Clark Kent');

        scope.people.push({ fname: 'Bruce', lname: 'Banner'});
        scope.$apply();
        $timeout.flush();

        expect(elm.text().trim()).toEqual('Hello Clark Kent, Bruce Banner');
      }));

      it('should NOT rerender when an item in the array gets modified', () => inject(() => {

        expect(elm.text().trim()).toEqual('Hello Clark Kent');

        var person = scope.people[0];
        person.fname = 'Bruce';
        person.lname = 'Banner';
        scope.$apply();

        expect(elm.text().trim()).toEqual('Hello Clark Kent');
      }));
    });

  });

  describe('destruction', () => {

    beforeEach(() => {
      provide.value('Hello', Hello);
      compileProvider.directive('hello', (reactDirective) => {
        return reactDirective('Hello');
      });
    });

    it('should unmount component when scope is destroyed', inject(($rootScope) => {
      var scope = $rootScope.$new();
      scope.person = { firstName: 'Clark', lastName: 'Kent' };
      var elm = compileElement(
        '<hello fname="person.firstName" lname="person.lastName"/>',
        scope
      );
      scope.$destroy();

      //unmountComponentAtNode returns:
      // * true if a component was unmounted and
      // * false if there was no component to unmount.
      expect( React.unmountComponentAtNode(elm[0])).toEqual(false);
    }));
  });
});