/**
 * p5play
 * @version 3.17
 * @author quinton-ashley
 * @license gpl-v3-only
 */
p5.prototype.registerMethod('init', function p5playInit() {
	if (typeof window.planck == 'undefined') {
		throw 'planck.js must be loaded before p5play';
	}

	const pInst = this;

	const pl = planck;
	const plScale = 60;

	// Google Analytics
	if (
		typeof window._p5play_gtagged == 'undefined' &&
		typeof process == 'undefined' // don't track in node.js
	) {
		let script = document.createElement('script');
		script.src = 'https://www.googletagmanager.com/gtag/js?id=G-EHXNCTSYLK';
		script.async = true;
		document.head.append(script);
		window._p5play_gtagged = true;

		script.onload = () => {
			window.dataLayer ??= [];
			window.gtag = function () {
				dataLayer.push(arguments);
			};
			gtag('js', new Date());
			gtag('config', 'G-EHXNCTSYLK');
			gtag('event', 'p5play_v3_14');
		};
	}

	// the p5play default angle mode is degrees
	this.angleMode('degrees');

	// scale to planck coordinates from p5 coordinates
	const scaleTo = (x, y, tileSize) => new pl.Vec2((x * tileSize) / plScale, (y * tileSize) / plScale);
	const scaleXTo = (x, tileSize) => (x * tileSize) / plScale;

	// scale from planck coordinates to p5 coordinates
	const scaleFrom = (x, y, tileSize) => new pl.Vec2((x / tileSize) * plScale, (y / tileSize) * plScale);
	const scaleXFrom = (x, tileSize) => (x / tileSize) * plScale;

	const isSlop = (val) => Math.abs(val) <= pl.Settings.linearSlop;
	const fixRound = (val) => (Math.abs(val - Math.round(val)) <= pl.Settings.linearSlop ? Math.round(val) : val);

	const eventTypes = {
		_collisions: ['_collides', '_colliding', '_collided'],
		_overlappers: ['_overlaps', '_overlapping', '_overlapped']
	};

	/**
	 * @class
	 */
	this.P5Play = class {
		/**
		 * This class is deleted after it's used
		 * to create the `p5play` object
		 * which contains information about the sketch.
		 */
		constructor() {
			/**
			 * Contains all the sprites in the sketch,
			 * but users should use the `allSprites` group.
			 *
			 * The keys are the sprite's unique ids.
			 * @type {Object.<number, Sprite>}
			 */
			this.sprites = {};
			/**
			 * Contains all the groups in the sketch,
			 *
			 * The keys are the group's unique ids.
			 * @type {Object.<number, Group>}
			 */
			this.groups = {};
			this.groupsCreated = 0;
			this.spritesCreated = 0;
			this.spritesDrawn = 0;

			/**
			 * Used for debugging, set to true to make p5play
			 * not load any images.
			 * @type {Boolean}
			 */
			this.disableImages = false;
			/**
			 * The default color palette, at index 0 of this array,
			 * has all the letters of the English alphabet mapped to colors.
			 * @type {Array}
			 */
			this.palettes = [];

			/**
			 * Set to the latest version of p5play v3's
			 * minor version number. For example to enable
			 * v3.16 features, set this to 16.
			 *
			 * Some features are not backwards compatible
			 * with older versions of p5play, so this
			 * variable is used to enable them.
			 */
			this.targetVersion = 0;

			this.os = {};
			this.context = 'web';
			if (window.matchMedia) this.hasMouse = window.matchMedia('(any-hover: none)').matches ? false : true;
			else this.hasMouse = true;
			this.standardizeKeyboard = false;

			this._renderStats = {};
			/*
			 * Ledgers for collision callback functions.
			 *
			 * Doing this:
			 * group1.collides(group2, cb1);
			 * sprite0.collides(sprite1, cb0);
			 *
			 * Would result in this:
			 * p5play._collides = {
			 *   1: {
			 *     2: cb1
			 *   },
			 *   1000: {
			 *     2: cb1,
			 *     1001: cb0
			 *   }
			 * };
			 */
			this._collides = {};
			this._colliding = {};
			this._collided = {};
			/*
			 * Ledgers for overlap callback functions.
			 */
			this._overlaps = {};
			this._overlapping = {};
			this._overlapped = {};
		}
	};

	/**
	 * Contains information about the sketch.
	 * @type {P5Play}
	 */
	this.p5play = new this.P5Play();
	delete this.P5Play;

	/**
	 * @typedef {Object} planck
	 * @typedef {Object} planck.Vec2
	 * @typedef {Object} planck.Body
	 * @typedef {Object} planck.Fixture
	 * @typedef {Object} planck.World
	 * @typedef {Object} planck.Contact
	 */

	/**
	 * Shortcut for console.log
	 * @type {Function}
	 * @param {...any} args
	 */
	const log = console.log; // shortcut
	this.log = console.log;

	/**
	 * @class
	 */
	this.Sprite = class {
		/**
		 * <a href="https://p5play.org/learn/sprite.html">
		 * Look at the Sprite reference pages before reading these docs.
		 * </a>
		 *
		 * The Sprite constructor can be used in many different ways.
		 *
		 * In fact it's so flexible that I've only listed out some of the
		 * most common ways it can be used in the examples section below.
		 * Try experimenting with it! It's likely to work the way you
		 * expect it to, if not you'll just get an error.
		 *
		 * Special feature! If the first parameter to this constructor is a
		 * loaded p5.Image, SpriteAnimation, or name of a SpriteAnimation,
		 * then the Sprite will be created with that animation. If the
		 * dimensions of the sprite are not given, then the Sprite will be
		 * created using the dimensions of the animation.
		 *
		 * Every sprite you create is added to the `allSprites`
		 * group and put on the top draw order layer, in front of all
		 * previously created sprites.
		 *
		 * @param {Number} [x] - horizontal position of the sprite
		 * @param {Number} [y] - vertical position of the sprite
		 * @param {Number} [w] - width of the placeholder rectangle and of
		 * the collider until an image or new collider are set. *OR* If height is not
		 * set then this parameter becomes the diameter of the placeholder circle.
		 * @param {Number} [h] - height of the placeholder rectangle and of the collider
		 * until an image or new collider are set
		 * @param {String} [collider] - collider type is 'dynamic' by default, can be
		 * 'static', 'kinematic', or 'none'
		 * @example
		 *
		 * let spr = new Sprite();
		 *
		 * let rectangle = new Sprite(x, y, width, height);
		 *
		 * let circle = new Sprite(x, y, diameter);
		 *
		 * let spr = new Sprite(aniName, x, y);
		 *
		 * let line = new Sprite(x, y, [length, angle]);
		 */
		constructor(x, y, w, h, collider) {
			this.p = pInst;

			// using boolean flags is faster than instanceof checks
			this._isSprite = true;

			/**
			 * Each sprite has a unique id number. Don't change it!
			 * They are useful for debugging.
			 * @type {Number}
			 */
			this.idNum;

			// id num is not set until the input params are validated

			let args = [...arguments];

			let group, ani;

			// first arg was a group to add the sprite to
			// used internally by the GroupSprite class
			if (args[0] !== undefined && args[0]._isGroup) {
				group = args[0];
				args = args.slice(1);
			}

			// first arg is a SpriteAnimation, animation name, or p5.Image
			if (
				args[0] !== undefined &&
				(typeof args[0] == 'string' || args[0] instanceof this.p.SpriteAnimation || args[0] instanceof p5.Image)
			) {
				// shift
				ani = args[0];
				args = args.slice(1);
			}

			// invalid
			if (args.length == 1 && typeof args[0] == 'number') {
				throw new FriendlyError('Sprite', 0, [args[0]]);
			}

			if (!Array.isArray(args[0])) {
				// valid use for creating a box collider:
				// new Sprite(x, y, w, h, colliderType)
				x = args[0];
				y = args[1];
				w = args[2];
				h = args[3];
				collider = args[4];
			} else {
				// valid use for creating chain/polygon using vertex mode:
				// new Sprite([[x1, y1], [x2, y2], ...], colliderType)
				x = undefined;
				y = undefined;
				w = args[0];
				h = undefined;
				collider = args[1];
				if (Array.isArray(collider)) {
					throw new FriendlyError('Sprite', 1, [`[[${w}], [${h}]]`]);
				}
			}

			// valid use without setting size:
			// new Sprite(x, y, colliderType)
			if (typeof w == 'string') {
				collider = w;
				w = undefined;
			}

			if (typeof h == 'string') {
				if (isColliderType(h)) {
					// valid use to create a circle:
					// new Sprite(x, y, d, colliderType)
					collider = h;
				} else {
					// valid use to create a regular polygon:
					// new Sprite(x, y, sideLength, polygonName)
					w = getRegularPolygon(w, h);
				}
				h = undefined;
			}

			this.idNum = this.p.p5play.spritesCreated;
			this._uid = 1000 + this.idNum;
			this.p.p5play.sprites[this._uid] = this;
			this.p.p5play.spritesCreated++;

			/**
			 * Groups the sprite belongs to, including allSprites
			 * @type {Group[]}
			 * @default [allSprites]
			 */
			this.groups = [];

			/**
			 * Keys are the animation label, values are SpriteAnimation objects.
			 * @type {SpriteAnimations}
			 */
			this.animations = new this.p.SpriteAnimations();

			/**
			 * Joints that the sprite is attached to
			 * @type {Joint[]}
			 * @default []
			 */
			this.joints = [];
			this.joints.removeAll = () => {
				for (let j of this.joints) {
					j.remove();
				}
			};

			/**
			 * If set to true, p5play will record all changes to the sprite's
			 * properties in its `mod` array. Intended to be used to enable
			 * online multiplayer.
			 * @type {Boolean}
			 * @default undefined
			 */
			this.watch;

			/**
			 * An Object that has sprite property number codes as keys,
			 * these correspond to the index of the property in the
			 * Sprite.props array. The booleans values this object stores,
			 * indicate which properties were changed since the last frame.
			 * Useful for limiting the amount of sprite data sent in binary
			 * netcode to only the sprite properties that have been modified.
			 * @type {Object}
			 */
			this.mod = {};

			this._removed = false;
			this._life = 2147483647;
			this._visible = true;
			this._pixelPerfect = false;
			this._aniChangeCount = 0;

			this._hasOverlap = {};
			this._collisions = {};
			this._overlappers = {};

			group ??= this.p.allSprites;

			/**
			 * The tile size is used to change the size of one unit of
			 * measurement for the sprite.
			 *
			 * For example, if the tile size is 16, then a sprite with
			 * x=1 and y=1 will be drawn at position (16, 16) on the canvas.
			 * @type {Number}
			 * @default 1
			 */
			this.tileSize = group.tileSize || 1;

			let _this = this;

			// this.x and this.y are getters and setters that change this._pos internally
			// this.pos and this.position get this._position
			this._position = {
				x: 0,
				y: 0
			};

			this._pos = pInst.createVector.call(pInst);

			Object.defineProperty(this._pos, 'x', {
				get() {
					if (!_this.body) return _this._position.x;
					let x = (_this.body.getPosition().x / _this.tileSize) * plScale;
					return fixRound(x);
				},
				set(val) {
					if (_this.body) {
						let pos = new pl.Vec2((val * _this.tileSize) / plScale, _this.body.getPosition().y);
						_this.body.setPosition(pos);
					}
					_this._position.x = val;
				}
			});

			Object.defineProperty(this._pos, 'y', {
				get() {
					if (!_this.body) return _this._position.y;
					let y = (_this.body.getPosition().y / _this.tileSize) * plScale;
					return fixRound(y);
				},
				set(val) {
					if (_this.body) {
						let pos = new pl.Vec2(_this.body.getPosition().x, (val * _this.tileSize) / plScale);
						_this.body.setPosition(pos);
					}
					_this._position.y = val;
				}
			});

			// used by this._vel if the Sprite has no physics body
			this._velocity = {
				x: 0,
				y: 0
			};

			// this._vel extends p5.Vector
			this._vel = pInst.createVector.call(pInst);

			Object.defineProperties(this._vel, {
				x: {
					get() {
						let val;
						if (_this.body) val = _this.body.getLinearVelocity().x;
						else val = _this._velocity.x;
						return fixRound(val / _this.tileSize);
					},
					set(val) {
						val *= _this.tileSize;
						if (_this.body) {
							_this.body.setLinearVelocity(new pl.Vec2(val, _this.body.getLinearVelocity().y));
						} else {
							_this._velocity.x = val;
						}
					}
				},
				y: {
					get() {
						let val;
						if (_this.body) val = _this.body.getLinearVelocity().y;
						else val = _this._velocity.y;
						return fixRound(val / _this.tileSize);
					},
					set(val) {
						val *= _this.tileSize;
						if (_this.body) {
							_this.body.setLinearVelocity(new pl.Vec2(_this.body.getLinearVelocity().x, val));
						} else {
							_this._velocity.y = val;
						}
					}
				}
			});

			this._mirror = {
				_x: 1,
				_y: 1,
				get x() {
					return this._x < 0;
				},
				set x(val) {
					if (_this.watch) _this.mod[22] = true;
					this._x = val ? -1 : 1;
				},
				get y() {
					return this._y < 0;
				},
				set y(val) {
					if (_this.watch) _this.mod[22] = true;
					this._y = val ? -1 : 1;
				}
			};

			this._heading = 'right';

			this._layer = group._layer;
			this._layer ??= this.p.allSprites._getTopLayer() + 1;

			if (group.dynamic) collider ??= 'dynamic';
			if (group.kinematic) collider ??= 'kinematic';
			if (group.static) collider ??= 'static';
			collider ??= group.collider;

			if (!collider || typeof collider != 'string') {
				collider = 'dynamic';
			}
			this.collider = collider;

			x ??= group.x;
			if (x === undefined) {
				x = this.p.width / this.tileSize / 2;
				if (w) this._vertexMode = true;
			}
			y ??= group.y;
			if (y === undefined) {
				y = this.p.height / this.tileSize / 2;
			}

			let forcedBoxShape = false;
			if (w === undefined) {
				w = group.w || group.width || group.d || group.diameter || group.v || group.vertices;
				if (!h && !group.d && !group.diameter) {
					h = group.h || group.height;
					forcedBoxShape = true;
				}
			}

			if (typeof x == 'function') x = x(group.length);
			if (typeof y == 'function') y = y(group.length);
			if (typeof w == 'function') w = w(group.length);
			if (typeof h == 'function') h = h(group.length);

			this.x = x;
			this.y = y;

			if (!group._isAllSpritesGroup) {
				if (!ani) {
					for (let _ani in group.animations) {
						ani = _ani;
						break;
					}
				}
			}

			// temporarily add all the groups the sprite belongs to,
			// since the next section of code could potentially load an
			// animation from one of the sprite's groups
			for (let g = group; g; g = this.p.p5play.groups[g.parent]) {
				this.groups.push(g);
			}
			this.groups.reverse();

			if (ani) {
				if (ani instanceof p5.Image) {
					this.addAni(ani);
				} else {
					if (typeof ani == 'string') this._changeAni(ani);
					else this._ani = ani.clone();
				}
				let ts = this.tileSize;
				if (!w && (this._ani.w != 1 || this._ani.h != 1)) {
					w = this._ani.w / ts;
					h ??= this._ani.h / ts;
				}
			}

			// make groups list empty, the sprite will be "officially" added
			// to its groups after its collider is potentially created
			this.groups = [];

			/**
			 * Used to detect mouse events with the sprite.
			 * @type {_SpriteMouse}
			 */
			this.mouse = new this.p._SpriteMouse();

			this._angle = 0;
			this._rotationSpeed = 0;
			this._bearing = 0;

			this._scale = new Scale();

			Object.defineProperty(this._scale, 'x', {
				get() {
					return this._x;
				},
				set(val) {
					if (val == this._x) return;
					if (_this.watch) _this.mod[28] = true;
					let scalarX = val / this._x;
					_this._w *= scalarX;
					_this._hw *= scalarX;
					_this._resizeColliders({ x: scalarX, y: 1 });
					this._x = val;
					this._avg = (this._x + this._y) * 0.5;
				}
			});

			Object.defineProperty(this._scale, 'y', {
				get() {
					return this._y;
				},
				set(val) {
					if (val == this._y) return;
					if (_this.watch) _this.mod[28] = true;
					let scalarY = val / this._y;
					if (_this._h) {
						this._h *= scalarY;
						this._hh *= scalarY;
					}
					_this._resizeColliders({ x: 1, y: scalarY });
					this._y = val;
					this._avg = (this._x + this._y) * 0.5;
				}
			});

			this._offset = {
				_x: 0,
				_y: 0,
				get x() {
					return this._x;
				},
				set x(val) {
					if (val == this._x) return;
					if (_this.watch) _this.mod[23] = true;
					_this._offsetCenterBy(val - this._x, 0);
				},
				get y() {
					return this._y;
				},
				set y(val) {
					if (val == this._y) return;
					if (_this.watch) _this.mod[23] = true;
					_this._offsetCenterBy(0, val - this._y);
				}
			};

			this._massUndef = true;
			if (w === undefined) {
				this._dimensionsUndef = true;
				this._widthUndef = true;
				w = this.tileSize > 1 ? 1 : 50;
				if (h === undefined) this._heightUndef = true;
			}

			if (forcedBoxShape) h ??= this.tileSize > 1 ? 1 : 50;

			this._shape = group.shape;

			// if collider is not "none"
			if (this.__collider != 3) {
				if (this._vertexMode) this.addCollider(w);
				else this.addCollider(0, 0, w, h);
				this.shape = this._shape;
			} else {
				this.w = w;
				if (Array.isArray(w)) {
					throw new Error(
						'Cannot set the collider type of a sprite with a polygon or chain shape to "none". To achieve the same effect, use .overlaps(allSprites) to have your sprite overlap with the allSprites group.'
					);
				}
				if (w !== undefined && h === undefined) this.shape = 'circle';
				else {
					this.shape = 'box';
					this.h = h;
				}
			}

			/**
			 * The sprite's position on the previous frame.
			 * @type {object}
			 */
			this.prevPos = { x, y };
			this.prevRotation = 0;

			this._dest = { x, y };
			this._destIdx = 0;
			this.drag = 0;

			/**
			 * When the sprite.debug property is set to true, the collider
			 * shapes will be drawn as bright green outlines with crosshairs
			 * at the center of the sprite.
			 *
			 * When the sprite.debug property is set to 'colliders', only the
			 * collider shapes will be drawn.
			 * @type {boolean|string}
			 * @default false
			 */
			this.debug = false;

			if (!group._isAllSpritesGroup) this.p.allSprites.push(this);
			group.push(this);

			let gvx = group.vel.x || 0;
			let gvy = group.vel.y || 0;
			if (typeof gvx == 'function') gvx = gvx(group.length - 1);
			if (typeof gvy == 'function') gvy = gvy(group.length - 1);
			this.vel.x = gvx;
			this.vel.y = gvy;

			// skip these properties
			let skipProps = [
				'ani',
				'collider',
				'x',
				'y',
				'w',
				'h',
				'd',
				'diameter',
				'dynamic',
				'height',
				'kinematic',
				'static',
				'vel',
				'width'
			];

			// inherit properties from group in the order they were added
			// skip props that were already set above
			for (let prop of this.p.Sprite.propsAll) {
				if (skipProps.includes(prop)) continue;
				let val = group[prop];
				if (val === undefined) continue;
				if (typeof val == 'function' && isArrowFunction(val)) {
					val = val(group.length - 1);
				}
				if (typeof val == 'object') {
					this[prop] = Object.assign({}, val);
				} else {
					this[prop] = val;
				}
			}

			skipProps = [
				'add',
				'animation',
				'animations',
				'autoCull',
				'contains',
				'GroupSprite',
				'Group',
				'idNum',
				'length',
				'mod',
				'mouse',
				'p',
				'parent',
				'Sprite',
				'Subgroup',
				'subgroups',
				'velocity'
			];

			for (let i = 0; i < this.groups.length; i++) {
				let g = this.groups[i];
				let props = Object.keys(g);
				for (let prop of props) {
					if (!isNaN(prop) || prop[0] == '_' || skipProps.includes(prop) || this.p.Sprite.propsAll.includes(prop)) {
						continue;
					}
					let val = g[prop];
					if (val === undefined) continue;
					if (typeof val == 'function' && isArrowFunction(val)) {
						val = val(g.length - 1);
					}
					if (typeof val == 'object') {
						this[prop] = Object.assign({}, val);
					} else {
						this[prop] = val;
					}
				}
			}

			// "random" color that's not too dark or too light
			this.color ??= this.p.color(
				Math.round(this.p.random(30, 245)),
				Math.round(this.p.random(30, 245)),
				Math.round(this.p.random(30, 245))
			);

			this._textFill ??= this.p.color(0);
			this._textSize ??= this.tileSize == 1 ? (this.p.canvas ? this.p.textSize() : 12) : 0.8;
		}

		/**
		 * Adds a collider (fixture) to the sprite's physics body.
		 *
		 * It accepts parameters in a similar format to the Sprite
		 * constructor except the first two parameters are x and y offsets,
		 * the distance new collider should be from the center of the sprite.
		 *
		 * This function also recalculates the sprite's mass based on its
		 * new size.
		 *
		 * One limitation of the current implementation is that sprites
		 * with multiple colliders can't have their collider
		 * type changed without losing every collider added to the
		 * sprite besides the first.
		 *
		 * @param {Number} offsetX distance from the center of the sprite
		 * @param {Number} offsetY distance from the center of the sprite
		 * @param {Number} w width of the collider
		 * @param {Number} h height of the collider
		 */
		addCollider(offsetX, offsetY, w, h) {
			if (this._removed) {
				console.error("Can't add colliders to a sprite that was removed.");
				return;
			}
			if (this.__collider == 3) {
				this._collider = 'dynamic';
				this.__collider = 0;
			}
			let props = {};
			props.shape = this._parseShape(...arguments);
			if (props.shape.m_type == 'chain') {
				props.density = 0;
				props.restitution = 0;
			}
			props.density ??= this.density || 5;
			props.friction ??= this.friction || 0.5;
			props.restitution ??= this.bounciness || 0.2;

			if (!this.body) {
				this.body = this.p.world.createBody({
					position: scaleTo(this.x, this.y, this.tileSize),
					type: this.collider
				});
				this.body.sprite = this;
			} else this.body.m_gravityScale ||= 1;
			this.body.createFixture(props);
			this.resetMass();
		}

		/**
		 * Adds a sensor to the sprite's physics body.
		 *
		 * Sensors can't displace or be displaced by colliders.
		 * Sensors don't have any mass or other physical properties.
		 * Sensors simply detect overlaps with other sensors.
		 *
		 * This function accepts parameters in a similar format to the Sprite
		 * constructor except the first two parameters are x and y offsets,
		 * the relative distance the new sensor should be from the center of
		 * the sprite.
		 *
		 * If a sensor is added to a sprite that has no collider (type "none")
		 * then internally it will be given a dynamic physics body that isn't
		 * affected by gravity so that the sensor can be added to it.
		 *
		 * @param {Number} offsetX distance from the center of the sprite
		 * @param {Number} offsetY distance from the center of the sprite
		 * @param {Number} w width of the collider
		 * @param {Number} h height of the collider
		 */
		addSensor(offsetX, offsetY, w, h) {
			if (this._removed) {
				console.error("Can't add sensors to a sprite that was removed.");
				return;
			}
			let s = this._parseShape(...arguments);
			if (!this.body) {
				this.body = this.p.world.createBody({
					position: scaleTo(this.x, this.y, this.tileSize),
					type: 'dynamic',
					gravityScale: 0
				});
				this.body.sprite = this;
				this.mass = 0;
				this._massUndef = true;
				this.rotation = this._angle;
				this.vel = this._velocity;
			}
			this.body.createFixture({
				shape: s,
				isSensor: true
			});
			this._sortFixtures();
			this._hasSensors = true;
		}

		_parseShape(offsetX, offsetY, w, h) {
			let args = [...arguments];
			let path, shape;

			if (args.length == 0) {
				offsetX = 0;
				offsetY = 0;
				w = this._w;
				h = this._h;
			} else if (args.length <= 2) {
				offsetX = 0;
				offsetY = 0;
				w = args[0];
				h = args[1];
				this._vertexMode = true;
			}

			let dimensions;

			// if (w is vertex array) or (side length and h is a
			// collider type or the name of a regular polygon)
			if (Array.isArray(w) || typeof h == 'string') {
				if (!isNaN(w)) w = Number(w);
				if (typeof w != 'number' && Array.isArray(w[0])) {
					this._originMode ??= 'start';
				}
				if (typeof h == 'string') {
					path = getRegularPolygon(w, h);
					h = undefined;
				} else {
					path = w;
				}
			} else {
				if (w !== undefined && h === undefined) {
					shape = 'circle';
				} else {
					shape = 'box';
				}
				w ??= this.tileSize > 1 ? 1 : 50;
				h ??= w;

				// the actual dimensions of the collider for a box or circle are a
				// little bit smaller so that they can slid past each other
				// when in a tile grid
				dimensions = scaleTo(w - 0.08, h - 0.08, this.tileSize);
			}

			let s;
			if (shape == 'box') {
				s = pl.Box(dimensions.x / 2, dimensions.y / 2, scaleTo(offsetX, offsetY, this.tileSize), 0);
			} else if (shape == 'circle') {
				s = pl.Circle(scaleTo(offsetX, offsetY, this.tileSize), dimensions.x / 2);
			} else if (path) {
				let vecs = [{ x: 0, y: 0 }];
				let vert = { x: 0, y: 0 };
				let min = { x: 0, y: 0 };
				let max = { x: 0, y: 0 };

				// if the path is an array of position arrays
				let usesVertices = Array.isArray(path[0]);

				function checkVert() {
					if (vert.x < min.x) min.x = vert.x;
					if (vert.y < min.y) min.y = vert.y;
					if (vert.x > max.x) max.x = vert.x;
					if (vert.y > max.y) max.y = vert.y;
				}

				let x, y;
				if (usesVertices) {
					if (this._vertexMode) {
						x = path[0][0];
						y = path[0][1];
						// log(x, y);
						if (!this.fixture || !this._relativeOrigin) {
							this.x = x;
							this.y = y;
						} else {
							x = this.x - this._relativeOrigin.x;
							y = this.y - this._relativeOrigin.y;
							vecs.pop();
						}
					}
					for (let i = 0; i < path.length; i++) {
						if (this._vertexMode) {
							if (i == 0 && !this.fixture) continue;
							// verts are relative to the first vert
							vert.x = path[i][0] - x;
							vert.y = path[i][1] - y;
						} else {
							vert.x += path[i][0];
							vert.y += path[i][1];
						}
						vecs.push({ x: vert.x, y: vert.y });

						checkVert();
					}
				} else {
					let rep = 1;
					if (path.length % 2) rep = path[path.length - 1];
					let mod = rep > 0 ? 1 : -1;
					rep = Math.abs(rep);
					let ang = 0;
					for (let i = 0; i < rep; i++) {
						for (let j = 0; j < path.length - 1; j += 2) {
							let len = path[j];
							ang += path[j + 1];
							vert.x += len * this.p.cos(ang);
							vert.y += len * this.p.sin(ang);
							vecs.push({ x: vert.x, y: vert.y });

							checkVert();
						}
						ang *= mod;
					}
				}

				let isConvex = false;
				if (
					isSlop(Math.abs(vecs[0].x) - Math.abs(vecs[vecs.length - 1].x)) &&
					isSlop(Math.abs(vecs[0].y) - Math.abs(vecs[vecs.length - 1].y))
				) {
					if (this._shape != 'chain') shape = 'polygon';
					else shape = 'chain';
					this._originMode = 'center';
					if (this._isConvexPoly(vecs.slice(0, -1))) isConvex = true;
				} else {
					shape = 'chain';
				}

				w = max.x - min.x;
				this._hw = w * 0.5;
				h = max.y - min.y;
				this._hh = h * 0.5;

				if (this._originMode == 'start') {
					for (let i = 0; i < vecs.length; i++) {
						vecs[i] = scaleTo(vecs[i].x, vecs[i].y, this.tileSize);
					}
				} else {
					// the center relative to the first vertex
					let centerX = 0;
					let centerY = 0;
					// use centroid of a triangle method to get center
					// average of all vertices
					let sumX = 0;
					let sumY = 0;

					let vl = vecs.length;
					// last vertex is same as first
					if (shape == 'polygon' || isConvex) vl--;
					for (let i = 0; i < vl; i++) {
						sumX += vecs[i].x;
						sumY += vecs[i].y;
					}
					centerX = sumX / vl;
					centerY = sumY / vl;

					if (!this.fixture) {
						this._relativeOrigin = { x: centerX, y: centerY };
					}

					if (this._vertexMode && usesVertices) {
						if (!this.fixture) {
							// repositions the sprite's x, y coordinates
							// to be in the center of the shape
							this.x += centerX;
							this.y += centerY;
						} else {
							centerX = this._relativeOrigin.x;
							centerY = this._relativeOrigin.y;
						}
					}

					for (let i = 0; i < vecs.length; i++) {
						let vec = vecs[i];
						vecs[i] = scaleTo(vec.x + offsetX - centerX, vec.y + offsetY - centerY, this.tileSize);
					}
				}

				if (!isConvex || vecs.length - 1 > pl.Settings.maxPolygonVertices || this._shape == 'chain') {
					shape = 'chain';
				}

				if (shape == 'polygon') {
					s = pl.Polygon(vecs);
				} else if (shape == 'chain') {
					s = pl.Chain(vecs, false);
				}
			}
			this.shape ??= shape;
			this._w = w;
			this._hw = w * 0.5;
			if (this.__shape != 1) {
				this._h = h;
				this._hh = h * 0.5;
			}
			return s;
		}

		/**
		 * Removes the physics body colliders from the sprite but not
		 * overlap sensors.
		 */
		removeColliders() {
			if (!this.body) return;
			this._removeContacts(0);
			this._removeFixtures(0);
		}

		/**
		 * Removes overlap sensors from the sprite.
		 */
		removeSensors() {
			if (!this.body) return;
			this._removeContacts(1);
			this._removeFixtures(1);
			this._hasSensors = false;
		}

		/*
		 * removes sensors or colliders or both
		 * @param type can be undefined, 0, or 1
		 * undefined removes both
		 * 0 removes colliders
		 * 1 removes sensors
		 */
		_removeFixtures(type) {
			let prevFxt;
			for (let fxt = this.fixtureList; fxt; fxt = fxt.getNext()) {
				if (type === undefined || fxt.m_isSensor == type) {
					let _fxt = fxt.m_next;
					fxt.destroyProxies(this.p.world.m_broadPhase);
					if (!prevFxt) {
						this.body.m_fixtureList = _fxt;
					} else {
						prevFxt.m_next = _fxt;
					}
				} else {
					prevFxt = fxt;
				}
			}
		}

		/*
		 * Removes contacts
		 * @param type can be undefined, 0, or 1
		 * undefined removes both
		 * 0 removes colliders
		 * 1 removes sensors
		 */
		_removeContacts(type) {
			if (!this.body) return;
			let ce = this.body.m_contactList;
			while (ce) {
				let con = ce.contact;
				ce = ce.next;
				if (type === undefined || con.m_fixtureA.m_isSensor == type) {
					this.p.world.destroyContact(con);
				}
			}
		}

		_offsetCenterBy(x, y) {
			if (!x && !y) return;

			this._offset._x += x;
			this._offset._y += y;

			if (!this.body) return;

			let off = scaleTo(x, y, this.tileSize);
			for (let fxt = this.body.m_fixtureList; fxt; fxt = fxt.m_next) {
				let shape = fxt.m_shape;
				if (shape.m_type != 'circle') {
					let vertices = shape.m_vertices;
					for (let v of vertices) {
						v.x += off.x;
						v.y += off.y;
					}
				} else {
					shape.m_p.x += off.x;
					shape.m_p.y += off.y;
				}
			}
		}

		/*
		 * Clones the collider's props to be transferred to a new collider.
		 */
		_cloneBodyProps() {
			let body = {};
			let props = [
				'bounciness',
				'density',
				'drag',
				'friction',
				'heading',
				'isSuperFast',
				'rotation',
				'rotationDrag',
				'rotationLock',
				'rotationSpeed',
				'scale',
				'vel',
				'x',
				'y'
			];
			// if mass or dimensions were defined by the user,
			// then the mass setting should be copied to the new body
			// else the new body's mass should be calculated based
			// on its dimensions
			if (!this._massUndef || !this._dimensionsUndef) {
				props.push('mass');
			}
			for (let prop of props) {
				if (typeof this[prop] == 'object') {
					body[prop] = Object.assign({}, this[prop]);
				} else {
					body[prop] = this[prop];
				}
			}
			return body;
		}

		/**
		 * Reference to the sprite's current animation.
		 * @type {SpriteAnimation}
		 */
		get animation() {
			return this._ani;
		}
		set animation(val) {
			this.changeAni(val);
		}

		/**
		 * Reference to the sprite's current animation.
		 * @type {SpriteAnimation}
		 */
		get ani() {
			return this._ani;
		}
		set ani(val) {
			this.changeAni(val);
		}

		/**
		 * Keys are the animation label, values are SpriteAnimation objects
		 * @type {SpriteAnimations}
		 */
		get anis() {
			return this.animations;
		}

		/**
		 * autoDraw is a property of all groups that controls whether
		 * a group is automatically drawn to the screen after the end
		 * of each draw cycle.
		 *
		 * It only needs to be set to false once and then it will
		 * remain false for the rest of the sketch, unless changed.
		 * @type {Boolean}
		 * @default true
		 */
		get autoDraw() {
			return this._autoDraw;
		}
		set autoDraw(val) {
			if (this.watch) this.mod[6] = true;
			this._autoDraw = val;
		}

		/**
		 * This property disables the ability for a sprite to "sleep".
		 *
		 * "Sleeping" sprites are not included in the physics simulation, a
		 * sprite starts "sleeping" when it stops moving and doesn't collide
		 * with anything that it wasn't already touching.
		 * @type {Boolean}
		 * @default true
		 */
		get allowSleeping() {
			return this.body?.isSleepingAllowed();
		}

		set allowSleeping(val) {
			if (this.watch) this.mod[7] = true;
			if (this.body) this.body.setSleepingAllowed(val);
		}

		/**
		 * autoUpdate is a property of all groups that controls whether
		 * a group is automatically updated after the end of each draw
		 * cycle.
		 *
		 * It only needs to be set to false once and then it will
		 * remain false for the rest of the sketch, unless changed.
		 * @type {Boolean}
		 * @default true
		 */
		get autoUpdate() {
			return this._autoUpdate;
		}
		set autoUpdate(val) {
			if (this.watch) this.mod[8] = true;
			this._autoUpdate = val;
		}

		/**
		 * The bounciness of the sprite's physics body.
		 * @type {Number}
		 * @default 0.2
		 */
		get bounciness() {
			if (!this.fixture) return;
			return this.fixture.getRestitution();
		}
		set bounciness(val) {
			if (this.watch) this.mod[9] = true;
			for (let fxt = this.fixtureList; fxt; fxt = fxt.getNext()) {
				fxt.setRestitution(val);
			}
		}

		/**
		 * The center of mass of the sprite's physics body.
		 * @type {p5.Vector}
		 */
		get centerOfMass() {
			let center = this.body.getWorldCenter();
			let v = scaleFrom(center.x, center.y, this.tileSize);
			return this.p.createVector(v.x, v.y);
		}

		/**
		 * The sprite's collider type. Default is "dynamic".
		 *
		 * The collider type can be one of the following strings:
		 * "dynamic", "static", "kinematic", "none".
		 *
		 * Sprites can't have their collider type
		 * set to "none" if they have a polygon or chain collider,
		 * multiple colliders, or multiple sensors.
		 *
		 * To achieve the same effect as setting collider type
		 * to "none", use `.overlaps(allSprites)` to have your
		 * sprite overlap with all sprites.
		 *
		 * @type {String}
		 * @default 'dynamic'
		 */
		get collider() {
			return this._collider;
		}
		set collider(val) {
			if (val == this._collider) return;

			val = val.toLowerCase();
			let c = val[0];
			if (c == 'd') val = 'dynamic';
			if (c == 's') val = 'static';
			if (c == 'k') val = 'kinematic';
			if (c == 'n') val = 'none';

			if (val == this._collider) return;

			if (val == 'none' && (this._shape == 'chain' || this._shape == 'polygon')) {
				console.error(
					'Cannot set the collider type of a polygon or chain collider to "none". To achieve the same effect, use .overlaps(allSprites) to have your sprite overlap with the allSprites group.'
				);
				return;
			}

			if (this._removed) {
				throw new Error('Cannot change the collider type of a sprite that was removed.');
			}

			let oldCollider = this.__collider;

			this._collider = val;
			this.__collider = ['d', 's', 'k', 'n'].indexOf(c);

			if (this.watch) this.mod[10] = true;

			if (oldCollider === undefined) return;

			if (this.__collider != 3) {
				if (this.body) this.body.setType(val);
				if (oldCollider == 3) this.addCollider();
			} else {
				this.removeColliders();
				if (this.fixture?.m_isSensor) this.body.m_gravityScale = 0;
				else this.p.world.destroyBody(this.body);
			}
		}

		_parseColor(val) {
			// false if object was copied with Object.assign
			if (val instanceof p5.Color) {
				return val;
			} else if (typeof val != 'object') {
				if (typeof val == 'string' && val.length == 1) {
					return this.p.colorPal(val);
				} else {
					return this.p.color(val);
				}
			}
			if (val.levels) return this.p.color(...val.levels);
			// support for Q5.Color
			if (val._r !== undefined) return this.p.color(val._r, val._g, val._b, val._a * 255);
			if (val._h !== undefined) return this.p.color(val._h, val._s, val._v, val._a * 255);
			throw new Error('Invalid color');
		}

		/**
		 * The sprite's current color. By default sprites get a random color.
		 * @type {p5.Color}
		 * @default random color
		 */
		get color() {
			return this._color;
		}
		set color(val) {
			// TODO: check if the color is the same as the current color
			if (this.watch) this.mod[11] = true;
			this._color = this._parseColor(val);
		}
		/**
		 * Alias for color. colour is the British English spelling.
		 * @type {p5.Color}
		 * @default random color
		 */
		get colour() {
			return this._color;
		}
		set colour(val) {
			this.color = val;
		}

		/**
		 * Alias for sprite.fillColor
		 * @type {p5.Color}
		 * @default random color
		 */
		get fill() {
			return this._color;
		}
		set fill(val) {
			this.color = val;
		}

		/**
		 * Alias for sprite.color
		 * @type {p5.Color}
		 * @default random color
		 */
		get fillColor() {
			return this._color;
		}
		set fillColor(val) {
			this.color = val;
		}

		/**
		 * Alias for sprite.strokeColor
		 * @type {p5.Color}
		 */
		get stroke() {
			return this._stroke;
		}
		set stroke(val) {
			if (this.watch) this.mod[31] = true;
			this._stroke = this._parseColor(val);
		}

		/**
		 * Overrides sprite's stroke color. By default the stroke of a sprite
		 * is determined by its collider type, which can also be overridden by the
		 * sketch's stroke color.
		 * @type {p5.Color}
		 */
		get strokeColor() {
			return this._stroke;
		}
		set strokeColor(val) {
			this.stroke = val;
		}

		/**
		 * The sprite's stroke weight, the thickness of its outline.
		 * @type {Number}
		 * @default undefined
		 */
		get strokeWeight() {
			return this._strokeWeight;
		}
		set strokeWeight(val) {
			if (this.watch) this.mod[32] = true;
			this._strokeWeight = val;
		}

		/**
		 * The sprite's text fill color. Black by default.
		 * @type {p5.Color}
		 * @default black (#000000)
		 */
		get textColor() {
			return this._textFill;
		}
		set textColor(val) {
			if (this.watch) this.mod[34] = true;
			this._textFill = this._parseColor(val);
		}
		get textColour() {
			return this._textFill;
		}
		set textColour(val) {
			this.textColor = val;
		}
		/**
		 * The sprite's text fill color. Black by default.
		 * @type {p5.Color}
		 * @default black (#000000)
		 */
		get textFill() {
			return this._textFill;
		}
		set textFill(val) {
			this.textColor = val;
		}

		/**
		 * The sprite's text size, the sketch's current textSize by default.
		 * @type {Number}
		 */
		get textSize() {
			return this._textSize;
		}
		set textSize(val) {
			if (this.watch) this.mod[40] = true;
			this._textSize = val;
		}

		/**
		 * The sprite's text stroke color.
		 * No stroke by default, does not inherit from the sketch's stroke color.
		 * @type {p5.Color}
		 * @default undefined
		 */
		get textStroke() {
			return this._textStroke;
		}
		set textStroke(val) {
			if (this.watch) this.mod[41] = true;
			this._textStroke = this._parseColor(val);
		}

		/**
		 * The sprite's text stroke weight, the thickness of its outline.
		 * No stroke by default, does not inherit from the sketch's stroke weight.
		 * @type {Number}
		 * @default undefined
		 */
		get textStrokeWeight() {
			return this._textStrokeWeight;
		}
		set textStrokeWeight(val) {
			if (this.watch) this.mod[42] = true;
			this._textStrokeWeight = val;
		}

		/**
		 * A bearing indicates the direction that needs to be followed to
		 * reach a destination. Setting a sprite's bearing doesn't do
		 * anything by itself. You can apply a force at the sprite's
		 * bearing angle using the `applyForce` function.
		 * @type {Number}
		 * @example
		 * sprite.bearing = angle;
		 * sprite.applyForce(amount);
		 */
		get bearing() {
			return this._bearing;
		}
		set bearing(val) {
			if (this.watch) this.mod[39] = true;
			this._bearing = val;
		}

		/**
		 * If true, an outline of the sprite's collider will be drawn.
		 * @type {Boolean}
		 * @default false
		 */
		get debug() {
			return this._debug;
		}
		set debug(val) {
			if (this.watch) this.mod[12] = true;
			this._debug = val;
		}

		/**
		 * The density of the sprite's physics body.
		 * @type {Number}
		 * @default 5
		 */
		get density() {
			if (!this.fixture) return;
			return this.fixture.getDensity();
		}
		set density(val) {
			if (this.watch) this.mod[13] = true;
			for (let fxt = this.fixtureList; fxt; fxt = fxt.getNext()) {
				fxt.setDensity(val);
			}
		}

		_getDirectionAngle(name) {
			name = name.toLowerCase().replaceAll(/[ _-]/g, '');
			let dirs = {
				up: -90,
				down: 90,
				left: 180,
				right: 0,
				upright: -45,
				rightup: -45,
				upleft: -135,
				leftup: -135,
				downright: 45,
				rightdown: 45,
				downleft: 135,
				leftdown: 135,
				forward: this.rotation,
				backward: this.rotation + 180
			};
			let val = dirs[name];
			if (this.p._angleMode == 'radians') {
				val = this.p.radians(val);
			}
			return val;
		}
		/**
		 * The angle of the sprite's movement or it's rotation angle if the
		 * sprite is not moving.
		 * @type {Number}
		 * @default 0 ("right")
		 */
		get direction() {
			if (this.vel.x !== 0 || this.vel.y !== 0) {
				return this.p.atan2(this.vel.y, this.vel.x);
			}
			if (this._direction === undefined) return this.rotation;
			return this._direction;
		}
		set direction(val) {
			if (this.watch) this.mod[14] = true;
			if (typeof val == 'string') {
				this._heading = val;
				val = this._getDirectionAngle(val);
			}
			this._direction = val;
			let speed = this.speed;
			this.vel.x = this.p.cos(val) * speed;
			this.vel.y = this.p.sin(val) * speed;
		}

		/**
		 * The amount of resistance a sprite has to being moved.
		 * @type {Number}
		 * @default 0
		 */
		get drag() {
			return this.body?.getLinearDamping();
		}
		set drag(val) {
			if (this.watch) this.mod[15] = true;
			if (this.body) this.body.setLinearDamping(val);
		}

		/**
		 * Displays the sprite.
		 *
		 * This function is called automatically at
		 * the end of each p5.js draw function call but it can also be run
		 * separately to customize the order sprites are drawn in relation
		 * to other stuff drawn to the p5.js canvas. Also see the sprite.layer
		 * property.
		 *
		 * A sprite's draw function can be overridden with a
		 * custom draw function, in which the center of the sprite is
		 * at (0, 0).
		 * @type {Function}
		 * @example
		 * sprite.draw = function() {
		 *   // an oval
		 *   ellipse(0,0,20,10);
		 * }
		 *
		 */
		get draw() {
			return this._display;
		}
		set draw(val) {
			this._draw = val;
		}

		/**
		 * True if the sprite's physics body is dynamic.
		 * @type {Boolean}
		 * @default true
		 */
		get dynamic() {
			return this.body?.isDynamic();
		}
		set dynamic(val) {
			if (val) this.collider = 'dynamic';
			else this.collider = 'kinematic';
		}

		/**
		 * Returns the first node in a linked list of the planck physics
		 * body's fixtures.
		 */
		get fixture() {
			return this.fixtureList;
		}
		/**
		 * Returns the first node in a linked list of the planck physics
		 * body's fixtures.
		 */
		get fixtureList() {
			if (!this.body) return null;
			return this.body.m_fixtureList;
		}

		/**
		 * The amount the sprite's physics body resists moving
		 * when rubbing against another physics body.
		 * @type {Number}
		 * @default 0.5
		 */
		get friction() {
			if (!this.fixture) return;
			return this.fixture.getFriction();
		}
		set friction(val) {
			if (this.watch) this.mod[16] = true;
			for (let fxt = this.fixtureList; fxt; fxt = fxt.getNext()) {
				fxt.setFriction(val);
			}
		}

		/**
		 * The sprite's heading. This is a string that can be set to
		 * "up", "down", "left", "right", "upRight", "upLeft", "downRight"
		 *
		 * It ignores cardinal direction word order, capitalization, spaces,
		 * underscores, and dashes.
		 * @type {String}
		 * @default undefined
		 */
		get heading() {
			return this._heading;
		}
		set heading(val) {
			this.direction = val;
		}

		/**
		 * A reference to the sprite's current image.
		 * @type {p5.Image}
		 */
		get img() {
			return this._ani?.frameImage;
		}
		set img(val) {
			this.changeAni(val);
		}

		/**
		 * A reference to the sprite's current image.
		 * @type {p5.Image}
		 */
		get image() {
			return this._ani?.frameImage;
		}
		set image(val) {
			this.changeAni(val);
		}

		/**
		 * Read only. True if the sprite is moving.
		 * @type {Boolean}
		 */
		get isMoving() {
			return this.vel.x != 0 || this.vel.y != 0;
		}

		/**
		 * Set this to true if the sprite goes really fast to prevent
		 * inaccurate physics simulation.
		 * @type {Boolean}
		 * @default false
		 */
		get isSuperFast() {
			return this.body?.isBullet();
		}
		set isSuperFast(val) {
			if (this.watch) this.mod[18] = true;
			if (this.body) this.body.setBullet(val);
		}

		/**
		 * True if the sprite's physics body is kinematic.
		 * @type {Boolean}
		 * @default false
		 */
		get kinematic() {
			return this.body?.isKinematic();
		}
		set kinematic(val) {
			if (val) this.collider = 'kinematic';
			else this.collider = 'dynamic';
		}
		/**
		 * By default sprites are drawn in the order they were created in.
		 * You can change the draw order by editing sprite's layer
		 * property. Sprites with the highest layer value get drawn first.
		 * @type {Number}
		 */
		get layer() {
			return this._layer;
		}
		set layer(val) {
			if (this.watch) this.mod[19] = true;
			this._layer = val;
		}
		/**
		 * The number of frame cycles before the sprite is removed.
		 *
		 * Set it to initiate a countdown, every draw cycle the value is
		 * reduced by 1 unit. If it becomes less than or equal to 0, the
		 * sprite will be removed.
		 *
		 * It must be set to a positive integer lower than the max value of
		 * a 32 bit signed integer, 2147483647, which is the default value
		 * representing infinite life. This limitation makes sprite netcode
		 * smaller. But don't worry, at 60 fps this gives users a definable
		 * sprite life range between 1 frame and ~411 days!
		 * @type {Number}
		 * @default 2147483647
		 */
		get life() {
			return this._life;
		}
		set life(val) {
			if (this.watch) this.mod[20] = true;
			this._life = val;
		}

		/**
		 * The mass of the sprite's physics body.
		 * @type {Number}
		 */
		get mass() {
			return this.body?.getMass();
		}
		set mass(val) {
			if (!this.body) return;
			if (this.watch) this.mod[21] = true;
			let t = this.massData;
			t.mass = val > 0 ? val : 0.00000001;
			this.body.setMassData(t);
			delete this._massUndef;
		}

		get massData() {
			const t = { I: 0, center: new pl.Vec2(0, 0), mass: 0 };
			this.body.getMassData(t);
			t.center = scaleFrom(t.center.x, t.center.y, this.tileSize);
			return t;
		}

		/**
		 * Recalculates the sprite's mass based on its current
		 * density and size.
		 */
		resetMass() {
			if (!this.body) return;
			if (this.watch) this.mod[21] = true;
			this.body.resetMassData();
		}

		/**
		 * The sprite's mirror states.
		 * @type {Object}
		 * @property {Boolean} x - the sprite's horizontal mirror state
		 * @property {Boolean} y - the sprite's vertical mirror state
		 * @default {x: false, y: false}
		 */
		get mirror() {
			return this._mirror;
		}
		set mirror(val) {
			if (this.watch) this.mod[22] = true;
			if (val.x !== undefined) this._mirror.x = val.x;
			if (val.y !== undefined) this._mirror.y = val.y;
		}

		/**
		 * Offsetting the sprite moves the sprite's physics body relative
		 * to its center.
		 *
		 * The sprite's x and y properties represent its center in world
		 * coordinates. This point is also the sprite's center of rotation.
		 * @type {object}
		 * @property {Number} x - the sprite's horizontal offset
		 * @property {Number} y - the sprite's vertical offset
		 * @default {x: 0, y: 0}
		 */
		get offset() {
			return this._offset;
		}
		set offset(val) {
			val.x ??= this._offset._x;
			val.y ??= this._offset._y;
			if (val.x == this._offset._x && val.y == this._offset._y) return;
			if (this.watch) this.mod[23] = true;
			this._offsetCenterBy(val.x - this._offset._x, val.y - this._offset._y);
		}

		/**
		 * Verbose alias for sprite.prevPos
		 * @type {Object}
		 */
		get previousPosition() {
			return this.prevPos;
		}
		set previousPosition(val) {
			this.prevPos = val;
		}

		/**
		 * Verbose alias for sprite.prevRotation
		 * @type {Number}
		 */
		get previousRotation() {
			return this.prevRotation;
		}
		set previousRotation(val) {
			this.prevRotation = val;
		}

		/**
		 * By default p5play draws sprites with subpixel rendering.
		 *
		 * Set pixelPerfect to true to make p5play always display sprites
		 * at integer pixel precision. This is useful for making retro games.
		 * @type {Boolean}
		 * @default false
		 */
		get pixelPerfect() {
			return this._pixelPerfect;
		}
		set pixelPerfect(val) {
			if (this.watch) this.mod[24] = true;
			this._pixelPerfect = val;
		}

		/**
		 * The angle of the sprite's rotation, not the direction it's moving.
		 * @type {Number}
		 * @default 0
		 */
		get rotation() {
			if (!this.body) return this._angle || 0;
			let val = this.body.getAngle();
			if (this.p._angleMode === 'degrees') return this.p.degrees(val);
			return val;
		}
		set rotation(val) {
			if (this.body) {
				if (this.p._angleMode === 'degrees') val = this.p.radians(val);
				this.body.setAngle(val);
				this.body.synchronizeTransform();
			} else {
				this._angle = val;
			}
		}
		/**
		 * The amount the sprite resists rotating.
		 * @type {Number}
		 * @default 0
		 */
		get rotationDrag() {
			return this.body?.getAngularDamping();
		}
		set rotationDrag(val) {
			if (!this.body) return;
			if (this.watch) this.mod[26] = true;
			this.body.setAngularDamping(val);
		}
		/**
		 * If true, the sprite can not rotate.
		 * @type {Boolean}
		 * @default false
		 */
		get rotationLock() {
			return this.body?.isFixedRotation();
		}
		set rotationLock(val) {
			if (!this.body) return;
			if (this.watch) this.mod[27] = true;
			this.body.setFixedRotation(val);
		}
		/**
		 * The speed of the sprite's rotation.
		 * @type {Number}
		 * @default 0
		 */
		get rotationSpeed() {
			if (this.body) return this.body.getAngularVelocity();
			return this._rotationSpeed;
		}
		set rotationSpeed(val) {
			if (this.body) this.body.setAngularVelocity(val);
			else this._rotationSpeed = val;
		}

		/**
		 * Scale of the sprite's physics body. Default is {x: 1, y: 1}
		 *
		 * The getter for sprite.scale returns the scale as an object with
		 * x and y properties.
		 *
		 * The valueOf function for sprite.scale returns the scale as a
		 * number. This enables users to do things like `sprite.scale *= 2`
		 * to double the sprite's scale.
		 * @type {Number|Object}
		 * @default 1
		 */
		get scale() {
			return this._scale;
		}
		set scale(val) {
			if (val <= 0) val = 0.01;
			if (typeof val === 'number') {
				val = { x: val, y: val };
			} else {
				val.x ??= this._scale._x;
				val.y ??= this._scale._y;
			}
			if (val.x == this._scale._x && val.y == this._scale._y) return;

			if (this.watch) this.mod[28] = true;

			let scalars = {
				x: val.x / this._scale._x,
				y: val.y / this._scale._y
			};

			this._w *= scalars.x;
			this._hw *= scalars.x;
			if (this._h) {
				this._h *= scalars.y;
				this._hh *= scalars.y;
			}
			this._resizeColliders(scalars);

			this._scale._x = val.x;
			this._scale._y = val.y;
			this._scale._avg = val.x;
		}

		/**
		 * Wake a sprite up or put it to sleep.
		 *
		 * "Sleeping" sprites are not included in the physics simulation, a
		 * sprite starts "sleeping" when it stops moving and doesn't collide
		 * with anything that it wasn't already touching.
		 * @type {Boolean}
		 * @default true
		 */
		get sleeping() {
			if (this.body) return !this.body.isAwake();
			return undefined;
		}
		set sleeping(val) {
			if (!this.body) return;
			if (this.watch) this.mod[30] = true;
			this.body.setAwake(!val);
		}

		/**
		 * The sprite's speed.
		 *
		 * Setting speed to a negative value will make the sprite move
		 * 180 degrees opposite of its current direction angle.
		 * @type {Number}
		 * @default 0
		 */
		get speed() {
			return this.p.createVector(this.vel.x, this.vel.y).mag();
		}
		set speed(val) {
			let angle = this.direction;
			this.vel.x = this.p.cos(angle) * val;
			this.vel.y = this.p.sin(angle) * val;
		}

		/**
		 * Is the sprite's physics collider static?
		 * @type {Boolean}
		 * @default false
		 */
		get static() {
			return this.body?.isStatic();
		}
		set static(val) {
			if (val) this.collider = 'static';
			else this.collider = 'dynamic';
		}

		/**
		 * If the sprite has been removed from the world.
		 * @type {Boolean}
		 * @default false
		 */
		get removed() {
			return this._removed;
		}
		set removed(val) {
			if (!val || this._removed) return;
			if (this.watch) this.mod[25] = true;
			this._removed = true;
			this._remove();
		}

		/**
		 * The sprite's vertices, in vertex mode format.
		 * @type {Array}
		 */
		set vertices(val) {
			if (this.__collider == 3) {
				throw new Error('Cannot set vertices of a sprite with collider type of "none".');
			}
			if (this.watch) this.mod[29] = true;

			this._removeFixtures();

			this._originMode = 'start';
			this.addCollider(val);
			if (this._hasSensors) {
				this.addDefaultSensors();
			}
		}
		get vertices() {
			return this._getVertices();
		}

		_getVertices(internalUse) {
			let f = this.fixture;
			let s = f.getShape();
			let v = [...s.m_vertices];
			if (s.m_type == 'polygon') v.unshift(v.at(-1));
			let x = this.x;
			let y = this.y;
			for (let i = 0; i < v.length; i++) {
				let arr = [fixRound((v[i].x / this.tileSize) * plScale + x), fixRound((v[i].y / this.tileSize) * plScale + y)];
				if (internalUse) v[i] = arr;
				else v[i] = this.p.createVector(arr[0], arr[1]);
			}
			return v;
		}

		/**
		 * If true the sprite is shown, if set to false the sprite is hidden.
		 *
		 * Becomes null when the sprite is off screen but will be drawn and
		 * set to true again if it goes back on screen.
		 * @type {Boolean}
		 * @default true
		 */
		get visible() {
			return this._visible;
		}
		set visible(val) {
			if (this.watch) this.mod[37] = true;
			this._visible = val;
		}

		/**
		 * The horizontal position of the sprite.
		 * @type {Number}
		 */
		get x() {
			return this._pos.x;
		}
		set x(val) {
			this._pos.x = val;
		}
		/**
		 * The vertical position of the sprite.
		 * @type {Number}
		 */
		get y() {
			return this._pos.y;
		}
		set y(val) {
			this._pos.y = val;
		}
		/**
		 * The position vector {x, y}
		 * @type {p5.Vector}
		 */
		get pos() {
			return this._pos;
		}
		set pos(val) {
			if (this.body) {
				let pos = new pl.Vec2((val.x * this.tileSize) / plScale, (val.y * this.tileSize) / plScale);
				this.body.setPosition(pos);
			}
			this._position.x = val.x;
			this._position.y = val.y;
		}
		/**
		 * The position vector {x, y}
		 * @type {p5.Vector}
		 */
		get position() {
			return this._pos;
		}
		set position(val) {
			this.pos = val;
		}
		/**
		 * The width of the sprite.
		 * @type {Number}
		 */
		get w() {
			return this._w;
		}
		set w(val) {
			if (val < 0) val = 0.01;
			if (val == this._w) return;
			if (this.watch) this.mod[38] = true;

			let scalarX = val / this._w;
			this._w = val;
			this._hw = val * 0.5;
			this._resizeColliders({ x: scalarX, y: 1 });
			delete this._widthUndef;
			delete this._dimensionsUndef;
		}
		/**
		 * Half the width of the sprite.
		 * @type {Number}
		 */
		get hw() {
			return this._hw;
		}
		set hw(val) {
			throw new FriendlyError('Sprite.hw');
		}
		/**
		 * The width of the sprite.
		 * @type {Number}
		 */
		get width() {
			return this._w;
		}
		set width(val) {
			this.w = val;
		}
		/**
		 * Half the width of the sprite.
		 * @type {Number}
		 */
		get halfWidth() {
			return this.hw;
		}
		set halfWidth(val) {
			throw new FriendlyError('Sprite.hw');
		}
		/**
		 * The height of the sprite.
		 * @type {Number}
		 */
		get h() {
			return this._h || this._w;
		}
		set h(val) {
			if (val < 0) val = 0.01;
			if (this.__shape == 1) {
				this.w = val;
				return;
			}
			if (val == this._h) return;
			if (this.watch) this.mod[17] = true;
			let scalarY = val / this._h;
			this._h = val;
			this._hh = val * 0.5;
			this._resizeColliders({ x: 1, y: scalarY });
			delete this._heightUndef;
			delete this._dimensionsUndef;
		}
		/**
		 * Half the height of the sprite.
		 * @type {Number}
		 */
		get hh() {
			return this._hh || this._hw;
		}
		set hh(val) {
			throw new FriendlyError('Sprite.hh');
		}
		/**
		 * The height of the sprite.
		 * @type {Number}
		 */
		get height() {
			return this.h;
		}
		set height(val) {
			this.h = val;
		}
		/**
		 * Half the height of the sprite.
		 * @type {Number}
		 */
		get halfHeight() {
			return this.hh;
		}
		set halfHeight(val) {
			throw new FriendlyError('Sprite.hh');
		}
		/**
		 * The diameter of a circular sprite.
		 * @type {Number}
		 */
		get d() {
			return this._w;
		}
		set d(val) {
			if (val < 0) val = 0.01;
			let shapeChange = this.__shape != 1;
			if (!shapeChange && this._w == val) return;

			if (this.watch) this.mod[38] = true;

			if (!shapeChange) {
				let scalar = val / this._w;
				this._resizeColliders({ x: scalar, y: scalar });
			}
			this._w = val;
			this._hw = val * 0.5;
			if (shapeChange) this.shape = 'circle';
		}
		/**
		 * The diameter of a circular sprite.
		 * @type {Number}
		 */
		get diameter() {
			return this._w;
		}
		set diameter(val) {
			this.d = val;
		}

		/**
		 * The radius of a circular sprite.
		 * @type {Number}
		 */
		get r() {
			return this._hw;
		}
		set r(val) {
			this.d = val * 2;
		}

		/**
		 * The radius of a circular sprite.
		 * @type {Number}
		 */
		get radius() {
			return this._hw;
		}
		set radius(val) {
			this.d = val * 2;
		}

		/*
		 * Resizes the the sprite's colliders.
		 * x and y scalars (0-1 values) are used to resize the collider.
		 */
		_resizeColliders(scalars) {
			if (!this.body) return;

			for (let fxt = this.fixtureList; fxt; fxt = fxt.getNext()) {
				if (fxt.m_isSensor) continue;
				let sh = fxt.m_shape;
				if (sh.m_type == 'circle') {
					if (scalars.x != 1) sh.m_radius *= scalars.x;
					else sh.m_radius *= scalars.y;
				} else {
					for (let vert of sh.m_vertices) {
						vert.x *= scalars.x;
						vert.y *= scalars.y;
					}
				}
			}
			if (this._widthUndef || this._heightUndef) this.resetMass();
			this.body.synchronizeFixtures();
		}

		/*
		 * Validates convexity.
		 */
		_isConvexPoly(vecs) {
			loopk: for (let k = 0; k < 2; k++) {
				if (k == 1) vecs = vecs.reverse();
				for (let i = 0; i < vecs.length; ++i) {
					const i1 = i;
					const i2 = i < vecs.length - 1 ? i1 + 1 : 0;
					const p = vecs[i1];
					const e = pl.Vec2.sub(vecs[i2], p);

					for (let j = 0; j < vecs.length; ++j) {
						if (j == i1 || j == i2) {
							continue;
						}

						const v = pl.Vec2.sub(vecs[j], p);
						const c = pl.Vec2.cross(e, v);
						if (c < 0.0) {
							if (k == 0) continue loopk;
							else return false;
						}
					}
				}
				break;
			}
			return true;
		}

		/**
		 * The kind of shape: 'box', 'circle', 'chain', or 'polygon'.
		 * @type {String}
		 * @default box
		 */
		get shape() {
			return this._shape;
		}
		set shape(val) {
			if (val == this._shape) return;

			// ['box', 'circle', 'chain', 'polygon']
			let __shape = this.p.Sprite.shapeTypes.indexOf(val);
			if (__shape == -1) {
				throw new Error(
					'Invalid shape type: "' +
						val +
						'"\nThe valid shape types are: "' +
						this.p.Sprite.shapeTypes.join('", "') +
						'"'
				);
			}

			if (this.__collider == 3 && __shape >= 2) {
				console.error(
					'Cannot set the collider shape to chain or polygon if the sprite has a collider type of "none". To achieve the same effect, use .overlaps(allSprites) to have your sprite overlap with the allSprites group.'
				);
				return;
			}

			if (this.__shape == 1 && __shape != 0) {
				console.error('Cannot change a circle collider into a chain or polygon shape.');
				return;
			}

			let prevShape = this.__shape;
			this.__shape = __shape;
			this._shape = val;

			if (this.watch) this.mod[29] = true;
			if (prevShape === undefined) return;

			if (this.__shape == 0) {
				this._h = this._w;
				this._hh = this._hw;
			} else {
				this._h = undefined;
				this._hh = undefined;
			}

			let v, w;
			if (prevShape != 1 && this.__shape != 1) {
				v = this._getVertices(true);
			} else {
				w = this._w;
			}

			// destroys all (colliders and sensors)
			this._removeFixtures();

			// remake colliders, if collider type is not "none"
			if (this.__collider != 3) {
				if (v) {
					this._originMode ??= 'center';
					this.addCollider(v);
				}
				// turn circle into dodecagon chain/polygon?
				// else if (prevShape == 1) {
				// 	this.addCollider(0, 0, [this._w, -30, 12]);
				// }
				else {
					this.addCollider();
				}
			}
			// remake sensors
			if (this._hasSensors) {
				this.addDefaultSensors();
			}

			let ox = this._offset._x;
			let oy = this._offset._y;
			if (!ox && !oy) return;
			this._offset._x = 0;
			this._offset._y = 0;
			this._offsetCenterBy(ox, oy);
		}

		/**
		 * You can set the sprite's update function to a custom
		 * update function which by default, will be run after every p5.js
		 * draw call.
		 *
		 * This function updates the sprite's animation, mouse, and
		 *
		 * There's no way to individually update a sprite or group
		 * of sprites in the physics simulation though.
		 * @type {Function}
		 */
		get update() {
			return this._update;
		}
		set update(val) {
			this._customUpdate = val;
		}

		/**
		 * The sprite's velocity vector {x, y}
		 * @type {p5.Vector}
		 * @default {x: 0, y: 0}
		 */
		get vel() {
			return this._vel;
		}
		set vel(val) {
			this.vel.x = val.x;
			this.vel.y = val.y;
		}

		/**
		 * The sprite's velocity vector {x, y}
		 * @type {p5.Vector}
		 * @default {x: 0, y: 0}
		 */
		set velocity(val) {
			this.vel = val;
		}
		get velocity() {
			return this._vel;
		}

		_update() {
			if (this._ani?.update) this._ani.update();

			for (let prop in this.mouse) {
				if (this.mouse[prop] == -1) this.mouse[prop] = 0;
			}

			if (this._customUpdate) this._customUpdate();

			if (this.autoUpdate) this.autoUpdate = null;
		}

		_step() {
			if (!this.body && !this._removed) {
				this.rotation += this._rotationSpeed;
				this.x += this.vel.x;
				this.y += this.vel.y;
			}

			if (this.watch) {
				if (this.x != this.prevX) this.mod[0] = this.mod[2] = true;
				if (this.y != this.prevY) this.mod[1] = this.mod[2] = true;
				if (this.rotation != this.prevRotation) {
					this.mod[3] = this.mod[4] = true;
				}
			}

			if (!this.body && !this._removed) return;

			this.__step();
		}

		/*
		 * Default draw
		 */
		_draw() {
			if (this._strokeWeight !== undefined) {
				this.p.strokeWeight(this._strokeWeight);
			}
			if (this._ani && this.debug != 'colliders' && !this.p.p5play.disableImages) {
				this._ani.draw(this._offset._x, this._offset._y, 0, this._scale._x, this._scale._y);
			}
			if (!this._ani || this.debug || this.p.p5play.disableImages) {
				if (this.debug && this.debug != 'colliders') {
					this.p.noFill();
					if (this.__collider != 3) this.p.stroke(0, 255, 0);
					else this.p.stroke(120);
					this.p.line(0, -2, 0, 2);
					this.p.line(-2, 0, 2, 0);
				}

				if (this.__collider != 3) {
					if (this._strokeWeight !== 0) {
						if (this.__shape == 2) this.p.stroke(this.stroke || this.color);
						else if (this._stroke) this.p.stroke(this._stroke);
					}
					for (let fxt = this.fixtureList; fxt; fxt = fxt.getNext()) {
						if (fxt.m_isSensor && !this.debug) continue;
						this._drawFixture(fxt);
					}
				} else {
					if (this._strokeWeight !== 0) this.p.stroke(this._stroke || 120);
					if (this.__shape == 0) {
						this.p.rect(this._offset._x, this._offset._y, this.w * this.tileSize, this.h * this.tileSize);
					} else if (this.__shape == 1) {
						this.p.circle(this._offset._x, this._offset._y, this.d * this.tileSize);
					}
				}
			}
			if (this.text !== undefined) {
				this.p.textAlign(this.p.CENTER, this.p.CENTER);
				this.p.fill(this._textFill);
				if (this._textStrokeWeight) this.p.strokeWeight(this._textStrokeWeight);
				if (this._textStroke) this.p.stroke(this._textStroke);
				else this.p.noStroke();
				this.p.textSize(this.textSize * this.tileSize);
				this.p.text(this.text, 0, 0);
			}
		}

		/*
		 * Applies `rotation`, `mirror` scaling, and `world.origin`
		 * translation before the sprite's `draw` function is called.
		 *
		 * If the sprite is off screen according to the camera's bounds,
		 * `camera.bound`, then the sprite doesn't get drawn.
		 * The algorithm for checking if a sprite is on screen is
		 * unsophisticated and errors on the side of drawing the sprite.
		 */
		_display() {
			let x = this.x * this.tileSize + this.p.world.origin.x;
			let y = this.y * this.tileSize + this.p.world.origin.y;

			let largestSide = Math.max(this._w, this._h);

			if (
				this.shape != 'chain' &&
				this.p.camera.active &&
				(x + largestSide < this.p.camera.bound.min.x ||
					x - largestSide > this.p.camera.bound.max.x ||
					y + largestSide < this.p.camera.bound.min.y ||
					y - largestSide > this.p.camera.bound.max.y)
			) {
				this._visible = null;
				return;
			}

			this._visible = true;
			this.p.p5play.spritesDrawn++;

			if (!this._pixelPerfect) {
				x = fixRound(x);
				y = fixRound(y);
			} else {
				let w, h;
				if (this.ani && !this.p.p5play.disableImages) {
					w = this.ani[this.ani._frame].w;
					h = this.ani[this.ani._frame].h;
				} else {
					w = this._w;
					h = this._h;
				}
				if (w % 2 == 0) x = Math.round(x);
				else x = Math.round(x - 0.5) + 0.5;
				if (h % 2 == 0) y = Math.round(y);
				else y = Math.round(y - 0.5) + 0.5;
			}

			for (let j of this.joints) {
				if (!j.visible) {
					j.visible ??= true;
					continue;
				}
				if (this._uid == j.spriteA._uid) {
					if (!j.spriteB._visible || this.layer <= j.spriteB.layer) {
						j._display();
					}
				} else if (!j.spriteA._visible || this.layer < j.spriteA.layer) {
					j._display();
				}
			}

			this.p.push();
			this.p.imageMode('center');
			this.p.rectMode('center');
			this.p.ellipseMode('center');

			this.p.translate(x, y);
			if (this.rotation) this.p.rotate(this.rotation);
			this.p.scale(this._mirror._x, this._mirror._y);

			this.p.fill(this.color);

			this._draw();

			this.p.pop();
			this._cameraActiveWhenDrawn = this.p.camera.active;

			if (this.autoDraw) this.autoDraw = null;
		}

		/*
		 * Draws a fixture. Used to draw the sprite's physics body.
		 */
		_drawFixture(fxt) {
			const sh = fxt.m_shape;
			if (sh.m_type == 'polygon' || sh.m_type == 'chain') {
				if (sh.m_type == 'chain') {
					this.p.push();
					this.p.noFill();
				}
				let v = sh.m_vertices;
				this.p.beginShape();
				for (let i = 0; i < v.length; i++) {
					this.p.vertex(v[i].x * plScale, v[i].y * plScale);
				}
				if (sh.m_type != 'chain') this.p.endShape('close');
				else {
					this.p.endShape();
					this.p.pop();
				}
			} else if (sh.m_type == 'circle') {
				const d = sh.m_radius * 2 * plScale;
				this.p.ellipse(sh.m_p.x * plScale, sh.m_p.y * plScale, d, d);
			} else if (sh.m_type == 'edge') {
				this.p.line(
					sh.m_vertex1.x * plScale,
					sh.m_vertex1.y * plScale,
					sh.m_vertex2.x * plScale,
					sh.m_vertex2.y * plScale
				);
			}
		}

		_args2Vec(x, y) {
			if (Array.isArray(x)) {
				return { x: x[0], y: x[1] };
			} else if (typeof x == 'object') {
				y = x.y;
				x = x.x;
			}
			return { x: x || 0, y: y || 0 };
		}

		_parseForceArgs() {
			let args = arguments;
			if (typeof args[0] == 'number' && (args.length == 1 || typeof args[1] != 'number')) {
				args[3] = args[2];
				args[2] = args[1];
				args[1] = this.p.sin(this._bearing) * args[0];
				args[0] = this.p.cos(this._bearing) * args[0];
			} else if (args.length == 2 && typeof args[1] != 'number') {
				args[2] = args[1];
				args[1] = undefined;
			}
			let o = {};
			o.forceVector = new pl.Vec2(this._args2Vec(args[0], args[1]));
			if (args[2] !== undefined) {
				o.poa = this._args2Vec(args[2], args[3]);
				o.poa = scaleTo(o.poa.x, o.poa.y, this.tileSize);
			}
			return o;
		}

		/**
		 * If this function is given a force amount, the force is applied
		 * at the angle of the sprite's current bearing. Force can
		 * also be given as a vector.
		 *
		 * The origin of the force can be given as a vector or as x and y
		 * coordinates. If no origin is given, the force is applied to the
		 * center of the sprite.
		 *
		 * @param {Number} amount
		 * @param {Vector} [origin]
		 * @example
		 * sprite.applyForce(amount);
		 * sprite.applyForce(amount, {x: originX, y: originY});
		 * sprite.applyForce(x, y);
		 * sprite.applyForce(x, y, {x: originX, y: originY});
		 * sprite.applyForce({x, y}, {x: originX, y: originY});
		 */
		applyForce(x, y, originX, originY) {
			if (!this.body) return;
			if (location.host == 'game.thegamebox.ca') {
				return this.applyForceScaled(...arguments);
			}
			let { forceVector, poa } = this._parseForceArgs(...arguments);
			if (!poa) this.body.applyForceToCenter(forceVector);
			else this.body.applyForce(forceVector, poa);
		}

		/**
		 * Applies a force that's scaled to the sprite's mass.
		 *
		 * @param {Number} amount
		 * @param {Vector} [origin]
		 */
		applyForceScaled() {
			if (!this.body) return;
			let { forceVector, poa } = this._parseForceArgs(...arguments);
			forceVector.mul(this.mass);
			if (!poa) this.body.applyForceToCenter(forceVector);
			else this.body.applyForce(forceVector, poa);
		}

		/**
		 * Applies a force to the sprite's center of mass attracting it to
		 * the given position.
		 *
		 * Radius and easing not implemented yet!
		 *
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} force
		 * @param {Number} [radius] infinite if not given
		 * @param {Number} [easing] solid if not given
		 * @example
		 * sprite.attractTo(x, y, force);
		 * sprite.attractTo({x, y}, force);
		 */
		attractTo(x, y, force, radius, easing) {
			if (!this.body) return;
			if (typeof x != 'number') {
				let obj = x;
				if (!obj || (obj == this.p.mouse && !this.p.mouse.active)) return;
				force = y;
				y = obj.y;
				x = obj.x;
			}
			if (this.x == x && this.y == y) return;

			let a = y - this.y;
			let b = x - this.x;
			let c = Math.sqrt(a * a + b * b);

			let percent = force / c;

			let forceVector = new pl.Vec2(b * percent, a * percent);
			this.body.applyForceToCenter(forceVector);
		}

		repelFrom(x, y, force, radius, easing) {
			if (!this.body) return;
			if (typeof x != 'number') {
				let obj = x;
				if (!obj || (obj == this.p.mouse && !this.p.mouse.active)) return;
				force = y;
				y = obj.y;
				x = obj.x;
			}
			this.attractTo(x, y, -force, radius, easing);
		}

		/**
		 * Apply a torque on the sprite's physics body.
		 * Torque is the force that causes rotation.
		 * A positive torque will rotate the sprite clockwise.
		 * A negative torque will rotate the sprite counter-clockwise.
		 *
		 * This function is the rotational equivalent of applyForce().
		 * It will not imperatively set the sprite's rotation.
		 *
		 * @param {Number} torque The amount of torque to apply.
		 */
		applyTorque(val) {
			if (!this.body) return;
			this.body.applyTorque(val);
		}

		/**
		 * Moves a sprite towards a position at a percentage of the distance
		 * between itself and the destination.
		 *
		 * @param {Number|Object} x destination x or any object with x and y properties
		 * @param {Number} [y] destination y
		 * @param {Number} [tracking] 1 represents 1:1 tracking, the mouse moves to the destination immediately, 0 represents no tracking. Default is 0.1 (10% tracking).
		 */
		moveTowards(x, y, tracking) {
			if (x === undefined) return;
			if (typeof x != 'number' && x !== null) {
				let obj = x;
				if (obj == this.p.mouse && !this.p.mouse.active) return;
				if (!obj || obj.x === undefined || obj.y === undefined) {
					throw 'sprite.moveTowards/moveAway ERROR: movement destination not defined.';
				}
				tracking = y;
				y = obj.y;
				x = obj.x;
			}
			tracking ??= 0.1;

			if (x !== undefined && x !== null) {
				let diffX = x - this.x;
				if (!isSlop(diffX)) {
					this.vel.x = diffX * tracking * this.tileSize;
				} else this.vel.x = 0;
			}
			if (y !== undefined && y !== null) {
				let diffY = y - this.y;
				if (!isSlop(diffY)) {
					this.vel.y = diffY * tracking * this.tileSize;
				} else this.vel.y = 0;
			}
		}

		/**
		 * Moves the sprite away from a position, the opposite of moveTowards,
		 * at a percentage of the distance between itself and the position.
		 * @param {Number} x
		 * @param {Number} [y]
		 * @param {Number} [repel] range from 0-1
		 */
		moveAway(x, y, repel) {
			this.moveTowards(...arguments);
			this.vel.x *= -1;
			this.vel.y *= -1;
		}

		/**
		 * Move the sprite a certain distance from its current position.
		 *
		 * @param {Number} distance [optional]
		 * @param {Number|String} direction [optional]
		 * @param {Number} speed [optional]
		 * @returns {Promise} resolves when the movement is complete or cancelled
		 *
		 * @example
		 * sprite.move(distance);
		 * sprite.move(distance, direction);
		 * sprite.move(distance, direction, speed);
		 *
		 * sprite.move(directionName);
		 * sprite.move(directionName, speed);
		 */
		move(distance, direction, speed) {
			if (!distance) return;

			let directionNamed = isNaN(arguments[0]);
			if (directionNamed) {
				distance = 1;
				direction = arguments[0];
				speed = arguments[1];
			}

			if (typeof direction == 'string') {
				directionNamed = true;
				this._heading = direction;
				direction = this._getDirectionAngle(direction);
			}
			direction ??= this.direction;

			let x = this.x + this.p.cos(direction) * distance;
			let y = this.y + this.p.sin(direction) * distance;
			if (directionNamed && this.tileSize != 1) {
				// round to nearest 0.5
				x = Math.round(x * 2) / 2;
				y = Math.round(y * 2) / 2;
			} else if (direction % 45 == 0) {
				x = fixRound(x);
				y = fixRound(y);
			}
			return this.moveTo(x, y, speed);
		}

		/**
		 * Move the sprite to a position.
		 *
		 * @param {Number|Object} x|position destination x or any object with x and y properties
		 * @param {Number} y destination y
		 * @param {Number} speed [optional]
		 * @returns {Promise} resolves to true when the movement is complete
		 * or to false if the sprite will not reach its destination
		 */
		moveTo(x, y, speed) {
			if (typeof x != 'number') {
				let obj = x;
				if (obj == this.p.mouse && !this.p.mouse.active) return;
				if (!obj || obj.x === undefined || obj.y === undefined) {
					throw 'sprite.moveTo ERROR: destination not defined.';
				}
				speed = y;
				y = obj.y;
				x = obj.x;
			}
			this._dest.x = this.x;
			this._dest.y = this.y;

			if (x == this.x) x = false;
			else {
				this._dest.x = x;
				x = true;
			}
			if (y == this.y) y = false;
			else {
				this._dest.y = y;
				y = true;
			}

			this._destIdx++;
			if (!x && !y) return Promise.resolve(true);

			if (this.speed) speed ??= this.speed;
			if (this.tileSize > 1) speed ??= 0.1;
			speed ??= 1;
			if (speed <= 0) {
				console.warn('sprite.move: speed should be a positive number');
				return Promise.resolve(false);
			}

			let a = this._dest.y - this.y;
			let b = this._dest.x - this.x;
			let c = Math.sqrt(a * a + b * b);

			let percent = speed / c;

			this.vel.x = b * percent;
			this.vel.y = a * percent;

			// direction destination
			let destD = this.direction;
			// direction margin of error
			let destDMin = destD - 0.1;
			let destDMax = destD + 0.1;

			// proximity margin of error
			let margin = speed + 0.01;

			let destIdx = this._destIdx;

			let velThresh = Math.max(this.p.world.velocityThreshold, margin * 0.25) / this.tileSize;

			return (async () => {
				let distX = margin + margin;
				let distY = margin + margin;
				do {
					if (destIdx != this._destIdx) return false;
					await pInst.delay();

					// check if the sprite's movement has been impeded such that
					// its speed has become slower than the world velocityThreshold
					// or if its direction has changed significantly enough so that
					// it will not reach its destination
					let dir = this.direction;
					if (
						dir <= destDMin ||
						dir >= destDMax ||
						(Math.abs(this.vel.x) <= velThresh && Math.abs(this.vel.y) <= velThresh)
					) {
						return false;
					}

					// check if the sprite has reached its destination
					distX = Math.abs(this.x - this._dest.x);
					distY = Math.abs(this.y - this._dest.y);
				} while ((x && distX > margin) || (y && distY > margin));
				// stop moving the sprite, snap to destination
				if (distX < margin) this.x = this._dest.x;
				if (distY < margin) this.y = this._dest.y;
				this.vel.x = 0;
				this.vel.y = 0;
				return true;
			})();
		}

		/**
		 * Rotates the sprite towards an angle or position
		 * with x and y properties.
		 *
		 * @param {Number|Object} angle|position angle in degrees or an object with x and y properties
		 * @param {Number} tracking percent of the distance to rotate on each frame towards the target angle, default is 0.1 (10%)
		 * @param {Number} facing (only if position is given) rotation angle the sprite should be at when "facing" the position, default is 0
		 */
		rotateTowards(angle, tracking) {
			if (this.__collider == 1) throw new FriendlyError(0);

			let args = arguments;
			let x, y, facing;
			if (typeof args[0] != 'number') {
				x = args[0].x;
				y = args[0].y;
				tracking = args[1];
				facing = args[2];
			} else if (arguments.length > 2) {
				x = args[0];
				y = args[1];
				tracking = args[2];
				facing = args[3];
			}

			if (x !== undefined) angle = this.angleToFace(x, y, facing);
			else {
				angle -= this.rotation;
			}

			tracking ??= 0.1;
			this.rotationSpeed = angle * tracking;
		}

		/**
		 * Finds the angle from this sprite to the given position or object
		 * with x and y properties.
		 *
		 * Can be used to change the direction of a sprite so it moves
		 * to a position or object.
		 *
		 * Used internally by `moveTo` and `moveTowards`.
		 *
		 * @param {Number} x
		 * @param {Number} y
		 * @returns {Number} angle
		 * @example
		 * spriteA.direction = spriteA.angleTo(spriteB);
		 */
		angleTo(x, y) {
			if (typeof x == 'object') {
				let obj = x;
				if (obj == this.p.mouse && !this.p.mouse.active) return 0;
				if (obj.x === undefined || obj.y === undefined) {
					console.error(
						'sprite.angleTo ERROR: rotation destination not defined, object given with no x or y properties'
					);
					return 0;
				}
				y = obj.y;
				x = obj.x;
			}

			return this.p.atan2(y - this.y, x - this.x);
		}

		/**
		 * Finds the minimium amount the sprite would have to rotate to
		 * "face" a position at a specified "facing" rotation.
		 *
		 * Used internally by `rotateTo` and `rotateTowards`.
		 *
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} facing - rotation angle the sprite should be at when "facing" the position, default is 0
		 * @returns {Number} minimum angle of rotation to face the position
		 */
		angleToFace(x, y, facing) {
			if (typeof x == 'object') {
				facing = y;
				y = x.y;
				x = x.x;
			}
			if (Math.abs(x - this.x) < 0.01 && Math.abs(y - this.y) < 0.01) {
				return 0;
			}
			let ang = this.angleTo(x, y);
			facing ??= 0;
			ang += facing;
			let dist1 = ang - (this.rotation % 360);
			let dist2 = 360 - Math.abs(dist1);
			dist2 *= dist1 < 0 ? 1 : -1;

			return Math.abs(dist1) < Math.abs(dist2) ? dist1 : dist2;
		}

		/**
		 * Rotates the sprite to an angle or to face a position.
		 *
		 * @param {Number|Object} angle|position
		 * @param {Number} speed the amount of rotation per frame, default is 1
		 * @param {Number} facing (only if position is given) the rotation angle the sprite should be at when "facing" the position, default is 0
		 * @returns {Promise} a promise that resolves when the rotation is complete
		 */
		rotateTo(angle, speed) {
			if (this.__collider == 1) throw new FriendlyError(0);

			let args = arguments;
			let x, y, facing;
			if (typeof args[0] != 'number') {
				x = args[0].x;
				y = args[0].y;
				speed = args[1];
				facing = args[2];
			} else if (arguments.length > 2) {
				x = args[0];
				y = args[1];
				speed = args[2];
				facing = args[3];
			}

			if (x !== undefined) angle = this.angleToFace(x, y, facing);
			else {
				if (angle == this.rotation) return;
				angle -= this.rotation;
			}

			return this.rotate(angle, speed);
		}

		/**
		 * Rotates the sprite by an amount at a specified angles per frame speed.
		 *
		 * @param {Number} angle the amount to rotate the sprite
		 * @param {Number} speed the amount of rotation per frame, default is 1
		 * @returns {Promise} a promise that resolves when the rotation is complete
		 */
		rotate(angle, speed) {
			if (this.__collider == 1) throw new FriendlyError(0);
			if (isNaN(angle)) throw new FriendlyError(1, [angle]);
			if (angle == 0) return;
			let absA = Math.abs(angle);
			speed ??= 1;
			if (speed > absA) speed = absA;

			let ang = this.rotation + angle;
			let cw = angle > 0; // rotation is clockwise
			this.rotationSpeed = speed * (cw ? 1 : -1);

			let frames = Math.floor(absA / speed) - 1;
			this._rotateIdx ??= 0;
			this._rotateIdx++;
			let _rotateIdx = this._rotateIdx;

			return (async () => {
				if (frames > 1) {
					let limit = Math.abs(this.rotationSpeed) + 0.01;
					do {
						if (this._rotateIdx != _rotateIdx) return false;
						await pInst.delay();

						if ((cw && this.rotationSpeed < 0.01) || (!cw && this.rotationSpeed > -0.01)) {
							return false;
						}
					} while (
						((cw && ang > this.rotation) || (!cw && ang < this.rotation)) &&
						limit < Math.abs(ang - this.rotation)
					);

					if (Math.abs(ang - this.rotation) > 0.01) {
						this.rotationSpeed = ang - this.rotation;
						await pInst.delay();
					}
				} else {
					await pInst.delay();
				}
				if (this._rotateIdx != _rotateIdx) return false;
				this.rotationSpeed = 0;
				this.rotation = ang;
				return true;
			})();
		}

		/**
		 * Changes the sprite's animation. Use `addAni` to define the
		 * animation(s) first.
		 *
		 * @param {...String} anis the names of one or many animations to be played in
		 * sequence
		 * @returns A promise that fulfills when the animation or sequence of animations
		 * completes
		 */
		async changeAni(anis) {
			if (this.p.p5play.disableImages) return;
			if (arguments.length > 1) anis = [...arguments];
			else if (anis instanceof this.p.SpriteAnimation) {
				if (anis == this._ani) return;
				anis = [anis];
			} else if (!Array.isArray(anis)) {
				if (anis == this._ani?.name) return;
				anis = [anis];
			}

			this._aniChangeCount++;
			let loop, stopOnLastAni;
			for (let i = 0; i < anis.length; i++) {
				let ani = anis[i];
				if (
					ani instanceof this.p.SpriteAnimation ||
					ani instanceof p5.Image ||
					(typeof ani == 'string' && ani.length != 1 && ani.includes('.'))
				) {
					ani = this.addAni(ani);
					anis[i] = ani;
				}
				if (typeof ani == 'string') {
					ani = { name: ani };
					anis[i] = ani;
				}
				if (ani.name.length > 1) {
					if (ani.name[0] == '!') {
						ani.name = ani.name.slice(1);
						ani.start = -1;
						ani.end = 0;
					}
					if (ani.name[0] == '<' || ani.name[0] == '>') {
						ani.name = ani.name.slice(1);
						ani.flipX = true;
					}
					if (ani.name[0] == '^') {
						ani.name = ani.name.slice(1);
						ani.flipY = true;
					}
					if (ani.name == '**') {
						loop = true;
						anis = anis.slice(0, -1);
					}
					if (ani.name == ';;') {
						stopOnLastAni = true;
						anis = anis.slice(0, -1);
					}
				}
			}
			let count = this._aniChangeCount;

			do {
				for (let i = 0; i < anis.length; i++) {
					let ani = anis[i];
					if (!ani.start && anis.length > 1) ani.start = 0;
					await this._playSequencedAni(ani);
				}
			} while (loop && count == this._aniChangeCount);
			if (anis.length != 1 && stopOnLastAni) this._ani.stop();
		}

		_playSequencedAni(ani) {
			return new Promise((resolve) => {
				let { name, start, end, flipX, flipY } = ani;
				this._changeAni(name);

				if (flipX) this._ani.scale.x = -this._ani.scale.x;
				if (flipY) this._ani.scale.y = -this._ani.scale.y;

				if (start < 0) start = this._ani.length + start;
				if (start !== undefined) this._ani._frame = start;

				if (end !== undefined) this._ani.goToFrame(end);
				else if (this._ani._frame == this._ani.lastFrame) resolve();

				this._ani._onComplete = this._ani._onChange = () => {
					if (flipX) this._ani.scale.x = -this._ani.scale.x;
					if (flipY) this._ani.scale.y = -this._ani.scale.y;
					this._ani._onComplete = this._ani._onChange = null;
					resolve();
				};
			});
		}

		/**
		 * Changes the sprite's animation. Use `addAni` to define the
		 * animation(s) first. Alt for `changeAni`.
		 *
		 * @param {...String} anis the names of one or many animations to be played in
		 * sequence
		 * @returns A promise that fulfills when the animation or sequence of animations
		 * completes
		 */
		changeAnimation() {
			return this.changeAni(...arguments);
		}

		/*
		 * Changes the displayed animation. The animation must be added first
		 * using the sprite.addAnimation method. The animation could also be
		 * added using the group.addAnimation method to a group the sprite
		 * has been added to.
		 *
		 * See SpriteAnimation for more control over the sequence.
		 */
		_changeAni(label) {
			if (this._ani?._onChange) this._ani._onChange();
			if (this._ani?.onChange) this._ani.onChange();
			let ani = this.animations[label];
			if (!ani) {
				for (let i = this.groups.length - 1; i >= 0; i--) {
					let g = this.groups[i];
					ani = g.animations[label];
					if (ani) {
						ani = ani.clone();
						break;
					}
				}
			}
			if (!ani) {
				this.p.noLoop();
				throw new FriendlyError('Sprite.changeAnimation', [label]);
			}
			this._ani = ani;
			this._ani.name = label;
			// reset to frame 0 of that animation
			if (this.resetAnimationsOnChange) this._ani._frame = 0;
		}

		/**
		 * Removes the Sprite from the sketch and all the groups it
		 * belongs to.
		 *
		 * When a sprite is removed it will not be drawn or updated anymore.
		 * If it has a physics body, it will be removed from the
		 * physics world simulation.
		 *
		 * There's no way to undo this operation. If you want to hide a
		 * sprite use `sprite.visible = false` instead.
		 *
		 */
		remove() {
			this.removed = true;
		}

		_remove() {
			if (this.body) this.p.world.destroyBody(this.body);
			this.body = null;

			// when removed from the world also remove all the sprite
			// from all its groups
			for (let g of this.groups) {
				g.remove(this);
			}
		}

		/**
		 * Warning: This function might be changed in a future release.
		 *
		 * Returns the sprite's unique identifier `sprite.idNum`.
		 *
		 * @returns the sprite's id
		 */
		toString() {
			return 's' + this.idNum;
		}

		_setContactCB(target, cb, contactType, eventType) {
			let type;
			if (contactType == 0) type = eventTypes._collisions[eventType];
			else type = eventTypes._overlappers[eventType];

			let ledger = this.p.p5play[type];

			let l = (ledger[this._uid] ??= {});

			if (l[target._uid] == cb) return;
			l[target._uid] = cb;

			l = ledger[target._uid];
			if (!l || !l[this._uid]) return;
			delete l[this._uid];
			if (Object.keys(l).length == 0) {
				delete ledger[target._uid];
			}
		}

		_validateCollideParams(target, cb) {
			if (!target) {
				throw new FriendlyError('Sprite.collide', 2);
			}
			if (!target._isSprite && !target._isGroup) {
				throw new FriendlyError('Sprite.collide', 0, [target]);
			}
			if (cb && typeof cb != 'function') {
				throw new FriendlyError('Sprite.collide', 1, [cb]);
			}
		}

		_ensureCollide(target, cb, type) {
			if (this._hasOverlap[target._uid] !== false) {
				this._hasOverlap[target._uid] = false;
			}
			if (target._hasOverlap[this._uid] !== false) {
				target._hasOverlap[this._uid] = false;
				if (target._isGroup) {
					for (let s of target) {
						s._hasOverlap[this._uid] = false;
						this._hasOverlap[s._uid] = false;
					}
				}
			}
		}

		collide(target, callback) {
			return this.collides(target, callback);
		}

		/**
		 * Returns true on the first frame that the sprite collides with the
		 * target sprite or group.
		 *
		 * Custom collision event handling can be done by using this function
		 * in an if statement or adding a callback as the second parameter.
		 *
		 * @param {Sprite|Group} target
		 * @param {Function} [callback]
		 */
		collides(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 0);
			return this._collisions[target._uid] == 1 || this._collisions[target._uid] <= -3;
		}

		/**
		 * Returns a truthy value while the sprite is colliding with the
		 * target sprite or group. The value is the number of frames that
		 * the sprite has been colliding with the target.
		 *
		 * @param {Sprite|Group} target
		 * @param {Function} [callback]
		 * @return {Number} frames
		 */
		colliding(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 1);
			let val = this._collisions[target._uid];
			if (val <= -3) return 1;
			return val > 0 ? val : 0;
		}

		/**
		 * Returns true on the first frame that the sprite no longer overlaps
		 * with the target sprite or group.
		 *
		 * @param {Sprite|Group} target
		 * @param {Function} [callback]
		 * @return {Boolean}
		 */
		collided(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 2);
			return this._collisions[target._uid] <= -1;
		}

		_validateOverlapParams(target, cb) {
			if (!target) {
				throw new FriendlyError('Sprite.overlap', 2);
			}
			if (!target._isSprite && !target._isGroup) {
				throw new FriendlyError('Sprite.overlap', 0, [target]);
			}
			if (cb && typeof cb != 'function') {
				throw new FriendlyError('Sprite.overlap', 1, [cb]);
			}
		}

		_ensureOverlap(target) {
			if (!this._hasSensors) this.addDefaultSensors();
			if (!target._hasSensors) {
				if (target._isSprite) {
					target.addDefaultSensors();
				} else {
					for (let s of target) {
						if (!s._hasSensors) s.addDefaultSensors();
					}
					target._hasSensors = true;
				}
			}

			if (!this._hasOverlap[target._uid]) {
				this._removeContactsWith(target);
				this._hasOverlap[target._uid] = true;
			}
			if (!target._hasOverlap[this._uid]) {
				target._removeContactsWith(this);
				target._hasOverlap[this._uid] = true;
				if (target._isGroup) {
					for (let s of target) {
						s._hasOverlap[this._uid] = true;
						this._hasOverlap[s._uid] = true;
					}
				}
			}
		}

		overlap(target, callback) {
			return this.overlaps(target, callback);
		}

		/**
		 * Returns true on the first frame that the sprite overlaps with the
		 * target sprite or group.
		 *
		 * Custom overlap event handling can be done by using this function
		 * in an if statement or adding a callback as the second parameter.
		 *
		 * @param {Sprite|Group} target
		 * @param {Function} [callback]
		 */
		overlaps(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 0);
			return this._overlappers[target._uid] == 1 || this._overlappers[target._uid] <= -3;
		}

		/**
		 * Returns a truthy value while the sprite is overlapping with the
		 * target sprite or group. The value returned is the number of
		 * frames the sprite has been overlapping with the target.
		 *
		 * @param {Sprite|Group} target
		 * @param {Function} [callback]
		 * @return {Number} frames
		 */
		overlapping(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 1);
			let val = this._overlappers[target._uid];
			if (val <= -3) return 1;
			return val > 0 ? val : 0;
		}

		/**
		 * Returns true on the first frame that the sprite no longer overlaps
		 * with the target sprite or group.
		 *
		 * @param {Sprite|Group} target
		 * @param {Function} [callback]
		 * @return {Boolean}
		 */
		overlapped(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 2);
			return this._overlappers[target._uid] <= -1;
		}

		_removeContactsWith(target) {
			if (target._isGroup) {
				for (let s of target) {
					this._removeContactsWith(s);
				}
			} else {
				this.__removeContactsWith(target);
			}
		}

		__removeContactsWith(o) {
			if (!this.body) return;
			for (let ce = this.body.getContactList(); ce; ce = ce.next) {
				let c = ce.contact;
				if (c.m_fixtureA.m_body.sprite._uid == o._uid || c.m_fixtureB.m_body.sprite._uid == o._uid) {
					this.p.world.destroyContact(c);
				}
			}
		}

		/*
		 * Internal method called anytime a new sensor is created. Ensures
		 * that sensors are moved to the back of the fixture list.
		 */
		_sortFixtures() {
			let colliders = null;
			let sensors = null;
			let lastColl, lastSens;
			for (let fxt = this.fixtureList; fxt; fxt = fxt.getNext()) {
				if (fxt.m_isSensor) {
					if (!sensors) sensors = fxt;
					else sensors.m_next = fxt;
					lastSens = fxt;
				} else {
					if (!colliders) colliders = fxt;
					else colliders.m_next = fxt;
					lastColl = fxt;
				}
			}
			if (sensors) lastSens.m_next = null;
			if (colliders) lastColl.m_next = sensors;
			this.body.m_fixtureList = colliders || sensors;
		}

		/**
		 * This function is used internally if a sprite overlap detection
		 * function is called but the sprite has no overlap sensors.
		 *
		 * It creates sensor fixtures that are the same size as the sprite's
		 * colliders. If you'd like to add more sensors to a sprite, use the
		 * addSensor function.
		 */
		addDefaultSensors() {
			if (this._hasSensors) return;
			let shape;
			if (this.body && this.fixtureList) {
				for (let fxt = this.fixtureList; fxt; fxt = fxt.getNext()) {
					if (fxt.m_isSensor) continue;
					shape = fxt.m_shape;
					this.body.createFixture({
						shape: shape,
						isSensor: true
					});
				}
				this._sortFixtures();
			} else {
				this.addSensor();
			}
			this._hasSensors = true;
		}
	};

	// only used by the Netcode class to convert sprite data to binary
	// this should not be changed, users should add custom properties to
	// the sprite.customProperties object of individual sprites
	this.Sprite.propTypes = {
		x: 'Float64', // 0
		y: 'Float64', // 1
		vel: 'Vec2', // 2
		rotation: 'number', // 3
		rotationSpeed: 'number', // 4
		ani: 'string', // 5
		autoDraw: 'boolean', // 6
		allowSleeping: 'boolean', // 7
		autoUpdate: 'boolean', // 8
		bounciness: 'number', // 9
		collider: 'Uint8', // 10
		color: 'color', // 11
		debug: 'boolean', // 12
		density: 'number', // 13
		direction: 'number', // 14
		drag: 'number', // 15
		friction: 'number', // 16
		h: 'number', // 17 (height)
		isSuperFast: 'boolean', // 18
		layer: 'number', // 19
		life: 'Int32', // 20
		mass: 'number', // 21
		mirror: 'Vec2_boolean', // 22
		offset: 'Vec2', // 23
		pixelPerfect: 'boolean', // 24
		removed: 'boolean', // 25
		rotationDrag: 'number', // 26
		rotationLock: 'boolean', // 27
		scale: 'Vec2', // 28
		shape: 'Uint8', // 29
		sleeping: 'boolean', // 30
		stroke: 'color', // 31
		strokeWeight: 'number', // 32
		text: 'string', // 33
		textColor: 'color', // 34
		tile: 'string', // 35
		tileSize: 'number', // 36
		visible: 'boolean', // 37
		w: 'number', // 38 (width)
		bearing: 'number', // 39
		textSize: 'number', // 40
		textStroke: 'color', // 41
		textStrokeWeight: 'number' // 42
	};

	this.Sprite.props = Object.keys(this.Sprite.propTypes);

	// includes duplicates of some properties
	this.Sprite.propsAll = this.Sprite.props.concat([
		'd',
		'diameter',
		'dynamic',
		'fill',
		'height',
		'heading',
		'kinematic',
		'resetAnimationsOnChange',
		'speed',
		'static',
		'width'
	]);

	this.Sprite.colliderTypes = ['d', 's', 'k', 'n'];
	this.Sprite.shapeTypes = ['box', 'circle', 'chain', 'polygon'];

	// TODO: draw lines when the Turtle moves
	this.Turtle = function (size) {
		if (pInst.allSprites.tileSize > 1) {
			throw new Error(`Turtle can't be used when allSprites.tileSize is greater than 1.`);
		}
		size ??= 25;
		let t = new pInst.Sprite(size, size, [
			[size, size * 0.4],
			[-size, size * 0.4],
			[0, -size * 0.8]
		]);
		t.color = 'green';
		t._isTurtleSprite = true;
		t._prevPos = { x: t.x, y: t.y };
		let _move = t.move;
		t.move = async function () {
			this._prevPos.x = this.x;
			this._prevPos.y = this.y;
			await _move.call(this, ...arguments);
		};
		return t;
	};

	/**
	 * @class
	 * @extends Array<p5.Image>
	 */
	this.SpriteAnimation = class extends Array {
		/**
		 * <a href="https://p5play.org/learn/sprite_animation.html">
		 * Look at the Animation reference pages before reading these docs.
		 * </a>
		 *
		 * A SpriteAnimation object contains a series of images (p5.Image objects)
		 * that can be displayed sequentially.
		 *
		 * A sprite can have multiple labeled animations, see Sprite.addAnimation
		 * and Sprite.changeAnimation, but you can also create animations that
		 * can be used without being added to a sprite first.
		 *
		 * The SpriteAnimation constructor can be used in multiple ways.
		 * An animation can be created either from a list of images or sequentially
		 * numbered images. p5play will try to detect the sequence pattern.
		 *
		 * For example if the image file path is "image1.png" and the last frame
		 * index is 3 then "image2.png" and "image3.png" will be loaded as well.
		 *
		 * @param {...p5.Image} ...images - p5.Image objects to be used as frames
		 * @example
		 * let shapeShifter = new SpriteAnimation("dog.png", "cat.png", "snake.png");
		 */
		constructor() {
			super();
			this.p = pInst;
			let args = [...arguments];

			/**
			 * The name of the animation
			 * @type {String}
			 */
			this.name = 'default';

			let owner;

			if (typeof args[0] == 'object' && (args[0]._isSprite || args[0]._isGroup)) {
				owner = args[0];
				args = args.slice(1);
				this._addedToSpriteOrGroup = true;
			}
			owner ??= this.p.allSprites;

			if (typeof args[0] == 'string' && (args[0].length == 1 || !args[0].includes('.'))) {
				this.name = args[0];
				args = args.slice(1);
			}

			/**
			 * The index of the current frame that the animation is on.
			 * @type {Number}
			 */
			this._frame = 0;

			this._cycles = 0;

			this.targetFrame = -1;

			/**
			 * The offset is how far the animation should be placed from
			 * the location it is played at.
			 * @type {Object}
			 * @example
			 * ani.offset.x = 16;
			 */
			this.offset = { x: owner.anis.offset.x || 0, y: owner.anis.offset.y || 0 };

			this._frameDelay = owner.anis.frameDelay || 4;

			this.demoMode = owner.anis.demoMode || false;

			/**
			 * True if the animation is currently playing.
			 * @type {Boolean}
			 * @default true
			 */
			this.playing = true;

			/**
			 * Animation visibility.
			 * @type {Boolean}
			 * @default true
			 */
			this.visible = true;

			/**
			 * If set to false the animation will stop after reaching the last frame
			 * @type {Boolean}
			 * @default true
			 */
			this.looping = owner.anis.looping;
			this.looping ??= true;

			/**
			 * Ends the loop on frame 0 instead of the last frame.
			 * This is useful for animations that are symmetric.
			 * For example a walking cycle where the first frame is the
			 * same as the last frame.
			 * @type {Boolean}
			 * @default false
			 */
			this.endOnFirstFrame = false;

			/**
			 * True if frame changed during the last draw cycle
			 * @type {Boolean}
			 */
			this.frameChanged = false;

			this.onComplete = this.onChange = null;
			this._onComplete = this._onChange = null;

			this.rotation = owner.anis.rotation || 0;
			this._scale = new Scale();

			if (args.length == 0 || typeof args[0] == 'number') return;

			owner.animations[this.name] = this;
			owner._ani = this;

			// list mode images can be added as a list of arguments or an array
			if (Array.isArray(args[0]) && typeof args[0][0] == 'string') {
				args = [...args[0]];
			}

			// sequence mode
			if (
				args.length == 2 &&
				typeof args[0] == 'string' &&
				(typeof args[1] == 'string' || typeof args[1] == 'number')
			) {
				let from = args[0];
				let to, num2;
				if (!isNaN(args[1])) num2 = Number(args[1]);
				else to = args[1];

				// print("sequence mode "+from+" -> "+to);

				// make sure the extensions are fine
				if (from.slice(-4) != '.png' || (to && to.slice(-4) != '.png')) {
					throw new FriendlyError('SpriteAnimation', 0, [from]);
				}

				let digits1 = 0;
				let digits2 = 0;

				// skip extension work backwards to find the numbers
				for (let i = from.length - 5; i >= 0; i--) {
					if (!isNaN(from.charAt(i))) digits1++;
					else break;
				}

				if (to) {
					for (let i = to.length - 5; i >= 0; i--) {
						if (!isNaN(to.charAt(i))) digits2++;
						else break;
					}
				}

				let prefix1 = from.slice(0, -4 - digits1);
				let prefix2;
				if (to) prefix2 = to.slice(0, -4 - digits2);

				// images don't belong to the same sequence
				// they are just two separate images with numbers
				if (to && prefix1 != prefix2) {
					this.push(this.p.loadImage(from));
					this.push(this.p.loadImage(to));
				} else {
					// Our numbers likely have leading zeroes, which means that some
					// browsers (e.g., PhantomJS) will interpret them as base 8 (octal)
					// instead of decimal. To fix this, we'll explicity tell parseInt to
					// use a base of 10 (decimal). For more details on this issue, see
					// http://stackoverflow.com/a/8763427/2422398.
					let num1 = parseInt(from.slice(-4 - digits1, -4), 10);
					num2 ??= parseInt(to.slice(-4 - digits2, -4), 10);

					// swap if inverted
					if (num2 < num1) {
						let t = num2;
						num2 = num1;
						num1 = t;
					}

					let fileName;
					if (!to || digits1 == digits2) {
						// load all images
						for (let i = num1; i <= num2; i++) {
							// Use nf() to number format 'i' into the amount of digits
							// ex: 14 with 4 digits is 0014
							fileName = prefix1 + this.p.nf(i, digits1) + '.png';
							this.push(this.p.loadImage(fileName));
						}
					} // case: case img1, img2
					else {
						for (let i = num1; i <= num2; i++) {
							// Use nf() to number format 'i' into four digits
							fileName = prefix1 + i + '.png';
							this.push(this.p.loadImage(fileName));
						}
					}
				}
			} // end sequence mode

			// SpriteSheet mode
			else if (typeof args[args.length - 1] != 'string' && !(args[args.length - 1] instanceof p5.Image)) {
				let sheet = owner.spriteSheet;
				let atlas;
				if (args[0] instanceof p5.Image || typeof args[0] == 'string') {
					if (args.length >= 3) {
						throw new FriendlyError('SpriteAnimation', 1);
					}
					sheet = args[0];
					atlas = args[1];
				} else {
					atlas = args[0];
				}

				let _this = this;

				if (sheet instanceof p5.Image && sheet.width != 1 && sheet.height != 1) {
					this.spriteSheet = sheet;
					_generateSheetFrames();
				} else {
					let url;
					if (typeof sheet == 'string') url = sheet;
					else url = sheet.url;
					this.spriteSheet = this.p.loadImage(url, () => {
						_generateSheetFrames();
					});
				}

				function _generateSheetFrames() {
					if (Array.isArray(atlas) || Array.isArray(atlas.frames)) {
						if (typeof atlas[0] == 'number') {
							if (atlas.length == 4) {
								atlas = { pos: atlas.slice(0, 2), size: atlas.slice(2) };
							} else {
								atlas = { pos: atlas };
							}
						} else {
							let frames = atlas;
							if (Array.isArray(atlas.frames)) {
								frames = atlas.frames;
								delete atlas.frames;
								for (let i = 0; i < frames.length; i++) {
									frames[i] = {
										pos: frames[i]
									};
									Object.assign(frames[i], atlas);
								}
							}
							for (let frame of frames) {
								atlas = frame;
								_generateSheetFrames();
							}
							return;
						}
					}

					let {
						w,
						h,
						width,
						height,
						size,
						row,
						col,
						line,
						x,
						y,
						pos,
						frames,
						frameCount,
						frameDelay,
						frameSize,
						delay,
						rotation
					} = atlas;
					frameSize ??= size || owner.anis.frameSize;
					if (delay) _this.frameDelay = delay;
					if (frameDelay) _this.frameDelay = frameDelay;
					if (rotation) _this.rotation = rotation;
					frameCount ??= frames || 1;
					w ??= width || owner.anis.w;
					h ??= height || owner.anis.h;
					x ??= col || 0;
					y ??= line || row || 0;
					if (pos) {
						x = pos[0];
						y = pos[1];
					}

					if (typeof frameSize == 'number') {
						w = h = frameSize;
					} else if (frameSize) {
						w = frameSize[0];
						h = frameSize[1];
					}

					let tileSize = owner.tileSize;

					if (!w || !h) {
						// sprites will be given default dimensions, but groups
						// are not, _dimensionsUndef is only for sprites
						if (!owner._dimensionsUndef && owner.w && owner.h) {
							w = owner.w;
							h = owner.h;
						} else if (tileSize) {
							w = h = tileSize;
						} else if (frameCount) {
							w = _this.spriteSheet.width / frameCount;
							h = _this.spriteSheet.height;
						} else {
							if (_this.spriteSheet.width < _this.spriteSheet.height) {
								w = h = _this.spriteSheet.width;
							} else {
								w = h = _this.spriteSheet.height;
							}
						}
					} else {
						w *= tileSize;
						h *= tileSize;
					}

					// get the real dimensions and position of the frame
					// in the sheet
					if (tileSize != 1) {
						x *= tileSize;
						y *= tileSize;
					} else if (line !== undefined || row !== undefined || col !== undefined) {
						x *= w;
						y *= h;
					}

					// add all the frames in the animation to the frames array
					for (let i = 0; i < frameCount; i++) {
						_this.push({ x, y, w, h });
						x += w;
						if (x >= _this.spriteSheet.width) {
							x = 0;
							y += h;
							if (y >= _this.spriteSheet.height) y = 0;
						}
					}
				}
			} // end SpriteSheet mode
			else {
				// list of images
				for (let i = 0; i < args.length; i++) {
					if (args[i] instanceof p5.Image) this.push(args[i]);
					else this.push(this.p.loadImage(args[i]));
				}
			}
		}

		get frame() {
			return this._frame;
		}
		set frame(val) {
			if (val < 0 || val >= this.length) {
				throw new FriendlyError('SpriteAnimation.frame', [val, this.length]);
			}
			this._frame = val;
		}

		/**
		 * Delay between frames in number of draw cycles.
		 * If set to 4 the framerate of the animation would be the
		 * sketch framerate divided by 4 (60fps = 15fps)
		 * @type {Number}
		 * @default 4
		 */
		get frameDelay() {
			return this._frameDelay;
		}
		set frameDelay(val) {
			if (val <= 0) val = 1;
			this._frameDelay = val;
		}
		/**
		 * TODO frameRate
		 * Another way to set the animation's frame delay.
		 */
		// get frameRate() {

		// }
		// set frameRate(val) {

		// }

		/**
		 * The animation's scale.
		 *
		 * Can be set to a number to scale both x and y
		 * or an object with x and/or y properties.
		 * @type {Number|Object}
		 * @default 1
		 */
		get scale() {
			return this._scale;
		}
		set scale(val) {
			if (typeof val == 'number') {
				val = { x: val, y: val };
			}
			this._scale._x = val.x;
			this._scale._y = val.y;
			this._scale._avg = val.x;
		}

		/**
		 * Make a copy of the animation.
		 *
		 * @return {SpriteAnimation} A copy of the animation.
		 */
		clone() {
			if (!this.length) {
				console.error(
					`The animation named "${this.name}" must be loaded before it can be properly copied. Sprites need their own copy of a group's animation. Try loading the animation in the preload function and creating new group sprites in the setup function.`
				);
			}
			let ani = new this.p.SpriteAnimation();
			ani.spriteSheet = this.spriteSheet;
			for (let i = 0; i < this.length; i++) {
				ani.push(this[i]);
			}
			ani.name = this.name;
			ani.offset.x = this.offset.x;
			ani.offset.y = this.offset.y;
			ani.frameDelay = this.frameDelay;
			ani.playing = this.playing;
			ani.looping = this.looping;
			ani.rotation = this.rotation;
			return ani;
		}

		/**
		 * Draws the animation at coordinate x and y.
		 * Updates the frames automatically.
		 *
		 * Optional parameters effect the current draw cycle only and
		 * are not saved between draw cycles.
		 *
		 * @param {Number} x horizontal position
		 * @param {Number} y vertical position
		 * @param {Number} [r] rotation
		 * @param {Number} [sx] scale x
		 * @param {Number} [sy] scale y
		 */
		draw(x, y, r, sx, sy) {
			this.x = x || 0;
			this.y = y || 0;

			if (!this.visible) return;

			sx ??= 1;
			sy ??= 1;

			this.p.push();
			this.p.imageMode('center');
			this.p.translate(this.x, this.y);
			this.p.rotate(r || this.rotation);
			this.p.scale(sx * this._scale._x, sy * this._scale._y);
			let img = this[this._frame];
			if (img !== undefined) {
				if (this.spriteSheet) {
					let { x, y, w, h } = img; // image info
					if (!this.demoMode) {
						this.p.image(this.spriteSheet, this.offset.x, this.offset.y, w, h, x, y, w, h);
					} else {
						this.p.image(
							this.spriteSheet,
							this.offset.x,
							this.offset.y,
							this.spriteSheet.w,
							this.spriteSheet.h,
							x - this.spriteSheet.w / 2 + w / 2,
							y - this.spriteSheet.h / 2 + h / 2
						);
					}
				} else {
					this.p.image(img, this.offset.x, this.offset.y);
				}
			} else {
				log(
					'Warning: ' +
						this.name +
						' animation not loaded yet or frame ' +
						this._frame +
						' does not exist. Load this animation in the p5.js preload function if you need to use it at the start of your program.'
				);
			}

			this.p.pop();
		}

		update() {
			this._cycles++;
			let previousFrame = this._frame;
			this.frameChanged = false;

			//go to frame
			if (this.length === 1) {
				this.playing = false;
				this._frame = 0;
			}

			if (this.playing && this._cycles % this.frameDelay === 0) {
				this.frameChanged = true;

				if ((this.targetFrame == -1 && this._frame == this.lastFrame) || this._frame == this.targetFrame) {
					if (this.endOnFirstFrame) this._frame = 0;
					if (this.looping) this.targetFrame = -1;
					else this.playing = false;
					if (this._onComplete) this._onComplete();
					if (this.onComplete) this.onComplete(); //fire when on last frame
					if (!this.looping) return;
				}

				//going to target frame up
				if (this.targetFrame > this._frame && this.targetFrame !== -1) {
					this._frame++;
				}
				//going to target frame down
				else if (this.targetFrame < this._frame && this.targetFrame !== -1) {
					this._frame--;
				} else if (this.targetFrame === this._frame && this.targetFrame !== -1) {
					this.playing = false;
				} else if (this.looping) {
					//advance frame
					//if next frame is too high
					if (this._frame >= this.lastFrame) {
						this._frame = 0;
					} else this._frame++;
				} else {
					//if next frame is too high
					if (this._frame < this.lastFrame) this._frame++;
				}
			}
		}

		/**
		 * Plays the animation, starting from the specified frame.
		 *
		 * @returns [Promise] a promise that resolves when the animation completes
		 */
		play(frame) {
			this.playing = true;
			if (frame !== undefined) this._frame = frame;
			this.targetFrame = -1;
			return new Promise((resolve) => {
				this._onComplete = () => {
					this._onComplete = null;
					resolve();
				};
			});
		}

		/**
		 * Pauses the animation.
		 */
		pause(frame) {
			this.playing = false;
			if (frame) this._frame = frame;
		}

		/**
		 * Stops the animation. Alt for pause.
		 */
		stop(frame) {
			this.playing = false;
			if (frame) this._frame = frame;
		}

		/**
		 * Plays the animation backwards.
		 * Equivalent to ani.goToFrame(0)
		 *
		 * @returns [Promise] a promise that resolves when the animation completes
		 * rewinding
		 */
		rewind() {
			this.looping = false;
			return this.goToFrame(0);
		}

		/**
		 * Plays the animation forwards and loops it.
		 */
		loop() {
			this.looping = true;
			this.playing = true;
		}

		/**
		 * Prevents the animation from looping
		 */
		noLoop() {
			this.looping = false;
		}

		/**
		 * Goes to the next frame and stops.
		 */
		nextFrame() {
			if (this._frame < this.length - 1) this._frame = this._frame + 1;
			else if (this.looping) this._frame = 0;

			this.targetFrame = -1;
			this.playing = false;
		}

		/**
		 * Goes to the previous frame and stops.
		 */
		previousFrame() {
			if (this._frame > 0) this._frame = this._frame - 1;
			else if (this.looping) this._frame = this.length - 1;

			this.targetFrame = -1;
			this.playing = false;
		}

		/**
		 * Plays the animation forward or backward toward a target frame.
		 *
		 * @param {Number} toFrame Frame number destination (starts from 0)
		 * @returns [Promise] a promise that resolves when the animation completes
		 */
		goToFrame(toFrame) {
			if (toFrame < 0 || toFrame >= this.length) {
				return;
			}

			// targetFrame gets used by the update() method to decide what frame to
			// select next.  When it's not being used it gets set to -1.
			this.targetFrame = toFrame;

			if (this.targetFrame !== this._frame) {
				this.playing = true;
			}
			return new Promise((resolve) => {
				this._onComplete = () => {
					this._onComplete = null;
					resolve();
				};
			});
		}

		/**
		 * The index of the last frame. Read only.
		 * @type {Number}
		 */
		get lastFrame() {
			return this.length - 1;
		}

		/**
		 * The current frame as p5.Image. Read only.
		 * @type {p5.Image}
		 */
		get frameImage() {
			let f = this._frame;
			let img = this[f];
			if (img instanceof p5.Image) return img;

			let { x, y, w, h } = img; // image info

			let image = this.p.createImage(w, h);
			image.copy(this.spriteSheet, this.offset.x, this.offset.y, w, h, x, y, w, h);
			return image;
		}

		/**
		 * Width of the animation.
		 * @type {Number}
		 */
		get w() {
			return this.width;
		}
		/**
		 * Width of the animation.
		 * @type {Number}
		 */
		get width() {
			if (this[this._frame] instanceof p5.Image) {
				return this[this._frame].width;
			} else if (this[this._frame]) {
				return this[this._frame].w;
			}
			return 1;
		}

		/**
		 * Height of the animation.
		 * @type {Number}
		 */
		get h() {
			return this.height;
		}
		/**
		 * Height of the animation.
		 * @type {Number}
		 */
		get height() {
			if (this[this._frame] instanceof p5.Image) {
				return this[this._frame].height;
			} else if (this[this._frame]) {
				return this[this._frame].h;
			}
			return 1;
		}

		/**
		 * Deprecated. Use the animation object itself, which is an array of frames.
		 *
		 * The frames of the animation. Read only.
		 * @deprecated
		 * @type {p5.Image[]}
		 */
		get frames() {
			let frames = [];
			for (let i = 0; i < this.length; i++) {
				frames.push(this[i]);
			}
			return frames;
		}
	};

	this.SpriteAnimation.props = ['frameDelay', 'frameSize', 'looping', 'offset', 'rotation', 'scale', 'demoMode'];

	/**
	 * This SpriteAnimations class serves the same role that Group does
	 * for Sprites. This class is used interally to create `sprite.anis`
	 * and `group.anis`. It's not intended to be used directly by p5play users.
	 *
	 * In instance objects of this class, the keys are animation names,
	 * values are SpriteAnimation objects.
	 *
	 * Because users only expect instances of this class to contain
	 * animation names as keys, it uses an internal private object
	 * `#_` to store animation properties. Getters and setters are used to
	 * access the private properties, enabling dynamic inheritance.
	 *
	 * @private
	 */
	this.SpriteAnimations = class {
		#_ = {};
		constructor() {
			let _this = this;

			let props = [...pInst.SpriteAnimation.props];
			let vecProps = ['offset', 'scale'];

			for (let prop of props) {
				Object.defineProperty(this, prop, {
					get() {
						return _this.#_[prop];
					},
					set(val) {
						_this.#_[prop] = val;

						// change the prop in all the sprite of this group
						for (let k in _this) {
							let x = _this[k];
							if (!(x instanceof SpriteAnimation)) continue;
							x[prop] = val;
						}
					}
				});
			}

			for (let vecProp of vecProps) {
				this.#_[vecProp] = {
					_x: 0,
					_y: 0
				};
				for (let prop of ['x', 'y']) {
					Object.defineProperty(this.#_[vecProp], prop, {
						get() {
							return _this.#_[vecProp]['_' + prop];
						},
						set(val) {
							_this.#_[vecProp]['_' + prop] = val;

							for (let k in _this) {
								let x = _this[k];
								if (!(x instanceof SpriteAnimation)) continue;
								x[vecProp][prop] = val;
							}
						}
					});
				}
			}
		}
	};

	/**
	 * @class
	 * @extends Array<Sprite>
	 */
	this.Group = class extends Array {
		/**
		 * <a href="https://p5play.org/learn/group.html">
		 * Look at the Group reference pages before reading these docs.
		 * </a>
		 *
		 * A Group is a collection of sprites with similar traits and behaviors.
		 *
		 * For example a group may contain all the coin sprites that the
		 * player can collect.
		 *
		 * Group extends Array. You can use them in for loops just like arrays
		 * since they inherit all the functions and properties of standard
		 * arrays such as `group.length` and functions like `group.includes()`.
		 *
		 * Since groups just contain references to sprites, a sprite can be in
		 * multiple groups.
		 *
		 * `sprite.remove()` removes the sprite from all the groups
		 * it belongs to. `group.removeAll()` removes all the sprites from
		 * a group.
		 *
		 * The top level group is a p5 instance level variable named
		 * `allSprites` that contains all the sprites added to the sketch.
		 */
		constructor(...args) {
			let parent;
			if (args[0] instanceof pInst.Group) {
				parent = args[0];
				args = args.slice(1);
			}
			super(...args);
			this.p = pInst;

			if (typeof args[0] == 'number') return;
			for (let s of this) {
				if (!(s instanceof this.p.Sprite)) {
					throw new Error('A group can only contain sprites');
				}
			}

			this._isGroup = true;

			/**
			 * @type {Number}
			 */
			this.x;
			/**
			 * @type {Number}
			 */
			this.y;
			/**
			 * @type {Number}
			 */
			this.vel;
			/**
			 * @type {Number}
			 */
			this.rotation;
			/**
			 * @type {Number}
			 */
			this.rotationSpeed;
			/**
			 * @type {Boolean}
			 */
			this.autoDraw;
			/**
			 * @type {Boolean}
			 */
			this.allowSleeping;
			/**
			 * @type {Number}
			 */
			this.autoUpdate;
			/**
			 * @type {Number}
			 */
			this.bounciness;
			/**
			 * @type {Number}
			 */
			this.collider;
			/**
			 * @type {Number}
			 */
			this.color;
			/**
			 * @type {Boolean}
			 */
			this.debug;
			/**
			 * @type {Number}
			 */
			this.density;
			/**
			 * @type {Number}
			 */
			this.direction;
			/**
			 * @type {Number}
			 */
			this.drag;
			/**
			 * @type {Number}
			 */
			this.friction;
			/**
			 * @type {Number}
			 */
			this.h;
			/**
			 * @type {Boolean}
			 */
			this.isSuperFast;
			/**
			 * @type {Number}
			 */
			this.layer;
			/**
			 * @type {Number}
			 */
			this.life;
			/**
			 * @type {Number}
			 */
			this.mass;
			/**
			 * @type {Object}
			 */
			this.mirror;
			/**
			 * @type {p5.Vector}
			 */
			this.offset;
			/**
			 * @type {Boolean}
			 */
			this.pixelPerfect;
			/**
			 * @type {Boolean}
			 */
			this.removed;
			/**
			 * @type {Number}
			 */
			this.rotationDrag;
			/**
			 * @type {Boolean}
			 */
			this.rotationLock;
			/**
			 * @type {p5.Vector}
			 */
			this.scale;
			/**
			 * @type {Number}
			 */
			this.shape;
			/**
			 * @type {Boolean}
			 */
			this.sleeping;
			/**
			 * @type {p5.Color}
			 */
			this.stroke;
			/**
			 * @type {Number}
			 */
			this.strokeWeight;
			/**
			 * @type {Number}
			 */
			this.text;
			/**
			 * @type {p5.Color}
			 */
			this.textColor;
			/**
			 * @type {String}
			 */
			this.tile;
			/**
			 * @type {Number}
			 */
			this.tileSize;
			/**
			 * @type {Boolean}
			 */
			this.visible;
			/**
			 * @type {Number}
			 */
			this.w;
			/**
			 * @type {Number}
			 */
			this.bearing;
			/**
			 * @type {Number}
			 */
			this.d;
			/**
			 * @type {Number}
			 */
			this.diameter;
			/**
			 * @type {Boolean}
			 */
			this.dynamic;
			/**
			 * @type {Number}
			 */
			this.height;
			/**
			 * @type {String}
			 */
			this.heading;
			/**
			 * @type {Boolean}
			 */
			this.kinematic;
			/**
			 * @type {Boolean}
			 */
			this.resetAnimationsOnChange;
			/**
			 * @type {Number}
			 */
			this.speed;
			/**
			 * @type {Boolean}
			 */
			this.static;
			/**
			 * @type {Number}
			 */
			this.width;

			/**
			 * Each group has a unique id number. Don't change it!
			 * Its useful for debugging.
			 * @type {Number}
			 */
			this.idNum;

			if (this.p.p5play.groupsCreated < 999) {
				this.idNum = this.p.p5play.groupsCreated;
			} else {
				// find the first empty slot in the groups array
				for (let i = 1; i < this.p.p5play.groups.length; i++) {
					if (!this.p.p5play.groups[i]?.removed) {
						this.idNum = i;
						break;
					}
				}
				if (!this.idNum) {
					console.warn(
						'ERROR: Surpassed the limit of 999 groups in memory. Use less groups or delete groups from the p5play.groups array to recycle ids.'
					);
					// if there are no empty slots, try to prevent a crash by
					// finding the first slot that has a group with no sprites in it
					for (let i = 1; i < this.p.p5play.groups.length; i++) {
						if (!this.p.p5play.groups[i].length) {
							this.idNum = i;
							break;
						}
					}
					this.idNum ??= 1;
				}
			}

			this._uid = this.idNum;
			this.p.p5play.groups[this._uid] = this;
			this.p.p5play.groupsCreated++;

			// if the allSprites group doesn't exist yet,
			// this group must be the allSprites group!
			if (!this.p.allSprites) this._isAllSpritesGroup = true;

			/**
			 * Groups can have subgroups, which inherit the properties
			 * of their parent groups.
			 * @type {Group[]}
			 * @default []
			 */
			this.subgroups = [];

			/**
			 * The parent group's uid number.
			 * @type {Number}
			 * @default undefined
			 */
			if (parent instanceof this.p.Group) {
				parent.subgroups.push(this);
				let p = parent;
				do {
					p = this.p.p5play.groups[p.parent];
					p.subgroups.push(this);
				} while (!p._isAllSpritesGroup);
				this.parent = parent._uid;
			} else if (!this._isAllSpritesGroup) {
				this.p.allSprites.subgroups.push(this);
				this.parent = 0;
			}

			/**
			 * Keys are the animation label, values are SpriteAnimation objects.
			 * @type {SpriteAnimations}
			 */
			this.animations = new this.p.SpriteAnimations();

			this._hasOverlap = {};
			this._collisions = {};
			this._overlappers = {};

			let _this = this;

			this.Sprite = class extends this.p.Sprite {
				constructor() {
					super(_this, ...arguments);
				}
			};
			/**
			 * @class
			 */
			this.GroupSprite = this.Sprite;

			// JSDoc breaks if I don't put @class for GroupSprite
			// but for typescript defs they should be typeof Sprite
			// and get replaced as such by the p5play-types build.js script

			this.Group = class extends this.p.Group {
				constructor() {
					super(_this, ...arguments);
				}
			};
			/**
			 * @class
			 */
			this.Subgroup = this.Group;

			this.mouse = {
				presses: null,
				pressing: null,
				pressed: null,
				holds: null,
				holding: null,
				held: null,
				released: null,
				hovers: null,
				hovering: null,
				hovered: null
			};
			for (let state in this.mouse) {
				this.mouse[state] = function (inp) {
					for (let s of _this) {
						if (s.mouse[state](inp)) return true;
					}
					return false;
				};
			}

			let props = [...this.p.Sprite.propsAll, 'spriteSheet'];
			for (let prop of props) {
				if (prop == 'ani' || prop == 'velocity') continue;

				Object.defineProperty(this, prop, {
					get() {
						let val = _this['_' + prop];
						let i = _this.length - 1;
						if (val === undefined && !_this._isAllSpritesGroup) {
							let parent = this.p.p5play.groups[_this.parent];
							if (parent) {
								val = parent[prop];
								i = parent.length - 1;
							}
						}
						return val;
					},
					set(val) {
						_this['_' + prop] = val;

						// change the prop in all the sprite of this group
						for (let i = 0; i < _this.length; i++) {
							let s = _this[i];
							let v = val;
							if (typeof val == 'function') v = val(i);
							s[prop] = v;
						}
					}
				});
			}

			let vecProps = ['mirror', 'offset', 'scale', 'vel'];
			for (let vecProp of vecProps) {
				vecProp = '_' + vecProp;
				if (vecProp != 'vel') this[vecProp] = {};
				else this[vecProp] = new this.p.Vector();
				this[vecProp]._x = 0;
				this[vecProp]._y = 0;
				for (let prop of ['x', 'y']) {
					Object.defineProperty(this[vecProp], prop, {
						get() {
							let val = _this[vecProp]['_' + prop];
							let i = _this.length - 1;
							if (val === undefined && !_this._isAllSpritesGroup) {
								let parent = _this.p.p5play.groups[_this.parent];
								if (parent) {
									val = parent[vecProp][prop];
									i = parent.length - 1;
								}
							}
							return val;
						},
						set(val) {
							_this[vecProp]['_' + prop] = val;

							// change the prop in all the sprite of this group
							for (let i = 0; i < _this.length; i++) {
								let s = _this[i];
								let v = val;
								if (typeof val == 'function') v = val(i);
								s[vecProp][prop] = v;
							}
						}
					});
				}
			}

			if (this._isAllSpritesGroup) {
				/**
				 * autoCull is a property of the allSprites group only,
				 * that controls whether sprites are automatically removed
				 * when they are 10,000 pixels away from the camera.
				 *
				 * It only needs to be set to false once and then it will
				 * remain false for the rest of the sketch, unless changed.
				 * @type {Boolean}
				 */
				this.autoCull = true;
				this.tileSize = 1;
				this.autoDraw = true;
				this.autoUpdate = true;
			}

			/**
			 * Adds a sprite to the end of the group.
			 *
			 * Alias for `push`, the standard JS Array function for
			 * adding to an array.
			 *
			 * @memberof Group
			 * @instance
			 * @func add
			 * @param {...Sprite} sprites
			 * @return {Number} The new length of the group
			 */
			this.add = this.push;

			/**
			 * Check if a sprite is in the group.
			 *
			 * @memberof Group
			 * @instance
			 * @func includes
			 * @param {Sprite} sprite
			 * @return {Number} index of the sprite or -1 if not found
			 */

			/**
			 * Alias for group.includes
			 */
			this.contains = this.includes;
		}

		/*
		 * Returns the highest layer in a group
		 */
		_getTopLayer() {
			if (this.length == 0) return 0;
			if (this.length == 1 && this[0]._layer === undefined) return 0;
			let max = this[0]._layer;
			for (let s of this) {
				if (s._layer > max) max = s._layer;
			}
			return max;
		}

		/**
		 * Reference to the group's current animation.
		 * @type {SpriteAnimation}
		 */
		get ani() {
			return this._ani;
		}
		set ani(val) {
			this.addAni(val);
			for (let s of this) s.changeAni(val);
		}
		/**
		 * Reference to the group's current animation.
		 * @type {SpriteAnimation}
		 */
		get animation() {
			return this._ani;
		}
		set animation(val) {
			this.ani = val;
		}

		/**
		 * The group's animations.
		 * @type {SpriteAnimations}
		 */
		get anis() {
			return this.animations;
		}
		/**
		 * Reference to the group's current image.
		 * @type {p5.Image}
		 */
		get img() {
			return this._ani.frameImage;
		}
		set img(val) {
			this.ani = val;
		}
		/**
		 * Reference to the group's current image.
		 * @type {p5.Image}
		 */
		get image() {
			return this._ani.frameImage;
		}
		set image(val) {
			this.ani = val;
		}
		/**
		 * Depending on the value that the amount property is set to, the group will
		 * either add or remove sprites.
		 * @type {Number}
		 */
		set amount(val) {
			let diff = val - this.length;
			let shouldAdd = diff > 0;
			diff = Math.abs(diff);
			for (let i = 0; i < diff; i++) {
				if (shouldAdd) new this.Sprite();
				else this[this.length - 1].remove();
			}
		}

		/**
		 * The sprite's velocity vector {x, y}
		 * @type {p5.Vector}
		 * @default {x: 0, y: 0}
		 */
		get velocity() {
			return this.vel;
		}
		set velocity(val) {
			this.vel = val;
		}

		_resetCentroid() {
			let x = 0;
			let y = 0;
			for (let s of this) {
				x += s.x;
				y += s.y;
			}
			this.centroid = { x: x / this.length, y: y / this.length };
			return this.centroid;
		}

		_resetDistancesFromCentroid() {
			for (let s of this) {
				s.distCentroid = {
					x: s.x - this.centroid.x,
					y: s.y - this.centroid.y
				};
			}
		}

		_validateCollideParams(target, cb) {
			if (cb && typeof cb != 'function') {
				throw new FriendlyError('Group.collide', 1, [cb]);
			}
			if (!target) {
				throw new FriendlyError('Group.collide', 2);
			}
			if (!target._isGroup && !target._isSprite) {
				throw new FriendlyError('Group.collide', 0, [target]);
			}
		}

		_setContactCB(target, cb, contactType, eventType) {
			if (target._isSprite) {
				let reversedCB = function (a, b, v) {
					return cb.call(b, b, a, v);
				};
				target._setContactCB(this, reversedCB, contactType, eventType);
				return;
			}

			let type;
			if (contactType == 0) type = eventTypes._collisions[eventType];
			else type = eventTypes._overlappers[eventType];

			let ledger = this.p.p5play[type];

			let l = (ledger[this._uid] ??= {});

			if (l[target._uid] == cb) return;
			l[target._uid] = cb;
			for (let s of this) {
				let c2 = (ledger[s._uid] ??= {});
				c2[target._uid] = cb;
			}

			if (this._uid == target._uid) return;

			l = ledger[target._uid];
			if (!l || !l[this._uid]) return;
			if (this._uid != target._uid) delete l[this._uid];
			for (let s of target) {
				l = ledger[s._uid];
				if (!l || !l[this._uid]) continue;
				delete l[this._uid];
				if (Object.keys(l).length == 0) {
					delete ledger[s._uid];
				}
			}
			if (Object.keys(l).length == 0) {
				delete ledger[target._uid];
			}
		}

		_ensureCollide(target) {
			if (this._hasOverlap[target._uid] !== false) {
				this._hasOverlap[target._uid] = false;
				for (let s of this) {
					s._hasOverlap[target._uid] = false;
					target._hasOverlap[s._uid] = false;
					// if this group is the same group as the target
					if (this._uid == target._uid) {
						for (let s2 of target) {
							s._hasOverlap[s2._uid] = false;
							s2._hasOverlap[s._uid] = false;
						}
					}
				}
			}
			if (target._hasOverlap[this._uid] !== false) {
				target._hasOverlap[this._uid] = false;
				if (target._isGroup) {
					for (let s of target) {
						s._hasOverlap[this._uid] = false;
						this._hasOverlap[s._uid] = false;
						for (let s2 of this) {
							s._hasOverlap[s2._uid] = false;
							s2._hasOverlap[s._uid] = false;
						}
					}
				}
			}
		}

		collide(target, callback) {
			return this.collides(target, callback);
		}

		/**
		 * Returns true on the first frame that the group collides with the
		 * target group.
		 *
		 * Custom collision event handling can be done by using this function
		 * in an if statement or adding a callback as the second parameter.
		 *
		 * @param {Group} target
		 * @param {Function} [callback]
		 */
		collides(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 0);
			return this._collisions[target._uid] == 1 || this._collisions[target._uid] <= -3;
		}

		/**
		 * Returns the amount of frames that the group has been colliding
		 * with the target group for, which is a truthy value. Returns 0 if
		 * the group is not colliding with the target group.
		 *
		 * @param {Group} target
		 * @param {Function} [callback]
		 * @return {Number} frames
		 */
		colliding(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 1);
			let val = this._collisions[target._uid];
			if (val <= -3) return 1;
			return val > 0 ? val : 0;
		}

		/**
		 * Returns true on the first frame that the group no longer overlaps
		 * with the target group.
		 *
		 * @param {Group} target
		 * @param {Function} [callback]
		 * @return {Boolean}
		 */
		collided(target, callback) {
			this._validateCollideParams(target, callback);
			this._ensureCollide(target);
			if (callback) this._setContactCB(target, callback, 0, 2);
			return this._collisions[target._uid] <= -1;
		}

		_validateOverlapParams(target, cb) {
			if (cb && typeof cb != 'function') {
				throw new FriendlyError('Group.overlap', 1, [cb]);
			}
			if (!target) {
				throw new FriendlyError('Group.overlap', 2);
			}
			if (!target._isGroup && !target._isSprite) {
				throw new FriendlyError('Group.overlap', 0, [target]);
			}
		}

		_ensureOverlap(target) {
			if (!this._hasSensors) {
				for (let s of this) {
					if (!s._hasSensors) s.addDefaultSensors();
				}
				this._hasSensors = true;
			}
			if (!target._hasSensors) {
				if (target._isSprite) {
					target.addDefaultSensors();
				} else {
					for (let s of target) {
						if (!s._hasSensors) s.addDefaultSensors();
					}
					target._hasSensors = true;
				}
			}
			if (this._hasOverlap[target._uid] != true) {
				this._removeContactsWith(target);
				this._hasOverlap[target._uid] = true;
				for (let s of this) {
					s._hasOverlap[target._uid] = true;
					target._hasOverlap[s._uid] = true;
					// if this group is the same group as the target
					if (this._uid == target._uid) {
						for (let s2 of target) {
							s._hasOverlap[s2._uid] = true;
							s2._hasOverlap[s._uid] = true;
						}
					}
				}
			}
			if (target._hasOverlap[this._uid] != true) {
				target._removeContactsWith(this);
				target._hasOverlap[this._uid] = true;
				if (target._isGroup) {
					for (let s of target) {
						s._hasOverlap[this._uid] = true;
						this._hasOverlap[s._uid] = true;
						for (let s2 of this) {
							s._hasOverlap[s2._uid] = true;
							s2._hasOverlap[s._uid] = true;
						}
					}
				}
			}
		}

		overlap(target, callback) {
			return this.overlaps(target, callback);
		}

		/**
		 * Returns true on the first frame that the group overlaps with the
		 * target group.
		 *
		 * Custom overlap event handling can be done by using this function
		 * in an if statement or adding a callback as the second parameter.
		 *
		 * @param {Group} target
		 * @param {Function} [callback]
		 */
		overlaps(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 0);
			return this._overlappers[target._uid] == 1 || this._overlappers[target._uid] <= -3;
		}

		/**
		 * Returns the amount of frames that the group has been overlapping
		 * with the target group for, which is a truthy value. Returns 0 if
		 * the group is not overlapping with the target group.
		 *
		 * @param {Group} target
		 * @param {Function} [callback]
		 * @return {Number} frames
		 */
		overlapping(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 1);
			let val = this._overlappers[target._uid];
			if (val <= -3) return 1;
			return val > 0 ? val : 0;
		}

		/**
		 * Returns true on the first frame that the group no longer overlaps
		 * with the target group.
		 *
		 * @param {Group} target
		 * @param {Function} [callback]
		 * @return {Boolean}
		 */
		overlapped(target, callback) {
			this._validateOverlapParams(target, callback);
			this._ensureOverlap(target);
			if (callback) this._setContactCB(target, callback, 1, 2);
			return this._overlappers[target._uid] <= -1;
		}

		_removeContactsWith(o) {
			for (let s of this) {
				s._removeContactsWith(o);
			}
		}

		/**
		 */
		applyForce() {
			for (let s of this) {
				s.applyForce(...arguments);
			}
		}

		/**
		 */
		applyForceScaled() {
			for (let s of this) {
				s.applyForceScaled(...arguments);
			}
		}

		/**
		 */
		attractTo() {
			for (let s of this) {
				s.attractTo(...arguments);
			}
		}

		/**
		 */
		applyTorque() {
			for (let s of this) {
				s.applyTorque(...arguments);
			}
		}

		/**
		 */
		move(distance, direction, speed) {
			let movements = [];
			for (let s of this) {
				movements.push(s.move(distance, direction, speed));
			}
			return Promise.all(movements);
		}

		/**
		 */
		moveTo(x, y, speed) {
			if (typeof x != 'number') {
				let obj = x;
				if (obj == this.p.mouse && !this.p.mouse.active) return;
				speed = y;
				y = obj.y;
				x = obj.x;
			}
			let centroid = this._resetCentroid();
			let movements = [];
			for (let s of this) {
				let dest = {
					x: s.x - centroid.x + x,
					y: s.y - centroid.y + y
				};
				movements.push(s.moveTo(dest.x, dest.y, speed));
			}
			return Promise.all(movements);
		}

		/**
		 */
		moveTowards(x, y, tracking) {
			if (typeof x != 'number') {
				let obj = x;
				if (obj == this.p.mouse && !this.p.mouse.active) return;
				tracking = y;
				y = obj.y;
				x = obj.x;
			}
			if (x === undefined && y === undefined) return;
			this._resetCentroid();
			for (let s of this) {
				if (s.distCentroid === undefined) this._resetDistancesFromCentroid();
				let dest = {
					x: s.distCentroid.x + x,
					y: s.distCentroid.y + y
				};
				s.moveTowards(dest.x, dest.y, tracking);
			}
		}

		/**
		 */
		moveAway(x, y, repel) {
			if (typeof x != 'number') {
				let obj = x;
				if (obj == this.p.mouse && !this.p.mouse.active) return;
				repel = y;
				y = obj.y;
				x = obj.x;
			}
			if (x === undefined && y === undefined) return;
			this._resetCentroid();
			for (let s of this) {
				if (s.distCentroid === undefined) this._resetDistancesFromCentroid();
				let dest = {
					x: s.distCentroid.x + x,
					y: s.distCentroid.y + y
				};
				s.moveAway(dest.x, dest.y, repel);
			}
		}

		/**
		 * Its better to use the group Sprite constructor instead.
		 * `new group.Sprite()` which both creates a group sprite using
		 * soft inheritance and adds it to the group.
		 *
		 * Adds a sprite or multiple sprites to the group, whether they were
		 * already in the group or not, just like with the Array.push()
		 * method. Only sprites can be added to a group.
		 *
		 * @param {...Sprite} sprites The sprite or sprites to be added
		 * @returns {Number} the new length of the group
		 */
		push(...sprites) {
			if (this.removed) {
				console.warn(
					"Adding a sprite to a group that was removed. Use `group.removeAll()` to remove all of a group's sprites without removing the group itself. Restoring the group in p5play's memory."
				);
				this.p.p5play.groups[this._uid] = this;
				this.removed = false;
			}
			for (let s of sprites) {
				if (!(s instanceof this.p.Sprite)) {
					throw new Error('You can only add sprites to a group, not ' + typeof s);
				}
				if (s.removed) {
					console.error("Can't add a removed sprite to a group");
					continue;
				}

				let b;
				for (let tuid in this._hasOverlap) {
					let hasOverlap = this._hasOverlap[tuid];
					if (hasOverlap && !s._hasSensors) {
						s.addDefaultSensors();
					}
					if (tuid >= 1000) b = this.p.p5play.sprites[tuid];
					else b = this.p.p5play.groups[tuid];

					if (!b || b.removed) continue;

					if (!hasOverlap) b._ensureCollide(s);
					else b._ensureOverlap(s);
				}
				for (let event in eventTypes) {
					let contactTypes = eventTypes[event];
					for (let contactType of contactTypes) {
						let ledger = this.p.p5play[contactType];
						let lg = ledger[this._uid];
						if (!lg) continue;

						let ls = (ledger[s._uid] ??= {});
						for (let b_uid in lg) {
							ls[b_uid] = lg[b_uid];
						}
					}
				}

				super.push(s);
				// push to subgroups, excluding allSprites
				// since sprites are automatically added to allSprites
				if (this.parent) this.p.p5play.groups[this.parent].push(s);

				s.groups.push(this);
			}
			return this.length;
		}

		/**
		 * Alias for group.length
		 * @deprecated
		 */
		size() {
			return this.length;
		}

		/**
		 * Returns the group's unique identifier.
		 *
		 * @returns {String} groupID
		 */
		toString() {
			return 'g' + this.idNum;
		}

		/**
		 * Remove sprites that go outside the given culling boundary
		 * relative to the camera.
		 *
		 * Sprites with chain colliders can not be culled.
		 *
		 * @param {Number} top|size The distance that sprites can move below the p5.js canvas before they are removed. *OR* The distance sprites can travel outside the screen on all sides before they get removed.
		 * @param {Number} bottom|cb The distance that sprites can move below the p5.js canvas before they are removed.
		 * @param {Number} [left] The distance that sprites can move beyond the left side of the p5.js canvas before they are removed.
		 * @param {Number} [right] The distance that sprites can move beyond the right side of the p5.js canvas before they are removed.
		 * @param {Function} [cb(sprite)] The callback is given the sprite that
		 * passed the cull boundary, if no callback is given the sprite is
		 * removed by default
		 * @return {Number} The number of sprites culled
		 */
		cull(top, bottom, left, right, cb) {
			if (left === undefined) {
				let size = top;
				cb = bottom;
				top = bottom = left = right = size;
			}
			if (isNaN(top) || isNaN(bottom) || isNaN(left) || isNaN(right)) {
				throw new TypeError('The culling boundary must be defined with numbers');
			}
			if (cb && typeof cb != 'function') {
				throw new TypeError('The callback to group.cull must be a function');
			}

			let cx = this.p.camera.x - this.p.canvas.hw / this.p.camera.zoom;
			let cy = this.p.camera.y - this.p.canvas.hh / this.p.camera.zoom;

			let minX = -left + cx;
			let minY = -top + cy;
			let maxX = this.p.width + right + cx;
			let maxY = this.p.height + bottom + cy;

			let culled = 0;
			for (let i = 0; i < this.length; i++) {
				let s = this[i];
				if (s.shape == 'chain') continue;
				if (s.x < minX || s.y < minY || s.x > maxX || s.y > maxY) {
					culled++;
					if (cb) cb(s, culled);
					else s.remove();
					if (s.removed) i--;
				}
			}
			return culled;
		}

		/**
		 * If no input is given to this function, the group itself will be
		 * marked as removed and deleted from p5play's internal memory, the
		 * `p5play.groups` array. Every sprite in the group will be removed
		 * from the world and every other group they belong to.
		 *
		 * Groups should not be used after they are removed.
		 *
		 * If this function receives as input an index of a sprite in the
		 * group or the sprite itself, it will remove that sprite from
		 * this group and its super groups (if any), but NOT from the world.
		 *
		 * To remove a sprite from the world and every group it belongs to,
		 * use `sprite.remove()` instead.
		 *
		 * @param {Sprite|Number} item The sprite to be removed or its index
		 * @return {Sprite} the removed sprite or undefined if the specified sprite was not found
		 */
		remove(item) {
			if (item === undefined) {
				this.removeAll();
				if (!this._isAllSpritesGroup) this.removed = true;
				return;
			}

			let idx;
			if (typeof item == 'number') {
				if (item >= 0) idx = item;
				else idx = this.length + item;
			} else {
				idx = this.indexOf(item);
			}

			if (idx == -1) return;

			let s = this[idx];
			this.splice(idx, 1);
			return s;
		}

		/**
		 * Using `group.remove` instead is recommended because it's easier to use,
		 * and it uses this function internally.
		 *
		 * Similar to `Array.splice` except it does not accept adding sprites,
		 * third parameters and beyond are ignored.
		 *
		 * This function also removes the group and its super-groups from the
		 * sprites' groups array.
		 *
		 * @param {Number} idx index
		 * @param {Number} amount number of sprites to remove
		 * @return {Sprite[]} the removed sprites
		 */
		splice(idx, amount) {
			let removed = super.splice(idx, amount);
			if (!removed) return;

			let gIDs = [];
			for (let s of removed) {
				if (s.removed) continue;

				// remove from the removed sprites' group array
				// this group and its super-groups
				let gID = this._uid;
				do {
					gIDs.push(gID);
					let gIdx = s.groups.findIndex((g) => g._uid == gID);
					let g = s.groups.splice(gIdx, 1);
					gID = g[0].parent;
				} while (gID);
			}

			// loop through the groups that the sprite was removed from
			for (let gID of gIDs) {
				let a = this.p.p5play.groups[gID];
				for (let eventType in eventTypes) {
					// loop through group's contacts with other sprites and groups
					for (let b_uid in a[eventType]) {
						if (a[eventType][b_uid] == 0) continue;
						let b;
						if (b_uid >= 1000) b = this.p.p5play.sprites[b_uid];
						else b = this.p.p5play.groups[b_uid];
						// check if any group members are still in contact with the sprite
						let inContact = false;
						for (let s of a) {
							if (s[eventType][b._uid] > 0) {
								inContact = true;
								break;
							}
						}
						// if not, set the contact to the collided or overlapped state
						if (!inContact) {
							a[eventType][b._uid] = -2;
							b[eventType][a._uid] = -2;
						}
					}
				}
			}
			return removed;
		}

		/**
		 * Removes the last sprite in the group.
		 * @return {Sprite} the removed sprite or undefined if the group is empty
		 */
		pop() {
			return this.remove(this.length - 1);
		}

		/**
		 * Removes the last sprite in the group.
		 * @return {Sprite} the removed sprite or undefined if the group is empty
		 */
		shift() {
			return this.remove(0);
		}

		/**
		 * Not supported!
		 * @return {Number} the new length of the group
		 */
		unshift() {
			console.error('unshift is not supported for groups');
			return this.length;
		}

		/**
		 * Removes all the sprites in the group from the world and
		 * every other group they belong to.
		 *
		 * Does not delete the group itself.
		 */
		removeAll() {
			while (this.length > 0) {
				this[0].remove();
			}
		}

		_step() {
			this.__step();
		}

		/**
		 * Draws all the sprites in the group.
		 */
		draw() {
			let g = [...this];
			g.sort((a, b) => a._layer - b._layer);
			for (let i = 0; i < g.length; i++) {
				let sprite = g[i];
				if (sprite._life != 2147483647 && sprite._life-- < 0) {
					sprite.remove();
					g.splice(i, 1);
					i--;
					continue;
				}
				if (sprite._visible !== false && (!this.p.p5play._inPostDraw || sprite.autoDraw)) {
					sprite.draw();
				}
			}
			if (this._autoDraw) this._autoDraw = null;
		}

		/**
		 * Updates all the sprites in the group. See sprite.update for
		 * more information.
		 *
		 * By default, allSprites.update is called after every draw call.
		 *
		 */
		update() {
			for (let s of this) {
				if (!this.p.p5play._inPostDraw || this.autoUpdate) {
					s.update();
				}
			}
			if (this._autoUpdate) this._autoUpdate = null;
		}
	};

	//      a -> b
	// sprite -> sprite
	// sprite -> group
	//  group -> group
	this.Sprite.prototype.__step = this.Group.prototype.__step = function () {
		// for each type of collision and overlap event
		let a = this;
		let b;
		for (let event in eventTypes) {
			for (let k in this[event]) {
				if (k >= 1000) {
					// if a is group or a is sprite and a._uid >= k
					if (a._isGroup || a._uid >= k) continue;
					b = this.p.p5play.sprites[k];
				} else {
					// if a is group and a._uid >= k
					if (a._isGroup && a._uid >= k) continue;
					b = this.p.p5play.groups[k];
				}

				let v = a[event][k] + 1;
				if (!b || v == 0 || v == -2) {
					delete a[event][k];
					if (b) delete b[event][a._uid];
					continue;
				}
				this[event][k] = v;
				b[event][a._uid] = v;
			}
		}
	};

	this.Sprite.prototype.___step = this.Group.prototype.___step = function () {
		let a = this;
		let b, contactType, shouldOverlap, cb;
		let checkCollisions = true;
		for (let event in eventTypes) {
			for (let k in this[event]) {
				if (k >= 1000) {
					if (a._isGroup || a._uid >= k) continue;
					b = this.p.p5play.sprites[k];
				} else {
					if (a._isGroup && a._uid >= k) continue;
					b = this.p.p5play.groups[k];
				}

				// contact callbacks can only be called between sprites
				if (a._isGroup || b?._isGroup) continue;

				// is there even a chance that a contact callback exists?
				shouldOverlap = a._hasOverlap[b._uid] ?? b._hasOverlap[a._uid];
				if ((checkCollisions && shouldOverlap !== false) || (!checkCollisions && shouldOverlap !== true)) {
					continue;
				}

				let v = a[event][k];
				for (let i = 0; i < 3; i++) {
					if (i == 0 && v != 1 && v != -3) continue;
					if (i == 1 && v == -1) continue;
					if (i == 2 && v >= 1) continue;
					contactType = eventTypes[event][i];

					let la = this.p.p5play[contactType][a._uid];
					if (la) {
						cb = la[b._uid];
						if (cb) cb.call(a, a, b, v);
						for (let g of b.groups) {
							cb = la[g._uid];
							if (cb) cb.call(a, a, b, v);
						}
					}

					let lb = this.p.p5play[contactType][b._uid];
					if (lb) {
						cb = lb[a._uid];
						if (cb) cb.call(b, b, a, v);
						for (let g of a.groups) {
							cb = lb[g._uid];
							if (cb && (!la || cb != la[g._uid])) {
								cb.call(b, b, a, v);
							}
						}
					}
				}
			}
			checkCollisions = false;
		}

		// all of p5play's references to the sprite can be removed
		// only if the sprite is not colliding or overlapping with anything
		// otherwise the sprite will be removed from the world but
		// and the reference to it will be removed after the collided
		// and/or overlapped events are handled
		if (this._removed) {
			if (Object.keys(this._collisions).length == 0 && Object.keys(this._overlappers).length == 0) {
				if (this._isSprite) delete this.p.p5play.sprites[this._uid];
				else if (this.p.p5play.targetVersion >= 16) delete this.p.p5play.groups[this._uid];

				// remove contact events
				for (let eventType in eventTypes) {
					for (let contactType of eventTypes[eventType]) {
						delete this.p.p5play[contactType][this._uid];
					}
				}
			}
		}
	};

	/**
	 * Adds an animation to the sprite. Use this function in the preload p5.js
	 * function. You don't need to name the animation if the sprite will only
	 * use one animation. See SpriteAnimation for more information.
	 *
	 * If an animation was already added to a different sprite or group,
	 * it can not be added to another sprite or group. A clone (copy) of
	 * the animation will be automatically created and added instead.
	 *
	 * @memberof Sprite
	 * @instance
	 * @func addAnimation
	 * @param {String} name SpriteAnimation identifier
	 * @param {SpriteAnimation} animation The preloaded animation
	 * @example
	 * sprite.addAni(name, animation);
	 * sprite.addAni(name, frame1, frame2, frame3...);
	 * sprite.addAni(name, atlas);
	 */
	this.Sprite.prototype.addAnimation =
		this.Group.prototype.addAnimation =
		this.Sprite.prototype.addAni =
		this.Group.prototype.addAni =
		this.Sprite.prototype.addImage =
		this.Group.prototype.addImage =
		this.Sprite.prototype.addImg =
		this.Group.prototype.addImg =
			function () {
				if (this.p.p5play.disableImages) {
					this._ani = new this.p.SpriteAnimation();
					return;
				}
				let args = [...arguments];
				let name, ani;
				if (args[0] instanceof this.p.SpriteAnimation) {
					ani = args[0];
					if (ani._addedToSpriteOrGroup) ani = ani.clone();
					name = ani.name || 'default';
					ani.name = name;
				} else if (args[1] instanceof this.p.SpriteAnimation) {
					name = args[0];
					ani = args[1];
					if (ani._addedToSpriteOrGroup) ani = ani.clone();
					ani.name = name;
				} else {
					ani = new this.p.SpriteAnimation(this, ...args);
					name = ani.name;
				}
				this.animations[name] = ani;
				this._ani = ani;
				ani._addedToSpriteOrGroup = true;

				// only works if the animation was loaded in preload
				if (this._dimensionsUndef && (ani.w != 1 || ani.h != 1)) {
					this.w = ani.w;
					this.h = ani.h;
				}
				return ani;
			};

	/**
	 * Add multiple animations
	 *
	 * @memberof Sprite
	 * @instance
	 */
	this.Sprite.prototype.addAnis =
		this.Group.prototype.addAnis =
		this.Sprite.prototype.addAnimations =
		this.Group.prototype.addAnimations =
		this.Sprite.prototype.addImages =
		this.Group.prototype.addImages =
		this.Sprite.prototype.addImgs =
		this.Group.prototype.addImgs =
			function () {
				let args = arguments;
				let atlases;
				if (args.length == 1) {
					atlases = args[0];
				} else {
					this.spriteSheet = args[0];
					atlases = args[1];
				}
				for (let name in atlases) {
					let atlas = atlases[name];
					this.addAni(name, atlas);
				}
			};

	this.World = class extends pl.World {
		/**
		 * <a href="https://p5play.org/learn/world.html">
		 * Look at the World reference pages before reading these docs.
		 * </a>
		 *
		 * A `world` object is created automatically by p5play. There can only
		 * be one world per p5.js instance.
		 *
		 * This class extends `planck.World` and adds some p5play specific
		 * features.
		 */
		constructor() {
			super(new pl.Vec2(0, 0), true);
			this.p = pInst;

			this.mod = [];

			/**
			 * Changes the world's origin point,
			 * where (0, 0) is on the canvas.
			 * @type {Object}
			 * @property {Number} x
			 * @property {Number} y
			 * @default { x: 0, y: 0 }
			 */
			this.origin = { x: 0, y: 0 };

			this.contacts = [];
			this.on('begin-contact', this._beginContact);
			this.on('end-contact', this._endContact);

			let _this = this;
			this._gravity = {
				get x() {
					return _this.m_gravity.x;
				},
				set x(val) {
					val = Math.round(val || 0);
					if (val == _this.m_gravity.x) return;
					_this.mod[0] = true;
					for (let s of _this.p.allSprites) {
						s.sleeping = false;
					}
					_this.m_gravity.x = val;
				},
				get y() {
					return _this.m_gravity.y;
				},
				set y(val) {
					val = Math.round(val || 0);
					if (val == _this.m_gravity.y) return;
					_this.mod[0] = true;
					for (let s of _this.p.allSprites) {
						s.sleeping = false;
					}
					_this.m_gravity.y = val;
				}
			};

			this.velocityThreshold = 0.19;

			this.mouseTracking ??= true;
			this.mouseSprite = null;
			this.mouseSprites = [];

			this.autoStep = true;
		}

		/**
		 * Gravity force vector that affects all dynamic physics colliders.
		 * @type {Object}
		 * @property {Number} x
		 * @property {Number} y
		 * @default { x: 0, y: 0 }
		 */
		get gravity() {
			return this._gravity;
		}
		set gravity(val) {
			this._gravity.x = val.x;
			this._gravity.y = val.y;
		}

		/**
		 * The lowest velocity an object can have before it is considered
		 * to be at rest.
		 *
		 * Adjust the velocity threshold to allow for slow moving objects
		 * but don't have it be too low, or else objects will never sleep,
		 * which will hurt performance.
		 *
		 * @type {Number}
		 * @default 0.19
		 */
		get velocityThreshold() {
			return pl.Settings.velocityThreshold;
		}
		set velocityThreshold(val) {
			pl.Settings.velocityThreshold = val;
		}

		/**
		 * Performs a physics simulation step that advances all sprites'
		 * forward in time by 1/60th of a second if no timeStep is given.
		 *
		 * This function is automatically called at the end of the p5.js draw
		 * loop, unless it was already called inside the draw loop.
		 *
		 * Decreasing velocityIterations and positionIterations will improve
		 * performance but decrease simulation quality.
		 *
		 * @param {Number} [timeStep] - time step in seconds
		 * @param {Number} [velocityIterations] - 8 by default
		 * @param {Number} [positionIterations] - 3 by default
		 */
		step(timeStep, velocityIterations, positionIterations) {
			for (let s of this.p.allSprites) {
				s.prevPos.x = s.x;
				s.prevPos.y = s.y;
				s.prevRotation = s.rotation;
			}
			super.step(timeStep || 1 / (this.p._targetFrameRate || 60), velocityIterations || 8, positionIterations || 3);

			let sprites = Object.values(this.p.p5play.sprites);
			let groups = Object.values(this.p.p5play.groups);

			for (let s of sprites) s._step();
			for (let g of groups) g._step();

			for (let s of sprites) s.___step();
			for (let g of groups) g.___step();

			if (this.autoStep) this.autoStep = null;
		}

		/**
		 * Returns the sprites at a position, ordered by layer.
		 *
		 * Optionally you can specify a group to search.
		 *
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Group} [group] the group to search
		 * @param {Boolean} [cameraActiveWhenDrawn] if true, only sprites that
		 * were drawn when the camera was active will be returned
		 * @returns {Sprite[]} an array of sprites
		 */
		getSpritesAt(x, y, group, cameraActiveWhenDrawn) {
			cameraActiveWhenDrawn ??= true;
			const convertedPoint = new pl.Vec2(x / plScale, y / plScale);
			const aabb = new pl.AABB();
			aabb.lowerBound = new pl.Vec2(convertedPoint.x - 0.001, convertedPoint.y - 0.001);
			aabb.upperBound = new pl.Vec2(convertedPoint.x + 0.001, convertedPoint.y + 0.001);

			// Query the world for overlapping shapes.
			let fxts = [];
			this.queryAABB(aabb, (fxt) => {
				if (fxt.getShape().testPoint(fxt.getBody().getTransform(), convertedPoint)) {
					fxts.push(fxt);
				}
				return true;
			});
			if (fxts.length == 0) return [];

			group ??= this.p.allSprites;
			let sprites = [];
			for (let fxt of fxts) {
				const s = fxt.m_body.sprite;
				if (s._cameraActiveWhenDrawn == cameraActiveWhenDrawn) {
					if (!sprites.find((x) => x._uid == s._uid)) sprites.push(s);
				}
			}
			sprites.sort((a, b) => (a._layer - b._layer) * -1);
			return sprites;
		}

		/**
		 * Returns the sprite at the specified position
		 * on the top most layer.
		 *
		 * Optionally you can specify a group to search.
		 *
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Group} [group] the group to search
		 * @returns {Sprite} a sprite
		 */
		getSpriteAt(x, y, group) {
			const sprites = this.getSpritesAt(x, y, group);
			return sprites[0];
		}

		getMouseSprites() {
			let sprites = this.getSpritesAt(this.p.mouse.x, this.p.mouse.y);
			if (this.p.camera._wasOff) {
				let uiSprites = this.getSpritesAt(this.p.camera.mouse.x, this.p.camera.mouse.y, this.p.allSprites, false);
				if (uiSprites.length) sprites = [...uiSprites, ...sprites];
			}
			return sprites;
		}

		/*
		 * Sets contact trackers to 0, after the world's super.step()
		 * they will be increased to 1.
		 */
		_beginContact(contact) {
			// Get both fixtures
			let a = contact.m_fixtureA;
			let b = contact.m_fixtureB;
			let t = '_collisions';
			if (a.m_isSensor) t = '_overlappers';
			a = a.m_body.sprite;
			b = b.m_body.sprite;

			a[t][b._uid] = 0;
			b[t][a._uid] = 0;

			for (let g of b.groups) {
				if (!a[t][g._uid] || a[t][g._uid] < 0) {
					a[t][g._uid] = 0;
					g[t][a._uid] = 0;
				}
			}

			for (let g of a.groups) {
				if (!b[t][g._uid] || b[t][g._uid] < 0) {
					b[t][g._uid] = 0;
					g[t][b._uid] = 0;
				}
				for (let g2 of b.groups) {
					if (!g[t][g2._uid] || g[t][g2._uid] < 0) {
						g[t][g2._uid] = 0;
						g2[t][g._uid] = 0;
					}
				}
			}
		}

		/*
		 * If contact ended between sprites that where previously in contact,
		 * then their contact trackers are set to -2 which will be incremented
		 * to -1 on the next world step call.
		 *
		 * However, if contact begins and ends on the same frame, then the contact
		 * trackers are set to -4 and incremented to -3 on the next world step call.
		 */
		_endContact(contact) {
			let a = contact.m_fixtureA;
			let b = contact.m_fixtureB;
			let contactType = '_collisions';
			if (a.m_isSensor) contactType = '_overlappers';
			a = a.m_body.sprite;
			b = b.m_body.sprite;

			a[contactType][b._uid] = a[contactType][b._uid] != 0 ? -2 : -4;
			b[contactType][a._uid] = b[contactType][a._uid] != 0 ? -2 : -4;

			for (let g of b.groups) {
				let inContact = false;
				for (let s of g) {
					if (s[contactType][a._uid] >= 0) {
						inContact = true;
						break;
					}
				}
				if (!inContact) {
					g[contactType][a._uid] = g[contactType][a._uid] != 0 ? -2 : -4;
					a[contactType][g._uid] = a[contactType][g._uid] != 0 ? -2 : -4;
				}
			}

			for (let g of a.groups) {
				let inContact = false;
				for (let s of g) {
					if (s[contactType][b._uid] >= 0) {
						inContact = true;
						break;
					}
				}
				if (!inContact) {
					g[contactType][b._uid] = g[contactType][b._uid] != 0 ? -2 : -4;
					b[contactType][g._uid] = b[contactType][g._uid] != 0 ? -2 : -4;
					for (let g2 of b.groups) {
						g[contactType][g2._uid] = g[contactType][g2._uid] != 0 ? -2 : -4;
						g2[contactType][g._uid] = g2[contactType][g._uid] != 0 ? -2 : -4;
					}
				}
			}
		}

		/*
		 * Used internally to find contact callbacks.
		 *
		 * @param type is the eventType of contact callback to find
		 * @param s0 is the first sprite
		 * @param s1 is the second sprite
		 */
		_findContact(type, s0, s1) {
			let cb = s0[type][s1._uid];
			if (cb) return cb;

			for (let g1 of s1.groups) {
				cb = s0[type][g1._uid];
				if (cb) return cb;
			}

			for (let g0 of s0.groups) {
				cb = g0[type][s1._uid];
				if (cb) return cb;

				for (let g1 of s1.groups) {
					if (g0._uid != g1._uid) continue;
					cb = g0[type][g1._uid];
					if (cb) return cb;
				}
			}
			return false;
		}

		/**
		 * "Sleeping" sprites get temporarily ignored during physics
		 * simulation. A sprite starts "sleeping" when it stops moving and
		 * doesn't collide with anything that it wasn't already touching.
		 *
		 * This is an important performance optimization that you probably
		 * shouldn't disable for every sprite in the world.
		 * @type {Boolean}
		 * @default true
		 */
		get allowSleeping() {
			return this.getAllowSleeping();
		}
		set allowSleeping(val) {
			this.setAllowSleeping(val);
		}
	};

	this.Camera = class {
		/**
		 * <a href="https://p5play.org/learn/camera.html">
		 * Look at the Camera reference pages before reading these docs.
		 * </a>
		 *
		 * A `camera` object is created automatically when p5play loads.
		 * Currently, there can only be one camera per p5.js instance.
		 *
		 * A camera facilitates zooming and scrolling for scenes extending beyond
		 * the canvas. Moving the camera does not actually move the sprites.
		 *
		 * The camera is automatically created on the first draw cycle.
		 *
		 * In p5.js terms the camera wraps the whole drawing cycle in a
		 * transformation matrix but it can be disabled anytime during the draw
		 * cycle to draw interface elements in an absolute position.
		 */
		constructor() {
			this.p = pInst;
			let _this = this;

			// camera position
			this._pos = this.p.createVector.call(this.p);

			// camera translation
			this.__pos = { x: 0, y: 0, rounded: {} };

			/**
			 * Absolute position of the mouse. Same values as p5.js `mouseX` and `mouseY`.
			 * @type {Object}
			 * @property {Number} x
			 * @property {Number} y
			 */
			this.mouse = {
				x: this.p.mouseX,
				y: this.p.mouseY
			};

			/**
			 * Vector of the absolute position of the mouse.
			 * @type {p5.Vector}
			 */
			this.mouse.pos = this.p.createVector.call(this.p);

			Object.defineProperty(this.mouse.pos, 'x', {
				get() {
					return _this.mouse.x;
				},
				set(val) {
					_this.mouse.x = val;
				}
			});
			Object.defineProperty(this.mouse.pos, 'y', {
				get() {
					return _this.mouse.y;
				},
				set(val) {
					_this.mouse.y = val;
				}
			});

			/**
			 * Read only. True if the camera is active.
			 * Use the methods Camera.on() and Camera.off()
			 * to enable or disable the camera.
			 * @type {Boolean}
			 * @default false
			 */
			this.active = false;

			this.bound = {
				min: { x: 0, y: 0 },
				max: { x: 0, y: 0 }
			};

			this._zoomIdx = -1;

			this._zoom = 1;
		}

		/**
		 * The camera's position. {x, y}
		 * @type {Object}
		 */
		get pos() {
			return this._pos;
		}
		set pos(val) {
			this.x = val.x;
			this.y = val.y;
		}
		/**
		 * The camera's position. Alias for pos.
		 * @type {Object}
		 */
		get position() {
			return this._pos;
		}
		set position(val) {
			this.x = val.x;
			this.y = val.y;
		}

		_calcBoundsX(val) {
			let mod = this.p.canvas.hw / this._zoom;
			this.bound.min.x = val - mod - 100;
			this.bound.max.x = val + mod + 100;
		}

		_calcBoundsY(val) {
			let mod = this.p.canvas.hh / this._zoom;
			this.bound.min.y = val - mod - 100;
			this.bound.max.y = val + mod + 100;
		}

		/**
		 * The camera x position.
		 * @type {Number}
		 */
		get x() {
			return this._pos.x;
		}
		set x(val) {
			if (val === undefined || isNaN(val)) return;
			this._pos.x = val;
			let x = -val + this.p.canvas.hw / this._zoom;
			this.__pos.x = x;
			if (this.p.allSprites.pixelPerfect) {
				this.__pos.rounded.x = Math.round(x);
			}
			this._calcBoundsX(val);
		}

		/**
		 * The camera y position.
		 * @type {Number}
		 */
		get y() {
			return this._pos.y;
		}
		set y(val) {
			if (val === undefined || isNaN(val)) return;
			this._pos.y = val;
			let y = -val + this.p.canvas.hh / this._zoom;
			this.__pos.y = y;
			if (this.p.allSprites.pixelPerfect) {
				this.__pos.rounded.y = Math.round(y);
			}
			this._calcBoundsY(val);
		}

		/**
		 * Camera zoom.
		 *
		 * A scale of 1 will be the normal size. Setting it to 2
		 * will make everything appear twice as big. .5 will make
		 * everything look half size.
		 * @type {Number}
		 * @default 1
		 */
		get zoom() {
			return this._zoom;
		}
		set zoom(val) {
			if (val === undefined || isNaN(val)) return;
			this._zoom = val;
			let x = -this._pos.x + this.p.canvas.hw / val;
			let y = -this._pos.y + this.p.canvas.hh / val;
			this.__pos.x = x;
			this.__pos.y = y;
			if (this.p.allSprites.pixelPerfect) {
				this.__pos.rounded.x = Math.round(x);
				this.__pos.rounded.y = Math.round(y);
			}
			this._calcBoundsX(this._pos.x);
			this._calcBoundsY(this._pos.y);
		}

		/**
		 * Zoom the camera at a given speed.
		 *
		 * @param {Number} target The target zoom
		 * @param {Number} speed The amount of zoom per frame
		 * @returns {Promise} resolves true when the camera reaches the target zoom
		 */
		zoomTo(target, speed) {
			if (target == this._zoom) return Promise.resolve(true);
			speed ??= 0.1;
			let delta = Math.abs(target - this._zoom);
			let frames = Math.round(delta / speed);
			if (target < this.zoom) speed = -speed;

			this._zoomIdx++;
			let zoomIdx = this._zoomIdx;
			return (async () => {
				for (let i = 0; i < frames; i++) {
					if (zoomIdx != this._zoomIdx) return false;
					this.zoom += speed;
					await this.p.delay();
				}
				this.zoom = target;
				return true;
			})();
		}

		/**
		 * Activates the camera.
		 * The canvas will be drawn according to the camera position and scale until
		 * camera.off() is called
		 *
		 */
		on() {
			if (!this.active) {
				this.p.push();
				this.p.scale(this._zoom);
				if (!this.p.allSprites.pixelPerfect) {
					this.p.translate(this.__pos.x, this.__pos.y);
				} else {
					this.__pos.rounded.x ??= Math.round(this.__pos.x);
					this.__pos.rounded.y ??= Math.round(this.__pos.y);
					this.p.translate(this.__pos.rounded.x, this.__pos.rounded.y);
				}
				this.active = true;
			}
		}

		/**
		 * Deactivates the camera.
		 * The canvas will be drawn normally, ignoring the camera's position
		 * and scale until camera.on() is called
		 *
		 */
		off() {
			if (this.active) {
				this.p.pop();
				this.active = false;
				this._wasOff = true;
			}
		}
	}; //end camera class

	/**
	 * This planck function should've been named "shouldContact",
	 * because that's what it actually decides.
	 *
	 * Here we override it to allow for overlap events between sprites.
	 */
	pl.Fixture.prototype.shouldCollide = function (that) {
		// should this and that produce a contact event?
		let a = this;
		let b = that;

		// sensors overlap (returning true doesn't mean they will collide it means
		// they're included in begin contact and end contact events)
		if (a.m_isSensor && b.m_isSensor) return true;
		// ignore contact events between a sensor and a non-sensor
		if (a.m_isSensor || b.m_isSensor) return false;
		// else test if the two non-sensor colliders should overlap

		a = a.m_body.sprite;
		b = b.m_body.sprite;

		let shouldOverlap = a._hasOverlap[b._uid] ?? b._hasOverlap[a._uid];

		// if `a` has an overlap enabled with `b` their colliders should
		// not produce a contact event, the overlap contact event should
		// only be produced between their sensors
		if (shouldOverlap) return false;
		return true;
	};

	this.Tiles = class {
		/**
		 * <a href="https://p5play.org/learn/tiles.html">
		 * Look at the Tiles reference pages before reading these docs.
		 * </a>
		 *
		 * Returns a group containing all the tile sprites created by
		 * the `Tiles` constructor.
		 *
		 * @param {String} tiles
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w
		 * @param {Number} h
		 */
		constructor(tiles, x, y, w, h) {
			if (typeof tiles == 'string') {
				if (tiles[0] == '\n') tiles = tiles.slice(1);
				tiles = tiles.replaceAll('\t', '  ');
				tiles = tiles.split('\n');
			}

			x ??= 0;
			y ??= 0;
			w ??= 1;
			h ??= 1;

			let sprites = new pInst.Group();

			for (let row = 0; row < tiles.length; row++) {
				for (let col = 0; col < tiles[row].length; col++) {
					let t = tiles[row][col];
					if (t == ' ' || t == '.') continue;
					let ani, g;
					let groups = Object.values(pInst.p5play.groups);
					for (g of groups) {
						ani = g.animations[t];
						if (ani) break;
					}
					if (ani) {
						sprites.push(new g.Sprite(ani, x + col * w, y + row * h));
						continue;
					}
					let wasFound = false;
					for (g of groups) {
						if (g.tile == t) {
							wasFound = true;
							break;
						}
					}
					if (wasFound) {
						sprites.push(new g.Sprite(x + col * w, y + row * h));
						continue;
					}
					let s;
					for (s of pInst.allSprites) {
						if (s.tile == t) {
							wasFound = true;
							break;
						}
					}
					if (wasFound) {
						s.x = x + col * w;
						s.y = y + row * h;
						continue;
					}
					throw 'Tile not found: ' + t;
				}
			}

			return sprites;
		}
	};

	/**
	 * Use of `new Tiles()` is preferred.
	 *
	 * @deprecated
	 * @func createTiles
	 */
	this.createTiles = function (tiles, x, y, w, h) {
		return new this.Tiles(tiles, x, y, w, h);
	};

	this.Joint = class {
		/**
		 * Using this Joint class directly is not recommended, but
		 * if it is used a GlueJoint will be created.
		 *
		 * It's better to use a specific joint class constructor:
		 *
		 * GlueJoint, DistanceJoint, WheelJoint, HingeJoint,
		 * SliderJoint, or RopeJoint.
		 *
		 * All other joint classes extend this class. Joint type
		 * can not be changed after a joint is created.
		 *
		 * @param {Sprite} spriteA
		 * @param {Sprite} spriteB
		 * @param {String} [type]
		 */
		constructor(spriteA, spriteB, type) {
			this.p = pInst;

			if (!spriteA?._isSprite || !spriteB?._isSprite) {
				throw new Error('The Joint constructor requires two sprites as input.');
			}

			if (!spriteA.body) spriteA.addDefaultSensors();
			if (!spriteB.body) spriteB.addDefaultSensors();

			/**
			 * The first sprite in the joint.
			 * @type {Sprite}
			 */
			this.spriteA = spriteA;

			/**
			 * The second sprite in the joint.
			 * @type {Sprite}
			 */
			this.spriteB = spriteB;

			type ??= 'glue';
			/**
			 * Read only. The type of joint. Can be one of:
			 *
			 * "glue", "distance", "wheel", "hinge", "slider", or "rope".
			 *
			 * Can't be changed after the joint is created.
			 * @type {String}
			 */
			this.type = type;

			if (type == 'glue') {
				let j = pl.WeldJoint({}, spriteA.body, spriteB.body, spriteA.body.getWorldCenter());
				this._createJoint(j);
			}

			let _this = this;

			if (type != 'glue' && type != 'slider' && type != 'rope') {
				for (let l of ['A', 'B']) {
					if (l == 'A' && type == 'wheel') continue;

					const prop = '_offset' + l;
					this[prop] = pInst.createVector.call(pInst);

					for (let axis of ['x', 'y']) {
						Object.defineProperty(this[prop], axis, {
							get() {
								let val = (_this._j['m_localAnchor' + l][axis] / _this['sprite' + l].tileSize) * plScale;
								return fixRound(val);
							},
							set(val) {
								_this._j['m_localAnchor' + l][axis] = (val / plScale) * _this['sprite' + l].tileSize;
								if (_this.type == 'distance' || _this.type == 'rope') {
									_this._j.m_length = pl.Vec2.distance(
										_this._j.m_bodyA.getWorldPoint(_this._j.m_localAnchorA),
										_this._j.m_bodyB.getWorldPoint(_this._j.m_localAnchorB)
									);
								} else if (_this.type == 'hinge' || _this.type == 'wheel') {
									let o;
									if (l == 'A') o = 'B';
									else o = 'A';
									// body o's local point of body l anchor's world point
									_this._j['m_localAnchor' + o][axis] = _this._j['m_body' + o].getLocalPoint(
										_this._j['m_body' + l].getWorldPoint(_this._j['m_localAnchor' + l])
									)[axis];
								}
							}
						});
					}
				}
			}

			let removeProps = [];
			if (type == 'distance' || type == 'glue' || type == 'rope') {
				removeProps.push('enableMotor', 'maxPower', 'motorSpeed', 'power', 'speed');
			}
			if (type == 'rope') {
				removeProps.push('damping', 'springiness');
			}

			let def = {};
			for (let prop of removeProps) {
				def[prop] = { value: null, enumerable: false };
			}
			Object.defineProperties(this, def);

			/**
			 * Determines whether to draw the joint if spriteA
			 * or spriteB is drawn.
			 * @type {Boolean}
			 * @default true
			 */
			this.visible = true;

			spriteA.joints.push(this);
			spriteB.joints.push(this);
		}

		_createJoint(j) {
			this._j = this.p.world.createJoint(j);
		}

		_display() {
			this._draw(this.spriteA.x, this.spriteA.y, this.spriteB.x, this.spriteB.y);
			this.visible = null;
		}

		_draw(xA, yA, xB, yB) {
			if (yB) {
				this.p.line(xA, yA, xB, yB);
			} else {
				this.p.point(xA, yA);
			}
		}

		/**
		 * Function that draws the joint. Can be overridden by the user.
		 * @type {Function}
		 * @param {Number} xA
		 * @param {Number} yA
		 * @param {Number} [xB]
		 * @param {Number} [yB]
		 */
		get draw() {
			return this._display;
		}
		set draw(val) {
			this._draw = val;
		}

		/**
		 * Offset to the joint's anchorA position from the center of spriteA.
		 *
		 * Only distance and hinge joints have an offsetA.
		 * @type {p5.Vector}
		 * @default {x: 0, y: 0}
		 */
		get offsetA() {
			return this._offsetA;
		}
		set offsetA(val) {
			this._offsetA.x = val.x;
			this._offsetA.y = val.y;
		}

		/**
		 * Offset to the joint's anchorB position from the center of spriteB.
		 *
		 * Only distance, hinge, and wheel joints have an offsetB.
		 * @type {p5.Vector}
		 * @default {x: 0, y: 0}
		 */
		get offsetB() {
			return this._offsetB;
		}
		set offsetB(val) {
			this._offsetB.x = val.x;
			this._offsetB.y = val.y;
		}

		/**
		 * The springiness of the joint, a 0-1 ratio.
		 *
		 * 0.0 makes the joint completely rigid, and
		 * 1.0 turns the joint into a super loose spring,
		 * like a broken slinky that was overextended.
		 *
		 * Springiness is a user friendly wrapper around Box2D's spring
		 * frequency joint parameter. It's 0-1 ratio is piecewise mapped
		 * to the range of 30-0.2hz, except 0 remains 0.
		 *
		 * 0.0 -> 0hz (perfectly rigid)
		 * >0.0-0.1 -> 30hz-4hz (steel rod)
		 * 0.1-0.5 -> 4hz-2.5hz (tight spring)
		 * 0.5-0.8 -> 2.5hz-1hz (bouncy spring)
		 * 0.8-0.9 -> 1hz-0.5hz (slinky)
		 * 0.9-1.0 -> 0.5hz-0.2hz (bungee cord)
		 * @type {Number}
		 * @default 0.0
		 */
		get springiness() {
			return this._springiness;
		}
		set springiness(val) {
			if (val > 0) {
				if (val < 0.1) {
					val = this.p.map(val, 0, 0.1, 30, 4);
				} else if (val < 0.5) {
					val = this.p.map(val, 0.1, 0.5, 4, 2.5);
				} else if (val < 0.8) {
					val = this.p.map(val, 0.5, 0.8, 2.5, 1);
				} else if (val < 0.9) {
					val = this.p.map(val, 0.8, 0.9, 1, 0.5);
				} else {
					val = this.p.map(val, 0.9, 1.0, 0.5, 0.2);
				}
			}
			this._springiness = val;

			if (this.type != 'wheel') {
				this._j.setFrequency(val);
				return;
			}
			this._j.setSpringFrequencyHz(val);
		}

		/**
		 * Damping only effects joint's that have a
		 * springiness greater than 0.
		 *
		 * Damping is a 0-1 ratio describing how quickly the joint loses
		 * vibrational energy.
		 *
		 * 0.0 lets the joint continue to spring up and down very easily.
		 * 1.0 makes the joint lose vibrational energy immediately,
		 * making the joint completely rigid, regardless of its springiness.
		 * @type {Number}
		 * @default 0.0
		 */
		get damping() {
			if (this.type != 'wheel') {
				return this._j.getDampingRatio();
			}
			return this._j.getSpringDampingRatio();
		}
		set damping(val) {
			if (this.type != 'wheel') {
				this._j.setDampingRatio(val);
				return;
			}
			this._j.setSpringDampingRatio(val);
		}

		/**
		 * The current speed of the joint's motor.
		 * @type {Number}
		 * @default 0
		 */
		get speed() {
			return this._j.getJointSpeed();
		}
		set speed(val) {
			if (!this._j.isMotorEnabled()) {
				this._j.enableMotor(true);
			}
			this._j.setMotorSpeed(val);
		}

		get motorSpeed() {
			return this._j.getMotorSpeed();
		}

		/**
		 * Enable or disable the joint's motor.
		 * Disabling the motor is like putting a
		 * car in neutral.
		 * @type {Boolean}
		 */
		get enableMotor() {
			return this._j.isMotorEnabled();
		}
		set enableMotor(val) {
			this._j.enableMotor(val);
		}

		/**
		 * Max power is how the amount of torque a joint motor can exert
		 * around its axis of rotation.
		 * @type {Number}
		 * @default 0
		 */
		get maxPower() {
			return this._j.getMaxMotorTorque();
		}
		set maxPower(val) {
			if (!this._j.isMotorEnabled() && val) {
				this._j.enableMotor(true);
			}
			this._j.setMaxMotorTorque(val);
			if (!val) this._j.enableMotor(false);
		}

		/**
		 * Read only.  The joint's current power, the amount of torque
		 * being applied on the joint's axis of rotation.
		 * @type {Number}
		 * @default 0
		 */
		get power() {
			return this._j.getMotorTorque();
		}

		/**
		 * Set to true if you want the joint's sprites to collide with
		 * each other.
		 * @type {Boolean}
		 * @default false
		 */
		get collideConnected() {
			return this._j.getCollideConnected();
		}
		set collideConnected(val) {
			this._j.m_collideConnected = val;
		}

		/**
		 * Removes the joint from the world and from each of the
		 * sprites' joints arrays.
		 */
		remove() {
			if (this._removed) return;
			this.spriteA.joints.splice(this.spriteA.joints.indexOf(this), 1);
			this.spriteB.joints.splice(this.spriteB.joints.indexOf(this), 1);
			this.p.world.destroyJoint(this._j);
			this._removed = true;
		}
	};

	this.GlueJoint = class extends this.Joint {
		/**
		 * Glue joints are used to glue two sprites together.
		 *
		 * @param {Sprite} spriteA
		 * @param {Sprite} spriteB
		 */
		constructor(spriteA, spriteB) {
			super(...arguments, 'glue');
		}
	};

	this.DistanceJoint = class extends this.Joint {
		/**
		 * Distance joints are used to constrain the distance
		 * between two sprites.
		 *
		 * @param {Sprite} spriteA
		 * @param {Sprite} spriteB
		 */
		constructor(spriteA, spriteB) {
			super(...arguments, 'distance');

			let j = pl.DistanceJoint(
				{},
				spriteA.body,
				spriteB.body,
				spriteA.body.getWorldCenter(),
				spriteB.body.getWorldCenter()
			);
			this._createJoint(j);
		}

		_display() {
			let ancA, ancB;
			if (this.offsetA.x || this.offsetA.y) {
				ancA = this.spriteA.body.getWorldPoint(this._j.m_localAnchorA);
				ancA = scaleFrom(ancA.x, ancA.y, this.spriteA.tileSize);
			}
			if (this.offsetB.x || this.offsetB.y) {
				ancB = this.spriteB.body.getWorldPoint(this._j.m_localAnchorB);
				ancB = scaleFrom(ancB.x, ancB.y, this.spriteB.tileSize);
			}
			this._draw(
				!ancA ? this.spriteA.x : ancA.x,
				!ancA ? this.spriteA.y : ancA.y,
				!ancB ? this.spriteB.x : ancB.x,
				!ancB ? this.spriteB.y : ancB.y
			);
			this.visible = null;
		}
	};

	this.WheelJoint = class extends this.Joint {
		/**
		 * Wheel joints can be used to create vehicles!
		 *
		 * By default the motor is disabled, angle is 90 degrees,
		 * maxPower is 1000, springiness is 0.1, and damping is 0.7.
		 *
		 * @param {Sprite} spriteA the vehicle body
		 * @param {Sprite} spriteB the wheel
		 */
		constructor(spriteA, spriteB) {
			super(...arguments, 'wheel');

			let j = pl.WheelJoint(
				{
					maxMotorTorque: 1000,
					frequencyHz: 4,
					dampingRatio: 0.7
				},
				spriteA.body,
				spriteB.body,
				spriteB.body.getWorldCenter(),
				new pl.Vec2(0, 1)
			);
			this._createJoint(j);
			this._angle = this.p._angleMode == 'degrees' ? 90 : 1.5707963267948966;
		}

		_display() {
			let xA = this.spriteA.x;
			let yA = this.spriteA.y;

			let xB, yB;
			if (!this.offsetB.x && !this.offsetB.y) {
				xB = this.spriteB.x;
				yB = this.spriteB.y;
			} else {
				let ancB = this.spriteB.body.getWorldPoint(this._j.m_localAnchorB);
				ancB = scaleFrom(ancB.x, ancB.y, this.spriteB.tileSize);
				xB = ancB.x;
				yB = ancB.y;
			}

			// Calculate the slopes of the lines
			let slopeA = this.p.tan(this.spriteA.rotation);
			let slopeB = this.p.tan(this._angle + this.spriteA.rotation);

			// Calculate the intersection point
			let xI = (yB - yA + slopeA * xA - slopeB * xB) / (slopeA - slopeB);
			let yI = slopeA * (xI - xA) + yA;

			this._draw(xI, yI, xB, yB);
			this.visible = null;
		}

		/**
		 * The angle at which the wheel is attached to the vehicle body.
		 *
		 * The default is 90 degrees or PI/2 radians, which is vertical.
		 * @type {Number}
		 * @default 90
		 */
		get angle() {
			return this._angle;
		}
		set angle(val) {
			if (val == this._angle) return;
			this._angle = val;
			this._j.m_localXAxisA = new pl.Vec2(this.p.cos(val), this.p.sin(val));
			this._j.m_localXAxisA.normalize();
			this._j.m_localYAxisA = pl.Vec2.crossNumVec2(1.0, this._j.m_localXAxisA);
		}
	};

	this.HingeJoint = class extends this.Joint {
		/**
		 * Hinge joints attach two sprites together at a pivot point,
		 * constraining them to rotate around this point, like a hinge.
		 *
		 * A known as a revolute joint.
		 *
		 * @param {Sprite} spriteA
		 * @param {Sprite} spriteB
		 */
		constructor(spriteA, spriteB) {
			super(...arguments, 'hinge');

			let j = pl.RevoluteJoint({}, spriteA.body, spriteB.body, spriteA.body.getWorldCenter());
			this._createJoint(j);
		}

		_display() {
			const offsetAx = this.offsetA.x;
			const offsetAy = this.offsetA.y;
			const rotationA = this.spriteA.rotation;

			const rotatedOffsetAx = offsetAx * this.p.cos(rotationA) - offsetAy * this.p.sin(rotationA);
			const rotatedOffsetAy = offsetAx * this.p.sin(rotationA) + offsetAy * this.p.cos(rotationA);

			this._draw(this.spriteA.x + rotatedOffsetAx, this.spriteA.y + rotatedOffsetAy);
			this.visible = null;
		}

		/**
		 * The joint's range of rotation. Setting the range
		 * changes the joint's upper and lower limits.
		 * @type {Number}
		 * @default undefined
		 */
		get range() {
			return this.upperLimit - this.lowerLimit;
		}
		set range(val) {
			val /= 2;
			this.upperLimit = val;
			this.lowerLimit = -val;
		}

		/**
		 * The lower limit of rotation.
		 * @type {Number}
		 * @default undefined
		 */
		get lowerLimit() {
			let val = this._j.getLowerLimit();
			if (this.p._angleMode == 'radians') return val;
			return this.p.degrees(val);
		}
		set lowerLimit(val) {
			if (!this._j.isLimitEnabled()) {
				this._j.enableLimit(true);
			}
			this.spriteA.body.setAwake(true);
			this.spriteB.body.setAwake(true);
			if (this.p._angleMode == 'degrees') val = this.p.radians(val);
			this._j.m_lowerAngle = val;
		}

		/**
		 * The upper limit of rotation.
		 * @type {Number}
		 * @default undefined
		 */
		get upperLimit() {
			let val = this._j.getUpperLimit();
			if (this.p._angleMode == 'radians') return val;
			return this.p.degrees(val);
		}
		set upperLimit(val) {
			if (!this._j.isLimitEnabled()) {
				this._j.enableLimit(true);
			}
			this.spriteA.body.setAwake(true);
			this.spriteB.body.setAwake(true);
			if (this.p._angleMode == 'degrees') val = this.p.radians(val);
			this._j.m_upperAngle = val;
		}

		/**
		 * Read only. The joint's current angle of rotation.
		 * @type {Number}
		 * @default 0
		 */
		get angle() {
			let ang = this._j.getJointAngle();
			if (this.p._angleMode == 'radians') return ang;
			return pInst.radians(ang);
		}
	};
	this.RevoluteJoint = this.HingeJoint;

	this.SliderJoint = class extends this.Joint {
		/**
		 * A slider joint constrains the motion of two sprites to sliding
		 * along a common axis, without rotation.
		 *
		 * Also known as a prismatic joint.
		 *
		 * @param {Sprite} spriteA
		 * @param {Sprite} spriteB
		 */
		constructor(spriteA, spriteB) {
			super(...arguments, 'slider');

			let j = pl.PrismaticJoint(
				{
					lowerTranslation: -1,
					upperTranslation: 1,
					enableLimit: true,
					maxMotorForce: 50,
					motorSpeed: 0,
					enableMotor: true
				},
				spriteA.body,
				spriteB.body,
				spriteA.body.getWorldCenter(),
				new pl.Vec2(1, 0)
			);
			this._createJoint(j);
			this._angle = 0;
		}

		/**
		 * The angle of the joint's axis which its sprites slide along.
		 * @type {Number}
		 * @default 0
		 */
		get angle() {
			return this._angle;
		}
		set angle(val) {
			if (val == this._angle) return;
			this._angle = val;
			this._j.m_localXAxisA = new pl.Vec2(this.p.cos(val), this.p.sin(val));
			this._j.m_localXAxisA.normalize();
			this._j.m_localYAxisA = pl.Vec2.crossNumVec2(1.0, this._j.m_localXAxisA);
		}

		/**
		 * The joint's range of translation. Setting the range
		 * changes the joint's upper and lower limits.
		 * @type {Number}
		 * @default undefined
		 */
		get range() {
			return this.upperLimit - this.lowerLimit;
		}
		set range(val) {
			val /= 2;
			this.upperLimit = val;
			this.lowerLimit = -val;
		}

		/**
		 * The mathematical lower (not positionally lower)
		 * limit of translation.
		 * @type {Number}
		 * @default undefined
		 */
		get lowerLimit() {
			return (this._j.getLowerLimit() / this.spriteA.tileSize) * plScale;
		}
		set lowerLimit(val) {
			if (!this._j.isLimitEnabled()) {
				this._j.enableLimit(true);
			}
			val = (val * this.spriteA.tileSize) / plScale;
			this._j.setLimits(val, this._j.getUpperLimit());
		}

		/**
		 * The mathematical upper (not positionally higher)
		 * limit of translation.
		 * @type {Number}
		 * @default undefined
		 */
		get upperLimit() {
			return (this._j.getUpperLimit() / this.spriteA.tileSize) * plScale;
		}
		set upperLimit(val) {
			if (!this._j.isLimitEnabled()) {
				this._j.enableLimit(true);
			}
			val = (val * this.spriteA.tileSize) / plScale;
			this._j.setLimits(this._j.getLowerLimit(), val);
		}
	};
	this.PrismaticJoint = this.SliderJoint;

	this.RopeJoint = class extends this.Joint {
		/**
		 * A Rope joint prevents two sprites from going further
		 * than a certain distance from each other, which is
		 * defined by the max length of the rope, but they do allow
		 * the sprites to get closer together.
		 *
		 * @param {Sprite} spriteA
		 * @param {Sprite} spriteB
		 */
		constructor(spriteA, spriteB) {
			super(...arguments, 'rope');

			let j = pl.RopeJoint(
				{
					maxLength: 1
				},
				spriteA.body,
				spriteB.body,
				spriteA.body.getWorldCenter()
			);
			this._createJoint(j);
			this._j.m_localAnchorB.x = 0;
			this._j.m_localAnchorB.y = 0;
		}

		/**
		 * The maximum length of the rope.
		 */
		get maxLength() {
			return scaleXFrom(this._j.getMaxLength(), this.spriteA.tileSize);
		}
		set maxLength(val) {
			this._j.setMaxLength(scaleXTo(val, this.spriteA.tileSize));
		}
	};

	class Scale {
		constructor() {
			let _this = this;
			Object.defineProperties(this, {
				x: {
					get() {
						return _this._x;
					},
					set(val) {
						if (val == _this._x) return;
						_this._x = val;
						_this._avg = (_this._x + _this._y) * 0.5;
					},
					configurable: true,
					enumerable: true
				},
				y: {
					get() {
						return _this._y;
					},
					set(val) {
						if (val == _this._y) return;
						_this._y = val;
						_this._avg = (_this._x + _this._y) * 0.5;
					},
					configurable: true,
					enumerable: true
				},
				_x: {
					value: 1,
					enumerable: false,
					writable: true
				},
				_y: {
					value: 1,
					enumerable: false,
					writable: true
				},
				_avg: {
					value: 1,
					enumerable: false,
					writable: true
				}
			});
		}

		valueOf() {
			return this._avg;
		}
	}

	// source: https://stackoverflow.com/a/8796597/3792062
	function decodeFloat16(b) {
		let e = (b & 0x7c00) >> 10,
			f = b & 0x03ff;
		return (
			(b >> 15 ? -1 : 1) *
			(e ? (e === 0x1f ? (f ? NaN : Infinity) : Math.pow(2, e - 15) * (1 + f / 0x400)) : 6.103515625e-5 * (f / 0x400))
		);
	}

	// source: https://stackoverflow.com/a/32633586/3792062
	const encodeFloat16 = (function () {
		let fv = new Float32Array(1);
		let iv = new Int32Array(fv.buffer);
		return function toHalf(v) {
			fv[0] = v;
			let x = iv[0];
			let b = (x >> 16) & 0x8000;
			let m = (x >> 12) & 0x07ff;
			let e = (x >> 23) & 0xff;
			if (e < 103) return b;
			if (e > 142) {
				b |= 0x7c00;
				b |= (e == 255 ? 0 : 1) && x & 0x007fffff;
				return b;
			}
			if (e < 113) {
				m |= 0x0800;
				b |= (m >> (114 - e)) + ((m >> (113 - e)) & 1);
				return b;
			}
			b |= ((e - 112) << 10) | (m >> 1);
			b += m & 1;
			return b;
		};
	})();

	function isArrowFunction(fn) {
		return !/^(?:(?:\/\*[^(?:\*\/)]*\*\/\s*)|(?:\/\/[^\r\n]*))*\s*(?:(?:(?:async\s(?:(?:\/\*[^(?:\*\/)]*\*\/\s*)|(?:\/\/[^\r\n]*))*\s*)?function|class)(?:\s|(?:(?:\/\*[^(?:\*\/)]*\*\/\s*)|(?:\/\/[^\r\n]*))*)|(?:[_$\w][\w0-9_$]*\s*(?:\/\*[^(?:\*\/)]*\*\/\s*)*\s*\()|(?:\[\s*(?:\/\*[^(?:\*\/)]*\*\/\s*)*\s*(?:(?:['][^']+['])|(?:["][^"]+["]))\s*(?:\/\*[^(?:\*\/)]*\*\/\s*)*\s*\]\())/.test(
			fn.toString()
		);
	}

	/*
	 * Checks if the given string contains a valid collider type
	 * or collider type code letter:
	 *
	 * 'd' or 'dynamic'
	 * 's' or 'static'
	 * 'k' or 'kinematic'
	 * 'n' or 'none'
	 */
	function isColliderType(t) {
		if (t == 'd' || t == 's' || t == 'k' || t == 'n') return true;
		let abr = t.slice(0, 2);
		return abr == 'dy' || abr == 'st' || abr == 'ki' || abr == 'no';
	}

	/*
	 * Returns an array with the line length, angle, and number of sides
	 * of a regular polygon, which is used internally to create a Sprite
	 * using line mode.
	 */
	function getRegularPolygon(lineLength, name) {
		let l = lineLength;
		let n = name.toLowerCase();
		if (n == 'triangle') l = [l, -120, 3];
		else if (n == 'square') l = [l, -90, 4];
		else if (n == 'pentagon') l = [l, -72, 5];
		else if (n == 'hexagon') l = [l, -60, 6];
		else if (n == 'septagon') l = [l, -51.4285714286, 7];
		else if (n == 'octagon') l = [l, -45, 8];
		else if (n == 'enneagon') l = [l, -40, 9];
		else if (n == 'decagon') l = [l, -36, 10];
		else if (n == 'hendecagon') l = [l, -32.7272727273, 11];
		else if (n == 'dodecagon') l = [l, -30, 12];
		if (l == lineLength) throw new Error('Invalid, not a regular polygon: ' + name);
		return l;
	}

	// default color palettes
	this.p5play.palettes = [
		{
			a: 'aqua',
			b: 'black',
			c: 'crimson',
			d: 'darkviolet',
			e: 'peachpuff',
			f: 'olive',
			g: 'green',
			h: 'hotpink',
			i: 'indigo',
			j: 'navy',
			k: 'khaki',
			l: 'lime',
			m: 'magenta',
			n: 'brown',
			o: 'orange',
			p: 'pink',
			q: 'turquoise',
			r: 'red',
			s: 'skyblue',
			t: 'tan',
			u: 'blue',
			v: 'violet',
			w: 'white',
			x: 'gold',
			y: 'yellow',
			z: 'gray'
		}
	];

	/**
	 * Gets a color from a color palette
	 *
	 * @func colorPal
	 * @param {String} c A single character, a key found in the color palette object.
	 * @param {Number|Object} palette Can be a palette object or number index
	 * in the system's palettes array.
	 * @returns {String} a hex color string for use by p5.js functions
	 */
	this.colorPal = (c, palette) => {
		if (c instanceof p5.Color) return c;
		if (typeof palette == 'number') {
			palette = pInst.p5play.palettes[palette];
		}
		palette ??= pInst.p5play.palettes[0];
		let clr;
		if (palette) clr = palette[c];
		// if transparent
		if (clr === '' || c === '.' || c === ' ') {
			return pInst.color(0, 0, 0, 0);
		}
		return pInst.color(clr || c);
	};

	/**
	 * Create pixel art images from a string. Each character in the
	 * input string represents a color value defined in the palette
	 * object.
	 *
	 * @func spriteArt
	 * @param {String} txt Each character represents a pixel color value
	 * @param {Number} scale The scale of the image
	 * @param {Number|Object} palette Color palette
	 * @returns {p5.Image} A p5.Image object
	 *
	 * @example
	 * let str = `
	 * ...yyyy
	 * .yybyybyy
	 * yyyyyyyyyy
	 * yybyyyybyy
	 * .yybbbbyy
	 * ...yyyy`;
	 *
	 * let img = spriteArt(str);
	 */
	this.spriteArt = (txt, scale, palette) => {
		scale ??= 1;
		if (typeof palette == 'number') {
			palette = pInst.p5play.palettes[palette];
		}
		palette ??= pInst.p5play.palettes[0];
		let lines = txt; // accepts 2D arrays of characters
		if (typeof txt == 'string') {
			txt = txt.trim();
			txt = txt.replace(/\r*\n\t+/g, '\n'); // trim leading tabs
			txt = txt.replace(/\s+$/g, ''); // trim trailing whitespace
			lines = txt.split('\n');
		}
		let w = 0;
		for (let line of lines) {
			if (line.length > w) w = line.length;
		}
		let h = lines.length;
		let img = pInst.createImage(w * scale, h * scale);
		img.loadPixels();

		for (let i = 0; i < lines.length; i++) {
			for (let j = 0; j < lines[i].length; j++) {
				for (let sX = 0; sX < scale; sX++) {
					for (let sY = 0; sY < scale; sY++) {
						let c = this.colorPal(lines[i][j], palette);
						img.set(j * scale + sX, i * scale + sY, c);
					}
				}
			}
		}
		img.updatePixels();
		img.w = img.width;
		img.h = img.height;
		pInst.p5play.images.onLoad(img);
		return img; // return the p5 graphics object
	};

	/**
	 * Use of `new Sprite()` is preferred.
	 *
	 * Creates a new sprite.
	 *
	 * @deprecated
	 * @returns {Sprite}
	 */
	this.createSprite = function () {
		return new this.Sprite(...arguments);
	};

	/**
	 * Use of `new Group()` is preferred.
	 *
	 * Creates a new group of sprites.
	 *
	 * @deprecated
	 * @returns {Group}
	 */
	this.createGroup = function () {
		return new this.Group(...arguments);
	};

	/**
	 * Alias for `new SpriteAnimation()`
	 *
	 * Load animations in the preload p5.js function if you need to use
	 * them when your program starts.
	 *
	 * @returns {SpriteAnimation}
	 */
	this.loadAnimation = this.loadAni = function () {
		return new this.SpriteAnimation(...arguments);
	};

	/**
	 * Displays an animation. Similar to the p5.js image function.
	 *
	 * @param {SpriteAnimation} ani Animation to be displayed
	 * @param {Number} x position of the animation on the canvas
	 * @param {Number} y position of the animation on the canvas
	 * @param {Number} r rotation of the animation
	 * @param {Number} sX scale of the animation in the x direction
	 * @param {Number} sY scale of the animation in the y direction
	 */
	this.animation = function (ani, x, y, r, sX, sY) {
		if (ani.visible) ani.update();
		ani.draw(x, y, r, sX, sY);
	};

	/**
	 * Delay code execution in an async function for the specified time
	 * or if no input parameter is given, it waits for the next possible
	 * animation frame.
	 *
	 * @param {Number} millisecond
	 * @returns {Promise} A Promise that fulfills after the specified time.
	 *
	 * @example
	 * async function startGame() {
	 *   await delay(3000);
	 * }
	 */
	this.delay = (millisecond) => {
		if (!millisecond) {
			return new Promise(requestAnimationFrame);
		} else {
			// else it wraps setTimeout in a Promise
			return new Promise((resolve) => {
				setTimeout(resolve, millisecond);
			});
		}
	};

	/**
	 * Alternative to `delay`, which is preferred, but this name may be more
	 * familiar to Processing Java users.
	 */
	this.sleep = (millisecond) => {
		return this.delay(millisecond);
	};

	/**
	 * Awaitable function for playing sounds.
	 *
	 * @param {any} sound
	 * @returns {Promise}
	 * @example
	 * await play(sound);
	 */
	this.play = (sound) => {
		if (!sound?.play) {
			throw new Error("Tried to play your sound but it wasn't a sound object.");
		}
		return new Promise((resolve) => {
			sound.play();
			sound.onended(() => resolve());
		});
	};

	async function playIntro() {
		if (document.getElementById('p5play-intro')) return;
		pInst._incrementPreload();
		let d = document.createElement('div');
		d.id = 'p5play-intro';
		d.style = 'position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 1000; background-color: black;';
		let logo = document.createElement('img');
		logo.src = 'https://p5play.org/v3/made_with_p5play.png';
		logo.style =
			'position: absolute; top: 50%; left: 50%; width: 40vh; height: 20vh; margin-left: -20vh; margin-top: -10vh; z-index: 1000; opacity: 0; transition: opacity 0.1s ease-in-out;';
		document.body.append(d);
		d.append(logo);
		await pInst.delay(100);
		logo.style.opacity = '1';
		logo.style.transition = 'scale 1.4s, opacity 0.4s ease-in-out';
		logo.style.scale = '1.1';
		await pInst.delay(1100);
		logo.style.opacity = '0';
		await pInst.delay(300);
		d.style.display = 'none';
		d.remove();
		document.getElementById('p5play-intro')?.remove();
		pInst._decrementPreload();
	}

	{
		let lh = location.hostname;
		switch (lh) {
			case '':
			case '127.0.0.1':
			case 'localhost':
			case 'p5play.org':
			case 'editor.p5js.org':
			case 'codepen.io':
			case 'codera.app':
			case 'cdpn.io':
			case 'glitch.com':
			case 'replit.com':
			case 'stackblitz.com':
			case 'jsfiddle.net':
			case 'aijs-912fe.web.app':
				break;
			default:
				if (
					/^[\d\.]+$/.test(lh) ||
					lh.endsWith('stackblitz.io') ||
					lh.endsWith('glitch.me') ||
					lh.endsWith('repl.co') ||
					lh.endsWith('codehs.com') ||
					lh.endsWith('openprocessing.org') ||
					location.origin.endsWith('preview.p5js.org')
				) {
					break;
				}
				playIntro();
		}
	}

	let userDisabledP5Errors = p5.disableFriendlyErrors;
	p5.disableFriendlyErrors = true;

	/**
	 * p5.js canvas element. Use this property to get the canvas'
	 * width and height
	 * @property {p5.Canvas} canvas
	 * @property {Number} canvas.w the width of the canvas
	 * @property {Number} canvas.h the height of the canvas
	 */
	this.canvas = this.canvas;

	const _createCanvas = this.createCanvas;

	/**
	 * Use of `new Canvas()` is preferred.
	 *
	 * p5play adds some extra functionality to the p5.js createCanvas
	 * function.
	 *
	 * In p5play, a canvas can be created with an aspect ratio in the
	 * format `width:height`. For example `new Canvas('16:9')` will create
	 * the largest possible canvas with a 16:9 aspect ratio.
	 *
	 * This function also disables the default keydown responses for
	 * the arrow keys, slash, and space. This is to prevent the
	 * browser from scrolling the page when the user is playing a game
	 * using common keyboard commands.
	 *
	 * @param {Number} width|ratio
	 * @param {Number} height
	 */
	this.createCanvas = function () {
		let args = [...arguments];
		let isFullScreen = false;
		let pixelated = false;
		let w, h, ratio;
		if (typeof args[0] == 'string') {
			if (args[0].includes(':')) ratio = args[0].split(':');
			else {
				args[2] = args[0];
				args[0] = undefined;
			}
			if (args[1] == 'fullscreen') isFullScreen = true;
		}
		if (!args[0]) {
			args[0] = window.innerWidth;
			args[1] = window.innerHeight;
			isFullScreen = true;
		} else if (typeof args[0] == 'number' && typeof args[1] != 'number') {
			args[2] = args[1];
			args[1] = args[0];
		}
		let scale;
		if (typeof args[2] == 'string') {
			let rend = args[2].toLowerCase();
			if (rend != 'p2d' && rend != 'webgl') {
				rend = rend.split(' ');
				args.pop();
			}
			if (rend[0] == 'pixelated') {
				pixelated = true;
				if (!rend[1]) isFullScreen = true;
				else scale = Number(rend[1].slice(1));
				ratio = [args[0], args[1]];
			}
			if (rend[0] == 'fullscreen') {
				isFullScreen = true;
			}
		}
		if (ratio) {
			let rW = Number(ratio[0]);
			let rH = Number(ratio[1]);
			if (!scale) {
				w = window.innerWidth;
				h = window.innerWidth * (rH / rW);
				if (h > window.innerHeight) {
					w = window.innerHeight * (rW / rH);
					h = window.innerHeight;
				}
			} else {
				w = rW * scale;
				h = rH * scale;
			}
			w = Math.round(w);
			h = Math.round(h);

			if (!pixelated) {
				args[0] = w;
				args[1] = h;
			}
		}
		let can = _createCanvas.call(pInst, ...args);
		this.canvas.tabIndex = 0;
		this.canvas.w = args[0];
		this.canvas.h = args[1];
		this.canvas.addEventListener('keydown', function (e) {
			if (
				e.key == ' ' ||
				e.key == '/' ||
				e.key == 'ArrowUp' ||
				e.key == 'ArrowDown' ||
				e.key == 'ArrowLeft' ||
				e.key == 'ArrowRight'
			) {
				e.preventDefault();
			}
		});
		this.canvas.addEventListener('mouseover', () => {
			this.mouse.isOnCanvas = true;
			this.mouse.active = true;
		});
		this.canvas.addEventListener('mouseleave', () => {
			this.mouse.isOnCanvas = false;
		});
		this.canvas.addEventListener('touchstart', (e) => e.preventDefault());
		// this stops the right click menu from appearing
		this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
		this.canvas.resize = this.resizeCanvas;
		this.canvas.hw = this.canvas.w * 0.5;
		this.canvas.hh = this.canvas.h * 0.5;
		this.camera.x = this.canvas.hw;
		this.camera.y = this.canvas.hh;
		if (!userDisabledP5Errors) p5.disableFriendlyErrors = false;

		/* prevent callout to copy image, etc when tap to hold */
		/* prevent webkit from resizing text to fit */
		/* prevent copy paste, to allow, change 'none' to 'text' */
		let style = `
.p5Canvas, .q5Canvas {
	outline: none;
	-webkit-touch-callout: none;
	-webkit-text-size-adjust: none;
	-webkit-user-select: none;
	overscroll-behavior: none;
}
main {
	overscroll-behavior: none;
}`;
		if (isFullScreen) {
			style = 'html,\nbody,\n' + style;
			style += `
html, body {
	margin: 0;
	padding: 0;
	overflow: hidden;
	height: 100%;
}
main {
	margin: auto;
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	justify-content: center;
	height: 100%;
}`;
		}
		if (pixelated) {
			style += `
#${this.canvas.id} {
	image-rendering: pixelated;
	width: ${w}px!important;
	height: ${h}px!important;
}`;
		}
		let styleElem = document.createElement('style');
		styleElem.innerHTML = style;
		document.head.appendChild(styleElem);

		if (pixelated) {
			pInst.pixelDensity(1);
			pInst.noSmooth();
		}

		let idx = navigator.userAgent.indexOf('iPhone OS');
		if (idx > -1) {
			let version = navigator.userAgent.substring(idx + 10, idx + 12);
			this.p5play.version = version;
			if (version < 16) {
				pInst.pixelDensity(1);
			}
			this.p5play.os.platform = 'iOS';
			this.p5play.os.version = version;
		} else if (navigator.userAgentData !== undefined) {
			this.p5play.os.platform = navigator.userAgentData.platform;
		}

		return can;
	};

	// this is only for jsdoc
	this.Canvas = class {
		/**
		 * Creates a p5.js canvas element. Includes some extra features such as
		 * a pixelated mode. It can also use ratios instead of setting width and
		 * height directly. See the Canvas learn page for more information.
		 *
		 * @param {Number} w width of the canvas
		 * @param {Number} h height of the canvas
		 * @param {String} [mode] 'pixelated' or 'fullscreen'
		 * @example
		 * new Canvas(400, 400);
		 *
		 * new Canvas('16:9');
		 */
		constructor(w, h, mode) {}

		/**
		 * The width of the canvas.
		 * @type {Number}
		 * @default 100
		 */
		get w() {}

		/**
		 * The width of the canvas.
		 * @type {Number}
		 * @default 100
		 */
		get width() {}

		/**
		 * The height of the canvas.
		 * @type {Number}
		 * @default 100
		 */
		get h() {}

		/**
		 * The height of the canvas.
		 * @type {Number}
		 * @default 100
		 */
		get height() {}

		/**
		 * Resizes the canvas, the world, and centers the camera.
		 *
		 * Visually the canvas will shrink or extend to the new size. Sprites
		 * will not change position.
		 *
		 * If you would prefer to keep the camera focused on the same area, then
		 * you must manually adjust the camera position after calling this
		 * function.
		 *
		 * @param {Number} w - The new width of the canvas.
		 * @param {Number} h - The new height of the canvas.
		 */
		resize() {}
	};

	this.Canvas = function () {
		return pInst.createCanvas(...arguments);
	};

	const _resizeCanvas = this.resizeCanvas;

	/**
	 * Use of `canvas.resize()` is preferred.
	 */
	this.resizeCanvas = (w, h) => {
		_resizeCanvas.call(this, w, h);
		this.canvas.hw = this.canvas.w * 0.5;
		this.canvas.hh = this.canvas.h * 0.5;
		this.camera._pos.x = this.canvas.hw;
		this.camera._pos.y = this.canvas.hh;
	};

	const _background = this.background;

	/**
	 * Just like the p5.js background function except it also accepts
	 * a color palette code.
	 */
	this.background = function () {
		let args = arguments;
		let c;
		if (args.length == 1 && (typeof args[0] == 'string' || args[0] instanceof p5.Color)) {
			c = this.colorPal(args[0]);
		}
		if (c !== undefined) _background.call(this, c);
		else _background.call(this, ...args);
	};

	const _fill = this.fill;

	/**
	 * Just like the p5.js fill function except it also accepts
	 * a color palette code.
	 */
	this.fill = function () {
		let args = arguments;
		let c;
		if (args.length == 1) {
			c = this.colorPal(args[0]);
		}
		if (c !== undefined) _fill.call(this, c);
		else _fill.call(this, ...args);
	};

	const _stroke = this.stroke;

	/**
	 * Just like the p5.js stroke function except it also accepts
	 * a color palette code.
	 */
	this.stroke = function () {
		let args = arguments;
		let c;
		if (args.length == 1) {
			c = this.colorPal(args[0]);
		}
		if (c !== undefined) _stroke.call(this, c);
		else _stroke.call(this, ...args);
	};

	// images is a cache of loaded/loading images, to prevent making
	// the same loadImage fetch requests multiple times (inefficient)
	this.p5play.images = {
		onLoad: (img) => {} // called anytime an image is fully loaded
	};

	// This is a debugging tool that disables images from loading
	// or displaying. Mainly used to test other people's projects without
	// having to download their images.
	this.p5play.disableImages = false;

	const _loadImage = this.loadImage;

	/**
	 * Just like the p5.js loadImage function except it also caches images
	 * so that they are only loaded once. Multiple calls to loadImage with
	 * the same path will return the same image object. It also adds the
	 * image's url as a property of the image object.
	 *
	 * @param {string} url
	 * @param {number} [width]
	 * @param {number} [height]
	 * @param {function} [callback]
	 */
	this.loadImage = this.loadImg = function () {
		if (this.p5play.disableImages) {
			pInst._decrementPreload();
			// return a dummy image object to prevent errors
			return { w: 16, width: 16, h: 16, height: 16, pixels: [] };
		}
		let args = arguments;
		let url = args[0];
		let img = pInst.p5play.images[url];
		let cb;
		if (typeof args[args.length - 1] == 'function') {
			cb = args[args.length - 1];
		}
		if (img) {
			// if not finished loading, add callback to the list
			if ((img.width == 1 && img.height == 1) || !img.pixels.length) {
				if (cb) {
					img.cbs.push(cb);
					img.calls++;
				} else pInst._decrementPreload();
			} else {
				if (cb) cb(); // if already loaded, run the callback immediately
				pInst._decrementPreload();
			}
			return img;
		}
		const _cb = (_img) => {
			_img.w = _img.width;
			_img.h = _img.height;
			for (let cb of _img.cbs) {
				cb(_img);
			}
			for (let i = 1; i < _img.calls; i++) {
				pInst._decrementPreload();
			}
			_img.cbs = [];
			pInst.p5play.images.onLoad(img);
		};
		img = _loadImage.call(pInst, url, _cb);
		img.cbs = [];
		img.calls = 1;
		if (cb) img.cbs.push(cb);
		img.url = url;
		pInst.p5play.images[url] = img;
		return img;
	};

	const _image = this.image;

	this.image = function () {
		if (pInst.p5play.disableImages) return;
		_image.call(pInst, ...arguments);
	};

	// if the user isn't using q5.js
	// add text caching to p5.js
	if (typeof this._textCache === 'undefined') {
		const $ = this;
		$._textCache = true;
		$._TimedCache = class extends Map {
			constructor() {
				super();
				this.maxSize = 500;
			}
			set(k, v) {
				v.lastAccessed = Date.now();
				super.set(k, v);
				if (this.size > this.maxSize) this.gc();
			}
			get(k) {
				const v = super.get(k);
				if (v) v.lastAccessed = Date.now();
				return v;
			}
			gc() {
				let t = Infinity;
				let oldest;
				let i = 0;
				for (const [k, v] of this.entries()) {
					if (v.lastAccessed < t) {
						t = v.lastAccessed;
						oldest = i;
					}
					i++;
				}
				i = oldest;
				for (const k of this.keys()) {
					if (i == 0) {
						oldest = k;
						break;
					}
					i--;
				}
				this.delete(oldest);
			}
		};
		$._tic = new $._TimedCache();
		/**
		 * Enables or disables text caching.
		 * @param {Boolean} b
		 * @param {Number} maxSize
		 */
		$.textCache = (b, maxSize) => {
			if (maxSize) $._tic.maxSize = maxSize;
			if (b !== undefined) $._textCache = b;
			return $._textCache;
		};
		function _genTextImageKey(str, w, h) {
			const ctx = $.canvas.getContext('2d');
			const r = $._renderer;
			let font = r._textFont;
			if (typeof font != 'string') {
				font = font.font.names.fullName;
				font = font[Object.keys(font)[0]];
			}
			return (
				str.slice(0, 200) +
				(r._textStyle || 'normal') +
				r._textSize +
				font +
				(r._doFill ? ctx.fillStyle : '') +
				'_' +
				(r._doStroke && r._strokeSet ? ctx.lineWidth + ctx.strokeStyle + '_' : '') +
				(w || '') +
				(h ? 'x' + h : '')
			);
		}
		/**
		 * Creates an image from text.
		 * @param {String} str
		 * @param {Number} w line width limit
		 * @param {Number} h height limit
		 * @returns {p5.Image}
		 */
		$.createTextImage = (str, w, h) => {
			let og = $._textCache;
			$._textCache = true;
			$._useCache = true;
			$.text(str, 0, 0, w, h);
			$._useCache = false;
			let k = _genTextImageKey(str, w, h);
			$._textCache = og;
			return $._tic.get(k);
		};
		const _text = $.text;
		/**
		 * Displays text on the canvas.
		 *
		 * @param {String} str text to display
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w line width limit
		 * @param {Number} h height limit
		 */
		$.text = (str, x, y, w, h) => {
			if (str === undefined) return;
			str = str.toString();
			const r = $._renderer;
			if (!r._doFill && !r._doStroke) return;
			let c, ti, k, cX, cY, _ascent, _descent;
			const ctx = $.canvas.getContext('2d');
			let t = ctx.getTransform();
			let useCache = $._useCache || ($._textCache && (t.b != 0 || t.c != 0));
			if (!useCache) return _text.call($, str, x, y, w, h);
			k = _genTextImageKey(str, w, h);
			ti = $._tic.get(k);
			if (ti) {
				$.textImage(ti, x, y);
				return;
			}
			let tg = $.createGraphics.call($, 1, 1);
			tg.textFont(r._textFont);
			if (r._textStyle) tg.textStyle(r._textStyle);
			tg.textSize(r._textSize);
			c = tg.canvas.getContext('2d');
			let lines = str.split('\n');
			cX = 0;
			cY = r._textLeading * lines.length;
			let m = c.measureText(' ');
			_ascent = m.fontBoundingBoxAscent;
			_descent = m.fontBoundingBoxDescent;
			h ??= cY + _descent;
			tg.resizeCanvas(Math.ceil(tg.textWidth(str)), Math.ceil(h));
			c.fillStyle = ctx.fillStyle;
			c.strokeStyle = ctx.strokeStyle;
			c.lineWidth = ctx.lineWidth;
			let f = c.fillStyle;
			if (!r._fillSet) c.fillStyle = 'black';
			for (let i = 0; i < lines.length; i++) {
				if (r._doStroke && r._strokeSet) c.strokeText(lines[i], cX, cY);
				if (r._doFill) c.fillText(lines[i], cX, cY);
				cY += r._textLeading;
				if (cY > h) break;
			}
			if (!r._fillSet) c.fillStyle = f;
			ti = tg.get();
			let pd = $.pixelDensity();
			ti.width /= pd;
			ti.height /= pd;
			ti._ascent = _ascent;
			ti._descent = _descent;
			$._tic.set(k, ti);
			$.textImage(ti, x, y);
		};
		/**
		 * Displays an image based on text alignment settings.
		 * @param {p5.Image} img
		 * @param {Number} x
		 * @param {Number} y
		 */
		$.textImage = (img, x, y) => {
			let og = $._renderer._imageMode;
			$.imageMode.call($, 'corner');
			const ctx = $.canvas.getContext('2d');
			if (ctx.textAlign == 'center') x -= img.width * 0.5;
			else if (ctx.textAlign == 'right') x -= img.width;

			let leadDiff;
			if (ctx.textBaseline == 'alphabetic') y -= $._renderer._textLeading;
			else leadDiff = $._renderer._textLeading - $._renderer._textSize;

			if (ctx.textBaseline == 'middle') y -= img._descent + img._ascent * 0.5 + leadDiff;
			else if (ctx.textBaseline == 'bottom') y -= img._ascent + img._descent + leadDiff;
			else if (ctx.textBaseline == 'top') y -= img._descent + leadDiff;

			$.image.call($, img, x, y);
			$.imageMode.call($, og);
		};
	}

	let errMsgs = {
		generic: [
			'Ah! I found an error',
			'Oh no! Something went wrong',
			'Oof! Something went wrong',
			'Houston, we have a problem',
			'Whoops, having trouble here'
		],
		Sprite: {
			constructor: {
				base: "Sorry I'm unable to make a new Sprite",
				0: "What is $0 for? If you're trying to specify the x position of the sprite, please specify the y position as well.",
				1: "If you're trying to specify points for a chain Sprite, please use an array of position arrays.\n$0",
				2: 'Invalid input parameters: $0'
			},
			hw: {
				0: "I can't change the halfWidth of a Sprite directly, change the sprite's width instead."
			},
			hh: {
				1: "I can't change the halfHeight of a Sprite directly, change the sprite's height instead."
			},
			rotate: {
				0: "Can't use this function on a sprite with a static collider, try changing the sprite's collider type to kinematic.",
				1: 'Can\'t use "$0" for the angle of rotation, it must be a number.'
			},
			rotateTo: {},
			rotateTowards: {},
			changeAnimation: `I can't find any animation named "$0".`,
			collide: {
				0: "I can't make that sprite collide with $0. Sprites can only collide with another sprite or a group.",
				1: 'The collision callback has to be a function.',
				2: "You're trying to check for an collision with a sprite or group that doesn't exist!"
			},
			overlap: {
				0: "I can't make that sprite overlap with $0. Sprites can only overlap with another sprite or a group.",
				1: 'The overlap callback has to be a function.',
				2: "You're trying to check for an overlap with a sprite or group that doesn't exist!"
			}
		},
		SpriteAnimation: {
			constructor: {
				base: "Hey so, I tried to make a new SpriteAnimation but couldn't",
				0: `I don't know how to display this type of image: "$0". I can only use ".png" image files.`,
				1: 'The name of the animation must be the first input parameter.'
			},
			frame: 'Index $0 out of bounds. That means there is no frame $0 in this animation. It only has $1 frames!'
		},
		Group: {
			constructor: {
				base: "Hmm awkward! Well it seems I can't make that new Group you wanted"
			}
		}
	};
	errMsgs.Group.collide = errMsgs.Sprite.collide;
	errMsgs.Group.overlap = errMsgs.Sprite.overlap;
	errMsgs.Sprite.rotateTo[0] = errMsgs.Sprite.rotateTowards[0] = errMsgs.Sprite.rotate[0];

	/**
	 * A FriendlyError is a custom error class that extends the native JS
	 * Error class. It's used internally by p5play to make error messages
	 * more helpful.
	 *
	 * @private
	 * @param {String} func the name of the function the error was thrown in
	 * @param {Number} errorNum the error's code number
	 * @param {Array} e an array of values relevant to the error
	 */
	class FriendlyError extends Error {
		constructor(func, errorNum, e) {
			super();

			if (typeof func != 'string') {
				e = errorNum;
				errorNum = func;
				func = this.stack.match(/\n\s*at ([^\(]*)/)[1];
				func = func.slice(0, -1);
			}
			if (typeof errorNum != 'number') {
				e = errorNum;
				errorNum = undefined;
			}
			if (func.slice(0, 3) == 'new') func = func.slice(4);
			func = func.split('.');
			let className = func[0];
			func = func[1] || 'constructor';

			let ln = this.stack.match(/\/([^p\/][^5][^\/:]*:[^\/:]+):/);
			if (ln) {
				ln = ln[1].split(':');
				ln = ' in ' + ln[0] + ' at line ' + ln[1];
			}
			ln = ' using ' + className + '.' + func + '. ';

			e = e || [];

			let m = errMsgs[className][func];
			let msg;
			if (m.base) msg = m.base + ln;
			else msg = errMsgs.generic[Math.floor(Math.random() * errMsgs.generic.length)] + ln;
			if (errorNum !== undefined) m = m[errorNum];
			m = m.replace(/\$([0-9]+)/g, (m, n) => {
				return e[n];
			});
			msg += m;

			p5._friendlyError(msg, func);
		}
	}

	/**
	 * A group that includes all the sprites.
	 * @type {Group}
	 */
	this.allSprites = new this.Group();

	/**
	 * The physics world.
	 * @type {World}
	 */
	this.world = new this.World();

	/**
	 * The default camera.
	 * @type {Camera}
	 */
	this.camera = new this.Camera();

	this.InputDevice = class {
		/**
		 * <a href="https://p5play.org/learn/input_devices.html">
		 * Look at the Input reference pages before reading these docs.
		 * </a>
		 *
		 * Root class for storing the state of inputs (mouse, keyboard,
		 * gamepads).
		 *
		 * -3 means input was pressed and released on the same frame
		 * -2 means input was released after being held
		 * -1 means input was released
		 * 0 means input is not pressed
		 * 1 means input was pressed
		 * >1 means input is still being pressed
		 */
		constructor() {
			/**
			 * The amount of frames an input must be pressed to be considered held.
			 * @type {number}
			 * @default 12
			 */
			this.holdThreshold = 12;

			this._default = 0;
		}

		/*
		 * Initializes the input's values to zero.
		 */
		_init(inputs) {
			for (let inp of inputs) {
				this[inp] = 0;
			}
		}

		/*
		 * Attempt to auto-correct the user's input. Inheriting classes
		 * override this method.
		 */
		_ac(inp) {
			return inp;
		}

		/**
		 * @param {string} inp
		 * @returns {boolean} true on the first frame that the user presses the input
		 */
		presses(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] == 1 || this[inp] == -3;
		}

		/**
		 * @param {string} inp
		 * @returns {number} the amount of frames the user has been pressing the input
		 */
		pressing(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			if (this[inp] == -3) return 1;
			return this[inp] > 0 ? this[inp] : 0;
		}

		/**
		 * Same as the `released` function, which is preferred.
		 * @param {string} inp
		 * @returns {boolean} true on the first frame that the user released the input
		 */
		pressed(inp) {
			return this.released(inp);
		}

		/**
		 * @param {string} inp
		 * @returns {boolean} true on the first frame that the user holds the input
		 */
		holds(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] == this.holdThreshold;
		}

		/**
		 * @param {string} inp
		 * @returns {number} the amount of frames the user has been holding the input
		 */
		holding(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] >= this.holdThreshold ? this[inp] : 0;
		}

		/**
		 * @param {string} inp
		 * @returns {boolean} true on the first frame that the user released a held input
		 */
		held(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] == -2;
		}

		/**
		 * @param {string} inp
		 * @returns {boolean} true on the first frame that the user released the input
		 */
		released(inp) {
			inp ??= this._default;
			if (this[inp] === undefined) inp = this._ac(inp);
			return this[inp] <= -1;
		}

		releases(inp) {
			return this.released(inp);
		}
	};

	this._Mouse = class extends this.InputDevice {
		/**
		 * <a href="https://p5play.org/learn/input_devices.html">
		 * Look at the Input reference pages before reading these docs.
		 * </a>
		 *
		 * Used to create the `mouse` input object.
		 */
		constructor() {
			super();
			this._default = 'left';

			let _this = this;

			// this.x and this.y store the actual position values of the mouse
			this._pos = pInst.createVector.call(pInst);

			Object.defineProperty(this._pos, 'x', {
				get() {
					return _this.x;
				},
				set(val) {
					_this.x = val;
				}
			});

			Object.defineProperty(this._pos, 'y', {
				get() {
					return _this.y;
				},
				set(val) {
					_this.y = val;
				}
			});

			/**
			 * The mouse's x position.
			 * @type {Number}
			 */
			this.x;
			/**
			 * The mouse's y position.
			 * @type {Number}
			 */
			this.y;
			/**
			 * The mouse's left button.
			 * @type {Number}
			 */
			this.left;
			/**
			 * The mouse's center button.
			 * @type {Number}
			 */
			this.center;
			/**
			 * The mouse's right button.
			 * @type {Number}
			 */
			this.right;

			let inputs = ['x', 'y', 'left', 'center', 'right'];
			this._init(inputs);
			/**
			 * Contains the drag status of each of the mouse's buttons.
			 * @type {object}
			 */
			this.drag = {
				left: 0,
				center: 0,
				right: 0
			};
			/**
			 * Whether the mouse is currently on the canvas or not.
			 * @type {boolean}
			 * @default false
			 */
			this.isOnCanvas = false;
			/**
			 * True if the mouse has ever interacted with the canvas.
			 * @type {boolean}
			 * @default false
			 */
			this.active = false;

			this._visible = true;
			this._cursor = 'default';
		}

		_ac(inp) {
			inp = inp.toLowerCase();
			if (inp.slice(0, 4) == 'left') inp = 'left';
			else if (inp.slice(0, 5) == 'right') inp = 'right';
			else if (inp.slice(0, 6) == 'middle') inp = 'center';
			return inp;
		}

		update() {
			this.x = (pInst.mouseX - pInst.canvas.hw) / pInst.camera.zoom + pInst.camera.x;
			this.y = (pInst.mouseY - pInst.canvas.hh) / pInst.camera.zoom + pInst.camera.y;

			pInst.camera.mouse.x = pInst.mouseX;
			pInst.camera.mouse.y = pInst.mouseY;
		}

		/**
		 * The mouse's position.
		 * @type {object}
		 */
		get pos() {
			return this._pos;
		}
		/**
		 * The mouse's position. Alias for pos.
		 * @type {object}
		 */
		get position() {
			return this._pos;
		}

		/**
		 * The mouse's CSS cursor style.
		 * @type {string}
		 * @default 'default'
		 */
		get cursor() {
			return pInst.canvas.style.cursor;
		}
		set cursor(val) {
			if (val != this._cursor) {
				pInst.cursor(val);
				this._cursor = val;
			}
		}

		/**
		 * Controls whether the mouse is visible or not.
		 * @type {boolean}
		 * @default true
		 */
		get visible() {
			return this._visible;
		}
		set visible(val) {
			this._visible = val;
			if (val) pInst.canvas.style.cursor = 'default';
			else pInst.canvas.style.cursor = 'none';
		}

		/**
		 * @param {string} inp
		 * @returns {boolean} true on the first frame that the user reaches the holdThreshold for holding the input and could start to drag
		 */
		drags(inp) {
			inp ??= this._default;
			return this.drag[inp] == 1;
		}

		/**
		 * @param {string} inp
		 * @returns {number} the amount of frames the user has been dragging while pressing the input
		 */
		dragging(inp) {
			inp ??= this._default;
			return this.drag[inp] > 0 ? this.drag[inp] : 0;
		}

		/**
		 * @param {string} inp
		 * @returns {boolean} true on the first frame that the user releases the input after dragging
		 */
		dragged(inp) {
			inp ??= this._default;
			return this.drag[inp] <= -1;
		}
	};

	/**
	 * Get user input from the mouse.
	 * Stores the state of the left, center, or right mouse buttons.
	 * @type {_Mouse}
	 */
	this.mouse = new this._Mouse();

	this._SpriteMouse = class extends this._Mouse {
		/**
		 * <a href="https://p5play.org/learn/input_devices.html">
		 * Look at the Input reference pages before reading these docs.
		 * </a>
		 *
		 * Used to create `sprite.mouse` input objects.
		 */
		constructor() {
			super();
			this.hover = 0;
		}

		/**
		 * @returns {boolean} true on the first frame that the mouse is over the sprite
		 */
		hovers() {
			return this.hover == 1;
		}

		/**
		 * @returns {number} the amount of frames the mouse has been over the sprite
		 */
		hovering() {
			return this.hover > 0 ? this.hover : 0;
		}

		/**
		 * @returns {boolean} true on the first frame that the mouse is no longer over the sprite
		 */
		hovered() {
			return this.hover <= -1;
		}
	};

	const __onmousedown = function (btn) {
		this.mouse.active = true;
		this.mouse[btn]++;
		if (this.world.mouseSprites.length) {
			let msm = this.world.mouseSprite?.mouse;
			// old mouse sprite didn't have the mouse released on it
			if (msm) {
				msm[btn] = 0;
				msm.hover = 0;
				msm.drag[btn] = 0;
			}
			ms = this.world.mouseSprites[0];
			this.world.mouseSprite = ms;
			msm = ms.mouse;
			msm[btn] = 1;
			if (msm.hover <= 0) msm.hover = 1;
		}
	};

	const _onmousedown = pInst._onmousedown;

	pInst._onmousedown = function (e) {
		if (!this._setupDone) return;

		let btn = 'left';
		if (e.button === 1) btn = 'center';
		else if (e.button === 2) btn = 'right';

		__onmousedown.call(this, btn);
		_onmousedown.call(this, e);
	};

	const _ontouchstart = pInst._ontouchstart;

	pInst._ontouchstart = function (e) {
		if (!this._setupDone) return;

		_ontouchstart.call(this, e);
		let touch = this.touches.at(-1);
		touch.duration = 0;
		touch.presses = function () {
			return this.duration == 1 || this.duration == -3;
		};
		touch.pressing = function () {
			return this.duration > 0 ? this.duration : 0;
		};
		touch.released = function () {
			return this.duration <= -1;
		};
		if (this.touches.length == 1) {
			this.mouse.update();
			this.world.mouseSprites = this.world.getMouseSprites();
		}
		__onmousedown.call(this, 'left');
	};

	const __onmousemove = function (btn) {
		let m = this.mouse;
		if (m[btn] > 0 && m.drag[btn] <= 0) {
			m.drag[btn] = 1;
			let ms = this.world.mouseSprite?.mouse;
			if (ms) {
				ms.drag[btn] = 1;
			}
		}
	};

	const _onmousemove = pInst._onmousemove;

	pInst._onmousemove = function (e) {
		if (!this._setupDone) return;

		let btn = 'left';
		if (e.button === 1) btn = 'center';
		else if (e.button === 2) btn = 'right';

		__onmousemove.call(this, btn);
		_onmousemove.call(this, e);
	};

	const _ontouchmove = pInst._ontouchmove;

	pInst._ontouchmove = function (e) {
		if (!this._setupDone) return;
		_ontouchmove.call(this, e);
		__onmousemove.call(this, 'left');
	};

	const __onmouseup = function (btn) {
		let m = this.mouse;
		if (m[btn] >= m.holdThreshold) {
			m[btn] = -2;
		} else if (m[btn] > 1) m[btn] = -1;
		else m[btn] = -3;
		if (m.drag[btn] > 0) m.drag[btn] = -1;

		let msm = this.world.mouseSprite?.mouse;
		if (msm) {
			if (msm.hover > 1) {
				if (msm[btn] >= this.mouse.holdThreshold) {
					msm[btn] = -2;
				} else if (msm[btn] > 1) {
					msm[btn] = -1;
				} else {
					msm[btn] = -3;
				}
				if (msm.drag[btn] > 0) msm.drag[btn] = -1;
			} else {
				msm[btn] = 0;
				msm.drag[btn] = 0;
			}
		}
	};

	const _onmouseup = pInst._onmouseup;

	pInst._onmouseup = function (e) {
		if (!this._setupDone) return;

		let btn = 'left';
		if (e.button === 1) btn = 'center';
		else if (e.button === 2) btn = 'right';

		__onmouseup.call(this, btn);
		_onmouseup.call(this, e);
	};

	const _ontouchend = pInst._ontouchend;

	pInst._ontouchend = function (e) {
		if (!this._setupDone) return;

		_ontouchend.call(this, e);
		__onmouseup.call(this, 'left');
	};

	delete this._Mouse;

	this._KeyBoard = class extends this.InputDevice {
		#test;
		/**
		 * <a href="https://p5play.org/learn/input_devices.html">
		 * Look at the Input reference pages before reading these docs.
		 * </a>
		 *
		 * Used to create the `kb` and `keyboard` objects, which store
		 * the input status of keys on the keyboard.
		 *
		 * Most key properties will be undefined until the key is pressed.
		 */
		constructor() {
			super();
			this._default = ' ';

			this.alt = 0;
			this.arrowUp = 0;
			this.arrowDown = 0;
			this.arrowLeft = 0;
			this.arrowRight = 0;
			this.backspace = 0;
			this.capsLock = 0;
			this.control = 0;
			this.enter = 0;
			this.meta = 0;
			this.shift = 0;
			this.tab = 0;

			let k = (this._simpleKeyControls = {
				arrowUp: 'up',
				arrowDown: 'down',
				arrowLeft: 'left',
				arrowRight: 'right'
			});

			k.w = k.W = 'up';
			k.s = k.S = 'down';
			k.a = k.A = 'left';
			k.d = k.D = 'right';

			k.i = k.I = 'up2';
			k.k = k.K = 'down2';
			k.j = k.J = 'left2';
			k.l = k.L = 'right2';
		}

		_ac(inp) {
			if (inp.length != 1) {
				if (!isNaN(inp)) {
					if (inp == 38) return 'arrowUp';
					if (inp == 40) return 'arrowDown';
					if (inp == 37) return 'arrowLeft';
					if (inp == 39) return 'arrowRight';
					if (inp >= 10) {
						throw new Error('Use key names with the keyboard input functions, not keyCode numbers!');
					}
					return inp;
				}
				inp = inp.replaceAll(/[ _-]/g, '');
			}
			inp = inp.toLowerCase();
			if (inp.length != 1) {
				if (inp == 'arrowup') return 'arrowUp';
				if (inp == 'arrowdown') return 'arrowDown';
				if (inp == 'arrowleft') return 'arrowLeft';
				if (inp == 'arrowright') return 'arrowRight';
				if (inp == 'capslock') return 'capsLock';
			}
			return inp;
		}

		_pre(k) {
			if (!this[k] || this[k] < 0) {
				this[k] = 1;
			}
		}

		_rel(k) {
			if (this[k] >= this.holdThreshold) {
				this[k] = -2;
			} else if (this[k] > 1) this[k] = -1;
			else this[k] = -3;
		}

		get cmd() {
			return this['meta'];
		}
		get command() {
			return this['meta'];
		}
		get ctrl() {
			return this['control'];
		}
		get space() {
			return this[' '];
		}
		get spacebar() {
			return this[' '];
		}
		get opt() {
			return this['alt'];
		}
		get option() {
			return this['alt'];
		}
		get win() {
			return this['meta'];
		}
		get windows() {
			return this['meta'];
		}
	};

	/**
	 * Get user input from the keyboard.
	 * @type {_KeyBoard}
	 */
	this.kb = new this._KeyBoard();
	delete this._KeyBoard;

	/**
	 * Alias for kb.
	 * @type {_KeyBoard}
	 */
	this.keyboard = this.kb;

	if (navigator.keyboard) {
		const keyboard = navigator.keyboard;
		if (window == window.top) {
			keyboard.getLayoutMap().then((keyboardLayoutMap) => {
				const key = keyboardLayoutMap.get('KeyW');
				if (key != 'w') this.p5play.standardizeKeyboard = true;
			});
		} else {
			this.p5play.standardizeKeyboard = true;
		}
	} else {
		// Firefox and Safari don't have navigator.keyboard
		// so just make them use key codes
		this.p5play.standardizeKeyboard = true;
	}

	function _getKeyFromCode(e) {
		let code = e.code;
		if (code.length == 4 && code.slice(0, 3) == 'Key') {
			return code[3].toLowerCase();
		}
		return e.key;
	}

	const _onkeydown = pInst._onkeydown;

	pInst._onkeydown = function (e) {
		let key = e.key;
		if (this.p5play.standardizeKeyboard) {
			key = _getKeyFromCode(e);
		}
		// convert PascalCase key names into camelCase
		// which is more common for JavaScript properties
		if (key.length > 1) {
			key = key[0].toLowerCase() + key.slice(1);
		} else {
			let lower = key.toLowerCase();
			let upper = key.toUpperCase();
			if (lower != upper) {
				if (key != upper) this.kb._pre(upper);
				else this.kb._pre(lower);
			}
		}
		this.kb._pre(key);

		let k = this.kb._simpleKeyControls[key];
		if (k) this.kb._pre(k);

		_onkeydown.call(this, e);
	};

	const _onkeyup = pInst._onkeyup;

	pInst._onkeyup = function (e) {
		let key = e.key;
		if (this.p5play.standardizeKeyboard) {
			key = _getKeyFromCode(e);
		}
		if (key.length > 1) {
			key = key[0].toLowerCase() + key.slice(1);
		} else {
			let lower = key.toLowerCase();
			let upper = key.toUpperCase();
			if (lower != upper) {
				if (key != upper) this.kb._rel(upper);
				else this.kb._rel(lower);
			}
		}
		this.kb._rel(key);

		let k = this.kb._simpleKeyControls[key];
		if (k) this.kb._rel(k);

		if (e.shiftKey) {
			// if user is pressing shift but released another key
			let k = key.toLowerCase();
			if (this.kb[k] > 0) this.kb._rel(k);
		}

		_onkeyup.call(this, e);
	};

	this._Contro = class extends this.InputDevice {
		/**
		 * <a href="https://p5play.org/learn/input_devices.html">
		 * Look at the Input reference pages before reading these docs.
		 * </a>
		 *
		 * Used to create controller objects in the `controllers` array
		 * (aka `contro`), these objects store the input status of buttons,
		 * triggers, and sticks on game controllers.
		 */
		constructor(gp) {
			super();
			this._default = 'a';
			this.connected = true;

			let inputs = [
				'a',
				'b',
				'x',
				'y',
				'l',
				'r',
				'lt',
				'rt',
				'select',
				'start',
				'lsb',
				'rsb',
				'up',
				'down',
				'left',
				'right',
				'leftTrigger',
				'rightTrigger'
			];
			this._init(inputs);

			this.leftStick = {
				x: 0,
				y: 0
			};

			this.rightStick = {
				x: 0,
				y: 0
			};

			this._btns = {
				a: 0,
				b: 1,
				x: 2,
				y: 3,
				l: 4,
				r: 5,
				lt: 6,
				rt: 7,
				select: 8,
				start: 9,
				lsb: 10,
				rsb: 11,
				up: 12,
				down: 13,
				left: 14,
				right: 15
			};
			this._axes = {
				leftStick: {
					x: 0,
					y: 1
				},
				rightStick: {
					x: 2,
					y: 3
				},
				leftTrigger: 4,
				rightTrigger: 5
			};

			// corrects button mapping for GuliKit gamepads
			// which have a Nintendo Switch style button layout
			// https://www.aliexpress.com/item/1005003624801819.html
			if (gp.id.includes('GuliKit')) {
				this._btns.a = 1;
				this._btns.b = 0;
				this._btns.x = 3;
				this._btns.y = 2;
			}

			// log(gp);

			this.gamepad = gp;
			this.id = gp.id;
		}

		_ac(inp) {
			inp = inp.toLowerCase();
			if (inp == 'lb') inp = 'l';
			else if (inp == 'rb') inp = 'r';
			else if (inp == 'leftstickbutton') inp = 'lsb';
			else if (inp == 'rightstickbutton') inp = 'rsb';
			return inp;
		}

		_update() {
			if (!this.connected) return;

			this.gamepad = navigator.getGamepads()[this.gamepad.index];
			if (!this.gamepad?.connected) return;

			let pad = this.gamepad;

			// buttons
			for (let name in this._btns) {
				let idx = this._btns[name];
				let b = pad.buttons[idx];
				if (!b) continue;
				if (b.pressed) this[name]++;
				else this[name] = this[name] > 0 ? -1 : 0;
			}

			// sticks
			this.leftStick.x = pad.axes[this._axes.leftStick.x];
			this.leftStick.y = pad.axes[this._axes.leftStick.y];

			this.rightStick.x = pad.axes[this._axes.rightStick.x];
			this.rightStick.y = pad.axes[this._axes.rightStick.y];

			// triggers
			if (pad.axes[this._axes.leftTrigger] !== undefined) {
				this.leftTrigger = pad.axes[this._axes.leftTrigger];
				this.rightTrigger = pad.axes[this._axes.rightTrigger];
			} else {
				this.leftTrigger = pad.buttons[this._btns.lt].value;
				this.rightTrigger = pad.buttons[this._btns.rt].value;
			}

			return true; // update completed
		}
		get ls() {
			return this.leftStick;
		}
		get rs() {
			return this.rightStick;
		}
		get lb() {
			return this.l;
		}
		get rb() {
			return this.r;
		}
		get leftStickButton() {
			return this.lsb;
		}
		get rightStickButton() {
			return this.rsb;
		}
	};

	/**
	 * @class
	 * @extends Array<_Contro>
	 */
	this._Contros = class extends Array {
		/**
		 * <a href="https://p5play.org/learn/input_devices.html">
		 * Look at the Input reference pages before reading these docs.
		 * </a>
		 *
		 * Used to create `controllers` (aka `contro`) an array
		 * of `_Contro` objects, which store the input status of buttons,
		 * triggers, and sticks on game controllers.
		 */
		constructor() {
			super();
			let _this = this;
			window.addEventListener('gamepadconnected', (e) => {
				_this._onConnect(e.gamepad);
			});

			window.addEventListener('gamepaddisconnected', (e) => {
				_this._onDisconnect(e.gamepad);
			});

			/**
			 * @type {Function}
			 */
			this.presses;
			/**
			 * @type {Function}
			 */
			this.pressing;
			/**
			 * @type {Function}
			 */
			this.pressed;
			/**
			 * @type {Function}
			 */
			this.holds;
			/**
			 * @type {Function}
			 */
			this.holding;
			/**
			 * @type {Function}
			 */
			this.held;
			/**
			 * @type {Function}
			 */
			this.released;

			let methods = ['presses', 'pressing', 'pressed', 'holds', 'holding', 'held', 'released'];
			for (let m of methods) {
				this[m] = (inp) => {
					if (this[0]) return this[0][m](inp);
				};
			}

			this.a = 0;
			this.b = 0;
			this.x = 0;
			this.y = 0;
			this.l = 0;
			this.r = 0;
			this.lt = 0;
			this.rt = 0;
			this.select = 0;
			this.start = 0;
			this.lsb = 0;
			this.rsb = 0;
			this.up = 0;
			this.down = 0;
			this.left = 0;
			this.right = 0;
			/**
			 * Analog value 0-1 of the left trigger.
			 */
			this.leftTrigger = 0;
			/**
			 * Analog value 0-1 of the right trigger.
			 */
			this.rightTrigger = 0;
			// aliases
			this.lb = 0;
			this.rb = 0;
			this.leftStickButton = 0;
			this.rightStickButton = 0;

			let props = [
				'connected',
				'a',
				'b',
				'x',
				'y',
				'l',
				'r',
				'lt',
				'rt',
				'select',
				'start',
				'lsb',
				'rsb',
				'up',
				'down',
				'left',
				'right',
				'leftTrigger',
				'rightTrigger',
				// aliases
				'lb',
				'rb',
				'leftStickButton',
				'rightStickButton'
			];
			for (let prop of props) {
				Object.defineProperty(this, prop, {
					get() {
						if (_this[0]) return _this[0][prop];
						return 0;
					}
				});
			}

			/**
			 * Has x and y properties with -1 to 1 values which
			 * represent the position of the left stick.
			 *
			 * {x: 0, y: 0} is the center position.
			 * @type {Object}
			 */
			this.leftStick;
			/**
			 * Has x and y properties with -1 to 1 values which
			 * represent the position of the right stick.
			 *
			 * {x: 0, y: 0} is the center position.
			 * @type {Object}
			 */
			this.rightStick;

			props = ['leftStick', 'rightStick'];
			for (let prop of props) {
				this[prop] = {};
				for (let axis of ['x', 'y']) {
					Object.defineProperty(this[prop], axis, {
						get() {
							if (_this[0]) return _this[0][prop][axis];
							return 0;
						}
					});
				}
			}

			// test if the broswer supports the HTML5 Gamepad API
			// all modern browsers do, this is really just to prevent
			// p5play's Jest tests from failing
			if (!navigator?.getGamepads) return;

			// if the page was not reloaded, but p5play sketch was,
			// then gamepads could be already connected
			// so they need to be added as Contro objects
			let gps = navigator.getGamepads();
			for (let gp of gps) {
				if (gp) this._onConnect(gp);
			}
		}

		_onConnect(gp) {
			if (!gp) return;
			for (let i = 0; i < this.length; i++) {
				if (this[i].gamepad?.index === gp.index) {
					this[i].connected = true;
					log('contro[' + i + '] reconnected: ' + gp.id);
					return;
				}
			}
			log(gp);
			log('contro[' + gp.index + '] connected: ' + gp.id);
			let c = new pInst._Contro(gp);
			this.push(c);
		}

		_onDisconnect(gp) {
			if (!gp) return;
			for (let i = 0; i < this.length; i++) {
				if (this[i].gamepad?.index === gp.index) {
					this[i].connected = false;
					log('contro[' + i + '] disconnected: ' + gp.id);
					return;
				}
			}
		}

		/*
		 * Updates the state of all controllers.
		 */
		_update() {
			for (let c of this) {
				c._update();
			}
		}
	};

	/**
	 * Get user input from game controllers.
	 * @type {_Contros}
	 */
	this.contro = new this._Contros();
	delete this._Contros;

	/**
	 * Alias for contro
	 * @type {_Contros}
	 */
	this.controllers = this.contro;

	if (!this.getFPS) this.p5play._fps = 60;

	/**
	 * FPS, amongst the gaming community, refers to how fast a computer
	 * can generate frames per second, not including the delay between when
	 * frames are actually shown on the screen. The higher the FPS, the
	 * better the game is performing.
	 *
	 * This function is used by the renderStats() function, which is the easiest way
	 * to get an approximation of your game's performance. But you should use your web
	 * browser's performance testing tools for accurate results.
	 *
	 * @returns {Number} The current FPS
	 */
	this.getFPS ??= () => this.p5play._fps;

	this.p5play._fpsArr = [60];

	/**
	 * Displays the number of sprites drawn, an inaccurate
	 * approximation of the current FPS as well as the average, minimum,
	 * and maximum FPS achieved during the previous second.
	 *
	 * FPS in this context refers to how many frames per second your
	 * computer can generate, including physics calculations and any other
	 * processes necessary to generate a frame, but not including the delay
	 * between when frames are actually shown on the screen. The higher the
	 * FPS, the better your game is performing.
	 *
	 * You can use this function for approximate performance testing. But
	 * the only way to get accurate results, is to use your web browser's
	 * performance testing tools.
	 *
	 * Generally having less sprites and using a smaller canvas will make
	 * your game perform better.
	 *
	 * @param {Number} x
	 * @param {Number} y
	 */
	this.renderStats = (x, y) => {
		let rs = this.p5play._renderStats;
		if (rs.show === undefined) {
			if (this.allSprites.tileSize == 1 || this.allSprites.tileSize > 16) {
				rs.fontSize = 16;
			} else {
				rs.fontSize = 10;
			}
			rs.gap = rs.fontSize * 1.25;
			console.warn(
				"renderStats() uses inaccurate FPS approximations. Even if your game runs at a solid 60hz display rate, the fps calculations shown may be lower. The only way to get accurate results is to use your web browser's performance testing tools."
			);
		}
		rs.x = x || 10;
		rs.y = y || 20;
		rs.show = true;
	};
});

p5.prototype.registerMethod('pre', function p5playPreDraw() {
	// called before each p5.js draw function call

	if (this.p5play._fps) {
		this.p5play._preDrawFrameTime = performance.now();
	}

	this.p5play.spritesDrawn = 0;

	this.mouse.update();

	this.contro._update();
});

p5.prototype.registerMethod('post', function p5playPostDraw() {
	// called after each p5.js draw function call

	this.p5play._inPostDraw = true;

	if (this.allSprites.autoCull) {
		this.allSprites.cull(10000);
	}

	if (this.allSprites._autoDraw) {
		this.camera.on();
		this.allSprites.draw();
		this.camera.off();
	}
	this.allSprites._autoDraw ??= true;

	let rs = this.p5play._renderStats;
	if (rs.show) {
		if (this.frameCount == 1 || this.frameCount % 60 === 0) {
			let avg = this.p5play._fpsArr.reduce((a, b) => a + b);
			avg = Math.round(avg / this.p5play._fpsArr.length);
			this.p5play._fpsAvg = avg;
			this.p5play._fpsMin = Math.min(...this.p5play._fpsArr);
			this.p5play._fpsMax = Math.max(...this.p5play._fpsArr);
			this.p5play._fpsArr = [];

			let c;
			if (avg > 55) c = this.color(30, 255, 30);
			else if (avg > 25) c = this.color(255, 100, 30);
			else c = this.color(255, 30, 30);
			this.p5play._statsColor = c;
		}

		this.p5play._fpsArr.push(this.getFPS());

		this.push();
		this.fill(0, 0, 0, 128);
		this.rect(rs.x - 5, rs.y - rs.fontSize, rs.fontSize * 8.5, rs.gap * 4 + 5);
		this.fill(this.p5play._statsColor);
		this.textAlign('left');
		this.textSize(rs.fontSize);
		this.textFont('monospace');

		let x = rs.x;
		let y = rs.y;
		this.text('sprites: ' + this.p5play.spritesDrawn, x, y);
		this.text('fps avg: ' + this.p5play._fpsAvg, x, y + rs.gap);
		this.text('fps min: ' + this.p5play._fpsMin, x, y + rs.gap * 2);
		this.text('fps max: ' + this.p5play._fpsMax, x, y + rs.gap * 3);
		this.pop();
		rs.show = false;
	}

	if (this.world.autoStep) {
		this.world.step();
	}
	this.world.autoStep ??= true;

	if (this.allSprites._autoUpdate) {
		this.allSprites.update();
	}
	this.allSprites._autoUpdate ??= true;

	for (let s of this.allSprites) {
		s.autoDraw ??= true;
		s.autoUpdate ??= true;
	}

	for (let k in this.kb) {
		if (k == 'holdThreshold') continue;
		if (this.kb[k] < 0) this.kb[k] = 0;
		else if (this.kb[k] > 0) this.kb[k]++;
	}

	let m = this.mouse;
	let msm = this.world.mouseSprite?.mouse;

	for (let btn of ['left', 'center', 'right']) {
		if (m[btn] < 0) m[btn] = 0;
		else if (m[btn] > 0) m[btn]++;
		if (msm?.hover) msm[btn] = m[btn];

		if (m.drag[btn] < 0) m.drag[btn] = 0;
		else if (m.drag[btn] > 0) m.drag[btn]++;
		if (msm) msm.drag[btn] = m.drag[btn];
	}

	if (this.world.mouseTracking) {
		let sprites = this.world.getMouseSprites();

		for (let i = 0; i < sprites.length; i++) {
			let s = sprites[i];
			if (i == 0) s.mouse.hover++;
			else if (s.mouse.hover > 0) s.mouse.hover = -1;
			else if (s.mouse.hover < 0) s.mouse.hover = 0;
		}

		// if the user is not pressing any mouse buttons
		if (m.left <= 0 && m.center <= 0 && m.right <= 0) {
			this.world.mouseSprite = null;
		}

		let ms = this.world.mouseSprite;

		let isDragging = m.drag.left > 0 || m.drag.center > 0 || m.drag.right > 0;

		for (let s of this.world.mouseSprites) {
			// if the mouse stopped hovering over the sprite
			if (!sprites.includes(s)) {
				let sm = s.mouse;
				if (sm.hover > 0) {
					sm.hover = -1;
					sm.left = sm.center = sm.right = 0;
				}
				// if mouse is not dragging and the sprite is the current mouse sprite
				if (!isDragging && s == ms) this.world.mouseSprite = ms = null;
			}
		}
		if (ms) {
			// if the user is dragging on a sprite, but not currently hovering
			// over it, the mouse sprite should still be added to the mouseSprites array
			if (!sprites.includes(ms)) sprites.push(ms);
			msm.x = ms.x - m.x;
			msm.y = ms.y - m.y;
		}
		this.world.mouseSprites = sprites;
	}

	this.camera.off();

	if (this.p5play._fps) {
		this.p5play._postDrawFrameTime = performance.now();
		this.p5play._fps = Math.round(1000 / (this.p5play._postDrawFrameTime - this.p5play._preDrawFrameTime)) || 1;
	}
	this.p5play._inPostDraw = false;
});
