/* ==========================================================
 *                  GitGraph v1.4.0
 *      https://github.com/nicoespeon/gitgraph.js
 * ==========================================================
 * Copyright (c) 2016 Nicolas CARLO (@nicoespeon) ٩(^‿^)۶
 * Copyright (c) 2016 Fabien BERNARD (@fabien0102) ✌(✰‿✰)✌
 *
 * GitGraph.js may be freely distributed under the MIT Licence
 * ========================================================== */

(function () {
  "use strict";

  /**
   * Emit an event on the given element.
   *
   * @param {HTMLElement} element - DOM element to trigger the event on.
   * @param {String} eventName - Name of the triggered event.
   * @param {Object} [data={}] - Custom data to attach to the event.
   * @private
   */
  function _emitEvent ( element, eventName, data ) {
    var event;

    if ( document.createEvent ) {
      event = document.createEvent( "HTMLEvents" );
      event.initEvent( eventName, true, true );
    } else {
      event = document.createEventObject();
      event.eventType = eventName;
    }

    event.eventName = eventName;
    event.data = data || {};

    if ( document.createEvent ) {
      element.dispatchEvent( event );
    } else {
      element.fireEvent( "on" + event.eventType, event );
    }
  }

  /**
   * Returns the scaling factor of given canvas `context`.
   * Handles high-resolution displays.
   *
   * @param {Object} context
   * @returns {Number}
   * @private
   */
  function _getScale ( context ) {
    var backingStorePixelRatio;
    var scalingFactor;

    // Account for high-resolution displays
    scalingFactor = 1;

    if ( window.devicePixelRatio ) {
      backingStorePixelRatio = context.webkitBackingStorePixelRatio ||
                               context.mozBackingStorePixelRatio ||
                               context.msBackingStorePixelRatio ||
                               context.oBackingStorePixelRatio ||
                               context.backingStorePixelRatio || 1;

      scalingFactor *= window.devicePixelRatio / backingStorePixelRatio;
    }

    return scalingFactor;
  }

  /**
   * Returns `true` if `graph` has a vertical orientation.
   *
   * @param {GitGraph} graph
   * @returns {boolean}
   * @private
   */
  function _isVertical ( graph ) {
    return (graph.orientation === "vertical" || graph.orientation === "vertical-reverse");
  }

  /**
   * Returns `true` if `graph` has an horizontal orientation.
   *
   * @param {GitGraph} graph
   * @returns {boolean}
   * @private
   */
  function _isHorizontal ( graph ) {
    return (graph.orientation === "horizontal" || graph.orientation === "horizontal-reverse");
  }

  /**
   * GitGraph
   *
   * @constructor
   *
   * @param {Object} options - GitGraph options
   * @param {String} [options.elementId = "gitGraph"] - Id of the canvas container
   * @param {Template|String|Object} [options.template] - Template of the graph
   * @param {String} [options.author = "Sergio Flores <saxo-guy@epic.com>"] - Default author for commits
   * @param {String} [options.mode = (null|"compact")]  - Display mode
   * @param {HTMLElement} [options.canvas] - DOM canvas (ex: document.getElementById("id"))
   * @param {String} [options.orientation = ("vertical-reverse"|"horizontal"|"horizontal-reverse")] - Graph orientation
   * @param {Boolean} [options.reverseArrow = false] - Make arrows point to ancestors if true
   * @param {Number} [options.initCommitOffsetX = 0] - Add custom offsetX to initial commit.
   * @param {Number} [options.initCommitOffsetY= 0] - Add custom offsetY to initial commit.
   *
   * @this GitGraph
   **/
  function GitGraph ( options ) {
    // Options
    options = (typeof options === "object") ? options : {};
    this.elementId = (typeof options.elementId === "string") ? options.elementId : "gitGraph";
    this.author = (typeof options.author === "string") ? options.author : "Sergio Flores <saxo-guy@epic.com>";
    this.reverseArrow = booleanOptionOr( options.reverseArrow, false );

    // Template management
    if ( (typeof options.template === "string")
         || (typeof options.template === "object") ) {
      this.template = this.newTemplate( options.template );
    } else if ( options.template instanceof Template ) {
      this.template = options.template;
    } else {
      this.template = this.newTemplate( "metro" );
    }

    this.mode = options.mode || null;
    if ( this.mode === "compact" ) {
      this.template.commit.message.display = false;
    }

    // Orientation
    switch ( options.orientation ) {
    case "vertical-reverse" :
      this.template.commit.spacingY *= -1;
      this.orientation = "vertical-reverse";
      this.template.branch.labelRotation = 0;
      this.template.commit.tag.spacingY *= -1;
      break;
    case "horizontal" :
      this.template.commit.message.display = false;
      this.template.commit.spacingX = this.template.commit.spacingY;
      this.template.branch.spacingY = this.template.branch.spacingX;
      this.template.commit.spacingY = 0;
      this.template.branch.spacingX = 0;
      this.orientation = "horizontal";
      this.template.branch.labelRotation = -90;
      this.template.commit.tag.spacingX = -this.template.commit.spacingX;
      this.template.commit.tag.spacingY = this.template.branch.spacingY;
      break;
    case "horizontal-reverse" :
      this.template.commit.message.display = false;
      this.template.commit.spacingX = -this.template.commit.spacingY;
      this.template.branch.spacingY = this.template.branch.spacingX;
      this.template.commit.spacingY = 0;
      this.template.branch.spacingX = 0;
      this.orientation = "horizontal-reverse";
      this.template.branch.labelRotation = 90;
      this.template.commit.tag.spacingX = -this.template.commit.spacingY;
      this.template.commit.tag.spacingY = this.template.branch.spacingY;
      break;
    default:
      this.orientation = "vertical";
      this.template.branch.labelRotation = 0;
      break;
    }

    this.marginX = this.template.branch.spacingX + this.template.commit.dot.size * 2;
    this.marginY = this.template.branch.spacingY + this.template.commit.dot.size * 2;
    this.offsetX = 0;
    this.offsetY = 0;

    // Canvas init
    this.canvas = document.getElementById( this.elementId ) || options.canvas;
    this.context = this.canvas.getContext( "2d" );
    this.context.textBaseline = "center";

    // Tooltip layer
    this.tooltip = document.createElement( "div" );
    this.tooltip.className = "gitgraph-tooltip";
    this.tooltip.style.position = "fixed";
    this.tooltip.style.display = "none";

    // Add tooltip div into body
    document.body.appendChild( this.tooltip );

    // Navigation vars
    this.HEAD = null;
    this.branches = [];
    this.commits = [];

    // Utilities
    this.columnMax = 0; // nb of column for message position
    this.commitOffsetX = options.initCommitOffsetX || 0;
    this.commitOffsetY = options.initCommitOffsetY || 0;

    // Bindings
    var mouseMoveOptions = {
      handleEvent: this.hover,
      gitgraph: this
    };
    this.canvas.addEventListener( "mousemove", mouseMoveOptions, false );

    var mouseDownOptions = {
      handleEvent: this.click,
      gitgraph: this
    };
    this.canvas.addEventListener( "mousedown", mouseDownOptions, false );

    // Render on window resize
    window.onresize = this.render.bind( this );
  }

  /**
   * Create new branch
   *
   * @param {(String | Object)} options - Branch name | Options of Branch
   *
   * @see Branch
   * @this GitGraph
   *
   * @return {Branch} New branch
   **/
  GitGraph.prototype.branch = function ( options ) {
    // Options
    if ( typeof options === "string" ) {
      var name = options;
      options = {};
      options.name = name;
    }

    options = (typeof options === "object") ? options : {};
    options.parent = this;
    options.parentBranch = options.parentBranch || this.HEAD;

    // Add branch
    var branch = new Branch( options );
    this.branches.push( branch );

    // Return
    return branch;
  };

  /**
   * Create new orphan branch
   *
   * @param {(String | Object)} options - Branch name | Options of Branch
   *
   * @see Branch
   * @this GitGraph
   *
   * @return {Branch} New branch
   **/
  GitGraph.prototype.orphanBranch = function ( options ) {
    // Options
    if ( typeof options === "string" ) {
      var name = options;
      options = {};
      options.name = name;
    }

    options = (typeof options === "object") ? options : {};
    options.parent = this;

    // Add branch
    var branch = new Branch( options );
    this.branches.push( branch );

    // Return
    return branch;
  };

  /**
   * Commit on HEAD
   *
   * @param {Object} options - Options of commit
   *
   * @see Commit
   * @this GitGraph
   *
   * @return {GitGraph} this - Return the main object so we can chain
   **/
  GitGraph.prototype.commit = function ( options ) {
    this.HEAD.commit( options );

    // Return the main object so we can chain
    return this;
  };

  /**
   * Create a new template
   *
   * @param {(String|Object)} options - The template name, or the template options
   *
   * @return {Template}
   **/
  GitGraph.prototype.newTemplate = function ( options ) {
    if ( typeof options === "string" ) {
      return new Template().get( options );
    }
    return new Template( options );
  };

  /**
   * Render the canvas
   *
   * @this GitGraph
   **/
  GitGraph.prototype.render = function () {
    this.scalingFactor = _getScale( this.context );

    // Resize canvas
    var unscaledResolution = {
      x: Math.abs( (this.columnMax + 1 ) * this.template.branch.spacingX )
         + Math.abs( this.commitOffsetX )
         + this.marginX * 2,
      y: Math.abs( (this.columnMax + 1 ) * this.template.branch.spacingY )
         + Math.abs( this.commitOffsetY )
         + this.marginY * 2
    };

    if ( this.template.commit.message.display ) {
      unscaledResolution.x += 800;
    }

    unscaledResolution.x += this.template.commit.widthExtension;

    this.canvas.style.width = unscaledResolution.x + "px";
    this.canvas.style.height = unscaledResolution.y + "px";

    this.canvas.width = unscaledResolution.x * this.scalingFactor;
    this.canvas.height = unscaledResolution.y * this.scalingFactor;

    // Clear All
    this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

    // Add some margin
    this.context.translate( this.marginX, this.marginY );

    // Translate for inverse orientation
    if ( this.template.commit.spacingY > 0 ) {
      this.context.translate( 0, this.canvas.height - this.marginY * 2 );
      this.offsetY = this.canvas.height - this.marginY * 2;
    }
    if ( this.template.commit.spacingX > 0 ) {
      this.context.translate( this.canvas.width - this.marginX * 2, 0 );
      this.offsetX = this.canvas.width - this.marginX * 2;
    }

    // Scale the context when every transformations have been made.
    this.context.scale( this.scalingFactor, this.scalingFactor );

    // Render branches
    for ( var i = this.branches.length - 1, branch; !!(branch = this.branches[ i ]); i-- ) {
      branch.render();
    }

    this.tagNum = 0;

    // Render commits after to put them on the foreground
    for ( var j = 0, commit; !!(commit = this.commits[ j ]); j++ ) {
      commit.render();
    }

    _emitEvent( this.canvas, "graph:render", { id: this.elementId } );
  };

  /**
   * A callback for each commit
   *
   * @callback commitCallback
   * @param {Commit} commit - A commit
   * @param {boolean} mouseOver - True, if the mouse is currently hovering over the commit
   */

  /**
   * Hover event on commit dot
   *
   * @param {MouseEvent} event - Mouse event
   * @param {commitCallback} callbackFn - A callback function that will be called for each commit
   *
   * @this GitGraph
   **/
  GitGraph.prototype.applyCommits = function ( event, callbackFn ) {
    // Fallback onto layerX/layerY for older versions of Firefox.
    function getOffsetById ( id ) {
      var el = document.getElementById( id );
      var rect = el.getBoundingClientRect();

      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    }

    var offsetX = event.offsetX || (event.pageX - getOffsetById( this.elementId ).left);
    var offsetY = event.offsetY || (event.pageY - getOffsetById( this.elementId ).top);

    for ( var i = 0, commit; !!(commit = this.commits[ i ]); i++ ) {
      var distanceX = (commit.x + (this.offsetX + this.marginX) / this.scalingFactor - offsetX);
      var distanceY = (commit.y + (this.offsetY + this.marginY) / this.scalingFactor - offsetY);
      var distanceBetweenCommitCenterAndMouse = Math.sqrt( Math.pow( distanceX, 2 ) + Math.pow( distanceY, 2 ) );
      var isOverCommit = distanceBetweenCommitCenterAndMouse < this.template.commit.dot.size;

      callbackFn( commit, isOverCommit );
    }
  };

  /**
   * Hover event on commit dot
   *
   * @param {MouseEvent} event - Mouse event
   *
   * @this GitGraph
   **/
  GitGraph.prototype.hover = function ( event ) {
    var self = this.gitgraph;
    var isOut = true;

    function showCommitTooltip ( commit ) {
      if ( !commit.tooltipDisplay ) {
        return;
      }

      // Fix firefox MouseEvent
      if ( typeof InstallTrigger !== "undefined" )/* == (is Firefox) */ {
        event.x = event.x ? event.x : event.clientX;
        event.y = event.y ? event.y : event.clientY;
      }

      self.tooltip.style.left = event.x + "px"; // TODO Scroll bug
      self.tooltip.style.top = event.y + "px";  // TODO Scroll bug
      if ( self.template.commit.tooltipHTMLFormatter !== null ) {
        self.tooltip.innerHTML = self.template.commit.tooltipHTMLFormatter( commit );
      } else {
        self.tooltip.textContent = commit.sha1 + " - " + commit.message;
      }
      self.tooltip.style.display = "block";
    }

    function emitCommitEvent ( commit, event ) {
      var mouseEventOptions = {
        author: commit.author,
        message: commit.message,
        date: commit.date,
        sha1: commit.sha1
      };

      _emitEvent( self.canvas, "commit:" + event, mouseEventOptions );
    }

    self.applyCommits( event, function ( commit, isOverCommit ) {
      if ( isOverCommit ) {
        if ( !self.template.commit.message.display && self.template.commit.shouldDisplayTooltipsInCompactMode ) {
          showCommitTooltip( commit );
        }

        // Don't emit event if we already were over a commit.
        if ( !commit.isMouseOver ) {
          emitCommitEvent( commit, "mouseover" );
        }

        isOut = false;
        commit.isMouseOver = true;
      } else {
        // Don't emit event if we already were out of a commit.
        if ( commit.isMouseOver ) {
          emitCommitEvent( commit, "mouseout" );
        }
        commit.isMouseOver = false;
      }
    } );

    if ( isOut ) {
      self.tooltip.style.display = "none";
    }
  };

  /**
   * Click event on commit dot
   *
   * @param {MouseEvent} event - Mouse event
   *
   * @this GitGraph
   **/
  GitGraph.prototype.click = function ( event ) {
    this.gitgraph.applyCommits( event, function ( commit, isOverCommit ) {
      if ( !isOverCommit ) {
        return;
      }

      if ( commit.onClick !== null ) {
        commit.onClick( commit, true );
      }
    } );
  };

  // --------------------------------------------------------------------
  // -----------------------      Branch         ------------------------
  // --------------------------------------------------------------------

  /**
   * Branch
   *
   * @constructor
   *
   * @param {Object} options - Options of branch
   * @param {GitGraph} options.parent - GitGraph constructor
   * @param {Branch} [options.parentBranch = options.parentCommit.branch] - Parent branch
   * @param {Commit} [options.parentCommit = options.parentBranch.commits.slice(-1)[0]] - Parent commit
   * @param {String} [options.name = "no-name"] - Branch name
   *
   * @this Branch
   **/
  function Branch ( options ) {
    // Check integrity
    if ( options.parent instanceof GitGraph === false ) {
      return;
    }

    // Options
    options = (typeof options === "object") ? options : {};
    this.parent = options.parent;
    if ( options.parentCommit && options.parentBranch ) {
      if ( options.parentCommit.branch !== options.parentBranch ) {
        return;
      }
      this.parentCommit = options.parentCommit;
      this.parentBranch = options.parentBranch;
    } else if ( options.parentCommit ) {
      this.parentCommit = options.parentCommit;
      this.parentBranch = options.parentCommit.branch;
    } else if ( options.parentBranch ) {
      this.parentCommit = options.parentBranch.commits.slice( -1 )[ 0 ];
      this.parentBranch = options.parentBranch;
    } else {
      this.parentCommit = null;
      this.parentBranch = null;
    }
    this.name = (typeof options.name === "string") ? options.name : "no-name";
    this.context = this.parent.context;
    this.template = this.parent.template;
    this.lineWidth = options.lineWidth || this.template.branch.lineWidth;
    this.lineDash = options.lineDash || this.template.branch.lineDash;
    this.showLabel = booleanOptionOr( options.showLabel, this.template.branch.showLabel );
    this.spacingX = this.template.branch.spacingX;
    this.spacingY = this.template.branch.spacingY;
    this.size = 0;
    this.height = 0;
    this.width = 0;
    this.commits = [];
    this.path = []; // Path to draw, this is an array of points {x, y, type("start"|"join"|"end")}

    // Column number calculation for auto-color & auto-offset
    if ( typeof options.column === "number" ) {
      this.column = options.column;
    } else {
      this.column = 0;
      this.calculColumn();
    }

    this.parent.columnMax = (this.column > this.parent.columnMax) ? this.column : this.parent.columnMax;

    // Options with auto value
    this.offsetX = this.column * this.spacingX;
    this.offsetY = this.column * this.spacingY;

    // Add start point
    if ( this.parentBranch ) {
      if ( this.parentCommit === this.parentBranch.commits.slice( -1 )[ 0 ] ) {
        this.startPoint = {
          x: this.parentBranch.offsetX - this.parent.commitOffsetX + this.template.commit.spacingX,
          y: this.parentBranch.offsetY - this.parent.commitOffsetY + this.template.commit.spacingY,
          type: "start"
        };
      } else {
        this.startPoint = {
          x: this.parentCommit.x,
          y: this.parentCommit.y,
          type: "start"
        };
      }
    } else {
      this.startPoint = null;
    }

    var columnIndex = (this.column % this.template.colors.length);
    this.color = options.color || this.template.branch.color || this.template.colors[ columnIndex ];

    // Checkout on this new branch
    this.checkout();
  }

  /**
   * Create new branch
   *
   * @param {(String | Object)} options - Branch name | Options of Branch
   *
   * @see Branch
   * @this Branch
   *
   * @return {Branch} New Branch
   **/
  Branch.prototype.branch = function ( options ) {
    // Options
    if ( typeof options === "string" ) {
      var name = options;
      options = {};
      options.name = name;
    }

    options = (typeof options === "object") ? options : {};
    options.parent = this.parent;
    options.parentBranch = options.parentBranch || this;

    // Add branch
    var branch = new Branch( options );
    this.parent.branches.push( branch );

    // Return
    return branch;
  };

  /**
   * Render the branch
   *
   * @this Branch
   **/
  Branch.prototype.render = function () {
    this.context.beginPath();

    for ( var i = 0, point; !!(point = this.path[ i ]); i++ ) {
      if ( point.type === "start" ) {
        this.context.moveTo( point.x, point.y );
      } else {
        if ( this.template.branch.mergeStyle === "bezier" ) {
          var path = this.path[ i - 1 ];

          this.context.bezierCurveTo(
            path.x - this.template.commit.spacingX / 2, path.y - this.template.commit.spacingY / 2,
            point.x + this.template.commit.spacingX / 2, point.y + this.template.commit.spacingY / 2,
            point.x, point.y
          );
        } else {
          this.context.lineTo( point.x, point.y );
        }
      }
    }

    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;

    var prevLineDash;
    if ( this.context.setLineDash !== undefined ) {
      prevLineDash = this.context.getLineDash();
      this.context.setLineDash( this.lineDash );
    }

    this.context.stroke();
    this.context.closePath();

    //Restore previous line dash setting, if any
    if ( prevLineDash !== undefined ) {
      this.context.setLineDash( prevLineDash );
    }
  };

  /**
   * Add a commit
   *
   * @param {(String | Object)} [options] - Message | Options of commit
   * @param {String} [options.detailId] - Id of detail DOM Element
   *
   * @see Commit
   *
   * @this Branch
   **/
  Branch.prototype.commit = function ( options ) {
    if ( typeof (options) === "string" ) {
      options = { message: options };
    } else if ( typeof (options) !== "object" ) {
      options = {};
    }

    options.arrowDisplay = this.template.arrow.active;
    options.branch = this;
    var columnIndex = (this.column % this.template.colors.length);
    options.color = options.color || this.template.commit.color || this.template.colors[ columnIndex ];
    options.parent = this.parent;
    options.parentCommit = options.parentCommit || this.commits.slice( -1 )[ 0 ];

    // Special compact mode
    if ( this.parent.mode === "compact"
         && this.parent.commits.slice( -1 )[ 0 ]
         && this.parent.commits.slice( -1 )[ 0 ].branch !== options.branch
         && options.branch.commits.length
         && options.type !== "mergeCommit" ) {
      this.parent.commitOffsetX -= this.template.commit.spacingX;
      this.parent.commitOffsetY -= this.template.commit.spacingY;
    }

    options.messageColor = options.messageColor || this.template.commit.message.color || options.color || null;
    options.labelColor = options.labelColor || this.template.branch.labelColor || options.color || null;
    options.tagColor = options.tagColor || this.template.commit.tag.color || options.color || null;
    options.dotColor = options.dotColor || this.template.commit.dot.color || options.color || null;
    options.x = this.offsetX - this.parent.commitOffsetX;
    options.y = this.offsetY - this.parent.commitOffsetY;

    // Detail
    var isVertical = this.parent.orientation === "vertical";
    var isNotCompact = this.parent.mode !== "compact";
    if ( typeof options.detailId === "string" && isVertical && isNotCompact ) {
      options.detail = document.getElementById( options.detailId );
    } else {
      options.detail = null;
    }

    // Check collision (Cause of special compact mode)
    var previousCommit = options.branch.commits.slice( -1 )[ 0 ] || {};
    var commitPosition = options.x + options.y;
    var previousCommitPosition = previousCommit.x + previousCommit.y;
    var isCommitAtSamePlaceThanPreviousOne = (commitPosition === previousCommitPosition);

    if ( isCommitAtSamePlaceThanPreviousOne ) {
      this.parent.commitOffsetX += this.template.commit.spacingX;
      this.parent.commitOffsetY += this.template.commit.spacingY;
      options.x = this.offsetX - this.parent.commitOffsetX;
      options.y = this.offsetY - this.parent.commitOffsetY;
    }

    // Fork case: Parent commit from parent branch
    if ( options.parentCommit instanceof Commit === false && this.parentBranch instanceof Branch ) {
      options.parentCommit = this.parentCommit;
    }

    // First commit
    var isFirstBranch = !( options.parentCommit instanceof Commit );
    var isPathBeginning = this.path.length === 0;

    options.showLabel = (isPathBeginning && this.showLabel) ? true : false;

    if ( options.showLabel ) {
      options.x -= this.template.commit.spacingX;
      options.y -= this.template.commit.spacingY;
    }

    var commit = new Commit( options );
    this.commits.push( commit );

    // Add point(s) to path
    var point = {
      x: commit.x,
      y: commit.y,
      type: "join"
    };

    if ( !isFirstBranch && isPathBeginning ) {
      // Start point on parent branch
      this.pushPath( this.startPoint );
      // Move to this branch
      this.pushPath( {
        x: this.startPoint.x - this.parentBranch.offsetX + this.offsetX - this.template.commit.spacingX,
        y: this.startPoint.y - this.parentBranch.offsetY + this.offsetY - this.template.commit.spacingY,
        type: "join"
      } );

      // Extend parent branch
      var parent = JSON.parse( JSON.stringify( this.startPoint ) ); // Elegant way for cloning an object
      parent.type = "join";
      this.parentBranch.pushPath( parent );
    } else if ( isPathBeginning ) {
      point.type = "start";
    }

    // Increment commitOffset for next commit position
    this.pushPath( point );

    this.parent.commitOffsetX += this.template.commit.spacingX * (options.showLabel ? 2 : 1);
    this.parent.commitOffsetY += this.template.commit.spacingY * (options.showLabel ? 2 : 1);

    // Add height of detail div (normal vertical mode only)
    if ( commit.detail !== null ) {
      commit.detail.style.display = "block";
      this.parent.commitOffsetY -= commit.detail.clientHeight - 40;
    }

    // Auto-render
    this.parent.render();

    // Return the main object so we can chain
    return this;
  };

  /**
   * Checkout onto this branch
   *
   * @this Branch
   **/
  Branch.prototype.checkout = function () {
    this.parent.HEAD = this;
  };

  /**
   * Delete this branch
   *
   * @this Branch
   **/
  Branch.prototype.delete = function () {
    this.isfinish = true;
  };

  /**
   * Merge branch
   *
   * @param {Branch} [target = this.parent.HEAD]
   * @param {(String | Object)} [commitOptions] - Message | Options of commit
   *
   * @this Branch
   *
   * @return {Branch} this
   **/
  Branch.prototype.merge = function ( target, commitOptions ) {
    // Merge target
    var targetBranch = target || this.parent.HEAD;

    // Check integrity of target
    if ( targetBranch instanceof Branch === false || targetBranch === this ) {
      return this;
    }

    // Merge commit
    var defaultMessage = "Merge branch `" + this.name + "` into `" + targetBranch.name + "`";
    if ( typeof commitOptions !== "object" ) {
      var message = commitOptions;
      commitOptions = {};
      commitOptions.message = (typeof message === "string") ? message : defaultMessage;
    } else {
      commitOptions.message = commitOptions.message || defaultMessage;
    }
    commitOptions.type = "mergeCommit";
    commitOptions.parentCommit = this.commits.slice( -1 )[ 0 ];

    targetBranch.commit( commitOptions );

    // Add points to path
    var targetCommit = targetBranch.commits.slice( -1 )[ 0 ];
    var endOfBranch = {
      x: this.offsetX + this.template.commit.spacingX * (targetCommit.showLabel ? 3 : 2) - this.parent.commitOffsetX,
      y: this.offsetY + this.template.commit.spacingY * (targetCommit.showLabel ? 3 : 2) - this.parent.commitOffsetY,
      type: "join"
    };
    this.pushPath( JSON.parse( JSON.stringify( endOfBranch ) ) ); // Elegant way for cloning an object

    var mergeCommit = {
      x: targetCommit.x,
      y: targetCommit.y,
      type: "end"
    };
    this.pushPath( mergeCommit );

    endOfBranch.type = "start";
    this.pushPath( endOfBranch ); // End of branch for future commits

    // Auto-render
    this.parent.render();

    // Checkout on target
    this.parent.HEAD = targetBranch;

    // Return the main object so we can chain
    return this;
  };

  /**
   * Calcul column
   *
   * @this Branch
   **/
  Branch.prototype.calculColumn = function () {
    var candidates = [];
    for ( var i = 0, branch; !!(branch = this.parent.branches[ i ]); i++ ) {
      if ( !branch.isfinish ) {
        if ( !( branch.column in candidates ) ) {
          candidates[ branch.column ] = 0;
        }
        candidates[ branch.column ]++;
      }
    }

    this.column = 0;
    for ( ; ; this.column++ ) {
      if ( !( this.column in candidates ) || candidates[ this.column ] === 0 ) {
        break;
      }
    }
  };

  /**
   * Push a new point to path.
   * This method will combine duplicate points and reject reversed points.
   *
   * @this Branch
   */
  Branch.prototype.pushPath = function ( point ) {
    var lastPoint = this.path.slice( -1 )[ 0 ];
    if ( !lastPoint ) {
      this.path.push( point );
    } else if ( lastPoint.x === point.x && lastPoint.y === point.y ) {
      if ( lastPoint.type !== "start" && point.type === "end" ) {
        lastPoint.type = "end";
      } else if ( point.type === "join" ) {

      } else {
        this.path.push( point );
      }
    } else {
      if ( point.type === "join" ) {
        if ( ( point.x - lastPoint.x ) * this.template.commit.spacingX < 0 ) {
          this.path.push( point );
        } else if ( ( point.y - lastPoint.y ) * this.template.commit.spacingY < 0 ) {
          this.path.push( point );
        }
      } else {
        this.path.push( point );
      }
    }
  };

  // --------------------------------------------------------------------
  // -----------------------      Commit         ------------------------
  // --------------------------------------------------------------------

  /**
   * Commit
   *
   * @constructor
   *
   * @param {Object} options - Commit options
   * @param {GitGraph} options.parent - GitGraph constructor
   * @param {Number} options.x - Position X (dot)
   * @param {Number} options.y - Position Y (dot)
   * @param {String} options.color - Master color (dot & message)
   * @param {Boolean} options.arrowDisplay - Add a arrow under commit dot
   * @param {String} [options.author = this.parent.author] - Author name & email
   * @param {String} [options.date] - Date of commit, default is now
   * @param {String} [options.detail] - DOM Element of detail part
   * @param {String} [options.sha1] - Sha1, default is a random short sha1
   * @param {Commit} [options.parentCommit] - Parent commit
   * @param {String} [options.type = ("mergeCommit"|null)] - Type of commit
   *
   * @param {String} [options.tag] - Tag of the commit
   * @param {String} [options.tagColor = options.color] - Specific tag color
   * @param {String} [options.tagFont = this.template.commit.tag.font] - Font of the tag
   * @param {String} [options.displayTagBox = true] - If true, display a box around tag
   *
   * @param {String} [options.dotColor = options.color] - Specific dot color
   * @param {Number} [options.dotSize = this.template.commit.dot.size] - Dot size
   * @param {Number} [options.dotStrokeWidth = this.template.commit.dot.strokeWidth] - Dot stroke width
   * @param {Number} [options.dotStrokeColor = this.template.commit.dot.strokeColor]
   *
   * @param {String} [options.message = "He doesn't like George Michael! Boooo!"] - Commit message
   * @param {String} [options.messageColor = options.color] - Specific message color
   * @param {String} [options.messageFont = this.template.commit.message.font] - Font of the message
   * @param {Boolean} [options.messageDisplay = this.template.commit.message.display] - Commit message display policy
   * @param {Boolean} [options.messageAuthorDisplay = this.template.commit.message.displayAuthor] - Commit message author policy
   * @param {Boolean} [options.messageBranchDisplay = this.template.commit.message.displayBranch] - Commit message author policy
   * @param {Boolean} [options.messageHashDisplay = this.template.commit.message.displayHash] - Commit message hash policy
   *
   * @param {String} [options.labelColor = options.color] - Specific label color
   * @param {String} [options.labelFont = this.template.branch.labelFont] - Font used for labels
   *
   * @param {Boolean} [options.tooltipDisplay = true] - Tooltip message display policy
   * @param {commitCallback} [options.onClick] - OnClick event for the commit dot
   * @param {Object} [options.representedObject] - Any object which is related to this commit. Can be used in onClick or the formatter. Useful to bind the commit to external objects such as database id etc.
   *
   * @this Commit
   **/
  function Commit ( options ) {
    // Check integrity
    if ( options.parent instanceof GitGraph === false ) {
      return;
    }

    // Options
    options = (typeof options === "object") ? options : {};
    this.parent = options.parent;
    this.template = this.parent.template;
    this.context = this.parent.context;
    this.branch = options.branch;
    this.author = options.author || this.parent.author;
    this.date = options.date || new Date().toUTCString();
    this.detail = options.detail || null;
    this.tag = options.tag || null;
    this.tagColor = options.tagColor || options.color;
    this.tagFont = options.tagFont || this.template.commit.tag.font;
    this.displayTagBox = booleanOptionOr( options.displayTagBox, true );
    this.sha1 = options.sha1 || (Math.random( 100 )).toString( 16 ).substring( 3, 10 );
    this.message = options.message || "He doesn't like George Michael! Boooo!";
    this.arrowDisplay = options.arrowDisplay;
    this.messageDisplay = booleanOptionOr( options.messageDisplay, this.template.commit.message.display );
    this.messageAuthorDisplay = booleanOptionOr( options.messageAuthorDisplay, this.template.commit.message.displayAuthor );
    this.messageBranchDisplay = booleanOptionOr( options.messageBranchDisplay, this.template.commit.message.displayBranch );
    this.messageHashDisplay = booleanOptionOr( options.messageHashDisplay, this.template.commit.message.displayHash );
    this.messageColor = options.messageColor || options.color;
    this.messageFont = options.messageFont || this.template.commit.message.font;
    this.dotColor = options.dotColor || options.color;
    this.dotSize = options.dotSize || this.template.commit.dot.size;
    this.dotStrokeWidth = options.dotStrokeWidth || this.template.commit.dot.strokeWidth;
    this.dotStrokeColor = options.dotStrokeColor || this.template.commit.dot.strokeColor || options.color;
    this.type = options.type || null;
    this.tooltipDisplay = booleanOptionOr( options.tooltipDisplay, true );
    this.onClick = options.onClick || null;
    this.representedObject = options.representedObject || null;
    this.parentCommit = options.parentCommit;
    this.x = options.x;
    this.y = options.y;
    this.showLabel = options.showLabel;
    this.labelColor = options.labelColor || options.color;
    this.labelFont = options.labelFont || this.template.branch.labelFont;

    this.parent.commits.push( this );
  }

  /**
   * Render the commit
   *
   * @this Commit
   **/
  Commit.prototype.render = function () {

    // Label
    if ( this.showLabel ) {
      drawTextBG( this.context, this.x + this.template.commit.spacingX, this.y + this.template.commit.spacingY, this.branch.name, this.labelColor, this.labelFont, this.template.branch.labelRotation, true );
    }

    // Dot
    this.context.beginPath();
    this.context.arc( this.x, this.y, this.dotSize, 0, 2 * Math.PI, false );
    this.context.fillStyle = this.dotColor;
    this.context.strokeStyle = this.dotStrokeColor;
    this.context.lineWidth = this.dotStrokeWidth;

    if ( typeof (this.dotStrokeWidth) === "number" ) {
      this.context.stroke();
    }

    this.context.fill();
    this.context.closePath();

    // Arrow
    if ( this.arrowDisplay && this.parentCommit instanceof Commit ) {
      this.arrow();
    }

    // Tag
    var tagWidth = this.template.commit.tag.spacingX;
    if ( this.tag !== null ) {
      this.parent.tagNum++;
      this.context.font = this.tagFont;
      var textWidth = this.context.measureText( this.tag ).width;
      if ( this.template.branch.labelRotation !== 0 ) {
        var textHeight = getFontHeight( this.tagFont );
        drawTextBG( this.context,
          this.x - this.dotSize / 2,
          ((this.parent.columnMax + 1) * this.template.commit.tag.spacingY) - this.template.commit.tag.spacingY / 2 + (this.parent.tagNum % 2) * textHeight * 1.5,
          this.tag, this.tagColor, this.tagFont, 0, this.displayTagBox );
      } else {
        drawTextBG( this.context,
          ((this.parent.columnMax + 1) * this.template.commit.tag.spacingX) - this.template.commit.tag.spacingX / 2 + textWidth / 2,
          this.y - this.dotSize / 2,
          this.tag, this.tagColor, this.tagFont, 0, this.displayTagBox );
      }
      tagWidth = (tagWidth < textWidth) ? textWidth : tagWidth;
    }

    this.context.font = this.messageFont;

    var commitOffsetLeft = (this.parent.columnMax + 1) * this.template.branch.spacingX + tagWidth;

    // Detail
    if ( this.detail !== null ) {
      this.detail.style.left = this.parent.canvas.offsetLeft + commitOffsetLeft + this.x + 30 + "px";
      this.detail.style.top = this.parent.canvas.offsetTop + this.y + 40 + "px";
      this.detail.width = 30;
    }

    // Message
    if ( this.messageDisplay ) {
      var message = this.message;
      if ( this.messageHashDisplay ) {
        message = this.sha1 + " " + message;
      }
      if ( this.messageAuthorDisplay ) {
        message = message + (this.author ? " - " + this.author : "");
      }
      if ( this.messageBranchDisplay ) {
        message = (this.branch.name ? "[" + this.branch.name + "] " : "") + message;
      }

      this.context.fillStyle = this.messageColor;
      this.context.fillText( message, commitOffsetLeft, this.y + this.dotSize / 2 );
    }
  };

  /**
   * Render a arrow before commit
   *
   * @this Commit
   **/
  Commit.prototype.arrow = function Arrow () {
    // Options
    var size = this.template.arrow.size;
    var color = this.template.arrow.color || this.branch.color;
    var isReversed = this.parent.reverseArrow;

    function rotate ( y, x ) {
      var direction = (isReversed) ? -1 : 1;
      return Math.atan2( direction * y, direction * x );
    }

    // Angles calculation
    var alpha = rotate( this.parentCommit.y - this.y, this.parentCommit.x - this.x );

    // Merge & Fork case
    if ( this.type === "mergeCommit" || this === this.branch.commits[ 0 ] /* First commit */ ) {
      var deltaColumn = (this.parentCommit.branch.column - this.branch.column);
      var commitSpaceDelta = (this.showLabel ? 2 : 1);

      var isArrowVertical = (
        isReversed
        && _isVertical( this.parent )
        && Math.abs( this.y - this.parentCommit.y ) > Math.abs( this.template.commit.spacingY )
      ) || (
        _isVertical( this.parent )
        && commitSpaceDelta > 1
      );
      var alphaX = (isArrowVertical)
        ? 0
        : this.template.branch.spacingX * deltaColumn + this.template.commit.spacingX * commitSpaceDelta;

      var isArrowHorizontal = (
        isReversed
        && _isHorizontal( this.parent )
        && Math.abs( this.x - this.parentCommit.x ) > Math.abs( this.template.commit.spacingX )
      ) || (
        _isHorizontal( this.parent )
        && commitSpaceDelta > 1
      );
      var alphaY = (isArrowHorizontal)
        ? 0
        : this.template.branch.spacingY * deltaColumn + this.template.commit.spacingY * commitSpaceDelta;

      alpha = rotate( alphaY, alphaX );
      color = this.parentCommit.branch.color;
    }

    var delta = Math.PI / 7; // Delta between left & right (radian)

    var arrowX = (isReversed) ? this.parentCommit.x : this.x;
    var arrowY = (isReversed) ? this.parentCommit.y : this.y;

    // Top
    var h = this.template.commit.dot.size + this.template.arrow.offset;
    var x1 = h * Math.cos( alpha ) + arrowX;
    var y1 = h * Math.sin( alpha ) + arrowY;

    // Bottom left
    var x2 = (h + size) * Math.cos( alpha - delta ) + arrowX;
    var y2 = (h + size) * Math.sin( alpha - delta ) + arrowY;

    // Bottom center
    var x3 = (h + size / 2) * Math.cos( alpha ) + arrowX;
    var y3 = (h + size / 2) * Math.sin( alpha ) + arrowY;

    // Bottom right
    var x4 = (h + size) * Math.cos( alpha + delta ) + arrowX;
    var y4 = (h + size) * Math.sin( alpha + delta ) + arrowY;

    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.moveTo( x1, y1 ); // Top
    this.context.lineTo( x2, y2 ); // Bottom left
    this.context.quadraticCurveTo( x3, y3, x4, y4 ); // Bottom center
    this.context.lineTo( x4, y4 ); // Bottom right
    this.context.fill();
  };

  // --------------------------------------------------------------------
  // -----------------------      Template       ------------------------
  // --------------------------------------------------------------------

  /**
   * Template
   *
   * @constructor
   *
   * @param {Object} options - Template options
   * @param {Array} [options.colors] - Colors scheme: One color for each column
   * @param {String} [options.arrow.color] - Arrow color
   * @param {Number} [options.arrow.size] - Arrow size
   * @param {Number} [options.arrow.offser] - Arrow offset
   * @param {String} [options.branch.color] - Branch color
   * @param {Number} [options.branch.linewidth] - Branch line width
   * @param {String} [options.branch.mergeStyle = ("bezier"|"straight")] - Branch merge style
   * @param {Number} [options.branch.spacingX] - Space between branches
   * @param {Number} [options.branch.spacingY] - Space between branches
   * @param {Number} [options.commit.spacingX] - Space between commits
   * @param {Number} [options.commit.spacingY] - Space between commits
   * @param {Number} [options.commit.widthExtension = 0]  - Additional width to be added to the calculated width
   * @param {String} [options.commit.color] - Master commit color (dot & message)
   * @param {String} [options.commit.dot.color] - Commit dot color
   * @param {Number} [options.commit.dot.size] - Commit dot size
   * @param {Number} [options.commit.dot.strokeWidth] - Commit dot stroke width
   * @param {Number} [options.commit.dot.strokeColor] - Commit dot stroke color
   * @param {String} [options.commit.message.color] - Commit message color
   * @param {Boolean} [options.commit.message.display] - Commit display policy
   * @param {Boolean} [options.commit.message.displayAuthor] - Commit message author policy
   * @param {Boolean} [options.commit.message.displayBranch] - Commit message branch policy
   * @param {Boolean} [options.commit.message.displayHash] - Commit message hash policy
   * @param {String} [options.commit.message.font = "normal 12pt Calibri"] - Commit message font
   * @param {Boolean} [options.commit.shouldDisplayTooltipsInCompactMode] - Tooltips policy
   * @param {commitCallback} [options.commit.tooltipHTMLFormatter=true] - Formatter for the tooltip contents.
   *
   * @this Template
   **/
  function Template ( options ) {
    // Options
    options = (typeof options === "object") ? options : {};
    options.branch = options.branch || {};
    options.arrow = options.arrow || {};
    options.commit = options.commit || {};
    options.commit.dot = options.commit.dot || {};
    options.commit.tag = options.commit.tag || {};
    options.commit.message = options.commit.message || {};

    // One color per column
    this.colors = options.colors || [ "#6963FF", "#47E8D4", "#6BDB52", "#E84BA5", "#FFA657" ];

    // Branch style
    this.branch = {};
    this.branch.color = options.branch.color || null; // Only one color
    this.branch.lineWidth = options.branch.lineWidth || 2;
    this.branch.lineDash = options.branch.lineDash || [];
    this.branch.showLabel = options.branch.showLabel || false;
    this.branch.labelColor = options.branch.labelColor || null;
    this.branch.labelFont = options.branch.labelFont || "normal 8pt Calibri";
    this.branch.labelRotation = options.branch.labelRotation || 0;

    // Merge style = "bezier" | "straight"
    this.branch.mergeStyle = options.branch.mergeStyle || "bezier";

    // Space between branches
    this.branch.spacingX = (typeof options.branch.spacingX === "number") ? options.branch.spacingX : 20;
    this.branch.spacingY = options.branch.spacingY || 0;

    // Arrow style
    this.arrow = {};
    this.arrow.size = options.arrow.size || null;
    this.arrow.color = options.arrow.color || null;
    this.arrow.active = typeof (this.arrow.size) === "number";
    this.arrow.offset = options.arrow.offset || 2;

    // Commit style
    this.commit = {};
    this.commit.spacingX = options.commit.spacingX || 0;
    this.commit.spacingY = (typeof options.commit.spacingY === "number") ? options.commit.spacingY : 25;
    this.commit.widthExtension = (typeof options.commit.widthExtension === "number") ? options.commit.widthExtension : 0;
    this.commit.tooltipHTMLFormatter = options.commit.tooltipHTMLFormatter || null;
    this.commit.shouldDisplayTooltipsInCompactMode = booleanOptionOr( options.commit.shouldDisplayTooltipsInCompactMode, true );

    // Only one color, if null message takes branch color (full commit)
    this.commit.color = options.commit.color || null;

    this.commit.dot = {};

    // Only one color, if null message takes branch color (only dot)
    this.commit.dot.color = options.commit.dot.color || null;
    this.commit.dot.size = options.commit.dot.size || 3;
    this.commit.dot.strokeWidth = options.commit.dot.strokeWidth || null;
    this.commit.dot.strokeColor = options.commit.dot.strokeColor || null;

    this.commit.tag = {};
    this.commit.tag.color = options.commit.tag.color || this.commit.dot.color;
    this.commit.tag.font = options.commit.tag.font || options.commit.message.font || "normal 10pt Calibri";
    this.commit.tag.spacingX = this.branch.spacingX;
    this.commit.tag.spacingY = this.commit.spacingY;

    this.commit.message = {};
    this.commit.message.display = booleanOptionOr( options.commit.message.display, true );
    this.commit.message.displayAuthor = booleanOptionOr( options.commit.message.displayAuthor, true );
    this.commit.message.displayBranch = booleanOptionOr( options.commit.message.displayBranch, true );
    this.commit.message.displayHash = booleanOptionOr( options.commit.message.displayHash, true );

    // Only one color, if null message takes commit color (only message)
    this.commit.message.color = options.commit.message.color || null;
    this.commit.message.font = options.commit.message.font || "normal 12pt Calibri";
  }

  /**
   * Get a default template from library
   *
   * @param {String} name - Template name
   *
   * @return {Template} [template] - Template if exist
   **/
  Template.prototype.get = function ( name ) {
    var template = {};

    switch ( name ) {
    case "blackarrow":
      template = {
        branch: {
          color: "#000000",
          lineWidth: 4,
          spacingX: 50,
          mergeStyle: "straight"
        },
        commit: {
          spacingY: -60,
          dot: {
            size: 12,
            strokeColor: "#000000",
            strokeWidth: 7
          },
          message: {
            color: "black"
          }
        },
        arrow: {
          size: 16,
          offset: 2.5
        }
      };
      break;

    case "metro":
      /* falls through */
    default:
      template = {
        colors: [ "#979797", "#008fb5", "#f1c109" ],
        branch: {
          lineWidth: 10,
          spacingX: 50
        },
        commit: {
          spacingY: -80,
          dot: {
            size: 14
          },
          message: {
            font: "normal 14pt Arial"
          }
        }
      };
      break;
    }

    return new Template( template );
  };

  // --------------------------------------------------------------------
  // -----------------------      Utilities       -----------------------
  // --------------------------------------------------------------------

  var getFontHeight = function ( font ) {
    var body = document.getElementsByTagName( "body" )[ 0 ];
    var dummy = document.createElement( "div" );
    var dummyText = document.createTextNode( "Mg" );
    dummy.appendChild( dummyText );
    dummy.setAttribute( "style", "font: " + font + ";" );
    body.appendChild( dummy );
    var result = dummy.offsetHeight;
    body.removeChild( dummy );
    return result;
  };

  function booleanOptionOr ( booleanOption, defaultOption ) {
    return (typeof booleanOption === "boolean") ? booleanOption : defaultOption;
  }

  function drawTextBG ( context, x, y, text, color, font, angle, useStroke ) {
    context.save();
    context.translate( x, y );
    context.rotate( angle * (Math.PI / 180) );
    context.textAlign = "center";

    context.font = font;
    var width = context.measureText( text ).width;
    var height = getFontHeight( font );

    if ( useStroke ) {
      context.beginPath();
      context.rect( -(width / 2) - 4, -(height / 2) + 2, width + 8, height + 2 );
      context.fillStyle = color;
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.stroke();

      context.fillStyle = "black";
    } else {
      context.fillStyle = color;
    }

    context.fillText( text, 0, height / 2 );
    context.restore();
  }

  // Expose GitGraph object
  window.GitGraph = GitGraph;
  window.GitGraph.Branch = Branch;
  window.GitGraph.Commit = Commit;
  window.GitGraph.Template = Template;
})();
