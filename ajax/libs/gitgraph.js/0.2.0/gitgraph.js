/* ==========================================================
 *                  GitGraph v0.2.0
 *      https://github.com/nicoespeon/gitgraph.js
 * ==========================================================
 * Copyright (c) 2013 Nicolas CARLO (@nicoespeon) ٩(^‿^)۶
 * Copyright (c) 2013 Fabien BERNARD (@fabien0102) ✌(✰‿✰)✌
 *
 * GitGraph.js may be freely distributed under the MIT Licence
 * ========================================================== */

/**
 * GitGraph
 *
 * @constructor
 *
 * @param {Object} options - GitGraph options
 * @param {String} [options.elementId = 'gitGraph'] - Id of <canvas> container
 * @param {Template} [options.template] - Template, default template if nothing here
 * @param {String} [options.author = 'Sergio Flores <saxo-guy@epic.com>'] - Default author for commits
 *
 * @this GitGraph
 **/
function GitGraph(options) {
  // Options
  options = (typeof options === "object") ?
    options : {};
  this.elementId = (typeof options.elementId === "string") ?
    options.elementId : "gitGraph";
  this.author = (typeof options.author === "string") ?
    options.author : "Sergio Flores <saxo-guy@epic.com>";

  // Template gestion
  if (typeof options.template === "string") {
    options.template =  new Template().get(options.template);
  }
  this.template = (options.template instanceof Template) ?
    options.template : new Template();

  // Canvas init
  this.canvas = document.getElementById(this.elementId);
  this.context = this.canvas.getContext("2d");

  // Navigations vars
  this.HEAD = null;
  this.branchs = [];

  // Utilities
  this.columnMax = 0; // nb of column for message position
  this.commitOffsetX = 0;
  this.commitOffsetY = 0;

  // Error: no render()
  this.context.fillStyle = "red";
  this.context.font = "bold 15pt Calibri";
  this.context.fillText("Error: No render() at the end", 150, 100);
}

/**
 * Create new branch
 *
 * @param {(String | Object)} options - Branch name | Options of Branch
 * @see Branch
 * @this GitGraph
 **/
GitGraph.prototype.branch = function (options) {
  // Options
  if (typeof (options) === "string") {
    var name = options;
    options = {};
    options.name = name;
  }

  options = (typeof options === "object") ? options : {};
  options.parent = this;
  options.parentBranch = options.parentBranch || this.HEAD;

  // Calcul origin of branch
  if (options.parentBranch instanceof Branch) {
    options.originX = options.parentBranch.commits[options.parentBranch.commits.length - 1].x - this.template.commit.spacingX - options.parentBranch.offsetX;
    options.originY = options.parentBranch.commits[options.parentBranch.commits.length - 1].y - this.template.commit.spacingY - options.parentBranch.offsetY;
  }

  // Add branch
  var branch = new Branch(options);
  this.branchs.push(branch);

  // Return
  return branch;
};

/**
 * Commit on HEAD
 *
 * @param {Object} options - Options of commit
 * @return {GitGraph} this - Return the main object so we can chain
 * @see Commit
 * @this GitGraph
 **/
GitGraph.prototype.commit = function (options) {
  this.HEAD.commit(options);

  // Return the main object so we can chain
  return this;
};

/**
 * Render the canvas
 *
 * @this GitGraph
 **/
