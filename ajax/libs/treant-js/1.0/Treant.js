/*
 * Treant-js
 *
 * (c) 2013 Fran Peručić
 * Treant-js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://fperucic.github.io/treant-js
 *
 * Treant is an open-source JavaScipt library for visualization of tree diagrams.
 * It implements the node positioning algorithm of John Q. Walker II "Positioning nodes for General Trees".
 *
 * References:
 * Emilio Cortegoso Lobato: ECOTree.js v1.0 (October 26th, 2006)
 *
 */

;(function(){

	var $ = null;

	var UTIL = {
		inheritAttrs: function(me, from) {
			for (var attr in from) {
				if ( from.hasOwnProperty( attr ) ) {
					if ( ( me[attr] instanceof Object && from[attr] instanceof Object ) && (typeof from[attr] !== 'function') ) {
						this.inheritAttrs( me[attr], from[attr] );
					}
					else {
						me[attr] = from[attr];
					}
				}
			}
		},

		createMerge: function(obj1, obj2) {
			var newObj = {};
			if(obj1) {
				this.inheritAttrs(newObj, this.cloneObj(obj1));
			}
			if(obj2) {
				this.inheritAttrs(newObj, obj2);
			}
			return newObj;
		},

		extend: function() {
			if ( $ ) {
				Array.prototype.unshift.apply( arguments, [true, {}] );
				return $.extend.apply( $, arguments );
			}
			else {
				return UTIL.createMerge.apply( this, arguments );
			}
		},

		cloneObj: function (obj) {
			if ( Object(obj) !== obj ) {
				return obj;
			}
			var res = new obj.constructor();
			for (var key in obj) {
				if ( obj.hasOwnProperty(key) ) {
					res[key] = this.cloneObj(obj[key]);
				}
			}
			return res;
		},

		addEvent: function(el, eventType, handler) {
			if ( $ ) {
				$( el ).on( eventType+'.treant', handler );
			}
			else if (el.addEventListener) { // DOM Level 2 browsers
				el.addEventListener(eventType, handler, false);
			}
			else if (el.attachEvent) { // IE <= 8
				el.attachEvent('on' + eventType, handler);
			}
			else { // ancient browsers
				el['on' + eventType] = handler;
			}
		},

		/**
		 * @param {string} selector
		 * @param {boolean} raw
		 * @param {Element} parentEl
		 * @returns {Element|jQuery}
		 */
		findEl: function( selector, raw, parentEl ) {
			parentEl = parentEl || document;

			if ( $ ) {
				var $element = $( selector, parentEl );
				return ( raw? $element.get( 0 ): $element );
			}
			else {
				// todo: getElementsByName()
				// todo: getElementsByTagName()
				// todo: getElementsByTagNameNS()
				if ( selector.charAt( 0 ) == '#' ) {
					return parentEl.getElementById( selector.substring( 1 ) );
				}
				else if ( selector.charAt( 0 ) == '.' ) {
					var oElements = parentEl.getElementsByClassName( selector.substring( 1 ) );
					return ( oElements.length? oElements[0]: null );
				}

				throw new Error( 'Unknown container element' );
			}
		},

		getOuterHeight: function( element ) {
			var nRoundingCompensation = 1;
			if ( typeof element.getBoundingClientRect == 'function' ) {
				return element.getBoundingClientRect().height;
			}
			else if ( $ ) {
				return Math.ceil( $( element ).outerHeight() ) + nRoundingCompensation;
			}
			else {
				return Math.ceil(
					element.clientHeight
					+ UTIL.getStyle( element, 'border-top-width', true )
					+ UTIL.getStyle( element, 'border-bottom-width', true )
					+ UTIL.getStyle( element, 'padding-top', true )
					+ UTIL.getStyle( element, 'padding-bottom', true )
					+ nRoundingCompensation
				);
			}
		},

		getOuterWidth: function( element ) {
			var nRoundingCompensation = 1;
			if ( typeof element.getBoundingClientRect == 'function' ) {
				return element.getBoundingClientRect().width;
			}
			else if ( $ ) {
				return Math.ceil( $( element ).outerWidth() ) + nRoundingCompensation;
			}
			else {
				return Math.ceil(
					element.clientWidth
					+ UTIL.getStyle( element, 'border-left-width', true )
					+ UTIL.getStyle( element, 'border-right-width', true )
					+ UTIL.getStyle( element, 'padding-left', true )
					+ UTIL.getStyle( element, 'padding-right', true )
					+ nRoundingCompensation
				);
			}
		},

		getStyle: function( element, strCssRule, asInt ) {
			var strValue = "";
			if ( document.defaultView && document.defaultView.getComputedStyle ) {
				strValue = document.defaultView.getComputedStyle( element, '' ).getPropertyValue( strCssRule );
			}
			else if( element.currentStyle ) {
				strCssRule = strCssRule.replace(/\-(\w)/g,
					function (strMatch, p1){
						return p1.toUpperCase();
					}
				);
				strValue = element.currentStyle[strCssRule];
			}
			//Number(elem.style.width.replace(/[^\d\.\-]/g, ''));
			return ( asInt? parseFloat( strValue ): strValue );
		},

		addClass: function( element, cssClass ) {
			if ( $ ) {
				$( element ).addClass( cssClass );
			}
			else {
				if ( !UTIL.hasClass( element, cssClass ) ) {
					if ( element.classList ) {
						element.classList.add( cssClass );
					}
					else {
						element.className += " "+cssClass;
					}
				}
			}
		},

		hasClass: function(element, my_class) {
			return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" "+my_class+" ") > -1;
		},

		toggleClass: function ( element, cls, apply ) {
			if ( $ ) {
				$( element ).toggleClass( cls, apply );
			}
			else {
				if ( apply ) {
					//element.className += " "+cls;
					element.classList.add( cls );
				}
				else {
					element.classList.remove( cls );
				}
			}
		},

		setDimensions: function( element, width, height ) {
			if ( $ ) {
				$( element ).width( width ).height( height );
			}
			else {
				element.style.width = width+'px';
				element.style.height = height+'px';
			}
		}
	};

	/**
	 * ImageLoader constructor.
	 * ImageLoader is used for determining if all the images from the Tree are loaded.
	 * 	Node size (width, height) can be correctly determined only when all inner images are loaded
	 */
	var ImageLoader = function() {
		this.reset();
	};

	ImageLoader.prototype = {

		/**
		 * @returns {ImageLoader}
		 */
		reset: function() {
			this.loading = [];
			return this;
		},

		/**
		 * @param {TreeNode} node
		 * @returns {ImageLoader}
		 */
		processNode: function( node ) {
			var images = node.nodeDOM.getElementsByTagName( 'img' ),
				i =	images.length;
			while ( i-- ) {
				this.create( node, images[i] );
			}
			return this;
		},

		/**
		 * @returns {ImageLoader}
		 */
		removeAll: function( img_src ) {
			var i = this.loading.length;
			while ( i-- ) {
				if ( this.loading[i] === img_src ) {
					this.loading.splice( i, 1 );
				}
			}
			return this;
		},

		/**
		 * @param {TreeNode} node
		 * @param {Element} image
		 * @returns {*}
		 */
		create: function ( node, image ) {
			var self = this, source = image.src;

			function imgTrigger() {
				self.removeAll( source );
				node.width = node.nodeDOM.offsetWidth;
				node.height = node.nodeDOM.offsetHeight;
			}

			if ( image.src.indexOf( 'data:' ) !== 0 ) {
				this.loading.push( source );

				if ( image.complete ) {
					return imgTrigger();
				}

				UTIL.addEvent( image, 'load', imgTrigger );
				UTIL.addEvent( image, 'error', imgTrigger ); // handle broken url-s

				// load event is not fired for cached images, force the load event
				image.src += "?" + new Date().getTime();
			}
			else {
				imgTrigger();
			}
		},

		/**
		 * @returns {boolean}
		 */
		isNotLoading: function() {
			return ( this.loading.length === 0 );
		}
	};

	/**
	 * Class: TreeStore
	 * TreeStore is used for holding initialized Tree objects
	 * 	Its purpose is to avoid global variables and enable multiple Trees on the page.
	 */
	var TreeStore = {

		store: [],

		/**
		 * @param {object} jsonConfig
		 * @returns {Tree}
		 */
		createTree: function( jsonConfig ) {
			var nNewTreeId = this.store.length;
			this.store.push( new Tree( jsonConfig, nNewTreeId ) );
			return this.get( nNewTreeId );
		},

		/**
		 * @param {number} treeId
		 * @returns {Tree}
		 */
		get: function ( treeId ) {
			return this.store[treeId];
		},

		/**
		 * @param {number} treeId
		 * @returns {TreeStore}
		 */
		destroy: function( treeId ) {
			var tree = this.get( treeId );
			if ( tree ) {
				tree._R.remove();
				var draw_area = tree.drawArea;

				while ( draw_area.firstChild ) {
					draw_area.removeChild( draw_area.firstChild );
				}

				var classes = draw_area.className.split(' '),
					classes_to_stay = [];

				for ( var i = 0; i < classes.length; i++ ) {
					var cls = classes[i];
					if ( cls != 'Treant' && cls != 'Treant-loaded' ) {
						classes_to_stay.push(cls);
					}
				}
				draw_area.style.overflowY = '';
				draw_area.style.overflowX = '';
				draw_area.className = classes_to_stay.join(' ');

				this.store[treeId] = null;
			}
			return this;
		}
	};

	/**
	 * Tree constructor.
	 * @param {object} jsonConfig
	 * @param {number} treeId
	 * @constructor
	 */
	var Tree = function (jsonConfig, treeId ) {

		/**
		 * @param {object} jsonConfig
		 * @param {number} treeId
		 * @returns {Tree}
		 */
		this.reset = function( jsonConfig, treeId ) {
			this.initJsonConfig = jsonConfig;
			this.initTreeId = treeId;

			this.id = treeId;

			this.CONFIG = UTIL.extend( Tree.CONFIG, jsonConfig.chart );
			this.drawArea = UTIL.findEl( this.CONFIG.container, true );
			if ( !this.drawArea ) {
				throw new Error( 'Failed to find element by selector "'+selector+'"' );
			}

			UTIL.addClass( this.drawArea, 'Treant' );

			// kill of any child elements that may be there
			this.drawArea.innerHTML = '';

			this.imageLoader = new ImageLoader();

			this.nodeDB = new NodeDB( jsonConfig.nodeStructure, this );

			// key store for storing reference to node connectors,
			// key = nodeId where the connector ends
			this.connectionStore = {};

			this.loaded = false;

			this._R = new Raphael( this.drawArea, 100, 100 );

			return this;
		};

		/**
		 * @returns {Tree}
		 */
		this.reload = function() {
			this.reset( this.initJsonConfig, this.initTreeId ).redraw();
			return this;
		};

		this.reset( jsonConfig, treeId );
	};

	Tree.prototype = {

		/**
		 * @returns {NodeDB}
		 */
		getNodeDb: function() {
			return this.nodeDB;
		},

		/**
		 * @param {TreeNode} parentTreeNode
		 * @param {object} nodeDefinition
		 * @returns {TreeNode}
		 */
		addNode: function( parentTreeNode, nodeDefinition ) {
			var dbEntry = this.nodeDB.get( parentTreeNode.id );

			this.CONFIG.callback.onBeforeAddNode.apply( this, [parentTreeNode, nodeDefinition] );

			var oNewNode = this.nodeDB.createNode( nodeDefinition, parentTreeNode.id, this );
			oNewNode.createGeometry( this );

			oNewNode.parent().createSwitchGeometry( this );

			this.positionTree();

			this.CONFIG.callback.onAfterAddNode.apply( this, [oNewNode, parentTreeNode, nodeDefinition] );

			return oNewNode;
		},

		/**
		 * @returns {Tree}
		 */
		redraw: function() {
			this.positionTree();
			return this;
		},

		/**
		 * @param {function} callback
		 * @returns {Tree}
		 */
		positionTree: function( callback ) {
			var self = this;

			if ( this.imageLoader.isNotLoading() ) {
				var root = this.root(),
					orient = this.CONFIG.rootOrientation;

				this.resetLevelData();

				this.firstWalk( root, 0 );
				this.secondWalk( root, 0, 0, 0 );

				this.positionNodes();

				if ( this.CONFIG.animateOnInit ) {
					setTimeout(
						function() {
							root.toggleCollapse();
						},
						this.CONFIG.animateOnInitDelay
					);
				}

				if ( !this.loaded ) {
					UTIL.addClass( this.drawArea, 'Treant-loaded' ); // nodes are hidden until .loaded class is added
					if ( Object.prototype.toString.call( callback ) === "[object Function]" ) {
						callback( self );
					}
					self.CONFIG.callback.onTreeLoaded.apply( self, [root] );
					this.loaded = true;
				}

			}
			else {
				setTimeout(
					function() {
						self.positionTree( callback );
					}, 10
				);
			}
			return this;
		},

		/**
		 * In a first post-order walk, every node of the tree is assigned a preliminary
		 * x-coordinate (held in field node->prelim).
		 * In addition, internal nodes are given modifiers, which will be used to move their
		 * children to the right (held in field node->modifier).
		 * @param {TreeNode} node
		 * @param {number} level
		 * @returns {Tree}
		 */
		firstWalk: function( node, level ) {
			node.prelim = null;
			node.modifier = null;

			this.setNeighbors( node, level );
			this.calcLevelDim( node, level );

			var leftSibling = node.leftSibling();

			if ( node.childrenCount() === 0 || level == this.CONFIG.maxDepth ) {
				// set preliminary x-coordinate
				if ( leftSibling ) {
					node.prelim = leftSibling.prelim + leftSibling.size() + this.CONFIG.siblingSeparation;
				}
				else {
					node.prelim = 0;
				}
			}
			else {
				//node is not a leaf,  firstWalk for each child
				for ( var i = 0, n = node.childrenCount(); i < n; i++ ) {
					this.firstWalk(node.childAt(i), level + 1);
				}

				var midPoint = node.childrenCenter() - node.size() / 2;

				if ( leftSibling ) {
					node.prelim = leftSibling.prelim + leftSibling.size() + this.CONFIG.siblingSeparation;
					node.modifier = node.prelim - midPoint;
					this.apportion( node, level );
				}
				else {
					node.prelim = midPoint;
				}

				// handle stacked children positioning
				if ( node.stackParent ) { // handle the parent of stacked children
					node.modifier += this.nodeDB.get( node.stackChildren[0] ).size()/2 + node.connStyle.stackIndent;
				}
				else if ( node.stackParentId ) { // handle stacked children
					node.prelim = 0;
				}
			}
			return this;
		},

		/*
		 * Clean up the positioning of small sibling subtrees.
		 * Subtrees of a node are formed independently and
		 * placed as close together as possible. By requiring
		 * that the subtrees be rigid at the time they are put
		 * together, we avoid the undesirable effects that can
		 * accrue from positioning nodes rather than subtrees.
		 */
		apportion: function (node, level) {
			var firstChild				= node.firstChild(),
				firstChildLeftNeighbor	= firstChild.leftNeighbor(),
				compareDepth			= 1,
				depthToStop				= this.CONFIG.maxDepth - level;

			while( firstChild && firstChildLeftNeighbor && compareDepth <= depthToStop ) {
				// calculate the position of the firstChild, according to the position of firstChildLeftNeighbor

				var modifierSumRight	= 0,
					modifierSumLeft		= 0,
					leftAncestor		= firstChildLeftNeighbor,
					rightAncestor		= firstChild;

				for ( var i = 0; i < compareDepth; i++ ) {
					leftAncestor = leftAncestor.parent();
					rightAncestor = rightAncestor.parent();
					modifierSumLeft += leftAncestor.modifier;
					modifierSumRight += rightAncestor.modifier;

					// all the stacked children are oriented towards right so use right variables
					if ( rightAncestor.stackParent !== undefined ) {
						modifierSumRight += rightAncestor.size() / 2;
					}
				}

				// find the gap between two trees and apply it to subTrees
				// and mathing smaller gaps to smaller subtrees

				var totalGap = (firstChildLeftNeighbor.prelim + modifierSumLeft + firstChildLeftNeighbor.size() + this.CONFIG.subTeeSeparation) - (firstChild.prelim + modifierSumRight );

				if ( totalGap > 0 ) {
					var subtreeAux = node,
						numSubtrees = 0;

					// count all the subtrees in the LeftSibling
					while ( subtreeAux && subtreeAux.id != leftAncestor.id ) {
						subtreeAux = subtreeAux.leftSibling();
						numSubtrees++;
					}

					if ( subtreeAux ) {
						var subtreeMoveAux = node,
							singleGap = totalGap / numSubtrees;

						while ( subtreeMoveAux.id != leftAncestor.id ) {
							subtreeMoveAux.prelim += totalGap;
							subtreeMoveAux.modifier += totalGap;

							totalGap -= singleGap;
							subtreeMoveAux = subtreeMoveAux.leftSibling();
						}
					}
				}

				compareDepth++;

				firstChild = ( firstChild.childrenCount() === 0 )?
					node.leftMost(0, compareDepth):
					firstChild = firstChild.firstChild();

				if ( firstChild ) {
					firstChildLeftNeighbor = firstChild.leftNeighbor();
				}
			}
		},

		/*
		 * During a second pre-order walk, each node is given a
		 * final x-coordinate by summing its preliminary
		 * x-coordinate and the modifiers of all the node's
		 * ancestors.  The y-coordinate depends on the height of
		 * the tree.  (The roles of x and y are reversed for
		 * RootOrientations of EAST or WEST.)
		 */
		secondWalk: function( node, level, X, Y ) {
			if ( level <= this.CONFIG.maxDepth ) {
				var xTmp = node.prelim + X,
					yTmp = Y, align = this.CONFIG.nodeAlign,
					orinet = this.CONFIG.rootOrientation,
					levelHeight, nodesizeTmp;

				if (orinet == 'NORTH' || orinet == 'SOUTH') {
					levelHeight = this.levelMaxDim[level].height;
					nodesizeTmp = node.height;
					if (node.pseudo) {
						node.height = levelHeight;
					} // assign a new size to pseudo nodes
				}
				else if (orinet == 'WEST' || orinet == 'EAST') {
					levelHeight = this.levelMaxDim[level].width;
					nodesizeTmp = node.width;
					if (node.pseudo) {
						node.width = levelHeight;
					} // assign a new size to pseudo nodes
				}

				node.X = xTmp;

				if (node.pseudo) { // pseudo nodes need to be properly aligned, otherwise position is not correct in some examples
					if (orinet == 'NORTH' || orinet == 'WEST') {
						node.Y = yTmp; // align "BOTTOM"
					}
					else if (orinet == 'SOUTH' || orinet == 'EAST') {
						node.Y = (yTmp + (levelHeight - nodesizeTmp)); // align "TOP"
					}

				} else {
					node.Y = ( align == 'CENTER' ) ? (yTmp + (levelHeight - nodesizeTmp) / 2) :
						( align == 'TOP' )	? (yTmp + (levelHeight - nodesizeTmp)) :
							yTmp;
				}

				if ( orinet == 'WEST' || orinet == 'EAST' ) {
					var swapTmp = node.X;
					node.X = node.Y;
					node.Y = swapTmp;
				}

				if (orinet == 'SOUTH' ) {
					node.Y = -node.Y - nodesizeTmp;
				}
				else if ( orinet == 'EAST' ) {
					node.X = -node.X - nodesizeTmp;
				}

				if ( node.childrenCount() !== 0 ) {
					if ( node.id === 0 && this.CONFIG.hideRootNode ) {
						// ako je root node Hiden onda nemoj njegovu dijecu pomaknut po Y osi za Level separation, neka ona budu na vrhu
						this.secondWalk(node.firstChild(), level + 1, X + node.modifier, Y);
					}
					else {
						this.secondWalk(node.firstChild(), level + 1, X + node.modifier, Y + levelHeight + this.CONFIG.levelSeparation);
					}
				}

				if ( node.rightSibling() ) {
					this.secondWalk( node.rightSibling(), level, X, Y );
				}
			}
		},

		/**
		 * position all the nodes, center the tree in center of its container
		 * 0,0 coordinate is in the upper left corner
		 * @returns {Tree}
		 */
		positionNodes: function() {
			var self = this,
				treeSize = {
					x: self.nodeDB.getMinMaxCoord('X', null, null),
					y: self.nodeDB.getMinMaxCoord('Y', null, null)
				},

				treeWidth = treeSize.x.max - treeSize.x.min,
				treeHeight = treeSize.y.max - treeSize.y.min,

				treeCenter = {
					x: treeSize.x.max - treeWidth/2,
					y: treeSize.y.max - treeHeight/2
				};

			this.handleOverflow(treeWidth, treeHeight);

			var
				containerCenter = {
					x: self.drawArea.clientWidth/2,
					y: self.drawArea.clientHeight/2
				},

				deltaX = containerCenter.x - treeCenter.x,
				deltaY = containerCenter.y - treeCenter.y,

				// all nodes must have positive X or Y coordinates, handle this with offsets
				negOffsetX = ((treeSize.x.min + deltaX) <= 0) ? Math.abs(treeSize.x.min) : 0,
				negOffsetY = ((treeSize.y.min + deltaY) <= 0) ? Math.abs(treeSize.y.min) : 0,
				i, len, node;

			// position all the nodes
			for ( i = 0, len = this.nodeDB.db.length; i < len; i++ ) {

				node = this.nodeDB.get(i);

				self.CONFIG.callback.onBeforePositionNode.apply( self, [node, i, containerCenter, treeCenter] );

				if ( node.id === 0 && this.CONFIG.hideRootNode ) {
					self.CONFIG.callback.onAfterPositionNode.apply( self, [node, i, containerCenter, treeCenter] );
					continue;
				}

				// if the tree is smaller than the draw area, then center the tree within drawing area
				node.X += negOffsetX + ((treeWidth < this.drawArea.clientWidth) ? deltaX : this.CONFIG.padding);
				node.Y += negOffsetY + ((treeHeight < this.drawArea.clientHeight) ? deltaY : this.CONFIG.padding);

				var collapsedParent = node.collapsedParent(),
					hidePoint = null;

				if (collapsedParent) {
					// position the node behind the connector point of the parent, so future animations can be visible
					hidePoint = collapsedParent.connectorPoint( true );
					node.hide(hidePoint);

				}
				else if (node.positioned) {
					// node is already positioned,
					node.show();
				}
				else { // inicijalno stvaranje nodeova, postavi lokaciju
					node.nodeDOM.style.left = node.X + 'px';
					node.nodeDOM.style.top = node.Y + 'px';
					node.positioned = true;
				}

				if (node.id !== 0 && !(node.parent().id === 0 && this.CONFIG.hideRootNode)) {
					this.setConnectionToParent(node, hidePoint); // skip the root node
				}
				else if (!this.CONFIG.hideRootNode && node.drawLineThrough) {
					// drawlinethrough is performed for for the root node also
					node.drawLineThroughMe();
				}

				self.CONFIG.callback.onAfterPositionNode.apply( self, [node, i, containerCenter, treeCenter] );
			}
			return this;
		},

		/**
		 * Create Raphael instance, (optionally set scroll bars if necessary)
		 * @param {number} treeWidth
		 * @param {number} treeHeight
		 * @returns {Tree}
		 */
		handleOverflow: function( treeWidth, treeHeight ) {
			var viewWidth = (treeWidth < this.drawArea.clientWidth) ? this.drawArea.clientWidth : treeWidth + this.CONFIG.padding*2,
				viewHeight = (treeHeight < this.drawArea.clientHeight) ? this.drawArea.clientHeight : treeHeight + this.CONFIG.padding*2;

			this._R.setSize( viewWidth, viewHeight );

			if ( this.CONFIG.scrollbar == 'resize') {
				UTIL.setDimensions( this.drawArea, viewWidth, viewHeight );
			}
			else if ( $ == undefined || this.CONFIG.scrollbar == 'native' ) {

				if ( this.drawArea.clientWidth < treeWidth ) { // is overflow-x necessary
					this.drawArea.style.overflowX = "auto";
				}

				if ( this.drawArea.clientHeight < treeHeight ) { // is overflow-y necessary
					this.drawArea.style.overflowY = "auto";
				}
			}
			// Fancy scrollbar relies heavily on jQuery, so guarding with if ( $ )
			else if ( this.CONFIG.scrollbar == 'fancy') {
				var jq_drawArea = $( this.drawArea );
				if (jq_drawArea.hasClass('ps-container')) { // znaci da je 'fancy' vec inicijaliziran, treba updateat
					jq_drawArea.find('.Treant').css({
						width: viewWidth,
						height: viewHeight
					});

					jq_drawArea.perfectScrollbar('update');
				}
				else {
					var mainContainer = jq_drawArea.wrapInner('<div class="Treant"/>'),
						child = mainContainer.find('.Treant');

					child.css({
						width: viewWidth,
						height: viewHeight
					});

					mainContainer.perfectScrollbar();
				}
			} // else this.CONFIG.scrollbar == 'None'

			return this;
		},

		/**
		 * @param {TreeNode} treeNode
		 * @param {boolean} hidePoint
		 * @returns {Tree}
		 */
		setConnectionToParent: function( treeNode, hidePoint ) {
			var stacked = treeNode.stackParentId,
				connLine,
				parent = ( stacked? this.nodeDB.get( stacked ): treeNode.parent() ),

				pathString = hidePoint?
					this.getPointPathString(hidePoint):
					this.getPathString(parent, treeNode, stacked);

			if ( this.connectionStore[treeNode.id] ) {
				// connector already exists, update the connector geometry
				connLine = this.connectionStore[treeNode.id];
				this.animatePath( connLine, pathString );
			}
			else {
				connLine = this._R.path( pathString );
				this.connectionStore[treeNode.id] = connLine;

				// don't show connector arrows por pseudo nodes
				if ( treeNode.pseudo ) {
					delete parent.connStyle.style['arrow-end'];
				}
				if ( parent.pseudo ) {
					delete parent.connStyle.style['arrow-start'];
				}

				connLine.attr( parent.connStyle.style );

				if ( treeNode.drawLineThrough || treeNode.pseudo ) {
					treeNode.drawLineThroughMe( hidePoint );
				}
			}
			treeNode.connector = connLine;
			return this;
		},

		/**
		 * Create the path which is represented as a point, used for hiding the connection
		 * A path with a leading "_" indicates the path will be hidden
		 * See: http://dmitrybaranovskiy.github.io/raphael/reference.html#Paper.path
		 * @param {object} hidePoint
		 * @returns {string}
		 */
		getPointPathString: function( hidePoint ) {
			return ["_M", hidePoint.x, ",", hidePoint.y, 'L', hidePoint.x, ",", hidePoint.y, hidePoint.x, ",", hidePoint.y].join(' ');
		},

		/**
		 * This method relied on receiving a valid Raphael Paper.path.
		 * See: http://dmitrybaranovskiy.github.io/raphael/reference.html#Paper.path
		 * A pathString is typically in the format of "M10,20L30,40"
		 * @param path
		 * @param {string} pathString
		 * @returns {Tree}
		 */
		animatePath: function( path, pathString ) {
			if (path.hidden && pathString.charAt(0) !== "_") { // path will be shown, so show it
				path.show();
				path.hidden = false;
			}

			// See: http://dmitrybaranovskiy.github.io/raphael/reference.html#Element.animate
			path.animate(
				{
					path: pathString.charAt(0) === "_"?
						pathString.substring(1):
						pathString // remove the "_" prefix if it exists
				},
				this.CONFIG.animation.connectorsSpeed,
				this.CONFIG.animation.connectorsAnimation,
				function() {
					if ( pathString.charAt(0) === "_" ) { // animation is hiding the path, hide it at the and of animation
						path.hide();
						path.hidden = true;
					}
				}
			);
			return this;
		},

		/**
		 *
		 * @param {TreeNode} from_node
		 * @param {TreeNode} to_node
		 * @param {boolean} stacked
		 * @returns {string}
		 */
		getPathString: function( from_node, to_node, stacked ) {
			var startPoint = from_node.connectorPoint( true ),
				endPoint = to_node.connectorPoint( false ),
				orientation = this.CONFIG.rootOrientation,
				connType = from_node.connStyle.type,
				P1 = {}, P2 = {};

			if ( orientation == 'NORTH' || orientation == 'SOUTH' ) {
				P1.y = P2.y = (startPoint.y + endPoint.y) / 2;

				P1.x = startPoint.x;
				P2.x = endPoint.x;
			}
			else if ( orientation == 'EAST' || orientation == 'WEST' ) {
				P1.x = P2.x = (startPoint.x + endPoint.x) / 2;

				P1.y = startPoint.y;
				P2.y = endPoint.y;
			}

			// sp, p1, pm, p2, ep == "x,y"
			var sp = startPoint.x+','+startPoint.y, p1 = P1.x+','+P1.y, p2 = P2.x+','+P2.y, ep = endPoint.x+','+endPoint.y,
				pm = (P1.x + P2.x)/2 +','+ (P1.y + P2.y)/2, pathString, stackPoint;

			if ( stacked ) { // STACKED CHILDREN

				stackPoint = (orientation == 'EAST' || orientation == 'WEST')?
				endPoint.x+','+startPoint.y:
				startPoint.x+','+endPoint.y;

				if ( connType == "step" || connType == "straight" ) {
					pathString = ["M", sp, 'L', stackPoint, 'L', ep];
				}
				else if ( connType == "curve" || connType == "bCurve" ) {
					var helpPoint, // used for nicer curve lines
						indent = from_node.connStyle.stackIndent;

					if ( orientation == 'NORTH' ) {
						helpPoint = (endPoint.x - indent)+','+(endPoint.y - indent);
					}
					else if ( orientation == 'SOUTH' ) {
						helpPoint = (endPoint.x - indent)+','+(endPoint.y + indent);
					}
					else if ( orientation == 'EAST' ) {
						helpPoint = (endPoint.x + indent) +','+startPoint.y;
					}
					else if ( orientation == 'WEST' ) {
						helpPoint = (endPoint.x - indent) +','+startPoint.y;
					}
					pathString = ["M", sp, 'L', helpPoint, 'S', stackPoint, ep];
				}

			}
			else {  // NORMAL CHILDREN
				if ( connType == "step" ) {
					pathString = ["M", sp, 'L', p1, 'L', p2, 'L', ep];
				}
				else if ( connType == "curve" ) {
					pathString = ["M", sp, 'C', p1, p2, ep ];
				}
				else if ( connType == "bCurve" ) {
					pathString = ["M", sp, 'Q', p1, pm, 'T', ep];
				}
				else if (connType == "straight" ) {
					pathString = ["M", sp, 'L', sp, ep];
				}
			}

			return pathString.join(" ");
		},

		/**
		 * Algorithm works from left to right, so previous processed node will be left neighbour of the next node
		 * @param {TreeNode} node
		 * @param {number} level
		 * @returns {Tree}
		 */
		setNeighbors: function( node, level ) {
			node.leftNeighborId = this.lastNodeOnLevel[level];
			if ( node.leftNeighborId ) {
				node.leftNeighbor().rightNeighborId = node.id;
			}
			this.lastNodeOnLevel[level] = node.id;
			return this;
		},

		/**
		 * Used for calculation of height and width of a level (level dimensions)
		 * @param {TreeNode} node
		 * @param {number} level
		 * @returns {Tree}
		 */
		calcLevelDim: function( node, level ) { // root node is on level 0
			this.levelMaxDim[level] = {
				width: Math.max( this.levelMaxDim[level]? this.levelMaxDim[level].width: 0, node.width ),
				height: Math.max( this.levelMaxDim[level]? this.levelMaxDim[level].height: 0, node.height )
			};
			return this;
		},

		/**
		 * @returns {Tree}
		 */
		resetLevelData: function() {
			this.lastNodeOnLevel = [];
			this.levelMaxDim = [];
			return this;
		},

		/**
		 * @returns {TreeNode}
		 */
		root: function() {
			return this.nodeDB.get( 0 );
		}
	};

	/**
	 * NodeDB is used for storing the nodes. Each tree has its own NodeDB.
	 * @param {object} nodeStructure
	 * @param {Tree} tree
	 * @constructor
	 */
	var NodeDB = function ( nodeStructure, tree ) {
		this.reset( nodeStructure, tree )
	};

	NodeDB.prototype = {

		/**
		 * @param {object} nodeStructure
		 * @param {Tree} tree
		 * @returns {NodeDB}
		 */
		reset: function( nodeStructure, tree ) {

			this.db	= [];

			var self = this;

			/**
			 * @param {object} node
			 * @param {number} parentId
			 */
			function iterateChildren( node, parentId ) {
				var newNode = self.createNode( node, parentId, tree, null );

				if ( node.children ) {
					// pseudo node is used for descending children to the next level
					if ( node.childrenDropLevel && node.childrenDropLevel > 0 ) {
						while ( node.childrenDropLevel-- ) {
							// pseudo node needs to inherit the connection style from its parent for continuous connectors
							var connStyle = UTIL.cloneObj( newNode.connStyle );
							newNode = self.createNode( 'pseudo', newNode.id, tree, null );
							newNode.connStyle = connStyle;
							newNode.children = [];
						}
					}

					var stack = ( node.stackChildren && !self.hasGrandChildren( node ) )? newNode.id: null;

					// children are positioned on separate levels, one beneath the other
					if ( stack !== null ) {
						newNode.stackChildren = [];
					}

					for ( var i = 0, len = node.children.length; i < len ; i++ ) {
						if ( stack !== null ) {
							newNode =  self.createNode( node.children[i], newNode.id, tree, stack );
							if ( ( i + 1 ) < len ) {
								// last node cant have children
								newNode.children = [];
							}
						}
						else {
							iterateChildren( node.children[i], newNode.id );
						}
					}
				}
			}

			if ( tree.CONFIG.animateOnInit ) {
				nodeStructure.collapsed = true;
			}

			iterateChildren( nodeStructure, -1 ); // root node

			this.createGeometries( tree );

			return this;
		},

		/**
		 * @param {Tree} tree
		 * @returns {NodeDB}
		 */
		createGeometries: function( tree ) {
			var i = this.db.length;

			while ( i-- ) {
				this.get( i ).createGeometry( tree );
			}
			return this;
		},

		/**
		 * @param {number} nodeId
		 * @returns {TreeNode}
		 */
		get: function ( nodeId ) {
			return this.db[nodeId]; // get TreeNode by ID
		},

		/**
		 * @param {function} callback
		 * @returns {NodeDB}
		 */
		walk: function( callback ) {
			var i = this.db.length;

			while ( i-- ) {
				callback.apply( this, [ this.get( i ) ] );
			}
			return this;
		},

		/**
		 *
		 * @param {object} nodeStructure
		 * @param {number} parentId
		 * @param {Tree} tree
		 * @param {number} stackParentId
		 * @returns {TreeNode}
		 */
		createNode: function( nodeStructure, parentId, tree, stackParentId ) {
			var node = new TreeNode( nodeStructure, this.db.length, parentId, tree, stackParentId );

			this.db.push( node );

			// skip root node (0)
			if ( parentId >= 0 ) {
				var parent = this.get( parentId );

				// todo: refactor into separate private method
				if ( nodeStructure.position ) {
					if ( nodeStructure.position == 'left' ) {
						parent.children.push( node.id );
					}
					else if ( nodeStructure.position == 'right' ) {
						parent.children.splice( 0, 0, node.id );
					}
					else if ( nodeStructure.position == 'center' ) {
						parent.children.splice( Math.floor( parent.children.length / 2 ), 0, node.id );
					}
					else {
						// edge case when there's only 1 child
						var position = parseInt( nodeStructure.position );
						if ( parent.children.length == 1 && position > 0 ) {
							parent.children.splice( 0, 0, node.id );
						}
						else {
							parent.children.splice(
								Math.max( position, parent.children.length - 1 ),
								0, node.id
							);
						}
					}
				}
				else {
					parent.children.push( node.id );
				}
			}

			if ( stackParentId ) {
				this.get( stackParentId ).stackParent = true;
				this.get( stackParentId ).stackChildren.push( node.id );
			}

			return node;
		},

		getMinMaxCoord: function( dim, parent, MinMax ) { // used for getting the dimensions of the tree, dim = 'X' || 'Y'
			// looks for min and max (X and Y) within the set of nodes
			parent = parent || this.get(0);

			MinMax = MinMax || { // start with root node dimensions
					min: parent[dim],
					max: parent[dim] + ( ( dim == 'X' )? parent.width: parent.height )
				};

			var i = parent.childrenCount();

			while ( i-- ) {
				var node = parent.childAt( i ),
					maxTest = node[dim] + ( ( dim == 'X' )? node.width: node.height ),
					minTest = node[dim];

				if ( maxTest > MinMax.max ) {
					MinMax.max = maxTest;
				}
				if ( minTest < MinMax.min ) {
					MinMax.min = minTest;
				}

				this.getMinMaxCoord( dim, node, MinMax );
			}
			return MinMax;
		},

		/**
		 * @param {object} nodeStructure
		 * @returns {boolean}
		 */
		hasGrandChildren: function( nodeStructure ) {
			var i = nodeStructure.children.length;
			while ( i-- ) {
				if ( nodeStructure.children[i].children ) {
					return true;
				}
			}
			return false;
		}
	};

	/**
	 * TreeNode constructor.
	 * @param {object} nodeStructure
	 * @param {number} id
	 * @param {number} parentId
	 * @param {Tree} tree
	 * @param {number} stackParentId
	 * @constructor
	 */
	var TreeNode = function( nodeStructure, id, parentId, tree, stackParentId ) {
		this.reset( nodeStructure, id, parentId, tree, stackParentId );
	};

	TreeNode.prototype = {

		/**
		 * @param {object} nodeStructure
		 * @param {number} id
		 * @param {number} parentId
		 * @param {Tree} tree
		 * @param {number} stackParentId
		 * @returns {TreeNode}
		 */
		reset: function( nodeStructure, id, parentId, tree, stackParentId ) {
			this.id = id;
			this.parentId = parentId;
			this.treeId = tree.id;

			this.prelim = 0;
			this.modifier = 0;
			this.leftNeighborId = null;

			this.stackParentId = stackParentId;

			// pseudo node is a node with width=height=0, it is invisible, but necessary for the correct positioning of the tree
			this.pseudo = nodeStructure === 'pseudo' || nodeStructure['pseudo']; // todo: surely if nodeStructure is a scalar then the rest will error:

			this.meta = nodeStructure.meta || {};
			this.image = nodeStructure.image || null;

			this.link = UTIL.createMerge( tree.CONFIG.node.link,  nodeStructure.link );

			this.connStyle = UTIL.createMerge( tree.CONFIG.connectors, nodeStructure.connectors );
			this.connector = null;

			this.drawLineThrough = nodeStructure.drawLineThrough === false ? false : ( nodeStructure.drawLineThrough || tree.CONFIG.node.drawLineThrough );

			this.collapsable = nodeStructure.collapsable === false ? false : ( nodeStructure.collapsable || tree.CONFIG.node.collapsable );
			this.collapsed = nodeStructure.collapsed;

			this.text = nodeStructure.text;

			// '.node' DIV
			this.nodeInnerHTML = nodeStructure.innerHTML;
			this.nodeHTMLclass = (tree.CONFIG.node.HTMLclass ? tree.CONFIG.node.HTMLclass : '') + // globally defined class for the nodex
				(nodeStructure.HTMLclass ? (' ' + nodeStructure.HTMLclass) : '');		// + specific node class

			this.nodeHTMLid = nodeStructure.HTMLid;

			this.children = [];

			return this;
		},

		/**
		 * @returns {Tree}
		 */
		getTree: function() {
			return TreeStore.get( this.treeId );
		},

		/**
		 * @returns {object}
		 */
		getTreeConfig: function() {
			return this.getTree().CONFIG;
		},

		/**
		 * @returns {NodeDB}
		 */
		getTreeNodeDb: function() {
			return this.getTree().getNodeDb();
		},

		/**
		 * @param {number} nodeId
		 * @returns {TreeNode}
		 */
		lookupNode: function( nodeId ) {
			return this.getTreeNodeDb().get( nodeId );
		},

		/**
		 * @returns {Tree}
		 */
		Tree: function() {
			return TreeStore.get( this.treeId );
		},

		/**
		 * @param {number} nodeId
		 * @returns {TreeNode}
		 */
		dbGet: function( nodeId ) {
			return this.getTreeNodeDb().get( nodeId );
		},

		/**
		 * Returns the width of the node
		 * @returns {float}
		 */
		size: function() {
			var orientation = this.getTreeConfig().rootOrientation;

			if ( this.pseudo ) {
				// prevents separating the subtrees
				return ( -this.getTreeConfig().subTeeSeparation );
			}

			if ( orientation == 'NORTH' || orientation == 'SOUTH' ) {
				return this.width;
			}
			else if ( orientation == 'WEST' || orientation == 'EAST' ) {
				return this.height;
			}
		},

		/**
		 * @returns {number}
		 */
		childrenCount: function () {
			return ( ( this.collapsed || !this.children)? 0: this.children.length );
		},

		/**
		 * @param {number} index
		 * @returns {TreeNode}
		 */
		childAt: function( index ) {
			return this.dbGet( this.children[index] );
		},

		/**
		 * @returns {TreeNode}
		 */
		firstChild: function() {
			return this.childAt( 0 );
		},

		/**
		 * @returns {TreeNode}
		 */
		lastChild: function() {
			return this.childAt( this.children.length - 1 );
		},

		/**
		 * @returns {TreeNode}
		 */
		parent: function() {
			return this.lookupNode( this.parentId );
		},

		/**
		 * @returns {TreeNode}
		 */
		leftNeighbor: function() {
			if ( this.leftNeighborId ) {
				return this.lookupNode( this.leftNeighborId );
			}
		},

		/**
		 * @returns {TreeNode}
		 */
		rightNeighbor: function() {
			if ( this.rightNeighborId ) {
				return this.lookupNode( this.rightNeighborId );
			}
		},

		/**
		 * @returns {TreeNode}
		 */
		leftSibling: function () {
			var leftNeighbor = this.leftNeighbor();

			if ( leftNeighbor && leftNeighbor.parentId == this.parentId ){
				return leftNeighbor;
			}
		},

		/**
		 * @returns {TreeNode}
		 */
		rightSibling: function () {
			var rightNeighbor = this.rightNeighbor();

			if ( rightNeighbor && rightNeighbor.parentId == this.parentId ) {
				return rightNeighbor;
			}
		},

		/**
		 * @returns {number}
		 */
		childrenCenter: function () {
			var first = this.firstChild(),
				last = this.lastChild();

			return ( first.prelim + ((last.prelim - first.prelim) + last.size()) / 2 );
		},

		/**
		 * Find out if one of the node ancestors is collapsed
		 * @returns {*}
		 */
		collapsedParent: function() {
			var parent = this.parent();
			if ( !parent ) {
				return false;
			}
			if ( parent.collapsed ) {
				return parent;
			}
			return parent.collapsedParent();
		},

		/**
		 * Returns the leftmost child at specific level, (initial level = 0)
		 * @param level
		 * @param depth
		 * @returns {*}
		 */
		leftMost: function ( level, depth ) {
			if ( level >= depth ) {
				return this;
			}
			if ( this.childrenCount() === 0 ) {
				return;
			}

			for ( var i = 0, n = this.childrenCount(); i < n; i++ ) {
				var leftmostDescendant = this.childAt( i ).leftMost( level + 1, depth );
				if ( leftmostDescendant ) {
					return leftmostDescendant;
				}
			}
		},

		// returns start or the end point of the connector line, origin is upper-left
		connectorPoint: function(startPoint) {
			var orient = this.Tree().CONFIG.rootOrientation, point = {};

			if ( this.stackParentId ) { // return different end point if node is a stacked child
				if ( orient == 'NORTH' || orient == 'SOUTH' ) {
					orient = 'WEST';
				}
				else if ( orient == 'EAST' || orient == 'WEST' ) {
					orient = 'NORTH';
				}
			}

			// if pseudo, a virtual center is used
			if ( orient == 'NORTH' ) {
				point.x = (this.pseudo) ? this.X - this.Tree().CONFIG.subTeeSeparation/2 : this.X + this.width/2;
				point.y = (startPoint) ? this.Y + this.height : this.Y;
			}
			else if (orient == 'SOUTH') {
				point.x = (this.pseudo) ? this.X - this.Tree().CONFIG.subTeeSeparation/2 : this.X + this.width/2;
				point.y = (startPoint) ? this.Y : this.Y + this.height;
			}
			else if (orient == 'EAST') {
				point.x = (startPoint) ? this.X : this.X + this.width;
				point.y = (this.pseudo) ? this.Y - this.Tree().CONFIG.subTeeSeparation/2 : this.Y + this.height/2;
			}
			else if (orient == 'WEST') {
				point.x = (startPoint) ? this.X + this.width : this.X;
				point.y =  (this.pseudo) ? this.Y - this.Tree().CONFIG.subTeeSeparation/2 : this.Y + this.height/2;
			}
			return point;
		},

		/**
		 * @returns {string}
		 */
		pathStringThrough: function() { // get the geometry of a path going through the node
			var startPoint = this.connectorPoint( true ),
				endPoint = this.connectorPoint( false );

			return ["M", startPoint.x+","+startPoint.y, 'L', endPoint.x+","+endPoint.y].join(" ");
		},

		/**
		 * @param {object} hidePoint
		 */
		drawLineThroughMe: function( hidePoint ) { // hidepoint se proslijedjuje ako je node sakriven zbog collapsed
			var pathString = hidePoint?
				this.Tree().getPointPathString( hidePoint ):
				this.pathStringThrough();

			this.lineThroughMe = this.lineThroughMe || this.Tree()._R.path(pathString);

			var line_style = UTIL.cloneObj( this.connStyle.style );

			delete line_style['arrow-start'];
			delete line_style['arrow-end'];

			this.lineThroughMe.attr( line_style );

			if ( hidePoint ) {
				this.lineThroughMe.hide();
				this.lineThroughMe.hidden = true;
			}
		},

		addSwitchEvent: function( nodeSwitch ) {
			var self = this;
			UTIL.addEvent( nodeSwitch, 'click',
				function( e ) {
					e.preventDefault();
					if ( self.getTreeConfig().callback.onBeforeClickCollapseSwitch.apply( self, [ nodeSwitch, e ] ) === false ) {
						return false;
					}

					self.toggleCollapse();

					self.getTreeConfig().callback.onAfterClickCollapseSwitch.apply( self, [ nodeSwitch, e ] );
				}
			);
		},

		/**
		 * @returns {TreeNode}
		 */
		collapse: function() {
			if ( !this.collapsed ) {
				this.toggleCollapse();
			}
			return this;
		},

		/**
		 * @returns {TreeNode}
		 */
		expand: function() {
			if ( this.collapsed ) {
				this.toggleCollapse();
			}
			return this;
		},

		/**
		 * @returns {TreeNode}
		 */
		toggleCollapse: function() {
			var oTree = this.getTree();

			if ( !oTree.inAnimation ) {
				oTree.inAnimation = true;

				this.collapsed = !this.collapsed; // toggle the collapse at each click
				UTIL.toggleClass( this.nodeDOM, 'collapsed', this.collapsed );

				oTree.positionTree();

				var self = this;

				setTimeout(
					function() { // set the flag after the animation
						oTree.inAnimation = false;
						oTree.CONFIG.callback.onToggleCollapseFinished.apply( oTree, [ self, self.collapsed ] );
					},
					( oTree.CONFIG.animation.nodeSpeed > oTree.CONFIG.animation.connectorsSpeed )?
						oTree.CONFIG.animation.nodeSpeed:
						oTree.CONFIG.animation.connectorsSpeed
				);
			}
			return this;
		},

		hide: function( collapse_to_point ) {
			collapse_to_point = collapse_to_point || false;

			var bCurrentState = this.hidden;
			this.hidden = true;

			this.nodeDOM.style.overflow = 'hidden';

			var tree = this.getTree(),
				config = this.getTreeConfig(),
				oNewState = {
					opacity: 0
				};

			if ( collapse_to_point ) {
				oNewState.left = collapse_to_point.x;
				oNewState.top = collapse_to_point.y;
			}

			// if parent was hidden in initial configuration, position the node behind the parent without animations
			if ( !this.positioned || bCurrentState ) {
				this.nodeDOM.style.visibility = 'hidden';
				if ( $ ) {
					$( this.nodeDOM ).css( oNewState );
				}
				else {
					this.nodeDOM.style.left = oNewState.left + 'px';
					this.nodeDOM.style.top = oNewState.top + 'px';
				}
				this.positioned = true;
			}
			else {
				// todo: fix flashy bug when a node is manually hidden and tree.redraw is called.
				if ( $ ) {
					$( this.nodeDOM ).animate(
						oNewState, config.animation.nodeSpeed, config.animation.nodeAnimation,
						function () {
							this.style.visibility = 'hidden';
						}
					);
				}
				else {
					this.nodeDOM.style.transition = 'all '+config.animation.nodeSpeed+'ms ease';
					this.nodeDOM.style.transitionProperty = 'opacity, left, top';
					this.nodeDOM.style.opacity = oNewState.opacity;
					this.nodeDOM.style.left = oNewState.left + 'px';
					this.nodeDOM.style.top = oNewState.top + 'px';
					this.nodeDOM.style.visibility = 'hidden';
				}
			}

			// animate the line through node if the line exists
			if ( this.lineThroughMe ) {
				var new_path = tree.getPointPathString( collapse_to_point );
				if ( bCurrentState ) {
					// update without animations
					this.lineThroughMe.attr( { path: new_path } );
				}
				else {
					// update with animations
					tree.animatePath( this.lineThroughMe, tree.getPointPathString( collapse_to_point ) );
				}
			}

			return this;
		},

		/**
		 * @returns {TreeNode}
		 */
		hideConnector: function() {
			var oTree = this.Tree();
			var oPath = oTree.connectionStore[this.id];
			if ( oPath ) {
				oPath.animate(
					{ 'opacity': 0 },
					oTree.CONFIG.animation.connectorsSpeed,
					oTree.CONFIG.animation.connectorsAnimation
				);
			}
			return this;
		},

		show: function() {
			var bCurrentState = this.hidden;
			this.hidden = false;

			this.nodeDOM.style.visibility = 'visible';

			var oTree = this.Tree();

			var oNewState = {
					left: this.X,
					top: this.Y,
					opacity: 1
				},
				config = this.getTreeConfig();

			// if the node was hidden, update opacity and position
			if ( $ ) {
				$( this.nodeDOM ).animate(
					oNewState,
					config.animation.nodeSpeed, config.animation.nodeAnimation,
					function () {
						// $.animate applies "overflow:hidden" to the node, remove it to avoid visual problems
						this.style.overflow = "";
					}
				);
			}
			else {
				this.nodeDOM.style.transition = 'all '+config.animation.nodeSpeed+'ms ease';
				this.nodeDOM.style.transitionProperty = 'opacity, left, top';
				this.nodeDOM.style.left = oNewState.left + 'px';
				this.nodeDOM.style.top = oNewState.top + 'px';
				this.nodeDOM.style.opacity = oNewState.opacity;
				this.nodeDOM.style.overflow = '';
			}

			if ( this.lineThroughMe ) {
				this.getTree().animatePath( this.lineThroughMe, this.pathStringThrough() );
			}

			return this;
		},

		/**
		 * @returns {TreeNode}
		 */
		showConnector: function() {
			var oTree = this.Tree();
			var oPath = oTree.connectionStore[this.id];
			if ( oPath ) {
				oPath.animate(
					{ 'opacity': 1 },
					oTree.CONFIG.animation.connectorsSpeed,
					oTree.CONFIG.animation.connectorsAnimation
				);
			}
			return this;
		}
	};

	/**
	 * @param {Tree} tree
	 */
	TreeNode.prototype.createGeometry = function( tree ) {
		if ( this.id === 0 && tree.CONFIG.hideRootNode ) {
			this.width = 0;
			this.height = 0;
			return;
		}

		var drawArea = tree.drawArea,
			image,

			/////////// CREATE NODE //////////////
			node = document.createElement( this.link.href? 'a': 'div' );

		node.className = ( !this.pseudo )? TreeNode.CONFIG.nodeHTMLclass: 'pseudo';
		if ( this.nodeHTMLclass && !this.pseudo ) {
			node.className += ' ' + this.nodeHTMLclass;
		}

		if ( this.nodeHTMLid ) {
			node.id = this.nodeHTMLid;
		}

		if ( this.link.href ) {
			node.href = this.link.href;
			node.target = this.link.target;
		}

		if ( $ ) {
			$( node ).data( 'treenode', this );
		}
		else {
			node.data = {
				'treenode': this
			};
		}

		/////////// CREATE innerHTML //////////////
		if ( !this.pseudo ) {
			if ( !this.nodeInnerHTML ) {

				// IMAGE
				if ( this.image ) {
					image = document.createElement( 'img' );
					image.src = this.image;
					node.appendChild( image );
				}

				// TEXT
				if ( this.text ) {
					for ( var key in this.text ) {
						if ( TreeNode.CONFIG.textClass[key] ) {
							var text = document.createElement( this.text[key].href? 'a' : 'p' );

							// make an <a> element if required
							if (this.text[key].href) {
								text.href = this.text[key].href;
								if (this.text[key].target) {
									text.target = this.text[key].target;
								}
							}

							text.className = TreeNode.CONFIG.textClass[key];
							text.appendChild(document.createTextNode(
								this.text[key].val ? this.text[key].val :
									this.text[key] instanceof Object?
										"'val' param missing!":
										this.text[key]
								)
							);

							node.appendChild(text);
						}
					}
				}

			}
			else {
				// get some element by ID and clone its structure into a node
				if (this.nodeInnerHTML.charAt(0) === "#") {
					var elem = document.getElementById(this.nodeInnerHTML.substring(1));
					if (elem) {
						node = elem.cloneNode(true);
						node.id += "-clone";
						node.className += " node";
					}
					else {
						node.innerHTML = "<b> Wrong ID selector </b>";
					}
				}
				else {
					// insert your custom HTML into a node
					node.innerHTML = this.nodeInnerHTML;
				}
			}

			// handle collapse switch
			if ( this.collapsed || (this.collapsable && this.childrenCount() && !this.stackParentId) ) {
				this.createSwitchGeometry( tree, node );
			}
		}

		tree.CONFIG.callback.onCreateNode.apply( tree, [this, node] );

		/////////// APPEND all //////////////
		drawArea.appendChild(node);

		this.width = node.offsetWidth;
		this.height = node.offsetHeight;

		this.nodeDOM = node;

		tree.imageLoader.processNode(this);
	};

	/**
	 * @param {Tree} tree
	 * @param {Element} nodeEl
	 */
	TreeNode.prototype.createSwitchGeometry = function( tree, nodeEl ) {
		nodeEl = nodeEl || this.nodeDOM;

		// safe guard and check to see if it has a collapse switch
		var nodeSwitchEl = UTIL.findEl( '.collapse-switch', true, nodeEl );
		if ( !nodeSwitchEl ) {
			nodeSwitchEl = document.createElement( 'a' );
			nodeSwitchEl.className = "collapse-switch";

			nodeEl.appendChild( nodeSwitchEl );
			this.addSwitchEvent( nodeSwitchEl );
			if ( this.collapsed ) {
				nodeEl.className += " collapsed";
			}

			tree.CONFIG.callback.onCreateNodeCollapseSwitch.apply( tree, [this, nodeEl, nodeSwitchEl] );
		}
		return nodeSwitchEl;
	};


	// ###########################################
	//		Expose global + default CONFIG params
	// ###########################################


	Tree.CONFIG = {
		maxDepth: 100,
		rootOrientation: 'NORTH', // NORTH || EAST || WEST || SOUTH
		nodeAlign: 'CENTER', // CENTER || TOP || BOTTOM
		levelSeparation: 30,
		siblingSeparation: 30,
		subTeeSeparation: 30,

		hideRootNode: false,

		animateOnInit: false,
		animateOnInitDelay: 500,

		padding: 15, // the difference is seen only when the scrollbar is shown
		scrollbar: 'native', // "native" || "fancy" || "None" (PS: "fancy" requires jquery and perfect-scrollbar)

		connectors: {
			type: 'curve', // 'curve' || 'step' || 'straight' || 'bCurve'
			style: {
				stroke: 'black'
			},
			stackIndent: 15
		},

		node: { // each node inherits this, it can all be overridden in node config

			// HTMLclass: 'node',
			// drawLineThrough: false,
			// collapsable: false,
			link: {
				target: '_self'
			}
		},

		animation: { // each node inherits this, it can all be overridden in node config
			nodeSpeed: 450,
			nodeAnimation: 'linear',
			connectorsSpeed: 450,
			connectorsAnimation: 'linear'
		},

		callback: {
			onCreateNode: function( treeNode, treeNodeDom ) {}, // this = Tree
			onCreateNodeCollapseSwitch: function( treeNode, treeNodeDom, switchDom ) {}, // this = Tree
			onAfterAddNode: function( newTreeNode, parentTreeNode, nodeStructure ) {}, // this = Tree
			onBeforeAddNode: function( parentTreeNode, nodeStructure ) {}, // this = Tree
			onAfterPositionNode: function( treeNode, nodeDbIndex, containerCenter, treeCenter) {}, // this = Tree
			onBeforePositionNode: function( treeNode, nodeDbIndex, containerCenter, treeCenter) {}, // this = Tree
			onToggleCollapseFinished: function ( treeNode, bIsCollapsed ) {}, // this = Tree
			onAfterClickCollapseSwitch: function( nodeSwitch, event ) {}, // this = TreeNode
			onBeforeClickCollapseSwitch: function( nodeSwitch, event ) {}, // this = TreeNode
			onTreeLoaded: function( rootTreeNode ) {} // this = Tree
		}
	};

	TreeNode.CONFIG = {
		nodeHTMLclass: 'node',

		textClass: {
			name:	'node-name',
			title:	'node-title',
			desc:	'node-desc',
			contact: 'node-contact'
		}
	};

	// #############################################
	// Makes a JSON chart config out of Array config
	// #############################################

	var JSONconfig = {
		make: function( configArray ) {

			var i = configArray.length, node;

			this.jsonStructure = {
				chart: null,
				nodeStructure: null
			};
			//fist loop: find config, find root;
			while(i--) {
				node = configArray[i];
				if (node.hasOwnProperty('container')) {
					this.jsonStructure.chart = node;
					continue;
				}

				if (!node.hasOwnProperty('parent') && ! node.hasOwnProperty('container')) {
					this.jsonStructure.nodeStructure = node;
					node.myID = this.getID();
				}
			}

			this.findChildren(configArray);

			return this.jsonStructure;
		},

		findChildren: function(nodes) {
			var parents = [0]; // start with a a root node

			while(parents.length) {
				var parentId = parents.pop(),
					parent = this.findNode(this.jsonStructure.nodeStructure, parentId),
					i = 0, len = nodes.length,
					children = [];

				for(;i<len;i++) {
					var node = nodes[i];
					if(node.parent && (node.parent.myID == parentId)) { // skip config and root nodes

						node.myID = this.getID();

						delete node.parent;

						children.push(node);
						parents.push(node.myID);
					}
				}

				if (children.length) {
					parent.children = children;
				}
			}
		},

		findNode: function( node, nodeId ) {
			var childrenLen, found;

			if (node.myID === nodeId) {
				return node;
			}
			else if ( node.children ) {
				childrenLen = node.children.length;
				while ( childrenLen-- ) {
					found = this.findNode(node.children[childrenLen], nodeId);
					if ( found ) {
						return found;
					}
				}
			}
		},

		getID: (function() {
			var i = 0;
			return function() {
				return i++;
			};
		})()
	};

	/**
	 * Chart constructor.
	 */
	var Treant = function(jsonConfig, callback, jQuery) {
		if ( jsonConfig instanceof Array ) {
			jsonConfig = JSONconfig.make( jsonConfig );
		}

		// optional
		if ( jQuery ) {
			$ = jQuery;
		}

		this.tree = TreeStore.createTree( jsonConfig );
		this.tree.positionTree( callback );
	};

	Treant.prototype.destroy = function() {
		TreeStore.destroy( this.tree.id );
	};

	/* expose constructor globally */
	window.Treant = Treant;

})();