/*
 * jQuery OrgChart Plugin
 * https://github.com/dabeng/OrgChart
 *
 * Demos of jQuery OrgChart Plugin
 * http://dabeng.github.io/OrgChart/
 *
 * Copyright 2016, dabeng
 * http://dabeng.github.io/
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
'use strict';

(function(factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {
  $.fn.orgchart = function(options) {
    var defaultOptions = {
      'nodeTitle': 'name',
      'nodeId': 'id',
      'toggleSiblingsResp': false,
      'depth': 999,
      'chartClass': '',
      'exportButton': false,
      'exportFilename': 'OrgChart',
      'exportFileextension': 'png',
      'parentNodeSymbol': 'fa-users',
      'draggable': false,
      'direction': 't2b',
      'pan': false,
      'zoom': false,
      'zoominLimit': 7,
      'zoomoutLimit': 0.5
    };

    switch (options) {
      case 'buildHierarchy':
        return buildHierarchy.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'addChildren':
        return addChildren.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'addParent':
        return addParent.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'addSiblings':
        return addSiblings.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'removeNodes':
        return removeNodes.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'getHierarchy':
        return getHierarchy.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'hideParent':
        return hideParent.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'showParent':
        return showParent.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'hideChildren':
        return hideChildren.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'showChildren':
        return showChildren.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'hideSiblings':
        return hideSiblings.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'showSiblings':
        return showSiblings.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'getNodeState':
        return getNodeState.apply(this, Array.prototype.splice.call(arguments, 1));
      case 'getRelatedNodes':
        return getRelatedNodes.apply(this, Array.prototype.splice.call(arguments, 1));
      default: // initiation time
        var opts = $.extend(defaultOptions, options);
    }

    // build the org-chart
    var $chartContainer = this;
    var data = opts.data;
    var $chart = $('<div>', {
      'data': { 'options': opts },
      'class': 'orgchart' + (opts.chartClass !== '' ? ' ' + opts.chartClass : '') + (opts.direction !== 't2b' ? ' ' + opts.direction : ''),
      'click': function(event) {
        if (!$(event.target).closest('.node').length) {
          $chart.find('.node.focused').removeClass('focused');
        }
      }
    });
    if ($.type(data) === 'object') {
      if (data instanceof $) { // ul datasource
        buildHierarchy($chart, buildJsonDS(data.children()), 0, opts);
      } else { // local json datasource
        buildHierarchy($chart, opts.ajaxURL ? data : attachRel(data, '00'), 0, opts);
      }
    } else {
      $.ajax({
        'url': data,
        'dataType': 'json',
        'beforeSend': function () {
          $chart.append('<i class="fa fa-circle-o-notch fa-spin spinner"></i>');
        }
      })
      .done(function(data, textStatus, jqXHR) {
        buildHierarchy($chart, opts.ajaxURL ? data : attachRel(data, '00'), 0, opts);
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
    if (opts.exportButton && !$chartContainer.find('.oc-export-btn').length) {
      var $exportBtn = $('<button>', {
        'class': 'oc-export-btn' + (opts.chartClass !== '' ? ' ' + opts.chartClass : ''),
        'text': 'Export',
        'click': function(e) {
          e.preventDefault();
          if ($(this).children('.spinner').length) {
            return false;
          }
          var $mask = $chartContainer.find('.mask');
          if (!$mask.length) {
            $chartContainer.append('<div class="mask"><i class="fa fa-circle-o-notch fa-spin spinner"></i></div>');
          } else {
            $mask.removeClass('hidden');
          }
          var sourceChart = $chartContainer.addClass('canvasContainer').find('.orgchart:visible').get(0);
          var flag = opts.direction === 'l2r' || opts.direction === 'r2l';
          html2canvas(sourceChart, {
            'width': flag ? sourceChart.clientHeight : sourceChart.clientWidth,
            'height': flag ? sourceChart.clientWidth : sourceChart.clientHeight,
            'onclone': function(cloneDoc) {
              $(cloneDoc).find('.canvasContainer').css('overflow', 'visible')
                .find('.orgchart:visible:first').css('transform', '');
            },
            'onrendered': function(canvas) {
              $chartContainer.find('.mask').addClass('hidden');
              if (opts.exportFileextension.toLowerCase() === 'pdf') {
                var doc = {};
                var docWidth = Math.floor(canvas.width * 0.2646);
                var docHeight = Math.floor(canvas.height * 0.2646);
                if (docWidth > docHeight) {
                  doc = new jsPDF('l', 'mm', [docWidth, docHeight]);
                } else {
                  doc = new jsPDF('p', 'mm', [docHeight, docWidth]);
                }
                doc.addImage(canvas.toDataURL(), 'png', 0, 0);
                doc.save(opts.exportFilename + '.pdf');
              } else {
                var isWebkit = 'WebkitAppearance' in document.documentElement.style;
                var isFf = !!window.sidebar;
                var isEdge = navigator.appName === 'Microsoft Internet Explorer' || (navigator.appName === "Netscape" && navigator.appVersion.indexOf('Edge') > -1);

                if ((!isWebkit && !isFf) || isEdge) {
                  window.navigator.msSaveBlob(canvas.msToBlob(), opts.exportFilename + '.png');
                }
                else {
                  $chartContainer.find('.oc-download-btn').attr('href', canvas.toDataURL())[0].click();
                }
              }
            }
          })
          .then(function() {
            $chartContainer.removeClass('canvasContainer');
          }, function() {
            $chartContainer.removeClass('canvasContainer');
          });
        }
      });
      $chartContainer.append($exportBtn);
      if (opts.exportFileextension.toLowerCase() !== 'pdf') {
        var downloadBtn = '<a class="oc-download-btn' + (opts.chartClass !== '' ? ' ' + opts.chartClass : '') + '"'
          + ' download="' + opts.exportFilename + '.png"></a>';
        $exportBtn.after(downloadBtn);
      }
    }

    if (opts.pan) {
      $chartContainer.css('overflow', 'hidden');
      $chart.on('mousedown touchstart',function(e){
        var $this = $(this);
        if ($(e.target).closest('.node').length || (e.touches && e.touches.length > 1)) {
          $this.data('panning', false);
          return;
        } else {
          $this.css('cursor', 'move').data('panning', true);
        }
        var lastX = 0;
        var lastY = 0;
        var lastTf = $this.css('transform');
        if (lastTf !== 'none') {
          var temp = lastTf.split(',');
          if (lastTf.indexOf('3d') === -1) {
            lastX = parseInt(temp[4]);
            lastY = parseInt(temp[5]);
          } else {
            lastX = parseInt(temp[12]);
            lastY = parseInt(temp[13]);
          }
        }
        var startX = 0;
        var startY = 0;
        if (!e.targetTouches) { // pand on desktop
          startX = e.pageX - lastX;
          startY = e.pageY - lastY;
        } else if (e.targetTouches.length === 1) { // pan on mobile device
          startX = e.targetTouches[0].pageX - lastX;
          startY = e.targetTouches[0].pageY - lastY;
        } else if (e.targetTouches.length > 1) {
          return;
        }
        $chart.on('mousemove touchmove',function(e) {
          if (!$this.data('panning')) {
            return;
          }
          var newX = 0;
          var newY = 0;
          if (!e.targetTouches) { // pand on desktop
            newX = e.pageX - startX;
            newY = e.pageY - startY;
          } else if (e.targetTouches.length === 1) { // pan on mobile device
            newX = e.targetTouches[0].pageX - startX;
            newY = e.targetTouches[0].pageY - startY;
          } else if (e.targetTouches.length > 1) {
            return;
          }
          var lastTf = $this.css('transform');
          if (lastTf === 'none') {
            if (lastTf.indexOf('3d') === -1) {
              $this.css('transform', 'matrix(1, 0, 0, 1, ' + newX + ', ' + newY + ')');
            } else {
              $this.css('transform', 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + newX + ', ' + newY + ', 0, 1)');
            }
          } else {
            var matrix = lastTf.split(',');
            if (lastTf.indexOf('3d') === -1) {
              matrix[4] = ' ' + newX;
              matrix[5] = ' ' + newY + ')';
            } else {
              matrix[12] = ' ' + newX;
              matrix[13] = ' ' + newY;
            }
            $this.css('transform', matrix.join(','));
          }
        });
      });
      $(document).on('mouseup touchend',function(e) {
        if ($chart.data('panning')) {
          $chart.data('panning', false).css('cursor', 'default').off('mousemove');
        }
      });
    }

    if (opts.zoom) {
      $chartContainer.on('wheel', function(event) {
        event.preventDefault();
        var newScale  = 1 + (event.originalEvent.deltaY > 0 ? -0.2 : 0.2);
        setChartScale($chart, newScale);
      });

      $chartContainer.on('touchstart',function(e){
        if(e.touches && e.touches.length === 2) {
          $chart.data('pinching', true);
          var dist = getPinchDist(e);
          $chart.data('pinchDistStart', dist);
        }
      });
      $(document).on('touchmove',function(e) {
        if($chart.data('pinching')) {
           var dist = getPinchDist(e);
          $chart.data('pinchDistEnd', dist);
        }
      })
      .on('touchend',function(e) {
        if($chart.data('pinching')) {
          $chart.data('pinching', false);
          var diff = $chart.data('pinchDistEnd') - $chart.data('pinchDistStart');
          if (diff > 0) {
            setChartScale($chart, 1.2);
          } else if (diff < 0) {
            setChartScale($chart, 0.8);
          }
        }
      });
    }

    return $chartContainer;
  };

  function getPinchDist(e) {
    return Math.sqrt((e.touches[0].clientX - e.touches[1].clientX) * (e.touches[0].clientX - e.touches[1].clientX) +
      (e.touches[0].clientY - e.touches[1].clientY) * (e.touches[0].clientY - e.touches[1].clientY));
  }

  function setChartScale($chart, newScale) {
    var opts = $chart.data('options');
    var lastTf = $chart.css('transform');
    var matrix = '';
    var targetScale = 1;
    if (lastTf === 'none') {
      $chart.css('transform', 'scale(' + newScale + ',' + newScale + ')');
    } else {
      matrix = lastTf.split(',');
      if (lastTf.indexOf('3d') === -1) {
        targetScale = window.parseFloat(matrix[3]) * newScale;
        if (targetScale > opts.zoomoutLimit && targetScale < opts.zoominLimit) {
          $chart.css('transform', lastTf + ' scale(' + newScale + ',' + newScale + ')');
        }
      } else {
        targetScale = window.parseFloat(matrix[1]) * newScale;
        if (targetScale > opts.zoomoutLimit && targetScale < opts.zoominLimit) {
          $chart.css('transform', lastTf + ' scale3d(' + newScale + ',' + newScale + ', 1)');
        }
      }
    }
  }

  function buildJsonDS($li) {
    var subObj = {
      'name': $li.contents().eq(0).text().trim(),
      'relationship': ($li.parent().parent().is('li') ? '1': '0') + ($li.siblings('li').length ? 1: 0) + ($li.children('ul').length ? 1 : 0)
    };
    if ($li[0].id) {
      subObj.id = $li[0].id;
    }
    $li.children('ul').children().each(function() {
      if (!subObj.children) { subObj.children = []; }
      subObj.children.push(buildJsonDS($(this)));
    });
    return subObj;
  }

  function attachRel(data, flags) {
    data.relationship = flags + (data.children && data.children.length > 0 ? 1 : 0);
    if (data.children) {
      data.children.forEach(function(item) {
        attachRel(item, '1' + (data.children.length > 1 ? 1 : 0));
      });
    }
    return data;
  }

  function loopChart($chart) {
    var $tr = $chart.find('tr:first');
    var subObj = { 'id': $tr.find('.node')[0].id };
    $tr.siblings(':last').children().each(function() {
      if (!subObj.children) { subObj.children = []; }
      subObj.children.push(loopChart($(this)));
    });
    return subObj;
  }

  function getHierarchy($chart) {
    var $chart = $chart || $(this).find('.orgchart');
    if (!$chart.find('.node:first')[0].id) {
      return 'Error: Nodes of orghcart to be exported must have id attribute!';
    }
    return loopChart($chart);
  }

  // detect the exist/display state of related node
  function getNodeState($node, relation) {
    var $target = {};
    if (relation === 'parent') {
      $target = $node.closest('.nodes').siblings(':first');
    } else if (relation === 'children') {
      $target = $node.closest('tr').siblings();
    } else if (relation === 'siblings') {
      $target = $node.closest('table').parent().siblings();
    }
    if ($target.length) {
      if ($target.is(':visible')) {
        return { 'exist': true, 'visible': true };
      }
      return { 'exist': true, 'visible': false };
    }
    return { 'exist': false, 'visible': false };
  }

  // find the related nodes
  function getRelatedNodes($node, relation) {
    if (relation === 'parent') {
      return $node.closest('.nodes').parent().children(':first').find('.node');
    } else if (relation === 'children') {
      return $node.closest('table').children(':last').children().find('.node:first');
    } else if (relation === 'siblings') {
      return $node.closest('table').parent().siblings().find('.node:first');
    }
  }

  // recursively hide the ancestor node and sibling nodes of the specified node
  function hideParent($node) {
    var $temp = $node.closest('table').closest('tr').siblings();
    if ($temp.eq(0).find('.spinner').length) {
      $node.closest('.orgchart').data('inAjax', false);
    }
    // hide the sibling nodes
    if (getNodeState($node, 'siblings').visible) {
      hideSiblings($node);
    }
    // hide the lines
    var $lines = $temp.slice(1);
    $lines.css('visibility', 'hidden');
    // hide the superior nodes with transition
    var $parent = $temp.eq(0).find('.node');
    var grandfatherVisible = getNodeState($parent, 'parent').visible;
    if ($parent.length && $parent.is(':visible')) {
      $parent.addClass('slide slide-down').one('transitionend', function() {
        $parent.removeClass('slide');
        $lines.removeAttr('style');
        $temp.addClass('hidden');
      });
    }
    // if the current node has the parent node, hide it recursively
    if ($parent.length && grandfatherVisible) {
      hideParent($parent);
    }
  }

  // show the parent node of the specified node
  function showParent($node) {
    // just show only one superior level
    var $temp = $node.closest('table').closest('tr').siblings().removeClass('hidden');
    // just show only one line
    $temp.eq(2).children().slice(1, -1).addClass('hidden');
    // show parent node with animation
    var parent = $temp.eq(0).find('.node')[0];
    repaint(parent);
    $(parent).addClass('slide').removeClass('slide-down').one('transitionend', function() {
      $(parent).removeClass('slide');
      if (isInAction($node)) {
        switchVerticalArrow($node.children('.topEdge'));
      }
    });
  }

  // recursively hide the descendant nodes of the specified node
  function hideChildren($node) {
    var $temp = $node.closest('tr').siblings();
    if ($temp.last().find('.spinner').length) {
      $node.closest('.orgchart').data('inAjax', false);
    }
    var $visibleNodes = $temp.last().find('.node:visible');
    var isVerticalDesc = $temp.last().is('.verticalNodes') ? true : false;
    if (!isVerticalDesc) {
      var $lines = $visibleNodes.closest('table').closest('tr').prevAll('.lines').css('visibility', 'hidden');
    }
    $visibleNodes.addClass('slide slide-up').eq(0).one('transitionend', function() {
      $visibleNodes.removeClass('slide');
      if (isVerticalDesc) {
        $temp.addClass('hidden');
      } else {
        $lines.removeAttr('style').addClass('hidden').siblings('.nodes').addClass('hidden');
        $temp.last().find('.verticalNodes').addClass('hidden');
      }
      if (isInAction($node)) {
        switchVerticalArrow($node.children('.bottomEdge'));
      }
    });
  }

  // show the children nodes of the specified node
  function showChildren($node) {
    var $temp = $node.closest('tr').siblings();
    var isVerticalDesc = $temp.is('.verticalNodes') ? true : false;
    var $descendants = isVerticalDesc
      ? $temp.removeClass('hidden').find('.node:visible')
      : $temp.removeClass('hidden').eq(2).children().find('tr:first').find('.node:visible');
    // the two following statements are used to enforce browser to repaint
    repaint($descendants.get(0));
    $descendants.addClass('slide').removeClass('slide-up').eq(0).one('transitionend', function() {
      $descendants.removeClass('slide');
      if (isInAction($node)) {
        switchVerticalArrow($node.children('.bottomEdge'));
      }
    });
  }

  // hide the sibling nodes of the specified node
  function hideSiblings($node, direction) {
    var $nodeContainer = $node.closest('table').parent();
    if ($nodeContainer.siblings().find('.spinner').length) {
      $node.closest('.orgchart').data('inAjax', false);
    }
    if (direction) {
      if (direction === 'left') {
        $nodeContainer.prevAll().find('.node:visible').addClass('slide slide-right');
      } else {
        $nodeContainer.nextAll().find('.node:visible').addClass('slide slide-left');
      }
    } else {
      $nodeContainer.prevAll().find('.node:visible').addClass('slide slide-right');
      $nodeContainer.nextAll().find('.node:visible').addClass('slide slide-left');
    }
    var $animatedNodes = $nodeContainer.siblings().find('.slide');
    var $lines = $animatedNodes.closest('.nodes').prevAll('.lines').css('visibility', 'hidden');
    $animatedNodes.eq(0).one('transitionend', function() {
      $lines.removeAttr('style');
      var $siblings = direction ? (direction === 'left' ? $nodeContainer.prevAll(':not(.hidden)') : $nodeContainer.nextAll(':not(.hidden)')) : $nodeContainer.siblings();
      $nodeContainer.closest('.nodes').prev().children(':not(.hidden)')
        .slice(1, direction ? $siblings.length * 2 + 1 : -1).addClass('hidden');
      $animatedNodes.removeClass('slide');
      $siblings.find('.node:visible:gt(0)').removeClass('slide-left slide-right').addClass('slide-up')
        .end().find('.lines, .nodes, .verticalNodes').addClass('hidden')
        .end().addClass('hidden');

      if (isInAction($node)) {
        switchHorizontalArrow($node);
      }
    });
  }

  // show the sibling nodes of the specified node
  function showSiblings($node, direction) {
    // firstly, show the sibling td tags
    var $siblings = $();
    if (direction) {
      if (direction === 'left') {
        $siblings = $node.closest('table').parent().prevAll().removeClass('hidden');
      } else {
        $siblings = $node.closest('table').parent().nextAll().removeClass('hidden');
      }
    } else {
      $siblings = $node.closest('table').parent().siblings().removeClass('hidden');
    }
    // secondly, show the lines
    var $upperLevel = $node.closest('table').closest('tr').siblings();
    if (direction) {
      $upperLevel.eq(2).children('.hidden').slice(0, $siblings.length * 2).removeClass('hidden');
    } else {
      $upperLevel.eq(2).children('.hidden').removeClass('hidden');
    }
    // thirdly, do some cleaning stuff
    if (!getNodeState($node, 'parent').visible) {
      $upperLevel.removeClass('hidden');
      var parent = $upperLevel.find('.node')[0];
      repaint(parent);
      $(parent).addClass('slide').removeClass('slide-down').one('transitionend', function() {
        $(this).removeClass('slide');
      });
    }
    // lastly, show the sibling nodes with animation
    $siblings.find('.node:visible').addClass('slide').removeClass('slide-left slide-right').eq(-1).one('transitionend', function() {
      $siblings.find('.node:visible').removeClass('slide');
      if (isInAction($node)) {
        switchHorizontalArrow($node);
        $node.children('.topEdge').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }
    });
  }

  // start up loading status for requesting new nodes
  function startLoading($arrow, $node, options) {
    var $chart = $node.closest('.orgchart');
    if (typeof $chart.data('inAjax') !== 'undefined' && $chart.data('inAjax') === true) {
      return false;
    }

    $arrow.addClass('hidden');
    $node.append('<i class="fa fa-circle-o-notch fa-spin spinner"></i>');
    $node.children().not('.spinner').css('opacity', 0.2);
    $chart.data('inAjax', true);
    $('.oc-export-btn' + (options.chartClass !== '' ? '.' + options.chartClass : '')).prop('disabled', true);
    return true;
  }

  // terminate loading status for requesting new nodes
  function endLoading($arrow, $node, options) {
    var $chart = $node.closest('div.orgchart');
    $arrow.removeClass('hidden');
    $node.find('.spinner').remove();
    $node.children().removeAttr('style');
    $chart.data('inAjax', false);
    $('.oc-export-btn' + (options.chartClass !== '' ? '.' + options.chartClass : '')).prop('disabled', false);
  }

  // whether the cursor is hovering over the node
  function isInAction($node) {
    return $node.children('.edge').attr('class').indexOf('fa-') > -1 ? true : false;
  }

  function switchVerticalArrow($arrow) {
    $arrow.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
  }

  function switchHorizontalArrow($node) {
    var opts = $node.closest('.orgchart').data('options');
    if (opts.toggleSiblingsResp && (typeof opts.ajaxURL === 'undefined' || $node.closest('.nodes').data('siblingsLoaded'))) {
      var $prevSib = $node.closest('table').parent().prev();
      if ($prevSib.length) {
        if ($prevSib.is('.hidden')) {
          $node.children('.leftEdge').addClass('fa-chevron-left').removeClass('fa-chevron-right');
        } else {
          $node.children('.leftEdge').addClass('fa-chevron-right').removeClass('fa-chevron-left');
        }
      }
      var $nextSib = $node.closest('table').parent().next();
      if ($nextSib.length) {
        if ($nextSib.is('.hidden')) {
          $node.children('.rightEdge').addClass('fa-chevron-right').removeClass('fa-chevron-left');
        } else {
          $node.children('.rightEdge').addClass('fa-chevron-left').removeClass('fa-chevron-right');
        }
      }
    } else {
      var $sibs = $node.closest('table').parent().siblings();
      var sibsVisible = $sibs.length ? !$sibs.is('.hidden') : false;
      $node.children('.leftEdge').toggleClass('fa-chevron-right', sibsVisible).toggleClass('fa-chevron-left', !sibsVisible);
      $node.children('.rightEdge').toggleClass('fa-chevron-left', sibsVisible).toggleClass('fa-chevron-right', !sibsVisible);
    }
  }

  function repaint(node) {
	  if (node) {
      node.style.offsetWidth = node.offsetWidth;
    }
  }

  // create node
  function createNode(nodeData, level, opts) {
    $.each(nodeData.children, function (index, child) {
      child.parentId = nodeData.id;
    });
    var dtd = $.Deferred();
    // construct the content of node
    var $nodeDiv = $('<div' + (opts.draggable ? ' draggable="true"' : '') + (nodeData[opts.nodeId] ? ' id="' + nodeData[opts.nodeId] + '"' : '') + (nodeData.parentId ? ' data-parent="' + nodeData.parentId + '"' : '') + '>')
      .addClass('node ' + (nodeData.className || '') +  (level >= opts.depth ? ' slide-up' : ''))
      .append('<div class="title">' + nodeData[opts.nodeTitle] + '</div>')
      .append(typeof opts.nodeContent !== 'undefined' ? '<div class="content">' + (nodeData[opts.nodeContent] || '') + '</div>' : '');
    // append 4 direction arrows or expand/collapse buttons
    var flags = nodeData.relationship || '';
    if (opts.verticalDepth && (level + 2) > opts.verticalDepth) {
      if ((level + 1) >= opts.verticalDepth && Number(flags.substr(2,1))) {
        var icon = level + 1  >= opts.depth ? 'plus' : 'minus';
        $nodeDiv.append('<i class="toggleBtn fa fa-' + icon + '-square"></i>');
      }
    } else {
      if (Number(flags.substr(0,1))) {
        $nodeDiv.append('<i class="edge verticalEdge topEdge fa"></i>');
      }
      if(Number(flags.substr(1,1))) {
        $nodeDiv.append('<i class="edge horizontalEdge rightEdge fa"></i>' +
          '<i class="edge horizontalEdge leftEdge fa"></i>');
      }
      if(Number(flags.substr(2,1))) {
        $nodeDiv.append('<i class="edge verticalEdge bottomEdge fa"></i>')
          .children('.title').prepend('<i class="fa '+ opts.parentNodeSymbol + ' symbol"></i>');
      }
    }

    $nodeDiv.on('mouseenter mouseleave', function(event) {
      var $node = $(this), flag = false;
      var $topEdge = $node.children('.topEdge');
      var $rightEdge = $node.children('.rightEdge');
      var $bottomEdge = $node.children('.bottomEdge');
      var $leftEdge = $node.children('.leftEdge');
      if (event.type === 'mouseenter') {
        if ($topEdge.length) {
          flag = getNodeState($node, 'parent').visible;
          $topEdge.toggleClass('fa-chevron-up', !flag).toggleClass('fa-chevron-down', flag);
        }
        if ($bottomEdge.length) {
          flag = getNodeState($node, 'children').visible;
          $bottomEdge.toggleClass('fa-chevron-down', !flag).toggleClass('fa-chevron-up', flag);
        }
        if ($leftEdge.length) {
          switchHorizontalArrow($node);
        }
      } else {
        $node.children('.edge').removeClass('fa-chevron-up fa-chevron-down fa-chevron-right fa-chevron-left');
      }
    });

    // define click event handler
    $nodeDiv.on('click', function(event) {
      $(this).closest('.orgchart').find('.focused').removeClass('focused');
      $(this).addClass('focused');
    });

    // define click event handler for the top edge
    $nodeDiv.on('click', '.topEdge', function(event) {
      event.stopPropagation();
      var $that = $(this);
      var $node = $that.parent();
      var parentState = getNodeState($node, 'parent');
      if (parentState.exist) {
        var $parent = $node.closest('table').closest('tr').siblings(':first').find('.node');
        if ($parent.is('.slide')) { return; }
        // hide the ancestor nodes and sibling nodes of the specified node
        if (parentState.visible) {
          hideParent($node);
          $parent.one('transitionend', function() {
            if (isInAction($node)) {
              switchVerticalArrow($that);
              switchHorizontalArrow($node);
            }
          });
        } else { // show the ancestors and siblings
          showParent($node);
        }
      } else {
        // load the new parent node of the specified node by ajax request
        var nodeId = $that.parent()[0].id;
        // start up loading status
        if (startLoading($that, $node, opts)) {
        // load new nodes
          $.ajax({ 'url': $.isFunction(opts.ajaxURL.parent) ? opts.ajaxURL.parent(nodeData) : opts.ajaxURL.parent + nodeId, 'dataType': 'json' })
          .done(function(data) {
            if ($node.closest('.orgchart').data('inAjax')) {
              if (!$.isEmptyObject(data)) {
                addParent.call($node.closest('.orgchart').parent(), $node, data, opts);
              }
            }
          })
          .fail(function() { console.log('Failed to get parent node data'); })
          .always(function() { endLoading($that, $node, opts); });
        }
      }
    });

    // bind click event handler for the bottom edge
    $nodeDiv.on('click', '.bottomEdge', function(event) {
      event.stopPropagation();
      var $that = $(this);
      var $node = $that.parent();
      var childrenState = getNodeState($node, 'children');
      if (childrenState.exist) {
        var $children = $node.closest('tr').siblings(':last');
        if ($children.find('.node:visible').is('.slide')) { return; }
        // hide the descendant nodes of the specified node
        if (childrenState.visible) {
          hideChildren($node);
        } else { // show the descendants
          showChildren($node);
        }
      } else { // load the new children nodes of the specified node by ajax request
        var nodeId = $that.parent()[0].id;
        if (startLoading($that, $node, opts)) {
          $.ajax({ 'url': $.isFunction(opts.ajaxURL.children) ? opts.ajaxURL.children(nodeData) : opts.ajaxURL.children + nodeId, 'dataType': 'json' })
          .done(function(data, textStatus, jqXHR) {
            if ($node.closest('.orgchart').data('inAjax')) {
              if (data.children.length) {
                addChildren($node, data, $.extend({}, opts, { depth: 0 }));
              }
            }
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Failed to get children nodes data');
          })
          .always(function() {
            endLoading($that, $node, opts);
          });
        }
      }
    });

    // event handler for toggle buttons in Hybrid(horizontal + vertical) OrgChart
    $nodeDiv.on('click', '.toggleBtn', function(event) {
      var $this = $(this);
      var $descWrapper = $this.parent().next();
      var $descendants = $descWrapper.find('.node');
      var $children = $descWrapper.children().children('.node');
      if ($children.is('.slide')) { return; }
      $this.toggleClass('fa-plus-square fa-minus-square');
      if ($descendants.eq(0).is('.slide-up')) {
        $descWrapper.removeClass('hidden');
        repaint($children.get(0));
        $children.addClass('slide').removeClass('slide-up').eq(0).one('transitionend', function() {
          $children.removeClass('slide');
        });
      } else {
        $descendants.addClass('slide slide-up').eq(0).one('transitionend', function() {
          $descendants.removeClass('slide');
          // $descWrapper.addClass('hidden');
          $descendants.closest('ul').addClass('hidden');
        });
        $descendants.find('.toggleBtn').removeClass('fa-minus-square').addClass('fa-plus-square');
      }
    });

    // bind click event handler for the left and right edges
    $nodeDiv.on('click', '.leftEdge, .rightEdge', function(event) {
      event.stopPropagation();
      var $that = $(this);
      var $node = $that.parent();
      var siblingsState = getNodeState($node, 'siblings');
      if (siblingsState.exist) {
        var $siblings = $node.closest('table').parent().siblings();
        if ($siblings.find('.node:visible').is('.slide')) { return; }
        if (opts.toggleSiblingsResp) {
          var $prevSib = $node.closest('table').parent().prev();
          var $nextSib = $node.closest('table').parent().next();
          if ($that.is('.leftEdge')) {
            if ($prevSib.is('.hidden')) {
              showSiblings($node, 'left');
            } else {
              hideSiblings($node, 'left');
            }
          } else {
            if ($nextSib.is('.hidden')) {
              showSiblings($node, 'right');
            } else {
              hideSiblings($node, 'right');
            }
          }
        } else {
          if (siblingsState.visible) {
            hideSiblings($node);
          } else {
            showSiblings($node);
          }
        }
      } else {
        // load the new sibling nodes of the specified node by ajax request
        var nodeId = $that.parent()[0].id;
        var url = (getNodeState($node, 'parent').exist) ?
          ($.isFunction(opts.ajaxURL.siblings) ? opts.ajaxURL.siblings(nodeData) : opts.ajaxURL.siblings + nodeId) :
          ($.isFunction(opts.ajaxURL.families) ? opts.ajaxURL.families(nodeData) : opts.ajaxURL.families + nodeId);
        if (startLoading($that, $node, opts)) {
          $.ajax({ 'url': url, 'dataType': 'json' })
          .done(function(data, textStatus, jqXHR) {
            if ($node.closest('.orgchart').data('inAjax')) {
              if (data.siblings || data.children) {
                addSiblings($node, data, opts);
              }
            }
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Failed to get sibling nodes data');
          })
          .always(function() {
            endLoading($that, $node, opts);
          });
        }
      }
    });
    if (opts.draggable) {
      $nodeDiv.on('dragstart', function(event) {
        var origEvent = event.originalEvent;
        var isFirefox = /firefox/.test(window.navigator.userAgent.toLowerCase());
        if (isFirefox) {
          origEvent.dataTransfer.setData('text/html', 'hack for firefox');
        }
        // if users enable zoom or direction options
        if ($nodeDiv.closest('.orgchart').css('transform') !== 'none') {
          var ghostNode, nodeCover;
          if (!document.querySelector('.ghost-node')) {
            ghostNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            ghostNode.classList.add('ghost-node');
            nodeCover = document.createElementNS('http://www.w3.org/2000/svg','rect');
            ghostNode.appendChild(nodeCover);
            $nodeDiv.closest('.orgchart').append(ghostNode);
          } else {
            ghostNode = $nodeDiv.closest('.orgchart').children('.ghost-node').get(0);
            nodeCover = $(ghostNode).children().get(0);
          }
          var transValues = $nodeDiv.closest('.orgchart').css('transform').split(',');
          var scale = Math.abs(window.parseFloat((opts.direction === 't2b' || opts.direction === 'b2t') ? transValues[0].slice(transValues[0].indexOf('(') + 1) : transValues[1]));
          ghostNode.setAttribute('width', $nodeDiv.outerWidth(false));
          ghostNode.setAttribute('height', $nodeDiv.outerHeight(false));
          nodeCover.setAttribute('x',5 * scale);
          nodeCover.setAttribute('y',5 * scale);
          nodeCover.setAttribute('width', 120 * scale);
          nodeCover.setAttribute('height', 40 * scale);
          nodeCover.setAttribute('rx', 4 * scale);
          nodeCover.setAttribute('ry', 4 * scale);
          nodeCover.setAttribute('stroke-width', 1 * scale);
          var xOffset = origEvent.offsetX * scale;
          var yOffset = origEvent.offsetY * scale;
          if (opts.direction === 'l2r') {
            xOffset = origEvent.offsetY * scale;
            yOffset = origEvent.offsetX * scale;
          } else if (opts.direction === 'r2l') {
            xOffset = $nodeDiv.outerWidth(false) - origEvent.offsetY * scale;
            yOffset = origEvent.offsetX * scale;
          } else if (opts.direction === 'b2t') {
            xOffset = $nodeDiv.outerWidth(false) - origEvent.offsetX * scale;
            yOffset = $nodeDiv.outerHeight(false) - origEvent.offsetY * scale;
          }
          if (isFirefox) { // hack for old version of Firefox(< 48.0)
            nodeCover.setAttribute('fill', 'rgb(255, 255, 255)');
            nodeCover.setAttribute('stroke', 'rgb(191, 0, 0)');
            var ghostNodeWrapper = document.createElement('img');
            ghostNodeWrapper.src = 'data:image/svg+xml;utf8,' + (new XMLSerializer()).serializeToString(ghostNode);
            origEvent.dataTransfer.setDragImage(ghostNodeWrapper, xOffset, yOffset);
          } else {
            origEvent.dataTransfer.setDragImage(ghostNode, xOffset, yOffset);
          }
        }
        var $dragged = $(this);
        var $dragZone = $dragged.closest('.nodes').siblings().eq(0).find('.node:first');
        var $dragHier = $dragged.closest('table').find('.node');
        $dragged.closest('.orgchart')
          .data('dragged', $dragged)
          .find('.node').each(function(index, node) {
            if ($dragHier.index(node) === -1) {
              if (opts.dropCriteria) {
                if (opts.dropCriteria($dragged, $dragZone, $(node))) {
                  $(node).addClass('allowedDrop');
                }
              } else {
                $(node).addClass('allowedDrop');
              }
            }
          });
      })
      .on('dragover', function(event) {
        event.preventDefault();
        if (!$(this).is('.allowedDrop')) {
          event.originalEvent.dataTransfer.dropEffect = 'none';
        }
      })
      .on('dragend', function(event) {
        $(this).closest('.orgchart').find('.allowedDrop').removeClass('allowedDrop');
      })
      .on('drop', function(event) {
        var $dropZone = $(this);
        var $orgchart = $dropZone.closest('.orgchart');
        var $dragged = $orgchart.data('dragged');
        $orgchart.find('.allowedDrop').removeClass('allowedDrop');
        var $dragZone = $dragged.closest('.nodes').siblings().eq(0).children();
        // firstly, deal with the hierarchy of drop zone
        if (!$dropZone.closest('tr').siblings().length) { // if the drop zone is a leaf node
          $dropZone.append('<i class="edge verticalEdge bottomEdge fa"></i>')
            .parent().attr('colspan', 2)
            .parent().after('<tr class="lines"><td colspan="2"><div class="downLine"></div></td></tr>'
            + '<tr class="lines"><td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td></tr>'
            + '<tr class="nodes"></tr>')
            .siblings(':last').append($dragged.find('.horizontalEdge').remove().end().closest('table').parent());
        } else {
          var dropColspan = parseInt($dropZone.parent().attr('colspan')) + 2;
          var horizontalEdges = '<i class="edge horizontalEdge rightEdge fa"></i><i class="edge horizontalEdge leftEdge fa"></i>';
          $dropZone.closest('tr').next().addBack().children().attr('colspan', dropColspan);
          if (!$dragged.find('.horizontalEdge').length) {
            $dragged.append(horizontalEdges);
          }
          $dropZone.closest('tr').siblings().eq(1).children(':last').before('<td class="leftLine topLine">&nbsp;</td><td class="rightLine topLine">&nbsp;</td>')
            .end().next().append($dragged.closest('table').parent());
          var $dropSibs = $dragged.closest('table').parent().siblings().find('.node:first');
          if ($dropSibs.length === 1) {
            $dropSibs.append(horizontalEdges);
          }
        }
        // secondly, deal with the hierarchy of dragged node
        var dragColspan = parseInt($dragZone.attr('colspan'));
        if (dragColspan > 2) {
          $dragZone.attr('colspan', dragColspan - 2)
            .parent().next().children().attr('colspan', dragColspan - 2)
            .end().next().children().slice(1, 3).remove();
          var $dragSibs = $dragZone.parent().siblings('.nodes').children().find('.node:first');
          if ($dragSibs.length ===1) {
            $dragSibs.find('.horizontalEdge').remove();
          }
        } else {
          $dragZone.removeAttr('colspan')
            .find('.bottomEdge').remove()
            .end().end().siblings().remove();
        }
        $orgchart.triggerHandler({ 'type': 'nodedropped.orgchart', 'draggedNode': $dragged, 'dragZone': $dragZone.children(), 'dropZone': $dropZone });
      });
    }
    // allow user to append dom modification after finishing node create of orgchart
    if (opts.createNode) {
      opts.createNode($nodeDiv, nodeData);
    }
    dtd.resolve($nodeDiv);
    return dtd.promise();
  }
  // recursively build the tree
  function buildHierarchy ($appendTo, nodeData, level, opts, callback) {
    var $nodeWrapper;
    // Construct the node
    var $childNodes = nodeData.children;
    var hasChildren = $childNodes ? $childNodes.length : false;
    var isVerticalNode = (opts.verticalDepth && (level + 1) >= opts.verticalDepth) ? true : false;
    if (Object.keys(nodeData).length > 1) { // if nodeData has nested structure
      $nodeWrapper = isVerticalNode ? $appendTo : $('<table>');
      if (!isVerticalNode) {
        $appendTo.append($nodeWrapper);
      }
      $.when(createNode(nodeData, level, opts))
      .done(function($nodeDiv) {
        if (isVerticalNode) {
          $nodeWrapper.append($nodeDiv);
        }else {
          $nodeWrapper.append($nodeDiv.wrap('<tr><td' + (hasChildren ? ' colspan="' + $childNodes.length * 2 + '"' : '') + '></td></tr>').closest('tr'));
        }
        if (callback) {
          callback();
        }
      })
      .fail(function() {
        console.log('Failed to creat node')
      });
    }
    // Construct the inferior nodes and connectiong lines
    if (hasChildren) {
      if (Object.keys(nodeData).length === 1) { // if nodeData is just an array
        $nodeWrapper = $appendTo;
      }
      var isHidden = (level + 1 >= opts.depth || nodeData.collapsed) ? ' hidden' : '';
      var isVerticalLayer = (opts.verticalDepth && (level + 2) >= opts.verticalDepth) ? true : false;

      // draw the line close to parent node
      if (!isVerticalLayer) {
        $nodeWrapper.append('<tr class="lines' + isHidden + '"><td colspan="' + $childNodes.length * 2 + '"><div class="downLine"></div></td></tr>');
      }
      // draw the lines close to children nodes
      var lineLayer = '<tr class="lines' + isHidden + '"><td class="rightLine">&nbsp;</td>';
      for (var i=1; i<$childNodes.length; i++) {
        lineLayer += '<td class="leftLine topLine">&nbsp;</td><td class="rightLine topLine">&nbsp;</td>';
      }
      lineLayer += '<td class="leftLine">&nbsp;</td></tr>';
      var $nodeLayer;
      if (isVerticalLayer) {
        $nodeLayer = $('<ul>');
        if (isHidden) {
          $nodeLayer.addClass(isHidden);
        }
        if (level + 2 === opts.verticalDepth) {
          $nodeWrapper.append('<tr class="verticalNodes' + isHidden + '"><td></td></tr>')
            .find('.verticalNodes').children().append($nodeLayer);
        } else {
          $nodeWrapper.append($nodeLayer);
        }
      } else {
        $nodeLayer = $('<tr class="nodes' + isHidden + '">');
        $nodeWrapper.append(lineLayer).append($nodeLayer);
      }
      // recurse through children nodes
      $.each($childNodes, function() {
        var $nodeCell = isVerticalLayer ? $('<li>') : $('<td colspan="2">');
        $nodeLayer.append($nodeCell);
        buildHierarchy($nodeCell, this, level + 1, opts, callback);
      });
    }
  }

  // build the child nodes of specific node
  function buildChildNode ($appendTo, nodeData, opts, callback) {
    var opts = opts || $appendTo.closest('.orgchart').data('options');
    var data = nodeData.children || nodeData.siblings;
    $appendTo.find('td:first').attr('colspan', data.length * 2);
    buildHierarchy($appendTo, { 'children': data }, 0, opts, callback);
  }
  // exposed method
  function addChildren($node, data, opts) {
    var opts = opts || $node.closest('.orgchart').data('options');
    var count = 0;
    buildChildNode.call($node.closest('.orgchart').parent(), $node.closest('table'), data, opts, function() {
      if (++count === data.children.length) {
        if (!$node.children('.bottomEdge').length) {
          $node.append('<i class="edge verticalEdge bottomEdge fa"></i>');
        }
        if (!$node.find('.symbol').length) {
          $node.children('.title').prepend('<i class="fa '+ opts.parentNodeSymbol + ' symbol"></i>');
        }
        showChildren($node);
      }
    });
  }

  // build the parent node of specific node
  function buildParentNode($currentRoot, nodeData, opts, callback) {
    var that = this;
    var $table = $('<table>');
    nodeData.relationship = nodeData.relationship || '001';
    $.when(createNode(nodeData, 0, opts || $currentRoot.closest('.orgchart').data('options')))
      .done(function($nodeDiv) {
        $table.append($nodeDiv.removeClass('slide-up').addClass('slide-down').wrap('<tr class="hidden"><td colspan="2"></td></tr>').closest('tr'));
        $table.append('<tr class="lines hidden"><td colspan="2"><div class="downLine"></div></td></tr>');
        var linesRow = '<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>';
        $table.append('<tr class="lines hidden">' + linesRow + '</tr>');
        var $oc = that.children('.orgchart');
        $oc.prepend($table)
          .children('table:first').append('<tr class="nodes"><td colspan="2"></td></tr>')
          .children('tr:last').children().append($oc.children('table').last());
        callback();
      })
      .fail(function() {
        console.log('Failed to create parent node');
      });
  }

  // exposed method
  function addParent($currentRoot, data, opts) {
    buildParentNode.call(this, $currentRoot, data, opts, function() {
      if (!$currentRoot.children('.topEdge').length) {
        $currentRoot.children('.title').after('<i class="edge verticalEdge topEdge fa"></i>');
      }
      showParent($currentRoot);
    });
  }

  // subsequent processing of build sibling nodes
  function complementLine($oneSibling, siblingCount, existingSibligCount) {
    var lines = '';
    for (var i = 0; i < existingSibligCount; i++) {
      lines += '<td class="leftLine topLine">&nbsp;</td><td class="rightLine topLine">&nbsp;</td>';
    }
    $oneSibling.parent().prevAll('tr:gt(0)').children().attr('colspan', siblingCount * 2)
      .end().next().children(':first').after(lines);
  }

  // build the sibling nodes of specific node
  function buildSiblingNode($nodeChart, nodeData, opts, callback) {
    var opts = opts || $nodeChart.closest('.orgchart').data('options');
    var newSiblingCount = nodeData.siblings ? nodeData.siblings.length : nodeData.children.length;
    var existingSibligCount = $nodeChart.parent().is('td') ? $nodeChart.closest('tr').children().length : 1;
    var siblingCount = existingSibligCount + newSiblingCount;
    var insertPostion = (siblingCount > 1) ? Math.floor(siblingCount/2 - 1) : 0;
    // just build the sibling nodes for the specific node
    if ($nodeChart.parent().is('td')) {
      var $parent = $nodeChart.closest('tr').prevAll('tr:last');
      $nodeChart.closest('tr').prevAll('tr:lt(2)').remove();
      var childCount = 0;
      buildChildNode.call($nodeChart.closest('.orgchart').parent(),$nodeChart.parent().closest('table'), nodeData, opts, function() {
        if (++childCount === newSiblingCount) {
          var $siblingTds = $nodeChart.parent().closest('table').children('tr:last').children('td');
          if (existingSibligCount > 1) {
            complementLine($siblingTds.eq(0).before($nodeChart.closest('td').siblings().addBack().unwrap()), siblingCount, existingSibligCount);
            $siblingTds.addClass('hidden').find('.node').addClass('slide-left');
          } else {
            complementLine($siblingTds.eq(insertPostion).after($nodeChart.closest('td').unwrap()), siblingCount, 1);
            $siblingTds.not(':eq(' + insertPostion + 1 + ')').addClass('hidden')
              .slice(0, insertPostion).find('.node').addClass('slide-right')
              .end().end().slice(insertPostion).find('.node').addClass('slide-left');
          }
          callback();
        }
      });
    } else { // build the sibling nodes and parent node for the specific ndoe
      var nodeCount = 0;
      buildHierarchy($nodeChart.closest('.orgchart'), nodeData, 0, opts, function() {
        if (++nodeCount === siblingCount) {
          complementLine($nodeChart.next().children('tr:last')
            .children().eq(insertPostion).after($('<td colspan="2">')
            .append($nodeChart)), siblingCount, 1);
          $nodeChart.closest('tr').siblings().eq(0).addClass('hidden').find('.node').addClass('slide-down');
          $nodeChart.parent().siblings().addClass('hidden')
            .slice(0, insertPostion).find('.node').addClass('slide-right')
            .end().end().slice(insertPostion).find('.node').addClass('slide-left');
          callback();
        }
      });
    }
  }

  function addSiblings($node, data, opts) {
    buildSiblingNode.call($node.closest('.orgchart').parent(), $node.closest('table'), data, opts, function() {
      $node.closest('.nodes').data('siblingsLoaded', true);
      if (!$node.children('.leftEdge').length) {
        $node.children('.topEdge').after('<i class="edge horizontalEdge rightEdge fa"></i><i class="edge horizontalEdge leftEdge fa"></i>');
      }
      showSiblings($node);
    });
  }

  function removeNodes($node) {
    var $parent = $node.closest('table').parent();
    var $sibs = $parent.parent().siblings();
    if ($parent.is('td')) {
      if (getNodeState($node, 'siblings').exist) {
        $sibs.eq(2).children('.topLine:lt(2)').remove();
        $sibs.slice(0, 2).children().attr('colspan', $sibs.eq(2).children().length);
        $parent.remove();
      } else {
        $sibs.eq(0).children().removeAttr('colspan')
          .find('.bottomEdge').remove()
          .end().end().siblings().remove();
      }
    } else {
      $parent.add($parent.siblings()).remove();
    }
  }

}));
