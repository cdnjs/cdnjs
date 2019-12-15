'use strict';

(function($) {

  $.fn.orgchart = function(options) {
    var defaultOptions = {
      nodeRelationship: 'relationship',
      nodeChildren: 'children',
      depth: 999,
      chartClass: '',
      exportButton: false,
      exportFilename: 'OrgChart'
    };

    var opts = $.extend(defaultOptions, options);

    switch (options) {
      case 'buildNode':
        return buildNode.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'buildChildNode':
        return buildChildNode.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'buildParentNode':
        return buildParentNode.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'buildSiblingNode':
        return buildSiblingNode.apply(this, Array.prototype.splice.call(arguments, 1));
    }

    // build the org-chart
    var $chartContainer = this;
    var data = opts.data;
    var $chart = $('<div>',{
      'class': 'orgchart' + (opts.chartClass !== '' ? ' ' + opts.chartClass : ''),
      'click': function(event) {
        if (!$(event.target).closest('.node').length) {
          $chart.find('.node.focused').removeClass('focused');
        }
      }
    });
    if ($.type(data) === 'object') {
      buildNode(data, $chart, 0, opts);
    } else {
      $.ajax({
        'url': data,
        'dataType': 'json',
        beforeSend: function () {
          $chart.append('<i class="fa fa-circle-o-notch fa-spin spinner"></i>');
        }
      })
      .done(function(data, textStatus, jqXHR) {
        buildNode(data, $chart, 0, opts);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      })
      .always(function() {
        $chart.children('.spinner').remove();
      });
    }
    $chartContainer.append($chart);

    // append the export button
    if (opts.exportButton) {
      var $exportBtn = $('<button>', {
        'class': 'oc-export-btn' + (opts.chartClass !== '' ? ' ' + opts.chartClass : ''),
        'text': 'Export',
        'click': function() {
          if ($(this).children('.spinner').length > 0) {
            return false;
          }
          var $mask = $chartContainer.find('.mask');
          if (!$mask.length) {
            $chartContainer.append('<div class="mask"><i class="fa fa-circle-o-notch fa-spin spinner"></i></div>');
          } else {
            $mask.removeClass('hidden');
          }
          html2canvas($chart[0], {
            'onrendered': function(canvas) {
              $chartContainer.find('.mask').addClass('hidden')
                .end().find('.oc-download-btn').attr('href', canvas.toDataURL())[0].click();
            }
          });
        }
      });
      var downloadBtn = '<a class="oc-download-btn' + (opts.chartClass !== '' ? ' ' + opts.chartClass : '') + '"'
        + ' download="' + opts.exportFilename + '.png"></a>';
      $chartContainer.append($exportBtn).append(downloadBtn);
    }

    return $chartContainer;
  };

  // determin whether the parent node of the specified node is visible on current chart view
  function getParentState($node) {
    if ($node.children('.spinner').length > 0) {
      return {};
    }
    var $parent = $node.closest('table').parent();
    if ($parent.is('td')) {
      if ($parent.closest('tr').siblings().is(':visible')) {
        return {"exist": true, "visible": true};
      }
      return {"exist": true, "visible": false};
    }
    return {"exist": false, "visible": false};
  }
  function getChildrenState($node) {
    if ($node.children('.spinner').length > 0) {
      return {};
    }
    var $children = $node.closest('tr').siblings();
    if ($children.length > 0) {
      if ($children.is(':visible')) {
        return {"exist": true, "visible": true};
      }
      return {"exist": true, "visible": false};
    }
    return {"exist": false, "visible": false};
  }
  function getSiblingsState($node) {
    if ($node.children('.spinner').length > 0) {
      return {};
    }
    var $siblings = $node.closest('table').parent('td').siblings();
    if ($siblings.length > 0) {
      if ($siblings.is(':visible')) {
        return {"exist": true, "visible": true};
      }
      return {"exist": true, "visible": false};
    }
    return {"exist": false, "visible": false};
  }

  // recursively hide the ancestor node and sibling nodes of the specified node
  function hideAncestorsSiblings($node, dtd) {
    var $nodeContainer = $node.closest('table').parent();
    if ($nodeContainer.parent().siblings('.node-cells').find('.spinner').length > 0) {
      $node.closest('div.orgchart').data('inAjax', false);
    }
    // firstly, hide the sibling nodes
    if (getSiblingsState($node).visible) {
      hideSiblings($node, false);
    }
    // hide the links
    var $temp = $nodeContainer.parent().siblings();
    var $links = $temp.slice(1);
    $links.css('visibility', 'hidden');
    // secondly, hide the superior nodes with animation
    var nodeOffset = $links.eq(0).outerHeight() + $links.eq(1).outerHeight();
    var $parent = $temp.eq(0).find('div.node');
    var grandfatherVisible = getParentState($parent).visible;
    if ($parent.length > 0 && $parent.is(':visible')) {
      $parent.animate({'opacity': 0, 'top': +nodeOffset}, 300, function() {
        $parent.removeAttr('style');
        $links.removeAttr('style');
        $temp.hide();
        if ($parent.closest('table').parent().is('.orgchart') || !grandfatherVisible) {
          dtd.resolve();
        }
      });
    }
    // if the current node has the parent node, hide it recursively
    if ($parent.length > 0 && grandfatherVisible) {
      hideAncestorsSiblings($parent, dtd);
    }

    return dtd.promise();
  }

  // show the parent node of the specified node
  function showAncestorsSiblings($node) {
    var dtd = $.Deferred();
    // just show only one superior level
    var $temp = $node.closest('table').closest('tr').siblings().show();

    // just show only one link
    $temp.eq(2).children().slice(1, $temp.eq(2).children().length - 1).hide();
    dtd.resolve();
    // show the the only parent node with animation
    $temp.eq(0).find('div.node')
      .animate({'opacity': 1, 'top': 0}, 300, function() {
        $(this).removeAttr('style');

      });

    return dtd.promise();
  }

  // recursively hide the descendant nodes of the specified node
  function hideDescendants($node) {
    var dtd = $.Deferred();
    if ($node.closest('tr').siblings(':last').find('.spinner').length > 0) {
      $node.closest('div.orgchart').data('inAjax', false);
    }
    var $links = $node.closest('tr').siblings(':lt(2)');
    $links.css('visibility', 'hidden');
    var nodeOffset = $links.eq(0).outerHeight() + $links.eq(1).outerHeight();
    $.when(
      $node.closest('tr').siblings(':last').find('div.node')
      .animate({'opacity': 0, 'top': -nodeOffset}, 300)
    )
    .done(function() {
      $links.removeAttr('style');
      $node.closest('tr').siblings().hide();
      dtd.resolve();
    });

    return dtd.promise();
  }

  // show the children nodes of the specified node
  function showDescendants($node) {
    var dtd = $.Deferred();
    // firstly, just show the only one inferior level of the child nodes
    var $temp = $node.closest('tr').siblings().show();
    dtd.resolve();
    // secondly, display the child nodes with animation
    var isLeaf = $temp.eq(2).children('td').length > 1 ? true : false;
    var $children = isLeaf ? $temp.eq(2).find('div.node') :
      $temp.eq(2).find('tr:first').find('div.node');
    $.when(
       $children.animate({'opacity': 1, 'top': 0}, 300)
     )
    .done(function() {
      $children.removeAttr('style');
    });
    // lastly, remember to hide all the inferior nodes of child nodes of current node
    $children.each(function(index, child){
      $(child).closest('tr').siblings().hide();
    });

    return dtd.promise();
  }

  function attachAnimationToSiblings(justSiblings, $siblings, offset, dtd) {
    if ($siblings.length > 0) {
      $.when(
        $siblings.find('div.node')
          .animate({'opacity': 0, 'left': offset}, 300)
      )
      .done(function() {
        $siblings.hide();
        if (justSiblings) {
          $siblings.closest('.orgchart').css('opacity', 0);// hack for firefox
        }
        $siblings.parent().prev().prev().removeAttr('style');
        var $temp = $siblings.parent().prev().children();
        $temp.eq(0).removeAttr('style');
        $temp.eq($temp.length - 1).removeAttr('style');
        dtd.resolve();
      });
    }
  }

  // hide the sibling nodes of the specified node
  function hideSiblings($node, justSiblings) {
    var dtd = $.Deferred();
    var $nodeContainer = $node.closest('table').parent();
    if ($nodeContainer.siblings().find('.spinner').length > 0) {
      $node.closest('div.orgchart').data('inAjax', false);
    }
    var nodeOffset = $node.outerWidth();
    // firstly, hide the links but take up space
    var $upperLink = $nodeContainer.parent().prev().prev();
    $upperLink.css('visibility', 'hidden')
    var $temp = $nodeContainer.parent().prev().children();
    $temp.slice(1, $temp.length -1).hide();
    $temp.eq(0).css('visibility', 'hidden');
    $temp.eq($temp.length - 1).css('visibility', 'hidden');
    // secondly, hide the sibling nodes with animation simultaneously
    attachAnimationToSiblings(justSiblings, $nodeContainer.prevAll(), +nodeOffset, dtd);
    attachAnimationToSiblings(justSiblings, $nodeContainer.nextAll(), -nodeOffset, dtd);

    return dtd.promise();
  }

  // show the sibling nodes of the specified node
  function showSiblings($node) {
    var dtd = $.Deferred();
    // firstly, show the sibling td tags
    var $siblings = $node.closest('table').parent().siblings().show();
    // secondly, show the links
    var $parent = $node.closest('table').closest('tr').siblings();
    var $lowerLinks = $parent.eq(2).children();
    $lowerLinks.slice(1, $lowerLinks.length -1).show();
    // thirdly, do some cleaning stuff
    if ($node.children('.topEdge').data('parentState').visible) {
      $siblings.each(function(index, sibling){
        $(sibling).find('div.node').closest('tr').siblings().hide();
      });
    } else {
      $parent.show();
    }
    dtd.resolve();
    // lastly, show the sibling nodes with animation
    $siblings.find('div.node').animate({'opacity': 1, 'left': 0}, 300);

    return dtd.promise();
  }

  // start up loading status for requesting new nodes
  function startLoadingStatus($arrow, $node, options) {
    var $chart = $node.closest('div.orgchart');
    if (typeof $chart.data('inAjax') !== 'undefined' && $chart.data('inAjax') === true) {
      return false;
    }

    $arrow.hide();
    $node.append('<i class="fa fa-circle-o-notch fa-spin spinner"></i>');
    $node.children().not('.spinner').css('opacity', 0.2);
    $chart.data('inAjax', true);
    $('.oc-export-btn' + (options.chartClass !== '' ? '.' + options.chartClass : '')).prop('disabled', true);
    return true;
  }

  // terminate loading status for requesting new nodes
  function endLoadingStatus($arrow, $node, options) {
    var $chart = $node.closest('div.orgchart');
    $arrow.show();
    $node.find('.spinner').remove();
    $node.children().removeAttr('style');
    $chart.data('inAjax', false);
    $('.oc-export-btn' + (options.chartClass !== '' ? '.' + options.chartClass : '')).prop('disabled', false);
  }

  // whether the cursor is hovering over the node
  function isInAction($node) {
    return $node.children('.edge').attr('class').indexOf('fa-') > -1 ? true : false;
  }

  function switchUpDownArrow($arrow) {
    $arrow.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
  }

  function collapseArrow($node) {
    switchLeftRightArrow($node, false);
    $node.children('.topEdge')
      .removeClass('fa-chevron-up').addClass('fa-chevron-down');
    $node.children('.topEdge').data('parentState').visible = true;
  }

  function switchLeftRightArrow($node, isExpand) {
    if (isExpand) {
      $node.children('.leftEdge')
        .removeClass('fa-chevron-right').addClass('fa-chevron-left');
      $node.children('.rightEdge')
        .removeClass('fa-chevron-left').addClass('fa-chevron-right');
    } else {
      $node.children('.leftEdge')
        .removeClass('fa-chevron-left').addClass('fa-chevron-right');
      $node.children('.rightEdge')
        .removeClass('fa-chevron-right').addClass('fa-chevron-left');
    }
  }

  // create node
  function createNode(nodeData, opts) {
    // construct the content of node
    var $nodeDiv = $('<div>', {'id': nodeData[opts.nodeId]})
      .addClass('node')
      .append('<div class="title">' + nodeData[opts.nodeTitle] + '</div>')
      .append(typeof opts.nodeContent !== 'undefined' ? '<div class="content">' + nodeData[opts.nodeContent] + '</div>' : '');
    // append 4 directions arrows
    if (Number(nodeData[opts.nodeRelationship].substr(0,1))) {
      $nodeDiv.append('<i class="edge verticalEdge topEdge fa"></i>');
    }
    if(Number(nodeData[opts.nodeRelationship].substr(1,1))) {
      $nodeDiv.append('<i class="edge horizontalEdge rightEdge fa"></i>' +
        '<i class="edge horizontalEdge leftEdge fa"></i>');
    }
    if(Number(nodeData[opts.nodeRelationship].substr(2,1))) {
      $nodeDiv.find('.title').prepend('<i class="fa fa-users symbol"></i>')
      $nodeDiv.append('<i class="edge verticalEdge bottomEdge fa"></i>');
    }

    // define hover event handler
    $nodeDiv.on('mouseenter mouseleave', function(event) {
      var $node = $(this);
      var $edge = $node.children('.edge');
      var $topEdge = $node.children('.topEdge');
      var $rightEdge = $node.children('.rightEdge');
      var $bottomEdge = $node.children('.bottomEdge');
      var $leftEdge = $node.children('.leftEdge');
      var temp;
      if (event.type === 'mouseenter') {
        if ($topEdge.length) {
          temp = getParentState($node);
          if (!$.isEmptyObject(temp)) {
            $topEdge.data('parentState', temp);
          }
          if ($topEdge.data('parentState').visible) {
            $topEdge.removeClass('fa-chevron-up').addClass('fa-chevron-down');
          } else {
            $topEdge.removeClass('fa-chevron-down').addClass('fa-chevron-up');
          }
        }
        if ($bottomEdge.length) {
          temp = getChildrenState($node);
          if (!$.isEmptyObject(temp)) {
            $bottomEdge.data('childrenState', temp);
          }
          if($bottomEdge.data('childrenState').visible) {
            $bottomEdge.removeClass('fa-chevron-down').addClass('fa-chevron-up');
          } else {
            $bottomEdge.removeClass('fa-chevron-up').addClass('fa-chevron-down');
          }
        }
        if ($leftEdge.length) {
          temp = getSiblingsState($node);
          if (!$.isEmptyObject(temp)) {
            $rightEdge.data('siblingsState', temp);
            $leftEdge.data('siblingsState', temp);
          }
          if($leftEdge.data('siblingsState').visible) {
            switchLeftRightArrow($node, false);
          } else {
            switchLeftRightArrow($node, true);
          }
        }
      } else {
        $topEdge.add($bottomEdge).removeClass('fa-chevron-up fa-chevron-down');
        $rightEdge.add($leftEdge).removeClass('fa-chevron-right fa-chevron-left');
      }
    });

    // define click event handler
    $nodeDiv.on('click', function(event) {
      var $node = $(this);
      $node.closest('.orgchart').find('.focused').removeClass('focused');
      $node.addClass('focused');
    });

    // define click event handler for the top edge
    $nodeDiv.children('.topEdge').on('click', function(event) {
      var $that = $(this);
      var $node = $that.parent();
      var parentState = $that.data('parentState');
      if ($node.children('.spinner').length > 0) {
        return false;
      }
      if (parentState.exist) {
        if ($node.closest('table').closest('tr').siblings(':first').find('div.node').is(':animated')) {
          return ;
        }
        // hide the ancestor nodes and sibling nodes of the specified node
        if (parentState.visible) {
          var dtd = $.Deferred();
          $.when(hideAncestorsSiblings($node, dtd))
　　        .done(function(){
              parentState.visible = false;
              if ($node.children('.leftEdge').length > 0) {
                $node.children('.leftEdge').data('siblingsState').visible = false;
                $node.children('.rightEdge').data('siblingsState').visible = false;
              }
              if (isInAction($node)) {
                switchUpDownArrow($that);
                switchLeftRightArrow($node, true);
              }
            })
　　        .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
        } // show the ancestors and siblings
        else {
          $.when(showAncestorsSiblings($node))
　　        .done(function(){
              parentState.visible = true;
              switchUpDownArrow($that);
            })
　　        .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
        }
      } else {
        // load the new parent node of the specified node by ajax request
        var nodeId = $that.parent()[0].id;
        // start up loading status
        if (startLoadingStatus($that, $node, opts)) {
        // load new nodes
          $.ajax({
            "url": opts.ajaxURL.parent + nodeId + "/",
            "dataType": "json"
          })
          .done(function(data, textStatus, jqXHR) {
            if ($node.closest('div.orgchart').data('inAjax') === true) {
              if (!$.isEmptyObject(data)) {
                $.when(buildParentNode(data, $that.closest('table'), opts))
　　              .done(function(){
                    parentState.visible = true;
                    if (isInAction($node)) {
                      switchUpDownArrow($that);
                    }
                  })
　　              .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
              }
              parentState.exist = true;
            }
            // terminate the loading status
            endLoadingStatus($that, $node, opts);
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            parentState.exist = true;
            // terminate the loading status
            endLoadingStatus($that, $node, opts);
          });
        }
      }
    });

    // bind click event handler for the bottom edge
    $nodeDiv.children('.bottomEdge').on('click', function(event) {
      var $that = $(this);
      var $node = $that.parent();
      var childrenState = $that.data('childrenState');
      if ($node.children('.spinner').length > 0) {
        return false;
      }
      if (childrenState.exist) {
        if ($node.closest('tr').siblings(':last').find('div.node').is(':animated')) {
          return ;
        }
        // hide the descendant nodes of the specified node
        if (childrenState.visible) {
          $.when(hideDescendants($node))
　　        .done(function(){
              childrenState.visible = false;
              if (isInAction($node)) {
                switchUpDownArrow($that);
              }
            })
　　        .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
        } // show the descendants
        else {
          $.when(showDescendants($node))
　　        .done(function(){
              childrenState.visible = true;
              switchUpDownArrow($that);
            })
　　        .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
        }
      } else {
        // load the new children nodes of the specified node by ajax request
        var nodeId = $that.parent()[0].id;
        if (startLoadingStatus($that, $node, opts)) {
          $.ajax({
            "url": opts.ajaxURL.children + nodeId + "/",
            "dataType": "json"
          })
          .done(function(data, textStatus, jqXHR) {
            if ($node.closest('div.orgchart').data('inAjax') === true) {
              if (data.children.length !== 0) {
                var siblingCount = data.children.length;
                var dtd = $.Deferred();
                var childCount = 0;
                $.when(buildChildNode(data, $that.closest('tbody'), false, opts, function() {
                  if (++childCount === siblingCount + 1) {
                    dtd.resolve();
                    return dtd.promise();
                  }
                }))
　　            .done(function(){
                  childrenState.visible = true;
                  if (isInAction($node)) {
                    switchUpDownArrow($that);
                  }
                })
　　            .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
              }
              childrenState.exist = true;
            }
            endLoadingStatus($that, $node, opts);
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            childrenState.exist = true;
            endLoadingStatus($that, $node, opts);
          });
        }
      }
    });

    // bind click event handler for the left and right edges
    $nodeDiv.children('.leftEdge, .rightEdge').on('click', function(event) {
      var $that = $(this);
      var $node = $that.parent();
      var siblingsState = $that.data('siblingsState');
      if ($node.children('.spinner').length > 0) {
        return false;
      }
      if (siblingsState.exist) {
        if ($node.closest('table').parent().siblings().find('div.node').is(':animated')) {
          return ;
        }
        // hide the sibling nodes of the specified node
        if (siblingsState.visible) {
          $.when(hideSiblings($node, true))
　　        .done(function(){
              setTimeout(function() {
                $node.closest('.orgchart').css('opacity', '');// hack for firefox
                siblingsState.visible = false;
                if (isInAction($node)) {
                  switchLeftRightArrow($node, true);
                }
              }, 0);
            })
　　        .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
        } // show the siblings
        else {
          $.when(showSiblings($node))
　　        .done(function(){
              siblingsState.visible = true;
              collapseArrow($node);
            })
　　        .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
        }
      } else {
        // load the new sibling nodes of the specified node by ajax request
        var nodeId = $that.parent()[0].id;
        var withParent = !$that.siblings('.topEdge').data('parentState').exist;
        var url = (withParent) ? opts.ajaxURL.families : opts.ajaxURL.siblings;
        if (startLoadingStatus($that, $node, opts)) {
          $.ajax({
            "url": url + nodeId + "/",
            "dataType": "json"
          })
          .done(function(data, textStatus, jqXHR) {
            if ($node.closest('div.orgchart').data('inAjax') === true) {
              if (data.siblings || data.children) {
                $.when(buildSiblingNode(data, $that.closest('table'), opts))
　　            .done(function(){
                  siblingsState.visible = true;
                  if (isInAction($node)) {
                    collapseArrow($node);
                  }
                })
　　            .fail(function(){ console.log('failed to adjust the position of org-chart!'); });
              }
              $node.children('.topEdge').data('parentState').exist = true;
              siblingsState.exist = true;
              if ($that.is('.leftEdge')) {
                $that.siblings('.rightEdge').data('siblingsState', {'exist': true, 'visible': true});
              } else {
                $that.siblings('.leftEdge').data('siblingsState', {'exist': true, 'visible': true});
              }
            }
            endLoadingStatus($that, $node, opts);
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            siblingsState.exist = true;
            endLoadingStatus($that, $node, opts);
          });
        }
      }
    });
    // remedy the defect of css transformation - right arrow can not be translated like left one
    $nodeDiv.children('.leftEdge').hover(
      function() {
        var $rightEdge = $(this).siblings('.rightEdge');
        if (!getSiblingsState($(this)).visible) {
          $rightEdge.addClass('rightEdgeTransitionToRight');
        } else {
          $rightEdge.addClass('rightEdgeTransitionToLeft');
        }
      },
      function() {
        $(this).siblings('.rightEdge')
          .removeClass('rightEdgeTransitionToRight rightEdgeTransitionToLeft');
      }
    );

    // allow user to append dom modification after finishing node create of orgchart 
    if (opts.createNode) {
      opts.createNode($nodeDiv, nodeData);
    }

    return $nodeDiv;
  }
  // recursively build the tree
  function buildNode (nodeData, $appendTo, level, opts, callback) {
    var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
    var $tbody = $("<tbody/>");

    // Construct the node
    var $nodeRow = $("<tr/>").addClass("node-cells");
    var $nodeCell = $("<td/>").addClass("node-cell").attr("colspan", 2);
    var $childNodes = nodeData[opts.nodeChildren];
    if ($childNodes && $childNodes.length > 1) {
      $nodeCell.attr("colspan", $childNodes.length * 2);
    }
    var $nodeDiv = createNode(nodeData, opts);
    $nodeCell.append($nodeDiv);
    $nodeRow.append($nodeCell);
    $tbody.append($nodeRow);

    if ($childNodes && $childNodes.length > 0) {
      // recurse until leaves found (-1) or to the level specified
      var $childNodesRow;
      // if (opts.depth == -1 || (level + 1 < opts.depth)) {
      var $downLineRow = $("<tr/>");
      var $downLineCell = $("<td/>").attr("colspan", $childNodes.length * 2);
      $downLineRow.append($downLineCell);

      // draw the connecting line from the parent node to the horizontal line
      var $downLine = $("<div></div>").addClass("down");
      $downLineCell.append($downLine);
      if (level + 1 < opts.depth) {
        $tbody.append($downLineRow);
      } else {
        $tbody.append($downLineRow.hide());
      }

      // draw the horizontal lines
      var $linesRow = $("<tr/>");
      $.each($childNodes, function() {
        var $left = $("<td>&nbsp;</td>").addClass("right top");
        var $right = $("<td>&nbsp;</td>").addClass("left top");
        $linesRow.append($left).append($right);
      });

      // horizontal line shouldn't extend beyond the first and last child branches
      $linesRow.find("td:first").removeClass("top").end().find("td:last").removeClass("top");
      if (level + 1 < opts.depth) {
        $tbody.append($linesRow);
      } else {
        $tbody.append($linesRow.hide());
      }
      $childNodesRow = $("<tr/>");
      $.each($childNodes, function() {
        var $td = $("<td class='node-container'/>");
        $td.attr("colspan", 2);
        // recurse through children lists and items
        if (callback) {
          buildNode(this, $td, level + 1, opts, callback);
        } else {
          buildNode(this, $td, level + 1, opts);
        }
        if (level + 1 < opts.depth) {
          $childNodesRow.append($td);
        } else {
          $childNodesRow.append($td).hide();
        }
      });
      $tbody.append($childNodesRow);
    }

    $table.append($tbody);
    $appendTo.append($table);

    // fire up callback every time of building up a node
    if (callback) {
      callback();
    }

  }

  // build the child nodes of specific node
  function buildChildNode (nodeData, $appendTo, isChildNode, opts, callback) {
    var $childNodes = nodeData.children || nodeData.siblings;
    var $table, $tbody;
    if (isChildNode) {
      $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
      $tbody = $('<tbody/>');

      // create the node
      var $nodeRow = $("<tr/>").addClass("node-cells");
      var $nodeCell = $("<td/>").addClass("node-cell").attr("colspan", 2);
      var $nodeDiv = createNode(nodeData, opts);
      $nodeCell.append($nodeDiv);
      $nodeRow.append($nodeCell);
      $tbody.append($nodeRow);
    } else {
      $appendTo.children('tr:first').children('td:first')
        .attr('colspan', $childNodes.length * 2);
    }

    if ($childNodes && $childNodes.length > 0) {
      // recurse until leaves found (-1) or to the level specified
      var $downLineRow = $("<tr/>");
      var $downLineCell = $("<td/>").attr("colspan", $childNodes.length * 2);
      $downLineRow.append($downLineCell);

      // draw the connecting line from the parent node to the horizontal line
      var $downLine = $("<div></div>").addClass("down");
      $downLineCell.append($downLine);
      if (isChildNode) {
        $tbody.append($downLineRow);
      } else {
        $appendTo.append($downLineRow);
      }

      // Draw the horizontal lines
      var $linesRow = $("<tr/>");
      $.each($childNodes, function() {
        var $left = $("<td>&nbsp;</td>").addClass("right top");
        var $right = $("<td>&nbsp;</td>").addClass("left top");
        $linesRow.append($left).append($right);
      });

      // horizontal line shouldn't extend beyond the first and last child branches
      $linesRow.find("td:first").removeClass("top").end().find("td:last").removeClass("top");

      if (isChildNode) {
        $tbody.append($linesRow);
      } else {
        $appendTo.append($linesRow);
      }

      var $childNodesRow = $("<tr/>");
      $.each($childNodes, function() {
        var $td = $("<td class='node-container'/>");
        $td.attr("colspan", 2);
        // recurse through children lists and items
        if (callback) {
          buildChildNode(this, $td, true, opts, callback);
        } else {
          buildChildNode(this, $td, true, opts);
        }
        $childNodesRow.append($td);
      });

      if (isChildNode) {
        $tbody.append($childNodesRow);
      } else {
        $appendTo.append($childNodesRow);
      }
    }

    if (isChildNode) {
      $table.append($tbody);
      $appendTo.append($table);
    }

    // fire up callback every time of building up a node
    if (callback) {
      callback();
    }

  }

  // build the parent node of specific node
  function buildParentNode(nodeData, $currentChart, opts) {
    var dtd = $.Deferred();
    var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
    var $tbody = $('<tbody/>');

    // Construct the node
    var $nodeRow = $("<tr/>").addClass("node-cells");
    var $nodeCell = $("<td/>").addClass("node-cell").attr("colspan", 2);
    var $nodeDiv = createNode(nodeData, opts);
    $nodeCell.append($nodeDiv);
    $nodeRow.append($nodeCell);
    $tbody.append($nodeRow);

    // recurse until leaves found (-1) or to the level specified
    var $downLineRow = $("<tr/>");
    var $downLineCell = $("<td/>").attr("colspan", 2);
    $downLineRow.append($downLineCell);

    // draw the connecting line from the parent node to the horizontal line
    var $downLine = $("<div></div>").addClass("down");
    $downLineCell.append($downLine);
    $tbody.append($downLineRow);


    // Draw the horizontal lines
    var $linesRow = $("<tr/>");
    var $left = $("<td>&nbsp;</td>").addClass("right top");
    var $right = $("<td>&nbsp;</td>").addClass("left top");
    $linesRow.append($left).append($right);

    // horizontal line shouldn't extend beyond the first and last child branches
    $linesRow.find("td:first").removeClass("top").end().find("td:last").removeClass("top");
    $tbody.append($linesRow);

    $currentChart.closest('div.orgchart')
      .prepend($table.append($tbody)).find('tbody:first')
      .append($('<tr/>').append($('<td class="node-container" colspan="2" />')
        .append($currentChart)));

    dtd.resolve();
    return dtd.promise();
  }

  // subsequent processing of build sibling nodes
  function subsequentProcess($target, siblingCount) {
    $target.parent().prevAll('tr:gt(0)').children('td')
      .attr('colspan', (siblingCount + 1) * 2)
      .end().next().children('td').eq(0)
      .after($('<td class="left top">&nbsp;</td><td class="right top">&nbsp;</td>'));
  }

  // build the sibling nodes of specific node
  function buildSiblingNode(nodeData, $currentChart, opts) {
    var dtd = $.Deferred();
    var siblingCount = nodeData.siblings ? nodeData.siblings.length : nodeData.children.length;
    var insertPostion = (siblingCount > 1) ? Math.floor(siblingCount/2 - 1) : 0;
    // just build the sibling nodes for the specific node
    if ($currentChart.parent().is('td.node-container')) {
      var $parent = $currentChart.closest('tr').prevAll('tr:last');
      if ($parent.is(':hidden')) {
        $parent.show();
      }
      $currentChart.closest('tr').prevAll('tr:lt(2)').remove();
      var childCount = 0;
      buildChildNode(nodeData, $currentChart.closest('tbody'), false, opts, function() {
        if (++childCount === siblingCount + 1) {
          subsequentProcess($currentChart.closest('tbody').children('tr:last').children('td')
            .eq(insertPostion).after($currentChart.closest('td').unwrap()), siblingCount);
          dtd.resolve();
          return dtd.promise();
        }
      });
    } else { // build the sibling nodes and parent node for the specific ndoe
      var nodeCount = 0;
      buildNode(nodeData, $currentChart.closest('div.orgchart'), 0, opts,
        function() {
          if (++nodeCount === siblingCount + 1) {
            subsequentProcess($currentChart.next().children('tbody:first').children('tr:last')
              .children('td').eq(insertPostion).after($('<td class="node-container" colspan="2" />')
              .append($currentChart)), siblingCount);
            dtd.resolve();
            return dtd.promise();
        }
      });
    }

  }

})(jQuery);
