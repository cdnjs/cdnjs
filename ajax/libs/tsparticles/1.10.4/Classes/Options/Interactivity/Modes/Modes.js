"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modes = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Bubble = require("./Bubble");

var _Connect = require("./Connect");

var _Grab = require("./Grab");

var _Remove = require("./Remove");

var _Push = require("./Push");

var _Repulse = require("./Repulse");

var _Slow = require("./Slow");

var Modes = /*#__PURE__*/function () {
  function Modes() {
    (0, _classCallCheck2["default"])(this, Modes);
    this.bubble = void 0;
    this.connect = void 0;
    this.grab = void 0;
    this.push = void 0;
    this.remove = void 0;
    this.repulse = void 0;
    this.slow = void 0;
    this.bubble = new _Bubble.Bubble();
    this.connect = new _Connect.Connect();
    this.grab = new _Grab.Grab();
    this.push = new _Push.Push();
    this.remove = new _Remove.Remove();
    this.repulse = new _Repulse.Repulse();
    this.slow = new _Slow.Slow();
  }

  (0, _createClass2["default"])(Modes, [{
    key: "load",
    value: function load(data) {
      if (data !== undefined) {
        this.bubble.load(data.bubble);
        this.connect.load(data.connect);
        this.grab.load(data.grab);
        this.push.load(data.push);
        this.remove.load(data.remove);
        this.repulse.load(data.repulse);
        this.slow.load(data.slow);
      }
    }
  }]);
  return Modes;
}();

