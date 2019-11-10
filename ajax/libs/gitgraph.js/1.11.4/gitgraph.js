/* ==========================================================
 *                  GitGraph v1.11.4
 *      https://github.com/nicoespeon/gitgraph.js
 * ==========================================================
 * Copyright (c) 2017 Nicolas CARLO (@nicoespeon) ٩(^‿^)۶
 * Copyright (c) 2017 Fabien BERNARD (@fabien0102) ✌(✰‿✰)✌
 *
 * GitGraph.js may be freely distributed under the MIT Licence
 * ========================================================== */

(function () {
  "use strict";

  /**
   * GitGraph
   *
   * @constructor
   *
   * @param {object} [options] - GitGraph options
   * @param {string} [options.elementId = "gitGraph"] - Id of the canvas container
   * @param {Template|string|object} [options.template] - Template of the graph
   * @param {string} [options.author = "Sergio Flores <saxo-guy@epic.com>"] - Default author for commits
   * @param {string} [options.mode = (null|"compact")]  - Display mode
   * @param {HTMLElement} [options.canvas] - DOM canvas (ex: document.getElementById("id"))
   * @param {string} [options.orientation = ("vertical-reverse"|"horizontal"|"horizontal-reverse")] - Graph orientation
   * @param {boolean} [options.reverseArrow = false] - Make arrows point to ancestors if true
   * @param {number} [options.initCommitOffsetX = 0] - Add custom offsetX to initial commit.
   * @param {number} [options.initCommitOffsetY = 0] - Add custom offsetY to initial commit.
   * @param {HTMLElement} [options.tooltipContainer = document.body] - HTML Element containing tooltips in compact mode.
   *
   * @this GitGraph
   **/
  function GitGraph(options) {
    // Options
    options = _isObject(options) ? options : {};
    this.elementId = (typeof options.elementId === "string") ? options.elementId : "gitGraph";
    this.author = (typeof options.author === "string") ? options.author : "Sergio Flores <saxo-guy@epic.com>";
    this.reverseArrow = _booleanOptionOr(options.reverseArrow, false);

    // Template management
    if ((typeof options.template === "string") || _isObject(options.template)) {
      this.template = this.newTemplate(options.template);
    } else if (options.template instanceof Template) {
      this.template = options.template;
    } else {
      this.template = this.newTemplate("metro");
    }

    this.mode = options.mode || null;
    if (this.mode === "compact") {
      this.template.commit.message.display = false;
    }

    // Orientation
    switch (options.orientation) {
      case "vertical-reverse":
        this.template.commit.spacingY *= -1;
        this.orientation = "vertical-reverse";
        this.template.branch.labelRotation = _isNullOrUndefined(options, "template.branch.labelRotation") ?
          0 : options.template.branch.labelRotation;
        this.template.commit.tag.spacingY *= -1;
        break;
      case "horizontal":
        this.template.commit.message.display = false;
        this.template.commit.spacingX = this.template.commit.spacingY;
        this.template.branch.spacingY = this.template.branch.spacingX;
        this.template.commit.spacingY = 0;
        this.template.branch.spacingX = 0;
        this.orientation = "horizontal";
        this.template.branch.labelRotation = _isNullOrUndefined(options, "template.branch.labelRotation") ?
          -90 : options.template.branch.labelRotation;
        this.template.commit.tag.spacingX = -this.template.commit.spacingX;
        this.template.commit.tag.spacingY = this.template.branch.spacingY;
        break;
      case "horizontal-reverse":
        this.template.commit.message.display = false;
        this.template.commit.spacingX = -this.template.commit.spacingY;
        this.template.branch.spacingY = this.template.branch.spacingX;
        this.template.commit.spacingY = 0;
        this.template.branch.spacingX = 0;
        this.orientation = "horizontal-reverse";
        this.template.branch.labelRotation = _isNullOrUndefined(options, "template.branch.labelRotation") ?
          90 : options.template.branch.labelRotation;
        this.template.commit.tag.spacingX = -this.template.commit.spacingY;
        this.template.commit.tag.spacingY = this.template.branch.spacingY;
        break;
      default:
        this.orientation = "vertical";
        this.template.branch.labelRotation = _isNullOrUndefined(options, "template.branch.labelRotation") ?
          0 : options.template.branch.labelRotation;
        break;
    }

    this.marginX = this.template.branch.spacingX + this.template.commit.dot.size * 2;
    this.marginY = this.template.branch.spacingY + this.template.commit.dot.size * 2;
    this.offsetX = 0;
    this.offsetY = 0;

    // Canvas init
    this.canvas = document.getElementById(this.elementId) || options.canvas;
    this.context = this.canvas.getContext("2d");
    this.context.textBaseline = "center";

    // Tooltip layer
    this.tooltip = document.createElement("div");
    this.tooltip.className = "gitgraph-tooltip";
    this.tooltip.style.position = "fixed";
    this.tooltip.style.display = "none";
    var tooltipContainer = options.tooltipContainer || document.body;
    tooltipContainer.appendChild(this.tooltip);

    // Navigation vars
    this.HEAD = null;
    this.branches = [];
    this.commits = [];

    // Utilities
    this.columnMax = 0; // nb of column for message position
    this.commitOffsetX = options.initCommitOffsetX || 0;
    this.commitOffsetY = options.initCommitOffsetY || 0;

    // Bindings
    this.mouseMoveOptions = {
      handleEvent: this.hover,
      gitgraph: this
    };
    this.canvas.addEventListener("mousemove", this.mouseMoveOptions, false);

    this.mouseDownOptions = {
      handleEvent: this.click,
      gitgraph: this
    };
    this.canvas.addEventListener("mousedown", this.mouseDownOptions, false);

    // Render on window resize
    window.onresize = this.render.bind(this);
  }

  /**
   * Disposing canvas event handlers
   *
   * @this GitGraph
   **/
  GitGraph.prototype.dispose = function () {
    this.canvas.removeEventListener("mousemove", this.mouseMoveOptions, false);
    this.canvas.removeEventListener("mousedown", this.mouseDownOptions, false);
  };

  /**
   * Create new branch
   *
   * @param {(string|object)} options - Branch name | Options of Branch
   *
   * @see Branch
   * @this GitGraph
   *
   * @return {Branch} New branch
   **/
  GitGraph.prototype.branch = function (options) {
    // Options
    if (typeof options === "string") {
      var name = options;
      options = {};
      options.name = name;
    }

    options = _isObject(options) ? options : {};
    options.parent = this;
    options.parentBranch = options.parentBranch || this.HEAD;

    // Add branch
    var branch = new Branch(options);
    this.branches.push(branch);

    // Return
    return branch;
  };

  /**
   * Create new orphan branch
   *
   * @param {(string|object)} options - Branch name | Options of Branch
   *
   * @see Branch
   * @this GitGraph
   *
   * @return {Branch} New branch
   **/
  GitGraph.prototype.orphanBranch = function (options) {
    // Options
    if (typeof options === "string") {
      var name = options;
      options = {};
      options.name = name;
    }

    options = _isObject(options) ? options : {};
    options.parent = this;

    // Add branch
    var branch = new Branch(options);
    this.branches.push(branch);

    // Return
    return branch;
  };

  /**
   * Commit on HEAD
   *
   * @param {(string|BranchCommitOptions)} options - Message | Options of commit
   *
   * @see Commit
   * @this GitGraph
   *
   * @return {GitGraph} this - Return the main object so we can chain
   **/
  GitGraph.prototype.commit = function (options) {
    this.HEAD.commit(options);

    // Return the main object so we can chain
    return this;
  };

  /**
   * Tag the HEAD
   *
   * @param {object} options - Options of tag
   *
   * @see Tag
   * @this GitGraph
   *
   * @return {GitGraph} this - Return the main object so we can chain
   **/
  GitGraph.prototype.tag = function (options) {
    this.HEAD.tag(options);

    // Return the main object so we can chain
    return this;
  };

  /**
   * Create a new template
   *
   * @param {(string|object)} options - The template name, or the template options
   *
   * @see Template
   * @this GitGraph
   *
   * @return {Template}
   **/
  GitGraph.prototype.newTemplate = function (options) {
    if (typeof options === "string") {
      return new Template().get(options);
    }
    return new Template(options);
  };

  /**
   * Render the canvas
   *
   * @this GitGraph
   **/
  GitGraph.prototype.render = function () {
    this.scalingFactor = _getScale(this.context);

    // Resize canvas
    var unscaledResolution = {
      x: Math.abs((this.columnMax + 1) * this.template.branch.spacingX) +
      Math.abs(this.commitOffsetX) +
      this.marginX * 2,
      y: Math.abs((this.columnMax + 1) * this.template.branch.spacingY) +
      Math.abs(this.commitOffsetY) +
      this.marginY * 2
    };

    if (this.template.commit.message.display) {
      unscaledResolution.x += 800;
    }

    unscaledResolution.x += this.template.commit.widthExtension;

    this.canvas.style.width = unscaledResolution.x + "px";
    this.canvas.style.height = unscaledResolution.y + "px";

    this.canvas.width = unscaledResolution.x * this.scalingFactor;
    this.canvas.height = unscaledResolution.y * this.scalingFactor;

    // Clear All
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Add some margin
    this.context.translate(this.marginX, this.marginY);

    // Translate for inverse orientation
    if (this.template.commit.spacingY > 0) {
      this.context.translate(0, this.canvas.height - this.marginY * 2);
      this.offsetY = this.canvas.height - this.marginY * 2;
    }
    if (this.template.commit.spacingX > 0) {
      this.context.translate(this.canvas.width - this.marginX * 2, 0);
      this.offsetX = this.canvas.width - this.marginX * 2;
    }

    // Scale the context when every transformations have been made.
    this.context.scale(this.scalingFactor, this.scalingFactor);

    // Render branches
    for (var i = this.branches.length - 1, branch; !!(branch = this.branches[i]); i--) {
      branch.render();
    }

    // Render commits after to put them on the foreground
    for (var j = 0, commit; !!(commit = this.commits[j]); j++) {
      commit.render();
    }

    _emitEvent(this.canvas, "graph:render", {
      id: this.elementId
    });
  };

  /**
   * A callback for each commit
   *
   * @callback CommitCallback
   * @param {Commit} commit - A commit
   * @param {boolean} mouseOver - True, if the mouse is currently hovering over the commit
   * @param {Event} event - The DOM event (e.g. a click event)
   */

  /**
   * A formatter for commit
   *
   * @callback CommitFormatter
   * @param {Commit} commit - The commit to format
   */

  /**
   * Hover event on commit dot
   *
   * @param {MouseEvent} event - Mouse event
   * @param {CommitCallback} callbackFn - A callback function that will be called for each commit
   *
   * @this GitGraph
   **/
  GitGraph.prototype.applyCommits = function (event, callbackFn) {
    // Fallback onto layerX/layerY for older versions of Firefox.
    function getOffsetById(id) {
      var el = document.getElementById(id);
      var rect = el.getBoundingClientRect();

      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    }

    var offsetX = event.offsetX || (event.pageX - getOffsetById(this.elementId).left);
    var offsetY = event.offsetY || (event.pageY - getOffsetById(this.elementId).top);

    for (var i = 0, commit; !!(commit = this.commits[i]); i++) {
      var distanceX = (commit.x + (this.offsetX + this.marginX) / this.scalingFactor - offsetX);
      var distanceY = (commit.y + (this.offsetY + this.marginY) / this.scalingFactor - offsetY);
      var distanceBetweenCommitCenterAndMouse = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
      var isOverCommit = distanceBetweenCommitCenterAndMouse < this.template.commit.dot.size;

      callbackFn(commit, isOverCommit, event);
    }
  };

  /**
   * Hover event on commit dot
   *
   * @param {MouseEvent} event - Mouse event
   *
   * @this GitGraph
   **/
  GitGraph.prototype.hover = function (event) {
    var self = this.gitgraph;
    var isOut = true;

    function showCommitTooltip(commit) {
      if (!commit.tooltipDisplay) {
        return;
      }

      self.tooltip.style.left = event.clientX + "px"; // TODO Scroll bug
      self.tooltip.style.top = event.clientY + "px"; // TODO Scroll bug
      if (self.template.commit.tooltipHTMLFormatter !== null) {
        self.tooltip.innerHTML = self.template.commit.tooltipHTMLFormatter(commit);
      } else {
        self.tooltip.textContent = commit.sha1 + " - " + commit.message;
      }
      self.tooltip.style.display = "block";
    }

    function emitCommitEvent(commit, event) {
      var mouseEventOptions = {
        author: commit.author,
        message: commit.message,
        date: commit.date,
        sha1: commit.sha1
      };

      _emitEvent(self.canvas, "commit:" + event, mouseEventOptions);
    }

    self.applyCommits(event, function (commit, isOverCommit, event) {
      if (isOverCommit) {
        if (!self.template.commit.message.display && self.template.commit.shouldDisplayTooltipsInCompactMode) {
          showCommitTooltip(commit);
        }

        // Don't emit event if we already were over a commit.
        if (!commit.isMouseOver) {
          emitCommitEvent(commit, "mouseover");
        }

        isOut = false;
        commit.isMouseOver = true;
      } else {
        // Don't emit event if we already were out of a commit.
        if (commit.isMouseOver) {
          emitCommitEvent(commit, "mouseout");
        }
        commit.isMouseOver = false;
      }
    });

    if (isOut) {
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
  GitGraph.prototype.click = function (event) {
    this.gitgraph.applyCommits(event, function (commit, isOverCommit, event) {
      if (!isOverCommit) {
        return;
      }

      if (commit.onClick !== null) {
        commit.onClick(commit, true, event);
      }
    });
  };

  // --------------------------------------------------------------------
  // -----------------------      Branch         ------------------------
  // --------------------------------------------------------------------

  /**
   * Branch
   *
   * @constructor
   *
   * @param {object} options - Options of branch
   * @param {GitGraph} options.parent - GitGraph constructor
   * @param {Branch} [options.parentBranch = options.parentCommit.branch] - Parent branch
   * @param {Commit} [options.parentCommit = _getLast(options.parentBranch.commits)] - Parent commit
   * @param {string} [options.name = "no-name"] - Branch name
   * @param {number[]} [options.lineDash = this.template.branch.lineDash] - Branch line dash segments
   * @param {object} [options.commitDefaultOptions = {}] - Default options for commits
   *
   * @this Branch
   **/
  function Branch(options) {
    // Check integrity
    if (options.parent instanceof GitGraph === false) {
      return;
    }

    // Options
    options = _isObject(options) ? options : {};
    this.parent = options.parent;
    if (options.parentCommit && options.parentBranch) {
      if (options.parentCommit.branch !== options.parentBranch) {
        return;
      }
      this.parentCommit = options.parentCommit;
      this.parentBranch = options.parentBranch;
    } else if (options.parentCommit) {
      this.parentCommit = options.parentCommit;
      this.parentBranch = options.parentCommit.branch;
    } else if (options.parentBranch) {
      this.parentCommit = _getParentCommitFromBranch(options.parentBranch);
      this.parentBranch = options.parentBranch;
    } else {
      this.parentCommit = null;
      this.parentBranch = null;
    }
    this.name = (typeof options.name === "string") ? options.name : "no-name";
    this.commitDefaultOptions = _isObject(options.commitDefaultOptions) ? options.commitDefaultOptions : {};
    this.context = this.parent.context;
    this.template = this.parent.template;
    this.lineWidth = options.lineWidth || this.template.branch.lineWidth;
    this.lineDash = options.lineDash || this.template.branch.lineDash;
    this.showLabel = _booleanOptionOr(options.showLabel, this.template.branch.showLabel);
    this.spacingX = this.template.branch.spacingX;
    this.spacingY = this.template.branch.spacingY;
    this.size = 0;
    this.height = 0;
    this.width = 0;
    this.commits = [];
    this.path = []; // Path to draw, this is an array of points {x, y, type("start"|"joint"|"end")}

    // Column number calculation for auto-color & auto-offset
    if (typeof options.column === "number") {
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
    if (this.parentBranch && this.parentCommit) {
      if (this.parentCommit === _getParentCommitFromBranch(this.parentBranch) && this.commits.length > 0) {
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
    this.color = options.color || this.template.branch.color || this.template.colors[columnIndex];

    // Checkout on this new branch
    this.checkout();
  }

  /**
   * Create new branch
   *
   * @param {(string|object)} options - Branch name | Options of Branch
   *
   * @see Branch
   * @this Branch
   *
   * @return {Branch} New Branch
   **/
  Branch.prototype.branch = function (options) {
    // Options
    if (typeof options === "string") {
      var name = options;
      options = {};
      options.name = name;
    }

    options = _isObject(options) ? options : {};
    options.parent = this.parent;
    options.parentBranch = options.parentBranch || this;

    // Add branch
    var branch = new Branch(options);
    this.parent.branches.push(branch);

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

    for (var i = 0, point; !!(point = this.path[i]); i++) {
      if (point.type === "start") {
        this.context.moveTo(point.x, point.y);
      } else {
        if (this.template.branch.mergeStyle === "bezier") {
          var path = this.path[i - 1];

          this.context.bezierCurveTo(
            path.x - this.template.commit.spacingX / 2, path.y - this.template.commit.spacingY / 2,
            point.x + this.template.commit.spacingX / 2, point.y + this.template.commit.spacingY / 2,
            point.x, point.y
          );
        } else {
          this.context.lineTo(point.x, point.y);
        }
      }
    }

    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;

    if (typeof this.context.setLineDash === "function") {
      this.context.setLineDash(this.lineDash);
    }

    this.context.stroke();
    this.context.closePath();
  };

  /**
   * Branch commit options
   *
   * @typedef {object} BranchCommitOptions
   *
   * @property {string} [color] - Master color (dot & message)
   * @property {string} [author = this.parent.author] - Author name & email
   * @property {string} [date] - Date of commit, default is now
   * @property {string} [detail] - DOM Element of detail part
   * @property {string} [sha1] - Sha1, default is a random short sha1
   * @property {Commit} [parentCommit] - Parent commit
   * @property {string} [type = ("mergeCommit"|null)] - Type of commit
   *
   * @property {string} [tag] - Tag of the commit
   * @property {string} [tagColor = color] - Color of the tag
   * @property {string} [tagFont = this.template.commit.tag.font] - Font of the tag
   * @property {string} [displayTagBox = true] - If true, display a box around the tag
   *
   * @property {string} [dotColor = color] - Specific dot color
   * @property {number} [dotSize = this.template.commit.dot.size] - Dot size
   * @property {number} [dotStrokeWidth = this.template.commit.dot.strokeWidth] - Dot stroke width
   * @property {string} [dotStrokeColor = this.template.commit.dot.strokeColor]
   *
   * @property {string} [message = "He doesn't like George Michael! Boooo!"] - Commit message
   * @property {string} [messageColor = color] - Specific message color
   * @property {string} [messageFont = this.template.commit.message.font] - Font of the message
   * @property {boolean} [messageDisplay = this.template.commit.message.display] - Commit message display policy
   * @property {boolean} [messageAuthorDisplay = this.template.commit.message.displayAuthor] - Commit message author policy
   * @property {boolean} [messageBranchDisplay = this.template.commit.message.displayBranch] - Commit message author policy
   * @property {boolean} [messageHashDisplay = this.template.commit.message.displayHash] - Commit message hash policy
   *
   * @property {string} [labelColor = color] - Specific label color
   * @property {string} [labelFont = this.template.branch.labelFont] - Font used for labels
   *
   * @property {boolean} [tooltipDisplay = true] - Tooltip message display policy
   * @property {CommitCallback} [onClick] - OnClick event for the commit dot
   * @property {object} [representedObject] - Any object which is related to this commit. Can be used in onClick or the formatter. Useful to bind the commit to external objects such as database id etc.
   **/
  /**
   * Add a commit
   *
   * @param {(string|BranchCommitOptions)} [options] - Message | Options of commit
   * @param {string} [options.detailId] - Id of detail DOM Element
   *
   * @see Commit
   *
   * @this Branch
   **/
  Branch.prototype.commit = function (options) {
    if (typeof (options) === "string") {
      options = {
        message: options
      };
    } else if (typeof (options) !== "object") {
      options = {};
    }

    options.arrowDisplay = this.template.arrow.active;
    options.branch = this;
    var columnIndex = (this.column % this.template.colors.length);
    options.color = options.color ||
      this.commitDefaultOptions.color ||
      this.template.commit.color ||
      this.template.colors[columnIndex];
    options.parent = this.parent;

    // Set parentCommit
    // If there is commit in this branch, set parentCommit to last commit of this branch
    // otherwise, set parentCommit to this.parentCommit, the start point of this branch
    if (!options.parentCommit) {
      options.parentCommit = _getLast(this.commits) || this.parentCommit;
    }

    // Special compact mode
    if (this.parent.mode === "compact" &&
      _getLast(this.parent.commits) &&
      _getLast(this.parent.commits).branch !== options.branch &&
      options.branch.commits.length &&
      options.type !== "mergeCommit") {
      this.parent.commitOffsetX -= this.template.commit.spacingX;
      this.parent.commitOffsetY -= this.template.commit.spacingY;
    }

    options.messageColor = options.messageColor ||
      this.commitDefaultOptions.messageColor ||
      this.template.commit.message.color ||
      options.color ||
      null;
    options.labelColor = options.labelColor ||
      this.commitDefaultOptions.labelColor ||
      this.template.branch.labelColor ||
      options.color ||
      null;
    options.tagColor = options.tagColor ||
      this.commitDefaultOptions.tagColor ||
      this.template.commit.tag.color ||
      options.color ||
      null;
    options.dotColor = options.dotColor ||
      this.commitDefaultOptions.dotColor ||
      this.template.commit.dot.color ||
      options.color ||
      null;
    options.x = this.offsetX - this.parent.commitOffsetX;
    options.y = this.offsetY - this.parent.commitOffsetY;

    // Detail
    var isCompact = (this.parent.mode === "compact");
    if (typeof options.detailId === "string" && !isCompact) {
      options.detail = document.getElementById(options.detailId);
    } else {
      options.detail = null;
    }

    // Check collision (Cause of special compact mode)
    var previousCommit = _getLast(options.branch.commits) || {};
    var commitPosition = options.x + options.y;
    var previousCommitPosition = previousCommit.x + previousCommit.y;
    var isCommitAtSamePlaceThanPreviousOne = (commitPosition === previousCommitPosition);

    if (isCommitAtSamePlaceThanPreviousOne) {
      this.parent.commitOffsetX += this.template.commit.spacingX;
      this.parent.commitOffsetY += this.template.commit.spacingY;
      options.x = this.offsetX - this.parent.commitOffsetX;
      options.y = this.offsetY - this.parent.commitOffsetY;
    }

    // First commit
    var isFirstBranch = !(options.parentCommit instanceof Commit);
    var isPathBeginning = this.path.length === 0;

    options.showLabel = (isPathBeginning && this.showLabel);
    if (options.showLabel) {
      options.x -= this.template.commit.spacingX;
      options.y -= this.template.commit.spacingY;
    }

    var commit = new Commit(options);
    this.commits.push(commit);

    // Add point(s) to path
    var point = {
      x: commit.x,
      y: commit.y,
      type: "joint"
    };

    if (!isFirstBranch && isPathBeginning) {
      this.pushPath(this.startPoint);
      // Add a path joint to startpoint + template spacing
      // So that line will not go through commit of other branches
      if (_isVertical(this.parent)) {
        this.pushPath({
          x: commit.x,
          y: this.startPoint.y - this.template.commit.spacingY,
          type: "joint"
        });
      } else {
        this.pushPath({
          x: this.startPoint.x - this.template.commit.spacingX,
          y: commit.y,
          type: "joint"
        });
      }
    } else if (isPathBeginning) {
      point.type = "start";
    }

    this.pushPath(point);

    // Increment commitOffset for next commit position
    this.parent.commitOffsetX += this.template.commit.spacingX * (options.showLabel ? 2 : 1);
    this.parent.commitOffsetY += this.template.commit.spacingY * (options.showLabel ? 2 : 1);

    // Add height of detail div (vertical mode only)
    if (commit.detail !== null && _isVertical(this.parent)) {
      commit.detail.style.display = "block";

      if (this.parent.orientation === "vertical-reverse") {
        this.parent.commitOffsetY += commit.detail.clientHeight;
      } else {
        this.parent.commitOffsetY -= commit.detail.clientHeight;
      }
    }

    // Auto-render
    this.parent.render();

    // Return the main object so we can chain
    return this;
  };

  /**
   * Tag the last commit of the branch.
   *
   * @param {(string|object)} [options] - Message | Options of the tag
   * @param {string} [options.tag] - Message of the tag
   * @param {string} [options.tagColor] - Color of the tag
   * @param {string} [options.tagFont] - Font of the tag
   * @param {boolean} [options.displayTagBox] - If true, display a box around the tag
   *
   * @see Tag
   *
   * @this Branch
   * */
  Branch.prototype.tag = function (options) {
    if (typeof options === "string") {
      options = {
        tag: options
      };
    }

    options = _isObject(options) ? options : {};

    var lastCommit = _getLast(this.commits);
    if (_isObject(lastCommit)) {
      _assignTagOptionsToCommit(lastCommit, options);
      this.parent.render();
    }

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
    this.isDeleted = true;
  };

  /**
   * Merge branch
   *
   * @param {Branch} [target = this.parent.HEAD]
   * @param {(string|object)} [commitOptions] - Message | Options of commit
   * @param {boolean} [commitOptions.fastForward = false] - If true, merge should use fast-forward if possible
   *
   * @see Commit
   * @this Branch
   *
   * @return {Branch} this
   **/
  Branch.prototype.merge = function (target, commitOptions) {
    // Merge target
    var targetBranch = target || this.parent.HEAD;

    // Check integrity of target
    if (targetBranch instanceof Branch === false || targetBranch === this) {
      return this;
    }

    var firstBranchCommit = this.commits[0];
    if (!firstBranchCommit) {
      console.log(this.name + " is already up-to-date with " + targetBranch.name);
      return this;
    }

    // Merge commit
    var defaultMessage = "Merge branch `" + this.name + "` into `" + targetBranch.name + "`";
    if (typeof commitOptions !== "object") {
      var message = commitOptions;
      commitOptions = {};
      commitOptions.message = (typeof message === "string") ? message : defaultMessage;
    } else {
      commitOptions.message = commitOptions.message || defaultMessage;
    }
    commitOptions.type = "mergeCommit";
    commitOptions.parentCommit = _getParentCommitFromBranch(this);

    var branchParentCommit = firstBranchCommit.parentCommit;
    var targetBranchParentCommit = _getParentCommitFromBranch(targetBranch);
    var isFastForwardPossible = (branchParentCommit && branchParentCommit.sha1 === targetBranchParentCommit.sha1);
    if (commitOptions.fastForward && isFastForwardPossible) {
      var isGraphHorizontal = _isHorizontal(this.parent);
      this.color = targetBranch.color;

      // Make branch path follow target branch ones
      if (isGraphHorizontal) {
        var targetBranchY = targetBranch.path[1].y;
        this.path.forEach(function (point) {
          point.y = targetBranchY;
        });
      } else {
        var targetBranchX = targetBranch.path[1].x;
        this.path.forEach(function (point) {
          point.x = targetBranchX;
        });
      }

      this.commits.forEach(function (commit) {
        if (isGraphHorizontal) {
          commit.y = branchParentCommit.y;
        } else {
          commit.x = branchParentCommit.x;
        }

        commit.labelColor = branchParentCommit.labelColor;
        commit.messageColor = branchParentCommit.messageColor;
        commit.dotColor = branchParentCommit.dotColor;
        commit.dotStrokeColor = branchParentCommit.dotStrokeColor;
      });
    } else {
      targetBranch.commit(commitOptions);

      var detailOffsetY = 0;

      if (commitOptions.detail) {
        if (this.parent.orientation === "vertical") {
          detailOffsetY = -1 * commitOptions.detail.clientHeight;
        } else if (this.parent.orientation === "vertical-reverse") {
          detailOffsetY = commitOptions.detail.clientHeight;
        }
      }

      // Add points to path
      var targetCommit = _getLast(targetBranch.commits);
      var endOfBranch = {
        x: this.offsetX + this.template.commit.spacingX * (targetCommit.showLabel ? 3 : 2) - this.parent.commitOffsetX,
        y: this.offsetY + this.template.commit.spacingY * (targetCommit.showLabel ? 3 : 2) - this.parent.commitOffsetY + detailOffsetY,
        type: "joint"
      };
      this.pushPath(_clone(endOfBranch));

      var mergeCommit = {
        x: targetCommit.x,
        y: targetCommit.y,
        type: "end"
      };
      this.pushPath(mergeCommit);

      endOfBranch.type = "start";
      this.pushPath(endOfBranch); // End of branch for future commits
    }

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
    for (var i = 0, branch; !!(branch = this.parent.branches[i]); i++) {
      if (!branch.isDeleted) {
        if (!(branch.column in candidates)) {
          candidates[branch.column] = 0;
        }
        candidates[branch.column]++;
      }
    }

    this.column = 0;
    for (; ; this.column++) {
      if (!(this.column in candidates) || candidates[this.column] === 0) {
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
  Branch.prototype.pushPath = function (point) {
    var lastPoint = _getLast(this.path);
    if (!lastPoint) {
      this.path.push(point);
    } else if (lastPoint.x === point.x && lastPoint.y === point.y) {
      if (lastPoint.type !== "start" && point.type === "end") {
        lastPoint.type = "end";
      } else if (point.type === "joint") {

      } else {
        this.path.push(point);
      }
    } else {
      if (point.type === "joint") {
        if ((point.x - lastPoint.x) * this.template.commit.spacingX < 0) {
          this.path.push(point);
        } else if ((point.y - lastPoint.y) * this.template.commit.spacingY < 0) {
          this.path.push(point);
        }
      } else {
        this.path.push(point);
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
   * @param {object} options - Commit options
   * @param {GitGraph} options.parent - GitGraph constructor
   * @param {number} options.x - Position X (dot)
   * @param {number} options.y - Position Y (dot)
   * @param {string} options.color - Master color (dot & message)
   * @param {boolean} options.arrowDisplay - Add a arrow under commit dot
   * @param {string} [options.author = this.parent.author] - Author name & email
   * @param {string} [options.date] - Date of commit, default is now
   * @param {string} [options.detail] - DOM Element of detail part
   * @param {string} [options.sha1] - Sha1, default is a random short sha1
   * @param {Commit} [options.parentCommit] - Parent commit
   * @param {string} [options.type = ("mergeCommit"|null)] - Type of commit
   *
   * @param {string} [options.tag] - Tag of the commit
   * @param {string} [options.tagColor = options.color] - Color of the tag
   * @param {string} [options.tagFont = this.template.commit.tag.font] - Font of the tag
   * @param {string} [options.displayTagBox = true] - If true, display a box around the tag
   *
   * @param {string} [options.dotColor = options.color] - Specific dot color
   * @param {number} [options.dotSize = this.template.commit.dot.size] - Dot size
   * @param {number} [options.dotStrokeWidth = this.template.commit.dot.strokeWidth] - Dot stroke width
   * @param {string} [options.dotStrokeColor = this.template.commit.dot.strokeColor]
   * @param {number[]} [options.lineDash = this.template.commit.dot.lineDash]
   *
   * @param {string} [options.message = "He doesn't like George Michael! Boooo!"] - Commit message
   * @param {string} [options.messageColor = options.color] - Specific message color
   * @param {string} [options.messageFont = this.template.commit.message.font] - Font of the message
   * @param {boolean} [options.messageDisplay = this.template.commit.message.display] - Commit message display policy
   * @param {boolean} [options.messageAuthorDisplay = this.template.commit.message.displayAuthor] - Commit message author policy
   * @param {boolean} [options.messageBranchDisplay = this.template.commit.message.displayBranch] - Commit message author policy
   * @param {boolean} [options.messageHashDisplay = this.template.commit.message.displayHash] - Commit message hash policy
   *
   * @param {string} [options.labelColor = options.color] - Specific label color
   * @param {string} [options.labelFont = this.template.branch.labelFont] - Font used for labels
   *
   * @param {boolean} [options.tooltipDisplay = true] - Tooltip message display policy
   * @param {CommitCallback} [options.onClick] - OnClick event for the commit dot
   * @param {object} [options.representedObject] - Any object which is related to this commit. Can be used in onClick or the formatter. Useful to bind the commit to external objects such as database id etc.
   *
   * @this Commit
   **/
  function Commit(options) {
    // Check integrity
    if (options.parent instanceof GitGraph === false) {
      return;
    }

    // Options
    options = _isObject(options) ? options : {};
    this.parent = options.parent;
    this.template = this.parent.template;
    this.context = this.parent.context;
    this.branch = options.branch;
    this.author = options.author || this.parent.author;
    this.date = options.date || new Date().toUTCString();
    this.detail = options.detail || null;
    this.sha1 = options.sha1 || (Math.random(100)).toString(16).substring(3, 10);
    this.message = options.message || "He doesn't like George Michael! Boooo!";
    this.arrowDisplay = options.arrowDisplay;
    this.messageDisplay = _booleanOptionOr(options.messageDisplay, this.template.commit.message.display);
    this.messageAuthorDisplay = _booleanOptionOr(options.messageAuthorDisplay, this.template.commit.message.displayAuthor);
    this.messageBranchDisplay = _booleanOptionOr(options.messageBranchDisplay, this.template.commit.message.displayBranch);
    this.messageHashDisplay = _booleanOptionOr(options.messageHashDisplay, this.template.commit.message.displayHash);
    this.messageColor = options.messageColor || options.color;
    this.messageFont = options.messageFont || this.template.commit.message.font;
    this.dotColor = options.dotColor || options.color;
    this.dotSize = options.dotSize || this.template.commit.dot.size;
    this.dotStrokeWidth = options.dotStrokeWidth || this.template.commit.dot.strokeWidth;
    this.dotStrokeColor = options.dotStrokeColor || this.template.commit.dot.strokeColor || options.color;
    this.lineDash = options.lineDash || this.template.commit.dot.lineDash;
    this.type = options.type || null;
    this.tooltipDisplay = _booleanOptionOr(options.tooltipDisplay, true);
    this.onClick = options.onClick || null;
    this.representedObject = options.representedObject || null;
    this.parentCommit = options.parentCommit;
    this.x = options.x;
    this.y = options.y;
    this.showLabel = options.showLabel;
    this.labelColor = options.labelColor || options.color;
    this.labelFont = options.labelFont || this.template.branch.labelFont;
    _assignTagOptionsToCommit(this, options);

    this.parent.commits.push(this);
  }

  /**
   * Render the commit
   *
   * @this Commit
   **/
  Commit.prototype.render = function () {
    var commitOffsetForTags = this.template.commit.tag.spacingX;
    var commitOffsetLeft = (this.parent.columnMax + 1) * this.template.branch.spacingX + commitOffsetForTags;

    // Label
    if (this.showLabel) {
      /*
       * For cases where we want a 0 or 180 degree label rotation in horizontal mode,
       * we need to modify the position of the label to sit centrally above the commit dot.
       */
      if (_isHorizontal(this.parent) &&
        (this.template.branch.labelRotation % 180 === 0)) {

        /*
         * Take into account the dot size and the height of the label
         * (calculated from the font size) to arrive at the Y position.
         */
        var yNegativeMargin = this.y - this.dotSize - _getFontHeight(this.labelFont);
        _drawTextBG(this.context,
          this.x,
          yNegativeMargin,
          this.branch.name,
          this.labelColor,
          this.labelFont,
          this.template.branch.labelRotation,
          true);
      } else {
        _drawTextBG(this.context,
          this.x + this.template.commit.spacingX,
          this.y + this.template.commit.spacingY,
          this.branch.name,
          this.labelColor,
          this.labelFont,
          this.template.branch.labelRotation,
          true);
      }
    }

    // Dot
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.dotSize, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.dotColor;
    this.context.strokeStyle = this.dotStrokeColor;
    this.context.lineWidth = this.dotStrokeWidth;

    if (typeof this.context.setLineDash === "function") {
      this.context.setLineDash(this.lineDash);
    }

    if (typeof this.dotStrokeWidth === "number") {
      this.context.stroke();
    }

    this.context.fill();
    this.context.closePath();

    // Arrow
    if (this.arrowDisplay && this.parentCommit instanceof Commit) {
      this.arrow();
    }

    // Tag
    if (this.tag !== null) {
      var tag = new Tag(this, {
        color: this.tagColor,
        font: this.tagFont
      });

      commitOffsetLeft += tag.width - commitOffsetForTags;
    }

    // Detail
    var DETAIL_OFFSET_LEFT_IN_PX = 60;
    var DETAIL_OFFSET_TOP_IN_PX = 30;

    if (this.detail !== null && _isVertical(this.parent)) {
      this.detail.style.left = this.parent.canvas.offsetLeft + commitOffsetLeft + DETAIL_OFFSET_LEFT_IN_PX + "px";

      var detailPositionTop = (this.parent.canvas.offsetTop + this.y);
      if (this.parent.orientation === "vertical-reverse") {
        var clientHeight = (this.parent.canvas.clientHeight - this.detail.clientHeight);
        this.detail.style.top = detailPositionTop + clientHeight - DETAIL_OFFSET_TOP_IN_PX + "px";
      } else {
        this.detail.style.top = detailPositionTop + DETAIL_OFFSET_TOP_IN_PX + "px";
      }
    }

    // Message
    if (this.messageDisplay) {
      var message = this.message;
      if (this.messageHashDisplay) {
        message = this.sha1 + " " + message;
      }
      if (this.messageAuthorDisplay) {
        message = message + (this.author ? " - " + this.author : "");
      }
      if (this.messageBranchDisplay) {
        message = (this.branch.name ? "[" + this.branch.name + "] " : "") + message;
      }

      this.context.font = this.messageFont;
      this.context.fillStyle = this.messageColor;
      this.context.fillText(message, commitOffsetLeft, this.y + this.dotSize / 2);
    }
  };

  /**
   * Render a arrow before commit
   *
   * @this Commit
   **/
  Commit.prototype.arrow = function Arrow() {
    // Options
    var size = this.template.arrow.size;
    var color = this.template.arrow.color || this.branch.color;
    var isReversed = this.parent.reverseArrow;

    function rotate(y, x) {
      var direction = (isReversed) ? -1 : 1;
      return Math.atan2(direction * y, direction * x);
    }

    // Angles calculation
    var alpha = rotate(this.parentCommit.y - this.y, this.parentCommit.x - this.x);

    // Merge & Fork case
    var isForkCommit = (this === this.branch.commits[0]);
    if (this.type === "mergeCommit" || isForkCommit) {
      var deltaColumn = (this.parentCommit.branch.column - this.branch.column);
      var commitSpaceDelta = (this.showLabel ? 2 : 1);

      var alphaX = this.template.branch.spacingX * deltaColumn + this.template.commit.spacingX * commitSpaceDelta;
      var isPushedInY = (isForkCommit || isReversed) &&
        Math.abs(this.y - this.parentCommit.y) > Math.abs(this.template.commit.spacingY);
      var isOnSameXThanParent = (this.x === this.parentCommit.x);
      if (_isVertical(this.parent) && (isPushedInY || isOnSameXThanParent)) {
        alphaX = 0;
      }

      var alphaY = this.template.branch.spacingY * deltaColumn + this.template.commit.spacingY * commitSpaceDelta;
      var isPushedInX = (isForkCommit || isReversed) &&
        Math.abs(this.x - this.parentCommit.x) > Math.abs(this.template.commit.spacingX);
      var isOnSameYThanParent = (this.y === this.parentCommit.y);
      if (_isHorizontal(this.parent) && (isPushedInX || isOnSameYThanParent)) {
        alphaY = 0;
      }

      alpha = rotate(alphaY, alphaX);
      color = this.parentCommit.branch.color;
    }

    var delta = Math.PI / 7; // Delta between left & right (radian)

    var arrowX = (isReversed) ? this.parentCommit.x : this.x;
    var arrowY = (isReversed) ? this.parentCommit.y : this.y;

    // Top
    var h = this.template.commit.dot.size + this.template.arrow.offset;
    var x1 = h * Math.cos(alpha) + arrowX;
    var y1 = h * Math.sin(alpha) + arrowY;

    // Bottom left
    var x2 = (h + size) * Math.cos(alpha - delta) + arrowX;
    var y2 = (h + size) * Math.sin(alpha - delta) + arrowY;

    // Bottom center
    var x3 = (h + size / 2) * Math.cos(alpha) + arrowX;
    var y3 = (h + size / 2) * Math.sin(alpha) + arrowY;

    // Bottom right
    var x4 = (h + size) * Math.cos(alpha + delta) + arrowX;
    var y4 = (h + size) * Math.sin(alpha + delta) + arrowY;

    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.moveTo(x1, y1); // Top
    this.context.lineTo(x2, y2); // Bottom left
    this.context.quadraticCurveTo(x3, y3, x4, y4); // Bottom center
    this.context.lineTo(x4, y4); // Bottom right
    this.context.fill();
  };

  // --------------------------------------------------------------------
  // -----------------------      Tag         ------------------------
  // --------------------------------------------------------------------

  /**
   * Tag
   *
   * @constructor
   *
   * @param {Commit} commit - Tagged commit
   * @param {object} [options] - Tag options
   * @param {string} [options.color = commit.color] - Specific tag color
   * @param {string} [options.font = commit.template.commit.tag.font] - Font of the tag
   * @return {Tag}
   *
   * @this Tag
   * */
  function Tag(commit, options) {
    if (!_isObject(commit)) {
      throw new Error("You can't tag a commit that doesn't exist");
    }

    options = _isObject(options) ? options : {};
    this.color = options.color || commit.color;
    this.font = options.font || commit.template.commit.tag.font;

    // Set context font for calculations
    var originalFont = commit.context.font;
    commit.context.font = this.font;

    var textWidth = commit.context.measureText(commit.tag).width;
    this.width = Math.max(commit.template.commit.tag.spacingX, textWidth);

    var x = 0;
    var y = 0;
    var tagColumn = (commit.parent.columnMax + 1);
    if (_isHorizontal(commit.parent)) {
      x = commit.x - commit.dotSize / 2;
      y = (tagColumn * commit.template.commit.tag.spacingY) - commit.template.commit.tag.spacingY / 2;
    } else {
      x = (tagColumn * commit.template.commit.tag.spacingX) - commit.template.commit.tag.spacingX / 2 + textWidth / 2;
      y = commit.y - commit.dotSize / 2;
    }

    _drawTextBG(commit.context, x, y, commit.tag, this.color, this.font, 0, commit.displayTagBox);

    // Reset original context font
    commit.context.font = originalFont;

    return this;
  }

  // --------------------------------------------------------------------
  // -----------------------      Template       ------------------------
  // --------------------------------------------------------------------

  /**
   * Template
   *
   * @constructor
   *
   * @param {object} options - Template options
   * @param {string[]} [options.colors] - Colors scheme: One color for each column
   * @param {string} [options.arrow.color] - Arrow color
   * @param {number} [options.arrow.size] - Arrow size
   * @param {number} [options.arrow.offset] - Arrow offset
   * @param {string} [options.branch.color] - Branch color
   * @param {number} [options.branch.lineWidth] - Branch line width
   * @param {number[]} [options.branch.lineDash] - Branch line dash segments
   * @param {string} [options.branch.mergeStyle = ("bezier"|"straight")] - Branch merge style
   * @param {number} [options.branch.spacingX] - Space between branches
   * @param {number} [options.branch.spacingY] - Space between branches
   * @param {number} [options.commit.spacingX] - Space between commits
   * @param {number} [options.commit.spacingY] - Space between commits
   * @param {number} [options.commit.widthExtension = 0]  - Additional width to be added to the calculated width
   * @param {string} [options.commit.color] - Master commit color (dot & message)
   * @param {string} [options.commit.dot.color] - Commit dot color
   * @param {number} [options.commit.dot.size] - Commit dot size
   * @param {number} [options.commit.dot.strokeWidth] - Commit dot stroke width
   * @param {string} [options.commit.dot.strokeColor] - Commit dot stroke color
   * @param {number[]} [options.commit.dot.lineDash] - Commit dot line dash segments
   * @param {string} [options.commit.message.color] - Commit message color
   * @param {boolean} [options.commit.message.display] - Commit display policy
   * @param {boolean} [options.commit.message.displayAuthor] - Commit message author policy
   * @param {boolean} [options.commit.message.displayBranch] - Commit message branch policy
   * @param {boolean} [options.commit.message.displayHash] - Commit message hash policy
   * @param {string} [options.commit.message.font = "normal 12pt Calibri"] - Commit message font
   * @param {boolean} [options.commit.shouldDisplayTooltipsInCompactMode] - Tooltips policy
   * @param {CommitFormatter} [options.commit.tooltipHTMLFormatter = true] - Formatter for the tooltip contents.
   *
   * @this Template
   **/
  function Template(options) {
    // Options
    options = _isObject(options) ? options : {};
    options.branch = options.branch || {};
    options.arrow = options.arrow || {};
    options.commit = options.commit || {};
    options.commit.dot = options.commit.dot || {};
    options.commit.tag = options.commit.tag || {};
    options.commit.message = options.commit.message || {};

    // One color per column
    this.colors = options.colors || ["#6963FF", "#47E8D4", "#6BDB52", "#E84BA5", "#FFA657"];

    // Branch style
    this.branch = {};
    this.branch.color = options.branch.color || null; // Only one color
    this.branch.lineWidth = options.branch.lineWidth || 2;
    this.branch.lineDash = options.branch.lineDash || [];
    this.branch.showLabel = options.branch.showLabel || false;
    this.branch.labelColor = options.branch.labelColor || null;
    this.branch.labelFont = options.branch.labelFont || "normal 8pt Calibri";

    /*
     * Set to 'null' by default, as a value of '0' can no longer be used to test
     * whether rotation angle has been defined
     * ('0' is an acceptable value).
     */
    this.branch.labelRotation = options.branch.labelRotation !== undefined ?
      options.branch.labelRotation : null;

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
    this.commit.shouldDisplayTooltipsInCompactMode = _booleanOptionOr(options.commit.shouldDisplayTooltipsInCompactMode, true);

    // Only one color, if null message takes branch color (full commit)
    this.commit.color = options.commit.color || null;

    this.commit.dot = {};

    // Only one color, if null message takes branch color (only dot)
    this.commit.dot.color = options.commit.dot.color || null;
    this.commit.dot.size = options.commit.dot.size || 3;
    this.commit.dot.strokeWidth = options.commit.dot.strokeWidth || null;
    this.commit.dot.strokeColor = options.commit.dot.strokeColor || null;
    this.commit.dot.lineDash = options.commit.dot.lineDash || this.branch.lineDash;

    this.commit.tag = {};
    this.commit.tag.color = options.commit.tag.color || this.commit.dot.color;
    this.commit.tag.font = options.commit.tag.font || options.commit.message.font || "normal 10pt Calibri";
    this.commit.tag.spacingX = this.branch.spacingX;
    this.commit.tag.spacingY = this.commit.spacingY;

    this.commit.message = {};
    this.commit.message.display = _booleanOptionOr(options.commit.message.display, true);
    this.commit.message.displayAuthor = _booleanOptionOr(options.commit.message.displayAuthor, true);
    this.commit.message.displayBranch = _booleanOptionOr(options.commit.message.displayBranch, true);
    this.commit.message.displayHash = _booleanOptionOr(options.commit.message.displayHash, true);

    // Only one color, if null message takes commit color (only message)
    this.commit.message.color = options.commit.message.color || null;
    this.commit.message.font = options.commit.message.font || "normal 12pt Calibri";
  }

  /**
   * Get a default template from library
   *
   * @param {string} name - Template name
   *
   * @return {Template} [template] - Template if exist
   **/
  Template.prototype.get = function (name) {
    var template = {};

    switch (name) {
      case "blackarrow":
        template = {
          branch: {
            color: "#000000",
            lineWidth: 4,
            spacingX: 50,
            mergeStyle: "straight",
            labelRotation: 0
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
          colors: ["#979797", "#008fb5", "#f1c109"],
          branch: {
            lineWidth: 10,
            spacingX: 50,
            labelRotation: 0
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

    return new Template(template);
  };

  // --------------------------------------------------------------------
  // -----------------------      Utilities       -----------------------
  // --------------------------------------------------------------------

  /**
   * Returns the last element of given array.
   *
   * @param {Array} array
   * @returns {*}
   * @private */
  function _getLast(array) {
    return array.slice(-1)[0];
  }


  /**
   * Extend given commit with proper attributes for tag from options.
   *
   * @param {Commit} commit
   * @param {object} [options]
   * @param {string} [options.tag] - Tag of the commit
   * @param {string} [options.tagColor = commit.messageColor] - Color of the tag
   * @param {string} [options.tagFont = commit.template.commit.tag.font] - Font of the tag
   * @param {string} [options.displayTagBox = true] - If true, display a box around the tag
   * @private
   */
  function _assignTagOptionsToCommit(commit, options) {
    commit.tag = options.tag || null;
    commit.tagColor = options.tagColor || commit.messageColor;
    commit.tagFont = options.tagFont || commit.template.commit.tag.font;
    commit.displayTagBox = _booleanOptionOr(options.displayTagBox, true);
  }

  /**
   * Returns the parent commit of current HEAD from given branch.
   *
   * @param {Branch} branch
   * @returns {Commit}
   * @private
   * */
  function _getParentCommitFromBranch(branch) {
    if (_getLast(branch.commits)) {
      return _getLast(branch.commits);
    } else if (branch.parentBranch) {
      return _getParentCommitFromBranch(branch.parentBranch);
    } else {
      return null;
    }
  }

  /**
   * Returns a copy of the given object.
   *
   * @param {object} object
   * @returns {object}
   * @private
   * */
  function _clone(object) {
    return JSON.parse(JSON.stringify(object));
  }

  /**
   * Returns the height of the given font when rendered.
   *
   * @param {string} font
   * @returns {number}
   * @private
   */
  function _getFontHeight(font) {
    var body = document.getElementsByTagName("body")[0];
    var dummy = document.createElement("div");
    var dummyText = document.createTextNode("Mg");

    dummy.appendChild(dummyText);
    dummy.setAttribute("style", "font: " + font + "; display: inline-block;");
    body.appendChild(dummy);
    var fontHeight = dummy.offsetHeight;
    body.removeChild(dummy);

    return fontHeight;
  }

  /**
   * Returns the `booleanOptions` if it's actually a boolean, returns `defaultOptions` otherwise.
   *
   * @param {*} booleanOption
   * @param {boolean} defaultOptions
   * @returns {boolean}
   * @private
   */
  function _booleanOptionOr(booleanOption, defaultOption) {
    return (typeof booleanOption === "boolean") ? booleanOption : defaultOption;
  }

  /**
   * Draw text background.
   *
   * @param {CanvasRenderingContext2D} context - Canvas 2D context in which to render text.
   * @param {number} x - Horizontal offset of the text.
   * @param {number} y - Vertical offset of the text.
   * @param {string} text - Text content.
   * @param {string} color - Text Colors.
   * @param {string} font - Text font.
   * @param {number} angle - Angle of the text for rotation.
   * @param {boolean} useStroke - Name of the triggered event.
   * @private
   */
  function _drawTextBG(context, x, y, text, color, font, angle, useStroke) {
    context.save();
    context.translate(x, y);
    context.rotate(angle * (Math.PI / 180));
    context.textAlign = "center";

    context.font = font;
    var width = context.measureText(text).width;
    var height = _getFontHeight(font);

    if (useStroke) {
      context.beginPath();
      context.rect(-(width / 2) - 4, -(height / 2) + 2, width + 8, height + 2);
      context.fillStyle = color;
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.stroke();

      context.fillStyle = "black";
    } else {
      context.fillStyle = color;
    }

    context.fillText(text, 0, height / 2);
    context.restore();
  }

  /**
   * Emit an event on the given element.
   *
   * @param {HTMLElement} element - DOM element to trigger the event on.
   * @param {string} eventName - Name of the triggered event.
   * @param {object} [data = {}] - Custom data to attach to the event.
   * @private
   */
  function _emitEvent(element, eventName, data) {
    var event;

    if (document.createEvent) {
      event = document.createEvent("HTMLEvents");
      event.initEvent(eventName, true, true);
    } else {
      event = document.createEventObject();
      event.eventType = eventName;
    }

    event.eventName = eventName;
    event.data = data || {};

    if (document.createEvent) {
      element.dispatchEvent(event);
    } else {
      element.fireEvent("on" + event.eventType, event);
    }
  }

  /**
   * Returns the scaling factor of given canvas `context`.
   * Handles high-resolution displays.
   *
   * @param {object} context
   * @returns {number}
   * @private
   */
  function _getScale(context) {
    var backingStorePixelRatio;
    var scalingFactor;

    // Account for high-resolution displays
    scalingFactor = 1;

    if (window.devicePixelRatio) {
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
  function _isVertical(graph) {
    return (graph.orientation === "vertical" || graph.orientation === "vertical-reverse");
  }

  /**
   * Returns `true` if `graph` has an horizontal orientation.
   *
   * @param {GitGraph} graph
   * @returns {boolean}
   * @private
   */
  function _isHorizontal(graph) {
    return (graph.orientation === "horizontal" || graph.orientation === "horizontal-reverse");
  }

  /**
   * Returns `true` if `object` is an object.
   *
   * @param {*} object
   * @returns {boolean}
   * @private
   */
  function _isObject(object) {
    return (typeof object === "object");
  }

  /**
   * Returns `true` if any of the properties (nested or single) of `obj` specified by `key` are undefined or set to a value of null.
   * Modified from original source: http://stackoverflow.com/a/23809123.
   *
   * @param {*} obj - The object whose properties are to be tested as being undefined or equal to null.
   * @param {string} key - The property hierarchy of `obj` to be tested, specified using 'dot notation' (e.g. property1.property2.property3 etc).
   * @returns {boolean} - True if ANY of the properties specified by `key` is undefined or equal to null, otherwise False.
   * @private
   */
  function _isNullOrUndefined(obj, key) {

    /* We invert the result of '.every()' in order to meet the expected return value for the condition test of the function.
     * We have to do this, given that '.every()' will return immediately upon capturing a falsey value from the callback.
     *
     * See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every for more information.
     */
    return !(key.split(".").every(function (x) {
      if (typeof obj !== "object" || obj === null || !(x in obj)) {
        return false;
      }
      obj = obj[x];
      return true;
    }));
  }

  /* Polyfill for ECMA-252 5th edition Array.prototype.every()
   * See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every
   * for more information.
   * */
  if (!Array.prototype.every) {
    Array.prototype.every = function (callbackFn, thisArg) {
      var T, k;

      if (this === null) {
        throw new TypeError("this is null or not defined");
      }

      var O = Object(this);
      var len = O.length >>> 0;

      if (typeof callbackFn !== "function") {
        throw new TypeError();
      }

      if (arguments.length > 1) {
        T = thisArg;
      }

      k = 0;

      while (k < len) {
        var kValue;
        if (k in O) {

          kValue = O[k];

          var testResult = callbackFn.call(T, kValue, k, O);

          if (!testResult) {
            return false;
          }
        }
        k++;
      }

      return true;
    };
  }

  // Expose GitGraph object
  window.GitGraph = GitGraph;
  window.GitGraph.Branch = Branch;
  window.GitGraph.Commit = Commit;
  window.GitGraph.Template = Template;
})();
