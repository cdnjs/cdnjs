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

  handleClick(){
    this.props.changeName();
  },

  render(){
    var {fname, lname} = this.props;
    return <div onClick={this.handleClick}>Hello {fname} {lname}</div>;
  }
});

describe('react-component', () => {

  var compileElement, provide;

  beforeEach(angular.mock.module('react'));

  beforeEach(angular.mock.module(($provide) => {provide = $provide;}));

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

    beforeEach(() => {
      window.GlobalHello = Hello;
      window.Views = {
        Hello: Hello
      };
      provide.value('InjectedHello', Hello);
    });

    afterEach(() => {
      window.GlobalHello = undefined;
      window.Views = undefined;
    });

    it('should create global component with name', () => {
      var elm = compileElement( '<react-component name="GlobalHello"/>');
      expect(elm.text().trim()).toEqual('Hello');
    });

    it('should create global component with nested name', () => {
      var elm = compileElement( '<react-component name="Views.Hello"/>');
      expect(elm.text().trim()).toEqual('Hello');
    });

    it('should create injectable component with name', () => {
      var elm = compileElement( '<react-component name="InjectedHello"/>' );
      expect(elm.text().trim()).toEqual('Hello');
    });
  });

  describe('properties', () => {

    beforeEach(() => {
      provide.value('Hello', Hello);
    });

    it('should bind to properties on scope', inject(($rootScope) => {
      var scope = $rootScope.$new();
      scope.person = { fname: 'Clark', lname: 'Kent' };

      var elm = compileElement(
        '<react-component name="Hello" props="person"/>',
        scope
      );
      expect(elm.text().trim()).toEqual('Hello Clark Kent');
    }));

    it('should rerender when scope is updated', inject(($rootScope, $timeout) => {

      var scope = $rootScope.$new();
      scope.person = { fname: 'Clark', lname: 'Kent' };

      var elm = compileElement(
        '<react-component name="Hello" props="person"/>',
        scope
      );

      expect(elm.text().trim()).toEqual('Hello Clark Kent');

      scope.person.fname = 'Bruce';
      scope.person.lname = 'Banner';
      scope.$apply();
      $timeout.flush();

      expect(elm.text().trim()).toEqual('Hello Bruce Banner');
    }));

    it('should accept callbacks on scope', inject(($rootScope, $timeout) => {

      var scope = $rootScope.$new();
      scope.person = {
        fname: 'Clark', lname: 'Kent',
        changeName: () => {
          scope.person.fname = 'Bruce';
          scope.person.lname = 'Banner';
        }
      };

      var elm = compileElement(
        '<react-component name="Hello" props="person"/>',
        scope
      );
      expect(elm.text().trim()).toEqual('Hello Clark Kent');

      React.addons.TestUtils.Simulate.click( elm[0].firstChild );
      $timeout.flush();

      expect(elm.text().trim()).toEqual('Hello Bruce Banner');
    }));
  });

  describe('watch-depth', () => {

    describe('value', () => {
      var elm, scope;

      beforeEach(inject(($rootScope) => {
        provide.value('Hello', Hello);
        scope = $rootScope.$new();
        scope.person = { fname: 'Clark', lname: 'Kent' };
      }));

      it('should rerender when a property of scope object is updated', () => inject(($timeout) => {

        elm = compileElement(
            '<react-component name="Hello" props="person" watch-depth="value"/>',
            scope);

        expect(elm.text().trim()).toEqual('Hello Clark Kent');

        scope.person.fname = 'Bruce';
        scope.person.lname = 'Banner';
        scope.$apply();
        $timeout.flush();

        expect(elm.text().trim()).toEqual('Hello Bruce Banner');
      }));

      it('should rerender when a property of scope object is updated', () => inject(($timeout) => {

        //watch-depth will default to value
        elm = compileElement(
            '<react-component name="Hello" props="person" watch-depth="blahblah"/>',
            scope);

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
        scope = $rootScope.$new();
        scope.person = { fname: 'Clark', lname: 'Kent' };

        elm = compileElement(
            '<react-component name="Hello" props="person" watch-depth="reference"/>',
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

  });

  describe('destruction', () => {

    beforeEach(() => {
      provide.value('Hello', Hello);
    });

    it('should unmount component when scope is destroyed', inject(($rootScope) => {

      var scope = $rootScope.$new();
      var elm = compileElement(
        '<react-component name="Hello" props="person"/>',
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