GitGraph.prototype.render = function () {
  // Resize canvas
  this.canvas.height = this.branchs[0].updateSize().height || this.branchs[this.branchs.length - 1].offsetY + this.template.commit.dot.size * 3;
  this.canvas.width = this.branchs[0].updateSize().width || 1000;

  // Clear All
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Add some margin
  this.context.translate(this.template.commit.dot.size * 2, this.template.commit.dot.size * 2);

  // Translate for inverse orientation
  if (this.template.commit.spacingY > 0) {
    this.context.translate(0, this.canvas.height - this.template.commit.dot.size * 3);
  }

  if (this.template.commit.spacingX > 0) {
    this.context.translate(this.canvas.width - this.template.commit.dot.size * 3, 0);
  }

  // Render
  for (var i = this.branchs.length - 1, branch; branch = this.branchs[i]; i--) {
    branch.updateSize();
    branch.render();
  }
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
 * @param {Number} [options.originX] - Branch origin X
 * @param {Number} [options.originY] - Branch origin Y
 * @param {Branch} [options.parentBranch] - Parent branch
 * @param {String} [options.name = 'no-name'] - Branch name
 *
 * @this Branch
 **/
function Branch(options) {
  // Check integrity
  if (options.parent instanceof GitGraph === false) {
    return;
  }

  // Options
  options = (typeof options === "object") ? options : {};
  this.parent = options.parent;
  this.parentBranch = options.parentBranch;
  this.originX = (typeof options.originX === "number") ? options.originX : 0;
  this.originY = (typeof options.originY === "number") ? options.originY : 0;
  this.name = (typeof options.name === "string") ? options.name : "no-name";
  this.targetBranch = null;
  this.context = this.parent.context;
  this.template = this.parent.template;
  this.lineWidth = this.template.branch.lineWidth;
  this.spacingX = this.template.branch.spacingX;
  this.spacingY = this.template.branch.spacingY;
  this.size = 0;
  this.height = 0;
  this.width = 0;
  this.commits = [];

  // Calcul column number for auto-color & auto-offset
  this.column = 0;
  this.calculColumn();

  // Options with auto value
  this.offsetX = this.column * this.spacingX;
  this.offsetY = this.column * this.spacingY;

  this.color = options.color || this.template.branch.color || this.template.colors[this.column];

  // Checkout on this new branch
  this.checkout();
}

/**
 * Render the branch
 *
 * @this Branch
 **/
Branch.prototype.render = function () {
  // Fork part
  if (this.parentBranch) {
    this.context.beginPath();
    this.context.moveTo(this.parentBranch.offsetX + this.originX + this.template.commit.spacingX, this.parentBranch.offsetY + this.originY + this.template.commit.spacingY);
    if (this.template.branch.mergeStyle === "bezier") {
      this.context.bezierCurveTo(
        this.parentBranch.offsetX + this.originX + this.template.commit.spacingX / 2, this.parentBranch.offsetY + this.originY + this.template.commit.spacingY / 2,
        this.offsetX + this.originX + this.template.commit.spacingX / 2, this.offsetY + this.originY + this.template.commit.spacingY / 2,
        this.offsetX + this.originX, this.offsetY + this.originY);
    } else {
      this.context.lineTo(this.offsetX + this.originX, this.offsetY + this.originY);
    }
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;
    this.context.stroke();
  }

  // Main part
  if (!this.parentBranch) {
    this.context.beginPath();
    this.context.moveTo(this.offsetX + this.originX, this.offsetY + this.originY);
  }
  this.context.lineTo(this.offsetX + this.originX - this.width, this.offsetY + this.originY - this.height);
  this.context.lineWidth = this.lineWidth;
  this.context.strokeStyle = this.color;
  this.context.stroke();

  // Merge part
  if (this.targetBranch) {
    if (this.template.branch.mergeStyle === "bezier") {
      this.context.bezierCurveTo(
        this.offsetX + this.originX - this.width - this.template.commit.spacingX / 2, this.offsetY + this.originY - this.height - this.template.commit.spacingY / 2,
        this.targetBranch.offsetX + this.originX - this.width - this.template.commit.spacingX / 2, this.targetBranch.offsetY + this.originY - this.height - this.template.commit.spacingY / 2,
        this.targetBranch.offsetX + this.originX - this.width - this.template.commit.spacingX, this.targetBranch.offsetY + this.originY - this.height - this.template.commit.spacingY);
    } else {
      this.context.lineTo(this.targetBranch.offsetX + this.originX - this.width - this.template.commit.spacingX, this.targetBranch.offsetY + this.originY - this.height - this.template.commit.spacingY);
    }
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;
    this.context.stroke();
  }

  // Commits part
  for (var i = 0, commit; commit = this.commits[i]; i++) {
    commit.render();
  }
};

/**
 * Add a commit
 *
 * @param {(String | Object)} [options] - Message | Options of commit
 * @see Commit
 * @this Branch
 **/
Branch.prototype.commit = function (options) {
  // Check integrity
  if (this.targetBranch) {
    return;
  }

  // Options
  if (typeof (options) === "string") {
    var message = options;
    options = {};
    options.message = message;
  }
  if (typeof (options) !== "object") {
    options = {};
  }

  options.parent = this.parent;
  options.messageColor = options.messageColor || options.color || this.template.commit.message.color || null;
  options.dotColor = options.dotColor || options.color || this.template.commit.dot.color || null;
  options.color = options.color || this.template.commit.color || this.template.colors[this.column];
  options.x = this.offsetX - this.parent.commitOffsetX;
  options.y = this.offsetY - this.parent.commitOffsetY;
  options.arrowDisplay = (this.commits.length === 0 || options.type === "mergeCommit") ? false : this.template.arrow.active;

  var commit = new Commit(options);
  this.commits.push(commit);

  this.parent.commitOffsetX += this.template.commit.spacingX;
  this.parent.commitOffsetY += this.template.commit.spacingY;

  // Return the main object so we can chain
  return this;
};

/**
 * Checkout onto this branch
 *
 * @this Branch
 **/
Branch.prototype.checkout = function () {
  // Check integrity
  if (this.targetBranch) {
    return;
  }

  this.parent.HEAD = this;
};

/**
 * Merge branch
 *
 * @param {Branch} [target = this.parent.HEAD]
 * @param {boolean} [mergeCommit = this.template.branch.mergeCommit]
 * @this Branch
 **/
Branch.prototype.merge = function (target, mergeCommit) {
  // Check if this branch is allready merged
  if (this.targetBranch instanceof Branch === true) {
    return;
  }

  // Merge
  this.targetBranch = target || this.parent.HEAD;

  // Check integrity of target
  if (this.targetBranch instanceof Branch === false || this.targetBranch === this) {
    this.targetBranch = null;
    return;
  }

  // Update size of branch
  this.height = this.originY + this.parent.commitOffsetY - this.template.commit.spacingY;
  this.width = this.originX + this.parent.commitOffsetX - this.template.commit.spacingX;

  // Merge commit
  mergeCommit = (typeof mergeCommit === "string") ?
    mergeCommit : "Merge branch `" + this.name + "` into `" + this.targetBranch.name + "`";
  this.targetBranch.commit({
    message: mergeCommit,
    type: "mergeCommit"
  });

  // Checkout on target
  this.parent.HEAD = this.targetBranch;
};

/**
 * Update size of branchs not merged
 *
 * @return {int} size
 * @this Branch
 **/
Branch.prototype.updateSize = function () {
  if (this.targetBranch instanceof Branch === false) {
    this.width = this.parent.commitOffsetX + this.template.commit.spacingX;
    this.height = this.parent.commitOffsetY + this.template.commit.spacingY;
  }

  this.size = Math.sqrt(this.height * this.height + this.width * this.width); // Pythagore powaaa

  return {
    width: Math.abs(this.width),
    height: Math.abs(this.height)
  };
};

/**
 * Calcul column
 *
 * @this Branch
 **/
Branch.prototype.calculColumn = function () {
  for (var i = 0, branch; branch = this.parent.branchs[i]; i++) {
    branch.updateSize();
    if (branch.originY - branch.size <= this.originY) {
      this.column++;
    }
  }
  this.parent.columnMax = (this.column > this.parent.columnMax) ? this.column : this.parent.columnMax;
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
 * @param {String} [options.sha1] - Sha1, default is a random short sha1
 * @param {String} [options.dotColor = options.color] - Specific dot color
 * @param {Number} [options.dotSize = this.template.commit.dot.size] - Dot size
 * @param {Number} [options.dotStrokeWidth = this.template.commit.dot.strokeWidth] - Dot stroke width
 * @param {Number} [options.dotStrokeColor = this.template.commit.dot.strokeColor]
 * @param {String} [options.message = "He doesn't like George Michael! Boooo!"] - Commit message
 * @param {String} [options.messageColor = options.color] - Specific message color
 * @param {Boolean} [options.messageDisplay = this.template.commit.message.display] - Commit message policy
 *
 * @this Commit
 **/
function Commit(options) {
  // Check integrity
  if (options.parent instanceof GitGraph === false) {
    return;
  }

  // Options
  options = (typeof options === "object") ? options : {};
  this.parent = options.parent;
  this.template = this.parent.template;
  this.context = this.parent.context;
  this.author = options.author || this.parent.author;
  this.date = options.date || new Date().toUTCString();
  this.sha1 = options.sha1 || (Math.random(100)).toString(16).substring(3, 10);
  this.message = options.message || "He doesn't like George Michael! Boooo!";
  this.arrowDisplay = options.arrowDisplay;
  this.messageDisplay = options.messageDisplay || this.template.commit.message.display;
  this.messageColor = options.messageColor || options.color;
  this.dotColor = options.dotColor || options.color;
  this.dotSize = options.dotSize || this.template.commit.dot.size;
  this.dotStrokeWidth = options.dotStrokeWidth || this.template.commit.dot.strokeWidth;
  this.dotStrokeColor = options.dotStrokeColor || this.template.commit.dot.strokeColor;
  this.x = options.x;
  this.y = options.y;
}

/**
 * Render the commit
 *
 * @this Commit
 **/
Commit.prototype.render = function () {
  // Dot
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.dotSize, 0, 2 * Math.PI, false);
  this.context.fillStyle = this.dotColor;
  this.context.strokeStyle = this.dotStrokeColor;
  this.context.lineWidth = this.dotStrokeWidth;
  if (typeof (this.dotStrokeWidth) === "number") {
    this.context.stroke();
  }
  this.context.fill();
  this.context.closePath();

  // Arrow
  if (this.arrowDisplay) {
    this.arrow = new Arrow({
      parent: this.parent,
      x: this.x,
      y: this.y
    });
  }

  // Message
  if (this.messageDisplay) {
    var message = this.sha1 + " " + this.message + " - " + this.author;
    this.context.font = this.template.commit.message.font;
    this.context.fillStyle = this.messageColor;
    this.context.fillText(message, (this.parent.columnMax + 2) * this.template.branch.spacingX, this.y + 3);
  }
};


// --------------------------------------------------------------------
// -----------------------       Arrow         ------------------------
// --------------------------------------------------------------------

/**
 * Arrow
 *
 * @constructor
 *
 * @param {Object} options - Arrow Options
 * @param {GitGraph} options.parent - GitGraph constructor
 * @param {Number} options.x - Position X
 * @param {Number} options.y - Position Y
 * @param {String} [options.color = this.template.color] - Arrow color
 * @param {Number} [options.height = this.template.height] - Arrow height
 * @param {Number} [options.width = this.template.width] - Arrow width
 * @param {Number} [options.rotation] - Arrow rotation : 1 => up, -1 =>down
 *
 * @todo Implement rotation
 *
 * @this Arrow
 **/
function Arrow(options) {
  // Options
  options = (typeof options === "object") ? options : {};
  this.parent = options.parent;
  this.context = this.parent.context;
  this.template = this.parent.template;
  this.size = options.size || this.template.arrow.size;
  this.color = options.color || this.template.arrow.color;
  this.x = options.x + this.template.arrow.offsetX;
  this.y = options.y + this.template.arrow.offsetY;

  // Angles calcul
  var alpha = Math.atan2(this.template.commit.spacingY, this.template.commit.spacingX);
  var delta = Math.PI / 7; // Delta between left & right (radian)

  // Top
  var h = this.template.commit.dot.size;
  var x1 = h * Math.cos(alpha) + this.x;
  var y1 = h * Math.sin(alpha) + this.y;

  // Bottom left
  var x2 = (h + this.size) * Math.cos(alpha - delta) + this.x;
  var y2 = (h + this.size) * Math.sin(alpha - delta) + this.y;

  // Bottom center
  var x3 = (h + this.size / 2) * Math.cos(alpha) + this.x;
  var y3 = (h + this.size / 2) * Math.sin(alpha) + this.y;

  // Bottom right
  var x4 = (h + this.size) * Math.cos(alpha + delta) + this.x;
  var y4 = (h + this.size) * Math.sin(alpha + delta) + this.y;

  this.context.beginPath();
  this.context.fillStyle = this.color;
  this.context.moveTo(x1, y1); // Top
  this.context.lineTo(x2, y2); // Bottom left
  this.context.quadraticCurveTo(x3, y3, x4, y4); // Bottom center
  this.context.lineTo(x4, y4); // Bottom right
  this.context.fill();
}


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
 * @param {String} [options.branch.color] - Branch color
 * @param {Number} [options.branch.linewidth] - Branch line width
 * @param {String} [options.branch.mergeStyle = ("bezier"|"straight")] - Branch merge style
 * @param {Boolean} [options.branch.mergeCommit] - Do a commit on merge
 * @param {Number} [options.branch.spacingX] - Space between branchs
 * @param {Number} [options.branch.spacingY] - Space between branchs
 * @param {Number} [options.commit.spacingX] - Space between commits
 * @param {Number} [options.commit.spacingY] - Space between commits
 * @param {String} [options.commit.color] - Master commit color (dot & message)
 * @param {String} [options.commit.dot.color] - Commit dot color
 * @param {Number} [options.commit.dot.size] - Commit dot size
 * @param {Number} [options.commit.dot.strokewidth] - Commit dot stroke width
 * @param {Number} [options.commit.dot.strokeColor] - Commit dot stroke color
 * @param {String} [options.commit.message.color] - Commit message color
 * @param {Boolean} [options.commit.message.display] - Commit display policy
 * @param {String} [options.commit.message.font = "normal 12pt Calibri"] - Commit message font
 *
 * @this Template
 **/
function Template(options) {
  // Options
  options = (typeof options === "object") ? options : {};
  options.branch = options.branch || {};
  options.arrow = options.arrow || {};
  options.commit = options.commit || {};
  options.commit.dot = options.commit.dot || {};
  options.commit.message = options.commit.message || {};

  this.colors = options.colors || ["#6963FF", "#47E8D4", "#6BDB52", "#E84BA5", "#FFA657"]; // One color for each column

  // Branch style
  this.branch = {};
  this.branch.color = options.branch.color || null; // Only one color
  this.branch.lineWidth = options.branch.lineWidth || 2;
  this.branch.mergeStyle = options.branch.mergeStyle || "bezier"; // "bezier" | "straight"
  this.branch.mergeCommit = (typeof options.branch.mergeCommit === "boolean") ? options.branch.mergeCommit : true;
  this.branch.spacingX = (typeof options.branch.spacingX === "number") ? options.branch.spacingX : 20; // Space between branchs
  this.branch.spacingY = options.branch.spacingY || 0; // Space between branchs

  // Arrow style
  this.arrow = {};
  this.arrow.size = options.arrow.size || null;
  this.arrow.color = options.arrow.color || this.branch.color || null;
  this.arrow.active = typeof (this.arrow.size) === "number";
  this.arrow.offsetX = options.arrow.offsetX || null;
  this.arrow.offsetY = options.arrow.offsetY || 2;

  // Commit style
  this.commit = {};
  this.commit.spacingX = options.commit.spacingX || 0;
  this.commit.spacingY = (typeof options.commit.spacingY === "number") ? options.commit.spacingY : 25;
  this.commit.color = options.commit.color || null; // Only one color, if null message takes branch color (full commit)

  this.commit.dot = {};
  this.commit.dot.color = options.commit.dot.color || null; // // Only one color, if null message takes branch color (only dot)
  this.commit.dot.size = options.commit.dot.size || 3;
  this.commit.dot.strokeWidth = options.commit.dot.strokeWidth || null;
  this.commit.dot.strokeColor = options.commit.dot.strokeColor || null;

  this.commit.message = {};
  this.commit.message.display = (typeof options.commit.message.display === "boolean") ? options.commit.message.display : true;
  this.commit.message.color = options.commit.message.color || null; // Only one color, if null message takes commit color (only message)
  this.commit.message.font = options.commit.message.font || "normal 12pt Calibri";
}

/**
 * Get a default template from library
 *
 * @param {String} name - Template name
 * @return {Template} [template] - Template if exist
 *
 **/
Template.prototype.get = function (name) {
  switch (name) {
  case "blackarrow":
    return new Template({
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
        offsetY: -2
      }
    });

  case "metro":
    return new Template({
      colors: ["#979797", "#008fb5", "f1c109"],
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
          font: "normal 14pt Arial",
        }
      },
    });
  }
};