exports.Modes = Modes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9DbGFzc2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9Nb2Rlcy50cyJdLCJuYW1lcyI6WyJNb2RlcyIsImJ1YmJsZSIsImNvbm5lY3QiLCJncmFiIiwicHVzaCIsInJlbW92ZSIsInJlcHVsc2UiLCJzbG93IiwiQnViYmxlIiwiQ29ubmVjdCIsIkdyYWIiLCJQdXNoIiwiUmVtb3ZlIiwiUmVwdWxzZSIsIlNsb3ciLCJkYXRhIiwidW5kZWZpbmVkIiwibG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQVVhQSxLO0FBU1QsbUJBQWM7QUFBQTtBQUFBLFNBUlBDLE1BUU87QUFBQSxTQVBQQyxPQU9PO0FBQUEsU0FOUEMsSUFNTztBQUFBLFNBTFBDLElBS087QUFBQSxTQUpQQyxNQUlPO0FBQUEsU0FIUEMsT0FHTztBQUFBLFNBRlBDLElBRU87QUFDVixTQUFLTixNQUFMLEdBQWMsSUFBSU8sY0FBSixFQUFkO0FBQ0EsU0FBS04sT0FBTCxHQUFlLElBQUlPLGdCQUFKLEVBQWY7QUFDQSxTQUFLTixJQUFMLEdBQVksSUFBSU8sVUFBSixFQUFaO0FBQ0EsU0FBS04sSUFBTCxHQUFZLElBQUlPLFVBQUosRUFBWjtBQUNBLFNBQUtOLE1BQUwsR0FBYyxJQUFJTyxjQUFKLEVBQWQ7QUFDQSxTQUFLTixPQUFMLEdBQWUsSUFBSU8sZ0JBQUosRUFBZjtBQUNBLFNBQUtOLElBQUwsR0FBWSxJQUFJTyxVQUFKLEVBQVo7QUFDSDs7Ozt5QkFFV0MsSSxFQUF1QztBQUMvQyxVQUFJQSxJQUFJLEtBQUtDLFNBQWIsRUFBd0I7QUFDcEIsYUFBS2YsTUFBTCxDQUFZZ0IsSUFBWixDQUFpQkYsSUFBSSxDQUFDZCxNQUF0QjtBQUNBLGFBQUtDLE9BQUwsQ0FBYWUsSUFBYixDQUFrQkYsSUFBSSxDQUFDYixPQUF2QjtBQUNBLGFBQUtDLElBQUwsQ0FBVWMsSUFBVixDQUFlRixJQUFJLENBQUNaLElBQXBCO0FBQ0EsYUFBS0MsSUFBTCxDQUFVYSxJQUFWLENBQWVGLElBQUksQ0FBQ1gsSUFBcEI7QUFDQSxhQUFLQyxNQUFMLENBQVlZLElBQVosQ0FBaUJGLElBQUksQ0FBQ1YsTUFBdEI7QUFDQSxhQUFLQyxPQUFMLENBQWFXLElBQWIsQ0FBa0JGLElBQUksQ0FBQ1QsT0FBdkI7QUFDQSxhQUFLQyxJQUFMLENBQVVVLElBQVYsQ0FBZUYsSUFBSSxDQUFDUixJQUFwQjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lNb2Rlc30gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lNb2Rlc1wiO1xuaW1wb3J0IHtCdWJibGV9IGZyb20gXCIuL0J1YmJsZVwiO1xuaW1wb3J0IHtDb25uZWN0fSBmcm9tIFwiLi9Db25uZWN0XCI7XG5pbXBvcnQge0dyYWJ9IGZyb20gXCIuL0dyYWJcIjtcbmltcG9ydCB7UmVtb3ZlfSBmcm9tIFwiLi9SZW1vdmVcIjtcbmltcG9ydCB7UHVzaH0gZnJvbSBcIi4vUHVzaFwiO1xuaW1wb3J0IHtSZXB1bHNlfSBmcm9tIFwiLi9SZXB1bHNlXCI7XG5pbXBvcnQge1Nsb3d9IGZyb20gXCIuL1Nsb3dcIjtcbmltcG9ydCB7SUJ1YmJsZX0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lCdWJibGVcIjtcbmltcG9ydCB7SUNvbm5lY3R9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JQ29ubmVjdFwiO1xuaW1wb3J0IHtJR3JhYn0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lHcmFiXCI7XG5pbXBvcnQge0lQdXNofSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9PcHRpb25zL0ludGVyYWN0aXZpdHkvTW9kZXMvSVB1c2hcIjtcbmltcG9ydCB7SVJlbW92ZX0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lSZW1vdmVcIjtcbmltcG9ydCB7SVJlcHVsc2V9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSW50ZXJhY3Rpdml0eS9Nb2Rlcy9JUmVwdWxzZVwiO1xuaW1wb3J0IHtJU2xvd30gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT3B0aW9ucy9JbnRlcmFjdGl2aXR5L01vZGVzL0lTbG93XCI7XG5pbXBvcnQge1JlY3Vyc2l2ZVBhcnRpYWx9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmV4cG9ydCBjbGFzcyBNb2RlcyBpbXBsZW1lbnRzIElNb2RlcyB7XG4gICAgcHVibGljIGJ1YmJsZTogSUJ1YmJsZTtcbiAgICBwdWJsaWMgY29ubmVjdDogSUNvbm5lY3Q7XG4gICAgcHVibGljIGdyYWI6IElHcmFiO1xuICAgIHB1YmxpYyBwdXNoOiBJUHVzaDtcbiAgICBwdWJsaWMgcmVtb3ZlOiBJUmVtb3ZlO1xuICAgIHB1YmxpYyByZXB1bHNlOiBJUmVwdWxzZTtcbiAgICBwdWJsaWMgc2xvdzogSVNsb3c7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5idWJibGUgPSBuZXcgQnViYmxlKCk7XG4gICAgICAgIHRoaXMuY29ubmVjdCA9IG5ldyBDb25uZWN0KCk7XG4gICAgICAgIHRoaXMuZ3JhYiA9IG5ldyBHcmFiKCk7XG4gICAgICAgIHRoaXMucHVzaCA9IG5ldyBQdXNoKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlID0gbmV3IFJlbW92ZSgpO1xuICAgICAgICB0aGlzLnJlcHVsc2UgPSBuZXcgUmVwdWxzZSgpO1xuICAgICAgICB0aGlzLnNsb3cgPSBuZXcgU2xvdygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKGRhdGE/OiBSZWN1cnNpdmVQYXJ0aWFsPElNb2Rlcz4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5idWJibGUubG9hZChkYXRhLmJ1YmJsZSk7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3QubG9hZChkYXRhLmNvbm5lY3QpO1xuICAgICAgICAgICAgdGhpcy5ncmFiLmxvYWQoZGF0YS5ncmFiKTtcbiAgICAgICAgICAgIHRoaXMucHVzaC5sb2FkKGRhdGEucHVzaCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZS5sb2FkKGRhdGEucmVtb3ZlKTtcbiAgICAgICAgICAgIHRoaXMucmVwdWxzZS5sb2FkKGRhdGEucmVwdWxzZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3cubG9hZChkYXRhLnNsb3cpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19