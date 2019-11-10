var expect = chai.expect;

describe('Notification provider', function () {
  var $window, $notification;

  beforeEach(module('notification'));

  beforeEach(module(function ($notificationProvider) {
    $notificationProvider.setOptions({ foo: 'bar' });
  }));

  beforeEach(inject(function ($injector) {
    $window = $injector.get('$window');
    $notification = $injector.get('$notification');
    $rootScope = $injector.get('$rootScope');

    $window.Notification = sinon.spy();
    $window.Notification.prototype.addEventListener = sinon.spy();
    $window.Notification.prototype.close = sinon.spy();
    $window.Notification.requestPermission = sinon.spy(requestPermission);
    $window.Notification.respondPermission = respondPermission;


    /*var requestPromise = $q.defer();*/
    function requestPermission(callback) {
      $window.Notification._permissionCb = callback;
    }

    function respondPermission(permission) {
      $window.Notification._permissionCb(permission);
      $rootScope.$digest();
    }
  }));

  describe('#setOptions', function () {
    it('should define default options', function () {
      $notification('title');
      $window.Notification.respondPermission('granted');
      expect($window.Notification).to.be.calledWith('title', {
        foo: 'bar',
        focusWindowOnClick: true
      });
    });

    it('should extend options in the correct order', function () {
      $notification('title', {foo: 'x', focusWindowOnClick: false});
      $window.Notification.respondPermission('granted');
      expect($window.Notification).to.be.calledWith('title', {
        foo: 'x',
        focusWindowOnClick: false
      });
    });
  });

  describe('#getPermission', function () {
    it('should get current permission', function () {
      $window.Notification.permission = 'default';
      expect($notification.getPermission()).to.equal('default');

      $window.Notification.permission = 'granted';
      expect($notification.getPermission()).to.equal('granted');

      $window.Notification.permission = 'denied';
      expect($notification.getPermission()).to.equal('denied');
    });
  });

  describe('#requestPermission', function () {
    it('should request if permission is "default"', function () {
      $window.Notification.permission = 'default';
      $notification();
      expect($window.Notification.requestPermission).to.be.called;
    });

    it('should request if permission is not defined', function () {
      $window.Notification.permission = undefined;
      $notification();
      expect($window.Notification.requestPermission).to.be.called;
    });

    it('should set permission', function () {
      $window.Notification.permission = undefined;
      $notification();
      $window.Notification.respondPermission('granted');
      expect($window.Notification.requestPermission).to.be.called;
      expect($window.Notification.permission).to.equal('granted');
    });

    it('should be possible to request permission', function (done) {
      $notification.requestPermission()
      .then(function (permission) {
        expect(permission).to.equal('granted');
        done();
      });

      $window.Notification.respondPermission('granted');
    });
  });

  describe('#$on', function () {
    it('should register events when permission is "granted" at start', function () {
      $window.Notification.permission = 'granted';
      var notification = $notification();
      notification.$on('close', function () {});

      expect(notification.baseNotification.addEventListener).to.be.calledWith('close');
    });

    it('should register events when permission is not "granted" at start', function () {
      var notification = $notification();
      notification.$on('close', function () {});
      $window.Notification.respondPermission('granted');
      expect(notification.baseNotification.addEventListener).to.be.calledWith('close');
    });
  });

  describe('#close', function () {
    it('should do nothing if notification is not created', function () {
      var notification = $notification();
      notification.close();
    });

    it('should close notification if created', function () {
      $window.Notification.permission = 'granted';
      var notification = $notification();
      notification.close();
      expect(notification.baseNotification.close).to.be.called;
    });
  });

  describe('#delay', function () {
    var clock;

    beforeEach(function () {
      clock = sinon.useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should be possible to set a delay', function () {
      $window.Notification.permission = 'granted';
      var notification = $notification('title', { delay: 1000 });
      expect(notification.baseNotification.close).to.not.be.called;

      clock.tick(1001);

      expect(notification.baseNotification.close).to.be.called;
    });
  });
});


describe('Notification provider', function () {
  var $window, $notification;

  beforeEach(module('notification'));

  describe('#isSupported', function () {
    it('should be true if current browser support Notification', function () {
      inject(function ($injector) {
        var $window = $injector.get('$window');
        $window.Notification = {};

        var $notification = $injector.get('$notification');
        expect($notification.isSupported).to.equal(true);
      });
    });

    it('should be false if current browser does not support Notification', function () {
      inject(function ($injector) {
        var $window = $injector.get('$window');
        $window.Notification = undefined;

        var $notification = $injector.get('$notification');
        expect($notification.isSupported).to.equal(false);
      });
    });
  });
});
