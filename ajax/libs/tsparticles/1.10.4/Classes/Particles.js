"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particles = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Particle = require("./Particle");

var _PolygonMaskType = require("../Enums/PolygonMaskType");

var _PolygonMaskInlineArrangement = require("../Enums/PolygonMaskInlineArrangement");

/**
 * Particles manager
 */
var Particles = /*#__PURE__*/function () {
  function Particles(container) {
    (0, _classCallCheck2["default"])(this, Particles);
    this.array = void 0;
    this.pushing = void 0;
    this.lineLinkedColor = void 0;
    this.container = void 0;
    this.interactionsEnabled = void 0;
    this.container = container;
    this.array = [];
    this.interactionsEnabled = false;
  }
  /* --------- tsParticles functions - particles ----------- */


  (0, _createClass2["default"])(Particles, [{
    key: "init",
    value: function init() {
      var container = this.container;
      var options = container.options;

      if (options.polygon.enable && options.polygon.type === _PolygonMaskType.PolygonMaskType.inline && options.polygon.inline.arrangement === _PolygonMaskInlineArrangement.PolygonMaskInlineArrangement.onePerPoint) {
        container.polygon.drawPointsOnPolygonPath();
      } else {
        for (var i = this.array.length; i < options.particles.number.value; i++) {
          var p = new _Particle.Particle(container);
          this.array.push(p);
        }
      }

      this.interactionsEnabled = options.particles.lineLinked.enable || options.particles.move.attract.enable || options.particles.move.collisions;
    }
  }, {
    key: "update",
    value: function update(delta) {
      for (var i = 0; i < this.array.length; i++) {
        /* the particle */
        var p = this.array[i]; // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
        //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
        // let f = -BANG_SIZE / d;
        // if ( d < BANG_SIZE ) {
        //     let t = Math.atan2( dy, dx );
        //     p.vx = f * Math.cos(t);
        //     p.vy = f * Math.sin(t);
        // }

        p.update(i, delta);
        /* interaction auto between particles */

        if (this.interactionsEnabled) {
          for (var j = i + 1; j < this.array.length; j++) {
            var p2 = this.array[j];
            p.interact(p2);
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(delta) {
      var container = this.container;
      var options = container.options;
      /* clear canvas */

      container.canvas.clear();
      /* update each particles param */

      this.update(delta);
      /* draw polygon shape in debug mode */

      if (options.polygon.enable && options.polygon.draw.enable) {
        container.polygon.drawPolygon();
      }
      /* draw each particle */


      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;
          p.draw();
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
    }
  }, {
    key: "clear",
    value: function clear() {
      this.array = [];
    }
    /* ---------- tsParticles functions - modes events ------------ */

  }, {
    key: "push",
    value: function push(nb, mousePosition) {
      var container = this.container;
      var options = container.options;
      this.pushing = true;

      if (options.particles.number.limit > 0) {
        if (this.array.length + nb > options.particles.number.limit) {
          this.remove(this.array.length + nb - options.particles.number.limit);
        }
      }

      var pos;

      if (mousePosition) {
        pos = mousePosition.position || {
          x: 0,
          y: 0
        };
      }

      for (var i = 0; i < nb; i++) {
        var p = new _Particle.Particle(container, pos);
        this.array.push(p);
      }

      if (!options.particles.move.enable) {
        this.draw(0);
      }

      this.pushing = false;
    }
  }, {
    key: "remove",
    value: function remove(nb) {
      var container = this.container;
      var options = container.options;
      this.array.splice(0, nb);

      if (!options.particles.move.enable) {
        this.draw(0);
      }
    }
  }]);
  return Particles;
}();

exports.Particles = Particles;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DbGFzc2VzL1BhcnRpY2xlcy50cyJdLCJuYW1lcyI6WyJQYXJ0aWNsZXMiLCJjb250YWluZXIiLCJhcnJheSIsInB1c2hpbmciLCJsaW5lTGlua2VkQ29sb3IiLCJpbnRlcmFjdGlvbnNFbmFibGVkIiwib3B0aW9ucyIsInBvbHlnb24iLCJlbmFibGUiLCJ0eXBlIiwiUG9seWdvbk1hc2tUeXBlIiwiaW5saW5lIiwiYXJyYW5nZW1lbnQiLCJQb2x5Z29uTWFza0lubGluZUFycmFuZ2VtZW50Iiwib25lUGVyUG9pbnQiLCJkcmF3UG9pbnRzT25Qb2x5Z29uUGF0aCIsImkiLCJsZW5ndGgiLCJwYXJ0aWNsZXMiLCJudW1iZXIiLCJ2YWx1ZSIsInAiLCJQYXJ0aWNsZSIsInB1c2giLCJsaW5lTGlua2VkIiwibW92ZSIsImF0dHJhY3QiLCJjb2xsaXNpb25zIiwiZGVsdGEiLCJ1cGRhdGUiLCJqIiwicDIiLCJpbnRlcmFjdCIsImNhbnZhcyIsImNsZWFyIiwiZHJhdyIsImRyYXdQb2x5Z29uIiwibmIiLCJtb3VzZVBvc2l0aW9uIiwibGltaXQiLCJyZW1vdmUiLCJwb3MiLCJwb3NpdGlvbiIsIngiLCJ5Iiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQU1BOztBQUNBOztBQUNBOztBQUVBOzs7SUFHYUEsUztBQVFULHFCQUFZQyxTQUFaLEVBQWtDO0FBQUE7QUFBQSxTQVAzQkMsS0FPMkI7QUFBQSxTQU4zQkMsT0FNMkI7QUFBQSxTQUwzQkMsZUFLMkI7QUFBQSxTQUhqQkgsU0FHaUI7QUFBQSxTQUYxQkksbUJBRTBCO0FBQzlCLFNBQUtKLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLRyxtQkFBTCxHQUEyQixLQUEzQjtBQUNIO0FBRUQ7Ozs7OzJCQUNvQjtBQUNoQixVQUFNSixTQUFTLEdBQUcsS0FBS0EsU0FBdkI7QUFDQSxVQUFNSyxPQUFPLEdBQUdMLFNBQVMs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U0FBdkI7QUFDQSxVQUFNSyxPQUFPLEdBQUdMLFNBQVMsQ0FBQ0ssT0FBMUI7QUFFQSxXQUFLSixLQUFMLENBQVcyQyxNQUFYLENBQWtCLENBQWxCLEVBQXFCUixFQUFyQjs7QUFFQSxVQUFJLENBQUMvQixPQUFPLENBQUNZLFNBQVIsQ0FBa0JPLElBQWxCLENBQXVCakIsTUFBNUIsRUFBb0M7QUFDaEMsYUFBSzJCLElBQUwsQ0FBVSxDQUFWO0FBQ0g7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge0NvbnRhaW5lcn0gZnJvbSBcIi4vQ29udGFpbmVyXCI7XG5pbXBvcnQge0lDb29yZGluYXRlc30gZnJvbSBcIi4uL0ludGVyZmFjZXMvSUNvb3JkaW5hdGVzXCI7XG5pbXBvcnQge0lNb3VzZURhdGF9IGZyb20gXCIuLi9JbnRlcmZhY2VzL0lNb3VzZURhdGFcIjtcbmltcG9ydCB7SVJnYn0gZnJvbSBcIi4uL0ludGVyZmFjZXMvSVJnYlwiO1xuaW1wb3J0IHtQYXJ0aWNsZX0gZnJvbSBcIi4vUGFydGljbGVcIjtcbmltcG9ydCB7UG9seWdvbk1hc2tUeXBlfSBmcm9tIFwiLi4vRW51bXMvUG9seWdvbk1hc2tUeXBlXCI7XG5pbXBvcnQge1BvbHlnb25NYXNrSW5saW5lQXJyYW5nZW1lbnR9IGZyb20gXCIuLi9FbnVtcy9Qb2x5Z29uTWFza0lubGluZUFycmFuZ2VtZW50XCI7XG5cbi8qKlxuICogUGFydGljbGVzIG1hbmFnZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFBhcnRpY2xlcyB7XG4gICAgcHVibGljIGFycmF5OiBQYXJ0aWNsZVtdO1xuICAgIHB1YmxpYyBwdXNoaW5nPzogYm9vbGVhbjtcbiAgICBwdWJsaWMgbGluZUxpbmtlZENvbG9yPzogSVJnYiB8IHN0cmluZyB8IG51bGw7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRhaW5lcjogQ29udGFpbmVyO1xuICAgIHByaXZhdGUgaW50ZXJhY3Rpb25zRW5hYmxlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmFycmF5ID0gW107XG4gICAgICAgIHRoaXMuaW50ZXJhY3Rpb25zRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLSB0c1BhcnRpY2xlcyBmdW5jdGlvbnMgLSBwYXJ0aWNsZXMgLS0tLS0tLS0tLS0gKi9cbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIub3B0aW9ucztcblxuICAgICAgICBpZiAob3B0aW9ucy5wb2x5Z29uLmVuYWJsZSAmJiBvcHRpb25zLnBvbHlnb24udHlwZSA9PT0gUG9seWdvbk1hc2tUeXBlLmlubGluZSAmJlxuICAgICAgICAgICAgb3B0aW9ucy5wb2x5Z29uLmlubGluZS5hcnJhbmdlbWVudCA9PT0gUG9seWdvbk1hc2tJbmxpbmVBcnJhbmdlbWVudC5vbmVQZXJQb2ludCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnBvbHlnb24uZHJhd1BvaW50c09uUG9seWdvblBhdGgoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmFycmF5Lmxlbmd0aDsgaSA8IG9wdGlvbnMucGFydGljbGVzLm51bWJlci52YWx1ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcCA9IG5ldyBQYXJ0aWNsZShjb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheS5wdXNoKHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnRlcmFjdGlvbnNFbmFibGVkID0gb3B0aW9ucy5wYXJ0aWNsZXMubGluZUxpbmtlZC5lbmFibGUgfHxcbiAgICAgICAgICAgIG9wdGlvbnMucGFydGljbGVzLm1vdmUuYXR0cmFjdC5lbmFibGUgfHxcbiAgICAgICAgICAgIG9wdGlvbnMucGFydGljbGVzLm1vdmUuY29sbGlzaW9ucztcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvKiB0aGUgcGFydGljbGUgKi9cbiAgICAgICAgICAgIGNvbnN0IHAgPSB0aGlzLmFycmF5W2ldO1xuXG4gICAgICAgICAgICAvLyBsZXQgZCA9ICggZHggPSBjb250YWluZXIuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja19wb3NfeCAtIHAueCApICogZHggK1xuICAgICAgICAgICAgLy8gICAgICAgICAoIGR5ID0gY29udGFpbmVyLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tfcG9zX3kgLSBwLnkgKSAqIGR5O1xuICAgICAgICAgICAgLy8gbGV0IGYgPSAtQkFOR19TSVpFIC8gZDtcbiAgICAgICAgICAgIC8vIGlmICggZCA8IEJBTkdfU0laRSApIHtcbiAgICAgICAgICAgIC8vICAgICBsZXQgdCA9IE1hdGguYXRhbjIoIGR5LCBkeCApO1xuICAgICAgICAgICAgLy8gICAgIHAudnggPSBmICogTWF0aC5jb3ModCk7XG4gICAgICAgICAgICAvLyAgICAgcC52eSA9IGYgKiBNYXRoLnNpbih0KTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgcC51cGRhdGUoaSwgZGVsdGEpO1xuXG4gICAgICAgICAgICAvKiBpbnRlcmFjdGlvbiBhdXRvIGJldHdlZW4gcGFydGljbGVzICovXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGlvbnNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgdGhpcy5hcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwMiA9IHRoaXMuYXJyYXlbal07XG5cbiAgICAgICAgICAgICAgICAgICAgcC5pbnRlcmFjdChwMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXcoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRhaW5lci5vcHRpb25zO1xuXG4gICAgICAgIC8qIGNsZWFyIGNhbnZhcyAqL1xuICAgICAgICBjb250YWluZXIuY2FudmFzLmNsZWFyKCk7XG5cbiAgICAgICAgLyogdXBkYXRlIGVhY2ggcGFydGljbGVzIHBhcmFtICovXG4gICAgICAgIHRoaXMudXBkYXRlKGRlbHRhKTtcblxuICAgICAgICAvKiBkcmF3IHBvbHlnb24gc2hhcGUgaW4gZGVidWcgbW9kZSAqL1xuICAgICAgICBpZiAob3B0aW9ucy5wb2x5Z29uLmVuYWJsZSAmJiBvcHRpb25zLnBvbHlnb24uZHJhdy5lbmFibGUpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5wb2x5Z29uLmRyYXdQb2x5Z29uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBkcmF3IGVhY2ggcGFydGljbGUgKi9cbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMuYXJyYXkpIHtcbiAgICAgICAgICAgIHAuZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFycmF5ID0gW107XG4gICAgfVxuXG4gICAgLyogLS0tLS0tLS0tLSB0c1BhcnRpY2xlcyBmdW5jdGlvbnMgLSBtb2RlcyBldmVudHMgLS0tLS0tLS0tLS0tICovXG4gICAgcHVibGljIHB1c2gobmI6IG51bWJlciwgbW91c2VQb3NpdGlvbj86IElNb3VzZURhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIub3B0aW9ucztcblxuICAgICAgICB0aGlzLnB1c2hpbmcgPSB0cnVlO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnBhcnRpY2xlcy5udW1iZXIubGltaXQgPiAwKSB7XG4gICAgICAgICAgICBpZiAoKHRoaXMuYXJyYXkubGVuZ3RoICsgbmIpID4gb3B0aW9ucy5wYXJ0aWNsZXMubnVtYmVyLmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKHRoaXMuYXJyYXkubGVuZ3RoICsgbmIpIC0gb3B0aW9ucy5wYXJ0aWNsZXMubnVtYmVyLmxpbWl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb3M6IElDb29yZGluYXRlcyB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAobW91c2VQb3NpdGlvbikge1xuICAgICAgICAgICAgcG9zID0gbW91c2VQb3NpdGlvbi5wb3NpdGlvbiB8fCB7eDogMCwgeTogMH07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5iOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBuZXcgUGFydGljbGUoY29udGFpbmVyLCBwb3MpO1xuXG4gICAgICAgICAgICB0aGlzLmFycmF5LnB1c2gocCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdGlvbnMucGFydGljbGVzLm1vdmUuZW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXcoMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKG5iOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250YWluZXIub3B0aW9ucztcblxuICAgICAgICB0aGlzLmFycmF5LnNwbGljZSgwLCBuYik7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3KDApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19