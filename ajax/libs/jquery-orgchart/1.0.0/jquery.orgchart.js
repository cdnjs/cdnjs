/**
 * JQuery Organisation Chart Plugin.
 *
 * Author: Mark Lee
 * Copyright (C)2013-2015 Caprica Software Limited
 * http://www.capricasoftware.co.uk
 *
 * Contributions by: Paul Lautman <paul.lautman at gmail.com>
 *
 * This software is licensed under the Creative Commons Attribution-ShareAlike 3.0 License,
 * see here for license terms:
 *
 *     http://creativecommons.org/licenses/by-sa/3.0
 */
(function($) {

    $.fn.orgChart = function(options) {
        var opts = $.extend({}, $.fn.orgChart.defaults, options);

        return this.each(function() {
            var $chartSource = $(this);
            // Clone the source list hierarchy so levels can be non-destructively removed if needed
            // before creating the chart
            $this = $chartSource.clone();
            if (opts.levels > -1) {
                $this.find("ul").andSelf().filter(function() {return $chartSource.parents("ul").length+1 > opts.levels;}).remove();
            }
            // Store the original element
            $this.data("chart-source", $chartSource);
            // Build the chart...
            var $container = $("<div class='" + opts.chartClass + "'/>");
            if (opts.interactive) {
                $container.addClass("interactive");
            }
            // The chart may be sourced from either a "ul", or an "li" element...
            var $root;
            if ($this.is("ul")) {
                $root = $this.find("li:first");
            }
            else if ($this.is("li")) {
                $root = $this;
            }
            if ($root) {
                buildNode($root, $container, 0, 0, opts);
                // Special case for any hyperlink anchor in the chart to prevent the click on the node itself from propagating
                $container.find("div.node a").click(function(evt) {
                    evt.stopImmediatePropagation();
                });
                if(opts.replace) {
                    opts.container.empty();
                }
                opts.container.append($container);
            }
        });
    };

    $.fn.orgChart.defaults = {
        container  : $("body"),
        depth      : -1,
        levels     : -1,
        showLevels : -1,
        stack      : false,
        chartClass : "orgChart",
        hoverClass : "hover",
        nodeText   : function($node) {return $node.clone().children("ul,li").remove().end().html();},
        interactive: false,
        fade       : false,
        speed      : "slow",
        nodeClicked: function($node) {},
        copyClasses: true,
        copyData   : true,
        copyStyles : true,
        copyTitle  : true,
        replace    : true
    };

    function buildNode($node, $appendTo, level, index, opts) {
        var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
        var $tbody = $("<tbody/>");

        // Make this node...
        var $nodeRow = $("<tr/>").addClass("nodes");
        var $nodeCell = $("<td/>").addClass("node").attr("colspan", 2);
        var $childNodes = $node.children("ul:first").children("li");
        if ($childNodes.length > 1) {
            $nodeCell.attr("colspan", $childNodes.length*2);
        }

        var $adjunct = $node.children("adjunct").eq(0);
        if ($adjunct.length > 0) {
            var $adjunctDiv = $("<div>").addClass("adjunct node").addClass("level"+level).addClass("node"+index).addClass("level"+level+"-node"+index).append(opts.nodeText($adjunct));
            $adjunctDiv.appendTo($nodeCell);
            var $linkDiv = $("<div>").addClass("adjunct-link");
            $linkDiv.appendTo($nodeCell);
            $adjunct.remove();
        }

        var $heading = $("<h2>").html(opts.nodeText($node));
        var $nodeDiv = $("<div>").addClass("node").addClass("level"+level).addClass("node"+index).addClass("level"+level+"-node"+index).append($heading);

        // Copy classes from the source list to the chart node
        if (opts.copyClasses) {
            $nodeDiv.addClass($node.attr("class"));
        }

        // Copy data from the source list to the chart node
        if (opts.copyData) {
            $nodeDiv.data($node.data());
        }

        // Copy CSS styles from the source list to the chart node
        if (opts.copyStyles) {
            $nodeDiv.attr("style", $node.attr("style"));
        }

        // Copy the title attribute from the source list to the chart node
        if (opts.copyTitle) {
            $nodeDiv.attr("title", $node.attr("title"));
        }

        $nodeDiv.data("orgchart-level", level).data("orgchart-node", $node);

        $nodeCell.append($nodeDiv);
        $nodeRow.append($nodeCell);
        $tbody.append($nodeRow);

        $nodeDiv.click(function() {
            var $this = $(this);
            opts.nodeClicked($this.data("orgchart-node"), $this);
            if (opts.interactive) {
                var $row = $this.closest("tr");
                if ($row.next("tr").is(":visible")) {
                    if (opts.fade) {
                        $row.nextAll("tr").fadeOut(opts.speed);
                    }
                    else {
                        $row.nextAll("tr").hide();
                    }
                    $this.removeClass("shownChildren").addClass("hiddenChildren");
                }
                else {
                    $this.removeClass("hiddenChildren").addClass("shownChildren");
                    if (opts.fade) {
                        $row.nextAll("tr").fadeIn(opts.speed);
                    }
                    else {
                        $row.nextAll("tr").show();
                    }
                }
            }
        });

        if ($childNodes.length > 0) {
            if (opts.depth == -1 || level+1 < opts.depth) {
                var $downLineRow = $("<tr/>").addClass("lines");
                var $downLineCell = $("<td/>").attr("colspan", $childNodes.length*2);
                $downLineRow.append($downLineCell);

                var $downLineTable = $("<table cellpadding='0' cellspacing='0' border='0'>");
                $downLineTable.append("<tbody>");
                var $downLineLine = $("<tr/>").addClass("lines x");
                var $downLeft = $("<td>").addClass("line left");
                var $downRight = $("<td>").addClass("line right");
                $downLineLine.append($downLeft).append($downRight);
                $downLineTable.children("tbody").append($downLineLine);
                $downLineCell.append($downLineTable);

                $tbody.append($downLineRow);

                if ($childNodes.length > 0) {
                    $nodeDiv.addClass("hasChildren");
                    if (opts.showLevels == -1 || level < opts.showLevels-1) {
                        $nodeDiv.addClass("shownChildren");
                    }
                    else {
                        $nodeDiv.addClass("hiddenChildren");
                    }
                    if (opts.interactive) {
                        $nodeDiv.hover(function() {$(this).addClass(opts.hoverClass);}, function() {$(this).removeClass(opts.hoverClass)});
                    }
                }

                // Recursively make child nodes...
                var $linesRow = $("<tr/>").addClass("lines v");
                $childNodes.each(function() {
                    var $left = $("<td/>").addClass("line left top");
                    var $right = $("<td/>").addClass("line right top");
                    $linesRow.append($left).append($right);
                });
                $linesRow.find("td:first").removeClass("top");
                $linesRow.find("td:last").removeClass("top");
                $tbody.append($linesRow);
                var $childNodesRow = $("<tr/>");
                $childNodes.each(function(index) {
                    var $td = $("<td/>");
                    $td.attr("colspan", 2);
                    buildNode($(this), $td, level+1, index, opts);
                    $childNodesRow.append($td);
                });
                $tbody.append($childNodesRow);
            }
            else if (opts.stack) {
                var $stackNodes = $childNodes.clone();
                var $list = $("<ul class='stack'>").append($stackNodes).addClass("level"+level).addClass("node"+index).addClass("level"+level+"-node"+index);
                var $stackContainer = $("<div class='stack-container'>").append($list);
                $nodeDiv.after($stackContainer);
            }
        }

        if (opts.showLevels > -1 && level >= opts.showLevels-1) {
            $nodeRow.nextAll("tr").hide();
        }

        $table.append($tbody);
        $appendTo.append($table);
    };

})(jQuery);
