"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particle = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Bubbler = require("./Particle/Bubbler");

var _Drawer = require("./Particle/Drawer");

var _Grabber = require("./Particle/Grabber");

var _Repulser = require("./Particle/Repulser");

var _ShapeType = require("../Enums/ShapeType");

var _Updater = require("./Particle/Updater");

var _Utils = require("./Utils/Utils");

var _PolygonMaskType = require("../Enums/PolygonMaskType");

var _Connecter = require("./Particle/Connecter");

var _InteractionManager = require("./Particle/InteractionManager");

var _HoverMode = require("../Enums/Modes/HoverMode");

var _ClickMode = require("../Enums/Modes/ClickMode");

var _RotateDirection = require("../Enums/RotateDirection");

/**
 * The single particle object
 */
var Particle = /*#__PURE__*/function () {
  /* --------- tsParticles functions - particles ----------- */
  function Particle(container, position) {
    (0, _classCallCheck2["default"])(this, Particle);
    this.angle = void 0;
    this.rotateDirection = void 0;
    this.radius = void 0;
    this.text = void 0;
    this.size = void 0;
    this.initialPosition = void 0;
    this.position = void 0;
    this.offset = void 0;
    this.color = void 0;
    this.opacity = void 0;
    this.velocity = void 0;
    this.shape = void 0;
    this.image = void 0;
    this.character = void 0;
    this.initialVelocity = void 0;
    this.updater = void 0;
    this.bubbler = void 0;
    this.repulser = void 0;
    this.connecter = void 0;
    this.drawer = void 0;
    this.grabber = void 0;
    this.interactionManager = void 0;
    this.container = void 0;
    this.container = container;
    var options = container.options;
    var color = options.particles.color;
    /* size */

    this.size = {};
    this.angle = options.particles.rotate.random ? Math.random() * 360 : options.particles.rotate.value;

    if (options.particles.rotate.direction == _RotateDirection.RotateDirection.random) {
      var index = Math.floor(Math.random() * 2);

      if (index > 0) {
        this.rotateDirection = _RotateDirection.RotateDirection.counterClockwise;
      } else {
        this.rotateDirection = _RotateDirection.RotateDirection.clockwise;
      }
    } else {
      this.rotateDirection = options.particles.rotate.direction;
    }

    this.radius = (options.particles.size.random ? Math.random() : 1) * container.retina.sizeValue;

    if (options.particles.size.animation.enable) {
      this.size.status = false;
      this.size.velocity = container.retina.sizeAnimationSpeed / 100;

      if (!options.particles.size.animation.sync) {
        this.size.velocity = this.size.velocity * Math.random();
      }
    }

    if (options.particles.rotate.animation.enable) {
      if (!options.particles.rotate.animation.sync) {
        this.angle = Math.random() * 360;
      }
    }
    /* position */


    this.position = this.calcPosition(this.container, position);

    if (options.polygon.enable && options.polygon.type === _PolygonMaskType.PolygonMaskType.inline) {
      this.initialPosition = {
        x: this.position.x,
        y: this.position.y
      };
    }
    /* parallax */


    this.offset = {
      x: 0,
      y: 0
    };
    /* check position - avoid overlap */

    if (options.particles.move.collisions) {
      this.checkOverlap(position);
    }
    /* color */


    this.color = _Utils.Utils.getParticleColor(color);
    /* opacity */

    this.opacity = {
      value: (options.particles.opacity.random ? Math.random() : 1) * options.particles.opacity.value
    };

    if (options.particles.opacity.animation.enable) {
      this.opacity.status = false;
      this.opacity.velocity = options.particles.opacity.animation.speed / 100;

      if (!options.particles.opacity.animation.sync) {
        this.opacity.velocity *= Math.random();
      }
    }
    /* animation - velocity for speed */


    this.initialVelocity = Particle.calculateVelocity(options);
    this.velocity = {
      horizontal: this.initialVelocity.horizontal,
      vertical: this.initialVelocity.vertical
    };
    /* if shape is image */

    var shapeType = options.particles.shape.type;

    if (shapeType instanceof Array) {
      this.shape = shapeType[Math.floor(Math.random() * shapeType.length)];
    } else {
      this.shape = shapeType;
    }

    if (this.shape === _ShapeType.ShapeType.image) {
      var shape = options.particles.shape;

      var _index = Math.floor(Math.random() * container.images.length);

      var image = container.images[_index];
      var optionsImage = shape.image instanceof Array ? shape.image[_index] : shape.image;
      this.image = {
        data: image,
        ratio: optionsImage.width / optionsImage.height,
        replaceColor: optionsImage.replaceColor,
        src: optionsImage.src
      };

      if (!this.image.ratio) {
        this.image.ratio = 1;
      }
    }

    if (this.shape === _ShapeType.ShapeType["char"] || this.shape === _ShapeType.ShapeType.character) {
      if (options.particles.shape.character instanceof Array) {
        var arr = options.particles.shape.character;
        this.character = arr[Math.floor(Math.random() * arr.length)];
      } else {
        this.character = options.particles.shape.character;
      }

      var value = this.character.value;

      if (value instanceof Array) {
        this.text = value[Math.floor(Math.random() * value.length)];
      } else {
        this.text = value;
      }
    }

    this.updater = new _Updater.Updater(this.container, this);
    this.bubbler = new _Bubbler.Bubbler(this.container, this);
    this.repulser = new _Repulser.Repulser(this.container, this);
    this.drawer = new _Drawer.Drawer(this.container, this);
    this.grabber = new _Grabber.Grabber(this.container, this);
    this.connecter = new _Connecter.Connecter(this.container, this);
    this.interactionManager = new _InteractionManager.InteractionManager(this.container, this);
  }

  (0, _createClass2["default"])(Particle, [{
    key: "resetVelocity",
    value: function resetVelocity() {
      var container = this.container;
      var options = container.options;
      var velocity = Particle.calculateVelocity(options);
      this.velocity.horizontal = velocity.horizontal;
      this.velocity.vertical = velocity.vertical;
    }
  }, {
    key: "update",
    value: function update(index, delta) {
      var container = this.container;
      var options = container.options;
      this.updater.update(delta);
      var hoverMode = options.interactivity.events.onHover.mode;
      var clickMode = options.interactivity.events.onClick.mode;
      /* events */

      if (_Utils.Utils.isInArray(_HoverMode.HoverMode.grab, hoverMode)) {
        this.grabber.grab();
      } //  New interactivity `connect` which would just connect the particles on hover


      if (_Utils.Utils.isInArray(_HoverMode.HoverMode.connect, options.interactivity.events.onHover.mode)) {
        for (var j = index + 1; j < container.particles.array.length; j++) {
          var p2 = container.particles.array[j];
          this.connecter.connect(p2);
        }
      }

      if (_Utils.Utils.isInArray(_HoverMode.HoverMode.bubble, hoverMode) || _Utils.Utils.isInArray(_ClickMode.ClickMode.bubble, clickMode)) {
        this.bubbler.bubble();
      }

      if (_Utils.Utils.isInArray(_HoverMode.HoverMode.repulse, hoverMode) || _Utils.Utils.isInArray(_ClickMode.ClickMode.repulse, clickMode)) {
        this.repulser.repulse();
      }
    }
  }, {
    key: "interact",
    value: function interact(p2) {
      this.interactionManager.interact(p2);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.drawer.draw();
    }
  }, {
    key: "isOverlapping",
    value: function isOverlapping() {
      var container = this.container;
      var p = this;
      var collisionFound = false;
      var iterations = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = container.particles.array.filter(function (t) {
          return t != p;
        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p2 = _step.value;
          iterations++;

          var dist = _Utils.Utils.getDistanceBetweenCoordinates(p.position, p2.position);

          if (dist <= p.radius + p2.radius) {
            collisionFound = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return {
        collisionFound: collisionFound,
        iterations: iterations
      };
    }
  }, {
    key: "checkOverlap",
    value: function checkOverlap(position) {
      var container = this.container;
      var p = this;
      var overlapResult = p.isOverlapping();

      if (overlapResult.iterations >= container.particles.array.length) {
        var idx = container.particles.array.indexOf(this);

        if (idx >= 0) {
          // too many particles, removing from the current
          container.particles.array.splice(idx);
        }
      }

      if (overlapResult.collisionFound) {
        p.position.x = position ? position.x : Math.random() * container.canvas.dimension.width;
        p.position.y = position ? position.y : Math.random() * container.canvas.dimension.height;
        p.checkOverlap();
      }
    }
  }, {
    key: "calcPosition",
    value: function calcPosition(container, position) {
      var pos = {
        x: 0,
        y: 0
      };

      if (container.polygon.raw && container.polygon.raw.length > 0) {
        if (position) {
          pos.x = position.x;
          pos.y = position.y;
        } else {
          var randomPoint = container.polygon.randomPointInPolygon();
          pos.x = randomPoint.x;
          pos.y = randomPoint.y;
        }
      } else {
        pos.x = position ? position.x : Math.random() * container.canvas.dimension.width;
        pos.y = position ? position.y : Math.random() * container.canvas.dimension.height;
        /* check position  - into the canvas */

        if (pos.x > container.canvas.dimension.width - this.radius * 2) {
          pos.x -= this.radius;
        } else if (pos.x < this.radius * 2) {
          pos.x += this.radius;
        }

        if (pos.y > container.canvas.dimension.height - this.radius * 2) {
          pos.y -= this.radius;
        } else if (pos.y < this.radius * 2) {
          pos.y += this.radius;
        }
      }

      return pos;
    }
  }], [{
    key: "calculateVelocity",
    value: function calculateVelocity(options) {
      var baseVelocity = _Utils.Utils.getParticleBaseVelocity(options);

      var res = {
        horizontal: 0,
        vertical: 0
      };

      if (options.particles.move.straight) {
        res.horizontal = baseVelocity.x;
        res.vertical = baseVelocity.y;

        if (options.particles.move.random) {
          res.horizontal *= Math.random();
          res.vertical *= Math.random();
        }
      } else {
        res.horizontal = baseVelocity.x + Math.random() - 0.5;
        res.vertical = baseVelocity.y + Math.random() - 0.5;
      } // const theta = 2.0 * Math.PI * Math.random();
      // res.x = Math.cos(theta);
      // res.y = Math.sin(theta);


      return res;
    }
  }]);
  return Particle;
}();

exports.Particle = Particle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DbGFzc2VzL1BhcnRpY2xlLnRzIl0sIm5hbWVzIjpbIlBhcnRpY2xlIiwiY29udGFpbmVyIiwicG9zaXRpb24iLCJhbmdsZSIsInJvdGF0ZURpcmVjdGlvbiIsInJhZGl1cyIsInRleHQiLCJzaXplIiwiaW5pdGlhbFBvc2l0aW9uIiwib2Zmc2V0IiwiY29sb3IiLCJvcGFjaXR5IiwidmVsb2NpdHkiLCJzaGFwZSIsImltYWdlIiwiY2hhcmFjdGVyIiwiaW5pdGlhbFZlbG9jaXR5IiwidXBkYXRlciIsImJ1YmJsZXIiLCJyZXB1bHNlciIsImNvbm5lY3RlciIsImRyYXdlciIsImdyYWJiZXIiLCJpbnRlcmFjdGlvbk1hbmFnZXIiLCJvcHRpb25zIiwicGFydGljbGVzIiwicm90YXRlIiwicmFuZG9tIiwiTWF0aCIsInZhbHVlIiwiZGlyZWN0aW9uIiwiUm90YXRlRGlyZWN0aW9uIiwiaW5kZXgiLCJmbG9vciIsImNvdW50ZXJDbG9ja3dpc2UiLCJjbG9ja3dpc2UiLCJyZXRpbmEiLCJzaXplVmFsdWUiLCJhbmltYXRpb24iLCJlbmFibGUiLCJzdGF0dXMiLCJzaXplQW5pbWF0aW9uU3BlZWQiLCJzeW5jIiwiY2FsY1Bvc2l0aW9uIiwicG9seWdvbiIsInR5cGUiLCJQb2x5Z29uTWFza1R5cGUiLCJpbmxpbmUiLCJ4IiwieSIsIm1vdmUiLCJjb2xsaXNpb25zIiwiY2hlY2tPdmVybGFwIiwiVXRpbHMiLCJnZXRQYXJ0aWNsZUNvbG9yIiwic3BlZWQiLCJjYWxjdWxhdGVWZWxvY2l0eSIsImhvcml6b250YWwiLCJ2ZXJ0aWNhbCIsInNoYXBlVHlwZSIsIkFycmF5IiwibGVuZ3RoIiwiU2hhcGVUeXBlIiwiaW1hZ2VzIiwib3B0aW9uc0ltYWdlIiwiZGF0YSIsInJhdGlvIiwid2lkdGgiLCJoZWlnaHQiLCJyZXBsYWNlQ29sb3IiLCJzcmMiLCJhcnIiLCJVcGRhdGVyIiwiQnViYmxlciIsIlJlcHVsc2VyIiwiRHJhd2VyIiwiR3JhYmJlciIsIkNvbm5lY3RlciIsIkludGVyYWN0aW9uTWFuYWdlciIsImRlbHRhIiwidXBkYXRlIiwiaG92ZXJNb2RlIiwiaW50ZXJhY3Rpdml0eSIsImV2ZW50cyIsIm9uSG92ZXIiLCJtb2RlIiwiY2xpY2tNb2RlIiwib25DbGljayIsImlzSW5BcnJheSIsIkhvdmVyTW9kZSIsImdyYWIiLCJjb25uZWN0IiwiaiIsImFycmF5IiwicDIiLCJidWJibGUiLCJDbGlja01vZGUiLCJyZXB1bHNlIiwiaW50ZXJhY3QiLCJkcmF3IiwicCIsImNvbGxpc2lvbkZvdW5kIiwiaXRlcmF0aW9ucyIsImZpbHRlciIsInQiLCJkaXN0IiwiZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRpbmF0ZXMiLCJvdmVybGFwUmVzdWx0IiwiaXNPdmVybGFwcGluZyIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJjYW52YXMiLCJkaW1lbnNpb24iLCJwb3MiLCJyYXciLCJyYW5kb21Qb2ludCIsInJhbmRvbVBvaW50SW5Qb2x5Z29uIiwiYmFzZVZlbG9jaXR5IiwiZ2V0UGFydGljbGVCYXNlVmVsb2NpdHkiLCJyZXMiLCJzdHJhaWdodCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFNQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7O0lBR2FBLFE7QUEwQlQ7QUFDQSxvQkFBWUMsU0FBWixFQUFrQ0MsUUFBbEMsRUFBMkQ7QUFBQTtBQUFBLFNBMUJwREMsS0EwQm9EO0FBQUEsU0F6QnBEQyxlQXlCb0Q7QUFBQSxTQXhCcERDLE1Bd0JvRDtBQUFBLFNBdkIzQ0MsSUF1QjJDO0FBQUEsU0F0QjNDQyxJQXNCMkM7QUFBQSxTQXJCM0NDLGVBcUIyQztBQUFBLFNBcEIzQ04sUUFvQjJDO0FBQUEsU0FuQjNDTyxNQW1CMkM7QUFBQSxTQWxCM0NDLEtBa0IyQztBQUFBLFNBakIzQ0MsT0FpQjJDO0FBQUEsU0FoQjNDQyxRQWdCMkM7QUFBQSxT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QW1DO0FBQy9CNkYsVUFBQUEsR0FBRyxDQUFDL0QsVUFBSixJQUFrQjdCLElBQUksQ0FBQ0QsTUFBTCxFQUFsQjtBQUNBNkYsVUFBQUEsR0FBRyxDQUFDOUQsUUFBSixJQUFnQjlCLElBQUksQ0FBQ0QsTUFBTCxFQUFoQjtBQUNIO0FBQ0osT0FSRCxNQVFPO0FBQ0g2RixRQUFBQSxHQUFHLENBQUMvRCxVQUFKLEdBQWlCNkQsWUFBWSxDQUFDdEUsQ0FBYixHQUFpQnBCLElBQUksQ0FBQ0QsTUFBTCxFQUFqQixHQUFpQyxHQUFsRDtBQUNBNkYsUUFBQUEsR0FBRyxDQUFDOUQsUUFBSixHQUFlNEQsWUFBWSxDQUFDckUsQ0FBYixHQUFpQnJCLElBQUksQ0FBQ0QsTUFBTCxFQUFqQixHQUFpQyxHQUFoRDtBQUNILE9BbEIwRCxDQW9CM0Q7QUFFQTtBQUNBOzs7QUFFQSxhQUFPNkYsR0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7QnViYmxlcn0gZnJvbSBcIi4vUGFydGljbGUvQnViYmxlclwiO1xuaW1wb3J0IHtDb250YWluZXJ9IGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IHtEcmF3ZXJ9IGZyb20gXCIuL1BhcnRpY2xlL0RyYXdlclwiO1xuaW1wb3J0IHtHcmFiYmVyfSBmcm9tIFwiLi9QYXJ0aWNsZS9HcmFiYmVyXCI7XG5pbXBvcnQge0lWZWxvY2l0eX0gZnJvbSBcIi4uL0ludGVyZmFjZXMvSVZlbG9jaXR5XCI7XG5pbXBvcnQge0lTaXplfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9JU2l6ZVwiO1xuaW1wb3J0IHtJT3BhY2l0eX0gZnJvbSBcIi4uL0ludGVyZmFjZXMvSU9wYWNpdHlcIjtcbmltcG9ydCB7SUNvb3JkaW5hdGVzfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9JQ29vcmRpbmF0ZXNcIjtcbmltcG9ydCB7SVBhcnRpY2xlSW1hZ2V9IGZyb20gXCIuLi9JbnRlcmZhY2VzL0lQYXJ0aWNsZUltYWdlXCI7XG5pbXBvcnQge1JlcHVsc2VyfSBmcm9tIFwiLi9QYXJ0aWNsZS9SZXB1bHNlclwiO1xuaW1wb3J0IHtTaGFwZVR5cGV9IGZyb20gXCIuLi9FbnVtcy9TaGFwZVR5cGVcIjtcbmltcG9ydCB7VXBkYXRlcn0gZnJvbSBcIi4vUGFydGljbGUvVXBkYXRlclwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vVXRpbHMvVXRpbHNcIjtcbmltcG9ydCB7UG9seWdvbk1hc2tUeXBlfSBmcm9tIFwiLi4vRW51bXMvUG9seWdvbk1hc2tUeXBlXCI7XG5pbXBvcnQge0Nvbm5lY3Rlcn0gZnJvbSBcIi4vUGFydGljbGUvQ29ubmVjdGVyXCI7XG5pbXBvcnQge0lSZ2J9IGZyb20gXCIuLi9JbnRlcmZhY2VzL0lSZ2JcIjtcbmltcG9ydCB7SU9wdGlvbnN9IGZyb20gXCIuLi9JbnRlcmZhY2VzL09wdGlvbnMvSU9wdGlvbnNcIjtcbmltcG9ydCB7SW50ZXJhY3Rpb25NYW5hZ2VyfSBmcm9tIFwiLi9QYXJ0aWNsZS9JbnRlcmFjdGlvbk1hbmFnZXJcIjtcbmltcG9ydCB7SG92ZXJNb2RlfSBmcm9tIFwiLi4vRW51bXMvTW9kZXMvSG92ZXJNb2RlXCI7XG5pbXBvcnQge0NsaWNrTW9kZX0gZnJvbSBcIi4uL0VudW1zL01vZGVzL0NsaWNrTW9kZVwiO1xuaW1wb3J0IHtSb3RhdGVEaXJlY3Rpb259IGZyb20gXCIuLi9FbnVtcy9Sb3RhdGVEaXJlY3Rpb25cIjtcbmltcG9ydCB7SUNoYXJhY3RlclNoYXBlfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9PcHRpb25zL1BhcnRpY2xlcy9TaGFwZS9JQ2hhcmFjdGVyU2hhcGVcIjtcblxuLyoqXG4gKiBUaGUgc2luZ2xlIHBhcnRpY2xlIG9iamVjdFxuICovXG5leHBvcnQgY2xhc3MgUGFydGljbGUge1xuICAgIHB1YmxpYyBhbmdsZTogbnVtYmVyO1xuICAgIHB1YmxpYyByb3RhdGVEaXJlY3Rpb246IFJvdGF0ZURpcmVjdGlvbjtcbiAgICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG4gICAgcHVibGljIHJlYWRvbmx5IHRleHQ/OiBzdHJpbmc7XG4gICAgcHVibGljIHJlYWRvbmx5IHNpemU6IElTaXplO1xuICAgIHB1YmxpYyByZWFkb25seSBpbml0aWFsUG9zaXRpb24/OiBJQ29vcmRpbmF0ZXM7XG4gICAgcHVibGljIHJlYWRvbmx5IHBvc2l0aW9uOiBJQ29vcmRpbmF0ZXM7XG4gICAgcHVibGljIHJlYWRvbmx5IG9mZnNldDogSUNvb3JkaW5hdGVzO1xuICAgIHB1YmxpYyByZWFkb25seSBjb2xvcjogSVJnYiB8IHVuZGVmaW5lZDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgb3BhY2l0eTogSU9wYWNpdHk7XG4gICAgcHVibGljIHJlYWRvbmx5IHZlbG9jaXR5OiBJVmVsb2NpdHk7XG4gICAgcHVibGljIHJlYWRvbmx5IHNoYXBlPzogU2hhcGVUeXBlO1xuICAgIHB1YmxpYyByZWFkb25seSBpbWFnZT86IElQYXJ0aWNsZUltYWdlO1xuICAgIHB1YmxpYyByZWFkb25seSBjaGFyYWN0ZXI/OiBJQ2hhcmFjdGVyU2hhcGU7XG4gICAgcHVibGljIHJlYWRvbmx5IGluaXRpYWxWZWxvY2l0eTogSVZlbG9jaXR5O1xuXG4gICAgcHVibGljIHJlYWRvbmx5IHVwZGF0ZXI6IFVwZGF0ZXI7XG4gICAgcHVibGljIHJlYWRvbmx5IGJ1YmJsZXI6IEJ1YmJsZXI7XG4gICAgcHVibGljIHJlYWRvbmx5IHJlcHVsc2VyOiBSZXB1bHNlcjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29ubmVjdGVyOiBDb25uZWN0ZXI7XG4gICAgcHVibGljIHJlYWRvbmx5IGRyYXdlcjogRHJhd2VyO1xuICAgIHB1YmxpYyByZWFkb25seSBncmFiYmVyOiBHcmFiYmVyO1xuICAgIHB1YmxpYyByZWFkb25seSBpbnRlcmFjdGlvbk1hbmFnZXI6IEludGVyYWN0aW9uTWFuYWdlcjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29udGFpbmVyOiBDb250YWluZXI7XG5cbiAgICAvKiAtLS0tLS0tLS0gdHNQYXJ0aWNsZXMgZnVuY3Rpb25zIC0gcGFydGljbGVzIC0tLS0tLS0tLS0tICovXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyOiBDb250YWluZXIsIHBvc2l0aW9uPzogSUNvb3JkaW5hdGVzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gb3B0aW9ucy5wYXJ0aWNsZXMuY29sb3I7XG5cbiAgICAgICAgLyogc2l6ZSAqL1xuICAgICAgICB0aGlzLnNpemUgPSB7fTtcbiAgICAgICAgdGhpcy5hbmdsZSA9IG9wdGlvbnMucGFydGljbGVzLnJvdGF0ZS5yYW5kb20gPyBNYXRoLnJhbmRvbSgpICogMzYwIDogb3B0aW9ucy5wYXJ0aWNsZXMucm90YXRlLnZhbHVlO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnBhcnRpY2xlcy5yb3RhdGUuZGlyZWN0aW9uID09IFJvdGF0ZURpcmVjdGlvbi5yYW5kb20pIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZURpcmVjdGlvbiA9IFJvdGF0ZURpcmVjdGlvbi5jb3VudGVyQ2xvY2t3aXNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZURpcmVjdGlvbiA9IFJvdGF0ZURpcmVjdGlvbi5jbG9ja3dpc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZURpcmVjdGlvbiA9IG9wdGlvbnMucGFydGljbGVzLnJvdGF0ZS5kaXJlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJhZGl1cyA9IChvcHRpb25zLnBhcnRpY2xlcy5zaXplLnJhbmRvbSA/IE1hdGgucmFuZG9tKCkgOiAxKSAqIGNvbnRhaW5lci5yZXRpbmEuc2l6ZVZhbHVlO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnBhcnRpY2xlcy5zaXplLmFuaW1hdGlvbi5lbmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2l6ZS5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2l6ZS52ZWxvY2l0eSA9IGNvbnRhaW5lci5yZXRpbmEuc2l6ZUFuaW1hdGlvblNwZWVkIC8gMTAwO1xuXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFydGljbGVzLnNpemUuYW5pbWF0aW9uLnN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUudmVsb2NpdHkgPSB0aGlzLnNpemUudmVsb2NpdHkgKiBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucGFydGljbGVzLnJvdGF0ZS5hbmltYXRpb24uZW5hYmxlKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFydGljbGVzLnJvdGF0ZS5hbmltYXRpb24uc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogMzYwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogcG9zaXRpb24gKi9cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuY2FsY1Bvc2l0aW9uKHRoaXMuY29udGFpbmVyLCBwb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucG9seWdvbi5lbmFibGUgJiYgb3B0aW9ucy5wb2x5Z29uLnR5cGUgPT09IFBvbHlnb25NYXNrVHlwZS5pbmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogcGFyYWxsYXggKi9cbiAgICAgICAgdGhpcy5vZmZzZXQgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfTtcblxuICAgICAgICAvKiBjaGVjayBwb3NpdGlvbiAtIGF2b2lkIG92ZXJsYXAgKi9cbiAgICAgICAgaWYgKG9wdGlvbnMucGFydGljbGVzLm1vdmUuY29sbGlzaW9ucykge1xuICAgICAgICAgICAgdGhpcy5jaGVja092ZXJsYXAocG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogY29sb3IgKi9cbiAgICAgICAgdGhpcy5jb2xvciA9IFV0aWxzLmdldFBhcnRpY2xlQ29sb3IoY29sb3IpO1xuXG4gICAgICAgIC8qIG9wYWNpdHkgKi9cbiAgICAgICAgdGhpcy5vcGFjaXR5ID0ge1xuICAgICAgICAgICAgdmFsdWU6IChvcHRpb25zLnBhcnRpY2xlcy5vcGFjaXR5LnJhbmRvbSA/IE1hdGgucmFuZG9tKCkgOiAxKSAqIG9wdGlvbnMucGFydGljbGVzLm9wYWNpdHkudmFsdWUsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucGFydGljbGVzLm9wYWNpdHkuYW5pbWF0aW9uLmVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5LnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5LnZlbG9jaXR5ID0gb3B0aW9ucy5wYXJ0aWNsZXMub3BhY2l0eS5hbmltYXRpb24uc3BlZWQgLyAxMDA7XG5cbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5wYXJ0aWNsZXMub3BhY2l0eS5hbmltYXRpb24uc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMub3BhY2l0eS52ZWxvY2l0eSAqPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogYW5pbWF0aW9uIC0gdmVsb2NpdHkgZm9yIHNwZWVkICovXG4gICAgICAgIHRoaXMuaW5pdGlhbFZlbG9jaXR5ID0gUGFydGljbGUuY2FsY3VsYXRlVmVsb2NpdHkob3B0aW9ucyk7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB7XG4gICAgICAgICAgICBob3Jpem9udGFsOiB0aGlzLmluaXRpYWxWZWxvY2l0eS5ob3Jpem9udGFsLFxuICAgICAgICAgICAgdmVydGljYWw6IHRoaXMuaW5pdGlhbFZlbG9jaXR5LnZlcnRpY2FsLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8qIGlmIHNoYXBlIGlzIGltYWdlICovXG4gICAgICAgIGNvbnN0IHNoYXBlVHlwZSA9IG9wdGlvbnMucGFydGljbGVzLnNoYXBlLnR5cGU7XG5cbiAgICAgICAgaWYgKHNoYXBlVHlwZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGVUeXBlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNoYXBlVHlwZS5sZW5ndGgpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZVR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaGFwZSA9PT0gU2hhcGVUeXBlLmltYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IG9wdGlvbnMucGFydGljbGVzLnNoYXBlO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb250YWluZXIuaW1hZ2VzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGNvbnRhaW5lci5pbWFnZXNbaW5kZXhdO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uc0ltYWdlID0gc2hhcGUuaW1hZ2UgaW5zdGFuY2VvZiBBcnJheSA/IHNoYXBlLmltYWdlW2luZGV4XSA6IHNoYXBlLmltYWdlO1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHtcbiAgICAgICAgICAgICAgICBkYXRhOiBpbWFnZSxcbiAgICAgICAgICAgICAgICByYXRpbzogb3B0aW9uc0ltYWdlLndpZHRoIC8gb3B0aW9uc0ltYWdlLmhlaWdodCxcbiAgICAgICAgICAgICAgICByZXBsYWNlQ29sb3I6IG9wdGlvbnNJbWFnZS5yZXBsYWNlQ29sb3IsXG4gICAgICAgICAgICAgICAgc3JjOiBvcHRpb25zSW1hZ2Uuc3JjLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmltYWdlLnJhdGlvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZS5yYXRpbyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaGFwZSA9PT0gU2hhcGVUeXBlLmNoYXIgfHwgdGhpcy5zaGFwZSA9PT0gU2hhcGVUeXBlLmNoYXJhY3Rlcikge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGFydGljbGVzLnNoYXBlLmNoYXJhY3RlciBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyID0gb3B0aW9ucy5wYXJ0aWNsZXMuc2hhcGUuY2hhcmFjdGVyO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyID0gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBvcHRpb25zLnBhcnRpY2xlcy5zaGFwZS5jaGFyYWN0ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jaGFyYWN0ZXIudmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdmFsdWVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsdWUubGVuZ3RoKV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZXIgPSBuZXcgVXBkYXRlcih0aGlzLmNvbnRhaW5lciwgdGhpcyk7XG4gICAgICAgIHRoaXMuYnViYmxlciA9IG5ldyBCdWJibGVyKHRoaXMuY29udGFpbmVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5yZXB1bHNlciA9IG5ldyBSZXB1bHNlcih0aGlzLmNvbnRhaW5lciwgdGhpcyk7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gbmV3IERyYXdlcih0aGlzLmNvbnRhaW5lciwgdGhpcyk7XG4gICAgICAgIHRoaXMuZ3JhYmJlciA9IG5ldyBHcmFiYmVyKHRoaXMuY29udGFpbmVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZXIgPSBuZXcgQ29ubmVjdGVyKHRoaXMuY29udGFpbmVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIgPSBuZXcgSW50ZXJhY3Rpb25NYW5hZ2VyKHRoaXMuY29udGFpbmVyLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVWZWxvY2l0eShvcHRpb25zOiBJT3B0aW9ucyk6IElWZWxvY2l0eSB7XG4gICAgICAgIGNvbnN0IGJhc2VWZWxvY2l0eSA9IFV0aWxzLmdldFBhcnRpY2xlQmFzZVZlbG9jaXR5KG9wdGlvbnMpO1xuICAgICAgICBjb25zdCByZXMgPSB7XG4gICAgICAgICAgICBob3Jpem9udGFsOiAwLFxuICAgICAgICAgICAgdmVydGljYWw6IDAsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucGFydGljbGVzLm1vdmUuc3RyYWlnaHQpIHtcbiAgICAgICAgICAgIHJlcy5ob3Jpem9udGFsID0gYmFzZVZlbG9jaXR5Lng7XG4gICAgICAgICAgICByZXMudmVydGljYWwgPSBiYXNlVmVsb2NpdHkueTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGFydGljbGVzLm1vdmUucmFuZG9tKSB7XG4gICAgICAgICAgICAgICAgcmVzLmhvcml6b250YWwgKj0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICByZXMudmVydGljYWwgKj0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcy5ob3Jpem9udGFsID0gYmFzZVZlbG9jaXR5LnggKyBNYXRoLnJhbmRvbSgpIC0gMC41O1xuICAgICAgICAgICAgcmVzLnZlcnRpY2FsID0gYmFzZVZlbG9jaXR5LnkgKyBNYXRoLnJhbmRvbSgpIC0gMC41O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc3QgdGhldGEgPSAyLjAgKiBNYXRoLlBJICogTWF0aC5yYW5kb20oKTtcblxuICAgICAgICAvLyByZXMueCA9IE1hdGguY29zKHRoZXRhKTtcbiAgICAgICAgLy8gcmVzLnkgPSBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXRWZWxvY2l0eSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIub3B0aW9ucztcbiAgICAgICAgY29uc3QgdmVsb2NpdHkgPSBQYXJ0aWNsZS5jYWxjdWxhdGVWZWxvY2l0eShvcHRpb25zKTtcblxuICAgICAgICB0aGlzLnZlbG9jaXR5Lmhvcml6b250YWwgPSB2ZWxvY2l0eS5ob3Jpem9udGFsO1xuICAgICAgICB0aGlzLnZlbG9jaXR5LnZlcnRpY2FsID0gdmVsb2NpdHkudmVydGljYWw7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShpbmRleDogbnVtYmVyLCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGFpbmVyLm9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy51cGRhdGVyLnVwZGF0ZShkZWx0YSk7XG5cbiAgICAgICAgY29uc3QgaG92ZXJNb2RlID0gb3B0aW9ucy5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbkhvdmVyLm1vZGU7XG4gICAgICAgIGNvbnN0IGNsaWNrTW9kZSA9IG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25DbGljay5tb2RlO1xuXG4gICAgICAgIC8qIGV2ZW50cyAqL1xuICAgICAgICBpZiAoVXRpbHMuaXNJbkFycmF5KEhvdmVyTW9kZS5ncmFiLCBob3Zlck1vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmdyYWJiZXIuZ3JhYigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gIE5ldyBpbnRlcmFjdGl2aXR5IGBjb25uZWN0YCB3aGljaCB3b3VsZCBqdXN0IGNvbm5lY3QgdGhlIHBhcnRpY2xlcyBvbiBob3ZlclxuXG4gICAgICAgIGlmIChVdGlscy5pc0luQXJyYXkoSG92ZXJNb2RlLmNvbm5lY3QsIG9wdGlvbnMuaW50ZXJhY3Rpdml0eS5ldmVudHMub25Ib3Zlci5tb2RlKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGluZGV4ICsgMTsgaiA8IGNvbnRhaW5lci5wYXJ0aWNsZXMuYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwMiA9IGNvbnRhaW5lci5wYXJ0aWNsZXMuYXJyYXlbal07XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0ZXIuY29ubmVjdChwMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVXRpbHMuaXNJbkFycmF5KEhvdmVyTW9kZS5idWJibGUsIGhvdmVyTW9kZSkgfHwgVXRpbHMuaXNJbkFycmF5KENsaWNrTW9kZS5idWJibGUsIGNsaWNrTW9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYnViYmxlci5idWJibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVdGlscy5pc0luQXJyYXkoSG92ZXJNb2RlLnJlcHVsc2UsIGhvdmVyTW9kZSkgfHwgVXRpbHMuaXNJbkFycmF5KENsaWNrTW9kZS5yZXB1bHNlLCBjbGlja01vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlcHVsc2VyLnJlcHVsc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpbnRlcmFjdChwMjogUGFydGljbGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIuaW50ZXJhY3QocDIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzT3ZlcmxhcHBpbmcoKTogeyBjb2xsaXNpb25Gb3VuZDogYm9vbGVhbiwgaXRlcmF0aW9uczogbnVtYmVyIH0ge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3QgcCA9IHRoaXM7XG4gICAgICAgIGxldCBjb2xsaXNpb25Gb3VuZCA9IGZhbHNlO1xuICAgICAgICBsZXQgaXRlcmF0aW9ucyA9IDA7XG5cbiAgICAgICAgZm9yIChjb25zdCBwMiBvZiBjb250YWluZXIucGFydGljbGVzLmFycmF5LmZpbHRlcigodCkgPT4gdCAhPSBwKSkge1xuICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICAgICAgY29uc3QgZGlzdCA9IFV0aWxzLmdldERpc3RhbmNlQmV0d2VlbkNvb3JkaW5hdGVzKHAucG9zaXRpb24sIHAyLnBvc2l0aW9uKTtcblxuICAgICAgICAgICAgaWYgKGRpc3QgPD0gcC5yYWRpdXMgKyBwMi5yYWRpdXMpIHtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25Gb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sbGlzaW9uRm91bmQ6IGNvbGxpc2lvbkZvdW5kLFxuICAgICAgICAgICAgaXRlcmF0aW9uczogaXRlcmF0aW9ucyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tPdmVybGFwKHBvc2l0aW9uPzogSUNvb3JkaW5hdGVzKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBjb25zdCBwID0gdGhpcztcbiAgICAgICAgY29uc3Qgb3ZlcmxhcFJlc3VsdCA9IHAuaXNPdmVybGFwcGluZygpO1xuXG4gICAgICAgIGlmIChvdmVybGFwUmVzdWx0Lml0ZXJhdGlvbnMgPj0gY29udGFpbmVyLnBhcnRpY2xlcy5hcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNvbnRhaW5lci5wYXJ0aWNsZXMuYXJyYXkuaW5kZXhPZih0aGlzKTtcblxuICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gdG9vIG1hbnkgcGFydGljbGVzLCByZW1vdmluZyBmcm9tIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnBhcnRpY2xlcy5hcnJheS5zcGxpY2UoaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdmVybGFwUmVzdWx0LmNvbGxpc2lvbkZvdW5kKSB7XG4gICAgICAgICAgICBwLnBvc2l0aW9uLnggPSBwb3NpdGlvbiA/IHBvc2l0aW9uLnggOiBNYXRoLnJhbmRvbSgpICogY29udGFpbmVyLmNhbnZhcy5kaW1lbnNpb24ud2lkdGg7XG4gICAgICAgICAgICBwLnBvc2l0aW9uLnkgPSBwb3NpdGlvbiA/IHBvc2l0aW9uLnkgOiBNYXRoLnJhbmRvbSgpICogY29udGFpbmVyLmNhbnZhcy5kaW1lbnNpb24uaGVpZ2h0O1xuXG4gICAgICAgICAgICBwLmNoZWNrT3ZlcmxhcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjUG9zaXRpb24oY29udGFpbmVyOiBDb250YWluZXIsIHBvc2l0aW9uPzogSUNvb3JkaW5hdGVzKTogSUNvb3JkaW5hdGVzIHtcbiAgICAgICAgY29uc3QgcG9zID0ge3g6IDAsIHk6IDB9O1xuXG4gICAgICAgIGlmIChjb250YWluZXIucG9seWdvbi5yYXcgJiYgY29udGFpbmVyLnBvbHlnb24ucmF3Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBwb3MueSA9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbVBvaW50ID0gY29udGFpbmVyLnBvbHlnb24ucmFuZG9tUG9pbnRJblBvbHlnb24oKTtcblxuICAgICAgICAgICAgICAgIHBvcy54ID0gcmFuZG9tUG9pbnQueDtcbiAgICAgICAgICAgICAgICBwb3MueSA9IHJhbmRvbVBvaW50Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3MueCA9IHBvc2l0aW9uID8gcG9zaXRpb24ueCA6IE1hdGgucmFuZG9tKCkgKiBjb250YWluZXIuY2FudmFzLmRpbWVuc2lvbi53aWR0aDtcbiAgICAgICAgICAgIHBvcy55ID0gcG9zaXRpb24gPyBwb3NpdGlvbi55IDogTWF0aC5yYW5kb20oKSAqIGNvbnRhaW5lci5jYW52YXMuZGltZW5zaW9uLmhlaWdodDtcblxuICAgICAgICAgICAgLyogY2hlY2sgcG9zaXRpb24gIC0gaW50byB0aGUgY2FudmFzICovXG4gICAgICAgICAgICBpZiAocG9zLnggPiBjb250YWluZXIuY2FudmFzLmRpbWVuc2lvbi53aWR0aCAtIHRoaXMucmFkaXVzICogMikge1xuICAgICAgICAgICAgICAgIHBvcy54IC09IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3MueCA8IHRoaXMucmFkaXVzICogMikge1xuICAgICAgICAgICAgICAgIHBvcy54ICs9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocG9zLnkgPiBjb250YWluZXIuY2FudmFzLmRpbWVuc2lvbi5oZWlnaHQgLSB0aGlzLnJhZGl1cyAqIDIpIHtcbiAgICAgICAgICAgICAgICBwb3MueSAtPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zLnkgPCB0aGlzLnJhZGl1cyAqIDIpIHtcbiAgICAgICAgICAgICAgICBwb3MueSArPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxufVxuIl19